# Mounted initial closed-UI cleanup — implementation plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development. Steps use checkbox syntax.

**Goal:** Have the surviving initial winner own a durable independent cleanup alarm before any future activation.
**Architecture:** Private B1 arm after actual inactive receipt; existing fixed actor native SQLite alarm; actual finite subclass dispatch; one fixed closed-baseline restoration with at-most-once journals. No activation/ownerSource or new Workflow/infrastructure.
**Tech Stack:** existing JavaScript ESM, Cloudflare Worker/DO SQLite/D1/alarm, locked Miniflare, Node22 hosted Actions, GitHub APIs.
**Spec:** ../specs/2026-11-02-finite-initial-cleanup-owner.md

## Global constraints

All exact resources, IDs, clock relationships, negative actions and privacy constraints in the binding spec apply verbatim. Original B1 technical I0+300s/native30s/child5s preserved. Root cleanup-only C0=I0+900s/C1=C0+180s/three deliveries; custody/source ceiling must coverC1. Existing records/firstHEAD/unknowns preserved; ordinary index/nominal semantics untouched. No actual initial intent until full composition; no local worktree/build.

## Review focus

- Acknowledged record but missing/late alarm: no activation authority; pending cleanup survives.
- Same singleton native alarm collides with nominal guard: no silent ownership transfer.
- Late deployment request after timeout: baseline observation cannot settle it.
- ACK/completion/profile mismatch or foreign pointer: no blind restore.
- Owner-window15m vs technical5m: no silent extension or business cleanup claim.

## Task B2b — actual mounted initial cleanup owner

Files: modify lib/mcp-qa-finite-initial-entry.mjs and worker/independent-closure/finite.mjs; create lib/mcp-qa-finite-initial-cleanup.mjs and focused strict records module if needed; add actual native tests under test/mcp-qa-finite-initial-cleanup-native.test.mjs plus codec tests; adapt only relevant fixtures/assertions. Reuse existing fixed inventory/wire/profile/backup qualifiers; no production fixture exports or generic callback registry.

Consumes: actual createPrivateQaFiniteInitialEntry({ctx,env}) original winning run, producer/result/parent, private uploader's actual backup/ACK/receipt/config, fixed bootstrap/source/residency and existing native bindings. Produces: private nonexported armInitialCleanup before safe RPC return; fixed exported runPrivateQaFiniteInitialCleanupAlarm({ctx,env}) returning null only for no owner and bounded factual result otherwise; actual finite subclass alarm override. Exact recovery journal schema finalized in pre-code constructor/table from existing source; it cannot mint forward activation or grant capabilities.

- [ ] Verify actual dispatch HEAD/tree; inspect exact storage/alarm SDK, current private uploader outputs/lease retention, finite class mount, fixed global inventories and source guards. Persist short pre-code constructor/state/wire table and answer routine choices; escalate only true spec contradiction to Root before product.
- [ ] Write meaningful RED on actual native initial path: after inactive receipt, assert durable immutable initial cleanup plan/state/alarm ACK; reconstructed finite alarm routes to owner and refuses nominal collision. No mocked arm success.
- [ ] Run hosted focused tests; record exact expected failure/result/revision.
- [ ] Implement private arm, bounded strict records and mounted independent alarm/restore path under the spec. Definite unknown remains pending/reconcile-only. All future activation SEND producers remain absent; tests explicitly SYN any recovery input not yet produced by actual forward writer.
- [ ] Add and run failure matrix from Review Focus/spec: native finalreturn/sync/alarmACK/restart/clock/drift/conflict/latework/foreignpointer/backup+eligibility/once+RPCprivacy. Preserve old tests except deliberate integrated preparation now arms; identify every intentional fixture change.
- [ ] Run focused GREEN plus relevant B1/B2a/historical/profile/nominal-guard consumers and scoped lint. Run ONE actual compiler/profile/residency at stable source, record exact hashes/bytes/graphs.
- [ ] Persist report at ../reports/2026-11-02-finite-initial-cleanup-owner.md with exact evidence, concerns, SYN/event-delivery limits, all CAS/readbacks; STOP/release writer for fresh spec+quality review. Temporary qualifier excluded from integration. No source acceptance or runtime claim by implementer.

Root self-review: every spec boundary maps to TaskB2b/native matrix; handoff/activation/owner-window change deliberately absent and remains unavailable. Alarm canary restoration and external QA finalizer are separate responsibilities. This source unit does not claim whole-package readiness.
