import test from 'node:test';
import assert from 'node:assert/strict';
import {namedDataPacketFixture,packetHash} from './fixtures/qa-named-data-packet.mjs';
import {createPrivateQaGenerationLedger} from '../lib/mcp-qa-generation-ledger.mjs';
import {HEAD,INFO} from './fixtures/qa-generation-ledger.mjs';
import {PRIVATE_QA_CLOSED_FLAGS} from '../lib/mcp-qa-closed-context.mjs';
const api=await import('../lib/mcp-qa-named-preflight.mjs').catch(()=>({}));
const actor='f'.repeat(64),revision='a'.repeat(40),policies=['AFW_QA_HTTP_POLICY','AFW_QA_PREREGISTRATION','AFW_QA_CHALLENGE_IDENTITY','AFW_MCP_CLOSURE_POLICY','AFW_MCP_READER_PROBE_POLICY','AFW_MCP_PUBLISHER_PROBE_POLICY','AFW_MCP_CLOSURE_DISPATCH_POLICY'];
async function fixture(){
 const p=namedDataPacketFixture(),f=p.f;const armed=await createPrivateQaGenerationLedger(f.options()).arm();assert.equal(armed.status,'armed');
 Object.assign(f.env,Object.fromEntries(PRIVATE_QA_CLOSED_FLAGS.map(k=>[k,'false'])),Object.fromEntries(policies.map(k=>[k,''])),{AFW_INDEPENDENT_CLOSURE:{idFromName:n=>{assert.equal(n,'afw-own-successor-closure-v1');return{toString:()=>actor};}},AFW_MCP_CLOSURE_NODE:p.namespace});
 let reads=0;const db={prepare(){throw Error('ordinary prepare forbidden');},withSession(mode){assert.equal(mode,'first-primary');return{prepare(sql){assert.equal(sql,'SELECT packet_json FROM afw_qa_named_packets_v1 WHERE generation_plan_hash=? LIMIT 1');return{bind(key){assert.equal(key,armed.planHash);return{async first(){reads++;return{packet_json:JSON.stringify(p.packet)};}};}};}};}};
 f.env.AFW_QA_DB=db;
 for(const k of ['AFW_QA_DOSSIER_DB','AFW_MCP_CLOSURE_READ_TOKEN','AFW_MCP_CLOSURE_PUBLISH_TOKEN'])Object.defineProperty(f.env,k,{get(){throw Error('forbidden dependency');}});
 const options={env:f.env,ctx:{storage:f.storage,id:{toString:()=>actor}},sourceRevision:revision,artifactContext:{artifact:p.artifact,receipt:p.receipt},now:f.now,timeoutMs:5000};
 return{p,f,armed,options,get reads(){return reads;}};
}
const make=o=>{assert.equal(typeof api.createPrivateQaNamedPreflight,'function','mounted diagnostic required');return api.createPrivateQaNamedPreflight(o);};
async function read(x,input=x.p.f.capsule.bundleHash){const raw=await make(x.options).read(input);assert.equal(typeof raw,'string');assert.ok(Buffer.byteLength(raw)<=2048);const r=JSON.parse(raw);for(const k of ['authorizesEffects','guardLivenessVerified','operationalReadiness','mayRetry'])assert.equal(r[k],false);return r;}
test('private packet diagnostic joins current HEAD and exact packet without effects or content disclosure',async()=>{
 const x=await fixture(),before=structuredClone([...x.f.rows]),puts=x.f.storage.puts,r=await read(x);assert.equal(r.status,'observed');assert.equal(r.namedBundleHash,x.f.capsule.bundleHash);assert.equal(r.generationPlanHash,x.armed.planHash);assert.equal(r.packetHash,packetHash(JSON.stringify(x.p.packet)));assert.equal(r.configurationProfile,'closed');assert.equal(r.runtimeVersionId,x.f.env.AFW_QA_VERSION.id);assert.equal(r.sourceRevision,revision);assert.equal(x.reads,1);assert.deepEqual([...x.f.rows],before);assert.equal(x.f.storage.puts,puts);
 const raw=JSON.stringify(r);for(const denied of ['packet-fixture-grant','script','cancellationHistory','namedPolicy','predecessor'])assert.equal(raw.includes(denied),false);
});
test('missing compiled context fails before any primary/D1 access',async()=>{const x=await fixture();x.options.artifactContext=null;const n=x.f.storage.transactions;assert.equal((await read(x)).status,'blocked');assert.equal(x.f.storage.transactions,n);assert.equal(x.reads,0);});
for(const input of ['',null,{},'F'.repeat(64),'0'.repeat(64)])test('invalid or unrelated bundle hash never selects arbitrary INFO '+JSON.stringify(input),async()=>{const x=await fixture();assert.equal((await read(x,input)).status,'blocked');assert.equal(x.reads,0);});
test('generation hash cannot substitute for bundle hash',async()=>{const x=await fixture();assert.equal((await read(x,x.armed.planHash)).status,'blocked');assert.equal(x.reads,0);});
test('prepared-idle configuration is explicit and never allClosed',async()=>{const x=await fixture();for(const k of ['AFW_MCP_CLOSURE_ENABLED','AFW_MCP_CLOSURE_DISPATCH_ENABLED','AFW_MCP_CLOSURE_REDUCTION_ENABLED'])x.f.env[k]='true';const r=await read(x);assert.equal(r.status,'observed');assert.equal(r.configurationProfile,'prepared_idle');assert.equal(r.allClosed,false);});
for(const wrong of ['partial-profile','unknown-flag','legacy-policy','withdrawn','info-drift','wrong-artifact','crossed-packet','foreign-actor'])test('diagnostic blocks '+wrong,async()=>{
 const x=await fixture();
 if(wrong==='partial-profile')x.f.env.AFW_MCP_CLOSURE_ENABLED='true';
 if(wrong==='unknown-flag')x.f.env.AFW_QA_UNREVIEWED_ENABLED='true';
 if(wrong==='legacy-policy')x.f.env.AFW_MCP_CLOSURE_POLICY='{}';
 if(wrong==='withdrawn')await createPrivateQaGenerationLedger(x.f.options()).withdraw();
 if(wrong==='info-drift')x.f.rows.get(INFO+x.armed.planHash).capsule='{}';
 if(wrong==='wrong-artifact')x.options.artifactContext.artifact={...x.p.artifact,script:'foreign'};
 if(wrong==='crossed-packet')x.p.packet.generationCapsule='{}';
 if(wrong==='foreign-actor')x.options.ctx.id={toString:()=> 'e'.repeat(64)};
 assert.equal((await read(x)).status,'blocked');
});
for(const wrong of ['version','namespace','db','source','flags','deadline'])test('mutation after primary packet await rejects '+wrong,async()=>{
 const x=await fixture(),original=x.f.env.AFW_QA_DB;
 x.f.env.AFW_QA_DB={prepare:original.prepare,withSession(mode){const s=original.withSession(mode);return{prepare(sql){const st=s.prepare(sql);return{bind(key){const b=st.bind(key);return{async first(){const result=await b.first();if(wrong==='version')x.f.env.AFW_QA_VERSION={id:x.f.env.AFW_QA_VERSION.id};if(wrong==='namespace')x.f.env.AFW_MCP_CLOSURE_NODE={};if(wrong==='db')x.f.env.AFW_QA_DB={};if(wrong==='source')x.options.sourceRevision='b'.repeat(40);if(wrong==='flags')x.f.env.AFW_QA_HTTP_ENABLED='true';if(wrong==='deadline')x.f.setNow(x.f.now()+5000);return result;}};}};}};}};
 assert.equal((await read(x)).status,'blocked');
});
test('a hung packet reader cannot restart the original budget',async()=>{const x=await fixture();let release;const gate=new Promise(r=>{release=r;});x.options.timeoutMs=25;x.f.env.AFW_QA_DB={prepare(){},withSession(){return{prepare(){return{bind(){return{first:()=>gate};}};}};}};const promise=read(x);try{assert.equal((await promise).status,'blocked');}finally{release({packet_json:JSON.stringify(x.p.packet)});}});
test('post-success settlement rechecks the original lease',async()=>{const x=await fixture(),race=Promise.race;let changed=false;Promise.race=function(v){return Reflect.apply(race,this,[v]).then(r=>{if(!changed&&typeof r==='string'&&r.includes('"status":"observed"')){changed=true;x.f.setNow(x.f.now()+5000);}return r;});};try{assert.equal((await read(x)).status,'blocked');assert.equal(changed,true);}finally{Promise.race=race;}});
test('extra RPC arguments do not grant an alternate path',async()=>{const x=await fixture();assert.equal(JSON.parse(await make(x.options).read(x.f.capsule.bundleHash,{})).status,'blocked');assert.ok(x.f.rows.has(HEAD));});

for(const point of [1,3])test('context validation time belongs to original lease before primary IO: '+point,async()=>{
 const x=await fixture(),base=x.options.artifactContext;let calls=0,advanced=false;
 x.options.artifactContext=new Proxy(base,{ownKeys(t){if(++calls===point){advanced=true;x.f.setNow(x.f.now()+5000);}return Reflect.ownKeys(t);}});
 const before=x.f.storage.transactions,r=await read(x);assert.equal(advanced,true);assert.equal(r.status,'blocked');assert.equal(x.f.storage.transactions,before);assert.equal(x.reads,0);
});
