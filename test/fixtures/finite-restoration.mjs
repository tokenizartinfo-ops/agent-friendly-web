import {finiteFixture,digest} from './qa-finite-trial.mjs';
import {finiteProofFixture} from './finite-cleanup-proof.mjs';
import {restorationFixture,ROOT,W,OP,fixtureConfigHash} from './canary-restoration.mjs';
import {finiteCleanupPolicyHash} from '../../lib/mcp-finite-cleanup-policy.mjs';
import {finiteHash} from '../../lib/mcp-finite-evidence.mjs';
import * as controls from '../../lib/mcp-qa-finite-trial-control.mjs';
import {createPrivateQaFiniteCleanupStore} from '../../lib/mcp-qa-finite-cleanup-store.mjs';
import {AFW_FIXED_WORKFLOWS} from '../../lib/mcp-fixed-terminal-workflows.mjs';
export async function finiteRestorationFixture({configure=()=>{},at}={}){
 const f=finiteFixture({at}),old=restorationFixture({at:f.plan.C0+3,containerId:f.plan.resources.containerId}),p=f.plan;
 const pin=(v,dep)=>({versionId:v.id,deploymentId:dep,configurationHash:fixtureConfigHash(v),module:{name:v.main_module,sha256:old.policy.closed.moduleHash,bytes:old.policy.closed.moduleBytes}});
 p.deployments.canaryLive=pin(old.state.live,old.ids.liveDep);p.deployments.canaryClosed=pin(old.state.closed,old.ids.closedDep);p.deployments.operatorClosed=pin(old.state.operatorVersion,old.ids.opDep);
 p.canaryContainment.runtimeVersionId=p.deployments.canaryLive.versionId;p.canaryContainment.moduleHash=p.deployments.canaryLive.module.sha256;p.closePolicyHash=finiteCleanupPolicyHash(p);
 configure(p);p.closePolicyHash=finiteCleanupPolicyHash(p);
 let store,identity;
 f.primary.effect=async kind=>{const r=await store.read();return {purpose:'afw.qa-finite-effect-eligibility.v1',intentId:p.intentId,controlHash:identity.controlHash,kind,proofHash:r.record.proofHash,observedAt:f.now(),eligible:true,evidenceHash:'a'.repeat(64)};};
 const ctl=controls.createPrivateQaFiniteTrialControl(f.options(controls)),armed=await ctl.prepare();if(armed.status!=='armed')throw Error('fixture control '+armed.status);
 identity={plan:p,planHash:digest(p.purpose,p),controlHash:armed.controlHash};const proof=finiteProofFixture({fixture:f,controlHash:armed.controlHash});f.setNow(p.C0+3);
 store=createPrivateQaFiniteCleanupStore({storage:f.storage,control:identity,now:f.now});
 await store.capture(async challenge=>({proof:{...proof.proof,proofChallenge:challenge,evidenceHash:finiteHash({proofChallenge:challenge,sealHash:proof.proof.sealHash,support:proof.support})},support:proof.support}));
 const retained=await store.read(),issued=await ctl.claimEffect('canary_restore');if(issued.status!=='issued')throw Error('fixture claim');
 const qualifiedExecution={intentId:p.intentId,controlHash:armed.controlHash,sourceRevision:p.source.revision,moduleHash:p.source.moduleHash,confirmationId:p.workflows.confirmation,observerId:p.workflows.bootstrap,admissionHash:'a'.repeat(64)};
 const state={nominal:'complete',observer:'running',extra:false,providerRunning:false,lostPost:false};let posts=0;
 const ok=(result,result_info)=>({success:true,status:200,errors:[],result,...(result_info?{result_info}:{})});
 const request=async x=>{
  if(x.method==='POST'){posts++;const result=await old.request(x);old.state.canary.annotations=structuredClone(x.body.annotations);if(state.lostPost)throw Error('synthetic lost POST ACK');return result;}
  if(x.path===ROOT+'/workflows')return ok(AFW_FIXED_WORKFLOWS.map(s=>({name:s.name,id:s.id,script_name:s.script,class_name:s.className})),{per_page:100,page:1,count:3,total_count:3});
  for(const spec of AFW_FIXED_WORKFLOWS){
   if(x.path===ROOT+'/workflows/'+spec.name)return ok({name:spec.name,id:spec.id,script_name:spec.script,class_name:spec.className});
   if(x.path===ROOT+'/workflows/'+spec.name+'/instances'){
    const rows=spec.className==='PrivateQaNamedConfirmation'?[{id:p.workflows.confirmation,status:state.nominal,workflow_id:spec.id}]:spec.className==='PrivateQaBootstrap'?[{id:p.workflows.bootstrap,status:state.observer,workflow_id:spec.id}]:[];
    if(state.extra&&spec.className==='PrivateQaBootstrap')rows.push({id:'another-active-observer',status:'running',workflow_id:spec.id});
    return ok(rows,{per_page:100,count:rows.length,total_count:rows.length});
   }
  }
  if(x.path.includes('/instances-v2')){if(Object.hasOwn(x.query,'state'))throw Error('must enumerate all states');return state.providerRunning?ok([{id:p.resources.containerId,application_id:p.resources.applicationId,image:'cloudflare/debian-trixie',status:{state:'running'}}],{per_page:100}):ok([],{per_page:100});}
  return old.request(x);
 };
 return {f,old,state,identity,store,retained,ctl,qualifiedExecution,request,get posts(){return posts;},input:{claim:issued.claim,proofHash:retained.record.proofHash},options:{storage:f.storage,control:identity,proofStore:store,request,primaryRead:async()=>({...proof.support.primary,observedAt:f.now()}),qualifiedExecution,now:f.now},ROOT,W,OP};
}
