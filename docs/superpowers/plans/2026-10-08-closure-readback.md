# Closure Readback Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Recover a verified ambiguous closure outcome without reissuing its write.
**Architecture:** Optional trusted readback capability observes the current issued step outside the transaction; CAS advances exactly that persisted step. tick retains sole authority to reserve subsequent writes.
**Tech Stack:** Node ESM/node:test and existing native Durable Object fixture.
**Spec:** docs/superpowers/specs/2026-10-08-independent-closure-coordinator.md (readback amendment).

## Global Constraints
- Internal/unmounted; no provider API credentials, resources or remote mutation.
- Missing/ambiguous/error readback does not clear issued or repeat writes.
- complete still requires restored administrative readback.

## Review Focus
- Two concurrent reconciliation calls must not skip a step.
- Lost storage commit must not permit repeated writes.
- Extra fields and mismatched step receipt must fail closed.
- Ready/complete states must not invoke readback unnecessarily.
- Final administrative ambiguity must require exact restored constance.

### Task 1: Trusted readback and CAS recovery
**Files:** lib/assistance-independent-closure.mjs, test/assistance-independent-closure.test.mjs; native fixture in test/assistance-independent-closure-workerd.test.mjs.
**Interfaces:** Optional constructor readIssuedReceipt({occurrenceId,baselineRef,closeAt,step}); reconcile()->{state,step}.
- [x] Establish red tests: reconcile is not a function; no repeated write; mismatched/unknown/error results remain issued.
- [ ] Implement strict callback validation and read-only reconciliation outside transaction with exact index/phase CAS.
- [ ] Test concurrent recovery, ready/complete no unnecessary read, and final admin recovery; focal/scoped lint and review.
- [ ] Commit and record exact acceptance and remote limits.
