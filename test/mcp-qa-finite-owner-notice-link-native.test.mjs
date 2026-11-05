import test from 'node:test';
import assert from 'node:assert/strict';
import {initialEntryHarness} from './fixtures/finite-initial-entry-world.mjs';
import {seedFiniteOwnerSdkClient} from './fixtures/finite-owner-qa-sdk.mjs';
import {prepareNoticeIssued,issueNotice,actualExchangeMcp,ticket,consent,noticePlain as plain} from './fixtures/finite-owner-notice-get.mjs';

async function withIssued(fn){
 const f=await initialEntryHarness('phase-context-sdk-token-notice-get');
 try{await prepareNoticeIssued(f);await seedFiniteOwnerSdkClient(f.mf,f.source);await issueNotice(f);await fn(f);}
 finally{await f.stub.noticeReleaseHeld().catch(()=>{});await f.stub.ioRelease('all').catch(()=>{});await f.mf.dispose();await f.cleanup();}
}
test('native notice link follows actual consent ACK in the same POST child',()=>withIssued(async f=>{
 await actualExchangeMcp(f);await ticket(f);await f.stub.noticeConfigure();await f.stub.ioConfigure();
 const response=await consent(f);await response.body?.cancel();const after=await plain(f.stub.noticeInspect());
 assert.equal(response.status,200);assert.equal(after.fixtureError,undefined);assert.equal(after.events.length,1);
 assert.equal(after.notice.length,5);assert(after.notice.some(([key])=>key.endsWith('consent:ack')));
 const all=await plain(f.stub.snapshot()),link=all.find(([key])=>key==='connection-preparation:'+f.identity.preconnectionId+':notice');
 assert(link,'actual POST 200 and durable SQL/ACK must produce NoticeLink');
}));
