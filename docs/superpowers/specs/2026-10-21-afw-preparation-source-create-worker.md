# AFW source-create Worker composition
2026-10-21; source-only, AFW/tokenizartinfo-ops/agent-friendly-web.
Goal: select /source/new only through AFW_PREPARATION_SOURCE_CREATE_ENABLED, independent of session-read flag and OAuth/router/project/client pins. Existing routes preserve their gates.
Prerequisites: accepted detached HTTP547 + prior Worker545, source-session and lease unchanged.
Server profile reuses canonical SOURCE_SESSION_OPERATION_KEY/SUBJECT/STARTED_AT/EXPIRES_AT but MUST have real pinned nonempty subject; set profileId afw.preparation-source-intake.v1. No bootstrap writes.
Dedicated server binding AFW_PREPARATION_SOURCE_CSRF_SECRET is64lowercasehex =32randombytes from FUTURE private custody, never API/JWT/signing token. No secret creation here. Validate format and import nonextractable HMAC-SHA256(sign+verify) only AFTER selected createflag=true and original lease already running. Do not log/serialize key material.
Creation-specific pins include CREATEflag, original sessionprofilefields and raw dedicatedsecret; after every import/verify await same values must hold. Read/sessionflag cannot activate writes; createflag cannot activate OAuth/other routes.
Pass same WeakMap5s ingress lease to HTTP host; keyimport/config consume its original budget. No default-off body/key/DB/identity/clocks. SameD1binding lazy inside admittedPOST host. No HTTP source/SQL/crypto changes beyond composition.
Trusted existing sourceAccessVerifier option yields signed expiry for both human source adapters; legacy accessVerifier unaffected.
Native actualWorker+canonicalD1+ephemeralRS256/raw32byteCIsecret exercises source contract16cases, closed other paths, missing/malformed secret before identity, originalbudget and secret/config drift. No source sim-success; real root importKey.
No live binding/key/config/route/Access grant/schema publication. Rollback source revert; same original resources and journals preserved. operationalReadiness=false/noPCoff/Max/events.
