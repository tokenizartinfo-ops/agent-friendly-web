

## ROOT actual IMAGE guard diagnostic — 2026-11-15

```json
{
  "purpose": "afw.r3.initial-image.actual-receipt.v1",
  "observedUTC": "2026-11-15 11:38:43 UTC",
  "source": "79886ba17c5fb9a561efb60f29a062166ee13a60",
  "tree": "3b012f1ddb7f6fabe947dfa6afbc7d5a2967e753",
  "run": 43709558348,
  "attempt": 1,
  "job": 132797940020,
  "step": "Observe trusted initial bootstrap only",
  "stepOutcome": "failure",
  "runConclusion": "failure",
  "marker": "AFW_R3_DELIVERY_IMAGE_DIAGNOSTIC/1 {\"purpose\":\"afw.r3-delivery.image-diagnostic.v1\",\"scope\":\"source_initial_only\",\"result\":\"unavailable\",\"lastObserved\":\"image_writebits_rejected\",\"controlsInvoked\":0,\"originalCLIInvoked\":0,\"nativeBusinessCases\":0,\"qualification\":false,\"nonclaims\":{\"historicalCauseProven\":false,\"receiptAuthenticated\":false,\"operationalReadiness\":false,\"completePackage\":false,\"PCoff\":false,\"globalNativeDrainVerified\":false,\"sdkNamespaceEmptyVerified\":false}}",
  "ownAcceptance": {
    "accepted": true,
    "bootstrapAdmitted": false,
    "record": {
      "purpose": "afw.r3-delivery.image-diagnostic.v1",
      "scope": "source_initial_only",
      "result": "unavailable",
      "lastObserved": "image_writebits_rejected",
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
  "interpretation": "This attempt observed the current image_writebits_rejected guard: the opened Node image fstat mode failed the existing no-group/other-write predicate. Exact mode/UID/path was not published. Xattr/credential/exec checks were not reached in this guard path. This is current-attempt evidence, not retrospective proof of the older unknown or original world_1158_a1 failure. No guard was relaxed."
}
```

This occurrence is consumed and must not be rerun. Restore original F7, preserve the full proposal and this factual receipt, then prepare a narrowly scoped correction of the current image-admission problem without weakening the protection. No full104/Gate2/Native/readiness/PC-off released. All seven no-claims remain false.
