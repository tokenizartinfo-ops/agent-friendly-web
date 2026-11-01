export function finiteGateFixture(atValue=1000){
 let at=atValue,alarm=null,chain=Promise.resolve(),lost=false;
 const rows=new Map();
 const storage={get:async k=>structuredClone(rows.get(k)),transaction(fn){const work=chain.then(async()=>{const copy=new Map(rows);const result=await fn({get:async k=>structuredClone(copy.get(k)),put:async(k,v)=>copy.set(k,structuredClone(v)),list:async({prefix})=>new Map([...copy].filter(([k])=>k.startsWith(prefix))),setAlarm:async v=>{alarm=v;}});rows.clear();for(const [k,v]of copy)rows.set(k,v);if(lost){lost=false;throw Error('lost ACK');}return result;});chain=work.catch(()=>{});return work;}};
 const identity={intentId:'finite-1',controlHash:'1'.repeat(64),planHash:'2'.repeat(64),containerId:'3'.repeat(64),applicationId:'11111111-1111-4111-8111-111111111111',grantHash:'4'.repeat(64),trialId:'5'.repeat(64),sourceRevision:'6'.repeat(40),runtimeVersionId:'22222222-2222-4222-8222-222222222222',T0:at,N1:at+300000,C1:at+420000};
 const primary={reservation:async()=>null,admission:async()=>null,launch:async()=>null};
 const options={storage,identity,readPrimary:primary,now:()=>at,timeoutMs:1000};
 return {options,identity,primary,rows,setTime:v=>{at=v;},lose:()=>{lost=true;},get alarm(){return alarm;}};
}
