---
title: DDR4 SPD flashing
sidebar_position: 10
tags:
  - ram
---

# DDR4 SPD Flashing
## Hardware
[TaoBao](https://item.taobao.com/item.htm?id=618794128919) based on CH341
![flasher](image.png)

## Software
Скачиваешь [spd-programmer/DDRSPD.zip](@storageBaseUrl@/spd-programmer/DDRSPD.zip) и действуешь по инструкции

## Dumps
| Name                | Banks            | Type  | Cap | SPD      | OC | Dump                                                                                                                   |
|---------------------|------------------|-------|-----|----------|----|------------------------------------------------------------------------------------------------------------------------|
| Cisco 24B3A042      | HMA42GR7MFR4N-TF | RDIMM | 16G | 2132_C14 | N  | [dump](./dumps/Cisco%2024B3A042%20-%20Hynix%20HMA42GR7MFR4N-TF%20RDIMM_DDR4%20SDRAM-2132_C14_2R%20x%204_16GB.spd)      |
| Huawei 4180660C     | HMA42GR7MFR4N-TF | RDIMM | 16G | 2132_C14 | N  | [dump](./dumps/Huawei%204180660C%20-%20Hynix%20HMA42GR7MFR4N-TF%20RDIMM_DDR4%20SDRAM-2132_C14_2R%20x%204_16GB.spd)     |
| HOTGRIZZLY 7206B741 | HMA42GR7MFR4N-TF | RDIMM | 16G | 3200_C22 | Y  | [dump](./dumps/HOTGRIZZLY%207206B741%20-%20Hynix%20HMA42GR7MFR4N-TF%20RDIMM_DDR4%20SDRAM-3200_C22_2R%20x%204_16GB.spd) |
| Goodram 4295CC3B    | HMA82GR7JJR4N-VK | RDIMM | 16G | 2666_C18 | N  | [dump](./dumps/Goodram%204295CC3B%20-%20Hynix%20HMA82GR7JJR4N-VK%20RDIMM_DDR4%20SDRAM-2666_C18_1R%20x%204_16GB.spd)    |
