# AFW private own-source intake HTTP design
Date2026-10-21. PROJECT AFW; REPOSITORY tokenizartinfo-ops/agent-friendly-web; ENVIRONMENT source-only/GitHub Actions; ORIGIN future https://preparation-canary.agentfriendlyweb.dev; RESOURCE_TYPE detached HTTP source; ALLOWED_ACTION source/tests/CI/merge; ROLLBACK source revert, no data/schema/runtime change.
Approved direction: issue497/comment6319885074. Routine implementation choices delegated by owner; no live publication/grants in this increment.
Goal: review basic own-site data, explicitly save once, and inspect an uncertain original without another write.

## Boundary and contract
createPreparationSourceIntakeHttpHost({enabled,issuer,env,profile,csrfKey,accessVerifier?,now?,monotonic?}).
Defaultoff returns before reading env/clocks/key/DB/body/identity.
Only GET/POST /source/new, exact private issuer/noquery/hash; separate AFW_PREPARATION_SOURCE_CREATE_ENABLED==='true'. No Worker mounting in this PR.
Profile EXACT existing afw.preparation-source-intake.v1 with pinned subject/op/original start/end<=10min. No bootstrap/owner from email or request.
Use verifyCloudflareAccessJwtWithExpiry same verified signed payload; subject/email/expiry server only. Actor fields never in body/output.
csrfKey is trusted nonextractable 256-bit HMAC-SHA256 CryptoKey with sign/verify, not plaintext token/header, and generated ONLY ephemerally in CI here. Future sameWorker secret custody is separate; no credential creation now.
Env pins flag/Accessaud/team/limiter; DB accessed lazily on admittedPOST ONLY, binding/method pinned through request. NoDB/KV/CSRF-persistence onGET.

## CSRF and input
HTML form, no script; __Host-AFWSourceCSRF cookie Secure/HttpOnly/SameSiteStrict/Path=/, noDomain, expires at min(originalprofile,verifiedJWTexp).
Token random32bytes + HMAC-SHA256 over domain/issuer/profile/subject/operation/originalwindow/verifiedexpiry/hash of SAME VERIFIED assertion/nonce. Header whitespace normalized consistently with verifier. Constant-time cookie comparison and WebCrypto verify for MAC.
Cookie+explicit hidden token required once, duplicates denied; changing identity/session/profile/window/key fails. No naive cookie-only defense. HMAC key NEVER derived from JWT/APIkey/email/date.
POST Origin exact mandatory, Sec-Fetch-Site ifpresent same-origin; noCORS. URLencoded UTF8 only, no contentencoding; declared/streamed4096bytes, bounded/cancelled reader. Exactfields csrf/decision/website/organization/confirmCreate, duplicate/unknown rejected.
Only fixed ownwebsite root https://agentfriendlyweb.dev and organization text<=200; defaultAgentFriendlyWeb is a reviewable proposal. save requires confirmCreate=yes; inspect does not. Server builds same ORIGINAL canonical store DTO with confirmCreate=true solely as readonly comparison input for inspect, never creation consent.
No owner/project/grant/claim from request, no arbitrary URLs or network calls.

## Lifetime and side effects
Original opaque request lease5s before parsing/verification; optional trusted upstream lease reused, never refreshed. Guard afterawaits includes options/profile/env/DB pins, monotonic abort/expiry and signed exp.
GET0DB/no sourcewrites. Admittedsave uses existing store.create exactlyonce, admittedinspect uses ONLY store.inspect. SameD1 first-primary; canonical schema key and SQL original fences reused unchanged.
No automatic retry/compensatingDELETE. UnknownACK preserves data and returns503 recovery link. HTTP errors never echo submitted CSRF/cookie/JWT/email/private errors. Ruling:503 recovery page does not embed the old CSRF token/form; guides reopening and consulting with original values. This adds a fresh GET but cannot repeat a write.
Success/absence can show usable form; success explicitly does not verifydomain/connectassistant/publish/charge. Conflict409 preserves legitimate changes; absence does not prove prior attempt failed. Response result uses allowlisted codes and ownedprojectRef as nonvisual metadata only.
No new claims, grants, capsules, schema, app, OTP, event, Container or PC-off claim.

## Tests and acceptance
Tests-first missingfactory RED beforebundle; actual workerd+D1 canonical11table schema and ephemeral RS256 assertions/HMAC key; no fake signed identity.
AdmissionCSRF/method/MIME/body/Origin/foreignsubject/session/replay/expiry/abort/drift/defaultoff/GET0DB; confirmedduplicate0batch; lostACKcommit→inspect0batch; failedACKabsence→inspect0batch; conflictpreserved; private errors sane.
One fresh wholebranch review; Important/Critical one RED→GREEN repair, Minor ledger/no rereview. FullCI/lint/five builds plus focalcloud. UI mobile/desktop verification and mounting separate next task after source acceptance.
Sources reviewed21oct: https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html#signed-double-submit-cookie-recommended and https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Set-Cookie#cookie_prefixes .
operationalReadiness=false even if source tests pass.
\nRuling21oct: include browser acceptance in this same branch before its single final review to avoid a second standalone UI PR. Source mounting remains separate. Native checkbox required stops uncheckedsave while inspect's formnovalidate bypasses it; server confirmation remains mandatory independently. Website root is normalized by unchanged core to trailing slash; native test expects that canonical stored value.\n