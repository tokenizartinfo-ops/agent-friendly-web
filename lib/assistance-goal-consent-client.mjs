const version='afw.assistance-goals-consent.v1';
export function createGoalConsentAttempt(){
 let pending;
 return {
  prepare({action,sourceId,revision,stateVersion}){
   if(!['grant','revoke'].includes(action)||!/^help-[a-f0-9]{64}$/.test(sourceId)||!Number.isSafeInteger(revision)||revision<1||!/^[a-f0-9]{64}$/.test(stateVersion))throw new Error('Invalid consent intent');
   const intent=JSON.stringify({action,sourceId,expectedRevision:revision,consentVersion:version,stateVersion});
   if(pending&&pending.intent!==intent)throw new Error('Pending consent intent');
   if(!pending)pending={intent,body:JSON.stringify({...JSON.parse(intent),requestId:crypto.randomUUID()})};
   return {body:pending.body};
  },
  confirm(){pending=undefined;},
  retry(){if(!pending)throw new Error('No pending consent intent');return {body:pending.body};},
 };
}
export async function readGoalConsentResponse(response){
 if(!response.ok)throw Object.assign(new Error('Consent response unavailable'),{status:response.status});
 if(response.headers.get('content-type')?.split(';')[0].trim()!=='application/json')throw new Error('Consent response unavailable');
 const reader=response.body?.getReader();if(!reader)throw new Error('Consent response unavailable');
 let timer,size=0;const chunks=[];
 const deadline=new Promise((_,reject)=>{timer=setTimeout(()=>reject(new Error('Consent response timeout')),3000);});
 try{
  while(true){const part=await Promise.race([reader.read(),deadline]);if(part.done)break;size+=part.value.byteLength;if(size>512)throw new Error('Consent response too large');chunks.push(part.value);}
  const bytes=new Uint8Array(size);let offset=0;for(const chunk of chunks){bytes.set(chunk,offset);offset+=chunk.byteLength;}
  const state=JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(bytes));
  const keys=['granted','issuedAt','expiresAt','stateVersion'];
  if(!state||Array.isArray(state)||Object.keys(state).length!==4||!keys.every(key=>Object.hasOwn(state,key))||typeof state.granted!=='boolean'||typeof state.stateVersion!=='string'||!/^[a-f0-9]{64}$/.test(state.stateVersion))throw new Error('Invalid consent response');
  const empty=state.issuedAt===null&&state.expiresAt===null;
  const dated=Number.isSafeInteger(state.issuedAt)&&state.issuedAt>=0&&Number.isSafeInteger(state.expiresAt)&&Number.isFinite(new Date(state.issuedAt).getTime())&&Number.isFinite(new Date(state.expiresAt).getTime())&&state.expiresAt>=state.issuedAt&&state.expiresAt-state.issuedAt<=600000;
  if(state.granted?(!dated||state.expiresAt===state.issuedAt):(!empty&&!dated))throw new Error('Invalid consent dates');
  return state;
 }finally{clearTimeout(timer);void reader.cancel().catch(()=>{});}
}
