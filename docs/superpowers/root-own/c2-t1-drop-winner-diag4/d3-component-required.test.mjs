import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { inflateRawSync } from 'node:zlib';
import { d3ModelRead } from '../c2-t1-finite-get-diag3/reader.mjs';
import { boundTransport } from '../c2-t1-finite-get-diag3/bound-transport.mjs';
import { D3_MODEL } from '../c2-t1-finite-get-diag3/bindings.mjs';

const sha = body => createHash('sha256').update(body).digest('hex');
const expectedComponent = { case: '15:firstDROP', site: 'S01:247', outer: 'QA_MARKED_STUB_NON_OK', publicSite: 'S01:247' };
const assertionLabel = 'AFW_OWN_D4_RECEIPT_COMPONENT_REQUIRED';
function loadLiteral(file, digest) {
  const raw = readFileSync(new URL(file, import.meta.url));
  assert.equal(sha(raw), digest, 'sealed fixture bytes');
  return JSON.parse(raw);
}
const control = loadLiteral('./d3-control.json', '32e72a9652ad777b3d9dfacdb7b66421f45b2b1e59a073b39dcb848e127e525e');
const twin = loadLiteral('./d3-twin.json', '8c66d4a534c5b74206c70f60345890328cf7d49cb4efb8657c005954dd29e19f');
const receipt = d3ModelRead(control.input, control.trusted, sha, inflateRawSync);
assert.equal(receipt.bindingKind, 'MODELED_ONLY');
assert.equal(receipt.diagnosticCollectionAccepted, true);
assert.equal(receipt.tree.matchedBodyEdges, 25);
assert.equal(receipt.replay.witness.events.length, 57);
assert.equal(receipt.replay.native.cases.length, 14);
assert.deepEqual(receipt.replay.witness.openCase, { id: 'C2T1_SCOPE_MISSING', operation: 'action' });
assert.equal(receipt.replay.witness.afterOpen, false);
assert.equal(receipt.SourceQualified, false);
assert.equal(receipt.Task1Pass, false);
assert.equal(receipt.nativeQualification, false);
assert.equal(receipt.finalSourceBinding, false);
assert.ok(!Object.hasOwn(receipt, 'dropWinner'));
assert.deepEqual(twin.trusted, control.trusted);

const zip = boundTransport(D3_MODEL.fixed).gZipPayload;
function validateEnvelope(input) {
  const art = input.artifact;
  const bytes = zip(art.archiveBase64, art.fileName, inflateRawSync);
  assert.ok(bytes.payload.equals(Buffer.from(art.payloadText)));
  assert.equal(art.listing.artifacts[0].digest, 'sha256:' + sha(bytes.archive));
  assert.equal(art.listing.artifacts[0].size_in_bytes, bytes.archive.length);
  const outcome = JSON.parse(art.payloadText);
  assert.equal(JSON.stringify(outcome) + '\n', art.payloadText);
  const marker = ' AFW_C2_FINITE_GET_DIAG3_OUTCOME ';
  const lines = input.transport.rawLog.split('\n').filter(line => line.includes(marker));
  assert.equal(lines.length, 1);
  assert.equal(lines[0].split(marker)[1] + '\n', art.payloadText);
  return outcome;
}
const before = validateEnvelope(control.input);
const after = validateEnvelope(twin.input);
before.observation.dropWinner = expectedComponent;
assert.equal(JSON.stringify(after), JSON.stringify(before), 'sole semantic addition');
const rebuilt = structuredClone(control.input);
rebuilt.transport.rawLog = rebuilt.transport.rawLog.replace(control.input.artifact.payloadText, twin.input.artifact.payloadText);
const expectedArtifact = rebuilt.artifact;
expectedArtifact.payloadText = twin.input.artifact.payloadText;
expectedArtifact.archiveBase64 = twin.input.artifact.archiveBase64;
expectedArtifact.listing.artifacts[0].digest = twin.input.artifact.listing.artifacts[0].digest;
expectedArtifact.listing.artifacts[0].size_in_bytes = twin.input.artifact.listing.artifacts[0].size_in_bytes;
assert.deepEqual(rebuilt, twin.input, 'all other input bytes and joins');

let supportsComponent = true;
try {
  const admitted = d3ModelRead(twin.input, twin.trusted, sha, inflateRawSync);
  assert.deepEqual(admitted.dropWinner, expectedComponent, 'unexpected receipt projection');
} catch (error) {
  if (error.constructor !== Error || error.message !== 'G20_OWN_UNQUALIFIED') throw error;
  supportsComponent = false;
}
try {
  assert.equal(supportsComponent, true, assertionLabel);
} catch (error) {
  if (!(error instanceof assert.AssertionError) || error.code !== 'ERR_ASSERTION' ||
      error.message.split('\n')[0] !== assertionLabel || error.actual !== false || error.expected !== true) throw error;
  process.stdout.write('AFW_OWN_STAGE_A D3_MODEL_ADMIT_57_14_25 G20_OWN_UNQUALIFIED ' + assertionLabel + '\n');
  throw error;
}
