import {createHash} from 'node:crypto';
export const A='85d0d5dadac3341a564f22ce885e9eec',W='agent-friendly-web-delegated-canary',OP='agent-friendly-web-release-operator',APP='d6fc71552de7494a863aca20365a572d',ROOT='/accounts/'+A;
export const KEY='afw.successor-canary-restoration.v1';
const cfgKeys=['compatibility_date','compatibility_flags','main_module','containers','exports','limits','placement','usage_model','cache_options','assets','package_dependencies'];
const stable=x=>JSON.stringify(x,(_,v)=>v&&typeof v==='object'&&!Array.isArray(v)?Object.fromEntries(Object.entries(v).sort(([a],[b])=>a<b?-1:a>b?1:0)):v);
export const digest=x=>createHash('sha256').update(x).digest('hex');
export const fixtureConfigHash=v=>{const c=Object.fromEntries(cfgKeys.filter(k=>Object.hasOwn(v,k)).map(k=>[k,v[k]]));c.bindings=v.bindings.map(b=>b.type==='secret_text'?{name:b.name,type:b.type}:b).sort((a,b)=>a.name<b.name?-1:a.name>b.name?1:0);return digest('afw.canary-restoration-configuration.v1\n'+stable(c));};
export function memoryStorage(){
 const rows=new Map();let chain=Promise.resolve(),puts=0;
 return {rows,get puts(){return puts;},transaction(fn){const p=chain.then(()=>fn({get:async k=>structuredClone(rows.get(k)),put:async(k,v)=>{puts++;rows.set(k,structuredClone(v));},list:async({prefix,limit})=>new Map([...rows].filter(([k])=>k.startsWith(prefix)).sort(([a],[b])=>a<b?-1:a>b?1:0).slice(0,limit))}));chain=p.catch(()=>{});return p;}};
}
export function restorationFixture({at=Date.UTC(2026,9,28,17),containerId='a'.repeat(64)}={}){
 const ids={live:'11111111-1111-4111-8111-111111111111',closed:'22222222-2222-4222-8222-222222222222',operator:'33333333-3333-4333-8333-333333333333',liveDep:'44444444-4444-4444-8444-444444444444',closedDep:'55555555-5555-4555-8555-555555555555',opDep:'66666666-6666-4666-8666-666666666666'};
 let wall=at,posts=0;const calls=[],storage=memoryStorage();
 const script='export default{fetch(){return new Response(null,{status:404})}};',bytes=Buffer.byteLength(script),hash=digest(script);
 const flags=['AFW_DELEGATED_OAUTH_ENABLED','AFW_DOSSIER_EVENTS_ENABLED','AFW_DOSSIER_EVENTS_SCHEDULE_ENABLED','AFW_DOSSIER_MONITORING_OWNER_ENABLED','AFW_DOSSIER_OWN_SAVE_ENABLED','AFW_OAUTH_REFRESH_ENABLED','AFW_DOSSIER_RETIREMENT_READ_ENABLED','AFW_DOSSIER_SUCCESSOR_ENABLED'];
 const bindings=[...flags.map(name=>({name,type:'plain_text',text:'false'})),{name:'DB',type:'d1',id:'6a728254-1494-4039-802e-b39288a55fcc'},{name:'OAUTH_KV',type:'kv_namespace',namespace_id:'6b94ff702e504e14a7730cee73a0f6ff'},{name:'AFW_DOSSIER_EVENTS_NODE',type:'durable_object_namespace',namespace_id:APP,class_name:'AfwOwnEventNode',script_name:W},...Array.from({length:18},(_,i)=>({name:'AFW_FIXTURE_VALUE_'+i,type:'plain_text',text:'fixture'}))];
 const opBindings=[...['AFW_RELEASE_OPERATOR_ENABLED','AFW_RELEASE_WORKFLOW_ENABLED','AFW_RELEASE_CONFIRMATION_WORKFLOW_ENABLED'].map(name=>({name,type:'plain_text',text:'false'})),{name:'AFW_RELEASE_EVENTS_NODE',type:'durable_object_namespace',namespace_id:APP,class_name:'AfwOwnEventNode',script_name:W},{name:'RELEASE_DB',type:'d1',id:'6a728254-1494-4039-802e-b39288a55fcc'},{name:'AFW_RELEASE_READ_TOKEN',type:'secret_text'},{name:'AFW_RELEASE_PUBLISH_TOKEN',type:'secret_text'}];
 const base={compatibility_date:'2026-09-07',compatibility_flags:['nodejs_compat','global_fetch_strictly_public'],main_module:'index.mjs',usage_model:'standard',urls:[],exports:{default:{type:'worker'},AfwNodeControl:{type:'worker'},AfwOwnEventNode:{type:'durable-object',storage:'sqlite',container:'agent-friendly-web-delegated-canary-afwowneventnode'}},containers:[{class_name:'AfwOwnEventNode',name:'agent-friendly-web-delegated-canary-afwowneventnode'}],modules:[{name:'index.mjs',content_type:'application/javascript+module',content_base64:Buffer.from(script).toString('base64')}]};
 const closed={...structuredClone(base),id:ids.closed,bindings},live={...structuredClone(base),id:ids.live,bindings:structuredClone(bindings)};
 live.bindings.find(b=>b.name==='AFW_DOSSIER_EVENTS_ENABLED').text='true';
 const operator={...structuredClone(base),id:ids.operator,bindings:opBindings,containers:[],exports:{default:{type:'worker'},AfwReleaseWorkflow:{type:'workflow'}}};
 delete operator.exports;delete operator.containers;
 const candidate={containerId,applicationId:APP,programHash:'b'.repeat(64),sourceRevision:'c'.repeat(40)};
 const policy={operation:'restore_canary',startAt:at-1000,expiresAt:at+120000,candidate,live:{versionId:ids.live,deploymentId:ids.liveDep,configurationHash:fixtureConfigHash(live)},closed:{versionId:ids.closed,moduleHash:hash,moduleBytes:bytes,configurationHash:fixtureConfigHash(closed)},operator:{versionId:ids.operator,deploymentId:ids.opDep,moduleHash:hash,moduleBytes:bytes,configurationHash:fixtureConfigHash(operator)}};
 const control={enabled:true,policy:JSON.stringify(policy)};
 const handoff={status:'retired_handoff_observed',physicalStopVerified:true,mayStartSuccessor:false,mayRestoreAdministration:false,operationalReadiness:false,...candidate,processGeneration:'d'.repeat(64),closedAt:at-20000,stoppedAt:at-21000,capturedAt:at-10000,observedAt:at};
 const dep=(id,version_id)=>({id,strategy:'percentage',versions:[{version_id,percentage:100}]});
 const state={canary:dep(ids.liveDep,ids.live),operator:dep(ids.opDep,ids.operator),closed,live,operatorVersion:operator,active:false};
 const ok=(result,info)=>({success:true,status:200,errors:[],result,...info?{result_info:info}:{}});
 const request=async x=>{
  calls.push({method:x.method,path:x.path,query:x.query,body:x.body});
  if(x.method==='POST'){
   if(x.path!==ROOT+'/workers/scripts/'+W+'/deployments')throw Error('Unexpected mutation');
   posts++;state.canary=dep(ids.closedDep,ids.closed);return ok(structuredClone(state.canary));
  }
  if(x.method!=='GET')throw Error('Unexpected method');
  if(x.path===ROOT+'/workers/scripts/'+W+'/deployments')return ok({deployments:[structuredClone(state.canary)]});
  if(x.path===ROOT+'/workers/scripts/'+OP+'/deployments')return ok({deployments:[structuredClone(state.operator)]});
  for(const [worker,id,key] of [[W,ids.live,'live'],[W,ids.closed,'closed'],[OP,ids.operator,'operatorVersion']])if(x.path===ROOT+'/workers/workers/'+worker+'/versions/'+id){if(x.query?.include!=='modules')throw Error('Missing module proof');return ok(structuredClone(state[key]));}
  if([W,OP].some(n=>x.path===ROOT+'/workers/scripts/'+n+'/schedules'))return ok({schedules:[]});
  if([W,OP].some(n=>x.path===ROOT+'/workers/scripts/'+n+'/tails'))return ok([]);
  if(x.path===ROOT+'/workflows/afw-own-qa-private-confirmation')return ok({id:'707e5440-2af3-4a0c-8fff-d40efc9895c4',name:'afw-own-qa-private-confirmation',class_name:'PrivateQaNamedConfirmation',script_name:'agent-friendly-web-independent-closure-qa'});
  if(x.path===ROOT+'/workflows/afw-own-qa-private-confirmation/instances')return ok([{id:'qa-historical-instance',workflow_id:'707e5440-2af3-4a0c-8fff-d40efc9895c4',status:'complete'}],{per_page:100,count:1,total_count:1});
  if(x.path===ROOT+'/workflows/afw-release-administrative')return ok({id:'0ee9231b-8952-46bd-8124-a0c5dbb06dd0',name:'afw-release-administrative',class_name:'AfwReleaseWorkflow',script_name:OP});
  if(x.path===ROOT+'/workflows/afw-release-administrative/instances')return ok([{id:'historical-instance',workflow_id:'0ee9231b-8952-46bd-8124-a0c5dbb06dd0',status:state.active?'running':'complete'}],{per_page:100,count:1,total_count:1});
  if(x.path===ROOT+'/containers/applications/'+APP+'/instances-v2')return ok([],{per_page:100});
  throw Error('Unexpected fixed read '+x.path);
 };
 const options={storage,namespace:{idFromName:name=>{if(name!=='afw-own-event-first-successor-v1')throw Error('Wrong name');return{toString:()=>containerId};},idFromString:id=>({toString:()=>id})},readControl:()=>({...control}),readHandoff:async()=>({...handoff,observedAt:wall}),request,now:()=>wall};
 return {at,ids,policy,control,handoff,state,storage,calls,options,request,get posts(){return posts;},advance:ms=>{wall+=ms;},savePolicy(){control.policy=JSON.stringify(policy);}};
}
