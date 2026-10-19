import { clock, closed, instant, integer, readList, readRecord, ref, text } from './agent-consumption-input.mjs';

const CONTEXT_KEYS = ['authorized', 'principalRef', 'projectRef', 'expectedRevision', 'grantExpiresAt'];
const VIEW_KEYS = ['projectRef', 'revision', 'observedAt', 'expiresAt', 'nextStep', 'missingInput', 'evidenceRefs', 'capsuleRef'];
const KINDS = new Set(['provide_information', 'review', 'refresh', 'wait']);
const denied = code => closed('blocked', { code });

// Host-supplied context must already be authenticated and bound to the view.
// This projection checks consistency, not identity, consent provenance or current server state.
export function projectAgentNextStep(input, authorization, options) {
  const config = readRecord(options, ['now']);
  const context = readRecord(authorization, CONTEXT_KEYS);
  if (!config || !clock(config.now) || !context || context.authorized !== true ||
    !ref(context.principalRef) || !ref(context.projectRef) || !integer(context.expectedRevision, 1) ||
    instant(context.grantExpiresAt) === null || instant(context.grantExpiresAt) <= config.now) return denied('access_denied');
  const view = readRecord(input, VIEW_KEYS);
  if (!view) return denied('invalid_state');
  if (view.projectRef !== context.projectRef) return denied('access_denied');
  if (!integer(view.revision, 1)) return denied('invalid_state');
  if (view.revision !== context.expectedRevision) return denied('revision_conflict');
  const observed = instant(view.observedAt), expires = instant(view.expiresAt);
  if (observed === null || expires === null) return denied('invalid_state');
  if (observed > config.now) return denied('state_unconfirmed');
  if (expires <= config.now) return denied('source_expired');
  if (observed >= expires) return denied('invalid_state');
  const step = readRecord(view.nextStep, ['id', 'kind', 'label', 'reason']);
  const refs = readList(view.evidenceRefs, 5);
  if (!step || !ref(step.id) || !KINDS.has(step.kind) || !text(step.label, 160) || !text(step.reason) ||
    !refs || !refs.every(ref) || new Set(refs).size !== refs.length ||
    (view.capsuleRef != null && !ref(view.capsuleRef))) return denied('invalid_state');
  let missingInput = null;
  if (view.missingInput != null) {
    missingInput = readRecord(view.missingInput, ['key', 'label']);
    if (!missingInput || !ref(missingInput.key) || !text(missingInput.label, 160)) return denied('invalid_state');
  }
  return closed('ok', {
    contract: 'afw.agent-consumption.next-step.v1',
    projectRef: view.projectRef, revision: view.revision, observedAt: view.observedAt,
    expiresAt: new Date(Math.min(expires, instant(context.grantExpiresAt))).toISOString(),
    nextStep: step, missingInput, evidenceRefs: refs, capsuleRef: view.capsuleRef ?? null,
  });
}
