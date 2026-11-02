import {createHash} from 'node:crypto';
import {createNodeProcessCustody} from '../../lib/mcp-node-process-custody.mjs';
import {createOwnDurableEventHost} from '../../lib/mcp-own-durable-host.mjs';
import {createFiniteOwnNativeCleanupHost} from '../../lib/mcp-own-finite-cleanup-host.mjs';
import {createFiniteNativePrimaryReader} from '../../lib/mcp-own-finite-primary.mjs';
import {createFiniteAdmissionGate} from '../../lib/mcp-own-finite-admission-gate.mjs';
import {finiteAdmissionIdentity} from '../../lib/mcp-own-finite-cleanup-proof.mjs';
import {createDossierMonitoringAuthorization} from '../../lib/dossier-monitoring-authority.mjs';
import {resolveSuccessorPreparation} from '../../lib/mcp-successor-manifest.mjs';
import {createSuccessorReservation} from '../../lib/mcp-successor-reservation.mjs';
import {createPrivateNodeBridge,createPrivateNodeDispatchHandler} from '../../lib/mcp-node-private-bridge.mjs';
import {createNodeReadiness} from '../../lib/mcp-node-readiness.mjs';
import {finiteFixture,digest} from './qa-finite-trial.mjs';
import {nominalFixture} from './finite-nominal-control.mjs';
import {finiteHash} from '../../lib/mcp-finite-evidence.mjs';
// Test-only external source/control approval, provider and Container boundaries.
// All business admission/reservation SQL and DO transactions run in workerd/D1.
const sha=v=>createHash('sha256').update(v).digest('hex'),HEAD='afw.own-finite-admission.v1:head';
const program='SYN native program; Container API fixture only',sourceRevision='c'.repeat(40);
const params=projectRef=>({name:'afw.dossier.changed',arguments:{projectRef},delivery:{mode:'webhook',url:'https://callback.agentfriendlyweb.dev/hook',secret:'whsec_'+Buffer.alloc(32,3).toString('base64')},ttlMs:30000});
export class Native {
 constructor(ctx,env){this.ctx=ctx;this.env=env;}
 async fetch(request){
  const {mode='missing',field,value}=await request.json(),nativeDb=this.env.DB,ctx=this.ctx;
  let offset=0,launches=0,closes=0,callbacks=0,reads=0,runs=0,rerun=false,held=null,release;
  const now=()=>Date.now()+offset,T0=Number(this.env.T0);
  const f=finiteFixture({at:T0}),p=f.plan,s=p.selectors;
  s.resource='https://delegated-canary.agentfriendlyweb.dev/mcp';s.programHash=sha(program);
  p.resources.containerId=ctx.id.toString();
  const context={grantId:s.grantId,subject:s.subject,clientId:s.clientId,resource:s.resource,scopes:['afw:project:read']};
  const sqlTime=async()=> (await nativeDb.prepare("SELECT CAST(strftime('%s','now') AS INTEGER)*1000+CAST(substr(strftime('%f','now'),4,3) AS INTEGER) AS t").first()).t;
  await nativeDb.prepare('INSERT INTO site_projects VALUES(?,?,?)').bind(s.projectId,s.subject,1).run();
  for(const grant of [s.grantId,'predecessor'])await nativeDb.prepare('INSERT INTO delegated_access_grants VALUES(?,?,?,?,?,?,?,?)').bind(grant,s.subject,s.clientId,s.projectId,s.resource,JSON.stringify(context.scopes),new Date(s.expiresAt).toISOString(),'').run();
  await nativeDb.prepare("INSERT INTO dossier_monitoring_consent_events(grant_id,project_id,user_id,client_id,resource,revision,action,purpose,request_id,issued_at,expires_at) VALUES(?,?,?,?,?,?,?,?,?,?,?)").bind(s.grantId,s.projectId,s.subject,s.clientId,s.resource,1,'grant','afw.dossier-monitoring.v1','11111111-1111-4111-8111-111111111111',T0,s.expiresAt).run();
  const auth=await createDossierMonitoringAuthorization({db:nativeDb,context,projectId:s.projectId,projectionSecret:'z'.repeat(32),now})();
  const original={containerId:'e'.repeat(64),applicationId:p.resources.applicationId,programHash:'d'.repeat(64),sourceRevision:'e'.repeat(40)};
  const scope={accountId:'1'.repeat(32),workerName:'agent-friendly-web-delegated-canary',namespaceId:p.resources.namespaceId,applicationId:p.resources.applicationId,ownerRef:auth.principalRef,projectRef:auth.projectRef,resource:s.resource};
  const candidate={trialId:p.trialId,programHash:s.programHash,sourceRevision,startAt:s.startAt,expiresAt:s.expiresAt,budget:1};
  const plan={scope,original,candidate,namespace:this.env.AFW_DOSSIER_EVENTS_NODE},resolved=resolveSuccessorPreparation(plan);
  const closedAt=T0-500;
  await nativeDb.prepare('INSERT INTO dossier_node_process_admissions VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)').bind('predecessor',s.projectId,s.subject,s.clientId,s.resource,1,T0-2000,s.expiresAt,original.containerId,'a'.repeat(64),original.programHash,original.sourceRevision,'cloudflare/debian-trixie',T0-2000,s.expiresAt).run();
  await nativeDb.prepare('INSERT INTO dossier_node_process_closures VALUES(?,?,?,?,?,?,?)').bind('predecessor','a'.repeat(64),original.containerId,original.programHash,original.sourceRevision,'cloudflare/debian-trixie',closedAt).run();
  const retirement=async()=>({purpose:'afw.retirement-evidence.v1',...original,processGeneration:'a'.repeat(64),closedAt,stoppedAt:closedAt,observedAt:await sqlTime(),physicalStopVerified:true,mayStartSuccessor:false});
  const mutate=async()=>{await nativeDb.prepare('DROP TRIGGER dossier_successor_no_update').run();await nativeDb.prepare("UPDATE dossier_successor_reservations SET scope_hash=?").bind('0'.repeat(64)).run();};
  const db={withSession(){return db;},prepare(sql){
   const base=nativeDb.withSession('first-primary').prepare(sql);
   return {bind(...args){const q=base.bind(...args);return {
    first:()=>q.first(),
    async all(){
     if(sql.includes('finite-prepared-admission')){
      reads++;
      if(mode==='guard-race'&&reads===2)await mutate();
      if(mode==='read-throw')throw Error('SYN primary unavailable');
      if(mode==='read-malformed')return {success:true,results:[]};
     }
     return q.all();
    },
    async run(){
     if(!sql.startsWith('INSERT INTO dossier_node_process_admissions'))return q.run();
     runs++;
     if(['race-reservation','rerun-inserted-zero','rerun-unknown-zero'].includes(mode)&&runs===(mode==='race-reservation'?1:2))await mutate();
     if(mode==='race-consent')await nativeDb.prepare("UPDATE delegated_access_grants SET revoked_at=? WHERE id=?").bind(new Date().toISOString(),s.grantId).run();
     if(mode==='throw')throw Object.assign(Error('SYN knownNoAdmissionFailure'),{code:'known_no_admission',knownNoAdmission:true});
     if(mode==='successfalse')return {success:false,meta:{changes:0}};
     if(mode==='malformed')return {success:true,meta:{}};
     if(mode==='pending'){held=new Promise(resolve=>{release=resolve;});await held;}
     const result=await q.run();
     if(mode==='lostack'||mode==='rerun-unknown-zero'&&runs===1)throw Error('SYN lost admission ACK');
     if(mode==='postinsert')await nativeDb.prepare("UPDATE delegated_access_grants SET revoked_at=? WHERE id=?").bind(new Date().toISOString(),s.grantId).run();
     return result;
    }
   };}};
  }};
  const env={DB:db,AFW_DOSSIER_EVENTS_NODE:this.env.AFW_DOSSIER_EVENTS_NODE,AFW_FINITE_TRIAL_VERSION:{id:p.canaryContainment.runtimeVersionId},
   AFW_DOSSIER_SUCCESSOR_ENABLED:'true',AFW_DOSSIER_PROVIDER_READ_TOKEN:'SYN_not_a_provider_credential',
   AFW_DOSSIER_SUCCESSOR_POLICY:JSON.stringify({scope,original,candidate,publication:{artifactKey:'1'.repeat(64),workerHash:'2'.repeat(64),activationKey:'3'.repeat(64)}}),
   AFW_DOSSIER_EVENTS_ENABLED:'true',AFW_DOSSIER_EVENTS_NODE_NAME:'afw-own-event-first-successor-v1',
   AFW_DOSSIER_EVENTS_POLICY:JSON.stringify(Object.fromEntries(['grantId','subject','projectId','clientId','resource','startAt','expiresAt'].map(k=>[k,s[k]]))),
   AFW_OAUTH_ISSUER:'https://delegated-canary.agentfriendlyweb.dev',AFW_OAUTH_RESOURCE:s.resource,AFW_OAUTH_PILOT_CLIENT_ID:s.clientId,AFW_OAUTH_PILOT_PROJECT_ID:s.projectId,AFW_DOSSIER_EVENTS_PROJECTION_SECRET:'z'.repeat(32)};
  const control={plan:p,planHash:digest(p.purpose,p),controlHash:'1'.repeat(64)};
  const nativeAdmission={ctx,env,program,programSourceRevision:sourceRevision};
  const primary=createFiniteNativePrimaryReader({db,control,now,nativeAdmission});
  const identity=finiteAdmissionIdentity(control);
  const readNominalControl=async()=>{
   const n=nominalFixture(identity,{sourceRevision:p.source.revision,runtimeVersionId:p.deployments.qaLive.versionId,actorId:p.resources.actorId,monitorHash:p.monitorHash,consentExpiresAt:s.expiresAt},now());
   const raw=await ctx.storage.get(HEAD);
   return {...n.value,ownedWriters:['reservation','admission','launch'].filter(k=>raw?.writers[k]).map(kind=>({intentId:p.intentId,controlHash:control.controlHash,actorId:p.resources.containerId,kind,claimHash:finiteHash(raw.writers[kind].claim),phase:raw.writers[kind].settlement===null?'issued':'settled'}))};
  };
  const gateOptions={storage:ctx.storage,identity,readPrimary:{reservation:primary.reservation,admission:primary.admission,launch:primary.launch},readNominalControl,nominalIdentity:{sourceRevision:p.source.revision,runtimeVersionId:p.deployments.qaLive.versionId,actorId:p.resources.actorId,monitorHash:p.monitorHash,consentExpiresAt:s.expiresAt},now,timeoutMs:5000};
  // Baseline has no source helper: omit the optional field for meaningful causal RED.
  const gate=createFiniteAdmissionGate({...gateOptions,...(primary.admissionSource?{admissionSource:primary.admissionSource}:{})});
  const reserve=()=>createSuccessorReservation({db:nativeDb,original,candidate:resolved.candidate,readRetirement:retirement,now}).reserve();
  if(!['missing','reservation-pending','prior-admission','prior-launch','prior-custody'].includes(mode))await reserve();
  if(mode==='wrong-row'){
   await nativeDb.prepare('DROP TRIGGER dossier_successor_no_update').run();
   await nativeDb.prepare('PRAGMA ignore_check_constraints = ON').run();
   await nativeDb.prepare('UPDATE dossier_successor_reservations SET '+field+'=?').bind(value).run();
  }
  if(mode==='reservation-pending')await gate.beginReservation();
  if(mode==='prior-admission')await gate.beginAdmission();
  if(mode==='prior-launch')await gate.beginLaunch();
  if(mode==='prior-custody')await ctx.storage.put('afw.node-process-custody.v1:original',{malformed:true});
  let manifest,key,server,nodeControl,host;
  const container={running:false,
   async start(options){launches++;const boot=JSON.parse(options.env.AFW_NODE_BOOTSTRAP);manifest=boot.manifest;key=Buffer.from(boot.key,'base64');this.running=true;
    const bridge=createPrivateNodeBridge({key,...Object.fromEntries(['containerId','processGeneration','expiresAt'].map(k=>[k,manifest[k]])),now});
    server=createPrivateNodeDispatchHandler({enabled:true,bridge,now,consume:r=>nodeControl.fetch(r),send:async(_url,envelope)=>{callbacks++;const body=JSON.parse(envelope.body);return {status:200,body:body.type==='verification'?JSON.stringify({challenge:body.challenge}):''};}});
   },async setInactivityTimeout(){},async interceptOutboundHttp(_name,v){nodeControl=v;},
   getTcpPort(){return {fetch:async request=>{if(new URL(request.url).pathname==='/ready'){const proof=createNodeReadiness({key,manifest,now}).respond({body:await request.text(),signature:request.headers.get('x-afw-node-signature')});return new Response(proof.body,{headers:{'Content-Type':'application/json','X-AFW-Node-Signature':proof.signature}});}return server(request);}};},
   async destroy(){closes++;this.running=false;}
  };
  const storage=mode.startsWith('rerun-')?{transaction:async fn=>{
   if(rerun)return ctx.storage.transaction(fn);
   try{return await ctx.storage.transaction(async tx=>{const out=await fn(tx);if(runs===1){rerun=true;throw Error('SYN retriable callback abort after insert');}return out;});}
   catch(error){if(!rerun&&runs!==1)throw error;rerun=true;return ctx.storage.transaction(fn);}
  }}:ctx.storage;
  const hostCtx={storage,id:ctx.id,container};
  const config={enabled:true,db,context,projectId:s.projectId,projectionSecret:'z'.repeat(32),custodyKey:Buffer.alloc(32,7),ctx:hostCtx,program,sourceRevision,window:{startAt:s.startAt,expiresAt:s.expiresAt},
   makeControl:async props=>({fetch:r=>host.consume(r,props)}),now,
   successor:{version:'afw.successor-host.v1',plan,readRetirement:retirement,readDeployment:async()=>({scopeHash:resolved.candidate.scopeHash,sourceRevision,programHash:s.programHash,observedAt:await sqlTime()})},
   ...(mode==='ordinary'?{}:{finiteGate:gate})};
  host=createOwnDurableEventHost(config);
  const tables=['site_projects','delegated_access_grants','dossier_monitoring_consent_events','dossier_node_process_admissions','dossier_node_process_closures','dossier_successor_reservations','dossier_successor_launch_claims','dossier_event_subscription_receipts'];
  const snapshot=async()=>({do:[...await ctx.storage.list()],d1:Object.fromEntries(await Promise.all(tables.map(async name=>[name,(await nativeDb.prepare('SELECT * FROM '+name).all()).results])))});
  const before=await snapshot();let error=null,result=null,laterReservation=null,constructed=null;
  if(mode==='historical'){
   offset=p.N1-Date.now()+1;env.AFW_DOSSIER_EVENTS_ENABLED='false';env.AFW_DOSSIER_SUCCESSOR_ENABLED='false';
   await nativeDb.prepare("UPDATE delegated_access_grants SET revoked_at=? WHERE id=?").bind(new Date().toISOString(),s.grantId).run();
   const h=createFiniteOwnNativeCleanupHost({ctx,env,control,sourceRevision:p.canaryContainment.sourceRevision,providerRead:async()=>{throw Error('SYN no provider');},readCustody:async()=>{throw Error('SYN no custody');},readInstance:async()=>{throw Error('SYN no provider');},readNominalControl,nativeCleanup:{program,programSourceRevision:sourceRevision,close:host.close},now});
   constructed={read:await h.gate.read(),seal:await h.gate.seal(),primary:await primary.read()};
   await host.close();
  }else if(['valid','ordinary'].includes(mode)){
   const direct=createNodeProcessCustody({...(mode==='valid'?{finiteGate:gate}:{}),enabled:true,db,context,projectId:s.projectId,projectionSecret:'z'.repeat(32),storage:ctx.storage,custodyKey:Buffer.alloc(32,7),containerId:ctx.id.toString(),programHash:s.programHash,sourceRevision,image:'cloudflare/debian-trixie',window:config.window,now,runtime:{launch:async boot=>{const {key:ignored,...m}=boot;void ignored;manifest=m;launches++;},observe:async()=>({...manifest,running:true}),close:async()=>{closes++;}}});
   try{result=await direct.start();}catch(e){error=e.message;}
  }else{
   try{result=await host.subscribe(params(auth.projectRef));}catch(e){error=e.message;}
  }
  const after=await snapshot();
  if(['missing','reservation-pending'].includes(mode)){try{laterReservation=await reserve();}catch(e){laterReservation={error:e.message};}}
  // Direct custody is an alternate trusted composition; no host suppression logic.
  if(release)release();
  return Response.json({mode,before,after,error,result,laterReservation,constructed,launches,closes,callbacks,reads,runs,rerun});
 }
}
const worker={fetch(request,env){return env.AFW_DOSSIER_EVENTS_NODE.get(env.AFW_DOSSIER_EVENTS_NODE.idFromName('afw-own-event-first-successor-v1')).fetch(request);}};
export default worker;
