# AFW mail outbox implementation plan

> Execute sequentially with superpowers:executing-plans; no delegation required.

Goal: persist one approved attempt per response without automatic retry of ambiguous sends.
Architecture: standalone D1-compatible schema and conditional SQL transitions; no provider adapter or HTTP surface.
Tech stack: Node, SQLite tests, D1 prepared statements.
Spec: docs/AFW-MAIL-OUTBOX-DESIGN.es.md.

Constraints: no message bodies, addresses or credentials in metadata; no changes to customer D1 or health ledger; provider acceptance is not inbox delivery.

Review focus: conflicting content; concurrent claims; old worker results; process crash; cancelled approval. Tests exercise each.

## Task: durable metadata contract

Files: lib/mail-outbox.mjs; worker/mail/schema.sql; test/mail-outbox.test.mjs.
Interfaces: prepareMail(db,input,now), approveMail(db,key,hash,decisionRef,now), claimMail(db,key,now), finishMail(db,key,attempt,outcome,providerRef,now), cancelMail(db,key,now).

- [x] Write behavioral tests with a real SQLite-backed D1 wrapper; run and verify missing feature failure.
- [x] Implement strict bounded metadata and conditional transitions. Claim generates server attempt ID. No expired claim recycling.
- [x] Run targeted tests, full suite and lint; review terminal states and privacy.
- [ ] Record results and open reviewable PR. Do not deploy or connect sending in this block.
