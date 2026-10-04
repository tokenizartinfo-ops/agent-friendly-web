import {observeDelegatedService} from './delegated-operations-observer.mjs';
import {deliverOperationalSignal} from './operations-delivery.mjs';
import {validateSignal} from './operations-ledger.mjs';

export function createOperationsProducer({probeFetch=fetch,now=Date.now,randomId=()=>crypto.randomUUID()}={}) {
  return {async run(env) {
    if(env?.AFW_OPERATIONS_PRODUCER_ENABLED!=='true')return {ok:true,paused:true,results:[]};
    if(typeof env.AFW_OPERATIONS_SIGNING_SECRET!=='string'||env.AFW_OPERATIONS_SIGNING_SECRET.length<32||typeof env.OPERATIONS_RECEIVER?.fetch!=='function')throw Error('Producer not configured');
    const targets=[{service:'canary',resource:'afw_delegated_canary',version:env.AFW_CANARY_VERSION,expected:env.AFW_CANARY_EXPECTED},{service:'real-pilot',resource:'afw_delegated_real_pilot',version:env.AFW_REAL_PILOT_VERSION,expected:env.AFW_REAL_PILOT_EXPECTED}];
    const time=now();
    for(const target of targets){if(!['closed','available'].includes(target.expected))throw Error('Invalid expected mode');validateSignal({eventId:'preflight',resource:target.resource,check:'delegated_edge',version:target.version,observedAt:new Date(time).toISOString(),result:'failed'},time);}
    const results=[];
    for(const target of targets) {
      const {report,signal}=await observeDelegatedService({...target,eventId:randomId(),fetchImpl:probeFetch,now});
      const delivery=await deliverOperationalSignal({signal,secret:env.AFW_OPERATIONS_SIGNING_SECRET,receiver:env.OPERATIONS_RECEIVER,now});
      results.push({service:target.service,healthy:report.ok,delivered:delivery.ok,checkedAt:report.checkedAt});
    }
    return {ok:results.every(x=>x.delivered),paused:false,results};
  }};
}
