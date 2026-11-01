import {qaClosedHttpFixture} from './qa-closed-http.mjs';
import {PRIVATE_QA_CLOSED_FLAGS} from '../../lib/mcp-qa-closed-context.mjs';
export const observationId='e'.repeat(64),observationPurpose='afw.qa-arm-http-observation.v1';
export const observationPolicies=['AFW_QA_HTTP_POLICY','AFW_QA_PREREGISTRATION','AFW_QA_CHALLENGE_IDENTITY','AFW_MCP_CLOSURE_POLICY','AFW_MCP_READER_PROBE_POLICY','AFW_MCP_PUBLISHER_PROBE_POLICY','AFW_MCP_CLOSURE_DISPATCH_POLICY'];
export function armObservationFixture(){
 const f=qaClosedHttpFixture(),original=f.fetch,self='afw-qa-arm-'+observationId;f.expectedRedirect='manual';
 f.fetch=async(input,init)=>{const response=await original(input,init),body=await response.json(),url=new URL(input);
 if(url.pathname.includes('/afw-own-qa-private-bootstrap/instances'))body.result=[{id:self,status:'running',workflow_id:'06b6c3eb-ce59-4594-8b9e-2636977d56da',version_id:'opaque-workflow-version'}];
 f.attack?.({url,init,body});return new Response(JSON.stringify(body),{status:response.status,headers:response.headers});};
 f.env={AFW_QA_VERSION:{id:f.version},AFW_MCP_CLOSURE_READ_TOKEN:'synthetic-private-CF-token',...Object.fromEntries(PRIVATE_QA_CLOSED_FLAGS.map(k=>[k,'false'])),...Object.fromEntries(observationPolicies.map(k=>[k,'']))};
 f.context={purpose:'afw.qa-arm-http-observation-context.v1',id:observationId,sourceRevision:'a'.repeat(40),baselineVersionId:'c570b60b-95dc-48e1-89f3-9c4651691dbc',baselineModuleHash:'4b557f04777be25f3df6dc271990d57095ace231bb7b24e2a7a10da23ada2c2f',startAt:f.wall-1000,expiresAt:f.wall+60000};
 f.event={instanceId:self,timestamp:new Date(f.wall-1),payload:{operation:'inspect_arm_quiescence',observationId}};
 f.step={do:async(_name,_config,work)=>work()};
 f.options=()=>({env:f.env,event:f.event,step:f.step,context:f.context,pins:{canary:f.pins.canary,operator:f.pins.operator},fetchImpl:f.fetch,now:()=>f.wall});
 return f;
}
