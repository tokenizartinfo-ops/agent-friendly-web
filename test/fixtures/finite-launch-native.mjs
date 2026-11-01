// SYNTHETIC external provenance ONLY. Real DO storage, D1 bindings, native pins,
// control decoder, fixed enumeration/parser and coordinator are bundled unchanged.
import {finiteFixture} from './qa-finite-trial.mjs';
import {createPrivateQaFiniteTrialNativePin,readPrivateQaFiniteControlSnapshot} from '../../lib/mcp-qa-finite-trial-control.mjs';
import {AFW_FIXED_WORKFLOWS} from '../../lib/mcp-fixed-terminal-workflows.mjs';
const fixtures=new WeakMap(),contexts=new WeakMap();
export async function fixture(ctx,env){
 if(fixtures.has(ctx))return fixtures.get(ctx);
 const f=finiteFixture({at:Date.now()+600000});f.plan.resources.actorId=ctx.id.toString();
 f.ctx=ctx;f.env=env;f.storage=ctx.storage;f.paths=[];f.observations=[];
 for(const [key,value]of f.rows)await ctx.storage.put(key,value);
 fixtures.set(ctx,f);return f;
}
export async function resolvePrivateQaFiniteLaunchContext({ctx,env,refs,parent}){
 parent.check();const f=await fixture(ctx,env);parent.check();
 if(refs.intentId!==f.plan.intentId||refs.sourceRevision!==f.plan.source.revision)throw Error('synthetic refs');
 if(f.hydrate)await f.hydrate();parent.check();
 const nativePin=createPrivateQaFiniteTrialNativePin({ctx,env,sourceRevision:f.plan.source.revision});
 const s=await readPrivateQaFiniteControlSnapshot({storage:ctx.storage,nativePin,plan:JSON.stringify(f.plan),parent});parent.check();
 const execution={intentId:f.plan.intentId,controlHash:s.control.controlHash,sourceRevision:f.plan.source.revision,moduleHash:f.plan.source.moduleHash,confirmationId:f.plan.workflows.confirmation,observerId:f.plan.workflows.bootstrap,admissionHash:'e'.repeat(64),launcherId:f.plan.workflows.launcher};
 const request=async ({method,path,query,signal},check)=>{
  if(method!=='GET'||signal!==parent.signal)throw Error('synthetic fixed transport');
  check();f.paths.push(path);if(f.onRequest)await f.onRequest(path);check();
  const row=x=>({id:x.id,name:x.name,script_name:x.script,class_name:x.className});
  let result,result_info;
  if(path==='/workflows'){result=AFW_FIXED_WORKFLOWS.map(row);result_info={per_page:100,count:3,total_count:3};}
  else{
   const spec=AFW_FIXED_WORKFLOWS.find(x=>path==='/workflows/'+x.name||path==='/workflows/'+x.name+'/instances');if(!spec)throw Error('unexpected fixed path');
   if(path.endsWith('/instances')){
    result=spec.className==='PrivateQaBootstrap'?[{id:f.plan.workflows.bootstrap,status:'running',workflow_id:spec.id},...(f.launcher?[{id:f.plan.workflows.launcher,status:'waiting',workflow_id:spec.id}]:[])]:[];
    if(f.providerNominal&&spec.className==='PrivateQaNamedConfirmation')result=[{id:f.plan.workflows.confirmation,status:f.providerNominal,workflow_id:spec.id}];
    result_info={per_page:100,count:result.length,total_count:result.length,...(f.incomplete?{cursor:'missing-page',total_count:2}:{}),...(query.cursor?{page:2}:{})};
   }else result=row(spec);
  }
  return {status:200,success:true,errors:[],result,result_info};
 };
 const context=Object.freeze({});contexts.set(context,{ctx,env,plan:JSON.stringify(f.plan),request,execution});return context;
}
export function readPrivateQaFiniteLaunchMaterial({ctx,env,context,parent}){
 parent.check();const m=contexts.get(context);if(!m||m.ctx!==ctx||m.env!==env)throw Error('synthetic context unavailable');return m;
}
