# AFW preparation Worker package Implementation Plan
> For agentic workers: REQUIRED superpowers:executing-plans, inline authorized by Gabriel; one fresh whole-branch review, no per-task agents.
Goal: source-only isolated Worker entry and exact-source config-free cloud artifact.
Architecture: same accepted router/AS/KV/D1 per request, explicit original server windows and original ingresslease; no legacy read Worker changes or remote target.
Tech Stack: ESM/esbuild/workerd/SDK1.2.1/PKCE/D1/KV/jose, existing lockfile/Actions; no dependencies.
Spec: ../specs/2026-10-20-afw-preparation-worker-package.md

## Global constraints
All numbers/keys in spec apply: original request5000ms, original windows600000ms, request4096/output32768/URL8192/bundle2097152bytes; es/en/pt. Closed/unmounted/no remote DDL/config/client/scopes/perms/creds/deploy/discovery/refresh; G2CLOSED/noOTP, operationalReadinessfalse. GitHub branch/Actions/canonicalissue497 replace local worktree/sdd under owner cloud preference. No local clone/build/download; source revert5295b5d6 is rollback. Owner20oct explicitly approved block1 and delegated design decisions: artifacts remain reviewable in PR; do not repeat routine approval menus. Live/customer/secret gates unchanged.

## Review Focus
1 Missing/expired/offset dates must not default to now or hide independent own withdrawal.
2 A fresh request/router instance must not extend original profile/token lifetime or reconstruct a withdrawn grant.
3 Config or trusted-options drift during a genuine await must reach existing child guards, no new root post-handoff remapping.
4 Disabled entry must not inspect other bindings/parse body/auth; enabled original lease includes decoding/router construction.
5 Artifact must bind exact Git source/bytes, not deploy settings or assume Git source attests installed dependencies.

## Task1 — actual Worker source contract
Files create worker/mcp-preparation/index.mjs, test/preparation-worker-native.test.mjs, test/fixtures/preparation-worker-native.mjs.
Consumes createDelegatedPreparationRouter(options)->handler(request,ctx,originalLease?); create/readCapsulePreparationRequestLease; existing validators and real CI preparationCodeCiContext(env).
Produces createDelegatedPreparationWorker({accessVerifier?,now?,monotonic?}={}) -> frozenfetchWorker and default no-options Worker; no SDK exposure.
- [ ] Test-only head before implementation: missing-entry assertion before native bundle, explicit expected factory behavior; full CI retains2440PASS/1SKIP outside new cases.
- [ ] Native disabled default response404/no-store/no body/dependency clock work; malformed required enabled config503, no nonce/grant; exact dates/source windows unchanged across new fetch instances.
- [ ] Same D1/KV actual explicit read/drafts/PKCE/MCP/prepare/reconcile/withdraw flow using actual exported Worker; CI-only signed Access verifier and registration fixture. Scope remains original, no refresh or metadata/register fallback.
- [ ] Actual held identity and scalar change/expiry cannot create state or mint another5s. Expired-profile active-management and short-management cases preserve human GET/withdraw behavior without past OAuth claim.
- [ ] Implement minimal Worker after completed RED: bounded canonical dates from speckeys, fixedprofile, originallease BEFORE config/route construction, repeated scalar snapshot through clocks, request-local AS. No production CI hook.
- [ ] Full Actions npmtest/lint/fivebuilds expectedGREEN, observe completed logs. Commit native result/limits to ledger before nexttask.

## Task2 — cloud-only source artifact
Files create scripts/build-preparation-worker.mjs, test/preparation-worker-build.test.mjs, .github/workflows/afw-preparation-worker-build.yml, docs/AFW-PREPARATION-WORKER-PACKAGE-2026-10-20.es.md.
Consumes Task1 entry; existing verifyMcpReleaseSource({cwd,sourceRevision}) -> {sourceRevision,tree}. Produces buildPreparationWorker({sourceRevision}) -> {script,sourceRevision,workerHash} and original CLI index/build.json per spec.
- [ ] Test-only new RED before builder: invalid explicit revision rejects, actual candidate bundle required and hash tied to bytes. Native closed-worker build can execute default branch without env dependencies; no source-string capability assertion.
- [ ] Implement minimal esbuild config/size/hash, CLI before/after exactGit source check, non-secret manifest and runner output only. No Node/Container artifacts.
- [ ] New same-repo PR/main-only build workflow15min/read-only/7days. Expected exacthead source/hash validated; no Cloudflare credentials/IO/deploy. Workflow shared-input paths cover accepted router/lease/hosts and builder/verifier.
- [ ] Full CI + separate actual cloud build GREEN. Inspect logs/provenance/artifact metadata only; never downloadZIP/build locally. Preserve source/hashes and limitation dependency attestation.

## Task3 — one review/integration/continuity
- [ ] Whole-branch review all entry/builder/workflow/docs and unchanged authority dependencies, reviewfocus above. Important nativeRED→ONEfix→fullGREEN; Minor defer, no secondreview.
- [ ] Exacthead merge, same tree/parents/currentmain and fresh fullCI/main buildartifact receipt; supersede plan boxes via canonicalissue497 rather than admin CI churn.
- [ ] Document no live target, schema, client, service availability, human auth/Container/events/PC-off/Max claim. Next separately planned block2 consumer example, then recipes, UX actualfindings, measurement. All five not declared complete by this block.

## Preflight and rulings
Task1→2 exports exactly createDelegatedPreparationWorker and default; builder bundles default entry, nativefixture imports namedsourcefactory only. Existing source verifier includes all worker/lib/scripts inputs; build writes only ignored output. No interface conflict.
Ruling: request-local router/AS uses SAME actual KV/D1 but not one global JS object across fetches. Original configured dates and durable D1 decide authority. Cost: repeated construction and no cross-request in-memory terminal-config guarantee; never promise durable revocation from a flag. Actual D1withdrawal remains terminal and natively tested.
Ruling: original lease owner is Worker fetch, borrowed by router/children, clocks include repeated raw scalar config; no async outer response check. Cost: conservative unavailable response on drift, unknown outcome may need manual reconciliation.
Ruling: server-only optional verifier/clocks are for source integration/qualification, not env/browser/plugin arguments; production default uses accepted real verifier. No secrets shipped in bundle.
Ruling: source artifact configfree and buildOnly marker is informational, not an authorization token; future deploy is separately scoped. Cloud build does not attest live runtime or installed dependency provenance.
