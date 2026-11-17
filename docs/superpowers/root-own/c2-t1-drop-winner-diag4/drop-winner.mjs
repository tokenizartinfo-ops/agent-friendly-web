import { gBad, gKeys } from '../c2-t1-finite-get-diag3/legacy/shape.mjs';

const sites = new Set(['S01:247', 'S00:743', 'S04:37', 'S04:43', 'S01:69', 'S01:95', 'UNKNOWN']);
const outers = new Set(['QA_MARKED_STUB_NON_OK', 'STUB_NON_OK', 'DEADLINE_OR_ABORT', 'UNKNOWN']);

function eventMatches(event, id, operation, edge) {
  return event?.id === id && event.operation === operation && event.edge === edge && event.error === null;
}

// Replay and the N2 same-case contradiction are validated before this check.
function canReportDrop(observation, selected) {
  const { witness, native, unknownReason } = observation;
  if (unknownReason !== null || !['prefix', 'complete'].includes(witness.integrity) ||
      native.integrity !== 'prefix' || witness.events.length < 57 || native.cases.length < 14) return false;
  const events = witness.events;
  for (let i = 0; i < 14; i++) {
    const id = selected[i], at = 4 * i;
    if (!eventMatches(events[at], id, 'action', 'enter') || !eventMatches(events[at + 1], id, 'action', 'return') ||
        !eventMatches(events[at + 2], id, 'count', 'enter') || !eventMatches(events[at + 3], id, 'count', 'return') ||
        native.cases[i].id !== id || native.cases[i].status !== 'pass') return false;
  }
  const id = selected[14];
  if (id !== 'C2T1_SCOPE_MISSING' || !eventMatches(events[56], id, 'action', 'enter')) return false;
  if (events.length === 57) {
    return witness.integrity === 'prefix' && witness.openCase?.id === id &&
      witness.openCase.operation === 'action' && witness.afterOpen === false && native.cases.length === 14;
  }
  const action = events[57], row = native.cases[14];
  return action.id === id && action.operation === 'action' && ['return', 'throw'].includes(action.edge) &&
    eventMatches(events[58], id, 'count', 'enter') && eventMatches(events[59], id, 'count', 'return') &&
    row?.id === id && row.status === (action.edge === 'return' ? 'pass' : 'fail');
}

export function dropWinner(observation, selected) {
  const component = observation.dropWinner;
  if (!gKeys(component, ['case', 'site', 'outer', 'publicSite']) ||
      Buffer.byteLength(JSON.stringify(component)) > 512 || component.case !== '15:firstDROP' ||
      !sites.has(component.site) || !outers.has(component.outer) || !sites.has(component.publicSite)) gBad();
  if (component.publicSite !== 'UNKNOWN' &&
      (component.publicSite !== component.site || component.outer !== 'QA_MARKED_STUB_NON_OK')) gBad();
  const asserted = component.site !== 'UNKNOWN' || component.outer !== 'UNKNOWN' || component.publicSite !== 'UNKNOWN';
  if (asserted && (!canReportDrop(observation, selected) || observation.finiteGet.http.state === 'KNOWN')) gBad();
  return { ...component };
}
