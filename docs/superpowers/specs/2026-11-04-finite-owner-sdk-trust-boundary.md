# Finite owner SDK trust boundary — concrete D0 design

4 November 2026. DESIGN ONLY. Proposed replacement for the cross-fetch SDK-attestation sketch in [fenced issuer/notice](2026-11-04-finite-fenced-owner-issuer-notice.md). That plan's A/B remain INACTIVE until root accepts and integrates this D0 design. No source, test/build, binding, credential, namespace, provider, browser, DDL or Entry action is authorized/performed here.

PROJECT AFW; REPOSITORY tokenizartinfo-ops/agent-friendly-web; ENVIRONMENT GitHub docs; ORIGIN delegated-canary.agentfriendlyweb.dev not contacted; RESOURCE_TYPE docs branch; RESOURCE_ID docs/finite-fenced-owner-issuer-notice-20261104; ALLOWED_ACTION pinned source/official documentation reads and three docs via expected-head CAS; ROLLBACK revert this docs commit. Product BASE220b5bc323315b7f107967548fb8958c0f8234f2; no advancing product branch.

## Decision

**Recommend option2: execute actual SDK begin/approve/complete in the existing fixed QA actor, beside original Unit2a issuance.** M forwards the owner's request and relays the bounded response; it supplies no SDK-result claims. QA independently verifies owner/source/form and calls the actual SDK itself. No authenticated M attestation is necessary for SDK-result provenance.

This is feasible in source with ONE additional QA KV binding alias to M's existing OAuth namespace. It is a new namespace-wide QA read/write capability, not a cosmetic refactor and not permission to install it. Root has expressed preference for this option conditional on these precise changes and proofs. No new key, secret, namespace, Worker, actor or controller is required by the selected design.

## Grounded comparison

| | Option1: SDK stays in M, signed result | Option2: actual SDK runs in QA (selected) |
| --- | --- | --- |
| Enforceable mechanism | Dedicated ECDSA P-256 signing key held only by reviewed M issuer code; QA verifies against exact public key, original request/operation tuple and durable one-use nonce. Signing occurs only after actual SDK result. | QA calls SDK helpers over native KV and keeps returned objects lexical; no endpoint accepts approvedRequestHash/completionHash as evidence. |
| New access/custody | New M secret binding AFW_FINITE_OWNER_ISSUER_SIGNING_KEY, independently approved generation/load/revocation custody; QA public key pinned in source. No reuse of API tokens or existing event secrets. | One QA binding AFW_FINITE_OWNER_OAUTH_KV to existing namespace6b94ff702e504e14a7730cee73a0f6ff. New broad QA OAuth-state access; no new secret/namespace. |
| Durable correlation | Original actor journal nonce per fixed operation, original A/root/request/SDK handle hash, result hash, expected grant hash, original source/M version and clipped deadline signed in a domain-separated envelope. Signature plus freshness/one-use/current owner/fence required. | Original actor journal records actual local intended call and local result. SDK approval object and Unit2a consumption witness never cross fetch, store instance or lease boundaries. |
| Replay limit | Copied unsigned metadata cannot forge a result. A copied genuine signature proves that the trusted signer observed the result, not that its process is still alive. First replay of an unused valid signed operation may perform the same original action once. | Copied result messages are rejected. Every valid owner POST runs actual QA SDK validation; whole valid bearer request replay can race, with at most one original fenced grant. No claim to distinguish identical first submissions. |
| Main cost | New secret lifecycle, signature canonicalization, exact signing-code/key custody assumption, extra cross-fetch state and partial ACKs. M's physical SDK settlement remains remote from QA. | QA bundle/import footprint and expanded access to existing OAuth KV; shared-KV consistency/latency can return unavailable/uncertain. SDK and D1 ordering are in one invocation. |
| Old invariants changed | M physical binding set/initial upload's physical-binding rule, key custody and rollback need a new reviewed exception; QA verifier profile/source changes. | qaLive binding set/publicStatic/bootstrap provenance changes; M physical binding set and historical qaClosed stay unchanged. |

Option1 is implementable cryptography, not a platform caller-ID claim. Cloudflare supports ECDSA sign/verify/importKey and Worker secret bindings ([Web Crypto](https://developers.cloudflare.com/workers/runtime-apis/web-crypto/), [secrets](https://developers.cloudflare.com/workers/configuration/secrets/)). Its trust is the dedicated key's controlled holders and fixed signer code; a signature cannot attest an exclusive deployed version by itself. No unauthenticated signing endpoint, runtime key registry, generic callback or key provision is proposed. It is the alternative only if the owner rejects new QA namespace access; it is not implemented alongside option2.

Option2 removes the provenance hop and keeps actual SDK/app permission ordering together. It has the smaller protocol, though its KV access footprint is broader. It requires the explicit access gate below rather than pretending current bindings suffice.

## Exact SDK1.2.1 feasibility and limits

Pinned package.json uses @cloudflare/workers-oauth-provider1.2.1. Official [ProviderEnv](https://github.com/cloudflare/workers-oauth-provider/blob/v1.2.1/src/oauth-provider.ts#L118) requires OAUTH_KV; [OAuthAuthorizationServer.getOAuthApi](https://github.com/cloudflare/workers-oauth-provider/blob/v1.2.1/src/oauth-provider.ts#L1784) is explicitly for custom code outside fetch dispatch. It creates helpers, not a public route. No ExecutionContext or M WorkerEntrypoint is required for those helper calls.

QA constructs lexically:

```js
import { OAuthAuthorizationServer } from '@cloudflare/workers-oauth-provider';
new OAuthAuthorizationServer({
 issuer: 'https://delegated-canary.agentfriendlyweb.dev',
 resources: ['https://delegated-canary.agentfriendlyweb.dev/mcp'],
 scopesSupported: ['afw:project:read','afw:evidence:read'],
 accessTokenTTL: 300,
 clientIdMetadataDocumentEnabled: false
}).getOAuthApi(Object.freeze({OAUTH_KV: capturedQaAlias}));
```

The minimal SDK env maps the actual captured native QA binding to the SDK's required property. It is not a fake KV implementation, a DB-holder substitution or a transported authority DTO. QA never calls this server's fetch, createClient, purgeExpiredData, refresh or revoke-all APIs. No QA token endpoint or callback is added.

[parseAuthRequest/getClient](https://github.com/cloudflare/workers-oauth-provider/blob/v1.2.1/src/oauth-provider.ts#L6437) use the existing client registry in that KV with CIMD disabled; original fixed client/redirect/resource/S256/scopes are independently pinned by QA. No client scan/registration. [beginConsent/approveConsent](https://github.com/cloudflare/workers-oauth-provider/blob/v1.2.1/src/oauth-consent.ts#L189) create encrypted transaction state and validate handle-derived cookie/KV state; approve gets/deletes the transaction, which is not an atomic one-use store. The original D1 consume/fence remains the application one-use authority.

[completeAuthorization](https://github.com/cloudflare/workers-oauth-provider/blob/v1.2.1/src/oauth-provider.ts#L6540) validates the actual approved request, creates its own SDK grant/code and encrypts props in KV. Force revokeExistingGrants:false; never list/sweep other SDK grants. App props remain exactly {applicationGrantId:originalReservedUuid,userId:originalOwner,projectId:originalProject}, metadata:{}, original approved scope. QA returns the actual result only after the guarded promise resolves and its local outcome journal ACK is durable; secrets/code/cookies remain transient.

Cloudflare documents native [KV access from Durable Objects](https://developers.cloudflare.com/durable-objects/examples/use-kv-from-durable-objects/). This establishes platform feasibility, not current alias availability or exact compiled bundle qualification. [KV is eventually consistent](https://developers.cloudflare.com/kv/concepts/how-kv-works/); a new transaction/client/code may be unavailable at another location, including M's later exchange. Use actual errors/absence and retain uncertainty; no automatic begin/approve/complete retries, extra grace, code reissue or assumed propagation SLA.

Pinned fixtures must be described accurately: test/fixtures/delegated-oauth-runtime.mjs exercises real SDK but uses Node SQLite and a Map KV; test/dossier-monitoring-oauth-native.test.mjs uses native workerd/D1/KV but seeds its application grant and substitutes a notice-link observer; test/delegated-capsule-preparation-oauth-native.test.mjs injects a token validator. None proves this proposed QA lexical full issuance. New two-end native SDK/KV/D1 tests are required.

## Exact access delta and revised invariants

Source identities, not an instruction to mutate them:

- Account85d0d5dadac3341a564f22ce885e9eec.
- Existing M agent-friendly-web-delegated-canary has OAUTH_KV →6b94ff702e504e14a7730cee73a0f6ff.
- Existing QA agent-friendly-web-independent-closure-qa currently has NO OAuth KV binding.
- Proposed qaLive metadata adds exactly {name:'AFW_FINITE_OWNER_OAUTH_KV',type:'kv_namespace',namespace_id:'6b94ff702e504e14a7730cee73a0f6ff'}.
- Proposed finite QA Wrangler config adds exactly kv_namespaces:[{binding:'AFW_FINITE_OWNER_OAUTH_KV',id:'6b94ff702e504e14a7730cee73a0f6ff'}].
- Same IndependentClosure actor afw-own-successor-closure-v1 and namespace070c4a7708eb4592a3ded7c117a88225. Same RELEASE_DB6a728254-1494-4039-802e-b39288a55fcc. No new namespace, DB, DDL, route, Workflow, schedule, secret or flag.

The binding grants the QA Worker code access to the namespace, not only the chosen actor or keys. Other QA exports receive its environment, so lexical restrictions and whole changed-graph review matter. Do not claim per-key provider ACLs, exclusive KV access or no other same-account holders. M and any previously authorized holders may continue to exist. QA's source deliberately uses only exact original client/transaction/grant operations; the actual binding capability remains broader.

The old phrase 'bindings unchanged' is amended narrowly: **M physical bindings unchanged; qaLive adds this one reviewed alias before the reserved occurrence; qaClosed/historical pins unchanged.** The initial M upload physical comparison in lib/mcp-qa-finite-initial-upload-wire.mjs requires no new exception for option2. Existing accepted compatibility date/flags remain as pinned, no old-or-new profile fallback.

Source/template/provenance consequences:

1. Modify lib/mcp-qa-finite-profile.mjs qaLive template and config, and wrangler.independent-closure-qa.finite.jsonc together. Exact profile count/hash changes; canaryLive template and wrangler.mcp-own.finite.jsonc binding set unchanged. Keep QA_CLOUD_CLOSED_PINS/c570 and M2607 immutable.
2. scripts/build-finite-native-package.mjs already verifies checked-in config equals template and computes exact publicStatic per role. Rebuild at actual changed head; new QA source bytes/import graph/profile bindingsHash belong to that head. Keep2MiB M/3MiB QA limits and no common/M→QA decoder edge.
3. lib/mcp-qa-finite-bootstrap-publication.mjs and bootstrap-record.mjs already derive exact qaLive publicStatic from the profile. A future revised bootstrap must bind the revised QA module+binding footprint to a new exact QA version/deployment and source head. Old bootstrap records must not be edited/relabelled; no version/hash fallback or automatic reuse of a prior tag.
4. Original material embeds qaBootstrap; original capsule commits materialHash and qaVersionId. Capsule.bindingsHash is the M commitment, NOT a QA alias hash. No capsule schema relaxation/new field is needed: require the embedded qaBootstrap.publicStatic.bindingsHash and actual fresh QA metadata to match the revised exact profile, plus normal capsule→material→bootstrap linkage. A capsule created against prior Q cannot be used after adding the alias.
5. The alias/candidate QA publication and matching bootstrap must be separately approved and established BEFORE the single original Entry/material/capsule is consumed. Never retrofit a sealed occurrence, mint a second Entry or restart I0/C0/C1. If a capsule already exists for the old QA tuple, source denies and this plan supplies no replacement authority.
6. Add native alias holder capture/rechecks to the new QA SDK module; compare the actual metadata alias ID to original M's OAUTH_KV ID through the QA-only factual source module. The runtime KV object has no assumed introspectable namespace ID; native holder identity plus qualified provider metadata establish mapping under platform trust. Invoke qualifyFiniteOwnerSdkBindingFacts inside the QA phase source's private primary observation while its actual QA metadata and qualified M configuration are lexical, on both normal repeated observations. Do not add binding credentials or an authority-bearing result to the public source DTO; the exact profile and original bootstrap lineage already commit the mapping.
7. Existing API read/publish custody probes prove only their existing identities/expiries; they do not prove this KV capability grant. Add an explicit access-review receipt in documentation recording approved QA alias→existing namespace, exact reviewed artifact/configuration, retained baseline and rollback. No API token is repurposed, expanded or claimed to be the SDK credential.

## New fixed callgraph: reports disappear

Create these unmounted internal modules; do not mount the default Worker/DO or enable private POST in this unit:

```js
// M: no SDK, grant selector or result input.
forwardPrivateFiniteOwnerOAuth({request,env,ctx}, originalLease)
// Promise<Response>; fixed original GET/POST /authorize only.

// QA: actual native holders, lexical verifier/source/SDK/store.
createPrivateQaFiniteOwnerOAuthReceiver({ctx,env})
// frozen {fetch(request): Promise<Response>}

handlePrivateQaFiniteOwnerOAuth({request,env,ctx}, originalLease)
// Promise<Response>; private QA module called only by the receiver/test fixture.

// Pure DATA equality, no capability.
qualifyFiniteOwnerSdkBindingFacts({qaMetadata,mMetadata})
// frozen {alias:'AFW_FINITE_OWNER_OAUTH_KV',namespaceId,bindingHash}, or throw.
```

Files: lib/mcp-qa-finite-owner-oauth-forward.mjs, lib/mcp-qa-finite-owner-oauth-qa.mjs, lib/mcp-qa-finite-owner-oauth-wire.mjs, lib/mcp-qa-finite-owner-sdk-binding-facts.mjs. The QA SDK/issuer implementation uses existing original context/approved-ticket predicates and original Unit2a store. No generic registry, caller-supplied verifier/SDK/source callback or generic dispatch.

Only native internal path /_finite-owner/authorize is proposed. The wire contains the original bounded UTF-8 form bytes, original allowed URL/method and the accepted narrow lifetime metadata; it has no SDK payload, approval hash, completion hash, grantId, phase or success boolean. Unknown internal paths, especially sdk-approve/read-grant/sdk-completed, return unavailable before effects. Original issuer/resource are fixed; reconstruct the SDK Request at the canonical public /authorize URL, not the private native URL. Duplicate/malformed URL/form/cookie fields, excess bytes and query on POST deny.

M is untrusted for SDK/permission facts. QA verifies Access signature/expiry against the original source realm, original prep ticket/CSRF/source/owner/revision and actual SDK transaction cookie/state. Original URL/Origin text and correlation/version headers are consistency checks, not caller authentication. The native Request.signal and accepted duration clipping still apply. Start QA's genuine local lease before I/O, clip to sender remaining/deadline and own30s maximum then original source/identity bounds; received metadata can shorten but never widen the local/source window. It does not authenticate when M began. A copied/new request cannot resume a previously claimed original SDK operation or reset its durable one-use deadline.

GET in ONE QA invocation:
1. Verify original read_consent context, original approval/enrollment/owner and current exact client registry, canonical redirect/resource/S256/requested scopes.
2. Durably claim the original begin attempt before actual SDK beginConsent, retaining its whole KV promise. Actual SDK handle/cookie remain lexical; persist only exact handle hash and bounded outcome.
3. Original Unit2a reservation(server UUID)→OPEN fence→authorization INSERT→actual ACK/fresh primary→AuthorizationLink. No form before these actual results. GET form uses QA's actual transaction headers/handle, bounded HTML and no raw issuer journal.
4. Any uncertain send/ACK/SDK write returns pending; no new begin or UUID. Routes remain unmounted in production.

POST in ONE QA invocation:
1. Read bounded exact form once. Independently verify original owner/form, unconsumed consent and reserved identity. Atomically claim the original approve operation so concurrent/restart requests cannot rerun it; actual KV delete remains non-atomic.
2. Call actual api.approveConsent(request,handle,{scope}) with no remember. Returned approved.request never leaves QA before use. Independently compare fixed client/resource/redirect/PKCE/scope subset to original consent.
3. Persist exact ExpectedGrant; original consumeAuthorization→insertReadGrant on SAME actual Unit2a store instance/SAME child lease/genuine unused consumption witness. The<=5s child includes necessary intermediate journal work. SQL uses actual native time and the original OPEN fence/owner/revision/expiry predicates. Never reconstruct a witness after a row read.
4. Actual grant ACK/current original UUID→GrantLink/connection pair preserving genuine new-link ACK rule→local complete SEND→actual completeAuthorization with original props and revokeExistingGrants:false.
5. Only actual resolved SDK result creates local SdkObserved record; it is never accepted as a request payload. Preserve local async retention to settlement; late result cannot write expired ACK, expose code or continue. Response relays actual bounded cookies/redirect only when original guard remains valid. Lost response/ACK never reissues a code.

The previously proposed six cross-fetch SDK paths and SdkAck(reported) prerequisite protocol are removed from the selected design. Use the bounded journal's Root/SdkSend/ExpectedGrant shape if reviewed, but replace externally accepted reports with QA-local SdkObserved outcome records keyed by original operation. There is NO method appendSdkObserved(payloadFromM) or recovery that resumes an SDK call from its SEND. This replaces D0, not the original Unit2a fence.

Checks around SDK calls guard application-controlled awaits, not every internal SDK KV await. The unmodified SDK may continue internal KV work after timeout; no claim of cancellation or physical drain follows from a lease, D1 fence or local result. Original app-grant SQL stays behind the actual Unit2a fence. Retain the real SDK promise and apply the existing opaque-uncertainty ruling to late results.

Pure source reads remain unavailable on unresolved SDK/issuer SEND. The executing QA invocation may privately recheck its own exact local operation/journal delta and current source facts; no cross-invocation closure claim remains. Provider publication own-SEND continuation is still a different future task.

## M token exchange compatibility

The original public issuer, resource, existing client record, SDK version and KV namespace are unchanged. QA's completed SDK grant/code uses the same format that M's actual SDK reads. In lib/delegated-oauth-worker.mjs tokenExchangeCallback still reads props.applicationGrantId, checks original subject/client/resource/project/scopes/status/expiry and consumes exchange; boundedTokenResponse and MCP permission checks remain in force. QA does not emulate those callbacks or invent another token endpoint.

Required native compatibility proof calls the actual M token endpoint/callback and bounded response code using a QA-issued code under synthetic test credentials. Confirm correct props, exact original application grant, zero refresh and denial after original grant revocation/expiry/fence cleanup. A QA SDK completion with a wrong namespace/props must fail the actual M exchange. KV propagation errors are unavailable/uncertain, never permission to issue a second grant/code.

The future finite M route selector must intercept authorization/monitoring preparation before ordinary granting code and fail closed on missing QA alias/source/receiver. It must never call ordinary createConsent/consumeConsent/createGrant/revokeGrant catch as fallback. This design does not yet implement that public mount; isolated fixture can compose actual token-only dispatch without enabling ordinary authorization paths.

## Hostile inputs and bearer replay limit

- Copied mVersionId/requestId/body with fabricated SDK result fields or direct read-grant/sdk-completed paths cannot issue a grant or authoritative completion record. Those protocols do not exist.
- Valid owner identity with invalid/missing SDK transaction cookie/handle/KV state denies before consume/grant. Hold actual QA approveConsent; a concurrent forged result or alternate request cannot bypass the held operation. Hold completeAuthorization KV write; forged completion cannot settle it or clear uncertainty.
- A different native binding holder can submit requests; no exclusive holder is assumed. QA still performs the same original owner/source/SDK checks and one-use D1 ordering. Public metadata copying alone grants nothing.
- **Complete bearer replay limitation:** if someone possesses a byte-identical valid owner Access assertion, prep/SDK cookies and approved form, the first such submission cannot be distinguished from the original human submission without an additional channel/transaction authentication mechanism. Option2 intentionally does not assert M identity. It may cause actual QA SDK approval and at most one original fenced app grant. Test this case explicitly; require real SDK execution, no second grant/complete, same original identity/window and no false physical-settlement claim. Do not label it 'zero effect' or human-presence proof. Credentials remain protected by the original transport/browser/custody assumptions.
- Existing QA alias access adds another OAuth-state writer; reviewed QA code and authorized account administration are trusted. An arbitrary actor already able to alter native bindings/KV/provider code lies outside the untrusted-request proof. No claim of account-wide exclusive writers.

## Separate operational access/rollback gate

Additional access is precise and reviewable: authorize adding only AFW_FINITE_OWNER_OAUTH_KV on the exact new reviewed qaLive version to namespace6b94ff702e504e14a7730cee73a0f6ff, in account85d0d5dadac3341a564f22ce885e9eec, without modifying namespace data, M bindings or credentials. A future operator must verify current resource/configuration, access owner, exact artifact/profile/hash, full no-alias baseline and recovery material; obtain the applicable explicit operational authorization for that version/configuration. This document performs none of that.

Prefer reversible source-only/closed candidate qualification first. Any later alias publication must have exact before/after metadata and an owned-pointer rollback to the retained closed QA configuration without this alias. Removing the alias removes only QA's reference; NEVER delete the KV namespace, clients, transaction/grant/token keys or prior M access. Retain legitimate later activity. Binding removal/rollback does not prove previously issued native KV operations settled; retain their exact uncertainty and existing original cleanup constraints.

The finite occurrence cannot start until this revised source/access/bootstrap contract and the separate full mount/cleanup gate are accepted. No old sealed capsule can be upgraded to it; no second Entry/window is authorized. Historical pins, accepted flags, original I0/C0/C1, technicalI0+300000, commandBy-510000, nominal/launch clocks remain. Source ceiling2026-11-03T02:59:00Z remains expired. Conditional SDK uncertainty ruling unchanged; deployment writer unknown forbids restore. operationalReadiness=false; completePackage=false; PCoff=false.


## Root source-design self-review clarifications (continuation)

Root selects option2 as a technical architecture choice under the owner's delegated direction; the owner did not separately choose this comparison. This selects a SOURCE proposal, not a real new KV grant. D0.1/D0.2/D0.3 remain unassigned until the current factual task and earlier selected pure conversion task close. Exact later BASE will be supplied; inspected220b5bc is not a moving execution pin.

- Metadata role clarity: mMetadata means the COMPLETE independently qualified ORIGINAL/CURRENT M PREPARATION configuration (closed_ui/read_consent, later exact notices), not the full private canaryLive projection. The binding DATA helper must not run the full canaryLive projector on that preparation shape, infer a phase from flags or try validators until one passes. Its narrow fact is unique QAalias/MOAUTH_KV identity equality; the fixed QA source already owns full phase/original/profile qualification. qaMetadata is complete actual QA configuration with its exact qaLive commitment. Add pure positives for original closed and current read_consent M inputs with the same namespace, plus swapped-role/wrong-ID denials.
- Early SDK uncertainty is separate: if actual beginConsent KV work is held/unknown before Unit2a reservation/Identity exists, no existing terminal issuer fence may be claimed for that missing identity. Add an actual held-begin case: no form/authorization/app grant without real completion+ACK, late result past original deadline cannot start reservation/grant work or append expired ACK, promise retained through settlement. This source task must preserve uncertainty; it does not broaden the opaque-SDK restoration ruling. Complete cleanup must separately prove its early-prefix barrier/settlement condition before any restoration claim.
- D0.3 qualifies existing behavior after D0.2 and changes tests only. Its valid exchange is expected to PASS once the prerequisite works; do not manufacture a RED or claim new implementation failure. Wrong-namespace/props/PKCE/revocation controls and actual late-completion denial are meaningful causality. D0.2 owns issuance tests, D0.3 alone creates the token-compatibility test file. No duplicate coverage-only full reruns.
- Reuse the eventually accepted factual-reader fixture and its guarded initialization. Do not copy old220b5bc missing ordinary schema, rename/drop historical grant tables or patch production SQL time. The actual fixture-only expired-ceiling substitution remains explicitly SYN and cannot prove runtime/source eligibility.

Root preflight: the original M→QA SDK report dependency is removed by lexical QA execution, not 'authenticated' by serializable metadata. Separate alias access/profile lineage, real local issuer behavior and token compatibility remain independently rejectable tasks. No unresolved dependency is silently renamed complete. Full mount/provider-publication/cleanup/PCoff stays separate.


Public SDK import feasibility was verified against v1.2.1 package entrypoint (package.json3–6), tsdown ESM entry3–8, exported class1727–1752 and instancegetOAuthApi1784–1786; AFW already imports the named class in delegated-oauth-worker:1 and lockfile822–826 pins1.2.1. Use instance method, not differently shaped standalone getOAuthApi export. This is source/API evidence, not a new build/native qualification.
