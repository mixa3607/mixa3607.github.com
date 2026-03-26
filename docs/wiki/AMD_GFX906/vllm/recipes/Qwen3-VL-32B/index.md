---
title: Qwen3 VL 32B
sidebar_position: 202
---

import DocCardList from "@theme/DocCardList";
import VllmHelmNote from "/docs/wiki/AMD_GFX906/vllm/_helm_note.mdx";

# Qwen3 VL 32B vLLM recipes

<VllmHelmNote/>

## A. [QuantTrio/Qwen3-VL-32B-Instruct-AWQ](https://huggingface.co/QuantTrio/Qwen3-VL-32B-Instruct-AWQ) + vLLM 0.12.0 {#setup-a}

```yaml title="yaml setup"
image:
  registry: docker.io
  repository: mixa3607/vllm-gfx906
  tag: 0.12.0-rocm-6.3.3-nlzy-20260309165414

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
    model: QuantTrio/Qwen3-VL-32B-Instruct-AWQ
    served-model-name:
      - Qwen3-VL-32B
      - QuantTrio/Qwen3-VL-32B-Instruct-AWQ
    async-scheduling: true
    # gpus setup related
    max-model-len: 65K
    tensor-parallel-size: 4
    data-parallel-size: 1
    gpu-memory-utilization: 0.95
    # multimodality
    limit-mm-per-prompt.image: 16
```

