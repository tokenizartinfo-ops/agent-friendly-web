import {createPrivateQaFiniteRecoveryExecutor} from '../../lib/mcp-qa-finite-recovery-executor.mjs';
import {createPrivateQaFiniteNominalAuthority,readPrivateQaFiniteCanaryNominalContext} from '../../lib/mcp-qa-finite-nominal-authority.mjs';
import {installPrivateQaFiniteNativeGuardFactory,installPrivateQaFiniteRecoveryFactory} from '../../lib/mcp-qa-finite-trial-guard.mjs';
import {FINITE_ALARM_HANDOFF,protectPrivateQaFiniteBusinessAlarm} from '../../lib/mcp-qa-finite-alarm-handoff.mjs';
import {readPrivateQaFiniteProofInventory} from '../../lib/mcp-qa-finite-proof-inventory.mjs';
import {readPrivateQaFiniteReductionControl} from '../../lib/mcp-qa-finite-reduction-control.mjs';
import {readPrivateQaFiniteCoupledFinalization} from '../../lib/mcp-qa-finite-coupled-finalization.mjs';
import {FINITE_COUPLED_QA_OPERATION,observePrivateQaCoupledRestorePreparation,publishPrivateQaCoupledRestorePreparation} from '../../lib/mcp-qa-finite-coupled-restore-observer.mjs';
import {installPrivateQaFiniteLaunchSource} from '../../lib/mcp-qa-finite-launch-source.mjs';
import {privateQaFiniteLaunchSource,schedulePrivateQaFiniteNominalLauncher} from '../../lib/mcp-qa-finite-launch-origin.mjs';
import {FINITE_OBSERVER_INSTALLATION_URL,FINITE_OBSERVER_OPERATION,runPrivateQaFiniteObserver} from '../../lib/mcp-qa-finite-observer.mjs';
import {readPrivateQaFiniteObserverInstallation} from '../../lib/mcp-qa-finite-observer-installation.mjs';
import {readPrivateQaFiniteSetupOwnerSource} from '../../lib/mcp-qa-finite-policy-prearm-source.mjs';
import {readPrivateQaFiniteConfirmationFromActor} from '../../lib/mcp-qa-finite-confirmation-actor.mjs';
import {createFiniteOwnerNativeReceiver} from '../../lib/mcp-qa-finite-owner-native-receiver.mjs';
import {createPrivateQaFiniteOwnerOAuthReceiver} from '../../lib/mcp-qa-finite-owner-oauth-qa.mjs';
import {createPrivateQaFiniteOwnerNoticeGetReceiver,createPrivateQaFiniteOwnerNoticeConsentReceiver} from '../../lib/mcp-qa-finite-owner-notice-get-qa.mjs';
import {finiteNativePending} from '../../lib/mcp-qa-finite-owner-native-wire.mjs';
import {runPrivateQaFiniteInitialCleanupAlarm} from '../../lib/mcp-qa-finite-initial-cleanup.mjs';
import {runPrivateQaFiniteInitialPreparation,createPrivateQaFiniteInitialEntry,FINITE_INITIAL_PREPARATION_OPERATION} from '../../lib/mcp-qa-finite-initial-entry.mjs';
import '../../lib/mcp-qa-finite-bootstrap-source.mjs';
import '../../lib/mcp-qa-finite-candidate-residency.mjs';
import {runFinitePrivatePolicySetup,createPrivateQaFinitePolicySetup,FINITE_POLICY_SETUP_OPERATION} from '../../lib/mcp-qa-finite-policy-setup.mjs';
// SOURCE-selected finite composition. Ordinary index.mjs stays closed.
import {PrivateQaBootstrap as ClosedBootstrap,PrivateQaNamedConfirmation as ClosedConfirmation,IndependentClosure as ClosedIndependentClosure} from './index.mjs';
import {isPrivateQaFiniteLauncherPayload,runPrivateQaFiniteLauncher} from '../../lib/mcp-qa-finite-launcher.mjs';
import {runPrivateQaFiniteConfirmation} from '../../lib/mcp-qa-finite-confirmation.mjs';
installPrivateQaFiniteLaunchSource(privateQaFiniteLaunchSource);
installPrivateQaFiniteNativeGuardFactory(input=>createPrivateQaFiniteNominalAuthority({
 ...input,compiledRevision:globalThis.__AFW_QA_SOURCE_REVISION__,
}));
installPrivateQaFiniteRecoveryFactory(input=>createPrivateQaFiniteRecoveryExecutor({
 ...input,compiledRevision:globalThis.__AFW_QA_SOURCE_REVISION__,
}));
export {PrivateQaCatalog,PrivateQaPreregistration,observePrivateQa,default} from './index.mjs';
export class PrivateQaBootstrap extends ClosedBootstrap{
 run(event,step){if(event?.payload?.operation===FINITE_COUPLED_QA_OPERATION)return observePrivateQaCoupledRestorePreparation({env:this.env,event,step,sourceRevision:globalThis.__AFW_QA_SOURCE_REVISION__});if(event?.payload?.operation===FINITE_OBSERVER_OPERATION)return runPrivateQaFiniteObserver({env:this.env,event,step,requireSetupReceipt:true,useNativeLauncher:true});if(event?.payload?.operation===FINITE_INITIAL_PREPARATION_OPERATION)return runPrivateQaFiniteInitialPreparation({env:this.env,event,step});if(event?.payload?.operation===FINITE_POLICY_SETUP_OPERATION)return runFinitePrivatePolicySetup({env:this.env,event,step});if(isPrivateQaFiniteLauncherPayload(event?.payload))return runPrivateQaFiniteLauncher({env:this.env,event,step});return super.run(event,step);}
}
export class PrivateQaNamedConfirmation extends ClosedConfirmation{
 run(event,step){if(event?.payload&&Object.hasOwn(event.payload,'planHash'))return runPrivateQaFiniteConfirmation({env:this.env,event,step});return super.run(event,step);}
}
export class IndependentClosure extends ClosedIndependentClosure{
 async fetch(request){
  if(request.url===FINITE_OBSERVER_INSTALLATION_URL){
   if(request.method!=='GET'||request.body!==null)return finiteNativePending(405);
   try{return Response.json(await readPrivateQaFiniteObserverInstallation({ctx:this.ctx,env:this.env}),{headers:{'Cache-Control':'no-store'}});}
   catch{return finiteNativePending(503);}
  }
  const factories={
   'https://afw-private.invalid/_finite-owner/choice':createFiniteOwnerNativeReceiver,
   'https://afw-private.invalid/_finite-owner/authorize':createPrivateQaFiniteOwnerOAuthReceiver,
   'https://afw-private.invalid/_finite-owner/monitoring':createPrivateQaFiniteOwnerNoticeGetReceiver,
   'https://afw-private.invalid/_finite-owner/monitoring/grant':createPrivateQaFiniteOwnerNoticeConsentReceiver
  };
  const factory=Object.hasOwn(factories,request.url)?factories[request.url]:null;
  if(factory){if(request.method!=='POST')return finiteNativePending(405);return factory({ctx:this.ctx,env:this.env}).fetch(request);}
  const path=new URL(request.url).pathname;
  if(path==='/_finite-native'||path.startsWith('/_finite-native/'))return finiteNativePending(404);
  if(path==='/_finite-owner'||path.startsWith('/_finite-owner/'))return finiteNativePending(404);
  return super.fetch(request);
 }

 async alarm(){
  if(await this.ctx.storage.get(FINITE_ALARM_HANDOFF)!==undefined){
   // No business callback may consume the only physical alarm while original
   // recovery is still owed. The due original route needs its own handler.
   const delivery=await protectPrivateQaFiniteBusinessAlarm({storage:this.ctx.storage,actorId:this.ctx.id.toString(),qaVersionId:this.env.AFW_QA_VERSION?.id});
   if(!delivery)throw Error('Finite original recovery requires reconciliation');
   const closedResult=async delivery=>{
    const receiptHash=delivery.receiptHash;
    try{
     const observation=await publishPrivateQaCoupledRestorePreparation({ctx:this.ctx,env:this.env,receiptHash});
     return Object.freeze({status:'owner_cleanup_closed',receiptHash,observation,operationalReadiness:false});
    }catch{return Object.freeze({status:'owner_cleanup_closed',receiptHash,operationalReadiness:false});}
   };
   if(delivery.kind==='original_closed')return closedResult(delivery);
   if(delivery.kind==='original_due'){
    const result=await runPrivateQaFiniteInitialCleanupAlarm({ctx:this.ctx,env:this.env});
    if(result?.status==='owner_cleanup_closed'){
     const closed=await protectPrivateQaFiniteBusinessAlarm({storage:this.ctx.storage,actorId:this.ctx.id.toString(),qaVersionId:this.env.AFW_QA_VERSION?.id});
     if(closed?.kind==='original_closed')return closedResult(closed);
    }
    throw Error('Finite original recovery requires reconciliation');
   }
   if(delivery.kind==='business')return super.alarm();
   return {status:'admin_pending',operationalReadiness:false};
  }
  const result=await runPrivateQaFiniteInitialCleanupAlarm({ctx:this.ctx,env:this.env});
  return result===null?super.alarm():result;
 }
 scheduleFiniteNominalLauncher(...args){
  if(args.length!==1)return Promise.resolve({status:'pending',operationalReadiness:false});
  return schedulePrivateQaFiniteNominalLauncher({ctx:this.ctx,env:this.env,refs:args[0]});
 }
 readFiniteCanaryReductionControl(...args){
  if(args.length!==1)throw Error('Finite native reduction control unavailable');
  return readPrivateQaFiniteReductionControl({ctx:this.ctx,env:this.env,compiledRevision:globalThis.__AFW_QA_SOURCE_REVISION__,refs:args[0]});
 }
 readFiniteCanaryNominalContext(...args){
  if(args.length!==1)throw Error('Finite nominal context unavailable');
  return readPrivateQaFiniteCanaryNominalContext({ctx:this.ctx,env:this.env,compiledRevision:globalThis.__AFW_QA_SOURCE_REVISION__,refs:args[0]});
 }
 readFiniteCanaryProofInventory(...args){
  if(args.length!==1)throw Error('Finite proof inventory unavailable');
  return readPrivateQaFiniteProofInventory({ctx:this.ctx,env:this.env,compiledRevision:globalThis.__AFW_QA_SOURCE_REVISION__,refs:args[0]});
 }
 readFiniteCoupledQaFinalization(...args){
  if(args.length!==1)throw Error('Finite coupled QA finalization unavailable');
  const refs=args[0];
  return readPrivateQaFiniteCoupledFinalization({ctx:this.ctx,env:this.env,refs});
 }
 prepareFiniteInitialMaterial(...args){if(args.length!==1)return Promise.resolve({status:'admin_pending',mayRetry:false,operationalReadiness:false});return createPrivateQaFiniteInitialEntry({ctx:this.ctx,env:this.env}).run(args[0]);}
 readFiniteNominalConfirmation(...args){
  if(args.length!==1)throw Error('Finite confirmation unavailable');
  return readPrivateQaFiniteConfirmationFromActor({ctx:this.ctx,env:this.env,refs:args[0]});
 }
 setupFinitePrivatePolicy(...args){if(args.length!==1)throw Error('Finite setup unavailable');return createPrivateQaFinitePolicySetup({ctx:this.ctx,env:this.env,readOwnerSource:readPrivateQaFiniteSetupOwnerSource}).run(args[0]);}
}
