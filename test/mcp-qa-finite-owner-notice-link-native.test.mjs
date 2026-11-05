import {hashFiniteOwnerEvidence,encodeFinitePreparationRecord,decodeFinitePreparationRecord} from '../lib/mcp-qa-finite-preparation-records.mjs';
import {initialHash} from '../lib/mcp-qa-finite-initial-material-records.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import {initialEntryHarness} from './fixtures/finite-initial-entry-world.mjs';
import {seedFiniteOwnerSdkClient} from './fixtures/finite-owner-qa-sdk.mjs';
import {prepareNoticeIssued,issueNotice,actualExchangeMcp,ticket,consent,noticePlain as plain,saveNoticeObservation} from './fixtures/finite-owner-notice-get.mjs';

async function withIssued(fn){
 const f=await initialEntryHarness('phase-context-sdk-token-notice-get');
 try{await prepareNoticeIssued(f);await seedFiniteOwnerSdkClient(f.mf,f.source);await issueNotice(f);await fn(f);}
 finally{await f.stub.noticeReleaseHeld().catch(()=>{});await f.stub.ioRelease('all').catch(()=>{});await f.mf.dispose();await f.cleanup();}
}
test('native notice link follows actual consent ACK in the same POST child',()=>withIssued(async f=>{
 await actualExchangeMcp(f);await ticket(f);
 const original=await plain(f.stub.snapshot()),history=(await f.db.prepare('SELECT * FROM dossier_monitoring_consent_events ORDER BY sequence').all()).results,grants=(await f.db.prepare('SELECT * FROM delegated_access_grants ORDER BY id').all()).results,schema=(await f.db.prepare("SELECT type,name,tbl_name,sql FROM sqlite_schema WHERE tbl_name IN ('dossier_monitoring_consent_events','dossier_monitoring_owner_tickets') AND sql IS NOT NULL ORDER BY name").all()).results;await f.stub.noticeConfigure();await f.stub.ioConfigure();const began=Date.now();const response=await consent(f);await response.body?.cancel();const observation=await plain(f.stub.noticeStateRead()),io=await plain(f.stub.ioObservation()),elapsed=Date.now()-began;const after=await plain(f.stub.noticeInspect());
 assert.equal(response.status,200);assert.equal(after.fixtureError,undefined);assert.equal(after.events.length,1);
 assert.equal(after.notice.length,5);assert(after.notice.some(([key])=>key.endsWith('consent:ack')));
 const all=await plain(f.stub.snapshot()),link=all.find(([key])=>key==='connection-preparation:'+f.identity.preconnectionId+':notice');
 assert(link,'actual POST 200 and durable SQL/ACK must produce NoticeLink');
 const record=decodeFinitePreparationRecord('NoticeLink',link[1]),event=after.events[0],ack=JSON.parse(after.notice.find(([key])=>key.endsWith('consent:ack'))[1]),send=JSON.parse(after.notice.find(([key])=>key.endsWith('consent:send'))[1]);
 assert.deepEqual(Object.keys(record).sort(),['acceptedAt','eventHash','grantHash','preconnectionId','sequence']);assert.equal(encodeFinitePreparationRecord('NoticeLink',record),link[1]);
 assert.equal(record.eventHash,hashFiniteOwnerEvidence('event',{grantId:event.grant_id,projectId:event.project_id,subject:event.user_id,clientId:event.client_id,resource:event.resource,revision:event.revision,action:event.action,purpose:event.purpose,requestId:event.request_id,sequence:event.sequence,issuedAt:event.issued_at,expiresAt:event.expires_at}));
 assert.notEqual(record.eventHash,ack.rowHash);assert.equal(ack.rowHash,initialHash('afw.finite-preparation-notice-row.v1',event));assert.equal(record.sequence,event.sequence);assert(record.sequence>1);assert(record.acceptedAt>=ack.observedAt);assert(record.acceptedAt<send.window.deadline);
 for(const row of original)assert.deepEqual(all.find(([key])=>key===row[0]),row);
 const historyAfter=(await f.db.prepare('SELECT * FROM dossier_monitoring_consent_events ORDER BY sequence').all()).results;for(const row of history)assert.deepEqual(historyAfter.find(v=>v.sequence===row.sequence),row);
 assert(grants.length>=3);assert.equal(schema.length,7);assert.deepEqual((await f.db.prepare('SELECT * FROM delegated_access_grants ORDER BY id').all()).results,grants);assert.deepEqual((await f.db.prepare("SELECT type,name,tbl_name,sql FROM sqlite_schema WHERE tbl_name IN ('dossier_monitoring_consent_events','dossier_monitoring_owner_tickets') AND sql IS NOT NULL ORDER BY name").all()).results,schema);
 const trace=observation.state.trace;
 assert.deepEqual(trace.filter(v=>v.link&&v.link!=='transaction-settled').map(v=>v.link),['put-enter','put-exit','sync-enter','sync-exit','read-enter','read-exit']);
 const snapshots=trace.filter(v=>v.snapshotNotice).map(v=>v.snapshotNotice);assert.equal(snapshots.length,14);assert.deepEqual(snapshots.slice(0,12),Array.from({length:12},()=>({present:false,inventory:false,anchor:false})));assert.deepEqual(snapshots.slice(12),Array.from({length:2},()=>({present:true,inventory:true,anchor:true})));
 assert.equal(trace.filter(v=>v.stage==='after').length,6);assert.equal(io.snapshots,14);assert.equal(io.peak,2);assert.equal(io.active,0);
 const complete=trace.find(v=>v.position==='complete');assert(complete.at<send.window.deadline);assert(elapsed<30000);
 await saveNoticeObservation({unit:'link',elapsed,...observation.state,io});
 console.info('LINK native principal costs',JSON.stringify({elapsed,pairs:io.snapshots/2,rechecks:trace.filter(v=>v.stage==='after').length,accessVerifications:observation.state.accessVerifications,sqlSessions:observation.state.sql.length,first:observation.state.sql.flatMap(s=>s.queries).filter(q=>q.method==='first').length,all:observation.state.sql.flatMap(s=>s.queries).filter(q=>q.method==='all').length,ops:observation.state.ops,noticeLists:observation.state.lists.filter(v=>v.prefix.startsWith('afw.finite-preparation-notice')).length,http:{snapshots:io.snapshots,requests:io.rows.length,peak:io.peak,active:io.active},childElapsed:complete.at-send.window.startedAt,windowMs:send.window.deadline-send.window.startedAt}));

}));

async function state(f){return (await plain(f.stub.noticeStateRead())).state;}
async function gate(f,name){
 for(let n=0;n<500;n++){const s=await plain(f.stub.noticeStateRead());if(s.held===name)return s;await new Promise(r=>setTimeout(r,10));}
 assert.fail('SYN actual Link gate not reached: '+name);
}
async function settled(f){for(let n=0;n<100;n++){if((await plain(f.stub.noticeProbe())).allowed)return;await new Promise(r=>setTimeout(r,10));}assert.fail('actual originating Link work did not settle');}
async function denied(response){assert.notEqual(response.status,200);assert.doesNotMatch(await response.text(),/Registré tu decisión|<form/);}
async function success(f){await ticket(f);await f.stub.noticeConfigure();const response=await consent(f);assert.equal(response.status,200);await response.body?.cancel();return plain(f.stub.noticeInspect());}
async function linkEntry(f){return (await plain(f.stub.snapshot())).find(([key])=>key==='connection-preparation:'+f.identity.preconnectionId+':notice');}
function countWrites(s){return s.trace.filter(v=>v.link==='put-enter').length;}
function consentInserts(s){return s.sql.flatMap(v=>v.queries).filter(v=>v.sql.includes('INSERT INTO dossier_monitoring_consent_events')).length;}
async function replayClosed(f,before){
 await f.stub.noticeConfigure();await denied(await consent(f));assert.deepEqual(await plain(f.stub.noticeInspect()),before);const s=await state(f);assert.equal(countWrites(s),0);assert.equal(consentInserts(s),0);
}
test('native notice link retains global event sequence and foreign history',()=>withIssued(async f=>{
 const at=Date.now(),foreign='ffffffff-ffff-4fff-8fff-ffffffffffff';
 await f.db.prepare('INSERT INTO dossier_monitoring_consent_events (grant_id,project_id,user_id,client_id,resource,revision,action,purpose,request_id,issued_at,expires_at) VALUES (?,?,?,?,?,?,?,?,?,?,?)').bind(foreign,'SYN-other','SYN-other','SYN-other','https://foreign.invalid/mcp',1,'grant','afw.dossier-monitoring.v1',foreign,at,at+60000).run();
 const original=(await f.db.prepare('SELECT * FROM dossier_monitoring_consent_events ORDER BY sequence').all()).results;
 const after=await success(f),record=decodeFinitePreparationRecord('NoticeLink',(await linkEntry(f))[1]);assert.equal(record.sequence,after.events[0].sequence);assert(record.sequence>original.at(-1).sequence);
 const history=(await f.db.prepare('SELECT * FROM dossier_monitoring_consent_events ORDER BY sequence').all()).results;for(const row of original)assert.deepEqual(history.find(v=>v.sequence===row.sequence),row);
}));
test('native notice link never advances source or public readers and remains factual after deadline',()=>withIssued(async f=>{
 const after=await success(f),entry=await linkEntry(f),send=JSON.parse(after.notice.find(([key])=>key.endsWith('consent:send'))[1]);
 await new Promise(r=>setTimeout(r,Math.max(0,send.window.deadline-Date.now()+25)));assert(Date.now()>send.window.deadline);
 await f.stub.noticeConfigure();assert.equal((await plain(f.stub.sdkReadCurrent())).status,'unavailable');
 const trace=(await state(f)).trace;assert(trace.some(v=>v.correlator==='noticeLink'&&v.phase==='enter'&&v.at>send.window.deadline));assert(trace.some(v=>v.correlator==='noticeLink'&&v.phase==='exit'));
 for(const path of ['/monitoring','/authorize','/monitoring/notice-link']){const response=await f.mf.dispatchFetch(f.source.origin+path,{headers:f.headers});assert.notEqual(response.status,200);await response.body?.cancel();}
 await replayClosed(f,after);assert.deepEqual(await linkEntry(f),entry);assert.deepEqual(await plain(f.stub.sdkGrant(f.identity.grantId)),f.grant);
}));
for(const history of ['complete','cut-after-ack'])test('native notice link requires live originating SQL continuation '+history,()=>withIssued(async f=>{
 await ticket(f);await f.stub.noticeConfigure(history==='complete'?'normal':'link-cut-after-ack');
 if(history==='complete'){const response=await consent(f);assert.equal(response.status,200);await response.body?.cancel();}
 else{const pending=consent(f);await gate(f,'before-link');await (await f.mf.dispatchFetch(f.source.origin+'/fixture/consent-abort')).body?.cancel();await denied(await pending);await f.stub.noticeReleaseHeld();await settled(f);}
 const after=await plain(f.stub.noticeInspect());assert.equal(after.events.length,1);assert.equal(after.notice.length,5);assert.equal(Boolean(await linkEntry(f)),history==='complete');
 const originalInstance=await f.stub.noticeInstanceRead();await assert.rejects(async()=>{await f.stub.noticeRestart();});
 const bindings=await f.mf.getBindings('qa-sdk');f.stub=bindings.AFW_INDEPENDENT_CLOSURE.get(bindings.AFW_INDEPENDENT_CLOSURE.idFromName('afw-own-successor-closure-v1'));
 assert.notEqual(await f.stub.noticeInstanceRead(),originalInstance);await replayClosed(f,after);assert.equal(Boolean(await linkEntry(f)),history==='complete');
}));
for(const mode of ['link-lost-transaction','link-lost-sync','link-lost-readback','link-wrong-readback'])test('native notice link unknown or lost actual result remains closed '+mode,()=>withIssued(async f=>{
 await ticket(f);await f.stub.noticeConfigure(mode);await denied(await consent(f));
 const after=await plain(f.stub.noticeInspect()),entry=await linkEntry(f),s=await state(f);assert.equal(after.events.length,1);assert.equal(after.notice.length,5);assert(entry);assert.equal(countWrites(s),1);
 if(mode==='link-lost-transaction'){assert(s.trace.some(v=>v.link==='put-exit'&&v.status==='uncertain'));assert(!s.trace.some(v=>v.link==='sync-enter'||v.link==='read-enter'));}
 if(mode==='link-lost-sync')assert(!s.trace.some(v=>v.link==='read-enter'));
 assert(!s.trace.some(v=>v.position==='complete'));await replayClosed(f,after);assert.deepEqual(await linkEntry(f),entry);
}));
for(const mode of ['link-existing','link-conflict'])test('native notice link existing or conflicting record cannot win '+mode,()=>withIssued(async f=>{
 await ticket(f);await f.stub.noticeConfigure(mode);const pending=consent(f);await gate(f,'before-link');await f.stub.noticeReleaseHeld();await denied(await pending);
 const after=await plain(f.stub.noticeInspect()),s=await state(f);assert.equal(after.events.length,1);assert.equal(after.notice.length,5);assert(await linkEntry(f));assert.equal(countWrites(s),1);assert(s.trace.some(v=>v.link==='negative-race-insert'));assert(!s.trace.some(v=>v.link==='sync-enter'));await replayClosed(f,after);
}));
async function qaControl(f,action){
 if(!f.qaControlFetch){assert.equal(typeof f.mf.getWorker,'function','actual Miniflare getWorker API is present');const worker=await f.mf.getWorker('qa-sdk');assert.equal(typeof worker.fetch,'function');f.qaControlFetch=worker.fetch.bind(worker);}
 const response=await f.qaControlFetch('https://qa-fixture.invalid/fixture/notice-link-control',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action})});assert.equal(response.status,200);return response.json();
}
async function controlGate(f){
 for(let n=0;n<500;n++){const data=await qaControl(f,'read');if(data.held==='link-write')return data;await new Promise(r=>setTimeout(r,10));}
 assert.fail('actual QA fetch did not observe original TX DATA gate within original child');
}
for(const [mode,name]of [['link-hold-write','link-write'],['link-hold-commit','link-commit'],['link-hold-sync','link-sync'],['link-hold-readback','link-readback']])test('native notice link held native work and cancellation retain scope '+mode,()=>withIssued(async f=>{
 const dispatch=f.mf.dispatchFetch.bind(f.mf);let pendingConsent=null,competingHttp=null,httpSettled=false,httpStatus=null,httpError=null,originalAborted=false;
 if(mode==='link-hold-write'){
  const data=await qaControl(f,'reset'),actor=await plain(f.stub.noticeLinkControlRead());assert.equal(data.visible,true);assert.equal(actor.visible,true);assert.equal(actor.marker,data.marker);
 }
 try{
  await ticket(f);await f.stub.noticeConfigure(mode);const pending=pendingConsent=consent(f);
  if(mode==='link-hold-write'){
   const data=await controlGate(f);assert.equal(data.entered,1);assert.equal(data.txStarted,true);assert.equal(data.txSettled,false);assert.equal(data.expired,false);
   console.info('LINK native DATA visibility',JSON.stringify({actualQaFetch:true,actorShared:true,originalTxEntered:data.entered,nativeTransactionPending:!data.txSettled}));
   await (await dispatch(f.source.origin+'/fixture/consent-abort')).body?.cancel();originalAborted=true;
   competingHttp=dispatch(f.source.origin+'/monitoring',{headers:f.headers,redirect:'manual'}).then(response=>{httpSettled=true;httpStatus=response.status;return response;},error=>{httpSettled=true;httpError=String(error?.message);return null;});
   await new Promise(r=>setTimeout(r,25));const during=await qaControl(f,'read');
   assert.equal(during.held,'link-write');assert.equal(during.txStarted,true);assert.equal(during.txSettled,false);assert.equal(during.txOutcome,null);assert.equal(during.expired,false);assert.notEqual(httpStatus,200);
   console.info('LINK native TX HTTP observation',JSON.stringify({requestSettledDuringHeld:httpSettled,statusDuringHeld:httpStatus,errorDuringHeld:httpError,controlHeld:during.held,nativeTxSettled:during.txSettled,nativeTxOutcome:during.txOutcome,classification:httpSettled?'closed response while native TX pending':'native HTTP pending at bounded observation'}));
   await qaControl(f,'release');await denied(await pending);const competingResponse=await competingHttp;assert.equal(httpError,null);assert(competingResponse);await denied(competingResponse);
   const after=await qaControl(f,'read');assert.equal(after.settled,1);assert.equal(after.expired,false);assert.equal(after.txSettled,true);assert(['fulfilled','rejected'].includes(after.txOutcome));
   console.info('LINK native original transaction settlement',JSON.stringify({settled:after.txSettled,outcome:after.txOutcome,httpStatus,noLateSuccess:true}));
  }else{
   await gate(f,name);assert.equal((await plain(f.stub.noticeProbe())).allowed,false,'fresh native request denied while actual work outstanding');
   await (await dispatch(f.source.origin+'/fixture/consent-abort')).body?.cancel();originalAborted=true;await denied(await pending);
   assert.equal((await plain(f.stub.noticeProbe())).allowed,false,'aborting original request is not settlement');await f.stub.noticeReleaseHeld();
  }
  await settled(f);const after=await plain(f.stub.noticeInspect());assert.equal(after.events.length,1);assert.equal(after.notice.length,5);
  const s=await state(f);assert.equal(countWrites(s),1);assert(!s.trace.some(v=>v.position==='complete'));await replayClosed(f,after);
 }finally{
  if(mode==='link-hold-write'){
   if(!originalAborted)await (await dispatch(f.source.origin+'/fixture/consent-abort')).body?.cancel();
   await qaControl(f,'release');
   for(const actual of [pendingConsent,competingHttp])if(actual){const response=await actual;await response?.body?.cancel().catch(()=>{});}
  }
 }
}));
for(const [mode,name]of [['link-before','before-link'],['link-hold-commit','link-commit']])test('native notice link original child expires without renewal '+mode,()=>withIssued(async f=>{
 await ticket(f);await f.stub.noticeConfigure(mode);const pending=consent(f),seen=await gate(f,name);
 const at=await plain(f.stub.noticeInspect()),send=JSON.parse(at.notice.find(([key])=>key.endsWith('consent:send'))[1]);assert(seen.state.trace.some(v=>v.gate===name&&v.at<send.window.deadline));
 await new Promise(r=>setTimeout(r,Math.max(0,send.window.deadline-Date.now()+25)));await denied(await pending);assert.equal((await plain(f.stub.noticeProbe())).allowed,false);
 await f.stub.noticeReleaseHeld();await settled(f);const after=await plain(f.stub.noticeInspect());assert.equal(after.events.length,1);assert.equal(after.notice.length,5);
 const s=await state(f);assert.equal(countWrites(s),mode==='link-before'?0:1);assert.equal(Boolean(await linkEntry(f)),mode==='link-hold-commit');assert(!s.trace.some(v=>v.position==='complete'));await replayClosed(f,after);
}));
for(const drift of ['owner','revision','QA','M','holder','exchange'])test('native notice link current facts drift at final recheck '+drift,()=>withIssued(async f=>{
 await ticket(f);await f.stub.noticeConfigure('link-drift');const pending=consent(f);await gate(f,'link-between');assert(await linkEntry(f));
 if(drift==='owner')await f.db.prepare("UPDATE site_projects SET user_id='SYN NEGATIVE owner' WHERE id=?").bind(f.identity.projectId).run();
 if(drift==='revision')await f.db.prepare('UPDATE site_projects SET revision=revision+1 WHERE id=?').bind(f.identity.projectId).run();
 if(drift==='M')f.phaseCurrent.receipt.deploymentId='99999999-9999-4999-8999-999999999999';
 if(drift==='QA'){f.phaseQaObservation=1;f.phaseDrift='qa-pointer';}
 if(drift==='holder')await f.stub.sdkReplaceHolder();
 if(drift==='exchange'){const value=new Date(Math.max(Date.parse(f.grant.created_at),Date.now()-1)).toISOString();await f.db.prepare('UPDATE delegated_access_grants SET exchanged_at=? WHERE id=?').bind(value,f.identity.grantId).run();}
 await f.stub.noticeReleaseHeld();await denied(await pending);const after=await plain(f.stub.noticeInspect());assert.equal(after.events.length,1);assert.equal(after.notice.length,5);assert(await linkEntry(f));assert.equal(countWrites(await state(f)),1);
}));
test('native notice link factual mismatch denies valid codec and journal data',()=>withIssued(async f=>{
 const after=await success(f),event=after.events[0],grant=await plain(f.stub.sdkGrant(f.identity.grantId)),baselineInserts=consentInserts(await state(f));assert.equal(baselineInserts,1);
 for(const kind of ['eventHash','grantHash','sequence','preconnectionId','future','before-ack','after-deadline']){
  const proof=await plain(f.stub.noticeLinkCorrupt(kind));assert.equal(proof.codecRoundtrip,true,kind);assert.equal(proof.journalValid,true,kind);
  assert.equal((await plain(f.stub.sdkReadCurrent())).status,'unavailable',kind);const s=await state(f);assert(s.trace.some(v=>v.correlator==='noticeLink'&&v.phase==='enter'),kind+' reaches actual correlator');assert(!s.trace.some(v=>v.correlator==='noticeLink'&&v.phase==='exit'),kind+' fails actual predicate');assert.equal(countWrites(s),0);assert.equal(consentInserts(s),baselineInserts);
  assert.deepEqual((await plain(f.stub.noticeInspect())).events,[event]);assert.deepEqual(await plain(f.stub.sdkGrant(f.identity.grantId)),grant);await f.stub.noticeLinkRestore(proof.original);
 }
}));
for(const missing of ['ack','unknown-send','no-mutation','freeze','withdrawal'])test('native notice link missing source evidence never becomes authority '+missing,()=>withIssued(async f=>{
 await success(f);const entry=await linkEntry(f);
 if(missing==='freeze')await f.stub.noticeCorrupt('freeze');
 else if(missing==='withdrawal'){
  const original=await plain(f.stub.noticeInspect());assert.deepEqual(await plain(f.stub.noticeOrdinaryRead()),{enabled:true});
  const withdrawn=await plain(f.stub.noticeOrdinaryWithdraw());assert.equal(withdrawn.status,200);assert.equal(withdrawn.action,'revoke');
  const after=await plain(f.stub.noticeInspect());assert.equal(after.events.length,2);assert.deepEqual(after.events[0],original.events[0]);assert.deepEqual(after.notice,original.notice);assert.deepEqual(after.tickets,original.tickets);assert.deepEqual(await plain(f.stub.noticeOrdinaryRead()),{enabled:false});assert.deepEqual(await plain(f.stub.sdkGrant(f.identity.grantId)),f.grant);
 }else await f.stub.noticeLinkMissing(missing);
 const before=await plain(f.stub.noticeInspect());await replayClosed(f,before);assert.deepEqual(await linkEntry(f),entry);assert.equal((await plain(f.stub.sdkReadCurrent())).status,'unavailable');
}));
for(const reduction of ['CLOSE','revokeGrant'])test('native notice link real reduction preserves event and link '+reduction,()=>withIssued(async f=>{
 const before=await success(f),entry=await linkEntry(f);
 if(reduction==='CLOSE'){assert.equal((await plain(f.stub.noticeFence())).status,'fenced');assert.deepEqual(await plain(f.stub.sdkGrant(f.identity.grantId)),f.grant);}
 else{assert.equal((await plain(f.stub.sdkReduceOriginal())).reduction,'revoked');assert.notEqual((await plain(f.stub.sdkGrant(f.identity.grantId))).revoked_at,'');assert.deepEqual(await plain(f.stub.noticeOrdinaryRead()),{unavailable:true,message:'Monitoring authorization unavailable'});}
 await replayClosed(f,before);assert.deepEqual(await linkEntry(f),entry);
}));
