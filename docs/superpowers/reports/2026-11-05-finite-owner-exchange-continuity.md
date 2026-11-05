# D0.4 — original native exchange factual continuity

SOURCE-ONLY, UNMOUNTED. BASE `4d8f6a017e1bd3914c7722a7ae8c23946e31a9aa` (tree `15eb3a4b04d605c9ec42ba61379d9dc04ff7e431`) includes accepted fanout90bb and subsequent fixture fixes. Sole product writer; no subagents or implementer-owned independent review. Root supplied exact branch `feat/finite-native-cleanup-20261101`, brief and preflight; every ref advance uses GitHub App expected-SHA CAS. Root owns fresh full BASE diff and independent review before acceptance or another unit.

The reader independently checks actual current exchanged_at using existing canonical ISO/safe-integer and actual Date.now predicates, adds created_at-inclusive/expiry-exclusive bounds, and projects exchanged_at='' only in the grant rowAck argument. Absent row remains absent. Original ACK bytes/rowHash/recordHash are never rewritten. Actual native grant remains in issuerRows/frame/expected and both complete native snapshots/owned comparisons. All other validation and strict SDK pending/result provenance remain.

Product change: two lines inside issuerPrimary. Test fixture change: one negative-only SYN native UPDATE on original UUID in the existing phaseDrift observation2 seam. No new export/helper/API/DTO/import edge/clock/permission/profile/interface/authority or mounting.

## Causal evidence

RED source `d4b58bb84c66ae71af7fd320e7070aef0f8b528b`, tree `849c0098febb07d56c63c5c308ee9768e193f8dc`, Actions [42059288764](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42059288764), job127356149761, attempt1. Lint0 errors/0 warnings. Exactly1 test selected,0PASS/1FAIL/0SKIP. Before product fix all logged prerequisites passed: actual QA-issued code; pretoken factual read_consent and exact sorted three-key DTO; decoded original grant ACK rowHash equals initialHash of native original row; actual M200/bounded/no refresh; actual MCP summary original project; only original app UUID; actual native exchanged_at nonempty and every other field unchanged; current hash differs original ACK while historical exchanged_at='' hash matches. Raw ACK and the selected issuer/provenance/core-preparation journal prefixes are identical after token/MCP. This initial assertion does not include owner-ticket/project-ref/authorization-link auxiliary keys; the final strengthening described below compares the entire DO snapshot by canonical digest. Failure then occurs precisely at post-token factual reader returning unavailable (only status key) instead of three-key DTO, not fixture/seed/SDK/build failure.

GREEN same principal asserts factual continuity, original preconnection/project/capsule identity and byte-for-byte journal equality after read. Boundary worlds each start with actual QA -> M token -> MCP positive, then SYN negative-only native SQL. No code/token/JWT/KV/raw owner row is logged.

Boundary coverage:
- exchanged_at BLOB, SQLite-affinity numeric text, invalid text, noncanonical ISO, actual-now+60000 (asserted below expiry), created_at-1ms, expiry, expiry+1ms => unavailable, no additional grant or journal/ACK write. NOT NULL schema prevents using null as a stored native mutation; no schema relaxation. Active expiry/expiry+1 also fail no-future; no isolated upper-predicate claim.
- SYN stable inclusive created_at remains factual read_consent; this field value proves no new exchange authority.
- original id/user_id/client_id/project_id/resource/scopes_json/created_at+1ms/expires_at-1ms/revoked_at and current site_projects owner/revision => unavailable. Preconditions keep exchanged_at/time bounds valid for the +/-1ms immutable checks. Changed original UUID is absent even though another row now exists; no fallback.
- valid different timestamp drift uses actual original exchanged_at first and created_at (or actual tick +1ms) second. Existing phase observation2 performs fixed UPDATE targeting original UUID; exactly2 observations and actual stored changed value are asserted; reader denies and ACK/journals stay unchanged. No substituted SELECT/frame; no post-final-observation detection claim.
- held actual SDK completion: original active app row plus sdk_complete SEND/no OBSERVED must deny sdkReadCurrent BEFORE fence/reduction/release. Original terminal fence, real grant reduction, late actual SDK settlement, no observed ACK, public503 and actual M invalid_grant assertions remain.

## Qualification

Temporary own branch/path-scoped credential-free Actions qualifier; Ubuntu24.04/Node22, contents:read, checkout persist-credentials:false, npm ci --ignore-scripts --no-audit --no-fund. Lint controlled3 files first. Commands and counts below are selected coverage, never full57/80/65 suites. No local clone/dependencies/build/test, credentials/provider traffic/runtime, browser OAuth/OTP, DDL or production workflow. Qualifier removed from final code tree.

The matrix head `762ab84265b2fb75256f1c7e17f2618e6893123a` (tree `b6b88cde8e76bf9dd34fb4463bfe189006de4aa4`) passed [Actions42059641718](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42059641718), job127357402313/attempt1: 24 tokencompat selected +3 SDK selected +7 phase selected,34PASS/0FAIL/0SKIP. Each TAP count is asserted (24,3,7), not inferred from exit0.

~~~sh
npx eslint lib/mcp-qa-finite-owner-phase-context.mjs test/mcp-qa-finite-owner-qa-sdk-token-compat-native.test.mjs test/fixtures/finite-initial-entry-world.mjs
node --test --test-reporter=tap --test-name-pattern='D04|valid actual QA code exchanges through actual M bounded response and actual MCP original permission|held actual SDK completion settles late after original terminal fence and real grant reduction' test/mcp-qa-finite-owner-qa-sdk-token-compat-native.test.mjs
node --test --test-reporter=tap --test-name-pattern='held actual approve denies fabricated results|owned approve recheck rejects original issuer' test/mcp-qa-finite-owner-qa-sdk-native.test.mjs
node --test --test-reporter=tap --test-name-pattern='primary issuer prefixes remain facts not next-stage permission: (reservation|linked)|unknown issuer SEND denies grant|original primary issuer denies (revoked-grant|unknown-ack)|fresh current owner and current publication are independently rechecked: grant|absent original issuer never triggers a global grant lookup' test/mcp-qa-finite-owner-phase-context-native.test.mjs
~~~

Final test strengthening at `d262595e2d303383ba3ac57d070b263a8ff57773` replaces prefix-filtered arrays with an initialHash digest of the whole raw DO snapshot. Native grant/reader comparisons also use digests to prevent raw owner-shaped assertion dumps. Full snapshot includes original raw grant ACK bytes plus owner-ticket, project-ref, authorization-link, backup/source and all other DO keys. Opaque SDK KV remains separate and can legitimately change on token exchange. Product/source fixture unchanged. Root explicitly accepted retaining staged34 passes and qualifying only this strengthened principal once.

The first strengthening qualifier [42060808569](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42060808569), job127361663482/attempt1, passed lint then failed in shell before Node/esbuild: an authored JS String.replace replacement interpreted the regex end-anchor/quote sequence as a replacement token, truncating the temporary command.0 tests/0 fixture compiles; not a product or fixture failure. Temporary qualifier corrected with a full literal command, no product/test alteration.

Reference-update qualification incident: the corrected temporary workflow commit `b5e61d1625bc3af796a194988e37bb930e3d798e` (tree `208dff3afbb50655fc22946e66c0662fecfc99a5`) was verified as the direct child of `d262595e...`. GitHub App update_ref returned internal GraphQL errors at16:03:48,16:04:03 and16:05:10UTC. Independent readbacks established these did not apply; no credential/permission workaround or blind replay occurred. After a fresh read of the unchanged exact head, the documented force-with-lease path (force:true AND expected_sha=d262595e...) succeeded to that verified direct child. This is a fast-forward ancestry change despite the transport flag; no history or foreign head was overwritten. Root was informed; no authority/scope expansion.

Final strengthened principal: [Actions42061681764](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42061681764), job127364780539/attempt1, head `b5e61d1625bc3af796a194988e37bb930e3d798e`:1PASS/0FAIL/0SKIP, explicit selected count1, lint0 errors/0 warnings. Exact command is the unanchored unique full principal name used by RED, with TAP count assertions; no matrix repeated. Full raw DO snapshot digest is identical after actual token/MCP and after factual read; ACK bytes/rowHash/recordHash are included in that snapshot. The strengthened helper applies to all D04 cases in final source, but only the principal is requalified at this later test head;34 earlier matrix passes remain staged evidence at762ab842, not a claimed final-head full-matrix rerun.

Cleanup code HEAD `f9ee816c6525893094568fda34e8bd0b0d128311`, tree `69dc2270c1e06bf009e10acd318596e57e7b81cb`, is verified current branch head with exactly3 controlled files in BASE compare; temporary qualifier is absent. Cleanup's first exact-lease update returned another internal GitHub GraphQL error at16:10:40UTC (fourth internal error total). Fresh readback showed the old b5e61d16 head unchanged; exact same direct-child CAS retry succeeded. This correction/cleanup involved no live runtime, credentials or permission inference.

## Actual compiler and warning accounting

| Qualification head/run | Selected result | Authored fixture esbuild calls |
| --- | --- | ---: |
| d4b58bb8 /42059288764 | Genuine principal RED0P1F; prerequisites passed |2|
| 762ab842 /42059641718 |24+3+7P,0F/0SKIP |61 (54 logged SDK-role builds +7 unlogged phase harness builds)|
| d262595e /42060808569 |Own qualifier shell failure before Node; lint passed |0|
| b5e61d16 /42061681764 |Strengthened full-snapshot principal1P0F |2|

Total65 actual authored esbuild invocations, zero failed esbuild calls. SDK worlds each invoke one QA and one M fixture build; seven selected phase worlds each invoke the harness's one QA build and do not log output hashes. No hashes are invented for those7 and no extra build was run to obtain them. Miniflare internal parsing/JIT, prior units and runner-installed package processing are not counted as authored esbuild calls. compileFiniteNativeStaging=0 and buildFiniteNativePackage=0 for D04: phase reader remains UNMOUNTED in unchanged standard graph and no import edge changed, so the accepted brief explicitly excludes another standard compiler/full-branch rerun. Executing component fixture compilation validates the changed module, not a mounted production graph or runtime resource budget.

All runs are attempt1. Warning line counts below retain existing warnings, not lint warnings:

| Run | RPC stub | QA CIMD | MCP JSON notification | punycode | npm deprecations | Action Node20 migration |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
|42059288764|1|1|5|1|3|1|
|42059641718|34|27|115|2|3|1|
|42060808569|0|0|0|1|3|1|
|42061681764|1|1|5|2|3|1|

Warnings concern existing RPC disposal diagnostics, QA's unchanged CIMD-disabled flags, MCP responseMode=json notification notices, Node punycode and npm/action deprecations. No SQLite experimental warning was emitted in these selected commands. Awaited fixture disposal remains; warnings are not proof of physical cancellation/drain. No warning was hidden by a lint flag. The qualifier shell failure and the reconciled connector errors documented here are the qualification/update failures for this unit; none caused a production-code relaxation.

### Logged actual fixture hashes

QA byte counts and hashes vary with the disclosed SYN ceiling injected into each build. All logged QA outputs follow in invocation order within each run. They are executing fixtures, not deployable standard output:

| Run / QA ordinal | Bytes | Inputs | SHA-256 |
| --- | ---: | ---: | --- |
|42059288764/1|1689592|320|`22abb99106923625d347f8b399d693e4e4b6db59cfafa835997400526b53581b`|
|42059641718/1|1689764|320|`bdb1ec80b5580dfa3099ee610138cf8bda20712f6fae89b40ae10069bfe4fb5c`|
|42059641718/2|1689933|320|`eb526408fa12021aa07753005858736b32f23edc9f02816e2ef13da714c46460`|
|42059641718/3|1689764|320|`9217e0e3d3ff06b924b8ddaee1d3a2276b71efd4fbe159b6f5eb81b0dc7ae817`|
|42059641718/4|1689764|320|`b0705425e934b8752ab3d8310ac8feedff7471e3a2ddeafde2acd42b659dc57a`|
|42059641718/5|1689764|320|`2484e338be9da5b8d527f31a6e9ed3a7ea658edb137efa40a65a0cfd86a64df8`|
|42059641718/6|1689764|320|`f94d5ad4dcff02d0bbb4c492ad56890f6b7883b6cb2d90e3ce472b7143fe01d7`|
|42059641718/7|1689764|320|`6e78e0331efe4683dce3952bc873ab3653f57b02503187117228c55eca9a8aaa`|
|42059641718/8|1689764|320|`13faed60d17fbd791d0c7fdc734424d0a5e3591588a07556a650042ba5a0c89a`|
|42059641718/9|1689764|320|`30990659bf6dc2b4199da321e1ee7543d166d59cdd17c8ba27272d12f26b4627`|
|42059641718/10|1689764|320|`100becc43ad231e75f9670bdc7c28b02c8ad81d0e8f2410aa4c1666bafe76bc0`|
|42059641718/11|1689764|320|`1d435131f9da7b465ab63451f64f5aa2b31a01ebee56a6f12dff10f5cc917cfc`|
|42059641718/12|1689764|320|`a41e29810c333f3d236f527f4940b2abe11707cf896e9a250950f2741e79f34e`|
|42059641718/13|1689764|320|`93794e501401ee3e23c503d3ac873dd09fe235b874fb5c2e89159b0463ec1e7c`|
|42059641718/14|1689764|320|`d7f500d74e456903b812e6c896eaaa23d347589fa9504804b5a4b6b80a1a801a`|
|42059641718/15|1689764|320|`d7ad79f48e7bcb32198eb1406513204c72b633339a9cab2490012bbf010bed2d`|
|42059641718/16|1689764|320|`ebd398c2b76b8b767d23dfcda2b1c76bbff9d7a7beb4996f6b6fa50d32d0d31d`|
|42059641718/17|1689764|320|`103c5bcf6bfb59963a80867f2ffe4efb03c7dd805e3bcbf69d7832d379150161`|
|42059641718/18|1689764|320|`cd18d78c5f7f6207ca43556550bd5ba610a705be5f4e9d8dbd86b7e379aaa5a0`|
|42059641718/19|1689764|320|`66038a47538c50040ce369391189b9f35b5969c604cb5be56e77ee6734332cdc`|
|42059641718/20|1689764|320|`ec9fa33713db70a2303cbff5991071408e923fd690c895be88b685477e2348ea`|
|42059641718/21|1689764|320|`a6a1e07acd4e9aaa733f774b71015c93a0b48555bb07dc82253c4e1b7e74b1ba`|
|42059641718/22|1689764|320|`83788443f8af6039300b414f2a1701e31160255c0bedb345b5d45b91ffc0af64`|
|42059641718/23|1689764|320|`bf52c03bf5d1456f5e32dbeeb30aa2d4d67e760872092ae4c76ca5c2af1e61ad`|
|42059641718/24|1689764|320|`f4a749d5f0a992421de6c9fcebcf711bc095993fb90cdcee91c5afb74fd9852d`|
|42059641718/25|1692321|320|`d46e1f3d2b6763fdc46b5e50770e6403e3e122b58fde0050e137534c67c9d120`|
|42059641718/26|1692321|320|`308037e0f68dc494f493ff6cc615fdbcad09ec20a066337761199d09ed6bbd31`|
|42059641718/27|1692321|320|`8c2798fecb6a2cc4e638a0d242e2b0522e6b003bd319b8be1fbe4de4ff4cfcd8`|
|42061681764/1|1689764|320|`5a4f66d925980a89a040b6880950ad2b30ad2eaf71c3485e6d747d877f13dc79`|

| Logged M role | Calls | Bytes | Inputs | SHA-256 |
| --- | ---: | ---: | ---: | --- |
|Actual token/MCP fixture|26|1671443|300|`f0b31e17cb31207a010e7fee6bb8b52b69856d3d409916687539677bff3d939d`|
|SDK-native selected forwarder fixture|3|110968|187|`a90fcc6ef797de0218b93de2c166c8f6957c7bdf5468e0280f998b3ef0e0d45a`|

The normal final QA component output is1,689,764 bytes/320inputs; late-completion observer variant is1,689,933 bytes/320inputs; SDK selected observed fixture is1,692,321 bytes/320inputs. Actual token/MCP M is1,671,443 bytes/300inputs. Unchanged profile compatibility_date is2026-09-07; actual flags retain enable_request_signal, QA nodejs_compat and M nodejs_compat/global_fetch_strictly_public. No compatibility/profile extension is made.

## Final scope and protected blobs

Final code-only BASE diff has exactly these files; the later report adds only itself:

| Path | Final blob SHA |
| --- | --- |
|lib/mcp-qa-finite-owner-phase-context.mjs|`ebebaa9542c2408c0d505d1e23daa946762c1cab`|
|test/fixtures/finite-initial-entry-world.mjs|`6947e6f19d0a7d87586dda69866440170ada818c`|
|test/mcp-qa-finite-owner-qa-sdk-token-compat-native.test.mjs|`54865b41143b53fadcec189a92fe22de7519b092`|

BASE metadata plus the complete3-file GitHub compare verifies that all other source blobs are inherited unchanged, including these protected paths:

| Path | Unchanged blob SHA |
| --- | --- |
|lib/mcp-qa-cloud-closed-pins.mjs|`26213123304eea25e652a52d808d25b7e0e3475e`|
|lib/mcp-qa-finite-initial-cleanup.mjs|`34a93b63607cff1454f914e16062f17aa3c3e0bb`|
|lib/mcp-qa-finite-initial-entry.mjs|`c5ae0f53bee077c693d7f0a0599bbb6347648fee`|
|lib/mcp-qa-finite-owner-oauth-forward.mjs|`f7979579fcb6d00b3d5d68c7790089c803f4170f`|
|lib/mcp-qa-finite-owner-oauth-qa.mjs|`ec5c16161bffc6e6d19de153b4465bf6ae748493`|
|lib/mcp-qa-finite-preparation-issuer-journal.mjs|`414450aa08f797bed5a41cf5cc697342785ce16b`|
|lib/mcp-qa-finite-preparation-issuer-store.mjs|`01d1a85eccaa98944b9ce3341db3cd071a4ad24d`|
|lib/mcp-qa-finite-profile.mjs|`547eb82f4ec83a2e7bcec88dd18622fc636dc477`|
|lib/mcp-qa-finite-stage-work.mjs|`a89baeb2578856dadedf700f9d66e180eb09120e`|
|wrangler.independent-closure-qa.finite.jsonc|`31c6638c204b631c846a537cbec13b3f9b24e060`|
|wrangler.mcp-own.finite.jsonc|`87d3f78c62d373c1f18803da7dc6a4e300caddbf`|
|test/fixtures/finite-owner-qa-sdk.mjs|`3589b8795cae65fac3b6c7e7899a872e11972690`|
|lib/delegated-oauth-worker.mjs|`d979f395029c9b1e66a99222d06acf99eba4f358`|

Dependency manifests/lock, all other SDK/schema/store/journal code, bound-clock inputs, native source/owner checks, SDK pending guards, Entry/cleanup, standard compiler/import graph and all profiles are outside the diff. Actual DO snapshot and historical application grants are compared only in-memory by tests, not copied to the report/log. No SDK KV global equality/drain is claimed.

Source ceiling2026-11-03T02:59Z remains expired; original parent<=30000ms and child<=5000ms/C0/C1 are unchanged. Provider/control-plane/custody/source substitutions remain SYN fixtures. QA issuance/SDK crypto/native KV+DO/D1/issuer/token/MCP/factual reader are actual components inside Miniflare. Native field changes after each genuine positive flow are explicitly SYN; an arbitrary valid timestamp cannot prove SDK/token success or authorize more work.

operationalReadiness=false; completePackage=false; PCoff=false. No AFW/provider account, runtime, Entry, DDL, OAuth browser/OTP, credentials, permissions, Max, main/merge, mounting, notices/store/receiver, subscription/consumer/cleanup/ARM or next unit is activated. Prior D0.3 and fanout deferred concerns remain whole-branch review inputs; actual remote provider latency, mounted graph, physical drain and PC-off service are not qualified here.

Report path `docs/superpowers/reports/2026-11-05-finite-owner-exchange-continuity.md`. Its containing report HEAD/tree are delivered to root alongside this exact code HEAD/tree rather than embedded as self-referential commit hashes. Root must inspect the complete actual BASE diff and obtain fresh independent review before accepting D04 or activating another unit.

Report-finalization reconciliation: first CAS to initial report commit620a9b33 returned an internal GraphQL error at16:12:40UTC (fifth such error in this unit). Independent readback confirmed code HEADf9ee816c remained current, so that first report attempt did not apply. This report revision includes that additional failure and is prepared from the same verified code parent; final delivery independently reads branch/report after CAS. No cause is attributed to credentials or source code. Any failure of this containing report's own reference update is necessarily delivered separately to root rather than recursively rebuilding a report solely to include its own publication event.
