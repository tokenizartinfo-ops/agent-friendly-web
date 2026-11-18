import {spawnSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {
  lstatSync, mkdirSync, mkdtempSync, readFileSync, readlinkSync, realpathSync,
  readdirSync, rmdirSync, unlinkSync, writeFileSync,
} from 'node:fs';
import {basename, dirname, join, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const repository = 'tokenizartinfo-ops/agent-friendly-web';
const branch = 'lab/afw-c2-pending-get-20261118-red1';
const job = 'c2-pending-get-red1';
const message = 'AFW-C2-PENDING-GET-RED1-ONEUSE-20261118';
const base = '6791ce1bab9372e206d3c7b42b3e1394dc6e0c68';
const baseTree = '62e78926635d6b74f288d6c0d69e0f2516306989';
const prefix = 'docs/superpowers/source-lab/c2-pending-get-red1/';
const names = {
  runner: prefix + 'run-pending-get-red1.mjs',
  workflow: '.github/workflows/afw-c2-pending-get-red1.yml',
  source: prefix + 'S09-original.txt',
  slice: prefix + 'create-get-winner-observer.mjs',
  vector: prefix + 'M-vectors.json',
  test: prefix + 'pending-get-red1.test.mjs',
};
const manifestPath = prefix + 'manifest.json';
const ownPath = fileURLToPath(import.meta.url);
const workspace = resolve(dirname(ownPath), '../../../..');
const minimalEnv = {PATH: '/usr/bin:/bin', LANG: 'C.UTF-8', LC_ALL: 'C.UTF-8'};
const uid = process.getuid();
const gid = process.getgid();
const staged = ['slice', 'vector', 'test'];
const result = {
  schema: 'afw.c2.pending-get-red1.result/1',
  disposition: 'UNEXPECTED_FAILURE',
  stage: 'nomination',
  failure: null,
  nomination: {repository, branch, job, base, baseTree, head: null, tree: null, run: null, attempt: 1},
  checks: {mounts: false, extraction: false, freshNamespaces: false, childPidAbsent: false,
    stagingReadback: false, tempAbsent: false},
  child: null,
  namespaceParent: null,
  frame: null,
};
let root, temp, identity;

function requireFact(ok, code) {
  if (!ok) throw Object.assign(new Error(code), {protocolCode: code});
}

function absent(path) {
  try {
    lstatSync(path);
    return false;
  } catch (error) {
    if (error.code === 'ENOENT') return true;
    throw error;
  }
}

function fixedBody(path, cap) {
  const stat = lstatSync(path);
  requireFact(stat.isFile() && stat.nlink === 1 && stat.size > 0 && stat.size <= cap &&
    realpathSync(path) === path, 'FILE_CUSTODY');
  const body = readFileSync(path);
  requireFact(body.length === stat.size, 'FILE_SIZE');
  return body;
}

function sha256(body) {
  return createHash('sha256').update(body).digest('hex');
}

function fingerprint(body) {
  return {
    utf8Bytes: body.length,
    sha256: sha256(body),
    gitBlob: createHash('sha1').update('blob ' + body.length + '\0').update(body).digest('hex'),
  };
}

function git(...args) {
  const child = spawnSync('/usr/bin/git', ['--no-optional-locks', '--no-replace-objects', ...args], {
    cwd: workspace,
    env: {...minimalEnv, GIT_CONFIG_NOSYSTEM: '1', GIT_CONFIG_GLOBAL: '/dev/null'},
    stdio: ['ignore', 'pipe', 'pipe'], encoding: 'utf8', timeout: 2000, maxBuffer: 24576,
  });
  requireFact(!child.error && child.status === 0 && child.stderr === '', 'GIT_READ');
  return child.stdout;
}

function verifyTemp() {
  const stat = lstatSync(temp);
  requireFact(identity && dirname(temp) === root && realpathSync(temp) === temp && stat.isDirectory() &&
    stat.uid === uid && stat.gid === gid && stat.dev === identity.dev && stat.ino === identity.ino &&
    (stat.mode & 0o777) === 0o700, 'TEMP_CUSTODY');
}

function stagePath(role) {
  return join(temp, basename(names[role]));
}

function verifyStaged(bodies, originalStats) {
  verifyTemp();
  requireFact(readdirSync(temp).sort().join() === staged.map(role => basename(names[role])).sort().join(),
    'STAGING_ENTRIES');
  for (const role of staged) {
    const path = stagePath(role);
    const stat = lstatSync(path);
    const original = originalStats[role];
    requireFact(stat.uid === uid && stat.gid === gid && (stat.mode & 0o777) === 0o400 &&
      stat.dev === original.dev && stat.ino === original.ino &&
      fixedBody(path, 24576).equals(bodies[role]), 'STAGING_READBACK');
  }
}

function uniqueOffset(body, literal) {
  const pos = body.indexOf(literal);
  requireFact(pos >= 0 && body.lastIndexOf(literal) === pos, 'SOURCE_BOUNDARY');
  return pos;
}

try {
  const env = process.env;
  requireFact(process.platform === 'linux' && process.version === 'v22.23.4' && process.argv.length === 2 &&
    ownPath === join(workspace, names.runner) && workspace === env.GITHUB_WORKSPACE &&
    realpathSync(workspace) === workspace && uid > 0 &&
    env.GITHUB_ACTIONS === 'true' && env.GITHUB_EVENT_NAME === 'push' &&
    env.GITHUB_REPOSITORY === repository && env.GITHUB_REF === 'refs/heads/' + branch &&
    env.GITHUB_JOB === job && env.GITHUB_RUN_ATTEMPT === '1' &&
    /^[1-9][0-9]{0,19}$/.test(env.GITHUB_RUN_ID ?? ''), 'RUN_NOMINATION');

  const [head, tree, parentTree] = git('rev-parse', 'HEAD', 'HEAD^{tree}', base + '^{tree}').trimEnd().split('\n');
  const commit = git('cat-file', 'commit', head);
  const [headers, commitMessage] = commit.split('\n\n', 2);
  requireFact(/^[0-9a-f]{40}$/.test(head) && head === env.GITHUB_SHA && /^[0-9a-f]{40}$/.test(tree) &&
    parentTree === baseTree && headers.split('\n').filter(line => line.startsWith('parent ')).join() === 'parent ' + base &&
    (commitMessage === message || commitMessage === message + '\n') &&
    commit === headers + '\n\n' + commitMessage, 'COMMIT_NOMINATION');
  Object.assign(result.nomination, {head, tree, run: env.GITHUB_RUN_ID});

  result.stage = 'pins';
  const manifestBody = fixedBody(join(workspace, manifestPath), 24576);
  const manifest = JSON.parse(manifestBody.toString('utf8'));
  requireFact(manifest.schema === 'afw.c2.pending-get-red1.manifest/1', 'MANIFEST_SCHEMA');
  const bodies = {};
  const additions = new Map([[manifestPath, fingerprint(manifestBody).gitBlob]]);
  for (const [role, path] of Object.entries(names)) {
    const body = fixedBody(join(workspace, path), role === 'source' ? 83571 : 24576);
    const actual = fingerprint(body);
    const pin = manifest.pins[role];
    requireFact(pin.path === path && pin.utf8Bytes === actual.utf8Bytes &&
      pin.sha256 === actual.sha256 && pin.gitBlob === actual.gitBlob, 'BODY_PIN');
    bodies[role] = body;
    additions.set(path, actual.gitBlob);
  }
  const rawChanges = git('diff-tree', '--no-commit-id', '--no-renames', '--raw',
    '--no-abbrev', '-r', '-z', base, head).split('\0');
  requireFact(rawChanges.length === additions.size * 2 + 1 && rawChanges.pop() === '', 'TREE_DELTA');
  for (let i = 0; i < rawChanges.length; i += 2) {
    const path = rawChanges[i + 1];
    requireFact(additions.has(path) && rawChanges[i] ===
      ':000000 100644 ' + '0'.repeat(40) + ' ' + additions.get(path) + ' A', 'TREE_ENTRY');
    additions.delete(path);
  }
  result.checks.mounts = true;

  const start = uniqueOffset(bodies.source, 'export function createGetWinnerObserver() {');
  const end = uniqueOffset(bodies.source, 'export function prepareGetWinner(name,source) {');
  requireFact(start === manifest.extraction.startByte && end === manifest.extraction.endByteExclusive &&
    start < end && bodies.source.subarray(start, end).equals(bodies.slice), 'SOURCE_EXTRACTION');
  result.checks.extraction = true;

  result.stage = 'staging';
  root = realpathSync(env.RUNNER_TEMP);
  requireFact(root === env.RUNNER_TEMP && lstatSync(root).isDirectory(), 'RUNNER_TEMP');
  temp = mkdtempSync(join(root, 'afw-c2-pending-get-red1-'));
  identity = lstatSync(temp);
  verifyTemp();
  const originalStats = {};
  for (const role of staged) {
    const path = stagePath(role);
    writeFileSync(path, bodies[role], {flag: 'wx', mode: 0o400});
    originalStats[role] = lstatSync(path);
  }
  verifyStaged(bodies, originalStats);

  result.stage = 'launch';
  const parentPid = readlinkSync('/proc/self/ns/pid');
  const parentNet = readlinkSync('/proc/self/ns/net');
  result.namespaceParent = {pidNamespace: parentPid, netNamespace: parentNet};
  const launchEnv = {
    HOME: temp, TMPDIR: temp, LANG: 'C.UTF-8', LC_ALL: 'C.UTF-8', NODE_ENV: 'test',
    MODEL_UID: String(uid), MODEL_GID: String(gid),
  };
  const child = spawnSync('/usr/bin/sudo', ['-n', '/usr/bin/env', '-i',
    ...Object.entries(launchEnv).map(([key, value]) => key + '=' + value),
    '/usr/bin/timeout', '--signal=KILL', '8s',
    '/usr/bin/unshare', '--net', '--pid', '--fork', '--kill-child=SIGKILL',
    '/usr/bin/setpriv', '--reuid', String(uid), '--regid', String(gid), '--clear-groups', '--no-new-privs',
    process.execPath, stagePath('test'),
  ], {cwd: temp, env: minimalEnv, stdio: ['ignore', 'pipe', 'pipe'], timeout: 10000,
    maxBuffer: 4096, killSignal: 'SIGKILL'});
  const stdout = child.stdout ?? Buffer.alloc(0);
  const stderr = child.stderr ?? Buffer.alloc(0);
  result.child = {status: child.status, signal: child.signal, spawnError: child.error?.code ?? null,
    stdoutBytes: stdout.length, stdoutSha256: sha256(stdout), stderrBytes: stderr.length};
  requireFact(!child.error && !child.signal && Number.isSafeInteger(child.status), 'CHILD_CUTOFF');

  result.stage = 'child-frame';
  const line = new TextDecoder('utf-8', {fatal: true}).decode(stdout);
  requireFact(stderr.length === 0 && stdout.length > 0 && stdout.length <= 4096 &&
    line.indexOf('\n') === line.length - 1, 'CHILD_STREAM');
  const frame = JSON.parse(line);
  requireFact(frame.schema === 'afw.c2.pending-get-red1.child/1', 'CHILD_SCHEMA');
  result.frame = frame;

  result.stage = 'closure';
  const custody = frame.custody;
  requireFact(custody?.uid === uid && custody.gid === gid &&
    Number.isSafeInteger(custody.hostPid) && custody.hostPid > 1 &&
    /^pid:\[[1-9][0-9]*\]$/.test(custody.pidNamespace) && custody.pidNamespace !== parentPid &&
    /^net:\[[1-9][0-9]*\]$/.test(custody.netNamespace) && custody.netNamespace !== parentNet, 'NS_CUSTODY');
  result.checks.freshNamespaces = true;
  requireFact(absent('/proc/' + custody.hostPid), 'NS_PID_PRESENT');
  result.checks.childPidAbsent = true;
  verifyStaged(bodies, originalStats);
  result.checks.stagingReadback = true;

  result.stage = 'classify';
  const m01 = manifest.expected;
  requireFact(frame.status === m01.status && frame.g1 === m01.g1, 'ORIGINAL_BASELINE');
  if (child.status === 0 && frame.stage === 'assertion-passed' && frame.privateHeader === m01.privateHeader &&
      frame.errorCode === null && frame.assertion === null) {
    result.disposition = 'UNEXPECTED_GREEN';
  } else {
    requireFact(child.status === 1 && frame.stage === 'private-assertion' && frame.privateHeader === null &&
      frame.errorCode === 'ERR_ASSERTION' && frame.assertion?.code === 'ERR_ASSERTION' &&
      frame.assertion.operator === 'strictEqual' && frame.assertion.actual === null &&
      frame.assertion.expected === m01.privateHeader, 'WRONG_ASSERTION');
    result.disposition = 'FEATURE_MISSING_RED';
  }
} catch (error) {
  result.failure = error.protocolCode ?? 'UNEXPECTED_EXCEPTION';
} finally {
  if (temp) {
    try {
      verifyTemp();
      for (const role of staged) {
        const path = stagePath(role);
        if (!absent(path)) unlinkSync(path);
      }
      rmdirSync(temp);
      requireFact(absent(temp), 'TEMP_PRESENT');
      result.checks.tempAbsent = true;
    } catch {
      result.stage = 'cleanup';
      result.failure = 'TEMP_CLEANUP';
      result.disposition = 'UNEXPECTED_FAILURE';
    }
  }
}

try {
  const dir = join(workspace, 'output');
  if (absent(dir)) mkdirSync(dir, {mode: 0o700});
  requireFact(realpathSync(dir) === dir && lstatSync(dir).isDirectory() && lstatSync(dir).uid === uid,
    'OUTPUT_DIRECTORY');
  const path = join(dir, 'c2-pending-get-red1.json');
  const body = Buffer.from(JSON.stringify(result) + '\n', 'utf8');
  requireFact(body.length <= 6144, 'OUTPUT_CAP');
  writeFileSync(path, body, {flag: 'wx', mode: 0o600});
  requireFact(fixedBody(path, 6144).equals(body), 'OUTPUT_READBACK');
  process.stdout.write('AFW_C2_PENDING_GET_RED1_JSON_BASE64 ' + body.toString('base64') + '\n');
} catch {
  process.stderr.write('AFW MODEL RED evidence publication failed\n');
}
process.exitCode = 1;
