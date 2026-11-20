import {finiteInitialCustodyAt} from './mcp-qa-finite-initial-custody-profile.mjs';
export {qualifyFiniteSourcePackage,qualifyFiniteSourceRoleMetadata} from './mcp-qa-finite-profile.mjs';
const unavailable=()=>{throw Error('Finite source authority unavailable');};

// Source-approved expectation only. The bridge separately verifies the
// credential actually loaded by QA at the fixed account endpoint.
export function readFiniteNativeCustody(...args){
 if(args.length)unavailable();
 const at=Date.now(),profile=finiteInitialCustodyAt(at),{reader}=profile;
 if(!Number.isSafeInteger(reader.expiresAt)||reader.expiresAt<=at||profile.endAt>reader.expiresAt)unavailable();
 return Object.freeze({id:reader.id,tokenKind:'account',expiresAt:reader.expiresAt});
}

// The actual candidate profile and its private bindings still need native
// qualification before the bridge can accept an observation.
export const qualifyFiniteNativeSourceContext=unavailable;
