#!/bin/bash
# curl -L 'https://github.com/mixa3607/mixa3607.github.com/raw/refs/heads/master/docs/wiki/AMD_GFX906/vllm/benchmark/bench.run.sh' | bash

export CONFIGS="$(cat bench-configs.yaml)"
export VLLM_INST_HOST="127.0.0.1"
export VLLM_INST_PORT="8000"
export MODELS="$(curl http://$VLLM_INST_HOST:$VLLM_INST_PORT/v1/models)"
export MODEL_ROOT="$(echo "$MODELS" | yq '.data[0].root' -r)"
export MODEL_NAME="$(echo "$MODELS" | yq '.data[0].id' -r)"
for (( i=0; i<$(echo "$CONFIGS" | yq '.benchmarks | length'); i++ )); do
  BENCHMARK_NAME="$(echo "$CONFIGS" | yq ".benchmarks[$i].workload" -r)"
  BENCHMARK_ARGS="$(echo "$CONFIGS" | yq ".benchmarks[$i].args + \" \" + .baseArgs" -r | tr '\n' ' ')"

  echo "Run $BENCHMARK_NAME ($BENCHMARK_ARGS)"
  vllm bench serve $BENCHMARK_ARGS \
    --host "$VLLM_INST_HOST" --model "$MODEL_ROOT" --served-model-name "$MODEL_NAME" --save-detailed --save-result \
    --metadata metadata.workload="$BENCHMARK_NAME" metadata.image="$IMAGE_NAME"
  echo ""
done
