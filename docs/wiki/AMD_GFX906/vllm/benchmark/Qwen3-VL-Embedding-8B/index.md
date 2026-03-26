---
title: Qwen3 VL Embedding 8B
sidebar_position: 20
---

import DocCardList from "@theme/DocCardList";
import TableWrapper from "@site/src/components/TableWrapper.tsx";
import VllmHelmNote from "/docs/wiki/AMD_GFX906/vllm/\_helm_note.mdx";

# Qwen3 VL Embedding 8B benchmarks

- TP/DP/PP - tensor/data/pipeline parallelism
- TG t/s - text generation is tps
- PP t/s - prompt processing is tps

<TableWrapper>

| date            | image                                                                    | Model                      | TP/DP/PP | Prompts | Threads | Ctx toks | Gen toks | Duration | TG t/s | PP t/s   | Workload | About                                                          |
| --------------- | ------------------------------------------------------------------------ | -------------------------- | -------- | ------- | ------- | -------- | -------- | -------- | ------ | -------- | -------- | -------------------------------------------------------------- |
| 20260326-194703 | docker.io/mixa3607/vllm-gfx906:43566ec-rocm-7.2.0-aiinfos-20260324214800 | Qwen/Qwen3-VL-Embedding-8B | 1/4/1    | 32      | 1       | 2048     | 0        | 00:01:39 | -      | 661.73   | embed    | [recipe](../../recipes/Qwen3-VL-Embedding-8B/index.md#setup-a) |
| 20260326-194822 | docker.io/mixa3607/vllm-gfx906:43566ec-rocm-7.2.0-aiinfos-20260324214800 | Qwen/Qwen3-VL-Embedding-8B | 1/4/1    | 64      | 4       | 2048     | 0        | 00:01:03 | -      | 2,072.39 | embed    | [recipe](../../recipes/Qwen3-VL-Embedding-8B/index.md#setup-a) |
| 20260326-195021 | docker.io/mixa3607/vllm-gfx906:43566ec-rocm-7.2.0-aiinfos-20260324214800 | Qwen/Qwen3-VL-Embedding-8B | 1/4/1    | 128     | 8       | 2048     | 0        | 00:01:44 | -      | 2,510.16 | embed    | [recipe](../../recipes/Qwen3-VL-Embedding-8B/index.md#setup-a) |
| 20260326-195344 | docker.io/mixa3607/vllm-gfx906:43566ec-rocm-7.2.0-aiinfos-20260324214800 | Qwen/Qwen3-VL-Embedding-8B | 1/4/1    | 256     | 16      | 2048     | 0        | 00:03:07 | -      | 2,792.35 | embed    | [recipe](../../recipes/Qwen3-VL-Embedding-8B/index.md#setup-a) |
| 20260326-195917 | docker.io/mixa3607/vllm-gfx906:43566ec-rocm-7.2.0-aiinfos-20260324214800 | Qwen/Qwen3-VL-Embedding-8B | 1/4/1    | 384     | 32      | 2048     | 0        | 00:05:13 | -      | 2,509.97 | embed    | [recipe](../../recipes/Qwen3-VL-Embedding-8B/index.md#setup-a) |
| 20260326-195956 | docker.io/mixa3607/vllm-gfx906:43566ec-rocm-7.2.0-aiinfos-20260324214800 | Qwen/Qwen3-VL-Embedding-8B | 1/4/1    | 64      | 1       | 256      | 0        | 00:00:24 | -      | 681.49   | embed    | [recipe](../../recipes/Qwen3-VL-Embedding-8B/index.md#setup-a) |
| 20260326-200023 | docker.io/mixa3607/vllm-gfx906:43566ec-rocm-7.2.0-aiinfos-20260324214800 | Qwen/Qwen3-VL-Embedding-8B | 1/4/1    | 128     | 4       | 256      | 0        | 00:00:14 | -      | 2,298.45 | embed    | [recipe](../../recipes/Qwen3-VL-Embedding-8B/index.md#setup-a) |
| 20260326-200058 | docker.io/mixa3607/vllm-gfx906:43566ec-rocm-7.2.0-aiinfos-20260324214800 | Qwen/Qwen3-VL-Embedding-8B | 1/4/1    | 256     | 8       | 256      | 0        | 00:00:21 | -      | 3,032.53 | embed    | [recipe](../../recipes/Qwen3-VL-Embedding-8B/index.md#setup-a) |
| 20260326-200136 | docker.io/mixa3607/vllm-gfx906:43566ec-rocm-7.2.0-aiinfos-20260324214800 | Qwen/Qwen3-VL-Embedding-8B | 1/4/1    | 384     | 16      | 256      | 0        | 00:00:25 | -      | 3,832.70 | embed    | [recipe](../../recipes/Qwen3-VL-Embedding-8B/index.md#setup-a) |
| 20260326-200219 | docker.io/mixa3607/vllm-gfx906:43566ec-rocm-7.2.0-aiinfos-20260324214800 | Qwen/Qwen3-VL-Embedding-8B | 1/4/1    | 512     | 32      | 256      | 0        | 00:00:30 | -      | 4,241.59 | embed    | [recipe](../../recipes/Qwen3-VL-Embedding-8B/index.md#setup-a) |

</TableWrapper>
