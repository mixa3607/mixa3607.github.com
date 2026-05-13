---
title: Perf vs PCIe speed
sidebar_position: 45
---

import DocCardList from "@theme/DocCardList";
import TableWrapper from "@site/src/components/TableWrapper.tsx";

# Perf vs PCIe speed

- software: [`llama.cpp`](https://github.com/ggml-org/llama.cpp) ([b9119-rocm-7.2.1](https://hub.docker.com/layers/mixa3607/llama.cpp-gfx906/b9119-rocm-7.2.1/images/sha256-1d419a8fb9838adaa9df816ba56a719889fcef0f7f82ca993612a24ef706d759))
- mobo: [`imb760`](/docs/wiki/hardware/intel_4189_p4/Axiomtek_IMB760/index.mdx)
- meter: `rocm-smi --showbw`
- lnk ver: [`pcie_set_speed.sh`](../perf-tuning/index.md#force-pcie-speed)

<details>
  <summary>More info</summary>

```text title="topo"
========================= ROCm System Management Interface =========================
============================= Weight between two GPUs ==============================
       GPU0         GPU1         GPU2         GPU3
GPU0   0            40           40           40
GPU1   40           0            40           40
GPU2   40           40           0            40
GPU3   40           40           40           0

============================== Hops between two GPUs ===============================
       GPU0         GPU1         GPU2         GPU3
GPU0   0            2            2            2
GPU1   2            0            2            2
GPU2   2            2            0            2
GPU3   2            2            2            0

============================ Link Type between two GPUs ============================
       GPU0         GPU1         GPU2         GPU3
GPU0   0            PCIE         PCIE         PCIE
GPU1   PCIE         0            PCIE         PCIE
GPU2   PCIE         PCIE         0            PCIE
GPU3   PCIE         PCIE         PCIE         0

==================================== Numa Nodes ====================================
GPU[0]          : (Topology) Numa Node: 0
GPU[0]          : (Topology) Numa Affinity: 0
GPU[1]          : (Topology) Numa Node: 0
GPU[1]          : (Topology) Numa Affinity: 0
GPU[2]          : (Topology) Numa Node: 0
GPU[2]          : (Topology) Numa Affinity: 0
GPU[3]          : (Topology) Numa Node: 0
GPU[3]          : (Topology) Numa Affinity: 0
=============================== End of ROCm SMI Log ================================
```

```text title="llama.cpp ver"
ggml_cuda_init: found 4 ROCm devices (Total VRAM: 131008 MiB):
  Device 0: AMD Instinct MI60 / MI50, gfx906:sramecc+:xnack- (0x906), VMM: no, Wave Size: 64, VRAM: 32752 MiB
  Device 1: AMD Instinct MI60 / MI50, gfx906:sramecc+:xnack- (0x906), VMM: no, Wave Size: 64, VRAM: 32752 MiB
  Device 2: AMD Instinct MI60 / MI50, gfx906:sramecc+:xnack- (0x906), VMM: no, Wave Size: 64, VRAM: 32752 MiB
  Device 3: AMD Instinct MI60 / MI50, gfx906:sramecc+:xnack- (0x906), VMM: no, Wave Size: 64, VRAM: 32752 MiB
load_backend: loaded ROCm backend from /app/libggml-hip.so
load_backend: loaded CPU backend from /app/libggml-cpu-icelake.so
build: ef93e98 (1)
```

```text title="PCIe 1.0"
31:00.0
                LnkCap: Port #0, Speed 16GT/s, Width x16, ASPM L1, Exit Latency L1 <64us
                LnkSta: Speed 2.5GT/s (downgraded), Width x8 (downgraded)
34:00.0
                LnkCap: Port #2, Speed 16GT/s, Width x16, ASPM L1, Exit Latency L1 <64us
                LnkSta: Speed 2.5GT/s (downgraded), Width x8 (downgraded)
4b:00.0
                LnkCap: Port #0, Speed 16GT/s, Width x16, ASPM L1, Exit Latency L1 <64us
                LnkSta: Speed 2.5GT/s (downgraded), Width x8 (downgraded)
4e:00.0
                LnkCap: Port #2, Speed 16GT/s, Width x16, ASPM L1, Exit Latency L1 <64us
                LnkSta: Speed 2.5GT/s (downgraded), Width x8 (downgraded)
```

```text title="PCIe 2.0"
31:00.0
                LnkCap: Port #0, Speed 16GT/s, Width x16, ASPM L1, Exit Latency L1 <64us
                LnkSta: Speed 5GT/s (downgraded), Width x8 (downgraded)
34:00.0
                LnkCap: Port #2, Speed 16GT/s, Width x16, ASPM L1, Exit Latency L1 <64us
                LnkSta: Speed 5GT/s (downgraded), Width x8 (downgraded)
4b:00.0
                LnkCap: Port #0, Speed 16GT/s, Width x16, ASPM L1, Exit Latency L1 <64us
                LnkSta: Speed 5GT/s (downgraded), Width x8 (downgraded)
4e:00.0
                LnkCap: Port #2, Speed 16GT/s, Width x16, ASPM L1, Exit Latency L1 <64us
                LnkSta: Speed 5GT/s (downgraded), Width x8 (downgraded)
```

```text title="PCIe 3.0"
31:00.0
                LnkCap: Port #0, Speed 16GT/s, Width x16, ASPM L1, Exit Latency L1 <64us
                LnkSta: Speed 8GT/s (downgraded), Width x8 (downgraded)
34:00.0
                LnkCap: Port #2, Speed 16GT/s, Width x16, ASPM L1, Exit Latency L1 <64us
                LnkSta: Speed 8GT/s (downgraded), Width x8 (downgraded)
4b:00.0
                LnkCap: Port #0, Speed 16GT/s, Width x16, ASPM L1, Exit Latency L1 <64us
                LnkSta: Speed 8GT/s (downgraded), Width x8 (downgraded)
4e:00.0
                LnkCap: Port #2, Speed 16GT/s, Width x16, ASPM L1, Exit Latency L1 <64us
                LnkSta: Speed 8GT/s (downgraded), Width x8 (downgraded)
```

```text title="PCIe 4.0"
31:00.0
                LnkCap: Port #0, Speed 16GT/s, Width x16, ASPM L1, Exit Latency L1 <64us
                LnkSta: Speed 16GT/s, Width x8 (downgraded)
34:00.0
                LnkCap: Port #2, Speed 16GT/s, Width x16, ASPM L1, Exit Latency L1 <64us
                LnkSta: Speed 16GT/s, Width x8 (downgraded)
4b:00.0
                LnkCap: Port #0, Speed 16GT/s, Width x16, ASPM L1, Exit Latency L1 <64us
                LnkSta: Speed 16GT/s, Width x8 (downgraded)
4e:00.0
                LnkCap: Port #2, Speed 16GT/s, Width x16, ASPM L1, Exit Latency L1 <64us
                LnkSta: Speed 16GT/s, Width x8 (downgraded)
```

</details>

## Max bw

<TableWrapper>

| Link   | Workload | BW (mb/s) |
| ------ | -------- | --------- |
| x8 1.0 | pp       | 589       |
| x8 1.0 | tg       | 209       |
| x8 2.0 | pp       | 728       |
| x8 2.0 | tg       | 228       |
| x8 3.0 | pp       | 1104      |
| x8 3.0 | tg       | 219       |
| x8 4.0 | pp       | 1135      |
| x8 4.0 | tg       | 222       |

</TableWrapper>

## Bench

```bash
MODEL=unsloth/gemma-4-31B-it-GGUF:Q8_0
cpupower -c 0-37 frequency-set -g performance
numactl --membind=0 --cpunodebind=0 \
./llama-bench \
  --hf-repo $MODEL \
  --split-mode tensor --flash-attn 1 \
  --n-prompt 2048 --ubatch-size 2048 \
  --n-gen 256 \
  --n-depth 0,16384
```

<TableWrapper>

| Link   | model           |      size |  params | backend | ngl | n_ubatch |     sm |  fa |            test |           t/s |
| ------ | --------------- | --------: | ------: | ------- | --: | -------: | -----: | --: | --------------: | ------------: |
| x8 1.0 | gemma4 31B Q8_0 | 30.38 GiB | 30.70 B | ROCm    |  99 |     2048 | tensor |   1 |          pp2048 | 285.30 ± 0.03 |
| x8 1.0 | gemma4 31B Q8_0 | 30.38 GiB | 30.70 B | ROCm    |  99 |     2048 | tensor |   1 |           tg256 |  28.90 ± 0.02 |
| x8 1.0 | gemma4 31B Q8_0 | 30.38 GiB | 30.70 B | ROCm    |  99 |     2048 | tensor |   1 | pp2048 @ d16384 | 248.42 ± 0.44 |
| x8 1.0 | gemma4 31B Q8_0 | 30.38 GiB | 30.70 B | ROCm    |  99 |     2048 | tensor |   1 |  tg256 @ d16384 |  27.47 ± 0.09 |
| x8 2.0 | gemma4 31B Q8_0 | 30.38 GiB | 30.70 B | ROCm    |  99 |     2048 | tensor |   1 |          pp2048 | 360.82 ± 0.08 |
| x8 2.0 | gemma4 31B Q8_0 | 30.38 GiB | 30.70 B | ROCm    |  99 |     2048 | tensor |   1 |           tg256 |  31.39 ± 0.16 |
| x8 2.0 | gemma4 31B Q8_0 | 30.38 GiB | 30.70 B | ROCm    |  99 |     2048 | tensor |   1 | pp2048 @ d16384 | 311.40 ± 0.63 |
| x8 2.0 | gemma4 31B Q8_0 | 30.38 GiB | 30.70 B | ROCm    |  99 |     2048 | tensor |   1 |  tg256 @ d16384 |  29.59 ± 0.11 |
| x8 3.0 | gemma4 31B Q8_0 | 30.38 GiB | 30.70 B | ROCm    |  99 |     2048 | tensor |   1 |          pp2048 | 414.26 ± 0.12 |
| x8 3.0 | gemma4 31B Q8_0 | 30.38 GiB | 30.70 B | ROCm    |  99 |     2048 | tensor |   1 |           tg256 |  31.95 ± 0.02 |
| x8 3.0 | gemma4 31B Q8_0 | 30.38 GiB | 30.70 B | ROCm    |  99 |     2048 | tensor |   1 | pp2048 @ d16384 | 355.50 ± 0.75 |
| x8 3.0 | gemma4 31B Q8_0 | 30.38 GiB | 30.70 B | ROCm    |  99 |     2048 | tensor |   1 |  tg256 @ d16384 |  30.27 ± 0.14 |
| x8 4.0 | gemma4 31B Q8_0 | 30.38 GiB | 30.70 B | ROCm    |  99 |     2048 | tensor |   1 |          pp2048 | 447.61 ± 0.08 |
| x8 4.0 | gemma4 31B Q8_0 | 30.38 GiB | 30.70 B | ROCm    |  99 |     2048 | tensor |   1 |           tg256 |  32.52 ± 0.06 |
| x8 4.0 | gemma4 31B Q8_0 | 30.38 GiB | 30.70 B | ROCm    |  99 |     2048 | tensor |   1 | pp2048 @ d16384 | 382.58 ± 0.97 |
| x8 4.0 | gemma4 31B Q8_0 | 30.38 GiB | 30.70 B | ROCm    |  99 |     2048 | tensor |   1 |  tg256 @ d16384 |  30.67 ± 0.11 |

</TableWrapper>
