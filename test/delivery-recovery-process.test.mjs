import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, readFile, rm, realpath } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const worker = fileURLToPath(new URL('./fixtures/delivery-recovery-worker.mjs', import.meta.url));
const names = ['llms.txt', 'llms-full.txt'];
const old = [Buffer.from('# Original\r\ncaf\u00e9\r\n'), Buffer.from('# Original full\n')];
const run = (root, mode) => spawnSync(process.execPath, [worker, root, mode], {
  encoding: 'utf8', timeout: 5000, maxBuffer: 65536,
  env: { SystemRoot: process.env.SystemRoot, TMP: tmpdir(), TEMP: tmpdir(), TMPDIR: tmpdir() }
});
async function fixture(t) {
  const parent = await realpath(tmpdir());
  const root = await mkdtemp(join(parent, 'afw-recovery-fixture-'));
  t.after(async () => {
    assert.equal(dirname(root), parent);
    assert(basename(root).startsWith('afw-recovery-fixture-'));
    await rm(root, { recursive: true });
  });
  await mkdir(join(root, 'public'));
  await writeFile(join(root, 'fixture.json'), JSON.stringify({ syntheticOnly: true }));
  for (const [i, name] of names.entries()) await writeFile(join(root, 'public', name), old[i]);
  return root;
}
async function interrupt(root) {
  const result = run(root, 'interrupt');
  assert.equal(result.status, 86, 'planned stop must happen after first update');
  assert.notDeepEqual(await readFile(join(root, 'public', names[0])), old[0]);
  assert.deepEqual(await readFile(join(root, 'public', names[1])), old[1]);
}

test('fresh process restores a partial pair from persistent backups; repeat is harmless', async t => {
  const root = await fixture(t);
  await interrupt(root);
  const result = run(root, 'recover');
  assert.equal(result.status, 0, result.stderr);
  const receipt = JSON.parse(result.stdout);
  assert.equal(receipt.status, 'restored');
  assert.deepEqual(receipt.files.map(f => f.status), ['restored', 'already_original']);
  for (const [i, name] of names.entries()) assert.deepEqual(await readFile(join(root, 'public', name)), old[i]);
  const repeat = run(root, 'recover');
  assert.equal(repeat.status, 0);
  assert(JSON.parse(repeat.stdout).files.every(f => f.status === 'already_original'));
});

for (const scenario of ['third_party_change', 'corrupt_backup', 'corrupt_manifest', 'missing_target']) {
  test(`recovery blocks before any write when ${scenario}`, async t => {
    const root = await fixture(t);
    await interrupt(root);
    if (scenario === 'third_party_change') await writeFile(join(root, 'public', names[1]), 'Third party');
    if (scenario === 'corrupt_backup') await writeFile(join(root, 'backup', names[1]), 'Damaged');
    if (scenario === 'corrupt_manifest') await writeFile(join(root, 'backup', 'manifest.json'), '{}');
    if (scenario === 'missing_target') await rm(join(root, 'public', names[1]));
    const first = await readFile(join(root, 'public', names[0]));
    const result = run(root, 'recover');
    assert.equal(result.status, 2);
    const receipt = JSON.parse(result.stdout);
    assert.equal(receipt.status, 'blocked');
    assert.equal(receipt.writes, 0);
    assert.equal(receipt.files.length, 2);
    assert.deepEqual(await readFile(join(root, 'public', names[0])), first);
  });
}

test('fixture cannot be reinitialized over an existing backup', async t => {
  const root = await fixture(t);
  await interrupt(root);
  const backup = await readFile(join(root, 'backup', names[0]));
  assert.equal(run(root, 'interrupt').status, 2);
  assert.deepEqual(await readFile(join(root, 'backup', names[0])), backup);
});
