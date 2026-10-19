import { createHash } from 'node:crypto';
import { projectAgentNextStep } from './agent-consumption-continuity.mjs';

const fields = new Set(['goals','organization','website','audience','languages','cms','hosting','contentSources','control']);
const reasons = {
  confirm_goal: 'Empezamos por lo que querés lograr para proponerte un alcance útil.',
  understand_site: 'Con este dato podemos entender mejor tu sitio y preparar el siguiente paso.',
  ground_answers: 'Necesitamos fuentes que respalden la información que vamos a declarar.',
  confirm_responsibility: 'Antes de preparar cambios, confirmemos quién puede revisarlos y aplicarlos.',
};

// Server-owned guidance only. This mapper authenticates nobody and performs no IO.
export function projectDelegatedContinuity({ projectId, subject, revision, guidance, observedAt, expiresAt, now }) {
  const cue = guidance.nextStep, question = guidance.nextQuestion;
  let nextStep, missingInput = null;
  if (cue.kind === 'ask' && fields.has(cue.field) && question?.field === cue.field && Object.hasOwn(reasons, cue.reasonKey)) {
    nextStep = { id: 'answer.' + cue.field, kind: 'provide_information', label: question.prompt, reason: reasons[cue.reasonKey] };
    missingInput = { key: cue.field, label: question.prompt };
  } else if (cue.kind === 'summary' && question === null && cue.reasonKey === 'goal_pending') {
    nextStep = { id: 'review.pending-goal', kind: 'review', label: 'Revisá el objetivo pendiente',
      reason: 'Podés retomar el objetivo para decidir qué mejoras serían útiles.' };
  } else if (cue.kind === 'summary' && question === null && cue.reasonKey === 'review_proportional_scope') {
    nextStep = { id: 'review.scope', kind: 'review', label: 'Revisá el alcance propuesto',
      reason: 'Ya tenemos una base para revisar qué preparar; todavía no se aprobó ni publicó ningún cambio.' };
  } else return null;
  if (cue.basedOnRevision !== revision) return null;
  return projectAgentNextStep({
    projectRef: projectId, revision, observedAt, expiresAt, nextStep, missingInput, evidenceRefs: [], capsuleRef: null,
  }, {
    authorized: true, principalRef: 'owner:' + createHash('sha256').update(subject).digest('hex'),
    projectRef: projectId, expectedRevision: revision, grantExpiresAt: expiresAt,
  }, { now });
}
