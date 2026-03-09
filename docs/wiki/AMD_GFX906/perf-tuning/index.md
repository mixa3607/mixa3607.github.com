---
title: Perf tuning
sidebar_position: 40
---

import DocCardList from "@theme/DocCardList";

# Perf tuning

Changing smcPPTable/TdcLimitGfx 350 => 150 reduced the hotspot by 10+- degrees with almost no drop in performance in vllm

```console
$ upp -p /sys/class/drm/card${GPU_ID}/device/pp_table set --write smcPPTable/TdcLimitGfx=150
Changing smcPPTable.TdcLimitGfx of type H from 330 to 150 at 0x1fe
Committing changes to '/sys/class/drm/card1/device/pp_table'.
```

<div style={{ maxWidth: "35rem", justifySelf: "center" }}>
  ![temperatures](./temperatures.png)
</div>
