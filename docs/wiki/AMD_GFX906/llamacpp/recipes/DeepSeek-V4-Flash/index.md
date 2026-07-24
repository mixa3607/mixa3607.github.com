---
title: DeepSeek-V4-Flash
sidebar_position: 20
---

import DocCardList from "@theme/DocCardList";
import LlamaHelmNote from "/docs/wiki/AMD_GFX906/llamacpp/_helm_note.mdx";

# DeepSeek-V4-Flash LLAMA recipes

<LlamaHelmNote/>

DeepSeek-V4-Flash recipes. For benchmarks see [llama-bench](../../benchmark/DeepSeek-V4-Flash/index.md).

## [DeepSeek-V4-Flash bartowski:NVFP4](https://huggingface.co/bartowski/DeepSeek-V4-Flash-GGUF) + llama b10092 {#DeepSeek-V4-Flash-bartowski}

```yaml title="image"
image:
  registry: docker.io
  repository: mixa3607/llama.cpp-gfx906
  tag: b10092-rocm-7.2.4
```

```ini title="preset"
version = 1
[*]
log-colors = on
metrics = true
props = true
slots = true
jinja = true
context-shift = false
cache-idle-slots = true
cache-ram = {{ mul 8 1024 }}
batch-size = {{ mul 2 1024 }}
ubatch-size = {{ mul 2 1024 }}
offline = true

{{- $autoload_presets := list
                       "DeepSeek-V4-Flash"
}}

############### DeepSeek-V4-Flash
[{{- $preset := "DeepSeek-V4-Flash" -}}{{ $preset }}]
hf-repo = bartowski/DeepSeek-V4-Flash-GGUF
load-on-startup = {{ has $preset $autoload_presets }}
n-gpu-layers = all
split-mode = layer
kv-unified = true
threads = 32

## CTX
cache-ram = {{ mul 16 1024 }}
ctx-size = {{ mul 78 1024 }}

main-gpu = 0
tensor-split = 25,25,25,25
{{- $CPU_tensors := list
  "blk.0.ffn_down_exps.weight"
  "blk.0.ffn_up_exps.weight"
  "blk.1.ffn_down_exps.weight"
  "blk.1.ffn_up_exps.weight"
  "blk.2.ffn_down_exps.weight"
  "blk.2.ffn_up_exps.weight"
  "blk.3.ffn_down_exps.weight"
  "blk.3.ffn_up_exps.weight"
  "blk.4.ffn_down_exps.weight"
  "blk.11.ffn_down_exps.weight"
  "blk.11.ffn_up_exps.weight"
  "blk.12.ffn_down_exps.weight"
  "blk.12.ffn_up_exps.weight"
  "blk.13.ffn_down_exps.weight"
  "blk.13.ffn_up_exps.weight"
  "blk.14.ffn_down_exps.weight"
  "blk.22.ffn_down_exps.weight"
  "blk.22.ffn_up_exps.weight"
  "blk.23.ffn_down_exps.weight"
  "blk.23.ffn_up_exps.weight"
  "blk.24.ffn_down_exps.weight"
  "blk.24.ffn_up_exps.weight"
  "blk.25.ffn_down_exps.weight"
  "blk.25.ffn_up_exps.weight"
  "blk.33.ffn_down_exps.weight"
  "blk.33.ffn_up_exps.weight"
  "blk.34.ffn_down_exps.weight"
  "blk.34.ffn_up_exps.weight"
  "blk.35.ffn_down_exps.weight"
}}
override-tensor = ({{- join "|" $CPU_tensors }})=CPU
```

## [DeepSeek-V4-Flash unsloth:UD-Q8_K_XL](https://huggingface.co/unsloth/DeepSeek-V4-Flash-GGUF/tree/main/UD-Q8_K_XL) + llama b10092 {#DeepSeek-V4-Flash-unsloth}

```yaml title="image"
image:
  registry: docker.io
  repository: mixa3607/llama.cpp-gfx906
  tag: b10092-rocm-7.2.4
```

```ini title="preset"
version = 1
[*]
log-colors = on
metrics = true
props = true
slots = true
jinja = true
context-shift = false
cache-idle-slots = true
cache-ram = {{ mul 8 1024 }}
batch-size = {{ mul 2 1024 }}
ubatch-size = {{ mul 2 1024 }}
offline = true

{{- $autoload_presets := list
                       "DeepSeek-V4-Flash"
}}

############### DeepSeek-V4-Flash
[{{- $preset := "DeepSeek-V4-Flash" -}}{{ $preset }}]
hf-repo = unsloth/DeepSeek-V4-Flash-GGUF:UD-Q8_K_XL
load-on-startup = {{ has $preset $autoload_presets }}
n-gpu-layers = all
split-mode = layer
kv-unified = true
threads = 32

## CTX
cache-ram = {{ mul 16 1024 }}
ctx-size = {{ mul 78 1024 }}

main-gpu = 0
tensor-split = 25,25,25,25
{{- $CPU_tensors := list
                  "blk.0.ffn_down_exps.weight"
                  "blk.0.ffn_up_exps.weight"
                  "blk.1.ffn_down_exps.weight"
                  "blk.1.ffn_up_exps.weight"
                  "blk.2.ffn_down_exps.weight"
                  "blk.2.ffn_up_exps.weight"
                  "blk.3.ffn_down_exps.weight"
                  "blk.3.ffn_up_exps.weight"
                  "blk.4.ffn_down_exps.weight"
                  "blk.4.ffn_up_exps.weight"
                  "blk.11.ffn_down_exps.weight"
                  "blk.11.ffn_up_exps.weight"
                  "blk.12.ffn_down_exps.weight"
                  "blk.12.ffn_up_exps.weight"
                  "blk.13.ffn_down_exps.weight"
                  "blk.13.ffn_up_exps.weight"
                  "blk.14.ffn_down_exps.weight"
                  "blk.14.ffn_up_exps.weight"
                  "blk.22.ffn_down_exps.weight"
                  "blk.22.ffn_up_exps.weight"
                  "blk.23.ffn_down_exps.weight"
                  "blk.23.ffn_up_exps.weight"
                  "blk.24.ffn_down_exps.weight"
                  "blk.24.ffn_up_exps.weight"
                  "blk.25.ffn_down_exps.weight"
                  "blk.25.ffn_up_exps.weight"
                  "blk.26.ffn_down_exps.weight"
                  "blk.33.ffn_down_exps.weight"
                  "blk.33.ffn_up_exps.weight"
                  "blk.34.ffn_down_exps.weight"
                  "blk.34.ffn_up_exps.weight"
                  "blk.35.ffn_down_exps.weight"
                  "blk.35.ffn_up_exps.weight"
}}
override-tensor = ({{- join "|" $CPU_tensors }})=CPU
```
