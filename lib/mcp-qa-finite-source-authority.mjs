export {qualifyFiniteSourcePackage,qualifyFiniteSourceRoleMetadata} from './mcp-qa-finite-profile.mjs';
// Native5/4C2/4C3 require actual source constructors, native identity and custody.
// No registration/caller pins/boolean success escape.
const unavailable=()=>{throw Error('Finite source authority unavailable');};
export const qualifyFiniteNativeSourceContext=unavailable;
export const readFiniteNativeCustody=unavailable;
