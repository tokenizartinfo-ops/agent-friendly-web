import {createHash} from 'node:crypto';
import {finiteFinalizerFixture} from './finite-finalizer.mjs';
import {githubFixture} from './finite-github.mjs';
import {qaClosedConfigurationHash} from '../../lib/mcp-restoration-configuration.mjs';
import {AFW_FIXED_WORKFLOWS} from '../../lib/mcp-fixed-terminal-workflows.mjs';
import {createPrivateQaFiniteRestoreHttp,createPrivateQaFiniteObserverHttp} from '../../lib/mcp-qa-finite-http.mjs';
const QA='agent-friendly-web-independent-closure-qa',ROOT='/accounts/85d0d5dadac3341a564f22ce885e9eec';
export async function cfFiniteFixture({at,configure=()=>{}}={}){
 const versions={};
 const base=await finiteFinalizerFixture({at,configure:(p,f)=>{
  for(const key of ['qaLive','qaClosed']){
   const pin=p.deployments[key],bytes=Buffer.from('export default '+JSON.stringify({profile:key})+';');
   const meta={id:pin.versionId,main_module:'index.mjs',compatibility_date:'2026-09-07',compatibility_flags:['nodejs_compat'],usage_model:'standard',urls:[],modules:[{name:'index.mjs',content_type:'application/javascript+module',content_base64:bytes.toString('base64')}],bindings:[{name:'AFW_INDEPENDENT_CLOSURE',type:'durable_object_namespace',class_name:'IndependentClosure',namespace_id:'070c4a7708eb4592a3ded7c117a88225'}]};
   pin.module={name:'index.mjs',sha256:createHash('sha256').update(bytes).digest('hex'),bytes:bytes.length};pin.configurationHash=qaClosedConfigurationHash(meta);versions[pin.versionId]=meta;
  }
  p.source.moduleHash=p.deployments.qaLive.module.sha256;configure(p,f);
 }});
 const gh=await githubFixture(base),p=base.plan,v=p.preview,def=AFW_FIXED_WORKFLOWS.find(x=>x.className==='PrivateQaBootstrap'),workflowVersion='77777777-7777-4777-8777-777777777777',requests=[];
 base.restorationState.observer='complete';base.old.state.canary={...base.old.state.canary,versions:[{version_id:p.deployments.canaryClosed.versionId,percentage:100}],id:p.deployments.canaryClosed.deploymentId};
 const state={mode:'normal',observerStatus:'complete',qaVersion:p.deployments.qaLive.versionId,qaDeployment:p.deployments.qaLive.deploymentId,annotation:null,posts:0};
 const ref='refs/tags/afw-finite-observer-create/'+v.intentId;gh.rows.set(ref,{ref,object:{type:'commit',sha:v.sourceRevision}});
 const response=(value,status=200)=>new Response(JSON.stringify(value),{status,headers:{date:new Date(base.f.now()).toUTCString(),'content-type':'application/json'}});
 const answer=(result,result_info)=>({success:true,errors:[],messages:[],result,...result_info?{result_info}:{}});
 const fetchImpl=async(url,init)=>{
  requests.push({url,method:init.method});if(url.startsWith('https://api.github.com/'))return gh.fetchImpl(url,init);
  const u=new URL(url),path=u.pathname.slice('/client/v4'.length),query=Object.fromEntries([...u.searchParams].map(([k,x])=>[k,/^\d+$/.test(x)?Number(x):x]));
  if(path==='/user/tokens/verify')return response(answer({id:state.mode==='bad-token'?'b'.repeat(32):p.custody.id,status:'active',expires_on:new Date(p.custody.expiresAt).toISOString()}));
  if(path==='/user/tokens/'+p.custody.id)return response(answer({id:p.custody.id,status:'active',expires_on:new Date(p.custody.expiresAt).toISOString(),policies:state.mode==='bad-scope'?[]:base.policy}));
  if(path===ROOT+'/workers/workers/'+QA+'/versions/'+p.deployments.qaLive.versionId||path===ROOT+'/workers/workers/'+QA+'/versions/'+p.deployments.qaClosed.versionId)return response(answer(versions[path.split('/').at(-1)]));
  if(path===ROOT+'/workflows/'+def.name+'/versions/'+workflowVersion)return response(answer({id:workflowVersion,workflow_id:def.id,class_name:def.className,language:'javascript'}));
  if(path===ROOT+'/workflows/'+def.name+'/instances/'+p.workflows.bootstrap){
   const provenance=structuredClone(base.output.provenance);if(state.mode==='wrong-native')provenance.runtimeVersionId=p.deployments.qaClosed.versionId;
   const step={name:state.mode==='wrong-first'?'other':'finite-material-preview',type:'step',success:true,start:new Date(v.T0).toISOString(),end:new Date(v.T0+1).toISOString(),attempts:[{success:true}],output:JSON.stringify({purpose:'afw.finite-observer-preview.v1',provenance,material:v})};
   return response(answer({versionId:workflowVersion,status:state.observerStatus,success:true,queued:new Date(v.T0).toISOString(),end:new Date(base.f.now()).toISOString(),params:{operation:'finite_cleanup_observer',intentId:v.intentId,sourceRevision:v.sourceRevision},step_count:1,steps:[step],output:JSON.stringify(base.output)}));
  }
  if(path===ROOT+'/workers/scripts/'+QA+'/deployments'){
   if(init.method==='POST'){state.posts++;state.qaVersion=p.deployments.qaClosed.versionId;state.qaDeployment='99999999-9999-4999-8999-999999999999';state.annotation=JSON.parse(init.body).annotations; if(state.mode==='lost-post')throw Error('lost');return response(answer({id:state.qaDeployment}));}
   return response(answer({deployments:[{id:state.qaDeployment,strategy:'percentage',versions:[{version_id:state.qaVersion,percentage:100}],...(state.annotation?{annotations:state.annotation}:{})}]}));
  }
  if(path.startsWith(ROOT+'/workers/scripts/'+QA+'/')){
   if(path.endsWith('/subdomain'))return response(answer({enabled:false,previews_enabled:false}));
   if(path.endsWith('/schedules'))return response(answer({schedules:[]}));
   if(path.endsWith('/tails'))return response(answer([]));
  }
  if(path===ROOT+'/workers/durable_objects/namespaces')return response(answer([{id:'070c4a7708eb4592a3ded7c117a88225',class:'IndependentClosure',script:QA,use_sqlite:true},{id:'6f30104244424152b800bc64d5f4cfac',class:'PrivateQaPreregistration',script:QA,use_sqlite:true}],{page:1,per_page:1000,count:2,total_count:2,total_pages:1}));
  const r=await base.request({method:init.method,path,query,signal:init.signal});return response({...r,messages:[]},r.status);
 };
 const options={plan:p,credential:'synthetic_cf_custody',githubToken:'synthetic_github',fetchImpl,now:base.f.now,signal:new AbortController().signal};
 const observer=()=>createPrivateQaFiniteObserverHttp({admission:{intentId:v.intentId,sourceRevision:v.sourceRevision,T0:v.T0,R1:v.R1},source:{qaLive:p.deployments.qaLive,custody:p.custody},credential:options.credential,githubToken:options.githubToken,fetchImpl,now:base.f.now,signal:options.signal});
 return {base,p,v,state,gh,requests,fetchImpl,observer,adapters:()=>createPrivateQaFiniteRestoreHttp(options)};
}
