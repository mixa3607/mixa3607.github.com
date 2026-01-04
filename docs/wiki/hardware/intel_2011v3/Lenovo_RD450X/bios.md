---
title: BIOS
sidebar_position: 20
tags:
  - bios
  - lga2011v3
  - motherboard
---

import Ch341aWarning from "/docs/wiki/hardware/\_snippets/ch341a-warning.mdx";

# BIOS

BIOS'ы под плату

Есть много биосов разной степени багованности. Самые лучшие это сток `x231` и `rd450m3v4.rom` с оверов.

:::note
Если видите у себя на лого `BB88`, то выкидывайте его - багованый кусок байт.
:::

Известно 2 варианта зашиться/снять дамп:

- Хардверно выпаивая микруху памяти (прищепка не проверялась)
- Софтверно из BMC web ui

<Ch341aWarning/>

## rd450m3v4.rom

```yml
name: rd450m3v4.rom
sha256: 5290b982129cd7e19e2ef09516eb3de7cecd00e0146b1cc2bc65fa46ab942545
isModded: yes
```

Стабильный и фичастый [биос с оверов](https://forums.overclockers.ru/viewtopic.php?p=18490614#p18490614):

- есть бифурк
- едет 2400мгц
- в системе виден ipmi

[Download rd450m3v4.rom](@storageBaseUrl@/Lenovo-RD450x/BIOS/rd450m3v4.rom)
