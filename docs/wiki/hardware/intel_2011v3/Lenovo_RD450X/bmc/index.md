---
title: BMC
sidebar_position: 10
tags:
  - bmc
  - lga2011v3
  - motherboard
---
# BMC

## Прошивки
Для платы есть несколько известных BMC

Считаю что это лучший вариант - это `V3.24.1145`:
- картинка работает
- прошивка BIOS работает
- управление питанием работает

### BMC_RD450X_MLK_Baidu_V3.24.1145_SVT
```
/*******************************************************************************
* Release Information
* Project: Lenovo-RD450X-MLK-Baidu
* Version: 3.24.1145
* Date: 2016-12-19
********************************************************************************/
```

[Download BMC_RD450X_MLK_Baidu_V3.24.1145_SVT.tar.gz](@storageBaseUrl@/Lenovo-RD450x/BMC/BMC_RD450X_MLK_Baidu_V3.24.1145_SVT.tar.gz)

### BMC_RD450X_Tencent_V2.17.1086_SVT
```
/*******************************************************************************
* Release Information
* Project: Lenovo-RD450X-Tencent
* Version: 2.17.1086
* Date: 2016-09-29
********************************************************************************/
```

[Download BMC_RD450X_Tencent_V2.17.1086_SVT.tar.gz](@storageBaseUrl@/Lenovo-RD450x/BMC/BMC_RD450X_Tencent_V2.17.1086_SVT.tar.gz)

### BMC_RD450X_Tencent_V2.21.1095_SVT
```
/*******************************************************************************
* Change Information
* Project: Lenovo-RD450X_Tencent
* Version: 2.21.1095
* Date: 2016-12-15
********************************************************************************/
```

[Download BMC_RD450X_Tencent_V2.21.1095_SVT.tar.gz](@storageBaseUrl@/Lenovo-RD450x/BMC/BMC_RD450X_Tencent_V2.21.1095_SVT.tar.gz)

## Получение рутового шелла
Способ был проверен на [BMC 3.24.1145](#bmc_rd450x_mlk_baidu_v3241145_svt), но уверен что и с другими поедет!

Скачиваем [config_sh.bak](./config_sh.bak), заливаем его через `Maintenance` => `Backup/Restore Configuration`, идём по ssh на bmc и вуаля.
```console
$ ssh -oHostKeyAlgorithms=+ssh-dss sysadmin@192.168.1.212
sysadmin@192.168.1.149's password: superuser
Executing [-/bin/sh]


BusyBox v1.13.2 (2016-12-19 15:55:17 CST) built-in shell (ash)
Enter 'help' for a list of built-in commands.

# uname -a
Linux  2.6.28.10-ami #1 Mon Dec 19 15:59:10 CST 2016 armv5tejl unknown
```
Подробнее о том как это работает: [bak2shell](../../../modding-and-hacks/megarac-sp/bak2shell%20hack/index.mdx).

## Проблемы и их решение
### Белый экран в хроме
Открой фаерфоксом

### Не могу получить картинку через джаву
Полный мануал что и как можно [посмотреть тут](../../../modding-and-hacks/megarac-sp/java-console/index.md). Проверено на связке с [BMC 3.24.1145](#bmc_rd450x_mlk_baidu_v3241145_svt)

### BMC умер совсем и никак не получается достучаться до него
Прошить bmc можно либо прищепкой, либо сервисной утилитой [ASPEED iRMP SOC Flash](../../../tools/index.md#aspeed-irmp-soc-flash). 

:::warning Бэкапьте перед прошивкой
:::

После прошивки нужно восстановить MACи. Восстановление по мануалу из [overclockers post](https://forums.overclockers.ru/viewtopic.php?p=18321593#p18321593)

```shell
# channel 1 это shared c mac 6c:0b:84:d7:09:cd
sudo ipmitool raw 0x0c 0x01 1 0xc2 0x00
sudo ipmitool lan set 0x01 macaddr 6c:0b:84:d7:09:cd
sudo ipmitool lan set 1 vlan id off
sudo ipmitool mc reset cold
```

При попытке восстановить оба мака бмц у меня всегда уходил в себя и помогала только перешивка с 0, но можете погуглить этот бред

```shell
ipmitool lan print 1
ipmitool lan set 0x01 access on
ipmitool raw 0x0c 0x01 0x01 0xc2 0x00
ipmitool lan set 0x01 macaddr 6c:0b:84:d7:09:ce
ipmitool lan set 1 vlan id off

ipmitool lan print 8
ipmitool lan set 0x08 access on
ipmitool raw 0x0c 0x01 0x01 0xc2 0x01
ipmitool lan set 0x08 macaddr 6c:0b:84:d7:09:ce

ipmitool mc reset cold


sudo ipmitool raw 0x0c 0x01 1 0xc2 0x00
sudo ipmitool lan set 0x01 macaddr 6c:0b:84:d7:09:cd
sudo ipmitool lan set 1 vlan id off
sudo ipmitool mc reset cold

sudo ipmitool raw 0x0c 0x01 8 0xc2 0x00
sudo ipmitool lan set 8 macaddr 6c:0b:84:d7:09:cd
sudo ipmitool mc reset cold
```
