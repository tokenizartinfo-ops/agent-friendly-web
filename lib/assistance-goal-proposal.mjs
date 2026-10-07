import {validAssistanceGoalQuery} from './assistance-goal-service-identity.mjs';
import {knownGoalCodes} from './copilot-goal-contract.mjs';
const exact=(value,keys)=>value&&typeof value==='object'&&!Array.isArray(value)&&Object.keys(value).length===keys.length&&keys.every(key=>Object.hasOwn(value,key));
const uuid=value=>typeof value==='string'&&/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/.test(value);
const id=value=>typeof value==='string'&&value.length>0&&value.length<=256;
const time=value=>Number.isSafeInteger(value)&&value>=0&&Number.isFinite(new Date(value).getTime());
const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const failure=()=>({status:403,code:'proposal_unavailable'});
const text=(value,max)=>typeof value==='string'&&value===value.trim()&&value.length>0&&value.length<=max&&!/[<>\u0000-\u001f\u007f\u202a-\u202e\u2066-\u2069]|https?:|www\.|javascript:|data:/i.test(value);
export function validAssistanceGoalProposal(value,{receiptId,revision,expiresAt}={}){
 return exact(value,['version','receiptId','revision','expiresAt','message','reviewRequired','operationsAuthorized'])
  &&value.version==='afw.assistance-goal-proposal.v1'&&uuid(value.receiptId)&&value.receiptId===receiptId
  &&Number.isSafeInteger(revision)&&revision>0&&value.revision===revision&&time(expiresAt)&&value.expiresAt===expiresAt
  &&value.reviewRequired===true&&value.operationsAuthorized===false&&exact(value.message,['question','why'])
  &&text(value.message.question,300)&&value.message.question.endsWith('?')&&(value.message.question.match(/\?/g)||[]).length===1&&text(value.message.why,500);
}
function validRead(value,query,now){
 if(!exact(value,['status','receipt','context'])||value.status!==200)return false;
 const {receipt:r,context:c}=value;
 return exact(r,['id','contextHash','consentSequence','expiresAt'])&&r.id===query.receiptId&&/^[a-f0-9]{64}$/.test(r.contextHash)&&Number.isSafeInteger(r.consentSequence)&&r.consentSequence>0&&time(r.expiresAt)&&r.expiresAt>now
  &&exact(c,['version','eventId','projectRef','runId','revision','expiresAt','declarations','evidenceStatus','operationsAuthorized'])&&c.version==='afw.assistance-goal-context.v1'&&c.eventId===query.eventId&&c.projectRef===query.projectRef&&c.runId===query.runId&&c.revision===query.revision&&c.expiresAt===r.expiresAt&&c.evidenceStatus==='owner_declared'&&c.operationsAuthorized===false
  &&exact(c.declarations,['siteType','goals'])&&['','artist','gallery','museum','institution','commerce','other'].includes(c.declarations.siteType)&&Array.isArray(c.declarations.goals)&&c.declarations.goals.length<=5&&knownGoalCodes(c.declarations.goals).length===c.declarations.goals.length;
}
// Internal preparation, no model/provider/HTTP route configured. Dependencies are
// trusted server adapters: authenticate must verify the separate proposal purpose,
// resolveSource must resolve enrollment, readReceipt must check primary private
// state, and readLease must check active primary operations. A receipt ID grants nothing.
export function createAssistanceGoalProposal({authenticate,resolveSource,readReceipt,readLease,isOpen,getWindowExpiresAt,reserveProposal,completeProposal,generate,now=Date.now,timeoutMs=30000}={}){
 return async(value,authenticationRequest)=>{
  let timer;const controller=new AbortController();
  try{
   if([authenticate,resolveSource,readReceipt,readLease,isOpen,getWindowExpiresAt,reserveProposal,completeProposal,generate,now].some(fn=>typeof fn!=='function')||!Number.isSafeInteger(timeoutMs)||timeoutMs<10||timeoutMs>30000)return failure();
   const start=now(),until=getWindowExpiresAt(),wallStarted=performance.now();
   const open=()=>time(start)&&time(until)&&until>start&&until-start<=600000&&time(now())&&now()>=start&&now()<until&&getWindowExpiresAt()===until&&isOpen()===true&&!controller.signal.aborted;
   if(!open()||!exact(value,['eventId','projectRef','runId','revision','receiptId'])||!uuid(value.receiptId))return failure();
   const query=structuredClone(value),opaque={eventId:query.eventId,projectRef:query.projectRef,runId:query.runId,revision:query.revision};if(!validAssistanceGoalQuery(opaque))return failure();
   let rejectDeadline;const deadline=new Promise((_,reject)=>{rejectDeadline=reject;});
   const arm=remaining=>{clearTimeout(timer);timer=setTimeout(()=>{controller.abort();rejectDeadline(Error('expired'));},Math.max(0,remaining));};arm(Math.min(timeoutMs,until-start));
   const checked=async action=>{if(!open())throw Error('closed');const result=structuredClone(await Promise.race([Promise.resolve().then(action),deadline]));if(!open())throw Error('closed');return result;};
   const capture=async()=>{
    const service=await checked(()=>authenticate(authenticationRequest,query));
    if(!exact(service,['id','purpose'])||!id(service.id)||service.purpose!=='afw.goal-guidance.propose.v1')throw Error('identity');
    const mapping=await checked(()=>resolveSource(opaque,service));if(!exact(mapping,['projectId','userId','sourceId'])||!id(mapping.projectId)||!id(mapping.userId)||!/^help-[a-f0-9]{64}$/.test(mapping.sourceId))throw Error('mapping');
    const lease=await checked(()=>readLease({...opaque,now:now()}));
    if(!exact(lease,['eventId','projectRef','runId','revision','topic','expiresAt'])||lease.eventId!==query.eventId||lease.projectRef!==query.projectRef||lease.runId!==query.runId||lease.revision!==query.revision||lease.topic!=='orientation'||!time(lease.expiresAt)||lease.expiresAt<=now())throw Error('lease');
    const read=await checked(()=>readReceipt({...mapping,receiptId:query.receiptId,query:opaque,now:now()}));
    if(!validRead(read,query,now())||read.receipt.expiresAt>lease.expiresAt||read.receipt.expiresAt>until)throw Error('receipt');
    return{service,mapping,lease,read};
   };
   const captured=await capture();if(!same(captured,await capture()))return failure();
   const reservation=await checked(()=>reserveProposal({...captured.mapping,query:structuredClone(query),now:now()}));
   if(!same(captured,await capture()))return failure();
   const expected={receiptId:query.receiptId,revision:query.revision,expiresAt:captured.read.receipt.expiresAt};
   if(reservation.status===200&&reservation.mode==='prepared'){
    if(!exact(reservation,['status','mode','proposalId','proposal'])||!uuid(reservation.proposalId)||!validAssistanceGoalProposal(reservation.proposal,expected)||!same(captured,await capture()))return failure();
    return{status:200,proposalId:reservation.proposalId,proposal:reservation.proposal};
   }
   if(exact(reservation,['status','code'])&&reservation.status===409&&reservation.code==='proposal_attempt_expired')return{status:409,code:'proposal_attempt_expired'};
   if(reservation.status===202&&reservation.mode==='processing'){
    if(!exact(reservation,['status','mode','expiresAt'])||!time(reservation.expiresAt)||reservation.expiresAt<=now()||reservation.expiresAt>captured.read.receipt.expiresAt||reservation.expiresAt-now()>30000)return failure();
    return{status:202,code:'proposal_preparing',expiresAt:reservation.expiresAt};
   }
   if(!exact(reservation,['status','mode','claimId','expiresAt'])||reservation.status!==200||reservation.mode!=='claimed'||!uuid(reservation.claimId)||!time(reservation.expiresAt)||reservation.expiresAt<=now()||reservation.expiresAt>captured.read.receipt.expiresAt||reservation.expiresAt-now()>30000)return failure();
   arm(Math.min(timeoutMs-(performance.now()-wallStarted),until-now(),captured.read.receipt.expiresAt-now(),reservation.expiresAt-now()));
   const input={declarations:structuredClone(captured.read.context.declarations),evidenceStatus:'owner_declared',operationsAuthorized:false};
   const answer=await checked(()=>generate(input,{signal:controller.signal}));
   if(!exact(answer,['question','why'])||!text(answer.question,300)||!answer.question.endsWith('?')||(answer.question.match(/\?/g)||[]).length!==1||!text(answer.why,500))return failure();
   if(!same(captured,await capture())||!same(captured,await capture())||now()>=captured.read.receipt.expiresAt)return failure();
   const proposal={version:'afw.assistance-goal-proposal.v1',receiptId:query.receiptId,revision:query.revision,expiresAt:captured.read.receipt.expiresAt,message:{question:answer.question,why:answer.why},reviewRequired:true,operationsAuthorized:false};
   const stored=await checked(()=>completeProposal({...captured.mapping,query:structuredClone(query),claimId:reservation.claimId,proposal,now:now()}));
   if(!exact(stored,['status','proposalId','proposal'])||stored.status!==200||!uuid(stored.proposalId)||!same(stored.proposal,proposal)||!same(captured,await capture())||!same(captured,await capture())||now()>=reservation.expiresAt)return failure();
   return{status:200,proposalId:stored.proposalId,proposal:stored.proposal};
  }catch{return failure();}finally{clearTimeout(timer);controller.abort();}
 };
}
