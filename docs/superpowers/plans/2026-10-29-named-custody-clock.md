# Named custody future boundary implementation plan
REQUIRED: superpowers:executing-plans inline, TDD, one fresh whole-branch review.
Spec: docs/superpowers/specs/2026-10-29-named-custody-clock.md
Base6257fb7ac0238f15f6b69d67fbfda920a175b0c1; remote isolated branch diag/named-custody-clock-20261029.
1. Native future fixture test must show missing custodyClock in exact built named Workflow (RED). Malformed time fixtures remain rejected.
2. Pass only numeric fields from original custody comparison into existing bounded observation; no authority or comparison change. Verify GREEN/full tests/lint/build/operator artifact.
3. One whole-branch review, address material findings, merge reviewed green head and verify main.
Ledger / Ruling: owner cloud-first instruction overrides local workspace scripts; source/ledger/tests/builds stay on GitHub/Actions. No local clone/build/dependencies.
Pre-flight: reservation trace produces two clock values; existing named observation consumes numeric-only detail. Both components must change together; snapshot resets per-stage metrics. Existing future/staleness admission and disposal remain outside the change.
Task1 prepared RED tests, no production implementation. No remote trial or deploy by this branch.
