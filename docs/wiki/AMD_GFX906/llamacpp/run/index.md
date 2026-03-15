---
title: Run
sidebar_position: 10
---

import DocCardList from "@theme/DocCardList";

# Run vLLM

## Docker

See https://github.com/ggml-org/llama.cpp/blob/master/docs/docker.md + https://github.com/ROCm/vllm/blob/main/docs/deployment/docker.md

## Kubernetes with Helm

- [Helm](https://helm.sh/)
- [helmfile](https://helmfile.readthedocs.io/)
- [mixa3607/charts/llamacpp](https://github.com/mixa3607/charts/tree/master/charts/llamacpp)

```yaml title="values.yaml"
image:
  registry: docker.io
  repository: mixa3607/llama.cpp-gfx906
  tag: full-b8356-rocm-7.2.0

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
  hostname: llamacpp.arkprojects.space
  extraTls:
    - hosts:
        - "llamacpp.arkprojects.space"
      secretName: arkprojects.space-cert-prod

# scrape metrics
podAnnotations:
  prometheus.io/scrape: "true"
  prometheus.io/path: /metrics
  prometheus.io/port: "8080"

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
  capabilities:
    add:
    - SYS_PTRACE
  seccompProfile:
    type: Unconfined

extraEnvVars:
- name: LLAMA_ARG_N_PARALLEL
  value: "1"
- name: LLAMA_ARG_THREADS_HTTP
  value: "-1"
... and other args

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
  - name: llama-cpp
    chart: mixa3607-charts/llamacpp
    version: 0.1.2
    namespace: ns-vllm
    values:
      - ./llama.cpp/values.yml
```

```bash title="Install chart"
helmfile apply
```
