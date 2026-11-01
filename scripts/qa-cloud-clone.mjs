import {readFile,writeFile,stat} from 'node:fs/promises';
import {validateQaLifecycleCommand,assertQaLifecycleWindow} from '../lib/mcp-qa-cloud-lifecycle-admission.mjs';
import {runQaClosedCloudClone} from '../lib/mcp-qa-cloud-clone.mjs';
const fail=()=>{throw Error('Closed QA cloud entry unavailable');};
let admission=null,result;
try{
 const path=process.env.GITHUB_EVENT_PATH;if(typeof path!=='string'||!path)fail();
 const info=await stat(path);if(!info.isFile()||info.size>1048576)fail();
 const raw=await readFile(path,'utf8');if(Buffer.byteLength(raw)>1048576)fail();
 const event=JSON.parse(raw),now=()=>Date.now();
 admission=validateQaLifecycleCommand({event,context:{repository:process.env.GITHUB_REPOSITORY,repositoryId:process.env.GITHUB_REPOSITORY_ID,ref:process.env.GITHUB_REF,eventName:process.env.GITHUB_EVENT_NAME,runId:process.env.GITHUB_RUN_ID,runAttempt:process.env.GITHUB_RUN_ATTEMPT,sourceRevision:process.env.GITHUB_SHA},now});
 result=await runQaClosedCloudClone({admission,credential:process.env.AFW_QA_CLOSED_TOKEN,githubCredential:process.env.GITHUB_TOKEN,fetchImpl:fetch,now});
 if(result.purpose!=='afw.qa-closed-cloud-clone.v1'||result.intentId!==admission.intentId||result.sourceRevision!==admission.sourceRevision||result.operationalReadiness!==false||result.authorizesEffects!==false)fail();
 let text=JSON.stringify(result);if(Buffer.byteLength(text)>15000)fail();
 let timely=true;try{assertQaLifecycleWindow(admission,'cleanup');}catch{timely=false;}
 if(!timely){const retained=JSON.parse(text);text=JSON.stringify({...retained,status:'uncertain',entrySettlementTimely:false,finalClosedVerified:false,finalReadback:null,retainedDatedReadback:retained.finalReadback,uncertain:true});}
 text+='\n';if(Buffer.byteLength(text)>16384)fail();
 await writeFile('afw-qa-closed-clone-result.json',text,{flag:'wx',mode:0o600});
 console.log('AFW_QA_CLOSED_CLONE_RESULT '+text.trim());if(!timely||result.status!=='verified')process.exitCode=1;
}catch{
 const blocked={purpose:'afw.qa-closed-cloud-clone-entry.v1',status:'blocked',stage:'entry',authorizesEffects:false,operationalReadiness:false,mayRetry:false};
 try{await writeFile('afw-qa-closed-clone-entry-failure.json',JSON.stringify(blocked)+'\n',{flag:'wx',mode:0o600});}catch{/* No overwrite of an existing evidence file. */}
 console.error('Closed QA cloud entry blocked; no credential or provider details.');process.exitCode=1;
}
