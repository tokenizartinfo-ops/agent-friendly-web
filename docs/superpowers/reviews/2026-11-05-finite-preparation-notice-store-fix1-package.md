# Native notice-store fix round1 scoped review package

FIX_BASE=78c3bdc6fec287494ec1e2d37223c8d006ea6487; qualifiedcode=bca2a33b935a75504331bd8cd5115fea79c18357; finalreportHEAD=4016c13d27ecc80467b73e978158ca05caad1f13; finaltree=f7654ebc11f507eef4e156887b797b09d944a8c4. Exactfourcommit actualcompare/four finalpaths. Root fetched fullfiles and recomputed full U10; finalcompareblobSHAs equal qualifiedsource. Report is byte-for-byte oldreport plus appended82lines. Temporary qualifier absent. Root verified original7180char methodblock stillcontiguous/byteexact. No controller productfix.

## Open finding

Important — el estado fallido no protege operaciones concurrentes después de un await. En store199–205 monitoringFailed se comprueba una sola vez; después g verifica únicamente el lease. Interleaving permitido:1ticketINSERTcommit/ACKretenido;2observefilanativa→testigo;3consentvalidatestigo y suspendepreflight;4ticketACKfalla→monitoringFailed en179;5consentreanuda, emite NUEVO INSERT después del fallo conocido y puede devolver applied. Contradice “Cualquier fallo/ACK desconocido de una mutación bloquea ambas escrituras de avisos para esa identidad”. Observe184–190 también puede entregar testigo después del estado fallido. Fix recomendado: guard exclusivo monitoring que compruebe failed antes/después de esperas/query, originales intactos; no prometer cancelar SQL emitido o borrar filas.

## Commits

f4b661866ec031d063e922ac55a7dbfd8d15abb6 test(afw): reproduce concurrent monitoring failure absorption gap
f8d6196b4c0620c8dc5a9aef9cec45b0cbd75c5b test(afw): classify concurrent emission by actual INSERT target
bca2a33b935a75504331bd8cd5115fea79c18357 fix(afw): absorb known monitoring failure across concurrent waits
4016c13d27ecc80467b73e978158ca05caad1f13 docs(afw): append concurrent failure fix evidence and remove qualifier

## Stat

docs/superpowers/reports/2026-11-05-finite-preparation-notice-store.md | +82 -0 | f124c38da55659ae5554008cdc68f4f90a989b5f
lib/mcp-qa-finite-preparation-issuer-store.mjs | +11 -7 | efc25b2af9c80b8eb27cffe219544e974002293e
test/fixtures/finite-preparation-issuer-worker.mjs | +41 -2 | ab77081da5b3112adb841dd362af116eb8c55b90
test/mcp-qa-finite-preparation-notice-native.test.mjs | +21 -0 | f210a1807a923310dd71934131989d89440c68e8

## Controller primary verification

Root read all3roundlogs:
-42067694742/job127386336898/f4b66186 attempt1:0P3F, firsttwo genuine expected absorption failures after reachedgates; thirdcount0!=1 is fixtureclassification bug, explicitly not causalRED.
-42068064621/job127387728347/f8d6196b attempt1:one thirdcase only0P1F at absorption after realconsentcommit/heldactualPromise/knownfailure; no firsttwo repeat.
-42068293108/job127388595184/bca2a33b attempt1:exact8P0F0cancel0skip/lintdirectedexit0, onefixturebuild196400B.3newconcurrent+2ACKloss+2held+1causalpositive. Sourcechangedmonitoring-onlyguard/awaitboundaries; no147/33issuer/fullmatrix/standardrerun. BeforeSQLcase emitted0/persisted0; pendingobserve emitted0/persisted0; alreadycommittedcase emitted1/persisted1. AllticketGate/boundaryGate/failureKnown true, afterFailure0; caller rejection is distinctfromphysicalcancellation. Totalround3fixturebuilds / fullcomponent38 inclprior35,0standard. npmci --ignore-scripts actualthisround; oldinstallcommands/warningshistoryunchanged. No realprovider/runtime/authorityoperation.

Scope: verify assignedImportant is addressed and newbreakage in fixdiff only. Originalbrief and bindingfixbrief remain at linkedrefs in report. Do not re-review untouchedcode or re-run suites. Existingwarnings/previousMinors are finalwholebranchtriage; out-of-scopefindingsledgered.

## Full U10 fix diff

~~~diff
diff --git a/docs/superpowers/reports/2026-11-05-finite-preparation-notice-store.md b/docs/superpowers/reports/2026-11-05-finite-preparation-notice-store.md
--- a/docs/superpowers/reports/2026-11-05-finite-preparation-notice-store.md
+++ b/docs/superpowers/reports/2026-11-05-finite-preparation-notice-store.md
@@ -121,10 +121,92 @@
 
 Final expected BASE diff: store, fixture, new test, this report. Root independently reads the actual final tree/diff and reviews spec+quality; this receipt does not substitute for that review.
 
 ## Ceiling of this evidence and remaining work
 
 Caller identity/Access/preconnection/approval inputs are explicit SYN DATA, not authentication or human consent. Instance-local Set/WeakMap state is not durable idempotency or a journal. An ACK-lost row can remain historical without caller success and without retry authority. CLOSE alone neither deletes the event nor revokes an existing grant; grant reduction is not human withdrawal of monitoring consent or complete cleanup.
 
 D0.4 remains accepted and untouched; no token→notice integration, source human decision, notice journal/fixed receiver/provenance/NoticeLink, downstream notice phase/third CLOSED preparation, own SEND/full setup/cleanup/guard/preflight package, mount, ARM, real subscription/delivery/withdrawal or coordinated PC-off occurrence is established here. Prior Minor D0.3 OAuth-error precision and fanout fixture cleanup remain deferred to whole-branch triage per their existing ledger.
 
 Expired source ceiling 2026-11-03T02:59Z was never renewed. No runtime/provider/alias/Entry/DDL/grant real, browser/OAuth/OTP/token/access, cron/Container/Max, main or merge operation. operationalReadiness=false; completePackage=false; PCoff=false.
+
+## Fix round 1/5 — concurrent failure absorption (2026-11-05 UTC)
+
+Current implementation status: DONE, pending the same independent reviewer's scoped re-review. This append preserves the original receipt verbatim as dated evidence; the 147-test GREEN above is the earlier codeHEAD, not a claim that those suites ran again after this fix.
+
+FIX_BASE=`78c3bdc6fec287494ec1e2d37223c8d006ea6487`, tree `5ccf430216d2d9b218d755382c7a16186b7afd09`, same isolated branch and original three-product-file scope. [Binding fix brief](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/e063b13ac696910e20b2bc7e72257000ff78fdeb/docs/superpowers/fixes/2026-11-05-finite-preparation-notice-store-fix1.md).
+
+Reviewer Important finding: monitoringFailed was only checked before async preflight. A held ticket ACK could fail while consent preflight or ticket observation was suspended; their lease-only guards could then emit new consent SQL or deliver a late witness/applied result after a known mutation failure. Root confirmed the real gap; the contract was not weakened.
+
+### Minimal change
+
+A private `monitoringGuard(identityHash,lease)` composes the existing original lease/holder guard with absorbing monitoringFailed checks. Only the three monitoring methods use it. Existing query/c.wait boundaries therefore check failure before issuing SQL and after real Promise settlement; monitoring methods also check immediately after preflight/query awaits and before delivering a result/witness. Monitoring preflight checks after awaiting the original issuer preflight. No mutex, callback, framework, product hook, new clock or authority factory.
+
+Original factory/input/preflight/helpers and all original openFence through revokeGrant bodies remain byteexact and contiguous. Existing SQL, DATA signatures, schema metadata, absolute expiries, attempts, lease semantics and authority are unchanged. Production import/mount/dependency graph is unchanged.
+
+New SYN fixture scheduling holds the actual ticket INSERT's committed ACK; it can then hold consent's real preflight, actual ticket SELECT settlement, or actual consent INSERT settlement. It counts native INSERT invocation by the INSERT target (not a joined table), retains actual Promises, observes ticket rejection as failure-known before release, and reports only SYN metadata. No returned SQL row/predicate is replaced.
+
+Qualified fix codeHEAD=`bca2a33b935a75504331bd8cd5115fea79c18357`; tree `048d092947ad61ec62017e5202c0deebc6b7a986`.
+
+Product blobs at that head:
+- store `efc25b2af9c80b8eb27cffe219544e974002293e`;
+- fixture `ab77081da5b3112adb841dd362af116eb8c55b90`;
+- notice tests `f210a1807a923310dd71934131989d89440c68e8`.
+
+Fix reportHEAD/tree are the final append/qualifier-removal commit resolved by final CAS readback and final handoff. Those product blobs remain identical to qualified fix codeHEAD; no repeat suite is claimed for the report head.
+
+### Causal RED and the bounded fixture correction
+
+1. [Run 42067694742](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42067694742), [job 127386336898](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42067694742/job/127386336898), attempt 1, head `f4b661866ec031d063e922ac55a7dbfd8d15abb6`, tree `afacdaa41d7b12a991bfac7f7ca1b6326fb4aa35`. Command selected the three new concurrent tests. TAP 3 tests/0 pass/3 fail/0 cancelled/0 skip/0 todo, 1860.876376ms; fixture compiled once, 196043 bytes. Cases 1 and 2 passed all actual grant/commit/gate/failure-known prerequisites, then failed `known mutation failure must absorb concurrent result` as expected. Case 3 reached the real consent commit/ACK hold but failed a SYN emission bookkeeping assertion 0!=1: classification inspected any owner_tickets occurrence, including the consent SQL JOIN. That third assertion is explicitly NOT qualifying RED and is not attributed to production.
+2. Corrected only the fixture's INSERT-target classification and scoped the next RED to case 3 alone; no accepted first-two case or issuer suite repeated. [Run 42068064621](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42068064621), [job 127387728347](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42068064621/job/127387728347), attempt 1, head `f8d6196b4c0620c8dc5a9aef9cec45b0cbd75c5b`, tree `0c518381dbebbbbcf98c24b9bf611019182c4004`. TAP 1 test/0 pass/1 fail/0 cancelled/0 skip/0 todo, 1520.36513ms; fixture once, 196074 bytes. Actual consent row present, emitted count 1, original pending Promise retained, ticket ACK failure known, then the same absorption assertion failed. This is case 3's causal RED.
+
+No product guard fix was committed before these REDs.
+
+```text
+npm ci --ignore-scripts --no-audit --no-fund
+node --test --test-name-pattern="REAL concurrent monitoring failure" test/mcp-qa-finite-preparation-notice-native.test.mjs
+# Corrected third-case RED only:
+node --test --test-name-pattern="REAL concurrent monitoring failure cannot return applied after emitted consent" test/mcp-qa-finite-preparation-notice-native.test.mjs
+```
+
+### Targeted GREEN and lint
+
+[Run 42068293108](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42068293108), [job 127388595184](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42068293108/job/127388595184), attempt 1, exact fix codeHEAD/tree above; terminal success.
+
+```text
+npm ci --ignore-scripts --no-audit --no-fund
+node --test --test-name-pattern="REAL concurrent monitoring failure|REAL post-commit notice ACK loss|REAL held native SQL settlement|REAL first notice uses native original issuer grant" test/mcp-qa-finite-preparation-notice-native.test.mjs
+node node_modules/eslint/bin/eslint.js lib/mcp-qa-finite-preparation-issuer-store.mjs test/fixtures/finite-preparation-issuer-worker.mjs test/mcp-qa-finite-preparation-notice-native.test.mjs
+```
+
+Exactly 8 meaningful tests: 3 new concurrent + 2 original ticket/consent ACK-loss + 2 original ticket/consent held settlement + 1 original causal positive. TAP 8 pass/0 fail/0 cancelled/0 skip/0 todo; 3137.840399ms. Scoped ESLint exit 0, no rule diagnostics. One native fixture compilation in GREEN: 196400 bytes. No standard compilation or production graph change; no 147-case/full matrix, 33 issuer, SDK/fanout, full CI, provider or runtime repeat.
+
+All three new tests assert actual original grant chain, ticket commit/ACK gate and second native gate reached before child deadline, ticket rejection observed before release, original pending Promise still pending after failure, and no late success/witness. Actual GREEN metadata:
+
+```text
+SYN concurrent notice-concurrent-before ticketGate=true boundaryGate=true failureKnown=true emitted=0 afterFailure=0 persisted=0
+SYN concurrent notice-concurrent-observation ticketGate=true boundaryGate=true failureKnown=true emitted=0 afterFailure=0 persisted=0
+SYN concurrent notice-concurrent-after ticketGate=true boundaryGate=true failureKnown=true emitted=1 afterFailure=0 persisted=1
+```
+
+Case 1's preflight read was already invoked before failure and may settle afterward; no consent INSERT was emitted afterward. Case 2's real SELECT row was held before delivery; it did not become a witness after failure. Case 3's real consent INSERT committed before failure, and its retained Promise settled only after release: the row remains while caller receives rejection. This proves neither cancellation of already-issued SQL nor physical drain, rollback, deletion or cross-RPC replay exclusion.
+
+Three native fixture compilations across this fix round (first RED, corrected third-only RED, GREEN), zero standard builds. Previous receipt's 35 native compilations are historical; no rerun to recover hashes. Each of these three jobs installed 649 packages only on the existing cloud runner with --ignore-scripts. No local clone/dependencies/tests/build/process.
+
+Actual warnings across this round, deduplicated with process IDs omitted:
+
+```text
+[DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
+[DEP0169] DeprecationWarning: `url.parse()` behavior is not standardized and prone to errors that have security implications. Use the WHATWG URL API instead. CVEs are not issued for `url.parse()` vulnerabilities.
+npm warn deprecated @esbuild-kit/esm-loader@2.6.5: Merged into tsx: https://tsx.hirok.io
+npm warn deprecated @esbuild-kit/core-utils@3.3.2: Merged into tsx: https://tsx.hirok.io
+npm warn deprecated eslint@9.39.4: This version is no longer supported. Please see https://eslint.org/version-support for other options.
+##[warning]Node.js 20 is deprecated. The following actions target Node.js 20 but are being forced to run on Node.js 24: actions/checkout@v4, actions/setup-node@v4. For more information see: https://github.blog/changelog/2025-09-19-deprecation-of-node-20-on-github-actions-runners/
+```
+
+The normal Git initial-default-branch advisory also occurred. No native compiler/test or ESLint-rule warning.
+
+### Final FIX_BASE diff and limits
+
+Only store, fixture, notice test and this report change from FIX_BASE after temporary qualifier removal. Native schema constants and both original db files remain unchanged; phase blob `ebebaa9542c2408c0d505d1e23daa946762c1cab` and M blob `d979f395029c9b1e66a99222d06acf99eba4f358` are inherited unchanged. Original issuer methods and input/preflight helpers were compared as exact source substrings against FIX_BASE/original BASE. All ref moves were expected-head CAS direct-child commits followed by actual ref readback, without force or foreign overwrite.
+
+Temporary contents:read/metadata:read qualifier, checkout persist-credentials:false/fetch-depth:1, is removed from final diff. No secrets or provider credentials, no new tools/dependencies/import graph, no real DDL/grant/alias/Entry/runtime/OTP/OAuth/token/access/cron/Container/Max/main/merge or downstream unit. Previous authority ruling and whole-branch deferred Minors stay as recorded above. operationalReadiness=false; completePackage=false; PCoff=false. Root owns actual FIX_BASE..reportHEAD full diff and same-reviewer scoped acceptance.

diff --git a/lib/mcp-qa-finite-preparation-issuer-store.mjs b/lib/mcp-qa-finite-preparation-issuer-store.mjs
--- a/lib/mcp-qa-finite-preparation-issuer-store.mjs
+++ b/lib/mcp-qa-finite-preparation-issuer-store.mjs
@@ -116,20 +116,24 @@
   return exactFence(r,i,requestId);
  }
  async function barrierResult(i,requestId,w,g,lease,ack=null){
   const row=await readBarrier(i,requestId,w,g);if(ack)check(canonical(row)===canonical(ack));
   const result=Object.freeze({status:'fenced',row,rowHash:hash('afw.finite-preparation-issuer-row.v1',row)});
   barriers.set(result,{identityHash:i.identityHash,lease,row});return result;
  }
 
  // New notice boundary deliberately leaves the original input/preflight untouched.
  const monitoringWitnesses=new WeakMap(),ticketAttempts=new Set(),noticeAttempts=new Set(),monitoringFailed=new Set();
+ function monitoringGuard(id,lease){
+  const original=c.leaseGuard(lease);
+  return ()=>{check(!monitoringFailed.has(id));original();check(!monitoringFailed.has(id));};
+ }
  function monitoringInput(options,hasWitness,argc){
   check(argc===2);const names=[...monitoringNames,hasWitness?'ticketWitness':'ticket'];fields(options,names);
   const data=own(Object.fromEntries(names.filter(k=>k!=='ticketWitness').map(k=>[k,Object.getOwnPropertyDescriptor(options,k).value])));
   const i=identity(data.identity),w=data.window;fields(w,['startedAt','deadline']);
   check(issuerTime(w.startedAt)&&issuerTime(w.deadline)&&w.startedAt<w.deadline&&w.deadline-w.startedAt<=5000&&w.startedAt>=i.reservedAt);
   check(i.actorId===c.actorId&&i.qaVersionId===c.qa);forward(i,w);grantData(data.expectedGrant,i);
   check(issuerIso(data.consumedAt)&&Date.parse(data.consumedAt)>=i.reservedAt&&Date.parse(data.expectedGrant.createdAt)>=Date.parse(data.consumedAt));
   check(issuerTime(data.accessExpiresAt)&&issuerTime(data.preconnectionExpiresAt)&&data.accessExpiresAt<=i.C0&&data.preconnectionExpiresAt<=i.C0);
   return data;
  }
@@ -143,21 +147,21 @@
   check(Buffer.byteLength(canonical({...data,ticket:t}))<=16384);
   return t;
  }
  const monitoringCommon=data=>Object.freeze(Object.fromEntries(monitoringNames.map(k=>[k,data[k]])));
  function monitoringValues(d,t){return [...values(d.identity,d.window),JSON.stringify(d.expectedGrant.scopes),d.expectedGrant.createdAt,d.expectedGrant.expiresAt,d.consumedAt,d.accessExpiresAt,d.preconnectionExpiresAt,t.handleHash,t.requestId,t.expectedSequence,t.issuedAt,t.expiresAt,t.permissionExpiresAt];}
  function expectedTicket(d,t){const i=d.identity;return {handle_hash:t.handleHash,request_id:t.requestId,user_id:i.subject,grant_id:i.grantId,project_id:i.projectId,client_id:i.clientId,resource:i.resource,purpose:'afw.dossier-monitoring-owner.v1',action:'grant',revision:i.projectRevision,expected_sequence:t.expectedSequence,issued_at:t.issuedAt,expires_at:t.expiresAt,permission_expires_at:t.permissionExpiresAt};}
  function monitoringRow(row,expected,names){
   const snapshot=own(row);fields(snapshot,names);check(Object.entries(expected).every(([k,v])=>snapshot[k]===v));return snapshot;
  }
  async function monitoringPreflight(g){
+  await preflight(g);g();
-  await preflight(g);
   const s=Reflect.apply(c.session,c.db,['first-primary']);
   const rows=(await query("SELECT type,name,tbl_name,sql FROM sqlite_schema WHERE tbl_name IN ('dossier_monitoring_consent_events','dossier_monitoring_owner_tickets') AND sql IS NOT NULL ORDER BY name",[],g,s,'all')).results??[];
   check(rows.length===FINITE_PREPARATION_MONITORING_SCHEMA.length);
   for(const def of FINITE_PREPARATION_MONITORING_SCHEMA){
    const [,kind,name]=def.match(/^CREATE (TABLE|INDEX|TRIGGER) IF NOT EXISTS (\w+)/);
    const table=kind==='TABLE'?name:def.match(/(?: ON | ON)(\w+)/)?.[1];
    // Index syntax has ON table without surrounding spaces; triggers have ON table.
    check(rows.some(r=>r.type===kind.toLowerCase()&&r.name===name&&r.tbl_name===table&&typeof r.sql==='string'&&monitoringNormalize(r.sql)===monitoringNormalize(def)));
   }
   for(const table of monitoringTables){
@@ -166,47 +170,47 @@
    const shape=(await query('PRAGMA table_info('+table+')',[],g,s,'all')).results??[];
    check(shape.length===names.length&&shape.every((col,j)=>col.cid===j&&col.name===names[j]&&col.type.toUpperCase()===(integers.has(col.name)?'INTEGER':'TEXT')&&col.pk===(j===0?1:0)&&col.notnull===(j===0?0:1)&&col.dflt_value===null));
   }g();
  }
  return Object.freeze({
   async insertMonitoringTicket(options,lease){
    let id;
    try{
     const d=monitoringInput(options,false,arguments.length),t=monitoringTicket(d,d.ticket);id=d.identity.identityHash;
     check(!monitoringFailed.has(id)&&!ticketAttempts.has(id)&&!noticeAttempts.has(id));ticketAttempts.add(id);
+    const g=monitoringGuard(id,lease);g();await monitoringPreflight(g);g();
-    const g=c.leaseGuard(lease);g();await monitoringPreflight(g);
     const row=await query(monitoringCte+'INSERT INTO dossier_monitoring_owner_tickets ('+ticketColumns.join(',')+') SELECT '+ticketExpressions.join(',')+monitoringFrom+' WHERE '+monitoringLive+' RETURNING '+ticketColumns.join(','),monitoringValues(d,t),g);
+    g();return row?Object.freeze({status:'applied',row:monitoringRow(row,expectedTicket(d,t),ticketColumns)}):Object.freeze({status:'no_mutation'});
-    return row?Object.freeze({status:'applied',row:monitoringRow(row,expectedTicket(d,t),ticketColumns)}):Object.freeze({status:'no_mutation'});
    }catch{if(id)monitoringFailed.add(id);fail();}
   },
   async observeMonitoringTicket(options,lease){
    try{
     const d=monitoringInput(options,false,arguments.length),t=monitoringTicket(d,d.ticket),id=d.identity.identityHash;
+    check(!monitoringFailed.has(id));const g=monitoringGuard(id,lease);g();await monitoringPreflight(g);g();
-    check(!monitoringFailed.has(id));const g=c.leaseGuard(lease);g();await monitoringPreflight(g);
     // This conditional SELECT is the FIRST statement on a NEW first-primary.
     const s=Reflect.apply(c.session,c.db,['first-primary']);
     const row=await query(monitoringCte+'SELECT t.*'+monitoringFrom+' JOIN dossier_monitoring_owner_tickets t ON '+monitoringTicketMatch+' WHERE '+monitoringLive,monitoringValues(d,t),g,s);
+    g();if(!row)return null;
-    if(!row)return null;
     const detached=monitoringRow(row,expectedTicket(d,t),ticketColumns),out=Object.freeze({status:'observed',row:detached});
     monitoringWitnesses.set(out,{row:detached,identityHash:id,common:monitoringCommon(d),ticket:t,lease,used:false});return out;
    }catch{fail();}
   },
   async insertMonitoringConsent(options,lease){
    let id;
    try{
     const d=monitoringInput(options,true,arguments.length),fact=monitoringWitnesses.get(Object.getOwnPropertyDescriptor(options,'ticketWitness').value);id=d.identity.identityHash;
     check(fact&&!fact.used&&fact.identityHash===id&&fact.lease===lease&&canonical(fact.common)===canonical(monitoringCommon(d)));
     const t=monitoringTicket(d,fact.ticket);
     check(!monitoringFailed.has(id)&&!noticeAttempts.has(id));fact.used=true;noticeAttempts.add(id);
+    const g=monitoringGuard(id,lease);g();await monitoringPreflight(g);g();
-    const g=c.leaseGuard(lease);g();await monitoringPreflight(g);
     const row=await query(monitoringCte+"INSERT INTO dossier_monitoring_consent_events ("+eventColumns.slice(1).join(',')+") SELECT q.grant_id,q.project,q.subject,q.client,q.resource,q.revision,'grant','afw.dossier-monitoring.v1',q.request,n.ms,q.permission"+monitoringFrom+' JOIN dossier_monitoring_owner_tickets t ON '+monitoringTicketMatch+' WHERE '+monitoringLive+' RETURNING '+eventColumns.join(','),monitoringValues(d,t),g);
+    g();if(!row)return Object.freeze({status:'no_mutation'});
-    if(!row)return Object.freeze({status:'no_mutation'});
     check(Number.isSafeInteger(row.sequence)&&row.sequence>0&&issuerTime(row.issued_at)&&row.issued_at>=Math.max(d.window.startedAt,t.issuedAt)&&row.issued_at<Math.min(d.window.deadline,t.permissionExpiresAt));
     const i=d.identity,expected={grant_id:i.grantId,project_id:i.projectId,user_id:i.subject,client_id:i.clientId,resource:i.resource,revision:i.projectRevision,action:'grant',purpose:'afw.dossier-monitoring.v1',request_id:t.requestId,expires_at:t.permissionExpiresAt};
     return Object.freeze({status:'applied',row:monitoringRow(row,expected,eventColumns)});
    }catch{if(id)monitoringFailed.add(id);fail();}
   },
 
   async openFence(options,lease){
    const {identity:i,window:w}=input(options,['identity','window']);forward(i,w);const g=c.leaseGuard(lease);await preflight(g);
    const row=await query(cte+'INSERT INTO '+T+' ('+columns.join(',')+') SELECT '+columns.map(k=>'q.'+k).join(',')+' FROM q,n WHERE '+owner+' AND '+live+' RETURNING *',values(i,w),g);
    return row?Object.freeze({status:'applied',row:exactFence(row,i,null,false)}):Object.freeze({status:'no_mutation'});

diff --git a/test/fixtures/finite-preparation-issuer-worker.mjs b/test/fixtures/finite-preparation-issuer-worker.mjs
--- a/test/fixtures/finite-preparation-issuer-worker.mjs
+++ b/test/fixtures/finite-preparation-issuer-worker.mjs
@@ -14,24 +14,29 @@
   const exec=async(sql,...args)=>db.prepare(sql).bind(...args).run();
   await exec('CREATE TABLE IF NOT EXISTS site_projects (id TEXT PRIMARY KEY,user_id TEXT NOT NULL,revision INTEGER NOT NULL)');
   await exec("CREATE TABLE IF NOT EXISTS delegated_consent_sessions (handle_hash TEXT PRIMARY KEY,user_id TEXT,kind TEXT,project_id TEXT,client_id TEXT,resource TEXT,scopes_json TEXT,expires_at TEXT,consumed_at TEXT NOT NULL DEFAULT '')");
   await exec("CREATE TABLE IF NOT EXISTS delegated_access_grants (id TEXT PRIMARY KEY,user_id TEXT,client_id TEXT,project_id TEXT,resource TEXT,scopes_json TEXT,created_at TEXT,expires_at TEXT,revoked_at TEXT NOT NULL DEFAULT '',exchanged_at TEXT NOT NULL DEFAULT '')");
   if(b.case!=='missing_schema')for(const sql of schema)await exec(sql);
   if(b.case.startsWith('notice-'))for(const sql of b.monitoringSchema)await exec(sql);
   const at=(await db.prepare("SELECT CAST(unixepoch('subsec')*1000 AS INTEGER) AS ms").first()).ms;
   const identity=seal('Identity',{preconnectionId:H,enrollmentHash:H,capsuleHash:H,sourceRevision:'b'.repeat(40),qaVersionId:U,actorId:this.ctx.id.toString(),subject:'SYN-owner',accessRealmHash:H,projectId:'SYN-project',projectRevision:1,clientId:'SYN-client',resource:'https://delegated-canary.agentfriendlyweb.dev/mcp',authorizationHash:'c'.repeat(64),grantId:U,requestedScopes:['afw:project:read','afw:evidence:read'],consentExpiresAt:new Date(at+(b.case.startsWith('notice-')?24000:12000)).toISOString(),I0:at-1000,C0:at+899000,C1:at+1079000,reservedAt:at-5});
   const i=b.case.startsWith('notice-')&&b.ceiling==='C0'?seal('Identity',{...identity,I0:at-897000,C0:at+3000,C1:at+183000,consentExpiresAt:new Date(at+3000).toISOString()}):b.case.startsWith('notice-')&&b.ceiling==='consent'?seal('Identity',{...identity,consentExpiresAt:new Date(at+3000).toISOString()}):['C0_queue','expired_cleanup','C0_grant_queue'].includes(b.case)?seal('Identity',{...identity,I0:at-899200,C0:at+800,C1:at+180800,consentExpiresAt:new Date(at+800).toISOString()}):b.case==='consent_queue'?seal('Identity',{...identity,consentExpiresAt:new Date(at+500).toISOString()}):identity;
   const parent=new AbortController(),lease=Object.freeze({signal:parent.signal,assertCurrent(){if(parent.signal.aborted||Date.now()>=at+30000)throw Error('SYN original lease expired');}});
+  let delay=null,lose=null,holdAck=null,sessionId=0,sqlCount=0,grantCommitted=false,noticeGate=null,noticeClock=null,noticeConcurrent=null;
-  let delay=null,lose=null,holdAck=null,sessionId=0,sqlCount=0,grantCommitted=false,noticeGate=null,noticeClock=null;
   const wrapper={withSession(mode){events.push({session:++sessionId,mode});const sid=sessionId,s=db.withSession(mode);return {prepare(sql){events.push({sid,sql});const actualSql=(b.case==='unsupported_clock'||noticeClock==='clock')&&sql.includes(' AS ms,typeof(')?sql.replaceAll("'subsec'","'SYN-unsupported'"):(b.case==='unsupported_iso'||noticeClock==='iso')&&sql.includes(' AS ms,typeof(')?sql.replaceAll("'2026-11-04T12:00:00.123Z'","'SYN-not-iso'"):sql;const stmt=s.prepare(actualSql);return {bind(...args){const bound=stmt.bind(...args);const call=method=>async()=>{sqlCount++;if(delay&&sql.includes(delay.needle)){const d=delay;delay=null;await sleep(d.ms);}const gate=noticeGate&&sql.includes(noticeGate.needle)?noticeGate:null;
       if(gate&&!['notice-ack','notice-held'].includes(b.case)){gate.reached=true;gate.at=Date.now();await gate.wait;}
+      const nc=noticeConcurrent,nb=nc?.boundary;
+      if(nc?.phase==='preflight'&&sql.includes('SELECT type,name,tbl_name,sql FROM sqlite_schema')&&!nb.reached){nb.reached=true;nb.at=Date.now();await nb.wait;}
+      if(nc&&sql.includes('INSERT INTO dossier_monitoring_'))nc.emitted.push({kind:sql.includes('INSERT INTO dossier_monitoring_owner_tickets')?'ticket':'consent',at:Date.now(),afterFailure:nc.failureKnown});
       const result=await bound[method]();
+      if(nc&&sql.includes('INSERT INTO dossier_monitoring_owner_tickets')){const tg=nc.ticketAck;tg.nativeRow=!!result;tg.at=Date.now();tg.reached=true;await tg.wait;throw Error('SYN actual concurrent ticket ACK lost');}
+      if(nc&&((nc.phase==='observation'&&sql.includes('SELECT t.*'))||(nc.phase==='consent-ack'&&sql.includes('INSERT INTO dossier_monitoring_consent_events')))){nb.nativeRow=!!result;nb.at=Date.now();nb.reached=true;await nb.wait;}
       if(gate&&['notice-ack','notice-held'].includes(b.case)){gate.committed=true;gate.reached=true;gate.at=Date.now();await gate.wait;if(b.case==='notice-ack')throw Error('SYN post-commit notice ACK loss');}if(sql.includes('INSERT INTO delegated_access_grants'))grantCommitted=true;if(holdAck&&sql.includes(holdAck.needle)){const d=holdAck;holdAck=null;await sleep(d.ms);}if(lose&&sql.includes(lose)){lose=null;throw Error('SYN lost actual native SQL ACK');}return result;};return {first:call('first'),all:call('all'),run:call('run')};}};}};}};
   let txFault=null,txCommitted=false;
   const nativeStorage=this.ctx.storage;
   const storage={get:async(...args)=>{const v=await nativeStorage.get(...args);return txFault==='readback_loss'&&txCommitted?'SYN-readback-loss':v;},list:(...args)=>nativeStorage.list(...args),sync:async()=>{if(txFault==='readback_loss')return nativeStorage.sync();if(txFault==='sync_loss')throw Error('SYN sync loss');return nativeStorage.sync();},transaction:async callback=>{
    const result=await nativeStorage.transaction(async tx=>{const r=await callback(tx);if(txFault==='callback_throw')throw Error('SYN final native transaction callback throw');return r;});txCommitted=true;
    // Hold AFTER the actual transaction final return; no interior read/release deadlock.
    if(txFault==='post_commit_hold'){parent.abort();await sleep(20);}
    if(txFault==='final_throw')throw Error('SYN native final ACK loss');return result;
   }};
   const ctx={storage,id:this.ctx.id},env={RELEASE_DB:wrapper,AFW_QA_VERSION:{id:U},AFW_INDEPENDENT_CLOSURE:this.env.FIXTURE};
@@ -67,21 +72,55 @@
     const data=()=>({...common,ticket});
     const counts=async()=>({tickets:(await db.prepare('SELECT COUNT(*) AS n FROM dossier_monitoring_owner_tickets').first()).n,notices:(await db.prepare('SELECT COUNT(*) AS n FROM dossier_monitoring_consent_events WHERE grant_id=?').bind(i.grantId).first()).n});
     const writes=()=>events.filter(e=>e.sql?.includes('INSERT INTO dossier_monitoring_')).length;
     const issue=()=>store.insertMonitoringTicket(data(),lease);
     const observeTicket=()=>store.observeMonitoringTicket(data(),lease);
     const insertNotice=(w,s=store,l=lease,d=common)=>s.insertMonitoringConsent({...d,ticketWitness:w},l);
     const competing=async(foreign=false)=>{
      await exec("INSERT INTO dossier_monitoring_consent_events(grant_id,project_id,user_id,client_id,resource,revision,action,purpose,request_id,issued_at,expires_at) VALUES (?,?,?,?,?,1,'grant','afw.dossier-monitoring.v1',?,?,?)",foreign?'SYN-foreign':i.grantId,i.projectId,i.subject,i.clientId,i.resource,foreign?U:'33333333-3333-4333-8333-333333333333',at,at+15000);
     };
     if(b.case==='notice-global'){await competing(true);await exec("INSERT INTO dossier_monitoring_consent_events(grant_id,project_id,user_id,client_id,resource,revision,action,purpose,request_id,issued_at,expires_at) VALUES ('SYN-second',?,?,?,?,1,'grant','afw.dossier-monitoring.v1',?,?,?)",i.projectId,i.subject,i.clientId,i.resource,U,at,at+15000);result.priorMax=(await db.prepare('SELECT COALESCE(MAX(sequence),0) AS n FROM dossier_monitoring_consent_events WHERE grant_id=?').bind(i.grantId).first()).n;}
+
+    if(b.case.startsWith('notice-concurrent-')){
+     // SYN scheduling gates only; every result below comes from real D1.
+     const latch=()=>{let release;const wait=new Promise(resolve=>{release=resolve;});return {wait,release,reached:false,at:null,nativeRow:false};};
+     const ticketAck=latch(),boundary=latch();
+     noticeConcurrent={ticketAck,boundary,phase:null,failureKnown:false,emitted:[],kind:b.case};
+     let ticketSettled=false;const ticketPending=issue().then(value=>{ticketSettled=true;return {value};},()=>{ticketSettled=true;return {rejected:true};});
+     while(!ticketAck.reached&&!ticketSettled)await sleep(1);
+     if(!ticketAck.reached||!ticketAck.nativeRow)throw Error('SYN concurrent ticket commit gate not reached');
+     result.ticketCommitGate=true;result.ticketGateBeforeDeadline=ticketAck.at<common.window.deadline;
+     let pendingSettled=false,pending;
+     if(b.case==='notice-concurrent-observation'){
+      noticeConcurrent.phase='observation';
+      pending=observeTicket().then(value=>{pendingSettled=true;return {value};},()=>{pendingSettled=true;return {rejected:true};});
+     }else{
+      const witness=await observeTicket();result.observed=!!witness;
+      if(!witness)throw Error('SYN concurrent native witness not reached');
+      noticeConcurrent.phase=b.case==='notice-concurrent-before'?'preflight':'consent-ack';
+      pending=insertNotice(witness).then(value=>{pendingSettled=true;return {value};},()=>{pendingSettled=true;return {rejected:true};});
+     }
+     while(!boundary.reached&&!pendingSettled)await sleep(1);
+     if(!boundary.reached)throw Error('SYN concurrent boundary not reached');
+     result.boundaryGate=true;result.boundaryBeforeDeadline=boundary.at<common.window.deadline;
+     result.nativeBoundaryRow=boundary.nativeRow;result.boundaryAt=boundary.at;
+     ticketAck.release();result.ticketFailure=await ticketPending;
+     if(!result.ticketFailure.rejected)throw Error('SYN actual ticket ACK failure not observed');
+     noticeConcurrent.failureKnown=true;result.failureKnown=true;result.failureAt=Date.now();
+     await sleep(20);result.pendingAfterFailure=!pendingSettled;
+     result.emittedBeforeRelease=noticeConcurrent.emitted.filter(e=>e.kind==='consent').length;
+     boundary.release();result.pending=await pending;
+     result.consentEmitted=noticeConcurrent.emitted.filter(e=>e.kind==='consent').length;
+     result.newEmissionsAfterFailure=noticeConcurrent.emitted.filter(e=>e.afterFailure).length;
+     result.emitted=noticeConcurrent.emitted.map(e=>({kind:e.kind,at:e.at,afterFailure:e.afterFailure}));
+     result.counts=await counts();result.nativeObservationRow=b.case==='notice-concurrent-observation'&&boundary.nativeRow;
+    }else if(b.case==='notice-schema'){
-    if(b.case==='notice-schema'){
      if(b.fault==='clock')noticeClock='clock';else if(b.fault==='iso')noticeClock='iso';
      else if(b.fault==='type'){await exec('DROP TABLE dossier_monitoring_owner_tickets');await exec('CREATE TABLE dossier_monitoring_owner_tickets (handle_hash TEXT PRIMARY KEY,request_id TEXT,user_id TEXT,grant_id TEXT,project_id TEXT,client_id TEXT,resource TEXT,purpose TEXT,action TEXT,revision TEXT,expected_sequence INTEGER,issued_at INTEGER,expires_at INTEGER,permission_expires_at INTEGER)');}
      else if(b.fault==='extra')await exec('CREATE INDEX SYN_extra_notice ON dossier_monitoring_owner_tickets(grant_id)');
      else{
       const table=b.fault==='missing-consent'?'dossier_monitoring_consent_events':'dossier_monitoring_owner_tickets';
       if(b.fault.startsWith('missing-'))await exec('DROP TABLE '+table);
       else if(b.fault==='index')await exec('DROP INDEX dossier_monitoring_consent_grant_sequence');
       else if(b.fault==='trigger')await exec('DROP TRIGGER dossier_monitoring_tickets_no_delete');
       else{
        // SYN only: reconstruct an empty table with exactly one missing constraint.

diff --git a/test/mcp-qa-finite-preparation-notice-native.test.mjs b/test/mcp-qa-finite-preparation-notice-native.test.mjs
--- a/test/mcp-qa-finite-preparation-notice-native.test.mjs
+++ b/test/mcp-qa-finite-preparation-notice-native.test.mjs
@@ -73,10 +73,31 @@
 });
 test('REAL issued notice remains historical after original grant reduction',async t=>{
  const {result:r,identity:i}=await scenario(t,'notice-reduction');causal(r,i);assert.equal(r.consent.status,'applied');assert.equal(r.enabledBefore,true);assert.equal(r.enabledAfterClose,true);assert.equal(r.revoke.status,'revoked');assert.equal(r.resolverDeniedAfterRevoke,true);assert.equal(r.counts.notices,1);assert.equal(r.rows.grants.results.length,1);assert.ok(r.rows.grants.results[0].revoked_at);
 });
 for(const target of ['ticket','consent'])test('REAL post-commit notice ACK loss blocks another write in this store '+target,async t=>{
  const {result:r,identity:i}=await scenario(t,'notice-ack',{target});causal(r,i);assert.equal(r.gateReached,true);assert.equal(r.committed,true);assert.equal(r.pending.rejected,true);for(const k of ['ticketRetryDenied','consentRetryDenied','observationDenied'])assert.equal(r[k],true,k);assert.equal(r.retryWrites,0);assert.equal(r.counts.tickets,1);assert.equal(r.counts.notices,target==='ticket'?0:1);
 });
 for(const target of ['ticket','consent'])test('REAL held native SQL settlement cannot become successful cancellation '+target,async t=>{
  const {result:r,identity:i}=await scenario(t,'notice-held',{target});causal(r,i);assert.equal(r.gateReached,true);assert.equal(r.committed,true);assert.equal(r.pendingAfterAbort,true);assert.equal(r.pending.rejected,true);assert.equal(r.retryWrites,0);assert.equal(r.counts.tickets,1);assert.equal(r.counts.notices,target==='ticket'?0:1);
 });
+
+for(const [name,kind] of [
+ ['REAL concurrent monitoring failure blocks pending consent before INSERT','notice-concurrent-before'],
+ ['REAL concurrent monitoring failure blocks pending ticket observation','notice-concurrent-observation'],
+ ['REAL concurrent monitoring failure cannot return applied after emitted consent','notice-concurrent-after']
+])test(name,async t=>{
+ const {result:r,identity:i}=await scenario(t,kind);causal(r,i);
+ assert.equal(r.ticketCommitGate,true);assert.equal(r.ticketGateBeforeDeadline,true);
+ assert.equal(r.boundaryGate,true);assert.equal(r.boundaryBeforeDeadline,true);
+ assert.equal(r.ticketFailure.rejected,true);assert.equal(r.failureKnown,true);
+ assert.ok(r.failureAt>=r.boundaryAt);assert.equal(r.pendingAfterFailure,true,'original pending operation retained until native gate settles');
+ if(kind==='notice-concurrent-after'){assert.equal(r.nativeBoundaryRow,true);assert.equal(r.emittedBeforeRelease,1);assert.equal(r.counts.notices,1);}
+ else if(kind==='notice-concurrent-observation'){assert.equal(r.nativeObservationRow,true);assert.equal(r.emittedBeforeRelease,0);}
+ else{assert.equal(r.observed,true);assert.equal(r.emittedBeforeRelease,0);}
+ assert.equal(r.pending.rejected,true,'known mutation failure must absorb concurrent result');
+ assert.equal(r.pending.value,undefined,'no late witness/applied result');
+ assert.equal(r.newEmissionsAfterFailure,0,'no new native monitoring SQL emitted after known failure');
+ assert.equal(r.consentEmitted,kind==='notice-concurrent-after'?1:0);
+ assert.equal(r.counts.tickets,1);assert.equal(r.counts.notices,kind==='notice-concurrent-after'?1:0);
+ console.log('SYN concurrent '+kind+' ticketGate='+r.ticketGateBeforeDeadline+' boundaryGate='+r.boundaryBeforeDeadline+' failureKnown='+r.failureKnown+' emitted='+r.consentEmitted+' afterFailure='+r.newEmissionsAfterFailure+' persisted='+r.counts.notices);
+});

~~~
