# Private named authorization fences Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add optional server-owned authorization fences to named confirmation without extending child leases or weakening journals.
**Architecture:** Constructor-only exact-true callback inside existing effect-owning components, followed by their original synchronous assertion. No async D1/RPC proxy.
**Tech Stack:** ESM, Miniflare/workerd, real local D1 fixtures, GitHub Actions.
**Spec:** docs/superpowers/specs/2026-10-30-private-named-authorization-fences-design.md

## Global Constraints

- Hook admitted only for confirm_named; absent hook leaves legacy behavior/await order unchanged.
- Exact true required; payload/RPC cannot provide hook, mode, evidence or source.
- Original parent and child clocks, timeout caps, SQL/predicates and budget1 unchanged.
- Qualified native receipt boxing unchanged; no raw RPC result returned through a new async adapter.
- Source/CI only; no runtime, credential, grant, guard/history, Max or PC-off mutation.

## Review Focus

- False/undefined/throwing hook stops before next effect.
- Revocation after an admitted write preserves that row and returns uncertain; it does not retry or promise rollback.
- Hook delay inside parent window but beyond child deadline never reaches native SQL.
- RPC hook executes before original assertReader and native call, preserving boxing.
- Publication cannot borrow named hook; legacy wrappers/build token and full tests remain unchanged.

### Task 1: Test the missing boundary

**Files:** create test/mcp-named-authorization-native.test.mjs; extend the focused CI command with this file; reuse fixture named-confirmation-native-rehearsal unchanged.
**Interface:** fixture build callback emits an alternate native Workflow calling runReleaseWorkflow({bundle,env,event,step,authorize}).

- [x] Write native assertions: always true yields confirmed/reservation1; false/undefined/rejected/non-resolving admission blocked/provider0/attempts0; stage-specific false preserves exact attempt/receipt/acceptance prefix and prevents successor row; child clock shifts leave parent live yet block SQL. Expose test-only reached/clockApplied diagnostics in the alternate fixture output to exclude setup-error false positives.
- [x] Commit tests before source; observe concrete RED because existing runtime ignores the callback.

### Task 2: Fence within existing components

**Files:** lib/mcp-release-runtime.mjs; lib/mcp-activation-journal.mjs; lib/mcp-successor-reservation.mjs; lib/mcp-release-successor-reservation.mjs; lib/mcp-activation-observer.mjs.
**Interfaces:** optional authorize(stage,signal) -> Promise<true> in the spec's constructor signatures.

- [x] Bound pre-step admission by min(5000ms, original remaining parent window), abort its signal on completion/timeout, and recheck original parent clock afterward. Validate hook type; reject supplied hook for non-named operation before effects.
- [x] Fence admission/credential/primary lookup and pass hook to journal/reservation.
- [x] Before each journal/reservation primary action, await hook only when present; invoke original component check immediately afterward and before native call. Recheck after await and before exposing completion. Keep SQL strings and deadlines byte-for-byte.
- [x] Inside qualified native receipt invoke, await hook before existing current/assertReader and unchanged boxed native call.
- [x] Observe the separate metadata-child RED after hooks exist; fix its original five-second monotonic fence before metadata GET and after response/body awaits, with no renewed timer.\n- [ ] Run focused native regression, existing full suite, lint/build and separate package builds in Actions; inspect real primary prefixes, sanitized outputs and clockApplied diagnostics.
- [ ] Independent branch review; fix findings; merge only with accepted checks. Update cloud continuity; no deploy.

## Continuity

Record exact RED/GREEN and review in the progress ledger/PR. Later QA class, approved/pinned canary D1, primary generation/history reconciliation, version provenance, size/compatible rollback and human consent remain separate deliverables.
