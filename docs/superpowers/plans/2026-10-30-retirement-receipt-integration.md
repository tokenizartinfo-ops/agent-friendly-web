# Challenged retirement integration implementation plan
> **For agentic workers:** REQUIRED SUB-SKILL: superpowers:executing-plans, inline execution with one independent final review.
**Goal:** Wire the qualified challenged receipt across the complete synthetic retirement path, preserving SQL authority.
**Architecture:** Same-caller receipt bounds replace only the invalid cross-Worker custody freshness comparison; provider, pinning, storage and SQL predicates remain strict.
**Tech stack:** existing ESM/Node22/workerd/Miniflare/SQLite and GitHub Actions.
**Spec:** docs/superpowers/specs/2026-10-30-retirement-receipt-integration-design.md

## Constraints / review focus
- Cloud branch only; no local checkout/build/dependencies, no remote runtime mutation/DDL/permission.
- One original<=5s lease, no fallback/retry/time normalization; no authority from a challenge.
- Preserve legacy strict behavior, immutable singleton/history and all SQL predicates.
- Parent abort before/during a dependency prevents acceptance and later work.
- A late native receipt must be released without reviving authority.
- All fixed original and successor paths must adopt new protocol before live budget1.
- Local receipt DTO is trusted-adapter data, not arbitrary JSON authority.
- SQL-clock mismatch fails closed even when RPC receipt succeeds.

## Task1: common reader and server RPC
Files: lib/mcp-retirement-evidence.mjs, worker/mcp-own/index.mjs; new test/mcp-retirement-receipt-integration.test.mjs and native test.
Consumes create/readRetiredRpcReceipt from PR649; produces readCustodyReceipt callback path and two challenge-only methods.
- [x] Add RED tests: +21ms composed receipt succeeds with stable stopped provider; raw +21ms fails; malformed/both callbacks/local future interval denied; parent abort prevents acceptance.
- [x] Actions focused RED before implementation.
- [x] Implement optional challenged callback and observe({signal}); legacy stays strict.
- [x] Add two server methods using the same fixed hosts and qualified receipt constructor.
- [x] Native actual server method disabled/selector denial plus challenged receipt qualification. Focused GREEN.

## Task2: all callers and native flow
Files: lib/mcp-release-successor-reservation.mjs, lib/mcp-own-successor-host.mjs, lib/mcp-successor-retirement-observation.mjs, lib/mcp-successor-retirement-handoff.mjs, lib/mcp-hosted-canary-restoration.mjs; affected test fixtures only.
- [x] RED original confirmation/launch and successor observation/handoff with +21ms and actual new RPC helpers. Parent withdrawal/held ACK must remain terminal.
- [x] Replace only fixed RPC adapters, propagate original clock/assertions/signals and boxed asynchronous return.
- [x] Qualify native named confirmation to real SQLite reservation, plus fail-closed SQL clock mismatch/no budget consumption; preserve existing uniqueness/closed policies.
- [x] Full existing suite/lint/build and affected cloud package builds.
- [x] One fresh-context whole-branch review; Important fixes RED->GREEN then full suite.
- [x] Merge only green and verify main/record checkpoint.

## Task3: release readiness after source
- [x] Build qualified closed artifacts with exact source/module/config hashes and verified independent rollback; do not advance historical frozen pin before native closed publication acceptance.
- [ ] Recheck provider and custodied credentials with scoped read tools; no automatic rotations or repeated pegados.
- [ ] Only after closed source publication and prepared complete closure path, prepare one new synthetic consent window. PC-off and Max remain separate acceptance gates.
