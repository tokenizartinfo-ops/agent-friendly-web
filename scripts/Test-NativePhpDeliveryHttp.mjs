import assert from 'node:assert/strict';
import { mkdtemp, writeFile, readFile, unlink, access, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve, dirname, basename } from 'node:path';
import { createServer } from 'node:net';
import { spawn, execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { setTimeout as delay } from 'node:timers/promises';

// Independent transport contrast, not WordPress, a plugin or customer hosting.
const sha = value => createHash('sha256').update(value).digest('hex');
const files = { '/llms.txt': '# Synthetic AFW test\n', '/llms-full.txt': '# Synthetic AFW detail\n' };
const started = performance.now();
const report = { contract: 'agentfriendly.native-php-http-contrast.v1', status: 'running',
  wordpressTested: false, remoteMutation: false, checks: [], rollbackObservations: [],
  limits: ['PHP built-in HTTP server only', 'No CMS, plugin, database, CDN or customer hosting tested'] };
let root, child, closed, phase = 'bootstrap';
try {
  assert.equal(process.platform, 'linux', 'Run only on disposable Linux');
  assert.equal(process.argv.length, 2, 'No caller paths, ports or origins accepted');
  report.php = execFileSync('php', ['-n', '-r', 'echo PHP_VERSION;'], { encoding: 'utf8', timeout: 5000 }).trim();
  assert.match(report.php, /^8\./);
  root = await mkdtemp(join(tmpdir(), 'afw-native-php-'));
  const home = '<?php header("Content-Type: text/plain"); echo "Synthetic AFW home";';
  await writeFile(join(root, 'index.php'), home, { flag: 'wx' });
  const reservation = createServer();
  await new Promise((res, rej) => { reservation.once('error', rej); reservation.listen(0, '127.0.0.1', res); });
  const port = reservation.address().port;
  await new Promise((res, rej) => reservation.close(error => error ? rej(error) : res()));
  const origin = `http://127.0.0.1:${port}`;
  // Do not inherit credentials/configuration into the disposable PHP process.
  child = spawn('php', ['-n', '-S', `127.0.0.1:${port}`, '-t', root], {
    env: { PATH: process.env.PATH, LANG: 'C' }, stdio: ['ignore', 'ignore', 'pipe'] });
  let stderr = '';
  child.stderr.on('data', bytes => { stderr = (stderr + bytes.toString()).slice(-4000); });
  let spawnError;
  child.on('error', error => { spawnError = error; });
  closed = new Promise(res => child.once('close', res));
  const request = async (path, method = 'GET') => {
    assert([...Object.keys(files), '/', '/afw-never-created.txt'].includes(path));
    const response = await fetch(origin + path, { method, redirect: 'manual', signal: AbortSignal.timeout(3000) });
    const chunks = []; let length = 0;
    if (response.body) {
      for await (const chunk of response.body) {
        length += chunk.length;
        assert(length <= 131072, 'bounded response required');
        chunks.push(chunk);
      }
    }
    return { status: response.status, type: response.headers.get('content-type'), body: Buffer.concat(chunks) };
  };
  let ready = false;
  for (let attempt = 0; attempt < 40; attempt++) {
    if (spawnError) throw spawnError;
    if (child.exitCode !== null) throw new Error('PHP exited during bootstrap');
    try { ready = (await request('/')).body.toString() === 'Synthetic AFW home'; } catch { /* Bootstrap only. */ }
    if (ready) break;
    await delay(100);
  }
  assert(ready, 'PHP must serve the synthetic home');
  const exists = async path => {
    try { await access(path); return true; } catch (error) { if (error.code === 'ENOENT') return false; throw error; }
  };
  phase = 'initial_absence';
  for (const path of Object.keys(files)) assert.equal((await request(path)).status, 404);
  phase = 'write_and_readback';
  for (const [path, body] of Object.entries(files)) await writeFile(join(root, path.slice(1)), body, { flag: 'wx' });
  for (const [path, body] of Object.entries(files)) {
    const get = await request(path), head = await request(path, 'HEAD');
    assert.equal(get.status, 200); assert.equal(get.type?.split(';')[0], 'text/plain');
    assert.equal(sha(get.body), sha(body)); assert.equal(head.status, 200); assert.equal(head.body.length, 0);
    report.checks.push({ path, status: get.status, contentType: get.type, sha256: sha(get.body), head: head.status });
  }
  phase = 'filesystem_rollback';
  for (const [path, body] of Object.entries(files)) {
    const target = join(root, path.slice(1));
    assert.equal(sha(await readFile(target)), sha(body));
    await unlink(target);
  }
  phase = 'http_after_rollback';
  for (const path of [...Object.keys(files), '/afw-never-created.txt']) {
    const response = await request(path);
    report.rollbackObservations.push({ path, filesystemExists: await exists(join(root, path.slice(1))), status: response.status });
  }
  const after = await request('/');
  report.homepage = after.status;
  for (const observation of report.rollbackObservations) {
    assert.equal(observation.filesystemExists, false); assert.equal(observation.status, 404);
  }
  assert.equal(after.status, 200); assert.equal(after.body.toString(), 'Synthetic AFW home');
  assert.equal(await readFile(join(root, 'index.php'), 'utf8'), home);
  report.rollback = 'verified_absent'; report.status = 'passed';
  // Server stderr is intentionally not exported; fixtures and status suffice here.
  report.serverLogObserved = stderr.length > 0;
} catch (error) {
  report.status = 'failed'; report.phase = phase;
  report.failure = { code: error.code === 'ERR_ASSERTION' ? 'assertion_failed' : 'runtime_failed',
    actual: typeof error.actual === 'number' ? error.actual : null,
    expected: typeof error.expected === 'number' ? error.expected : null };
  process.exitCode = 1;
} finally {
  if (child && closed) {
    child.kill('SIGTERM');
    const escalation = setTimeout(() => child.kill('SIGKILL'), 2000);
    await closed; clearTimeout(escalation);
  }
  report.serverClosed = true;
  if (root) {
    assert.equal(dirname(resolve(root)), resolve(tmpdir()));
    assert(basename(root).startsWith('afw-native-php-'));
    await rm(root, { recursive: true });
  }
  report.tempRemoved = true;
}
report.elapsedMs = Math.round(performance.now() - started);
console.log(JSON.stringify(report, null, 2));
