import {createHash} from 'node:crypto';
import {finiteFields as fields,finiteTime as time} from './mcp-finite-evidence.mjs';

const fail=()=>{throw Error('Finite monitor grant evidence unavailable');};
const keys=['action','clientId','expiresAt','grantId','issuedAt','projectId','purpose','requestId','revision','sequence','subject','resource'].sort();
const id=v=>typeof v==='string'&&v.length>0&&v.length<=200&&!/[\u0000-\u001f\u007f]/.test(v);
const positive=v=>Number.isSafeInteger(v)&&v>0;
export const finiteNoticeRequestId=v=>typeof v==='string'&&/^[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}$/.test(v);

export function hashFiniteMonitorGrantEvidence(value){
 const event=fields(value,keys);
 if(!['grantId','projectId','subject','clientId','resource'].every(k=>id(event[k]))||
    !positive(event.revision)||!positive(event.sequence)||event.action!=='grant'||event.purpose!=='afw.dossier-monitoring.v1'||
    !finiteNoticeRequestId(event.requestId)||!time(event.issuedAt)||!time(event.expiresAt)||
    event.issuedAt>=event.expiresAt||event.expiresAt-event.issuedAt>600000)fail();
 return createHash('sha256').update('afw.finite-monitor-consent-event.v1\n'+JSON.stringify(event)).digest('hex');
}
