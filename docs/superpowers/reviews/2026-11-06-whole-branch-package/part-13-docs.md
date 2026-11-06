# Whole-branch review packet 13/26 — docs

PROJECT=AFW; repository=tokenizartinfo-ops/agent-friendly-web; SOURCE head=8b2380c9bcc9c383ec46590df1403eed19fd2659; tree=07079c8cc3670a6a1db51ca1daadbf3172c2d445; mergebase=f4ff51596be918e9d556f6765aeb0441133ff52f. Review index in this directory is authoritative for complete579file/954commit coverage. This packet contains full U10 diffs and exact blob provenance for 20 files; no runtime or merge authorization. Generated in cloud tool memory from pinned GitHub text, no local checkout/build.

## Packet manifest

- docs/superpowers/plans/2026-11-01-finite-material-bootstrap-correction.md: ABSENT -> e2f589ef61cdf5fa743f30094c8b62bee2e4c166; full diff chars=13568
- docs/superpowers/plans/2026-11-01-finite-native-confirmation-cleanup.md: ABSENT -> 95b4c6b6289438615cec2c301da8599c93c2fe7a; full diff chars=23685
- docs/superpowers/plans/2026-11-01-finite-native-launch-adoption.md: ABSENT -> 0d8e889e637abd0b23858623b6ba577bbe046329; full diff chars=16190
- docs/superpowers/plans/2026-11-01-finite-private-policy-setup.md: ABSENT -> 3636bcf3e25ffbeea94a3ee4f5370e99cba680fc; full diff chars=96537
- docs/superpowers/plans/2026-11-01-finite-profile-package.md: ABSENT -> 11ab00392a760c511941d24c6339210394077342; full diff chars=17163
- docs/superpowers/plans/2026-11-02-finite-initial-cleanup-owner.md: ABSENT -> a81076099cdeb171ef671d1d01217fcb707e5e86; full diff chars=5097
- docs/superpowers/plans/2026-11-02-finite-initial-inactive-upload.md: ABSENT -> 5d32352cb983f708198020547c75ff4c3ac7bfa6; full diff chars=2066
- docs/superpowers/plans/2026-11-02-finite-initial-native-entry.md: ABSENT -> bc5f655211c166359edb35b7066e0374a4ee2844; full diff chars=4709
- docs/superpowers/plans/2026-11-02-finite-premature-admission.md: ABSENT -> 934be2bc53745fc45e1bda3fb5d6e00d1e0c5955; full diff chars=9273
- docs/superpowers/plans/2026-11-03-finite-initial-activation.es.md: ABSENT -> 7b064396c5e0e930ff3800594a8e7f0c25e4474c; full diff chars=3043
- docs/superpowers/plans/2026-11-04-finite-closed-prearm-policy-conversion.md: ABSENT -> 63749de6d73e37fca57f26f50270aead995a804a; full diff chars=20413
- docs/superpowers/plans/2026-11-04-finite-known-profile-compatibility.md: ABSENT -> 1d489683323bcf0f6d7e9d7113a41b876f829ea9; full diff chars=21679
- docs/superpowers/plans/2026-11-04-finite-owner-native-conduit.md: ABSENT -> b83e107a290cd5efb01f8da607f17132aab64d5c; full diff chars=7694
- docs/superpowers/plans/2026-11-04-finite-owner-phase-context.md: ABSENT -> b3d85225dbe93abefba12ed80fc685eedcd8fe87; full diff chars=19910
- docs/superpowers/plans/2026-11-04-finite-owner-sdk-owned-recheck.md: ABSENT -> 4d8f17475dbf4c77ff2284b0802d51814d89fb00; full diff chars=8346
- docs/superpowers/plans/2026-11-04-finite-owner-sdk-trust-boundary.md: ABSENT -> 48366019008700fa38cdbf12981252e24eea7250; full diff chars=25787
- docs/superpowers/plans/2026-11-04-finite-request-signal-opt-in.md: ABSENT -> ce6c3c471e85650916430d942f21e1646bc93f2d; full diff chars=5309
- docs/superpowers/plans/2026-11-04-owner-request-retention.md: ABSENT -> 8d0e0cb0f75be4b51e110567b4ec995b7dc425ef; full diff chars=5400
- docs/superpowers/plans/2026-11-04-preparation-cleanup-enrollment.md: ABSENT -> dcafe08bd3b1b23d6497bfc50b42e95454d53a52; full diff chars=6323
- docs/superpowers/plans/2026-11-04-preparatory-issuer-fence.md: ABSENT -> 72ce4c86ac1390fd7256b1ba1e267a0893e906f8; full diff chars=6128

## docs/superpowers/plans/2026-11-01-finite-material-bootstrap-correction.md

~~~~~~~~~~diff
diff --git a/docs/superpowers/plans/2026-11-01-finite-material-bootstrap-correction.md b/docs/superpowers/plans/2026-11-01-finite-material-bootstrap-correction.md
--- /dev/null
+++ b/docs/superpowers/plans/2026-11-01-finite-material-bootstrap-correction.md
@@ -0,0 +1,82 @@
+# Finite Material Bootstrap Correction Implementation Plan
+
+> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking. Root owns task/review dispatch; do not spawn agents independently.
+
+**Goal:** Complete independently testable Task4B structural seed, identity, package-resolution and adoption source behavior without claiming Task4C runtime integration.
+
+**Architecture:** A strict public technical seed binds the original finalizer job to one exact finite package. GHA creates it once; the native reader validates exact public primaries; operator creation precedes GET-only adoption. Full material/profile/package production remains4C; delayed launcher remainsTask5.
+
+**Tech Stack:** Node22 ESM, existing GitHub Actions/Cloudflare fixtures, Python3 standard-library zipfile for bounded archive inspection; no new dependencies.
+
+**Spec:** [finite-material-bootstrap-correction](../specs/2026-11-01-finite-material-bootstrap-correction.md), including accepted builder rulings.
+
+## Global Constraints
+
+- Cloud GitHub/Actions only; no local source/dependencies/build, live command, provider/private probes, publish, new custody/scope or runtime mutation.
+- Original T0/N1/C0/C1/R1 and180000ms preparation margin unchanged; all awaits count. operationalReadiness=false.
+- Seed ref domain unchanged; canonical technical metadata only, no plan/control hashes/private selectors/policy/secrets.
+- DATED STATIC policy receipt + fresh ACCOUNT self-verification/fixed GETs; unchanged policy is trusted-operator assumption, never scopeVerified=true.
+- Original once-launcher process capability only; PID coherence is not identity; same-attempt WHOLE launcher reexecution EXCLUDED, not prevented; no retry/supervisor/refill.
+- Actual finite package creation, mounted source producer/full profile/full route are4C. Named binding installation and timer/child-create SEND producer remain4C/Task5. Do not repeat accepted4A review.
+- Each task records hosted RED/GREEN/source/run/counts, scoped lint and limitations; commit before root's fresh task review. Temporary no-secret qualifier is excluded from integration.
+
+## Review Focus
+
+1. Duplicate JSON keys/prototype names must fail before hashing (Task1).
+2. Absent nominal stays blocked in4B; no synthetic future SEND proof may unlock it (Task1).
+3. ZIP names, decompression bounds and CRC mismatch must fail in the actual parser (Task2).
+4. Seed ref404 after lost POST cannot refill original authority (Task3).
+5. Dated policy must not become fresh equivalent scope, even after verify200 (Task3).
+
+## File responsibilities and interfaces
+
+Task1 creates lib/mcp-qa-finite-seed.mjs: encodeFiniteMaterialSeed(seed) -> canonical envelope string; decodeFiniteMaterialSeed(text) -> validated {seed,seedHash}; validateFinitePackageManifest(value) -> immutable manifest. No I/O or authority. Modify existing trial-control/external-contract canonical projections ONLY; retain fixed-terminal inventory behavior. No historical migration or invented future SEND proof type.
+
+Task2 creates lib/mcp-qa-finite-package.mjs: resolveFiniteNativePackage({sourceRevision,githubToken,fetchImpl=fetch,now=Date.now,signal}) -> {build,manifest}; no arbitrary repository/workflow selector. scripts/verify-qa-finite-archive.py inspects archive bytes and returns only manifest and file digests/sizes; Node wrapper owns bounded subprocess/timeout/output and digest comparison. This is real resolution/parsing, not an injected success callback.
+
+Task3 creates lib/mcp-qa-finite-seed-http.mjs: readFiniteMaterialSeed({intentId,sourceRevision,fetchImpl=fetch,now=Date.now,signal}) -> {seed,seedHash,tagSha,primaryEvidence}; fixed public GET only. Its createFiniteMaterialSeedIssuer({admission,githubToken,fetchImpl,now,signal}) is initialized ONLY from the fixed original seed-material CLI entry and exposes issue({build,manifest,finalizer}) -> newly-ACKed receipt; default/reconstructed clients get reconciliation only. Private capability stays module/process-local; no public mint token.
+
+Modify mcp-qa-finite-source.mjs to call the concrete Task2 resolver for seed-material; return {build,manifest}, not a pretend runtime plan. Later-phase full technical/native material assembly remains4C and unavailable until installed; this does not excuse a stub Task2 resolver. Existing source/material factories receive the exact qualified seed reader dependency at their4C mount. Native qualifier itself is fully implemented/testable in4B without claiming that mount.
+
+## Task1 — strict codec and actual nominal identity
+
+**Files:** create seed module and test/mcp-qa-finite-seed.test.mjs; modify lib/mcp-qa-finite-trial-control.mjs, lib/mcp-qa-finite-external-contract.mjs and their existing finite fixtures; add test/mcp-qa-finite-phase-inventory.test.mjs as a NEGATIVE regression of unchanged inventory.
+
+- [ ] Write codec failures: duplicate keys/prototype/accessor/unknown fields; wrong domain/hash/role/size; raw private fields; envelope32769 bytes denied. Round trip exact canonical seed and independently recomputed digest.
+- [ ] Write identity/unchanged-inventory failures: reject nominalRunId; preserve exact finalizer identity; absent nominal stays BLOCKED at arm and restores. No positive absent-nominal fixture and no invented brand/proof constructor/journal fields. Task1 nominal permission claim is not Task5 child-create SEND evidence. Existing full inventory and restore terminal requirements stay unchanged.
+- [ ] Hosted RED: node --test test/mcp-qa-finite-seed.test.mjs test/mcp-qa-finite-phase-inventory.test.mjs test/mcp-qa-finite-trial-control.test.mjs test/mcp-qa-finite-trial-control-native.test.mjs test/mcp-finite-nominal-control.test.mjs. Verify intended failures.
+- [ ] Implement structural codec and remove fictitious GHA field/inequality from affected projections/fixtures. module.name=closed-rollback.mjs for qaClosed and index.mjs for the other four roles; each role bytes1..3145728; exports max128 sorted unique ASCII identifiers matching ^[A-Za-z_$][A-Za-z0-9_$]{0,127}$. Fixed role keys and64hex module hashes. Add boundary/invalid-export tests; do not infer semantic profile compatibility. Inventory production code is unchanged; actual absence proof/journal design belongs4C/Task5.
+- [ ] Repeat exact command GREEN; scoped lint; commit source/tests/report. No finite head/reset or old-ref reinterpretation.
+
+## Task2 — concrete fixed package resolver and archive validation
+
+**Files:** create package module, archive script, test/mcp-qa-finite-package.test.mjs, test/finite_archive_test.py; modify source module only for concrete package-resolution entry.
+
+- [ ] Write failures for zero/two eligible builds, wrong main/source/path/event/attempt, overflow, expired/duplicate artifact, missing digest, altered manifest/module, historical operator relabeled M, archive traversal/symlink/duplicate names/CRC/bomb/extra file. Use real ZIP bytes through the real Python subprocess; network provider is explicitly synthetic.
+- [ ] Hosted RED: node --test test/mcp-qa-finite-package.test.mjs; python -m unittest discover -s test -p 'finite_archive_test.py'. Confirm expected missing implementation/validation failures.
+- [ ] Implement fixed push/main/success/attempt1 workflow lookup and exact artifact name, two100-run pages/one100-artifact page, unique-or-fail. Existing GHA token downloads by exactID; redirect target is restricted to GitHub's qualified artifact-download response and credential is never forwarded cross-origin. No caller URL.
+- [ ] Enforce archive64MiB/expanded128MiB/64files plus tighter module limits. Require exactly SIX files: manifest.json plus qaClosed/closed-rollback.mjs and index.mjs under qaLive,canaryLive,canaryClosed,operatorClosed; each module <=3145728 bytes. No extra directory entries/files. ZIP inspection must validate declared/uncompressed actual sizes, CRC and paths before returning metadata. Compare archive provider digest and canonical manifest/file hashes; no archive module execution.
+- [ ] Return exact {build,manifest}; unavailable live finite artifact is a factual failure, not a fake fixture fallback. Test source entry uses this concrete resolver. Repeat both commands GREEN, scoped lint/Python compile, commit evidence. Finite build workflow/artifact production belongs4C.
+
+## Task3 — original seed step, adoption and native public qualification
+
+**Files:** create seed-http module and test/mcp-qa-finite-seed-http.test.mjs; modify lib/mcp-qa-finite-http.mjs, lib/mcp-qa-finite-source.mjs, scripts/run-qa-finite-trial-finalizer.mjs, .github/workflows/afw-finite-finalizer.yml; extend existing finite HTTP/CF/observer/native tests.
+
+- [ ] Write seed-material before admit-and-ready tests using actual CLI/workflow contract. Original event/run/job/build are primary-qualified; exact seed step success is required before observer creation/preview. Successful seed contains no private data. Missing seed never starts a fabricated polling observer.
+- [ ] Write original-process/unknown-ACK failures: shared consumed capability across clients; lost tag/ref ACK, late201, existing/bare ref, default/reconstructed invocation and404 cannot POST again. Document/test the trusted launcher boundary without claiming to prevent whole-launcher reexecution. Fixed workflow has no retry/supervisor.
+- [ ] Write account-custody failures: wrongID/account/expiry/inactive; missing dated receipt; native distinct identity unavailable; verify200 does not yield scopeVerified. No /user/tokens/policy-query/two-group requirement. Fixed mutation denial consumes its claim and remains admin-pending; no credential repair.
+- [ ] Write native exact public GET provenance failures: wrongtag/source/comment/body/owner/run/title/job/step, incomplete pagination/rate limit/5s expiry; no Authorization header/native GitHub key/private archive download. Run actual native observer/RPC fixtures with synthetic public transport; wrong seed never reaches material authority.
+- [ ] Hosted RED/GREEN command: node --test test/mcp-qa-finite-seed-http.test.mjs test/mcp-qa-finite-http.test.mjs test/mcp-qa-finite-cf-http.test.mjs test/mcp-qa-finite-command.test.mjs test/mcp-qa-finite-observer.test.mjs test/mcp-qa-finite-observer-native.test.mjs test/mcp-qa-finite-read-rpc-native.test.mjs test/mcp-qa-finite-finalizer.test.mjs.
+- [ ] Implement actual seed-material CLI phase using Tasks1/2, original consumed issuer and independent ref/tag readback. Split YAML fixed seed-material success from later ready step. GHA admit adopts exact operator-created observer GET-only; no Workflow REST create or creation permission inference. Implement fixed public native seed reader; preserve Task3 restoration once-send fence.
+- [ ] GREEN exact command, scoped lint; commit source/tests/report and progress with remaining4C/Task5 gates. Root reviews each task and later combined source. Do not call4B complete from throwing package/source placeholders or mock-only transport; do not call4C complete from4B tests.
+
+## Closure
+
+Self-review against spec: codec/identity belongsTask1, package provenance/real archiveTask2, issuance/adoption/custody/public qualificationTask3. Spec's build production, semantic exports/configuration/profile qualification, actual native factories/runtime pin assembly, arm-absence inventory with concrete SEND journal/source producer, receiver/full route and future launcher are explicitly deferred4C/Task5. All source test authority is synthetic; no operational readiness, current scope equivalence, live package availability or PC-off claim.
+
+## Root correction — preserve QA closed main module basename
+The approved existing source pin QA_CLOUD_CLOSED_PINS.qaClosed in lib/mcp-qa-cloud-closed-pins.mjs names closed-rollback.mjs (395915 bytes, SHA2564b557f04777be25f3df6dc271990d57095ace231bb7b24e2a7a10da23ada2c2f; dated versionc570b60b-95dc-48e1-89f3-9c4651691dbc). Therefore qaClosed.module.name is hardfixed to closed-rollback.mjs and its archive path is qaClosed/closed-rollback.mjs; the other four roles keep index.mjs. Exactly six files and all other structural bounds remain. This corrects the ROOT contract after accepted Task1, whose original implementation complied with the earlier all-index grammar; it is not a Task1 implementation bug. No actual Cloudflare module is renamed, no current remote state or semantic profile compatibility follows from the format, and the actual approved frozen source identity/profile qualification remains4C.
+
+
+## Root Task3 execution amendment
+Task1 accepted through5c5813cd (207PASS/scopedreviewclean); Task2 accepted throughb0f3340b,codea391a530 (206PASS/scopedreviewclean), including exact QAclosed basename correction. Task3 requirements are extracted and completed by docs/superpowers/briefs/2026-11-01-finite-material-task3.md and reviewed QA-publication bridge spec. Required qaPublication/correct phase timestamp checks and sanitized source custody receipt are part of that task; actual4C package/profile/native producer and Task5 launcher remain separate. Native-launch design41cf3139 passed fresh buildercheck with no planning-blocking questions, but is not implemented or installed.

~~~~~~~~~~

## docs/superpowers/plans/2026-11-01-finite-native-confirmation-cleanup.md

~~~~~~~~~~diff
diff --git a/docs/superpowers/plans/2026-11-01-finite-native-confirmation-cleanup.md b/docs/superpowers/plans/2026-11-01-finite-native-confirmation-cleanup.md
--- /dev/null
+++ b/docs/superpowers/plans/2026-11-01-finite-native-confirmation-cleanup.md
@@ -0,0 +1,94 @@
+Implementation baseline cd13d3de95e32adaef0411e94b5665dae3cdbcc2/tree c3faa9d40dd38f5cb0f4ee03972ef07f12e375cb, accepted PR709 (complete known-cancellation adapter + actual wrapper). Fresh design and focused containment reviews accepted with recorded root rulings. Historical design baseline7163 remains below; runtime readiness=false.
+
+# Finite native confirmation cleanup — four reviewable tasks
+2026-11-01 · source plan only · base7163bde8 · ROOT DESIGN REVIEW BEFORE CODE
+
+Spec: ../specs/2026-11-01-finite-native-confirmation-cleanup.md
+Dependency: trusted known-cancellation/current-primary authorization adapter must finish its independent review and accepted source integration. Do not edit its files while that task runs. All work cloud/GitHub/Actions; no local source/dependencies. Each task gets exact-head tests and independent review, then integrated full CI. No runtime action follows automatically.
+
+## Task 1 — immutable finite control and original clocks
+Add lib/mcp-qa-finite-trial-control.mjs and focused/native tests. Implement exact plan grammar/hash, trusted producer, fresh per-intent journal/head, legacy/V2/competing-head rejection, pending->armed CAS only after exact getAlarm/native/primary/finalizer-ready readback. Persist original T0/N1/C0/C1/R1 and immutable effect claims. withdrawNominal must not withdraw cleanup. Read-only reconcile cannot repeat issued effects. Keep all legacy keys and defaults unchanged.
+Acceptance: synthetic native DO persistence/reconstruction and unknown/late commit leave pending/uncertain without nominal authorization; duplicate intents and altered native/profile/hash denied. Original command windows never restart. Source rollback is revert only; no storage deletion.
+
+Root-ruling Task1 acceptance: implement captureObservedFacts(kind) for fixed internal subscription/process/saved_event only. INFO stores planned exact selectors/save key/expected revision; append observed technical facts/hashes once under unchanged controlHash. Native prepare-before-subscribe/save must contain no future facts; missing returns not_yet_observed without writes. Later exact facts qualify; duplicate/replacement/wrong revision/generation blocks; unknown capture ACK reconciles exact retained record only, never overwrites/retries business effects.
+
+## Task 2 — mount finite alarm using existing close/restoration primitives
+Add lib/mcp-qa-finite-trial-guard.mjs; narrow optional fixed-actor dispatch in worker/independent-closure/index.mjs and compatible closed rollback. Extend/reuse alarm/coordinator code with explicit versioned storage adapter and original deadlines, preserving current singleton APIs. Compose scoped withdrawal/close, retirement-handoff and canary restorer/allowlisted transport. Add the native finite admission seal/launchIssued gate and proof producer plus collector/validator. Finite restorer AND finalizer discriminate retired_process from sealed_without_admission; preserve legacy consumer without fake physicalStop flags. Every possible finite-profile admission/launch path participates; unresolved primary writes deny no-admission. No broad provider client. Max three deliveries; every unknown issued effect reconciles only.
+Acceptance: terminate synthetic nominal runner after arm; durable alarm still executes with no live nominal grant. Verify exact physical-stop/no-admission before restore, hold false stop receipt, wrong/active actor, late RPC and original C1 expiry. Mandatory phase-aware finite inventory admits only the exact expected definition+instance in allowed phases, then requires actual nominal terminal before restore; never skip a whole definition. Keep current DO guard out of impossible self-terminal predicates; unrelated workflows deny. Native tests cover reservation-only closure, delayed pre-seal admission after cancellation, launch/seal race, lost seal ACK and provider absence without native proof. Current consumed legacy journals never read as fresh claims.
+
+Focused Task2 acceptance: before canary POST persist/read back immutable proof and bounded supporting evidence; consume native challenge once and bind distinct durable canary/QA claims to that proof. Preserve original producer-version provenance after canary rollback. Lost evidence/readback blocks POST; unknown late writers remain admin-pending.
+
+New Task2 containment acceptance: use actual legacy issued/complete/absent/absent commitments, preserve every hash and unknown delivery result. Guard prepare accepts this exact predecessor only after qualified finite receiver containment plus complete fresh primary quiescence and separate legacy-writer checks. Hold old entered awaits/transactions across withdrawal/reconstruction; prove no cross-generation writer/new-budget overwrite. Unknown current/new-scope writes remain blocked; no refund or clean-history fixtures.
+
+## Task 3 — independent exact QA finalizer and ready handshake
+Add lib/mcp-qa-finite-trial-finalizer.mjs, scripts/run-qa-finite-trial-finalizer.mjs and one fixed workflow/admission integration for the new command kind. Keep existing closed-only rollback untouched. Separate workflow/run without nominal needs dependencies or shared cancel group is ready before arm; fresh primary GitHub readback correlates exact run/attempt/source/intent, in-progress finalizer job and completed admit-and-ready step, never a caller assertion. Use existing authorized QA custody only after metadata qualification; canary publisher remains separate. Use distinct nominal/finalizer concurrency groups and never hold shared QA writer lock while waiting for readiness; only final restore acquires it after fresh proofs. No pending cleanup cancellation; original R1 includes queue time.
+Acceptance: nominal cancellation does not cancel finalizer; no self-terminal job deadlock; live arbitrary profile denied, exact finite profile accepted only in its permitted phase. Container not stopped, guard unresolved, foreign pointer, expired R1, lost deploy ACK and already-consumed claim deny/reconcile without POST retry. Final readback uses a separate GET-only client and reports uncertainty truthfully.
+
+Focused Task3 acceptance: canary closes and its former live proof method becomes unavailable; restart finalizer, recover the exact retained proof through the qualified bounded fixed administrative transport, perform fresh independent closed deployment/provider/primary checks, and permit exactly one QA restore before original R1. No reseal/reopen/new native challenge. Missing provenance, unavailable transport/custody, conflicting or late writes, consumed QA claim and expired R1 leave admin-pending/no effect. Assert retained-proof reuse by two fact consumers never reuses an effect authority.
+
+## Task 4 — actual QA named wrapper/profile and integrated qualification
+Add lib/mcp-qa-finite-confirmation.mjs and mount exact branch in existing PrivateQaNamedConfirmation; extend source-qualified packaging for explicit finite and compatible closed profiles. Actual four release flags, explicit RELEASE_DB/canary node aliases and checked read custody; no forged env, native version or unbound placeholder. Call accepted runKnownCancellationReleaseWorkflow({bundle,env,event,step}) with ORIGINAL afw-release-<bundleHash> and sole {planHash:bundleHash}; trusted control selects intent, no operation payload. Preserve original70s/nested5s/20s under outer N1 and require durable guard plus finalizer readiness. Qualify existing subscription->custody.start->launch->delivery->unsubscribe/close in native source fixtures, covering the useful full route and reservation-only early failure.
+Acceptance: native actual Workflow/DO/D1 fixtures and real module metadata; closed default has no effects. Killing/cancelling nominal workflow at each boundary preserves cleanup. Profile/module-size/binding provenance and rollback class compatibility verified. Exact task and whole-branch review, full tests/lint/build; no live mutation. Produce bounded source receipt with next separately authorized promotion gates. Do not spend the unique first-successor occurrence on an extra rehearsal or claim operationalReady/PCoff from CI.
+
+New Task4 containment work: implement explicit legacy_saved_event/finite_trial_event entrypoint types, actual finite canary deny-first gate, deliverFiniteOwnSaved with ONLY intent/control references, concrete lib/mcp-own-finite-control.mjs resolver, real AFW_FINITE_TRIAL_CONTROL binding and fixed QA readFiniteOwnEventControl method/prepare-produced immutable private record. Audit every alternate delivery/schedule/consume/HTTP route; no fallback or caller OAuth/scope. Native tests hold old RPC before entry across selected finite deployment and demand zero host/auth/readiness/storage/budget/transport touches; test held entered awaits, old signed packets and held cross-generation transactions. Qualify actual profile/binding/source and closed rollback; no historical event recovery solely for retargeting. Root fresh focused architecture review of this new choice before code.
+
+Root-ruling Task4 acceptance: concrete resolver consumes appended observed facts, compares exact expectedProjectRevision+1 and deterministic existing-save fingerprint plus unchanged primary subscription/process receipt hashes; never latest record or caller facts. Test prepare before real synthetic subscription/save, later exact capture, changed revision and replacement receipt, original-window expiry and unknown capture ACK. Cleanup reads retained private technical facts under separate finite authority without OAuth renewal; missing/conflict yields blocked/admin-pending, never fabricated receipt.
+
+## Accepted execution clarifications after Task1
+Task1 code a5cefc7d is deliberately first-intent-only, with same-instance acknowledged prepare required for nominal claims. Restart/hibernation keeps read/cleanup, never revives nominal eligibility; no head reset or second intent. Native QA source pins and canary containment pins are distinct. Every narrower observed consent deadline is retained across awaited boundaries. See Task1 report and ledger; independent Task1 review pending.
+
+Task2 must implement fixed exact retained-proof head selection and readFiniteTrialCleanupCompletion on the same control, with bounded immutable completion after settled guard effects and canary readback. Task3 qualifies one exact precreated PrivateQaBootstrap proof observer and its fixed native module/branch, plus the bounded HTTP GET/output recovery adapter needed by the separate GHA finalizer. These concrete source files may be added as narrowly named private modules rather than inventing a generic transport; defaults and legacy consumers stay unchanged. The detailed root execution ruling in the spec binds phase inventory, maximum32 observations, original deadlines, no replacement after lost creation ACK and cycle-free proof/canary/guard/observer/QA order. No runtime promotion is implied.
+
+## Task2 implementation rulings and handoff constraints
+
+See the specification's “Root rulings implemented by Task2” for the binding API/grammar and exact ownership checks. Task2 extends the unmounted Task1 plan with five exact module pins, corrects applicationId to the actual strict 32-hex target, persists pending+C0 before first finalizer readiness, and adds an existing-claim-only nominal child view. Initial zero-writer admission and same-instance acknowledged nominal claim remain unchanged. Child views require complete inventory and exact per-kind native ownership, never a counter-only bypass.
+
+The candidate seal has only {intentId,planHash}; challenge comes once after GET-only readiness. Gate begin requires actual native-resolved nominal claim/current consent; cleanup uses original C1 independently of N1/OAuth, with permissions-only and historical close composed separately. Three fixed alarm slots permit delayed stop observation; unknown effects reconcile without resend. Retained proof/readback and exact canary closed module/configuration precede restoration. Exact observer allowance ends before QA restore; no whole-definition exclusion.
+
+Task4 must implement the real fixed factories/bindings and full resolver/delivery containment. AFW_FINITE_TRIAL_VERSION is a NEW required version_metadata binding, not present on inspected closed canary. Missing factory/binding remains unavailable. Preserve the original public runKnownCancellationReleaseWorkflow({bundle,env,event,step}) signature, original event, 18-stage contract and 70s/5s/20s deadlines. Internal child actions accept a second continuation assertion; actual adapters retain it after awaits. Pre-arm deployment is operator-attended: no autonomous crash-recovery claim before durable pending/armed control.
+
+Task3 alone implements the real precreated bootstrap observer, readonly first material-preview step, successful first-step readiness admission, later terminal proof/completion output, GHA credential identity/custody and HTTP transport. Observer input is {operation,intentId,sourceRevision}; future controlHash is derived by the native preview, not supplied cyclically in its creation payload. Workflow POST401 remains a promotion gate. No credential/role/profile action, autonomous initiator or PC-off claim follows source tests.
+
+Task2 independent review and integrated whole-branch CI remain root gates. Exclude .github/workflows/finite-task1-temporary-qualifier.yml from eventual integration; source rollback is revert only, without history deletion or reset. operationalReadiness=false.
+
+
+## Task3 additional concrete handoff requirements
+The spec's native QA-claim/external send-fence ruling binds Task3. Implement one fixed claimFiniteTrialQaRestore journal step in the same observer after settled completion, terminal acknowledged claim output, then distinct durable GitHub append-only send claim after observer complete and fresh prewrite checks. No new observer/public route/credential or retry. Use a bounded technical finalizer projection; do not expose full private selector/consent plan. Separate same-run admit/poll and serialized restore job IDs are phase-correlated to actual primary metadata. Exact Task3 brief: ../briefs/2026-11-01-finite-native-cleanup-task3.md. Fixed new original owner command: /afw-qa-finite-confirmation v1 <current source SHA>; command kind finite_native_confirmation. Historical closed-only commands remain unchanged.
+
+## Root ruling — retained first-primary receipt replaces unavailable external D1 query (Task3, 2026-11-01)
+Focused architecture review accepted this explicit replacement. No external bounded administrative D1 endpoint is accredited. The SAME observer, after settled guard completion and acknowledged native qa_restore claim, obtains one fresh first-primary snapshot through the concrete fixed QA producer's ACTUAL bound DB path under its short original lease and R1. It compares exact row hashes/process generation/settled writer journals to the retained proof (only observation timestamps may differ), and correlates control/proof/completion/native claim/seal/source/native identity before and after the read. Its bounded immutable receipt hashes those references and the observation; it never refreshes its timestamp on external replay.
+
+Irreversible seal, settled writers, and qualified closed source must exclude ALL remaining scoped writes, including already-issued remote writes and old continuations. A known active/pending/unresolved administrative or independent writer blocks; broad credential capability alone does not establish an active writer. Empty Workflows and a closed current deployment ALONE are insufficient: an outstanding D1 write could still commit after the receipt.
+
+After observer completion and acquiring the QA writer lock, GHA performs fresh GET-only checks of exact closed chain/modules/configuration/namespaces/exposure/full Workflow and provider inventories, then validates the retained first-primary receipt and its qualified writer-exclusion lineage. Changed pointers/source/lineage or incomplete inventory stays admin-pending. This is NOT a new external D1 query or an unseen-foreign-writer guarantee. Task4 owns actual source/producer qualification; absence remains unavailable. Original R1, native claim and separate durable send fence remain unchanged. Add a negative fixture holding an actual outstanding D1 writer after the observation: no send claim or POST.
+
+The GitHub send fence uses an immutable annotated tag object and atomic unique ref under the fixed intent/control/qa_restore domain, never run/job/source as an additional namespace. Content binds native claim/proof/exact run/attempt/job/source/candidate/target. Only the execution ACKing a NEW ref201 before R1 may POST. Existing/unknown ACK/restart is GET-only; no deletion, force, reassignment, refund or resend. Tag-object creation alone grants nothing.
+
+Cost if exclusion cannot be qualified: admin-pending and source rework, never blind restore, a new transport or credentials. operationalReadiness=false.
+
+## Task3 source contract — actual Workflow provenance and bounded observations
+The first-step output is an outer technical envelope `{purpose,provenance,material}`. `material` retains the exact mandated preview fields unchanged. `provenance` carries purpose, original `event.instanceId`, compiled sourceRevision, and the observer's OWN actual env version_metadata ID. The material producer's current DO pin alone cannot prove the executable version of an older Workflow. Missing compiled source installation or metadata fails closed; Task4 must install the actual compiled revision and bound producer.
+
+The fixed adapter follows the documented [Workflow instance GET schema](https://developers.cloudflare.com/api/resources/workflows/subresources/instances/methods/get/): `versionId`, `params`, `queued`, `status`, `step_count`, `steps`, and string JSON `output`; step identity uses name/type/start/end/success/attempts/output. It does not fabricate result.id, result.workflow_id, or step.status. The separate [Workflow version GET](https://developers.cloudflare.com/api/resources/workflows/subresources/versions/methods/get/) establishes definition/class/language, not an undocumented Worker-version link. Executable correlation comes from the observer's native envelope plus independently qualified pinned Worker module/configuration source.
+
+Total read-only `step.do` calls are bounded to 32 INCLUDING the first preview: at most 30 distinct cleanup samples spanning original C0 through R1-5000, plus the final first-primary read. The native QA claim is one separate no-retry journal mutation. Native RPC AND Workflow step results may carry disposable transport handles; clone the serializable metadata and release that handle before exact field validation. This is transport normalization, not an unknown-field grammar wildcard.
+
+External readiness persists only while the original authenticated command retains its minimum nominal margin, including every awaited custody/provenance/tag/ref boundary. No later run, job queue, step, or read refreshes T0/R1. All source qualification fixtures are synthetic; default source/material/compiled-observer factories remain unavailable. operationalReadiness=false.
+
+Root confirmed the conservative total of 32 read-only step.do calls on 2026-11-01. Sleeps do not count as provider observations. Cost: slightly coarser sampling and possible admin-pending if evidence is late; no extra authority or clock extension. Clone/release applies only to owned returned RPC/step results, never env or shared bindings.
+
+## Root ruling — original execution and GET-only send-fence recovery (Task3 round1, 2026-11-01)
+Only the fixed trusted GHA restore launcher, invoked ONCE in authenticated attempt1, may initialize one module-private original-execution capability. It binds exact authenticated admission, intent/control/proof/source, primary run/attempt/job/step and the actual original Node process. The launcher sets a task-specific PID marker once and execs Node once; PID equality is coherence ONLY, not durable process identity or source provenance. Qualified checked-out source and exact primary workflow/job are the trust boundary. No retry, supervisor or recovery launcher regenerates the marker in this supported source.
+
+GitHub [run_attempt](https://docs.github.com/en/actions/reference/workflows-and-actions/contexts#github-context) increments on a true workflow rerun, which remains denied. Same-attempt reexecution of the WHOLE launcher is explicitly outside this supported scope: neither metadata nor PID can distinguish it. If the host cannot establish the once-launch assumption, no capability is admitted and the result is admin-pending.
+
+One capability is shared across ALL clients in that original process. Consume it privately at FIRST claimSend entry BEFORE ANY send-fence mutation, including annotated-tag POST. An earlier GET failure may conservatively poison it. GET first: an existing fence permits only reconciliation and never refunds the capability. Unknown/lost tag/ref ACK consumes it permanently. Reconstruction with the same capability cannot refund it; default/no-cap/recovery, INCLUDING GET404, performs only GETs and remains admin-pending when the fence is absent. No caller boolean, recovery permission flag, DTO or 404 mints authority. Only the original execution acknowledging NEW ref201, still within its original bounds, may issue the single QA POST.
+
+Revalidate original R1/cancellation/source/identity at awaited boundaries and before mutation. A child/new process inheriting the old PID marker fails coherence. The fixed workflow must actually contain one exec invocation and no wrapper retry. Atomic ref uniqueness remains the final durable send fence; process flags/concurrency are not durable proof.
+
+Availability cost: losing the original process before issuance can leave admin-pending even if no ref exists. Generic mutating process resumption is NOT supported. Retained proof/provider-closed recovery remains GET-only. Durable resumption under a broader launcher model would require a separate protocol, never inferred renewed authority. Source-private fixture authority is explicitly synthetic. No runtime, credential, scope or nominal factory change is authorized by this ruling.
+
+
+## Task4 exact handoff and next initiation design
+Task3acceptedf11aa9b6/e175d5f7 afterscopedreview0P1/P2 and71coveringPASS;sourceonly. ExactTask4requirements in ../briefs/2026-11-01-finite-native-cleanup-task4.md. Implementactualsourcefactories/profiles/privateproducer/deliveryandnominalcomposition, notgenericuninstalledcallbacks. Defaultclosedunavailableisintentional;finiteoptinmustactuallywirequalifiednativecode.
+A forthcoming separateTask5design addressesnativecloudinitiation viaexistingplatformWorkflowbindings andGET-onlyadoptionofoperator-precreatedobserver. Itrequiresownexplicitcontract/spec/plan/freshreview beforecode; don'tquietlyexpandTask3observerorTask2alarm/whitelist. CurrentTask4doesNOTimplementlauncher/newclock/schema/adoptionmode orassumeWorkflowRESTcreateauthority. FullbranchCI/review/integration followsallrequiredsourcetasks; actualpilotpromotion/usergrant/PCoffstayseparategates. Ownerexplicitlydelegatedroutinechoicesandoptedoutofquestions; preservedSDD/cloudsourceexecutioncontinueswithsource-onlyrulingsandrollback, no newsecuritygrant inferred.

~~~~~~~~~~

## docs/superpowers/plans/2026-11-01-finite-native-launch-adoption.md

~~~~~~~~~~diff
diff --git a/docs/superpowers/plans/2026-11-01-finite-native-launch-adoption.md b/docs/superpowers/plans/2026-11-01-finite-native-launch-adoption.md
--- /dev/null
+++ b/docs/superpowers/plans/2026-11-01-finite-native-launch-adoption.md
@@ -0,0 +1,88 @@
+# Finite Native Launch and Adoption Implementation Plan
+
+> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans task-by-task; root owns SDD dispatch/review. Do not spawn agents independently. Checkboxes track implementation, not runtime activation.
+
+**Goal:** Implement three Native5 source primitives for one delayed nominal Workflow without REST creation or fabricated authority.
+
+**Architecture:** A fixed DO owns source-qualified control, coordinator and durable child-create SEND; a separate Bootstrap launcher sleeps and invokes that DO. Missing C2 factories stay unavailable, while actual primitives/native paths are testable. Preserve independent observer/finalizer and C0 guard; separate C2 private-policy setup must complete before observer creation/preview.
+
+**Tech Stack:** Node22 ESM, existing workerd/Workflow/DO/D1 fixtures and GitHub Actions; no new dependency.
+
+**Spec:** [accepted Native5 design](../specs/2026-11-01-finite-native-launch-adoption-design.md). Source interfaces inspected at a776e115c2e3682f1620a6e54a758a3c77a16b94; execution baseline is root's qualified post4C1 source, never this older docs-branch tree.
+
+## Global constraints
+
+- Order:4C1 compiler -> Native5 tasks1–3 ->4C2 actual material mount ->4C3 full route. publicStatic v2/historical pins belong4C1; privateCanaryConfiguration tuple/full bundle belongsC2. Do not impersonate those producers.
+- Cloud-only source work; no runtime/provider/private probes, publication, live command, credentials/scopes, permanent scheduler, alternate actor, history reset, replay or local dependencies/build. operationalReadiness=false.
+- Original T0: armAckBy+90000, launchAt+150000,lastCreateAt+160000,N1+300000,C0+240000,C1+420000,R1+480000. Original70s/5s/20s; no new per-helper lifetime. No DO start alarm.
+- Exact native event/sole nominal payload; runKnownCancellationReleaseWorkflow({bundle,env,event,step}) remains four arguments/18 stages. No synthetic timestamp.
+- Never-created nominal remains admin-pending; no new cleanup proof union. Both restores require nominal/launcher terminal and settled writers; observer exception remains exact.
+- Preserve actual GHA seed/adoption separation and dated-static custody assumptions. Owner-declared shutdown and cloud timestamps are distinct; no PC-off claim before complete source/CI/promotion/current preflight/consent/receiver gates and timely ARM.
+- Each task: hosted RED/GREEN/scoped lint, exact revision/run/jobs/counts/report, commit then root review. No whole-CI repeat or4A re-review.
+
+## Canonical additions and internal boundaries
+
+Choose ONCE: private plan top-level launchPolicy EXACT {armAckBy,launchAt,lastCreateAt}; workflows EXACT {confirmation,bootstrap,launcher}. External technical projection carries the same launchPolicy/workflows. Derive all three times from T0 and launcher ID exactly as design. Existing intent/control hash ALGORITHMS/domains stay unchanged; future unspent plan bytes/hashes change. Reject missing/extra/tampered timing fields; no reinterpretation of stored legacy records.
+
+lib/mcp-qa-finite-launch-records.mjs produces finiteLauncherInstanceId({intentId,sourceRevision}), validateFiniteLaunchPolicy({T0,launchPolicy}), and validateFiniteLaunchPrepared(value), validateFiniteChildCreateSend(value), validateFiniteChildCreateAck(value), and hashFiniteLaunchRecord(value) ->64hex. New-record hashing is domain=record.purpose plus newline plus canonical ASCII-key-sorted JSON; reject other purposes. Prepared purpose=afw.qa-finite-launch-prepared.v1; SEND/ACK purposes remain exact design values. Exact record fields are in the accepted design; the Task1 brief repeats them for isolated execution. Fixed keys: afw.qa-finite-child-create.v1:<intentId>:prepared, :send, :ack; immutable append-only records. SEND is distinct from Task1 nominal permission claim.
+
+ParentBudget is INTERNAL {check,signal,deadline}; check returns current wall time and rejects expiry/clock reversal. Create it once at native operation entry BEFORE hydration, bounded by original5s and the narrower operation/consent end; pass it unchanged through hydration, queue, reads, transactions and effect awaits. Later Workflow wake creates a distinct actual invocation under original absolute launch bounds, never extends an earlier invocation. Existing control gets now=parent.check and timeoutMs<=remaining at construction; its per-method timer cannot extend parent. Guard now uses the same check.
+
+Add internal readPrivateQaFiniteControlSnapshot({storage,nativePin,plan,parent}) in trial-control: reuse existing strict plan/state/legacy decoding and nativePin WeakMap; read actual storage only, compute canonical references even before HEAD exists, report true missing rows without inventing armed/persisted control. No control.read call, callbacks returning truth, caller phase or mutation. A private invocation context retains decoded source/plan/native lineage and coordinator; source-only constructor receives actual ctx/env via fixed C2 resolver, never caller JSON.
+
+C2 seam: resolvePrivateQaFiniteLaunchContext({ctx,env,refs,parent}) in a fixed source module, default unavailable until C2 installs real composition. No runtime registration/public success DTO. Its qualified private context is retained in module WeakMaps; methods receive references only. Tests substitute external provenance boundary at compile-time and exercise real constructors/storage/decoders, explicitly SYNTHETIC; no production bypass.
+
+## Root post-seed orchestration ruling
+Current seed-material -> immediate admit races root's attended setup/observer creation. Order is actual seed-step success -> separate4C2 private-policy setup COMPLETED with immutable qualified receipt/provider terminal -> operator observer creation -> bounded GET adoption/preview/ready -> launcher. Exact setup identity/afw.finite-policy-installed.v1 receipt follows the final private-policy-setup spec (draft b23d11c3, owner-locator amendment pending); consume through C2's fixed native reader. No caller boolean or old publisher-probe substitution. Proposed setupBy50s/original30s budget leaves20s to adoption70s; no finite HEAD is spent by setup. Extra prearm instance is terminal before first preview; no definition exclusion.
+
+adoptBy=min(T0+70000,N1-180000). At most36 slots T0+2000*k,k=0..35; skip elapsed slots without bursts. Each child<=5000ms clipped by SAME original parent/end; final70s slot starts no network with zero budget. Wait only after primary seed success, for exact qualified not-yet404 or explicitly validated pending preview; schema/identity/source/auth/unknown/uncertainty fail without regrant. Success ends waiting; actual ready precedes ARM<=90s. No CF create, newobserver/run/clock or QA writer lock; observer32 observations/one claim unchanged. This supersedes the private-setup draft's14-slot paragraph. Private publisher/owner locator are C2, not Native5.
+
+## Review focus
+
+1. Preview before HEAD and prepare's inventory await must neither invent stored state nor reenter control.read (Task1).
+2. SEND commit after timeout, with provider404, cannot refund/resend (Task2).
+3. Coordinator held across outer prepare would deadlock its own reader (Task1/2).
+4. Durable sleep replay and late native event cannot refresh lease (Task3).
+5. Workflow ctx cannot impersonate DO ctx/storage or fixed source provenance (Task2/3).
+
+## Task1 — canonical launch records, coordinator and actual absence observation
+
+**Files:** create lib/mcp-qa-finite-launch-records.mjs and lib/mcp-qa-finite-launch-inventory.mjs; modify trial-control, external-contract, finite-evidence and fixed-terminal-workflows for these exact contracts; tests test/mcp-qa-finite-launch-records.test.mjs, test/mcp-qa-finite-launch-inventory-native.test.mjs.
+
+**Interfaces:** createPrivateQaFiniteLaunchInventory({ctx,env,context,parent}) -> {observeBeforeCreation()}; context is the qualified private source context above, not an accepted DTO. Returns internal invocation-bound discriminant never_issued/issued/unavailable with exact design hashes. The inventory validator consumes it synchronously through this source-owned operation, not from public input. Preview/arm/prelaunch selection derives from actual decoded storage, current time, never caller strings.
+
+- [ ] Write strict field/hash/timing tests and true before-HEAD absence. Exercise actual DO storage/native pin and full provider inventory with synthetic provenance; missing source, foreign head, pending writes, caller DTO, existing SEND/ACK and missing provider pages deny.
+- [ ] Write nested prepare->primary inventory test that completes WITHOUT control.read reentry. Concurrent SEND waits behind the bounded inventory coordinator, then rechecks clocks/state. Outer prepare never owns that lock. Snapshot1->full inventory->snapshot2 equality->synchronous consumption must be real, not mocked booleans.
+- [ ] RED: node --test test/mcp-qa-finite-launch-records.test.mjs test/mcp-qa-finite-launch-inventory-native.test.mjs test/mcp-qa-finite-trial-control-native.test.mjs.
+- [ ] Implement exact codecs, read-only snapshot and private source coordinator (one per actual DO context via WeakMap). Same coordinator must gate ALL SEND transitions. Decode existing legacy/control rows using original checks; no new alternate actor/key to bypass first HEAD. Unknown source coverage remains unavailable.
+- [ ] GREEN exact command plus affected external-contract/phase fixtures; scoped lint; commit report docs/superpowers/reports/2026-11-01-finite-native-launch-task1.md. C2 default seam remains unavailable; primitive positive cases must use real source/storage path under explicit synthetic boundaries.
+
+## Task2 — fixed DO prepare/claim and unique native child create
+
+**Files:** create lib/mcp-qa-finite-launch.mjs; modify worker/independent-closure/index.mjs DO methods only and narrow shared context plumbing; tests test/mcp-qa-finite-launch-native.test.mjs.
+
+**Interfaces:** runPrivateQaFiniteLaunchOperation({ctx,env,operation,refs,parent}) is source-internal with fixed operation dispatch; RPC methods prepareFiniteNominalLaunch({intentId,sourceRevision}), createFiniteNominalChild({intentId,controlHash}), readFiniteNominalLaunch({intentId,controlHash}) validate exact arity/fields. ctx MUST be this.ctx of IndependentClosure. Caller cannot supply operation/source/context/binding. Read returns facts, not authority.
+
+- [ ] Test real control.prepare -> guard.arm/readback -> NEW control.claimEffect('nominal') on SAME object; guard.arm currently never calls prepare. Cover90s boundary, unknown prepare/receipt ACK, reconstruction, old head, missing/unsettled private-setup completion, altered seed/readiness/consent/pin and Workflow-context misuse.
+- [ ] Test actual transaction+storage SEND, independent readback, one native binding create with exact ID/payload. Cover149999/150000/160000, clock expiry after EVERY await, lost/late transaction/create ACK, duplicate ID, reconstructed callers/provider404, queued coordinator and held remote create. Unknown creates remain separate native-create writers.
+- [ ] RED: node --test test/mcp-qa-finite-launch-native.test.mjs test/mcp-qa-finite-launch-inventory-native.test.mjs test/mcp-qa-finite-trial-guard.test.mjs test/mcp-finite-nominal-control.test.mjs.
+- [ ] Implement DO fixed mounts and live shared-parent budget before source hydration. Persist/read prepared only after same-object claim and C0 guard ACK. Source context resolves actual AFW_QA_NAMED_CONFIRMATION and fixed target metadata. Atomically append SEND; only NEW acknowledged transaction yields process-local once-send capability. Recheck parent before native create; never retry outstanding native call.
+- [ ] Append ACK only for actual matching timely create response; existing/unknown journal is GET-only. Read-only reconciliation never overwrites SEND/ACK, synthesizes termination or invokes create. Preserve guard alarm and independent cleanup.
+- [ ] GREEN same command, scoped lint, commit report docs/superpowers/reports/2026-11-01-finite-native-launch-task2.md. No binding/config deployment; missing actual C2 context stays unavailable.
+
+## Task3 — real Bootstrap sleep and original nominal entry/inventory integration
+
+**Files:** create lib/mcp-qa-finite-launcher.mjs and lib/mcp-qa-finite-confirmation.mjs; modify Bootstrap/NamedConfirmation mounts, exact phase inventory consumers, finalizer CLI/fixed observer GET adapter and closed-compatibility tests. Add test/mcp-qa-finite-adoption-wait.test.mjs. Do not alter accepted business wrapper implementation.
+**Interfaces:** runPrivateQaFiniteLauncher({env,event,step}) and runPrivateQaFiniteConfirmation({env,event,step}); both source-selected only. Bootstrap operation finite_nominal_launcher, payload EXACT {operation,intentId,sourceRevision}; uses fixed namespace RPC, never Workflow ctx as storage. Nominal entry consumes C2's source-qualified original bundle, never caller policy.
+
+- [ ] Test actual GHA admit orchestration: successful seed prerequisite; operator observer absent until50s then valid;36 absolute slots/skip elapsed/no burst; clipped child near70s; zero budget; missingseed/auth/schema/unknown not benign404; noCF POST/writer lock. Require typed C2 setup completion/terminal receipt before preview; unavailable locator fails closed, no publisher implementation here.
+- [ ] Test actual exported Workflow under workerd: exact seed/ready prerequisites; prepare step success by90s; finite-launch-prepare/create retries0; sleepUntil absolute150s; replays do not repeat effects; no missing-seed polling, start alarm or GHA REST create.
+- [ ] Test nominal original event creation interval[150000,160000]+T0, wrong/future timestamp/payload/ID/source, delayed provider acceptance, queue exceeding70s and held5s/20s child boundaries. Spy only to assert SAME event reference/four keys; accepted wrapper tests verify18 original stages and cancellation behavior. Add bounded outer provenance result without mutating inner result.
+- [ ] Test full phase inventory: true source never-issued permits prelaunch absence; SEND+absence unresolved; exact launcher/observer only; both restores require nominal AND launcher terminal, QA additionally observer complete. Never-created stays admin-pending. Held D1/process/native-create writers block; all binding holders and create paths must route through journal/coordinator.
+- [ ] RED/GREEN: node --test test/mcp-qa-finite-adoption-wait.test.mjs test/mcp-qa-finite-launcher-native.test.mjs test/mcp-qa-finite-confirmation-native.test.mjs test/mcp-qa-finite-launch-inventory-native.test.mjs test/mcp-release-known-cancellation.test.mjs test/mcp-qa-finite-observer-native.test.mjs test/mcp-qa-finite-read-rpc-native.test.mjs.
+- [ ] Implement bounded passive GET-only adoption in the existing admit phase after primary seed success; retain original parent/deadline through preview and existing readiness checks. Consume C2 setup completion via fixed source dependency, not caller authority. Implement exact class dispatch and fixed source C2 context consumption; propagate original nominal parent lease across hydration before calling the unchanged wrapper. Extend provider status handling conservatively: queued/unknown/late create are unresolved, not terminal. Preserve old closed routes and rollback denial.
+- [ ] GREEN/scoped lint, report docs/superpowers/reports/2026-11-01-finite-native-launch-task3.md and ledger; commit and root review. Actual C2 attachment/private bundle/profile/full route and provider acceptance remain pending.
+
+## Self-review / handoff
+
+All three tasks own meaningful native behavior; default missing C2 semantics are an honest installation gate, not permission to replace implementation with throw-only stubs. Root preflights before dispatch and reviews composition; read current C1 interfaces without overwriting its work.

~~~~~~~~~~

## docs/superpowers/plans/2026-11-01-finite-private-policy-setup.md

~~~~~~~~~~diff
diff --git a/docs/superpowers/plans/2026-11-01-finite-private-policy-setup.md b/docs/superpowers/plans/2026-11-01-finite-private-policy-setup.md
--- /dev/null
+++ b/docs/superpowers/plans/2026-11-01-finite-private-policy-setup.md
@@ -0,0 +1,438 @@
+# Finite private policy setup implementation plan
+
+> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development. Preserve root dispatch: one scoped implementer, fresh reviewer, then next gate. Task implementers do not spawn subagents.
+
+**Goal:** Implement authenticated pre-T0 connection preparation and one post-T0 private-policy setup without spending finite HEAD early or exposing private values.
+
+**Architecture:** Actual Access/owned-primary evidence produces immutable private context; source-owned phase adapters alone own publication sends. Pure records/journals grant no execution authority. Preparation and finite profiles remain distinct.
+
+**Tech Stack:** Existing Node>=22.18.0, ESM, workerd/Miniflare, native SQLite DO/D1, Wrangler/GitHub Actions; existing lockfile.
+
+**Spec:** [accepted design](../specs/2026-11-01-finite-private-policy-setup.md) at ec08eda2f986fad608f7b1c113aa0dd877d378d8. Source inspected there; execution BASE is root's later qualified post-C1/Native5 revision, never presumed from this docs branch.
+
+## Global constraints
+
+- Source-only cloud work. No provider/private read, secret value, role/key/scope, OAuth action, deploy, DDL, live comment, occurrence, local dependencies/build or automatic recovery.
+- Original connection window<=900000ms; each request parent<=30000ms including queue, child<=5000ms clipped by parent/window. commandBy=min(actualReadExpiry,noticeExpiry,AccessProofExpiry,approvalExpiry,connectionWindowEnd)-480000-30000. Never renew ten-minute grants.
+- Post-T0 setupBy=T0+50000; adoption70s/ARM90s; original Known4args/18stages/70s/5s/20s and C0/C1/R1/history/uncertainty unchanged. No finite HEAD before all actual read-only eligibility checks.
+- PREPARATION uses real qualified Access realm/limiter/client/project/window bindings and independent profile grammar. C1 finite profile keeps OAuth/monitoring-owner closed and currently lacks those Access bindings. Never fake env flags or claim it already handles MCP.
+- Raw policy/context/JWT/cookies never logs/GHA/public artifacts; JWT/cookies never persist. Secret inheritance EXACT {name,type:'inherit',version_id:baselineVersionId}; no old_name/latest/omission/script-upload substitution.
+- Initial preparation publication, custody/API permission, actual baseline bytes/privacy and future runbook approval remain gates. Root's20:39:33.726UTC historical version GETs prove shape only: QA31bindings/14false/two SQLite classes; canary29/8false/AfwOwnEventNodeSQLite/container execution; OP7/3false/no export. They prove no current pointer/source lineage/secret value/artifact availability. Qualify actual copy descriptors before use.
+- Publisher metadata candidate only: root 20:45:01.750UTC exact-name account token 05718105dcdfc92e55cc3624172c2740, notBefore2026-10-28T03:00:00Z, expiry2026-11-03T02:59:00Z; one allow group 7e79ec33834341f28dd431ab73884400 on fixed canary script7d96bc137a854faa875ee0f160119810. AFW_MCP_CLOSURE_PUBLISH_TOKEN secret match/uploadability UNPROVED; future correct account verify and dated-policy trust mandatory, scopeVerified=false. Never substitute GHA9db or reader9aa; no repeat probe here.
+- operationalReadiness=false. No additional namespace, credential, public QA ingress or general URL/RPC authority.
+
+## Review focus and ordering
+
+Task1 journal/data -> Task2 actual owner/ticket/consent producers -> Task3 private transport/preconnection phases -> Task4 post-T0 setup -> Task5 C2 mounts/primary composition. Root completes Native5 source before integration; shared source changes are sequentially assigned.
+
+Pin these failures in owning tests: raw DTO falsely treated as authority(T1/2); latest-grant/changed selection(T2); omitted secret inheritance or late writer(T3); future-ACK receipt/expired consent(T3/4); changed project revision or fake runtime/Container capability(T5). No complete-package or live-ready claim from partial staging.
+
+## Shared exact interfaces and types
+
+All spec record schemas/purposes/limits remain exact: Preconnection, ConfigurationApproval, OwnerPreparation, Selection, Binding, GrantLink, NoticeLink, ConnectionSend/Ack/Receipt, PolicySend/Ack/Receipt. Decode rejects unknown/accessor/prototype/duplicate-key/noncanonical/bounds violations. Hashing excludes only each schema's named self-digest; ticketHash/subjectHash/requestHash remain committed inputs.
+
+Additional private Ticket EXACT {purpose:'afw.finite-owner-ticket.v1',ticketHash,subjectHash,sourceRevision,projectRef,connectionRef,preconnectionId,action,createdAt,expiresAt}; action connection|notices|finite, connectionRef null only before genuine grant. Opaque references are32-byte hex, no browser raw identity. TicketUse EXACT {purpose:'afw.finite-owner-ticket-use.v1',ticketHash,recordHash,consumedAt}; append-only.
+
+Lease={signal,assertCurrent}; source-owned assertCurrent checks original wall+monotonic deadline/identity around every await. MutationObservation={status:'recorded'|'existing'|'uncertain',recordHash:string|null}; ReadObservation={status:'observed'|'absent',record:immutable|null}. Neither grants send authority. StageOutcome<R> is EXACT {status:'installed',receipt:R} or {status:'admin_pending',mayRetry:false,operationalReadiness:false}; no caller-success capability.
+
+SetupContext EXACT {purpose:'afw.finite-policy-context.v1',intentId,sourceRevision,seedHash,preparationHash,selectionHash,bindingHash,T0,C0,C1,ownerPreparation,baselineProjectRevision,goal,saveIdempotencyKey,legacy,policies,baseline,rollback,expectedFull}. policies has exactly the six accepted private-slot names/string values. legacy uses the accepted private finite-plan legacy validator, never a new reduced history schema. baseline/rollback EXACT {versionId,deploymentId,module,configuration}; module uses the existing finite descriptor's actual name/sha256/bytes/exports grammar, configuration the actual activation/restoration field grammar with secret descriptors only. Codec checks shape; Task3 proves source/primary semantics; expectedFull EXACT {activationHash,restorationHash,bindingsHash}; new versionId belongs only to later actual receipt. <=64KiB/no modules/secrets.
+
+createFiniteOwnerPreparationStore({storage,now}) exposes:
+putPreconnection(record,lease); putTicket(ticket,lease); consumeTicket({ticketHash,recordHash},lease); putLink({kind:'grant'|'notice',record},lease); publishSelection({preparation,selection,expectedHeadHash},lease); bindSelection(binding,lease); putContext(context,lease) -> MutationObservation.
+readSelected({sourceRevision},lease)->{preparation,selection,binding}|null, binding=null until bound; readContext({intentId,sourceRevision},lease)->SetupContext|null.
+Keys are source-derived, never caller paths. publishSelection transaction appends exact preparation/selection and CAS head; bindSelection correlates originalT0/current selected hash once.
+
+createFinitePolicyEffectJournal({storage,identity,now}) exposes issue(send,lease), acknowledge(ack,lease), finish(receipt,lease)->MutationObservation; markAdminPending({reasonCode,observedAt},lease)->MutationObservation; read(lease)->{state,send,ack,receipt}, state absent|issued|acknowledged|installed|admin_pending. identity is EXACT connection{kind:'connection',preconnectionId,sourceRevision,stage,effect} or policy{kind:'policy',intentId,sourceRevision,setupInstanceId,effect}; stage connection|notices|finite, effect upload|activation. Actual record types match identity; finish is activation-only and checks its sibling upload ACK. Failure EXACT {purpose:'afw.finite-policy-failure.v1',identityHash,reasonCode,observedAt}, reasonCode validation|claim_uncertain|provider_uncertain|deadline|conflict. Returns are factual only.
+
+## Task1: strict private records and native journals
+
+**Create:** lib/mcp-qa-finite-preparation-records.mjs, lib/mcp-qa-finite-preparation-store.mjs, lib/mcp-qa-finite-policy-journal.mjs; test/mcp-qa-finite-preparation-records.test.mjs, test/mcp-qa-finite-preparation-store-native.test.mjs, test/mcp-qa-finite-policy-journal-native.test.mjs; test/fixtures/finite-preparation-store-worker.mjs.
+**Interfaces:** encodeFinitePreparationRecord(kind,value), decodeFinitePreparationRecord(kind,text), hashFinitePreparationRecord(kind,value), plus shared store/journal constructors. kind is the finite source enum of named record types above; no dispatch/transport/identity success.
+
+- [ ] RED: wrong private fields/hash domains/cyclic/future-ACK records fail; native concurrent selection CAS yields one winner; pointer away/back afterT0 rejects; cross-intent binding blocked; consumed ticket/lost storage ACK never resets; issue-before-send records survive reconstruction. Assert zero fetch/Workflow/HEAD calls.
+- [ ] Run hosted Task1 command below and retain genuine behavioral failure.
+- [ ] Implement exact codecs and transactions using actual DO storage; copy/freeze returned records, preserve all existing keys/history and uncertain outcomes. No runtime mount or production capability minted.
+- [ ] GREEN native SQLite tests and scoped lint; commit/report and stop for fresh review.
+
+## Task2: actual Access owner selection and genuine consent links
+
+**Create:** lib/mcp-qa-finite-owner-preparation.mjs, lib/mcp-qa-finite-owner-http.mjs; test/mcp-qa-finite-owner-preparation-native.test.mjs.
+**Modify:** scoped source integrations in lib/delegated-oauth-worker.mjs and lib/dossier-monitoring-owner-http.mjs, preserving ordinary flows/default closure.
+**Consumes:** T1; verifyCloudflareAccessJwtWithExpiry; createDelegatedOAuthStore(db).getGrant; createDelegatedProjectRepository({db,grantStore}).getOwnedProject; lib/dossier-monitoring-authority.mjs recordDossierMonitoringConsent.
+**Produces:** createFiniteOwnerPreparationHost({ctx,env}).fetch(request)->bounded Response; internal readFiniteOwnerPreparation({ctx,env,sourceRevision,intentId?,signal})->{preparation,selection,binding}|throw. Constructors resolve fixed source dependencies, not caller verifier/pins. Internal recordFinitePreparationGrant({ctx,env,request,grantId},lease) and recordFinitePreparationNotice({ctx,env,request,requestId,sequence},lease) return MutationObservation; request is the bounded preserved original request, other fields actual server-created grant/ack values. They reconstruct/link exact transaction evidence and fresh primary rows, never accept arbitrary external DTOs.
+
+- [ ] RED with real signature-verified synthetic JWT/JWKS and actual ephemeral D1: source/audience/owner/origin/cookie/ticket mismatch; no grant needed for initial owned-project choice; exact newly accepted grant versus latest; consent/notice revocation; sourceM pointer changed; raw IDs rejected.
+- [ ] Implement fixed /connections/finite-prepare request grammar and plain human purpose/bounds. QA independently verifies forwarded original request; source-qualified binding holders only. Every logical primary read uses fresh db.withSession('first-primary'); do not mistake listConsentProjects ORDER BY for selection.
+- [ ] Add fixed source calls after genuine createGrant+completeAuthorization success and after acknowledged monitoring consent. Produce GrantLink/NoticeLink only from original transaction plus exact current primary reread; no generic success callback/registration. Monitoring acknowledgement contains sequence/action/expiresAt, not eventHash: compute eventHash from the exact requestId/sequence primary row. Link failure keeps setup unavailable; never repeat grant creation or change ordinary consent/revocation semantics. Existing functions validate/create genuine consent, not provisioning. Missing publisher stage remains unavailable, not simulated success: Task2 tests prove authentication/records, not publication; Task3 supplies the fixed producer without caller registration.
+- [ ] GREEN T2 and existing OAuth/monitoring native suites; scoped lint; fresh review. Ordinary read permission never becomes configuration authority.
+
+## Task3: fixed private transport and three preconnection stages
+
+**Create:** lib/mcp-qa-finite-policy-transport.mjs, lib/mcp-qa-finite-connection-profile.mjs, lib/mcp-qa-finite-connection-preparation.mjs; modify Task2 owner host to call this actual fixed producer; test/mcp-qa-finite-policy-transport.test.mjs, test/mcp-qa-finite-connection-preparation-native.test.mjs.
+**Consumes:** T1/T2 plus source-approved module/profile/actual custody.
+**Produces:** qualifyFiniteConnectionProfile({phase,metadata})->immutable exact expectations; createFiniteConnectionPreparation({ctx,env}).run({preconnectionId,stage},lease)->StageOutcome<ConnectionReceipt>. Source privately constructs transport; no exported send-capability mint.
+
+- [ ] RED: all exact inherited binding descriptors include baseline UUID in requestHash; latest/omitted/renamed secret rejected. Lost/late version ACK never activates, foreign pointer blocks, stage replay/404 cannot resend; current baseline/rollback bytes/resources/exposure drift denies.
+- [ ] Implement fixed Workers Beta upload and fixed100%activation only. Original admitted invocation+source evidence+NEW durable claim ACK permits one send; journal boolean/hash alone cannot. Keep outstanding remote writes on unknown timeout.
+- [ ] Implement independent closed_ui/read_consent/notice_consent templates with exact Access audience/team/limiter/resource IDs qualified from approved private baseline, no invented constants. First two preserve preparation code; third uses actual qualified finite package bytes, closes OAuth/monitoring owner and records final preparation only after ACK/readback. Bound fifteen-minute window and each30s/5s parent.
+- [ ] GREEN native stage path using actual bound source constructors and explicitly synthetic CF/custody provenance. No actual credential/API probe; unknown actual custody/baseline stays unavailable. Fresh review.
+
+## Task4: actual post-T0 setup operation
+
+**Create:** lib/mcp-qa-finite-policy-setup.mjs; test/mcp-qa-finite-policy-setup-native.test.mjs.
+**Consumes:** selected owner record, readFiniteMaterialSeed, fixed source-authority/context, T1/T3.
+**Produces:** createPrivateQaFinitePolicySetup({ctx,env}).run({intentId,sourceRevision})->StageOutcome<PolicyReceipt>; runFinitePrivatePolicySetup({env,event,step})->StageOutcome<PolicyReceipt>; no raw policies.
+
+- [ ] RED: original owner/source/seed not complete, T0 pastcommandBy, changed grant/revision/selection, first HEAD touched, predicted new-version/terminal receipt, setup50s and child clipping, unknown prior SEND.
+- [ ] Bind selected preparation once; derive raw policies/C0/C1 from primary originalT0, immutable original context and existing validators. Preserve actual full hashes separately from publicStatic; no caller plan/env clone. One upload then one activation, exact version secret inheritance, no nominal/Container.
+- [ ] Require actual version/module/readback and context persistence before installed receipt. Later primary completed-success setup/output/writer/pointer qualification remains required; emitting a receipt cannot prove self-terminal.
+- [ ] GREEN native Task4 plus seed/bridge/control tests and scoped lint; fresh review.
+
+## Task5: C2 mounts, retained primary and final dependency gate
+
+**Modify:** worker/mcp-own/connection-preparation.mjs(new), worker/independent-closure/finite.mjs and actual existing classes; source-authority and planned lib/mcp-qa-finite-material.mjs. Create test/mcp-qa-finite-preparation-mount-native.test.mjs.
+**Produces:** readPrivateQaFiniteSetupContext({ctx,env,intentId,sourceRevision,signal})->immutable {context,receipt}; planned createPrivateQaFiniteMaterial({ctx,env,refs})->EXACT {controlOptions,readFinalPrimary,custody}. These are planned owned producers, not already available APIs.
+
+- [ ] RED actual Worker->QA DO->D1+Workflow mounts: independent Access proof, private data never in outputs; missing actual binding/custody/profile denies before effects; ctx.container/class/source mismatch denies prepare; Save/revoke changes current rows but cannot replace immutable baseline; all pre/post-T0 writers block restoration until settled.
+- [ ] Install only fixed source constructors with actual ctx/env and proven binding provenance. Initial preparation entry is independent of global OAuth gate; protect original request forwarding and fixed actor. Integrate Native5 completed setup prerequisite and36 absolute2s adoption slots through70s/ARM90s without another active-instance exception.
+- [ ] Explicit C3 dependency: delegated-oauth-worker:135 returns before /mcp when OAuth=false; :194 needs Access/limiter/pins absent from C1 finite profile. C3 must separately implement/review a narrow finite HTTP/resource-only existing-grant route with current finite control, preserving default closure; no env clone/true-flag bypass/new OAuth/server here. This plan cannot certify the full business route.
+- [ ] GREEN mounted native path and affected existing tests/scoped lint/dry-run generated profiles. Root composes full-suite/review after Native5/C2/C3; actual promotion/publication/privacy/custody/consent remain separate.
+
+## Commands, evidence and handoff
+
+Hosted Node 22: npm ci --ignore-scripts --no-audit --no-fund.
+T1: node --test test/mcp-qa-finite-preparation-records.test.mjs test/mcp-qa-finite-preparation-store-native.test.mjs test/mcp-qa-finite-policy-journal-native.test.mjs.
+T2: node --test test/mcp-qa-finite-owner-preparation-native.test.mjs test/cloudflare-access-identity-expiry.test.mjs test/delegated-oauth-flow.test.mjs test/dossier-monitoring-oauth-native.test.mjs test/dossier-monitoring-owner-native.test.mjs.
+T3: node --test test/mcp-qa-finite-policy-transport.test.mjs test/mcp-qa-finite-connection-preparation-native.test.mjs test/mcp-canary-restoration-transport.test.mjs.
+T4: node --test test/mcp-qa-finite-policy-setup-native.test.mjs test/mcp-qa-finite-seed-http.test.mjs test/mcp-qa-finite-publication-bridge.test.mjs test/mcp-qa-finite-trial-control-native.test.mjs.
+T5: node --test test/mcp-qa-finite-preparation-mount-native.test.mjs test/mcp-qa-finite-read-rpc-native.test.mjs test/mcp-own-finite-entrypoints-native.test.mjs; affected Native5 tests after root integration.
+Each task npx eslint with exact changed JS paths recorded in its report. Only generated-byte Wrangler --dry-run --no-bundle for affected profiles; no provider calls. Temporary qualifier branch-only/excluded integration.
+
+Report docs/superpowers/reports/2026-11-01-finite-private-policy-setup-taskN.md; append existing finite progress ledger. Record exact BASE/code/docHEAD, RED/GREEN commands/run/job/counts, source/fixture limits, remaining gates, CAS/readback and fresh review. First brief ../briefs/2026-11-01-finite-private-policy-setup-task1.md. Stop writes at each gate; no extra agents from briefs. This plan authorizes no implementation/runtime action until root dispatches the scoped task.
+
+
+## Root C2 Task1 exact-contract rulings (2026-11-02, before implementation)
+
+Source-only BASE 6c3b0f951d2c7a63cbf9abfd4aea81222bf1cd9a. Root approved narrow read-only validatePrivateQaFiniteLegacy({legacy,T0}) in mcp-qa-finite-trial-control.mjs, factoring the exact existing previous-field/hash/source validator and reusing legacy(plan,T0); exact own-data pair, immutable legacy only. No fabricated full plan/weaker duplicate; old finite-control native command joins GREEN. Baseline/rollback module is actual validateFiniteModule EXACT {name,sha256,bytes}; exports belong to configuration.exports/profile qualification, never a fourth descriptor field. Configuration is checked with actual activationConfigurationHash (seven keys, secret_text name/type only) AND separately fingerprinted with restorationConfigurationHash. Full source/binding correctness remains T3/T5.
+
+GrantLink and NoticeLink keep exact spec field lists WITHOUT purpose/selfhash. Their digest domains are afw.finite-grant-link.v1 and afw.finite-notice-link.v1 plus newline plus ASCII-key-sorted canonical full record. ConnectionRef map likewise has no purpose/selfhash; domain afw.finite-connection-ref.v1. Other record domains use actual purpose and exclude only their named selfdigest. Root accepted explicit fail-closed RED shells with actual SQLite mounts and behavioral assertions; missing dependencies/syntax/mounts are not qualifying RED. No positive authority placeholder.
+
+
+Root C2 Task1 additional exactness ruling: policies has exactly AFW_DOSSIER_EVENTS_POLICY, AFW_DOSSIER_PERMISSION_WITHDRAWAL_POLICY, AFW_DOSSIER_RETIREMENT_POLICY, AFW_DOSSIER_SUCCESSOR_POLICY, AFW_OAUTH_PILOT_CLIENT_ID and AFW_OAUTH_PILOT_PROJECT_ID. Project digest is SHA256('afw.finite-owner-project.v1\n'+ASCII-canonical exact {projectId,revision,synthetic}). Standalone ConfigurationApproval checks digest shape; embedded OwnerPreparation checks exact project digest/source/goal. Optional narrow hashFiniteOwnerPreparationProject factual helper confers no authorization. Preconnection approvalHash remains a T2 source correlation to actual stored ConfigurationApproval.
+
+
+Root C2 Task1 identity ruling: Failure.identityHash and journal key derive SHA256('afw.finite-policy-effect-identity.v1\n'+ASCII-canonical EXACT validated identity union INCLUDING kind/effect). Connection union is {kind:'connection',preconnectionId,sourceRevision,stage,effect}; policy union is {kind:'policy',intentId,sourceRevision,setupInstanceId,effect}. Sibling upload replaces only effect with literal upload and hashes same union/domain. No caller key or omitted dimension; afw.finite-connection-stage.v1 remains separate. Shared factual identity helper may be exported; digest never creates send authority. Unknown/late SEND remains outstanding.
+
+
+Root C2 Task1 program provenance ruling: OwnerPreparation.sourceRevision and approval.sourceRevision are runtime/sourceM and MUST match. programContext.sourceRevision is the actual program revision, potentially distinct from M; T1 checks 40hex plus programHash/originalContextHash shape. T2/T4 must correlate all three values with current primary program and exact selected project/goal. No equality to runtimeM, substituted current program or synthesized source authority.
+
+
+Root C2 Task1 actual publication chronology ruling: append private source-owned {selectionHash,publishedAt} witness under sourceM/selection-derived key, without public schema/API changes. Sample publishedAt AFTER the atomic preparation+selection+head-CAS transaction promise successfully settles, with original lease assertions before/after. A second append-only transaction is allowed; recorded requires witness ACK and exact readback. Missing/uncertain head/witness => uncertain factual state; preserve history/head and never reconstruct/manufacture/backdate a witness. Binding requires exact current selection plus durable witness selectedAt<=publishedAt<=originalT0. Delayed witness storage never pretends a head ACK happened earlier. No reset/refund/rollback/authority. Cover actual backdated publication, original transaction held acrossT0, lost head/witness ACKs with focused hosted RED/GREEN.
+
+
+## Root Task2 exact-contract correction — before product edits
+
+BASE `270ef346ac5e87cec87aa4ea7de0527e3f75a826`. Root approved a fixed unavailable owner-source module (actual qualification T3/T5), ONE qualified own-synthetic project, strict ProjectRef/AuthorizationLink maps and factual store reads/writes, existing grantId/authorization-handle hash identities, and new explicit correlation digests. The complete proposed exact source tuple, immutable initial-baseline versus later current-stage distinction, HTTP grammar, primary hash subsets, chronology and noncircular decision/consume/approval relationship are in [Task2 brief: Root Task2 contract amendment](../briefs/2026-11-01-finite-private-policy-setup-task2.md#root-task2-contract-amendment--proposed-exact-table-validation-pending). That ONE table is the contract review target; exact tuple/subsets await Root validation before product code.
+
+Positive tests may statically replace only the new owner-source module with an explicitly synthetic fixture while retaining real signature/JWKS/HTTP/native D1/store work. Production has no registration/caller pins/env-success, stays unavailable until actual T3/T5 qualification. Include affected T1 records/store suites in T2 coverage. Ordinary completed OAuth grant survives preparation-link failure; no latest grant, inferred synthetic title, renewal, source pointer substitution or initial-baseline rewrite. No actual owner/provider operation or new namespace/DDL. Documentation-only amendment; no tests required; operationalReadiness=false.
+
+
+## Root validation of Task2 amendment — corrections accepted before product work
+
+Root validated the preceding exact table at6b450267 with these binding corrections. These supersede only the conflicting proposed entries; all other exact fields/domains/chronology are approved. Source BASE remains270ef346; this is documentation-first correction, not runtime authorization.
+
+- Add `qaVersionId` UUID to EXACT source tuple and compare actual native `env.QA_VERSION.id`. Namespace identity does not establish current QA version. T3/T5 must prove actual source/module/bindings/current pointer.
+- QA DO primary project/grant/consent/program reads use actual `env.RELEASE_DB`, the existing canary release D1 binding; NEVER QA `env.DB`. Ordinary canary OAuth/monitoring continue their existing env.DB. No environment alias/clone. Private preparation state uses actual ctx.storage. Missing/wrong RELEASE_DB must deny; T3/T5 verify actual binding IDs/holders.
+- Add private factual `OwnerSourceSnapshot` EXACT `{preconnectionId,initialTicketHash,source,sourceHash}`; source is the complete validated INITIAL tuple INCLUDING qaVersionId, closed_ui phase and initial currentPublication; sourceHash=D(`afw.finite-owner-choice.v1`, EXACT `{preconnectionId,initialTicketHash,source}`). No purpose/other selfhash/credentials/source bytes. Strict codecs and append-only store `putOwnerSourceSnapshot(record,lease)` / `readOwnerSourceSnapshot({preconnectionId},lease)`, key `connection-preparation:<preconnectionId>:source`, T1 observations/lease/snapshot discipline. This data never qualifies source.
+- Initial GET must obtain durable snapshot+ProjectRef+Ticket ACK/readback BEFORE emitting handle. Partial or lost ACK preserves factual writes and never implies approval. POST independently resolves current source and compares initial snapshot EXACT before approval: changed goal/programContext/initialBaseline/window/revision/QA version denies. Meaningful goal/program between-requests regressions required. Original source window cannot restart from GET/POST or stage progression.
+- Later phases may differ ONLY through separately source-qualified phase/currentPublication chain; original snapshot, project, goal, program and window stay immutable. initialTicketHash resolves original consumed configuration decision without scans/latest lookup. Later stage tickets/cookies retain exact same preconnection+ProjectRef and original window. Broad rehearsal authorization never replaces explicit displayed goal and verified configuration approval.
+- All proposed hashes/map schemas/store reads, including readTicketUse and noncircular decision digest, are approved. Actual consume ACK/readback precedes ConfigurationApproval. Existing OAuth handle/grant hash and monitoring algorithms stay unchanged.
+- Forwarding uses existing fixed QA namespace/actor through actual source-qualified binding and preserves bounded original request. Never treat canary ExecutionContext as QA DO ctx/storage; no public QA ingress, credential or generic URL/RPC. Mount/caller-holder qualification belongs T5; fixed source adapters may remain unavailable meanwhile. Positive fixture provenance is explicitly synthetic; production resolver unavailable is a mandatory later gate, not a waiver.
+
+Proceed scoped T2 TDD after this documentation commit; no further pause except concrete unresolved contract gaps. No provider/private read, credential/real OAuth/OTP/consent/window, local project/deps/build, DDL/deploy/main merge/first finite HEAD/owner request. operationalReadiness=false.
+
+
+## Root Task2 identity and forwarding ruling (2026-11-02)
+
+Final OwnerPreparation.prepId MUST equal its original preconnectionId: the SAME original server-generated random32-byte ID is reused, never newly allocated or aliased. ONE final preparation per original preconnection; source/owner/window remain unchanged. No T1 schema change/secondary index/latest scan. readFiniteOwnerPreparation resolves exact prepId keys for original OwnerSourceSnapshot, Preconnection, GrantLink and NoticeLink and requalifies current source/primary. ID equality is factual correlation only, never permission. Task3 final producer MUST retain this invariant; immutable selection/binding/history and no renewal remain.
+
+Approved fixed default-unavailable source forwarding exports: forwardPrivateQaFiniteOwnerAuthorization({ctx,env,request,authorizationHash},lease), forwardPrivateQaFiniteOwnerGrant({ctx,env,request,grantId},lease), forwardPrivateQaFiniteOwnerNotice({ctx,env,request,requestId,sequence},lease). Only actual server-success refs and bounded preserved original request; no generic RPC/URL/status/identity DTO or registration. The original lease starts at actual canary request receipt BEFORE first SDK/auth/DB IO; hooks/QA may never restart30s/5s. T5 must qualify native sender/binding/holder and original-deadline/abort forwarding, overwriting any internal transport metadata from trusted source; actual transport remains unavailable here. Canary ExecutionContext is not QA DO ctx/storage. Unrelated ordinary consent is unchanged; a failed prep hook cannot revoke completed authorization or repeat grant creation.
+
+
+## Root SameSite browser-flow correction before source hooks
+
+Keep the preparation cookie SameSite=Strict. A cross-site initial /authorize navigation may omit it; never relax it or infer preparation from subject/time. In addition to genuine beginConsent+consent-row GET mapping when the cookie is actually present, Root approves one exact same-origin POST mapping point: AFTER actual api.approveConsent(request,h) succeeds, BEFORE store.consumeConsent/createGrant/completeAuthorization. The fixed sender passes authorizationHash=existing SHA256(h); QA independently verifies original prep cookie/ticket/current source and exact still-unconsumed original consent row. Existing map is read-only/idempotent; no replacement or refreshed issuedAt. Actual SDK-approved handle plus original configuration decision establishes transaction correlation before any grant. No cookie remains ordinary OAuth without preparation success; wrong handle/source/cookie never creates a link. Mapping after grant by matching rows/time stays forbidden. Missing/failed link cannot repeat or revoke genuine OAuth completion. Real SDK/native tests must cover GET without prep cookie then same-origin POST with it; this is HTTP fixture evidence, not an actual browser session. Actual forwarding qualification remains T5 unavailable.
+
+
+## Root Task2 exact preconnection-to-connection topology (2026-11-02)
+
+APPROVED completion requirement: PreconnectionConnection EXACT `{preconnectionId,connectionRef,grantHash,linkedAt}`, no purpose/selfhash; D(`afw.finite-preconnection-connection.v1`, whole exact record). Key `connection-preparation:<preconnectionId>:connection`. Fixed store `putPreconnectionConnection({relation,connection},lease)` atomically appends BOTH relation and exact existing ConnectionRef; `readPreconnectionConnection({preconnectionId},lease)` returns ReadObservation. Same original lease, strict immutable snapshots, no generic index/scan. Actual stored Preconnection+GrantLink must correlate owner/client/project/resource/grant and original source/window; recompute existing SHA256(grantId) identity. Require relation.linkedAt>=GrantLink.acceptedAt, connection.issuedAt=linkedAt, exact connRef/grantHash, times<=actual clock and expiry within original preconnection. Source additionally clips to fresh actual grant/Access expiration.
+
+Only genuine grant producer after actual GrantLink ACK+readback may allocate the initial random32-byte ConnectionRef. First exact pair wins; competing ref cannot replace it. Unknown/lost ACK, missing one side or conflict stays pending/uncertain, never re-mints/renews from absent read after an unknown attempt. Reconstruction recovers exact paired factual records only. A GrantLink already present with absent relation is NOT a new-allocation opportunity. Reader uses exact preconnection→relation→ConnectionRef. Task3 stages MUST consume this existing immutable pair, never synthesize a newer reference, scan maps or treat the relation as permission. Native atomic-pair/lost-ACK/conflict and actual grant-producer→subsequent-stage/read tests are required; no unexplained test-seeded map stands in for the producer.
+
+
+## Task2 source completion / Root review gate (2026-11-02)
+
+Code HEAD `0bf4dc1247550ab7b71a5242d465c5905a2bc531`, tree `f136b16e5137a2f103b9838e5bcc6aeea6f7e4fc`; hosted run41383552325/job125079335946/attempt1:24native+60affected=84PASS,0FAIL/0SKIP/0CANCELLED; scoped lint0errors/0warnings, artifacts0. Full exact RED/GREEN/commands/limits: [Task2 report](../reports/2026-11-01-finite-private-policy-setup-task2.md).
+
+Actual Access signature/expiry, release-primary owner/revision, exact original transaction links, original decision snapshot and atomic preconnection→ConnectionRef facts are implemented/tested in source. The fixed owner-source and three forwarding adapters intentionally remain UNAVAILABLE until T3/T5 actually qualify source/binding holders/QA_VERSION/RELEASE_DB/module/initial baseline/current stages/program and original cross-worker deadline/abort; no registration, caller authority or runtime readiness claim.
+
+Task3 must retain original prepId=preconnectionId, initial snapshot/window/program/baseline, exact paired ConnectionRef and original grant/notice expiry; no latest lookup, re-mint after uncertain absence, or grant/permission renewal. A read grant never authorizes configuration or publication. T5 cleanup/retirement/final-primary/withdraw/close/seal/proof factories must use retained original context plus actual withdrawal/settlement; do not require the positive ACTIVE eligibility reader after authorized Save/revoke or change Native5/C0/C1/R1 controls.
+
+DONE_WITH_CONCERNS/SOURCE ONLY; fresh Root spec+quality review pending. No provider/private/auth/runtime action. STOP WRITES after final docs CAS/readback; no Task3 implementation. operationalReadiness=false.
+
+### C2 Task2 fix round 1 — Root profile-binding correction (2026-11-02)
+
+Root corrects its earlier `env.QA_VERSION.id` shorthand: the accepted source `finitePublicProfileTemplate('qaLive')` and existing native publication bridge expose the version_metadata binding `AFW_QA_VERSION`. The source tuple field remains `qaVersionId`; resolution MUST compare exclusively actual `env.AFW_QA_VERSION.id`, with no QA_VERSION alias, new binding, profile change or cloned environment. This is a plan correction based on pinned repository source, not provider observation or deployment qualification. Record as round1 finding 2 alongside the reviewer's child timeout P2. Add real native positive with only the profile-derived binding name and negative with only the obsolete shorthand; preserve original source/parent/child/signature semantics and operationalReadiness=false.
+
+### C2 Task2 fix round 1 — Root QA rate-limit binding correction (2026-11-02)
+
+Root extends the same actual-role dependency correction: `finitePublicProfileTemplate('qaLive')` declares `AFW_QA_OCCURRENCE_RATE_LIMITER`, not the canary role's `DELEGATED_RATE_LIMITER`. The private QA owner host MUST call the existing actual QA limiter directly with its existing finite-owner key. No alias, new binding/namespace, cloned environment, quota/settings or unrelated key change; ordinary canary OAuth/monitoring retain their existing DELEGATED_RATE_LIMITER. The native owner fixture takes the binding name from the accepted profile and includes a legacy-only rejection. This corrects earlier QA-role assumptions; source inspection is not actual provider/resource/holder qualification, which remains T5-unavailable.
+
+### C2 Task2 fix round 1 — final source checkpoint (2026-11-02)
+
+codeHEAD `33ade9569fe0f5d770a4ee2a9ed59cb6f68c6b22`; final hosted run41444334695/job125273592435 attempt1: 59PASS/0FAIL/0CANCELLED/0SKIP; scoped lint0/0; artifacts0. Child guard captures each operation and cannot be revived; already committed uncertain facts preserved. QA role exclusively uses existing `AFW_QA_VERSION` and `AFW_QA_OCCURRENCE_RATE_LIMITER`, with profile-derived native positive and obsolete-alias negatives. Full RED/GREEN, exact commands, CAS/readbacks and limits appended to the Task2 report and finite progress ledger. No runtime qualification; source/forwarding remain unavailable pending T3/T5. STOP WRITES after enclosing docs commit/readback; Root fresh scoped review of reviewed docHEAD3aead938..fixHEAD.
+
+## C2T3 preflight — schema and existing resource preservation
+
+Ruling: use the documented Beta JSON modules payload on the fixed explicit-version-inheritance endpoint, not classic multipart — public API schema now inspected directly — a wrong wire format would fail upload, so pin tests before effects. Source API payload, normalized actual configuration and request fingerprints stay distinct.
+
+Ruling: preserve the existing declared AfwOwnEventNode SQLite/Container linkage in preparation AND finite profiles; amend the source canaryLive container projection/expectations instead of publishing its staging containers[] marker as if it preserved attachment — Root four GETs at2Nov12:35UTC observed exact current UUID metadata with existing attachment — wrong preservation could detach the existing app or trigger export reconciliation, so no new namespaces/migrations/transfer/delete and reject any unknown reconciliation. Source metadata does not prove ctx.container physical ability. Fixture/profile/dry-run coverage must show preservation without provisioning/building an app/image.
+
+Primary/schema report docs/superpowers/reports/2026-11-02-preparation-provider-schema.es.md. Public docs: https://developers.cloudflare.com/api/resources/workers/subresources/beta/subresources/workers/subresources/versions/methods/create/. No further provider probe from this source task. All actual custody/baseline bytes/privacy/source qualification and runtime acceptance remain gates.
+
+## Root C2 Task3 exact contracts (2026-11-02, before affected code)
+
+SOURCE ONLY. Original BASE `2e80783c1d821c3e507f5217ead421237cb87887`. Unique Task3 writer; operationalReadiness=false. These rulings resolve source contracts, not owner/provider authority.
+
+1. StageApproval EXACT {purpose:'afw.finite-connection-stage-approval.v1',preconnectionId,sourceRevision,stage,ticketHash,approvalHash}, no selfdigest; existing D(actual purpose,canonical whole record). Key connection-preparation:<id>:<stage>:approval. putStageApproval(record,lease), readStageApproval({preconnectionId,stage},lease) use factual T1 observations and immutable append-only storage. Verify actual Preconnection/sourceM/owner/project/client/window; original Ticket.action=stage, preconnection/source/projectRef; actual TicketUse.recordHash=ConfigurationApproval.csrfReceiptHash and recomputed original decision digest/current proof limits. connection matches original pre.approvalHash and initialTicketHash; notices/finite match exact original atomic ConnectionRef. No latest scan or consent-to-configuration inference.
+
+2. Final audit EXACT hash-only value {preconnectionId,sourceRevision,sourceHash,preconnectionHash,stageApprovalHashes,stageReceiptHashes,grantLinkHash,noticeLinkHash,connectionRelationHash,connectionRefHash}. Each stage hash map EXACT {connection,notices,finite}. D('afw.finite-owner-preparation-audit.v1',canonical whole exact value); sourceHash=original OwnerSourceSnapshot.sourceHash, preconnectionHash=original recordHash. Other hashes use actual acknowledged/read-back StageApproval/ConnectionReceipt/link/relation/ref records. A narrow factual hashFiniteOwnerPreparationAudit may be shared. No future/self OwnerPreparation/selection hashes or authority.
+
+3. Reader retains original pre.approvalHash/initial-ticket checks independently. OwnerPreparation.approval maps FINAL finite-stage actual ConfigurationApproval into existing own-synthetic-policy-preparation purpose/decision approve/source/project/goal/times/csrf. Qualify all three actual stage approvals/receipts and recompute audit. Preserve original owner/window/baseline/program; prepId=preconnectionId. Final preparation/selection follows finite activation ACK/readback, before commandBy, with actual publication witness.
+
+4. Original-invocation admission: unexported WeakMap in owner-preparation keyed exact ORIGINAL incoming request lease. ONLY actual same-origin POST with verified current Access/source/primary, NEW consumeTicket status recorded, and exact durable decision/approval/StageApproval ACK/readback may set it. Entry captures ctx/env refs, preconnection/stage/stageApprovalHash and SAME already narrowed proof lease, never a settled five-second child/new clock. Export ONLY consumeFiniteOwnerStageAdmission({ctx,env,preconnectionId,stage},originalLease); delete synchronously before validation/await, match exact refs/native source and assert lease, returning frozen private {lease,ownerSource,stageApprovalHash}. No setter/registry/DTO/RPC mint; reconstruction/uncertain/existing facts confer none. Public run consumes once before source IO. owner-http imports owner-preparation and connection-preparation; latter imports consume-only, avoiding cycles. parent.finish invalidates unused admission. Internal result carries refs only to fixed caller; HTML/JSON never projects them. Forms derive stage from server Ticket.action, never a body stage field.
+
+5. Fixed readPrivateQaFiniteConnectionSource({ctx,env,preconnectionId,stage},lease) remains default unavailable, with no runtime override. createFinitePolicyTransport({ctx,env}) privately captures actual existing native CF reader/publisher identities, not caller fetch/URL/credential/pins/success DTOs. T5 owns actual source/custody/byte qualification. Exact private material/transport/settlement table remains subject to Root ruling BEFORE transport/producer code; reuse actual baseline/rollback {versionId,deploymentId,module,configuration}, separate private bytes <=3MiB each, M-qualified candidate, existing exposure/execution validators and recoverable closed rollback. No invented GitHub token/public artifact/general module RPC. Actual byte residency remains a T5 gate.
+
+6. Independent Container correction is approved now: preserve dated existing AfwOwnEventNode SQLite/name/namespace in public+Wrangler source templates and wrangler.mcp-own.finite.jsonc, regenerate dynamic hashes/build metadata. Beta wire containers=[{class_name}], normalized helper validates/reintroduces actual name, exports preserves existing container name. No Docker image directive/app/image build/new namespace/migration/transfer/delete; use schema-correct unsafe metadata for source dry-run if needed. Unexpected reconciliation remains administrative pending. No runtime capability inferred from metadata.
+
+Hosted meaningful RED/GREEN plus scoped lint/native compiler/generated-byte dry-run only. No local source/clone/dependencies/build/temp downloads, provider/private probes, credentials, real auth/consent/window, DDL/deploy/cron/Container action, occurrence/main merge/Max or subagents. Stop writes for Root review after Task3 report.
+
+## Root C2 Task3 private material and effect ownership (2026-11-02)
+
+Record before transport/producer implementation. SOURCE ONLY; operationalReadiness=false.
+
+| Private field / boundary | Exact contract and ownership |
+| --- | --- |
+| readPrivateQaFiniteConnectionSource({ctx,env,preconnectionId,stage},lease) | Fixed default-unavailable source module; no runtime replacement/registry. Returns EXACT frozen {ownerSource,baseline,rollback,candidate,bytes,assertCurrent}. No owner permission inferred from data. |
+| ownerSource | Existing validateFiniteOwnerSource grammar, original sourceM/QA/owner/project/client/goal/program/window/baseline retained. |
+| baseline / rollback | Existing EXACT {versionId,deploymentId,module,configuration}; validateFiniteModule plus <=3MiB, actual qualifyFiniteWorkerVersion(canary; rollback closed:true), activationConfigurationHash/restorationConfigurationHash, snapshotOwnWorkerExecution. |
+| candidate | EXACT {sourceRevision,role,module,configuration,publicStatic}; role preparation or canaryLive. preparation publicStatic=null and exact qualified phase; first two stages preserve actual baseline bytes. canaryLive uses actual M-qualified package descriptor/role/publicStatic and private bytes. |
+| bytes | EXACT {baseline,rollback,candidate}, defensive native Uint8Array copies matching descriptor/hash, <=3MiB each; never persisted/serialized/logged/artifact/public RPC. Source-private real residency and package privacy remain mandatory T5 gates. |
+| assertCurrent(lease) | Fixed source-owned closure qualifies actual ctx/env/binding holders/credential roles/custody/window/program/closed rollback and current exposure. No caller callback authority. Existing version urls and snapshotOwnWorkerExecution checks remain; routes/workers.dev/previews/crons/tails and ALL old pre/post-T0 writers qualify inside actual T5 closure against approved source, unavailable until implemented. No standalone exposure DTO/validator or invented post-T0 control. |
+| createFinitePolicyTransport({ctx,env}).run({preconnectionId,stage},originalLease) | ONLY exported effect method; synchronously consumes actual original owner admission before async IO, privately loads source/journal, captures actual native reader/publisher/global fetch identities, requires NEW SEND+readback before fixed CF requests. No upload(body), generic request, URL/pins/credential argument or exported mint. |
+| Transport result | PRIVATE EXACT {outcome,admission}; outcome is existing exact StageOutcome, admission is consumed actual {lease,ownerSource,stageApprovalHash}. JS-internal only; never HTTP/RPC/JSON/log. Captured narrowed lease is not a new clock. |
+| createFiniteConnectionPreparation.run | Calls the one transport.run; only installed permits post-stage/final preparation using actual captured admission; returns only StageOutcome. Reconstructed/missing admission fails before effects. |
+| Settlement | Transport per-actual-ctx WeakMap retains underlying CF promises until actual fulfillment/rejection after timeout. Producer similarly retains actual journal/storage operations with captured child guards. Abort/race completion is not settlement; durable unknown SEND stays blocking across reconstruction. ALL old writers must block positive qualification/restoration; T5 inventory mandatory, no actor-local-only claim. Any actor-wide durable index needs separate exact Root ruling before implementation. |
+| Expected own transition | Before effect, immutable source and baseline pointer. After timely activation ACK plus exact primary code/config/pointer readback, permit ONLY this stage's expected phase/currentPublication change; captured immutable core plus actual journal/ACK/raw pointer qualifies pre-receipt state, full new ownerSource only AFTER receipt ACK/readback. No future receipt cycle, unrelated drift, initial snapshot replacement or renewed expiry. |
+
+Beta publication remains full schema-qualified JSON/base64/deploy=false and explicit inherit UUID, preserving actual existing namespace/SQLite/Container. No lifecycle weakening, additional credentials, private/public provider probes, general module upload, Docker/image/app/migrations or automatic recovery.
+
+Root approves a DERIVED DRY-RUN-ONLY hosted config: remove top-level exports only in that transient config, retain exact unsafe.metadata.exports/container class declaration. Wrangler otherwise requires a local containers image configuration for the named export. Never deploy/publish that derived config or equate its warning/success with full runtime/profile acceptance. Full source/Beta export/container metadata remains intact. Validate generated module byte/hash identity before/after no-bundle dry-run; no fake image/Docker build.
+
+## Root C2 Task3 actor-wide factual writer head (2026-11-02)
+
+Before journal mutation: key afw.finite-policy-effect.v1:writer-head holds EXACT {identityHash,sendHash}. NEW SEND and head advance are atomic in the same native journal transaction. Advance only after strict matching predecessor SEND+ACK/readback; no clear/reset/delete. Unknown/lost ACK blocks all later SEND including other preconnections after restart. Existing same-send replay never advances or grants capability. Applies connection and policy factories; unrelated finite-trial HEAD stays untouched.
+
+Journal remains factual {storage,identity,now}: no assertSettled callback, success boolean or native-source claim from stored records. Actual fixed transport/source independently qualifies legacy writer inventory before absent-head first issue and underlying settlement before every advance. Its per-ctx registry retains ENTIRE admitted stage work/queued callbacks and actual CF/storage promises until real settlement, never just Promise.race. Only SAME original admission lineage continues itself; another preconnection cannot use an early ACK to bypass pending stage work. T5 source current/primary/writer inventory owns older cross-path reconciliation and remains unavailable until qualified. Unknown head/data/settlement fails closed. Cover atomic head concurrency, different-preconnection unknown, restart reconstruction denial and held actual promises. No registry/mint or storage-derived authority.
+
+## Root C2 Task3 actual original and effect deadline (2026-11-02)
+
+Before code: readFiniteOwnerRequestDeadline(originalLease) is a read-only getter from an unexported WeakMap populated ONLY by actual createFiniteOwnerRequestLease at request receipt, removed on finish. Assert exact original issued/current lease; clone/unissued/finished reject. Returns original wall receipt+30000; no setter/renewal/new parent or admission schema change.
+
+Each publication effect child begins BEFORE SEND transaction/readback. Its captured wall+monotonic duration is <=5000ms clipped by original deadline, source window, actual Preconnection/approval/Access bounds. ConnectionSend.deadline is min of those actual bounds and this SAME effect child's wall end. Claim/readback/network/ACK share the child's nonrenewable budget; never start another five seconds after claim or before fetch. Native captured guard invalidates on expiry/abort/settlement; timeout is not physical settlement. Test clone/finished getter and delayed actual native SEND ACK consuming the original child's budget. T4 has its own fixed original native clock; this getter never supplies setup authority.
+
+## C2 Task3 source handoff (2026-11-02)
+
+DONE_WITH_CONCERNS / SOURCE ONLY. Report: [2026-11-01-finite-private-policy-setup-task3.md](../reports/2026-11-01-finite-private-policy-setup-task3.md).
+BASE `2e80783c1d821c3e507f5217ead421237cb87887`; final code/test HEAD `72ab2aea12a86471ae20ba342bd4b8115fe315d8`; last product-code commit `8216659e8900be92031d03fa37ad4d91838aab80`.
+
+Three server-ticket configuration approvals now produce fixed private Beta upload/activation stages, actual journal receipts, exact final approval/audit/selection and publication witness. Original lease admission is private consume-once; original30s and captured5s claim-to-send budget cannot renew. The actor writer head and retained actual work block unknown writers; rejected acknowledged readback preserves a factual failure barrier. Plain UI text distinguishes confirmed configuration from uncertainty.
+
+Full targeted hosted GREEN at `ec83c42f594ff0751dcf7a17a9a9d147a338b29d`: run41457985200/job125319474707/attempt1,120pass0fail, scoped lint, derived byte-only qa/canary dry-runs and exact emitted-byte comparisons pass, artifacts0. Final changes after that checkpoint affect tests/workflow only: actual complete-wire commitment assertion passes in the41-test transport group at19f01dda; final actual Miniflare/SQLite restart proof at72ab2aea run41460645920/job125328488776/attempt1 passes7/7 and scoped lint, artifacts0. The final run is focused, not another full120 run. The report preserves every RED/diagnostic and its limits.
+
+Actual private owner/material/forwarding sources remain unavailable until T5 qualifies real M bytes/residency/custody, source/primary/exposure/credentials and ALL old writer lineages. Initial preparation publication, T4 setup, C3 business/early-withdrawal surface and attended live acceptance remain separate. No provider/private read, credentials, real auth/consent/window, deploy/DDL/Container/image/migration, first finite HEAD, occurrence, main merge or local source/build occurred. operationalReadiness=false; no PC-off acceptance. Derived dry-run config must never be deployed; full source/Beta existing Container declarations remain preserved.
+
+Temporary branch qualifier is contents:read/no secrets/artifacts/deploy and docs-filtered; exclude from integration. Every source/docs commit uses expected-head CAS plus independent ref/file readback. STOP WRITES after report/ledger readback for fresh Root spec and quality review. No Task4 implementation.
+
+### Fix round1 implementation boundary, before product code
+
+Root accepted one INTERNAL denial/retention scope keyed by actual ctx and exact already-consumed admission reference, retaining original env/storage/primary/request references. It cannot mint an admission, SEND or replacement lineage. Transport and final producer enter the same scope; nested owner factual child operations register their actual native Promise before racing timeout. Each promise is removed only on fulfillment/rejection, and the ctx entry can disappear only after original parent completion AND an empty actual-work set. A competing actual admission is denied before transport IO/SEND.
+
+Use only supported AsyncLocalStorage.run/getStore with actual native Promise chains; no enterWith/disable or RPC/isolate propagation assumption. Reference supplied/checked by Root: https://developers.cloudflare.com/workers/runtime-apis/nodejs/asynclocalstorage/. Native Miniflare/workerd tests must prove propagation through nested source/storage IO; T5 cross-path/durable writer inventory remains separate and unavailable. Public transport/preparation/consume-only signatures, original clocks and child guards remain unchanged. This module has no clear/reset/refund/send/mint API.
+
+## C2 Task3 fix round1/5 handoff — review pending (2026-11-02)
+
+Original review423c1bf was spec FAIL / quality needs fixes: one Important whole-stage settlement defect. Root's ruling is preserved at a6dab660; implementation boundary was recorded before product code at f51d65fa. Fix codeHEAD `62fb4122ab2991eb3d4781187369269ceb849623`; re-review range remains423c1bf..fix-docHEAD, not the writer BASE.
+
+One internal denial-only scope now retains the exact consumed admission lineage across transport, final producer and nested underlying owner source/storage promises. Timeout, wrapper settlement and parent.finish cannot clear actual outstanding work. Competing admission is denied before source IO/SEND; no admission/public signature/deadline/journal/source qualification changes or mint/reset API.
+
+RED `05bfb64dc6b71190fe4f9313f82ebc4c7c226ac8`: run41465306769/job125344480872/attempt1,55 tests53pass2fail; both new native held-final-selection/nested-source cases incorrectly permitted installed second stages. GREEN62fb4122: run41466161397/job125347499185/attempt1,55pass0fail/cancelled0/skipped0, scoped lint clean, artifacts0. Coverage includes actual owner/admission/transport/three-stage tests and native journal restart. No unchanged profile/compiler/full120 rerun.
+
+The final storage hold and nested factual hold survive parent.finish while a separately verified owner POST consumes a new ticket/approval. No additional SEND/provider effect occurs until settlement; committed history remains and expired children make no late writes. Provider/source authority remains explicitly synthetic. AsyncLocalStorage uses supported run/getStore only; no RPC/isolate assumption or replacement for unavailable T5 durable/all-path inventory.
+
+Full finding, ruling, exact commands/output, RED/GREEN evidence and selfreview are appended to [Task3 report](../reports/2026-11-01-finite-private-policy-setup-task3.md). Every commit used expected-head CAS plus independent ref/file readback. Fix implementation is NOT independent acceptance. STOP WRITES after final docs readback for Root's same-reviewer scoped review. No Task4, actual provider/private/auth/credential/runtime/local source/build action. All T4/T5/C3 and attended/runtime gates remain; operationalReadiness=false.
+
+
+## Root C2 Task4 integration preflight (2026-11-02, before source work)
+
+Ruling: preserve strict pre-T0 selection/approval behavior while implementing a fixed native-source-qualified post-T0 factual path. Immutable selection requires selectedAt<=actual original T0<commandBy. A command just before commandBy may validly be processed after it while current permission/R1/setup/original-parent bounds still hold; never use observedNow<commandBy as a substitute for original command chronology. No caller T0/bypass boolean or refreshed parent/consent. T4 must propose the smallest exact actual native-entry/source/admission/material table before affected code; owning T5 source qualifiers may remain unavailable, not fake positive DTOs.
+
+The original native setup clock must include forwarding/queue and clip all child/SEND/ACK work. Official WorkflowEvent timestamp is the native triggered Date; fixed instance GET schema exposes queued/start, not created_on. No equality between those clocks was verified by the documentation lookup. Resolve source-owned provenance/narrowing before code, not a fresh30s in a later DO or a caller deadline argument. Actual four Known args/18stages/70s/5s/20s and setupBy50/ARM90 remain unchanged.
+
+Original pre-T0 ownerSource.currentPublication/ConnectionReceipt sequence is historical preparation provenance after the approved post-T0 policy activation, not permission to report the old prearm pointer as the current provider pointer. Native setup/prepare must separately qualify the actual current pointer/config/code against SetupContext/PolicyReceipt and fresh owned-primary facts, preserving original selection/snapshot/receipts. Use the narrowly expected own transition after actual ACK/readback, no rewritten baseline, new preparation-stage enum or generic pointer bypass. Propose exact contract before code.
+
+Source material-residency gate remains T5: compiler currently has single qaLive/canaryLive outputs; native QA has no GitHub download credential. Root considered a possible canary-first compiler DAG with QA-only compressed M-qualified canary bytes, but this is NOT selected/implemented/authority and requires exact design/size/privacy/hash-cycle qualification. No new key/public artifact/general module RPC by inference.
+
+C3 current-source preflight at423c1bf/bcf54a5c: delegated-oauth-worker143 returns paused on OAuth=false before ordinary owner connections/revoke295–319; monitoring has its own gate144. Separately qualify narrow existing-grant business/early withdrawal before live; C0 cleanup does not establish early owner withdrawal. This is future C3 work, not a reopened Task3 review.
+
+References checked without resource probes: https://developers.cloudflare.com/workflows/build/events-and-parameters/ ; https://developers.cloudflare.com/workflows/build/workers-api/ ; https://developers.cloudflare.com/api/resources/workflows/subresources/instances/methods/get/ .
+
+## Root Task4 factual binding correction — 2026-11-02
+
+Execution BASE `757223ebc920c46e3df77995d7ba017ea3b9884e`. SOURCE ONLY; operationalReadiness=false.
+
+`bindSelection(binding,lease)` is already the intended post-T0 factual API. Preserve strict pre-T0 approval/selection/read APIs. Correct only its observed `at>=commandBy` predicate to require `observedAt<min(preparation.expiresAt,owner.accessExpiresAt,connection.permissionExpiresAt,approval.expiresAt)`. Retain actual-record `selectedAt<=T0<commandBy`, exact current selection/head, durable publication witness `selectedAt<=publishedAt<=T0`, `T0<=boundAt<=observedAt`, immutable once binding and original lease guards. Stored expiries are facts, not current consent or native authority. No new record, hash, key, API or bypass variant. The fixed native setup must independently qualify original primary T0, current owner/consent, R1/setup and original parent before this call.
+
+Required native RED/GREEN: command just before commandBy with binding observed after commandBy and original unexpired bounds; command at/after commandBy, expired stored bounds, late witness and current-head drift denied. Original native source/clock/material table is still under Root ruling; no affected product implementation before that ruling. Known four args/18 stages/70s/5s/20s and Task5/C3 boundaries unchanged.
+
+## Root Task4 native/source/material contract — 2026-11-02
+
+Execution BASE `757223ebc920c46e3df77995d7ba017ea3b9884e`; factual binding correction code `a75403f7c551ea2c6bd66c683d84a3ddddea1e82`. SOURCE ONLY, operationalReadiness=false. This table records Root's pre-code ruling; default source constructors remain unavailable until Task5 actual qualification.
+
+| Boundary | Exact fixed contract and ownership |
+| --- | --- |
+| Public operation | Payload EXACT {operation:'finite_private_policy_setup',intentId,sourceRevision}; refs EXACT {intentId,sourceRevision}; setupInstanceId='afw-finite-policy-'+SHA256('afw.finite-private-policy-setup.v1\n'+ASCII-canonical refs). Only finite PrivateQaBootstrap dispatch and finite IndependentClosure subclass setupFinitePrivatePolicy(refs). Ordinary index/public ingress, existing namespace/class/backend/exports and all other methods unchanged. This is the narrow Task4 exercise mount, not Task5 completion. |
+| Workflow source entry | readPrivateQaFinitePolicyEntry({env,event,step},originalLease) -> EXACT {setupInstanceId,sourceRevision,qaVersionId,eventTimestamp,queuedAt,startedAt,T0}. Fixed source owns actual native entry, existing binding/primary Workflow identity, M/QA, original command/seed and read-only qualification. Native Date/instanceId mandatory; actual supplied workflowName must match afw-own-qa-private-bootstrap, absent name requires source proof. Matching IDs/status DTO are not authority. Default unavailable; no registry or caller clock. |
+| DO source material | readPrivateQaFinitePolicySource({ctx,env,intentId,sourceRevision},originalLease) -> EXACT {native,ownerSource,originalContext,baseline,rollback,bytes,assertCurrent}. native uses the seven fields above. ownerSource uses accepted validateFiniteOwnerSource grammar; finite_prearm/currentPublication remain immutable historical preparation provenance. baseline/rollback EXACT {versionId,deploymentId,module,configuration}, existing module {name,sha256,bytes}; private bytes EXACT {baseline,rollback,candidate}, each Uint8Array <=3MiB. Candidate descriptor comes ONLY from actual seed.manifest.modules.canaryLive.module (name/sha256/bytes, separately actual exports); M/tree/publicStatic checked against source/seed. Fixed assertCurrent(originalLease) independently qualifies actual source/entry, owner/current primary, publisher custody/expiry/operations, current pointer/exposure/bytes and all writer inventory, including only actual own journal ACK transitions. No caller expected-transition DTO or generic send callback. Default unavailable until Task5. |
+| Clock | Workflow wall/monotonic guard starts before IO; eventTimestamp+30000 cap narrows to min(eventTimestamp,queuedAt)+30000 and T0+50000. Require primary queuedAt<=startedAt<=observedNow, eventTimestamp<=observedNow; NO invented equality/order between eventTimestamp/queuedAt. DO source hydration begins under read-only provisional <=5000 guard before IO; no effects until independently source-qualified original deadline, never fresh30 after forwarding. Same parent narrows through original owner/window/permission/R1; each effect child begins before SEND and shares <=5000 across storage/readback/network/ACK. Source clocks/T0 are never public arguments. |
+| Setup factual read | INTERNAL readFiniteOwnerSetupFacts({ctx,env,intentId,sourceRevision},originalLease) itself calls fixed DO source and actual readFiniteMaterialSeed under the same parent, checks primary original T0, selected owner/selection/witness, current D1 owner/grant/notice/revision/program and immutable three-stage history. Pre-T0 reader APIs unchanged. Return private EXACT {value,selected,witness,receipt,ownerSource,source,material,notice}; value is existing pre-selection preparation facts, notice actual current event, source/material remain private and confer no send authority by themselves. No caller seed/T0/bypass. |
+| Original context | EXACT {artifact,scope,original,publication,cancellations,retirementPolicy,withdrawalRequestId,saveIdempotencyKey,legacy,trialId}. artifact actual six fields {script,sourceRevision,sourceTree,programHash,workerHash,sourceCheck}: script is actual candidate Worker bytes, revision/tree are real CODE build M/tree and workerHash actual SHA. Candidate programHash independently proved from embedded candidate program. scope/original/publication existing exact validator grammars. original.programHash/sourceRevision match ownerPreparation.programContext retained ORIGINAL program Q, which may differ from candidate runtime M. cancellations ARRAY preserves existing exact Known historical entry grammar/order/values; no currentGrant in original hash. retirementPolicy raw unchanged qualified historical meaning; withdrawal/save UUIDs and trialId64hex are source-owned preexisting approved identities committed before initial choice, never generated from future T0. publication.workerHash/artifactKey bind candidate bytes, activationKey fixed pre-T0 identity, never provider UUID. legacy existing exact validator. |
+| Original digest | originalContextHash=SHA256 UTF8('afw.finite-original-context.v1\n'+ASCII-canonical exact context projection replacing artifact ONLY with {sourceRevision,sourceTree,programHash,workerHash,sourceCheck}); all other fields unchanged. Bound script bytes/hash separately; no script/current grant/current notice/T0/future ACK in digest projection. Actual original program/context and candidate provenance must reconcile independently; digest alone grants nothing. |
+| Derived policy material | C0=T0+240000,C1=T0+420000,N1=T0+300000. Exact six private slots only. EVENTS actual selected owner/grant/project/client/resource T0..N1; SUCCESSOR retained scope/original/publication and candidate {trialId,programHash,sourceRevision,startAt:T0,expiresAt:N1,budget:1}; withdrawal C0..C1 with actual current D1 notice originalConsent {sequence,revision,issuedAt,expiresAt} and actual resolved candidate identity. Historical cancellations preserved; construct full Known history currentGrant from current D1, never initial hash. Pure resolveSuccessorPreparation/prepareKnownCancellationHistory/withdrawal parser before effects; resolveNamedActivationPlan only after actual new version/deployment/config readback. No env clone, fake flag/Container, predicted UUID or Known execution. |
+| Native effect admission | Only original actual setup producer, after fixed native source + primary seed + factual current checks, can enter private transport under its same original lease. No owner-POST admission reuse, public mint/clear/force/reset or factual-record authority. Same actual ctx/env/storage/db captured and shared stage-work retention across connection/policy identities; track actual nested IO Promise before races. Binding newly recorded plus exact durable readback required; existing/uncertain binding/SEND never grants a new send. |
+| Transport/context/output | Reuse fixed Beta HTTP/projection engine privately; no generic URLs/credentials/caller policies. Snapshot immutable SetupContext <=64KiB before upload. Exact baseline-version secret inheritance vector hashed in request/SEND. One upload then one activation; actual timely upload ACK plus fresh bytes/full metadata needed. Source assertCurrent independently reconciles baseline to its own actual journal ACK/pointer transition. Context and receipt readback precede installed output; output contains no raw policies. Later completed-success Workflow/output/pointer/writer qualification remains mandatory for observer/control.prepare. |
+
+No relabelling M script with original Q revision, weakening Known four args/18 stages/70s/5s/20s, compiler changes, actual provider/private reads, credential/role/OAuth/window action, runtime/DDL/deploy/cron/Container, finite HEAD or Task5/C3 implementation. Compiler source currently does not establish separate retained program mapping; default source remains unavailable until qualified. SYNTHETIC fixtures establish source-contract behavior only, never actual custody/byte residency/platform cross-RPC provenance.
+
+
+Root Task4 final pre-effect checks: actual native eventTimestamp AND queuedAt must be >= actual material.primaryEvidence.seedStepCompletedAt >= original T0; completed-success seed is required BEFORE setup creation. No invented event/queue equality/tolerance. Candidate upload cap3MiB never relaxes Known artifact.script<=2MiB; validate exact artifact bytes/hash/M/tree/sourceCheck/candidate correspondence BEFORE publication, then full resolveNamedActivationPlan only after actual new UUID/config readback. Default actual source remains unavailable until Task5.
+
+
+## Root Task4 whole-operation retention ruling — 2026-11-02
+
+SOURCE ONLY at execution BASE `757223ebc920c46e3df77995d7ba017ea3b9884e`; preceding implementation `c96a1cee336c0edf7e7fc7ae21ccaabedd667f85`. Before affected code: start the existing denial-only `observeFiniteOwnerStageWork` atomically at original DO run entry after exact refs validation and before first source/facts IO. Its private original-invocation lineage object identifies actual ctx/env/storage/RELEASE_DB plus the SAME original issued parent lease, narrowed only after original source time is known. Retain this lineage through hydration, nested factual reads, binding/context, transport and receipt; retain actual nested native promises before racing. A second lineage is denied before source/effects while outstanding; release only original termination AND actual promises settled. No public lineage constructor/token/mint/clear, helper relaxation or new clock.
+
+Lineage retention grants NO send authority. The distinct private effect admission is minted and consumed only after fixed source/seed/current owner checks and NEW binding/context ACK/readback. Original source constructors receive the actual original parent lease while bounded read-only child races retain their actual operations. Native Workflow RPC returns RpcPromise: retain a fixed source-owned native async continuation awaiting the captured actual binding/method BEFORE racing the original Workflow deadline. This proves client RPC-continuation settlement only, not remote physical settlement, remote DO terminal, or T5 all-path closure. Root approved this narrow correction after native RED `545156864549efa963a30bcab58848dcefd9c2c5` run41475481741/job125379799936 (1 failed), and repair `a8e56e9ed6666b320a1ab026e982e818218d98d9` run41475798053/job125380907183 (1 passed). Add a native held nested hydration case: response/finish does not release held work, second invocation performs no new source read/SEND/CF POST, and late guard cannot write. All source/CF/GitHub/custody fixture qualification remains SYNTHETIC; operationalReadiness=false.
+
+
+## Root Task5 subdivision and T5-B1 ruling — 2026-11-02
+
+Pre-code BASE `1057ce94a77df9edd8119f74c516d5512add3cf0`. The [complete preflight tables](../reports/2026-11-01-finite-private-policy-setup-task5-preflight.md) identify actual signatures, source/program/byte provenance, native versus GHA callers, missing bootstrap, forwarding/abort limitations, original cleanup and ALL writer families. Root rules sequential subdivision because these are missing producers, not one constructor.
+
+Start ONLY B1: actual nodeM→canaryM→bounded deterministic compressed candidate→QA-only embedding and fixed private decoder, candidate<=2MiB, QA<=3MiB measured. Exact module3keys plus compiler-derived programM/sourceRevision/sourceTree/sourceCheck; no selfhash cycle, original-Q relabelling, private/historical bytes, path/URL/callback/boolean initializer. Preserve physical-checkout before/after, exports/profile/Container/backend. Strict canonical decoder and actual byte SHA; private in-process only. Complete package stays false/throw. No other seam/bootstrap/mount/forwarding/C3/settlement implementation. Hosted meaningful RED/GREEN, scoped lint, compiler measurements and separate B1 report; STOP for fresh Root review. All runtime gates remain, operationalReadiness=false.
+
+## B1 accepted; next B2 source origin
+
+B1 source review PASS/qualityapproved at21b679ce/codee93037e; Root logs28+14PASS/lint/artifacts0. B1 complete, Task5 incomplete. Follow scoped B2 brief before any source replacement; exact bootstrap/issuer/locator table and Root ruling precede product. No runtime action; operationalReadiness=false. Owner absent until16:00 Argentina2Nov. See ledger and reviews/2026-11-01-finite-private-policy-setup-task5-b1.md.
+
+
+## Root Task5-B2 A+B ruling — 2026-11-02, before product
+
+BASE70408e380551ac7dc70d3e88ec9f5b75172fbe75. Complete exact preflight table1/2, original recommendation, source/API limitations and Root ruling: [B2 preflight](../reports/2026-11-01-finite-private-policy-setup-task5-b2-preflight.md). B1 accepted; Task5/B2 incomplete, completePackage=false, operationalReadiness=false.
+
+Root selects ONE coherent read-only factual producer: fixed fullUUID closed-canary historical bytes/private metadata plus exact native control/four-journal snapshot plus bounded first-primary RELEASE_DB originalQ/cancellation rows derived ONLY from qualified manifest.original/scope. Historical frozen315/source2a477 != originalQ != candidateM. No caller pins/URL/callback/credential, latest, reconstructed oldpolicy, invented history or empty cancellation defaults. Actual fixed1830202byte/SHA/receipt/config validation; missing private strings are sanitized unavailable gate. Existing helper10min contracts unchanged; no15min relabel. <=8 cancellation rows; reject overflow/missing/ambiguity/foreign identities/times. Readonly exact known storage keys, no scans/write/newstore/DDL. Private in-process only, no HTTP/RPC/log/artifact/embedding. No unavailable seam replacement or native code/permission/admission claim.
+
+Fixed env credential privately consumed with approved dated custody descriptor + actual verify, never globalenv/noarg success. All read children<=5s clipped same original30s wall/mono/abort; actual promise retention under existing stage scope, never timeout/dispose=settlement. Explicit writable metadata normalization before code; rejecttransfer/destructive/cache-on/unknownextras, existing fingerprints unchanged. Consolidated exact args/returns/queries/bounds must be validated by Root AFTER this ruling documentation and BEFORE product.
+
+Keep pre-T0 QA bridge/bootstrap-once/capsule/newintents, custody/sourceauthority, forwarding/mounts/publication/C3/all-writer composition separate. No drafttable misuse19fc… or owner question. Hosted Node22 behavioral RED/GREEN, actual workerd/DO/D1/SQLite newlogic with explicitly SYNTHETIC provider/custody boundary; scoped regressions/lint only. Temporary branch contents:read/no-secrets/no-artifacts qualifier EXCLUDED integration; separate B2-AB report with exact CAS/readbacks and STOP for fresh review. No runtime/provider/private reads/main/DDL/keys/window/Max/local work.
+
+
+## Root validated consolidated B2-AB contract — 2026-11-02, before product
+
+After preflight/ruling dd4773a38a54a4f7611b1829b7cd79f7d8b6a0b1 (CAS/ref/all4 exact readbacks), Root validates implementation of this factual unit. This appendix supersedes only the preflight proposal's whole5s, escaped-result cap, env-envelope and rawhash ambiguity.
+
+New private API: readPrivateQaFiniteHistoricalSource({ctx,env},originalLease), exactly2args, exact options and existing {signal,assertCurrent} parent lease. No selector/pin/URL/credential/source/clock/callback input except original parent guard. No mount/old source-seam replacement. Capture actual env AFW_MCP_CLOSURE_READ_TOKEN/RELEASE_DB/AFW_RELEASE_EVENTS_NODE/AFW_INDEPENDENT_CLOSURE/AFW_QA_VERSION and native ctx.id/storage/methods; pin stable same holders after awaits. Local coherence is NOT source identity/permission/admission. Separate owning source wrapper remains unavailable. No global custody change/ALS crossRPC assumption.
+
+Clock: same original parent<=30s wall/mono/abort, logical children<=5s clipped parent, never renewed on forwarding/await. Retain actual native promises/continuations through retainFiniteOwnerStagePromise BEFORE child race; this read-only retention is not remote physical settlement proof. Prefer per-child5s under originalparent; a stricter whole5s, if used, must be reported as futurelatency gate, not usabilitypromise.
+
+Fixed GETs: account85d0d5dadac3341a564f22ce885e9eec/tokens/verify and full closed-canary UUID2607abae-cec3-4e35-89eb-8b8572262b54?include=modules, no latest/prefix. Native9aa97ad1fc9afe3021cf69ea497d5190 active, actual expiry valid. Dated source only states minute02:59: Root authorizes conservative ceiling2026-11-03T02:59:00Z and effectiveExpiry=min(actualVerifiedExpiry,ceiling), never assumes exactseconds/policyequality. Validate actualaccount/tokenID/active/notbefore/freshness; no9db/057alias/newkey. Fixed trust descriptor is dated approval of this operation ONLY; scopeVerified=false. Stream bounds token8KiB/version3MiB, redirectmanual/no-store/HTTP200/freshDate<=5s/no-cache/canonicalbase64/fatalUTF8; sanitized error, no provider/SQL/private text.
+
+Historical artifact EXACT committed receipt8 {baseVersionId,artifactKey,sourceRevision,sourceTree,programHash,workerHash,workerBytes,sourceCheck} from scripts/mcp-confirmation-frozen-artifact.json; actual1830202B/SHA315cc3b310767bafe6c7928822b5acb8ec5ad168e21d94a55e6fea26592e46d3/source2a4773737764c5038aaa0b3528b43df2a0572441/tree637af253296ac1c771cb73ea353cb960a2e59204/programf6f517c3ac135cfa7b9853137e0487f768b8f24a11e24959a337cac4e28d42e6. Artifact6 {script,sourceRevision,sourceTree,programHash,workerHash,sourceCheck}. Historical artifact != originalQ != B1 candidateM. Exact version metadata/pin29bindings/8false/config4fc9703cc8de929f766aa6aac3429d06c806ba2663ce63ec33a5754a030853c0. Fixed historical version is NOT currentdeployment proof.
+
+Metadata: writable projection compatibility_date,compatibility_flags,main_module,usage_model,containers,exports,bindings; optional limits/placement/cache_options/assets/package_dependencies preserved exactly ONLY if normalized fixedhash admits them. Explicit bounded readonly whitelist id/number/startup_time_ms/annotations/urls/source/created_on/author_id/author_email; no genericextras. env is undocumented in currentBetaGET and MUST REJECT. Exact original exports default/AfwNodeControl workers and AfwOwnEventNode sqlite/container; reject expecting-transfer/transfer_from/delete/destructive/cachetrue/unknown. Narrow normalization allowed ONLY explicit state:'created' on the3exports, worker cache:{enabled:false} on2workers, global cache_options strictly known allfalse shape. Hash normalized fixed-template projection==4fc970…; rawhash may differ solely for documenteddefaults. If rawalready4fc, preserve fields without unnecessary erasure. Capture rawhash independently and compare both snapshots, never label it4fc when different. Private metadataProof EXACT {versionId,rawConfigurationHash,normalizedConfigurationHash,normalizations}; normalizations sortedunique closed path enum exports.default.state, exports.default.cache, exports.AfwNodeControl.state, exports.AfwNodeControl.cache, exports.AfwOwnEventNode.state, cache_options. Existing strict restorationConfigurationHash unchanged. No upload here.
+
+Private required strings successorPolicy<=8192,eventsPolicy<=4096,retirementPolicy<=4096 from exact qualified bindings; crosscheck actual client/project/resource. Parse original/scope/candidate/publication with existing exact grammar; native namespace derives actual original and historical successor actorIDs. Missing strings => sanitized historical_slots gate, no hash inversion/named/dispatch reconstruction. Retirement MUST reuse/factor existing pure grammar; enabled/effectguards unchanged, no envclone or permissive duplicate. Target follows actual existinggrammar, not forcedQ/M. Committed scripts/mcp-qa-legacy-historical-context.json realhash-only source, not compilednullglobals.
+
+Legacy: one native storage transaction reads EXACT5keys afw.canary-restoration-control.v1, afw.private-prepared-dispatch.v1, afw.private-reduction-dispatch.v1, afw.successor-canary-restoration.v1, afw.successor-retirement-handoff.v1. No scans/list/HEAD/write. Own canonical data<=64KiB. Control/closure/preparedissued+nullcompletion/reductioncomplete match committed historical control/closure/journal/withdrawal/dispatch hashes + actual historical manifest/events; absent restoration/retirement required, storednull rejected. Repeat snapshot after D1 and compare. Do not manufacture full finiteLegacy.sourceRevision/sourceHash or old named bundle validation.
+
+D1: fixed bounded single SQL per snapshot, real RELEASE_DB.withSession('first-primary'). Source-bound original container/program/revision plus oldevent subject/project/client/resource; no caller selectors. OriginalCTE exactselection; global admissionCount,closureCount,nonNullClosureCount retain discrepancy. Enumerate ALLclosures LIMIT10, LEFTjoin originaladmission/grants/latestmonitor and one actualearliergrant row (minimumearliergrantsequence), pergrantadmissioncount and projectownership existence; no filtering away foreign/invalid rows. Require totaladmissions1, exactly1nonnull processclosure, totalclosures=1+cancellations.length,1..8cancel and completebounded result. Exact originalprocess row matches Q/admission/grant/scope/image; admission/consent expired, created<=closed<=DBnow/localnow. Cancellation process_generation NULL, noadmission, distinctoriginalgrant, actualowncontainer/program/source/image (may differQ/M), sameowner/project/client/resource, canonicalgrantISOcreated<=exchanged<=revoked<=closed, expired<=DBnow, singletonreadscope. Latestrevoke positive seq/revision/purpose/scope, issued==expires<=closed; actualearliergrant same scope/purpose, lowerseq, validpositive chronology. Preserved oldevents.grantId hash must match committed historicalcontext.grantIdHash and its cancellation container/program/source match historicalcandidate; originalQ remains separate. No currentGrant/active-newgrant/Save/currentprojectrevision requirement; no 10min helper change/15min relabel. Second identical query compares ALLnormalized historicaldata except DBnow; no distributedatomicity/physicalstop claim. Rejectmissing/ambiguity/foreign/overflow/invalidtimes, neverdefault[].
+
+Return EXACT deepowned {purpose:'afw.finite-historical-source.v1',artifact,receipt,configuration,metadataProof,bindings,legacy,history,observedAt,sourceIdentityVerified:false,scopeVerified:false,authorizesEffects:false,operationalReadiness:false}. bindings={successorPolicy,eventsPolicy,retirementPolicy} canonical strings. legacy={control,preparedDispatch,reductionDispatch,restoration:null,retirement:null,controlHash,preparedDispatchHash,reductionDispatchHash}, no fabricated provenance. history={originalAdmission,originalClosure,cancellations}; originalAdmission={grantId,subject,projectId,clientId,resource,containerId,processGeneration,programHash,sourceRevision,image,createdAt,expiresAt,consentExpiresAt}; originalClosure={grantId,containerId,processGeneration,programHash,sourceRevision,image,closedAt}; cancellation existing10keys {grantId,containerId,programHash,sourceRevision,image,closedAt,revokedAt,monitorSequence,monitorRevision,monitorRevokedAt}. No capability/secret/currentgrant/successauthority. Script exactreceiptUTF8byte/SHA; canonicalmetadata EXCLUDINGscript<=131072; rawscriptUTF8+metadata<=2097152. NEVER cap escaped JSON.stringify wholeartifact as wire2MiB. NoHTTP/RPC/log/artifact/embedding.
+
+Fixed sanitized exception gate enum input/custody/http/metadata/historical_slots/legacy/history/coherence/deadline; no private text. Tests actual newreader/query/parser in workerd DO/storage/D1SQLite; explicitly SYNTHETIC CF/custody/test-time fixedreceiptfixture boundary (no productionpinsparameter), no whole-source successDTO. Actual newbehavior RED beforeproduct, GREEN scopednewtests+affectedmetadata/history/retirementregressions+eslint, Node22/existinglockfile/contents:read/no-secrets/no-artifacts/deploy qualifier EXCLUDEDintegration. B1 unchanged, no reflexrerun. Separate task5-b2-ab report exact base/code/docHEAD/run/job/counts/CAS/all-file readbacks and STOP for freshreview. Sourceauthority/bridge/bootstrap-once/newIDs/store/forwarding/mounts/publication/C3 remain SEPARATE; Task5 incomplete, operationalReadiness=false.
+
+Root secret-descriptor clarification: reject any returned secret_text value/text/key/extra content BEFORE raw fingerprint/projection. Only exact {name,type} descriptors; never hash secret values. Plain private policies remain allowed in-process data.
+
+## Root B2-AB review finding and fix round1 ruling — 2026-11-02
+
+Initial fresh review bd9cb210: specPASS but qualityNEEDS_FIXES oneP2 test future date failure; full record reviews/2026-11-01-finite-private-policy-setup-task5-b2-ab.md. Root independentlyverified final41497210626/5b087d0a/attempt1 job12545518379321+256+28PASS0fail/cancel/skip/scopedlint/artifacts0. Green beforeexpiry doesn't remove the finding. B2-AB NOT accepted yet.
+
+Ruling: fix reproducibility ONLY at explicit SYNTHETIC custody/time test boundary. Production9aa approvedceiling remains exactly2026-11-03T02:59:00Z, not renewed/extended or made configurable by caller. Regular nativepositive fixture should use controlled fixture approval/custody datum and real elapsedclock/D1 semantics; if source-held fixed datum requires factoring, keep exactproductionvalue/behavior and private API unchanged. Test-only compile/clock substitution may be used for one focused expiry denial with unmodified production ceiling; label as synthetic clock evidence, not actual postdate runtime. Test production historical pins independently from synthetic custody datum so expected metadata denial cannot degrade into earlier deadline/custody failure. No caller clock/pin/key API, globalsuccessoverride, weaker guard or extendedruntimeauthorization. No new actualcred/probe/window.
+
+Originalimplementer owns fixround1/5, report covering exacttests/commands/output and meaningfulRED→GREEN, thenSTOP. Only affectedhistoricalnewtest plusnecessarylint; broad256/B1 reruns only if actualproduct dependency changes require them. Scoped rereview by same reviewer FIX_BASEbd9cb210..fixDocHEAD; nowholeoldcodecrawl. Root does not fix product/tests itself. First3rounds originalimplementer; no parking structural/testdefect now.
+
+## B2-AB source acceptance after round1
+
+Task B2-AB completeSOURCEONLY atproduct5b087/testf68d360a/docsfbe117a6; originalreviewerscopedP2ADDRESSED/approved. Rootactual22PASSfix +prior21/256/28PASS/lint/artifacts0. Task5/bootstrap/C3 remainincomplete; nextpre-T0QAbridgebeforeinitialownerwindow, contract/rulingbeforeproduct. See checkpoint2026-11-02-finite-cloud-continuation.es.md andledger. No runtime/permissions/grants/main/PCoff/Max.
+
+
+## Root Task5-B2-C1 ruling — PRE-T0 QA provenance, 2026-11-02
+
+BASE a609c1f3296177f73468ca8c708b9333330f1d32. Root approved the complete [C1 contract](../specs/2026-11-02-finite-pre-t0-qa-provenance.md) BEFORE tests/product. Dedicated owner command and actual compiler/GHA producer, fullQAUUID create-only source tag, native supported token+pointer reads and public completed-success provenance; P0+300s original issuer deadline, no business window. Independently tracked workflow/CLI hashes embedded QA-only. Git ref mutability explicitly remains trusted repository-writer governance assumption, not historical nonmutation/publisher identity/business authority. No custody extension, source seam replacement, full package bypass, initial publication, runtime or C3. Source-only hosted meaningful RED/GREEN then STOP for fresh independent review; no owner intervention.
+
+
+## C1 implemented; awaiting independent review — 2026-11-02
+
+CodeHEAD d22d5366069ff569e428bc051a3e524f93abeed0. [C1 report](../reports/2026-11-02-finite-pre-t0-qa-provenance.md) records pre-code contract1ae574eb, behavioral RED370a6913/2c5da36a and actual GREEN41511052481/job125502671941/attempt1:81new+34affectedPASS0fail/cancel/skip, lintsuccess/artifacts0, QA1762180B/canary1942384B. Actual native workerd/DO and Node issuer/real compiler execute under explicit SYN provider/GH/custody boundaries. Source-only immutable-object/current-ref facts retain TRUSTED repo-writer governance assumption; historical ref nonmutation and full publisher/source identity remain false. No source seam/fullpackage opening, credential extension, actual tag/dispatch/publication, window or runtime. Stop writes for fresh Root review; Task5/C3/PCoff incomplete.
+
+
+## Root selects C2-A initial material, exact contract pending — 2026-11-02
+
+After C1 acceptance6038db5, Root accepts [full preflight/refinements](../reports/2026-11-02-finite-initial-preparation-source-preflight.md) and selects bounded A before publisher/mount: actual B1/B2/C1 facts, ten-field script-free original-context projection, fixed global once/material/selector/ACK in existing actor, retained once-only new IDs and constructor-owned in-process factual result. Accepted explicit reader-origin legacy commitment under M, exact pinned old synthetic scope/current owned row, unchanged historical retirement policy/disabled flag. Missing actual Access/limiter fails. No source authority, owner-source replacement, forwarding/session, public RPC/Workflow operation or publication in A. New IDs cannot reset on uncertainty/new M; preserve history/first finite HEAD; no table/DDL or packet/draft repurpose.
+
+[Proposed exact A contract/test plan](../specs/2026-11-02-finite-initial-material.md) requires Root acceptance before product. Source-only actual native positive composition under explicit SYN provider/GH/custody, not whole-facts DTO. A C1 once plus two command reads; hypothetical full-flow53 and ten-session budget remain UNQUALIFIED and are not implemented. Later B independently qualifies original native Workflow/issuer/allwriters before initial publication and closed_ui source. No owner15min/read10min start. operationalReadiness=false; completePackage=false; PCoff=false.
+
+
+## Root exact-contract acceptance and corrected bounds clarification — 2026-11-02, BEFORE product
+
+Root accepts ba452cffcf10def0263164a18551372ba15ffd82 contract with this clarification. Initial review mistakenly described Task4 original-context digest as unsorted schema-order JSON and requested a shared helper; Root independently rechecked policy-setup.mjs:18–19,72–73 and WITHDREW that assertion/helper request. Actual v1 digest recursively sorts keys, AFTER existing finiteData validation. Preserve it exactly; do not invent a sorted-vs-Task4 hash difference or change v1 meaning.
+
+Required correction ONLY: stored script-free originalContext must pass the existing finiteData bounds (whole projection<=32768 UTF8 bytes, depth<=12, nodes<=2048) even though the enclosing material may be<=65536. Then use existing sorted domain hash afw.finite-original-context.v1. Verify actual codec-decoded material.originalContext after canonical roundtrip; rehydrate script only from B1. Regression must demonstrate actual Task4 digest equivalence and projection32KiB overflow rejection despite totalmaterial<64KiB. Default leave Task4 product unchanged, no shared helper or reflex Task4 rerun.
+
+Exact C2-A contract is now APPROVED subject this recorded clarification. Proceed sole writer with meaningful hosted RED→GREEN, actual native full B1/B2/C1 fixture composition under explicit external SYN boundaries, and mandatory partially consumed original-parent held-child test with actual timer/abort/retained promise/no after-deadline writes. All unmounted/factual/no-effects/no-source-authority/no-owner-window scope remains unchanged. No additional permission required for this bounded source/test implementation. Fresh review after report remains mandatory.
+
+## Root clarification of uncertain first-claim outcomes — 2026-11-02 20:30 UTC
+
+Chronology: the implementer added the private per-actual-storage WeakSet denial in source commit 8a8633d7527a448998cefd46910f7d197d47aded before Root's message confirming this defense. This is NOT represented as pre-code Root approval. Root subsequently confirmed the bounded defense and asked to preserve this chronology; no history rewrite/revert is needed.
+
+The original pre-code contract remains unmounted factual C2-A. A committed/retained durable once record denies replay across constructors/M/QA/lost ACK. If the first claim never committed, absent durable evidence after actor restart proves neither consumption nor physical settlement. The private WeakSet is set after verified original command, before first claim transaction, keyed only by captured actual storage identity; it is never cleared on false/unknown outcomes. It denies new-constructor retries in the same isolate, including an uncommitted claim, and concurrent claims admit one attempt. It is NOT a durable registry, source authority, effect admission, or restart proof.
+
+Future C2-B must independently fence the original native entry and unknown outcomes. No A data/result can supply that permission. No new key/table/role/entry/proxy/incarnation claim. Required final focused test explicitly uses a fresh store constructor over the same actual storage after unknown/no-commit ACK, asserts no second transaction/IDs; concurrent path one actual attempt. Operational readiness remains false. This clarification is persisted before that final test refinement.
+
+## C2-A final source checkpoint — 2026-11-02
+
+Implemented unmounted factual initial material/once/selector/ACK at code 2ab571bd1659060387b5c19d58dd5d329b8b7d5e. Hosted run41520147197/job125533756257 attempt1: 19 pass/0 fail/0 cancelled/0 skipped; scoped lint clean; artifacts0. Exact Task4 sorted digest/bounds unchanged and regression verified through real canonical material roundtrip. Actual native B1/B2/C1 composition under explicit SYN external-data boundaries, not whole facts DTOs. Native parent/held ACK test and fresh-constructor/unknown-no-commit same-storage denial passed. Durable once continuity requires committed/retained evidence; WeakSet is same-isolate denial only, not restart consumption/settlement/authority.
+
+Full report: docs/superpowers/reports/2026-11-02-finite-initial-material.md. All source/test/qualifier exact readbacks and branch ref verified; final docs CAS/readbacks returned to Root. Independent review PENDING; task STOP. No mount/publisher/source authority/session forwarding/actual provider or owner command/window; owner15min/read10min unstarted; completePackage/readiness/PC-off false. Future B owns original native entry/issuer/all-writers and restart/unknown-outcome admission.

~~~~~~~~~~

## docs/superpowers/plans/2026-11-01-finite-profile-package.md

~~~~~~~~~~diff
diff --git a/docs/superpowers/plans/2026-11-01-finite-profile-package.md b/docs/superpowers/plans/2026-11-01-finite-profile-package.md
--- /dev/null
+++ b/docs/superpowers/plans/2026-11-01-finite-profile-package.md
@@ -0,0 +1,95 @@
+# Finite profile and native package implementation plan
+
+> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development. Root preserves the existing dispatch method: one scoped implementer, fresh task review, then the next task. Do not spawn subagents from a task brief.
+
+**Goal:** Implement source-qualified public profiles, literal historical provenance and actual finite packaging, then connect private native material and the original nominal route.
+
+**Architecture:** Public static commitments and private actual fingerprints remain separate. The fixed B3 source-authority exports are the integration boundary; compiled source, actual native bindings and qualified primary observations supply authority. Compiler staging cannot certify missing factories or a full business route.
+
+**Tech Stack:** Existing Node >=22.18.0, ESM, esbuild, Wrangler, Miniflare/workerd, SQLite DO/D1 and GitHub Actions; existing lockfile/dependencies.
+
+**Spec:** [accepted package design](../specs/2026-11-01-finite-profile-package-design.md), [QA bridge](../specs/2026-11-01-finite-qa-code-provenance-bridge.md), [native launcher](../specs/2026-11-01-finite-native-launch-adoption-design.md). Concrete B3 interface baseline: eaefd5aabf5ebf3c08da29c2ad6d1eb699af39f8. Design approval is SOURCE ONLY.
+
+## Global constraints
+
+- GitHub/Actions only; no local code/deps/build, runtime/probe, private CF read, secret-stage dispatch, credential creation/copy, permissions, deployment, live comment, DDL or occurrence by this plan.
+- Keep default profiles closed; exact classes/namespaces/resources, actual QA_VERSION and AFW_FINITE_TRIAL_VERSION bindings, all 14 QA false/four release true as the spec pins. No forged env, caller pins, registration escape or success witness.
+- Keep original Known four arguments/18 stages/70s and child 5s/20s, outer T0/N1/C0/C1/R1, parent cancellation, retained uncertainty and raw legacy history. Native5 only adds its reviewed launcher timings/journal.
+- Public artifacts contain code/templates and allowed technical metadata only. Six private canary slots are source-allowlisted by role/type/purpose; unknown fields fail. Raw policies/consent/customer/callback/key values never enter GHA/artifacts.
+- Seed 32KiB, manifest 24KiB, module 3MiB, archive 64MiB/expanded 128MiB; native original 5s/read limits unchanged. No artifact or custody availability is presumed.
+- Build main-push has contents/actions read only and NO CF secret/provider calls. Historical preservation is a separately approved protected fixed-read manual stage, after concrete scope/custody/privacy review; do not implement or dispatch it under this plan.
+- operationalReadiness=false; fresh artifact IDs/digests/expiry, main/source, publication, custody and live eligibility must qualify before any separately authorized future comment.
+
+## Review focus
+
+1. Mutated private values preserving public projection must still fail private raw-policy/full-hash gates (4C1/2).
+2. Historical module copied into M must never acquire fictitious original build provenance (4C1).
+3. Native binding substitution after an await must fail before effects (4C2).
+4. Missing mounts/expired historical artifact must not produce a successful complete package (4C1/3).
+5. Pending late create/D1/Container writers must prevent both restores despite local timeout (Native5/4C3).
+
+## Order and file ownership
+
+4C1 -> Native5 source primitives -> 4C2 full mounts -> 4C3 composed route/package completion -> root full-suite/review. Native5 follows its separate reviewed design: prepare/SEND/ACK journal, coordinator-bound inventory and launcher orchestration. 4C1 may proceed first. Native5 and 4C2 must agree exact same-object control handoff before integration; never fake prepare/claim ordering to obtain a positive fixture.
+
+4C1 owns profiles, codec/provenance, artifact builder/resolver and B3 publication adapters. 4C2 owns private material/primary/native factories. 4C3 owns actual finite nominal/receiver integration and full package completion. Extracted first brief: ../briefs/2026-11-01-finite-profile-package-task4c1.md. Each task appends ../progress/2026-11-01-finite-native-confirmation-cleanup.md and writes its corresponding task4c1/task4c2/task4c3 report.
+
+## Fixed interface block
+
+At B3, lib/mcp-qa-finite-source-authority.mjs exports four synchronous unavailable functions. Retain names/call sites:
+- qualifyFiniteSourcePackage({manifest}) -> deeply immutable five-role expectations; no caller expected pins. Each role has publicStatic rule and privateFull rule selected internally from reviewed templates/receipt mappings.
+- qualifyFiniteSourceRoleMetadata({manifest,role,metadata}) -> same-role immutable qualified expectations or throw; publication already calls it after actual byte checks.
+- qualifyFiniteNativeSourceContext({ctx,env,intentId,sourceRevision,seed?}) -> undefined on success, otherwise throw; checks actual fixed actor/bindings/compiled source before seed, and same-role seeded commitments when supplied.
+- readFiniteNativeCustody() -> frozen source-approved {id,tokenKind:'account',expiresAt}, or throw. Bridge independently verifies the actual stored token at the fixed account endpoint. Candidate identity is not secret-match evidence; no fallback to GHA9db.
+
+Existing B3 calls must remain valid: readFiniteQaPublication({manifest,request,check}); readFiniteQaPublicationBridge({ctx,env,intentId,sourceRevision,fetchImpl,now,signal}); resolvePrivateQaFiniteExternalSource({phase:'seed-material',sourceRevision,githubToken,fetchImpl,now,signal}); readFiniteMaterialSeed({intentId,sourceRevision,fetchImpl,now,signal}). Do not add registration/caller authority arguments. Current publication ignores qualifier return values; update it deliberately to consume role expectations and full versus public hashes.
+
+## Task4C1: typed profiles, provenance and real compiler/packager
+
+**Files:** Create lib/mcp-qa-finite-profile.mjs, scripts/build-finite-native-package.mjs, worker/independent-closure/finite.mjs, worker/mcp-own/finite.mjs, two finite Wrangler configs and .github/workflows/afw-finite-native-package.yml. Modify source-authority, finite-seed/package/seed-primary/publication/publication-bridge/seed-issuer/http, scripts/verify-qa-finite-archive.py and activation-observer. Tests: new test/mcp-qa-finite-profile.test.mjs, test/build-finite-native-package.test.mjs, test/mcp-qa-finite-profile-native.test.mjs plus existing affected suites.
+
+**Interfaces:** projectFinitePublicConfiguration({role,metadata}) -> strict public projection; source qualifier delegates to these internal templates. buildFiniteNativePackage({cwd,sourceRevision}) -> {manifest,files} only after all required inputs/semantics qualify; CLI node scripts/build-finite-native-package.mjs <M> writes output/finite-native-package. Fixed historical-input registry is a future reviewed input, never caller URL/pins.
+
+- [ ] RED: test two valid differing private policies yield identical public projection but different actual activation/restoration fingerprints; unknown slot/accessor/version_metadata extra fails. Test real finite class exports/binding identities/14+4 flags; renamed/dropped version binding and dummy-mounted factories fail.
+- [ ] RED: test strict v2 provenance union and all six archive names; qaClosed/closed-rollback.mjs stays literal. Reject invented historic source=M, arbitrary receipt, wrong role/config/bytes/tree, malformed historical-source tuple, stale artifact and unavailable mounts. Run focused commands below; retain failing commit/run.
+- [ ] Implement publicStatic EXACT {purpose:'afw.finite-public-static-profile.v1',configurationHash,profileHash,bindingsHash} and role EXACT {provenance,module,publicStatic}. Apply accepted domain-separated public hashes. Preserve actual activationConfigurationHash/restorationConfigurationHash algorithms. Add actual version_metadata grammar to activation-observer, strict provider shape/name/type and unknown/accessor negatives.
+- [ ] Implement compiled-source.v1 for new live roles and approved historical-content-pin.v1/historical-source-pin.v1 union for closed roles. Advance manifest/seed/envelope/hash purposes to v2. Update Task2 resolver's cached tree(revision) logic: compiled tuple=M; qualified historical-source tuple uses actual original commit/tree; content-pin uses source-approved receipt blob at M, never invented Git lineage. Replace operator.sourceRevision!=M with literal approved historical provenance.
+- [ ] Amend B3 publication: read actual full QA configuration hash from bytes/metadata, compare historical full pin independently, compute publicStatic through source expectations. qaPublication retains FULL configurationHash plus typed publicStatic. Update strict codec/issuer/reader/bridge fixtures together. Preserve finiteSourceFile and qualifyFiniteSeedLineage exact source/build workflow/run/artifact/finalizer checks and original request budgets. In finite-http restore, qualify the closed canary pointer before its closed metadata GET; never request live canary private configuration from GHA.
+- [ ] Build actual finite entrypoints/configurations with verifyMcpReleaseSource before/after, actual esbuild exports/metafile and external post-build module hashes. Internal role checks validate actual exports/classes/imports/config/bindings; do not derive expected profile from provider data under test. Native context/custody stay unavailable until 4C2; missing full mounts blocks complete package output. Staging compilation tests may pass with explicit staging results, never an eligible package manifest/artifact.
+- [ ] Wire secret-free main push producer and exact artifact afw-finite-native-package-<M>. Preserve six-file layout/limits/digest/actual lineage. No public private baseline data, fallback rebuild or presumed surviving input; unavailable inputs produce no eligible upload. Prove protected manual preparation is outside this workflow.
+- [ ] GREEN: affected codec/archive/publication/compiler/native tests, scoped lint and generated-file Wrangler no-bundle dry-run. Commit/report source-staging versus complete-package status separately; fresh review stops writes.
+
+## Task4C2: private plan, raw primary and native factories
+
+**Files:** Create lib/mcp-qa-finite-material.mjs and lib/mcp-qa-finite-primary.mjs; implement remaining source-authority exports; modify trial-control, observer-native, trial-guard, finite entrypoints, release runtime binding resolver, activation observer and own finite cleanup composition. Tests: new test/mcp-qa-finite-material-native.test.mjs plus existing native control/guard/read-RPC/cleanup suites.
+
+**Consumes:** 4C1 expectations; accepted Native5 prepare/SEND/coordinator inventory; actual ctx/env/primary D1 and bridge. **Produces:** createPrivateQaFiniteMaterial({ctx,env,refs}) -> EXACT {controlOptions,readFinalPrimary,custody}. controlOptions stays {storage,nativePin,plan,readPrimary,now,timeoutMs}; readPrimary names admission/finalizer/subscription/process/savedEvent/effect plus optional existing nominal. readFinalPrimary(check) -> EXACT {primary,writers}, backed by actual bound DB first-primary and every scoped writer.
+
+- [ ] RED: raw policy mismatch despite matching public projection; caller plan/raw selectors rejected; real native binding mutation/alias confusion fails; old control INFO cannot be reinterpreted; held writer rejects final-primary. Provider/custody fixture authority explicitly SYNTHETIC.
+- [ ] Add PRIVATE privateCanaryConfiguration tuple from accepted design to private plan/material/INFO validation before prepare/controlHash. Cross-check actual activationHash/restorationHash/bindingsHash; external projection exposes only bounded opaque commitments. No raw configuration travels to GHA; public source/canaryContainment hash meanings stay explicit.
+- [ ] Assemble private material only from exact intent/control references, seed and actual raw primary. Validate Known policies/consent/owner/program/window without cloning env. Implement source-qualified native actor/version/profile and separate native custody receipt handling; absent actual qualification stays unavailable.
+- [ ] Install real compiled material/observer/guard/cleanup factories. Guard factory({ctx,env,head}) returns actual {ctx,env,control,capabilities,now}; capabilities EXACT identity/readPrimary/withdraw/close/seal/proof/canary_restore. Each effect keeps existing execute/reconcile contract. Finite QA release read alias resolves AFW_MCP_CLOSURE_READ_TOKEN directly; ordinary operator retains AFW_RELEASE_READ_TOKEN.
+- [ ] Integrate Native5 same-control prepare -> guard.arm -> nominal claim -> prepared receipt; preserve Task2 internal parent assertions. readFinalPrimary uses actual DB plus writer exclusion, not impossible external D1 query.
+- [ ] GREEN: native material/control/read-RPC/observer/cleanup/reduction tests and scoped lint; report exact source/pins/alias checks, remaining custody/input gates; fresh review.
+
+## Task4C3: original nominal route, receiver and package completion
+
+**Files:** finite entrypoints and actual Worker/Workflow/DO mounts, existing Known wrapper/runtime adapters and finite receiver control resolver; new test/mcp-finite-full-route-native.test.mjs and affected native suites; complete builder semantic gates.
+
+**Consumes:** reviewed 4C2 factories and Native5 journal/inventory. **Produces:** original provider event to runKnownCancellationReleaseWorkflow({bundle,env,event,step}), no fifth argument; real finite route and six-file package when every dependency qualifies.
+
+- [ ] RED: actual Worker/Workflow/DO/D1 route subscribes -> custody -> Native5 launch -> save/capture -> delivery -> native withdrawal/close -> proof/restore. Assert original event sole {planHash:bundleHash}, exact instance, original timestamp and all18 stages; no synthetic readiness bypass.
+- [ ] RED: legacy receiver denies before host/auth/storage/budget/transport; poisoned env getters remain untouched. Test active launcher, SEND-with404, late create ACK, held D1/Container writes, loss of prepare ACK and reconstruction; both restores remain unavailable/admin-pending as required.
+- [ ] Implement original-event resolver and finite receiver using intent/control refs and append-only observed facts. Preserve original policies and all legacy uncertainty; no arbitrary plan or synthetic terminal receipt.
+- [ ] GREEN: full route plus affected Known/native cleanup suites, actual compiler/module/profile artifacts and scoped lint. Enable complete package success only with qualified full mounts and approved historical bytes; if bytes unavailable, report that gate without fabricating artifact IDs.
+- [ ] Root runs composed full suite/build/review after all tasks. Actual artifact locator/expiry and independent source/publication/privacy/custody/consent checks precede any separately scoped promotion/trial.
+
+## Hosted verification and evidence
+
+4C1 commands: node --test test/mcp-qa-finite-profile.test.mjs test/build-finite-native-package.test.mjs test/mcp-qa-finite-profile-native.test.mjs test/mcp-qa-finite-seed.test.mjs test/mcp-qa-finite-package.test.mjs test/mcp-qa-finite-seed-http.test.mjs test/mcp-qa-finite-seed-issuer.test.mjs test/mcp-qa-finite-publication-bridge.test.mjs; python3 -m unittest discover -s test -p finite_archive_test.py.
+
+4C2: node --test test/mcp-qa-finite-material-native.test.mjs test/mcp-qa-finite-trial-control-native.test.mjs test/mcp-qa-finite-read-rpc-native.test.mjs test/mcp-qa-finite-observer-native.test.mjs test/mcp-qa-finite-trial-guard.test.mjs test/mcp-own-finite-cleanup-native.test.mjs test/mcp-own-finite-reduction-native.test.mjs.
+
+4C3: node --test test/mcp-finite-full-route-native.test.mjs test/mcp-release-known-cancellation-native.test.mjs test/mcp-own-finite-entrypoints-native.test.mjs test/mcp-qa-finite-finalizer.test.mjs test/mcp-qa-finite-http.test.mjs.
+
+Use npm ci --ignore-scripts --no-audit --no-fund on hosted Node 22, npx eslint with the report's explicit changed-JS list, and generated-file dry-runs: npx wrangler deploy output/finite-native-package/qaLive/index.mjs --config wrangler.independent-closure-qa.finite.jsonc --dry-run --no-bundle --outdir output/finite-dry-qa; npx wrangler deploy output/finite-native-package/canaryLive/index.mjs --config wrangler.mcp-own.finite.jsonc --dry-run --no-bundle --outdir output/finite-dry-canary; assert generated bytes unchanged. No deploy invocation without --dry-run. Temporary finite-task1 qualifier remains branch-only/excluded integration. Reports record exact BASE/code/docHEAD, RED/GREEN commits, commands/run/job/counts, artifact/staging limits, review disposition and remaining gates. No full-suite repetition per small task. Root alone coordinates final full-suite and dispatch; no active implementation is authorized by saving this plan.

~~~~~~~~~~

## docs/superpowers/plans/2026-11-02-finite-initial-cleanup-owner.md

~~~~~~~~~~diff
diff --git a/docs/superpowers/plans/2026-11-02-finite-initial-cleanup-owner.md b/docs/superpowers/plans/2026-11-02-finite-initial-cleanup-owner.md
--- /dev/null
+++ b/docs/superpowers/plans/2026-11-02-finite-initial-cleanup-owner.md
@@ -0,0 +1,36 @@
+# Mounted initial closed-UI cleanup — implementation plan
+
+> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development. Steps use checkbox syntax.
+
+**Goal:** Have the surviving initial winner own a durable independent cleanup alarm before any future activation.
+**Architecture:** Private B1 arm after actual inactive receipt; existing fixed actor native SQLite alarm; actual finite subclass dispatch; one fixed closed-baseline restoration with at-most-once journals. No activation/ownerSource or new Workflow/infrastructure.
+**Tech Stack:** existing JavaScript ESM, Cloudflare Worker/DO SQLite/D1/alarm, locked Miniflare, Node22 hosted Actions, GitHub APIs.
+**Spec:** ../specs/2026-11-02-finite-initial-cleanup-owner.md
+
+## Global constraints
+
+All exact resources, IDs, clock relationships, negative actions and privacy constraints in the binding spec apply verbatim. Original B1 technical I0+300s/native30s/child5s preserved. Root cleanup-only C0=I0+900s/C1=C0+180s/three deliveries; custody/source ceiling must coverC1. Existing records/firstHEAD/unknowns preserved; ordinary index/nominal semantics untouched. No actual initial intent until full composition; no local worktree/build.
+
+## Review focus
+
+- Acknowledged record but missing/late alarm: no activation authority; pending cleanup survives.
+- Same singleton native alarm collides with nominal guard: no silent ownership transfer.
+- Late deployment request after timeout: baseline observation cannot settle it.
+- ACK/completion/profile mismatch or foreign pointer: no blind restore.
+- Owner-window15m vs technical5m: no silent extension or business cleanup claim.
+
+## Task B2b — actual mounted initial cleanup owner
+
+Files: modify lib/mcp-qa-finite-initial-entry.mjs and worker/independent-closure/finite.mjs; create lib/mcp-qa-finite-initial-cleanup.mjs and focused strict records module if needed; add actual native tests under test/mcp-qa-finite-initial-cleanup-native.test.mjs plus codec tests; adapt only relevant fixtures/assertions. Reuse existing fixed inventory/wire/profile/backup qualifiers; no production fixture exports or generic callback registry.
+
+Consumes: actual createPrivateQaFiniteInitialEntry({ctx,env}) original winning run, producer/result/parent, private uploader's actual backup/ACK/receipt/config, fixed bootstrap/source/residency and existing native bindings. Produces: private nonexported armInitialCleanup before safe RPC return; fixed exported runPrivateQaFiniteInitialCleanupAlarm({ctx,env}) returning null only for no owner and bounded factual result otherwise; actual finite subclass alarm override. Exact recovery journal schema finalized in pre-code constructor/table from existing source; it cannot mint forward activation or grant capabilities.
+
+- [ ] Verify actual dispatch HEAD/tree; inspect exact storage/alarm SDK, current private uploader outputs/lease retention, finite class mount, fixed global inventories and source guards. Persist short pre-code constructor/state/wire table and answer routine choices; escalate only true spec contradiction to Root before product.
+- [ ] Write meaningful RED on actual native initial path: after inactive receipt, assert durable immutable initial cleanup plan/state/alarm ACK; reconstructed finite alarm routes to owner and refuses nominal collision. No mocked arm success.
+- [ ] Run hosted focused tests; record exact expected failure/result/revision.
+- [ ] Implement private arm, bounded strict records and mounted independent alarm/restore path under the spec. Definite unknown remains pending/reconcile-only. All future activation SEND producers remain absent; tests explicitly SYN any recovery input not yet produced by actual forward writer.
+- [ ] Add and run failure matrix from Review Focus/spec: native finalreturn/sync/alarmACK/restart/clock/drift/conflict/latework/foreignpointer/backup+eligibility/once+RPCprivacy. Preserve old tests except deliberate integrated preparation now arms; identify every intentional fixture change.
+- [ ] Run focused GREEN plus relevant B1/B2a/historical/profile/nominal-guard consumers and scoped lint. Run ONE actual compiler/profile/residency at stable source, record exact hashes/bytes/graphs.
+- [ ] Persist report at ../reports/2026-11-02-finite-initial-cleanup-owner.md with exact evidence, concerns, SYN/event-delivery limits, all CAS/readbacks; STOP/release writer for fresh spec+quality review. Temporary qualifier excluded from integration. No source acceptance or runtime claim by implementer.
+
+Root self-review: every spec boundary maps to TaskB2b/native matrix; handoff/activation/owner-window change deliberately absent and remains unavailable. Alarm canary restoration and external QA finalizer are separate responsibilities. This source unit does not claim whole-package readiness.

~~~~~~~~~~

## docs/superpowers/plans/2026-11-02-finite-initial-inactive-upload.md

~~~~~~~~~~diff
diff --git a/docs/superpowers/plans/2026-11-02-finite-initial-inactive-upload.md b/docs/superpowers/plans/2026-11-02-finite-initial-inactive-upload.md
--- /dev/null
+++ b/docs/superpowers/plans/2026-11-02-finite-initial-inactive-upload.md
@@ -0,0 +1,10 @@
+# C2-B2a initial inactive upload — bounded plan
+
+Binding spec: ../specs/2026-11-02-finite-initial-inactive-upload.md. Approved source-only, no live initial intent until full composition.
+
+1. At actual dispatch BASE verify exact surviving B1 entry, A result/lease/retained IDs, native credential paths/token verifier, raw baseline/version wire helpers and codec limits. Persist short pre-code actual-supported table and exact Root scope rulings; report only real contradictions to Root, routine choices delegated.
+2. Meaningful native RED for absent real writer/journal and at-most-once/durability/body/resource requirements, not only missing module. Use real SQLite/D1/A and explicit SYN external boundaries. Preserve older test assertions; intentional prepare-path integration may require native fixture publisher/routes.
+3. Implement private nonexported mutator after A/post-sync inside B1 winner; exact closed_ui wire, sanitized/chunked immutable baseline preservation, distinct upload SEND/ACK/receipt journal. No generic source registry/callback facts/clock renewal.
+4. Guard actual holders/source/custody/baseline; SEND transaction final return/sync/readback before single deployfalsePOST; ACK exactUUID/readback/privacy; retain real promises and sticky uncertainty. No activation/rollback/capsule/ownerSource or retries.
+5. Focused GREEN with causal failure/timeout/restart/tamper/wire/native integration and relevant existing regressions. One stable actual compiler/profile/residency; no reflex repeated passing suites. Preserve oldsource/resource flags/firstHEAD and explicit last100/latest effects.
+6. Report exact evidence, expected vs actual/SYN, CAS/readbacks; STOP for fresh reviewer. Root will accept SOURCE only after spec+quality gate. Temporary qualifier excluded from integration.

~~~~~~~~~~

## docs/superpowers/plans/2026-11-02-finite-initial-native-entry.md

~~~~~~~~~~diff
diff --git a/docs/superpowers/plans/2026-11-02-finite-initial-native-entry.md b/docs/superpowers/plans/2026-11-02-finite-initial-native-entry.md
--- /dev/null
+++ b/docs/superpowers/plans/2026-11-02-finite-initial-native-entry.md
@@ -0,0 +1,45 @@
+# Initial native entry Implementation Plan
+
+> For agentic workers: execute this single bounded task sequentially; Root expressly prohibits subagents. Use executing-plans/TDD. Root approval already recorded.
+
+**Goal:** At most one actual A collection following a first acknowledged durable entry winner.
+**Architecture:** Fixed finite Workflow→existingSQLiteactor; deterministicglobalCAS, actualsync/readback, privateoneuseAcontinuation, postsync andsafereferencesonly.
+**Tech Stack:** NativeWorkers/DO SQLite/D1, Node22, existingesbuild/Miniflare lockfile, GitHubAPI/Actions.
+**Spec:** ../specs/2026-11-02-finite-initial-native-entry.md.
+
+## Global constraints
+No localclone/dependencies/build/provider/runtime/action; onlyisolatedsourcebranch viaGitHubAPI. Noagents. No secrets/artifacts/deploy intemporaryqualifier; EXCLUDEqualifierfromintegration.
+Exactrecord/entry/clock/output perapprovedspec. Fixedceiling unchanged. Noeffectpermission/allwriters/sourceauthorityclaim. Actual2MiBcanary/3MiBQA caps. PreserveA/B1/B2/C1 semantics/oldkeys/D1/finiteHEAD.
+
+## Review focus
+- Retriedtransactioncallback cannotleaveouterwinnerflag.
+- Bufferedget notdurability: actualsync mustfinish beforeA andsafesuccess.
+- Late/uncommittedclaims cannotreissueA afteracknowledgedwinner.
+- CrossRPCabsoluteclock notrenewed; transportednativefields arecorrelationundergovernedcallgraph.
+- Safeoutput/cachedstepresult cannotreconstructpublisheradmission.
+
+## One bounded task
+Files create lib/mcp-qa-finite-initial-entry.mjs, lib/mcp-qa-finite-initial-entry-records.mjs, test/mcp-qa-finite-initial-entry-native.test.mjs, test/mcp-qa-finite-initial-entry-records.test.mjs; extendnativefixture narrowlyifneeded; modifyworker/independent-closure/finite.mjs andtemporaryqualifier. Actualcompilerregression fixtures onlyasneeded.
+Interfaces: runPrivateQaFiniteInitialPreparation({env,event,step}); createPrivateQaFiniteInitialEntry({ctx,env}).run(exactrefs); EntryClaimcodec; existingfiniteactormethodprepareFiniteInitialMaterial(refs). ExistingA API unchanged.
+- [x] Persist preflight/spec/plan/ledger BEFOREproduct, CAS/ref/exactreadback.
+- [x] AddmeaningfulREDnative/recordtests, scopedtemporaryhostedqualifier; verifyfeature-missingbehavior failurewithworkingharness.
+- [x] Implementstrictrecord andfixednativewinnergate; actualsync/readback beforeA, postAactualsync, safeoutput; mountfiniteonly.
+- [x] HostedGREENnativeunit/relatedA/C1/compiler/profile/residencychecks, lint; inspectactualrun/head/attempt/logs/counts/bytes/artifacts0.
+- [x] Fixonlyobservedfailures; no genericrewrite/testwave; preserveoriginalceilings/identities.
+- [x] Recordexactbase/code/docsheads, commands/run/job/counts/bytes/actualvsSYN/CAS/readbacks/remaininggates; appendledger; STOPfreshindependentspec+qualityreview.
+
+Commands planned:
+npm ci --ignore-scripts --no-audit --no-fund
+node --test test/mcp-qa-finite-initial-entry-native.test.mjs test/mcp-qa-finite-initial-entry-records.test.mjs test/mcp-qa-finite-initial-material-native.test.mjs test/mcp-qa-finite-initial-material-records.test.mjs
+node --test test/build-finite-native-package.test.mjs test/mcp-qa-finite-bootstrap-compiler.test.mjs test/mcp-qa-finite-profile-native.test.mjs
+npx eslint <changed source/test files>
+
+No actualproductionworkflowdispatch/sourcecommands. Hostedtests sourceonly, no promotion/readiness/PCoff proof.
+
+## Executed result and plan refinements
+
+Final qualified source: e95b4cf1b1f4d098c3c4e412678b79a3a389a8f7. Run41530593619/job125569445138/attempt1: 68/68, 0 failures/cancellations/skips, scoped lint pass, artifacts0. Exact commands, intermediate RED and causal fixes, actual-versus-SYN boundaries, compiler bytes and CAS/readbacks are in the [final report](../reports/2026-11-02-finite-initial-native-entry.md).
+
+Actual A/B1/B2/C1 composition was tested through the new real native fixture; standalone accepted A suites listed in the original plan were not unnecessarily repeated. Final compiler/profile/residency checks ran once after source stabilized. Root approved the disclosed common native base versus actor-only I0/custody narrowing after implementation observation; the amended spec and report preserve this chronology and the delayed-factual-output limitation.
+
+Work stops for fresh independent spec and quality reviewers. Review itself is outstanding. No provider/runtime/publisher action, branch integration or main update is part of this completion.

~~~~~~~~~~

## docs/superpowers/plans/2026-11-02-finite-premature-admission.md

~~~~~~~~~~diff
diff --git a/docs/superpowers/plans/2026-11-02-finite-premature-admission.md b/docs/superpowers/plans/2026-11-02-finite-premature-admission.md
--- /dev/null
+++ b/docs/superpowers/plans/2026-11-02-finite-premature-admission.md
@@ -0,0 +1,35 @@
+# C3 premature finite admission — bounded source plan
+
+Scope: lib/source composition only, branch feat/finite-native-cleanup-20261101; no native mounting or remote mutation. Requirements: report 2026-11-02-finite-admission-preflight.md plus Root refinement 2026-11-02-finite-admission-refinement.md. operationalReadiness=false; completePackage=false; PCoff=false.
+
+1. Verify actual named constructors/call sites/test fixtures at the exact task BASE. Record a short pre-code table: fixed native source provenance and lazy resolver, definite-denial/unknown classification, original lease, D1 atomic predicate, gate/host/custody cleanup route. Resolve only actual contradictions with Root before product. No broader repository/history crawl.
+2. Commit meaningful focused tests RED against current real host/custody/native gate/D1 composition. Demonstrate premature subscription consumes admission or closure and poisons a later reservation; include actual SQL race and post-revocation cleanup constructor behavior. Explicit SYN boundaries; do not substitute fact DTOs or missing-module assertions for the causal regression.
+3. Implement source-owned opaque lazy admission helper using validated actual control/DB/ctx/env/program; expose only private fixed assertion/constraint to the existing branded gate. Preserve historical primary read/settlement, reductions/seal/close/C1 after active admission has ended. No new RPC, registry, permission, resource, DDL or ready boolean.
+4. Guard before beginAdmission, repeat at custody boundary, and attach fixed exact prepared-reservation EXISTS to actual admission INSERT...SELECT. Add custody/start-owned private known-no-admission classification only for proved fresh rejection or all acknowledged-zero executions. Keep cumulative pending/unknown/inserted state outside retriable DO callbacks; preserve all original uncertain cleanup and generic public errors.
+5. Focused GREEN: actual workerd SQLite DO+D1, intended reservation still insertable after early rejection, exact wrong pins/time/race denials, post-ACK0 marker remains unresolved, unknown/inserted/rerun cleanup retained, forged errors denied, valid one admission/unchanged launch fences, ordinary paths and post-Save/revoke/N1 cleanup preserved. Reuse existing actual producer fixtures rather than widening authority. One final actual compiler/residency check after stable source if changed imports/runtime graph require it. No reflex broad suites/reruns after clean source; new specific failures justify only focused followup.
+6. Temporary hosted qualification uses Node22/current lock, contents:read, no secrets/artifacts/deploy; docs-only changes don't retrigger it, and workflow excluded from integration. Report exact BASE/codeHEAD/docHEAD/run/job/attempt/counts/noise/bytes, expected vs actual test boundaries, changed files, exact CAS/ref/readbacks, review limitations and remaining owning gates. STOP for fresh independent spec+quality review. Root accepts source only after that gate.
+
+Never reset/refund/reuse first finite HEAD or a spent marker; no actual grant/owner window/CREATE/tag/dispatch/publish/Container/provider action. Current native wiring/factory qualification remains a separately explicit next gate, not silently completed by library tests.
+
+## Pre-code constructor, classification, SQL and fixture map — exact BASE ae7afdb8820b509f761ac026d311f9c39ed8b0db
+
+PROJECT Agent Friendly Web; REPOSITORY tokenizartinfo-ops/agent-friendly-web; ENVIRONMENT source-only branch feat/finite-native-cleanup-20261101; ORIGIN GitHub API/hosted Actions; RESOURCE_TYPE branch source/tests/docs; RESOURCE_ID exact BASE/tree87e0e990d935aa501c77c2122a24beec889d9fd7; ALLOWED_ACTION bounded C3 library implementation and hosted qualification; ROLLBACK forward revert of these exact changes, no force/history reset. No runtime/provider/publication permission.
+
+| Surface | Exact implementation decision | Qualification |
+| --- | --- | --- |
+| finite-primary constructor | Optional all-or-none nativeAdmission {ctx,env,program,programSourceRevision}; static captured DB/ctx/storage/namespace/version/program/control identity only. Private source WeakMap, no registry or callback enrollment. Lazy readOwnSuccessorHost + resolveSuccessorPreparation + readDossierEventHostPolicy on assertion/constraint only. | Construction/read/seal after Save/revoke/N1; malformed/foreign provenance rejected; existing no-source readers preserved. |
+| Source/gate | Source token privately held by existing gate; fixed internal assertFinitePreparedAdmission and finiteAdmissionInsertConstraint. Successful cardinality-checked primary query alone may classify definite missing/ineligible reservation; thrown/malformed read is ambiguous. No cached ready DTO. | Actual D1 missing/wrong pins and mutation between assertions and INSERT; fake token/DTO rejected. |
+| SQL | Fixed EXISTS reservation r JOIN original admission a and closure z, exact slot/trial/scope/application/predecessor/candidate/window/state/budget1/closed_at, T0<=reserved_at<=SQL_NOW, start<=SQL_NOW<min(N1,candidate expiry,selector expiry). INSERT extra manifest expiry<=r.expires_at INSIDE EXISTS and SQL_NOW<original issued lease deadline. Existing grant/consent/revocation/scope/time SQL unchanged; no global COUNT=1 added. | Valid one admission; missing reservation leaves later real createSuccessorReservation insertable; ACK0 race proves atomic denial. |
+| Fresh classification | Custody/current-start owns exact private Error object, recognizer local to that custody. Fresh requires no custody record, admission/launch finite writer, primary admission/launch/closure. Reservation-only writer does not imply possible process and does not disqualify: actual reservation producer only INSERTs reservation; pending reservation must not be poisoned by premature subscribe. | No marker/effect for fresh definite rejection; prior admission/launch/custody and forged errors retain close. |
+| Host/custody | Host guard inside existing catch routing, repeated custody guard before beginAdmission. Outer public safe sanitizes all failures. Only own custody classification skips close. Cumulative D1 evidence outside retriable transaction callback, pending/unknown/inserted sticky; ACK0 only when every execution success===true/meta.changes===0 and no launch. Original lease retained, issued marker unresolved. | Host-pass/custody-deny, all ACK0, changes1/unknown then0, malformed/false/lostACK/postinsert/readiness failure; ordinary path unchanged. |
+| Existing fixtures/callers | worker/mcp-own/index.mjs does not supply finiteGate and remains separate. Existing cleanup-native uses no nativeCleanup, so no-source historical construction remains available. Native tests reuse actual finiteFixture/nominalFixture, workerd SQLite DO, D1 schemas, actual host/custody/gate/primary/reservation; provider/auth/source/runtime faults are explicit SYN only. | New test/mcp-own-finite-premature-admission-native.test.mjs + test/fixtures/finite-premature-admission-worker.mjs. Existing ordinary host/custody, finite gate/cleanup/reduction and successor launch/reservation suites only as relevant regressions. |
+
+No #finite/#host/cleanup factory recursion. Current low-level successor resolver constructs provider readers but does not execute provider calls; new guards never call readRetirement/readDeployment or nativeCleanup.close. Settlement/read/seal paths never invoke live admission helper. Source-package helpers B1/C1/A and original finite HEAD unchanged. Actual Worker finite mounting, callback readiness/useful turn and full package remain owning gates.
+
+Root explicitly approved the reservation-only distinction before product: it supersedes the ambiguous blanket finite-writer wording in refinement; any unreadable/malformed/ambiguous prior state still disqualifies. Cost if wrong is missed possible-process cleanup, tested with actual source ownership and reservation-pending completion.
+
+## Implementation checkpoint — 2026-11-02
+
+Bounded implementation and hosted qualification finished at code06e424666e7cc1fcf277024aaed463f7d764dc24. Final65 affected native/custody tests +23 actual compiler/residency tests passed, lint clean, artifacts0 (run41537047289/job125591439327/attempt1). Meaningful initial RED and the additional ACK0/unreadable retry-state RED are preserved in [full report](../reports/2026-11-02-finite-premature-admission.md). Three legacy finite custody tests migrated to the actual native source fixture while retaining their reconciliation and original-deadline assertions. Existing standalone launch API/lease tests were preserved.
+
+All source/test/qualifier files were exactly read back at code head; expected-SHA non-force ref writes only. Source acceptance is PENDING fresh independent spec/quality review. STOP/release sole writer. Runtime/actual Worker mounting, publisher/full package, callback/useful turn and owner steps remain outside this unit. operationalReadiness=false; completePackage=false; PCoff=false.

~~~~~~~~~~

## docs/superpowers/plans/2026-11-03-finite-initial-activation.es.md

~~~~~~~~~~diff
diff --git a/docs/superpowers/plans/2026-11-03-finite-initial-activation.es.md b/docs/superpowers/plans/2026-11-03-finite-initial-activation.es.md
--- /dev/null
+++ b/docs/superpowers/plans/2026-11-03-finite-initial-activation.es.md
@@ -0,0 +1,23 @@
+# Activación inicial y acceso autenticado de AFW
+
+Base revisada: 1d01ef6d3aa44dd9a61ee986d52724a49fc55003. Alcance de código y CI en la rama de ensayo. La ejecución real queda pendiente de la composición y comprobación integral.
+
+## B2c.1 Activación privada
+
+Continuar dentro de createPrivateQaFiniteInitialEntry y de la misma invocación B1 → A → carga inactiva → armado. Devolver internamente plan y ACK desde armInitialCleanup solo tras sus comprobaciones durables. Mantener el padre, el productor A, los holders, el límite técnico y el límite de cinco segundos por operación hija.
+
+Antes de emitir, comprobar la publicación y la elegibilidad de reversión exactas, la custodia, los escritores históricos pertinentes y el inventario fijo de Workflows. Excluir solo la instancia inicial exacta dentro de afw-own-qa-private-bootstrap. Mantener los demás no terminales como bloqueo. Fijar qué lecturas primarias prueban cada gate antes de implementar el emisor.
+
+Usar los codecs B2b. Persistir SEND con sync/readback; emitir un POST; registrar ACK real; comprobar deployment, módulo y configuración; persistir Completion. Ante SEND existente o resultado incierto, conciliar sin reemisión. La reconstrucción de un recibo no devuelve autoridad de avance. Conservar la salida RPC factual.
+
+Registrar cápsula inmutable con la versión M realmente activada, deployment real y selector y referencias retenidas de A. Casos nativos: cadena exitosa, ACK ausente, deriva, SEND previo, POST/ACK incierto, lectura tardía, versión/módulo/configuración incorrectos, puntero ajeno y reinicio.
+
+## B2c.2 Entrada autenticada en estado cerrado
+
+Montar solo /connections/finite-prepare en canary finite antes del guard OAuth ordinario. Forward nativo al actor fijo del QA finite con el plazo original y metadatos internos reconstruidos. Verificar JWT de Access y titularidad primaria en QA. Resolver la fuente a partir de la cápsula, el QA vigente y la publicación primaria. M es initialBaseline de closed_ui. La versión histórica es la reversión. Acotar las lecturas repetidas al presupuesto existente.
+
+Separar vigencia técnica I0+300s de la ventana del owner, anclada al mismo I0 y acotada por I0+900s y custodia. Mantener C0=I0+900s y C1=C0+180s. Conservar duración independiente de permisos. Antes de habilitar esta ruta, bloquear la aprobación POST antes del consumo del ticket hasta verificar el traspaso del cierre.
+
+## Gates de ejecución real
+
+Custodia y techo vigentes, capacidad del lector nativo en el endpoint de Workflows, historial y esquema instalados para calificar los escritores relevantes. Preparar el traspaso y las etapas siguientes antes de emitir el primer comando real, que consume una entrada sin reinicio. El ensayo con el equipo apagado requiere evidencia propia.

~~~~~~~~~~

## docs/superpowers/plans/2026-11-04-finite-closed-prearm-policy-conversion.md

~~~~~~~~~~diff
diff --git a/docs/superpowers/plans/2026-11-04-finite-closed-prearm-policy-conversion.md b/docs/superpowers/plans/2026-11-04-finite-closed-prearm-policy-conversion.md
--- /dev/null
+++ b/docs/superpowers/plans/2026-11-04-finite-closed-prearm-policy-conversion.md
@@ -0,0 +1,134 @@
+# Finite Closed Prearm Policy Conversion Implementation Plan
+
+> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development under the standing root method. Steps use checkbox (`- [ ]`) syntax for tracking. One product writer; the implementer does not dispatch further agents. Task2 remains INACTIVE.
+
+**Goal:** Encode exact closed-prearm DATA qualification and deliberate conversion to the fixed full canaryLive shape, then wire that builder into existing derive without opening the missing producer.
+
+**Architecture:** A separate pure qualifier compares the third configuration to independently qualified original M. A pure builder uses the fixed full template and original persistent holders, removes the exact five preparation bindings and inserts the six derive strings. The existing setup consumer remains source-gated; genuine notice/SDK/source and own-SEND continuation are separate prerequisites.
+
+**Tech Stack:** Existing JavaScript ESM, Node test runner, canonical DATA helpers, existing esbuild/workerd/Miniflare compiler tests and authorized GitHub Actions. No new dependency.
+
+**Spec:** [2026-11-04-finite-closed-prearm-policy-conversion.md](../specs/2026-11-04-finite-closed-prearm-policy-conversion.md)
+
+## Global Constraints
+
+- Product inspected at e280a297f4c2ea3f38ea3fc4ac157439415708be. Root supplies the actual accepted C3 baseline before implementation; do not follow the advancing product branch during this docs task.
+- QA date2026-09-07 flags[nodejs_compat,enable_request_signal]; M date2026-09-07 flags[nodejs_compat,global_fetch_strictly_public,enable_request_signal], exact order.
+- Accepted finite hash/lifecycle APIs and C3 role selection are reused. Historical2607/c570, QA_CLOUD_CLOSED_PINS and strict legacy APIs are immutable.
+- Full canaryLive projection remains strict; no empty/private placeholder success, new profile role, fallback/hash callback or finite publish operation.
+- No SDK issuance, source producer, own-SEND relaxation, mount, admission, Entry, runtime, OAuth, OTP, Max, permissions, schema or clock extension.
+- All original windows, budgets, holders and identity checks remain; no production Date compensation or expiry renewal.
+- source ceiling2026-11-03T02:59:00Z is expired; operationalReadiness=false; completePackage=false; PCoff=false. Preserve the reserved single coordinated consuming PC-off occurrence.
+- No local clone/dependencies/tests/build; use the established authorized cloud source workflow only after root accepts this plan. This docs task executes no test/build/provider action.
+
+## Review Focus
+
+- A closed-shaped configuration is supplied as its own original: pure equality is not provenance; no source reader changes or success claim.
+- A malformed or placeholder slot happens to pass public redaction: builder rejects opaque/scalar policy input; original semantic provenance remains derive/source-owned.
+- Template replacement masks a changed DO/KV/D1/secret/metadata holder or removes more than five names: deny before conversion.
+- Binding hash and pointer are conflated: full hashes differ, third baseline remains exact and historical rollback never becomes latest pointer.
+- Pure tests pass while the real consumer still clones its baseline or a QA dependency enters M: compile actual imported graphs; keep unavailable native-source test.
+
+Each item has tests below. Positive production provenance is intentionally not a test outcome of these tasks.
+
+## Activation and file map
+
+Read the completed diagnosis and both root-reviewed phase-context documents at the pinned revisions in the spec first. The two-phase reader is not yet implemented and is not a prerequisite for Task1; its exact interfaces are future dependencies. Root must record accepted C3 head/tree and independent review before any product write. No compatibility reimplementation or simultaneous product writer.
+
+Create:
+- lib/mcp-qa-finite-prearm-profile.mjs — strict exact closed configuration DATA equality.
+- lib/mcp-qa-finite-policy-configuration.mjs — fixed full candidate DATA builder.
+- test/mcp-qa-finite-prearm-profile.test.mjs — original equality, closed grammar and strict input denials.
+- test/mcp-qa-finite-policy-configuration.test.mjs — causal conversion and fixed binding/policy/hash assertions.
+- test/fixtures/finite-policy-configuration-data.mjs — explicitly synthetic, expired policy/configuration DATA only, not source/ready/receipt DTOs.
+
+Modify in Task2 only:
+- lib/mcp-qa-finite-policy-setup.mjs — import/call builder from lexical derive and assert baseline/candidate module byte identity.
+- test/mcp-qa-finite-bootstrap-compiler.test.mjs — exact imported helper graph assertions in existing real compiler gate.
+
+Use existing tests unchanged unless the scoped assertion requires an addition:
+- test/mcp-qa-finite-profile.test.mjs
+- test/mcp-qa-finite-policy-setup-native.test.mjs (only the actual-unavailable-source test, not its substituted syntheticFacts positives)
+- test/mcp-qa-finite-policy-setup-facts-native.test.mjs
+- test/mcp-qa-finite-candidate-residency.test.mjs
+
+Do not change source stubs, phase reader, transport, setup/receipt codecs, fixtures that synthesize owner/source success, issuer, SDK, cleanup, worker entrypoints, compatibility profile or historical pins. Unexpected dependency changes require root source review, not a weakened assertion.
+
+## Task 1: Pure exact closed-prearm qualifier and full builder
+
+This is independently acceptable before notice/source/SDK work. It does not promise an executable owner timeline.
+
+**Interfaces consumed:** finiteFields, finiteData; qualifyFiniteConnectionProfile({phase:'closed_ui',metadata}); finitePublicProfileTemplate('canaryLive'); projectFinitePublicConfiguration({role:'canaryLive',metadata}); existing parseDossierEventPolicyFields, parseDossierRetirementFields and parseOwnPermissionWithdrawalPolicy DATA grammars.
+
+**Interfaces produced:**
+- qualifyFinitePrearmConfiguration({metadata,originalConfiguration}) -> deeply frozen detached normalized configuration, or throw.
+- buildFinitePolicySetupConfiguration({prearmConfiguration,policies}) -> deeply frozen detached normalized full configuration, or throw.
+- No other production export, option, policy resolver or provider dependency.
+
+- [ ] **Step 1: Add deterministic DATA fixture and causal failing tests.** Use the fixed canaryLive template; close every enabled flag, empty its four nominal slots, set project/client to ci-prearm-project/ci-prearm-client, and add the exact five preparation bindings. Use ACCESS_TEAM_DOMAIN=ci-prearm.cloudflareaccess.com, ACCESS_AUD=ci-prearm-aud, AFW_OAUTH_PILOT_EXPIRES_AT=2026-11-03T02:59:00.000Z, DELEGATED_RATE_LIMITER={name:'DELEGATED_RATE_LIMITER',type:'ratelimit',namespace_id:'2026101001',simple:{limit:10,period:60}}, monitoring policy=''. These are fixture DATA and never a provider plan.
+
+  Construct six structurally valid policy strings as explicit expired synthetic DATA using the existing policy grammars and fixed template resource. Events uses original synthetic grant/subject plus the same project/client, startAt=1000, expiresAt=301000; successor candidate shares this interval and budget1; withdrawal uses startAt=241000/expiresAt=421000 with explicit original notice sequence/revision/issuedAt/expiry; retirement is JSON with programHash/sourceRevision and its actual event-policy fields including containerId. UUID/hash fixture identities are deterministic and labelled synthetic. Do not use existing SYNTHETIC_PREARM or SYNTHETIC_QUALIFIED_ORIGINAL_RETIREMENT words. Do not return ownerSource, accepted, installed, ready, admission or receipt from the fixture.
+
+  Test names and decisive assertions:
+
+  - `exact original closed prearm is detached frozen DATA`: qualify succeeds with deep equality, nested Object.isFrozen checks; changing caller input later cannot change result. A different same-grammar Access audience/expiry/limiter/project-client value denies against original.
+  - `closed prearm never passes the full projection`: assert.throws on projectFinitePublicConfiguration for closed prearm; qualifyFiniteConnectionProfile({phase:'finite_prearm',...}) still throws.
+  - `clone and six patches leaves the causal shape failure`: reproduce the OLD pure clone-and-six-slot-patch expression on the fixture and assert the actual full projector throws. Then call the missing builder and assert its projected result equals finitePublicProfileTemplate('canaryLive'). The second assertion is the implementation RED; the first pins why cloning is insufficient.
+  - `full candidate preserves holders and removes exactly five names`: assert sorted before-minus-after names exactly equal the five spec names; after-minus-before is empty; every retained non-plain binding deep-equals its original; DELEGATED_RATE_LIMITER is absent specifically. Verify non-binding fields/exports/container declaration unchanged.
+  - `full flags and six original strings are exact`: exactly events/successor/withdrawal true, every other enabled flag false; each of six output texts equals fixture input byte-for-byte, no privateSlot object survives, original input remains untouched.
+  - `foreign shape and private placeholder cannot be repaired`: mutate each retained holder type/id/name, metadata binding, export/container, extra/missing/duplicate binding, flag order/date, new policy key, empty policy, opaque placeholder, JSON scalar/array, mismatched project/client; all throw. A placeholder rejection belongs to builder input grammar, not a modified full projector.
+  - `strict data rejects hidden capabilities without evaluating accessors`: extras, getter, symbol, custom prototype, sparse array, function/lease/env and oversize DATA deny; getter call count remains0.
+  - `full hashes keep distinct original domains`: finite activation, restoration and existing canonical binding digests are stable for equal configs; prearm versus full differs; one event grant mutation changes full private hashes but leaves publicStatic projection unchanged. That redaction equality does not certify grant validity.
+
+- [ ] **Step 2: Run causal RED in the authorized cloud task.** Run `node --test test/mcp-qa-finite-prearm-profile.test.mjs test/mcp-qa-finite-policy-configuration.test.mjs`. Expect failure at the explicitly missing new export/module, with old clone/projector assertion passing. Preserve exact head/run/attempt and failing assertion; dependency-install failure is not RED.
+
+- [ ] **Step 3: Implement the two pure interfaces.** Follow the spec's exact snapshot, original equality and full-template algorithm. Use strict DATA helpers before any property traversal. Reuse existing parsers; do not build a fake private-source validator, clock, namespace resolver or callback registry. Retain immutable original holders before constructing the new full object. Output has no authority field.
+
+- [ ] **Step 4: Run GREEN and unchanged strict projection checks.** Run the two new tests plus `node --test test/mcp-qa-finite-profile.test.mjs` against accepted C3. Expect zero failures/skips. Run repository lint scoped to the new files using the existing ESLint installation, without downloading a new tool. Report counts/warnings accurately. No native owner or remote outcome is claimed.
+
+- [ ] **Step 5: Commit and review this unit.** Use expected-head source commit with message `feat(afw): define closed prearm policy conversion data`. Root may accept this pure unit while rejecting/defering Task2. Record it as DATA-only, not imported native production. No deployment or new permission follows.
+
+## Task 2: Wire existing derive and verify actual imported graph
+
+**INACTIVE until the separate real source/own-SEND unit is implemented and independently accepted.** Task1 may close without Task2. The current native setup fixture aliases syntheticFacts and supplies placeholder prearm/retirement values; it cannot qualify this integration. Do not modify or use that substitute as positive source evidence. Root must supply the actual producer revision and its fixed native harness before activating this task. This is a concrete missing dependency, not an invitation to fill stubs within Task1.
+
+**Interfaces consumed:** Task1 buildFinitePolicySetupConfiguration; the existing lexical derive inputs; accepted finite activation hash and C3 explicit role consumers.
+
+**Interfaces produced:** No new public interface. derive still returns {context,candidate,artifact,namedContext,cancellationHistory}; createPrivateQaFinitePolicySetup and runFinitePrivatePolicySetup signatures remain unchanged.
+
+- [ ] **Step 1: Extend the existing real compiler test with failing imported-graph assertions.** At the actual candidate head, compileFiniteNativeStaging must include lib/mcp-qa-finite-policy-configuration.mjs in the QA setup graph. Assert the emitted esbuild metafile for lib/mcp-qa-finite-policy-setup.mjs lists that import, not merely that some unrelated fixture imports it. Assert no common/M input edge to mcp-qa-finite-owner-phase-context.mjs, mcp-qa-finite-initial-anchors.mjs, mcp-qa-finite-bootstrap-source.mjs or mcp-qa-finite-candidate-residency.mjs newly appears. If an input is already legitimately QA-only, retain that exact role. No copied metadata/hash marker counts as an import.
+
+- [ ] **Step 2: Run graph RED once.** Run `node --test test/mcp-qa-finite-bootstrap-compiler.test.mjs` through the established credential-free cloud compiler task. Expected failure at missing setup-to-builder import. Preserve source revision/tree and assertion. Do not activate a separate signal experiment.
+
+- [ ] **Step 3: Replace only derive's clone-and-patch.** Import and call buildFinitePolicySetupConfiguration with source.baseline.configuration and the six locally derived strings. Before constructing context, require the candidate descriptor name/hash/bytes and candidate byte array equal baseline M module and source.bytes.baseline. Preserve historical rollback bytes independently. Keep all original-context/T0/notice/binding/store checks; do not export derive, inject a builder, fabricate originalConfiguration or add source fields. Reuse accepted C3 hashes/validators as integrated; do not reintroduce old publish validation or duplicate finite consumers.
+
+  The builder has no source lease. Its placement after actual derive checks and before bindSelection/putContext/admission is intentional. This task adds no substitute for readPrivateQaFinitePolicySource or readFiniteOwnerSetupFacts.
+
+- [ ] **Step 4: Require genuine derive RED/GREEN, then graph GREEN.** In test/mcp-qa-finite-policy-setup-facts-native.test.mjs, extend the future accepted real-source harness (no alias of source, reader, SDK, qualifiers or derive). Produce actual synthetic-world original receipts/journals/Selection/witness through their native APIs, then provide the original primary issue-comment/seed evidence through the explicit external provider fixture. All external identity/provider inputs remain labelled synthetic, but the source producer itself runs intact. Before the builder integration, the exact closed third configuration must reach actual derive and fail the full projection with no Binding/SetupContext/admission/provider effect. After integration, the same causal inputs must produce the real full configuration and separate PolicyReceipt through the existing actual transport and readback. If this real harness is unavailable, Task2 stays inactive; no success DTO is an alternative.
+
+  Assert third receipt completion <= Selection/witness <= original T0 < commandBy; third module bytes exactly equal candidate; baseline version/deployment equal third receipt, not original capsule or historical rollback; the genuine derived six strings contain exact original T0/notice/grant/program/retirement identities. Independently mutate primary T0/seed identity, current grant, current project revision, selection, baseline module bytes and third pointer; each denies before new SEND. Use existing codecs/journals and original lease. Keep explicit missing-source/material/issuer cases pending with zero effects. Restore the normal/grant/revision/selection four cases only through this harness.
+
+  Run the Task1 tests and scoped lint first, then:
+```text
+node --test test/mcp-qa-finite-policy-setup-facts-native.test.mjs
+node --test test/mcp-qa-finite-bootstrap-compiler.test.mjs test/mcp-qa-finite-candidate-residency.test.mjs
+```
+  Expected zero failures/skips in this focused set. Compile actual accepted head/source tree once for this graph change, inspect M and QA metafiles and preserve module hashes/resident provenance. completePackage remains false; buildFiniteNativePackage still rejects. The native fixture is source-level qualification, not real remote provider/owner/PC-off acceptance. Unknown/lost ACK and post-SEND retention gates belong to the accepted producer unit and must remain passing at the integrated head.
+
+- [ ] **Step 5: Commit and obtain independent root review.** Expected-head commit `refactor(afw): build setup full policy from closed prearm`. Record exact BASE/code/report heads, cloud run/job/attempt, RED/GREEN assertion evidence, counts/skips/warnings, actual imported graph/hash evidence, changed files and residual source dependencies in docs/superpowers/reports/2026-11-04-finite-closed-prearm-policy-conversion.md when implementation is later performed. Root reviews actual diff before any next source activation.
+
+## Deferred source unit and native acceptance gate
+
+This plan deliberately contains no executable notice/SDK/producer task. A fresh implementer must not treat the following as permission to fill stubs:
+
+1. Implement/review the already planned closed_ui/read_consent reader separately.
+2. Design/review exact issuer notice operations and current consent/grant/GrantLink/NoticeLink provenance, then extend the reader for notices and exact CLOSED third receipt. The original-context, audit, bounded inventory, fresh-first-primary and backup/pointer checks in the companion spec remain mandatory.
+3. Design the fixed connection/setup source plus real transport own-SEND closure as an independently reviewable writer unit. Keep the existing source signatures; no allowPending/authority DTO. Prove exact predecessor while upload is pending; exact uploaded candidate after ACK; deployment uncertainty under the original owner; actual full readback after ACK; final receipt only after all checks. Unknown/lost/foreign ACK and held bodies never authorize replay or restore.
+4. Prove actual compiled M nominal denial under exact closed prearm across OAuth/monitoring/events/AfwNodeControl/successor/save/schedule/finite entries, with persistent history preserved. Flag assertions are insufficient.
+5. Only then restore the four real setup-facts cases through actual three-stage records/Selection before original primary T0 and actual derive/PolicyReceipt afterward. No source/SDK alias, copied success DTO, future T0, new Entry or historic clock renewal.
+
+The pure Task1 may be accepted without these gates. Task2 integration cannot: it must wait for the real producer unit and its causal harness. Neither task authorizes the third stage remotely, cleanup promotion or a hosted native timeline. No runtime/PC-off action is authorized by source tests.
+
+## Self-review receipt
+
+Both interfaces, exact five-binding removal, holder preservation, strict projection and six-slot DATA grammar have one implementation task and causal tests. Task2 defines the existing derive's actual graph edge, but cannot activate until the separately reviewed real producer and causal harness exist; no fake source is added. The plan makes no assertion of genuine semantic policy provenance from pure JSON or native baseline-byte provenance from graph inclusion. Task2 requires the actual native producer/harness proof in addition to its graph gate. Compatibility belongs to accepted C3; the two-phase plan remains a dependency with its original scope. This is a bounded conversion plan, not a whole-project replan.

~~~~~~~~~~

## docs/superpowers/plans/2026-11-04-finite-known-profile-compatibility.md

~~~~~~~~~~diff
diff --git a/docs/superpowers/plans/2026-11-04-finite-known-profile-compatibility.md b/docs/superpowers/plans/2026-11-04-finite-known-profile-compatibility.md
--- /dev/null
+++ b/docs/superpowers/plans/2026-11-04-finite-known-profile-compatibility.md
@@ -0,0 +1,125 @@
+# Fixed Finite Known Profile Compatibility Implementation Plan
+
+> **For agentic workers:** REQUIRED SUB-SKILL: superpowers:subagent-driven-development or superpowers:executing-plans as assigned by root. One product writer at a time; checkpoints are separate review gates. No implementer dispatches helpers or reviewers.
+
+**Goal:** Carry the exact finite signal-opt-in candidate through strict hashing, named validation and the complete existing Known cancellation lifecycle while preserving the positive legacy path.
+
+**Architecture:** Fixed finite exports wrap shared private implementations in existing modules. Only the new Known entry is publicly exported from runtime; its Workflow and Operator stages stay private and select fixed finite observer/reservation adapters. Explicit historical rollback roles remain legacy.
+
+**Tech Stack:** ESM, Node22, esbuild, isolated Miniflare/Workflow/D1, existing credential-free GitHub Actions source qualifier.
+
+**Spec:** docs/superpowers/specs/2026-11-04-finite-known-profile-compatibility.md
+
+## Global Constraints
+
+- Inspected source bd923bab7225212e35e054b14c132de78195ec5e / tree b6fd94de88c796d5c8708b815b8db4e9595b6f92. Before source work, verify actual feature head; a later docs-only head may differ. Do not attribute this design's source observations to a moving branch.
+- QA date2026-09-07 flags exactly ["nodejs_compat","enable_request_signal"]; M date2026-09-07 flags exactly ["nodejs_compat","global_fetch_strictly_public","enable_request_signal"]. Legacy M pair and digests unchanged.
+- No exported strategy/hash callback, old-or-new fallback, compatibility normalization, new approval/token/DTO authority, native mount or business producer.
+- All18 hooks, exact primary grant/history/identity, original70s parent, existing5s/20s children, actual cancellation/retention and one-use/no-replay semantics remain.
+- Source ceiling2026-11-03T02:59:00Z expired; operationalReadiness=false; completePackage=false; PCoff=false.
+- No provider/runtime writes, Entry/DDL/credentials/permissions/OAuth/OTP/cron/Max, new budget, generic outbound, other-project work or reserved occurrence consumption.
+- Historic2607/c570 modules/configurations and QA_CLOUD_CLOSED_PINS byte-identical. No old sealed record/Plan/capsule rewrite.
+- All verification below runs in authorized credential-free cloud source CI; no local clones/builds/dependencies. Reuse the held implementer's qualifier, restore its own scoped source test stages as needed, and remove it before delivery. No dispatch or test was performed while writing this plan.
+
+## Review Focus
+
+1. Nested revalidation can silently select legacy after a finite entry succeeds: Task2 must reach actual positive finite reservation, not only a bundle unit test.
+2. Metadata extraction can reject old rollback before role selection: Task3 tests both sides of readVersion and SetupContext, including swapped roles.
+3. Shared refactoring can leave legacy rejection tests green while destroying successful lifecycle: Task2 preserves and runs the original positive native builder suite.
+4. Test-source aliases and instrumentation anchors can hide the real path: Task2 has an untouched actual core native positive plus a separate observation-only18-hook witness; Task3 source spy remains only a handoff test.
+5. Final build provenance, pending physical settlement or unresolved initial-upload timeout can be overstated: Task3 records terminal targeted results, checks unchanged retention and compiles the final exact source once.
+
+## Checkpoint1: Strict fixed candidate primitives
+
+**Files**
+- Modify lib/mcp-activation-observer.mjs.
+- Modify lib/mcp-release-operator-policy.mjs.
+- Create test/mcp-finite-activation-compatibility.test.mjs.
+- Create test/mcp-finite-named-activation.test.mjs.
+- Preserve/run test/mcp-activation-observer.test.mjs and test/mcp-named-activation.test.mjs.
+
+**Interfaces produced**
+- finiteActivationConfigurationHash(value) -> string.
+- createFiniteActivationObserver(options={}) -> async (input,signal) -> existing observation.
+- validateFiniteReleaseOperatorBundle(bundle) -> true, confirm_named only.
+- resolveFiniteNamedActivationPlan(bundle,namespace) -> frozen {plan,current}.
+- validateFiniteNamedCancellationHistory(bundle,raw) -> true.
+- Exact option fields/results and fixed flag arrays are defined in the spec; no optional profile field.
+
+- [ ] Add failing cases named legacy_pair_digest_and_positive_observer_preserved, finite_triple_hashes_actual_flags, profiles_reject_each_other, exact_flags_date_and_plain_data, finite_observer_checks_approved_and_observed_profile, finite_named_plan_and_history_positive, finite_bundle_requires_confirm_named, finite_private_binding_and_current_grant_correlated. Use the existing legacy fixtures as unchanged originals; build a separate candidate copy before hashing. Independently compute the canonical SHA-256 expected value from a fixed literal seven-field fixture with sorted bindings and actual flags. Record the legacy golden from the old implementation before refactoring and require exact equality afterwards. Assert input not mutated; reject old/new cross-use, missing/extra/wrong/reordered flags/date, accessor without invocation and secret content.
+- [ ] In cloud run node --test test/mcp-finite-activation-compatibility.test.mjs test/mcp-finite-named-activation.test.mjs; expect missing fixed exports/candidate rejection RED. Preserve that causal result, not a harness timeout.
+- [ ] Extract private snapshot/hash/observer bodies with module-owned exact flag selection; keep the canonical function and all existing validation byte-for-byte in meaning. Add the two fixed activation exports. Approved configuration and observed metadata use the same selected hash. No new exported implementation.
+- [ ] Extract private policy bundle/resolver/history bodies. Existing exports use old hash and existing operation range. New finite exports use the candidate hash and require confirm_named before nested manifest validation. Keep current target, artifact size/hash, exact fields, named bindings, identity, scope, window and current-grant checks.
+- [ ] Run node --test test/mcp-finite-activation-compatibility.test.mjs test/mcp-finite-named-activation.test.mjs test/mcp-activation-observer.test.mjs test/mcp-named-activation.test.mjs. Expect all selected assertions PASS, zero skips/cancellations. Run lint before the checkpoint acceptance; retain existing warnings.
+- [ ] Commit the strict primitive unit with exact CI head/run/job/attempt. Stop for its source review checkpoint. This is a prerequisite only; do not report the finite path fixed.
+
+## Checkpoint2: One shared lifecycle with fixed finite entry
+
+**Files**
+- Modify lib/mcp-release-runtime.mjs and lib/mcp-release-successor-reservation.mjs.
+- Modify test/fixtures/named-confirmation-native-rehearsal.mjs to share its existing private test composition with a separately named finite entry.
+- Create test/mcp-release-finite-known-cancellation.test.mjs and test/mcp-release-finite-known-cancellation-native.test.mjs.
+- Modify only source/export anchors needed in test/mcp-release-known-cancellation.test.mjs; retain every existing semantic assertion.
+- Test existing test/mcp-release-known-cancellation-native.test.mjs, test/mcp-release-reservation-native.test.mjs, test/mcp-release-workflow-native.test.mjs and test/mcp-release-runtime-native.test.mjs.
+
+**Consumes** Checkpoint1 fixed exports.
+
+**Produces**
+- runFiniteKnownCancellationReleaseWorkflow(options) -> Promise<existing Known outcome>, exact {bundle,env,event,step}.
+- reserveFiniteReleaseSuccessor(options={}) -> Promise<existing reservation result>, same option keys as legacy reserveReleaseSuccessor.
+- PRIVATE runKnownCancellationReleaseWorkflowImpl(profile,options), runReleaseWorkflowImpl(profile,options), runReleaseOperatorImpl(profile,bundle,env,args,lease,observation,authorize,cancellationHistory).
+- Test-only rehearseExactFiniteNamedConfirmation({artifact,mode='confirmed',payloadMode='object',retirement='stopped',replay=false,fault=null,nativeFault=null,measure=false,replayExpected='uncertain',witness=false}) -> existing rehearsal result. Finite fixture fixes reserve='true', historyMode='known_cancellation', invocation='workflow'; it exposes no profile/hash/authorizer override. Existing rehearseExactNamedConfirmation(options) stays compatible.
+
+- [ ] Add finite cross-profile entry rejection, exact-four-fields admission, forged/copied/retired lease denial, complete primary history, non-reentrant18-hook and original deadline tests. Factor test-only scenario helpers where useful; do not replace the legacy cases. The runtime export assertion becomes the existing three names plus runFiniteKnownCancellationReleaseWorkflow and still rejects a lease mint, registry or public core.
+- [ ] Add an untouched actual finite-core native positive and separate observation-only18-hook witness. The fixed test builder compiles a test-only WorkflowEntrypoint named AfwReleaseWorkflow which forwards exactly {bundle,env:this.env,event,step} into the real finite Known export, with default fetch404. Use existing real isolated D1/native Workflow and custody DO fixture. Set finite operator compatibility to exact QA pair and identity/custody Worker to exact M triple; configure candidate metadata/hash to exact triple. Do not pass through the legacy buildMcpReleaseOperator validator. This is an unmounted test wrapper, not a product entry.
+- [ ] Refactor the existing rehearsal into a private fixed legacy/finite helper in the same fixture file. Legacy mode preserves its original builder argument, flags, RPC caller and history defaults. The new fixed finite wrapper supplies its own private builder, omits the legacy RPC caller/service binding, and uses native Workflow only. Keep knownCancellationNativeHarness and observation instrumentation test-only. witness=true adds observations to the real private authorize closure; untouched positive remains separate.
+- [ ] Assert finite confirmed result, mayRetry=false, operationalReadiness=false, journals {attempts:1,receipts:1,acceptances:1}, reservationCount1, prepared/mayBoot=false, six primary projections, all18 distinct hook names, unchanged immutable history, exact native Date/event identity/payload and elapsed original budget. Negative cases: missing/expired current grant, identity mismatch, extra cancellation, queue/projection deadline => blocked and zero provider/credential/journal effects; revoke-prewrite/postwrite => uncertain with preserved activation history and reservation count0/1; foreign reservation race, lost ACK, late outer step and restart => no second row/effect, no late confirmed. Existing native fault helpers stay synthetic and must not become production options.
+- [ ] Run the two new files with node --test; expect failure before finite implementation. Do not replace a failing positive with blocked/pending.
+- [ ] Introduce private frozen LEGACY_RELEASE and FINITE_RELEASE selections in runtime using only fixed imports. Move current bodies without changing guard/order/clock logic; public legacy wrappers select LEGACY_RELEASE and new finite Known selects FINITE_RELEASE. Carry the same selection through Known -> Workflow -> Operator. Preserve private WeakSet lease issuance before first await, original options field validation and registry deletion on settlement.
+- [ ] In successor reservation share its existing body behind two fixed wrappers. Each local strategy fixes bundle/history/resolver; runtime's finite strategy references finite observer and finite reservation. Keep createActivationJournal, createSuccessorReservation, eligibility SQL, retirement evidence, provider readers, finite gate and effect order unchanged.
+- [ ] Update the legacy white-box closure harness anchor for the private Workflow call. Capture a test-local closure bound to the selected profile for retired/copied lease checks; never export that closure from product. Keep the18-hook, concurrent reentry, expired and missing primary assertions. Adjust instrumented compiled-source anchors to the single shared authorize closure; do not instrument the untouched native positive.
+- [ ] Cloud validation, separately attributable groups:
+  - node --test test/mcp-release-finite-known-cancellation.test.mjs test/mcp-release-known-cancellation.test.mjs
+  - node --test --test-concurrency=1 test/mcp-release-finite-known-cancellation-native.test.mjs test/mcp-release-known-cancellation-native.test.mjs test/mcp-release-reservation-native.test.mjs test/mcp-release-workflow-native.test.mjs test/mcp-release-runtime-native.test.mjs
+  Require PASS with original positive legacy cases still present and successful, not just negative admission cases. Run lint first; preserve exact source/run/job/attempt and distinction between actual native mechanics and SYN provider/custody.
+- [ ] Commit/review the lifecycle unit. No native mount or production builder modification. Do not claim C2/source integration or package readiness.
+
+## Checkpoint3: Explicit finite roles and complete source qualification
+
+**Files**
+- Modify lib/mcp-qa-finite-initial-owner-source.mjs, lib/mcp-qa-finite-preparation-cleanup.mjs, lib/mcp-qa-finite-policy-setup.mjs, lib/mcp-qa-finite-policy-transport.mjs, lib/mcp-qa-finite-preparation-records.mjs, lib/mcp-qa-finite-profile.mjs, lib/mcp-qa-finite-confirmation.mjs.
+- Modify focused existing tests: test/mcp-qa-finite-profile.test.mjs, test/mcp-qa-finite-preparation-records.test.mjs, test/mcp-qa-finite-policy-transport.test.mjs, test/mcp-qa-finite-policy-setup-native.test.mjs, test/mcp-qa-finite-confirmation-native.test.mjs and affected finite source fixtures only.
+- Test existing connection, initial-owner-source, preparation-cleanup, initial-upload, phase/bootstrap/historical, original native cancellation/retention files listed below.
+- No edit to lib/mcp-qa-finite-confirmation-source.mjs, historical files/pins, production bridge/receiver/retention, native mounts or clock algorithms.
+
+**Consumes** All fixed interfaces from Checkpoints1-2.
+
+**Produces** Existing public finite APIs unchanged, with correct fixed candidate consumers and explicitly historical rollback validation. Descriptor string becomes finiteActivationConfigurationHash; QA remains null.
+
+- [ ] Add mixed_role_setup_context_roundtrip (candidate baseline + historical rollback succeeds; both swapped roles fail), read_version_current_candidate_and_historical_rollback (both actual and expected configs validated by trusted role), wrong_role_denied_before_mutation (zero writes/effects), candidate_private_projection_full_hash and finite_confirmation_handoff_fixed_entry cases. Public projection equality must not hide a changed full candidate hash; invalid private manifest still fails finite bundle validation. Keep the historical digest assertions in separate legacy cases; remove historicalActivation normalization as the mechanism for qualifying new candidate behavior.
+- [ ] Run those focused files to establish the actual compatibility RED at consumer boundaries. Keep old pending/uninstalled-source negative tests. No public factory gets a role or injected hash argument.
+- [ ] Apply the spec consumer map exactly. In policy-setup retain the legacy publish-only validator at old line75. In policy-transport use candidate-only configuration(value) and private historicalConfiguration(value); readVersion's existing closed argument chooses the exact projection/hash for BOTH metadata and pin. Candidate wire remains candidate-only. Keep qualifyFiniteWorkerVersion and restoration hash checks intact.
+- [ ] Split SetupContext baseline/rollback checks by property name. Use finite bundle/resolver/history in candidate installation/confirmation. Switch confirmation's Known call without altering event/env/step identity, number of keys, clock, source reread, result or provenance checks. Update the test spy export name and candidate fixture hash; do not stub the actual native lifecycle tests from Checkpoint2.
+- [ ] Update finite candidate fixtures to the fixed hash only where their data is a new candidate; preserve old rollback configurations. Preserve template/config flags already qualified by the preceding opt-in work. Do not edit historical2607/c570 files or recompute historical pins.
+- [ ] Run lint; run bounded cloud groups with exact head attribution and isolate initial-upload from other native files:
+  - node --test test/mcp-qa-finite-profile.test.mjs test/mcp-qa-finite-preparation-records.test.mjs test/mcp-qa-finite-policy-transport.test.mjs
+  - node --test --test-concurrency=1 test/mcp-qa-finite-policy-setup-native.test.mjs test/mcp-qa-finite-connection-preparation-native.test.mjs test/mcp-qa-finite-initial-owner-source-native.test.mjs test/mcp-qa-finite-preparation-cleanup-native.test.mjs test/mcp-qa-finite-confirmation-native.test.mjs
+  - node --test test/mcp-qa-finite-initial-upload-native.test.mjs
+  - node --test --test-concurrency=1 test/mcp-qa-finite-profile-native.test.mjs test/mcp-qa-finite-phase-inventory.test.mjs test/mcp-qa-finite-bootstrap-native.test.mjs test/mcp-qa-finite-historical-source-native.test.mjs
+  - node --test --test-concurrency=1 test/mcp-qa-finite-owner-native-conduit-native.test.mjs test/mcp-qa-finite-owner-request-retention.test.mjs test/mcp-qa-finite-owner-request-retention-native.test.mjs
+  The last group is affected-source regression, not another flag experiment. Preserve receiver-aborted held/before-guard observations and retained pending work through actual settlement. Require terminal PASS, zero unexpected skips/cancellations; the existing initial-upload timeout is unresolved until diagnosed, not waived by this plan. No product timer/budget increase or unrelated HTTP-engine fix.
+- [ ] Compare exact Git blob IDs against aed54dab and sourceBASE for lib/mcp-qa-finite-historical-source.mjs, lib/mcp-qa-cloud-closed-pins.mjs, worker/independent-closure/closed-rollback.mjs, worker/mcp-own/closed-rollback.mjs, wrangler.independent-closure-qa.rollback.jsonc, scripts/mcp-confirmation-frozen-artifact.json and scripts/mcp-qa-legacy-historical-context.json. Require equality and inspect full source diff for any historical pin/config mutation.
+- [ ] After final source edits, run ONE actual compileFiniteNativeStaging({cwd:process.cwd(),sourceRevision:process.env.GITHUB_SHA}) in the authorized qualifier. Log only sourceRevision/tree and module metadata/public hashes; do not log private bundle/material, candidate bytes or secrets. Require source/template/entry/bootstrap/residency guards and M<=2097152 / QA<=3145728 bytes without relaxing limits. The exact codeHEAD must be committed and clean. No complete-package/deployment claim.
+- [ ] Remove the temporary qualifier before delivery. This administrative removal is a later source revision: report the exact compiler head and subsequent diff, never attach its module hashes to a later head. If removal changes compiler-bound workflow input, compile the final intended source in the established bounded CI mechanism rather than claim equivalence. Avoid an endless documentation rebuild: reportHEAD is documentation only and explicitly distinct.
+- [ ] Write final implementation report docs/superpowers/reports/2026-11-04-finite-request-signal-opt-in.md with expanded file map, root ruling/design, BASE/codeHEAD/reportHEAD, all run/job/attempt/counts, preserved failures/timeout disposition, legacy positive and finite actual lifecycle outcomes, SYN limits, historical blob equality, final compile metadata and remaining C2/unmounted/expired-source limitations. Fresh independent source review before root composition; no PR/merge/deploy by this plan.
+
+## Self-review and handoff
+
+Spec interfaces match task outputs; every consumer and mixed role is assigned to Checkpoint3. All18 hooks, primary authority and original clock behavior are exercised by Checkpoint2, actual native cancellation/retention by Checkpoint3. The five Review Focus cases map to explicit tests. Existing positive legacy lifecycle remains a required gate. No undefined production type, new native source/mount, generic callback or human design choice is required.
+
+Next action after root acceptance: activate the existing held implementer for Checkpoint1 on the current verified source branch, carrying this spec and plan plus the original opt-in report. Continue checkpoints only with their evidence/review gates; no runtime action follows source acceptance.
+
+
+## Root activation ruling — 4 November 2026
+
+Root self-reviewed the fixed interfaces, consumer map and three checkpoint boundaries. Checkpoint1 is activated first as a prerequisite to the held signal opt-in task; it does not close that parent task. Later checkpoints require their own review gate. The existing blocked writer remains idle, and root assigns a fresh sole writer for Checkpoint1. Existing legacy APIs and positive lifecycle coverage remain strict. No source flags, runtime/reservation or finite consumer changes belong to Checkpoint1 beyond its two explicit source modules. Report path is docs/superpowers/reports/2026-11-04-finite-known-profile-c1.md. The documentation-only boundary in the design becomes source/tests execution scope for the assigned checkpoint; all remote effects remain prohibited. No human product decision is missing.

~~~~~~~~~~

## docs/superpowers/plans/2026-11-04-finite-owner-native-conduit.md

~~~~~~~~~~diff
diff --git a/docs/superpowers/plans/2026-11-04-finite-owner-native-conduit.md b/docs/superpowers/plans/2026-11-04-finite-owner-native-conduit.md
--- /dev/null
+++ b/docs/superpowers/plans/2026-11-04-finite-owner-native-conduit.md
@@ -0,0 +1,53 @@
+# Fixed native owner conduit and original selector — Unit2b.1 plan
+
+> **For agentic workers:** REQUIRED SUB-SKILL superpowers:subagent-driven-development or superpowers:executing-plans. GitHub source/credential-free Actions only; no local clone/build/dependencies.
+
+**Goal:** Add the bounded unmounted native conduit and exact original-A private context plumbing before any business producer can be enabled.
+**Architecture:** Sender and receiver have separate local lifetime brands clipped to the original30s budget. A fixed QA-only adapter supplies factual context through one internal common implementation seam; common/M graph never imports QA bootstrap/residency. All native conduit responses stay pending.
+**Tech Stack:** ESM/Node22, actual Miniflare Worker-to-DO fetch, existing request retention/admission, strict own-data codecs, GitHub Actions.
+**Spec:** docs/superpowers/specs/2026-11-04-finite-owner-native-conduit.md
+
+## Global Constraints
+- Source/tests only; no runtime/provider/Entry/DDL/token/permission/OAuth/OTP/cron/Max action.
+- UNMOUNTED pending-only conduit; no positive form, ticket consumption, SDK/issuer/grant/notice/publication or caller permission DTO.
+- Original30s request/5s children/I0/C0/C1/nominal clocks/counters/source ceiling unchanged; forwarded elapsed time never resets.
+- Common/M graph imports no QA bootstrap/residency/factual source; only fixed QA adapter owns internal context continuation.
+- Native metadata is correlation/lifetime DATA, not authorization. Native sender rejection does not prove receiver cancellation.
+- Ordinary APIs/setup-ownedSource and existing exact source grammar preserved; actual outstanding I/O retained through settlement.
+
+## Review Focus
+- Near-expiry sender budget must remain near expiry at receiver, including wall/monotonic disagreement and malformed fields.
+- Header spoofing/holder substitution cannot retarget the fixed actor or fabricate an original lease/source.
+- A lost/hung native fetch must remain inconclusive and pending, never interpreted as effective receiver abort.
+- FirstGET selector must be exact original capsule/A, while unrelated UI opaque handles remain unrelated.
+- Borrow after actual adoption must retain the same ambient entry and admission; no foreign/readonly upgrade.
+
+### Task1: Bounded unmounted native conduit, private selector and factual borrowing
+
+**Files:**
+- Modify lib/mcp-qa-finite-owner-preparation.mjs: original boundary export, translated local lease, private context threading and named internal continuation.
+- Modify lib/mcp-qa-finite-stage-work.mjs: exact ambient owner factual borrowing only.
+- Create lib/mcp-qa-finite-owner-native-bridge.mjs: fixed original-lifetime sender.
+- Create lib/mcp-qa-finite-owner-native-receiver.mjs: fixed pending-only receiving invocation.
+- Create lib/mcp-qa-finite-owner-preparation-qa.mjs: fixed QA-only factual context adapter.
+- Create test/mcp-qa-finite-owner-native-conduit.test.mjs and test/mcp-qa-finite-owner-native-conduit-native.test.mjs plus minimal native fixture(s).
+- Extend focused existing original-selector/owner-request fixtures where needed; preserve historical accepted cases.
+- No production Worker entrypoint/profile/config/source-stub changes in this slice.
+
+**Interfaces:** Exact public/internal signatures and wire headers are in spec. Existing initial factual reader already returns exact {source,preconnectionId,capsuleHash}; do not change its strict closed_ui checks. Ordinary prepareFiniteOwnerChoice takes only(options,lease); internal continuePrivateQaFiniteOwnerChoice additionally takes the lexical fixed QA reader and is never reached through serialized arguments. Child boundary uses registered root state; receiver creates its own local brand only.
+
+- [ ] Step1: Write causal RED for missing boundary/private original selector and owner-mode borrowing. Run only selected new cases via credential-free Node22 Actions; preserve exact failure and distinguish diagnostic fixture errors.
+- [ ] Step2: Implement boundary DATA export and translated local lease with exact30s maximum, spent29s=>remaining<=1000ms, receiver monotonic clipping, incoming signal and unchanged child end; cover strict own/accessor/time fields.
+- [ ] Step3: Implement fixed bridge/receiver with original targets/headers/size limits, real M vs QA holders, whole actual fetch/body/cancel retention and immediate first-error preservation. Receiver ALWAYS pending and never calls choice adapter.
+- [ ] Step4: Exercise both real native Worker/DO ends under actual source profiles/flags; root probe is capability evidence only, not this product test. Report receiver observation separately; inconclusive/unsupported means business producer remains unqualified, no auto flag or cancellation RPC.
+- [ ] Step5: Add fixed QA-only adapter/private common continuation and thread exact context through helpers. First privateGET uses originalA; selector/hash drift fails; ordinary extra argument does not enable it. Preserve setup-ownedSource and inner schema.
+- [ ] Step6: Allow exact already-owner ambient factual borrow; use genuine consume/adopt fixture and prove retained conflict until actual settlement. No new owner capability or read-only upgrade.
+- [ ] Step7: Scoped lint before native groups, selected new and affected existing tests; inspect actual output. Run one actual finite compiler for changed graph, asserting no QA adapter/bootstrap/residency introduced into common/canary graph, with original guard/size/source provenance.
+- [ ] Step8: Self-review full BASE..codeHEAD, remove qualifiers and report docs/superpowers/reports/2026-11-04-finite-owner-native-conduit.md. Include all failures/warnings/SYN/native limits and exactheads. Fresh independent task review before positive source/SDK work.
+
+## Root preflight and scope ruling
+Architecture b60f8328 +focusedarchitectfollowup selected internalfixedQAadapter; JavaScript export is implementation seam, not invisible authority. Ruling: pending native components stay UNMOUNTED in this slice, keeping ordinary deployments and actual finite mounts untouched until positive source/issuer/completecleanup qualification. Nativefixture may mount helpers for behavior proof; no production-mount claim. This makes task independently reviewable without prematurely exposing forms. Actual default-entry lease hooking and fail-closed finite SDK dispatch remain next composition work.
+
+Root self-review: all six evidence groups map to Task1 steps, exact signatures/headers/clocks fixed, no undefined neighboring task type. Existing graph-cycle risk addressed by QA-only dependency direction. Source compile/evidence bookkeeping and pending-only negative qualification cannot be advertised as PC-off readiness. Rollback source only before promotion. Original single consuming occurrence remains reserved for coordinated PC-off, no full PC-on rehearsal/reset.
+
+Root scoped preflight: all five ReviewFocus classes covered by Task1 tests. Common-QAcycle→QA-onlyadapter; serializedboundaryauthority→pendingreceiver/no businessconsumer; originalselectorvsUIhandle→exactenvelopeassociation; nativeabortunknown→actualbothendsworkingdispatch; setupownedSourceconflict→mutualexclusion; ownerborrow→genuineadmissionandexactambientholders. No unresolved human product decision. Nativebehavior mayremain an explicit qualificationblocker; no new effectpermission follows from pendingcomponentgreen.

~~~~~~~~~~

## docs/superpowers/plans/2026-11-04-finite-owner-phase-context.md

~~~~~~~~~~diff
diff --git a/docs/superpowers/plans/2026-11-04-finite-owner-phase-context.md b/docs/superpowers/plans/2026-11-04-finite-owner-phase-context.md
--- /dev/null
+++ b/docs/superpowers/plans/2026-11-04-finite-owner-phase-context.md
@@ -0,0 +1,141 @@
+# Finite Owner First-Phase Context Implementation Plan
+
+> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.
+
+**Goal:** Produce private original-capsule factual contexts for closed_ui and the exact settled first connection publication, keeping all later phases and effect paths closed.
+
+**Architecture:** A QA-only reader qualifies original capsule/A, exact current provider/primary facts and bounded stage records. Pure stage/enrollment predicates are shared beneath existing consumers, without resolver recursion or importing QA bootstrap/residency into common/M. The existing lexical QA adapter consumes the exact envelope; its private continuation remains GET only.
+
+**Tech Stack:** Existing JavaScript ESM, Node test runner, workerd/Miniflare native DO + D1 fixtures, existing canonical record codecs and GitHub Actions. No added dependencies.
+
+**Spec:** [2026-11-04-finite-owner-phase-context.md](../specs/2026-11-04-finite-owner-phase-context.md)
+
+## Global Constraints
+
+- The exact private envelope is {source,preconnectionId,capsuleHash}; validateFiniteOwnerSource keeps its strict inner grammar.
+- Common/M must never import QA bootstrap or candidate-residency decoding modules.
+- Strict standalone readPrivateQaFiniteInitialOwnerSource and its absence checks remain unchanged.
+- Pending-only conduit, GET-only private continuation and private POST rejection remain unchanged.
+- No SDK issuance, native mount, provider mutation, permission boolean, callback/DTO authority or new admission.
+- Original I0/C0/C1, technical I0+300000, parent <=30000ms, child <=5000ms, commandBy-510000, nominal and launch clocks/counters remain unchanged.
+- Historical2607/c570 and QA_CLOUD_CLOSED_PINS remain immutable; source ceiling2026-11-03T02:59:00Z is expired; single consuming Entry remains reserved.
+- Exact candidate profile follows the eventually root-accepted incoming Request.signal qualification revision; no hardcoded old flag set or duplicate opt-in experiment.
+- No activation before that source qualification and root review; no remote schema, permissions, tokens, OAuth, OTP, cron, Max or other-project action.
+
+## Review Focus
+
+- Original pointer appears again after an unresolved SEND: context must still deny; matching pointer is not settled publication.
+- Storage prefixes look valid individually but belong to another original A/owner/enrollment: no phase source may be returned.
+- Receipt is valid but actual module/configuration or first-primary owner changes between snapshots: deny, without retry or repair.
+- Held read/body/cancel outlives logical timeout or abort: retain actual work and deny later work borrowing another root.
+- Later stage or private-policy text passes a loose projection: deny notice_consent/finite_prearm; placeholders and empty fields do not prove semantic prearm.
+
+All five are assigned explicit tests below. No execution occurs merely because this plan exists.
+
+---
+
+## Activation gate and baseline
+
+Source inspected: aed54dab23b644481aed01cf6b5b94249ecf9f23, feat/finite-native-cleanup-20261101. This docs branch is not a product candidate. Root must first record the exact accepted source/profile revision from the independent incoming Request.signal work and review this scoped plan. An intermediate positive native marker is insufficient. The implementer reads the accepted diff and updates the implementation base; no old flags are copied from this document. If the qualifier remains unaccepted, retain this plan without activating an implementer.
+
+Execution uses the existing authorized GitHub/Actions workflow and expected-head source commits. No local clone/dependencies/build, new cloud runner service, remote credentials or runtime invocation. Root supplies the established source checkpoint and review process; no new user choice of execution method is needed.
+
+## File map
+
+Create:
+
+- lib/mcp-qa-finite-owner-phase-context.mjs — fixed QA-only context producer; lexical bounded provider/D1 observations and two supported phase decisions.
+- lib/mcp-qa-finite-owner-stage-facts.mjs — pure exact installed-stage DATA qualifier, below resolve.
+- lib/mcp-qa-finite-preparation-enrollment-facts.mjs — pure original enrollment binding qualifier, with no phase/relax switch.
+- test/mcp-qa-finite-owner-phase-context.test.mjs — pure qualifier/strict data and graph boundary tests.
+- test/mcp-qa-finite-owner-phase-context-native.test.mjs — actual QA DO/D1 reader against explicit synthetic external evidence.
+- test/fixtures/finite-owner-phase-context.mjs — native test extension to the existing initial-entry world; no product source replacement.
+
+Modify:
+
+- lib/mcp-qa-finite-owner-preparation-qa.mjs — lexical reader import/call only.
+- lib/mcp-qa-finite-owner-preparation.mjs — stageHistory fact gathering delegates pure installed-stage predicates; preserve final currentPublication check, resolve/envelope, GET rejection, setup semantics and result shapes.
+- lib/mcp-qa-finite-preparation-cleanup.mjs — extract only enrollment linkage predicates into shared helper; preserve all standalone inventory/absence/reread gates.
+- test/fixtures/finite-initial-entry-world.mjs — minimal test-only original-lease entry to the real context module and fixture extension; existing fixture modes unchanged.
+
+Do not edit worker entrypoints, profile/flag files, initial standalone source reader, common owner-source/connection-source stubs, issuer mutation/schema files, cleanup alarm, transport pending return, historical pins or existing setup-facts pending expectations.
+
+## Task 1: QA factual context for closed_ui and first settled connection
+
+This is one independently testable deliverable. Pure extraction, native fixture and QA adapter change belong to the same task; neither scaffolding nor a nominal new export is a completed unit.
+
+**Interfaces consumed:**
+
+- readPrivateQaFiniteInitialAnchors({ctx,env},originalLease), returning the exact DATA shape stated in the spec.
+- Existing request root/deadline and observeFiniteFactualReadWork, with accepted same-ambient genuine-owner borrowing.
+- createFiniteOwnerPreparationStore({storage,now}) read methods, preparation codecs, policy identity hashes and journal records.
+- createFinitePreparationIssuerJournal({ctx,env}).read({preconnectionId},lease), read-only.
+- qualifyFiniteConnectionProfile({phase,metadata}), used only with supported preparation phases.
+- Existing primary repository/grant readers and new fixed SELECTs for exact original issuer/fence/consent/link observations.
+
+**Interfaces produced:**
+
+- readPrivateQaFiniteOwnerContext({ctx,env,parent,preconnectionId = null}) -> Promise<Readonly<{source,preconnectionId,capsuleHash}>>, otherwise unavailable.
+- qualifyFiniteOwnerInstalledStage({source,preconnection,sourceSnapshot,initialTicket,connection,stage,stageApproval,approval,ticket,ticketUse,upload,activation,predecessors,grantLink,noticeLink,observedAt}) -> Readonly<ConnectionReceipt>, otherwise throw.
+- qualifyFinitePreparationEnrollmentFacts({anchors,enrollment,ack,preconnection,sourceSnapshot,stageApproval,approval,ticket,ticketUse,projectRef}) -> Readonly<{enrollment,ack}>, otherwise throw.
+- preparePrivateQaFiniteOwnerChoice signature and common continuation are unchanged; only its lexical producer changes.
+
+- [ ] **Step 1: Bind the accepted source inputs.** Read the actual accepted opt-in commit/profile and repository instructions. Record head/tree, exact profile files and previous accepted run in the task receipt. Confirm no source conflict with this file map. Do not write a compatibility flag or dispatch the independent signal experiment.
+
+- [ ] **Step 2: Write focused failing DATA tests.** In test/mcp-qa-finite-owner-phase-context.test.mjs, import the two missing pure qualifiers and assert exact original-chain success plus one-field mutations: wrong original A, changed subject/source/project, wrong predecessor, ticket-use decision hash, ACK sendHash, receipt version/deployment, completedAt before either ACK, extra data/accessor/symbol and unknown journal state. For enrollment, exact original tuple/ACK succeeds, null ACK is factual only, wrong capsule/plan/zero-state/decision/hash denies. Native backup cases must deny missing/tampered Receipt/Backup/chunk, mismatched manifest/material/baseline and assembled length/hash without changing historical pins. Assert neither helper accepts a function/env or returns a callback/permission key. Do not test an invented all-four phase source.
+
+- [ ] **Step 3: Run focused RED in authorized cloud CI.** Run `node --test test/mcp-qa-finite-owner-phase-context.test.mjs`. Expected FAIL specifically because planned modules/exports are absent, not missing runner dependencies. Preserve the sanitized failure and exact head.
+
+- [ ] **Step 4: Extract the two pure qualifiers.** Implement signatures exactly as the spec. Move original predicates without weakening expiry or strict standalone reader behavior. stageHistory gathers the same exact records, passes one stage at a time with actual predecessors, and keeps its existing source.currentPublication comparison. The strict cleanup reader retains all prefix absence/zero-state/reread gates; the shared helper only checks factual linkage. No helper calls resolve, stageHistory, a reader or a store.
+
+- [ ] **Step 5: Add native failing two-phase tests through the actual reader.** Extend initialEntryHarness with a test-only direct native invocation under createFiniteOwnerRequestLease, and implement fixture composition in test/fixtures/finite-owner-phase-context.mjs. Use real initial anchors and native preparation/journal APIs; test setup may supply labelled synthetic provider/custody metadata, but may not substitute owner source, context producer, strict qualifiers, resident decoder or create a source-shaped success DTO. During the tested read, prohibit storage put/delete/sync, SQL mutations and provider non-GETs; retain read-only transactions where existing journal reads require them.
+
+  Required named cases/assertions:
+
+  - `closed source keeps original A and stable original context`: exact envelope keys; source matches strict grammar; original baseline/program/window match capsule/material; actual retained backup manifest/chunk hashes are checked; snapshots unchanged.
+  - `original approval and enrollment stay closed without publication`: use actual record/store APIs; resulting phase closed_ui; strict standalone reader still rejects same approvals.
+  - `settled first connection derives read_consent from exact primary state`: exact upload/activation journal and receipt, real read-only source code, actual synthetic provider metadata for the derived configuration. Assert phase/read receipt; original baseline does not move; all unchanged binding/module bytes exact.
+  - `unknown SEND denies even while provider pointer equals original M`: upload-only, activation-only, orphan ACK/receipt, wrong contextHash and writer-head cases all unavailable.
+  - `foreign extra and later stages never become matching phase state`: foreign A, unknown keys, notices/finite approval or receipts, empty/private-placeholder canaryLive fields all unavailable. Do not invent a positive notices/prearm candidate.
+  - `primary issuer prefixes remain facts not next-stage permission`: no issuer prefix accepted; exact reservation/OPEN/authorization/consumed-without-grant prefixes checked; grant/link/relation checked when present. Unknown ACK, orphan row/link, reservation/fence tuple mismatch, terminal fence, revocation or expiry denies. Missing grant is never repaired and no notice eligibility returned.
+  - `fresh current owner and current publication are independently rechecked`: owner/revision/grant/configuration/QA-pointer drift after first snapshot denies; every independent observation starts with SELECT in a fresh first-primary session.
+  - `original retained request cannot be renewed or borrowed`: genuine root with 29s elapsed leaves <=1s; abort/holder drift/held fetch/body/cancel retain work until settlement; clone/foreign-root denial. Reuse accepted retention controls, not a new permission mechanism.
+
+- [ ] **Step 6: Run native RED in authorized cloud CI.** Run `node --test test/mcp-qa-finite-owner-phase-context-native.test.mjs`. Expected FAIL for missing/new reader behavior with native fixture actually entered; no success assertion from source substitution. SQL mutation fixtures use their real supported SQL clock; capsule pre-expiry test clocks remain explicit synthetic evidence and never alter production Date/clock policy.
+
+- [ ] **Step 7: Implement the QA reader and lexical adapter.** Implement exactly the spec's two snapshots, bounded inventories with overflow, actual QA/resident/original M and retained-backup qualification, shared enrollment/first-stage predicates and current primary owner/issuer/link checks. Original baseline uses finiteActivationConfigurationHash(plan.configuration), not latest receipt or restoration hash. First connection configuration differs from original only by AFW_DELEGATED_OAUTH_ENABLED=true. Unknown SEND, later stages, cleanup progress and profile/provenance mismatch throw unavailable. Close every actual lifetime through retained existing scope; no writes, repair, retries, new lease or source factory. Switch the QA adapter import to the new reader; leave private POST rejection untouched.
+
+- [ ] **Step 8: Run scoped lint first, then the focused GREEN and unchanged-boundary suite in authorized cloud CI.**
+
+```sh
+node --test test/mcp-qa-finite-owner-phase-context.test.mjs test/mcp-qa-finite-owner-phase-context-native.test.mjs test/mcp-qa-finite-initial-owner-source-native.test.mjs test/mcp-qa-finite-initial-owner-source-records.test.mjs test/mcp-qa-finite-preparation-cleanup-native.test.mjs test/mcp-qa-finite-preparation-cleanup-records.test.mjs test/mcp-qa-finite-owner-context.test.mjs test/mcp-qa-finite-owner-original-context-native.test.mjs test/mcp-qa-finite-owner-native-conduit.test.mjs test/mcp-qa-finite-owner-request-retention-native.test.mjs test/mcp-qa-finite-policy-setup-facts-native.test.mjs
+```
+
+Expected zero failures/skips in this focused set; tests assert private POST calls reader zero times, pending host effects zero, strict initial denials intact, and existing setup-facts pending remains correct. Reuse recorded accepted incoming-signal evidence; do not duplicate its opt-in experiment. If a new regression is exposed, fix the relevant task and rerun only affected checks.
+
+- [ ] **Step 9: Verify the changed import graph once.** Run existing candidate residency check `node --test test/mcp-qa-finite-candidate-residency.test.mjs` and the repository's established credential-free changed-graph compiler gate at the accepted head. Capture actual M and QA graphs. Assert no new M/common edge to bootstrap/residency, no worker mount/profile edit, historical pins unchanged. A direct native reader fixture is not proof of a compiled product mount.
+
+- [ ] **Step 10: Commit and obtain the root source review.** Commit only this task's explicit file map plus its concise evidence note with expected-head CAS, preserving concurrent changes. Suggested message: `feat(afw): qualify original first-phase owner context`. Record exact source/tree/run, synthetic input boundaries, supported phases, preserved denials and remaining gates. A commit alone is not acceptance; root reviews before any next implementation slice or activation.
+
+## Finish condition and next extension
+
+This task is done only when closed_ui/read_consent factual qualification and meaningful native failures/retention tests pass at the accepted candidate profile, changed-graph check passes, and root accepts the source diff. Notice_consent and finite_prearm deliberately remain unavailable. Do not report four-phase coverage, SDK/native producer completion, operationalReadiness, restoration or PC-off.
+
+The next separately planned extension must compose exact fenced issuer/notice provenance and a source-qualified notices configuration, then settle the third-stage full canaryLive/private-full/prearm mismatch with actual compiled nominal denial. Later publication needs its private own-in-flight SEND continuation; complete cleanup is still required before forms or effects can open. Existing four setup-facts positives return only with that genuine flow, never through fixture success DTOs.
+
+## Self-review receipt
+
+Checked against the spec: both supported phases, all negative phases, original context invariants, enrollment extraction, fresh primary reads, source-only gates, preserved POST/pending boundaries and later interfaces are assigned above. Type/signature names match the spec; no callback/permission output is introduced. Each Review Focus item has a named native case. No implementation, tests/builds, runtime qualification or execution-method choice is claimed by this document.
+
+Root self-review additions: existing cleanup native/record regression paths were verified in the repository tree and added because enrollment predicates move beneath that consumer. Lint runs before expensive groups. No unreferenced grant scan or global absence claim is possible without a reserved UUID. Report target is `docs/superpowers/reports/2026-11-04-finite-owner-phase-context.md`; include exact evidence and qualifier removal. The documentation-only design boundary becomes source/test execution scope only after root records the accepted source/profile baseline, with no remote effects.
+
+
+## Root compatibility handoff and causal-cycle correction (4 November 2026)
+
+Checkpoint3 finite Known consumer integration is independently accepted at report949d84784e83f8859421242edeab3f68c5db93a3; its exact compilerhead is6d17d438becca708da5baae70129c73fc118bf98/treeb67e2d939637b07695b9cabe645aa879d96962ef. C1/C2/C3 each have separate clean task reviews. Original signal/profile slice is independently SpecPass / QualityApproved with six final patches and root composition acceptance. Root activates this task in the containing docs commit and supplies its actual source BASE. Do not start from the old architecture-inspection head or assign prior compiler hashes to a new tree.
+
+Use the accepted fixed `finiteActivationConfigurationHash` for original M preparation and first installed candidate configurations. Historical rollback metadata remains on the legacy fixed `activationConfigurationHash` through the already accepted explicit role consumers; no broad old-or-new fallback or normalization. Do not alter candidate flag/profile files or requalify incoming signal as an independent task.
+
+The later dependency report `docs/superpowers/reports/2026-11-04-finite-prearm-setup-dependency.md` supersedes the older proposed third-stage full-policy requirement: Selection precedes primary T0, and genuine full derive depends on that T0. A future exact CLOSED prearm and distinct full setup conversion need separate implementation/review; the two supported phases in this task do not close that gap. All notice/prearm inputs still return unavailable.
+
+Ruling: preparation reader and pure predicate extraction comprise one reviewed deliverable, using only the existing lexical QA adapter and one product writer. This creates no effect route. Fixed private DATA qualification does not authorize SDK issuance, native publication or cleanup. Cost if wrong: source rework on the feature branch; no remote effect is allowed by this handoff.

~~~~~~~~~~

## docs/superpowers/plans/2026-11-04-finite-owner-sdk-owned-recheck.md

~~~~~~~~~~diff
diff --git a/docs/superpowers/plans/2026-11-04-finite-owner-sdk-owned-recheck.md b/docs/superpowers/plans/2026-11-04-finite-owner-sdk-owned-recheck.md
--- /dev/null
+++ b/docs/superpowers/plans/2026-11-04-finite-owner-sdk-owned-recheck.md
@@ -0,0 +1,47 @@
+# Finite owner SDK owned recheck — D0.2 amendment
+
+4 November 2026. DESIGN ONLY; no implementation/test/runtime authorization. Product pin33fece006e8ccb74c6f91546002469d89939c059. [Spec](../specs/2026-11-04-finite-owner-sdk-owned-recheck.md).
+
+> **For agentic workers:** use the root's standing single-product-writer SDD execution after root accepts and dispatches this amendment. This does not create another writer or a scaffolding-only implementation task. Original A/B remain inactive until D0 is accepted and integrated.
+
+## Filemap and interfaces
+
+Amend existing D0.2 at ONE integrated affected head:
+
+- Modify lib/mcp-qa-finite-owner-phase-context.mjs: single extracted non-exported observeOwnerPhasePair({ctx,env,parent,preconnectionId}); strict qualifySettledOwnerPair(pair); retain existing readPrivateQaFiniteOwnerContext API; implement fixed exported handlePrivateQaFiniteOwnerOAuth({request,env,ctx},originalLease) in the SAME module with nested zero-argument recheckOwned().
+- Create planned lib/mcp-qa-finite-owner-oauth-qa.mjs only as the fixed native receiver importing that handler; it receives no observation frames or generic continuation.
+- Existing D0.2 oauth-forward/wire and bounded issuer-provenance records/journal remain as specified. D0.1 binding-facts is called inside common private metadata qualification.
+- Modify planned test/mcp-qa-finite-owner-qa-sdk-native.test.mjs and test/fixtures/finite-owner-qa-sdk.mjs with actual two-consumer behavior and lifecycle injections.
+- Retain/extend accepted phase-context native tests at the execution head. Unit2a store/journal/schema and production Worker/DO entrypoints remain unchanged.
+
+No cross-module observation export, serialized frame decoder, source callback, allowPending flag or copied SDK-result endpoint. No new schema/access task. D0.3 token compatibility stays separately reviewable.
+
+## Integrated RED/GREEN sequence
+
+1. **Pin accepted dependencies.** Record root-approved product head containing accepted reader and D0.1; compare against inspected33fece source. Original reader tests and schemaabsence/firstGET rulings are regression requirements. Do not follow another active writer.
+2. **Write causal native RED.** Actual QA handler records SDK begin SEND then attempts its next fixed step through current strict reader: it cannot progress. The positive expectation must fail at this precise dependency, not absent fixtures/import errors. Another request invoking standard reader at the same prefix must already deny.
+3. **Refactor one physical engine and implement handler together.** Move existing I/O to observeOwnerPhasePair without cloning it. Extract common validation and strict settled rules; perform all common/receipt checks twice. Keep handler within one existing observeFiniteOwnerRequestWork scope; shared observations borrow its ambient genuine root via observeFiniteFactualReadWork, with no stage-work API changes or read-only fallback for SDK execution. Only the handler's real local effects produce its expected ledger/result state.
+4. **Integrate exact own-delta checks.** Verify baseline and every fresh recorded append; uncertain/existing appends stop. Pair snapshots equal the exact ledger. Pending actual Promise cannot advance. Unit2a consume/grant keep one store and the same <=5s child; no row reconstruction or extra lease. Holder/fence/expiry checks remain.
+5. **Run focused cloud native GREEN** for test/mcp-qa-finite-owner-qa-sdk-native.test.mjs and the accepted reader's actual native test file(s), then affected issuer, retention, profile and context regressions once at that same head. Record exact command/run/head/attempt/counts. No local build/tests; no runtime operations. A passing source test does not install alias or qualify mounting.
+6. **Review integrated graph/diff.** One observation implementation, no public frame/continuation endpoint, standard reader unchanged contract, fixed QA receiver import, no M decoder edge and no changes to Unit2a authority. Publish root-review checkpoint via CAS. Do not merge a disconnected refactor and call D0.2 complete.
+
+## Required native real-code cases
+
+Use actual workerd DO storage, D1 and shared synthetic KV, actual SDK1.2.1 and actual source reader/journal/store functions. External provider/Access/custody/material inputs and expired-ceiling substitution are explicitly SYN; no ready source DTO, prefilled positive grant or syntheticFacts alias.
+
+- **GET early held begin:** actual recorded begin SEND remains unresolved while actual KV operation is held. Same executing GET can perform its own recheck, but no reservation/form/second SDK call occurs. Standard reader and second GET deny. Exercise strict reader in the same genuine ambient lineage through a fixed test-only observation point, so its denial is causally the unresolved journal rule rather than merely another request's occupancy rejection; test the latter separately. Once actual SDK resolves, the same original stack appends Observed and continues; assert actual form comes after genuine issuer ACK/link.
+- **POST own issuer SEND:** live invocation records consume/grant SEND and verifies its precise local transition/result. Standard reader denies the unresolved prefix; only actual consume result permits insertReadGrant on the same store/lease. Copying the exact row into another call fails.
+- **Pending versus resolved SDK:** hold actual approve and complete operations. Fabricated completion payloads have no endpoint. A local recheck never replaces the pending Promise. Release then require actual result plus fresh ACK before next work.
+- **Foreign/extra delta:** inject an extra/changed SDK record, other operation SEND, ACK, issuer reservation, preparation link, freeze or policy-writer SEND between snapshots and between effects. Both consumers deny; no successor grant/SDK call. Do not whitelist an entire prefix.
+- **Restart and same metadata:** recreate actor/request after unresolved SEND using same requestId/body/version/root-like metadata. No local ownership can be loaded from rows; no SDK retry or reconstructed witness.
+- **Drift:** change QA/M pointer/module/config/alias, original backup bytes, credential expiry, current project owner/revision or initial capsule linkage before next recheck. Blocks next work. Repeat enabled-receipt versus original-CLOSED configuration mutation independently in first and second snapshots.
+- **Retention/expiry:** hold actual SDK, provider fetch, body read and cancellation separately. Timeouts/native abort retain real operations; late settlements never authorize ACK/response/next effect. Consume/grant child and parent deadlines never renew. Actual SQL clock rejects stale queued granting SQL.
+- **Existing absence prefixes:** schema absent with no issuer/link/relation remains factual; reservation or link while schema absent denies. First-GET lone source prefix remains as accepted, cannot host SDK SEND without approved enrollment/receipt. No schema creation and no extra source eligibility from fixture ceiling.
+- **Settled behavior:** existing closed_ui/read_consent DTO remains byte-for-byte equivalent for allowed settled histories. General reader stays unavailable for every unresolved SDK/issuer history even when the handler's own private recheck succeeds.
+
+Original SDK promise settlement, permission reduction and restoration remain distinct. This supplement solves lexical rechecking only; provider publication continuation, full mounting/cleanup and actual QA alias authorization stay separate.
+
+
+## Root D0.2 SOURCE activation — 5 November2026
+
+Latestcontainingcommitactivates ONLYD0.2plusowned-recheckamendment afterD0.1acceptance04e8bb0f. ActualexecutionBASEsuppliedindispatch. HistoricalD0.1-onlyactivation/unassignedwordingaboveisdatedhistory. D0.3/notices/fullmount/actualbinding/provider/credential/Entry remainINACTIVE. SourceSDKtestsareonlysyntheticnativequalification. Briefdocs/superpowers/briefs/2026-11-05-finite-owner-sdk-trust-boundary-d02.md governsrootrulings andCASsinglewriter. No operationalreadiness.

~~~~~~~~~~

## docs/superpowers/plans/2026-11-04-finite-owner-sdk-trust-boundary.md

~~~~~~~~~~diff
diff --git a/docs/superpowers/plans/2026-11-04-finite-owner-sdk-trust-boundary.md b/docs/superpowers/plans/2026-11-04-finite-owner-sdk-trust-boundary.md
--- /dev/null
+++ b/docs/superpowers/plans/2026-11-04-finite-owner-sdk-trust-boundary.md
@@ -0,0 +1,170 @@
+# Finite Owner SDK Trust Boundary Implementation Plan — D0.3 source ACTIVE with bounded conditional tuple hardening
+
+> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans task-by-task. Root preserves the standing one-product-writer method. This plan is DESIGN ONLY; source work begins only after root accepts D0 and dispatches a task. Original issuer/notice A/B remain inactive until integrated.
+
+**Goal:** Replace unprovable M SDK reports with actual SDK validation/completion in the existing QA issuer, using one expressly reviewed QA alias to existing M OAuth KV.
+
+**Architecture:** QA owns actual SDK objects, original Unit2a store and same-lease consumption/grant witness. M forwards only the original bounded request; no read-grant/sdk-completed report API exists. The source profile gains a precise QA namespace access delta; actual binding/public mount/cleanup remain separate operational gates.
+
+**Tech Stack:** JavaScript ESM, actual @cloudflare/workers-oauth-provider1.2.1, existing native workerd/Miniflare DO/D1/KV, GitHub Actions. No added dependencies, secret or namespace.
+
+**Spec:** [2026-11-04-finite-owner-sdk-trust-boundary.md](../specs/2026-11-04-finite-owner-sdk-trust-boundary.md)
+
+## Global constraints
+
+- Product inspection BASE220b5bc323315b7f107967548fb8958c0f8234f2; root supplies accepted phase-context implementation BASE for execution. Do not follow the advancing product writer.
+- ONE proposed QA binding: AFW_FINITE_OWNER_OAUTH_KV→existing6b94ff702e504e14a7730cee73a0f6ff; this is namespace-wide QA read/write access. No exclusive-holder/per-key-ACL claim.
+- M physical bindings unchanged; revised qaLive adds one alias; historical qaClosed/c570, M2607 and QA_CLOUD_CLOSED_PINS unchanged. No old/new profile fallback or accepted flag/date change.
+- Original capsule/material/bootstrap must bind revised Q BEFORE the one reserved Entry. No retrofitting a sealed occurrence, replacement Entry or clock reset.
+- Original I0/C0/C1, technicalI0+300000, parent<=30s, child<=5s, commandBy-510000, nominal/launch clocks preserved. Untrusted metadata may narrow; not authenticate/widen.
+- Actual SDK and original fence/consumption witnesses stay lexical in QA. No result DTO/registration/callback attestation or ordinary unfenced granting fallback.
+- All current app observations use a new first-primary session with SELECT first and the original reserved UUID. No owner/client scans, SDK list/sweep/purge/client registration.
+- No product public/private mount, provider publication, binding installation, credentials, API-token reuse, remote DDL, browser, local clone/build/tests or other-project action.
+- Source ceiling2026-11-03T02:59:00Z expired. Fixture-only ceiling substitution is disclosed SYN evidence; SQLite clock remains native.
+- operationalReadiness=false; completePackage=false; PCoff=false.
+
+## Review focus
+
+- Another binding holder can send identical public metadata; QA must call the real SDK and never trust a report.
+- A fully valid bearer request replay before first success is indistinguishable: at most one original grant, real SDK execution, no claimed human-presence check.
+- KV propagation/late writes can make a valid transaction/code unavailable; never retry SDK operations or renew the original deadline.
+- New QA alias broadens all QA code's potential OAuth access; exact profile/capsule linkage and holder changes must fail closed.
+- QA-issued SDK code must traverse actual M tokenExchangeCallback/boundedTokenResponse, including denial after original grant revocation/expiry.
+
+All are assigned explicit tests below.
+
+---
+
+## Task D0.1 — Exact source access contract and original binding lineage
+
+Independently rejectable deliverable: source profile declares exactly the proposed alias and exact QA/M metadata comparison proves its identity. No SDK dispatch or actual binding action.
+
+**Modify:**
+- lib/mcp-qa-finite-profile.mjs — qaLive public template + Wrangler config add one fixed alias.
+- wrangler.independent-closure-qa.finite.jsonc — same kv_namespaces entry.
+- test/mcp-qa-finite-profile.test.mjs and test/mcp-qa-finite-profile-native.test.mjs — exact changed qaLive and unchanged historical roles.
+- test/mcp-qa-finite-bootstrap-native.test.mjs / test/mcp-qa-finite-bootstrap-compiler.test.mjs — revised source/profile expectations only where fixtures require exact new alias.
+
+**Create:**
+- lib/mcp-qa-finite-owner-sdk-binding-facts.mjs
+- test/mcp-qa-finite-owner-sdk-binding-facts.test.mjs
+
+**Consumed existing functions:** finitePublicProfileTemplate, finiteWranglerProfileTemplate, projectFinitePublicConfiguration, finitePublicStaticExpectation, readFiniteQaBootstrapPublication; original material/capsule codecs. No new factory for provider reads.
+
+**Produced signature:**
+
+```js
+qualifyFiniteOwnerSdkBindingFacts({qaMetadata,mMetadata})
+// frozen {alias:'AFW_FINITE_OWNER_OAUTH_KV',
+// namespaceId:'6b94ff702e504e14a7730cee73a0f6ff',bindingHash}
+// Strict bounded DATA only; no permission/lease/SDK/env object.
+```
+
+Metadata means full qualified role configuration DATA, not caller success flags. Require exactly one QA alias of type kv_namespace and exactly one M OAUTH_KV of the same pinned namespace; reject wrong type, duplicated names, missing fields, accessor/prototype/symbol data and additional OAuth alias. bindingHash hashes canonical {alias,namespaceId} using domain afw.finite-owner-sdk-binding.v1; profile commitments separately bind whole configurations.
+
+- [ ] **Step 1 — Record the accepted root scope.** Verify source branch/head, exact phase-context dependency status and D0 design acceptance. Explicitly record NEW QA namespace access and no operational authorization. Confirm branch lease before source edits.
+- [ ] **Step 2 — Write exact-profile RED.** Existing template lacks alias, so revised expected qaLive/binding helper assertions fail causally. Tests require unchanged canaryLive binding set, unchanged qaClosed pins and matching checked-in config.
+- [ ] **Step 3 — Run cloud RED.** `node --test test/mcp-qa-finite-owner-sdk-binding-facts.test.mjs test/mcp-qa-finite-profile.test.mjs`. Missing infrastructure/dependency is not an accepted RED.
+- [ ] **Step 4 — Implement exact template/config/helper changes.** No new profile role, arbitrary namespace, fallback validator or config override. Keep original QA flags and SDK1.2.1 pin.
+- [ ] **Step 5 — Add linkage regressions.** With actual codecs, revised material.qaBootstrap.record.qaLive.publicStatic.bindingsHash changes materialHash and capsule commitment. A capsule/source from old Q cannot qualify against revised actual metadata. capsule.bindingsHash still identifies M only. Missing/wrong alias, coherently changed QA namespace with unchanged M, extra alias and same-shaped fake profile deny. No rewriting historical bootstrap records/tags.
+- [ ] **Step 6 — Cloud GREEN and source compiler.** Run D0.1 tests plus existing initial capsule/material/bootstrap/profile tests affected by exact expectations. Use established compileFiniteNativeStaging gate once at exact head; preserve2MiB M/3MiB QA limits and capture changed qaLive source/profile hash. Its public mount remains absent; no runtime alias availability claim.
+- [ ] **Step 7 — CAS checkpoint and root review.** Evidence identifies the one new access contract and unchanged historical/M bindings. Root can reject the access delta independently of later SDK code.
+
+No necessary production changes to bootstrap-record/native/publication or capsule schema are expected: their current exact profile/material commitments carry this delta. Tests must demonstrate that; if a consumer hardcodes old counts or wrongly conflates capsule M hash with QA, report exact failure and review the smallest fixed-role correction. Do not loosen those contracts.
+
+## Task D0.2 — Actual SDK + original issuer in one QA invocation
+
+Starts only after D0.1 and the accepted first-phase reader. This replaces the old inactive Task A wire protocol; notice SQL remains a later task.
+
+**Create:**
+- lib/mcp-qa-finite-owner-oauth-forward.mjs — M fixed forwarding only.
+- lib/mcp-qa-finite-owner-oauth-wire.mjs — strict one-path original-request grammar.
+- lib/mcp-qa-finite-owner-oauth-qa.mjs — unmounted QA receiver, real SDK/env capture, independent original verifier, actual Unit2a sequence and local result records.
+- lib/mcp-qa-finite-owner-issuer-provenance-records.mjs and lib/mcp-qa-finite-owner-issuer-provenance-journal.mjs — bounded original journal (not present at inspection; implement only the revised local semantics).
+- lib/mcp-qa-finite-owner-approved-ticket-facts.mjs — pure shared ticket/preconnection/approval predicates if still absent.
+- test/mcp-qa-finite-owner-qa-sdk-native.test.mjs
+- test/fixtures/finite-owner-qa-sdk.mjs
+
+**Modify only after first-phase dependency acceptance:**
+- lib/mcp-qa-finite-owner-phase-context.mjs — invoke qualifyFiniteOwnerSdkBindingFacts inside its private primary observation on actual QA metadata/qualified M configuration at both repeated observations; alias holder checks and actual local SDK journal inventory. Preserve public DTO shape; no credential/capability export.
+- lib/mcp-qa-finite-owner-preparation.mjs — pure approved-ticket predicate extraction, preserving existing unavailable source/linkers and GET-only private continuation.
+- test/fixtures/finite-initial-entry-world.mjs — minimal reuse of genuine source/journal APIs and isolated test entry; no ready DTO or positive source alias.
+
+Do not edit production Worker/DO entrypoints, pending-only bridge/receiver, ordinary delegated-oauth-worker/store, Unit2a store/fence schema, actual cleanup alarm or provider writer. The separate full mounting gate later replaces finite authorization fallback; this task's product routes remain closed.
+
+**Interfaces:**
+- forwardPrivateFiniteOwnerOAuth({request,env,ctx},originalLease) -> Promise<Response>.
+- createPrivateQaFiniteOwnerOAuthReceiver({ctx,env}) -> frozen {fetch(request):Promise<Response>}.
+- handlePrivateQaFiniteOwnerOAuth({request,env,ctx},originalLease) -> Promise<Response>, called only lexically in QA receiver.
+- Existing actual source reader, original issuer journal/store and retained child/request helpers are consumed unchanged.
+- All result records use seal/encode/decodeFiniteOwnerIssuerProvenanceRecord(kind,input) and createFiniteOwnerIssuerProvenanceJournal({ctx,env}); durable journal methods take DATA, not a caller result proof.
+
+**Local record contract:** retain original Root, SdkSend and ExpectedGrant fields from the prior spec. Replace SdkAck(report) with SdkObserved {purpose,sendHash,resultHash,observedAt,outcome:'resolved',recordHash}, keyed <sdk operation>:observed. Fixed domain afw.finite-owner-sdk-observed.v1; strict canonical own data<=16384bytes. Only private QA code after awaiting its captured actual SDK Promise creates these records. No HTTP/RPC method accepts them. SdkSend is an intended call, not proof of dispatch; SdkObserved reports that exact local call's result, not global KV propagation/token visibility/drain. Same original bounds/maximum8 records before notices; unknown/extra/orphan/wrong operation denies. SDK operation duplicates never invoke SDK again, including a restart with an unresolved SEND.
+
+- [ ] **Step 1 — Write local-result/wire RED.** Strict native path /_finite-owner/authorize only, original GET/POST /authorize, body<=16384, private metadata overwrite, fixed origin and exact allowed query/form/header shapes. Former sdk-begin/sdk-approve/read-grant/sdk-complete/sdk-completed/report payloads deny before I/O. Source helper absence/behavior is causal RED.
+- [ ] **Step 2 — Write native real-code RED.** Two actual native workers use one shared synthetic KV namespace: M.OAUTH_KV and QA.AFW_FINITE_OWNER_OAUTH_KV map to that same fixture namespace; QA uses original native DO/RELEASE_DB. Invoke actual SDK1.2.1, actual original source/record/store functions. Existing native fixtures' source substitutions are not a valid positive source. Label only external Access/provider/custody/material/ceiling test inputs SYN. Seed client registry only in isolated fixture, never invoke product registration.
+- [ ] **Step 3 — Run cloud RED.** `node --test test/mcp-qa-finite-owner-qa-sdk-native.test.mjs`. Native test must actually enter the intended source path and fail for missing QA SDK/issuer behavior, not because assertions read prefilled grants.
+- [ ] **Step 4 — Implement lexical QA SDK holder capture.** Capture actual env.AFW_FINITE_OWNER_OAUTH_KV and get/put/delete/list functions, actor/storage/version/DB/retention holders, exact source metadata mapping; check before/after every application-controlled await. The SDK's own internal KV awaits are not newly fenced or cancellable; retain its whole actual promise and preserve opaque late-write uncertainty. Construct only fixed OAuthAuthorizationServer options and minimal SDK env {OAUTH_KV:capturedAlias}. No callbacks/SDK/env supplied over transport and no public SDK server.fetch in QA.
+- [ ] **Step 5 — Implement one-invocation GET.** Actual SDK parse/describe/begin with durable original claim; original Unit2a reservation/open/authorization+ACK/readback/link before form. No returned success on failed source/consent/current owner/SDK/journal/SQL. No repeat begin after unknown ACK.
+- [ ] **Step 6 — Implement one-invocation POST.** Actual original owner/form/ticket checks→one-use local approve claim→actual SDK approve→ExpectedGrant→same-store/same-child genuine consume/grant→actual grant/link→actual SDK complete/revokeExistingGrants:false→local result/response. Original scopes/props exact. Every SQL current observation fresh SELECT-first; no new grant ID, ordinary store fallback or SDK result supplied by M.
+- [ ] **Step 7 — Implement M forwarder/QA receiver fixture only.** One native request/response; no six-path result protocol. Use original bounded bytes, signal and accepted clipped lifetime. Preserve actual SDK Set-Cookie/redirect transiently in bounded response after original guards; no log/durable code. No product fetch mount or readiness switch.
+- [ ] **Step 8 — Run focused native GREEN with all causal cases below.** Retain failed earlier heads and actual run/job/attempt/commands/counts. No fixture authority replacement or reinterpretation of complete bearer replay as a denial.
+
+Required cases:
+1. **Actual GET then POST:** real SDK transaction in shared KV, exact original authorization hash/reserved app UUID, actual returned consumption witness, one app grant and actual SDK grant/code with original props. Assert complete called only after actual app grant ACK.
+2. **Forged old result path, before first success:** same mVersionId/requestId/body/source metadata and valid owner identity at /read-grant or /sdk-completed yields unavailable and no SDK/journal/D1 effect. These paths must not exist.
+3. **Real approve held:** hold actual KV read/delete used by QA SDK. Inject fabricated result fields/direct old path plus another request. No grant/completion until actual SDK succeeds; another request cannot borrow live request occupancy or original claim.
+4. **Real complete held:** hold actual KV put; forged sdk-completed cannot append local SdkObserved, return code, advance phase or clear retained promise. After deadline eventual settlement cannot extend effects or append late ACK.
+5. **Bearer limits separated:** copied public metadata/form with invalid/missing actual SDK cookie/state denies. Byte-identical full valid owner+SDK credentials racing first submission may win, but must invoke real SDK and yield at most one original consume/grant/complete. Assert this limit explicitly, no human-presence or M-identity claim.
+6. **Replay/restart:** durable SEND/unknown ACK followed by new request/recreated actor cannot resume SDK work or reconstruct Unit2a witness. Already completed replay creates zero additional grant/code and cannot revoke the winner.
+7. **Original lifetime:** elapsed29s leaves<=1s, native abort, C0/consent/grant/owner expiry, method/holder drift and retained body/cancel/SDK promises; no child/parent renewal, no first-primary reuse claim. SQL real execution time rejects queued stale writes.
+8. **KV consistency:** simulate exact native call returning miss/error/stale transaction to actual SDK; no substitute provider/source/approval. Unavailable outcome creates no new attempt. Duplicate KV-visible transaction still cannot duplicate D1 grant. A missing acknowledged code on M is not repaired/reissued.
+9. **Original mapping:** wrong QA alias namespace, missing binding, same-shaped holder replacement, changed actual QA/M profile or old capsule denies before SDK/app writes. Test extra alias/other same-account binding input does not imply trust.
+10. **History preservation:** no SDK list/purge/createClient, no other grant/token mutation, original historical D1 rows unchanged. Local resolved SDK result distinguishes result from global KV visibility.
+
+- [ ] **Step 9 — Scoped regressions and exact source graph.** Run new native suite plus affected original issuer, context, conduit/retention and setup-facts pending suites. Scoped lint. The unmounted component fixture's compiled graph is recorded separately; standard product bundle still lacks a positive mount. Exact final mounted SDK graph/QA3MiB budget must be qualified later at full mount gate, not inferred from test compilation.
+- [ ] **Step 10 — CAS source checkpoint and root review.** Rewrite prior Task A spec/interface on accepted branch to selected QA-local design, remove report endpoints, record exact access proposal and retained limits. This is source acceptance only; A/B activation/integration is root's decision.
+
+## Task D0.3 — Actual M token callback compatibility (source-only)
+
+Can be reviewed independently after D0.2. No token/credential operation against a real namespace.
+
+**Create:** test/mcp-qa-finite-owner-qa-sdk-token-compat-native.test.mjs. **Modify:** test/fixtures/finite-owner-qa-sdk.mjs. Reuse actual delegated-oauth-worker.mjs token endpoint/callback/boundedTokenResponse and actual SDK; no new token implementation.
+
+**Consumes:** QA actual code/props/grant from D0.2, shared synthetic native KV/D1. **Produces:** exact real-code compatibility evidence and denial cases, not a runtime access token.
+
+- [ ] Add compatibility qualification using QA-issued code and actual M /oauth/token request with original client/redirect/resource/S256 verifier. Since D0.2 is already accepted, valid exchange should pass; do not manufacture implementation RED. Pin wrong namespace/props/PKCE and revocation controls to demonstrate actual callback/permission causality.
+- [ ] Compose the actual M token-only handler in the isolated fixture. Do not expose ordinary authorization paths as finite fallback; assert /authorize invokes only D0.2 forwarding or stays pending, never ordinary createGrant.
+- [ ] Run `node --test test/mcp-qa-finite-owner-qa-sdk-token-compat-native.test.mjs`. Correct namespace/props→one valid exchange/bounded TTL; wrong namespace/client/resource/project/owner/props/PKCE, consumed exchange, original revoked/expired grant deny. Hold SDK completion, apply actual original terminal fence/grant reduction via existing component, settle late then require actual exchange/read denial. No Worker restoration claim.
+- [ ] Verify actual subsequent MCP permission check denies revoked/expired original grant even if opaque KV data survives. No refresh grant, client registration, SDK grant scan or second app permission.
+- [ ] Record actual-vs-SYN evidence and root review. Shared native fixture proves API compatibility, not cross-location production consistency/SLA.
+
+## Deferred operational gate (not a source task or execution authorization)
+
+Only after D0 source integration and the separate full cleanup/public mount gate: present exact reviewed QA version/configuration plus new alias access request, qualified original M namespace mapping, retained full no-alias QA baseline and owned-pointer rollback. Authorization must name account/QA/version/namespace/action; no new namespace/secret/data write by that access request. A revised bootstrap and original material/capsule must be generated only for the single still-unconsumed occurrence; an old sealed Q tuple cannot be repinned.
+
+After separately authorized alias publication, verify exact metadata/readback without reading KV contents or creating probe keys. SDK access/functionality is proved in synthetic native tests; live owner SDK operation remains part of its own consent/mount gate. Rollback removes only the QA binding reference by restoring the approved exact baseline and verifying independent metadata; never delete OAuth KV namespace/keys or M's binding. Unknown in-flight SDK writes remain uncertainty after reference removal.
+
+No source tests green result grants this operational authorization, renews expired source ceiling or closes PC-off. Keep original issuer/notice A/B inactive until root accepts D0 and explicitly integrates their replacement.
+
+
+## Root source-design self-review clarifications (continuation)
+
+Root selects option2 as a technical architecture choice under the owner's delegated direction; the owner did not separately choose this comparison. This selects a SOURCE proposal, not a real new KV grant. D0.1/D0.2/D0.3 remain unassigned until the current factual task and earlier selected pure conversion task close. Exact later BASE will be supplied; inspected220b5bc is not a moving execution pin.
+
+- Metadata role clarity: mMetadata means the COMPLETE independently qualified ORIGINAL/CURRENT M PREPARATION configuration (closed_ui/read_consent, later exact notices), not the full private canaryLive projection. The binding DATA helper must not run the full canaryLive projector on that preparation shape, infer a phase from flags or try validators until one passes. Its narrow fact is unique QAalias/MOAUTH_KV identity equality; the fixed QA source already owns full phase/original/profile qualification. qaMetadata is complete actual QA configuration with its exact qaLive commitment. Add pure positives for original closed and current read_consent M inputs with the same namespace, plus swapped-role/wrong-ID denials.
+- Early SDK uncertainty is separate: if actual beginConsent KV work is held/unknown before Unit2a reservation/Identity exists, no existing terminal issuer fence may be claimed for that missing identity. Add an actual held-begin case: no form/authorization/app grant without real completion+ACK, late result past original deadline cannot start reservation/grant work or append expired ACK, promise retained through settlement. This source task must preserve uncertainty; it does not broaden the opaque-SDK restoration ruling. Complete cleanup must separately prove its early-prefix barrier/settlement condition before any restoration claim.
+- D0.3 qualifies existing behavior after D0.2 and changes tests only. Its valid exchange is expected to PASS once the prerequisite works; do not manufacture a RED or claim new implementation failure. Wrong-namespace/props/PKCE/revocation controls and actual late-completion denial are meaningful causality. D0.2 owns issuance tests, D0.3 alone creates the token-compatibility test file. No duplicate coverage-only full reruns.
+- Reuse the eventually accepted factual-reader fixture and its guarded initialization. Do not copy old220b5bc missing ordinary schema, rename/drop historical grant tables or patch production SQL time. The actual fixture-only expired-ceiling substitution remains explicitly SYN and cannot prove runtime/source eligibility.
+
+Root preflight: the original M→QA SDK report dependency is removed by lexical QA execution, not 'authenticated' by serializable metadata. Separate alias access/profile lineage, real local issuer behavior and token compatibility remain independently rejectable tasks. No unresolved dependency is silently renamed complete. Full mount/provider-publication/cleanup/PCoff stays separate.
+
+
+## Root D0.2 SOURCE activation — 5 November2026
+
+Latestcontainingcommitactivates ONLYD0.2plusowned-recheckamendment afterD0.1acceptance04e8bb0f. ActualexecutionBASEsuppliedindispatch. HistoricalD0.1-onlyactivation/unassignedwordingaboveisdatedhistory. D0.3/notices/fullmount/actualbinding/provider/credential/Entry remainINACTIVE. SourceSDKtestsareonlysyntheticnativequalification. Briefdocs/superpowers/briefs/2026-11-05-finite-owner-sdk-trust-boundary-d02.md governsrootrulings andCASsinglewriter. No operationalreadiness.
+
+
+## Root D0.3 SOURCE activation — 5 November 2026
+
+This containing commit accepts D0.2 source at report d630a99d8bd30bbeaa5606a89dbd33ee58ce8b72 after independent Pass/Approved review and activates only D0.3. Exact execution BASE supplied by root. Earlier ACTIVE/INACTIVE headers are dated history. Brief docs/superpowers/briefs/2026-11-05-finite-owner-sdk-trust-boundary-d03.md and preflight define the precise conditional scope amendment: valid existing exchange first, and ONLY if genuine negative proves missing redundant props checks, two privilege-reducing equality guards in existing M token callback before consumeExchange. No other production behavior, permission, SDK callback injection, schema, clock or mount changes. Live I/O feasibility remains unaccredited; audit proposals not activated.

~~~~~~~~~~

## docs/superpowers/plans/2026-11-04-finite-request-signal-opt-in.md

~~~~~~~~~~diff
diff --git a/docs/superpowers/plans/2026-11-04-finite-request-signal-opt-in.md b/docs/superpowers/plans/2026-11-04-finite-request-signal-opt-in.md
--- /dev/null
+++ b/docs/superpowers/plans/2026-11-04-finite-request-signal-opt-in.md
@@ -0,0 +1,43 @@
+# Finite incoming Request.signal opt-in qualification plan
+
+> **For agentic workers:** REQUIRED SUB-SKILL superpowers:subagent-driven-development or superpowers:executing-plans. GitHub source/credential-free Actions only; no local clone/build/dependencies.
+
+**Goal:** Determine and qualify whether the explicit incoming-signal opt-in fixes the proven receiver cancellation gap in new finite candidates.
+**Architecture:** Only candidate compatibility flags change, before Plan/capsule creation. Historical closed rollback configurations stay pinned and unchanged; native both-end observation decides whether the proposal qualifies.
+**Tech Stack:** ESM/Node22, exact profile templates/JSON, existing native Worker→DO fixture, GitHub Actions.
+**Spec:** docs/superpowers/specs/2026-11-04-finite-request-signal-opt-in.md
+
+## Global Constraints
+- Source/tests only; no remote profile edit/deployment, Entry, schema, permission, token, OAuth/OTP, cron, Max or other-project action.
+- QA flags exactly nodejs_compat+enable_request_signal; M exactly nodejs_compat+global_fetch_strictly_public+enable_request_signal; both dates2026-09-07.
+- No request_signal_passthrough, new binding exception, permissive old-or-new profile, timer reset or cancellation RPC.
+- Original2607/c570/QA_CLOUD_CLOSED_PINS and historical hashes byte-identical; candidate change is before capsule sealing, not a phase mutation.
+- Receiver abort plus denied real guard is required; sender rejection alone never qualifies. Unsuccessful proposal is reported unqualified and candidate flag changes restored.
+- All producer/mounts stay absent, operationalReadiness=false/completePackage=false/PCoff=false.
+
+## Review Focus
+- Opt-in might affect only one native leg; observe actual receiver while held and before its guard, not only sender error.
+- Old rollback configuration must not be reinterpreted through new candidate template.
+- A phase change must not silently remove the new flag or expand its three-setting allowance.
+- A canceled read may remain physically pending; keep original retained work through settlement.
+- Exact source compilation must use new config and finite entry rather than a legacy standalone bundle.
+
+### Task1: Qualify exact incoming-signal candidate profiles
+
+**Files:**
+- Modify lib/mcp-qa-finite-profile.mjs templates AND configs for both finite roles.
+- Modify wrangler.independent-closure-qa.finite.jsonc and wrangler.mcp-own.finite.jsonc.
+- Modify focused native conduit/config/connection-profile/bootstrap/initial-upload/historical tests only where exact candidate expectations change.
+- No production wire/SDK/owner/alarm/cleanup implementation changes.
+
+**Interfaces:** Existing finite profile/compiler/upload/qualification APIs unchanged. New flags are exact source DATA bound before initial upload. Reuse actual native conduit fixture after Unit2b.1 acceptance; do not copy a substitute engine/receiver or add test-only production flag override.
+
+- [ ] Step1: Record actualBASE after previous unit accepted. Add selected positive native receiver-abort assertion and exact candidate flag assertions; run causalRED against old profiles (actualfalse/wrongflags), not a missingmodule or root harness timeout.
+- [ ] Step2: Apply only exact candidate flags to templates/configs/JSON; preserve dates/bindings/historical source/pins. Keep explicit forwarded signal unchanged.
+- [ ] Step3: Run selected native both-end case. Require receiver.signal.aborted while held and translated lease denial after release; verify pending503/no business marker and retention through actual settlement. If it fails, revert candidate flag edits, preserve evidence, report unqualified and stop this proposal without another speculative fix.
+- [ ] Step4: Run scoped exact profile/bootstrap/connection phases/initialupload/historical regressions and original boundary/retention cases affected by the configuration. Assert missing/extra/wrong flags fail, historical pins unchanged, no phase allowance widened.
+- [ ] Step5: Run lint and ONE actual finite compiler at exact sourceHEAD; preserve original guard/limits and source/bootstrap/residency commitments. Report precise module hashes applicable only to thatHEAD.
+- [ ] Step6: Remove qualifier, self-review fullBASE..codeHEAD and report docs/superpowers/reports/2026-11-04-finite-request-signal-opt-in.md. Independent task review before next integration; no runtime action or positive producer follows.
+
+## Root preflight
+Selected by focused architect source check at9fcd63d. Existing consumers already derive/qualify candidate flags and historical-source hardchecks remain separate; do not broaden them. Root self-review maps every spec requirement and ReviewFocus to Task1, no undefined neighboring APIs. Start only after Unit2b.1 cleanreview; original-profile observed false is a concrete new concern justifying targeted native repeat. No human design decision needed. Rollback source unit only. Successful config/native qualification is a prerequisite, not the complete PC-off circuit.

~~~~~~~~~~

## docs/superpowers/plans/2026-11-04-owner-request-retention.md

~~~~~~~~~~diff
diff --git a/docs/superpowers/plans/2026-11-04-owner-request-retention.md b/docs/superpowers/plans/2026-11-04-owner-request-retention.md
--- /dev/null
+++ b/docs/superpowers/plans/2026-11-04-owner-request-retention.md
@@ -0,0 +1,45 @@
+# Native Owner Request Retention Implementation Plan
+
+> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans to implement this plan task-by-task. Execute cloud-first; no local clones/builds/dependencies.
+
+**Goal:** Retain the original private owner request and every actual pending operation through genuine stage handoff without granting authority from bookkeeping.
+**Architecture:** Add non-authorizing request scope and genuine lease ancestry to existing helpers. Reuse that same scope for fixed factual reads and actual consumed owner admission, preserving strict standalone readonly behavior. Keep actual host approvals pending until cleanup handoff.
+**Tech Stack:** ESM/Node22, Cloudflare Workerd/Miniflare native fixtures, AsyncLocalStorage/WeakMaps, GitHubActions.
+**Spec:** docs/superpowers/specs/2026-11-04-owner-request-retention.md
+
+## Global Constraints
+- Source only, existing source/forward/native mounts unavailable; no real Entry/permission/provider/deploy.
+- Same original <=30s parent, <=5s children, no clock restart; actual pending work retained through cancellation/settlement.
+- Bookkeeping is not authorization; genuine one-use consumeFiniteOwnerStageAdmission remains mandatory.
+- No readonly-to-owner conversion, source ceiling/I0/C0/C1/T0 changes, or generic user-supplied callbacks/flags/targets.
+- No approval POST/ticket consumption on actual host until separately qualified cleanup; no separate consuming PC-on trial.
+
+## Review Focus
+- Late body cancellation starting after the last tracked read settles must not open a registry gap: Task1 native deferred-body regression.
+- Caller-shaped or descendant leases must not silently become new request roots: Task1 lineage/remaining-budget and foreign clone tests.
+- A repeated admission can change bookkeeping only after genuine consumption; no second effect: Task1 actual transport replay/DTO tests.
+- Nested factual read must borrow only its actual request's bookkeeping, not another actor request: Task1 native overlap tests.
+- Existing Workflow/setup parents and B1/readonly retain compatibility: Task1 focused original consumer/scope groups.
+
+### Task 1: Original request retention and explicit handoff
+
+**Files:**
+- Modify lib/mcp-qa-finite-stage-work.mjs (request scope, fixed factual borrowing, explicit handoff).
+- Modify lib/mcp-qa-finite-owner-preparation.mjs (genuine root/child/proof ancestry, full body cancellation retention).
+- Modify lib/mcp-qa-finite-owner-http.mjs (actual entry bookkeeping and pending approval view).
+- Modify lib/mcp-qa-finite-policy-transport.mjs (owner branch adopts only after existing genuine consumer).
+- Modify lib/mcp-qa-finite-initial-owner-source.mjs (genuine ancestry/borrowed factual read, no fresh clock).
+- Test new test/mcp-qa-finite-owner-request-retention-native.test.mjs and scoped helper tests as necessary.
+- Preserve existing fixtures; extend their test-only native entry minimally. Modify test/mcp-qa-finite-initial-owner-source-native.test.mjs to isolate owner rejection Minor.
+- Existing branch qualifier may run focused covering cases only; exclude before finalmainpromotion.
+
+**Interfaces:**
+Consumes createFiniteOwnerRequestLease, prepareFiniteOwnerChoice, consumeFiniteOwnerStageAdmission and existing owner/readonly scope APIs. Produces observeFiniteOwnerRequestWork({ctx,env,originalLease},operation), readFiniteOwnerRequestContext(lease)->{root,deadline}, fixed factual borrowing and explicit adoptFiniteOwnerRequestStageWork after the genuine consumer. Existing public signatures remain compatible; private lineage is never an effect permit.
+
+- [ ] Write native REDs for actual pre-admission pending storage and streamed body cancellation, plus genuine handoff; assert zero late provider effects and blocked conflicting scope.
+- [ ] Run only new causal cases first in credential-free Actions; confirm actual logs/head/failure, not stale queued labels. Never repeat a completed occurrence for metadata delay.
+- [ ] Implement root/descendant tracking and bookkeeping helpers, then full body work retention and same-entry handoff, with no callback/flag authorization shortcuts.
+- [ ] Wrap actual unmounted host entry and pending GET/POST behavior; keep source/forward/mount unavailable. Exercise underlying prepare/transport through native internal fixture, not a production bypass.
+- [ ] Add ancestry/remaining5s budget, abort, holders, foreign scope/lease, admission replay, readonly exclusion and standalone/nested factual-reader cases; correct independent ownership denial.
+- [ ] Run new focused native tests plus affected owner preparation/transport, initial factual source/scope/custody and necessary B1 compatibility groups; run lint and changed graph compiler if imported bundle graph changes. Once these pass, do not broaden/repeat absent a new change/failure/concern.
+- [ ] Commit with expectedSHA lease and self-review exact diff. Report docs/superpowers/reports/2026-11-04-owner-request-retention.md with BASE/codeHEAD/REDGREEN/runs/commands/output and remaining gates; fresh task review follows.

~~~~~~~~~~

## docs/superpowers/plans/2026-11-04-preparation-cleanup-enrollment.md

~~~~~~~~~~diff
diff --git a/docs/superpowers/plans/2026-11-04-preparation-cleanup-enrollment.md b/docs/superpowers/plans/2026-11-04-preparation-cleanup-enrollment.md
--- /dev/null
+++ b/docs/superpowers/plans/2026-11-04-preparation-cleanup-enrollment.md
@@ -0,0 +1,50 @@
+# Preparatory cleanup enrollment and fence — implementation plan
+
+> For agentic workers: REQUIRED SUB-SKILL superpowers:subagent-driven-development or superpowers:executing-plans. Cloud-first GitHub source/Actions; no local clone/dependencies/build.
+
+**Goal:** Enroll the exact original preparatory cleanup obligation after genuine owner admission while retaining a hard no-SEND boundary.
+**Architecture:** Pure bounded records and one fixed native factual reader support a private transport enroller and the existing alarm owner. No enrollment grants authority; actual host/routes/forwards remain unavailable.
+**Tech Stack:** ESM/Node22, native Workerd/Miniflare SQLite/D1, existing lease/retention/admission modules, GitHub Actions.
+**Spec:** docs/superpowers/specs/2026-11-04-preparation-cleanup-enrollment.md
+
+## Global Constraints
+- Source only; no real Entry/provider/credentials/permission/deploy/OAuth/cron/Max.
+- Same original request <=30000ms and children <=5000ms; actual pending work retained through settlement, no clock/admission reconstruction.
+- Exact admitted preconnectionId==capsule originalM selector; no dual-ID mapping or fresh occurrence.
+- Enrollment/ACK are DATA; mandatory genuine one-use consumer and same-entry adoption remain; successful enrollment still admin_pending before policy SEND/provider POST.
+- One original alarm/Plan/State/C0/C1, no reset/second delivery budget; expired source ceiling unchanged.
+- Actual host pending/unmounted, source/forwards unavailable; no caller/env readiness bypass.
+
+## Review Focus
+- ACK held after actual enrollment commit must block conflicting scopes and all SEND; native hold/release test in Task1.
+- Recovery state may advance from zero while capsule/ArmAck stay committed to original zero; reconstruction test in Task1.
+- Existing identical Enrollment is not a resumed admission or readiness; replay/unknown transaction tests in Task1.
+- Random generic ownerGET selector is not originalM; exactpositive internal fixture and mismatchednegative in Task1.
+- No newly unreachable publication segment or copied test production engine; explicit owner outcome narrowing, separate setup regression in Task1.
+
+### Task 1: Fixed enrollment, native obligation and closed transport consumer
+
+**Files:**
+- Create lib/mcp-qa-finite-preparation-cleanup-records.mjs.
+- Create lib/mcp-qa-finite-preparation-cleanup.mjs.
+- Modify lib/mcp-qa-finite-policy-transport.mjs (private consumed-admission enroller, explicit pending boundary; keep separate setup engine).
+- Modify lib/mcp-qa-finite-initial-cleanup.mjs (fixed original owner reads enrollment, same alarm/recovery).
+- Tests new test/mcp-qa-finite-preparation-cleanup-records.test.mjs and test/mcp-qa-finite-preparation-cleanup-native.test.mjs.
+- Minimal native fixture extensions test/fixtures/finite-initial-entry-world.mjs and existing owner/connection fixtures; adapt affected owner/connection/transport tests to new closed outcome. No production bypass.
+- Extract shared initial-anchor reader only if duplication would otherwise require it; preserve factual owner source and its tests.
+- Temporary credential-free qualifier allowed only in feature branch, remove before final delivery.
+
+**Interfaces:** Consume existing real consumeFiniteOwnerStageAdmission/adoptFiniteOwnerRequestStageWork, captured originalLease, strict initial capsule/cleanup/material/preparation codecs and actual store APIs. Produce exact codec exports and fixed readPrivateQaFinitePreparationCleanup({ctx,env},originalLease) from spec. Enrollment writer remains PRIVATE to createFinitePolicyTransport.run; no external enroller/readiness token/callback.
+
+- [ ] Write strict codec and native causal REDs first: actual consumed stage currently lacks Enrollment; owner flow must become pending/ceroPOST; actual initial reconstruction must preserve original cleanup with enrolled facts.
+- [ ] Run only new causal groups first via Node22 credential-free Actions. Record actual head/job/output failure, not queued labels. No rerun to compensate metadata lag.
+- [ ] Implement exact schemas/prefix/hash/limits and fixed actual anchor reader with guarded retained work, no new source authority.
+- [ ] Implement private enroller after unchanged genuine consumer + same-entry adoption; actual transaction/sync/readback/alarm/ACK; strict selector equality and no existing enrollment.
+- [ ] Return bounded pending before any SEND/POST and remove unreachable old owner SEND segment; keep shared fixed engine/separate setup intact.
+- [ ] Integrate fixed factual read into existing initial alarm; original zero-state commitment vs current recovery State, noAck recovery of exact closed_ui, orphan/foreign/effect/HEAD refusal.
+- [ ] Cover spec acceptance1–7, including post-native-commit hold (not tx-interior deadlock), pending actual I/O exclusion, native reconstruction/manual event label and immutable old rows.
+- [ ] Run scoped new/affected tests plus existing initial cleanup/owner retention/factual source and necessary separate setup/B1 groups; scoped lint. One final actual changed-graph compiler/residency build, preserving existing size ceilings and no compiler/fs runtime import.
+- [ ] Self-review full recorded taskBASE..codeHEAD, commit with expectedSHA, remove qualifier. Write docs/superpowers/reports/2026-11-04-preparation-cleanup-enrollment.md with exact source range/commands/results/hashes/warnings/limitations and bindings/clock invariants. Fresh task review required before next implementation.
+
+## Root preflight
+Existing request-retention task accepted8241213398f3acee3c58d6667ab7cdb255588dc2; no active implementation writer. Builder BUILDABLE with exact-selector and pending-transport rulings incorporated. Architecture and schema choices fixed in spec, no user decision missing. Durable task report/GitHub history replace local skill workspace scripts per cloud-first instruction. Baseline for actual implementation is the spec/plan commit, to be recorded before dispatch. No runtime source eligibility by this plan.

~~~~~~~~~~

## docs/superpowers/plans/2026-11-04-preparatory-issuer-fence.md

~~~~~~~~~~diff
diff --git a/docs/superpowers/plans/2026-11-04-preparatory-issuer-fence.md b/docs/superpowers/plans/2026-11-04-preparatory-issuer-fence.md
--- /dev/null
+++ b/docs/superpowers/plans/2026-11-04-preparatory-issuer-fence.md
@@ -0,0 +1,48 @@
+# Preparatory issuer fence and grant-only cleanup — Unit 2a plan
+
+> For agentic workers: REQUIRED SUB-SKILL superpowers:subagent-driven-development or superpowers:executing-plans. GitHub source/credential-free Actions only, no local clone/build/dependencies.
+
+**Goal:** Provide the fixed unmounted journal/SQL primitives that can fence an exact original issuer and revoke its reserved read grant before notice consent exists.
+**Architecture:** One monotonic D1 tombstone and private actual-result witnesses preserve statement ordering without business authority from DATA. Separate SDK/native/notice composition remains pending.
+**Tech Stack:** ESM/Node22, actual Miniflare D1/DO, SQLite prepared statements/triggers, existing lease/retention, GitHub Actions.
+**Spec:** docs/superpowers/specs/2026-11-04-preparatory-issuer-fence.md
+
+## Global Constraints
+- Source/schema FILE only; no remoteDDL/provider/Entry/deploy/secret/permission/OAuth/OTP/cron/Max.
+- UNMOUNTED fixedQA components, no serialized caller claims/hash/DTO as owner permission; ordinary APIs unchanged/no fallback.
+- Original30s request/5s children/forwardC0/cleanupC1/sourceceiling untouched; table terminal closure may reduce earlier but timing requires actual fixed current owner, not table data.
+- DB execution time fences each mutating statement; canonical ISO fields vs INTEGERms explicit; no JS-now fallback or production clock injection.
+- Confirm exact serialized primary fence before originalUUID lookup/revocation/absence; no fabricatednotice, broadscope, newgrantID, retry/resume or timestamp rewrite.
+- Actual consumption/barrier/observation objects are nonreconstructable fixed continuation facts, not approval tokens; pending actual I/O retained until settlement.
+
+## Review Focus
+- Closed-first tombstone cannot be reopened by delayed original OPEN: native both-order test.
+- Reserved consumedAt before expiry cannot authorize actual late SQL: native expiryqueue test.
+- Barrier ACK unknown cannot become absence from a row scan: exactprimaryreconcile/foreignID test.
+- Table>=initialC0 would block earlier nominalcleanup: storage earlierclosure test paired with still-unmounted source timing gate (no public schedule).
+- SDK/source provenance cannot be inferred from component data: tests/report labels and no new worker/forward mounts.
+
+### Task 1: Fixed records, journal, monotonic schema and SQL component
+**Files:**
+- Create db/finite-preparation-issuer-fences.sql.
+- Create lib/mcp-qa-finite-preparation-issuer-records.mjs.
+- Create lib/mcp-qa-finite-preparation-issuer-journal.mjs.
+- Create lib/mcp-qa-finite-preparation-issuer-store.mjs.
+- Modify existing initial cleanup only for conservative refusal on unresolved issuer prefix; no owner/mount/generic dispatcher.
+- Test new test/mcp-qa-finite-preparation-issuer-{records,native}.test.mjs and minimal nativefixture; preserve existing ordinary store/owner behavior.
+
+**Interfaces:** Exact record kinds/identity/prefix and createFinitePreparationIssuerJournal({ctx,env}) / createFinitePreparationIssuerStore({ctx,env}) fixed methods are in spec. Store consumes original guarded lease and fixed typed DATA, not arbitrary db/now/query/callback. Same actual result objects retain the live SQL continuation; serialized receipts/history cannot issue another grant.
+
+- [ ] Write native/schema/codec RED cases for missing monotonic fence/actual late deadline/no-notice exact recovery; identify new-interface absence explicitly and exclude fixture parse failures.
+- [ ] Run targeted causal cases in credential-free Node22 Actions; record exact head/job/output. Put scoped lint before long native groups; avoid binding a local variable named module (Next lint). After causal RED, cheap source/graph/schema preflight should precede broad native regression to fail fast without repeating passed groups.
+- [ ] Implement strict codecs and fixed native append-once journal with actual commit/sync/readback, retained I/O and no reconstructed issuing continuation.
+- [ ] Implement source-only table and no-delete/identity/terminal triggers; exact schema/clock preflight. Do NOT install remotely or change ordinary schema/store semantics.
+- [ ] Implement fixed OPEN/consent/consume/grant SQL joins and private one-use actual consume witness; DBnow expires/deadlines and original UUID.
+- [ ] Implement terminal closed-first barrier, exact fresh-primary reconciliation and factual barrier/observation witnesses; exact grant-only revocation preserving history/exchanged_at.
+- [ ] Add initial alarm fail-closed gate for unresolved issuer-prefix, preserving Unit1 no-issuer recovery.
+- [ ] Cover spec1–8 with actual D1 queue order/heldACK/expiry/foreign tests and separately labeled capsule-correlation proof; no fake production clock or missing-cookie fallback.
+- [ ] Run scoped tests+ordinary store/initial cleanup/Unit1 regressions and lint. One changed-graph compiler only when justified, no broadened repeats.
+- [ ] Self-review full taskBASE..codeHEAD; remove temporary qualifier; report docs/superpowers/reports/2026-11-04-preparatory-issuer-fence.md with schema/source hashes, exact tests/warnings/limits and next Unit2b actualcomposition. Fresh task review before next implementation.
+
+## Root preflight / activation status
+Unit1 source accepted after independent SpecPass/QualityApproved (acceptance committed alongside this spec/plan). Actual implementation BASE is this spec/plan commit and will be recorded in the root ledger before dispatch. Corrected architecture8e06dae and independent builder rulings incorporated: serverDBfencedAt, canonicalISO/DBexpiry, monotonic storage allowing qualified earlier futurehandoff, fresh first-primary readback. User ordinary technical delegation applies; no missing human design decision. Source/live readiness remains false; no current runtime schema presumed installed.

~~~~~~~~~~
