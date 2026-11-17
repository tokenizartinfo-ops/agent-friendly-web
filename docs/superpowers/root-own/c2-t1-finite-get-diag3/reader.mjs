import {D3_ACTUAL,D3_MODEL} from './bindings.mjs';
import {gBad,gKeys,gSame,gSchema} from './legacy/shape.mjs';
import {g20Partial} from './legacy/partial.mjs';
import {d2FirstFailure} from './legacy/first-failure.mjs';
import {boundTransport} from './bound-transport.mjs';
import {finiteGet} from './finite-get.mjs';
// Both entrypoints use exactly this guard; only their frozen Root/model authority differs.
function readBound(input,trusted,hash,inflate,binding,bindingKind){
 const fixed=binding.fixed,schema=binding.schema;
 if(!gKeys(trusted,['expected','bodyEdges','bodyEdgesHash'])||!gSame(trusted.bodyEdges,binding.edges)||trusted.bodyEdgesHash!==binding.edgesHash)gBad();
 if(!gKeys(input,['run','jobs','commit','tree','transport','artifact'])||typeof hash!=='function')gBad();
 const {g20Trusted,gApiJoin,g20Tree,g20Log,gZipPayload,gTime}=boundTransport(fixed);
 const edges=g20Trusted(trusted,hash),joined=gApiJoin(input.run,input.jobs,input.commit,trusted.expected),tree=g20Tree(input.tree,trusted.expected,edges),t=input.transport;
 if(!gKeys(t,['runId','jobId','rawLog'])||t.runId!==input.run.id||t.jobId!==joined.jobId)gBad();
 const lines=g20Log(t.rawLog,joined),markers=['AFW_C2_FINITE_GET_DIAG3_CUSTODY','AFW_C2_FINITE_GET_DIAG3_OUTCOME'],defs=['custody','outcome'],caps=[1024,24576],values=[];
 for(let i=0;i<2;i++){
  const prefix=markers[i]+' ';if(!lines[i].startsWith(prefix))gBad();
  const text=lines[i].slice(prefix.length);if(Buffer.byteLength(text)>caps[i])gBad();
  let value;try{value=JSON.parse(text);}catch{gBad();}
  if(JSON.stringify(value)!==text||!gSchema(value,schema.$defs[defs[i]],schema))gBad();values.push(value);
 }
 const [custody,outcome]=values;
 if(!gSame(custody.context,joined.context)||!gSame(outcome.context,joined.context)||!gSame(outcome.custody,custody)||custody.checkedProcesses!==custody.preflightProcesses+custody.greenProcesses)gBad();
 const replay=g20Partial(outcome.observation,hash),firstFailure=d2FirstFailure(outcome.observation),finite=finiteGet(outcome.observation,schema,fixed.selected),a=input.artifact;
 if(!gKeys(a,['runId','jobId','listing','artifactId','fileName','archiveBase64','payloadText'])||a.runId!==input.run.id||a.jobId!==joined.jobId||a.fileName!==fixed.sourceNomination.artifact.fileName||typeof a.payloadText!=='string'||Buffer.byteLength(a.payloadText)>24577||a.payloadText!==JSON.stringify(outcome)+'\n'||a.listing?.total_count!==1||!Array.isArray(a.listing.artifacts)||a.listing.artifacts.length!==1)gBad();
 const item=a.listing.artifacts[0],zip=gZipPayload(a.archiveBase64,a.fileName,inflate),digest=hash(zip.archive);
 if(!item||item.id!==a.artifactId||!Number.isSafeInteger(item.id)||item.id<1||item.name!==fixed.sourceNomination.artifact.name||item.expired!==false||item.size_in_bytes!==zip.archive.length||item.digest!=='sha256:'+digest||item.workflow_run?.id!==input.run.id||item.workflow_run?.head_sha!==trusted.expected.head||item.workflow_run?.head_branch!==trusted.expected.branch||!zip.payload.equals(Buffer.from(a.payloadText)))gBad();
 const created=gTime(item.created_at),expires=gTime(item.expires_at),job=input.jobs.jobs[0];
 if(created<gTime(job.started_at)-1000||created>gTime(job.completed_at)+1000||Math.abs(expires-created-604800000)>1000)gBad();
 return {diagnosticCollectionAccepted:true,context:joined.context,jobId:joined.jobId,commandStepNumber:joined.commandStep.number,tree,replay,firstFailure,finiteGet:finite,bindingKind,finalSourceBinding:false,sourceReads:outcome.sourceReads,custody,capture:outcome.observation.capture,artifact:{id:item.id,archiveBytes:zip.archive.length,archiveSha256:digest,payloadBytes:zip.payload.length,payloadSha256:hash(zip.payload)},nativeQualification:false,SourceQualified:false,Task1Pass:false,nonclaims:JSON.parse(JSON.stringify(fixed.nonclaims))};
}
function d3Read(input,trusted,hash,inflate){return readBound(input,trusted,hash,inflate,D3_ACTUAL,'ROOT_PINNED_PRODUCER_DATA_R3');}
function d3ModelRead(input,trusted,hash,inflate){return readBound(input,trusted,hash,inflate,D3_MODEL,'MODELED_ONLY');}
export {d3Read,d3ModelRead};
