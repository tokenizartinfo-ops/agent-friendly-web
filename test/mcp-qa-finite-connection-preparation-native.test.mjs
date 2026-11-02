import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash,randomBytes,randomUUID} from 'node:crypto';
import {setup} from './fixtures/finite-transport-native.mjs';
import {hashFinitePreparationRecord as hash,hashFiniteOwnerPreparationAudit as audit} from '../lib/mcp-qa-finite-preparation-records.mjs';
const O='https://delegated-canary.agentfriendlyweb.dev',sha=v=>createHash('sha256').update(v).digest('hex');
const rows=async f=>(await f.json('/fixture/rows',{})).map(([k,v])=>[k,v.startsWith('{')?JSON.parse(v):v]);
async function finiteChoice(t,hold=null){
 const f=await setup(t);if(hold)await f.json('/fixture/hold-final',{mode:hold});const first=await f.screen();
 assert.equal((await f.publish(first)).status,'installed');
 const handle=randomBytes(32).toString('base64url'),authorizationHash=sha(handle),until=new Date(Date.now()+590000).toISOString();
 await f.db.prepare('INSERT INTO delegated_consent_sessions(handle_hash,user_id,kind,project_id,client_id,resource,scopes_json,expires_at,consumed_at) VALUES(?,?,?,?,?,?,?,?,?)').bind(authorizationHash,'owner','authorize','synthetic-owned','synthetic-client',O+'/mcp','["afw:project:read"]',until,'').run();
 const headers={'Cf-Access-Jwt-Assertion':f.token,Cookie:first.cookie};
 const auth={url:O+'/authorize?'+new URLSearchParams({client_id:'synthetic-client',resource:O+'/mcp',project:'synthetic-owned',scope:'afw:project:read'}),headers};
 assert.equal((await f.json('/fixture/link',{kind:'authorization',authorizationHash,...auth})).result?.status,'recorded');
 const at=new Date().toISOString();
 await f.db.prepare('UPDATE delegated_consent_sessions SET consumed_at=? WHERE handle_hash=?').bind(at,authorizationHash).run();
 await f.db.prepare('INSERT INTO delegated_access_grants(id,user_id,client_id,project_id,resource,scopes_json,created_at,expires_at,revoked_at) VALUES(?,?,?,?,?,?,?,?,?)').bind('accepted-grant','owner','synthetic-client','synthetic-owned',O+'/mcp','["afw:project:read"]',at,until,'').run();
 const grant={url:O+'/authorize',headers:{...headers,Origin:O,'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({handle,decision:'approve',project:'synthetic-owned',scope:'afw:project:read'}).toString()};
 assert.equal((await f.json('/fixture/link',{kind:'grant',grantId:'accepted-grant',...grant})).result?.status,'recorded');
 const notices=await f.screen(first.cookie);
 assert.equal((await f.publish(notices)).status,'installed');
 assert.equal((await rows(f)).filter(([k])=>k.startsWith('source-selection:')).length,0);
 const monitor=randomBytes(32).toString('base64url'),requestId=randomUUID(),issued=Date.now(),expires=Math.min(Date.parse(until),issued+580000);
 await f.db.prepare('INSERT INTO dossier_monitoring_owner_tickets VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)').bind(sha(monitor),requestId,'owner','accepted-grant','synthetic-owned','synthetic-client',O+'/mcp','afw.dossier-monitoring-owner.v1','grant',1,0,issued,expires,expires).run();
 const ack=await f.json('/fixture/monitoring',{requestId,action:'grant',expectedSequence:0,expiresAt:expires});assert.equal(ack.status,200);
 const notice={url:O+'/monitoring/grant',headers:{...headers,Origin:O,'Content-Type':'application/x-www-form-urlencoded',Cookie:notices.cookie+'; __Host-afw-monitoring-owner='+monitor},body:'handle='+monitor};
 assert.equal((await f.json('/fixture/link',{kind:'notice',requestId,sequence:ack.sequence,...notice})).result?.status,'recorded');
 const finite=await f.screen(notices.cookie);return {f,finite};
}
test('three actual native owner approvals and acknowledged stages precede final selection and audit',async t=>{
 const {f,finite}=await finiteChoice(t),result=await f.publish(finite);
 assert.equal(result.status,'installed');assert.equal(f.posts(),6);
 const all=await rows(f),pre=all.find(([k])=>k.endsWith(':record')&&k.startsWith('connection-preparation:'))[1],snapshot=all.find(([k])=>k.endsWith(':source'))[1];
 const preparation=all.find(([k])=>k==='preparation:'+pre.preconnectionId+':record')?.[1];assert.ok(preparation);
 const approvalHashes={},receiptHashes={};
 for(const stage of ['connection','notices','finite']){
  const approval=all.find(([k])=>k==='connection-preparation:'+pre.preconnectionId+':'+stage+':approval')[1];
  const receipt=all.find(([,v])=>v.purpose==='afw.finite-connection-installed.v1'&&v.stage===stage)[1];
  approvalHashes[stage]=hash('StageApproval',approval);receiptHashes[stage]=receipt.receiptHash;
 }
 const link=all.find(([k])=>k.endsWith(':grant'))[1],noticeLink=all.find(([k])=>k.endsWith(':notice'))[1],relation=all.find(([k])=>k.endsWith(':connection'))[1],connection=all.find(([k])=>k==='owner-connection-ref:'+relation.connectionRef)[1];
 assert.equal(preparation.auditHash,audit({preconnectionId:pre.preconnectionId,sourceRevision:pre.sourceRevision,sourceHash:snapshot.sourceHash,preconnectionHash:pre.recordHash,stageApprovalHashes:approvalHashes,stageReceiptHashes:receiptHashes,grantLinkHash:hash('GrantLink',link),noticeLinkHash:hash('NoticeLink',noticeLink),connectionRelationHash:hash('PreconnectionConnection',relation),connectionRefHash:hash('ConnectionRef',connection)}));
 const last=all.find(([k])=>k==='connection-preparation:'+pre.preconnectionId+':finite:approval')[1],lastApproval=all.find(([k])=>k==='connection-approval:'+last.approvalHash)[1];
 assert.notEqual(last.approvalHash,pre.approvalHash);assert.equal(preparation.approval.csrfReceiptHash,lastApproval.csrfReceiptHash);
 assert.equal((await f.json('/fixture/read',{sourceRevision:pre.sourceRevision})).result?.preparation.prepId,pre.preconnectionId);
 assert.equal((await f.publish(finite)).status,'admin_pending');assert.equal(f.posts(),6);
 await f.db.prepare("UPDATE delegated_access_grants SET revoked_at=? WHERE id='accepted-grant'").bind(new Date().toISOString()).run();
 assert.equal((await f.json('/fixture/read',{sourceRevision:pre.sourceRevision})).rejected,true);
 assert.deepEqual(await rows(f),all);
});

for(const mode of ['selection','nested_source'])test('whole admitted stage blocks another writer while final '+mode+' remains physically pending after parent finish',async t=>{
 const {f,finite}=await finiteChoice(t,mode);
 try{
  const first=await f.publish(finite);assert.equal(first.status,'admin_pending');assert.equal(f.posts(),6);
  assert.deepEqual(await f.json('/fixture/final-gate-state',{}),{held:true,settled:false,parentFinished:true,finalReceipt:true});
  const initial=await rows(f);
  assert.equal(initial.filter(([k])=>k.endsWith(':send')).length,6);
  assert.equal(initial.filter(([k])=>k.startsWith('preparation:')&&k.endsWith(':record')).length,mode==='selection'?1:0);
  const next=await f.separateSyntheticChoice(),second=await f.publish(next),after=await rows(f);
  // Actual independently verified owner POST must consume a NEW decision.
  assert.equal(after.filter(([k])=>k.startsWith('owner-ticket:')&&k.endsWith(':use')).length,4);
  assert.equal(after.filter(([,v])=>v?.purpose==='afw.finite-connection-stage-approval.v1').length,4);
  assert.equal(second.status,'admin_pending');
  assert.equal(f.posts(),6,'another actual admission cannot bypass the unsettled final operation');
  assert.equal(after.filter(([k])=>k.endsWith(':send')).length,6);
  for(const [key,value] of initial)assert.deepEqual(after.find(([k])=>k===key)?.[1],value,'committed original history survives');
  await f.json('/fixture/release-final',{});
  await new Promise(r=>setTimeout(r,25));
  assert.equal((await f.json('/fixture/final-gate-state',{})).settled,true);
  assert.deepEqual(await rows(f),after,'expired captured children cannot write late');
 }finally{await f.json('/fixture/release-final',{});}
});
