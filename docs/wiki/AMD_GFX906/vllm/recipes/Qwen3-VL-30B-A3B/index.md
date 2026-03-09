---
title: Qwen3 VL 30B-A3B
sidebar_position: 20
---

import DocCardList from "@theme/DocCardList";
import VllmHelmNote from "/docs/wiki/AMD_GFX906/vllm/_helm_note.mdx";

# Qwen3 VL 30B-A3B vLLM recipes

<VllmHelmNote/>

## A. [QuantTrio/Qwen3-VL-30B-A3B-Instruct-AWQ](https://huggingface.co/QuantTrio/Qwen3-VL-30B-A3B-Instruct-AWQ) + vLLM 0.11.0 {#setup-a}

```yaml title="yaml setup"
image:
  registry: docker.io
  repository: mixa3607/vllm-gfx906
  tag: 0.11.2-rocm-6.3.3-nlzy-20260309165414

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
    model: QuantTrio/Qwen3-VL-30B-A3B-Instruct-AWQ
    served-model-name:
      - Qwen3-VL-30B-A3B
      - QuantTrio/Qwen3-VL-30B-A3B-Instruct-AWQ
    async-scheduling: true
    # gpus setup related
    max-model-len: 64K
    max-num-batched-tokens: 8192
    max-num-seqs: 8
    tensor-parallel-size: 2
    data-parallel-size: 1
    gpu-memory-utilization: 0.95
    # multimodality
    mm-encoder-tp-mode: data
    limit-mm-per-prompt.image: 16
    limit-mm-per-prompt.video: 1
```

