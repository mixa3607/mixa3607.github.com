---
title: DeepSeek V4 Flash
sidebar_position: 10
hide_table_of_contents: true
---

import DocCardList from "@theme/DocCardList";
import TableWrapper from "@site/src/components/TableWrapper.tsx";
import VllmHelmNote from "/docs/wiki/AMD_GFX906/vllm/\_helm_note.mdx";

# DeepSeek-V4-Flash benchmarks

## Hardware

- GPU 4x MI50 32G
- CPU 2x 4189 QVM7 (Xeon Platinum 8360Y)
- RAM 16x16 2666

## GPU Overclocking

[How to](../../../perf-tuning/index.md)

```bash title="oc max"
export MEM_MAX=1180
export GPU_MAX=1725
export TDP_MAX=300
export TDC_MAX=330
```

## bartowski/DeepSeek-V4-Flash-GGUF

```bash
export MODEL=bartowski/DeepSeek-V4-Flash-GGUF
export HIP_VISIBLE_DEVICES="1,0,3,2"
export CTXB=2048
export GENB=256
export COMP_THREADS=32
./llama-bench \
  --hf-repo $MODEL \
  --split-mode layer --flash-attn 1 \
  --n-prompt $CTXB --ubatch-size $CTXB --batch-size $CTXB \
  --n-gen $GENB \
  --n-depth 0,4096,8192,16384,32768,65536 \
  --threads $COMP_THREADS \
  --main-gpu 0 --tensor-split "25;25;25;25" \
--override-tensor \
'^(FROM ROCm0|blk.0.ffn_down_exps.weight|blk.0.ffn_up_exps.weight|blk.1.ffn_down_exps.weight|blk.1.ffn_up_exps.weight|blk.2.ffn_down_exps.weight|blk.2.ffn_up_exps.weight|blk.3.ffn_down_exps.weight|blk.3.ffn_up_exps.weight)$=CPU;'\
'^(FROM ROCm1|blk.11.ffn_down_exps.weight|blk.11.ffn_up_exps.weight|blk.12.ffn_down_exps.weight|blk.12.ffn_up_exps.weight|blk.13.ffn_down_exps.weight|blk.13.ffn_up_exps.weight|blk.14.ffn_down_exps.weight)$=CPU;'\
'^(FROM ROCm2|blk.22.ffn_down_exps.weight|blk.22.ffn_up_exps.weight|blk.23.ffn_down_exps.weight|blk.23.ffn_up_exps.weight|blk.24.ffn_down_exps.weight|blk.24.ffn_up_exps.weight|blk.25.ffn_down_exps.weight)$=CPU;'\
'^(FROM ROCm3|blk.33.ffn_down_exps.weight|blk.33.ffn_up_exps.weight|blk.34.ffn_down_exps.weight|blk.34.ffn_up_exps.weight)$=CPU;'
```

<TableWrapper>

| model                  |       size | threads | n_ubatch |  fa |            test |           t/s |
| ---------------------- | ---------: | ------: | -------: | --: | --------------: | ------------: |
| deepseek4 ?B MXFP4 MoE | 145.29 GiB |      32 |     2048 |   1 |          pp2048 | 149.50 ± 0.27 |
| deepseek4 ?B MXFP4 MoE | 145.29 GiB |      32 |     2048 |   1 |           tg256 |  15.66 ± 0.21 |
| deepseek4 ?B MXFP4 MoE | 145.29 GiB |      32 |     2048 |   1 |  pp2048 @ d4096 | 131.20 ± 0.66 |
| deepseek4 ?B MXFP4 MoE | 145.29 GiB |      32 |     2048 |   1 |   tg256 @ d4096 |  14.75 ± 0.34 |
| deepseek4 ?B MXFP4 MoE | 145.29 GiB |      32 |     2048 |   1 |  pp2048 @ d8192 | 122.50 ± 0.45 |
| deepseek4 ?B MXFP4 MoE | 145.29 GiB |      32 |     2048 |   1 |   tg256 @ d8192 |  14.60 ± 0.08 |
| deepseek4 ?B MXFP4 MoE | 145.29 GiB |      32 |     2048 |   1 | pp2048 @ d16384 | 108.32 ± 0.29 |
| deepseek4 ?B MXFP4 MoE | 145.29 GiB |      32 |     2048 |   1 |  tg256 @ d16384 |  14.05 ± 0.09 |
| deepseek4 ?B MXFP4 MoE | 145.29 GiB |      32 |     2048 |   1 | pp2048 @ d32768 |  88.58 ± 0.27 |
| deepseek4 ?B MXFP4 MoE | 145.29 GiB |      32 |     2048 |   1 |  tg256 @ d32768 |  13.45 ± 0.07 |
| deepseek4 ?B MXFP4 MoE | 145.29 GiB |      32 |     2048 |   1 | pp2048 @ d65536 |  64.47 ± 0.14 |
| deepseek4 ?B MXFP4 MoE | 145.29 GiB |      32 |     2048 |   1 |  tg256 @ d65536 |  11.85 ± 0.19 |

</TableWrapper>

## unsloth/DeepSeek-V4-Flash-GGUF:UD-Q8_K_XL

```bash
MODEL=unsloth/DeepSeek-V4-Flash-GGUF:UD-Q8_K_XL
export HIP_VISIBLE_DEVICES="1,0,3,2"
export CTXB=2048
export GENB=256
export COMP_THREADS=32
./llama-bench \
  --hf-repo $MODEL \
  --split-mode layer --flash-attn 1 \
  --n-prompt $CTXB --ubatch-size $CTXB --batch-size $CTXB \
  --n-gen $GENB \
  --n-depth 0,4096,8192,16384,32768,65536 \
  --threads $COMP_THREADS \
  --main-gpu 0 --tensor-split "25;25;25;25" \
  --override-tensor \
'^(FROM ROCm0|blk.0.ffn_down_exps.weight|blk.0.ffn_up_exps.weight|blk.1.ffn_down_exps.weight|blk.1.ffn_up_exps.weight|blk.2.ffn_down_exps.weight|blk.2.ffn_up_exps.weight|blk.3.ffn_down_exps.weight|blk.3.ffn_up_exps.weight|blk.4.ffn_down_exps.weight)$=CPU;'\
'^(FROM ROCm1|blk.11.ffn_down_exps.weight|blk.11.ffn_up_exps.weight|blk.12.ffn_down_exps.weight|blk.12.ffn_up_exps.weight|blk.13.ffn_down_exps.weight|blk.13.ffn_up_exps.weight|blk.14.ffn_down_exps.weight|blk.14.ffn_up_exps.weight)$=CPU;'\
'^(FROM ROCm2|blk.22.ffn_down_exps.weight|blk.22.ffn_up_exps.weight|blk.23.ffn_down_exps.weight|blk.23.ffn_up_exps.weight|blk.24.ffn_down_exps.weight|blk.24.ffn_up_exps.weight|blk.25.ffn_down_exps.weight|blk.25.ffn_up_exps.weight)$=CPU;'\
'^(FROM ROCm3|blk.33.ffn_down_exps.weight|blk.33.ffn_up_exps.weight|blk.34.ffn_down_exps.weight|blk.34.ffn_up_exps.weight|blk.35.ffn_down_exps.weight|blk.35.ffn_up_exps.weight)$=CPU;'
```

<TableWrapper>

| model                  |       size | threads | n_ubatch |  fa |            test |           t/s |
| ---------------------- | ---------: | ------: | -------: | --: | --------------: | ------------: |
| deepseek4 ?B MXFP4 MoE | 150.75 GiB |      32 |     2048 |   1 |          pp2048 | 119.87 ± 0.81 |
| deepseek4 ?B MXFP4 MoE | 150.75 GiB |      32 |     2048 |   1 |           tg256 |  12.79 ± 0.10 |
| deepseek4 ?B MXFP4 MoE | 150.75 GiB |      32 |     2048 |   1 |  pp2048 @ d4096 | 111.02 ± 0.14 |
| deepseek4 ?B MXFP4 MoE | 150.75 GiB |      32 |     2048 |   1 |   tg256 @ d4096 |  12.33 ± 0.08 |
| deepseek4 ?B MXFP4 MoE | 150.75 GiB |      32 |     2048 |   1 |  pp2048 @ d8192 | 104.49 ± 0.15 |
| deepseek4 ?B MXFP4 MoE | 150.75 GiB |      32 |     2048 |   1 |   tg256 @ d8192 |  12.04 ± 0.05 |
| deepseek4 ?B MXFP4 MoE | 150.75 GiB |      32 |     2048 |   1 | pp2048 @ d16384 |  93.96 ± 0.31 |
| deepseek4 ?B MXFP4 MoE | 150.75 GiB |      32 |     2048 |   1 |  tg256 @ d16384 |  11.65 ± 0.07 |
| deepseek4 ?B MXFP4 MoE | 150.75 GiB |      32 |     2048 |   1 | pp2048 @ d32768 |  78.14 ± 0.48 |
| deepseek4 ?B MXFP4 MoE | 150.75 GiB |      32 |     2048 |   1 |  tg256 @ d32768 |  10.97 ± 0.07 |
| deepseek4 ?B MXFP4 MoE | 150.75 GiB |      32 |     2048 |   1 | pp2048 @ d65536 |  58.62 ± 0.41 |
| deepseek4 ?B MXFP4 MoE | 150.75 GiB |      32 |     2048 |   1 |  tg256 @ d65536 |  10.01 ± 0.05 |

</TableWrapper>
