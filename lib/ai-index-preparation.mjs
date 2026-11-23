import { observationOrigin } from './observation-current-origin.mjs';
import { privateUiCopy } from './private-ui-copy.mjs';

const sourceOrder = privateUiCopy('es').intake.content.map(([id]) => id);
const signalIds = ['directAnswers', 'structuredData', 'sources', 'ownership'];

/** Read-only preparation from a saved dossier. Scan signals do not resolve facts or permissions.
 * @param {{website?:string,contentSources?:string[],observation?:{target:string,checkedAt:string,evidence?:Record<string,boolean>}|null,readState?:string,now?:number}} [input]
 */
export function buildAiIndexPreparation({ website, contentSources, observation, readState, now = Date.now() } = {}) {
  const origin = observationOrigin(website);
  if (!origin) return null;
  const checkedAt = observation?.checkedAt;
  const observedTime = typeof checkedAt === 'string' && /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.\d{3})?Z$/.test(checkedAt)
    ? Date.parse(checkedAt) : NaN;
  const canonical = Number.isFinite(observedTime) ? new Date(observedTime).toISOString() : null;
  const hasObservation = readState === 'ready' && observationOrigin(observation?.target) === origin &&
    canonical !== null && (checkedAt === canonical || checkedAt === canonical.replace('.000Z', 'Z')) &&
    Number.isFinite(now) && observedTime <= now;
  const evidence = hasObservation ? observation?.evidence : null;
  return {
    origin,
    declaredSources: sourceOrder.filter(id => Array.isArray(contentSources) && contentSources.includes(id)),
    observedAt: hasObservation ? checkedAt : null,
    signals: Object.fromEntries(signalIds.map(id => [id, evidence?.[id] === true ? 'detected' :
      evidence?.[id] === false ? 'not_detected' : 'unverified'])),
    contentReview: 'pending',
    sharingDecision: 'not_recorded',
    indexStatus: 'unverified',
  };
}
