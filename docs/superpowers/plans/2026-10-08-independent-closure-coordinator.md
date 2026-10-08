# Independent Closure Coordinator Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Prepare a durable write-ahead closure coordinator without mounting or remote activation.

**Architecture:** Trusted storage transactions reserve each effect before invoking a capability outside the transaction. Unknown results remain issued and require separate reconciliation. Administrative restoration is distinct from ledger closure.

**Tech Stack:** Node ESM, node:test; Cloudflare-compatible storage dependency injection.

**Spec:** docs/superpowers/specs/2026-10-08-independent-closure-coordinator.md

## Global Constraints
- No routes, cron, alarms, credentials, SQL remote or deployment.
- One immutable plan per storage instance; callbacks outside transactions.
- No repeated writes after issued/unknown outcomes; no raw errors persisted.

## Review Focus
- Concurrent ticks must not emit duplicate actions.
- Callback success with extra/private fields must not be accepted or stored.
- Restart after a lost response must require intervention.
- completed ledger must remain completed.
- Mismatched plan/invalid persistent state must fail closed.

### Task 1: Finite persistent coordinator
**Files:** Create lib/assistance-independent-closure.mjs, test/assistance-independent-closure.test.mjs and test/assistance-independent-closure-workerd.test.mjs (test-only native DO/alarm fixture).
**Interface:** createIndependentClosureCoordinator({storage,plan,now,revokePlan,closeLedger,restoreAdministration}).tick() -> {state,step}.
- [x] Write failing tests for expiry, ordered receipts, concurrency, missing callback result, restart, changed plan, and malformed storage.
- [x] Run node --test test/assistance-independent-closure.test.mjs; establish missing module failure.
- [x] Implement transaction/get/put write-ahead reservation and strict receipt/state validation.
- [x] Run focal tests and scoped lint; review exact source; record remote gates. Eight tests passed including two native alarms with invocation counts; final identifier fix reviewed and closed. Full1225pass/2platformskip/0fail.
- [x] Commit verified preparation, without remote activation.
