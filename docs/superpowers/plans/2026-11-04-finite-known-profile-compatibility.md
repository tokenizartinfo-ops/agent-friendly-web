# Fixed Finite Known Profile Compatibility Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: use superpowers:executing-plans for the already assigned source implementer; no additional delegation is authorized by this plan. Steps use checkbox syntax. This is a plan, not permission to resume the held writer; root review/activation comes first.

**Goal:** Carry the exact finite signal-opt-in candidate through strict hashing, named validation and the complete existing Known cancellation lifecycle while preserving the positive legacy path.

**Architecture:** Fixed finite exports wrap shared private implementations in existing modules. Only the new Known entry is publicly exported from runtime; its Workflow and Operator stages stay private and select fixed finite observer/reservation adapters. Explicit historical rollback roles remain legacy.

**Tech Stack:** ESM, Node22, esbuild, isolated Miniflare/Workflow/D1, existing credential-free GitHub Actions source qualifier.

**Spec:** docs/superpowers/specs/2026-11-04-finite-known-profile-compatibility.md

## Global Constraints

- Inspected source bd923bab7225212e35e054b14c132de78195ec5e / tree b6fd94de88c796d5c8708b815b8db4e9595b6f92. Before source work, verify actual feature head; a later docs-only head may differ. Do not attribute this design's source observations to a moving branch.
- QA date2026-09-07 flags exactly ["nodejs_compat","enable_request_signal"]; M date2026-09-07 flags exactly ["nodejs_compat","global_fetch_strictly_public","enable_request_signal"]. Legacy M pair and digests unchanged.
- No exported strategy/hash callback, old-or-new fallback, compatibility normalization, new approval/token/DTO authority, native mount or business producer.
- All18 hooks, exact primary grant/history/identity, original70s parent, existing5s/20s children, actual cancellation/retention and one-use/no-replay semantics remain.
- Source ceiling2026-11-03T02:59:00Z expired; operationalReadiness=false; completePackage=false; PCoff=false.
- No provider/runtime writes, Entry/DDL/credentials/permissions/OAuth/OTP/cron/Max, new budget, generic outbound, other-project work or reserved occurrence consumption.
- Historic2607/c570 modules/configurations and QA_CLOUD_CLOSED_PINS byte-identical. No old sealed record/Plan/capsule rewrite.
- All verification below runs in authorized credential-free cloud source CI; no local clones/builds/dependencies. Reuse the held implementer's qualifier, restore its own scoped source test stages as needed, and remove it before delivery. No dispatch or test was performed while writing this plan.

## Review Focus

1. Nested revalidation can silently select legacy after a finite entry succeeds: Task2 must reach actual positive finite reservation, not only a bundle unit test.
2. Metadata extraction can reject old rollback before role selection: Task3 tests both sides of readVersion and SetupContext, including swapped roles.
3. Shared refactoring can leave legacy rejection tests green while destroying successful lifecycle: Task2 preserves and runs the original positive native builder suite.
4. Test-source aliases and instrumentation anchors can hide the real path: Task2 has an untouched actual core native positive plus a separate observation-only18-hook witness; Task3 source spy remains only a handoff test.
5. Final build provenance, pending physical settlement or unresolved initial-upload timeout can be overstated: Task3 records terminal targeted results, checks unchanged retention and compiles the final exact source once.

## Checkpoint1: Strict fixed candidate primitives

**Files**
- Modify lib/mcp-activation-observer.mjs.
- Modify lib/mcp-release-operator-policy.mjs.
- Create test/mcp-finite-activation-compatibility.test.mjs.
- Create test/mcp-finite-named-activation.test.mjs.
- Preserve/run test/mcp-activation-observer.test.mjs and test/mcp-named-activation.test.mjs.

**Interfaces produced**
- finiteActivationConfigurationHash(value) -> string.
- createFiniteActivationObserver(options={}) -> async (input,signal) -> existing observation.
- validateFiniteReleaseOperatorBundle(bundle) -> true, confirm_named only.
- resolveFiniteNamedActivationPlan(bundle,namespace) -> frozen {plan,current}.
- validateFiniteNamedCancellationHistory(bundle,raw) -> true.
- Exact option fields/results and fixed flag arrays are defined in the spec; no optional profile field.

- [ ] Add failing cases named legacy_pair_digest_and_positive_observer_preserved, finite_triple_hashes_actual_flags, profiles_reject_each_other, exact_flags_date_and_plain_data, finite_observer_checks_approved_and_observed_profile, finite_named_plan_and_history_positive, finite_bundle_requires_confirm_named, finite_private_binding_and_current_grant_correlated. Use the existing legacy fixtures as unchanged originals; build a separate candidate copy before hashing. Independently compute the canonical SHA-256 expected value from a fixed literal seven-field fixture with sorted bindings and actual flags. Record the legacy golden from the old implementation before refactoring and require exact equality afterwards. Assert input not mutated; reject old/new cross-use, missing/extra/wrong/reordered flags/date, accessor without invocation and secret content.
- [ ] In cloud run node --test test/mcp-finite-activation-compatibility.test.mjs test/mcp-finite-named-activation.test.mjs; expect missing fixed exports/candidate rejection RED. Preserve that causal result, not a harness timeout.
- [ ] Extract private snapshot/hash/observer bodies with module-owned exact flag selection; keep the canonical function and all existing validation byte-for-byte in meaning. Add the two fixed activation exports. Approved configuration and observed metadata use the same selected hash. No new exported implementation.
- [ ] Extract private policy bundle/resolver/history bodies. Existing exports use old hash and existing operation range. New finite exports use the candidate hash and require confirm_named before nested manifest validation. Keep current target, artifact size/hash, exact fields, named bindings, identity, scope, window and current-grant checks.
- [ ] Run node --test test/mcp-finite-activation-compatibility.test.mjs test/mcp-finite-named-activation.test.mjs test/mcp-activation-observer.test.mjs test/mcp-named-activation.test.mjs. Expect all selected assertions PASS, zero skips/cancellations. Run lint before the checkpoint acceptance; retain existing warnings.
- [ ] Commit the strict primitive unit with exact CI head/run/job/attempt. Stop for its source review checkpoint. This is a prerequisite only; do not report the finite path fixed.

## Checkpoint2: One shared lifecycle with fixed finite entry

**Files**
- Modify lib/mcp-release-runtime.mjs and lib/mcp-release-successor-reservation.mjs.
- Modify test/fixtures/named-confirmation-native-rehearsal.mjs to share its existing private test composition with a separately named finite entry.
- Create test/mcp-release-finite-known-cancellation.test.mjs and test/mcp-release-finite-known-cancellation-native.test.mjs.
- Modify only source/export anchors needed in test/mcp-release-known-cancellation.test.mjs; retain every existing semantic assertion.
- Test existing test/mcp-release-known-cancellation-native.test.mjs, test/mcp-release-reservation-native.test.mjs, test/mcp-release-workflow-native.test.mjs and test/mcp-release-runtime-native.test.mjs.

**Consumes** Checkpoint1 fixed exports.

**Produces**
- runFiniteKnownCancellationReleaseWorkflow(options) -> Promise<existing Known outcome>, exact {bundle,env,event,step}.
- reserveFiniteReleaseSuccessor(options={}) -> Promise<existing reservation result>, same option keys as legacy reserveReleaseSuccessor.
- PRIVATE runKnownCancellationReleaseWorkflowImpl(profile,options), runReleaseWorkflowImpl(profile,options), runReleaseOperatorImpl(profile,bundle,env,args,lease,observation,authorize,cancellationHistory).
- Test-only rehearseExactFiniteNamedConfirmation({artifact,mode='confirmed',payloadMode='object',retirement='stopped',replay=false,fault=null,nativeFault=null,measure=false,replayExpected='uncertain',witness=false}) -> existing rehearsal result. Finite fixture fixes reserve='true', historyMode='known_cancellation', invocation='workflow'; it exposes no profile/hash/authorizer override. Existing rehearseExactNamedConfirmation(options) stays compatible.

- [ ] Add finite cross-profile entry rejection, exact-four-fields admission, forged/copied/retired lease denial, complete primary history, non-reentrant18-hook and original deadline tests. Factor test-only scenario helpers where useful; do not replace the legacy cases. The runtime export assertion becomes the existing three names plus runFiniteKnownCancellationReleaseWorkflow and still rejects a lease mint, registry or public core.
- [ ] Add an untouched actual finite-core native positive and separate observation-only18-hook witness. The fixed test builder compiles a test-only WorkflowEntrypoint named AfwReleaseWorkflow which forwards exactly {bundle,env:this.env,event,step} into the real finite Known export, with default fetch404. Use existing real isolated D1/native Workflow and custody DO fixture. Set finite operator compatibility to exact QA pair and identity/custody Worker to exact M triple; configure candidate metadata/hash to exact triple. Do not pass through the legacy buildMcpReleaseOperator validator. This is an unmounted test wrapper, not a product entry.
- [ ] Refactor the existing rehearsal into a private fixed legacy/finite helper in the same fixture file. Legacy mode preserves its original builder argument, flags, RPC caller and history defaults. The new fixed finite wrapper supplies its own private builder, omits the legacy RPC caller/service binding, and uses native Workflow only. Keep knownCancellationNativeHarness and observation instrumentation test-only. witness=true adds observations to the real private authorize closure; untouched positive remains separate.
- [ ] Assert finite confirmed result, mayRetry=false, operationalReadiness=false, journals {attempts:1,receipts:1,acceptances:1}, reservationCount1, prepared/mayBoot=false, six primary projections, all18 distinct hook names, unchanged immutable history, exact native Date/event identity/payload and elapsed original budget. Negative cases: missing/expired current grant, identity mismatch, extra cancellation, queue/projection deadline => blocked and zero provider/credential/journal effects; revoke-prewrite/postwrite => uncertain with preserved activation history and reservation count0/1; foreign reservation race, lost ACK, late outer step and restart => no second row/effect, no late confirmed. Existing native fault helpers stay synthetic and must not become production options.
- [ ] Run the two new files with node --test; expect failure before finite implementation. Do not replace a failing positive with blocked/pending.
- [ ] Introduce private frozen LEGACY_RELEASE and FINITE_RELEASE selections in runtime using only fixed imports. Move current bodies without changing guard/order/clock logic; public legacy wrappers select LEGACY_RELEASE and new finite Known selects FINITE_RELEASE. Carry the same selection through Known -> Workflow -> Operator. Preserve private WeakSet lease issuance before first await, original options field validation and registry deletion on settlement.
- [ ] In successor reservation share its existing body behind two fixed wrappers. Each local strategy fixes bundle/history/resolver; runtime's finite strategy references finite observer and finite reservation. Keep createActivationJournal, createSuccessorReservation, eligibility SQL, retirement evidence, provider readers, finite gate and effect order unchanged.
- [ ] Update the legacy white-box closure harness anchor for the private Workflow call. Capture a test-local closure bound to the selected profile for retired/copied lease checks; never export that closure from product. Keep the18-hook, concurrent reentry, expired and missing primary assertions. Adjust instrumented compiled-source anchors to the single shared authorize closure; do not instrument the untouched native positive.
- [ ] Cloud validation, separately attributable groups:
  - node --test test/mcp-release-finite-known-cancellation.test.mjs test/mcp-release-known-cancellation.test.mjs
  - node --test --test-concurrency=1 test/mcp-release-finite-known-cancellation-native.test.mjs test/mcp-release-known-cancellation-native.test.mjs test/mcp-release-reservation-native.test.mjs test/mcp-release-workflow-native.test.mjs test/mcp-release-runtime-native.test.mjs
  Require PASS with original positive legacy cases still present and successful, not just negative admission cases. Run lint first; preserve exact source/run/job/attempt and distinction between actual native mechanics and SYN provider/custody.
- [ ] Commit/review the lifecycle unit. No native mount or production builder modification. Do not claim C2/source integration or package readiness.

## Checkpoint3: Explicit finite roles and complete source qualification

**Files**
- Modify lib/mcp-qa-finite-initial-owner-source.mjs, lib/mcp-qa-finite-preparation-cleanup.mjs, lib/mcp-qa-finite-policy-setup.mjs, lib/mcp-qa-finite-policy-transport.mjs, lib/mcp-qa-finite-preparation-records.mjs, lib/mcp-qa-finite-profile.mjs, lib/mcp-qa-finite-confirmation.mjs.
- Modify focused existing tests: test/mcp-qa-finite-profile.test.mjs, test/mcp-qa-finite-preparation-records.test.mjs, test/mcp-qa-finite-policy-transport.test.mjs, test/mcp-qa-finite-policy-setup-native.test.mjs, test/mcp-qa-finite-confirmation-native.test.mjs and affected finite source fixtures only.
- Test existing connection, initial-owner-source, preparation-cleanup, initial-upload, phase/bootstrap/historical, original native cancellation/retention files listed below.
- No edit to lib/mcp-qa-finite-confirmation-source.mjs, historical files/pins, production bridge/receiver/retention, native mounts or clock algorithms.

**Consumes** All fixed interfaces from Checkpoints1-2.

**Produces** Existing public finite APIs unchanged, with correct fixed candidate consumers and explicitly historical rollback validation. Descriptor string becomes finiteActivationConfigurationHash; QA remains null.

- [ ] Add mixed_role_setup_context_roundtrip (candidate baseline + historical rollback succeeds; both swapped roles fail), read_version_current_candidate_and_historical_rollback (both actual and expected configs validated by trusted role), wrong_role_denied_before_mutation (zero writes/effects), candidate_private_projection_full_hash and finite_confirmation_handoff_fixed_entry cases. Public projection equality must not hide a changed full candidate hash; invalid private manifest still fails finite bundle validation. Keep the historical digest assertions in separate legacy cases; remove historicalActivation normalization as the mechanism for qualifying new candidate behavior.
- [ ] Run those focused files to establish the actual compatibility RED at consumer boundaries. Keep old pending/uninstalled-source negative tests. No public factory gets a role or injected hash argument.
- [ ] Apply the spec consumer map exactly. In policy-setup retain the legacy publish-only validator at old line75. In policy-transport use candidate-only configuration(value) and private historicalConfiguration(value); readVersion's existing closed argument chooses the exact projection/hash for BOTH metadata and pin. Candidate wire remains candidate-only. Keep qualifyFiniteWorkerVersion and restoration hash checks intact.
- [ ] Split SetupContext baseline/rollback checks by property name. Use finite bundle/resolver/history in candidate installation/confirmation. Switch confirmation's Known call without altering event/env/step identity, number of keys, clock, source reread, result or provenance checks. Update the test spy export name and candidate fixture hash; do not stub the actual native lifecycle tests from Checkpoint2.
- [ ] Update finite candidate fixtures to the fixed hash only where their data is a new candidate; preserve old rollback configurations. Preserve template/config flags already qualified by the preceding opt-in work. Do not edit historical2607/c570 files or recompute historical pins.
- [ ] Run lint; run bounded cloud groups with exact head attribution and isolate initial-upload from other native files:
  - node --test test/mcp-qa-finite-profile.test.mjs test/mcp-qa-finite-preparation-records.test.mjs test/mcp-qa-finite-policy-transport.test.mjs
  - node --test --test-concurrency=1 test/mcp-qa-finite-policy-setup-native.test.mjs test/mcp-qa-finite-connection-preparation-native.test.mjs test/mcp-qa-finite-initial-owner-source-native.test.mjs test/mcp-qa-finite-preparation-cleanup-native.test.mjs test/mcp-qa-finite-confirmation-native.test.mjs
  - node --test test/mcp-qa-finite-initial-upload-native.test.mjs
  - node --test --test-concurrency=1 test/mcp-qa-finite-profile-native.test.mjs test/mcp-qa-finite-phase-inventory.test.mjs test/mcp-qa-finite-bootstrap-native.test.mjs test/mcp-qa-finite-historical-source-native.test.mjs
  - node --test --test-concurrency=1 test/mcp-qa-finite-owner-native-conduit-native.test.mjs test/mcp-qa-finite-owner-request-retention.test.mjs test/mcp-qa-finite-owner-request-retention-native.test.mjs
  The last group is affected-source regression, not another flag experiment. Preserve receiver-aborted held/before-guard observations and retained pending work through actual settlement. Require terminal PASS, zero unexpected skips/cancellations; the existing initial-upload timeout is unresolved until diagnosed, not waived by this plan. No product timer/budget increase or unrelated HTTP-engine fix.
- [ ] Compare exact Git blob IDs against aed54dab and sourceBASE for lib/mcp-qa-finite-historical-source.mjs, lib/mcp-qa-cloud-closed-pins.mjs, worker/independent-closure/closed-rollback.mjs, worker/mcp-own/closed-rollback.mjs, wrangler.independent-closure-qa.rollback.jsonc, scripts/mcp-confirmation-frozen-artifact.json and scripts/mcp-qa-legacy-historical-context.json. Require equality and inspect full source diff for any historical pin/config mutation.
- [ ] After final source edits, run ONE actual compileFiniteNativeStaging({cwd:process.cwd(),sourceRevision:process.env.GITHUB_SHA}) in the authorized qualifier. Log only sourceRevision/tree and module metadata/public hashes; do not log private bundle/material, candidate bytes or secrets. Require source/template/entry/bootstrap/residency guards and M<=2097152 / QA<=3145728 bytes without relaxing limits. The exact codeHEAD must be committed and clean. No complete-package/deployment claim.
- [ ] Remove the temporary qualifier before delivery. This administrative removal is a later source revision: report the exact compiler head and subsequent diff, never attach its module hashes to a later head. If removal changes compiler-bound workflow input, compile the final intended source in the established bounded CI mechanism rather than claim equivalence. Avoid an endless documentation rebuild: reportHEAD is documentation only and explicitly distinct.
- [ ] Write final implementation report docs/superpowers/reports/2026-11-04-finite-request-signal-opt-in.md with expanded file map, root ruling/design, BASE/codeHEAD/reportHEAD, all run/job/attempt/counts, preserved failures/timeout disposition, legacy positive and finite actual lifecycle outcomes, SYN limits, historical blob equality, final compile metadata and remaining C2/unmounted/expired-source limitations. Fresh independent source review before root composition; no PR/merge/deploy by this plan.

## Self-review and handoff

Spec interfaces match task outputs; every consumer and mixed role is assigned to Checkpoint3. All18 hooks, primary authority and original clock behavior are exercised by Checkpoint2, actual native cancellation/retention by Checkpoint3. The five Review Focus cases map to explicit tests. Existing positive legacy lifecycle remains a required gate. No undefined production type, new native source/mount, generic callback or human design choice is required.

Next action after root acceptance: activate the existing held implementer for Checkpoint1 on the current verified source branch, carrying this spec and plan plus the original opt-in report. Continue checkpoints only with their evidence/review gates; no runtime action follows source acceptance.
