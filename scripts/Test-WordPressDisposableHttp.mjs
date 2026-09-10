import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { createHash } from 'node:crypto';
import { performance } from 'node:perf_hooks';

// Explicit opt-in integration test. Uses only a fresh, unmounted synthetic WP.
const root = process.argv[2];
if (!root) throw new Error('Pass the local @wp-playground/cli package directory');
const metadata = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
assert.equal(metadata.name, '@wp-playground/cli');
assert.equal(metadata.version, '3.1.53');
const { runCLI } = await import(pathToFileURL(resolve(root, 'index.js')).href);
const sha = data => createHash('sha256').update(data).digest('hex');
const files = { '/llms.txt': '# Synthetic AFW test\n', '/llms-full.txt': '# Synthetic AFW detail\n' };
const started = performance.now();
let cli;
let phase = 'bootstrap';
let report = { contract: 'agentfriendly.wordpress-http-rehearsal.local.v1',
  mode: 'synthetic_disposable', status: 'running', checks: [], remoteMutation: false };
try {
  cli = await runCLI({ command: 'server', port: 0, wp: '6.8.8', php: '8.3',
    login: false, verbosity: 'quiet', mount: [], 'mount-before-install': [] });
  // Upstream currently binds without a host argument. Rebind before test traffic.
  const port = cli.server.address().port;
  await new Promise((resolve, reject) => {
    cli.server.close(error => error ? reject(error) : resolve());
    cli.server.closeAllConnections();
  });
  await new Promise((resolve, reject) => {
    cli.server.once('error', reject);
    cli.server.listen(port, '127.0.0.1', () => { cli.server.off('error', reject); resolve(); });
  });
  assert.equal(cli.server.address().address, '127.0.0.1');
  const origin = `http://127.0.0.1:${port}`;
  const request = async (path, method = 'GET') => {
    assert(['/llms.txt', '/llms-full.txt', '/afw-never-created.txt', '/'].includes(path));
    const response = await fetch(origin + path, { method, redirect: 'manual', signal: AbortSignal.timeout(20000) });
    const body = new Uint8Array(await response.arrayBuffer());
    assert(body.byteLength < 1000000);
    return { status: response.status, type: response.headers.get('content-type'), body,
      location: response.headers.get('location') };
  };
  const info = await cli.playground.run({ code: "<?php require '/wordpress/wp-load.php'; echo json_encode(['version'=>get_bloginfo('version'),'name'=>get_option('blogname')]);" });
  const initial = JSON.parse(info.text);
  report.wordpress = initial.version;
  assert.equal(initial.version, '6.8.8');
  // Playground 3.1.53 deliberately redirects its first HTTP request to itself.
  // Consume exactly this bootstrap response, never relax delivery verification.
  const bootstrap = await request('/');
  assert.equal(bootstrap.status, 302);
  assert.equal(new URL(bootstrap.location, origin).href, origin + '/');
  const homeBefore = await request('/');
  if (homeBefore.status !== 200) {
    const destination = homeBefore.location ? new URL(homeBefore.location, origin) : null;
    console.error(JSON.stringify({ stage: 'home_before', status: homeBefore.status,
      redirectOrigin: destination?.origin, redirectPath: destination?.pathname,
      expectedOrigin: origin, cliServerUrl: cli.serverUrl }));
  }
  assert.equal(homeBefore.status, 200);
  phase = 'initial_absence';
  for (const path of Object.keys(files)) {
    assert.equal((await request(path)).status, 404);
    assert.equal(await cli.playground.fileExists('/wordpress' + path), false);
  }
  const checks = report.checks;
  phase = 'write_and_readback';
  for (const [path, body] of Object.entries(files)) await cli.playground.writeFile('/wordpress' + path, body);
  for (const [path, body] of Object.entries(files)) {
    const response = await request(path), head = await request(path, 'HEAD');
    assert.equal(response.status, 200);
    assert.equal(response.type.split(';')[0], 'text/plain');
    assert.equal(sha(response.body), sha(body));
    assert.equal(head.status, 200); assert.equal(head.body.length, 0);
    checks.push({ path, status: 200, sha256: sha(body), head: 200 });
  }
  phase = 'filesystem_rollback';
  for (const [path, body] of Object.entries(files)) {
    assert.equal(sha(await cli.playground.readFileAsBuffer('/wordpress' + path)), sha(body));
    await cli.playground.unlink('/wordpress' + path);
  }
  phase = 'http_after_rollback';
  report.rollbackObservations = [];
  for (const path of [...Object.keys(files), '/afw-never-created.txt']) {
    const exists = await cli.playground.fileExists('/wordpress' + path);
    const response = await request(path);
    report.rollbackObservations.push({ path, filesystemExists: exists,
      status: response.status, contentType: response.type });
  }
  report.homeAfter = (await request('/')).status;
  for (const observation of report.rollbackObservations) {
    assert.equal(observation.filesystemExists, false);
    assert.equal(observation.status, 404);
  }
  assert.equal(report.homeAfter, 200);
  const after = await cli.playground.run({ code: "<?php require '/wordpress/wp-load.php'; echo json_encode(['name'=>get_option('blogname')]);" });
  assert.equal(JSON.parse(after.text).name, initial.name);
  report = { contract: 'agentfriendly.wordpress-http-rehearsal.local.v1', mode: 'synthetic_disposable', status: 'passed',
    wordpress: initial.version, checks, rollback: 'verified_absent', homepage: 200,
    elapsedMs: Math.round(performance.now() - started), remoteMutation: false,
    limits: ['Synthetic direct filesystem handoff, not CMS plugin installation',
      'Upstream temporary listener exists during bootstrap; test requests use loopback',
      'No CDN, commercial hosting, permissions or production equivalence tested'] };
} catch (error) {
  report = { ...report, status: 'failed', phase, elapsedMs: Math.round(performance.now() - started),
    failure: { code: error?.code === 'ERR_ASSERTION' ? 'assertion_failed' : 'runtime_failed',
      actual: typeof error?.actual === 'number' ? error.actual : null,
      expected: typeof error?.expected === 'number' ? error.expected : null } };
  process.exitCode = 1;
} finally {
  if (cli) await cli[Symbol.asyncDispose]();
}
console.log(JSON.stringify({ ...report, serverClosed: true }, null, 2));
