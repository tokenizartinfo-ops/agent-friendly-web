import {syntheticMaterial} from './finite-policy-setup-facts-source.mjs';
// SYNTHETIC original GitHub seed primary; actual setup facts reader is intact.
export async function readFiniteMaterialSeed({intentId,sourceRevision,signal}){if(signal.aborted)throw Error('SYNTHETIC seed aborted');const value=syntheticMaterial();if(value.seed.intentId!==intentId||value.seed.sourceRevision!==sourceRevision)throw Error('SYNTHETIC seed mismatch');return value;}
