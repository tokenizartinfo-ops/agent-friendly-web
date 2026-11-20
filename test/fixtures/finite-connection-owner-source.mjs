// SYNTHETIC fixed source: phase derives ONLY from actual native journal receipt.
import {readPrivateQaFiniteOwnerSource as read} from './finite-owner-source.mjs';
import {synchronizeSyntheticConnectionSource} from './finite-connection-source.mjs';
export async function readPrivateQaFiniteOwnerSource(input){
 input.parent.assertCurrent();await synchronizeSyntheticConnectionSource(input.ctx,input.preconnectionId);input.parent.assertCurrent();return read(input);
}
