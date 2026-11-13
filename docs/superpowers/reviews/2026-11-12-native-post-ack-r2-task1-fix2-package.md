# Task1 fix round2/5 — I1 scoped code review, qualification incomplete

Read-only SCOPED rereview of remaining I1, plusnewbreakageinthisfixONLY. PriorreviewcodeFIX_BASE384b36d88984dddfbd4ea6c32fc0b79867974933→FIX_CODE_HEAD026d8f2aa67a3efa79f922d098ffce2d517fee69. Actualqualif91e3fb7c49496d655a515fa1e467da9fab700a71. CurrentFAILED/CLOSED68bad470670fabf6e77e7b458e42874ebd6142eb/tree08c0731328cbf9ab4eccb07223d7b90ad7e8cc36, Worldoriginalrestored perexplicitfailurepolicy. Reviewrecoverablefrozencode, don'tmislabelrollbackasintendedfix.

Brief docs/superpowers/briefs/2026-11-12-native-post-ack-r2-task1-fix2.md @589ea21defb8c8d25f8dc907bfb1a8427d4c01c3 embedsN8whole-helper→oracleordering; sourceGoalallNativeHELD. SourceReport docs/superpowers/reports/2026-11-07-finite-native-budget-qualification-task2.md @68bad470, readONLYappendafter569273chars(current584902), includedbelow. Actualcodecoveringcommand PUREpreflight incl5families/7ACTUALNodeownedhandoffs completedSUCCESS, butupload-readbackHTTP404preventedindependentartifactproof and24callbackregressionstages. No suiteorSource rerun permitted byreview. NoModelarchive/Native/privateevidencedownload.

## I1 open finding carried fromreview (verbatim substance)

The protected test awaits the whole helper before applying its predicates. In the candidate,the oracle can already have marked passed when a required cleanup callback rejects. The owner may promote that cleanup error to primary,exclude it from ancillary failures,and report complete:true if capture,disposal and archival succeed. The adapter can then swallow the helper rejection and verify provenance from that record. If both a predicate and cleanup would fail,the early oracle can also replace the error the original test would have received. The whole-case verdict must follow the helper’s settlement,with predicates applied only to its returned value. A pure regression should cover a passing inner result followed by a required cleanup rejection,checking original error identity and ineligible evidence.

N8: originalR2 = ONEwholelegacyhelperINCLUDINGrequiredoriginalcleanup THEN21oracle. Nooracle/whole-passinjectioninsidewithOwnerbeforeclose. Samehelpererrorwins; oracleonlyreturnedvalue. LaterADDEDevidencepreservesknownoriginaloutcome. Helperrejectafterinnerpassineligibleevenlegacycomplete:true. Businessprimaryfailure+separatelysuccessfulcleanupmaystilltruthfullyproducefailedoriginal+typedcert. No globallegacycloserefactor/additionalNative/exports/controlIDs.

C1,C2coverage,I2–I5,M1previouslyADDR remainoutofscopeunlessfixitselfbreaksthem. N1–N7constraints unchanged, no newScope orNativepermit.

## Actual failed qualification evidence

NEW43336838877/attempt1/push:producer131595029246FAILURE;verifier131595273354SKIPPED. Syntax/pins/Nodechecks/currentPUREmodelpreflight includingactualhandoff regressionsSUCCESS; MODELuploadSUCCESS.
MODELassigned13997192957/10700ZIPbytes/digestea1c3f978a31166dc208981cb74749fbf5e3167750657c8437361c9a3d4e2d72; uploader/APIagree, currenthead91e3/unexpired. Uploadfinalized00:25:07.641Z, nextreadstepfailed00:25:08.070Z curlHTTP404/exit22. ExistingstephasmetadataGET thenZIPGET; boundedlogdoesnotidentifywhichfailed. No cause/permissions/consistency/outagediagnosis proven. No rawZIP/readback/triplehash/callback24/Fgroups/puretests/SAFE/verifier qualification. This is NOTACTUALGREEN, no proof artifact exceptunreadMODELmetadata.
Sourceactorclosed/STOPno repair/retry/rerun. CurrentWorldoriginal, bothWFmanualfalse/F7protected/main0c9/3188oldprotected/3194leaves/0active accordingfullreadback.SourceRawmodel/private/Native bytes notdownloadedbyMCP.
TransportWFbodyUNCHANGEDinthisfix (onlyWorld/fixture/reportdiff). Don'tclaimHTTP404iscausedbyI1code; unknownindependentreadfailure.Rootwillseparatelyspecifyboundedreadobservabilityandretrieval ifneeded.SourcequalificationremainsincompleteevenifI1codeADDR.

## Complete fixdiff

- docs/superpowers/reports/2026-11-07-finite-native-budget-qualification-task2.md +556 -0 patchChars35712
- test/fixtures/finite-budget-world.mjs +76 -14 patchChars17894
- test/fixtures/finite-post-ack-diagnostic.mjs +25 -14 patchChars24972


### docs/superpowers/reports/2026-11-07-finite-native-budget-qualification-task2.md

~~~~~~~~~~~~diff
@@ -5518,3 +5518,559 @@ Frozen held-source inventory below; actual activation changes only contracts eve
 ```
 
 Not executed by this fix preparation: Source on PC, Native/SDKruntime/MF/I0, any key/CF/production/OAuth/customer action, PC-off, Native16 or Max. Source bodies are assembled/hashed as bounded data only; no clone/dependencies/build/temp Source files locally. Self-review covered integration seams, static branches, literal five+one inventory, exact2exports, N6 immutable-dir separation, actual MF/outcome hooks and three key bindings. This is implementer self-review, not independent CLEAN or Native permission.
+
+
+### Fix1 sole NEW qualification — ACTUAL GREEN, Native still HELD
+
+Implementation384b36d88984dddfbd4ea6c32fc0b79867974933/treec2148ed77d7b0b6dc969ef7241f29cf30923256b was exact full-file readback on all6paths/3194leaves/3188protected. Frozen activation4ceaeaf4f98c6595844f3e0c405cc9803bc98135/tree7f20b3398f908dff5a3d891851ac7dc3f9d6af76 changed ONLY contracts event/runlabel/two gates; active contracts21420B/blob3ea5891fce0f65aa744c0f22316bcdac1aeea686/SHA25659c5568742cab0ef1a3ce197d8598c507f80e62566724d8c7ca63b4dbf25f45c, other frozen hashes unchanged. Five active states0 before push. This is NEW run43331779408/attempt1/push at source4ceae, created2026-11-12T23:47:25Z, terminalSUCCESS2026-11-12T23:48:53Z. Producer131577995361 SUCCESS and independent verifier131578423619 SUCCESS; BOTH inspected. Old43325790437 was never rerun.
+
+Actual covering commands all succeeded: three node --check files; current-identity pure preflight; MODEL upload/uploader-API-rawZIP integrity and REAL-ID protected readback; AFW_POST_ACK_MODE=controls node --test --test-concurrency=1 test/finite-post-ack-diagnostic.test.mjs; AFW_BUDGET_CONTROL_PHASE=green node --experimental-vm-modules test/fixtures/finite-budget-world.mjs verify-native-preparation-round1 (unchanged45s); node --test --test-concurrency=1 --test-reporter=tap test/finite-budget-diagnostics.test.mjs test/mcp-qa-finite-observer.test.mjs; contracts-proof; SAFE upload; independent MODEL+SAFE triple-digest/path/CRC/UTF8/duplicate-key/EOF/bounds checks; verifyBudgetArtifact on the independently downloaded real model ID; verify-contracts binding current checkout pins and complete closed proof.
+
+Counts: exactly24named callbacks executed/completed/PASS,0FAIL, firstFailurenull, authentic post-final-assertion exactly-once witness true; ONE node:test wrapper PASS1/FAIL0/SKIP0/CANCEL0,1673.57598ms. Related unchanged F1–F8 eight/eight groups PASS (their reported group caseCount summaries are included below, not inflated into TAP test counts); separate named pure files TAP17PASS/0FAIL/0SKIP/0CANCEL,4170.470317ms. C2 pure oracle21predicate mutation families all rejected, protected test533dafb5 and oracle37ac0b66 pinned; original-success/evidence-failure, original/qualification same-object rejection, pre-MF unavailable and future-job rejection controls all passed. N7 absent/empty/unknown registration/env-access controls passed under profile_scope; no qualification was claimed for the inactive branch.
+
+MODEL artifact13993744947 afw-post-ack-model-43331779408-1: rawZIP10428B/SHA2567861542375b88249c32135ea45b2ac36fe4386b50ad4ba7c88e7106b4b476281, expires2026-11-19T23:48:04Z, expiredfalse at metadata read. Exactlymodel.json+protectedbudget-artifact.json, compressed+uncompressed<=4MiB and manifest<=65536 checked in BOTH runners. Exact model.json UTF8 SHA/preflightSha256a8d61903d245951975312b47a9f66a295d9df247024c560284bd8042436a0af3; protected manifest410B/SHAe86da6843e9b728cb952e22a7bee1f5915fbac66d5f71182dcd115b90fd684c7. Actual assigned-ID readback logged independently by both jobs. Builder/RootMCP did NOT download MODEL; metadata and SAFE receipt only. Sanitized model remains MODEL ONLY, never Native bundle prediction or runtime evidence.
+
+SAFE artifact13993764885 afw-post-ack-contracts-43331779408-1: rawZIP3972B/SHA256e4c80634a8fc33dca2e4d03bd1ad3fe8fad42a6489efeec71a49b23ac963c1ad, expires2026-11-19T23:48:18Z, expiredfalse at metadata read. Exactlyresult.json9696B/SHAecea96976c0ed0a75c5712fd3a18e56d99225a6c481123ecafea8ef877e58ac6 andmanifest.json391B/SHA9cd8e5292faa0797099790ce6e67a9a37778c6cce466ee18cb798701fa988a2b;10087Bcombined. Independent job verified uploader/API/rawZIP all3 and full current context/program/control/closed model data. Builder inspected only this allowed small SAFE ZIP in memory, verified its exact metadata digest/paths/bounds/CRC/UTF8/EOF and JSON; no filesystem download, Worker source, private Raw, key, cipher or Native producer logs. Transport download URLs are not copied into this report.
+
+Actual same-once-captured inputs/defines ORIGINAL408 vs candidate OFF: M2066727B/hash600290bcc20005eb6ec9c757d8640b9b85d28e7cd4e90dbf141064d3b38b7bbd,61records/0originalSYN; QA2726174B/hashcbc0a877b4561230ebee202dd4353c2784bae025367f6ed734ba0cd0fc3c6aad,115records/3originalSYN. OFF records also exactly matched ON pre-diagnostic records after unique role/path normalization. ON M unchanged; ON MODEL QA2730922B/hash377252d9d94f025736f05a9bcdd426514be89597cf0401921ce9742e6a24ba54. Exactly TWO QA emissions validated, stdin budgetSnapshot1 and phase entry1/notice1/protocol5/pair1/expected1/exit1/ACK1; emitted/literal/base hashes, closed fields/enums and Node-module absence are in exact SAFE proof below. SDK251149B/bb2b8524/44KVsites, lock36a8cd4b/SHA846c4d28, rawlib/F7 and protected original test pins unchanged. No actual Native graph hashes/provenance or original R2 outcome is asserted by this model/control result.
+
+Bounded actual closed job outputs (no private/raw logs):
+
+```json
+{
+  "producer": [
+    "BUDGET SAME ID READBACK VERIFIED {\"source\":\"4ceaeaf4f98c6595844f3e0c405cc9803bc98135\",\"run\":\"43331779408\",\"attempt\":\"1\",\"kind\":\"pure\",\"artifactId\":\"13993744947\",\"files\":2,\"manifestBytes\":410,\"manifestSha256\":\"e86da6843e9b728cb952e22a7bee1f5915fbac66d5f71182dcd115b90fd684c7\",\"operationalReadiness\":false,\"completePackage\":false,\"PCoff\":false}",
+    "# {\"purpose\":\"AFW_POST_ACK_CONTROLS/1\",\"expected\":24,\"completed\":24,\"pass\":24,\"fail\":0,\"inventory\":[\"off_graphs\",\"sdk_pins\",\"profile_scope\",\"sites_exact\",\"sealer_graph\",\"lexical_op\",\"one_shot\",\"nested_scope\",\"late_scope\",\"entry_check\",\"notice_guard\",\"protocol_guard\",\"pair_wait\",\"expected_mismatch\",\"exit_check\",\"unbranded\",\"same_error\",\"observer_throws\",\"same_effects\",\"pair_orders\",\"no_rejection\",\"overflow\",\"schema\",\"provenance\"],\"firstFailure\":null,\"postAssertionExactlyOnce\":true,\"operationalReadiness\":false,\"completePackage\":false,\"PCoff\":false,\"globalNativeDrainVerified\":false,\"sdkNamespaceEmptyVerified\":false,\"nativeExecuted\":false,\"mfAllocated\":false,\"I0Created\":false}",
+    "# tests 1",
+    "# pass 1",
+    "# fail 0",
+    "# cancelled 0",
+    "# skipped 0",
+    "# duration_ms 1673.57598",
+    "# tests 17",
+    "# pass 17",
+    "# fail 0",
+    "# cancelled 0",
+    "# skipped 0",
+    "# duration_ms 4170.470317"
+  ],
+  "verifier": [
+    "BUDGET SAME ID READBACK VERIFIED {\"source\":\"4ceaeaf4f98c6595844f3e0c405cc9803bc98135\",\"run\":\"43331779408\",\"attempt\":\"1\",\"kind\":\"pure\",\"artifactId\":\"13993744947\",\"files\":2,\"manifestBytes\":410,\"manifestSha256\":\"e86da6843e9b728cb952e22a7bee1f5915fbac66d5f71182dcd115b90fd684c7\",\"operationalReadiness\":false,\"completePackage\":false,\"PCoff\":false}",
+    "{\"purpose\":\"afw.post-ack-independent-verdict.safe.v1\",\"context\":{\"repository\":\"tokenizartinfo-ops/agent-friendly-web\",\"ref\":\"refs/heads/feat/finite-native-cleanup-20261101\",\"source\":\"4ceaeaf4f98c6595844f3e0c405cc9803bc98135\",\"run\":\"43331779408\",\"attempt\":1,\"case\":\"R2\"},\"nativeCertificate\":false,\"valid\":true,\"modelArtifactId\":\"13993744947\",\"modelSha256\":\"a8d61903d245951975312b47a9f66a295d9df247024c560284bd8042436a0af3\",\"operationalReadiness\":false,\"completePackage\":false,\"PCoff\":false}"
+  ]
+}
+```
+
+Exact downloaded SAFE data/proof inventory, for inspectable command coverage and source/model/program pins:
+
+```json
+{
+  "zipBytes": 3972,
+  "zipSha256": "e4c80634a8fc33dca2e4d03bd1ad3fe8fad42a6489efeec71a49b23ac963c1ad",
+  "files": [
+    {
+      "path": "manifest.json",
+      "bytes": 391,
+      "sha256": "9cd8e5292faa0797099790ce6e67a9a37778c6cce466ee18cb798701fa988a2b"
+    },
+    {
+      "path": "result.json",
+      "bytes": 9696,
+      "sha256": "ecea96976c0ed0a75c5712fd3a18e56d99225a6c481123ecafea8ef877e58ac6"
+    }
+  ],
+  "result": {
+    "purpose": "afw.post-ack-contracts.safe.v1",
+    "context": {
+      "repository": "tokenizartinfo-ops/agent-friendly-web",
+      "ref": "refs/heads/feat/finite-native-cleanup-20261101",
+      "source": "4ceaeaf4f98c6595844f3e0c405cc9803bc98135",
+      "run": "43331779408",
+      "attempt": 1,
+      "case": "R2"
+    },
+    "controls": {
+      "purpose": "AFW_POST_ACK_CONTROLS/1",
+      "expected": 24,
+      "completed": 24,
+      "pass": 24,
+      "fail": 0,
+      "inventory": [
+        "off_graphs",
+        "sdk_pins",
+        "profile_scope",
+        "sites_exact",
+        "sealer_graph",
+        "lexical_op",
+        "one_shot",
+        "nested_scope",
+        "late_scope",
+        "entry_check",
+        "notice_guard",
+        "protocol_guard",
+        "pair_wait",
+        "expected_mismatch",
+        "exit_check",
+        "unbranded",
+        "same_error",
+        "observer_throws",
+        "same_effects",
+        "pair_orders",
+        "no_rejection",
+        "overflow",
+        "schema",
+        "provenance"
+      ],
+      "firstFailure": null,
+      "postAssertionExactlyOnce": true,
+      "operationalReadiness": false,
+      "completePackage": false,
+      "PCoff": false,
+      "globalNativeDrainVerified": false,
+      "sdkNamespaceEmptyVerified": false,
+      "nativeExecuted": false,
+      "mfAllocated": false,
+      "I0Created": false
+    },
+    "programs": [
+      {
+        "path": "test/fixtures/finite-budget-world.mjs",
+        "bytes": 234909,
+        "sha256": "e80fad6e84c3a2ee9ec0d466a51c02a0c90d1afb3c1979a8fc332ea9d5e3ac39"
+      },
+      {
+        "path": "test/fixtures/finite-post-ack-diagnostic.mjs",
+        "bytes": 73508,
+        "sha256": "6d48912cc571517d0adccc3fc8e9f56e36049ede91f23f7e91a973d0521c9a35"
+      },
+      {
+        "path": "test/finite-post-ack-diagnostic.test.mjs",
+        "bytes": 1923,
+        "sha256": "cbe41b778c68e74516f9008061d27cdcdc6e8dcf212a93d8ddb24caf8079e462"
+      },
+      {
+        "path": ".github/workflows/afw-r2-post-ack-contracts.yml",
+        "bytes": 21420,
+        "sha256": "59c5568742cab0ef1a3ce197d8598c507f80e62566724d8c7ca63b4dbf25f45c"
+      },
+      {
+        "path": ".github/workflows/afw-r2-post-ack-diagnostic.yml",
+        "bytes": 30086,
+        "sha256": "da20759fd7be5e64f7f62164a0a58bc701b33c89d35175a746868eed56c38fb0"
+      },
+      {
+        "path": ".github/workflows/afw-finite-budget-qualification.yml",
+        "bytes": 126209,
+        "sha256": "1e7af2274e24c40db704f26baaacdb7f7ed1884903852e8237a35552aaed282a"
+      },
+      {
+        "path": "package-lock.json",
+        "bytes": 445991,
+        "sha256": "846c4d28819170cfd188ebf1e78fc19878c9aa97b41d73ce7710a6c0cd9ece34"
+      },
+      {
+        "path": "lib/mcp-qa-finite-owner-phase-context.mjs",
+        "bytes": 126504,
+        "sha256": "d97d07f69916c45f58af511a6dfb57322ed3fe7d8fa1f6fbb2220d44be15b921"
+      },
+      {
+        "path": "test/fixtures/finite-initial-entry-world.mjs",
+        "bytes": 87501,
+        "sha256": "0a1bcfa9721673386b08af45e4a24c33fa2db939d5edf021628d92590e883abb"
+      },
+      {
+        "path": "test/fixtures/finite-checkpoint-custody.mjs",
+        "bytes": 21159,
+        "sha256": "7751921bfaf10cd02dc777305d384d84ee7834f7bfbf2669dc60da50d7f1814f"
+      },
+      {
+        "path": "test/mcp-qa-finite-budget-native.test.mjs",
+        "bytes": 12749,
+        "sha256": "7194f50e3974076da519b1b99103d28537cc2d33813e8bf6eae83cf014d24948"
+      }
+    ],
+    "preflight": {
+      "purpose": "afw.post-ack-preflight.syn.v1",
+      "profile": "r2-post-ack-v1",
+      "stage": "MODEL ONLY",
+      "offGraphs": [
+        {
+          "role": "M",
+          "baselineBytes": 2066727,
+          "candidateBytes": 2066727,
+          "baselineSha256": "600290bcc20005eb6ec9c757d8640b9b85d28e7cd4e90dbf141064d3b38b7bbd",
+          "candidateSha256": "600290bcc20005eb6ec9c757d8640b9b85d28e7cd4e90dbf141064d3b38b7bbd",
+          "equal": true,
+          "sameCapturedInputs": true,
+          "sameDefines": true,
+          "onPreDiagnosticEqual": true,
+          "baselineRecordsSha256": "d435513e0a2c9bf627a9d44a251a119891445616faabd0206c0681b9f3a90f81",
+          "offRecordsSha256": "d435513e0a2c9bf627a9d44a251a119891445616faabd0206c0681b9f3a90f81",
+          "onPreDiagnosticRecordsSha256": "d435513e0a2c9bf627a9d44a251a119891445616faabd0206c0681b9f3a90f81",
+          "recordCount": 61,
+          "originalAdditionalSYN": 0
+        },
+        {
+          "role": "QA",
+          "baselineBytes": 2726174,
+          "candidateBytes": 2726174,
+          "baselineSha256": "cbc0a877b4561230ebee202dd4353c2784bae025367f6ed734ba0cd0fc3c6aad",
+          "candidateSha256": "cbc0a877b4561230ebee202dd4353c2784bae025367f6ed734ba0cd0fc3c6aad",
+          "equal": true,
+          "sameCapturedInputs": true,
+          "sameDefines": true,
+          "onPreDiagnosticEqual": true,
+          "baselineRecordsSha256": "c3ae0dbfef6012249d53681f4b6fcb9e00302df392a6eb9be2030d3677ef570f",
+          "offRecordsSha256": "c3ae0dbfef6012249d53681f4b6fcb9e00302df392a6eb9be2030d3677ef570f",
+          "onPreDiagnosticRecordsSha256": "c3ae0dbfef6012249d53681f4b6fcb9e00302df392a6eb9be2030d3677ef570f",
+          "recordCount": 115,
+          "originalAdditionalSYN": 3
+        }
+      ],
+      "supplement": {
+        "purpose": "afw.post-ack-supplement.syn.v1",
+        "profile": "r2-post-ack-v1",
+        "context": {
+          "repository": "tokenizartinfo-ops/agent-friendly-web",
+          "ref": "refs/heads/feat/finite-native-cleanup-20261101",
+          "source": "4ceaeaf4f98c6595844f3e0c405cc9803bc98135",
+          "run": "43331779408",
+          "attempt": 1,
+          "case": "R2"
+        },
+        "records": [
+          {
+            "purpose": "afw.post-ack-emission.syn.v1",
+            "version": 1,
+            "profile": "r2-post-ack-v1",
+            "path": "<stdin>",
+            "phase": "after-baseline",
+            "baselineBytes": 124640,
+            "baselineSha256": "3b6ada1b5083ef8fe283829845c477badd715496429708e3df3e0f311948a4fa",
+            "emittedBytes": 124768,
+            "emittedSha256": "c6456b0f5436150127d9d42644e05ff021499f3735acb7a6050da455b07287b6",
+            "transformLiteralSha256": "38fd9c021890c48872e95a693394bdcdfb75784f650b2f0ecbc4adca191c3ac5",
+            "sites": {
+              "budgetSnapshot": 1
+            },
+            "fields": [
+              "invocationOrdinal",
+              "operation",
+              "ackReturned",
+              "postAckEntered",
+              "outcome",
+              "boundary",
+              "sameError"
+            ],
+            "enums": [
+              "entry_check",
+              "notice_guard",
+              "protocol_invariant",
+              "pair_wait",
+              "expected_mismatch",
+              "exit_check",
+              "unknown"
+            ],
+            "businessAuthority": false,
+            "addsAwait": 0,
+            "addsPromise": 0,
+            "addsNativeCall": 0,
+            "changesRetention": false
+          },
+          {
+            "purpose": "afw.post-ack-emission.syn.v1",
+            "version": 1,
+            "profile": "r2-post-ack-v1",
+            "path": "lib/mcp-qa-finite-owner-phase-context.mjs",
+            "phase": "after-baseline",
+            "baselineBytes": 171207,
+            "baselineSha256": "65dea4c7ed9c2ac048a1be026ce55cefe3a91ceb3f338a2488a5d7cb633d1070",
+            "emittedBytes": 174438,
+            "emittedSha256": "3780fa1ac0abd40864c619bcad0c7f92f1ad774a2dbeb72084ba076a48854076",
+            "transformLiteralSha256": "266704f8de7172d713f6f31f545447341a490f5b97c4b07a0a1875115fe3b8b3",
+            "sites": {
+              "entry_check": 1,
+              "notice_guard": 1,
+              "protocol_invariant": 5,
+              "pair_wait": 1,
+              "expected_mismatch": 1,
+              "exit_check": 1,
+              "issuer_ack": 1
+            },
+            "fields": [
+              "invocationOrdinal",
+              "operation",
+              "ackReturned",
+              "postAckEntered",
+              "outcome",
+              "boundary",
+              "sameError"
+            ],
+            "enums": [
+              "entry_check",
+              "notice_guard",
+              "protocol_invariant",
+              "pair_wait",
+              "expected_mismatch",
+              "exit_check",
+              "unknown"
+            ],
+            "businessAuthority": false,
+            "addsAwait": 0,
+            "addsPromise": 0,
+            "addsNativeCall": 0,
+            "changesRetention": false
+          }
+        ],
+        "nodeModuleAbsent": true,
+        "businessAuthority": false
+      },
+      "modelGraphs": {
+        "QA": {
+          "bytes": 2730922,
+          "sha256": "377252d9d94f025736f05a9bcdd426514be89597cf0401921ce9742e6a24ba54"
+        },
+        "M": {
+          "bytes": 2066727,
+          "sha256": "600290bcc20005eb6ec9c757d8640b9b85d28e7cd4e90dbf141064d3b38b7bbd"
+        }
+      },
+      "privateCompileHashes": {
+        "phaseSha256": "65dea4c7ed9c2ac048a1be026ce55cefe3a91ceb3f338a2488a5d7cb633d1070",
+        "entrySha256": "3b6ada1b5083ef8fe283829845c477badd715496429708e3df3e0f311948a4fa",
+        "qaMetafileSha256": "bd7a1aefb08e59118fd0c94c51250c82773dd135a8449387bf13c6da53297221"
+      },
+      "sdkFileSha256": "bb2b85243221906d1705653a82678dab2f0020a14ef8faa7d86d764890610e80",
+      "sdkBytes": 251149,
+      "sdkSites": 44,
+      "lockBlob": "36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b",
+      "lockSha256": "846c4d28819170cfd188ebf1e78fc19878c9aa97b41d73ce7710a6c0cd9ece34",
+      "worldSha256": "e80fad6e84c3a2ee9ec0d466a51c02a0c90d1afb3c1979a8fc332ea9d5e3ac39",
+      "transformSha256": "6d48912cc571517d0adccc3fc8e9f56e36049ede91f23f7e91a973d0521c9a35",
+      "protectedTestBlob": "533dafb5df5f8e57442c5b9029dc8dec6dded434",
+      "oracleSha256": "37ac0b6658d7ec789247e5fb89521dacf585b7d818cefbfdc429b742a142775e",
+      "preflightSha256": "a8d61903d245951975312b47a9f66a295d9df247024c560284bd8042436a0af3"
+    },
+    "modelReceipt": {
+      "artifactId": "13993744947",
+      "uploaderDigest": "7861542375b88249c32135ea45b2ac36fe4386b50ad4ba7c88e7106b4b476281",
+      "apiDigest": "sha256:7861542375b88249c32135ea45b2ac36fe4386b50ad4ba7c88e7106b4b476281",
+      "rawZipSha256": "7861542375b88249c32135ea45b2ac36fe4386b50ad4ba7c88e7106b4b476281",
+      "modelSha256": "a8d61903d245951975312b47a9f66a295d9df247024c560284bd8042436a0af3",
+      "verified": true,
+      "context": {
+        "repository": "tokenizartinfo-ops/agent-friendly-web",
+        "ref": "refs/heads/feat/finite-native-cleanup-20261101",
+        "source": "4ceaeaf4f98c6595844f3e0c405cc9803bc98135",
+        "run": "43331779408",
+        "attempt": 1,
+        "case": "R2"
+      }
+    },
+    "oracle": {
+      "protectedTestBlob": "533dafb5df5f8e57442c5b9029dc8dec6dded434",
+      "assertionInventory": 21,
+      "negativeFamilies": 21,
+      "allRejected": true,
+      "oracleSha256": "37ac0b6658d7ec789247e5fb89521dacf585b7d818cefbfdc429b742a142775e",
+      "outcomeIsolation": {
+        "knownSuccessNormal": true,
+        "primaryRejectionSame": true,
+        "qualificationErrorSame": true,
+        "preMfUnavailable": true,
+        "futureJobStartRejected": true
+      }
+    },
+    "related": {
+      "purpose": "afw.closed-pure-controls.syn.v2",
+      "groups": [
+        {
+          "group": "F1",
+          "passed": true,
+          "evidence": {
+            "bytes": 904,
+            "sha256": "dcae1ea26b1b09c6f2eacc5fd66701bdb3c61d2ccd431281b3c5325827b0909f"
+          },
+          "caseCount": 2
+        },
+        {
+          "group": "F2",
+          "passed": true,
+          "evidence": {
+            "bytes": 3332,
+            "sha256": "dac450adc2e8566f01427d907b835f22a7e64301654f58a58cd9ef5557d12a21"
+          },
+          "caseCount": 1
+        },
+        {
+          "group": "F3",
+          "passed": true,
+          "evidence": {
+            "bytes": 5431,
+            "sha256": "5fad4492f2eec31e901c2d0a8c3715f0ff8a71bc08d4369280f3ceba6203153a"
+          },
+          "caseCount": 4
+        },
+        {
+          "group": "F4",
+          "passed": true,
+          "evidence": {
+            "bytes": 2528,
+            "sha256": "fde2eea49ef543f0d36347cda87d7035f10657716cc6cd418bff1fb4548bb33b"
+          },
+          "caseCount": 1
+        },
+        {
+          "group": "F5",
+          "passed": true,
+          "evidence": {
+            "bytes": 16524,
+            "sha256": "46246d9f7d0c795f5fd22ff5908df8e745be38f608298ae45ec0b891f51392d4"
+          },
+          "caseCount": 3
+        },
+        {
+          "group": "F6",
+          "passed": true,
+          "evidence": {
+            "bytes": 218,
+            "sha256": "0cf03851592354cf957c3248d37b1585d924dfc009b79704db924a8145070e5a"
+          },
+          "caseCount": 1
+        },
+        {
+          "group": "F7",
+          "passed": true,
+          "evidence": {
+            "bytes": 599,
+            "sha256": "7362a7cc15236bd1958794837bccc943ebf5ea87ef2f3db7c06b8d6382c08036"
+          },
+          "caseCount": 4
+        },
+        {
+          "group": "F8",
+          "passed": true,
+          "evidence": {
+            "bytes": 1532,
+            "sha256": "ac5c7c49185dc53cdd285c8e87294359d23d4fbcb31f60ba816c8fa2d3398d68"
+          },
+          "caseCount": 6
+        }
+      ],
+      "passed": true,
+      "pureTests": {
+        "tests": 17,
+        "pass": 17,
+        "fail": 0,
+        "skipped": 0,
+        "cancelled": 0,
+        "tapSha256": "28b4b0c9d01ddeac44bb577af0d4dcdc32cf09a994b819d63a47835fad480d72"
+      }
+    },
+    "operationalReadiness": false,
+    "completePackage": false,
+    "PCoff": false,
+    "globalNativeDrainVerified": false,
+    "sdkNamespaceEmptyVerified": false,
+    "nativeExecuted": false,
+    "mfAllocated": false,
+    "I0Created": false
+  },
+  "manifest": {
+    "purpose": "afw.native-post-ack-r2-manifest.safe.v1",
+    "context": {
+      "repository": "tokenizartinfo-ops/agent-friendly-web",
+      "ref": "refs/heads/feat/finite-native-cleanup-20261101",
+      "source": "4ceaeaf4f98c6595844f3e0c405cc9803bc98135",
+      "run": "43331779408",
+      "attempt": 1,
+      "case": "R2"
+    },
+    "files": [
+      {
+        "path": "result.json",
+        "bytes": 9696,
+        "sha256": "ecea96976c0ed0a75c5712fd3a18e56d99225a6c481123ecafea8ef877e58ac6"
+      }
+    ]
+  }
+}
+```
+
+After PASS closure target: retain fixed Worlddd93fc81dcefde271502626fdd5e02a0f9ab0a1a; fixturec71926a067a79168a4d30f80901fb76d308d06e7; testaaf4894d1b411a8ac59debb63ca9368e803141c5; Native8d5b04da0eff2890c70b8ef15a2f51a99c896810 remainsmanual/noinputs/nopush/twofalse; contracts restored EXACTheldfix1body1c4d054487e781157cf4fa633f9fc58a5a9cbbf5/manual/noinputs/nopush/twofalse; F7unchangedf7a71f1a0fa4f5ddf069ff411f008a098455e5cc/sevenfalse. Full report prefix/history preserved. Final post-CAS ref/tree/files/protected/main/five-state0 readback will be appended below. Fix1 permit consumed successfully; no further qualification/retry/Source code fix without a new scoped Root instruction. Independent scoped rereview still required. No Native, AFW key, MF/I0, SDK runtime, CF/production/OAuth/customer action, PC-off, Native16 or Max executed. All five readiness flags false; same-runner trust/synchronous overhead/pair call-boundary/model-only limitations remain. No known remaining scoped implementation concern was found by implementer self-review; this is not independent CLEAN or Native authorization.
+
+
+### Fix1 final closure readback — STOP for scoped independent rereview
+
+Closed Source8e244d36d779e8f150f742233bdc292fd82fbf0b/tree1edc50111192528d8a2104f521a33b15eaf244f9 verified by full nontruncated recursive readback:3194leaves, all3188protected leaves byte-exact. Full6files plus F7 independently re-read exact. Retained fixed Worlddd93fc81dcefde271502626fdd5e02a0f9ab0a1a/234903chars(234909UTF8B); fixturec71926a067a79168a4d30f80901fb76d308d06e7/73508B; testaaf4894d1b411a8ac59debb63ca9368e803141c5/1923B; contracts1c4d054487e781157cf4fa633f9fc58a5a9cbbf5/21318B manual/noinputs/nopush/twofalse; Native8d5b04da0eff2890c70b8ef15a2f51a99c896810/30086B manual/noinputs/nopush/twofalse; F7f7a71f1a0fa4f5ddf069ff411f008a098455e5cc/126209B unchanged/sevenfalse. Reportc3dd819c26e7583072c28c4eb8c0eb26c7c3bf44/566768chars at closure preserved ENTIRE531979char starting prefix, all original507875char history and all fix1 text/proof verbatim. This receipt appends only; its commit cannot self-contain its own final SHA.
+
+Main independently unchanged0c9c475b3ebaa970fc11d628b40e50a90cceb727. After closure all five repository active-state counts queued/in_progress/waiting/pending/requested=0. Qualification43331779408/attempt1 terminalSUCCESS, producer131577995361 and verifier131578423619 bothSUCCESS; no re-run/retry/secondfix1run. MODEL13993744947 and SAFE13993764885 metadata remain current/unexpired with exact source4ceae/run43331779408 and digests/expiry recorded above. Only allowed SMALLSAFE was inspected as data in memory; model/cipher/rawNative not downloaded. No local Source execution or files were created; task-owned authored/hash buffers are released after receipt publication. Final receipt commit is REPORT ONLY and receives another full ref/tree/files/main/five-state0 readback before parent reply.
+
+StatusDONE for this fix round's scoped implementation and one KEYLESS qualification. C1/C2/I1–I5 have covering current-code controls and actual cloud outputs above; M1 normalization naturally included. Independent scoped rereview is PENDING and is not replaced by this self-review. Native remains HELD: no fresh Root Native brief/permission, no actual R2/MF/I0/SDKruntime/AFWkey/CF/runtime/production/OAuth/customer/PCoff/Native16/Max claim. Known limitations remain model-only/source/build/configuration provenance, trusted same-runner step-scoped custody, synchronous timing overhead and pair_wait call boundary without underlying-cause attribution. No further work dispatched; STOP.
+
+
+## Native post-ACK R2 Task1 fix round2/5
+
+### N8 remaining-I1 candidate — before the sole NEW qualification
+
+Same original implementer, only I1 ordering/eligibility remains in scope. Binding brief bb324a1811d694c7b8d261fbcf9b019c00e9d068 atRootdocs589ea21defb8c8d25f8dc907bfb1a8427d4c01c3; N8 supersedes earlier ambiguous before-ownership whole-case verdict wording. Original R2 means ONE awaited legacy runBudgetReadonlyCase('R2') INCLUDING required cleanup/persistence, then the pinned21predicate oracle on its RETURNED value. Prior actual green43331779408 is preserved/consumed, not replayed. C1/C2predicatecoverage/I2–I5/M1/N6/N7 remain in force; no broad refactor or extra Native permission.
+
+Starting Source2910fcdc512497e54da286b477c8662be7721fcc/tree98e9d674eb3e38aa860da96d7341a61c10d2e3b5; full6files plus F7 re-read exact;3194leaves/nontruncated;3188protected; main0c9c475b3ebaa970fc11d628b40e50a90cceb727; queued/in_progress/waiting/pending/requested all0. Entire report7019adbabc91fa3ba802557581144ef0813d72e9/569273chars is preserved verbatim as this section's prefix. Local work remains bounded string/data hashing and read-only metadata; no Source import/eval/execution, clone/deps/build/temp Source files on the PC. Skills systematic-debugging/receiving-code-review reused; no subagent or independent review is claimed.
+
+Static causal RED analysis: old withFixedBudgetOwner hook ran the oracle/marked passed before close. A required original callback could set cleanupPrimary and throw; legacy close promotes that error, excludes equal primary from ancillary failures, and can persist complete:true. Old adapter then preserved earlypass/swallowed the helper rejection. If inner result also violated a predicate, earlyoracle could replace the cleanup error the protected test would actually receive. No separate new RED execution was authorized; the old green did not cover this edge. New actual-handoff regressions are authored for the sole fresh cloud qualification below.
+
+Candidate fix removes oracle/verdict/error injection from withFixedBudgetOwner entirely. Its only new observation there is nonauthoritative innerOperationReturned, without altering primary or original callback order. Shared private settlePostAckOriginal awaits the WHOLE helper callback before record/oracle; any original helper rejection wins by identity, oracleCalls stays0, and only normally returned whole-helper value reaches the exact unchanged21oracle. Shared finish preserves exact helper/oracle rejection; later ADDED evidence work is caught by the shared preservePostAckEvidence wrapper and cannot change known success/error. Precompletion unknown still unavailable. Actual Native adapter still has exactlyONE fixed runBudgetReadonlyCase('R2') call site and two fixed exported adapters only; no R1/R3/test-module import.
+
+Eligibility is independently conservative: postAckEvidenceEligible checks retained required callback/phase failure facts in the existing private error map (fixture_callback,registered_cleanup,release/restore/dispose/capture/terminal/archive/ownership/mount failures), closed record failure/rejected-phase/uncertainty facts, and helper rejection after inner return. It does NOT infer required-cleanup success merely from complete:true, ancillary counts, or whether failure equals primary. Business-primary rejection with independently successful cleanup remains eligible for a truthful failed-original diagnostic; failed-case certificates are not banned indiscriminately. Legacy close semantics themselves are unchanged.
+
+Root accepted the actual-control seam: private World preflight runs ACTUAL withFixedBudgetOwner/registerFixedOwnedCleanup/noteFixedBudgetOwnedFailure/close through the SAME private whole-helper settlement/oracle/error-priority routine as Native adapter. Five pure families cover seven owned Node handoffs, NO Miniflare/native handle/I0/SDK/native-R2 invocation: (1)valid inner plus requiredcleanup rejection; (2)oracle-invalid inner plus requiredcleanup rejection; (3)returned helper+oracle success then actual added ENOTDIR persistence failure through the shared evidence wrapper; (4)returned helper then same oracle-error object; (5)business primary with successful cleanup, distinct cleanup uncertainty, and SAME-primary-object cleanup rejection (legacycomplete:true but required-phase fact must make eligiblefalse). Assertions require callback once, oracle0 on all unreturned values, original error identity/priority, whole-case status and expected eligibility.
+
+The pure controls return the genuine synthetic R2-shaped value through legacy ownership/persistence, without boxing or changing original callbacks. The fixed runner-only legacy full-result path must be absent first; normally persisted synthetic results are copied to unique owned control directories, then only that owned result file is removed after exact hash verification, avoiding contamination of any later Native fixture. No pre-MF original scratch cleanup or global legacy cleanup behavior is changed/claimed. Synthetic progress premises are clearly local test data; actual owner records assert0 and MODEL flags mfAllocated/I0Created/nativeExecuted remainfalse.
+
+Five closed family facts are included in sanitized MODEL and strictly validated by existing schema/provenance control IDs and independent downloaded-MODEL binding. The old evidenceFailure-boolean-only mirror was removed. Private oracle still has all21 predicate mutation families; pre-MF/future-job controls stay. Minimal MODEL/projection schema addition is the only proof consequence; no new exports, control IDs, Node tests, Source paths, workflow bodies, permissions, secrets, budgets or Native calls. Test entry1923B, contracts held21318B and Native held30086B remain exact reviewed fix1 bytes; all gates held/F7sevenfalse throughout preparation.
+
+Covering commands for ONE NEW7+2 KEYLESSpush/attempt1 are unchanged: three node --check files; current pure preflight including actual Node handoffs; sanitized MODEL upload/real assigned-ID triple-digest+protected inventory readback; AFW_POST_ACK_MODE=controls node --test --test-concurrency=1 test/finite-post-ack-diagnostic.test.mjs (same24IDs/onewrapper); unchanged fixed F1–F8 at original45s;17 named pure diagnostics/observer tests; contracts-proof; exact2JSON SMALLSAFE upload; independent MODEL+SAFE/currentcheckout/command/provenance proof verification. Source qualification is required before scoped rereview; actual command outputs/run/job/artifact metadata and final readbacks will be appended after the sole terminal outcome, not invented here.
+
+Frozen held-file inventory:
+
+```json
+[
+  {
+    "path": "test/fixtures/finite-budget-world.mjs",
+    "chars": 242981,
+    "bytes": 242987,
+    "sha256": "007a4b39777dbd34645f7754556cfa1a9e152a0d2a6f55a27f6b1c30e334d867",
+    "blob": "0631f9a44cbb37bec3ed1a2c3dc09ee93b86661b"
+  },
+  {
+    "path": "test/fixtures/finite-post-ack-diagnostic.mjs",
+    "chars": 74686,
+    "bytes": 74686,
+    "sha256": "245aae72303df50d824215cd207fea0ff052b16d7af31f3a6463848ac23f8868",
+    "blob": "cdc1fdca6d614183a0383e4734d2ffcfdd5ac422"
+  },
+  {
+    "path": "test/finite-post-ack-diagnostic.test.mjs",
+    "chars": 1923,
+    "bytes": 1923,
+    "sha256": "cbe41b778c68e74516f9008061d27cdcdc6e8dcf212a93d8ddb24caf8079e462",
+    "blob": "aaf4894d1b411a8ac59debb63ca9368e803141c5"
+  },
+  {
+    "path": ".github/workflows/afw-r2-post-ack-contracts.yml",
+    "chars": 21318,
+    "bytes": 21318,
+    "sha256": "548a99f9c577ae5212016b5f4cc3c7899f4b6902af47a88802000f0f3a84264c",
+    "blob": "1c4d054487e781157cf4fa633f9fc58a5a9cbbf5"
+  },
+  {
+    "path": ".github/workflows/afw-r2-post-ack-diagnostic.yml",
+    "chars": 30086,
+    "bytes": 30086,
+    "sha256": "da20759fd7be5e64f7f62164a0a58bc701b33c89d35175a746868eed56c38fb0",
+    "blob": "8d5b04da0eff2890c70b8ef15a2f51a99c896810"
+  }
+]
+```
+
+Self-review checked unchanged legacy primary/callback order, whole-helper and required persistence before oracle, retained-phase gate including equal-primary hole, business-failure/cleanup-success allowance, actual added persistence failure instead of manual flag, exact private/shared routine usage, strict closed MODEL/schema binding and existing N1–N7 contracts. No known concrete blocker remains; this is not independent CLEAN. On any new run failure originalWorld is restored and allnewWFheld/protected/main/0activeSTOP; no hidden repair/retry. On pass retain fixed code, close allnewWF, fullreadbackSTOP. Native/AFWkey/MF/I0/SDKruntime/CF/production/OAuth/customer/PCoff/Native16/Max NOT EXECUTED; all readinessflagsfalse.
~~~~~~~~~~~~

### test/fixtures/finite-budget-world.mjs

~~~~~~~~~~~~diff
@@ -907,7 +907,7 @@ async function withFixedBudgetOwner(caseName,root,operation,{recovery=false}={})
  return fixedBudgetOwners.run(frame,async()=>{
   if(recovery){assertFixedBudgetAllocationSafe();const r=createFixedOwnedRecord(frame,'recovery');r.attachPersist(join('output','r2-native-'+(caseName==='P1'?'finite-budget-positive':'budget-'+caseName),'state'));}
   try{value=await operation();}catch(error){primary=noteFixedOwnedUnwind(frame,error);}
-  const diagnostic=postAckContexts.getStore();if(diagnostic?.native&&caseName==='R2'){recordPostAckOriginal(diagnostic,value,primary);primary=diagnostic.originalError??primary;}
+  const diagnostic=postAckContexts.getStore();if(diagnostic?.native&&caseName==='R2')diagnostic.innerOperationReturned=primary===null;
   const ownership=await closeFixedOwnedFrame(frame,primary);
   if(value&&typeof value==='object'){value.ownership=ownership;value.diagnostics??={};value.diagnostics.epochs=frame.records.flatMap(r=>r.epochs);if(value.caseName)await fixedBudgetPersist((caseName.startsWith('R')?'readonly/':'reduction/')+caseName,value);}
   return value;
@@ -1978,7 +1978,8 @@ export async function preflightPostAckDiagnostic(){
  const privateDir='output/finite-budget/post-ack-private',modelDir='output/finite-budget/post-ack-model';await mkdir(privateDir,{recursive:true});await mkdir(modelDir,{recursive:true});
  const phase=qa.baseline.find(r=>r.path==='lib/mcp-qa-finite-owner-phase-context.mjs').source,entry=qa.baseline.find(r=>r.path==='<stdin>').source,metafileBytes=Buffer.from(JSON.stringify(qa.metafile));
  await writeFile(join(privateDir,'phase-composed.mjs'),phase,{flag:'wx'});await writeFile(join(privateDir,'entry-composed.mjs'),entry,{flag:'wx'});await writeFile(join(privateDir,'qa-metafile.json'),metafileBytes,{flag:'wx'});
- const result={purpose:'afw.post-ack-preflight.syn.v1',profile:POST_ACK_PROFILE,context:current,stage:'MODEL ONLY',modelOnly:true,mfAllocated:false,I0Created:false,nativeExecuted:false,offGraphs,supplement,baselineInputs,privateCompileHashes:{phaseSha256:hash(phase),entrySha256:hash(entry),qaMetafileSha256:hash(metafileBytes)},originalWorldBlob:'5fb78c057b7e80260ae683abf4af892767ce110e',protectedTestBlob:'533dafb5df5f8e57442c5b9029dc8dec6dded434',oracleSha256:hash(qualifyPostAckOriginalR2.toString()),worldSha256:hash(world),transformSha256:hash(transformBytes),sdkFileSha256:hash(sdk),sdkBytes:sdk.length,sdkSites:44,lockBlob:'36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b',lockSha256:hash(lock),modelGraphs:Object.fromEntries([...diagnostic.graphs].map(([role,v])=>[role,{bytes:v.output.length,sha256:hash(v.output)}])),...Object.fromEntries(['operationalReadiness','completePackage','PCoff','globalNativeDrainVerified','sdkNamespaceEmptyVerified'].map(k=>[k,false]))};
+ const handoffControls=await runPostAckOwnerHandoffControls();
+ const result={handoffControls,purpose:'afw.post-ack-preflight.syn.v1',profile:POST_ACK_PROFILE,context:current,stage:'MODEL ONLY',modelOnly:true,mfAllocated:false,I0Created:false,nativeExecuted:false,offGraphs,supplement,baselineInputs,privateCompileHashes:{phaseSha256:hash(phase),entrySha256:hash(entry),qaMetafileSha256:hash(metafileBytes)},originalWorldBlob:'5fb78c057b7e80260ae683abf4af892767ce110e',protectedTestBlob:'533dafb5df5f8e57442c5b9029dc8dec6dded434',oracleSha256:hash(qualifyPostAckOriginalR2.toString()),worldSha256:hash(world),transformSha256:hash(transformBytes),sdkFileSha256:hash(sdk),sdkBytes:sdk.length,sdkSites:44,lockBlob:'36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b',lockSha256:hash(lock),modelGraphs:Object.fromEntries([...diagnostic.graphs].map(([role,v])=>[role,{bytes:v.output.length,sha256:hash(v.output)}])),...Object.fromEntries(['operationalReadiness','completePackage','PCoff','globalNativeDrainVerified','sdkNamespaceEmptyVerified'].map(k=>[k,false]))};
  await writeFile(join(modelDir,'model.json'),JSON.stringify(result),{flag:'wx'});await sealBudgetArtifact(modelDir,'pure');return result;
 }
 function assertPostAckHeadroom(t){
@@ -1998,15 +1999,77 @@ function qualifyPostAckOriginalR2(result){
  assert.equal(result.operationalReadiness,false);assert.equal(result.completePackage,false);assert.equal(result.PCoff,false);
  return result;
 }
-function recordPostAckOriginal(diagnostic,value,error){
- diagnostic.originalError=error??null;
- if(!diagnostic.mfAttached||!diagnostic.harnessReturned){diagnostic.originalR2Outcome='unavailable';return;}
- if(error){diagnostic.originalR2Outcome='failed';return;}
+function recordPostAckOriginal(diagnostic,value,error,rejected=error!==null){
+ diagnostic.helperReturned=!rejected;diagnostic.helperRejected=rejected;diagnostic.originalError=error;diagnostic.originalRejected=rejected;
+ if(rejected){diagnostic.originalR2Outcome=diagnostic.mfAttached&&diagnostic.harnessReturned?'failed':'unavailable';return;}
+ diagnostic.oracleCalls=(diagnostic.oracleCalls??0)+1;
  try{qualifyPostAckOriginalR2(value);diagnostic.originalR2Outcome='passed';}
- catch(qualificationError){diagnostic.originalError=qualificationError;diagnostic.originalR2Outcome='failed';}
+ catch(qualificationError){diagnostic.originalError=qualificationError;diagnostic.originalRejected=true;diagnostic.originalR2Outcome='failed';}
+}
+async function settlePostAckOriginal(diagnostic,invoke){
+ let value,helperError=null,helperRejected=false;
+ try{value=await invoke();}catch(error){helperError=error;helperRejected=true;}
+ recordPostAckOriginal(diagnostic,value,helperError,helperRejected);
+ return {value,helperError,helperRejected};
 }
 function finishPostAckOriginal(diagnostic){
- if(diagnostic.originalError)throw diagnostic.originalError;
+ if(diagnostic.originalRejected)throw diagnostic.originalError;
+}
+function postAckEvidenceEligible(diagnostic,ownership,helperError){
+ if(diagnostic.originalR2Outcome==='unavailable'||diagnostic.evidenceFailure||ownership?.complete!==true)return false;
+ const required=new Set(['fixture_callback','registered_cleanup','release','restore','dispose','capture_epoch','terminal_epoch','cold_archive','partial_archive','ownership_preservation','mount_provenance']);
+ const retained=helperError?fixedBudgetOwnerErrors.get(helperError):null;
+ if(retained?.phaseFacts?.some(fact=>required.has(fact.phase)))return false;
+ if(ownership.records.some(record=>record.disposalUncertain||record.failures.length>0||record.phases.some(phase=>phase.status==='rejected')))return false;
+ // A helper rejection after the operation returned can also be required final persistence.
+ if(diagnostic.helperRejected&&diagnostic.innerOperationReturned===true)return false;
+ return true;
+}
+async function preservePostAckEvidence(diagnostic,work){
+ try{await work();return true;}catch{diagnostic.evidenceFailure=true;return false;}
+}
+
+async function runPostAckOwnerHandoffControls(){
+ const root=join(process.env.RUNNER_TEMP,'afw-post-ack-owner-handoff-'+process.env.GITHUB_RUN_ID);await mkdir(root,{mode:0o700});
+ const legacyResult=resolve('output/finite-budget/readonly/R2/full-result.json');try{await readFile(legacyResult);assert.fail('pure handoff requires absent owned result');}catch(error){assert.equal(error.code,'ENOENT');}let lastPersistedHash=null;
+ const valid=()=>({caseName:'R2',facts:{completeWrites:1,completeNormal:1,input:{entries:201,correlations:1,expirationPreserved:true},foreignUnchanged:true,lists:2,gets:200,scopePeak:2,sdkReplay:0,nativeUnsettled:0,outwardPending:0,responseStatus:400,referenceRows:0,thirdListEntered:false,boundaryProof:{exactPrecedingPages:2,counter:2}},operationalReadiness:false,completePackage:false,PCoff:false});
+ async function handoff(name,{invalid=false,cleanupReject=false,businessReject=false,sharedPrimary=false,addedPersistenceReject=false}={}){
+  // Synthetic progress premises only; no Miniflare constructor, Native handle, I0 or SDK.
+  const diagnostic={native:true,mfAttached:true,harnessReturned:true,originalR2Outcome:'unavailable',originalError:null,oracleCalls:0},cleanupError=Error('SYN required cleanup'),businessError=Error('SYN business primary'),inner=valid();if(invalid)inner.facts.completeWrites=0;
+  let callbackCalls=0;
+  const settled=await settlePostAckOriginal(diagnostic,()=>postAckContexts.run(diagnostic,async()=>{
+   return await withFixedBudgetOwner('R2',join(root,name),async()=>{
+    registerFixedOwnedCleanup(async()=>{callbackCalls++;if(cleanupReject){const error=sharedPrimary?businessError:cleanupError;noteFixedBudgetOwnedFailure(error,'fixture_callback');throw error;}});
+    if(businessReject){noteFixedBudgetOwnedFailure(businessError,'producer_operation');throw businessError;}
+    return inner;
+   });
+  }));
+  const ownership=settled.value?.ownership??(settled.helperError?fixedBudgetOwnerErrors.get(settled.helperError)?.result:null);assert(ownership);assert.equal(callbackCalls,1);assert.equal(ownership.records.length,0);
+  if(!settled.helperRejected){const bytes=await readFile(legacyResult);await writeFile(join(root,name,'legacy-result.json'),bytes,{flag:'wx'});lastPersistedHash=hash(bytes);}
+  let addedRejected=false;
+  if(addedPersistenceReject){
+   const blocker=join(root,name,'blocked-parent');await writeFile(blocker,'SYN',{flag:'wx'});
+   addedRejected=!await preservePostAckEvidence(diagnostic,()=>writeFile(join(blocker,'child.json'),'SYN',{flag:'wx'}));assert.equal(addedRejected,true);
+  }
+  const eligible=postAckEvidenceEligible(diagnostic,ownership,settled.helperError);let outward=null;try{finishPostAckOriginal(diagnostic);}catch(error){outward=error;}
+  return {diagnostic,settled,ownership,cleanupError,businessError,outward,callbackCalls,eligible,addedRejected};
+ }
+ const goodCleanup=await handoff('valid-inner-cleanup-reject',{cleanupReject:true});assert.equal(goodCleanup.settled.helperError,goodCleanup.cleanupError);assert.equal(goodCleanup.outward,goodCleanup.cleanupError);assert.equal(goodCleanup.diagnostic.oracleCalls,0);assert.equal(goodCleanup.diagnostic.originalR2Outcome,'failed');assert.equal(goodCleanup.ownership.complete,true);assert.equal(goodCleanup.eligible,false);
+ const badCleanup=await handoff('invalid-inner-cleanup-reject',{invalid:true,cleanupReject:true});assert.equal(badCleanup.settled.helperError,badCleanup.cleanupError);assert.equal(badCleanup.outward,badCleanup.cleanupError);assert.equal(badCleanup.diagnostic.oracleCalls,0);assert.equal(badCleanup.ownership.complete,true);assert.equal(badCleanup.eligible,false);
+ const added=await handoff('success-added-persistence-reject',{addedPersistenceReject:true});assert.equal(added.settled.helperError,null);assert.equal(added.outward,null);assert.equal(added.diagnostic.originalR2Outcome,'passed');assert.equal(added.diagnostic.oracleCalls,1);assert.equal(added.eligible,false);
+ const oracle=await handoff('returned-oracle-reject',{invalid:true});assert.equal(oracle.settled.helperError,null);assert(oracle.diagnostic.originalError);assert.equal(oracle.outward,oracle.diagnostic.originalError);assert.equal(oracle.diagnostic.oracleCalls,1);assert.equal(oracle.diagnostic.originalR2Outcome,'failed');assert.equal(oracle.eligible,true);
+ const primary=await handoff('business-primary-cleanup-success',{businessReject:true});assert.equal(primary.outward,primary.businessError);assert.equal(primary.diagnostic.oracleCalls,0);assert.equal(primary.ownership.complete,true);assert.equal(primary.eligible,true);
+ const uncertain=await handoff('business-primary-cleanup-reject',{businessReject:true,cleanupReject:true});assert.equal(uncertain.outward,uncertain.businessError);assert.equal(uncertain.settled.helperError,uncertain.businessError);assert.equal(uncertain.diagnostic.oracleCalls,0);assert.equal(uncertain.ownership.complete,false);assert.equal(uncertain.eligible,false);
+ const samePrimary=await handoff('business-primary-same-cleanup-error',{businessReject:true,cleanupReject:true,sharedPrimary:true});assert.equal(samePrimary.outward,samePrimary.businessError);assert.equal(samePrimary.diagnostic.oracleCalls,0);assert.equal(samePrimary.ownership.complete,true);assert.equal(samePrimary.eligible,false);
+ assert(lastPersistedHash);assert.equal(hash(await readFile(legacyResult)),lastPersistedHash);await rm(legacyResult);
+ const fact=(value,sameError)=>({outcome:value.diagnostic.originalR2Outcome,sameError,oracleCalls:value.diagnostic.oracleCalls,legacyComplete:value.ownership.complete,eligible:value.eligible,callbackCalls:value.callbackCalls});
+ return {purpose:'afw.post-ack-owner-handoff-controls.syn.v1',variants:[
+  {name:'valid_inner_cleanup_reject',...fact(goodCleanup,goodCleanup.outward===goodCleanup.cleanupError)},
+  {name:'invalid_inner_cleanup_reject',...fact(badCleanup,badCleanup.outward===badCleanup.cleanupError)},
+  {name:'success_added_persistence_reject',...fact(added,added.outward===null),normalReturn:true,addedPersistenceRejected:true},
+  {name:'returned_oracle_reject',...fact(oracle,oracle.outward===oracle.diagnostic.originalError)},
+  {name:'business_primary_cleanup',successful:fact(primary,primary.outward===primary.businessError),uncertain:fact(uncertain,uncertain.outward===uncertain.businessError),samePrimary:fact(samePrimary,samePrimary.outward===samePrimary.businessError)}
+ ],families:5,wholeHelperBeforeOracle:true,actualOwnerHandoff:true,mfAllocated:false,I0Created:false,nativeExecuted:false,businessAuthority:false};
 }
 
 export async function runPostAckR2Diagnostic(){
@@ -2016,20 +2079,19 @@ export async function runPostAckR2Diagnostic(){
  const timing=JSON.parse(await readFile(join(process.env.RUNNER_TEMP,'afw-post-ack-job-time.json'),'utf8'));timing.observedMono=performance.now();timing.metadataAgeMs=Number((process.hrtime.bigint()-BigInt(timing.observedHrtime))/1000000n);
  const diagnostic={identity:postAckIdentity(),enabled:true,graphs:new Map(),native:true,timing,mfAttached:false,harnessReturned:false,originalR2Outcome:'unavailable',originalError:null};assertPostAckHeadroom(timing);
  let value,helperError=null;const group=process.env.AFW_BUDGET_GROUP;process.env.AFW_BUDGET_GROUP='readonly';
- try{value=await postAckContexts.run(diagnostic,()=>runBudgetReadonlyCase('R2'));}
- catch(error){helperError=error;if(diagnostic.originalR2Outcome==='unavailable')diagnostic.originalError??=error;}
+ try{({value,helperError}=await settlePostAckOriginal(diagnostic,()=>postAckContexts.run(diagnostic,()=>runBudgetReadonlyCase('R2'))));}
  finally{if(group===undefined)delete process.env.AFW_BUDGET_GROUP;else process.env.AFW_BUDGET_GROUP=group;}
- // Everything below is best-effort evidence. It cannot replace a positively recorded original outcome/error.
- try{
+ // Added evidence follows whole-helper settlement and oracle; it cannot replace either outcome/error.
+ await preservePostAckEvidence(diagnostic,async()=>{
   const ownership=value?.ownership??(helperError?fixedBudgetOwnerErrors.get(helperError)?.result:null),record=ownership?.records.find(r=>r.ordinal===diagnostic.allocation);let mountedProvenance=null;
   try{
-   assert(record&&diagnostic.harnessReturned&&ownership.complete&&record.disposed&&record.archived&&!record.disposalUncertain);assert.equal(record.terminalCapture,'captured');assert.deepEqual(record.graphs.map(r=>r.role).sort(),['M','QA']);
+   assert(postAckEvidenceEligible(diagnostic,ownership,helperError));assert(record&&diagnostic.harnessReturned&&record.disposed&&record.archived&&!record.disposalUncertain);assert.equal(record.terminalCapture,'captured');assert.deepEqual(record.graphs.map(r=>r.role).sort(),['M','QA']);
    const captured=diagnostic.graphs;for(const role of ['M','QA']){const built=captured.get(role);assert(built?.output);const configured=record.graphs.find(r=>r.role===role);assert(configured.mounted);assert.equal(configured.sha256,hash(built.output));assert.equal(configured.bytes,built.output.length);}
    assert(captured.get('QA').verifiedSupplement);mountedProvenance={status:'verified',context:diagnostic.identity,stage:'actual_configured',profile:POST_ACK_PROFILE,allocationIdentity:record.ordinal,ownedAllocationIdentity:diagnostic.allocation,lifecycleComplete:true,successfulMount:true,actualOptionsVerified:true,modelOnly:false,sdkFileSha256:preflight.sdkFileSha256,sdkBytes:preflight.sdkBytes,sdkSites:preflight.sdkSites,lockBlob:preflight.lockBlob,lockSha256:preflight.lockSha256,mGraphSha256:hash(captured.get('M').output),qaGraphSha256:hash(captured.get('QA').output),transformSha256:preflight.transformSha256,preflightSha256:hash(modelBytes),emissions:captured.get('QA').supplement.length};
   }catch{diagnostic.evidenceFailure=true;}
   const snapshots=(record?.epochs??[]).filter(v=>v.role==='QA'&&v.reason==='terminal-owned-before-dispose').map(v=>({role:v.role,reason:v.reason,allocationIdentity:record.ordinal,snapshot:v.snapshot.postAckDiagnostic}));
   let observation;try{observation=selectPostAckCertificate({snapshots,mountedProvenance,originalR2Outcome:diagnostic.originalR2Outcome,context:diagnostic.identity});}catch{diagnostic.evidenceFailure=true;observation=selectPostAckCertificate({snapshots:[],mountedProvenance:null,originalR2Outcome:diagnostic.originalR2Outcome,context:diagnostic.identity});}
   const privateDir='output/finite-budget/post-ack-private';await mkdir(privateDir,{recursive:true});await writeFile(join(privateDir,'observation.json'),JSON.stringify(observation));await writeFile(join(privateDir,'job-manifest.json'),JSON.stringify({purpose:'afw.post-ack-private-job.syn.v1',context:diagnostic.identity,cases:['R2'],diagnosticOnly:true,originalR2Outcome:diagnostic.originalR2Outcome,kind:diagnostic.originalR2Outcome==='passed'?'readonly-result':'consumer-failure',preallocationBlocked:!diagnostic.mfAttached,mfAttached:diagnostic.mfAttached,persistAttached:diagnostic.persistAttached===true,preMfScratchDeletionVerified:false,operationalReadiness:false}));
- }catch{diagnostic.evidenceFailure=true;}
+ });
  finishPostAckOriginal(diagnostic);
 }
~~~~~~~~~~~~

### test/fixtures/finite-post-ack-diagnostic.mjs

~~~~~~~~~~~~diff
@@ -156,7 +156,7 @@ async function controlInputs(){
  const prelude=a.statements.filter(n=>ts.isVariableStatement(n)&&n.declarationList.declarations.some(d=>['__paIdentity','__paCollector'].includes(d.name.getText(a)))||ts.isFunctionDeclaration(n)&&['__paInvalid','__paBegin','__paBrand','__paEmit','__afwPostAckSnapshot'].includes(n.name?.text)).map(n=>n.getText(a).replace(/^export /,'')).join('\n');
  const preflight=JSON.parse(await readFile('output/finite-budget/post-ack-model/model.json','utf8'));
  const rawAst=ast(source,PHASE),rawFunctions=[];const rawVisit=n=>{if(ts.isFunctionDeclaration(n)&&n.name?.text==='issuerCall')rawFunctions.push(n);ts.forEachChild(n,rawVisit);};rawVisit(rawAst);assert.equal(rawFunctions.length,1);const rawIssuer=rawFunctions[0],rawRecheck=rawIssuer.parent.statements.find(n=>ts.isFunctionDeclaration(n)&&n.name?.text==='recheckOwned'&&n.body.getText(rawAst).includes('requireEmptyNotice(expected)'));assert(rawRecheck);
- assert.equal(sha(source),preflight.privateCompileHashes.phaseSha256);const oracleProof=oracleControls(await readFile('test/fixtures/finite-budget-world.mjs','utf8'));cachedControlInputs={source,transformed,prelude,oracleProof,recheck:recheck.getText(a),issuer:issuer.getText(a),originalRecheck:rawRecheck.getText(rawAst),originalIssuer:rawIssuer.getText(rawAst),preflight};return cachedControlInputs;
+ assert.equal(sha(source),preflight.privateCompileHashes.phaseSha256);const oracleProof=oracleControls(await readFile('test/fixtures/finite-budget-world.mjs','utf8'),preflight.handoffControls);cachedControlInputs={source,transformed,prelude,oracleProof,recheck:recheck.getText(a),issuer:issuer.getText(a),originalRecheck:rawRecheck.getText(rawAst),originalIssuer:rawIssuer.getText(rawAst),preflight};return cachedControlInputs;
 }
 async function simulate(mode='ok',operations=['grant'],original=false){
  const {prelude,recheck,issuer,originalRecheck,originalIssuer}=await controlInputs(),primary=Error('SYN original local object'),effects=[],settings={mode,operations},context=createContext({settings,primary,effects,structuredClone,Promise,Error,JSON,Map,Set,queueMicrotask,assert,Miniflare:class{constructor(){throw Error('allocation forbidden');}},createI0(){throw Error('I0 forbidden');}});
@@ -174,19 +174,17 @@ async function executeControlRegistry(registry,progress={completed:0,pass:0,firs
  try{for(const [id,callback]of registry){activeControl={id,run,issued:false};try{const token=await callback(),witness=tokens.get(token);assert(activeControl.issued&&witness?.id===id&&witness.run===run,'callback-owned post-final-assertion witness');rows.push({id,token});progress.pass++;}catch(error){progress.firstFailure=id;throw error;}finally{progress.completed++;}}completionBarrier(rows,run);return rows.length;}
  finally{activeControl=parent;}
 }
-function oracleControls(worldSource){
+function oracleControls(worldSource,handoff){
+ validateHandoffControls(handoff);
  const a=ast(worldSource,'fixed-current-world-oracle'),matches=a.statements.filter(n=>ts.isFunctionDeclaration(n)&&n.name?.text==='qualifyPostAckOriginalR2');assert.equal(matches.length,1);
  const body=matches[0].getText(a),context=createContext({assert,postAckIdentity:syntheticContext,performance:{now:()=>0}}),good={caseName:'R2',facts:{completeWrites:1,completeNormal:1,input:{entries:201,correlations:1,expirationPreserved:true},foreignUnchanged:true,lists:2,gets:200,scopePeak:2,sdkReplay:0,nativeUnsettled:0,outwardPending:0,responseStatus:400,referenceRows:0,thirdListEntered:false,boundaryProof:{exactPrecedingPages:2,counter:2}},operationalReadiness:false,completePackage:false,PCoff:false};
  const helpers=['recordPostAckOriginal','finishPostAckOriginal','assertPostAckHeadroom'].map(name=>{const n=a.statements.find(n=>ts.isFunctionDeclaration(n)&&n.name?.text===name);assert(n);return n.getText(a);}).join('\n');
  new Script(body+';'+helpers+';globalThis.oracle=qualifyPostAckOriginalR2;globalThis.capture=recordPostAckOriginal;globalThis.finish=finishPostAckOriginal;globalThis.headroom=assertPostAckHeadroom;').runInContext(context,{timeout:1000});assert.equal(context.oracle(good),good);
  const mutations=[v=>v.caseName='R1',v=>v.facts.completeWrites=0,v=>v.facts.completeNormal=0,v=>v.facts.input.entries=200,v=>v.facts.input.correlations=0,v=>v.facts.input.expirationPreserved=false,v=>v.facts.foreignUnchanged=false,v=>v.facts.lists=3,v=>v.facts.gets=201,v=>v.facts.scopePeak=3,v=>v.facts.sdkReplay=1,v=>v.facts.nativeUnsettled=1,v=>v.facts.outwardPending=1,v=>v.facts.responseStatus=302,v=>v.facts.referenceRows=1,v=>v.facts.thirdListEntered=true,v=>v.facts.boundaryProof.exactPrecedingPages=1,v=>v.facts.boundaryProof.counter=1,v=>v.operationalReadiness=true,v=>v.completePackage=true,v=>v.PCoff=true];
  for(const mutate of mutations){const bad=structuredClone(good);mutate(bad);assert.throws(()=>context.oracle(bad));}
- const success={mfAttached:true,harnessReturned:true};context.capture(success,good,null);assert.equal(success.originalR2Outcome,'passed');success.evidenceFailure=true;success.disposed=false;assert.doesNotThrow(()=>context.finish(success));
- const original=Error('SYN exact original rejection'),failure={mfAttached:true,harnessReturned:true};context.capture(failure,null,original);failure.evidenceFailure=true;assert.equal(failure.originalR2Outcome,'failed');assert.throws(()=>context.finish(failure),e=>e===original);
- const bad=structuredClone(good);bad.facts.completeWrites=0;const qualification={mfAttached:true,harnessReturned:true};context.capture(qualification,bad,null);const qualificationError=qualification.originalError;assert(qualificationError);assert.throws(()=>context.finish(qualification),e=>e===qualificationError);
- const blocked={mfAttached:false,harnessReturned:false,persistAttached:true};context.capture(blocked,null,original);assert.equal(blocked.originalR2Outcome,'unavailable');assert.throws(()=>context.finish(blocked),e=>e===original);assert.equal(nativeSealEligible({mfAttached:false,preallocationBlocked:true}),false);
+ const original=Error('SYN diagnostic pre-MF refusal'),blocked={mfAttached:false,harnessReturned:false,persistAttached:true};context.capture(blocked,null,original,true);assert.equal(blocked.originalR2Outcome,'unavailable');assert.throws(()=>context.finish(blocked),error=>error===original);assert.equal(nativeSealEligible({mfAttached:false,preallocationBlocked:true}),false);
  const now=Date.now(),timing={job:'native',timeoutMinutes:7,context:syntheticContext(),startedAt:now-1000,responseDate:now,requestElapsed:1,metadataAgeMs:0,observedMono:0};context.headroom(timing);assert.throws(()=>context.headroom({...timing,startedAt:now+1}));
- return {protectedTestBlob:'533dafb5df5f8e57442c5b9029dc8dec6dded434',assertionInventory:21,negativeFamilies:mutations.length,allRejected:true,oracleSha256:sha(body),outcomeIsolation:{knownSuccessNormal:true,primaryRejectionSame:true,qualificationErrorSame:true,preMfUnavailable:true,futureJobStartRejected:true}};
+ return {protectedTestBlob:'533dafb5df5f8e57442c5b9029dc8dec6dded434',assertionInventory:21,negativeFamilies:mutations.length,allRejected:true,oracleSha256:sha(body),outcomeIsolation:{knownSuccessNormal:handoff.variants[2].normalReturn,primaryRejectionSame:handoff.variants[4].successful.sameError&&handoff.variants[4].uncertain.sameError&&handoff.variants[4].samePrimary.sameError,qualificationErrorSame:handoff.variants[3].sameError,preMfUnavailable:true,futureJobStartRejected:true}};
 }
 const REGISTRY=Object.freeze([
  ['off_graphs',async()=>{const {preflight:p}=await controlInputs();const checked=await checkedModel();assert.deepEqual(checked.model,p);validateOffGraphs(p.offGraphs);assert.equal(p.stage,'MODEL ONLY');assert.equal(p.offGraphs.length,2);for(const r of p.offGraphs){assert(r.equal&&r.sameCapturedInputs&&r.sameDefines);assert.equal(r.baselineSha256,r.candidateSha256);assert.equal(r.baselineBytes,r.candidateBytes);}assert.equal(p.offGraphs.find(r=>r.role==='QA').originalAdditionalSYN,3);assert.equal(p.mfAllocated,false);assert.equal(p.I0Created,false);return complete('off_graphs');}],
@@ -250,10 +248,10 @@ const REGISTRY=Object.freeze([
  }],
  ['overflow',async()=>{const s=await simulate('ok',Array.from({length:33},()=> 'grant'));assert.equal(s.snapshot.overflow,true);assert.equal(selectSynthetic(s.snapshot).status,'invalid');const r=await simulate('expected_mismatch');const bad=structuredClone(r.snapshot);bad.records.push({...bad.records[0],invocationOrdinal:2});bad.invoked=2;bad.completed=2;assert.equal(selectSynthetic(bad).status,'invalid');return complete('overflow');}],
  ['schema',async()=>{const c=syntheticContext(),v={purpose:PURPOSE,status:'observed',context:c,provenance:{status:'verified',sdkPackage:'@cloudflare/workers-oauth-provider@1.2.1',sdkFileSha256:'0'.repeat(64),lockSha256:'0'.repeat(64),mGraphSha256:'0'.repeat(64),qaGraphSha256:'0'.repeat(64),transformSha256:'0'.repeat(64),preflightSha256:'0'.repeat(64)},selection:'unique_qualified_rejection',invocationOrdinal:1,operation:'grant',ackReturned:true,postAckEntered:true,outcome:'rejected',boundary:'expected_mismatch',quality:'qualified',originalR2Outcome:'failed',custody:unavailableCustody(),...Object.fromEntries(FLAGS.map(k=>[k,false]))};validatePostAckResult(v,c);const bytes=JSON.stringify(observationProjection(v));assert.equal(Buffer.byteLength(bytes),1221);assert.equal(sha(bytes),'47a77ac116e8d5514defb5fa615de87bf01e16968d30254a8754f389be59a005');assert.equal(observationHash(Object.fromEntries(Object.entries(v).reverse())),sha(bytes));for(const key of FLAGS)assert.throws(()=>validatePostAckResult({...v,[key]:true},c));assert.throws(()=>validatePostAckResult({...v,extra:true},c));assert.notEqual(observationHash({...v,originalR2Outcome:'passed'}),sha(bytes));assert.notEqual(observationHash({...v,context:{...c,run:'2'}}),sha(bytes));assert.notEqual(observationHash({...v,provenance:{...v.provenance,preflightSha256:'f'.repeat(64)}}),sha(bytes));const record={purpose:'AFW_POST_ACK_CONTROLS/1',expected:24,completed:24,pass:24,fail:0,inventory:[...IDS],firstFailure:null,postAssertionExactlyOnce:true,...Object.fromEntries(FLAGS.map(k=>[k,false])),nativeExecuted:false,mfAllocated:false,I0Created:false};validateControlRecord(record);for(const key of [...FLAGS,'nativeExecuted','mfAllocated','I0Created'])assert.throws(()=>validateControlRecord({...record,[key]:true}));assert.throws(()=>validateControlRecord({...record,inventory:IDS.slice(1)}));
- const {preflight:model}=await controlInputs();validateModelShape(model,model.context);for(const mutate of [m=>m.offGraphs=[],m=>m.offGraphs[1].role='M',m=>m.offGraphs[0].onPreDiagnosticEqual=false,m=>m.supplement.records[0].fields=[],m=>m.supplement.records[0].version=2,m=>m.supplement.records[0].transformLiteralSha256='f'.repeat(64),m=>m.modelGraphs.M.sha256='f'.repeat(64),m=>m.nativeExecuted=true,m=>m.privateCompileHashes.phaseSha256='f'.repeat(64)]){const bad=structuredClone(model);mutate(bad);assert.throws(()=>validateModelShape(bad,model.context));}
- const checked=await checkedModel(),programs=await currentPrograms(),formatProof={purpose:'afw.post-ack-contracts.safe.v1',context:model.context,controls:record,programs,preflight:modelProjection(checked.model,checked.sha256),modelReceipt:checked.receipt,oracle:oracleControls(await readFile('test/fixtures/finite-budget-world.mjs','utf8')),related:{purpose:'afw.closed-pure-controls.syn.v2',groups:['F1','F2','F3','F4','F5','F6','F7','F8'].map(group=>({group,passed:true,evidence:{bytes:1,sha256:'0'.repeat(64)},caseCount:1})),passed:true,pureTests:{tests:1,pass:1,fail:0,skipped:0,cancelled:0,tapSha256:'0'.repeat(64)}},...Object.fromEntries(FLAGS.map(k=>[k,false])),nativeExecuted:false,mfAllocated:false,I0Created:false};
+ const {preflight:model}=await controlInputs();validateModelShape(model,model.context);for(const mutate of [m=>m.handoffControls.variants[0].oracleCalls=1,m=>m.handoffControls.variants[4].samePrimary.eligible=true,m=>m.offGraphs=[],m=>m.offGraphs[1].role='M',m=>m.offGraphs[0].onPreDiagnosticEqual=false,m=>m.supplement.records[0].fields=[],m=>m.supplement.records[0].version=2,m=>m.supplement.records[0].transformLiteralSha256='f'.repeat(64),m=>m.modelGraphs.M.sha256='f'.repeat(64),m=>m.nativeExecuted=true,m=>m.privateCompileHashes.phaseSha256='f'.repeat(64)]){const bad=structuredClone(model);mutate(bad);assert.throws(()=>validateModelShape(bad,model.context));}
+ const checked=await checkedModel(),programs=await currentPrograms(),formatProof={purpose:'afw.post-ack-contracts.safe.v1',context:model.context,controls:record,programs,preflight:modelProjection(checked.model,checked.sha256),modelReceipt:checked.receipt,oracle:oracleControls(await readFile('test/fixtures/finite-budget-world.mjs','utf8'),checked.model.handoffControls),related:{purpose:'afw.closed-pure-controls.syn.v2',groups:['F1','F2','F3','F4','F5','F6','F7','F8'].map(group=>({group,passed:true,evidence:{bytes:1,sha256:'0'.repeat(64)},caseCount:1})),passed:true,pureTests:{tests:1,pass:1,fail:0,skipped:0,cancelled:0,tapSha256:'0'.repeat(64)}},...Object.fromEntries(FLAGS.map(k=>[k,false])),nativeExecuted:false,mfAllocated:false,I0Created:false};
  validateContractsProof(formatProof,model.context,programs,checked);
- for(const mutate of [p=>p.preflight.offGraphs=[],p=>p.preflight.offGraphs[1].role='M',p=>p.preflight.modelGraphs.QA.sha256='f'.repeat(64),p=>p.preflight.preflightSha256='f'.repeat(64),p=>p.modelReceipt.artifactId='999',p=>p.modelReceipt.uploaderDigest='f'.repeat(64),p=>p.controls.nativeExecuted=true,p=>p.controls.PCoff=true,p=>p.preflight.supplement.records[0].fields=[],p=>p.programs.pop()]){const bad=structuredClone(formatProof);mutate(bad);assert.throws(()=>validateContractsProof(bad,model.context,programs,checked));}
+ for(const mutate of [p=>p.preflight.handoffControls.variants[0].eligible=true,p=>p.preflight.offGraphs=[],p=>p.preflight.offGraphs[1].role='M',p=>p.preflight.modelGraphs.QA.sha256='f'.repeat(64),p=>p.preflight.preflightSha256='f'.repeat(64),p=>p.modelReceipt.artifactId='999',p=>p.modelReceipt.uploaderDigest='f'.repeat(64),p=>p.controls.nativeExecuted=true,p=>p.controls.PCoff=true,p=>p.preflight.supplement.records[0].fields=[],p=>p.programs.pop()]){const bad=structuredClone(formatProof);mutate(bad);assert.throws(()=>validateContractsProof(bad,model.context,programs,checked));}
  return complete('schema');}],
  ['provenance',async()=>{const {oracleProof}=await controlInputs();assert.equal(oracleProof.negativeFamilies,21);assert.equal(oracleProof.allRejected,true);const s=await simulate('expected_mismatch'),c=syntheticContext(),p=syntheticProvenance(c);for(const edit of [{stage:'MODEL ONLY'},{modelOnly:true},{actualOptionsVerified:false},{lifecycleComplete:false},{successfulMount:false},{ownedAllocationIdentity:2},{emissions:1},{sdkSites:43},{sdkFileSha256:'f'.repeat(64)},{context:{...c,run:'2'}},{context:{...c,source:'f'.repeat(40)}}])assert.equal(selectSynthetic(s.snapshot,{mountedProvenance:{...p,...edit}}).status,'invalid');const pass=selectSynthetic(s.snapshot,{originalR2Outcome:'passed'});assert.equal(pass.originalR2Outcome,'passed');assert.equal(pass.custody.status,'unavailable');assert.throws(()=>validatePostAckResult({...pass,custody:{status:'verified',artifactId:'1',zipSha256:'0'.repeat(64),observationSha256:'f'.repeat(64),reopenVerified:true}},c));return complete('provenance');}]
 ]);
@@ -276,9 +274,22 @@ function validateControlRecord(c){
 function validateOffGraphs(graphs){
  assert(Array.isArray(graphs)&&graphs.length===2);assert.deepEqual(graphs.map(g=>g.role).sort(),['M','QA']);for(const g of graphs){ordinary(g,['role','baselineBytes','candidateBytes','baselineSha256','candidateSha256','equal','sameCapturedInputs','sameDefines','onPreDiagnosticEqual','baselineRecordsSha256','offRecordsSha256','onPreDiagnosticRecordsSha256','recordCount','originalAdditionalSYN']);for(const k of ['baselineBytes','candidateBytes','recordCount'])assert(Number.isSafeInteger(g[k])&&g[k]>0);assert.equal(g.baselineBytes,g.candidateBytes);for(const k of ['baselineSha256','candidateSha256','baselineRecordsSha256','offRecordsSha256','onPreDiagnosticRecordsSha256'])assert(typeof g[k]==='string'&&HASH.test(g[k]));assert.equal(g.baselineSha256,g.candidateSha256);assert.equal(g.baselineRecordsSha256,g.offRecordsSha256);assert.equal(g.offRecordsSha256,g.onPreDiagnosticRecordsSha256);for(const k of ['equal','sameCapturedInputs','sameDefines','onPreDiagnosticEqual'])assert.equal(g[k],true);assert.equal(g.originalAdditionalSYN,g.role==='QA'?3:0);}
 }
+function validateHandoffControls(value){
+ const fact=(outcome,oracleCalls,legacyComplete,eligible)=>({outcome,sameError:true,oracleCalls,legacyComplete,eligible,callbackCalls:1});
+ const expected={purpose:'afw.post-ack-owner-handoff-controls.syn.v1',variants:[
+  {name:'valid_inner_cleanup_reject',...fact('failed',0,true,false)},
+  {name:'invalid_inner_cleanup_reject',...fact('failed',0,true,false)},
+  {name:'success_added_persistence_reject',...fact('passed',1,true,false),normalReturn:true,addedPersistenceRejected:true},
+  {name:'returned_oracle_reject',...fact('failed',1,true,true)},
+  {name:'business_primary_cleanup',successful:fact('failed',0,true,true),uncertain:fact('failed',0,false,false),samePrimary:fact('failed',0,true,false)}
+ ],families:5,wholeHelperBeforeOracle:true,actualOwnerHandoff:true,mfAllocated:false,I0Created:false,nativeExecuted:false,businessAuthority:false};
+ const closed=(actual,wanted)=>{if(Array.isArray(wanted)){assert(Array.isArray(actual));assert.deepEqual(Reflect.ownKeys(actual).sort(),Reflect.ownKeys(wanted).sort());assert.equal(actual.length,wanted.length);for(let i=0;i<wanted.length;i++)closed(actual[i],wanted[i]);}else if(wanted&&typeof wanted==='object'){ordinary(actual,Object.keys(wanted));for(const key of Object.keys(wanted))closed(actual[key],wanted[key]);}else assert.equal(actual,wanted);};
+ closed(value,expected);return value;
+}
+
 function validateModelShape(p,current){
- ordinary(p,['purpose','profile','context','stage','modelOnly','mfAllocated','I0Created','nativeExecuted','offGraphs','supplement','baselineInputs','privateCompileHashes','originalWorldBlob','protectedTestBlob','oracleSha256','worldSha256','transformSha256','sdkFileSha256','sdkBytes','sdkSites','lockBlob','lockSha256','modelGraphs',...FLAGS]);
- assert.equal(p.purpose,'afw.post-ack-preflight.syn.v1');assert.equal(p.profile,POST_ACK_PROFILE);assert.deepEqual(p.context,identity(current));assert.equal(p.stage,'MODEL ONLY');assert.equal(p.modelOnly,true);for(const k of [...FLAGS,'mfAllocated','I0Created','nativeExecuted'])assert.equal(p[k],false);
+ ordinary(p,['handoffControls','purpose','profile','context','stage','modelOnly','mfAllocated','I0Created','nativeExecuted','offGraphs','supplement','baselineInputs','privateCompileHashes','originalWorldBlob','protectedTestBlob','oracleSha256','worldSha256','transformSha256','sdkFileSha256','sdkBytes','sdkSites','lockBlob','lockSha256','modelGraphs',...FLAGS]);
+ validateHandoffControls(p.handoffControls);assert.equal(p.purpose,'afw.post-ack-preflight.syn.v1');assert.equal(p.profile,POST_ACK_PROFILE);assert.deepEqual(p.context,identity(current));assert.equal(p.stage,'MODEL ONLY');assert.equal(p.modelOnly,true);for(const k of [...FLAGS,'mfAllocated','I0Created','nativeExecuted'])assert.equal(p[k],false);
  assert.equal(p.originalWorldBlob,'5fb78c057b7e80260ae683abf4af892767ce110e');assert.equal(p.protectedTestBlob,'533dafb5df5f8e57442c5b9029dc8dec6dded434');assert.equal(p.sdkFileSha256,'bb2b85243221906d1705653a82678dab2f0020a14ef8faa7d86d764890610e80');assert.equal(p.sdkBytes,251149);assert.equal(p.sdkSites,44);assert.equal(p.lockBlob,'36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b');
  for(const k of ['oracleSha256','worldSha256','transformSha256','sdkFileSha256','lockSha256'])assert(typeof p[k]==='string'&&HASH.test(p[k]));
  validateOffGraphs(p.offGraphs);ordinary(p.supplement,['purpose','profile','context','records','nodeModuleAbsent','businessAuthority']);assert.equal(p.supplement.purpose,'afw.post-ack-supplement.syn.v1');assert.equal(p.supplement.profile,POST_ACK_PROFILE);assert.deepEqual(p.supplement.context,current);assert.equal(p.supplement.nodeModuleAbsent,true);assert.equal(p.supplement.businessAuthority,false);assert.equal(p.supplement.records.length,2);assert.deepEqual(p.supplement.records.map(r=>r.path).sort(),['<stdin>',PHASE].sort());for(const r of p.supplement.records)validateEmissionShape(r,current);
@@ -296,7 +307,7 @@ async function checkedModel(){
  const world=await readFile('test/fixtures/finite-budget-world.mjs','utf8'),a=ast(world,'current-world-pin'),oracle=a.statements.find(n=>ts.isFunctionDeclaration(n)&&n.name?.text==='qualifyPostAckOriginalR2');assert(oracle);assert.equal(sha(oracle.getText(a)),p.oracleSha256);
  return {model:p,receipt,sha256:sha(bytes)};
 }
-function modelProjection(p,digest){return {purpose:p.purpose,profile:p.profile,stage:p.stage,offGraphs:p.offGraphs,supplement:p.supplement,modelGraphs:p.modelGraphs,privateCompileHashes:p.privateCompileHashes,sdkFileSha256:p.sdkFileSha256,sdkBytes:p.sdkBytes,sdkSites:p.sdkSites,lockBlob:p.lockBlob,lockSha256:p.lockSha256,worldSha256:p.worldSha256,transformSha256:p.transformSha256,protectedTestBlob:p.protectedTestBlob,oracleSha256:p.oracleSha256,preflightSha256:digest};}
+function modelProjection(p,digest){return {handoffControls:p.handoffControls,purpose:p.purpose,profile:p.profile,stage:p.stage,offGraphs:p.offGraphs,supplement:p.supplement,modelGraphs:p.modelGraphs,privateCompileHashes:p.privateCompileHashes,sdkFileSha256:p.sdkFileSha256,sdkBytes:p.sdkBytes,sdkSites:p.sdkSites,lockBlob:p.lockBlob,lockSha256:p.lockSha256,worldSha256:p.worldSha256,transformSha256:p.transformSha256,protectedTestBlob:p.protectedTestBlob,oracleSha256:p.oracleSha256,preflightSha256:digest};}
 function executionContext(){return identity({repository:process.env.GITHUB_REPOSITORY,ref:process.env.GITHUB_REF,source:process.env.GITHUB_SHA,run:process.env.GITHUB_RUN_ID,attempt:Number(process.env.GITHUB_RUN_ATTEMPT),case:'R2'});}
 async function currentPrograms(){const files=[];for(const path of PROGRAM_PATHS){const b=await readFile(path);files.push({path,bytes:b.length,sha256:sha(b)});}return files;}
 async function writeProof(result){
@@ -307,7 +318,7 @@ async function contractsProof(){
  assert.equal(process.env.AFW_SYN_CHECKPOINT_KEY,undefined);const context=executionContext(),controls=JSON.parse(await readFile('output/finite-budget/post-ack-private/controls.json')),checked=await checkedModel();validateControlRecord(controls);
  const related=JSON.parse(await readFile('output/finite-budget/pure/controls.json'));assert.equal(related.passed,true);assert.deepEqual(related.groups.map(g=>g.group),['F1','F2','F3','F4','F5','F6','F7','F8']);
  const tap=await readFile('output/finite-budget/post-ack-private/related.tap','utf8'),count=name=>{const hits=[...tap.matchAll(new RegExp('^# '+name+' ([0-9]+)$','gm'))];assert.equal(hits.length,1);return Number(hits[0][1]);},pureTests={tests:count('tests'),pass:count('pass'),fail:count('fail'),skipped:count('skipped'),cancelled:count('cancelled'),tapSha256:sha(tap)};assert(pureTests.tests>0&&pureTests.pass===pureTests.tests&&pureTests.fail===0&&pureTests.skipped===0&&pureTests.cancelled===0);
- await writeProof({purpose:'afw.post-ack-contracts.safe.v1',context,controls,programs:await currentPrograms(),preflight:modelProjection(checked.model,checked.sha256),modelReceipt:checked.receipt,oracle:oracleControls(await readFile('test/fixtures/finite-budget-world.mjs','utf8')),related:{purpose:related.purpose,groups:related.groups.map(g=>({group:g.group,passed:g.passed,evidence:g.evidence,caseCount:g.caseCount})),passed:true,pureTests},...Object.fromEntries(FLAGS.map(k=>[k,false])),nativeExecuted:false,mfAllocated:false,I0Created:false});
+ await writeProof({purpose:'afw.post-ack-contracts.safe.v1',context,controls,programs:await currentPrograms(),preflight:modelProjection(checked.model,checked.sha256),modelReceipt:checked.receipt,oracle:oracleControls(await readFile('test/fixtures/finite-budget-world.mjs','utf8'),checked.model.handoffControls),related:{purpose:related.purpose,groups:related.groups.map(g=>({group:g.group,passed:g.passed,evidence:g.evidence,caseCount:g.caseCount})),passed:true,pureTests},...Object.fromEntries(FLAGS.map(k=>[k,false])),nativeExecuted:false,mfAllocated:false,I0Created:false});
 }
 function validateContractsProof(r,context,programs,checked){
   ordinary(r,['purpose','context','controls','programs','preflight','modelReceipt','oracle','related',...FLAGS,'nativeExecuted','mfAllocated','I0Created']);assert.equal(r.purpose,'afw.post-ack-contracts.safe.v1');assert.deepEqual(r.context,context);assert.deepEqual(r.programs,programs);validateControlRecord(r.controls);assert.deepEqual(r.preflight,modelProjection(checked.model,checked.sha256));assert.deepEqual(r.modelReceipt,checked.receipt);
~~~~~~~~~~~~

## Implementer full fix2 append (commands and actualoutput)



## Native post-ACK R2 Task1 fix round2/5

### N8 remaining-I1 candidate — before the sole NEW qualification

Same original implementer, only I1 ordering/eligibility remains in scope. Binding brief bb324a1811d694c7b8d261fbcf9b019c00e9d068 atRootdocs589ea21defb8c8d25f8dc907bfb1a8427d4c01c3; N8 supersedes earlier ambiguous before-ownership whole-case verdict wording. Original R2 means ONE awaited legacy runBudgetReadonlyCase('R2') INCLUDING required cleanup/persistence, then the pinned21predicate oracle on its RETURNED value. Prior actual green43331779408 is preserved/consumed, not replayed. C1/C2predicatecoverage/I2–I5/M1/N6/N7 remain in force; no broad refactor or extra Native permission.

Starting Source2910fcdc512497e54da286b477c8662be7721fcc/tree98e9d674eb3e38aa860da96d7341a61c10d2e3b5; full6files plus F7 re-read exact;3194leaves/nontruncated;3188protected; main0c9c475b3ebaa970fc11d628b40e50a90cceb727; queued/in_progress/waiting/pending/requested all0. Entire report7019adbabc91fa3ba802557581144ef0813d72e9/569273chars is preserved verbatim as this section's prefix. Local work remains bounded string/data hashing and read-only metadata; no Source import/eval/execution, clone/deps/build/temp Source files on the PC. Skills systematic-debugging/receiving-code-review reused; no subagent or independent review is claimed.

Static causal RED analysis: old withFixedBudgetOwner hook ran the oracle/marked passed before close. A required original callback could set cleanupPrimary and throw; legacy close promotes that error, excludes equal primary from ancillary failures, and can persist complete:true. Old adapter then preserved earlypass/swallowed the helper rejection. If inner result also violated a predicate, earlyoracle could replace the cleanup error the protected test would actually receive. No separate new RED execution was authorized; the old green did not cover this edge. New actual-handoff regressions are authored for the sole fresh cloud qualification below.

Candidate fix removes oracle/verdict/error injection from withFixedBudgetOwner entirely. Its only new observation there is nonauthoritative innerOperationReturned, without altering primary or original callback order. Shared private settlePostAckOriginal awaits the WHOLE helper callback before record/oracle; any original helper rejection wins by identity, oracleCalls stays0, and only normally returned whole-helper value reaches the exact unchanged21oracle. Shared finish preserves exact helper/oracle rejection; later ADDED evidence work is caught by the shared preservePostAckEvidence wrapper and cannot change known success/error. Precompletion unknown still unavailable. Actual Native adapter still has exactlyONE fixed runBudgetReadonlyCase('R2') call site and two fixed exported adapters only; no R1/R3/test-module import.

Eligibility is independently conservative: postAckEvidenceEligible checks retained required callback/phase failure facts in the existing private error map (fixture_callback,registered_cleanup,release/restore/dispose/capture/terminal/archive/ownership/mount failures), closed record failure/rejected-phase/uncertainty facts, and helper rejection after inner return. It does NOT infer required-cleanup success merely from complete:true, ancillary counts, or whether failure equals primary. Business-primary rejection with independently successful cleanup remains eligible for a truthful failed-original diagnostic; failed-case certificates are not banned indiscriminately. Legacy close semantics themselves are unchanged.

Root accepted the actual-control seam: private World preflight runs ACTUAL withFixedBudgetOwner/registerFixedOwnedCleanup/noteFixedBudgetOwnedFailure/close through the SAME private whole-helper settlement/oracle/error-priority routine as Native adapter. Five pure families cover seven owned Node handoffs, NO Miniflare/native handle/I0/SDK/native-R2 invocation: (1)valid inner plus requiredcleanup rejection; (2)oracle-invalid inner plus requiredcleanup rejection; (3)returned helper+oracle success then actual added ENOTDIR persistence failure through the shared evidence wrapper; (4)returned helper then same oracle-error object; (5)business primary with successful cleanup, distinct cleanup uncertainty, and SAME-primary-object cleanup rejection (legacycomplete:true but required-phase fact must make eligiblefalse). Assertions require callback once, oracle0 on all unreturned values, original error identity/priority, whole-case status and expected eligibility.

The pure controls return the genuine synthetic R2-shaped value through legacy ownership/persistence, without boxing or changing original callbacks. The fixed runner-only legacy full-result path must be absent first; normally persisted synthetic results are copied to unique owned control directories, then only that owned result file is removed after exact hash verification, avoiding contamination of any later Native fixture. No pre-MF original scratch cleanup or global legacy cleanup behavior is changed/claimed. Synthetic progress premises are clearly local test data; actual owner records assert0 and MODEL flags mfAllocated/I0Created/nativeExecuted remainfalse.

Five closed family facts are included in sanitized MODEL and strictly validated by existing schema/provenance control IDs and independent downloaded-MODEL binding. The old evidenceFailure-boolean-only mirror was removed. Private oracle still has all21 predicate mutation families; pre-MF/future-job controls stay. Minimal MODEL/projection schema addition is the only proof consequence; no new exports, control IDs, Node tests, Source paths, workflow bodies, permissions, secrets, budgets or Native calls. Test entry1923B, contracts held21318B and Native held30086B remain exact reviewed fix1 bytes; all gates held/F7sevenfalse throughout preparation.

Covering commands for ONE NEW7+2 KEYLESSpush/attempt1 are unchanged: three node --check files; current pure preflight including actual Node handoffs; sanitized MODEL upload/real assigned-ID triple-digest+protected inventory readback; AFW_POST_ACK_MODE=controls node --test --test-concurrency=1 test/finite-post-ack-diagnostic.test.mjs (same24IDs/onewrapper); unchanged fixed F1–F8 at original45s;17 named pure diagnostics/observer tests; contracts-proof; exact2JSON SMALLSAFE upload; independent MODEL+SAFE/currentcheckout/command/provenance proof verification. Source qualification is required before scoped rereview; actual command outputs/run/job/artifact metadata and final readbacks will be appended after the sole terminal outcome, not invented here.

Frozen held-file inventory:

```json
[
  {
    "path": "test/fixtures/finite-budget-world.mjs",
    "chars": 242981,
    "bytes": 242987,
    "sha256": "007a4b39777dbd34645f7754556cfa1a9e152a0d2a6f55a27f6b1c30e334d867",
    "blob": "0631f9a44cbb37bec3ed1a2c3dc09ee93b86661b"
  },
  {
    "path": "test/fixtures/finite-post-ack-diagnostic.mjs",
    "chars": 74686,
    "bytes": 74686,
    "sha256": "245aae72303df50d824215cd207fea0ff052b16d7af31f3a6463848ac23f8868",
    "blob": "cdc1fdca6d614183a0383e4734d2ffcfdd5ac422"
  },
  {
    "path": "test/finite-post-ack-diagnostic.test.mjs",
    "chars": 1923,
    "bytes": 1923,
    "sha256": "cbe41b778c68e74516f9008061d27cdcdc6e8dcf212a93d8ddb24caf8079e462",
    "blob": "aaf4894d1b411a8ac59debb63ca9368e803141c5"
  },
  {
    "path": ".github/workflows/afw-r2-post-ack-contracts.yml",
    "chars": 21318,
    "bytes": 21318,
    "sha256": "548a99f9c577ae5212016b5f4cc3c7899f4b6902af47a88802000f0f3a84264c",
    "blob": "1c4d054487e781157cf4fa633f9fc58a5a9cbbf5"
  },
  {
    "path": ".github/workflows/afw-r2-post-ack-diagnostic.yml",
    "chars": 30086,
    "bytes": 30086,
    "sha256": "da20759fd7be5e64f7f62164a0a58bc701b33c89d35175a746868eed56c38fb0",
    "blob": "8d5b04da0eff2890c70b8ef15a2f51a99c896810"
  }
]
```

Self-review checked unchanged legacy primary/callback order, whole-helper and required persistence before oracle, retained-phase gate including equal-primary hole, business-failure/cleanup-success allowance, actual added persistence failure instead of manual flag, exact private/shared routine usage, strict closed MODEL/schema binding and existing N1–N7 contracts. No known concrete blocker remains; this is not independent CLEAN. On any new run failure originalWorld is restored and allnewWFheld/protected/main/0activeSTOP; no hidden repair/retry. On pass retain fixed code, close allnewWF, fullreadbackSTOP. Native/AFWkey/MF/I0/SDKruntime/CF/production/OAuth/customer/PCoff/Native16/Max NOT EXECUTED; all readinessflagsfalse.


### Fix2 sole NEW qualification FAILED at MODEL readback — permit consumed

Implementation026d8f2aa67a3efa79f922d098ffce2d517fee69/treeb2584749f0c08118ddaa9c8d1fce0f518a4b1134 exact-readback on all6files; onlyWorld+fixture+report changed,3194leaves/3188protected. Sole frozen activation91e3fb7c49496d655a515fa1e467da9fab700a71/tree49c94bb3045caef149e44b3b86b8ed50761ee342 changed ONLY contracts event/runlabel/2gates. Active contracts21420B/blob b6b6721c9cf8f02282cdf23a828b8ce4d24b1124/SHA2569d0039bc0adc68576b3890c9a90bf144d2d84dcfd0513125b091fb94f0bb13cb; all other frozen hashes unchanged. Five active states0 before event.

Actual NEW run43336838877/attempt1/push/source91e3fb7c49496d655a515fa1e467da9fab700a71, created2026-11-13T00:24:38Z, terminalFAILURE2026-11-13T00:25:11Z. Producer131595029246 FAILURE; verifier131595273354 terminalSKIPPED. This was not a rerun of43331779408. Install exact lock, identity/baseline/pins and THREE node --check commands all succeeded. Current-identity pure MODEL preflight completedSUCCESS, including current actual Node ownership/handoff regressions and their assertions; sanitized MODEL upload succeeded. No independent readback/proof of those model facts was completed, so this is not an overall qualification or ACTUALGREEN.

Failure step was existing 'Verify model upload API raw ZIP digests bounds CRC and exact paths'. Closed actual output:

```text
2026-11-13T00:25:07.6411750Z MODEL upload finalized, artifact13997192957
2026-11-13T00:25:07.6412728Z MODEL upload size10700bytes
2026-11-13T00:25:08.0704508Z curl: (22) The requested URL returned error: 404
2026-11-13T00:25:08.0739406Z Process completed with exit code22
```

The step contains two sequential fixed curl reads (metadata then ZIP); existing output does NOT distinguish which returned404. No temporal-consistency, permission, credential, outage or code-cause diagnosis is asserted. Python triple-digest/path/CRC/UTF8/EOF checks and protected verifyBudgetArtifact REAL-ID readback were not completed. No retry/backoff/source repair/rerun was performed. Post-run artifact collection metadata lists the assigned MODEL current/unexpired on this exact run/head; that later metadata does NOT retroactively qualify the failed read.

MODEL metadata only (no MODEL archive download by builder/RootMCP):

```json
{
  "id": 13997192957,
  "name": "afw-post-ack-model-43336838877-1",
  "size_in_bytes": 10700,
  "digest": "sha256:ea1c3f978a31166dc208981cb74749fbf5e3167750657c8437361c9a3d4e2d72",
  "created_at": "2026-11-13T00:25:07Z",
  "expires_at": "2026-11-20T00:25:06Z",
  "expired": false,
  "workflow_run": {
    "id": 43336838877,
    "repository_id": 1347578006,
    "head_repository_id": 1347578006,
    "head_branch": "feat/finite-native-cleanup-20261101",
    "head_sha": "91e3fb7c49496d655a515fa1e467da9fab700a71"
  }
}
```

Uploader digest in bounded log matches current API metadata ea1c3f978a31166dc208981cb74749fbf5e3167750657c8437361c9a3d4e2d72; raw ZIP digest and full verified model.json/preflightSha were NOT obtained. SAFE artifact NONE. Exact24 callback wrapper was SKIPPED (0registered/executed by this qualification step, no completion/pass witness and no forged24PASS); unchanged F1–F8 and17named pure tests SKIPPED; contracts-proof/SAFE upload SKIPPED; independent verifier SKIPPED. No new TAP pass/fail test count is invented. The preflight's closed 5families/7Node-handoff assertions passed at command level, but their MODEL proof was not independently read back; prior fix1 actual24/8groups/17tests remains historical evidence only.

Required failure rollback now targets exact originalWorld5fb78c057b7e80260ae683abf4af892767ce110e/218113chars and exact reviewed held contracts1c4d054487e781157cf4fa633f9fc58a5a9cbbf5/21318B/manual/noinputs/nopush/twofalse. Native8d5b04da0eff2890c70b8ef15a2f51a99c896810 remainsmanual/noinputs/nopush/twofalse; F7f7a71f1a0fa4f5ddf069ff411f008a098455e5cc unchanged/sevenfalse. Fix2 fixturecdc1fdca6d614183a0383e4734d2ffcfdd5ac422 and testaaf4894d1b411a8ac59debb63ca9368e803141c5 stay reviewable but current World rollback intentionally lacks new adapters; complete intended fix2World0631f9a44cbb37bec3ed1a2c3dc09ee93b86661b is preserved in026d8f2a/91e3fb7c for scoped recovery, never force/reset. All ENTIRE569273starting prefix and fix2initial577867prefix preserved verbatim. Full post-closure readbacks will follow.

StatusBLOCKED: one fix2 permit consumed by MODEL HTTP404 read failure; overall proof/qualification incomplete. Any next attempt needs a fresh scoped Root brief/permit. No hidden repair, extra qualification, Native, MF/I0/SDKruntime/AFWkey/CF/production/OAuth/customer/PCoff/Native16/Max executed; synthetic Node progress flags are not allocations/runtime evidence. All five readinessflagsfalse. STOP after closure/readback.


### Fix2 failure closure readback and STOP

Closed Source867c5f0d3c959eb9c62d64efcb80d50ac67d932d/tree dafd6be9be85ef70eb6c221c51cdc280511c4fba verified full/nontruncated:3194leaves/all3188protected exact. Full6files+F7 re-read exact. World ORIGINAL5fb78c057b7e80260ae683abf4af892767ce110e/218113chars(218119UTF8B) restored per failure policy; contracts1c4d054487e781157cf4fa633f9fc58a5a9cbbf5/21318B manual/noinputs/nopush/twofalse; Native8d5b04da0eff2890c70b8ef15a2f51a99c896810/30086B manual/noinputs/nopush/twofalse; F7f7a71f1a0fa4f5ddf069ff411f008a098455e5cc/126209B sevenfalse unchanged. Fixturecdc1fdca6d614183a0383e4734d2ffcfdd5ac422/74686B and testaaf4894d1b411a8ac59debb63ca9368e803141c5/1923B exact, new code remains unqualified on overallfix2. Intended World0631f9a44cbb37bec3ed1a2c3dc09ee93b86661b preserved in026d8f2a/91e3fb7c, not discarded. Reportfc8baf120f28cdb7829f455e3a79ed8d0ff0e44f/582678chars at closure preserves all prior569273chars and fix2initial577867chars; this receipt appends only.

Main independently unchanged0c9c475b3ebaa970fc11d628b40e50a90cceb727. Five active repository states queued/in_progress/waiting/pending/requested=0 after closure. Sole fix2run43336838877/attempt1 completedFAILURE; producer131595029246failure, verifier131595273354skipped. MODEL13997192957 metadata/currenthead91e3/10700B/digestea1c3f97/expiry2026-11-20T00:25:06Z recorded above; no SAFE and no MODEL archive/Native data downloaded. No repair/retry/rerun after HTTP404, no further task dispatched. Final report-only receipt commit receives full ref/tree/files/main/five-state0 readback before parent response; it cannot self-record its own SHA.

StatusBLOCKED: overall fix2 qualification halted by fixed MODEL read HTTP404/exit22; no endpoint/cause diagnosis or false GREEN. Current pure preflight completed successfully, but named24controls/8groups/17pure and independent proof did not execute, so a fresh scoped Root authorization is required to qualify the preserved candidate. Native/key/MF/I0/SDKruntime/CF/production/OAuth/customer/PCoff/Native16/Max remain unexecuted/HELD, allfiveflagsfalse. Task-owned string/hash buffers are released; no local Source files/processes/dependencies were created. STOP.

## Review contract

Bothcodepatches RootreappliedSTRINGDATA andmatchedFULLfrozenfiles EXACTLY(World4hunks/fixture6). EvaluateI1ADDRESS/NOT+newfixbreakage,explicitlyseparateactualPUREcommandpassfromunavailablefullqualification. No Sourceexecution/tests/mutations/delegation,broadnewaudit ortransportexperiment.Model404causeunknownnotacredentialfinding. Returnscopedverdictandvalidationgap,noNativeauthorization.
