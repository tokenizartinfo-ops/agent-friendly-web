import test from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { once } from 'node:events';
import { mkdtemp, readFile, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { buildPublicationCapsule, capsuleState } from '../lib/publication-capsule.mjs';
import { compareCapsuleOrigin } from '../lib/origin-comparison.mjs';

test('local HTTP installation verifies delivered bytes, later drift and rollback', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'afw-delivery-'));
  const destination = join(directory, 'llms.txt');
  const server = createServer(async (request, response) => {
    if (request.url !== '/llms.txt') { response.writeHead(404).end(); return; }
    try { const content = await readFile(destination); response.writeHead(200, { 'content-type': 'text/plain; charset=utf-8' }).end(content); }
    catch { response.writeHead(404).end(); }
  });
  try {
    server.listen(0, '127.0.0.1');
    await once(server, 'listening');
    const port = server.address().port;
    const capsule = buildPublicationCapsule({ capsuleId: 'local-http-delivery', projectId: 'synthetic-project', siteId: 'synthetic-site', version: 1, canonicalOrigin: 'https://delivery.example', organization: 'AFW local rehearsal', goals: ['content'], languages: ['es'], selectedResources: ['llms'], ownerRef: 'synthetic-owner', createdAt: '2026-09-30T12:00:00Z', expiresAt: '2026-10-07T12:00:00Z' });
    // Test-only transport mapping. Production SSRF/network rules are unchanged.
    const fetchLimitedPublicUrl = async url => {
      assert.equal(url, 'https://delivery.example/llms.txt');
      const response = await fetch(`http://127.0.0.1:${port}/llms.txt`, { redirect: 'manual', signal: AbortSignal.timeout(5000) });
      const bytes = Buffer.from(await response.arrayBuffer());
      assert.ok(bytes.length < 128 * 1024);
      return { status: response.status, body: bytes.toString('utf8'), bodyBytes: bytes, contentType: response.headers.get('content-type'), truncated: false };
    };
    const compare = () => compareCapsuleOrigin(capsule, { fetchLimitedPublicUrl });
    assert.equal((await compare()).resources[0].status, 'missing');
    const approved = capsuleState({ requiredRoles: ['owner'], approvals: [{ role: 'owner', decision: 'approved' }], expiresAt: capsule.expiresAt, now: '2026-09-30T12:01:00Z' });
    assert.equal(approved, 'approved_for_manual_handoff');
    const file = capsule.files[0];
    await writeFile(destination, file.content, { encoding: 'utf8', flag: 'wx' });
    const installed = await compare();
    assert.equal(installed.resources[0].status, 'unchanged');
    assert.equal(installed.resources[0].currentSha256, file.sha256);
    assert.equal(installed.manifestSha256, capsule.integrity.manifestSha256);
    await writeFile(destination, `${file.content}\nCambio posterior de prueba.\n`);
    const drift = await compare();
    assert.equal(drift.resources[0].status, 'changed');
    assert.notEqual(drift.resources[0].currentSha256, file.sha256);
    await writeFile(destination, file.content);
    assert.equal((await compare()).resources[0].currentSha256, file.sha256);
    assert.equal(installed.limits.remoteMutation, false);
  } finally {
    server.closeAllConnections();
    await new Promise(resolve => server.close(resolve));
    await rm(directory, { recursive: true, force: true });
  }
});
