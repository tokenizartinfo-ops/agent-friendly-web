# Checkpoint 2 brief — fixed finite Known lifecycle

Implement ONLY Checkpoint2 below, not Checkpoint3 or the blocked parent opt-in task. Read this first as the exact task requirements. Root supplies the actual BASE containing this brief. Primitives from Checkpoint1 are independently accepted; their fixed APIs are present in the same source branch. One product writer at a time. GitHub source and credential-free Actions only; no local clone/build/dependencies or remote effects.

## Global Constraints

- Inspected source bd923bab7225212e35e054b14c132de78195ec5e / tree b6fd94de88c796d5c8708b815b8db4e9595b6f92. Before source work, verify actual feature head; a later docs-only head may differ. Do not attribute this design's source observations to a moving branch.
- QA date2026-09-07 flags exactly ["nodejs_compat","enable_request_signal"]; M date2026-09-07 flags exactly ["nodejs_compat","global_fetch_strictly_public","enable_request_signal"]. Legacy M pair and digests unchanged.
- No exported strategy/hash callback, old-or-new fallback, compatibility normalization, new approval/token/DTO authority, native mount or business producer.
- All18 hooks, exact primary grant/history/identity, original70s parent, existing5s/20s children, actual cancellation/retention and one-use/no-replay semantics remain.
- Source ceiling2026-11-03T02:59:00Z expired; operationalReadiness=false; completePackage=false; PCoff=false.
- No provider/runtime writes, Entry/DDL/credentials/permissions/OAuth/OTP/cron/Max, new budget, generic outbound, other-project work or reserved occurrence consumption.
- Historic2607/c570 modules/configurations and QA_CLOUD_CLOSED_PINS byte-identical. No old sealed record/Plan/capsule rewrite.
- All verification below runs in authorized credential-free cloud source CI; no local clones/builds/dependencies. Reuse the held implementer's qualifier, restore its own scoped source test stages as needed, and remove it before delivery. No dispatch or test was performed while writing this plan.


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


## Preserved invariants

- All18 Known hooks: workflow_admission; operator_credential; operator_primary_read; operator_primary_result; activation_before_read; activation_after_read; activation_before_attempt; activation_after_attempt; activation_before_receipt; activation_after_receipt; activation_before_acceptance; activation_complete; successor_rpc; successor_rpc_complete; successor_before_retirement; successor_after_retirement; successor_before_write; successor_after_write.
- Original event.timestamp+70000 parent ceiling, source window, monotonic narrowing, hydration/primary/provider/retirement5s children and activation20s child. No fresh parent, Date.now offset, replacement budget, retry, cancellation RPC or deadline-only substitute.
- Two matching first-primary snapshots, current exact grant and monitoring consent, complete unfiltered cancellation history, original identity and namespace drift checks, non-reentrant authorization, original one-use/no-replay semantics.
- Actual native admission/cancellation/retention remain: sender503 is not physical completion; retained read/fetch/body/cancellation stays occupied through actual settlement. No production bridge/receiver/retention algorithm edit.
- Existing RELEASE_TARGET, fixed URLs/resource scope and guarded effect order remain. No general outbound, new approval/token/DTO authority, provider write, Entry/DDL/permission/credential/OAuth/OTP/cron/Max, new native mount, producer or other-project changes.
- Three mutable phase settings and all physical/secret bindings unchanged. Full prearm and closed_ui/read_consent/notice_consent keep exact candidate flags.
- lib/mcp-qa-finite-historical-source.mjs, lib/mcp-qa-cloud-closed-pins.mjs, worker/independent-closure/closed-rollback.mjs, worker/mcp-own/closed-rollback.mjs and original2607/c570 configuration artifacts/pins remain byte-identical to aed54dab and the inspected baseline.
- Source ceiling2026-11-03T02:59:00Z remains expired. operationalReadiness=false; completePackage=false; PCoff=false. No reset or use of the reserved occurrence.


## Handoff

Full report path: docs/superpowers/reports/2026-11-04-finite-known-profile-c2.md. Record exact BASE/code/report HEAD, causal RED/GREEN, commands/run/job/attempt/counts/warnings, actual native mechanics versus SYN provider/custody/identity fixtures and unchanged legacy positive coverage. Remove your own qualifier only; parent opt-in qualifier stays untouched. No self-acceptance or reviewer dispatch. No full final compiler required here unless a concrete graph concern appears; final compatibility compiler belongs to Checkpoint3. Root fresh independent review must accept this checkpoint before role integration. Existing current source C2/material provider remains unavailable; do not replace it or claim a mounted complete finite workflow.
