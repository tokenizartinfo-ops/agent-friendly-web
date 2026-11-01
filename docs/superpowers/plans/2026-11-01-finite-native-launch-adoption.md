# Finite Native Launch and Adoption Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans task-by-task; root owns SDD dispatch/review. Do not spawn agents independently. Checkboxes track implementation, not runtime activation.

**Goal:** Implement three Native5 source primitives for one delayed nominal Workflow without REST creation or fabricated authority.

**Architecture:** A fixed DO owns source-qualified control, coordinator and durable child-create SEND; a separate Bootstrap launcher sleeps and invokes that DO. Missing C2 factories stay unavailable, while actual primitives/native paths are testable. Preserve independent observer/finalizer and C0 guard.

**Tech Stack:** Node22 ESM, existing workerd/Workflow/DO/D1 fixtures and GitHub Actions; no new dependency.

**Spec:** [accepted Native5 design](../specs/2026-11-01-finite-native-launch-adoption-design.md). Source interfaces inspected at a776e115c2e3682f1620a6e54a758a3c77a16b94; execution baseline is root's qualified post4C1 source, never this older docs-branch tree.

## Global constraints

- Order:4C1 compiler -> Native5 tasks1–3 ->4C2 actual material mount ->4C3 full route. publicStatic v2/historical pins belong4C1; privateCanaryConfiguration tuple/full bundle belongsC2. Do not impersonate those producers.
- Cloud-only source work; no runtime/provider/private probes, publication, live command, credentials/scopes, permanent scheduler, alternate actor, history reset, replay or local dependencies/build. operationalReadiness=false.
- Original T0: armAckBy+90000, launchAt+150000,lastCreateAt+160000,N1+300000,C0+240000,C1+420000,R1+480000. Original70s/5s/20s; no new per-helper lifetime. No DO start alarm.
- Exact native event/sole nominal payload; runKnownCancellationReleaseWorkflow({bundle,env,event,step}) remains four arguments/18 stages. No synthetic timestamp.
- Never-created nominal remains admin-pending; no new cleanup proof union. Both restores require nominal/launcher terminal and settled writers; observer exception remains exact.
- Preserve actual GHA seed/adoption separation and dated-static custody assumptions. Owner-declared shutdown and cloud timestamps are distinct; no PC-off claim before complete source/CI/promotion/current preflight/consent/receiver gates and timely ARM.
- Each task: hosted RED/GREEN/scoped lint, exact revision/run/jobs/counts/report, commit then root review. No whole-CI repeat or4A re-review.

## Canonical additions and internal boundaries

Choose ONCE: private plan top-level launchPolicy EXACT {armAckBy,launchAt,lastCreateAt}; workflows EXACT {confirmation,bootstrap,launcher}. External technical projection carries the same launchPolicy/workflows. Derive all three times from T0 and launcher ID exactly as design. Existing intent/control hash ALGORITHMS/domains stay unchanged; future unspent plan bytes/hashes change. Reject missing/extra/tampered timing fields; no reinterpretation of stored legacy records.

lib/mcp-qa-finite-launch-records.mjs produces finiteLauncherInstanceId({intentId,sourceRevision}), validateFiniteLaunchPolicy({T0,launchPolicy}), and validateFiniteLaunchPrepared(value), validateFiniteChildCreateSend(value), validateFiniteChildCreateAck(value), and hashFiniteLaunchRecord(value) ->64hex. New-record hashing is domain=record.purpose plus newline plus canonical ASCII-key-sorted JSON; reject other purposes. Prepared purpose=afw.qa-finite-launch-prepared.v1; SEND/ACK purposes remain exact design values. Exact record fields are in the accepted design; the Task1 brief repeats them for isolated execution. Fixed keys: afw.qa-finite-child-create.v1:<intentId>:prepared, :send, :ack; immutable append-only records. SEND is distinct from Task1 nominal permission claim.

ParentBudget is INTERNAL {check,signal,deadline}; check returns current wall time and rejects expiry/clock reversal. Create it once at native operation entry BEFORE hydration, bounded by original5s and the narrower operation/consent end; pass it unchanged through hydration, queue, reads, transactions and effect awaits. Later Workflow wake creates a distinct actual invocation under original absolute launch bounds, never extends an earlier invocation. Existing control gets now=parent.check and timeoutMs<=remaining at construction; its per-method timer cannot extend parent. Guard now uses the same check.

Add internal readPrivateQaFiniteControlSnapshot({storage,nativePin,plan,parent}) in trial-control: reuse existing strict plan/state/legacy decoding and nativePin WeakMap; read actual storage only, compute canonical references even before HEAD exists, report true missing rows without inventing armed/persisted control. No control.read call, callbacks returning truth, caller phase or mutation. A private invocation context retains decoded source/plan/native lineage and coordinator; source-only constructor receives actual ctx/env via fixed C2 resolver, never caller JSON.

C2 seam: resolvePrivateQaFiniteLaunchContext({ctx,env,refs,parent}) in a fixed source module, default unavailable until C2 installs real composition. No runtime registration/public success DTO. Its qualified private context is retained in module WeakMaps; methods receive references only. Tests substitute external provenance boundary at compile-time and exercise real constructors/storage/decoders, explicitly SYNTHETIC; no production bypass.

## Review focus

1. Preview before HEAD and prepare's inventory await must neither invent stored state nor reenter control.read (Task1).
2. SEND commit after timeout, with provider404, cannot refund/resend (Task2).
3. Coordinator held across outer prepare would deadlock its own reader (Task1/2).
4. Durable sleep replay and late native event cannot refresh lease (Task3).
5. Workflow ctx cannot impersonate DO ctx/storage or fixed source provenance (Task2/3).

## Task1 — canonical launch records, coordinator and actual absence observation

**Files:** create lib/mcp-qa-finite-launch-records.mjs and lib/mcp-qa-finite-launch-inventory.mjs; modify trial-control, external-contract, finite-evidence and fixed-terminal-workflows for these exact contracts; tests test/mcp-qa-finite-launch-records.test.mjs, test/mcp-qa-finite-launch-inventory-native.test.mjs.

**Interfaces:** createPrivateQaFiniteLaunchInventory({ctx,env,context,parent}) -> {observeBeforeCreation()}; context is the qualified private source context above, not an accepted DTO. Returns internal invocation-bound discriminant never_issued/issued/unavailable with exact design hashes. The inventory validator consumes it synchronously through this source-owned operation, not from public input. Preview/arm/prelaunch selection derives from actual decoded storage, current time, never caller strings.

- [ ] Write strict field/hash/timing tests and true before-HEAD absence. Exercise actual DO storage/native pin and full provider inventory with synthetic provenance; missing source, foreign head, pending writes, caller DTO, existing SEND/ACK and missing provider pages deny.
- [ ] Write nested prepare->primary inventory test that completes WITHOUT control.read reentry. Concurrent SEND waits behind the bounded inventory coordinator, then rechecks clocks/state. Outer prepare never owns that lock. Snapshot1->full inventory->snapshot2 equality->synchronous consumption must be real, not mocked booleans.
- [ ] RED: node --test test/mcp-qa-finite-launch-records.test.mjs test/mcp-qa-finite-launch-inventory-native.test.mjs test/mcp-qa-finite-trial-control-native.test.mjs.
- [ ] Implement exact codecs, read-only snapshot and private source coordinator (one per actual DO context via WeakMap). Same coordinator must gate ALL SEND transitions. Decode existing legacy/control rows using original checks; no new alternate actor/key to bypass first HEAD. Unknown source coverage remains unavailable.
- [ ] GREEN exact command plus affected external-contract/phase fixtures; scoped lint; commit report docs/superpowers/reports/2026-11-01-finite-native-launch-task1.md. C2 default seam remains unavailable; primitive positive cases must use real source/storage path under explicit synthetic boundaries.

## Task2 — fixed DO prepare/claim and unique native child create

**Files:** create lib/mcp-qa-finite-launch.mjs; modify worker/independent-closure/index.mjs DO methods only and narrow shared context plumbing; tests test/mcp-qa-finite-launch-native.test.mjs.

**Interfaces:** runPrivateQaFiniteLaunchOperation({ctx,env,operation,refs,parent}) is source-internal with fixed operation dispatch; RPC methods prepareFiniteNominalLaunch({intentId,sourceRevision}), createFiniteNominalChild({intentId,controlHash}), readFiniteNominalLaunch({intentId,controlHash}) validate exact arity/fields. ctx MUST be this.ctx of IndependentClosure. Caller cannot supply operation/source/context/binding. Read returns facts, not authority.

- [ ] Test real control.prepare -> guard.arm/readback -> NEW control.claimEffect('nominal') on SAME object; guard.arm currently never calls prepare. Cover90s boundary, unknown prepare/receipt ACK, reconstruction, old head, altered seed/readiness/consent/pin and Workflow-context misuse.
- [ ] Test actual transaction+storage SEND, independent readback, one native binding create with exact ID/payload. Cover149999/150000/160000, clock expiry after EVERY await, lost/late transaction/create ACK, duplicate ID, reconstructed callers/provider404, queued coordinator and held remote create. Unknown creates remain separate native-create writers.
- [ ] RED: node --test test/mcp-qa-finite-launch-native.test.mjs test/mcp-qa-finite-launch-inventory-native.test.mjs test/mcp-qa-finite-trial-guard.test.mjs test/mcp-finite-nominal-control.test.mjs.
- [ ] Implement DO fixed mounts and live shared-parent budget before source hydration. Persist/read prepared only after same-object claim and C0 guard ACK. Source context resolves actual AFW_QA_NAMED_CONFIRMATION and fixed target metadata. Atomically append SEND; only NEW acknowledged transaction yields process-local once-send capability. Recheck parent before native create; never retry outstanding native call.
- [ ] Append ACK only for actual matching timely create response; existing/unknown journal is GET-only. Read-only reconciliation never overwrites SEND/ACK, synthesizes termination or invokes create. Preserve guard alarm and independent cleanup.
- [ ] GREEN same command, scoped lint, commit report docs/superpowers/reports/2026-11-01-finite-native-launch-task2.md. No binding/config deployment; missing actual C2 context stays unavailable.

## Task3 — real Bootstrap sleep and original nominal entry/inventory integration

**Files:** create lib/mcp-qa-finite-launcher.mjs and lib/mcp-qa-finite-confirmation.mjs; modify Bootstrap/NamedConfirmation mounts, exact phase inventory consumers and closed-compatibility tests. Do not alter accepted business wrapper implementation.
**Interfaces:** runPrivateQaFiniteLauncher({env,event,step}) and runPrivateQaFiniteConfirmation({env,event,step}); both source-selected only. Bootstrap operation finite_nominal_launcher, payload EXACT {operation,intentId,sourceRevision}; uses fixed namespace RPC, never Workflow ctx as storage. Nominal entry consumes C2's source-qualified original bundle, never caller policy.

- [ ] Test actual exported Workflow under workerd: exact seed/ready prerequisites; prepare step success by90s; finite-launch-prepare/create retries0; sleepUntil absolute150s; replays do not repeat effects; no missing-seed polling, start alarm or GHA REST create.
- [ ] Test nominal original event creation interval[150000,160000]+T0, wrong/future timestamp/payload/ID/source, delayed provider acceptance, queue exceeding70s and held5s/20s child boundaries. Spy only to assert SAME event reference/four keys; accepted wrapper tests verify18 original stages and cancellation behavior. Add bounded outer provenance result without mutating inner result.
- [ ] Test full phase inventory: true source never-issued permits prelaunch absence; SEND+absence unresolved; exact launcher/observer only; both restores require nominal AND launcher terminal, QA additionally observer complete. Never-created stays admin-pending. Held D1/process/native-create writers block; all binding holders and create paths must route through journal/coordinator.
- [ ] RED/GREEN: node --test test/mcp-qa-finite-launcher-native.test.mjs test/mcp-qa-finite-confirmation-native.test.mjs test/mcp-qa-finite-launch-inventory-native.test.mjs test/mcp-release-known-cancellation.test.mjs test/mcp-qa-finite-observer-native.test.mjs test/mcp-qa-finite-read-rpc-native.test.mjs.
- [ ] Implement exact class dispatch and fixed source C2 context consumption; propagate original nominal parent lease across hydration before calling the unchanged wrapper. Extend provider status handling conservatively: queued/unknown/late create are unresolved, not terminal. Preserve old closed routes and rollback denial.
- [ ] GREEN/scoped lint, report docs/superpowers/reports/2026-11-01-finite-native-launch-task3.md and ledger; commit and root review. Actual C2 attachment/private bundle/profile/full route and provider acceptance remain pending.

## Self-review / handoff

All three tasks own meaningful native behavior; default missing C2 semantics are an honest installation gate, not permission to replace implementation with throw-only stubs. Root preflights before dispatch and reviews composition; read current C1 interfaces without overwriting its work.
