# Bounded reference TaskB — primary PARTIAL, exactF7 closed

Rootobservation2026-11-12T19:17:36Z. SINGLErelease482d1e8c consumed once. Activationd043c3b711fa1fb788426e41ff05947b0df4e078/tree8f36e6bff35d206ffa3257abe8ee3e711e70aa3f/WF57aaef7db348e4af050b1fc475db71ce6253d527; [run43290649461/attempt1](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/43290649461) SUCCESS. RootfullactivationbodycomparedwithreviewedC4: ONLYeventpathscopedpush/runlabel/twofalse-prefixes changed, codebyteidentical. Producer131435682109 andverifier131435898409 terminalSUCCESS; SourceOriginalcipher/key/plainpayloadONLYGitHubrunner, noRootprivateartifact/producerlogs/localSourceexecution.

## Distinct clocks, no compensation

GitHubmetadatareportscreated19:29:16Z, producer19:29:21–39Z/verifier19:29:41–48Z; Rootclockactuallyobserved19:13:04Z andlater19:17:36Z. Preservebothliteralobservations; no offset/cause/expiry/orderuniversality inferred, no timebudgetchange/retry. Terminalstates/currentSource/run/hashproof reconciled independently. Thisisnot evidence aboutCloudflareclockorOriginalnativefailurecause.

## Result and interpretation

ValidtransportPARTIAL. R1invalid/allrequestedmetricsUNKNOWN/null; a content/policyvalidation rejectedthatrow, exactpredicateUNKNOWN, noEIO/authdiagnosis. R2present: responseStatus503, grant-put attemptmarkercompleteWrites0, normalcompletionmarkercompleteNormal0, lists/gets/peak/referenceRows0, lookupabsent. Fivechildren, all5knowndurations, maximum5018ms,5knownabortobservations/1aborted. Maxduration andabortedcountarenotrow-correlated: DO NOTasserttheabortedchildwas5018ms. TwoSDKroots each30000ms. HTTPspans254 (max183ms), recordedguards254(max23ms; source defaultsbodyGuardMs??0, numericstoredcountnotmeasurementcertainty). ZeroattemptmarkerNOTproofnoSDKinvocation/globalnoeffect; absentlookupobservationNOTprooflookupneverinvoked. ThesearemeasuredsymptomsforpublicSourcecorrelation, notSDKrootcause/repair/drain/PCoffreadiness. R1mightviolatethe256arrayboundgivenR2's254, butthatisonlyanUNPROVENhypothesis, nocapwideningfromit.

Prior16MiBoversizehurdle cleared forR2; actualprocessingtimingsbelowareauthoritative; no maximumsizeperformanceclaim. OriginalR1/R2/R3TAPfailures/ownershipinvalid/full-resultmissing unchanged. Native16stillFAILED, noNativeSDKtrial/replay/Sourcebusiness/world/CF/runtime/key/OAuth/OTP/cron/callback/consumer/Max/mail/merge/deploy.

## Root independent public safe artifact audit

Artifact13976553433/3014B/SHA4888efcf52904abe8bd59a4e99172833cf98080e49e019bdec500a2b016a7e2f. RootONEboundedRAMsafeZIPdownload, exactsize+SHA/localcentralEOCD/ranges/CRCknownvector/noextras/twoJSON/65536Bbound. RealwholeenvelopemanifestmatchescurrentSource/run/attempt andresultbytes+SHA. Strictclosedrowtypes/knowncounts/nulls/caseorder/allflagsfalse validated. EntireunchangednestedV1Originalfacts comparedwithpriorprimarybaseline, replacingONLYexpectedcurrentinspectoridentityandcheckingactualtimingbounds. No fakeinnerV1manifest. RootmetadataauditorinitialstructuredClonecomparisonhitcross-realmprototypeinequality; JSON-normalizingknownJSONexpectedbaselinefixedtheauditoronly, noSource/privateoperationrepeated. Currentverifier204f8290/Cored514/ZIPb36c matchesqualifiedcode.

```json
{
  "id": 13976553433,
  "zipBytes": 3014,
  "zipSha256": "4888efcf52904abe8bd59a4e99172833cf98080e49e019bdec500a2b016a7e2f",
  "strictEnvelope": true,
  "originalNestedFactsUnchanged": true,
  "realWholeManifest": true,
  "current": {
    "source": "d043c3b711fa1fb788426e41ff05947b0df4e078",
    "run": "43290649461"
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
  "timings": {
    "downloadMs": 1765,
    "openMs": 5293,
    "parseCleanupMs": 448
  },
  "allReadinessFalse": true,
  "files": [
    {
      "name": "result.json",
      "bytes": 14452,
      "sha256": "8bfb03dc0e4c16188ea61ea7116b6f74209aaf002b6ede4a6c4b326e658648d3",
      "crc32": "d4bfb9a1"
    },
    {
      "name": "manifest.json",
      "bytes": 353,
      "sha256": "a7f49b62902e07d8dfdf2fdff1fdfb5eafa32a0d006ee40919c9f8e918cc5770",
      "crc32": "deb49584"
    }
  ]
}
```

## Complete safe pair

```json
[
  {
    "name": "result.json",
    "bytes": 14452,
    "sha256": "8bfb03dc0e4c16188ea61ea7116b6f74209aaf002b6ede4a6c4b326e658648d3",
    "crc32": "d4bfb9a1",
    "value": {
      "purpose": "afw.readonly-owner-reference-supplement.safe.v1",
      "status": "partial",
      "inspection": {
        "purpose": "afw.readonly-receipt-inspection.safe.v1",
        "inspector": {
          "repository": "tokenizartinfo-ops/agent-friendly-web",
          "ref": "refs/heads/feat/finite-native-cleanup-20261101",
          "source": "d043c3b711fa1fb788426e41ff05947b0df4e078",
          "run": "43290649461",
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
          "downloadMs": 1765,
          "openMs": 5293,
          "parseCleanupMs": 448
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
      "failure": null,
      "operationalReadiness": false,
      "completePackage": false,
      "PCoff": false,
      "globalNativeDrainVerified": false,
      "sdkNamespaceEmptyVerified": false
    }
  },
  {
    "name": "manifest.json",
    "bytes": 353,
    "sha256": "a7f49b62902e07d8dfdf2fdff1fdfb5eafa32a0d006ee40919c9f8e918cc5770",
    "crc32": "deb49584",
    "value": {
      "purpose": "afw.readonly-owner-reference-supplement-manifest.safe.v1",
      "inspectorSource": "d043c3b711fa1fb788426e41ff05947b0df4e078",
      "inspectorRun": "43290649461",
      "attempt": 1,
      "files": [
        {
          "path": "result.json",
          "bytes": 14452,
          "sha256": "8bfb03dc0e4c16188ea61ea7116b6f74209aaf002b6ede4a6c4b326e658648d3"
        }
      ]
    }
  }
]
```

## Closed verifier records

```json
[
  {
    "marker": "INSPECTION_PAIR_CONTROLS",
    "expected": 16,
    "completed": 16,
    "pass": 16,
    "fail": 0,
    "inventory": [
      {
        "id": "observed_pass",
        "status": "passed"
      },
      {
        "id": "observed_failure",
        "status": "passed"
      },
      {
        "id": "observed_skip_todo",
        "status": "passed"
      },
      {
        "id": "result_source",
        "status": "passed"
      },
      {
        "id": "result_run",
        "status": "passed"
      },
      {
        "id": "manifest_source",
        "status": "passed"
      },
      {
        "id": "manifest_run",
        "status": "passed"
      },
      {
        "id": "foreign_pair",
        "status": "passed"
      },
      {
        "id": "fixture_count",
        "status": "passed"
      },
      {
        "id": "unexamined",
        "status": "passed"
      },
      {
        "id": "two_records",
        "status": "passed"
      },
      {
        "id": "unknown_case",
        "status": "passed"
      },
      {
        "id": "wrapper_only",
        "status": "passed"
      },
      {
        "id": "manifest_bytes",
        "status": "passed"
      },
      {
        "id": "manifest_digest",
        "status": "passed"
      },
      {
        "id": "case_order",
        "status": "passed"
      }
    ],
    "firstFailure": null
  },
  {
    "marker": "SAFE_ZIP_CONTROLS",
    "expected": 16,
    "completed": 16,
    "pass": 16,
    "fail": 0,
    "inventory": [
      {
        "id": "validator_capture_after_success",
        "status": "passed"
      },
      {
        "id": "validator_rejection_identity_no_capture",
        "status": "passed"
      },
      {
        "id": "zip_valid_store_crc_vector",
        "status": "passed"
      },
      {
        "id": "zip_valid_deflate",
        "status": "passed"
      },
      {
        "id": "zip_signed_unsigned_descriptors",
        "status": "passed"
      },
      {
        "id": "zip_wrong_size",
        "status": "passed"
      },
      {
        "id": "zip_wrong_upload_sha",
        "status": "passed"
      },
      {
        "id": "zip_wrong_metadata_sha",
        "status": "passed"
      },
      {
        "id": "zip_extra_entry",
        "status": "passed"
      },
      {
        "id": "zip_duplicate_entry",
        "status": "passed"
      },
      {
        "id": "zip_traversal_entry",
        "status": "passed"
      },
      {
        "id": "zip_symlink",
        "status": "passed"
      },
      {
        "id": "zip_bad_crc",
        "status": "passed"
      },
      {
        "id": "zip_noncontiguous_ranges",
        "status": "passed"
      },
      {
        "id": "zip_declared_and_inflate_caps",
        "status": "passed"
      },
      {
        "id": "download_stream_redirect_auth_bounds",
        "status": "passed"
      }
    ],
    "failure": null
  },
  {
    "marker": "AFW_METADATA_READBACK/1",
    "source": "d043c3b711fa1fb788426e41ff05947b0df4e078",
    "run": "43290649461",
    "attempt": 1,
    "assignedArtifactId": "13976553433",
    "stage": "complete",
    "firstFailedPredicate": "none",
    "reason": "none",
    "httpStatus": 200,
    "receivedBytes": 776,
    "timeoutObserved": false,
    "verified": true
  },
  {
    "marker": "AFW_SAFE_READBACK/1",
    "kind": "supplement",
    "source": "d043c3b711fa1fb788426e41ff05947b0df4e078",
    "run": "43290649461",
    "attempt": 1,
    "artifactId": "13976553433",
    "coreSha256": "d514b1906a8ab6bde818a1aba6f99a9f1a3ee91814f88b28560013d23f657246",
    "verifierSha256": "204f829009b1fabe3d241b536e97354e086b08c31b63d9bc5caf8ae0832e8a22",
    "safeZipModuleSha256": "b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d",
    "producerCoreVerified": true,
    "sourceCoreVerified": true,
    "safeControlsPass": true,
    "metadataVerified": true,
    "rawZipVerified": true,
    "inventoryVerified": true,
    "producerControlCount": null,
    "supplementStatus": "partial",
    "zipBytes": 3014,
    "metadataZipBytes": 3014,
    "uploadDigest": "4888efcf52904abe8bd59a4e99172833cf98080e49e019bdec500a2b016a7e2f",
    "metadataDigest": "sha256:4888efcf52904abe8bd59a4e99172833cf98080e49e019bdec500a2b016a7e2f",
    "rawZipSha256": "4888efcf52904abe8bd59a4e99172833cf98080e49e019bdec500a2b016a7e2f",
    "resultBytes": 14452,
    "resultSha256": "8bfb03dc0e4c16188ea61ea7116b6f74209aaf002b6ede4a6c4b326e658648d3",
    "manifestBytes": 353,
    "manifestSha256": "a7f49b62902e07d8dfdf2fdff1fdfb5eafa32a0d006ee40919c9f8e918cc5770",
    "stage": "complete",
    "reason": "none",
    "operationalReadiness": false,
    "completePackage": false,
    "PCoff": false,
    "globalNativeDrainVerified": false,
    "sdkNamespaceEmptyVerified": false
  }
]
```

## Source closure

FinalSource2957681ebfe154b00bb586b8a53337e175ab5925/treeabd846b2af70bdef77b933629907b8f6f4cc801b/WFEXACTF7f7a71f1a0fa4f5ddf069ff411f008a098455e5cc126209B/reportb9aa8c5de388ccbc7039eb78b1fe61605fab08f7/331874chars. Rootfullbody/ref/tree3190leaves/3188protected/main0c9c475unchanged/5branchactivecounts0checked19:17:36Z. Workflowcomplete7manual/noinputs/nopush/all7false; executorSTOPPED, noSourceactionspending. No newprivateinspection/nativepermit. NextreadonlypublicSourceanalysis ofR2boundaryandR1validatorlimits; anycode/probe requiresnewconcreteplan/ruling/review/release. Allreadinessfalse.
