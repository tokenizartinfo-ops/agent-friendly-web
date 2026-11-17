import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {mkdir, mkdtemp, realpath, lstat, readFile, writeFile, readlink, readdir, rm} from 'node:fs/promises';
import {join, resolve, dirname, relative, basename, delimiter} from 'node:path';
import {fileURLToPath} from 'node:url';

const inputs = [
 {
  "file": "docs/superpowers/source-lab/c2-t1/body-00.txt",
  "blob": "a9d70b416579e3ab6e8c5f02ec2a9b94227c43e5",
  "bytes": 148547,
  "sha256": "02ee98da9239dd28948db664127c579ef69941e5e9c8151b1568527509815210"
 },
 {
  "file": "docs/superpowers/source-lab/c2-t1/body-01.txt",
  "blob": "cfbfb1656d4a013b40e770ee8335d5e1eb85a908",
  "bytes": 45576,
  "sha256": "fc227b59b3b5815eadffbd582f018cbd3e64ceaa596f07bc21a2031f7cd1d6e9"
 },
 {
  "file": "docs/superpowers/source-lab/c2-t1/body-02.txt",
  "blob": "8505cfe4e020c570ec37cb5943b703770e4d06c8",
  "bytes": 2497,
  "sha256": "644973221d5dbc3e9bdb87888840c28c370f3b1ed6dff2c89534c4de0e8642f8"
 },
 {
  "file": "docs/superpowers/source-lab/c2-t1/body-03.txt",
  "blob": "8b43e03e96b055be49b66a6788b27f129dd894c8",
  "bytes": 2810,
  "sha256": "7059b9ccc18fccd4da8dff42e9c04c4c7547afef9976852cbefbeef5175504f6"
 },
 {
  "file": "docs/superpowers/source-lab/c2-t1/body-04.txt",
  "blob": "e2f35568a51360e3cbda4801f8d0d895d3f0dd7e",
  "bytes": 4153,
  "sha256": "54e2261aac2bbe3d2446d7fa5911f2b921b4d8dc618943abd5d34e3f1125ca4b"
 },
 {
  "file": "docs/superpowers/source-lab/c2-t1/body-05.txt",
  "blob": "a177d50ff73f8fad1d60827ef904a204126796fb",
  "bytes": 101380,
  "sha256": "5911698fe8de72441d125414f879d725a677dbc26f3c1a40cdcd2999b6d4b40b"
 },
 {
  "file": "docs/superpowers/source-lab/c2-t1/body-06.txt",
  "blob": "4c1d7355e1759a5d597b520fcb79c2689b9bb966",
  "bytes": 22501,
  "sha256": "f08b914a1e668ad36b4848d0b61cbe8b44dfb3e54bc747480564a8aacc587df4"
 },
 {
  "file": "docs/superpowers/source-lab/c2-t1/body-07.txt",
  "blob": "d4db10ee8a091434835a9ac28e0d607a5e9efd21",
  "bytes": 2785,
  "sha256": "678fc3c538f2fc29e70c41475794f58e5d690a7c7aae69b1b97ae9309a728b6b"
 },
 {
  "file": "docs/superpowers/source-lab/c2-t1/body-08.txt",
  "blob": "de8a51e5a6023342b1b3aeccadf66e90611d268f",
  "bytes": 18667,
  "sha256": "ac74be106ec36a0dd093cfb542ba2e8dd2220ae89c8c49879b20c1910bbcb71e"
 },
 {
  "file": "docs/superpowers/source-lab/c2-t1/body-09.txt",
  "blob": "3e1d4c2695dce2d13ba064274ba441c4ce9447c3",
  "bytes": 61073,
  "sha256": "2dc335761ac7f168532af37fd4128d2fc8b15c9b5b3072f377a9913e7b93829d"
 },
 {
  "file": "docs/superpowers/source-lab/c2-t1/body-10.txt",
  "blob": "9e7f89e3a0b5112323cd80a960daa03eb1f9e1b5",
  "bytes": 88519,
  "sha256": "79a135fbc9897463b566624a4662946089b8b5fd25baeda368663ff65be3cdc7"
 },
 {
  "file": "docs/superpowers/source-lab/c2-t1/body-11.txt",
  "blob": "19441f9aa4a464b9594431b6e196d4318a7809b3",
  "bytes": 58727,
  "sha256": "d9895052eb50bf75ca1a14d743fac5c5e4c9b4cf22ae0b6460268f05878f26f7"
 },
 {
  "file": "docs/superpowers/source-lab/c2-t1/body-12.txt",
  "blob": "e3f1597c0b57e36c6c28e4321d8638b5e0eacfcd",
  "bytes": 6030,
  "sha256": "0db45a29028284a886b7e2f46b4ef0f8834b9cfefdeed2fc026aa72694a7c8e8"
 },
 {
  "file": "docs/superpowers/source-lab/c2-t1-host-json-fix1/normal13.json",
  "blob": "26b62b5ce8f413b6f7fd146e03b8f8cdcf6995ac",
  "bytes": 11467,
  "sha256": "0681cadc774fcddf7a009e86e24b22fa879857af1e900f6143d23c2d7eaa9be7"
 },
 {
  "file": "docs/superpowers/source-lab/c2-t1-host-json-fix1/fixture-first.json",
  "blob": "65dd370ef52c0bcbb8fd56b2012d2c8bb93f3ae4",
  "bytes": 5313,
  "sha256": "9a12651e834f2c6e977424cd5d5662fac4bba2a0e51c96befdae7a5ce21b1943"
 },
 {
  "file": "docs/superpowers/source-lab/c2-t1-host-json-fix1/repo-imports.json",
  "blob": "506ca639a60e18a82f902e858cc1c08be2133d59",
  "bytes": 26784,
  "sha256": "22ab5754207ab7100345a1ab3884e0b282cf0f24c627c8940dd96a486664378b"
 },
 {
  "file": "docs/superpowers/source-lab/c2-t1-host-json-fix1/targets.json",
  "blob": "0c1897e6306f2673df490bcb99543490243bdaeb",
  "bytes": 8000,
  "sha256": "84d804582c5d2abaa9d54c15ad76f6c6887654cc4096c28584843d250118b2f0"
 },
 {
  "file": "docs/superpowers/source-lab/c2-t1-host-json-fix1/package-closure.json",
  "blob": "c505a9d26aac123275cbc8bb28a56d4986e7e16e",
  "bytes": 38204,
  "sha256": "819003b4c156576d9f43ba250a152ad2482dafbd80cdceded88c66fdee5c80d4"
 },
 {
  "file": "docs/superpowers/source-lab/c2-t1-host-json-fix1/candidate13.json",
  "blob": "e2ca46e8ecf98dd0d87f148068dd240b147db1ec",
  "bytes": 11467,
  "sha256": "87049774b9728c99aa85c6a1d3eea5a16dc6e3412dea9f41a0cca984ee5325d7"
 },
 {
  "file": "docs/superpowers/source-lab/c2-t1-host-json-fix1/s10-candidate.txt",
  "blob": "cb95e1f3b2e6c14d07f661f1b818c38d470564d7",
  "bytes": 88713,
  "sha256": "cbff758701ae58c915efdc2489f6b770b0f22224cedfc73fcfd28df026e1b8fa"
 },
 {
  "file": "docs/superpowers/source-lab/c2-t1-host-json-fix1/host-controls.mjs",
  "blob": "18bc9a01789895579428c7bddbd7c270a249b34a",
  "bytes": 10347,
  "sha256": "8e61495d630df333f68b441d6de7a898ebaeccb674facfe0e7bf30b1fb6ccbf9"
 },
 {
  "file": ".github/workflows/afw-c2-host-json-fix1-tools.yml",
  "blob": "a5e5e7aa550fa406c3f84bea6a4505becdb11e93",
  "bytes": 1408,
  "sha256": "048e167151a614b992e379dd7eac737ec995ae6b4c2eda31ff7d71fb5b52779f"
 }
];
const repo = 'tokenizartinfo-ops/agent-friendly-web';
const branch = 'lab/afw-c2-source-20261116-host-json-fix1-tools';
const job = 'c2-host-json-fix1-tools';
const original = '6791ce1bab9372e206d3c7b42b3e1394dc6e0c68';
const baseTree = '62e78926635d6b74f288d6c0d69e0f2516306989';
const here = dirname(fileURLToPath(import.meta.url));
const ws = await realpath(process.env.GITHUB_WORKSPACE);
const temp = await realpath(process.env.RUNNER_TEMP);
const uid = process.getuid(), gid = process.getgid();
const sum = (kind, bytes) => createHash(kind).update(bytes).digest('hex');
const git = bytes => sum('sha1', Buffer.concat([Buffer.from('blob ' + bytes.length + '\0'), bytes]));
const utf8 = bytes => new TextDecoder('utf-8', {fatal: true}).decode(bytes);
function within(root, file) {
  const p = resolve(root, file);
  assert.ok(p.startsWith(root + '/') && !file.split('/').some(x => !x || x === '.' || x === '..'));
  return p;
}
async function checkedFile(root, file, pin, bound = 4 * 1024 * 1024) {
  const path = within(root, file);
  assert.equal(await realpath(path), path);
  const a = await lstat(path);
  assert.ok(a.isFile() && !a.isSymbolicLink() && a.size <= bound);
  const bytes = await readFile(path);
  const b = await lstat(path);
  assert.ok(a.dev === b.dev && a.ino === b.ino && a.size === b.size && a.mtimeMs === b.mtimeMs && a.ctimeMs === b.ctimeMs && bytes.length === a.size);
  if (pin) {
    assert.equal(git(bytes), pin.blob);
    if (pin.bytes !== undefined) assert.equal(bytes.length, pin.bytes);
    if (pin.sha256 !== undefined) assert.equal(sum('sha256', bytes), pin.sha256);
  }
  return bytes;
}
function revision(...args) {
  const r = spawnSync('git', args, {cwd: ws, encoding: 'utf8', maxBuffer: 32768});
  assert.ok(!r.error && r.status === 0 && !r.signal);
  return r.stdout.trim();
}
async function place(root, file, bytes) {
  const destination = within(root, file);
  await mkdir(dirname(destination), {recursive: true, mode: 0o700});
  assert.equal(await realpath(dirname(destination)), dirname(destination));
  await writeFile(destination, bytes, {flag: 'wx', mode: 0o600});
}
assert.equal(process.version, 'v22.23.4');
assert.equal(process.env.GITHUB_REPOSITORY, repo);
assert.equal(process.env.GITHUB_REF, 'refs/heads/' + branch);
assert.equal(process.env.GITHUB_EVENT_NAME, 'push');
assert.equal(process.env.GITHUB_RUN_ATTEMPT, '1');
assert.equal(process.env.GITHUB_JOB, job);
assert.match(process.env.GITHUB_RUN_ID, /^[1-9]\d*$/);
assert.ok(uid > 0 && gid > 0 && !temp.startsWith(ws + '/') && temp !== ws);
const head = revision('rev-parse', 'HEAD'), tree = revision('rev-parse', 'HEAD^{tree}');
assert.equal(head, process.env.GITHUB_SHA);
assert.equal(revision('rev-parse', 'HEAD^'), original);
assert.equal(revision('rev-parse', 'HEAD^' + '^{tree}'), baseTree);
assert.equal(revision('show', '-s', '--format=%B', 'HEAD'), 'AFW-C2-HOST-JSON-FIX1-TOOLS-ONEUSE-20261116');
const self = relative(ws, fileURLToPath(import.meta.url)), expectedSelf = revision('rev-parse', 'HEAD:' + self);
const selfBytes = await checkedFile(ws, self, {blob: expectedSelf});
const proofInputs = [...inputs, {file: self, blob: expectedSelf, bytes: selfBytes.length, sha256: sum('sha256', selfBytes)}];
const bodies = new Map();
for (const i of inputs) {
  assert.ok(!bodies.has(i.file));
  bodies.set(i.file, await checkedFile(ws, i.file, i));
}
const payload = name => JSON.parse(utf8(bodies.get(relative(ws, join(here, name)))));
const vectors = payload('fixture-first.json'), manifest = payload('repo-imports.json'), targets = payload('targets.json');
const normal = payload('normal13.json'), next = payload('candidate13.json');
const originalPath = 'test/fixtures/finite-initial-entry-world.mjs';
assert.equal(normal.entries.length, 13);
assert.equal(next.entries.length, 13);
assert.equal(targets.rows.length, 13);
assert.equal(manifest.entry, originalPath);
assert.deepEqual(targets.rows.map(row => row.path), normal.entries.map(e => e.path));
assert.deepEqual(targets.rows.filter((row, n) => {
  assert.equal(row.old.blob, normal.entries[n].after.blob);
  assert.equal(row.candidate.blob, next.entries[n].after.blob);
  return row.old.blob !== row.candidate.blob;
}).map(row => row.path), [originalPath]);
const targetMap = new Map(targets.rows.map(row => [row.path, row]));
const selected = [...manifest.files, ...manifest.initData];
assert.equal(new Set(selected.map(row => row.path)).size, selected.length);
const closure = payload('package-closure.json');
assert.equal(closure.lock, manifest.packages.lock);
assert.deepEqual(closure.direct, manifest.packages.direct);
const packageData = await checkedFile(ws, 'package.json', {blob: manifest.packages.manifest});
const lockData = await checkedFile(ws, 'package-lock.json', {blob: manifest.packages.lock});
const lock = JSON.parse(utf8(lockData));
for (const [key, value] of Object.entries(closure.packages)) {
  assert.equal(lock.packages[key].version, value.version);
  assert.equal(lock.packages[key].integrity, value.integrity);
}
const root = await mkdtemp(join(temp, 'afw-c2-host-json-fix1-'));
assert.equal(await realpath(root), root);
const dirIdentity = await lstat(root);
assert.ok(dirIdentity.isDirectory() && !dirIdentity.isSymbolicLink() && dirIdentity.uid === uid);
const caseProof = {};
let cleaned = false;
function environment() {
  return {PATH: [dirname(process.execPath), '/usr/bin', '/bin'].join(delimiter), HOME: root, TMPDIR: root, LANG: 'C.UTF-8', CI: 'true'};
}
async function measureTargets(mode) {
  const hashes = [];
  for (const row of targets.rows) {
    const bytes = await checkedFile(join(root, mode), row.path, row[mode]);
    hashes.push(sum('sha256', bytes));
  }
  return hashes;
}
function readTap(raw, mode) {
  assert.ok(raw.length > 0 && raw.length <= 6144, 'bounded native TAP');
  const text = utf8(raw), old = mode === 'old';
  assert.ok(text.endsWith('\n') && !/[\u0000\u001b]/.test(text));
  const lines = text.replaceAll('\r\n', '\n').split('\n');
  assert.equal(lines.filter(s => s === 'TAP version 13').length, 1);
  const cases = lines.map((s, i) => ({i, match: /^(ok|not ok) (\d+) - (.+)$/.exec(s)})).filter(row => row.match);
  assert.equal(cases.length, 4);
  for (let j = 0; j < cases.length; j++) {
    const {match} = cases[j];
    assert.equal(Number(match[2]), j + 1);
    assert.equal(match[3], vectors.nativeIds[j]);
    assert.equal(match[1], old && j === 0 ? 'not ok' : 'ok');
  }
  for (const [name, value] of Object.entries({tests: 4, pass: old ? 3 : 4, fail: old ? 1 : 0, skipped: 0, todo: 0, cancelled: 0})) {
    assert.deepEqual(lines.filter(s => s.startsWith('# ' + name + ' ')), ['# ' + name + ' ' + value]);
  }
  assert.deepEqual(lines.filter(s => /^1\.\./.test(s)), ['1..4']);
  if (old) {
    const block = lines.slice(cases[0].i + 1, cases[1].i).join('\n');
    assert.match(block, /HOST_ENCODE_ONCE singleSerialization/);
    assert.match(block, /^\s+code: ['"]?ERR_ASSERTION['"]?\s*$/m);
    assert.match(block, /^\s+expected: 1\s*$/m);
    assert.match(block, /^\s+actual: 2\s*$/m);
    assert.match(block, /^\s+operator: ['"]?strictEqual['"]?\s*$/m);
  }
  return {exitCode: old ? 1 : 0, ids: cases.map(c => c.match[3]), pass: old ? 3 : 4, fail: old ? 1 : 0,
    tapBytes: raw.length, tapSha256: sum('sha256', raw), tapUtf8: text};
}
async function runSuite(mode, path) {
  const childEnv = {...environment(), AFW_HOST_ROOT: root, AFW_HOST_MODE: mode, AFW_HOST_UID: String(uid),
    AFW_HOST_GID: String(gid), AFW_HOST_PARENT_NET: await readlink('/proc/self/ns/net')};
  const cleanArgs = Object.entries(childEnv).map(([key, value]) => key + '=' + value);
  const args = ['-n', 'unshare', '--net', '--', 'setpriv', '--reuid', String(uid), '--regid', String(gid),
    '--clear-groups', '--no-new-privs', '/usr/bin/env', '-i', ...cleanArgs, process.execPath, '--test',
    '--test-reporter=tap', '--test-concurrency=1', join(here, 'host-controls.mjs')];
  const proc = spawnSync('sudo', args, {cwd: path, timeout: 60000, maxBuffer: 1024*1024});
  assert.ok(!proc.error && !proc.signal, 'isolated host controls did not finish');
  assert.equal(proc.status, mode === 'old' ? 1 : 0, mode + ' suite exit');
  const native = readTap(proc.stdout, mode);
  const facts = [];
  const factDir = join(root, 'facts-' + mode);
  assert.deepEqual((await readdir(factDir)).sort(), ['0.json','1.json','2.json','3.json']);
  for (let j = 0; j < 4; j++) {
    const raw = await checkedFile(factDir, j + '.json', null, 4096);
    const fact = JSON.parse(utf8(raw));
    assert.equal(JSON.stringify(fact) + '\n', utf8(raw));
    assert.deepEqual(Object.keys(fact), ['id','mode','checks','observed']);
    assert.equal(fact.id, vectors.nativeIds[j]);
    assert.equal(fact.mode, mode);
    assert.deepEqual(fact.checks, mode === 'old' && j === 0 ? vectors.checks[j].slice(0, 2) : vectors.checks[j]);
    facts.push(fact);
  }
  assert.equal(facts[0].observed.actualCalls, mode === 'old' ? 2 : 1);
  assert.deepEqual(facts[3].observed.targetHashes, targets.rows.map(row => row[mode].sha256));
  return {native, facts};
}
try {
  await place(root, 'package.json', packageData);
  await place(root, 'package-lock.json', lockData);
  const install = spawnSync('npm', ['ci', '--ignore-scripts', '--no-audit', '--no-fund'], {
    cwd: root, env: environment(), stdio: ['ignore','ignore','ignore']
  });
  assert.ok(!install.error && !install.signal && install.status === 0, 'locked dependency installation failed');
  for (const mode of ['old','candidate']) {
    const path = join(root, mode);
    await mkdir(path, {mode: 0o700});
    await mkdir(join(root, 'facts-' + mode), {mode: 0o700});
    const seen = new Set();
    for (const file of selected) {
      const source = targetMap.get(file.path);
      const body = source ? bodies.get(source[mode].file) : await checkedFile(ws, file.path, file);
      assert.equal(git(body), source ? source[mode].blob : file.blob);
      await place(path, file.path, body);
      seen.add(file.path);
    }
    for (const row of targets.rows) if (!seen.has(row.path)) await place(path, row.path, bodies.get(row[mode].file));
    await measureTargets(mode);
  }
  for (const mode of ['old','candidate']) {
    caseProof[mode] = await runSuite(mode, join(root, mode));
    assert.deepEqual(await measureTargets(mode), caseProof[mode].facts[3].observed.targetHashes);
  }
  const a = caseProof.old.facts, b = caseProof.candidate.facts;
  assert.deepEqual(a[0].observed.wire, b[0].observed.wire);
  assert.deepEqual(a[1].observed, b[1].observed);
  assert.deepEqual(a[2].observed, b[2].observed);
  for (const name of ['errorType', 'failedAppends', 'afterFailure']) assert.deepEqual(a[3].observed[name], b[3].observed[name]);
} finally {
  const check = await lstat(root);
  assert.equal(await realpath(root), root);
  assert.ok(dirname(root) === temp && basename(root).startsWith('afw-c2-host-json-fix1-') && check.isDirectory()
    && !check.isSymbolicLink() && check.uid === uid && check.dev === dirIdentity.dev && check.ino === dirIdentity.ino);
  await rm(root, {recursive: true});
  await assert.rejects(lstat(root), {code: 'ENOENT'});
  cleaned = true;
}
const context = {repository: repo, branch, base: original, baseTree, head, tree, runId: process.env.GITHUB_RUN_ID,
  attempt: 1, job, node: process.version};
const proof = {schema: 'afw.c2-host-json-fix1-tools-proof.v1', context, inputs: proofInputs, native: caseProof,
  originalCalls: caseProof.old.facts[0].observed.actualCalls, candidateCalls: caseProof.candidate.facts[0].observed.actualCalls,
  changedPaths: [originalPath], directPackages: manifest.packages.direct.length, potentialPackages: Object.keys(closure.packages).length,
  sourceImports: manifest.files.length, initData: manifest.initData.length, uniqueTempRemoved: cleaned, isolatedBoth: true,
  SourceBusinessExecution: false, SourceQualified: false, Task1Pass: false, nonclaims: vectors.nonclaims};
const artifact = Buffer.from(JSON.stringify(proof) + '\n', 'utf8');
assert.ok(artifact.length <= 24576);
const outDir = join(ws, 'output');
await mkdir(outDir, {recursive: true});
assert.equal(await realpath(outDir), outDir);
await writeFile(join(outDir, 'c2-host-json-fix1-tools-proof.json'), artifact, {flag: 'wx', mode: 0o600});
process.stdout.write('AFW_C2_HOST_JSON_FIX1_TOOLS_PROOF ' + artifact.toString('utf8'));
