# Task2 actual closed R2 certificate — Root independent primary audit

Current inspectorSource83e12af6a1bdbce8d95671ef83db32c28ed44574/run43303568700/attempt1. Reviewed candidatec7ed76a1/WF7813487a, activationWF24ba58040124149c35bea4e37fa6f66c289dc434/193330chars. Root independently removed onlyevent/twofalseprefix/runlabel normalization and found entire reviewed body byte-identical. ONE permit consumed, no replay. Both actualjobs producer131480801075/verifier131480972214 terminalSUCCESS. Only keylessverifierlogs/closedrecords andassignedSMALLSAFEartifact were read; Originalcipher/key/plain/privateproducerlogs never downloaded.

## Primary output and interpretation

SAFEartifact13982238051 exactly3098B/SHA25636e52a7a9780996b3fc9655852abc66fef7905541bdbbfc8570c2685579bf5db, currentmetadatarepo1347578006/source/run/branch exact,notexpired,created20:46:25Z/expires19nov20:46:25Z. Root checked ZIP local/central/order/ranges/CRC/EOF/noextras/decompression/strictUTF8/JSON/2files/combined65536, actualwholemanifest/currentidentity, strictnewpurpose/types/enums/nullablecoherence/feasibility and oldCorefacts. BOTH oldownerReference rows deep-identical to priorsealedprojection43290649461/1; Originalnestedfacts unchanged exceptactualinspectoridentity andtimings. Allreadinessfalse.

R2certificate now directly relates lastINSERTED child5 to5018ms andabortedtrue, position settled→issuer-ack, nine recordedsteps, laststep source-pair elapsed706. This child is maxduration5018 AND the soleabort within recorded5 because eachknown; it is NOT automatically “lastfailed/lastcompleted”. Abort canbefinallycleanup too; sourcepositionACKdoesnot identify whichissueroperation. source-pair isentry→finally evenerror, attached toactiveMetricatemission, NOT exclusive causalownership or priorstep/nativeeffect/SDKcompletion. NoNativecause orproviderfailure claimed. R2response503 is earlierrecordedroute observation, notprovedCloudflare503.
R1stillinvalid/allunknown; rejectedpredicate remainsunknown. No capincrease/inferredR1>256/automaticNative16retry.
ResultstatusPARTIAL is validauthenticatedprojection/transport, not partialNativequalification orreadiness.

Root audit:
```json
{
  "id": 13982238051,
  "zipBytes": 3098,
  "zipSha256": "36e52a7a9780996b3fc9655852abc66fef7905541bdbbfc8570c2685579bf5db",
  "strictEnvelope": true,
  "originalNestedFactsUnchanged": true,
  "realWholeManifest": true,
  "current": {
    "source": "83e12af6a1bdbce8d95671ef83db32c28ed44574",
    "run": "43303568700"
  },
  "status": "partial",
  "rows": [
    {
      "case": "R1",
      "status": "invalid",
      "basic": {
        "completeWrites": null,
        "completeNormal": null,
        "lists": null,
        "gets": null,
        "peak": null,
        "referenceRows": null,
        "responseStatus": null
      },
      "lookup": {
        "status": "unknown",
        "budgetMs": null,
        "actualElapsedMs": null,
        "aborted": null
      },
      "children": {
        "status": "unknown",
        "count": null,
        "knownDurationCount": null,
        "maxElapsedMs": null,
        "knownAbortCount": null,
        "abortedCount": null
      },
      "roots": {
        "status": "unknown",
        "count": null,
        "knownWindowCount": null,
        "minWindowMs": null,
        "maxWindowMs": null
      },
      "http": {
        "status": "unknown",
        "count": null,
        "knownElapsedCount": null,
        "maxElapsedMs": null,
        "recordedGuardCount": null,
        "maxBodyGuardMs": null
      }
    },
    {
      "case": "R2",
      "status": "present",
      "basic": {
        "completeWrites": 0,
        "completeNormal": 0,
        "lists": 0,
        "gets": 0,
        "peak": 0,
        "referenceRows": 0,
        "responseStatus": 503
      },
      "lookup": {
        "status": "absent",
        "budgetMs": null,
        "actualElapsedMs": null,
        "aborted": null
      },
      "children": {
        "status": "present",
        "count": 5,
        "knownDurationCount": 5,
        "maxElapsedMs": 5018,
        "knownAbortCount": 5,
        "abortedCount": 1
      },
      "roots": {
        "status": "present",
        "count": 2,
        "knownWindowCount": 2,
        "minWindowMs": 30000,
        "maxWindowMs": 30000
      },
      "http": {
        "status": "present",
        "count": 254,
        "knownElapsedCount": 254,
        "maxElapsedMs": 183,
        "recordedGuardCount": 254,
        "maxBodyGuardMs": 23
      }
    }
  ],
  "lastChild": {
    "case": "R2",
    "status": "present",
    "childCount": 5,
    "ordinal": 5,
    "position": "settled",
    "endPosition": "issuer-ack",
    "elapsedMs": 5018,
    "aborted": true,
    "stepCount": 9,
    "lastStep": "source-pair",
    "lastStepElapsedMs": 706
  },
  "oldRowsUnchanged": true,
  "timings": {
    "downloadMs": 867,
    "openMs": 5156,
    "parseCleanupMs": 486
  },
  "allReadinessFalse": true,
  "files": [
    {
      "name": "manifest.json",
      "bytes": 347,
      "sha256": "1b46e5e1610186cd70c90562dd179c47ced2cddcc0745fc33d33981f80207d2b",
      "crc32": "b0a73736"
    },
    {
      "name": "result.json",
      "bytes": 14733,
      "sha256": "cd94e1d88b43485532bf589672f6b8e3a50e1beba229204c3b586dd55f3da144",
      "crc32": "8bc73f77"
    }
  ]
}
```

## Exact small safe result and real whole-envelope manifest

```json
{
  "purpose": "afw.readonly-reference-boundaries.safe.v1",
  "status": "partial",
  "inspection": {
    "purpose": "afw.readonly-receipt-inspection.safe.v1",
    "inspector": {
      "repository": "tokenizartinfo-ops/agent-friendly-web",
      "ref": "refs/heads/feat/finite-native-cleanup-20261101",
      "source": "83e12af6a1bdbce8d95671ef83db32c28ed44574",
      "run": "43303568700",
      "attempt": 1,
      "node": "22.23.4"
    },
    "originalContext": {
      "purpose": "afw.finite-checkpoint-custody.syn.v1",
      "repository": "tokenizartinfo-ops/agent-friendly-web",
      "ref": "refs/heads/feat/finite-native-cleanup-20261101",
      "sourceSha": "19789b5f31935e0b5be00cbb24c5f45de2a0100a",
      "runId": "43229236340",
      "runAttempt": 1,
      "kind": "consumer-failure"
    },
    "artifact": {
      "id": 13949168304,
      "zipBytes": 13680188,
      "zipSha256": "8a408941c11e93e342fe2ccbf09763caf04e96fc5a1aaf12bde52da0fcaf19d5",
      "verified": true
    },
    "sources": [
      {
        "id": "native_test",
        "blob": "533dafb5df5f8e57442c5b9029dc8dec6dded434",
        "lines": 148
      },
      {
        "id": "budget_world",
        "blob": "5fb78c057b7e80260ae683abf4af892767ce110e",
        "lines": 1926
      }
    ],
    "status": "inspected",
    "phases": {
      "fixtures": "passed",
      "download": "verified",
      "authentication": "authenticated",
      "identity": "verified",
      "projection": "projected",
      "cleanup": "complete"
    },
    "fixtures": {
      "checks": 91
    },
    "authentication": {
      "authenticated": true,
      "innerInventoryVerified": true,
      "fileCount": 128,
      "totalBytes": 298888337
    },
    "failureIdentity": {
      "verified": true,
      "commandSucceeded": false,
      "elapsedMs": 293372
    },
    "cases": [
      {
        "case": "R1",
        "tap": {
          "status": "fail",
          "durationMs": 82126.093382,
          "failureType": "testCodeFailure",
          "code": "ERR_ASSERTION",
          "operator": "strictEqual",
          "actual": {
            "known": true,
            "type": "boolean",
            "value": false,
            "recordedFieldBytes": 16,
            "recordedFieldSha256": "5855d067eff1207596558966d16cfa21651bba05329fbfdde209f5b40e69b23e"
          },
          "expected": {
            "known": true,
            "type": "boolean",
            "value": true,
            "recordedFieldBytes": 17,
            "recordedFieldSha256": "88f086b6ddb6f412bd298a8c5b250bf1f58c8799c591e9c9be3c6d2c16cb53a6"
          },
          "tapErrorFieldBytes": 83,
          "tapErrorFieldSha256": "a79e2054351acf6947c5adb71adeca9660d8206c802fa6580372f6a51a6b401d",
          "registrationCandidate": {
            "label": "registration_candidate",
            "publicFile": "native_test",
            "line": 103,
            "column": 37
          },
          "stackCandidates": [
            {
              "label": "stack_candidate",
              "publicFile": "budget_world",
              "line": 1178,
              "column": 109
            },
            {
              "label": "stack_candidate",
              "publicFile": "budget_world",
              "line": 901,
              "column": 13
            },
            {
              "label": "stack_candidate",
              "publicFile": "native_test",
              "line": 105,
              "column": 16
            }
          ],
          "assertionLocation": "unknown",
          "unsupportedFieldCount": 1
        },
        "ownership": {
          "status": "invalid",
          "complete": null,
          "primaryPreserved": null,
          "ancillaryFailureCount": null,
          "callbackCount": null,
          "recordCount": null,
          "disposedCount": null,
          "archivedCount": null,
          "uncertainCount": null,
          "terminalCapture": {
            "captured": null,
            "failed": null,
            "unavailable": null
          }
        },
        "fullResult": {
          "status": "missing",
          "booleans": {
            "foreignUnchanged": null,
            "referenceBefore302": null,
            "thirdListEntered": null,
            "lateReference": null
          },
          "counts": {
            "completeWrites": null,
            "completeNormal": null,
            "lists": null,
            "gets": null,
            "scopePeak": null,
            "responseStatus": null,
            "referenceRows": null,
            "sdkReplay": null,
            "nativeUnsettled": null,
            "outwardPending": null,
            "heldNativeSettled": null,
            "queuedAtHold": null,
            "callsAfterRelease": null
          },
          "originalChildElapsedMs": null,
          "rootAvailability": {
            "before": null,
            "during": null,
            "after": null
          }
        }
      },
      {
        "case": "R2",
        "tap": {
          "status": "fail",
          "durationMs": 80357.713303,
          "failureType": "testCodeFailure",
          "code": "ERR_ASSERTION",
          "operator": "strictEqual",
          "actual": {
            "known": true,
            "type": "number",
            "value": 0,
            "recordedFieldBytes": 12,
            "recordedFieldSha256": "d1d2bdb464819a8c683e86afb21df554f4ea1e842815cd1592f759feb3b33100"
          },
          "expected": {
            "known": true,
            "type": "number",
            "value": 1,
            "recordedFieldBytes": 14,
            "recordedFieldSha256": "4772d46acf7ef94b24dbc33dd9d923909efb9e58131a4f28e5d4c183889bd770"
          },
          "tapErrorFieldBytes": 72,
          "tapErrorFieldSha256": "347c4524903320cb4ffd2d3347827c60b353d90dba5181ce338a7f7329de68e4",
          "registrationCandidate": {
            "label": "registration_candidate",
            "publicFile": "native_test",
            "line": 103,
            "column": 37
          },
          "stackCandidates": [
            {
              "label": "stack_candidate",
              "publicFile": "budget_world",
              "line": 1135,
              "column": 51
            },
            {
              "label": "stack_candidate",
              "publicFile": "budget_world",
              "line": 1185,
              "column": 126
            },
            {
              "label": "stack_candidate",
              "publicFile": "budget_world",
              "line": 901,
              "column": 13
            },
            {
              "label": "stack_candidate",
              "publicFile": "native_test",
              "line": 105,
              "column": 16
            }
          ],
          "assertionLocation": "unknown",
          "unsupportedFieldCount": 1
        },
        "ownership": {
          "status": "invalid",
          "complete": null,
          "primaryPreserved": null,
          "ancillaryFailureCount": null,
          "callbackCount": null,
          "recordCount": null,
          "disposedCount": null,
          "archivedCount": null,
          "uncertainCount": null,
          "terminalCapture": {
            "captured": null,
            "failed": null,
            "unavailable": null
          }
        },
        "fullResult": {
          "status": "missing",
          "booleans": {
            "foreignUnchanged": null,
            "referenceBefore302": null,
            "thirdListEntered": null,
            "lateReference": null
          },
          "counts": {
            "completeWrites": null,
            "completeNormal": null,
            "lists": null,
            "gets": null,
            "scopePeak": null,
            "responseStatus": null,
            "referenceRows": null,
            "sdkReplay": null,
            "nativeUnsettled": null,
            "outwardPending": null,
            "heldNativeSettled": null,
            "queuedAtHold": null,
            "callsAfterRelease": null
          },
          "originalChildElapsedMs": null,
          "rootAvailability": {
            "before": null,
            "during": null,
            "after": null
          }
        }
      },
      {
        "case": "R3",
        "tap": {
          "status": "fail",
          "durationMs": 100623.890137,
          "failureType": "testCodeFailure",
          "code": "ERR_ASSERTION",
          "operator": "==",
          "actual": {
            "known": true,
            "type": "boolean",
            "value": false,
            "recordedFieldBytes": 16,
            "recordedFieldSha256": "5855d067eff1207596558966d16cfa21651bba05329fbfdde209f5b40e69b23e"
          },
          "expected": {
            "known": true,
            "type": "boolean",
            "value": true,
            "recordedFieldBytes": 17,
            "recordedFieldSha256": "88f086b6ddb6f412bd298a8c5b250bf1f58c8799c591e9c9be3c6d2c16cb53a6"
          },
          "tapErrorFieldBytes": 49,
          "tapErrorFieldSha256": "98cffb88bb90196e9527d71511d17ef3793f92401db73b7a0b283105b62a90de",
          "registrationCandidate": {
            "label": "registration_candidate",
            "publicFile": "native_test",
            "line": 103,
            "column": 37
          },
          "stackCandidates": [
            {
              "label": "stack_candidate",
              "publicFile": "budget_world",
              "line": 1148,
              "column": 68
            },
            {
              "label": "stack_candidate",
              "publicFile": "budget_world",
              "line": 1166,
              "column": 34
            },
            {
              "label": "stack_candidate",
              "publicFile": "budget_world",
              "line": 901,
              "column": 13
            },
            {
              "label": "stack_candidate",
              "publicFile": "native_test",
              "line": 105,
              "column": 16
            }
          ],
          "assertionLocation": "unknown",
          "unsupportedFieldCount": 1
        },
        "ownership": {
          "status": "invalid",
          "complete": null,
          "primaryPreserved": null,
          "ancillaryFailureCount": null,
          "callbackCount": null,
          "recordCount": null,
          "disposedCount": null,
          "archivedCount": null,
          "uncertainCount": null,
          "terminalCapture": {
            "captured": null,
            "failed": null,
            "unavailable": null
          }
        },
        "fullResult": {
          "status": "missing",
          "booleans": {
            "foreignUnchanged": null,
            "referenceBefore302": null,
            "thirdListEntered": null,
            "lateReference": null
          },
          "counts": {
            "completeWrites": null,
            "completeNormal": null,
            "lists": null,
            "gets": null,
            "scopePeak": null,
            "responseStatus": null,
            "referenceRows": null,
            "sdkReplay": null,
            "nativeUnsettled": null,
            "outwardPending": null,
            "heldNativeSettled": null,
            "queuedAtHold": null,
            "callsAfterRelease": null
          },
          "originalChildElapsedMs": null,
          "rootAvailability": {
            "before": null,
            "during": null,
            "after": null
          }
        }
      }
    ],
    "businessCounts": {
      "status": "missing",
      "tests": null,
      "pass": null,
      "fail": null,
      "cancelled": null,
      "skipped": null,
      "todo": null
    },
    "tap": {
      "status": "present",
      "recordedCaseCount": 3,
      "fileWrapper": {
        "status": "unknown",
        "durationMs": null
      },
      "summary": {
        "status": "present",
        "tests": 3,
        "pass": 0,
        "fail": 3,
        "cancelled": 0,
        "skipped": 0,
        "todo": 0
      },
      "reason": "none"
    },
    "timings": {
      "downloadMs": 867,
      "openMs": 5156,
      "parseCleanupMs": 486
    },
    "failure": null,
    "operationalReadiness": false,
    "completePackage": false,
    "PCoff": false,
    "globalNativeDrainVerified": false,
    "sdkNamespaceEmptyVerified": false
  },
  "ownerReference": [
    {
      "case": "R1",
      "status": "invalid",
      "basic": {
        "completeWrites": null,
        "completeNormal": null,
        "lists": null,
        "gets": null,
        "peak": null,
        "referenceRows": null,
        "responseStatus": null
      },
      "lookup": {
        "status": "unknown",
        "budgetMs": null,
        "actualElapsedMs": null,
        "aborted": null
      },
      "children": {
        "status": "unknown",
        "count": null,
        "knownDurationCount": null,
        "maxElapsedMs": null,
        "knownAbortCount": null,
        "abortedCount": null
      },
      "roots": {
        "status": "unknown",
        "count": null,
        "knownWindowCount": null,
        "minWindowMs": null,
        "maxWindowMs": null
      },
      "http": {
        "status": "unknown",
        "count": null,
        "knownElapsedCount": null,
        "maxElapsedMs": null,
        "recordedGuardCount": null,
        "maxBodyGuardMs": null
      }
    },
    {
      "case": "R2",
      "status": "present",
      "basic": {
        "completeWrites": 0,
        "completeNormal": 0,
        "lists": 0,
        "gets": 0,
        "peak": 0,
        "referenceRows": 0,
        "responseStatus": 503
      },
      "lookup": {
        "status": "absent",
        "budgetMs": null,
        "actualElapsedMs": null,
        "aborted": null
      },
      "children": {
        "status": "present",
        "count": 5,
        "knownDurationCount": 5,
        "maxElapsedMs": 5018,
        "knownAbortCount": 5,
        "abortedCount": 1
      },
      "roots": {
        "status": "present",
        "count": 2,
        "knownWindowCount": 2,
        "minWindowMs": 30000,
        "maxWindowMs": 30000
      },
      "http": {
        "status": "present",
        "count": 254,
        "knownElapsedCount": 254,
        "maxElapsedMs": 183,
        "recordedGuardCount": 254,
        "maxBodyGuardMs": 23
      }
    }
  ],
  "lastChild": {
    "case": "R2",
    "status": "present",
    "childCount": 5,
    "ordinal": 5,
    "position": "settled",
    "endPosition": "issuer-ack",
    "elapsedMs": 5018,
    "aborted": true,
    "stepCount": 9,
    "lastStep": "source-pair",
    "lastStepElapsedMs": 706
  },
  "failure": null,
  "operationalReadiness": false,
  "completePackage": false,
  "PCoff": false,
  "globalNativeDrainVerified": false,
  "sdkNamespaceEmptyVerified": false
}
```

```json
{
  "purpose": "afw.readonly-reference-boundaries-manifest.safe.v1",
  "inspectorSource": "83e12af6a1bdbce8d95671ef83db32c28ed44574",
  "inspectorRun": "43303568700",
  "attempt": 1,
  "files": [
    {
      "path": "result.json",
      "bytes": 14733,
      "sha256": "cd94e1d88b43485532bf589672f6b8e3a50e1beba229204c3b586dd55f3da144"
    }
  ]
}
```

## Independent verifier closed records

Each<=2048B; allfour currentidentity/gates. Cored514/ZIPb36c unchanged; generatedverifier554e1dfb5952a573055054283bf5d9064c7c7c811c00658892527dc078677a94 independently reconstructed byRootasSTRINGDATA beforeactual.
```json
{"marker":"INSPECTION_PAIR_CONTROLS","expected":16,"completed":16,"pass":16,"fail":0,"inventory":[{"id":"observed_pass","status":"passed"},{"id":"observed_failure","status":"passed"},{"id":"observed_skip_todo","status":"passed"},{"id":"result_source","status":"passed"},{"id":"result_run","status":"passed"},{"id":"manifest_source","status":"passed"},{"id":"manifest_run","status":"passed"},{"id":"foreign_pair","status":"passed"},{"id":"fixture_count","status":"passed"},{"id":"unexamined","status":"passed"},{"id":"two_records","status":"passed"},{"id":"unknown_case","status":"passed"},{"id":"wrapper_only","status":"passed"},{"id":"manifest_bytes","status":"passed"},{"id":"manifest_digest","status":"passed"},{"id":"case_order","status":"passed"}],"firstFailure":null}
{"marker":"SAFE_ZIP_CONTROLS","expected":16,"completed":16,"pass":16,"fail":0,"inventory":[{"id":"validator_capture_after_success","status":"passed"},{"id":"validator_rejection_identity_no_capture","status":"passed"},{"id":"zip_valid_store_crc_vector","status":"passed"},{"id":"zip_valid_deflate","status":"passed"},{"id":"zip_signed_unsigned_descriptors","status":"passed"},{"id":"zip_wrong_size","status":"passed"},{"id":"zip_wrong_upload_sha","status":"passed"},{"id":"zip_wrong_metadata_sha","status":"passed"},{"id":"zip_extra_entry","status":"passed"},{"id":"zip_duplicate_entry","status":"passed"},{"id":"zip_traversal_entry","status":"passed"},{"id":"zip_symlink","status":"passed"},{"id":"zip_bad_crc","status":"passed"},{"id":"zip_noncontiguous_ranges","status":"passed"},{"id":"zip_declared_and_inflate_caps","status":"passed"},{"id":"download_stream_redirect_auth_bounds","status":"passed"}],"failure":null}
{"marker":"AFW_METADATA_READBACK/1","source":"83e12af6a1bdbce8d95671ef83db32c28ed44574","run":"43303568700","attempt":1,"assignedArtifactId":"13982238051","stage":"complete","firstFailedPredicate":"none","reason":"none","httpStatus":200,"receivedBytes":776,"timeoutObserved":false,"verified":true}
{"marker":"AFW_SAFE_READBACK/1","kind":"supplement","source":"83e12af6a1bdbce8d95671ef83db32c28ed44574","run":"43303568700","attempt":1,"artifactId":"13982238051","coreSha256":"d514b1906a8ab6bde818a1aba6f99a9f1a3ee91814f88b28560013d23f657246","verifierSha256":"554e1dfb5952a573055054283bf5d9064c7c7c811c00658892527dc078677a94","safeZipModuleSha256":"b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d","producerCoreVerified":true,"sourceCoreVerified":true,"safeControlsPass":true,"metadataVerified":true,"rawZipVerified":true,"inventoryVerified":true,"producerControlCount":null,"supplementStatus":"partial","zipBytes":3098,"metadataZipBytes":3098,"uploadDigest":"36e52a7a9780996b3fc9655852abc66fef7905541bdbbfc8570c2685579bf5db","metadataDigest":"sha256:36e52a7a9780996b3fc9655852abc66fef7905541bdbbfc8570c2685579bf5db","rawZipSha256":"36e52a7a9780996b3fc9655852abc66fef7905541bdbbfc8570c2685579bf5db","resultBytes":14733,"resultSha256":"cd94e1d88b43485532bf589672f6b8e3a50e1beba229204c3b586dd55f3da144","manifestBytes":347,"manifestSha256":"1b46e5e1610186cd70c90562dd179c47ced2cddcc0745fc33d33981f80207d2b","stage":"complete","reason":"none","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
```

GitHub reports20:46UTC; Roottoolclockaround20:29–20:33UTC. Both literal clocks preserved; no offsetcompensation/expirychange or causeinference. Only monotonicreviewed deadlines controlrunner. Inspector timingsdownload867/open5156/parseCleanup486ms concern inspection/ownedtempcleanup, NOT Originalnative/globaldrain.

Sourceexecutor currently performs mandatory exactF7restoration then fullreadbacks/0activeSTOP regardlessresult. This document does NOT claim closure until independent Rootreadback is appended in finalpackage. No nextSource/native/runtimepermit released. All operationalReadiness/completePackage/PCoff/globalNativeDrainVerified/sdkNamespaceEmptyVerified remainfalse.
