'use client';

import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import {
  Bot, Check, CircleHelp, Clipboard, Cloud, FileStack, Globe2, Languages,
  LoaderCircle, Radar, RefreshCw, Save, Settings2, ShieldAlert, Target, UserRound, UsersRound,
} from 'lucide-react';
import { CapsuleReview } from './capsule-review';
import { ProjectCreate } from './project-create';
import { privateUiCopy } from '../../lib/private-ui-copy.mjs';
import { IntakeAssistantPrototype } from './intake-assistant-prototype';
import { IntakeIntelligentCopilot } from './intake-intelligent-copilot';
import { isCopilotProjectAllowed } from '../../lib/copilot-rollout.mjs';
import {dossierDirtyFields} from '../../lib/dossier-progress.mjs';
import {DossierProgress} from './dossier-progress';
import { ScopeImport, type ReviewedScope } from './scope-import';
import {DOSSIER_GUIDE_COPY} from '../../lib/dossier-guide.mjs';
import { languageSelection, languageChoices, goalChoices } from '../../lib/intake-choice-compatibility.mjs';
import { planDossierRebase, resolveDossierRebase } from '../../lib/dossier-rebase.mjs';
import { IntakeConflictReview, type RebasePlan } from './intake-conflict-review';
import { createProjectSaveAttempt } from '../../lib/project-save-attempt.mjs';
import { hasPendingDraft, attachDraftExitGuard } from '../../lib/draft-exit-guard.mjs';
import { DraftExitDialog } from './draft-exit-dialog';
import { roadmapPresentation } from '../../lib/roadmap-presentation.mjs';
import { readProjectSaveResponse } from '../../lib/project-save-response.mjs';

import { shouldAutosaveProject } from '../../lib/project-autosave.mjs';
import { reconcileSavedDraft } from '../../lib/project-save-reconciliation.mjs';

type Intake = {
  organization: string; website: string; role: string; siteType: string; control: string;
  audience: string; goals: string[]; languages: string[]; cms: string; hosting: string;
  notes: string; maintainerName: string; maintainerEmail: string; dnsProvider: string;
  contentSources: string[]; desiredCapabilities: string[]; authorizedResources: string[];
  publicationPreference: string; crawlerSearchPolicy: string; crawlerTrainingPolicy: string;
  approverName: string; approverEmail: string; monitoringPreference: string;
};

type RoadmapItem = { id: string; title: string; reason: string; stage: string };
type SavedProject = Partial<Intake> & {
  revision?: number;
  id: string; completion: number; nextQuestion: string | null; roadmap: RoadmapItem[];
};
type DomainClaim = {
  id: string; projectId: string; hostname: string; canonicalOrigin: string;
  method: 'dns_txt' | 'http_file'; challengeName: string; challengeValue: string;
  challengeUrl: string; recordType: string; status: string; expiresAt: string;
  verifiedAt: string; verifiedUntil: string; attemptCount: number; lastAttemptAt: string;
  createdAt: string; notice: string;
};
type ProjectPayload = { error?: string; project?: SavedProject | null };
type ClaimPayload = {
  error?: string; claim?: DomainClaim | null; verified?: boolean; status?: string;
  reason?: string; attemptCount?: number; verifiedAt?: string; verifiedUntil?: string;
};
type ObservationSummary = {
  id: string; target: string; checkedAt: string;
  readiness: { score?: number; level?: string };
};
type ObservationPayload = { error?: string; observation?: ObservationSummary | null; notice?: string };

const emptyIntake: Intake = {
  organization: '', website: '', role: '', siteType: '', control: 'unknown', audience: '',
  goals: [], languages: [], cms: '', hosting: '', notes: '', maintainerName: '',
  maintainerEmail: '', dnsProvider: '', contentSources: [], desiredCapabilities: [],
  authorizedResources: [], publicationPreference: '', crawlerSearchPolicy: '',
  crawlerTrainingPolicy: '', approverName: '', approverEmail: '', monitoringPreference: '',
};

const listFields = new Set<keyof Intake>([
  'goals', 'languages', 'contentSources', 'desiredCapabilities', 'authorizedResources',
]);

function intakeFromProject(saved: Partial<Intake>): Intake {
  const output = { ...emptyIntake };
  for (const key of Object.keys(output) as Array<keyof Intake>) {
    const value = saved[key];
    if (listFields.has(key)) (output[key] as string[]) = Array.isArray(value) ? value : [];
    else (output[key] as string) = typeof value === 'string' ? value : output[key] as string;
  }
  return output;
}

type Locale = 'es' | 'en' | 'pt';

function formatDate(value: string, locale: Locale = 'es') {
  const date = new Date(value);
  if (!value || Number.isNaN(date.getTime())) return '';
  const tag = locale === 'en' ? 'en-US' : locale === 'pt' ? 'pt-BR' : 'es-AR';
  return new Intl.DateTimeFormat(tag, { dateStyle: 'medium', timeStyle: 'short' }).format(date);
}

function normalizedHostname(value: string) {
  if (!value.trim()) return '';
  try { return new URL(/^https?:\/\//i.test(value) ? value : `https://${value}`).hostname; }
  catch { return ''; }
}

function claimStatusLabel(claim: DomainClaim | null, locale: Locale) {
  const labels = locale === 'en'
    ? { none: 'Unverified', pending: 'Pending', verified: 'Verified until', expired: 'Expired', failed: 'Not verified', superseded: 'Replaced' }
    : locale === 'pt'
      ? { none: 'Não verificado', pending: 'Pendente', verified: 'Verificado até', expired: 'Vencido', failed: 'Não verificado', superseded: 'Substituído' }
      : { none: 'Sin verificar', pending: 'Pendiente', verified: 'Verificado hasta', expired: 'Vencido', failed: 'No verificado', superseded: 'Reemplazado' };
  if (!claim) return labels.none;
  if (claim.status === 'pending') return labels.pending;
  if (claim.status === 'verified') return `${labels.verified} ${formatDate(claim.verifiedUntil, locale)}`;
  if (claim.status === 'expired') return labels.expired;
  if (claim.status === 'failed') return labels.failed;
  if (claim.status === 'superseded') return labels.superseded;
  return labels.none;
}

function localizedMessage(locale: Locale, es: string, en: string, pt: string) {
  return locale === 'en' ? en : locale === 'pt' ? pt : es;
}

function claimFailureMessage(payload: ClaimPayload, locale: Locale) {
  if (payload.error) return payload.error;
  if (payload.reason === 'challenge_mismatch') return localizedMessage(locale, 'Todavía no encontramos el valor esperado. Revisa la publicación y vuelve a comprobar.', 'The expected value was not found yet. Review the publication and check again.', 'Ainda não encontramos o valor esperado. Revise a publicação e verifique novamente.');
  if (payload.reason === 'claim_expired') return localizedMessage(locale, 'El desafío venció. Crea uno nuevo para continuar.', 'The challenge expired. Create a new one to continue.', 'O desafio venceu. Crie um novo para continuar.');
  if (payload.reason === 'verification_read_failed') return localizedMessage(locale, 'No pudimos consultar el recurso público. Revisa DNS o el archivo y prueba nuevamente.', 'The public resource could not be read. Review DNS or the file and try again.', 'Não foi possível consultar o recurso público. Revise o DNS ou o arquivo e tente novamente.');
  return localizedMessage(locale, 'El dominio todavía no pudo verificarse.', 'The domain could not be verified yet.', 'O domínio ainda não pôde ser verificado.');
}

export function IntakeWorkspace({ userName, userEmail, locale = 'es', rehearsal, copilotEnabled = false, copilotProjectId = '' }: { userName: string; userEmail: string; locale?: Locale; rehearsal?: { request: typeof fetch; autoSave?: boolean }; copilotEnabled?: boolean; copilotProjectId?: string }) {
  const request = rehearsal?.request || fetch;
  const [autosavePaused, setAutosavePaused] = useState(false);
  const [manualBusy, setManualBusy] = useState(false);
  const [sessionRequired, setSessionRequired] = useState(false);
  const [exitTarget, setExitTarget] = useState<string | null>(null);
  const exitCleanup = useRef<(() => void) | null>(null);
  const savedBase = useRef<Intake>(emptyIntake);
  const [savedSnapshot, setSavedSnapshot] = useState<Intake>(emptyIntake);
  const savedRevision = useRef(0);
  const [scopeRevision,setScopeRevision]=useState(0);
  const [reviewedScope,setReviewedScope]=useState<ReviewedScope>(null);
  const [conflictReview, setConflictReview] = useState<{ current: SavedProject; plan: RebasePlan } | null>(null);
  const manualLock = useRef(false);
  const [saveAttempt] = useState(() => createProjectSaveAttempt());
  const copy = privateUiCopy(locale).intake;
  const [identitySection, goalsSection, controlSection, languagesSection, contentSection, capabilitiesSection, publicationSection, governanceSection] = copy.sections;
  const contentOptions = copy.content;
  const capabilityOptions = copy.capabilities;
  const resourceOptions = copy.resources;
  const [data, setData] = useState<Intake>(emptyIntake);
  const [projectId, setProjectId] = useState('');
  const [savedWebsite, setSavedWebsite] = useState('');
  const [loaded,setLoaded]=useState(false);
  const [loadAttempt,setLoadAttempt]=useState(0);
  const unconfirmedChanges=dossierDirtyFields(data,savedSnapshot).length>0;
  const savedMessage = rehearsal
    ? localizedMessage(locale, 'Guardado simulado. No se enviaron datos.', 'Simulated save. No data was sent.', 'Salvamento simulado. Nenhum dado foi enviado.')
    : localizedMessage(locale, 'Cambios guardados.', 'Changes saved.', 'Mudanças salvas.');
  const [roadmap, setRoadmap] = useState<RoadmapItem[]>([]);
  const [status, setStatus] = useState<'loading' | 'idle' | 'saving' | 'saved' | 'error'>('loading');
  const [message, setMessage] = useState(copy.loading);
  const [claim, setClaim] = useState<DomainClaim | null>(null);
  const [claimMethod, setClaimMethod] = useState<'dns_txt' | 'http_file'>('dns_txt');
  const [claimBusy, setClaimBusy] = useState(false);
  const [claimMessage, setClaimMessage] = useState(localizedMessage(locale, 'La verificación se inicia solo cuando la solicitas.', 'Verification starts only when you request it.', 'A verificação começa somente quando você solicita.'));
  const [copied, setCopied] = useState(false);
  const [observation, setObservation] = useState<ObservationSummary | null>(null);
  const [observationBusy, setObservationBusy] = useState(false);
  const [observationMessage, setObservationMessage] = useState(localizedMessage(locale, 'La auditoría pública normalmente no guarda resultados.', 'The public audit normally stores no results.', 'A auditoria pública normalmente não armazena resultados.'));
  const ready = useRef(false);

  useEffect(() => {
    if (ready.current) return;
    let cancelled = false;
    request(new URL(window.location.href).searchParams.has('project') ? `/api/projects?project=${encodeURIComponent(new URL(window.location.href).searchParams.get('project') || '')}` : '/api/projects', { cache: 'no-store' })
      .then(async (response) => {
        const payload = await response.json() as ProjectPayload;
        if (cancelled) return;
        if (!response.ok) throw new Error(payload.error || localizedMessage(locale, 'No se pudo abrir el expediente.', 'The dossier could not be opened.', 'Não foi possível abrir o dossiê.'));
        if (payload.project) {
          const saved = payload.project;
          setProjectId(saved.id);
          setSavedWebsite(saved.website || '');
          setData(intakeFromProject(saved));
          savedBase.current = intakeFromProject(saved);
          setSavedSnapshot(intakeFromProject(saved));
          savedRevision.current = saved.revision || 0;setScopeRevision(saved.revision || 0);
          setRoadmap(saved.roadmap || []);
          setMessage(copy.recovered);
        } else setMessage(copy.newDossier);
        setStatus('idle');
        ready.current = true;setLoaded(true);
      })
      .catch((error) => {
        if (cancelled) return;
        setStatus('error');
        setMessage(error instanceof Error ? error.message : localizedMessage(locale, 'No se pudo abrir el expediente.', 'The dossier could not be opened.', 'Não foi possível abrir o dossiê.'));
      });
    return () => { cancelled = true; };
  }, [copy.newDossier, copy.recovered, locale, request, rehearsal,loadAttempt]);

  useEffect(() => {
    if (!projectId) return;
    const controller = new AbortController();
    request(`/api/projects/${projectId}/domain-claims`, { cache: 'no-store', signal: controller.signal })
      .then(async (response) => {
        const payload = await response.json() as ClaimPayload;
        if (!response.ok) throw new Error(payload.error || localizedMessage(locale, 'No se pudo consultar la verificación.', 'Verification could not be loaded.', 'Não foi possível consultar a verificação.'));
        setClaim(payload.claim || null);
        if (payload.claim) setClaimMethod(payload.claim.method);
      })
      .catch((error) => {
        if (error instanceof DOMException && error.name === 'AbortError') return;
        setClaimMessage(error instanceof Error ? error.message : localizedMessage(locale, 'No se pudo consultar la verificación.', 'Verification could not be loaded.', 'Não foi possível consultar a verificação.'));
      });
    return () => controller.abort();
  }, [locale, projectId, request]);

  useEffect(() => {
    if (!projectId) return;
    const controller = new AbortController();
    request(`/api/projects/${projectId}/observations`, { cache: 'no-store', signal: controller.signal })
      .then(async (response) => {
        const payload = await response.json() as ObservationPayload;
        if (!response.ok) throw new Error(payload.error || localizedMessage(locale, 'No se pudo consultar la última observación.', 'The latest observation could not be loaded.', 'Não foi possível consultar a última observação.'));
        setObservation(payload.observation || null);
      })
      .catch((error) => {
        if (error instanceof DOMException && error.name === 'AbortError') return;
        setObservationMessage(error instanceof Error ? error.message : localizedMessage(locale, 'No se pudo consultar la última observación.', 'The latest observation could not be loaded.', 'Não foi possível consultar a última observação.'));
      });
    return () => controller.abort();
  }, [locale, projectId, request]);

  const saveReviewedDraft = useCallback(async () => {
    if (!ready.current || manualLock.current || conflictReview || !data.website) return;
    manualLock.current = true;
    setManualBusy(true);
    setStatus('saving');
    try {
      const response = await request('/api/projects', saveAttempt.prepare({ ...data, id: projectId, revision: savedRevision.current }));
      const parsed = await readProjectSaveResponse(response);
      if (parsed.sessionRequired) {
        setSessionRequired(true);
        setAutosavePaused(true);
        setStatus('error');
        return;
      }
      setSessionRequired(false);
      const payload = parsed.payload as ProjectPayload;
      if (response.status === 409 && payload.project && payload.project.id === projectId) {
        const plan = planDossierRebase(savedBase.current, data, intakeFromProject(payload.project), payload.project.revision);
        setAutosavePaused(true);
        setConflictReview({ current: payload.project, plan });
        setStatus('error');
        return;
      }
      if (!response.ok || !payload.project) throw new Error(payload.error || 'Save failed');
      const acknowledged = intakeFromProject(payload.project);
      savedBase.current = acknowledged;
      setData(current => reconcileSavedDraft(data, acknowledged, current));
      setSavedSnapshot(intakeFromProject(payload.project));
      savedRevision.current = payload.project.revision || 0;setScopeRevision(payload.project.revision || 0);
      setProjectId(payload.project.id);
      setSavedWebsite(payload.project.website || '');
      setRoadmap(payload.project.roadmap || []);
      setStatus('saved');
      setAutosavePaused(false);
      setSessionRequired(false);
      setMessage(rehearsal
        ? localizedMessage(locale, 'Guardado simulado. No se enviaron datos.', 'Simulated save. No data was sent.', 'Salvamento simulado. Nenhum dado foi enviado.')
        : localizedMessage(locale, 'Cambios guardados.', 'Changes saved.', 'Mudanças salvas.'));
    } catch (error) {
      setAutosavePaused(true);
      setStatus('error');
      setMessage(error instanceof Error && error.message === 'invalid_save_response'
        ? localizedMessage(locale, 'No pudimos confirmar el guardado. Tu borrador sigue aqui. Comprueba tu sesion en otra pestana y vuelve a guardar.', 'We could not confirm the save. Your draft is still here. Check your session in another tab and save again.', 'Nao foi possivel confirmar o salvamento. Seu rascunho continua aqui. Confira sua sessao em outra aba e salve novamente.')
        : error instanceof Error && error.message === 'invalid_proposal'
        ? localizedMessage(locale, 'Tu borrador se conserva. Hay un dato con formato o longitud que no podemos conciliar. Revisalo en el formulario antes de volver a guardar. No se guardaron estos cambios.', 'Your draft is preserved. A detail has a format or length we cannot reconcile. Review it in the form before saving again. These changes were not saved.', 'Seu rascunho foi preservado. Um dado tem formato ou tamanho que não conseguimos conciliar. Revise no formulário antes de salvar novamente. Estas alterações não foram salvas.')
        : error instanceof Error && error.message === 'response_lost'
          ? localizedMessage(locale, 'No recibimos la confirmación. Tu borrador sigue aquí: vuelve a guardar y comprobaremos el mismo intento sin duplicarlo.', 'Confirmation was not received. Your draft is still here: save again to check the same attempt without duplicating it.', 'Não recebemos a confirmação. Seu rascunho continua aqui: salve novamente para verificar a mesma tentativa sem duplicá-la.')
          : error instanceof Error ? error.message : 'Save failed');
    } finally {
      manualLock.current = false;
      setManualBusy(false);
    }
  }, [conflictReview, data, locale, projectId, rehearsal, request, saveAttempt]);

  useEffect(() => {
    if (!shouldAutosaveProject({ ready: ready.current, draft: data, base: savedBase.current,
      manual: Boolean(rehearsal && !rehearsal.autoSave), busy: manualBusy, paused: autosavePaused,
      conflict: Boolean(conflictReview), sessionRequired })) return;
    if (exitTarget) return;
    const timer = window.setTimeout(async () => {
      await saveReviewedDraft();
    }, 900);
    return () => window.clearTimeout(timer);
  }, [data, rehearsal, manualBusy, autosavePaused, conflictReview, sessionRequired, saveReviewedDraft, status, exitTarget]);

  useEffect(() => {
    if (!hasPendingDraft({ ready: ready.current, draft: data, base: savedBase.current,
      busy: manualBusy, conflict: Boolean(conflictReview) })) return;
    const cleanup = attachDraftExitGuard(window, document, (href: string) => { setExitTarget(href); return false; });
    exitCleanup.current = cleanup;
    return () => { cleanup(); exitCleanup.current = null; };
  }, [data, manualBusy, conflictReview, status, locale]);

  function confirmConflictReview(choices: Record<string, string>) {
    if (!conflictReview) return;
    const { current, plan } = conflictReview;
    const combined = resolveDossierRebase(intakeFromProject(current), current.revision, plan, choices);
    setData(intakeFromProject(combined));
    savedBase.current = intakeFromProject(current);
    setSavedSnapshot(intakeFromProject(current));
    setSavedWebsite(current.website || "");
    savedRevision.current = current.revision || 0;setScopeRevision(current.revision || 0);
    setConflictReview(null);
    setAutosavePaused(true);
    setStatus('idle');
    setMessage(localizedMessage(locale, 'Revisión aplicada al borrador. Confirma el guardado cuando estés listo.', 'Review applied to your draft. Confirm saving when ready.', 'Revisão aplicada ao rascunho. Confirme o salvamento quando estiver pronto.'));
  }

  const hostname = useMemo(() => normalizedHostname(data.website), [data.website]);
  const activeClaim = claim?.hostname === hostname ? claim : null;
  const websiteIsSaved = Boolean(
    projectId && hostname && normalizedHostname(savedWebsite) === hostname && status !== 'saving',
  );
  const challengeCopy = activeClaim?.method === 'dns_txt'
    ? `Tipo: TXT\nNombre: ${activeClaim.challengeName}\nValor: ${activeClaim.challengeValue}`
    : activeClaim ? `URL: ${activeClaim.challengeUrl}\nContenido:\n${activeClaim.challengeValue}` : '';
  const visibleClaimMessage = claim && !activeClaim
    ? localizedMessage(locale, 'El sitio cambió. Crea instrucciones nuevas para verificar el dominio guardado.', 'The website changed. Create new instructions for the saved domain.', 'O site mudou. Crie novas instruções para verificar o domínio salvo.')
    : claimMessage;

  function update<K extends keyof Intake>(field: K, value: Intake[K]) {
    setData((current) => ({ ...current, [field]: value }));
    if (rehearsal) {
      setStatus('idle');
      setMessage(localizedMessage(locale, 'Borrador sin guardar.', 'Unsaved draft.', 'Rascunho não salvo.'));
    }
  }
  function toggleList(field: 'goals' | 'languages' | 'contentSources' | 'desiredCapabilities' | 'authorizedResources', value: string) {
    const current = data[field];
    update(field, current.includes(value) ? current.filter((item) => item !== value) : [...current, value]);
  }

  async function createClaim() {
    if (!projectId || !websiteIsSaved) {
      setClaimMessage(localizedMessage(locale, 'Espera a que el sitio termine de guardarse antes de iniciar la verificación.', 'Wait for the website to finish saving before starting verification.', 'Aguarde o site terminar de salvar antes de iniciar a verificação.'));
      return;
    }
    setClaimBusy(true); setCopied(false); setClaimMessage(localizedMessage(locale, 'Preparando instrucciones...', 'Preparing instructions...', 'Preparando instruções...'));
    try {
      const response = await request(`/api/projects/${projectId}/domain-claims`, {
        method: 'POST', headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ method: claimMethod }),
      });
      const payload = await response.json() as ClaimPayload;
      if (!response.ok || !payload.claim) throw new Error(payload.error || localizedMessage(locale, 'No se pudo crear la verificación.', 'Verification could not be created.', 'Não foi possível criar a verificação.'));
      setClaim(payload.claim);
      setClaimMessage(localizedMessage(locale, 'Instrucciones listas. Publica el valor y después usa Comprobar ahora.', 'Instructions ready. Publish the value, then use Check now.', 'Instruções prontas. Publique o valor e depois use Verificar agora.'));
    } catch (error) {
      setClaimMessage(error instanceof Error ? error.message : localizedMessage(locale, 'No se pudo crear la verificación.', 'Verification could not be created.', 'Não foi possível criar a verificação.'));
    } finally { setClaimBusy(false); }
  }

  async function verifyClaim() {
    if (!projectId || !activeClaim) return;
    setClaimBusy(true); setClaimMessage(localizedMessage(locale, 'Comprobando el recurso público...', 'Checking the public resource...', 'Verificando o recurso público...'));
    try {
      const response = await request(`/api/projects/${projectId}/domain-claims/${activeClaim.id}/verify`, { method: 'POST' });
      const payload = await response.json() as ClaimPayload;
      if (!response.ok || !payload.verified) {
        setClaim((current) => current ? { ...current, status: payload.status || current.status, attemptCount: payload.attemptCount ?? current.attemptCount } : current);
        throw new Error(claimFailureMessage(payload, locale));
      }
      setClaim((current) => current ? {
        ...current, status: 'verified', verifiedAt: payload.verifiedAt || '',
        verifiedUntil: payload.verifiedUntil || '', attemptCount: payload.attemptCount ?? current.attemptCount,
      } : current);
      setClaimMessage(localizedMessage(locale, 'Dominio verificado. La comprobación no concede escritura ni publica un perfil.', 'Domain verified. This check grants no write access and publishes no profile.', 'Domínio verificado. A verificação não concede escrita nem publica um perfil.'));
    } catch (error) {
      setClaimMessage(error instanceof Error ? error.message : localizedMessage(locale, 'No se pudo comprobar el dominio.', 'The domain could not be checked.', 'Não foi possível verificar o domínio.'));
    } finally { setClaimBusy(false); }
  }

  async function copyChallenge() {
    if (!challengeCopy) return;
    try {
      await navigator.clipboard.writeText(challengeCopy);
      setCopied(true); setClaimMessage(localizedMessage(locale, 'Instrucciones copiadas.', 'Instructions copied.', 'Instruções copiadas.'));
    } catch { setClaimMessage(localizedMessage(locale, 'No se pudo copiar automáticamente. Selecciona el texto manualmente.', 'The instructions could not be copied automatically. Select the text manually.', 'Não foi possível copiar automaticamente. Selecione o texto manualmente.')); }
  }

  async function saveObservation() {
    if (!projectId || !websiteIsSaved) {
      setObservationMessage(localizedMessage(locale, 'Espera a que el sitio termine de guardarse antes de auditarlo.', 'Wait for the website to finish saving before auditing it.', 'Aguarde o site terminar de salvar antes de auditá-lo.'));
      return;
    }
    setObservationBusy(true);
    setObservationMessage(localizedMessage(locale, 'Auditando recursos públicos y preparando una copia saneada...', 'Auditing public resources and preparing a sanitized copy...', 'Auditando recursos públicos e preparando uma cópia saneada...'));
    try {
      const response = await request(`/api/projects/${projectId}/observations`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ confirmSave: true }),
      });
      const payload = await response.json() as ObservationPayload;
      if (!response.ok || !payload.observation) throw new Error(payload.error || localizedMessage(locale, 'No se pudo guardar la observación.', 'The observation could not be saved.', 'Não foi possível salvar a observação.'));
      setObservation(payload.observation);
      setObservationMessage(localizedMessage(locale, 'Observación guardada. El escáner público sigue sin almacenar auditorías automáticas.', 'Observation saved. The public scanner still stores no automatic audits.', 'Observação salva. O scanner público continua sem armazenar auditorias automáticas.'));
    } catch (error) {
      setObservationMessage(error instanceof Error ? error.message : localizedMessage(locale, 'No se pudo guardar la observación.', 'The observation could not be saved.', 'Não foi possível salvar a observação.'));
    } finally {
      setObservationBusy(false);
    }
  }

  return (
    <div className="intake-layout">
      <a className="dossier-help-dock" href="#dossier-assistant" onClick={()=>{const panel=document.getElementById('dossier-assistant');if(panel instanceof HTMLDetailsElement)panel.open=true;}}>{localizedMessage(locale,'Necesito ayuda','I need help','Preciso de ajuda')}</a>
      {exitTarget && <DraftExitDialog locale={locale} onStay={() => setExitTarget(null)} onLeave={() => {
        exitCleanup.current?.();
        window.location.assign(exitTarget);
      }} />}
      <main className="intake-main">
        <fieldset disabled={Boolean(manualBusy || conflictReview || !loaded)} style={{ border: 0, padding: 0, margin: 0, minWidth: 0 }}>
        <div className="page-title">
          <span>{copy.pageEyebrow}</span>
          <h1>{privateUiCopy(locale).dossier.title}</h1>
          <p>{privateUiCopy(locale).dossier.intro}</p>
        </div>

        <ScopeImport onReviewChange={setReviewedScope} locale={locale} website={data.website} projectId={projectId || ""} revision={scopeRevision} canSave={Boolean(projectId && data.website === savedWebsite && status !== "saving")} request={request} onUseWebsite={website => {
          if(manualLock.current || data.website.trim())return;
          setAutosavePaused(true);setData(current=>({...current,website}));setStatus('idle');setMessage(DOSSIER_GUIDE_COPY[locale].draft);
        }}/>
        <details id="dossier-assistant" className="dossier-assistant" open>
          <summary>{DOSSIER_GUIDE_COPY[locale].assist}</summary>
          <p>{DOSSIER_GUIDE_COPY[locale].local}</p>
          <IntakeAssistantPrototype locale={locale} draft={data} reviewedScope={reviewedScope} onApply={next => {
            if(manualLock.current)return;
            setAutosavePaused(true);setData(intakeFromProject(next));setStatus('idle');setMessage(DOSSIER_GUIDE_COPY[locale].draft);
          }} />
        </details>
        {isCopilotProjectAllowed({ enabled: copilotEnabled, allowedProjectId: copilotProjectId, projectId }) && !rehearsal ? <details className="dossier-assistant"><summary>{locale === 'en' ? 'Intelligent copilot' : 'Copilot inteligente'}</summary>
          <IntakeIntelligentCopilot key={`${projectId}:${locale}`} projectId={projectId} locale={locale} draft={data} onApply={next => {
            if (manualLock.current) return;
            setAutosavePaused(true); setData(intakeFromProject(next)); setStatus('idle'); setMessage(DOSSIER_GUIDE_COPY[locale].draft);
          }} />
        </details> : null}
        <div id="dossier-form" />

        <FormSection icon={<UserRound size={20} />} id="dossier-identity" title={identitySection[1]} subtitle={identitySection[2]}>
          <div className="field-grid">
            <label>{copy.organization}<input value={data.organization} onChange={(event) => update('organization', event.target.value)} placeholder="Museo Top" /></label>
            <label>{copy.website}<input id="dossier-website" value={data.website} onChange={(event) => update('website', event.target.value)} placeholder="example.org" inputMode="url" /></label>
            <label>{copy.role}<input value={data.role} onChange={(event) => update('role', event.target.value)} placeholder={locale === 'en' ? 'Owner, artist, manager...' : locale === 'pt' ? 'Owner, artista, responsável...' : 'Owner, artista, responsable...'} /></label>
            <label>{copy.siteType}<select value={data.siteType} onChange={(event) => update('siteType', event.target.value)}><option value="">{copy.choose}</option>{copy.siteTypes.map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></label>
          </div>
          <label className="wide-field">{copy.audience}<textarea value={data.audience} onChange={(event) => update('audience', event.target.value)} placeholder={locale === 'en' ? 'People, organizations or agents that should find and understand you.' : locale === 'pt' ? 'Pessoas, organizações ou agentes que devem encontrar e compreender você.' : 'Personas, organizaciones o agentes que deberían encontrarte y entenderte.'} /></label>
        </FormSection>

        <FormSection icon={<Target size={20} />} id="dossier-goals" title={goalsSection[1]} subtitle={goalsSection[2]}>
          <ChoiceList options={goalChoices(locale, data.goals)} values={data.goals} onToggle={(value) => toggleList('goals', value)} />
        </FormSection>

        <FormSection icon={<Cloud size={20} />} id="dossier-control" title={controlSection[1]} subtitle={controlSection[2]}>
          <div className="field-grid">
            <label>{copy.labels.control}<select value={data.control} onChange={(event) => update('control', event.target.value)}>{copy.controls.map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></label>
            <label>{copy.labels.cms}<input value={data.cms} onChange={(event) => update('cms', event.target.value)} placeholder="WordPress, Shopify..." /></label>
            <label>{copy.labels.hosting}<input value={data.hosting} onChange={(event) => update('hosting', event.target.value)} placeholder="Cloudflare, Vercel..." /></label>
          </div>
          <div className="security-note"><ShieldAlert size={19} /><div><strong>{copy.labels.noSecrets}</strong><span>{copy.labels.noSecretsBody}</span></div></div>
        </FormSection>

        <FormSection icon={<Languages size={20} />} id="dossier-languages" title={languagesSection[1]} subtitle={languagesSection[2]}>
          <ChoiceList compact options={languageChoices(locale, data.languages)} values={languageSelection(data.languages)} onToggle={(value) => {
            const selected = languageSelection(data.languages);
            update('languages', selected.includes(value) ? selected.filter((item: string) => item !== value) : [...selected, value]);
          }} />
        </FormSection>

        <FormSection icon={<FileStack size={20} />} id="dossier-content" title={contentSection[1]} subtitle={contentSection[2]}>
          <ChoiceList compact options={contentOptions} values={data.contentSources} onToggle={(value) => toggleList('contentSources', value)} />
          <label className="wide-field">{copy.labels.notes}<textarea value={data.notes} onChange={(event) => update('notes', event.target.value)} placeholder={locale === 'en' ? 'Write freely. The system will help organize this information before it becomes content or tools.' : locale === 'pt' ? 'Escreva livremente. O sistema ajudará a organizar antes de transformar em conteúdo ou ferramentas.' : 'Escribe libremente. El sistema ayudará a ordenar antes de convertir en contenido o herramientas.'} /></label>
        </FormSection>

        <FormSection icon={<Bot size={20} />} id="dossier-capabilities" title={capabilitiesSection[1]} subtitle={capabilitiesSection[2]}>
          <span className="field-label">{copy.labels.desired}</span>
          <ChoiceList compact options={capabilityOptions} values={data.desiredCapabilities} onToggle={(value) => toggleList('desiredCapabilities', value)} />
          <span className="field-label spaced">{copy.labels.proposed}</span>
          <ChoiceList compact options={resourceOptions} values={data.authorizedResources} onToggle={(value) => toggleList('authorizedResources', value)} />
          <p className="scope-note">{copy.labels.scope}</p>
        </FormSection>

        <FormSection icon={<Globe2 size={20} />} id="dossier-publication" title={publicationSection[1]} subtitle={publicationSection[2]}>
          <div className="field-grid">
            <label>{copy.labels.firstPublication}<select value={data.publicationPreference} onChange={(event) => update('publicationPreference', event.target.value)}><option value="">{copy.choose}</option>{copy.publication.map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></label>
            <label>{copy.labels.searchPolicy}<select value={data.crawlerSearchPolicy} onChange={(event) => update('crawlerSearchPolicy', event.target.value)}><option value="">{copy.choose}</option>{copy.searchPolicies.map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></label>
            <label>{copy.labels.trainingPolicy}<select value={data.crawlerTrainingPolicy} onChange={(event) => update('crawlerTrainingPolicy', event.target.value)}><option value="">{copy.choose}</option>{copy.trainingPolicies.map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></label>
            <label>{copy.labels.monitoring}<select value={data.monitoringPreference} onChange={(event) => update('monitoringPreference', event.target.value)}><option value="">{copy.choose}</option>{copy.monitoring.map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></label>
          </div>
        </FormSection>

        <FormSection icon={<UsersRound size={20} />} id="dossier-governance" title={governanceSection[1]} subtitle={governanceSection[2]}>
          <div className="field-grid">
            <label>{copy.labels.maintainer}<input value={data.maintainerName} onChange={(event) => update('maintainerName', event.target.value)} /></label>
            <label>{copy.labels.maintainerEmail}<input value={data.maintainerEmail} onChange={(event) => update('maintainerEmail', event.target.value)} placeholder="web@example.org" inputMode="email" /></label>
            <label>{copy.labels.dns}<input value={data.dnsProvider} onChange={(event) => update('dnsProvider', event.target.value)} placeholder="Cloudflare, GoDaddy..." /></label>
            <label>{copy.labels.approver}<input value={data.approverName} onChange={(event) => update('approverName', event.target.value)} /></label>
            <label>{copy.labels.approverEmail}<input value={data.approverEmail} onChange={(event) => update('approverEmail', event.target.value)} placeholder="owner@example.org" inputMode="email" /></label>
          </div>
        </FormSection>

        <section id="dossier-verification" className="form-section verification-section">
          <div className="verification-heading">
            <div className="form-section-title"><Settings2 size={20} /><div><strong>{copy.labels.verify}</strong><span>{copy.labels.verifySubtitle}</span></div></div>
            <span className="verification-status" data-status={activeClaim?.status || 'unverified'}>{claimStatusLabel(activeClaim, locale)}</span>
          </div>
          <div className="domain-summary"><span>{locale === 'en' ? 'Dossier domain' : locale === 'pt' ? 'Domínio do dossiê' : 'Dominio del expediente'}</span><strong>{hostname || (locale === 'en' ? 'Enter a valid website' : locale === 'pt' ? 'Informe um site válido' : 'Completa un sitio web válido')}</strong></div>
          <div className="verification-controls">
            <div className="method-switch" aria-label={copy.verifyTitle}>
              <button type="button" className={claimMethod === 'dns_txt' ? 'active' : ''} onClick={() => setClaimMethod('dns_txt')}>DNS TXT</button>
              <button type="button" className={claimMethod === 'http_file' ? 'active' : ''} onClick={() => setClaimMethod('http_file')}>{locale === 'en' ? 'HTTP file' : locale === 'pt' ? 'Arquivo HTTP' : 'Archivo HTTP'}</button>
            </div>
            <button className="primary-action" type="button" onClick={createClaim} disabled={claimBusy || !websiteIsSaved || !hostname}>{claimBusy ? <LoaderCircle className="spin" size={16} /> : <Globe2 size={16} />}{copy.labels.createInstructions}</button>
          </div>
          {!websiteIsSaved && data.website ? <p className="inline-warning">{localizedMessage(locale, 'Espera a que el sitio termine de guardarse para evitar verificar una dirección anterior.', 'Wait for the website to finish saving so an earlier address is not verified.', 'Aguarde o site terminar de salvar para evitar verificar um endereço anterior.')}</p> : null}
          {activeClaim ? (
            <div className="challenge-instructions">
              <div><span>{activeClaim.method === 'dns_txt' ? (locale === 'en' ? 'Record to publish' : locale === 'pt' ? 'Registro a publicar' : 'Registro a publicar') : (locale === 'en' ? 'File to publish' : locale === 'pt' ? 'Arquivo a publicar' : 'Archivo a publicar')}</span><strong>{activeClaim.method === 'dns_txt' ? (locale === 'en' ? 'Add a TXT record at your DNS provider.' : locale === 'pt' ? 'Adicione um registro TXT no provedor DNS.' : 'Agrega un registro TXT en tu proveedor DNS.') : (locale === 'en' ? 'Publish this JSON at the indicated URL.' : locale === 'pt' ? 'Publique este JSON na URL indicada.' : 'Publica este JSON en la URL indicada.')}</strong></div>
              <dl className="challenge-values">
                {activeClaim.method === 'dns_txt' ? <><div><dt>Tipo</dt><dd>TXT</dd></div><div><dt>Nombre</dt><dd>{activeClaim.challengeName}</dd></div><div><dt>Valor</dt><dd>{activeClaim.challengeValue}</dd></div></> : <><div><dt>URL</dt><dd>{activeClaim.challengeUrl}</dd></div><div><dt>Contenido</dt><dd>{activeClaim.challengeValue}</dd></div></>}
              </dl>
              <div className="challenge-actions">
                <button className="secondary-action" type="button" onClick={copyChallenge}><Clipboard size={16} />{copied ? copy.labels.copied : copy.labels.copyInstructions}</button>
                <button className="primary-action" type="button" onClick={verifyClaim} disabled={claimBusy || activeClaim.status !== 'pending'}><RefreshCw size={16} />{copy.labels.checkNow}</button>
              </div>
              <small>{locale === 'en' ? 'Expires' : locale === 'pt' ? 'Vence' : 'Vence'} {formatDate(activeClaim.expiresAt, locale)} · {activeClaim.attemptCount}/10</small>
            </div>
          ) : null}
          <div className="verification-message" aria-live="polite"><CircleHelp size={17} /><span>{visibleClaimMessage}</span></div>
          <p className="scope-note strong-note"><strong>{locale === 'en' ? 'It does not publish the profile automatically.' : locale === 'pt' ? 'Não publica o perfil automaticamente.' : 'No publica el perfil automáticamente.'}</strong> {copy.verifyBody}</p>
        </section>

        <section className="form-section observation-section">
          <div className="verification-heading">
            <div className="form-section-title"><Radar size={20} /><div><strong>{copy.labels.observation}</strong><span>{copy.labels.observationSubtitle}</span></div></div>
            <span className="verification-status" data-status={observation ? 'verified' : 'unverified'}>
              {observation ? `${observation.readiness.level || 'Audit'} · ${observation.readiness.score ?? 0}/100` : (locale === 'en' ? 'No saved observation' : locale === 'pt' ? 'Sem observação salva' : 'Sin observación guardada')}
            </span>
          </div>
          <p className="observation-copy">{localizedMessage(locale, 'El escáner público normalmente no guarda resultados. Esta acción ejecuta la misma lectura pública y conserva en tu expediente solo evidencia, puntaje, rutas y fecha; elimina cuerpos HTTP, errores crudos y cabeceras sensibles.', 'The public scanner normally stores no results. This action runs the same public reading and saves only evidence, score, paths and date in your dossier; HTTP bodies, raw errors and sensitive headers are removed.', 'O scanner público normalmente não armazena resultados. Esta ação executa a mesma leitura pública e salva no dossiê somente evidências, pontuação, rotas e data; corpos HTTP, erros brutos e cabeçalhos sensíveis são removidos.')}</p>
          {observation ? <div className="last-observation"><span>{locale === 'en' ? 'Latest observation' : locale === 'pt' ? 'Última observação' : 'Última observación'}</span><strong>{formatDate(observation.checkedAt, locale)}</strong><small>{observation.target}</small></div> : null}
          <button className="primary-action" type="button" onClick={saveObservation} disabled={observationBusy || !websiteIsSaved}>
            {observationBusy ? <LoaderCircle className="spin" size={16} /> : <Radar size={16} />}
            {copy.labels.auditSave}
          </button>
          <div className="verification-message" aria-live="polite"><CircleHelp size={17} /><span>{observationMessage}</span></div>
        </section>

        {!rehearsal ? <div id="dossier-capsule"><CapsuleReview projectId={projectId} expectedDomain={hostname} allowBuild locale={locale} /></div> : null}
        </fieldset>
      </main>

      <aside className="intake-aside">
        <DossierProgress draft={data} saved={savedSnapshot} loaded={loaded} projectId={projectId} status={status} sessionRequired={sessionRequired} conflict={Boolean(conflictReview)} verified={activeClaim?.status === 'verified' && websiteIsSaved} verifiedUntil={activeClaim?.verifiedUntil || ''} locale={locale} rehearsal={Boolean(rehearsal)} onRetryLoad={()=>{if(loaded)return;setStatus('loading');setLoadAttempt(value=>value+1);}}/>
        {!rehearsal && projectId ? <ProjectCreate locale={locale} disabled={manualBusy || Boolean(conflictReview) || sessionRequired || shouldAutosaveProject({ ready: true, draft: data, base: savedSnapshot }) || (status !== 'idle' && status !== 'saved')} /> : null}
        {conflictReview ? <div id="dossier-conflict"><IntakeConflictReview key={conflictReview.plan.revision} locale={locale} plan={conflictReview.plan} onConfirm={confirmConflictReview} onCancel={() => setConflictReview(null)} /></div> : null}
        {<button id="dossier-save" className="primary-action" type="button" disabled={manualBusy || Boolean(conflictReview) || !loaded || !data.website} onClick={saveReviewedDraft}><Save size={17} />{rehearsal ? localizedMessage(locale, 'Confirmar guardado simulado', 'Confirm simulated save', 'Confirmar salvamento simulado') : localizedMessage(locale, 'Guardar cambios', 'Save changes', 'Salvar alterações')}</button>}
        {sessionRequired ? <p id="dossier-session" tabIndex={-1} role="alert">{!rehearsal ? localizedMessage(locale, 'La sesión venció. Conserva esta pestaña abierta e inicia sesión en otra pestaña; después vuelve a guardar aquí.', 'Your session expired. Keep this tab open and sign in in another tab; then return here and save again.', 'Sua sessão expirou. Mantenha esta aba aberta e entre em outra aba; depois volte e salve novamente.') : localizedMessage(locale,
          'La sesión de prueba venció. Tus cambios siguen en este formulario, sin guardar. No cierres ni recargues esta pestaña. Restablece la sesión simulada arriba y vuelve a confirmar el guardado; no necesitas completar todo otra vez.',
          'The test session expired. Your unsaved changes remain in this form. Do not close or reload this tab. Restore the simulated session above, then confirm saving again; you do not need to fill everything out again.',
          'A sessão de teste expirou. Suas alterações continuam neste formulário, sem salvar. Não feche nem recarregue esta aba. Restabeleça a sessão simulada acima e confirme o salvamento novamente; não precisa preencher tudo outra vez.')}</p> : null}
        <div className="owner-chip"><span>{userName.slice(0, 1).toUpperCase()}</span><div><strong>{userName}</strong><small>{userEmail}</small></div></div>
        {!sessionRequired ? <div className="save-status" data-status={status==='saved' && unconfirmedChanges ? 'idle' : status}>{status === 'saving' || status === 'loading' ? <LoaderCircle className="spin" size={17} /> : status === 'saved' ? <Check size={17} /> : <Save size={17} />}<span>{status === 'saved' ? unconfirmedChanges ? DOSSIER_GUIDE_COPY[locale].draft : savedMessage : message}</span></div> : null}
        {roadmap.length ? <div className="mini-roadmap"><span>{copy.labels.firstRoadmap}</span>{roadmap.slice(0, 4).map(item => roadmapPresentation(item, locale)).map((item) => <div key={item.id}><small>{item.stage}</small><strong>{item.title}</strong></div>)}</div> : null}
      </aside>
    </div>
  );
}

function FormSection({ id, icon, title, subtitle, children }: { id:string; icon: ReactNode; title: string; subtitle: string; children: ReactNode }) {
  return <section id={id} className="form-section"><div className="form-section-title">{icon}<div><strong>{title}</strong><span>{subtitle}</span></div></div>{children}</section>;
}

function ChoiceList({ options, values, onToggle, compact = false }: { options: string[][]; values: string[]; onToggle: (value: string) => void; compact?: boolean }) {
  return <div className={compact ? 'choice-grid compact' : 'choice-grid'}>{options.map(([value, label]) => <Choice key={value} active={values.includes(value)} label={label} onClick={() => onToggle(value)} />)}</div>;
}

function Choice({ active, label, onClick }: { active: boolean; label: string; onClick: () => void }) {
  return <button className={active ? 'choice active' : 'choice'} type="button" onClick={onClick} aria-pressed={active}><span>{active ? <Check size={15} /> : null}</span>{label}</button>;
}
