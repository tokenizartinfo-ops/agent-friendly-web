# D0.3 — actual QA code → M token → MCP qualification

5 November 2026. SOURCE qualification for ROOT's independent review. DONE_WITH_CONCERNS; no operational acceptance or further unit activation.

## Revision, authority and delivery

PROJECT AFW; REPOSITORY tokenizartinfo-ops/agent-friendly-web (numeric repository ID 1347578006); ENVIRONMENT GitHub source / isolated credential-free GitHub Actions; ORIGIN GitHub App; RESOURCE_TYPE branch, Git objects and Actions runs/jobs; RESOURCE_ID feat/finite-native-cleanup-20261101; ALLOWED_ACTION source/test writes through expected-head CAS and bounded synthetic qualification. BASE 2f80f8db9d6cffd9ae32e6733069e886d1d1110d. Requirements: docs/superpowers/briefs/2026-11-05-finite-owner-sdk-trust-boundary-d03.md and accompanying preflight at BASE.

Final code/test/compiler head ed63b971cbf9da8278fea0e87fb71ce892886823, tree 4eccb9aae634f7a1da04c7255352eda9ef583bc5. Final M blob d979f395029c9b1e66a99222d06acf99eba4f358; final suite blob d4c6c032eaeff2e71a31a29e6a387c6ad1cdabe1. The report's containing commit/tree are supplied by the CAS delivery receipt: a commit cannot embed its own hash. That final delivery adds only this report and removes .github/workflows/afw-d03-sdk-token-source.yml; qualified product/test bytes remain identical.

Sole product writer, no subagents. Every write checked the branch head, created a tree/commit on the expected parent and advanced the ref with expected_sha. Rollback scope is a reviewed revert of this unit's branch diff to BASE; no runtime rollback was executed. No main, merge, production Entry/profile/schema/installation, browser, real provider/AFW request, credential, OTP, customer data or local clone/dependency/build/test operation. Skill-file reads were the only local shell work. No qualifier/artifact upload remains; no code/token/cookie value was logged.

## Actual behavior and the two authorized guards

The uninstrumented valid QA GET→POST issued its actual SDK code with the original applicationGrantId/userId/projectId and one native application UUID. Actual M createDelegatedOAuthWorker handled /oauth/token, including its actual SDK callback and boundedTokenResponse, and the actual /mcp resource server/repository returned the original project's summary. First clean baseline 7529faa15fdccdab141e3eb9c0e6d624bb0e1576 passed with expires_in=300, no refresh field and events disabled. The full matrix at 090e481532fe7e07d102a818ade744520d0b67ac repeated that positive using the exact original source window. No positive RED was manufactured.

Causal negative RED at 7a2fb82a70904f32c73ca983da78bac7d8501c51: four genuine SDK-format corruptions of the original code's encrypted props preserved its valid original application pointer. Missing/wrong redundant userId each produced token HTTP200 and later MCP401. Missing/wrong redundant projectId each produced token HTTP200 and later MCP403. These were explicitly SYN negative setup, not positive QA issuance or another app permission.

The brief's conditional amendment therefore applied. Commit 732ecd3b62956c7871e463b3303ff844a746c3f0 adds only options.props?.userId===grant.subject and options.props?.projectId===grant.projectId to the existing rejection condition before consumeExchange. The five unchanged tests then passed: original valid baseline plus four invalid_grant/400 redundant-tuple denials, with exchanged_at still empty on each denial. The native grant, SDK code subject, client, resource, scopes, current ownership, pilot project, status, expiry, one-use and refresh guards remain in place. No new validator, store, schema, endpoint, fallback, clock or SDK API was introduced.

## Fixture boundary and corrections

Two native Workers retain the actual accepted profile date/flags: M 2026-09-07 with nodejs_compat/global_fetch_strictly_public/enable_request_signal; QA 2026-09-07 with nodejs_compat/enable_request_signal. QA's actual isolated AFW_FINITE_OWNER_OAUTH_KV and M.OAUTH_KV share finite-sdk-shared. M.DB aliases the same native D1 as QA.RELEASE_DB (initial-db). Same named qa-sdk initializer and native DO identity are preserved; the existing single-instance setOptions initialization and awaited guarded disposal remain.

Only actual /oauth/token and /mcp enter the ordinary M worker in the new fixture. /authorize still uses the D0.2 forwarder/QA receiver. Other product paths remain closed, including registration. Fixed test-only configuration/namespace controls are not product routes. Events are false; the observed tool catalog has only read_project_summary/read_saved_evidence. No events authority factory, replacement verifier, fake token response, positive grant seed or granting fallback is used.

The isolated client registry is seeded directly in native KV, as permitted. External owner Access/JWKS, approvals, material, custody, provider/ledger observations, candidate bytes and ceiling substitution are SYN; actual SDK1.2.1 crypto, QA issuance, Unit2a same-store/same-child mutation, native KV/DO/D1, token callback, bounded response and MCP permission checks run unchanged except the two guards. Actual JS/SQL clocks are not shifted during these operations. The original product ceiling 2026-11-03T02:59:00Z stays expired. The final M SYN host expiry comes from source.window.expiresAt (original C0); earlier baseline setup used a fresh ten-minute SYN ceiling.

Fixture corrections were kept separate from product evidence:

- The first attempt imported a nonexported MCP transport subpath. It failed before any compiler/native operation; the installed root export corrected it, with no dependency change.
- M preflight also requires Access audience/team-domain pins on token requests. The initial SYN environment omitted these and returned503. They are now copied from the original QA source. Pins are retained in the test wrapper rather than mutating a request-local env object. Temporary diagnostics only printed field types/flags; their inner-catch regex was inert and is removed.
- Miniflare carried Host127.0.0.1 to the real MCP allowed-host guard. The test wrapper restores the fixed canonical issuer Host before the real token/MCP handler; product host validation remains intact.
- A raw helper tried JSON parsing then cancelling an already-consumed non-JSON body; its first four-negative run failed at that helper. The corrected next run produced the genuine four causal REDs described above.
- In the first complete matrix, changing grantData.userId was not an actual SDK subject mismatch: the SDK derives callback userId from the code prefix. The corrected SYN negative reuses the same SDK id/secret and original app UUID, changes the code subject, recalculates its SHA-256 authCodeId, rewraps the actual props key and reencrypts matching redundant foreign userId, deletes the old SDK key and places that one corrupted family at its new native KV key. No second application grant is created; crypto-format validity is checked before actual exchange.
- The SDK legitimately downscopes a mixed read+evidence request to the granted read scope. That earlier200 was not scope escalation. The corrected request asks only for evidence, outside the original read grant, and actual SDK returns invalid_scope400.
- Revoked/expired-token raw responses were actual HTTP200 text/event-stream/SSE, not a single JSON document. Safe carrier metadata now records this; the actual MCP Client transport reads the result and confirms delegated_access_denied. No product response or validator changed.

SDK format/semantics were checked against the pinned official [v1.2.1 source](https://github.com/cloudflare/workers-oauth-provider/blob/v1.2.1/src/oauth-provider.ts): code prefix identity and grant lookup, SHA-256 authCodeId, HMAC/AES-KW wrapping, AES-GCM props, requested-scope downscoping and code-replay family retirement. No public-source observation is treated as runtime/provider-operation evidence.

## Meaningful negative and terminal results

All rows below are observed on actual M routes using the actual original native permission. SYN alterations are negative-only and isolated. Historical rows and the single new application UUID are checked in every world.

| Input / reduction | Actual outcome and boundary |
| --- | --- |
| Wrong S256 verifier |400 invalid_grant, SDK PKCE gate; application exchange unchanged |
| Wrong client |401 invalid_client, SDK client gate |
| Wrong resource |400 invalid_target, SDK audience gate |
| Separate native empty KV namespace |401 invalid_client at actual SDK client lookup; no assertion it reached code lookup |
| Missing applicationGrantId |503 generic M denial; existing native lookup cannot bind absent id. No broadened product fix or false invalid_grant claim |
| Wrong applicationGrantId |400 invalid_grant; native app pointer unavailable |
| Missing/wrong redundant userId/projectId |400 invalid_grant after two guards; no exchange consumption |
| Actual foreign SDK code subject, matching redundant foreign userId |400 invalid_grant; original native subject remains decisive |
| Changed actual project owner |400 invalid_grant; actual owned-project lookup |
| Changed original app project |400 invalid_grant; exact native tuple/project remains decisive |
| SDK granted scope read+evidence vs original read grant |400 invalid_grant; callback cannot broaden native scope |
| Evidence-only requested scope |400 invalid_scope; SDK downscope yields no permitted requested scope |
| Already-consumed native exchange |400 invalid_grant; no second app grant or renewed permission |
| Reuse of actual already-exchanged code |400 invalid_grant; original application row unchanged. Subsequent original token MCP401 records SDK opaque-family retirement, not D0.2 winner-preservation |
| Actual original terminal fence + grant revocation before exchange |400 invalid_grant; exchanged_at stays empty |
| Original issued row timestamp shortened into the past |400 invalid_grant with actual JS/SQL clock unchanged |
| Otherwise-valid issued token after actual revocation or timestamp expiry |Raw HTTP200/SSE proves SDK transport still accepts the token; actual Client summary returns delegated_access_denied, no data |
| Original row expiry reduced to90s |Actual token response89s in full matrix, no refresh; positive MCP read still succeeds |

The revocation helper reads the actual original reservation/ExpectedGrant, creates one real cleanup lease and uses the original createFinitePreparationIssuerStore instance to closeFence→observeGrant→revokeGrant. Real barrier and observation witnesses never leave that lexical stack. It explicitly observes an active row after fence closure and before revocation: a fence alone does not revoke existing permission. No ordinary unfenced granting/revoking fallback, new app UUID or copied witness is used.

Late completion: actual QA completeAuthorization is held at actual native KV put settlement, after the original application row exists and SDK's native put can already have committed. While held, the actual original fence and grant reduction apply. The actual SDK Promise then settles late; a fixed test-only observation captures that actual returned code transiently in RAM, with no transport/log/durable result receipt. The public request returns503, no sdk_complete:observed ACK is appended, and actual M exchange of the late code returns400 invalid_grant against the revoked original row. The otherwise-valid-token tests independently establish actual MCP revocation/expiry denial. This does not prove physical KV cancellation, global drain or Worker restoration.

## Commands, attempts and compiler accounting

All Actions runs are attempt1, Ubuntu24.04 / Node22.23.4, permissions contents:read, checkout persist-credentials:false/fetch-depth1, npm ci --ignore-scripts --no-audit --no-fund. Scoped ESLint runs before native work; final lint has zero errors/warnings. No local execution or API-account credential is used.

| Head | Run / job | Result | Fixture esbuild calls |
| --- | --- | --- | ---: |
|2dcc0ff1da26d48a945a32dad63a1fc5291b81bd|42039777263 /127287225786|Import-path failure before native entry;0P1F|0|
|5cec4bc9fd5d95b9ddfa60213fc8d54063350ae5|42039963185 /127287872002|Incomplete SYN M preflight;0P1F|2|
|32307c654db90b804e0a45f6c400271824af452f|42040126296 /127288432439|Pins lifetime corrected; Access preflight still incomplete;0P1F|2|
|31870720fe3a5de98c126f022ea3a473fcb5b154|42040346097 /127289211098|Inert inner diagnostic / SYN preflight;0P1F|2|
|fb75b423d4e6adb75a745b90349a204a9b9ce576|42040405732 /127289424645|Safe env-shape diagnostic / same preflight;0P1F|2|
|6287b22bbc7fbfd3c7fa01ad267ff796100849db|42040620019 /127290172934|Actual token200; native MCP Host guard;0P1F|2|
|7529faa15fdccdab141e3eb9c0e6d624bb0e1576|42040832734 /127290904223|Clean unchanged-product baseline1P0F|2|
|4bc0125ff7524e3ba54759aa18f96f933a88afce|42041039988 /127291599965|Baseline1P; four raw-body-helper failures, not causal RED|10|
|7a2fb82a70904f32c73ca983da78bac7d8501c51|42041380574 /127292772280|Genuine tuple RED:1P4F; each invalid tuple token200, MCP401/403|10|
|732ecd3b62956c7871e463b3303ff844a746c3f0|42041688034 /127293828156|Same five cases minimal GREEN5P0F|10|
|090e481532fe7e07d102a818ade744520d0b67ac|42042017473 /127294973171|Complete24-case run20P4F: two wrong negative setups and two carrier assertions; later gates skipped|48|
|ed63b971cbf9da8278fea0e87fb71ce892886823|42043171429 /127299023947|Corrected4P0F; old D0.2 positive1P0F; affected regressions50P0F; standard gatePASS|10|

Exact final commands:

~~~sh
npx eslint lib/delegated-oauth-worker.mjs test/fixtures/finite-owner-qa-sdk.mjs test/fixtures/finite-initial-entry-world.mjs test/mcp-qa-finite-owner-qa-sdk-token-compat-native.test.mjs
timeout 180s node --test --test-name-pattern='actual original QA code negative (sdk-subject|requested-scope)|otherwise valid actual token' test/mcp-qa-finite-owner-qa-sdk-token-compat-native.test.mjs
timeout 150s node --test --test-name-pattern='uninstrumented actual native source/SDK/Unit2a GET POST' test/mcp-qa-finite-owner-qa-sdk-native.test.mjs
timeout 180s node --test --test-concurrency=1 test/delegated-oauth-flow.test.mjs test/delegated-oauth-store.test.mjs test/delegated-project-mcp.test.mjs test/delegated-project-read.test.mjs test/delegated-pilot-permission-expiry.test.mjs
~~~

The original full new-suite command at090 was `timeout 420s node --test test/mcp-qa-finite-owner-qa-sdk-token-compat-native.test.mjs`. ROOT explicitly directed preserving its20 passes and rerunning only the four causally corrected cases. Final verification is therefore staged24-case coverage, not a claimed single24/24 run ated63. The same M blob and two native fixture files are unchanged between090 anded63; only those failing test preparations/read assertions and the scoped qualifier changed. Legitimate refresh/consent positives were not rewritten to denial; the50 regressions include actual M authorization-code, one-use refresh, expiry, current ownership, token bounds and MCP disconnect behavior.

Actual esbuild accounting for this unit:100 fixture calls (50 SDK worlds, two roles each), zero failed esbuild invocations; import failure invoked none. The final run contributes8 builds for corrected cases and2 for the relevant old positive. The50 Node OAuth/MCP regressions invoke no esbuild. Exactly ONE compileFiniteNativeStaging API call at final ed63 invokes3 standard esbuild calls: one embedded node program plus two Worker roles. Total103 actual authored esbuild calls. buildFiniteNativePackage=0; no extra build solely for hashes. Previous D0.1/D0.2 work and Miniflare internal parsing/JIT are excluded.

Warnings are retained: npm/action deprecations, SDK CIMD warning on QA's unchanged flags, native RPC-stub lifecycle warnings, MCP JSON notification notices and Node experimental SQLite warnings in Node regressions. In the final job the bounded log contains5 RPC-stub warning lines,7 CIMD lines,69 MCP notification notices and3 SQLite experimental lines. Awaited Miniflare disposal is present; these messages are not a physical-drain proof. No lint warning was hidden.

## Standard graph versus executing fixture graph

The final standard gate calls compileFiniteNativeStaging({cwd:process.cwd(),sourceRevision:process.env.GITHUB_SHA}), verifies exact revision/tree and completePackage=false/operationalReadiness=false, then checks actual role metafiles. Original2MiB M and3MiB QA caps and role exclusions remain.

| Standard role ated63 | Bytes / cap | SHA-256 | Graph |
| --- | --- | --- | --- |
|canaryLive M|1,952,076 /2,097,152|077084c806762dcfdbd07a2a509d1fe20e4cf2802813011411dcb8e9634cc168|331 parsed inputs; ordinary SDK1 parsed/227759 emitted bytes; finite phase reader absent/emitted0; finite QA receiver/forwarder absent|
|qaLive|2,021,441 /3,145,728|9b27a136048a0548d8ef958ff7e778c89f37f3a060b46b58460cec9e59b4b7f0|305 parsed inputs; SDK0; finite phase reader absent/emitted0; finite QA receiver/forwarder absent|

Standard M excludes effectful initial-entry, candidate-residency decoder, preparation issuer store/journal, provenance journal and native filesystem imports; unchanged compiler role guards remain. Existing shared initial-anchors/Entry DATA are allowed. This is the accepted UNMOUNTED standard graph, not proof of a mounted SDK/reader budget.

Separate final executing token fixture M:1,671,443 bytes,300 inputs,SHAf0b31e17cb31207a010e7fee6bb8b52b69856d3d409916687539677bff3d939d. Normal QA component fixture:1,688,253 bytes,320 inputs; its hash varies with each disclosed SYN ceiling. First final corrected world SHA41bd914692cccf4d4fbf91ae29bff0178b5d82ab6637c6bb63bd356743f3f645. The late-result observer's actual full-matrix fixture outputs at090 are QA1688422 bytes/320 inputs/SHAa700fba2f4d9c7063c9f0d285dd42fd8ee9e1f3af9db9b5834afc2a07d0e4152 and M1671443 bytes/300 inputs/SHAf0b31e17cb31207a010e7fee6bb8b52b69856d3d409916687539677bff3d939d; both calls are included in the48 and are not standard role output. The old D0.2 positive at final head uses only forwarder M109279 bytes/187 inputs/SHA518ec6763dc13f8cd1c6dc7b62a4e185bf95767f342954b9908d3bab6a6db734.

## Unchanged protected blobs and limits

Verified against BASE and final code tree; original source/schema/SDK/flags/date/Entry/cleanup remain unchanged:

| Path | Blob SHA |
| --- | --- |
|lib/mcp-qa-cloud-closed-pins.mjs|26213123304eea25e652a52d808d25b7e0e3475e|
|lib/mcp-qa-finite-initial-cleanup.mjs|34a93b63607cff1454f914e16062f17aa3c3e0bb|
|lib/mcp-qa-finite-initial-entry.mjs|c5ae0f53bee077c693d7f0a0599bbb6347648fee|
|lib/mcp-qa-finite-owner-oauth-forward.mjs|f7979579fcb6d00b3d5d68c7790089c803f4170f|
|lib/mcp-qa-finite-owner-oauth-qa.mjs|ec5c16161bffc6e6d19de153b4465bf6ae748493|
|lib/mcp-qa-finite-owner-phase-context.mjs|c5b194411c7ee2cc4f38e7f4602f2f10e1c1d254|
|lib/mcp-qa-finite-preparation-issuer-journal.mjs|414450aa08f797bed5a41cf5cc697342785ce16b|
|lib/mcp-qa-finite-preparation-issuer-store.mjs|01d1a85eccaa98944b9ce3341db3cd071a4ad24d|
|lib/mcp-qa-finite-profile.mjs|547eb82f4ec83a2e7bcec88dd18622fc636dc477|
|lib/mcp-qa-finite-stage-work.mjs|a89baeb2578856dadedf700f9d66e180eb09120e|
|package-lock.json|36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b|
|wrangler.independent-closure-qa.finite.jsonc|31c6638c204b631c846a537cbec13b3f9b24e060|
|wrangler.mcp-own.finite.jsonc|87d3f78c62d373c1f18803da7dc6a4e300caddbf|

The final old-positive timing is GET3997ms /POST4717ms, original consume SEND→grant ACK1180ms with3632ms remaining,84 mocked provider GET observations and0 ledger GETs inside that child interval. This is in-process SYN provider latency, not evidence that real control-plane IO meets the unchanged<=5s child. Earlier live-I/O feasibility concerns and D0.2's external Node dispatch abort limitation remain. Optimization/audit proposals are INACTIVE; no cache/check/clock changes were made.

operationalReadiness=false; completePackage=false; PCoff=false. D0.1 alias installation, full mounting, notice/consumer/subscription acceptance, actual credential/binding grants, real provider timing, functional cloud trial, cleanup/Entry and runtime promotion remain outside this unit. No claim of global KV drain, restoration, mounted graph, continuous service or owner consent follows from these tests. Missing application pointer remains a503 denial in unchanged lookup semantics; broadening that behavior was not authorized. ROOT owns the fresh complete BASE diff, independent spec/quality review and any later activation.
