# AFW native reservation fault qualification

> **For agentic workers:** Use superpowers:executing-plans inline. One whole-branch review, one fix pass, no second review. Source/CI only; execution and storage in GitHub.

**Goal:** Close the composed lost-ACK and authority-drift coverage gap recorded in PR601 comment6427449784 without changing runtime behavior.
**Architecture:** Extend the existing compiled-operator/native Workflow/D1/namespace rehearsal with a test-only boundary harness. Preserve real SQL effects and inject uncertainty only after the native reservation write; change only the presented binding identity/flag after the first awaited retirement GET. No production files change.
**Tech Stack:** Node22, Miniflare/workerd, actual release builder, GitHub Actions Ubuntu24.04.
**Spec:** docs/superpowers/specs/2026-10-26-afw-native-successor-reservation.md

## Global constraints
- Same confirmation history, one immutable reservation, mayBoot=false, mayRetry=false, operationalReadiness=false.
- Provider replies/credential/identities synthetic. No real HTTP, Container process, publication, OAuth, grant, schedule, client data or Max.
- Keep test instrumentation in test/fixtures; no test methods or switches in production.
- Remote branch based on main74f9325c161947dea51bada58f95637ff73c0bdb/treee820d84c06677f807196d2aee498491e62c3afbb. No local clones/builds/dependencies/files.
- Review requests/fixes/CI references are recorded in the PR conversation, the remote progress ledger.

## Review focus
- Native write must happen before the ACK-loss exception; row1 and confirmation history survive restart, without a second retirement read pair.
- Drift must occur after exactly one real composed retirement GET, not at admission.
- Stable proxy method identities must preserve native binding semantics; no manufactured successful writes.
- Default rehearsal and unrelated compiled-package DTO must remain unchanged.
- Harness errors and synthetic credential must not escape in the Workflow output.

## Task1 — Cover the existing composition
Files: modify test/mcp-release-reservation-native.test.mjs and test/fixtures/named-confirmation-native-rehearsal.mjs; create test/fixtures/reservation-fault-harness.mjs.
- [ ] Add assertions first: lost ACK => uncertain, committed reservation1, attempts/receipts/acceptances1, no retry or disclosed reservation; restart preserves counts and two reads. Each flag/DB/namespace drift => uncertain, reservation0, accepted activation history, exactly one retirement GET.
- [ ] Run CI before harness. Expected fixture-RED: existing helper ignores fault option and incorrectly returns confirmed to these new assertions. This is missing test instrumentation, not evidence of a production bug.
- [ ] Add boundary harness to compiled CI script only. Use actual native run/step/D1 and current production code; throw after awaited INSERT.run(), or change one authority binding after awaited first instance GET. Other methods forward with their native receiver.
- [ ] Run complete npm test/lint/build via CI. Expected all existing/new cases pass.
- [ ] One independent whole-branch review, address Important/Critical once and verify. Merge with expected head after CI; read back main/tree and record limits.

**Production breaks these assertions protect:** reporting prepared after a failed/unknown D1 acknowledgement; accepting a different DB/namespace or disabled opt-in after asynchronous evidence. They do not prove live credentials, native provider custody, remote reservation or PC-off.

**Ruling:** A remote branch/PR conversation replaces local worktree/ignored ledger because the owner explicitly requires cloud-first minimal-PC work. The extra native instrumentation is not shipped to production.
