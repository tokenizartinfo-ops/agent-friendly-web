Error.stackTraceLimit=0;
import {build} from 'esbuild';
import {randomUUID} from 'node:crypto';
// Synthetic source-private process worlds. Each bundle has independent module
// state; no production reset hook, environment flag or DTO can reset a cap.
export async function finiteHttpModule(){
 const b=await build({stdin:{contents:"export * from './lib/mcp-qa-finite-http.mjs';export {validateQaFiniteConfirmationCommand} from './lib/mcp-qa-cloud-lifecycle-admission.mjs';",resolveDir:process.cwd()},bundle:true,write:false,format:'esm',platform:'node',external:['node:*'],banner:{js:"import {createRequire as __createRequire} from 'node:module'; const require = __createRequire(process.cwd()+'/package.json');"}});
 return import('data:text/javascript;base64,'+Buffer.from(b.outputFiles[0].text).toString('base64')+'#'+randomUUID());
}
export function syntheticOriginalEnvironment(plan,{pid=process.pid,attempt='1'}={}){
 Object.assign(process.env,{AFW_FINITE_RESTORE_ORIGINAL_PID:String(pid),GITHUB_JOB:'restore',GITHUB_ACTION:'finite_restore_once',GITHUB_RUN_ID:String(plan.finalizer.runId),GITHUB_RUN_ATTEMPT:attempt,GITHUB_SHA:plan.preview.sourceRevision});
}
export function syntheticCommand(api,f){
 const v=f.preview,actor={id:290715446,login:'tokenizartinfo-ops',type:'User'};
 return api.validateQaFiniteConfirmationCommand({event:{action:'created',repository:{id:1347578006,full_name:'tokenizartinfo-ops/agent-friendly-web'},issue:{number:497},sender:actor,comment:{id:Number(f.plan.commandId),body:'/afw-qa-finite-confirmation v1 '+v.sourceRevision,created_at:new Date(v.T0).toISOString(),author_association:'OWNER',user:actor}},context:{repository:'tokenizartinfo-ops/agent-friendly-web',repositoryId:'1347578006',ref:'refs/heads/main',eventName:'issue_comment',runId:String(f.plan.finalizer.runId),runAttempt:'1',sourceRevision:v.sourceRevision},now:f.f.now});
}

/** Explicit test SOURCE composition only; production CLI accepts no factory. */
export async function finiteCliSyntheticSource(plan,{setupMode='normal',seedHash}={}){
 const source='export async function resolvePrivateQaFiniteExternalSource(){return '+JSON.stringify(plan)+';}';
 const setup=`
import {createHash} from 'node:crypto';
const canonical=v=>JSON.stringify(sort(v)),sort=v=>Array.isArray(v)?v.map(sort):v&&typeof v==='object'?Object.fromEntries(Object.keys(v).sort().map(k=>[k,sort(v[k])])):v;
const hash=v=>createHash('sha256').update(v).digest('hex');
export async function readPrivateQaFiniteSetupCompletion({intentId,sourceRevision,parent}){
 const p=${JSON.stringify(plan)},mode=${JSON.stringify(setupMode)};
 if(mode==='setup-missing')throw Error('synthetic missing setup');
 if(mode==='setup-held'){await new Promise(resolve=>parent.signal.addEventListener('abort',resolve,{once:true}));parent.check();}
 const seedHash=${JSON.stringify(seedHash??'6'.repeat(64))};
 const receipt={purpose:'afw.finite-policy-installed.v1',intentId,sourceRevision,setupInstanceId:'afw-finite-policy-'+hash('afw.finite-private-policy-setup.v1\\n'+canonical({intentId,sourceRevision})),qaVersionId:p.deployments.qaLive.versionId,seedHash,contextHash:'1'.repeat(64),baselineVersionId:p.deployments.canaryClosed.versionId,baselineDeploymentId:p.deployments.canaryClosed.deploymentId,versionId:p.deployments.canaryLive.versionId,deploymentId:p.deployments.canaryLive.deploymentId,moduleHash:p.deployments.canaryLive.module.sha256,publicStaticHash:'2'.repeat(64),activationHash:'3'.repeat(64),restorationHash:'4'.repeat(64),bindingsHash:'5'.repeat(64),installedAt:p.preview.T0};
 receipt.receiptHash=hash(receipt.purpose+'\\n'+canonical(receipt));
 const observedAt=parent.check(),instance={definitionName:'afw-own-qa-private-bootstrap',instanceId:receipt.setupInstanceId,status:mode==='setup-running'?'running':'complete',sourceRevision,qaVersionId:receipt.qaVersionId,completedAt:p.preview.T0,outputHash:hash(canonical({status:'installed',receipt}))};
 if(mode==='setup-bad-hash')instance.outputHash='0'.repeat(64);
 return {receipt,instance,observedAt};
}
`;
 const b=await build({stdin:{contents:"export {runFiniteFinalizerCli} from './scripts/run-qa-finite-trial-finalizer.mjs';",resolveDir:process.cwd()},bundle:true,write:false,format:'esm',platform:'node',external:['node:*'],banner:{js:"import {createRequire as __createRequire} from 'node:module'; const require = __createRequire(process.cwd()+'/package.json');"},plugins:[{name:'synthetic-source-module-only',setup(builder){builder.onLoad({filter:/mcp-qa-finite-source\.mjs$/},()=>({contents:source,loader:'js'}));builder.onLoad({filter:/mcp-qa-finite-adoption-source\.mjs$/},()=>({contents:setup,resolveDir:process.cwd(),loader:'js'}));}}]});
 return import('data:text/javascript;base64,'+Buffer.from(b.outputFiles[0].text).toString('base64')+'#'+randomUUID());
}
