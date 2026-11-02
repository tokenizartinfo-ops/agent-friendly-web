import {FiniteOwnerFixture} from './finite-owner-worker.mjs';
import {createFiniteOwnerRequestLease,prepareFiniteOwnerChoice} from '../../lib/mcp-qa-finite-owner-preparation.mjs';
import {createFiniteConnectionPreparation} from '../../lib/mcp-qa-finite-connection-preparation.mjs';
import {initializeSyntheticConnectionMaterial} from './finite-connection-source.mjs';
export class FiniteConnectionFixture extends FiniteOwnerFixture{
 async fetch(request){
  const path=new URL(request.url).pathname;
  if(path==='/fixture/hold-claim'){
   const actual=this.ctx.storage;let held=false;
   const storage={get:(...a)=>actual.get(...a),put:(...a)=>actual.put(...a),transaction:async fn=>{
    let send=false;const result=await actual.transaction(async tx=>fn({get:(...a)=>tx.get(...a),put:(key,...args)=>{if(key.startsWith('afw.finite-policy-effect.v1:')&&key.endsWith(':send'))send=true;return tx.put(key,...args);}}));
    if(send&&!held){held=true;await new Promise(r=>setTimeout(r,6000));}return result;
   }};
   this.effectCtx={id:this.ctx.id,storage};return Response.json({configured:true});
  }
  if(path==='/fixture/material')return Response.json(await initializeSyntheticConnectionMaterial(this.ctx));
  if(path==='/fixture/publish'){
   const input=await request.json(),original=new Request(input.url,{method:'POST',headers:input.headers,body:input.body}),parent=createFiniteOwnerRequestLease(original);
   try{
    const ctx=this.effectCtx??this.ctx;
    const result=await prepareFiniteOwnerChoice({ctx,env:this.env,request:original},parent.lease);
    const answer=await createFiniteConnectionPreparation({ctx,env:this.env}).run({preconnectionId:result.preconnectionId,stage:result.stage},parent.lease);
    return Response.json(answer);
   }catch{return Response.json({status:'admin_pending',mayRetry:false,operationalReadiness:false});}finally{parent.finish();}
  }
  return super.fetch(request);
 }
}
const worker={fetch(request,env){return env.FIXTURE.get(env.FIXTURE.idFromName('owner')).fetch(request);}};

export default worker;
