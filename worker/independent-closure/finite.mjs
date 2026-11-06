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
export {PrivateQaCatalog,PrivateQaPreregistration,observePrivateQa,default} from './index.mjs';
export class PrivateQaBootstrap extends ClosedBootstrap{
 run(event,step){if(event?.payload?.operation===FINITE_INITIAL_PREPARATION_OPERATION)return runPrivateQaFiniteInitialPreparation({env:this.env,event,step});if(event?.payload?.operation===FINITE_POLICY_SETUP_OPERATION)return runFinitePrivatePolicySetup({env:this.env,event,step});if(event?.payload?.operation===FINITE_LAUNCHER_OPERATION)return runPrivateQaFiniteLauncher({env:this.env,event,step});return super.run(event,step);}
}
export class PrivateQaNamedConfirmation extends ClosedConfirmation{
 run(event,step){if(event?.payload&&Object.hasOwn(event.payload,'planHash'))return runPrivateQaFiniteConfirmation({env:this.env,event,step});return super.run(event,step);}
}
export class IndependentClosure extends ClosedIndependentClosure{
 fetch(request){
  const factories={
   'https://afw-private.invalid/_finite-owner/choice':createFiniteOwnerNativeReceiver,
   'https://afw-private.invalid/_finite-owner/authorize':createPrivateQaFiniteOwnerOAuthReceiver,
   'https://afw-private.invalid/_finite-owner/monitoring':createPrivateQaFiniteOwnerNoticeGetReceiver,
   'https://afw-private.invalid/_finite-owner/monitoring/grant':createPrivateQaFiniteOwnerNoticeConsentReceiver
  };
  const factory=Object.hasOwn(factories,request.url)?factories[request.url]:null;
  if(factory){if(request.method!=='POST')return finiteNativePending(405);return factory({ctx:this.ctx,env:this.env}).fetch(request);}
  const path=new URL(request.url).pathname;
  if(path==='/_finite-owner'||path.startsWith('/_finite-owner/'))return finiteNativePending(404);
  return super.fetch(request);
 }

 async alarm(){const result=await runPrivateQaFiniteInitialCleanupAlarm({ctx:this.ctx,env:this.env});return result===null?super.alarm():result;}
 prepareFiniteInitialMaterial(...args){if(args.length!==1)return Promise.resolve({status:'admin_pending',mayRetry:false,operationalReadiness:false});return createPrivateQaFiniteInitialEntry({ctx:this.ctx,env:this.env}).run(args[0]);}
 setupFinitePrivatePolicy(...args){if(args.length!==1)throw Error('Finite setup unavailable');return createPrivateQaFinitePolicySetup({ctx:this.ctx,env:this.env}).run(args[0]);}
}
