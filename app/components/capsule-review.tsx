'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  Check,
  CheckCircle2,
  Clipboard,
  Download,
  FileCheck2,
  FileCode2,
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

  const loadCapsule = useCallback(async () => {
    if (!projectId) return;
    try {
      const response = await fetch(`/api/projects/${projectId}/deployment-capsules`, { cache: 'no-store' });
      const payload = await response.json() as CapsulePayload;
      if (!response.ok) throw new Error(payload.error || 'No se pudo consultar la capsula.');
      setActorRole(payload.actorRole || null);
      setCapsule(payload.capsule || null);
      if (payload.capsule) setMessage('Esta es la ultima version preparada. Revisa cada archivo antes de decidir.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'No se pudo consultar la capsula.');
    }
  }, [projectId]);

  useEffect(() => {
    const timer = window.setTimeout(() => { void loadCapsule(); }, 0);
    return () => window.clearTimeout(timer);
  }, [loadCapsule]);

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
      setMessage('Vista previa lista. No se modifico el sitio.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'No se pudo preparar la capsula.');
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
