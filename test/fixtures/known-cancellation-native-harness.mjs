// CI-only observation/fault seam around the ACTUAL compiled production wrapper.
// Native event/payload/identity are forwarded unchanged; no authority is injected.
// All SQL delegates to isolated real D1. Custody/provider responses are synthetic.
export async function seedKnownCancellationFault(db,fault,fixture,retired){
 const id=fixture.events.grantId;
 if(fault==='expired-current')await db.prepare("UPDATE delegated_access_grants SET expires_at='2000-01-01T00:00:00.000Z' WHERE id=?").bind(id).run();
 if(fault==='identity-mismatch')await db.prepare("UPDATE delegated_access_grants SET user_id='synthetic_foreign' WHERE id=?").bind(id).run();
 if(fault==='extra-cancellation'){
  await db.prepare("INSERT INTO delegated_access_grants SELECT 'unknown',user_id,client_id,project_id,resource,scopes_json,created_at,expires_at,revoked_at,exchanged_at FROM delegated_access_grants WHERE id='fixture-cancelled'").run();
  await db.prepare('INSERT INTO dossier_node_process_closures VALUES(?,?,?,?,?,?,?)').bind('unknown',null,'7'.repeat(64),retired.programHash,retired.sourceRevision,retired.image,retired.closedAt).run();
 }
}
export function knownCancellationNativeHarness({fault,policyExpiresAt,grantId}){
 return `
const __knownNativeRun=AfwReleaseWorkflow.prototype.run;
AfwReleaseWorkflow.prototype.run=async function(event,step){
 const fault=${JSON.stringify(fault)},policyExpiresAt=${policyExpiresAt},grantId=${JSON.stringify(grantId)};
 const realNow=Date.now,originalFetch=globalThis.fetch,started=performance.now();
 const eventAt=event.timestamp.getTime(),originalEnd=Math.min(policyExpiresAt,eventAt+70000);
 const measurement={nativeDate:event.timestamp instanceof Date,workflowName:event.workflowName,
  payloadKeys:Object.keys(event.payload),identityMatches:event.instanceId==='afw-release-'+event.payload.planHash,
  projectionReads:0,projectionMs:0,eligibilityChecks:0,eligibilityMs:0,providerReads:0,providerMs:0,rpcReads:0,rpcMs:0};
 globalThis.__knownStageWitness=[];globalThis.__knownHookMs=0;
 const forward=(target,overrides={})=>{
  const methods=new Map();
  return new Proxy(target,{get(value,key){
   if(Object.hasOwn(overrides,key))return overrides[key];
   const result=Reflect.get(value,key,value);
   if(typeof result!=='function')return result;
   if(!methods.has(key))methods.set(key,result.bind(value));
   return methods.get(key);
  }});
 };
 const originalEnv=this.env,db=originalEnv.RELEASE_DB;
 const revoke=()=>db.prepare("UPDATE delegated_access_grants SET revoked_at=? WHERE id=?").bind(new Date(realNow()).toISOString(),grantId).run();
 const statement=(value,sql,params=[])=>forward(value,{
  bind:(...args)=>statement(value.bind(...args),sql,args),
  all:async()=>{
   const begin=performance.now(),result=await value.all();
   if(sql.startsWith('SELECT a.grant_id')||sql.includes('LIMIT 9')||sql.includes('WHERE g.id=? LIMIT 2')){
    measurement.projectionReads++;measurement.projectionMs+=performance.now()-begin;
    if(fault==='projection-deadline')Date.now=()=>originalEnd+1;
   }
   return result;
  },
  first:async(...args)=>{
   const begin=performance.now(),result=await value.first(...args);
   if(sql.startsWith('SELECT 1 AS eligible')){measurement.eligibilityChecks++;measurement.eligibilityMs+=performance.now()-begin;}
   return result;
  },
  run:async()=>{
   const reservation=sql.startsWith('INSERT INTO dossier_successor_reservations ');
   if(reservation&&fault==='revoke-prewrite')await revoke();
   if(reservation&&fault==='foreign-reservation-race'){
    const foreign=[...params];foreign[1]='0'.repeat(64);foreign[10]='1'.repeat(64);
    await db.withSession('first-primary').prepare(sql).bind(...foreign).run();
   }
   const result=await value.run();
   if(reservation&&fault==='revoke-postwrite')await revoke();
   return result;
  }
 });
 const session=value=>forward(value,{prepare:sql=>statement(value.prepare(sql),sql)});
 const wrappedDb=forward(db,{prepare:sql=>statement(db.prepare(sql),sql),withSession:(...args)=>session(db.withSession(...args))});
 const node=originalEnv.AFW_RELEASE_EVENTS_NODE;
 const wrappedNode=forward(node,{get:(...args)=>{
  const target=node.get(...args);return forward(target,{observeRetiredReceipt:async challenge=>{
   const begin=performance.now();try{return await target.observeRetiredReceipt(challenge);}
   finally{measurement.rpcReads++;measurement.rpcMs+=performance.now()-begin;}
  }});
 }});
 const env=forward(originalEnv,{RELEASE_DB:wrappedDb,AFW_RELEASE_EVENTS_NODE:wrappedNode});
 globalThis.fetch=async(...args)=>{
  const begin=performance.now();try{return await originalFetch(...args);}
  finally{measurement.providerReads++;measurement.providerMs+=performance.now()-begin;}
 };
 let outerStep=step;
 if(fault==='outer-settlement')outerStep=forward(step,{do:async(...args)=>{const result=await step.do(...args);Date.now=()=>originalEnd+1;return result;}});
 if(fault==='queue-expired')Date.now=()=>eventAt+70001;
 try{
  const result=await __knownNativeRun.call({env},event,outerStep);
  const stageInvocations=[...globalThis.__knownStageWitness];
  return {...result,qualification:{...measurement,stageInvocations,hookMs:stageInvocations.length?globalThis.__knownHookMs:null,uniqueStages:[...new Set(stageInvocations)].sort(),
   elapsedMs:performance.now()-started,remainingOriginalMs:originalEnd-Date.now()}};
 }finally{Date.now=realNow;globalThis.fetch=originalFetch;delete globalThis.__knownStageWitness;delete globalThis.__knownHookMs;}
};
`;
}
