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
 await actualExchangeMcp(f);await ticket(f);await f.stub.noticeConfigure();await f.stub.ioConfigure();
 const original=await plain(f.stub.snapshot()),history=(await f.db.prepare('SELECT * FROM dossier_monitoring_consent_events ORDER BY sequence').all()).results,began=Date.now();const response=await consent(f);await response.body?.cancel();const after=await plain(f.stub.noticeInspect());
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
 const observation=await plain(f.stub.noticeStateRead()),io=await plain(f.stub.ioObservation()),elapsed=Date.now()-began,trace=observation.state.trace;
 assert.deepEqual(trace.filter(v=>v.link&&v.link!=='transaction-settled').map(v=>v.link),['put-enter','put-exit','sync-enter','sync-exit','read-enter','read-exit']);
 assert.equal(trace.filter(v=>v.stage==='after').length,6);assert.equal(io.snapshots,14);assert.equal(io.peak,2);assert.equal(io.active,0);
 const complete=trace.find(v=>v.position==='complete');assert(complete.at<send.window.deadline);assert(elapsed<30000);
 await saveNoticeObservation({unit:'link',elapsed,...observation.state,io});
 console.info('LINK native principal costs',JSON.stringify({elapsed,pairs:io.snapshots/2,rechecks:trace.filter(v=>v.stage==='after').length,accessVerifications:observation.state.accessVerifications,sqlSessions:observation.state.sql.length,first:observation.state.sql.flatMap(s=>s.queries).filter(q=>q.method==='first').length,all:observation.state.sql.flatMap(s=>s.queries).filter(q=>q.method==='all').length,ops:observation.state.ops,noticeLists:observation.state.lists.filter(v=>v.prefix.startsWith('afw.finite-preparation-notice')).length,http:{snapshots:io.snapshots,requests:io.rows.length,peak:io.peak,active:io.active},childElapsed:complete.at-send.window.startedAt,windowMs:send.window.deadline-send.window.startedAt}));

}));
