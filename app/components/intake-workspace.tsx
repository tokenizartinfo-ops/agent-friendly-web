'use client';

import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import {
  Bot, Check, CircleHelp, Clipboard, Cloud, FileStack, Globe2, Languages,
  LoaderCircle, Radar, RefreshCw, Save, Settings2, ShieldAlert, Target, UserRound, UsersRound,
} from 'lucide-react';
import { CapsuleReview } from './capsule-review';
import { ProjectCreate } from './project-create';
import { ProjectDirectory } from './project-directory';
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
import { proportionalTargetGuide } from '../../lib/proportional-target.mjs';
import { readProjectSaveResponse } from '../../lib/project-save-response.mjs';
import { createObservationSaveAttempt } from '../../lib/observation-save-attempt.mjs';
import { currentOriginObservations, observationOrigin } from '../../lib/observation-current-origin.mjs';
import { observationScoreLabel } from '../../lib/observation-score-copy.mjs';
import { SavedObservationEvidence } from './saved-observation-evidence';
import { readObservationSnapshot } from '../../lib/observation-read-client.mjs';
import { compareObservationHistory } from '../../lib/observation-history.mjs';
import { missingIntakeQuestions } from '../../lib/intake-question-coach.mjs';
import { isGuidedPilotView } from '../../lib/guided-pilot-view.mjs';
import { dossierUpdates,dossierUpdatesReadState,DOSSIER_UPDATES_READ_COPY } from '../../lib/dossier-updates.mjs';
import { revealDossierDelivery } from '../../lib/dossier-delivery-navigation.mjs';

import { shouldAutosaveProject } from '../../lib/project-autosave.mjs';
import { reconcileSavedDraft } from '../../lib/project-save-reconciliation.mjs';
import { DossierAssistance } from './dossier-assistance';

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
  evidence?: Record<string,boolean>;
};
type ObservationHistoryItem = {id:string;target:string;checkedAt:string;score:number|null;level:string;methodology:string};
type ObservationPayload = { error?: string; code?: string; observation?: ObservationSummary | null; history?: ObservationHistoryItem[]; notice?: string; replayed?: boolean };

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

export function IntakeWorkspace({ userName, userEmail, locale = 'es', rehearsal, copilotEnabled = false, copilotProjectId = '', assistanceEnabled = false, assistanceProjectId = '', assistanceGoalConsentEnabled = false }: { userName: string; userEmail: string; locale?: Locale; rehearsal?: { request: typeof fetch; autoSave?: boolean }; copilotEnabled?: boolean; copilotProjectId?: string; assistanceEnabled?: boolean; assistanceProjectId?: string; assistanceGoalConsentEnabled?: boolean }) {
  const request = rehearsal?.request || fetch;
  const [autosavePaused, setAutosavePaused] = useState(false);
  const [manualBusy, setManualBusy] = useState(false);
  const [sessionRequired, setSessionRequired] = useState(false);
  const [exitTarget, setExitTarget] = useState<string | null>(null);
  const exitCleanup = useRef<(() => void) | null>(null);
  const [workingPending, setWorkingPending] = useState(false);
  const workingSave = useRef<(() => Promise<boolean>) | null>(null);
  const workingExit = useRef<(() => void) | null>(null);
  const savedBase = useRef<Intake>(emptyIntake);
  const [savedSnapshot, setSavedSnapshot] = useState<Intake>(emptyIntake);
  const savedRevision = useRef(0);
  const [scopeRevision,setScopeRevision]=useState(0);
  const [reviewedScope,setReviewedScope]=useState<ReviewedScope>(null);
  const [separateScope,setSeparateScope]=useState<{website:string;scopeText:string}|null>(null);
  const [availableScope,setAvailableScope]=useState<{website:string;scopeText:string}|null>(null);
  const [conflictReview, setConflictReview] = useState<{ current: SavedProject; plan: RebasePlan } | null>(null);
  const manualLock = useRef(false);
  const sourceHints = useRef<Record<string, { kind: 'copilot_reviewed'; value: string | string[] }>>({});
  const [saveAttempt] = useState(() => createProjectSaveAttempt());
  const copy = privateUiCopy(locale).intake;
  const [identitySection, goalsSection, controlSection, languagesSection, contentSection, capabilitiesSection, publicationSection, governanceSection] = copy.sections;
  const contentOptions = copy.content;
  const capabilityOptions = copy.capabilities;
  const resourceOptions = copy.resources;
  const [data, setData] = useState<Intake>(emptyIntake);
  const targetGuide = proportionalTargetGuide(data, locale);
  const [projectId, setProjectId] = useState('');
  const [savedWebsite, setSavedWebsite] = useState('');
  const [loaded,setLoaded]=useState(false);
  const [guidedViewRequested,setGuidedViewRequested]=useState(true);
  const [guidedDeliveryRequested, setGuidedDeliveryRequested] = useState(false);
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
  const [observationHistory,setObservationHistory]=useState<ObservationHistoryItem[]>([]);
  const [observationReadFailure,setObservationReadFailure]=useState<{projectId:string;website:string}|null>(null);
  const [observationReadReady,setObservationReadReady]=useState<{projectId:string;website:string}|null>(null);
  const [observationLoadAttempt,setObservationLoadAttempt]=useState(0);
  const [observationBusy, setObservationBusy] = useState(false);
  const observationLock=useRef(false);
  const [observationAttempt]=useState(()=>createObservationSaveAttempt());
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
    readObservationSnapshot(projectId,request,controller.signal)
      .then((payload) => {
        if(controller.signal.aborted)return;
        setObservation(payload.observation || null);
        setObservationHistory(Array.isArray(payload.history)?payload.history:[]);
        setObservationReadFailure(null);
        setObservationReadReady({projectId,website:savedWebsite});
      })
      .catch((error) => {
        if(controller.signal.aborted)return;
        if (error instanceof DOMException && error.name === 'AbortError') return;
        setObservationReadFailure({projectId,website:savedWebsite});
        setObservationMessage(localizedMessage(locale, 'No pude consultar las observaciones guardadas. Podés reintentar la consulta sin ejecutar ni guardar una auditoría nueva.', 'I could not load saved observations. You can retry this read without running or saving a new audit.', 'Não consegui consultar as observações salvas. Você pode repetir a leitura sem executar nem salvar uma nova auditoria.'));
      });
    return () => controller.abort();
  }, [locale, projectId, request, savedWebsite, observationLoadAttempt]);

  const saveReviewedDraft = useCallback(async () => {
    if (!ready.current || manualLock.current || conflictReview || !data.website) return false;
    manualLock.current = true;
    setManualBusy(true);
    setStatus('saving');
    const submittedSources = { ...sourceHints.current };
    try {
      const response = await request('/api/projects', saveAttempt.prepare({ ...data, id: projectId, revision: savedRevision.current,
        ...(Object.keys(submittedSources).length ? { sourceHints: submittedSources } : {}) }));
      const parsed = await readProjectSaveResponse(response);
      if (parsed.sessionRequired) {
        setSessionRequired(true);
        setAutosavePaused(true);
        setStatus('error');
        return false;
      }
      setSessionRequired(false);
      const payload = parsed.payload as ProjectPayload;
      if (response.status === 409 && payload.project && payload.project.id === projectId) {
        const plan = planDossierRebase(savedBase.current, data, intakeFromProject(payload.project), payload.project.revision);
        setAutosavePaused(true);
        setConflictReview({ current: payload.project, plan });
        setStatus('error');
        return false;
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
      for (const [field, hint] of Object.entries(submittedSources)) {
        if (sourceHints.current[field] === hint) delete sourceHints.current[field];
      }
      setStatus('saved');
      setAutosavePaused(false);
      setSessionRequired(false);
      setMessage(rehearsal
        ? localizedMessage(locale, 'Guardado simulado. No se enviaron datos.', 'Simulated save. No data was sent.', 'Salvamento simulado. Nenhum dado foi enviado.')
        : localizedMessage(locale, 'Cambios guardados.', 'Changes saved.', 'Mudanças salvas.'));
      return true;
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
      return false;
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
    if (!workingPending && !hasPendingDraft({ ready: ready.current, draft: data, base: savedBase.current,
      busy: manualBusy, conflict: Boolean(conflictReview) })) return;
    const cleanup = attachDraftExitGuard(window, document, (href: string) => { setExitTarget(href); return false; });
    exitCleanup.current = cleanup;
    return () => { cleanup(); exitCleanup.current = null; };
  }, [data, manualBusy, conflictReview, status, locale, workingPending]);

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
  const observationWebsiteIsSaved=Boolean(projectId&&observationOrigin(data.website)&&observationOrigin(data.website)===observationOrigin(savedWebsite)&&status!=='saving');
  const currentObservations=currentOriginObservations(observation,observationHistory,savedWebsite);
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
    if(observationLock.current)return;
    if (!projectId || !observationWebsiteIsSaved) {
      setObservationMessage(localizedMessage(locale, 'Espera a que el sitio termine de guardarse antes de auditarlo.', 'Wait for the website to finish saving before auditing it.', 'Aguarde o site terminar de salvar antes de auditá-lo.'));
      return;
    }
    observationLock.current=true;
    const attempt=observationAttempt.prepare(projectId,savedWebsite);
    setObservationBusy(true);
    setObservationMessage(localizedMessage(locale, 'Auditando recursos públicos y preparando una copia saneada...', 'Auditing public resources and preparing a sanitized copy...', 'Auditando recursos públicos e preparando uma cópia saneada...'));
    try {
      const response = await request(`/api/projects/${projectId}/observations`, attempt.request);
      const payload = await response.json() as ObservationPayload;
      if (!response.ok || !payload.observation) throw new Error(payload.error || localizedMessage(locale, 'No se pudo guardar la observación.', 'The observation could not be saved.', 'Não foi possível salvar a observação.'));
      observationAttempt.confirmed(attempt.key);
      setObservation(payload.observation);
      let refreshFailed=false;
      try {
        const recent=await readObservationSnapshot(projectId,request);
        setObservationHistory(recent.history);
        if(recent.observation)setObservation(recent.observation);
        setObservationReadFailure(null);
        setObservationReadReady({projectId,website:savedWebsite});
      }catch{refreshFailed=true;setObservationHistory([]);setObservationReadFailure({projectId,website:savedWebsite});}
      setObservationMessage(refreshFailed?localizedMessage(locale,'La observación se guardó, pero no pude volver a consultar el historial. Usá “Reintentar consulta”; no hace falta auditar de nuevo.','The observation was saved, but I could not reload the history. Use “Retry saved read”; no new audit is needed.','A observação foi salva, mas não consegui atualizar o histórico. Use “Repetir consulta”; não é preciso auditar novamente.'):payload.replayed?localizedMessage(locale,'Recuperé la observación que ya se había guardado; no se duplicó.','I recovered the observation already saved; no duplicate was created.','Recuperei a observação já salva; não houve duplicação.'):localizedMessage(locale, 'Observación guardada. El escáner público sigue sin almacenar auditorías automáticas.', 'Observation saved. The public scanner still stores no automatic audits.', 'Observação salva. O scanner público continua sem armazenar auditorias automáticas.'));
    } catch (error) {
      setObservationMessage(error instanceof TypeError?localizedMessage(locale,'No pude confirmar el resultado por la conexión. Tu próximo clic reintentará la misma solicitud antes de hacer otra auditoría.','I could not confirm the result because of the connection. Your next click will retry the same request before starting another audit.','Não consegui confirmar o resultado por causa da conexão. O próximo clique repetirá a mesma solicitação antes de iniciar outra auditoria.'):error instanceof Error ? error.message : localizedMessage(locale, 'No se pudo guardar la observación.', 'The observation could not be saved.', 'Não foi possível salvar a observação.'));
    } finally {
      observationLock.current=false;
      setObservationBusy(false);
    }
  }

  const historyComparison=compareObservationHistory(currentObservations.history);
  const pilotCopilot = isCopilotProjectAllowed({ enabled: copilotEnabled, allowedProjectId: copilotProjectId, projectId }) && !rehearsal;
  const assistanceAvailable = isCopilotProjectAllowed({enabled:assistanceEnabled,allowedProjectId:assistanceProjectId,projectId}) && !rehearsal;
  const guidedView = isGuidedPilotView({ pilot: pilotCopilot, guidedEntry: true, loaded, requested: guidedViewRequested, conflict: Boolean(conflictReview), sessionRequired });
  const updatesReadState=dossierUpdatesReadState({projectId,website:savedWebsite,ready:observationReadReady,failure:observationReadFailure});
  function retrySavedObservationRead(){
    setObservationReadReady(null);setObservationReadFailure(null);
    setObservationMessage(DOSSIER_UPDATES_READ_COPY[locale].loading);
    setObservationLoadAttempt(value=>value+1);
  }
  function reviewDelivery(){
    const panel=document.getElementById('dossier-delivery');
    if(panel instanceof HTMLDetailsElement)revealDossierDelivery(panel,()=>setGuidedDeliveryRequested(true));
  }
  const updates = dossierUpdates({ website: savedWebsite, history: currentObservations.history, monitoringPreference: savedSnapshot.monitoringPreference,readState:updatesReadState });
  return (
    <div className={guidedView ? 'intake-layout guided-pilot' : 'intake-layout'}>
      <a className="dossier-help-dock" href={assistanceAvailable?'#dossier-help':guidedView && pilotCopilot ? '#dossier-copilot' : '#dossier-assistant'} onClick={()=>{const panel=document.getElementById(assistanceAvailable?'dossier-help':guidedView ? 'dossier-copilot' : 'dossier-assistant');if(panel instanceof HTMLDetailsElement)panel.open=true;}}>{localizedMessage(locale,'Necesito ayuda','I need help','Preciso de ajuda')}</a>
      {exitTarget && <DraftExitDialog locale={locale} saving={manualBusy} onStay={() => setExitTarget(null)} onSaveLeave={async () => {
        if (workingPending && !(await workingSave.current?.())) return false;
        const saved = hasPendingDraft({ ready: ready.current, draft: data, base: savedBase.current,
          busy: manualBusy, conflict: Boolean(conflictReview) }) ? await saveReviewedDraft() : true;
        if (saved) { exitCleanup.current?.(); workingExit.current?.(); window.location.assign(exitTarget); }
        return saved;
      }} onLeave={() => {
        exitCleanup.current?.();
        workingExit.current?.();
        window.location.assign(exitTarget);
      }} />}
      <main className="intake-main">
        {assistanceAvailable?<DossierAssistance key={projectId} projectId={projectId} revision={scopeRevision} canRequest={Boolean(loaded&&scopeRevision>0&&!unconfirmedChanges&&!conflictReview&&!sessionRequired&&status!=='saving'&&!workingPending)} locale={locale} request={request} goalConsentEnabled={assistanceGoalConsentEnabled}/>:null}
        <fieldset disabled={Boolean(manualBusy || conflictReview || !loaded)} style={{ border: 0, padding: 0, margin: 0, minWidth: 0 }}>
        <div className="page-title">
          <span>{copy.pageEyebrow}</span>
          <h1>{privateUiCopy(locale).dossier.title}</h1>
          <p>{privateUiCopy(locale).dossier.intro}</p>
        </div>

        {loaded && !conflictReview && !sessionRequired ? <div className="guided-view-switch"><p>{guidedView
          ? pilotCopilot ? localizedMessage(locale, 'Vamos de a poco. Contame tu sitio con tus palabras o por audio; revisamos juntos cada propuesta antes de guardarla.', 'Let us take this one step at a time. Describe your site in text or audio; we will review each suggestion before saving.', 'Vamos por partes. Conte sobre seu site por texto ou áudio; revisaremos cada sugestão antes de salvar.') : localizedMessage(locale,'Vamos de a poco. Respondé una pregunta por vez; revisá la propuesta y comprobá el guardado antes de salir.','Take one step at a time. Answer one question, review the suggestion and check saving before leaving.','Vamos por partes. Responda uma pergunta, revise a proposta e confira o salvamento antes de sair.')
          : localizedMessage(locale, 'Este es el expediente completo. Podés volver a la guía breve en cualquier momento.', 'This is the full dossier. You can return to the brief guide at any time.', 'Este é o dossiê completo. Você pode voltar ao guia breve quando quiser.')}</p><button type="button" className="secondary-action" onClick={() => setGuidedViewRequested(!guidedViewRequested)}>{guidedView
          ? localizedMessage(locale, 'Ver expediente completo', 'View full dossier', 'Ver dossiê completo')
          : localizedMessage(locale, 'Volver a la guía breve', 'Return to brief guide', 'Voltar ao guia breve')}</button></div> : null}

        <div hidden={guidedView}>
        <ScopeImport onReviewChange={setReviewedScope} onPrepareSeparate={setSeparateScope} onAvailableScopeChange={setAvailableScope} locale={locale} website={data.website} projectId={projectId || ""} revision={scopeRevision} canSave={Boolean(projectId && data.website === savedWebsite && status !== "saving")} request={request} onUseWebsite={website => {
          if(manualLock.current || data.website.trim())return;
          setAutosavePaused(true);setData(current=>({...current,website}));setStatus('idle');setMessage(DOSSIER_GUIDE_COPY[locale].draft);
        }}/>
        </div>
        <details id="dossier-assistant" className="dossier-assistant" open={!guidedView || !pilotCopilot}>
          <summary>{guidedView && pilotCopilot ? localizedMessage(locale, 'Seguir sin IA: una pregunta por vez', 'Continue without AI: one question at a time', 'Continuar sem IA: uma pergunta por vez') : DOSSIER_GUIDE_COPY[locale].assist}</summary>
          <p>{DOSSIER_GUIDE_COPY[locale].local}</p>
          <IntakeAssistantPrototype locale={locale} draft={data} reviewedScope={reviewedScope} onApply={next => {
            if(manualLock.current)return;
            setAutosavePaused(false);setData(intakeFromProject(next));setStatus('idle');setMessage(DOSSIER_GUIDE_COPY[locale].draft);
          }} />
        </details>
        {pilotCopilot ? <details id="dossier-copilot" className="dossier-assistant" open={guidedView}><summary>{locale === 'en' ? 'Intelligent copilot' : 'Copilot inteligente'}</summary>
          <IntakeIntelligentCopilot key={`${projectId}:${locale}`} projectId={projectId} dossierRevision={scopeRevision} locale={locale} draft={data} onReviewDelivery={reviewDelivery}
            onWorkingPendingChange={setWorkingPending} onRegisterWorkingSave={save => { workingSave.current = save; }}
            onRegisterWorkingExit={allow => { workingExit.current = allow; }} onApply={(next, sourceValues) => {
            if (manualLock.current) return;
            for (const [field, value] of Object.entries(sourceValues || {})) sourceHints.current[field] = { kind: 'copilot_reviewed', value };
            setAutosavePaused(false); setData(intakeFromProject(next)); setStatus('idle'); setMessage(DOSSIER_GUIDE_COPY[locale].draft);
          }} />
        </details> : null}
        <div hidden={guidedView}>
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

        </div>
        <details id="dossier-delivery" className="dossier-assistant" open={!guidedView || guidedDeliveryRequested}><summary>{localizedMessage(locale, 'Entrega y comprobación de mejoras', 'Delivery and improvement verification', 'Entrega e verificação de melhorias')}</summary><p>{localizedMessage(locale, 'Preparar archivos no los publica. Revisemos el destino y los responsables; después comprobaremos lo que realmente cambió.', 'Preparing files does not publish them. Let us review the destination and responsible people, then check what actually changed.', 'Preparar arquivos não os publica. Vamos revisar o destino e os responsáveis; depois verificaremos o que realmente mudou.')}</p>
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
            <span className="verification-status" data-status={currentObservations.observation ? 'verified' : 'unverified'}>
              {currentObservations.observation ? `${currentObservations.observation.readiness.level || 'Audit'} · ${observationScoreLabel(currentObservations.observation.readiness,locale)}` : (locale === 'en' ? 'No saved observation' : locale === 'pt' ? 'Sem observação salva' : 'Sin observación guardada')}
            </span>
          </div>
          <p className="observation-copy">{localizedMessage(locale, 'El escáner público normalmente no guarda resultados. Esta acción ejecuta la misma lectura pública y conserva en tu expediente solo evidencia, puntaje, rutas y fecha; elimina cuerpos HTTP, errores crudos y cabeceras sensibles.', 'The public scanner normally stores no results. This action runs the same public reading and saves only evidence, score, paths and date in your dossier; HTTP bodies, raw errors and sensitive headers are removed.', 'O scanner público normalmente não armazena resultados. Esta ação executa a mesma leitura pública e salva no dossiê somente evidências, pontuação, rotas e data; corpos HTTP, erros brutos e cabeçalhos sensíveis são removidos.')}</p>
          {currentObservations.observation ? <div className="last-observation"><span>{locale === 'en' ? 'Latest observation' : locale === 'pt' ? 'Última observação' : 'Última observación'}</span><strong>{formatDate(currentObservations.observation.checkedAt, locale)}</strong><small>{currentObservations.observation.target}</small></div> : null}
          {currentObservations.history.length>1?<div className="observation-history"><strong>{localizedMessage(locale,'Evolución observada','Observed progress','Evolução observada')}</strong>
            {historyComparison?<p>{localizedMessage(locale,'Entre las dos últimas lecturas:','Between the two latest readings:','Entre as duas últimas leituras:')} {historyComparison.delta>=0?'+':''}{historyComparison.delta} {localizedMessage(locale,'puntos. Es una señal técnica, no una garantía de visibilidad o ventas.','points. This is a technical signal, not a visibility or sales guarantee.','pontos. É um sinal técnico, não uma garantia de visibilidade ou vendas.')}</p>:<p>{localizedMessage(locale,'Las lecturas usan métodos distintos o faltan datos comparables; conservamos sus fechas sin afirmar una mejora.','The readings use different methods or lack comparable data; dates are retained without claiming an improvement.','As leituras usam métodos diferentes ou faltam dados comparáveis; mantemos as datas sem afirmar melhora.')}</p>}
            <ol>{currentObservations.history.map(item=><li key={item.id}><time dateTime={item.checkedAt}>{formatDate(item.checkedAt,locale)}</time> · {observationScoreLabel({score:item.score},locale)} {item.level?`· ${item.level}`:''}</li>)}</ol>
          </div>:null}
          {currentObservations.observation?<SavedObservationEvidence observation={currentObservations.observation} locale={locale} control={data.control} unsaved={unconfirmedChanges} missingBasicCount={missingIntakeQuestions(data).length}/>:null}
          <button className="primary-action" type="button" onClick={saveObservation} disabled={observationBusy || !observationWebsiteIsSaved}>
            {observationBusy ? <LoaderCircle className="spin" size={16} /> : <Radar size={16} />}
            {copy.labels.auditSave}
          </button>
          {observationReadFailure?.projectId===projectId&&observationReadFailure.website===savedWebsite?<button type="button" className="secondary-action" onClick={retrySavedObservationRead}>{localizedMessage(locale,'Reintentar consulta guardada','Retry saved read','Repetir consulta salva')}</button>:null}
          <div className="verification-message" aria-live="polite"><CircleHelp size={17} /><span>{observationMessage}</span></div>
        </section>

        {!rehearsal ? <div id="dossier-capsule"><CapsuleReview projectId={projectId} expectedDomain={hostname} allowBuild locale={locale} /></div> : null}
        </details>
        </fieldset>
      </main>

      <aside className="intake-aside">
        <details className="dossier-assistant"><summary>{localizedMessage(locale, 'Novedades de tu expediente', 'Dossier updates', 'Novidades do dossiê')}</summary>
          {updatesReadState!=='ready' ? <div aria-live="polite"><p>{DOSSIER_UPDATES_READ_COPY[locale][updatesReadState]}</p>{updatesReadState==='failed'?<button type="button" className="secondary-action" onClick={retrySavedObservationRead}>{localizedMessage(locale,'Reintentar consulta guardada','Retry saved read','Repetir consulta salva')}</button>:null}</div> : updates.items.length ? updates.items.map(item => <div key={item.id}><time dateTime={item.checkedAt}>{formatDate(item.checkedAt, locale)}</time><p>{item.kind === 'observed_change' && typeof item.delta === 'number' ? `${localizedMessage(locale, 'Cambio observado:', 'Observed change:', 'Mudança observada:')} ${item.delta >= 0 ? '+' : ''}${item.delta}` : localizedMessage(locale, 'Tenemos una observación fechada para revisar.', 'We have a dated observation to review.', 'Temos uma observação datada para revisar.')}</p><button type="button" className="secondary-action" onClick={reviewDelivery}>{localizedMessage(locale, 'Revisar evidencia y siguiente paso', 'Review evidence and next step', 'Revisar evidência e próximo passo')}</button></div>) : <p>{localizedMessage(locale, 'Todavía no hay una observación guardada para este sitio.', 'There is no saved observation for this site yet.', 'Ainda não há observação salva para este site.')}</p>}
          <p>{localizedMessage(locale, 'La preferencia de seguimiento no activa revisiones automáticas. Por ahora podés solicitar una nueva lectura desde la entrega.', 'A monitoring preference does not activate automatic reviews. For now, request a new reading from delivery.', 'A preferência de acompanhamento não ativa revisões automáticas. Por enquanto, solicite uma nova leitura na entrega.')}</p>
        </details>
        {!guidedView ? <DossierProgress draft={data} saved={savedSnapshot} loaded={loaded} projectId={projectId} status={status} sessionRequired={sessionRequired} conflict={Boolean(conflictReview)} verified={activeClaim?.status === 'verified' && websiteIsSaved} verifiedUntil={activeClaim?.verifiedUntil || ''} locale={locale} rehearsal={Boolean(rehearsal)} onRetryLoad={()=>{if(loaded)return;setStatus('loading');setLoadAttempt(value=>value+1);}}/> : null}
        {loaded && !guidedView ? <section className="proportional-target" aria-labelledby="proportional-target-title">
          <h3 id="proportional-target-title">{targetGuide.title}</h3><p>{targetGuide.provisional}</p>
          <ul>{targetGuide.steps.map(step => <li key={step}>{step}</li>)}</ul>
          {targetGuide.questions.length ? <div className="proportional-target-questions"><strong>{localizedMessage(locale, 'Para decidir juntos', 'To decide together', 'Para decidirmos juntos')}</strong><ul>{targetGuide.questions.map(question => <li key={question}>{question}</li>)}</ul></div> : null}
          <div className="proportional-target-next"><strong>{localizedMessage(locale, 'Un siguiente paso', 'One next step', 'Um próximo passo')}</strong><p>{targetGuide.next.reason}</p><a href={targetGuide.next.href}>{targetGuide.next.label}</a></div>
          <small>{targetGuide.limit}</small>
        </section> : null}
        <div className="intake-project-tools" hidden={guidedView}>
          {!rehearsal && projectId ? <ProjectDirectory locale={locale} currentProjectId={projectId} currentName={savedSnapshot.organization} currentWebsite={savedWebsite} pendingScope={availableScope} request={request} /> : null}
          {!rehearsal && projectId ? <ProjectCreate key={separateScope?.scopeText || 'manual'} locale={locale} suggestion={separateScope} disabled={manualBusy || Boolean(conflictReview) || sessionRequired || shouldAutosaveProject({ ready: true, draft: data, base: savedSnapshot }) || (status !== 'idle' && status !== 'saved')} /> : null}
        </div>
        {conflictReview ? <div id="dossier-conflict"><IntakeConflictReview key={conflictReview.plan.revision} locale={locale} plan={conflictReview.plan} onConfirm={confirmConflictReview} onCancel={() => setConflictReview(null)} /></div> : null}
        {<button id="dossier-save" className="primary-action" type="button" disabled={manualBusy || Boolean(conflictReview) || !loaded || !data.website} onClick={saveReviewedDraft}><Save size={17} />{rehearsal ? localizedMessage(locale, 'Confirmar guardado simulado', 'Confirm simulated save', 'Confirmar salvamento simulado') : localizedMessage(locale, 'Guardar cambios', 'Save changes', 'Salvar alterações')}</button>}
        {sessionRequired ? <p id="dossier-session" tabIndex={-1} role="alert">{!rehearsal ? localizedMessage(locale, 'La sesión venció. Conserva esta pestaña abierta e inicia sesión en otra pestaña; después vuelve a guardar aquí.', 'Your session expired. Keep this tab open and sign in in another tab; then return here and save again.', 'Sua sessão expirou. Mantenha esta aba aberta e entre em outra aba; depois volte e salve novamente.') : localizedMessage(locale,
          'La sesión de prueba venció. Tus cambios siguen en este formulario, sin guardar. No cierres ni recargues esta pestaña. Restablece la sesión simulada arriba y vuelve a confirmar el guardado; no necesitas completar todo otra vez.',
          'The test session expired. Your unsaved changes remain in this form. Do not close or reload this tab. Restore the simulated session above, then confirm saving again; you do not need to fill everything out again.',
          'A sessão de teste expirou. Suas alterações continuam neste formulário, sem salvar. Não feche nem recarregue esta aba. Restabeleça a sessão simulada acima e confirme o salvamento novamente; não precisa preencher tudo outra vez.')}</p> : null}
        {!guidedView ? <div className="owner-chip"><span>{userName.slice(0, 1).toUpperCase()}</span><div><strong>{userName}</strong><small>{userEmail}</small></div></div> : null}
        {!sessionRequired ? <div className="save-status" data-status={status==='saved' && unconfirmedChanges ? 'idle' : status}>{status === 'saving' || status === 'loading' ? <LoaderCircle className="spin" size={17} /> : status === 'saved' ? <Check size={17} /> : <Save size={17} />}<span>{status === 'saved' ? unconfirmedChanges ? DOSSIER_GUIDE_COPY[locale].draft : savedMessage : message}</span></div> : null}
        {roadmap.length && !guidedView ? <div className="mini-roadmap"><span>{copy.labels.firstRoadmap}</span>{roadmap.slice(0, 4).map(item => roadmapPresentation(item, locale)).map((item) => <div key={item.id}><small>{item.stage}</small><strong>{item.title}</strong></div>)}</div> : null}
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
