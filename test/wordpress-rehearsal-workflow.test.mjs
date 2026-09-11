import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { parse } = require('yaml');

test('WordPress rehearsal is isolated, bounded and preserves failures', () => {
  const text = readFileSync(new URL('../.github/workflows/wordpress-rehearsal.yml', import.meta.url), 'utf8');
  const workflow = parse(text), job = workflow.jobs.rehearsal;
  assert.deepEqual(workflow.permissions, { contents: 'read' });
  assert(workflow.on.workflow_dispatch !== undefined);
  assert.equal(workflow.on.pull_request_target, undefined);
  assert.equal(job['runs-on'], 'ubuntu-24.04');
  assert.equal(job['timeout-minutes'], 12);
  assert.equal(job.steps[0].with['persist-credentials'], false);
  const run = job.steps.find(s => s.id === 'rehearsal');
  assert.equal(run['continue-on-error'], true);
  assert.match(run.run, /Test-WordPressDisposableHttp/);
  const artifact = job.steps.find(s => String(s.uses).startsWith('actions/upload-artifact@'));
  assert.equal(artifact.if, 'always()');
  assert.equal(artifact.with.path, '${{ runner.temp }}/afw-wordpress-receipt.json');
  assert.equal(artifact.with['retention-days'], 7);
  assert.match(job.steps.at(-1).run, /exit 1/);
  assert(!/secrets\.|wrangler|deploy|ssh|pull_request_target/.test(text));
});

test('native PHP contrast is independent and cannot replace the WordPress verdict', () => {
  const workflow = parse(readFileSync(new URL('../.github/workflows/wordpress-rehearsal.yml', import.meta.url), 'utf8'));
  const job = workflow.jobs.native_php;
  assert(job, 'independent native PHP job required');
  assert.equal(job.needs, undefined);
  assert.equal(job['runs-on'], 'ubuntu-24.04');
  assert.equal(job['timeout-minutes'], 3);
  assert.equal(job.steps[0].with['persist-credentials'], false);
  const run = job.steps.find(s => s.id === 'native');
  assert.match(run.run, /Test-NativePhpDeliveryHttp.mjs/);
  assert.equal(run['continue-on-error'], true);
  assert.match(job.steps.at(-1).run, /serverClosed/);
  assert.match(job.steps.at(-1).run, /wordpressTested,false/);
  assert(workflow.on.pull_request.paths.includes('scripts/Test-NativePhpDeliveryHttp.mjs'));
});

test('native WordPress rehearsal is explicit, bounded and separate from Playground', () => {
  const workflow = parse(readFileSync(new URL('../.github/workflows/wordpress-rehearsal.yml', import.meta.url), 'utf8'));
  const job = workflow.jobs.native_wordpress;
  assert(job, 'native WordPress job required');
  assert.equal(job['timeout-minutes'], 8);
  assert.equal(job.needs, undefined);
  assert.equal(job.steps[0].with['persist-credentials'], false);
  assert.match(job.steps.find(s => s.id === 'native_wp').run, /Test-NativeWordPressDeliveryHttp/);
  assert.match(job.steps.at(-1).run, /cleanupVerified,true/);
  assert.match(job.steps.at(-1).run, /automaticAdapterTested,false/);
  assert.match(job.steps.at(-1).run, /updateRollback,"verified_previous_bytes"/);
  assert.match(job.steps.at(-1).run, /updateChecks.length,2/);
  assert.match(job.steps.at(-1).run, /conflictRejected,true/);
  const native = readFileSync(new URL('../scripts/Test-NativeWordPressDeliveryHttp.mjs', import.meta.url), 'utf8');
  assert.match(native, /--protocol=TCP/);
});

test('native WordPress gate requires persistent recovery after partial interruption', () => {
  const workflow = parse(readFileSync(new URL('../.github/workflows/wordpress-rehearsal.yml', import.meta.url), 'utf8'));
  const enforce = workflow.jobs.native_wordpress.steps.at(-1).run;
  assert.match(enforce, /interruptedRecovery.status,"verified_previous_bytes"/);
  assert.match(enforce, /interruptedRecovery.interruptionExit,86/);
  assert.match(enforce, /interruptedRecovery.corruptBackupRejected,true/);
  assert.match(enforce, /interruptedRecovery.thirdPartyRejected,true/);
  assert.match(enforce, /interruptedRecovery.repeatWrites,0/);
  assert.match(enforce, /interruptedRecovery.httpChecks.length,2/);
});
