import {G20_FIXED,G20_SCHEMA} from './fixed.mjs';
import {gBad,gKeys,gSame,gSchema} from './shape.mjs';
import {g20Partial} from './partial.mjs';
import {gApiJoin,g20Trusted,g20Tree,g20Log,gZipPayload,gTime} from './transport.mjs';
// Independent safe-projection reader. Actual raw child TAP/private target bytes are not supplied or authenticated.
function g20Read(input,trusted,hash,inflate){
 if(!gKeys(input,['run','jobs','commit','tree','transport','artifact'])||typeof hash!=='function')gBad();
 const edges=g20Trusted(trusted,hash),joined=gApiJoin(input.run,input.jobs,input.commit,trusted.expected),tree=g20Tree(input.tree,trusted.expected,edges),t=input.transport;
 if(!gKeys(t,['runId','jobId','rawLog'])||t.runId!==input.run.id||t.jobId!==joined.jobId)gBad();
 const lines=g20Log(t.rawLog,joined),markers=['AFW_C2_GREEN20_FRONTIER_DIAG1_CUSTODY','AFW_C2_GREEN20_FRONTIER_DIAG1_OUTCOME'],defs=['custody','outcome'],caps=[1024,24576],values=[];
 for(let i=0;i<2;i++){const prefix=markers[i]+' ';if(!lines[i].startsWith(prefix))gBad();const text=lines[i].slice(prefix.length);if(Buffer.byteLength(text)>caps[i])gBad();let value;try{value=JSON.parse(text);}catch{gBad();}if(JSON.stringify(value)!==text||!gSchema(value,G20_SCHEMA.$defs[defs[i]],G20_SCHEMA))gBad();values.push(value);}
 const [custody,outcome]=values;
 if(!gSame(custody.context,joined.context)||!gSame(outcome.context,joined.context)||!gSame(outcome.custody,custody)||custody.checkedProcesses!==custody.preflightProcesses+custody.greenProcesses)gBad();
 const replay=g20Partial(outcome.observation,hash),a=input.artifact;
 if(!gKeys(a,['runId','jobId','listing','artifactId','fileName','archiveBase64','payloadText'])||a.runId!==input.run.id||a.jobId!==joined.jobId||a.fileName!==G20_FIXED.sourceNomination.artifact.fileName||typeof a.payloadText!=='string'||Buffer.byteLength(a.payloadText)>24577||a.payloadText!==JSON.stringify(outcome)+'\n'||a.listing?.total_count!==1||!Array.isArray(a.listing.artifacts)||a.listing.artifacts.length!==1)gBad();
 const item=a.listing.artifacts[0],zip=gZipPayload(a.archiveBase64,a.fileName,inflate),digest=hash(zip.archive);
 if(!item||item.id!==a.artifactId||!Number.isSafeInteger(item.id)||item.id<1||item.name!==G20_FIXED.sourceNomination.artifact.name||item.expired!==false||item.size_in_bytes!==zip.archive.length||item.digest!=='sha256:'+digest||item.workflow_run?.id!==input.run.id||item.workflow_run?.head_sha!==trusted.expected.head||item.workflow_run?.head_branch!==trusted.expected.branch||!zip.payload.equals(Buffer.from(a.payloadText)))gBad();
 const created=gTime(item.created_at),expires=gTime(item.expires_at),job=input.jobs.jobs[0];if(created<gTime(job.started_at)-1000||created>gTime(job.completed_at)+1000||Math.abs(expires-created-604800000)>1000)gBad();
 return {diagnosticCollectionAccepted:true,context:joined.context,jobId:joined.jobId,commandStepNumber:joined.commandStep.number,tree,replay,sourceReads:outcome.sourceReads,custody,capture:outcome.observation.capture,artifact:{id:item.id,archiveBytes:zip.archive.length,archiveSha256:digest,payloadBytes:zip.payload.length,payloadSha256:hash(zip.payload)},nativeQualification:false,SourceQualified:false,Task1Pass:false,nonclaims:JSON.parse(JSON.stringify(G20_FIXED.nonclaims))};
}
export {g20Read};
