import test from 'node:test';
import assert from 'node:assert/strict';
import {fixture} from './fixtures/mcp-own-durable-host.mjs';
import {createOwnDurableEventHost} from '../lib/mcp-own-durable-host.mjs';
const params=projectRef=>({name:'afw.dossier.changed',arguments:{projectRef},delivery:{mode:'webhook',url:'https://callback.agentfriendlyweb.dev/hook',secret:'whsec_'+Buffer.alloc(32,3).toString('base64')}});

test('one original subscription stays below 400 primary reads without cached authorization',async()=>{
 const f=fixture();let reads=0;const prepare=f.config.db.prepare.bind(f.config.db);
 f.config.db.prepare=sql=>({bind(...args){const q=prepare(sql).bind(...args);return {run:()=>q.run(),first:()=>{reads++;return q.first();}};}});
 try{f.grant();const h=createOwnDurableEventHost(f.config);f.setHost(h);const p=params(await h.list());reads=0;await h.subscribe(p);assert.ok(reads<400,`primary reads: ${reads}`);assert.equal(f.sends(),1);await h.close();}finally{f.close();}
});

test('revocation immediately after the joined admission snapshot denies before boot',async()=>{
 const f=fixture();let revoked=false;const prepare=f.config.db.prepare.bind(f.config.db);
 f.config.db.prepare=sql=>({bind(...args){const q=prepare(sql).bind(...args);return {run:()=>q.run(),async first(){const row=await q.first();if(!revoked&&sql.includes('SELECT a.*')&&sql.includes('dossier_node_process_admissions')){revoked=true;f.db.prepare('UPDATE delegated_access_grants SET revoked_at=? WHERE id=?').run(new Date().toISOString(),'g');}return row;}};}});
 try{f.grant();const h=createOwnDurableEventHost(f.config);f.setHost(h);await assert.rejects(h.subscribe(params(await h.list())));assert.equal(revoked,true);assert.equal(f.boots(),0);assert.equal(f.sends(),0);}finally{f.close();}
});

for(const kind of ['monitoring','closure'])test(`${kind} withdrawal after admission snapshot denies before boot`,async()=>{
 const f=fixture();let changed=false;const prepare=f.config.db.prepare.bind(f.config.db);
 f.config.db.prepare=sql=>({bind(...args){const q=prepare(sql).bind(...args);return {run:()=>q.run(),async first(){const row=await q.first();if(!changed&&sql.includes('SELECT a.*')&&sql.includes('dossier_node_process_admissions')){changed=true;const now=Date.now();if(kind==='monitoring')f.db.prepare("INSERT INTO dossier_monitoring_consent_events(grant_id,project_id,user_id,client_id,resource,revision,action,purpose,request_id,issued_at,expires_at) SELECT grant_id,project_id,user_id,client_id,resource,revision,'revoke',purpose,?,?,? FROM dossier_monitoring_consent_events ORDER BY sequence DESC LIMIT 1").run('22222222-2222-4222-8222-222222222222',now,now);else f.db.prepare('INSERT INTO dossier_node_process_closures SELECT grant_id,process_generation,container_id,program_hash,source_revision,image,? FROM dossier_node_process_admissions').run(now);}return row;}};}});
 try{f.grant();const h=createOwnDurableEventHost(f.config);f.setHost(h);await assert.rejects(h.subscribe(params(await h.list())));assert.equal(changed,true);assert.equal(f.boots(),0);assert.equal(f.sends(),0);}finally{f.close();}
});
