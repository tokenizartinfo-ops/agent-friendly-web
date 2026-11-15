# Builder preflight: R3 existing-sample diagnostic

Status: design input only; no Source editing or execution authorized or performed.
Repository: tokenizartinfo-ops/agent-friendly-web.
Verified closed Source: 8b1e2f364608ebef7727ebcb51a47d171410ce8e.
Verified tree: b9f5ad58137adedce030699b55d8fcc5a4188c09.
Date: 2026-11-15 design unit; source inspected in the present session.

## Binding and prerequisite

The settled design was read as DATA at commit9454d08059709f16e9a6ad67123f080f4eb562ff, path docs/superpowers/specs/2026-11-15-r3-existing-sample-diagnostic-design.md, blob9352fc7ba8c74c2e7dfe06c9b104589a8d6a921a. File and blob content matched.

Current exact-pin reads confirmed World1e18873791e0520fff611e353232e38786c51941, cleanup fixture2f5dad6c306fac1be2f11845bef640bb204ad572, original Native533dafb5df5f8e57442c5b9029dc8dec6dded434, runtime cleanup1a5a2583d266179cdd89f799c64199f29044fec5, owner phase7eb8f28760de60f143e487eeb6988705059a0a44. Original F7 is .github/workflows/afw-finite-budget-qualification.yml blobf7a71f1a0fa4f5ddf069ff411f008a098455e5cc. Descriptor DATA is be695028e4c12c3cb7d3b7bf2c5f2e7508f3db15.

The supplied prior contract-fix run43661818015/1,39red/20pass before and59green after, and C1-C6/helper3/guard-mutant results were not re-read as artifacts here. Its scoped disposition remains a prerequisite. The supplied Core3200 and accepted SAME prefix are preservation inputs, not newly recomputed claims. Before any preparation, Root must record the positive scoped disposition and recheck the exact closed Source/tree/prefix and current production18/fixed-receiver pins. Neither this report nor the design releases editing, dispatch or native work.

## Minimal implementation shape

Use the existing test-only World/fixture machinery. Do not add a runtime registration API, incoming-request capability, phase state machine, generic observer callback or business-module hook.

1. The decoded SYN adapter at cleanupfixture302 appends one tiny phase object to finiteBudgetSignals, computed from existing this.ownerReferenceState only. Keep the existing native calls and their argument/order exactly intact.
2. World retains a sanitized DTO in pure Node RAM immediately after the existing awaited read returns inside fixedBudgetWait, before the original predicate and deadline assertion. Gate this direct capture on the existing owned frame being R3. Do not wrap the R3 read promise, make the read lambda async, attach a handler to issue, or add a capture callback parameter.
3. The same owned frame writes the one retained DTO into its existing private output root before closeFixedOwnedFrame begins its first release/restore. Original error and cleanup remain authoritative.

This avoids a second RPC/read, additional polling, additional read-promise layers and a general callback facility. The original value from read remains the predicate input and successful return value.

## Concrete retained DTO contract

Proposed file: output/finite-budget/readonly/R3/r3-existing-sample.json, under the already owned frame.root. Canonical UTF-8 JSON plus one newline; exact keys; at most4096 bytes; no arrays in the retained DTO. This is a separate diagnostic sidecar, not an added field in the existing production18 readonly result.json schema.

Envelope keys: purpose,source,run,attempt,case,sampleState,sample,nonclaims.

- purpose is afw.r3-existing-sample.syn.v1.
- source is exactly the released40-hex Source; run is the exact released decimal run ID, maximum20 digits; attempt is1; case is R3. Validate against the independently supplied expected context, not merely a matching regex.
- sampleState is observed when an existing read returned and projection was attempted; not_observed only when the owned frame closed without any successful read return. A captured unsupported object is observed with unknown fields, not not_observed.
- sample has exactly the fields below. Before any sample exists, all fields are unknown. A missing file is unavailable at the receiver, not evidence that no read occurred.
- nonclaims has exactly the seven existing names, all false: historicalCauseProven,receiptAuthenticated,operationalReadiness,completePackage,PCoff,globalNativeDrainVerified,sdkNamespaceEmptyVerified.

sample is an exact object of scalar leaves except phase, which contains exactly four scalar leaves:

| Field(s) | Closed values / bound |
| --- | --- |
| inputSeeded | true,false,unknown |
| seedEntries | integer0..201 or unknown |
| lists | integer0..2 or unknown |
| gets | integer0..200 or unknown |
| nativeInvoked,nativeSettled,nativeRejected | integer0..202 or unknown, independently |
| nativeUnsettled,outwardPending,heldNativeSettled | integer0..2 or unknown, independently |
| observerInvalid,queueObserverInvalid,sdkObserverInvalid | true,false,unknown |
| selectedChildCount | 0,1,multiple,unknown |
| selectedChildOrdinal | integer1..65535 or unknown |
| selectedChildFamily | 1,2,unknown |
| childWorkStatus,childWaitStatus | unregistered,pending,fulfilled,rejected,unknown |
| childAbortSeen,parentAliveAtAbort,workPendingAtAbort,sameWorkWaitError | true,false,unknown |
| workWaitOrder | work_before_wait,wait_before_work,not_both_observed,unknown |
| waitAbortOrder | wait_before_abort,abort_before_wait,not_both_observed,unknown |
| queueCount | integer0..512 or unknown |
| lastQueueFamily | 1,2,unknown |
| lastQueueChild | integer1..65535 or unknown |
| lastQueueActive | 1,2,unknown |
| lastQueueQueued | integer0..200 or unknown |
| lastQueueMethod | get,list,delete,unknown |
| heldOperationCount | 0,1,2,multiple,unknown |
| phase.completeWrites,phase.completeNormal | 0,1,multiple,unknown |
| phase.lookupStage | not_seen,entered,exited,unknown |
| phase.authorizePostFinally | not_seen,one,multiple,unknown |

Unknown rules:

- Only own DATA fields and expected plain shapes are read; never invoke getters, toString, toJSON or custom iteration. A missing, non-data, invalid, oversized or out-of-bound field maps to unknown; never clamp it or fabricate0/false. A caught projection failure returns the bounded unknown DTO and cannot alter the original wait outcome.
- inputSeeded=false only for the valid original input=null state; true requires an admissible input object. seedEntries remains unknown when no input exists. The original business assertion still reads its original raw input and is unchanged.
- Node can use its already imported fixedNodeTypes.isProxy before descriptor inspection. Worker fixture inputs are internally produced plain objects; descriptor handling is not a sandbox against hostile Proxy traps. Catching an unsupported projection is observation failure, not a security proof.
- Inspect at most8 selected-child entries,512 queue entries and2048 observer events; do not retain those arrays. More than one selected child yields multiple and makes the per-child leaves unknown. Per-child leaves require exactly one admissible child. The selected ordinal is only an observer association, never an identity credential.
- Use the exact final queue sample only when the bounded source array and its last DATA element are admissible. With no queue sample, all lastQueue leaves are unknown, not fabricated zeros.
- Derive the two order enums only from existing matching-child work,wait and abort event sequence scalars. Require at most one work settlement,one wait settlement and one abort, with valid distinct sequence values. Duplicates/conflicts/malformed shape yield unknown. Missing one of a pair yields not_both_observed. No event array,timestamp,deadline,duration or new event producer is exported. These categories do not classify a deadline cause.
- heldOperationCount is a length class only; do not retain held-operation objects or samples.
- Fields may describe non-atomic observations; do not force arithmetic consistency by inventing values. Contradiction is uncertainty for later interpretation, while original assertions retain their own behavior.

### The four existing-state phase leaves

Preserve the addendum552beab2c20786a214e4ed09bb092ff1d5ab305e semantics:

Require this.ownerReferenceState to be an own DATA expected state object, mode normal, and equal to the existing globalThis.__r1ReferenceState DATA pointer. Otherwise all phase leaves are unknown. This is a current-pointer check, not historical invocation proof.

completeWrites counts grant-put wrapper entry attempts BEFORE native.put (literal fixture15). completeNormal is the SDK-result plus first-recheck marker inserted by fixture102 after phase-context730; it does not prove SdkObserved persistence or lookup entry.

lookupStage uses only the existing lookupChild produced at fixture104: absent property on valid state means not_seen; metric with budgetMs5000 and neither completion property means entered; both valid actualElapsedMs and aborted own DATA fields mean exited. Partial/malformed shape is unknown. Do not export either value, and exited is not success.

authorizePostFinally derives only from the bounded two-request requests array and exact own DATA GET/POST method values already produced by ownerReferenceFetch's finally (fixture15). It does not mean the Node issue promise fulfilled. Unsupported/extra metadata or oversized shape is unknown; multiple POST entries remain multiple.

Compute this phase object synchronously alongside the existing signal scalars before the existing terminal grantRemaining native-get await. Do not add or move any I/O. Do not export trace strings,status,request metadata,elapsed values or child.position. Trace response status lacks request/method linkage; child.position is captured at child entry and the readonly child starts at settled.

## Exact insertion and preservation sites

World1157-1158: fixedBudgetWait currently does await read(),predicate(value),the original Date.now assertion,then fixedBudgetPause(20). Place only the direct nonthrowing RAM projection between the existing read return and predicate. Resolve the existing fixedBudgetOwners frame and require caseName R3; other consumers,including D4,remain unchanged. Keep the exact read callable, raw returned object,predicate,deadline expression,assertion and20ms pause. No new clock call is needed.

World905-908: initialize one R3-only RAM slot on the existing owned frame. Do not put it in Worker state,request context,journal or Native result facts. Overwrite it after each existing returned sample, retaining only the latest DTO. No raw signal or raw error is stored by this new seam.

World873-887: after primary=frame.operationPrimary??primary??frame.cleanupPrimary??null is resolved, and BEFORE frame.records release/restore, write the retained sidecar through existing mkdir/writeFile imports into frame.root. Original source then continues its release/restore,callbacks,disposal/archive and ownership preservation in the existing order.

Evidence-write failure must be caught and added as a phase-scoped ancillary frame failure; it must not skip cleanup or replace an existing primary Error. World898-902 already gathers ancillary failures and throws primary first. If there was no original primary, preservation failure must remain a failing qualification, not a successful diagnostic. The sidecar can then be unavailable; do not emit a fallback success. Keep original Error object identity in RAM. Do not serialize its message,stack or arbitrary properties.

A write that cannot complete because of process termination cannot guarantee preservation. Existing case120000ms and seven-minute job limits stay fixed; missing evidence remains explicitly unavailable. Added disk I/O occurs outside the original observation wait but before cleanup and can affect scheduling; the unit proves observation, not scheduling equivalence.

## Allowed Source delta and pin renewal

Primary durable leaves:

- test/fixtures/finite-budget-world.mjs: pure projector/frame retention/preservation and focused Node control entry, plus the exact fixture blob pin renewal.
- test/fixtures/finite-owner-cleanup.mjs: decoded SYN adapter phase projection only; keep the original normal methods and all business instrumentation producers unchanged.
- New test/finite-budget-r3-existing-sample.test.mjs: focused behavioral qualification, no live/native work.
- Original F7 may be changed only in the explicitly gated preparation/execution candidate and restored to its exact original blob after terminal readback.
- SAME proposal/actual records are append-only under Root's existing approved paths; preserve the full accepted prefix.

No lib or worker business leaf,original Native file,SDK/lock,cap,clock,deadline,assertion or credential path changes. No new helper architecture and no redesign of production18.

Pin sequence:

1. Create the fixture candidate blob first. Renew World1421's fixedOriginalFixtureCleanup exact Git-blob assertion to those actual new fixture bytes. Do not remove,relax or temporarily neutralize the assertion; preserve its callback extraction/free-reference checks.
2. Keep phase code inside the appended SYN adapter literal at fixture302 so the protected normal composed entry remains64800 bytes /89ae285b8f00fdf95eecfeee37673138f4c136c7704f245152051a3be2985257. Its Reflect.apply,Object.defineProperty,Object.defineProperties,Promise.allSettled,new WeakMap inventory must stay exact. New descriptor-only projection need not change these inventories.
3. Descriptor be695028 contains business source pins, normal-entry pin and seven scopeInputPins; it has NO World/cleanup-fixture raw pin. Do not modify that historical descriptor merely because Source changed. Recompute actual preflight input/emission/literal proofs. If the protected baseline changes,stop for scoped design correction rather than rewriting its pin automatically.
4. Prefer line-preserving local statement edits plus appended pure helpers. The current failure map is test/fixtures/finite-budget-failure-diagnostic.mjs blob62965a9d5836e54563550fe29dff23abe9a62054. Re-derive allowed World/adapter assertion-site lines and source spans from actual candidate DATA. If the site set/line positions remain exact,this map may remain byte-identical, with explicit proof. If not,renew only the affected line/site data and current source-site contract pins as an explicit scope addition approved by Root; never disable the map or modify all18 helpers. Do not claim unchanged map validity solely because original labels survived.
5. Renew candidate World/fixture/new-test blobs, Source/tree/workflow association and source-span hashes wherever the current closed contract actually binds them. Recompute the canonical Core tuple digest and count using the existing Root recipe; do not carry forward the old3200 digest or guess the new count. Preserve all other leaves by exact tree diff, the original Native and two runtime-business blobs, full accepted SAME prefix and Main.
6. Rebind the fixed receiver/production18 by exact existing pins. Keep their established readonly result contract unchanged. Put the new sidecar under a separate closed purpose,inventory and bounded validation path in this unit. A raw sidecar must not be silently accepted by a legacy/general validator.

## Focused control matrix

Tests first, remotely after the prerequisite disposition; no tests were run here.

A. Actual wait path: scripted existing reads returning distinct objects prove one read per iteration,unchanged predicate/raw-object identity,pause/deadline/assertion behavior and final-sample overwrite. Failure remains the identical original Error. No-retention and extra-read mutants must fail these controls.

B. Scope and promise preservation: R1/R2/D4 do not capture; only the existing R3 owned frame does. Existing Source-site contracts must prove the issue declaration and original await remain its only handling: no then/catch/finally/race or early await. Wrong-case/source/run/attempt association is rejected,not relabeled.

C. Projection bounds/non-echo: every scalar value set,bound,missing/accessor/proxy/oversized shape,duplicate event,unknown/multiple category and the4096-byte cap. Inject raw key/token/header/grant/row/source/error/stack/private-hash canaries and prove none enter the DTO. A widened-bound/wrong-association mutant must be rejected behaviorally,not only by matching source strings.

D. Actual fixture projection: exercise the generated adapter/finiteBudgetSignals code through the existing closed inert fixture-emission pattern,using actual ownerReferenceConfigure state and the exact existing instrumentation-produced metric shapes. Check pointer mismatch/restore,put attempt-before-native-failure,completion-marker stage,lookup entered/exited and POST finally semantics. Assert original native get call count and arguments remain exact,including the existing terminal await; marker fields are not substituted for a real OAuth outcome.

E. Owned unwind: actual owned close with inert release/restore/dispose stubs proves retained evidence is available BEFORE first release,then existing cleanup order/attempts and exact primary Error survive. Force evidence mkdir/write failure and ancillary cleanup failure; original Error stays primary,all cleanup is attempted,preservation does not report success. When there is no original primary,the write failure is a failure. Existing F5 ownership/F8 boundary and callback controls remain gates.

F. Qualification regression: current qualified C1-C6 and source-site contracts,helper3 and guard mutant,eight pure tests,inactive/invalid-group controls,readonly compile profile and required original pure preparation controls run at exact new pins. Do not release full16,positive/reduction native replay or an all18 redesign.

## One gated cloud plan

Gate0: wait for the prior scoped disposition,then rebind current closed Source/tree/Core/SAME/production18/receiver. Use GitHub Git database isolation; no local clone/deps/source execution. Preserve rollback and original F7 before preparing any mutation. This gate is not satisfied by the reported green counts alone.

Gate1: one bounded cloud controls qualifier on Ubuntu24.04/Node22.23.4,locked npm ci --ignore-scripts --no-audit --no-fund. Run tests-first red evidence for this unit and candidate green controls,including node --test --test-reporter=tap test/finite-budget-r3-existing-sample.test.mjs and the current approved C1-C6/helper/eight-pure/readonly-profile gates. Native jobs remain literally false. Preserve closed sanitized evidence,exact Source/tree/pins and independent readback. No I0/native occurrence is authorized by this qualifier.

Gate2: only after Gate1 and Root release,authorize at most ONE original readonly diagnostic occurrence at an exact immutable candidate. Reuse the current production18 and fixed receiver; prepare the new sidecar's closed contract/independent receiver beforehand. F7 exposes only the released contracts/readonly path; other native jobs stay false. Retain Ubuntu24.04,Node22.23.4,the original seven-minute readonly job and original Native case120000ms. Original native CLI is unchanged:
node --test --test-concurrency=1 --test-reporter=tap test/mcp-qa-finite-budget-native.test.mjs
with the original readonly group and R1/R2/R3 ordering. No new issue handlers,polls,reads,cadence,caps,predicate/assertion,SDK or business change.

The receiver separately accepts original readonly outcomes/source-site and the sidecar state or explicit unknown/unavailable. A business failure remains a business failure. A passing R3 means not reproduced,not an invented earlier cause. Follow the run to terminal,restore original F7,verify restored Source and full accepted SAME prefix,preserve append-only proposal/actual evidence plus same-ID readback,then request exactly one scoped review of this unit. No automatic replay follows unknown or unavailable evidence.

## Known limits and completion criterion

The phase fields are coarse existing observations. Current-pointer equality does not prove past request identity; the requests method is metadata and no status is linked; completeWrites is not a write ACK; completeNormal is not durable completion; lookup exited is not success; order categories are not deadline causality. A process kill can prevent the sidecar write. No provider or clock attribution is justified.

The unit closes on a Source-qualified,honest retained sample or explicit unknown/not-reproduced result,independent bounded acceptance and restored Source. It does not promise the full root cause. All seven nonclaims remain false. C2 integration/custody and the eventual single live PC-off occurrence remain later gates.

Only read-only GitHub Source/DATA reads and this one unattached report blob were performed. No local Source files,eval/import/source execution,tests,dependencies,ref/run mutations,private artifacts/TAP/keys,Cloudflare/browser/OAuth operations or subagents were used.
