// Fixed source boundary. T3/T5 must qualify actual source, binding holders,
// current QA version, initial baseline and stage chain. No registration or DTO authority.
const unavailable=()=>{throw Error('Finite owner source unavailable');};
export const readPrivateQaFiniteOwnerSource=unavailable;

// T5 must qualify the fixed native sender/QA binding, overwrite transport metadata
// and propagate the ORIGINAL request deadline/abort. These are not generic RPCs.
export const forwardPrivateQaFiniteOwnerAuthorization=unavailable;
export const forwardPrivateQaFiniteOwnerGrant=unavailable;
export const forwardPrivateQaFiniteOwnerNotice=unavailable;
