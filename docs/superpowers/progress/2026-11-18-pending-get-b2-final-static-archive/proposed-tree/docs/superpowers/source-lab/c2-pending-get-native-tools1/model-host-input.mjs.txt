import assert from 'node:assert/strict';
import {createPendingHost} from './host-core.mjs';

export function hostInput(epoch, enabled = true) {
  const handle = {
    response: {}, main: {}, label: 'case15', test: {}, token: {}, actor: {},
    generation: {}, directProof: {}, status: 503, g1: 'g1.503.L.0',
  };
  const context = {...handle, beforeCutoff: true, reserveAvailable: true};
  const proof = {
    marks: ['actionEnter', 'actionThrow', 'countEnter', 'countReturn']
      .map(kind => ({kind, label: handle.label})),
    bytes: 256,
    rows: 4,
    recorderIntact: true,
    countQualified: true,
    countSnapshot: {},
    custody: {
      regular: true, pathStable: true, ownerMatch: true,
      modeMatch: true, singleLink: true, trailingLf: true,
    },
  };
  const post = {
    publicFrameConfirmed: true, recorderIntact: true, closeReturned: true, childTerminatedNormally: true,
  };
  const host = createPendingHost({enabled, epoch, directProof: handle.directProof,
    expectedLabel: handle.label, testIdentity: handle.test});
  return {host, handle, context, proof, post};
}

export function finishHost(host, post, privateFile = host.staged()) {
  const admitted = host.admit(privateFile, post);
  assert.equal(host.admit(privateFile, post), null, 'host row admission is one-shot');
  return admitted;
}
