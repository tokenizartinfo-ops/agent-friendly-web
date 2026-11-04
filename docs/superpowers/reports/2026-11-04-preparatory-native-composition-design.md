# Preparatory native composition — bounded Unit 2b design

2026-11-04. Architecture only; no product implementation, source test or runtime qualification.

## Boundary and evidence

PROJECT AFW; REPOSITORY tokenizartinfo-ops/agent-friendly-web; ENVIRONMENT GitHub source/docs; ORIGIN delegated-canary.agentfriendlyweb.dev, not contacted; RESOURCE_TYPE documentation branch/file; RESOURCE_ID docs/finite-owner-cleanup-design-20261104 and this report; ALLOWED_ACTION pinned product/SDK source reads and one documentation commit; ROLLBACK revert that documentation commit. Expected documentation branch head: 8e06dae155353374296bd2ba3ddb9fb55db68387.

Product inspected at c41499c746ce82d05a9c384dfdb8ec8d8cdaf436, a moving Unit 2a work branch pinned for this report, not an accepted implementation. Unit 1 acceptance 1c05ff6d8f39787b8af96ad30ea8593db7d0a7d3 is root-supplied evidence. Read docs/superpowers/specs/2026-11-04-preparatory-issuer-fence.md first: its journal/store/SQL witnesses remain UNMOUNTED components; it does not supply an SDK/native producer. No SQL redesign is proposed here.

SDK evidence: package-lock.json pins @cloudflare/workers-oauth-provider 1.2.1. Relevant official source was read through GitHub at [oauth-consent.ts v1.2.1](https://github.com/cloudflare/workers-oauth-provider/blob/v1.2.1/src/oauth-consent.ts) and [oauth-provider.ts v1.2.1](https://github.com/cloudflare/workers-oauth-provider/blob/v1.2.1/src/oauth-provider.ts). This classifies the source callgraph, not installed runtime behavior.

## Selected composition and smallest next unit

Use the actual existing M binding AFW_FINITE_TRIAL_CONTROL to the fixed QA actor. Keep SDK work in M because it owns OAUTH_KV; keep preparation, durable issuer journal and finite D1 mutations inside QA, which owns original capsule/enrollment and RELEASE_DB. Never send a Unit 2a consumption/barrier witness over RPC.

Three finite source slices complete this design:
1. **Next:** fixed native bridge + original request lifetime + factual source envelope/original selector. Actual preparation HTTP stays pending. Native tests must exercise BOTH real Worker/DO ends; a mocked forwarding function is insufficient.
2. Fixed finite SDK/issuer and notice composition using Unit 2a, with exact phase-source derivation. Exercise unmounted internal/native paths; actual forms/publication remain pending until the cleanup consumer is complete.
3. Qualified preparatory publication and complete cleanup consumer, then remove pending only through the actual fixed source/cleanup gates. Restore all four owner-derived setup-facts cases. Unit 3 nominal alarm ownership transfer remains separate.

Each slice has a named consumer and finish condition below. Do not add capability registries, caller success flags or another generic transport framework.

## Existing source gaps that determine placement

worker/mcp-own/finite.mjs currently re-exports the ordinary default worker. worker/mcp-own/index.mjs dispatches to createDelegatedOAuthWorker. Thus the finite candidate currently has no distinct fail-closed preparation routing.

lib/delegated-oauth-worker.mjs starts a preparation lease only when a cookie exists, performs ordinary consent/grant D1 writes, and ignores failures of its post-write forwards. lib/dossier-monitoring-owner-http.mjs similarly writes its ticket/event before best-effort linking. Those behaviors cannot remain reachable as fallback in the selected finite profile.

worker/independent-closure/finite.mjs currently mounts only initial material and policy setup methods plus initial alarm override; the ordinary IndependentClosure.fetch is 404. The QA public default Worker must remain unchanged/closed. A fixed native DO.fetch override in the finite subclass can serve ONLY the enumerated private bridge paths reached through the binding; it is not a public endpoint.

M already has AFW_FINITE_TRIAL_CONTROL -> IndependentClosure / agent-friendly-web-independent-closure-qa / namespace070c4a7708eb4592a3ded7c117a88225 plus AFW_FINITE_TRIAL_VERSION. buildFiniteInitialUpload deliberately includes it before capsule creation and qualifies the reviewed exception against historical physical bindings. No canary AFW_INDEPENDENT_CLOSURE is invented. d6fc remains the own-event namespace. M DB and QA RELEASE_DB refer to the same fixed physical D1; retain each environment's real holder, never fake env aliases. Phase changes preserve this immutable M footprint.

## Fixed native sender/receiver contract

Suggested new internal file lib/mcp-qa-finite-owner-bridge.mjs:
- forwardFiniteOwnerChoice({request,env,ctx},originalLease)
- forwardFiniteOwnerAuthorizationIssue({request,env,ctx,sdkTransaction},originalLease)
- forwardFiniteOwnerReadGrantIssue({request,env,ctx,sdkApproved},originalLease)
- forwardFiniteOwnerNoticeTicket({request,env,ctx},originalLease)
- forwardFiniteOwnerNoticeIssue({request,env,ctx},originalLease)

These are source-owned calls, not public option contracts. sdkTransaction/sdkApproved are the actual lexical SDK result for that request, with only its bounded necessary factual fields encoded by the sender. No approved:true, caller-chosen phase/preId/grantId/target/method/SQL/capability is accepted. Raw handles/headers travel transiently only where required for SDK/CSRF matching; never persist/log them. Current three forwardPrivateQaFiniteOwner* post-write APIs remain factual observations, or become private calls after the issuer; none returns a reusable “may issue” DTO.

The sender resolves exactly env.AFW_FINITE_TRIAL_CONTROL.idFromName('afw-own-successor-closure-v1'), captures namespace/id/get/stub.fetch/version/DB/KV/limiter holders and checks them across awaits. It calls stub.fetch with one of five fixed internal paths, e.g. /_finite-owner/choice, /authorization, /read-grant, /notice-ticket, /notice. Those paths are compiled constants. External URL/query/body cannot choose a target.

Sender constructs a NEW bounded internal request and overwrites ALL private correlation/version/deadline/original-URL/method metadata. Strip any incoming private-header namespace first. Preserve only the actual original Access assertion, Origin, cookies and content type needed by the fixed verifier, plus the exact retained original form bytes; no credentials are copied into durable records. A server-generated per-HTTP-request correlation ID ties repeated factual callbacks to that request; it is bookkeeping, not an authority token.

Receiver: add createFiniteOwnerNativeReceiver({ctx,env}).fetch(request) in a small fixed internal module, called ONLY by the finite IndependentClosure.fetch override for these paths. It uses actual this.ctx/this.env, checks fixed actor/self namespace/current QA/source, derives original capsule/A selector and current M deployment from source, and compares the sender's actual M version to that exact current publication. It independently validates Access JWT+expiry, current owner/project/client/resource, original cookie/ticket/CSRF and original-body/SDK correlation as appropriate. SDK-specific transaction verification stays on M's trusted fixed caller; a submitted SDK-shaped DTO alone has no entry to this callgraph. Namespace possession and reviewed fixed holders are the original native capability boundary; no new caller signatures or arbitrary-admin proof.

All relevant product operations happen in the receiving invocation. In particular choice POST -> prepareFiniteOwnerChoice -> actual consumeFiniteOwnerStageAdmission -> same in-place adoption -> publication must remain inside ONE QA invocation and lease. Never return its admission to M. Similarly consumeAuthorization -> insertReadGrant uses the same actual Unit 2a store instance/private consumption result; never serialize it or reconstruct it after ACK loss.

Receiver outputs are bounded factual results/HTML, not source envelopes, original JWT/cookies, journal contents or readiness capabilities. The surviving M caller may use an actual acknowledged application grant identity for its SDK completeAuthorization; a saved response cannot resume another request.

## Lifetime and abort: two local brands, one original time budget

Start the M request lease at the actual finite default.fetch entry BEFORE source/SDK/auth/body/DB I/O, regardless of cookies. Do not create another lease inside the OAuth helper or monitoring helper. A small fixed sender retention scope captures actual M holders and retains the WHOLE SDK/native-fetch/response-body/cancellation lifecycle; it must not fabricate a QA ctx.storage/RELEASE_DB to reuse the QA observer. Retention is bookkeeping only.

Add internal readFiniteOwnerRequestBoundary(lease) and createFiniteOwnerForwardedRequestLease(request,boundary) alongside the existing lease implementation. The latter is called only after the fixed native entry/actor/header shape is established; its local brand is lifetime bookkeeping, not authentication. The sender obtains original startedAt, absolute deadline and remaining wall/monotonic budget from its real lease control, not JSON fields. At send it writes these values itself. Receiver creates a LOCAL branded lease at its trusted native entry, capped at min(original absolute deadline, receiver-entry + sender's floored remaining budget, its own 30s maximum, then actual identity/source/approval bounds). Receiver monotonic elapsed time starts from receipt and can only shorten the transmitted remainder. Reject malformed/future/backward/inconsistent starts or deadline spans >30s. Do not compensate clock skew or infer a new grace interval.

A sender that used 29s leaves at most 1s for receiver verification/body/D1 work. Every receiver child is <=5s AND clipped to that same remaining parent. A local receiver WeakMap brand is never described as the transported sender brand. Native metadata is not another permission protocol.

Construct native fetch with the original sender abort signal; receiver uses the incoming native Request.signal for its own guard and child abort. Retain the actual native fetch before racing and retain response body/cancellation after a logical timeout. Qualification MUST demonstrate actual native abort propagation across the selected Worker->DO fetch, including abort while receiver awaits a read and before its first mutation. A client-side rejected fetch is not proof of receiver abort. If the actual platform does not propagate this signal, this bridge is NOT qualified: keep positive producer mounting blocked until an exact fixed native cancellation mechanism is proven; do not quietly substitute an independent 30s timer or an unproven generic cancellation RPC.

Receiver finish aborts local guards but its retained set remains occupied until actual operations settle. Another request cannot borrow/recreate its pending entry. Across separate GET/POST HTTP requests, original I0/C0 and one-time durable issuer claims persist; a fresh actual user POST has its own bounded request lease but cannot resume a previously consumed SQL or stage admission.

## Private envelope and original A selector

Preserve validateFiniteOwnerSource's strict inner grammar. Add readPrivateQaFiniteOwnerContext({ctx,env,parent,preconnectionId}) returning a frozen INTERNAL envelope {source,preconnectionId,capsuleHash}. Its source is passed to the existing strict validator; selector/hash are retained privately and never added as optional business fields. Keep readPrivateQaFiniteOwnerSource as a strict-source projection if existing consumers require that signature.

In owner-preparation.resolve, select the actual context reader, validate source, retain its exact private selector association, and recheck envelope identity as well as source after awaits. First GET uses that original capsule/A preconnectionId instead of opaque(). Opaque ticket handle/projectRef remain independent UI references. No alternate-ID mapping, new occurrence or default inferred selector. Subsequent ticketContext must equal the same original A selector. The trusted setup-ownedSource branch keeps its existing separate native setup boundary and must match its requested original selector; it must not manufacture a new request parent to adapt.

observeFiniteFactualReadWork may borrow an already-active ambient mode owner ONLY when it is the exact scopes.getStore()/outstanding entry, matching real holders and registered root, with both original/child guard and existing stored actual admission.lease current. It changes no mode or admission. No new admission argument. Standalone readonly remains strict; another request/root cannot borrow. This is required for source.assertCurrent after genuine adoption, not a readonly upgrade.

## Phase producer: exact chain, not an extended initial-reader shortcut

The current readPrivateQaFiniteInitialOwnerSource is a closed_ui reader: it rejects stage approvals/policy-effect rows and requires original deployment/configuration. Keep that contract for its standalone tests. Reuse readPrivateQaFiniteInitialAnchors and carefully shared fixed primary readers for the new context producer; do not delete all its absence checks and call that a general source.

The context producer reads bounded exact original capsule/M/A/plan/backup/QA facts, actual token identity/expiry/holders, originalQ/current QA pointer, then the exact stage approval + ConnectionSend/Ack/Receipt chain and primary D1 links. Resolve ONLY these prefixes:
- closed_ui: original candidate pointer; no completed connection publication. Legitimate ticket/approval/enrollment records can exist and must match original A. Unknown forward SEND, foreign state or cleanup started returns pending, not a usable source.
- read_consent: exact installed connection receipt whose predecessor is original M and whose actual provider pointer/configuration matches. OAuth enabled; monitoring/events/nominal writers remain disabled. Authorization/grant prefixes may be partial, but no invented GrantLink or next-stage permission.
- notice_consent: exact connection then notices publication chain, matching actual original grant/link/relation and current fenced-issuer facts. Exact monitoring policy pins that grant, project, client and original expiry. Next-stage eligibility also needs actual notice event/link.
- finite_prearm: exact third finite publication plus all original grant/notice/approval/audit facts. Do not run qualifyFiniteConnectionProfile with an unsupported phase: the historical third stage uses canaryLive public-static/full configuration qualification, unlike the first two preparation profiles. Verify the actual compiled prearm exposure/empty private policy fields deny nominal work until separate setup/handoff; no nominal runtime inferred from the phase label.

Initial baseline and owner/program/window facts stay identical across source snapshots. First two changes preserve bytes and every binding except the existing three enumerated mutable fields. The third uses the exact existing finite candidate residency and full public-static expectations; no new policy/grant authority from an arbitrary candidate DTO.

Extract/share lower-level strict chain validation, not owner-preparation.stageHistory via resolve: otherwise source -> stageHistory -> resolve -> source recurses. Independent current owner/project/revision and exact consent/grant/event reads come from fresh first-primary reads, with SQL clocks as Unit 2a specifies. Every issuer row/receipt/journal must match original A/enrollment; reject orphan/extra rows and wrong future stages.

A private surviving publication continuation needs a narrowly defined own-in-flight source recheck: after it durably writes its own SEND, ordinary general readers must remain pending, while THAT actual admitted writer can validate its exact original journal and unchanged predecessor before the one provider request. Otherwise a general “deny all SEND” source checker deadlocks the producer. Implement this only inside the existing fixed consumed-admission callgraph, with exact local current journal/operation position; do not expose allowPending/allowOwnedWriter flags or recover a writer from storage.

## SDK and issuer ordering

M owns the SDK instance/KV, QA owns all finite business D1 writes. The finite compiled default must explicitly intercept preparation, authorization and monitoring paths; it must not call the ordinary granting branch when cookie/native hook/source is missing. Ordinary deployments retain their separate behavior. Actual finite forms stay pending until the final cleanup gate below is implemented.

GET authorization:
1. M verifies canonical request/client/resource/PKCE/Access and obtains the actual SDK beginConsent result under original retention.
2. Before D1 createConsent or exposing the form, native QA rechecks current source/owner/original ticket, generates/reserves the one application grant UUID with the actual SDK handle hash, and runs Unit 2a reservation -> OPEN fence -> authorization INSERT with actual ACK/readbacks.
3. Only the surviving M invocation with matching result may return the SDK form. Unknown native ACK returns pending; no second beginConsent/reservation to recover a lost attempt.

POST approval:
1. Preserve the entire original bounded form once; verify Origin/Access/preparation and SDK cookies. M calls actual approveConsent and keeps its validated original request in the same closure.
2. Before D1 consumption/grant insert, fixed QA receiver revalidates exact owner/source/CSRF and primary original consent; it uses Unit 2a consumeAuthorization then insertReadGrant with the private one-use consumption result in the same store/invocation. Record expected grant tuple durably before issue.
3. M calls completeAuthorization once only after actual grant ACK, with fixed props.applicationGrantId/userId/projectId and revokeExistingGrants:false. Retain/log only operation hashes and outcome uncertainty, never SDK secrets.
4. Factual authorization/grant linkers remain post-write evidence. A link failure does not create another grant, revoke some competing winner, or change actual SDK completion into an approval claim. The finite catch path must use the qualified exact reduction rules, not fall back to ordinary unfenced store writes; absent an authorized earlier reduction window, retain pending for the original cleanup owner.

Notice:
QA derives fixed policy from the exact installed notices receipt and actual linked grant. Before ticket INSERT reserve handle hash/request UUID in the same original actor, then run fixed fenced ticket SQL. POST validates actual owner/Origin/cookie/ticket, records exact NoticeSend before actual granting event INSERT, and applies the same Unit 2a fence-row predicate/child deadline. Preserve recordDossierMonitoringConsent's sequence CAS and unique (grantId,requestId) semantics; return/reconcile actual sequence only. Post-write NoticeLink cannot substitute for the reservation. Extend Unit 2a's fixed operation enum/records for these named notice operations in this slice; do not claim its current six-operation API already supports them. No subscription/Container/event dispatch is enabled by notice consent.

## Publication and cleanup gates before any form/effect

Unit 1 enrollment remains DATA. Removing its successful-enrollment pending return requires the actual source producer, native bridge, complete cleanup implementation and qualified schema/custody/holder checks, not a ready boolean or env flag.

Before presenting an actionable preparation form or consuming a preparation ticket, the fixed receiver must verify the original plan/alarm/capsule/source and that its actual compiled cleanup path covers ALL reachable authorization, read-grant, notice and publication prefixes. Enrollment does not yet exist before the first approval: preflight checks the initial owner and implementation; the same real POST then consumes the genuine stage admission and enrolls before its first publication SEND. Do not circularly require an enrollment for first GET or mistake preflight for a new authorization object.

Complete cleanup consumer on the existing initial alarm must replace Unit 2a's conservative issuer-prefix refusal with:
- exact actor/enrollment/issuer inventory, durable freeze, same-row primary terminal barrier and exact reserved-grant reduction;
- actual notice recovery/reduction when present, no fabricated consent when absent;
- exact settled initial/connection publication chain and current owned pointer; original baseline manifest/configuration/last100 and custody/inventory gates;
- one original restore SEND/ACK/readback, retained unknowns, original delivery counters/C0/C1; no second alarm or nominal HEAD fallback.

Unresolved activation/deployment POST remains a strict no-restore barrier, even if the pointer currently equals baseline. An upload-only unknown is separately classified by its actual fixed endpoint/side effects; do not claim it settled or allow a future activation continuation after the parent expired. Fresh current version visibility is not proof about an issued late deployment.

### Shared fixedPolicyEngine cancellation correction

Its http currently awaits fetch, body reads and finally reader.cancel(); the outer child/work promise is retained, so held cancellation can keep work outstanding. However a known parse/size/HTTP error is not reported separately before a held cancel finishes, and a synchronous cancel throw can mask that first error. Mere Promise.race timeout does not settle this lifecycle.

Before re-enabling owner publication, use the already-established immediate-first-failure plus retained-whole-lifecycle pattern: capture first failure, report it promptly through the bounded child result, retain the actual fetch->body->cancel operation through eventual settlement, and suppress cancellation errors only after preserving that first failure. On success, completion/receipt must wait for required body/cancellation settlement. Recheck holders/deadline after awaits. Test rejected/held fetch, late response body, oversize/invalid JSON, synchronous cancel throw and held/rejected cancellation; a later child cannot revive the prior operation. Apply to the actual shared engine, preserving separate setup behavior and original budgets, not a duplicated positive test engine.

## SDK uncertainty versus safe closed restoration

Official SDK 1.2.1 source establishes:
- beginConsent writes encrypted transaction KV state and returns a handle/cookie. It does not insert the application's D1 grant.
- approveConsent reads the transaction and deletes its KV key after validation; current caller does not request remember-cookie behavior. It does not create the application's grant.
- completeAuthorization validates client/redirect/resource/PKCE, generates an SDK-internal grant/code, and writes SDK KV with encrypted application props. With the actual fixed revokeExistingGrants:false, it does not sweep existing grants. It does not call application createGrant or Worker deployment APIs.
- The application's tokenExchangeCallback checks the exact D1 grant, status/expiry/owner/client/resource, then consumeExchange; boundedTokenResponse rechecks it. Delegated reads independently recheck grant status/revocation/expiry and current primary admission. Inspect these exact gates in the compiled candidate, not just the SDK alone.

Recommended root ruling: after the exact serialized primary issuer fence and confirmed original application-grant revocation/absence, with all relevant granting/notice SQL ordered behind that barrier and actual provider deployment writers settled, an unknown late begin/approve/complete SDK operation cannot create another application D1 permission or change the Worker pointer. Preserve it as opaque SDK/KV uncertainty. Do NOT make it alone an indefinite blocker to restoring the exact owned Worker to the original closed baseline within the authorized window.

This is a closed-boundary result, NOT full operational completion or physical SDK settlement. Persist separate exact restoration/permission facts and unresolved SDK operation references; operationalReadiness/completePackage/PCoff remain false. No global SDK scan/deletion or claim of KV cleanup. A late SDK token/code remains denied by the revoked/expired application grant; test that through actual application gates. Pending application grant SQL MUST first be ordered/fenced by the exact primary barrier; before that barrier, absence is not sufficient. Already-issued deployment POST uncertainty is never reclassified as harmless SDK work.

In-flight previously authorized read responses are not asserted canceled by this result. This design does not expand into a universal drain proof. Any discovered SDK callback that can invoke an application granting or deployment writer invalidates this classification and blocks restoration until that exact callgraph is fenced.

## Slice closure and proportional acceptance

Slice 1 closes when native M->QA tests prove fixed target/metadata overwrite, genuine local receiver lease/abort, original selector, strict envelope and same-ambient owner factual recheck, while actual host still returns pending and issues zero tickets/effects. Include sender elapsed29s/receiver<=1s, abort while native read held, spoofed headers/body, wrong holder/version/actor, same request adoption and foreign/readonly denial. Native abort propagation failure is an explicit blocker, not a synthetic pass.

Slice 2 closes when actual SDK 1.2.1 begin/approve/complete is composed with the fixed native issuer path and existing Unit 2a SQL under explicit synthetic Access/provider/custody; lost grant/notice/link ACKs recover original identities, missing cookie/hook cannot hit ordinary writes, and notices join the exact fence row. Keep UI/publication pending; fixture data is not runtime consent.

Slice 3 closes when the actual publication writer, phase producer and alarm consumer together cover every partial/unknown prefix and original restoration, with the HTTP lifecycle correction and SDK uncertainty classification tested. Only then can the actual fixed host route be enabled in SOURCE under all source/cleanup gates, still no live eligibility.

Restore the four modes from historical test/mcp-qa-finite-policy-setup-facts-native.test.mjs at c12d109: normal, grant, revision, selection. The normal case derives actual owner preparation/three real stage receipts and accepts facts after commandBy only because original T0 and publication were before commandBy; grant revocation, project revision drift and selection drift deny. Facts remain read-only with no new setup SEND. Do not revive these positives through seeded success DTOs or a production bypass; use the qualified same native flow and actual journals. Unit 1's pending expectations stay correct until that flow exists.

Keep SQL real-clock tests separate from pre-expiry synthetic capsule clocks, as Unit 2a requires. Native automatic alarm event delivery, provider/custody/source approval and actual remote latency remain separate evidence; no production clock injection or ceiling renewal. One final changed-graph compiler/residency check when warranted, no broad unrelated reruns.

All initial/owner/child, commandBy-510000, nominal and launch clocks remain unchanged. Source ceiling 3Nov2026 02:59UTC is expired. No actual Entry/provider/keys/DDL/permissions/OTP/monitor/Max, local files/build/tests, other projects, mail/chat/automation or subagents. The single consuming occurrence remains reserved for coordinated PC-off.
