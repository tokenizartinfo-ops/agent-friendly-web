# Original owner first-phase factual context — source qualification

4 November 2026 (America/Argentina/Buenos_Aires; final CI ended 5 November UTC). Implementer source evidence for root review, not operational acceptance.

## Revision and authority

Repository `tokenizartinfo-ops/agent-friendly-web` (1347578006), branch `feat/finite-native-cleanup-20261101`. Authorized activity: bounded source/test/report commits and credential-free GitHub Actions. Rollback material remains in immutable BASE and parent commits; every update used expected-head CAS and `force:false`.

- Activated BASE: `220b5bc323315b7f107967548fb8958c0f8234f2`, tree `246e4f8867331f889cb99f4ebdef557e38e5b3c4`.
- Final code and actual compile HEAD: `8381d5aa7554792f21c04b1c39b95849e7710f05`, tree `14a4588d7842f74ee7f1936fef074d8c0ca78ac9`.
- Report HEAD/tree: the immutable containing commit/tree of this file, resolved in the final root handoff. A Git commit cannot contain its own resulting SHA. Its parent is the exact code HEAD above; its only delta is this report and deletion of `.github/workflows/afw-finite-owner-phase-context-qualifier.yml`. No compile hash is attributed to that later report/removal commit.

Requirements: [brief](../briefs/2026-11-04-finite-owner-phase-context.md), [spec](../specs/2026-11-04-finite-owner-phase-context.md), [activation/preflight](../reviews/2026-11-04-finite-owner-phase-context-preflight.es.md), all at BASE. One product writer, no delegated agents/reviewers, no local clone/dependencies/build/tests.

The accepted predecessor is [incoming Request.signal composition](2026-11-04-finite-request-signal-opt-in.md), integration `949d84784e83f8859421242edeab3f68c5db93a3`. Its actual compiler `6d17d438becca708da5baae70129c73fc118bf98` and hashes do not qualify this changed graph. Accepted signal regression run41933043117/job126934496033 and retained physical read/cancel 14/14 evidence were reused, not rerun as an opt-in experiment. Profiles remain exactly QA `[nodejs_compat,enable_request_signal]`, M `[nodejs_compat,global_fetch_strictly_public,enable_request_signal]`, compatibility date `2026-09-07`.

## Delivered behavior and boundaries

The fixed QA reader returns only the frozen strict envelope `{source,preconnectionId,capsuleHash}` for `closed_ui` or the first settled connection's `read_consent`. It independently derives original capsule/material/QA/resident/backup/current owner/provider facts twice. Exact original baseline uses `finiteActivationConfigurationHash(plan.configuration)`; the historical rollback comparison remains explicitly `restorationConfigurationHash`. No role inference from flags or validator fallback.

Two pure DATA helpers qualify installed stage linkage and original enrollment linkage without I/O, callbacks, env, authority or phase switches. Common `stageHistory` gathers its original referenced ticket and records and delegates predicates, retaining final `currentPublication` comparison/result shape. Cleanup delegates only enrollment predicates, retaining its inventories, absence/zero-state and reread contracts. The QA adapter changes only its lexical reader import/call.

The reader requires exact retained Backup/Receipt/chunks and original tuple, byte lengths and hashes; original M metadata even after first publication; full current module/configuration (only delegated OAuth enabled changes for first connection); original-A preparation/enrollment/journal identity; all settled SEND/ACK/receipt correlations and current primary owner/issuer/link facts. Unknown SEND, later stage/private placeholders, mismatched metadata, cleanup progress, revocation/expiry, untrusted holders or between-snapshot drift deny without repair or retry.

Every independent current SQL observation obtains a new `withSession('first-primary')` and starts with SELECT. No original reserved grant UUID means no grant query or owner/client-wide grant scan. Exact issuer reservation/OPEN/authorization/consumption/grant/link/relation prefixes are factual, never next-stage permission. Consumed-without-grant remains an observation; the reader does not repair it.

Original request root, holders, signal and deadline are borrowed and rechecked around retained awaits. Parent <=30000ms, child <=5000ms, original I0/C0/C1, technical I0+300000, commandBy-510000 and nominal/launch clocks are unchanged. Logical timeout/abort does not release actual fetch/read/body/cancel work; native tests wait for genuine settlement before disposing resources.

Strict standalone initial owner source is unchanged and denies the same approval/enrollment and settled read_consent states that the new factual reader accepts. Existing GET-only private continuation, private POST reader-zero rejection, pending conduit/host-effect-zero behavior and setup-facts pending expectations remain.

## Narrow root rulings

[Schema ruling, docs commit258de8aabaeec1939dc91727575d093446c2d771](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/258de8aabaeec1939dc91727575d093446c2d771/docs/superpowers/reviews/2026-11-04-finite-owner-phase-schema-ruling.md): a fresh-primary SELECT of sqlite_schema by exact fence-table name may observe ABSENT only when the original issuer family and referenced GrantLink/relation are absent. This permits factual context, not schema readiness/global grant absence/issuer eligibility. Existing schema must exactly match; original reservation/link/relation with absent schema, failed/malformed schema, orphan fence or schema drift denies. Schema presence participates in both snapshots. All granting paths retain their existing actual-ready-schema requirement; product schema/issuer mutation files are unchanged.

[First-GET prefix ruling, docs commit6c6d66767659b49cd13121a07fdc14d5f2d16c6f](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/6c6d66767659b49cd13121a07fdc14d5f2d16c6f/docs/superpowers/reviews/2026-11-04-finite-owner-first-get-prefix-ruling.md): unchanged common GET writes Snapshot -> ProjectRef -> Ticket and rechecks source after each write. An exact original independently rederived Snapshot with missing referenced Ticket may remain closed_ui, only with no preconnection/stage/enrollment/effect/issuer/link/relation and no referenced TicketUse. No ProjectRef guessing/global scan. Both snapshot-only and map-before-ticket prefixes are factual; once Ticket exists its exact map/subject/project/realm/expiry is required. Missing Ticket grants no eligibility. Raw relevant prefix and ticket absence are compared twice. Actual GET now completes 200 through this cycle; orphan use/foreign/stale/later missing-ticket cases deny.

## Commands, causal evidence and chronology

All runs below are attempt 1. The own push qualifier was restricted to its own path on the feature branch, `contents:read`, checkout `persist-credentials:false`, Ubuntu24.04/Node22, `npm ci --ignore-scripts --no-audit --no-fund`, bounded jobs (10 minutes in final qualification). No credentials or remote provider calls. The final compiler depended on lint and both affected test jobs.

Command labels:

- **DATA:** `node --test test/mcp-qa-finite-owner-phase-context.test.mjs`
- **NATIVE:** `node --test test/mcp-qa-finite-owner-phase-context-native.test.mjs`
- **FINAL:** `node --test test/mcp-qa-finite-owner-phase-context.test.mjs test/mcp-qa-finite-owner-phase-context-native.test.mjs`
- **ORIGINAL/CLEANUP:** `node --test test/mcp-qa-finite-initial-owner-source-native.test.mjs test/mcp-qa-finite-initial-owner-source-records.test.mjs test/mcp-qa-finite-preparation-cleanup-native.test.mjs test/mcp-qa-finite-preparation-cleanup-records.test.mjs`
- **CONTINUATION:** `node --test test/mcp-qa-finite-owner-context.test.mjs test/mcp-qa-finite-owner-original-context-native.test.mjs test/mcp-qa-finite-owner-native-conduit.test.mjs test/mcp-qa-finite-owner-request-retention-native.test.mjs test/mcp-qa-finite-policy-setup-facts-native.test.mjs`
- **FIRST GET:** `node --test test/mcp-qa-finite-owner-original-context-native.test.mjs`
- **COMPILE:** `node --test test/mcp-qa-finite-candidate-residency.test.mjs`, with `test -z "$(git status --porcelain)"` before and after; this existing test invokes actual `compileFiniteNativeStaging` once.

Scoped lint was `npx eslint` over the ten files in the task file map, before focused GREEN; later gates used `npm run lint` before tests.

| Code HEAD | Run / job | Command and observed result |
| --- | --- | --- |
| f77792ee440f9122a31fa5967d55da709400dcd0 | [41935384059/126942418825](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/41935384059/job/126942418825) | DATA RED: 1 file FAIL, 0 pass/cancel/skip; ERR_MODULE_NOT_FOUND for planned stage-facts module. Missing-module RED only, not assertion-isolated behavior evidence. |
| 86f362cea19acbb99f61e804fa72046d802b60f5 | [41935766789/126943695735](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/41935766789/job/126943695735) | DATA18 PASS; native closed-context assertion RED1 FAIL/0 pass/cancel/skip, with actual native fixture entered and new reader scaffold unavailable. |
| 8e123e092fa49005770b734cdc51587e73f5ec67 | [41936260522/126945332744](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/41936260522/job/126945332744) | Scoped lint failed1 error: forbidden local variable name module. Renamed currentModule; tests did not run. |
| 354691cca51def8174eec844d93c6b75993c82ea | [41936542938/126946312536](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/41936542938/job/126946312536) | Scoped lint0 errors/warnings; DATA18 PASS; expanded NATIVE32 PASS, each 0 fail/cancel/skip. |
| dd76033126ebd758f1cfc5a1d1604c43d38534cc | [41937022346/126947944496](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/41937022346/job/126947944496) | DATA18 PASS; NATIVE65 total,50 PASS/15 FAIL/0 cancel/skip. Fourteen issuer fixtures lacked ordinary consent schema/defaults; one baseline mutation reused the same SYN deployment ID. |
| be15f7799c9bc71aa63f6a15f000ffde5248a925 | [41937728788/126950353239](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/41937728788/job/126950353239) | Full lint0 errors/16 inherited warnings. |
| be15f7799c9bc71aa63f6a15f000ffde5248a925 | [41937728788/126950747942](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/41937728788/job/126950747942) | ORIGINAL/CLEANUP48 PASS/0 fail/cancel/skip. |
| be15f7799c9bc71aa63f6a15f000ffde5248a925 | [41937728788/126950748028](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/41937728788/job/126950748028) | CONTINUATION20 total,19 PASS/1 FAIL/0 cancel/skip: first GET exposed Snapshot-before-Ticket source recheck cycle. |
| be15f7799c9bc71aa63f6a15f000ffde5248a925 | [41937728788/126950747921](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/41937728788/job/126950747921) | Phase job CANCELLED at bounded runtime; 70 FOREIGN KEY failure mentions, no terminal TAP summary. Native initialization attempted rename/recreate/drop of referenced grant history; exception preceded caller finally, leaving allocated workerd processes until runner cleanup. Not a proven product hang and not a completed test count. |
| a2056859e76edae37558f058dbd17e938946ce2b | [41938507851](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/41938507851) | Queued/superseded own run cancelled using own qualifier concurrency when fixture fix replaced it. No compiler evidence from this revision. |
| 8381d5aa7554792f21c04b1c39b95849e7710f05 | [41939196465/126955525153](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/41939196465/job/126955525153) | Final full lint PASS:0 errors/16 inherited warnings. |
| 8381d5aa7554792f21c04b1c39b95849e7710f05 | [41939196465/126955814193](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/41939196465/job/126955814193) | FINAL97 PASS (79 native+18 DATA),0 fail/cancel/skip;244911.194134ms. |
| 8381d5aa7554792f21c04b1c39b95849e7710f05 | [41939196465/126955813929](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/41939196465/job/126955813929) | FIRST GET1 PASS/0 fail/cancel/skip; actual200 across unchanged Snapshot->ProjectRef->Ticket writes. |
| 8381d5aa7554792f21c04b1c39b95849e7710f05 | [41939196465/126957741301](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/41939196465/job/126957741301) | COMPILE23 PASS/0 fail/cancel/skip;3022.709899ms, clean before/after, sole final actual compiler. |

Chronology limitation: the native preimplementation RED covered only closed-context. read_consent and the expanded denial/issuer/prefix matrix were added after implementation; they are positive/regression qualification, not retrospectively claimed two-phase test-first RED. No historical mutation experiment was rerun to relabel them.

The fixture failure was diagnosed before retry. Final initialization adjusts accepted ordinary grant-column defaults in the existing CREATE before historical FKs/data are seeded, then creates the isolated consent table; it does not rename/drop referenced history. Phase initialization owns cleanup on failure and awaits mf.dispose; a deliberately failing allocated-world test verifies that path. Product held-work tests still require actual settlement/cancellation before disposal. Existing unrelated fixture modes retain their behavior.

The unchanged original/cleanup group and the19 passing continuation tests were not redundantly rerun. Subsequent changes affected the new factual reader/phase fixture and actual first GET, all covered in final97+1. This is split-head affected-check evidence, not a claim that every test ran at final HEAD. Initial-upload tests were not rerun: unchanged source concern absent and prior C3 timeout diagnosis already closed.

## Actual versus SYN provenance

Actual native execution: Miniflare/workerd DO storage and D1; original request lease and retained scopes; actual initial anchors, strict initial reader, new factual reader, preparation codecs/store, issuer store/journal, policy journal, both pure qualifiers, and resident decoder. No new context/source/qualifier success DTO substitution. Enrollment mutation checks include exact/nullACK, wrong capsule/plan/zero-state/decision/subject/project/A/ACK hash and accessor/symbol denial. Native journals create the actual settled SEND/ACK/receipt shape; the external publication they describe is SYN.

Inherited test-only boundary is explicit: initial-entry-world bundles labelled synthetic provider/history/custody/owner/bytes and compiled descriptors; replaces historical frozen receipt/context JSON and canary/operator pin data; rewrites the expired ceiling only in test-bundled initial-material, initial-entry, initial-entry-records, initial-capsule-records, initial-cleanup, historical-source and bootstrap-native. Existing enrollment-only modes have source-stub/anchor corruption hooks; those aliases are not used by phase-context modes. New reader, shared predicates, resident decoder and journals run intact. Product pins/ceiling and clocks were not changed. These tests prove isolated original-context mechanics, never deployed identity, actual adoption or current operational eligibility.

Phase facts are seeded through actual native stores/codecs. SQL issuer mutation setup uses its real supported SQL clock and same store instance for consumption witnesses; pre-expiry read simulations use explicit SYN capsule-relative clock offsets. No production Date/clock policy changed. Between-snapshot drift injections are external fixture faults, not reader writes.

During tested reads storage put/delete/sync and SQL non-SELECT operations throw; real read-only journal transactions remain allowed. Provider calls must be GET. Exact durable snapshots and selected primary rows are unchanged in success/denial tests; effect counters remain zero. Unknown/later state, retained backup failures, first-primary owner/revision/config/pointer/grant/schema drift, original schema absence/orphan/malformed failure, retained fetch/read/body/cancel, foreign root and 29900ms elapsed original-budget cases all execute the actual reader. No global grant lookup occurs without original reservation.

## Actual compiler and graph

Exact compile HEAD/tree above; `sourceCheck=git-inputs-before-after-v1`. Accepted profiles and original M2MiB/QA3MiB guards were unchanged.

| Artifact | Bytes | SHA256 |
| --- | ---: | --- |
| canaryLive M index.mjs | 1951651 | 49fbb10f5063e804ca8625d60538f9b9f831a875945e06770ef16117d122834b |
| qaLive index.mjs | 2019966 | 24f37ceb542fa72fbc29b6033dca439e5f96384b7d129bd2a9b3c588c6687569 |
| gzip resident M | 383747 | a4d4ae146424838b117c7317c6506f94fc4b5770827b3bdf989949f756bd8c43 |

programHash `f6f517c3ac135cfa7b9853137e0487f768b8f24a11e24959a337cac4e28d42e6`; residency purpose `afw.finite-candidate-residency.v1`, encoding `gzip-base64.v1`. Runtime metafiles: QA304 inputs, M330 inputs; issuer/compiler/fs/esbuild absent. QA contains fixed decoder/residency; M has neither decoder nor bootstrap-source edge. The actual no-bootstrap guard is [compiler line72](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/8381d5aa7554792f21c04b1c39b95849e7710f05/scripts/build-finite-native-package.mjs#L72), and no-M-decoder is [compiler line77](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/8381d5aa7554792f21c04b1c39b95849e7710f05/scripts/build-finite-native-package.mjs#L77) plus [candidate-residency test line44](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/8381d5aa7554792f21c04b1c39b95849e7710f05/test/mcp-qa-finite-candidate-residency.test.mjs#L44). The new phase-context reader directly imports both guarded modules at lines19–20, so a new M path through it would fail those actual guards. The older issuerCompilerFsEsbuildAbsent log alone is not this evidence. Initial-anchors is an existing shared DATA dependency of strict cleanup at BASE; it deliberately does not import either decoder/bootstrap module. Diff review adds no common/helper import of initial-anchors or phase-context; there is no claim that anchors is absent from the existing M graph. Common pure helper import checks pass. Real emitted candidate bytes were independently decoded in native workerd, including bounded inflate and canonical single-gzip-member denials. No full package/manifest or mounted source is inferred from this compiler/direct-reader evidence.

## Self-review, warnings and remaining gates

Reviewed complete BASE->code diff: exactly the ten brief-listed source/test files plus own temporary qualifier; final delta adds only this report and removes that qualifier. Stage-history and cleanup extractions retain previous predicates/gates; original referenced-ticket gathering avoids using a later-stage ticket as the original baseline. New factual-prefix exceptions are only the two root-ratified cases above.

Verified identical BASE/final-code blobs for13 protected paths: profile, both finite wrangler files, cloud-closed pins, strict initial owner source, common owner-source and connection-source stubs, pending transport, initial cleanup, issuer store, issuer journal, initial material and finite worker entry. No profile, mount, issuer mutation/schema, historical product pin, cleanup alarm or source producer was changed beyond the new explicitly scoped factual reader/lexical adapter.

Known output remains non-pristine: global lint16 inherited warnings; npm esbuild-kit/eslint deprecations; Node punycode warning; Actions checkout/setup-node v4 Node20 deprecation/forced24 notice; inherited RPC stub disposal warnings in original/cleanup/continuation groups. The fixture initialization resource leak was corrected and verified; unrelated inherited warning cleanup was not included.

Root independent source review is still required. No notice/finite-prearm/fullsetup/current source selection producer, SDK issuance, native mount, permission/admission, cleanup relaxation or remote runtime operation was delivered. No provider deployment/mutation, Entry consumption, remote DDL, permission/token/OAuth/OTP/cron/Max/main/merge or other-project effect occurred. Historical2607/c570 and QA_CLOUD_CLOSED_PINS remain immutable; source ceiling2026-11-03T02:59:00Z remains expired; single consuming Entry remains reserved.

`operationalReadiness=false; completePackage=false; PCoff=false`.
