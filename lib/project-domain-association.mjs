import {normalizePublicUrl} from './methodology.mjs';

/** @typedef {{state:'available'|'current'|'own_other'|'other',origin:string,projectId?:string}} DomainAssociation */
const safeId=value=>typeof value==='string'&&/^[a-zA-Z0-9][a-zA-Z0-9_-]{0,127}$/.test(value);

/** Read-only navigation guidance; registry ownership and dossier authorization remain unchanged. */
export async function projectDomainAssociation(project,userId,site,findOwnedProject){
 if(!project||!userId||project.userId!==userId)throw Error('invalid_context');
 const origin=new URL(project.website).origin;
 if(!site)return {state:'available',origin};
 if(site.hostname!==new URL(origin).hostname)return {state:'other',origin};
 if(site.projectId===project.id&&site.userId===userId)return {state:'current',origin};
 if(site.userId===userId&&safeId(site.projectId)){
  const linked=await findOwnedProject(site.projectId,userId);
  try{if(linked?.id===site.projectId&&linked.userId===userId&&new URL(linked.website).hostname===new URL(origin).hostname)return {state:'own_other',origin,projectId:site.projectId};}catch{/* A stale association is not a continuation reference. */}
 }
 return {state:'other',origin};
}

/** @returns {DomainAssociation|null} */
export function normalizeDomainAssociation(value){
 if(value===undefined||value===null)return null;
 const invalid=()=>{throw Error('invalid_domain_association');};
 if(typeof value!=='object'||Array.isArray(value)||!['available','current','own_other','other'].includes(value.state))return invalid();
 const keys=value.state==='own_other'?['origin','projectId','state']:['origin','state'];
 if(JSON.stringify(Object.keys(value).sort())!==JSON.stringify(keys))return invalid();
 try{if(typeof value.origin!=='string'||new URL(normalizePublicUrl(value.origin)).origin!==value.origin)return invalid();}catch{return invalid();}
 if(value.state==='own_other'&&!safeId(value.projectId))return invalid();
 return {state:value.state,origin:value.origin,...(value.state==='own_other'?{projectId:value.projectId}:{})};
}
