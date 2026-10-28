# Successor retirement handoff implementation plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Preserve the original successor retirement proof privately before administrative restoration and re-observe the same stopped provider process afterward.
**Architecture:** A detached, write-once private-storage handoff wraps the existing retirement evidence reader for capture. A separate read-only observation brackets two provider reads with two immutable storage reads; no production host changes.
**Tech Stack:** ESM, Node22, node:test, Miniflare/workerd in GitHub Actions.
**Spec:** docs/superpowers/specs/2026-10-28-successor-retirement-handoff.md

## Global constraints
- Source/CI only; fixed AFW application, no new runtime binding, credential, namespace, route, alarm, Workflow, grant or reservation.
- One original deadline <=5000ms; no historical authority renewal, overwrite, reset or mutation retry.
- mayRestoreAdministration=false and operationalReadiness=false in every outcome.
- Scope isolation: remote feature branch from114c06fa; no PC dependencies/build; existing independent-closure QA state untouched.

## Review focus
- Concurrent different captures must not overwrite the first process generation.
- A lost storage ACK must not produce a positive capture or retry.
- Storage mutation during provider awaits and mutable metadata must fail closed.
- Reusing historical evidence must not silently change its capturedAt or permit restoration.
- Timer starvation, hung readers, backwards wall/monotonic time and late completions must not emit a post-deadline write/success.

## Task 1 — private handoff and qualification
Files: create lib/mcp-successor-retirement-handoff.mjs, test/mcp-successor-retirement-handoff.test.mjs, test/mcp-successor-retirement-handoff-native.test.mjs.
Consumes: createRetirementEvidenceReader({original,readCustody,readInstance,now,timeoutMs}).observe(), RELEASE_TARGET.namespaceId, private storage.transaction.
Produces: createSuccessorRetirementHandoff(...).capture()/observe(), exact dated non-authorizing DTOs.

- [x] Commit spec/plan and tests first. Test imports missing module inside a test so CI fails for the absent feature, not a harness syntax error.
- [x] Observe RED in Actions; preserve run/head and expected missing feature failure.
- [ ] Implement strict snapshots, original candidate validation, bounded callback signal, one original monotonic lease, immutable storage schema and transaction admission.
- [ ] Implement capture using actual existing reader, compare both primary projections, atomic write-once match and explicit unknown ACK.
- [ ] Implement observe with two storage and two provider observations, fresh process readback and preserved historical timestamp, never original RPC or provider mutation.
- [ ] Add native workerd storage recreation/concurrency/lost-ACK fixture; keep synthetic authority clearly isolated in tests.
- [ ] Run complete npm test, lint, build in Actions and inspect every output. Existing warnings/skips remain named.
- [ ] Dispatch one fresh whole-branch reviewer with spec/plan/review focus. Material findings RED/GREEN + full CI; minor findings ledger/defer.
- [ ] Integrate source if checks pass and save source/CI/checkpoint. No remote deployment or live acceptance claim.

## Ledger
Pre-flight: existing retirement reader establishes custody/provider proof; handoff adds private persistence without altering reader semantics. Independent controller/adapters and restoration authority are deliberately a later block, not implicitly implemented here.
Ruling: Use an isolated remote branch and Actions rather than creating a local worktree, workspace, dependencies or build, honoring the owner's cloud-first instruction. Git commits and PR/issue497 are the durable ledger.

Task1 RED: head3d3e2f5785d7e7c6a29ffd73ce5dbe3c867c38ad, CI40718908159/job122924095804:3074PASS/11expectedMissingFeatureFAIL/1existingSKIP. Native build and behavioral imports identify only the absent handoff module. The temporary trivial export sentinel is removed from final tests; substantive behavior/native cases remain.
