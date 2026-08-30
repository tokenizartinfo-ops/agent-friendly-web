'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  Check,
  CheckCircle2,
  Clipboard,
  Download,
  FileCheck2,
  FileCode2,
  GitCompareArrows,
  GitPullRequestDraft,
  LoaderCircle,
  ShieldCheck,
  UserCheck,
  X,
} from 'lucide-react';

type CapsuleFile = {
  packagePath: string;
  destinationPath: string;
  operation: 'create_or_replace' | 'manual_merge' | 'manual_embed';
  mediaType: string;
  bytes: number;
  sha256: string;
  content: string;
};

type Capsule = {
  capsuleId: string;
  version: number;
  status: string;
  createdAt: string;
  expiresAt: string;
  target: { origin: string; hostname: string };
  organization: string;
  files: CapsuleFile[];
  unsupportedResources: Array<{ id: string; state: string; reason: string }>;
  approvals: {
    requiredRoles: Array<'owner' | 'maintainer'>;
    owner: string;
    maintainer: string;
  };
  integrity: { manifestSha256: string; checksumsSha256: string; signature: null };
};

type CapsulePayload = {
  error?: string;
  actorRole?: 'owner' | 'maintainer';
  capsule?: Capsule | null;
  status?: string;
  notice?: string;
};

type DiffChange = { type: 'context' | 'add' | 'remove'; oldLine: number | null; newLine: number | null; text: string };
type ComparisonResource = {
  packagePath: string;
  destinationPath: string;
  operation: string;
  status: string;
  currentSha256: string | null;
  proposedSha256: string | null;
  diff: { changes: DiffChange[]; truncated: boolean } | null;
  note: string;
};
type OriginComparison = {
  comparisonId: string;
  manifestSha256: string;
  observedAt: string;
  status: 'complete' | 'incomplete';
  resources: ComparisonResource[];
};
type DraftPrPlan = {
  planId: string;
  repository: string;
  baseBranch: string;
  branch: string;
  status: string;
  remoteSubmission: false;
  mergeAllowed: false;
  files: Array<{ repositoryPath: string; mode: string; sha256: string }>;
};
type Block5BPayload = {
  error?: string;
  comparison?: OriginComparison | null;
  plan?: DraftPrPlan | null;
};

const operationLabels = {
  create_or_replace: 'Crear o reemplazar luego de revisar',
  manual_merge: 'Integrar manualmente con el archivo actual',
  manual_embed: 'Insertar manualmente en la pagina indicada',
};

function statusLabel(status: string) {
  if (status === 'owner_approval_pending') return 'Esperando aprobacion del owner';
  if (status === 'maintainer_approval_pending') return 'Esperando aprobacion del mantenedor';
  if (status === 'approved_for_manual_handoff') return 'Aprobada para entrega manual';
  if (status === 'rejected') return 'Version rechazada';
  if (status === 'expired') return 'Version vencida';
  return 'Sin capsula preparada';
}

function approvalLabel(status: string) {
  if (status === 'approved') return 'Aprobada';
  if (status === 'rejected') return 'Rechazada';
  if (status === 'not_required') return 'No requerida';
  return 'Pendiente';
}

function formatDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? ''
    : new Intl.DateTimeFormat('es-AR', { dateStyle: 'medium', timeStyle: 'short' }).format(date);
}

function newIdempotencyKey(prefix: string) {
  return `${prefix}:${crypto.randomUUID()}`;
}

function comparisonStatusLabel(status: string) {
  if (status === 'missing') return 'No existe todavia';
  if (status === 'unchanged') return 'Sin cambios';
  if (status === 'changed') return 'Cambio directo propuesto';
  if (status === 'manual_review_required') return 'Integracion manual necesaria';
  if (status === 'unavailable') return 'No se pudo leer';
  return 'Bloqueado por seguridad';
}

function defaultPathMappings(files: CapsuleFile[]) {
  return Object.fromEntries(files
    .filter((file) => file.operation === 'create_or_replace')
    .map((file) => [file.destinationPath, file.destinationPath.replace(/^\//, '')]));
}

export function CapsuleReview({
  projectId,
  expectedDomain = '',
  allowBuild = false,
}: {
  projectId: string;
  expectedDomain?: string;
  allowBuild?: boolean;
}) {
  const [capsule, setCapsule] = useState<Capsule | null>(null);
  const [actorRole, setActorRole] = useState<'owner' | 'maintainer' | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('Todavia no se preparo una capsula para este expediente.');
  const [copied, setCopied] = useState(false);
  const [comparison, setComparison] = useState<OriginComparison | null>(null);
  const [draftPlan, setDraftPlan] = useState<DraftPrPlan | null>(null);
  const [repository, setRepository] = useState('');
  const [baseBranch, setBaseBranch] = useState('main');
  const [reviewer, setReviewer] = useState('');
  const [pathMappings, setPathMappings] = useState<Record<string, string>>({});

  const loadCapsule = useCallback(async () => {
    if (!projectId) return;
    try {
      const response = await fetch(`/api/projects/${projectId}/deployment-capsules`, { cache: 'no-store' });
      const payload = await response.json() as CapsulePayload;
      if (!response.ok) throw new Error(payload.error || 'No se pudo consultar la capsula.');
      setActorRole(payload.actorRole || null);
      setCapsule(payload.capsule || null);
      if (payload.capsule) {
        setPathMappings(defaultPathMappings(payload.capsule.files));
        setMessage('Esta es la ultima version preparada. Revisa cada archivo antes de decidir.');
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'No se pudo consultar la capsula.');
    }
  }, [projectId]);

  useEffect(() => {
    const timer = window.setTimeout(() => { void loadCapsule(); }, 0);
    return () => window.clearTimeout(timer);
  }, [loadCapsule]);

  const loadBlock5B = useCallback(async (capsuleId: string) => {
    try {
      const [comparisonResponse, planResponse] = await Promise.all([
        fetch(`/api/projects/${projectId}/deployment-capsules/${capsuleId}/comparison`, { cache: 'no-store' }),
        fetch(`/api/projects/${projectId}/deployment-capsules/${capsuleId}/draft-pr-plan`, { cache: 'no-store' }),
      ]);
      const comparisonPayload = await comparisonResponse.json() as Block5BPayload;
      const planPayload = await planResponse.json() as Block5BPayload;
      if (comparisonResponse.ok) setComparison(comparisonPayload.comparison || null);
      if (planResponse.ok) setDraftPlan(planPayload.plan || null);
    } catch {
      setMessage('La capsula sigue disponible, pero no se pudo consultar su comparacion tecnica.');
    }
  }, [projectId]);

  useEffect(() => {
    if (!capsule) return;
    const timer = window.setTimeout(() => { void loadBlock5B(capsule.capsuleId); }, 0);
    return () => window.clearTimeout(timer);
  }, [capsule, loadBlock5B]);

  async function buildCapsule() {
    if (!projectId || !expectedDomain) {
      setMessage('Guarda y verifica primero el dominio del expediente.');
      return;
    }
    setBusy(true);
    setMessage('Preparando archivos, inventario y hashes...');
    try {
      const response = await fetch(`/api/projects/${projectId}/deployment-capsules`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          contract: 'agentfriendly.publication-capsule-build.v1',
          confirmBuild: true,
          expectedDomain,
          idempotencyKey: newIdempotencyKey('capsule-build'),
        }),
      });
      const payload = await response.json() as CapsulePayload;
      if (!response.ok || !payload.capsule) throw new Error(payload.error || 'No se pudo preparar la capsula.');
      setActorRole(payload.actorRole || 'owner');
      setCapsule(payload.capsule);
      setPathMappings(defaultPathMappings(payload.capsule.files));
      setComparison(null);
      setDraftPlan(null);
      setMessage('Vista previa lista. No se modifico el sitio.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'No se pudo preparar la capsula.');
    } finally {
      setBusy(false);
    }
  }

  async function compareWithOrigin() {
    if (!capsule) return;
    setBusy(true);
    setMessage('Leyendo solo los archivos publicos permitidos del sitio actual...');
    try {
      const response = await fetch(`/api/projects/${projectId}/deployment-capsules/${capsule.capsuleId}/comparison`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          contract: 'agentfriendly.origin-comparison-request.v1',
          confirmRead: true,
          manifestSha256: capsule.integrity.manifestSha256,
          idempotencyKey: newIdempotencyKey('origin-comparison'),
        }),
      });
      const payload = await response.json() as Block5BPayload;
      if (!response.ok || !payload.comparison) throw new Error(payload.error || 'No se pudo comparar con el sitio actual.');
      setComparison(payload.comparison);
      setDraftPlan(null);
      setMessage(payload.comparison.status === 'complete'
        ? 'Comparacion lista. Revisa las diferencias antes de preparar un borrador tecnico.'
        : 'La comparacion quedo incompleta. No se preparara ningun borrador hasta resolver los recursos bloqueados.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'No se pudo comparar con el sitio actual.');
    } finally {
      setBusy(false);
    }
  }

  async function prepareDraftPlan() {
    if (!capsule || !comparison) return;
    setBusy(true);
    setMessage('Preparando un plan tecnico local. No se enviara a GitHub.');
    try {
      const response = await fetch(`/api/projects/${projectId}/deployment-capsules/${capsule.capsuleId}/draft-pr-plan`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          contract: 'agentfriendly.draft-pr-plan-request.v1',
          confirmPrepare: true,
          manifestSha256: capsule.integrity.manifestSha256,
          repository,
          baseBranch,
          reviewer,
          pathMappings,
          idempotencyKey: newIdempotencyKey('draft-pr-plan'),
        }),
      });
      const payload = await response.json() as Block5BPayload;
      if (!response.ok || !payload.plan) throw new Error(payload.error || 'No se pudo preparar el borrador tecnico.');
      setDraftPlan(payload.plan);
      setMessage('Borrador tecnico preparado y no enviado. Puedes descargarlo para una revision humana.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'No se pudo preparar el borrador tecnico.');
    } finally {
      setBusy(false);
    }
  }

  async function decide(decision: 'approved' | 'rejected') {
    if (!capsule || !actorRole) return;
    setBusy(true);
    setMessage(decision === 'approved' ? 'Registrando aprobacion...' : 'Registrando rechazo...');
    try {
      const response = await fetch(`/api/projects/${projectId}/deployment-capsules/${capsule.capsuleId}/decisions`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          contract: 'agentfriendly.capsule-decision.v1',
          decision,
          manifestSha256: capsule.integrity.manifestSha256,
          idempotencyKey: `capsule-decision:${capsule.capsuleId}:${actorRole}:${decision}`,
          note: decision === 'approved' ? 'Version exacta revisada desde la interfaz privada.' : 'Version rechazada desde la interfaz privada.',
        }),
      });
      const payload = await response.json() as CapsulePayload;
      if (!response.ok) throw new Error(payload.error || 'No se pudo registrar la decision.');
      setMessage(payload.notice || 'Decision registrada. No se modifico el sitio.');
      await loadCapsule();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'No se pudo registrar la decision.');
    } finally {
      setBusy(false);
    }
  }

  async function copyReviewLink() {
    if (!projectId) return;
    const reviewUrl = `${window.location.origin}/capsula/${projectId}`;
    try {
      await navigator.clipboard.writeText(reviewUrl);
      setCopied(true);
      setMessage('Enlace privado copiado. Solo una identidad autorizada podra abrirlo.');
    } catch {
      setMessage('No se pudo copiar automaticamente. Abre la revision y copia la URL del navegador.');
    }
  }

  const actorDecision = capsule && actorRole ? capsule.approvals[actorRole] : '';
  const canDecide = Boolean(
    capsule &&
    actorRole &&
    capsule.approvals.requiredRoles.includes(actorRole) &&
    actorDecision === 'pending' &&
    !['expired', 'rejected', 'approved_for_manual_handoff'].includes(capsule.status),
  );

  return (
    <section className="form-section capsule-section" aria-labelledby="capsule-title">
      <div className="capsule-heading">
        <div className="form-section-title">
          <FileCheck2 size={21} />
          <div>
            <strong id="capsule-title">Capsula de implementacion</strong>
            <span>Un paquete exacto para revisar y entregar sin compartir claves.</span>
          </div>
        </div>
        <span className="capsule-status" data-status={capsule?.status || 'empty'}>
          {statusLabel(capsule?.status || '')}
        </span>
      </div>

      <div className="capsule-no-write">
        <ShieldCheck size={18} />
        <div><strong>No modifica el sitio.</strong><span>Preparar, descargar o aprobar esta version no publica archivos, no abre un PR y no entra en WordPress.</span></div>
      </div>

      {!capsule ? (
        <div className="capsule-empty">
          <FileCode2 size={28} />
          <div><strong>Primero se prepara una vista previa.</strong><p>El sistema tomara solo los campos publicos y recursos autorizados del expediente. Los archivos existentes que necesitan fusion se marcan para revision manual.</p></div>
          {allowBuild ? <button className="primary-action" type="button" onClick={buildCapsule} disabled={busy || !projectId || !expectedDomain}>{busy ? <LoaderCircle className="spin" size={16} /> : <FileCheck2 size={16} />}Preparar vista previa</button> : null}
        </div>
      ) : (
        <>
          <div className="capsule-summary">
            <div><span>Version</span><strong>v{capsule.version}</strong></div>
            <div><span>Dominio</span><strong>{capsule.target.hostname}</strong></div>
            <div><span>Vence</span><strong>{formatDate(capsule.expiresAt)}</strong></div>
            <div><span>Manifiesto</span><code>{capsule.integrity.manifestSha256.slice(0, 14)}...</code></div>
          </div>

          <div className="capsule-files">
            <div className="capsule-subheading"><span>Archivos incluidos</span><strong>{capsule.files.length}</strong></div>
            {capsule.files.map((file) => (
              <details key={file.packagePath}>
                <summary>
                  <FileCode2 size={17} />
                  <span><strong>{file.destinationPath}</strong><small>{operationLabels[file.operation]}</small></span>
                  <code>{file.sha256.slice(0, 12)}...</code>
                </summary>
                <div className="capsule-file-detail">
                  <dl>
                    <div><dt>Dentro del paquete</dt><dd>{file.packagePath}</dd></div>
                    <div><dt>Operacion</dt><dd>{file.operation}</dd></div>
                    <div><dt>Tamano</dt><dd>{file.bytes} bytes</dd></div>
                    <div><dt>SHA-256</dt><dd>{file.sha256}</dd></div>
                  </dl>
                  <pre>{file.content}</pre>
                </div>
              </details>
            ))}
          </div>

          {capsule.unsupportedResources.length ? (
            <div className="capsule-deferred">
              <strong>Recursos que requieren implementacion separada</strong>
              {capsule.unsupportedResources.map((resource) => <p key={resource.id}><code>{resource.id}</code><span>{resource.reason}</span></p>)}
            </div>
          ) : null}

          <section className="capsule-comparison" aria-labelledby="comparison-title">
            <div className="capsule-comparison-heading">
              <GitCompareArrows size={20} />
              <div>
                <strong id="comparison-title">Comparar con el sitio actual</strong>
                <span>Solo lee archivos publicos. No inicia sesion, no usa claves y no modifica el origen.</span>
              </div>
              <button type="button" className="secondary-action" onClick={compareWithOrigin} disabled={busy}>
                {busy ? <LoaderCircle className="spin" size={16} /> : <GitCompareArrows size={16} />}
                {comparison ? 'Volver a consultar' : 'Comparar con el sitio actual'}
              </button>
            </div>

            {comparison ? (
              <div className="capsule-comparison-results">
                <div className="capsule-comparison-status" data-status={comparison.status}>
                  <span>Revisar diferencias</span>
                  <strong>{comparison.status === 'complete' ? 'Comparacion completa' : 'Comparacion incompleta'}</strong>
                  <small>Observada {formatDate(comparison.observedAt)}</small>
                </div>

                {comparison.resources.map((resource) => (
                  <details className="capsule-resource-diff" key={resource.packagePath}>
                    <summary>
                      <FileCode2 size={17} />
                      <span><strong>{resource.destinationPath}</strong><small>{comparisonStatusLabel(resource.status)}</small></span>
                      <code>{resource.currentSha256 ? `${resource.currentSha256.slice(0, 10)}...` : 'sin origen'}</code>
                    </summary>
                    <div className="capsule-resource-diff-body">
                      <p>{resource.note}</p>
                      {resource.diff ? (
                        <div className="capsule-diff" role="region" aria-label={`Diferencias para ${resource.destinationPath}`}>
                          {resource.diff.changes.map((change, index) => (
                            <div className="capsule-diff-line" data-change={change.type} key={`${change.type}-${change.oldLine}-${change.newLine}-${index}`}>
                              <span>{change.oldLine ?? ''}</span>
                              <span>{change.newLine ?? ''}</span>
                              <b>{change.type === 'add' ? '+' : change.type === 'remove' ? '-' : ' '}</b>
                              <code>{change.text || ' '}</code>
                            </div>
                          ))}
                          {resource.diff.truncated ? <p className="capsule-diff-truncated">Vista acotada por seguridad. Descarga la comparacion para revisar el registro completo disponible.</p> : null}
                        </div>
                      ) : <p className="capsule-diff-empty">No hay contenido comparable para mostrar.</p>}
                    </div>
                  </details>
                ))}

                <a className="secondary-action capsule-download" href={`/api/projects/${projectId}/deployment-capsules/${capsule.capsuleId}/comparison?download=1`}>
                  <Download size={16} />Descargar comparacion
                </a>
              </div>
            ) : null}
          </section>

          {comparison?.status === 'complete' && actorRole === 'owner' ? (
            <section className="draft-plan-form" aria-labelledby="draft-plan-title">
              <div className="draft-plan-heading">
                <GitPullRequestDraft size={20} />
                <div>
                  <strong id="draft-plan-title">Preparar borrador tecnico</strong>
                  <span>Describe archivos y rutas para revision. No crea un PR, no hace merge y no publica.</span>
                </div>
                <span className="draft-plan-state">No enviado</span>
              </div>

              <div className="draft-plan-fields">
                <label><span>Repositorio GitHub</span><input value={repository} onChange={(event) => setRepository(event.target.value)} placeholder="organizacion/repositorio" autoComplete="off" /></label>
                <label><span>Rama base</span><input value={baseBranch} onChange={(event) => setBaseBranch(event.target.value)} placeholder="main" autoComplete="off" /></label>
                <label><span>Revisor humano</span><input value={reviewer} onChange={(event) => setReviewer(event.target.value)} placeholder="Nombre o usuario, opcional" autoComplete="off" /></label>
              </div>

              <div className="draft-path-mappings">
                <strong>Ubicacion propuesta dentro del repositorio</strong>
                <span>Los archivos que requieren fusion manual se guardan como propuestas separadas y nunca reemplazan contenido automaticamente.</span>
                {capsule.files.filter((file) => file.operation === 'create_or_replace').map((file) => (
                  <label key={file.destinationPath}>
                    <code>{file.destinationPath}</code>
                    <input
                      value={pathMappings[file.destinationPath] || ''}
                      onChange={(event) => setPathMappings((current) => ({ ...current, [file.destinationPath]: event.target.value }))}
                      placeholder={file.destinationPath.replace(/^\//, '')}
                      autoComplete="off"
                    />
                  </label>
                ))}
              </div>

              <button type="button" className="draft-plan-prepare" onClick={prepareDraftPlan} disabled={busy || !repository.trim() || !baseBranch.trim()}>
                {busy ? <LoaderCircle className="spin" size={16} /> : <GitPullRequestDraft size={16} />}Preparar borrador tecnico
              </button>

              {draftPlan ? (
                <div className="draft-plan-result">
                  <div><span>Estado</span><strong>No enviado</strong></div>
                  <div><span>Repositorio</span><strong>{draftPlan.repository}</strong></div>
                  <div><span>Rama propuesta</span><code>{draftPlan.branch}</code></div>
                  <div><span>Archivos</span><strong>{draftPlan.files.length}</strong></div>
                  <a className="secondary-action" href={`/api/projects/${projectId}/deployment-capsules/${capsule.capsuleId}/draft-pr-plan?download=1`}>
                    <Download size={16} />Descargar borrador tecnico
                  </a>
                </div>
              ) : null}
            </section>
          ) : null}

          <div className="capsule-approvals">
            <article data-status={capsule.approvals.owner}><UserCheck size={19} /><div><strong>Aprobacion del owner</strong><span>{approvalLabel(capsule.approvals.owner)}</span></div>{capsule.approvals.owner === 'approved' ? <Check size={17} /> : null}</article>
            <article data-status={capsule.approvals.maintainer}><UserCheck size={19} /><div><strong>Aprobacion del mantenedor</strong><span>{approvalLabel(capsule.approvals.maintainer)}</span></div>{capsule.approvals.maintainer === 'approved' || capsule.approvals.maintainer === 'not_required' ? <Check size={17} /> : null}</article>
          </div>

          <div className="capsule-actions">
            <a className="secondary-action" href={`/api/projects/${projectId}/deployment-capsules?download=1`}><Download size={16} />Descargar paquete JSON</a>
            <a className="secondary-action" href={`/capsula/${projectId}`}><FileCheck2 size={16} />Abrir revision privada</a>
            {actorRole === 'owner' && capsule.approvals.requiredRoles.includes('maintainer') ? <button className="secondary-action" type="button" onClick={copyReviewLink}><Clipboard size={16} />{copied ? 'Enlace copiado' : 'Copiar enlace para el mantenedor'}</button> : null}
            {allowBuild && actorRole === 'owner' ? <button className="secondary-action" type="button" onClick={buildCapsule} disabled={busy}><FileCode2 size={16} />Preparar nueva version</button> : null}
          </div>

          {canDecide ? (
            <div className="capsule-decision-actions">
              <button type="button" className="capsule-approve" onClick={() => decide('approved')} disabled={busy}>{busy ? <LoaderCircle className="spin" size={16} /> : <CheckCircle2 size={17} />}Aprobar esta version</button>
              <button type="button" className="capsule-reject" onClick={() => decide('rejected')} disabled={busy}><X size={17} />Rechazar esta version</button>
            </div>
          ) : null}
        </>
      )}

      <div className="verification-message" aria-live="polite"><ShieldCheck size={17} /><span>{message}</span></div>
    </section>
  );
}
