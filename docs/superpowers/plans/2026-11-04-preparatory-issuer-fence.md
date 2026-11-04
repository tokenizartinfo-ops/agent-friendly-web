# Preparatory issuer fence and grant-only cleanup — Unit 2a plan

> For agentic workers: REQUIRED SUB-SKILL superpowers:subagent-driven-development or superpowers:executing-plans. GitHub source/credential-free Actions only, no local clone/build/dependencies.

**Goal:** Provide the fixed unmounted journal/SQL primitives that can fence an exact original issuer and revoke its reserved read grant before notice consent exists.
**Architecture:** One monotonic D1 tombstone and private actual-result witnesses preserve statement ordering without business authority from DATA. Separate SDK/native/notice composition remains pending.
**Tech Stack:** ESM/Node22, actual Miniflare D1/DO, SQLite prepared statements/triggers, existing lease/retention, GitHub Actions.
**Spec:** docs/superpowers/specs/2026-11-04-preparatory-issuer-fence.md

## Global Constraints
- Source/schema FILE only; no remoteDDL/provider/Entry/deploy/secret/permission/OAuth/OTP/cron/Max.
- UNMOUNTED fixedQA components, no serialized caller claims/hash/DTO as owner permission; ordinary APIs unchanged/no fallback.
- Original30s request/5s children/forwardC0/cleanupC1/sourceceiling untouched; table terminal closure may reduce earlier but timing requires actual fixed current owner, not table data.
- DB execution time fences each mutating statement; canonical ISO fields vs INTEGERms explicit; no JS-now fallback or production clock injection.
- Confirm exact serialized primary fence before originalUUID lookup/revocation/absence; no fabricatednotice, broadscope, newgrantID, retry/resume or timestamp rewrite.
- Actual consumption/barrier/observation objects are nonreconstructable fixed continuation facts, not approval tokens; pending actual I/O retained until settlement.

## Review Focus
- Closed-first tombstone cannot be reopened by delayed original OPEN: native both-order test.
- Reserved consumedAt before expiry cannot authorize actual late SQL: native expiryqueue test.
- Barrier ACK unknown cannot become absence from a row scan: exactprimaryreconcile/foreignID test.
- Table>=initialC0 would block earlier nominalcleanup: storage earlierclosure test paired with still-unmounted source timing gate (no public schedule).
- SDK/source provenance cannot be inferred from component data: tests/report labels and no new worker/forward mounts.

### Task 1: Fixed records, journal, monotonic schema and SQL component
**Files:**
- Create db/finite-preparation-issuer-fences.sql.
- Create lib/mcp-qa-finite-preparation-issuer-records.mjs.
- Create lib/mcp-qa-finite-preparation-issuer-journal.mjs.
- Create lib/mcp-qa-finite-preparation-issuer-store.mjs.
- Modify existing initial cleanup only for conservative refusal on unresolved issuer prefix; no owner/mount/generic dispatcher.
- Test new test/mcp-qa-finite-preparation-issuer-{records,native}.test.mjs and minimal nativefixture; preserve existing ordinary store/owner behavior.

**Interfaces:** Exact record kinds/identity/prefix and createFinitePreparationIssuerJournal({ctx,env}) / createFinitePreparationIssuerStore({ctx,env}) fixed methods are in spec. Store consumes original guarded lease and fixed typed DATA, not arbitrary db/now/query/callback. Same actual result objects retain the live SQL continuation; serialized receipts/history cannot issue another grant.

- [ ] Write native/schema/codec RED cases for missing monotonic fence/actual late deadline/no-notice exact recovery; identify new-interface absence explicitly and exclude fixture parse failures.
- [ ] Run targeted causal cases in credential-free Node22 Actions; record exact head/job/output. Put scoped lint before long native groups; avoid binding a local variable named module (Next lint). After causal RED, cheap source/graph/schema preflight should precede broad native regression to fail fast without repeating passed groups.
- [ ] Implement strict codecs and fixed native append-once journal with actual commit/sync/readback, retained I/O and no reconstructed issuing continuation.
- [ ] Implement source-only table and no-delete/identity/terminal triggers; exact schema/clock preflight. Do NOT install remotely or change ordinary schema/store semantics.
- [ ] Implement fixed OPEN/consent/consume/grant SQL joins and private one-use actual consume witness; DBnow expires/deadlines and original UUID.
- [ ] Implement terminal closed-first barrier, exact fresh-primary reconciliation and factual barrier/observation witnesses; exact grant-only revocation preserving history/exchanged_at.
- [ ] Add initial alarm fail-closed gate for unresolved issuer-prefix, preserving Unit1 no-issuer recovery.
- [ ] Cover spec1–8 with actual D1 queue order/heldACK/expiry/foreign tests and separately labeled capsule-correlation proof; no fake production clock or missing-cookie fallback.
- [ ] Run scoped tests+ordinary store/initial cleanup/Unit1 regressions and lint. One changed-graph compiler only when justified, no broadened repeats.
- [ ] Self-review full taskBASE..codeHEAD; remove temporary qualifier; report docs/superpowers/reports/2026-11-04-preparatory-issuer-fence.md with schema/source hashes, exact tests/warnings/limits and next Unit2b actualcomposition. Fresh task review before next implementation.

## Root preflight / activation status
Unit1 source accepted after independent SpecPass/QualityApproved (acceptance committed alongside this spec/plan). Actual implementation BASE is this spec/plan commit and will be recorded in the root ledger before dispatch. Corrected architecture8e06dae and independent builder rulings incorporated: serverDBfencedAt, canonicalISO/DBexpiry, monotonic storage allowing qualified earlier futurehandoff, fresh first-primary readback. User ordinary technical delegation applies; no missing human design decision. Source/live readiness remains false; no current runtime schema presumed installed.
