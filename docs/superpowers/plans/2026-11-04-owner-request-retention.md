# Native Owner Request Retention Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans to implement this plan task-by-task. Execute cloud-first; no local clones/builds/dependencies.

**Goal:** Retain the original private owner request and every actual pending operation through genuine stage handoff without granting authority from bookkeeping.
**Architecture:** Add non-authorizing request scope and genuine lease ancestry to existing helpers. Reuse that same scope for fixed factual reads and actual consumed owner admission, preserving strict standalone readonly behavior. Keep actual host approvals pending until cleanup handoff.
**Tech Stack:** ESM/Node22, Cloudflare Workerd/Miniflare native fixtures, AsyncLocalStorage/WeakMaps, GitHubActions.
**Spec:** docs/superpowers/specs/2026-11-04-owner-request-retention.md

## Global Constraints
- Source only, existing source/forward/native mounts unavailable; no real Entry/permission/provider/deploy.
- Same original <=30s parent, <=5s children, no clock restart; actual pending work retained through cancellation/settlement.
- Bookkeeping is not authorization; genuine one-use consumeFiniteOwnerStageAdmission remains mandatory.
- No readonly-to-owner conversion, source ceiling/I0/C0/C1/T0 changes, or generic user-supplied callbacks/flags/targets.
- No approval POST/ticket consumption on actual host until separately qualified cleanup; no separate consuming PC-on trial.

## Review Focus
- Late body cancellation starting after the last tracked read settles must not open a registry gap: Task1 native deferred-body regression.
- Caller-shaped or descendant leases must not silently become new request roots: Task1 lineage/remaining-budget and foreign clone tests.
- A repeated admission can change bookkeeping only after genuine consumption; no second effect: Task1 actual transport replay/DTO tests.
- Nested factual read must borrow only its actual request's bookkeeping, not another actor request: Task1 native overlap tests.
- Existing Workflow/setup parents and B1/readonly retain compatibility: Task1 focused original consumer/scope groups.

### Task 1: Original request retention and explicit handoff

**Files:**
- Modify lib/mcp-qa-finite-stage-work.mjs (request scope, fixed factual borrowing, explicit handoff).
- Modify lib/mcp-qa-finite-owner-preparation.mjs (genuine root/child/proof ancestry, full body cancellation retention).
- Modify lib/mcp-qa-finite-owner-http.mjs (actual entry bookkeeping and pending approval view).
- Modify lib/mcp-qa-finite-policy-transport.mjs (owner branch adopts only after existing genuine consumer).
- Modify lib/mcp-qa-finite-initial-owner-source.mjs (genuine ancestry/borrowed factual read, no fresh clock).
- Test new test/mcp-qa-finite-owner-request-retention-native.test.mjs and scoped helper tests as necessary.
- Preserve existing fixtures; extend their test-only native entry minimally. Modify test/mcp-qa-finite-initial-owner-source-native.test.mjs to isolate owner rejection Minor.
- Existing branch qualifier may run focused covering cases only; exclude before finalmainpromotion.

**Interfaces:**
Consumes createFiniteOwnerRequestLease, prepareFiniteOwnerChoice, consumeFiniteOwnerStageAdmission and existing owner/readonly scope APIs. Produces observeFiniteOwnerRequestWork({ctx,env,originalLease},operation), readFiniteOwnerRequestContext(lease)->{root,deadline}, fixed factual borrowing and explicit adoptFiniteOwnerRequestStageWork after the genuine consumer. Existing public signatures remain compatible; private lineage is never an effect permit.

- [ ] Write native REDs for actual pre-admission pending storage and streamed body cancellation, plus genuine handoff; assert zero late provider effects and blocked conflicting scope.
- [ ] Run only new causal cases first in credential-free Actions; confirm actual logs/head/failure, not stale queued labels. Never repeat a completed occurrence for metadata delay.
- [ ] Implement root/descendant tracking and bookkeeping helpers, then full body work retention and same-entry handoff, with no callback/flag authorization shortcuts.
- [ ] Wrap actual unmounted host entry and pending GET/POST behavior; keep source/forward/mount unavailable. Exercise underlying prepare/transport through native internal fixture, not a production bypass.
- [ ] Add ancestry/remaining5s budget, abort, holders, foreign scope/lease, admission replay, readonly exclusion and standalone/nested factual-reader cases; correct independent ownership denial.
- [ ] Run new focused native tests plus affected owner preparation/transport, initial factual source/scope/custody and necessary B1 compatibility groups; run lint and changed graph compiler if imported bundle graph changes. Once these pass, do not broaden/repeat absent a new change/failure/concern.
- [ ] Commit with expectedSHA lease and self-review exact diff. Report docs/superpowers/reports/2026-11-04-owner-request-retention.md with BASE/codeHEAD/REDGREEN/runs/commands/output and remaining gates; fresh task review follows.
