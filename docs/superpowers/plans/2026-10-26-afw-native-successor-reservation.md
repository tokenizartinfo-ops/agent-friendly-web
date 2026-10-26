# Native successor reservation implementation plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Connect the existing immutable successor reservation to its explicitly opted-in administrative Workflow after native activation confirmation.

**Architecture:** Keep confirm_named default behavior unchanged. A separate literal server flag permits one post-confirmation composition of fixed namespace identity, original retirement RPC/provider evidence and existing primary reservation. Never add a public route, Node launch or retry.

**Tech Stack:** Existing JavaScript, workerd/Miniflare, D1, GitHub Actions; no dependencies.

**Spec:** docs/superpowers/specs/2026-10-26-afw-native-successor-reservation.md

## Global constraints
- AFW only; existing release operator and database; original <=10 minute window and one no-retry step.
- Confirm_named only, explicit AFW_RELEASE_RESERVATION_WORKFLOW_ENABLED='true'; absent/false has no reservation.
- Original fixed actor; candidate idFromName; budget1, immutable history, mayBoot/mayRetry/operationalReadiness false.
- No actual deployment, permission, token, subscription, cron, Container or Max operation from source qualification.

## Review focus
- An opted-in direct RPC or publish must fail before side effects.
- Missing, inconsistent, stale or running predecessor cannot reserve.
- Failed reservation must preserve already accepted activation and disclose uncertainty.
- Expiry/configuration drift during awaits must prevent insertion/false success.
- Restart/lost ACK must not produce another reservation or automatic retry.

### Task 1: Native composition and qualification
**Files:** new lib/mcp-release-successor-reservation.mjs; modify worker/mcp-release/index.mjs and test/fixtures/named-confirmation-native-rehearsal.mjs; new test/mcp-release-reservation-native.test.mjs.
**Interfaces:** server-only reserveReleaseSuccessor({bundle,env,namespace,readCredential,fetchImpl,now}); returns existing afw.successor-reservation.v1 receipt. Workflow uses it only after activation journal confirmation with its original lease.

- [x] Write native positive/default/negative/restart tests using actual compiled operator, Workflow, D1 and namespace; provider and retired-custody RPC remain synthetic boundaries.
- [x] Run RED on GitHub Actions and inspect actual failing assertions before writing production code.
- [x] Implement minimal fixed-target composition and explicit Workflow flag, with sanitized observation points and no legacy change.
- [ ] Run GREEN, lint/build, pinned frozen-module package qualification where affected; inspect exact run/head/steps.
- [ ] Obtain one independent source review, fix material findings with regression checks.
- [ ] Merge only passing reviewed source; verify main CI and record acceptance limits. Do not deploy this change by inference.

## Review/verification ledger
RED c007fd1 CI40400822455/job121845870046: expected missing reservation and guard assertions; legacy default passed. First implementation was accidentally added to a noncompiled path; review found one Important, and CI40401667749/job121848815492 stayed RED. Corrected entrypoint is worker/mcp-release/index.mjs, with duplicate removed. One whole-branch review: 0Critical/1Important/1Minor. Minor deferred: native composition does not yet inject lost post-insert ACK or mutation of flags/DB/namespace during await; existing primitive ACK tests and composed expiry/backward-clock tests remain. No second review requested; required GREEN and main verification still pending.

Dependency: PR602 isolates the documented native RPC Symbol.dispose and updates the Worker-side retirement boundary; PR601 consumes that same strict snapshot. The synthetic-clock change did not resolve the failure, so the positive native fixture again uses actual Date.now and keeps explicit future-evidence denial. Frozen444d remains uncorrected; qualify a new accepted Worker source before live use. Do not merge PR601 until PR602 is accepted.
