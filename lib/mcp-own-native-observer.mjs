const receipt=(stage,extra={})=>({contract_version:'agentfriendly.original-native-observation.v1',checkedAt:new Date().toISOString(),stage,...extra,originalIncidentRepaired:false,fullAFWCircuitAccepted:false,operationalReadiness:false,pcOffAccepted:false});
export function readObserverWindow(env,now){
 try{
  if(!env||env.AFW_NATIVE_OBSERVATION_ENABLED!=='true'||env.AFW_NATIVE_OBSERVATION_PLAN!=='afw.original-native-observation.20261022.v1'||!Number.isSafeInteger(now)||now<0)return null;
  const start=env.AFW_NATIVE_OBSERVATION_START,end=env.AFW_NATIVE_OBSERVATION_END,ms=/^[1-9][0-9]{12}$/;
  if(typeof start!=='string'||typeof end!=='string'||!ms.test(start)||!ms.test(end))return null;
  const a=Number(start),b=Number(end);if(!Number.isSafeInteger(a)||!Number.isSafeInteger(b)||b<=a||b-a>300000||now<a||now>=b)return null;
  return Object.freeze({start:a,end:b});
 }catch{return null;}
}
export function observeOriginalNative(ctx,env,args,now){
 const closed=()=>receipt('observation_closed');
 try{
  if(!Array.isArray(args)||args.length||typeof now!=='function')return closed();
  const at=now(),window=readObserverWindow(env,at);if(!window)return closed();
  const flags=['AFW_DELEGATED_OAUTH_ENABLED','AFW_DOSSIER_EVENTS_ENABLED','AFW_DOSSIER_EVENTS_SCHEDULE_ENABLED','AFW_DOSSIER_MONITORING_OWNER_ENABLED','AFW_DOSSIER_OWN_SAVE_ENABLED','AFW_DOSSIER_RETIREMENT_READ_ENABLED','AFW_DOSSIER_SUCCESSOR_ENABLED','AFW_OAUTH_REFRESH_ENABLED'];
  const name='afw-own-event-first-successor-v1',binding=env.AFW_DOSSIER_EVENTS_NODE;
  if(!flags.every(k=>env[k]==='false')||env.AFW_DOSSIER_EVENTS_NODE_NAME!==name||typeof binding?.idFromName!=='function')return closed();
  const resolve=binding.idFromName,expected=resolve.call(binding,name).toString(),actual=ctx?.id?.toString();
  if(typeof expected!=='string'||!/^[a-f0-9]{64}$/.test(expected)||actual!==expected)return closed();
  let present,running,methods,unconfirmed=false;
  try{
   const container=ctx.container;present=!!container;running=present&&typeof container.running==='boolean'?container.running:null;
   methods=Object.fromEntries(['start','setInactivityTimeout','interceptOutboundHttp','getTcpPort','destroy'].map(k=>[k,present&&typeof container[k]==='function']));
  }catch{unconfirmed=true;}
  const after=now(),current=readObserverWindow(env,after);
  if(!current||after<at||current.start!==window.start||current.end!==window.end||env.AFW_DOSSIER_EVENTS_NODE!==binding||binding.idFromName!==resolve||env.AFW_DOSSIER_EVENTS_NODE_NAME!==name||!flags.every(k=>env[k]==='false'))return closed();
  if(unconfirmed)return receipt('native_context_unconfirmed',{window});
  return receipt('native_context_observed',{window,present,running,methods});
 }catch{return closed();}
}
export function createOriginalObservationWrapper(){
 if(arguments.length)throw Error('Fixed original observation source only');
 return "import original,{AfwOwnEventNode as OriginalNode,AfwNodeControl} from './frozen-original.mjs';\n"+
  "if('observeNativeForControl' in OriginalNode.prototype)throw Error('Original observer already exists');\n"+
  "const receipt="+receipt.toString()+";\nconst readObserverWindow="+readObserverWindow.toString()+";\nconst observeOriginalNative="+observeOriginalNative.toString()+";\n"+
  "export class AfwOwnEventNode extends OriginalNode {observeNativeForControl(...args){return observeOriginalNative(this.ctx,this.env,args,Date.now);}}\n"+
  "export {AfwNodeControl};export default original;\n";
}
export function createOriginalObservationDriver(){
 if(arguments.length)throw Error('Fixed original observation source only');
 return "import {WorkflowEntrypoint} from 'cloudflare:workers';\nconst receipt="+receipt.toString()+";\nconst readObserverWindow="+readObserverWindow.toString()+";\n"+
  `export class AfwOriginalNativeObservation extends WorkflowEntrypoint {
 async run(event,step){
  if(event.instanceId!=='afw-20261022-original-native')return receipt('observation_closed');
  const cfg=readObserverWindow(this.env,Date.now());if(!cfg)return receipt('observation_closed');
  return step.do('original-native-context',{retries:{limit:0,delay:'1 second',backoff:'constant'},timeout:'20 seconds'},async()=>{
   const start=Date.now(),before=readObserverWindow(this.env,start);
   if(!before||before.start!==cfg.start||before.end!==cfg.end)return receipt('observation_closed');
   const binding=this.env.ORIGINAL;let timer,result;
   try{
    result=await Promise.race([Promise.resolve().then(()=>binding.getByName('afw-own-event-first-successor-v1').observeNativeForControl()),
     new Promise((_,reject)=>{timer=setTimeout(()=>reject(Error('observation_timeout')),10000);})]);
   }catch{return receipt('native_context_unconfirmed',{window:cfg});}finally{clearTimeout(timer);}
   const after=Date.now(),current=readObserverWindow(this.env,after);
   if(!current||after<start||current.start!==cfg.start||current.end!==cfg.end||this.env.ORIGINAL!==binding)return receipt('observation_closed');
   const keys=['start','setInactivityTimeout','interceptOutboundHttp','getTcpPort','destroy'];
   if(result?.contract_version!=='agentfriendly.original-native-observation.v1'||result.window?.start!==cfg.start||result.window?.end!==cfg.end||result.stage!=='native_context_observed'||typeof result.present!=='boolean'||result.running!==null&&typeof result.running!=='boolean'||!keys.every(k=>typeof result.methods?.[k]==='boolean')||['originalIncidentRepaired','fullAFWCircuitAccepted','operationalReadiness','pcOffAccepted'].some(k=>result[k]!==false))
    return receipt('native_context_unconfirmed',{window:cfg});
   return receipt('native_context_observed',{window:cfg,observedAt:result.checkedAt,present:result.present,running:result.running,methods:Object.fromEntries(keys.map(k=>[k,result.methods[k]]))});
  });
 }
}
export default {fetch(){return new Response('{"code":"unavailable"}',{status:404,headers:{'Content-Type':'application/json','Cache-Control':'no-store'}});}};
`;
}
