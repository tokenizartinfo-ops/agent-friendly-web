import process from 'node:process';
import {assertQaFiniteConfirmationAdmission,isQaGithubBearerTransportValue} from './mcp-qa-cloud-lifecycle-admission.mjs';
import {resolvePrivateQaFiniteExternalSource} from './mcp-qa-finite-source.mjs';
import {qualifyFiniteSourcePackage} from './mcp-qa-finite-source-authority.mjs';
import {finiteGhaCustody,verifyFiniteGhaCustody} from './mcp-qa-finite-custody.mjs';
import {readFiniteQaPublication} from './mcp-qa-finite-publication.mjs';
import {finiteSeedWire} from './mcp-qa-finite-seed-wire.mjs';
import {readFiniteSeedPrimary} from './mcp-qa-finite-seed-primary.mjs';
import {encodeFiniteMaterialSeed,decodeFiniteMaterialSeed} from './mcp-qa-finite-seed.mjs';
const GH='https://api.github.com/repos/tokenizartinfo-ops/agent-friendly-web';
const fail=()=>{throw Error('Finite seed issuer unavailable');};
let originalAttempted=false,consumed=false;
const hex=v=>typeof v==='string'&&/^[a-f0-9]{40}$/.test(v);
/** ONE trusted original launcher boundary. PID is coherence ONLY.
 * Whole-launcher same-attempt reexecution is explicitly excluded by that host,
 * not durably prevented. Every issuer in this process shares the spent cap. */
export async function issueFiniteMaterialSeed(options={}){
 let gh,cf;
 try{
  if(!options||Object.keys(options).some(k=>!['admission','githubToken','credential','fetchImpl','now','signal'].includes(k)))fail();
  const {admission,githubToken,credential,fetchImpl=fetch,now=Date.now,signal}=options;
  assertQaFiniteConfirmationAdmission(admission);
  if(originalAttempted||consumed)fail();originalAttempted=true;
  const pid=process.pid,marker=process.env.AFW_FINITE_SEED_ORIGINAL_PID;
  const expected={GITHUB_JOB:'admit',GITHUB_ACTION:'finite_seed_once',GITHUB_RUN_ID:admission.runId,GITHUB_RUN_ATTEMPT:'1',GITHUB_SHA:admission.sourceRevision};
  const check=()=>{assertQaFiniteConfirmationAdmission(admission);if(signal.aborted||marker!==String(pid)||process.pid!==pid||process.env.AFW_FINITE_SEED_ORIGINAL_PID!==marker||Object.entries(expected).some(([k,v])=>process.env[k]!==v))fail();};
  check();if(!isQaGithubBearerTransportValue(githubToken))fail();
  const source=await resolvePrivateQaFiniteExternalSource({phase:'seed-material',sourceRevision:admission.sourceRevision,githubToken,fetchImpl,now,signal});check();
  qualifyFiniteSourcePackage({manifest:source.manifest});check();
  gh=finiteSeedWire({fetchImpl,now,signal,credential:githubToken,origin:GH,check,duration:30000,limit:1048576,requests:24});
  const get=async path=>(await gh.request(path)).value;
  const jobs=await get('/actions/runs/'+admission.runId+'/attempts/1/jobs?per_page=100'),admit=jobs.jobs?.filter(j=>j.name==='admit');
  if(!Array.isArray(jobs.jobs)||jobs.jobs.length>100||jobs.total_count!==jobs.jobs.length||admit?.length!==1||!Number.isSafeInteger(admit[0].id)||admit[0].id<1)fail();
  const seed={purpose:'afw.finite-material-seed.v1',repository:'tokenizartinfo-ops/agent-friendly-web',repositoryId:1347578006,intentId:admission.intentId,sourceRevision:admission.sourceRevision,commandId:admission.commentId,finalizer:{runId:Number(admission.runId),attempt:1,jobId:admit[0].id,workflowPath:'.github/workflows/afw-finite-finalizer.yml',seedStep:'seed-material'},...source};
  const primary=await readFiniteSeedPrimary({get,seed,phase:'issuer',now});check();
  if(primary.T0!==admission.createdAt)fail();
  if(!isQaGithubBearerTransportValue(credential))fail();
  cf=finiteSeedWire({fetchImpl,now,signal,credential,origin:'https://api.cloudflare.com/client/v4',check,duration:30000,limit:12582912,requests:5});
  await verifyFiniteGhaCustody({custody:finiteGhaCustody(),request:path=>cf.request(path),check,now,R1:admission.cleanupExpiresAt});check();
  seed.qaPublication=await readFiniteQaPublication({manifest:source.manifest,request:path=>cf.request(path),check});check();
  const qualified=await readFiniteSeedPrimary({get,seed,phase:'issuer',now});check();
  if(JSON.stringify(primary)!==JSON.stringify(qualified)||seed.qaPublication.observedAt<primary.seedStepStartedAt||seed.qaPublication.observedAt<admission.createdAt||seed.qaPublication.observedAt>=admission.expiresAt||Math.abs(now()-seed.qaPublication.observedAt)>5000)fail();
  const message=encodeFiniteMaterialSeed(seed),ref='refs/tags/afw-finite-observer-create/'+seed.intentId,tagName='afw-finite-observer-seed-'+seed.intentId;
  const existing=await gh.request('/git/ref/tags/afw-finite-observer-create/'+seed.intentId,{allow404:true});check();
  if(existing.status!==404)fail();
  // Consume BEFORE first POST; no failure path refunds or creates a new intent.
  if(consumed)fail();consumed=true;
  const tag=await gh.request('/git/tags',{method:'POST',body:{tag:tagName,message,object:seed.sourceRevision,type:'commit'}});check();
  if(tag.status!==201||!hex(tag.value.sha)||tag.value.tag!==tagName||tag.value.object?.sha!==seed.sourceRevision||tag.value.object.type!=='commit'||tag.value.message!==message)fail();
  const beforeRef=await readFiniteSeedPrimary({get,seed,phase:'issuer',now});check();if(JSON.stringify(beforeRef)!==JSON.stringify(primary))fail();
  const created=await gh.request('/git/refs',{method:'POST',body:{ref,sha:tag.value.sha}});check();
  if(created.status!==201||created.value.ref!==ref||created.value.object?.type!=='tag'||created.value.object.sha!==tag.value.sha)fail();
  const readRef=await get('/git/ref/tags/afw-finite-observer-create/'+seed.intentId);check();
  if(readRef.ref!==ref||readRef.object?.type!=='tag'||readRef.object.sha!==tag.value.sha)fail();
  const readTag=await get('/git/tags/'+tag.value.sha);check();
  if(readTag.sha!==tag.value.sha||readTag.tag!==tagName||readTag.object?.type!=='commit'||readTag.object.sha!==seed.sourceRevision||readTag.message!==message)fail();
  const finalPrimary=await readFiniteSeedPrimary({get,seed,phase:'issuer',now});check();if(JSON.stringify(finalPrimary)!==JSON.stringify(primary))fail();
  const decoded=decodeFiniteMaterialSeed(readTag.message);check();
  return Object.freeze({status:'seed_material_created',seedHash:decoded.seedHash,tagSha:readTag.sha,qaPublicationBridgeVerified:false,operationalReadiness:false});
 }catch{fail();}finally{gh?.close();cf?.close();}
}
