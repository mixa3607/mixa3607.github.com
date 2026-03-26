---
title: Qwen3.5 122B-A10B
sidebar_position: 302
---

import DocCardList from "@theme/DocCardList";
import VllmHelmNote from "/docs/wiki/AMD_GFX906/vllm/_helm_note.mdx";

# Qwen3.5 122B-A10B vLLM recipes

<VllmHelmNote/>

## A. [QuantTrio/Qwen3.5-122B-A10B-AWQ](https://huggingface.co/QuantTrio/Qwen3.5-122B-A10B-AWQ) + vLLM 0.12.0 {#setup-a}

```yaml title="yaml setup"
image:
  registry: docker.io
  repository: mixa3607/vllm-gfx906
  tag: f854fc5-rocm-7.2.0-aiinfos-20260316021432

extraEnvVars:
  - name: VLLM_SLEEP_WHEN_IDLE
    value: "1"
  - name: VLLM_USE_V1
    value: "1"
  - name: VLLM_USE_TRITON_AWQ
    value: "1"
  - name: VLLM_USE_TRITON_FLASH_ATTN
    value: "True"
  - name: RECIPE
    value: "Setup A"

app-configuration:
  vllm.yaml: |-
    # basics
    model: QuantTrio/Qwen3.5-122B-A10B-AWQ
    served-model-name:
      - Qwen3.5-122B-A10B-AWQ
      - QuantTrio/Qwen3.5-122B-A10B-AWQ
    async-scheduling: true
    # gpus setup related
    max-model-len: 65K
    tensor-parallel-size: 4
    data-parallel-size: 1
    gpu-memory-utilization: 0.95
    dtype: float16
    # multimodality
    limit-mm-per-prompt.image: 16
    limit-mm-per-prompt.video: 1
```

