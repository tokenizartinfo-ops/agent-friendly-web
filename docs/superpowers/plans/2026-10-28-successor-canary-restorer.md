# Fixed canary restoration coordinator implementation plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement a detached private coordinator that restores one fixed canary version once after qualified retirement, preserving the closed operator.
**Architecture:** Server-only finite control + fresh private handoff + pinned metadata observations + private issued-before-effect journal. Fixed Cloudflare request specs; no host or transport credential setup.
**Tech Stack:** Node22/ESM/node:test, workerd/Miniflare, GitHub Actions.
**Spec:** docs/superpowers/specs/2026-10-28-successor-canary-restorer.md

## Global constraints
- Fixed account/canary/operator/Workflow/D1/KV/DO identities; source/CI only.
- No caller selectors, new runtime/credential/grant/reservation/alarm/namespace or token movement.
- Policy<=10minutes; original administrative invocation<=30000ms; handoff freshness<=5000ms; no consent renewal.
- At most one canary deployment POST, never an operator mutation; no retry/reset/delete of issued records.
- All outcomes deny successor start, native-withdrawal proof and operational readiness.

## Review focus
- Concurrent/recreated coordinator invocations and lost storage ACK must not duplicate dispatch.
- A selected version or source/context change after qualification cannot be silently adopted.
- Primary metadata and handoff mutations across awaits must not change captured qualification.
- Timer starvation/final continuation and policy withdrawal cannot turn late results into success.
- Partial pages, flags enabled in a claimed closed version, or wrong DB/namespace must block before dispatch.

## Task1 — coordinator and real storage qualification
Files: create lib/mcp-successor-canary-restorer.mjs; test/fixtures/canary-restoration.mjs; test/mcp-successor-canary-restorer.test.mjs; test/mcp-successor-canary-restorer-native.test.mjs.
Consumes: fixed RELEASE_TARGET, snapshotOwnWorkerExecution, exact PR628 handoff observation and private storage.transaction.
Produces: createSuccessorCanaryRestorer(...).advance(), restorationConfigurationHash(metadata).
- [ ] Commit spec/plan and behavioral/native tests before implementation; observe missing-feature RED in Actions.
- [ ] Implement bounded primitive snapshots, strict private policy/namespace, configuration/module/resource checks and passive observation.
- [ ] Implement immutable issued/complete journal, one exact canary-only POST, primary readback, unknown-ACK no retry and original final-clock fences.
- [ ] Exercise concurrency/recreation and ACK loss over native private storage/provider boundary; prove no production hook is added.
- [ ] Full npm test/lint/build and build-only Actions checks; inspect exact results.
- [ ] One fresh whole-branch review; author fixes material findings by RED/GREEN/full suite; defer minors.
- [ ] Integrate accepted source and verify identical main tree/CI; record gates and source/runtime distinction.

## Ledger
Pre-flight: the handoff's false mayRestoreAdministration is deliberate; separate private finite control supplies restoration authority. The ordinary operator must already be closed, so no dependency on self-redeployment remains.
Ruling: remote Git branch/Actions replaces local skill workspace/worktree/build under the owner's explicit cloud-first preference. PR and issue497 are the durable ledger. No deployment or live control is authorized merely by this source block.

RED observed8c94eedd/CI40728412939/job122957810303:3088PASS/13expected missing-featureFAIL/1existingSKIP. A scoped primary metadata GET28oct16:43:37UTC confirmed operator version855dc5c1 omits exports/containers, while canary6a0c97e9 declares only AfwOwnEventNode/linked Container; fixtures now model the optional operator fields and actual final two false canary flags. No runtime mutation. Implementation begins only after this RED; GREEN/full/native pending. Attachment failed at the app100-attachment cap; no unrelated artifact removed.
