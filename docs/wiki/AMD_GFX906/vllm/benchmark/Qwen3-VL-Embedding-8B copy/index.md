---
title: Qwen3 27B
sidebar_position: 303
hide_table_of_contents: true
---

import DocCardList from "@theme/DocCardList";
import TableWrapper from "@site/src/components/TableWrapper.tsx";
import VllmHelmNote from "/docs/wiki/AMD_GFX906/vllm/\_helm_note.mdx";

# Qwen3 27B benchmarks

- TP/DP/PP - tensor/data/pipeline parallelism
- TG t/s - text generation in tps
- PP t/s - prompt processing in tps

<TableWrapper>

| Image                                                    | Model            | TP/DP/PP | Prompts | Threads | Ctx toks | Gen toks | PP t/s | TG t/s | Workload | About                                                          |
| -------------------------------------------------------- | ---------------- | -------- | ------- | ------- | -------- | -------- | ------ | ------ | -------- | -------------------------------------------------------------- |
| docker.io/mixa3607/vllm-gfx906:0.19.1-rocm-7.2.1-aiinfos | Qwen/Qwen3.5-27B | 4/1/1    | 30      | 1       | 1024     | 1        | 382.73 | -      | pp       | [recipe (setup-b)](../../recipes/Qwen3.5-27B/index.md#setup-b) |
| docker.io/mixa3607/vllm-gfx906:0.19.1-rocm-7.2.1-aiinfos | Qwen/Qwen3.5-27B | 4/1/1    | 20      | 1       | 4096     | 1        | 689.11 | -      | pp       | [recipe (setup-b)](../../recipes/Qwen3.5-27B/index.md#setup-b) |
| docker.io/mixa3607/vllm-gfx906:0.19.1-rocm-7.2.1-aiinfos | Qwen/Qwen3.5-27B | 4/1/1    | 10      | 1       | 8192     | 1        | 924.34 | -      | pp       | [recipe (setup-b)](../../recipes/Qwen3.5-27B/index.md#setup-b) |
| docker.io/mixa3607/vllm-gfx906:0.19.1-rocm-7.2.1-aiinfos | Qwen/Qwen3.5-27B | 4/1/1    | 8       | 1       | 16384    | 1        | 887.21 | -      | pp       | [recipe (setup-b)](../../recipes/Qwen3.5-27B/index.md#setup-b) |
| docker.io/mixa3607/vllm-gfx906:0.19.1-rocm-7.2.1-aiinfos | Qwen/Qwen3.5-27B | 4/1/1    | 6       | 1       | 32768    | 1        | 719.94 | -      | pp       | [recipe (setup-b)](../../recipes/Qwen3.5-27B/index.md#setup-b) |
| docker.io/mixa3607/vllm-gfx906:0.19.1-rocm-7.2.1-aiinfos | Qwen/Qwen3.5-27B | 4/1/1    | 4       | 1       | 65536    | 1        | 567.68 | -      | pp       | [recipe (setup-b)](../../recipes/Qwen3.5-27B/index.md#setup-b) |
| docker.io/mixa3607/vllm-gfx906:0.19.1-rocm-7.2.1-aiinfos | Qwen/Qwen3.5-27B | 4/1/1    | 10      | 1       | 16       | 256      | -      | 33.29  | tg       | [recipe (setup-b)](../../recipes/Qwen3.5-27B/index.md#setup-b) |
| docker.io/mixa3607/vllm-gfx906:0.19.1-rocm-7.2.1-aiinfos | Qwen/Qwen3.5-27B | 4/1/1    | 10      | 1       | 4096     | 256      | -      | 28.81  | tg       | [recipe (setup-b)](../../recipes/Qwen3.5-27B/index.md#setup-b) |
| docker.io/mixa3607/vllm-gfx906:0.19.1-rocm-7.2.1-aiinfos | Qwen/Qwen3.5-27B | 4/1/1    | 10      | 1       | 16384    | 256      | -      | 20.15  | tg       | [recipe (setup-b)](../../recipes/Qwen3.5-27B/index.md#setup-b) |
| docker.io/mixa3607/vllm-gfx906:0.19.1-rocm-7.2.1-aiinfos | Qwen/Qwen3.5-27B | 4/1/1    | 10      | 1       | 32768    | 256      | -      | 16.22  | tg       | [recipe (setup-b)](../../recipes/Qwen3.5-27B/index.md#setup-b) |
| docker.io/mixa3607/vllm-gfx906:0.19.1-rocm-7.2.1-aiinfos | Qwen/Qwen3.5-27B | 4/1/1    | 10      | 1       | 65536    | 256      | -      | 11.95  | tg       | [recipe (setup-b)](../../recipes/Qwen3.5-27B/index.md#setup-b) |
| docker.io/mixa3607/vllm-gfx906:0.19.1-rocm-7.2.1-aiinfos | Qwen/Qwen3.5-27B | 4/1/1    | 10      | 1       | 131072   | 256      | -      | 8.16   | tg       | [recipe (setup-b)](../../recipes/Qwen3.5-27B/index.md#setup-b) |
| docker.io/mixa3607/vllm-gfx906:0.19.1-rocm-7.2.1-aiinfos | Qwen/Qwen3.5-27B | 4/1/1    | 30      | 4       | 16       | 256      | -      | 48.72  | tg       | [recipe (setup-b)](../../recipes/Qwen3.5-27B/index.md#setup-b) |
| docker.io/mixa3607/vllm-gfx906:0.19.1-rocm-7.2.1-aiinfos | Qwen/Qwen3.5-27B | 4/1/1    | 30      | 4       | 4096     | 256      | -      | 42.77  | tg       | [recipe (setup-b)](../../recipes/Qwen3.5-27B/index.md#setup-b) |
| docker.io/mixa3607/vllm-gfx906:0.19.1-rocm-7.2.1-aiinfos | Qwen/Qwen3.5-27B | 4/1/1    | 30      | 4       | 16384    | 256      | -      | 30.81  | tg       | [recipe (setup-b)](../../recipes/Qwen3.5-27B/index.md#setup-b) |
| docker.io/mixa3607/vllm-gfx906:0.19.1-rocm-7.2.1-aiinfos | Qwen/Qwen3.5-27B | 4/1/1    | 30      | 4       | 32768    | 256      | -      | 26.10  | tg       | [recipe (setup-b)](../../recipes/Qwen3.5-27B/index.md#setup-b) |
| docker.io/mixa3607/vllm-gfx906:0.19.1-rocm-7.2.1-aiinfos | Qwen/Qwen3.5-27B | 4/1/1    | 30      | 4       | 65536    | 256      | -      | 20.54  | tg       | [recipe (setup-b)](../../recipes/Qwen3.5-27B/index.md#setup-b) |
| docker.io/mixa3607/vllm-gfx906:0.19.1-rocm-7.2.1-aiinfos | Qwen/Qwen3.5-27B | 4/1/1    | 30      | 4       | 131072   | 256      | -      | 15.72  | tg       | [recipe (setup-b)](../../recipes/Qwen3.5-27B/index.md#setup-b) |

</TableWrapper>
