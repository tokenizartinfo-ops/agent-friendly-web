# D0.1 — exact QA SDK alias SOURCE contract

## Scope and provenance

- Project: Agent Friendly Web; repository `tokenizartinfo-ops/agent-friendly-web`, ID `1347578006`; candidate branch `feat/finite-native-cleanup-20261101`. No main, PR, merge or runtime action.
- BASE `7067c850914353d720eac67e039216bd19ec1268`, tree `6b1fbd2329d89e16415e65b4c6082114e58ae96d`. Code HEAD `9fe7e2f53f4e594879b3992e5751fe631c03ec60`, tree `ee2817c5d711b073a12ccd7fa2aef2f840e577f4`. This report and deletion of the temporary qualifier form a later docs/CI-only commit; its exact HEAD/tree are in GitHub commit metadata and handoff.
- Preflight: `docs/superpowers/briefs/2026-11-04-finite-owner-sdk-trust-boundary-d01-preflight.es.md`. Root accepted the bounded D0.1 source task after the independently accepted first-primary reader/pure conversion at BASE. D0.2/D0.3 remain inactive.
- ALLOWED_ACTION: source profile/config/helper, scoped tests, credential-free GitHub Actions. Source owner permissions unchanged. No Cloudflare/provider contact, real binding, namespace, secret, token, OAuth, OTP, SQL, SDK call, actor, route, POST, grant, Entry, deployment or rollback execution.

## Exact access delta

The qaLive source template and finite Wrangler config add exactly `AFW_FINITE_OWNER_OAUTH_KV` → existing `6b94ff702e504e14a7730cee73a0f6ff`. If installed later, this is **namespace-wide QA Worker read/write**, not a per-key or per-actor permission. This task supplies no actual capability or provider access-review receipt. M's physical OAUTH_KV and `wrangler.mcp-own.finite.jsonc` remain unchanged; `qaClosed/c570`, `canary/2607`, `QA_CLOUD_CLOSED_PINS`, source flags/date and historical records remain unchanged. BASE and code HEAD blobs for M Wrangler, historical pins, anchors, Entry records, effectful Entry, bootstrap source, candidate residency and phase-context are identical.

`qualifyFiniteOwnerSdkBindingFacts({qaMetadata,mMetadata})` returns only frozen `{alias,namespaceId,bindingHash}`. It snapshots bounded plain DATA without accessors, symbols or prototypes, requires the full exact qaLive configuration and one pinned QA KV alias, and checks a complete M preparation configuration with exactly one pinned `OAUTH_KV` and no extra KV/OAuth alias. Its hash domain is `afw.finite-owner-sdk-binding.v1` over canonical `{alias,namespaceId}`. It does not qualify M's private phase, read provider state, accept an SDK/env/caller verifier, or return authority. Current QA source must separately qualify the entire phase in a future unit.

Revised QA bootstrap/publicStatic must be established **before** the one original Entry, material and capsule. Actual codecs reject an old sealed QA bootstrap binding commitment. Original material embeds `qaBootstrap.record.qaLive.publicStatic`; changing it changes `materialHash` and the capsule commitment. `capsule.bindingsHash` remains the M full-binding commitment only. No old Q relabel, in-place upgrade, fallback profile, second Entry or clock reset is authorized. The source ceiling `2026-11-03T02:59:00Z` remains expired; native fixtures use disclosed SYN ceiling/source envelopes and native SQLite time. `operationalReadiness=false`, `completePackage=false`, `PCoff=false`.

## Cloud qualification

All Actions used `ubuntu-24.04`, Node 22, `actions/checkout@v4` with `persist-credentials:false`, `contents:read`, `npm ci --ignore-scripts --no-audit --no-fund`; no cloud credentials were provided. The temporary workflow was `.github/workflows/afw-d01-source-qualifier.yml`, removed in the report commit.

| Stage | Commit; run/job/attempt | Result |
| --- | --- | --- |
| RED `node --test test/mcp-qa-finite-owner-sdk-binding-facts.test.mjs test/mcp-qa-finite-profile.test.mjs` | `7f414d3e4dbda3209fb9ff39f718571a577ea744`; [41945109093](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/41945109093) / `126975258740` / 1 | npm ci passed; 9 pass, 3 causal fail: helper absent and QA alias absent. |
| First GREEN scope + compiler | `b26a16754549a5669923bb4b82c1c6483a91b34a`; [41945530726](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/41945530726) / `126976662473` / 1 | lint passed 0 errors/16 warnings; scoped 143 pass/0 fail; final compiler **gate failed** at existing test line 16. `compileFiniteNativeStaging` had returned, but the test wrongly required M to exclude pure Entry records already reachable at BASE. No compile hash was emitted for this failed gate. |
| Corrected gate | `9fe7e2f53f4e594879b3992e5751fe631c03ec60`; [41946053720](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/41946053720) / `126978408579` / 1 | lint passed 0 errors/16 warnings; scoped 143 pass/0 fail/0 skip; compiler gate 1 pass/0 fail. |

Root ruling on the failed gate: at BASE, `mcp-qa-finite-initial-anchors.mjs` already imports `decodeFiniteInitialEntry` from `mcp-qa-finite-initial-entry-records.mjs`, which imports pure material records. The Entry records module exports only pure hash/encode/decode DATA functions, with no I/O or authority. The compiler test now requires QA Entry and Entry records, permits the shared M DATA records, and still excludes the effectful `mcp-qa-finite-initial-entry.mjs` from M. Bootstrap-source/issuer, filesystem and esbuild graph exclusions remain. This is a correction of an obsolete test assertion, not evidence that the new alias changed the M import graph.

Actual compile calls were counted from test entrypoints: no compile in RED; **two** in the first GREEN run (cached issuer fixture, then direct compiler call before failed assertion); **three** in the final GREEN run (cached issuer fixture, direct compiler call, then `buildFiniteNativePackage` internally calls the compiler again before its expected fail-closed rejection). Total **five** actual `compileFiniteNativeStaging` calls over both GREEN runs; no separate standalone build. The successful compiler metadata below is from the final exact clean code HEAD.

## Final compiler and codec evidence

| Role | Module bytes / limit | Actual module SHA-256 | Public static hashes |
| --- | --- | --- | --- |
| qaLive | 2,020,216 / 3,145,728 | `e0647b4df123733a44959a3a7c028826678f763cc76b885283ee6aed8b6102be` | configuration `3b74b975b31c48e89c10b244e89563c7ef923e0389bbba70c1e48a26176421f4`; profile `07e20e6999481a728387c03a261dfa7ab95d854850097f0f94b2cefd3a1519b4`; bindings `102e47683eda68256040840bac90ae81c4b335734690a459f8ce52ca3b1d16e4` |
| canaryLive M | 1,951,873 / 2,097,152 | `0dd8bf287e1f18ec611c6c1d288952eaa026b847ec07fb006c4970d99cce36c3` | configuration `443c0eb833ba7b70419419533c72023b9e4c27f76f7f2faf33217b4591ad1b36`; profile `6203717476c095a0035bcfac8d38cf8f6f20bc105e23fac859eef1704525dccb`; bindings `9ac9576919b2a68da89c02cd6819f1246f27929e61754a46d804ec7dd9c2a169` |

Compiler source revision `9fe7e2f53f4e594879b3992e5751fe631c03ec60`, source tree `ee2817c5d711b073a12ccd7fa2aef2f840e577f4`; metafile input counts QA 304, M 330. Checked-in QA Wrangler config equals the exact source template. Compiler checked workflow/CLI hashes in QA only, no forbidden node:fs output imports, no effectful M Entry/QA bootstrap issuer or esbuild import, and preserved fail-closed incomplete package. M module SHA at this HEAD is actual build evidence; no historical module hash was reused.

Actual codec fixture in final GREEN run: revised QA public bindings hash `102e47683eda68256040840bac90ae81c4b335734690a459f8ce52ca3b1d16e4`; synthetic `materialHash=bcc63ed54642e56a096981993bbf33e877d9376a53b316061c0a35f281806ac2`; synthetic `capsuleHash=2457979db716b383e74903e97027fdc0c6339108b1c12103c984371a3d767387`; synthetic M `capsule.bindingsHash=06420ca93be6622eebd2ba6d42195b5d55512008119e7ea807292628e8ceec9e`. Fixture hashes vary with synthetic timing and do not attest a real Entry or publication. Original material/capsule domains are `afw.finite-initial-material.v1` and `afw.finite-initial-capsule.v1`.

Warnings: 16 pre-existing repository lint warnings, 0 errors; npm deprecations for `@esbuild-kit/esm-loader@2.6.5`, `@esbuild-kit/core-utils@3.3.2`, `eslint@9.39.4`; Node `punycode` deprecation; Actions checkout/setup-node v4 Node 20 deprecation notice. No unrelated warning fixes.

## Review and next boundary

BASE→code HEAD diff is limited to QA profile/config, pure binding helper, scoped tests, temporary Actions qualifier and preflight. The qualifier is removed with this report. Self-review found no runtime import of the new helper, no changed M physical configuration/historical pins and no added operational path. Root's independent D0.1 acceptance/rejection remains pending. A later task must separately review actual provider alias grant and rollback/readback, establish a revised QA publication/bootstrap before a new original Entry, and implement D0.2/D0.3 only under their own scope. This report does not establish provider access, full phase qualification, SDK use, owner consent, operational readiness or PC-off.
