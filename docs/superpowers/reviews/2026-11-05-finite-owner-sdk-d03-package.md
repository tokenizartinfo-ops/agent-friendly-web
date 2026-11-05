# D0.3 actual QA→M token→MCP — complete task review package

Repository tokenizartinfo-ops/agent-friendly-web (1347578006).
BASE 2f80f8db9d6cffd9ae32e6733069e886d1d1110d
HEAD c35716e68245bd7f7747a6d6020ebd4953df8270
Qualified code head ed63b971cbf9da8278fea0e87fb71ce892886823, tree4eccb9aae634f7a1da04c7255352eda9ef583bc5. Root separately verified code→report delivery changes only report addition and removal of own temporary qualifier; product/test bytes unchanged. Net BASE..HEAD exactly five files below. Modified files use complete U10 recomputed from exact BASE/HEAD contents; added files shown in full. No local checkout/build.

## Commits
- 2dcc0ff1da26d48a945a32dad63a1fc5291b81bd test: qualify native QA SDK code through actual M token baseline
- 5cec4bc9fd5d95b9ddfa60213fc8d54063350ae5 test: use installed MCP client transport export for native baseline
- 32307c654db90b804e0a45f6c400271824af452f test: retain synthetic token window pins across native requests
- 31870720fe3a5de98c126f022ea3a473fcb5b154 test: locate native M fixture unavailable stage with bounded diagnostics
- fb75b423d4e6adb75a745b90349a204a9b9ce576 test: anchor diagnostic to final actual M failure guard
- 6287b22bbc7fbfd3c7fa01ad267ff796100849db test: supply exact synthetic Access pins required by unchanged M preflight
- 7529faa15fdccdab141e3eb9c0e6d624bb0e1576 test: preserve canonical synthetic Host across Miniflare MCP transport
- 4bc0125ff7524e3ba54759aa18f96f933a88afce test: expose actual SDK redundant tuple token boundary negatives
- 7a2fb82a70904f32c73ca983da78bac7d8501c51 test: observe actual non-JSON MCP tuple denial without double-consuming body
- 732ecd3b62956c7871e463b3303ff844a746c3f0 fix: require original redundant subject and project before token exchange
- 090e481532fe7e07d102a818ade744520d0b67ac test: qualify native original token permission reductions and late SDK result
- ed63b971cbf9da8278fea0e87fb71ce892886823 test: correct actual SDK subject scope and MCP denial carrier qualification
- c35716e68245bd7f7747a6d6020ebd4953df8270 docs: record D03 actual token qualification and retire bounded qualifier

## Stat summary
- added docs/superpowers/reports/2026-11-05-finite-owner-sdk-trust-boundary-d03.md: +139/-0
- modified lib/delegated-oauth-worker.mjs: +1/-1
- modified test/fixtures/finite-initial-entry-world.mjs: +3/-2
- modified test/fixtures/finite-owner-qa-sdk.mjs: +39/-3
- added test/mcp-qa-finite-owner-qa-sdk-token-compat-native.test.mjs: +183/-0

## Full unified diff

~~~diff
diff --git a/docs/superpowers/reports/2026-11-05-finite-owner-sdk-trust-boundary-d03.md b/docs/superpowers/reports/2026-11-05-finite-owner-sdk-trust-boundary-d03.md
new file mode 100644
--- /dev/null
+++ b/docs/superpowers/reports/2026-11-05-finite-owner-sdk-trust-boundary-d03.md
@@ -0,0 +1,139 @@
+# D0.3 — actual QA code → M token → MCP qualification
+
+5 November 2026. SOURCE qualification for ROOT's independent review. DONE_WITH_CONCERNS; no operational acceptance or further unit activation.
+
+## Revision, authority and delivery
+
+PROJECT AFW; REPOSITORY tokenizartinfo-ops/agent-friendly-web (numeric repository ID 1347578006); ENVIRONMENT GitHub source / isolated credential-free GitHub Actions; ORIGIN GitHub App; RESOURCE_TYPE branch, Git objects and Actions runs/jobs; RESOURCE_ID feat/finite-native-cleanup-20261101; ALLOWED_ACTION source/test writes through expected-head CAS and bounded synthetic qualification. BASE 2f80f8db9d6cffd9ae32e6733069e886d1d1110d. Requirements: docs/superpowers/briefs/2026-11-05-finite-owner-sdk-trust-boundary-d03.md and accompanying preflight at BASE.
+
+Final code/test/compiler head ed63b971cbf9da8278fea0e87fb71ce892886823, tree 4eccb9aae634f7a1da04c7255352eda9ef583bc5. Final M blob d979f395029c9b1e66a99222d06acf99eba4f358; final suite blob d4c6c032eaeff2e71a31a29e6a387c6ad1cdabe1. The report's containing commit/tree are supplied by the CAS delivery receipt: a commit cannot embed its own hash. That final delivery adds only this report and removes .github/workflows/afw-d03-sdk-token-source.yml; qualified product/test bytes remain identical.
+
+Sole product writer, no subagents. Every write checked the branch head, created a tree/commit on the expected parent and advanced the ref with expected_sha. Rollback scope is a reviewed revert of this unit's branch diff to BASE; no runtime rollback was executed. No main, merge, production Entry/profile/schema/installation, browser, real provider/AFW request, credential, OTP, customer data or local clone/dependency/build/test operation. Skill-file reads were the only local shell work. No qualifier/artifact upload remains; no code/token/cookie value was logged.
+
+## Actual behavior and the two authorized guards
+
+The uninstrumented valid QA GET→POST issued its actual SDK code with the original applicationGrantId/userId/projectId and one native application UUID. Actual M createDelegatedOAuthWorker handled /oauth/token, including its actual SDK callback and boundedTokenResponse, and the actual /mcp resource server/repository returned the original project's summary. First clean baseline 7529faa15fdccdab141e3eb9c0e6d624bb0e1576 passed with expires_in=300, no refresh field and events disabled. The full matrix at 090e481532fe7e07d102a818ade744520d0b67ac repeated that positive using the exact original source window. No positive RED was manufactured.
+
+Causal negative RED at 7a2fb82a70904f32c73ca983da78bac7d8501c51: four genuine SDK-format corruptions of the original code's encrypted props preserved its valid original application pointer. Missing/wrong redundant userId each produced token HTTP200 and later MCP401. Missing/wrong redundant projectId each produced token HTTP200 and later MCP403. These were explicitly SYN negative setup, not positive QA issuance or another app permission.
+
+The brief's conditional amendment therefore applied. Commit 732ecd3b62956c7871e463b3303ff844a746c3f0 adds only options.props?.userId===grant.subject and options.props?.projectId===grant.projectId to the existing rejection condition before consumeExchange. The five unchanged tests then passed: original valid baseline plus four invalid_grant/400 redundant-tuple denials, with exchanged_at still empty on each denial. The native grant, SDK code subject, client, resource, scopes, current ownership, pilot project, status, expiry, one-use and refresh guards remain in place. No new validator, store, schema, endpoint, fallback, clock or SDK API was introduced.
+
+## Fixture boundary and corrections
+
+Two native Workers retain the actual accepted profile date/flags: M 2026-09-07 with nodejs_compat/global_fetch_strictly_public/enable_request_signal; QA 2026-09-07 with nodejs_compat/enable_request_signal. QA's actual isolated AFW_FINITE_OWNER_OAUTH_KV and M.OAUTH_KV share finite-sdk-shared. M.DB aliases the same native D1 as QA.RELEASE_DB (initial-db). Same named qa-sdk initializer and native DO identity are preserved; the existing single-instance setOptions initialization and awaited guarded disposal remain.
+
+Only actual /oauth/token and /mcp enter the ordinary M worker in the new fixture. /authorize still uses the D0.2 forwarder/QA receiver. Other product paths remain closed, including registration. Fixed test-only configuration/namespace controls are not product routes. Events are false; the observed tool catalog has only read_project_summary/read_saved_evidence. No events authority factory, replacement verifier, fake token response, positive grant seed or granting fallback is used.
+
+The isolated client registry is seeded directly in native KV, as permitted. External owner Access/JWKS, approvals, material, custody, provider/ledger observations, candidate bytes and ceiling substitution are SYN; actual SDK1.2.1 crypto, QA issuance, Unit2a same-store/same-child mutation, native KV/DO/D1, token callback, bounded response and MCP permission checks run unchanged except the two guards. Actual JS/SQL clocks are not shifted during these operations. The original product ceiling 2026-11-03T02:59:00Z stays expired. The final M SYN host expiry comes from source.window.expiresAt (original C0); earlier baseline setup used a fresh ten-minute SYN ceiling.
+
+Fixture corrections were kept separate from product evidence:
+
+- The first attempt imported a nonexported MCP transport subpath. It failed before any compiler/native operation; the installed root export corrected it, with no dependency change.
+- M preflight also requires Access audience/team-domain pins on token requests. The initial SYN environment omitted these and returned503. They are now copied from the original QA source. Pins are retained in the test wrapper rather than mutating a request-local env object. Temporary diagnostics only printed field types/flags; their inner-catch regex was inert and is removed.
+- Miniflare carried Host127.0.0.1 to the real MCP allowed-host guard. The test wrapper restores the fixed canonical issuer Host before the real token/MCP handler; product host validation remains intact.
+- A raw helper tried JSON parsing then cancelling an already-consumed non-JSON body; its first four-negative run failed at that helper. The corrected next run produced the genuine four causal REDs described above.
+- In the first complete matrix, changing grantData.userId was not an actual SDK subject mismatch: the SDK derives callback userId from the code prefix. The corrected SYN negative reuses the same SDK id/secret and original app UUID, changes the code subject, recalculates its SHA-256 authCodeId, rewraps the actual props key and reencrypts matching redundant foreign userId, deletes the old SDK key and places that one corrupted family at its new native KV key. No second application grant is created; crypto-format validity is checked before actual exchange.
+- The SDK legitimately downscopes a mixed read+evidence request to the granted read scope. That earlier200 was not scope escalation. The corrected request asks only for evidence, outside the original read grant, and actual SDK returns invalid_scope400.
+- Revoked/expired-token raw responses were actual HTTP200 text/event-stream/SSE, not a single JSON document. Safe carrier metadata now records this; the actual MCP Client transport reads the result and confirms delegated_access_denied. No product response or validator changed.
+
+SDK format/semantics were checked against the pinned official [v1.2.1 source](https://github.com/cloudflare/workers-oauth-provider/blob/v1.2.1/src/oauth-provider.ts): code prefix identity and grant lookup, SHA-256 authCodeId, HMAC/AES-KW wrapping, AES-GCM props, requested-scope downscoping and code-replay family retirement. No public-source observation is treated as runtime/provider-operation evidence.
+
+## Meaningful negative and terminal results
+
+All rows below are observed on actual M routes using the actual original native permission. SYN alterations are negative-only and isolated. Historical rows and the single new application UUID are checked in every world.
+
+| Input / reduction | Actual outcome and boundary |
+| --- | --- |
+| Wrong S256 verifier |400 invalid_grant, SDK PKCE gate; application exchange unchanged |
+| Wrong client |401 invalid_client, SDK client gate |
+| Wrong resource |400 invalid_target, SDK audience gate |
+| Separate native empty KV namespace |401 invalid_client at actual SDK client lookup; no assertion it reached code lookup |
+| Missing applicationGrantId |503 generic M denial; existing native lookup cannot bind absent id. No broadened product fix or false invalid_grant claim |
+| Wrong applicationGrantId |400 invalid_grant; native app pointer unavailable |
+| Missing/wrong redundant userId/projectId |400 invalid_grant after two guards; no exchange consumption |
+| Actual foreign SDK code subject, matching redundant foreign userId |400 invalid_grant; original native subject remains decisive |
+| Changed actual project owner |400 invalid_grant; actual owned-project lookup |
+| Changed original app project |400 invalid_grant; exact native tuple/project remains decisive |
+| SDK granted scope read+evidence vs original read grant |400 invalid_grant; callback cannot broaden native scope |
+| Evidence-only requested scope |400 invalid_scope; SDK downscope yields no permitted requested scope |
+| Already-consumed native exchange |400 invalid_grant; no second app grant or renewed permission |
+| Reuse of actual already-exchanged code |400 invalid_grant; original application row unchanged. Subsequent original token MCP401 records SDK opaque-family retirement, not D0.2 winner-preservation |
+| Actual original terminal fence + grant revocation before exchange |400 invalid_grant; exchanged_at stays empty |
+| Original issued row timestamp shortened into the past |400 invalid_grant with actual JS/SQL clock unchanged |
+| Otherwise-valid issued token after actual revocation or timestamp expiry |Raw HTTP200/SSE proves SDK transport still accepts the token; actual Client summary returns delegated_access_denied, no data |
+| Original row expiry reduced to90s |Actual token response89s in full matrix, no refresh; positive MCP read still succeeds |
+
+The revocation helper reads the actual original reservation/ExpectedGrant, creates one real cleanup lease and uses the original createFinitePreparationIssuerStore instance to closeFence→observeGrant→revokeGrant. Real barrier and observation witnesses never leave that lexical stack. It explicitly observes an active row after fence closure and before revocation: a fence alone does not revoke existing permission. No ordinary unfenced granting/revoking fallback, new app UUID or copied witness is used.
+
+Late completion: actual QA completeAuthorization is held at actual native KV put settlement, after the original application row exists and SDK's native put can already have committed. While held, the actual original fence and grant reduction apply. The actual SDK Promise then settles late; a fixed test-only observation captures that actual returned code transiently in RAM, with no transport/log/durable result receipt. The public request returns503, no sdk_complete:observed ACK is appended, and actual M exchange of the late code returns400 invalid_grant against the revoked original row. The otherwise-valid-token tests independently establish actual MCP revocation/expiry denial. This does not prove physical KV cancellation, global drain or Worker restoration.
+
+## Commands, attempts and compiler accounting
+
+All Actions runs are attempt1, Ubuntu24.04 / Node22.23.4, permissions contents:read, checkout persist-credentials:false/fetch-depth1, npm ci --ignore-scripts --no-audit --no-fund. Scoped ESLint runs before native work; final lint has zero errors/warnings. No local execution or API-account credential is used.
+
+| Head | Run / job | Result | Fixture esbuild calls |
+| --- | --- | --- | ---: |
+|2dcc0ff1da26d48a945a32dad63a1fc5291b81bd|42039777263 /127287225786|Import-path failure before native entry;0P1F|0|
+|5cec4bc9fd5d95b9ddfa60213fc8d54063350ae5|42039963185 /127287872002|Incomplete SYN M preflight;0P1F|2|
+|32307c654db90b804e0a45f6c400271824af452f|42040126296 /127288432439|Pins lifetime corrected; Access preflight still incomplete;0P1F|2|
+|31870720fe3a5de98c126f022ea3a473fcb5b154|42040346097 /127289211098|Inert inner diagnostic / SYN preflight;0P1F|2|
+|fb75b423d4e6adb75a745b90349a204a9b9ce576|42040405732 /127289424645|Safe env-shape diagnostic / same preflight;0P1F|2|
+|6287b22bbc7fbfd3c7fa01ad267ff796100849db|42040620019 /127290172934|Actual token200; native MCP Host guard;0P1F|2|
+|7529faa15fdccdab141e3eb9c0e6d624bb0e1576|42040832734 /127290904223|Clean unchanged-product baseline1P0F|2|
+|4bc0125ff7524e3ba54759aa18f96f933a88afce|42041039988 /127291599965|Baseline1P; four raw-body-helper failures, not causal RED|10|
+|7a2fb82a70904f32c73ca983da78bac7d8501c51|42041380574 /127292772280|Genuine tuple RED:1P4F; each invalid tuple token200, MCP401/403|10|
+|732ecd3b62956c7871e463b3303ff844a746c3f0|42041688034 /127293828156|Same five cases minimal GREEN5P0F|10|
+|090e481532fe7e07d102a818ade744520d0b67ac|42042017473 /127294973171|Complete24-case run20P4F: two wrong negative setups and two carrier assertions; later gates skipped|48|
+|ed63b971cbf9da8278fea0e87fb71ce892886823|42043171429 /127299023947|Corrected4P0F; old D0.2 positive1P0F; affected regressions50P0F; standard gatePASS|10|
+
+Exact final commands:
+
+~~~sh
+npx eslint lib/delegated-oauth-worker.mjs test/fixtures/finite-owner-qa-sdk.mjs test/fixtures/finite-initial-entry-world.mjs test/mcp-qa-finite-owner-qa-sdk-token-compat-native.test.mjs
+timeout 180s node --test --test-name-pattern='actual original QA code negative (sdk-subject|requested-scope)|otherwise valid actual token' test/mcp-qa-finite-owner-qa-sdk-token-compat-native.test.mjs
+timeout 150s node --test --test-name-pattern='uninstrumented actual native source/SDK/Unit2a GET POST' test/mcp-qa-finite-owner-qa-sdk-native.test.mjs
+timeout 180s node --test --test-concurrency=1 test/delegated-oauth-flow.test.mjs test/delegated-oauth-store.test.mjs test/delegated-project-mcp.test.mjs test/delegated-project-read.test.mjs test/delegated-pilot-permission-expiry.test.mjs
+~~~
+
+The original full new-suite command at090 was `timeout 420s node --test test/mcp-qa-finite-owner-qa-sdk-token-compat-native.test.mjs`. ROOT explicitly directed preserving its20 passes and rerunning only the four causally corrected cases. Final verification is therefore staged24-case coverage, not a claimed single24/24 run ated63. The same M blob and two native fixture files are unchanged between090 anded63; only those failing test preparations/read assertions and the scoped qualifier changed. Legitimate refresh/consent positives were not rewritten to denial; the50 regressions include actual M authorization-code, one-use refresh, expiry, current ownership, token bounds and MCP disconnect behavior.
+
+Actual esbuild accounting for this unit:100 fixture calls (50 SDK worlds, two roles each), zero failed esbuild invocations; import failure invoked none. The final run contributes8 builds for corrected cases and2 for the relevant old positive. The50 Node OAuth/MCP regressions invoke no esbuild. Exactly ONE compileFiniteNativeStaging API call at final ed63 invokes3 standard esbuild calls: one embedded node program plus two Worker roles. Total103 actual authored esbuild calls. buildFiniteNativePackage=0; no extra build solely for hashes. Previous D0.1/D0.2 work and Miniflare internal parsing/JIT are excluded.
+
+Warnings are retained: npm/action deprecations, SDK CIMD warning on QA's unchanged flags, native RPC-stub lifecycle warnings, MCP JSON notification notices and Node experimental SQLite warnings in Node regressions. In the final job the bounded log contains5 RPC-stub warning lines,7 CIMD lines,69 MCP notification notices and3 SQLite experimental lines. Awaited Miniflare disposal is present; these messages are not a physical-drain proof. No lint warning was hidden.
+
+## Standard graph versus executing fixture graph
+
+The final standard gate calls compileFiniteNativeStaging({cwd:process.cwd(),sourceRevision:process.env.GITHUB_SHA}), verifies exact revision/tree and completePackage=false/operationalReadiness=false, then checks actual role metafiles. Original2MiB M and3MiB QA caps and role exclusions remain.
+
+| Standard role ated63 | Bytes / cap | SHA-256 | Graph |
+| --- | --- | --- | --- |
+|canaryLive M|1,952,076 /2,097,152|077084c806762dcfdbd07a2a509d1fe20e4cf2802813011411dcb8e9634cc168|331 parsed inputs; ordinary SDK1 parsed/227759 emitted bytes; finite phase reader absent/emitted0; finite QA receiver/forwarder absent|
+|qaLive|2,021,441 /3,145,728|9b27a136048a0548d8ef958ff7e778c89f37f3a060b46b58460cec9e59b4b7f0|305 parsed inputs; SDK0; finite phase reader absent/emitted0; finite QA receiver/forwarder absent|
+
+Standard M excludes effectful initial-entry, candidate-residency decoder, preparation issuer store/journal, provenance journal and native filesystem imports; unchanged compiler role guards remain. Existing shared initial-anchors/Entry DATA are allowed. This is the accepted UNMOUNTED standard graph, not proof of a mounted SDK/reader budget.
+
+Separate final executing token fixture M:1,671,443 bytes,300 inputs,SHAf0b31e17cb31207a010e7fee6bb8b52b69856d3d409916687539677bff3d939d. Normal QA component fixture:1,688,253 bytes,320 inputs; its hash varies with each disclosed SYN ceiling. First final corrected world SHA41bd914692cccf4d4fbf91ae29bff0178b5d82ab6637c6bb63bd356743f3f645. The late-result observer's actual full-matrix fixture outputs at090 are QA1688422 bytes/320 inputs/SHAa700fba2f4d9c7063c9f0d285dd42fd8ee9e1f3af9db9b5834afc2a07d0e4152 and M1671443 bytes/300 inputs/SHAf0b31e17cb31207a010e7fee6bb8b52b69856d3d409916687539677bff3d939d; both calls are included in the48 and are not standard role output. The old D0.2 positive at final head uses only forwarder M109279 bytes/187 inputs/SHA518ec6763dc13f8cd1c6dc7b62a4e185bf95767f342954b9908d3bab6a6db734.
+
+## Unchanged protected blobs and limits
+
+Verified against BASE and final code tree; original source/schema/SDK/flags/date/Entry/cleanup remain unchanged:
+
+| Path | Blob SHA |
+| --- | --- |
+|lib/mcp-qa-cloud-closed-pins.mjs|26213123304eea25e652a52d808d25b7e0e3475e|
+|lib/mcp-qa-finite-initial-cleanup.mjs|34a93b63607cff1454f914e16062f17aa3c3e0bb|
+|lib/mcp-qa-finite-initial-entry.mjs|c5ae0f53bee077c693d7f0a0599bbb6347648fee|
+|lib/mcp-qa-finite-owner-oauth-forward.mjs|f7979579fcb6d00b3d5d68c7790089c803f4170f|
+|lib/mcp-qa-finite-owner-oauth-qa.mjs|ec5c16161bffc6e6d19de153b4465bf6ae748493|
+|lib/mcp-qa-finite-owner-phase-context.mjs|c5b194411c7ee2cc4f38e7f4602f2f10e1c1d254|
+|lib/mcp-qa-finite-preparation-issuer-journal.mjs|414450aa08f797bed5a41cf5cc697342785ce16b|
+|lib/mcp-qa-finite-preparation-issuer-store.mjs|01d1a85eccaa98944b9ce3341db3cd071a4ad24d|
+|lib/mcp-qa-finite-profile.mjs|547eb82f4ec83a2e7bcec88dd18622fc636dc477|
+|lib/mcp-qa-finite-stage-work.mjs|a89baeb2578856dadedf700f9d66e180eb09120e|
+|package-lock.json|36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b|
+|wrangler.independent-closure-qa.finite.jsonc|31c6638c204b631c846a537cbec13b3f9b24e060|
+|wrangler.mcp-own.finite.jsonc|87d3f78c62d373c1f18803da7dc6a4e300caddbf|
+
+The final old-positive timing is GET3997ms /POST4717ms, original consume SEND→grant ACK1180ms with3632ms remaining,84 mocked provider GET observations and0 ledger GETs inside that child interval. This is in-process SYN provider latency, not evidence that real control-plane IO meets the unchanged<=5s child. Earlier live-I/O feasibility concerns and D0.2's external Node dispatch abort limitation remain. Optimization/audit proposals are INACTIVE; no cache/check/clock changes were made.
+
+operationalReadiness=false; completePackage=false; PCoff=false. D0.1 alias installation, full mounting, notice/consumer/subscription acceptance, actual credential/binding grants, real provider timing, functional cloud trial, cleanup/Entry and runtime promotion remain outside this unit. No claim of global KV drain, restoration, mounted graph, continuous service or owner consent follows from these tests. Missing application pointer remains a503 denial in unchanged lookup semantics; broadening that behavior was not authorized. ROOT owns the fresh complete BASE diff, independent spec/quality review and any later activation.
~~~

~~~diff
diff --git a/lib/delegated-oauth-worker.mjs b/lib/delegated-oauth-worker.mjs
--- a/lib/delegated-oauth-worker.mjs
+++ b/lib/delegated-oauth-worker.mjs
@@ -69,21 +69,21 @@
   if(new URL(issuer).origin!==issuer||resource!==issuer+'/mcp')throw Error('Canonical issuer/resource required');
   if(eventsAuthorityFactory!==undefined&&typeof eventsAuthorityFactory!=='function')throw Error('Trusted events authority factory required');
   const authorizationServer=new OAuthAuthorizationServer({issuer,resources:[resource],scopesSupported:allowedScopes,
     accessTokenTTL:300,clientIdMetadataDocumentEnabled:false,
     async tokenExchangeCallback(options){
       const store=createDelegatedOAuthStore(database(options.env));const grant=await store.getGrant(options.props?.applicationGrantId);
       if(options.env.AFW_OAUTH_REFRESH_ENABLED==='true')await store.refreshSchemaReady();
       const refreshing=options.grantType==='refresh_token'&&options.env.AFW_OAUTH_REFRESH_ENABLED==='true';
       const remaining=Math.floor((Date.parse(grant?.expiresAt)-Date.parse(now()))/1000);
       if((options.grantType!=='authorization_code'&&!refreshing)||!grant||grant.status!=='active'||!Number.isFinite(remaining)||remaining<60||
+        grant.subject!==options.userId||options.props?.userId!==grant.subject||options.props?.projectId!==grant.projectId||grant.clientId!==options.clientId||grant.clientId!==options.env.AFW_OAUTH_PILOT_CLIENT_ID||
-        grant.subject!==options.userId||grant.clientId!==options.clientId||grant.clientId!==options.env.AFW_OAUTH_PILOT_CLIENT_ID||
         grant.resource!==resource||options.resource!==resource||!pilotProjectAllowed(options.env,grant.projectId)||!validScopes(options.scope)||options.scope.some(s=>!grant.scopes.includes(s))||
         !validScopes(options.requestedScope)||options.requestedScope.some(s=>!grant.scopes.includes(s))||
         !(await createDelegatedProjectRepository({db:database(options.env),grantStore:store}).getOwnedProject(grant.projectId,grant.subject)))
         throw new OAuthError('invalid_grant',{description:'Permission unavailable',statusCode:400});
       if(refreshing){
         const digest=options.env[refreshAttempt];
         if(!digest||!await store.consumeRefresh(digest,grant.grantId,options.userId,options.clientId,resource,now()))
           // Provider invalid_grant revokes its whole family. A retry of a
           // consumed credential must not destroy the successful successor.
           throw new OAuthError('invalid_request',{description:'Renewal already used; reconnect if needed',statusCode:400});
~~~

~~~diff
diff --git a/test/fixtures/finite-initial-entry-world.mjs b/test/fixtures/finite-initial-entry-world.mjs
--- a/test/fixtures/finite-initial-entry-world.mjs
+++ b/test/fixtures/finite-initial-entry-world.mjs
@@ -1,11 +1,11 @@
+import {extendFiniteOwnerQaSdk,finiteOwnerSdkWorkers,instrumentFiniteOwnerQaSdk,instrumentFiniteOwnerQaSdkLate} from './finite-owner-qa-sdk.mjs';
-import {extendFiniteOwnerQaSdk,finiteOwnerSdkWorkers,instrumentFiniteOwnerQaSdk} from './finite-owner-qa-sdk.mjs';
 import {FINITE_PREPARATION_ISSUER_SCHEMA} from '../../lib/mcp-qa-finite-preparation-issuer-store.mjs';
 import {extendFiniteOwnerPhaseContext,seedFiniteOwnerPhaseHistory} from './finite-owner-phase-context.mjs';
 import {extendPreparationCleanupFixture} from './finite-preparation-cleanup-entry.mjs';
 import assert from 'node:assert/strict';
 import {createHash} from 'node:crypto';
 import {gzipSync} from 'node:zlib';
 import {readFile,mkdtemp,rm} from 'node:fs/promises';
 import {tmpdir} from 'node:os';
 import {join,resolve} from 'node:path';
 import {build} from 'esbuild';
@@ -48,20 +48,21 @@
  for(const p of ['mcp-qa-finite-historical-source.mjs','mcp-qa-finite-bootstrap-native.mjs']){
   const s=await readFile('lib/'+p,'utf8');assert.equal(s.split(approvalDecl).length,2);sources.set(p,s.replace(approvalDecl,'CEILING='+approval));
  }
  if(mode.startsWith('phase-context-sdk-observed')){
   // Test-only error-location observation; no return/guard/authority replacement.
   const instrument=source=>source.replaceAll('catch{return pending();}',"catch(error){console.info('D02 initial failure frames',String(error?.stack??'').split('\\n').slice(1,5).join(' | '));if(/^Finite historical source unavailable:(input|custody|http|metadata|historical_slots|legacy|history|coherence|deadline)$/.test(error?.message??''))console.info('D02 historical gate',error.message);return pending();}");
   product=instrument(product);
   sources.set('mcp-qa-finite-initial-entry.mjs',instrument(sources.get('mcp-qa-finite-initial-entry.mjs')));
  }
  const plugin={name:'explicit-SYN-external-data-not-whole-facts',setup(b){
+  if(mode==='phase-context-sdk-token-late')b.onLoad({filter:/mcp-qa-finite-owner-phase-context\.mjs$/},async args=>({contents:instrumentFiniteOwnerQaSdkLate(await readFile(args.path,'utf8')),loader:'js'}));
   if(mode.startsWith('phase-context-sdk-observed'))b.onLoad({filter:/mcp-qa-finite-owner-phase-context\.mjs$/},async args=>({contents:instrumentFiniteOwnerQaSdk(await readFile(args.path,'utf8')),loader:'js'}));
   if(mode.startsWith('enrollment-pin-'))b.onLoad({filter:/mcp-qa-finite-initial-anchors\.mjs$/},async args=>{
    let contents=await readFile(args.path,'utf8');
    const needle='const compiledResidency=globalThis.__AFW_FINITE_CANDIDATE_RESIDENCY__??null;';
    assert.equal(contents.split(needle).length,2);
    const values={'enrollment-pin-absent':'null','enrollment-pin-foreign':"({...globalThis.__AFW_FINITE_CANDIDATE_RESIDENCY__,sourceRevision:'f'.repeat(40)})",'enrollment-pin-malformed':"({...globalThis.__AFW_FINITE_CANDIDATE_RESIDENCY__,module:{name:'index.mjs',sha256:'f',bytes:1}})",'enrollment-pin-accessor':"Object.defineProperty({...globalThis.__AFW_FINITE_CANDIDATE_RESIDENCY__},'module',{enumerable:true,get(){throw Error('SYN accessor executed');}})"};
    contents=contents.replace(needle,'const compiledResidency='+values[mode]+';');return {contents,loader:'js'};
   });
   if(mode.startsWith('enrollment'))b.onResolve({filter:/mcp-qa-finite-(owner-source|connection-source)\.mjs$/},()=>({path:process.cwd()+'/test/fixtures/finite-preparation-cleanup-source.mjs'}));
   b.onLoad({filter:/mcp-qa-finite-initial-material\.mjs$/},()=>({contents:product,loader:'js'}));
@@ -190,21 +191,21 @@
     if(mode==='publisher-revoked-before-send'&&role==='publisher'&&f.publisherReads>=3)result.status='disabled';
     if(mode===role+'-wrong-id')result.id='0'.repeat(32);
     if(mode===role+'-inactive')result.status='disabled';
     if(mode===role+'-expired')result.expires_on=new Date(Date.now()-1).toISOString();
     if(mode===role+'-not-before')result.not_before=new Date(Date.now()+60000).toISOString();
    }
    value={success:true,errors:[],messages:[],result};
   }
   return Response.json(value,{headers:{date:new Date(Date.now()+f.nowOffset).toUTCString(),'x-ratelimit-remaining':'60'}});
  }};
+ if(mode.startsWith('phase-context-sdk')){finalOptions=await finiteOwnerSdkWorkers(finalOptions,{observed:mode.startsWith('phase-context-sdk-observed'),token:mode.includes('-token')});f.sdkProfiles=Object.fromEntries(finalOptions.workers.map(worker=>[worker.name,{compatibilityDate:worker.compatibilityDate,compatibilityFlags:worker.compatibilityFlags}]));console.info('D02 actual Miniflare SDK profiles',JSON.stringify(f.sdkProfiles));}
- if(mode.startsWith('phase-context-sdk')){finalOptions=await finiteOwnerSdkWorkers(finalOptions,{observed:mode.startsWith('phase-context-sdk-observed')});f.sdkProfiles=Object.fromEntries(finalOptions.workers.map(worker=>[worker.name,{compatibilityDate:worker.compatibilityDate,compatibilityFlags:worker.compatibilityFlags}]));console.info('D02 actual Miniflare SDK profiles',JSON.stringify(f.sdkProfiles));}
  finalOptions=convertV4MiniflareOptions(finalOptions);
  await mf.setOptions(finalOptions);
  const bindings=await mf.getBindings(mode.startsWith('phase-context-sdk')?'qa-sdk':undefined);f.stub=bindings.AFW_INDEPENDENT_CLOSURE.get(bindings.AFW_INDEPENDENT_CLOSURE.idFromName('afw-own-successor-closure-v1'));f.db=await mf.getD1Database('RELEASE_DB',mode.startsWith('phase-context-sdk')?'qa-sdk':undefined);
  if(mode.startsWith('phase-context-sdk'))console.info('D02 native identity comparison',JSON.stringify({provisionalWorker:base.name,finalWorker:'qa-sdk',original:bindings.AFW_RELEASE_EVENTS_NODE.idFromName('afw-own-event-one-occurrence-v1').toString()===x.ids.original,candidate:bindings.AFW_RELEASE_EVENTS_NODE.idFromName('afw-own-event-first-successor-v1').toString()===x.ids.candidate}));
  if(mode.startsWith('phase-context')){try{if(mode==='phase-context-init-failure')throw Error('SYN phase fixture initialization failed');await seedFiniteOwnerPhaseHistory(f.db,x,seedInitialHistory);for(const sql of FINITE_PREPARATION_ISSUER_SCHEMA)await f.db.prepare(sql).run();}catch(error){await disposeFailedInitialization();error.fixtureDisposed=true;throw error;}}else await seedInitialHistory(f.db,x);await f.stub.seed(x.rows);f.resident=resident;
  if(mode==='invalid-owned-revision')await f.db.prepare('UPDATE site_projects SET revision=0').run();
  if(mode==='wrong-owned-subject')await f.db.prepare("UPDATE site_projects SET user_id='another-owner'").run();
  f.namespace=bindings.AFW_INDEPENDENT_CLOSURE;
  f.workflow=async refs=>(await f.mf.dispatchFetch('https://synthetic.invalid/workflow',{method:'POST',body:J(refs)})).json();
  f.restart=async()=>{assert.ok(persist);await f.mf.dispose();f.mf=new Miniflare(finalOptions);const b=await f.mf.getBindings(mode.startsWith('phase-context-sdk')?'qa-sdk':undefined);if(mode.startsWith('phase-context-sdk'))f.db=await f.mf.getD1Database('RELEASE_DB','qa-sdk');f.stub=b.AFW_INDEPENDENT_CLOSURE.get(b.AFW_INDEPENDENT_CLOSURE.idFromName('afw-own-successor-closure-v1'));};
~~~

~~~diff
diff --git a/test/fixtures/finite-owner-qa-sdk.mjs b/test/fixtures/finite-owner-qa-sdk.mjs
--- a/test/fixtures/finite-owner-qa-sdk.mjs
+++ b/test/fixtures/finite-owner-qa-sdk.mjs
@@ -1,20 +1,33 @@
 import {build} from 'esbuild';
 import {createHash} from 'node:crypto';
 import {readFile} from 'node:fs/promises';
 import {finiteWranglerProfileTemplate} from '../../lib/mcp-qa-finite-profile.mjs';
 // SYN fixture composition only. Actual source/SDK/journals/Unit2a modules remain.
 export function extendFiniteOwnerQaSdk(entry,{observed=false}={}){
  const imports=`import {sealFiniteOwnerIssuerProvenanceRecord as sdkSeal,encodeFiniteOwnerIssuerProvenanceRecord as sdkEncode} from './lib/mcp-qa-finite-owner-issuer-provenance-records.mjs';\nimport {createPrivateQaFiniteOwnerOAuthReceiver} from './lib/mcp-qa-finite-owner-oauth-qa.mjs';\n`;
  let methods=`
  async fetch(request){return createPrivateQaFiniteOwnerOAuthReceiver({ctx:this.ctx,env:this.env}).fetch(request);}
  async sdkObservation(){return {queue:this.sdkQueue??null,signals:this.sdkSignals??null,leaseSignals:globalThis.__d02QaSignals??null,held:!!this.sdkRelease,probes:globalThis.__d02Probes??[],primary:this.sdkPrimary??[],rows:[...await this.ctx.storage.list({prefix:'afw.finite-owner-issuer-provenance.v1:'})],calls:this.sdkCalls??[]};}
+
+ async sdkReduceOriginal(){
+  const rows=[...await this.ctx.storage.list()],reservation=JSON.parse(rows.find(([k])=>k.startsWith('afw.finite-preparation-issuer.v1:')&&k.endsWith(':reservation'))[1]),expected=JSON.parse(rows.find(([k])=>k.startsWith('afw.finite-owner-issuer-provenance.v1:')&&k.endsWith(':grant'))[1]);
+  const identity=reservation.identity,parent=createFiniteOwnerRequestLease(new Request('https://delegated-canary.agentfriendlyweb.dev/fixture/reduction'));
+  try{
+   const store=phaseIssuerStore({ctx:this.ctx,env:this.env}),window=()=>({startedAt:Date.now(),deadline:Math.min(Date.now()+4500,identity.C1)});
+   const barrier=await store.closeFence({identity,window:window(),fenceRequestId:'22222222-2222-4222-8222-222222222222'},parent.lease);
+   const before=await this.sdkGrant(identity.grantId),observation=await store.observeGrant({identity,barrier,expectedGrant:{scopes:expected.scopes,createdAt:expected.createdAt,expiresAt:expected.expiresAt},window:window()},parent.lease);
+   const reduced=await store.revokeGrant({identity,barrier,observation,window:window()},parent.lease);
+   return {fence:barrier.status,activeAfterFence:before.revoked_at==='',observation:observation.status,reduction:reduced.status,row:reduced.row};
+  }finally{parent.finish();}
+ }
+ async sdkTakeLateCode(){const code=globalThis.__d03LateCode??null;delete globalThis.__d03LateCode;return code;}
  async sdkConfigure(mode='normal'){
   globalThis.__d02Probes=[];
 
   const kv=this.env.AFW_FINITE_OWNER_OAUTH_KV;this.sdkCalls=[];this.sdkMode=mode;this.sdkRelease=null;this.sdkRestore?.();
   const methods={get:kv.get,put:kv.put,delete:kv.delete,list:kv.list};this.sdkRestore=()=>{for(const key of Object.keys(methods))kv[key]=methods[key];};
   for(const key of Object.keys(methods))kv[key]=async(...args)=>{
    const call={method:key,prefix:String(args[0]).split(':')[0]};this.sdkCalls.push(call);
    if(key==='put'&&String(args[0]).startsWith('grant:'))call.actualGrantAck=[...await this.ctx.storage.list({prefix:'afw.finite-preparation-issuer.v1:'})].some(([k])=>k.endsWith(':grant:ack'));
    if(this.sdkMode==='stale'&&key==='get'&&String(args[0]).startsWith('transaction:'))return null;
    if(key==='list')throw Error('SYN prohibited SDK list');
@@ -57,39 +70,54 @@
   try{return await readPrivateQaFiniteOwnerContext({ctx:this.ctx,env:this.env,parent:parent.lease});}catch{return {status:'unavailable'};}finally{parent.finish();}
  }
 `;
  if(observed)methods=methods.replace("async fetch(request){return createPrivateQaFiniteOwnerOAuthReceiver({ctx:this.ctx,env:this.env}).fetch(request);}", "async fetch(request){this.sdkSignals={entryAborted:request.signal.aborted,abortObserved:false,settled:false,settledAborted:null};const seen=this.sdkSignals;request.signal.addEventListener('abort',()=>{seen.abortObserved=true;},{once:true});try{return await createPrivateQaFiniteOwnerOAuthReceiver({ctx:this.ctx,env:this.env}).fetch(request);}finally{seen.settled=true;seen.settledAborted=request.signal.aborted;}}");
  // Ticket fixture is external SYN approval DATA, generated through genuine store.
  // It must match a real bounded preparation cookie, never a positive source alias.
  const old="ticketHash='7'.repeat(64)",replacement="ticketHash=phaseRawSha('a'.repeat(64))";
  if(!entry.includes(old))throw Error('SYN exact phase seed changed');
  return imports+entry.replace(old,replacement).replace(' export class Initial extends FiniteClosure{',' export class Initial extends FiniteClosure{'+methods);
 }
+export async function finiteOwnerSdkWorkers(qa,{observed=false,token=false}={}){
-export async function finiteOwnerSdkWorkers(qa,{observed=false}={}){
  const mProfile=finiteWranglerProfileTemplate('canaryLive');let outgoingInstrumentations=0;
  let source=`import {forwardPrivateFiniteOwnerOAuth} from './lib/mcp-qa-finite-owner-oauth-forward.mjs';
  import {createFiniteOwnerRequestLease} from './lib/mcp-qa-finite-owner-preparation.mjs';
  export default{async fetch(request,env,ctx){const root=createFiniteOwnerRequestLease(request);try{return await forwardPrivateFiniteOwnerOAuth({request,env,ctx},root.lease);}finally{root.finish();}}};`;
+ if(token)source=`import {createDelegatedOAuthWorker} from './lib/delegated-oauth-worker.mjs';
+ import {forwardPrivateFiniteOwnerOAuth} from './lib/mcp-qa-finite-owner-oauth-forward.mjs';
+ import {createFiniteOwnerRequestLease} from './lib/mcp-qa-finite-owner-preparation.mjs';
+ const issuer='https://delegated-canary.agentfriendlyweb.dev',worker=createDelegatedOAuthWorker({issuer,resource:issuer+'/mcp'});let tokenPins=null,wrongNamespace=false;
+ export default{async fetch(request,env,ctx){
+  const path=new URL(request.url).pathname;
+  if(path==='/fixture/token-config'&&request.method==='POST'){
+   const pins=await request.json();tokenPins={AFW_OAUTH_PILOT_CLIENT_ID:pins.clientId,AFW_OAUTH_PILOT_PROJECT_ID:pins.projectId,AFW_OAUTH_PILOT_EXPIRES_AT:pins.expiresAt,ACCESS_AUD:pins.audience,ACCESS_TEAM_DOMAIN:pins.teamDomain};return new Response(null,{status:204});
+  }
+  if(path==='/fixture/token-namespace'&&request.method==='POST'){wrongNamespace=true;return new Response(null,{status:204});}
+  if(path==='/oauth/token'||path==='/mcp'){const headers=new Headers(request.headers);headers.set('Host',new URL(issuer).host);return worker.fetch(new Request(request,{headers}),{...env,...tokenPins,...(wrongNamespace?{OAUTH_KV:env.SYN_WRONG_KV}:{})},ctx);}
+  if(path!=='/authorize')return new Response(null,{status:404});
+  const root=createFiniteOwnerRequestLease(request);try{return await forwardPrivateFiniteOwnerOAuth({request,env,ctx},root.lease);}finally{root.finish();}
+ }};`;
  if(observed)source=source.replace("export default{async fetch(request,env,ctx){const root=",`let active,activeRoot,delay=0;export default{async fetch(request,env,ctx){const path=new URL(request.url).pathname;if(path==='/fixture/signal-state')return Response.json(globalThis.__d02M??{});if(path==='/fixture/abort'){active?.abort();return new Response(null,{status:204});}if(path==='/fixture/abort-root'){activeRoot?.finish();return new Response(null,{status:204});}if(path==='/fixture/elapsed'){delay=29000;return new Response(null,{status:204});}const seen=globalThis.__d02M={incomingEntryAborted:request.signal.aborted,incomingAbortObserved:false,rootAbortObserved:false};request.signal.addEventListener('abort',()=>{seen.incomingAbortObserved=true;},{once:true});const control=new AbortController();request.signal.addEventListener('abort',()=>control.abort(),{once:true});request=new Request(request,{signal:control.signal});active=control;const root=`).replace("try{return await forward", "activeRoot=root;globalThis.__d02M.rootEntryAborted=root.lease.signal.aborted;root.lease.signal.addEventListener('abort',()=>{globalThis.__d02M.rootAbortObserved=true;},{once:true});try{const elapsed=delay;delay=0;if(elapsed)await new Promise(resolve=>setTimeout(resolve,elapsed));return await forward").replace("finally{root.finish();}", "finally{root.finish();if(active===control)active=null;if(activeRoot===root)activeRoot=null;}");
  const plugins=observed?[{name:'SYN-signal-observation',setup(b){b.onLoad({filter:/mcp-qa-finite-owner-oauth-forward\.mjs$/},async args=>{
   outgoingInstrumentations++;let contents=await readFile(args.path,'utf8');const needle="const response=await Reflect.apply(fetcher,stub,[new Request(finiteOwnerOAuthTarget,{method:'POST',redirect:'manual',headers,body:bytes.length?bytes:undefined,signal:originalLease.signal})]);check();";
   if(contents.split(needle).length!==2)throw Error('SYN outgoing observation changed');
   contents=contents.replace(needle,"const outgoing=new Request(finiteOwnerOAuthTarget,{method:'POST',redirect:'manual',headers,body:bytes.length?bytes:undefined,signal:originalLease.signal});globalThis.__d02M.outgoingEntryAborted=outgoing.signal.aborted;globalThis.__d02M.outgoingAbortObserved=false;outgoing.signal.addEventListener('abort',()=>{globalThis.__d02M.outgoingAbortObserved=true;},{once:true});const response=await Reflect.apply(fetcher,stub,[outgoing]);check();");
   return {contents,loader:'js'};
  });}}]:[];
  const built=await build({plugins,stdin:{contents:source,resolveDir:process.cwd()},bundle:true,write:false,metafile:true,platform:'neutral',mainFields:['module','main'],format:'esm',target:'es2022',external:['node:*','cloudflare:*']});
  if(observed&&outgoingInstrumentations!==1)throw Error('SYN outgoing observer not installed exactly once');
  console.info('D02 fixture M compiler',JSON.stringify({bytes:built.outputFiles[0].contents.length,sha256:createHash('sha256').update(built.outputFiles[0].contents).digest('hex'),inputs:Object.keys(built.metafile.inputs).length}));
  return {...(qa.resourcePersistencePath?{resourcePersistencePath:qa.resourcePersistencePath}:{}),workers:[{...qa,name:'qa-sdk'},{
   name:'m-sdk',modules:true,script:built.outputFiles[0].text,compatibilityDate:mProfile.compatibility_date,compatibilityFlags:mProfile.compatibility_flags,
+  kvNamespaces:{OAUTH_KV:'finite-sdk-shared',...(token?{SYN_WRONG_KV:'finite-sdk-wrong'}:{})},
+  ...(token?{d1Databases:{DB:qa.d1Databases.RELEASE_DB},ratelimits:{DELEGATED_RATE_LIMITER:{namespace_id:'99123',simple:{limit:1000,period:60}}}}:{}),
+  bindings:{...(token?{AFW_DELEGATED_OAUTH_ENABLED:'true',AFW_OAUTH_REFRESH_ENABLED:'false',AFW_OAUTH_SERVICE_MODE:'window',AFW_DOSSIER_EVENTS_ENABLED:'false'}:{}),AFW_FINITE_TRIAL_VERSION:{id:'77777777-7777-4777-8777-777777777777'}},
-  kvNamespaces:{OAUTH_KV:'finite-sdk-shared'},
-  bindings:{AFW_FINITE_TRIAL_VERSION:{id:'77777777-7777-4777-8777-777777777777'}},
   durableObjects:{AFW_FINITE_TRIAL_CONTROL:{className:'Initial',scriptName:'qa-sdk',useSQLite:true,uniqueKey:'initial-c2a'}}
  }].reverse()};
 }
 export async function seedFiniteOwnerSdkClient(mf,source){
  const kv=await mf.getKVNamespace('OAUTH_KV','m-sdk');
  await kv.put('client:'+source.clientId,JSON.stringify({clientId:source.clientId,redirectUris:['https://client.example/cb'],clientName:'SYN native client',grantTypes:['authorization_code'],responseTypes:['code'],tokenEndpointAuthMethod:'none',authMethodExplicit:true,registrationDate:Math.floor(Date.now()/1000)}));
 }
 
 /** Fixed read-only observation in the same genuine request scope, used only in
  * hostile fixtures. No witness/root/source result leaves the lexical stack. */
@@ -110,10 +138,18 @@
  * No token exchange, SDK substitute, code logging or production key access. */
 export async function readSyntheticIssuedGrantProps(code,grant){
  const publicWrappingConstant=new Uint8Array([0x22,0x7e,0x26,0x86,0x8d,0xf1,0xe1,0x6d,0x80,0x70,0xea,0x17,0x97,0x5b,0x47,0xa6,0x82,0x18,0xfa,0x87,0x28,0xae,0xde,0x85,0xb5,0x1d,0x4a,0xd9,0x96,0xca,0xca,0x43]);
  const hmac=await crypto.subtle.importKey('raw',publicWrappingConstant,{name:'HMAC',hash:'SHA-256'},false,['sign']);
  const material=await crypto.subtle.sign('HMAC',hmac,new TextEncoder().encode(code));
  const wrapping=await crypto.subtle.importKey('raw',material,{name:'AES-KW'},false,['unwrapKey']);
  const key=await crypto.subtle.unwrapKey('raw',Buffer.from(grant.authCodeWrappedKey,'base64'),wrapping,{name:'AES-KW'},{name:'AES-GCM'},false,['decrypt']);
  const bytes=await crypto.subtle.decrypt({name:'AES-GCM',iv:new Uint8Array(12)},key,Buffer.from(grant.encryptedProps,'base64'));
  return JSON.parse(new TextDecoder().decode(bytes));
 }
+
+/** Test-only observation of the actual SDK Promise result, before the original
+ * await/recheck rejects a terminally reduced operation. No result substitution. */
+export function instrumentFiniteOwnerQaSdkLate(source){
+ const needle="actualPromise=retain(Promise.resolve().then(()=>{check();return call();}));position='sdk-pending';";
+ if(source.split(needle).length!==2)throw Error('SYN late observation point changed');
+ return source.replace(needle,"actualPromise=retain(Promise.resolve().then(()=>{check();return call();}).then(value=>{if(op==='sdk_complete')globalThis.__d03LateCode=new URL(value.redirectTo).searchParams.get('code');return value;}));position='sdk-pending';");
+}
~~~

~~~diff
diff --git a/test/mcp-qa-finite-owner-qa-sdk-token-compat-native.test.mjs b/test/mcp-qa-finite-owner-qa-sdk-token-compat-native.test.mjs
new file mode 100644
--- /dev/null
+++ b/test/mcp-qa-finite-owner-qa-sdk-token-compat-native.test.mjs
@@ -0,0 +1,183 @@
+import test from 'node:test';
+import assert from 'node:assert/strict';
+import {createHash} from 'node:crypto';
+import {Client,StreamableHTTPClientTransport} from '@modelcontextprotocol/client';
+import {initialEntryHarness} from './fixtures/finite-initial-entry-world.mjs';
+import {seedFiniteOwnerSdkClient,readSyntheticIssuedGrantProps} from './fixtures/finite-owner-qa-sdk.mjs';
+const PREP='__Host-afw-finite-prepare='+'a'.repeat(64);
+const plain=async p=>{const v=await p;try{return JSON.parse(JSON.stringify(v));}finally{v?.[Symbol.dispose]?.();}};
+async function world(fn,{late=false}={}){
+ const f=await initialEntryHarness('phase-context-sdk-token'+(late?'-late':''));
+ try{
+  await f.stub.configure('normal');assert.equal((await plain(f.stub.invoke(f.refs))).status,'material_recorded');await f.stub.restoreMethods();
+  f.phaseCurrent=await plain(f.stub.seedPhaseFacts('settled',null));assert.equal(f.phaseCurrent.fixtureError,undefined);
+  f.source=(await plain(f.stub.sdkReadCurrent())).source;assert.equal(f.source?.phase,'read_consent');
+  f.headers={'Cf-Access-Jwt-Assertion':await f.enrollmentToken(f.source),Cookie:PREP};
+  await seedFiniteOwnerSdkClient(f.mf,f.source);
+  f.history=await plain(f.stub.sdkGrants());f.kv=await f.mf.getKVNamespace('OAUTH_KV','m-sdk');
+  f.verifier='v'.repeat(64);f.challenge=createHash('sha256').update(f.verifier).digest('base64url');
+  const configured=await f.mf.dispatchFetch(f.source.origin+'/fixture/token-config',{method:'POST',body:JSON.stringify({clientId:f.source.clientId,projectId:f.source.project.projectId,audience:f.source.access.audience,teamDomain:f.source.access.teamDomain,expiresAt:new Date(f.source.window.expiresAt).toISOString()})});assert.equal(configured.status,204);
+  f.get=()=>f.mf.dispatchFetch(f.source.origin+'/authorize?'+new URLSearchParams({client_id:f.source.clientId,redirect_uri:'https://client.example/cb',response_type:'code',resource:f.source.resource,scope:'afw:project:read',state:'SYN-state',code_challenge:f.challenge,code_challenge_method:'S256'}),{redirect:'manual',headers:f.headers});
+  f.post=form=>f.mf.dispatchFetch(f.source.origin+'/authorize',{method:'POST',redirect:'manual',headers:{...f.headers,Origin:f.source.origin,'Content-Type':'application/x-www-form-urlencoded',Cookie:PREP+'; '+form.cookie},body:new URLSearchParams({handle:form.handle,decision:'approve',scope:'afw:project:read'})});
+  await fn(f);
+  const after=await plain(f.stub.sdkGrants());assert.equal(after.length,f.history.length+1,'only the original newly issued application grant');
+  for(const row of f.history)assert.deepEqual(after.find(r=>r.id===row.id),row,'historical grant unchanged');
+ }finally{await f.stub.sdkReleaseHeld().catch(()=>{});await f.mf.dispose();await f.cleanup();}
+}
+async function consent(f){
+ const r=await f.get();assert.equal(r.status,200);const html=await r.text(),handle=/name="handle" value="([^"]+)"/.exec(html)?.[1],cookie=r.headers.getSetCookie().map(v=>v.split(';')[0]).join('; ');assert(handle&&cookie);
+ const rows=await plain(f.stub.snapshot()),identity=JSON.parse(rows.find(([k])=>k.startsWith('afw.finite-preparation-issuer.v1:')&&k.endsWith(':reservation'))[1]).identity;
+ assert.equal(await plain(f.stub.sdkGrant(identity.grantId)),null);
+ return {handle,cookie,identity};
+}
+async function issued(f){
+ const form=await consent(f),r=await f.post(form);assert.equal(r.status,302);
+ const code=new URL(r.headers.get('Location')).searchParams.get('code');assert.equal(typeof code,'string');
+ const [subject,id]=code.split(':'),key='grant:'+subject+':'+id,grant=await f.kv.get(key,{type:'json'});
+ assert(grant);const props=await readSyntheticIssuedGrantProps(code,grant);
+ assert.deepEqual(props,{applicationGrantId:form.identity.grantId,userId:form.identity.subject,projectId:form.identity.projectId});
+ const app=await plain(f.stub.sdkGrant(form.identity.grantId));assert.equal(app.revoked_at,'');
+ return {form,code,key,grant,props,app};
+}
+async function exchange(f,x,patch={}){
+ return f.mf.dispatchFetch(f.source.origin+'/oauth/token',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({grant_type:'authorization_code',client_id:f.source.clientId,redirect_uri:'https://client.example/cb',resource:f.source.resource,code:x.code,code_verifier:f.verifier,...patch})});
+}
+async function readSummary(f,token){
+ const client=new Client({name:'SYN-native-D03',version:'1.0.0'},{versionNegotiation:{mode:'legacy'}});
+ try{
+  await client.connect(new StreamableHTTPClientTransport(new URL(f.source.resource),{requestInit:{headers:{Authorization:'Bearer '+token,Host:new URL(f.source.origin).host}},fetch:(url,options)=>f.mf.dispatchFetch(String(url),options)}));
+  const tools=await client.listTools();assert.deepEqual(tools.tools.map(t=>t.name).sort(),['read_project_summary','read_saved_evidence'],'events disabled');
+  return await client.callTool({name:'read_project_summary',arguments:{}});
+ }finally{await client.close();}
+}
+test('valid actual QA code exchanges through actual M bounded response and actual MCP original permission',()=>world(async f=>{
+ const x=await issued(f),r=await exchange(f,x);assert.equal(r.status,200);const payload=await r.json();
+ assert.equal(typeof payload.access_token,'string');assert.equal(payload.token_type.toLowerCase(),'bearer');assert.equal(Object.hasOwn(payload,'refresh_token'),false);
+ assert(payload.expires_in>0&&payload.expires_in<=300);assert(payload.expires_in<=Math.floor((Date.parse(x.app.expires_at)-Date.now())/1000)+1);
+ assert.equal(r.headers.get('Cache-Control'),'no-store');
+ const summary=await readSummary(f,payload.access_token);assert.equal(summary.isError,undefined);assert.equal(summary.structuredContent.data.id,x.app.project_id);
+ assert.notEqual(await plain(f.stub.sdkGrant(x.app.id)).then(v=>v.exchanged_at),'');
+ for(const path of ['/oauth/register','/connections','/authorize/ordinary']){const closed=await f.mf.dispatchFetch(f.source.origin+path);assert.equal(closed.status,404);await closed.body?.cancel();}
+ console.info('D03 valid bounded exchange',JSON.stringify({expiresIn:payload.expires_in,refresh:false,originalProject:true,events:false,profiles:f.sdkProfiles}));
+}));
+
+/** Explicit SYN SDK-format corruption of this QA-issued code's own encrypted
+ * grant; same SDK family, native KV and original application UUID. No issuer,
+ * token response or callback is replaced. The key stays transient in memory. */
+async function corruptProps(f,x,change){
+ const wrappingConstant=new Uint8Array([0x22,0x7e,0x26,0x86,0x8d,0xf1,0xe1,0x6d,0x80,0x70,0xea,0x17,0x97,0x5b,0x47,0xa6,0x82,0x18,0xfa,0x87,0x28,0xae,0xde,0x85,0xb5,0x1d,0x4a,0xd9,0x96,0xca,0xca,0x43]);
+ const hmac=await crypto.subtle.importKey('raw',wrappingConstant,{name:'HMAC',hash:'SHA-256'},false,['sign']);
+ const material=await crypto.subtle.sign('HMAC',hmac,new TextEncoder().encode(x.code));
+ const wrapping=await crypto.subtle.importKey('raw',material,{name:'AES-KW'},false,['unwrapKey']);
+ const key=await crypto.subtle.unwrapKey('raw',Buffer.from(x.grant.authCodeWrappedKey,'base64'),wrapping,{name:'AES-KW'},{name:'AES-GCM'},false,['encrypt','decrypt']);
+ const props={...x.props};change(props);
+ const encrypted=await crypto.subtle.encrypt({name:'AES-GCM',iv:new Uint8Array(12)},key,new TextEncoder().encode(JSON.stringify(props)));
+ await f.kv.put(x.key,JSON.stringify({...x.grant,encryptedProps:Buffer.from(encrypted).toString('base64')}));
+}
+
+/** SYN negative identity in the ACTUAL SDK code grammar. Preserve this family's
+ * SDK id and original app UUID; rewrap its actual key for the changed code.
+ * This is a corrupted negative fixture, never QA's positive issuance. */
+async function corruptSdkSubject(f,x){
+ const constant=new Uint8Array([0x22,0x7e,0x26,0x86,0x8d,0xf1,0xe1,0x6d,0x80,0x70,0xea,0x17,0x97,0x5b,0x47,0xa6,0x82,0x18,0xfa,0x87,0x28,0xae,0xde,0x85,0xb5,0x1d,0x4a,0xd9,0x96,0xca,0xca,0x43]);
+ const hmac=await crypto.subtle.importKey('raw',constant,{name:'HMAC',hash:'SHA-256'},false,['sign']);
+ const derive=async code=>crypto.subtle.importKey('raw',await crypto.subtle.sign('HMAC',hmac,new TextEncoder().encode(code)),{name:'AES-KW'},false,['wrapKey','unwrapKey']);
+ const originalWrapping=await derive(x.code),key=await crypto.subtle.unwrapKey('raw',Buffer.from(x.grant.authCodeWrappedKey,'base64'),originalWrapping,{name:'AES-KW'},{name:'AES-GCM'},true,['encrypt','decrypt']);
+ const [,id,secret]=x.code.split(':'),subject='SYN-foreign',code=subject+':'+id+':'+secret,newWrapping=await derive(code);
+ const props={...x.props,userId:subject},encrypted=await crypto.subtle.encrypt({name:'AES-GCM',iv:new Uint8Array(12)},key,new TextEncoder().encode(JSON.stringify(props)));
+ const grant={...x.grant,userId:subject,authCodeId:createHash('sha256').update(code).digest('hex'),authCodeWrappedKey:Buffer.from(await crypto.subtle.wrapKey('raw',key,newWrapping,{name:'AES-KW'})).toString('base64'),encryptedProps:Buffer.from(encrypted).toString('base64')};
+ assert.deepEqual(await readSyntheticIssuedGrantProps(code,grant),props,'actual SDK key/props format remains valid');
+ await f.kv.delete(x.key);const newKey='grant:'+subject+':'+id;await f.kv.put(newKey,JSON.stringify(grant));
+ x.code=code;x.key=newKey;x.grant=grant;
+}
+
+async function rawMcp(f,token){
+ const r=await f.mf.dispatchFetch(f.source.resource,{method:'POST',headers:{Authorization:'Bearer '+token,'Content-Type':'application/json',Accept:'application/json, text/event-stream',Host:new URL(f.source.origin).host},body:JSON.stringify({jsonrpc:'2.0',id:1,method:'tools/call',params:{name:'read_project_summary',arguments:{}}})});
+ const body=await r.text();let result;try{result=JSON.parse(body);}catch{/* Actual M human failure page has no JSON result. */}
+ return {status:r.status,result,mediaType:r.headers.get('Content-Type'),format:/^data:/m.test(body)?'sse':result?'json':'other'};
+}
+for(const field of ['userId','projectId'])for(const kind of ['missing','wrong'])test('SYN SDK-format '+kind+' redundant '+field+' denies actual token exchange',()=>world(async f=>{
+ const x=await issued(f);await corruptProps(f,x,props=>{if(kind==='missing')delete props[field];else props[field]='SYN-foreign';});
+ const r=await exchange(f,x),tokenStatus=r.status;
+ if(r.ok){
+  const payload=await r.json(),mcp=await rawMcp(f,payload.access_token);
+  console.info('D03 redundant tuple causal RED',JSON.stringify({field,kind,tokenStatus,mcpStatus:mcp.status,mcpCode:mcp.result?.result?.structuredContent?.code??null}));
+ }else{const error=await r.json();assert.equal(error.error,'invalid_grant');}
+ assert.equal(tokenStatus,400,'exact redundant tuple must deny before consumeExchange');
+ const app=await plain(f.stub.sdkGrant(x.app.id));assert.equal(app.exchanged_at,'');
+}));
+
+async function deniedExchange(f,x,patch={},expected){
+ const r=await exchange(f,x,patch),status=r.status;let error;
+ const body=await r.text();try{error=JSON.parse(body).error;}catch{/* Keep the actual non-JSON denial status. */}
+ assert([400,401,503].includes(status),'actual OAuth route must deny');if(expected)assert.equal(error,expected);
+ console.info('D03 denial stage',JSON.stringify({case:f.negative,tokenStatus:status,oauthError:error}));
+ return error;
+}
+for(const fault of ['pkce','client','resource','namespace','missing-app','wrong-app','sdk-subject','owner','native-project','granted-scope','requested-scope','consumed-exchange'])test('actual original QA code negative '+fault,()=>world(async f=>{
+ const x=await issued(f);f.negative=fault;
+ let patch={};
+ if(fault==='pkce')patch={code_verifier:'wrong'.repeat(16)};
+ if(fault==='client')patch={client_id:'SYN-other-client'};
+ if(fault==='resource')patch={resource:'https://foreign.example/mcp'};
+ if(fault==='namespace'){
+  const r=await f.mf.dispatchFetch(f.source.origin+'/fixture/token-namespace',{method:'POST'});assert.equal(r.status,204);
+ }
+ if(fault==='missing-app'||fault==='wrong-app')await corruptProps(f,x,p=>{if(fault==='missing-app')delete p.applicationGrantId;else p.applicationGrantId='eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee';});
+ if(fault==='sdk-subject')await corruptSdkSubject(f,x);
+ if(fault==='owner')await f.db.prepare('UPDATE site_projects SET user_id=? WHERE id=?').bind('SYN-foreign',x.app.project_id).run();
+ if(fault==='native-project')await f.db.prepare('UPDATE delegated_access_grants SET project_id=? WHERE id=?').bind('SYN-foreign',x.app.id).run();
+ if(fault==='granted-scope')await f.kv.put(x.key,JSON.stringify({...x.grant,scope:['afw:project:read','afw:evidence:read']}));
+ if(fault==='requested-scope')patch={scope:'afw:evidence:read'}; // SDK downscopes a mixed request to read; evidence-only is genuinely outside this grant.
+ if(fault==='consumed-exchange')await f.db.prepare('UPDATE delegated_access_grants SET exchanged_at=? WHERE id=?').bind(new Date().toISOString(),x.app.id).run();
+ await deniedExchange(f,x,patch);
+ const row=await plain(f.stub.sdkGrant(x.app.id));assert.equal(row.revoked_at,'');if(fault!=='consumed-exchange')assert.equal(row.exchanged_at,'','denial did not consume original application exchange');
+}));
+test('real code reuse denies without a second application grant; SDK family behavior is separate',()=>world(async f=>{
+ const x=await issued(f),first=await exchange(f,x);assert.equal(first.status,200);const payload=await first.json();
+ assert.equal((await readSummary(f,payload.access_token)).isError,undefined);
+ const before=await plain(f.stub.sdkGrant(x.app.id));f.negative='code-reuse';await deniedExchange(f,x);
+ assert.deepEqual(await plain(f.stub.sdkGrant(x.app.id)),before);
+ const after=await rawMcp(f,payload.access_token);console.info('D03 actual vendor reuse family',JSON.stringify({mcpStatus:after.status,code:after.result?.result?.structuredContent?.code??null,originalApplicationUnchanged:true}));
+}));
+for(const reduction of ['revoke','expire'])test('actual original '+reduction+' before token denies actual callback',()=>world(async f=>{
+ const x=await issued(f);f.negative=reduction;
+ if(reduction==='revoke'){const r=await plain(f.stub.sdkReduceOriginal());assert.equal(r.fence,'fenced');assert.equal(r.activeAfterFence,true,'fence alone did not revoke the active row');assert.equal(r.reduction,'revoked');}
+ else await f.db.prepare('UPDATE delegated_access_grants SET expires_at=? WHERE id=?').bind(new Date(Date.now()-1000).toISOString(),x.app.id).run();
+ await deniedExchange(f,x,{},'invalid_grant');
+ assert.equal((await plain(f.stub.sdkGrant(x.app.id))).exchanged_at,'');
+}));
+for(const reduction of ['revoke','expire'])test('otherwise valid actual token loses actual MCP permission after original '+reduction,()=>world(async f=>{
+ const x=await issued(f),r=await exchange(f,x);assert.equal(r.status,200);const payload=await r.json();
+ assert.equal((await readSummary(f,payload.access_token)).isError,undefined);
+ if(reduction==='revoke'){const reduced=await plain(f.stub.sdkReduceOriginal());assert.equal(reduced.fence,'fenced');assert.equal(reduced.activeAfterFence,true);assert.equal(reduced.reduction,'revoked');}
+ else await f.db.prepare('UPDATE delegated_access_grants SET expires_at=? WHERE id=?').bind(new Date(Date.now()-1000).toISOString(),x.app.id).run();
+ const carrier=await rawMcp(f,payload.access_token);assert.equal(carrier.status,200,'SDK cryptography still accepted; permission is checked separately');
+ console.info('D03 actual permission carrier',JSON.stringify({reduction,http:carrier.status,mediaType:carrier.mediaType,format:carrier.format}));
+ const denied=await readSummary(f,payload.access_token);assert.equal(denied.isError,true);assert.equal(denied.structuredContent.code,'delegated_access_denied');assert.equal(denied.structuredContent.data,undefined);
+ console.info('D03 actual permission reduction',JSON.stringify({reduction,code:denied.structuredContent.code}));
+}));
+test('held actual SDK completion settles late after original terminal fence and real grant reduction',{timeout:45000},()=>world(async f=>{
+ const form=await consent(f);await f.stub.sdkConfigure('hold-put');const pending=f.post(form);
+ let held=false;for(let n=0;n<1000;n++){const s=await plain(f.stub.sdkObservation());if(s.held){held=true;assert(s.rows.some(([k])=>k.endsWith('sdk_complete:send')));assert(!s.rows.some(([k])=>k.endsWith('sdk_complete:observed')));break;}await new Promise(r=>setTimeout(r,20));}
+ assert.equal(held,true);const app=await plain(f.stub.sdkGrant(form.identity.grantId));assert(app);assert.equal(app.revoked_at,'');
+ const reduced=await plain(f.stub.sdkReduceOriginal());assert.equal(reduced.activeAfterFence,true);assert.equal(reduced.fence,'fenced');assert.equal(reduced.reduction,'revoked');
+ await f.stub.sdkReleaseHeld();const response=await pending;assert.equal(response.status,503);await response.body?.cancel();
+ let code;for(let n=0;n<100;n++){code=await f.stub.sdkTakeLateCode();if(code)break;await new Promise(r=>setTimeout(r,20));}
+ assert.equal(typeof code,'string','observe only actual SDK complete result, transiently');
+ f.negative='late-completion-after-terminal-reduction';await deniedExchange(f,{code},{},'invalid_grant');
+ const after=await plain(f.stub.sdkObservation());assert(!after.rows.some(([k])=>k.endsWith('sdk_complete:observed')));
+ assert.notEqual((await plain(f.stub.sdkGrant(app.id))).revoked_at,'');
+ console.info('D03 late completion',JSON.stringify({actualSdkSettled:true,applicationRevoked:true,tokenDenied:true,physicalKvDrain:'not-proven'}));
+},{late:true}));
+
+test('SYN reduction of original issued expiry clamps actual token response below SDK default',()=>world(async f=>{
+ const x=await issued(f),expiresAt=new Date(Date.now()+90000).toISOString();
+ // Labelled timestamp reduction on this original already-issued native row.
+ await f.db.prepare('UPDATE delegated_access_grants SET expires_at=? WHERE id=?').bind(expiresAt,x.app.id).run();
+ const r=await exchange(f,x);assert.equal(r.status,200);const payload=await r.json();
+ assert(payload.expires_in>0&&payload.expires_in<=90);assert.equal(Object.hasOwn(payload,'refresh_token'),false);
+ assert(payload.expires_in<=Math.floor((Date.parse(expiresAt)-Date.now())/1000)+1);
+ assert.equal((await readSummary(f,payload.access_token)).isError,undefined);
+ console.info('D03 reduced original expiry bound',JSON.stringify({expiresIn:payload.expires_in,refresh:false,actualClock:true}));
+}));
~~~

