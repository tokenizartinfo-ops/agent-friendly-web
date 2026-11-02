import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {finitePublicStaticExpectation,finitePublicProfileTemplate} from '../../lib/mcp-qa-finite-profile.mjs';
import {BOOTSTRAP,bootstrapHash,encodeFiniteQaBootstrap} from '../../lib/mcp-qa-finite-bootstrap-record.mjs';
export const UUID='11111111-1111-4111-8111-111111111111',DEP='22222222-2222-4222-8222-222222222222';
export const GH='https://api.github.com/repos/'+BOOTSTRAP.repository,CF='https://api.cloudflare.com/client/v4/accounts/'+BOOTSTRAP.accountId;
export async function bootstrapWorld(staging){
 const actor={id:290715446,login:'tokenizartinfo-ops',type:'User'},repo={id:1347578006,full_name:BOOTSTRAP.repository},P0=Math.floor((Date.now()-10000)/1000)*1000,M=staging?.sourceRevision??'a'.repeat(40),tree=staging?.sourceTree??'b'.repeat(40);
 const workflow=await readFile(BOOTSTRAP.workflowPath,'utf8'),cli=await readFile(BOOTSTRAP.cliPath,'utf8'),expected={sourceRevision:M,sourceTree:tree,workflowHash:bootstrapHash(workflow),cliHash:bootstrapHash(cli)};
 const module=staging?.modules.qaLive.module??{name:'index.mjs',sha256:bootstrapHash('export default{};'),bytes:17,exports:[...finitePublicProfileTemplate('qaLive').exports]};
 const r={purpose:'afw.finite-qa-bootstrap.v1',repository:BOOTSTRAP.repository,repositoryId:1347578006,sourceRevision:M,sourceTree:tree,sourceCheck:BOOTSTRAP.sourceCheck,workflowHash:expected.workflowHash,cliHash:expected.cliHash,commandId:123,runId:456,jobId:789,attempt:1,workflowPath:BOOTSTRAP.workflowPath,job:'publish',step:'qa-bootstrap-provenance',P0,Pend:P0+300000,jobStartedAt:P0+1000,stepStartedAt:P0+2000,observedAt:P0+3000,qaLive:{versionId:UUID,deploymentId:DEP,module,publicStatic:finitePublicStaticExpectation('qaLive')}};
 const comment={id:123,user:actor,author_association:'OWNER',body:'/afw-qa-finite-bootstrap v1 '+M,created_at:new Date(P0).toISOString(),issue_url:GH+'/issues/497'};
 const run={id:456,run_attempt:1,head_sha:M,head_branch:'main',event:'issue_comment',path:BOOTSTRAP.workflowPath,repository:repo,head_repository:repo,actor,triggering_actor:actor,display_title:'AFW finite QA bootstrap comment-123 source-'+M,status:'completed',conclusion:'success'};
 const step={name:'qa-bootstrap-provenance',number:4,started_at:new Date(r.stepStartedAt).toISOString(),completed_at:new Date(P0+4000).toISOString(),status:'completed',conclusion:'success'};
 const job={id:789,name:'publish',run_id:456,head_sha:M,started_at:new Date(r.jobStartedAt).toISOString(),completed_at:new Date(P0+5000).toISOString(),status:'completed',conclusion:'success',steps:[step]};
 const file=(path,text)=>{const bytes=Buffer.from(text);return {type:'file',path,encoding:'base64',size:bytes.length,content:bytes.toString('base64'),sha:createHash('sha1').update('blob '+bytes.length+'\0').update(bytes).digest('hex')};};
 const refPath='/git/ref/tags/afw-finite-bootstrap/'+UUID,tagSha='f'.repeat(40),map=new Map([
 ['/issues/comments/123',comment],['/git/ref/heads/main',{ref:'refs/heads/main',object:{type:'commit',sha:M}}],
 ['/actions/runs/456',run],['/actions/runs/456/attempts/1/jobs?per_page=100',{total_count:1,jobs:[job]}],
 ['/git/commits/'+M,{sha:M,tree:{sha:tree}}],
 ['/contents/'+BOOTSTRAP.workflowPath+'?ref='+M,file(BOOTSTRAP.workflowPath,workflow)],
 ['/contents/'+BOOTSTRAP.cliPath+'?ref='+M,file(BOOTSTRAP.cliPath,cli)]]);
 const pointer={deployments:[{id:DEP,strategy:'percentage',versions:[{version_id:UUID,percentage:100}]}]},version={...structuredClone(finitePublicProfileTemplate('qaLive')),id:UUID,urls:[],modules:[{name:'index.mjs',content_type:'application/javascript+module',content_base64:Buffer.from(staging?.files['qaLive/index.mjs']??'export default{};').toString('base64')}]};
 const refresh=()=>{map.set(refPath,{ref:'refs/tags/afw-finite-bootstrap/'+UUID,object:{type:'tag',sha:tagSha}});map.set('/git/tags/'+tagSha,{sha:tagSha,tag:'afw-finite-bootstrap-'+UUID,object:{type:'commit',sha:M},message:encodeFiniteQaBootstrap(r)});};refresh();
 const event={action:'created',repository:repo,issue:{number:497},comment,sender:actor},context={repository:repo.full_name,repositoryId:String(repo.id),ref:'refs/heads/main',eventName:'issue_comment',runId:'456',runAttempt:'1',sourceRevision:M};
 return {record:r,expected,map,comment,run,job,step,pointer,version,refPath,tagSha,refresh,event,context,issuer(){run.status=job.status=step.status='in_progress';run.conclusion=job.conclusion=step.conclusion=null;job.completed_at=step.completed_at=null;map.delete(refPath);map.delete('/git/tags/'+tagSha);},get:async p=>{if(!map.has(p))throw Error('SYN GH missing '+p);return structuredClone(map.get(p));}};
}
