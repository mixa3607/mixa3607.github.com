---
title: Qwen3.5 27B
sidebar_position: 303
---

import DocCardList from "@theme/DocCardList";
import VllmHelmNote from "/docs/wiki/AMD_GFX906/vllm/_helm_note.mdx";

# Qwen3.5 27B vLLM recipes

<VllmHelmNote/>

## A. [Qwen/Qwen3.5-27](https://huggingface.co/Qwen/Qwen3.5-27) {#setup-a}

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
    model: Qwen/Qwen3.5-27B
    served-model-name:
      - Qwen3.5-27B
    async-scheduling: true
    trust-remote-code: true
    enable-auto-tool-choice: true
    reasoning-parser: qwen3
    tool-call-parser: qwen3_coder
    max-model-len: 129K
    tensor-parallel-size: 4
    data-parallel-size: 1
    dtype: float16
    gpu-memory-utilization: 0.95
    limit-mm-per-prompt.image: 20
    limit-mm-per-prompt.video: 4
    max-num-seqs: 16
    enable-prefix-caching: true
    mm-encoder-tp-mode: data
```
