# AFW public methodology once Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans. Follow tasks in order; do not dispatch a live run from PR.

**Goal:** Make one finite public methodology tools/call observable from GitHub without using the owner's computer or changing product/runtime.
**Architecture:** A separate built-in Node observer with a fixed endpoint/sequence and injected fetch/clock for fixtures; a manual workflow supplies an original window and preserves only its sanitized receipt.
**Tech Stack:** Node22+ built-ins; GitHub Actions; existing public method contract.
**Spec:** ../specs/2026-10-25-afw-public-methodology-once-design.md

## Global Constraints
Fixed normal public origin; fourPOST maximum; defaults closed; original window<=600000ms; response<=10000ms/65536bytes, sequence<=30000ms/262144bytes. No auth/cookies/redirects/overrides/third parties/retries/secret dependencies/runtime or product change. No live network on PR. Only manual exact-repository/main attempt1.

## Review Focus
Body stalls must expire/cancel even after headers; malformed or duplicate SSE must not become success; source/caller clock closure must stop the next send; RPC/tool errors or hostile content cannot leak into receipts; workflow reruns/default expired inputs must send0requests. Tests below own these failures.

### Task1: Pin observation boundaries with fixtures
Files: Create test/public-methodology-once.test.mjs, .github/workflows/afw-public-methodology-once.yml, spec and this plan.
Interface: observeMethodologyOnce({notBefore,notAfter,fetchImpl,now?,monotonic?}) returns sanitized finite receipt; CLI validates actual GitHub job context before observer call.
- [ ] Write tests for the successful JSON/SSE sequence, fixed methods/headers/arguments, closed/future/expired/oversized windows, transport failure without retry, wrong RPCid/error/catalog authority, stale output, unexpected protocol, duplicate SSE, response cap, stalled body and expiry during read; CLI defaults/rerun/foreign ref.
- [ ] Run fixture-only Actions on this branch and observe expected RED for the missing observer; no requests to AFW.
- [ ] Preserve exact failing run/head and failure. Do not proceed on unrelated infrastructure failure.

### Task2: Implement smallest observer
File: Create scripts/check-public-methodology-once.mjs.
Consumes fixture interface above. Produces no raw content or external authority.
- [ ] Validate window before anyIO; request count before send, both clocks/window rechecked after each await; fixed endpoint/body/headers, redirect error, credentials omit.
- [ ] Read bounded streams with abort race and finite cancellation, decode one JSON/SSE RPC, verify each phase and public envelope.
- [ ] Produce sanitized success/failure receipt with original window, provenance fields, no retry and operationalReadinessfalse. CLI only prints bounded JSON; workflow stores it in runner temp.
- [ ] Run focused fixtures, full npm test/lint/build via existing CI, and obtain independent source review.
- [ ] Commit fixes separately, repeat only affected verification after real changes; no live run yet.

### Task3: Integrate and observe once
- [ ] Verify PR/head/base/tree/changed files/checks and merge with expected head. Read back exact merged files and main CI. Source integration does not execute the workflow.
- [ ] Record a NEW original window + one-run budget in issue497, verify normal active deployment. Use UI to dispatch ONE manual main run only; no rerun.
- [ ] Inspect actual run/job/provenance/receipt and final deployment. Record PASS only if actual correlated method contract accepted; failed/uncertain consumes this admission.
- [ ] Preserve evidence and continuity, stop processes/helperIDLE, no schedule or PC-off/Max claim.
