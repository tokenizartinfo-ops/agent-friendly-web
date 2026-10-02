import {diagnosticAgentCard} from '../../lib/public-a2a-card.mjs';
import {createDiagnosticAgent} from '../../lib/public-a2a.mjs';
import {createDiagnosticHttpHandler} from '../../lib/public-a2a-http.mjs';
import {createA2aRateLimit} from '../../lib/public-a2a-rate-limit.mjs';

export function createA2aWorker(options={}) {
 const agent=createDiagnosticAgent(options);
 return {async fetch(request,env={}) {
  const path=new URL(request.url).pathname;
  if(path==='/.well-known/agent-card.json'&&env.A2A_ENABLED==='true'&&env.A2A_DISCOVERY_ENABLED==='true'&&typeof env.A2A_RATE_LIMITER?.limit==='function'){
   if(!['GET','HEAD'].includes(request.method))return new Response(null,{status:405,headers:{allow:'GET, HEAD','cache-control':'no-store'}});
   const body=JSON.stringify(diagnosticAgentCard());
   const digest=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(body));
   const etag='"'+Array.from(new Uint8Array(digest),b=>b.toString(16).padStart(2,'0')).join('')+'"';
   const headers={'content-type':'application/json','cache-control':'public, max-age=60',etag,'x-content-type-options':'nosniff'};
   if(request.headers.get('if-none-match')===etag)return new Response(null,{status:304,headers});
   return new Response(request.method==='HEAD'?null:body,{headers});
  }
  if(path!=='/a2a')return new Response('Unavailable',{status:404,headers:{'cache-control':'no-store'}});
  return createDiagnosticHttpHandler({enabled:env.A2A_ENABLED==='true',agent,rateLimit:env.A2A_RATE_LIMITER?createA2aRateLimit({binding:env.A2A_RATE_LIMITER}):undefined})(request);
 }};
}
export default createA2aWorker();
