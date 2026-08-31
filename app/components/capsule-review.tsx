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
import { privateUiCopy } from '../../lib/private-ui-copy.mjs';
import { localizedPath } from '../../lib/site-i18n.mjs';

type Locale = 'es' | 'en' | 'pt';
type CapsuleCopy = ReturnType<typeof privateUiCopy>['capsule'];

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

function statusLabel(status: string, copy: CapsuleCopy) {
  return copy.statuses[status as keyof typeof copy.statuses] || copy.statuses.empty;
}

function approvalLabel(status: string, copy: CapsuleCopy) {
  return copy.statuses[status as keyof typeof copy.statuses] || copy.statuses.pending;
}

function formatDate(value: string, locale: Locale) {
  const date = new Date(value);
  const language = locale === 'en' ? 'en-US' : locale === 'pt' ? 'pt-BR' : 'es-AR';
  return Number.isNaN(date.getTime())
    ? ''
    : new Intl.DateTimeFormat(language, { dateStyle: 'medium', timeStyle: 'short' }).format(date);
}

function newIdempotencyKey(prefix: string) {
  return `${prefix}:${crypto.randomUUID()}`;
}

function comparisonStatusLabel(status: string, copy: CapsuleCopy) {
  return copy.comparisonStatuses[status as keyof typeof copy.comparisonStatuses] || copy.comparisonStatuses.blocked;
}

function localizedMessage(locale: Locale, es: string, en: string, pt: string) {
  return locale === 'en' ? en : locale === 'pt' ? pt : es;
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
  locale = 'es',
}: {
  projectId: string;
  expectedDomain?: string;
  allowBuild?: boolean;
  locale?: Locale;
}) {
  const copy = privateUiCopy(locale).capsule;
  const [capsule, setCapsule] = useState<Capsule | null>(null);
  const [actorRole, setActorRole] = useState<'owner' | 'maintainer' | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState(copy.messages.empty);
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
      if (!response.ok) throw new Error(payload.error || localizedMessage(locale, 'No se pudo consultar la cápsula.', 'The capsule could not be loaded.', 'Não foi possível consultar a cápsula.'));
      setActorRole(payload.actorRole || null);
      setCapsule(payload.capsule || null);
      if (payload.capsule) {
        setPathMappings(defaultPathMappings(payload.capsule.files));
        setMessage(copy.messages.loaded);
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : localizedMessage(locale, 'No se pudo consultar la cápsula.', 'The capsule could not be loaded.', 'Não foi possível consultar a cápsula.'));
    }
  }, [copy.messages.loaded, locale, projectId]);

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
      setMessage(localizedMessage(locale, 'La cápsula sigue disponible, pero no se pudo consultar su comparación técnica.', 'The capsule remains available, but its technical comparison could not be loaded.', 'A cápsula continua disponível, mas a comparação técnica não pôde ser consultada.'));
    }
  }, [locale, projectId]);

  useEffect(() => {
    if (!capsule) return;
    const timer = window.setTimeout(() => { void loadBlock5B(capsule.capsuleId); }, 0);
    return () => window.clearTimeout(timer);
  }, [capsule, loadBlock5B]);

  async function buildCapsule() {
    if (!projectId || !expectedDomain) {
      setMessage(localizedMessage(locale, 'Guarda y verifica primero el dominio del expediente.', 'Save and verify the dossier domain first.', 'Salve e verifique primeiro o domínio do dossiê.'));
      return;
    }
    setBusy(true);
    setMessage(localizedMessage(locale, 'Preparando archivos, inventario y hashes...', 'Preparing files, inventory and hashes...', 'Preparando arquivos, inventário e hashes...'));
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
      if (!response.ok || !payload.capsule) throw new Error(payload.error || localizedMessage(locale, 'No se pudo preparar la cápsula.', 'The capsule could not be prepared.', 'Não foi possível preparar a cápsula.'));
      setActorRole(payload.actorRole || 'owner');
      setCapsule(payload.capsule);
      setPathMappings(defaultPathMappings(payload.capsule.files));
      setComparison(null);
      setDraftPlan(null);
      setMessage(copy.messages.previewReady);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : localizedMessage(locale, 'No se pudo preparar la cápsula.', 'The capsule could not be prepared.', 'Não foi possível preparar a cápsula.'));
    } finally {
      setBusy(false);
    }
  }

  async function compareWithOrigin() {
    if (!capsule) return;
    setBusy(true);
    setMessage(localizedMessage(locale, 'Leyendo solo los archivos públicos permitidos del sitio actual...', 'Reading only the allowed public files from the current website...', 'Lendo somente os arquivos públicos permitidos do site atual...'));
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
      if (!response.ok || !payload.comparison) throw new Error(payload.error || localizedMessage(locale, 'No se pudo comparar con el sitio actual.', 'The current website could not be compared.', 'Não foi possível comparar com o site atual.'));
      setComparison(payload.comparison);
      setDraftPlan(null);
      setMessage(payload.comparison.status === 'complete'
        ? localizedMessage(locale, 'Comparación lista. Revisa las diferencias antes de preparar un borrador técnico.', 'Comparison ready. Review the differences before preparing a technical draft.', 'Comparação pronta. Revise as diferenças antes de preparar um rascunho técnico.')
        : localizedMessage(locale, 'La comparación quedó incompleta. No se preparará ningún borrador hasta resolver los recursos bloqueados.', 'The comparison is incomplete. No draft will be prepared until blocked resources are resolved.', 'A comparação ficou incompleta. Nenhum rascunho será preparado até resolver os recursos bloqueados.'));
    } catch (error) {
      setMessage(error instanceof Error ? error.message : localizedMessage(locale, 'No se pudo comparar con el sitio actual.', 'The current website could not be compared.', 'Não foi possível comparar com o site atual.'));
    } finally {
      setBusy(false);
    }
  }

  async function prepareDraftPlan() {
    if (!capsule || !comparison) return;
    setBusy(true);
    setMessage(localizedMessage(locale, 'Preparando un plan técnico local. No se enviará a GitHub.', 'Preparing a local technical plan. It will not be sent to GitHub.', 'Preparando um plano técnico local. Ele não será enviado ao GitHub.'));
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
      if (!response.ok || !payload.plan) throw new Error(payload.error || localizedMessage(locale, 'No se pudo preparar el borrador técnico.', 'The technical draft could not be prepared.', 'Não foi possível preparar o rascunho técnico.'));
      setDraftPlan(payload.plan);
      setMessage(localizedMessage(locale, 'Borrador técnico preparado y no enviado. Puedes descargarlo para una revisión humana.', 'Technical draft prepared and not sent. Download it for human review.', 'Rascunho técnico preparado e não enviado. Baixe-o para revisão humana.'));
    } catch (error) {
      setMessage(error instanceof Error ? error.message : localizedMessage(locale, 'No se pudo preparar el borrador técnico.', 'The technical draft could not be prepared.', 'Não foi possível preparar o rascunho técnico.'));
    } finally {
      setBusy(false);
    }
  }

  async function decide(decision: 'approved' | 'rejected') {
    if (!capsule || !actorRole) return;
    setBusy(true);
    setMessage(decision === 'approved'
      ? localizedMessage(locale, 'Registrando aprobación...', 'Recording approval...', 'Registrando aprovação...')
      : localizedMessage(locale, 'Registrando rechazo...', 'Recording rejection...', 'Registrando rejeição...'));
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
      if (!response.ok) throw new Error(payload.error || localizedMessage(locale, 'No se pudo registrar la decisión.', 'The decision could not be recorded.', 'Não foi possível registrar a decisão.'));
      setMessage(payload.notice || localizedMessage(locale, 'Decisión registrada. No se modificó el sitio.', 'Decision recorded. The website was not modified.', 'Decisão registrada. O site não foi modificado.'));
      await loadCapsule();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : localizedMessage(locale, 'No se pudo registrar la decisión.', 'The decision could not be recorded.', 'Não foi possível registrar a decisão.'));
    } finally {
      setBusy(false);
    }
  }

  async function copyReviewLink() {
    if (!projectId) return;
    const reviewPath = localizedPath('capsule', locale, { projectId }) || `/capsula/${projectId}`;
    const reviewUrl = `${window.location.origin}${reviewPath}`;
    try {
      await navigator.clipboard.writeText(reviewUrl);
      setCopied(true);
      setMessage(copy.messages.privateLinkCopied);
    } catch {
      setMessage(copy.messages.privateLinkFailed);
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
            <strong id="capsule-title">{copy.title}</strong>
            <span>{copy.subtitle}</span>
          </div>
        </div>
        <span className="capsule-status" data-status={capsule?.status || 'empty'}>
          {statusLabel(capsule?.status || '', copy)}
        </span>
      </div>

      <div className="capsule-no-write">
        <ShieldCheck size={18} />
        <div><strong>{copy.noWrite}</strong><span>{copy.noWriteBody}</span></div>
      </div>

      {!capsule ? (
        <div className="capsule-empty">
          <FileCode2 size={28} />
          <div><strong>{copy.emptyTitle}</strong><p>{copy.emptyBody}</p></div>
          {allowBuild ? <button className="primary-action" type="button" onClick={buildCapsule} disabled={busy || !projectId || !expectedDomain}>{busy ? <LoaderCircle className="spin" size={16} /> : <FileCheck2 size={16} />}{copy.prepare}</button> : null}
        </div>
      ) : (
        <>
          <div className="capsule-summary">
            <div><span>{copy.version}</span><strong>v{capsule.version}</strong></div>
            <div><span>{copy.domain}</span><strong>{capsule.target.hostname}</strong></div>
            <div><span>{copy.expires}</span><strong>{formatDate(capsule.expiresAt, locale)}</strong></div>
            <div><span>{copy.manifest}</span><code>{capsule.integrity.manifestSha256.slice(0, 14)}...</code></div>
          </div>

          <div className="capsule-files">
            <div className="capsule-subheading"><span>{copy.files}</span><strong>{capsule.files.length}</strong></div>
            {capsule.files.map((file) => (
              <details key={file.packagePath}>
                <summary>
                  <FileCode2 size={17} />
                  <span><strong>{file.destinationPath}</strong><small>{copy.operations[file.operation]}</small></span>
                  <code>{file.sha256.slice(0, 12)}...</code>
                </summary>
                <div className="capsule-file-detail">
                  <dl>
                    <div><dt>{copy.packagePath}</dt><dd>{file.packagePath}</dd></div>
                    <div><dt>{copy.operation}</dt><dd>{file.operation}</dd></div>
                    <div><dt>{copy.size}</dt><dd>{file.bytes} bytes</dd></div>
                    <div><dt>SHA-256</dt><dd>{file.sha256}</dd></div>
                  </dl>
                  <pre>{file.content}</pre>
                </div>
              </details>
            ))}
          </div>

          {capsule.unsupportedResources.length ? (
            <div className="capsule-deferred">
              <strong>{copy.deferred}</strong>
              {capsule.unsupportedResources.map((resource) => <p key={resource.id}><code>{resource.id}</code><span>{resource.reason}</span></p>)}
            </div>
          ) : null}

          <section className="capsule-comparison" aria-labelledby="comparison-title">
            <div className="capsule-comparison-heading">
              <GitCompareArrows size={20} />
              <div>
                <strong id="comparison-title">{copy.compareTitle}</strong>
                <span>{copy.compareBody}</span>
              </div>
              <button type="button" className="secondary-action" onClick={compareWithOrigin} disabled={busy}>
                {busy ? <LoaderCircle className="spin" size={16} /> : <GitCompareArrows size={16} />}
                {comparison ? copy.compareAgain : copy.compare}
              </button>
            </div>

            {comparison ? (
              <div className="capsule-comparison-results">
                <div className="capsule-comparison-status" data-status={comparison.status}>
                  <span>{copy.differences}</span>
                  <strong>{comparison.status === 'complete' ? copy.complete : copy.incomplete}</strong>
                  <small>{copy.observed} {formatDate(comparison.observedAt, locale)}</small>
                </div>

                {comparison.resources.map((resource) => (
                  <details className="capsule-resource-diff" key={resource.packagePath}>
                    <summary>
                      <FileCode2 size={17} />
                      <span><strong>{resource.destinationPath}</strong><small>{comparisonStatusLabel(resource.status, copy)}</small></span>
                      <code>{resource.currentSha256 ? `${resource.currentSha256.slice(0, 10)}...` : copy.noOrigin}</code>
                    </summary>
                    <div className="capsule-resource-diff-body">
                      <p>{resource.note}</p>
                      {resource.diff ? (
                        <div className="capsule-diff" role="region" aria-label={`${copy.diffLabel} ${resource.destinationPath}`}>
                          {resource.diff.changes.map((change, index) => (
                            <div className="capsule-diff-line" data-change={change.type} key={`${change.type}-${change.oldLine}-${change.newLine}-${index}`}>
                              <span>{change.oldLine ?? ''}</span>
                              <span>{change.newLine ?? ''}</span>
                              <b>{change.type === 'add' ? '+' : change.type === 'remove' ? '-' : ' '}</b>
                              <code>{change.text || ' '}</code>
                            </div>
                          ))}
                          {resource.diff.truncated ? <p className="capsule-diff-truncated">{copy.truncated}</p> : null}
                        </div>
                      ) : <p className="capsule-diff-empty">{copy.noComparable}</p>}
                    </div>
                  </details>
                ))}

                <a className="secondary-action capsule-download" href={`/api/projects/${projectId}/deployment-capsules/${capsule.capsuleId}/comparison?download=1`}>
                  <Download size={16} />{copy.downloadComparison}
                </a>
              </div>
            ) : null}
          </section>

          {comparison?.status === 'complete' && actorRole === 'owner' ? (
            <section className="draft-plan-form" aria-labelledby="draft-plan-title">
              <div className="draft-plan-heading">
                <GitPullRequestDraft size={20} />
                <div>
                  <strong id="draft-plan-title">{copy.draftTitle}</strong>
                  <span>{copy.draftBody}</span>
                </div>
                <span className="draft-plan-state">{copy.notSent}</span>
              </div>

              <div className="draft-plan-fields">
                <label><span>{copy.repository}</span><input value={repository} onChange={(event) => setRepository(event.target.value)} placeholder="organization/repository" autoComplete="off" /></label>
                <label><span>{copy.baseBranch}</span><input value={baseBranch} onChange={(event) => setBaseBranch(event.target.value)} placeholder="main" autoComplete="off" /></label>
                <label><span>{copy.reviewer}</span><input value={reviewer} onChange={(event) => setReviewer(event.target.value)} placeholder={localizedMessage(locale, 'Nombre o usuario, opcional', 'Name or username, optional', 'Nome ou usuário, opcional')} autoComplete="off" /></label>
              </div>

              <div className="draft-path-mappings">
                <strong>{copy.proposedLocation}</strong>
                <span>{copy.proposedLocationBody}</span>
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
                {busy ? <LoaderCircle className="spin" size={16} /> : <GitPullRequestDraft size={16} />}{copy.prepareDraft}
              </button>

              {draftPlan ? (
                <div className="draft-plan-result">
                  <div><span>{copy.status}</span><strong>{copy.notSent}</strong></div>
                  <div><span>{copy.repository}</span><strong>{draftPlan.repository}</strong></div>
                  <div><span>{copy.proposedBranch}</span><code>{draftPlan.branch}</code></div>
                  <div><span>{copy.files}</span><strong>{draftPlan.files.length}</strong></div>
                  <a className="secondary-action" href={`/api/projects/${projectId}/deployment-capsules/${capsule.capsuleId}/draft-pr-plan?download=1`}>
                    <Download size={16} />{copy.downloadDraft}
                  </a>
                </div>
              ) : null}
            </section>
          ) : null}

          <div className="capsule-approvals">
            <article data-status={capsule.approvals.owner}><UserCheck size={19} /><div><strong>{copy.ownerApproval}</strong><span>{approvalLabel(capsule.approvals.owner, copy)}</span></div>{capsule.approvals.owner === 'approved' ? <Check size={17} /> : null}</article>
            <article data-status={capsule.approvals.maintainer}><UserCheck size={19} /><div><strong>{copy.maintainerApproval}</strong><span>{approvalLabel(capsule.approvals.maintainer, copy)}</span></div>{capsule.approvals.maintainer === 'approved' || capsule.approvals.maintainer === 'not_required' ? <Check size={17} /> : null}</article>
          </div>

          <div className="capsule-actions">
            <a className="secondary-action" href={`/api/projects/${projectId}/deployment-capsules?download=1`}><Download size={16} />{copy.downloadJson}</a>
            <a className="secondary-action" href={localizedPath('capsule', locale, { projectId }) || `/capsula/${projectId}`}><FileCheck2 size={16} />{copy.openPrivate}</a>
            {actorRole === 'owner' && capsule.approvals.requiredRoles.includes('maintainer') ? <button className="secondary-action" type="button" onClick={copyReviewLink}><Clipboard size={16} />{copied ? copy.copied : copy.copyMaintainer}</button> : null}
            {allowBuild && actorRole === 'owner' ? <button className="secondary-action" type="button" onClick={buildCapsule} disabled={busy}><FileCode2 size={16} />{copy.newVersion}</button> : null}
          </div>

          {canDecide ? (
            <div className="capsule-decision-actions">
              <button type="button" className="capsule-approve" onClick={() => decide('approved')} disabled={busy}>{busy ? <LoaderCircle className="spin" size={16} /> : <CheckCircle2 size={17} />}{copy.approve}</button>
              <button type="button" className="capsule-reject" onClick={() => decide('rejected')} disabled={busy}><X size={17} />{copy.reject}</button>
            </div>
          ) : null}
        </>
      )}

      <div className="verification-message" aria-live="polite"><ShieldCheck size={17} /><span>{message}</span></div>
    </section>
  );
}
