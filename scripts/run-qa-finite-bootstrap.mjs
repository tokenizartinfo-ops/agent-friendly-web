import process from 'node:process';
import {readFile} from 'node:fs/promises';
import {pathToFileURL} from 'node:url';
import {validateQaBootstrapCommand} from '../lib/mcp-qa-finite-bootstrap-admission.mjs';
import {issueFiniteQaBootstrap} from '../lib/mcp-qa-finite-bootstrap-issuer.mjs';
/** Original source CLI only. No artifact/pin/clock/provider URL inputs. */
export async function runFiniteQaBootstrapCli(){
 const e=process.env,raw=await readFile(e.GITHUB_EVENT_PATH,'utf8');
 if(Buffer.byteLength(raw)>262144)throw Error('Finite QA bootstrap unavailable');
 const event=JSON.parse(raw),context={repository:e.GITHUB_REPOSITORY,repositoryId:e.GITHUB_REPOSITORY_ID,ref:e.GITHUB_REF,eventName:e.GITHUB_EVENT_NAME,runId:e.GITHUB_RUN_ID,runAttempt:e.GITHUB_RUN_ATTEMPT,sourceRevision:e.GITHUB_SHA};
 const admission=validateQaBootstrapCommand({event,context,now:Date.now});
 return issueFiniteQaBootstrap({admission,githubToken:e.GITHUB_TOKEN,credential:e.AFW_QA_CLOSED_TOKEN,signal:AbortSignal.timeout(Math.max(1,admission.Pend-Date.now()))});
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){
 try{if(process.argv.length!==2)throw Error();await runFiniteQaBootstrapCli();}
 catch{console.error('Finite QA bootstrap unavailable; no automatic retry');process.exitCode=1;}
}
