# Task 1: fixed native known-cancellation adapter

2026-11-01 UTC. SOURCE ONLY. operationalReadiness=false.

## Scope and provenance
- PROJECT: Agent Friendly Web.
- REPOSITORY / ORIGIN: tokenizartinfo-ops/agent-friendly-web, public GitHub repository.
- ENVIRONMENT / RESOURCE_ID: branch feat/native-known-cancellation-adapter-20261101 and ephemeral, isolated GitHub Actions fixtures.
- RESOURCE_TYPE: source, tests, branch-only qualification workflow.
- ALLOWED_ACTION: Task 1 reversible source changes and secret-free cloud qualification; no runtime, remote SQL, grant, OAuth, subscription, cron, deployment or Max action.
- ROLLBACK: revert the Task 1 source/test commits on this branch; no runtime/data rollback is needed because none was changed.
- Implementation baseline main: 7163bde8a956f82fe1a55bae1116123c3ee72371, tree b54cdf73a8514cbb21a24c679dd93685e4b5c4fe.
- Assigned docs-only BASE: 34ceda4458aed3b56b3206de4a1f311ed3eb5a61, tree 2dc4b28f5ee3c26fb8ddabac9dfcc6415749f0ec.
- Qualified source HEAD: 6f3bdf102e29ffbc62ab24c8ec4e17ee0ef86cec, tree ce786c36703c0893ee6e4a8b805831b71af88959.
- Final documentation/qualification-workflow removal checkpoint is the commit carrying this ledger; runtime/test blobs remain those of the qualified source HEAD.

## Implementation
Only lib/mcp-release-runtime.mjs and test/mcp-release-known-cancellation.test.mjs change production/test behavior. The production Worker wrapper remains unchanged for Task 2.

The adapter validates the sealed bundle/native invocation before I/O, captures the Date epoch and step method, copies the bundle, and pins only the required flags/DB/namespace references. It never clones or spreads env and does not read credentials before complete primary authorization. It projects the original admission/closure, exact current grant/latest consent, and every NULL-generation closure with LEFT JOINs, bound SQL and LIMIT 2/2/9. Strict rows and bytes, three-way identity joins, two byte-identical snapshots, the existing history compiler and complete primary eligibility all remain mandatory.

The 18 fixed internal hook names share a permanently invalidatable request. The module-private WeakSet lease is registered before the first await, checked in runtime current/remaining, inherited by the operator, and removed at settlement. Forged/copy/retired leases fail; callers omitting requestLease retain the generic behavior. The original event ceiling min(policy.expiresAt,event.timestamp+70000) includes queue/projection/hook time and narrows the existing step ceiling. Existing activation20s/reservation5s machinery and atomic reservation/history predicates are unchanged. The adapter checks the final outer step result and races uncertainty to its original deadline. Issued remote operations are not claimed cancelled.

## Rulings
Root confirmed the actual native WorkflowEvent timestamp is Date. No integer fallback, arbitrary event.signal or invented deadline carrier is accepted as authority. Workflow name metadata is not rejected. Native WorkflowEvent currently establishes no tighter-parent carrier; any future real trusted carrier needs explicit integration. The internal parent signal and same-module lease are used now.

Raw primary identity/history remains ephemeral and private; tests use synthetic identities only. No raw error/provider/primary data is returned. Existing current consent validation, own-row post-write allowance, journals, closure records and global slot are preserved.

## TDD and cloud evidence
- Initial tests-only RED: b0996da99a9e1a8e501d6f91f1ce771a0442dcb4, tree7d2b5be47b18c2aa6893512539948f337c66af84; [run41307627483](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/41307627483), job124851166439. 31 failed, 0 passed. Missing export and forged lease reaching the step were meaningful failures; three fixtures also used impossible FK mutations and were corrected.
- Corrected/expanded tests-only RED: 1b27c595f8e9477dd204059bdb92ca214c5e03ed, tree653ce8d2a537c38bfefdb2f6a046d24bb0aeb927; [run41307794542](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/41307794542), job124851670165. 34 failed, 0 passed; no FK/setup failure.
- First implementation f800dd80586e5a4e4b9aae6f06dc4a5996a9f544 / [run41307889354](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/41307889354): 32 passed, 2 fixture-startup failures. The test builder needed the existing rehearsal's named RPC entrypoint; no runtime permission was added.
- Expanded native qualification f132942855ddb8fbd58d205efc82118c9e122123 / [run41308041696](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/41308041696): 42 passed, 1 fixture-settlement race. Native success recorded 26 eligibility checks/110ms and retained exactly one reservation; lost acknowledgement retained all three activation journals. The reentry test now awaits its already-aborted background check before asserting both answers.
- Final GREEN: 6f3bdf102e29ffbc62ab24c8ec4e17ee0ef86cec / [run41308226897](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/41308226897), job124852949395. Adapter43 PASS; related regressions153 PASS; 196 total, 0 failures, 0 skips. Scoped eslint succeeded without diagnostics. Actual isolated native measurement26 eligibility checks/143ms, not an assertion that live provider latency will fit. Related command: node --test test/mcp-known-cancellation-native.test.mjs test/mcp-qa-named-eligibility.test.mjs test/mcp-qa-named-eligibility-native.test.mjs test/mcp-release-workflow-native.test.mjs test/mcp-release-reservation-native.test.mjs.

The branch-only push workflow uses Ubuntu24.04/Node22, read-only repository permissions, checkout without retained credentials, npm ci --ignore-scripts --no-audit --no-fund, isolated workerd/D1, focused tests and scoped eslint. It has no protected environment, secret reference, live endpoint or workflow_dispatch and is removed by the final checkpoint. No local file/source/temp/clone/dependency/build/process was used.

The private closure tests deliberately instrument a cloud-only in-memory test copy to inspect all18 names, reentry and retired/copy leases. They are not native integration evidence. The separate native Workflow/D1/retirement tests import the unchanged production module and use the actual current eligibility compiler/atomic reservation path; synthetic provider replies are not live authority.

## Self-review and limits
Self-review checked selective env pinning, exact identity joins, visible missing/foreign cancellation joins, immutable history capture, lease invalidation/retirement, final settlement, sanitized failures and unchanged generic callers/SQL/ledgers. Root owns the separate fresh review; do not infer its acceptance from this ledger.

Task 2 must wire only confirm_named+reservation in the existing wrapper and migrate all corresponding mounted synthetic fixtures to complete original/current grant/monitoring history, preserving custody-failure-stage and journal-retention assertions. No authorization-free fallback.

Tests/build source evidence does not prove current deployed bindings, operator profile, consent, custody availability, useful delivery, guard operation, physical stop, ACK cancellation, PC-off operation or Max. Finite N1/R1 cleanup and actual promotion remain separate.
