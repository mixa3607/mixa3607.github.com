#!/bin/bash
# curl -L 'https://github.com/mixa3607/mixa3607.github.com/raw/refs/heads/master/docs/wiki/AMD_GFX906/vllm/benchmark/bench.embedding-presets.sh' | bash

echo '
baseArgs: >
  --num-warmups 4
benchmarks:
  ########### EMBED 2048
  - workload: embed
    args: >
      --dataset-name random
      --random-input 2048
      --num-prompts 32 --max-concurrency 1
  - workload: embed
    args: >
      --dataset-name random
      --random-input 2048
      --num-prompts 64 --max-concurrency 4
  - workload: embed
    args: >
      --dataset-name random
      --random-input 2048
      --num-prompts 128 --max-concurrency 8
  - workload: embed
    args: >
      --dataset-name random
      --random-input 2048
      --num-prompts 256 --max-concurrency 16
  - workload: embed
    args: >
      --dataset-name random
      --random-input 2048
      --num-prompts 384 --max-concurrency 32

  ########### EMBED 256
  - workload: embed
    args: >
      --dataset-name random
      --random-input 256
      --num-prompts 64 --max-concurrency 1
  - workload: embed
    args: >
      --dataset-name random
      --random-input 256
      --num-prompts 128 --max-concurrency 4
  - workload: embed
    args: >
      --dataset-name random
      --random-input 256
      --num-prompts 256 --max-concurrency 8
  - workload: embed
    args: >
      --dataset-name random
      --random-input 256
      --num-prompts 384 --max-concurrency 16
  - workload: embed
    args: >
      --dataset-name random
      --random-input 256
      --num-prompts 512 --max-concurrency 32
' > bench-configs.yaml
