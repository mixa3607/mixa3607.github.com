#!/bin/bash
# curl -L 'https://github.com/mixa3607/mixa3607.github.com/raw/refs/heads/master/docs/wiki/AMD_GFX906/vllm/benchmark/bench.compreltion-presets.sh' | bash

echo '
baseArgs: >
  --ignore-eos --num-warmups 1
benchmarks:
  ########### TG
  ## prefix-len 16
  - workload: tg
    args: >
      --dataset-name random
      --random-input-len 0 --random-prefix-len 16 --random-output-len 256
      --num-prompts 10 --max-concurrency=1
  - workload: tg
    args: >
      --dataset-name random
      --random-input-len 0 --random-prefix-len 16 --random-output-len 256
      --num-prompts=30 --max-concurrency=4
  - workload: tg
    args: >
      --dataset-name random
      --random-input-len 0 --random-prefix-len 16 --random-output-len 256
      --num-prompts 60 --max-concurrency 8
  - workload: tg
    args: >
      --dataset-name random
      --random-input-len 0 --random-prefix-len 16 --random-output-len 256
      --num-prompts 90 --max-concurrency 16
  - workload: tg
    args: >
      --dataset-name random
      --random-input-len 0 --random-prefix-len 16 --random-output-len 256
      --num-prompts 120 --max-concurrency 32

  ## prefix-len 4096
  - workload: tg
    args: >
      --dataset-name random
      --random-input-len 0 --random-prefix-len 4096 --random-output-len 256
      --num-prompts 10 --max-concurrency=1
  - workload: tg
    args: >
      --dataset-name random
      --random-input-len 0 --random-prefix-len 4096 --random-output-len 256
      --num-prompts=30 --max-concurrency=4
  - workload: tg
    args: >
      --dataset-name random
      --random-input-len 0 --random-prefix-len 4096 --random-output-len 256
      --num-prompts 60 --max-concurrency 8
  - workload: tg
    args: >
      --dataset-name random
      --random-input-len 0 --random-prefix-len 4096 --random-output-len 256
      --num-prompts 90 --max-concurrency 16
  - workload: tg
    args: >
      --dataset-name random
      --random-input-len 0 --random-prefix-len 4096 --random-output-len 256
      --num-prompts 120 --max-concurrency 32

  ## prefix-len 16384
  - workload: tg
    args: >
      --dataset-name random
      --random-input-len 0 --random-prefix-len 16384 --random-output-len 256
      --num-prompts 10 --max-concurrency=1
  - workload: tg
    args: >
      --dataset-name random
      --random-input-len 0 --random-prefix-len 16384 --random-output-len 256
      --num-prompts=30 --max-concurrency=4
  - workload: tg
    args: >
      --dataset-name random
      --random-input-len 0 --random-prefix-len 16384 --random-output-len 256
      --num-prompts 60 --max-concurrency 8
  - workload: tg
    args: >
      --dataset-name random
      --random-input-len 0 --random-prefix-len 16384 --random-output-len 256
      --num-prompts 90 --max-concurrency 16
  - workload: tg
    args: >
      --dataset-name random
      --random-input-len 0 --random-prefix-len 16384 --random-output-len 256
      --num-prompts 120 --max-concurrency 32

  ## prefix-len 32768
  - workload: tg
    args: >
      --dataset-name random
      --random-input-len 0 --random-prefix-len 32768 --random-output-len 256
      --num-prompts 10 --max-concurrency=1
  - workload: tg
    args: >
      --dataset-name random
      --random-input-len 0 --random-prefix-len 32768 --random-output-len 256
      --num-prompts=30 --max-concurrency=4
  - workload: tg
    args: >
      --dataset-name random
      --random-input-len 0 --random-prefix-len 32768 --random-output-len 256
      --num-prompts 60 --max-concurrency 8
  - workload: tg
    args: >
      --dataset-name random
      --random-input-len 0 --random-prefix-len 32768 --random-output-len 256
      --num-prompts 90 --max-concurrency 16
  - workload: tg
    args: >
      --dataset-name random
      --random-input-len 0 --random-prefix-len 32768 --random-output-len 256
      --num-prompts 120 --max-concurrency 32

  ## prefix-len 65536
  - workload: tg
    args: >
      --dataset-name random
      --random-input-len 0 --random-prefix-len 65536 --random-output-len 256
      --num-prompts 10 --max-concurrency=1
  - workload: tg
    args: >
      --dataset-name random
      --random-input-len 0 --random-prefix-len 65536 --random-output-len 256
      --num-prompts=30 --max-concurrency=4
  - workload: tg
    args: >
      --dataset-name random
      --random-input-len 0 --random-prefix-len 65536 --random-output-len 256
      --num-prompts 60 --max-concurrency 8
  - workload: tg
    args: >
      --dataset-name random
      --random-input-len 0 --random-prefix-len 65536 --random-output-len 256
      --num-prompts 90 --max-concurrency 16
  - workload: tg
    args: >
      --dataset-name random
      --random-input-len 0 --random-prefix-len 65536 --random-output-len 256
      --num-prompts 120 --max-concurrency 32

  ########### PP
  - workload: pp
    args: >
      --dataset-name random
      --random-input-len 1024 --random-prefix-len 0 --random-output-len 1
      --num-prompts 30 --max-concurrency 1
  - workload: pp
    args: >
      --dataset-name random
      --random-input-len 4096 --random-prefix-len 0 --random-output-len 1
      --num-prompts 20 --max-concurrency 1
  - workload: pp
    args: >
      --dataset-name random
      --random-input-len 8192 --random-prefix-len 0 --random-output-len 1
      --num-prompts 10 --max-concurrency 1
  - workload: pp
    args: >
      --dataset-name random
      --random-input-len 16384 --random-prefix-len 0 --random-output-len 1
      --num-prompts 8 --max-concurrency 1
  - workload: pp
    args: >
      --dataset-name random
      --random-input-len 32768 --random-prefix-len 0 --random-output-len 1
      --num-prompts=6 --max-concurrency 1
  - workload: pp
    args: >
      --dataset-name random
      --random-input-len 65536 --random-prefix-len 0 --random-output-len 1
      --num-prompts 4 --max-concurrency 1
' > bench-configs.yaml
