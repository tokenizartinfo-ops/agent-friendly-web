import { inflateRawSync } from 'node:zlib';
import { boundTransport } from '../c2-t1-finite-get-diag3/bound-transport.mjs';
import { d2FirstFailure } from '../c2-t1-finite-get-diag3/legacy/first-failure.mjs';
import { g20Partial } from '../c2-t1-finite-get-diag3/legacy/partial.mjs';
import { gBad, gInt, gKeys, gSame, gSchema } from '../c2-t1-finite-get-diag3/legacy/shape.mjs';
import { dropWinner } from '../c2-t1-drop-winner-diag4/drop-winner.mjs';
import { ACTUAL, MODEL_ONLY, sha256 } from './bindings.mjs';
import { readCurrentFiniteGet, readGetWinner } from './get-winner.mjs';

function bindTrusted(trusted, binding) {
  if (!gKeys(trusted, ['expected', 'bodyEdges', 'bodyEdgesHash', 'commandStepNumber', 'artifactId']) ||
      !gSame(trusted.bodyEdges, binding.edges) || trusted.bodyEdgesHash !== binding.edgeHash ||
      sha256(JSON.stringify(trusted.bodyEdges)) !== binding.edgeHash ||
      !gInt(trusted.commandStepNumber, 1, 1000) || !gInt(trusted.artifactId, 1, Number.MAX_SAFE_INTEGER)) gBad();
  return new Map(binding.edges.map(edge => [edge.path, edge]));
}

function joinOccurrence(input, trusted, binding, transport) {
  const joined = transport.gApiJoin(input.run, input.jobs, input.commit, trusted.expected);
  const job = input.jobs.jobs[0];
  joined.commandStep = job.steps.find(step => step.name === binding.captureStep);
  const artifactStep = job.steps.find(step => step.name === binding.artifactStep);
  if (!joined.commandStep || joined.commandStep.number !== trusted.commandStepNumber ||
      !joined.commandStepNumbers.includes(joined.commandStep.number) || !artifactStep ||
      !joined.commandStepNumbers.includes(artifactStep.number)) gBad();
  const raw = input.transport;
  if (!gKeys(raw, ['runId', 'jobId', 'rawLog']) || raw.runId !== input.run.id || raw.jobId !== joined.jobId) gBad();
  return { joined, artifactStep, frames: transport.g20Log(raw.rawLog, joined) };
}

function verifyTree(input, trusted, binding, transport, edges) {
  const tree = transport.g20Tree(input.tree, trusted.expected, edges);
  let leaves = 0;
  for (const item of input.tree.tree) {
    if (item.type !== 'tree') leaves++;
    if (item.type !== 'tree' && binding.overlayPrefixes.some(prefix => item.path.startsWith(prefix)) &&
        !edges.has(item.path)) gBad();
  }
  if (binding.leafCount !== null && leaves !== binding.leafCount) gBad();
  return tree;
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

function readArtifact(input, trusted, binding, joined, artifactStep, transport, outcome) {
  const a = input.artifact, spec = binding.fixed.sourceNomination.artifact;
  if (!gKeys(a, ['runId', 'jobId', 'listing', 'artifactId', 'fileName', 'archiveBase64', 'payloadText']) ||
      a.runId !== trusted.expected.runId || a.jobId !== joined.jobId || a.artifactId !== trusted.artifactId ||
      a.fileName !== spec.fileName || typeof a.payloadText !== 'string' || Buffer.byteLength(a.payloadText) > 24577 ||
      a.payloadText !== JSON.stringify(outcome) + '\n' || a.listing?.total_count !== 1 ||
      !Array.isArray(a.listing.artifacts) || a.listing.artifacts.length !== 1) gBad();
  const item = a.listing.artifacts[0];
  const zip = transport.gZipPayload(a.archiveBase64, a.fileName, inflateRawSync);
  const digest = sha256(zip.archive);
  if (!item || item.id !== a.artifactId || item.name !== spec.name || item.expired !== false ||
      item.size_in_bytes !== zip.archive.length || item.digest !== 'sha256:' + digest ||
      item.workflow_run?.id !== trusted.expected.runId || item.workflow_run?.head_sha !== trusted.expected.head ||
      item.workflow_run?.head_branch !== trusted.expected.branch || !zip.payload.equals(Buffer.from(a.payloadText))) gBad();
  const time = transport.gTime, created = time(item.created_at), expires = time(item.expires_at);
  if (created < time(artifactStep.started_at) - 1000 || created > time(artifactStep.completed_at) + 1000 ||
      Math.abs(expires - created - spec.retentionDays * 86400000) > 1000) gBad();
  return { id: item.id, archiveBytes: zip.archive.length, archiveSha256: digest,
    payloadBytes: zip.payload.length, payloadSha256: sha256(zip.payload) };
}

function readBound(input, trusted, binding) {
  const edges = bindTrusted(trusted, binding);
  if (!gKeys(input, ['run', 'jobs', 'commit', 'tree', 'transport', 'artifact'])) gBad();
  const { fixed, schema, wire } = binding;
  const transport = boundTransport(fixed);
  const { joined, artifactStep, frames: [first, second] } = joinOccurrence(input, trusted, binding, transport);
  const tree = verifyTree(input, trusted, binding, transport, edges);
  const custody = readFrame(first, wire.custody, 1024, schema, 'custody');
  const outcome = readFrame(second, wire.outcome, 24576, schema, 'outcome');
  if (!gSame(custody.context, joined.context) || !gSame(outcome.context, joined.context) ||
      !gSame(outcome.custody, custody) || custody.checkedProcesses !== custody.preflightProcesses + custody.greenProcesses) gBad();
  const artifact = readArtifact(input, trusted, binding, joined, artifactStep, transport, outcome);

  const observation = outcome.observation;
  const replay = g20Partial(observation, sha256);
  const firstFailure = d2FirstFailure(observation);
  const getWinner = readGetWinner(observation, binding);
  const finiteGet = readCurrentFiniteGet(observation, binding);
  const drop = dropWinner(observation, binding.selected);
  return { diagnosticCollectionAccepted: true, context: joined.context, jobId: joined.jobId,
    commandStepNumber: joined.commandStep.number, tree, replay, firstFailure, finiteGet, dropWinner: drop,
    getWinner, observation, bindingKind: binding.kind, finalSourceBinding: false, sourceReads: outcome.sourceReads,
    custody, capture: observation.capture, artifact, nativeQualification: false, SourceQualified: false,
    Task1Pass: false, nonclaims: outcome.nonclaims };
}

// The independently acquired Root API tuple supplies trusted expected IDs. The packet cannot supply them.
export function readGetWinnerActual(input, trusted) { return readBound(input, trusted, ACTUAL); }
export function readGetWinnerModel(input, trusted) { return readBound(input, trusted, MODEL_ONLY); }
