---
title: AMD GPU Operator
sidebar_position: 10
---

# AMD GPU Operator for GFX906

Мануал как затащить mi50 под куб.

## Refs

- [AMD GPU Operator Documentation](https://instinct.docs.amd.com/projects/gpu-operator/en/latest/index.html)
- [AMD GPU Operator source code](https://github.com/ROCm/gpu-operator)
- [Node Feature Discovery (NFD) source code](https://github.com/kubernetes-sigs/node-feature-discovery)

## Installation

At this moment tested only with `amd-gpu-operator:v1.3.0`

:::warning
- Do not use default `DeviceConfig`
- Use `rocm/device-metrics-exporter` only with tag `v1.3.0`
:::

Steps:
1. install gpu operator
1. install nfd operator
1. add `ConfigMap` for GPU metrics exporter
1. add `VMServiceScrape` or alternative for metrics exporter scraping reg
1. add `DeviceConfig`
1. add `NodeFeatureRule` for detecting GPU nodes

<details>
  <summary>Files</summary>

```yaml title="helmfile.yaml"
repositories:
  - url: https://rocm.github.io/gpu-operator
    name: rocm

helmDefaults:
  createNamespace: true
  cleanupOnFail: true
  atomic: true
  historyMax: 2

templates:
  .helmfile-defaults: &helmfile-defaults
    namespace: kube-amd-gpu

releases:
  - name: amd-gpu-operator
    version: v1.3.0
    chart: rocm/gpu-operator-charts
    <<: *helmfile-defaults
    values:
      - ./chart-values_amd-gpu-operator.yml
```

```yaml title="chart-values_amd-gpu-operator.yml"
# https://github.com/ROCm/gpu-operator/blob/main/example/helm_charts_k8s_values_example.yaml
deviceConfig:
  spec:
    driver:
      enable: false
    metricsExporter:
      enable: false
      config:
        name: amd-gpu-mi50-metrics-config
crds:
  defaultCR:
    install: false
    upgrade: false
```

```yaml title="DeviceConfig"
apiVersion: amd.com/v1alpha1
kind: DeviceConfig
metadata:
  name: amd-gpu-mi50
spec:
  driver:
    enable: false
  devicePlugin:
    enableNodeLabeller: true
  metricsExporter:
    enable: true
    image: rocm/device-metrics-exporter:v1.3.0
    config:
      name: amd-gpu-mi50-metrics-config
    tolerations:
      - key: "feature.node.kubernetes.io/amd-gpu"
        operator: "Equal"
        value: "true"
        effect: "NoSchedule"
  testRunner:
    enable: false
  configManager:
    enable: true
    configManagerTolerations:
      - key: "feature.node.kubernetes.io/amd-gpu"
        operator: "Equal"
        value: "true"
        effect: "NoSchedule"
  selector:
    feature.node.kubernetes.io/amd-gpu: "true"

```

```yaml title="NodeFeatureRule for detecting GPU nodes"
apiVersion: nfd.k8s-sigs.io/v1alpha1
kind: NodeFeatureRule
metadata:
  name: amd-gpu-mi50-label-nfd-rule
spec:
  rules:
    - name: amd-gpu
      labels:
        feature.node.kubernetes.io/amd-gpu: "true"
      matchAny:
        - matchFeatures:
            - feature: pci.device
              matchExpressions:
                vendor: { op: In, value: ["1002"] }
                device: { op: In, value: ["66a1"] } # MI50 32GB
```

```yaml title="Metrics exporter scraper"
apiVersion: operator.victoriametrics.com/v1beta1
kind: VMServiceScrape
metadata:
  name: amd-gpu-mi50-service-scrape
spec:
  namespaceSelector:
    any: true
  endpoints:
    - port: exporter-port
  targetLabels:
    - app.kubernetes.io/service=default-metrics-exporter
```

```yaml title="ConfigMap for exporter"
apiVersion: v1
kind: ConfigMap
metadata:
  name: amd-gpu-mi50-metrics-config
data:
  config.json: |-
    {
      "ServerPort": 5000,
      "CommonConfig": {
        "MetricsFieldPrefix": "amd_"
      },
      "GPUConfig": {
        "Fields": [
          "GPU_NODES_TOTAL",
          "GPU_PACKAGE_POWER",
          "GPU_AVERAGE_PACKAGE_POWER",
          "GPU_EDGE_TEMPERATURE",
          "GPU_JUNCTION_TEMPERATURE",
          "GPU_MEMORY_TEMPERATURE",
          "GPU_HBM_TEMPERATURE",
          "GPU_GFX_ACTIVITY",
          "GPU_UMC_ACTIVITY",
          "GPU_MMA_ACTIVITY",
          "GPU_VCN_ACTIVITY",
          "GPU_JPEG_ACTIVITY",
          "GPU_VOLTAGE",
          "GPU_GFX_VOLTAGE",
          "GPU_MEMORY_VOLTAGE",
          "PCIE_SPEED",
          "PCIE_MAX_SPEED",
          "PCIE_BANDWIDTH",
          "GPU_ENERGY_CONSUMED",
          "PCIE_REPLAY_COUNT",
          "PCIE_RECOVERY_COUNT",
          "PCIE_REPLAY_ROLLOVER_COUNT",
          "PCIE_NACK_SENT_COUNT",
          "PCIE_NAC_RECEIVED_COUNT",
          "GPU_CLOCK",
          "GPU_POWER_USAGE",
          "GPU_TOTAL_VRAM",
          "GPU_ECC_CORRECT_TOTAL",
          "GPU_ECC_UNCORRECT_TOTAL",
          "GPU_ECC_CORRECT_SDMA",
          "GPU_ECC_UNCORRECT_SDMA",
          "GPU_ECC_CORRECT_GFX",
          "GPU_ECC_UNCORRECT_GFX",
          "GPU_ECC_CORRECT_MMHUB",
          "GPU_ECC_UNCORRECT_MMHUB",
          "GPU_ECC_CORRECT_ATHUB",
          "GPU_ECC_UNCORRECT_ATHUB",
          "GPU_ECC_CORRECT_BIF",
          "GPU_ECC_UNCORRECT_BIF",
          "GPU_ECC_CORRECT_HDP",
          "GPU_ECC_UNCORRECT_HDP",
          "GPU_ECC_CORRECT_XGMI_WAFL",
          "GPU_ECC_UNCORRECT_XGMI_WAFL",
          "GPU_ECC_CORRECT_DF",
          "GPU_ECC_UNCORRECT_DF",
          "GPU_ECC_CORRECT_SMN",
          "GPU_ECC_UNCORRECT_SMN",
          "GPU_ECC_CORRECT_SEM",
          "GPU_ECC_UNCORRECT_SEM",
          "GPU_ECC_CORRECT_MP0",
          "GPU_ECC_UNCORRECT_MP0",
          "GPU_ECC_CORRECT_MP1",
          "GPU_ECC_UNCORRECT_MP1",
          "GPU_ECC_CORRECT_FUSE",
          "GPU_ECC_UNCORRECT_FUSE",
          "GPU_ECC_CORRECT_UMC",
          "GPU_ECC_UNCORRECT_UMC",
          "GPU_XGMI_NBR_0_NOP_TX",
          "GPU_XGMI_NBR_0_REQ_TX",
          "GPU_XGMI_NBR_0_RESP_TX",
          "GPU_XGMI_NBR_0_BEATS_TX",
          "GPU_XGMI_NBR_1_NOP_TX",
          "GPU_XGMI_NBR_1_REQ_TX",
          "GPU_XGMI_NBR_1_RESP_TX",
          "GPU_XGMI_NBR_1_BEATS_TX",
          "GPU_XGMI_NBR_0_TX_THRPUT",
          "GPU_XGMI_NBR_1_TX_THRPUT",
          "GPU_XGMI_NBR_2_TX_THRPUT",
          "GPU_XGMI_NBR_3_TX_THRPUT",
          "GPU_XGMI_NBR_4_TX_THRPUT",
          "GPU_XGMI_NBR_5_TX_THRPUT",
          "GPU_USED_VRAM",
          "GPU_FREE_VRAM",
          "GPU_TOTAL_VISIBLE_VRAM",
          "GPU_USED_VISIBLE_VRAM",
          "GPU_FREE_VISIBLE_VRAM",
          "GPU_TOTAL_GTT",
          "GPU_USED_GTT",
          "GPU_FREE_GTT",
          "GPU_ECC_CORRECT_MCA",
          "GPU_ECC_UNCORRECT_MCA",
          "GPU_ECC_CORRECT_VCN",
          "GPU_ECC_UNCORRECT_VCN",
          "GPU_ECC_CORRECT_JPEG",
          "GPU_ECC_UNCORRECT_JPEG",
          "GPU_ECC_CORRECT_IH",
          "GPU_ECC_UNCORRECT_IH",
          "GPU_ECC_CORRECT_MPIO",
          "GPU_ECC_UNCORRECT_MPIO",
          "GPU_HEALTH",
          "GPU_XGMI_LINK_RX",
          "GPU_XGMI_LINK_TX",
          "GPU_VIOLATION_CURRENT_ACCUMULATED_COUNTER",
          "GPU_VIOLATION_PROCESSOR_HOT_RESIDENCY_ACCUMULATED",
          "GPU_VIOLATION_PPT_RESIDENCY_ACCUMULATED",
          "GPU_VIOLATION_SOCKET_THERMAL_RESIDENCY_ACCUMULATED",
          "GPU_VIOLATION_VR_THERMAL_RESIDENCY_ACCUMULATED",
          "GPU_VIOLATION_HBM_THERMAL_RESIDENCY_ACCUMULATED",
          "GPU_PROF_GRBM_GUI_ACTIVE",
          "GPU_PROF_SQ_WAVES",
          "GPU_PROF_GRBM_COUNT",
          "GPU_PROF_CPC_CPC_STAT_BUSY",
          "GPU_PROF_CPC_CPC_STAT_IDLE",
          "GPU_PROF_CPC_CPC_STAT_STALL",
          "GPU_PROF_CPC_CPC_TCIU_BUSY",
          "GPU_PROF_CPC_CPC_TCIU_IDLE",
          "GPU_PROF_CPC_CPC_UTCL2IU_BUSY",
          "GPU_PROF_CPC_CPC_UTCL2IU_IDLE",
          "GPU_PROF_CPC_CPC_UTCL2IU_STALL",
          "GPU_PROF_CPC_ME1_BUSY_FOR_PACKET_DECODE",
          "GPU_PROF_CPC_ME1_DC0_SPI_BUSY",
          "GPU_PROF_CPC_UTCL1_STALL_ON_TRANSLATION",
          "GPU_PROF_CPC_ALWAYS_COUNT",
          "GPU_PROF_CPC_ADC_VALID_CHUNK_NOT_AVAIL",
          "GPU_PROF_CPC_ADC_DISPATCH_ALLOC_DONE",
          "GPU_PROF_CPC_ADC_VALID_CHUNK_END",
          "GPU_PROF_CPC_SYNC_FIFO_FULL_LEVEL",
          "GPU_PROF_CPC_SYNC_FIFO_FULL",
          "GPU_PROF_CPC_GD_BUSY",
          "GPU_PROF_CPC_TG_SEND",
          "GPU_PROF_CPC_WALK_NEXT_CHUNK",
          "GPU_PROF_CPC_STALLED_BY_SE0_SPI",
          "GPU_PROF_CPC_STALLED_BY_SE1_SPI",
          "GPU_PROF_CPC_STALLED_BY_SE2_SPI",
          "GPU_PROF_CPC_STALLED_BY_SE3_SPI",
          "GPU_PROF_CPC_LTE_ALL",
          "GPU_PROF_CPC_SYNC_WRREQ_FIFO_BUSY",
          "GPU_PROF_CPC_CANE_BUSY",
          "GPU_PROF_CPC_CANE_STALL",
          "GPU_PROF_CPF_CMP_UTCL1_STALL_ON_TRANSLATION",
          "GPU_PROF_CPF_CPF_STAT_BUSY",
          "GPU_PROF_CPF_CPF_STAT_IDLE",
          "GPU_PROF_CPF_CPF_STAT_STALL",
          "GPU_PROF_CPF_CPF_TCIU_BUSY",
          "GPU_PROF_CPF_CPF_TCIU_IDLE",
          "GPU_PROF_CPF_CPF_TCIU_STALL",
          "GPU_PROF_FETCH_SIZE",
          "GPU_PROF_WRITE_SIZE",
          "GPU_PROF_TOTAL_16_OPS",
          "GPU_PROF_TOTAL_32_OPS",
          "GPU_PROF_TOTAL_64_OPS",
          "GPU_PROF_GUI_UTIL_PERCENT",
          "GPU_PROF_OCCUPANCY_PERCENT",
          "GPU_PROF_TENSOR_ACTIVE_PERCENT",
          "GPU_PROF_VALU_PIPE_ISSUE_UTIL",
          "GPU_PROF_SM_ACTIVE",
          "GPU_PROF_OCCUPANCY_ELAPSED",
          "GPU_PROF_OCCUPANCY_PER_ACTIVE_CU"
        ],
        "Labels": [
          "GPU_UUID",
          "SERIAL_NUMBER",
          "GPU_ID",
          "POD",
          "NAMESPACE",
          "CONTAINER",
          "JOB_ID",
          "JOB_USER",
          "JOB_PARTITION",
          "CLUSTER_NAME",
          "CARD_SERIES",
          "CARD_MODEL",
          "CARD_VENDOR",
          "DRIVER_VERSION",
          "VBIOS_VERSION",
          "HOSTNAME",
          "GPU_PARTITION_ID",
          "GPU_COMPUTE_PARTITION_TYPE",
          "GPU_MEMORY_PARTITION_TYPE"
        ],
        "HealthThresholds" : {
          "GPU_ECC_UNCORRECT_SDMA" : 0,
          "GPU_ECC_UNCORRECT_GFX" : 0,
          "GPU_ECC_UNCORRECT_MMHUB" : 0,
          "GPU_ECC_UNCORRECT_ATHUB" : 0,
          "GPU_ECC_UNCORRECT_BIF" : 0,
          "GPU_ECC_UNCORRECT_HDP" : 0,
          "GPU_ECC_UNCORRECT_XGMI_WAFL" : 0,
          "GPU_ECC_UNCORRECT_DF" : 0,
          "GPU_ECC_UNCORRECT_SMN" : 0,
          "GPU_ECC_UNCORRECT_SEM" : 0,
          "GPU_ECC_UNCORRECT_MP0" : 0,
          "GPU_ECC_UNCORRECT_MP1" : 0,
          "GPU_ECC_UNCORRECT_FUSE" : 0,
          "GPU_ECC_UNCORRECT_UMC" : 0,
          "GPU_ECC_UNCORRECT_MCA" : 0,
          "GPU_ECC_UNCORRECT_VCN" : 0,
          "GPU_ECC_UNCORRECT_JPEG" : 0,
          "GPU_ECC_UNCORRECT_IH" : 0,
          "GPU_ECC_UNCORRECT_MPIO" : 0
        },
        "CustomLabels" : {
          "CLUSTER_NAME" : "amdgpu-k8s-metrics-exporter"
        },
        "ExtraPodLabels" : {
          "WORKLOAD_ID"   : "amd/workload-id",
          "USERGROUP_ID"  : "amd/usergroup-id"
        },
        "ProfilerMetrics" : {
          "all"       : true,
          "hostname1" : false
        }
      }
    }
```

</details>
