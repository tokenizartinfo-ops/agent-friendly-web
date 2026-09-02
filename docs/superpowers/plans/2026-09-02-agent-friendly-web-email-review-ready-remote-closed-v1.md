# Agent Friendly Web Email Review Ready Remote Closed v1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans task-by-task and stop if any closed-boundary assertion fails.

**Goal:** deploy the review-ready route to the isolated canary with its D1 table and rate limiter while preserving zero email capability.

**Spec:** `docs/superpowers/specs/2026-09-02-agent-friendly-web-email-review-ready-remote-closed-v1-design.md`

## Task 1: Canary rate-limit configuration

- [x] Write a failing structural test requiring the exact canary-only rate limiter while continuing to forbid every email binding.
- [x] Run the focused test and verify RED.
- [x] Add `AFW_EMAIL_REVIEW_READY_RATE_LIMITER` only to the canary with namespace `1895760673`, limit `1`, period `60`.
- [x] Run focused tests and Cloudflare deploy dry-run.

## Task 2: D1 backup and additive migration

- [x] Record pre-migration migration list and aggregate table counts without row contents.
- [x] Export the canary D1 to an OS temporary path and calculate SHA-256 and byte size; never commit the dump.
- [x] Apply only pending migration `0006` to `agent-friendly-web-web-canary`.
- [x] Verify zero pending migrations, the new table schema and zero delivery rows.

## Task 3: Closed canary deployment

- [x] Record current Worker deployment version for rollback.
- [x] Deploy the reviewed branch to `agent-friendly-web-web-canary` with `AFW_EMAIL_REVIEW_READY_ENABLED=false`.
- [x] Verify Access interception on the email route and the full canary smoke.
- [x] Inspect remote settings to prove the rate limiter exists and no `send_email` binding exists.
- [x] Verify production Worker and `agentfriendlyweb.dev` were not modified.

## Task 4: Evidence and reconciliation

- [x] Create a sanitized Gate 6C.3B phase 1 record with resource IDs, versions, commands, counts and rollback.
- [x] Update public email contracts to `remote_database_and_closed_route_ready_binding_pending` without claiming sending.
- [x] Update the email architecture, roadmaps and private Obsidian project note.
- [x] Run complete tests, lint, build, JSON parse, diff and secret/cross-project scans.
- [ ] Commit, push and update Draft PR `#49`; do not merge or send email.
