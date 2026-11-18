import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';

export const sha256 = bytes => createHash('sha256').update(bytes).digest('hex');

function pinnedJson(file, expectedGitBlob) {
  const bytes = readFileSync(new URL(file, import.meta.url));
  const objectId = createHash('sha1').update('blob ' + bytes.length + '\0').update(bytes).digest('hex');
  if (objectId !== expectedGitBlob) throw Error('D4_BINDING_INTEGRITY');
  return JSON.parse(bytes);
}

function deepFreeze(value) {
  if (value && typeof value === 'object') {
    Object.values(value).forEach(deepFreeze);
    Object.freeze(value);
  }
  return value;
}

function binding(kind, edges, edgeHash, nomination, schema, selectionHash, selected) {
  if (edges.length !== 26 || sha256(JSON.stringify(edges)) !== edgeHash) throw Error('D4_BINDING_INTEGRITY');
  const props = schema.$defs.context.properties;
  const index = edges[0];
  if (props.sourceIndexBlob.const !== index.blob || props.proposalIndexHash.const !== index.sha256 ||
      props.selectionHash.const !== selectionHash || props.job.const !== nomination.job) throw Error('D4_BINDING_INTEGRITY');
  const sourceHashes = edges.slice(1, 14).map(edge => edge.sha256);
  for (const phase of ['beforeSha256', 'afterSha256']) {
    if (JSON.stringify(schema.$defs.sourceReads.properties[phase].const) !== JSON.stringify(sourceHashes)) {
      throw Error('D4_BINDING_INTEGRITY');
    }
  }
  const fixed = {
    base: props.baselineSource.const, baseTree: props.baselineTree.const,
    sourceNomination: nomination, sourceSteps: nomination.requiredSteps,
    indexBlob: index.blob, indexHash: index.sha256, selectionHash
  };
  return deepFreeze({ kind, edges, edgeHash, fixed, selected, schema });
}

const root = pinnedJson('./data/root-actual26.json', '1fea33135f8943707738d4f078ff3616e9b5132c');
const proposal = pinnedJson('./data/source-final-index.json', 'fc11e972ceb33c8ce7cdace34aed482d71bb6224');
const actualSchema = pinnedJson('./data/actual-schema.json', '81be13ca960a143d565d55dd958b4e4ff24d3c96');
const actualSelection = pinnedJson('./data/actual-selection.json', '8fe9907fb12fb71361819551df04c2830a78452b');
const model = pinnedJson('./data/model26.json', '53bfd6716ecb04153158e6653700648140528d27');
const modelSchema = pinnedJson('./data/model-schema.json', 'c8e05b8882728cdcfaffa18f5d311256a42851ec');
const modelSelection = pinnedJson('./data/model-selection.json', '162c194073a87e2a3bc906b3b605df28b17ea17f');
if (root.index !== 'fc11e972ceb33c8ce7cdace34aed482d71bb6224' ||
    root.bodyEdgesHash !== '47d154b05de3d62c8d2af6f49060a82da328e1d5105975be0a883a913f8ee280' ||
    sha256(JSON.stringify(actualSelection)) !== root.selectionCanonicalSha256 ||
    sha256(JSON.stringify(modelSelection)) !== model.selectionHash) throw Error('D4_BINDING_INTEGRITY');

export const D4_ACTUAL = binding('ROOT_PINNED_PRODUCER_DATA_R5', root.bodyEdges, root.bodyEdgesHash,
  proposal.nomination, actualSchema, root.selectionCanonicalSha256, actualSelection.selected);
export const D4_MODEL = binding('MODELED_ONLY', model.bodyEdges, model.bodyEdgesHash,
  model.nomination, modelSchema, model.selectionHash, modelSelection.selected);
