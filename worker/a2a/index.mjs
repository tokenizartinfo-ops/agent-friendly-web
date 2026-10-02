import {createDiagnosticAgent} from '../../lib/public-a2a.mjs';
import {createDiagnosticHttpHandler} from '../../lib/public-a2a-http.mjs';
import {createA2aRateLimit} from '../../lib/public-a2a-rate-limit.mjs';

export function createA2aWorker(options={}) {
 const agent=createDiagnosticAgent(options);
 return {async fetch(request,env={}) {
  if(new URL(request.url).pathname!=='/a2a')return new Response('Unavailable',{status:404,headers:{'cache-control':'no-store'}});
  return createDiagnosticHttpHandler({enabled:env.A2A_ENABLED==='true',agent,rateLimit:env.A2A_RATE_LIMITER?createA2aRateLimit({binding:env.A2A_RATE_LIMITER}):undefined})(request);
 }};
}
export default createA2aWorker();
