import {exact,validateOccurrenceApproval,validateOccurrenceManifest} from './assistance-occurrence-approvals.mjs';
const fields=['occurrenceId','requestId','signal','sourceRevision','configId','publicationId','startAt','deadline','tokenExpiresAt','serverDeadline'];
/** Pure metadata digest. Identical historical recipe; no clock, IO or credentials. */
export async function computeOccurrencePlanDigest(input){
 const contract=input?.admissionContract??'cloud-v1',server=contract==='server-v1';
 if(!['cloud-v1','server-v1'].includes(contract)||!(server?exact(input,['manifest','identityRef','admissionContract','approval']):exact(input,['manifest','identityRef'])||exact(input,['manifest','identityRef','admissionContract']))||typeof input.identityRef!=='string'||!/^[0-9a-f]{64}$/.test(input.identityRef))throw Error('Invalid occurrence digest');
 const m=validateOccurrenceManifest(input.manifest),a=server?validateOccurrenceApproval(input.approval):null;
 if(server&&(a.identityRef!==input.identityRef||!fields.every(k=>k==='signal'?Object.keys(m.signal).every(p=>m.signal[p]===a.manifest.signal[p]):m[k]===a.manifest[k])))throw Error('Invalid occurrence digest');
 const values=[...fields.map(k=>k==='signal'?Object.values(m.signal):m[k]),input.identityRef,...(server?['afw-server-admission-v1',a.enrollmentRef,a.serverConfigVersion,a.planRevision]:[])];
 return Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(JSON.stringify(values)))),x=>x.toString(16).padStart(2,'0')).join('');
}
