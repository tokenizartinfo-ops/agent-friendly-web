import { planCopilotNextTurn } from './copilot-next-turn.mjs';
import { summarizeObservationHistory } from './observation-history.mjs';

const SCOPES = Object.freeze({
  project_summary: ['afw:project:read'],
  saved_evidence: ['afw:project:read', 'afw:evidence:read'],
});
const fail = (status, code) => ({ status, code });
const identifier = value => typeof value === 'string' && value.length > 0 && value.length <= 200 && value.trim() === value;
const text = (value, max = 200) => typeof value === 'string' ? value.slice(0, max) : '';
const prompts={goals:'¿Qué querés que las personas o los agentes puedan descubrir o hacer en tu sitio?',organization:'¿Cómo se llama tu organización o proyecto?',website:'¿Cuál es el sitio que querés mejorar?',audience:'¿A quién querés ayudar con tu sitio?',languages:'¿En qué idiomas debe comprenderse tu sitio?',cms:'¿Con qué herramienta se edita tu sitio?',hosting:'¿Dónde está alojado tu sitio?',contentSources:'¿Qué contenido disponible podemos usar para responder con precisión?',control:'¿Quién puede revisar y realizar cambios en el sitio?'};
function guidanceFor(project,safeWebsite) {
  const guidance=project.guidance??{};
  // Presence markers guide the planner; underlying CMS/hosting/content values
  // and the working narrative/proposals never enter the delegated response.
  const draft={...project.intake,organization:text(project.organization),website:safeWebsite,
    cms:guidance.hasCms?'declared':'',hosting:guidance.hasHosting?'declared':'',
    contentSources:guidance.hasContentSources?['declared']:[]};
  const deferred=Array.isArray(guidance.deferred)?guidance.deferred.filter(field=>Object.hasOwn(prompts,field)):[];
  const nextStep=planCopilotNextTurn(draft,null,deferred,{revision:project.revision});
  return {nextStep,nextQuestion:nextStep.kind==='ask'&&Object.hasOwn(prompts,nextStep.field)?{field:nextStep.field,prompt:prompts[nextStep.field]}:null};
}
function timestamp(value) {
  return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T/.test(value) && Number.isFinite(Date.parse(value)) ? value : '';
}
function website(value) {
  try {
    const url = new URL(value);
    if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password) return '';
    // Query strings may contain credentials or private tracking parameters.
    url.search = ''; url.hash = '';
    return url.href.length <= 2000 ? url.href : '';
  } catch { return ''; }
}

/**
 * Internal domain service, NOT a token verifier. Only a trusted OAuth adapter may
 * supply context after cryptographic/token validation. Never deserialize it from
 * a request body, query, unverified JWT, arbitrary header or a bearer string.
 * Persisted live grant and current project ownership are checked on every call.
 */
export async function readDelegatedProject({ context, projectId, operation, repository, resource, now = () => new Date().toISOString() } = {}) {
  if (!Object.hasOwn(SCOPES, operation ?? '')) return fail(400, 'unsupported_read_operation');
  if (!context || !['grantId', 'subject', 'clientId'].every(key => identifier(context[key])) ||
      !identifier(projectId) || typeof resource !== 'string' || !resource || context.resource !== resource || !Array.isArray(context.scopes)) {
    return fail(401, 'delegated_authorization_required');
  }
  const required = SCOPES[operation];
  if (!required.every(scope => context.scopes.includes(scope))) return fail(403, 'insufficient_scope');
  try {
    const currentTime = Date.parse(now());
    if (!Number.isFinite(currentTime)) return fail(503, 'delegated_read_unavailable');
    const grant = await repository.getGrant(context.grantId);
    if (!grant || grant.grantId !== context.grantId || grant.subject !== context.subject ||
        grant.clientId !== context.clientId || grant.resource !== resource || grant.projectId !== projectId ||
        grant.status !== 'active' || grant.revokedAt || !timestamp(grant.expiresAt) ||
        Date.parse(grant.expiresAt) <= currentTime || !Array.isArray(grant.scopes) ||
        !required.every(scope => grant.scopes.includes(scope))) return fail(403, 'delegated_access_denied');
    const project = await repository.getOwnedProject(grant.projectId, grant.subject);
    if (!project || project.id !== grant.projectId || project.userId !== grant.subject) return fail(404, 'project_unavailable');
    const safeWebsite = website(project.website);
    if (operation === 'project_summary') {
      return { status: 200, data: {
        id: project.id, organization: text(project.organization), website: safeWebsite,
        status: text(project.status, 40),
        completion: Number.isInteger(project.completion) && project.completion >= 0 && project.completion <= 100 ? project.completion : null,
        revision: Number.isSafeInteger(project.revision) && project.revision >= 1 ? project.revision : null,
        updatedAt: timestamp(project.updatedAt),
        ...guidanceFor(project,safeWebsite),
      } };
    }
    const origin = safeWebsite ? new URL(safeWebsite).origin : '';
    const rows = origin ? await repository.listCurrentObservations(grant.projectId, grant.subject, origin) : [];
    const eligible = rows.filter(row => row.projectId === grant.projectId && row.userId === grant.subject &&
      row.targetOrigin === origin && timestamp(row.checkedAt));
    return { status: 200, data: {
      history: summarizeObservationHistory(eligible, safeWebsite),
      limits: ['Lectura de observaciones guardadas para el origen actual; no ejecuta una auditoria nueva ni acredita que el sitio siga igual.'],
    } };
  } catch {
    return fail(503, 'delegated_read_unavailable');
  }
}
