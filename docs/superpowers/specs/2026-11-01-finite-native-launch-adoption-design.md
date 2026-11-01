# Finite native launch and observer adoption
2026-11-01 · AFW · DESIGN ONLY · operationalReadiness=false

Isolated design baseline9304b0b066f32340e21be0331fc1f6628029631a; branch design/finite-native-launch-20261101. This is a future4C/Task5 contract, not installed capability or authorization to run it. Active Task4B branch is untouched. Read together with [material bootstrap correction](2026-11-01-finite-material-bootstrap-correction.md). No product code, CI, provider calls, new secret/scope, permanent scheduler or real occurrence is created by this document.

## Decision and fixed clocks

Use ONE additional instance/operation of existing PrivateQaBootstrap, separate from the exact cleanup observer. The launcher calls the fixed IndependentClosure actor, sleeps durably, then asks that actor to create the exact PrivateQaNamedConfirmation through a qualified native Workflow binding. GHA adopts observer/proofs through GET only; it never creates a Workflow by REST. Account-role expansion is not part of this path.

All times derive from authenticated original T0; no caller dates:
- armAckBy=T0+90000, launchAt=T0+150000, lastCreateAt=T0+160000.
- N1=T0+300000, C0=T0+240000, C1=T0+420000, R1=T0+480000 unchanged.
- Successful native prepare response, its durable readback and launcher first-step acknowledgement must be observed by armAckBy. This is stricter than existing180000ms minimum nominal margin.
- No child-create send before launchAt; the send and its awaited checks must occur before lastCreateAt. Actual nominal event.timestamp must be in [launchAt,lastCreateAt]. No extension after queueing/sleep/reconstruction.

There are at least60seconds between timely ARM acknowledgement and earliest nominal creation. This is cloud-clock arithmetic, not a guarantee of human notification or physical shutdown. Root must also observe the timely receipt before asking the owner to shut down. A late human handoff does not shift launchAt or certify PC-off; existing cleanup remains responsible.

Accepted nominal authority ends no later than lastCreateAt+70000=T0+230000<C0, further narrowed by actual consent/token/candidate/N1. This does NOT guarantee the provider instance or remote writes terminate by230000. A create issued before160000 may be accepted later; a late original event must fail at nominal entry before nominal effects. Pending acceptance and delayed settlements remain outstanding writers, even after a local timeout.

Cloudflare documents native create({id,params}), actual creation time in event.timestamp, and durable sleepUntil. There is no one-shot delayed-start option in the documented creation options. [Workers API](https://developers.cloudflare.com/workflows/build/workers-api/), [durable sleeping](https://developers.cloudflare.com/workflows/build/sleeping-and-retrying/).

## Identity, mounting and ordering

Launcher payload EXACT {operation:'finite_nominal_launcher',intentId,sourceRevision}. Instance ID is 'afw-finite-launch-'+SHA256(UTF8('afw.finite-launcher.v1\n') || canonical({intentId,sourceRevision})); distinct from observer and nominal. No caller actor, claim, plan, deadline, binding or resource selector. Existing fixed actor remains afw-own-successor-closure-v1.

Future canonical plan explicitly adds launcher identity and fixed timing to its Workflow/launch policy. Hashes change for the NEW unspent finite intent; no historical record is rewritten. Native nominal ID remains afw-release-<bundleHash>, payload SOLE {planHash:bundleHash}. Finite planHash/controlHash and nominal bundleHash are distinct commitments and must not be conflated.

Actual closed QA currently has only Bootstrap binding and QA_VERSION. Repository NamedConfirmation configuration is not an installed binding.4C/5 must publish/qualify the precise Named binding, definition/class/script, module/profile/exports and closed-compatible rollback while preserving namespace history; no new namespace or public ingress is needed. Source qualification covers ALL binding holders and all create/prepare paths; no generic handler or legacy callback may reach these effects.

Ordering (root post-seed handoff amendment, 2026-11-01):
1. Source/fullCI/promotion/current custody/consent/receiver and private-setup owner-locator/runbook gates are qualified before a future command; concrete T0-dependent policy values cannot be prepared before T0.
2. Original GHA seed-material NEW-ACK/readback and primary completed-success step.
3. Separate attended post-T0 server-private policy setup completes, with qualified immutable installed receipt, exact current canary lineage, settled effects and actual completed-success setup instance.
4. Root/operator creates the exact observer once, AFTER that setup completion. GHA's automatically following admit step passively GET-adopts it within the original bounded window below.
5. Successful first preview -> completed admit-and-ready on the exact admit job -> operator creates the one exact launcher -> timely prepare/guard/claim ACK by90s.
6. Durable sleepUntil150s -> one business nominal child-create -> launcher terminal; original C0 guard and settled terminal proofs -> canary restore -> observer completion -> GHA QA restore.

### Bounded passive GHA adoption after seed success
The old immediate-admit behavior races the attended operator. ROOT now selects read-only waiting AFTER the actual successful seed step, never waiting for a missing seed. adoptBy=min(T0+70000,N1-180000)=T0+70000. Up to36 deterministic slots T0+2000*k for k=0..35; skip elapsed slots without catch-up bursts. Each GET/preview observation is at most5000ms and clipped to the SAME original adoption parent deadline; admission starting late receives only the remaining original time, never a new70s. At slot70s, no new network operation may start if the remaining budget is zero.

Only exact source-defined not-yet observer404 can be awaited without adoption; after exact instance/provenance qualification, an explicitly parsed genuine pending first-preview result can remain not-yet within the same bound. Missing seed, malformed/schema/identity/source conflict, unknown status, auth failure or transport uncertainty must not be reclassified as that benign404/pending result. No catch-all retry, custody diagnosis/repair or regrant. A successful qualified preview ends polling; actual readiness completion must still be proved before launcher preparation and the unchanged90s ARM ACK limit.

GHA holds no QA writer lock while waiting and sends no CF create/other mutation. No new observer/run/clock/custody; no retries of consumed effects. This application wait is separate from the observer's maximum32 observations and one native QA-restore claim, both unchanged.

### Separate private setup dependency
Consume the separately reviewed4C2 [private-policy-setup contract](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/b23d11c31eb1f405f2f8530a6b3281d08ac39ba2/docs/superpowers/specs/2026-11-01-finite-private-policy-setup.md); its owner-authorization locator amendment/final review is still pending. Current proposed exact operation is finite_private_policy_setup and instance afw-finite-policy- plus the contract's domain-separated intent/source hash. Its bounded installed receipt purpose is afw.finite-policy-installed.v1, correlated to context/source/seed/actual version/deployment/publicStatic/module and original timestamps. Native5 must consume the immutable completion through C2's fixed source reader, not accept a caller boolean, guessed identity, old closed-publisher probe or arbitrary receipt DTO.

This is ONE EXTRA PREARM instance on the existing Bootstrap definition, explicit and separate from observer/launcher. It uses actual T0-derived server-private C0/C1 policy values, the same qualified canary module/publicStatic, and its own bounded upload/activation claims. It does not consume the finite first HEAD. Native5 owns neither publisher implementation nor owner preparation flow.

Proposed C2 setupBy=T0+50000, total original operation budget<=30000ms, children<=5000ms clipped by that SAME parent/setupBy; this leaves20s to the adoption deadline. These are future qualified gates, not installed timing guarantees. Setup instance MUST be terminal completed-success and its receipt/writers/pointer/source independently qualified BEFORE observer first preview and finite prepare; no Bootstrap-wide exception or extra active-instance allowance. Missing/unqualified setup context remains unavailable. Exact operation/ID/receipt grammar follows the final approved setup contract; the earlier draft's14-slot/5s adoption paragraph is superseded by THIS root-selected36-slot/2s ruling. No timer, publisher or owner authorization is implemented here.

Operator creation lostACK is exact GET reconciliation only, no replacement/restart. The launcher may not be a GHA dependency of the independent finalizer. Scheduled cancellation/termination is not inferred from changing deployment.

## Native fixed operations and same-object acknowledgement

Future files: lib/mcp-qa-finite-launch.mjs (source constructor/journal/operations), lib/mcp-qa-finite-launcher.mjs (Workflow orchestration); mounts in worker/independent-closure/index.mjs. These proposed modules do not exist as operational capabilities now.

Fixed private methods:
- prepareFiniteNominalLaunch({intentId,sourceRevision})
- createFiniteNominalChild({intentId,controlHash})
- readFiniteNominalLaunch({intentId,controlHash}) (bounded fact-only reconciliation)

They use actual ctx/env, fixed slot, compiled source, private seed/material factories and existing qualified primary readers. Binding possession/source confinement is the transport boundary; arguments do not authenticate an arbitrary caller. Independently qualify the exact real launcher instance/input/source and phase; an instance ID supplied in a DTO is not provenance.

One prepare invocation constructs ONE Task1 control object. In order: actual source/seed/completed-private-setup/readiness/consent/quiescence checks; control.prepare() acknowledged armed; guard.arm() using that SAME control and actual C0 alarm/state readback; control.claimEffect('nominal') acknowledged NEW issued on the SAME control; persist/readback the launch-prepared receipt. Reject if any await crosses armAckBy or original lease. No nominal claim on reconstructed control. Pending/uncertain/previous records never become a new prepare/claim authority.

The launch-prepared receipt is immutable metadata: purpose, intentId, finitePlanHash,controlHash, sourceRevision,qaVersionId,actorId,launcherId,nominalId,bundleHash,nominalClaimHash,guardStateHash,preparedAt,armAckBy,launchAt,lastCreateAt. It records acknowledged claim/guard facts; it cannot renew or recreate them. Store it only after those acknowledgements. Unknown receipt ACK prevents a successful prepare result and launch; exact readback remains factual. Source/controller provenance must prove the original successful prepare step, not merely an existing receipt.

Launcher uses distinct fixed step names: finite-launch-prepare and finite-launch-create, retries.limit=0. Sleep is a separate sleepUntil with absolute launchAt. Only an acknowledged prepare result may reach sleep/create; stage replay of a completed result never repeats prepare. Source-qualified provider step success/native receipt together qualify the handoff. Failure returns sanitized admin_pending and terminalizes the launcher when possible; no loop, resend, new start time or restart.

## Child-create SEND journal and single send

Introduce a distinct append-only journal, not Task1's nominal permission claim. Fixed keys under afw.qa-finite-child-create.v1:<intentId>: send,ack. No deletion/refund/overwrite. No writer identity chosen by caller.

SEND exact fields: purpose='afw.qa-finite-child-create-send.v1',intentId,finitePlanHash,controlHash,sourceRevision,qaVersionId,actorId,launcherId,nominalId,bundleHash,nominalClaimHash,preparedHash,bindingHash,issuedAt,deadline. deadline=lastCreateAt; issuedAt in [launchAt,lastCreateAt). Hash canonical bytes with domain afw.qa-finite-child-create-send.v1 plus newline. bindingHash commits the qualified actual Named binding definition/class/script/profile, not JS object stringification.

createFiniteNominalChild resolves the existing prepared receipt and nominal claim itself. It checks current consent, unchanged source/native binding/pointers, unwithdrawn control, unsealed admission/launch gates, exact launcher prepare-step success, fresh finalizer readiness and time. Checks repeat across EVERY await, including queued actor work. Task1's existing claim authorizes its legitimate child; no new nominal claim is minted.

A transaction atomically verifies the fixed head/control/receipt, no send record, original deadlines and no withdrawal/seal, then writes SEND. Read back exact SEND before effect. Only the execution acknowledging a NEW SEND may invoke the actual bound AFW_QA_NAMED_CONFIRMATION.create({id:nominalId,params:{planHash:bundleHash}}), once. A process-local consumed token enforces one call from that acknowledged transaction; durable SEND prevents reconstructed callers receiving it. No unawaited continuation may bypass the active/expired invocation fence.

Existing/uncertain SEND or late storage ACK grants GET-only reconciliation. Even send-present plus provider404 is NOT permission to retry: provider acceptance may still arrive. Workflow default retries, RPC reconstruction and lost responses never create another instance. A duplicate-ID error is not proof that the existing instance belongs to this source; resolve exact provenance.

Optional append-only ACK exact fields: purpose='afw.qa-finite-child-create-ack.v1',intentId,controlHash,sendHash,nominalId,acknowledgedAt. Record only an actual matching create response before the operation deadline; it proves API acknowledgement, not execution or settlement. Lost/late ACK leaves SEND issued. Read-only primary reconciliation can observe exact provider status/output; it does not rewrite SEND or manufacture acknowledgement. Keep unresolved SEND in the writer inventory until the actual unique instance/source and its terminal/writer outcome are qualified. This is a separate native-create writer lineage, not one of the existing reservation/admission/launch process-writer kinds; the phase producer must carry it explicitly without inventing a settled process receipt or relaxing existing writer-count checks.

The nominal finite entry validates original instanceId/payload/event.timestamp and actual source/control/SEND correlation, then calls runKnownCancellationReleaseWorkflow({bundle,env,event,step}) unchanged. No replacement event, fifth argument or extra stage inside the accepted18 stages; original70s/5s/20s and cancellation propagation remain. Emit bounded original-event provenance in the finite outer technical result using the actual event, alongside unchanged nominal result; failed/absent output is not synthesized. This outer result grammar is an explicit new mount contract. Qualified module provenance plus provider original steps/output supports timestamp evidence; Workflow.versionId alone does not.

## Concrete source-produced never-issued inventory observation

This is the4C/Task5 producer deliberately excluded from4B. Public/raw flags such as neverIssued=true or arbitrary branded DTOs cannot select an absent-nominal exception.

The fixed native constructor first requires C2's qualified immutable private-setup completion/context and terminal source lineage; it owns ctx.storage, actual compiled module/profile/binding pins, exact canonical plan, Task1 state decoder, prepared-receipt/SEND readers, and fixed provider inventory transport. It constructs a private invocation-bound inventory capability only after those actual dependencies qualify. No exported mint function accepts a success DTO; tests exercise this constructor with explicitly synthetic actual storage/provider boundaries, not a production bypass.

All new SEND writes and this observation share one bounded per-actor source coordinator. The outer prepare operation must not hold that coordinator while awaiting its own inventory reader; only the bounded inventory observation and SEND transition acquire it, avoiding a same-actor reentrant lock cycle. A read-only observation holds that coordinator through:
1. transactional read of exact head/INFO/control/nominal claim/prepared receipt/SEND/ACK and relevant seal state;
2. complete fixed definition/instance inventory and exact launcher/observer provenance;
3. second transactional read requiring identical relevant journal/control commitments;
4. synchronous consumption of the qualified result by the phase-inventory validator before release.

Queue time counts; no send-capable path bypasses this coordinator. Durable transactional SEND still fences reconstruction/old continuations. Failure/timeout releases no authority. Source qualification must prove coordinator coverage and that any already-issued remote create has a durable SEND; if not, absence cannot qualify.

Internal discriminated observation:
- kind='never_issued': identity {intentId,finitePlanHash,controlHash,sourceRevision,qaVersionId,actorId,launcherId,nominalId}; phase arm or prelaunch; journalSnapshotHash,controlSnapshotHash,inventoryHash,observedAt. The source reader directly found BOTH send and ack keys absent in both snapshots and no provider nominal. The validator obtains this observation only through the private invocation capability above, never from RPC arguments or caller-selected kind.
- kind='issued': same identity, exact sendHash, optional ackHash and qualified provider observation/unknown state. It can NEVER qualify absent nominal as never-issued.
- missing/conflicting/unqualified producer: unavailable, no exception.

At arm, Task1 may be in its same-invocation pending/armed transitions; source decoder correlates exact control and current preparation, with no foreign writer. At prelaunch the acknowledged prepared receipt/nominal claim/guard must match. Their differences do not alter the SEND condition. The nominal permission claim can already be issued while SEND remains absent. This observation is point-in-time admission evidence, not a durable promise that a later permitted send cannot happen, and never restoration authority.

## Phase inventory and cleanup choice

Enumerate all fixed definitions and every bounded instance page, preserving closed operator. No whole Bootstrap/Named definition exclusion.
- Preview/arm: private-setup completion/receipt is a prerequisite and its exact instance must already be terminal; only exact observer and, when actually created, exact launcher in its qualified preparation phase may be active; nominal absence needs the source-produced never-issued observation.
- Prelaunch: exact acknowledged launcher may wait; exact observer remains active; nominal absent requires the same protected observation.
- After SEND: provider queued/running/waiting is an unresolved nominal state, not a new send permission. Unknown or absent instance with SEND remains unresolved.
- Canary restore: actual nominal terminal, actual launcher terminal and all scoped writers settled; only exact observer may remain active.
- QA restore: nominal/launcher terminal, observer complete, guard/proof and original GHA send fence unchanged.

Choose CONSERVATIVE ADMIN-PENDING for never-created nominal cleanup. Do not add a sealed-never-created restoration variant in this block. Guard may withdraw/close/seal under existing cleanup authority, but absent nominal cannot satisfy the accepted terminal prerequisite for either restore. Availability cost: an early launcher failure can require later separately scoped operator recovery even with no nominal effects. No ghost terminal receipt, reset, new claim or silent absence exception.

Existing sealed_without_admission concerns PROCESS admission; it is not proof of Workflow noncreation. All held remote D1/Container/create writers must settle. Task2's single DO alarm remains C0; do not replace/multiplex it with a start alarm. No early restore by assuming the70s deadline physically cancelled provider work.

## Evidence, qualification and acceptance boundary

Cloud evidence: original comment/run/seed IDs; published module/binding hashes; actual launcher preparation timestamps; SEND/ACK hashes; original nominal event/steps; actual terminal statuses; independent physical-process/writer/proof/restore receipts. Instance GET has queued/start/end/status/steps/output, but do not relabel queued as a guaranteed substitute for event.timestamp. [Instance GET schema](https://developers.cloudflare.com/api/resources/workflows/subresources/instances/methods/get/).

PC-off evidence is separate: OWNER declaration of physical shutdown/time correlated with these cloud receipts. No automatic OS-power attestation, new heartbeat or permanent guard is claimed. Provider receipts alone prove cloud activity, not that the PC was off. Root coordinates shutdown only after all source/fullCI/promotion/current custody/consent/receiver gates and timely ARM evidence. Source design consumes no occurrence.

Custody remains the approved dated-static policy receipt plus fresh correct-kind self-verification/fixed GETs and explicit unchanged-policy operator assumption. No fresh scope equivalence or scopeVerified=true. Native reader and GHA/publisher identities remain distinct. Provider denial consumes the issued effect; no permission upgrade or retry.

Required focused handoff tests: seed step success versus missing seed; setup still active/uncertain/old probe; observer absent until50s then valid preview; slots skipping elapsed time; clipped GET near70s; zero-budget terminal slot; malformed/auth/unknown versus exact404; no CF create/QA writer lock; setup terminal in full inventory; observer32-read/claim budget unchanged. Required focused native tests: exact source-bound preparation same-object claim; lost prepare/receipt ACK;90s boundary and delayed readback; sleep replay;149999/150000/160000 send boundaries; create accepted late with original timestamp outside window; original70s lease queued/late effects; reconstruction after SEND with404; blocked source constructor/caller DTO; concurrent SEND versus inventory snapshots; old outstanding create lacking settlement; both restores with active launcher; never-created admin-pending; held canary/D1 writers; unchanged C0 alarm and18-stage wrapper. Native tests are synthetic until separately authorized provider acceptance. Source builder must inspect concrete factories and actor path coverage before this design is implementable, not rubber-stamp booleans.
