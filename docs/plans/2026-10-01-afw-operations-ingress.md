# AFW operations ingress implementation plan

> For agentic workers: use superpowers:executing-plans for inline execution and one fresh whole-branch review.

**Goal:** Persist authenticated, sanitized AFW health signals and reserve bounded investigations without duplicate repairs.
**Architecture:** Isolated Worker contract and D1 ledger. No connection to customer dossiers or automatic executor. A later subscription-backed Codex Cloud manager consumes incidents through an authenticated integration after account capabilities are verified.
**Tech Stack:** Web Crypto, Workers, D1 SQL, Node test runner and native SQLite.
**Spec:** ../AFW-CLOUD-OPERATIONS-DESIGN-2026-10-01.es.md

## Global constraints

- AFW repository and resources only; production remains unchanged during local implementation.
- No customer data, free-text messages, credentials, mail bodies or arbitrary URLs in signals.
- Persist before acknowledgement; reject unknown resources and event-ID collisions.
- Owner preference: gpt-6.1-sol / low, Codex Cloud subscription usage. API billing requires an explicit subsequent decision, not silent fallback.
- No runtime claimed until remote acceptance; no deployment or repair tools in this ingress.

## Review focus

1. Authenticated but overbroad input cannot persist private fields.
2. Crash during a database batch cannot acknowledge a partial incident.
3. Concurrent workers cannot reserve the same incident with two valid leases.
4. Delayed recovery cannot overwrite a newer failure; recovery cancels stale leases.
5. Body tampering, replay, oversized or stalled uploads fail closed.

## Tasks

### 1. Contract and durable ledger
Files: lib/operations-ledger.mjs, worker/operations/schema.sql, test/operations-ledger.test.mjs, test/fixtures/operations-db.mjs.
Interface: validateSignal(input, now); recordSignal(db, signal, now); claimIncident(db, fingerprint, now); finishInvestigation(db, fingerprint, lease, now).
- [x] Write meaningful contract/transaction/order/concurrency/retry tests and observe RED.
- [x] Implement strict contract, transactional ingestion, lease fencing and bounded investigations; observe GREEN.

### 2. Authenticated bounded receiver
Files: lib/operations-ingress.mjs, worker/operations/index.mjs, test/operations-ingress.test.mjs.
Interface: createOperationsIngress({now}).fetch(request, env), env.OPERATIONS_DB, env.AFW_OPERATIONS_ENABLED, env.AFW_OPERATIONS_SIGNING_SECRET.
- [x] Write raw-byte signature, pause, body size/timeout and database outage tests; observe RED.
- [x] Implement internal signed signal protocol; observe GREEN. This is not an OpenAI/GitHub webhook verifier.

### 3. Cloud manager handoff and delivery
Files: docs/AFW-CLOUD-MANAGER-RUNBOOK.es.md, docs/AFW-OPERATING-ROADMAP.es.md, design and this ledger.
- [x] Document inventory, subscription-first manager instructions, activation and rollback requirements.
- [x] Run whole suite/lint; fresh reviewer; fix evidenced defects; CI build; PR and attach it.
- [x] Keep deployment and cloud-account activation as explicit pending outcomes, not equivalent to code completion.

## Execution ledger

2026-10-01: BASE 285124a4bf6a4af4a4f7f1854cb08f4b540f7e49; isolated branch feat/afw-operations-ingress-20261001.
Ruling: prioritize the subscription-backed Codex Cloud manager over Agents API — owner chose this economic route explicitly — arbitrary webhook activation remains unverified; ledger can serve either executor without activating API costs.
Ruling: first ledger is the durable inbox; no Queue or Workflow resources yet — acknowledgement after atomic D1 commit and reconciliation of expired leases are sufficient for a local ingress slice — remote throughput and scheduler acceptance remain separate.

2026-10-01: RED observed for absent ledger and receiver modules; GREEN 13 operational tests. Additional RED→GREEN pins newer failure during active diagnosis. Full suite 647/647; lint zero errors (one pre-existing img warning); fresh review no critical/important findings. Runtime and executor remain disabled/uncreated. GitHub setup now sees AFW; new environment setup initiated, UI GPT-6.1 Sol Bajo; not yet published.

2026-10-01 closure: PR148 integrated (52610ec), CI36875536747 passed test/lint/build. Cloud setup revealed local smoke expectations; separate PR149 fixed them (5c15c0a), RED→GREEN and 649 full tests, CI36876973760 passed. Remote setup at integrated main then confirmed 649 tests/build/smoke11/11 and restricted-network acceptance. Final draft saved; owner asked to publish personally. Operations runtime, consumer, scheduler and PC-off incident acceptance remain explicit next outcomes.
