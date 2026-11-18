import assert from 'node:assert/strict';
import {createGetWinnerObserver} from './create-get-winner-observer.mjs';

const winnerHeader = 'x-afw-lab-get-winner';
const pendingHeader = 'x-afw-lab-pending1';

function pendingResponse(status = 503, headers = new Headers({'Cache-Control': 'no-store'})) {
  return Response.json(
    {status: 'admin_pending', mayRetry: false, operationalReadiness: false},
    {status, headers},
  );
}

function context(observer, directProof, proof = directProof) {
  const request = new Request('https://afw.invalid/connections/finite-prepare', {method: 'GET'});
  const lease = {};
  assert.equal(request.body, null);
  const cell = observer.enter(request, proof);
  observer.bind(request, lease);
  return {observer, request, lease, cell, main: observer.pendingM, upstream: new Response(null)};
}

function error() {
  return Object.assign(new Error('Finite native conduit unavailable'), {status: 503});
}

function cut(ctx, origin, arity = origin === 'T' ? 0 : 1) {
  const thrown = error();
  ctx.observer.deadline(ctx.lease, thrown, origin, arity);
  return thrown;
}

function raceCatch(ctx, thrown, response) {
  ctx.observer.race(ctx.lease, thrown);
  ctx.observer.caught(ctx.request, ctx.lease, thrown, response);
}

function finish(ctx, response) {
  ctx.observer.finish(ctx.cell, ctx.request, ctx.lease, response);
}

function through(ctx, last, key) {
  const {main, lease, upstream} = ctx;
  const points = [
    'requestBytesEnter', 'requestBytesReturn', 'stubEnter', 'stubReturn', 'responseBytesEnter',
  ];
  for (let index = 0; index < last; index += 1) {
    if (index === 2 && key !== null) main.captureUuid(lease, key);
    main.mark(lease, points[index], upstream);
  }
}

function readThrough(ctx, times) {
  for (let index = 0; index < times; index += 1) {
    ctx.main.markRead(ctx.lease, ctx.upstream, 'enter');
    ctx.main.markRead(ctx.lease, ctx.upstream, 'return');
  }
}

function verifyOriginal(response, label) {
  const [status, qualifier] = label.split(/ |;/);
  assert.equal(response.status, Number(status), 'original status');
  if (qualifier.startsWith('g1.')) {
    assert.equal(response.headers.get(winnerHeader), qualifier, 'original g1');
  } else if (!label.includes('preexisting') && !label.includes('retained') && !label.includes('duplicate')) {
    assert.equal(response.headers.get(winnerHeader), null, 'original g1');
  }
}

export function checkM(row, vectors, {epoch, uuid, foreignUuid}) {
  const [id, , baseline, expected, expectedQa, expectedRow, queries] = row;
  const directProof = Object.freeze({});
  let seed;
  const observer = createGetWinnerObserver({
    enabled: true, epoch, directProof,
    registerModelBudgetSeed(fn) { seed = fn; },
  });
  const ctx = context(observer, directProof);
  const {main, lease, upstream} = ctx;
  let response = pendingResponse();
  let chosen;

  switch (id) {
    case 'M01':
      chosen = cut(ctx, 'T');
      break;
    case 'M02':
      through(ctx, 1, uuid);
      chosen = cut(ctx, 'E');
      break;
    case 'M03':
      through(ctx, 2, uuid);
      chosen = cut(ctx, 'T');
      break;
    case 'M04':
      through(ctx, 2, uuid);
      main.captureUuid(lease, uuid);
      chosen = cut(ctx, 'E');
      break;
    case 'M05':
    case 'M06': {
      through(ctx, 3, uuid);
      const first = id === 'M05' ? 'T' : 'E';
      chosen = cut(ctx, first);
      raceCatch(ctx, chosen, response);
      cut(ctx, first === 'T' ? 'E' : 'T');
      if (id === 'M05') main.mark(lease, 'stubReturn', upstream);
      chosen = undefined;
      break;
    }
    case 'M07':
      through(ctx, 4, uuid);
      chosen = cut(ctx, 'T');
      break;
    case 'M08':
      through(ctx, 5, uuid);
      main.markRead(lease, upstream, 'enter');
      chosen = cut(ctx, 'E');
      break;
    case 'M09':
      through(ctx, 5, uuid);
      readThrough(ctx, 1);
      chosen = cut(ctx, 'T');
      break;
    case 'M10':
      through(ctx, 5, uuid);
      readThrough(ctx, 1);
      main.markRead(lease, upstream, 'enter');
      chosen = cut(ctx, 'E');
      break;
    case 'M11':
      through(ctx, 5, uuid);
      readThrough(ctx, 2);
      chosen = cut(ctx, 'T');
      break;
    case 'M12':
      through(ctx, 5, uuid);
      readThrough(ctx, 1);
      main.markRead(lease, upstream, 'responseBytesReturn');
      chosen = cut(ctx, 'E');
      break;
    case 'M13':
      through(ctx, 5, uuid);
      main.markRead(lease, upstream, 'responseBytesReturn');
      chosen = cut(ctx, 'T');
      break;
    case 'M14':
      through(ctx, 3, null);
      chosen = cut(ctx, 'T');
      break;
    case 'M15': {
      through(ctx, 5, uuid);
      const foreign = context(observer, directProof);
      through(foreign, 5, foreignUuid);
      readThrough(foreign, 1);
      main.markRead(lease, foreign.upstream, 'return');
      chosen = cut(ctx, 'T');
      break;
    }
    case 'M16':
      through(ctx, 1, uuid);
      main.markRead(lease, upstream, 'return');
      chosen = cut(ctx, 'T');
      break;
    case 'M17':
      through(ctx, 5, uuid);
      main.markRead(lease, upstream, 'enter');
      main.invalidate(lease);
      chosen = cut(ctx, 'T');
      break;
    case 'M18':
      through(ctx, 3, uuid);
      cut(ctx, 'T');
      chosen = error();
      break;
    case 'M19': {
      through(ctx, 3, uuid);
      const foreign = context(observer, directProof);
      chosen = cut(foreign, 'T');
      break;
    }
    case 'M20':
      chosen = cut(ctx, 'T', 2);
      break;
    case 'M21':
      through(ctx, 3, uuid);
      chosen = error();
      observer.forward(ctx.request, lease);
      observer.denied(ctx.request, lease, new Response(null, {status: 413}), chosen, 413);
      cut(ctx, 'T');
      response = pendingResponse(413);
      break;
    case 'M22':
      through(ctx, 4, uuid);
      chosen = error();
      observer.forward(ctx.request, lease);
      observer.validate(lease, upstream);
      observer.validationDenied(chosen);
      observer.validationEnd(lease, upstream);
      cut(ctx, 'E');
      break;
    case 'M23':
      through(ctx, 5, uuid);
      main.markRead(lease, upstream, 'responseBytesReturn');
      response = new Response(null, {status: 200});
      break;
    case 'M24':
      through(ctx, 3, uuid);
      response.headers.set(winnerHeader, 'preexisting-g1');
      chosen = cut(ctx, 'T');
      break;
    case 'M25': {
      through(ctx, 3, uuid);
      raceCatch(ctx, cut(ctx, 'T'), response);
      finish(ctx, response);
      const first = vectors.find(vector => vector[0] === 'M05')[3];
      assert.equal(response.headers.get(pendingHeader), first);
      const duplicate = context(observer, directProof);
      through(duplicate, 3, uuid);
      raceCatch(duplicate, cut(duplicate, 'E'), response);
      finish(duplicate, response);
      assert.equal(response.headers.get(pendingHeader), first, 'M25 first emission retained');
      verifyOriginal(response, vectors.find(vector => vector[0] === 'M01')[2]);
      assert.equal(expected, null, 'M25 duplicate expectation concerns new emission');
      break;
    }
    case 'M26':
      through(ctx, 3, uuid);
      raceCatch(ctx, cut(ctx, 'T'), pendingResponse());
      break;
    case 'M27':
      through(ctx, 3, uuid);
      chosen = cut(ctx, 'T');
      assert.equal(seed(lease), true);
      main.mark(lease, 'stubReturn', upstream);
      main.mark(lease, 'responseBytesEnter', upstream);
      cut(ctx, 'E');
      break;
    case 'M28':
      for (let index = 1; index < 64; index += 1) context(observer, directProof);
      context(observer, directProof);
      chosen = cut(ctx, 'T');
      break;
    case 'M29': {
      const controls = [
        context(createGetWinnerObserver(), directProof),
        context(createGetWinnerObserver({enabled: true, epoch, directProof}), directProof, {}),
        context(createGetWinnerObserver({enabled: true, epoch, directProof}), directProof, null),
        context(createGetWinnerObserver({enabled: true, epoch: epoch.toUpperCase(), directProof}), directProof),
      ];
      const publicBaseline = vectors.find(vector => vector[0] === 'M01')[2];
      for (const control of controls) {
        if (control.main) through(control, 3, uuid);
        const original = pendingResponse();
        raceCatch(control, cut(control, 'T'), original);
        finish(control, original);
        verifyOriginal(original, publicBaseline);
        assert.equal(original.headers.get(pendingHeader), expected);
      }
      break;
    }
    case 'M30':
      chosen = cut(ctx, 'T');
      cut(ctx, 'E');
      cut(ctx, 'T');
      break;
    default:
      assert.fail('Unexpected sealed M label');
  }
  if (chosen) raceCatch(ctx, chosen, response);
  finish(ctx, response);
  verifyOriginal(response, baseline);
  if (id === 'M24') assert.equal(response.headers.get(winnerHeader), 'preexisting-g1');
  if (id !== 'M25') {
    assert.equal(response.headers.get(pendingHeader), expected, id + ' private header');
  }
  assert.deepEqual([expectedQa, expectedRow, queries], [null, null, 0]);
  return id === 'M01' ? {status: response.status, g1: response.headers.get(winnerHeader),
    privateHeader: response.headers.get(pendingHeader)} : null;
}
