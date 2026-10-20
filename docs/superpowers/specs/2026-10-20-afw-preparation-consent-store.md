# AFW preparation consent persistence — source design
19oct2026Argentina /20octUTC. Basef00affa4b41aef69998c588a1966a58cbafed51e; PR513 accepted; issue497#6280939851.
Parent:2026-10-19-afw-preparation-consent-mount.md Step2. Owner delegated bounded source decisions; no runtime authorization from this artifact.

## Problem and boundary
Existing delegated_consent_sessions lacks original start/profile/request binding and existing createGrant +consumeConsent are separate writes. CI512 deliberately reconstructed a start in a CI-only kind; do NOT promote that encoding.
Add own explicit source table delegated_preparation_consents OUTSIDE drizzle. No ALTER of current read profile/store, no installed migration or production import/route. This is a storage primitive, NOT Access/SDK/CSRF verifier, consent HTTP host or token issuer.
Factory requires exact enabled=true, fixed preparation.v1 server profile(project/client/resource/original trial), fresh trusted primary factory, trusted now, ORIGINAL opaque request lease. Missing opt-in touches no dependencies. No wall/monotonic reconstruction across requests; absolute transaction/trial dates persisted.
Trusted caller passes only hashed SDK handle/original parsed request, verified subject,  original requested scopes/start/end and current expected revision. Never accept these as public/tool/form authority; future host must derive/check them.

## Persistence and concurrency
GrantID is generated internally once; no caller-supplied grant identity. Table explicitly records profile/request hash/subject/client/project/resource/original scopes/start/end/trial; verified source revision/site/hostname/origin/claim/verifiedAt; server-generated stable UNIQUE grantID; attempt choice/time/expiry/ISO dates and private decisionNonce; states pending/reserved/admitted/cancelled.
Initial pending row creates no grant/capsule/reservation. Begin immutable same-packet replay reads existing original state; conflicting context never overwrites or renews.
First reserve the one attempt with pending->reserved and durable ACK; reserved authorizes no grant. Only that fresh acknowledged writer may continue in the SAME request/lease. Unknown reservation ACK or later failure leaves reserved and cannot be retried by decide or inspect. Conditional UPDATE reserved->admitted is ONE SQL statement. Exact AFTER transition trigger inserts the application grant in the existing grant table; SQLite statement rollback makes decision+grant atomic, including grant constraint/trigger failures. No two independently acknowledged writes or D1 batch success inference.
Cancellation is pending/reserved->cancelled without grant; prior proposed choice/history is retained. Terminal decision and identity/history immutable, no delete. Duplicate/same or different decision never creates another grant; read->draft upgrade is rejected.
A server-generated attempt nonce plus authoritative read identifies the one fresh acknowledged writer. Unknown ACK =>unknown_ack, NO SDK completion authority; inspect is read-only with fresh lease/same bindings and freshDecision=false. No retry/new key/code/token.
Application grant is unexchanged; grantStored does not mean SDK code/token issued. Existing revokeGrant is authoritative and independent of new consent schema/domain changes; do not implement a competing revoke authority or mutate historical decision to pretend cancellation.

## Admission and clocks
Begin and positive decision need strict exact own schema + existing capsule preparation schema, fresh primary owner role/revision, registry/claim verified current<=90days, website canonical origin consistency. SQL final statement rechecks current owner/revision/site/claim/window at its linearization point; check clock/config/lease around every await and final receipt.
Profile requires HTTPS canonical resource and exact client/project pins. Only READ or READ+PREPARE, no evidence/refresh. Choice via existing pure policy using PERSISTED original dates, expiry min(original ends/approval+10min); no Date.now-start subtraction.
Reconciliation may not disclose a result under changed owner/claim/revision; grant revocation checked primary. Cancellation reduces privilege and may proceed under original subject binding even if source changed; it cannot issue a grant.
Each call shares original opaque5s lease (body/auth time already spent), no renewed budget; config or clock drift latches closed. DB current time also bounds admission, independent of host time.
Own exact schema check reads metadata/compiles columns only, no installer. Source DDL guards state/history and produces canonical UTC grant dates from supplied validated ISO values. No DROP or data rollback.

## Acceptance and remaining gates
NodeSQLite adapter actual SQL/transactions and native workerd D1 prove CAS/trigger rollback/ACK/concurrency. Synthetic owned data only. No SDK/human/production auth certification;512 already proves SDK protocol separately, its fixture is not silently rewritten.
Tests cover defaultclosed/getters/bounds/pins/window, original dates, explicit read downgrade/invalid upgrade,1winner, cancellation, immutablehistory, primary owner/claim/revision/freshness/schema drift, no orphan grant on trigger failure, unknownACK+read-only inspect, lost beginACK, expiry/clock/lease cutoff, revocation and retained history, installed old data preserved.
Production SDK/profile/store orchestration, failure cleanup/code completion/exchange/revocation integration, authenticated view/MCP mount, populated migration and NEW human trial remain. G2 CLOSED noOTP; G3Container02382110, event/usefulturn/nativeunsubscribe/PCoff/Max unaccepted; operationalReadiness=false.
Rollback reviewed source revert; no live data/config/custody change.
