import test, { after } from 'node:test';
import { readFileSync } from 'node:fs';
import { inflateRawSync } from 'node:zlib';
import { d4Read, d4ModelRead } from './reader.mjs';
import { sha256 } from './bindings.mjs';
import { exerciseOccurrenceUnits } from './occurrence-controls.mjs';
import { runEvaluation } from '../c2-t1-finite-get-diag3/controls.mjs';

const groups = [
  "FG3_OWN_D2_COMPAT",
  "FG3_OWN_FINITE_GET_KNOWN",
  "FG3_OWN_FINITE_GET_INDEPENDENCE",
  "FG3_OWN_FINITE_GET_POINTERS",
  "FG3_OWN_FINITE_GET_VISIBLE_BLOCKERS",
  "FG3_OWN_FINITE_GET_STREAM_CONSISTENCY",
  "FG3_OWN_FINITE_GET_WIRE",
  "FG3_OWN_FINITE_GET_CALLER_BINDING",
  "DW4_OWN_DROP_WINNER_PUBLIC"
];
const check = (condition, reason) => { if (!condition) throw Error(reason); };
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const read = path => JSON.parse(readFileSync(path));
const old = read(new URL('../c2-t1-finite-get-diag3/selection.json', import.meta.url));
const expectations = read(new URL('./data/expectations.json', import.meta.url));
const seal = read(new URL('./data/fixture-seal.json', import.meta.url));
const oldResults = new Map(), physical = [], added = [], passed = [], units = [];
check(same(old.groups.map(group => group.id), groups.slice(0, 8)), 'old group seal');
check(old.fixtures.length === 73 && new Set(old.fixtures.map(row => row.id)).size === 73, 'old membership');
for (const group of old.groups) {
  await test(group.id, { concurrency: false, timeout: 10000 }, () => {
    for (const id of group.cases) {
      const entry = old.fixtures.find(row => row.id === id);
      check(entry?.group === group.id && !oldResults.has(id), 'old order ' + id);
      const fixture = read(entry.path);
      try {
        check(fixture.id === id, 'identity');
        const result = runEvaluation(fixture, entry.family, sha256, inflateRawSync);
        check(result.id === id, 'old result id');
        oldResults.set(id, result); physical.push(id);
      } catch { throw Error('original fixture mismatch: ' + id); }
    }
    passed.push(group.id);
  });
}

function requireClosed(call) {
  try { call(); } catch (error) {
    check(error.constructor === Error && error.message === 'G20_OWN_UNQUALIFIED', 'wrong rejection');
    return;
  }
  throw Error('unexpected admission');
}

await test(groups[8], { concurrency: false, timeout: 20000 }, () => {
  check(expectations.rows.length === 69 && seal.completeInputs.length === 69, 'D4 count');
  check(new Set(expectations.rows.map(row => row.id)).size === 69, 'D4 unique identities');
  for (const [index, spec] of expectations.rows.entries()) {
    const id = spec.id, pinned = seal.completeInputs[index];
    check(pinned.id === id, 'fixture seal order');
    const fixture = read(new URL('./fixtures/' + id + '.json', import.meta.url));
    check(fixture.id === id && fixture.entry === spec.entry && fixture.actualExpectedSourceContext === null, 'literal identity');
    const enter = spec.entry === 'MODEL' ? d4ModelRead : d4Read;
    try {
      let result;
      if (spec.expected.accepted) {
        const receipt = enter(fixture.input, fixture.trusted);
        const observation = JSON.parse(fixture.input.artifact.payloadText).observation;
        check(spec.entry === 'MODEL' && receipt.diagnosticCollectionAccepted === true &&
          receipt.bindingKind === 'MODELED_ONLY' && receipt.tree.matchedBodyEdges === 26, 'MODEL receipt');
        check(receipt.SourceQualified === false && receipt.Task1Pass === false && receipt.finalSourceBinding === false &&
          receipt.nativeQualification === false && Object.keys(receipt.nonclaims).length === 7 &&
          Object.values(receipt.nonclaims).every(value => value === false), 'nonclaims');
        check(same(receipt.firstFailure, observation.firstFailure) && same(receipt.finiteGet, observation.finiteGet) &&
          same(receipt.replay.witness, observation.witness) && same(receipt.replay.native, observation.native) &&
          receipt.replay.firstThrowSequence === observation.firstThrowSequence &&
          receipt.replay.unknownReason === observation.unknownReason, 'inherited projections');
        check(same(receipt.dropWinner, spec.expected.dropWinner) && JSON.stringify(receipt.dropWinner) === spec.componentWire, 'DROP receipt');
        result = { id, entry: spec.entry, accepted: true, dropWinner: receipt.dropWinner };
      } else {
        requireClosed(() => enter(fixture.input, fixture.trusted));
        result = { id, entry: spec.entry, accepted: false, dropWinner: null };
      }
      added.push(result);
      if (id === 'DW4_O01') {
        units.push(...exerciseOccurrenceUnits(fixture));
        requireClosed(() => d4Read(fixture.input, undefined)); units.push('ACTUAL_MISSING_TRUSTED');
        requireClosed(() => d4ModelRead(fixture.input, undefined)); units.push('MODEL_MISSING_TRUSTED');
      }
    } catch (error) {
      const reason = String(error?.message ?? '').split('\n')[0];
      const safe = ['MODEL receipt', 'nonclaims', 'inherited projections', 'DROP receipt',
        'wrong rejection', 'unexpected admission', 'G20_OWN_UNQUALIFIED'].includes(reason) ? reason : 'unit or receipt failure';
      throw Error('D4 fixture mismatch: ' + id + ' (' + safe + ')');
    }
  }
  passed.push(groups[8]);
});

after(() => {
  check(same(passed, groups) && same(physical, old.physicalGroupedEvaluationIds), 'incomplete or reordered groups');
  const ordered = old.canonicalEvaluationIds.map(id => oldResults.get(id));
  check(ordered.length === 73 && oldResults.size === 73 && ordered.every(Boolean), 'incomplete original results');
  check(added.length === 69 && units.length === 10 && new Set(units).size === 10, 'incomplete D4 results');
  const counts = { original: ordered.length, originalAdmit: ordered.filter(v => v.accepted).length,
    added: added.length, addedAdmit: added.filter(v => v.accepted).length };
  const originalHash = sha256(JSON.stringify(ordered)), addedHash = sha256(JSON.stringify(added));
  check(counts.originalAdmit === 32 && counts.addedAdmit === 26, 'admission counts');
  check(originalHash === '98340b7d3225eb264f802f989de66a2befce4beaca4e9d23bc7a90343fce1cbb' &&
    addedHash === '7bd0f0c8d8ca7a5280cfb2fe3238b93b42dcaeaf49e4a00203f5732e6d98ae27', 'canonical result digests');
  console.log('AFW_OWN_D4_TOOLING ' + JSON.stringify({ groups: passed, units, counts, originalHash, addedHash }));
});
