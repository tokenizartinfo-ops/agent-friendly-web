/** Closed entry has no native material producer. The QA-only graph installs
 * its fixed read-only constructor once, before handling any invocation. */
let source;
const unavailable=()=>{throw Error('Finite launch source unavailable');};
export function installPrivateQaFiniteLaunchSource(value){
 if(source||typeof value?.resolve!=='function'||typeof value?.read!=='function')unavailable();
 source=Object.freeze({resolve:value.resolve,read:value.read});
}
export function resolvePrivateQaFiniteLaunchContext(input){if(!source)unavailable();return source.resolve(input);}
export function readPrivateQaFiniteLaunchMaterial(input){if(!source)unavailable();return source.read(input);}

/** The fixed primary effect producer and guard remain a separate qualification.
 * Prospective plan evidence cannot stand in for that authority. */
export const readPrivateQaFiniteLaunchOperations=unavailable;
