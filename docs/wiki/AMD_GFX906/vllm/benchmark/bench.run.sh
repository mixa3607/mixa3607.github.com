#!/bin/bash

export CONFIGS="$(cat bench-configs.yaml)"
export VLLM_INST_HOST="127.0.0.1"
export VLLM_INST_PORT="8000"
export MODEL="$(curl http://$VLLM_INST_HOST:$VLLM_INST_PORT/v1/models | yq '.data[0].root' -r)"
for (( i=0; i<$(echo "$CONFIGS" | yq '.benchmarks | length'); i++ )); do
  BENCHMARK_NAME="$(echo "$CONFIGS" | yq ".benchmarks[$i].workload" -r)"
  BENCHMARK_ARGS="$(echo "$CONFIGS" | yq ".benchmarks[$i].args + \" \" + .baseArgs" -r | tr '\n' ' ')"

  echo "Run $BENCHMARK_NAME ($BENCHMARK_ARGS)"
  vllm bench serve $BENCHMARK_ARGS \
    --host "$VLLM_INST_HOST" --model "$MODEL" --save-detailed --save-result \
    --metadata metadata.workload="$BENCHMARK_NAME" metadata.image="$IMAGE_NAME"
  echo ""
done
