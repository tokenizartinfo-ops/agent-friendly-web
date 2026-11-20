import test from 'node:test';
import assert from 'node:assert/strict';
import {finiteFixture} from './fixtures/qa-finite-trial.mjs';
import {createPrivateQaFiniteTrialNativePin,readPrivateQaFiniteControlIdentity} from '../lib/mcp-qa-finite-trial-control.mjs';

const api=await import('../lib/mcp-qa-finite-prelaunch-check.mjs').catch(error=>{
 if(error.code!=='ERR_MODULE_NOT_FOUND'||!error.message.includes('mcp-qa-finite-prelaunch-check.mjs'))throw error;
 return {};
});
const workerRoles={'agent-friendly-web-delegated-canary':'canaryLive','agent-friendly-web-release-operator':'operatorClosed',
 'agent-friendly-web-independent-closure-qa':'qaLive'};
function fixture(t,mode){
 const f=finiteFixture(),p=f.plan,requests=[],primary=[];let canaryReads=0;
 f.env.AFW_MCP_CLOSURE_READ_TOKEN='synthetic-preflight-reader';
 f.env.RELEASE_DB={prepare(){throw Error('Native first-primary required');},withSession(pin){
  assert.equal(pin,'first-primary');
  return {prepare(sql){return {bind(...args){return {async all(){primary.push({sql,args});
   return {success:true,results:mode==='D1-unavailable'?null:[]};
  }};}};}};
 }};
 const nativePin=createPrivateQaFiniteTrialNativePin({ctx:f.ctx,env:f.env,sourceRevision:p.source.revision});
 const {plan,planHash,controlHash}=readPrivateQaFiniteControlIdentity({nativePin,raw:JSON.stringify(p)});
 const control={plan,planHash,controlHash},signal=new AbortController().signal;
 const parent={signal,deadline:f.now()+4800,check:f.now};
 const original=globalThis.fetch;t.after(()=>{globalThis.fetch=original;});
 globalThis.fetch=async(url,options)=>{
  const path=new URL(url),parts=path.pathname.split('/'),name=parts.at(-2),op=parts.at(-1);
  assert.equal(path.origin,'https://api.cloudflare.com');
  assert.equal(options.method,'GET');
  assert.equal(options.headers.Authorization,'Bearer synthetic-preflight-reader');
  requests.push(path.pathname);let result,result_info;
  if(op==='deployments'){
   const role=workerRoles[name],pin=p.deployments[role];assert.ok(pin);
   if(role==='canaryLive')canaryReads++;
   result={deployments:[{strategy:'percentage',id:mode==='drift'&&canaryReads===2&&role==='canaryLive'?p.deployments.canaryClosed.deploymentId:pin.deploymentId,
    versions:[{version_id:pin.versionId,percentage:100}]}]};
  }else if(op==='schedules'||op==='tails'){
   result=mode==='tails'&&op==='tails'&&name==='agent-friendly-web-delegated-canary'?[{service:'foreign'}]:[];
  }else{
   assert.ok(path.pathname.endsWith('/containers/applications/'+p.resources.applicationId+'/instances-v2'));
   assert.equal(path.searchParams.get('per_page'),'100');
   result=mode==='container'?[{id:p.resources.containerId,application_id:p.resources.applicationId,
    image:'cloudflare/debian-trixie',status:{state:'running'}}]:[];
   result_info={per_page:100};
  }
  return Response.json({success:true,errors:[],messages:[],result,...(result_info?{result_info}:{})},
   {headers:{date:new Date(f.now()).toUTCString()}});
 };
 const verify=()=>api.readPrivateQaFinitePrelaunch({ctx:f.ctx,env:f.env,control,parent});
 return {f,p,verify,requests,primary};
}
test('native prelaunch sees the exact provider pointers twice and first-primary candidate absence',async t=>{
 assert.equal(typeof api.readPrivateQaFinitePrelaunch,'function');
 const x=fixture(t),before=x.f.puts,result=await x.verify();
 assert.equal(result.status,'verified');assert.equal(result.authorizesEffects,false);
 assert.equal(result.operationalReadiness,false);assert.equal(result.observedAt,x.f.now());
 assert.equal(x.requests.filter(path=>path.endsWith('/deployments')).length,6);
 assert.equal(x.primary.length,8);assert.equal(x.f.puts,before);
});
for(const mode of ['drift','tails','container','D1-unavailable'])test('prelaunch denies '+mode,async t=>{
 assert.equal(typeof api.readPrivateQaFinitePrelaunch,'function');
 const x=fixture(t,mode),before=x.f.puts;
 await assert.rejects(x.verify());assert.equal(x.f.puts,before);
});
