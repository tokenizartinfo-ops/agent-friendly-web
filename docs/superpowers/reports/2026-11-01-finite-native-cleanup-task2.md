# Finite native cleanup — Task2 source report
2026-11-01 · operationalReadiness=false

## Review identity and result
Repository: tokenizartinfo-ops/agent-friendly-web. Branch: feat/finite-native-cleanup-20261101.
Assigned BASE: 5feb4e9110b3f2afdfe1cada745460182626a526.
Final code: fa087bde941638b2a3584172ab07911b75b93124.
Exact-code Actions: [41323580857](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/41323580857) / [job124898739889](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/41323580857/job/124898739889): 415 PASS, 0 FAIL, 0 SKIP; expanded scoped ESLint clean.
This is source qualification only. Root independent review and later integrated whole-branch CI remain required. No intermediate merge, runtime activation, live trial, remote DDL, new token/grant/custody or local source/dependency/build occurred. All edits used GitHub tree/commit/ref with expected-head leases; all executions were GitHub Actions. No child agents were used.

Task1 root acceptance is appended to the progress ledger: code3b11c580, Actions41315740901/job124875264618,146PASS, original P2 late cleanup-claim ACK ADDRESSED and zero remaining on scoped rereview. Existing Task1 report and historical uncertainty are preserved.

## Implemented behavior
The fixed QA actor optionally dispatches an existing finite head to the new finite guard. Missing compiled native factory is admin-pending; absence of a finite head preserves legacy fixed-actor behavior. Default HTTP and unrelated actors remain closed. State, effects, retained proof and completion each use separate versioned finite namespaces; legacy issued/complete/absent/absent records are not renamed, deleted, promoted to new claims or reset.

The guard persists recovery before effects, withdraws nominal authority independently, and composes permissions-only withdrawal, historical close, irrevocable admission seal, proof capture and canary restoration. Original C0/C1/R1 and at most three deliveries survive reconstruction. On-time recovery slots are C0, C0+60s, C0+120s, within C1=C0+180s; late slots use max(now+1s, original slot), capped at C1-1ms. Third-delivery exhaustion is durable before effects. Each alarm is bounded by 30s and original C1; subordinate request leases remain <=5s where applicable, with parent continuation assertions after awaits. Unknown issued actions only reconcile; they never resend close/restore, renew clocks or refund nominal authority.

Native reservation, custody admission and successor launch now consume the fixed candidate gate before any possible send. Reservation has a private actual-namespace client and two fixed RPCs; the public known-cancellation workflow remains {bundle,env,event,step}, with original event and stage/deadline contract unchanged. A finite host requires successor composition, preventing a direct original-launch bypass. A fully settled admission may reuse only existing read-only readiness; unresolved, sealed or failed custody never restarts. Native gate ownership and exact container/grant/trial scope are checked independently of mere capability shape.

Every begin requires a fresh fixed nominal-control view: exact source/runtime/actor/intent/control/plan, existing durable nominal issued claim and digest, armed/not-withdrawn status, original current consent, and minimum original claim/N1/consent deadline throughout awaits. The view permits children under the existing claim after nominalEligible is spent, without issuing another claim. Initial prepare and new nominal claim retain global-zero quiescence. The optional fixed readPrimary.nominal child producer must supply a complete inventory, actual native journal and at most three exact owned writers. Identity, actor, kind, claim hash, phase, counter membership and inventory/journal hashes are validated; any extra, different or unknown writer denies. Candidate begin independently matches that owned set against its own journal before its transaction writes. No whole-actor or counter-only exclusion exists.

Native cleanup reads actual DB/namespace/ctx and Worker version provenance. Seal is exactly {intentId,planHash}, without a premature challenge. GET-only readiness waits for writer settlement/provider stop before spending the sole native proof challenge. Then original native/first-primary/all-state provider observations produce either retired_process with genuine existing retirement handoff, or sealed_without_admission with irreversible seal, no admission/launch and fully resolved issued writers. These are separate unions, not a fabricated physicalStop flag. evidenceHash binds proofChallenge, sealHash and complete bounded support. A race or lost proof ACK after capture remains consumed/uncertain.

The QA store captures once, validates, retains immutable proof/support and independently reads them before any restore POST. Exact proof-head and retained-record methods permit two factual consumers; separate canary_restore and qa_restore effect claims remain mandatory. The completion receipt is immutable and validated against the settled withdrawal/close/seal/canary restoration journals and original effect claims. It means exact canary readback plus settled cleanup only; observer terminal, QA restoration and GHA completion remain separate. Former live canary source/version are retained provenance, never a demand to invoke the old observer after rollback.

Native permission reduction uses the existing permissions-only primitive and a new read-only observer sharing its exact primary predicates. It separately journals withdraw and close before one business send. Actual Worker historical close supplies the original scoped runtime/custody close callback. A close receipt is retained only after that bounded actual ACK; a NULL closure or provider absence never fabricates it. First cleanup after N1 is supported under original C1, without renewing OAuth/consent or normalizing live flags. Missing close ACK remains pending across reconstruction, even when a stop request was physically sent.

The finite canary restorer reuses the existing bounded allowlisted transport through a finite-only policy extension. It independently reads retained proof, exact current canary/operator pointers, actual approved closed/live module bytes and configuration, fresh first-primary/provider state, all fixed workflow definitions/instances and empty schedules/tails. Only the plan's closed canary target can be POSTed, once, with issued/send journal and exact final readback. Unknown POST ACK permits GET reconciliation only. The exact expected bootstrap observer may remain active during canary restoration, nominal must already be terminal, and observer must be complete before QA restoration; no entire Workflow definition is excluded.

## Dependency corrections and binding contracts
All five plan deployment pins now include module {name,sha256,bytes}; QA/canary live hashes bind their distinct existing source tuples. The explicit canonical afw.finite-cleanup-policy.v1 grammar derives from the immutable plan and hashes to closePolicyHash. Native permissions require canonical actual withdrawal-policy JSON whose hash equals withdrawalPolicyHash, exact original scope/consent/program/actor and C0/C1. No historical raw policy is interpreted as new authority.

resources.applicationId is corrected from the impossible UUID fixture assumption to strict 32-hex, matching existing RELEASE_TARGET and root's independent fixed Containers GET evidence. D1 IDs remain UUID; namespaceId remains 32-hex. No resource or runtime changed.

Pending-first prepare now persists INFO/control/C0 before the first finalizer-ready check, with independent readback and fresh ready before ARM. Missing first ready leaves uncertain pending and durable cleanup. Automatic cleanup starts only from durable pending/armed. Pre-arm deployment/setup remains operator-attended, not PC-off eligible; external resource/custody pre-admission must precede activation. Missing qualified control/proof stays admin-pending; no pre-arm initializer or fabricated no-admission union was added.

AFW_FINITE_TRIAL_VERSION is a NEW required real version_metadata binding on the finite canary, explicitly absent from the inspected closed profile. Task4 supplies it with actual approved artifact bytes, exact native bindings and source constructors. Native fixtures declare synthetic version values and do not prove real provenance/availability. Factory results are branded to the actual ctx/env pair.

Private producer/mount contracts:
- createFiniteOwnNativeCleanupHost receives fixed actual ctx/env/control/source plus fixed primary/provider/custody/nominal adapters; Task4 supplies the compiled factory. The real Worker passes nativeCleanup {program,programSourceRevision,close} from its historical host.
- Fixed candidate RPCs: beginFiniteTrialReservation, settleFiniteTrialReservation, readFiniteTrialAdmissionJournal, withdrawFiniteTrialPermissions, closeFiniteTrial, readFiniteTrialReductionReceipts each take {intentId,controlHash}; sealFiniteTrialAdmission/readFiniteTrialCleanupReadiness take {intentId,planHash}; observeFiniteTrialCleanup additionally requires proofChallenge. No callback/kind/writer facts cross RPC.
- Fixed QA RPCs: readFiniteTrialNominalControl and readFiniteTrialCleanupProofHead take {intentId,controlHash}; readRetainedFiniteCleanupProof takes {intentId,proofHash}; readFiniteTrialCleanupCompletion takes {intentId,controlHash,proofHash}. Exact own-field grammar is checked before adding actual storage; caller storage/extra fields are rejected. Closed compatible reconstruction preserves documentary reads without reopening native authority.
- createPrivateQaFiniteTrialGuard uses fixed identity/readPrimary/withdraw/close/seal/proof/canary_restore capabilities. Action execute/reconcile and proof.read receive a second INTERNAL parent assertion; actual adapters must retain it. createPrivateQaFiniteCanaryRestorer, the collector, native gate and reduction propagate their applicable parent/original leases.
- Task4 must produce complete qualified containment/current primary and exact owned-writer inventories from actual bindings. Supplied hashes/booleans alone are not an operational producer. All factories remain uninstalled in default source profiles.

## Verification and RED/GREEN evidence
Commands are preserved in the branch-only temporary qualifier. Final per-group counts: gate/nominal18, proof10, retained/guard/readiness11, native gate+reduction2 (multiple reconstruction/race branches), finite restorer12, actual writer hooks40, Task1 focused57, native control/fixed RPC3, nearby ledger/execution89, expanded native/legacy restoration173. Total415. No skipped or failing tests. Synthetic providers/custody/runtime-stop callbacks are explicitly labeled; actual workerd DO SQLite, D1 tables/constraints and native Worker methods are used where stated.

Selected TDD checkpoints (all on this branch):
| Requirement | RED evidence | GREEN evidence |
| --- | --- | --- |
| Durable finite writer gate | d13db1ed /41316288703/job124876931764 |98699ab6 /41316431159 |
| Actual reservation/admission/launch hooks |8f640f4e /41316587134/job124877816149,3 intended failures |ac4ad33a /41316704480 |
| Discriminated proof validator |47e03552 /41316892932/job124878729300 |5c6a887e /41317026938 |
| Explicit module/policy grammar |0cb46706 /41317345070/job124880085628 |3fbd20cf /41317620946 |
| Retention and durable guard |eee5e9fa /41317754434/job124881311423; substantive225f8486 /41318004217 |44bca115 /41318384361 |
| Pending before first ready |6dcf74c8 /41318476522/job124883469264 |d8e4cc72 /41318610656 |
| Readiness before once challenge |38422c7b /41319732098/job124887173968 |dbd22d45 /41319853762 |
| Native proof/finite restoration |084462ae /41320311095/job124888889432 |d4a941f7 /41320517627/job124889507687 |
| Mandatory nominal claim/consent |c8c83748 /41321024044/job124891071248 |7ecac98e /41321161025 |
| Actual post-N1 reduction |63d5b92d /41322406175/job124895218999 |b4acd00a /41322562650/job124895692339,412PASS |
| Settled custody read-only reuse |3a964e98 /41322873959/job124896620091 |a5ef5595 /41322978611/job124896930850,413PASS |
| Narrower actual Task1 claim |630b7ea3 /41323511136/job124898528439 |fa087bde941638b2a3584172ab07911b75b93124 /41323580857/job124898739889 |
| Exact native retained-read RPC shape |2d3ddd7b /41323249270/job124897740455 |fa087bde941638b2a3584172ab07911b75b93124 /41323580857/job124898739889 |

The native fixture initially needed esbuild's existing module/main resolution setting for the OAuth dependency; this was a fixture build correction, not a production dependency change. Delayed-stop fixture timestamps were refreshed rather than accepting stale proof. Readback canonical key order and pinned callback identity were corrected before green. The final qualifier broadens only to nearby affected paths, not a full suite per iteration; root owns later integrated full CI.

## Self-review and remaining limits
Self-review traced actual reservation INSERT, custody admission INSERT, launch claim/runtime send, historical close, permissions-only primary predicates, retained proof, restoration POST and completed receipt. Fixes include exact gate scope/ctx branding, no direct finite original-launch path, pending-first readiness, once-only challenge after readiness, challenge/seal digest binding, <=5s proof freshness at capture, parent lease propagation, complete-journal receipt correlation, exact owned child writers, settled readiness reuse and strict fixed-RPC input shape. Root interim source inspection also identified and corrected an over-strict equality that rejected narrower actual Task1 nominal claims; the exact stored claim now permits issuedAt < deadline <= the original planned bound, and the gate never extends that narrower deadline. No code review agent was spawned; independent review remains root-owned.

Non-atomic remote/D1 writes can still leave admin-pending. The seal never claims atomic remote cancellation. A native close ACK lost before receipt retention remains unresolved, even if a synthetic stop callback ran. Readiness is only a wait hint and cannot eliminate the final capture race. Late alarm time and original C1 can leave insufficient observation time; there is no retry/reset/extended SLA. The first finite head remains consumed permanently; no repeatable lifecycle or extra successor trial is authorized.

Task3 must implement the actual external finalizer, exact precreated bootstrap observer/terminal output and bounded transport/credential identity. Its accepted preview ruling breaks the ready/controlHash cycle using {operation,intentId,sourceRevision} and a read-only native first-step material receipt; this report/spec records the ruling but Task2 does not implement it. Task4 must mount actual profile/resolver/delivery, deny legacy delivery before host access, preserve the original runtime contract and package real compatible closed artifacts/bindings. Current Workflow POST401/code10000 remains an actual promotion gate; token metadata and source CI do not prove permission, custody or autonomous initiation.

Exclude .github/workflows/finite-task1-temporary-qualifier.yml from eventual integration. It is source-only scaffolding, not the finalizer. Source rollback is revert only; no history/reset or remote rollback was performed. operationalReadiness=false.


## Task2 review fix round 1 — finite nominal continuation deadline
2026-11-01 UTC. This appendix supersedes the initial code identity above for the scoped fix; it preserves that earlier qualification as history.

FIX_BASE: `340aca28d86bd4609fb0f077842f515b06ebf69a`.
Final fix code: `75c71b2394c44e880b3238c4866136b707158315`.
Exact-code Actions: [41325873588](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/41325873588) / [job124905564368](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/41325873588/job/124905564368): **78 PASS, 0 FAIL, 0 SKIP** (72 focused and 6 affected native tests); scoped ESLint clean.

### Finding and implementation
Assigned finding: **[P2] Preserve the finite nominal deadline beyond beginLaunch() — lib/mcp-successor-launch-gate.mjs:29.** The begin hook had checked only status, while the durable writer claim carried N1 and subsequent child checks retained broader manifest/candidate expiry. A valid begin immediately before narrower D could therefore continue into a later business effect after D.

The candidate gate now persists the effective minimum of its original N1, exact existing nominal claim deadline and observed current consent expiry in each issued writer claim. The claim is immutable; reconstruction, child-primary validation and cleanup-proof validation accept only a bounded deadline strictly after issuance and no later than the original applicable bound. This is a narrowing of existing authority, never a renewed nominal claim.

The shared private `retainFiniteWriterDeadline(gate, claim, kind, now, until)` validates the module-branded gate, exact identity/kind/claim shape and original bounds, then returns an immutable `{deadline,assertCurrent}`. Reservation and successor launch retain that lease through their existing checks, after awaits and immediately before business sends. Their primary SQL predicates also use the retained deadline, while original row identity/manifest expiry commitments remain unchanged. Launch does not accept a late ACK as success or settle its finite journal after D.

Custody retains the same lease in an invocation-local AsyncLocalStorage context covering its nested admission, persistence and runtime helpers. This avoids mutable constructor-global authority and keeps concurrent/independent cleanup outside the nominal lease. Admission's primary SQL time predicate is narrowed too. Nominal durable writes and runtime sends check the lease immediately before and after awaits. Existing best-effort failure close exits the nominal context; independent close and fixed immutable settlement keep their original cleanup authority. No public constructor flag, caller authority callback, fifth wrapper argument or RPC payload extension was added.

### RED / GREEN evidence
- Tests-only `37d88301b8af1d598a3f6c4f39f8f70227c648e2`, Actions41325432765/job124904258877: 67 PASS / 4 FAIL. The new actual custody and reservation continuations crossed D and still emitted a launch/INSERT. The first launch assertion counted repeated deployment reads before checking the business call, so the next tests-only checkpoint made that assertion direct.
- Tests-only `ba992668481de930afbd7222602ff707eb073100`, [Actions41325554517/job124904625120](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/41325554517/job/124904625120): 67 PASS / 4 FAIL against unchanged production FIX_BASE. The four failures were the actual Task1 narrowed claim still returning N1, custody launch count 1 instead of 0 after D, successor runtime launch count 1 instead of 0 after a held deployment read, and reservation row count 1 instead of 0.
- First implementation `54f11e3bd943f2fb495945c9e352a527e544ee07`, Actions41325748276/job124905202083: 70 PASS / 2 FAIL. Both remaining failures were fixture clock inconsistencies: the positive custody fixture used Date.now in the gate but Date.now-minus-one-second in custody; the reservation SQLite override had arity zero and did not replace the two-argument built-in. Final code aligns the synthetic clocks and declares the exact SQL clock arity; production checks were not relaxed. It also rejects an invalid initial continuation clock.
- Final exact code/run above: 72 focused + 6 native PASS, zero failures/skips. The broader Task2 415-test checkpoint remains historical; this round intentionally ran only covering and affected native checks.

Commands and outputs:

```text
node --test --test-reporter=spec test/mcp-own-finite-admission-gate.test.mjs test/mcp-finite-nominal-control.test.mjs test/mcp-own-finite-cleanup-proof.test.mjs test/mcp-node-process-custody.test.mjs test/mcp-successor-launch-gate.test.mjs test/mcp-successor-reservation.test.mjs
tests 72; pass 72; fail 0; cancelled 0; skipped 0

node --test --test-reporter=spec test/mcp-own-finite-cleanup-native.test.mjs test/mcp-own-finite-reduction-native.test.mjs test/mcp-own-worker-historical-close.test.mjs test/mcp-invocation-storage-native.test.mjs
tests 6; pass 6; fail 0; cancelled 0; skipped 0

npx eslint lib/mcp-own-finite-admission-gate.mjs lib/mcp-own-finite-cleanup-proof.mjs lib/mcp-finite-child-primary.mjs lib/mcp-node-process-custody.mjs lib/mcp-successor-launch-gate.mjs lib/mcp-successor-reservation.mjs test/fixtures/finite-admission-gate.mjs test/mcp-finite-nominal-control.test.mjs test/mcp-node-process-custody.test.mjs test/mcp-successor-launch-gate.test.mjs test/mcp-successor-reservation.test.mjs
exit 0; no ESLint findings
```

Covering cases include held deployment, retirement, primary-ACK and queued-primary-send launch continuations; queued reservation SQL at exact D; custody admission read held across D followed by usable independent close; the actual Task1 narrower claim's retained deadline; narrow claim reconstruction and settlement after D under C1; and cleanup-proof acceptance of genuinely settled narrower claims. Native workerd/DO/D1 fixtures confirm the affected source consumers and historical cleanup still load and execute. Provider/custody inputs and clocks in source fixtures remain explicitly synthetic; no real physical stop or profile activation is inferred.

### Requested doc-only consistency correction
The earlier spec's Root execution ruling sentence now explicitly states observer payload `{operation,intentId,sourceRevision}`, with the native read-only material-preview first step deriving plan/control references and original clocks. Successful first-step output supplies those references for admit-and-ready before prepare. This aligns the older sentence with the already accepted later Task2/3 ruling; no observer behavior or Task3 implementation was added.

### Scoped self-review and remaining boundary
Implementation addresses the assigned P2; independent scoped rereview remains root-owned and pending, not self-approved. Self-review checked all three begin consumers, SQL time fences versus immutable row identity, settled/read-only reconstruction, bound equality, legacy absence of finiteGate, key clearing and separate cleanup authority. Captured D never renews after awaits or on a later read.

A write or launch emitted before D can still have an unknown/lost/late ACK; these changes do not atomically cancel cross-DO/D1/provider effects. Its fixed issued record remains consumed and unresolved until exact read-only settlement is available. No replay, history erasure, deadline extension or false physical-stop proof is introduced. Operational readiness, Task3/4 factory/profile/credential qualification and the Workflow POST401 promotion gate remain unchanged. All edits used leased GitHub tree/commit/ref; tests ran in GitHub Actions. No local source/dependencies/build, child agent, runtime action, new credentials/grants, remote schema or trial occurred. The branch-only temporary qualifier must still be excluded from eventual integration. Source rollback is revert only. operationalReadiness=false.
