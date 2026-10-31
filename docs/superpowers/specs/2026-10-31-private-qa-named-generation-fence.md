# Private QA named generation fence —31 October 2026

AFW / tokenizartinfo-ops/agent-friendly-web / source only. Approved private-QA design continues; this increment composes one missing nominal control fence and does not mount it.

Native closed evidence: issue497#issuecomment-6543648776, source1e689a9, actual Workflow and fixed DO UUID0771c5f5/source match; complete one attempt, allClosed true; restored c570 and independent close readback. This does not establish live guard or nominal effects.

## Scope and contract
createPrivateQaNamedAuthorization receives exact server-owned options: executionPin, readGeneration, pins{planHash,sequence,startAt,expiresAt}, now, timeoutMs<=5000. It returns only authorize(stage,parentSignal). Read callback must target the fixed server actor and return bounded primitive JSON from createPrivateQaGenerationObserver; no async helper may forward a borrowed RPC object. No payload-selected callback, source, namespace or account.

Only existing named-runtime stages are allowed. Each call reads fresh primary generation, requires exact armed/current HEAD/original window/nonwithdrawn row and UUID/source matching the local native execution pin. Stored context is durable_object; local workflow context is deliberately different. Do not compare entire context snapshots. Validate metadata field grammar, timestamps, sequence and conservative false receipt flags. The observer owns lineage/hash verification; this layer never repairs metadata.

Capture original wall and monotonic window at construction. Per-call deadline is min(timeoutMs,5000,original remaining), installed before invoking the reader. Abort, timeout, drift, mutation, concurrent call, invalid DTO, withdrawn or expired generation latches unavailable. Revalidate after every await and never cache a successful receipt. Return true literal only after all checks; false without private detail otherwise. Unknown stages do not borrow ARM/cleanup/publication authority.

## Limits and integration still required
This is a mandatory named-control fence, not complete effect authorization or guard liveness. Host must correlate compiled source/module/config/native UUID before ARM, fix capsule+observer+actor, retain primary grant/history/reservation SQL fences and independently verified guard. No D1 reservation-zero predicate is introduced here: post-reservation stages must continue under the same exact generation; the primary reservation layer still enforces the unique budget.

ARM and cleanup use their separate phase-specific authority. This named fence must never be reused to prevent cleanup after permission withdrawal. No runtime entrypoint, bindings, flags, resource, grants, credentials, subscriber, event, Container or first-successor budget changes.

## Verification
RED with a fail-closed placeholder must reject the actual armed fixture, not fail because a fixture/module cannot load. Unit tests use the real generation ledger and observer for withdrawal/HEAD/corruption; negative schema/pin/clock/abort/timeout cases preserve history and latch failure. Native Workflow+DO JSON RPC exercises current, withdrawn and wrong-source cases with zero outbound. Complete CI, lint/build, independent review, exact accepted tree. No local builds/dependencies; isolated remote branch, rollback is source-only revert.
