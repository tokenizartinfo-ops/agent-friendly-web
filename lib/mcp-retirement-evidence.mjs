const fail=()=>{throw Error('Retirement evidence unavailable');};
const sha=value=>typeof value==='string'&&/^[0-9a-f]{64}$/.test(value);
const time=value=>Number.isSafeInteger(value)&&value>=0&&value<=8640000000000000;
function exact(value,keys){
 if(!value||Object.getPrototypeOf(value)!==Object.prototype)fail();
 const d=Object.getOwnPropertyDescriptors(value),names=Reflect.ownKeys(d);
 if(names.length!==keys.length||names.some(k=>typeof k!=='string'||!keys.includes(k)||!Object.hasOwn(d[k],'value')||!d[k].enumerable))fail();
 return Object.fromEntries(keys.map(k=>[k,d[k].value]));
}
function date(value){
 if(typeof value!=='string'||!/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d\.\d{3}Z$/.test(value))fail();
 const n=Date.parse(value);if(!time(n)||new Date(n).toISOString()!==value)fail();return n;
}
/** INTERNAL only. Both readers must be server-owned and scoped to the original
 * account/application/actor. Caller-supplied JSON is not trusted provenance.
 * No endpoint, cloud API credentials, mutation or successor authority here. */
export function createRetirementEvidenceReader({original,readCustody,readCustodyReceipt,readInstance,now=Date.now,timeoutMs=5000}={}){
 const pins=Object.freeze(exact(original,['containerId','applicationId','programHash','sourceRevision']));
 if(!sha(pins.containerId)||!sha(pins.programHash)||typeof pins.sourceRevision!=='string'||!/^[0-9a-f]{40}$/.test(pins.sourceRevision)||typeof pins.applicationId!=='string'||!/^[a-zA-Z0-9-]{1,200}$/.test(pins.applicationId)||((typeof readCustody==='function')===(typeof readCustodyReceipt==='function'))||(readCustody!==undefined&&typeof readCustody!=='function')||(readCustodyReceipt!==undefined&&typeof readCustodyReceipt!=='function')||typeof readInstance!=='function'||typeof now!=='function'||!Number.isSafeInteger(timeoutMs)||timeoutMs<1||timeoutMs>5000)fail();
 const keys=['purpose','containerId','processGeneration','programHash','sourceRevision','image','createdAt','expiresAt','closedAt','observedAt','physicalStopVerified','mayStartSuccessor'];
 return Object.freeze({async observe({signal,assertCurrent=()=>{}}={}){
  if((signal!==undefined&&!(signal instanceof AbortSignal))||signal?.aborted||typeof assertCurrent!=='function')fail();
  const abort=new AbortController(),deadline=performance.now()+timeoutMs;let last=-1,timer,startedAt=-1,rejectCancel;
  const cancel=()=>{abort.abort();rejectCancel?.(Error('Retirement evidence unavailable'));};
  const clock=()=>{const check=assertCurrent();if(check!==undefined&&typeof check!=='number')fail();const n=now();if(signal?.aborted||abort.signal.aborted||performance.now()>=deadline||!time(n)||n<last)fail();last=n;return n;};
  const custody=async()=>{
   clock();let r,n;
   if(readCustodyReceipt){
    // Trusted fixed-target adapter must return the qualified helper's snapshot,
    // never caller JSON. Its native result has already been released.
    const packet=exact(await readCustodyReceipt({signal:abort.signal},clock),['observation','local']);
    const local=exact(packet.local,['sentAt','receivedAt']);r=exact(packet.observation,keys);n=clock();
    if(!time(local.sentAt)||!time(local.receivedAt)||local.sentAt<startedAt||local.receivedAt<local.sentAt||local.receivedAt>n||n-local.sentAt>30000)fail();
   }else{
    r=exact(await readCustody({signal:abort.signal},clock),keys);n=clock();
    if(r.observedAt>n||n-r.observedAt>30000)fail();
   }
   if(r.purpose!=='afw.node-retirement-observation.v1'||['containerId','programHash','sourceRevision'].some(k=>r[k]!==pins[k])||!sha(r.processGeneration)||r.image!=='cloudflare/debian-trixie'||r.physicalStopVerified!==false||r.mayStartSuccessor!==false||['createdAt','expiresAt','closedAt','observedAt'].some(k=>!time(r[k]))||r.expiresAt<=r.createdAt||r.expiresAt-r.createdAt>600000||r.closedAt<r.createdAt||r.closedAt>r.observedAt||r.closedAt>n)fail();
   return r;
  };
  const instance=async r=>{
   clock();const v=await readInstance({containerId:pins.containerId,applicationId:pins.applicationId,signal:abort.signal},clock),n=clock();
   if(!v||v.id!==pins.containerId||v.application_id!==pins.applicationId||v.image!==r.image||v.status?.state!=='stopped'||v.status.exit_code!==0)fail();
   const startedAt=date(v.started_at),stoppedAt=date(v.status.updated_at);
   if(startedAt<r.createdAt||startedAt>=r.expiresAt||stoppedAt<startedAt||stoppedAt>n)fail();
   return {startedAt,stoppedAt};
  };
  const work=async()=>{
   startedAt=clock();const a=await custody(),p=await instance(a),b=await custody(),q=await instance(b);
   const stable=r=>Object.fromEntries(keys.filter(k=>k!=='observedAt').map(k=>[k,r[k]]));
   const observedAt=clock();if(JSON.stringify(stable(a))!==JSON.stringify(stable(b))||JSON.stringify(p)!==JSON.stringify(q)||(!readCustodyReceipt&&(observedAt-a.observedAt>30000||observedAt-b.observedAt>30000)))fail();
   return Object.freeze({purpose:'afw.retirement-evidence.v1',...pins,processGeneration:a.processGeneration,closedAt:a.closedAt,stoppedAt:p.stoppedAt,observedAt,physicalStopVerified:true,mayStartSuccessor:false});
  };
  try{
   const cancelled=new Promise((_,reject)=>{rejectCancel=reject;});signal?.addEventListener('abort',cancel,{once:true});
   return await Promise.race([work(),cancelled,new Promise((_,reject)=>{timer=setTimeout(()=>{abort.abort();reject(Error('Retirement evidence unavailable'));},timeoutMs);})]);
  }catch{fail();}finally{clearTimeout(timer);signal?.removeEventListener('abort',cancel);abort.abort();}
 }});
}
