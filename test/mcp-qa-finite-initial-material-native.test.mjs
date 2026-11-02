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
import {finiteData,finiteFields} from '../lib/mcp-finite-evidence.mjs';
import {initialCanonical,initialHash,validateFiniteInitialOriginalContext,encodeFiniteInitialMaterialRecord,decodeFiniteInitialMaterialRecord} from '../lib/mcp-qa-finite-initial-material-records.mjs';
import {finitePublicProfileTemplate} from '../lib/mcp-qa-finite-profile.mjs';
const sha=x=>createHash('sha256').update(x).digest('hex'),J=JSON.stringify;
const M='c'.repeat(40),TREE='d'.repeat(40),COMMAND=9001,ONCE='afw.finite-initial-preparation.v1:once';
async function harness(mode='normal'){
 const base={modules:true,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],bindings:{AFW_QA_VERSION:{id:UUID},AFW_MCP_CLOSURE_READ_TOKEN:'synthetic-native-reader'},d1Databases:{RELEASE_DB:'initial-db'},durableObjects:{AFW_INDEPENDENT_CLOSURE:{className:'Initial',useSQLite:true,uniqueKey:'initial-c2a'},AFW_RELEASE_EVENTS_NODE:{className:'Node',useSQLite:true,uniqueKey:'initial-node'}}};
 const mf=new Miniflare(convertV4MiniflareOptions({...base,script:'import{DurableObject}from"cloudflare:workers";export class Initial extends DurableObject{} export class Node extends DurableObject{} export default{fetch(){return new Response(null,{status:404})}};'}));
 const b=await mf.getBindings(),ns=b.AFW_RELEASE_EVENTS_NODE,x=initialHistoryFixture({original:ns.idFromName('afw-own-event-one-occurrence-v1').toString(),candidate:ns.idFromName('afw-own-event-first-successor-v1').toString()},mode);x.ids={original:x.original.containerId,candidate:ns.idFromName('afw-own-event-first-successor-v1').toString()};
 const program='SYNTHETIC actual resident candidate program',script='// SYNTHETIC B1 candidate bytes\nexport default{};',bytes=Buffer.from(script),compressed=gzipSync(bytes,{level:9,mtime:0}),resident={purpose:'afw.finite-candidate-residency.v1',encoding:'gzip-base64.v1',sourceRevision:M,sourceTree:TREE,sourceCheck:'git-inputs-before-after-v1',programHash:sha(program),module:{name:'index.mjs',sha256:sha(bytes),bytes:bytes.length},compressedSha256:sha(compressed),compressedBytes:compressed.length,content:compressed.toString('base64')};
 const w=await bootstrapWorld({sourceRevision:M,sourceTree:TREE,modules:{qaLive:{module:{name:'index.mjs',sha256:sha('export default{};'),bytes:17,exports:[...finitePublicProfileTemplate('qaLive').exports]}}},files:{'qaLive/index.mjs':'export default{};'}});
 const created=new Date(Math.floor((Date.now()-1000)/1000)*1000).toISOString().replace('.000Z','Z'),command={id:COMMAND,user:{id:290715446,login:'tokenizartinfo-ops',type:'User'},author_association:'OWNER',body:'/afw-qa-finite-prepare v1 '+M+' '+UUID,created_at:created,updated_at:created,issue_url:GH+'/issues/497'};w.map.set('/issues/comments/'+COMMAND,command);
 const approval=Date.now()+86400000;
 const f={mf,x,w,command,requests:[],mode,held:null,release:null,commandReads:0,approval};
 const entry=String.raw`
 import{DurableObject}from'cloudflare:workers';
 import{createPrivateQaFiniteInitialMaterial}from'./lib/mcp-qa-finite-initial-material.mjs';
 import{createFiniteInitialMaterialStore}from'./lib/mcp-qa-finite-initial-material-store.mjs';
 import{hashFiniteInitialMaterialRecord,initialInstanceId}from'./lib/mcp-qa-finite-initial-material-records.mjs';
 import{observeFiniteOwnerStageWork}from'./lib/mcp-qa-finite-stage-work.mjs';
 export class Node extends DurableObject{}
 export class Initial extends DurableObject{
 async seed(rows){for(const[k,v]of rows)await this.ctx.storage.put(k,v);}
 async snapshot(){return[...await this.ctx.storage.list()];}
 async run(mode='normal'){
  const abort=new AbortController(),entered=Date.now(),mono=performance.now(),end=entered+(mode==='held-parent'?120:30000);
  const lease=Object.freeze({signal:abort.signal,assertCurrent(){if(abort.signal.aborted||Date.now()>=end||performance.now()-mono>=end-entered)throw Error('parent expired');}});
  const timer=setTimeout(()=>abort.abort(),end-entered),storage=this.ctx.storage;
  const nativeTransaction=storage.transaction;
  if(mode==='held-parent')storage.transaction=(...args)=>Reflect.apply(nativeTransaction,storage,args).then(value=>new Promise(resolve=>{this.releaseHeld=()=>resolve(value);}));
  const producer=createPrivateQaFiniteInitialMaterial({ctx:this.ctx,env:this.env});
  let result;
  try{
   if(mode==='held-parent')await new Promise(r=>setTimeout(r,60));
   if(mode==='aborted')abort.abort();
   if(mode==='holder-drift')this.env.AFW_QA_VERSION={id:this.env.AFW_QA_VERSION.id};
   result=await producer.collect({commandId:9001},lease);
   if(result?.purpose!=='afw.finite-initial-material-result.v1')return{ok:false,status:result?.status};
   producer.assertCurrent(result,lease);
   let cloneDenied=false,otherDenied=false,otherLeaseDenied=false,mutatedDenied=false,expiredDenied=false;
   try{producer.assertCurrent(structuredClone(result),lease);}catch{cloneDenied=true;}
   try{createPrivateQaFiniteInitialMaterial({ctx:this.ctx,env:this.env}).assertCurrent(result,lease);}catch{otherDenied=true;}
   try{producer.assertCurrent(result,{...lease});}catch{otherLeaseDenied=true;}
   result.candidateBytes[0]^=1;try{producer.assertCurrent(result,lease);}catch{mutatedDenied=true;}result.candidateBytes[0]^=1;
   abort.abort();try{producer.assertCurrent(result,lease);}catch{expiredDenied=true;}
   return{ok:true,otherLeaseDenied,mutatedDenied,expiredDenied,claims:[result.sourceIdentityVerified,result.scopeVerified,result.authorizesEffects,result.completePackage,result.operationalReadiness],cloneDenied,otherDenied,material:result.material,scriptHash:await crypto.subtle.digest('SHA-256',new TextEncoder().encode(result.originalContext.artifact.script)).then(v=>[...new Uint8Array(v)].map(b=>b.toString(16).padStart(2,'0')).join('')),candidateBytes:result.candidateBytes.length,storageSame:storage===this.ctx.storage};
  }catch(e){return{ok:false,error:e.message};}finally{clearTimeout(timer);abort.abort();storage.transaction=nativeTransaction;}
 }
 async holdReady(){return typeof this.releaseHeld==='function';}
 async releaseHold(){this.releaseHeld?.();this.releaseHeld=null;}
 async storageCase(mode,template){
  const storage=this.ctx.storage,native=storage.transaction,abort=new AbortController();
  const lease={signal:abort.signal,assertCurrent(){if(abort.signal.aborted)throw Error('expired');}};
  let count=0;
  storage.transaction=(...args)=>{count++;const n=count;
   if(mode==='claim-not-committed'&&n===1||mode==='ack-write-failed'&&n===3)return Promise.reject(Error('SYN unavailable before ack transaction'));
   return Reflect.apply(native,storage,args).then(value=>{
    if(mode==='claim-ack-unknown'&&n===1||mode==='material-ack-unknown'&&n===2)throw Error('SYN actual transaction ACK lost');
    return value;
   });
  };
  try{
   const store=createFiniteInitialMaterialStore({storage}),intent=template.intent,deadline=Date.now()+20000,commandHash='f'.repeat(64);
   if(mode==='concurrent'){
    const results=await Promise.allSettled([store.claim(intent,commandHash,deadline,lease),store.claim(intent,commandHash,deadline,lease)]);
    return{attempts:count,fulfilled:results.filter(r=>r.status==='fulfilled').length,rows:[...await storage.list()]};
   }
   let claim,firstDenied=false;try{claim=await store.claim(intent,commandHash,deadline,lease);}catch{firstDenied=true;}
   if(mode==='claim-ack-unknown'||mode==='claim-not-committed'){
    const before=[...await storage.list()],nextIntent={...intent,sourceRevision:'e'.repeat(40),qaVersionId:'44444444-4444-4444-8444-444444444444'};
    nextIntent.initialInstanceId=initialInstanceId(nextIntent);
    // A new constructor, same actual native storage: neither new M/QA nor
    // an unknown/uncommitted transaction ACK permits a second claim attempt.
    const fresh=createFiniteInitialMaterialStore({storage});let replayDenied=false;try{await fresh.claim(nextIntent,commandHash,deadline,lease);}catch{replayDenied=true;}
    return{attempts:count,firstDenied,replayDenied,before,after:[...await storage.list()]};
   }
   const context=structuredClone(template.originalContext);
   Object.assign(context,{trialId:claim.ids.trialId,withdrawalRequestId:claim.ids.withdrawalRequestId,saveIdempotencyKey:claim.ids.saveIdempotencyKey});
   context.publication.activationKey=claim.ids.activationKey;
   const material={...template,claimHash:claim.claimHash,preconnectionId:claim.ids.preconnectionId,originalContext:context,observedAt:Date.now()};
   material.materialHash=hashFiniteInitialMaterialRecord('InitialMaterial',material);
   let denied=false;try{await store.publish(claim,material,lease);}catch{denied=true;}
   const before=[...await storage.list()];let replayDenied=false;try{await store.publish(claim,material,lease);}catch{replayDenied=true;}
   return{denied,replayDenied,before,after:[...await storage.list()]};
  }finally{abort.abort();storage.transaction=native;}
 }
 async blocked(){
  const abort=new AbortController(),lease={signal:abort.signal,assertCurrent(){if(abort.signal.aborted)throw Error('expired');}};
  let entered=false;try{await observeFiniteOwnerStageWork({ctx:this.ctx,env:this.env,admission:{lease},originalLease:lease},async()=>{entered=true;});}catch{}finally{abort.abort();}return!entered;
 }
 }export default{fetch(){return new Response(null,{status:404})}};
 `;
 let product;try{product=await readFile('lib/mcp-qa-finite-initial-material.mjs','utf8');}catch{product='export function createPrivateQaFiniteInitialMaterial(){return{collect:async()=>({status:"admin_pending"}),assertCurrent(){throw Error("missing original factual producer");}};}';}
 const approvalDecl="CEILING=Date.parse('2026-11-03T02:59:00Z')";
 if(product.includes(approvalDecl)){assert.equal(product.split(approvalDecl).length,2);product=product.replace(approvalDecl,'CEILING='+approval);}
 const sources=new Map();
 for(const p of ['mcp-qa-finite-historical-source.mjs','mcp-qa-finite-bootstrap-native.mjs']){
  const s=await readFile('lib/'+p,'utf8');assert.equal(s.split(approvalDecl).length,2);sources.set(p,s.replace(approvalDecl,'CEILING='+approval));
 }
 const plugin={name:'explicit-SYN-external-data-not-whole-facts',setup(b){
  b.onLoad({filter:/mcp-qa-finite-initial-material\.mjs$/},()=>({contents:product,loader:'js'}));
  b.onResolve({filter:/mcp-qa-finite-initial-material\.mjs$/},()=>({path:process.cwd()+'/lib/mcp-qa-finite-initial-material.mjs'}));
  b.onLoad({filter:/mcp-qa-finite-(historical-source|bootstrap-native)\.mjs$/},args=>({contents:sources.get(args.path.split('/').at(-1)),loader:'js'}));
  b.onLoad({filter:/mcp-confirmation-frozen-artifact\.json$/},()=>({contents:J(x.receipt),loader:'json'}));
  b.onLoad({filter:/mcp-qa-legacy-historical-context\.json$/},()=>({contents:J(x.historical),loader:'json'}));
  b.onLoad({filter:/mcp-qa-cloud-closed-pins\.mjs$/},()=>({contents:'export const QA_CLOUD_CLOSED_PINS='+J({...realPins,canary:x.pin})+';',loader:'js'}));
 }};
 const built=await build({stdin:{contents:entry,resolveDir:process.cwd()},bundle:true,write:false,platform:'neutral',format:'esm',target:'es2022',external:['node:*','cloudflare:*'],plugins:[plugin],define:{'globalThis.__AFW_FINITE_CANDIDATE_RESIDENCY__':J(resident),'globalThis.__AFW_QA_SOURCE_REVISION__':J(M),'globalThis.__AFW_FINITE_SOURCE_TREE__':J(TREE),'globalThis.__AFW_NODE_PROGRAM__':J(program),'globalThis.__AFW_FINITE_BOOTSTRAP_SOURCE__':J(w.expected)}});
 await mf.setOptions(convertV4MiniflareOptions({...base,script:built.outputFiles[0].text,outboundService:async req=>{
  f.requests.push(req.url);assert.equal(req.method,'GET');
  let value;
  if(req.url.startsWith(GH)){
   assert.equal(req.headers.get('authorization'),null);value=structuredClone(await w.get(req.url.slice(GH.length)));
   if(req.url===GH+'/issues/comments/'+COMMAND){f.commandReads++;if(mode==='wrong-owner')value.user.id=1;if(mode==='wrong-repository')value.issue_url='https://api.github.com/repos/other/repo/issues/497';if(mode==='wrong-issue')value.issue_url=GH+'/issues/498';if(mode==='wrong-source')value.body=value.body.replace(M,'e'.repeat(40));if(mode==='wrong-qa')value.body=value.body.replace(UUID,'44444444-4444-4444-8444-444444444444');if(mode==='edited')value.updated_at=new Date(Date.parse(created)+1).toISOString();if(mode==='expired-command')value.created_at=value.updated_at=new Date(Date.now()-300001).toISOString();if(mode==='command-drift'&&f.commandReads===2)value.body+=' '; }
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
 if(mode==='invalid-owned-revision')await f.db.prepare('UPDATE site_projects SET revision=0').run();
 if(mode==='wrong-owned-subject')await f.db.prepare("UPDATE site_projects SET user_id='another-owner'").run();
 f.namespace=bindings.AFW_INDEPENDENT_CLOSURE;return f;
}
test('C2-A actual native B1+B2+C1 composition retains private factual material, never authority',async()=>{
 const f=await harness();try{
  const before=await f.stub.snapshot(),r=await f.stub.run();assert.equal(r.ok,true,J(r));
  assert.deepEqual(r.claims,[false,false,false,false,false]);assert.ok(r.cloneDenied&&r.otherDenied&&r.otherLeaseDenied&&r.mutatedDenied&&r.expiredDenied&&r.storageSame);
  assert.equal(r.material.intent.sourceRevision,M);assert.equal(r.material.originalContext.artifact.sourceRevision,M);assert.equal(r.material.originalContext.original.sourceRevision,'2'.repeat(40));
  assert.equal(r.material.originalContext.legacy.sourceRevision,M);assert.equal(r.material.ownerSelection.project.synthetic,true);assert.equal(r.material.ownerSelection.project.revision,1);
  assert.equal(r.material.originalContext.retirementPolicy,J({...f.x.events,grantId:'original',containerId:f.x.original.containerId,startAt:f.x.at,expiresAt:f.x.at+10000,programHash:f.x.original.programHash,sourceRevision:f.x.original.sourceRevision}));
  assert.equal(r.scriptHash,f.resident.module.sha256);assert.equal(r.candidateBytes,f.resident.module.bytes);assert.equal(Object.hasOwn(r.material.originalContext.artifact,'script'),false);
  const decoded=decodeFiniteInitialMaterialRecord('InitialMaterial',encodeFiniteInitialMaterialRecord('InitialMaterial',r.material));
  // Reconstruct the actual Task4 projection and digest formula; script is only
  // in the private full context and excluded by the exact artifact fields.
  const original=finiteFields({...r.material.originalContext,artifact:{script:'private script',...r.material.originalContext.artifact}},['artifact','scope','original','publication','cancellations','retirementPolicy','withdrawalRequestId','saveIdempotencyKey','legacy','trialId']);
  const identity=Object.fromEntries(['sourceRevision','sourceTree','programHash','workerHash','sourceCheck'].map(k=>[k,original.artifact[k]]));
  const projection=finiteData({...original,artifact:identity});
  const task4=sha('afw.finite-original-context.v1\n'+initialCanonical(projection));
  assert.equal(initialHash('afw.finite-original-context.v1',finiteData(decoded.originalContext)),task4);
  for(const mutate of [
   x=>x.originalContext.artifact.script='unexpected',
   x=>x.qaBootstrap.primaryEvidence.jobId++,
   x=>x.qaBootstrap.currentPointer.versionId='44444444-4444-4444-8444-444444444444',
   x=>x.historicalEvidence.reader.sourceRevision='e'.repeat(40),
   x=>x.ownerSelection.extra=true,
   x=>x.materialHash='f'.repeat(64)
  ]){const invalid=structuredClone(decoded);mutate(invalid);assert.throws(()=>encodeFiniteInitialMaterialRecord('InitialMaterial',invalid));}
  const oversized=structuredClone(decoded);oversized.originalContext.legacy.control+=' '.repeat(33000);
  assert.ok(Buffer.byteLength(initialCanonical(oversized))<65536,'whole material still below 64KiB');
  assert.throws(()=>validateFiniteInitialOriginalContext(oversized.originalContext));
  assert.throws(()=>encodeFiniteInitialMaterialRecord('InitialMaterial',oversized));
  const after=await f.stub.snapshot();for(const pair of before)assert.deepEqual(after.find(x=>x[0]===pair[0]),pair);
  assert.equal(after.some(x=>x[0]==='afw.qa-finite-trial.v1:head'),false);
  assert.equal(f.requests.filter(x=>x.startsWith(GH)).length,13);assert.equal(f.requests.filter(x=>x.startsWith(CF)).length,6);
  assert.equal(after.filter(x=>x[0].startsWith('afw.finite-initial-preparation.v1:')).length,4);
  for(const mode of ['concurrent','claim-ack-unknown','claim-not-committed','material-ack-unknown','ack-write-failed']){
   const stub=f.namespace.get(f.namespace.idFromName('SYN-store-'+mode));
   const outcome=await stub.storageCase(mode,r.material);
   if(mode==='concurrent'){assert.equal(outcome.attempts,1);assert.equal(outcome.fulfilled,1);assert.equal(outcome.rows.length,1);}
   else{
    assert.equal(outcome.replayDenied,true,mode);assert.deepEqual(outcome.after,outcome.before,mode);
    if(mode==='claim-ack-unknown'||mode==='claim-not-committed'){assert.equal(outcome.attempts,1);assert.equal(outcome.firstDenied,true);assert.equal(outcome.after.length,mode==='claim-not-committed'?0:1);}
    else{assert.equal(outcome.denied,true);assert.equal(outcome.after.length,3);assert.equal(outcome.after.some(x=>x[0].endsWith(':ack')),false);}
   }
  }
  const claim=after.find(x=>x[0]===ONCE)[1],calls=f.requests.length;const replay=await f.stub.run();assert.equal(replay.ok,false);assert.equal((await f.stub.snapshot()).find(x=>x[0]===ONCE)[1],claim);assert.ok(f.requests.length-calls<=1);
 }finally{await f.mf.dispose();}
});
for(const mode of ['wrong-owner','wrong-repository','wrong-issue','wrong-source','wrong-qa','edited','expired-command','command-drift','missing-access','missing-limiter','invalid-limiter','invalid-owned-revision','wrong-owned-subject','aborted','holder-drift'])test('C2-A denies '+mode+' without material/selector/ACK',async()=>{
 const f=await harness(mode);try{const r=await f.stub.run(mode);assert.equal(r.ok,false);const rows=await f.stub.snapshot();assert.equal(rows.some(x=>/:(?:selector|ack)$/.test(x[0])),false);}finally{await f.mf.dispose();}
});
test('C2-A partially consumed original parent aborts held child, retains real promise and writes nothing late',async()=>{
 const f=await harness('held-parent');try{
  const before=await f.stub.snapshot(),running=f.stub.run('held-parent');
  let held=false;for(let n=0;n<100&&!held;n++){held=await f.stub.holdReady();if(!held)await new Promise(r=>setTimeout(r,10));}
  assert.equal(held,true);const r=await running;assert.equal(r.ok,false);
  assert.equal(await f.stub.blocked(),true,'actual native storage ACK promise retained after parent expiry');
  await f.stub.releaseHold();await new Promise(r=>setTimeout(r,80));
  assert.equal(await f.stub.blocked(),false);assert.deepEqual(await f.stub.snapshot(),before);
 }finally{await f.stub.releaseHold();await f.mf.dispose();}
});
