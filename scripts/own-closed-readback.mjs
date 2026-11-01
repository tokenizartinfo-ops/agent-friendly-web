import {readFile,stat,writeFile} from 'node:fs/promises';
import {validateOwnClosedReadbackCommand} from '../lib/mcp-qa-own-closed-command.mjs';
import {createOwnClosedReadbackApi} from '../lib/mcp-qa-own-closed-api.mjs';
import {readOwnClosedRuntime} from '../lib/mcp-qa-own-closed-readback.mjs';
let client,admission,result,stage='event_file';
try{
 if(process.argv.length!==2||typeof process.env.GITHUB_EVENT_PATH!=='string')throw Error('unavailable');
 const file=process.env.GITHUB_EVENT_PATH,info=await stat(file);if(!info.isFile()||info.size>1048576)throw Error('unavailable');
 const raw=await readFile(file,'utf8');if(Buffer.byteLength(raw)>1048576)throw Error('unavailable');const event=JSON.parse(raw);
 stage='command';
 admission=validateOwnClosedReadbackCommand({event,context:{repository:process.env.GITHUB_REPOSITORY,repositoryId:process.env.GITHUB_REPOSITORY_ID,ref:process.env.GITHUB_REF,eventName:process.env.GITHUB_EVENT_NAME,runId:process.env.GITHUB_RUN_ID,runAttempt:process.env.GITHUB_RUN_ATTEMPT,sourceRevision:process.env.GITHUB_SHA},now:Date.now});
 stage='transport';client=createOwnClosedReadbackApi({credential:process.env.AFW_QA_CLOSED_TOKEN,fetchImpl:fetch,now:Date.now});
 stage='proof';const proof=await readOwnClosedRuntime({request:client.request,now:Date.now});client.assertCurrent();
 if(proof.purpose!=='afw.own-closed-readback.v1'||proof.status!=='closed'||proof.readOnly!==true||proof.authorizesEffects!==false||proof.operationalReadiness!==false)throw Error('unavailable');
 result={...proof,sourceRevision:admission.sourceRevision,commentId:admission.commentId,runId:admission.runId,eventCreatedAt:new Date(admission.createdAt).toISOString(),eventAdmittedAt:new Date(admission.admittedAt).toISOString()};client.assertCurrent();
}catch{
 result={purpose:'afw.own-closed-readback.v1',status:'blocked',stage,observedAt:new Date().toISOString(),sourceRevision:admission?.sourceRevision??'unknown',commentId:admission?.commentId??'unknown',runId:admission?.runId??'unknown',diagnostic:client?.readDiagnostic()??null,readOnly:true,authorizesEffects:false,guardLivenessVerified:false,nativeWithdrawalVerified:false,operationalReadiness:false,mayRetry:false};process.exitCode=1;
}finally{client?.close();}
let text=JSON.stringify(result);
if(Buffer.byteLength(text)>8192){text=JSON.stringify({purpose:'afw.own-closed-readback.v1',status:'blocked',stage:'output_budget',readOnly:true,authorizesEffects:false,operationalReadiness:false,mayRetry:false});process.exitCode=1;}
try{await writeFile('afw-own-closed-readback-result.json',text+'\n',{flag:'wx',mode:0o600});console.log('AFW_OWN_CLOSED_READBACK_RESULT '+text);}catch{console.error('AFW own closed readback result could not be preserved.');process.exitCode=1;}
