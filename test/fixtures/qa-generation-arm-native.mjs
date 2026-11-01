// TEST ONLY. Actual isolated DO/D1, synthetic namespace, HTTP and invocation declaration.
import {DurableObject} from 'cloudflare:workers';
import {createPrivateQaGenerationArm} from '../../lib/mcp-qa-generation-arm.mjs';
import {generationPreparationFixture} from './qa-generation-preparation.mjs';
import {qaClosedHttpFixture} from './qa-closed-http.mjs';
export class GenerationArmFixture extends DurableObject{
 constructor(ctx,env){super(ctx,env);this.ctx=ctx;this.env=env;}
 async seed(){const x=generationPreparationFixture({at:Number(this.env.FIXTURE_AT)});for(const [k,v]of x.f.rows)await this.ctx.storage.put(k,v);return x.namedBundleHash;}
 async rows(){return [...await this.ctx.storage.list()];}
 async qualify(variant){
  const x=generationPreparationFixture({at:Number(this.env.FIXTURE_AT)}),http=qaClosedHttpFixture();http.expectedRedirect='manual';http.version=this.env.AFW_QA_VERSION.id;
  const declaration={instanceId:'afw-qa-arm-'+x.namedBundleHash,qaVersionId:http.version,sourceRevision:'a'.repeat(40)},fetchBase=http.fetch;
  const env={...this.env,AFW_MCP_CLOSURE_NODE:x.p.namespace,AFW_MCP_CLOSURE_READ_TOKEN:'synthetic-cf-token'},parent=new AbortController();
  let injected=false;const storage=this.ctx.storage;
  const wrapped={transaction:async fn=>{
   const value=await storage.transaction(fn),head=await storage.get('afw.qa-generation-head.v2'),control=head&&await storage.get('afw.qa-generation-control.v2:'+head.planHash);
   if(!injected&&control?.phase==='pending'){
    injected=true;
    if(variant==='revocation')await env.AFW_QA_DOSSIER_DB.prepare('UPDATE delegated_access_grants SET revoked_at=? WHERE id=?').bind(new Date().toISOString(),x.event.grantId).run();
    if(variant==='reservation')await env.AFW_QA_DOSSIER_DB.prepare('INSERT INTO dossier_successor_reservations VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)').bind('afw.own-successor.v1','native-reservation',x.original.containerId,x.original.processGeneration,x.original.programHash,x.original.sourceRevision,x.original.applicationId,'9'.repeat(64),'a'.repeat(64),'b'.repeat(40),'c'.repeat(64),x.p.policy.startAt,x.p.policy.expiresAt,1,x.original.closedAt,x.original.closedAt,x.p.policy.startAt,x.p.policy.startAt,'prepared').run();
    if(variant==='abort')parent.abort();
    if(variant==='lost-pending')throw Error('synthetic pending commit ACK lost');
   }
   if(control?.phase==='armed'&&variant==='lost-armed')throw Error('synthetic armed commit ACK lost');
   return value;
  }};
  const ctx=variant==='valid'?this.ctx:{id:this.ctx.id,storage:wrapped};
  const result=await createPrivateQaGenerationArm({env,ctx,sourceRevision:'a'.repeat(40),artifactContext:{artifact:x.p.artifact,receipt:x.p.receipt},historicalContext:x.old.historicalContext,externalPins:{canary:http.pins.canary,operator:http.pins.operator},nativeInvocation:declaration,fetchImpl:async(input,init)=>{
   http.wall=Date.now();const r=await fetchBase(input,init),body=await r.json();
   if(new URL(input).pathname.includes('/afw-own-qa-private-bootstrap/instances'))body.result=[{id:declaration.instanceId,status:'running',workflow_id:'06b6c3eb-ce59-4594-8b9e-2636977d56da',version_id:'synthetic'}];
   return new Response(JSON.stringify(body),{status:r.status,headers:r.headers});
  },now:Date.now,timeoutMs:5000}).arm(x.namedBundleHash,parent.signal);
  return{result,requests:http.requests.map(r=>({method:r.init.method,path:r.url.pathname})),syntheticInvocationDeclaration:true};
 }
}
export default{fetch(){return new Response(null,{status:404});}};
