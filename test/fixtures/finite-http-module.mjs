import {build} from 'esbuild';
import {randomUUID} from 'node:crypto';
// Synthetic source-private process worlds. Each bundle has independent module
// state; no production reset hook, environment flag or DTO can reset a cap.
export async function finiteHttpModule(){
 const b=await build({stdin:{contents:"export * from './lib/mcp-qa-finite-http.mjs';export {validateQaFiniteConfirmationCommand} from './lib/mcp-qa-cloud-lifecycle-admission.mjs';",resolveDir:process.cwd()},bundle:true,write:false,format:'esm',platform:'node',external:['node:*']});
 return import('data:text/javascript;base64,'+Buffer.from(b.outputFiles[0].text).toString('base64')+'#'+randomUUID());
}
export function syntheticOriginalEnvironment(plan,{pid=process.pid,attempt='1'}={}){
 Object.assign(process.env,{AFW_FINITE_RESTORE_ORIGINAL_PID:String(pid),GITHUB_JOB:'restore',GITHUB_ACTION:'finite_restore_once',GITHUB_RUN_ID:String(plan.finalizer.runId),GITHUB_RUN_ATTEMPT:attempt,GITHUB_SHA:plan.preview.sourceRevision});
}
export function syntheticCommand(api,f){
 const v=f.preview,actor={id:290715446,login:'tokenizartinfo-ops',type:'User'};
 return api.validateQaFiniteConfirmationCommand({event:{action:'created',repository:{id:1347578006,full_name:'tokenizartinfo-ops/agent-friendly-web'},issue:{number:497},sender:actor,comment:{id:Number(f.plan.commandId),body:'/afw-qa-finite-confirmation v1 '+v.sourceRevision,created_at:new Date(v.T0).toISOString(),author_association:'OWNER',user:actor}},context:{repository:'tokenizartinfo-ops/agent-friendly-web',repositoryId:'1347578006',ref:'refs/heads/main',eventName:'issue_comment',runId:String(f.plan.finalizer.runId),runAttempt:'1',sourceRevision:v.sourceRevision},now:f.f.now});
}
