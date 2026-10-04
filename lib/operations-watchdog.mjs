import {producerFreshness} from './operations-producer-state.mjs';

const UUID=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

/** Read-only, fixed resources. Caller must supply verified server configuration.
 * This classification neither sends alerts nor authorizes an investigation.
 */
export async function readProducerWatchdog(env,{now=Date.now()}={}) {
  if(!Number.isSafeInteger(now)||now<0||!Number.isFinite(new Date(now).getTime()))throw Error('Invalid watchdog clock');
  const checkedAt=new Date(now).toISOString();
  if(env?.AFW_OPERATIONS_PRODUCER_ENABLED!=='true')return {paused:true,checkedAt,resources:[]};
  const targets=[
    {resource:'afw_delegated_canary',version:env.AFW_CANARY_VERSION,expected:env.AFW_CANARY_EXPECTED},
    {resource:'afw_delegated_real_pilot',version:env.AFW_REAL_PILOT_VERSION,expected:env.AFW_REAL_PILOT_EXPECTED}
  ];
  if(typeof env.OPERATIONS_STATE_DB?.prepare!=='function'||targets.some(x=>!UUID.test(x.version??'')||!['closed','available'].includes(x.expected)))throw Error('Invalid watchdog configuration');
  const resources=[];
  for(const target of targets) {
    let row;
    try {row=await env.OPERATIONS_STATE_DB.prepare('SELECT resource,version,expected,observed_at,confirmed_at,last_result,delivery_pending FROM operations_probe_state WHERE resource=?').bind(target.resource).first();}
    catch {throw Error('Watchdog storage unavailable');}
    const issues=[];
    if(!row)issues.push('checkpoint_missing');
    else if(![row.observed_at,row.confirmed_at].every(x=>Number.isSafeInteger(x)&&x>=0)||![0,1].includes(row.delivery_pending)||!['','failed','recovered'].includes(row.last_result))issues.push('checkpoint_invalid');
    else if(row.observed_at>now||row.confirmed_at>now)issues.push('clock_invalid');
    else {
      if(row.version!==target.version||row.expected!==target.expected)issues.push('configuration_changed');
      const freshness=producerFreshness(row,now);
      if(freshness.silent)issues.push('observation_stale');
      if(row.delivery_pending===1)issues.push('delivery_pending');
      else if(freshness.deliveryStale)issues.push('delivery_stale');
      if(row.last_result==='failed')issues.push('service_failed');
    }
    resources.push({resource:target.resource,issues});
  }
  return {paused:false,checkedAt,resources};
}
