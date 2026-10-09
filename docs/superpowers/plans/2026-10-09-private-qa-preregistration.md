# Private QA preregistration

Required execution: executing-plans inline, TDD and one final fresh review. Existing own AFW worktree; standing authorization, no customer/remote mutation.

Goal: persist operator-pinned V2 registration/fullapproval before challenge or catalog installation, without depending on either. Internal factory createPrivateQaPreregistration({storage,readPreregistration,now}) returns register(), read(), readForClosure(), withdraw(). No HTTP/RPC/Worker export. Trusted synchronous readPreregistration supplies exactly registration/approval (thenables rejected); method arguments never select pins.

One primary store holds one immutable record and permanent withdrawal marker. register validates full approval/baseline, current finite window and rereads trusted source before transaction writes and after commit acknowledgement. Never replace/reissue/adopt an existing record even if identical; unknown acknowledgement requires operator reconciliation. read returns pins only while active/window/source unchanged; readForClosure validates stored pins and preserves them after expiry, withdrawal or missing current source, but is not authority for admission. withdraw preserves immutable record/history; no deletes, clearing or resource-release. Time cannot regress within one instance. Transactions fence reads and withdrawal coherently.

- [x] RED: missing implementation; trusted-only registration, caller ignored, restart/duplicate conflict, invalid approval/source mutation, deadline, permanent withdrawal and closure history, lost ACK preserved without retry.
- [x] GREEN: minimal internal primary registry; reuse full V2 validators, exact own data shape, no side-effecting getters.
- [x] Verify focused and full tests/lint/build, independent review, record next actual host mounting/provider/evidence/reservation gates.

Boundary: register stores administrative preregistration only; no provisioning proof, resource reservation, receipt of service authentication, installation or closure is claimed. readForClosure cannot be wired to installer. Source/methods are private administrative dependencies; no client body supplies them. Actual host must perform fresh reads with withdrawal fencing, not cache a snapshot as authority. Runtime mount remains a separate step with rollback and real provider/source evidence.
