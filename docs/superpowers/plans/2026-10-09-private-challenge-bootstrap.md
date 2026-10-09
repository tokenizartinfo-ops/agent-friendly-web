# Authenticated challenge bootstrap

Execute inline with executing-plans, TDD and final fresh review. Existing AFW worktree, standing own-QA authority.

Goal: allow a fixed authenticated service to request a single challenge under complete administrative pins already authorized by the operator, without an administrative HTTP/RPC endpoint or catalog dependency.

Architecture: extend createPrivateChallengeHost with allowChallengeRequest=false and optional trusted prepareExchange(identity) callback. Default behavior unchanged. With explicit true, the callback is mandatory and must check the immutable preregistration from its own source, never client payload. The host authenticates/limits/parses first, checks pinned approval.identityRef equals authenticated principal, then invokes prepareExchange before either request or confirmation and again before returning. Exact JSON {challenge:'request'} requests emission; normal {nonce} confirms. Extra fields never trigger emission. Single issue CAS remains unchanged; lost ACK cannot issue again. Callback true is a trusted dependency result, not a provisioning proof and never passed to installer. The provided createPreregisteredExchangePreparation adapter uses current preregistration.read twice and compares current pins. Registration is an explicit prior operator action, never performed by a consumer request; closure history is never active authority.

- [x] RED default denies request, explicit configured request/confirm works once, wrong JWT never prepares, missing preparation denies, principal mismatch denies, withdrawal during prepare/issue/postcheck denies response without reissue.
- [x] GREEN minimal host extension; recheck service/config/time throughout callbacks.
- [x] Focused/native and full tests/lint/build; independent review; describe remaining actual deployment, provider identity, evidence/reservation and PC-off gates.

Ruling: historical no consumer issue route is narrowed only by explicit operator option. Requesting a nonce under prior complete authorization is not approving/registering from client input or installing. Cloud design review01a1218a accepts this distinction, with one-shot CAS and uncertainty gates. No Worker/routing/binding/credentials altered by this source block. Runtime wiring requires a real trusted preregistration callback and closed rollback, never callback constanttrue as authority.

Ruling: avoid materialization during consumer exchange entirely. The adapter requires prior operator registration, removing ambiguity around failed registration acknowledgments and approval creation. This is stricter than the reviewed optional materialization path and costs one explicit internal bootstrap step. Native SQLite DO exercises concurrent request/confirm and permanent preregistration withdrawal.

Verification: 12 focused/native tests passed. Full suite 1378 passed, 0 failed, 2 skipped; lint/build exit0. A final malformed-principal guard was added during the full run and its 11 unit tests rerun successfully; CI will validate final committed source. Fresh whole-branch review and guard follow-up found no P1/P2. Remote GET inventory16:54:39Z unchanged, no mutations.
