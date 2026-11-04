# Preparatory issuer correlation — Unit 2 design

2026-11-04. Narrow continuation of the cleanup design; no Unit 1 redesign or product implementation.

## Scope and evidence

PROJECT AFW; REPOSITORY tokenizartinfo-ops/agent-friendly-web; ENVIRONMENT GitHub source/documentation; ORIGIN delegated-canary.agentfriendlyweb.dev (not contacted); RESOURCE_TYPE Git branch/document; RESOURCE_ID docs/finite-owner-cleanup-design-20261104 and this file; ALLOWED_ACTION read pinned product source and add this report on the separate documentation branch; ROLLBACK revert this one documentation commit. Branch readback was 1db28efb87768cf724be56c7f941333fc2a4f71b; publication must use that expected-SHA lease.

Product evidence is e256ee1a43ca3125fdb12485ceab712b6a7e197e. Unit 1 spec at docs/superpowers/specs/2026-11-04-preparation-cleanup-enrollment.md is binding: admitted preconnectionId MUST equal capsule/A preconnectionId, no mapping; even acknowledged enrollment remains pending before SEND. Its implementation was in progress and is not qualified here. No source tests/builds/provider/runtime operations were performed for this report.

## Decision

Use the **existing fixed QA actor's durable issuance journal, existing business-table primary keys and one narrow D1 issuer-fence table**, with mandatory finite-only SQL commit fences. Reserve the exact server-generated application grantId before any corresponding D1 authorization/grant write. Persist the SDK authorization handle HASH and that grantId under the original enrolled capsule/preconnection. For notices, reserve the existing ticket handle hash/request UUID before ticket INSERT, then use the existing unique (grant_id, request_id) event identity.

A narrow source-only D1 migration IS required for an irreversible serialized issuer fence. Existing business rows do not cleanly represent that fence without overwriting original consent consumption/expiry or fabricating a revoked grant. New finite SQL statements and durable DO records are also required. No remote migration is authorized. No recovery path reissues a grant from those records. They identify what cleanup must read/reduce; fresh actual owner identity/CSRF/SDK validation and the fixed native callgraph still control issuance.

## Proof of the current gap

- lib/delegated-oauth-worker.mjs createDelegatedOAuthWorker:
  - GET /authorize calls SDK beginConsent, then store.createConsent, then a best-effort forwardPrivateQaFiniteOwnerAuthorization whose failure is ignored (lines 254–257).
  - POST verifies the SDK transaction, then best-effort authorization forwarding, consumeConsent, generates crypto.randomUUID(), and createGrant (272–280). After SDK completeAuthorization, it best-effort forwards the grant (292).
  - A grant INSERT can commit without the forward running or without its DO GrantLink ACK. Current cleanup cannot recover that exact grant from a reserved original identity.
  - preparationParent currently depends on a browser cookie; it starts a request lease but does not establish request-retention scope around all SDK/body/D1 work. A missing cookie or failed forward currently falls through to ordinary consent behavior.
- lib/delegated-oauth-store.mjs createGrant is unconditional INSERT VALUES. createConsent is unconditional INSERT VALUES. consumeConsent compares expires_at to supplied JavaScript time, not database execution time, and has no project-revision/original-request commit fence.
- lib/dossier-monitoring-owner-http.mjs creates a random ticket request_id in its INSERT (61), later uses that ticket for recordDossierMonitoringConsent (71), then best-effort forwards its result (73).
- lib/dossier-monitoring-authority.mjs already has a single INSERT SELECT, original sequence CAS, UNIQUE(grant_id,request_id), exact recovery by that pair and optional SQL commitWindow. This is a useful existing primitive. The finite call must clip its commitWindow to the actual original child/request, not only the longer policy/ticket/Access window.
- recordFinitePreparationAuthorization, recordFinitePreparationGrant and recordFinitePreparationNotice in lib/mcp-qa-finite-owner-preparation.mjs are post-write factual linkers. They cannot retroactively cover an unjournaled issuer.
- createOwnPermissionsOnlyReduction in lib/mcp-own-permission-withdrawal.mjs requires an actual monitoring-consent row even for read-grant revocation. It cannot close the read-grant-before-notice prefix by itself.

The existing business schema supplies exact recovery keys, but not the irreversible issuer fence: delegated_consent_sessions.handle_hash and delegated_access_grants.id in db/schema.ts; dossier_monitoring_owner_tickets.handle_hash plus UNIQUE request_id in db/dossier-monitoring-owner-tickets.sql; UNIQUE(grant_id,request_id) in db/dossier-monitoring-consent.sql. Preserve immutable notice tickets/history and all older rows.

## Actual M-to-QA binding footprint

This is present in the selected source, not inferred from historical canary2607:

- lib/mcp-qa-finite-profile.mjs canaryLive includes AFW_FINITE_TRIAL_CONTROL, durable_object_namespace, class IndependentClosure, script agent-friendly-web-independent-closure-qa, namespace 070c4a7708eb4592a3ded7c117a88225, and AFW_FINITE_TRIAL_VERSION.
- buildFiniteInitialUpload in lib/mcp-qa-finite-initial-upload-wire.mjs clones that template. Its physical-binding comparison explicitly excludes AFW_FINITE_TRIAL_CONTROL as a reviewed profile exception against the historical baseline.
- qualifyFiniteConnectionProfile in lib/mcp-qa-finite-connection-profile.mjs preserves this exact static binding while changing only its enumerated preparation values.
- Canary DB and QA RELEASE_DB both name physical D1 6a728254-1494-4039-802e-b39288a55fcc in the profiles. Object equality across isolates is not a physical-resource check.
- AFW_INDEPENDENT_CLOSURE belongs to QA, not the canary. AFW_DOSSIER_EVENTS_NODE/d6fc is not the QA actor.

Therefore no new binding/resource is needed in this proposed protocol. Actual native forwarding, exact runtime metadata/caller provenance, immutable M/configuration readback and compatible actual QA method mount remain concrete source-composition gates. Never infer those from the profile or alias canary env to QA env. Do not add a binding later beneath an immutable capsule or loosen the allowed stage-profile changes.

## Reserved records: exact data, not authority

Add strict canonical records under the existing preparatory cleanup family or a dedicated subordinate prefix, keyed by the already-enrolled original preconnectionId. At most one original authorization and one grant issuance for this occurrence; no per-retry new identifier. No raw handle, cookie, SDK request/code, bearer, JWT or secret is stored.

Common immutable references: enrollmentHash, capsuleHash, preconnectionId, sourceRevision, actorId, qaVersionId, exact owner subject/realm hash, projectId/revision, clientId/resource, original I0/C0/C1. These are privately retained existing scope facts, never public RPC output. Each operation record also fixes issuedAt, original absolute child deadline, exact request-body/data hash and predecessor record hash.

Suggested finite record kinds:

1. AuthorizationIntent: common references, authorizationHash = SHA256(actual SDK transaction.handle), reservedGrantId = newly generated UUID, requestedScopes, consentExpiresAt. Reserve after actual SDK beginConsent but BEFORE D1 createConsent and before exposing a form. Do not generate a second ID when ACK is lost.
2. AuthorizationSend / AuthorizationAck: original intent hash, exact INSERT hash; ACK records exact primary row hash. SEND is durable before D1 issue. A surviving intent without SEND cannot authorize reconstruction of the issuer.
3. GrantIntent: original AuthorizationIntent hash, reservedGrantId, authorizationHash, exact approved scope list, expectedConsentConsumedAt, grantCreatedAt, grantExpiresAt and exact current SDK-approved owner/project context hash. Persist before consumeConsent. Its immutable reserved consume timestamp is a correlation value, not proof that consumption happened.
4. ConsentConsumeSend / ConsentConsumeAck and GrantSend / GrantAck: distinguish the actual two statements. Only this invocation's actual successful UPDATE RETURNING and exact readback permit its grant INSERT; a stored Ack, matching timestamp, earlier row or new request cannot resume that continuation. GrantAck binds actual exact row including original created/expires/scopes, independently of later DO GrantLink.
5. NoticeTicketIntent: exact grant/authorization references, server-generated ticketHandleHash and noticeRequestId, original expectedSequence/project revision/action, ticketIssuedAt, ticketExpiresAt, permissionExpiresAt. Persist before existing ticket INSERT.
6. NoticeSend / NoticeAck: ticket intent hash, exact event requestId/expectedSequence/revision/expiry. Only reserve this SEND after actual explicit same-origin owner POST/CSRF validation. Event sequence is allocated by D1 and read back by exact (grantId,requestId); never predict or invent it.
7. SDK completion SEND/settlement facts: bind the same reserved grant before completeAuthorization. No opaque SDK secret output. A late/unknown KV completion remains an outstanding effect even if D1 permission is later revoked; it cannot be retried or called settled by a timeout.

The native transaction must exclude cleanup freeze, validate the actual enrollment and current anchors, and append once. Require actual final transaction return, sync, exact readback before issuing the next statement. A commit/ACK uncertainty fails closed; preserve the row for independent cleanup. Do not create new business effects by “recovering” an existing SEND. Bounded exact journal enumeration replaces a scan by owner/client.

GET and POST are naturally different actual HTTP requests; each gets its actual original 30s request parent, neither extends I0/C0 or resumes the other request's consumed continuation. A new POST must still prove current owner and SDK transaction, and can claim the single GrantIntent only once. Durable data alone is never approval.

## Minimal concrete API/callgraph changes

Keep the existing post-write forward/link APIs as factual observers. Add source schema db/finite-preparation-issuer-fences.sql and a finite-only schema preflight; its verified installation on the exact existing D1 is a separate prerequisite, never inferred from source CI. Do not turn their best-effort status into a permission token.

In the finite compiled issuer composition, introduce PRIVATE nested operations at the existing call sites:

- issueFiniteAuthorization(transaction, auth, pinnedProject, originalLease): lexical actual SDK beginConsent output and verified identity/source; reserve AuthorizationIntent and durable SEND, then perform fixed fenced consent INSERT and factual ACK.
- issueFiniteReadGrant(approved, consent, approvedScopes, originalLease): lexical actual SDK approveConsent result and original body/identity; reserve GrantIntent, consume once, issue only its reserved grant, then actual SDK completion and factual linking.
- issueFiniteNoticeTicket(originalLease) and issueFiniteNotice(ticket, originalLease): actual fixed monitoring policy/request/identity in closure; reserve before ticket/event write.

These functions are private producers, not exported callback factories or public DTO endpoints. A fixed source-owned native sender uses AFW_FINITE_TRIAL_CONTROL.idFromName('afw-own-successor-closure-v1') to reach the existing QA actor. The receiving side derives enrollment/capsule/owner selectors and validates exact original time/holders; it does not accept an arbitrary actor, database, URL or provider function. If journal and D1 issuance are placed on the QA receiver, its fixed operation must own both steps; never return a serializable “may issue” DTO to an unqualified sender. If issuance stays in the canary, a same-request trusted native receipt is only one input to the actual fixed continuation, never a recoverable permit. Root's source-composition plan must select and prove that concrete placement before mounting; protocol tests may exercise the fixed private producer in native fixtures.

Recommended placement: let the fixed QA receiver perform the journal + bounded D1 statements through its existing RELEASE_DB, while the canary retains SDK begin/approve/complete calls and the original request lifecycle. This minimizes the journal-before-SQL gap and avoids introducing a second D1 writer. The original SDK-approved request is forwarded through the trusted, fixed native callgraph and independently matched to primary consent/identity/source; no arbitrary caller approval proof is invented. Return only exact factual grant/notice identity needed by the surviving caller, not authority/readiness fields. ACK uncertainty denies further SDK completion; cleanup still knows the reserved ID.

lib/delegated-oauth-store.mjs may expose separate internal finite SQL methods or a separate lib/mcp-qa-finite-preparation-issuer-store.mjs may hold them. Keep ordinary store semantics unchanged; never make a public optional boolean bypass choose the finite fence. Actual source-selected finite routes MUST deny before issuance if their native composition is missing, cookie absent, forward fails, enrollment mismatches or original M selector is unavailable. Ordinary worker behavior is not the fallback for this selected finite profile.

## SQL fence design: one narrow monotonic fence table

Add finite_preparation_issuer_fences with preconnection_id TEXT PRIMARY KEY, authorization_hash TEXT UNIQUE NOT NULL, grant_id TEXT UNIQUE NOT NULL, enrollment_hash TEXT NOT NULL, identity_hash TEXT NOT NULL, reserved_at INTEGER NOT NULL, forward_until INTEGER NOT NULL, cleanup_until INTEGER NOT NULL, fence_request_id TEXT NULL, fenced_at INTEGER NULL. identity_hash is the canonical domain hash of the exact original enrollment/source/owner/project-revision/client/resource/authHash/grantId/I0/C0/C1 tuple, not a capability. forward_until=C0 and cleanup_until=C1. Check required key/hash/time grammars and paired nullness of fence_request_id/fenced_at; a non-null fence time satisfies reserved_at <= fenced_at < cleanup_until (original C1). This storage check permits only monotonic early reduction; it supplies no cleanup timing authority. Add no-delete and no-identity-update triggers; fence fields permit exactly NULL -> original terminal values or an identical no-op, never clearing/replacement. One row per original preId rejects an alternate authorization.

After DO AuthorizationIntent is durably acknowledged, insert the OPEN fence row using INSERT SELECT, original current owner/project/revision and database time < original child D <= C0. This is before consent INSERT. Require exact primary ACK/readback before any permission write. If the OPEN insert is uncertain, stop; no later caller resumes it as business authority. Its pending SQL cannot reopen a terminal row.

Every finite consent INSERT/consume, grant INSERT and granting notice-ticket/event statement MUST JOIN this exact row on preconnection_id, authorization_hash, grant_id, enrollment_hash and identity_hash and require fenced_at IS NULL, fence_request_id IS NULL and database_now < forward_until. These predicates belong to the actual single mutating SQL statement, not an earlier JavaScript check. Ordinary issuer SQL must be unreachable in this finite composition, including missing cookies.

The existing recordDossierMonitoringConsent commitWindow alone is therefore insufficient for the finite granting path. Add a narrowly typed internal finiteIssuerFence selector to its fixed SQL composition, or a finite-only statement in the proposed issuer store sharing its exact event/CAS/recovery semantics. It supplies only original preconnectionId/identityHash plus exact grant references, never arbitrary SQL, callback authority or a readiness flag. The resulting INSERT SELECT joins the fence and checks it atomically; beforeCommit remains an additional identity recheck, not the fence.

### Existing business tables: narrow statements

Use one first-primary session per exact operation where supported, and actual holder checks before/after awaits. Every statement uses database_now = CAST(unixepoch('subsec')*1000 AS INTEGER), original child deadline D <= min(original request, identity, source/approval, C0), and database_now >= original operation start AND database_now < D. JavaScript time alone is insufficient. Persist those deadlines before SEND; no recovery widens them.

In all statements below, include the mandatory exact unfenced-row JOIN/predicates above. Authorization INSERT is INSERT INTO delegated_consent_sessions (...) SELECT exact reserved fields FROM site_projects p WHERE p.id=:project AND p.user_id=:subject AND p.revision=:revision AND database_now>=:start AND database_now<:D AND database_now<:C0. Consent expiry is fixed <= C0 and existing owner/approval limits. No REPLACE or upsert. Collision or unknown result is read-only reconciliation.

Consumption is a separate UPDATE delegated_consent_sessions SET consumed_at=:reservedConsumeAt WHERE handle_hash=:authHash AND user_id=:subject AND kind='authorize' AND project_id=:project AND client_id=:client AND resource=:resource AND consumed_at='' AND expires_at=:originalConsentExpiry AND expires_at>:reservedConsumeAt AND EXISTS(exact current owner/project/revision) AND database_now>=:start AND database_now<:D AND database_now<:C0 RETURNING exact fields. Check exact original scope data and approved subset. Only the actual non-null returned row of this surviving invocation permits its next step; a later SELECT cannot replace that result.

Grant INSERT is one INSERT INTO delegated_access_grants (...) SELECT :reservedGrantId, c.user_id, c.client_id, c.project_id, c.resource, :approvedScopes, :createdAt, :expiresAt, '' FROM delegated_consent_sessions c JOIN site_projects p ON p.id=c.project_id AND p.user_id=c.user_id WHERE c.handle_hash=:authHash AND c.kind='authorize' AND all exact original selectors AND c.consumed_at=:reservedConsumeAt AND p.revision=:revision AND database_now>=:start AND database_now<:D AND database_now<:C0, with fixed expiresAt <= min(C0, consent/owner/approval expiry), valid approved scope subset and enough original SDK exchange lifetime. Preserve the existing exchanged_at default. No INSERT OR REPLACE, no new UUID, no retry. The primary key prevents duplicate identity; it does not itself authorize use.

Keep consumption and grant INSERT separately journaled instead of inventing an atomic two-table success DTO. A consumed consent with no grant is a valid terminal partial outcome. It must not be “repaired” into another grant.

Notice ticket INSERT SELECT joins the exact reserved grant and owned project, checks all fixed selectors, expected revision/sequence, unrevoked grant, requested action and SQL deadline. Its existing immutable ticket schema suffices. For the grant event, reuse recordDossierMonitoringConsent's exact reserved requestId, expected sequence/revision/client/resource, recovery and CAS semantics, adding the mandatory same-row fence predicate and clipping commitWindow to the ORIGINAL child D/C0. Reconcile its actual event by grantId + requestId, then validate the complete immutable tuple and latest sequence, not just status200. Existing recovery returns a deliberately small response; cleanup must read the full primary row.

## Cleanup of every partial prefix

Before handoff, at original C0 the same preparatory cleanup owner durably freezes new DO intent claims. This alone does not cancel issued work. For EACH recorded original AuthorizationIntent, append one cleanup FenceSend with a server-reserved fenceRequestId before issuing the following primary barrier:

INSERT INTO finite_preparation_issuer_fences (exact immutable columns, fence_request_id, fenced_at)
SELECT exact original intent values, :fenceRequestId, :cleanupNow
WHERE database_now >= :authorizedCleanupNotBefore AND database_now < :authorizedCleanupChildEnd
ON CONFLICT(preconnection_id) DO UPDATE SET
 fence_request_id = COALESCE(finite_preparation_issuer_fences.fence_request_id, excluded.fence_request_id),
 fenced_at = COALESCE(finite_preparation_issuer_fences.fenced_at, excluded.fenced_at)
WHERE every immutable existing column = its excluded original value
 AND (existing fence is NULL OR existing fence exactly matches this recorded fence)
RETURNING exact identity/fence fields.

No OR REPLACE. A conflicting authHash/grantId unique key or identity mismatch fails closed. The closed-row INSERT handles a delayed/unknown original OPEN insert without fabricating business consent or grant. A late OPEN insert either ran first and is now fenced, or conflicts with the already-terminal row; it cannot reopen it.

Require the actual acknowledged barrier result and exact first-primary readback before treating a grant as absent or beginning its reduction. A timeout/unknown ACK is not a fence receipt: retain FenceSend and use only exact primary reconciliation of that requestId/identity/fencedAt to establish whether the barrier committed. Never create another fence identity or clear a row on retry. If the exact barrier cannot be confirmed, no absence/completion claim.

The single mutating grant INSERT SELECT must test this SAME row. Within the actual D1 primary's serialized statement history, a grant statement ordered before the barrier has committed before the barrier's acknowledged readback and will be visible to the subsequent exact lookup; one ordered after it sees fenced_at and inserts nothing. This is the causal proof to qualify with native queued-statement tests. Merely seeing database_now >= the authorized cleanup start or a passed JavaScript timer is insufficient.

This barrier proves the finite issuer cannot create another grant after it and orders the relevant D1 writes. It does NOT claim all JavaScript/SDK/provider promises physically settled. Keep those distinct journals/outstanding work until actual settlement; their unknown outcomes can still block deployment restoration.

For a known reserved grantId, use exact primary lookup even if GrantLink/SDK completion/notice does not exist. A narrow read-only observation and revocation path joins that row to its reserved authorizationHash and exact consumed consent tuple, then matches grant ID, owner/project/client/resource/scopes/created/expires. Revoke only that row with a cleanup UPDATE guarded by authorizedCleanupNotBefore <= database_now < authorizedCleanupChildEnd and exact immutable fields/current project ownership. Do not require monitoring consent for this read-grant-only reduction, and do not scan grants by owner/client.

If notice exists, recover it by reserved (grantId,noticeRequestId) and verify actual sequence/revision/issued/expiry. Then reuse createOwnPermissionsOnlyReduction/Observation with that actual original tuple, bounded by the same cleanup parent. If there is no notice, report “notice not issued/absent under fenced original issuer,” not “monitoring consent revoked.” Never create a grant-consent row just to make the helper applicable.

Pending authorization is fenced by the confirmed terminal primary fence row, original expiry/SQL issuance cutoff, original durable freeze and prohibition on any new grant attempt for that occurrence. Do not fake an approval by writing consumed_at during cleanup or mutate the historical original expiry to manufacture proof. A stale SDK form/transaction cannot bypass the primary consent and grant predicates. Any issued SQL retains original D; the same-row primary barrier supplies the required serialized ordering even for a statement begun before C0 whose response arrives later. Reads establishing absence must follow the confirmed barrier on the primary, use database time >= the actual controller's authorized cleanup start and verify original deadlines; an earlier qualified nominal fence does not wait for initial C0. Uninspected ordinary writers remain outside this proof and must be excluded by the fixed finite source callgraph.

No-grant row before the confirmed primary barrier is unresolved, not proof of absence. SQL/native serialization and deadline behavior must be tested with queued actual grant and fence statements in both orders and independent primary read after the barrier. A logical timeout is never physical settlement. If native semantics cannot establish that the guarded statement has finished/serialized before the observation, retain admin_pending. This is bounded proof about the fixed enumerated issuer, not universal arbitrary-admin drain.

A late SDK completeAuthorization may leave an opaque provider record, but the exact revoked/expired D1 grant is still denied by the application's authorization path. Do not claim SDK/KV removal or physical settlement; retain uncertainty and block deployment restoration/overall completion until the existing cleanup contract's relevant issued operations are settled. Never revoke a different successful grant when an unrelated loser fails.

### Cross-stage timing ruling: early nominal reduction

The same enrolled read grant and pending authorization must also be fenceable by the qualified nominal cleanup owner. Its original C0n=T0+240000 and C1n=T0+420000 precede initial C0; requiring fenced_at>=initial C0 in the table or reduction SQL would strand that inherited obligation.

Keep forward_until=initial C0 and cleanup_until=initial C1 immutable. The table allows a terminal fence from reserved_at until initial C1, as above. All granting statements still require the SAME row to be unfenced; setting fenced_at at C0n therefore only shortens effective issuance lifetime. Do not rewrite forward_until, clear the fence or reset any clock.

The private fixed cleanup controller derives the SQL bounds; they are never caller/RPC timing DTOs or a low-level table permission:
- Before qualified handoff: authorizedCleanupNotBefore=initial C0; authorizedCleanupChildEnd=min(initial C1, actual original cleanup-child deadline, source ceiling, custody bounds).
- After the actual immutable native ownership handoff to the existing nominal guard: authorizedCleanupNotBefore=that plan's original C0n; authorizedCleanupChildEnd=min(that plan's original C1n, initial C1, actual original cleanup-child deadline, source ceiling, custody bounds). R1 belongs to the separate finalizer and does not extend this fence/reduction window.

Resolve this choice by the actual fixed actor's verified ownership/handoff records, exact enrolled selector and nominal plan/control hashes, current holder/native/source checks, and the existing guard continuation. A row, handoff-shaped DTO, caller notBefore or missing/unknown handoff cannot select the earlier window. Until Unit 3 is implemented and qualified, only the prehandoff controller exists and it enforces initial C0 exactly.

At C0n the successor performs the same durable freeze, exact primary terminal barrier, confirmed ACK/readback, exact reserved-grant lookup and grant-only/actual-notice reduction in that order. No monitoring-consent row is required to reduce the inherited read-only grant. An already-confirmed fence remains the original terminal row/request/time; qualify its exact identity and provenance rather than rewriting it to the successor's requestId. Any contradictory owner/window or unconfirmed barrier remains pending. Early permission reduction is not physical settlement of retained SDK/provider work and does not relax the guard's remaining cleanup/proof gates.

Add one bounded acceptance pair: the current prehandoff controller denies an attempt before initial C0; the actual qualified handoff fixture can fence and reduce the same original read-grant-only issuer at C0n with both original table deadlines unchanged. A caller-supplied earlier time, missing handoff, altered original deadlines, or attempted fence clear/replacement fails.

## Small composition adjustment for factual reads

observeFiniteFactualReadWork currently borrows only an ambient request entry. After genuine request-to-owner adoption, the same fixed source recheck would fail solely because mode is owner.

Minimal change: allow this FACTUAL reader to borrow an already-active matching owner entry as well, only when scopes.getStore() is that exact outstanding entry, ctx/env/storage/RELEASE_DB and registered root match, original and child guards remain current, and the existing stored actual admission.lease is current. Do not accept a caller admission argument or change mode. Keep strict observeFiniteReadOnlyWork, continueFiniteOwnerStageWork and the genuine WeakMap consumer unchanged. A different request/root, standalone readonly entry or reconstructed lease cannot borrow. This adds no authorization; it lets an already-authorized fixed continuation recheck source facts without a second parent.

At actual finite OAuth/monitoring request entry, the whole SDK/body/D1/cancellation lifecycle also needs the existing request-retention treatment, not just createFiniteOwnerRequestLease when a cookie happens to exist. Across native boundaries, preserve the actual sender/receiver callgraph and original absolute deadline/abort; never serialize a WeakMap brand or accept caller-authored “genuine” metadata. Source composition must prove this explicitly.

## Bounded next task and tests

Next Unit 2a: implement strict issuance records, the source-only fence schema, fixed authorization/consume/read-grant SQL path, confirmed serialized cleanup barrier and grant-only primary reduction in an unmounted native fixture, reserving original M/A preconnection identity before writes. Do not implement notice publication, nominal handoff, runtime routes or a new generic issuer framework in that slice. Closure: an actual grant committed before a held/lost DO GrantLink ACK is recovered and revoked by its original reserved UUID after a confirmed primary fence; a grant ordered after that fence cannot insert, even with a stale JavaScript timestamp; the queued original-deadline tests also deny late writes; no journal outcome can replay it.

Then Unit 2b: add existing notice-ticket/requestId correlation and original monitoring reduction, fixed native M-to-QA composition/retention, and remaining exact deployment cleanup qualification. Neither slice alone removes the actual owner pending boundary.

Required causal cases:
1. Reserve transaction commit-unknown/sync/readback lost before D1: zero D1 issue; reconstructed record remains cleanup data only.
2. Authorization INSERT committed but ACK lost; consume committed but grant not issued; grant issued/committed but ACK or GrantLink lost; SDK completion held/rejected after grant commit. Each recovers only exact reserved IDs and preserves uncertainty.
3. Same consent concurrent POST, repeated GET, collision/foreign reserved UUID, clone source/admission, missing cookie, stale Access/CSRF/source/owner/project/client/resource; no ordinary fallback, no second grant.
4. Queue each actual finite granting statement past D and C0; original SQL returns no mutation. Freeze concurrent with new intent/OPEN-fence/consume/grant; both orders of grant INSERT versus terminal barrier, lost barrier ACK, closed-first upsert versus delayed OPEN insert, identity collision, and restart/post-barrier primary read. Preserve request retention until actual settlement/cancellation.
5. Read grant with no notice; known notice commit with lost forward ACK; notice ticket without POST; revoked grant; foreign/newer notice sequence; no fabricated consent and no broad revocation.
6. Original parent child5s/request30s, source ceiling, SQL database-time skew/failure and holder changes; conservative pending without reset.
7. Same request factual read before and after real adoption; foreign ambient/root/holders denied; readonly never upgrades.
8. Assert actual M contains AFW_FINITE_TRIAL_CONTROL with exact QA namespace/script and source/version holders. No inference from d6fc or a fabricated AFW_INDEPENDENT_CLOSURE canary binding. Missing native forward stays pending.

Native-clock proof boundary: genuine capsule fixtures currently use a JavaScript time before the expired 3Nov source ceiling; SQLite unixepoch('subsec') is not automatically that mocked clock. Qualify actual SQL fence/barrier ordering with native database-time component rows, and qualify genuine capsule/original-lease correlation separately. Any substituted SQL clock is explicitly SYN and cannot prove native database-time ordering. Do not add a production clock injection, renew the source ceiling or weaken deadline predicates to make a fixture green. Final real-clock/full composition remains a later qualification; this report does not design an extra harness.

No implementation/test success is claimed by this report. Unit 1 remains independently under review. Original I0+300000, C0=I0+900000, C1=C0+180000, commandBy-510000 and launchT0+150000 remain unchanged. Source ceiling 3Nov02:59 stays expired. No actual Entry/provider/keys/permissions/OTP/deploy/cron/monitor/other-project/Max/mail/chat/automation work. One consuming occurrence remains reserved for coordinated PC-off; operationalReadiness=false; completePackage=false; PCoff=false.
