---
title: Qwen3.6 35B A3B
sidebar_position: 401
hide_table_of_contents: true
---

import DocCardList from "@theme/DocCardList";
import TableWrapper from "@site/src/components/TableWrapper.tsx";
import VllmHelmNote from "/docs/wiki/AMD_GFX906/vllm/\_helm_note.mdx";

# Qwen3.6 35B A3B benchmarks

- TP/DP/PP - tensor/data/pipeline parallelism
- TG t/s - text generation is tps
- PP t/s - prompt processing is tps

<TableWrapper>

| Image                                                    | Model                             | TP/DP/PP | Prompts | Threads | Ctx toks | Gen toks | PP t/s   | TG t/s | Workload | About                                                              |
| -------------------------------------------------------- | --------------------------------- | -------- | ------- | ------- | -------- | -------- | -------- | ------ | -------- | ------------------------------------------------------------------ |
| docker.io/mixa3607/vllm-gfx906:0.19.1-rocm-7.2.1-aiinfos | Qwen/Qwen3.6-35B-A3B              | 4/1/1    | 30      | 1       | 1024     | 1        | 1,475.58 | -      | pp       | [recipe (setup-a)](../../recipes/Qwen3.6-35B-A3B/index.md#setup-a) |
| docker.io/mixa3607/vllm-gfx906:0.19.1-rocm-7.2.1-aiinfos | Qwen/Qwen3.6-35B-A3B              | 4/1/1    | 20      | 1       | 4096     | 1        | 2,467.34 | -      | pp       | [recipe (setup-a)](../../recipes/Qwen3.6-35B-A3B/index.md#setup-a) |
| docker.io/mixa3607/vllm-gfx906:0.19.1-rocm-7.2.1-aiinfos | Qwen/Qwen3.6-35B-A3B              | 4/1/1    | 10      | 1       | 8192     | 1        | 3,428.55 | -      | pp       | [recipe (setup-a)](../../recipes/Qwen3.6-35B-A3B/index.md#setup-a) |
| docker.io/mixa3607/vllm-gfx906:0.19.1-rocm-7.2.1-aiinfos | Qwen/Qwen3.6-35B-A3B              | 4/1/1    | 8       | 1       | 16384    | 1        | 3,237.08 | -      | pp       | [recipe (setup-a)](../../recipes/Qwen3.6-35B-A3B/index.md#setup-a) |
| docker.io/mixa3607/vllm-gfx906:0.19.1-rocm-7.2.1-aiinfos | Qwen/Qwen3.6-35B-A3B              | 4/1/1    | 6       | 1       | 32768    | 1        | 2,605.57 | -      | pp       | [recipe (setup-a)](../../recipes/Qwen3.6-35B-A3B/index.md#setup-a) |
| docker.io/mixa3607/vllm-gfx906:0.19.1-rocm-7.2.1-aiinfos | Qwen/Qwen3.6-35B-A3B              | 4/1/1    | 4       | 1       | 65536    | 1        | 1,882.20 | -      | pp       | [recipe (setup-a)](../../recipes/Qwen3.6-35B-A3B/index.md#setup-a) |
| docker.io/mixa3607/vllm-gfx906:0.19.1-rocm-7.2.1-aiinfos | Qwen/Qwen3.6-35B-A3B              | 4/1/1    | 4       | 1       | 131072   | 1        | 1,085.81 | -      | pp       | [recipe (setup-a)](../../recipes/Qwen3.6-35B-A3B/index.md#setup-a) |
| docker.io/mixa3607/vllm-gfx906:0.19.1-rocm-7.2.1-aiinfos | Qwen/Qwen3.6-35B-A3B              | 4/1/1    | 10      | 1       | 16       | 256      | -        | 40.26  | tg       | [recipe (setup-a)](../../recipes/Qwen3.6-35B-A3B/index.md#setup-a) |
| docker.io/mixa3607/vllm-gfx906:0.19.1-rocm-7.2.1-aiinfos | Qwen/Qwen3.6-35B-A3B              | 4/1/1    | 10      | 1       | 4096     | 256      | -        | 36.10  | tg       | [recipe (setup-a)](../../recipes/Qwen3.6-35B-A3B/index.md#setup-a) |
| docker.io/mixa3607/vllm-gfx906:0.19.1-rocm-7.2.1-aiinfos | Qwen/Qwen3.6-35B-A3B              | 4/1/1    | 10      | 1       | 16384    | 256      | -        | 30.94  | tg       | [recipe (setup-a)](../../recipes/Qwen3.6-35B-A3B/index.md#setup-a) |
| docker.io/mixa3607/vllm-gfx906:0.19.1-rocm-7.2.1-aiinfos | Qwen/Qwen3.6-35B-A3B              | 4/1/1    | 10      | 1       | 32768    | 256      | -        | 24.90  | tg       | [recipe (setup-a)](../../recipes/Qwen3.6-35B-A3B/index.md#setup-a) |
| docker.io/mixa3607/vllm-gfx906:0.19.1-rocm-7.2.1-aiinfos | Qwen/Qwen3.6-35B-A3B              | 4/1/1    | 10      | 1       | 65536    | 256      | -        | 18.28  | tg       | [recipe (setup-a)](../../recipes/Qwen3.6-35B-A3B/index.md#setup-a) |
| docker.io/mixa3607/vllm-gfx906:0.19.1-rocm-7.2.1-aiinfos | Qwen/Qwen3.6-35B-A3B              | 4/1/1    | 10      | 1       | 131072   | 256      | -        | 11.80  | tg       | [recipe (setup-a)](../../recipes/Qwen3.6-35B-A3B/index.md#setup-a) |
| docker.io/mixa3607/vllm-gfx906:0.19.1-rocm-7.2.1-aiinfos | Qwen/Qwen3.6-35B-A3B              | 4/1/1    | 30      | 4       | 16       | 256      | -        | 69.40  | tg       | [recipe (setup-a)](../../recipes/Qwen3.6-35B-A3B/index.md#setup-a) |
| docker.io/mixa3607/vllm-gfx906:0.19.1-rocm-7.2.1-aiinfos | Qwen/Qwen3.6-35B-A3B              | 4/1/1    | 30      | 4       | 4096     | 256      | -        | 63.94  | tg       | [recipe (setup-a)](../../recipes/Qwen3.6-35B-A3B/index.md#setup-a) |
| docker.io/mixa3607/vllm-gfx906:0.19.1-rocm-7.2.1-aiinfos | Qwen/Qwen3.6-35B-A3B              | 4/1/1    | 30      | 4       | 16384    | 256      | -        | 58.38  | tg       | [recipe (setup-a)](../../recipes/Qwen3.6-35B-A3B/index.md#setup-a) |
| docker.io/mixa3607/vllm-gfx906:0.19.1-rocm-7.2.1-aiinfos | Qwen/Qwen3.6-35B-A3B              | 4/1/1    | 30      | 4       | 32768    | 256      | -        | 47.77  | tg       | [recipe (setup-a)](../../recipes/Qwen3.6-35B-A3B/index.md#setup-a) |
| docker.io/mixa3607/vllm-gfx906:0.19.1-rocm-7.2.1-aiinfos | Qwen/Qwen3.6-35B-A3B              | 4/1/1    | 30      | 4       | 65536    | 256      | -        | 37.02  | tg       | [recipe (setup-a)](../../recipes/Qwen3.6-35B-A3B/index.md#setup-a) |
| docker.io/mixa3607/vllm-gfx906:0.19.1-rocm-7.2.1-aiinfos | Qwen/Qwen3.6-35B-A3B              | 4/1/1    | 30      | 4       | 131072   | 256      | -        | 24.73  | tg       | [recipe (setup-a)](../../recipes/Qwen3.6-35B-A3B/index.md#setup-a) |
| docker.io/mixa3607/vllm-gfx906:0.19.1-rocm-7.2.1-aiinfos | cyankiwi/Qwen3.6-35B-A3B-AWQ-4bit | 4/1/1    | 30      | 1       | 1024     | 1        | 1,399.29 | -      | pp       | [recipe (setup-b)](../../recipes/Qwen3.6-35B-A3B/index.md#setup-b) |
| docker.io/mixa3607/vllm-gfx906:0.19.1-rocm-7.2.1-aiinfos | cyankiwi/Qwen3.6-35B-A3B-AWQ-4bit | 4/1/1    | 20      | 1       | 4096     | 1        | 2,048.55 | -      | pp       | [recipe (setup-b)](../../recipes/Qwen3.6-35B-A3B/index.md#setup-b) |
| docker.io/mixa3607/vllm-gfx906:0.19.1-rocm-7.2.1-aiinfos | cyankiwi/Qwen3.6-35B-A3B-AWQ-4bit | 4/1/1    | 10      | 1       | 8192     | 1        | 2,718.95 | -      | pp       | [recipe (setup-b)](../../recipes/Qwen3.6-35B-A3B/index.md#setup-b) |
| docker.io/mixa3607/vllm-gfx906:0.19.1-rocm-7.2.1-aiinfos | cyankiwi/Qwen3.6-35B-A3B-AWQ-4bit | 4/1/1    | 8       | 1       | 16384    | 1        | 2,357.25 | -      | pp       | [recipe (setup-b)](../../recipes/Qwen3.6-35B-A3B/index.md#setup-b) |
| docker.io/mixa3607/vllm-gfx906:0.19.1-rocm-7.2.1-aiinfos | cyankiwi/Qwen3.6-35B-A3B-AWQ-4bit | 4/1/1    | 6       | 1       | 32768    | 1        | 1,740.15 | -      | pp       | [recipe (setup-b)](../../recipes/Qwen3.6-35B-A3B/index.md#setup-b) |
| docker.io/mixa3607/vllm-gfx906:0.19.1-rocm-7.2.1-aiinfos | cyankiwi/Qwen3.6-35B-A3B-AWQ-4bit | 4/1/1    | 4       | 1       | 65536    | 1        | 1,177.33 | -      | pp       | [recipe (setup-b)](../../recipes/Qwen3.6-35B-A3B/index.md#setup-b) |
| docker.io/mixa3607/vllm-gfx906:0.19.1-rocm-7.2.1-aiinfos | cyankiwi/Qwen3.6-35B-A3B-AWQ-4bit | 4/1/1    | 4       | 1       | 131072   | 1        | 656.51   | -      | pp       | [recipe (setup-b)](../../recipes/Qwen3.6-35B-A3B/index.md#setup-b) |
| docker.io/mixa3607/vllm-gfx906:0.19.1-rocm-7.2.1-aiinfos | cyankiwi/Qwen3.6-35B-A3B-AWQ-4bit | 4/1/1    | 10      | 1       | 0        | 0        | -        | 0.00   | tg       | [recipe (setup-b)](../../recipes/Qwen3.6-35B-A3B/index.md#setup-b) |
| docker.io/mixa3607/vllm-gfx906:0.19.1-rocm-7.2.1-aiinfos | cyankiwi/Qwen3.6-35B-A3B-AWQ-4bit | 4/1/1    | 10      | 1       | 16       | 256      | -        | 57.71  | tg       | [recipe (setup-b)](../../recipes/Qwen3.6-35B-A3B/index.md#setup-b) |
| docker.io/mixa3607/vllm-gfx906:0.19.1-rocm-7.2.1-aiinfos | cyankiwi/Qwen3.6-35B-A3B-AWQ-4bit | 4/1/1    | 10      | 1       | 4096     | 256      | -        | 48.05  | tg       | [recipe (setup-b)](../../recipes/Qwen3.6-35B-A3B/index.md#setup-b) |
| docker.io/mixa3607/vllm-gfx906:0.19.1-rocm-7.2.1-aiinfos | cyankiwi/Qwen3.6-35B-A3B-AWQ-4bit | 4/1/1    | 10      | 1       | 16384    | 256      | -        | 37.87  | tg       | [recipe (setup-b)](../../recipes/Qwen3.6-35B-A3B/index.md#setup-b) |
| docker.io/mixa3607/vllm-gfx906:0.19.1-rocm-7.2.1-aiinfos | cyankiwi/Qwen3.6-35B-A3B-AWQ-4bit | 4/1/1    | 10      | 1       | 32768    | 256      | -        | 27.88  | tg       | [recipe (setup-b)](../../recipes/Qwen3.6-35B-A3B/index.md#setup-b) |
| docker.io/mixa3607/vllm-gfx906:0.19.1-rocm-7.2.1-aiinfos | cyankiwi/Qwen3.6-35B-A3B-AWQ-4bit | 4/1/1    | 10      | 1       | 65536    | 256      | -        | 18.46  | tg       | [recipe (setup-b)](../../recipes/Qwen3.6-35B-A3B/index.md#setup-b) |
| docker.io/mixa3607/vllm-gfx906:0.19.1-rocm-7.2.1-aiinfos | cyankiwi/Qwen3.6-35B-A3B-AWQ-4bit | 4/1/1    | 10      | 1       | 131072   | 256      | -        | 10.92  | tg       | [recipe (setup-b)](../../recipes/Qwen3.6-35B-A3B/index.md#setup-b) |
| docker.io/mixa3607/vllm-gfx906:0.19.1-rocm-7.2.1-aiinfos | cyankiwi/Qwen3.6-35B-A3B-AWQ-4bit | 4/1/1    | 30      | 4       | 16       | 256      | -        | 88.35  | tg       | [recipe (setup-b)](../../recipes/Qwen3.6-35B-A3B/index.md#setup-b) |
| docker.io/mixa3607/vllm-gfx906:0.19.1-rocm-7.2.1-aiinfos | cyankiwi/Qwen3.6-35B-A3B-AWQ-4bit | 4/1/1    | 30      | 4       | 4096     | 256      | -        | 77.67  | tg       | [recipe (setup-b)](../../recipes/Qwen3.6-35B-A3B/index.md#setup-b) |
| docker.io/mixa3607/vllm-gfx906:0.19.1-rocm-7.2.1-aiinfos | cyankiwi/Qwen3.6-35B-A3B-AWQ-4bit | 4/1/1    | 30      | 4       | 16384    | 256      | -        | 67.77  | tg       | [recipe (setup-b)](../../recipes/Qwen3.6-35B-A3B/index.md#setup-b) |
| docker.io/mixa3607/vllm-gfx906:0.19.1-rocm-7.2.1-aiinfos | cyankiwi/Qwen3.6-35B-A3B-AWQ-4bit | 4/1/1    | 30      | 4       | 32768    | 256      | -        | 53.16  | tg       | [recipe (setup-b)](../../recipes/Qwen3.6-35B-A3B/index.md#setup-b) |
| docker.io/mixa3607/vllm-gfx906:0.19.1-rocm-7.2.1-aiinfos | cyankiwi/Qwen3.6-35B-A3B-AWQ-4bit | 4/1/1    | 30      | 4       | 65536    | 256      | -        | 36.90  | tg       | [recipe (setup-b)](../../recipes/Qwen3.6-35B-A3B/index.md#setup-b) |
| docker.io/mixa3607/vllm-gfx906:0.19.1-rocm-7.2.1-aiinfos | cyankiwi/Qwen3.6-35B-A3B-AWQ-4bit | 4/1/1    | 30      | 4       | 131072   | 256      | -        | 22.81  | tg       | [recipe (setup-b)](../../recipes/Qwen3.6-35B-A3B/index.md#setup-b) |

</TableWrapper>
