import {continuePrivateQaFiniteOwnerChoice} from './mcp-qa-finite-owner-preparation.mjs';
import {readPrivateQaFiniteInitialOwnerSource} from './mcp-qa-finite-initial-owner-source.mjs';
/** QA-only lexical factual reader. No factory, caller DTO or serialized callback. */
export function preparePrivateQaFiniteOwnerChoice({ctx,env,request},originalLease){
 const readOwnedContext=(parent,preconnectionId)=>readPrivateQaFiniteInitialOwnerSource({ctx,env,parent,...preconnectionId===null?{}:{preconnectionId}});
 return continuePrivateQaFiniteOwnerChoice({ctx,env,request},originalLease,readOwnedContext);
}
