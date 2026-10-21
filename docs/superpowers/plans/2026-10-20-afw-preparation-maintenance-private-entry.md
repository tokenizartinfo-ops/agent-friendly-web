# AFW private preparation maintenance Implementation Plan
> Use superpowers:executing-plans inline. No implementer subagents. One fresh whole-branch reviewer at the end.
**Goal:** Separate internal zero-argument RPC composition and build artifact over PB6, unhosted and disabled by default.
**Spec:** docs/superpowers/specs/2026-10-20-afw-preparation-maintenance-private-entry.md
**Base:** a63b16237d76ae333b3883e34523f73d3f69a173
**Constraints:** cloud-only Git branch/Actions; no remote bindings/schema/client/app/policy/window/credential or deployment, PB5 unchanged; no reuse of old release-operator target.

## Review Focus
- Real service-binding dispatch must reach only register/reconcile; public HTTP stays closed even enabled.
- No RPC input selects target/config/SDK/clock; private fields/helper stay inaccessible.
- Fresh instances must share PB6 durable single slot with original policy, no recreation.
- Policy/drift/flag failures must remain sanitized/closed.
- Artifact source/hash/provenance exact; no runtime config/deploy in workflow.

## Task1 — native RPC entry and config-free build
Files: worker/preparation-maintenance/index.mjs; scripts/build-preparation-maintenance-worker.mjs; test/preparation-maintenance-worker-native.test.mjs; .github/workflows/afw-preparation-maintenance-worker.yml.
Consumes: PB6 createPreparationClientMaintenance/options/results; db/preparation-client-bootstrap.sql; accepted mcp-release-source verifier; actual WorkerEntrypoint/service binding.
Produces: default private RPC class register()/reconcile(), closed fetch, isolated compiled artifact.
- [ ] Write native and build tests/workflow before implementation; observe explicit missing-entry and missing-build RED in Actions.
- [ ] Implement minimal production class and build script per spec.
- [ ] Focused native/build GREEN, investigate failures sequentially with real native boundaries.
- [ ] Full npmtest/lint/fivebuilds in GitHub; inspect exacthead output.
- [ ] One fresh most-capable whole-branch reviewer; declined-ruling ledger, one Critical/Important author pass, Minor deferred.
- [ ] Merge expected head under standing owner authority; verify fresh mainCI, preserve receipt/checkpoint.

## Ledger
Ruling: owner authorization settles ordinary design/source/merge decisions; no repeated design approval. Ruling: remote branch and GitHub comments are isolated workspace/ledger, avoiding new local worktree/dependencies per owner cloud preference. Pre-flight: class maps fixed server config to exact PB6 factory; native test installs only PB6 standalone DDL in ephemeral D1; build verifier consumes exact tree before/after; workflow tests/builds that same head. No mismatch found. Future authorization is a binding deployment gate, not a JSON flag or account-membership claim.
