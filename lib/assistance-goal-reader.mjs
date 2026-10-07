import {projectAssistanceSignal} from './assistance-supervision-contract.mjs';
import {projectAssistanceGoalContext} from './assistance-goal-context.mjs';
const exact=(value,keys)=>value&&typeof value==='object'&&!Array.isArray(value)&&Object.keys(value).length===keys.length&&keys.every(key=>Object.hasOwn(value,key));
const hash=value=>typeof value==='string'&&/^[a-f0-9]{64}$/.test(value);
const id=value=>typeof value==='string'&&value.length>0&&value.length<=256;
const time=value=>Number.isSafeInteger(value)&&value>=0&&Number.isFinite(new Date(value).getTime());
const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const failure=()=>({status:403,code:'context_unavailable'});
// Preparation only: dependencies are trusted server adapters, never client JSON.
// authenticate must actually verify a dedicated service identity and signed purpose;
// merely returning this shape is not an authentication mechanism. No runtime mounts it.
// This bounded read does not authorize later model calls or proposal delivery: those
// require their own fresh permission/lease checks. Independent DBs are not one transaction.
export function createAssistanceGoalReader({authenticate,resolveSource,readLease,readSnapshot,signalSecret,isOpen,getWindowExpiresAt,now=Date.now}){
 return async(value,authenticationRequest)=>{
  if([authenticate,resolveSource,readLease,readSnapshot,isOpen,getWindowExpiresAt,now].some(fn=>typeof fn!=='function'))return failure();
  const started=now(),until=getWindowExpiresAt();
  const open=()=>time(started)&&time(until)&&until>started&&until-started<=600000&&isOpen()===true&&getWindowExpiresAt()===until&&time(now())&&now()>=started&&now()<until;
  if(!open()||!exact(value,['eventId','projectRef','runId','revision'])||!hash(value.eventId)||!hash(value.projectRef)||typeof value.runId!=='string'||!/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/.test(value.runId)||!Number.isSafeInteger(value.revision)||value.revision<1)return failure();
  const query=structuredClone(value);
  const checked=async action=>{if(!open())throw Error('closed');const result=structuredClone(await action());if(!open())throw Error('closed');return result;};
  const serviceValid=service=>exact(service,['id','purpose'])&&id(service.id)&&service.purpose==='afw.goal-guidance.read.v1';
  const sourceValid=source=>exact(source,['projectId','userId','sourceId'])&&id(source.projectId)&&id(source.userId)&&typeof source.sourceId==='string'&&/^help-[a-f0-9]{64}$/.test(source.sourceId);
  try{
   const service=await checked(()=>authenticate(authenticationRequest,query));if(!serviceValid(service))return failure();
   const mapping=await checked(()=>resolveSource(query,service));if(!sourceValid(mapping))return failure();
   const lease=await checked(()=>readLease({...query,now:now()}));if(!lease)return failure();
   const initial=await checked(()=>readSnapshot({...mapping,now:now()}));if(initial.status!==200||!initial.snapshot)return failure();
   const captured=initial.snapshot;
   if(captured.source.id!==mapping.sourceId||captured.source.projectId!==mapping.projectId||captured.project.id!==mapping.projectId||captured.project.userId!==mapping.userId)return failure();
   const signal=await checked(()=>projectAssistanceSignal(captured.source,signalSecret));
   if(signal.eventId!==query.eventId||signal.projectRef!==query.projectRef||signal.revision!==query.revision||signal.topic!=='orientation')return failure();
   const freshService=await checked(()=>authenticate(authenticationRequest,query));if(!serviceValid(freshService)||!same(service,freshService))return failure();
   const freshMapping=await checked(()=>resolveSource(query,freshService));if(!same(mapping,freshMapping))return failure();
   const freshLease=await checked(()=>readLease({...query,now:now()}));if(!same(lease,freshLease))return failure();
   const current=await checked(()=>readSnapshot({...mapping,now:now()}));if(current.status!==200||!same(captured,current.snapshot))return failure();
   const consent=captured.consent;
   const context=projectAssistanceGoalContext({project:captured.project,
    grant:{version:'afw.assistance-goals-consent.v1',purpose:'orientation',scope:'goal-guidance',projectId:mapping.projectId,userId:mapping.userId,eventId:signal.eventId,sequence:consent.sequence,issuedAt:consent.issuedAt,expiresAt:consent.expiresAt},
    lease:{...freshLease,projectId:mapping.projectId,userId:mapping.userId},authority:{granted:true,sequence:consent.sequence},now:now()});
   if(!open())return failure();context.expiresAt=Math.min(context.expiresAt,until);
   return{status:200,context};
  }catch{return failure();}
 };
}
