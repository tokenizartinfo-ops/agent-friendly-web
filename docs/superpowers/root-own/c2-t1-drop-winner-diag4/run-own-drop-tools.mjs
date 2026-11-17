import { createHash } from 'node:crypto';
import { readFileSync, mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { spawnSync, execFileSync } from 'node:child_process';
import { resolve, relative, sep, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const workspace = resolve(process.env.GITHUB_WORKSPACE || '.');
const prefix = 'docs/superpowers/root-own/c2-t1-drop-winner-diag4/';
const graphPath = prefix + 'native-graph.json';
const graphHash = 'cd99df54188a0443781f96686f7437555616974befce4415fe1861ffa84c4ae9';
const env = process.env;
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
const blob = bytes => createHash('sha1').update('blob ' + bytes.length + '\0').update(bytes).digest('hex');
const check = (ok, message) => { if (!ok) throw Error(message); };
const equal = (a, b) => JSON.stringify(a) === JSON.stringify(b);
function read(path) {
  const file = resolve(workspace, path);
  check(file.startsWith(workspace + sep), 'path outside workspace');
  return readFileSync(file);
}
function git(...args) {
  return execFileSync('git', args, { cwd: workspace, encoding: 'utf8', timeout: 5000, maxBuffer: 60000 }).trimEnd();
}
const graphBytes = read(graphPath);
check(hash(graphBytes) === graphHash, 'graph digest');
const graph = JSON.parse(graphBytes), nom = graph.nomination;
check(process.version === 'v22.23.4' && process.platform === 'linux', 'host');
check(env.GITHUB_ACTIONS === 'true' && env.GITHUB_REPOSITORY === nom.repository &&
  env.GITHUB_REF === 'refs/heads/' + nom.branch && env.GITHUB_JOB === nom.job &&
  env.GITHUB_EVENT_NAME === 'push' && env.GITHUB_RUN_ATTEMPT === '1' &&
  /^[1-9][0-9]*$/.test(env.GITHUB_RUN_ID || '') &&
  env.GITHUB_WORKFLOW_REF === nom.repository + '/' + nom.workflow + '@refs/heads/' + nom.branch, 'one-use context');
const head = git('rev-parse', 'HEAD'), tree = git('rev-parse', 'HEAD^{tree}');
check(head === env.GITHUB_SHA && /^[0-9a-f]{40}$/.test(head) && /^[0-9a-f]{40}$/.test(tree) &&
  git('rev-list', '--parents', '-n', '1', 'HEAD') === head + ' ' + nom.base &&
  git('rev-parse', 'HEAD^:') === nom.baseTree && git('show', '-s', '--format=%B', 'HEAD') === nom.message, 'head');
const self = fileURLToPath(import.meta.url);
check(relative(workspace, self).split(sep).join('/') === nom.runner, 'controller path');
const runnerBytes = readFileSync(self), wanted = new Map();
check(graph.files.length === 171, 'file census');
for (const file of graph.files) {
  check(file.mode === '100644' && file.type === 'blob' && !wanted.has(file.path), 'graph modes and paths');
  const bytes = read(file.path);
  check(bytes.length === file.bytes && hash(bytes) === file.sha256 && blob(bytes) === file.blob, 'changed pinned body: ' + file.path);
  wanted.set(file.path, file.blob);
}
wanted.set(graphPath, blob(graphBytes)); wanted.set(nom.runner, blob(runnerBytes));
const changed = git('diff-tree', '--no-commit-id', '--no-renames', '--raw', '--abbrev=40', '-r', 'HEAD^', 'HEAD').split('\n');
check(changed.length === wanted.size, 'addition census');
for (const row of changed) {
  const match = /^:000000 100644 0{40} ([0-9a-f]{40}) A\t(.+)$/.exec(row);
  check(match && wanted.get(match[2]) === match[1], 'unexpected tree change');
  wanted.delete(match[2]);
}
check(wanted.size === 0 && !existsSync(nom.artifact.path), 'fresh complete tree and receipt');

const result = spawnSync(process.execPath, ['--test', '--test-reporter=tap', '--test-concurrency=1', nom.test],
  { cwd: workspace, timeout: 85000, killSignal: 'SIGKILL', encoding: 'utf8', maxBuffer: 60000 });
if (result.error || result.signal || result.status !== 0) {
  const mismatch = (result.stdout || '').match(/(?:original|D4) fixture mismatch: ([A-Za-z0-9_]{1,96})(?: \(([A-Za-z0-9_ ]{1,40})\))?/);
  throw Error(mismatch ? 'receiver fixture mismatch ' + mismatch[1] + ' ' + (mismatch[2] || '') : 'native controls did not complete successfully');
}
check(result.stderr.length === 0 && Buffer.byteLength(result.stdout) <= 60000, 'test stream bounds');
const lines = result.stdout.split(/\r?\n/);
const once = line => lines.filter(item => item === line).length === 1;
for (const line of ['1..9', '# tests 9', '# suites 0', '# pass 9', '# fail 0', '# skipped 0', '# todo 0', '# cancelled 0']) {
  check(once(line), 'TAP terminal census');
}
check(lines.filter(line => /^(?:not )?ok [0-9]+ - /.test(line)).length === 9, 'TAP group census');
graph.groups.forEach((name, index) => check(once('ok ' + (index + 1) + ' - ' + name), 'TAP group order'));
const marker = '# AFW_OWN_D4_TOOLING ';
const frames = lines.filter(line => line.startsWith(marker));
check(frames.length === 1, 'one covering result');
const wire = frames[0].slice(marker.length), summary = JSON.parse(wire);
check(wire === JSON.stringify(summary) && equal(summary.groups, graph.groups) && equal(summary.units, graph.units) &&
  equal(summary.counts, { original: 73, originalAdmit: 32, added: 69, addedAdmit: 26 }) &&
  summary.originalHash === graph.old73 && summary.addedHash === graph.new69, 'covering result binding');
const proof = {
  schema: 'afw.c2-own-drop-winner-tools-proof.v1', repository: nom.repository, branch: nom.branch,
  workflow: nom.workflow, message: nom.message, head, tree, runId: env.GITHUB_RUN_ID, attempt: 1,
  job: env.GITHUB_JOB, node: process.version, platform: process.platform, graphSha256: graphHash, runnerSha256: hash(runnerBytes),
  rootMeasurement: '1fea33135f8943707738d4f078ff3616e9b5132c',
  source26EdgesSha256: '47d154b05de3d62c8d2af6f49060a82da328e1d5105975be0a883a913f8ee280',
  model26EdgesSha256: 'c9eafc12cfcb8d3b8696f18fd05cdc876728bbacd84c8638e5e334803c6aeae6', fixtureSeal: graph.fixtureSeal,
  originalResultsSha256: summary.originalHash, appendResultsSha256: summary.addedHash, groups: summary.groups,
  adapterUnits: summary.units, counts: graph.counts, actualBusinessExecuted: false, nativeQualification: false,
  finalSourceBinding: false, SourceQualified: false, Task1Pass: false, nonclaims: graph.nonclaims
};
const { gSchema } = await import('../c2-t1-finite-get-diag3/legacy/shape.mjs');
const schema = JSON.parse(read(prefix + 'proof-schema.json'));
check(gSchema(proof, schema, schema), 'tooling receipt schema');
const bytes = JSON.stringify(proof) + '\n';
check(Buffer.byteLength(bytes) <= 4096, 'receipt bytes');
mkdirSync(dirname(nom.artifact.path), { recursive: true });
writeFileSync(nom.artifact.path, bytes, { flag: 'wx' });
console.log('AFW_OWN_D4_TOOLING_MATCHED 142');
