import test from 'node:test';
import assert from 'node:assert/strict';
import {createAgentCapsulePreparation} from '../lib/agent-capsule-preparation.mjs';
import {capsulePreparationFixture,input,authority} from './fixtures/agent-capsule-preparation.mjs';
let read,createHost;
try{({readCapsulePreparationOAuthAuthorization:read,createDelegatedCapsulePreparationOAuthHost:createHost}=await import('../lib/delegated-capsule-preparation-oauth.mjs'));}
catch(e){if(e.code!=='ERR_MODULE_NOT_FOUND')throw e;}
function source(){
 return {auth:{userId:authority.subject,clientId:authority.clientId,audience:authority.resource,scope:['afw:capsule:prepare'],expiresAt:Math.floor(Date.now()/1000)+120,token:'synthetic-credential-never-copy'},
 props:{applicationGrantId:authority.grantId,userId:authority.subject,projectId:authority.projectId}};
}
function project(s){assert.equal(typeof read,'function','missing provider-context projection');return read(s);}
async function use(run){const f=capsulePreparationFixture(createAgentCapsulePreparation);try{await run(f);}finally{f.close();}}
function host(f,opts={}){
 assert.equal(typeof createHost,'function','missing provider-context host');
 f.source=source();f.wall=Date.now();f.mono=0;f.limitCalls=0;
 f.env={AFW_DELEGATED_OAUTH_ENABLED:'true',AFW_DELEGATED_PREPARATION_ENABLED:'true',AFW_OAUTH_SERVICE_MODE:'window',
 AFW_OAUTH_PILOT_EXPIRES_AT:new Date(f.wall+120000).toISOString(),AFW_OAUTH_PILOT_PROJECT_ID:authority.projectId,AFW_OAUTH_PILOT_CLIENT_ID:authority.clientId,
 ACCESS_TEAM_DOMAIN:'synthetic.cloudflareaccess.com',ACCESS_AUD:'synthetic-aud',DB:f.db,OAUTH_KV:{},
 DELEGATED_RATE_LIMITER:{async limit(){f.limitCalls++;await f.afterLimit?.();return {success:true};}}};
 f.make=()=>createHost({env:f.env,resource:authority.resource,getVerifiedContext:()=>f.source,now:()=>f.wall,monotonic:()=>f.mono,...opts});
 f.host=f.make();return f;
}
test('provider projection maps verified seconds to exact milliseconds without credential or extra data',()=>{
 const s=source(),r=project(s);assert.deepEqual(r,{context:{grantId:authority.grantId,subject:authority.subject,clientId:authority.clientId,resource:authority.resource,scopes:['afw:capsule:prepare']},projectId:authority.projectId,tokenExpiresAt:s.auth.expiresAt*1000});
 assert.ok(!JSON.stringify(r).includes(s.auth.token));assert.notEqual(r.context.scopes,s.auth.scope);
});
test('provider projection never reads the credential field',()=>{
 const s=source();let touched=0;Object.defineProperty(s.auth,'token',{get(){touched++;throw Error('SECRET');}});
 assert.ok(project(s));assert.equal(touched,0);
});
test('provider expiry is mandatory integer Unix seconds within representable millisecond time',()=>{
 for(const expiry of [undefined,null,true,'120',NaN,Infinity,-1,0,1.25,8640000000001,Number.MAX_SAFE_INTEGER]){
  const s=source();s.auth.expiresAt=expiry;assert.equal(project(s),null,String(expiry));
 }
 const s=source();s.auth.expiresAt=8640000000000;assert.equal(project(s).tokenExpiresAt,8640000000000000);
});
test('provider projection requires current matching subject and explicit grant/project/client/audience',()=>{
 const changes=[s=>delete s.auth.userId,s=>delete s.auth.clientId,s=>delete s.auth.audience,s=>delete s.props.applicationGrantId,s=>delete s.props.projectId,s=>{s.props.userId='other';},s=>{s.auth.userId='';},s=>{s.props.applicationGrantId='a b';}];
 for(const change of changes){const s=source();change(s);assert.equal(project(s),null);}
});
test('provider projection rejects noncanonical or unsafe audience references',()=>{
 for(const resource of ['http://example.org/mcp','https://example.org/mcp?q=1','https://a:b@example.org/mcp','https://example.org/mcp#x','https://EXAMPLE.org/mcp']){
  const s=source();s.auth.audience=resource;assert.equal(project(s),null);
 }
});
test('scope projection rejects sparse, inherited, accessor and malformed lists',()=>{
 const getter=[];Object.defineProperty(getter,'0',{get(){throw Error('scope accessor');}});getter.length=1;
 for(const scopes of [undefined,'afw:capsule:prepare',new Array(1),getter,[''],['with space'],['a\n'],Array(11).fill('a')]){
  const s=source();s.auth.scope=scopes;assert.equal(project(s),null);
 }
 const s=source();s.auth.scope=[];assert.deepEqual(project(s).context.scopes,[]);
});
test('authority fields must be own data properties and do not invoke accessors',()=>{
 let touches=0;const s=source();Object.defineProperty(s.auth,'userId',{get(){touches++;throw Error('SECRET');}});
 assert.equal(project(s),null);assert.equal(touches,0);
 const t=source();t.props=Object.create(t.props);assert.equal(project(t),null);
 assert.equal(project({auth:source().auth,props:source().props,tokenExpiresAt:Date.now()+100000}),null);
});
test('OAuth bridge stays absent by default without touching server context or clocks',()=>{
 assert.equal(typeof createHost,'function','missing provider-context host');let touched=0;const boom=()=>{touched++;throw Error('SECRET');};
 for(const flag of [undefined,false,true,'false','TRUE'])assert.equal(createHost({env:{AFW_DELEGATED_PREPARATION_ENABLED:flag},getVerifiedContext:boom,now:boom}),null);
 assert.equal(touched,0);
});
test('invalid verified context fails closed before database, limiter or clock use',()=>use(async f=>{
 host(f);delete f.source.auth.expiresAt;
 assert.throws(()=>f.make(),{message:'Preparation host unavailable'});assert.equal(f.reads,0);assert.equal(f.limitCalls,0);assert.equal(f.writes,0);
}));
test('provider bridge composes actual domain preparation and read-only reconciliation once',()=>use(async f=>{
 host(f);const r=await f.host.prepare(input);assert.equal(r.code,'prepared');
 const replay=await f.host.reconcile(input);assert.equal(replay.code,'prepared');assert.deepEqual(replay.preparation,r.preparation);
 assert.deepEqual(f.counts(),{intents:1,capsules:1,events:1});assert.equal(f.limitCalls,2);
 assert.ok(!JSON.stringify([r,replay]).includes(f.source.auth.token));
}));
test('verified read-only scope is not converted into preparation consent',()=>use(async f=>{
 host(f);f.source.auth.scope=['afw:project:read'];f.host=f.make();
 assert.equal((await f.host.prepare(input)).code,'insufficient_scope');assert.equal(f.writes,0);assert.equal(f.reads,0);
}));
test('changed provider identity, expiry or object references across limiter await invalidates captured host',async()=>{
 for(const change of [f=>{f.source.auth.scope=[];},f=>{f.source.props.projectId='other';},f=>{f.source.auth.expiresAt++;},f=>{f.source.auth={...f.source.auth};},f=>{f.source.props={...f.source.props};}]){
  await use(async f=>{
   host(f);const auth=f.source.auth,props=f.source.props,scope=[...auth.scope],expiry=auth.expiresAt;f.afterLimit=()=>change(f);
   assert.equal((await f.host.prepare(input)).code,'unavailable');assert.deepEqual(f.counts(),{intents:0,capsules:0,events:0});
   f.afterLimit=null;f.source={auth,props};auth.scope=scope;auth.expiresAt=expiry;props.projectId=authority.projectId;
   assert.equal((await f.host.prepare(input)).code,'unavailable','restoring context does not revive old request host');
  });
 }
});
test('provider drift after reservation produces unknown ACK and preserves an unregenerated intent',()=>use(async f=>{
 host(f);f.after=async(q,op)=>{if(op==='run'&&q.includes('INSERT INTO agent_capsule_preparations'))f.source.props.userId='other';};
 assert.equal((await f.host.prepare(input)).code,'unknown_ack');assert.deepEqual(f.counts(),{intents:1,capsules:0,events:0});assert.equal(f.batches,0);
}));
test('clock callbacks cannot change provider authority between before and after fences',()=>use(async f=>{
 let ticks=0;host(f,{monotonic:()=>{if(++ticks===2)f.source.auth.scope=[];return 0;}});
 assert.equal((await f.host.prepare(input)).code,'unavailable');assert.equal(f.reads,0);assert.equal(f.writes,0);
}));
test('server-context errors remain sanitized and no credential accessor is touched by the bridge',()=>use(async f=>{
 host(f);let touched=0;Object.defineProperty(f.source.auth,'token',{get(){touched++;throw Error('SECRET token');}});
 f.host=f.make();assert.equal((await f.host.prepare(input)).code,'prepared');assert.equal(touched,0);
 f.source={get auth(){throw Error('SECRET context');},props:f.source.props};
 assert.throws(()=>f.make(),{message:'Preparation host unavailable'});assert.equal(touched,0);
}));

test('resolver-boundary source drift or exception permanently closes the same request host',async()=>{
 for(const failure of ['scope','exception'])await use(async f=>{
  let armed=false,reads=0;
  host(f,{getVerifiedContext:()=>{
   // Fault injection after the clock fence reads, at authority resolution.
   if(armed&&++reads===5){
    if(failure==='scope')f.source.auth.scope=[];
    else throw Error('SECRET provider context failure');
   }
   return f.source;
  }});
  armed=true;assert.equal((await f.host.prepare(input)).code,'unavailable');
  assert.deepEqual(f.counts(),{intents:0,capsules:0,events:0});
  armed=false;f.source.auth.scope=['afw:capsule:prepare'];
  assert.equal((await f.host.prepare(input)).code,'unavailable','observed authority failure must never revive on this host');
  assert.equal((await f.host.reconcile(input)).code,'unavailable');
  assert.deepEqual(f.counts(),{intents:0,capsules:0,events:0});
 });
});
