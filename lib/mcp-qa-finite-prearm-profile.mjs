import {finiteFields as fields,finiteData as data} from './mcp-finite-evidence.mjs';
import {qualifyFiniteConnectionProfile} from './mcp-qa-finite-connection-profile.mjs';

const fail=()=>{throw Error('Finite prearm configuration unavailable');};
const canonical=v=>JSON.stringify(v,(_,x)=>x&&typeof x==='object'&&!Array.isArray(x)?Object.fromEntries(Object.entries(x).sort(([a],[b])=>a<b?-1:a>b?1:0)):x);

/** Exact detached DATA equality only. The fixed source must independently
 * anchor originalConfiguration to the original plan and resident evidence. */
export function qualifyFinitePrearmConfiguration(input){
 const {metadata,originalConfiguration}=fields(data(input),['metadata','originalConfiguration']);
 const actual=qualifyFiniteConnectionProfile({phase:'closed_ui',metadata});
 const original=qualifyFiniteConnectionProfile({phase:'closed_ui',metadata:originalConfiguration});
 if(canonical(actual)!==canonical(original))fail();
 return actual;
}
