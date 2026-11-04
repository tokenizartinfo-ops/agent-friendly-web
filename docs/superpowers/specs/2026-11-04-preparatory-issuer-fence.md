# Preparatory issuer fence and grant-only cleanup — Unit 2a

SOURCE-ONLY. PROJECT AFW; REPOSITORY tokenizartinfo-ops/agent-friendly-web (1347578006); ENVIRONMENT isolated feature source/GitHub Actions; ORIGIN delegated-canary.agentfriendlyweb.dev not contacted; RESOURCE_TYPE fixed private QA SQL/journal components; RESOURCE_ID existing QA actor afw-own-successor-closure-v1 / QA namespace070c4a7708eb4592a3ded7c117a88225 and RELEASE_DB6a728254-1494-4039-802e-b39288a55fcc as source identities, NOT remote execution targets. ALLOWED_ACTION source/schema-file edits and credential-free native tests; ROLLBACK revert source unit before promotion. No remote DDL/schema install, provider, Entry, deployment, secret/permission/OTP/OAuth, cron, monitor, Max or other-project action.

## Chosen design and scope
Follow corrected architecture report docs/superpowers/reports/2026-11-04-preparatory-issuer-correlation-design.md at8e06dae155353374296bd2ba3ddb9fb55db68387 (separate docs branch). Independent builder check BUILDABLE; root selected one narrow monotonic D1 fence table, original SDK authHash/server grantUUID reservation, exact primary barrier then grant-only observation/reduction. Ordinary consent/grant APIs stay unchanged. No fabricated monitoring consent, scan by owner/client, new approval framework, generic database/provider callback or successful DTO authority.

This is the UNMOUNTED fixed QA journal + SQL component. Fixtures may supply explicitly synthetic internal scope DATA; that proves ordering/recovery, NOT actual SDK approval/native M→QA provenance/owner consent. No runtime route, source/forward stub, worker mount or actual pending host is enabled. Unit2b later owns concrete source/selector/SDK/native forwarding/retention/notice composition and deployment cleanup; Unit3 owns the actual single-alarm handoff. Source ceiling remains2026-11-03T02:59:00Z expired. No source/live eligibility by a codec or fixture.

## Clock and primary rulings
Identity fixes original I0, forwardUntil=C0=I0+900000 and cleanupUntil=C1=C0+180000. Keep initial technicalI0+300000, commandBy-510000, nominalC0n=T0+240000/C1n=T0+420000/R1=T0+480000 and launchT0+150000 unchanged.
Terminal fencing ONLY reduces permission. Table CHECK permits reserved_at<=fenced_at<original cleanup_until; it does NOT authorize timing. CURRENT prehandoff cleanup coordinator still requires initial C0. Only a future qualified immutable Unit3 handoff derives its earlier original C0n and clipped C1n for the private SQL window. Never accept a public caller clock/schedule or change forward_until/cleanup_until. Do not hardcode fenced_at>=initialC0 in storage: that would break earlier nominal cleanup. Before actual source composition these remain internal component DATA, not an authority API.
Each actual statement gets the existing original guarded lease and a fixed {startedAt,deadline} window, <=5000ms, clipped by its parent's unchanged end, actual identity/approval/source/consent/grant expiry and appropriate forward/cleanup cutoff. No method constructs a new30s request, refreshes a deadline or treats abort as settlement.
SQL execution time, not reserved JavaScript correlation time, is the mutation fence. Use native CAST(unixepoch('subsec')*1000 AS INTEGER) and explicit canonical ISO TEXT→epoch-ms conversion for existing expiry columns. Schema/store preflight must fail closed if required SQL clock/conversion/shape is unsupported; no JS-time fallback. Consent/grant expiry must be tested against SQL execution time IN EVERY mutating statement, not only expires_at>reservedConsumeAt. Canonical ISO strings and INTEGER milliseconds are different domains.
Use captured env.RELEASE_DB.withSession('first-primary') for actual fixed operations; independent primary readback is a NEW first-primary session with the SELECT as first query. A first-primary session's later reads may use sequentially consistent replicas; do not claim they are all physically primary.
Primary design references: [D1 sessions](https://developers.cloudflare.com/d1/worker-api/d1-database/), [D1 SQL](https://developers.cloudflare.com/d1/sql-api/sql-statements/), [SQLite time](https://www.sqlite.org/lang_datefunc.html). Native tests must qualify actual supported behavior; docs alone are not operational evidence.

## Fixed data and journal
Add lib/mcp-qa-finite-preparation-issuer-records.mjs. Export sealFinitePreparationIssuerRecord(kind,input), encodeFinitePreparationIssuerRecord(kind,input), decodeFinitePreparationIssuerRecord(kind,raw), FINITE_PREPARATION_ISSUER_PREFIX='afw.finite-preparation-issuer.v1:'. Canonical own-data/domain SHA256, <=16384bytes/record, reject prototypes/accessors/symbols/unknown fields/invalid timestamps before getters. Reuse existing canonical/own/hash helpers. DATA only.

Identity exact fields:
preconnectionId,enrollmentHash,capsuleHash,sourceRevision,qaVersionId,actorId,subject,accessRealmHash,projectId,projectRevision,clientId,resource,authorizationHash,grantId,requestedScopes,consentExpiresAt,I0,C0,C1,reservedAt,identityHash.
Use existing hex40/64/UUID/project revision/source-origin/resource/scope grammars. resource fixed https://delegated-canary.agentfriendlyweb.dev/mcp. subject/project/client bounded200chars as existing records; requested scopes current read enum, no new scopes/default evidence. consentExpiresAt canonical ISO with reservedAt < parsed consentExpiresAt <=C0; reservedAt in[I0,C0). identityHash domain 'afw.finite-preparation-issuer-identity.v1' over all other exact fields. This hash is not a capability.

Kinds, with purpose 'afw.finite-preparation-issuer-'+kind.toLowerCase()+'.v1' and recordHash:
- Reservation: identity,requestHash,issuedAt,deadline. Same actual SDK handle HASH, one server-generated grant UUID for original preId, no raw handle/cookie/JWT/token/SDK output.
- Send: identityHash,reservationHash,operation,requestId,requestHash,issuedAt,deadline. operation one of open_fence,authorization,consume,grant,close_fence,revoke_grant; requestId null except close_fence/revoke_grant UUID, reserved before issue.
- Ack: sendHash,rowHash,outcome,observedAt. rowHash hex64 or null only for no_mutation; outcome applied/no_mutation. Actual database fields/rows determine ACK, not caller success.
- Freeze: identityHash,reservationHash,frozenAt. Timing checked by fixed active cleanup owner, not codec data.

Add createFinitePreparationIssuerJournal({ctx,env}) in lib/mcp-qa-finite-preparation-issuer-journal.mjs, closing actual native storage/actor/QA env holders. Key family prefix+preconnectionId+':' with reservation, operation+':send', operation+':ack', freeze. Fixed appendReservation/appendSend/appendAck/read/freeze methods accept strict records and original guarded lease, never arbitrary key/query/callback. Each append actual transaction final return→sync→exactreadback; no replacing/deleting an old record or reconstructing an issuing continuation from identical data. A single AuthorizationReservation; new request cannot select a fresh grantID for consumed/unknown original attempt. Exact journal signatures: appendReservation(record,lease), appendSend({preconnectionId,record},lease), appendAck({preconnectionId,operation,record},lease), read({preconnectionId},lease), freeze({preconnectionId,record},lease). read returns frozen {reservation,freeze,operations} with null-or-record values and fixed per-operation send/ack pairs; reject unrecognized keys/operations. Existing identical append is factual existing/denial, NEVER recorded as a fresh successful issuing continuation. Current source composer does not expose this factory as RPC. Component data is not actual admitted source; Unit2b must derive it from qualified original enrollment/capsule/owner/SDK path and generate the server UUID before actual reservation. Unit2a's fixture can generate that UUID internally; a codec or DATA argument does not prove actual SDK/native producer authorization.

## Narrow source-only schema
Create db/finite-preparation-issuer-fences.sql:
finite_preparation_issuer_fences(
 preconnection_id TEXT PRIMARY KEY,
 authorization_hash TEXT UNIQUE NOT NULL,
 grant_id TEXT UNIQUE NOT NULL,
 enrollment_hash TEXT NOT NULL,
 identity_hash TEXT NOT NULL,
 reserved_at INTEGER NOT NULL,
 forward_until INTEGER NOT NULL,
 cleanup_until INTEGER NOT NULL,
 fence_request_id TEXT NULL,
 fenced_at INTEGER NULL
).
CHECK key/hash/UUID/time/paired-null grammars and forward_until<cleanup_until, reserved_at<forward_until, reserved_at<=fenced_at<cleanup_until when terminal. No foreign key to a not-yet-existing grant/consent: reservation precedes those business rows.
Named triggers no_delete, immutable_identity and terminal_fence under this table prefix: no delete/immutable tuple change; fence fields may only move pairedNULL→terminal or remain identical, never reopen/change terminal identity/time. OPEN uses plain INSERT SELECT, never upsert/UPDATE/REPLACE. Late OPEN cannot undo closed-first tombstone. Inspect actual schema/trigger definitions in preflight, not names alone. No auto-install/fallback at runtime. Do not alter ordinary db/schema.ts or existing business-table semantics unless a concrete schema mismatch requires root ruling. Remote installation/preservation is separately pending.

## Fixed QA SQL store interface
Add createFinitePreparationIssuerStore({ctx,env}) in lib/mcp-qa-finite-preparation-issuer-store.mjs. Actual ctx/env/RELEASE_DB captured/rechecked; no supplied db/now/SQL/fetch/URL/token. Existing lease contract/retention applies before/after every actual await; caller can logically timeout while the actual operation stays retained. Factory itself is not business authorization and remains unmounted.
Expose only these internal fixed methods, each (options,lease):
- openFence({identity,window})
- insertAuthorization({identity,window})
- consumeAuthorization({identity,consumedAt,window})
- insertReadGrant({identity,consumption,grant,window})
- closeFence({identity,fenceRequestId,window})
- reconcileFence({identity,fenceRequestId,window})
- observeGrant({identity,barrier,expectedGrant,window})
- revokeGrant({identity,barrier,observation,window})
window={startedAt,deadline}. grant/expectedGrant exact {scopes,createdAt,expiresAt}; all dates canonical ISO, scope subset verified against exact reserved consent. No arbitrary targets/mutations; all SQL prepared and bound fixed tables/resource selectors.
consumption is only the actual successful non-null UPDATE RETURNING result from THIS store instance/surviving invocation, privately recognized and one-use before grant issue; cloned/serialized/SELECT-reconstructed consumed rows cannot issue. This is a SQL continuation witness, not a new owner approval protocol. A consumed consent without grant is terminal valid, never repaired.
barrier is only an actual acknowledged terminal row plus exact fresh-primary readback, or exact same-requestID primary reconciliation; privately recognized factual result tied to store/identity/holders. Cloned/open/foreign barrier cannot support absence/revocation. observation likewise actual exact read result, not supplied successful row DTO. No private witness can authorize an HTTP caller or survive serialization as a permission.

All finite granting SQL requires exact unfenced row matching preId/authHash/reservedGrantId/enrollmentHash/identityHash and original times. Include current site_projects id/user_id/revision and original client/resource/scope/consent tuple where applicable:
- OPEN INSERT SELECT before consent, SQLnow>=window.startedAt and<deadline and<C0; exact current owner/project/revision.
- Consent INSERT SELECT into delegated_consent_sessions(handle_hash,user_id,kind,project_id,client_id,resource,scopes_json,expires_at,consumed_at). kind authorize; scopes JSON exact reserved requested list; consumed_at ''. No replace/retry.
- Consume UPDATE ... consumed_at=reserved canonical consumedAt WHERE exact tuple, consumed_at='', original expires_at exact, current owner/revision, actual SQLnow<consent expiry AND request deadline/C0; RETURNING exact actual fields. reservedConsumeAt is correlation only.
- Grant INSERT SELECT reserved grant UUID FROM exact consumed consent + exact unfenced row + current owned project/revision; scopes approved subset of original scopes_json; created/expires exact reserved canonical values, expires<=consent/C0/original limits. Actual SQLnow<both consent and grant expiry AND original deadline/C0. Preserve exchanged_at default. Only genuine actual consumption witness proceeds. One attempted grant, no new ID/retry after unknown.
- Terminal close-first upsert derives fenced_at from SQLnow, immutable row conflict predicate and same requestID, never clearing/replacing old terminal fields. It may insert terminal row even if original OPEN pending. SQLnow>=the PRIVATE current owner's original window.startedAt and<min(window.deadline,originalC1). No caller-provided :cleanupNow timestamp. Table permits earlier terminal reduction; actual source coordinator timing remains unmounted/qualified later.
- Actual ACK+new first-primary exact readback required before any grant lookup/absence/revocation. Unknown ACK preserves same FenceSend; reconcile only its exact requestID/immutable tuple/server fencedAt. No new fence identity or automatic resending. Same-row primary serialized barrier orders issued grant SQL: before barrier committed and observable; after barrier cannot join unfenced row. Confirm in native tests, not from JS timers.
- observeGrant queries ONLY original reserved UUID and validates exact consumed consent/original owner/project/client/resource/scopes/created/expires; no notice required. Only post-confirmed barrier can absent be meaningful. Foreign/new owner/revision/identity mismatch fails closed.
- revokeGrant updates ONLY revoked_at of that exact immutable grant, SQL-generated canonical time, original cleanup window/confirmed fence/current owner/revision. Preserve legitimate exchanged_at and an existing revocation timestamp; report already_revoked instead of overwriting it. Do not fabricate consumption, alter original expiry or create monitoring consent.

The store/schema preflight is fixed read-only SQL and must reject missing/tampered table/triggers/unsupported clock before effects. Ordinary createDelegatedOAuthStore remains unchanged and is NOT a fallback.

## Integration boundary and native proof
Do NOT mount producers or call SDK. Real M has AFW_FINITE_TRIAL_CONTROL→existing fixed QA, but a profile is not native provenance. Unit2b must prove actual sender/receiver, original deadline/abort/retention, actual SDK approve/CSRF and original A selector. Its granting branch must deny missing cookie/failed native hook rather than ordinary fallback; not implemented here.
Add a conservative fixed initial-alarm refusal if issuer-prefix data exists while its full cleanup consumer is unqualified. No new alarm/handler, no restoration/permission claim from issuer data. Existing Unit1 enrollment/no-issuer exact closed_ui recovery remains unchanged. This prevents newly introduced unresolved issuer records being silently ignored; complete consumer belongs Unit2b.

Tests via existing Node22 lock/Miniflare actual D1+DO:
1. Strict records/schema triggers/clock preflight; OPEN vs closed-first in both orders; immutable identity/terminal/delete/collision rejection; no grant/consent invented by fence.
2. Actual finite consent/consume/grant SQL queued beyond original statement D, consent expiry, grant expiry and C0; stale JS consumedAt does not bypass actual DBnow, ISO/integer never compared implicitly.
3. Grant INSERT before barrier with response/DO link ACK held: exact reserved UUID found and revoked after confirmed barrier; no notice row required. After barrier grant INSERT mutates0, including delayed OPEN/consume/grant work. Unknown fence ACK/restart exact reconcile; never claim absent before confirmed primary barrier.
4. Genuine actual UPDATE RETURNING witness only; clone/foreign/store/lease drift/replay/SELECT reconstruction denies grant. consumed/no grant terminal; no secondID/repair.
5. Existing/revoked grant, foreign project/revision/client/resource/scopes/times; preserve legitimate exchanged_at/history; no broad scan or changes to unrelated rows.
6. Native journal transaction final throw/post-native-commit hold/sync/readback loss: no subsequent SQL issue; actual pending work remains retained through settlement; no transaction-interior release deadlock.
7. Record original capsule/enrollment selector linkage separately using genuine pre-Nov3 capsule fixtures where needed. Real SQL clock tests use current native database-time component rows and explicitly SYN internal identities, not a forged live capsule. Any clock substitution is SYN; no production clock injection/source ceiling renewal. No claim of full source/SDK/remote composition from component green.
8. Initial alarm sees unknown issuer-prefix→admin_pending; no issuer rows→Unit1 existing recovery unaffected; ordinary OAuth/store tests unchanged.

Meaningful RED for absent new SQL/fence feature, then actual native ordering/deadline/recovery assertions. Fixture parse/RPC failures are not causal RED. TDD may establish missing new interface/schema explicitly; do not substitute ordinary issuer as a fake production finite fallback.
Report exact BASE/code/reportHEAD, RED/GREEN/commands/job/attempt/counts/warnings, actual-vs-SYN, SQL schema hash and unchanged existing-row checks. Scoped tests/lint; runtime graph only changes by alarm refusal, so relevant compiler check once if needed. Remove temporary qualifier before delivery; no full/unrelated repeats absent concern. operationalReadiness=false;completePackage=false;PCoff=false.
