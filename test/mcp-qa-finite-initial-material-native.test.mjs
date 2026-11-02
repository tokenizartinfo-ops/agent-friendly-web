import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {gzipSync} from 'node:zlib';
import {readFile} from 'node:fs/promises';
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
import {bootstrapWorld,UUID,GH,CF} from './fixtures/finite-bootstrap-world.mjs';
import {initialHistoryFixture,seedInitialHistory} from './fixtures/finite-initial-history-world.mjs';
import {QA_CLOUD_CLOSED_PINS as realPins} from '../lib/mcp-qa-cloud-closed-pins.mjs';
import {finitePublicProfileTemplate} from '../lib/mcp-qa-finite-profile.mjs';
const sha=x=>createHash('sha256').update(x).digest('hex'),J=JSON.stringify;
const M='c'.repeat(40),TREE='d'.repeat(40),COMMAND=9001,ONCE='afw.finite-initial-preparation.v1:once';
async function harness(mode='normal'){
 const base={modules:true,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],bindings:{AFW_QA_VERSION:{id:UUID},AFW_MCP_CLOSURE_READ_TOKEN:'synthetic-native-reader'},d1Databases:{RELEASE_DB:'initial-db'},durableObjects:{AFW_INDEPENDENT_CLOSURE:{className:'Initial',useSQLite:true,uniqueKey:'initial-c2a'},AFW_RELEASE_EVENTS_NODE:{className:'Node',useSQLite:true,uniqueKey:'initial-node'}}};
 const mf=new Miniflare(convertV4MiniflareOptions({...base,script:'import{DurableObject}from"cloudflare:workers";export class Initial extends DurableObject{} export class Node extends DurableObject{} export default{fetch(){return new Response(null,{status:404})}};'}));
 const b=await mf.getBindings(),ns=b.AFW_RELEASE_EVENTS_NODE,x=initialHistoryFixture({original:ns.idFromName('afw-own-event-one-occurrence-v1').toString(),candidate:ns.idFromName('afw-own-event-first-successor-v1').toString()});x.ids={original:x.original.containerId,candidate:ns.idFromName('afw-own-event-first-successor-v1').toString()};
 const program='SYNTHETIC actual resident candidate program',script='// SYNTHETIC B1 candidate bytes\nexport default{};',bytes=Buffer.from(script),compressed=gzipSync(bytes,{level:9,mtime:0}),resident={purpose:'afw.finite-candidate-residency.v1',encoding:'gzip-base64.v1',sourceRevision:M,sourceTree:TREE,sourceCheck:'git-inputs-before-after-v1',programHash:sha(program),module:{name:'index.mjs',sha256:sha(bytes),bytes:bytes.length},compressedSha256:sha(compressed),compressedBytes:compressed.length,content:compressed.toString('base64')};
 const w=await bootstrapWorld({sourceRevision:M,sourceTree:TREE,modules:{qaLive:{module:{name:'index.mjs',sha256:sha('export default{};'),bytes:17,exports:[...finitePublicProfileTemplate('qaLive').exports]}}},files:{'qaLive/index.mjs':'export default{};'}});
 const created=new Date(Math.floor((Date.now()-1000)/1000)*1000).toISOString(),command={id:COMMAND,user:{id:290715446,login:'tokenizartinfo-ops',type:'User'},author_association:'OWNER',body:'/afw-qa-finite-prepare v1 '+M+' '+UUID,created_at:created,updated_at:created,issue_url:GH+'/issues/497'};w.map.set('/issues/comments/'+COMMAND,command);
 const approval=Date.now()+86400000;
 const f={mf,x,w,command,requests:[],mode,held:null,release:null,commandReads:0,approval};
 const entry=String.raw`
 import{DurableObject}from'cloudflare:workers';
 import{createPrivateQaFiniteInitialMaterial}from'./lib/mcp-qa-finite-initial-material.mjs';
 import{observeFiniteOwnerStageWork}from'./lib/mcp-qa-finite-stage-work.mjs';
 export class Node extends DurableObject{}
 export class Initial extends DurableObject{
 async seed(rows){for(const[k,v]of rows)await this.ctx.storage.put(k,v);}
 async snapshot(){return[...await this.ctx.storage.list()];}
 async run(mode='normal'){
  const abort=new AbortController(),entered=Date.now(),mono=performance.now(),end=entered+(mode==='held-parent'?120:30000);
  const lease=Object.freeze({signal:abort.signal,assertCurrent(){if(abort.signal.aborted||Date.now()>=end||performance.now()-mono>=end-entered)throw Error('parent expired');}});
  const timer=setTimeout(()=>abort.abort(),end-entered),storage=this.ctx.storage;
  const producer=createPrivateQaFiniteInitialMaterial({ctx:this.ctx,env:this.env});
  let result;
  try{
   if(mode==='held-parent')await new Promise(r=>setTimeout(r,60));
   result=await observeFiniteOwnerStageWork({ctx:this.ctx,env:this.env,admission:{lease},originalLease:lease},()=>producer.collect({commandId:9001},lease));
   if(result?.purpose!=='afw.finite-initial-material-result.v1')return{ok:false,status:result?.status};
   producer.assertCurrent(result,lease);
   let cloneDenied=false,otherDenied=false;
   try{producer.assertCurrent(structuredClone(result),lease);}catch{cloneDenied=true;}
   try{createPrivateQaFiniteInitialMaterial({ctx:this.ctx,env:this.env}).assertCurrent(result,lease);}catch{otherDenied=true;}
   return{ok:true,claims:[result.sourceIdentityVerified,result.scopeVerified,result.authorizesEffects,result.completePackage,result.operationalReadiness],cloneDenied,otherDenied,material:result.material,scriptHash:await crypto.subtle.digest('SHA-256',new TextEncoder().encode(result.originalContext.artifact.script)).then(v=>[...new Uint8Array(v)].map(b=>b.toString(16).padStart(2,'0')).join('')),candidateBytes:result.candidateBytes.length,storageSame:storage===this.ctx.storage};
  }catch(e){return{ok:false,error:e.message};}finally{clearTimeout(timer);abort.abort();}
 }
 async blocked(){
  const abort=new AbortController(),lease={signal:abort.signal,assertCurrent(){if(abort.signal.aborted)throw Error('expired');}};
  let entered=false;try{await observeFiniteOwnerStageWork({ctx:this.ctx,env:this.env,admission:{lease},originalLease:lease},async()=>{entered=true;});}catch{}finally{abort.abort();}return!entered;
 }
 }export default{fetch(){return new Response(null,{status:404})}};
 `;
 let product;try{product=await readFile('lib/mcp-qa-finite-initial-material.mjs','utf8');}catch{product='export function createPrivateQaFiniteInitialMaterial(){return{collect:async()=>({status:"admin_pending"}),assertCurrent(){throw Error("missing original factual producer");}};}';}
 const approvalDecl="CEILING=Date.parse('2026-11-03T02:59:00Z')";
 const sources=new Map();
 for(const p of ['mcp-qa-finite-historical-source.mjs','mcp-qa-finite-bootstrap-native.mjs']){
  const s=await readFile('lib/'+p,'utf8');assert.equal(s.split(approvalDecl).length,2);sources.set(p,s.replace(approvalDecl,'CEILING='+approval));
 }
 const plugin={name:'explicit-SYN-external-data-not-whole-facts',setup(b){
  b.onLoad({filter:/mcp-qa-finite-initial-material\.mjs$/},()=>({contents:product,loader:'js'}));
  b.onResolve({filter:/mcp-qa-finite-initial-material\.mjs$/},args=>({path:process.cwd()+'/lib/mcp-qa-finite-initial-material.mjs'}));
  b.onLoad({filter:/mcp-qa-finite-(historical-source|bootstrap-native)\.mjs$/},args=>({contents:sources.get(args.path.split('/').at(-1)),loader:'js'}));
  b.onLoad({filter:/mcp-confirmation-frozen-artifact\.json$/},()=>({contents:J(x.receipt),loader:'json'}));
  b.onLoad({filter:/mcp-qa-legacy-historical-context\.json$/},()=>({contents:J(x.historical),loader:'json'}));
  b.onLoad({filter:/mcp-qa-cloud-closed-pins\.mjs$/},()=>({contents:'export const QA_CLOUD_CLOSED_PINS='+J({...realPins,canary:x.pin})+';',loader:'js'}));
 }};
 const built=await build({stdin:{contents:entry,resolveDir:process.cwd()},bundle:true,write:false,platform:'neutral',format:'esm',target:'es2022',external:['node:*','cloudflare:*'],plugins:[plugin],define:{'globalThis.__AFW_FINITE_CANDIDATE_RESIDENCY__':J(resident),'globalThis.__AFW_QA_SOURCE_REVISION__':J(M),'globalThis.__AFW_FINITE_SOURCE_TREE__':J(TREE),'globalThis.__AFW_NODE_PROGRAM__':J(program),'globalThis.__AFW_FINITE_BOOTSTRAP_SOURCE__':J(w.expected)}});
 await mf.setOptions(convertV4MiniflareOptions({...base,script:built.outputFiles[0].text,outboundService:async req=>{
  f.requests.push(req.url);assert.equal(req.method,'GET');
  if(f.mode==='held-parent'&&req.url===GH+'/issues/comments/'+COMMAND)await new Promise(resolve=>{f.release=resolve;});
  let value;
  if(req.url.startsWith(GH)){
   assert.equal(req.headers.get('authorization'),null);value=structuredClone(await w.get(req.url.slice(GH.length)));
   if(req.url===GH+'/issues/comments/'+COMMAND){f.commandReads++;if(mode==='wrong-owner')value.user.id=1;if(mode==='edited')value.updated_at=new Date(Date.parse(created)+1).toISOString();if(mode==='expired-command')value.created_at=value.updated_at=new Date(Date.now()-300001).toISOString();if(mode==='command-drift'&&f.commandReads===2)value.body+=' '; }
  }else{
   assert.equal(req.headers.get('authorization'),'Bearer synthetic-native-reader');
   let result;
   if(req.url===CF+'/tokens/verify')result={id:'9aa97ad1fc9afe3021cf69ea497d5190',status:'active',expires_on:new Date(approval+60000).toISOString(),not_before:null};
   else if(req.url===CF+'/workers/scripts/agent-friendly-web-independent-closure-qa/deployments?per_page=1')result=w.pointer;
   else{assert.equal(req.url,CF+'/workers/workers/agent-friendly-web-delegated-canary/versions/2607abae-cec3-4e35-89eb-8b8572262b54?include=modules');result=structuredClone(x.metadata);}
   value={success:true,errors:[],messages:[],result};
  }
  return Response.json(value,{headers:{date:new Date().toUTCString(),'x-ratelimit-remaining':'60'}});
 }}));
 const bindings=await mf.getBindings();f.stub=bindings.AFW_INDEPENDENT_CLOSURE.get(bindings.AFW_INDEPENDENT_CLOSURE.idFromName('afw-own-successor-closure-v1'));f.db=await mf.getD1Database('RELEASE_DB');
 await seedInitialHistory(f.db,x);await f.stub.seed(x.rows);f.resident=resident;
 return f;
}
test('C2-A actual native B1+B2+C1 composition retains private factual material, never authority',async()=>{
 const f=await harness();try{
  const before=await f.stub.snapshot(),r=await f.stub.run();assert.equal(r.ok,true,J(r));
  assert.deepEqual(r.claims,[false,false,false,false,false]);assert.ok(r.cloneDenied&&r.otherDenied&&r.storageSame);
  assert.equal(r.material.intent.sourceRevision,M);assert.equal(r.material.originalContext.artifact.sourceRevision,M);assert.equal(r.material.originalContext.original.sourceRevision,'2'.repeat(40));
  assert.equal(r.material.originalContext.legacy.sourceRevision,M);assert.equal(r.material.ownerSelection.project.synthetic,true);assert.equal(r.material.ownerSelection.project.revision,1);
  assert.equal(r.material.originalContext.retirementPolicy,J({...f.x.events,grantId:'original',containerId:f.x.original.containerId,startAt:f.x.at,expiresAt:f.x.at+10000,programHash:f.x.original.programHash,sourceRevision:f.x.original.sourceRevision}));
  assert.equal(r.scriptHash,f.resident.module.sha256);assert.equal(r.candidateBytes,f.resident.module.bytes);assert.equal(Object.hasOwn(r.material.originalContext.artifact,'script'),false);
  const after=await f.stub.snapshot();for(const pair of before)assert.deepEqual(after.find(x=>x[0]===pair[0]),pair);
  assert.equal(after.some(x=>x[0]==='afw.qa-finite-trial.v1:head'),false);
  assert.equal(f.requests.filter(x=>x.startsWith(GH)).length,13);assert.equal(f.requests.filter(x=>x.startsWith(CF)).length,6);
  assert.equal(after.filter(x=>x[0].startsWith('afw.finite-initial-preparation.v1:')).length,4);
  const claim=after.find(x=>x[0]===ONCE)[1],calls=f.requests.length;const replay=await f.stub.run();assert.equal(replay.ok,false);assert.equal((await f.stub.snapshot()).find(x=>x[0]===ONCE)[1],claim);assert.ok(f.requests.length-calls<=1);
 }finally{await f.mf.dispose();}
});
for(const mode of ['wrong-owner','edited','expired-command','command-drift'])test('C2-A denies '+mode+' without material/selector/ACK',async()=>{
 const f=await harness(mode);try{const r=await f.stub.run();assert.equal(r.ok,false);const rows=await f.stub.snapshot();assert.equal(rows.some(x=>/:(?:selector|ack)$/.test(x[0])),false);}finally{await f.mf.dispose();}
});
test('C2-A partially consumed original parent aborts held child, retains real promise and writes nothing late',async()=>{
 const f=await harness('held-parent');try{
  const before=await f.stub.snapshot(),running=f.stub.run('held-parent');
  for(let n=0;n<100&&!f.release;n++)await new Promise(r=>setTimeout(r,10));
  assert.equal(typeof f.release,'function');const r=await running;assert.equal(r.ok,false);
  assert.equal(await f.stub.blocked(),true,'underlying provider promise retained after parent expiry');
  f.release();await new Promise(r=>setTimeout(r,80));
  assert.equal(await f.stub.blocked(),false);assert.deepEqual(await f.stub.snapshot(),before);
 }finally{f.release?.();await f.mf.dispose();}
});
