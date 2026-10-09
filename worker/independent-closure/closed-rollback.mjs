import {WorkflowEntrypoint} from 'cloudflare:workers';
export {IndependentClosure,PrivateQaPreregistration} from './index.mjs';
// Retain new namespace and history even when rolling back the bootstrap host.
export class PrivateQaBootstrap extends WorkflowEntrypoint {
 run(){return {contract:'afw-private-admin-bootstrap/v1',state:'unavailable'};}
}
const worker={fetch(){return new Response(null,{status:404});}};
export default worker;
