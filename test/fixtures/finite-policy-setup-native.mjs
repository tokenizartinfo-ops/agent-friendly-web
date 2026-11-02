import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {randomUUID} from 'node:crypto';
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
let bundle;
export async function policyFixture(t,mode='normal'){
 if(!bundle)bundle=(await build({entryPoints:['test/fixtures/finite-policy-setup-worker.mjs'],bundle:true,write:false,format:'esm',platform:'neutral',mainFields:['module','main'],external:['node:*','cloudflare:*'],plugins:[{name:'SYNTHETIC-fixed-qualification',setup(b){
  b.onLoad({filter:/mcp-qa-finite-owner-preparation\.mjs$/},args=>({contents:readFileSync(args.path,'utf8').replace('export async function readFiniteOwnerSetupFacts','async function unusedActualSetupFacts')+"\nexport {syntheticFacts as readFiniteOwnerSetupFacts} from '"+process.cwd()+"/test/fixtures/finite-policy-setup-worker.mjs';",resolveDir:process.cwd()+'/lib',loader:'js'}));
  b.onLoad({filter:/mcp-qa-finite-policy-setup-source\.mjs$/},()=>({contents:"export {syntheticEntry as readPrivateQaFinitePolicyEntry} from '"+process.cwd()+"/test/fixtures/finite-policy-setup-worker.mjs';export function readPrivateQaFinitePolicySource(){throw Error('SYNTHETIC separately supplied qualification');}",loader:'js'}));
 }}]})).outputFiles[0].text;
 let state,pointer,versionId,deploymentId,posts=0;const requests=[],versions=new Map(),reads=[];
 const envelope=result=>Response.json({success:true,errors:[],messages:[],result});
 const mf=new Miniflare(convertV4MiniflareOptions({modules:true,script:bundle,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],durableObjects:{AFW_INDEPENDENT_CLOSURE:{className:'SetupFixture',useSQLite:true,uniqueKey:'finite-policy-setup'},AFW_RELEASE_EVENTS_NODE:{className:'SetupFixture',useSQLite:true,uniqueKey:'finite-policy-events'}},d1Databases:{RELEASE_DB:'SYNTHETIC_RELEASE'},bindings:{AFW_QA_VERSION:{id:'11111111-1111-4111-8111-111111111111'},AFW_MCP_CLOSURE_READ_TOKEN:'SYNTHETIC_READER_00000000000000',AFW_MCP_CLOSURE_PUBLISH_TOKEN:'SYNTHETIC_PUBLISHER_000000000000'},outboundService:async request=>{
  const url=new URL(request.url),root='/client/v4/accounts/85d0d5dadac3341a564f22ce885e9eec/workers/';assert.equal(url.origin,'https://api.cloudflare.com');
  assert(request.headers.get('Authorization').startsWith('Bearer SYNTHETIC_'));
  if(request.method==='POST'){
   posts++;const body=await request.json();requests.push({method:request.method,url:request.url,body});
   if(url.pathname===root+'workers/agent-friendly-web-delegated-canary/versions'){
    assert.equal(url.search,'?deploy=false');versionId=randomUUID();versions.set(versionId,body);
    for(const binding of body.bindings.filter(b=>b.type==='inherit'))assert.deepEqual(binding,{name:binding.name,type:'inherit',version_id:state.baseline.versionId});
    if(mode==='lost_ack')throw Error('SYNTHETIC upload ACK lost');
    if(mode==='late_upload')await new Promise(r=>setTimeout(r,5200));
    if(mode==='provider404')return Response.json({success:false,errors:[{}],result:null},{status:404});
    return envelope({id:versionId});
   }
   assert.equal(url.pathname,root+'scripts/agent-friendly-web-delegated-canary/deployments');
   assert.deepEqual(body,{strategy:'percentage',versions:[{version_id:versionId,percentage:100}]});
   deploymentId=randomUUID();pointer={id:deploymentId,strategy:'percentage',versions:[{version_id:versionId,percentage:100}]};
   if(mode==='lost_activation')throw Error('SYNTHETIC activation ACK lost');
   return envelope(pointer);
  }
  reads.push(request.url);
  if(url.pathname===root+'scripts/agent-friendly-web-delegated-canary/deployments'){
   const observed=mode==='foreign_pointer'?{...pointer,id:randomUUID()}:pointer;
   return envelope({deployments:[observed]});
  }
  const id=url.pathname.split('/').at(-1),uploaded=versions.get(id),pin=id===state.rollback.versionId?state.rollback:state.baseline;
  const config=uploaded?{...uploaded,bindings:uploaded.bindings.map(b=>b.type==='inherit'?{name:b.name,type:'secret_text'}:b),containers:uploaded.containers.map(b=>({...b,name:'agent-friendly-web-delegated-canary-afwowneventnode'}))}:pin.configuration;
  const modules=uploaded?uploaded.modules:[{name:'index.mjs',content_type:'application/javascript+module',content_base64:Buffer.from(state.script).toString('base64')}];
  if(uploaded&&mode==='wrong_bytes')modules[0].content_base64=Buffer.from('SYNTHETIC WRONG BYTES').toString('base64');
  if(uploaded&&mode==='wrong_full')config.bindings=config.bindings.map(b=>b.name==='AFW_OAUTH_PILOT_CLIENT_ID'?{...b,text:'FOREIGN_SYNTHETIC_CLIENT'}:b);
  return envelope({...config,id,urls:[],modules});
 }}));
 t.after(()=>mf.dispose());
 const json=async(path,value={})=>{const r=await mf.dispatchFetch('https://fixture.invalid'+path,{method:'POST',body:JSON.stringify(value)});assert.equal(r.status,200,await r.clone().text());return r.json();};
 state=await json('/init',{mode});pointer={id:state.baseline.deploymentId,strategy:'percentage',versions:[{version_id:state.baseline.versionId,percentage:100}]};
 return {run:(direct=false)=>json('/run',{T0:state.T0,direct}),rows:()=>json('/rows'),posts:()=>posts,requests,reads,state,actual:()=>({versionId,deploymentId})};
}
