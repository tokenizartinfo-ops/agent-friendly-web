# Task5-B2-C1 — PRE-T0 QA provenance implementation

SOURCE ONLY. Implementation complete for independent review; not accepted/promoted by this report. Task5, C3 and runtime remain incomplete.

## Revisions, authorization and preservation

- Repository tokenizartinfo-ops/agent-friendly-web; isolated branch feat/finite-native-cleanup-20261101.
- BASE a609c1f3296177f73468ca8c708b9333330f1d32; actual base tree 11c45633629654313e58a908c5977e6a75ea9296.
- Root selected the exact [contract](../specs/2026-11-02-finite-pre-t0-qa-provenance.md). ContractHEAD 1ae574eb9184ca3a9c422ebe275e730859edbff7 persisted spec/plan/ledger BEFORE tests/product.
- RED1 testHEAD 370a69138f5b5d50233da067083bc2cf607e2006. RED2 testHEAD 2c5da36a29ea1b30b4cc264470fdaccde1eb7031.
- Initial code 28670e55199d42c9ccc0e6b03509a4eadbdf8cc9. Final codeHEAD d22d5366069ff569e428bc051a3e524f93abeed0.
- DocHEAD is the commit containing this report; its exact SHA is emitted in the final CAS/ref receipt (a commit cannot embed its own SHA). Source code and tests are frozen at codeHEAD pending fresh Root review.
- Each source mutation used the actual parent tree, new tree/commit, branch expected_sha CAS, subsequent ref equality, and exact changed-file content readbacks. Counts: contract3, RED1 2, RED2 5, initialcode12, correction2. No force/reset, main mutation or other writer. Parent revisions remain rollback evidence; no runtime rollback is applicable.

## What exists

The dedicated command is /afw-qa-finite-bootstrap v1 <M>, owner-created issue497/main/attempt1 only, separate from post-T0 finite confirmation and first HEAD. P0 is original comment time, Pend=P0+300000 includes queue/install/compiler/mutations/readbacks and eventual successful step/job. Native can read provenance later if original completed-success timing and fresh current source/QA/custody/parent qualify; no owner15min/read10min clock starts.

Seven separate lib/mcp-qa-finite-bootstrap-* modules implement exact public grammar/hash, original admission, GitHub primary qualification, narrow QA publication byte/profile read, QA-only literal source commitments, GHA source issuer and unmounted native reader. The actual CLI and future afw-finite-qa-bootstrap.yml use the existing environment and source-scoped credentials. No production-source workflow was dispatched.

Actual same-checkout compiler now verifies tracked bootstrap workflow/CLI at git M before/after, embeds their SHA256 plus M/tree in QA-only eager literal residency, and excludes issuer/compiler/esbuild from runtime graphs. No QA selfhash. Existing full-package/source-authority/owner-source unavailable gates are unchanged.

GHA internally compiles actual QA bytes, verifies existing9db receipt identity/expiry, reads actual fixed QA pointer/modules/configuration, rejects secret metadata values before fingerprinting, and requires an unchanged pointer. QA profile is exact: every required configuration field must exist; extra or unexpected normalization is denied. It calls no full-package qualifier/bypass. CF budget4 GET; GitHub issuer budget32 requests, current success path27. Transport remains bounded and uses original admission.

The source issuer creates only an annotated Git object and its fullUUID ref, with cap spent before first POST. Unknown tag/ref ACK and conflicts never refund or resend. It sees only in-progress original step/job; native later verifies actual completed-success. The public canonical record is <=16KiB and contains only listed technical fields/hashes.

Native reads exactly3 CF (token verify and before/after deployments) +11 anonymous GitHub requests. It checks actual DO namespace/id/storage and env holders, original <=30s parent and <=5s children, retained actual promises, current main/ref, immutable tag object, source-file blob/body hashes, and original completed-success job/step times. No native QA version/content GET, GHA credential, cache/proxy/retry or source-context authority. Direct qaCodeProvenanceVerified=false; scope/source/effects/readiness/fullpackage remain false.

## Essential trust limitation

Git refs are MUTABLE by other repository writers/admins. This unit implements source-owned write-once/no-reset behavior under the explicit TRUSTED REPOSITORY WRITER/GOVERNANCE ASSUMPTION. Current ref/object/payload/source/job correlation does not prove historical nonmutation, detect an away/back move, establish full actual publisher identity, or grant owner/business permission. Evidence explicitly carries repositoryWriterTrustAssumed:true and historicalRefNonmutationVerified:false. A later initial publisher/owning source wrapper MUST explicitly accept this boundary or require stronger proof before an owner window. No ruleset, key, OIDC or attestation service was inferred.

The named bridge returns qaPublicationBridgeVerified:true only for the bounded source-governed technical facts. It is not a registry, caller context mint or public capability. The source-only native reader is unmounted.

## Exact hosted validation

Existing lockfile, Ubuntu24.04/Node22, contents:read temporary branch/path-only qualifier; no secrets/artifacts/deploy, no workflow_dispatch and no docs-only trigger. EXCLUDE .github/workflows/finite-task1-temporary-qualifier.yml from integration.

Commands:
- npm ci --ignore-scripts --no-audit --no-fund
- node --test test/*finite-bootstrap*.mjs
- node --test test/build-finite-native-package.test.mjs test/mcp-qa-finite-profile.test.mjs test/mcp-qa-finite-candidate-residency.test.mjs
- npx eslint lib/mcp-qa-finite-bootstrap-*.mjs scripts/run-qa-finite-bootstrap.mjs scripts/build-finite-native-package.mjs worker/independent-closure/finite.mjs test/*finite-bootstrap*.mjs test/fixtures/finite-bootstrap-world.mjs

RED1 [41509260066](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/41509260066), job125496535802, attempt1, testHEAD370a6913: 23 expected missing-product behavioral failures,0pass/cancel/skip; lint passed.

RED2 [41510465768](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/41510465768), job125500702758, attempt1, testHEAD2c5da36a:81 expected absent-product/independent-compiler-commitment failures,0pass/cancel/skip.

First code [41510742455](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/41510742455), job125501631662, attempt1,28670e55:63passed/18failed. One overescaped compiler regex prevented compiler/issuer imports; lint additionally rejected the fixture variable named module. Correction d22d5366 replaced the predicate with explicit string inclusion and renamed the fixture variable. No provider/custody diagnosis or runtime change.

GREEN [41511052481](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/41511052481), job125502671941, attempt1, exact d22d5366069ff569e428bc051a3e524f93abeed0:
- 81 new tests PASS:23 grammar/admission,24 primary,17 actual issuer/CLI,16 native,1 actual compiler.
- 34 affected compiler/profile/candidate-residency regressions PASS.
- Zero failures/cancellations/skips; scoped lint success; artifacts0. Root independently read exact run/job/logs/artifact count; no rerun.
- Actual compiler QA1,762,180 bytes (cap3,145,728, margin1,383,548); canary1,942,384 (cap2,097,152, margin154,768). At this exact source only, not a future size guarantee.
- Baseline warnings: Node punycode deprecation in setup action; checkout/setup-node v4 Node20 target forced to Node24. No test/lint warning was suppressed. Negative candidate-residency cases intentionally emit unavailable errors while their assertions pass.

## Actual versus synthetic boundaries

Actual Node-executed issuer/CLI/parser/admission/primary/publication constructors and real same-physical-checkout compiler run. CF/GitHub HTTP, owner event, Actions identity/phase, environment credentials and custody approval are explicitly SYN. The issuer re-compiles real source; no whole-success compiler/source DTO, authority override or provider access. Unknown ACK tests perform synthetic tag/ref writes only, assert spent caps and no repeated POST.

Actual native module runs in Miniflare/workerd DurableObject with real ctx/storage/namespace/id and RPC. Its test host, compile source constants, CF/GH responses and custody approval datum are SYN. These are actual Worker/DO reader tests, not production mounting or actual cloud permission evidence. They verify direct/source authority false, exact3CF+11GH budget, no QA code endpoint/GHA bearer, pointer/ref drift, stale/cache denial, wrong identity/QA, unfinished step, original aborted/expired parent, holder replacement and namespace mismatch. A held actual provider promise cannot continue reads after original abort; no remote physical-settlement proof is claimed.

Positive custody fixtures substitute only explicit SYN approval data with real elapsed clocks. The focused native expiry case preserves the exact production CEILING2026-11-03T02:59:00Z and instruments only reader clock at the boundary, proving denial before HTTP. The real9aa ceiling and9db receipt remain unmodified; no renewal or caller clock/pin hook.

## Remaining gates and STOP

No actual tag, production-source workflow run, owner command, provider/private query, initial QA/canary publication, resource/config/schema/credential change, owner window, capsule, new goal/project/consent, forwarding, main merge, local source/dependencies/build, Max/email/chat/automation or PC-off trial.

Initial publication must carry actual compiler bytes through separately authorized upload ingress and verify returned version; multipart Upload Version is distinct from deployment and requires write permission. Artifact IDs/hashes are not byte transport; current read custody is not publishing authority.

Anonymous GitHub rate/availability and3CF+11GH within the real parent (future owner wrapper may clip it to5s) remain actual deployment-usability gates. No cache or new key was invented. Source/context authority, original private initializer, all-writer material/mounts, C3 useful consumer/baja/closure, complete package and runtime remain pending.

STOP WRITES for fresh Root spec and quality review. operationalReadiness=false; completePackage=false; PCoff=false.
