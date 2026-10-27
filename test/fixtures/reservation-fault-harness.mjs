// CI-only wrapper around the compiled native Workflow. Never imported by
// production. Native D1 statements commit before the synthetic lost ACK.
const faults=new Set(['reservation-ack-lost','reservation-flag-drift','reservation-db-drift','reservation-namespace-drift']);
export function reservationFaultHarness(fault){
 if(!faults.has(fault))throw Error('Unknown reservation fault');
 return `
const __afwReservationNativeRun=AfwReleaseWorkflow.prototype.run;
AfwReleaseWorkflow.prototype.run=async function(event,step){
 const fault=${JSON.stringify(fault)},originalEnv=this.env,originalFetch=globalThis.fetch;
 let changed=false,instanceReads=0;
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
 const statement=(value,sql)=>forward(value,{
  bind:(...args)=>statement(value.bind(...args),sql),
  run:async()=>{
   const result=await value.run();
   if(fault==='reservation-ack-lost'&&sql.startsWith('INSERT INTO dossier_successor_reservations '))throw Error('synthetic_reservation_ack_lost');
   return result;
  }
 });
 const session=value=>forward(value,{prepare:sql=>statement(value.prepare(sql),sql)});
 const db=originalEnv.RELEASE_DB;
 const wrappedDb=forward(db,{prepare:sql=>statement(db.prepare(sql),sql),withSession:(...args)=>session(db.withSession(...args))});
 const replacementDb=forward(db),replacementNamespace=forward(originalEnv.AFW_RELEASE_EVENTS_NODE);
 const env=new Proxy(originalEnv,{get(target,key){
  if(key==='RELEASE_DB')return changed&&fault==='reservation-db-drift'?replacementDb:wrappedDb;
  if(changed&&fault==='reservation-flag-drift'&&key==='AFW_RELEASE_RESERVATION_WORKFLOW_ENABLED')return 'false';
  if(changed&&fault==='reservation-namespace-drift'&&key==='AFW_RELEASE_EVENTS_NODE')return replacementNamespace;
  return Reflect.get(target,key,target);
 }});
 globalThis.fetch=async(...args)=>{
  const result=await originalFetch(...args);
  if(String(args[0]).includes('/instances/')&&++instanceReads===1)changed=true;
  return result;
 };
 try{return await __afwReservationNativeRun.call({env},event,step);}
 finally{globalThis.fetch=originalFetch;}
};
`;
}
