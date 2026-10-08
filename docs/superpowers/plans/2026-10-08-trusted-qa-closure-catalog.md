# QA catalog implementation plan

Native execution follows standing owner authorization. No new runtime or permission is inferred.

- [ ] TDD strict registration hash, primary provisioning receipt, immutable atomic approval, denied collisions/revocation/deadline and restart reads.
- [ ] Implement lib/assistance-qa-closure-catalog.mjs with no routes, secrets or provider writes.
- [ ] Native workerd SQLite DO transaction check; focused lint/tests and independent review.
- [ ] Exact CI test/lint/build and integration; save next composition and hosted custody gates without claiming real provisioning.
