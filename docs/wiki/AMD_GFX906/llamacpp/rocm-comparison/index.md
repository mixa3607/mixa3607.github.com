---
title: ROCm * graphs * GPUs bench
sidebar_position: 30
---

import DocCardList from "@theme/DocCardList";
import TableWrapper from "@site/src/components/TableWrapper.tsx";

# ROCm \* hip graphs \* gpus \* ctx bench

- `ROCm 6.3.3|7.2.3 * hip graphs OFF|ON * gpus 1|2|4 * ctx 0|16K|32K`
- software: [`llama.cpp`](https://github.com/ggml-org/llama.cpp) ([b9180-rocm-7.2.1](https://hub.docker.com/layers/mixa3607/llama.cpp-gfx906))
- mobo: [`imb760`](/docs/wiki/hardware/intel_4189_p4/Axiomtek_IMB760/index.mdx)

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

```text title="llama.cpp ver"
flags:
  - GGML_HIP=ON
  - GGML_HIP_GRAPHS=OFF
  - GGML_HIP_RCCL=ON
  - AMDGPU_TARGETS=gfx906
  - GGML_BACKEND_DL=ON
  - GGML_CPU_ALL_VARIANTS=ON
  - GGML_AVX512=ON
  - GGML_AVX512_VBMI=ON
  - GGML_AVX512_VNNI=ON
  - GGML_AVX512_BF16=ON
  - CMAKE_BUILD_TYPE=Release
  - LLAMA_BUILD_TESTS=OFF

ggml_cuda_init: found 4 ROCm devices (Total VRAM: 131008 MiB):
  Device 0: AMD Instinct MI60 / MI50, gfx906:sramecc+:xnack- (0x906), VMM: no, Wave Size: 64, VRAM: 32752 MiB
  Device 1: AMD Instinct MI60 / MI50, gfx906:sramecc+:xnack- (0x906), VMM: no, Wave Size: 64, VRAM: 32752 MiB
  Device 2: AMD Instinct MI60 / MI50, gfx906:sramecc+:xnack- (0x906), VMM: no, Wave Size: 64, VRAM: 32752 MiB
  Device 3: AMD Instinct MI60 / MI50, gfx906:sramecc+:xnack- (0x906), VMM: no, Wave Size: 64, VRAM: 32752 MiB
load_backend: loaded ROCm backend from /app/libggml-hip.so
load_backend: loaded CPU backend from /app/libggml-cpu-icelake.so
build: 2555826 (1)
```

</details>

## Bench

```bash
numactl --membind=0 --cpunodebind=0 \
./llama-bench \
  --hf-repo unsloth/Qwen3.5-9B-GGUF:Q8_0 \
  --device rocm0,rocm0/rocm1,rocm0/rocm1/rocm2/rocm3 \
  --split-mode tensor --flash-attn 1 \
  --n-prompt 2048 --ubatch-size 2048 --batch-size 2048 \
  --n-gen 256 \
  --n-depth 0,16384,32768
```

<TableWrapper>

| model          | ROCm  | HIP_GRAPHS | GPUs |   test | ctx   |     t/s | t/s ± |
| -------------- | ----- | ---------- | ---- | -----: | ----- | ------: | ----- |
| qwen35 9B Q8_0 | 7.2.3 | OFF        | 1    | pp2048 | 0     |  507.79 | 0.19  |
| qwen35 9B Q8_0 | 7.2.3 | OFF        | 1    |  tg256 | 0     |   58.83 | 0.18  |
| qwen35 9B Q8_0 | 7.2.3 | OFF        | 1    | pp2048 | 16384 |  445.13 | 0.65  |
| qwen35 9B Q8_0 | 7.2.3 | OFF        | 1    |  tg256 | 16384 |   56.01 | 0.25  |
| qwen35 9B Q8_0 | 7.2.3 | OFF        | 1    | pp2048 | 32768 |  401.25 | 0.66  |
| qwen35 9B Q8_0 | 7.2.3 | OFF        | 1    |  tg256 | 32768 |   53.47 | 0.22  |
| qwen35 9B Q8_0 | 7.2.3 | OFF        | 2    | pp2048 | 0     |  918.78 | 0.19  |
| qwen35 9B Q8_0 | 7.2.3 | OFF        | 2    |  tg256 | 0     |   70.13 | 0.08  |
| qwen35 9B Q8_0 | 7.2.3 | OFF        | 2    | pp2048 | 16384 |  791.19 | 2.97  |
| qwen35 9B Q8_0 | 7.2.3 | OFF        | 2    |  tg256 | 16384 |   68.09 | 0.35  |
| qwen35 9B Q8_0 | 7.2.3 | OFF        | 2    | pp2048 | 32768 |  720.33 | 2.47  |
| qwen35 9B Q8_0 | 7.2.3 | OFF        | 2    |  tg256 | 32768 |   66.05 | 0.34  |
| qwen35 9B Q8_0 | 7.2.3 | OFF        | 4    | pp2048 | 0     | 1519.30 | 0.18  |
| qwen35 9B Q8_0 | 7.2.3 | OFF        | 4    |  tg256 | 0     |   73.16 | 0.35  |
| qwen35 9B Q8_0 | 7.2.3 | OFF        | 4    | pp2048 | 16384 | 1348.31 | 8.42  |
| qwen35 9B Q8_0 | 7.2.3 | OFF        | 4    |  tg256 | 16384 |   71.02 | 0.39  |
| qwen35 9B Q8_0 | 7.2.3 | OFF        | 4    | pp2048 | 32768 | 1212.53 | 6.94  |
| qwen35 9B Q8_0 | 7.2.3 | OFF        | 4    |  tg256 | 32768 |   70.42 | 0.40  |
| qwen35 9B Q8_0 | 6.3.3 | OFF        | 1    | pp2048 | 0     |  517.96 | 0.21  |
| qwen35 9B Q8_0 | 6.3.3 | OFF        | 1    |  tg256 | 0     |   53.51 | 0.15  |
| qwen35 9B Q8_0 | 6.3.3 | OFF        | 1    | pp2048 | 16384 |  454.60 | 0.98  |
| qwen35 9B Q8_0 | 6.3.3 | OFF        | 1    |  tg256 | 16384 |   51.19 | 0.20  |
| qwen35 9B Q8_0 | 6.3.3 | OFF        | 1    | pp2048 | 32768 |  409.04 | 1.07  |
| qwen35 9B Q8_0 | 6.3.3 | OFF        | 1    |  tg256 | 32768 |   49.01 | 0.18  |
| qwen35 9B Q8_0 | 6.3.3 | OFF        | 2    | pp2048 | 0     |  936.04 | 0.22  |
| qwen35 9B Q8_0 | 6.3.3 | OFF        | 2    |  tg256 | 0     |   66.71 | 0.23  |
| qwen35 9B Q8_0 | 6.3.3 | OFF        | 2    | pp2048 | 16384 |  804.81 | 2.05  |
| qwen35 9B Q8_0 | 6.3.3 | OFF        | 2    |  tg256 | 16384 |   64.66 | 0.33  |
| qwen35 9B Q8_0 | 6.3.3 | OFF        | 2    | pp2048 | 32768 |  734.61 | 2.66  |
| qwen35 9B Q8_0 | 6.3.3 | OFF        | 2    |  tg256 | 32768 |   62.52 | 0.16  |
| qwen35 9B Q8_0 | 6.3.3 | OFF        | 4    | pp2048 | 0     | 1542.16 | 0.30  |
| qwen35 9B Q8_0 | 6.3.3 | OFF        | 4    |  tg256 | 0     |   72.73 | 0.48  |
| qwen35 9B Q8_0 | 6.3.3 | OFF        | 4    | pp2048 | 16384 | 1368.46 | 8.75  |
| qwen35 9B Q8_0 | 6.3.3 | OFF        | 4    |  tg256 | 16384 |   71.30 | 0.90  |
| qwen35 9B Q8_0 | 6.3.3 | OFF        | 4    | pp2048 | 32768 | 1232.13 | 7.15  |
| qwen35 9B Q8_0 | 6.3.3 | OFF        | 4    |  tg256 | 32768 |   71.98 | 0.43  |
| qwen35 9B Q8_0 | 7.2.3 | ON         | 1    | pp2048 | 0     |  507.63 | 0.34  |
| qwen35 9B Q8_0 | 7.2.3 | ON         | 1    |  tg256 | 0     |   59.31 | 0.23  |
| qwen35 9B Q8_0 | 7.2.3 | ON         | 1    | pp2048 | 16384 |  445.03 | 0.88  |
| qwen35 9B Q8_0 | 7.2.3 | ON         | 1    |  tg256 | 16384 |   56.28 | 0.23  |
| qwen35 9B Q8_0 | 7.2.3 | ON         | 1    | pp2048 | 32768 |  401.90 | 0.14  |
| qwen35 9B Q8_0 | 7.2.3 | ON         | 1    |  tg256 | 32768 |   53.81 | 0.24  |
| qwen35 9B Q8_0 | 7.2.3 | ON         | 2    | pp2048 | 0     |  918.25 | 0.88  |
| qwen35 9B Q8_0 | 7.2.3 | ON         | 2    |  tg256 | 0     |   71.99 | 0.26  |
| qwen35 9B Q8_0 | 7.2.3 | ON         | 2    | pp2048 | 16384 |  790.92 | 2.60  |
| qwen35 9B Q8_0 | 7.2.3 | ON         | 2    |  tg256 | 16384 |   69.97 | 0.45  |
| qwen35 9B Q8_0 | 7.2.3 | ON         | 2    | pp2048 | 32768 |  720.64 | 2.29  |
| qwen35 9B Q8_0 | 7.2.3 | ON         | 2    |  tg256 | 32768 |   67.82 | 0.42  |
| qwen35 9B Q8_0 | 7.2.3 | ON         | 4    | pp2048 | 0     | 1521.34 | 3.65  |
| qwen35 9B Q8_0 | 7.2.3 | ON         | 4    |  tg256 | 0     |   76.25 | 0.48  |
| qwen35 9B Q8_0 | 7.2.3 | ON         | 4    | pp2048 | 16384 | 1344.43 | 9.40  |
| qwen35 9B Q8_0 | 7.2.3 | ON         | 4    |  tg256 | 16384 |   74.33 | 0.75  |
| qwen35 9B Q8_0 | 7.2.3 | ON         | 4    | pp2048 | 32768 | 1212.61 | 7.98  |
| qwen35 9B Q8_0 | 7.2.3 | ON         | 4    |  tg256 | 32768 |   73.31 | 0.78  |
| qwen35 9B Q8_0 | 6.3.3 | ON         | 1    | pp2048 | 0     |  517.52 | 0.82  |
| qwen35 9B Q8_0 | 6.3.3 | ON         | 1    |  tg256 | 0     |   52.31 | 0.34  |
| qwen35 9B Q8_0 | 6.3.3 | ON         | 1    | pp2048 | 16384 |  454.43 | 0.64  |
| qwen35 9B Q8_0 | 6.3.3 | ON         | 1    |  tg256 | 16384 |   50.19 | 0.24  |
| qwen35 9B Q8_0 | 6.3.3 | ON         | 1    | pp2048 | 32768 |  409.24 | 0.48  |
| qwen35 9B Q8_0 | 6.3.3 | ON         | 1    |  tg256 | 32768 |   48.18 | 0.23  |
| qwen35 9B Q8_0 | 6.3.3 | ON         | 2    | pp2048 | 0     |  936.02 | 0.58  |
| qwen35 9B Q8_0 | 6.3.3 | ON         | 2    |  tg256 | 0     |   62.82 | 0.37  |
| qwen35 9B Q8_0 | 6.3.3 | ON         | 2    | pp2048 | 16384 |  805.96 | 3.75  |
| qwen35 9B Q8_0 | 6.3.3 | ON         | 2    |  tg256 | 16384 |   62.00 | 0.58  |
| qwen35 9B Q8_0 | 6.3.3 | ON         | 2    | pp2048 | 32768 |  734.65 | 3.16  |
| qwen35 9B Q8_0 | 6.3.3 | ON         | 2    |  tg256 | 32768 |   60.41 | 0.61  |
| qwen35 9B Q8_0 | 6.3.3 | ON         | 4    | pp2048 | 0     | 1543.77 | 2.10  |
| qwen35 9B Q8_0 | 6.3.3 | ON         | 4    |  tg256 | 0     |   62.75 | 0.58  |
| qwen35 9B Q8_0 | 6.3.3 | ON         | 4    | pp2048 | 16384 | 1360.97 | 16.06 |
| qwen35 9B Q8_0 | 6.3.3 | ON         | 4    |  tg256 | 16384 |   63.52 | 1.18  |
| qwen35 9B Q8_0 | 6.3.3 | ON         | 4    | pp2048 | 32768 | 1231.25 | 7.67  |
| qwen35 9B Q8_0 | 6.3.3 | ON         | 4    |  tg256 | 32768 |   62.49 | 1.02  |

</TableWrapper>
