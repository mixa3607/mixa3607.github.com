---
title: Tools
sidebar_position: 20
---
Полезные тулы

## Intel MLC
Intel® Memory Latency Checker (Intel® MLC) is a tool used to measure memory latencies and b/w, and how they change with increasing load on the system. It also provides several options for more fine-grained investigation where b/w and latencies from a specific set of cores to caches or memory can be measured as well.

About [Intel® Memory Latency Checker](https://www.intel.com/content/www/us/en/developer/articles/tool/intelr-memory-latency-checker.html):
- [Linux/Win 3.12](@storageBaseUrl@/tools/mlc_v3.12/mlc_v3.12.tgz)

:::note
Measuring Cache Performance with Intel Memory Latency Checker (MLC): [medium.com @wrightchen](https://medium.com/@wrightchen/intel-memory-latency-checker-mlc-for-cache-testing-deep-dive-b8b2c30bacab)
:::

## AMIBCP
AMI BIOS edit tool:

- [AMIBCP_5.02.0031.exe](@storageBaseUrl@/tools/AMIBCP_5.02.0031/AMIBCP_5.02.0031.exe)
- [AMIBCP_5.02.0034.exe](@storageBaseUrl@/tools/AMIBCP_5.02.0034/AMIBCP_5.02.0034.exe)

## AMI ROM Tool
Aptio 5.x AFU (AFUEFI/AFULNX/AFUWIN/AFUDOS) flashing BIOS tool
- AFUEFI [download](@storageBaseUrl@/tools/AMI-Firmware-Update-Utility/afu/afuefi) - uefi (самая беспроблемная штука для uefi-only систем)
- AFUWIN [download](@storageBaseUrl@/tools/AMI-Firmware-Update-Utility/afu/afuwin) - windows (винда стабильно встаёт в позу при попытке заюзать бинарь)
- AFUDOS [download](@storageBaseUrl@/tools/AMI-Firmware-Update-Utility/afu/afudos) - dos (под uefi-only системы не подойдёт)
- AFULNX - linux (под древние ядра, поднять около нереально, идём мимо)

## UEFITool
UEFI firmware image viewer and editor. [Project github](https://github.com/LongSoft/UEFITool)

- [UEFITool_0.28.0](@storageBaseUrl@/tools/UEFITool_0.28.0)
- [UEFITool_A72](@storageBaseUrl@/tools/UEFITool_A72)

## uefi-mod-tools
UEFI bios and BMC mod tools. [Project github](https://github.com/mixa3607/uefi-mod-tools)

## ASPEED iRMP SOC Flash
Service tool for flash/backup ASTxxxx. [Download ASPEED-iRMP-SOC-Flash-Utility v.1.20.00](@storageBaseUrl@/tools/ASPEED-iRMP-SOC-Flash-Utility_v12000)
```
; ASPEED iRMP SOC Flash Package Description
;===============================================================================
1.Package Description:
- socflash.zip: for DOS Execution Environment
- winflash.zip: for Windows Execution Environment
- lxflash.tar.gz: for x86/x64 Linux Execution Environment
- bsdflash.tar.gz: for FreeBSD Execution Environment
- uflash_x64.zip: for x64 UEFI Shell Execution Environment
2.Usage Description:
- See readme.txt in each compressed package
```

Tested with:
- AST2400
- AST2500
