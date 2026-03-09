---
title: Run vLLM
sidebar_position: 10
---

import DocCardList from "@theme/DocCardList";

# Run vLLM

## Docker
Basics from amd https://github.com/ROCm/vllm/blob/main/docs/deployment/docker.md

## Kubernetes with Helm

- [Helm](https://helm.sh/)
- [helmfile](https://helmfile.readthedocs.io/)
- [mixa3607/charts/vllm](https://github.com/mixa3607/charts/tree/master/charts/vllm)

```yaml title="values.yaml"
image:
  registry: docker.io
  repository: mixa3607/vllm-gfx906
  tag: 0.12.0-rocm-6.3.3-nlzy

# limit grace period (optional)
terminationGracePeriodSeconds: 15

# uncomment when you need more time for initial model downloading
#startupProbe:
#  enabled: false
#livenessProbe:
#  enabled: false
#readinessProbe:
#  enabled: false

# enable ingress
ingress:
  enabled: true
  hostname: vllm.arkprojects.space
  extraTls:
    - hosts:
        - "vllm.arkprojects.space"
      secretName: arkprojects.space-cert-prod

# scrape metrics
podAnnotations:
  prometheus.io/scrape: "true"
  prometheus.io/path: /metrics
  prometheus.io/port: "8000"

# node selector and tolerations
nodeSelector:
  feature.node.kubernetes.io/amd-gpu: "true"
tolerations:
  - key: "feature.node.kubernetes.io/amd-gpu"
    operator: "Equal"
    value: "true"
    effect: "NoSchedule"

# resources ¯\_(ツ)_/¯
resources:
  limits:
    memory: 16G
  requests:
    cpu: 2
    memory: 8G

# persistence
persistence:
  enabled: true
  storageClass: truenas-trash4-iscsi
  size: 192G

# use direct mounts OR k8s amd gpu operator
extraVolumeMounts:
  - name: dev-kfd
    mountPath: /dev/kfd
  - name: dev-dri
    mountPath: /dev/dri
  - name: shm
    mountPath: /dev/shm
extraVolumes:
  - name: dev-kfd
    hostPath:
      path: /dev/kfd
  - name: dev-dri
    hostPath:
      path: /dev/dri
  - name: shm
    emptyDir:
      medium: Memory
      sizeLimit: 32G

# required when use direct mounts insted gpu operator
containerSecurityContext:
  privileged: true
  runAsNonRoot: false
  allowPrivilegeEscalation: true
  readOnlyRootFilesystem: false
  runAsGroup: 0
  runAsUser: 0
  seccompProfile:
    type: Unconfined
  capabilities:
    add:
      - SYS_PTRACE

extraEnvVars:
  # placeholder for hf token
  - name: HUGGING_FACE_HUB_TOKEN
    value: "https://huggingface.co/settings/tokens --set extraEnvVars[0].value='hf_xxxxxxx'"
  # vllm specific envs see official docs
  - name: VLLM_SLEEP_WHEN_IDLE
    value: "1"
  - name: VLLM_USE_V1
    value: "1"
  - name: VLLM_USE_TRITON_AWQ
    value: "1"
  - name: VLLM_USE_TRITON_FLASH_ATTN
    value: "True"
  # opentelemetry/ remove if not used by you
  - name: OTEL_SERVICE_NAME
    value: "vLLM-server"
  - name: OTEL_EXPORTER_OTLP_TRACES_PROTOCOL
    value: "http/protobuf"
  - name: OTEL_EXPORTER_OTLP_TRACES_ENDPOINT
    value: "http://signoz-otel.xxxx.space/v1/traces"
  # setup name/ used for benchamrks only
  - name: RECIPE
    value: "001. vllm bench gaunernst/gemma-3-27b-it-qat-autoawq"

app-configuration:
  vllm.yaml: |-
    # basics
    model: gaunernst/gemma-3-27b-it-qat-autoawq
    served-model-name:
      - gemma-3-27b
      - gaunernst/gemma-3-27b-it-qat-autoawq
    async-scheduling: true
    # gpus setup related
    max-model-len: 48K
    tensor-parallel-size: 2
    data-parallel-size: 1
    gpu-memory-utilization: 0.95
    # multimodality
    limit-mm-per-prompt.image: 16
    # allowed media sources/ remove if not used by you
    allowed-media-domains:
      - s3.xxx.space
      - static.xxx.space
    # logging/ remove if not used by you
    otlp-traces-endpoint: http://signoz-otel.xxx.space/v1/traces
    collect-detailed-traces: all
    enable-request-id-headers: true
    enable-prompt-tokens-details: true
    enable-server-load-tracking: true
    enable-force-include-usage: true
    enable-tokenizer-info-endpoint: true
    enable-log-requests: true
    trust-request-chat-template: true
```

```yaml title="helmfile.yaml"
repositories:
  - url: ghcr.io/mixa3607/charts
    name: mixa3607-charts
    oci: true

helmDefaults:
  createNamespace: true
  cleanupOnFail: true
  atomic: false
  historyMax: 2

releases:
  - name: vllm
    chart: mixa3607-charts/vllm
    version: 0.1.2
    namespace: ns-vllm
    values:
      - ./values.yaml
    set:
      - name: extraEnvVars[0].value
        value: <hf token from https://huggingface.co/settings/tokens>
```

```bash title="Install chart"
helmfile apply
```
