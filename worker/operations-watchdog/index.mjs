import {operationsWindowOpen} from '../../lib/operations-window.mjs';
import {readProducerWatchdog} from '../../lib/operations-watchdog.mjs';
import {recordWatchdogObservation} from '../../lib/operations-watchdog-transitions.mjs';

export async function runWatchdog(env,{now=Date.now(),clock=Date.now}={}){
 if(env?.AFW_OPERATIONS_WATCHDOG_ENABLED!=='true'||!operationsWindowOpen(env,now))return {skipped:true};
 if(!['true','false'].includes(env.AFW_OPERATIONS_PRODUCER_ENABLED)||typeof env.OPERATIONS_STATE_DB?.prepare!=='function'||typeof env.OPERATIONS_STATE_DB?.batch!=='function')throw Error('Invalid watchdog runtime configuration');
 try{
  const db=env.OPERATIONS_STATE_DB.withSession?env.OPERATIONS_STATE_DB.withSession('first-primary'):env.OPERATIONS_STATE_DB;
  const observation=await readProducerWatchdog({...env,OPERATIONS_STATE_DB:db},{now});
  // Recheck the actual wall clock before writing; a deadline is not only a cron admission check.
  if(!operationsWindowOpen(env,Math.max(now,clock())))return {skipped:true};
  const result=await recordWatchdogObservation(db,observation,{now});
  return {skipped:false,paused:observation.paused,...result};
 }catch{throw Error('Watchdog execution unavailable');}
}
const watchdog={
 async fetch(){return new Response(null,{status:404,headers:{'Cache-Control':'no-store'}});},
 async scheduled(_event,env){await runWatchdog(env);},
};
export default watchdog;
