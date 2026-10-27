import test from 'node:test';
import assert from 'node:assert/strict';
import {fixture} from './fixtures/mcp-own-durable-host.mjs';
import {createDossierMonitoringAuthorization} from '../lib/dossier-monitoring-authority.mjs';
import {createDossierEventRpcAuthority} from '../lib/dossier-event-rpc-authority.mjs';

function setup({consent=true,closureResponse=null}={}){
 const f=fixture();if(consent)f.grant();let gets=0,calls=0,primaryHook;
 const primary=f.config.db,prepare=primary.prepare.bind(primary);
 primary.prepare=sql=>{const query=prepare(sql);return{bind(...args){const st=query.bind(...args);return{...st,async first(){const row=closureResponse!==null&&sql.includes('dossier_node_process_closures')?closureResponse:await st.first();if(primaryHook)await primaryHook(sql);return row;}};}};};
 const policy={grantId:'g',subject:'owner',projectId:'p',clientId:'client',resource:f.config.context.resource,containerId:'a'.repeat(64),...f.config.window};
 const reference=async()=> (await createDossierMonitoringAuthorization({db:primary,context:f.config.context,projectId:'p',projectionSecret:f.config.projectionSecret,now:Date.now})()).projectRef;
 const env={AFW_DOSSIER_EVENTS_ENABLED:'true',AFW_DOSSIER_EVENTS_POLICY:JSON.stringify(policy),AFW_OAUTH_ISSUER:'https://private.invalid',AFW_OAUTH_RESOURCE:policy.resource,AFW_OAUTH_PILOT_CLIENT_ID:'client',AFW_OAUTH_PILOT_PROJECT_ID:'p',DB:primary,AFW_DOSSIER_EVENTS_PROJECTION_SECRET:f.config.projectionSecret,AFW_DOSSIER_EVENTS_NODE:{idFromString(id){assert.equal(id,policy.containerId);return{toString:()=>id};},get(){gets++;return{async list(){calls++;return reference();},async subscribe(p){calls++;return{copied:p};},async unsubscribe(){calls++;return{};}};}}};
 const authority=createDossierEventRpcAuthority({enabled:true,env,context:f.config.context,projectId:'p',resource:policy.resource,now:Date.now});
 const closeProcess=()=>f.db.prepare('INSERT INTO dossier_node_process_closures VALUES(?,?,?,?,?,?,?)').run('g',null,'a'.repeat(64),'b'.repeat(64),'c'.repeat(40),'cloudflare/debian-trixie',Date.now());
 return{...f,env,authority,reference,gets:()=>gets,calls:()=>calls,setHook(h){primaryHook=h;},closeProcess};
}

test('authorized catalog is readable before a native actor exists and never consumes execution',async()=>{
 const f=setup();try{
  const before=f.db.prepare('SELECT total_changes() n').get().n;
  assert.equal(await f.authority.list(),await f.reference());
  assert.equal(await f.authority.list(),await f.reference());
  assert.equal(f.gets(),0);assert.equal(f.calls(),0);assert.equal(f.boots(),0);assert.equal(f.sends(),0);
  assert.equal(f.db.prepare('SELECT COUNT(*) n FROM dossier_node_process_admissions').get().n,0);
  assert.equal(f.rows().length,0);
  assert.equal(f.db.prepare('SELECT total_changes() n').get().n,before);
 }finally{f.close();}
});

test('missing or withdrawn monitoring consent cannot advertise a catalog',async()=>{
 const f=setup({consent:false});try{assert.equal(await f.authority.list(),null);assert.equal(f.gets(),0);}finally{f.close();}
 const g=setup();try{
  const t=Date.now();g.db.prepare('INSERT INTO dossier_monitoring_consent_events(grant_id,project_id,user_id,client_id,resource,revision,action,purpose,request_id,issued_at,expires_at) VALUES(?,?,?,?,?,?,?,?,?,?,?)').run('g','p','owner','client',g.config.context.resource,1,'revoke','afw.dossier-monitoring.v1','22222222-2222-4222-8222-222222222222',t,t);
  assert.equal(await g.authority.list(),null);assert.equal(g.gets(),0);
 }finally{g.close();}
});

test('a durable closure suppresses discovery without resolving a native actor',async()=>{
 const f=setup();try{f.closeProcess();assert.equal(await f.authority.list(),null);assert.equal(f.gets(),0);assert.equal(f.calls(),0);}finally{f.close();}
});

test('grant revocation during a primary catalog check cannot return a reference',async()=>{
 const f=setup();try{
  let changed=false;f.setHook(sql=>{if(!changed&&sql.includes('dossier_node_process_closures')){changed=true;f.db.prepare('UPDATE delegated_access_grants SET revoked_at=? WHERE id=?').run(new Date().toISOString(),'g');}});
  await assert.rejects(f.authority.list());assert.equal(changed,true);assert.equal(f.gets(),0);
 }finally{f.close();}
});

test('configuration drift during primary catalog authorization fails before any RPC',async()=>{
 const f=setup();try{
  let changed=false;f.setHook(sql=>{if(!changed&&sql.includes('SELECT g.*')){changed=true;f.env.AFW_DOSSIER_EVENTS_ENABLED='false';}});
  await assert.rejects(f.authority.list());assert.equal(changed,true);assert.equal(f.gets(),0);
 }finally{f.close();}
});

test('catalog preparation leaves subscription and withdrawal on the strict RPC path',async()=>{
 const f=setup();try{
  const projectRef=await f.authority.list();assert.equal(f.gets(),0);
  const params={name:'afw.dossier.changed',arguments:{projectRef},delivery:{mode:'webhook',url:'https://callback.agentfriendlyweb.dev/hook',secret:'whsec_'+Buffer.alloc(32,3).toString('base64')}};
  assert.deepEqual(await f.authority.subscribe(params),{copied:{...params,ttlMs:600000,cursor:null}});assert.equal(f.gets(),1);assert.equal(f.calls(),1);
  const {secret:ignored,...delivery}=params.delivery;void ignored;
  assert.deepEqual(await f.authority.unsubscribe({...params,delivery}),{});assert.equal(f.gets(),2);assert.equal(f.calls(),2);
 }finally{f.close();}
});

test('missing primary closure schema denies discovery without actor fallback',async()=>{
 const f=setup();try{f.db.exec('DROP TABLE dossier_node_process_closures');await assert.rejects(f.authority.list(),{message:'Dossier event RPC unavailable'});assert.equal(f.gets(),0);}finally{f.close();}
});

test('a primary closure query failure stays generic and never falls back to RPC',async()=>{
 const f=setup();try{f.setHook(sql=>{if(sql.includes('dossier_node_process_closures'))throw Error('SENSITIVE_CLOSURE_FAILURE_SENTINEL');});await assert.rejects(f.authority.list(),{message:'Dossier event RPC unavailable'});assert.equal(f.gets(),0);}finally{f.close();}
});

test('mismatched or malformed primary closure rows cannot advertise the catalog',async()=>{
 for(const closureResponse of [{grant_id:'other'},{},false]){
  const f=setup({closureResponse});try{await assert.rejects(f.authority.list(),{message:'Dossier event RPC unavailable'});assert.equal(f.gets(),0);}finally{f.close();}
 }
});
