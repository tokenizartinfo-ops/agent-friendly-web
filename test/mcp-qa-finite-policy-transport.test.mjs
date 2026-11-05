import test from 'node:test';
import assert from 'node:assert/strict';
import {setup} from './fixtures/finite-transport-native.mjs';
test('actual consumed owner approval without original native cleanup capsule remains pending and has no SEND/POST',async t=>{
 const f=await setup(t),screen=await f.screen(),r=await f.publish(screen);
 assert.deepEqual(r,{status:'admin_pending',mayRetry:false,operationalReadiness:false});assert.equal(f.posts(),0);
 const rows=await f.json('/fixture/rows',{});assert.equal(rows.filter(([k])=>k.endsWith(':connection:approval')).length,1);
 assert.equal(rows.filter(([k])=>k.startsWith('owner-ticket:')&&k.endsWith(':use')).length,1);
 assert.equal(rows.filter(([k])=>k.startsWith('afw.finite-policy-effect.v1:')).length,0);
 assert.equal((await f.publish(screen)).status,'admin_pending');assert.equal(f.posts(),0);
 assert.deepEqual(await f.json('/fixture/rows',{}),rows);
});
for(const mode of ['lost','late','not_found','unexpected_reconciliation','foreign','held_claim','extra_binding','namespace','wrong_secret'])test('owner boundary '+mode+' never reaches retired upload segment without original capsule',async t=>{
 const f=await setup(t,mode);assert.equal((await f.publish(await f.screen())).status,'admin_pending');assert.equal(f.posts(),0);
 assert.equal((await f.json('/fixture/rows',{})).filter(([k])=>k.startsWith('afw.finite-policy-effect.v1:')).length,0);
});
import {qualifyFiniteConnectionProfile} from '../lib/mcp-qa-finite-connection-profile.mjs';
import {syntheticPreparation} from './fixtures/finite-connection-source.mjs';
test('Task3 preparation grammar preserves Access/limiter and closed business flags in each exact phase',()=>{
 const source={clientId:'SYNTHETIC_CLIENT',project:{projectId:'SYNTHETIC_PROJECT'},access:{audience:'SYNTHETIC_AUD',teamDomain:'synthetic.cloudflareaccess.com'},window:{expiresAt:1000000}};
 for(const phase of ['closed_ui','read_consent']){
  const metadata=syntheticPreparation(phase,source),r=qualifyFiniteConnectionProfile({phase,metadata});
  assert.deepEqual(r,metadata);assert(Object.isFrozen(r));
  for(const mutate of [v=>v.bindings.pop(),v=>v.bindings.push({name:'UNAPPROVED',type:'plain_text',text:'x'}),v=>v.bindings.find(b=>b.name==='AFW_DOSSIER_EVENTS_ENABLED').text='true',v=>delete v.exports.AfwOwnEventNode.container]){
   const v=structuredClone(metadata);mutate(v);assert.throws(()=>qualifyFiniteConnectionProfile({phase,metadata:v}));
  }
 }
 assert.throws(()=>qualifyFiniteConnectionProfile({phase:'finite_prearm',metadata:syntheticPreparation('closed_ui',source)}));
});

test('Task3 original parent finish retains actual pending source work even without a durable SEND',async t=>{
 const f=await setup(t,'held_source');
 assert.equal((await f.publish(await f.screen())).status,'admin_pending');assert.equal(f.posts(),0);
 assert.deepEqual(await f.json('/fixture/source-hold-state',{}),{used:true,settled:false});
 assert.equal((await f.publish(await f.screen())).status,'admin_pending');assert.equal(f.posts(),0);
 assert.equal((await f.json('/fixture/rows',{})).filter(([k])=>k.endsWith(':send')).length,0);
 await new Promise(r=>setTimeout(r,1400));
 assert.deepEqual(await f.json('/fixture/source-hold-state',{}),{used:true,settled:true});
 assert.equal(f.posts(),0);assert.equal((await f.json('/fixture/rows',{})).filter(([k])=>k.endsWith(':send')).length,0);
});

import {build} from 'esbuild';
import {readFile} from 'node:fs/promises';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
import {createHash} from 'node:crypto';
async function versionRoleHarness(t){
 // Test-only exposure of the private engine; no public role/configuration API.
 const entry=`import {fixedPolicyEngine} from './lib/mcp-qa-finite-policy-transport.mjs';
 export default {async fetch(request,env){
  const {pin,closed,wire}=await request.json(),lease={signal:new AbortController().signal,assertCurrent(){}};
  const engine=fixedPolicyEngine({ctx:{},env},()=>{});
  try{if(wire)engine.wire(pin.configuration,pin.versionId,new Uint8Array([1]));else await engine.readVersion(pin,lease,closed);return Response.json({accepted:true});}
  catch{return Response.json({accepted:false});}
 }};`;
 const compiled=await build({stdin:{contents:entry,resolveDir:process.cwd()},bundle:true,write:false,format:'esm',platform:'neutral',mainFields:['module','main'],external:['node:*','cloudflare:*'],plugins:[{name:'private-engine-test-only',setup(b){b.onLoad({filter:/mcp-qa-finite-policy-transport\.mjs$/},async args=>({contents:(await readFile(args.path,'utf8'))+'\nexport {fixedPolicyEngine};',resolveDir:process.cwd()+'/lib',loader:'js'}));}}]});
 let metadata,writes=0,gets=0;
 const mf=new Miniflare(convertV4MiniflareOptions({modules:true,script:compiled.outputFiles[0].text,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],bindings:{AFW_MCP_CLOSURE_READ_TOKEN:'SYNTHETIC_READER_00000000000000',AFW_MCP_CLOSURE_PUBLISH_TOKEN:'SYNTHETIC_PUBLISHER_000000000000'},outboundService:request=>{if(request.method!=='GET'){writes++;throw Error('write forbidden');}gets++;return Response.json({success:true,errors:[],messages:[],result:metadata});}}));
 t.after(()=>mf.dispose());
 const script='export default {}',descriptor={name:'index.mjs',sha256:createHash('sha256').update(script).digest('hex'),bytes:Buffer.byteLength(script)},versionId='22222222-2222-4222-8222-222222222222';
 const candidate=syntheticPreparation('closed_ui',{clientId:'SYNTHETIC_CLIENT',project:{projectId:'SYNTHETIC_PROJECT'},access:{audience:'SYNTHETIC_AUD',teamDomain:'synthetic.cloudflareaccess.com'},window:{expiresAt:1000000}});
 const historical=structuredClone(candidate);historical.compatibility_flags=['nodejs_compat','global_fetch_strictly_public'];
 return {candidate,historical,counts:()=>({writes,gets}),async read(actual,expected,closed=false,wire=false){
  metadata={...actual,id:versionId,urls:[],modules:[{name:'index.mjs',content_type:'application/javascript+module',content_base64:Buffer.from(script).toString('base64')}]};
  return (await mf.dispatchFetch('https://fixture.invalid',{method:'POST',body:JSON.stringify({pin:{versionId,module:descriptor,configuration:expected},closed,wire})})).json();
 }};
}
test('read_version_current_candidate_and_historical_rollback',async t=>{
 const f=await versionRoleHarness(t);
 assert.deepEqual(await f.read(f.candidate,f.candidate),{accepted:true});
 assert.deepEqual(await f.read(f.historical,f.historical,true),{accepted:true});
 assert.deepEqual(f.counts(),{writes:0,gets:2});
});
test('wrong_role_denied_before_mutation',async t=>{
 const f=await versionRoleHarness(t);
 for(const closed of [false,true]){
  const right=closed?f.historical:f.candidate,wrong=closed?f.candidate:f.historical;
  for(const [actual,pin]of [[wrong,right],[right,wrong],[wrong,wrong]])assert.deepEqual(await f.read(actual,pin,closed),{accepted:false});
 }
 assert.deepEqual(await f.read(f.historical,f.historical,false,true),{accepted:false},'wire remains candidate-only');
 assert.deepEqual(f.counts(),{writes:0,gets:6});
});

test('T1 known failure retains real cancellation',async t=>{
 const fresh=await readFile('lib/mcp-qa-finite-fixed-policy-engine.mjs','utf8').then(()=>true,()=>false);
 const entry=`import {${fresh?'createFiniteFixedPolicyEngine':'fixedPolicyEngine'}} from './lib/${fresh?'mcp-qa-finite-fixed-policy-engine':'mcp-qa-finite-policy-transport'}.mjs';
 let release,failed=false,settled=false,cancelStarted=false,cancelSettled=false,posts=0;
 export default {async fetch(request,env){
  const path=new URL(request.url).pathname;
  if(path==='/start'){
   globalThis.fetch=async()=>{posts++;return new Response(new ReadableStream({cancel(){cancelStarted=true;return new Promise(r=>{release=()=>{cancelSettled=true;r();};});}}),{status:200,headers:{'Content-Type':'text/plain'}});};
   const lease={signal:new AbortController().signal,assertCurrent(){}};
   const engine=${fresh?'createFiniteFixedPolicyEngine':'fixedPolicyEngine'}({ctx:{},env},()=>{});
   const actual=${fresh?"engine.activate({versionId:'22222222-2222-4222-8222-222222222222'},lease)":"engine.http('POST','scripts/agent-friendly-web-delegated-canary/deployments',{strategy:'percentage',versions:[{version_id:'22222222-2222-4222-8222-222222222222',percentage:100}]},lease)"};
   actual.then(()=>{settled=true;},()=>{failed=true;settled=true;});
   return new Response(null,{status:202});
  }
  if(path==='/release')release?.();
  await Promise.resolve();
  return Response.json({failed,settled,cancelStarted,cancelSettled,posts});
 }};`;
 const compiled=await build({stdin:{contents:entry,resolveDir:process.cwd()},bundle:true,write:false,format:'esm',platform:'neutral',mainFields:['module','main'],external:['node:*','cloudflare:*'],plugins:fresh?[]:[{name:'old-private-contract-only',setup(b){b.onLoad({filter:/mcp-qa-finite-policy-transport\.mjs$/},async args=>({contents:(await readFile(args.path,'utf8'))+'\nexport {fixedPolicyEngine};',resolveDir:process.cwd()+'/lib',loader:'js'}));}}]});
 const mf=new Miniflare(convertV4MiniflareOptions({modules:true,script:compiled.outputFiles[0].text,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],bindings:{AFW_MCP_CLOSURE_PUBLISH_TOKEN:'SYNTHETIC_PUBLISHER_000000000000'}}));t.after(()=>mf.dispose());
 assert.equal((await mf.dispatchFetch('https://fixture.invalid/start')).status,202);
 const before=await (await mf.dispatchFetch('https://fixture.invalid/probe')).json();
 try{assert.deepEqual(before,{failed:true,settled:true,cancelStarted:true,cancelSettled:false,posts:1},'known failure must reject logically while actual cancellation remains retained');}
 finally{await mf.dispatchFetch('https://fixture.invalid/release');}
 const after=await (await mf.dispatchFetch('https://fixture.invalid/probe')).json();
 assert.equal(after.cancelSettled,true);assert.equal(after.posts,1);
});
