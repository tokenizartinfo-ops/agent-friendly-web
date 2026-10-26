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
**Files:** new lib/mcp-release-successor-reservation.mjs; modify worker/mcp-release-operator/index.mjs and test/fixtures/named-confirmation-native-rehearsal.mjs; new test/mcp-release-reservation-native.test.mjs.
**Interfaces:** server-only reserveReleaseSuccessor({bundle,env,namespace,readCredential,fetchImpl,now}); returns existing afw.successor-reservation.v1 receipt. Workflow uses it only after activation journal confirmation with its original lease.

- [ ] Write native positive/default/negative/restart tests using actual compiled operator, Workflow, D1 and namespace; provider and retired-custody RPC remain synthetic boundaries.
- [ ] Run RED on GitHub Actions and inspect actual failing assertions before writing production code.
- [ ] Implement minimal fixed-target composition and explicit Workflow flag, with sanitized observation points and no legacy change.
- [ ] Run GREEN, lint/build, pinned frozen-module package qualification where affected; inspect exact run/head/steps.
- [ ] Obtain one independent source review, fix material findings with regression checks.
- [ ] Merge only passing reviewed source; verify main CI and record acceptance limits. Do not deploy this change by inference.
