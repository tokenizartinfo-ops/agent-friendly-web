import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
import {PRIVATE_QA_CLOSED_FLAGS} from '../lib/mcp-qa-closed-context.mjs';

const source='a'.repeat(40),id='e'.repeat(64),slot='afw-own-successor-closure-v1';
const baselineHash='4b557f04777be25f3df6dc271990d57095ace231bb7b24e2a7a10da23ada2c2f';
const policies=['AFW_QA_HTTP_POLICY','AFW_QA_PREREGISTRATION','AFW_QA_CHALLENGE_IDENTITY','AFW_MCP_CLOSURE_POLICY','AFW_MCP_READER_PROBE_POLICY','AFW_MCP_PUBLISHER_PROBE_POLICY','AFW_MCP_CLOSURE_DISPATCH_POLICY'];
const exactPath=process.env.AFW_QA_INSPECTION_BASE_MODULE;
const requireExact=process.env.AFW_REQUIRE_EXACT_BASELINE==='1';
if(requireExact&&!exactPath)throw Error('Exact historical baseline required');
const exact=exactPath?await readFile(exactPath):null;
if(exact){assert.equal(exact.length,395915);assert.equal(createHash('sha256').update(exact).digest('hex'),baselineHash);}
console.log('CUSTODY_HOST_BASELINE',JSON.stringify({mode:exact?'exact':'synthetic',bytes:exact?.length??null,sha256:exact?baselineHash:null}));

const hasWrapper=await readFile('scripts/qa-finite-pre-entry-custody-wrapper.mjs').then(()=>true,()=>false);
test('fixed host wrapper source exists',()=>assert.equal(hasWrapper,true));
const hostTest=hasWrapper?test:test.skip;

async function fixture(mode='normal'){
 const now=Date.now();
 const context={purpose:'afw.qa-pre-entry-custody-context.v1',id,sourceRevision:source,baselineVersionId:'c570b60b-95dc-48e1-89f3-9c4651691dbc',baselineModuleHash:baselineHash,startAt:now-1000,expiresAt:now+120000};
 if(mode==='expired')context.expiresAt=now-1;
 if(mode==='bad-source')context.sourceRevision='bad';
 const entry=`import base,{IndependentClosure,PrivateQaBootstrap} from './scripts/qa-finite-pre-entry-custody-wrapper.mjs';
 import {observeFiniteOwnerStageWork} from './lib/mcp-qa-finite-stage-work.mjs';
 export class Actor extends IndependentClosure{
  async snapshot(){return JSON.stringify([...await this.ctx.storage.list()]);}
  async availability(){const c=new AbortController(),lease={signal:c.signal,assertCurrent(){}};try{await observeFiniteOwnerStageWork({ctx:this.ctx,env:this.env,admission:{lease},originalLease:lease},async()=>true);return true;}catch{return false;}finally{c.abort();}}
  async inherited(){return {alarm:await this.alarm(),arm:await this.arm(),status:await this.status()};}
 }
 export {PrivateQaBootstrap};export default base;`;
 const built=await build({stdin:{contents:entry,resolveDir:process.cwd()},bundle:true,write:false,format:'esm',platform:'neutral',target:'es2022',external:['node:*','cloudflare:*'],plugins:[{name:'synthetic-base-and-context',setup(b){
  b.onResolve({filter:/^\.\//closed-rollback\.mjs$/},()=>({path:'base',namespace:'fixture'}));
  b.onResolve({filter:/^\.\//pre-entry-custody-context\.mjs$/},()=>({path:'context',namespace:'fixture'}));
  b.onLoad({filter:/.*/,namespace:'fixture'},a=>({contents:a.path==='context'?'export const custodyContext=Object.freeze('+JSON.stringify(context)+');':exact?exact.toString('utf8'):"export {IndependentClosure,PrivateQaBootstrap,PrivateQaPreregistration,PrivateQaNamedConfirmation,default} from './worker/independent-closure/closed-rollback.mjs';",resolveDir:process.cwd(),loader:'js'}));
 }}]});
 let calls=[],release,held=false;
 const bindings={AFW_QA_VERSION:{id:'11111111-1111-4111-8111-111111111111'},AFW_MCP_CLOSURE_READ_TOKEN:'synthetic-native-reader',AFW_MCP_CLOSURE_PUBLISH_TOKEN:'synthetic-native-publisher',...Object.fromEntries(PRIVATE_QA_CLOSED_FLAGS.map(k=>[k,'false'])),...Object.fromEntries(policies.map(k=>[k,'']))};
 if(mode==='open')bindings.AFW_MCP_CLOSURE_ENABLED='true';
 const mf=new Miniflare(convertV4MiniflareOptions({modules:true,script:built.outputFiles[0].text,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],bindings,d1Databases:{RELEASE_DB:'custody-db'},durableObjects:{AFW_INDEPENDENT_CLOSURE:{className:'Actor',useSQLite:true,uniqueKey:'pre-entry-fixture'}},workflows:{FLOW:{name:'afw-own-qa-private-bootstrap',className:'PrivateQaBootstrap'}},outboundService:async req=>{
  calls.push({url:req.url,method:req.method});assert.equal(req.method,'GET');
  if(mode==='hold'&&req.url.endsWith('/tokens/verify')&&!held){held=true;await new Promise(r=>{release=r;});}
  let result;
  if(req.url.endsWith('/tokens/verify'))result={id:req.headers.get('authorization')==='Bearer synthetic-native-reader'?'9aa97ad1fc9afe3021cf69ea497d5190':'05718105dcdfc92e55cc3624172c2740',status:'active',expires_on:new Date(Date.now()+3600000).toISOString(),not_before:null};
  else {assert.match(req.url,/\/workflows\/afw-own-qa-private-bootstrap\/instances\/afw-mcp-closure-/);result={status:'complete',step_count:6,output:{status:'blocked',dispatchStatus:'uncertain',nativeWithdrawalVerified:false,operationalReadiness:false,mayRetry:false},steps:[{name:'one'},{name:'restore-own-closed-canary-1',start:'2026-10-30T16:41:01.564Z',end:'2026-10-30T16:41:01.675Z',success:true},{name:'two'},{name:'three'},{name:'four'},{name:'five'}]};}
  return Response.json({success:true,errors:[],messages:[],result},{headers:{date:new Date().toUTCString()}});
 }}));
 const b=await mf.getBindings(),stub=b.AFW_INDEPENDENT_CLOSURE.get(b.AFW_INDEPENDENT_CLOSURE.idFromName(slot));
 async function run(params={operation:'inspect_pre_entry_custody',observationId:id},instance='afw-qa-custody-'+id){
  const wf=await b.FLOW.create({id:instance,params});let state;const end=Date.now()+22000;
  do{state=await wf.status();if(['complete','errored','terminated'].includes(state.status))break;await new Promise(r=>setTimeout(r,25));}while(Date.now()<end);
  assert.equal(state.status,'complete',JSON.stringify(state));return state.output;
 }
 return{mf,stub,ns:b.AFW_INDEPENDENT_CLOSURE,run,calls,get held(){return held;},release:()=>release?.()};
}
hostTest('fixed native Workflow reaches actual custody actor without consuming Entry or changing history',async()=>{
 const f=await fixture();try{
  const before=await f.stub.snapshot();assert.deepEqual(await f.stub.inherited(),{alarm:{state:'unavailable'},arm:{state:'unavailable'},status:{state:'unavailable'}});
  const r=await f.run();assert.equal(r.status,'observed');assert.equal(r.authorizesEffects,false);assert.equal(r.operationalReadiness,false);assert.equal(r.scopeVerified,false);
  assert.equal(f.calls.length,3);assert.equal(await f.stub.snapshot(),before);assert.equal((await f.mf.dispatchFetch('https://synthetic.invalid/')).status,404);
 }finally{await f.mf.dispose();}
});
for(const mode of ['open','expired','bad-source'])hostTest('closed host rejects '+mode,async()=>{const f=await fixture(mode);try{assert.notEqual((await f.run()).status,'observed');assert.equal(f.calls.length,0);}finally{await f.mf.dispose();}});
hostTest('selector and wrong actor cannot start custody reads',async()=>{const f=await fixture();try{
 for(const args of [[],['f'.repeat(64)],[id,source,{}]])assert.notEqual((await f.stub.readPreEntryCustody(...args)).status,'observed');
 const wrong=f.ns.get(f.ns.idFromName('foreign'));assert.notEqual((await wrong.readPreEntryCustody(id,source)).status,'observed');
 assert.equal(f.calls.length,0);
 }finally{await f.mf.dispose();}});
hostTest('pending read remains exclusive after timeout until underlying operation settles',async()=>{
 const f=await fixture('hold');try{const r=await f.run();assert.notEqual(r.status,'observed');assert.equal(f.held,true);assert.equal(await f.stub.availability(),false);assert.notEqual((await f.stub.readPreEntryCustody(id,source)).status,'observed');f.release();let ok=false;for(let n=0;n<200&&!ok;n++){ok=await f.stub.availability();if(!ok)await new Promise(r=>setTimeout(r,10));}assert.equal(ok,true);}finally{f.release();await f.mf.dispose();}
});
