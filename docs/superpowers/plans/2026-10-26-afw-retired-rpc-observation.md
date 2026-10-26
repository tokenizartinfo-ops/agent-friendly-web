# Retired RPC observation implementation plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Consume the documented RPC lifecycle disposer without weakening exact retired-custody evidence.
**Architecture:** A shared private snapshot adapter copies twelve primitive data fields and disposes only the known own Symbol.dispose. Existing domain validation stays unchanged.
**Tech Stack:** JavaScript, genuine workerd RPC/Miniflare, GitHub Actions, no new dependencies.
**Spec:** docs/superpowers/specs/2026-10-26-afw-retired-rpc-observation.md

## Global constraints
- AFW only; source qualification without remote permissions/deploy/Container/OTP.
- Strict plain DTO; no arbitrary dropped keys/getters/symbols/capabilities.
- Cleanup exactly once; cleanup failure rejects; identity/time checks unchanged.

## Review focus
- Unknown keys/symbols/accessors must stay denied.
- A disposer getter or nonfunction is never invoked/accepted.
- Rejected records with a valid native disposer still clean up.
- Actual native RPC metadata must be observed, not guessed from mocks.
- Updated Worker source is distinct from still-frozen444d and requires later qualification.

### Task 1: Private RPC boundary
Files: lib/mcp-retired-rpc-observation.mjs (new), lib/mcp-own-successor-host.mjs (one caller), test/mcp-retired-rpc-observation.test.mjs, test/mcp-retired-rpc-observation-native.test.mjs.
- [ ] Add unit/native cases and inspect RED in Actions before implementation.
- [ ] Implement snapshotRetiredRpcObservation(value) and consume it only at the trusted RPC boundary.
- [ ] Require GREEN, lint/build and one whole-branch source review; fix material findings with regression checks.
- [ ] Merge and verify main; keep live resources closed and update PR601 dependency explicitly.
