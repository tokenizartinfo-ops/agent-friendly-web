import { inflateRawSync } from 'node:zlib';
import { gBad, gKeys, gSame, gSchema } from '../c2-t1-finite-get-diag3/legacy/shape.mjs';
import { g20Partial } from '../c2-t1-finite-get-diag3/legacy/partial.mjs';
import { d2FirstFailure } from '../c2-t1-finite-get-diag3/legacy/first-failure.mjs';
import { finiteGet } from '../c2-t1-finite-get-diag3/finite-get.mjs';
import { boundTransport } from '../c2-t1-finite-get-diag3/bound-transport.mjs';
import { D4_ACTUAL, D4_MODEL, sha256 } from './bindings.mjs';
import { readOccurrence } from './occurrence.mjs';
import { dropWinner } from './drop-winner.mjs';

function bindEdges(trusted, binding) {
  if (!gKeys(trusted, ['expected', 'bodyEdges', 'bodyEdgesHash']) ||
      !gSame(trusted.bodyEdges, binding.edges) || trusted.bodyEdgesHash !== binding.edgeHash ||
      sha256(JSON.stringify(trusted.bodyEdges)) !== binding.edgeHash) gBad();
  return new Map(binding.edges.map(edge => [edge.path, edge]));
}

function readFrame(line, marker, cap, schema, definition) {
  const prefix = marker + ' ';
  if (!line.startsWith(prefix)) gBad();
  const wire = line.slice(prefix.length);
  if (Buffer.byteLength(wire) > cap) gBad();
  let body;
  try { body = JSON.parse(wire); } catch { gBad(); }
  if (JSON.stringify(body) !== wire || !gSchema(body, schema.$defs[definition], schema)) gBad();
  return body;
}

function readArtifact(input, expected, joined, fixed, transport, outcome) {
  const a = input.artifact, spec = fixed.sourceNomination.artifact;
  if (!gKeys(a, ['runId', 'jobId', 'listing', 'artifactId', 'fileName', 'archiveBase64', 'payloadText']) ||
      a.runId !== input.run.id || a.jobId !== joined.jobId || a.fileName !== spec.fileName ||
      typeof a.payloadText !== 'string' || Buffer.byteLength(a.payloadText) > 24577 ||
      a.payloadText !== JSON.stringify(outcome) + '\n' || a.listing?.total_count !== 1 ||
      !Array.isArray(a.listing.artifacts) || a.listing.artifacts.length !== 1) gBad();
  const item = a.listing.artifacts[0];
  const zip = transport.gZipPayload(a.archiveBase64, a.fileName, inflateRawSync);
  const digest = sha256(zip.archive);
  if (!item || item.id !== a.artifactId || !Number.isSafeInteger(item.id) || item.id < 1 ||
      item.name !== spec.name || item.expired !== false || item.size_in_bytes !== zip.archive.length ||
      item.digest !== 'sha256:' + digest || item.workflow_run?.id !== input.run.id ||
      item.workflow_run?.head_sha !== expected.head || item.workflow_run?.head_branch !== expected.branch ||
      !zip.payload.equals(Buffer.from(a.payloadText))) gBad();
  const time = transport.gTime, created = time(item.created_at), expires = time(item.expires_at);
  const job = input.jobs.jobs[0];
  if (created < time(job.started_at) - 1000 || created > time(job.completed_at) + 1000 ||
      Math.abs(expires - created - 604800000) > 1000) gBad();
  return { id: item.id, archiveBytes: zip.archive.length, archiveSha256: digest,
    payloadBytes: zip.payload.length, payloadSha256: sha256(zip.payload) };
}

function readBound(input, trusted, binding) {
  const edges = bindEdges(trusted, binding);
  if (!gKeys(input, ['run', 'jobs', 'commit', 'tree', 'transport', 'artifact'])) gBad();
  const { fixed, schema, selected } = binding;
  const transport = boundTransport(fixed);
  const { joined, frames: [first, second] } = readOccurrence(input, trusted.expected, fixed, transport);
  const tree = transport.g20Tree(input.tree, trusted.expected, edges);
  const custody = readFrame(first, 'AFW_C2_DROP_WINNER_DIAG4_CUSTODY', 1024, schema, 'custody');
  const outcome = readFrame(second, 'AFW_C2_DROP_WINNER_DIAG4_OUTCOME', 24576, schema, 'outcome');
  if (!gSame(custody.context, joined.context) || !gSame(outcome.context, joined.context) ||
      !gSame(outcome.custody, custody) || custody.checkedProcesses !== custody.preflightProcesses + custody.greenProcesses) gBad();
  const artifact = readArtifact(input, trusted.expected, joined, fixed, transport, outcome);
  const observation = outcome.observation;
  const replay = g20Partial(observation, sha256);
  const firstFailure = d2FirstFailure(observation);
  const finite = finiteGet(observation, schema, selected);
  const component = dropWinner(observation, selected);
  return { diagnosticCollectionAccepted: true, context: joined.context, jobId: joined.jobId,
    commandStepNumber: joined.commandStep.number, tree, replay, firstFailure, finiteGet: finite,
    dropWinner: component, bindingKind: binding.kind, finalSourceBinding: false, sourceReads: outcome.sourceReads,
    custody, capture: observation.capture, artifact, nativeQualification: false, SourceQualified: false,
    Task1Pass: false, nonclaims: outcome.nonclaims };
}

// trusted.expected is supplied by the independent occurrence reader, never recovered from input.
export function d4Read(input, trusted) { return readBound(input, trusted, D4_ACTUAL); }
export function d4ModelRead(input, trusted) { return readBound(input, trusted, D4_MODEL); }
