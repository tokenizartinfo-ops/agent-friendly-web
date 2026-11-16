# Proposed N3 observation seam — independent OWN read-only design

Status: PROPOSAL ONLY; no N3 spec, plan, implementation or activation authorized. All choices below are this agent's recommendations for Root to settle. PROJECT AFW; repository tokenizartinfo-ops/agent-friendly-web; environment immutable Git DATA/read-only source study; origin GitHub API. Brief 49cf5f68a944eeeb17d72952fce30605fe8f85a2. No executable artifact, Source/OWN code, test, build, syntax check, ref, run, dependency or runtime action was created by this block. Source N2 parser F1 work is separate and untouched.

## Intent and evidence

Observe whether the FIRST recheck immediately after receipt-recorded was entered and returned/threw, and join its original lease objects with their recorded lifecycle and the first RECORDED logical error. Preserve the same four-case graph, requests, factual reads, guards, clocks, deadlines, method calls, original values/promises/awaits and cleanup. This is observability, not a product repair or proof that the HTTP budget is impossible.

Immutable inputs read in full as DATA: diagnosis3498526a0e205b449d8b2797e4cd61a4f1582f6f, primarydb59d9696661b681e88c919e08ec1311d176b4de, exact safe outcomeeeeec6e48364422b40b599a75fad21064562eb64. No log/artifact refetch. These report actual N2 run43869998890/1, job133308331285, valid complete diagnostic, three nativePASS/NOTICESFAIL, GET200/body23681ms, POST503/body30011ms, count2/2/2, receipt-recorded safe marker. Two parent-holders arrivals show closed/aborted true before NodeAFTERenter. They neither identify a lease/request nor establish an initiating cause. Closure106b5a0ea543abe55dc8f27a717362dda1dfd08e and closeproof44a9091d8cbf1745b84dcfb853f88d07836316ff are recorded by the brief/diagnosis; no new live ref inspection occurred here.

Normal13/index26b62b5ce8f413b6f7fd146e03b8f8cdcf6995ac and qualifierc230140201a6e12d9a355b2cfe6343749f083e1d remain frozen/unqualified. No Task2.

## Alternatives

| Proposal | What it can establish | Cost and limit |
|---|---|---|
| A. Keep existing Node tags/probes only | Known producer emitted holders rejection, closed/aborted state, Node arrival window and safe frontier | Lowest change, but cannot join internal lease objects, first recheck or first logical error. Repeating it would not answer the requested question. |
| B. Narrow QA-only private ledger, exported in the existing fixture probe | Same-context object relationships and source-event ordering for the selected recheck; first recorded error/logical outcome; exact retained-promise settlement observation | Recommended. Requires explicit temporary compiled QA instrumentation and a new safe contract. Does not join upstream M to QA or prove an exact Promise.race winner. |
| C. Per-event structured logs from instrumented QA, optionally M | Can expose later source events without another probe RPC; embedded source ordinals can survive Node delivery reordering | More hot-path logging and two transport/order domains. M instrumentation changes M bytes and still cannot join objects across Workers merely by matching ordinals. A new header/token/argument bridge would exceed this scope. |

Recommend B for a bounded first study. Reuse the existing before/after firstConnectionProbe calls; add only a bounded safe ledger field to that INTERNAL fixture response. Do not add RPCs, factual reads, retries, waits, worlds, request metadata or public business API fields. After-probe is one cut: later retained continuation remains unobserved. C is a separately ruled alternative if observing later source events becomes essential; do not silently combine it with B.

## Feasibility and exact seams

Relevant frozen bodies were read as strings only:

- S00 lib/mcp-qa-finite-owner-phase-context.mjs, blob a9d70b416579e3ab6e8c5f02ec2a9b94227c43e5: observeOwnerPhasePair100–132/523–528; choice610–635; recheckOwned693–706; receipt779–780; catch/finally808–809.
- S09 test/fixtures/finite-first-connection-publication.mjs, blob3e1d4c2695dce2d13ba064274ba441c4ce9447c3: M compilation103–148; fixture probe351; transformations379–428.
- S10 test/fixtures/finite-initial-entry-world.mjs, blob9e7f89e3a0b5112323cd80a960daa03eb1f9e1b5: existing lease overlay83–89; QA onLoad107/109; QA compilation129–135.
- Initial lease a9cc083baae71c89af2f6436c00571dc8e7a20c9: retain/wait/child/close9–19.
- Preparation/root lease cfbfb1656d4a013b40e770ee8335d5e1eb85a908:59–83.
- Native wire38285fa0149a38924c431b4d5a705bec1384216d:26–39.
- Stage retention068d35c2555c7dc711c487f6021ec572bd3af067:8–23/67–103, studied to distinguish retention from logical completion; no change to it is recommended initially.

Proposed future temporary seams, not transformations authored here:

1. S00: label the EXACT first await recheckOwned at line780 after position receipt-recorded, distinct from the second after position complete. Observe entry, existing checks, factual-pair call entry, and original return/throw. Capture the original caught value privately and rethrow/return it unchanged. No replacement recheck implementation, extra pair call or cache.
2. Bind actual object references already present: originalLease, outer clock.lease, activeChild, pair clock.lease and the exact pair promise created by the original call. Use existing captured root from observeOwnerPhasePair107; never add a readFiniteOwnerRequestContext or assertCurrent call for tracing, especially after root finish may delete context.
3. Important lineage: root→outer→activation child, AND root→factual-pair→its factual children. The pair is created with parent:originalLease at703; it is NOT a child of activeChild. recheckOwned separately checks outer and activeChild. Observing pair completion alone cannot prove the activation child's later check is current.
4. Initial lease: synchronous observations at existing close/abort/finally/check boundaries; reuse its existing retain(p) settlement callback rather than attach a new then/catch or substitute p. That callback currently receives either fulfillment/rejection through the SAME function: recording settlement only is feasible without inferring which outcome occurred.
5. Root preparation: record root creation, observed abort and explicit finish entry/closed transition at the original sites. No new timer, clock read, signal listener or callback replacement. The shared abort function is used by both timer and incoming signal, so an abort observation alone has trigger unknown. Explicit finish and PH parent-abort/finally call sites can be distinguished where actually observed.
6. Native wire: observe the original await Promise.race return/throw and existing first-failure signals without substituting its contenders or callback. A source writer must demonstrate exact preserved calls/awaits/return/error values in a reversible diff. Do not wrap rejectFirst, operation, the original promise or race inputs to obtain a convenient winner label.
7. S09 fixture probe351: copy the safe bounded ledger for the exact current private context; no new storage/SQL/network read. S10's existing QA-only compiler seams mount the temporary inputs. One dedicated diagnostic-only module may hold private WeakMaps/counters, bound within this QA compilation; Source author owns any later executable transformation.

Initial-lease initialization can call narrow/check before the caller binds its returned lease. An initialization failure has no fabricated binding: report unknown/unjoined. Recording must be synchronous/nonthrowing, with a private fault flag; it cannot affect original work or replace a thrown value.

Beforeimages for any future transformed inputs must include S00, initial lease, preparation, native wire, S09 and S10 above plus the current N2 overlays D10=7fc28db8dade75b2e6cbbb7c3fd1ff14566a845d and helper984b66d96d7f75317515859678a26beab6ec9250 where reused. New observer/transform/helper/reader/runner bodies need explicit new pins. All frozen original files remain unchanged.

Actual N2 host proof reports M1996400B/SHA ebb8eda6cc4e2e633615436ae1730b397a27d0432403559a86cad49c77dd391f and QA2546101B/SHA31f14300db51a5418c661cfbeaa7dabdde8d73e3fa270884315eccec1d2b4d0a. Proposed QA instrumentation deliberately changes compiled QA bytes; equality to that normal/N2 QA must NEVER be asserted. M may remain unchanged only if its compile inputs/defines/residency and actual compiled bytes are independently verified unchanged; no future M hash is predicted here. Per-call host equality would compare the actual NEW nominated script/argument, not pretend it is the old script.

## Identity and ordering boundary

A private map may key actual root/lease/promise/Error objects and emit synthetic ordinals. No real IDs, actor IDs, request headers, tokens, URLs, persisted business keys, raw errors/stacks or absolute clocks enter the safe ledger. Never use mutable global current-invocation state across awaits.

Ordinals are names ONLY inside one self-contained source snapshot. Static worker role plus module counter does not identify a physical realm through setOptions/restarts: counters can restart at1 with the same compiled hash. Neither equal numbers nor Node arrival can join M↔QA, two isolates, two snapshots or two invocations. Existing __t3NativeTraceRequestId is mutable global real-header-derived tracing and is not a suitable new causal identity.

Recommend selecting one self-contained QA snapshot containing invocation start and the target first recheck. Do not stitch before/after snapshots to manufacture a full lifecycle. If multiple eligible notices invocations exist, the safe result is ambiguous. If source identity/epoch continuity is absent, same-context join stays unknown. A future cross-realm join would need a separately authorized and independently validated bridge; matching synthetic labels is insufficient.

Source-local sequence establishes only order of recorded synchronous source observations in that context. It is not a wall clock and cannot order events from another realm. Node elapsed/arrival stays a separate envelope; neither arrival window nor the order snapshots reach Node replaces source order.

## Proposed minimum contract sketch — not final wire fields

Keep N2 capture/native/API/log/artifact checks and all existing limits. Add an optional versioned causal snapshot containing:

- scope: fixed QA role, stage notices, target first-post-receipt-recheck; integrity complete|prefix|unknown; join joined|unjoined|ambiguous. “Complete” means complete declared observer coverage through its snapshot cut, not completed Task1 or physical drain.
- Private-to-safe entity table: at most8 selected lease objects with local ordinal and role root|outer|activation-child|pair|pair-child|unknown; parent ordinal or null. Parent relationships must match the fork above. At most4 selected original promises, explicitly bound to target/pair/retainer role; at most4 Error-object ordinals. Unmapped parents/errors are null/unknown, never invented.
- Ordered events, at most24: sourceSequence integer1..4096, fixed event kind, referenced entity ordinals or null, fixed site/role, outcome and cause enum where known. Outer NDJSON sequence/elapsedMs retains its existing Node semantics. No new source time measurements.
- Finite events: scope-enter, recheck-enter, pair-enter, check-threw, recheck-return, recheck-throw, first-failure-signal, logical-return, logical-throw, abort-observed, close-call, closed-transition, child-finally, retained, settlement-observed, snapshot-cut. No arbitrary message/site string.
- Cause labels only from observed sites: explicit-finish, parent-abort, finally, unknown. Timer/deadline MUST remain unknown unless a separately reviewed insertion genuinely distinguishes the original trigger without changing timer/listener/call behavior. Numeric duration near30s is not a trigger.
- Thrown-value projection: present boolean; kind object|null|undefined|boolean|number|string|unknown; error ordinal only for an actual object identity, otherwise null. Existing safe error whitelist may accompany it. A throw null/undefined is present; it cannot become “no error.” Equal primitive values are not identity joins.
- First recorded logical error is set once per scope. Later propagation of the SAME object can reference it; later unrelated errors cannot overwrite it. It is not necessarily the first physical/native error or the winner of the outer HTTP race.
- Retained binding must name the exact original promise already retained. settlement-observed implies that promise had settled by its original settlement handler. Missing handler observation does NOT prove the promise is physically pending: its reaction may not have run or the cut may precede it. Logical-return/throw and retained settlement are independent axes.

Receiver invariants: exact union/ordered keys/types/nullability/bounds; acyclic object relationships; no aliasing one ordinal to a different role/object; source order strictly increasing within the selected scope; causal references point to observed objects/events; no settlement without retained binding; target return/throw only after enter; second recheck never substituted for first; first-error/first-close transition immutable. A complete joined claim requires scope start, exact target, declared no relevant recorder gaps/fault, identities and source cut. If any is absent, preserve prefix/unknown/unjoined rather than assert absence or cause.

Repeated close CALLS can be legitimate: parent abort and finally may both call an idempotent close. Allow those calls with fixed distinct source events, retaining only the FIRST closed transition. Reject duplicate event sequence, a second “first transition,” forged reason/order or first-error replacement. Likewise legitimate propagation of the same Error is not a new initiating error.

No source event after a snapshot cut may be retroactively inserted into that snapshot. Later retained work may honestly exist; it does not invalidate the observed prefix or become drained by NodeAFTER/custody cleanup.

Budget proposal: no generic per-read tracing. Select only the first target and its necessary ancestors/first error/retained binding. Max24 compact events plus8 entities should be preflighted against24KiB outcome,128 journal records and32KiB journal; current N2 outcome14179B and39 records leave plausible room, not a worst-case size proof. No cap increase. If worst-case serialization exceeds a bound, reduce the selected projection or emit explicit trace unknown/prefix; total-envelope overflow retains existing honest failure/frontier policy. Never silently truncate to a complete24-event history. Bounds on private bindings/counters must also be fixed; overflow cannot erase earlier evidence and still claim joined completeness.

## Proposed test-first counterexample families — no tests written or run

1. Same-context positive: first postreceipt recheck and both lineage branches, exact original promise, original Error propagation; late observer transport delivery still yields the same source order.
2. Two invocations or reset realms both using ordinal1; swapping root/outer/pair/first Error; stale phase/GET/earlier connection history; global current-invocation overwritten across an await. Reject joined claims; honest ambiguity/missing join remains valid unknown.
3. Second complete-position recheck presented as first receipt-position recheck; return/throw before entry; pair reported as activation-child descendant; omitted parent link or fabricated equality. Reject.
4. Error A precedes legitimate finally/parent-abort close then holders error B. Reject B as first cause. Permit B as secondary recorded error and original A propagation. Also permit first error unknown when earlier relevant boundaries are absent.
5. Duplicate event ordinal; two first-close transitions; first-error overwritten; close attributed to later NodeAFTER; reordered source sequence. Permit real repeated idempotent close calls without replacing the original transition.
6. Logical503/timeout before settlement handler; handler later observed; source snapshot cut while continuation open; both logical success and later settlement. Reject fake drain/settled-by-timeout and settlement without exact retained binding.
7. Abort observed from the shared callback labelled deadline solely from timing, or explicit finish labelled timeout. Reject unsupported trigger; accept abort-unknown and explicit-close/finally distinctions actually recorded.
8. Original throw null/undefined/false/zero/empty string and object; diagnostic sink fault or serialization error must preserve the original thrown value and original promise/await. Reject masked error, default success and primitive identity fabrication.
9. Boundaries: no target reached, initialization before binding, target entry but no settlement, late continuation after legitimate close, multiple eligible scopes, recorder cap/fault, dropped relevant events, old snapshot replay, and forged complete/cut. Accept honest prefix/unknown; never “prove no event.”
10. Transport/custody/producer controls remain mandatory; coherent forgeries must refresh schema/witness/frame/archive hashes so an intended causal rejection is not merely a stale digest rejection. Compiled QA must match the newly nominated seam, never old-byte equality.

## Allowed statements, limits and decisions left to Root

Conditionally allowed with a complete same-context observer: “the selected first recheck was entered,” “that recorded Error object propagated,” “this same lease had its first observed close before that source observation,” and “the original retained promise's settlement handler had run by the cut.” These are source-observation facts joined to a known pinned producer, not cryptographic authentication of hidden objects.

Forbidden: global first cause, exact race winner from temporal proximity/error equality alone, root deadline expiry from holdersclosed, M↔QA/request authentication from local ordinals, receipt/SEND/ACK authentication, product early-close defect, original lease authority renewal, timeout implying rollback/drain, successful Task1 or need to dispatch Task2.

The feasible minimum is QA-local attribution. End-to-end M root causation and an exact Promise.race winner remain outside that minimum. Root must settle: QA-only cut versus a separately authorized later-event transport; whether any cause-specific timer seam can preserve original callback identity/calls; exact union/binding/private cap sizing and overflow treatment; and whether selected instrumentation fully covers all boundaries needed for a claimed “first recorded” error. If an implementation requires header/argument/callback/promise replacement, extra business reads, new clocks or broader M instrumentation, stop at that conflict before widening.

No source behavior or causal proposition is approved by this proposal. Root owns any bounded spec/plan, Source author any future reversible transformations, and independent OWN any future receiver/control implementation and review.

SourceQualified:false; Task1Pass:false.
nonclaims: historicalCauseProven:false; receiptAuthenticated:false; operationalReadiness:false; completePackage:false; PCoff:false; globalNativeDrainVerified:false; sdkNamespaceEmptyVerified:false.
