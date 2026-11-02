import {DurableObject} from 'cloudflare:workers';
import {createFiniteOwnerPreparationHost} from '../../lib/mcp-qa-finite-owner-http.mjs';
import {createFiniteOwnerPreparationStore} from '../../lib/mcp-qa-finite-preparation-store.mjs';
import {recordFinitePreparationGrant,recordFinitePreparationNotice,recordFinitePreparationAuthorization} from '../../lib/mcp-qa-finite-owner-preparation.mjs';
const origin='https://delegated-canary.agentfriendlyweb.dev';
const H='a'.repeat(64),M='b'.repeat(40),U='11111111-1111-4111-8111-111111111111';
export class FiniteOwnerFixture extends DurableObject{
 async fetch(request){
  const path=new URL(request.url).pathname;
  if(path==='/fixture/init'){
   const at=Date.now(),source={sourceRevision:M,actorId:this.ctx.id.toString(),qaNamespaceId:'c'.repeat(32),qaVersionId:U,origin,phase:'closed_ui',access:{teamDomain:'finite-fixture.cloudflareaccess.com',audience:'finite-owner'},clientId:'synthetic-client',resource:origin+'/mcp',project:{projectId:'synthetic-owned',revision:1,synthetic:true},goal:'discovery',programContext:{programHash:H,sourceRevision:'d'.repeat(40),originalContextHash:H},initialBaseline:{versionId:U,deploymentId:U,moduleHash:H,configurationHash:H,bindingsHash:H},currentPublication:{stage:null,versionId:U,deploymentId:U,receiptHash:null},window:{startedAt:at-100,expiresAt:at+899000}};
   await this.ctx.storage.put('fixture:source',source);
   return Response.json({initialized:true});
  }
  if(path==='/fixture/source'){
   const source=await this.ctx.storage.get('fixture:source'),changes=await request.json();
   await this.ctx.storage.put('fixture:source',{...source,...changes});return Response.json({changed:true});
  }
  if(path==='/fixture/rows'){
   const rows=[...await this.ctx.storage.list()].filter(([k])=>!k.startsWith('fixture:'));
   return Response.json(rows);
  }
  if(path==='/fixture/store'){
   const {method,arg}=await request.json(),store=createFiniteOwnerPreparationStore({storage:this.ctx.storage,now:Date.now}),lease={signal:new AbortController().signal,assertCurrent(){}};
   try{return Response.json({result:await store[method](arg,lease)});}catch{return Response.json({rejected:true});}
  }
  if(path==='/fixture/link'){
   const {kind,grantId,requestId,sequence,authorizationHash,url,headers,body}=await request.json();
   const original=new Request(url,{method:body?'POST':'GET',headers,body:body||undefined});
   const lease={signal:new AbortController().signal,assertCurrent(){}};
   try{const op={grant:recordFinitePreparationGrant,notice:recordFinitePreparationNotice,authorization:recordFinitePreparationAuthorization}[kind];
    return Response.json({result:await op({ctx:this.ctx,env:this.env,request:original,...(kind==='grant'?{grantId}:kind==='notice'?{requestId,sequence}:{authorizationHash})},lease)});
   }catch{return Response.json({rejected:true});}
  }
  return createFiniteOwnerPreparationHost({ctx:this.ctx,env:this.env}).fetch(request);
 }
}
export default{fetch(request,env){
 const name=request.headers.get('X-Fixture-Actor')||'owner';
 return env.FIXTURE.get(env.FIXTURE.idFromName(name)).fetch(request);
}};
