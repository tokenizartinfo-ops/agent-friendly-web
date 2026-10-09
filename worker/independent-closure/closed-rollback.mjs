import {WorkflowEntrypoint} from 'cloudflare:workers';
import {PrivateQaPreregistration as RegisteredHistory,observePrivateQa} from './index.mjs';
export {IndependentClosure} from './index.mjs';
export class PrivateQaPreregistration extends RegisteredHistory {
 register(){return false;}
 fetch(){return new Response(null,{status:404});}
}
// Retain new namespace and history even when rolling back the bootstrap host.
export class PrivateQaBootstrap extends WorkflowEntrypoint {
 run(event){let params=event.payload;try{if(typeof params==='string'&&params.length<=256)params=JSON.parse(params);}catch{/* Strict observer rejects malformed inputs. */}if(params?.operation==='observe')return observePrivateQa(this.env,params);return {contract:'afw-private-admin-bootstrap/v1',state:'unavailable'};}
}
const worker={fetch(){return new Response(null,{status:404});}};
export default worker;
