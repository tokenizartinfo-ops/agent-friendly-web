import {observeDelegatedService} from './delegated-operations-observer.mjs';
import {deliverOperationalSignal} from './operations-delivery.mjs';
import {validateSignal} from './operations-ledger.mjs';
import {createProducerState} from './operations-producer-state.mjs';
import {operationsWindowOpen} from './operations-window.mjs';

export function createOperationsProducer({probeFetch=fetch,now=Date.now,randomId=()=>crypto.randomUUID()}={}) {
  return {async run(env) {
    if(env?.AFW_OPERATIONS_PRODUCER_ENABLED!=='true'||!operationsWindowOpen(env,now()))return {ok:true,paused:true,results:[]};
    if(typeof env.AFW_OPERATIONS_SIGNING_SECRET!=='string'||env.AFW_OPERATIONS_SIGNING_SECRET.length<32||typeof env.OPERATIONS_RECEIVER?.fetch!=='function'||typeof env.OPERATIONS_STATE_DB?.prepare!=='function')throw Error('Producer not configured');
    const targets=[{service:'canary',resource:'afw_delegated_canary',version:env.AFW_CANARY_VERSION,expected:env.AFW_CANARY_EXPECTED},{service:'real-pilot',resource:'afw_delegated_real_pilot',version:env.AFW_REAL_PILOT_VERSION,expected:env.AFW_REAL_PILOT_EXPECTED}];
    const time=now();
    for(const target of targets){if(!['closed','available'].includes(target.expected))throw Error('Invalid expected mode');validateSignal({eventId:'preflight',resource:target.resource,check:'delegated_edge',version:target.version,observedAt:new Date(time).toISOString(),result:'failed'},time);}
    const results=[],state=createProducerState(env.OPERATIONS_STATE_DB);
    const open=()=>operationsWindowOpen(env,Math.max(time,now()));
    const paused=()=>({ok:true,paused:true,results});
    const windowFetch=(...args)=>{if(!open())throw Error('Producer window closed');return probeFetch(...args);};
    const windowReceiver={fetch:(...args)=>{if(!open())throw Error('Producer window closed');return env.OPERATIONS_RECEIVER.fetch(...args);}};
    for(const target of targets) {
      if(!open())return paused();
      const lease=await state.claim(target,now());
      if(!lease){results.push({service:target.service,skipped:true});continue;}
      if(!open())return paused();
      const {report,signal}=await observeDelegatedService({...target,eventId:randomId(),fetchImpl:windowFetch,now});
      if(!open())return paused();
      const suppressed=!state.shouldDeliver(lease,signal.result,now());
      const delivery=suppressed?{ok:false}:await deliverOperationalSignal({signal,secret:env.AFW_OPERATIONS_SIGNING_SECRET,receiver:windowReceiver,now});
      if(!open())return paused();
      if(!await state.finish(lease,{result:signal.result,confirmed:delivery.ok,suppressed},now()))throw Error('Producer checkpoint unconfirmed');
      results.push({service:target.service,healthy:report.ok,delivered:delivery.ok,suppressed,checkedAt:report.checkedAt});
    }
    return {ok:results.every(x=>x.delivered||x.suppressed||x.skipped),paused:false,results};
  }};
}
