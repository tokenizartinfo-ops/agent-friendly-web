# Private closure publisher qualification implementation plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox syntax for tracking.

**Goal:** Prove the private publisher can select the same closed canary without opening a lifecycle.
**Architecture:** A separate mode in the existing finite reader transport and Workflow host. Distinct authority and receipts, shared bounded parsing/transport and immutable fingerprint checks.
**Tech Stack:** Node22, native workerd/SQLite/Workflows, Cloudflare APIs, GitHub Actions.
**Spec:** docs/superpowers/specs/2026-10-29-private-closure-publisher-qualification.md

## Global constraints
Fixed AFW resources;10minute policy;30second original deadline;5second request cap;4MiB response;one durable POST;zero retries;no force;source-only branch. Existing reader stays seven GETs. operationalReadiness=false.

## Review focus
1. Accepted write with lost ACK must not be replayed or mislabeled qualified: cover provider and storage ACK loss.
2. Flag/policy/credential withdrawal after suspended await must prevent subsequent effects: test final prewrite read and final journal continuation.
3. Concurrent or recreated actors must share durable intent: parallel calls and native SQLite recreation.
4. Successful status but wrong receipt/annotation/pins must not qualify: malformed ACK and mismatched final reads.
5. Existing read mode must never read publisher credentials or write: run full prior reader tests plus throwing publisher getter.

### Task1: finite publisher mode and native wiring
**Modify:** lib/mcp-closure-reader-probe.mjs; worker/independent-closure/index.mjs.
**Create:** test/fixtures/closure-publisher-probe.mjs; test/mcp-closure-publisher-probe.test.mjs; test/mcp-closure-publisher-probe-native.test.mjs.
**Interfaces:** createPrivateClosurePublisherProbe({env,ctx,fetchImpl,now}).run(planHash) returns sanitized data; runPrivateClosurePublisherProbeWorkflow({env,event,step,now}) accepts only operation mcp_closure_publisher_probe and planHash. DO runOwnClosurePublisherProbe returns JSON string. No public route.
- [x] Add failing assertions for absent factory/Workflow; focused CI must show missing callable, not import/tool failure.
- [ ] Add minimal separately scoped mode, preserving reader defaults. Match fixed snapshots and fresh deployment before one POST, then independent readback.
- [ ] Verify positive qualification, closed/wrong scope, drift, active processes, schedules/tails, concurrency, dropped ACK, timeout/control change, receipt mismatch, sanitization and readonly regression.
- [ ] Exercise actual production Workflow/DO/SQLite through Miniflare; default closed, onePOST and recreated history, HTTP404.
- [ ] Full npm test/lint/build and existing package builds via GitHub Actions.
- [ ] Fresh whole-branch review; fix Important findings with RED/GREEN; log Minor rulings.
- [ ] Merge only verified head; update release checkpoint with source and remaining remote gates.

## Rulings and execution
Owner explicitly delegates routine design and uninterrupted execution and prefers cloud. Use a remote branch and Actions, no local clone/build/dependencies; no repeated design approval or local worktree scripts. Existing remote custody is preserved. Review by fresh capable agent is required by executing-plans; no parallel implementation agents needed. Self-review: all spec conditions mapped to Task1; receipt interfaces use existing conventions; no additional product feature or public API.

## Ledger
Preparation only. RED/GREEN/review receipts will be appended during execution.

29oct12:07UTC RED: commit a3e6354, CI40870562353/job123436212600:9FAIL (publisher factory missing),1PASS (existing reader no publisher getter). No implementation existed. Shared interfaces: Workflow calls fixed DO method returning primitive JSON; distinct policy/journal mode pins preserve reader contract. Remote workspace branch substitutes local scripts under owner cloud-first instruction.

29oct12:11UTC initial GREEN attempt a602746 failed in focused CI40870982677/job123437660305 before HTTP. Root cause: inherited monotonic-local variable m shadowed the new mode configuration m in current(). Renamed the configuration settings; the already-failing positive reader and publisher/native tests reproduce this exactly. No runtime deployment.

Final review29oct: fresh Astra review of0ff199f..d5bc9b2,0Critical/1Important/1Minor, declined[]. Important: native Workflow converts actor uncertainty with null observedAt into blocked/nullhash. Add composed final-journal ACK-loss regression before fixing. Final: Ruling: regrade final-journal withdrawal validation gap as part of this Important uncertainty bug — flag/policy withdrawal at that same boundary also yields blocked after accepted POST, so cover it in the same RED/GREEN fix; not a new feature or second review pass. Cost if wrong: a conservative uncertainty result where no new write occurred, never a repeated write. No deferred minors.
