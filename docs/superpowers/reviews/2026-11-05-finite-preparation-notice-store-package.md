# Full native notice-store task review package — actual BASE..HEAD

PROJECT AFW; repository tokenizartinfo-ops/agent-friendly-web (1347578006 PUBLIC). READ ONLY task review. BASE 7a2a1c1ffa66b21ae0aa8ad7d0a5ef0c4a2441be; qualifiedcodeHEAD e7846aa4f3443d6f4b29973860e54415fbb7ccc8; finalreportHEAD 78c3bdc6fec287494ec1e2d37223c8d006ea6487/tree5ccf430216d2d9b218d755382c7a16186b7afd09. Three commits/four final paths. Temporary own qualifier removed; no other source/config change. Root fetched complete BASE/qualified files, final recursive tree (not truncated) and whole API compare, confirmed each final product blob equals qualified code, and recomputed full U10 LCS diff below rather than truncated API patches.

## Commit list

916173f8507d55c7ac91940367918e7cd1677114 test(afw): exercise native first notice causal RED
e7846aa4f3443d6f4b29973860e54415fbb7ccc8 feat(afw): fence native preparation notice store
78c3bdc6fec287494ec1e2d37223c8d006ea6487 docs(afw): record native notice qualification and remove temporary runner

## Stat

docs/superpowers/reports/2026-11-05-finite-preparation-notice-store.md | +130 -0
lib/mcp-qa-finite-preparation-issuer-store.mjs | +110 -0
test/fixtures/finite-preparation-issuer-worker.mjs | +156 -6
test/mcp-qa-finite-preparation-notice-native.test.mjs | +82 -0

## Qualified source carried unchanged into final tree

lib/mcp-qa-finite-preparation-issuer-store.mjs: 0869acc3482a3367c9c12e191e1058ba74849a2a
test/fixtures/finite-preparation-issuer-worker.mjs: 055ac2c8e24e27f39ca51399f989ab3f86607ef3
test/mcp-qa-finite-preparation-notice-native.test.mjs: 4ce076605b9e700724bc409b2e3752c9c2c6199e

## Controller verification and rulings

Root independently read primary RED42064402363/job127374420789/attempt1/916173f8:1test0P1F0skip, actual original grant chain reached before absent insertMonitoringTicket,1fixturebuild177245B. Root read primary GREEN42064801768/job127375852461/attempt1/e7846aa4:147P0F0cancel0skip (114notice+33issuer), lint directed exit0/no ESLint diagnostics, both5100ms queues,14earliestceiling gates/ties, barrier/ACKloss/heldsettlement cases.35fixturecompilations total includingRED,0standard. Warnings are retained in report; commands really used npmci without --ignore-scripts. Root requested that flag only after GREEN already started; no rerun to alter historical evidence. No credentials/new CIpermissions/provider calls. Component compilation exercises actual modifiedmodule; mounted graph/runtime acceptance remains separate.

Root compared BASE and GREEN store: all original method bodies openFence→revokeGrant remain one contiguous exact7180char block; original input and preflight match exactly. The API finaldiff has0 store deletions. Seven original db SQL strings/blobs read independently (consent e9962cea0c351f292ebc26a78c2ebb9d78ef9f22; tickets a12a8e84e28be554a84bac7d53d9c9d24b04a08c), unchanged outside four paths.

Binding root ruling corrects ONLY design expectation afterrevoke: original createDossierMonitoringAuthorization SQL excludes revoked grant and fails closed with generic rejection, not returned enabled:false. Preserve original authoritymodule. Tests must show native enabled:true afterCLOSE, real denial afterrevoke, historicalevent intact; diagnostic metadata must not pretend to be resolver DTO. Ruling primary-read documented at https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/644b82cbeeba9161274760a32b97c0a2879d2c54/docs/superpowers/reviews/2026-11-05-finite-preparation-notice-store-authority-ruling.es.md . Root read module once and issued ruling before implementation proof; reviewer may consult if needed.

Judge spec/quality independently; report is claims. No rereun of already qualified tests. One focused outside-diff read per named concrete risk permitted. No broad crawl/localexecution/subagents/mutations. Existing D03/fanout deferredMinors remain finalwholebranchtriage.

## Full U10 diff

~~~diff
diff --git a/docs/superpowers/reports/2026-11-05-finite-preparation-notice-store.md b/docs/superpowers/reports/2026-11-05-finite-preparation-notice-store.md
--- /dev/null
+++ b/docs/superpowers/reports/2026-11-05-finite-preparation-notice-store.md
@@ -0,0 +1,130 @@
+# Finite native preparation notice store — implementation receipt
+
+Status: DONE — SOURCE ONLY / UNMOUNTED, pending root's independent full-BASE-diff spec and quality review. 2026-11-05 UTC.
+
+## Scope, authority and immutable identity
+
+PROJECT=AFW; REPOSITORY=tokenizartinfo-ops/agent-friendly-web (1347578006, PUBLIC); ENVIRONMENT=GitHub source / GitHub-hosted Actions SYN; ORIGIN=GitHub App API; RESOURCE_TYPE=isolated source branch; RESOURCE_ID=feat/finite-native-cleanup-20261101; ALLOWED_ACTION=three mapped product files, this report and temporary path/branch-scoped credential-free qualifier. ROLLBACK=only own commits with a fresh expected-head CAS, preserving any foreign head; no runtime rollback or historical data changes.
+
+- Activated BASE: `7a2a1c1ffa66b21ae0aa8ad7d0a5ef0c4a2441be`; tree `616d1e6187e652f07c067683a12b40c564da78d8`.
+- Causal RED head: `916173f8507d55c7ac91940367918e7cd1677114`; tree `7b531ebb31d07962afbcc845c49c35b32ed03f21`, direct child of BASE.
+- Qualified codeHEAD: `e7846aa4f3443d6f4b29973860e54415fbb7ccc8`; tree `46f0382aa201466a7a5fcf644bd638128d717e6a`, direct child of RED.
+- reportHEAD means the commit introducing this immutable report and removing the temporary qualifier. Its exact SHA/tree are supplied by the final CAS readback/handoff (a commit cannot embed its own content hash). The three product blobs are identical to qualified codeHEAD. No repeat suite is claimed for this documentation/qualifier-removal head.
+- Store blob `0869acc3482a3367c9c12e191e1058ba74849a2a`; fixture blob `055ac2c8e24e27f39ca51399f989ab3f86607ef3`; new test blob `4ce076605b9e700724bc409b2e3752c9c2c6199e`.
+
+Binding requirements: [task brief](../briefs/2026-11-05-finite-preparation-notice-store.md), [root preflight](../reviews/2026-11-05-finite-preparation-notice-store-preflight.es.md), activated by root with exact BASE. No whole plan/history, private coordination, other project, runtime or provider inspected.
+
+Root's [authority ruling at docs commit 644b82cbeeba9161274760a32b97c0a2879d2c54](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/644b82cbeeba9161274760a32b97c0a2879d2c54/docs/superpowers/reviews/2026-11-05-finite-preparation-notice-store-authority-ruling.es.md) corrects one expectation: the existing resolver returns enabled:true after CLOSE with a live grant, then rejects natively after original revokeGrant because its SQL filters revoked grants. The test asserts that real rejection as `resolverDeniedAfterRevoke:true`; no returned enabled:false DTO is invented, and authority production code is unchanged.
+
+## Delivered source
+
+Exactly three product files:
+
+1. `lib/mcp-qa-finite-preparation-issuer-store.mjs` (268 lines): additive frozen seven-DDL metadata, isolated monitoring DATA boundary/schema preflight, three methods on the existing factory, native conditional SQL and private witness/attempt/failure state.
+2. `test/fixtures/finite-preparation-issuer-worker.mjs` (306 lines): notice-only SYN schema installation/scenarios, real original issuer chain, native D1 queue/commit ACK gates and original authority reduction. Original cases still do not install monitoring schema.
+3. `test/mcp-qa-finite-preparation-notice-native.test.mjs` (83 lines): 114 native notice tests, including complete equality with original SQL files and one shared compilation for this test file.
+
+Locations at qualified codeHEAD: frozen monitoring schema line 31; new private state/helpers line 125; insertMonitoringTicket line 171; observeMonitoringTicket line 181; insertMonitoringConsent line 193; fixture notice scenarios line 54; test causal positive line 23.
+
+No new production import, dependency, table, migration, journal operation, helper module, entrypoint, hook or mount. The fixture adds a test-only import of the existing `dossier-monitoring-authority.mjs` and its existing graph so reduction can exercise the actual resolver. Standard production import/mount/dependency graphs are unchanged; no extra standard compiler was run.
+
+The new methods snapshot DATA synchronously before first await. Descriptor extraction excludes the witness, then existing initialOwn bounds apply before canonical size<=16384. The private WeakMap binds the original reference, detached row, identity hash, complete grant/common/window, ticket and same lease; consent consumes it before preflight/await. Serialised/cloned/foreign instances and leases deny. Attempts are instance-local and failure-absorbing; they do not establish durable cross-store exclusion.
+
+Both INSERT SELECT RETURNING statements and the fresh-primary conditional ticket SELECT include current owner/revision, exact original open fence, consumed original authorization, exact active grant/scopes/canonical times and exchanged_at conditions, native n.ms, all DATA ceilings, and MAX(sequence)=0 plus absence of any prior event for this grant. Consent re-joins all fourteen ticket fields at commit, uses native n.ms as issued_at and retains absolute permission expiry. There is no recovery read/fallback after a failed mutation.
+
+## Primary RED
+
+[Actions run 42064402363](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42064402363), [job 127374420789](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42064402363/job/127374420789), attempt 1; exact head/tree above. Job terminal failure is the expected causal RED.
+
+Command:
+
+```text
+npm ci --no-audit --no-fund
+node --test --test-name-pattern="REAL first notice uses native original issuer grant" test/mcp-qa-finite-preparation-notice-native.test.mjs
+```
+
+Original openFence → insertAuthorization → consumeAuthorization → insertReadGrant all returned native success, with original grant UUID asserted before the failure. Assertion: `native grant reached; monitoring invocation: store.insertMonitoringTicket is not a function`. DDL/bundle/fixture setup succeeded; no substitute method/fallback. TAP 1 test, 0 pass, 1 fail, 0 cancelled, 0 skip, 0 todo; test duration 1148.94845ms. One native fixture compilation: 177245 bytes. No standard compilation.
+
+## Primary GREEN and lint
+
+[Actions run 42064801768](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42064801768), [job 127375852461](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42064801768/job/127375852461), attempt 1; head `e7846aa4f3443d6f4b29973860e54415fbb7ccc8`, tree `46f0382aa201466a7a5fcf644bd638128d717e6a`. Completed success 2026-11-05T16:30:36Z.
+
+```text
+npm ci --no-audit --no-fund
+node --test test/mcp-qa-finite-preparation-notice-native.test.mjs test/mcp-qa-finite-preparation-issuer-native.test.mjs
+node node_modules/eslint/bin/eslint.js lib/mcp-qa-finite-preparation-issuer-store.mjs test/fixtures/finite-preparation-issuer-worker.mjs test/mcp-qa-finite-preparation-notice-native.test.mjs
+```
+
+147 tests = 114 notice + 33 unchanged original issuer regressions; 147 pass, 0 fail/cancelled/skipped/todo, 96870.022336ms. Scoped lint exited 0, no ESLint diagnostics. No full npm test, full lint, standard build, remote smoke or publishing acceptance claimed.
+
+Actual compilation count: GREEN new test compiled once, 191380 bytes. Original unchanged runner compiles once per scenario: 33 further native fixture builds, so 34 native builds in GREEN, 35 total including RED. Standard builds: zero. No suite was repeated to obtain hashes. Both jobs installed 649 packages only in cloud. Actual npm ci commands did not contain --ignore-scripts; root requested that flag for any later run after the already-started GREEN. There was no later installation/run.
+
+Runner: Ubuntu 24.04.5 image ubuntu-24.04 20261101.360.1, Node 22.23.4, npm 10.9.9. Qualifier permissions contents:read/metadata:read, checkout persist-credentials:false/fetch-depth:1; no explicit secrets, provider calls or credential custody. Temporary qualifier is removed from final BASE diff. No local clone, dependencies, tests, builds or persistent worker was used.
+
+All actual warnings, deduplicated and sanitised (not suppressed):
+
+```text
+(node:2482) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
+(node:2482) [DEP0169] DeprecationWarning: `url.parse()` behavior is not standardized and prone to errors that have security implications. Use the WHATWG URL API instead. CVEs are not issued for `url.parse()` vulnerabilities.
+npm warn deprecated @esbuild-kit/esm-loader@2.6.5: Merged into tsx: https://tsx.hirok.io
+npm warn deprecated @esbuild-kit/core-utils@3.3.2: Merged into tsx: https://tsx.hirok.io
+npm warn deprecated eslint@9.39.4: This version is no longer supported. Please see https://eslint.org/version-support for other options.
+##[warning]Node.js 20 is deprecated. The following actions target Node.js 20 but are being forced to run on Node.js 24: actions/checkout@v4, actions/setup-node@v4. For more information see: https://github.blog/changelog/2025-09-19-deprecation-of-node-20-on-github-actions-runners/
+(node:2191) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
+(node:2191) [DEP0169] DeprecationWarning: `url.parse()` behavior is not standardized and prone to errors that have security implications. Use the WHATWG URL API instead. CVEs are not issued for `url.parse()` vulnerabilities.
+(node:3015) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
+```
+
+Git emitted its normal initial-default-branch advisory during checkout. No workerd/esbuild test warning or lint rule warning occurred.
+
+## Native acceptance and hostile cases
+
+- Positive: actual original issuer grant → real ticket → conditional SELECT as first statement on a fresh first-primary session after schema preflight in other sessions → one returned consent event. Exact 14/12 result fields, native timestamp, positive safe actual sequence, detached/frozen output and unchanged grant row asserted. Absolute permission was >=10000ms beyond original issue and >5000ms beyond native event issuance; never replaced by child deadline.
+- Per-grant MAX starts at 0 although global sequence already exceeds 1; returned original sequence>1 and two foreign SYN histories remain. Replayed same witness and a fresh-store attempt against a prior event deny/no_mutation, respectively.
+- Hostiles: cloned/JSON/raw-row/store/lease witnesses, getters (counts stay zero), symbols, prototype, sparse/oversize/deep DATA, extra keys, arity and every Common field group; ticket DATA altered in each of six fields. Invalid writes emitted no monitoring mutating SQL.
+- Native race gates: ticket/consent owner, revision, grant owner/project/client/resource/scopes/revocation/created/expiry/exchanged, consumed authorization, fence and competing event; consent additionally re-compares a changed ticket row after preflight. Every gate was reached before child deadline; own new row was zero. Normal ticket UPDATE aborted by the original immutability trigger. The isolated SYN tamper case removed only that trigger after preflight and altered request_id before release; it is not a possible legitimate mutation under intact schema.
+- Schema negatives: both missing tables, changed constraint/unique/index/trigger, extra index object, wrong type, unsupported native clock and ISO deny before monitoring writes. Seven constants are frozen and normalised equality to original db files is asserted; no DDL is executed by production.
+- Both native INSERTs held before actual bound.first for 5100ms, with original SYN parent<=30000ms and long DATA lifetimes. Gate was reached before window deadline and actual native query returned no_mutation after release; no earlier JS child-window check produced the result.
+- Fourteen earliest-ceiling cases (both INSERTs × seven chosen ceilings) asserted gate before deadline and before effective minimum, released at minimum+50ms or later and returned no_mutation. The exact native receipts below expose inherited ties rather than claim a single predicate was independently isolated.
+- Both barrier-wins cases completed original CLOSE and first-statement fresh-primary barrier read before releasing queued native INSERT; no new notice/ticket row. Grant-wins case kept the actual event after CLOSE and original observeGrant→revokeGrant; native resolver true after CLOSE, then denied after revocation, with event retained and no new grant.
+- Both post-commit ACK losses left actual committed rows but rejected the caller, blocked both write retries and denied witness reconstruction in that instance, with zero second INSERT. Both held-after-commit cases aborted the SYN lease, observed the original Promise still pending, then released native settlement and got rejection with persisted row intact. No physical cancellation/drain or cross-RPC replay guarantee is claimed.
+
+51 gate-bearing scenarios reached their actual SQL/ACK gates: 29 tuple races + 16 deadline/ceiling queues + 2 barriers + 4 post-commit ACK/held cases. Other cases do not masquerade as gate qualifications.
+
+```text
+SYN ceiling ticket C0 minimum=1793896184954 ties=C0,consent,grant,Access,preconnection,ticket,permission gate=1793896182009
+SYN ceiling ticket consent minimum=1793896188166 ties=consent,grant,Access,preconnection,ticket,permission gate=1793896185237
+SYN ceiling ticket grant minimum=1793896191380 ties=grant,Access,preconnection,ticket,permission gate=1793896188429
+SYN ceiling ticket Access minimum=1793896194710 ties=Access,ticket,permission gate=1793896191944
+SYN ceiling ticket preconnection minimum=1793896197924 ties=preconnection,ticket,permission gate=1793896194974
+SYN ceiling ticket ticket minimum=1793896201141 ties=ticket,permission gate=1793896198190
+SYN ceiling ticket permission minimum=1793896204358 ties=permission gate=1793896201408
+SYN ceiling consent C0 minimum=1793896207569 ties=C0,consent,grant,Access,preconnection,ticket,permission gate=1793896204640
+SYN ceiling consent consent minimum=1793896210886 ties=consent,grant,Access,preconnection,ticket,permission gate=1793896207982
+SYN ceiling consent grant minimum=1793896214476 ties=grant,Access,preconnection,ticket,permission gate=1793896211549
+SYN ceiling consent Access minimum=1793896217823 ties=Access,ticket,permission gate=1793896214893
+SYN ceiling consent preconnection minimum=1793896221211 ties=preconnection,ticket,permission gate=1793896219538
+SYN ceiling consent ticket minimum=1793896224451 ties=ticket,permission gate=1793896221760
+SYN ceiling consent permission minimum=1793896227921 ties=permission gate=1793896225046
+```
+
+## Preservation and final-diff verification
+
+Before final docs/qualifier removal, actual Git tree readback found only the three product files plus the temporary qualifier changed from activated BASE. Source-string comparison confirmed unchanged exact original issuer imports/constants (5053 bytes), factory/input/preflight/helpers (6071 bytes), and all original method bodies/closing suffix (7188 bytes). Original input witness exclusions, issuer SQL, issuer schema and original exports remain intact. The new metadata export is additive. Original test runner blob is unchanged.
+
+Protected blobs read back unchanged at qualified codeHEAD:
+
+- `lib/mcp-qa-finite-owner-phase-context.mjs`: `ebebaa9542c2408c0d505d1e23daa946762c1cab`.
+- `lib/delegated-oauth-worker.mjs` (M): `d979f395029c9b1e66a99222d06acf99eba4f358`.
+
+Both original db/*.sql blobs are unchanged: consent `e9962cea0c351f292ebc26a78c2ebb9d78ef9f22`, tickets `a12a8e84e28be554a84bac7d53d9c9d24b04a08c`. No phase/SDK/alias/historical grant ACK, host ordinary path, worker entrypoint/transport/config/clock/permission/journal changed. Parent ancestry and expected-head CAS were read back after each successful branch mutation; no force, foreign overwrite or uncertain mutation occurred.
+
+Final expected BASE diff: store, fixture, new test, this report. Root independently reads the actual final tree/diff and reviews spec+quality; this receipt does not substitute for that review.
+
+## Ceiling of this evidence and remaining work
+
+Caller identity/Access/preconnection/approval inputs are explicit SYN DATA, not authentication or human consent. Instance-local Set/WeakMap state is not durable idempotency or a journal. An ACK-lost row can remain historical without caller success and without retry authority. CLOSE alone neither deletes the event nor revokes an existing grant; grant reduction is not human withdrawal of monitoring consent or complete cleanup.
+
+D0.4 remains accepted and untouched; no token→notice integration, source human decision, notice journal/fixed receiver/provenance/NoticeLink, downstream notice phase/third CLOSED preparation, own SEND/full setup/cleanup/guard/preflight package, mount, ARM, real subscription/delivery/withdrawal or coordinated PC-off occurrence is established here. Prior Minor D0.3 OAuth-error precision and fanout fixture cleanup remain deferred to whole-branch triage per their existing ledger.
+
+Expired source ceiling 2026-11-03T02:59Z was never renewed. No runtime/provider/alias/Entry/DDL/grant real, browser/OAuth/OTP/token/access, cron/Container/Max, main or merge operation. operationalReadiness=false; completePackage=false; PCoff=false.

diff --git a/lib/mcp-qa-finite-preparation-issuer-store.mjs b/lib/mcp-qa-finite-preparation-issuer-store.mjs
--- a/lib/mcp-qa-finite-preparation-issuer-store.mjs
+++ b/lib/mcp-qa-finite-preparation-issuer-store.mjs
@@ -19,20 +19,45 @@
 const qcols=[...columns,'subject','project','revision','client','resource','scopes','consent','started','deadline'];
 const cte='WITH q('+qcols.join(',')+') AS (SELECT '+qcols.map(()=>'?').join(',')+'), n(ms) AS (SELECT '+NOW+') ';
 const owner='EXISTS (SELECT 1 FROM site_projects p WHERE p.id=q.project AND p.user_id=q.subject AND p.revision=q.revision)';
 const windowSql='n.ms>=q.started AND n.ms<q.deadline';
 const live=windowSql+' AND n.ms<q.forward_until AND n.ms<'+isoMs('q.consent')+' AND '+canonicalIso('q.consent');
 const fence='EXISTS (SELECT 1 FROM '+T+' f WHERE '+match()+' AND f.fenced_at IS NULL)';
 const consent="c.handle_hash=q.authorization_hash AND c.user_id=q.subject AND c.kind='authorize' AND c.project_id=q.project AND c.client_id=q.client AND c.resource=q.resource AND c.scopes_json=q.scopes AND c.expires_at=q.consent";
 const consentCols='handle_hash,user_id,kind,project_id,client_id,resource,scopes_json,expires_at,consumed_at';
 const grantCols='id,user_id,client_id,project_id,resource,scopes_json,created_at,expires_at,revoked_at,exchanged_at';
 const normalized=x=>x.replace(/\s+/g,' ').trim().replace(/;$/,'');
+
+// Metadata only: ordinary DDL is installed exclusively by the SYN fixture.
+export const FINITE_PREPARATION_MONITORING_SCHEMA=Object.freeze([
+ "CREATE TABLE IF NOT EXISTS dossier_monitoring_consent_events (\n sequence INTEGER PRIMARY KEY AUTOINCREMENT,\n grant_id TEXT NOT NULL,\n project_id TEXT NOT NULL,\n user_id TEXT NOT NULL,\n client_id TEXT NOT NULL,\n resource TEXT NOT NULL,\n revision INTEGER NOT NULL CHECK(revision>0),\n action TEXT NOT NULL CHECK(action IN ('grant','revoke')),\n purpose TEXT NOT NULL CHECK(purpose='afw.dossier-monitoring.v1'),\n request_id TEXT NOT NULL,\n issued_at INTEGER NOT NULL CHECK(issued_at>=0),\n expires_at INTEGER NOT NULL,\n CHECK((action='grant' AND expires_at>issued_at AND expires_at-issued_at<=600000) OR (action='revoke' AND expires_at=issued_at)),\n UNIQUE(grant_id,request_id)\n)",
+ "CREATE INDEX IF NOT EXISTS dossier_monitoring_consent_grant_sequence ON dossier_monitoring_consent_events(grant_id,sequence)",
+ "CREATE TRIGGER IF NOT EXISTS dossier_monitoring_no_update BEFORE UPDATE ON dossier_monitoring_consent_events BEGIN SELECT RAISE(ABORT,'Monitoring history is append only'); END",
+ "CREATE TRIGGER IF NOT EXISTS dossier_monitoring_no_delete BEFORE DELETE ON dossier_monitoring_consent_events BEGIN SELECT RAISE(ABORT,'Monitoring history is append only'); END",
+ "CREATE TABLE IF NOT EXISTS dossier_monitoring_owner_tickets (\n handle_hash TEXT PRIMARY KEY,\n request_id TEXT NOT NULL UNIQUE,\n user_id TEXT NOT NULL,\n grant_id TEXT NOT NULL,\n project_id TEXT NOT NULL,\n client_id TEXT NOT NULL,\n resource TEXT NOT NULL,\n purpose TEXT NOT NULL CHECK(purpose='afw.dossier-monitoring-owner.v1'),\n action TEXT NOT NULL CHECK(action IN ('grant','revoke')),\n revision INTEGER NOT NULL CHECK(revision>0),\n expected_sequence INTEGER NOT NULL CHECK(expected_sequence>=0),\n issued_at INTEGER NOT NULL,\n expires_at INTEGER NOT NULL CHECK(expires_at>issued_at AND expires_at-issued_at<=600000),\n permission_expires_at INTEGER NOT NULL\n)",
+ "CREATE TRIGGER IF NOT EXISTS dossier_monitoring_tickets_no_update BEFORE UPDATE ON dossier_monitoring_owner_tickets BEGIN SELECT RAISE(ABORT,'Monitoring form is immutable'); END",
+ "CREATE TRIGGER IF NOT EXISTS dossier_monitoring_tickets_no_delete BEFORE DELETE ON dossier_monitoring_owner_tickets BEGIN SELECT RAISE(ABORT,'Monitoring form is immutable'); END"
+]);
+const monitoringTables=['dossier_monitoring_consent_events','dossier_monitoring_owner_tickets'];
+const ticketColumns='handle_hash request_id user_id grant_id project_id client_id resource purpose action revision expected_sequence issued_at expires_at permission_expires_at'.split(' ');
+const eventColumns='sequence grant_id project_id user_id client_id resource revision action purpose request_id issued_at expires_at'.split(' ');
+const monitoringNames=['identity','expectedGrant','consumedAt','accessExpiresAt','preconnectionExpiresAt','window'];
+const monitoringQ=[...qcols,'grant_scopes','created','grant_expiry','consumed','access_until','preconnection_until','handle','request','expected_sequence','issued','ticket_expiry','permission'];
+const monitoringCte='WITH q('+monitoringQ.join(',')+') AS (SELECT '+monitoringQ.map(()=>'?').join(',')+'), n(ms) AS (SELECT '+NOW+') ';
+const monitoringNormalize=x=>normalized(x).replace(/^CREATE (TABLE|INDEX|TRIGGER) IF NOT EXISTS /,'CREATE $1 ');
+const monitoringFence='EXISTS (SELECT 1 FROM '+T+' f WHERE '+match()+' AND f.fenced_at IS NULL AND f.fence_request_id IS NULL)';
+const monitoringGrant="g.id=q.grant_id AND g.user_id=q.subject AND g.project_id=q.project AND g.client_id=q.client AND g.resource=q.resource AND g.scopes_json=q.grant_scopes AND g.created_at=q.created AND g.expires_at=q.grant_expiry AND g.revoked_at='' AND "+canonicalIso('g.created_at')+' AND '+canonicalIso('g.expires_at')+' AND '+isoMs('g.created_at')+'>='+isoMs('q.consumed')+' AND '+isoMs('g.created_at')+'<=n.ms AND (g.exchanged_at=\'\' OR ('+canonicalIso('g.exchanged_at')+' AND '+isoMs('g.exchanged_at')+'>='+isoMs('g.created_at')+' AND '+isoMs('g.exchanged_at')+'<=n.ms AND '+isoMs('g.exchanged_at')+'<'+isoMs('g.expires_at')+'))';
+const monitoringLive=owner+' AND '+monitoringFence+' AND '+live+' AND n.ms>=q.issued AND n.ms<'+isoMs('g.expires_at')+' AND n.ms<q.access_until AND n.ms<q.preconnection_until AND n.ms<q.ticket_expiry AND n.ms<q.permission AND '+canonicalIso('q.consumed')+" AND c.consumed_at=q.consumed AND c.consumed_at<>'' AND COALESCE((SELECT MAX(sequence) FROM dossier_monitoring_consent_events WHERE grant_id=q.grant_id),0)=q.expected_sequence AND q.expected_sequence=0 AND NOT EXISTS (SELECT 1 FROM dossier_monitoring_consent_events WHERE grant_id=q.grant_id)";
+const monitoringFrom=' FROM q,n JOIN delegated_consent_sessions c ON '+consent+' JOIN delegated_access_grants g ON '+monitoringGrant;
+const ticketExpressions=["q.handle","q.request","q.subject","q.grant_id","q.project","q.client","q.resource","'afw.dossier-monitoring-owner.v1'","'grant'","q.revision","q.expected_sequence","q.issued","q.ticket_expiry","q.permission"];
+const monitoringTicketMatch=ticketColumns.map((k,j)=>'t.'+k+'='+ticketExpressions[j]).join(' AND ');
+
 export function createFinitePreparationIssuerStore(options){
  fields(options,['ctx','env']);const c=captureFinitePreparationIssuerContext(options),consumptions=new WeakMap(),barriers=new WeakMap(),observations=new WeakMap(),grantAttempts=new Set(),closeAttempts=new Set();
  function input(options,names){
   // Snapshot DATA before the first await; witnesses are kept by identity separately.
   fields(options,names);const data=own(Object.fromEntries(names.filter(k=>!['consumption','barrier','observation'].includes(k)).map(k=>[k,Object.getOwnPropertyDescriptor(options,k).value])));
   const i=identity(data.identity),w=data.window;fields(w,['startedAt','deadline']);
   check(issuerTime(w.startedAt)&&issuerTime(w.deadline)&&w.startedAt<w.deadline&&w.deadline-w.startedAt<=5000&&w.startedAt>=i.reservedAt);
   check(i.actorId===c.actorId&&i.qaVersionId===c.qa);
   return {...data,identity:i,window:w};
  }
@@ -88,21 +113,106 @@
   // SELECT is deliberately the FIRST statement on a NEW first-primary session.
   const s=Reflect.apply(c.session,c.db,['first-primary']);
   const r=await query(cte+'SELECT f.* FROM '+T+' f,q,n WHERE '+match()+' AND f.fence_request_id=? AND f.fenced_at IS NOT NULL AND '+owner+' AND '+windowSql+' AND n.ms<q.cleanup_until', [...values(i,w),requestId],g,s);
   return exactFence(r,i,requestId);
  }
  async function barrierResult(i,requestId,w,g,lease,ack=null){
   const row=await readBarrier(i,requestId,w,g);if(ack)check(canonical(row)===canonical(ack));
   const result=Object.freeze({status:'fenced',row,rowHash:hash('afw.finite-preparation-issuer-row.v1',row)});
   barriers.set(result,{identityHash:i.identityHash,lease,row});return result;
  }
+
+ // New notice boundary deliberately leaves the original input/preflight untouched.
+ const monitoringWitnesses=new WeakMap(),ticketAttempts=new Set(),noticeAttempts=new Set(),monitoringFailed=new Set();
+ function monitoringInput(options,hasWitness,argc){
+  check(argc===2);const names=[...monitoringNames,hasWitness?'ticketWitness':'ticket'];fields(options,names);
+  const data=own(Object.fromEntries(names.filter(k=>k!=='ticketWitness').map(k=>[k,Object.getOwnPropertyDescriptor(options,k).value])));
+  const i=identity(data.identity),w=data.window;fields(w,['startedAt','deadline']);
+  check(issuerTime(w.startedAt)&&issuerTime(w.deadline)&&w.startedAt<w.deadline&&w.deadline-w.startedAt<=5000&&w.startedAt>=i.reservedAt);
+  check(i.actorId===c.actorId&&i.qaVersionId===c.qa);forward(i,w);grantData(data.expectedGrant,i);
+  check(issuerIso(data.consumedAt)&&Date.parse(data.consumedAt)>=i.reservedAt&&Date.parse(data.expectedGrant.createdAt)>=Date.parse(data.consumedAt));
+  check(issuerTime(data.accessExpiresAt)&&issuerTime(data.preconnectionExpiresAt)&&data.accessExpiresAt<=i.C0&&data.preconnectionExpiresAt<=i.C0);
+  return data;
+ }
+ function monitoringTicket(data,t){
+  const i=data.identity,g=data.expectedGrant;
+  fields(t,['handleHash','requestId','expectedSequence','issuedAt','expiresAt','permissionExpiresAt']);
+  check(typeof t.handleHash==='string'&&/^[a-f0-9]{64}$/.test(t.handleHash)&&issuerUuid(t.requestId)&&t.expectedSequence===0);
+  check(['issuedAt','expiresAt','permissionExpiresAt'].every(k=>issuerTime(t[k]))&&t.issuedAt>=Math.max(i.reservedAt,Date.parse(g.createdAt),Date.parse(data.consumedAt)));
+  check(t.issuedAt<t.permissionExpiresAt&&t.permissionExpiresAt<=t.expiresAt&&t.expiresAt-t.issuedAt<=600000);
+  check(t.expiresAt<=Math.min(i.C0,Date.parse(i.consentExpiresAt),Date.parse(g.expiresAt),data.accessExpiresAt,data.preconnectionExpiresAt));
+  check(Buffer.byteLength(canonical({...data,ticket:t}))<=16384);
+  return t;
+ }
+ const monitoringCommon=data=>Object.freeze(Object.fromEntries(monitoringNames.map(k=>[k,data[k]])));
+ function monitoringValues(d,t){return [...values(d.identity,d.window),JSON.stringify(d.expectedGrant.scopes),d.expectedGrant.createdAt,d.expectedGrant.expiresAt,d.consumedAt,d.accessExpiresAt,d.preconnectionExpiresAt,t.handleHash,t.requestId,t.expectedSequence,t.issuedAt,t.expiresAt,t.permissionExpiresAt];}
+ function expectedTicket(d,t){const i=d.identity;return {handle_hash:t.handleHash,request_id:t.requestId,user_id:i.subject,grant_id:i.grantId,project_id:i.projectId,client_id:i.clientId,resource:i.resource,purpose:'afw.dossier-monitoring-owner.v1',action:'grant',revision:i.projectRevision,expected_sequence:t.expectedSequence,issued_at:t.issuedAt,expires_at:t.expiresAt,permission_expires_at:t.permissionExpiresAt};}
+ function monitoringRow(row,expected,names){
+  const snapshot=own(row);fields(snapshot,names);check(Object.entries(expected).every(([k,v])=>snapshot[k]===v));return snapshot;
+ }
+ async function monitoringPreflight(g){
+  await preflight(g);
+  const s=Reflect.apply(c.session,c.db,['first-primary']);
+  const rows=(await query("SELECT type,name,tbl_name,sql FROM sqlite_schema WHERE tbl_name IN ('dossier_monitoring_consent_events','dossier_monitoring_owner_tickets') AND sql IS NOT NULL ORDER BY name",[],g,s,'all')).results??[];
+  check(rows.length===FINITE_PREPARATION_MONITORING_SCHEMA.length);
+  for(const def of FINITE_PREPARATION_MONITORING_SCHEMA){
+   const [,kind,name]=def.match(/^CREATE (TABLE|INDEX|TRIGGER) IF NOT EXISTS (\w+)/);
+   const table=kind==='TABLE'?name:def.match(/(?: ON | ON)(\w+)/)?.[1];
+   // Index syntax has ON table without surrounding spaces; triggers have ON table.
+   check(rows.some(r=>r.type===kind.toLowerCase()&&r.name===name&&r.tbl_name===table&&typeof r.sql==='string'&&monitoringNormalize(r.sql)===monitoringNormalize(def)));
+  }
+  for(const table of monitoringTables){
+   const ticket=table===monitoringTables[1],names=ticket?ticketColumns:eventColumns;
+   const integers=new Set(ticket?['revision','expected_sequence','issued_at','expires_at','permission_expires_at']:['sequence','revision','issued_at','expires_at']);
+   const shape=(await query('PRAGMA table_info('+table+')',[],g,s,'all')).results??[];
+   check(shape.length===names.length&&shape.every((col,j)=>col.cid===j&&col.name===names[j]&&col.type.toUpperCase()===(integers.has(col.name)?'INTEGER':'TEXT')&&col.pk===(j===0?1:0)&&col.notnull===(j===0?0:1)&&col.dflt_value===null));
+  }g();
+ }
  return Object.freeze({
+  async insertMonitoringTicket(options,lease){
+   let id;
+   try{
+    const d=monitoringInput(options,false,arguments.length),t=monitoringTicket(d,d.ticket);id=d.identity.identityHash;
+    check(!monitoringFailed.has(id)&&!ticketAttempts.has(id)&&!noticeAttempts.has(id));ticketAttempts.add(id);
+    const g=c.leaseGuard(lease);g();await monitoringPreflight(g);
+    const row=await query(monitoringCte+'INSERT INTO dossier_monitoring_owner_tickets ('+ticketColumns.join(',')+') SELECT '+ticketExpressions.join(',')+monitoringFrom+' WHERE '+monitoringLive+' RETURNING '+ticketColumns.join(','),monitoringValues(d,t),g);
+    return row?Object.freeze({status:'applied',row:monitoringRow(row,expectedTicket(d,t),ticketColumns)}):Object.freeze({status:'no_mutation'});
+   }catch{if(id)monitoringFailed.add(id);fail();}
+  },
+  async observeMonitoringTicket(options,lease){
+   try{
+    const d=monitoringInput(options,false,arguments.length),t=monitoringTicket(d,d.ticket),id=d.identity.identityHash;
+    check(!monitoringFailed.has(id));const g=c.leaseGuard(lease);g();await monitoringPreflight(g);
+    // This conditional SELECT is the FIRST statement on a NEW first-primary.
+    const s=Reflect.apply(c.session,c.db,['first-primary']);
+    const row=await query(monitoringCte+'SELECT t.*'+monitoringFrom+' JOIN dossier_monitoring_owner_tickets t ON '+monitoringTicketMatch+' WHERE '+monitoringLive,monitoringValues(d,t),g,s);
+    if(!row)return null;
+    const detached=monitoringRow(row,expectedTicket(d,t),ticketColumns),out=Object.freeze({status:'observed',row:detached});
+    monitoringWitnesses.set(out,{row:detached,identityHash:id,common:monitoringCommon(d),ticket:t,lease,used:false});return out;
+   }catch{fail();}
+  },
+  async insertMonitoringConsent(options,lease){
+   let id;
+   try{
+    const d=monitoringInput(options,true,arguments.length),fact=monitoringWitnesses.get(Object.getOwnPropertyDescriptor(options,'ticketWitness').value);id=d.identity.identityHash;
+    check(fact&&!fact.used&&fact.identityHash===id&&fact.lease===lease&&canonical(fact.common)===canonical(monitoringCommon(d)));
+    const t=monitoringTicket(d,fact.ticket);
+    check(!monitoringFailed.has(id)&&!noticeAttempts.has(id));fact.used=true;noticeAttempts.add(id);
+    const g=c.leaseGuard(lease);g();await monitoringPreflight(g);
+    const row=await query(monitoringCte+"INSERT INTO dossier_monitoring_consent_events ("+eventColumns.slice(1).join(',')+") SELECT q.grant_id,q.project,q.subject,q.client,q.resource,q.revision,'grant','afw.dossier-monitoring.v1',q.request,n.ms,q.permission"+monitoringFrom+' JOIN dossier_monitoring_owner_tickets t ON '+monitoringTicketMatch+' WHERE '+monitoringLive+' RETURNING '+eventColumns.join(','),monitoringValues(d,t),g);
+    if(!row)return Object.freeze({status:'no_mutation'});
+    check(Number.isSafeInteger(row.sequence)&&row.sequence>0&&issuerTime(row.issued_at)&&row.issued_at>=Math.max(d.window.startedAt,t.issuedAt)&&row.issued_at<Math.min(d.window.deadline,t.permissionExpiresAt));
+    const i=d.identity,expected={grant_id:i.grantId,project_id:i.projectId,user_id:i.subject,client_id:i.clientId,resource:i.resource,revision:i.projectRevision,action:'grant',purpose:'afw.dossier-monitoring.v1',request_id:t.requestId,expires_at:t.permissionExpiresAt};
+    return Object.freeze({status:'applied',row:monitoringRow(row,expected,eventColumns)});
+   }catch{if(id)monitoringFailed.add(id);fail();}
+  },
+
   async openFence(options,lease){
    const {identity:i,window:w}=input(options,['identity','window']);forward(i,w);const g=c.leaseGuard(lease);await preflight(g);
    const row=await query(cte+'INSERT INTO '+T+' ('+columns.join(',')+') SELECT '+columns.map(k=>'q.'+k).join(',')+' FROM q,n WHERE '+owner+' AND '+live+' RETURNING *',values(i,w),g);
    return row?Object.freeze({status:'applied',row:exactFence(row,i,null,false)}):Object.freeze({status:'no_mutation'});
   },
   async insertAuthorization(options,lease){
    const {identity:i,window:w}=input(options,['identity','window']);forward(i,w);const g=c.leaseGuard(lease);await preflight(g);
    const row=await query(cte+"INSERT INTO delegated_consent_sessions ("+consentCols+") SELECT q.authorization_hash,q.subject,'authorize',q.project,q.client,q.resource,q.scopes,q.consent,'' FROM q,n WHERE "+owner+' AND '+fence+' AND '+live+' RETURNING *',values(i,w),g);
    return row?Object.freeze({status:'applied',row:Object.freeze({...row})}):Object.freeze({status:'no_mutation'});
   },

diff --git a/test/fixtures/finite-preparation-issuer-worker.mjs b/test/fixtures/finite-preparation-issuer-worker.mjs
--- a/test/fixtures/finite-preparation-issuer-worker.mjs
+++ b/test/fixtures/finite-preparation-issuer-worker.mjs
@@ -1,58 +1,208 @@
 import {initialHash as hash} from '../../lib/mcp-qa-finite-initial-material-records.mjs';
+import {createDossierMonitoringAuthorization} from '../../lib/dossier-monitoring-authority.mjs';
 import {DurableObject} from 'cloudflare:workers';
 import {createFinitePreparationIssuerStore,FINITE_PREPARATION_ISSUER_SCHEMA as schema} from '../../lib/mcp-qa-finite-preparation-issuer-store.mjs';
 import {createFinitePreparationIssuerJournal} from '../../lib/mcp-qa-finite-preparation-issuer-journal.mjs';
 import {sealFinitePreparationIssuerRecord as seal,FINITE_PREPARATION_ISSUER_PREFIX as P} from '../../lib/mcp-qa-finite-preparation-issuer-records.mjs';
 const H='a'.repeat(64),U='11111111-1111-4111-8111-111111111111',F='22222222-2222-4222-8222-222222222222';
 const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));
 // SYN internal identities/lease/queue faults, REAL native D1 SQL time and DO transactions.
 // No SDK approval, capsule validity or source authority is inferred.
 export class FiniteIssuerFixture extends DurableObject{
  async fetch(request){
   const b=await request.json(),db=this.env.RELEASE_DB,events=[];
   const exec=async(sql,...args)=>db.prepare(sql).bind(...args).run();
   await exec('CREATE TABLE IF NOT EXISTS site_projects (id TEXT PRIMARY KEY,user_id TEXT NOT NULL,revision INTEGER NOT NULL)');
   await exec("CREATE TABLE IF NOT EXISTS delegated_consent_sessions (handle_hash TEXT PRIMARY KEY,user_id TEXT,kind TEXT,project_id TEXT,client_id TEXT,resource TEXT,scopes_json TEXT,expires_at TEXT,consumed_at TEXT NOT NULL DEFAULT '')");
   await exec("CREATE TABLE IF NOT EXISTS delegated_access_grants (id TEXT PRIMARY KEY,user_id TEXT,client_id TEXT,project_id TEXT,resource TEXT,scopes_json TEXT,created_at TEXT,expires_at TEXT,revoked_at TEXT NOT NULL DEFAULT '',exchanged_at TEXT NOT NULL DEFAULT '')");
   if(b.case!=='missing_schema')for(const sql of schema)await exec(sql);
+  if(b.case.startsWith('notice-'))for(const sql of b.monitoringSchema)await exec(sql);
   const at=(await db.prepare("SELECT CAST(unixepoch('subsec')*1000 AS INTEGER) AS ms").first()).ms;
+  const identity=seal('Identity',{preconnectionId:H,enrollmentHash:H,capsuleHash:H,sourceRevision:'b'.repeat(40),qaVersionId:U,actorId:this.ctx.id.toString(),subject:'SYN-owner',accessRealmHash:H,projectId:'SYN-project',projectRevision:1,clientId:'SYN-client',resource:'https://delegated-canary.agentfriendlyweb.dev/mcp',authorizationHash:'c'.repeat(64),grantId:U,requestedScopes:['afw:project:read','afw:evidence:read'],consentExpiresAt:new Date(at+(b.case.startsWith('notice-')?24000:12000)).toISOString(),I0:at-1000,C0:at+899000,C1:at+1079000,reservedAt:at-5});
+  const i=b.case.startsWith('notice-')&&b.ceiling==='C0'?seal('Identity',{...identity,I0:at-897000,C0:at+3000,C1:at+183000,consentExpiresAt:new Date(at+3000).toISOString()}):b.case.startsWith('notice-')&&b.ceiling==='consent'?seal('Identity',{...identity,consentExpiresAt:new Date(at+3000).toISOString()}):['C0_queue','expired_cleanup','C0_grant_queue'].includes(b.case)?seal('Identity',{...identity,I0:at-899200,C0:at+800,C1:at+180800,consentExpiresAt:new Date(at+800).toISOString()}):b.case==='consent_queue'?seal('Identity',{...identity,consentExpiresAt:new Date(at+500).toISOString()}):identity;
-  const identity=seal('Identity',{preconnectionId:H,enrollmentHash:H,capsuleHash:H,sourceRevision:'b'.repeat(40),qaVersionId:U,actorId:this.ctx.id.toString(),subject:'SYN-owner',accessRealmHash:H,projectId:'SYN-project',projectRevision:1,clientId:'SYN-client',resource:'https://delegated-canary.agentfriendlyweb.dev/mcp',authorizationHash:'c'.repeat(64),grantId:U,requestedScopes:['afw:project:read','afw:evidence:read'],consentExpiresAt:new Date(at+12000).toISOString(),I0:at-1000,C0:at+899000,C1:at+1079000,reservedAt:at-5});
-  const i=['C0_queue','expired_cleanup','C0_grant_queue'].includes(b.case)?seal('Identity',{...identity,I0:at-899200,C0:at+800,C1:at+180800,consentExpiresAt:new Date(at+800).toISOString()}):b.case==='consent_queue'?seal('Identity',{...identity,consentExpiresAt:new Date(at+500).toISOString()}):identity;
   const parent=new AbortController(),lease=Object.freeze({signal:parent.signal,assertCurrent(){if(parent.signal.aborted||Date.now()>=at+30000)throw Error('SYN original lease expired');}});
+  let delay=null,lose=null,holdAck=null,sessionId=0,sqlCount=0,grantCommitted=false,noticeGate=null,noticeClock=null;
+  const wrapper={withSession(mode){events.push({session:++sessionId,mode});const sid=sessionId,s=db.withSession(mode);return {prepare(sql){events.push({sid,sql});const actualSql=(b.case==='unsupported_clock'||noticeClock==='clock')&&sql.includes(' AS ms,typeof(')?sql.replaceAll("'subsec'","'SYN-unsupported'"):(b.case==='unsupported_iso'||noticeClock==='iso')&&sql.includes(' AS ms,typeof(')?sql.replaceAll("'2026-11-04T12:00:00.123Z'","'SYN-not-iso'"):sql;const stmt=s.prepare(actualSql);return {bind(...args){const bound=stmt.bind(...args);const call=method=>async()=>{sqlCount++;if(delay&&sql.includes(delay.needle)){const d=delay;delay=null;await sleep(d.ms);}const gate=noticeGate&&sql.includes(noticeGate.needle)?noticeGate:null;
+      if(gate&&!['notice-ack','notice-held'].includes(b.case)){gate.reached=true;gate.at=Date.now();await gate.wait;}
+      const result=await bound[method]();
+      if(gate&&['notice-ack','notice-held'].includes(b.case)){gate.committed=true;gate.reached=true;gate.at=Date.now();await gate.wait;if(b.case==='notice-ack')throw Error('SYN post-commit notice ACK loss');}if(sql.includes('INSERT INTO delegated_access_grants'))grantCommitted=true;if(holdAck&&sql.includes(holdAck.needle)){const d=holdAck;holdAck=null;await sleep(d.ms);}if(lose&&sql.includes(lose)){lose=null;throw Error('SYN lost actual native SQL ACK');}return result;};return {first:call('first'),all:call('all'),run:call('run')};}};}};}};
-  let delay=null,lose=null,holdAck=null,sessionId=0,sqlCount=0,grantCommitted=false;
-  const wrapper={withSession(mode){events.push({session:++sessionId,mode});const sid=sessionId,s=db.withSession(mode);return {prepare(sql){events.push({sid,sql});const actualSql=b.case==='unsupported_clock'&&sql.includes(' AS ms,typeof(')?sql.replaceAll("'subsec'","'SYN-unsupported'"):b.case==='unsupported_iso'&&sql.includes(' AS ms,typeof(')?sql.replaceAll("'2026-11-04T12:00:00.123Z'","'SYN-not-iso'"):sql;const stmt=s.prepare(actualSql);return {bind(...args){const bound=stmt.bind(...args);const call=method=>async()=>{sqlCount++;if(delay&&sql.includes(delay.needle)){const d=delay;delay=null;await sleep(d.ms);}const result=await bound[method]();if(sql.includes('INSERT INTO delegated_access_grants'))grantCommitted=true;if(holdAck&&sql.includes(holdAck.needle)){const d=holdAck;holdAck=null;await sleep(d.ms);}if(lose&&sql.includes(lose)){lose=null;throw Error('SYN lost actual native SQL ACK');}return result;};return {first:call('first'),all:call('all'),run:call('run')};}};}};}};
   let txFault=null,txCommitted=false;
   const nativeStorage=this.ctx.storage;
   const storage={get:async(...args)=>{const v=await nativeStorage.get(...args);return txFault==='readback_loss'&&txCommitted?'SYN-readback-loss':v;},list:(...args)=>nativeStorage.list(...args),sync:async()=>{if(txFault==='readback_loss')return nativeStorage.sync();if(txFault==='sync_loss')throw Error('SYN sync loss');return nativeStorage.sync();},transaction:async callback=>{
    const result=await nativeStorage.transaction(async tx=>{const r=await callback(tx);if(txFault==='callback_throw')throw Error('SYN final native transaction callback throw');return r;});txCommitted=true;
    // Hold AFTER the actual transaction final return; no interior read/release deadlock.
    if(txFault==='post_commit_hold'){parent.abort();await sleep(20);}
    if(txFault==='final_throw')throw Error('SYN native final ACK loss');return result;
   }};
   const ctx={storage,id:this.ctx.id},env={RELEASE_DB:wrapper,AFW_QA_VERSION:{id:U},AFW_INDEPENDENT_CLOSURE:this.env.FIXTURE};
   const store=createFinitePreparationIssuerStore({ctx,env});
   const window=(until=i.C0)=>({startedAt:Date.now(),deadline:Math.min(Date.now()+4500,until,Date.parse(i.consentExpiresAt))});
   const clean=()=>({startedAt:Date.now(),deadline:Math.min(Date.now()+4500,i.C1)});
+  const grant={scopes:['afw:project:read'],createdAt:new Date(at).toISOString(),expiresAt:new Date(Math.min(at+(b.case.startsWith('notice-')?(b.ceiling==='grant'?3000:22000):10000),Date.parse(i.consentExpiresAt))).toISOString()};
-  const grant={scopes:['afw:project:read'],createdAt:new Date(at).toISOString(),expiresAt:new Date(Math.min(at+10000,Date.parse(i.consentExpiresAt))).toISOString()};
   const opts=()=>({identity:i,window:window()});
   await exec('INSERT INTO site_projects VALUES (?,?,?)',i.projectId,i.subject,1);
   const snapshot=async()=>({fences:await db.prepare('SELECT * FROM finite_preparation_issuer_fences').all(),consents:await db.prepare('SELECT * FROM delegated_consent_sessions').all(),grants:await db.prepare('SELECT * FROM delegated_access_grants').all()});
   const rejected=async fn=>{try{await fn();return false;}catch{return true;}};
   const opened=()=>store.openFence(opts(),lease);
   const authorized=()=>store.insertAuthorization(opts(),lease);
   const consume=()=>store.consumeAuthorization({...opts(),consumedAt:new Date(at).toISOString()},lease);
   const close=()=>store.closeFence({identity:i,fenceRequestId:F,window:clean()},lease);
   const observe=barrier=>store.observeGrant({identity:i,barrier,expectedGrant:grant,window:clean()},lease);
   let result={};
   try{
+
+   if(b.case.startsWith('notice-')){
+    // Every positive scenario issues the original UUID through the real issuer first.
+    result.open=await opened();result.authorization=await authorized();
+    const consumption=await consume();result.consumed=!!consumption;
+    result.grant=await store.insertReadGrant({...opts(),consumption,grant},lease);
+    if(result.grant.status!=='applied')throw Error('SYN original grant not reached');
+    const beforeGrant=JSON.stringify(result.grant.row),end=Date.parse(grant.expiresAt);
+    const short=b.ceiling?at+3000:end;
+    const ceilings={C0:i.C0,consent:Date.parse(i.consentExpiresAt),grant:end,Access:b.ceiling==='Access'?short:end,preconnection:b.ceiling==='preconnection'?short:end};
+    const ticketEnd=Math.min(...Object.values(ceilings),b.ceiling==='ticket'?short:end);
+    const permissionEnd=Math.min(ticketEnd,b.ceiling==='permission'?short:end);
+    const ticket={handleHash:'d'.repeat(64),requestId:F,expectedSequence:0,issuedAt:at,expiresAt:ticketEnd,permissionExpiresAt:permissionEnd};
+    const common={identity:i,expectedGrant:grant,consumedAt:consumption.consumed_at,accessExpiresAt:ceilings.Access,preconnectionExpiresAt:ceilings.preconnection,window:window()};
+    const data=()=>({...common,ticket});
+    const counts=async()=>({tickets:(await db.prepare('SELECT COUNT(*) AS n FROM dossier_monitoring_owner_tickets').first()).n,notices:(await db.prepare('SELECT COUNT(*) AS n FROM dossier_monitoring_consent_events WHERE grant_id=?').bind(i.grantId).first()).n});
+    const writes=()=>events.filter(e=>e.sql?.includes('INSERT INTO dossier_monitoring_')).length;
+    const issue=()=>store.insertMonitoringTicket(data(),lease);
+    const observeTicket=()=>store.observeMonitoringTicket(data(),lease);
+    const insertNotice=(w,s=store,l=lease,d=common)=>s.insertMonitoringConsent({...d,ticketWitness:w},l);
+    const competing=async(foreign=false)=>{
+     await exec("INSERT INTO dossier_monitoring_consent_events(grant_id,project_id,user_id,client_id,resource,revision,action,purpose,request_id,issued_at,expires_at) VALUES (?,?,?,?,?,1,'grant','afw.dossier-monitoring.v1',?,?,?)",foreign?'SYN-foreign':i.grantId,i.projectId,i.subject,i.clientId,i.resource,foreign?U:'33333333-3333-4333-8333-333333333333',at,at+15000);
+    };
+    if(b.case==='notice-global'){await competing(true);await exec("INSERT INTO dossier_monitoring_consent_events(grant_id,project_id,user_id,client_id,resource,revision,action,purpose,request_id,issued_at,expires_at) VALUES ('SYN-second',?,?,?,?,1,'grant','afw.dossier-monitoring.v1',?,?,?)",i.projectId,i.subject,i.clientId,i.resource,U,at,at+15000);result.priorMax=(await db.prepare('SELECT COALESCE(MAX(sequence),0) AS n FROM dossier_monitoring_consent_events WHERE grant_id=?').bind(i.grantId).first()).n;}
+    if(b.case==='notice-schema'){
+     if(b.fault==='clock')noticeClock='clock';else if(b.fault==='iso')noticeClock='iso';
+     else if(b.fault==='type'){await exec('DROP TABLE dossier_monitoring_owner_tickets');await exec('CREATE TABLE dossier_monitoring_owner_tickets (handle_hash TEXT PRIMARY KEY,request_id TEXT,user_id TEXT,grant_id TEXT,project_id TEXT,client_id TEXT,resource TEXT,purpose TEXT,action TEXT,revision TEXT,expected_sequence INTEGER,issued_at INTEGER,expires_at INTEGER,permission_expires_at INTEGER)');}
+     else if(b.fault==='extra')await exec('CREATE INDEX SYN_extra_notice ON dossier_monitoring_owner_tickets(grant_id)');
+     else{
+      const table=b.fault==='missing-consent'?'dossier_monitoring_consent_events':'dossier_monitoring_owner_tickets';
+      if(b.fault.startsWith('missing-'))await exec('DROP TABLE '+table);
+      else if(b.fault==='index')await exec('DROP INDEX dossier_monitoring_consent_grant_sequence');
+      else if(b.fault==='trigger')await exec('DROP TRIGGER dossier_monitoring_tickets_no_delete');
+      else{
+       // SYN only: reconstruct an empty table with exactly one missing constraint.
+       await exec('DROP TABLE dossier_monitoring_owner_tickets');
+       const original=b.monitoringSchema.find(sql=>sql.startsWith('CREATE TABLE IF NOT EXISTS dossier_monitoring_owner_tickets'));
+       await exec(b.fault==='unique'?original.replace('request_id TEXT NOT NULL UNIQUE','request_id TEXT NOT NULL'):original.replace("CHECK(purpose='afw.dossier-monitoring-owner.v1')",''));
+       for(const sql of b.monitoringSchema.filter(sql=>sql.startsWith('CREATE TRIGGER IF NOT EXISTS dossier_monitoring_tickets_')))await exec(sql);
+      }
+     }
+     const n=writes();result.denied=await rejected(issue);result.newWrites=writes()-n;
+    }else if(b.case==='notice-hostile'){
+     result.ticket=await issue();const witness=await observeTicket();result.observed=!!witness;let getters=0;
+     const n=writes(),otherLease=Object.freeze({signal:lease.signal,assertCurrent:lease.assertCurrent}),foreign=createFinitePreparationIssuerStore({ctx,env});
+     let d={...common,ticketWitness:witness},s=store,l=lease,arity='normal';
+     if(b.fault==='clone')d.ticketWitness={...witness};
+     else if(b.fault==='json')d.ticketWitness=JSON.parse(JSON.stringify(witness));
+     else if(b.fault==='row')d.ticketWitness=witness.row;
+     else if(b.fault==='store')s=foreign;
+     else if(b.fault==='lease')l=otherLease;
+     else if(b.fault==='getter')Object.defineProperty(d,'consumedAt',{enumerable:true,get(){getters++;return common.consumedAt;}});
+     else if(b.fault==='witness-getter')Object.defineProperty(d,'ticketWitness',{enumerable:true,get(){getters++;return witness;}});
+     else if(b.fault==='symbol')d[Symbol('SYN')]=1;
+     else if(b.fault==='prototype')Object.setPrototypeOf(d,{});
+     else if(b.fault==='sparse'){d.expectedGrant={...grant,scopes:new Array(1)};}
+     else if(b.fault==='oversize')d.expectedGrant={...grant,scopes:['x'.repeat(65537)]};
+     else if(b.fault==='depth'){let x={};for(let k=0;k<26;k++)x={x};d.expectedGrant=x;}
+     else if(b.fault==='extra')d.approved=true;
+     else if(b.fault==='args-missing')arity='missing';
+     else if(b.fault==='args-extra')arity='extra';
+     else if(b.fault==='identity')d.identity=seal('Identity',{...i,projectRevision:2});
+     else if(b.fault==='grant-scopes')d.expectedGrant={...grant,scopes:i.requestedScopes};
+     else if(b.fault==='grant-created')d.expectedGrant={...grant,createdAt:new Date(at+1).toISOString()};
+     else if(b.fault==='grant-expires')d.expectedGrant={...grant,expiresAt:new Date(end-1).toISOString()};
+     else if(b.fault==='consumed')d.consumedAt=new Date(at-1).toISOString();
+     else if(b.fault==='Access')d.accessExpiresAt--;
+     else if(b.fault==='preconnection')d.preconnectionExpiresAt--;
+     else if(b.fault==='started')d.window={...common.window,startedAt:common.window.startedAt+1};
+     else if(b.fault==='deadline')d.window={...common.window,deadline:common.window.deadline+1};
+     result.denied=await rejected(()=>arity==='missing'?s.insertMonitoringConsent(d):arity==='extra'?s.insertMonitoringConsent(d,l,{}):s.insertMonitoringConsent(d,l));
+     result.getters=getters;result.newWrites=writes()-n;result.counts=await counts();
+    }else if(b.case==='notice-ticket-data'){
+     result.ticket=await issue();const changed={...ticket};
+     const changes={handleHash:'e'.repeat(64),requestId:U,expectedSequence:1,issuedAt:at+1,expiresAt:ticket.expiresAt-1,permissionExpiresAt:ticket.permissionExpiresAt-1};
+     changed[b.fault]=changes[b.fault];const n=writes();
+     try{result.witness=await store.observeMonitoringTicket({...common,ticket:changed},lease);}catch{result.denied=true;}
+     result.newWrites=writes()-n;result.counts=await counts();
+    }else if(b.case==='notice-signatures'){
+     const n=writes();let getters=0;const d=data();let args=[d,lease];
+     if(b.fault==='missing')args=[d];else if(b.fault==='extra')args.push({});
+     else if(b.fault==='ticket-getter')Object.defineProperty(d,'ticket',{enumerable:true,get(){getters++;return ticket;}});
+     else if(b.fault==='symbol')d[Symbol('SYN')]=1;
+     else if(b.fault==='extra-key')d.action='grant';
+     else if(b.fault==='ticket-key')d.ticket={...ticket,subject:i.subject};
+     else if(b.fault==='window-key')d.window={...common.window,C0:i.C0};
+     else if(b.fault==='grant-key')d.expectedGrant={...grant,exchangedAt:''};
+     else if(b.fault==='cap')d.identity={...i,subject:'x'.repeat(17000)};
+     result.denied=await rejected(()=>store[b.method](...args));result.getters=getters;result.newWrites=writes()-n;
+    }else{
+     if(b.target!=='ticket')result.ticket=await issue();
+     let witness=b.target==='ticket'?null:await observeTicket();if(b.target!=='ticket')result.observed=!!witness;
+     if(b.case==='notice-positive'||b.case==='notice-absolute'||b.case==='notice-global'||b.case==='notice-reduction'){
+      result.consent=await insertNotice(witness);result.witnessFrozen=Object.isFrozen(witness)&&Object.isFrozen(witness.row);
+      result.resultFrozen=Object.isFrozen(result.consent)&&Object.isFrozen(result.consent.row);
+      result.secondDenied=await rejected(()=>insertNotice(witness));
+      result.freshPrior=await createFinitePreparationIssuerStore({ctx,env}).insertMonitoringTicket(data(),lease);
+      if(b.case==='notice-reduction'){
+       const authority=createDossierMonitoringAuthorization({db,context:{grantId:i.grantId,subject:i.subject,clientId:i.clientId,resource:i.resource,scopes:grant.scopes},projectId:i.projectId,projectionSecret:'SYN-only-projection-secret-32-bytes'});
+       result.enabledBefore=(await authority()).enabled;const barrier=await close();result.enabledAfterClose=(await authority()).enabled;
+       const observation=await observe(barrier);result.revoke=await store.revokeGrant({identity:i,barrier,observation,window:clean()},lease);
+       result.resolverDeniedAfterRevoke=await rejected(authority);
+      }
+     }else{
+      const needle='INSERT INTO dossier_monitoring_'+(b.target==='ticket'?'owner_tickets':'consent_events');
+      const gate={needle,reached:false,committed:false,release:null};let release;
+      gate.wait=new Promise(resolve=>{release=resolve;});gate.release=release;noticeGate=gate;
+      const n=writes();let settled=false;
+      const pending=(b.target==='ticket'?issue():insertNotice(witness)).then(value=>{settled=true;return {value};},()=>{settled=true;return {rejected:true};});
+      while(!gate.reached&&!settled)await sleep(1);
+      if(!gate.reached)throw Error('SYN notice gate not reached');
+      result.gateReached=true;result.gateAt=gate.at;result.gateBeforeDeadline=gate.at<common.window.deadline;result.windowDeadline=common.window.deadline;
+      result.ceilings={...ceilings,ticket:ticketEnd,permission:permissionEnd};result.minimum=Math.min(...Object.values(result.ceilings));
+      result.ceiling=b.ceiling??'window';result.gateBeforeMinimum=gate.at<result.minimum;result.ties=Object.entries(result.ceilings).filter(([,v])=>v===result.minimum).map(([k])=>k);
+      if(b.case==='notice-queue')await sleep(b.ceiling?Math.max(0,result.minimum+50-Date.now()):5100);
+      else if(b.case==='notice-barrier'){result.barrier=await close();result.primaryBarrierCompleted=true;}
+      else if(b.case==='notice-race'){
+       if(b.fault==='owner')await exec('UPDATE site_projects SET user_id=? WHERE id=?','SYN-foreign-owner',i.projectId);
+       else if(b.fault==='revision')await exec('UPDATE site_projects SET revision=2 WHERE id=?',i.projectId);
+       else if(b.fault==='auth')await exec("UPDATE delegated_consent_sessions SET consumed_at='' WHERE handle_hash=?",i.authorizationHash);
+       else if(b.fault==='fence')result.barrier=await close();
+       else if(b.fault==='event')await competing();
+       else if(b.fault==='ticket'){
+        result.ordinaryUpdateDenied=await rejected(()=>exec('UPDATE dossier_monitoring_owner_tickets SET request_id=? WHERE handle_hash=?',U,ticket.handleHash));
+        await exec('DROP TRIGGER dossier_monitoring_tickets_no_update');await exec('UPDATE dossier_monitoring_owner_tickets SET request_id=? WHERE handle_hash=?',U,ticket.handleHash);
+        result.synSchemaTamperAfterPreflight=true;
+       }else{
+        const changes={user_id:'SYN-foreign-owner',project_id:'SYN-foreign-project',client_id:'SYN-foreign-client',resource:'https://foreign.invalid/mcp',scopes_json:'[]',revoked_at:new Date(at).toISOString(),created_at:new Date(at+1).toISOString(),expires_at:new Date(end-1).toISOString(),exchanged_at:'SYN-not-iso'};
+        await exec('UPDATE delegated_access_grants SET '+b.fault+'=? WHERE id=?',changes[b.fault],i.grantId);
+       }
+      }else if(b.case==='notice-ack'||b.case==='notice-held'){
+       if(!gate.committed)throw Error('SYN expected actual commit before ACK gate');
+       result.committed=true;
+       if(b.case==='notice-held'){parent.abort();await sleep(20);result.pendingAfterAbort=!settled;}
+      }
+      gate.release();result.pending=await pending;result.newWrites=writes()-n;
+      if(b.case==='notice-ack'||b.case==='notice-held'){
+       const before=writes();result.ticketRetryDenied=await rejected(issue);result.consentRetryDenied=await rejected(()=>insertNotice(witness));result.observationDenied=await rejected(observeTicket);result.retryWrites=writes()-before;
+      }
+     }
+     result.counts=await counts();result.eventsRows=(await db.prepare('SELECT * FROM dossier_monitoring_consent_events ORDER BY sequence').all()).results;
+     result.ticketRows=(await db.prepare('SELECT * FROM dossier_monitoring_owner_tickets').all()).results;
+     result.grantUnchanged=JSON.stringify(await db.prepare('SELECT * FROM delegated_access_grants WHERE id=?').bind(i.grantId).first())===beforeGrant;
+    }
+    result.rows=await snapshot();result.ticketData=ticket;result.commonWindow=common.window;
+   }else if(['missing_schema','unsupported_clock','unsupported_iso'].includes(b.case))result={rejected:await rejected(opened),consents:(await db.prepare('SELECT * FROM delegated_consent_sessions').all()).results};
-   if(['missing_schema','unsupported_clock','unsupported_iso'].includes(b.case))result={rejected:await rejected(opened),consents:(await db.prepare('SELECT * FROM delegated_consent_sessions').all()).results};
    else if(b.case==='tamper_schema'){await exec('DROP TRIGGER finite_preparation_issuer_fences_terminal_fence');await exec('CREATE TRIGGER finite_preparation_issuer_fences_terminal_fence BEFORE UPDATE ON finite_preparation_issuer_fences BEGIN SELECT 1; END');result={rejected:await rejected(opened),rows:(await snapshot())};}
    else if(b.case==='schema'){
     const barrier=await close();result.barrier=barrier;result.delayedOpen=await rejected(opened);
     result.noDelete=await rejected(()=>exec('DELETE FROM finite_preparation_issuer_fences'));
     result.immutable=await rejected(()=>exec('UPDATE finite_preparation_issuer_fences SET forward_until=forward_until+1'));
     result.noReopen=await rejected(()=>exec('UPDATE finite_preparation_issuer_fences SET fence_request_id=NULL,fenced_at=NULL'));
     result.noReterminal=await rejected(()=>exec('UPDATE finite_preparation_issuer_fences SET fenced_at=fenced_at+1'));
     result.collision=await rejected(()=>exec('INSERT INTO finite_preparation_issuer_fences SELECT ?,authorization_hash,grant_id,enrollment_hash,identity_hash,reserved_at,forward_until,cleanup_until,fence_request_id,fenced_at FROM finite_preparation_issuer_fences','d'.repeat(64)));
     result.rows=await snapshot();
    }else if(b.case==='open_then_close'){result.open=await opened();result.barrier=await close();result.authorization=await authorized();result.rows=await snapshot();}

diff --git a/test/mcp-qa-finite-preparation-notice-native.test.mjs b/test/mcp-qa-finite-preparation-notice-native.test.mjs
--- /dev/null
+++ b/test/mcp-qa-finite-preparation-notice-native.test.mjs
@@ -0,0 +1,82 @@
+import test from 'node:test';
+import assert from 'node:assert/strict';
+import {readFile} from 'node:fs/promises';
+import {build} from 'esbuild';
+import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
+import * as issuer from '../lib/mcp-qa-finite-preparation-issuer-store.mjs';
+const statements=text=>text.replace(/^--.*$/gm,'').trim().split(/;\s*(?=CREATE|$)/).map(x=>x.trim()).filter(Boolean);
+const monitoringSchema=(await Promise.all(['db/dossier-monitoring-consent.sql','db/dossier-monitoring-owner-tickets.sql'].map(path=>readFile(path,'utf8')))).flatMap(statements);
+const normalize=sql=>sql.replace(/\s+/g,' ').trim().replace(/;$/,'').replace(/^CREATE (TABLE|INDEX|TRIGGER) IF NOT EXISTS /,'CREATE $1 ');
+// One compilation for this entire file; the original issuer runner remains unchanged.
+const built=await build({entryPoints:['test/fixtures/finite-preparation-issuer-worker.mjs'],bundle:true,write:false,format:'esm',platform:'neutral',target:'es2022',external:['node:*','cloudflare:*'],legalComments:'none'});
+console.log('SYN notice fixture compilations=1 bytes='+built.outputFiles[0].contents.length);
+let serial=0;
+async function scenario(t,name,extra={}){
+ const mf=new Miniflare(convertV4MiniflareOptions({modules:true,script:built.outputFiles[0].text,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],d1Databases:{RELEASE_DB:'SYN-notice-'+(++serial)},durableObjects:{FIXTURE:{className:'FiniteIssuerFixture',useSQLite:true,uniqueKey:'SYN-notice-'+serial}}}));
+ t.after(()=>mf.dispose());const response=await mf.dispatchFetch('https://fixture.invalid',{method:'POST',body:JSON.stringify({case:name,monitoringSchema,...extra})});
+ assert.equal(response.status,200);return response.json();
+}
+function causal(r,i){
+ assert.equal(r.open.status,'applied');assert.equal(r.authorization.status,'applied');assert.equal(r.consumed,true);assert.equal(r.grant.status,'applied');assert.equal(r.grant.row.id,i.grantId);
+ assert.equal(r.error,undefined,'native grant reached; monitoring invocation: '+r.error);
+}
+test('REAL first notice uses native original issuer grant and observed ticket',async t=>{
+ const {result:r,identity:i,events}=await scenario(t,'notice-positive');causal(r,i);
+ assert.equal(r.ticket.status,'applied');assert.equal(r.observed,true);assert.equal(r.consent.status,'applied');
+ assert.equal(r.consent.row.expires_at,r.ticket.row.permission_expires_at);assert.ok(r.consent.row.expires_at-r.consent.row.issued_at>5000);
+ assert.equal(r.counts.tickets,1);assert.equal(r.counts.notices,1);assert.equal(r.rows.consents.results.length,1);assert.equal(r.rows.grants.results.length,1);assert.equal(r.grantUnchanged,true);
+ assert.equal(r.consent.row.grant_id,i.grantId);assert.equal(r.secondDenied,true);assert.equal(r.freshPrior.status,'no_mutation');assert.equal(r.witnessFrozen,true);assert.equal(r.resultFrozen,true);
+ const reads=events.filter(e=>e.sql?.includes('SELECT t.*'));assert.equal(reads.length,1);
+ for(const read of reads){assert.equal(events.find(e=>e.sid===read.sid),read,'ticket SELECT is first statement in fresh primary');assert.equal(events.find(e=>e.session===read.sid).mode,'first-primary');assert.ok(events.some(e=>e.sid<read.sid&&e.sql?.includes('PRAGMA table_info(dossier_monitoring_owner_tickets)')));}
+ assert.deepEqual(Object.keys(r.ticket.row).sort(),'handle_hash request_id user_id grant_id project_id client_id resource purpose action revision expected_sequence issued_at expires_at permission_expires_at'.split(' ').sort());
+ assert.deepEqual(Object.keys(r.consent.row).sort(),'sequence grant_id project_id user_id client_id resource revision action purpose request_id issued_at expires_at'.split(' ').sort());
+ assert.ok(Number.isSafeInteger(r.consent.row.issued_at));assert.ok(r.consent.row.issued_at>=r.ticketData.issuedAt);
+ assert.ok(events.find(e=>e.sql?.includes('INSERT INTO dossier_monitoring_consent_events')).sql.includes('n.ms'));
+});
+test('REAL first notice keeps absolute permission beyond child window',async t=>{
+ const {result:r,identity:i}=await scenario(t,'notice-absolute');causal(r,i);
+ assert.equal(r.consent.status,'applied');assert.equal(r.consent.row.expires_at,r.ticketData.permissionExpiresAt);assert.ok(r.consent.row.expires_at-r.ticketData.issuedAt>=10000);
+ assert.ok(r.commonWindow.deadline-r.commonWindow.startedAt<=5000);assert.ok(r.consent.row.expires_at>r.commonWindow.deadline);assert.ok(r.consent.row.expires_at-r.consent.row.issued_at>5000);
+});
+test('REAL global sequence is not per-grant plus one',async t=>{
+ const {result:r,identity:i}=await scenario(t,'notice-global');causal(r,i);assert.equal(r.priorMax,0);assert.ok(r.consent.row.sequence>1);assert.equal(r.eventsRows.length,3);assert.equal(r.counts.notices,1);assert.equal(r.freshPrior.status,'no_mutation');assert.equal(r.eventsRows.filter(x=>x.grant_id!==i.grantId).length,2);
+});
+test('REAL schema metadata equals unchanged original seven statements',()=>{
+ assert.equal(Object.isFrozen(issuer.FINITE_PREPARATION_MONITORING_SCHEMA),true);assert.equal(issuer.FINITE_PREPARATION_MONITORING_SCHEMA.length,7);assert.deepEqual(issuer.FINITE_PREPARATION_MONITORING_SCHEMA.map(normalize),monitoringSchema.map(normalize));
+});
+for(const fault of ['clone','json','row','store','lease','getter','witness-getter','symbol','prototype','sparse','oversize','depth','extra','args-missing','args-extra','identity','grant-scopes','grant-created','grant-expires','consumed','Access','preconnection','started','deadline'])test('REAL native notice rejects hostile DATA and foreign ticket witness '+fault,async t=>{
+ const {result:r,identity:i}=await scenario(t,'notice-hostile',{fault});causal(r,i);assert.equal(r.ticket.status,'applied');assert.equal(r.observed,true);assert.equal(r.denied,true);assert.equal(r.newWrites,0);assert.equal(r.getters,0);assert.equal(r.counts.notices,0);
+});
+for(const method of ['insertMonitoringTicket','observeMonitoringTicket'])for(const fault of ['missing','extra','ticket-getter','symbol','extra-key','ticket-key','window-key','grant-key','cap'])test('REAL native notice rejects hostile DATA and foreign ticket witness '+method+' '+fault,async t=>{
+ const {result:r,identity:i}=await scenario(t,'notice-signatures',{method,fault});causal(r,i);assert.equal(r.denied,true);assert.equal(r.newWrites,0);assert.equal(r.getters,0);
+});
+for(const fault of ['handleHash','requestId','expectedSequence','issuedAt','expiresAt','permissionExpiresAt'])test('REAL native notice current tuple races deny at commit altered ticket DATA '+fault,async t=>{
+ const {result:r,identity:i}=await scenario(t,'notice-ticket-data',{fault});causal(r,i);assert.equal(r.ticket.status,'applied');assert.ok(r.denied||r.witness===null);assert.equal(r.newWrites,0);assert.equal(r.counts.notices,0);
+});
+for(const target of ['ticket','consent'])for(const fault of ['owner','revision','user_id','project_id','client_id','resource','scopes_json','revoked_at','created_at','expires_at','exchanged_at','auth','fence','event',...(target==='consent'?['ticket']:[])])test('REAL native notice current tuple races deny at commit '+target+' '+fault,async t=>{
+ const {result:r,identity:i}=await scenario(t,'notice-race',{target,fault});causal(r,i);assert.equal(r.gateReached,true);assert.equal(r.gateBeforeDeadline,true);assert.equal(r.pending.value.status,'no_mutation');assert.equal(r.counts.notices,fault==='event'?1:0);assert.equal(r.counts.tickets,target==='ticket'?0:1);assert.equal(r.rows.grants.results.length,1);
+ if(fault==='ticket'){assert.equal(r.ordinaryUpdateDenied,true);assert.equal(r.synSchemaTamperAfterPreflight,true);}
+});
+for(const fault of ['missing-consent','missing-ticket','constraint','unique','index','trigger','extra','type','clock','iso'])test('REAL monitoring preflight denies missing or changed original schema '+fault,async t=>{
+ const {result:r,identity:i}=await scenario(t,'notice-schema',{fault});causal(r,i);assert.equal(r.denied,true);assert.equal(r.newWrites,0);
+});
+for(const target of ['ticket','consent'])test('REAL queued monitoring INSERT denies after native deadline '+target,async t=>{
+ const {result:r,identity:i}=await scenario(t,'notice-queue',{target});causal(r,i);assert.equal(r.gateReached,true);assert.equal(r.gateBeforeDeadline,true);assert.equal(r.gateBeforeMinimum,true);assert.equal(r.pending.value.status,'no_mutation');assert.equal(r.counts.notices,0);assert.equal(r.counts.tickets,target==='ticket'?0:1);
+});
+for(const target of ['ticket','consent'])for(const ceiling of ['C0','consent','grant','Access','preconnection','ticket','permission'])test('REAL queued monitoring INSERT denies earliest '+ceiling+' '+target,async t=>{
+ const {result:r,identity:i}=await scenario(t,'notice-queue',{target,ceiling});causal(r,i);assert.equal(r.gateReached,true);assert.equal(r.gateBeforeDeadline,true);assert.equal(r.gateBeforeMinimum,true);assert.equal(r.pending.value.status,'no_mutation');assert.equal(r.counts.notices,0);assert.equal(r.counts.tickets,target==='ticket'?0:1);
+ assert.equal(r.ceilings[ceiling],r.minimum);console.log('SYN ceiling '+target+' '+ceiling+' minimum='+r.minimum+' ties='+r.ties.join(',')+' gate='+r.gateAt);
+});
+for(const target of ['ticket','consent'])test('REAL original issuer barrier beats queued monitoring INSERT '+target,async t=>{
+ const {result:r,identity:i,events}=await scenario(t,'notice-barrier',{target});causal(r,i);assert.equal(r.gateReached,true);assert.equal(r.primaryBarrierCompleted,true);assert.equal(r.barrier.status,'fenced');assert.equal(r.pending.value.status,'no_mutation');assert.equal(r.counts.notices,0);assert.equal(r.counts.tickets,target==='ticket'?0:1);
+ const read=events.find(e=>e.sql?.includes('SELECT f.*'));assert.ok(read);assert.equal(events.find(e=>e.sid===read.sid),read);
+});
+test('REAL issued notice remains historical after original grant reduction',async t=>{
+ const {result:r,identity:i}=await scenario(t,'notice-reduction');causal(r,i);assert.equal(r.consent.status,'applied');assert.equal(r.enabledBefore,true);assert.equal(r.enabledAfterClose,true);assert.equal(r.revoke.status,'revoked');assert.equal(r.resolverDeniedAfterRevoke,true);assert.equal(r.counts.notices,1);assert.equal(r.rows.grants.results.length,1);assert.ok(r.rows.grants.results[0].revoked_at);
+});
+for(const target of ['ticket','consent'])test('REAL post-commit notice ACK loss blocks another write in this store '+target,async t=>{
+ const {result:r,identity:i}=await scenario(t,'notice-ack',{target});causal(r,i);assert.equal(r.gateReached,true);assert.equal(r.committed,true);assert.equal(r.pending.rejected,true);for(const k of ['ticketRetryDenied','consentRetryDenied','observationDenied'])assert.equal(r[k],true,k);assert.equal(r.retryWrites,0);assert.equal(r.counts.tickets,1);assert.equal(r.counts.notices,target==='ticket'?0:1);
+});
+for(const target of ['ticket','consent'])test('REAL held native SQL settlement cannot become successful cancellation '+target,async t=>{
+ const {result:r,identity:i}=await scenario(t,'notice-held',{target});causal(r,i);assert.equal(r.gateReached,true);assert.equal(r.committed,true);assert.equal(r.pendingAfterAbort,true);assert.equal(r.pending.rejected,true);assert.equal(r.retryWrites,0);assert.equal(r.counts.tickets,1);assert.equal(r.counts.notices,target==='ticket'?0:1);
+});

~~~
