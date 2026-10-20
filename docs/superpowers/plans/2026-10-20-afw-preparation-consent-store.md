# SDD ledger — plan: docs/superpowers/plans/2026-10-20-afw-preparation-consent-store.md
Spec: ../specs/2026-10-20-afw-preparation-consent-store.md
Basef00affa4b41aef69998c588a1966a58cbafed51e/treec5d529f61c6646b82c211d8d4673ce6f024c23d8. GitHub/Actions ONLY.
Using executing-plans/TDD inline. Fresh whole-branch review once; Important/Critical one RED->fix/GREEN pass, Minor ledger/defer.

## Rulings/preflight
Ruling: same existing authorization grant table, separate explicit consent metadata table OUTSIDE drizzle — current schema lacks fields; do not overload kind or change G2. Cost if wrong: future additive migration must revise this candidate; no remote schema installed.
Ruling: reserved->admitted AFTER trigger creates grant in ONE conditional UPDATE statement — stronger than separately acknowledged consumes/inserts. Cost if wrong: must qualify exact SQLite/D1 trigger/rollback semantics; no runtime until native acceptance.
Ruling: original opaque request lease REQUIRED per factory/request — avoid resetting body/auth budgets in later store calls. Caller still authenticates data; lexical hashes/IDs confer no authority. Cost if wrong: future HTTP adapter must supply the existing internal lease, not JSON.
Ruling: existing grant revoker remains separate; inspect detects its result without new consent-state mutation — withdrawing must not depend on draft schema/domain staying healthy. Cost if wrong: full SDK revoke integration remains a separate tested host block.
Ruling: remote branch/PR/issue ledger replaces local worktree/sdd scripts under owner cloud-first preference; no local clone/build/install. Source rollback only reviewed revert.
Interfaces: policy511 original dates/scopes -> persisted table -> actual-scope grant/513view;512SDK separate and never a source of synthetic profile metadata. Preparation schema505 exact checker prerequisite for positive decisions; primary owner/claim/revision rechecked SQL; request lease508 shared across all awaits.

## Tasks
1. Add behavior tests and in-memory SQL fixture first. Observe RED for missing new store/schema, existing full suite mandatory. No import-error-only acceptance; explicit missing factory assertion.
2. Implement module/schema SQL outside drizzle; no other production importer. Native D1 fixture/test for actual trigger/CAS/rollback. Real memory DB; fault hooks before or AFTER actual DB side effect only, no mocked success.
3. Full CI npm test/lint/five builds in existing Actions, inspect completed logs. One fresh most-capable whole-branch reviewer; rule/fix findings once, no review loop.
4. Exact tested tree/head merge, fresh mainCI, sanitized artifact metadata/no download, issue497 checkpoint. Carrying receipt closes pending ledger without docs-only churn.

## Completion
Only detached persisted consent/application-grant primitive and runner acceptance. No live scope/client/grant, migration, mount, Access/CSRF/SDK issuance/remote container/events/guard/PCoff/Max acceptance. No credentials/support case/body/OTP read or send in this source block. operationalReadiness=false.
Native D1 schema import uses exact source DDL in ephemeral runner; it is not remote migration permission. Preserve old grant/project/capsule history; no network beyond runner build dependencies, no model/payment.

Ruling: an acknowledged pending->reserved attempt is required BEFORE the one-statement grant transition — unknown ACK cannot be retried from another request, even after a rejected grant insert rolled back. It stores a proposed choice only, not a grant. Cost if wrong: reserved attempts require explicit cancel/new visible consent; no automatic recovery/code issuance.

## Task1 observed RED
Headc781d8830afea1ffb86a59e00bba2c05d925d954 / CI39353246217/job118402091627:2324PASS/22newFAIL/1existingSKIP. All new cases fail explicit missing closed store assertion; no existing regression. Task2 implementation/native runner candidate now follows; final acceptance pending carrying receipt.
