import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
import * as withdrawal from '../lib/mcp-own-permission-withdrawal.mjs';
const make=o=>{assert.equal(typeof withdrawal.createOwnPermissionsOnlyReduction,'function');return withdrawal.createOwnPermissionsOnlyReduction(o);};
async function fixture(admitted=false){
 const mf=new Miniflare(convertV4MiniflareOptions({modules:true,compatibilityDate:'2026-09-07',script:'export default{fetch(){return new Response(null,{status:404});}}',d1Databases:{DB:'permissions-only',OTHER:'permissions-only'}}));
 try{
 const db=await mf.getD1Database('DB'),other=await mf.getD1Database('OTHER'),now=Date.now(),startAt=now-1000,expiresAt=now+120000;
 await db.exec('CREATE TABLE site_projects(id TEXT PRIMARY KEY,user_id TEXT,revision INTEGER);CREATE TABLE delegated_access_grants(id TEXT PRIMARY KEY,user_id TEXT,client_id TEXT,project_id TEXT,resource TEXT,scopes_json TEXT,created_at TEXT,expires_at TEXT,revoked_at TEXT,exchanged_at TEXT);');
 for(const file of ['db/dossier-monitoring-consent.sql','db/dossier-node-process.sql'])for(const statement of readFileSync(file,'utf8').matchAll(/CREATE TABLE[\s\S]*?\);|CREATE (?:UNIQUE )?INDEX[^;\r\n]+;|CREATE TRIGGER[^\r\n]*? END;/g))await db.prepare(statement[0]).run();
 await db.prepare('INSERT INTO site_projects VALUES(?,?,?)').bind('p','owner',1).run();
 const resource='https://private.invalid/mcp';
 for(const id of ['original','cancelled','g'])await db.prepare('INSERT INTO delegated_access_grants VALUES(?,?,?,?,?,?,?,?,?,?)').bind(id,'owner','client','p',resource,'["afw:project:read"]',new Date(now-200000).toISOString(),new Date(expiresAt).toISOString(),id==='g'?'':new Date(now-30000).toISOString(),new Date(now-2000).toISOString()).run();
 const admission=async(id,generation,created,expires)=>db.prepare('INSERT INTO dossier_node_process_admissions(grant_id,project_id,user_id,client_id,resource,consent_sequence,consent_issued_at,consent_expires_at,container_id,process_generation,program_hash,source_revision,image,created_at,expires_at) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)').bind(id,'p','owner','client',resource,1,created,expires,'a'.repeat(64),generation,'b'.repeat(64),'c'.repeat(40),'cloudflare/debian-trixie',created,expires).run();
 await admission('original','d'.repeat(64),now-100000,now-90000);
 await db.prepare('INSERT INTO dossier_node_process_closures VALUES(?,?,?,?,?,?,?)').bind('original','d'.repeat(64),'a'.repeat(64),'b'.repeat(64),'c'.repeat(40),'cloudflare/debian-trixie',now-80000).run();
 await db.prepare('INSERT INTO dossier_node_process_closures VALUES(?,?,?,?,?,?,?)').bind('cancelled',null,'a'.repeat(64),'b'.repeat(64),'c'.repeat(40),'cloudflare/debian-trixie',now-30000).run();
 if(admitted)await admission('g','e'.repeat(64),startAt,expiresAt);
 await db.prepare('INSERT INTO dossier_monitoring_consent_events(grant_id,project_id,user_id,client_id,resource,revision,action,purpose,request_id,issued_at,expires_at) VALUES(?,?,?,?,?,?,?,?,?,?,?)').bind('g','p','owner','client',resource,1,'grant','afw.dossier-monitoring.v1','11111111-1111-4111-8111-111111111111',startAt,expiresAt).run();
 const options={enabled:true,db,context:{grantId:'g',subject:'owner',projectId:'p',clientId:'client',resource},originalConsent:{sequence:1,revision:1,issuedAt:startAt,expiresAt},window:{startAt,expiresAt},requestId:'22222222-2222-4222-8222-222222222222',now:Date.now};
 const history=async()=>({admissions:(await db.prepare('SELECT * FROM dossier_node_process_admissions ORDER BY grant_id').all()).results,closures:(await db.prepare('SELECT * FROM dossier_node_process_closures ORDER BY grant_id').all()).results});
 const permissions=async()=>({grant:await db.prepare("SELECT revoked_at FROM delegated_access_grants WHERE id='g'").first(),monitor:(await db.prepare("SELECT * FROM dossier_monitoring_consent_events WHERE grant_id='g' ORDER BY sequence").all()).results});
 return{mf,db,other,options,history,permissions};
 }catch(error){
  await mf.dispose();
  throw error;
 }
}
for(const admitted of [false,true])test('native permissions-only preserves admission='+admitted+' and all closure history',async()=>{
 const f=await fixture(admitted);try{
  const before=await f.history(),r=await make(f.options).withdraw();assert.equal(r.purpose,'afw.own-permissions-only-reduction.v1');assert.equal(r.permissionsWithdrawn,true);for(const key of ['runtimeStopRequested','physicalStopVerified','nativeWithdrawalVerified','operationalReadiness'])assert.equal(r[key],false);
  assert.deepEqual(await f.history(),before);const permissions=await f.permissions();assert.ok(permissions.grant.revoked_at);assert.equal(permissions.monitor.length,2);assert.equal(permissions.monitor[1].action,'revoke');
  const again=await make({...f.options,db:f.other}).withdraw();assert.equal(again.permissionsWithdrawn,true);assert.equal(again.runtimeStopRequested,false);assert.deepEqual(await f.permissions(),permissions);assert.deepEqual(await f.history(),before);
  await assert.rejects(f.db.prepare('DELETE FROM dossier_node_process_closures').run());
 }finally{await f.mf.dispose();}
});
test('legacy native constructor still requests its qualified close callback',async()=>{
 const f=await fixture();try{let calls=0;const result=await withdrawal.createOwnPermissionWithdrawal({...f.options,close:async()=>{calls++;return{closed:true,runtimeStopRequested:true};}}).withdraw();assert.equal(calls,1);assert.equal(result.runtimeStopRequested,true);assert.equal(result.permissionsWithdrawn,true);}finally{await f.mf.dispose();}
});

test('permissions-only observer is read only before and after actual native reduction',async()=>{
 const f=await fixture();try{
  const before=await f.permissions(),read=withdrawal.createOwnPermissionsOnlyObservation(f.options);
  assert.equal((await read.observe()).permissionsWithdrawn,false);assert.deepEqual(await f.permissions(),before);
  await make(f.options).withdraw();const after=await f.permissions();
  assert.equal((await withdrawal.createOwnPermissionsOnlyObservation({...f.options,db:f.other}).observe()).permissionsWithdrawn,true);
  assert.deepEqual(await f.permissions(),after);
 }finally{await f.mf.dispose();}
});
