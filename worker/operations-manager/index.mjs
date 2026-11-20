import {WorkerEntrypoint} from 'cloudflare:workers';
import {verifyPrivateFiniteDossierChannel} from '../../lib/mcp-qa-finite-dossier-channel.mjs';
import {readFiniteDossierReviewReceipt} from '../../lib/dossier-supervision-finite-review.mjs';
export {default} from './fetch.mjs';

// Private service-binding RPC. The existing public fetch has no receipt read route.
export class FiniteDossierReviews extends WorkerEntrypoint {
  verifyChannel(...args) {
    if(args.length!==1)return {verified:false};
    return verifyPrivateFiniteDossierChannel({env:this.env,value:args[0]});
  }
  readReview(...args) {
    if(args.length!==1)throw Error('Finite review unavailable');
    return readFiniteDossierReviewReceipt({env:this.env,refs:args[0]});
  }
}
