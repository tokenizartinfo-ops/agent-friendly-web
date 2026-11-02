// Fail-closed behavioral RED shell; no authority or publication capability.
const unavailable=()=>{throw Error('Finite owner preparation unavailable');};
export const readFiniteOwnerPreparation=unavailable;
export const recordFinitePreparationGrant=unavailable;
export const recordFinitePreparationNotice=unavailable;
export const recordFinitePreparationAuthorization=unavailable;
