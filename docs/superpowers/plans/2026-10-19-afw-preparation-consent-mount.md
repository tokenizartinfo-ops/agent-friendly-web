# AFW preparation consent/mount — source implementation plan

19 October2026. Source base1a85b150d5441343475cf404aae23f235a467dd9.
Spec: ../specs/2026-10-19-afw-preparation-consent-mount.md
Status: PLAN ONLY. No new source module, runtime call, scope/credential/DDL/remote operation is authorized or executed by this plan. operationalReadiness=false.

## Scope and execution
Implement source inline in isolated GitHub branches, existing Actions only; no local clone/install/build. Use executing-plans/TDD for behavior and one fresh whole-branch review for each implementation PR. Important/Critical findings: reproduce RED then one fix pass/GREEN, no review loop. Preserve other changes and current runtime.
Owner has authorized autonomous bounded source work; real consent and remote rollout remain concrete separate gates, never inferred from broad authority.

## Step1 — detached preparation consent policy
Future paths lib/delegated-preparation-consent-policy.mjs and test/delegated-preparation-consent-policy.test.mjs, names provisional until implementation.
- Strict plain-data input, reject unknown/duplicate scopes and accessor/oversized records.
- Server profile defaults closed. Preserve existing read profile semantics; new profile allows only read or read+prepare, no evidence combination in first own trial.
- UI decision enum maps to a subset of provider-original requested scopes; no caller-supplied authority. Preparation requires explicit choice.
- Compute absolute expiry from original transaction end, trial end and approval+10min; safe integers/canonical times, original clock continuity and deadline checks. No implicit refresh.
- First meaningful CI RED before policy implementation; test no mutation/IO/fetch/model/grant side effect.
- GREEN closes only pure-policy source. Does not certify identity, schema, provider transaction or consent.

## Step2 — consent/store integration in fixture
Do not expand a live client's registration. Inspect schema CHECKs/indexes/store transaction behavior before choosing new persisted fields or kind; design an additive migration separately if needed. Do not silently encode unverified profile data in free-form fields.
- Reuse SDK parse/begin/approve/complete and actual authorization-code/PKCE exchange in runner, ephemeral own test secrets/keys only.
- Fresh primary owned project, domain claim and exact preparation schema preflight before preparation offer and grant admission.
- Reject malicious origin/subject/client/resource/project, repeated form keys, replay, duplicated/out-of-request scopes, changes during awaits.
- Grant scope equals visible choice; readonly outcome cannot register preparation tools. No second grant on unknown persistence ACK; close/reconcile.
- Assert original absolute expiry across GET/POST/exchange/token context; refresh not offered by preparation profile.
- Cancel/revoke and partial completion failures preserve history, no success claim without authoritative receipt.
- Existing read-only flow regression mandatory. No new human/OTP flow yet.

## Step3 — accessible consent/view source
- ES/EN/PT active languages and comic brand remain consistent with existing product; no fake capabilities.
- Clear read-only vs read+draft buttons, cancel, project/client/site and expiry; explain draft is saved but not installed/approved/published/charged.
- Connections render actual scope, not current read-only label; revoke says next operation is blocked and saved history remains.
- Real rendered component/page, mobile/keyboard/focus/error evidence in runner. No new external font/image dependency.
- Deciding routine test choices for Gabriel is allowed; customer consent cannot be fabricated by a helper.

## Step4 — explicit MCP mount in source fixture
- Do not duplicate host/domain/DTO; reuse PR504–509.
- Admit bytes before OAuth; same server-issued opaque5s lease through body/auth/host/response, no new budget after await.
- Same authorized factory for official legacy classifier+explicit JSON transport and modern createMcpHandler; preserve401 Bearer and strict caps.
- Register preparation only under current verified scope and exact profile; otherwise existing read-only catalog. Admission still rechecks token/grant/owner/claim/revision.
- Native two-protocol tests include delayed-auth cancellation (not demonstrated by PR509 native fixture), late cleanup, absent schema, one write/lost HTTP ACK/manual read, revocation.
- No mounting in production by a test success.

## Step5 — additive schema and single real trial design
A future separate operational plan must inventory exact current account/Worker/D1/client/source/configuration, recovery material and installed schema, test populated migration/concurrency/human-writer compatibility, prove closed candidate and explicitly fix future start/end/budget.
Do not install this source DDL, issue credentials, register scopes/clients, renew grants, deploy or ask OTP under this documentation PR. Do not delete old grants/history or namespace. Real closed publication and consent need their specific applicable authorization and current evidence.
After source/migration acceptance, prepare a NEW own-only<=10min window; one preparation/manual reconciliation/revoke/denial/closure. G2 remains closed and is not repeated.

## Stop conditions and evidence
Unknown write/ACK => read reconciliation only under current authority. Expired/revoked permission => stop, no new key/reconnect/token renewal. Stale source/configuration/owner/claim/schema => closed failure with sanitized evidence.
Record project/repository/environment/origin/resource/action and exact base/head/tree/CI/review/integration refs in issue497. Never store secrets, bodies of OAuth callbacks, full D1 records or actual private answers in public GitHub evidence.
No Max, payment, installation, model, event consumer, cron/Container/guard activation or PC-off acceptance.
Source rollback is a reviewed revert; data rollback is not inferred. Retain additive history and legitimate later activity.

## Documentation-block closure
This plan and linked spec define the next work; they DO NOT mark Steps1–5 completed. Exact reviewed docs revision, CI and merge are recorded on the carrying PR/issue497. No tests that merely assert Markdown wording are added. Remaining choices about actual schema/profile persistence and capabilities must be resolved from fresh code/schema evidence before implementation.
