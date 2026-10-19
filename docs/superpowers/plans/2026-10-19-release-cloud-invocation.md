# AFW administrative cloud invocation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox syntax. Owner explicitly chose autonomous inline execution and cloud-first work; no per-stage permission prompts.

**Goal:** Execute the existing closed publication through a finite native Workflow without exporting its credential.
**Architecture:** Add AfwReleaseWorkflow to the SAME private operator and share its existing run implementation. API-only, publish-only, exact compiled hash/id, dual flags, original deadline and existing D1 budget; no automatic replay.
**Tech Stack:** ESM, Workers/Workflows, Miniflare, primary D1, existing GitHub CI/build.
**Spec:** docs/superpowers/specs/2026-10-19-release-cloud-invocation-design.md

## Global Constraints
AFW account85d0d5dadac3341a564f22ce885e9eec, current sourcef7d2528a. No local clone/install/build or persistent process. GitHub branch/API editing and Actions testing; no runtime, credential, schema, Container, cron, OAuth, Max or mail changes. Old expired operator plan NEVER invoked.
One final whole-branch independent reviewer. Preserve source-only and hosted evidence boundaries. Existing journal enforces original consumed publication budget across workflow restarts.

## Review Focus
- Closed/missing new opt-in must deny before provider/D1 access.
- A valid hash under a foreign instance or extra payload must cause no upload.
- Provider delay must not revive an expired original window.
- Lost provider ACK/restart must not issue a second upload.
- Workflow complete with blocked/uncertain output must not be treated as accepted publication.

## Task1: Native Workflow admission and existing publication
Files: modify worker/mcp-release/index.mjs and .github/workflows/afw-release-operator-build.yml; create test/mcp-release-workflow-native.test.mjs; add source-only checkpoint toAGENTS.
Consumes: compiled bundle and existing operator/publisher/journal; checkOwnCronProvider with manual redirect adapter. Produces: native AfwReleaseWorkflow.run(event,step), same RPC behavior.
- [ ] Write native Workflow+D1 tests with synthetic fixed provider boundary for all Review Focus conditions, positive publication/receipt and provider denial.
- [ ] Commit tests/spec/plan on isolated cloud branch and observe RED in Actions from missing Workflow export. Do not implement until that failure is read.
- [ ] Extract existing operator body to shared function without changing its guards; add Workflow with dual flags, publish/hash/id/deadline admission, provider gate and one no-retry step. Project safe receipt, never raw errors.
- [ ] Include provider checker in build workflow dependency paths; no config activation or new secrets.
- [ ] Run full existing npm test/lint/build plus actual packaging in Actions. Confirm old RPC tests and native Workflow cases. Preserve exact logs, head/tree/artifact.
- [ ] Final whole-branch review; judge exclusions, reproduce meaningful findings RED before fixes, then full GREEN. Merge ordinary expected-head and verify main CI.

## Ledger
Preflight: basef7d2528a/treee3a66466; existing private operatorbcf9afc4 closed, canaryf8feb421 unchanged per dated receipt. Source-only implementation, no remote acceptance inferred.
Ruling: skill filesystem helpers are not run on Gabriel's PC; GitHub commit/run/job/check receipts below replace local worktree/ledger helpers under explicit cloud-first instruction. No implementation subagents; only final reviewer required by skill.
Task1 RED: d6a3d8f/CI39299305057/job118219969290 observed18:06UTC.2126PASS/16FAIL/1SKIP; all new native cases fail because AfwReleaseWorkflow export is absent. Existing suite unchanged GREEN.
Ruling: expiry-during-provider test uses controlled native Worker Date.now at HTTP return, instead of wall-clock delay vulnerable to suite contention. Same admission/zero-journal assertions, no production test hook; does not prove hosted timing.
Ruling: after Workflow registration, recovery must retain AfwReleaseWorkflow and AfwReleaseOperator; pre-registrationbcf9afc4 alone is not assumed compatible. Verify inert closed accepted-source recovery before any real window.
Task1: implementation prepared, GREEN pending.
