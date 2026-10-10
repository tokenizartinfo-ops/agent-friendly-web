# Own revocation budget — bounded source block

Parent Task3 and output/afw-own-revocation-budget-design-20261010.md. Base merged PR380 6d48838821669a6ca39165eb776f16d4af789cde. User standing authorization: autonomous own source blocks; no remote mutation, Max, credential, schedule or PC-off acceptance.

Persist one attempted revocation in SAME primary transaction at readOwnRecovery's final checkpoint, never a second namespace/RPC/caller-selected callback. Require original complete pins/history and withdrawn owner before admitting; current matching own D1 snapshot not revoked, intent with original writeStartedAt. First ACK only internal dispatch locator. Restart/history/retry/unknown ACK no reconstruction. Preserve budget/tombstones. Public recovery method must ignore extra arguments and cannot select mutation.

Observe independently through exact D1 provenance and same primary history; record d1_revocation_observed sequence2 at a retrieval time >=attemptedAt, idempotent historical date. Explicit not-attributed causality because no D1 revocation attempt provenance exists. No closure/global approval/resource release. In-flight write absence stays pending. Original digests and consistent dates enforced on persisted progress; corrupt progress cannot open another attempt.

Implementation: checkpointOwnRevocation internal helper plus two fixed parent methods, no external await after final primary checkpoint. TDD meaningful single-dispatch concurrency and observed state, uncertain commit/restart, absent/foreign/revoked/expiry rejection, recovery ignores caller operation, native DO loss-ACK/restart. Fresh whole-branch review, one fix pass, full suite/lint/build, exact CI before integration. Remote binding/controller separate.
