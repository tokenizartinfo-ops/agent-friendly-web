import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { G20_FIXED } from '../c2-t1-finite-get-diag3/legacy/fixed.mjs';
import { gInt, gKeys, gSame } from '../c2-t1-finite-get-diag3/legacy/shape.mjs';

const REPOSITORY = 'tokenizartinfo-ops/agent-friendly-web';
const BASE = '6791ce1bab9372e206d3c7b42b3e1394dc6e0c68';
const BASE_TREE = '62e78926635d6b74f288d6c0d69e0f2516306989';
const PROPOSAL = 'de40fdd5cb0a0aabdf0f0c52281c80ecb2734ab5';
const ROOT = 'dd2899bb2c0883008ccb12dfb911f0d10aecb072';
const SCHEMA = '39e692752ac8813a5a64b42fd7d38b6b00ff7d70';
const SELECTION = '2cabed0cd5d8c26fb4eb84eb41fd1034ea31dac0';
const SOURCE13 = 'adf5e3d04562a34718cce9a04ccb480bc70fa694';
const EDGE_DIGEST = '40b9e19ef3c2307e8b39995b1ce89b8aaa13e1c99931a51a46b805120fa85e29';
const SELECTION_COMPACT = 'fb6ced1bf3690203191d271d268745b86a1fab3cbcb4174d8bec6362ff5a49fd';
const SELECTION_WIRE = 'e454749c9bf2b2e4031bbfc10f10d54e75b4e1c7cc29edc6b0844fa0e3d10d8b';
const MODEL = '75154471e2ea014677fc5176ff2f734262a3c365';
const SOURCE_PREFIX = 'docs/superpowers/source-lab/c2-get-winner-dependent-diagnostic/';
const SOURCE_OVERLAY_PREFIX = 'docs/superpowers/source-lab/c2-get-winner-dependent/';
const CURRENT_SITE = { file: 'S08', line: 18, column: 143 };
const CURRENT_WIRE = {
  family: 'afw.c2-get-winner-observation1',
  custody: 'AFW_C2_GET_WINNER_OBSERVATION1_CUSTODY',
  outcome: 'AFW_C2_GET_WINNER_OBSERVATION1_OUTCOME',
  fault: 'AFW_C2_GET_WINNER_OBSERVATION1_FAULT'
};
const SOURCE_STEPS = [
  'Read the exact one-use lab head',
  'Use the fixed Node runtime',
  'Check the business controller syntax',
  'Install only the existing locked dependencies',
  'Observe first finite GET in full case order',
  'Preserve the bounded first finite GET diagnostic'
];
const SOURCE_COMMAND_STEP = SOURCE_STEPS[4];

const assert = ok => { if (!ok) throw Error('GET_WINNER_BINDING_INTEGRITY'); };
export const sha256 = bytes => createHash('sha256').update(bytes).digest('hex');
export const gitBlob = bytes => createHash('sha1').update('blob ' + bytes.length + '\0').update(bytes).digest('hex');

function readJson(path, blob) {
  const bytes = readFileSync(new URL(path, import.meta.url));
  assert(gitBlob(bytes) === blob);
  return { value: JSON.parse(bytes), bytes: bytes.length, sha256: sha256(bytes), blob };
}

function freeze(value) {
  if (value && typeof value === 'object') {
    Object.values(value).forEach(freeze);
    Object.freeze(value);
  }
  return value;
}

function assertEdges(edges, edgeHash) {
  assert(Array.isArray(edges) && edges.length === 26 &&
    new Set(edges.map(e => e.path)).size === 26 && sha256(JSON.stringify(edges)) === edgeHash);
  for (const edge of edges) {
    assert(gKeys(edge, ['path', 'mode', 'type', 'blob', 'bytes', 'sha256']) &&
      typeof edge.path === 'string' && edge.path.length > 0 && edge.mode === '100644' &&
      edge.type === 'blob' && /^[0-9a-f]{40}$/.test(edge.blob) && /^[0-9a-f]{64}$/.test(edge.sha256) &&
      gInt(edge.bytes, 1, 33554432));
  }
}

function actualBinding() {
  const proposal = readJson('./data/actual-source-proposal.json', PROPOSAL);
  const { value: root } = readJson('./data/actual-root26.json', ROOT);
  const proof = readJson('./data/actual-frame-schema.json', SCHEMA);
  const selection = readJson('./data/actual-selection.json', SELECTION);
  const edges = root.bodyEdges, { nomination: sourceNomination } = proposal.value;
  const { value: schema } = proof;
  assert(proposal.value.repository === REPOSITORY && root.repository === REPOSITORY &&
    proposal.value.base === BASE && root.base === BASE &&
    proposal.value.baseTree === BASE_TREE && root.baseTree === BASE_TREE &&
    proposal.value.originalLeaves === 3203 && proposal.value.totalLeaves === 3229);
  assert(gSame(root.index, { bytes: proposal.bytes, sha256: proposal.sha256, blob: PROPOSAL }));
  assertEdges(edges, EDGE_DIGEST);
  assert(root.measured === true && root.bodyEdgesHash === EDGE_DIGEST &&
    proposal.value.bodyEdgesHash === EDGE_DIGEST && root.fullMeasurement.bodies === 26 &&
    root.fullMeasurement.canonicalBytes === Buffer.byteLength(JSON.stringify(edges)) &&
    root.fullMeasurement.bytes === edges.reduce((sum, edge) => sum + edge.bytes, 0) &&
    root.fullMeasurement.orderedIndexThen13Sources === true &&
    root.fullMeasurement.allGitBlobSHA1AndSHA256Matched === true);
  assert(gSame(edges, proposal.value.mountLeaves.map(row => ({
    path: row.path, mode: row.mode, type: 'blob', blob: row.blob, bytes: row.bytes, sha256: row.sha256
  }))));
  const index = edges[0];
  const describes = (edge, measured) => edge.blob === measured.blob &&
    edge.bytes === measured.bytes && edge.sha256 === measured.sha256;
  assert(describes(index, root.source13) && index.path === root.source13.path &&
    gSame(root.source13, proposal.value.source13) && index.blob === SOURCE13 &&
    index.path === SOURCE_PREFIX + 'source-index.json' &&
    selection.value.sourceIndexBlob === SOURCE13 && selection.value.sourceIndexSha256 === index.sha256);
  assert(describes(edges[16], selection) && edges[16].path === SOURCE_PREFIX + 'mode-selection.json' &&
    describes(edges[17], proof) && edges[17].path === SOURCE_PREFIX + 'frame-schema.json' &&
    selection.bytes === 4403 && selection.sha256 === SELECTION_WIRE &&
    root.selectionWireSha256 === SELECTION_WIRE &&
    sha256(JSON.stringify(selection.value)) === SELECTION_COMPACT &&
    root.selectionCanonicalSha256 === SELECTION_COMPACT &&
    proposal.value.selectionWireSha256 === SELECTION_COMPACT);
  assert(selection.value.node === 'v22.23.4' && gSame(selection.value.selected, G20_FIXED.selected) &&
    gSame(selection.value.selected, proposal.value.caseOrder) &&
    gSame(selection.value.finiteGet.site, CURRENT_SITE) &&
    selection.value.finiteGet.ordinal === 15 && selection.value.finiteGet.targetId === 'C2T1_SCOPE_MISSING' &&
    selection.value.selected[14] === selection.value.finiteGet.targetId &&
    proposal.value.publicWire.case15Assert === 'S08:18:143');
  assert(selection.value.aliases.length === 13 && selection.value.aliases.every((alias, i) => {
    const edge = edges[i + 1];
    if (i === 7) {
      const original = selection.value.originalDriver, derived = selection.value.driver;
      return alias.id === 'D07' && alias.path === derived.path && alias.blob === derived.git &&
        describes(edge, { ...original, blob: original.git }) &&
        describes(edges[21], { ...derived, blob: derived.git }) &&
        edges[21].path === SOURCE_PREFIX + 'diagnostic-driver.txt';
    }
    return alias.blob === edge.blob &&
      (!Object.hasOwn(alias, 'bytes') || describes(edge, alias));
  }));
  assert(sourceNomination.prefix === SOURCE_PREFIX &&
    sourceNomination.branch === 'lab/afw-c2-get-winner-20261117-diagnostic1' &&
    sourceNomination.workflow === '.github/workflows/afw-c2-get-winner-diagnostic1.yml' &&
    sourceNomination.message === 'AFW-C2-GET-WINNER-DIAGNOSTIC1-ONEUSE-20261117' &&
    sourceNomination.job === 'c2-get-winner-diagnostic1' && sourceNomination.jobMinutes === 7 &&
    sourceNomination.event === 'push' && sourceNomination.attempt === 1 &&
    sourceNomination.runner === SOURCE_PREFIX + 'run-get-winner-diagnostic.mjs' &&
    sourceNomination.command === 'node ' + sourceNomination.runner &&
    sourceNomination.commandStep === SOURCE_COMMAND_STEP &&
    gSame(sourceNomination.requiredSteps, SOURCE_STEPS) &&
    gSame(sourceNomination.artifact, { name: 'afw-c2-get-winner-diagnostic1',
      path: 'output/c2-get-winner-diagnostic1.json', fileName: 'c2-get-winner-diagnostic1.json', retentionDays: 7 }));
  for (const [key, value] of Object.entries(CURRENT_WIRE)) assert(proposal.value.publicWire[key] === value);
  const props = schema.$defs.context.properties;
  const pinnedContext = {
    repository: REPOSITORY, baselineSource: BASE, baselineTree: BASE_TREE, sourceIndexBlob: SOURCE13,
    proposalIndexHash: index.sha256, selectionHash: SELECTION_COMPACT, runAttempt: 1,
    job: sourceNomination.job, node: 'v22.23.4'
  };
  for (const [key, value] of Object.entries(pinnedContext)) assert(props[key].const === value);
  const sourceHashes = edges.slice(1, 14).map(edge => edge.sha256);
  const sourceReads = schema.$defs.sourceReads.properties;
  assert(gSame(sourceReads.beforeSha256.const, sourceHashes) && gSame(sourceReads.afterSha256.const, sourceHashes));
  const fixed = {
    base: BASE, baseTree: BASE_TREE, sourceNomination, sourceSteps: SOURCE_STEPS, indexBlob: SOURCE13,
    indexHash: index.sha256, selectionHash: SELECTION_COMPACT
  };
  return freeze({ kind: 'ROOT_PINNED_GET_WINNER_PRODUCER_DATA', edges, edgeHash: EDGE_DIGEST,
    fixed, schema, selected: selection.value.selected, site: CURRENT_SITE, wire: CURRENT_WIRE,
    captureStep: SOURCE_COMMAND_STEP, artifactStep: SOURCE_STEPS[5],
    overlayPrefixes: [SOURCE_OVERLAY_PREFIX], leafCount: 3229 });
}

function modelBinding(actual) {
  const { value: model } = readJson('./data/model26.json', MODEL);
  assert(model.kind === 'MODELED_ONLY' && model.base === BASE && model.baseTree === BASE_TREE &&
    gSame(model.nomination.requiredSteps, SOURCE_STEPS) && model.nomination.commandStep === SOURCE_COMMAND_STEP &&
    model.nomination.event === 'push' && model.nomination.attempt === 1 &&
    model.nomination.branch === 'lab/model/get-winner' && model.nomination.job === 'synthetic-lab' &&
    gSame(model.selected, actual.selected) &&
    sha256(JSON.stringify({ kind: model.kind, selected: model.selected })) === model.selectionHash);
  const edges = model.bodyEdges;
  assertEdges(edges, model.bodyEdgesHash);
  const index = edges[0];
  const fixed = {
    base: BASE, baseTree: BASE_TREE, sourceNomination: model.nomination, sourceSteps: SOURCE_STEPS,
    indexBlob: index.blob, indexHash: index.sha256, selectionHash: model.selectionHash
  };
  const schema = structuredClone(actual.schema);
  const props = schema.$defs.context.properties;
  props.sourceIndexBlob.const = index.blob;
  props.proposalIndexHash.const = index.sha256;
  props.selectionHash.const = model.selectionHash;
  props.job.const = model.nomination.job;
  const hashes = edges.slice(1, 14).map(edge => edge.sha256);
  schema.$defs.sourceReads.properties.beforeSha256.const = hashes;
  schema.$defs.sourceReads.properties.afterSha256.const = hashes;
  return freeze({ kind: model.kind, edges, edgeHash: model.bodyEdgesHash, fixed, schema, selected: model.selected,
    site: CURRENT_SITE, wire: CURRENT_WIRE, captureStep: SOURCE_COMMAND_STEP, artifactStep: SOURCE_STEPS[5],
    overlayPrefixes: [], leafCount: null });
}

export const ACTUAL = actualBinding();
export const MODEL_ONLY = modelBinding(ACTUAL);
