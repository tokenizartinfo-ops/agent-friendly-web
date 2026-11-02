import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
let api;try{api=await import('../lib/mcp-qa-finite-bootstrap-native.mjs');}catch{/* absent-product RED */}
const REAL_CEILING=Date.parse('2026-11-03T02:59:00Z'),DECLARATION="CEILING=Date.parse('2026-11-03T02:59:00Z')";
async function fixture({productionExpiry=false}={}){
 assert.equal(typeof api?.readPrivateQaFiniteBootstrap,'function');
 const {bootstrapWorld,UUID,GH,CF}=await import('./fixtures/finite-bootstrap-world.mjs'),w=await bootstrapWorld();
 let source=await readFile('lib/mcp-qa-finite-bootstrap-native.mjs','utf8');
 assert.equal(source.split(DECLARATION).length,2);
 const approval=Date.now()+86400000;
 if(productionExpiry){source=source.replaceAll('Date.now()',String(REAL_CEILING));assert.equal(source.split(DECLARATION).length,2);}
 else source=source.replace(DECLARATION,'CEILING='+approval);
 const entry=`
 import{DurableObject}from'cloudflare:workers';
 import{readPrivateQaFiniteBootstrap}from'./lib/mcp-qa-finite-bootstrap-native.mjs';
 export class Check extends DurableObject{
  async read(mode){
   const controller=new AbortController(),start=Date.now(),env=this.env,version=env.AFW_QA_VERSION;
   const lease={signal:controller.signal,assertCurrent(){if(controller.signal.aborted||Date.now()-start>=30000||mode==='expired-parent')throw Error('parent');}};
   let timer;if(mode==='abort')controller.abort();if(mode==='held-abort')timer=setTimeout(()=>controller.abort(),25);
   if(mode==='holder-swap')timer=setTimeout(()=>{env.AFW_QA_VERSION={id:version.id};},0);
   try{return await readPrivateQaFiniteBootstrap({ctx:this.ctx,env},lease);}
   catch{return {denied:true};}finally{clearTimeout(timer);controller.abort();env.AFW_QA_VERSION=version;}
  }
 }export default{fetch(){return new Response(null,{status:404});}};
 `;
 const built=await build({stdin:{contents:entry,resolveDir:process.cwd()},bundle:true,write:false,platform:'neutral',format:'esm',target:'es2022',external:['node:*','cloudflare:*'],define:{'globalThis.__AFW_FINITE_BOOTSTRAP_SOURCE__':JSON.stringify(w.expected)},plugins:[{name:'explicit-SYN-custody-boundary',setup(b){b.onLoad({filter:/mcp-qa-finite-bootstrap-native\.mjs$/},()=>({contents:source,loader:'js'}));}}]});
 const f={w,mode:'normal',requests:[],pointerReads:0,held:null,approval};
 const mf=new Miniflare(convertV4MiniflareOptions({modules:true,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],bindings:{AFW_QA_VERSION:{id:UUID},AFW_MCP_CLOSURE_READ_TOKEN:'SYN-native-token'},durableObjects:{AFW_INDEPENDENT_CLOSURE:{className:'Check',useSQLite:true,uniqueKey:'bootstrap-c1'}},script:built.outputFiles[0].text,outboundService:async req=>{
  f.requests.push({url:req.url,authorization:req.headers.get('authorization')});assert.equal(req.method,'GET');
  if(f.mode==='held')await new Promise(resolve=>{f.held=resolve;});
  let value;
  if(req.url.startsWith(CF)){
   assert.equal(req.headers.get('authorization'),'Bearer SYN-native-token');
   if(req.url===CF+'/tokens/verify')value={success:true,errors:[],messages:[],result:{id:f.mode==='wrong-token'?'9db7901af95faf07e6f7ef378045328e':'9aa97ad1fc9afe3021cf69ea497d5190',status:'active',expires_on:new Date(f.mode==='expired-token'?0:approval+60000).toISOString(),not_before:null}};
   else{
    assert.equal(req.url,CF+'/workers/scripts/agent-friendly-web-independent-closure-qa/deployments?per_page=1');
    const p=structuredClone(w.pointer);f.pointerReads++;
    if(f.mode==='pointer-drift'&&f.pointerReads%2===0)p.deployments[0].id='33333333-3333-4333-8333-333333333333';
    if(f.mode==='wrong-qa')p.deployments[0].versions[0].version_id='44444444-4444-4444-8444-444444444444';
    value={success:true,errors:[],messages:[],result:p};
   }
  }else{
   assert(req.url.startsWith(GH));assert.equal(req.headers.get('authorization'),null);
   value=await w.get(req.url.slice(GH.length));
   if(f.mode==='ref-drift'&&req.url.endsWith(w.refPath)&&f.requests.filter(x=>x.url===req.url).length%2===0)value.object.sha='0'.repeat(40);
   if(f.mode==='wrong-body'&&req.url.includes('/git/tags/'))value.message=value.message.replace('"index.mjs"','"wrong.mjs"');
   if(f.mode==='unfinished'&&req.url.endsWith('/actions/runs/456'))value.status='in_progress';
  }
  return new Response(JSON.stringify(value),{headers:{'Content-Type':'application/json',Date:new Date(f.mode==='stale'?Date.now()-60000:Date.now()).toUTCString(),...f.mode==='cached'?{Age:'1'}:{}}});
 }}));
 f.mf=mf;const env=await mf.getBindings();f.stub=env.AFW_INDEPENDENT_CLOSURE.get(env.AFW_INDEPENDENT_CLOSURE.idFromName('afw-own-successor-closure-v1'));f.wrong=env.AFW_INDEPENDENT_CLOSURE.get(env.AFW_INDEPENDENT_CLOSURE.idFromName('other'));
 return f;
}
test('actual workerd DO reader returns bounded bridge facts with direct/source authority false',async t=>{
 const f=await fixture();t.after(()=>f.mf.dispose());const r=await f.stub.read('normal');
 assert.equal(r.qaPublicationBridgeVerified,true);assert.equal(r.qaCodeProvenanceVerified,false);
 for(const k of ['sourceIdentityVerified','scopeVerified','authorizesEffects','operationalReadiness','completePackage','historicalRefNonmutationVerified'])assert.equal(r[k],false);
 assert.equal(r.repositoryWriterTrustAssumed,true);assert.equal(f.requests.length,14);
 assert.equal(f.requests.filter(x=>x.authorization).length,3);assert(f.requests.every(x=>!x.url.includes('/versions/')));
 assert.equal(JSON.stringify(r).includes('SYN-native-token'),false);
});
for(const mode of ['wrong-token','expired-token','wrong-qa','pointer-drift','ref-drift','wrong-body','unfinished','stale','cached'])test('native actual reader rejects '+mode,async t=>{
 const f=await fixture();t.after(()=>f.mf.dispose());f.mode=mode;assert.equal((await f.stub.read('normal')).denied,true);
});
for(const mode of ['abort','expired-parent','holder-swap'])test('native original lease and holder coherence rejects '+mode,async t=>{
 const f=await fixture();t.after(()=>f.mf.dispose());assert.equal((await f.stub.read(mode)).denied,true);
});
test('actual namespace identity mismatch denies before HTTP',async t=>{
 const f=await fixture();t.after(()=>f.mf.dispose());assert.equal((await f.wrong.read('normal')).denied,true);assert.equal(f.requests.length,0);
});
test('held actual provider promise cannot renew original aborted parent or continue GH reads',async t=>{
 const f=await fixture();t.after(()=>f.mf.dispose());f.mode='held';
 const promise=f.stub.read('held-abort');const r=await promise;assert.equal(r.denied,true);assert.equal(f.requests.length,1);
 f.held?.();await new Promise(resolve=>setTimeout(resolve,50));assert.equal(f.requests.length,1);
});
test('unmodified production approval ceiling denies at expiry before all HTTP (SYN reader clock only)',async t=>{
 const f=await fixture({productionExpiry:true});t.after(()=>f.mf.dispose());assert.equal((await f.stub.read('normal')).denied,true);assert.equal(f.requests.length,0);
});
