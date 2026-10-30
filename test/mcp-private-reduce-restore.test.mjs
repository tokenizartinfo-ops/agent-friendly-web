import {withChallengedCustody} from './fixtures/challenged-custody.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {restorationFixture,fixtureConfigHash} from './fixtures/canary-restoration.mjs';
const load=()=>import('../lib/mcp-hosted-canary-restoration.mjs');
const SLOT='afw-own-successor-closure-v1';
function fixture(settings){
 const f=restorationFixture(settings);let originalReads=0,instanceReads=0;const flags={original:true,running:false};
 const original={...f.options.namespace,get:id=>{if(id.toString()!==f.policy.candidate.containerId)throw Error('Wrong original');return withChallengedCustody({observeSuccessorRetired:async()=>{originalReads++;if(!flags.original)throw Error('Original context removed');return{purpose:'afw.node-retirement-observation.v1',containerId:f.policy.candidate.containerId,programHash:f.policy.candidate.programHash,sourceRevision:f.policy.candidate.sourceRevision,processGeneration:'d'.repeat(64),image:'cloudflare/debian-trixie',createdAt:f.at-60000,expiresAt:f.at-10000,closedAt:f.at-20000,observedAt:f.options.now(),physicalStopVerified:false,mayStartSuccessor:false};}},f.options.now,'successor');}};
 const ctx={storage:f.storage,id:{toString:()=>'9'.repeat(64)}};
 const env={AFW_INDEPENDENT_CLOSURE:{idFromName:name=>{if(name!==SLOT)throw Error('Wrong private slot');return{toString:()=>'9'.repeat(64)};}},AFW_MCP_CLOSURE_ENABLED:'true',AFW_MCP_CLOSURE_POLICY:f.control.policy,AFW_MCP_CLOSURE_NODE:original,AFW_MCP_CLOSURE_READ_TOKEN:'synthetic-reader-token',AFW_MCP_CLOSURE_PUBLISH_TOKEN:'synthetic-publisher-token'};
 const calls=[];
 const options={ctx,env,now:f.options.now,fetchImpl:async(url,init)=>{
  calls.push({url,init});const u=new URL(url);assert.equal(u.origin,'https://api.cloudflare.com');
  assert.equal(init.headers.Authorization,init.method==='POST'?'Bearer synthetic-publisher-token':'Bearer synthetic-reader-token');
  if(u.pathname.endsWith('/instances/'+f.policy.candidate.containerId)){instanceReads++;return Response.json({success:true,errors:[],result:{id:f.policy.candidate.containerId,application_id:f.policy.candidate.applicationId,image:'cloudflare/debian-trixie',started_at:new Date(f.at-50000).toISOString(),status:{state:flags.running?'running':'stopped',exit_code:0,updated_at:new Date(f.at-21000).toISOString()}}});}
  const r=await f.request({method:init.method,path:u.pathname.replace('/client/v4',''),query:Object.fromEntries([...u.searchParams].map(([k,v])=>[k,k==='per_page'?Number(v):v])),body:init.body?JSON.parse(init.body):undefined});const{status,...body}=r;return Response.json(body,{status});
 }};
 return{f,ctx,env,options,calls,flags,hash:createHash('sha256').update(env.AFW_MCP_CLOSURE_POLICY).digest('hex'),get originalReads(){return originalReads;},get instanceReads(){return instanceReads;}};
}
function reductionFixture(options){
 const x=fixture(options),raw=JSON.stringify({purpose:'afw.private-permission-withdrawal.v1',requestId:'22222222-2222-4222-8222-222222222222',
 startAt:x.f.at-1000,expiresAt:x.f.at+120000,originalConsent:{sequence:1,revision:1,issuedAt:x.f.at-60000,expiresAt:x.f.at+120000},
 containerId:x.f.policy.candidate.containerId,programHash:x.f.policy.candidate.programHash,sourceRevision:x.f.policy.candidate.sourceRevision}),withdrawalHash=createHash('sha256').update(raw).digest('hex');
 x.env.AFW_MCP_CLOSURE_REDUCTION_ENABLED='true';
 x.env.AFW_MCP_CLOSURE_REDUCTION_POLICY_HASH=withdrawalHash;
 x.f.state.live.bindings.push({name:'AFW_DOSSIER_PERMISSION_WITHDRAWAL_ENABLED',type:'plain_text',text:'true'},{name:'AFW_DOSSIER_PERMISSION_WITHDRAWAL_POLICY',type:'plain_text',text:raw});
 x.f.policy.live.configurationHash=fixtureConfigHash(x.f.state.live);x.f.savePolicy();x.env.AFW_MCP_CLOSURE_POLICY=x.f.control.policy;
 x.hash=createHash('sha256').update(x.env.AFW_MCP_CLOSURE_POLICY).digest('hex');x.withdrawalHash=withdrawalHash;
 let reductions=0;const get=x.env.AFW_MCP_CLOSURE_NODE.get;
 x.env.AFW_MCP_CLOSURE_NODE.get=id=>({...get(id),withdrawPermissionsForPlan:async boundary=>{
  assert.equal(boundary.policyHash,withdrawalHash);assert.ok(boundary.expiresAt>x.f.options.now()&&boundary.expiresAt-x.f.options.now()<=30000);
  reductions++;return{purpose:'afw.own-permission-withdrawal.v1',monitoringWithdrawn:true,readWithdrawn:true,permissionsWithdrawn:true,runtimeStopRequested:true,physicalStopVerified:false,nativeWithdrawalVerified:false,operationalReadiness:false};
 }});
 x.reductions=()=>reductions;return x;
}
test('private reduction pins current deployment and policy then journals a single original RPC',async()=>{
 const {createPrivateCanaryRestorationHost}=await load(),x=reductionFixture(),h=createPrivateCanaryRestorationHost(x.options);
 assert.equal((await h.arm(x.hash)).status,'armed');
 const r=await h.reduce(x.hash,x.withdrawalHash);assert.equal(r.status,'permissions_reduced');
 assert.equal(r.nativeWithdrawalVerified,false);assert.equal(r.operationalReadiness,false);assert.equal(x.reductions(),1);assert.equal(x.f.posts,0);
 assert.ok(x.calls.length>=4);
 assert.equal((await h.restore(x.hash)).status,'restored_observed');assert.equal(x.f.posts,1);
 const next=createPrivateCanaryRestorationHost(x.options);assert.equal((await next.reduce(x.hash,x.withdrawalHash)).status,'permissions_reduced');
 assert.equal((await next.restore(x.hash)).status,'restored_observed');assert.equal(x.reductions(),1);assert.equal(x.f.posts,1);
});
for(const mode of ['off','wrong-hash','deployment-drift','code-drift','policy-drift','operator-active']){
 test('private reduction denies '+mode+' before original RPC',async()=>{
  const {createPrivateCanaryRestorationHost}=await load(),x=reductionFixture(),h=createPrivateCanaryRestorationHost(x.options);await h.arm(x.hash);
  if(mode==='off')x.env.AFW_MCP_CLOSURE_REDUCTION_ENABLED='false';
  if(mode==='wrong-hash')x.env.AFW_MCP_CLOSURE_REDUCTION_POLICY_HASH='0'.repeat(64);
  if(mode==='deployment-drift')x.f.state.canary.id='77777777-7777-4777-8777-777777777777';
  if(mode==='code-drift')x.f.state.live.modules[0].content_base64=Buffer.from('foreign').toString('base64');
  if(mode==='policy-drift')x.f.state.live.bindings.find(b=>b.name==='AFW_DOSSIER_PERMISSION_WITHDRAWAL_POLICY').text='{}';
  if(mode==='operator-active')x.f.state.operatorVersion.bindings[0].text='true';
  const r=await h.reduce(x.hash,x.withdrawalHash);assert.equal(r.status,'blocked');assert.equal(x.reductions(),0);assert.equal(x.f.posts,0);
 });
}
test('unknown original RPC ACK is durable and never authorizes automatic replay or restore',async()=>{
 const {createPrivateCanaryRestorationHost}=await load(),x=reductionFixture(),get=x.env.AFW_MCP_CLOSURE_NODE.get;
 x.env.AFW_MCP_CLOSURE_NODE.get=id=>{const s=get(id);return{...s,withdrawPermissionsForPlan:async p=>{await s.withdrawPermissionsForPlan(p);throw Error('ACK lost');}};};
 const h=createPrivateCanaryRestorationHost(x.options);await h.arm(x.hash);
 assert.equal((await h.reduce(x.hash,x.withdrawalHash)).status,'uncertain');assert.equal(x.reductions(),1);
 assert.equal((await createPrivateCanaryRestorationHost(x.options).reduce(x.hash,x.withdrawalHash)).status,'uncertain');assert.equal(x.reductions(),1);assert.equal(x.f.posts,0);
});
test('withdrawing control during preflight prevents later RPC',async()=>{
 const {createPrivateCanaryRestorationHost}=await load(),x=reductionFixture();let release,enter;
 const pending=new Promise(r=>{release=r;}),seen=new Promise(r=>{enter=r;}),fetch=x.options.fetchImpl;
 x.options.fetchImpl=async(...args)=>{enter();await pending;return fetch(...args);};
 const h=createPrivateCanaryRestorationHost(x.options);await h.arm(x.hash);const op=h.reduce(x.hash,x.withdrawalHash);await seen;
 await h.withdraw(x.hash);release();const r=await op;assert.notEqual(r.status,'permissions_reduced');assert.equal(x.reductions(),0);assert.equal(x.f.posts,0);
});
test('workflow reduction is an explicit no-retry stage before restoration',async()=>{
 const {runPrivateCanaryRestorationWorkflow}=await load(),x=reductionFixture(),calls=[];
 x.env.AFW_INDEPENDENT_CLOSURE.get=()=>({
  armOwnCanaryClosure:async()=>({status:'armed'}),
  readOwnCanaryClosureControl:async()=>({status:'armed',planHash:x.hash}),
  reduceOwnCanaryPermissions:async(...args)=>{calls.push(['reduce',...args]);return{status:'permissions_reduced',nativeWithdrawalVerified:false,operationalReadiness:false};},
  restoreOwnCanary:async h=>{calls.push(['restore',h]);return{status:'restored_observed',observedAt:x.f.options.now(),nativeWithdrawalVerified:false,operationalReadiness:false};}
 });
 const steps=[],step={do:async(name,settings,fn)=>{steps.push(settings);return fn();}};
 const event={payload:{operation:'mcp_canary_reduce_restore',policyHash:x.hash,withdrawalPolicyHash:x.withdrawalHash}};
 const r=await runPrivateCanaryRestorationWorkflow({env:x.env,event,step,now:x.f.options.now});
 assert.equal(r.status,'restored_observed');assert.deepEqual(calls,[['reduce',x.hash,x.withdrawalHash],['restore',x.hash]]);
 assert.ok(steps.every(s=>s.retries.limit===0&&s.timeout<=35000));
 calls.length=0;x.env.AFW_INDEPENDENT_CLOSURE.get=()=>({armOwnCanaryClosure:async()=>({status:'armed'}),readOwnCanaryClosureControl:async()=>({status:'armed',planHash:x.hash}),reduceOwnCanaryPermissions:async()=>({status:'uncertain'})});
 assert.equal((await runPrivateCanaryRestorationWorkflow({env:x.env,event,step,now:x.f.options.now})).status,'uncertain');assert.equal(calls.length,0);
});

for(const target of ['canary','operator'])test('pointer drift during issued journal commit stops original RPC: '+target,async()=>{
 const {createPrivateCanaryRestorationHost}=await load(),x=reductionFixture(),base=x.ctx.storage.transaction;
 x.ctx.storage.transaction=async fn=>{
  const result=await Reflect.apply(base,x.ctx.storage,[fn]);
  if(x.ctx.storage.rows.get('afw.private-reduction-dispatch.v1')?.phase==='issued')x.f.state[target].id='77777777-7777-4777-8777-777777777777';
  return result;
 };
 const h=createPrivateCanaryRestorationHost(x.options);await h.arm(x.hash);
 assert.equal((await h.reduce(x.hash,x.withdrawalHash)).status,'uncertain');assert.equal(x.reductions(),0);assert.equal(x.f.posts,0);
 assert.equal((await createPrivateCanaryRestorationHost(x.options).reduce(x.hash,x.withdrawalHash)).status,'uncertain');assert.equal(x.reductions(),0);
});
test('dispatch intersects a shorter original expiry through the real withdrawal host and custody',async()=>{
 const [{createPrivateCanaryRestorationHost},{withdrawOwnPermissions},{createOwnDurableEventHost},{fixture:ownFixture}]=await Promise.all([
  load(),import('../lib/mcp-own-permission-withdrawal-host.mjs'),import('../lib/mcp-own-durable-host.mjs'),import('./fixtures/mcp-own-durable-host.mjs')]);
 const original=ownFixture();original.grant();
 try{
  const x=reductionFixture({at:Date.now()}),c=original.db.prepare("SELECT * FROM dossier_monitoring_consent_events WHERE action='grant'").get();
  const program=original.config.program,sourceRevision=original.config.sourceRevision,id=original.config.ctx.id;
  const programHash=createHash('sha256').update(program).digest('hex');
  x.f.policy.candidate.programHash=programHash;
  const policy={purpose:'afw.private-permission-withdrawal.v1',requestId:'22222222-2222-4222-8222-222222222222',startAt:Date.now()-500,expiresAt:Date.now()+10000,
   originalConsent:{sequence:c.sequence,revision:c.revision,issuedAt:c.issued_at,expiresAt:c.expires_at},containerId:id.toString(),programHash,sourceRevision};
  const raw=JSON.stringify(policy),hash=createHash('sha256').update(raw).digest('hex'),ctx=original.config.ctx;
  const ns={idFromName:()=>id,idFromString:()=>id,get:()=>{throw Error('unexpected');}};
  const env={AFW_DOSSIER_PERMISSION_WITHDRAWAL_ENABLED:'true',AFW_DOSSIER_PERMISSION_WITHDRAWAL_POLICY:raw,
   AFW_DOSSIER_EVENTS_ENABLED:'false',AFW_DOSSIER_EVENTS_POLICY:JSON.stringify({grantId:'g',subject:'owner',projectId:'p',clientId:'client',resource:original.config.context.resource,...original.config.window}),
   AFW_DOSSIER_EVENTS_NODE_NAME:'afw-own-event-first-successor-v1',AFW_DOSSIER_EVENTS_NODE:ns,
   AFW_OAUTH_ISSUER:'https://private.invalid',AFW_OAUTH_RESOURCE:original.config.context.resource,AFW_OAUTH_PILOT_CLIENT_ID:'client',AFW_OAUTH_PILOT_PROJECT_ID:'p',
   DB:{...original.config.db,withSession:()=>original.config.db}};
  x.f.state.live.bindings.find(b=>b.name==='AFW_DOSSIER_PERMISSION_WITHDRAWAL_POLICY').text=raw;
  x.f.policy.live.configurationHash=fixtureConfigHash(x.f.state.live);x.f.savePolicy();x.env.AFW_MCP_CLOSURE_POLICY=x.f.control.policy;
  x.hash=createHash('sha256').update(x.env.AFW_MCP_CLOSURE_POLICY).digest('hex');x.withdrawalHash=hash;x.env.AFW_MCP_CLOSURE_REDUCTION_POLICY_HASH=hash;
  let seen;
  x.env.AFW_MCP_CLOSURE_NODE.get=()=>({withdrawPermissionsForPlan:async boundary=>{
   seen=boundary;return withdrawOwnPermissions({env,ctx,program,sourceRevision,now:Date.now,
    close:(signal,assertCurrent,expiresAt)=>createOwnDurableEventHost(original.config).close({signal,assertCurrent,expiresAt})},boundary);
  }});
  const h=createPrivateCanaryRestorationHost(x.options);await h.arm(x.hash);
  assert.equal((await h.reduce(x.hash,hash)).status,'permissions_reduced');
  assert.equal(seen.expiresAt,policy.expiresAt);
  assert.ok(original.db.prepare("SELECT revoked_at FROM delegated_access_grants WHERE id='g'").get().revoked_at);
  assert.equal(original.db.prepare("SELECT COUNT(*) AS n FROM dossier_monitoring_consent_events WHERE action='revoke'").get().n,1);
  assert.equal(original.boots(),0);
 }finally{original.close();}
});
test('malformed or expired original policy is denied before dispatch is reserved',async()=>{
 const {createPrivateCanaryRestorationHost}=await load();
 for(const mode of ['malformed','expired']){
  const x=reductionFixture(),binding=x.f.state.live.bindings.find(b=>b.name==='AFW_DOSSIER_PERMISSION_WITHDRAWAL_POLICY');
  const p=JSON.parse(binding.text);binding.text=mode==='malformed'?'{}':JSON.stringify({...p,startAt:x.f.at-2000,expiresAt:x.f.at-1000});
  x.withdrawalHash=createHash('sha256').update(binding.text).digest('hex');x.env.AFW_MCP_CLOSURE_REDUCTION_POLICY_HASH=x.withdrawalHash;
  x.f.policy.live.configurationHash=fixtureConfigHash(x.f.state.live);x.f.savePolicy();x.env.AFW_MCP_CLOSURE_POLICY=x.f.control.policy;x.hash=createHash('sha256').update(x.env.AFW_MCP_CLOSURE_POLICY).digest('hex');
  const h=createPrivateCanaryRestorationHost(x.options);await h.arm(x.hash);assert.equal((await h.reduce(x.hash,x.withdrawalHash)).status,'blocked');
  assert.equal(x.ctx.storage.rows.has('afw.private-reduction-dispatch.v1'),false);assert.equal(x.reductions(),0);
 }
});
