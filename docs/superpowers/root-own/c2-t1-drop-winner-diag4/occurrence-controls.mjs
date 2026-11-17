import assert from 'node:assert/strict';
import { D4_MODEL, D4_ACTUAL } from './bindings.mjs';
import { boundTransport } from '../c2-t1-finite-get-diag3/bound-transport.mjs';
import { readOccurrence } from './occurrence.mjs';

function reject(operation) {
  assert.throws(operation, error => error?.constructor === Error && error.message === 'G20_OWN_UNQUALIFIED');
}

// API/log adapters only. Fake IDs and timestamps are scoped to the unit test.
export function exerciseOccurrenceUnits(fixture) {
  const ids = [];
  for (const [family, binding, commandIndex] of [['MODEL5', D4_MODEL, 3], ['ACTUAL6', D4_ACTUAL, 4]]) {
    const input = structuredClone(fixture.input), expected = structuredClone(fixture.trusted.expected);
    const job = input.jobs.jobs[0], required = binding.fixed.sourceSteps;
    expected.requiredSteps = [...required];
    if (family === 'ACTUAL6') {
      const syntax = { ...job.steps[2], name: required[2], completed_at: job.steps[2].started_at };
      job.steps.splice(2, 0, syntax);
      job.steps.forEach((step, i) => { step.number = i + 2; });
    }
    const bound = boundTransport(binding.fixed);
    const invoke = (candidate = input) => readOccurrence(candidate, expected, binding.fixed, bound);
    const { joined, frames } = invoke();
    assert.equal(job.steps.length, required.length);
    assert.equal(joined.commandStep.number, job.steps[commandIndex].number);
    assert.equal(joined.commandStep.name, 'Observe first DROP in the full case order');
    assert.equal(frames.length, 2);
    ids.push(family + '_COMMAND_WINDOW');
    const shifted = structuredClone(input);
    shifted.transport.rawLog = shifted.transport.rawLog.replace('01:03:36.', '01:00:10.');
    reject(() => invoke(shifted)); ids.push(family + '_SHIFTED_MARKER');
    const foreign = structuredClone(input);
    foreign.transport.rawLog = foreign.transport.rawLog.replace('##[group]Run node ', '##[group]Run other ');
    reject(() => invoke(foreign)); ids.push(family + '_FOREIGN_COMMAND');
    const missing = structuredClone(input);
    missing.jobs.jobs[0].steps[commandIndex].name = 'Foreign observation';
    reject(() => invoke(missing)); ids.push(family + '_FOREIGN_STEP');
  }
  return ids;
}
