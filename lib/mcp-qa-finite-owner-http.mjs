import {createFiniteOwnerRequestLease} from './mcp-qa-finite-owner-preparation.mjs';
import {observeFiniteOwnerRequestWork} from './mcp-qa-finite-stage-work.mjs';
const headers={'Cache-Control':'no-store','Content-Type':'text/html; charset=utf-8','Referrer-Policy':'no-referrer','X-Content-Type-Options':'nosniff','Content-Security-Policy':"default-src 'none'; form-action 'none'; frame-ancestors 'none'; base-uri 'none'"};
const pending='<h1>Preparación pendiente</h1><p>Esta preparación todavía no está disponible.</p>';
/** UNMOUNTED. Cleanup handoff requires separate qualification before any choice,
 * ticket consumption or provider publication can be exposed on this host. */
export function createFiniteOwnerPreparationHost({ctx,env}){
 return Object.freeze({async fetch(request){
  const parent=createFiniteOwnerRequestLease(request);
  try{return await observeFiniteOwnerRequestWork({ctx,env,originalLease:parent.lease},async()=>new Response(pending,{status:503,headers}));}
  catch{return new Response(pending,{status:503,headers});}
  finally{parent.finish();}
 }});
}
