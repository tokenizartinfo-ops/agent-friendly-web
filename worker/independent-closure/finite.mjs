import {FINITE_ALARM_HANDOFF,protectPrivateQaFiniteBusinessAlarm} from '../../lib/mcp-qa-finite-alarm-handoff.mjs';
import {installPrivateQaFiniteLaunchSource} from '../../lib/mcp-qa-finite-launch-source.mjs';
import {privateQaFiniteLaunchSource} from '../../lib/mcp-qa-finite-launch-origin.mjs';
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
import {runPrivateQaFiniteLauncher,FINITE_LAUNCHER_OPERATION} from '../../lib/mcp-qa-finite-launcher.mjs';
import {runPrivateQaFiniteConfirmation} from '../../lib/mcp-qa-finite-confirmation.mjs';
installPrivateQaFiniteLaunchSource(privateQaFiniteLaunchSource);
export {PrivateQaCatalog,PrivateQaPreregistration,observePrivateQa,default} from './index.mjs';
export class PrivateQaBootstrap extends ClosedBootstrap{
 run(event,step){if(event?.payload?.operation===FINITE_OBSERVER_OPERATION)return runPrivateQaFiniteObserver({env:this.env,event,step,requireSetupReceipt:true});if(event?.payload?.operation===FINITE_INITIAL_PREPARATION_OPERATION)return runPrivateQaFiniteInitialPreparation({env:this.env,event,step});if(event?.payload?.operation===FINITE_POLICY_SETUP_OPERATION)return runFinitePrivatePolicySetup({env:this.env,event,step});if(event?.payload?.operation===FINITE_LAUNCHER_OPERATION)return runPrivateQaFiniteLauncher({env:this.env,event,step});return super.run(event,step);}
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
   if(delivery.kind==='original_closed')return {status:'owner_cleanup_closed',operationalReadiness:false};
   if(delivery.kind==='original_due'){
    const result=await runPrivateQaFiniteInitialCleanupAlarm({ctx:this.ctx,env:this.env});
    if(result?.status==='owner_cleanup_closed'){
     const closed=await protectPrivateQaFiniteBusinessAlarm({storage:this.ctx.storage,actorId:this.ctx.id.toString(),qaVersionId:this.env.AFW_QA_VERSION?.id});
     if(closed?.kind==='original_closed')return result;
    }
    throw Error('Finite original recovery requires reconciliation');
   }
   if(delivery.kind==='business')return super.alarm();
   return {status:'admin_pending',operationalReadiness:false};
  }
  const result=await runPrivateQaFiniteInitialCleanupAlarm({ctx:this.ctx,env:this.env});
  return result===null?super.alarm():result;
 }
 prepareFiniteInitialMaterial(...args){if(args.length!==1)return Promise.resolve({status:'admin_pending',mayRetry:false,operationalReadiness:false});return createPrivateQaFiniteInitialEntry({ctx:this.ctx,env:this.env}).run(args[0]);}
 readFiniteNominalConfirmation(...args){
  if(args.length!==1)throw Error('Finite confirmation unavailable');
  return readPrivateQaFiniteConfirmationFromActor({ctx:this.ctx,env:this.env,refs:args[0]});
 }
 setupFinitePrivatePolicy(...args){if(args.length!==1)throw Error('Finite setup unavailable');return createPrivateQaFinitePolicySetup({ctx:this.ctx,env:this.env,readOwnerSource:readPrivateQaFiniteSetupOwnerSource}).run(args[0]);}
}
