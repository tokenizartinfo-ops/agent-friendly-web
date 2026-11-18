import { gBad, gKeys } from '../c2-t1-finite-get-diag3/legacy/shape.mjs';

const commandStepName = 'Observe first DROP in the full case order';

// Both workflow families perform the same observation. ACTUAL has an additional syntax step.
export function readOccurrence(input, expected, fixed, transport) {
  const joined = transport.gApiJoin(input.run, input.jobs, input.commit, expected);
  if (!fixed.sourceSteps.includes(commandStepName)) gBad();
  joined.commandStep = input.jobs.jobs[0].steps.find(step => step.name === commandStepName);
  if (!joined.commandStep || !joined.commandStepNumbers.includes(joined.commandStep.number)) gBad();
  const t = input.transport;
  if (!gKeys(t, ['runId', 'jobId', 'rawLog']) || t.runId !== input.run.id || t.jobId !== joined.jobId) gBad();
  return { joined, frames: transport.g20Log(t.rawLog, joined) };
}
