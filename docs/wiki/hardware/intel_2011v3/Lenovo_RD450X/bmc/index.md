---
title: BMC
sidebar_position: 10
tags:
  - bmc
  - lga2011v3
  - motherboard
---

import DocCardList from "@theme/DocCardList";
import CodeBlock from "@theme/CodeBlock";
import Ch341aWarning from "/docs/wiki/hardware/_snippets/ch341a-warning.mdx";

# BMC

Известно 3 варианта зашиться/снять дамп:

- Хардверно выпаивая микруху памяти (прищепка не проверялась)
- Софтверно [ASPEED iRMP SOC Flash](../../../tools/index#aspeed-irmp-soc-flash)
- Софтверно из BMC web ui

<Ch341aWarning/>

## Прошивки

Для платы есть несколько известных BMC

Считаю что это лучший вариант - это `V3.24.1145`:

- картинка работает
- прошивка BIOS работает
- управление питанием работает

<DocCardList />
