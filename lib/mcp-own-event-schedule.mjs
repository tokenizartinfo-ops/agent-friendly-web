import {readDossierEventHostPolicy} from './dossier-event-rpc-authority.mjs';
const fail=()=>{throw Error('Own event schedule unavailable');};
const cronAt=t=>{const d=new Date(t);return `${d.getUTCMinutes()} ${d.getUTCHours()} ${d.getUTCDate()} ${d.getUTCMonth()+1} *`;};
/** Optional closed diagnostic only. Never selects a Node or reads a grant,
 * storage, callback or key. This is a witness, not permission or readiness. */
export function readClosedOwnScheduleWitness(controller,env,{sourceRevision,now=Date.now}={}){
 try{
  if(env?.AFW_DOSSIER_EVENTS_SCHEDULE_MODE!=='stable-minute')return null;
  if(['AFW_DELEGATED_OAUTH_ENABLED','AFW_DOSSIER_EVENTS_ENABLED','AFW_DOSSIER_MONITORING_OWNER_ENABLED','AFW_DOSSIER_EVENTS_SCHEDULE_ENABLED','AFW_DOSSIER_OWN_SAVE_ENABLED','AFW_OAUTH_REFRESH_ENABLED'].some(k=>env[k]!=='false')||['AFW_DOSSIER_EVENTS_SCHEDULE','AFW_DOSSIER_EVENTS_POLICY','AFW_DOSSIER_MONITORING_OWNER_POLICY'].some(k=>env[k]!==undefined))return null;
  const at=controller?.scheduledTime,t=now();
  if(controller?.cron!=='* * * * *'||!Number.isSafeInteger(at)||at<0||at%60000!==0||!Number.isSafeInteger(t)||t<at||typeof sourceRevision!=='string'||!/^[a-f0-9]{40}$/.test(sourceRevision))return null;
  return Object.freeze({type:'afw.closed.scheduled',sourceRevision,cron:'* * * * *',scheduledAt:new Date(at).toISOString(),observedAt:new Date(t).toISOString()});
 }catch{return null;}
}
/** Private platform scheduled event only. No public route, clock renewal,
 * callback input, Node boot, retry or independently recreated budget. */
export async function runOwnEventSchedule(controller,env,{now=Date.now}={}){
 try{
  const enabled=env.AFW_DOSSIER_EVENTS_SCHEDULE_ENABLED;
  if(enabled===undefined)return null;
  const raw=env.AFW_DOSSIER_EVENTS_SCHEDULE;
  if(enabled==='false'&&raw===undefined)return null;
  if(!['true','false'].includes(enabled)||typeof raw!=='string'||raw.length>1024||typeof now!=='function')fail();
  const rawMode=env.AFW_DOSSIER_EVENTS_SCHEDULE_MODE,mode=rawMode??'exact';if(!['exact','stable-minute'].includes(mode))fail();
  const p=JSON.parse(raw),closeOnly=p&&Object.keys(p).length===1&&Object.hasOwn(p,'closeAt'),keys=closeOnly?['closeAt']:['subscriptionId','eventId','dispatchAt','closeAt'];
  if(!p||Object.getPrototypeOf(p)!==Object.prototype||Object.keys(p).length!==keys.length||keys.some(k=>!Object.hasOwn(p,k))||!Number.isSafeInteger(p.closeAt)||p.closeAt<0||p.closeAt%60000!==0)fail();
  if(!closeOnly&&(!/^sub_[0-9a-f]{64}$/.test(p.subscriptionId)||typeof p.eventId!=='string'||!/^[A-Za-z0-9_-]{1,200}$/.test(p.eventId)||!Number.isSafeInteger(p.dispatchAt)||p.dispatchAt<0||p.dispatchAt%60000!==0||p.closeAt<=p.dispatchAt))fail();
  Object.freeze(p);
  const scheduledTime=controller?.scheduledTime,cron=controller?.cron;
  if(!Number.isSafeInteger(scheduledTime)||scheduledTime<0||scheduledTime%60000!==0)fail();
  if(mode==='exact'&&(!(closeOnly?[p.closeAt]:[p.dispatchAt,p.closeAt]).includes(scheduledTime)||cron!==cronAt(scheduledTime))||mode==='stable-minute'&&cron!=='* * * * *')fail();
  const closing=mode==='stable-minute'?scheduledTime>=p.closeAt:scheduledTime===p.closeAt;
  // A provider cron can settle while the service is closed. Later policy
  // changes retain that same trigger; idle ticks never select a Node.
  if(mode==='stable-minute'&&!closing&&(closeOnly||scheduledTime!==p.dispatchAt))return null;
  if(!closing&&enabled!=='true')fail();
  const c=readDossierEventHostPolicy({enabled:true,env,now,historical:closing}),w=c.policy;
  if(!closeOnly&&(p.dispatchAt<w.startAt||p.dispatchAt>=w.expiresAt)||p.closeAt!==Math.ceil(w.expiresAt/60000)*60000)fail();
  let last=-1;
  const current=()=>{c.current();const t=now();if(!Number.isSafeInteger(t)||t<scheduledTime||t<last||env.AFW_DOSSIER_EVENTS_SCHEDULE_ENABLED!==enabled||env.AFW_DOSSIER_EVENTS_SCHEDULE!==raw||env.AFW_DOSSIER_EVENTS_SCHEDULE_MODE!==rawMode)fail();last=t;};
  current();const binding=c.pins.AFW_DOSSIER_EVENTS_NODE,id=binding.idFromString(w.containerId);if(id.toString()!==w.containerId)fail();current();
  const stub=binding.get(id),method=closing?'close':'deliverSaved';current();if(typeof stub?.[method]!=='function')fail();
  await (closing?stub.close():stub.deliverSaved(p.subscriptionId,p.eventId));current();
  return Object.freeze({phase:closing?'close':'dispatch',status:'requested'});
 }catch{fail();}
}
