import assert from 'node:assert/strict';
import test from 'node:test';
import {DatabaseSync} from 'node:sqlite';
import {readFileSync} from 'node:fs';
import {finiteFixture} from './fixtures/qa-finite-trial.mjs';
import {createPrivateQaFiniteTrialNativePin,readPrivateQaFiniteControlIdentity} from '../lib/mcp-qa-finite-trial-control.mjs';
const api=await import('../lib/mcp-qa-finite-admission-primary.mjs').catch(error=>{
 if(error.code!=='ERR_MODULE_NOT_FOUND'||!error.message.includes('mcp-qa-finite-admission-primary.mjs'))throw error;
 return {};
});
function fixture(t,mode){
 assert.equal(typeof api.readPrivateQaFiniteAdmissionPrimary,'function');
 const f=finiteFixture({at:Date.now()-1000}),p=f.plan,s=p.selectors,now=f.now();
 const predecessor={containerId:'4'.repeat(64),applicationId:p.resources.applicationId,programHash:'5'.repeat(64),sourceRevision:'6'.repeat(40)};
 const generation='3'.repeat(64),retiredAt=p.T0-10;
 const db=new DatabaseSync(':memory:');t.after(()=>db.close());
 db.exec('CREATE TABLE site_projects(id TEXT PRIMARY KEY,user_id TEXT); CREATE TABLE delegated_access_grants(id TEXT PRIMARY KEY,project_id TEXT,user_id TEXT,client_id TEXT,resource TEXT,revoked_at TEXT,expires_at TEXT,scopes_json TEXT);');
 for(const name of ['dossier-monitoring-consent','dossier-node-process'])db.exec(readFileSync(new URL('../db/'+name+'.sql',import.meta.url),'utf8'));
 const args=[s.projectId,s.subject,s.clientId,s.resource];
 const insert=db.prepare('INSERT INTO delegated_access_grants VALUES (?,?,?,?,?,?,?,?)');
 db.prepare('INSERT INTO site_projects VALUES (?,?)').run(s.projectId,s.subject);
 insert.run(s.grantId,...args,'',new Date(p.R1+90000).toISOString(),'["afw:project:read"]');
 insert.run('past-grant',...args,mode==='old-active'?'':new Date(retiredAt).toISOString(),new Date(now+1000).toISOString(),'["afw:project:read"]');
 const addConsent=db.prepare('INSERT INTO dossier_monitoring_consent_events(grant_id,project_id,user_id,client_id,resource,revision,action,purpose,request_id,issued_at,expires_at) VALUES(?,?,?,?,?,1,?,?,?, ?,?)');
 addConsent.run(s.grantId,...args,mode==='current-revoked'?'revoke':'grant','afw.dossier-monitoring.v1','current',now-10,mode==='current-revoked'?now-10:p.N1);
 addConsent.run('past-grant',...args,'grant','afw.dossier-monitoring.v1','past-grant',retiredAt-20,mode==='old-monitor'?now+1000:retiredAt);
 if(mode!=='old-monitor'){
  const revokeAt=mode==='late-revoke'?p.T0+1:retiredAt;
  addConsent.run('past-grant',...args,'revoke','afw.dossier-monitoring.v1','past-revoke',revokeAt,revokeAt);
 }
 db.prepare('INSERT INTO dossier_node_process_admissions VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)').run('past-grant',...args,1,retiredAt-20,retiredAt,
  predecessor.containerId,generation,predecessor.programHash,predecessor.sourceRevision,'cloudflare/debian-trixie',retiredAt-19,retiredAt);
 if(mode!=='old-writer')db.prepare('INSERT INTO dossier_node_process_closures VALUES(?,?,?,?,?,?,?)').run('past-grant',
  generation,predecessor.containerId,predecessor.programHash,predecessor.sourceRevision,'cloudflare/debian-trixie',mode==='late-close'?p.T0+1:retiredAt);
 let sessions=0,permissionReads=0;
 f.env.RELEASE_DB={withSession(pin){assert.equal(pin,'first-primary');sessions++;
  return {prepare(sql){return {bind(...params){return {async all(){return {success:true,results:db.prepare(sql).all(...params).map(row=>({...row}))};}};}};}};
 }};
 const nativePin=createPrivateQaFiniteTrialNativePin({ctx:f.ctx,env:f.env,sourceRevision:p.source.revision});
 const {plan,planHash,controlHash}=readPrivateQaFiniteControlIdentity({nativePin,raw:JSON.stringify(p)});
 const control={plan,planHash,controlHash},parent={check:f.now,deadline:f.now()+4000,signal:new AbortController().signal};
 const verify=()=>api.readPrivateQaFiniteAdmissionPrimary({ctx:f.ctx,env:f.env,control,parent,predecessor:mode==='missing-predecessor'?undefined:mode==='wrong-predecessor'?{...predecessor,programHash:'a'.repeat(64)}:predecessor,readPermission:async()=>{
  permissionReads++;return {valid:mode!=='owner-withdrawn',grantHash:p.grantHash,monitorHash:p.monitorHash,expiresAt:p.N1};
 }});
 return {f,p,verify,get sessions(){return sessions;},get permissionReads(){return permissionReads;}};
}
test('initial admission matches the current owner permission to fresh D1 with revoked predecessors',async t=>{
 const x=fixture(t),proof=await x.verify();
 assert.equal(proof.status,'verified');assert.equal(proof.expiresAt,x.p.N1);
 assert.equal(proof.authorizesEffects,false);assert.equal(x.sessions,2);assert.equal(x.permissionReads,2);assert.equal(x.f.puts,0);
 assert.equal(Object.hasOwn(proof,'grantId'),false);
});
for(const mode of ['old-active','old-monitor','old-writer','wrong-predecessor','late-close','late-revoke','current-revoked','owner-withdrawn'])test('initial admission refuses '+mode,async t=>{
 const x=fixture(t,mode);await assert.rejects(x.verify());assert.equal(x.f.puts,0);
});

test('initial admission requires the original context before reading D1 or owner permission',async t=>{
 const x=fixture(t,'missing-predecessor');await assert.rejects(x.verify());
 assert.equal(x.sessions,0);assert.equal(x.permissionReads,0);assert.equal(x.f.puts,0);
});
