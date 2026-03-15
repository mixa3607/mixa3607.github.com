---
title: Qwen3-Coder-Next
sidebar_position: 10
---

import DocCardList from "@theme/DocCardList";
import LlamaHelmNote from "/docs/wiki/AMD_GFX906/llamacpp/_helm_note.mdx";

# Qwen3-Coder-Next LLAMA recipes

<LlamaHelmNote/>

## A. [unsloth/Qwen3-Coder-Next-GGUF #Q4_1](https://huggingface.co/unsloth/Qwen3-Coder-Next-GGUF/tree/main/Q4_1) + llama b8356 {#Qwen3-Coder-Next-setup-a}

```yaml title="yaml setup"
image:
  registry: docker.io
  repository: mixa3607/llama.cpp-gfx906
  tag: full-b8356-rocm-7.2.0-20260315183821

extraEnvVars:
- name: LLAMA_ARG_N_PARALLEL
  value: "1"
- name: LLAMA_ARG_THREADS_HTTP
  value: "-1"
- name: LLAMA_ARG_N_GPU_LAYERS
  value: "99"
- name: LLAMA_ARG_ENDPOINT_METRICS
  value: "true"
- name: LLAMA_ARG_ENDPOINT_SLOTS
  value: "true"
- name: LLAMA_ARG_ENDPOINT_PROPS
  value: "true"
- name: LLAMA_ARG_NO_MMAP
  value: "true"
- name: LLAMA_ARG_NO_CONTEXT_SHIFT
  value: "true"
- name: LLAMA_ARG_JINJA
  value: "true"
- name: LLAMA_ARG_MODEL
  value: '{{ .Values.modelBasePath }}/Q4_1/Qwen3-Coder-Next-Q4_1-00001-of-00003.gguf'
- name: LLAMA_ARG_ALIAS
  value: Qwen3-Coder-Next
- name: LLAMA_ARG_THREADS
  value: "146"
- name: LLAMA_ARG_NUMA
  value: distribute
- name: LLAMA_ARG_CTX_SIZE
  value: "16384"
- name: LLAMA_ARG_BATCH
  value: "4096"
- name: LLAMA_ARG_UBATCH
  value: "4096"
- name: LLAMA_ARG_SWA_CHECKPOINTS
  value: "0"
- name: LLAMA_ARG_MAIN_GPU
  value: "0"
- name: RECIPE
  value: "Setup A"
```

