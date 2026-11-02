import {createFinitePolicyTransport} from './mcp-qa-finite-policy-transport.mjs';
// Explicit final-producer RED shell; publishes no owner selection.
export function createFiniteConnectionPreparation({ctx,env}){
 return Object.freeze({async run(refs,lease){const result=await createFinitePolicyTransport({ctx,env}).run(refs,lease);return result.outcome;}});
}
