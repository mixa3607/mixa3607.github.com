---
title: Qwen3.5 2B
sidebar_position: 301
---

import DocCardList from "@theme/DocCardList";
import VllmHelmNote from "/docs/wiki/AMD_GFX906/vllm/_helm_note.mdx";

# Qwen3.5 2B vLLM recipes

<VllmHelmNote/>

## A. [QuantTrio/Qwen3.5-2B-AWQ](https://huggingface.co/QuantTrio/Qwen3.5-2B-AWQ) + vLLM 0.18.1rc{#setup-a}

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
    model: QuantTrio/Qwen3.5-2B-AWQ
    served-model-name:
      - Qwen3.5-2B
      - QuantTrio/Qwen3.5-2B-AWQ
    async-scheduling: true
    trust-remote-code: true
    # gpus setup related
    max-model-len: 65K
    tensor-parallel-size: 2
    data-parallel-size: 1
    gpu-memory-utilization: 0.95
    dtype: float16
    # multimodality
    limit-mm-per-prompt.image: 16
    limit-mm-per-prompt.video: 1
```
