---
title: Qwen3 VL Embedding 8B
sidebar_position: 203
---

import DocCardList from "@theme/DocCardList";
import VllmHelmNote from "/docs/wiki/AMD_GFX906/vllm/_helm_note.mdx";

# Qwen3 VL Embedding 8B vLLM recipes

<VllmHelmNote/>

## A. [Qwen/Qwen3-VL-Embedding-8B](https://huggingface.co/Qwen/Qwen3-VL-Embedding-8B) + vLLM 0.18.1rc{#setup-a}

```yaml title="yaml setup"
image:
  registry: docker.io
  repository: mixa3607/vllm-gfx906
  tag: 43566ec-rocm-7.2.0-aiinfos-20260324214800

extraEnvVars:
  - name: FLASH_ATTENTION_TRITON_AMD_ENABLE
    value: "TRUE"
  - name: FLASH_ATTENTION_TRITON_AMD_REF
    value: "TRUE"
  - name: VLLM_MEMORY_PROFILER_ESTIMATE_CUDAGRAPHS
    value: "1"
  - name: RECIPE
    value: "Setup A"

app-configuration:
  vllm.yaml: |-
    # basics
    model: Qwen/Qwen3-VL-Embedding-8B
    served-model-name:
      - Qwen3-VL-Embedding
      - Qwen/Qwen3-VL-Embedding-8B
    async-scheduling: true
    trust-remote-code: true
    runner: pooling
    convert: embed
    # gpus setup related
    max-num-seqs: 32
    max-model-len: 16K
    tensor-parallel-size: 1
    data-parallel-size: 4
    gpu-memory-utilization: 0.95
    dtype: float16
    # multimodality
    limit-mm-per-prompt.image: 1
    limit-mm-per-prompt.video: 1
```
