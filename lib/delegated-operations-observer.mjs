import {checkDelegatedEdge} from './delegated-edge-health.mjs';
import {validateSignal} from './operations-ledger.mjs';

const resources=Object.freeze({canary:'afw_delegated_canary','real-pilot':'afw_delegated_real_pilot'});

/** Produces a sanitized signal only. No delivery, credentials or remote mutations. */
export async function observeDelegatedService({service,version,eventId,expected='closed',fetchImpl=fetch,now=Date.now}={}) {
  if(!Object.hasOwn(resources,service??'')||!['closed','available'].includes(expected))throw Error('Invalid delegated observation');
  const start=now();
  validateSignal({eventId,resource:resources[service],check:'delegated_edge',version,observedAt:new Date(start).toISOString(),result:'failed'},start);
  const report=await checkDelegatedEdge({service,expected,fetchImpl,now:()=>new Date(now()).toISOString()});
  const signal=validateSignal({eventId,resource:resources[service],check:'delegated_edge',version,observedAt:report.checkedAt,result:report.ok?'recovered':'failed'},now());
  return {report,signal};
}
