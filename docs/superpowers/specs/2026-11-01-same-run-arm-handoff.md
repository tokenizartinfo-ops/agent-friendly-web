# Same-run ARM to named preflight: integrated source-only contract

Date: 2026-11-01 UTC. PROJECT=AFW; REPOSITORY=tokenizartinfo-ops/agent-friendly-web; ENVIRONMENT=GitHub source-only; ORIGIN=https://github.com; RESOURCE_TYPE=isolated branch/docs; RESOURCE_ID=design/same-run-arm-handoff-20261101; ALLOWED_ACTION=reviewable source design, then reviewed secret-free implementation; ROLLBACK=preserve baseline and use additive source revert. No remote runtime mutation.

Baseline: main `abdb91763ca8eab5254022680ca54cf992afcddc`, tree `c9ae460156962bd0ee1b21137f1971eb1d55d5c0`; main CI41294654155 verified completed/success. Checkpoint issue497#6556415794 remains historical evidence; owner resumed work. operationalReadiness=false.

## Status: optional design, implementation HOLD

Root's critical-path review found an existing lifecycle through AfwReleaseWorkflow/runReleaseWorkflow confirm_named successor reservation and AfwOwnEventNode subscription, saved-event production, deliverOwnSaved, unsubscribe/close/withdraw. This document does NOT establish generation-controlled QA ARM as a prerequisite for that existing path or for every nominal test. Root must first reconcile the actual consumer/protocol blocker and select the smallest existing-path integration. Do not start Tasks 1-4 unless that comparison establishes a concrete need for this alternative. The detailed contract below remains a reviewable source option, not the current critical path.

## Outcome and decision

Connect the actual existing first-generation ARM host to ONE fixed read-only current-generation/named-packet preflight in the SAME Workflow run, within the ORIGINAL native event's five seconds. The successful source outcome is an integrated native fixture proving ARM metadata and preflight correlation. It does not authorize nominal effects, physical guard, subscription or production readiness.

Rejected alternatives: a receipt DTO used as a capability permits replay; a second persisted step or resumed Workflow can reconstitute authority; calling the existing readOwnQaNamedPacket facade starts another five seconds. Instead use a private WeakMap capability created only after real outer step.do settlement and consumed synchronously before the sole fixed continuation. This is one composition, not a new generic capability framework.

Existing components:
- `lib/mcp-qa-generation-arm.mjs`: unmounted real draft/material/primary/HTTP/ledger ARM host; nativeInvocation is a trusted declaration.
- `lib/mcp-qa-named-preflight.mjs`: constructor composes current HEAD resolver, primary packet SELECT and semantic assembly. Reuse it with parent-fenced now and remaining original timeout; preserve its existing diagnostic facade.
- `lib/mcp-qa-private-context.mjs`: compiled source/artifact/historical context; `lib/mcp-qa-cloud-closed-pins.mjs`: fixed canary/operator pins.
- `worker/independent-closure/index.mjs`: currently has no generation ARM RPC or ARM Workflow dispatch; fixed actor alarm returns unavailable. Neither is silently changed in this increment.
- Stored ancestor reader from PR706 is not a first-generation prerequisite.

## Exact source interfaces and trust boundary

New `lib/mcp-qa-arm-handoff.mjs` exports only these host adapters (all UNMOUNTED):
```js
runPrivateQaArmHandoff({env,event,step})
armPrivateQaGenerationForHandoff({env,ctx,args})
readPrivateQaArmHandoffPreflight({env,ctx,args})
```
A TEST-ONLY WorkflowEntrypoint calls the first; a TEST-ONLY fixed DurableObject exposes `armOwnQaGenerationForHandoff(...args)` and `readOwnQaArmHandoffPreflight(...args)` calling the other two. No production entrypoint import, RPC, operation dispatch, config or bindings change.

The Workflow accepts exact own-data payload `{operation:'arm_generation_handoff',namedBundleHash}` (object or <=256-byte JSON), 64 lowercase hex hash, and native instanceId exactly `afw-qa-arm-` + hash. Capture the native Date event.timestamp with Date.prototype.getTime, actual event identity/values, step.do, namespace/methods, prepared_idle profile and native AFW_QA_VERSION metadata before I/O. Pin source only from compiledQaSourceRevision. Reject absent compiled artifact/historical context, future timestamp, rollback, or elapsed >=5000ms.

Both actor adapters accept exactly TWO args: namedBundleHash and exact own-data `{instanceId,eventTimestamp}`. The envelope is created only by the fixed Workflow wrapper from its captured native event; it contains no source/version, callback, consumer, receipt or capability. Actor validates instance/hash, current time >= timestamp, timestamp+5000 unexpired, fixed actor identity and prepared_idle profile; source/context/fetch/pins come from module/native bindings. NativeInvocation for the existing ARM host uses this declared instance and the actor's own actual version plus compiled source. These checks establish local coherence, NOT platform caller attestation. A native binding call graph inaccessible to untrusted callers is a TCB prerequisite for later mounting; the envelope alone is forgeable by code already inside that TCB.

Actor ARM uses `createPrivateQaGenerationArm` unchanged in authority semantics, fixed external `QA_CLOUD_CLOSED_PINS.canary/operator`, native fetch, compiled contexts, native ctx and distinct QA/dossier DB. Actor preflight uses `createPrivateQaNamedPreflight` directly. Never expose an injectable receipt/consumer/token factory/authorize/sourceIdentity. The private WeakMap, mint and consume functions are not exported, persisted or returned.

## Lease, settlement and one-shot continuation

1. Let originalEnd=eventTimestamp+5000. Capture local monotonic origin at wrapper entry and a monotonic end narrowed by originalEnd-entryWall. Every check requires nondecreasing wall/monotonic time, current native identity/profile/bindings, unchanged event values and wall < originalEnd. Actor repeats this with remaining ORIGINAL wall budget and its own local monotonic guard. Local clocks are not certified physical cancellation clocks.
2. Call exactly one `step.do('arm-private-generation-handoff', {retries:{limit:0,delay:'1 second',backoff:'constant'},timeout:'5 seconds'}, callback)`. Callback has an executedHere latch that rejects duplicate execution. Before RPC, recheck lease and latch writeMayHaveOccurred conservatively. Call only fixed actor ARM with captured envelope. Validate the exact bounded JSON receipt and retain its exact bytes in a private invocation-local variable. Return that string to step.do.
3. AFTER awaiting step.do's OUTER settlement, recheck lease/native pins, executedHere===true and exact equality with those callback-produced bytes. A replayed/cached step result whose callback did not run here cannot mint anything. An altered result or timely callback with delayed checkpoint settlement cannot mint anything.
4. Add `armDecisionAt` to the existing ARM host's armed result: host records it after successful ledger receipt validation and final rereads, immediately before emitting its armed decision. It is a host decision timestamp, NOT storage commit time, Workflow checkpoint time, or proof of physical deadline enforcement. Actor/wrapper require integer originalStamp <= armDecisionAt <= currentTime < originalEnd. Existing ledger armedAt/pendingAt retain their meanings.
5. Mint a fresh opaque object in the private WeakMap only after step 3 and exact armed receipt validation. Record captured run/event identity, original end, same native source/version/profile, namedBundleHash/generationPlanHash/packetHash, armDecisionAt and remaining original lease. No token for blocked/uncertain. Do not cache across calls.
6. Immediately call a fixed private consume function; it checks ownership and synchronously deletes the token BEFORE its first await. It is consumed even when subsequent checks fail. No second step.do, sleep, retry, callback selection or token transfer. Call the same actor's read-only handoff preflight with the original envelope; its constructor receives parent-fenced now and remaining timeout, never 5000 afresh.
7. Validate preflight's exact existing <=2048-byte observed receipt against ALL three ARM hashes, native source/version, compiled artifact pins, prepared_idle profile, durable_object context and false authority/readiness flags. The preflight itself rereads current HEAD and packet correlation before/final settlement. Recheck original lease and Workflow pins AFTER RPC settlement and final bounded serialization. Future nominal window, absent packet or changed HEAD blocks continuation; no sleep or fresh lease.

Deadline timers stop local admission, not an issued remote transaction. A delayed/lost ARM ACK or late commit can leave pending/armed metadata. Preserve all rows and uncertainty, no automatic retry/rollback/cleanup. After ARM RPC is issued, any unknown/expired/invalid outcome is conservatively uncertain/writeMayHaveOccurred=true. A timely exact blocked/no-write ARM receipt may produce blocked/false. If ARM is timely armed but preflight fails, report metadata armed and continuation blocked, not successful continuation or cancelled metadata.

## Bounded output contract

Owned plain data only, JSON <=2048 bytes, no token/packet/draft/grant/credential/provider body. Purpose `afw.qa-arm-handoff.v1`; common exact fields:
```js
{purpose, status, armStatus, preflightStatus, writeMayHaveOccurred,
 authorizesEffects:false, guardLivenessVerified:false,
 nativeWithdrawalVerified:false, operationalReadiness:false, mayRetry:false}
```
Allowed combinations:
- `blocked / not_started / not_run / false`: no ARM RPC issued.
- `blocked / blocked / not_run / false`: exact timely ARM blocked receipt.
- `uncertain / uncertain / not_run / true`: issued ARM lacks timely valid settled receipt.
- `blocked / armed / blocked / true`: timely ARM, failed/missing/late preflight.
- `observed / armed / observed / true`: completed single read-only continuation.

For the last two combinations add exactly namedBundleHash, generationPlanHash, packetHash, runtimeVersionId, sourceRevision and armDecisionAt from the timely validated armed receipt. observed means correlated facts, never readiness or effect authority. If the original lease expires before final output, downgrade observed to blocked/armed/blocked; previously validated hashes are only dated metadata. Never emit raw errors. Native transport string receipts avoid disposable-RPC object ambiguity.

## Data and integrated acceptance

ARM reads draft by namedBundleHash. Preflight SELECTs packet by generationPlanHash. ARM DOES NOT insert the named packet. Native success fixture must independently seed BOTH existing immutable schemas with consistent bytes produced from the same material; keep QA and dossier DB distinct. Also run draft-only negative: ARM may be armed while preflight blocks for missing packet. Do not alter installed schemas or claim production hydration from fixtures.

Required tests exercise real workerd Workflow step.do + fixed DO + D1 + existing ledger/preflight, with explicitly synthetic primary records, namespace, external HTTP observations and compiled artifact context. Native caller provenance remains a TCB assumption. Deterministic test-only step doubles supplement real native tests for replay, duplicate callback, delayed outer settlement, receipt substitution and 1ms final-microtask expiry. Native delayed RPC/commit ACK tests show preserved armed/pending rows and zero continuation. Test observer counts cannot be substituted for the real read stack.

## Conditional route if this generation-controlled alternative is selected

This optional increment would close only its source integration seam. The following gates apply to a NEW generation-controlled path if selected; they are not newly imposed prerequisites on the already-existing confirm_named/AfwOwnEventNode lifecycle. Root first audits what the existing path already supplies, especially actual client consumer/protocol access, and reuses accepted evidence. Do not reopen consumed intents. For this alternative, the remaining dependency order is:
1. Create-only producer/hydration for consistent draft AND packet, fresh own scope and dossier primary correlation; immutable readback and preservation of history. No schema replay.
2. Review and qualify actual private mounting/call graph, measured candidate/source/UUID/config and explicit dossier binding; compatible recoverable rollback, original event lease and native actor handoff. Introduce only the necessary private RPC/operation in a separately reviewed candidate.
3. Implement server once-claim plus generation-specific finite PHYSICAL guard/finalizer and native stop/withdrawal. Existing fixed actor alarm is unavailable; metadata armed/DTO booleans cannot replace physical enforcement.
4. Connect consented real client subscription, receiver and callback custody to a useful reviewed result; prove native withdrawal and independent closure. Presence of a catalog or read tools is insufficient.
5. Perform one fresh integrated own PC-ON route with producer -> ARM -> same-run admission -> guarded delivery -> useful review -> native stop and independently verified closure. Only after that, a distinct explicitly agreed PC-off occurrence. No Max outreach/data, new credentials/OAuth/cron/Workflow/runtime action follows from this source plan.

All source acceptance and later gates retain operationalReadiness=false until evidence supports a separately scoped promotion.
