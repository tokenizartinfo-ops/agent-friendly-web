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


## Final whole-branch review and rulings
One fresh read-only reviewer at971b4ce8 found0Critical/1Important/2Minor. Important: incomplete passive inventories can qualify a deployment. Accept and reproduce before correction. Cloudflare OpenAPI28oct confirms instances-v2 cursor result_info {per_page,page_token,next_page_token}; schedules/tails schemas declare no pagination. Ruling: require typed first-page Container metadata matching requested per_page100 and no continuation; permit absent schedules/tails metadata, but reject explicit partial or contradictory pagination for all three kinds. Do not automatically paginate or add provider writes. Cost if wrong: a newly changed provider response blocks closed/uncertain and requires explicit future investigation, rather than authorizing from incomplete evidence.
Minor unused OP import becomes used by the required fixed-operator schedule/tail regression cases; no separate polish change. Minor deferred: direct asynchronous mutation regressions for already-returned primary metadata/handoff objects; implementation snapshots were inspected, but this extra coverage is deferred to actual host wiring.
Rulings on behaviors set aside: provider CAS is unavailable, so exclusive approved window plus dated before/after observations stands; concurrent complete-row readers may both succeed while effect count remains one. Issued/ACK-loss ambiguity intentionally never retries or adopts a deployment as complete. Secret-shaped malformed fingerprint input is not authorization and is never logged/persisted here; typed runtime metadata validation remains mandatory, and host input handling must enforce secret-value exclusion. Transport authentication/response limits/cache/redirect behavior and actual PR628 observer wiring are unimplemented dependencies, so no hosting/readiness claim is allowed. Native journal recreation is synthetic-provider qualification only; native unsubscribe, original actor retirement, consent, real deployment and PC-off remain gates. Costs if wrong are hidden provider conflict or unsafe future wiring, hence these are explicit acceptance constraints before any live proposal, not claims proved by this source.

Primary bounded metadata read28oct17:35:56.092UTC (no writes): fixed application's active list200/0 rows/result_info{per_page:100}; both scripts schedules/tails200/0 rows, no pagination returned. This validates the expected metadata form without asserting selected versions or original-process retirement. RED d740727b/CI40737162119/job122988692661:3104PASS/21FAIL/1existingSKIP. Incomplete pre-dispatch inventories wrongly reported restored_observed; partial post-dispatch readbacks also wrongly reported success. The material correction checks typed empty-page completeness at both qualification phases, preserving issued uncertainty after a dispatch. GREEN/full pending.
