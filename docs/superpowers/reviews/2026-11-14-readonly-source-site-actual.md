# Actual result and Source closure — readonly source-site diagnostic

Recorded marker: 2026-11-15T00:29:44.3027472Z. GitHub run [43658045169/1](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/43658045169), readonly job 132640910465. The job succeeded because diagnostic collection completed; the original readonly command exited 1. C1–C6 passed with usable serialized shape and columns; the current eight pure checks and readonly profile passed before the one original Native invocation.

R1 and R2 passed together. R3 failed with `ERR_ASSERTION`, `AssertionError`, operator `==`, actual false, expected true, source-site `world_1158_a1`. The pinned public World assertion is `assert(Date.now()<deadline,'SYN fixed budget observation deadline')`. Its R3 caller at World1176 waits for `heldNativeSettled===2` using the original `Date.now()+30000`. This establishes the wait deadline that failed in this new run. It does not explain why the signal was absent, explain historical failures, or prove a provider problem.

The independent Root receiver accepted the bounded closed wire against exact source/tree/run/API attempt 1/job, all 18 program pins, the 83-site map, original World/Native before and after, complete rows/end/counts, and seven false nonclaims. No inventory, key, private artifact, Cloudflare probe, OAuth or owner window was used. Original World bodies, Native bodies, clocks, assertions, args and caps were preserved.

After the run was terminal, Source was restored to 6739481ada03d50e035edfd9c157c1646fad705d / tree 0f210b844740cc52426cc3282e3d0f5a7300e01a, parent 862ba9d258d6ad467ada5ba8d987dc1ce1603b46. Original F7 f7a71f1a0fa4f5ddf069ff411f008a098455e5cc is restored. SAME 2c9fee8d24567aba21ca58554f7187bceb16d3cb is 900137 bytes, SHA256 ea7ccf4fa17a2c44a837deeb115c003d0676058305c0d1b7f3dff659e86e1a96; the entire 895217-byte proposal prefix is exact. Root verified ref, parent/tree, full untruncated tree, SAME bytes, Main 0c9c475b3ebaa970fc11d628b40e50a90cceb727 unchanged, head of the consumed run, and five active-run states empty. The 3200 other leaves are unchanged. This is a GitHub/Source closure, not a current Cloudflare runtime readback.

Next: one fresh whole-unit review of the diagnostic, then source-based causal inspection of the R3 observation wait. No blind rerun or larger timeout. `operationalReadiness`, `completePackage`, `PCoff`, `historicalCauseProven`, `receiptAuthenticated`, `globalNativeDrainVerified`, and `sdkNamespaceEmptyVerified` remain false.

```json
{
  "purpose": "afw.readonly-source-site.safe.v1",
  "sourceBase": "327e9b7ec2182588dfb02e58b238787abb37a017",
  "source": "862ba9d258d6ad467ada5ba8d987dc1ce1603b46",
  "sourceTree": "f658211ef5187e75a94d5f5c20da824de2992645",
  "run": "43658045169",
  "attempt": 1,
  "job": "readonly",
  "node": "22.23.4",
  "stage": "complete",
  "programProof": {
    "verified": true,
    "count": 18,
    "setSha256": "174a5a8731fb99de1a1e5525b13dea012097fc243d128f171d9cae9c4f370551",
    "payloadExpandedSha256": "4abe79ed7522b88d90337fbb9528fdd7a94f1660539bf70ad9fdb1009aaa611a",
    "coreGitVerified": true,
    "prefixVerified": true
  },
  "sourceProof": {
    "mapBlob": "bcc38e8aeeffa82329701bf382e9868a34cf8ec0",
    "mapSha256": "1f1024c4feb46f242b1d3ab7d87c5a8d696cccdb51547f5336f5bae90217deaf",
    "mapVerified": true,
    "worldBeforeVerified": true,
    "nativeBeforeVerified": true,
    "worldAfterVerified": true,
    "nativeAfterVerified": true,
    "originalBodiesUnchanged": true
  },
  "controls": {
    "passed": true,
    "count": 6,
    "expected": 6,
    "usableShape": true,
    "usableColumns": true
  },
  "pure": {
    "passed": true,
    "cases": 8,
    "expected": 8
  },
  "profile": {
    "passed": true,
    "group": "readonly"
  },
  "businessCommand": {
    "started": true,
    "ended": true,
    "exitCode": 1,
    "signal": "none"
  },
  "readonly": {
    "purpose": "afw.readonly-source-site.stream.v2",
    "state": "case_failure",
    "valid": true,
    "ended": true,
    "summary": {
      "counts": {
        "cancelled": 0,
        "failed": 1,
        "passed": 2,
        "skipped": 0,
        "suites": 0,
        "tests": 3,
        "todo": 0,
        "topLevel": 3
      },
      "success": false
    },
    "rows": [
      {
        "case": "R1",
        "result": "passed",
        "error": null
      },
      {
        "case": "R2",
        "result": "passed",
        "error": null
      },
      {
        "case": "R3",
        "result": "failed",
        "error": {
          "wrapperFailureType": "testCodeFailure",
          "causeCode": "ERR_ASSERTION",
          "causeClass": "AssertionError",
          "operator": "==",
          "actual": false,
          "expected": true,
          "sourceSite": "world_1158_a1"
        }
      }
    ],
    "firstFailure": {
      "target": "R3",
      "error": {
        "wrapperFailureType": "testCodeFailure",
        "causeCode": "ERR_ASSERTION",
        "causeClass": "AssertionError",
        "operator": "==",
        "actual": false,
        "expected": true,
        "sourceSite": "world_1158_a1"
      }
    },
    "precase": null
  },
  "collectionComplete": true,
  "usableLocationCount": 1,
  "historicalCauseProven": false,
  "receiptAuthenticated": false,
  "operationalReadiness": false,
  "completePackage": false,
  "PCoff": false,
  "globalNativeDrainVerified": false,
  "sdkNamespaceEmptyVerified": false
}
```
