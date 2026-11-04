import {continuePrivateQaFiniteOwnerChoice} from './mcp-qa-finite-owner-preparation.mjs';
import {readPrivateQaFiniteOwnerContext} from './mcp-qa-finite-owner-phase-context.mjs';
/** QA-only lexical factual reader. No factory, caller DTO or serialized callback. */
export function preparePrivateQaFiniteOwnerChoice({ctx,env,request},originalLease){
 const readOwnedContext=(parent,preconnectionId)=>readPrivateQaFiniteOwnerContext({ctx,env,parent,...preconnectionId===null?{}:{preconnectionId}});
 return continuePrivateQaFiniteOwnerChoice({ctx,env,request},originalLease,readOwnedContext);
}
