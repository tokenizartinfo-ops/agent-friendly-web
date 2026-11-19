/** Closed entry has no native material producer. The QA-only graph installs
 * its fixed read-only constructor once, before handling any invocation. */
let source;
const unavailable=()=>{throw Error('Finite launch source unavailable');};
export function installPrivateQaFiniteLaunchSource(value){
 if(source||typeof value?.resolve!=='function'||typeof value?.read!=='function')unavailable();
 const readOperations=value.readOperations;
 if(readOperations!==undefined&&typeof readOperations!=='function')unavailable();
 source=Object.freeze({resolve:value.resolve,read:value.read,readOperations});
}
export function resolvePrivateQaFiniteLaunchContext(input){if(!source)unavailable();return source.resolve(input);}
export function readPrivateQaFiniteLaunchMaterial(input){if(!source)unavailable();return source.read(input);}

/** The fixed primary effect producer and guard remain a separate qualification.
 * Prospective plan evidence cannot stand in for that authority. */
// The bootstrap Workflow is a write. Do not schedule it before the same QA
// build has a fixed operation producer for the launcher it would invoke.
export function assertPrivateQaFiniteLaunchDispatchWired(){
 if(typeof source?.readOperations!=='function')unavailable();
}
export function readPrivateQaFiniteLaunchOperations(input){
 assertPrivateQaFiniteLaunchDispatchWired();
 return source.readOperations(input);
}
