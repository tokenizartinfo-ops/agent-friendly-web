import {activationConfigurationHash} from '../../lib/mcp-activation-observer.mjs';
import {RELEASE_TARGET} from '../../lib/mcp-release-operator-policy.mjs';
import {createHash} from 'node:crypto';
/** CI-only synthetic plan. Expired by construction; never a deployment plan. */
export function inertNamedConfirmationPolicy(artifact){
 const t=RELEASE_TARGET,resource='https://delegated-canary.agentfriendlyweb.dev/mcp',window={startAt:0,expiresAt:1};
 const artifactKey=createHash('sha256').update(JSON.stringify([t.accountId,t.workerName,artifact.workerHash])).digest('hex');
 const plan={activationKey:'d'.repeat(64),artifactKey,trialId:'e'.repeat(64),configurationHash:'',...window};
 const manifest={scope:{accountId:t.accountId,workerName:t.workerName,namespaceId:t.namespaceId,applicationId:t.namespaceId,ownerRef:'1'.repeat(64),projectRef:'2'.repeat(64),resource},original:{containerId:'3'.repeat(64),applicationId:t.namespaceId,programHash:'4'.repeat(64),sourceRevision:'5'.repeat(40)},candidate:{trialId:plan.trialId,programHash:artifact.programHash,sourceRevision:artifact.sourceRevision,...window,budget:1},publication:{artifactKey,workerHash:artifact.workerHash,activationKey:plan.activationKey}};
 const events={grantId:'ci-only-inert',subject:'ci-only',projectId:'ci-synthetic',clientId:'ci-only',resource,...window};
 const text={AFW_DOSSIER_EVENTS_NODE_NAME:'afw-own-event-first-successor-v1',AFW_DOSSIER_SUCCESSOR_ENABLED:'true',AFW_DOSSIER_EVENTS_ENABLED:'true',AFW_DOSSIER_SUCCESSOR_POLICY:JSON.stringify(manifest),AFW_DOSSIER_EVENTS_POLICY:JSON.stringify(events),AFW_OAUTH_ISSUER:resource.slice(0,-4),AFW_OAUTH_RESOURCE:resource,AFW_OAUTH_PILOT_PROJECT_ID:events.projectId,AFW_OAUTH_PILOT_CLIENT_ID:events.clientId};
 const configuration={compatibility_date:'2026-09-07',compatibility_flags:['nodejs_compat','global_fetch_strictly_public'],main_module:'index.mjs',exports:{AfwOwnEventNode:{type:'durable-object',storage:'sqlite'}},bindings:[{name:'DB',type:'d1',id:t.databaseId},{name:'OAUTH_KV',type:'kv_namespace',namespace_id:t.kvId},{name:'AFW_DOSSIER_EVENTS_NODE',type:'durable_object_namespace',namespace_id:t.namespaceId,class_name:'AfwOwnEventNode'},...Object.entries(text).map(([name,text])=>({name,type:'plain_text',text}))],usage_model:'standard',containers:[]};
 plan.configurationHash=activationConfigurationHash(configuration);
 return {operation:'confirm_named',...window,plan,observation:{versionId:'11111111-1111-4111-8111-111111111111',deploymentId:'22222222-2222-4222-8222-222222222222',namespaceId:t.namespaceId,applicationId:t.namespaceId,configuration}};
}
