# Finite Owner SDK Trust Boundary Implementation Plan — D0.3 source ACTIVE with bounded conditional tuple hardening

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans task-by-task. Root preserves the standing one-product-writer method. This plan is DESIGN ONLY; source work begins only after root accepts D0 and dispatches a task. Original issuer/notice A/B remain inactive until integrated.

**Goal:** Replace unprovable M SDK reports with actual SDK validation/completion in the existing QA issuer, using one expressly reviewed QA alias to existing M OAuth KV.

**Architecture:** QA owns actual SDK objects, original Unit2a store and same-lease consumption/grant witness. M forwards only the original bounded request; no read-grant/sdk-completed report API exists. The source profile gains a precise QA namespace access delta; actual binding/public mount/cleanup remain separate operational gates.

**Tech Stack:** JavaScript ESM, actual @cloudflare/workers-oauth-provider1.2.1, existing native workerd/Miniflare DO/D1/KV, GitHub Actions. No added dependencies, secret or namespace.

**Spec:** [2026-11-04-finite-owner-sdk-trust-boundary.md](../specs/2026-11-04-finite-owner-sdk-trust-boundary.md)

## Global constraints

- Product inspection BASE220b5bc323315b7f107967548fb8958c0f8234f2; root supplies accepted phase-context implementation BASE for execution. Do not follow the advancing product writer.
- ONE proposed QA binding: AFW_FINITE_OWNER_OAUTH_KV→existing6b94ff702e504e14a7730cee73a0f6ff; this is namespace-wide QA read/write access. No exclusive-holder/per-key-ACL claim.
- M physical bindings unchanged; revised qaLive adds one alias; historical qaClosed/c570, M2607 and QA_CLOUD_CLOSED_PINS unchanged. No old/new profile fallback or accepted flag/date change.
- Original capsule/material/bootstrap must bind revised Q BEFORE the one reserved Entry. No retrofitting a sealed occurrence, replacement Entry or clock reset.
- Original I0/C0/C1, technicalI0+300000, parent<=30s, child<=5s, commandBy-510000, nominal/launch clocks preserved. Untrusted metadata may narrow; not authenticate/widen.
- Actual SDK and original fence/consumption witnesses stay lexical in QA. No result DTO/registration/callback attestation or ordinary unfenced granting fallback.
- All current app observations use a new first-primary session with SELECT first and the original reserved UUID. No owner/client scans, SDK list/sweep/purge/client registration.
- No product public/private mount, provider publication, binding installation, credentials, API-token reuse, remote DDL, browser, local clone/build/tests or other-project action.
- Source ceiling2026-11-03T02:59:00Z expired. Fixture-only ceiling substitution is disclosed SYN evidence; SQLite clock remains native.
- operationalReadiness=false; completePackage=false; PCoff=false.

## Review focus

- Another binding holder can send identical public metadata; QA must call the real SDK and never trust a report.
- A fully valid bearer request replay before first success is indistinguishable: at most one original grant, real SDK execution, no claimed human-presence check.
- KV propagation/late writes can make a valid transaction/code unavailable; never retry SDK operations or renew the original deadline.
- New QA alias broadens all QA code's potential OAuth access; exact profile/capsule linkage and holder changes must fail closed.
- QA-issued SDK code must traverse actual M tokenExchangeCallback/boundedTokenResponse, including denial after original grant revocation/expiry.

All are assigned explicit tests below.

---

## Task D0.1 — Exact source access contract and original binding lineage

Independently rejectable deliverable: source profile declares exactly the proposed alias and exact QA/M metadata comparison proves its identity. No SDK dispatch or actual binding action.

**Modify:**
- lib/mcp-qa-finite-profile.mjs — qaLive public template + Wrangler config add one fixed alias.
- wrangler.independent-closure-qa.finite.jsonc — same kv_namespaces entry.
- test/mcp-qa-finite-profile.test.mjs and test/mcp-qa-finite-profile-native.test.mjs — exact changed qaLive and unchanged historical roles.
- test/mcp-qa-finite-bootstrap-native.test.mjs / test/mcp-qa-finite-bootstrap-compiler.test.mjs — revised source/profile expectations only where fixtures require exact new alias.

**Create:**
- lib/mcp-qa-finite-owner-sdk-binding-facts.mjs
- test/mcp-qa-finite-owner-sdk-binding-facts.test.mjs

**Consumed existing functions:** finitePublicProfileTemplate, finiteWranglerProfileTemplate, projectFinitePublicConfiguration, finitePublicStaticExpectation, readFiniteQaBootstrapPublication; original material/capsule codecs. No new factory for provider reads.

**Produced signature:**

```js
qualifyFiniteOwnerSdkBindingFacts({qaMetadata,mMetadata})
// frozen {alias:'AFW_FINITE_OWNER_OAUTH_KV',
// namespaceId:'6b94ff702e504e14a7730cee73a0f6ff',bindingHash}
// Strict bounded DATA only; no permission/lease/SDK/env object.
```

Metadata means full qualified role configuration DATA, not caller success flags. Require exactly one QA alias of type kv_namespace and exactly one M OAUTH_KV of the same pinned namespace; reject wrong type, duplicated names, missing fields, accessor/prototype/symbol data and additional OAuth alias. bindingHash hashes canonical {alias,namespaceId} using domain afw.finite-owner-sdk-binding.v1; profile commitments separately bind whole configurations.

- [ ] **Step 1 — Record the accepted root scope.** Verify source branch/head, exact phase-context dependency status and D0 design acceptance. Explicitly record NEW QA namespace access and no operational authorization. Confirm branch lease before source edits.
- [ ] **Step 2 — Write exact-profile RED.** Existing template lacks alias, so revised expected qaLive/binding helper assertions fail causally. Tests require unchanged canaryLive binding set, unchanged qaClosed pins and matching checked-in config.
- [ ] **Step 3 — Run cloud RED.** `node --test test/mcp-qa-finite-owner-sdk-binding-facts.test.mjs test/mcp-qa-finite-profile.test.mjs`. Missing infrastructure/dependency is not an accepted RED.
- [ ] **Step 4 — Implement exact template/config/helper changes.** No new profile role, arbitrary namespace, fallback validator or config override. Keep original QA flags and SDK1.2.1 pin.
- [ ] **Step 5 — Add linkage regressions.** With actual codecs, revised material.qaBootstrap.record.qaLive.publicStatic.bindingsHash changes materialHash and capsule commitment. A capsule/source from old Q cannot qualify against revised actual metadata. capsule.bindingsHash still identifies M only. Missing/wrong alias, coherently changed QA namespace with unchanged M, extra alias and same-shaped fake profile deny. No rewriting historical bootstrap records/tags.
- [ ] **Step 6 — Cloud GREEN and source compiler.** Run D0.1 tests plus existing initial capsule/material/bootstrap/profile tests affected by exact expectations. Use established compileFiniteNativeStaging gate once at exact head; preserve2MiB M/3MiB QA limits and capture changed qaLive source/profile hash. Its public mount remains absent; no runtime alias availability claim.
- [ ] **Step 7 — CAS checkpoint and root review.** Evidence identifies the one new access contract and unchanged historical/M bindings. Root can reject the access delta independently of later SDK code.

No necessary production changes to bootstrap-record/native/publication or capsule schema are expected: their current exact profile/material commitments carry this delta. Tests must demonstrate that; if a consumer hardcodes old counts or wrongly conflates capsule M hash with QA, report exact failure and review the smallest fixed-role correction. Do not loosen those contracts.

## Task D0.2 — Actual SDK + original issuer in one QA invocation

Starts only after D0.1 and the accepted first-phase reader. This replaces the old inactive Task A wire protocol; notice SQL remains a later task.

**Create:**
- lib/mcp-qa-finite-owner-oauth-forward.mjs — M fixed forwarding only.
- lib/mcp-qa-finite-owner-oauth-wire.mjs — strict one-path original-request grammar.
- lib/mcp-qa-finite-owner-oauth-qa.mjs — unmounted QA receiver, real SDK/env capture, independent original verifier, actual Unit2a sequence and local result records.
- lib/mcp-qa-finite-owner-issuer-provenance-records.mjs and lib/mcp-qa-finite-owner-issuer-provenance-journal.mjs — bounded original journal (not present at inspection; implement only the revised local semantics).
- lib/mcp-qa-finite-owner-approved-ticket-facts.mjs — pure shared ticket/preconnection/approval predicates if still absent.
- test/mcp-qa-finite-owner-qa-sdk-native.test.mjs
- test/fixtures/finite-owner-qa-sdk.mjs

**Modify only after first-phase dependency acceptance:**
- lib/mcp-qa-finite-owner-phase-context.mjs — invoke qualifyFiniteOwnerSdkBindingFacts inside its private primary observation on actual QA metadata/qualified M configuration at both repeated observations; alias holder checks and actual local SDK journal inventory. Preserve public DTO shape; no credential/capability export.
- lib/mcp-qa-finite-owner-preparation.mjs — pure approved-ticket predicate extraction, preserving existing unavailable source/linkers and GET-only private continuation.
- test/fixtures/finite-initial-entry-world.mjs — minimal reuse of genuine source/journal APIs and isolated test entry; no ready DTO or positive source alias.

Do not edit production Worker/DO entrypoints, pending-only bridge/receiver, ordinary delegated-oauth-worker/store, Unit2a store/fence schema, actual cleanup alarm or provider writer. The separate full mounting gate later replaces finite authorization fallback; this task's product routes remain closed.

**Interfaces:**
- forwardPrivateFiniteOwnerOAuth({request,env,ctx},originalLease) -> Promise<Response>.
- createPrivateQaFiniteOwnerOAuthReceiver({ctx,env}) -> frozen {fetch(request):Promise<Response>}.
- handlePrivateQaFiniteOwnerOAuth({request,env,ctx},originalLease) -> Promise<Response>, called only lexically in QA receiver.
- Existing actual source reader, original issuer journal/store and retained child/request helpers are consumed unchanged.
- All result records use seal/encode/decodeFiniteOwnerIssuerProvenanceRecord(kind,input) and createFiniteOwnerIssuerProvenanceJournal({ctx,env}); durable journal methods take DATA, not a caller result proof.

**Local record contract:** retain original Root, SdkSend and ExpectedGrant fields from the prior spec. Replace SdkAck(report) with SdkObserved {purpose,sendHash,resultHash,observedAt,outcome:'resolved',recordHash}, keyed <sdk operation>:observed. Fixed domain afw.finite-owner-sdk-observed.v1; strict canonical own data<=16384bytes. Only private QA code after awaiting its captured actual SDK Promise creates these records. No HTTP/RPC method accepts them. SdkSend is an intended call, not proof of dispatch; SdkObserved reports that exact local call's result, not global KV propagation/token visibility/drain. Same original bounds/maximum8 records before notices; unknown/extra/orphan/wrong operation denies. SDK operation duplicates never invoke SDK again, including a restart with an unresolved SEND.

- [ ] **Step 1 — Write local-result/wire RED.** Strict native path /_finite-owner/authorize only, original GET/POST /authorize, body<=16384, private metadata overwrite, fixed origin and exact allowed query/form/header shapes. Former sdk-begin/sdk-approve/read-grant/sdk-complete/sdk-completed/report payloads deny before I/O. Source helper absence/behavior is causal RED.
- [ ] **Step 2 — Write native real-code RED.** Two actual native workers use one shared synthetic KV namespace: M.OAUTH_KV and QA.AFW_FINITE_OWNER_OAUTH_KV map to that same fixture namespace; QA uses original native DO/RELEASE_DB. Invoke actual SDK1.2.1, actual original source/record/store functions. Existing native fixtures' source substitutions are not a valid positive source. Label only external Access/provider/custody/material/ceiling test inputs SYN. Seed client registry only in isolated fixture, never invoke product registration.
- [ ] **Step 3 — Run cloud RED.** `node --test test/mcp-qa-finite-owner-qa-sdk-native.test.mjs`. Native test must actually enter the intended source path and fail for missing QA SDK/issuer behavior, not because assertions read prefilled grants.
- [ ] **Step 4 — Implement lexical QA SDK holder capture.** Capture actual env.AFW_FINITE_OWNER_OAUTH_KV and get/put/delete/list functions, actor/storage/version/DB/retention holders, exact source metadata mapping; check before/after every application-controlled await. The SDK's own internal KV awaits are not newly fenced or cancellable; retain its whole actual promise and preserve opaque late-write uncertainty. Construct only fixed OAuthAuthorizationServer options and minimal SDK env {OAUTH_KV:capturedAlias}. No callbacks/SDK/env supplied over transport and no public SDK server.fetch in QA.
- [ ] **Step 5 — Implement one-invocation GET.** Actual SDK parse/describe/begin with durable original claim; original Unit2a reservation/open/authorization+ACK/readback/link before form. No returned success on failed source/consent/current owner/SDK/journal/SQL. No repeat begin after unknown ACK.
- [ ] **Step 6 — Implement one-invocation POST.** Actual original owner/form/ticket checks→one-use local approve claim→actual SDK approve→ExpectedGrant→same-store/same-child genuine consume/grant→actual grant/link→actual SDK complete/revokeExistingGrants:false→local result/response. Original scopes/props exact. Every SQL current observation fresh SELECT-first; no new grant ID, ordinary store fallback or SDK result supplied by M.
- [ ] **Step 7 — Implement M forwarder/QA receiver fixture only.** One native request/response; no six-path result protocol. Use original bounded bytes, signal and accepted clipped lifetime. Preserve actual SDK Set-Cookie/redirect transiently in bounded response after original guards; no log/durable code. No product fetch mount or readiness switch.
- [ ] **Step 8 — Run focused native GREEN with all causal cases below.** Retain failed earlier heads and actual run/job/attempt/commands/counts. No fixture authority replacement or reinterpretation of complete bearer replay as a denial.

Required cases:
1. **Actual GET then POST:** real SDK transaction in shared KV, exact original authorization hash/reserved app UUID, actual returned consumption witness, one app grant and actual SDK grant/code with original props. Assert complete called only after actual app grant ACK.
2. **Forged old result path, before first success:** same mVersionId/requestId/body/source metadata and valid owner identity at /read-grant or /sdk-completed yields unavailable and no SDK/journal/D1 effect. These paths must not exist.
3. **Real approve held:** hold actual KV read/delete used by QA SDK. Inject fabricated result fields/direct old path plus another request. No grant/completion until actual SDK succeeds; another request cannot borrow live request occupancy or original claim.
4. **Real complete held:** hold actual KV put; forged sdk-completed cannot append local SdkObserved, return code, advance phase or clear retained promise. After deadline eventual settlement cannot extend effects or append late ACK.
5. **Bearer limits separated:** copied public metadata/form with invalid/missing actual SDK cookie/state denies. Byte-identical full valid owner+SDK credentials racing first submission may win, but must invoke real SDK and yield at most one original consume/grant/complete. Assert this limit explicitly, no human-presence or M-identity claim.
6. **Replay/restart:** durable SEND/unknown ACK followed by new request/recreated actor cannot resume SDK work or reconstruct Unit2a witness. Already completed replay creates zero additional grant/code and cannot revoke the winner.
7. **Original lifetime:** elapsed29s leaves<=1s, native abort, C0/consent/grant/owner expiry, method/holder drift and retained body/cancel/SDK promises; no child/parent renewal, no first-primary reuse claim. SQL real execution time rejects queued stale writes.
8. **KV consistency:** simulate exact native call returning miss/error/stale transaction to actual SDK; no substitute provider/source/approval. Unavailable outcome creates no new attempt. Duplicate KV-visible transaction still cannot duplicate D1 grant. A missing acknowledged code on M is not repaired/reissued.
9. **Original mapping:** wrong QA alias namespace, missing binding, same-shaped holder replacement, changed actual QA/M profile or old capsule denies before SDK/app writes. Test extra alias/other same-account binding input does not imply trust.
10. **History preservation:** no SDK list/purge/createClient, no other grant/token mutation, original historical D1 rows unchanged. Local resolved SDK result distinguishes result from global KV visibility.

- [ ] **Step 9 — Scoped regressions and exact source graph.** Run new native suite plus affected original issuer, context, conduit/retention and setup-facts pending suites. Scoped lint. The unmounted component fixture's compiled graph is recorded separately; standard product bundle still lacks a positive mount. Exact final mounted SDK graph/QA3MiB budget must be qualified later at full mount gate, not inferred from test compilation.
- [ ] **Step 10 — CAS source checkpoint and root review.** Rewrite prior Task A spec/interface on accepted branch to selected QA-local design, remove report endpoints, record exact access proposal and retained limits. This is source acceptance only; A/B activation/integration is root's decision.

## Task D0.3 — Actual M token callback compatibility (source-only)

Can be reviewed independently after D0.2. No token/credential operation against a real namespace.

**Create:** test/mcp-qa-finite-owner-qa-sdk-token-compat-native.test.mjs. **Modify:** test/fixtures/finite-owner-qa-sdk.mjs. Reuse actual delegated-oauth-worker.mjs token endpoint/callback/boundedTokenResponse and actual SDK; no new token implementation.

**Consumes:** QA actual code/props/grant from D0.2, shared synthetic native KV/D1. **Produces:** exact real-code compatibility evidence and denial cases, not a runtime access token.

- [ ] Add compatibility qualification using QA-issued code and actual M /oauth/token request with original client/redirect/resource/S256 verifier. Since D0.2 is already accepted, valid exchange should pass; do not manufacture implementation RED. Pin wrong namespace/props/PKCE and revocation controls to demonstrate actual callback/permission causality.
- [ ] Compose the actual M token-only handler in the isolated fixture. Do not expose ordinary authorization paths as finite fallback; assert /authorize invokes only D0.2 forwarding or stays pending, never ordinary createGrant.
- [ ] Run `node --test test/mcp-qa-finite-owner-qa-sdk-token-compat-native.test.mjs`. Correct namespace/props→one valid exchange/bounded TTL; wrong namespace/client/resource/project/owner/props/PKCE, consumed exchange, original revoked/expired grant deny. Hold SDK completion, apply actual original terminal fence/grant reduction via existing component, settle late then require actual exchange/read denial. No Worker restoration claim.
- [ ] Verify actual subsequent MCP permission check denies revoked/expired original grant even if opaque KV data survives. No refresh grant, client registration, SDK grant scan or second app permission.
- [ ] Record actual-vs-SYN evidence and root review. Shared native fixture proves API compatibility, not cross-location production consistency/SLA.

## Deferred operational gate (not a source task or execution authorization)

Only after D0 source integration and the separate full cleanup/public mount gate: present exact reviewed QA version/configuration plus new alias access request, qualified original M namespace mapping, retained full no-alias QA baseline and owned-pointer rollback. Authorization must name account/QA/version/namespace/action; no new namespace/secret/data write by that access request. A revised bootstrap and original material/capsule must be generated only for the single still-unconsumed occurrence; an old sealed Q tuple cannot be repinned.

After separately authorized alias publication, verify exact metadata/readback without reading KV contents or creating probe keys. SDK access/functionality is proved in synthetic native tests; live owner SDK operation remains part of its own consent/mount gate. Rollback removes only the QA binding reference by restoring the approved exact baseline and verifying independent metadata; never delete OAuth KV namespace/keys or M's binding. Unknown in-flight SDK writes remain uncertainty after reference removal.

No source tests green result grants this operational authorization, renews expired source ceiling or closes PC-off. Keep original issuer/notice A/B inactive until root accepts D0 and explicitly integrates their replacement.


## Root source-design self-review clarifications (continuation)

Root selects option2 as a technical architecture choice under the owner's delegated direction; the owner did not separately choose this comparison. This selects a SOURCE proposal, not a real new KV grant. D0.1/D0.2/D0.3 remain unassigned until the current factual task and earlier selected pure conversion task close. Exact later BASE will be supplied; inspected220b5bc is not a moving execution pin.

- Metadata role clarity: mMetadata means the COMPLETE independently qualified ORIGINAL/CURRENT M PREPARATION configuration (closed_ui/read_consent, later exact notices), not the full private canaryLive projection. The binding DATA helper must not run the full canaryLive projector on that preparation shape, infer a phase from flags or try validators until one passes. Its narrow fact is unique QAalias/MOAUTH_KV identity equality; the fixed QA source already owns full phase/original/profile qualification. qaMetadata is complete actual QA configuration with its exact qaLive commitment. Add pure positives for original closed and current read_consent M inputs with the same namespace, plus swapped-role/wrong-ID denials.
- Early SDK uncertainty is separate: if actual beginConsent KV work is held/unknown before Unit2a reservation/Identity exists, no existing terminal issuer fence may be claimed for that missing identity. Add an actual held-begin case: no form/authorization/app grant without real completion+ACK, late result past original deadline cannot start reservation/grant work or append expired ACK, promise retained through settlement. This source task must preserve uncertainty; it does not broaden the opaque-SDK restoration ruling. Complete cleanup must separately prove its early-prefix barrier/settlement condition before any restoration claim.
- D0.3 qualifies existing behavior after D0.2 and changes tests only. Its valid exchange is expected to PASS once the prerequisite works; do not manufacture a RED or claim new implementation failure. Wrong-namespace/props/PKCE/revocation controls and actual late-completion denial are meaningful causality. D0.2 owns issuance tests, D0.3 alone creates the token-compatibility test file. No duplicate coverage-only full reruns.
- Reuse the eventually accepted factual-reader fixture and its guarded initialization. Do not copy old220b5bc missing ordinary schema, rename/drop historical grant tables or patch production SQL time. The actual fixture-only expired-ceiling substitution remains explicitly SYN and cannot prove runtime/source eligibility.

Root preflight: the original M→QA SDK report dependency is removed by lexical QA execution, not 'authenticated' by serializable metadata. Separate alias access/profile lineage, real local issuer behavior and token compatibility remain independently rejectable tasks. No unresolved dependency is silently renamed complete. Full mount/provider-publication/cleanup/PCoff stays separate.


## Root D0.3 SOURCE activation — 5 November 2026

This containing commit accepts D0.2 source at report d630a99d8bd30bbeaa5606a89dbd33ee58ce8b72 after independent Pass/Approved review and activates only D0.3. Exact execution BASE supplied by root. Earlier ACTIVE/INACTIVE headers are dated history. Brief docs/superpowers/briefs/2026-11-05-finite-owner-sdk-trust-boundary-d03.md and preflight define the precise conditional scope amendment: valid existing exchange first, and ONLY if genuine negative proves missing redundant props checks, two privilege-reducing equality guards in existing M token callback before consumeExchange. No other production behavior, permission, SDK callback injection, schema, clock or mount changes. Live I/O feasibility remains unaccredited; audit proposals not activated.
