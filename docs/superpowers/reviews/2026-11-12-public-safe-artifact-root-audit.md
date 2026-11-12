# Independent Root audit of three existing public-safe artifacts

2026-11-12 08:27:25 UTC. Root independently fetched the exact already-published public-safe ZIPs and checked REST metadata digest/size, ZIPcentral/local paths, exacttwoJSONmembers, CRC32, SHA256, manifestinventory andclosedresultschemas inRAM. Noprojectcode/test/build/importorprivateencryptedartifact execution. This was expresslyruledprovenanceauditafterchildcacheisolation, notrerun. EarlierRootreferenceadapterURLconstructorerroroccurredBEFOREanyfile-servicefetch; oneboundedreference-regenerationbatchpreservedthenvalidatedreferences. No URLs/base64/Gitsecretspersisted. SuccessfulRAMfetches146/120/125ms, 256KiBcompressed/expandedcaps/5sabort, CRCknownvectorchecked. Buffersnotwritten/extractedondisk. RootNodeversionnotclaimed; artifactcontextsdeclareactualNode22.23.4.

## Exact fresh verified results

```json
[
  {
    "arm": "current",
    "id": 13925270033,
    "zipBytes": 4676,
    "zipSha256": "0b45af88fb694f5afe90b5afe4074f46bb4428db67524fd6235b1a1c967b3a3f",
    "inventory": [
      {
        "name": "result.json",
        "bytes": 13993,
        "sha256": "8d96ee8efdb57f047329833c11fb41f660358b05c5f5471d01783c74417275e3",
        "crc32": "d655c9a9"
      },
      {
        "name": "manifest.json",
        "bytes": 263,
        "sha256": "ae1be17b6116d4873b047747d495c6c567678650de9c0bc96804633a75ba7c82",
        "crc32": "5a2d30db"
      }
    ],
    "expandedBytes": 14256,
    "manifestVerified": true,
    "crcVerified": true,
    "retrievalMs": 146,
    "proof": {
      "context": {
        "repository": "tokenizartinfo-ops/agent-friendly-web",
        "workflowRef": "refs/heads/diag/afw-adoption-clock-20261112",
        "trigger": "push",
        "workflowSource": "cd20c12c51f4b147bf8a6fffd3df61452847afa7",
        "testSource": "f5f52660d19ec9fc634bbc49558db75582fdaf88",
        "runId": "43177133523",
        "attempt": 1,
        "node": "v22.23.4",
        "os": "Ubuntu24.04",
        "arm": "current",
        "childContext": "MODELED_STERILE_SYNTHETIC",
        "workflowContextIsAdmissionAuthority": false,
        "operationalReadiness": false,
        "completePackage": false,
        "PCoff": false
      },
      "testPassed": false,
      "summary": {
        "tests": 1,
        "pass": 0,
        "fail": 1,
        "cancelled": 0,
        "skipped": 0,
        "todo": 0
      },
      "testEvents": {
        "selectedPassed": 0,
        "selectedFailed": 1,
        "filteredSkipped": 0,
        "wrapperFailed": 0,
        "unexpected": 0,
        "registered": 1
      },
      "clockObservations": [
        {
          "stage": "cf_fixture",
          "T0": 1794469319056,
          "R1": null,
          "custodyExpiresAt": null,
          "custodyCoversR1": null
        },
        {
          "stage": "external_project",
          "T0": 1794469319056,
          "R1": 1794469799056,
          "custodyExpiresAt": 1794106799000,
          "custodyCoversR1": false
        }
      ],
      "boundaries": {
        "cf_fixture:enter": 1,
        "cf_fixture:throw": 1,
        "cf_finalizer:enter": 1,
        "cf_finalizer:throw": 1,
        "final_restore:enter": 1,
        "final_restore:return": 1,
        "final_project:enter": 1,
        "final_project:return": 1,
        "rest_init:enter": 1,
        "rest_init:return": 1,
        "rest_control:enter": 1,
        "rest_control:return": 1,
        "rest_prepare:enter": 1,
        "rest_prepare:return": 1,
        "rest_proof:enter": 1,
        "rest_proof:return": 1,
        "rest_capture:enter": 1,
        "rest_capture:return": 1,
        "rest_read:enter": 3,
        "rest_read:return": 3,
        "rest_claim:enter": 1,
        "rest_claim:return": 1,
        "trial_generation:enter": 1,
        "trial_generation:return": 1,
        "external_project:enter": 1,
        "external_project:throw": 1
      },
      "errorHashes": [
        {
          "stage": "external_project",
          "messageHash": "a05103fbd0ff88dc813c210776c5091e37a711bf2e4fa21556296c29706d442e"
        },
        {
          "stage": "cf_finalizer",
          "messageHash": "a05103fbd0ff88dc813c210776c5091e37a711bf2e4fa21556296c29706d442e"
        },
        {
          "stage": "cf_fixture",
          "messageHash": "a05103fbd0ff88dc813c210776c5091e37a711bf2e4fa21556296c29706d442e"
        },
        {
          "messageHash": "a05103fbd0ff88dc813c210776c5091e37a711bf2e4fa21556296c29706d442e"
        },
        {
          "messageHash": "a05103fbd0ff88dc813c210776c5091e37a711bf2e4fa21556296c29706d442e"
        }
      ],
      "privacy": {
        "pass": true,
        "getterTouches": 0,
        "proxyTrapTouches": 0,
        "proxyPrototypesSafe": true,
        "ordinaryNative": true,
        "crossRealmNative": true,
        "crossRealmExactUnknown": true,
        "spoofRejected": true,
        "oversizeSuppressed": true,
        "cycleBounded": true,
        "rawCanaryAbsent": true
      },
      "identityControls": [
        {
          "pass": true,
          "promiseIdentity": true,
          "errorIdentity": true,
          "receiverIdentity": true
        }
      ],
      "networkDenied": 0,
      "protectedBase": {
        "leaves": 3188,
        "before": "c9554faf9cdb30283109a47cfc863867594e49669d0702f214a44cbcdfe361a7",
        "after": "c9554faf9cdb30283109a47cfc863867594e49669d0702f214a44cbcdfe361a7",
        "equal": true
      },
      "earliestLibraryGuard": "UNKNOWN",
      "timeoutExercised": false
    },
    "ok": true
  },
  {
    "arm": "historical",
    "id": 13923749573,
    "zipBytes": 4446,
    "zipSha256": "6e54c3ac54fcd910b4bf02998dc226c79c442a8c7dd5b6faa7f3bd5326466230",
    "inventory": [
      {
        "name": "result.json",
        "bytes": 11707,
        "sha256": "1815206123262800652160722a11d65c98ba4475708e4253615679db168fe059",
        "crc32": "8ee0a678"
      },
      {
        "name": "manifest.json",
        "bytes": 263,
        "sha256": "ce94ca983e56eb0faa122f047bf820836588373be917ef79c1371890441a27c1",
        "crc32": "9b4a3e86"
      }
    ],
    "expandedBytes": 11970,
    "manifestVerified": true,
    "crcVerified": true,
    "retrievalMs": 120,
    "proof": {
      "context": {
        "repository": "tokenizartinfo-ops/agent-friendly-web",
        "workflowRef": "refs/heads/diag/afw-adoption-clock-20261112",
        "trigger": "push",
        "workflowSource": "cd20c12c51f4b147bf8a6fffd3df61452847afa7",
        "testSource": "f5f52660d19ec9fc634bbc49558db75582fdaf88",
        "runId": "43177133523",
        "attempt": 1,
        "node": "v22.23.4",
        "os": "Ubuntu24.04",
        "arm": "historical",
        "childContext": "MODELED_STERILE_SYNTHETIC",
        "workflowContextIsAdmissionAuthority": false,
        "operationalReadiness": false,
        "completePackage": false,
        "PCoff": false
      },
      "testPassed": true,
      "summary": {
        "tests": 1,
        "pass": 1,
        "fail": 0,
        "cancelled": 0,
        "skipped": 0,
        "todo": 0
      },
      "testEvents": {
        "selectedPassed": 1,
        "selectedFailed": 0,
        "filteredSkipped": 0,
        "wrapperFailed": 0,
        "unexpected": 0,
        "registered": 1
      },
      "clockObservations": [
        {
          "stage": "cf_fixture",
          "T0": 1794105600000,
          "R1": null,
          "custodyExpiresAt": null,
          "custodyCoversR1": null
        },
        {
          "stage": "external_project",
          "T0": 1794105600000,
          "R1": 1794106080000,
          "custodyExpiresAt": 1794106799000,
          "custodyCoversR1": true
        },
        {
          "stage": "observer_validate",
          "T0": 1794105600000,
          "R1": 1794106080000,
          "custodyExpiresAt": 1794106799000,
          "custodyCoversR1": true
        }
      ],
      "boundaries": {
        "cf_fixture:enter": 1,
        "cf_fixture:return": 1,
        "cf_finalizer:enter": 1,
        "cf_finalizer:return": 1,
        "final_restore:enter": 1,
        "final_restore:return": 1,
        "final_project:enter": 1,
        "final_project:return": 1,
        "rest_init:enter": 1,
        "rest_init:return": 1,
        "rest_control:enter": 1,
        "rest_control:return": 1,
        "rest_prepare:enter": 1,
        "rest_prepare:return": 1,
        "rest_proof:enter": 1,
        "rest_proof:return": 1,
        "rest_capture:enter": 1,
        "rest_capture:return": 1,
        "rest_read:enter": 3,
        "rest_read:return": 3,
        "rest_claim:enter": 1,
        "rest_claim:return": 1,
        "trial_generation:enter": 1,
        "trial_generation:return": 1,
        "http_build:enter": 2,
        "http_build:return": 2,
        "http_import:enter": 2,
        "http_import:return": 2,
        "external_project:enter": 1,
        "external_project:return": 1,
        "observer_validate:enter": 1,
        "observer_validate:return": 1
      },
      "errorHashes": [],
      "privacy": {
        "pass": true,
        "getterTouches": 0,
        "proxyTrapTouches": 0,
        "proxyPrototypesSafe": true,
        "ordinaryNative": true,
        "crossRealmNative": true,
        "crossRealmExactUnknown": true,
        "spoofRejected": true,
        "oversizeSuppressed": true,
        "cycleBounded": true,
        "rawCanaryAbsent": true
      },
      "identityControls": [
        {
          "pass": true,
          "promiseIdentity": true,
          "errorIdentity": true,
          "receiverIdentity": true
        }
      ],
      "networkDenied": 0,
      "protectedBase": {
        "leaves": 3188,
        "before": "c9554faf9cdb30283109a47cfc863867594e49669d0702f214a44cbcdfe361a7",
        "after": "c9554faf9cdb30283109a47cfc863867594e49669d0702f214a44cbcdfe361a7",
        "equal": true
      },
      "earliestLibraryGuard": "UNKNOWN",
      "timeoutExercised": false
    },
    "ok": true
  },
  {
    "arm": "f1-causal-red",
    "id": 13924766451,
    "zipBytes": 1301,
    "zipSha256": "7ab58670c282740e0e9d6c6d211b4e16640962193bc53bd23b1e00c7ebb81e2f",
    "inventory": [
      {
        "name": "manifest.json",
        "bytes": 207,
        "sha256": "ea4b915e8b189e62f31719151d5787a943e75cfa0f1b4ed46545b0d4f249e06f",
        "crc32": "9f8762c5"
      },
      {
        "name": "result.json",
        "bytes": 3445,
        "sha256": "3cbfecb0b44e4007b9b4eeb866f5eaedb52a0887ba0c1ae4cfa2e05d6cf897bc",
        "crc32": "08f4556a"
      }
    ],
    "expandedBytes": 3652,
    "manifestVerified": true,
    "crcVerified": true,
    "retrievalMs": 125,
    "proof": {
      "utility": [
        {
          "family": "readonly",
          "constructorType": "function",
          "encodeType": "function",
          "literalBytes": 25,
          "literalSha256": "71f13d16a8d62254982e133f9b225e127c24b8196f185d94dcb0740b890d2cb8"
        },
        {
          "family": "reduction",
          "constructorType": "function",
          "encodeType": "function",
          "literalBytes": 25,
          "literalSha256": "71f13d16a8d62254982e133f9b225e127c24b8196f185d94dcb0740b890d2cb8"
        }
      ],
      "purpose": "afw.round1-focused-red.safe.v1",
      "source": "81d46d69bc3fd78ccf6a7bb5329723ef16a78ec5",
      "run": "43177259207",
      "attempt": 1,
      "actualExit": 1,
      "expectedCausalRed": true,
      "proof": {
        "purpose": "afw.native-preparation-round1-controls.syn.v1",
        "source": "81d46d69bc3fd78ccf6a7bb5329723ef16a78ec5",
        "run": "43177259207",
        "attempt": "1",
        "phase": "red",
        "groups": [
          {
            "group": "F1",
            "stage": "complete",
            "passed": false,
            "cases": [
              {
                "family": "readonly",
                "stage": "complete",
                "baseInvocations": 2,
                "baseReceiversPreserved": true,
                "held": true,
                "actualObserverInvocations": 2,
                "heldAfterBaseSettlement": 2,
                "outwardSettledBeforeRelease": 0,
                "lostInterception": false,
                "trace": [
                  "actual-fresh-R-adapter-setup",
                  "actual-probe-observed"
                ],
                "originalMethodsRestored": true,
                "outwardSettledAfterRelease": 2
              },
              {
                "family": "reduction",
                "stage": "complete",
                "baseInvocations": 2,
                "baseReceiversPreserved": true,
                "held": false,
                "actualObserverInvocations": 0,
                "heldAfterBaseSettlement": 0,
                "outwardSettledBeforeRelease": 2,
                "lostInterception": true,
                "trace": [
                  "existing-normal-installed",
                  "actual-D-adapter-setup",
                  "actual-probe-observed"
                ],
                "originalMethodsRestored": true,
                "outwardSettledAfterRelease": 2
              }
            ],
            "error": null
          },
          {
            "group": "F2",
            "status": "pending_implementation",
            "businessCases": 0
          },
          {
            "group": "F3",
            "status": "pending_implementation",
            "businessCases": 0
          },
          {
            "group": "F4",
            "status": "pending_implementation",
            "businessCases": 0
          },
          {
            "group": "F5",
            "status": "pending_implementation",
            "businessCases": 0
          },
          {
            "group": "F6",
            "status": "pending_implementation",
            "businessCases": 0
          },
          {
            "group": "F7",
            "status": "pending_implementation",
            "businessCases": 0
          }
        ],
        "passed": false,
        "causalF1Deficit": true,
        "I0Opened": false,
        "nativeExecutionProduced": false,
        "businessCases": 0,
        "operationalReadiness": false,
        "completePackage": false,
        "PCoff": false,
        "globalNativeDrainVerified": false,
        "sdkNamespaceEmptyVerified": false
      },
      "privateLogSha256": "6ad66b74c746057788bb4733f774e592c9fb20613d76b8d1f6a2488adc3c0daf",
      "I0Opened": false,
      "nativeExecutionProduced": false,
      "businessCases": 0,
      "operationalReadiness": false,
      "completePackage": false,
      "PCoff": false
    },
    "ok": true
  }
]
```

## Root causal ruling and limits
O3Acurrent1FAIL/a051/coveragefalse/stopsatprojection; Bfixedhistorical1PASS/coverage true/719000msheadroom/validatesobserver+2HTTPbuildimports. SolebehaviorvariableT0samef5source/libs/receipt/commonobservation; this identifies modeled-time alignment againstdatedcustody as causalforTHISselectedordinaryadoptiontest. EarliestinternalsharedguardremainsUNKNOWN; other19adoptioncases/commandcases/own9b4/productionpin/currentauth/realruntime/PCoffunqualified. Do not renewsource/credentialsorbackdatearealtrialbythisresult. O3branchclosed/manualall2false/protected3190/ONErunprimaryverifieddc0f8177135b31f79f18d9c24e8b5f1000021d93.
F1causalRED81d/run43177259207 isVALID: actuallegacy+adapterordering/Rheld2 butDbase2/observer0/held0/outwardalreadysettled2, utilityready/noMF/I0/business0. LaterpartialcoveringF1GREENwasreported; actualfullGreenFAILEDF3F4, so F1–F7notaccepted/native16stillheld. This auditdoesnotqualifyfuturechangedcode.
