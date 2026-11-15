

## ROOT actual TRACEFD initial-only diagnostic — 2026-11-15

```json
{
  "purpose": "afw.r3.initial-tracefd.actual-receipt.v1",
  "observedUTC": "2026-11-15 11:08:55 UTC",
  "source": "34effd2150e7bcacb5d2a11dea570f246cf25106",
  "tree": "895f6a6aa1a3d1a7e73e26155b13bf9966632c7d",
  "run": 43707391349,
  "attempt": 1,
  "job": 132791308704,
  "step": "Observe trusted initial bootstrap only",
  "stepOutcome": "failure",
  "runConclusion": "failure",
  "marker": "AFW_R3_DELIVERY_STARTUP_DIAGNOSTIC/1 {\"purpose\":\"afw.r3-delivery.startup-diagnostic.v1\",\"scope\":\"source_initial_only\",\"result\":\"unavailable\",\"lastObserved\":\"pdeath_checked\",\"controlsInvoked\":0,\"originalCLIInvoked\":0,\"nativeBusinessCases\":0,\"qualification\":false,\"nonclaims\":{\"historicalCauseProven\":false,\"receiptAuthenticated\":false,\"operationalReadiness\":false,\"completePackage\":false,\"PCoff\":false,\"globalNativeDrainVerified\":false,\"sdkNamespaceEmptyVerified\":false}}",
  "ownAcceptance": {
    "accepted": true,
    "bootstrapAdmitted": false,
    "record": {
      "purpose": "afw.r3-delivery.startup-diagnostic.v1",
      "scope": "source_initial_only",
      "result": "unavailable",
      "lastObserved": "pdeath_checked",
      "controlsInvoked": 0,
      "originalCLIInvoked": 0,
      "nativeBusinessCases": 0,
      "qualification": false,
      "nonclaims": {
        "historicalCauseProven": false,
        "receiptAuthenticated": false,
        "operationalReadiness": false,
        "completePackage": false,
        "PCoff": false,
        "globalNativeDrainVerified": false,
        "sdkNamespaceEmptyVerified": false
      }
    },
    "qualified": false,
    "NativeReleased": false,
    "operationalReadiness": false
  },
  "controlsInvoked": 0,
  "originalCLIInvoked": 0,
  "nativeBusinessCases": 0,
  "qualified": false,
  "interpretation": "The changed observation produced a valid ordered prefix through pdeath_checked. The next image_checked event was not observed. This narrows static investigation toward initial Node-image selection/open/check/dup2; lastObserved is not failedStage or proof of precise cause. The old unknown is not retrospectively attributed to the descriptor collision. No controls or business cases invoked."
}
```

This occurrence is consumed; do not rerun. Preserve full proposal, restore original F7, and investigate the next bounded Source stage from this dated evidence. No full104/Gate2/Native/readiness/PC-off is released. All seven no-claims remain false.
