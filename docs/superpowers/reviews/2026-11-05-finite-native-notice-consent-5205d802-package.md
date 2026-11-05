# Task review package — native notice consent POST

READ ONLY. Full BASE-to-HEAD U10 diff, including all task commits. This is one SOURCE task, not a broad merge review.

BASE: 2f96acb45ec5477d559f85070aa438d2e2e00822
HEAD: 5205d80216d9767c44762df4a181e1015e093a8e
Qualified product: e1537bf403944ae4f79c04818db1932a3189d78c
Qualifier removed: 1199dc920b9d4d280a5d22e4d1bf8cb932db4d35
Report: docs/superpowers/reports/2026-11-05-finite-native-notice-consent.md
Brief: docs/superpowers/briefs/2026-11-05-finite-native-notice-consent.md (same content/blob79286bc31fd525b9efac3cd9ccf837bd6a38bfdb as original execution BASE)
Repository: tokenizartinfo-ops/agent-friendly-web

All nine changed source/test blobs match the final qualified product exactly. The tenth authorized path, test/fixtures/finite-owner-io-fanout.mjs, was optional if markers/categories required it and is unchanged. Other source/entry/config/store/journal/native-wire/stage-work paths are outside the final diff. The temporary qualifier existed only in task history and is absent in both BASE and HEAD; the report preserves its per-run commands/results and failures.

The controller independently read the terminal job logs listed in the report, validated the FULL2 POST ZIP digest and full TAP/metafile metadata in memory, and read the complete final report. Treat the report/design rationales as claims; assess the actual diff. Primary log counts are available by exact run/job references; do not repeat tests to regenerate evidence.

## Commit list
aa6b1cd25c8e15b4cf5d2ae91c85651e071ddff1 test: causal native consent and strict notice cookies RED
87c8430d82df08b4eea59e6296c9a05b80009250 feat: fixed private native notice consent continuation
06d29af097f2cf912472c5af2c2eadd22b5b5f29 test: qualify native consent failure retention and factual correlation
7ce4d221beac0c276e3d7c74577a5527fa223c36 test: disambiguate passive notice correlation marker
24db0b56d3c4f08299490048bef50225d76234be test: isolate body retention and preserve causal snapshot gates
f23a8e4a3365f8a330434175d53501449c71f349 test: observe actual M body promise chain and native actor restart
2e1b55175552cc3c990f600b64a444a4b1bc2ce4 test: preserve literal anchored diagnostic commands in qualifier
db17f2f56af6bcf8eaee6eb29aca09d6caad0032 test: keep M stream release in its original native invocation
e1537bf403944ae4f79c04818db1932a3189d78c feat: activate SOURCE-only native notice consent form after qualification
1199dc920b9d4d280a5d22e4d1bf8cb932db4d35 chore: remove temporary native notice consent qualifier
5205d80216d9767c44762df4a181e1015e093a8e docs: report native notice consent SOURCE qualification and limits

## Diff stat
docs/superpowers/reports/2026-11-05-finite-native-notice-consent.md | +344 -0 | added | blob 91c08e8cfd6f0eb954631c3e75ea4af66e4b33b5
lib/mcp-qa-finite-owner-notice-consent-body.mjs | +17 -0 | added | blob 2a1e89ffcfe56a607c704129a3af6a83e8bc9b81
lib/mcp-qa-finite-owner-notice-get-forward.mjs | +11 -7 | modified | blob ea910f0fcdeade5a794ddaa60898706924e72f80
lib/mcp-qa-finite-owner-notice-get-qa.mjs | +8 -6 | modified | blob f63e820a886af5b73a6a7b8b8ea22bc8d12b0106
lib/mcp-qa-finite-owner-notice-get-wire.mjs | +40 -11 | modified | blob da8c3f8ac66699fd207989058f4a1425b0ee36c0
lib/mcp-qa-finite-owner-phase-context.mjs | +145 -6 | modified | blob f8948c0a2cc41a48773406a64fc9c863226f9b2d
test/fixtures/finite-owner-notice-get.mjs | +92 -4 | modified | blob f2ede8ac193b24dfc9e548fb4175f6e8eb6947a0
test/fixtures/finite-owner-qa-sdk.mjs | +25 -4 | modified | blob 62fde9dcefb78bf57585a184901cb3c4d79c4c4d
test/mcp-qa-finite-owner-notice-consent-native.test.mjs | +313 -0 | added | blob 53b3daec12caf355d5aed4b35ebe8572029ed911
test/mcp-qa-finite-owner-notice-get-native.test.mjs | +30 -2 | modified | blob 906c100035213fd95cb0a1abe40d41e66105c7a5

## Full diff (U10)
diff --git a/lib/mcp-qa-finite-owner-phase-context.mjs b/lib/mcp-qa-finite-owner-phase-context.mjs
--- a/lib/mcp-qa-finite-owner-phase-context.mjs
+++ b/lib/mcp-qa-finite-owner-phase-context.mjs
@@ -1,11 +1,12 @@
-import {readFiniteOwnerNoticeGetMetadata,qualifyFiniteOwnerNoticeGetRequest} from './mcp-qa-finite-owner-notice-get-wire.mjs';
+import {readFiniteOwnerNoticeConsentBody} from './mcp-qa-finite-owner-notice-consent-body.mjs';
+import {readFiniteOwnerNoticeGetMetadata,qualifyFiniteOwnerNoticeGetRequest,readFiniteOwnerNoticeConsentMetadata,qualifyFiniteOwnerNoticeConsentRequest} from './mcp-qa-finite-owner-notice-get-wire.mjs';
 import {sealFinitePreparationNoticeRecord as noticeSeal} from './mcp-qa-finite-preparation-notice-records.mjs';
 
 import {createFinitePreparationNoticeJournal as noticeJournal} from './mcp-qa-finite-preparation-notice-journal.mjs';
 import {FINITE_PREPARATION_MONITORING_SCHEMA} from './mcp-qa-finite-preparation-issuer-store.mjs';
 import {randomBytes} from 'node:crypto';
 import {captureFinitePreparationIssuerContext} from './mcp-qa-finite-preparation-issuer-journal.mjs';
 import {createFinitePreparationIssuerStore} from './mcp-qa-finite-preparation-issuer-store.mjs';
 import {sealFinitePreparationIssuerRecord as issuerSeal,issuerScopes} from './mcp-qa-finite-preparation-issuer-records.mjs';
 import {encodeFiniteOwnerIssuerProvenanceRecord as sdkEncode,FINITE_OWNER_SDK_OPERATIONS as sdkOperations} from './mcp-qa-finite-owner-issuer-provenance-records.mjs';
 import {encodeFinitePreparationRecord as prepEncode} from './mcp-qa-finite-preparation-records.mjs';
@@ -264,51 +265,59 @@
     let connection=null;
     if(relation){
      if(!grantLink||relation.preconnectionId!==id||relation.grantHash!==grantLink.grantHash||relation.linkedAt<grantLink.acceptedAt||relation.linkedAt>Date.now())fail();
      connection=await getRecord('readConnectionRef',{connectionRef:relation.connectionRef});
      if(connection.connectionRef!==relation.connectionRef||connection.subject!==i.subject||connection.grantId!==i.grantId||connection.clientId!==i.clientId||connection.projectId!==i.projectId||connection.resource!==i.resource||connection.issuedAt!==relation.linkedAt||connection.expiresAt>Math.min(data.preconnection.expiresAt,data.preconnection.owner.accessExpiresAt,Date.parse(grant.expires_at))||Date.now()>=connection.expiresAt)fail();
     }
     return {schema,fence,consent,grant,authorization,grantLink,relation,connection};
    };
    const noticePrimary=async(f,data,issuerFacts)=>{
     const n=f.notice,r=n.reservation,i=f.issuer.reservation?.identity;
-    if(n.freeze||n.operations.consent.send||n.operations.consent.ack)fail();
+    if(n.freeze)fail();
     const objects=await selectAll("SELECT type,name,tbl_name,sql FROM sqlite_schema WHERE tbl_name IN ('dossier_monitoring_consent_events','dossier_monitoring_owner_tickets') AND sql IS NOT NULL ORDER BY name LIMIT 8",[],8);
     if(objects.length!==0&&objects.length!==7)fail();
     const empty={schema:null,tickets:[],events:[]};
     if(!objects.length){if(r)fail();return empty;}
     const normalize=x=>x.replace(/\s+/g,' ').trim().replace(/;$/,'').replace(/^CREATE (TABLE|INDEX|TRIGGER) IF NOT EXISTS /,'CREATE $1 ');
     for(const row of objects)fields(row,['type','name','tbl_name','sql']);
     for(const def of FINITE_PREPARATION_MONITORING_SCHEMA){
      const [,kind,name]=def.match(/^CREATE (TABLE|INDEX|TRIGGER) IF NOT EXISTS (\w+)/),table=kind==='TABLE'?name:def.match(/(?: ON | ON)(\w+)/)?.[1];
      if(!objects.some(row=>row.type===kind.toLowerCase()&&row.name===name&&row.tbl_name===table&&typeof row.sql==='string'&&normalize(row.sql)===normalize(def)))fail();
     }
     const schema={objects};
     if(!i){if(r)fail();return {...empty,schema};}
     const tickets=await selectAll('SELECT handle_hash,request_id,user_id,grant_id,project_id,client_id,resource,purpose,action,revision,expected_sequence,issued_at,expires_at,permission_expires_at FROM dossier_monitoring_owner_tickets WHERE grant_id=? ORDER BY handle_hash LIMIT 2',[i.grantId],2);
     const events=await selectAll('SELECT sequence,grant_id,project_id,user_id,client_id,resource,revision,action,purpose,request_id,issued_at,expires_at FROM dossier_monitoring_consent_events WHERE grant_id=? ORDER BY sequence LIMIT 3',[i.grantId],3);
-    if(tickets.length>=2||events.length)fail();
-    if(!r){if(tickets.length)fail();return {schema,tickets,events};}
+    if(tickets.length>=2||events.length>1)fail();
+    if(!r){if(tickets.length||events.length)fail();return {schema,tickets,events};}
     const grant=issuerFacts.grant,ops=f.issuer.operations,sdk=f.sdk;
     if(!grant||!issuerFacts.authorization||!issuerFacts.grantLink||!issuerFacts.relation||!issuerFacts.connection||!data.preconnection||!data.approval||!sdk.root||!sdk.grant||!['sdk_begin','sdk_approve','sdk_complete'].every(op=>sdk.operations[op].send&&sdk.operations[op].observed)||!ops.grant.ack||ops.grant.ack.outcome!=='applied')fail();
     for(const op of Object.values(ops))if(op.send&&!op.ack||op.ack&&!op.send)fail();
     const expectedGrant={scopes:JSON.parse(grant.scopes_json),createdAt:grant.created_at,expiresAt:grant.expires_at};
     const t=r.ticket,ceil=Math.min(r.accessExpiresAt,r.preconnectionExpiresAt,data.approval.expiresAt,issuerFacts.connection.expiresAt,i.C0,Date.parse(i.consentExpiresAt),Date.parse(grant.expires_at));
     if(canonical(r.identity)!==canonical(i)||r.issuerReservationHash!==f.issuer.reservation.recordHash||r.originalGrantAckHash!==ops.grant.ack.recordHash||r.grantLinkHash!==prepHash('GrantLink',issuerFacts.grantLink)||r.connectionHash!==prepHash('ConnectionRef',issuerFacts.connection)||canonical(r.expectedGrant)!==canonical(expectedGrant)||r.consumedAt!==issuerFacts.consent.consumed_at||r.preconnectionExpiresAt!==data.preconnection.expiresAt||r.accessExpiresAt>Math.min(data.preconnection.owner.accessExpiresAt,i.C0)||r.accessExpiresAt<=r.issuedAt||r.issuedAt>Date.now()||t.expiresAt>ceil||t.permissionExpiresAt>ceil||Date.now()>=t.permissionExpiresAt)fail();
     clock.narrow(ceil);
     const {send,ack}=n.operations.ticket;
     if(send?.issuedAt>Date.now()||ack?.observedAt>Date.now())fail();
     const row=expectedNoticeTicket(i,t);
     if(tickets.some(v=>canonical(v)!==canonical(row)))fail();
     if(!send&&tickets.length)fail();
     if(ack?.outcome==='applied'&&(tickets.length!==1||ack.sequence!==null||ack.rowHash!==digest('afw.finite-preparation-notice-row.v1',tickets[0])))fail();
     if(ack?.outcome==='no_mutation'&&(tickets.length||ack.rowHash!==null||ack.sequence!==null))fail();
+    const consent=n.operations.consent;
+    if(!consent.send){if(consent.ack||events.length)fail();}
+    else{
+     if(ack?.outcome!=='applied'||tickets.length!==1||consent.send.issuedAt>Date.now()||consent.ack?.observedAt>Date.now())fail();
+     for(const event of events)qualifyNoticeConsentEvent(event,i,t,consent.send);
+     if(consent.ack?.outcome==='applied'&&(events.length!==1||consent.ack.rowHash!==digest('afw.finite-preparation-notice-row.v1',events[0])||consent.ack.sequence!==events[0].sequence||events[0].issued_at>consent.ack.observedAt))fail();
+     if(consent.ack?.outcome==='no_mutation'&&(events.length||consent.ack.rowHash!==null||consent.ack.sequence!==null))fail();
+    }
     return {schema,tickets,events};
    };
    const qualify=async(f,actual)=>{
     const store=createFiniteOwnerPreparationStore({storage,now:Date.now}),id=capsule.preconnectionId,prefix='connection-preparation:'+id+':';
     const getRecord=async(method,arg,required=true)=>{const v=await child(l=>store[method](arg,l));if(v.status==='absent'&&!required)return null;if(v.status!=='observed')fail();return v.record;};
     const data={};
     if(f.inventory.size){
      data.sourceSnapshot=await getRecord('readOwnerSourceSnapshot',{preconnectionId:id});
      if(data.sourceSnapshot.preconnectionId!==id||canonical(data.sourceSnapshot.source)!==canonical(source))fail();
      data.ticket=await getRecord('readTicket',{ticketHash:data.sourceSnapshot.initialTicketHash},false);
@@ -376,20 +385,40 @@
    });
    const pair={first:snapshot(first,observed,qualified),second:snapshot(second,again,secondQualified)};
    if(canonical(pair.first)!==canonical(pair.second))fail();
    current(clock.lease);return freezeOwnerPhaseData(pair);
   });
   return await run();
  }finally{if(parentSignal&&onAbort)parentSignal.removeEventListener('abort',onAbort);clock?.close();}
 }
 
 
+function qualifyNoticeConsentEvent(row,i,t,send){
+ fields(row,['sequence','grant_id','project_id','user_id','client_id','resource','revision','action','purpose','request_id','issued_at','expires_at']);
+ if(!Number.isSafeInteger(row.sequence)||row.sequence<=0||!Number.isSafeInteger(row.issued_at)||row.issued_at<Math.max(send.window.startedAt,t.issuedAt,send.issuedAt)||row.issued_at>=Math.min(send.window.deadline,t.permissionExpiresAt)||row.issued_at>Date.now())fail();
+ const expected={sequence:row.sequence,grant_id:i.grantId,project_id:i.projectId,user_id:i.subject,client_id:i.clientId,resource:i.resource,revision:i.projectRevision,action:'grant',purpose:'afw.dossier-monitoring.v1',request_id:t.requestId,issued_at:row.issued_at,expires_at:t.permissionExpiresAt};
+ if(canonical(row)!==canonical(expected))fail();
+}
+function qualifyNoticeConsentBaseline(pair){
+ for(const s of [pair.first,pair.second]){
+  const n=s.records.notice,issuer=s.records.issuer,rows=s.issuerRows;
+  if(!s.installed.receipt||!s.noticeRows.schema||!n.reservation||n.freeze||n.operations.ticket.ack?.outcome!=='applied'||!n.operations.ticket.send||n.operations.consent.send||n.operations.consent.ack||s.noticeRows.tickets.length!==1||s.noticeRows.events.length)fail();
+  if(!issuer.reservation||issuer.operations.grant.ack?.outcome!=='applied'||!rows.grant||!rows.authorization||!rows.grantLink||!rows.relation||!rows.connection)fail();
+  for(const v of Object.values(issuer.operations))if(v.send&&!v.ack||v.ack&&!v.send)fail();
+  const names=new Set(s.records.sdk.map(([key])=>key)),prefix='afw.finite-owner-issuer-provenance.v1:'+s.preconnectionId+':';
+  if(!['root','grant','sdk_begin:send','sdk_begin:observed','sdk_approve:send','sdk_approve:observed','sdk_complete:send','sdk_complete:observed'].every(key=>names.has(prefix+key)))fail();
+  for(const [key]of s.records.sdk)if(key.endsWith(':send')&&!names.has(key.slice(0,-4)+'observed'))fail();
+ }
+ const {sourceBase,installed,preconnectionId,capsuleHash}=pair.second,r=installed.receipt;
+ const source=validateFiniteOwnerSource({...sourceBase,phase:'read_consent',currentPublication:{stage:'connection',versionId:r.versionId,deploymentId:r.deploymentId,receiptHash:r.receiptHash}});
+ return Object.freeze({source,preconnectionId,capsuleHash});
+}
 function expectedNoticeTicket(i,t){return {handle_hash:t.handleHash,request_id:t.requestId,user_id:i.subject,grant_id:i.grantId,project_id:i.projectId,client_id:i.clientId,resource:i.resource,purpose:'afw.dossier-monitoring-owner.v1',action:'grant',revision:i.projectRevision,expected_sequence:t.expectedSequence,issued_at:t.issuedAt,expires_at:t.expiresAt,permission_expires_at:t.permissionExpiresAt};}
 function requireEmptyNotice(s){
  const n=s.records.notice;
  if(n.reservation||n.freeze||Object.values(n.operations).some(v=>v.send||v.ack)||s.noticeRows.tickets.length||s.noticeRows.events.length)fail();
 }
 function freezeOwnerPhaseData(value){
  if(value&&typeof value==='object'){for(const v of Object.values(value))freezeOwnerPhaseData(v);Object.freeze(value);}return value;
 }
 function qualifySettledOwnerPair(pair){
  for(const s of [pair.first,pair.second]){
@@ -702,16 +731,126 @@
     if(actualResult?.status!=='applied'||canonical(actualResult.row)!==canonical(expectedNoticeTicket(i,ticket)))fail();
     expected.noticeRows.tickets=[structuredClone(actualResult.row)];position='ticket-sql-resolved';await recheckNoticeGetOwned();check();
     const ack=noticeSeal('Ack',{purpose:'afw.finite-preparation-notice-ack.v1',sendHash:ownedSend.recordHash,outcome:'applied',rowHash:digest('afw.finite-preparation-notice-row.v1',actualResult.row),sequence:null,observedAt:Date.now()});
     const appendAckPromise=retain(journal.appendAck({preconnectionId:id,operation:'ticket',record:ack},l)),appendAckResult=await wait(appendAckPromise);
     if(appendAckResult?.status!=='recorded'||appendAckResult.recordHash!==ack.recordHash)fail();
     expected.records.notice.operations.ticket.ack=structuredClone(ack);anchor();position='ticket-ack-recorded';await recheckNoticeGetOwned();activeChild=null;
    })()));
    check();
    const maxAge=Math.floor((ticket.expiresAt-Date.now())/1000);if(maxAge<1)fail();
    const escaped=handle.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])),nonce=randomBytes(18).toString('base64url');
-   const html='<!doctype html><html lang="es"><meta charset="utf-8"><title>Preparación de avisos</title><body><h1>Preparación de avisos</h1><p>Preparé un formulario temporal. Todavía no diste permiso para avisos. El envío de este formulario aún no está habilitado.</p><form><input type="hidden" name="handle" value="'+escaped+'"><button type="button" disabled>Permitir avisos temporales</button></form><a href="https://agentfriendlyweb.dev/expediente">Volver al expediente</a></body></html>';
-   check();return new Response(html,{status:200,headers:{'Content-Type':'text/html; charset=UTF-8','Cache-Control':'no-store','Referrer-Policy':'same-origin','X-Content-Type-Options':'nosniff','Content-Security-Policy':"default-src 'none'; script-src 'nonce-"+nonce+"'; frame-ancestors 'none'; base-uri 'none'; form-action 'none'",'Set-Cookie':'__Host-afw-monitoring-owner='+handle+'; Path=/; Secure; HttpOnly; SameSite=Strict; Max-Age='+maxAge}});
+   const html='<!doctype html><html lang="es"><meta charset="utf-8"><title>Preparación de avisos</title><body><h1>Preparación de avisos</h1><p>Podés registrar un permiso temporal para avisos sobre este expediente. No cambia datos ni publica. El permiso vence en la fecha indicada. Registrar el permiso no confirma una suscripción, entrega ni revisión del asistente.</p><p>El permiso vence: '+new Date(ticket.permissionExpiresAt).toISOString()+'</p><form method="post" action="/monitoring/grant"><input type="hidden" name="handle" value="'+escaped+'"><button type="submit">Permitir avisos temporales</button></form><a href="https://agentfriendlyweb.dev/expediente">Volver al expediente</a></body></html>';
+   check();return new Response(html,{status:200,headers:{'Content-Type':'text/html; charset=UTF-8','Cache-Control':'no-store','Referrer-Policy':'same-origin','X-Content-Type-Options':'nosniff','Content-Security-Policy':"default-src 'none'; script-src 'nonce-"+nonce+"'; frame-ancestors 'none'; base-uri 'none'; form-action 'self'",'Set-Cookie':'__Host-afw-monitoring-owner='+handle+'; Path=/; Secure; HttpOnly; SameSite=Strict; Max-Age='+maxAge}});
   }));
  }catch{return pending();}finally{if(onAbort)originalLease.signal.removeEventListener('abort',onAbort);clock?.close();}
 }
 
+/** UNMOUNTED fixed human POST. Native SQL continuation never leaves this stack. */
+export async function handlePrivateQaFiniteOwnerNoticeConsent({request,env,ctx},originalLease){
+ let clock,onAbort;
+ try{
+  if(arguments.length!==2)fail();fields(arguments[0],['request','env','ctx']);if(!(request instanceof Request))fail();
+  if(readFiniteOwnerRequestContext(originalLease).root!==originalLease)fail();
+  return await observeFiniteOwnerRequestWork({ctx,env,originalLease},()=>finiteNativeOperation(originalLease,ctx,async signalFailure=>{
+   let failed=false;const firstFailure=error=>{failed=true;signalFailure(error);};
+   const received=readFiniteOwnerNoticeConsentMetadata(request.headers);
+   const issuerCapture=captureFinitePreparationIssuerContext({ctx,env});
+   const alias=env.AFW_FINITE_OWNER_OAUTH_KV,methods={get:alias?.get,put:alias?.put,delete:alias?.delete,list:alias?.list};
+   const db=env.RELEASE_DB,dbPrepare=db?.prepare,node=env.AFW_RELEASE_EVENTS_NODE,nodeMethods={idFromName:node?.idFromName,idFromString:node?.idFromString,get:node?.get};
+   const self=env.AFW_INDEPENDENT_CLOSURE,selfGet=self?.get,metadata=env.AFW_QA_VERSION,reader=env.AFW_MCP_CLOSURE_READ_TOKEN,publisher=env.AFW_MCP_CLOSURE_PUBLISH_TOKEN,fetcher=globalThis.fetch;
+   const headers=request.headers,signal=request.signal,url=request.url,method=request.method,headerBytes=canonical([...headers]);
+   if([...Object.values(methods),...Object.values(nodeMethods),dbPrepare,selfGet].some(v=>typeof v!=='function'))fail();
+   let identity=null,activeChild=null;
+   const holders=()=>{
+    current(originalLease);issuerCapture.holders();
+    if(env.AFW_FINITE_OWNER_OAUTH_KV!==alias||Object.keys(methods).some(k=>alias[k]!==methods[k])||env.RELEASE_DB!==db||db.prepare!==dbPrepare||env.AFW_RELEASE_EVENTS_NODE!==node||Object.keys(nodeMethods).some(k=>node[k]!==nodeMethods[k])||env.AFW_INDEPENDENT_CLOSURE!==self||self.get!==selfGet||env.AFW_QA_VERSION!==metadata||env.AFW_MCP_CLOSURE_READ_TOKEN!==reader||env.AFW_MCP_CLOSURE_PUBLISH_TOKEN!==publisher||globalThis.fetch!==fetcher||request.headers!==headers||request.signal!==signal||request.url!==url||request.method!==method||canonical([...headers])!==headerBytes)fail();
+    if(identity&&Date.now()>=identity.expiresAt)fail();
+   };
+   clock=createFiniteInitialLease(readFiniteOwnerRequestDeadline(originalLease),readFiniteOwnerRequestDeadline(originalLease),holders,fail);
+   onAbort=()=>clock.close();originalLease.signal.addEventListener('abort',onAbort,{once:true});
+   const check=()=>{if(failed)fail();try{current(clock.lease);if(activeChild)current(activeChild);}catch(error){failed=true;throw error;}};
+   const wait=async promise=>{try{check();const result=await clock.wait(retain(promise),activeChild??clock.lease);check();return result;}catch(error){failed=true;throw error;}};
+   const bytes=await wait(readFiniteOwnerNoticeConsentBody(request,check,firstFailure));check();
+   const original=new Request(received.url,{method:received.method,headers,body:bytes.length?bytes:undefined,signal:originalLease.signal});
+   const input=qualifyFiniteOwnerNoticeConsentRequest(original,bytes);
+   const baseline=await wait(observeOwnerPhasePair({ctx,env,parent:originalLease})),context=qualifyNoticeConsentBaseline(baseline);
+   if(context.source.phase!=='read_consent'||received.mVersionId!==context.source.currentPublication.versionId||!baseline.second.noticeRows.schema)fail();
+   const expected=structuredClone(baseline.second),source=context.source,id=context.preconnectionId;
+   const capsule=expected.anchor.anchors.capsule,prep=expected.preparation;
+   clock.narrow(Math.min(capsule.C0,prep.preconnection.expiresAt,prep.preconnection.owner.accessExpiresAt,prep.approval.expiresAt));
+   const verified=await wait(verifyCloudflareAccessJwtWithExpiry({token:original.headers.get('Cf-Access-Jwt-Assertion'),teamDomain:source.access.teamDomain,audience:source.access.audience}));
+   if(!verified.ok)fail();identity=verified.identity;clock.narrow(identity.expiresAt);
+   const rawCookies=(original.headers.get('Cookie')??'').split(';').map(s=>s.trim()),cookie=rawCookies.filter(s=>s.startsWith('__Host-afw-finite-prepare='));
+   if(cookie.length!==1||!/^__Host-afw-finite-prepare=[a-f0-9]{64}$/.test(cookie[0])||sha(cookie[0].slice('__Host-afw-finite-prepare='.length))!==prep.ticket.ticketHash)fail();
+   const realm=evidence('realm',{...source.access,origin:source.origin}),subjectHash=evidence('subject',{accessRealmHash:realm,subject:identity.subject});
+   qualifyFiniteOwnerApprovedTicket({source,identity,currentTicket:prep.ticket,ticket:prep.ticket,use:prep.ticketUse,pre:prep.preconnection,approval:prep.approval,snapshot:prep.sourceSnapshot,realm,subjectHash,observedAt:Date.now()});
+   if(identity.subject!==expected.anchor.anchors.material.ownerSelection.subject||identity.subject!==expected.records.issuer.reservation?.identity.subject)fail();
+   const issuer=expected.records.issuer,rows=expected.issuerRows,i=issuer.reservation?.identity;
+   if(!i||!rows.grant||!rows.authorization||!rows.grantLink||!rows.relation||!rows.connection||issuer.operations.grant.ack?.outcome!=='applied')fail();
+   const sdkPrefix='afw.finite-owner-issuer-provenance.v1:'+id+':';
+   const sdkNames=new Set(expected.records.sdk.map(([key])=>key));
+   if(!['root','grant','sdk_begin:observed','sdk_approve:observed','sdk_complete:observed'].every(k=>sdkNames.has(sdkPrefix+k)))fail();
+   if(identity.subject!==rows.connection.subject)fail();
+   const reservation=expected.records.notice.reservation,ticket=reservation.ticket;
+   const monitoring=rawCookies.filter(v=>v.startsWith('__Host-afw-monitoring-owner='));
+   if(monitoring.length!==1||!/^__Host-afw-monitoring-owner=[A-Za-z0-9_-]{43}$/.test(monitoring[0])||sha(monitoring[0].slice('__Host-afw-monitoring-owner='.length))!==ticket.handleHash||sha(input.handle)!==ticket.handleHash)fail();
+   const accessExpiresAt=Math.min(reservation.accessExpiresAt,prep.preconnection.owner.accessExpiresAt,identity.expiresAt,i.C0);
+   if(ticket.expiresAt>accessExpiresAt)fail();
+   const permissionCeiling=Math.min(accessExpiresAt,reservation.preconnectionExpiresAt,prep.approval.expiresAt,rows.connection.expiresAt,i.C0,Date.parse(i.consentExpiresAt),Date.parse(rows.grant.expires_at),ticket.permissionExpiresAt);
+   clock.narrow(permissionCeiling);
+   const journal=noticeJournal({ctx,env}),store=createFinitePreparationIssuerStore({ctx,env});
+   let position='baseline',witness=null,ownSend=null,actualSqlPromise=null,actualSqlResult=null,sqlSettled=false;
+   const anchor=()=>{expected.anchor.notice=structuredClone(expected.records.notice);};
+   async function recheckConsentOwned(){
+    check();
+    if(actualSqlPromise&&!sqlSettled)fail();
+    for(const v of Object.values(expected.records.issuer.operations))if(v.send&&!v.ack||v.ack&&!v.send)fail();
+    const names=new Set(expected.records.sdk.map(([key])=>key));
+    for(const [key]of expected.records.sdk)if(key.endsWith(':send')&&!names.has(key.slice(0,-4)+'observed'))fail();
+    const n=expected.records.notice;
+    if(n.freeze||canonical(n.reservation)!==canonical(reservation)||n.operations.ticket.ack?.outcome!=='applied')fail();
+    if(position==='baseline'||position==='ticket-observed'){
+     if(ownSend||actualSqlPromise||n.operations.consent.send||n.operations.consent.ack||expected.noticeRows.events.length)fail();
+    }else{
+     if(!witness||!ownSend||canonical(n.operations.consent.send)!==canonical(ownSend))fail();
+     if(position==='consent-send-recorded'&&(actualSqlPromise||expected.noticeRows.events.length||n.operations.consent.ack))fail();
+     if(['consent-sql-resolved','consent-ack-recorded'].includes(position)){
+      if(!actualSqlPromise||!sqlSettled||actualSqlResult?.status!=='applied'||canonical(expected.noticeRows.events)!==canonical([actualSqlResult.row]))fail();
+      qualifyNoticeConsentEvent(actualSqlResult.row,i,ticket,ownSend);
+     }
+    }
+    const pair=await wait(observeOwnerPhasePair({ctx,env,parent:originalLease,preconnectionId:id}));
+    if(canonical(pair.first)!==canonical(expected)||canonical(pair.second)!==canonical(expected))fail();
+    check();
+   }
+   await recheckConsentOwned();
+   await clock.child((l,deadline)=>retain((async()=>{
+    activeChild=l;check();
+    const window={startedAt:Date.now(),deadline:Math.min(deadline,permissionCeiling)};
+    const common={identity:reservation.identity,expectedGrant:reservation.expectedGrant,consumedAt:reservation.consumedAt,accessExpiresAt,preconnectionExpiresAt:reservation.preconnectionExpiresAt,window};
+    witness=await wait(store.observeMonitoringTicket({...common,ticket},l));
+    if(witness?.status!=='observed'||canonical(witness.row)!==canonical(expected.noticeRows.tickets[0]))fail();
+    position='ticket-observed';await recheckConsentOwned();check();
+    const again=await wait(verifyCloudflareAccessJwtWithExpiry({token:original.headers.get('Cf-Access-Jwt-Assertion'),teamDomain:source.access.teamDomain,audience:source.access.audience}));
+    if(!again.ok||again.identity.subject!==identity.subject||again.identity.expiresAt!==identity.expiresAt)fail();
+    check();const issuedAt=Date.now(),decisionHash=digest('afw.finite-preparation-notice-decision.v1',{identityHash:i.identityHash,ticketRequestId:ticket.requestId,handleHash:ticket.handleHash,method:'POST',path:'/monitoring/grant',action:'grant',issuedAt});
+    const send=noticeSeal('Send',{purpose:'afw.finite-preparation-notice-send.v1',identityHash:i.identityHash,reservationHash:reservation.recordHash,operation:'consent',requestHash:digest('afw.finite-preparation-notice-request.v1',{operation:'consent',common,ticket,decisionHash}),accessExpiresAt,window,issuedAt,decisionHash});
+    const appendSendPromise=retain(journal.appendSend({preconnectionId:id,record:send},l)),appendSendResult=await wait(appendSendPromise);
+    if(appendSendResult?.status!=='recorded'||appendSendResult.recordHash!==send.recordHash)fail();
+    ownSend=send;expected.records.notice.operations.consent.send=structuredClone(send);anchor();position='consent-send-recorded';
+    await recheckConsentOwned();check();
+    position='consent-sql-pending';sqlSettled=false;
+    actualSqlPromise=retain(store.insertMonitoringConsent({...common,ticketWitness:witness},l));
+    actualSqlResult=await wait(actualSqlPromise);sqlSettled=true;
+    if(actualSqlResult?.status!=='applied')fail();qualifyNoticeConsentEvent(actualSqlResult.row,i,ticket,ownSend);
+    expected.noticeRows.events=[structuredClone(actualSqlResult.row)];position='consent-sql-resolved';await recheckConsentOwned();check();
+    const ack=noticeSeal('Ack',{purpose:'afw.finite-preparation-notice-ack.v1',sendHash:ownSend.recordHash,outcome:'applied',rowHash:digest('afw.finite-preparation-notice-row.v1',actualSqlResult.row),sequence:actualSqlResult.row.sequence,observedAt:Date.now()});
+    const appendAckPromise=retain(journal.appendAck({preconnectionId:id,operation:'consent',record:ack},l)),appendAckResult=await wait(appendAckPromise);
+    if(appendAckResult?.status!=='recorded'||appendAckResult.recordHash!==ack.recordHash)fail();
+    expected.records.notice.operations.consent.ack=structuredClone(ack);anchor();position='consent-ack-recorded';await recheckConsentOwned();activeChild=null;
+   })()));
+   check();
+   const html='<!doctype html><html lang="es"><meta charset="utf-8"><title>Decisión temporal</title><body><h1>Registré tu decisión temporal.</h1><p>Esto no confirma que exista una suscripción ni que el asistente haya revisado el expediente.</p><p>El permiso vence: '+new Date(ticket.permissionExpiresAt).toISOString()+'</p><a href="https://agentfriendlyweb.dev/expediente">Volver al expediente</a></body></html>';
+   check();return new Response(html,{status:200,headers:{'Content-Type':'text/html; charset=UTF-8','Cache-Control':'no-store','Referrer-Policy':'same-origin','X-Content-Type-Options':'nosniff','Content-Security-Policy':"default-src 'none'; frame-ancestors 'none'; base-uri 'none'; form-action 'none'",'Set-Cookie':'__Host-afw-monitoring-owner=; Path=/; Secure; HttpOnly; SameSite=Strict; Max-Age=0'}});
+  }));
+ }catch{return pending();}finally{if(onAbort)originalLease.signal.removeEventListener('abort',onAbort);clock?.close();}
+}


diff --git a/lib/mcp-qa-finite-owner-notice-get-wire.mjs b/lib/mcp-qa-finite-owner-notice-get-wire.mjs
--- a/lib/mcp-qa-finite-owner-notice-get-wire.mjs
+++ b/lib/mcp-qa-finite-owner-notice-get-wire.mjs
@@ -1,22 +1,51 @@
 import {finiteNativeOrigin as origin,finiteNativeHeaders,finiteNativeUuid,finiteNativeFailure as fail} from './mcp-qa-finite-owner-native-wire.mjs';
 export const finiteOwnerNoticeGetTarget='https://afw-private.invalid/_finite-owner/monitoring';
+// Historical get filename; both fixed notice conduits share grammar only.
+export const finiteOwnerNoticeConsentTarget='https://afw-private.invalid/_finite-owner/monitoring/grant';
 const max=16384;
+function cookieList(headers){
+ const raw=headers.get('Cookie'),assertion=headers.get('Cf-Access-Jwt-Assertion')??'';
+ if((raw?.length??0)>8192||assertion.length>8192||/[\r\n]/.test((raw??'')+assertion))fail(400);
+ if(raw===null)return;
+ const cookie=raw.replace(/^[ \t]+|[ \t]+$/g,'');if(!cookie)fail(400);
+ const names=new Set();
+ for(const part of cookie.split('; ')){
+  const at=part.indexOf('='),name=part.slice(0,at),value=part.slice(at+1);
+  if(at<1||!/^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/.test(name)||names.has(name))fail(400);
+  names.add(name);
+  const octets=value.startsWith('"')&&value.endsWith('"')&&value.length>=2?value.slice(1,-1):value;
+  if(!/^[\x21\x23-\x2b\x2d-\x3a\x3c-\x5b\x5d-\x7e]*$/.test(octets))fail(400);
+ }
+}
+function metadata(headers,method,url){
+ const entries=[...headers].filter(([key])=>key.startsWith('x-afw-finite-'));
+ if(entries.length!==finiteNativeHeaders.length||entries.some(([key])=>!finiteNativeHeaders.includes(key))||Buffer.byteLength(JSON.stringify(entries))>max)fail(400);
+ const raw=headers.get('x-afw-finite-boundary');let boundary;try{boundary=JSON.parse(raw);}catch{fail(400);}
+ if(!boundary||!['startedAt','deadline','remainingMs'].every(k=>Number.isSafeInteger(boundary[k]))||JSON.stringify({startedAt:boundary.startedAt,deadline:boundary.deadline,remainingMs:boundary.remainingMs})!==raw)fail(400);
+ const mVersionId=headers.get('x-afw-finite-version'),requestId=headers.get('x-afw-finite-request-id');
+ if(headers.get('x-afw-finite-original-method')!==method||headers.get('x-afw-finite-original-url')!==url||!finiteNativeUuid(mVersionId)||!finiteNativeUuid(requestId))fail(400);
+ return Object.freeze({boundary,method,url,mVersionId,requestId});
+}
 export function qualifyFiniteOwnerNoticeGetRequest(request,bytes){
  if(!(request instanceof Request)||!(bytes instanceof Uint8Array)||bytes.length||request.url.length>max)fail(400);
  if(request.url!==origin+'/monitoring')fail(404);
  if(request.method!=='GET')fail(405);
  const from=request.headers.get('Origin');if(from!==null&&from!==origin)fail(403);
- const cookie=request.headers.get('Cookie')??'',assertion=request.headers.get('Cf-Access-Jwt-Assertion')??'';
- if(cookie.length>8192||assertion.length>8192||/[\r\n]/.test(cookie+assertion))fail(400);
- const names=new Set();for(const part of cookie.split(';').filter(x=>x.trim())){const match=/^\s*([^=\s]+)=([^;\s]*)\s*$/.exec(part);if(!match||names.has(match[1]))fail(400);names.add(match[1]);}
+ cookieList(request.headers);
  return Object.freeze({method:'GET',url:request.url});
 }
-export function readFiniteOwnerNoticeGetMetadata(headers){
- const entries=[...headers].filter(([key])=>key.startsWith('x-afw-finite-'));
- if(entries.length!==finiteNativeHeaders.length||entries.some(([key])=>!finiteNativeHeaders.includes(key))||Buffer.byteLength(JSON.stringify(entries))>max)fail(400);
- const raw=headers.get('x-afw-finite-boundary');let boundary;try{boundary=JSON.parse(raw);}catch{fail(400);}
- if(!boundary||!['startedAt','deadline','remainingMs'].every(k=>Number.isSafeInteger(boundary[k]))||JSON.stringify({startedAt:boundary.startedAt,deadline:boundary.deadline,remainingMs:boundary.remainingMs})!==raw)fail(400);
- const method=headers.get('x-afw-finite-original-method'),url=headers.get('x-afw-finite-original-url'),mVersionId=headers.get('x-afw-finite-version'),requestId=headers.get('x-afw-finite-request-id');
- if(method!=='GET'||url!==origin+'/monitoring'||!finiteNativeUuid(mVersionId)||!finiteNativeUuid(requestId))fail(400);
- return Object.freeze({boundary,method:'GET',url,mVersionId,requestId});
+export function readFiniteOwnerNoticeGetMetadata(headers){return metadata(headers,'GET',origin+'/monitoring');}
+export function readFiniteOwnerNoticeConsentMetadata(headers){return metadata(headers,'POST',origin+'/monitoring/grant');}
+export function qualifyFiniteOwnerNoticeConsentRequest(request,bytes){
+ if(!(request instanceof Request)||!(bytes instanceof Uint8Array)||!bytes.length||bytes.length>1024||request.url.length>max)fail(400);
+ if(request.url!==origin+'/monitoring/grant')fail(404);
+ if(request.method!=='POST')fail(405);
+ if(request.headers.get('Origin')!==origin)fail(403);
+ if(request.headers.get('Content-Type')!=='application/x-www-form-urlencoded')fail(400);
+ cookieList(request.headers);
+ let text;try{text=new TextDecoder('utf-8',{fatal:true}).decode(bytes);}catch{fail(400);}
+ if(/%(?![a-f0-9]{2})/i.test(text))fail(400);
+ const form=new URLSearchParams(text),entries=[...form];
+ if(entries.length!==1||entries[0][0]!=='handle'||form.getAll('handle').length!==1||!/^[A-Za-z0-9_-]{43}$/.test(entries[0][1]))fail(400);
+ return Object.freeze({method:'POST',url:request.url,handle:entries[0][1]});
 }


diff --git a/lib/mcp-qa-finite-owner-notice-get-forward.mjs b/lib/mcp-qa-finite-owner-notice-get-forward.mjs
--- a/lib/mcp-qa-finite-owner-notice-get-forward.mjs
+++ b/lib/mcp-qa-finite-owner-notice-get-forward.mjs
@@ -1,36 +1,40 @@
 import {retainFiniteOwnerStagePromise as retain} from './mcp-qa-finite-stage-work.mjs';
 import {readFiniteOwnerRequestContext,readFiniteOwnerRequestBoundary} from './mcp-qa-finite-owner-preparation.mjs';
 import {observeFiniteOwnerRequestWork} from './mcp-qa-finite-stage-work.mjs';
 import {finiteNativeFailure as fail,finiteNativeUuid} from './mcp-qa-finite-owner-native-wire.mjs';
 import {finiteNativeActor,finiteNativePreservedHeaders,finiteNativeOperation,finiteNativeBytes,finiteNativePending as pending} from './mcp-qa-finite-owner-native-wire.mjs';
-import {finiteOwnerNoticeGetTarget,qualifyFiniteOwnerNoticeGetRequest,readFiniteOwnerNoticeGetMetadata} from './mcp-qa-finite-owner-notice-get-wire.mjs';
+import {readFiniteOwnerNoticeConsentBody} from './mcp-qa-finite-owner-notice-consent-body.mjs';
+import {finiteOwnerNoticeGetTarget,qualifyFiniteOwnerNoticeGetRequest,readFiniteOwnerNoticeGetMetadata,finiteOwnerNoticeConsentTarget,qualifyFiniteOwnerNoticeConsentRequest,readFiniteOwnerNoticeConsentMetadata} from './mcp-qa-finite-owner-notice-get-wire.mjs';
 /** Unmounted forwarding only. Transport metadata never asserts SDK results. */
-export async function forwardPrivateFiniteOwnerNoticeGet({request,env,ctx},originalLease){
+export function forwardPrivateFiniteOwnerNoticeGet(input,originalLease){return forward(input,originalLease,false);}
+export function forwardPrivateFiniteOwnerNoticeConsent(input,originalLease){return forward(input,originalLease,true);}
+async function forward({request,env,ctx},originalLease,consent){
  try{
   if(readFiniteOwnerRequestContext(originalLease).root!==originalLease)fail();
   const originalHeaders=request.headers,headerBytes=JSON.stringify([...originalHeaders]),originalSignal=request.signal,originalUrl=request.url,originalMethod=request.method;
   const namespace=env?.AFW_FINITE_TRIAL_CONTROL,idFromName=namespace?.idFromName,get=namespace?.get,metadata=env?.AFW_FINITE_TRIAL_VERSION,version=metadata?.id;
   if([idFromName,get].some(v=>typeof v!=='function')||!finiteNativeUuid(version))fail();
   const id=Reflect.apply(idFromName,namespace,[finiteNativeActor]),actor=id.toString(),stub=Reflect.apply(get,namespace,[id]),fetcher=stub?.fetch;
   if(!/^[a-f0-9]{64}$/.test(actor)||typeof fetcher!=='function')fail();
-  const check=()=>{originalLease.assertCurrent();if(request.headers!==originalHeaders||JSON.stringify([...originalHeaders])!==headerBytes||request.signal!==originalSignal||request.url!==originalUrl||request.method!==originalMethod||env.AFW_FINITE_TRIAL_CONTROL!==namespace||namespace.idFromName!==idFromName||namespace.get!==get||Reflect.apply(idFromName,namespace,[finiteNativeActor]).toString()!==actor||stub.fetch!==fetcher||env.AFW_FINITE_TRIAL_VERSION!==metadata||metadata.id!==version)fail();};
+  let failed=false;const check=()=>{if(failed)fail();originalLease.assertCurrent();if(request.headers!==originalHeaders||JSON.stringify([...originalHeaders])!==headerBytes||request.signal!==originalSignal||request.url!==originalUrl||request.method!==originalMethod||env.AFW_FINITE_TRIAL_CONTROL!==namespace||namespace.idFromName!==idFromName||namespace.get!==get||Reflect.apply(idFromName,namespace,[finiteNativeActor]).toString()!==actor||stub.fetch!==fetcher||env.AFW_FINITE_TRIAL_VERSION!==metadata||metadata.id!==version)fail();};
   check();
-  return await observeFiniteOwnerRequestWork({ctx,env,originalLease},()=>finiteNativeOperation(originalLease,ctx,async first=>{
-   const bytes=await finiteNativeBytes(request,check,first);check();qualifyFiniteOwnerNoticeGetRequest(request,bytes);
+  return await observeFiniteOwnerRequestWork({ctx,env,originalLease},()=>finiteNativeOperation(originalLease,ctx,async signalFailure=>{
+   const first=error=>{failed=true;signalFailure(error);};
+   const bytes=await (consent?readFiniteOwnerNoticeConsentBody:finiteNativeBytes)(request,check,first);check();(consent?qualifyFiniteOwnerNoticeConsentRequest:qualifyFiniteOwnerNoticeGetRequest)(request,bytes);
    const headers=new Headers();for(const name of finiteNativePreservedHeaders){const value=request.headers.get(name);if(value!==null)headers.set(name,value);}
    headers.set('x-afw-finite-boundary',JSON.stringify(readFiniteOwnerRequestBoundary(originalLease)));
    headers.set('x-afw-finite-original-method',request.method);headers.set('x-afw-finite-original-url',request.url);
    headers.set('x-afw-finite-version',version);headers.set('x-afw-finite-request-id',crypto.randomUUID());
-   readFiniteOwnerNoticeGetMetadata(headers);check();
+   (consent?readFiniteOwnerNoticeConsentMetadata:readFiniteOwnerNoticeGetMetadata)(headers);check();
    let response;try{
-   response=await retain(Reflect.apply(fetcher,stub,[new Request(finiteOwnerNoticeGetTarget,{method:'POST',redirect:'manual',headers,body:bytes.length?bytes:undefined,signal:originalLease.signal})]));check();
+   response=await retain(Reflect.apply(fetcher,stub,[new Request(consent?finiteOwnerNoticeConsentTarget:finiteOwnerNoticeGetTarget,{method:'POST',redirect:'manual',headers,body:bytes.length?bytes:undefined,signal:originalLease.signal})]));check();
    const body=await finiteNativeBytes(response,check,first,503);check();
    if(response.status!==200)return pending([400,401,403,404,405,413,429].includes(response.status)?response.status:503);
    if(!/^text\/html(?:;|$)/i.test(response.headers.get('content-type')??''))fail();
    const output=new Headers();
    for(const [key,value]of response.headers){if(key==='x-content-type-options'){if(value!=='nosniff')fail();continue;}if(!['content-type','content-security-policy','referrer-policy','location','set-cookie','cache-control','x-frame-options'].includes(key)||value.length>8192)fail();output.append(key,value);}
    output.set('Cache-Control','no-store');output.set('X-Content-Type-Options','nosniff');check();return new Response(body,{status:response.status,headers:output});
    }finally{if(response?.body&&!response.body.locked)await retain(response.body.cancel()).catch(()=>{});}
   }));
  }catch{return pending();}
 }


diff --git a/lib/mcp-qa-finite-owner-notice-get-qa.mjs b/lib/mcp-qa-finite-owner-notice-get-qa.mjs
--- a/lib/mcp-qa-finite-owner-notice-get-qa.mjs
+++ b/lib/mcp-qa-finite-owner-notice-get-qa.mjs
@@ -1,16 +1,18 @@
 import {finiteNativePending as pending} from './mcp-qa-finite-owner-native-wire.mjs';
 import {createFiniteOwnerForwardedRequestLease} from './mcp-qa-finite-owner-preparation.mjs';
-import {finiteOwnerNoticeGetTarget,readFiniteOwnerNoticeGetMetadata} from './mcp-qa-finite-owner-notice-get-wire.mjs';
-import {handlePrivateQaFiniteOwnerNoticeGet} from './mcp-qa-finite-owner-phase-context.mjs';
-export function createPrivateQaFiniteOwnerNoticeGetReceiver({ctx,env}){
+import {finiteOwnerNoticeGetTarget,readFiniteOwnerNoticeGetMetadata,finiteOwnerNoticeConsentTarget,readFiniteOwnerNoticeConsentMetadata} from './mcp-qa-finite-owner-notice-get-wire.mjs';
+import {handlePrivateQaFiniteOwnerNoticeGet,handlePrivateQaFiniteOwnerNoticeConsent} from './mcp-qa-finite-owner-phase-context.mjs';
+export function createPrivateQaFiniteOwnerNoticeGetReceiver(input){return receiver(input,false);}
+export function createPrivateQaFiniteOwnerNoticeConsentReceiver(input){return receiver(input,true);}
+function receiver({ctx,env},consent){
  return Object.freeze({async fetch(request){
   let parent;
   try{
-   if(!(request instanceof Request)||request.url!==finiteOwnerNoticeGetTarget)return pending(404);
+   if(!(request instanceof Request)||request.url!==(consent?finiteOwnerNoticeConsentTarget:finiteOwnerNoticeGetTarget))return pending(404);
    if(request.method!=='POST')return pending(405);
-   const metadata=readFiniteOwnerNoticeGetMetadata(request.headers);
+   const metadata=(consent?readFiniteOwnerNoticeConsentMetadata:readFiniteOwnerNoticeGetMetadata)(request.headers);
    parent=createFiniteOwnerForwardedRequestLease(request,metadata.boundary);
-   return await handlePrivateQaFiniteOwnerNoticeGet({request,env,ctx},parent.lease);
+   return await (consent?handlePrivateQaFiniteOwnerNoticeConsent:handlePrivateQaFiniteOwnerNoticeGet)({request,env,ctx},parent.lease);
   }catch{return pending();}finally{parent?.finish();}
  }});
 }


diff --git a/test/fixtures/finite-owner-notice-get.mjs b/test/fixtures/finite-owner-notice-get.mjs
--- a/test/fixtures/finite-owner-notice-get.mjs
+++ b/test/fixtures/finite-owner-notice-get.mjs
@@ -8,48 +8,109 @@
  const directory=join(process.env.RUNNER_TEMP,'afw-notice-get-bundles');await mkdir(directory,{recursive:true});
  await writeFile(join(directory,'principal-io-'+process.pid+'.json'),JSON.stringify(data));
 }
 export async function captureNoticeBundle(built,role,virtualSources={}){
  if(!process.env.AFW_NOTICE_BUNDLE_CAPTURE)return;
  const bytes=built.outputFiles[0].contents,sha256=createHash('sha256').update(bytes).digest('hex'),metafile=built.metafile;
  const inputs=await Promise.all(Object.entries(metafile.inputs).map(async([path,data])=>({path,bytes:data.bytes,imports:data.imports,virtual:path.startsWith('<'),sha256:path.startsWith('<')?(Object.hasOwn(virtualSources,path)?createHash('sha256').update(virtualSources[path]).digest('hex'):null):createHash('sha256').update(await readFile(path)).digest('hex'),hashKind:path.startsWith('<')?'actual-compile-option-text':'file-bytes'})));
  const data={role,bytes:bytes.length,sha256,inputs,metafile,graphSha256:createHash('sha256').update(JSON.stringify(metafile)).digest('hex')};
  const directory=join(process.env.RUNNER_TEMP,'afw-notice-get-bundles');await mkdir(directory,{recursive:true});
  await writeFile(join(directory,role+'-'+process.pid+'-'+(++bundleIndex)+'.json'),JSON.stringify(data));
- console.info('NOTICE actual compiler graph',JSON.stringify({role,bytes:bytes.length,sha256,inputs:inputs.length,noticeInputs:inputs.filter(x=>x.path.includes('notice-get')||x.path.includes('notice-journal')).map(x=>x.path)}));
+ console.info('NOTICE actual compiler graph',JSON.stringify({role,bytes:bytes.length,sha256,inputs:inputs.length,graphSha256:data.graphSha256}));
 }
 // SYN negative corruption and factual observation only. No positive SQL producer.
 export function extendFiniteOwnerNoticeGet(entry){
  const methods=String.raw`
 
+
+ async noticeCorrelated(kind){
+  // SYN negative DATA reseal only; original issuer/source/SQL facts never change.
+  const all=[...await this.ctx.storage.list()],original=all.find(([k])=>k.startsWith('afw.finite-preparation-notice.v1:')&&k.endsWith(':reservation'));
+  const key=original[0].slice(0,-'reservation'.length),r=JSON.parse(original[1]);
+  if(kind==='event-sequence'){
+   const ack=JSON.parse(await this.ctx.storage.get(key+'consent:ack'));await this.ctx.storage.put(key+'consent:ack',noticeEncode('Ack',noticeSeal('Ack',{...ack,sequence:ack.sequence+1})));
+  }else{
+   if(kind==='source-revision')r.identity=noticeIssuerSeal('Identity',{...r.identity,sourceRevision:r.identity.sourceRevision==='f'.repeat(40)?'e'.repeat(40):'f'.repeat(40)});
+   else if(kind==='ticket-request')r.ticket.requestId='eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee';
+   else{
+    const fields={'issuer-reservation':'issuerReservationHash','original-grant-ack':'originalGrantAckHash','grant-link':'grantLinkHash','connection':'connectionHash'},field=fields[kind];if(!field)throw Error('SYN unknown correlated negative');
+    r[field]=r[field]==='f'.repeat(64)?'e'.repeat(64):'f'.repeat(64);
+   }
+   const reservation=noticeSeal('Reservation',r);await this.ctx.storage.put(key+'reservation',noticeEncode('Reservation',reservation));
+   const s=JSON.parse(await this.ctx.storage.get(key+'ticket:send'));
+   const common={identity:reservation.identity,expectedGrant:reservation.expectedGrant,consumedAt:reservation.consumedAt,accessExpiresAt:s.accessExpiresAt,preconnectionExpiresAt:reservation.preconnectionExpiresAt,window:s.window};
+   const send=noticeSeal('Send',{...s,identityHash:reservation.identity.identityHash,reservationHash:reservation.recordHash,requestHash:noticeHash('afw.finite-preparation-notice-request.v1',{operation:'ticket',common,ticket:reservation.ticket,decisionHash:null})});
+   await this.ctx.storage.put(key+'ticket:send',noticeEncode('Send',send));
+   const ack=JSON.parse(await this.ctx.storage.get(key+'ticket:ack'));await this.ctx.storage.put(key+'ticket:ack',noticeEncode('Ack',noticeSeal('Ack',{...ack,sendHash:send.recordHash})));
+  }
+  await this.ctx.storage.sync();
+  const rows=[...await this.ctx.storage.list({prefix:key})];
+  const codecRoundtrip=rows.every(([k,raw])=>{const name=k.slice(key.length),kind=name==='reservation'?'Reservation':name.endsWith(':send')?'Send':'Ack';return noticeEncode(kind,noticeDecode(kind,raw))===raw;});
+  const root=createFiniteOwnerRequestLease(new Request('https://delegated-canary.agentfriendlyweb.dev/fixture/notice-read'));
+  let journalValid=false;try{await noticeRealJournal({ctx:this.ctx,env:this.env}).read({preconnectionId:r.identity.preconnectionId},root.lease);journalValid=true;}finally{root.finish();}
+  if(this.noticeState)this.noticeState.trace=[];
+  return {codecRoundtrip,journalValid};
+ }
+ async noticeBodyStart(headers,kind='overflow'){
+  this.noticeBodyState={readEntered:false,readSettled:false,cancelEntered:false,cancelSettled:false,response:null};
+  const state=this.noticeBodyState,control=new AbortController();this.noticeBodyAbort=()=>control.abort();
+  const body=new ReadableStream({
+   start(c){if(kind==='overflow')c.enqueue(new Uint8Array(1025));},
+   pull:c=>{if(kind==='read'&&!state.readEntered){state.readEntered=true;return new Promise(resolve=>{this.noticeBodyReadRelease=()=>{this.noticeBodyReadRelease=null;state.readSettled=true;c.enqueue(new TextEncoder().encode('handle='+'a'.repeat(43)));resolve();};});}},
+   cancel:()=>{state.cancelEntered=true;return new Promise(resolve=>{this.noticeBodyRelease=()=>{this.noticeBodyRelease=null;state.cancelSettled=true;resolve();};});}
+  },{highWaterMark:0});
+  const at=Date.now(),h=new Headers(headers);h.set('x-afw-finite-boundary',JSON.stringify({startedAt:at,deadline:at+30000,remainingMs:30000}));h.set('x-afw-finite-original-method','POST');h.set('x-afw-finite-original-url','https://delegated-canary.agentfriendlyweb.dev/monitoring/grant');h.set('x-afw-finite-version','77777777-7777-4777-8777-777777777777');h.set('x-afw-finite-request-id','77777777-7777-4777-8777-777777777777');
+  const response=await createPrivateQaFiniteOwnerNoticeConsentReceiver({ctx:this.ctx,env:this.env}).fetch(new Request('https://afw-private.invalid/_finite-owner/monitoring/grant',{method:'POST',headers:h,body,signal:control.signal}));state.response=response.status;await response.body?.cancel();return {...state};
+ }
+ async noticeBodyAbortHeld(){this.noticeBodyAbort?.();}
+ async noticeBodyReleaseRead(){this.noticeBodyReadRelease?.();}
+ async noticeBodyRead(){return {...this.noticeBodyState};}
+ async noticeBodyReleaseHeld(){this.noticeBodyRelease?.();}
+
+
+ async noticeOrdinaryWithdraw(){
+  const all=[...await this.ctx.storage.list()],r=JSON.parse(all.find(([k])=>k.startsWith('afw.finite-preparation-notice.v1:')&&k.endsWith(':reservation'))[1]),i=r.identity;
+  const event=await this.env.RELEASE_DB.prepare('SELECT sequence FROM dossier_monitoring_consent_events WHERE grant_id=? ORDER BY sequence DESC LIMIT 1').bind(i.grantId).first();
+  return noticeOrdinaryRecord({db:this.env.RELEASE_DB,subject:i.subject,grantId:i.grantId,projectId:i.projectId,expectedClientId:i.clientId,expectedResource:i.resource,expectedRevision:i.projectRevision,expectedSequence:event.sequence,action:'revoke',requestId:'22222222-2222-4222-8222-222222222222',now:Date.now()});
+ }
+ async noticeOrdinaryRead(){
+  const all=[...await this.ctx.storage.list()],r=JSON.parse(all.find(([k])=>k.startsWith('afw.finite-preparation-notice.v1:')&&k.endsWith(':reservation'))[1]),i=r.identity;
+  try{const auth=await noticeOrdinaryAuthorization({db:this.env.RELEASE_DB,context:{grantId:i.grantId,subject:i.subject,clientId:i.clientId,resource:i.resource,scopes:i.requestedScopes},projectId:i.projectId,projectionSecret:'SYN-only-public-fixture-projection-secret-00000000'})();
+   return {enabled:auth.enabled};
+  }catch(error){return {unavailable:true,message:error.message};}
+ }
+
+ async noticeInstanceRead(){this.noticeInstance??=crypto.randomUUID();return this.noticeInstance;}
+ async noticeRestart(){this.ctx.abort('SYN notice restart',{retryAlarm:false});}
  async noticeConfigure(mode='normal'){
   this.noticeRestore?.();globalThis.__noticeOwner=this;this.noticeMode=mode;this.noticeHeld=null;this.noticeRelease=null;
   const state=globalThis.__noticeState={trace:[],sql:[],ops:{get:0,list:0,sync:0,transaction:0,txGet:0,txList:0,txPut:0},lists:[],resolution:null};this.noticeState=state;
   const db=this.env.RELEASE_DB,sessionMethod=db.withSession,storage=this.ctx.storage,originals={get:storage.get,list:storage.list,sync:storage.sync,transaction:storage.transaction};
   for(const kind of ['get','list','sync'])storage[kind]=(...args)=>{state.ops[kind]++;if(kind==='list')state.lists.push({prefix:String(args[0]?.prefix??''),limit:args[0]?.limit??null});return Reflect.apply(originals[kind],storage,args);};
   storage.transaction=callback=>{state.ops.transaction++;return Reflect.apply(originals.transaction,storage,[async tx=>{
    const actual={get:tx.get,list:tx.list,put:tx.put};
    const wrapped={};for(const [name,method]of Object.entries(actual))wrapped[name]=(...args)=>{state.ops[{get:'txGet',list:'txList',put:'txPut'}[name]]++;return Reflect.apply(method,tx,args);};
    return callback(wrapped);
   }]);};
   db.withSession=constraint=>{
    const session=Reflect.apply(sessionMethod,db,[constraint]),prepare=session.prepare,record={constraint,queries:[]};state.sql.push(record);
    session.prepare=sql=>{
     const statement=Reflect.apply(prepare,session,[sql]),entry={sql,method:null};record.queries.push(entry);
     return {bind:(...args)=>{
      const bound=statement.bind(...args),run=async kind=>{
       entry.method=kind;entry.at=Date.now();
-      const ticketInsert=sql.includes('INSERT INTO dossier_monitoring_owner_tickets');
+      const ticketInsert=sql.includes('INSERT INTO dossier_monitoring_owner_tickets')||sql.includes('INSERT INTO dossier_monitoring_consent_events');
       if(ticketInsert){state.sqlEnteredAt=Date.now();if(this.noticeMode==='queue'||this.noticeMode==='hold-before')await this.noticeGate('before-sql');}
       const actual=Reflect.apply(bound[kind],bound,[]),result=await actual;entry.doneAt=Date.now();
       if(ticketInsert){state.resolution={at:Date.now(),row:result!==null};if(this.noticeMode==='hold-after')await this.noticeGate('after-sql');if(this.noticeMode==='lost-sql')throw Error('SYN NEGATIVE actual SQL committed, result lost');}
       if(kind==='all'&&sql.endsWith('ORDER BY name LIMIT 8')&&this.noticeMode==='failed-schema-metadata')return {...result,success:false};
+      if(kind==='all'&&sql.endsWith('ORDER BY name LIMIT 8')&&this.noticeMode==='malformed-schema-results')return {...result,results:{}};
       return result;
      };
      return {first:()=>run('first'),all:()=>run('all')};
     }};
    };return session;
   };
   this.noticeRestore=()=>{for(const [k,v]of Object.entries(originals))storage[k]=v;db.withSession=sessionMethod;};
  }
  async noticeGate(name){
   const state=this.noticeState;state.trace.push({gate:name,at:Date.now()});this.noticeHeld=name;
@@ -95,35 +156,62 @@
     if(kind==='connection')reservation.connectionHash='f'.repeat(64);
     // Identity corruption intentionally fails the accepted codec; never a positive producer.
     if(kind==='identity')await this.ctx.storage.put(prefix+'reservation',JSON.stringify(reservation));
     else await this.ctx.storage.put(prefix+'reservation',noticeEncode('Reservation',noticeSeal('Reservation',reservation)));
    }else throw Error('SYN unknown notice fault');
   }
   await this.ctx.storage.sync();
  }
  `;
  if(entry.split(' export class Initial extends FiniteClosure{').length!==2)throw Error('SYN notice class marker');
- return "import {sealFinitePreparationNoticeRecord as noticeSeal,encodeFinitePreparationNoticeRecord as noticeEncode} from './lib/mcp-qa-finite-preparation-notice-records.mjs';\n"+entry.replace(' export class Initial extends FiniteClosure{',' export class Initial extends FiniteClosure{'+methods);
+ return "import {recordDossierMonitoringConsent as noticeOrdinaryRecord,createDossierMonitoringAuthorization as noticeOrdinaryAuthorization} from './lib/dossier-monitoring-authority.mjs';\nimport {initialHash as noticeHash} from './lib/mcp-qa-finite-initial-material-records.mjs';\nimport {sealFinitePreparationIssuerRecord as noticeIssuerSeal} from './lib/mcp-qa-finite-preparation-issuer-records.mjs';\nimport {createFinitePreparationNoticeJournal as noticeRealJournal} from './lib/mcp-qa-finite-preparation-notice-journal.mjs';\nimport {sealFinitePreparationNoticeRecord as noticeSeal,encodeFinitePreparationNoticeRecord as noticeEncode,decodeFinitePreparationNoticeRecord as noticeDecode} from './lib/mcp-qa-finite-preparation-notice-records.mjs';\n"+entry.replace(' export class Initial extends FiniteClosure{',' export class Initial extends FiniteClosure{'+methods);
 }
 
 // Read-only instrumentation of exact lexical source sites. SYN gates never supply authority.
 export function instrumentFiniteNoticeGet(source){
+ const postAt=source.indexOf('/** UNMOUNTED fixed human POST.'),post=postAt<0?'':source.slice(postAt);if(postAt>=0)source=source.slice(0,postAt);
  const marker='/** UNMOUNTED fixed GET.',at=source.indexOf(marker);
  if(at<0)throw Error('SYN notice handler marker');
  let head=source.slice(0,at),body=source.slice(at);
  const between="await ioCheckpoint('between');";
  if(head.split(between).length!==2)throw Error('SYN notice second snapshot marker');
  head=head.replace(between,between+"if(globalThis.__noticeOwner?.noticeMode==='drift'&&globalThis.__noticeState?.trace.at(-1)?.position==='ticket-sql-resolved')await globalThis.__noticeOwner.noticeGate('between-own');");
 
  const replace=(needle,next)=>{if(body.split(needle).length!==2)throw Error('SYN notice marker changed: '+needle);body=body.replace(needle,next);};
  replace("async function recheckNoticeGetOwned(){\n    check();","async function recheckNoticeGetOwned(){\n    globalThis.__noticeState?.trace.push({position,at:Date.now(),stage:'before'});check();");
  replace("if(canonical(pair.first)!==canonical(expected)||canonical(pair.second)!==canonical(expected))fail();","if(canonical(pair.first)!==canonical(expected)||canonical(pair.second)!==canonical(expected))fail();globalThis.__noticeState?.trace.push({position,at:Date.now(),stage:'after'});");
  replace("await recheckNoticeGetOwned();check();\n    position='ticket-sql-pending';","await recheckNoticeGetOwned();check();\n    position='ticket-sql-pending';");
  replace("const baseline=await wait(observeOwnerPhasePair({ctx,env,parent:originalLease})),context=qualifySettledOwnerPair(baseline);","const baseline=await wait(observeOwnerPhasePair({ctx,env,parent:originalLease})),context=qualifySettledOwnerPair(baseline);globalThis.__noticeState?.trace.push({position:'baseline-observed',at:Date.now()});");
  replace("ownedReservation=record;expected.records.notice.reservation=","if(globalThis.__noticeOwner?.noticeMode==='lost-reservation')throw Error('SYN NEGATIVE reservation recorded, return lost');ownedReservation=record;expected.records.notice.reservation=");
  replace("ownedSend=send;operation='ticket';","if(globalThis.__noticeOwner?.noticeMode==='lost-send')throw Error('SYN NEGATIVE SEND recorded, return lost');ownedSend=send;operation='ticket';");
  replace("   check();\n   const maxAge=","   globalThis.__noticeState?.trace.push({position:'complete',at:Date.now()});check();\n   const maxAge=");
 
  replace("if(!verified.ok)fail();identity=verified.identity;clock.narrow(identity.expiresAt);","if(!verified.ok)fail();identity=verified.identity;if(globalThis.__noticeOwner?.noticeMode==='expire-access')await wait(globalThis.__noticeOwner.noticeGate('access'));clock.narrow(identity.expiresAt);");
- return head+body;
+ let consent=post;
+ const postReplace=(needle,next)=>{if(consent.split(needle).length!==2)throw Error('SYN consent marker changed: '+needle);consent=consent.replace(needle,next);};
+ if(consent){
+  postReplace("async function recheckConsentOwned(){\n    check();","async function recheckConsentOwned(){\n    globalThis.__noticeState?.trace.push({position,at:Date.now(),stage:'before'});check();");
+  postReplace("if(canonical(pair.first)!==canonical(expected)||canonical(pair.second)!==canonical(expected))fail();","if(canonical(pair.first)!==canonical(expected)||canonical(pair.second)!==canonical(expected))fail();globalThis.__noticeState?.trace.push({position,at:Date.now(),stage:'after'});");
+  postReplace("context=qualifyNoticeConsentBaseline(baseline);","context=qualifyNoticeConsentBaseline(baseline);globalThis.__noticeState?.trace.push({position:'baseline-observed',at:Date.now()});");
+  postReplace("position='ticket-observed';await recheckConsentOwned();","position='ticket-observed';if(globalThis.__noticeOwner?.noticeMode==='before-send')await wait(globalThis.__noticeOwner.noticeGate('before-send'));await recheckConsentOwned();");
+  postReplace("anchor();position='consent-send-recorded';","anchor();position='consent-send-recorded';if(globalThis.__noticeOwner?.noticeMode==='after-send')await wait(globalThis.__noticeOwner.noticeGate('after-send'));");
+  postReplace("ownSend=send;expected.records.notice.operations.consent.send=","if(globalThis.__noticeOwner?.noticeMode==='lost-send')throw Error('SYN NEGATIVE consent SEND recorded, result lost');ownSend=send;expected.records.notice.operations.consent.send=");
+  postReplace("expected.records.notice.operations.consent.ack=structuredClone(ack);","if(globalThis.__noticeOwner?.noticeMode==='lost-ack')throw Error('SYN NEGATIVE consent ACK recorded, result lost');expected.records.notice.operations.consent.ack=structuredClone(ack);");
+  postReplace("    position='consent-sql-pending';sqlSettled=false;","    if(globalThis.__noticeOwner?.noticeMode==='before-insert')await wait(globalThis.__noticeOwner.noticeGate('before-insert'));check();position='consent-sql-pending';sqlSettled=false;");
+  postReplace("if(!verified.ok)fail();identity=verified.identity;clock.narrow(identity.expiresAt);","if(!verified.ok)fail();identity=verified.identity;globalThis.__noticeState&&(globalThis.__noticeState.accessVerifications=(globalThis.__noticeState.accessVerifications??0)+1);clock.narrow(identity.expiresAt);");
+  postReplace("if(!again.ok||again.identity.subject!==identity.subject||again.identity.expiresAt!==identity.expiresAt)fail();","if(!again.ok||again.identity.subject!==identity.subject||again.identity.expiresAt!==identity.expiresAt)fail();globalThis.__noticeState&&(globalThis.__noticeState.accessVerifications=(globalThis.__noticeState.accessVerifications??0)+1);");
+  postReplace("   const html=","   globalThis.__noticeState?.trace.push({position:'complete',at:Date.now()});const html=");
+ }
+ head=head.replace("if(globalThis.__noticeOwner?.noticeMode==='drift'&&globalThis.__noticeState?.trace.at(-1)?.position==='ticket-sql-resolved')await globalThis.__noticeOwner.noticeGate('between-own');","if((globalThis.__noticeOwner?.noticeMode==='drift'&&globalThis.__noticeState?.trace.at(-1)?.position==='ticket-sql-resolved')||(globalThis.__noticeOwner?.noticeMode==='consent-drift'&&globalThis.__noticeState?.trace.at(-1)?.position==='consent-sql-resolved'))await globalThis.__noticeOwner.noticeGate('between-own');");
+
+ head=head.replaceAll("globalThis.__noticeState?.trace.at(-1)?.position","globalThis.__noticeState?.trace.filter(v=>v.position).at(-1)?.position");
+ const passiveMarker=(needle,entry,exit)=>{
+  if(head.split(needle).length!==2)throw Error('SYN passive correlator marker changed: '+entry);
+  head=head.replace(needle,"globalThis.__noticeState?.trace.push({correlator:'"+entry+"',phase:'enter'});"+needle+(exit?"globalThis.__noticeState?.trace.push({correlator:'"+entry+"',phase:'exit'});":""));
+ };
+ passiveMarker("if(canonical(r.identity)!==canonical(i)||r.issuerReservationHash!==f.issuer.reservation.recordHash||r.originalGrantAckHash!==ops.grant.ack.recordHash||r.grantLinkHash!==prepHash('GrantLink',issuerFacts.grantLink)||r.connectionHash!==prepHash('ConnectionRef',issuerFacts.connection)||canonical(r.expectedGrant)!==canonical(expectedGrant)||r.consumedAt!==issuerFacts.consent.consumed_at||r.preconnectionExpiresAt!==data.preconnection.expiresAt||r.accessExpiresAt>Math.min(data.preconnection.owner.accessExpiresAt,i.C0)||r.accessExpiresAt<=r.issuedAt||r.issuedAt>Date.now()||t.expiresAt>ceil||t.permissionExpiresAt>ceil||Date.now()>=t.permissionExpiresAt)fail();",'noticePrimary296',true);
+ passiveMarker("if(tickets.some(v=>canonical(v)!==canonical(row)))fail();",'noticePrimary301',true);
+ passiveMarker("if(consent.ack?.outcome==='applied'&&(events.length!==1||consent.ack.rowHash!==digest('afw.finite-preparation-notice-row.v1',events[0])||consent.ack.sequence!==events[0].sequence||events[0].issued_at>consent.ack.observedAt))fail();",'noticeConsentEventAck',true);
+
+ return head+body+consent;
 }
 


diff --git a/test/fixtures/finite-owner-qa-sdk.mjs b/test/fixtures/finite-owner-qa-sdk.mjs
--- a/test/fixtures/finite-owner-qa-sdk.mjs
+++ b/test/fixtures/finite-owner-qa-sdk.mjs
@@ -70,23 +70,23 @@
   const parent=createFiniteOwnerRequestLease(new Request('https://delegated-canary.agentfriendlyweb.dev/authorize'));
   try{return await readPrivateQaFiniteOwnerContext({ctx:this.ctx,env:this.env,parent:parent.lease});}catch{return {status:'unavailable'};}finally{parent.finish();}
  }
 `;
  if(observed)methods=methods.replace("async fetch(request){return createPrivateQaFiniteOwnerOAuthReceiver({ctx:this.ctx,env:this.env}).fetch(request);}", "async fetch(request){this.sdkSignals={entryAborted:request.signal.aborted,abortObserved:false,settled:false,settledAborted:null};const seen=this.sdkSignals;request.signal.addEventListener('abort',()=>{seen.abortObserved=true;},{once:true});try{return await createPrivateQaFiniteOwnerOAuthReceiver({ctx:this.ctx,env:this.env}).fetch(request);}finally{seen.settled=true;seen.settledAborted=request.signal.aborted;}}");
  // Ticket fixture is external SYN approval DATA, generated through genuine store.
  // It must match a real bounded preparation cookie, never a positive source alias.
  const old="ticketHash='7'.repeat(64)",replacement="ticketHash=phaseRawSha('a'.repeat(64))";
  if(!entry.includes(old))throw Error('SYN exact phase seed changed');
  if(noticeGet){
-  methods=methods.replace("async fetch(request){return createPrivateQaFiniteOwnerOAuthReceiver({ctx:this.ctx,env:this.env}).fetch(request);}", "async fetch(request){if(request.url==='https://afw-private.invalid/_finite-owner/monitoring')return createPrivateQaFiniteOwnerNoticeGetReceiver({ctx:this.ctx,env:this.env}).fetch(request);return createPrivateQaFiniteOwnerOAuthReceiver({ctx:this.ctx,env:this.env}).fetch(request);}");
+  methods=methods.replace("async fetch(request){return createPrivateQaFiniteOwnerOAuthReceiver({ctx:this.ctx,env:this.env}).fetch(request);}", "async fetch(request){if(request.url==='https://afw-private.invalid/_finite-owner/monitoring')return createPrivateQaFiniteOwnerNoticeGetReceiver({ctx:this.ctx,env:this.env}).fetch(request);if(request.url==='https://afw-private.invalid/_finite-owner/monitoring/grant')return createPrivateQaFiniteOwnerNoticeConsentReceiver({ctx:this.ctx,env:this.env}).fetch(request);return createPrivateQaFiniteOwnerOAuthReceiver({ctx:this.ctx,env:this.env}).fetch(request);}");
  }
- return (noticeGet?"import {createPrivateQaFiniteOwnerNoticeGetReceiver} from './lib/mcp-qa-finite-owner-notice-get-qa.mjs';\n":"")+imports+entry.replace(old,replacement).replace(' export class Initial extends FiniteClosure{',' export class Initial extends FiniteClosure{'+methods);
+ return (noticeGet?"import {createPrivateQaFiniteOwnerNoticeGetReceiver,createPrivateQaFiniteOwnerNoticeConsentReceiver} from './lib/mcp-qa-finite-owner-notice-get-qa.mjs';\n":"")+imports+entry.replace(old,replacement).replace(' export class Initial extends FiniteClosure{',' export class Initial extends FiniteClosure{'+methods);
 }
 export async function finiteOwnerSdkWorkers(qa,{observed=false,token=false,io=false,noticeGet=false}={}){
  const mProfile=finiteWranglerProfileTemplate('canaryLive');let outgoingInstrumentations=0;
  let source=`import {forwardPrivateFiniteOwnerOAuth} from './lib/mcp-qa-finite-owner-oauth-forward.mjs';
  import {createFiniteOwnerRequestLease} from './lib/mcp-qa-finite-owner-preparation.mjs';
  export default{async fetch(request,env,ctx){const root=createFiniteOwnerRequestLease(request);try{return await forwardPrivateFiniteOwnerOAuth({request,env,ctx},root.lease);}finally{root.finish();}}};`;
  if(token)source=`import {createDelegatedOAuthWorker} from './lib/delegated-oauth-worker.mjs';
  import {forwardPrivateFiniteOwnerOAuth} from './lib/mcp-qa-finite-owner-oauth-forward.mjs';
  import {createFiniteOwnerRequestLease} from './lib/mcp-qa-finite-owner-preparation.mjs';
  const issuer='https://delegated-canary.agentfriendlyweb.dev',worker=createDelegatedOAuthWorker({issuer,resource:issuer+'/mcp'});let tokenPins=null,wrongNamespace=false;
@@ -94,30 +94,51 @@
   const path=new URL(request.url).pathname;
   if(path==='/fixture/token-config'&&request.method==='POST'){
    const pins=await request.json();tokenPins={AFW_OAUTH_PILOT_CLIENT_ID:pins.clientId,AFW_OAUTH_PILOT_PROJECT_ID:pins.projectId,AFW_OAUTH_PILOT_EXPIRES_AT:pins.expiresAt,ACCESS_AUD:pins.audience,ACCESS_TEAM_DOMAIN:pins.teamDomain};return new Response(null,{status:204});
   }
   if(path==='/fixture/token-namespace'&&request.method==='POST'){wrongNamespace=true;return new Response(null,{status:204});}
   if(path==='/oauth/token'||path==='/mcp'){const headers=new Headers(request.headers);headers.set('Host',new URL(issuer).host);return worker.fetch(new Request(request,{headers}),{...env,...tokenPins,...(wrongNamespace?{OAUTH_KV:env.SYN_WRONG_KV}:{})},ctx);}
   if(path!=='/authorize')return new Response(null,{status:404});
   const root=createFiniteOwnerRequestLease(request);try{return await forwardPrivateFiniteOwnerOAuth({request,env,ctx},root.lease);}finally{root.finish();}
  }};`;
  if(noticeGet){
-  source="import {forwardPrivateFiniteOwnerNoticeGet} from './lib/mcp-qa-finite-owner-notice-get-forward.mjs';\n"+source;
-  source=source.replace("if(path!=='/authorize')return new Response(null,{status:404});", "if(['/monitoring','/monitoring/grant','/monitoring/revoke'].includes(path)){if(request.method!=='GET'||path!=='/monitoring')return new Response(null,{status:405});const root=createFiniteOwnerRequestLease(request);try{return await forwardPrivateFiniteOwnerNoticeGet({request,env,ctx},root.lease);}finally{root.finish();}}if(path!=='/authorize')return new Response(null,{status:404});");
+  source="import {readFiniteOwnerRequestDeadline as noticeDeadline} from './lib/mcp-qa-finite-owner-preparation.mjs';\nimport {observeFiniteOwnerRequestWork as noticeObserve} from './lib/mcp-qa-finite-stage-work.mjs';\nimport {forwardPrivateFiniteOwnerNoticeGet,forwardPrivateFiniteOwnerNoticeConsent} from './lib/mcp-qa-finite-owner-notice-get-forward.mjs';\n"+source;
+  source=source.replace("if(path!=='/authorize')return new Response(null,{status:404});", "if(path==='/fixture/consent-abort'){globalThis.__noticeMRoot?.finish();return new Response(null,{status:204});}\n  if(path==='/fixture/consent-body-state')return Response.json(globalThis.__noticeMBody?.state??{});\n  if(path==='/fixture/consent-body-release'){if(globalThis.__noticeMBody)globalThis.__noticeMBody.state.releaseCancelRequested=true;return new Response(null,{status:204});}\n  if(path==='/fixture/consent-body-probe'){\n   const held=globalThis.__noticeMBody,root=createFiniteOwnerRequestLease(request);let allowed=false,reason=null;try{await noticeObserve({ctx:held.ctx,env:held.env,originalLease:root.lease},async()=>{});allowed=true;}catch(error){reason=error.message;}finally{root.finish();}return Response.json({allowed,reason,cancelSettled:held.state.cancelSettled,rootAborted:held.root?.lease.signal.aborted??null});\n  }\n  if(path==='/fixture/consent-body-release-read'){if(globalThis.__noticeMBody)globalThis.__noticeMBody.state.releaseReadRequested=true;return new Response(null,{status:204});}\n  if(path==='/fixture/consent-body-start'||path==='/fixture/consent-body-read-start'){\n   const kind=path==='/fixture/consent-body-read-start'?'read':'overflow',state={readEntered:false,readSettled:false,cancelEntered:false,cancelSettled:false,releaseReadRequested:false,releaseCancelRequested:false},held=globalThis.__noticeMBody={state,ctx,env};\n   let originalDeadline;\n   // SYN controls only set DATA. Stream IO stays in its original invocation.\n   const released=flag=>new Promise((resolve,reject)=>{\n    const tick=()=>{const remaining=originalDeadline-Date.now();if(!Number.isSafeInteger(remaining)||remaining<=0){reject(Error('SYN original body deadline'));return;}if(state[flag]){resolve();return;}setTimeout(tick,Math.min(10,remaining));};tick();\n   });\n   const body=new ReadableStream({\n    start(c){if(kind==='overflow')c.enqueue(new Uint8Array(1025));},\n    pull(c){if(kind==='read'&&!state.readEntered){state.readEntered=true;return released('releaseReadRequested').then(()=>{state.readSettled=true;c.enqueue(new TextEncoder().encode('handle='+'a'.repeat(43)));});}},\n    cancel(){state.cancelEntered=true;return released('releaseCancelRequested').then(()=>{state.cancelSettled=true;});}\n   },{highWaterMark:0});\n   const original=new Request(issuer+'/monitoring/grant',{method:'POST',headers:request.headers,body}),root=createFiniteOwnerRequestLease(original);originalDeadline=noticeDeadline(root.lease);globalThis.__noticeMRoot=root;held.root=root;\n   try{const response=await forwardPrivateFiniteOwnerNoticeConsent({request:original,env,ctx},root.lease);state.response=response.status;await response.body?.cancel();return Response.json(state);}finally{root.finish();}\n  }\n    "+"if(['/monitoring','/monitoring/grant','/monitoring/revoke'].includes(path)){if(!(request.method==='GET'&&path==='/monitoring'||request.method==='POST'&&path==='/monitoring/grant'))return new Response(null,{status:405});const root=createFiniteOwnerRequestLease(request);try{globalThis.__noticeMRoot=root;return await (path==='/monitoring'?forwardPrivateFiniteOwnerNoticeGet:forwardPrivateFiniteOwnerNoticeConsent)({request,env,ctx},root.lease);}finally{root.finish();}}if(path!=='/authorize')return new Response(null,{status:404});");
  }
  if(observed||io)source=source.replace("export default{async fetch(request,env,ctx){const root=",`let active,activeRoot,delay=0;export default{async fetch(request,env,ctx){const path=new URL(request.url).pathname;if(path==='/fixture/signal-state')return Response.json(globalThis.__d02M??{});if(path==='/fixture/abort'){active?.abort();return new Response(null,{status:204});}if(path==='/fixture/abort-root'){activeRoot?.finish();return new Response(null,{status:204});}if(path==='/fixture/elapsed'){delay=29000;return new Response(null,{status:204});}const seen=globalThis.__d02M={incomingEntryAborted:request.signal.aborted,incomingAbortObserved:false,rootAbortObserved:false};request.signal.addEventListener('abort',()=>{seen.incomingAbortObserved=true;},{once:true});const control=new AbortController();request.signal.addEventListener('abort',()=>control.abort(),{once:true});request=new Request(request,{signal:control.signal});active=control;const root=`).replace("try{return await forward", "activeRoot=root;globalThis.__d02M.rootEntryAborted=root.lease.signal.aborted;root.lease.signal.addEventListener('abort',()=>{globalThis.__d02M.rootAbortObserved=true;},{once:true});try{const elapsed=delay;delay=0;if(elapsed)await new Promise(resolve=>setTimeout(resolve,elapsed));return await forward").replace("finally{root.finish();}", "finally{root.finish();if(active===control)active=null;if(activeRoot===root)activeRoot=null;}");
  const plugins=observed||io?[{name:'SYN-signal-observation',setup(b){b.onLoad({filter:/mcp-qa-finite-owner-oauth-forward\.mjs$/},async args=>{
   outgoingInstrumentations++;let contents=await readFile(args.path,'utf8');const needle="const response=await Reflect.apply(fetcher,stub,[new Request(finiteOwnerOAuthTarget,{method:'POST',redirect:'manual',headers,body:bytes.length?bytes:undefined,signal:originalLease.signal})]);check();";
   if(contents.split(needle).length!==2)throw Error('SYN outgoing observation changed');
   contents=contents.replace(needle,"const outgoing=new Request(finiteOwnerOAuthTarget,{method:'POST',redirect:'manual',headers,body:bytes.length?bytes:undefined,signal:originalLease.signal});globalThis.__d02M.outgoingEntryAborted=outgoing.signal.aborted;globalThis.__d02M.outgoingAbortObserved=false;outgoing.signal.addEventListener('abort',()=>{globalThis.__d02M.outgoingAbortObserved=true;},{once:true});const response=await Reflect.apply(fetcher,stub,[outgoing]);check();");
   return {contents,loader:'js'};
  });}}]:[];
+
+ if(noticeGet)plugins.push({name:'SYN-notice-M-body-observation',setup(b){
+  b.onLoad({filter:/mcp-qa-finite-owner-notice-consent-body\.mjs$/},async args=>{
+   let contents=await readFile(args.path,'utf8');
+   const once=(needle,next)=>{if(contents.split(needle).length!==2)throw Error('SYN body observation marker');contents=contents.replace(needle,next);};
+   once(" const reader=message.body?.getReader();"," const seen=globalThis.__noticeMBody?.state;const reader=message.body?.getReader();");
+   once("const {done,value}=await retain(reader.read());","const actualRead=reader.read();if(seen)seen.readNativeEntered=true;actualRead.then(()=>{if(seen)seen.readNativeSettled=true;},()=>{if(seen)seen.readNativeRejected=true;});const {done,value}=await retain(actualRead);");
+   once("try{await retain(reader.cancel());}catch{}throw error;}","try{const actualCancel=reader.cancel();if(seen)seen.cancelNativeEntered=true;actualCancel.then(()=>{if(seen)seen.cancelNativeSettled=true;},()=>{if(seen)seen.cancelNativeRejected=true;});await retain(actualCancel);}catch{}throw error;}finally{if(seen)seen.bodyFinally=true;}");
+   return {contents,loader:'js'};
+  });
+  b.onLoad({filter:/mcp-qa-finite-owner-notice-get-forward\.mjs$/},async args=>{
+   let contents=await readFile(args.path,'utf8');
+   const once=(needle,next)=>{if(contents.split(needle).length!==2)throw Error('SYN forward observation marker');contents=contents.replace(needle,next);};
+   once("async signalFailure=>{","async signalFailure=>{try{");
+   once("  }));","  }finally{const seen=globalThis.__noticeMBody?.state;if(seen)seen.actualCallbackFinally=true;}}));");
+   once("const bytes=await (consent?readFiniteOwnerNoticeConsentBody:finiteNativeBytes)(request,check,first);","const actualBody=(consent?readFiniteOwnerNoticeConsentBody:finiteNativeBytes)(request,check,first),seen=globalThis.__noticeMBody?.state;if(seen)seen.bodyPromiseEntered=true;actualBody.then(()=>{if(seen)seen.bodyPromiseSettled=true;},()=>{if(seen)seen.bodyPromiseRejected=true;});const bytes=await actualBody;");
+   once(" }catch{return pending();}"," }catch{return pending();}finally{const seen=globalThis.__noticeMBody?.state;if(seen)seen.outerFinally=true;}");
+   return {contents,loader:'js'};
+  });
+ }});
+
  const built=await build({plugins,stdin:{contents:source,resolveDir:process.cwd()},bundle:true,write:false,metafile:true,platform:'neutral',mainFields:['module','main'],format:'esm',target:'es2022',external:['node:*','cloudflare:*']});
  if((observed||io)&&outgoingInstrumentations!==1)throw Error('SYN outgoing observer not installed exactly once');
  if(noticeGet)await captureNoticeBundle(built,'M',{'<stdin>':source});
  console.info('D02 fixture M compiler',JSON.stringify({bytes:built.outputFiles[0].contents.length,sha256:createHash('sha256').update(built.outputFiles[0].contents).digest('hex'),inputs:Object.keys(built.metafile.inputs).length}));
  return {...(qa.resourcePersistencePath?{resourcePersistencePath:qa.resourcePersistencePath}:{}),workers:[{...qa,name:'qa-sdk'},{
   name:'m-sdk',modules:true,script:built.outputFiles[0].text,compatibilityDate:mProfile.compatibility_date,compatibilityFlags:mProfile.compatibility_flags,
   kvNamespaces:{OAUTH_KV:'finite-sdk-shared',...(token?{SYN_WRONG_KV:'finite-sdk-wrong'}:{})},
   ...(token?{d1Databases:{DB:qa.d1Databases.RELEASE_DB},ratelimits:{DELEGATED_RATE_LIMITER:{namespace_id:'99123',simple:{limit:1000,period:60}}}}:{}),
   bindings:{...(token?{AFW_DELEGATED_OAUTH_ENABLED:'true',AFW_OAUTH_REFRESH_ENABLED:'false',AFW_OAUTH_SERVICE_MODE:'window',AFW_DOSSIER_EVENTS_ENABLED:'false'}:{}),AFW_FINITE_TRIAL_VERSION:{id:'77777777-7777-4777-8777-777777777777'}},
   durableObjects:{AFW_FINITE_TRIAL_CONTROL:{className:'Initial',scriptName:'qa-sdk',useSQLite:true,uniqueKey:'initial-c2a'}}


diff --git a/test/mcp-qa-finite-owner-notice-get-native.test.mjs b/test/mcp-qa-finite-owner-notice-get-native.test.mjs
--- a/test/mcp-qa-finite-owner-notice-get-native.test.mjs
+++ b/test/mcp-qa-finite-owner-notice-get-native.test.mjs
@@ -63,22 +63,22 @@
  assert.equal(after.tickets.length,1);assert.equal(after.notice.length,3);assert.deepEqual(after.events,[]);
  const records=Object.fromEntries(after.notice.map(([key,value])=>[key.split(':').slice(-2).join(':'),JSON.parse(value)])),ticket=after.tickets[0],handle=/name="handle" value="([^"]+)"/.exec(html)?.[1];assert(handle);
  assert.equal(createHash('sha256').update(handle).digest('hex'),ticket.handle_hash);assert.equal(Object.keys(ticket).length,14);assert.equal(ticket.grant_id,f.identity.grantId);assert.equal(ticket.user_id,f.identity.subject);assert.equal(ticket.expected_sequence,0);assert.equal(ticket.action,'grant');assert.equal(ticket.purpose,'afw.dossier-monitoring-owner.v1');
  const reservation=JSON.parse(after.notice.find(([key])=>key.endsWith(':reservation'))[1]),rt=reservation.ticket,i=f.identity;
  assert.deepEqual(reservation.identity,i);assert.deepEqual(reservation.expectedGrant,{scopes:JSON.parse(f.grant.scopes_json),createdAt:f.grant.created_at,expiresAt:f.grant.expires_at});
  assert.deepEqual(ticket,{handle_hash:createHash('sha256').update(handle).digest('hex'),request_id:rt.requestId,user_id:i.subject,grant_id:i.grantId,project_id:i.projectId,client_id:i.clientId,resource:i.resource,purpose:'afw.dossier-monitoring-owner.v1',action:'grant',revision:i.projectRevision,expected_sequence:0,issued_at:rt.issuedAt,expires_at:rt.expiresAt,permission_expires_at:rt.permissionExpiresAt});
  assert.equal(records['ticket:ack'].rowHash,initialHash('afw.finite-preparation-notice-row.v1',ticket));
  assert.equal(ticket.expires_at,Math.min(ticket.issued_at+600000,reservation.accessExpiresAt,reservation.preconnectionExpiresAt,i.C0,Date.parse(i.consentExpiresAt),Date.parse(f.grant.expires_at)));
  const sourceRowsAfter=await plain(f.stub.snapshot());for(const row of originalRows)assert.deepEqual(sourceRowsAfter.find(([key])=>key===row[0]),row,'original preparation/issuer/SDK history retained');
  assert.equal(records['ticket:ack'].outcome,'applied');assert.equal(records['ticket:ack'].sequence,null);assert(records['ticket:ack'].observedAt<records['ticket:send'].window.deadline);assert(state.trace.find(v=>v.position==='complete').at<records['ticket:send'].window.deadline);assert(records['ticket:send'].window.deadline-records['ticket:send'].window.startedAt<=5000);
- assert.match(html,/<button type="button" disabled>/);assert.doesNotMatch(html,/<script|<form[^>]+action=/);assert.match(html,/Todavía no diste permiso para avisos/);
- assert.match(response.headers.get('Content-Security-Policy'),/form-action 'none'/);assert.equal(response.headers.get('X-Content-Type-Options'),'nosniff');assert.equal(response.headers.get('Cache-Control'),'no-store');assert.equal(response.headers.get('Referrer-Policy'),'same-origin');assert.match(response.headers.get('Set-Cookie'),/; Path=\/; Secure; HttpOnly; SameSite=Strict; Max-Age=\d+/);
+ assert.match(html,/<form method="post" action="\/monitoring\/grant">/);assert.match(html,/<button type="submit">Permitir avisos temporales<\/button>/);assert.doesNotMatch(html,/<script|disabled|autosubmit/);assert.match(html,/Podés registrar un permiso temporal para avisos/);assert(html.includes(new Date(ticket.permission_expires_at).toISOString()));
+ assert.match(response.headers.get('Content-Security-Policy'),/form-action 'self'/);assert.equal(response.headers.get('X-Content-Type-Options'),'nosniff');assert.equal(response.headers.get('Cache-Control'),'no-store');assert.equal(response.headers.get('Referrer-Policy'),'same-origin');assert.match(response.headers.get('Set-Cookie'),/; Path=\/; Secure; HttpOnly; SameSite=Strict; Max-Age=\d+/);
  assert.equal((await plain(f.stub.sdkReadCurrent())).status,'unavailable');assert.deepEqual(await plain(f.stub.sdkGrant(f.identity.grantId)),f.grant);
  const repeat=await f.mf.dispatchFetch(f.source.origin+'/monitoring',{headers:f.headers});assert.equal(repeat.status,503);await repeat.body?.cancel();assert.deepEqual(await plain(f.stub.noticeInspect()),after);
 }));
 
 async function notice(f,headers=f.headers,options={}){
  return f.mf.dispatchFetch(f.source.origin+'/monitoring',{redirect:'manual',headers,...options});
 }
 async function deny(response){assert.notEqual(response.status,200);assert.doesNotMatch(await response.text(),/<form|name="handle"/);assert.equal(response.headers.get('Set-Cookie'),null);}
 async function ownRows(f){return (await plain(f.stub.snapshot())).filter(([k])=>k.startsWith('afw.finite-preparation-notice.v1:'+f.identity.preconnectionId+':'));}
 async function gate(f,name){
@@ -228,10 +228,38 @@
  assert.fail('actual provider body/cancel gate not reached: '+phase);
 }
 test('GET child expiry retains actual HTTP body and cancel until physical settlement',()=>withIssued(async f=>{
  await f.stub.ioConfigure({hold:'qa-version'});const began=Date.now(),pending=notice(f);await ioGate(f,'body');
  await deny(await pending);assert(Date.now()-began>=4900);assert.deepEqual(await plain(f.stub.noticeProbe()),{allowed:false});
  assert.deepEqual(await ownRows(f),[]);await f.stub.ioRelease('body');const cancelling=await ioGate(f,'cancel');assert.equal(cancelling.active,1);assert.deepEqual(await plain(f.stub.noticeProbe()),{allowed:false});
  await f.stub.ioRelease('cancel');
  for(let n=0;n<100;n++){const state=await plain(f.stub.ioObservation());if(state.active===0&&(await plain(f.stub.noticeProbe())).allowed)return;await new Promise(r=>setTimeout(r,10));}
  assert.fail('actual HTTP body/cancel did not settle in original parent window');
 }));
+
+test('notice GET malformed unrelated cookie denies before reservation',()=>withIssued(async f=>{
+ const before=await plain(f.stub.noticeInspect());
+ for(const suffix of ['; bad:name=x','; ; extra=x']){
+  const response=await notice(f,{...f.headers,Cookie:PREP+suffix});await response.body?.cancel();
+  assert.notEqual(response.status,200);assert.deepEqual(await plain(f.stub.noticeInspect()),before);
+ }
+}));
+test('notice cookie-list accepts token names and legitimate values',async()=>{
+ const {qualifyFiniteOwnerNoticeGetRequest:q}=await import('../lib/mcp-qa-finite-owner-notice-get-wire.mjs');
+ const origin='https://delegated-canary.agentfriendlyweb.dev';
+ for(const cookie of [null,"!#$%&'*+-.^_`|~=x",'a=','a=base64===','a="quoted=="','a=""; b=x','a=x; A=y']){
+  const headers=cookie===null?{}:{Cookie:cookie};assert.equal(q(new Request(origin+'/monitoring',{headers}),new Uint8Array()).method,'GET');
+ }
+});
+test('notice cookie-list rejects malformed list',async()=>{
+ const {qualifyFiniteOwnerNoticeGetRequest:q}=await import('../lib/mcp-qa-finite-owner-notice-get-wire.mjs');
+ const origin='https://delegated-canary.agentfriendlyweb.dev';
+ for(const cookie of ['', '   ','; a=x','a=x;','a=x; ; b=y','bad:name=x','bad/name=x','bad@name=x','bad(name)=x','bad[name]=x','bad,name=x','bad name=x','námé=x','a=x; a=y','a=x,y','a=x\\y','a=has space','bad\x01name=x','a=x\x7fy','a=x\ty; b=1','a=x\r\ny=1','a=é','a="x"y','a="x','a=x"','a=x;b=y','a=x;  b=y','a=x ; b=y','a='+'x'.repeat(8191)]){
+  assert.throws(()=>q(new Request(origin+'/monitoring',{headers:{Cookie:cookie}}),new Uint8Array()),'must reject '+JSON.stringify(cookie));
+ }
+});
+
+test('notice cookie-list bounds assertion and native header envelope',async()=>{
+ const {qualifyFiniteOwnerNoticeGetRequest:q}=await import('../lib/mcp-qa-finite-owner-notice-get-wire.mjs'),origin='https://delegated-canary.agentfriendlyweb.dev';
+ assert.throws(()=>q(new Request(origin+'/monitoring',{headers:{'Cf-Access-Jwt-Assertion':'x'.repeat(8193)}}),new Uint8Array()));
+ assert.throws(()=>q(new Request(origin+'/monitoring',{headers:{'Cf-Access-Jwt-Assertion':'x\r\ny'}}),new Uint8Array()));
+});


diff --git a/lib/mcp-qa-finite-owner-notice-consent-body.mjs b/lib/mcp-qa-finite-owner-notice-consent-body.mjs
--- /dev/null
+++ b/lib/mcp-qa-finite-owner-notice-consent-body.mjs
@@ -0,0 +1,17 @@
+import {retainFiniteOwnerStagePromise as retain} from './mcp-qa-finite-stage-work.mjs';
+import {finiteNativeFailure as fail} from './mcp-qa-finite-owner-native-wire.mjs';
+// Retain actual read and cancellation, including work after the HTTP race fails.
+export async function readFiniteOwnerNoticeConsentBody(message,check,firstFailure){
+ const reader=message.body?.getReader();if(!reader){check();return new Uint8Array();}
+ const chunks=[];let size=0;
+ try{
+  check();
+  for(;;){
+   const {done,value}=await retain(reader.read());check();if(done)break;
+   if(!(value instanceof Uint8Array)||(size+=value.length)>1024)fail(413);
+   chunks.push(value);
+  }
+  const bytes=new Uint8Array(size);let offset=0;for(const chunk of chunks){bytes.set(chunk,offset);offset+=chunk.length;}
+  new TextDecoder('utf-8',{fatal:true}).decode(bytes);check();return bytes;
+ }catch(error){firstFailure(error);try{await retain(reader.cancel());}catch{}throw error;}
+}


diff --git a/test/mcp-qa-finite-owner-notice-consent-native.test.mjs b/test/mcp-qa-finite-owner-notice-consent-native.test.mjs
--- /dev/null
+++ b/test/mcp-qa-finite-owner-notice-consent-native.test.mjs
@@ -0,0 +1,313 @@
+import {initialHash} from '../lib/mcp-qa-finite-initial-material-records.mjs';
+import {saveNoticeObservation} from './fixtures/finite-owner-notice-get.mjs';
+import {qualifyFiniteOwnerNoticeConsentRequest,qualifyFiniteOwnerNoticeGetRequest,finiteOwnerNoticeConsentTarget,readFiniteOwnerNoticeConsentMetadata} from '../lib/mcp-qa-finite-owner-notice-get-wire.mjs';
+import {FINITE_PREPARATION_MONITORING_SCHEMA as SCHEMA} from '../lib/mcp-qa-finite-preparation-issuer-store.mjs';
+import {createHash} from 'node:crypto';
+import {Client,StreamableHTTPClientTransport} from '@modelcontextprotocol/client';
+import test from 'node:test';
+import assert from 'node:assert/strict';
+import {initialEntryHarness} from './fixtures/finite-initial-entry-world.mjs';
+import {seedFiniteOwnerSdkClient} from './fixtures/finite-owner-qa-sdk.mjs';
+const PREP='__Host-afw-finite-prepare='+'a'.repeat(64);
+async function plain(p){const r=await p;try{return JSON.parse(JSON.stringify(r));}finally{r?.[Symbol.dispose]?.();}}
+async function withIssued(fn){
+ const f=await initialEntryHarness('phase-context-sdk-token-notice-get');
+ try{
+  await f.stub.configure('normal');assert.equal((await plain(f.stub.invoke(f.refs))).status,'material_recorded');await f.stub.restoreMethods();
+  f.phaseCurrent=await plain(f.stub.seedPhaseFacts('settled',null));assert.equal(f.phaseCurrent.fixtureError,undefined,JSON.stringify(f.phaseCurrent));
+  const before=await plain(f.stub.sdkReadCurrent());assert.deepEqual(Object.keys(before).sort(),['capsuleHash','preconnectionId','source']);assert.equal(before.source.phase,'read_consent');
+  f.source=before.source;f.token=await f.enrollmentToken(f.source);f.headers={'Cf-Access-Jwt-Assertion':f.token,Cookie:PREP};
+  await seedFiniteOwnerSdkClient(f.mf,f.source);
+  f.verifier='v'.repeat(64);f.challenge=createHash('sha256').update(f.verifier).digest('base64url');
+  const query=new URLSearchParams({client_id:f.source.clientId,redirect_uri:'https://client.example/cb',response_type:'code',resource:f.source.resource,scope:'afw:project:read',state:'SYN-state',code_challenge:f.challenge,code_challenge_method:'S256'});
+  const get=await f.mf.dispatchFetch(f.source.origin+'/authorize?'+query,{redirect:'manual',headers:f.headers});assert.equal(get.status,200);
+  const html=await get.text(),handle=/name="handle" value="([^"]+)"/.exec(html)?.[1];assert(handle);
+  const cookie=get.headers.getSetCookie().map(v=>v.split(';')[0]).join('; ');assert(cookie);
+  const post=await f.mf.dispatchFetch(f.source.origin+'/authorize',{method:'POST',redirect:'manual',headers:{Origin:f.source.origin,'Content-Type':'application/x-www-form-urlencoded',...f.headers,Cookie:PREP+'; '+cookie},body:new URLSearchParams({handle,decision:'approve',scope:'afw:project:read'})});
+  assert.equal(post.status,302);f.code=new URL(post.headers.get('Location')).searchParams.get('code');assert(f.code);await post.body?.cancel();
+  const rows=await plain(f.stub.snapshot()),r=JSON.parse(rows.find(([k])=>k.startsWith('afw.finite-preparation-issuer.v1:')&&k.endsWith(':reservation'))[1]);f.identity=r.identity;
+  f.grant=await plain(f.stub.sdkGrant(f.identity.grantId));assert.equal(f.grant.revoked_at,'');assert.equal(f.grant.exchanged_at,'');
+  assert.equal((await plain(f.stub.sdkReadCurrent())).source.phase,'read_consent');
+  await fn(f);
+ }finally{await f.stub.noticeReleaseHeld().catch(()=>{});await f.stub.ioRelease('all').catch(()=>{});await f.mf.dispose();await f.cleanup();}
+}
+async function actualExchangeMcp(f){
+ const config=await f.mf.dispatchFetch(f.source.origin+'/fixture/token-config',{method:'POST',body:JSON.stringify({clientId:f.source.clientId,projectId:f.source.project.projectId,audience:f.source.access.audience,teamDomain:f.source.access.teamDomain,expiresAt:new Date(f.source.window.expiresAt).toISOString()})});assert.equal(config.status,204);
+ const exchange=await f.mf.dispatchFetch(f.source.origin+'/oauth/token',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({grant_type:'authorization_code',client_id:f.source.clientId,redirect_uri:'https://client.example/cb',resource:f.source.resource,code:f.code,code_verifier:f.verifier})});assert.equal(exchange.status,200);
+ const payload=await exchange.json();assert.equal(typeof payload.access_token,'string');
+ const client=new Client({name:'SYN-notice-native',version:'1.0.0'},{versionNegotiation:{mode:'legacy'}});
+ try{
+  await client.connect(new StreamableHTTPClientTransport(new URL(f.source.resource),{requestInit:{headers:{Authorization:'Bearer '+payload.access_token,Host:new URL(f.source.origin).host}},fetch:(url,options)=>f.mf.dispatchFetch(String(url),options)}));
+  const summary=await client.callTool({name:'read_project_summary',arguments:{}});assert.equal(summary.isError,undefined);assert.equal(summary.structuredContent.data.id,f.identity.projectId);
+ }finally{await client.close();}
+ f.grant=await plain(f.stub.sdkGrant(f.identity.grantId));assert.notEqual(f.grant.exchanged_at,'');
+ const context=await plain(f.stub.sdkReadCurrent());assert.deepEqual(Object.keys(context).sort(),['capsuleHash','preconnectionId','source']);assert.equal(context.source.phase,'read_consent');
+}
+
+async function ticket(f,extra=''){
+ const response=await f.mf.dispatchFetch(f.source.origin+'/monitoring',{headers:{...f.headers,Cookie:PREP+extra},redirect:'manual'});
+ const html=await response.text();assert.equal(response.status,200);const handle=/name="handle" value="([^"]+)"/.exec(html)?.[1];assert(handle);
+ const cookie=response.headers.getSetCookie().map(v=>v.split(';')[0]).join('; ');assert(cookie);
+ f.notice={handle,headers:{...f.headers,Origin:f.source.origin,'Content-Type':'application/x-www-form-urlencoded',Cookie:PREP+'; '+cookie+extra}};
+ return plain(f.stub.noticeInspect());
+}
+const consent=(f,options={})=>f.mf.dispatchFetch(f.source.origin+'/monitoring/grant',{method:'POST',redirect:'manual',headers:f.notice.headers,body:new URLSearchParams({handle:f.notice.handle}),...options});
+test('native consent POST records original decision after actual ticket GET',()=>withIssued(async f=>{
+ await actualExchangeMcp(f);const before=await ticket(f,'; unrelated="valid=="');assert.equal(before.events.length,0);
+ const original=await plain(f.stub.snapshot()),history=(await f.db.prepare('SELECT * FROM dossier_monitoring_consent_events ORDER BY sequence').all()).results;
+ await f.stub.ioConfigure();await f.stub.noticeConfigure();const began=Date.now(),response=await consent(f),html=await response.text();
+ const observation=await plain(f.stub.noticeStateRead()),io=await plain(f.stub.ioObservation()),elapsed=Date.now()-began,after=await plain(f.stub.noticeInspect());
+ await saveNoticeObservation({unit:'consent',elapsed,...observation.state,io});
+ console.info('CONSENT native principal costs',JSON.stringify({elapsed,pairs:io.snapshots/2,rechecks:observation.state.trace.filter(v=>v.stage==='after').length,accessVerifications:observation.state.accessVerifications??0,sqlSessions:observation.state.sql.length,first:observation.state.sql.flatMap(s=>s.queries).filter(q=>q.method==='first').length,all:observation.state.sql.flatMap(s=>s.queries).filter(q=>q.method==='all').length,ops:observation.state.ops,noticeLists:observation.state.lists.filter(v=>v.prefix.startsWith('afw.finite-preparation-notice')).length,http:{snapshots:io.snapshots,requests:io.rows.length,peak:io.peak,active:io.active}}));
+ assert(elapsed<30000);assert.equal(io.peak,2);assert.equal(io.active,0);
+ assert.equal(observation.state.trace.filter(v=>v.stage==='after').length,5);assert.equal(observation.state.accessVerifications,2);
+ const rowsAfter=await plain(f.stub.snapshot());for(const row of original)assert.deepEqual(rowsAfter.find(([k])=>k===row[0]),row);
+ const historyAfter=(await f.db.prepare('SELECT * FROM dossier_monitoring_consent_events ORDER BY sequence').all()).results;
+ for(const row of history)assert.deepEqual(historyAfter.find(v=>v.sequence===row.sequence),row);
+
+ assert.equal(response.status,200,'fixed POST reached after native ticket; events='+after.events.length);
+ assert.equal(after.events.length,1);assert.equal(after.notice.length,5);assert.match(html,/Registré tu decisión temporal/);
+ assert.deepEqual(after.tickets,before.tickets);assert.deepEqual(await plain(f.stub.sdkGrant(f.identity.grantId)),f.grant);
+ const record=suffix=>JSON.parse(after.notice.find(([k])=>k.endsWith(suffix))[1]),r=record(':reservation'),send=record('consent:send'),ack=record('consent:ack'),row=after.events[0],i=f.identity;
+ assert.deepEqual(row,{sequence:row.sequence,grant_id:i.grantId,project_id:i.projectId,user_id:i.subject,client_id:i.clientId,resource:i.resource,revision:i.projectRevision,action:'grant',purpose:'afw.dossier-monitoring.v1',request_id:r.ticket.requestId,issued_at:row.issued_at,expires_at:r.ticket.permissionExpiresAt});
+ assert(Number.isSafeInteger(row.sequence)&&row.sequence>0);assert(row.issued_at>=send.issuedAt);assert(row.issued_at<send.window.deadline);assert.equal(ack.sequence,row.sequence);assert.equal(ack.rowHash,initialHash('afw.finite-preparation-notice-row.v1',row));assert.equal(ack.sendHash,send.recordHash);
+ console.info('CONSENT native original window',JSON.stringify({childElapsed:observation.state.trace.find(v=>v.position==='complete').at-send.window.startedAt,windowMs:send.window.deadline-send.window.startedAt,parentElapsed:elapsed}));assert(send.window.deadline-send.window.startedAt<=5000);assert(observation.state.trace.find(v=>v.position==='complete').at<send.window.deadline);
+ assert.equal((await plain(f.stub.sdkReadCurrent())).status,'unavailable');
+ for(const path of ['/monitoring','/authorize']){
+  const response=await f.mf.dispatchFetch(f.source.origin+path,{headers:f.headers});assert.notEqual(response.status,200);await response.body?.cancel();
+ }
+ assert.equal(response.headers.get('Cache-Control'),'no-store');assert.equal(response.headers.get('X-Content-Type-Options'),'nosniff');assert.equal(response.headers.get('Referrer-Policy'),'same-origin');assert.match(response.headers.get('Content-Security-Policy'),/form-action 'none'/);
+ assert.doesNotMatch(html,/<form|<script|retirar|revisar/i);assert.match(html,new RegExp(new Date(r.ticket.permissionExpiresAt).toISOString().replaceAll('.','\\.')));
+ const repeat=await consent(f);assert.notEqual(repeat.status,200);await repeat.body?.cancel();assert.deepEqual(await plain(f.stub.noticeInspect()),after);
+}));
+test('native consent malformed unrelated cookie denies before SEND',()=>withIssued(async f=>{
+ const before=await ticket(f);
+ for(const suffix of ['; bad:name=x','; ; extra=x']){
+  const response=await consent(f,{headers:{...f.notice.headers,Cookie:f.notice.headers.Cookie+suffix}});await response.body?.cancel();
+  assert.notEqual(response.status,200);assert.deepEqual(await plain(f.stub.noticeInspect()),before);
+ }
+}));
+
+async function denied(f,response,before){
+ assert.notEqual(response.status,200);const text=await response.text();assert.doesNotMatch(text,/Registré tu decisión|<form/);assert.equal(response.headers.get('Set-Cookie'),null);
+ if(before)assert.deepEqual(await plain(f.stub.noticeInspect()),before);
+}
+async function gate(f,name){
+ for(let n=0;n<500;n++){const state=await plain(f.stub.noticeStateRead());if(state.held===name)return state;await new Promise(r=>setTimeout(r,10));}
+ assert.fail('SYN actual consent gate not reached: '+name);
+}
+test('native consent preserves global sequence across another grant history',()=>withIssued(async f=>{
+ const at=Date.now(),foreign='ffffffff-ffff-4fff-8fff-ffffffffffff';
+ await f.db.prepare('INSERT INTO dossier_monitoring_consent_events (grant_id,project_id,user_id,client_id,resource,revision,action,purpose,request_id,issued_at,expires_at) VALUES (?,?,?,?,?,?,?,?,?,?,?)').bind(foreign,'SYN-other','SYN-other','SYN-other','https://foreign.invalid/mcp',1,'grant','afw.dossier-monitoring.v1',foreign,at,at+60000).run();
+ const history=(await f.db.prepare('SELECT * FROM dossier_monitoring_consent_events ORDER BY sequence').all()).results,before=await ticket(f);
+ const response=await consent(f);assert.equal(response.status,200);await response.body?.cancel();
+ const after=await plain(f.stub.noticeInspect());assert(after.events[0].sequence>1);assert.equal(before.tickets[0].expected_sequence,0);
+ const now=(await f.db.prepare('SELECT * FROM dossier_monitoring_consent_events ORDER BY sequence').all()).results;for(const row of history)assert.deepEqual(now.find(v=>v.sequence===row.sequence),row);
+}));
+test('native consent grammar denies untrusted request corpus',()=>withIssued(async f=>{
+ const before=await ticket(f),h=f.notice.headers,value='handle='+f.notice.handle;
+ const cases=[
+ ['method GET',()=>f.mf.dispatchFetch(f.source.origin+'/monitoring/grant',{headers:h})],
+ ['path revoke',()=>f.mf.dispatchFetch(f.source.origin+'/monitoring/revoke',{method:'POST',headers:h,body:value})],
+ ['query',()=>f.mf.dispatchFetch(f.source.origin+'/monitoring/grant?x=1',{method:'POST',headers:h,body:value})],
+ ['wrong Origin',()=>consent(f,{headers:{...h,Origin:'https://wrong.invalid'}})],
+ ['missing Origin',()=>{const headers={...h};delete headers.Origin;return consent(f,{headers});}],
+ ['extra handle',()=>consent(f,{body:value+'&action=grant'})],
+ ['duplicate handle',()=>consent(f,{body:value+'&'+value})],
+ ['malformed percent',()=>consent(f,{body:'handle=%QZ'})],
+ ['malformed UTF8',()=>consent(f,{body:new Uint8Array([0xff])})],
+ ['MIME parameter',()=>consent(f,{headers:{...h,'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}})],
+ ['1025 bytes',()=>consent(f,{body:'a'.repeat(1025)})],
+ ['duplicate cookie',()=>consent(f,{headers:{...h,Cookie:h.Cookie+'; '+h.Cookie.split('; ')[1]}})],
+ ['bad cookie hash',()=>consent(f,{headers:{...h,Cookie:PREP+'; __Host-afw-monitoring-owner='+'b'.repeat(43)}})],
+ ['missing prepare',()=>consent(f,{headers:{...h,Cookie:h.Cookie.split('; ')[1]}})],
+ ['prepare mismatch',()=>consent(f,{headers:{...h,Cookie:h.Cookie.replace('a'.repeat(64),'b'.repeat(64))}})],
+ ['quoted own cookie',()=>consent(f,{headers:{...h,Cookie:PREP+'; __Host-afw-monitoring-owner="'+f.notice.handle+'"'}})]
+ ];
+ for(const [kind,call]of cases){await denied(f,await call(),before);assert.equal((await plain(f.stub.noticeInspect())).events.length,0,kind);}
+}));
+test('native consent verified identity denies current signed identity corpus',()=>withIssued(async f=>{
+ const before=await ticket(f),h=f.notice.headers,parts=f.token.split('.');parts[2]=(parts[2][0]==='a'?'b':'a')+parts[2].slice(1);
+ const tokens=[
+ ['invalid signature',parts.join('.')],
+ ['wrong realm',await f.noticeToken({issuer:'https://wrong.invalid'})],
+ ['wrong audience',await f.noticeToken({audience:'SYN-other'})],
+ ['other subject',await f.noticeToken({subject:'SYN-other'})],
+ ['expired Access',await f.noticeToken({expiresAt:Math.floor(Date.now()/1000)-1})],
+ ['AccessPOST shorter than original ticket',await f.noticeToken({expiresAt:Math.floor(Date.now()/1000)+30})]
+ ];
+ for(const [kind,token]of tokens){await denied(f,await consent(f,{headers:{...h,'Cf-Access-Jwt-Assertion':token}}),before);assert.equal((await plain(f.stub.noticeInspect())).events.length,0,kind);}
+}));
+test('native consent own SQL continuation alone accepts pending SEND',()=>withIssued(async f=>{
+ await ticket(f);await f.stub.noticeConfigure('hold-before');const pending=consent(f);await gate(f,'before-sql');
+ const before=await plain(f.stub.noticeInspect());assert.equal(before.notice.length,4);assert.equal(before.events.length,0);assert(!before.notice.some(([k])=>k.endsWith('consent:ack')));
+ assert.equal((await plain(f.stub.sdkReadCurrent())).status,'unavailable');await denied(f,await consent(f),before);
+ await f.stub.noticeReleaseHeld();const response=await pending;assert.equal(response.status,200);await response.body?.cancel();
+ const after=await plain(f.stub.noticeInspect());assert.equal(after.events.length,1);assert.equal(after.notice.length,5);
+}));
+test('native consent lost native result never reconstructs ACK',()=>withIssued(async f=>{
+ await ticket(f);await f.stub.noticeConfigure('lost-sql');await denied(f,await consent(f));
+ const before=await plain(f.stub.noticeInspect());assert.equal(before.events.length,1);assert.equal(before.notice.length,4);assert(!before.notice.some(([k])=>k.endsWith('consent:ack')));
+ await f.stub.noticeConfigure();await denied(f,await consent(f),before);assert.equal((await plain(f.stub.sdkReadCurrent())).status,'unavailable');
+}));
+for(const mode of ['lost-send','lost-ack'])test('native consent journal uncertainty never authorizes next effect '+mode,()=>withIssued(async f=>{
+ await ticket(f);await f.stub.noticeConfigure(mode);await denied(f,await consent(f));
+ const before=await plain(f.stub.noticeInspect());assert.equal(before.events.length,mode==='lost-send'?0:1);assert.equal(before.notice.length,mode==='lost-send'?4:5);
+ await f.stub.noticeConfigure();await denied(f,await consent(f),before);
+}));
+test('native consent original window fences queued SQL',()=>withIssued(async f=>{
+ await ticket(f);await f.stub.noticeConfigure('queue');const pending=consent(f),seen=await gate(f,'before-sql');assert(seen.state.sqlEnteredAt);
+ await new Promise(resolve=>setTimeout(resolve,5100));await denied(f,await pending);assert.equal((await plain(f.stub.noticeProbe())).allowed,false,'actual operation remains retained');
+ await f.stub.noticeReleaseHeld();const after=await plain(f.stub.noticeInspect());assert.equal(after.events.length,0);assert.equal(after.notice.length,4);
+}));
+for(const [mode,drift]of [['before-send','revision'],['before-send','owner'],['before-send','pointer'],['before-insert','revision'],['before-insert','holder']])test('native consent source current drift denies '+mode+' '+drift,()=>withIssued(async f=>{
+ await ticket(f);await f.stub.noticeConfigure(mode);const pending=consent(f);await gate(f,mode==='before-send'?'before-send':'before-insert');
+ if(drift==='revision')await f.db.prepare('UPDATE site_projects SET revision=revision+1 WHERE id=?').bind(f.identity.projectId).run();
+ if(drift==='owner')await f.db.prepare("UPDATE site_projects SET user_id='SYN NEGATIVE owner' WHERE id=?").bind(f.identity.projectId).run();
+ if(drift==='pointer')f.phaseCurrent.receipt.deploymentId='99999999-9999-4999-8999-999999999999';
+ if(drift==='holder')await f.stub.sdkReplaceHolder();
+ await f.stub.noticeReleaseHeld();await denied(f,await pending);
+ const after=await plain(f.stub.noticeInspect());assert.equal(after.events.length,0);assert.equal(after.notice.length,mode==='before-send'?3:4);
+}));
+for(const drift of ['exchange','event'])test('native consent second snapshot drift denies '+drift,()=>withIssued(async f=>{
+ await ticket(f);await f.stub.noticeConfigure('consent-drift');const pending=consent(f);await gate(f,'between-own');
+ if(drift==='exchange'){const value=new Date(Math.max(Date.parse(f.grant.created_at),Date.now()-1)).toISOString();await f.db.prepare('UPDATE delegated_access_grants SET exchanged_at=? WHERE id=?').bind(value,f.identity.grantId).run();}
+ else{
+  // SYN destructive immutable row corruption, never a legitimate transition.
+  await f.db.prepare('DROP TRIGGER dossier_monitoring_no_update').run();
+  await f.db.prepare("UPDATE dossier_monitoring_consent_events SET request_id='eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee' WHERE grant_id=?").bind(f.identity.grantId).run();
+  await f.db.prepare(SCHEMA.find(sql=>sql.includes('dossier_monitoring_no_update'))).run();
+ }
+ await f.stub.noticeReleaseHeld();await denied(f,await pending);
+ const after=await plain(f.stub.noticeInspect());assert.equal(after.events.length,1);assert.equal(after.notice.length,4);
+}));
+for(const fault of ['own-unknown','overflow','freeze','row-hash'])test('native consent history closes replay '+fault,()=>withIssued(async f=>{
+ const before=await ticket(f);await f.stub.noticeCorrupt(fault);await denied(f,await consent(f));
+ const after=await plain(f.stub.noticeInspect());assert.equal(after.events.length,0);assert.deepEqual(after.tickets,before.tickets);assert(!after.notice.some(([k])=>k.endsWith('consent:send')));
+}));
+test('native consent withdrawal preserves history CLOSE before native SQL',()=>withIssued(async f=>{
+ await ticket(f);await f.stub.noticeConfigure('hold-before');const pending=consent(f);await gate(f,'before-sql');
+ assert.equal((await plain(f.stub.noticeFence())).status,'fenced');await f.stub.noticeReleaseHeld();await denied(f,await pending);
+ assert.deepEqual(await plain(f.stub.sdkGrant(f.identity.grantId)),f.grant);assert.equal((await plain(f.stub.noticeInspect())).events.length,0);
+}));
+test('native consent withdrawal preserves history real revokeGrant',()=>withIssued(async f=>{
+ await ticket(f);const response=await consent(f);assert.equal(response.status,200);await response.body?.cancel();const before=await plain(f.stub.noticeInspect());
+ const reduction=await plain(f.stub.sdkReduceOriginal());assert.equal(reduction.reduction,'revoked');assert.notEqual((await plain(f.stub.sdkGrant(f.identity.grantId))).revoked_at,'');
+ await denied(f,await consent(f),before);assert.equal((await plain(f.stub.sdkReadCurrent())).status,'unavailable');
+}));
+test('native consent captured failure cannot resume commit',()=>withIssued(async f=>{
+ await ticket(f);await f.stub.noticeConfigure('hold-after');const pending=consent(f);await gate(f,'after-sql');await f.stub.sdkReplaceHolder();
+ await f.stub.noticeReleaseHeld();await denied(f,await pending);const after=await plain(f.stub.noticeInspect());assert.equal(after.events.length,1);assert.equal(after.notice.length,4);
+}));
+test('notice cookie-list accepts token names and legitimate values POST',()=>{
+ const origin='https://delegated-canary.agentfriendlyweb.dev',bytes=new TextEncoder().encode('handle='+'a'.repeat(43));
+ assert.equal(finiteOwnerNoticeConsentTarget,'https://afw-private.invalid/_finite-owner/monitoring/grant');
+ for(const cookie of ["!#$%&'*+-.^_\x60|~=x",'a=','a=base64===','a="quoted=="','a=""; b=x','a=x; A=y']){
+  const request=new Request(origin+'/monitoring/grant',{method:'POST',headers:{Origin:origin,'Content-Type':'application/x-www-form-urlencoded',Cookie:cookie}});
+  assert.equal(qualifyFiniteOwnerNoticeConsentRequest(request,bytes).handle,'a'.repeat(43));
+ }
+});
+test('notice cookie-list rejects malformed list POST',()=>{
+ const origin='https://delegated-canary.agentfriendlyweb.dev',bytes=new TextEncoder().encode('handle='+'a'.repeat(43));
+ for(const cookie of ['', '   ','; a=x','a=x;','a=x; ; b=y','bad:name=x','bad/name=x','bad@name=x','bad(name)=x','bad[name]=x','bad,name=x','bad name=x','námé=x','a=x; a=y','a=x,y','a=x\\y','a=has space','bad\x01name=x','a=x\x7fy','a=x\ty; b=1','a=x\r\ny=1','a=é','a="x"y','a="x','a=x"','a=x;b=y','a=x;  b=y','a=x ; b=y','a='+'x'.repeat(8191)]){
+  assert.throws(()=>qualifyFiniteOwnerNoticeConsentRequest(new Request(origin+'/monitoring/grant',{method:'POST',headers:{Origin:origin,'Content-Type':'application/x-www-form-urlencoded',Cookie:cookie}}),bytes),JSON.stringify(cookie));
+ }
+});
+
+for(const kind of ['source-revision','issuer-reservation','original-grant-ack','grant-link','connection','ticket-request','event-sequence'])test('native consent correlated DATA denies '+kind,()=>withIssued(async f=>{
+ const before=await ticket(f);if(kind==='event-sequence'){const r=await consent(f);assert.equal(r.status,200);await r.body?.cancel();}
+ const original=await plain(f.stub.snapshot()),sqlBefore=await plain(f.stub.noticeInspect());await f.stub.noticeConfigure();
+ assert.deepEqual(await plain(f.stub.noticeCorrelated(kind)),{codecRoundtrip:true,journalValid:true});
+ await denied(f,await consent(f));
+ const after=await plain(f.stub.noticeInspect());assert.deepEqual(after.tickets,before.tickets);assert.deepEqual(after.events,sqlBefore.events);
+ const expected=kind==='ticket-request'?'noticePrimary301':kind==='event-sequence'?'noticeConsentEventAck':'noticePrimary296',state=(await plain(f.stub.noticeStateRead())).state;
+ const correlators=state.trace.filter(v=>v.correlator);assert(correlators.some(v=>v.correlator===expected&&v.phase==='enter'),JSON.stringify(correlators));assert(!correlators.some(v=>v.correlator===expected&&v.phase==='exit'),JSON.stringify(correlators));
+ for(const earlier of expected==='noticePrimary301'?['noticePrimary296']:expected==='noticeConsentEventAck'?['noticePrimary296','noticePrimary301']:[])assert(correlators.some(v=>v.correlator===earlier&&v.phase==='exit'));
+ assert.equal(state.sql.flatMap(s=>s.queries).filter(q=>q.sql.includes('INSERT INTO dossier_monitoring_consent_events')).length,0);
+ const finalRows=await plain(f.stub.snapshot());for(const row of original.filter(([k])=>!k.startsWith('afw.finite-preparation-notice.v1:')))assert.deepEqual(finalRows.find(([k])=>k===row[0]),row);
+}));
+for(const where of ['M','QA'])test('native consent failed body retains actual cancellation '+where,()=>withIssued(async f=>{
+ const before=await ticket(f);let state;
+ if(where==='QA')state=await plain(f.stub.noticeBodyStart(f.notice.headers));
+ else{const r=await f.mf.dispatchFetch(f.source.origin+'/fixture/consent-body-start',{method:'POST',headers:f.notice.headers});state=await r.json();}
+ assert.notEqual(state.response,200);assert.equal(state.cancelEntered,true);assert.equal(state.cancelSettled,false);
+ assert.deepEqual(await plain(f.stub.noticeInspect()),before);
+ const probe=async()=>where==='QA'?plain(f.stub.noticeProbe()):(await f.mf.dispatchFetch(f.source.origin+'/fixture/consent-body-probe')).json();
+ assert.equal((await probe()).allowed,false,'new live root denied by actual pending cancellation');
+ if(where==='QA')await f.stub.noticeBodyReleaseHeld();else await (await f.mf.dispatchFetch(f.source.origin+'/fixture/consent-body-release')).body?.cancel();
+ for(let n=0;n<100;n++){if((await probe()).allowed){if(where==='M'){const actual=await (await f.mf.dispatchFetch(f.source.origin+'/fixture/consent-body-state')).json();for(const key of ['readNativeEntered','readNativeSettled','cancelNativeEntered','cancelNativeSettled','bodyFinally','bodyPromiseEntered','bodyPromiseRejected','actualCallbackFinally','outerFinally'])assert.equal(actual[key],true,key);for(const key of ['cancelNativeRejected','readNativeRejected','bodyPromiseSettled'])assert.notEqual(actual[key],true,key);}return;}await new Promise(r=>setTimeout(r,10));}const finalState=where==='QA'?await plain(f.stub.noticeBodyRead()):await (await f.mf.dispatchFetch(f.source.origin+'/fixture/consent-body-state')).json();assert.fail('actual body cancellation not settled '+JSON.stringify({probe:await probe(),state:finalState}));
+}));
+test('native consent abort retains SQL and forbids late ACK',()=>withIssued(async f=>{
+ await ticket(f);await f.stub.noticeConfigure('hold-after');const pending=consent(f);await gate(f,'after-sql');
+ const abort=await f.mf.dispatchFetch(f.source.origin+'/fixture/consent-abort');assert.equal(abort.status,204);await abort.body?.cancel();
+ await denied(f,await pending);assert.equal((await plain(f.stub.noticeProbe())).allowed,false);await f.stub.noticeReleaseHeld();
+ for(let n=0;n<100;n++){if((await plain(f.stub.noticeProbe())).allowed)break;await new Promise(r=>setTimeout(r,10));}
+ const after=await plain(f.stub.noticeInspect());assert.equal(after.events.length,1);assert.equal(after.notice.length,4);assert(!after.notice.some(([k])=>k.endsWith('consent:ack')));
+}));
+test('pure fixed POST metadata and original grammar remain exact',()=>{
+ const origin='https://delegated-canary.agentfriendlyweb.dev';
+ assert.equal(qualifyFiniteOwnerNoticeGetRequest(new Request(origin+'/monitoring'),new Uint8Array()).method,'GET');
+ const h=new Headers({'x-afw-finite-boundary':'{"startedAt":1,"deadline":30001,"remainingMs":30000}','x-afw-finite-original-method':'POST','x-afw-finite-original-url':origin+'/monitoring/grant','x-afw-finite-version':'77777777-7777-4777-8777-777777777777','x-afw-finite-request-id':'77777777-7777-4777-8777-777777777777'});
+ assert.equal(readFiniteOwnerNoticeConsentMetadata(h).method,'POST');h.set('x-afw-finite-original-method','GET');assert.throws(()=>readFiniteOwnerNoticeConsentMetadata(h));
+});
+
+for(const kind of ['absent','partial','failed-schema-metadata','malformed-schema-results'])test('native consent history closes replay schema '+kind,()=>withIssued(async f=>{
+ const before=await ticket(f);await f.stub.noticeConfigure(kind);
+ if(kind==='absent'){await f.db.prepare('DROP TABLE dossier_monitoring_owner_tickets').run();await f.db.prepare('DROP TABLE dossier_monitoring_consent_events').run();}
+ if(kind==='partial')await f.db.prepare('DROP INDEX dossier_monitoring_consent_grant_sequence').run();
+ await denied(f,await consent(f));
+ const state=(await plain(f.stub.noticeStateRead())).state;assert.equal(state.sql.flatMap(s=>s.queries).filter(q=>q.sql.includes('INSERT INTO dossier_monitoring_consent_events')).length,0);
+ const rows=(await plain(f.stub.snapshot())).filter(([k])=>k.startsWith('afw.finite-preparation-notice.v1:'));assert.deepEqual(rows,before.notice);
+}));
+test('native consent history closes replay event without SEND',()=>withIssued(async f=>{
+ const before=await ticket(f),i=f.identity,at=Date.now(),r=JSON.parse(before.notice.find(([k])=>k.endsWith(':reservation'))[1]);
+ await f.db.prepare('INSERT INTO dossier_monitoring_consent_events (grant_id,project_id,user_id,client_id,resource,revision,action,purpose,request_id,issued_at,expires_at) VALUES (?,?,?,?,?,?,?,?,?,?,?)').bind(i.grantId,i.projectId,i.subject,i.clientId,i.resource,i.projectRevision,'grant','afw.dossier-monitoring.v1',r.ticket.requestId,at,r.ticket.permissionExpiresAt).run();
+ const corrupted=await plain(f.stub.noticeInspect());await denied(f,await consent(f),corrupted);assert.equal(corrupted.notice.length,3);assert.equal(corrupted.events.length,1);
+}));
+test('native consent withdrawal preserves history ordinary append-only withdrawal',()=>withIssued(async f=>{
+ await ticket(f);const response=await consent(f);assert.equal(response.status,200);await response.body?.cancel();
+ const before=await plain(f.stub.noticeInspect());assert.deepEqual(await plain(f.stub.noticeOrdinaryRead()),{enabled:true});const withdrawn=await plain(f.stub.noticeOrdinaryWithdraw());assert.equal(withdrawn.status,200);assert.equal(withdrawn.action,'revoke');
+ const after=await plain(f.stub.noticeInspect());assert.equal(after.events.length,2);assert.deepEqual(after.events[0],before.events[0]);assert.deepEqual(after.tickets,before.tickets);assert.deepEqual(after.notice,before.notice);assert.deepEqual(await plain(f.stub.noticeOrdinaryRead()),{enabled:false});
+ await denied(f,await consent(f),after);assert.deepEqual(await plain(f.stub.sdkGrant(f.identity.grantId)),f.grant);
+}));
+test('native consent withdrawal preserves history revokeGrant before queued SQL',()=>withIssued(async f=>{
+ await ticket(f);await f.stub.noticeConfigure('hold-before');const pending=consent(f);await gate(f,'before-sql');
+ const reduced=await plain(f.stub.sdkReduceOriginal());assert.equal(reduced.reduction,'revoked');await f.stub.noticeReleaseHeld();await denied(f,await pending);
+ const after=await plain(f.stub.noticeInspect());assert.equal(after.events.length,0);assert.equal(after.notice.length,4);assert.deepEqual(await plain(f.stub.noticeOrdinaryRead()),{unavailable:true,message:'Monitoring authorization unavailable'});
+}));
+
+for(const where of ['M','QA'])test('native consent failed body retains actual cancellation held read '+where,()=>withIssued(async f=>{
+ const before=await ticket(f);
+ const read=async()=>where==='QA'?plain(f.stub.noticeBodyRead()):(await f.mf.dispatchFetch(f.source.origin+'/fixture/consent-body-state')).json();
+ const probe=async()=>where==='QA'?plain(f.stub.noticeProbe()):(await f.mf.dispatchFetch(f.source.origin+'/fixture/consent-body-probe')).json();
+ const pending=where==='QA'?plain(f.stub.noticeBodyStart(f.notice.headers,'read')):f.mf.dispatchFetch(f.source.origin+'/fixture/consent-body-read-start',{method:'POST',headers:f.notice.headers}).then(r=>r.json());
+ const until=async predicate=>{for(let n=0;n<200;n++){const state=await read();if(predicate(state))return state;await new Promise(r=>setTimeout(r,10));}assert.fail('native held body state not reached '+JSON.stringify({state:await read(),probe:await probe()}));};
+ await until(s=>s.readEntered);
+ if(where==='QA')await f.stub.noticeBodyAbortHeld();else await (await f.mf.dispatchFetch(f.source.origin+'/fixture/consent-abort')).body?.cancel();
+ const failed=await pending;assert.notEqual(failed.response,200);assert.equal(failed.readSettled,false);assert.equal((await probe()).allowed,false);
+ if(where==='QA')await f.stub.noticeBodyReleaseRead();else await (await f.mf.dispatchFetch(f.source.origin+'/fixture/consent-body-release-read')).body?.cancel();
+ const cancelling=await until(s=>s.cancelEntered);assert.equal(cancelling.readSettled,true);assert.equal(cancelling.cancelSettled,false);assert.equal((await probe()).allowed,false);
+ if(where==='QA')await f.stub.noticeBodyReleaseHeld();else await (await f.mf.dispatchFetch(f.source.origin+'/fixture/consent-body-release')).body?.cancel();
+ for(let n=0;n<100;n++){if((await probe()).allowed){if(where==='M'){const actual=await read();for(const key of ['readNativeEntered','readNativeSettled','cancelNativeEntered','cancelNativeSettled','bodyFinally','bodyPromiseEntered','bodyPromiseRejected','actualCallbackFinally','outerFinally'])assert.equal(actual[key],true,key);for(const key of ['cancelNativeRejected','readNativeRejected','bodyPromiseSettled'])assert.notEqual(actual[key],true,key);}assert.deepEqual(await plain(f.stub.noticeInspect()),before);return;}await new Promise(r=>setTimeout(r,10));}assert.fail('actual held read/cancel scope not released');
+}));
+for(const drift of ['owner','revision','pointer'])test('native consent source current drift denies after-SEND before recheck '+drift,()=>withIssued(async f=>{
+ await ticket(f);await f.stub.noticeConfigure('after-send');const pending=consent(f);await gate(f,'after-send');
+ if(drift==='owner')await f.db.prepare("UPDATE site_projects SET user_id='SYN NEGATIVE owner' WHERE id=?").bind(f.identity.projectId).run();
+ if(drift==='revision')await f.db.prepare('UPDATE site_projects SET revision=revision+1 WHERE id=?').bind(f.identity.projectId).run();
+ if(drift==='pointer')f.phaseCurrent.receipt.deploymentId='99999999-9999-4999-8999-999999999999';
+ await f.stub.noticeReleaseHeld();await denied(f,await pending);
+ const after=await plain(f.stub.noticeInspect());assert.equal(after.events.length,0);assert.equal(after.notice.length,4);
+ const state=(await plain(f.stub.noticeStateRead())).state;assert.equal(state.sql.flatMap(s=>s.queries).filter(q=>q.sql.includes('INSERT INTO dossier_monitoring_consent_events')).length,0);
+}));
+
+test('native consent lost native result never reconstructs ACK after actual actor restart',()=>withIssued(async f=>{
+ await ticket(f);await f.stub.noticeConfigure('lost-sql');await denied(f,await consent(f));
+ const before=await plain(f.stub.noticeInspect());assert.equal(before.events.length,1);assert.equal(before.notice.length,4);
+ const originalInstance=await f.stub.noticeInstanceRead();await assert.rejects(async()=>{await f.stub.noticeRestart();});
+ const bindings=await f.mf.getBindings('qa-sdk');f.stub=bindings.AFW_INDEPENDENT_CLOSURE.get(bindings.AFW_INDEPENDENT_CLOSURE.idFromName('afw-own-successor-closure-v1'));
+ assert.notEqual(await f.stub.noticeInstanceRead(),originalInstance,'actual actor instance changed after native abort');
+ assert.deepEqual(await plain(f.stub.noticeInspect()),before);await f.stub.noticeConfigure();
+ await denied(f,await consent(f),before);const state=(await plain(f.stub.noticeStateRead())).state;
+ assert.equal(state.sql.flatMap(s=>s.queries).filter(q=>q.sql.includes('INSERT INTO dossier_monitoring_consent_events')).length,0);
+ assert(!before.notice.some(([k])=>k.endsWith('consent:ack')));
+}));


diff --git a/docs/superpowers/reports/2026-11-05-finite-native-notice-consent.md b/docs/superpowers/reports/2026-11-05-finite-native-notice-consent.md
--- /dev/null
+++ b/docs/superpowers/reports/2026-11-05-finite-native-notice-consent.md
@@ -0,0 +1,344 @@
+# POST humano nativo de avisos — informe SOURCE
+
+2026-11-05. Estado del writer: DONE, pendiente de revisión independiente root. PROJECT=AFW; REPOSITORY=tokenizartinfo-ops/agent-friendly-web, público, id1347578006; ENVIRONMENT=GitHub SOURCE/Actions SYN; ORIGIN=GitHub API; RESOURCE_TYPE=rama aislada; RESOURCE_ID=feat/finite-native-cleanup-20261101; ALLOWED_ACTION=única tarea coherente de POST+correlación+formulario fuente, mapa10+informe+qualifier temporal. Sin siguiente unidad.
+
+operationalReadiness=false; completePackage=false; PCoff=false. El formulario está activo únicamente en código UNMOUNTED. No se montó ruta ni se activó runtime, hosting, avisos, suscripción, entrega, permiso de persona real, NoticeLink o etapa nueva.
+
+## Revisiones y trazabilidad
+
+- BASE ejecución: 2f96acb45ec5477d559f85070aa438d2e2e00822; árbol ce6242321aa5177f5828ec592a7bb00d6d6cd91a.
+- Brief READ FIRST: docs/superpowers/briefs/2026-11-05-finite-native-notice-consent.md, blob79286bc31fd525b9efac3cd9ccf837bd6a38bfdb; preflight b7a66fd62909b62595b55b22834635176b3956da; ledger dfe2564ed8d31cd918904c06023ad7a0db294ec3. Los encabezados INACTIVE históricos cedieron sólo ante despacho root exacto BASE.
+- Prerrequisito GET aceptado f68797ca0ad083aa4e90be87c83b5f60f2aa691b/códigoe71; no se reimplementaron store, journal, D04 o fanout.
+- Primer código POST: 87c8430d82df08b4eea59e6296c9a05b80009250. Hasta el cierre sólo cambió producto una vez más: HTML literal GET+CSP form-action self en e153, sin alterar lógica de permiso.
+- qualified code HEAD: e1537bf403944ae4f79c04818db1932a3189d78c; árbol 15f7bfa4877c3068b7088defde4b413b52c6b955.
+- codeHEAD sin qualifier: 1199dc920b9d4d280a5d22e4d1bf8cb932db4d35; árbol 1dc466afc87f3cb6233136c5785f8c4fb82c28cc. CAS y lectura de ref confirmados. Comparación e153→1199 contiene exclusivamente eliminación del qualifier.
+- reportHEAD/árbol/blob del informe: identificados por la respuesta API del commit que agrega este archivo y lectura final de ref, entregados en handoff root. No se inserta un hash autorreferente dentro de su propio blob.
+- Rollback limitado a commits propios con expected-head CAS. Ningún rollback runtime/DDL/historia se ejecutó. Rama main/merge/PR/provider/aliases/Entry/permissions/cron/Containers/Max/ARM intactos.
+
+## Resultado técnico comprobado
+
+El POST fijo verifica Request real, Origin exacto, MIME exacto, cuerpo UTF8 fatal1..1024, único handle43 y cookies propias sin normalización. Obtiene baseline privada de dos snapshots completos con ticket GET nativo ACK y event0, valida Access RS256/iss/aud/sub/exp del payload firmado y aprobación/prepare/owner/issuer/ConnectionRef actuales; verifica el mismo JWT otra vez tras observe/recheck antes de SEND. No hay verifier/keySet/now, identityDTO, callback aprobador ni factory de source inyectables.
+
+Una instancia nativa store, un witness real de observeMonitoringTicket, la misma child/Common/window y ticket original recorren observe→SEND recorded→INSERT RETURNING real→ACK recorded. Promise SQL, resultado, settled y ownSend son referencias léxicas distintas de las Promises de append, conservadas hasta el último recheck. SEND existing/uncertain, no_mutation, pérdida del resultado, error/abort o failure latch impiden ACK/éxito/retry; no se reconstruye una decisión desde filas o hashes.
+
+La EventRow12 valida todos los campos/tipos y tiempos, hash completo y sequence AUTOINCREMENT real >0 sin expectedSequence+1 ni MAX global. TicketRow14 y expected_sequence0 quedan intactos. Historia ajena eleva la secuencia y permanece exacta. Grant.exchanged_at actual se conserva en cada frame; sólo la comprobación histórica del ACK issuer usa la proyección D04 ya aceptada.
+
+Los lectores públicos3keys/OAuth siguen exigiendo inventario notice vacío. La continuación GET tolera exclusivamente sus tres filas propias ticket, nunca consent/event. POST tiene baseline privada distinta, no exporta pair/expected/continuación ni concede etapas. Schema7 exacto, límites schema8/DOlist7/ticket2/event3, SELECT first-primary fresca y success/results estrictos permanecen.
+
+Body conserva las Promises reales read/cancel y la cadena en waitUntil; failed es absorbente antes de señalar primer fallo. Los tests distinguen retorno HTTP temprano de settlement físico. Stage-work protegido bloquea otro root genuino en mismo ctx hasta settlement+abort; no es mutex distribuido ni physical drain.
+
+GET ahora ofrece form method=post/action=/monitoring/grant, hidden escapado, botón habilitado, expiry original, enlace fijo y texto sin prometer revisión/suscripción/entrega; CSP self. POST200 confirma sólo decisión temporal con CSP form-action none y borra únicamente cookie monitoring con atributos originales. No ofrece retirada pública.
+
+## Ejecuciones: todos los intentos, incluido fallo
+
+Todos los runs fueron push scoped, attempt1, sin rerun manual/cancel-in-progress. Jobs independientes≤2, cada uno timeout15min; contents read, checkout persist-credentials false, Node22, npm ci --ignore-scripts --no-audit --no-fund. Ninguna prueba/build/clon/dependencia local. No STD build.
+
+| Etiqueta | HEAD | Run | Resultado exacto |
+|---|---|---|---|
+| RED | aa6b1cd25c8e15b4cf5d2ae91c85651e071ddff1 | [42104033222](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42104033222) | failure, RED causal. POST 127514019845: C1, 2=1P/1F/0skip. GET 127514019716: C2, 3=1P/2F/0skip. |
+| GREEN1 | 87c8430d82df08b4eea59e6296c9a05b80009250 | [42104729861](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42104729861) | success. POST 127516429185: C1, 2P/0F/0skip. GET 127516428832: C2, 3P/0F/0skip. |
+| FULL1 | 06d29af097f2cf912472c5af2c2eadd22b5b5f29 | [42105489485](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42105489485) | failure, importación fixture. POST 127519081042: C1, 1 file-fail, ningún caso ejercido. GET/reg 127519081544: C3/C5/C6/C7 cada uno 1 file-fail; C4=18P/0F/0skip; lint9 exit0. |
+| FULL2 | 7ce4d221beac0c276e3d7c74577a5527fa223c36 | [42105777333](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42105777333) | failure, gates/fixture M. POST 127520078660: C1, 37=34P/3F/0skip,340263.78ms. GET/reg 127520079207: C3,36=30P/6F/0skip,326290.45ms; C5=16P/0F/0skip; C6=6P/0F/0skip; C7=4P/0F/0skip; lint9 exit0. |
+| FOCAL | 24db0b56d3c4f08299490048bef50225d76234be | [42107074652](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42107074652) | failure, sólo M pendiente. POST 127524591351: C8,16=14P/2F/0skip,220691.60ms. GET 127524592031: C9,6P/0F/0skip,81917.19ms; lint3 exit0. |
+| INVALID | f23a8e4a3365f8a330434175d53501449c71f349 | [42108179683](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42108179683) | failure, YAML inválido. 0 jobs,0 tests,0 compiles. No es RED de seguridad. |
+| DIAG+RESTART | 2e1b55175552cc3c990f600b64a444a4b1bc2ce4 | [42108321734](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42108321734) | failure DIAGNOSTIC / restart GREEN. POST 127528955248: C10,2=0P/2F/0skip,25050.14ms. Restart 127528954797: C11,1P/0F/0skip,11802.22ms. lint3 exit0 en ambos. |
+| CONTRAST | db17f2f56af6bcf8eaee6eb29aca09d6caad0032 | [42109028969](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42109028969) | success, control original request. 127531380618: C10,2P/0F/0skip,25185.86ms; lint2 exit0. |
+| FINAL | e1537bf403944ae4f79c04818db1932a3189d78c | [42109674529](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42109674529) | success. POST 127533595946: C12,6P/0F/0skip,60115.19ms. GET 127533596479: C13,5P/0F/0skip,28446.37ms; lint10 exit0/0warnings. |
+
+Cifras de suites filtradas son seleccionados realmente ejecutados, no casos omitidos ni suma de prefijos. Ningún caso quedó cancelado. No hubo promociones ni retries desde un verde.
+
+### Comandos exactos
+
+Instalación por cada job: npm ci --ignore-scripts --no-audit --no-fund. Las versiones del qualifier en cada HEAD conservan redirecciones TAP/summary y artefactos, no comandos de runtime.
+
+C1:
+```sh
+node --test test/mcp-qa-finite-owner-notice-consent-native.test.mjs
+```
+
+C2:
+```sh
+node --test --test-name-pattern='^(notice cookie-list|notice GET malformed unrelated cookie)' test/mcp-qa-finite-owner-notice-get-native.test.mjs
+```
+
+C3:
+```sh
+node --test test/mcp-qa-finite-owner-notice-get-native.test.mjs
+```
+
+C4:
+```sh
+node --test test/mcp-qa-finite-owner-phase-context.test.mjs
+```
+
+C5:
+```sh
+node --test --test-name-pattern='^(closed source keeps|settled first connection|unknown issuer SEND|absent original issuer never|failed schema SELECT|fresh current owner|fresh QA pointer|same ambient original request)' test/mcp-qa-finite-owner-phase-context-native.test.mjs
+```
+
+C6:
+```sh
+node --test --test-name-pattern='^(uninstrumented actual native|missing actual SDK binding cookie|actual current publication drift|owned begin recheck rejects actual foreign delta owner-revision|fanout causal control delay0)' test/mcp-qa-finite-owner-qa-sdk-native.test.mjs
+```
+
+C7:
+```sh
+node --test --test-name-pattern='^D04 actual exchange (retains|then SYN valid native timestamp drift|then SYN immutable original current-(owner|revision))' test/mcp-qa-finite-owner-qa-sdk-token-compat-native.test.mjs
+```
+
+C8:
+```sh
+node --test --test-name-pattern='^(native consent second snapshot drift denies|native consent failed body retains|native consent history closes replay schema|native consent history closes replay event without SEND|native consent withdrawal preserves history ordinary|native consent withdrawal preserves history revokeGrant before|native consent source current drift denies after-SEND)' test/mcp-qa-finite-owner-notice-consent-native.test.mjs
+```
+
+C9:
+```sh
+node --test --test-name-pattern='^two complete snapshots reject SYN own-state drift' test/mcp-qa-finite-owner-notice-get-native.test.mjs
+```
+
+C10:
+```sh
+node --test --test-name-pattern='^native consent failed body retains actual cancellation (M|held read M)$' test/mcp-qa-finite-owner-notice-consent-native.test.mjs
+```
+
+C11:
+```sh
+node --test --test-name-pattern='^native consent lost native result never reconstructs ACK after actual actor restart$' test/mcp-qa-finite-owner-notice-consent-native.test.mjs
+```
+
+C12:
+```sh
+node --test --test-name-pattern='^(native consent POST records original decision|native consent malformed unrelated cookie|notice cookie-list|native consent failed body retains actual cancellation (M|held read M)$)' test/mcp-qa-finite-owner-notice-consent-native.test.mjs
+```
+
+C13:
+```sh
+node --test --test-name-pattern='^(GET acknowledged original|notice GET malformed unrelated cookie|notice cookie-list)' test/mcp-qa-finite-owner-notice-get-native.test.mjs
+```
+
+Lint9 en FULL1/FULL2: npx --no-install eslint sobre los nueve paths modificados (todos los de la tabla inferior salvo finite-owner-io-fanout.mjs). Lint3 FOCAL/DIAG: test POST+fixture notice+fixture SDK. Lint2 CONTRAST: test POST+fixture SDK. Lint10 FINAL exacto:
+```sh
+npx --no-install eslint lib/mcp-qa-finite-owner-phase-context.mjs lib/mcp-qa-finite-owner-notice-get-wire.mjs lib/mcp-qa-finite-owner-notice-get-forward.mjs lib/mcp-qa-finite-owner-notice-get-qa.mjs lib/mcp-qa-finite-owner-notice-consent-body.mjs test/mcp-qa-finite-owner-notice-consent-native.test.mjs test/fixtures/finite-owner-notice-get.mjs test/fixtures/finite-owner-qa-sdk.mjs test/mcp-qa-finite-owner-notice-get-native.test.mjs test/fixtures/finite-owner-io-fanout.mjs
+```
+Todos esos steps lint exit0; FINAL sin errores ni warnings de ESLint. No confundirlo con warnings de instalación/runtime/Actions descritos abajo.
+
+### Fallos conservados y resolución
+
+1. RED aa6: POST llegó a405, no200/event1, tras OAuth GET/POST→code→Mtoken→MCP y GET ticket reales. Negativo POST malformed pasó por405, por lo que no acreditó parser hasta GREEN. GET bad:name con prepare auténtica devolvió200; pure rechazador falló primero por Cookie presente vacío aceptado. RED no recorrió todas las variantes tras la primera assertion.
+2. FULL1: fixture notice línea181, `const marker` duplicado. Artifact original contiene `SyntaxError: Identifier 'marker' has already been declared`. Cero pruebas nativas/compiles ejercidos; file-fail no es fallo de un correlador. Rename privado passiveMarker, sin cambio producto. Pure18 se reutilizó sin repetir.
+3. FULL2: dos drift POST y seis GET no alcanzaron between-own: nuevos marcadores pasivos desplazaron trace.at(-1).position. Se buscó la última posición causal, preservando guards/outputs; seis GET FOCAL y dos POST FOCAL pasaron. No se redujeron checks/tiempos.
+4. M overflow/held-read: los controles originales liberaban callbacks de stream desde otra petición. DIAG conservó las mismas Promise read/cancel, callback real y outer, observando settled/finally sin modificar stage-work. SYNcancelSettled=true no implicaba cancel nativo settled; en held-read el control liberado tampoco asentaba read nativo. La respuesta503 había terminado y root estaba aborted, pero scope seguía ocupado.
+5. CONTRAST autorizado root: controles HTTP sólo escriben flags DATA. Producer pull/cancel ejecuta su propio callback en la invocación original mediante timer SYN≤deadline absoluto original capturado con readFiniteOwnerRequestDeadline; no completa ni reemplaza Promise nativa, no renueva lease/window ni modifica Set. Ambos M pasaron con read nativo→cancel nativo→body/actual callback finally→scope disponible tras abort. El resultado identifica la infraestructura SYN de control entre invocaciones como causa; no se atribuyó un defecto de retención al producto. FINAL vuelve a verificar esta cadena con los marcadores mínimos usados por assertions.
+6. INVALID f23: sustitución JS accidental de token de replacement `$'` duplicó sufijos y produjo YAML inválido; API reportó0jobs. Se reconstruyó literal el qualifier, nuevo commit/push; cero tests/compiles en ese intento y ningún cambio de producto para corregirlo.
+7. Restart: world ofrece f.restart sólo para modos con persist no disponibles aquí. Ruling root mantuvo world/mode, autorizó ctx.abort SYN con retryAlarm:false; marker efímero de instancia cambió al reacquirir namespace/ID originales. Misma historia SQL/journal sobrevivió, nuevo POST no ejecutó INSERT/ACK. Es reinicio nativo real, no una simple nueva invocación.
+
+Las reglas de [aislamiento entre peticiones de Workers](https://developers.cloudflare.com/workers/observability/errors/#cannot-perform-io-on-behalf-of-a-different-request) y [waitUntil](https://developers.cloudflare.com/workers/runtime-apis/context/#waituntil) respaldan el diseño del contraste; el resultado nativo, no sólo esas docs, cerró los dos casos. El [abort de Durable Objects](https://developers.cloudflare.com/durable-objects/api/state/#abort) sustenta el mecanismo SYN de restart. Sin permisos nuevos.
+
+## Cobertura final sin doble conteo
+
+Enumeración estática por nombres/expansiones literales de arrays: POST50 nombres únicos, GET37 únicos. Selecciones finales6/5, por tanto44/32 no seleccionados en ese run, aunque TAP diga skipped0. Las matrículas inferiores asignan exactamente una primaria GREEN compatible por caso.
+
+POST50=FINAL6+FULL2 29+FOCAL14+RESTART1. GET37=FINAL5+FULL2 26+FOCAL6. No sumar34+14 por su intersección QA cancellation. C1 completo corrió37 casos antes de añadir los doce casos faltantes y restart; no se afirma que un único run ejecutó50. No hubo un full rerun para fabricar una suma.
+
+Compatibilidad: desde87c sólo cambió HTML/CSP literal del GET, comprobado por ambos principales FINAL. Pure-cookie ampliado y M-control fueron recalificados. Los guards, correlación, SQL, verificación y secuencia POST permanecieron idénticos; cambios posteriores de fixture fueron métodos SYN nuevos, marcadores pasivos, corrección de gates y origen de control M. SDK/OAuth/phase/D04 fuera del opt-in notice no ganaron aristas/efectos. Los seis drift recuperados tienen primaria específica. Los archivos protegidos no cambiaron. Esta matriz explicita el reuso autorizado root, no equipara blobs de fixture distintos sin explicar el delta.
+
+Regresiones adicionales: C4 FULL1=18/18; C5 FULL2=16/16 de80 nombres estáticos (64 no seleccionados); C6 FULL2=6/6 de61 (55 no seleccionados); C7 FULL2=4/4 de46 (42 no seleccionados). TAP filtrado emite skipped0. No se repitieron store147/issuer33/journal65, todo SDK ni fanout50ms ni se transfirieron sus counts a POST.
+
+### POST: caso único → primaria GREEN
+
+| Caso | Primaria |
+|---|---|
+| native consent POST records original decision after actual ticket GET | FINAL /42109674529/127533595946 |
+| native consent malformed unrelated cookie denies before SEND | FINAL /42109674529/127533595946 |
+| native consent preserves global sequence across another grant history | FULL2 /42105777333/127520078660 |
+| native consent grammar denies untrusted request corpus | FULL2 /42105777333/127520078660 |
+| native consent verified identity denies current signed identity corpus | FULL2 /42105777333/127520078660 |
+| native consent own SQL continuation alone accepts pending SEND | FULL2 /42105777333/127520078660 |
+| native consent lost native result never reconstructs ACK | FULL2 /42105777333/127520078660 |
+| native consent journal uncertainty never authorizes next effect lost-send | FULL2 /42105777333/127520078660 |
+| native consent journal uncertainty never authorizes next effect lost-ack | FULL2 /42105777333/127520078660 |
+| native consent original window fences queued SQL | FULL2 /42105777333/127520078660 |
+| native consent source current drift denies before-send revision | FULL2 /42105777333/127520078660 |
+| native consent source current drift denies before-send owner | FULL2 /42105777333/127520078660 |
+| native consent source current drift denies before-send pointer | FULL2 /42105777333/127520078660 |
+| native consent source current drift denies before-insert revision | FULL2 /42105777333/127520078660 |
+| native consent source current drift denies before-insert holder | FULL2 /42105777333/127520078660 |
+| native consent second snapshot drift denies exchange | FOCAL /42107074652/127524591351 |
+| native consent second snapshot drift denies event | FOCAL /42107074652/127524591351 |
+| native consent history closes replay own-unknown | FULL2 /42105777333/127520078660 |
+| native consent history closes replay overflow | FULL2 /42105777333/127520078660 |
+| native consent history closes replay freeze | FULL2 /42105777333/127520078660 |
+| native consent history closes replay row-hash | FULL2 /42105777333/127520078660 |
+| native consent withdrawal preserves history CLOSE before native SQL | FULL2 /42105777333/127520078660 |
+| native consent withdrawal preserves history real revokeGrant | FULL2 /42105777333/127520078660 |
+| native consent captured failure cannot resume commit | FULL2 /42105777333/127520078660 |
+| notice cookie-list accepts token names and legitimate values POST | FINAL /42109674529/127533595946 |
+| notice cookie-list rejects malformed list POST | FINAL /42109674529/127533595946 |
+| native consent correlated DATA denies source-revision | FULL2 /42105777333/127520078660 |
+| native consent correlated DATA denies issuer-reservation | FULL2 /42105777333/127520078660 |
+| native consent correlated DATA denies original-grant-ack | FULL2 /42105777333/127520078660 |
+| native consent correlated DATA denies grant-link | FULL2 /42105777333/127520078660 |
+| native consent correlated DATA denies connection | FULL2 /42105777333/127520078660 |
+| native consent correlated DATA denies ticket-request | FULL2 /42105777333/127520078660 |
+| native consent correlated DATA denies event-sequence | FULL2 /42105777333/127520078660 |
+| native consent failed body retains actual cancellation M | FINAL /42109674529/127533595946 |
+| native consent failed body retains actual cancellation QA | FOCAL /42107074652/127524591351 |
+| native consent abort retains SQL and forbids late ACK | FULL2 /42105777333/127520078660 |
+| pure fixed POST metadata and original grammar remain exact | FULL2 /42105777333/127520078660 |
+| native consent history closes replay schema absent | FOCAL /42107074652/127524591351 |
+| native consent history closes replay schema partial | FOCAL /42107074652/127524591351 |
+| native consent history closes replay schema failed-schema-metadata | FOCAL /42107074652/127524591351 |
+| native consent history closes replay schema malformed-schema-results | FOCAL /42107074652/127524591351 |
+| native consent history closes replay event without SEND | FOCAL /42107074652/127524591351 |
+| native consent withdrawal preserves history ordinary append-only withdrawal | FOCAL /42107074652/127524591351 |
+| native consent withdrawal preserves history revokeGrant before queued SQL | FOCAL /42107074652/127524591351 |
+| native consent failed body retains actual cancellation held read M | FINAL /42109674529/127533595946 |
+| native consent failed body retains actual cancellation held read QA | FOCAL /42107074652/127524591351 |
+| native consent source current drift denies after-SEND before recheck owner | FOCAL /42107074652/127524591351 |
+| native consent source current drift denies after-SEND before recheck revision | FOCAL /42107074652/127524591351 |
+| native consent source current drift denies after-SEND before recheck pointer | FOCAL /42107074652/127524591351 |
+| native consent lost native result never reconstructs ACK after actual actor restart | RESTART /42108321734/127528954797 |
+
+### GET: caso único → primaria GREEN
+
+| Caso | Primaria |
+|---|---|
+| inventory own negative key after actual SDK grant closes legacy reader | FULL2 /42105777333/127520079207 |
+| GET acknowledged original after actual QA code M token MCP and D04 reader | FINAL /42109674529/127533596479 |
+| fixed grammar and Access negatives never write notice or SQL | FULL2 /42105777333/127520079207 |
+| pure fixed GET wire rejects caller authority and noncanonical metadata | FULL2 /42105777333/127520079207 |
+| full empty and totally absent schema preserve reader; GET partial schema fails before journal | FULL2 /42105777333/127520079207 |
+| foreign preconnection and UUID history is neither enumerated nor changed | FULL2 /42105777333/127520079207 |
+| SYN negative journal overflow fails closed | FULL2 /42105777333/127520079207 |
+| SYN negative journal ack-without-send fails closed | FULL2 /42105777333/127520079207 |
+| SYN negative journal foreign-send fails closed | FULL2 /42105777333/127520079207 |
+| SYN negative settled notice identity fails closed | FULL2 /42105777333/127520079207 |
+| SYN negative settled notice grant-link fails closed | FULL2 /42105777333/127520079207 |
+| SYN negative settled notice connection fails closed | FULL2 /42105777333/127520079207 |
+| SYN negative settled notice row-hash fails closed | FULL2 /42105777333/127520079207 |
+| owned native hold-before denies bearer continuation and only own stack ACKs | FULL2 /42105777333/127520079207 |
+| owned native hold-after denies bearer continuation and only own stack ACKs | FULL2 /42105777333/127520079207 |
+| unknown acknowledgement lost-reservation retains facts and never retries | FULL2 /42105777333/127520079207 |
+| unknown acknowledgement lost-send retains facts and never retries | FULL2 /42105777333/127520079207 |
+| unknown acknowledgement lost-sql retains facts and never retries | FULL2 /42105777333/127520079207 |
+| freeze after actual SQL commit blocks own ACK without deleting ticket | FULL2 /42105777333/127520079207 |
+| queue past original five-second SQL window cannot mutate or ACK | FULL2 /42105777333/127520079207 |
+| original CLOSE wins queued INSERT without deleting history or revoking grant | FULL2 /42105777333/127520079207 |
+| ticket wins before original CLOSE; retained ticket and grant survive | FULL2 /42105777333/127520079207 |
+| actual Access expires inside GET before any reservation | FULL2 /42105777333/127520079207 |
+| shorter signed current Access clamps ticket to original minimum | FULL2 /42105777333/127520079207 |
+| SYN negative original UUID ticket without journal and consent history fail closed | FULL2 /42105777333/127520079207 |
+| SYN negative consent event with real correct ticket never authorizes GET | FULL2 /42105777333/127520079207 |
+| two complete snapshots reject SYN own-state drift owner | FOCAL /42107074652/127524592031 |
+| two complete snapshots reject SYN own-state drift revision | FOCAL /42107074652/127524592031 |
+| two complete snapshots reject SYN own-state drift pointer | FOCAL /42107074652/127524592031 |
+| two complete snapshots reject SYN own-state drift exchange | FOCAL /42107074652/127524592031 |
+| two complete snapshots reject SYN own-state drift journal | FOCAL /42107074652/127524592031 |
+| two complete snapshots reject SYN own-state drift ticket | FOCAL /42107074652/127524592031 |
+| GET child expiry retains actual HTTP body and cancel until physical settlement | FULL2 /42105777333/127520079207 |
+| notice GET malformed unrelated cookie denies before reservation | FINAL /42109674529/127533596479 |
+| notice cookie-list accepts token names and legitimate values | FINAL /42109674529/127533596479 |
+| notice cookie-list rejects malformed list | FINAL /42109674529/127533596479 |
+| notice cookie-list bounds assertion and native header envelope | FINAL /42109674529/127533596479 |
+
+## Cierre P3 y correladores
+
+Cookie-list privado común conserva sólo OWS exterior/separador exacto '; ', primer '=', token/tchar ASCII, nombres case-sensitive sin duplicados y cookie-octets incluso quoted legítimos ajenos/vacío/base64 con '='. Presente vacío/segmentos vacíos/dup/separador ilegal/valor o nombre inválido/>8192 deniegan. Ausente GET es grammar válida, pero prepare sigue obligatorio en QA. No se normalizan/unquote/decode cookies propias ni OAuth ordinario.
+
+P3 RED demuestra bad:name nativo GET y primer vacío pure. GREEN1 y FINAL demuestran bad:name/segmento vacío nativos sin reservation/SEND/SQL y preservación de ticket/journal existentes; main POST admite unrelated quoted válido. Pure FINAL incluye tchar, '=', quoted, empty, case-sensitive, espacios/control/noASCII, límites8193. CRLF y algunos controles son rechazados por el constructor nativo de Headers/Request antes del qualifier: esa evidencia se rotula envelope, no se adjudica al parser. Nombres/segmentos/símbolos accesibles prueban el qualifier. P3 se considera cerrado por el writer, pendiente fresh review root; no se editó el ledger histórico para anticipar aceptación.
+
+Los siete casos correlated DATA (source-revision, issuer-reservation, original-grant-ack, grant-link, connection, ticket-request, event-sequence) partieron del productor nativo; el último tuvo POST nativo exitoso previo. Cada uno resealó Identity/Reservation/Send.requestHash/reservationHash/ACK.sendHash según dependencia; codec roundtrip y journal.read real con lease vigente devolvieron booleanos válidos ANTES del POST negativo. Source/issuer/SQL originales y tiempos/actor/QA/preconnection intactos. Marcadores296/301/eventACK prueban entrada y ausencia de salida en el correlador objetivo, y salida de predecesores aplicables; no sólo checksum inválido. Cero nuevos consent SEND/INSERT; ticket/eventos originales preservados. Las viejas corrupciones GET sólo se cuentan como rechazo, sin atribuirles aislamiento de predicados. Ningún mock positivo de source/verifier/fila/frame, allowPending, raw pair o aprobación por DATA.
+
+## Costos, native IO y compiles realmente usados
+
+Principal FINAL (C12, misma ejecución GREEN):
+- parent elapsed1275ms; child elapsed775ms, window4999ms, dentro5s/30s originales. C0=I0+900000, C1=C0+180000; techo fuente3nov02:59Z vencido, sin renovación.
+- seis pares completos, doce snapshots; cinco rechecks posteriores a baseline; dos Access verifications reales observadas después del resultado válido. JWKS cache no acredita revocación externa instantánea.
+- SQL102 sesiones first-primary,120 statements=64first+56all. Factual snapshots48first+36all; resto pertenece a preparación/lecturas/preflights nativos, no a consultas nuevas por la correlación de EventRow. Sin sumar sesiones a statements ni incluir inspect posterior: observación se tomó antes del noticeInspect.
+- DO get902/list108/sync2/transaction26/txGet98/txList2/txPut2; notice list12 con cap7. Readback propio de appends asentado. D1 schema/ticket/event SELECT completos fresh-primary; seis pares reutilizan las consultas GET, no añaden query por cada predicado de consent.
+- HTTP84 filas reales, doce snapshots, peak2, active0. Clasificación factual84=credentials24/QA24/M36 en evidencia completa previa; principal FINAL conserva84/peak2. Las filas contienen fetch/read/body/cancel y settlement, no payloads/secrets. Detalle en principal-io-<pid>.json del artifact; no inferir drain global.
+- First GREEN completo anterior FULL2 tuvo785ms y los mismos102/64/56/84+DO, pero esas cifras no se transfieren a POST FINAL:1275ms/775ms fueron medidos nuevamente por el principal ya necesario.
+
+Compiles FINAL capturados12 realmente utilizados (6QA+6M), no una compilación extra para hashes. POSTjob8 y GETjob4; cada native harness compila QA/M, pure no. Ningún STD, clone/build local, Containers ni runtime build externo. Metafiles/inputs/imports/hash/bytes están en JSON separados en artifacts7d; no se guardó bundle de producción. El hash de inputs fuente no sustituye el hash del bundle transformado SYN; ambos constan.
+
+| Compilación principal FINAL | Bytes | Inputs | SHA256 bundle | SHA256 graph/metafile |
+|---|---:|---:|---|---|
+| QA POST |1801609|325|3885841126ffba0a9fcffc748dfe04aa6cd0621953cf692963a512fbc76b0f13|4d9be238e8da7428599b70a29fc6f84fde780ef156e671268a99097e9a9e9dc7|
+| M POST/GET |1686818|303|f3e3a5b9104aecce8184a97edc16cf6709e5941c1faad423b06c0663924e9340|0f1e927b66951ce5a82293e717f69f0417e2336932c1653f6d80dacb4cebb551|
+| QA GET |1801609|325|6f95346ade32a56b5569129eda6f0cbd6e1afac03ab7770bcf2b6aa31b7c5e96|4d9be238e8da7428599b70a29fc6f84fde780ef156e671268a99097e9a9e9dc7|
+
+El QA hash varía por valores SYN de cada harness; no se mezclaron bundles de casos distintos. Contra baseline GET compilado realmente en RED: QA1759194/324 yM1678423/302; delta+42415/+8395bytes, +1input en ambos (lector body nuevo). Es costo del harness QA/M con fixtures/observación, no tamaño de un entrypoint estándar desplegado. FULL2 principal respaldó34QA+34M capturados, QA1787113/325 SHA5f5acdd4133db7fa6061b3985993fe5c9c9666803177ffbeb9cd9f09a199ce9c/graph09fe0a83a412cda1cc099d190e4a9a09385005344fc1b2b09b7eadc08a01353d; M1683900/303 SHAd005983e91845d1d39329768c5599205f67f02ab8cef60047d07fbb8cc32b3ad/graph25297943f01de8f41f7370e266d61cdf36d68237c0f8b5a7f7d847f38cc4e2eb. No recompilación para recuperar evidencia. Duración TAP/job incluye setup y disposal; no se midió tiempo/CPU exclusivo de esbuild ni se inventa.
+
+## Inventario de archivos y protección
+
+BASE→codeHEAD1199: nueve paths de producto/test cambiados del mapa10; fixture IO permanece byteexacto. Este informe es el extra documental autorizado. Qualifier temporal eliminado; no onceavo path de implementación, rename, nuevo paquete/dependencia/config/mount/flag. Todos los blobs lib fuera de estos cinco y todos los blobs raíz (incluidos wrangler/package/config) fueron comparados por árboles API e idénticos al BASE. Full compare público preserva evidencia de todos los commits propios.
+
+| Path del mapa | Blob final |
+|---|---|
+| lib/mcp-qa-finite-owner-phase-context.mjs | f8948c0a2cc41a48773406a64fc9c863226f9b2d |
+| lib/mcp-qa-finite-owner-notice-get-wire.mjs | da8c3f8ac66699fd207989058f4a1425b0ee36c0 |
+| lib/mcp-qa-finite-owner-notice-get-forward.mjs | ea910f0fcdeade5a794ddaa60898706924e72f80 |
+| lib/mcp-qa-finite-owner-notice-get-qa.mjs | f63e820a886af5b73a6a7b8b8ea22bc8d12b0106 |
+| lib/mcp-qa-finite-owner-notice-consent-body.mjs | 2a1e89ffcfe56a607c704129a3af6a83e8bc9b81 |
+| test/mcp-qa-finite-owner-notice-consent-native.test.mjs | 53b3daec12caf355d5aed4b35ebe8572029ed911 |
+| test/fixtures/finite-owner-notice-get.mjs | f2ede8ac193b24dfc9e548fb4175f6e8eb6947a0 |
+| test/fixtures/finite-owner-qa-sdk.mjs | 62fde9dcefb78bf57585a184901cb3c4d79c4c4d |
+| test/mcp-qa-finite-owner-notice-get-native.test.mjs | 906c100035213fd95cb0a1abe40d41e66105c7a5 |
+| test/fixtures/finite-owner-io-fanout.mjs | e181bfd7634b6f71e4129b03fbb529a2f1b04f10 |
+
+Blobs protegidos BASE=final verificados por árboles/diff:
+- lib/cloudflare-access-identity.mjs: 5f1fb5c2eb843252e1d5207f09fbb75467150021
+- lib/dossier-monitoring-authority.mjs: 703b9d3cbb04bc5effff3f4ef8276cdb4cb95803
+- lib/dossier-monitoring-owner-http.mjs: 9b3a362c0738f5cefc00f8770bc2c099f76d7eee
+- lib/mcp-qa-finite-bootstrap-source.mjs: 66aef02dab28ff9e94957f04dfe50b407f2a5e0c
+- lib/mcp-qa-finite-initial-entry.mjs: c5ae0f53bee077c693d7f0a0599bbb6347648fee
+- lib/mcp-qa-finite-owner-native-wire.mjs: 42aa81f82b60bcc66a140f1358784108696f41e5
+- lib/mcp-qa-finite-owner-oauth-forward.mjs: f7979579fcb6d00b3d5d68c7790089c803f4170f
+- lib/mcp-qa-finite-owner-oauth-qa.mjs: ec5c16161bffc6e6d19de153b4465bf6ae748493
+- lib/mcp-qa-finite-owner-oauth-wire.mjs: fc113a05e7f6d1ef72cd045a55c5934b357aa724
+- lib/mcp-qa-finite-owner-preparation.mjs: 01ec291de2631a7cd7e527e2a567f44ac6067522
+- lib/mcp-qa-finite-preparation-issuer-journal.mjs: 414450aa08f797bed5a41cf5cc697342785ce16b
+- lib/mcp-qa-finite-preparation-issuer-records.mjs: 50f9a013580a46ad1d445a240f47b7b2ce887d49
+- lib/mcp-qa-finite-preparation-issuer-store.mjs: efc25b2af9c80b8eb27cffe219544e974002293e
+- lib/mcp-qa-finite-preparation-notice-journal.mjs: b9c15aba18e2442a0ed864b8afd5e86313c5e470
+- lib/mcp-qa-finite-preparation-notice-records.mjs: 8c9386b27109cd056d3f70d91ab3cb6c6f40b4e9
+- lib/mcp-qa-finite-stage-work.mjs: a89baeb2578856dadedf700f9d66e180eb09120e
+- test/fixtures/finite-initial-entry-world.mjs: bfb918ebe15edc654de0e57d5aecf83757129b07
+- package.json: f4fd38ac380c46a149d8cf0f3bd828a28406f761
+- package-lock.json: 36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b
+
+World sigue7DDL monitoring para todos phase-context, preservando4DDL consent/3eventos ajenos/2grants; no se editó ni resembró positivo. Store/journal/schema/records, SDK/OAuth ordinario, native wire16384, stage-work/lease, source y entrypoints protegidos mantienen bytes. No se creó otro modo initial-entry ni scheduler de fanout; timer de stream-control es sólo fixture SYN original y deadline original.
+
+## Artefactos y advertencias
+
+Todos retention7d, sin cuerpo/handle/token/source/row owner real. Tienen TAP y metadatos de compiles/IO saneados, no nueva custodia. IDs/digests se obtuvieron de los jobs originales, no de ejecuciones recreadas.
+
+| Etiqueta | Artifact ID | SHA256 ZIP |
+|---|---:|---|
+| RED-POST | 13451925208 | d21b601a776bd2e16121f0c3c0c6efde66a7bc27b6255c1173f083e94ce5ff1e |
+| RED-GET | 13452115077 | 4f984a3cd24632570d91073923d3cfbacb7445e89d270681043eb6dff402d0f8 |
+| GREEN-POST | 13450937291 | b7539dfa37bb8ac6939e4fd252fd011f6fe7dcaf0e57739ee9f889fe09f45f42 |
+| GREEN-GET | 13450279676 | 77f8796b921adf0ea5d3e8e4c1fa5906fc4e5b0af23200c5594f71e69c389c46 |
+| FULL1-POST | 13452166342 | 8977f801ad34b280dc7a489894b4588e7644b0b90b3fcd2b2c3dc0105f734a7d |
+| FULL1-GET | 13451331905 | 1999c38cd8905552ac079d71cad006775a570ac1139b2e6433772190a76c1175 |
+| FULL2-POST | 13453165308 | eea2e5ea084de9bcb02586d094efb0c8e4a50e7452db8ac9faf21f406b252375 |
+| FULL2-GET | 13452282426 | 225fcedb9228f3ced5a95261549ef49a166e6e34e0bed2aff8d713909cf0e3ae |
+| FOCAL-POST | 13452188432 | 72bedc12592ecde5367e852f9ecc7681c7fc021335f903cedb6ed062f7862f28 |
+| FOCAL-GET | 13452507433 | ea8878d55bd0381048287613b7434c660199739cda6ad90116d9ed0bd90932b6 |
+| DIAG-POST | 13452033747 | 38d4fde609093e40d3d20723ad2c591a063aa0f540976777850166237efb2b90 |
+| RESTART | 13451524143 | c053539138ec5b4b413e2dd9c86f786e87fd50acfada0c5d119069786666bd60 |
+| CONTRAST | 13453580020 | a744c888793c30292fe72735c48297b36a6c51d633bea0c9e09fc4e550d40de1 |
+| FINAL POST |13453505757|e4fbdb7a54b511ee3fb0bc918ab1ae37078dc2132e4acbb3d6973410a7d7ccea|
+| FINAL GET |13452319591|b5161a9ea8927b96d7ee272e94a150125de116efec8f42c08450b805a7c1dee6|
+
+FINAL expira12nov2026 21:08:34Z POST/21:08:03Z GET según metadata API. Expirar artifact no borra commits/report; no se promete conservación indefinida. Root leyó primarias y verificó ZIP/TAP/68metafiles FULL2 en memoria; writer leyó sólo el ZIP736bytes del SyntaxError en memoria, sin archivo local. No se descargaron fuentes/dependencias ni se ejecutó producto localmente.
+
+Warnings observados sin suprimir: npm deprecations esbuild-kit/core-utils y esm-loader, ESLint9.39.4 unsupported; Actions punycode DEP0040 y url.parse DEP0169, accionesv4 Node20 forzadas aNode24; aviso SDK CIMD deshabilitado enQA; aviso RPC stub no disposed en harness. No son warnings de ESLint FINAL ni se corrigieron mediante flags/guard/deps fuera de alcance. La autoridad de runtime no se infiere de CI verde ni de ese SDK warning. Contadores históricos/D03/fanout/toolchain se dejan a review final root, no se abren aquí.
+
+## Auto-revisión y límites
+
+Se revisó línea a línea el delta fuente: siete exports nuevos exactos, cookies compartidas privadas, body1024, metadata cinco fija, baselinePOST privada, triple correlación y EventRow, igualdad de frames enteros, witness/Common/child única, Promise SQL léxica hastaACK, absorción de fallo, Access actual y no recorte de ticket, HTML/CSP sin retiro ficticio. Se revisaron los propios diffs y árboles protegidos después del último GREEN. No se ejecutó prueba adicional por resumen o métricas.
+
+Race último source-read→SQL no es transacción global: SQL protege dueño/revisión/grant/fence/tiempos actuales; una publicación que cambie justo después del último read puede dejar evento durable y respuesta denegada al recheck. No se compensa borrando historia. Revocación Access externa instantánea no está acreditada por firma/exp; revocar grant real sí conserva historia y hace que resolver ordinario rechace Monitoring authorization unavailable. CLOSE por sí solo no revoca grant. Unknown SEND/ACK/result y restart no autorizan retry.
+
+Pruebas son D1/DO/workerd/SDK/RS256/JWKS nativos dentro SYN hosted, no aceptación de una persona real ni hosting/guard operativo. No hay permisos humanos nuevos, runtime, fuente renovada, fase de avisos/NoticeLink, third CLOSED, retirada pública completa, own setup/cleanup/guard ni PCoff. P3 y esta unidad esperan fresh review independiente root antes de aceptación; writer no continúa otra tarea.
