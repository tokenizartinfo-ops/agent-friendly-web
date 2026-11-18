import assert from 'node:assert/strict';
import {readFileSync, readlinkSync} from 'node:fs';
import {networkInterfaces} from 'node:os';

const frame = {
  schema: 'afw.c2.pending-get-red1.child/1',
  stage: 'custody',
  custody: null,
  status: null,
  g1: null,
  privateHeader: null,
  errorCode: null,
  assertion: null,
};

function verifyCustody() {
  const keys = ['HOME', 'TMPDIR', 'LANG', 'LC_ALL', 'NODE_ENV', 'MODEL_UID', 'MODEL_GID'];
  const env = process.env;
  const uid = process.getuid();
  const gid = process.getgid();
  const proc = readFileSync('/proc/self/status', 'utf8');
  const nspid = /^NSpid:\s*([1-9][0-9]*)[ \t]+1$/m.exec(proc);
  const netPorts = readFileSync('/proc/net/dev', 'utf8').trimEnd().split('\n').slice(2);
  const net = Object.entries(networkInterfaces());
  if (process.version !== 'v22.23.4' || process.argv.length !== 2 ||
      Object.keys(env).length !== keys.length || keys.some(key => !Object.hasOwn(env, key)) ||
      env.HOME !== process.cwd() || env.TMPDIR !== process.cwd() ||
      env.LANG !== 'C.UTF-8' || env.LC_ALL !== 'C.UTF-8' || env.NODE_ENV !== 'test' ||
      uid <= 0 || String(uid) !== env.MODEL_UID || String(gid) !== env.MODEL_GID ||
      process.getgroups().some(group => group !== gid) ||
      !/^NoNewPrivs:\s*1$/m.test(proc) || !/^CapEff:\s*0+$/m.test(proc) ||
      process.pid !== 1 || !nspid || readlinkSync('/proc/self') !== nspid[1] ||
      netPorts.length !== 1 || !/^\s*lo:/.test(netPorts[0]) ||
      net.some(([name, addresses]) => name !== 'lo' || addresses.some(address => !address.internal))) {
    throw new Error('MODEL_CUSTODY_INVALID');
  }
  return {
    hostPid: Number(nspid[1]),
    pidNamespace: readlinkSync('/proc/self/ns/pid'),
    netNamespace: readlinkSync('/proc/self/ns/net'),
    uid,
    gid,
  };
}

try {
  frame.custody = verifyCustody();

  frame.stage = 'fixture';
  const vectors = JSON.parse(readFileSync(new URL('./M-vectors.json', import.meta.url), 'utf8'));
  const cases = vectors.vectors.filter(row => row[0] === 'M01');
  assert.equal(cases.length, 1);
  const [m01] = cases;
  const [status, g1] = m01[2].split(' ');
  const expectedPrivate = m01[3];
  assert.match(expectedPrivate, /^m1\.[0-9a-f]{16}\.T0\.-$/);

  frame.stage = 'factory-import';
  const {createGetWinnerObserver} = await import('./create-get-winner-observer.mjs');

  frame.stage = 'scenario';
  const request = new Request('https://afw.invalid/connections/finite-prepare', {method: 'GET'});
  const lease = {};
  const error = new Error('Finite native conduit unavailable');
  error.status = 503;
  const pending = Response.json(
    {status: 'admin_pending', mayRetry: false, operationalReadiness: false},
    {status: 503, headers: new Headers({'Cache-Control': 'no-store'})},
  );
  assert.equal(request.body, null);
  const observer = createGetWinnerObserver();
  const cell = observer.enter(request);
  observer.bind(request, lease);
  observer.deadline(lease, error);
  observer.race(lease, error);
  observer.caught(request, lease, error, pending);
  observer.finish(cell, request, lease, pending);

  frame.stage = 'baseline';
  frame.status = pending.status;
  frame.g1 = pending.headers.get('x-afw-lab-get-winner');
  assert.equal(frame.status, Number(status));
  assert.equal(frame.g1, g1);

  frame.stage = 'private-assertion';
  frame.privateHeader = pending.headers.get('x-afw-lab-pending1');
  assert.equal(frame.privateHeader, expectedPrivate, 'M01 private header');
  frame.stage = 'assertion-passed';
} catch (error) {
  frame.errorCode = typeof error?.code === 'string' && /^[A-Z_0-9]{1,64}$/.test(error.code)
    ? error.code
    : 'UNCLASSIFIED';
  if (frame.stage === 'private-assertion' && frame.errorCode === 'ERR_ASSERTION') {
    frame.assertion = {
      code: error.code,
      operator: error.operator,
      actual: error.actual,
      expected: error.expected,
    };
  }
  process.exitCode = 1;
} finally {
  process.stdout.write(JSON.stringify(frame) + '\n');
}
