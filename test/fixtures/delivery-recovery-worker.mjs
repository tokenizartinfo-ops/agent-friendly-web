import assert from 'node:assert/strict';
import { readFile, mkdir, lstat, realpath, open } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { join, resolve, dirname, basename } from 'node:path';
import { tmpdir } from 'node:os';

// Synthetic local experiment only. Not a hosting connector or production recovery tool.
const names = ['llms.txt', 'llms-full.txt'];
const next = names.map(name => Buffer.from(`# Synthetic revision 2: ${name}\r\n`));
const sha = bytes => createHash('sha256').update(bytes).digest('hex');
const receipt = { syntheticOnly: true, remoteMutation: false, status: 'blocked', writes: 0,
  files: names.map(path => ({ path, status: 'not_changed' })) };
async function regular(path) {
  const info = await lstat(path);
  assert(info.isFile() && !info.isSymbolicLink() && info.nlink === 1 && info.size <= 65536);
  return readFile(path);
}
async function persist(path, bytes, flag) {
  const handle = await open(path, flag, 0o600);
  try { await handle.writeFile(bytes); await handle.sync(); } finally { await handle.close(); }
}
try {
  assert.equal(process.argv.length, 4);
  const root = resolve(process.argv[2]), mode = process.argv[3];
  assert(['interrupt', 'recover'].includes(mode));
  assert.equal(dirname(root), await realpath(tmpdir()));
  assert.match(basename(root), /^afw-recovery-fixture-[a-zA-Z0-9]+$/);
  assert.equal(await realpath(root), root);
  assert.deepEqual(JSON.parse(await regular(join(root, 'fixture.json'))), { syntheticOnly: true });
  const web = join(root, 'public'), backup = join(root, 'backup');
  assert.equal(await realpath(web), web);
  if (mode === 'interrupt') {
    const previous = await Promise.all(names.map(name => regular(join(web, name))));
    await mkdir(backup, { mode: 0o700 }); // Existing backup must never be replaced.
    for (const [i, name] of names.entries()) await persist(join(backup, name), previous[i], 'wx');
    const manifest = { version: 1, files: names.map((name, i) => ({
      name, before: sha(previous[i]), after: sha(next[i])
    })) };
    await persist(join(backup, 'manifest.json'), JSON.stringify(manifest), 'wx');
    assert.equal(sha(await regular(join(web, names[0]))), manifest.files[0].before);
    await persist(join(web, names[0]), next[0], 'w');
    // Exit before the second write and without sharing state with recovery.
    process.exit(86);
  }
  assert.equal(await realpath(backup), backup);
  const manifest = JSON.parse(await regular(join(backup, 'manifest.json')));
  assert.equal(manifest.version, 1);
  assert.equal(manifest.files.length, 2);
  const plan = [];
  // Preflight the entire pair before writes, including the still-original file.
  for (const [i, name] of names.entries()) {
    try {
      const entry = manifest.files[i];
      assert.equal(entry.name, name);
      assert.match(entry.before, /^[a-f0-9]{64}$/);
      assert.equal(entry.after, sha(next[i]));
      const original = await regular(join(backup, name));
      assert.equal(sha(original), entry.before);
      const current = sha(await regular(join(web, name)));
      assert([entry.before, entry.after].includes(current));
      plan.push({ original, current, before: entry.before });
    } catch {
      receipt.files[i].status = 'blocked';
      throw new Error('preflight_failed');
    }
  }
  for (const [i, name] of names.entries()) {
    const item = plan[i];
    try {
      assert.equal(sha(await regular(join(web, name))), item.current);
      if (item.current !== item.before) {
        await persist(join(web, name), item.original, 'w');
        receipt.writes++;
        receipt.files[i].status = 'restored';
      } else receipt.files[i].status = 'already_original';
      assert.equal(sha(await regular(join(web, name))), item.before);
    } catch {
      receipt.files[i].status = 'blocked';
      throw new Error('restore_failed');
    }
  }
  receipt.status = 'restored';
} catch {
  receipt.status = receipt.writes ? 'partial' : 'blocked';
  process.exitCode = 2;
}
console.log(JSON.stringify(receipt));
