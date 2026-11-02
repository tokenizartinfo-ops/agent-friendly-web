import {initialFields as fields,initialOwn as own,initialCanonical as canonical,initialHash as hash,initialHex as hex,initialInstanceId} from './mcp-qa-finite-initial-material-records.mjs';
const PURPOSE='afw.finite-initial-entry.v1',CEILING=Date.parse('2026-11-03T02:59:00Z');
const KEYS=['purpose','commandId','commandHash','sourceRevision','sourceTree','qaVersionId','initialInstanceId','workflowName','createdAt','I0','initialDeadline','operationDeadline'];
const fail=()=>{throw Error('Finite initial entry unavailable');};
const time=x=>Number.isSafeInteger(x)&&x>=0&&x<=8640000000000000;
function validate(input,complete){
 const v=own(fields(input,[...KEYS,...complete?['entryHash']:[]]));
 if(v.purpose!==PURPOSE||!Number.isSafeInteger(v.commandId)||v.commandId<1||!hex(v.commandHash)||!hex(v.sourceRevision,40)||!hex(v.sourceTree,40)||v.initialInstanceId!==initialInstanceId(v)||v.workflowName!=='afw-own-qa-private-bootstrap'||!['createdAt','I0','initialDeadline','operationDeadline'].every(k=>time(v[k]))||v.createdAt<v.I0||v.initialDeadline!==v.I0+300000||v.operationDeadline!==Math.min(v.initialDeadline,v.createdAt+30000,CEILING)||v.operationDeadline<=v.createdAt||Buffer.byteLength(canonical(v))>4096)fail();
 if(complete&&(!hex(v.entryHash)||v.entryHash!==hash(PURPOSE,Object.fromEntries(KEYS.map(k=>[k,v[k]])))))fail();return v;
}
export function hashFiniteInitialEntry(value){return hash(PURPOSE,validate(value,false));}
export function encodeFiniteInitialEntry(value){return canonical(validate(value,true));}
export function decodeFiniteInitialEntry(raw){if(typeof raw!=='string'||Buffer.byteLength(raw)>4096)fail();const v=validate(JSON.parse(raw),true);if(canonical(v)!==raw)fail();return v;}
