import {WorkflowEntrypoint} from 'cloudflare:workers';
import {PrivateQaPreregistration as RegisteredHistory} from './index.mjs';
export {IndependentClosure} from './index.mjs';
export class PrivateQaPreregistration extends RegisteredHistory {
 register(){return false;}
 fetch(){return new Response(null,{status:404});}
}
// Retain new namespace and history even when rolling back the bootstrap host.
export class PrivateQaBootstrap extends WorkflowEntrypoint {
 run(){return {contract:'afw-private-admin-bootstrap/v1',state:'unavailable'};}
}
const worker={fetch(){return new Response(null,{status:404});}};
export default worker;
