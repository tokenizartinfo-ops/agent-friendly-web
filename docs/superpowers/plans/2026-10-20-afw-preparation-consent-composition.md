# SDD ledger — persisted consent SDK/view composition
Spec: ../specs/2026-10-20-afw-preparation-consent-composition.md
Baseacc130cacf8e463eb4b354bdb49a4156a888dfd1. GitHub/Actions only; no local clone/install/build.
Parent Steps2–3 of 2026-10-19-afw-preparation-consent-mount.md. Using executing-plans/TDD inline. One fresh most-capable whole-branch review; Important/Critical RED then one fix pass/GREEN; Minor ledger/defer.

## Rulings before code
- Reuse and change only CI protocol fixture, no detached production route/auth verifier added. Cost: production host remains a separate source/operational gate.
- Canonical SDK original request hash + explicit persisted metadata replaces synthetic kind/start reconstruction. SDK approval without scope override validates original packet; actual visible subset supplied only to application admission/completion. Cost: pinned SDK API behavior must be requalified on upgrade.
- Capture private stable grantID under exact handle/subject/client/project/resource for cleanup ONLY after this request has fresh acknowledged admission; never use it to resume completion or revoke a competing winner. Unknown store ACK leaves a finite unexchanged grant, no SDK code. Cost: production uncertain-attempt cleanup needs independently verified ownership; do not manufacture it from shared grantID.
- Current PR514 revoker and original opaque lease, SQL trigger store, PR513 view, PR511 policy, PR512 token/MCP composition are reused, no alternate authority.
- Cloud branch/spec/plan/PR/issue ledger substitutes local worktree/sdd scripts by owner cloud-first authorization.

## Tasks
1. Extend actual SDK native tests and install explicit source DDL only in ephemeral runner. Observe meaningful RED: old fixture runs protocol but lacks original persisted row/HTML/fault handling; existing tests retain regression evidence.
2. Replace CI consent path with store/view composition, bounded request hash/original dates and current primary checks. Real ACK faults/cleanup, no mocked database success. Update only legacy deterministic grant-ID assertions to lookup internally generated ID.
3. Full existing Actions test/lint/five builds, plus release build-only. One fresh whole-branch review, ledger findings/rulings, exact tested tree.
4. Merge exact head/tree, fresh mainCI/artifact metadata without download, carrying issue497 checkpoint closes tasks. Source rollback reviewed revert.

## Closure
Accepts only synthetic native SDK/store/view/token/MCP composition. No actual production auth/migration/mount/runtime or PCoff. No support body/OTP, keys, real profile/scope/grant, live Container/events/guard, Max/email action. G2 CLOSED, operationalReadiness=false.
