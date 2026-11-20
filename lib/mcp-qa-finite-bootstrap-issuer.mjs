import process from 'node:process';
import {fileURLToPath} from 'node:url';
import {compileFiniteNativeStaging} from '../scripts/build-finite-native-package.mjs';
import {assertQaBootstrapAdmission} from './mcp-qa-finite-bootstrap-admission.mjs';
import {finiteGhaCustody,verifyFiniteGhaCustody} from './mcp-qa-finite-custody.mjs';
import {finiteSeedWire} from './mcp-qa-finite-seed-wire.mjs';
import {readFiniteQaBootstrapPublication} from './mcp-qa-finite-bootstrap-publication.mjs';
import {readFiniteQaBootstrapPrimary} from './mcp-qa-finite-bootstrap-primary.mjs';
import {BOOTSTRAP,bootstrapFields,bootstrapCanonical,bootstrapHex,encodeFiniteQaBootstrap,decodeFiniteQaBootstrap} from './mcp-qa-finite-bootstrap-record.mjs';
const fail=()=>{throw Error('Finite QA bootstrap issuer unavailable');};
let attempted=false,spent=false;
/** Only original dedicated CLI. Process cap is not a durable cross-launch lock.
 * Unknown ACK/conflict never refunds or resends; no CF mutation capability.
 * Git ref nonmutation against other repository writers is NOT established. */
export async function issueFiniteQaBootstrap(options){
 let gh,cf;
 try{
  bootstrapFields(options,['admission','githubToken','credential','signal']);
  for(const k of Object.keys(options)){const d=Object.getOwnPropertyDescriptor(options,k);if(!d?.enumerable||!Object.hasOwn(d,'value'))fail();}
  const {admission:a,githubToken,credential,signal}=options;assertQaBootstrapAdmission(a);
  if(attempted||spent||!(signal instanceof AbortSignal))fail();attempted=true;
  const pid=process.pid,marker=process.env.AFW_FINITE_BOOTSTRAP_ORIGINAL_PID,fetcher=globalThis.fetch;
  const expectedEnv={GITHUB_JOB:'publish',GITHUB_ACTION:'finite_bootstrap_once',GITHUB_RUN_ID:String(a.runId),GITHUB_RUN_ATTEMPT:'1',GITHUB_SHA:a.sourceRevision,GITHUB_REPOSITORY:BOOTSTRAP.repository,GITHUB_REPOSITORY_ID:String(BOOTSTRAP.repositoryId),GITHUB_REF:'refs/heads/main',GITHUB_EVENT_NAME:'issue_comment'};
  const check=()=>{assertQaBootstrapAdmission(a);if(signal.aborted||process.pid!==pid||marker!==String(pid)||process.env.AFW_FINITE_BOOTSTRAP_ORIGINAL_PID!==marker||globalThis.fetch!==fetcher||Object.entries(expectedEnv).some(([k,v])=>process.env[k]!==v))fail();};
  check();
  const staging=await compileFiniteNativeStaging({cwd:fileURLToPath(new URL('..',import.meta.url)),sourceRevision:a.sourceRevision});check();
  const expected=staging.bootstrapSource;
  if(expected?.sourceRevision!==a.sourceRevision||expected.sourceTree!==staging.sourceTree)fail();
  gh=finiteSeedWire({fetchImpl:fetcher,now:Date.now,signal,credential:githubToken,origin:'https://api.github.com/repos/'+BOOTSTRAP.repository,check,duration:300000,limit:2097152,requests:32});
  const get=async p=>{const r=await gh.request(p);check();return r.value;};
  const base={purpose:'afw.finite-qa-bootstrap.v1',repository:BOOTSTRAP.repository,repositoryId:BOOTSTRAP.repositoryId,sourceRevision:a.sourceRevision,sourceTree:staging.sourceTree,sourceCheck:staging.sourceCheck,workflowHash:expected.workflowHash,cliHash:expected.cliHash,commandId:a.commandId,runId:a.runId,attempt:1,workflowPath:BOOTSTRAP.workflowPath,job:BOOTSTRAP.job,step:BOOTSTRAP.step,P0:a.P0,Pend:a.Pend};
  const initial=await readFiniteQaBootstrapPrimary({get,record:base,phase:'issuer',now:Date.now,expected});check();
  cf=finiteSeedWire({fetchImpl:fetcher,now:Date.now,signal,credential,origin:'https://api.cloudflare.com/client/v4',check,duration:300000,limit:8388608,requests:4});
  await verifyFiniteGhaCustody({custody:finiteGhaCustody(),request:p=>cf.request(p),check,now:Date.now,R1:a.Pend});check();
  const publication=await readFiniteQaBootstrapPublication({staging,request:p=>cf.request(p),check});check();
  const record={...base,...initial,...publication};
  const before=await readFiniteQaBootstrapPrimary({get,record,phase:'issuer',now:Date.now,expected});check();if(bootstrapCanonical(before)!==bootstrapCanonical(initial))fail();
  const message=encodeFiniteQaBootstrap(record),id=record.qaLive.versionId,ref='refs/tags/afw-finite-bootstrap/'+id,refPath='/git/ref/tags/afw-finite-bootstrap/'+id,tagName='afw-finite-bootstrap-'+id;
  const absent=await gh.request(refPath,{allow404:true});check();if(absent.status!==404||spent)fail();
  // Cap spent BEFORE either mutation. Never retry POST after uncertain ACK.
  spent=true;
  const tag=await gh.request('/git/tags',{method:'POST',body:{tag:tagName,message,object:a.sourceRevision,type:'commit'}});check();
  if(tag.status!==201||!bootstrapHex(tag.value.sha,40)||tag.value.tag!==tagName||tag.value.object?.type!=='commit'||tag.value.object.sha!==a.sourceRevision||tag.value.message!==message)fail();
  const main=await get('/git/ref/heads/main');check();if(main.ref!=='refs/heads/main'||main.object?.type!=='commit'||main.object.sha!==a.sourceRevision)fail();
  const created=await gh.request('/git/refs',{method:'POST',body:{ref,sha:tag.value.sha}});check();
  if(created.status!==201||created.value.ref!==ref||created.value.object?.type!=='tag'||created.value.object.sha!==tag.value.sha)fail();
  const readRef=await get(refPath),readTag=await get('/git/tags/'+tag.value.sha);check();
  if(readRef.ref!==ref||readRef.object?.type!=='tag'||readRef.object.sha!==tag.value.sha||readTag.sha!==tag.value.sha||readTag.tag!==tagName||readTag.object?.type!=='commit'||readTag.object.sha!==a.sourceRevision||readTag.message!==message)fail();
  const final=await readFiniteQaBootstrapPrimary({get,record,phase:'issuer',now:Date.now,expected});check();if(bootstrapCanonical(final)!==bootstrapCanonical(initial))fail();
  const {recordHash}=decodeFiniteQaBootstrap(message);
  return Object.freeze({status:'qa_bootstrap_created',recordHash,tagSha:tag.value.sha,qaPublicationBridgeVerified:false,qaCodeProvenanceVerified:false,sourceIdentityVerified:false,scopeVerified:false,authorizesEffects:false,operationalReadiness:false,completePackage:false,repositoryWriterTrustAssumed:true,historicalRefNonmutationVerified:false,mayRetry:false});
 }catch{fail();}finally{gh?.close();cf?.close();}
}
