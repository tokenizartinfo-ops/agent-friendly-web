# Finite fenced owner issuer and notice provenance

4 November 2026. DESIGN ONLY. ROOT TRUST REVIEW REVISION: Task A INACTIVE; Task B consequently INACTIVE. Product inspection fixed at `220b5bc323315b7f107967548fb8958c0f8234f2`; the first-phase context implementation is a dependency, not evidence of existing code.

## Boundary and selected next unit

PROJECT AFW; REPOSITORY tokenizartinfo-ops/agent-friendly-web (1347578006); ENVIRONMENT GitHub source/docs; ORIGIN delegated-canary.agentfriendlyweb.dev, not contacted; RESOURCE_TYPE documentation branch; RESOURCE_ID docs/finite-fenced-owner-issuer-notice-20261104; ALLOWED_ACTION pinned source reads and docs-only CAS commit; ROLLBACK revert this docs commit. No clone, local build/tests, provider/runtime/browser/token/OTP/DDL/Entry or other-project operation.

Read [preparatory composition report](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/b60f8328df195307df62610968055b84ea766043/docs/superpowers/reports/2026-11-04-preparatory-native-composition-design.md) first. Accepted Unit2a fence and incoming-signal/C1/C2/C3 work remain intact.

**Proposed SOURCE task A — INACTIVE:** fixed, unmounted SDK1.2.1/native M→QA issuance composition. The proposed wire cannot establish actual SDK-call provenance at QA. Dependency D0 must first supply a reviewed concrete enforcement mechanism or independently authorized QA owner-consent design. A green two-end fixture or accepted first-phase reader does not close D0. Unit2a remains unchanged.

**Subsequent independently rejectable SOURCE task B:** fixed fenced notice ticket/grant/withdrawal SQL, original journal correlation and exact notice_consent factual context. It consumes task A; no fabricated grant can satisfy its integrated positive proof. Provider publication and the actual mount/full cleanup gate remain separate tasks. Rejecting B leaves A usable as a closed source component.

Both tasks remain inactive even after the first-phase reader is accepted. D0 is an additional design dependency, not an implementation detail the writer may fill by inference. No source permission follows from this document.

## D0 — missing authenticated native issuer boundary (not implemented)

**Finding:** no inspected mechanism makes a copied fixed-path request proof of an actual surviving M SDK invocation. `forwardFiniteOwnerChoice` captures binding/holder identity locally on M and overwrites five private headers. `finiteNativeMetadata` checks grammar, UUID shape, URL and Origin. `createFiniteOwnerNativeReceiver` checks its own QA actor/env/DB holders, creates a local request lease and returns pending; it has no caller-authentication or SDK verifier. `worker/independent-closure/finite.mjs` does not mount that receiver. The accepted source proves a closed pending transport, not an effectful issuer boundary.

The configured AFW_FINITE_TRIAL_CONTROL namespace is a native routing capability on its holder. The receiver gets an ordinary Request and no demonstrated runtime-authenticated caller Worker/version/entrypoint or invocation identity. Reviewed M being currently deployed does not prove that M sent this request or that M is the only binding holder. Header/body hashes, requestId, mVersionId, Origin text, provider pointer and journal hashes are copyable DATA. No inspected source/inventory check proves exclusive binding possession or authenticates an incoming call. Do not assume a platform capability or exclusive holder that was not demonstrated.

QA's independent checks establish different facts: Access establishes the presented owner's identity/expiry; original preparation ticket/CSRF predicates bind the submitted owner form to original A; first-primary owner/project/consent/fence reads establish current application state. Unit2a confines granting SQL to that original identity and its genuine local consumption witness. None proves SDK approveConsent ran, its transaction cookie/KV validation succeeded, or completeAuthorization settled. Owner Access is not M service identity. Preparation/configuration approval is not reclassified here into an independently complete replacement for the SDK approval contract.

**Selected resolution:** retain the original SDK-backed owner flow and keep Task A inactive. Do not silently authorize application SQL solely from the QA form. That alternative requires a separately reviewed exact QA owner-consent/CSRF contract proving every application effect independently, with SDK reports explicitly non-authoritative; it is not implemented or authorized by these docs.

D0's concrete missing boundary is QA-verifiable authentication of a call from the reviewed fixed M issuer entry, tied to the original live request and SDK-call result without trusting supplied metadata. A future design must name the exact platform primitive or already-authorized capability, locate its creation/holder/verifier, show how copied requests and another binding holder fail, and show how only the lexical SDK continuation reaches the effectful path. Caller identity alone is insufficient if that entry exposes an arbitrary payload proxy. No such primitive/verifier is identified in pinned source. This is a required unresolved proof, not a proposed authenticateCaller callback, token format, new secret, IAM/permission grant, registry or row-derived authority. Do not provision any of those by inference.

D0 authenticates a new transport boundary only. It must not mint another business admission, replace original stage consume/adoption, renew a timer/Entry, or reconstruct Unit2a consumption/barrier witnesses. Actual original grant-making SQL remains behind the original fence regardless of the eventual transport solution.

Until D0 is concretely designed and independently accepted, every proposed effectful path below remains unavailable, including sdk_approve/read-grant/sdk-completed. M may locally observe its actual retained SDK promise; QA may classify a wire outcome only as an untrusted report. Journal sync/readback proves persistence of that report, not SDK invocation, approval, physical settlement or permission. No SdkAck/report advances SQL, source phase, eligibility, cleanup or restoration. The conditional schemas/call sequences below preserve a review sketch only; their references to an actual SDK result state a requirement D0 must establish, never a fact established by wire data. Missing D0 must not consume the original occurrence to test this gap.

### Required causal hostile-call proof for D0 (not run)

Target the actual prospective receiver, not a fake verifier/direct Unit2a seam. An isolated hostile Worker/DO entry or direct receiver invocation sends the same Request bytes without entering M's SDK function. Giving that fixture a binding is an explicit SYN threat capability, not evidence of actual account-wide binding inventory.

1. With valid original source/owner/preparation/consent fixture, hold real M approveConsent before return. Send read-grant from the hostile entry with identical requestId, mVersionId, URL/form/cookies, source hashes/current pointer and fabricated approvedRequestHash. Expect denial before ExpectedGrant, consume, grant, authoritative SDK ACK or GrantLink; genuine held promise remains outstanding. Valid owner identity does not prove SDK approval.
2. Send sdk-approve with copied valid original request metadata but no actual SDK path. Expect no authoritative SDK SEND/ACK, consumption or grant. Do not silently treat an independently authenticated owner form as SDK provenance.
3. Hold actual completeAuthorization before KV settlement; forge sdk-completed with identical request/version/grant correlation. Expect no authoritative completion ACK, phase advancement or clearance of uncertainty. Receiving/persisting a hash cannot settle M's actual Promise.
4. Replay a legitimate native request from a different Worker/entry and after original M invocation termination while the wall budget remains. Expect no operation/resumed continuation. Include the pre-first-success race where forgery arrives first: duplicate suppression after success alone is not an authentication test.
5. Positive control uses the actual named enforcement primitive and lexical SDK continuation; one changed authenticated binding/entry/call-position fact denies despite byte-identical public metadata. If the interface exposes no independently verifiable distinction from cases1–4, D0 remains unresolved. No fake verifier returning true.

The existing pending receiver remains pending/denied for these inputs. That is a zero-effect baseline, not proof a future effectful receiver authenticates callers. No hostile test was run for this revision.

## Actual dependency graph at the pinned source

- `worker/mcp-own/finite.mjs` re-exports the ordinary worker default. It does not select a finite OAuth issuer.
- `lib/delegated-oauth-worker.mjs:254–292` calls actual SDK beginConsent, ordinary createConsent, approveConsent, ordinary consumeConsent/createGrant, then completeAuthorization. Preparation forwards are best effort and unavailable. Its catch revokes through the ordinary store. These cannot be positive finite paths or fallback.
- `lib/mcp-qa-finite-owner-native-bridge.mjs` forwards only choice to the fixed actor and returns pending. The native receiver validates lifetime/holders, reads bytes and returns pending. Neither is a business verifier.
- `lib/mcp-qa-finite-owner-preparation.mjs` linkers call lexical common source → unavailable; recordFinitePreparationGrant also needs an actual new GrantLink ACK before allocating the connection pair. Existing-row reconstruction cannot recreate that continuation.
- Unit2a journal/store/codec have six operations: open_fence, authorization, consume, grant, close_fence, revoke_grant. The journal accepts at most14 records. It has no SDK-operation outcome, durable expected-grant tuple or notice-ticket reservation.
- `lib/dossier-monitoring-owner-http.mjs:61–73` inserts an ordinary ticket then calls recordDossierMonitoringConsent before best-effort NoticeLink. `lib/dossier-monitoring-authority.mjs` has unique request recovery and sequence CAS but no finite issuer-fence predicate.
- Planned readPrivateQaFiniteOwnerContext at the pinned phase spec only qualifies closed_ui/read_consent. Its notice/finite positives do not exist. The stage-facts/enrollment helpers are likewise planned, not implemented evidence.

The ordinary APIs keep their separate semantics; do not add optional finite hooks to their granting branches. New fixed modules have no public entrypoint import until the separate complete cleanup gate.

## Conditional interfaces and file ownership (inactive until D0)

New task A modules:

```js
// M only; actual SDK is constructed lexically, never supplied in options.
handlePrivateFiniteOwnerAuthorization({request, env, ctx}, originalLease)
// Promise<Response>; GET /authorize and POST /authorize only, exact original origin.
// No caller source, identity, SDK result, grantId, policy or clock argument.

// QA only; imported by isolated native fixture now, actual mount later.
createPrivateFiniteOwnerIssuerReceiver({ctx, env})
// Readonly<{fetch(request): Promise<Response>}>; fixed private paths only.

// Durable bounded DATA, not authorization.
createFiniteOwnerIssuerProvenanceJournal({ctx, env})
// appendRoot(record, lease), appendSdkSend({preconnectionId,record}, lease),
// appendSdkAck({preconnectionId,operation,record}, lease),
// putExpectedGrant(record, lease), read({preconnectionId}, lease).
```

The provenance codec exports sealFiniteOwnerIssuerProvenanceRecord(kind,input), encodeFiniteOwnerIssuerProvenanceRecord(kind,input), decodeFiniteOwnerIssuerProvenanceRecord(kind,raw). journal.read returns exactly {root,sdk:{sdk_begin:{send,ack},sdk_approve:{send,ack},sdk_complete:{send,ack}},expectedGrant,noticeTickets:{grant,revoke}} with absent records null; this is bounded DATA.

Files: `lib/mcp-qa-finite-owner-sdk.mjs`, `lib/mcp-qa-finite-owner-issuer-qa.mjs`, `lib/mcp-qa-finite-owner-issuer-provenance-records.mjs`, `lib/mcp-qa-finite-owner-issuer-provenance-journal.mjs`. Pure shared ticket predicates go in `lib/mcp-qa-finite-owner-approved-ticket-facts.mjs`:

```js
qualifyFiniteOwnerApprovedTicket({
 source, preconnection, snapshot, currentTicket, projectRef,
 initialTicket, ticketUse, approval, identity, observedAt
}) // frozen DATA {preconnectionId, subjectHash, accessRealmHash}, or throw
```

Extract exact ticketContext/approved cross-record predicates; common preparation and QA issuer gather facts independently. Helper receives strict own-data only, no callback/env/lease/permission. QA invokes actual verifyCloudflareAccessJwtWithExpiry, fixed primary owner reads, actual context reader, actual preparation store and pure predicates lexically. Existing link exports and common source stub stay unavailable. QA issuer implements factual linking using the same record codecs/store methods and predicates; it never calls a common unavailable linker and catches failure as success.

New task B modules:

```js
createFinitePreparationNoticeStore({ctx, env})
// insertTicket({identity,ticket,window}, lease) -> actual applied/no_mutation row
// grantNotice({identity,ticket,window}, lease) -> actual applied/no_mutation event
// withdrawNotice({identity,ticket,window}, lease) -> actual applied/no_mutation event
// readTicket({identity,handleHash,window}, lease) -> exact primary row|null
// readEvent({identity,requestId,window}, lease) -> exact primary event|null

handlePrivateFiniteOwnerNotice({request,env,ctx}, originalLease)
// QA-local Promise<Response>; fixed GET /monitoring, POST /monitoring/grant or /monitoring/revoke.
handlePrivateFiniteOwnerMonitoring({request,env,ctx}, originalLease)
// M-local Promise<Response>; same fixed external paths, native forwarding only, no SDK calls.
```

Files: `lib/mcp-qa-finite-preparation-notice-store.mjs`, `lib/mcp-qa-finite-owner-notice-qa.mjs`. Extend only the fixed internal issuer receiver path set for notice requests. M forwards original bounded request; QA owns notice handling and RELEASE_DB. No new policy parameter or generic SQL/target/operation selector from external callers. Task A adds exact SDK-provenance inventory validation to the accepted first-phase context without adding a phase. Task B extends the accepted phase-context module to notice_consent only; finite_prearm stays unavailable.

## Original source, enrollment and live request provenance

The source envelope is exactly {source,preconnectionId,capsuleHash}; validateFiniteOwnerSource stays strict. Every invocation derives original A from original capsule, verifies exact original owner/project/revision/client/resource, current QA/M publications and immutable holders. Never recover selectors by owner/client scans or accept a second Entry. Current grant reads select ONLY the original reserved UUID. Each current observation starts a NEW captured RELEASE_DB.withSession('first-primary') whose first query is SELECT.

A first connection receipt requires genuine earlier consumeFiniteOwnerStageAdmission and same-invocation adoptFiniteOwnerRequestStageWork before enrollment/publication. These tasks neither simulate adoption from records nor create another stage admission. Their synthetic source fixture may create original setup DATA through existing APIs; label that boundary. In future actual flow the issuer begins only after that earlier genuine chain. Task A's issuer writes use the original registered request retention scope; retention mode is bookkeeping, never an authorization check.

M starts one genuine request lease before SDK/body/identity/native I/O; tests invoke the new function within that entry scope. It captures actual SDK/KV/DB/limiter/version/binding functions. All native calls use the accepted boundary encoder and original signal, exact fixed QA actor and overwritten private headers, with original URL/method/body correlation. Multiple calls in one HTTP request transmit the same startedAt/deadline and decreasing remainingMs; receiver creates its own local brand, never transports M's brand. No second30s parent. Actual SDK promises, fetch/body/cancel and SQL/storage promises are retained before any race until physical settlement. Keep original <=30s parent, <=5s children, no grace or wall-clock correction.

Original Access assertion, SDK cookies and handles may exist transiently in the exact request path; never persist/log them. QA independently validates Access, original preparation ticket/CSRF, native original request correlation and current publication. SDK transaction validation occurs only in M's lexical actual SDK call. The proposed wire does not prove this execution to QA; supplied SDK-shaped results remain untrusted despite matching correlations. D0 must establish missing enforcement before positive effects. Hashes, current M code/pointer and sender-local holder checks are not caller identity, a transported closure or authorization.

## Conditional record sketch — no SDK authority from wire reports

Add prefix `afw.finite-owner-issuer-provenance.v1:<originalA>:`. Strict canonical own-data/domain-separated SHA256; reject extras, prototypes, symbols/accessors, overlong arrays/strings; <=16384 bytes/record. Bound read to11 rows with maximum10, no scans outside original prefix. Actual journal append requires storage transaction, sync and exact readback, preserving an unknown write.

Each record has purpose, recordHash and the following payload:

| Kind/key | Payload |
| --- | --- |
| Root/root | preconnectionId, capsuleHash, enrollmentHash, sourceRevision, actorId, qaVersionId, mVersionId, originalConnectionReceiptHash, I0,C0,C1, createdAt |
| SdkSend/sdk_begin:send, sdk_approve:send, sdk_complete:send | rootHash, operation, originalRequestId, originalRequestHash, issuedAt, deadline; bindingHash (auth-request hash for begin, original authorizationHash for approve, expectedGrantHash for complete) |
| SdkAck/same operation:ack | sendHash, outcome ('reported' only), resultHash, observedAt; begin additionally authorizationHash, approve additionally approvedRequestHash. Wire-report receipt only, not SDK execution/settlement witness |
| ExpectedGrant/grant | rootHash, identityHash, reservationHash, authorizationHash, grantId, approvedRequestHash, scopes, createdAt, expiresAt |
| NoticeTicket/notice_grant_ticket or notice_revoke_ticket (task B) | rootHash, identityHash, action, handleHash, requestId, projectRevision, expectedSequence, issuedAt, expiresAt, permissionExpiresAt |

Without notice tickets task A inventory max8. Root binds original enrollment/capsule and at most one intended SDK begin attempt; it does not prove actual SDK dispatch. SdkSend is an intended-operation record, not proof that M invoked the SDK. SdkSend/ACK are immutable, at most one per operation; exact same bytes may be observed, but an existing send cannot start SDK work again. The sketch orders reported begin before approve and reported approve before complete, with original consent/ExpectedGrant/grant observations as applicable. These checks are insufficient to authorize either operation: D0 must independently establish the authentic fixed SDK continuation. Reports alone never permit the next operation. Ack times must be >=send.issuedAt and <send.deadline; no late durable ACK write after expiry. Hash canonical bounded SDK request DATA (client/redirect/resource/PKCE/scopes/state) without storing that raw payload; never persist SDK handles, cookies, codes, tokens, encrypted props or raw redirects. Root/SDK records do not mint an app grant.

NoticeTicket task B records use original application grant identity; no second issuer reservation or new grant ID. RequestId is a server UUID, handleHash SHA256 of32 random bytes encoded base64url (43 chars). The original preconnection, SDK auth hash and one reserved app UUID remain in Unit2a Identity/Reservation. ExpectedGrant makes cleanup's original expected tuple recoverable; Unit2a grant-store witnesses remain process-local.

The following INACTIVE protocol sketch has no implemented authentication mechanism. Fixed internal path selection is a restriction, not authority:

- `/_finite-owner/sdk-begin`: verify original read_consent/owner/enrollment; atomically claim Root+begin SEND. The intended sender would call beginConsent once after the response; the response does not authenticate/prove that continuation.
- `/_finite-owner/authorization`: requires genuine begin provenance under unresolved D0; matching requestId/hash and current source is insufficient; append begin ACK, reserve original SDK handle hash and one server app UUID; journal/open fence/insert authorization with actual SQL ACK/readbacks; write original AuthorizationLink. Return only bounded factual result; raw SDK form comes from M.
- `/_finite-owner/sdk-approve`: validate original POST/ticket/consent and atomically claim approve SEND before actual SDK approveConsent.
- `/_finite-owner/read-grant`: requires actual approve provenance under unresolved D0, in addition to independent owner/source/form checks; append approve ACK, persist ExpectedGrant, then consume and grant below.
- `/_finite-owner/sdk-complete`: fresh current original grant + observed grant/link and ExpectedGrant; atomically claim complete SEND before SDK completion.
- `/_finite-owner/sdk-completed`: a received completion hash is only a report; D0 must establish the actual fixed continuation before an authoritative SDK fact is considered. No durable code/redirect.
- B adds `/_finite-owner/notice-ticket`, `/_finite-owner/notice-grant`, `/_finite-owner/notice-withdraw` with original URL/method/body fixed by sender.

The private wire grammar has an enumerated shape per path and checks equality/shape of serialized request correlations; it does not prove their origin. The intended M sender overwrites private metadata, but a hostile direct receiver request can copy it. No trusted method, target, selector, deadline or success authority may be derived from those claims without D0. These paths belong to the new unmounted receiver; do not activate them on existing pending-only receiver/default Worker. A test fixture mounts only the real new unmounted modules, using a real native binding.

### Fixed issuer wire (new grammar; existing choice grammar unchanged)

The existing finiteNativeMetadata hardcodes /connections/finite-prepare; do NOT call it for /authorize or broaden it. Add `lib/mcp-qa-finite-owner-issuer-wire.mjs` exporting `readFiniteOwnerIssuerMetadata(headers,path)` (strict DATA {boundary,method,originalUrl,requestId,mVersionId}) and `decodeFiniteOwnerIssuerBody(path,bytes)` (strict DATA {originalBody,payload}). Reuse existing finiteNativeBytes/Operation/Cancel, actor/origin constants and boundary reader, preserving their limits/lifecycle. The new grammar accepts only the nine exact internal paths above, never a supplied target. Header namespace/count/2048-byte bound is identical; original URL is canonical origin plus /authorize (bounded original query only on GET), /monitoring GET, /monitoring/grant POST or /monitoring/revoke POST. No fragment, duplicate routing field or external private metadata survives.

Internal total body remains <=16384 bytes, canonical UTF-8 JSON {originalBody,payload}; originalBody is the exact original form string (strict UTF-8) or empty for GET. It is transient, not journaled. Original Content-Type/cookie/Access/Origin are preserved separately as accepted. Per-path payload keys are exact:
- sdk-begin: {authRequestHash};
- authorization: {authorizationHash};
- sdk-approve: {authorizationHash};
- read-grant: {authorizationHash,approvedRequestHash,approvedScopes};
- sdk-complete: {authorizationHash};
- sdk-completed: {authorizationHash,completionHash};
- all three notice paths: {} (all selectors derived on QA).
Hashes are SHA256 hex; scopes use original strict scope grammar. The intended M implementation populates these fields from lexical SDK results, but QA cannot prove that provenance from their values; D0 remains required. No payload has approved/ready/permission, raw code, grant selector, phase or clock.

Conditional success replies, disabled until D0, would be canonical JSON <=2048bytes, status200/no-store: claims/completed return {status:'recorded',operationHash}; authorization returns {status:'recorded',authorizationHash,grantId}; read-grant returns {status:'recorded',grantId,subject,projectId}. The intended sender validates values against its local closure, but QA cannot observe that check. Replies never authorize another request. Matching journal ACK/readback alone does not authorize a positive reply; all remain disabled until D0. All uncertainty uses existing fixed pending response and no business fields. Notice replies contain only bounded server-generated HTML/Set-Cookie for that request; never source/issuer records. No external code can request arbitrary response headers or redirect.

## Conditional issuance ordering — unavailable until D0

GET: actual api.parseAuthRequest/describeConsent validate fixed original client/resource/S256/redirect and requested scopes; exact project only, no listConsentProjects fallback. Source/SDK-begin claim precedes actual api.beginConsent. Before returning any actionable form, original begin ACK → Unit2a reservation → open_fence SEND/actual openFence/ACK → authorization SEND/actual insertAuthorization/ACK → exact fresh-primary original row → AuthorizationLink. Failure/lost native ACK returns pending and never repeats begin/reservation. Public UI remains pending in this source slice.

POST approve: preserve original bounded form bytes once; Origin, original prep cookie, actual SDK transaction cookie and approved scopes must match. SDK approveConsent(request,handle,{scope}) is real, without remember. Its KV get/delete is not atomic single-use: D1 consumption/fence is the deciding application barrier. After actual SDK approval ACK and durable ExpectedGrant, append consume SEND, call Unit2a consumeAuthorization, ACK actual returned row, append grant SEND, then call insertReadGrant with the SAME store instance, SAME actual child-lease object and genuine unused consumption result. Reserve the shared <=5s consume→grant child window before consume and include durable intermediate work within it; never manufacture a fresh child to transport the witness. Every statement checks actual SQL time and exact unfenced original identity. No row-derived witness, retry or second app UUID.

After grant ACK, first-primary exact grant/owner read and factual GrantLink + connection pair (new-link ACK rule preserved), claim complete SEND. M calls actual api.completeAuthorization exactly once with its actual approved.request, props {applicationGrantId:originalUuid,userId:originalSubject,projectId:originalProject}, original approved scopes and revokeExistingGrants:false. Merge actual approved cookie headers only after successful bounded completion. No SDK code/token path can precede actual app-grant ACK. A failure is pending; do not call ordinary revokeGrant catch or revoke a competing grant. Deny/cancel input returns bounded cancellation without grant/complete; it does not restart the reserved occurrence.

A wire SDK-completion ACK is only a received/persisted report, not SDK completion. M's actual promise may have a separately observed local result; trusted transmission of that result is precisely unresolved D0. GrantLink only proves the original app row/link, never SDK completion, owner notice or subscription. ExpectedGrant/SdkSend do not prove consent. NoticeLink never substitutes for a ticket or event reservation.

### Source recheck without recursive SEND deadlock

The general phase reader remains unavailable on unknown issuer/SDK SEND. Do not wrap it in allowPending, syntheticFacts or a copied ready DTO.

Before beginning each fixed operation, gather full context with no unresolved foreign operation. During that exact live operation use a private lexical recheck in the QA issuer module: re-read original anchors, unchanged stage inventories/pointer/configuration, owner/expiry and provenance journal; compare the journal delta to the exact send(s) this invocation actually appended and retained. It accepts only the precise local operation position, originalRequestId, ACK/readback and original guard, with no serialized continuation returned. Unknown foreign send or extra row denies. That local QA position ends with its receiving invocation and cannot prove a surviving M closure on a later fetch. Matching next request ID/hash/version or current M pointer cannot recreate it. The next native call remains unavailable until D0 supplies independently verified enforcement; journal state never recreates continuation or authorizes work.

Share only lower-level immutable DATA predicates with the phase reader; no generic resolver/authorization callback or public continuation registration. This is issuer operation bookkeeping. Provider publication own-SEND continuation is a DIFFERENT future writer task and remains unavailable here.

## Task B: notice SQL and factual source

Extend Unit2a operation enum with exactly notice_ticket, notice_grant, notice_revoke_ticket, notice_revoke. Their requestId is the original reserved ticket request UUID. Journal max becomes22 (reservation+freeze+ten send/ack pairs), read limit23; validate overflow and all new cross-bindings. Existing six record encoding, hashes, store/schema and predicates remain unchanged. Freeze forbids all four new owner operations; future cleanup withdrawal under a terminal barrier is a separate consumer, not enabled here.

Notice store uses existing fence table unchanged. Preflight exact issuer schema and existing ticket/event shapes before effects. Do not install SQL or add a generic beforeCommit option. Ticket DATA derives from actual original grant/current revision/sequence and fixed installed notices policy; it is not caller authorization.

insertTicket and grantNotice are fixed INSERT SELECT statements joining the exact unfenced original issuer row, current owned project/revision, exact original active grant and immutable consent. SQLnow must fit original child/parent/C0, consent/grant/policy/ticket expiry; use canonical ISO→epoch conversion for grant/consent. Reserve NoticeTicket before ticket SEND; each action one ticket only. Preserve existing purpose domains and ticket immutability.

grantNotice joins exact ticket hash/requestId/tuple/action='grant', uses MAX(sequence) for ONLY that grant as CAS against expectedSequence and requires no prior event for that grant. Preserve UNIQUE(grant_id,request_id); duplicate observation may return only the exact existing event, never run another insertion. Event issued_at comes from actual SQL clock, expires_at is reserved permissionExpiresAt. No grant renewal or record repair.

withdrawNotice uses a separately reserved original revoke ticket, exact existing grant event, expectedSequence CAS and no previous revoke. It creates action='revoke', issued_at=expires_at=SQLnow; preserve historical grant event. Owner/source/identity/current original tuple and unchanged C0 window still apply, but reduction must not require the application grant to remain unrevoked/unexpired or the monitoring grant event to remain unexpired. It cannot extend permission. Do not invoke a notification, subscription controller or Container.

All readTicket/readEvent current observations use new first-primary SELECT-first sessions. After event INSERT actual ACK/readback, QA writes NoticeLink for grant only using exact event hash, sequence and original GrantLink relation. Withdrawal is separately observed and makes notice eligibility unavailable; never delete/rewrite NoticeLink or synthesize a grant when absent. Actual event sequence is D1 global sequence, not assumed expectedSequence+1; test intervening foreign-grant events.

Exact notice_consent source validates two settled publication chains, original original-M baseline unchanged, actual current pointer/module/configuration, original issuer/SDK/provenance/consumed consent/grant/link/relation. The policy is canonical JSON {grantId,projectId,clientId,startAt,expiresAt}: original reserved grant; startAt equals original notices StageApproval.approvedAt; expiresAt is min(original preconnection/Access/stage approval/source C0/app grant expiry/startAt+600000). No new clock or grant duration. Only the three already-enumerated mutable preparation bindings may differ. Use finiteActivationConfigurationHash for original/candidate and qualifyFiniteConnectionProfile({phase:'notice_consent',metadata}); historical rollback hashing remains legacy by explicit role.

**No causal cycle:** installed notice_consent qualifies before any notice ticket/event, provided original grant and second publication are exact. It proves a page phase, not granted notices. Validate any present notice prefix independently. Actual notice grant event+NoticeLink is required only for eligibility for third-stage approval; withdrawal, unknown notice SEND, orphan/wrong ticket/event denies that eligibility. finite_prearm itself is still unavailable. Task B produces factual source from actual records; it does not publish stage2 or consume stage3.

## Failure, retention and later consumers

Unknown durable SEND/SQL/native ACK preserves the original identity and pending state. No resend, SDK reconstruction, new ID, widening source, ordinary-store fallback or competing-winner revocation. A late result is retained to physical settlement and never advances an expired request; the corresponding SEND remains uncertain if an ACK cannot be durably recorded within its original deadline. Cleanup may later reconcile exact original rows after its original qualified terminal barrier; these tasks do not mount that cleanup.

The conditional [SDK uncertainty ruling](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/bd99808f064fc4d02d0e41cccfb3494a59b55666/docs/superpowers/specs/2026-11-04-sdk-opaque-uncertainty-ruling.md) remains unchanged: exact frozen issuer+primary terminal fence+original grant revoked/absent+all granting SQL fenced+deployment writers settled+owned pointer/backups/custody+original C1 are all required before unresolved opaque SDK/KV alone ceases to block exact closed restore. It never proves SDK physical settlement/full completion. Any unknown deployment writer still forbids restore.

Later consumers: the provider writer consumes these actual links and the factual phase reader; it separately implements own-in-flight SEND continuation. Complete cleanup consumes ExpectedGrant, all issuer/SDK/notice inventories and original barrier/permission facts. Actual private POST/default mount waits for that entire cleanup/publication gate. Third exact CLOSED original-M prearm occurs before Selection/T0; full T0-derived setup is distinct and remains governed by the separate fd19e048 design. No early requirement for future full policies.

Original I0/C0/C1, technicalI0+300000, commandBy-510000, nominal T0-derived clocks, launch cutoff, historical2607/c570 and accepted QA/profile flags stay unchanged. Source ceiling2026-11-03T02:59:00Z is expired. operationalReadiness=false; completePackage=false; PCoff=false.

## Proof boundary

A future positive composition test must use actual SDK1.2.1 KV transactions, native M/QA binding, real journal/codec/Unit2a D1 and actual source reader, AND concrete accepted D0 enforcement. A fixture merely routing a trusted caller supplies a SYN caller-trust assumption, not hostile-caller proof. Actual SDK use in such a fixture does not authenticate copied reports. The existing finite-initial-entry-world fixture substitutes the expired source CEILING in its isolated test bundle (pinned lines35–38); reusing that fixture must disclose this source divergence explicitly and preserve unchanged production ceiling. No substituted source-reader result is permitted. Its fixture eligibility is not exact-candidate eligibility. Use current native SQL time for the mutation suite, never replace SQLite unixepoch or its expiry predicates. Pre-expiry Date-controlled source cases are a separate suite, not a combined SQL timing proof.

Explicit SYN external Access JWKS/identity, provider/custody responses, initial source/approval material and installed stage evidence are permitted fixtures. They must be disclosed; no live owner consent/runtime proof. Do not replace SDK, issuer/source reader, private envelope or linkers with a ready result. A test-only native mount proves component composition, not product mount. SQL mutation tests use actual SQL clock; pre-expiry capsule clocks are separate SYN evidence, never production clock injection.

Required causal RED/GREEN and named failure cases are in the paired plan. No tests/builds were run for this design.

## Root trust-review disposition

Task A INACTIVE; Task B INACTIVE. First-phase reader acceptance cannot close D0. This corrects the prior unproven cross-fetch closure claim; no existing capability was found/assumed and no new authorization mechanism is commissioned. Root must accept a concrete D0 design before implementation dispatch. No source/tests/runtime changes were made.
