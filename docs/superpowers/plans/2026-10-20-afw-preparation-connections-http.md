# AFW preparation connections HTTP implementation plan
> For agentic workers: REQUIRED superpowers:executing-plans inline; one fresh most-capable whole-branch review. No per-task agents.
Goal: bounded own human connection review/withdrawal using existing identity/store/view, independent of expired agent issuance.
Architecture: detached same-origin host, original5s lease, separate immutable human management window, real primary grant/consent association and operational hashed CSRF, scoped SQL withdrawal.
Tech: existing provider1.2.1/jose/Miniflare/workerd/D1, no dependencies or keys added. GitHub APIs/Actions only.
Spec: ../specs/2026-10-20-afw-preparation-connections-http.md

## Global constraints / rulings
Source-only/unmounted, original agent profile<=600000ms never renewed; distinct human management<=600000ms; each request ORIGINAL<=5000ms; URL8192/input4096/output32768bytes; list<=20,overflow21 unavailable. Preserve capsules/events/consent/grant history. G2CLOSED/noOTP/operationalReadiness=false.
Ruling: owner has explicitly authorized consecutive autonomous source decisions/implementation/merge; no routine approval menu. Real identity/consent/remote credentials/customer/publication gates remain separate.
Ruling: remote branch/spec/plan/PR/issue497 ledger replaces local worktree/sdd scratch under cloud-first preference. Rollback source revert, never DROP/reset/live change. No local clone/install/build/download.
Ruling: original grantee may reduce their own permission after owner transfer; never read the new owner's project fields. Generic dossier label avoids metadata leakage. Saved active state is not operational eligibility.
Ruling: original management window is separate human review purpose, not renewed agent authority; anti-CSRF receipt expiry clamps to it, cannot extend it. Existing nonce table kinds are unconstrained text; profile digest binds dates without new DDL/secret.
Preflight shared interfaces: real Access verifier returns exact ok/identity; actual source token stores applicationGrantId; consent journal links actual grant/scopes/absolute dates; view accepts no bearer or assertions; conditional primary UPDATE/one-use nonce preserve original request+management deadline.

## Review focus
1. Profile expiry/issuance disable must not hide privilege-reducing withdrawal within its separate management window.
2. Metadata must not leak another project's new owner or mislabel an expired grant active.
3. Consumed nonce ACK loss may not revoke by retry or claim success; revoked ACK loss is unknown until fresh read.
4. Target drift/SQL held past deadline may not revoke an unrelated or late record.
5. GET/body/identity/cleanup must stay finite without stale success or global poisoning from local timeout.

## Task1 — native RED and presentation contract
Create test/preparation-connections-native.test.mjs and test/fixtures/preparation-connections-worker.mjs; modify detached view source ONLY AFTER explicit RED for missing host/renderer.
- [ ] Assert factory presence before SDK bundling; actual existing signed consent/source-token fixture, no fake SDK success.
- [ ] Native signed own identity + actual D1 grant/CSRF/withdrawal; tests named by spec, actual connected-client denial.
- [ ] Cases after original expiry use explicit historical synthetic rows with real native SQL time, not clock renewal/fabricated OAuth success.
- [ ] Run existing Actions npm test -> expected missing factory RED, prior suite remains baseline2410PASS1SKIP. No local execution.

## Task2 — host/view GREEN
Create lib/delegated-preparation-connections-http.mjs; extend lib/delegated-preparation-consent-view.mjs; add docs/AFW-PREPARATION-CONNECTIONS-HTTP-2026-10-20.es.md and additive full-original AGENT prefix.
- [ ] Strict factory/profile/management/pins/defaultnull, request lease/identity/rate/bounds and no reflected failures.
- [ ] Exact primary own admitted grant association/list/state; one-use hashed nonce with current management expiry; explicit primary scoped revocation + fresh receipt and no retry.
- [ ] Reuse comic CSS/summary, scoped escaped forms/closed states; no server-secret/custody/new DDL.
- [ ] Full Actions npm test/lint/fivebuilds GREEN; inspect all output, failures classified. Do not download artifacts/deploy.

## Task3 — one review and integration
- [ ] Fresh whole-branch review base0289523868372b0d25bcbca5f1477baf84512361→candidate. Critical/Important native RED→ONE fix pass→GREEN; Minor ledger/defer.
- [ ] Exact tested head/tree merge and fresh main CI/artifact metadata/current ref. Final issue497 receipt closes1–3 and supersedes stale plan boxes without docs-only CI churn.
- [ ] Preserve explicit exclusions: synthetic CI not Cloudflare identity/human/remote proof; DDL remainsUNINSTALLED; no callback/G3/G4/G5/G6 activation.
