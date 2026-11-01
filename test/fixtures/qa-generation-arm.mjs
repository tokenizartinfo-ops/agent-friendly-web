import {generationPreparationFixture} from './qa-generation-preparation.mjs';
import {qaClosedHttpFixture} from './qa-closed-http.mjs';
// Synthetic native declaration, identities, D1 and HTTP. No origin/provenance claim.
export function generationArmFixture(){
 const x=generationPreparationFixture(),http=qaClosedHttpFixture();http.wall=x.f.now();http.expectedRedirect='manual';
 const env=Object.fromEntries(Object.entries(Object.getOwnPropertyDescriptors(x.options.env)).filter(([,d])=>Object.hasOwn(d,'value')).map(([k,d])=>[k,d.value]));
 Object.assign(env,{AFW_MCP_CLOSURE_ENABLED:'true',AFW_MCP_CLOSURE_DISPATCH_ENABLED:'true',AFW_MCP_CLOSURE_REDUCTION_ENABLED:'true',AFW_MCP_CLOSURE_READ_TOKEN:'synthetic-cf-token',AFW_QA_VERSION:{id:http.version}});
 const primary=x.options.env.AFW_QA_DOSSIER_DB,session=primary.withSession;
 x.eligibilityReads=0;x.eligible=true;x.afterEligibility=()=>{};
 env.AFW_QA_DOSSIER_DB={prepare:primary.prepare,withSession(mode){
  const real=Reflect.apply(session,primary,[mode]);return{prepare(sql){
   if(!sql.startsWith('SELECT 1 AS eligible'))return real.prepare(sql);
   x.calls.push(['eligibility-sql',sql]);return{bind(...params){x.calls.push(['eligibility-params',params]);return{async first(){x.eligibilityReads++;await x.afterEligibility(x.eligibilityReads);return x.eligible?{eligible:1}:null;}};}};
  }};
 }};
 const nativeInvocation={instanceId:'afw-qa-arm-'+x.namedBundleHash,qaVersionId:http.version,sourceRevision:x.options.sourceRevision};
 const baseFetch=http.fetch;
 const fetchImpl=async(input,init)=>{const r=await baseFetch(input,init),body=await r.json(),url=new URL(input);
  if(url.pathname.includes('/afw-own-qa-private-bootstrap/instances'))body.result=[{id:nativeInvocation.instanceId,status:'running',workflow_id:'06b6c3eb-ce59-4594-8b9e-2636977d56da',version_id:'synthetic-workflow-declaration'}];
  await x.mutateHttp?.({url,init,body});return new Response(JSON.stringify(body),{status:r.status,headers:r.headers});
 };
 x.parent=new AbortController();x.http=http;x.options={...x.options,env,nativeInvocation,externalPins:{canary:http.pins.canary,operator:http.pins.operator},fetchImpl};
 x.run=async()=>{const api=await import('../../lib/mcp-qa-generation-arm.mjs').catch(()=>({}));if(typeof api.createPrivateQaGenerationArm!=='function')return{status:'missing_host'};return api.createPrivateQaGenerationArm(x.options).arm(x.namedBundleHash,x.parent.signal);};
 return x;
}
