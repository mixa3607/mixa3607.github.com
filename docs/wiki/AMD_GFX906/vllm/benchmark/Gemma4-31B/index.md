---
title: Gemma4 31B
sidebar_position: 102
---

import DocCardList from "@theme/DocCardList";
import TableWrapper from "@site/src/components/TableWrapper.tsx";
import VllmHelmNote from "/docs/wiki/AMD_GFX906/vllm/\_helm_note.mdx";

# Gemma3 27B benchmarks

- TP/DP/PP - tensor/data/pipeline parallelism
- TG t/s - text generation is tps
- PP t/s - prompt processing is tps

<TableWrapper>

| Image                                                    | Model                            | TP/DP/PP | Prompts | Threads | Ctx toks | Gen toks | PP t/s | TG t/s | Workload | About                                                               |
| -------------------------------------------------------- | -------------------------------- | -------- | ------- | ------- | -------- | -------- | ------ | ------ | -------- | ------------------------------------------------------------------- |
| docker.io/mixa3607/vllm-gfx906:0.19.1-rocm-7.2.1-aiinfos | cyankiwi/gemma-4-31B-it-AWQ-8bit | 4/1/1    | 30      | 1       | 1024     | 1        | 716.42 | -      | pp       | [recipe (setup-B)](../../recipes/Gemma4-31B/index.md#setup-b) |
| docker.io/mixa3607/vllm-gfx906:0.19.1-rocm-7.2.1-aiinfos | cyankiwi/gemma-4-31B-it-AWQ-8bit | 4/1/1    | 20      | 1       | 4096     | 1        | 760.49 | -      | pp       | [recipe (setup-B)](../../recipes/Gemma4-31B/index.md#setup-b) |
| docker.io/mixa3607/vllm-gfx906:0.19.1-rocm-7.2.1-aiinfos | cyankiwi/gemma-4-31B-it-AWQ-8bit | 4/1/1    | 10      | 1       | 8192     | 1        | 526.13 | -      | pp       | [recipe (setup-B)](../../recipes/Gemma4-31B/index.md#setup-b) |
| docker.io/mixa3607/vllm-gfx906:0.19.1-rocm-7.2.1-aiinfos | cyankiwi/gemma-4-31B-it-AWQ-8bit | 4/1/1    | 10      | 1       | 16384    | 1        | 612.38 | -      | pp       | [recipe (setup-B)](../../recipes/Gemma4-31B/index.md#setup-b) |
| docker.io/mixa3607/vllm-gfx906:0.19.1-rocm-7.2.1-aiinfos | cyankiwi/gemma-4-31B-it-AWQ-8bit | 4/1/1    | 10      | 1       | 32768    | 1        | 277.38 | -      | pp       | [recipe (setup-B)](../../recipes/Gemma4-31B/index.md#setup-b) |
| docker.io/mixa3607/vllm-gfx906:0.19.1-rocm-7.2.1-aiinfos | cyankiwi/gemma-4-31B-it-AWQ-8bit | 4/1/1    | 4       | 1       | 65536    | 1        | 203.63 | -      | pp       | [recipe (setup-B)](../../recipes/Gemma4-31B/index.md#setup-b) |
| docker.io/mixa3607/vllm-gfx906:0.19.1-rocm-7.2.1-aiinfos | cyankiwi/gemma-4-31B-it-AWQ-8bit | 4/1/1    | 10      | 1       | 16       | 256      | -      | 29.15  | tg       | [recipe (setup-B)](../../recipes/Gemma4-31B/index.md#setup-b) |
| docker.io/mixa3607/vllm-gfx906:0.19.1-rocm-7.2.1-aiinfos | cyankiwi/gemma-4-31B-it-AWQ-8bit | 4/1/1    | 10      | 1       | 4096     | 256      | -      | 19.79  | tg       | [recipe (setup-B)](../../recipes/Gemma4-31B/index.md#setup-b) |
| docker.io/mixa3607/vllm-gfx906:0.19.1-rocm-7.2.1-aiinfos | cyankiwi/gemma-4-31B-it-AWQ-8bit | 4/1/1    | 10      | 1       | 16384    | 256      | -      | 10.53  | tg       | [recipe (setup-B)](../../recipes/Gemma4-31B/index.md#setup-b) |
| docker.io/mixa3607/vllm-gfx906:0.19.1-rocm-7.2.1-aiinfos | cyankiwi/gemma-4-31B-it-AWQ-8bit | 4/1/1    | 10      | 1       | 32768    | 256      | -      | 7.67   | tg       | [recipe (setup-B)](../../recipes/Gemma4-31B/index.md#setup-b) |
| docker.io/mixa3607/vllm-gfx906:0.19.1-rocm-7.2.1-aiinfos | cyankiwi/gemma-4-31B-it-AWQ-8bit | 4/1/1    | 10      | 1       | 65536    | 256      | -      | 5.16   | tg       | [recipe (setup-B)](../../recipes/Gemma4-31B/index.md#setup-b) |
| docker.io/mixa3607/vllm-gfx906:0.19.1-rocm-7.2.1-aiinfos | cyankiwi/gemma-4-31B-it-AWQ-8bit | 4/1/1    | 30      | 4       | 16       | 256      | -      | 85.34  | tg       | [recipe (setup-B)](../../recipes/Gemma4-31B/index.md#setup-b) |
| docker.io/mixa3607/vllm-gfx906:0.19.1-rocm-7.2.1-aiinfos | cyankiwi/gemma-4-31B-it-AWQ-8bit | 4/1/1    | 30      | 4       | 4096     | 256      | -      | 58.42  | tg       | [recipe (setup-B)](../../recipes/Gemma4-31B/index.md#setup-b) |
| docker.io/mixa3607/vllm-gfx906:0.19.1-rocm-7.2.1-aiinfos | cyankiwi/gemma-4-31B-it-AWQ-8bit | 4/1/1    | 30      | 4       | 16384    | 256      | -      | 34.98  | tg       | [recipe (setup-B)](../../recipes/Gemma4-31B/index.md#setup-b) |
| docker.io/mixa3607/vllm-gfx906:0.19.1-rocm-7.2.1-aiinfos | cyankiwi/gemma-4-31B-it-AWQ-8bit | 4/1/1    | 30      | 4       | 32768    | 256      | -      | 25.68  | tg       | [recipe (setup-B)](../../recipes/Gemma4-31B/index.md#setup-b) |
| docker.io/mixa3607/vllm-gfx906:0.19.1-rocm-7.2.1-aiinfos | cyankiwi/gemma-4-31B-it-AWQ-8bit | 4/1/1    | 30      | 4       | 65536    | 256      | -      | 17.30  | tg       | [recipe (setup-B)](../../recipes/Gemma4-31B/index.md#setup-b) |
| docker.io/mixa3607/vllm-gfx906:0.19.1-rocm-7.2.1-aiinfos | cyankiwi/gemma-4-31B-it-AWQ-8bit | 4/1/1    | 60      | 8       | 16       | 256      | -      | 141.84 | tg       | [recipe (setup-B)](../../recipes/Gemma4-31B/index.md#setup-b) |
| docker.io/mixa3607/vllm-gfx906:0.19.1-rocm-7.2.1-aiinfos | cyankiwi/gemma-4-31B-it-AWQ-8bit | 4/1/1    | 60      | 8       | 4096     | 256      | -      | 90.84  | tg       | [recipe (setup-B)](../../recipes/Gemma4-31B/index.md#setup-b) |
| docker.io/mixa3607/vllm-gfx906:0.19.1-rocm-7.2.1-aiinfos | cyankiwi/gemma-4-31B-it-AWQ-8bit | 4/1/1    | 60      | 8       | 16384    | 256      | -      | 53.03  | tg       | [recipe (setup-B)](../../recipes/Gemma4-31B/index.md#setup-b) |
| docker.io/mixa3607/vllm-gfx906:0.19.1-rocm-7.2.1-aiinfos | cyankiwi/gemma-4-31B-it-AWQ-8bit | 4/1/1    | 60      | 8       | 32768    | 256      | -      | 37.28  | tg       | [recipe (setup-B)](../../recipes/Gemma4-31B/index.md#setup-b) |
| docker.io/mixa3607/vllm-gfx906:0.19.1-rocm-7.2.1-aiinfos | cyankiwi/gemma-4-31B-it-AWQ-8bit | 4/1/1    | 60      | 8       | 65536    | 256      | -      | 23.77  | tg       | [recipe (setup-B)](../../recipes/Gemma4-31B/index.md#setup-b) |
| docker.io/mixa3607/vllm-gfx906:0.19.1-rocm-7.2.1-aiinfos | cyankiwi/gemma-4-31B-it-AWQ-8bit | 4/1/1    | 90      | 16      | 16       | 256      | -      | 210.28 | tg       | [recipe (setup-B)](../../recipes/Gemma4-31B/index.md#setup-b) |
| docker.io/mixa3607/vllm-gfx906:0.19.1-rocm-7.2.1-aiinfos | cyankiwi/gemma-4-31B-it-AWQ-8bit | 4/1/1    | 90      | 16      | 4096     | 256      | -      | 120.06 | tg       | [recipe (setup-B)](../../recipes/Gemma4-31B/index.md#setup-b) |
| docker.io/mixa3607/vllm-gfx906:0.19.1-rocm-7.2.1-aiinfos | cyankiwi/gemma-4-31B-it-AWQ-8bit | 4/1/1    | 90      | 16      | 16384    | 256      | -      | 69.68  | tg       | [recipe (setup-B)](../../recipes/Gemma4-31B/index.md#setup-b) |
| docker.io/mixa3607/vllm-gfx906:0.19.1-rocm-7.2.1-aiinfos | cyankiwi/gemma-4-31B-it-AWQ-8bit | 4/1/1    | 90      | 16      | 32768    | 256      | -      | 47.33  | tg       | [recipe (setup-B)](../../recipes/Gemma4-31B/index.md#setup-b) |
| docker.io/mixa3607/vllm-gfx906:0.19.1-rocm-7.2.1-aiinfos | cyankiwi/gemma-4-31B-it-AWQ-8bit | 4/1/1    | 90      | 16      | 65536    | 256      | -      | 28.57  | tg       | [recipe (setup-B)](../../recipes/Gemma4-31B/index.md#setup-b) |

</TableWrapper>
