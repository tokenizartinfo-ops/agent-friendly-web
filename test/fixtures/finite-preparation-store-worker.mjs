import {finiteFixture} from './qa-finite-trial.mjs';
import {finitePublicProfileTemplate} from '../../lib/mcp-qa-finite-profile.mjs';
import {createHash} from 'node:crypto';
import {DurableObject} from 'cloudflare:workers';
import {createFiniteOwnerPreparationStore} from '../../lib/mcp-qa-finite-preparation-store.mjs';
import {createFinitePolicyEffectJournal} from '../../lib/mcp-qa-finite-policy-journal.mjs';
import {hashFinitePreparationRecord} from '../../lib/mcp-qa-finite-preparation-records.mjs';
// SYNTHETIC clock/leases/identity, actual native SQLite transactions. No source authority.
const H='a'.repeat(64),M='b'.repeat(40),U='11111111-1111-4111-8111-111111111111';
const domain=(kind,value)=>hashFinitePreparationRecord(kind,value);
const seal=(kind,value,key)=>({...value,[key]:domain(kind,value)});
function fixtures(){
 const owner={subject:'synthetic-subject',accessRealmHash:H,accessVerifiedAt:1,accessExpiresAt:900000};
 const project={projectId:'synthetic-project',revision:1,synthetic:true};
 const projectHash=createHash('sha256').update('afw.finite-owner-project.v1\n'+JSON.stringify({projectId:project.projectId,revision:project.revision,synthetic:project.synthetic})).digest('hex');
 const approval={purpose:'afw.own-synthetic-policy-preparation.v1',decision:'approve',sourceRevision:M,projectHash,goal:'discovery',approvedAt:1,expiresAt:900000,csrfReceiptHash:H};
 const preparation=seal('OwnerPreparation',{purpose:'afw.finite-owner-preparation.v1',prepId:H,sourceRevision:M,actorId:H,selectedAt:10,expiresAt:900000,commandBy:390000,owner,connection:{connectionRef:H,grantId:'grant',clientId:'client',resource:'https://fixture.invalid/mcp',grantHash:H,consentHash:H,noticesHash:H,permissionExpiresAt:900000},project,goal:'discovery',programContext:{programHash:H,sourceRevision:M,originalContextHash:H},approval,auditHash:H},'preparationHash');
 const selection=seal('Selection',{purpose:'afw.finite-owner-selection.v1',sourceRevision:M,prepId:H,preparationHash:preparation.preparationHash,selectedAt:10,sequence:1,previousSelectionHash:null},'selectionHash');
 const binding={purpose:'afw.finite-owner-binding.v1',prepId:H,preparationHash:preparation.preparationHash,selectionHash:selection.selectionHash,intentId:'intent-1',sourceRevision:M,T0:20,boundAt:30};
 const ticket={purpose:'afw.finite-owner-ticket.v1',ticketHash:H,subjectHash:H,sourceRevision:M,projectRef:H,connectionRef:null,preconnectionId:H,action:'connection',createdAt:1,expiresAt:900000};
 const identity={kind:'policy',intentId:'intent-1',sourceRevision:M,setupInstanceId:'setup-1',effect:'upload'};
 const send={purpose:'afw.finite-policy-send.v1',intentId:'intent-1',sourceRevision:M,setupInstanceId:'setup-1',contextHash:H,effect:'upload',requestHash:H,issuedAt:30,deadline:5000};
 const ack={purpose:'afw.finite-policy-ack.v1',sendHash:domain('PolicySend',send),resourceId:U,acknowledgedAt:35};
 const preconnection=seal('Preconnection',{purpose:'afw.finite-connection-preparation.v1',preconnectionId:H,sourceRevision:M,actorId:H,owner,project,clientId:'client',resource:'https://fixture.invalid/mcp',startedAt:1,expiresAt:900000,approvalHash:H,baselineHash:H},'recordHash');
 const receipt=seal('PolicyReceipt',{purpose:'afw.finite-policy-installed.v1',intentId:'intent-1',sourceRevision:M,setupInstanceId:'setup-1',qaVersionId:U,seedHash:H,contextHash:H,baselineVersionId:U,baselineDeploymentId:U,versionId:U,deploymentId:U,moduleHash:H,publicStaticHash:H,activationHash:H,restorationHash:H,bindingsHash:H,installedAt:100},'receiptHash');
 const {legacy,T0}=finiteFixture().plan,contextPreparation=structuredClone(preparation);
 contextPreparation.selectedAt=T0-10;contextPreparation.expiresAt=T0+900000;contextPreparation.commandBy=T0+390000;contextPreparation.owner.accessVerifiedAt=T0-100;contextPreparation.owner.accessExpiresAt=T0+900000;contextPreparation.connection.permissionExpiresAt=T0+900000;contextPreparation.approval.approvedAt=T0-100;contextPreparation.approval.expiresAt=T0+900000;contextPreparation.preparationHash=domain('OwnerPreparation',contextPreparation);
 const contextSelection=seal('Selection',{...selection,preparationHash:contextPreparation.preparationHash,selectedAt:T0-10},'selectionHash');
 const contextBinding={...binding,T0,boundAt:T0+1,preparationHash:contextPreparation.preparationHash,selectionHash:contextSelection.selectionHash};
 const config=structuredClone(finitePublicProfileTemplate('canaryLive'));for(const b of config.bindings)if(b.privateSlot){delete b.privateSlot;b.text='synthetic';}
 const context={purpose:'afw.finite-policy-context.v1',intentId:'intent-1',sourceRevision:M,seedHash:H,preparationHash:contextPreparation.preparationHash,selectionHash:contextSelection.selectionHash,bindingHash:domain('Binding',contextBinding),T0,C0:T0+240000,C1:T0+420000,ownerPreparation:contextPreparation,baselineProjectRevision:1,goal:'discovery',saveIdempotencyKey:U,legacy,policies:{AFW_DOSSIER_EVENTS_POLICY:'synthetic',AFW_DOSSIER_PERMISSION_WITHDRAWAL_POLICY:'synthetic',AFW_DOSSIER_RETIREMENT_POLICY:'synthetic',AFW_DOSSIER_SUCCESSOR_POLICY:'synthetic',AFW_OAUTH_PILOT_CLIENT_ID:'client',AFW_OAUTH_PILOT_PROJECT_ID:'project'},baseline:{versionId:U,deploymentId:U,module:{name:'index.mjs',sha256:H,bytes:1024},configuration:config},rollback:{versionId:U,deploymentId:U,module:{name:'index.mjs',sha256:H,bytes:1024},configuration:config},expectedFull:{activationHash:H,restorationHash:H,bindingsHash:H}};
 return {preparation,selection,binding,ticket,identity,send,ack,preconnection,receipt,context,contextSelection,contextBinding};
}
export class FinitePreparationFixture extends DurableObject{
 async fetch(request){
  const b=await request.json();let at=b.now??100,assertions=0;
  const controller=new AbortController();
  const lease={signal:controller.signal,assertCurrent(){assertions++;if(controller.signal.aborted||b.expireAtAssertion===assertions)throw Error('synthetic lease expired');}};
  let committed=false;
  const storage={get:(...a)=>this.ctx.storage.get(...a),transaction:async fn=>{
   const result=await this.ctx.storage.transaction(fn);committed=true;
   if(b.loseCommitAck)throw Error('synthetic lost response AFTER native transaction commit');
   return result;
  }};
  try{
   if(b.op==='fixtures')return Response.json(fixtures());
   if(b.op==='recordHash')return Response.json({result:domain(b.arg.kind,b.arg.record)});
   if(b.op==='rows')return Response.json([...await this.ctx.storage.list()]);
   const store=createFiniteOwnerPreparationStore({storage,now:()=>at});
   const journal=createFinitePolicyEffectJournal({storage,identity:b.identity??fixtures().identity,now:()=>at});
   const target=b.target==='journal'?journal:store;
   if(b.op==='concurrent'){
    const outcomes=await Promise.allSettled(b.args.map(args=>{args.preparation=seal('OwnerPreparation',args.preparation,'preparationHash');args.selection=seal('Selection',{...args.selection,preparationHash:args.preparation.preparationHash},'selectionHash');return store.publishSelection(args,lease);}));
    return Response.json(outcomes.map(x=>x.status==='fulfilled'?x.value:{rejected:true}));
   }
   if(b.reseal){b.arg.preparation=seal('OwnerPreparation',b.arg.preparation,'preparationHash');b.arg.selection=seal('Selection',b.arg.selection,'selectionHash');}
   const result=await (b.op==='read'?target.read(lease):target[b.op](b.arg,lease));
   return Response.json({result,committed,assertions});
  }catch{return Response.json({rejected:true,committed,assertions});}
 }
}
const handler={async fetch(request,env){
 const stub=env.FIXTURE.get(env.FIXTURE.idFromName(new URL(request.url).pathname));
 return stub.fetch(request);
}};
export default handler;
