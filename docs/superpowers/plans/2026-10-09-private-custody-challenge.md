# Private custody challenge preparation

> Execute inline with superpowers:executing-plans; one independent review at the end.

Goal: prepare an internal single-use authenticated challenge, without claiming cloud custody or installing a catalog.
Spec: ../specs/2026-10-09-qa-provisioning-authority.md.

Scope ruling: only the challenge lifecycle is implementable now. Administrative provenance collection, hosted authentication, provisioning authority and deployment remain separate gates. This module must not emit readProvisioning or grant installation authority.

Interface: createPrivateCustodyChallenge({storage,readInstallation,readServiceIdentity,now}) returns issue(), consume({nonce}), status(), withdraw(). readInstallation is synchronous trusted operator state returning exactly {registration,approval}; registrationV2 and complete approval must match existing validators. readServiceIdentity is synchronous trusted request-context state, already independently authenticated, returning exactly {principalRef,expiresAt}. It is never read from caller payload. Async/thenable dependencies fail closed. No HTTP/RPC/Worker export. Caller cannot issue a registration, select an identity or install.

Persistence: one fixed current record and append-only withdrawal marker per exclusive own scope. Random32-byte nonce returned only on first successful issue; persist only its SHA256 digest. Record binds complete baselineRef and expected principalRef, deadline, issuedAt and consumedAt. Issue/consume/withdraw are transactional. Lost acknowledgement returns unavailable and never triggers automatic retry, reissue or recovery. A consumed challenge cannot be consumed again. status is metadata only and remains readable after deadline; withdrawal fences consumption and issuance permanently. Revalidate synchronous operator state, identity and monotonic clock after awaited operations and writes so throws roll back the transaction.

Files: lib/assistance-private-custody-challenge.mjs; test/assistance-private-custody-challenge.test.mjs; native SQLite DO test using the established workerd fixture.

- [x] Write RED tests: missing authority, forged body identity, wrong/expired identity, nonce reuse, restart, admin changes after await, withdrawal, deadline crossed during transaction, unknown write ACK and no nonce persistence.
- [x] Implement minimal closed module and run focused tests GREEN.
- [x] Verify persistence/rollback with native SQLite DO, not only Map fixtures.
- [x] Review independently; repair concrete findings with RED/GREEN. Record results/remaining hosted gates. Full tests/lint/build before any publication, with no remote activation in this block.

Review focus: late writes, caller-selected authority, replay after restart, ambiguous ACK, stale/mutated operator context. Synthetic identities verify the interface only, never real JWT/managed custody/PC-off.

Review corrections: recheck operator/identity after transaction acknowledgement, preserving a committed record on uncertain success; read status record and withdrawal marker in one transaction. Both regressions observed RED before fixes and GREEN after. Focused unit/native run: 11 pass, 0 fail, 0 skip. General verification and repair review recorded separately in output/afw-private-custody-challenge-preparation-20261009.md.
