# Closure D1 actions implementation

> Execute inline under the owner's standing authorization. Skill approval handoffs are superseded by the explicit instruction to decide and continue autonomous blocks; security access expansions remain separate.

Spec: docs/superpowers/specs/2026-10-08-closure-d1-actions.md

- [x] Native D1 regression tests: pinned revocation/stop, completed preservation, unknown/mismatch, concurrency and lost acknowledgment readback. Observe RED before implementation.
- [x] Implement lib/assistance-closure-d1-actions.mjs reusing approval catalog, plan digest and atomic journal stop. Exact callback pins, no routes or new migration; readback never writes or certifies administration.
- [ ] GREEN native tests, focused lint, full suite/build; investigate failures proportionately, preserve evidence. Whole change independent review, fix important findings once with regression tests. Commit/PR exact CI and integrate only when verified.
- [ ] Record local/CI acceptance and independent hosted/admin/PC-off/Max gates. No remote activation, credentials or mail.

Ruling: use a D1-only adapter before hosting the DO. It delivers real primary-state semantics without pretending an absent administrative credential is available. Cost: administrative and hosted capability remain separate gates.

Independent review: one P2 time/input change during approval lookup. Watched regression RED then GREEN; guarded the direct INSERT after all reads instead of using catalog.revoke with its additional asynchronous schema check. Scoped lint exit0. General local commands interrupted before completion, logs preserved; exact CI still a merge gate. No second review needed to substitute for regression evidence.
