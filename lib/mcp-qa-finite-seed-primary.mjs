import {createHash} from 'node:crypto';
import {parseDocument} from 'yaml';
const GH='https://api.github.com/repos/tokenizartinfo-ops/agent-friendly-web';
const fail=()=>{throw Error('Finite seed primary unavailable');};
const OWNER=290715446,REPO=1347578006;
const actor=a=>a?.id===OWNER&&a.login==='tokenizartinfo-ops'&&a.type==='User';
const repository=r=>r?.id===REPO&&r.full_name==='tokenizartinfo-ops/agent-friendly-web';
const hash=b=>createHash('sha256').update(b).digest('hex');
export function finiteSourceFile(file,path){
 if(file?.type!=='file'||file.path!==path||file.encoding!=='base64'||!Number.isSafeInteger(file.size)||file.size<1||file.size>65536||typeof file.content!=='string'||file.content.length>90000)fail();
 const text=file.content.replace(/\n/g,''),bytes=Buffer.from(text,'base64');
 if(bytes.toString('base64')!==text||bytes.length!==file.size||createHash('sha1').update('blob '+bytes.length+'\0').update(bytes).digest('hex')!==file.sha)fail();
 return {text:new TextDecoder('utf-8',{fatal:true}).decode(bytes),sha256:hash(bytes)};
}
export async function readFiniteSeedPrimary({get,seed,phase,now}){
 const s=seed,comment=await get('/issues/comments/'+s.commandId),main=await get('/git/ref/heads/main'),run=await get('/actions/runs/'+s.finalizer.runId);
 const T0=Date.parse(comment?.created_at),intent=createHash('sha256').update('afw.qa-finite-confirmation-command.v1\n1347578006\n'+s.commandId+'\n'+s.sourceRevision+'\n'+T0).digest('hex');
 if(comment.id!==Number(s.commandId)||comment.body!=='/afw-qa-finite-confirmation v1 '+s.sourceRevision||!actor(comment.user)||comment.author_association!=='OWNER'||comment.issue_url!==GH+'/issues/497'||!Number.isSafeInteger(T0)||T0>now()||intent!==s.intentId||main.ref!=='refs/heads/main'||main.object?.type!=='commit'||main.object.sha!==s.sourceRevision)fail();
 if(run.id!==s.finalizer.runId||run.run_attempt!==1||run.head_sha!==s.sourceRevision||run.head_branch!=='main'||run.event!=='issue_comment'||run.path!==s.finalizer.workflowPath||!repository(run.repository)||!repository(run.head_repository)||!actor(run.actor)||!actor(run.triggering_actor)||run.display_title!=='AFW finite finalizer comment-'+s.commandId+' source-'+s.sourceRevision||!['in_progress','completed'].includes(run.status)||run.status==='completed'&&run.conclusion!=='success'||phase==='issuer'&&run.status!=='in_progress')fail();
 const jobs=await get('/actions/runs/'+run.id+'/attempts/1/jobs?per_page=100');
 if(!Array.isArray(jobs.jobs)||jobs.jobs.length>100||jobs.total_count!==jobs.jobs.length||new Set(jobs.jobs.map(j=>j.id)).size!==jobs.jobs.length)fail();
 const found=jobs.jobs.filter(j=>j.name==='admit');if(found.length!==1)fail();const j=found[0];
 if(j.id!==s.finalizer.jobId||j.run_id!==run.id||j.head_sha!==s.sourceRevision||!Array.isArray(j.steps)||j.steps.length>100||!['in_progress','completed'].includes(j.status)||j.status==='completed'&&j.conclusion!=='success')fail();
 const steps=j.steps.filter(x=>x.name==='seed-material');if(steps.length!==1)fail();const step=steps[0],startedAt=Date.parse(step.started_at),completedAt=Date.parse(step.completed_at),observedAt=s.qaPublication?.observedAt;
 if(!Number.isSafeInteger(step.number)||step.number<1||!Number.isSafeInteger(startedAt)||startedAt<T0||startedAt>now()||Date.parse(j.started_at)<T0||Date.parse(j.started_at)>startedAt)fail();
 if(phase==='issuer'){
  if(j.status!=='in_progress'||step.status!=='in_progress'||step.conclusion!==null||step.completed_at!==null&&step.completed_at!==undefined||observedAt!==undefined&&(observedAt<startedAt||observedAt<T0||observedAt>=T0+300000||Math.abs(now()-observedAt)>5000))fail();
 }else if(step.status!=='completed'||step.conclusion!=='success'||!Number.isSafeInteger(completedAt)||completedAt<startedAt||completedAt>now()||!Number.isSafeInteger(observedAt)||observedAt<startedAt||observedAt>completedAt||observedAt<T0||observedAt>=T0+300000)fail();
 return Object.freeze({T0,N1:T0+300000,R1:T0+480000,runId:run.id,jobId:j.id,seedStepStartedAt:startedAt,...(phase==='issuer'?{}:{seedStepCompletedAt:completedAt})});
}
export async function qualifyFiniteSeedLineage({get,seed,now}){
 const s=seed,b=s.build,commit=await get('/git/commits/'+s.sourceRevision);
 if(commit.sha!==s.sourceRevision||commit.tree?.sha!==s.manifest.sourceTree)fail();
 const run=await get('/actions/runs/'+b.runId);
 if(run.id!==b.runId||run.run_attempt!==1||run.head_sha!==s.sourceRevision||run.head_branch!=='main'||run.event!=='push'||run.path!==b.workflowPath||run.status!=='completed'||run.conclusion!=='success'||!repository(run.repository)||!repository(run.head_repository))fail();
 const a=await get('/actions/artifacts/'+b.artifactId),ar=a.workflow_run;
 if(a.id!==b.artifactId||a.name!==b.artifactName||a.digest!==b.artifactDigest||a.expired!==false||Date.parse(a.expires_at)<=now()||!Number.isSafeInteger(Date.parse(a.expires_at))||!Number.isSafeInteger(a.size_in_bytes)||a.size_in_bytes<1||a.size_in_bytes>67108864||ar?.id!==b.runId||ar.repository_id!==REPO||ar.head_repository_id!==REPO||ar.head_sha!==s.sourceRevision||ar.head_branch!=='main')fail();
 const file=finiteSourceFile(await get('/contents/'+b.workflowPath+'?ref='+s.sourceRevision),b.workflowPath);
 if(file.sha256!==s.manifest.buildWorkflowHash)fail();
 const doc=parseDocument(file.text,{uniqueKeys:true});if(doc.errors.length||doc.warnings.length)fail();
 const config=doc.toJS({maxAliasCount:0});if(JSON.stringify(config?.on?.push?.branches)!=='["main"]'||config.on.push['branches-ignore'])fail();
 const finalizer=finiteSourceFile(await get('/contents/'+s.finalizer.workflowPath+'?ref='+s.sourceRevision),s.finalizer.workflowPath);
 const yaml=parseDocument(finalizer.text,{uniqueKeys:true});if(yaml.errors.length||yaml.warnings.length)fail();
 const f=yaml.toJS({maxAliasCount:0}),steps=f?.jobs?.admit?.steps;
 if(!Array.isArray(steps)||f.name!=='afw-finite-finalizer')fail();
 const seedSteps=steps.filter(x=>x.name==='seed-material'),index=steps.indexOf(seedSteps[0]),ready=steps.findIndex(x=>x.name==='admit-and-ready');
 if(seedSteps.length!==1||index<0||ready<=index||seedSteps[0].id!=='finite_seed_once'||seedSteps[0].shell!=='bash'||seedSteps[0]['continue-on-error']||seedSteps[0].run!=='export AFW_FINITE_SEED_ORIGINAL_PID=$$\nexec node scripts/run-qa-finite-trial-finalizer.mjs seed-material\n')fail();
 return Object.freeze({sourceTree:commit.tree.sha,buildRunId:run.id,artifactId:a.id,artifactDigest:a.digest,manifestHash:b.manifestHash});
}
