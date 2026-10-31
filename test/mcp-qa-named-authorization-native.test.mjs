import test from 'node:test';
import assert from 'node:assert/strict';
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
import {generationFixture} from './fixtures/qa-generation-ledger.mjs';
import {createHash} from 'node:crypto';
import {rehearseExactNamedConfirmation} from './fixtures/named-confirmation-native-rehearsal.mjs';
const entry=`import {DurableObject,WorkflowEntrypoint} from 'cloudflare:workers';
import {createPrivateQaGenerationLedger,createPrivateQaGenerationObserver} from './lib/mcp-qa-generation-ledger.mjs';
import {createPrivateQaExecutionPin} from './lib/mcp-qa-execution-identity.mjs';
import {createPrivateQaNamedAuthorization} from './lib/mcp-qa-named-authorization.mjs';
export class LedgerFixture extends DurableObject{
 pin(){return createPrivateQaExecutionPin({env:this.env,expectedVersionId:this.env.AFW_QA_VERSION.id,sourceRevision:'a'.repeat(40),context:'durable_object'});}
 async seed(capsule,legacy){await this.ctx.storage.put('afw.canary-restoration-control.v1',legacy);return createPrivateQaGenerationLedger({storage:this.ctx.storage,capsule,executionPin:this.pin(),checkEligibility:async()=>true,now:()=>Number(this.env.AT),timeoutMs:5000}).arm();}
 async readText(capsule,withdraw){const r=await createPrivateQaGenerationObserver({storage:this.ctx.storage,capsule,now:()=>Number(this.env.AT),timeoutMs:5000}).read();if(withdraw)await createPrivateQaGenerationLedger({storage:this.ctx.storage,capsule,executionPin:this.pin(),checkEligibility:async()=>true,now:()=>Number(this.env.AT),timeoutMs:5000}).withdraw();return JSON.stringify(r);}
 async rows(){return JSON.stringify([...await this.ctx.storage.list()]);}
}
export class FenceFixture extends WorkflowEntrypoint{
 async run(event,step){const p=event.payload,stub=this.env.LEDGER.get(this.env.LEDGER.idFromName(p.slot)),controller=new AbortController();let reads=0;
 const pin=createPrivateQaExecutionPin({env:this.env,expectedVersionId:this.env.AFW_QA_VERSION.id,sourceRevision:p.sourceRevision,context:'workflow'});
 const fence=createPrivateQaNamedAuthorization({executionPin:pin,readGeneration:async()=>{reads++;return stub.readText(p.capsule,p.withdraw&&reads===1);},pins:p.pins,now:()=>Number(this.env.AT),timeoutMs:5000});
 try{const first=await fence.authorize('workflow_admission',controller.signal);if(!first)return{first:false,second:false,reads};
 return await step.do('exercise-generation-fence',{retries:{limit:0,delay:'1 second',backoff:'constant'},timeout:'5 seconds'},async()=>({first,second:await fence.authorize('successor_after_write',controller.signal),reads}));}finally{controller.abort();}
 }
}
export default{fetch(){return new Response(null,{status:404});}};
`;
test('native Workflow rereads actual DO generation through JSON RPC and detects withdrawal before the next stage',async()=>{
 const built=await build({stdin:{contents:entry,resolveDir:process.cwd(),sourcefile:'qa-named-authorization-native.mjs'},bundle:true,write:false,format:'esm',platform:'neutral',target:'es2022',external:['node:*','cloudflare:*'],legalComments:'none'}),f=generationFixture();let outbound=0;
 const mf=new Miniflare(convertV4MiniflareOptions({modules:true,script:built.outputFiles[0].text,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],bindings:{AT:String(f.now()),AFW_QA_VERSION:{id:f.env.AFW_QA_VERSION.id}},durableObjects:{LEDGER:{className:'LedgerFixture',useSQLite:true,uniqueKey:'qa-named-generation-fence'}},workflows:{FLOW:{name:'qa-named-authorization-fixture',className:'FenceFixture'}},outboundService:()=>{outbound++;throw Error('no outbound');}}));
 try{
  const {FLOW,LEDGER}=await mf.getBindings();for(const mode of ['current','withdraw','wrong-source']){
   const stub=LEDGER.get(LEDGER.idFromName(mode)),capsule=JSON.stringify(f.capsule),armed=await stub.seed(capsule,f.legacy),before=await stub.rows();assert.equal(armed.status,'armed');
   const instance=await FLOW.create({id:'native-named-fence-'+mode,params:{slot:mode,capsule,withdraw:mode==='withdraw',sourceRevision:(mode==='wrong-source'?'b':'a').repeat(40),pins:{planHash:armed.planHash,sequence:armed.sequence,startAt:f.capsule.startAt,expiresAt:f.capsule.expiresAt}}});
   let status;const end=Date.now()+12000;do{status=await instance.status();if(['complete','errored','terminated'].includes(status.status))break;await new Promise(r=>setTimeout(r,25));}while(Date.now()<end);
   assert.equal(status.status,'complete',JSON.stringify(status));assert.equal(status.output.first,mode!=='wrong-source',mode+':'+JSON.stringify(status.output));assert.equal(status.output.second,mode==='current',mode+':'+JSON.stringify(status.output));assert.equal(status.output.reads,mode==='wrong-source'?1:2);
   if(mode!=='withdraw')assert.equal(await stub.rows(),before);
  }assert.equal(outbound,0);assert.equal((await mf.dispatchFetch('https://fixture.invalid/')).status,404);
 }finally{await mf.dispose();}
});

const digest=x=>createHash('sha256').update(x).digest('hex');
const inertScript='export default{fetch(){return new Response(null,{status:404});}}';
const artifact={script:inertScript,sourceRevision:'a'.repeat(40),sourceTree:'b'.repeat(40),programHash:'c'.repeat(64),workerHash:digest(inertScript),sourceCheck:'git-inputs-before-after-v1'};
function nominalBuild(deny){
 return async bundle=>{
  const source="import {WorkflowEntrypoint} from 'cloudflare:workers';\nimport {runReleaseWorkflow} from './lib/mcp-release-runtime.mjs';\nimport {createPrivateQaNamedAuthorization} from './lib/mcp-qa-named-authorization.mjs';\nimport {createPrivateQaGenerationLedger,createPrivateQaGenerationObserver} from './lib/mcp-qa-generation-ledger.mjs';\nimport {createPrivateQaExecutionPin} from './lib/mcp-qa-execution-identity.mjs';\nimport {generationFixture} from './test/fixtures/qa-generation-ledger.mjs';\nexport {AfwReleaseOperator} from './worker/mcp-release/index.mjs';\nconst bundle="+JSON.stringify(bundle)+";\nexport class AfwReleaseWorkflow extends WorkflowEntrypoint{async run(event,step){const f=generationFixture();f.capsule.startAt=bundle.policy.startAt;f.capsule.expiresAt=bundle.policy.expiresAt;f.now=Date.now;const ledger=createPrivateQaGenerationLedger(f.options()),armed=await ledger.arm();if(armed.status!=='armed')throw Error('fixture ARM unavailable');const observer=createPrivateQaGenerationObserver({storage:f.storage,capsule:JSON.stringify(f.capsule),now:Date.now,timeoutMs:5000}),pin=createPrivateQaExecutionPin({...f.pinOptions,context:'workflow'}),stages=[];const fence=createPrivateQaNamedAuthorization({executionPin:pin,readGeneration:async()=>JSON.stringify(await observer.read()),pins:{planHash:armed.planHash,sequence:armed.sequence,startAt:f.capsule.startAt,expiresAt:f.capsule.expiresAt},now:Date.now,timeoutMs:5000});const authorize=async(stage,signal)=>{stages.push(stage);if(stage==="+JSON.stringify(deny)+")await ledger.withdraw();return fence.authorize(stage,signal);};const output=await runReleaseWorkflow({bundle,env:this.env,event,step,authorize});return{...output,authorizationStages:stages};}}\nexport default{fetch(){return new Response(null,{status:404});}};";
  const built=await build({stdin:{contents:source,resolveDir:process.cwd(),sourcefile:'qa-named-runtime-fence.mjs'},bundle:true,write:false,format:'esm',platform:'neutral',target:'es2022',mainFields:['module','main'],external:['node:*','cloudflare:*'],legalComments:'none',define:{'globalThis.__AFW_RELEASE_OPERATOR_BUNDLE__':JSON.stringify(bundle)}});
  return{script:built.outputFiles[0].text,planHash:digest(JSON.stringify(bundle))};
 };
}
test('unmounted native named runtime traverses all18 hooks and continues through its own immutable reservation',async()=>{
 const r=await rehearseExactNamedConfirmation({artifact,build:nominalBuild(null),mode:'confirmed',reserve:'true'});
 assert.equal(r.output.status,'confirmed',JSON.stringify(r.output));assert.equal(r.reservationCount,1);assert.deepEqual(r.counts,{attempts:1,receipts:1,acceptances:1});assert.equal(new Set(r.output.authorizationStages).size,18);assert.ok(r.output.authorizationStages.includes('successor_after_write'));assert.equal(r.output.operationalReadiness,false);
});
test('unmounted native named runtime stops at actual generation withdrawal while preserving admitted effects',async()=>{
 for(const [stage,counts,reservations]of [['activation_before_attempt',{attempts:0,receipts:0,acceptances:0},0],['successor_after_write',{attempts:1,receipts:1,acceptances:1},1]]){
  const r=await rehearseExactNamedConfirmation({artifact,build:nominalBuild(stage),mode:'confirmed',reserve:'true'});
  assert.equal(r.output.status,'uncertain',JSON.stringify(r.output));assert.deepEqual(r.counts,counts);assert.equal(r.reservationCount,reservations);assert.equal(r.output.mayRetry,false);assert.equal(r.output.operationalReadiness,false);
 }
});
