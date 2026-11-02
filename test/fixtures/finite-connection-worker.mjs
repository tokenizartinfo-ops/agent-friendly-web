import {FiniteOwnerFixture} from './finite-owner-worker.mjs';
import {createFiniteOwnerRequestLease,prepareFiniteOwnerChoice} from '../../lib/mcp-qa-finite-owner-preparation.mjs';
import {createFinitePolicyTransport} from '../../lib/mcp-qa-finite-policy-transport.mjs';
import {initializeSyntheticConnectionMaterial} from './finite-connection-source.mjs';
export class FiniteConnectionFixture extends FiniteOwnerFixture{
 async fetch(request){
  const path=new URL(request.url).pathname;
  if(path==='/fixture/material')return Response.json(await initializeSyntheticConnectionMaterial(this.ctx));
  if(path==='/fixture/publish'){
   const input=await request.json(),original=new Request(input.url,{method:'POST',headers:input.headers,body:input.body}),parent=createFiniteOwnerRequestLease(original);
   try{
    const result=await prepareFiniteOwnerChoice({ctx:this.ctx,env:this.env,request:original},parent.lease);
    const answer=await createFinitePolicyTransport({ctx:this.ctx,env:this.env}).run({preconnectionId:result.preconnectionId,stage:result.stage},parent.lease);
    return Response.json(answer.outcome);
   }catch{return Response.json({status:'admin_pending',mayRetry:false,operationalReadiness:false});}finally{parent.finish();}
  }
  return super.fetch(request);
 }
}
export default {fetch(request,env){return env.FIXTURE.get(env.FIXTURE.idFromName('owner')).fetch(request);}};
