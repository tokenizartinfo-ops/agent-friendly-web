import {createHash} from 'node:crypto';
import {BOOTSTRAP,bootstrapHash,bootstrapHex,bootstrapFreeze} from './mcp-qa-finite-bootstrap-record.mjs';
const fail=()=>{throw Error('Finite QA bootstrap primary unavailable');};
const GH='https://api.github.com/repos/'+BOOTSTRAP.repository;
const actor=a=>a?.id===BOOTSTRAP.ownerId&&a.login==='tokenizartinfo-ops'&&a.type==='User';
const repo=r=>r?.id===BOOTSTRAP.repositoryId&&r.full_name===BOOTSTRAP.repository;
function sourceFile(v,path,expected){
 if(v?.type!=='file'||v.path!==path||v.encoding!=='base64'||!Number.isSafeInteger(v.size)||v.size<1||v.size>65536||typeof v.content!=='string'||v.content.length>90000)fail();
 const encoded=v.content.replace(/\n/g,''),bytes=Buffer.from(encoded,'base64');
 if(bytes.toString('base64')!==encoded||bytes.length!==v.size||createHash('sha1').update('blob '+bytes.length+'\0').update(bytes).digest('hex')!==v.sha||bootstrapHash(bytes)!==expected)fail();
 new TextDecoder('utf-8',{fatal:true}).decode(bytes);
}
/** Fixed source-owned caller supplies independently compiled file expectations.
 * Issuer observes in-progress only; reader demands actual successful terminals.
 * Technical correlation under trusted repo writers, not tag nonmutation proof. */
export async function readFiniteQaBootstrapPrimary({get,record:r,phase,now,expected}){
 if(!['issuer','reader'].includes(phase)||!bootstrapHex(expected?.workflowHash)||!bootstrapHex(expected?.cliHash)||r.workflowHash!==expected.workflowHash||r.cliHash!==expected.cliHash)fail();
 const [comment,main,run,commit,workflow,cli]=await Promise.all([
  get('/issues/comments/'+r.commandId),get('/git/ref/heads/main'),get('/actions/runs/'+r.runId),get('/git/commits/'+r.sourceRevision),
  get('/contents/'+BOOTSTRAP.workflowPath+'?ref='+r.sourceRevision),get('/contents/'+BOOTSTRAP.cliPath+'?ref='+r.sourceRevision)]);
 const P0=Date.parse(comment?.created_at),Pend=P0+300000,at=now();
 if(comment.id!==r.commandId||comment.body!=='/afw-qa-finite-bootstrap v1 '+r.sourceRevision||!actor(comment.user)||comment.author_association!=='OWNER'||comment.issue_url!==GH+'/issues/497'||!Number.isSafeInteger(P0)||P0<0||P0>at||r.P0!==undefined&&r.P0!==P0||r.Pend!==undefined&&r.Pend!==Pend||phase==='issuer'&&at>=Pend||main.ref!=='refs/heads/main'||main.object?.type!=='commit'||main.object.sha!==r.sourceRevision||commit.sha!==r.sourceRevision||commit.tree?.sha!==r.sourceTree)fail();
 if(run.id!==r.runId||run.run_attempt!==1||run.head_sha!==r.sourceRevision||run.head_branch!=='main'||run.event!=='issue_comment'||run.path!==BOOTSTRAP.workflowPath||!repo(run.repository)||!repo(run.head_repository)||!actor(run.actor)||!actor(run.triggering_actor)||run.display_title!=='AFW finite QA bootstrap comment-'+r.commandId+' source-'+r.sourceRevision||run.status!==(phase==='issuer'?'in_progress':'completed')||(phase==='reader'?run.conclusion!=='success':run.conclusion!==null))fail();
 sourceFile(workflow,BOOTSTRAP.workflowPath,expected.workflowHash);sourceFile(cli,BOOTSTRAP.cliPath,expected.cliHash);
 const jobs=await get('/actions/runs/'+r.runId+'/attempts/1/jobs?per_page=100');
 if(!Array.isArray(jobs.jobs)||jobs.total_count!==jobs.jobs.length||jobs.jobs.length<1||jobs.jobs.length>100||new Set(jobs.jobs.map(j=>j.id)).size!==jobs.jobs.length)fail();
 const found=jobs.jobs.filter(j=>j.name===BOOTSTRAP.job);if(found.length!==1)fail();const j=found[0];
 if(!Number.isSafeInteger(j.id)||j.id<1||r.jobId!==undefined&&r.jobId!==j.id||j.run_id!==r.runId||j.head_sha!==r.sourceRevision||!Array.isArray(j.steps)||j.steps.length>100||j.status!==(phase==='issuer'?'in_progress':'completed')||(phase==='reader'?j.conclusion!=='success':j.conclusion!==null))fail();
 const steps=j.steps.filter(s=>s.name===BOOTSTRAP.step);if(steps.length!==1)fail();const s=steps[0],jobStartedAt=Date.parse(j.started_at),stepStartedAt=Date.parse(s.started_at),stepCompletedAt=Date.parse(s.completed_at),jobCompletedAt=Date.parse(j.completed_at);
 if(!Number.isSafeInteger(s.number)||s.number<1||!Number.isSafeInteger(jobStartedAt)||!Number.isSafeInteger(stepStartedAt)||jobStartedAt<P0||stepStartedAt<jobStartedAt||stepStartedAt>at||stepStartedAt>=Pend||r.jobStartedAt!==undefined&&r.jobStartedAt!==jobStartedAt||r.stepStartedAt!==undefined&&r.stepStartedAt!==stepStartedAt)fail();
 if(phase==='issuer'){
  // Historical original observation retains step/Pend/not-future correlation.
  // Fresh response Date and per-request5s deadlines belong to the transport;
  // cumulative reconciliation never rewrites or ages out this publication fact.
  if(s.status!=='in_progress'||s.conclusion!==null||s.completed_at!=null||j.completed_at!=null||r.observedAt!==undefined&&(!Number.isSafeInteger(r.observedAt)||r.observedAt<stepStartedAt||r.observedAt>=Pend||r.observedAt>at))fail();
 }else if(s.status!=='completed'||s.conclusion!=='success'||!Number.isSafeInteger(stepCompletedAt)||!Number.isSafeInteger(jobCompletedAt)||stepCompletedAt<stepStartedAt||jobCompletedAt<stepCompletedAt||jobCompletedAt>=Pend||jobCompletedAt>at||!Number.isSafeInteger(r.observedAt)||r.observedAt<stepStartedAt||r.observedAt>stepCompletedAt)fail();
 return bootstrapFreeze({P0,Pend,jobId:j.id,jobStartedAt,stepStartedAt,...phase==='reader'?{stepCompletedAt,jobCompletedAt}:{}});
}
