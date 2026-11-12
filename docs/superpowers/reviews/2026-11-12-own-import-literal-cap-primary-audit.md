# O4 second bounded measurement — primary artifact audit
Clockreadback 2026-11-12 11:33:31 UTC. One NEW run43209668123/1/job131153755154/Source86d5aca565bb460b19191880547440248929b6b8/tree1393aa704b4e0a64683716452a3420a7f7590bc8 SUCCESS; previous43189735097 remainsconsumed/incomplete. Root independentlyverifiedjob/artifactmetadata and ONE exactID13940628317 RAMdownload (actor0), ZIP2381B/SHA08d675baf81b89f4027c0c355894ed9096c19b9c010c27d7a87f38d3132406db/expires19Nov11:30:36Z. Abort5s/no redirects/128KiBbound, noFS/no URLs printed. ZIPcentral/local/CRCknownvector/exact2paths/inventory/resultmanifest/run/source/closedflags allpassed.

ActualINSPECTION_COMPLETE on SAME2111553B/SHA2b2334f3bb333d13b6e7a6238fe8091a681a986d233fc1253157e64bdbd0f2f2 emission, noimport/evaluation. ParserAcorn8.18.0 allocationattempts/completions289982/289982; uniquevisit attempts/completions289702/289702, eachbelow600k. StartupV8heap_size_limit268435456B matchesfixedflag; thisisheapceilingNOTmeasuredRSS/peakheap/external/compilerbound.
793syntacticcandidates;363staticfoldedpayloads/20379B;426unsupportedAST+4missingpayloadunknowns; target9b4 hashmatches0. Conclusion NO_MATCH_IN_BOUNDED_STATIC_DICTIONARY only. This excludes363supportedfixedpayloads ofthisexactemission, notdynamic/aliases/impliciterrors andnotexecutedthroworigin. Originalown-importerror9b4 unresolved, no productfix/ordinarysuitegreen/PCoff claim.
Privacy/metadata controls pass/getter0/Proxy0; no rawlogs/Source/bundle/ASTdump uploaded. Same3188source digestbeforeafter verifiedbyreceipt. Actor torestoreexactinactiveaf862/reportappend/readbacks/STOP, no additionalrun/capchange.
## Full closed DTO and independent audit
```json
{
  "id": 13940628317,
  "zipBytes": 2381,
  "zipSha256": "08d675baf81b89f4027c0c355894ed9096c19b9c010c27d7a87f38d3132406db",
  "fetchMs": 579.6124,
  "exactTwoFiles": true,
  "crcKnownVector": true,
  "manifestInventoryVerified": true,
  "files": [
    {
      "name": "result.json",
      "bytes": 5842,
      "sha256": "5b3d3af2a87448be297d513b416f5fb0e3f92820f683633eb9dcd17b258ae3e2",
      "crc32": "9dfd63bb"
    },
    {
      "name": "manifest.json",
      "bytes": 259,
      "sha256": "e93c869fe2d7bcb694e5a015da11a7a261e5b3909b6c671387a1a92ab7361cf3",
      "crc32": "9ffdd816"
    }
  ],
  "result": {
    "purpose": "afw.own-literal.inspection.v1",
    "status": "inspection_complete",
    "context": {
      "repository": "tokenizartinfo-ops/agent-friendly-web",
      "workflowRef": "refs/heads/diag/afw-own-literal-20261112",
      "trigger": "push",
      "workflowSource": "86d5aca565bb460b19191880547440248929b6b8",
      "testSource": "f5f52660d19ec9fc634bbc49558db75582fdaf88",
      "runId": "43209668123",
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
    "expectedEmission": {
      "bytes": 2111553,
      "sha256": "2b2334f3bb333d13b6e7a6238fe8091a681a986d233fc1253157e64bdbd0f2f2"
    },
    "heapBudget": {
      "flag": "--max-heap-size=256",
      "bytes": 268435456,
      "kind": "V8_HEAP_ONLY",
      "rssBounded": false,
      "externalBuffersBounded": false,
      "compilerSubprocessBounded": false
    },
    "progress": {
      "state": "observed",
      "allocationAttempts": 289982,
      "allocationCompletions": 289982,
      "uniqueVisitAttempts": 289702,
      "uniqueVisitCompletions": 289702
    },
    "limits": {
      "emission": 4194304,
      "allocations": 600000,
      "visits": 600000,
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
    "helperHash": "de88e032aa15542eeaf7adf01a0e820a2904e63397032176843450a5948e0fd2",
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
        "code": 0,
        "signal": null,
        "spawnFailed": false
      },
      "termination": null,
      "evidence": {
        "purpose": "afw.own-literal.child.v1",
        "status": "inspection_complete",
        "progress": {
          "state": "observed",
          "allocationAttempts": 289982,
          "allocationCompletions": 289982,
          "uniqueVisitAttempts": 289702,
          "uniqueVisitCompletions": 289702
        },
        "networkDenied": 0,
        "phase": null,
        "reason": null,
        "operationalReadiness": false,
        "completePackage": false,
        "PCoff": false,
        "heap": {
          "kind": "V8_HEAP_ONLY",
          "flag": "--max-heap-size=256",
          "requestedBytes": 268435456,
          "heapSizeLimitBytes": 268435456,
          "verified": true,
          "rssBounded": false,
          "externalBuffersBounded": false,
          "compilerSubprocessBounded": false
        },
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
        "error": [],
        "emission": {
          "bytes": 2111553,
          "sha256": "2b2334f3bb333d13b6e7a6238fe8091a681a986d233fc1253157e64bdbd0f2f2",
          "identityMatches": true,
          "imported": false,
          "evaluated": false
        },
        "build": {
          "profile": "finite_trial_event",
          "literalHash": "79f548435ad46645bd22d1a036aa108dee5dc98a1861d567312d6bf19eee7a7b",
          "compiler": "0.28.2",
          "warnings": 0,
          "outputFiles": 1
        },
        "parser": {
          "name": "acorn",
          "version": "8.18.0",
          "sourceType": "module",
          "errorRecovery": false,
          "allocationAttempts": 289982,
          "allocationCompletions": 289982
        },
        "inspection": {
          "nodes": 289702,
          "candidates": 793,
          "folded": 363,
          "foldedBytes": 20379,
          "unknown": {
            "unsupported_ast": 426,
            "missing_payload": 4
          },
          "matches": [],
          "conclusion": "NO_MATCH_IN_BOUNDED_STATIC_DICTIONARY",
          "moduleAttribution": false
        }
      },
      "progress": {
        "state": "observed",
        "allocationAttempts": 289982,
        "allocationCompletions": 289982,
        "uniqueVisitAttempts": 289702,
        "uniqueVisitCompletions": 289702
      },
      "rawFiles": [
        {
          "name": "raw.stdout",
          "bytes": 1678,
          "sha256": "b1501398f90d56d2417341c58af1acec6810068a414d95367364dac2b1d15959",
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
        "bytes": 5842,
        "sha256": "5b3d3af2a87448be297d513b416f5fb0e3f92820f683633eb9dcd17b258ae3e2"
      }
    ],
    "rawLogsUploaded": false,
    "operationalReadiness": false,
    "completePackage": false,
    "PCoff": false
  }
}
```
