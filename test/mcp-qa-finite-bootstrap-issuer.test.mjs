import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,mkdtemp,writeFile,rm} from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
import {tmpdir} from 'node:os';
import {join,resolve} from 'node:path';
import {pathToFileURL} from 'node:url';
import {randomUUID} from 'node:crypto';
import {build} from 'esbuild';
let product;try{product=await import('../lib/mcp-qa-finite-bootstrap-issuer.mjs');}catch{/* absent-product RED */}
let staged;
async function fixture(mode='normal'){
 assert.equal(typeof product?.issueFiniteQaBootstrap,'function');
 const {compileFiniteNativeStaging}=await import('../scripts/build-finite-native-package.mjs');
 staged??=await compileFiniteNativeStaging({cwd:process.cwd(),sourceRevision:execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim()});
 const {bootstrapWorld,GH,CF}=await import('./fixtures/finite-bootstrap-world.mjs'),w=await bootstrapWorld(staged);w.issuer();
 const receipt=JSON.parse(await readFile('scripts/mcp-qa-finite-custody-receipt.json','utf8'));receipt.expiresAt=new Date(Date.now()+86400000).toISOString();
 const bundle=await build({stdin:{contents:"export * from './lib/mcp-qa-finite-bootstrap-issuer.mjs';export * from './lib/mcp-qa-finite-bootstrap-admission.mjs';export * from './scripts/run-qa-finite-bootstrap.mjs';",resolveDir:process.cwd()},bundle:true,write:false,platform:'node',format:'esm',external:['node:*'],define:{'import.meta.url':JSON.stringify(pathToFileURL(resolve('lib/mcp-qa-finite-bootstrap-issuer.mjs')).href)},plugins:[{name:'explicit-SYN-custody-only-real-compiler',setup(b){
  b.onResolve({filter:/build-finite-native-package\.mjs$/},()=>({path:pathToFileURL(resolve('scripts/build-finite-native-package.mjs')).href,external:true}));
  b.onLoad({filter:/mcp-qa-finite-custody-receipt\.json$/},()=>({contents:JSON.stringify(receipt),loader:'json'}));
 }}]});
 const api=await import('data:text/javascript;base64,'+Buffer.from(bundle.outputFiles[0].text).toString('base64')+'#'+randomUUID());
 const originalFetch=globalThis.fetch,oldEnv={...process.env},calls=[],state={tagPosts:0,refPosts:0,pointers:0,requestDurations:[],observation:null};const sha='f'.repeat(40);
 Object.assign(process.env,{GITHUB_JOB:'publish',GITHUB_ACTION:'finite_bootstrap_once',GITHUB_RUN_ID:'456',GITHUB_RUN_ATTEMPT:'1',GITHUB_SHA:staged.sourceRevision,GITHUB_REPOSITORY:'tokenizartinfo-ops/agent-friendly-web',GITHUB_REPOSITORY_ID:'1347578006',GITHUB_REF:'refs/heads/main',GITHUB_EVENT_NAME:'issue_comment',AFW_FINITE_BOOTSTRAP_ORIGINAL_PID:String(process.pid)});
 if(mode==='marker')process.env.AFW_FINITE_BOOTSTRAP_ORIGINAL_PID='0';
 if(mode==='wrong-action')process.env.GITHUB_ACTION='finite_seed_once';
 if(mode==='wrong-attempt')process.env.GITHUB_RUN_ATTEMPT='2';
 if(mode==='wrong-owner')w.comment.user.id=1;
 if(mode==='completed')w.run.status=w.job.status=w.step.status='completed';
 if(mode==='existing')w.refresh();
 globalThis.fetch=async(url,init)=>{
  calls.push({url,method:init.method});const requestStarted=performance.now();let value,status=200;
  // Real elapsed SYN transport latency, never a clock/deadline substitution.
  // Ten sequential waves after the QA observation cumulatively exceed5s;
  // every individual response remains fresh and well within its own5s child.
  if(mode==='cumulative-latency'&&state.observation&&url.startsWith(GH))await new Promise(resolve=>setTimeout(resolve,650));
  if(url.startsWith(CF)){
   assert.equal(init.headers.Authorization,'Bearer SYN-gha-token');assert.equal(init.method,'GET');
   if(url===CF+'/tokens/verify')value={id:mode==='wrong-token'?'9aa97ad1fc9afe3021cf69ea497d5190':receipt.tokenId,status:'active',expires_on:receipt.expiresAt,not_before:null};
   else if(url.includes('/deployments?')){value=structuredClone(w.pointer);state.pointers++;if(mode==='pointer-drift'&&state.pointers===2)value.deployments[0].id='33333333-3333-4333-8333-333333333333';}
   else{
    assert(url.endsWith('/versions/'+w.record.qaLive.versionId+'?include=modules'));value=structuredClone(w.version);
    if(mode==='wrong-bytes')value.modules[0].content_base64=Buffer.from('wrong').toString('base64');
    if(mode==='wrong-profile')value.bindings.find(b=>b.type==='d1').id='wrong';
    if(mode==='secret-value')value.bindings.find(b=>b.type==='secret_text').text='PRIVATE_MUST_NOT_HASH';
    if(mode==='extra-module')value.modules.push({...value.modules[0]});
    if(mode==='wrong-export')value.exports=['default'];
   }
   value={success:true,errors:[],messages:[],result:value};
  }else{
   assert(url.startsWith(GH));assert.equal(init.headers.Authorization,'Bearer SYN-github-token');
   const path=url.slice(GH.length);
   if(init.method==='POST'){
    const body=JSON.parse(init.body);status=201;
    if(path==='/git/tags'){state.tagPosts++;value={...body,object:{sha:body.object,type:body.type},sha};w.map.set('/git/tags/'+sha,value);if(mode==='tag-lost')throw Error('SYN unknown ACK');}
    else{assert.equal(path,'/git/refs');state.refPosts++;value={ref:body.ref,object:{type:'tag',sha:body.sha}};w.map.set(w.refPath,value);if(mode==='ref-lost')throw Error('SYN unknown ACK');}
   }else if(path===w.refPath&&!w.map.has(path)){status=404;value={message:'Not Found'};}
   else value=await w.get(path);
  }
  const response=new Response(JSON.stringify(value),{status,headers:{'Content-Type':'application/json',Date:new Date().toUTCString()}});
  if(url.startsWith(CF)&&url.includes('/deployments?')&&state.pointers===2)state.observation={observedAt:Date.parse(response.headers.get('date')),wall:Date.now(),mono:performance.now()};
  state.requestDurations.push(performance.now()-requestStarted);return response;
 };
 const admission=api.validateQaBootstrapCommand({event:w.event,context:w.context,now:Date.now}),options={admission,githubToken:'SYN-github-token',credential:'SYN-gha-token',signal:new AbortController().signal};
 return {api,options,w,calls,state,async close(){globalThis.fetch=originalFetch;for(const k of Object.keys(process.env))if(!Object.hasOwn(oldEnv,k))delete process.env[k];Object.assign(process.env,oldEnv);}};
}
test('actual issuer compiles same checkout, checks actual QA bytes and creates exact public record once',async()=>{
 const f=await fixture();try{
  const r=await f.api.issueFiniteQaBootstrap(f.options);assert.equal(r.status,'qa_bootstrap_created');assert.equal(r.qaPublicationBridgeVerified,false);assert.equal(f.state.tagPosts,1);assert.equal(f.state.refPosts,1);
  const tag=f.w.map.get('/git/tags/'+r.tagSha);assert(!tag.message.includes('SYN-gha-token'));assert(!tag.message.includes('content_base64'));assert(!tag.message.includes('PRIVATE'));
  assert.equal(JSON.parse(tag.message).record.qaLive.module.sha256,staged.modules.qaLive.module.sha256);
  await assert.rejects(f.api.issueFiniteQaBootstrap(f.options));assert.equal(f.state.tagPosts,1);
 }finally{await f.close();}
});
for(const mode of ['marker','wrong-action','wrong-attempt','completed','existing','wrong-token','wrong-bytes','wrong-profile','secret-value','extra-module','wrong-export','pointer-drift'])test('actual issuer denies before POST: '+mode,async()=>{
 const f=await fixture(mode);try{await assert.rejects(f.api.issueFiniteQaBootstrap(f.options));assert.equal(f.state.tagPosts,0);assert.equal(f.state.refPosts,0);}finally{await f.close();}
});
for(const mode of ['tag-lost','ref-lost'])test('unknown ACK stays spent: '+mode,async()=>{
 const f=await fixture(mode);try{await assert.rejects(f.api.issueFiniteQaBootstrap(f.options));const count=f.state.tagPosts+f.state.refPosts;await assert.rejects(f.api.issueFiniteQaBootstrap(f.options));assert.equal(f.state.tagPosts+f.state.refPosts,count);assert.equal(f.state.tagPosts,1);assert.equal(f.state.refPosts,mode==='tag-lost'?0:1);}finally{await f.close();}
});
test('caller compiler/pins/provider URL cannot replace source producer',async()=>{
 const f=await fixture();try{for(const k of ['compile','pins','source','url','now'])await assert.rejects(f.api.issueFiniteQaBootstrap({...f.options,[k]:true}));assert.equal(f.calls.length,0);}finally{await f.close();}
});
test('actual fixed CLI consumes event file and original environment without fake native ctx',async()=>{
 const f=await fixture(),dir=await mkdtemp(join(tmpdir(),'afw-bootstrap-event-'));try{
  const path=join(dir,'event.json');await writeFile(path,JSON.stringify(f.w.event));process.env.GITHUB_EVENT_PATH=path;process.env.GITHUB_TOKEN='SYN-github-token';process.env.AFW_QA_CLOSED_TOKEN='SYN-gha-token';
  const r=await f.api.runFiniteQaBootstrapCli();assert.equal(r.status,'qa_bootstrap_created');assert.equal(f.state.refPosts,1);
 }finally{await f.close();assert(dir.startsWith(join(tmpdir(),'afw-bootstrap-event-')));await rm(dir,{recursive:true,force:true});}
});

test('original QA observation survives cumulative post-observation latency beyond5s inside original Pend',async()=>{
 const f=await fixture('cumulative-latency');try{
  let result,error;try{result=await f.api.issueFiniteQaBootstrap(f.options);}catch(e){error=e;}
  const original=f.state.observation;assert(original,'actual final CF observation was reached');
  const elapsedWall=Date.now()-original.wall,elapsedMono=performance.now()-original.mono;
  assert(elapsedWall>5000&&elapsedMono>5000,'actual original clocks crossed5s');
  assert(Date.now()<f.options.admission.Pend,'original unextended Pend remains live');
  assert(f.state.requestDurations.every(ms=>ms<5000),'every actual request stayed within5s');
  assert.equal(f.state.tagPosts,1);assert.equal(f.state.refPosts,1);
  const tag=f.w.map.get('/git/tags/'+f.w.tagSha),record=JSON.parse(tag.message).record;
  assert.equal(record.observedAt,original.observedAt,'original observation was never rewritten');
  assert.equal(record.P0,f.options.admission.P0);assert.equal(record.Pend,f.options.admission.Pend);
  const calls=f.calls.length;await assert.rejects(f.api.issueFiniteQaBootstrap(f.options));
  assert.equal(f.calls.length,calls);assert.equal(f.state.tagPosts+f.state.refPosts,2);
  console.log('SYN cumulative elapsed wall='+elapsedWall+'ms mono='+Math.floor(elapsedMono)+'ms maxRequest='+Math.ceil(Math.max(...f.state.requestDurations))+'ms POSTs=2 originalObservedAtUnchanged=true');
  assert.equal(error,undefined,'valid original publication must reconcile successfully');
  assert.equal(result.status,'qa_bootstrap_created');
 }finally{await f.close();}
});
