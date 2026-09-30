import { compareObservationHistory } from './observation-history.mjs';

/** Relevant in-app updates derived from saved observations. Preferences are not a running scheduler. */
/** @param {{website?:string,history?:Array<{id:string,target:string,checkedAt:string,score:number|null,methodology:string,level?:string}>,monitoringPreference?:string}} [input] */
export function dossierUpdates({ website = '', history = [], monitoringPreference = '' } = {}) {
  let origin;
  try { origin = new URL(website).origin; } catch { return { items: [], scheduledMonitoring: false }; }
  const matching = history.filter(item => item.target === origin && Number.isFinite(Date.parse(item.checkedAt))).slice(0, 5);
  const comparison = compareObservationHistory(matching);
  const latest = matching[0];
  const items = latest ? [{ id: latest.id, kind: comparison ? 'observed_change' : 'observed_snapshot', checkedAt: latest.checkedAt,
    target: origin, score: latest.score, ...(comparison ? { delta: comparison.delta } : {}), actionId: 'review_observation' }] : [];
  return { items, scheduledMonitoring: false, monitoringPreference };
}
