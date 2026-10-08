# Independent alarm lifecycle implementation

Execute inline under standing owner authorization. No new cloud chat or remote resource is required for local preparation. Spec: docs/superpowers/specs/2026-10-08-closure-alarm-lifecycle.md.

1. Write failing lifecycle tests for immutable arming, finite persisted budget, unknown/readback recovery and no administrative false completion. Module: lib/assistance-closure-alarm-lifecycle.mjs; tests: test/assistance-closure-alarm-lifecycle.test.mjs.
2. Implement storage-owned lifecycle using createIndependentClosureCoordinator. Keep provider capability composition separate; refuse missing capabilities rather than inventing restored proof.
3. Add a closed Durable Object entrypoint and native Miniflare tests for real alarms and concurrency. Use a fixture-only private harness; production fetch404. Do not wire public routes or credentials.
4. Verify scoped tests/lint plus exact CI, independent review under requesting-code-review, fix concrete findings with regression evidence, then integrate the reviewed commit.
5. Record which gates are prepared versus hosted: administrative custody, isolated remote deployment/readback, one finite integrated occurrence, PC-off, Max preview and consent. Publish a new cloud source only when the resulting executable block merits adoption; code merge alone is not adoption.

Each task records a concrete result and evidence. No re-run of accepted revision10, OTP, rotation or schedule-only acceptance. Stop only on a strict owner action dependency, with a precise UI instruction.
