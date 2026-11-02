import {FiniteConnectionFixture} from './finite-connection-worker.mjs';
import {createPrivateQaFinitePolicySetup} from '../../lib/mcp-qa-finite-policy-setup.mjs';
import {hashFinitePreparationRecord as hash} from '../../lib/mcp-qa-finite-preparation-records.mjs';
import {createFiniteOwnerPreparationStore} from '../../lib/mcp-qa-finite-preparation-store.mjs';
export class SetupFactsFixture extends FiniteConnectionFixture{
 async fetch(request){
  const path=new URL(request.url).pathname;
  if(path==='/fixture/task4-arm'){
   const {mode}=await request.json(),lease={signal:new AbortController().signal,assertCurrent(){}},selected=await createFiniteOwnerPreparationStore({storage:this.ctx.storage,now:Date.now}).readSelected({sourceRevision:'b'.repeat(40)},lease);
   if(!selected)throw Error('SYNTHETIC actual selected preparation absent');
   await this.ctx.storage.put('fixture:task4Arm',{commandBy:selected.preparation.commandBy,T0:mode==='selection'?Date.now():selected.preparation.commandBy-1});
   return Response.json({commandBy:selected.preparation.commandBy});
  }
  if(path==='/fixture/task4-drift-selection'){
   const lease={signal:new AbortController().signal,assertCurrent(){}},store=createFiniteOwnerPreparationStore({storage:this.ctx.storage,now:Date.now}),previous=await store.readSelected({sourceRevision:'b'.repeat(40)},lease);
   const raw={purpose:'afw.finite-owner-selection.v1',sourceRevision:previous.selection.sourceRevision,prepId:previous.preparation.prepId,preparationHash:previous.preparation.preparationHash,selectedAt:Date.now(),sequence:previous.selection.sequence+1,previousSelectionHash:previous.selection.selectionHash},selection={...raw,selectionHash:hash('Selection',raw)};
   return Response.json(await store.publishSelection({preparation:previous.preparation,selection,expectedHeadHash:previous.selection.selectionHash},lease));
  }
  if(path==='/fixture/task4-facts'){
   const outcome=await createPrivateQaFinitePolicySetup({ctx:this.ctx,env:this.env}).run({intentId:'a'.repeat(64),sourceRevision:'b'.repeat(40)});
   return Response.json({outcome,facts:await this.ctx.storage.get('fixture:task4FactsResult')});
  }
  return super.fetch(request);
 }
}
const worker={fetch(request,env){return env.FIXTURE.get(env.FIXTURE.idFromName('owner')).fetch(request);}};
export default worker;
