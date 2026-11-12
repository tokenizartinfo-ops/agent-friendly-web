# Task2 formal fix round3/5 · scoped re-review package

FIX_BASE 2baae7652c450265a56acaf70aba772b0a12a727; HEAD 872ea434713b499021c52759a2c3023a31064ebb; tree07413d3723ad72745d756513fef0cf7ae5998037. SAMEreviewer; readonly on this fixdiff only. SameTask2planbff30216 and round3brief4bb0f785 at docs/superpowers/briefs/2026-11-12-finite-budget-native-fix-round3.md. PriorF1–F8addressed, do not reopen unchangedcode. No subagents/writes/newjobs/localsetup/testsuite; report unanswered concerns.

## Finding under verification — VERBATIM
**Nuevo hallazgo — Important.** En el propio escenario `dispose_reject`, `ownership.json` puede registrar simultáneamente `complete:true`, `disposalUncertain:true`, `disposed:false` y `archived:false`. El cierre excluye el error primario de la lista de fallos auxiliares y calcula `complete` exclusivamente a partir de que esa lista esté vacía. Cuando el único error es el del disposer, el resultado persistido declara completa la custodia del recurso. El job sí falla y la copia del checkpoint queda bloqueada. El control verde ya recorre este caso, pero omite la comprobación de `complete` en el archivo persistido. El criterio de cierre de este hallazgo es que ese mismo escenario produzca `complete:false`, mantenga `ancillaryFailureCount:0` y conserve el error original.

Round2review evidence: calculationworld889–893/control1806–1813 at FIX_BASE. Criterion: persisteddispose_reject completefalse/ancillary0/originalDsame, uncertainretention/oneattempt/no copy/poison unchanged. Distinguish resourcecustodycomplete from successfulbusinesswork; safe/noMF scenarios mustremainaccurate.

## Fix report / actual covering
Report docs/superpowers/reports/2026-11-07-finite-native-budget-qualification-task2.md blob9315ae53f0a28a9ad41d202e788de8ac0a2a4f51 at final872ea434713b499021c52759a2c3023a31064ebb. Fullappend includedbelow; no needtofetch153288charfullreport. Exactprefix preserved. It namescommands/outputs/actualREDbeforefix+conditionalGREEN:
- RED43225144081/1/source276a2dad exactactualpersistedtrue vsfalse withancillary0/uncertaintrue/notdisposed/notarchived/sameD/no copy/attempt1/sourceRetained/poison; actualexit1, no unrelatedsetupfailure. Then SAFEclosure3da29997 beforefix.
- GREEN43225744579/1/sourcea015/contracts131208323208 SUCCESS: allfixed5syntax/lint/inactive1/invalid/Q8exact8/0failcancelSkipTodo/F1–F8+newpersistedreadbackassertions (F5evidence16524B/SHA46246d9f)/FULL3profiles0/3/3+12blocks. RootsameIDartifact13946698704/111751B/digestea941332/full10manifest/pins/context verified; [primaryproof](./2026-11-12-finite-budget-native-round3-primary.md).
- FinalSourceworld5fb78c05 matchesGREEN, WFEXACTknownSAFEf7a71complete7/manualallfalse, reportonlyappend;0active. Actual16/Task2final/GLOBAL296/PCoffheld.

## All7 snapshots / complete4commits / fullstats
|Path|Beforeblob|Afterblob|Status|
|---|---|---|---|
|test/fixtures/finite-budget-world.mjs|5f349fdbece8a38f3dc78c82f57131b0efbd01da|5fb78c057b7e80260ae683abf4af892767ce110e|changed|
|test/fixtures/finite-owner-cleanup.mjs|2f5dad6c306fac1be2f11845bef640bb204ad572|2f5dad6c306fac1be2f11845bef640bb204ad572|unchanged|
|test/fixtures/finite-initial-entry-world.mjs|a7b730dc9be336528f0971544099f79d05758b1a|a7b730dc9be336528f0971544099f79d05758b1a|unchanged|
|test/fixtures/finite-owner-cleanup-persistence.mjs|e0dda1fd3d66c1864fd0b20f873c7fc0c452f6d8|e0dda1fd3d66c1864fd0b20f873c7fc0c452f6d8|unchanged|
|test/mcp-qa-finite-budget-native.test.mjs|533dafb5df5f8e57442c5b9029dc8dec6dded434|533dafb5df5f8e57442c5b9029dc8dec6dded434|unchanged|
|.github/workflows/afw-finite-budget-qualification.yml|f7a71f1a0fa4f5ddf069ff411f008a098455e5cc|f7a71f1a0fa4f5ddf069ff411f008a098455e5cc|unchanged|
|docs/superpowers/reports/2026-11-07-finite-native-budget-qualification-task2.md|901479df4f9c11de3f681bac5671e881e6d62d69|9315ae53f0a28a9ad41d202e788de8ac0a2a4f51|changed|

- 276a2dad4ffadd1de3b978caedac70cfb7cb7ed6 — test(qa): expose fixed persisted custody false-complete causal RED
- 3da29997c8e66ab629b15b66c6f814bb66af361e — chore(qa): preserve exact F9 causal RED with safe inactive workflow [skip ci]
- a015a480c445ae9d8592f04fb506eca9bb8458a0 — fix(qa): require certain disposed archived resources for persisted completion
- 872ea434713b499021c52759a2c3023a31064ebb — chore(qa): close covered F9 repair with complete safe inactive workflow [skip ci]

- docs/superpowers/reports/2026-11-07-finite-native-budget-qualification-task2.md: +223/-0
- test/fixtures/finite-budget-world.mjs: +28/-3

## COMPLETE validated U10 fixdiff
AllGitHubpatchlines/hunkcounts/tails/fullbefore-aftercoverage checkedbeforecontext expansion; all4commits/2changedfiles represented. No hunkelided.
### docs/superpowers/reports/2026-11-07-finite-native-budget-qualification-task2.md

`````diff
diff --git a/docs/superpowers/reports/2026-11-07-finite-native-budget-qualification-task2.md b/docs/superpowers/reports/2026-11-07-finite-native-budget-qualification-task2.md
# before_blob=901479df4f9c11de3f681bac5671e881e6d62d69 after_blob=9315ae53f0a28a9ad41d202e788de8ac0a2a4f51
--- a/docs/superpowers/reports/2026-11-07-finite-native-budget-qualification-task2.md
+++ b/docs/superpowers/reports/2026-11-07-finite-native-budget-qualification-task2.md
@@ -1418,10 +1418,233 @@
     "cases": "'[\"D3\",\"D4\"]'",
     "timeout": "15",
     "literalFalse": true
   }
 ]
 ```
 
 Contracts remains2min; native protected limits unchanged. B starts with contracts/readonly/reductionproducer dependencies, resolves other terminal artifacts only after native/disposal under existing same-run unique role/kind/identity/digest policy. B self observation remains in-progress/currenttime until upload; Root must later supply all7terminal/interval proof, no fabricated future end/8thjob. Existing F7 remaining-time request checks/pollfacts retained; no new clockpoll/control execution during reconciliation. All four D cases share original fixed reduction producer lineage. These are static PREPARATION facts, not observed native clocks.
 
 F2/F5/F8 code and covering regressions are now ready for SAME reviewer on FULL formal FIX_BASEd9b7ea752466ee6c5865b1529aeed28072a085ff..final including all commits/seven authorized paths. Formal round2 remains open pending that review; five prior closed findings stay closed unless introduced breakage is found. Full3190 leaves/3183 outside-scope hashes+modes, currentref/tree/report/workflow exact content/closure0runs/branch0active readbacks follow. No main/Rootdocs/ORD/O4/production changes, no helpers, no localprojectsetup/deps/build/tests. Native16/finalTask2/GLOBAL296/realPCoff remain HELD/readinessfalse. STOP after closure; no extra test/job/native action without Root ruling.
+
+
+## Formal fix round3/5 — FIRST current persisted-custody regression RED candidate
+
+Root release4bb0f785aaecd10b4b343219324fa2cc4d97a647 @5115bcb36e2b4e3006a1ca263b230e66dcbe6bd8; SAMEreviewer round2 b9bc72e1 closed F2/F5/F8 and found NEWImportantF9. Formal FIX_BASE is NOW2baae7652c450265a56acaf70aba772b0a12a727/tree60dbb30172bab4513c51cb46804f741b0db3a984, notd9b7. Same7allowedpaths/3183protected.
+
+Regression FIRST; lifecycle complete calculation unchanged. One fixed verify-round3-owned-red CLI calls actual CURRENT runRound2OwnedCase('dispose_reject'), using existing inertMF/functions/currentAST producer continuation/catch/finally and one original disposer attempt. Then reads ACTUAL persisted RUNNER_TEMP/afw-round2-fixed-owned/dispose_reject/owned/ownership.json and projects only complete/resourceflags/ancillarycount/originalDsame/attempt/copy/sourceRetained/poison. Expected causalRED exactly actualCompletetrue vsfalseexpected, uncertaintrue/disposedfalse/archivedfalse/ancillary0/originalDsame/attempt1/copies0/sourceRetained/poisontrue/errornull/stagecomplete. Final currentfile assertion requirescompletefalse and intentionallyfails before a fix. Any setup/unrelatedfailure cannot satisfy this gate and mustSTOP.
+
+One Node22.23.4/Ubuntu24.04 <=2min keyless focused job, locked install, ONE fixed CLI invocation ONLY/no Q8/broadtests/F1–F8/compileprofiles/MF/I0/businessSDK. Raw commandstdout/stderr runner-private untilcleanup. Independent standardNode publisher strictly validates/projects closed result.json purpose afw.round3-owned-closure-red.safe.v1 and manifest.json purpose afw.round3-owned-closure-manifest.safe.v1; only booleans/numericcounts/fixed enums/context and typed/hash-only errors, no rawSource/messages/stack/TAP. First exact assignedID digest/fullinventory/context/local byte-equality readback, bounded retrieval2/3 only for visibility. Actual command exit retained; workflow terminalFAILURE expected only when exactcausaldeficitobserved. Source frozen through proof/readbacks.
+
+Consumers inspected: complete gates successful no-adapter custody and five occurrence/mount custody proof in aggregate; native business completed/status fields are separate. After exact expectedRED only, preauthorized minimal condition will require empty ancillarylist AND certainty/disposal/archive for each owned actual resource, without adding primaryD to ancillarycount or altering Erroridentity. Safe partial preassignment/no-MF archives and resource-free operation-error semantics remain permitted. No change yet. ExpectedRED closes safely to EXACTknownSAFEf7a71f1a0fa4f5ddf069ff411f008a098455e5cc/manual7false/report/readbacks before conditionally continuing ONE fresh fullcoveringGREEN; unforeseenRED/GREENfailure means STOP/no repairretry. Oldunsafe c72 is NOT rollback for round3. Native16/main/production/SDK/pins/clock/keys/custody allHELD/unchanged.
+
+
+## Round3 exact causal RED observed and SAFE inactive closure
+
+Run43225144081/attempt1/Source276a2dad4ffadd1de3b978caedac70cfb7cb7ed6/treee0afce74932902de3319cb4061e6ce5ee1393f92, worlda2daecfd25dc3120a52b8f8cd9c9d77aad1bd811/TEMP15b4e825c5152028672c5e8a6c7d7e77a0f7a5cf. Job131206290914 terminalFAILURE as intended, actualCLIexit1; job2026-11-12T13:12:55Z..2026-11-12T13:13:21Z/runupdated2026-11-12T13:13:22Z. All setup/lockedinstall/currentfixedcase/publication/readbacks succeeded; final expectedcompletefalse assertion produced the business-test failure. No unrelated/setupfailure. Exactly one fixed case/no MF/I0/SDKbusiness/othercontrols/profiles.
+
+ACTUAL closed persistedfile proof:
+
+```json
+{
+  "purpose": "afw.round3-owned-closure-red.safe.v1",
+  "source": "276a2dad4ffadd1de3b978caedac70cfb7cb7ed6",
+  "run": "43225144081",
+  "attempt": 1,
+  "case": "dispose_reject",
+  "stage": "complete",
+  "facts": {
+    "actualComplete": true,
+    "expectedComplete": false,
+    "ancillaryFailureCount": 0,
+    "disposalUncertain": true,
+    "disposed": false,
+    "archived": false,
+    "originalErrorSame": true,
+    "originalAttempts": 1,
+    "checkpointCopies": 0,
+    "sourceRetained": true,
+    "poisonPreserved": true
+  },
+  "error": null,
+  "expectedCausalRed": true,
+  "commandExit": 1,
+  "valid": true,
+  "reason": "none",
+  "I0Opened": false,
+  "nativeExecutionProduced": false,
+  "businessCases": 0,
+  "operationalReadiness": false,
+  "completePackage": false,
+  "PCoff": false,
+  "globalNativeDrainVerified": false,
+  "sdkNamespaceEmptyVerified": false
+}
+```
+
+Every required exact conditional gate is true: stagecomplete/errornull/valid/expectedCausalRed, ownershipactualcompletetrue vsfalseexpected, uncertaintrue/disposedfalse/archivedfalse/ancillaryFailureCount0/originalDsame/oneattempt/copies0/sourceRetained/poisonpreserved. The new regression read actual ownership.json from CURRENT lifecycle; closurealgorithm unchanged at RED. This authorizes only the already released minimalF9condition+regression and ONEcoveringGREEN, not retryingRED or broadfix.
+
+Artifact13946878606/finite-budget-round3-owner-red-276a2dad4ffadd1de3b978caedac70cfb7cb7ed6, ZIP902B/SHA25674c63bd204078135be1a4c42749735d93eb15602f669e29ee542fb5b72ba6de1, expires2026-11-19T13:13:16Z. Exact result.json and manifest.json; purposes afw.round3-owned-closure-red.safe.v1 / afw.round3-owned-closure-manifest.safe.v1. FIRST assignedsameIDdownloadSUCCESS, actual uploaded/downloaded digestmatched/full2inventory+manifest/context/localbytes SUCCESS; retrieval2/3SKIPPED. PublicrawSource/messages/log/TAP/stack absent; privatecommandlog runner-only untilcleanup.
+
+Failure/RED closure restores EXACTknownSAFEf7a71f1a0fa4f5ddf069ff411f008a098455e5cc COMPLETE7/manual/noinputs/nopush/all7false, reportappend and fullref/tree/3183protected/3190leaf/closure0runs/zeroactive readbacks before conditionrepair. No unsafec72 fallback. This expectedRED closure is not a stop of preauthorized conditional work; after readback proceed minimalresource-complete predicate and persistedcontrol, oneGREEN. Unexpected nextfailure mustrestoreSAFEf7a71/reportSTOP with noautoretry. FormalFIX_BASE2baae765 andNative16HELD unchanged.
+
+
+## Round3 conditional minimal F9 repair and ONE full-covering GREEN candidate
+
+Conditional authority satisfied by exact observed43225144081/1/DTOexpectedtrue/errornull/complete true vsfalse/ancillary0/uncertain flags/Dsame, then SAFEf7a71closure3da29997/fulltree/readbacks/0active. No Root approval pause or extraREDretry. FormalFIX_BASE2baae765 stays.
+
+Only lifecycle business-state change: complete requires failures.length===0 AND every actual owned record has no disposalUncertain, any attachedMF is disposed, any attachedpersistence is archived. Primary selection/error object/rethrow and ancillary filtering/count remain BYTEUNCHANGED; no adding primaryD as ancillary. Original one-disposer/sourceRetained/noarchive/poison/newallocation fence untouched. Reversing this predicate exactly reconstructs prior lifecycle. No persistence/default/SDK/production/12observer/clock/pin/crypto changes. Safe noMF/partial archived persistence can still be complete; resource-free operation errors remain distinct from custody state.
+
+Current existing seven owned childcases now READ ACTUAL persisted ownership.json before success: normalclosurecomplete true/uncertain false/disposed+archived true; all uncertainty arms complete false/disposed+archived false; persisted ancillarycount must equal original distinct ancillaryerrorcount. dispose_reject specifically requires0ancillary and SAME originalD. Adds persistedComplete and persistedAncillaryFailureCount proof fields to fixed case result. No mock-count-only replacement or newgenericcase/API. Historical RED command remains intentionally unqualified on fixedcode and is not rerun.
+
+ONE fresh attempt1 <=2min keyless fullcovering: same5 syntax/lint/inactive1/business0/invalidpreI0, unchangedQ8exact8/0failcancelSkipTodo, F1–F8 with actual persistedF9regression/currentsealer controls, three FULL strictprofiles positive0/readonly3/reduction_a3/12primaryblocks+work2/wait2. Complete existing seven graph with onlycontracts runnable/sixnativefalse. Fixedpublicsealer/nativebodies sameSAFEf7a71; no broadsuite/custody/native16/MF/I0/SDKbusiness/newsecret. Freezeuntilterminal/sameIDfullinventory proof. Unexpectedfailure SAFEexactf7a71/manual7false/reportSTOP/noautoretry; allpasslatestFIXEDcomplete7/manualallfalse/currentwiring/readbacks/reportSTOP for SAMEreviewer FULL2baae765..final onF9+newbreakageonly.
+
+
+## Round3 F9 RED→GREEN complete — COMPLETE7 SAFE INACTIVE for SAME review
+
+Formal FIX_BASE2baae7652c450265a56acaf70aba772b0a12a727; SAMEwriter/nohelpers. Exact causalRED43225144081/1/Source276a2dad/job131206290914/art13946878606 (902B/SHA74c63bd2..., strict2JSON/firstsameID), actualpersistedcompletetrue vsfalse/ancillary0/uncertain/disposedfalse/archivedfalse/Dsame/oneattempt/copies0/sourceRetained/poison, CLIexit1/errornull validexpectedtrue. SAFEf7a71closure3da29997 fullyread before conditionrepair. Only this exact precondition authorized the following minimalfix+singleGREEN; no REDrepeat/newdiagnostic.
+
+ONE covering GREEN run43225744579/attempt1/Sourcea015a480c445ae9d8592f04fb506eca9bb8458a0/tree38be0f598803cdae9badb9a24a4e641b89a32006/world5fb78c057b7e80260ae683abf4af892767ce110e/TEMPc317374838bf79ec313e93cbac32b2ba973cb352. Contracts131208323208 terminalSUCCESS; job2026-11-12T13:16:37Z..2026-11-12T13:17:30Z; runcreated2026-11-12T13:16:35Z/terminalupdated2026-11-12T13:17:31Z. Six nativejobs terminalSKIPPED. No MF/I0/actualSDK/businessRoot/native16/clock/runtime.
+
+ExecutedPASS: samefixed5 node --check +locked scopedESLint; unset-group wrapper1/pass1/business0/nooutput; invalidgroup rejection preoutput/I0; unchangedQ8tests8/pass8/fail0/cancelled0/skipped0/todo0. AllF1–F8/currentsealercontrols pass/errornull. New F9 persistedownership assertions execute inside actual CURRENT seven fixedowned Node childcases: normalcomplete true with certaindisposed/archive; each uncertaintycomplete false; persistedancillary exactly original distinctancillarycount; dispose_reject specifically persistedcompletefalse/ancillary0 and SAME originalD with oneattempt/no checkpointcopy/sourceRetained/poison. F5 groupprivatefullevidence16524B/SHA25646246d9f7d0c795f5fd22ff5908df8e745be38f608298ae45ec0b891f51392d4 binds those case results and newpersisted fields; publiccaseCount3 is legacynamedarraycount, not count of seven childcases or nativebusiness16. This is a passed actual-file regression, not a mock completeflag.
+
+Minimalcondition only changes complete boolean, requiring noancillaryfailure AND all actualowned resources certain/attachedMFdisposed/attachedpersistarchived. PrimaryD never added to ancillarycount, originalError/throw object/order, lifecycle originaldisposeattempt, source retention/delete fence/archive/default/production/persistence/SDK/12observer/clock/pins/crypto remain unchanged. Safe noadapter/normal/partialresource semantics preserved; custodycompletion remains separate from business success. No broad ownership algorithm rewrite.
+
+Three FULL strictprofiles positive/readonly/reduction_a all complete/passed with additionalSYN0/3/3; complete validated inventories/preflight JSON retained (M61/QA115, original raw/prefix/SDK pins and observer12+work2/wait2 guarded unchanged in same publicsealer). Actual closed group/profile proofs:
+
+```json
+{
+  "controls": {
+    "purpose": "afw.closed-pure-controls.syn.v2",
+    "source": "a015a480c445ae9d8592f04fb506eca9bb8458a0",
+    "run": "43225744579",
+    "attempt": "1",
+    "groups": [
+      {
+        "group": "F1",
+        "passed": true,
+        "caseCount": 2,
+        "evidence": {
+          "bytes": 904,
+          "sha256": "dcae1ea26b1b09c6f2eacc5fd66701bdb3c61d2ccd431281b3c5325827b0909f"
+        },
+        "error": null
+      },
+      {
+        "group": "F2",
+        "passed": true,
+        "caseCount": 1,
+        "evidence": {
+          "bytes": 3332,
+          "sha256": "dac450adc2e8566f01427d907b835f22a7e64301654f58a58cd9ef5557d12a21"
+        },
+        "error": null
+      },
+      {
+        "group": "F3",
+        "passed": true,
+        "caseCount": 4,
+        "evidence": {
+          "bytes": 5431,
+          "sha256": "d46381213a8df33a326bc10f3b580eb4cbb022f4b742cef29069be1063b9e3d3"
+        },
+        "error": null
+      },
+      {
+        "group": "F4",
+        "passed": true,
+        "caseCount": 1,
+        "evidence": {
+          "bytes": 2528,
+          "sha256": "fde2eea49ef543f0d36347cda87d7035f10657716cc6cd418bff1fb4548bb33b"
+        },
+        "error": null
+      },
+      {
+        "group": "F5",
+        "passed": true,
+        "caseCount": 3,
+        "evidence": {
+          "bytes": 16524,
+          "sha256": "46246d9f7d0c795f5fd22ff5908df8e745be38f608298ae45ec0b891f51392d4"
+        },
+        "error": null
+      },
+      {
+        "group": "F6",
+        "passed": true,
+        "caseCount": 1,
+        "evidence": {
+          "bytes": 218,
+          "sha256": "0cf03851592354cf957c3248d37b1585d924dfc009b79704db924a8145070e5a"
+        },
+        "error": null
+      },
+      {
+        "group": "F7",
+        "passed": true,
+        "caseCount": 4,
+        "evidence": {
+          "bytes": 599,
+          "sha256": "7362a7cc15236bd1958794837bccc943ebf5ea87ef2f3db7c06b8d6382c08036"
+        },
+        "error": null
+      },
+      {
+        "group": "F8",
+        "passed": true,
+        "caseCount": 6,
+        "evidence": {
+          "bytes": 1532,
+          "sha256": "ac5c7c49185dc53cdd285c8e87294359d23d4fbcb31f60ba816c8fa2d3398d68"
+        },
+        "error": null
+      }
+    ],
+    "passed": true,
+    "I0Opened": false,
+    "nativeExecutionProduced": false,
+    "businessCases": 0
+  },
+  "diagnostics": {
+    "purpose": "afw.closed-pure-diagnostic.syn.v2",
+    "source": "a015a480c445ae9d8592f04fb506eca9bb8458a0",
+    "run": "43225744579",
+    "attempt": "1",
+    "profiles": [
+      {
+        "profile": "positive",
+        "stage": "complete",
+        "passed": true,
+        "I0Opened": false,
+        "nativeExecutionProduced": false,
+        "additionalSYNCount": 0
+      },
+      {
+        "profile": "readonly",
+        "stage": "complete",
+        "passed": true,
+        "I0Opened": false,
+        "nativeExecutionProduced": false,
+        "additionalSYNCount": 3
+      },
+      {
+        "profile": "reduction_a",
+        "stage": "complete",
+        "passed": true,
+        "I0Opened": false,
+        "nativeExecutionProduced": false,
+        "additionalSYNCount": 3
+      }
+    ],
+    "allPassed": true,
+    "I0Opened": false,
+    "nativeExecutionProduced": false
+  }
+}
+```
+
+Artifact13946698704 / finite-budget-fixed-preparation-a015a480c445ae9d8592f04fb506eca9bb8458a0, ZIP111751B/SHA256ea941332d156f5d9fbf420f52f6b7b59c88273ea92d9b88a949076dc0421ec5a, created2026-11-12T13:17:25Z/expires2026-11-19T13:17:23Z. FIRST assignedIDdownload SUCCESS and uploaded/downloaded digestmatch; retrieval2/3SKIPPED. Independent exact full10file inventory/context/manifest/local byteequality SUCCESS, manifest1635B/SHA256b19608971e52712348729a7f88234b08607276213caeb9fce42cf780e42af5b7. Exactclosed filenames are the unchanged fixedpublisher inventory: budget-artifact.json,controls.json,diagnostics.json,inactive.json,preflight-positive.json,preflight-readonly.json,preflight-reduction_a.json,preflight.json,q-counts.json,status.json. No Source/rawlog/TAP/stack/credential bytes promoted. Rawpure logs/fullprivategrouptrace retainedrunner-only untilcleanup, not native7d encryptedcustody. Existingnativecustody notrerun/no newkeys. No connector ZIPdownload by writer needed for this GREEN because runner fullsameIDproof+safeDTOlogs complete; Root may perform independent primaryaudit once.
+
+Successful reconciliation changes only workflowevent/name/gates and this append: restore EXACTlatestknownSAFEf7a71f1a0fa4f5ddf069ff411f008a098455e5cc COMPLETE7/MANUALworkflow_dispatch/noinputs/nopush/noschedule/ALL7literalfalse, lateststrictFIXEDsealer and currentwiring bodyunchanged fromreviewFIX_BASE. Coveredworld5fb78c05 remains exact; no post-GREEN code edits. Do NOT restoreunsafeoldc72 or activateNative16. Static sevenjob DAG/role/group/lane/kind/cases remain exactpriorreviewedpreparation; B has no positive/A completion dependency, futureRootpostrunall7terminal proof stillrequired. No extra tests/jobs aftercovering.
+
+Fullref/tree/report/workflowbyteequality/all7false/3190leaves/3183protectedfromNEWFIX_BASE2baae/other6allowedpathhashes/closureSHA0runs/branch0active readbacks follow. Root builds SAMEreviewer FULL2baae765..final forF9+newbreakageonly; priorF1–F8closed. Formalround3 remainsopen pendingreview. Native16/Task2final/GLOBAL296/realPCoff and operationalreadiness remainHELD/false. STOP afterreadbacks; no nextjobs/main/production/Rootdocs/O4/ORD/CF/OAuth/permissions/mail/Max action.

`````

### test/fixtures/finite-budget-world.mjs

`````diff
diff --git a/test/fixtures/finite-budget-world.mjs b/test/fixtures/finite-budget-world.mjs
# before_blob=5f349fdbece8a38f3dc78c82f57131b0efbd01da after_blob=5fb78c057b7e80260ae683abf4af892767ce110e
--- a/test/fixtures/finite-budget-world.mjs
+++ b/test/fixtures/finite-budget-world.mjs
@@ -881,21 +881,21 @@
   // Every partial/fulfilled allocation receives an idempotent fallback attempt.
   await Promise.allSettled(frame.records.map(async record=>{try{await record.dispose();}catch{}}));
   for(const record of frame.records){
    // A pre-assignment allocation can still own a persistence directory.
    if(record.persist&&!record.mf)try{
     const destination=join(frame.root,'owned-partial-'+record.ordinal);await mkdir(frame.root,{recursive:true});await cp(record.persist,destination,{recursive:true,errorOnExist:true,force:false});const files=await inventoryFiles(record.persist);assert.deepEqual(await inventoryFiles(destination),files);record.archive={path:destination,files};record.archived=true;
    }catch(error){ownedFailure(record,'partial_archive',error);}
   }
   primary=frame.operationPrimary??primary??frame.cleanupPrimary??null;
   const phaseFacts=[...(frame.notes??[]),...frame.failures,...frame.records.flatMap(r=>r.failures)],failures=[];const identities=new Set();for(const fact of phaseFacts){if(fact.error!==primary&&!identities.has(fact.error)){identities.add(fact.error);failures.push(fact);}}
-  const result={purpose:'afw.fixed-budget-owned-lifecycle.syn.v1',caseName:frame.caseName,records:frame.records.map(r=>({ordinal:r.ordinal,caseName:r.caseName,kind:r.kind,graphs:r.graphs??[],disposalUncertain:r.disposalUncertain===true,disposed:r.disposed,archived:r.archived,terminalCapture:r.terminalCapture,archive:r.archive,events:r.events,phases:r.phases??[],failures:r.failures.map(x=>({phase:x.phase,name:Object.getOwnPropertyDescriptor(x.error??{},'name')?.value??'Error'})),epochs:r.epochs})),callbackCount:frame.callbacks.length,ancillaryFailureCount:failures.length,primaryPreserved:primary!==null,complete:failures.length===0};
+  const result={purpose:'afw.fixed-budget-owned-lifecycle.syn.v1',caseName:frame.caseName,records:frame.records.map(r=>({ordinal:r.ordinal,caseName:r.caseName,kind:r.kind,graphs:r.graphs??[],disposalUncertain:r.disposalUncertain===true,disposed:r.disposed,archived:r.archived,terminalCapture:r.terminalCapture,archive:r.archive,events:r.events,phases:r.phases??[],failures:r.failures.map(x=>({phase:x.phase,name:Object.getOwnPropertyDescriptor(x.error??{},'name')?.value??'Error'})),epochs:r.epochs})),callbackCount:frame.callbacks.length,ancillaryFailureCount:failures.length,primaryPreserved:primary!==null,complete:failures.length===0&&frame.records.every(record=>!record.disposalUncertain&&(!record.mf||record.disposed)&&(!record.persist||record.archived))};
   try{await mkdir(frame.root,{recursive:true});await writeFile(join(frame.root,'ownership.json'),JSON.stringify(result,null,2));}catch(error){failures.push({phase:'ownership_preservation',error});result.complete=false;result.ancillaryFailureCount=failures.length;}
   const error=primary??failures[0]?.error;if(error){fixedBudgetOwnerErrors.set(error,{primary,failures,result,phaseFacts});throw error;}return result;
  });return frame.closed;
 }
 async function withFixedBudgetOwner(caseName,root,operation,{recovery=false}={}){
  assert(['R1','R2','R3','D1','D2','D3','D4','P1','positive_producer','reduction_producer'].includes(caseName));
  const frame={caseName,root,records:[],callbacks:[],failures:[],closed:null};let value,primary=null;
  return fixedBudgetOwners.run(frame,async()=>{
   if(recovery){assertFixedBudgetAllocationSafe();const r=createFixedOwnedRecord(frame,'recovery');r.attachPersist(join('output','r2-native-'+(caseName==='P1'?'finite-budget-positive':'budget-'+caseName),'state'));}
   try{value=await operation();}catch(error){primary=noteFixedOwnedUnwind(frame,error);}
@@ -1798,28 +1798,35 @@
    registerFixedOwnedCleanup(async()=>{trace.push('sibling');throw B;});registerFixedOwnedCleanup(async()=>{stage.stage='callback';await progress();try{await callback();}catch(error){stage.primary=fixedControlError(error);await progress();throw error;}});return {};
   }
   const evidenceFailure=['evidence_dispose','operation_evidence_dispose'].includes(name),context=createContext({f:fixture,mf:fixture.mf,E,budgetQualification:true,noteFixedBudgetOwnedFailure,root:join(root,'checkpoint'),input:{persist},process:{env:{GITHUB_SHA:process.env.GITHUB_SHA}},json:JSON.stringify,join,
    mkdir:async path=>{if(evidenceFailure&&path==='output/finite-budget/producer'){trace.push('evidence_failure');throw F;}trace.push('mkdir');},
    writeFile:async()=>{trace.push('evidence_write');},cp:async()=>{copies++;afterDisposed=record.disposed;trace.push('copy');}});
   const body=name==='recovery_dispose'?'try{throw E;}'+parts.recoveryCatch:'try{'+(['operation_dispose','operation_evidence_dispose'].includes(name)?'throw E;':['normal','dispose_reject'].includes(name)?parts.continuation:'')+'}'+parts.catchText+'finally'+parts.finallyText;
   stage.stage='actual_body';await progress();try{await new Script('(async()=>{'+body+'})()').runInContext(context,{timeout:1000});}catch(error){stage.primary=fixedControlError(error);await progress();throw error;}return {};
  });}catch(error){actual=error;}
  const expected=name==='normal'?null:name==='callback_dispose_sibling'?A:['operation_dispose','operation_evidence_dispose','recovery_dispose'].includes(name)?E:name==='evidence_dispose'?F:D,saved=actual?fixedBudgetOwnerErrors.get(actual):null,errors=saved?.failures.map(value=>value.error)??[];
  stage.stage='assert';stage.primary=actual?fixedControlError(actual):null;stage.cleanup=saved?.failures.map(value=>({phase:value.phase,error:fixedControlError(value.error)}))??[];await progress();
+ const persisted=JSON.parse(await readFile(join(root,'owned','ownership.json'),'utf8'));assert.equal(persisted.purpose,'afw.fixed-budget-owned-lifecycle.syn.v1');assert.equal(persisted.records.length,1);const persistedRecord=persisted.records[0];
+ stage.persistedClosure={complete:persisted.complete,ancillaryFailureCount:persisted.ancillaryFailureCount,disposalUncertain:persistedRecord.disposalUncertain,disposed:persistedRecord.disposed,archived:persistedRecord.archived};await progress();
+ assert.equal(persisted.complete,name==='normal','round3 actual persisted resource custody completion');
+ assert.equal(persisted.ancillaryFailureCount,errors.length,'round3 primary not counted as ancillary');
+ assert.equal(persistedRecord.disposalUncertain,name!=='normal');assert.equal(persistedRecord.disposed,name==='normal');assert.equal(persistedRecord.archived,name==='normal');
+ if(name==='dispose_reject'){assert.equal(persisted.ancillaryFailureCount,0);assert.equal(actual,D,'round3 same original primary disposer');}
+
  assert.equal(actual,expected,'current exact Node primary identity '+name);assert.equal(attempts,1,'one original disposer attempt');assert.equal(copies,name==='normal'?1:0);assert.equal(fixture.disposedForCheckpoint===true,name==='normal');
  if(name==='normal'){assert(afterDisposed);assert(record.disposed&&record.archived);assert.equal(saved,null);}
  else{
   assert(record.disposalUncertain&&!record.disposed&&!record.archived);assert.equal(await readFile(join(persist,'native.bin'),'utf8'),'SYN fixed round2 inert bytes');assert(!trace.includes('delete'));assert.throws(()=>assertFixedBudgetAllocationSafe(),'uncertainty blocks next allocation');
   if(expected!==D){assert(errors.includes(D),'disposer retained ancillary');assert.equal(errors.filter(error=>error===D).length,1,'propagation deduplicated by identity');}
   if(name==='operation_evidence_dispose')assert(errors.includes(F));if(name==='callback_dispose_sibling'){assert(errors.includes(B));assert(trace.includes('sibling'));assert(trace.indexOf('legacy_restore')<trace.indexOf('dispose'));}
  }
- const result={subcase:name,passed:true,stage:'complete',originalAttempts:attempts,copies,cleanupCalls,flag:fixture.disposedForCheckpoint===true,copyAfterDispose:afterDisposed,primarySame:true,ancillaryCount:errors.length,disposeAncillaryOnce:expected===D?null:errors.filter(error=>error===D).length,sourceRetained:name==='normal'?null:true,poisonPreserved:name!=='normal',exactCurrentBodies:parts.proof,noMF:true,I0Opened:false};
+ const result={subcase:name,passed:true,stage:'complete',persistedComplete:persisted.complete,persistedAncillaryFailureCount:persisted.ancillaryFailureCount,originalAttempts:attempts,copies,cleanupCalls,flag:fixture.disposedForCheckpoint===true,copyAfterDispose:afterDisposed,primarySame:true,ancillaryCount:errors.length,disposeAncillaryOnce:expected===D?null:errors.filter(error=>error===D).length,sourceRetained:name==='normal'?null:true,poisonPreserved:name!=='normal',exactCurrentBodies:parts.proof,noMF:true,I0Opened:false};
  await writeFile(join(root,'result.json'),JSON.stringify(result));return result;
 }
 async function runRound2OwnedControls(){
  const {execFile}=await import('node:child_process'),cases=[];
  for(const name of round2OwnedCases){
   fixedControlProgress('round2_owned_child',{subcase:name,stage:'start'});
   try{
    await new Promise((resolve,reject)=>execFile(process.execPath,['--experimental-vm-modules','test/fixtures/finite-budget-world.mjs','verify-round2-owned-case',name],{timeout:8000,maxBuffer:65536,env:{...process.env,AFW_BUDGET_GROUP:undefined}},error=>error?reject(error):resolve()));
    const value=JSON.parse(await readFile(join(process.env.RUNNER_TEMP,'afw-round2-fixed-owned',name,'result.json'),'utf8'));assert.equal(value.subcase,name);assert.equal(value.passed,true);cases.push(value);
   }catch(error){
@@ -1872,24 +1879,42 @@
   const currentSealerProgram=new SourceTextModule(source+(variant==='failed_logs'?"\nglobalThis.__fixedCurrentInventoryProof=(()=>{\n const expected=expectedInventory('QA'),records=expected.map(path=>({path})),overlap='lib/mcp-qa-finite-owner-native-receiver.mjs',raw=[...descriptors.sourceDescriptors,...descriptors.packages,...descriptors.implementationSupplement.scopeInputPins].filter(row=>row.roles.includes('QA')).map(row=>row.path);raw.push('<stdin>');\n same(raw.filter(path=>path===overlap).length,2);same(expected.filter(path=>path===overlap).length,1);same(expected.length,115);same(expectedInventory('M').length,61);verifyExpectedInventory(records,'QA');\n let rejected=0;for(const changed of [[...records,{path:overlap}],records.slice(1),[...records.slice(1),{path:'<SYN-unknown-input>'}]]){\n  let failed=false;try{verifyExpectedInventory(changed,'QA');}catch{failed=true;}same(failed,true);rejected++;\n }\n return {variant:'current_inventory',passed:true,rawQaExpected:raw.length,uniqueQaExpected:expected.length,categoryOverlap:2,actualDuplicateUnknownMissingRejected:rejected};\n})();\n\nglobalThis.__fixedCurrentRealmProof=(()=>{\n let originalRejected=false,extraRejected=false;\n try{same(__fixedRealmHostEmpty,[]);}catch(error){same(error.code,'ERR_ASSERTION');originalRejected=true;}\n same(originalRejected,true);same(Object.getPrototypeOf(__fixedRealmHostEmpty)===Array.prototype,false);\n same(__fixedRealmEmpty,[]);\n try{same(__fixedRealmExtra,[]);}catch(error){same(error.code,'ERR_ASSERTION');extraRejected=true;}same(extraRejected,true);\n for(const values of [__fixedRealmEmpty,__fixedRealmExtra,__fixedRealmOrdered]){same(values.constructor,Array);same(Object.getPrototypeOf(values),Array.prototype);}\n same(__fixedRealmOrdered.length,__fixedRealmHostOrdered.length);for(let n=0;n<__fixedRealmHostOrdered.length;n++)same(__fixedRealmOrdered[n],__fixedRealmHostOrdered[n]);\n return {variant:'current_realm_array',passed:true,originalHostEmptyRejected:originalRejected,marshalledEmptyAccepted:true,marshalledExtraEntryRejected:extraRejected,vmConstructorAndPrototypeExact:true,valuesAndOrderPreserved:true,orderedEntries:__fixedRealmOrdered.length,node:__fixedRealmNode};\n})();\n":''),{context,identifier:'SYN-current-fixed-closed-sealer'});await currentSealerProgram.link(name=>{if(name==='node:assert/strict')return synthetic(name,{default:assert});if(name==='node:fs/promises')return synthetic(name,exports);if(name==='node:crypto')return synthetic(name,{createHash});if(name==='node:path')return synthetic(name,{join});throw Error('SYN current sealer unknown import');});await currentSealerProgram.evaluate({timeout:1000});
   if(variant==='failed_logs'){assert(context.__fixedCurrentInventoryProof);cases.push(JSON.parse(JSON.stringify(context.__fixedCurrentInventoryProof)));assert(context.__fixedCurrentRealmProof);cases.push(JSON.parse(JSON.stringify(context.__fixedCurrentRealmProof)));}
   assert.equal(processView.exitCode,0,'actual current failure sealer preserved closed evidence');const dest=join(base,'afw-pure-public'),names=await readdir(dest),status=JSON.parse(await readFile(join(dest,'status.json'),'utf8'));assert(names.every(name=>name.endsWith('.json')));assert.equal(status.status,'pure_failed');assert.equal(status.rawObservations.length,4);assert.equal(status.validationFailures.length,variant==='failed_logs'?0:1);
   for(const name of names){const text=await readFile(join(dest,name),'utf8');assert(!text.includes(canary)&&!text.includes('privateStack')&&!text.includes('const source='),'current sealer rejected raw bytes');}
   assert.equal(names.includes('q-counts.json'),variant==='failed_logs');const manifest=JSON.parse(await readFile(join(dest,'budget-artifact.json'),'utf8'));assert.deepEqual((await inventoryFiles(dest)).filter(file=>file.path!=='budget-artifact.json'),manifest.files);
   cases.push({variant,passed:true,actualSealerSha256:hash(source),rawInputs:4,publicRawFiles:0,canaryPublished:false,malformedRejected:variant==='failed_logs'?null:true,closedFailurePreserved:true,sandboxOnly:true});
  }
  return cases;
 }
 
+
+async function verifyRound3OwnedRed(){
+ let stage='owned_case',facts=null,error=null;
+ try{
+  const actual=await runRound2OwnedCase('dispose_reject');stage='ownership_readback';
+  const file=join(process.env.RUNNER_TEMP,'afw-round2-fixed-owned','dispose_reject','owned','ownership.json'),owned=JSON.parse(await readFile(file,'utf8'));
+  assert.equal(owned.purpose,'afw.fixed-budget-owned-lifecycle.syn.v1');assert.equal(owned.records.length,1);const record=owned.records[0];stage='criteria';
+  facts={actualComplete:owned.complete,expectedComplete:false,ancillaryFailureCount:owned.ancillaryFailureCount,disposalUncertain:record.disposalUncertain,disposed:record.disposed,archived:record.archived,originalErrorSame:actual.primarySame,originalAttempts:actual.originalAttempts,checkpointCopies:actual.copies,sourceRetained:actual.sourceRetained,poisonPreserved:actual.poisonPreserved};
+  stage='complete';
+ }catch(cause){error=fixedControlError(cause);}
+ const expectedCausalRed=stage==='complete'&&error===null&&facts.actualComplete===true&&facts.expectedComplete===false&&facts.ancillaryFailureCount===0&&facts.disposalUncertain===true&&facts.disposed===false&&facts.archived===false&&facts.originalErrorSame===true&&facts.originalAttempts===1&&facts.checkpointCopies===0&&facts.sourceRetained===true&&facts.poisonPreserved===true;
+ const result={purpose:'afw.round3-owned-closure-red.safe.v1',source:process.env.GITHUB_SHA,run:process.env.GITHUB_RUN_ID,attempt:1,case:'dispose_reject',stage,facts,error,expectedCausalRed,I0Opened:false,nativeExecutionProduced:false,businessCases:0,...budgetFixedFlags};
+ const root=join(process.env.RUNNER_TEMP,'afw-round3-private');await mkdir(root,{recursive:true,mode:0o700});await writeFile(join(root,'result.json'),JSON.stringify(result,null,2));
+ assert.equal(expectedCausalRed,true,'round3 exact current persisted closure causal deficit');
+ assert.equal(facts.actualComplete,facts.expectedComplete,'round3 persisted uncertain resource custody must be incomplete');return result;
+}
+
 if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href){
  const main=async()=>{
   const [command,root]=process.argv.slice(2);
-  if(command==='verify-round2-owned-case')await runRound2OwnedCase(root);
+  if(command==='verify-round3-owned-red')await verifyRound3OwnedRed();
+  else if(command==='verify-round2-owned-case')await runRound2OwnedCase(root);
   else if(command==='verify-round2-red')await verifyRound2CausalRed();
   else if(command==='preflight-budget')await preflightBudgetCompilation();
   else if(command==='prepare-positive-probe')await preparePositiveProbe(root);
   else if(command==='prepare-positive')await prepareBudgetProducer('positive',root);
   else if(command==='prepare-reduction')await prepareBudgetProducer('reduction',root);
   else if(command==='verify-reduction')await verifyBudgetCheckpoint('reduction',root);
   else if(command==='verify-pair-disposer')await verifyFixedPairDisposer();
   else if(command==='verify-native-preparation-round1')await verifyNativePreparationRound1();
   else if(command==='verify-positive')await verifyBudgetCheckpoint('positive',root);
   else if(command==='inspect-budget-graphs')await inspectBudgetCompilation(root);

`````

## Verdict required
F9ADDRESSED/NOTADDRESSED withfinalfile:line; anyNEWCritical/Important/Minorbreakage infixdiff; out-of-scope observationsnonblocking; formalround3verdict. Purepassedtestsarenative16authority. No implementation orruntime action.
