# AFW native owner restoration Task1 — SOURCE/SYN report

Task1 only: factual SDK correlation, bounded readonly SDK lookup, and durable SDK reference before the actual redirect. Task2, third CLOSED, prearm, full setup, nominal handoff, operational readiness and PC-off are not completed or authorized here.

## Scope and immutable authority

PROJECT=AFW; REPOSITORY=tokenizartinfo-ops/agent-friendly-web (public1347578006); ENVIRONMENT=SOURCE/SYN GitHub+Actions; ORIGIN=GitHub connector; RESOURCE_TYPE=existing isolated source branch; RESOURCE_ID=feat/finite-native-cleanup-20261101; ALLOWED_ACTION=Task1 exact source/test changes and bounded credential-free qualification. ROLLBACK=own commits only with exact parent/ref/blob/content readback; preserve existing history. Never main, operational resources, Source/Access/identity/clock refresh, OAuth/OTP/real credentials, DDL, Cron, Containers, consumers, Max or support mail.

Binding brief docs/superpowers/briefs/2026-11-06-finite-owner-restoration-task1.md at c1f69a88a055dd24430b51d0362e50736f17797e/blob40132fe17ea56ecef675324a5edd3f8de2c73892 was read first. Specific design sections 5, 7 and 12 at ead56350882d81e3edf4952cb2658587b5fdd118/blobcf42e203d07a5e528e64eecd239491686cb73021 resolved SDK summary/correlation and bounded facet behavior. Source AGENTS current sections and installed TDD/good-tests/systematic-debugging/verification skills were read. No full old plan/history, helpers, subagents, reviewers, local clone/git/deps/build/test/container or runtime/provider effect.

BASE=7aab233741b09f8873bf04831ca2fa9a9c2b1c4d; BASEtree=6eb4241fb4451e7f74ba1b0fd9ad2a02a52cb0f3. Protected main=0c9c475b3ebaa970fc11d628b40e50a90cceb727. Owner ceiling 2026-11-03T02:59:00Z remains expired. Original I0/C0/C1, 30s Root and clipped <=5s children, three slots, alarm/actor/counter remain unchanged. No production expiry or timeout was widened.

## Implementation and causality

- SdkGrantReference has exactly the approved purpose and fields, canonical own-data codec, 16384B limit, SDK16 grammar, hash binding and explicit seconds-vs-ms checks. String/bool timestamp coercions are rejected.
- Pure finiteOwnerSdkCleanupCorrelation validates Root/ExpectedGrant/complete SEND/issuer Identity and hashes exactly the four approved commitments. This is DATA, never approval.
- Journal adds only reference, max9 rows/list10; original eight rows remain valid. Reference requires complete normal observation and exact Root/ExpectedGrant/complete/correlation links, append-once native transaction, sync, exact readback. Unknown remains uncertain; no overwrite or ACK reconstruction.
- The actual complete SEND determines exact metadata before SDK effect. Existing props/scopes/revokeExistingGrants:false remain. Actual result/promise and independent actual SDK summary are kept separate through reference durability; 302 waits for the durable reference and renewed ownership/context checks under the original Root.
- New cleanup module exports only readPrivateQaFiniteOwnerSdkGrant. Its constructor/facet is private and readonly list/get for original subject grant keys only. Captured alias and all relevant holders, original genuine Root/current child, Source/actor/QA/capsule/enrollment/issuer are checked before/after I/O. Same SDK1.2.1 issuer/resource/scopes; no ordinary store fallback, put/delete/client/token operations or caller selector.
- Each native list is limit100 even if SDK omits limit. Native internal legacy pagination counts toward max2 pages; max200 gets and a private concurrency2 queue. Sticky error/budget/lease denial rejects queued work before I/O, retaining already-started actual promises. No retry after unknown.
- Only optional existing-fixture seam: test/fixtures/finite-initial-entry-world.mjs imports new helper, adds ownerCleanup=false option, opt-in class extension and opt-in passive phase instrumentation. Other modes and existing firstConnection fixture engine are preserved. test/fixtures/finite-first-connection-publication.mjs is unchanged.
- Test wrappers separately observe actual native transaction fulfillment, native sync fulfillment and direct exact reference readback, in order before 302. Root/child elapsed and source-pair/native body-read guard metrics are passive. Held lookup and sync are explicitly outward ACK holds AFTER native settlement, not physical KV/storage-pending claims. Another genuine LIVE Root on the same ctx is denied until original held chain settles; dispose is not treated as drain.

Official SDK1.2.1 source used for API shape: cloudflare/workers-oauth-provider src/oauth-provider.ts at v1.2.1/blob10274b62aad09ea0e9d058cc1e3d41a9f8cb7d97, matching design commit1fafae23a0328f49ec3a30c433dfbe502ab3d1a6. listUserGrants has hidden legacy pagination and Promise.all(get) fanout; completeAuthorization returns redirect, not grant ID. No secret/code/token format is parsed for selection.

## Frozen tests and commands

Exactly 10 contract tests:
1. R1 records roundtrip
2. R1 reference hash rejects drift
3. R1 reference rejects foreign root
4. R1 reference rejects foreign expected grant
5. R1 reference requires complete observation
6. R1 reference rejects invalid SDK id
7. R1 reference seconds and milliseconds stay separate
8. R1 reference rejects accessor and extra fields
9. R1 reference journal is append once
10. R1 reference journal preserves prior eight rows

Exactly 6 native tests:
1. R1 SDK reference is durable before redirect
2. R1 foreign SDK metadata cannot redirect
3. R1 duplicate SDK correlation cannot redirect
4. R1 unknown reference commit cannot redirect or repeat SDK
5. R1 held SDK lookup retains original scope
6. R1 aborted reference sync cannot return late redirect

All remote jobs: one Ubuntu24.04 job, timeout15min, Node22, checkout exact github.sha, fetch-depth1, persist-credentials:false, contents:read; Source frozen throughout each job. Dependencies/SDK/lock unchanged; no routine full suite or broad publish gates.

Commands:
- npm ci --ignore-scripts --no-audit --no-fund
- RED: node --test --test-reporter=tap --test-name-pattern="^R1 SDK reference is durable before redirect$" test/mcp-qa-finite-owner-sdk-reference-native.test.mjs
- GREEN: node --test --test-concurrency=1 --test-reporter=tap test/mcp-qa-finite-owner-sdk-reference.test.mjs test/mcp-qa-finite-owner-sdk-reference-native.test.mjs
- Changed-file lint: npx eslint lib/mcp-qa-finite-owner-issuer-provenance-records.mjs lib/mcp-qa-finite-owner-issuer-provenance-journal.mjs lib/mcp-qa-finite-owner-phase-context.mjs lib/mcp-qa-finite-owner-cleanup.mjs test/fixtures/finite-initial-entry-world.mjs test/fixtures/finite-owner-cleanup.mjs test/mcp-qa-finite-owner-sdk-reference.test.mjs test/mcp-qa-finite-owner-sdk-reference-native.test.mjs
- Existing actual build path: initialEntryHarness('first-connection-publication',{ownerCleanup:true}) -> compileFirstConnectionCandidate -> buildMcpNodeProgram and esbuild M/QA graph. Current source files, never old bundle bytes.
- Final qualifier inline Node inventories output/owner-reference and output/t2-native-graphs, validates actual M/QA metafile inputs, hashes every file. Uploaded artifact is downloaded in that same job and hashes/bytes/manifest compared independently before qualifier removal.
- Only local commands read small installed skill metadata; no project execution or project data written locally.
- GitHub reads: exact refs, commits, files, compare(BASE...HEAD), recursive trees, runs/jobs/logs/artifacts. Every Source Contents API create/update/delete is sequential, explicit existing branch/current blob, verified sole parent/exact own path/new ref/blob/content. Prior GraphQL INTERNAL methods, auth changes, force, CLI and main were not retried.

## RED primary

Source74086e7b0a9df597274ec0a11386f58daab1c904/tree de7294f82ca761867618aaedb424f9cf65f6a4d1.
Test blob39eeeb58a9a8260a94bbdf8a86dea51d28a9a341; helperd70decbe813dce8948125ff177471dd458f36e8d; optional seam302bd34f641ff6d2f7998b08633db0adcd1c5aa7; qualifierd357bfcb3ff14bcdb6f705f98aea577758724cd2.
Run42275435649/job128090446140/attempt1, 2026-11-06T18:58:07Z–18:59:23Z, expected failure, exit1; executed1/pass0/fail1/cancel0/skip0/todo0; focal53376.907077ms, whole53975.660422ms.
Primary: https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42275435649
Exact cause: R1 missing durable SDK Reference AFTER actual completeAuthorization. Actual completeWrites1/completeNormal1, durable sdk_complete observation, Reference0, response302. Reached actual SDK complete, not missing import/module/old clock/hash.
Measured current M=c49303bee6b3a97fa1e022bfb697bb2e94fd1e37bcdd925ae9d86c774537cc32/1988061B; QA=a0d12a7be2b4f4a0638f30c65bc33d37a1ba64c707c6ccf0c0aed21689cffcdd/2373893B. These were measurements; no c493 literal is a new premise and no old M was built.
Artifact13532153177, zip sha2562c9bbb4108363c9077995c0d27df563ab8c188227ae4f398a6b8e10c02112d74, 2597B, seven days.
Limitation: RED uploaded only red.tap and sanitized principal marker. Scripts/metafiles were generated under output/t2-native-graphs but an incorrect artifact path omitted them. Root explicitly ruled not to repeat RED just for this omission. Do not claim RED graph/script preservation or substitute GREEN graph bytes for it.

## Intermediate first GREEN: failed principal

Sourcef7f7431ee6810b40b5b24824755e19acaa882c6d/tree8dc7758bb7e446336d7656acbdc0033c593cfe07; code8f7d6185305e56a719d52ffb593186502227912d.
Run42276424099/job128093801109/attempt1, 19:04:39Z–19:10:37Z; executed16/pass15/fail1/cancel0/skip0/todo0, exit1; whole334454.279563ms. Ten contracts and five native negatives passed; lint skipped because tests failed.
Primary: https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42276424099
Principal failed pre-SDK complete, actual completeWrites0/completeNormal0/Reference0/status503. Original child rejected at wall1793991954658 with began1793991949593/until1793991954593: 5065ms, 65ms over original5000. Aggregate observer HTTP504/611859240B. Its exact child operation and split native/validation cost cannot be established from that job's insufficient per-child markers. Do not attribute it to consume+grant or pairing by inference. This is not a positive principal result.
Other native cases genuinely reached complete1. Foreign metadata rejected; duplicate lookup list1/get2/peak2; unknown reference had native reference row1 and no redirect/repeat; held lookup retained original outward ACK and denied otherRoot until settlement; aborted reference sync preserved reference1 without late redirect.
Artifact13532234922, 7284015B, sha256b951fa8657d4bb09127f884f3f756dd0af904a3dace152cf5df2118f24f0ba72, corrected scripts/metafiles path. No claim of final validation.
Selfreview (separate from observed failures) found explicit timestamp type coercion and missing self.get/getAlarm lifetime pins; approved fixes and passive durability/child/HTTP diagnostics motivated the next checkout. No timeout/guard/functional phase boundary was reduced to mask this failure.

## Intermediate second qualification: principal passed, two hold-premise failures

Source4ff7163c582258920548a04a55706c371c34b6d3/tree4338d43418afcba0e77fc268affc4d04efc4ab11; codeceeffc419f8cef152474ca1692719959fc7c934c. Run42278023548/job128099352683/attempt1,19:15:31Z–19:22:39Z: executed16/pass14/fail2/cancel0/skip0/todo0, exit1; changed-filelint PASS.
Primary: https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42278023548
Principal PASS: complete1/reference1/direct readback1, then actual M token/MCP/NoticeLink. GET9288ms/POST12361ms, readonlychild919ms, consume+grantchild3744ms with eight source-pairs434–456ms, pairing1800ms. All before original deadlines. Other passed negatives: foreign metadata, duplicate correlation and unknown reference ACK.
Both hold tests failed in their FIRST marker wait (native test lines27 and36), before either hold was observed. They are NOT retention passes. Secondary closed-parent messages do not independently identify the first cause.
Artifact13533618905,7313295B,digest87508d09e81aefc5ad8c6be2efd42ff5092c4fbb4293595c961e69401c252173. Inline manifest uploaded/downloaded/verified exactly30 files and6 native graphs; lint8paths PASS. No product clock/guard reduction.

## Authorized two-case DIAGNOSTIC

Source864b583913b0f5844a06ce580cf05acb8418dd3f/tree3fd2af08c9ee80c291dfbda72f856eb53585fe36. Run42279840913/job128105646728/attempt1,19:27:53Z–19:31:12Z. Expected/executed2,pass0/fail2/cancel0/skip0/todo0,exit1,157053.274706ms. This was DIAGNOSTIC, never final GREEN. Only timeout evidence preservation changed; product,20ms polling and clocks were unchanged.
Primary: https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42279840913
Both completeWrites0/completeNormal0/held=false/lookupChild=null/list0/get0; SDK suffixes stop at Root/ExpectedGrant plus begin/approve SEND+observed, with no sdk_complete SEND.
Exact exhausted original child: consume+grant,5060ms and5039ms,aborted=true. Six already-finished source-pairs consumed799/800/775/768/769/765ms and793/792/767/791/768/759ms respectively before5s cutoff; normal second-run principal had eight pairs434–456ms in3744ms total. GET(no polling)9657/9732ms; POST(with full polling)10725/10788ms before returning503. These are actual invocation/pair measurements, not real-account provider latency. The initial G1 overshoot still lacks an exact operation marker and is not retrospectively assigned to this group.
The new diagnostic proved the intended fault was never reached because this pre-SDK group expired. The test's original polling requested full growing child/activeMetric trees and SDK rows, including a native storage.list, every20ms. Root authorized correcting this observation mechanism: fixed signalsOnly boolean returns synchronously exactly {held,actualSettled}, with no storage/metric-tree access; full default remains for assertions/evidence and one sanitized timeout snapshot. No product budget repair is claimed.
Root also approved a passive actual QA302 marker after the tested critical span, with readback-before302 assertion. No I/O or Response mutation at that marker.
Diagnostic artifact13534643461,2432019B,digest36cf404c3e71b8498b603b88b085f51f3bc10b9dd82309eb39c5bf832354f3a1; actual download readback11files2graphs and changed-filelint PASS. Last states were sanitized; no raw rows/headers/codes/tokens/bodies were printed.

## Final GREEN and evidence readback

Final tested Source=f2137bb10c599b12cef2952dd5c8efdaf301e259/treea378afd61b213c4d4e568352f9e1e2af9c66b76d; final code/test candidate48e4ca767b23732f259aece16854610e23545f98/treedf980bed1beb9a0eddf25899638e9a8e12431895. All production blobs are unchanged from second qualification; only the authorized fixture observation correction and passive response-order assertion changed.
Run42280666925/job128108468790/attempt1 SUCCESS,19:33:29Z–19:38:54Z. Executed top-level16 (10contract+6native), nested0,pass16/fail0/cancel0/skip0/todo0,exit0;296711.574668ms. Exact changed-filelint8paths passed with no lint output/errors/warnings. Primary: https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42280666925
Artifact13535307870,7324309B,digest89e96c77772c13d93ec7b16cf167409d403ec7e9b32166e0f19cd7796906c0ac,expires2026-11-13T19:38:48Z. Same job downloaded the uploaded artifact and independently compared32 manifest-listed files plus the manifest itself;6 actual native builder graphs, all hashes/bytes exact. Steps inventory/upload/download/verify all SUCCESS, before qualifier removal.
Artifact: https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42280666925/artifacts/13535307870

Principal completeWrites1/completeNormal1/reference1/exact direct readback1/status302, metadata exact. Native order is actual grant put -> actual complete normal -> readonly list/get -> reference put fulfilled -> native transaction fulfilled -> sync fulfilled -> direct readback fulfilled -> actual QA302. The marker performs no I/O and returns the same Response. Actual token M exchange, actual MCP summary and actual GET/POST NoticeLink passed afterward.
Principal original GET9254ms/POST12026ms, each <=30000ms; readonly child714ms; consume+grant3612ms. M measured c49303bee6b3a97fa1e022bfb697bb2e94fd1e37bcdd925ae9d86c774537cc32/1988061B; initial->connection same actual bytes asserted without a c493 premise. Principal QA measured ffe028f7d5cc2db083507b0ea456032af33ee9325f4864da75877448820cf960/2392030B. All six current M/QA scripts/metafiles are preserved; QA hashes differ with SYN anchors/fixture times and are not treated as operational source authority.
Principal aggregate factual/observer HTTP before reference assertion672responses/816239328B; downstream final854/1037304146B. These are cumulative repeated SYN body bytes, not real provider traffic, physical bandwidth, operational capacity or an SLA. Per-native-call spans/body-read guard metrics remain in artifact; elapsed whole source-pair is not equated to network time.

| Case | Response | Actual complete | Reference rows/readbacks | KV lists/gets/peak | consume+grant ms | readonly actual ms |
| --- | --- | --- | --- | --- | --- | --- |
| principal-before-reference-assert | 302 | 1 | 1/1 | 1/1/1 | 3612 | 714 |
| foreign-metadata | 503 | 1 | 0/0 | 1/1/1 | 2894 | 358 |
| duplicate | 503 | 1 | 0/0 | 1/2/2 | 2771 | 355 |
| unknown-reference | 503 | 1 | 1/0 | 1/1/1 | 3317 | 1165 |
| held-lookup-ack | 503 | 1 | 0/0 | 1/0/1 | 2970 | 5024 retained/aborted |
| aborted-reference-sync | 503 | 1 | 1/0 | 1/1/1 | 3000 | 714 |

Duplicate peak2 proves two concurrent native gets remain bounded; every actual list uses100. Across all cases actual lists<=2/gets<=200/peak<=2. The fixed cases exercise one native list and up to two gets, not an assertion that arbitrary users fit two pages.
Held lookup reached actual SDK complete and the intended postnative ACK hold. Same-ctx other genuine LIVE Root denied before and after logical child expiry; after real outward-chain settlement availability returned. Late lookup emitted zero gets. Its5024ms is the retained actual chain ending after logical5s expiry, not an extended admission/deadline or a physically pending native KV call.
Aborted reference case reached actual complete, actual reference transaction+sync fulfillment, then held sync ACK and genuine native Request abort. Reference persisted but readback0, no302, no duplicate SDK effect; final reference child actual73ms/aborted=true. Other same-ctx Root denied until the original held chain settled. No ACK reconstructed from readback or global drain claim.
With lightweight signal polling, corresponding consume+grant children were2970ms (held lookup) and3000ms (aborted sync), versus5060/5039ms in DIAGNOSTIC with full metric/storage polling. Both intended holds were reached. This verifies the narrower test-observation mechanism under these runs; it does not repair or qualify the product's original5s budget for real operations. The first G1 overshoot remains a separate unknown cause and operational risk.

Total recorded qualification executions: RED1 + intermediate16 + intermediate16 + diagnostic2 + final16 =51. Final16 is the only complete accepted candidate result; do not combine passes across failed runs.


## Actual versus SYN and limits

Actual in GitHub Actions: pinned checkout, actual current builder graphs and bytes, ephemeral Miniflare/workerd, real SDK1.2.1 begin/approve/complete, native KV/D1/DO transaction/sync/get, actual fixed firstConnection/owner handlers and M token/MCP/NoticeLink pipelines when explicitly reported passing. Native Request AbortController and original promise retention are real within that test isolate.
SYN: history/provider/custody/Access signing inputs/approval clock fixtures and account data, cloud provider responses/uploads/pointers and all business subjects. No deployed SDK account, real provider effect, real Source/Access renewal or human consent is established.
The complete normal result is never reconstructed from a journal. Metadata/ref and test facts never confer operational permission. Original held ACK chains settle before same-ctx availability is accepted; no distributed/global drain or namespace absence proof is claimed.
Known limits: scoped16 tests, not full integration/publish gates; finite own-subject enumeration blocks on excess/unknown rather than proving two pages cover arbitrary users. High aggregate SYN observer HTTP volume and observed original5s sensitivity remain operational risks even after a later scoped pass. No incidental SDK/dependency upgrade or guard removal.
operationalReadiness=false; completePackage=false; PCoff=false; globalNativeDrainVerified=false; sdkNamespaceEmptyVerified=false. Task2 is not begun. Fresh Root review is required before Task2.

## Warnings

Preserved without upgrades: SDK CIMD/global_fetch_strictly_public notice under existing profiles; existing workerd RPC-stub disposal warning during fixture flow; npm deprecations for @esbuild-kit/esm-loader, @esbuild-kit/core-utils and eslint9.39.4; Actions punycode/legacy url.parse/Buffer() deprecations and Node20-target actions forced to Node24. These are not granted capabilities or hidden failures. Exact final lint/test warnings appear in final primary logs.

## Exact path blobs and sequential Source preservation

Pre-report HEAD28b85fa0e81a66c515a58a68342f2a612be3e3e1/tree9826087a641bcf1a5ae3a90c72656d75a1ad5ddc. Qualifier33b0fffb39d11791418c751393412406005493b8 removed only after terminal final job/artifact readback. Deletion independently verified sole parentf2137bb10c599b12cef2952dd5c8efdaf301e259/exact one removed path, final ref, recursive-tree absence and all3172 other blobs unchanged.

| Path | BASE blob | Final tested blob (unchanged after qualifier retirement) |
| --- | --- | --- |
| lib/mcp-qa-finite-owner-cleanup.mjs | new | 44b5906757b19f47933c6c6f9f85ed2abd15d9f3 |
| lib/mcp-qa-finite-owner-issuer-provenance-journal.mjs | 9231a1fbe60b6b2f3ebebc6bfa6b50f42ec916db | 2fad787bd05736a17cf013f41aa143264298afd2 |
| lib/mcp-qa-finite-owner-issuer-provenance-records.mjs | b97d32e843a7829027121faec282370aab8ab589 | ee0b6c1c3730855a4be975789d990517dffa81aa |
| lib/mcp-qa-finite-owner-phase-context.mjs | e482ad1617adc001c3a32c94e71eeb41d27f3d1d | 7eb8f28760de60f143e487eeb6988705059a0a44 |
| test/fixtures/finite-initial-entry-world.mjs | 297b57846bbbe13bfc80ac52c5b033a382aef4b6 | 302bd34f641ff6d2f7998b08633db0adcd1c5aa7 |
| test/fixtures/finite-owner-cleanup.mjs | new | 391747fb10cfecf568c921428a40424e763c66b1 |
| test/mcp-qa-finite-owner-sdk-reference-native.test.mjs | new | 077c8ceedf6b9689d2ddf840ad60325fc34250eb |
| test/mcp-qa-finite-owner-sdk-reference.test.mjs | new | 941ef8abc355a5df971cf10738507ba76aac830c |

All writes through retirement (every write independently checked sole parent=prior HEAD, exact one own path, new ref/blob/content; deletion checked recursive absence/all other blobs):
| # | Path | Commit | Result blob | Tree |
| --- | --- | --- | --- | --- |
| 1 | test/fixtures/finite-owner-cleanup.mjs | a8d4cff18ad68a4afb74aece0d74a124d9aa9675 | d70decbe813dce8948125ff177471dd458f36e8d | 3070979066952013955412680195d8715666e917 |
| 2 | test/fixtures/finite-initial-entry-world.mjs | 819a2ba68bc1f9f99a33cc0c997940c9544fdb04 | 302bd34f641ff6d2f7998b08633db0adcd1c5aa7 | 278b36f9a7cc096cf59a3dd4046c66c79aebe8df |
| 3 | test/mcp-qa-finite-owner-sdk-reference-native.test.mjs | 5131830c09c3395b4d82243ef4734061ae564ed4 | 39eeeb58a9a8260a94bbdf8a86dea51d28a9a341 | fbe6e8f0ee8315e8d004dcc732da67941918bd99 |
| 4 | .github/workflows/afw-owner-restoration-qualification.yml | 74086e7b0a9df597274ec0a11386f58daab1c904 | d357bfcb3ff14bcdb6f705f98aea577758724cd2 | de7294f82ca761867618aaedb424f9cf65f6a4d1 |
| 5 | test/mcp-qa-finite-owner-sdk-reference.test.mjs | b8ac637bae90505d9bf9d77fb9c65c93bf795db0 | c574034470a6e402efb10bfe3f736a2677e31c68 | 91d977b2e841fbe2f5df8bdf91b71479f4489681 |
| 6 | test/mcp-qa-finite-owner-sdk-reference-native.test.mjs | 6db444ad00043caf0124c097bfe393841a583904 | 2ed8a7f7fb116df44c61f704585f8fd25a25b496 | 2c46d7601126ce7e658713672dbcf2a5e7f03ff9 |
| 7 | test/mcp-qa-finite-owner-sdk-reference.test.mjs | bea0090dd9247c6772c1d203e86cb1bfe8ad904e | 554110b4b6b408d7b337560ce3ec34c9817b0524 | 432404f289f18bf8e55d2ea78453071f0b5f4b3d |
| 8 | lib/mcp-qa-finite-owner-issuer-provenance-records.mjs | 0d53eb3a3e8c6f58148a4e1a50927e8642f5f662 | f31ce20788633244078bd17082682f7869c95f68 | aa62a847a775f621bb360d7a25c6a6620e8cc007 |
| 9 | lib/mcp-qa-finite-owner-issuer-provenance-journal.mjs | 4b6df952b5c0054a7dc9a02fdb5244cfd2649b6f | 2fad787bd05736a17cf013f41aa143264298afd2 | 503591cb739a29e86912c1ca60fd0fddcd091bb2 |
| 10 | lib/mcp-qa-finite-owner-cleanup.mjs | 2df03fef501974147dff11a5e8b76addfe87934f | 79b50e1a1202d5cb92c40283bb3cece3cb0b012a | bdf60976f84c472646dd8eb89250bb8c1ab24e8a |
| 11 | lib/mcp-qa-finite-owner-phase-context.mjs | 8f7d6185305e56a719d52ffb593186502227912d | 7eb8f28760de60f143e487eeb6988705059a0a44 | a560a59f014ce410bfee9408e225e31027822bbb |
| 12 | .github/workflows/afw-owner-restoration-qualification.yml | f7f7431ee6810b40b5b24824755e19acaa882c6d | 5f33bc3eb793af6a1b9fca55aaac4d51149bf979 | 8dc7758bb7e446336d7656acbdc0033c593cfe07 |
| 13 | lib/mcp-qa-finite-owner-issuer-provenance-records.mjs | 201fa4a7dd8e4ab378ee3ff7b90a50494b5f6ddf | ee0b6c1c3730855a4be975789d990517dffa81aa | 42700674b200351ff7b03d04e8356d58193b6155 |
| 14 | lib/mcp-qa-finite-owner-cleanup.mjs | d60eaff1cd52e9d5451877eba3eba908b87e4de5 | 44b5906757b19f47933c6c6f9f85ed2abd15d9f3 | f80e24ea31e9ffc8d94bc3783d33b9764df55a30 |
| 15 | test/mcp-qa-finite-owner-sdk-reference.test.mjs | 6b039d5f2cf841818905bf62fffd1e17c68cb4bb | 941ef8abc355a5df971cf10738507ba76aac830c | 3d93e190e2c75cc24a167502e8ec38c45735687d |
| 16 | test/fixtures/finite-owner-cleanup.mjs | e3b8324a9aaea958268f26ee7a4e3773f751d593 | db2c43b93a2694a751385ca57b3037647d02a08a | 60b540760fc1bccaffa993e6d6779f5ff0c07b6e |
| 17 | test/mcp-qa-finite-owner-sdk-reference-native.test.mjs | ceeffc419f8cef152474ca1692719959fc7c934c | 095d78940d2157790698fa05ec25793fa85910b5 | afff056ec70f6e3f4b1e4cfe8a50107d605b55f2 |
| 18 | .github/workflows/afw-owner-restoration-qualification.yml | 4ff7163c582258920548a04a55706c371c34b6d3 | 99c48aed1442bfe92ae3f88482da5d7372f84563 | 4338d43418afcba0e77fc268affc4d04efc4ab11 |
| 19 | test/fixtures/finite-owner-cleanup.mjs | 21b6bc8b719128239101fb04c89619649cb1acb3 | 529e9116da131056fdd07ea40e0e75b8d3141142 | 45d966fd76e69c1b97382a14f4426e32bef4b61c |
| 20 | .github/workflows/afw-owner-restoration-qualification.yml | 864b583913b0f5844a06ce580cf05acb8418dd3f | e801670b0d643dc75824d9d3c57e68f5a6a0b5e8 | 3fd2af08c9ee80c291dfbda72f856eb53585fe36 |
| 21 | test/fixtures/finite-owner-cleanup.mjs | b7870f6b7e396bc17f968a87fac276a0413ac836 | 391747fb10cfecf568c921428a40424e763c66b1 | 45fe752fd53362bc0146c5c1558e953e0dfcef0d |
| 22 | test/mcp-qa-finite-owner-sdk-reference-native.test.mjs | 48e4ca767b23732f259aece16854610e23545f98 | 077c8ceedf6b9689d2ddf840ad60325fc34250eb | df980bed1beb9a0eddf25899638e9a8e12431895 |
| 23 | .github/workflows/afw-owner-restoration-qualification.yml | f2137bb10c599b12cef2952dd5c8efdaf301e259 | 33b0fffb39d11791418c751393412406005493b8 | a378afd61b213c4d4e568352f9e1e2af9c66b76d |
| 24 | .github/workflows/afw-owner-restoration-qualification.yml | 28b85fa0e81a66c515a58a68342f2a612be3e3e1 | removed | 9826087a641bcf1a5ae3a90c72656d75a1ad5ddc |

No unknown write/ref interference occurred. No GraphQL retry/auth change/force/CLI/main write. A few orchestration calls were interrupted before dispatch by controller messages; the next reads verified ref unchanged before any write. No mutation result was unknown and no blind retry was used.


## Selfreview, preservation and handoff

Full BASE..tested-HEAD patches and all added/modified own files were self-reviewed. Retention, correlation, readonly limits/sticky failure, exact response order, partial eight-row compatibility, unknown ACK and unchanged closure boundaries were checked against the binding brief. Selfreview fixes were exercised by final16. Existing firstConnection engine and all other source paths were preserved.
Full recursive tree comparison (not just a changed-file list), untruncated: BASE3168blobs -> pre-report3172blobs; exactly8 authorized JavaScript paths differ (4existing/4new);3164 protected BASE blobs identical; no unexpected path; qualifier absent. Report creation adds only its exact authorized docs path, and the containing commit/final ref/full tree are independently checked after write. Main was last verified0c9c475b3ebaa970fc11d628b40e50a90cceb727 and is rechecked in the final receipt. Source tests/production blobs match final GREEN exactly after qualifier retirement/report.
All build/test artifacts reside in the authorized GitHub Actions destination with seven-day retention. No project files, caches, dependencies or persistent processes were created locally. No remote runtime state or historic project records were changed. Reversal material is the exact prior commits/blobs in the CAS table, with existing history intact.
Status for Root: DONE_WITH_CONCERNS, pending independent review. Concerns: RED graph artifact omission; initial G1 original-child latency cause unknown; high repeated SYN observation volume; scoped coverage and preserved external/fixture warnings. None authorizes runtime, Task2 or Unit2b closure.

The report's containing commit is the final Source HEAD. Its own commit hash cannot be embedded self-referentially in its contents: exact final HEAD/tree/report blob and independently verified parent/ref/content/full-tree receipt are supplied in the handoff to Root for durable recording on the separate Rootdocs branch. No Source writes after that verified report handoff. No ledger Root edits, new chats, merge, publication, runtime operation or Task2.
