import {readFile,writeFile,stat,lstat,realpath} from 'node:fs/promises';
import {validateQaNativeObservationCommand,assertQaLifecycleWindow} from '../lib/mcp-qa-cloud-lifecycle-admission.mjs';
import {runQaNativeMetadataObservation} from '../lib/mcp-qa-cloud-clone.mjs';
import {join,isAbsolute,resolve} from 'node:path';
import {validateQaNativeArtifact} from '../lib/mcp-qa-native-artifact.mjs';
const fail=()=>{throw Error('Closed QA cloud entry unavailable');};
let admission=null,result,entryStage='event_file';
try{
 if(process.argv.length!==2||process.env.GITHUB_ACTIONS!=='true')fail();
 const path=process.env.GITHUB_EVENT_PATH;if(typeof path!=='string'||!path)fail();
 const info=await stat(path);if(!info.isFile()||info.size>1048576)fail();
 const raw=await readFile(path,'utf8');if(Buffer.byteLength(raw)>1048576)fail();
 const event=JSON.parse(raw),now=()=>Date.now();
 entryStage='admission';admission=validateQaNativeObservationCommand({event,context:{repository:process.env.GITHUB_REPOSITORY,repositoryId:process.env.GITHUB_REPOSITORY_ID,ref:process.env.GITHUB_REF,eventName:process.env.GITHUB_EVENT_NAME,runId:process.env.GITHUB_RUN_ID,runAttempt:process.env.GITHUB_RUN_ATTEMPT,sourceRevision:process.env.GITHUB_SHA},now});
 entryStage='artifact_load';
 const runner=process.env.RUNNER_TEMP;if(typeof runner!=='string'||!isAbsolute(runner)||resolve(runner)!==runner||await realpath(runner)!==runner||(await lstat(runner)).isSymbolicLink())fail();
 const dir=join(runner,'afw-native-observation');if(await realpath(dir)!==dir||(await lstat(dir)).isSymbolicLink())fail();
 const readPrivate=async(name,cap)=>{const p=join(dir,name),s=await lstat(p);if(!s.isFile()||s.isSymbolicLink()||s.size>cap||s.nlink!==1||(s.mode&0o077)!==0)fail();const b=await readFile(p);if(b.length>cap)fail();return b;};
 const manifest=JSON.parse((await readPrivate('wrapper-manifest.json',4096)).toString('utf8'));if(Object.hasOwn(manifest,'base64'))fail();
 const artifact=validateQaNativeArtifact({artifact:{...manifest,base64:(await readPrivate('index.mjs',131072)).toString('base64')},sourceRevision:admission.sourceRevision});
 entryStage='controller';result=await runQaNativeMetadataObservation({admission,credential:process.env.AFW_QA_CLOSED_TOKEN,githubCredential:process.env.GITHUB_TOKEN,fetchImpl:fetch,now,artifact});
 entryStage='settlement';if(result.purpose!=='afw.qa-cloud-native-observation.v1'||result.intentId!==admission.intentId||result.sourceRevision!==admission.sourceRevision||result.operationalReadiness!==false||result.authorizesEffects!==false)fail();
 let text=JSON.stringify(result);if(Buffer.byteLength(text)>15000)fail();
 let timely=true;try{assertQaLifecycleWindow(admission,'cleanup');}catch{timely=false;}
 if(!timely){const retained=JSON.parse(text);text=JSON.stringify({...retained,status:'uncertain',entrySettlementTimely:false,finalClosedVerified:false,nativeMetadataObservationVerified:false,finalReadback:null,retainedDatedReadback:retained.finalReadback,uncertain:true});}
 text+='\n';if(Buffer.byteLength(text)>16384)fail();
 entryStage='artifact';await writeFile('afw-qa-native-observation-result.json',text,{flag:'wx',mode:0o600});
 console.log('AFW_QA_NATIVE_OBSERVATION_RESULT '+text.trim());if(!timely||result.status!=='verified')process.exitCode=1;
}catch{
 const blocked={purpose:'afw.qa-cloud-native-observation-entry.v1',status:'blocked',stage:entryStage,authorizesEffects:false,operationalReadiness:false,mayRetry:false};
 try{await writeFile('afw-qa-native-observation-entry-failure.json',JSON.stringify(blocked)+'\n',{flag:'wx',mode:0o600});}catch{/* No overwrite of an existing evidence file. */}
 console.log('AFW_QA_NATIVE_OBSERVATION_ENTRY_RESULT '+JSON.stringify(blocked));
 console.error('Closed QA cloud entry blocked; no credential or provider details.');process.exitCode=1;
}
