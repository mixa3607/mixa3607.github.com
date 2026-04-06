---
title: Gemma4 31B
sidebar_position: 102
---

import DocCardList from "@theme/DocCardList";
import VllmHelmNote from "/docs/wiki/AMD_GFX906/vllm/_helm_note.mdx";

# Gemma4 31B vLLM recipes

<VllmHelmNote/>

## A. [google/gemma-4-31B-it](https://huggingface.co/google/gemma-4-31B-it) {#setup-a}

```yaml title="yaml setup"
image:
  registry: docker.io
  repository: mixa3607/vllm-gfx906
  tag: 0.19.1-rocm-7.2.1-aiinfos-20260405173349

extraEnvVars:
  - name: FLASH_ATTENTION_TRITON_AMD_ENABLE
    value: "TRUE"
  - name: VLLM_MEMORY_PROFILER_ESTIMATE_CUDAGRAPHS
    value: "1"

app-configuration:
  vllm.yaml: |-
    model: google/gemma-4-31B-it
    served-model-name:
      - gemma-4-31B
      - google/gemma-4-31B-it
    async-scheduling: true
    trust-remote-code: true
    enable-auto-tool-choice: true
    reasoning-parser: gemma4
    tool-call-parser: gemma4
    max-model-len: 33K
    tensor-parallel-size: 4
    data-parallel-size: 1
    dtype: float16
    gpu-memory-utilization: 0.95
    limit-mm-per-prompt.image: 4
    limit-mm-per-prompt.video: 1
    max-num-seqs: 16
```

## B. [cyankiwi/gemma-4-31B-it-AWQ-8bit](https://huggingface.co/cyankiwi/gemma-4-31B-it-AWQ-8bit) {#setup-b}

```yaml title="yaml setup"
image:
  registry: docker.io
  repository: mixa3607/vllm-gfx906
  tag: 0.19.1-rocm-7.2.1-aiinfos-20260405173349

extraEnvVars:
  - name: FLASH_ATTENTION_TRITON_AMD_ENABLE
    value: "TRUE"
  - name: VLLM_MEMORY_PROFILER_ESTIMATE_CUDAGRAPHS
    value: "1"

app-configuration:
  vllm.yaml: |-
    model: cyankiwi/gemma-4-31B-it-AWQ-8bit
    served-model-name:
      - gemma-4-31B
      - cyankiwi/gemma-4-31B-it-AWQ-8bit
    async-scheduling: true
    trust-remote-code: true
    enable-auto-tool-choice: true
    reasoning-parser: gemma4
    tool-call-parser: gemma4
    max-model-len: 65K
    tensor-parallel-size: 4
    data-parallel-size: 1
    dtype: float16
    gpu-memory-utilization: 0.95
    limit-mm-per-prompt.image: 4
    limit-mm-per-prompt.video: 1
    max-num-seqs: 16
```

## C. [cyankiwi/gemma-4-31B-it-AWQ-4bit](https://huggingface.co/cyankiwi/gemma-4-31B-it-AWQ-4bit) {#setup-c}

```yaml title="yaml setup"
image:
  registry: docker.io
  repository: mixa3607/vllm-gfx906
  tag: 0.19.1-rocm-7.2.1-aiinfos-20260405173349

extraEnvVars:
  - name: FLASH_ATTENTION_TRITON_AMD_ENABLE
    value: "TRUE"
  - name: VLLM_MEMORY_PROFILER_ESTIMATE_CUDAGRAPHS
    value: "1"

app-configuration:
  vllm.yaml: |-
    model: cyankiwi/gemma-4-31B-it-AWQ-4bit
    served-model-name:
      - gemma-4-31B
      - cyankiwi/gemma-4-31B-it-AWQ-4bit
    async-scheduling: true
    trust-remote-code: true
    enable-auto-tool-choice: true
    reasoning-parser: gemma4
    tool-call-parser: gemma4
    max-model-len: 65K
    tensor-parallel-size: 4
    data-parallel-size: 1
    dtype: float16
    gpu-memory-utilization: 0.95
    limit-mm-per-prompt.image: 4
    limit-mm-per-prompt.video: 1
    max-num-seqs: 16
```
