import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash,randomBytes,randomUUID} from 'node:crypto';
import {setup} from './fixtures/finite-transport-native.mjs';
const O='https://delegated-canary.agentfriendlyweb.dev',sha=v=>createHash('sha256').update(v).digest('hex');
const rows=async f=>(await f.json('/fixture/rows',{})).map(([k,v])=>[k,v.startsWith('{')?JSON.parse(v):v]);
async function finiteChoice(t){
 const f=await setup(t,'normal',{setupFacts:true});const first=await f.screen();
 assert.equal((await f.publish(first)).status,'installed');
 const handle=randomBytes(32).toString('base64url'),authorizationHash=sha(handle),until=new Date(Date.now()+515000).toISOString();
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

for(const mode of ['normal','grant','revision','selection'])test('Task4 actual setup facts post-commandBy native primary '+mode,async t=>{
 const {f,finite}=await finiteChoice(t);assert.equal((await f.publish(finite)).status,'installed');assert.equal(f.posts(),6);
 const arm=await f.json('/fixture/task4-arm',{mode});
 if(mode==='selection'){await new Promise(r=>setTimeout(r,5));assert.equal((await f.json('/fixture/task4-drift-selection',{})).status,'recorded');}
 await new Promise(r=>setTimeout(r,Math.max(1,arm.commandBy-Date.now()+25)));
 assert(Date.now()>arm.commandBy);
 if(mode==='grant')await f.db.prepare("UPDATE delegated_access_grants SET revoked_at=? WHERE id='accepted-grant'").bind(new Date().toISOString()).run();
 if(mode==='revision')await f.db.prepare("UPDATE site_projects SET revision=revision+1 WHERE id='synthetic-owned'").run();
 const before=await rows(f),result=await f.json('/fixture/task4-facts',{});
 assert.equal(result.outcome.status,'admin_pending');assert.equal(result.facts?.accepted,mode==='normal');assert.equal(f.posts(),6);
 if(mode==='normal'){
  assert(result.facts.T0<result.facts.commandBy);assert(result.facts.observedAt>result.facts.commandBy);assert(result.facts.publishedAt<=result.facts.T0);
  assert.equal(result.facts.phase,'finite_prearm');assert.equal(result.facts.publicationStage,'finite');
  assert.notEqual(result.facts.programRevision,result.facts.sourceRevision);
 }
 assert.deepEqual(await rows(f),before,'facts do not mutate immutable selected/prearm history or produce setup SEND');
});
