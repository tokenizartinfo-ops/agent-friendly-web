# Coherent fixed suite: 8 pure tests and 8 original Native cases

Status: binding design prepared after read-only preflight. Source remains HELD until the scoped preflight confirmation and a separate Task 1 release. Root owns the technical decisions under Gabriel's standing instruction to advance AFW autonomously. No request to Gabriel before 08:00 Argentina. This is AFW, not Hermes, Tokenizart or FCO.

## Goal and evidence boundary

Run the existing coherent suite as one current Source/run/attempt: Q8 + P1 + R1/R2/R3 + D1/D2/D3/D4 = 16 TOTAL tests, including 8 Native cases. Reuse the original seven-job producer/consumer graph and business oracles, remove broad key exposure, add an independent eighth KEYLESS verifier, and return a current two-JSON SAFE with confidential runner-only Native evidence.

The previous Native R1 unit is complete at Rootdocs 59e8d17b. Its real pass is Source416c67646ff502f2781e9c11c3595b7ec17bf778/run43379486549; corrected548c68f8 is KEYLESS-only qualified. Neither proves this coherent suite. All five flags remain exactly false: operationalReadiness, completePackage, PCoff, globalNativeDrainVerified, sdkNamespaceEmptyVerified. No real AFW deployment, notification, owner operation or PC-off claim.

Chosen architecture: reuse original seven jobs, existing World/oracles and private coherent proof. Do not shard the R1 typed adapter across eight cases, create another business oracle, add a generic framework, or skip to a live trial.

## Immutable workspace and Source limits

Repository tokenizartinfo-ops/agent-friendly-web, ID1347578006. Source branch feat/finite-native-cleanup-20261101. CLOSED BASE0479fdd5db3b957ecbb9302e8a45ac88f333fcba/tree8942513f440fd25b188c196090e790a561bdb688, 3195 leaves. Main0c9c475b3ebaa970fc11d628b40e50a90cceb727 is not changed.

Only temporary .github/workflows/afw-finite-budget-qualification.yml (F7) and NEW docs/superpowers/reports/2026-11-13-coherent-suite-qualification.md may change. After closure: 3196 leaves, every one of the 3195 BASE leaves/type/mode/blob exact, including protected R1 report f7aa7d2a3fbdc07c480e446e3860afe2dc559f35 (62739 characters), all62 workflows exact, main unchanged. Append new suite report as a complete preserved prefix after Task1.
Exact F7 rollback: blobf7a71f1a0fa4f5ddf069ff411f008a098455e5cc,126209bytes,SHA2561e7af2274e24c40db704f26baaacdb7f7ed1884903852e8237a35552aaed282a; original manual/no-input/no-push/seven false&& guards.

Cloud GitDB/CAS/Actions only; one Source writer. No local Source files/worktree/clone/dependencies/build/eval/import/SDK/MF/Source execution. Public Source strings, hashing and metadata in RAM are allowed. Root never implements Source. No private artifact bytes, cipher/model/plaintext/producer logs or actual key to Root/MCP/PC/chat/Git. Root may fetch only current approved SMALLSAFE and KEYLESS records, and private metadata only. No CF API/runtime/deploy/OAuth/OTP/new keys/tokens/permissions/Max/mail/main/PR/merge.

Protected Source pins:
- test/finite-budget-diagnostics.test.mjs pureTestBlob1f8b02d5b2dddb474c7db7daa04aa24e2dc948d8.
- test/mcp-qa-finite-budget-native.test.mjs nativeTestBlob533dafb5df5f8e57442c5b9029dc8dec6dded434.
- test/fixtures/finite-budget-world.mjs worldBlob0631f9a44cbb37bec3ed1a2c3dc09ee93b86661b.
- test/fixtures/finite-checkpoint-custody.mjs custodyBlob4d05b5ec0f7b074be88ef9733a47c984b0212351.
- package-lock.json lockBlob36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b; packages['node_modules/@cloudflare/workers-oauth-provider'].version is1.2.1. Read as JSON, never import SDK in KEYLESS.
- Node22.23.4. Original tests/assertions/groups, R120s, P/D300s, C0=I0+900000, C1=C0+180000, root30s/child5s unchanged.

## Original DAG and causal observations

Preserve dependencies and timeouts exactly:
contracts2min; positive_prepare15 needs contracts; positive_consume15 needs contracts+positive_prepare; reduction_prepare15 needs contracts; reduction_consume_a15 needs contracts+reduction_prepare; readonly7 needs contracts; reduction_consume_b15 needs contracts+readonly+reduction_prepare.
Add verify2min, needs all seven, always() with fixed scope. Never add positive/A as dependencies of B: that would serialize the replicas.

B must wait for six exact successful legacy peers: contracts,positive_prepare,positive_consume,reduction_prepare,reduction_consume_a,readonly. Require seven unique legacy identities including own reduction_consume_b currently in_progress. The optional verify job may be absent from early Jobs API, or present only nonexecuting pending/queued/waiting/requested; reject unknown/duplicate identities. Do not require a downstream job to be materialized early. Preserve original peer collector startedAt+780000, <=120 polls,10s metadata/5s waits, <256 request records. Use attempt1 current-run API.
Native peak intervals use exactly six Native job names, not contracts or verify. Use finite start/end, own end at one observed timestamp, end before start on ties, peak1..3, MF/job bound2/global bound6. These are bounds, not a namespace/drain observation.

B projects six observed successful peers and its own in-progress observation. Independent verify checks all seven actual terminal outcomes and direct needs outputs. Root checks all eight after completion. B never claims its own future success, all-seven final success or verifier success.

## Key confinement and preserved legacy operations

Remove six job-level AFW_SYN_CHECKPOINT_KEY expressions (baseline F7 L347/507/716/876/1085/1251). Keep the existing six afw-finite-syn-checkpoint environment associations. Bind existing real key only at trusted generic-custody key-preflight/seal/open steps, never checkout/setup/npm/copy/general manifest preparation/network/World/SDK/Native/projection/verifier.
Split install+key-preflight (L376 and analogues). Move copy and job-manifest creation outside generic seal. Remove unused World imports from all six own opens (L466 and analogues). Split producer auth L583/952/1327 into keyless metadata/raw validation, key-only generic open, keyless World validation. Split B aggregate L1376 into keyless collector/download, fixed five generic key-only opens, then keyless original World aggregation. Builtins needed by generic crypto are allowed. No protected World edits.

Keep original Native commands/groups/TAP checks, all producer/consumer checkpoint identities, pairSize2/restartfalse/shared clock, actual A/B overlap and all four ready<=C0-30000; 5 lineages/10 M-QA graphs and complete single initial ownership records.
B original manifest uses legacy COMPOSITE COMMAND_OK=native step success AND aggregate success (F7 L1481/1491/1493). Preserve it: native passed/aggregate failed yields consumer-failure and commandSucceeded:false. Public command separately records the observed exit of the full original Native+mandatory TAP step (L1368–1375). Do not infer a nonzero Native exit from that composite false field. Skipped/interrupted without observed exit => not_observed.

## Pure and private artifact linkage

Preserve F8 sealer literal19126bytes and its functional public Source-only upload (F7 L118–246) unchanged. No extra encrypted pure checkpoint. Add contracts outputs artifact-digest from upload and manifest-sha256 from pure_verified. All six Native jobs before I0 validate exact assigned needs.contracts ID/digest/manifest SHA, current metadata name/run/head/ref/nonexpiry; original verifyBudgetArtifact plus status pure_passed, all original outcomes successful/no validation failures, Q8/8, F1–F8 and exact ordered three profiles positive/readonly/reduction_a (no I0 or Native; additionalSYN [0,3,3], alias equality). Preserve original World prepared-input checks before I0.
B downloads bounded raw pure ZIP to hash against upload/API, reuses exact-ID materialized pure directory and original manifest verification; do not generic-unzip it or call it confidential Native evidence.

Five peer private refs plus own B ref retain actual IDs/digests/kinds. Compare opened consumer producer-binding.json against actual producer identities, in addition to original all-D producer/checkpoint/C0/C1/manifest checks. Independent receiver compares all seven refs (pure + six Native) to direct needs outputs and current by-ID metadata, including job identities. No fabricated/fallback artifact.

Original B writes private coherent-proof.json. Seal it with original full private evidence. Own exact-ID reopen must verify metadata+raw ZIP+AEAD, exact original/reopened job manifest, keyless success-kind World manifest validation, reopened proof bytes equal original bytes and captured digest, current identity and full proof checks BEFORE SAFE projection. No circular self-artifact ID inside private proof. Failure-kind manifest validation preserves original composite semantics, fixed identity/role/group/cases and explicit failure-kind; don't call the success-only World validator on failure-kind.

## Qualified code and caps

Historical inactive548c68f8e6df77a36da322735828ca4aaaf7842f/F7blob003d3af2908cb261138851eda13c4a8428d27390:
- L232–249, strip ten spaces from each line plus final LF: generic PRIVATE_CAP/rangeEnd/CRC/decodePrivateZip stanza3380bytes/SHA2564ff44bd3adda54eb0816fab275e4b13078005d1bd1a4626cfbf67d31e8bf7af8. Embed exact in adapter with needed builtins/need/same. Do not copy R1 typed validators.
- L745–852 NODE_SAFE_ZIP body13305bytes/SHA256b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d, unchanged.

ZIP3 exactly envelope.bin/manifest.json/receipt.json; envelope<=128MiB, JSONeach<=4096, expanded<=134225920, raw<=136314880, complete classicZIP/CRC/local-central/descriptors/ranges/EOF validation. B original tighter raw134283264 remains in addition. Custody original4096 files/512MiB plain/768MiB JSONL/128MiB envelope/128KiB record/65536chunk/4096header unchanged. Normal archive1..512files/128MiB vs partial original general custody domain including empty; don't conflate domains.
Pure original raw outer134283264 and perJSON2097152 remain separate. SAFE raw<=131072/combinedJSON<=65536. Retain14 SAFEZIP controls+two capture/rejection seams=16, separate from six wrapper controls, not business cases.

## Four Source-bound helpers

Unique markers/files, exact ten-space depad/final LF:
NODE_SUITE_ADAPTER→afw-suite-adapter.mjs; NODE_SUITE_CONTROLS→afw-suite-controls.mjs; NODE_SUITE_VERIFIER→afw-suite-verifier.mjs; NODE_SAFE_ZIP→afw-suite-safe-zip.mjs.
Every consumer bootstraps from current Source before imports: fixed repo/id/ref/attempt/path/Node, git HEAD/tree/current whole F7 Git blob, fixed Source pins/SDK JSON version, four unique bodies/distinct SHA256, exact qualified ZIP3 subbody and SAFEZIP hash. Exclusive fixed runner.temp files0600 and program map. Same four bodies in inactive/KEYLESS/actual overlays; context Source/tree/workflowBlob are current, not recursive embedded self-hashes. Whole workflowBlob binds legacy inline code.
No helper top-level World/SDK/Native import; actual World semantic wrappers keyless. No arbitrary transport/directory/fixture override from CLI/env. Direct internal IO seams may inject inert fixtures only in controls; actual entry always uses fixed IO.

Adapter APIs: validateSourcePins(); validatePeerInventory(jobs,observedAt); validateAssignedMetadata(meta,expected={job,kind,id,zipSha256}); bindPure(readback,assignment,manifestSha256); assignedPrivate(binding,destination) with fixed internal paths; decodePrivateZip(bytes)→Map; validateReopenedSuite({proofBytes,originalProofBytes,originalManifestBytes,reopenedManifestBytes,ownBinding,expectedContext,expectedPeers}); makeSuite({context,sourcePins,programHashes,command,aggregate,pure,custody,proof,failure}); validateSuite(result,expected); validateControls(result,expected); makeManifest(kind,resultBytes,context); publishPair(kind,result).
Verifier APIs: validatePair(files,kind,expected); verifyRoute({kind,id,uploaded,expected},io=fixedGitHubIO)→{readback,valid}; verifySeven(jobInventory,needs,result)→{accepted,sevenTerminal,sevenSuccess}; verify() fixed job entry.
Controls runControls(); unchanged SAFEZIP exports bindRawZip,decodeSafePair,downloadAssignedZip,runZipControls,ZIP_CONTROL_IDS and existing helpers.

## Exact public schemas

Only own enumerable fields, no extra/sibling properties; arrays preserve specified order. IDs are positive canonical decimal strings safe-integer roundtrippable; git hashes40 lowercase hex, SHA25664. JSON compact JSON.stringify(value)+'\n', fatal UTF8/canonical-byte roundtrip. Objects compare exact fields/values without requiring a JSON object key order. Same common context/pins/hashes in suite and controls:
context={repository:'tokenizartinfo-ops/agent-friendly-web',repositoryId:'1347578006',ref:'refs/heads/feat/finite-native-cleanup-20261101',source,tree,workflowBlob,run,attempt:1,node:'22.23.4'}.
sourcePins={pureTestBlob,nativeTestBlob,worldBlob,custodyBlob,lockBlob,sdkVersion:'1.2.1'} with exact values above.
programHashes={adapter,controls,verifier,safeZip}; current Source bootstrap values, SAFEZIP fixedb36.
Suite result={purpose:'afw.coherent-suite.safe.v1',context,sourcePins,programHashes,status,command,aggregate,pure,custody,proof,failure,...fiveFlags}.
pure=null or {artifactId,zipSha256,manifestSha256,profiles:['positive','readonly','reduction_a'],purePassed:true,beforeI0:true}.
command=not_observed|failed|passed; aggregate=not_observed|unverified|verified.
custody={state:'unavailable',artifact:null} OR {state:'assigned'|'reopened',artifact:{id,zipSha256,kind:'consumer-failure'|'reduction-result-b'}}. Assigned means complete actual upload ID/digest received, NOT metadata verification. Preserve assignment on later metadata failure. Reopened requires metadata/raw/AEAD/inner checks, and successful kind requires reopened proof validation.

proof=null unless status passed, otherwise exact:
{counts:{Q:8,P:1,R:3,D:4,native:8,tests:16,pass:16,fail:0,cancelled:0,skipped:0,todo:0},cases:['P1','R1','R2','R3','D1','D2','D3','D4'],lineages:5,graphs:10,replicaOverlap:true,allFourReadyBeforeC0Minus30s:true,sharedReductionClock:true,C0MinusI0Ms:900000,C1MinusC0Ms:180000,observedNativeJobPeak:int1..3,nativeJobBound:3,miniflarePerJobBound:2,globalMiniflareBound:6,privateProofSha256,peerJobs:[{name,jobId,status:'completed',conclusion:'success'} exactly contracts,positive_prepare,positive_consume,reduction_prepare,reduction_consume_a,readonly],selfJob:{name:'reduction_consume_b',jobId,status:'in_progress',conclusion:null},peerArtifacts:[{job,kind,artifactId,zipSha256} exactly positive_prepare/checkpoint,positive_consume/positive-result,reduction_prepare/reduction-checkpoint,reduction_consume_a/reduction-result-a,readonly/readonly-result],requiresRootAllTerminalReadback:true}.
Derive booleans/counts from validated reopened private proof. No public private timestamps/graphs/models. Pure and own B refs remain sibling fields, not repeated inside proof.

### State table and truthful failures

- pure null => command/aggregate not_observed. command failed/passed requires verified pure.
- command not_observed or failed => aggregate not_observed; command passed permits aggregate not_observed/unverified/verified.
- Assigned/reopened kind is reduction-result-b iff command passed AND aggregate verified, otherwise consumer-failure, preserving legacy composite.
- passed iff command passed, aggregate verified, pure present, successful-kind reopened and proof valid; failure=null/proof present.
- failed iff original full Native+TAP step has observed nonzero exit; failure={stage:'native_b',reason:'command_failed'}, proof=null; preserve any actual custody assignment.
- Other nonpass is unavailable/proof=null, first primary failure:
  pure null→pure/pure_unverified;
  pure present+command not_observed→native_b/not_observed;
  command passed+aggregate not_observed→aggregate/not_observed;
  command passed+aggregate unverified→aggregate/evidence_unverified;
  aggregate verified and assignment missing OR assigned metadata/raw not verified→custody/assignment_unverified;
  assigned metadata/raw verified but AEAD open failed→custody/reopen_unverified;
  AEAD open succeeded but inner manifest/proof mismatch→custody/proof_unverified (keep assigned, not reopened).
No publication_unavailable inside an existing SAFE result. Missing both SAFE outputs or confirmed scoped metadata404 => verifier-only publication_unavailable; partial/malformed/non404/transport/permission => invalid_evidence, retain any valid known ID, never a ZIP claim or fallback.
Publish failure pair via always()&&!cancelled()&&trusted bootstrap success BEFORE final failing actual_outcome. Upload only successful pair writer. B safe outputs remain assigned even if final job fails. Skipped/lost producer may yield no SAFE; valid failed/unavailable envelope is not a suite pass.

Controls result exact:
{purpose:'afw.coherent-suite.controls.safe.v1',context,sourcePins,programHashes,status:'passed'|'failed',expected:6,completed,passed,failed,inventory:[{id,status:'passed'|'failed'|'not_executed'} exactly six IDs below],firstFailure:null|oneID,realCustodyKeyBound:false,NativeExecuted:false,SDKImported:false,MFAllocated:false,...fiveFlags}.
Stop first failure: exact passed prefix, one failed, remaining not_executed. Passed iff all6; otherwise failed exactly1.
Both outputs exactly result.json and manifest.json. Manifest exact={purpose:'afw.coherent-suite-manifest.safe.v1' OR 'afw.coherent-suite.controls-manifest.safe.v1',source,run,attempt:1,files:[{path:'result.json',bytes,sha256}]}; validate entire object. No self SAFE ID inside payload.

## Fixed controls and output wiring

Six wrapper IDs in order:
1 dag_peer_inventory: exact deps/names/peers/optional receiver/finite intervals/native-only peaks/actual overlap; missing/duplicate/extra/receiver included rejected.
2 key_scope: actual workflow AST/text scopes, six existing environments, generic-only key-bound crypto, no key at application/network/World steps; inert env restoration.
3 fixed_case_counts: current pins and original full group/TAP commands,8pure/8Native/16total, original clocks and all cases, F8 literal+functional upload unchanged; altered counts/cases/clocks rejected.
4 metadata_custody_binding: current assigned ID/digest/head/ref/expiry/raw SHA/inner identity/pure profiles/status/manifest; actual inert generic AEAD reopen, corrupted/wrong proof bytes rejected; exact qualified ZIP3 and original caps.
5 incomplete_or_contradictory: state table incl native-pass/aggregate-fail legacy composite, missing/partial assignment,404 vs non404, always guard hazards, sibling keys, retained known ID/no fallback/false pass.
6 coherent_current_pair: same real make/publish/verify seams using inert pair; direct seven-job needs/eight-job closure; mutate every flag/profile/context/pin/run/source/receiver placement/extra field/lineage/count/status and require rejection.
Controls never import original NativeTest/World/MF/SDK or use actual key. Generic inert fixture crypto only in isolated subprocess with fixed inert32 key and generic custody module.

contracts outputs artifact-id,artifact-digest,manifest-sha256. Six Native jobs retain artifact-id,artifact-digest,kind. B adds safe-id/safe-digest from summary_upload. keyless_controls adds same safe outputs. Native SAFE name afw-coherent-suite-safe-${run}-1; controls afw-coherent-suite-controls-safe-${run}-1; retention7days.
KEYLESS job keyless_controls7min runs node "$RUNNER_TEMP/afw-suite-controls.mjs", no npm; keyless_verify2min always() runs node "$RUNNER_TEMP/afw-suite-verifier.mjs", all16ZIP controls plus current pair verification. Task1 declares all eight actual jobs literally false plus two KEYLESS=10jobs; exact8skipped+2success/run success is qualification pass.
Actual Task2 declares only original seven+verify=8, same four bodies; one run/attempt1.

Verifier emits exactly one bounded <=4096B record:
{marker:'AFW_COHERENT_SUITE_READBACK/1',kind:'suite'|'controls',source,run,attempt:1,artifactId:null|ID,uploadedDigest:null|H,status:'verified'|'unavailable',reason:'none'|'invalid_evidence'|'publication_unavailable',proof:'strict_current_safe_pair'|'absent',metadataBytes:null|positiveInt,metadataDigest:null|'sha256:'+H,rawZipBytes:null|positiveInt,rawZipSha256:null|H,resultBytes:null|positiveInt,resultSha256:null|H,manifestBytes:null|positiveInt,manifestSha256:null|H,expiresAt:null|validISO,producerStatus:null|'passed'|'failed'|'unavailable',upstream:'all_seven_success'|'not_all_seven_success'|'unverified'|'not_applicable',accepted:boolean,programHashes,...fiveFlags}.
Verified transport/schema requires strict current pair/digest triple; accepted also controls success OR all seven actual successful/current needs and suite passed. Valid closed nonpass can be transport verified but accepted false/job fail. Root actual pass additionally all8successful/current run completed success.

## Execution gates, rollback and review

Task1: inactive complete eight-job candidate/four fixed bodies; ONE KEYLESS push-only self-path/Source-branch/unique-commit-message/attempt1 overlay (8disabled+2active). Freeze Source. Wait run complete and exact10terminal; restore exact F7, new report and all preservation readbacks; STOP. Fresh task spec+quality CLEAN, then separate Root Task2 release.
Task2 fresh sole Source executor: one activation with same bodies, original groups/semantics/key confinement; Source frozen. Any outcome wait run completed/all8terminal, exact restore/report prefix append/all preservation readbacks; STOP, no auto-repeat/clock/cap changes. Root independently current SAFE, KEYLESS records, private metadata; fresh task and whole-plan review.

Rollback-only exception: if completed Actions run positively materializes a subset/zero jobs (e.g. parser failure), wait all actually present jobs terminal, all five scoped branch-active inventories zero, same frozen Source tip and rollback rechecked; restore and report exact declared/materialized/missing sets as unavailable/unqualified. Do NOT invent skipped jobs, claim qualification/pass or retry. Missing/unavailable API is uncertainty, not a positive empty list; bounded read-only reconcile first.
No merge/promotion to main. All flags false regardless success.

## Clarified internal argument — Task1 builder question

validateReopenedSuite.expectedPeers is exactly {pure:{artifactId,zipSha256},peers:[five exact {job,kind,artifactId,zipSha256} in the public peer order]}. Compare all six reopened original private receipt refs. Pure manifest SHA remains independently bound by bindPure/current contracts output; do not add a redundant private proof field or change the public DTO. This is a fixed internal value, no transport or user override.

verifyRoute.valid is the parsed strictly validated PUBLIC suite/controls result object, or null for invalid/unavailable; it is not a boolean. readback is the closed record under construction and is emitted exactly once after verifySeven sets upstream and accepted (controls: not_applicable). accepted remains a boolean, false for nonpass or unverified upstream. No additional return/public field or refetch is required.

## Fix-round 1 binding rulings (initial seven Important findings)

These supplement the binding design for correction, not a new product direction. All seven findings remain open until a scoped re-review. No adjudication or parking; actual Task2 remains held.

1. Scope test mutations to exact actual job and step, require exactly one target, prove target changed while intended non-target code unchanged. Do not let a mutated validation helper/self-hash stand in for the behavioral assertion.
2. A verified pure receipt is written only after original verifyBudgetArtifact, profile selection and preflight materialization have all succeeded. Public pure additionally requires the real pure_binding step success; a leftover file cannot grant verification. Exercise original-stage failure after adapter checks with fixed inert inputs.
3. Add one private-only field observedAt (positive safe integer UTC epoch ms) to original coherent-proof.json. Capture Date.now() ONCE with the successful final jobs inventory, use the same value for original native interval sweep and store it. Authenticate it by the existing exact private proof-byte/captured-hash/AEAD path. Reopening recomputes peak from those exact jobs and observedAt, requires equality with captured peak and projects recomputed value. Require actual self start<=observedAt<=own manifest sealedAt; all observed peer ends<=observedAt. Never synthesize it from +780000; poll deadline and900000/180000 protected clocks unchanged. Exact occurrenceProof.caseName order positive_producer,reduction_producer,R1,R2,R3; lineage.kind remains positive,reduction,R1,R2,R3. No public timestamp or field added.
4. B's early inventory rule stays exactly as before. Final running verify has exact8 unique jobs, self verify in_progress and seven terminal legacy identities, all direct needs aligned. Query /actions/runs/{currentRun}/attempts/1/jobs?per_page=100 at both B and verifier. Missing/nonterminal observations mean upstream unverified, not an observed failed conclusion. Terminal but not all successful means not_all_seven_success. Reconcile every available direct needs assignment, including on nonpass: complete IDs/digests/kinds against current by-ID metadata; missing outputs from skipped/failed jobs are missing evidence, never fake assignments. Compare any public refs against direct needs; proof remains null on nonpass. Do not decrypt/read private bytes in verifier.
5. reason refers to pair transport/schema validity: once a strict pair is verified retain status verified/reason none/proof strict_current_safe_pair even for valid nonpass or unverified upstream; accepted=false/upstream separates rejection. Malformed pair remains unavailable/invalid_evidence/absent. A receiverControls failure AFTER trusted bootstrap must emit the same closed <=4096B unavailable/invalid_evidence/absent record with known safe output ID/digest retained, no unverified ZIP claims; no loose unstructured-only catch. Separate closed ZIP-control failure record may identify fixed failure ID; do not add public fields/artifacts.
6. Existing four bodies own the real workflow decisions. Add adapter projectSuiteOutcome({outcomes,receipts}) -> exact SuiteResult using existing bound context/pins/hashes and makeSuite. outcomes is the fixed internal six-field object {pureBinding,native,aggregate,ownMetadata,ownOpen,ownValidation}, each a captured GHA step outcome success|failure|skipped|cancelled|not_observed; receipts is {pure,assignment,proof}, validated internal receipts or null. Map actual fixed step IDs in the wrapper, require pureBinding success before pure projection, distinguish metadata/open/inner failures and preserve actual upload assignment. Contradictory observed-native-after-failed-pure is rejected, not silently erased. Preserve original Native/TAP blocks byte-exact.
   Add verifier reconcileSuite({route,jobInventory,needs},io=fixedGitHubIO) -> existing {readback,valid}; actual verify() uses it and fixed IO; controls exercise same final decision path including direct assignment metadata and source/attempt/currentness failures. Internal test IO only, no CLI/env/transport override. It can call existing verifySeven/verifyRoute; no duplicated test-only business model. Assert actual publication/final-truth gate ordering and eligibility, every26 key-bound job/step identity, and complete F8 upload action semantics/whole unchanged original block.
7. Internal operation enum may be a third argument to existing private metadata/raw readers, selected only by fixed trusted wrapper call sites: b-peer (five encrypted peers plus raw pure at B) raw<=134283264 and timeout20000; generic-private own/producer raw<=136314880 (130MiB), expanded<=134225920, existing30000 raw timeout retained; pure remains raw<=134283264/perJSON<=2097152; suite/controls SMALLSAFE131072/65536. Do not infer B-peer scope merely from GITHUB_JOB because B's own artifact is generic-own. No arbitrary user timeout/cap override or increased B timeout. Qualified ZIP3/SAFEZIP code remains exact. Test domain edges with inert metadata/streams without allocating huge fixtures.

M1 is recorded as Minor; fixed named subcase start/pass/failure diagnostics are elected as part of F1/F6 to localize the next one-run result, while the public controls DTO stays six IDs. No raw exceptions/values/paths. Format changed control bodies legibly; no unrelated style rewrite.

### Fix1 aggregate-entry clarification

The split keyless aggregate step may use always() && !cancelled() && original native-step success && trusted bootstrap success. It must require all fixed peer collect/open steps successful BEFORE any World import or aggregate read. A failed prerequisite then produces an observed aggregate gate failure/evidence_unverified, matching the original combined aggregate phase, rather than fabricating an outcome or importing partial material. Actual captured six outcome fields remain authoritative. Preserve original happy-path World oracle, Native/TAP bytes, legacy B composite and all clocks. Cover failed/skipped prerequisite mapping through the shared projection entry point.

### Fix1 complete pure-binding receipt seam

Adapter finalizePureBinding(receipt, originalWork, io=fixedReceiptIO) runs the fixed actual closure containing unchanged original World verification, profile selection and preflight materialization without key scope. It performs the fixed exclusive receipt write only AFTER that closure succeeds. Actual caller uses only that fixed closure/IO; no CLI/env/path override. Inert controls first run real bindPure, then a rejecting original-stage callback/capture IO and prove zero receipt writes; successful callback proves one exact write. Public projection still requires captured pureBinding success, so any leftover file cannot authorize verification. No World/SDK import in KEYLESS or replacement of original World business checks.

## Fix-round2 binding corrections

Task1 prior Fix1 review: F2/F3/F5/F7 addressed; F1/F4/F6 remain open; new F8 Important. No parking/adjudication; actualTask2 remains held. Only these open findings and regressions introduced by their correction enter the next scoped review.

- Every Source text mutation must complete selection, unique-target checks, transformed-region checks and unchanged-boundary checks OUTSIDE the expected-validator-rejection assertion. An identity rename uses the original selected byte range (or explicit new identity) to prove its target; it never tries to resolve the changed step through its old ID. Only the actual validator invocation is wrapped in assert.throws. A missing/ambiguous mutation target must FAIL the control, not satisfy a negative validator assertion.
- Shared reconcileSuite must observe final attempt1 jobs and reconcile every complete available direct needs assignment independently of route.valid. Missing or partial SAFE retains its original unavailable/publication_unavailable or invalid_evidence/absent record and any valid known SAFE ID, accepted=false; it still obtains jobs/current direct metadata (never private bytes). Do not make a SAFE metadata/ZIP request for missing outputs, or a SAFE ZIP request for partial outputs. Separate direct private/pure assignment metadata calls from SAFE retrieval in control counters. Incomplete jobs remain unverified; terminal known failures remain not_all_seven_success; no invented outputs.
- Restore direct verifyRoute tests for no outputs and ID-only (plus other malformed/partial cases already mandated): classification, zero SAFE fetch/ZIP, known-ID retention and no false proof. Exercise these through actual reconcileSuite with complete known direct assignments and assert all expected metadata calls, even though no valid SAFE DTO exists.
- Add adapter loadProjectionReceipts({outcomes,assignment},io=fixedProjectionIO) -> existing {pure,assignment,proof}, used by the ACTUAL B publisher before existing projectSuiteOutcome. outcomes is the existing exact six captured step outcomes. Read/parse fixed pure-assignment.json ONLY when pureBinding=success. Read/parse fixed suite-proof.json ONLY when ownValidation=success AND actual assignment kind=reduction-result-b AND native/aggregate success. Otherwise return null for the ineligible receipt without touching its bytes. Preserve complete actual assignment independently of file read. Actual IO uses only those two fixed private runner paths; control IO supplies unreadable/truncated inert receipts, no CLI/env/path override.
- Cover pure binding write failure leaving truncated receipt (pureBinding=failure/native skipped => no read, pure_unverified) and own proof write failure leaving truncated receipt (ownValidation=failure after assigned/open => no proof read, proof_unverified with known assignment). These are newly introduced failed-outcome paths, not arbitrary corruption after a successful trusted stage. A parse error after an eligible claimed-success receipt is unexpected invalid evidence, not authorization to invent a command outcome or relax the public schema.
- Append a transparent correction to previous test-coverage claims: FIX1's 6/6 published result and phase records remain actual evidence, but the identity-rename assertion did not establish that its validator was reached. Preserve prior report in full, do not rewrite history.

All prior clocks, original Native/TAP/F8/DAG, Source pins, four bodies, current schemas, qualified ZIP3/SAFEZIP, source-only/no actualkey/SDK/MF/World qualification, caps and closure requirements remain.

### Fix2 suite versus controls graph

The final attempt1 eight-job/seven-direct-assignment reconciliation applies only to kind suite, including a null suite route. Kind controls retains its separate keyless_controls needs and ten-job qualification graph; do not invent Native needs or apply the suite eight-job rules to that path. Both kinds retain exact absent/partial SAFE route classifications and bounded records. Cover missing/partial suite through reconcileSuite with seven fixed needs and direct verifyRoute absent/ID-only no-SAFE-traffic tests.
