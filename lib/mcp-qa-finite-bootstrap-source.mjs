// QA-only compiler literals. No caller/env registration or identity authority.
const compiled=globalThis.__AFW_FINITE_BOOTSTRAP_SOURCE__??null;
const fail=()=>{throw Error('Finite QA bootstrap source unavailable');};
function validate(v){
 if(!v||Object.getPrototypeOf(v)!==Object.prototype||Object.keys(v).sort().join(',')!=='cliHash,sourceRevision,sourceTree,workflowHash'||!['sourceRevision','sourceTree'].every(k=>typeof v[k]==='string'&&/^[a-f0-9]{40}$/.test(v[k]))||!['workflowHash','cliHash'].every(k=>typeof v[k]==='string'&&/^[a-f0-9]{64}$/.test(v[k])))fail();
 return Object.freeze({...v});
}
// Eager validation keeps literal residency in QA without mounting the reader.
const resident=compiled===null?null:validate(compiled);
export function readFiniteQaBootstrapSourceExpectations(...args){if(args.length||!resident)fail();return resident;}
