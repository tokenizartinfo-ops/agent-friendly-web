import {readDossierEventHostPolicy} from './dossier-event-rpc-authority.mjs';
const fail=()=>{throw Error('Own event schedule unavailable');};
const cronAt=t=>{const d=new Date(t);return `${d.getUTCMinutes()} ${d.getUTCHours()} ${d.getUTCDate()} ${d.getUTCMonth()+1} *`;};
/** Private platform scheduled event only. No public route, clock renewal,
 * callback input, Node boot, retry or independently recreated budget. */
export async function runOwnEventSchedule(controller,env,{now=Date.now}={}){
 try{
  const enabled=env.AFW_DOSSIER_EVENTS_SCHEDULE_ENABLED;
  if(enabled===undefined)return null;
  const raw=env.AFW_DOSSIER_EVENTS_SCHEDULE;
  if(enabled==='false'&&raw===undefined)return null;
  if(!['true','false'].includes(enabled)||typeof raw!=='string'||raw.length>1024||typeof now!=='function')fail();
  const p=JSON.parse(raw),closeOnly=p&&Object.keys(p).length===1&&Object.hasOwn(p,'closeAt'),keys=closeOnly?['closeAt']:['subscriptionId','eventId','dispatchAt','closeAt'];
  if(!p||Object.getPrototypeOf(p)!==Object.prototype||Object.keys(p).length!==keys.length||keys.some(k=>!Object.hasOwn(p,k))||!Number.isSafeInteger(p.closeAt)||p.closeAt<0||p.closeAt%60000!==0)fail();
  if(!closeOnly&&(!/^sub_[0-9a-f]{64}$/.test(p.subscriptionId)||typeof p.eventId!=='string'||!/^[A-Za-z0-9_-]{1,200}$/.test(p.eventId)||!Number.isSafeInteger(p.dispatchAt)||p.dispatchAt<0||p.dispatchAt%60000!==0||p.closeAt<=p.dispatchAt))fail();
  Object.freeze(p);
  const scheduledTime=controller?.scheduledTime,cron=controller?.cron;
  if(!Number.isSafeInteger(scheduledTime)||!(closeOnly?[p.closeAt]:[p.dispatchAt,p.closeAt]).includes(scheduledTime)||cron!==cronAt(scheduledTime))fail();
  const closing=scheduledTime===p.closeAt;
  if(!closing&&enabled!=='true')fail();
  const c=readDossierEventHostPolicy({enabled:true,env,now,historical:closing}),w=c.policy;
  if(!closeOnly&&(p.dispatchAt<w.startAt||p.dispatchAt>=w.expiresAt)||p.closeAt!==Math.ceil(w.expiresAt/60000)*60000)fail();
  let last=-1;
  const current=()=>{c.current();const t=now();if(!Number.isSafeInteger(t)||t<scheduledTime||t<last||env.AFW_DOSSIER_EVENTS_SCHEDULE_ENABLED!==enabled||env.AFW_DOSSIER_EVENTS_SCHEDULE!==raw)fail();last=t;};
  current();const binding=c.pins.AFW_DOSSIER_EVENTS_NODE,id=binding.idFromString(w.containerId);if(id.toString()!==w.containerId)fail();current();
  const stub=binding.get(id),method=closing?'close':'deliverSaved';current();if(typeof stub?.[method]!=='function')fail();
  await (closing?stub.close():stub.deliverSaved(p.subscriptionId,p.eventId));current();
  return Object.freeze({phase:closing?'close':'dispatch',status:'requested'});
 }catch{fail();}
}
