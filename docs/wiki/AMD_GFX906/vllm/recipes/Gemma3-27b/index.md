---
title: Gemma3 27B
sidebar_position: 10
---

import DocCardList from "@theme/DocCardList";
import VllmHelmNote from "/docs/wiki/AMD_GFX906/vllm/_helm_note.mdx";

# Gemma3 27B vLLM recipes

<VllmHelmNote/>

## A. [gaunernst/gemma-3-27b-it-qat-autoawq](https://huggingface.co/gaunernst/gemma-3-27b-it-qat-autoawq) + vLLM 0.12.0 {#gemma-setup-a}

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
    model: gaunernst/gemma-3-27b-it-qat-autoawq
    served-model-name:
      - gemma-3-27b
      - gaunernst/gemma-3-27b-it-qat-autoawq
    async-scheduling: true
    # gpus setup related
    max-model-len: 65K
    tensor-parallel-size: 4
    data-parallel-size: 1
    gpu-memory-utilization: 0.95
    # multimodality
    limit-mm-per-prompt.image: 16
```

