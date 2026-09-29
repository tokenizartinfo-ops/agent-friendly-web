/** The key survives an uncertain response in this tab, but a confirmed save starts a new audit. */
export function createObservationSaveAttempt(){
 let current=null;
 return {
  prepare(projectId,website){
   if(!current||current.projectId!==projectId||current.website!==website)
    current={projectId,website,key:crypto.randomUUID()};
   return {key:current.key,request:{method:'POST',headers:{'content-type':'application/json','idempotency-key':current.key},body:JSON.stringify({confirmSave:true})}};
  },
  confirmed(key){if(current?.key===key)current=null;},
 };
}

export async function observationRequestIds(userId,projectId,key){
 const bytes=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(JSON.stringify(['scan-observation-v1',userId,projectId,key])));
 const fingerprint=Array.from(new Uint8Array(bytes),byte=>byte.toString(16).padStart(2,'0')).join('');
 return {observationId:`observation-${fingerprint}`,eventId:`observation-event-${fingerprint}`};
}
