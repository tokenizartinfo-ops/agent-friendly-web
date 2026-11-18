import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {readFileSync, readlinkSync} from 'node:fs';
import {networkInterfaces} from 'node:os';

const frame = {
  schema: 'afw.c2.pending-get-model-green1.child/1',
  stage: 'custody',
  custody: null,
  completed: {M: [], Q: [], H: [], R: []},
  activeCase: null,
  m01: null,
  error: null,
  failure: null,
};

const assertionOperations = [
  'original status', 'original g1', 'first emission retained', 'private header',
  'sampled QA', 'joined row', 'read count', 'admitted row', 'query count', 'row file grammar',
];


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

function safeOperand(value) {
  if (value === null || typeof value === 'boolean' ||
      (Number.isSafeInteger(value) && value >= 0 && value <= 32768)) return value;
  if (typeof value !== 'string' || value.length > 128) return 'OMITTED';
  if (/^(?:g1\.[0-9]{3}\.[LSV]\.[0-9]{1,3}|q0\.[AOXV]|p1\.[JAOXVTK]\.[TE][0-8]\.[A-FI-J0-9abcFR-]{5})$/.test(value)) {
    return value;
  }
  return 'sha256:' + createHash('sha256').update(value, 'utf8').digest('hex');
}

function sanitizedFailure(error) {
  const message = typeof error?.message === 'string' ? error.message : '';
  const comparable = message.replace(/^[MQHR][0-9]{2} /, '').replace(/ \([A-Za-z-]+\)$/, '');
  return {
    operation: assertionOperations.includes(comparable) ? comparable : frame.stage,
    operator: ['strictEqual', 'notStrictEqual', 'deepStrictEqual', '=='].includes(error?.operator)
      ? error.operator : null,
    actual: safeOperand(error?.actual),
    expected: safeOperand(error?.expected),
  };
}

function data(name) {
  return JSON.parse(readFileSync(new URL('./' + name, import.meta.url), 'utf8'));
}

function run(items, group, count, check) {
  assert.equal(items.length, count);
  for (let index = 0; index < count; index += 1) {
    const row = items[index];
    const label = group + String(index + 1).padStart(2, '0');
    assert.equal(row[0], label);
    frame.activeCase = label;
    check(row);
    frame.completed[group].push(label);
  }
  frame.activeCase = null;
}

try {
  frame.custody = verifyCustody();
  frame.stage = 'fixtures';
  const grammar = data('sites-grammar.json');
  const main = data('M-vectors.json');
  const qa = data('QA-vectors.json');
  const host = data('host-vectors.json');
  assert.equal(grammar.schema, 'AFW.PENDING_GET.FIXTURE.SITES_GRAMMAR/1');
  assert.equal(main.schema, 'AFW.PENDING_GET.FIXTURE.M_CALLBACK_CURSOR/1');
  assert.equal(qa.schema, 'AFW.PENDING_GET.FIXTURE.QA_PHASE_PAIR/1');
  assert.equal(host.schema, 'AFW.PENDING_GET.FIXTURE.HOST_ADMISSION/1');

  frame.stage = 'imports';
  const {checkM} = await import('./m-model.mjs');
  const {checkQa} = await import('./qa-model.mjs');
  const {checkHost, checkRow} = await import('./host-model.mjs');

  frame.stage = 'cases';
  run(main.vectors, 'M', 30, row => {
    const observed = checkM(row, main.vectors, grammar.model);
    if (row[0] === 'M01') {
      frame.m01 = {
        status: observed.status,
        g1: observed.g1,
        privateHeaderSha256: createHash('sha256').update(observed.privateHeader, 'ascii').digest('hex'),
      };
    }
  });
  run(qa.vectors, 'Q', 35, row => checkQa(row, grammar.model, qa.shared.m));
  run(host.vectors, 'H', 57, row => checkHost(row, host.defaults, grammar.model));
  run(host.rowFileCases, 'R', 12, checkRow);
  frame.stage = 'assertions-passed';
} catch (error) {
  frame.error = error?.code === 'ERR_ASSERTION' ? 'ERR_ASSERTION' : 'UNCLASSIFIED';
  frame.failure = sanitizedFailure(error);
  process.exitCode = 1;
} finally {
  process.stdout.write(JSON.stringify(frame) + '\n');
}
