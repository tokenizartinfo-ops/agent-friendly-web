import {constants} from 'node:fs';
import {lstat,mkdir,open,realpath,writeFile} from 'node:fs/promises';
import {isAbsolute,join,resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {assertQaLifecycleWindow,validateQaPreEntryCustodyCommand} from '../lib/mcp-qa-cloud-lifecycle-admission.mjs';
import {runQaClosedCustodyObservation} from '../lib/mcp-qa-cloud-clone.mjs';

const fail=()=>{throw Error('Closed QA custody entry unavailable');};
const receiptPath='afw-qa-closed-custody-result.json';

async function boundedJson(path,limit,privateFile=false){
 const handle=await open(path,constants.O_RDONLY|constants.O_NOFOLLOW);
 try{
  const v=await handle.stat();
  if(!v.isFile()||v.size<2||v.size>limit||
     privateFile&&(v.nlink!==1||(v.mode&0o077)!==0))fail();
  const bytes=Buffer.alloc(limit+1);
  const {bytesRead}=await handle.read(bytes,0,bytes.length,0);
  if(bytesRead!==v.size)fail();
  return JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(bytes.subarray(0,bytesRead)));
 }finally{await handle.close();}
}

async function writeReceipt(value){
 const text=JSON.stringify(value)+'\n';
 if(Buffer.byteLength(text)>16384)fail();
 await writeFile(receiptPath,text,{flag:'wx',mode:0o600});
 console.log('AFW_CLOSED_CUSTODY_RESULT '+text.trim());
}

let stage='entry';
try{
 const mode=process.argv[2],env=process.env;
 if(process.argv.length!==3||!['prepare','observe'].includes(mode)||env.GITHUB_ACTIONS!=='true'||
    env.GITHUB_SERVER_URL!=='https://github.com'||env.GITHUB_API_URL!=='https://api.github.com')fail();
 const cwd=fileURLToPath(new URL('..',import.meta.url));
 if(resolve(cwd)!==process.cwd())fail();
 const {GITHUB_EVENT_PATH:path,RUNNER_TEMP:runner}=env;
 if(typeof path!=='string'||!isAbsolute(path)||typeof runner!=='string'||!isAbsolute(runner)||
    resolve(runner)!==runner||await realpath(runner)!==runner||(await lstat(runner)).isSymbolicLink())fail();
 stage='admission';
 const event=await boundedJson(path,1048576),now=()=>Date.now();
 const admission=validateQaPreEntryCustodyCommand({event,now,context:{
  repository:env.GITHUB_REPOSITORY,repositoryId:env.GITHUB_REPOSITORY_ID,ref:env.GITHUB_REF,
  eventName:env.GITHUB_EVENT_NAME,runId:env.GITHUB_RUN_ID,runAttempt:env.GITHUB_RUN_ATTEMPT,sourceRevision:env.GITHUB_SHA
 }});
 assertQaLifecycleWindow(admission,'nominal',180000);
 const directory=join(runner,'afw-qa-closed-custody'),artifactPath=join(directory,'prepared.json');
 if(mode==='prepare'){
  stage='r2_and_compiler';
  const readCredential=env.AFW_R2_BACKUPS_READ_URL;
  delete env.AFW_R2_BACKUPS_READ_URL;
  if([env.AFW_QA_CLOSED_TOKEN,env.GITHUB_TOKEN,env.AFW_MCP_CLOSURE_READ_TOKEN,env.AFW_MCP_CLOSURE_PUBLISH_TOKEN]
   .some(value=>value!==undefined))fail();
  const {prepareQaClosedCustodyArtifact}=await import('./build-finite-native-package.mjs');
  const {releaseZipSha256,artifact}=await prepareQaClosedCustodyArtifact({cwd,sourceRevision:admission.sourceRevision},readCredential);
  assertQaLifecycleWindow(admission,'nominal',180000);
  if(releaseZipSha256!==admission.releaseZipSha256||artifact.sha256!==admission.wrapperSha256)fail();
  await mkdir(directory,{mode:0o700});
  await writeFile(artifactPath,JSON.stringify({intentId:admission.intentId,releaseZipSha256,artifact}),{flag:'wx',mode:0o600});
  console.log(JSON.stringify({status:'prepared',sourceRevision:admission.sourceRevision,releaseZipSha256,
   wrapperSha256:artifact.sha256,operationalReadiness:false}));
 }else{
  stage='prepared_input';
  if(env.AFW_R2_BACKUPS_READ_URL!==undefined||await realpath(directory)!==directory||
     (await lstat(directory)).isSymbolicLink())fail();
  const prepared=await boundedJson(artifactPath,200000,true);
  if(prepared?.intentId!==admission.intentId||prepared.releaseZipSha256!==admission.releaseZipSha256)fail();
  stage='controller';
  const result=await runQaClosedCustodyObservation({admission,credential:env.AFW_QA_CLOSED_TOKEN,
   githubCredential:env.GITHUB_TOKEN,fetchImpl:fetch,now,artifact:prepared.artifact,
   readerCredential:env.AFW_MCP_CLOSURE_READ_TOKEN,publisherCredential:env.AFW_MCP_CLOSURE_PUBLISH_TOKEN});
  stage='settlement';
  let valid=true;
  try{assertQaLifecycleWindow(admission,'cleanup');}catch{valid=false;}
  if(!valid)fail();
  await writeReceipt(result);
  if(result.status!=='verified'||result.nativeCustodyObservationVerified!==true||result.finalClosedVerified!==true)
   process.exitCode=1;
 }
}catch{
 const blocked={purpose:'afw.qa-cloud-closed-custody-entry.v1',status:stage==='settlement'||stage==='controller'?'uncertain':'blocked',
  stage,authorizesEffects:false,operationalReadiness:false,mayRetry:false};
 try{await writeReceipt(blocked);}catch{/* Preserve exclusive existing evidence. */}
 process.exitCode=1;
}

