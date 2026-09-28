PRESETS=(
  'gemma-4-26B-A4B-it[tensor]'
  'gemma-4-26B-A4B-it[layer]'
  'gemma-4-31B-it[tensor]'
  'Qwen3.8-27B[tensor]'
  'Qwen3.8-Flash-Next[layer]'
)

for (( i=0; i<${#PRESETS[@]}; i++ )); do
  echo "======================= ${PRESETS[$i]} ======================="
  python3 ./bench-profiles/build-bench-command.py --source-dir ./bench-profiles --bench "${PRESETS[$i]}" --output - | bash
done
