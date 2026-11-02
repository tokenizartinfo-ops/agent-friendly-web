import {FiniteOwnerFixture} from './finite-owner-worker.mjs';
import {createFiniteOwnerRequestLease,prepareFiniteOwnerChoice} from '../../lib/mcp-qa-finite-owner-preparation.mjs';
import {createFiniteConnectionPreparation} from '../../lib/mcp-qa-finite-connection-preparation.mjs';
import {initializeSyntheticConnectionMaterial} from './finite-connection-source.mjs';
export class FiniteConnectionFixture extends FiniteOwnerFixture{
 async fetch(request){
  const path=new URL(request.url).pathname;
  if(path==='/fixture/hold-final'){
   const {mode}=await request.json();if(!['selection','nested_source'].includes(mode))throw Error('SYNTHETIC gate mode');
   let release,settled;const wait=new Promise(r=>{release=r;}),settlement=new Promise(r=>{settled=r;});
   const gate={mode,held:false,settled:false,finalReceipt:false,parentFinished:false,release,settlement,async hold(){this.held=true;try{await wait;}finally{this.settled=true;settled();}}};
   const actual=this.ctx.storage;
   const storage={put:(...a)=>actual.put(...a),get:async key=>{
    const value=await actual.get(key);
    if(mode==='nested_source'&&gate.finalReceipt&&!gate.held&&key==='fixture:source')await gate.hold();
    return value;
   },transaction:async fn=>{
    let finite=false,selection=false;
    const answer=await actual.transaction(async tx=>fn({get:(...a)=>tx.get(...a),put:(key,value)=>{
     if(key.endsWith(':receipt')&&typeof value==='string'&&JSON.parse(value).stage==='finite')finite=true;
     if(key.startsWith('source-selection:')&&key.endsWith(':head'))selection=true;
     return tx.put(key,value);
    }}));
    if(finite)gate.finalReceipt=true;
    if(mode==='selection'&&selection&&!gate.held)await gate.hold();
    return answer;
   }};
   this.finalGate=gate;this.effectCtx={id:this.ctx.id,storage};return Response.json({configured:true});
  }
  if(path==='/fixture/final-gate-state'){
   const gate=this.finalGate;return Response.json({held:gate.held,settled:gate.settled,parentFinished:gate.parentFinished,finalReceipt:gate.finalReceipt});
  }
  if(path==='/fixture/release-final'){
   const gate=this.finalGate;gate.release();if(gate.held)await gate.settlement;return Response.json({released:true});
  }
  if(path==='/fixture/hold-source'){await this.ctx.storage.put('fixture:source-hold',{used:false,settled:false});return Response.json({configured:true});}
  if(path==='/fixture/source-hold-state')return Response.json(await this.ctx.storage.get('fixture:source-hold'));
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
   }catch{return Response.json({status:'admin_pending',mayRetry:false,operationalReadiness:false});}finally{parent.finish();if(this.finalGate?.held)this.finalGate.parentFinished=true;}
  }
  return super.fetch(request);
 }
}
const worker={fetch(request,env){return env.FIXTURE.get(env.FIXTURE.idFromName('owner')).fetch(request);}};

export default worker;
