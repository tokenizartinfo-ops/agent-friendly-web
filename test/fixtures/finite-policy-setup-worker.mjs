import {retainFiniteOwnerStagePromise} from '../../lib/mcp-qa-finite-stage-work.mjs';
import {createHash} from 'node:crypto';
import {PrivateQaBootstrap,IndependentClosure} from '../../worker/independent-closure/finite.mjs';
import {narrowFinitePolicySetupClock} from '../../lib/mcp-qa-finite-policy-setup.mjs';
import {createFiniteOwnerPreparationStore} from '../../lib/mcp-qa-finite-preparation-store.mjs';
import {hashFinitePreparationRecord as hash,hashFiniteOwnerPreparationProject} from '../../lib/mcp-qa-finite-preparation-records.mjs';
import {finitePublicProfileTemplate,finitePublicStaticExpectation} from '../../lib/mcp-qa-finite-profile.mjs';
import {activationConfigurationHash} from '../../lib/mcp-activation-observer.mjs';
import {finiteFixture} from './qa-finite-trial.mjs';
// SYNTHETIC source/GitHub/CF/custody/owner qualification. Actual native class,
// original clock logic, store, context/journal, transport and byte checks.
const H='a'.repeat(64),M='b'.repeat(40),Q='c'.repeat(40),U='11111111-1111-4111-8111-111111111111',V='22222222-2222-4222-8222-222222222222',D='33333333-3333-4333-8333-333333333333',R='44444444-4444-4444-8444-444444444444';
const sha=v=>createHash('sha256').update(v).digest('hex');
const canonical=v=>JSON.stringify(v,(_,x)=>x&&typeof x==='object'&&!Array.isArray(x)?Object.fromEntries(Object.entries(x).sort(([a],[b])=>a<b?-1:a>b?1:0)):x);
const seal=(kind,value,key)=>({...value,[key]:hash(kind,value)});
const script='export class AfwOwnEventNode{};export class AfwNodeControl{};export default {fetch(){return new Response(null,{status:404})}};';
const refs={intentId:H,sourceRevision:M},hydrations=new WeakMap();
function native(T0){return {setupInstanceId:'afw-finite-policy-'+sha('afw.finite-private-policy-setup.v1\n'+canonical(refs)),sourceRevision:M,qaVersionId:U,eventTimestamp:T0+200,queuedAt:T0+100,startedAt:T0+300,T0};}
function make(env,T0,mode){
 const config=structuredClone(finitePublicProfileTemplate('canaryLive'));for(const b of config.bindings)if(b.privateSlot){delete b.privateSlot;b.text='SYNTHETIC_PREARM';}
 const closed=structuredClone(config);for(const b of closed.bindings)if(b.type==='plain_text'&&b.name.endsWith('_ENABLED'))b.text='false';
 const originalId=env.AFW_RELEASE_EVENTS_NODE.idFromName('afw-own-event-one-occurrence-v1').toString();
 const artifact={script:mode==='oversize'?script+' '.repeat(2097153):script,sourceRevision:M,sourceTree:'d'.repeat(40),programHash:'e'.repeat(64),workerHash:sha(script),sourceCheck:'git-inputs-before-after-v1'};
 if(mode==='oversize')artifact.workerHash=sha(artifact.script);
 const {legacy}=finiteFixture({at:T0}).plan;
 const originalContext={artifact,scope:{accountId:'85d0d5dadac3341a564f22ce885e9eec',workerName:'agent-friendly-web-delegated-canary',namespaceId:'d6fc71552de7494a863aca20365a572d',applicationId:'d6fc71552de7494a863aca20365a572d',ownerRef:H,projectRef:H,resource:'https://delegated-canary.agentfriendlyweb.dev/mcp'},original:{containerId:originalId,applicationId:'d6fc71552de7494a863aca20365a572d',programHash:'f'.repeat(64),sourceRevision:Q},publication:{artifactKey:sha(JSON.stringify(['85d0d5dadac3341a564f22ce885e9eec','agent-friendly-web-delegated-canary',artifact.workerHash])),workerHash:artifact.workerHash,activationKey:H},cancellations:[],retirementPolicy:'SYNTHETIC_QUALIFIED_ORIGINAL_RETIREMENT',withdrawalRequestId:U,saveIdempotencyKey:V,legacy,trialId:H};
 const {script:unused,...artifactIdentity}=artifact;void unused;
 const originalContextHash=sha('afw.finite-original-context.v1\n'+canonical({...originalContext,artifact:artifactIdentity}));
 const project={projectId:'SYNTHETIC_OWN_PROJECT',revision:1,synthetic:true},expiry=T0+510001;
 const preparation=seal('OwnerPreparation',{purpose:'afw.finite-owner-preparation.v1',prepId:H,sourceRevision:M,actorId:env.AFW_INDEPENDENT_CLOSURE.idFromName('afw-own-successor-closure-v1').toString(),selectedAt:T0-100,expiresAt:expiry,commandBy:mode==='command_at_boundary'?T0:T0+1,owner:{subject:'SYNTHETIC_OWNER',accessRealmHash:H,accessVerifiedAt:T0-1000,accessExpiresAt:expiry},connection:{connectionRef:H,grantId:'SYNTHETIC_GRANT',clientId:'SYNTHETIC_CLIENT',resource:'https://delegated-canary.agentfriendlyweb.dev/mcp',grantHash:H,consentHash:H,noticesHash:H,permissionExpiresAt:expiry},project,goal:'discovery',programContext:{programHash:'f'.repeat(64),sourceRevision:Q,originalContextHash},approval:{purpose:'afw.own-synthetic-policy-preparation.v1',decision:'approve',sourceRevision:M,projectHash:hashFiniteOwnerPreparationProject(project),goal:'discovery',approvedAt:T0-1000,expiresAt:expiry,csrfReceiptHash:H},auditHash:H},'preparationHash');
 const selection=seal('Selection',{purpose:'afw.finite-owner-selection.v1',sourceRevision:M,prepId:H,preparationHash:preparation.preparationHash,selectedAt:T0-100,sequence:1,previousSelectionHash:null},'selectionHash');
 const descriptor={name:'index.mjs',sha256:artifact.workerHash,bytes:Buffer.byteLength(artifact.script)};
 const baseline={versionId:V,deploymentId:D,module:descriptor,configuration:config},rollback={versionId:R,deploymentId:U,module:descriptor,configuration:closed};
 return {T0,mode,preparation,selection,originalContext,baseline,rollback,module:descriptor};
}
export async function syntheticFacts({ctx,env,intentId,sourceRevision},lease){
 lease.assertCurrent();const x=await ctx.storage.get('fixture:scenario');lease.assertCurrent();
 if(x.mode==='held_hydration'){
  const state=hydrations.get(ctx)??{reads:0,lateDenied:0};hydrations.set(ctx,state);state.reads++;
  const underlying=retainFiniteOwnerStagePromise((async()=>{await new Promise(r=>setTimeout(r,6500));try{lease.assertCurrent();await ctx.storage.put('fixture:late-write',true);}catch{state.lateDenied++;}})());
  await Promise.race([underlying,new Promise((_,reject)=>setTimeout(()=>reject(Error('SYNTHETIC source pending')),100))]);
  throw Error('SYNTHETIC held qualification unavailable');
 }
 if(intentId!==H||sourceRevision!==M||x.mode==='owner_incomplete'||x.mode==='seed_incomplete')throw Error('SYNTHETIC qualification denied');
 const n=native(x.T0);if(x.mode==='queue_expired')n.queuedAt=Date.now()-30001;if(x.mode==='setup_expired')n.T0=Date.now()-50001;
 narrowFinitePolicySetupClock(lease,n,refs,env);
 const selected=await createFiniteOwnerPreparationStore({storage:ctx.storage,now:Date.now}).readSelected({sourceRevision:M},lease);
 const assertCurrent=async c=>{c.assertCurrent();if(['changed_grant','changed_revision','changed_selection','publisher_unavailable'].includes(x.mode))throw Error('SYNTHETIC primary drift');};
 const {script:bytes}=x.originalContext.artifact,source={native:n,ownerSource:{window:{startedAt:x.T0-1000,expiresAt:x.preparation.expiresAt}},originalContext:x.originalContext,baseline:x.baseline,rollback:x.rollback,bytes:{baseline:new TextEncoder().encode(bytes),rollback:new TextEncoder().encode(bytes),candidate:new TextEncoder().encode(bytes)},assertCurrent};
 const material={seedHash:H,seed:{sourceRevision:M,intentId:H,manifest:{sourceRevision:M,sourceTree:'d'.repeat(40),modules:{canaryLive:{module:{...x.module,exports:['AfwNodeControl','AfwOwnEventNode','default']},publicStatic:finitePublicStaticExpectation('canaryLive')}}},qaPublication:{qaLive:{versionId:U}}},primaryEvidence:{T0:x.T0,N1:x.T0+300000,R1:x.T0+480000,seedStepCompletedAt:x.T0+50}};
 const notice={sequence:1,revision:1,issuedAt:x.T0-200,expiresAt:x.preparation.connection.permissionExpiresAt};
 const receipt={versionId:V,deploymentId:D,moduleHash:x.module.sha256,configurationHash:activationConfigurationHash(x.baseline.configuration)};
 await assertCurrent(lease);
 return {value:{},selected,witness:{selectionHash:x.selection.selectionHash,publishedAt:x.T0-50},receipt,ownerSource:source.ownerSource,source,material,notice};
}
export async function syntheticEntry({env,event},lease){lease.assertCurrent();return {...native(event.timestamp.getTime()-200),qaVersionId:env.AFW_QA_VERSION.id};}
export class SetupFixture extends IndependentClosure{
 async initialize(mode){
  const T0=Date.now()-(mode==='original_queue_budget'?22000:1000),x=make(this.env,T0,mode);await this.ctx.storage.put('fixture:scenario',x);
  const lease={signal:new AbortController().signal,assertCurrent(){}},store=createFiniteOwnerPreparationStore({storage:this.ctx.storage,now:()=>T0-50});
  await store.publishSelection({preparation:x.preparation,selection:x.selection,expectedHeadHash:null},lease);
  if(mode==='head_touched')await this.ctx.storage.put('afw.qa-finite-trial.v1:head',{SYNTHETIC:true});
  return {T0,baseline:x.baseline,rollback:x.rollback,script:x.originalContext.artifact.script};
 }
 async hydrationState(){return hydrations.get(this.ctx)??{reads:0,lateDenied:0};}
 async rows(){return [...await this.ctx.storage.list()].filter(([k])=>k!=='fixture:scenario');}
}
const worker={async fetch(request,env,ctx){
 const path=new URL(request.url).pathname,actor=env.AFW_INDEPENDENT_CLOSURE.get(env.AFW_INDEPENDENT_CLOSURE.idFromName('afw-own-successor-closure-v1'));
 if(path==='/init')return Response.json(await actor.initialize((await request.json()).mode));
 if(path==='/hydration')return Response.json(await actor.hydrationState());
 if(path==='/rows')return Response.json(await actor.rows());
 const {T0,direct}=await request.json();if(direct)return Response.json(await actor.setupFinitePrivatePolicy(refs));
 const event={timestamp:new Date(T0+200),instanceId:native(T0).setupInstanceId,workflowName:'afw-own-qa-private-bootstrap',payload:{operation:'finite_private_policy_setup',...refs}};
 const step={async do(name,options,fn){return fn();}};
 return Response.json(await new PrivateQaBootstrap(ctx,env).run(event,step));
}};

export default worker;
