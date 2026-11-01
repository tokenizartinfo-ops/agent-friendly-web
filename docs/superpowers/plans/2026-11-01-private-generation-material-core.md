# Private generation material extraction Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans task-by-task. Steps use checkbox syntax.

**Goal:** expose the already-validated private material algorithm for future ARM composition while preserving every current closed-observer fence.
**Architecture:** one synchronous internal material module; current preparation retains all native profile, identity, primary I/O and lease authority. No second host or writer.
**Tech Stack:** Node22, existing validators, Miniflare/workerd/D1 in GitHub Actions, esbuild.
**Spec:** docs/superpowers/specs/2026-11-01-private-generation-material-core.md

## Global Constraints
- Source/CI only. No publish, DDL/data, grants, credentials, profile/clock changes, callbacks or Max.
- Keep frozen315 inputs and existing private/public preparation result shapes and every retained uncertainty.
- namedBundleHash and generationPlanHash are different commitments, recomputed by existing assembler.
- Allfalse/7empty/complete empty-V2 checks stay at closed host, before/after I/O; no filtering.
- No pure result becomes authority; original native request five-second clock remains unchanged.

## Review Focus
- Identical-looking digests swapped across draft lookup/capsule/ledger must fail, not pick another scope.
- Material that changes after primary read or recipient settlement must still be rejected by host.
- Pending HEAD/info/control is still visible and rejected by closed observer.
- Original artifact order/bytes and issued/complete journals must survive refactor unchanged.
- An unmounted private core does not establish trusted draft insertion, ARM or operational readiness.

### Task1: pure private material extraction and compatibility
Files: create lib/mcp-qa-generation-material.mjs; modify lib/mcp-qa-generation-preparation.mjs; add test/mcp-qa-generation-material.test.mjs; preserve existing unit/native tests.
Interface: exact assemblePrivateQaGenerationDraftMaterial({...}) from spec; private data result only. Preparation uses it at its existing synchronous assembly point and retains primary readers and all rereads/leases.
- [ ] RED composite actual-fixture positive/domain/canonical/original-identity/accessor cases; confirm missing export failure in secret-free Actions.
- [ ] Move the existing synchronous assembly/materializer algorithm, avoiding duplicated domain logic. Deep literal copies, fixed return shape, no network/storage/clock/authority.
- [ ] Wire preparation to core; replace only local material calculations, keep actual snapshots/primary I/O/current() calls.
- [ ] GREEN focused node --test test/mcp-qa-generation-material.test.mjs test/mcp-qa-generation-preparation.test.mjs test/mcp-qa-generation-preparation-native.test.mjs test/mcp-qa-legacy-predecessor.test.mjs test/mcp-qa-named-packet-assembly.test.mjs test/mcp-qa-original-pins.test.mjs test/mcp-qa-historical-identity.test.mjs; run targeted eslint.
- [ ] Independent spec/code review, fix findings RED/GREEN; compare old/new real native observer receipts semantically using existing fixture paths. No raw private artifact or policy in logs.

### Task2: source acceptance and upstream planning errata
Files: existing ARM spec/plan and native-generation-preparation spec get additive reference to this reconciliation; AGENTS current short checkpoint and this ledger.
- [ ] Make clear that old ambiguous H refers to namedBundleHash at before-ARM ingress; no implementation of an ARM endpoint here.
- [ ] Document prepared_idle/new pending-host gap, missing trusted draft channel and retained nominal hydrator; do not mark old ARM Task2 complete.
- [ ] Full CI/lint/build and fixed315 package; exact-head whole-branch review and accepted tree check before merge. Keep runtime closed; root records actual source results in issue497.
