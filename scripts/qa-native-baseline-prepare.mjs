import {readFile,writeFile,stat,realpath,lstat} from 'node:fs/promises';
import {isAbsolute,resolve,join} from 'node:path';
import {inspectQaNativeCommand} from '../lib/mcp-qa-cloud-lifecycle-admission.mjs';
import {createOwnClosedReadbackApi} from '../lib/mcp-qa-own-closed-api.mjs';
import {validateQaClosedBaseVersion} from '../lib/mcp-qa-cloud-clone.mjs';
import {QA_CLOUD_CLOSED_PINS as P} from '../lib/mcp-qa-cloud-closed-pins.mjs';
let api;
try{
 if(process.argv.length!==2||process.env.GITHUB_ACTIONS!=='true')throw Error();
 const runner=process.env.RUNNER_TEMP,path=process.env.GITHUB_EVENT_PATH;
 if(typeof runner!=='string'||!isAbsolute(runner)||resolve(runner)!==runner||await realpath(runner)!==runner||(await lstat(runner)).isSymbolicLink()||typeof path!=='string')throw Error();
 const s=await stat(path);if(!s.isFile()||s.size>1048576)throw Error();const raw=await readFile(path,'utf8');if(Buffer.byteLength(raw)>1048576)throw Error();
 const options={event:JSON.parse(raw),context:{repository:process.env.GITHUB_REPOSITORY,repositoryId:process.env.GITHUB_REPOSITORY_ID,ref:process.env.GITHUB_REF,eventName:process.env.GITHUB_EVENT_NAME,runId:process.env.GITHUB_RUN_ID,runAttempt:process.env.GITHUB_RUN_ATTEMPT,sourceRevision:process.env.GITHUB_SHA},now:Date.now};
 const metadata=inspectQaNativeCommand(options);
 api=createOwnClosedReadbackApi({credential:process.env.AFW_QA_CLOSED_TOKEN,fetchImpl:fetch,now:Date.now});
 const e=await api.request({method:'GET',path:'/accounts/85d0d5dadac3341a564f22ce885e9eec/workers/workers/'+P.qaClosed.name+'/versions/'+P.qaClosed.id,query:{include:'modules'}});
 api.assertCurrent();const v=validateQaClosedBaseVersion(e.result);
 const after=inspectQaNativeCommand(options);if(after.intentId!==metadata.intentId)throw Error();
 await writeFile(join(runner,'afw-qa-legacy-exact-base.mjs'),Buffer.from(v.modules[0].content_base64,'base64'),{flag:'wx',mode:0o600});
 console.log('AFW_NATIVE_BASE_PREPARATION '+JSON.stringify({purpose:'afw.qa-native-base-preparation.v1',sourceRevision:metadata.sourceRevision,intentId:metadata.intentId,baselineVersionId:P.qaClosed.id,moduleHash:P.qaClosed.module.sha256,moduleBytes:P.qaClosed.module.bytes,readOnly:true,authorizesEffects:false,operationalReadiness:false}));
}catch{console.error('AFW native baseline preparation blocked; no remote writes or retry.');process.exitCode=1;}
finally{api?.close();}
