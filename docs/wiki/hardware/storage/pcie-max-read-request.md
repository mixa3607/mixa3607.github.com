---
title: PCIe MaxReadReq и ошибки записи NVMe
sidebar_position: 10
---

`MaxReadReq` (MRRS, Maximum Read Request Size) — максимальный размер одного PCIe Memory Read Request, который устройство может отправить хосту. Это **не** `MaxPayload` (MPS): последний ограничивает размер полезной нагрузки PCIe-пакета. При записи на NVMe контроллер читает данные из памяти хоста по PCIe, поэтому проблема с MRRS может проявляться именно на **записи**, тогда как чтение диска и SMART выглядят нормальными.

## Случай: WD Blue SN550

Диск `WDC WDS100T2B0C-00PXH0`, серийный номер `213891440011`, прошивка `233010WD`. При подключении к процессорному PCIe-порту на Linux и позднее при пробросе контроллера в TrueNAS SCALE VM запись завершалась `Input/output error`. В логах были NVMe `Data Transfer Error (sct 0x0 / sc 0x4)` и PCIe AER на самом SSD (`NonFatalErr`, `HeaderOF`); счётчик `num_err_log_entries` рос, но `media_errors` оставался равным нулю. SMART/self-test и чтение сами по себе неисправность не обнаруживали.

Раздельные тесты на Linux показали:

| Настройка | Результат |
| --- | --- |
| MPS 512, MRRS 4096 (исходная) | Запись 4 МиБ: `I/O error` |
| MPS 128, MRRS 4096 | Та же ошибка |
| MPS 512, MRRS 512 только на порту, SSD остаётся 4096 | Та же ошибка |
| MPS 512, MRRS 512 **только на SSD**, порт остаётся 4096 | Запись и сверка 1 ГиБ успешны; счётчик ошибок не вырос |

Затем SSD передали в TrueNAS SCALE 25.10.7 как PCIe passthrough (Proxmox VE, VM 100). Внутри VM исходные 4096 опять воспроизвели ошибку записи: счётчик вырос с 1896 до 1908. После смены MRRS **только у SSD** на 512 запись и сверка 1 ГиБ прошли. Правило UDEV пережило перезагрузку VM: в госте и на физическом устройстве хоста осталось 512, ещё 1 ГиБ записан и прочитан без новых ошибок. Эти результаты подтверждают рабочий обходной путь **для данного экземпляра и конфигурации**, но не доказывают, что причина именно в прошивке SSD, а не во взаимодействии контроллера с платформой.

:::warning
Тесты записи меняют данные. Не запускайте `dd`, `fio` с записью или аналогичные проверки на диске с нужными данными либо на диске действующего ZFS-пула. В описанном случае раздел NTFS был не смонтирован и данные на нём были не нужны; после испытаний его следует переразметить/отформатировать.
:::

## Диагностика

Сначала **по модели и серийному номеру** определите нужный накопитель и его PCI-адрес: имена `/dev/nvmeXn1` и BDF (`0000:bb:dd.f`) меняются при перестановке, перезагрузке и пробросе в VM.

```bash
sudo nvme list
lsblk -o NAME,MODEL,SERIAL,SIZE,FSTYPE,MOUNTPOINTS
cat /sys/class/nvme/nvme2/serial   # пример: 213891440011
cat /sys/class/nvme/nvme2/address  # PCI-адрес этого контроллера в данной ОС

sudo lspci -s 0000:00:1c.0 -vv | grep -E 'MaxPayload|MaxReadReq|UESta:|CESta:'
sudo nvme smart-log /dev/nvme2 | grep -E 'critical_warning|media_errors|num_err_log_entries'
sudo nvme error-log /dev/nvme2 --log-entries=4
journalctl -k -b | grep -Ei 'nvme|aer|I/O error'
```

`/dev/nvme2` и `0000:00:1c.0` — адреса **в TrueNAS VM из примера**, не универсальные значения. При passthrough на Proxmox тот же диск имел BDF `0000:9a:00.0`. Сравнивайте регистр в госте и на хосте: драйвер VFIO [передаёт изменение MRRS гостем физическому устройству](https://github.com/torvalds/linux/blob/master/drivers/vfio/pci/vfio_pci_config.c); настройка только на хосте перед запуском VM может быть перезаписана гостем.

## Временное исправление в Linux

На **нужном NVMe-контроллере**, а не на PCIe root port:

```bash
PCI=$(cat /sys/class/nvme/nvme2/address)  # сначала сверьте serial!
sudo setpci -s "$PCI" CAP_EXP+8.w
sudo setpci -s "$PCI" CAP_EXP+8.w=2000:7000
sudo lspci -s "$PCI" -vv | grep 'MaxPayload .*MaxReadReq'
```

`2000:7000` задаёт MRRS = 512 байт (значение `0x2000`, маска битов MRRS `0x7000`), **не трогая MPS и остальные биты** Device Control. В нашем примере регистр SSD менялся с `5857` на `2857`: `MaxPayload 512` оставался неизменным, `MaxReadReq 4096` становился `512`. Изменение может сброситься при перезагрузке или PCIe reset; для других дисков 512 не является универсальной рекомендацией.

## Постоянное правило в обычном Linux

Если на контроллере доступны sysfs-атрибуты `serial` и `address`, правило UDEV можно привязать к **серийному номеру**, а адрес получать динамически. Пример `/etc/udev/rules.d/70-sn550-mrrs-512.rules`:

```udev
ACTION=="add", SUBSYSTEM=="nvme", ATTR{serial}=="213891440011*", ATTR{transport}=="pcie", RUN+="/usr/bin/setpci -s $attr{address} CAP_EXP+8.w=2000:7000"
```

Звёздочка после номера учитывает пробелы в конце поля `serial`, которые встретились у данного контроллера. Путь к `setpci` проверьте через `command -v setpci` (пакет `pciutils`). Затем:

```bash
sudo udevadm control --reload-rules
sudo udevadm test --action=add /sys/class/nvme/nvme2 2>&1 | grep '^run:.*setpci'
```

`udevadm test` **не выполняет** `RUN`, а только показывает, какая команда была бы вызвана. После перезагрузки проверьте MRRS через `lspci` и реальную запись с проверкой прочитанного на диске, где это безопасно. Если SSD используется как загрузочный диск, правило на корневой ФС может сработать слишком поздно: нужна настройка на более ранней стадии загрузки или исправление прошивки/драйвера. При сбросе контроллера без нового события `add` правило также не обязано примениться повторно — это следует отдельно контролировать.

### Контрольная запись на ненужном разделе

**Только для данного SN550, пока он не входит в пул и данные на его разделе не нужны.** Пример перезаписывает **1 ГиБ внутри раздела**, начиная с отступа 512000 МиБ, а не создаёт обычный файл. Перед запуском проверьте `zpool status -P` и `lsblk`; не запускайте это на работающем диске ZFS.

```bash
(
set -euo pipefail
DEV=/dev/nvme2n1p1  # пример из TrueNAS VM; не копируйте имя вслепую
test "$(cat /sys/class/nvme/nvme2/serial | xargs)" = 213891440011 || exit 1
test -z "$(lsblk -nr -o MOUNTPOINTS /dev/nvme2n1 | tr -d '[:space:]')" || exit 1
test "$(sudo blockdev --getsize64 "$DEV")" -ge $(((512000 + 1024) * 1024 * 1024)) || exit 1
sample=$(mktemp)
trap 'rm -f "$sample"' EXIT
openssl rand -out "$sample" $((1024 * 1024 * 1024))
expected=$(sha256sum "$sample" | cut -d' ' -f1)
sudo dd if="$sample" of="$DEV" bs=1M seek=512000 count=1024 oflag=direct conv=fsync status=progress
actual=$(sudo dd if="$DEV" bs=1M skip=512000 count=1024 iflag=direct status=none | sha256sum | cut -d' ' -f1)
test "$actual" = "$expected" && echo 'write/read OK'
)
```

После теста сравните `nvme smart-log` и журнал PCIe AER до/после. Совпадение хешей одного участка — проверка обходного пути, а не полная диагностика ресурса диска.

## TrueNAS SCALE с PCIe passthrough

В TrueNAS 25.10.7 правило было сохранено **через штатный middleware Tunables**, а не прямым редактированием `/etc/udev/rules.d`: TrueNAS генерирует этот каталог из своей конфигурации. Пример команды внутри VM:

```bash
midclt call -j tunable.create '{"type":"UDEV","var":"70-sn550-mrrs-512","value":"ACTION==\"add\", SUBSYSTEM==\"nvme\", ATTR{serial}==\"213891440011*\", ATTR{transport}==\"pcie\", RUN+=\"/usr/bin/setpci -s $attr{address} CAP_EXP+8.w=2000:7000\"","comment":"WD SN550 serial 213891440011: limit PCIe MRRS to 512 for reliable writes","enabled":true}'
```

`var` становится именем файла `70-sn550-mrrs-512.rules`, `value` — текстом правила. Перед созданием проверьте `midclt call tunable.query`, чтобы не сделать дубликат. После создания можно проверить файл `/etc/udev/rules.d/70-sn550-mrrs-512.rules` и сухой запуск `udevadm test` из предыдущего раздела. Правило сработает при следующем обнаружении контроллера; для текущей сессии сначала примените временную настройку `setpci`.

VFIO не обязан соблюдать запрошенный гостем MRRS ниже **физического MPS**. В описанном случае физический MPS равен 512, поэтому MRRS 512 доходит до устройства; после проброса проверяйте именно фактический регистр на Proxmox, а не только виртуальный вывод гостя.

Порядок проверки после **согласованной перезагрузки VM**:

1. В госте проверьте серийный номер, `lspci -vv` (`MaxReadReq 512`) и состояние ZFS-пулов.
2. На Proxmox найдите BDF этого же устройства по `lspci -Dnnk` / `qm config <VMID>` и проверьте **физический** `MaxReadReq 512`; guest BDF и host BDF различаются.
3. На ещё не добавленном в пул тестовом диске проверьте запись, чтение и контрольные суммы; затем сравните `num_err_log_entries` и сообщения AER до/после теста. В нашем случае после перезагрузки 1 ГиБ прошёл, `num_err_log_entries` остался 1908, новых AER не было.

Не считайте правило полноценным ремонтом накопителя: после обновлений TrueNAS/ядра, переноса VM и сбросов NVMe проверяйте фактическое значение регистра. Прежде чем доверять SSD важные данные ZFS, проверьте его более длительной нагрузкой и предусмотрите резервные копии.
