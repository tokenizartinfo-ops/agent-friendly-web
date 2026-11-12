# AFW O4 — primary safe artifact audit
Clockreadback 2026-11-12 09:18:38 UTC. Run43189735097/1/job131085705528 Sourcebc17654a1b6d87b4018e81db9fe668dfeb3f774e/treee495c9798370ab4aa4363132d859ba95c3c14861. ONE compile-only job terminalFAILURE; safe receipt/upload/IDmetadata succeeded; final incomplete gate failed correctly.
Root independently read primary job+artifactmetadata and downloaded assignedID13929264129 ONCE to RAM (no actor duplicate), Abort5s/no redirects/128KiB bound. ZIP2083B/SHA96bd98c73807d72658cae65bff8fabf744060925952d34441e03133c83c933cc matchesprimaryGitHubdigest; expires2026-11-19T09:15:05Z. CRC knownvector correct; central/local names/metadata/methods/sizes/descriptors/CRC/exact2files/noextras/noSymlink; manifest inventory/result flags verified. No filewritten locally/no signedURL stored or printed.
Actual result INCOMPLETE phaseparse/reasonast_nodes. Original subject3188digest before/after c9554faf...equal, buildreturned one emission2111553B/SHA2b2334f3bb333d13b6e7a6238fe8091a681a986d233fc1253157e64bdbd0f2f2/zero warnings/compiler0.28.2/original profile+literalpin. EmissionNOTimported/evaluated. Fixed200000 parser allocation cap reached BEFORE dictionaryresult; no absence/match/origin conclusion possible, not a credentials/CF/functional repair result. Privacy and7 inertmetadata controls passed/touches0/networkdenied0. Rawstdout1261/stderr0 notuploaded. Actor torestoreexactinactiveworkflowaf862+appendreport/STOP, no automaticcapbump/retry.
## Full closed primary DTO and audit
```json
{
  "id": 13929264129,
  "zipBytes": 2083,
  "zipSha256": "96bd98c73807d72658cae65bff8fabf744060925952d34441e03133c83c933cc",
  "fetchMs": 193.67850000038743,
  "crcKnownVector": true,
  "exactTwoFiles": true,
  "manifestInventoryVerified": true,
  "files": [
    {
      "name": "result.json",
      "bytes": 4399,
      "sha256": "f0a2cf72302e094e00d8e5bb3860ff83e6a0a05963d6f70522ca96c59cb77d56",
      "crc32": "6da616e8"
    },
    {
      "name": "manifest.json",
      "bytes": 259,
      "sha256": "548b18e809a6c2ab9d03cfd6b308633d198de5e188140923d4cacb0e1164d111",
      "crc32": "e742a43b"
    }
  ],
  "result": {
    "purpose": "afw.own-literal.inspection.v1",
    "status": "incomplete",
    "context": {
      "repository": "tokenizartinfo-ops/agent-friendly-web",
      "workflowRef": "refs/heads/diag/afw-own-literal-20261112",
      "trigger": "push",
      "workflowSource": "bc17654a1b6d87b4018e81db9fe668dfeb3f774e",
      "testSource": "f5f52660d19ec9fc634bbc49558db75582fdaf88",
      "runId": "43189735097",
      "attempt": 1,
      "node": "v22.23.4",
      "os": "Ubuntu24.04",
      "mode": "SYN_COMPILE_ONLY_NO_IMPORT",
      "childContext": "MODELED_STERILE_SYNTHETIC",
      "workflowContextIsAdmissionAuthority": false,
      "operationalReadiness": false,
      "completePackage": false,
      "PCoff": false
    },
    "targetHash": "9b4dd8bed13ebaeeb9a8c7a0d998cb01b73b0dfdcedafa4dadb12f9631005bff",
    "limits": {
      "emission": 4194304,
      "nodes": 200000,
      "candidates": 4096,
      "depth": 32,
      "payload": 1048576,
      "folded": 8388608,
      "result": 65536,
      "raw": 8388608,
      "matches": 128
    },
    "noRetry": true,
    "operationalReadiness": false,
    "completePackage": false,
    "PCoff": false,
    "protectedBase": {
      "leaves": 3188,
      "before": "c9554faf9cdb30283109a47cfc863867594e49669d0702f214a44cbcdfe361a7",
      "after": "c9554faf9cdb30283109a47cfc863867594e49669d0702f214a44cbcdfe361a7",
      "equal": true
    },
    "helperHash": "1b19768d05fb20e2a823384688a78cf07e006d5cf30eb9d38e2d59dde2a3a3ac",
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
    "metadata": {
      "pass": true,
      "cases": 7,
      "touches": 0,
      "literal": true,
      "addition": true,
      "template": true,
      "primitiveAddition": true,
      "gettersUntouched": true,
      "proxyUntouched": true,
      "callNotEvaluated": true
    },
    "execution": {
      "exit": {
        "code": 1,
        "signal": null,
        "spawnFailed": false
      },
      "termination": null,
      "evidence": {
        "purpose": "afw.own-literal.child.v1",
        "status": "incomplete",
        "networkDenied": 0,
        "phase": "parse",
        "reason": "ast_nodes",
        "operationalReadiness": false,
        "completePackage": false,
        "PCoff": false,
        "privacy": {
          "pass": true,
          "proxyPrototypesSafe": true,
          "ordinaryNative": true,
          "crossRealmNative": true,
          "crossRealmExactUnknown": true,
          "spoofRejected": true,
          "oversizeSuppressed": true,
          "cycleBounded": true,
          "rawCanaryAbsent": true,
          "getterTouches": 0,
          "proxyTrapTouches": 0
        },
        "metadata": {
          "pass": true,
          "literal": true,
          "addition": true,
          "template": true,
          "primitiveAddition": true,
          "gettersUntouched": true,
          "proxyUntouched": true,
          "callNotEvaluated": true,
          "cases": 7,
          "touches": 0
        },
        "error": [
          {
            "nativeError": true,
            "currentRealmPrototype": "Error",
            "observedDataPrototypeName": "Error",
            "prototypeDepth": 1,
            "prototypeObservationIsExactIntrinsicClass": false,
            "name": null,
            "code": null,
            "messageHash": "22008a736efabd5ba4602a4dca0dcfb3a34dbab8a9990917b51ab797f6cec2f1",
            "messageTooLarge": false,
            "depth": 0,
            "causeDepth": 0
          }
        ],
        "emission": {
          "bytes": 2111553,
          "sha256": "2b2334f3bb333d13b6e7a6238fe8091a681a986d233fc1253157e64bdbd0f2f2",
          "imported": false,
          "evaluated": false
        },
        "build": {
          "profile": "finite_trial_event",
          "literalHash": "79f548435ad46645bd22d1a036aa108dee5dc98a1861d567312d6bf19eee7a7b",
          "compiler": "0.28.2",
          "warnings": 0,
          "outputFiles": 1
        }
      },
      "rawFiles": [
        {
          "name": "raw.stdout",
          "bytes": 1261,
          "sha256": "7d78abfc6455285eb85e3731f22fbb8d7563ef49eec43e66d4554e522d97fd3a",
          "uploaded": false
        },
        {
          "name": "raw.stderr",
          "bytes": 0,
          "sha256": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
          "uploaded": false
        }
      ],
      "rawLogsUploaded": false
    }
  },
  "manifest": {
    "purpose": "afw.own-literal.manifest.v1",
    "inventory": [
      {
        "name": "result.json",
        "bytes": 4399,
        "sha256": "f0a2cf72302e094e00d8e5bb3860ff83e6a0a05963d6f70522ca96c59cb77d56"
      }
    ],
    "rawLogsUploaded": false,
    "operationalReadiness": false,
    "completePackage": false,
    "PCoff": false
  }
}
```
