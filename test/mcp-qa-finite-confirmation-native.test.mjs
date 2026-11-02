import test from 'node:test';
import assert from 'node:assert/strict';
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
// Only the C2 external source is synthetic. The Known spy checks ONLY identity,
// exact four keys and result preservation; its actual tests own business stages.
const entry=`
import {PrivateQaNamedConfirmation} from './worker/independent-closure/finite.mjs';
import {finiteFixture,digest,hash} from './test/fixtures/qa-finite-trial.mjs';
import {inertNamedConfirmationPolicy} from './test/fixtures/inert-named-confirmation-policy.mjs';
import {activationConfigurationHash} from './lib/mcp-activation-observer.mjs';
import {finiteCleanupPolicyHash} from './lib/mcp-finite-cleanup-policy.mjs';
export const state={};
export function material({env,event,step,parent}){
 parent.check();state.reads++;
 if(env!==state.env||event!==state.event||step!==state.step)throw Error('identity changed');
 if(state.mode==='missing-source')throw Error('synthetic source missing');
 if(state.mode==='hydration-expired')state.at+=5001;
 if(state.mode==='mutated-event')event.timestamp.setTime(event.timestamp.getTime()+1);
 const value=structuredClone(state.material);
 if(state.mode==='wrong-source')value.execution.sourceRevision='a'.repeat(40);
 if(state.mode==='wrong-plan')value.plan=value.plan.replace('"N1":','"extra":0,"N1":');
 return value;
}
export async function known(input){state.calls++;state.same=input.env===state.env&&input.event===state.event&&input.step===state.step;state.keys=Object.keys(input).sort();if(state.mode==='known-throws')throw Error('synthetic Known throw');state.result={status:'blocked',mayRetry:false,operationalReadiness:false};return state.result;}
export default {async fetch(request){
 const {mode}=await request.json();state.mode=mode;state.calls=0;state.reads=0;
 const real=Date.now(),f=finiteFixture({at:real+600000}),p=f.plan;state.at=p.T0+150000;Date.now=()=>state.at;
 const script='export default {fetch(){return new Response(null,{status:404})}}',artifact={script,sourceRevision:'a'.repeat(40),sourceTree:'b'.repeat(40),programHash:'c'.repeat(64),workerHash:hash(script),sourceCheck:'git-inputs-before-after-v1'},policy=inertNamedConfirmationPolicy(artifact);
 const window={startAt:p.T0,expiresAt:p.N1};Object.assign(policy,window);Object.assign(policy.plan,window);
 const bindings=policy.observation.configuration.bindings,mb=bindings.find(b=>b.name==='AFW_DOSSIER_SUCCESSOR_POLICY'),manifest=JSON.parse(mb.text);Object.assign(manifest.candidate,window);mb.text=JSON.stringify(manifest);
 const eb=bindings.find(b=>b.name==='AFW_DOSSIER_EVENTS_POLICY');eb.text=JSON.stringify({...JSON.parse(eb.text),...window});policy.plan.configurationHash=activationConfigurationHash(policy.observation.configuration);
 const bundle={artifact,policy},bundleHash=hash(JSON.stringify(bundle));p.bundleHash=bundleHash;p.workflows.confirmation='afw-release-'+bundleHash;p.closePolicyHash=finiteCleanupPolicyHash(p);
 const execution={intentId:p.intentId,finitePlanHash:digest(p.purpose,p),controlHash:'1'.repeat(64),sourceRevision:p.source.revision,qaVersionId:p.deployments.qaLive.versionId,actorId:p.resources.actorId,launcherId:p.workflows.launcher,nominalId:p.workflows.confirmation,bundleHash,preparedHash:'2'.repeat(64),sendHash:'3'.repeat(64),bindingHash:'4'.repeat(64),createdAt:state.at};
 state.material={bundle,plan:JSON.stringify(p),execution};
 const event={timestamp:new Date(state.at),instanceId:p.workflows.confirmation,payload:{planHash:bundleHash}};
 if(mode==='early')event.timestamp=new Date(p.T0+149999);
 if(mode==='late')event.timestamp=new Date(p.T0+160001);
 if(mode==='future')event.timestamp=new Date(state.at+1);
 if(mode==='queued-expired')state.at+=70000;
 if(mode==='wrong-payload')event.payload.extra=true;
 if(mode==='wrong-id')event.instanceId='wrong';
 if(mode==='schedule')event.schedule='x';
 if(mode==='wrong-name')event.workflowName='foreign';
 if(mode==='timestamp-not-date')event.timestamp=state.at;
 if(mode==='at-last-create'){state.at=p.T0+160000;event.timestamp=new Date(state.at);execution.createdAt=state.at;}
 state.env={AFW_QA_VERSION:{id:p.deployments.qaLive.versionId},AFW_INDEPENDENT_CLOSURE:{idFromName:()=>({toString:()=>p.resources.actorId})}};state.event=event;state.step={do(){throw Error('no added business stage');}};
 const workflow=new PrivateQaNamedConfirmation({},state.env),result=await workflow.run(event,state.step);
 return Response.json({result,calls:state.calls,reads:state.reads,same:state.same,keys:state.keys,preserved:result?.result===state.result});
}};
`;
let bundled;
async function run(mode){
 if(!bundled)bundled=(await build({stdin:{contents:"export {default} from 'synthetic-entry';",resolveDir:process.cwd(),sourcefile:'synthetic-confirmation-entry.mjs'},bundle:true,write:false,format:'esm',platform:'neutral',mainFields:['module','main'],external:['node:*','cloudflare:*'],plugins:[{name:'synthetic-source-and-identity-spy',setup(b){
 b.onLoad({filter:/mcp-qa-finite-confirmation-source\.mjs$/},()=>({contents:"export {material as readPrivateQaFiniteConfirmationMaterial} from 'synthetic-entry';",loader:'js'}));
 b.onResolve({filter:/^synthetic-entry$/},()=>({path:'entry',namespace:'synthetic'}));b.onLoad({filter:/.*/,namespace:'synthetic'},()=>({contents:entry,resolveDir:process.cwd(),loader:'js'}));
 b.onLoad({filter:/mcp-release-runtime\.mjs$/},()=>({contents:"export {known as runKnownCancellationReleaseWorkflow} from 'synthetic-entry'; export async function runReleaseWorkflow(){return {status:'blocked'}};export async function runReleaseOperator(){return {status:'blocked'}};",loader:'js'}));
 }}]})).outputFiles[0].text;
 const mf=new Miniflare(convertV4MiniflareOptions({modules:true,script:bundled,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat']}));
 try{const r=await mf.dispatchFetch('https://fixture.invalid',{method:'POST',body:JSON.stringify({mode})});assert.equal(r.status,200,await r.clone().text());return r.json();}finally{await mf.dispose();}
}
for(const mode of ['success','at-last-create'])test('finite nominal original event handoff '+mode,async()=>{
 const r=await run(mode);assert.equal(r.calls,1);assert.equal(r.same,true);assert.deepEqual(r.keys,['bundle','env','event','step']);assert.equal(r.result.purpose,'afw.finite-confirmation-result.v1');assert.equal(r.preserved,true);
});
for(const mode of ['early','late','future','queued-expired','wrong-payload','wrong-id','schedule','wrong-name','timestamp-not-date','missing-source','hydration-expired','mutated-event','wrong-source','wrong-plan'])test('finite nominal rejects '+mode+' before Known',async()=>{const r=await run(mode);assert.equal(r.calls,0);assert.equal(r.result.status,'blocked');assert.equal(r.result.purpose,undefined);});
test('Known throw cannot fabricate finite result envelope',async()=>{const r=await run('known-throws');assert.equal(r.calls,1);assert.equal(r.result.purpose,undefined);});
