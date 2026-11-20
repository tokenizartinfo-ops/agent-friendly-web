import {finiteSeedWire} from './mcp-qa-finite-seed-wire.mjs';
import {validateFiniteExternalPlan,FINITE_REPOSITORY} from './mcp-qa-finite-external-contract.mjs';
import {finiteFields as fields,finiteData as data,finiteHash as hash,finiteHex as hex,finiteTime as time} from './mcp-finite-evidence.mjs';

const origin='https://api.github.com/repos/'+FINITE_REPOSITORY;
const readyRef='refs/tags/afw-finite-ready/';
const fail=()=>{throw Error('Finite native launch READY unavailable');};
const owner=a=>a?.id===290715446&&a.login==='tokenizartinfo-ops'&&a.type==='User';
const repository=r=>r?.id===1347578006&&r.full_name===FINITE_REPOSITORY;
const stamp=value=>typeof value==='string'&&/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.\d{1,9})?Z$/.test(value)?Date.parse(value):NaN;

/** Read the original GitHub admission and successful READY step, on the same
 * invocation clock. A persisted tag is evidence only, not a send token. */
export async function readPrivateQaFiniteLaunchReady({external,parent}){
 const p=validateFiniteExternalPlan(external),v=p.preview,f=p.finalizer;
 const {signal,deadline,check}=fields(parent,['signal','deadline','check']),fetcher=globalThis.fetch;
 function current(){
  if(signal.aborted||parent.signal!==signal||parent.deadline!==deadline||parent.check!==check||globalThis.fetch!==fetcher)fail();
  const at=check();if(!time(at)||at<v.T0||at>=Math.min(deadline,p.launchPolicy.lastCreateAt))fail();return at;
 }
 const wire=finiteSeedWire({origin,signal,now:current,fetchImpl:fetcher,requests:6,limit:393216});
 const get=async path=>{current();const result=(await wire.request(path)).value;current();return result;};
 const name=readyRef+v.intentId+'/'+v.controlHash;
 try{
  const [ref,comment,main,run,jobs]=await Promise.all([
   get('/git/ref/tags/'+name.slice('refs/tags/'.length)),
   get('/issues/comments/'+p.commandId),get('/git/ref/heads/main'),
   get('/actions/runs/'+f.runId),get('/actions/runs/'+f.runId+'/attempts/1/jobs?per_page=100'),
  ]);
  if(ref?.ref!==name||ref.object?.type!=='tag'||!hex(ref.object.sha,40)||
     comment?.id!==Number(p.commandId)||comment.body!=='/afw-qa-finite-confirmation v1 '+v.sourceRevision||
     comment.issue_url!==origin+'/issues/497'||comment.author_association!=='OWNER'||!owner(comment.user)||
     stamp(comment.created_at)!==v.T0||main?.ref!=='refs/heads/main'||main.object?.type!=='commit'||main.object.sha!==v.sourceRevision||
     run?.id!==f.runId||run.run_attempt!==1||run.head_sha!==v.sourceRevision||run.head_branch!=='main'||run.event!=='issue_comment'||
     run.path!=='.github/workflows/afw-finite-finalizer.yml'||!repository(run.repository)||!repository(run.head_repository)||
     !owner(run.actor)||!owner(run.triggering_actor)||run.display_title!=='AFW finite finalizer comment-'+p.commandId+' source-'+v.sourceRevision||
     run.status!=='in_progress'||run.conclusion!=null||
     !Array.isArray(jobs?.jobs)||jobs.jobs.length>100||jobs.total_count!==jobs.jobs.length||
     new Set(jobs.jobs.map(j=>j.id)).size!==jobs.jobs.length)fail();
  const admits=jobs.jobs.filter(j=>j.name==='admit'),job=admits[0];
  if(admits.length!==1||job.id!==f.jobId||job.run_id!==f.runId||job.head_sha!==v.sourceRevision||
     job.status!=='in_progress'||job.conclusion!=null||!Array.isArray(job.steps)||job.steps.length>100)fail();
  const steps=job.steps.filter(step=>step.name===f.readyStep),step=steps[0];
  if(steps.length!==1||step.status!=='completed'||step.conclusion!=='success')fail();
  const jobStart=stamp(job.started_at),stepStart=stamp(step.started_at),stepEnd=stamp(step.completed_at);
  if([jobStart,stepStart,stepEnd].some(at=>!time(at))||jobStart<v.T0||stepStart<jobStart||stepEnd<stepStart||
     stepEnd>current()||stepEnd>p.launchPolicy.armAckBy)fail();
  const tag=await get('/git/tags/'+ref.object.sha);
  if(tag?.sha!==ref.object.sha||tag.tag!=='afw-finite-ready-'+v.intentId||
     tag.object?.type!=='commit'||tag.object.sha!==v.sourceRevision||typeof tag.message!=='string'||Buffer.byteLength(tag.message)>4096)fail();
  const a=fields(data(JSON.parse(tag.message)),['commandId','controlPlanHash','R1','resourceHash','custodyHash','validatedAt']);
  const {id,expiresAt,policyHash}=p.custody;
  if(JSON.stringify(a)!==tag.message||a.commandId!==p.commandId||a.controlPlanHash!==v.planHash||a.R1!==v.R1||
     a.resourceHash!==v.resourceHash||a.custodyHash!==hash({id,expiresAt,policyHash})||
     !time(a.validatedAt)||a.validatedAt<stepStart||a.validatedAt>stepEnd)fail();
  return data({purpose:'afw.qa-finite-finalizer-ready.v1',intentId:v.intentId,sourceRevision:v.sourceRevision,
   runtimeVersionId:v.runtimeVersionId,actorId:v.actorId,planHash:v.planHash,observedAt:current(),repository:FINITE_REPOSITORY,
   runId:f.runId,attempt:1,workflow:f.workflow,status:'in_progress',
   job:{id:f.jobId,status:'in_progress',startedAt:jobStart,steps:[{name:f.readyStep,status:'completed',conclusion:'success',startedAt:stepStart,completedAt:stepEnd}]},
   admission:a,evidenceHash:hash({reference:ref.object.sha,source:run.head_sha,runId:run.id,jobId:job.id,stepStart,stepEnd,tagMessage:tag.message})});
 }finally{wire.close();}
}
