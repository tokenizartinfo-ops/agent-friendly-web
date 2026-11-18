import assert from 'node:assert/strict';
import {parseRow} from './codec.mjs';
import {finishHost, hostInput} from './model-host-input.mjs';

export function checkHost(row, defaults, {epoch, uuid}) {
  const [id, , suppliedM, suppliedQa, expectedRow, expectedQueries] = row;
  const m = suppliedM === 'DEFAULT' ? defaults.M : suppliedM;
  const q = suppliedQa === 'DEFAULT' ? defaults.QA : suppliedQa;
  const variants = {
    H16: ['duplicate', 'foreign-label'],
    H18: ['token', 'main', 'directProof', 'test'],
    H19: ['generation', 'actor'],
    H22: ['no-hook', 'missing-terminal'],
    H23: ['null-count', 'missing-count', 'substitute'],
    H24: ['missing-terminal', 'duplicate-terminal'],
    H25: ['duplicate-action', 'intervening'],
    H26: ['recorder', 'truncated', 'bytes', 'rows'],
    H27: ['regular', 'pathStable', 'ownerMatch', 'modeMatch', 'singleLink', 'trailingLf'],
    H28: ['beforeCutoff', 'reserveAvailable'],
    H51: ['torn', 'missing'],
    H52: ['public-frame', 'recorder'],
    H53: ['close-hung', 'close-throw', 'child-cutoff'],
  };

  for (const variant of variants[id] ?? ['default']) {
    const {host, handle, context, proof, post} = hostInput(epoch, id !== 'H55');
    let capture = true;
    let take = true;
    let attempted = 0;
    let headerCopies = 0;

    switch (id) {
      case 'H15': handle.g1 = 'g1.503.V.0'; break;
      case 'H16':
        if (variant === 'foreign-label') context.label = 'other-case';
        break;
      case 'H17': context.response = {...handle.response}; break;
      case 'H18':
      case 'H19': context[variant] = {}; break;
      case 'H20': proof.marks[3].kind = 'countThrow'; break;
      case 'H21':
        proof.marks[1].kind = 'actionReturn';
        proof.marks[3].kind = 'countThrow';
        break;
      case 'H22':
        if (variant === 'no-hook') take = false;
        else proof.marks.pop();
        break;
      case 'H23':
        if (variant === 'substitute') proof.countQualified = false;
        else proof.countSnapshot = variant === 'null-count' ? null : undefined;
        break;
      case 'H24':
        if (variant === 'missing-terminal') proof.marks.pop();
        else proof.marks.push({...proof.marks[3]});
        break;
      case 'H25':
        if (variant === 'duplicate-action') proof.marks.splice(2, 0, {...proof.marks[1]});
        else proof.marks.splice(2, 0, {kind: 'countEnter', label: 'other-case'});
        break;
      case 'H26':
        if (variant === 'recorder') proof.recorderIntact = false;
        else if (variant === 'truncated') proof.marks[3].kind = 'countRet';
        else if (variant === 'bytes') proof.bytes = 32769;
        else proof.rows = 129;
        break;
      case 'H27': proof.custody[variant] = false; break;
      case 'H28': context[variant] = false; break;
      case 'H54': capture = false; break;
      case 'H57':
        handle.status = 200;
        handle.g1 = null;
        break;
      default: break;
    }

    if (capture) assert.equal(host.capture(handle), id !== 'H55');
    if (id === 'H16' && variant === 'duplicate') assert.equal(host.capture(handle), false);
    if (take) host.take(context, proof, response => {
      assert.equal(response, handle.response);
      headerCopies += 1;
      return m;
    });

    const response = host.startRead((readEpoch, key) => {
      assert.equal(readEpoch, epoch);
      assert.equal(key, uuid);
      attempted += 1;
      if (id === 'H56') throw new Error('MODEL synchronous read failure');
      return q;
    });

    if (id === 'H49' || id === 'H50') {
      // Explicit local wait outcome. No timer, unresolved Promise, or transport is started.
      host.completeRead('timeout');
      if (id === 'H50') assert.equal(host.completeRead('reply', defaults.QA), null);
    } else if (id !== 'H56') host.completeRead('reply', response);

    let file = host.staged();
    if (id === 'H51') {
      assert.notEqual(file, null);
      file = variant === 'torn' ? file.slice(0, -1) : null;
    }
    if (id === 'H52') post[variant === 'public-frame' ? 'publicFrameConfirmed' : 'recorderIntact'] = false;
    if (id === 'H53') post[variant === 'child-cutoff' ? 'childTerminatedNormally' : 'closeReturned'] = false;

    host.startRead(() => { attempted += 1; });
    let duplicateCopies = 0;
    assert.equal(host.take(context, proof, () => { duplicateCopies += 1; return m; }), false);
    assert.equal(duplicateCopies, 0);
    assert.ok(headerCopies <= 1);
    assert.equal(finishHost(host, post, file), expectedRow, id + ' admitted row (' + variant + ')');
    assert.equal(attempted, expectedQueries, id + ' query count (' + variant + ')');
  }
}

export function checkRow(row) {
  const [id, body, qualification, queries] = row;
  const accepted = qualification.startsWith('ACCEPT ');
  const observed = parseRow(body);
  const expected = accepted ? body.replace(/\n$/u, '') : null;
  assert.equal(observed, expected, id + ' row file grammar');
  if (accepted) assert.equal(Buffer.byteLength(body), Number(qualification.split(' ')[1]));
  assert.equal(queries, 0);
}
