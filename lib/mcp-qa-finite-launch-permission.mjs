import {createPrivateQaFiniteRetainedPermission} from './mcp-qa-finite-policy-permission.mjs';
import {createFiniteOwnerPreparationStore} from './mcp-qa-finite-preparation-store.mjs';
import {hashFiniteOwnerEvidence as evidence,hashFinitePreparationRecord as hash} from './mcp-qa-finite-preparation-records.mjs';
import {finiteSame as same,finiteTime as time} from './mcp-finite-evidence.mjs';

const fail=()=>{throw Error('Finite launch permission unavailable');};
const record=value=>{if(value?.status!=='observed'||!value.record)fail();return value.record;};

export function createPrivateQaFiniteLaunchPermission({ctx,env,control,parent}){
 const {plan}=control,storage=ctx.storage,actor=ctx.id,db=env.RELEASE_DB,version=env.AFW_QA_VERSION;
 const {signal,deadline,check}=parent;
 const scope=plan.selectors,revision=plan.source.revision;
 const current=()=>{
  if(signal.aborted||parent.signal!==signal||parent.check!==check||parent.deadline!==deadline||
     ctx.storage!==storage||ctx.id!==actor||actor.toString()!==plan.resources.actorId||
     env.RELEASE_DB!==db||env.AFW_QA_VERSION!==version||version.id!==plan.deployments.qaLive.versionId)fail();
  const at=check();if(!time(at)||at>=deadline||at>=plan.N1)fail();return at;
 };
 const lease={signal,assertCurrent:current};
 return async()=>{
  const store=createFiniteOwnerPreparationStore({storage,now:current});current();
  const selected=await store.readSelected({sourceRevision:revision},lease);current();
  if(!selected?.binding||selected.binding.intentId!==plan.intentId||selected.binding.T0!==plan.T0)fail();
  const {preparation}=selected,id=preparation.prepId,{connection,owner,project}=preparation;
  const requested={grantId:connection.grantId,subject:owner.subject,projectId:project.projectId,clientId:connection.clientId,resource:connection.resource,consentHash:connection.consentHash,expectedProjectRevision:project.revision,goal:preparation.goal};
  if(Object.keys(requested).some(key=>scope[key]!==requested[key])||
     connection.grantHash!==plan.grantHash||connection.noticesHash!==plan.monitorHash||
     connection.permissionExpiresAt<=plan.R1+30000)fail();
  const [grantValue,noticeValue,setup]=await Promise.all([
   store.readLink({kind:'grant',preconnectionId:id},lease),store.readLink({kind:'notice',preconnectionId:id},lease),
   store.readContext({intentId:plan.intentId,sourceRevision:revision},lease),
  ]);current();
  if(!setup||setup.selectionHash!==selected.selection.selectionHash||
     setup.preparationHash!==preparation.preparationHash||setup.bindingHash!==hash('Binding',selected.binding))fail();
  const grant=record(grantValue),notice=record(noticeValue);
  if(grant.preconnectionId!==id||notice.preconnectionId!==id||grant.grantId!==connection.grantId||
     grant.grantHash!==plan.grantHash||notice.grantHash!==plan.grantHash||notice.eventHash!==plan.monitorHash||
     grant.acceptedAt>notice.acceptedAt||notice.acceptedAt>plan.T0)fail();
  const link=record(await store.readAuthorizationLink({authorizationHash:grant.authorizationHash},lease));current();
  if(link.preconnectionId!==id||link.sourceRevision!==revision||link.clientId!==scope.clientId||
     link.resource!==scope.resource||link.subjectHash!==evidence('subject',{accessRealmHash:owner.accessRealmHash,subject:owner.subject})||
     link.expiresAt<=current())fail();
  const granted=await createPrivateQaFiniteRetainedPermission({
   ctx,env,preparation,authorizationHash:grant.authorizationHash,noticeSequence:notice.sequence,
  })(lease);current();
  const [after,grantAfter,noticeAfter]=await Promise.all([
   store.readSelected({sourceRevision:revision},lease),store.readLink({kind:'grant',preconnectionId:id},lease),
   store.readLink({kind:'notice',preconnectionId:id},lease),
  ]);current();
  if(!same(selected,after)||!same(grantValue,grantAfter)||!same(noticeValue,noticeAfter)||current()>=granted)fail();
  return Object.freeze({grantHash:plan.grantHash,monitorHash:plan.monitorHash,valid:true,expiresAt:Math.min(granted,scope.expiresAt)});
 };
}
