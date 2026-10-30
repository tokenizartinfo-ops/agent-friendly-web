# Challenged retired-RPC receipt implementation plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Work is native in this chat with an independent final review.

**Goal:** Prepare an unmounted, challenge-bound RPC observation primitive without changing existing authority.
**Architecture:** Server-local observation bracket plus a unique client challenge and original caller deadline. Preserve remote data and current readers.
**Tech Stack:** ESM, node:crypto, Node test runner, existing workerd/Miniflare CI.
**Spec:** docs/superpowers/specs/2026-10-30-retired-rpc-receipt-design.md

## Global constraints
- AFW repository only; isolated GitHub branch, no local clone/build/dependencies.
- Max5000ms, one invocation, no retry, no timestamp normalization or skew allowance.
- No production wiring, D1/schema/budget or runtime changes.
- Preserve original observation data and release native RPC lifecycle handles.

## Review focus
- A reply arriving after abort/timeout must be disposed without acceptance.
- A disposer that throws must prevent success.
- Extra accessors/symbols must never be invoked as domain data.
- A second receipt replaying a previous challenge must fail.
- Server-local freshness and caller-local bounds must remain separate even for frozen clocks.

## Task1: protocol and unit qualification
Files: create lib/mcp-retired-rpc-receipt.mjs; create test/mcp-retired-rpc-receipt.test.mjs.
Interfaces: the two exact signatures and result shapes in the spec; the existing snapshotRetiredRpcObservation remains unchanged.
- [ ] Write tests for +21ms independent clocks preserving observation, challenge mismatch/raw/extra fields, server-stale observation, regression, abort, timeout and lifecycle release.
- [ ] Run existing cloud CI and preserve expected missing-module RED.
- [ ] Implement only the two unmounted helpers using CSPRNG challenges, exact descriptor snapshots, AbortController and an original finite race.
- [ ] Run focused unit tests and verify GREEN; preserve the RED commit.
- [ ] Review all error/lifecycle paths against the spec.

## Task2: native transport and integration boundary
Files: create test/mcp-retired-rpc-receipt-native.test.mjs; update .github/workflows/ci.yml only if required by existing test selection.
- [ ] Add a native workerd fixture with separate fixed server/caller clocks and genuine RPC return lifecycle; source is CI-only.
- [ ] Demonstrate +21ms receipt acceptance and unchanged remote timestamp, wrong echoed challenge rejection and legacy raw payload rejection.
- [ ] Verify the new module is not imported or mounted by any production entrypoint/caller.
- [ ] Run the full existing CI, lint/build and package checks appropriate to changed source.
- [ ] Fresh-context whole-branch review; resolve findings before merge.
- [ ] Record exact commits/runs and the separate future integration gate. No remote trial or deploy.
