# C2 RED→WR finite guard: static design boundary
14 Nov 2026; Source cfa6c0edf1725767f57933b9155f8fbf01e0e78f; accepted semantic design1825b169. Public GitDB DATA only; no execution/implementation/refs/runs/runtime/keys/local Source. One unattached report blob.

## Minimum integration
Keep T0/N1 and C0/C1/R1. Replace RED's wrong containment with a POSITIVE fixed WR primary guard for withdrawal/observation. No new RPC, caller fact/callback, registration or capability.

RED signature stays createFiniteOwnReductionActions({ctx,env,control,program,programSourceRevision,close,now}), with withdraw/close/read(value,assertParent). RED11–19 captures control/program/raw-policy/native event-policy/DB/holders; RED24 passes check (parent+C0/C1+monotonic30s) as WR.now. Keep WR's permission-only Reduction/Observation exports and legacy createOwnPermissionWithdrawal unchanged.

Private finite expectation {monitorHash,T0,N1,R1} comes only from RED's control, required in permission-only WR; it grants no authority. Legacy requestStop grammar/behavior stays. Reuse PR.hashFiniteOwnerEvidence; no digest callback/new export.

WR's fixed first-primary query should expose separately:
- full ORIGINAL c row: grant/project/user/client/resource, sequence, revision, action, purpose, request_id, issued_at, expires_at;
- actual SAME g row: identity, scopes_json, created_at, expires_at, revoked_at;
- current/latest l row and database_now already used for reconciliation.
Map original c to PR's exact semantic event and require its digest==expected monitorHash on EVERY read. Do not hash latest l when it is a revoke. Original policy tuple must exactly match c. The original monitor request_id comes from that qualified query; it differs from policy.requestId (withdrawal idempotency UUID).

Extend WR85–116's fixed query. Retain the first hash-qualified original request_id internally; include it/all original fields in subsequent SQL predicates and mutation WHERE/beforeCommit to fence read→queued-write changes. Keep SQL deadlines/scoped-DB/now checks around awaits. Two-readback equality includes full original row, grant coverage AND terminal state, excluding only database_now (WR132–138,178–182). Mismatch denies effects/completion; no SEND retry.

## Positive coverage and consumed-read boundary
Guard predicate (historical facts, not new live authority):
1. Same grant/owner/project/client/resource; valid stored scopes include afw:project:read, with exact grant scope/schema validation. Valid canonical created/expiry timestamps; grant createdAt<=originalMonitor.issuedAt<=T0.
2. Original monitor action/purpose/tuple and FULL PR digest match; monitor duration<=600000. min(actual grant expiry, original monitor expiry)>R1+30000 (=T0+510000). Keep OP's STRICT > rule, not >=. Event interval remains T0/N1; withdrawal interval remains C0/C1. Never extend either authorization.
3. PREARM must qualify consumed authorizationHash→GrantLink→same grant, granted scopes within consumed requested scopes, same owner/project (OP280–298,395–405,431–435). Material/control binds selectors.consentHash/monitorHash to this provenance. WR lacks authorizationHash: it cannot locate/rederive consumed-read digest from consentHash. No guessed join/raw handle or claim of WR consumed verification.
4. WR proves current stored coverage. Exact ORIGINAL prepared minimum additionally needs source-held SetupContext.ownerPreparation.connection.permissionExpiresAt and correlated SetupContext hash (OP431/435; SET92). Actual minimum must match this commitment and exceed R1+30000. This existing field/receipt association must be bound to the same control by the material factory; no invented/RPC expiry. RED/WR alone cannot claim that provenance.

Nominal PREARM/ARM/admission keep active/unrevoked checks. Cleanup accepts the exact original row with valid later monitoring revoke/read revoked_at (WR106–115); never require unrevoked after success. Keep RED issued-before-one-effect/reconcile-only observation (26–35), WR append/CAS/idempotency and independent read revocation (149–168); no unknown-ACK resend or physical-stop claim.

Parent gap: RED21 defaults assertParent to noop; CH33–35 omits it. Fixed Source must demonstrate captured now reaches the ORIGINAL native parent or narrowly propagate existing assertParent through CH. No external callback/new parent; constructor-local30s alone is insufficient. Composition decision remains unresolved.

## Before / fixed / mutant controls (not executed)
| Case | Current before | Fixed required | Mutant that must fail suite |
| --- | --- | --- | --- |
| Canonical prearm: consent beforeT0/expiry>R1+30s; finite event T0/N1 | RED15 rejects | Same row/candidate/clocks succeeds in bounded cleanup | Restore old containment |
| Change ONLY original request_id or monitorHash; latest tuple otherwise same | No full digest guard | Deny; zero business effects/completion | Remove digest/request_id linkage |
| Foreign grant/owner/project/client/resource; changed original sequence/revision/times/purpose | Existing tuple guards partly cover | Deny including complete row | Drop one fixed correlation |
| Grant scope missing read, invalid created/expiry, min expiry==R1+30s | Coverage not checked here | Deny; strict boundary | Remove scope/coverage or change > to >= |
| Original row/grant coverage changes between two primary reads or read→queued write | Request_id invisible today | Deny/no false receipt; SQL fence catches queued mutation | Hash first read only / omit SQL request_id |
| Already revoked; lost ACK; existing issued/complete journal | Reconcile path exists | Same original digest; no INSERT/UPDATE/close resend | Require unrevoked / retry issued |
| Parent expires while D1 pending; late ACK; C1 boundary | Local clock exists; parent route unresolved | No new authority/completion; retain issued uncertainty | Fresh timeout/noop parent |
| Historical program substituted or policy bytes/deadlines widened | Existing checks | Still deny | Bypass candidate/raw-policy/clock checks |

Current reduction test c749d84d5a654dd0ad3bc67c53a498f45dac5939:24/44–45 uses identical monitor/event intervals; fixture8297a9ae39fd4bdd228a2b1f64105683cb768203:21 uses dummy monitorHash. Extend test/mcp-own-finite-reduction-native.test.mjs with real digest/distinct intervals/exact row+journal assertions; WR read/queued-write cases in test/mcp-own-permission-withdrawal.test.mjs. Test fixed composition, not injected authority. Legacy WH/native tests stay regression-only.

Production: RED+WR; PR unchanged; CH only for required parent propagation. Source material's prepared/consumed provenance binding remains prerequisite. No new exports or C2 Core edits.

Pins: RED 6ce7798ece537f41823c17186336b6f8ac08d90f:11–49; WR c0e3551c983e42104e6f2706a58fdc27bf746033:27–116,132–199; PR e9b66f68b6dbabbfecc46072949a0d5d9f059141:144–162; OP152e730f83af7ef063b6b1db89f8b0a779c2b60e:280–298,395–435; SET34285e7c8ee3d9838763344edba2dcf6ce33da9b:84–94; CHb77bba634c999e7a8a7d02aae8d81a4627ff5f4b:13–35. WH untouched.


## Root disposition — next guard boundary

Accepted as the minimum integration/test input, not an implementation release. Two source-composition obligations remain explicit: (a) cleanup WR cannot rederive original consumed authorization from consentHash; prearm/material must bind existing GrantLink.authorizationHash and SetupContext.ownerPreparation.connection.permissionExpiresAt to the same canonical control, while WR freshly proves same stored grant/scope and original monitor full-row digest/coverage; (b) the actual compiled cleanup host must prove captured now reaches the ORIGINAL native parent on every check, or narrowly propagate the existing parent check internally. RED's local30s/noop default and constructor branding are not that proof. Prefer proving the original source-owned clock at composition; no new external callback, parent setter, raw handle or invented SQL relation. No CH/RED/WR Core edit until the fixed composition/test seam is specified and Root releases its separate Source unit. Historical WH stays outside scope. These gaps remain product preparation, not a current provider incident or runtime diagnosis.
