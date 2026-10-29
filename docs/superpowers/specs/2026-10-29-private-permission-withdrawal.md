# Private permission withdrawal and stop composition — 29 October 2026

PROJECT AFW; REPOSITORY tokenizartinfo-ops/agent-friendly-web; ENVIRONMENT isolated source/CI branch; ORIGIN GitHub; RESOURCE_TYPE branch/PR/Actions; RESOURCE_ID feat/private-consent-withdrawal-20261029; ALLOWED_ACTION source tests and review, then merge; ROLLBACK revert the source commit. No remote Worker, D1, OAuth, token, task or Container mutation belongs to this block.

## Decision
Compose the existing append-only monitoring withdrawal with an exact-tuple read-grant revocation and the existing historical process close callback. It is an unmounted internal factory, disabled unless explicitly enabled by a trusted future host. All identity, original consent, request UUID, finite administrative window (maximum ten minutes), primary D1 and original close callback are fixed by that host, never supplied by MCP or HTTP callers. There is no caller-selected target or grant renewal.

Prefer this narrow composition to changing the general OAuth store or rebuilding the event lifecycle. Gabriel delegated routine design decisions and approved consecutive development; no extra design approval is needed for this source-only block.

Native ChatGPT unsubscribe must be attempted while its original read grant remains valid. This reduction primitive may also serve the deadline fallback if native unsubscribe is unknown. It never calls ChatGPT, invents a callback/secret, nor reports native withdrawal or physical stop as proved.

## Sequence and evidence
1. Validate exact factory inputs, monotonic clock, finite window and primary original owner/grant/consent identity. Extra keys, accessor properties, foreign identity and expired invocation fail before writes or close.
2. Append a terminal monitoring withdrawal using the existing writer, fixed UUID, original revision and SQL commit window. A lost write ACK can be reconciled only by a primary read of the resulting exact journal.
3. Revoke only the pinned read grant using SQL owner/project/client/resource/original-consent predicates and an independent SQL clock fence. Preserve an existing valid revocation timestamp.
4. Bound every D1 stage to five seconds and the administrative deadline. Fence late continuations before more SQL work; already-dispatched writes also carry their stage deadline in SQL. A stalled initial or pre-close identity read yields an unconfirmed result, not authority to close an unknown target.
5. Request close of the original process even if either permission write failed, provided its identity was established and the finite administrative window is still current. No launch path exists. Abort/time-bound the trusted callback and distrust malformed or late ACKs.
6. Re-read primary state. Report monitoring withdrawal, read withdrawal and stop request separately. Overall permission reduction is true only with both primary withdrawal records. Always return physicalStopVerified=false, nativeWithdrawalVerified=false and operationalReadiness=false. No raw errors, identity or capabilities in receipts.

The writes intentionally permit partial reduction: never compensate by restoring permission. A repeat with the same fixed context and UUID cannot grant access or add duplicate monitoring decisions. It may reconcile a prior lost ACK, but does not prove a native subscription was removed. An expired administrative window requires a separately prepared window, not renewal of the user's read consent.

## Validation and limits
TDD on GitHub Actions: red contract tests, then implementation; SQLite tests for isolation, replay, unknown ACK, partial failure, context drift and late commit; native workerd D1/DO test for append-only monitoring, real process custody close and historical retirement evidence. Full tests/lint/build and one independent review before merge. No local build/dependencies.

The future private host must attest the original identity/custody, bind the close callback to the original DO/source, and publish this factory behind a finite internal operation. This commit alone is not that mount, a live withdrawal, physical stop, native unsubscribe, useful delivery, PC-off or pilot readiness.

## Review resolution
One independent review of efbb7f1 found one Important unresolved-D1 wait and one Minor late close-ACK deadline gap. Both are addressed with the shared bounded-stage helper, SQL stage deadlines, scoped writer continuations and absolute post-ACK checks. RED1c4b8df/CI40881365156/job123473437029 reproduced all three stalled-stage regressions (24 pass/3 fail). No additional review loop is requested.

Executor rulings on declined certifications: live host/callback binding remains the next explicit integration block; native unsubscribe, actual provider stop/delivery and PC-off remain required later evidence; cancellation of dispatched D1/close is unsupported and never claimed. Malicious injected host dependencies are outside this internal factory's trust boundary and must be prevented by the future host. The native fixture now actually disposes/restarts Miniflare with persisted D1/DO and verifies terminal custody survives; this is CI restart evidence only.
