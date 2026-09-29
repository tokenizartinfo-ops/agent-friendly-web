/** Reload a saved private snapshot without triggering a new public audit or D1 write. */
export async function readObservationSnapshot(projectId,transport=fetch,signal){
 const response=await transport(`/api/projects/${encodeURIComponent(projectId)}/observations`,
  {method:'GET',cache:'no-store',redirect:'error',signal});
 if(!response.ok)throw new Error('observation_read_unavailable');
 let payload;
 try{payload=await response.json();}catch{throw new Error('observation_read_unavailable');}
 if(!payload||typeof payload!=='object'||!Array.isArray(payload.history))throw new Error('observation_read_unavailable');
 return {observation:payload.observation||null,history:payload.history};
}
