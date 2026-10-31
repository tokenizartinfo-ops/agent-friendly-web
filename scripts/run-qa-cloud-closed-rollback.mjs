import {writeFile} from 'node:fs/promises';
import {parseQaCloudClosedInvocation} from '../lib/mcp-qa-cloud-closed-invocation.mjs';
import {createQaCloudClosedHttpAdapters} from '../lib/mcp-qa-cloud-closed-http.mjs';
import {createPrivateQaCloudClosedRollback} from '../lib/mcp-qa-cloud-closed-rollback.mjs';
const abort=new AbortController(),stop=()=>abort.abort();
process.once('SIGINT',stop);process.once('SIGTERM',stop);
let result={purpose:'afw.qa-cloud-closed-rollback-result.v1',status:'blocked',diagnosticOnly:true,operationalReadiness:false,mayRetry:false};
try{
 const invocation=parseQaCloudClosedInvocation({env:process.env,argv:process.argv.slice(2),now:Date.now});
 const {plan,pins,sourceSha,runId,operation}=invocation;
 const adapters=createQaCloudClosedHttpAdapters({plan,pins,credential:process.env.AFW_QA_CLOSED_TOKEN,githubToken:process.env.GITHUB_TOKEN,sourceSha,fetchImpl:globalThis.fetch,now:Date.now});
 const executor=createPrivateQaCloudClosedRollback({plan,pins:{candidateVersionId:pins.qaCandidate.id,closedVersionId:pins.qaClosed.id},...adapters,now:Date.now,timeoutMs:30000,signal:abort.signal});
 result={...await executor.run(operation),sourceSha,runId,sessionId:plan.sessionId,observedAt:new Date().toISOString()};
}catch{/* No provider error, header, credential or response body is retained. */}
finally{process.removeListener('SIGINT',stop);process.removeListener('SIGTERM',stop);abort.abort();}
if(!['closed_candidate_observed','already_closed_observed','restored_observed'].includes(result.status))process.exitCode=1;
try{await writeFile('afw-qa-cloud-closed-result.json',JSON.stringify(result,null,2)+'\n',{mode:0o600});process.stdout.write(JSON.stringify(result)+'\n');}catch{process.exitCode=1;}
