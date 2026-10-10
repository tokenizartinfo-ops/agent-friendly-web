# AFW primary consumption: one new-work dispatch

Base10dc3cda/PR378. Parent Task3. Delegated own source work only, unmounted, no bindings, schedule, keys or clients. Scope is a single occurrence admission budget, not closure authorization.

Fixed administrative D1 reader supplies snapshot before primary transaction. Full pinned approval/nonrevoked provenance must match finalized receipt and write_started intent. Require an existing finalized receipt; consumption never creates it. Consume once in SAME SQLite transaction as reservation/intent/withdrawal authority. Store immutable consumed receipt with unique admission ID and finalization digest; first acknowledged transition alone returns an ephemeral dispatch locator. Reading history, duplicate consumption and ACK loss never reconstruct dispatch. Uncertain commit is pending recovery, never retry budget reset.

After last external pins await, final primary validation must reject withdrawal and receipt/intent mismatch before returning locator. Checkpoint semantics: withdrawal serialized before admission blocks it; later withdrawal prevents future admissions and does not retrospectively certify cancellation of already admitted work. D1 snapshot is historical and cannot provide DO-D1 atomicity; independent later D1 revocation must be handled by runtime/closure. No bearer capability from digest or locator; internal orchestration only.

Keep consumed metadata after withdrawal/expiry for recovery. Reject coherent corrupted history that consumes before finalization, after deadline or after reservation/intent withdrawal. Reader history is not authority. Close/compensation after expiry remains a distinct own-only contract; do not weaken live admission deadlines or wire the legacy catalog unchanged.

RED tests: unfinalized/withdrawn/revoked/foreign denies, three callers at most one locator, ACK lost no repeat, withdrawal during D1 observation or postcommit pins reread, expiry, native restart preserves consumed state and no re-dispatch; legitimate prior history retained and contradictory date rejected. Fresh whole-branch review once, one RED-GREEN correction pass. Full/lint/build before integration.
