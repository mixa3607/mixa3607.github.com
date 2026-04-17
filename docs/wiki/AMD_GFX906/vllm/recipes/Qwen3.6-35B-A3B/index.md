---
title: Qwen3.6 35B A3B
sidebar_position: 401
---

import DocCardList from "@theme/DocCardList";
import VllmHelmNote from "/docs/wiki/AMD_GFX906/vllm/_helm_note.mdx";

# Qwen3.6 35B A3B vLLM recipes

<VllmHelmNote/>

## A. [Qwen/Qwen3.6-35B-A3B](https://huggingface.co/Qwen/Qwen3.6-35B-A3B) {#setup-a}

```yaml title="yaml setup"
image:
  registry: docker.io
  repository: mixa3607/vllm-gfx906
  tag: 0.19.1-rocm-7.2.1-aiinfos

extraEnvVars:
  - name: FLASH_ATTENTION_TRITON_AMD_ENABLE
    value: "TRUE"
  - name: VLLM_MEMORY_PROFILER_ESTIMATE_CUDAGRAPHS
    value: "1"
  - name: RECIPE
    value: "Setup A"

app-configuration:
  vllm.yaml: |-
    model: Qwen/Qwen3.6-35B-A3B
    served-model-name:
      - Qwen3.6-35B-A3B
      - Qwen/Qwen3.6-35B-A3B
    async-scheduling: true
    trust-remote-code: true
    enable-auto-tool-choice: true
    reasoning-parser: qwen3
    tool-call-parser: qwen3_coder
    max-model-len: 200K
    tensor-parallel-size: 4
    data-parallel-size: 1
    dtype: float16
    gpu-memory-utilization: 0.95
    limit-mm-per-prompt.image: 20
    limit-mm-per-prompt.video: 4
    max-num-seqs: 16
    enable-expert-parallel: true
    enable-prefix-caching: true
```
