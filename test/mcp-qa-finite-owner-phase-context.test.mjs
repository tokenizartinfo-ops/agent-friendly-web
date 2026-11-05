import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {qualifyFiniteOwnerInstalledStage as stageFacts} from '../lib/mcp-qa-finite-owner-stage-facts.mjs';
import {qualifyFinitePreparationEnrollmentFacts as enrollmentFacts} from '../lib/mcp-qa-finite-preparation-enrollment-facts.mjs';
import {hashFinitePreparationRecord as hash,hashFiniteOwnerEvidence as evidence,hashFiniteOwnerPreparationProject as projectHash} from '../lib/mcp-qa-finite-preparation-records.mjs';
const h='a'.repeat(64),rev='b'.repeat(40),uuid=n=>String(n).repeat(8)+'-'+String(n).repeat(4)+'-4'+String(n).repeat(3)+'-8'+String(n).repeat(3)+'-'+String(n).repeat(12);
const sorted=v=>JSON.stringify(v,(_,x)=>x&&typeof x==='object'&&!Array.isArray(x)?Object.fromEntries(Object.entries(x).sort(([a],[b])=>a<b?-1:1)):x);
function fixture(){
 const source={sourceRevision:rev,actorId:h,qaNamespaceId:'c'.repeat(32),qaVersionId:uuid(1),origin:'https://delegated-canary.agentfriendlyweb.dev',phase:'closed_ui',access:{teamDomain:'synthetic.cloudflareaccess.com',audience:'SYN'},clientId:'SYN',resource:'https://delegated-canary.agentfriendlyweb.dev/mcp',project:{projectId:'SYN',revision:1,synthetic:true},goal:'content',programContext:{programHash:h,sourceRevision:rev,originalContextHash:h},initialBaseline:{versionId:uuid(2),deploymentId:uuid(3),moduleHash:h,configurationHash:h,bindingsHash:h},currentPublication:{stage:null,versionId:uuid(2),deploymentId:uuid(3),receiptHash:null},window:{startedAt:1000,expiresAt:901000}};
 const realm=evidence('realm',{...source.access,origin:source.origin}),subjectHash=evidence('subject',{accessRealmHash:realm,subject:'SYN-owner'});
 const ticket={purpose:'afw.finite-owner-ticket.v1',ticketHash:h,subjectHash,sourceRevision:rev,projectRef:h,connectionRef:null,preconnectionId:h,action:'connection',createdAt:1100,expiresAt:901000};
 const approval={purpose:'afw.finite-connection-approval.v1',subjectHash,sourceRevision:rev,projectHash:projectHash(source.project),clientId:source.clientId,approvedAt:1200,expiresAt:901000};
 approval.csrfReceiptHash=evidence('decision',{ticket,decision:'approve',projectHash:approval.projectHash,goal:source.goal,clientId:source.clientId,approvedAt:approval.approvedAt,expiresAt:approval.expiresAt});
 const preconnection={purpose:'afw.finite-connection-preparation.v1',preconnectionId:h,sourceRevision:rev,actorId:h,owner:{subject:'SYN-owner',accessRealmHash:realm,accessVerifiedAt:1000,accessExpiresAt:901000},project:source.project,clientId:source.clientId,resource:source.resource,startedAt:1200,expiresAt:901000,approvalHash:hash('ConfigurationApproval',approval),baselineHash:evidence('baseline',source.initialBaseline)};
 preconnection.recordHash=hash('Preconnection',preconnection);
 const sourceSnapshot={preconnectionId:h,initialTicketHash:h,source};sourceSnapshot.sourceHash=hash('OwnerSourceSnapshot',sourceSnapshot);
 const stageApproval={purpose:'afw.finite-connection-stage-approval.v1',preconnectionId:h,sourceRevision:rev,stage:'connection',ticketHash:h,approvalHash:preconnection.approvalHash};
 const ticketUse={purpose:'afw.finite-owner-ticket-use.v1',ticketHash:h,recordHash:approval.csrfReceiptHash,consumedAt:1200};
 const contextHash=createHash('sha256').update('afw.finite-connection-context.v1\n'+sorted({preconnection,stageApproval,predecessors:[],grant:null,notice:null})).digest('hex');
 const send=effect=>({purpose:'afw.finite-connection-send.v1',preconnectionId:h,sourceRevision:rev,stage:'connection',contextHash,effect,baselineVersionId:uuid(2),baselineDeploymentId:uuid(3),requestHash:h,issuedAt:1300,deadline:6300});
 const uploadSend=send('upload'),activationSend={...send('activation'),issuedAt:1400,deadline:6400};
 const upload={state:'acknowledged',send:uploadSend,ack:{purpose:'afw.finite-connection-ack.v1',sendHash:hash('ConnectionSend',uploadSend),resourceId:uuid(4),acknowledgedAt:1350},receipt:null};
 const receipt={purpose:'afw.finite-connection-installed.v1',preconnectionId:h,sourceRevision:rev,stage:'connection',baselineVersionId:uuid(2),baselineDeploymentId:uuid(3),versionId:uuid(4),deploymentId:uuid(5),moduleHash:h,configurationHash:h,completedAt:1500};receipt.receiptHash=hash('ConnectionReceipt',receipt);
 const activation={state:'installed',send:activationSend,ack:{purpose:'afw.finite-connection-ack.v1',sendHash:hash('ConnectionSend',activationSend),resourceId:uuid(5),acknowledgedAt:1450},receipt};
 return {source,preconnection,sourceSnapshot,initialTicket:ticket,connection:null,stage:'connection',stageApproval,approval,ticket,ticketUse,upload,activation,predecessors:[],grantLink:null,noticeLink:null,observedAt:1600};
}
test('pure installed first stage correlates exact original DATA chain',()=>{const f=fixture(),r=stageFacts(f);assert.deepEqual(r,f.activation.receipt);assert(Object.isFrozen(r));assert(!Object.keys(r).some(k=>/permission|callback|authoriz/i.test(k)));});
for(const [name,mutate] of [
 ['original A',f=>{f.preconnection.preconnectionId='d'.repeat(64);}],
 ['subject',f=>{f.ticket.subjectHash='d'.repeat(64);}],
 ['source',f=>{f.source.sourceRevision='d'.repeat(40);}],
 ['project',f=>{f.source.project.revision++;}],
 ['predecessor',f=>{f.activation.receipt.baselineVersionId=uuid(6);}],
 ['decision',f=>{f.ticketUse.recordHash='d'.repeat(64);}],
 ['ACK send hash',f=>{f.upload.ack.sendHash='d'.repeat(64);}],
 ['receipt version',f=>{f.activation.receipt.versionId=uuid(6);}],
 ['receipt deployment',f=>{f.activation.receipt.deploymentId=uuid(6);}],
 ['before upload ACK',f=>{f.upload.ack.acknowledgedAt=1501;}],
 ['before activation ACK',f=>{f.activation.ack.acknowledgedAt=1501;}],
 ['unknown journal state',f=>{f.upload.state='ready';}],
 ['unknown key',f=>{f.upload.permission=true;}],
 ['function',f=>{f.env=()=>{};}],
 ['expired original',f=>{f.observedAt=901000;}]
])test('pure stage denies '+name,()=>{const f=fixture();mutate(f);assert.throws(()=>stageFacts(f));});
test('pure helpers reject accessors, symbols and callback/options without executing them',()=>{
 let called=0;
 for(const qualify of [stageFacts,enrollmentFacts]){
  for(const bad of [{env:()=>{}},{...fixture(),[Symbol('extra')]:1},Object.defineProperty(fixture(),'source',{enumerable:true,get(){called++;}})])assert.throws(()=>qualify(bad));
 }assert.equal(called,0);
});
test('shared predicates never acquire source, store or QA decoder authority',async()=>{
 for(const path of ['lib/mcp-qa-finite-owner-stage-facts.mjs','lib/mcp-qa-finite-preparation-enrollment-facts.mjs']){
  const text=await readFile(path,'utf8');assert.doesNotMatch(text,/from ['"].*(?:bootstrap|residency|owner-preparation|preparation-store)(?:\.mjs)?['"]/);assert.doesNotMatch(text,/\b(?:fetch|resolve|stageHistory)\s*\(/);
 }
});
