'use client';

import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import {
  Bot, Check, CircleHelp, Clipboard, Cloud, FileStack, Globe2, Languages,
  LoaderCircle, Radar, RefreshCw, Save, Settings2, ShieldAlert, Target, UserRound, UsersRound,
} from 'lucide-react';
import { CapsuleReview } from './capsule-review';
import { privateUiCopy } from '../../lib/private-ui-copy.mjs';

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

function intakeFromProject(saved: SavedProject): Intake {
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

export function IntakeWorkspace({ userName, userEmail, locale = 'es' }: { userName: string; userEmail: string; locale?: Locale }) {
  const copy = privateUiCopy(locale).intake;
  const [identitySection, goalsSection, controlSection, languagesSection, contentSection, capabilitiesSection, publicationSection, governanceSection] = copy.sections;
  const goalOptions = copy.goals;
  const languageOptions = copy.languages;
  const contentOptions = copy.content;
  const capabilityOptions = copy.capabilities;
  const resourceOptions = copy.resources;
  const [data, setData] = useState<Intake>(emptyIntake);
  const [projectId, setProjectId] = useState('');
  const [savedWebsite, setSavedWebsite] = useState('');
  const [completion, setCompletion] = useState(0);
  const [nextQuestion, setNextQuestion] = useState(locale === 'en' ? 'Let us start with the organization or project name.' : locale === 'pt' ? 'Vamos começar pelo nome da organização ou projeto.' : 'Empecemos por el nombre de la organización o proyecto.');
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
    fetch('/api/projects', { cache: 'no-store' })
      .then(async (response) => {
        const payload = await response.json() as ProjectPayload;
        if (!response.ok) throw new Error(payload.error || localizedMessage(locale, 'No se pudo abrir el expediente.', 'The dossier could not be opened.', 'Não foi possível abrir o dossiê.'));
        if (payload.project) {
          const saved = payload.project;
          setProjectId(saved.id);
          setSavedWebsite(saved.website || '');
          setData(intakeFromProject(saved));
          setCompletion(saved.completion || 0);
          setNextQuestion(saved.nextQuestion || localizedMessage(locale, 'Revisemos el próximo dato.', 'Let us review the next item.', 'Vamos revisar o próximo dado.'));
          setRoadmap(saved.roadmap || []);
          setMessage(copy.recovered);
        } else setMessage(copy.newDossier);
        setStatus('idle');
        window.setTimeout(() => { ready.current = true; }, 0);
      })
      .catch((error) => {
        setStatus('error');
        setMessage(error instanceof Error ? error.message : localizedMessage(locale, 'No se pudo abrir el expediente.', 'The dossier could not be opened.', 'Não foi possível abrir o dossiê.'));
      });
  }, [copy.newDossier, copy.recovered, locale]);

  useEffect(() => {
    if (!projectId) return;
    const controller = new AbortController();
    fetch(`/api/projects/${projectId}/domain-claims`, { cache: 'no-store', signal: controller.signal })
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
  }, [locale, projectId]);

  useEffect(() => {
    if (!projectId) return;
    const controller = new AbortController();
    fetch(`/api/projects/${projectId}/observations`, { cache: 'no-store', signal: controller.signal })
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
  }, [locale, projectId]);

  useEffect(() => {
    if (!ready.current || !data.website) return;
    setStatus('saving');
    setMessage(localizedMessage(locale, 'Guardando cambios...', 'Saving changes...', 'Salvando mudanças...'));
    const timer = window.setTimeout(async () => {
      try {
        const response = await fetch('/api/projects', {
          method: 'PUT', headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ ...data, id: projectId }),
        });
        const payload = await response.json() as ProjectPayload;
        if (!response.ok || !payload.project) throw new Error(payload.error || localizedMessage(locale, 'No se pudo guardar.', 'Changes could not be saved.', 'Não foi possível salvar.'));
        setCompletion(payload.project.completion);
        setProjectId(payload.project.id);
        setSavedWebsite(payload.project.website || '');
        setNextQuestion(payload.project.nextQuestion || localizedMessage(locale, 'El expediente está listo para revisión.', 'The dossier is ready for review.', 'O dossiê está pronto para revisão.'));
        setRoadmap(payload.project.roadmap || []);
        setStatus('saved');
        setMessage(localizedMessage(locale, 'Cambios guardados.', 'Changes saved.', 'Mudanças salvas.'));
      } catch (error) {
        setStatus('error');
        setMessage(error instanceof Error ? error.message : localizedMessage(locale, 'No se pudo guardar.', 'Changes could not be saved.', 'Não foi possível salvar.'));
      }
    }, 900);
    return () => window.clearTimeout(timer);
  }, [data, locale, projectId]);

  const completedFields = useMemo(() => Math.round((completion / 100) * 12), [completion]);
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
      const response = await fetch(`/api/projects/${projectId}/domain-claims`, {
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
      const response = await fetch(`/api/projects/${projectId}/domain-claims/${activeClaim.id}/verify`, { method: 'POST' });
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
      const response = await fetch(`/api/projects/${projectId}/observations`, {
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
      <main className="intake-main">
        <div className="page-title">
          <span>{copy.pageEyebrow}</span>
          <h1>{privateUiCopy(locale).dossier.title}</h1>
          <p>{privateUiCopy(locale).dossier.intro}</p>
        </div>

        <FormSection icon={<UserRound size={20} />} title={identitySection[1]} subtitle={identitySection[2]}>
          <div className="field-grid">
            <label>{copy.organization}<input value={data.organization} onChange={(event) => update('organization', event.target.value)} placeholder="Museo Top" /></label>
            <label>{copy.website}<input value={data.website} onChange={(event) => update('website', event.target.value)} placeholder="example.org" inputMode="url" /></label>
            <label>{copy.role}<input value={data.role} onChange={(event) => update('role', event.target.value)} placeholder={locale === 'en' ? 'Owner, artist, manager...' : locale === 'pt' ? 'Owner, artista, responsável...' : 'Owner, artista, responsable...'} /></label>
            <label>{copy.siteType}<select value={data.siteType} onChange={(event) => update('siteType', event.target.value)}><option value="">{copy.choose}</option>{copy.siteTypes.map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></label>
          </div>
          <label className="wide-field">{copy.audience}<textarea value={data.audience} onChange={(event) => update('audience', event.target.value)} placeholder={locale === 'en' ? 'People, organizations or agents that should find and understand you.' : locale === 'pt' ? 'Pessoas, organizações ou agentes que devem encontrar e compreender você.' : 'Personas, organizaciones o agentes que deberían encontrarte y entenderte.'} /></label>
        </FormSection>

        <FormSection icon={<Target size={20} />} title={goalsSection[1]} subtitle={goalsSection[2]}>
          <ChoiceList options={goalOptions} values={data.goals} onToggle={(value) => toggleList('goals', value)} />
        </FormSection>

        <FormSection icon={<Cloud size={20} />} title={controlSection[1]} subtitle={controlSection[2]}>
          <div className="field-grid">
            <label>{copy.labels.control}<select value={data.control} onChange={(event) => update('control', event.target.value)}>{copy.controls.map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></label>
            <label>{copy.labels.cms}<input value={data.cms} onChange={(event) => update('cms', event.target.value)} placeholder="WordPress, Shopify..." /></label>
            <label>{copy.labels.hosting}<input value={data.hosting} onChange={(event) => update('hosting', event.target.value)} placeholder="Cloudflare, Vercel..." /></label>
          </div>
          <div className="security-note"><ShieldAlert size={19} /><div><strong>{copy.labels.noSecrets}</strong><span>{copy.labels.noSecretsBody}</span></div></div>
        </FormSection>

        <FormSection icon={<Languages size={20} />} title={languagesSection[1]} subtitle={languagesSection[2]}>
          <ChoiceList compact options={languageOptions.map((value) => [value, value])} values={data.languages} onToggle={(value) => toggleList('languages', value)} />
        </FormSection>

        <FormSection icon={<FileStack size={20} />} title={contentSection[1]} subtitle={contentSection[2]}>
          <ChoiceList compact options={contentOptions} values={data.contentSources} onToggle={(value) => toggleList('contentSources', value)} />
          <label className="wide-field">{copy.labels.notes}<textarea value={data.notes} onChange={(event) => update('notes', event.target.value)} placeholder={locale === 'en' ? 'Write freely. The system will help organize this information before it becomes content or tools.' : locale === 'pt' ? 'Escreva livremente. O sistema ajudará a organizar antes de transformar em conteúdo ou ferramentas.' : 'Escribe libremente. El sistema ayudará a ordenar antes de convertir en contenido o herramientas.'} /></label>
        </FormSection>

        <FormSection icon={<Bot size={20} />} title={capabilitiesSection[1]} subtitle={capabilitiesSection[2]}>
          <span className="field-label">{copy.labels.desired}</span>
          <ChoiceList compact options={capabilityOptions} values={data.desiredCapabilities} onToggle={(value) => toggleList('desiredCapabilities', value)} />
          <span className="field-label spaced">{copy.labels.proposed}</span>
          <ChoiceList compact options={resourceOptions} values={data.authorizedResources} onToggle={(value) => toggleList('authorizedResources', value)} />
          <p className="scope-note">{copy.labels.scope}</p>
        </FormSection>

        <FormSection icon={<Globe2 size={20} />} title={publicationSection[1]} subtitle={publicationSection[2]}>
          <div className="field-grid">
            <label>{copy.labels.firstPublication}<select value={data.publicationPreference} onChange={(event) => update('publicationPreference', event.target.value)}><option value="">{copy.choose}</option>{copy.publication.map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></label>
            <label>{copy.labels.searchPolicy}<select value={data.crawlerSearchPolicy} onChange={(event) => update('crawlerSearchPolicy', event.target.value)}><option value="">{copy.choose}</option>{copy.searchPolicies.map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></label>
            <label>{copy.labels.trainingPolicy}<select value={data.crawlerTrainingPolicy} onChange={(event) => update('crawlerTrainingPolicy', event.target.value)}><option value="">{copy.choose}</option>{copy.trainingPolicies.map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></label>
            <label>{copy.labels.monitoring}<select value={data.monitoringPreference} onChange={(event) => update('monitoringPreference', event.target.value)}><option value="">{copy.choose}</option>{copy.monitoring.map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></label>
          </div>
        </FormSection>

        <FormSection icon={<UsersRound size={20} />} title={governanceSection[1]} subtitle={governanceSection[2]}>
          <div className="field-grid">
            <label>{copy.labels.maintainer}<input value={data.maintainerName} onChange={(event) => update('maintainerName', event.target.value)} /></label>
            <label>{copy.labels.maintainerEmail}<input value={data.maintainerEmail} onChange={(event) => update('maintainerEmail', event.target.value)} placeholder="web@example.org" inputMode="email" /></label>
            <label>{copy.labels.dns}<input value={data.dnsProvider} onChange={(event) => update('dnsProvider', event.target.value)} placeholder="Cloudflare, GoDaddy..." /></label>
            <label>{copy.labels.approver}<input value={data.approverName} onChange={(event) => update('approverName', event.target.value)} /></label>
            <label>{copy.labels.approverEmail}<input value={data.approverEmail} onChange={(event) => update('approverEmail', event.target.value)} placeholder="owner@example.org" inputMode="email" /></label>
          </div>
        </FormSection>

        <section className="form-section verification-section">
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

        <CapsuleReview projectId={projectId} expectedDomain={hostname} allowBuild locale={locale} />
      </main>

      <aside className="intake-aside">
        <div className="owner-chip"><span>{userName.slice(0, 1).toUpperCase()}</span><div><strong>{userName}</strong><small>{userEmail}</small></div></div>
        <div className="progress-block"><div className="progress-label"><span>{copy.labels.contextGathered}</span><strong>{completion}%</strong></div><div className="progress-track"><span style={{ width: `${completion}%` }} /></div><small>{completedFields}/12 {copy.labels.decisions}</small></div>
        <div className="question-block"><CircleHelp size={20} /><span>{copy.labels.nextQuestion}</span><strong>{nextQuestion}</strong></div>
        <div className="save-status" data-status={status}>{status === 'saving' || status === 'loading' ? <LoaderCircle className="spin" size={17} /> : status === 'saved' ? <Check size={17} /> : <Save size={17} />}<span>{message}</span></div>
        {roadmap.length ? <div className="mini-roadmap"><span>{copy.labels.firstRoadmap}</span>{roadmap.slice(0, 4).map((item) => <div key={item.id}><small>{item.stage}</small><strong>{item.title}</strong></div>)}</div> : null}
      </aside>
    </div>
  );
}

function FormSection({ icon, title, subtitle, children }: { icon: ReactNode; title: string; subtitle: string; children: ReactNode }) {
  return <section className="form-section"><div className="form-section-title">{icon}<div><strong>{title}</strong><span>{subtitle}</span></div></div>{children}</section>;
}

function ChoiceList({ options, values, onToggle, compact = false }: { options: string[][]; values: string[]; onToggle: (value: string) => void; compact?: boolean }) {
  return <div className={compact ? 'choice-grid compact' : 'choice-grid'}>{options.map(([value, label]) => <Choice key={value} active={values.includes(value)} label={label} onClick={() => onToggle(value)} />)}</div>;
}

function Choice({ active, label, onClick }: { active: boolean; label: string; onClick: () => void }) {
  return <button className={active ? 'choice active' : 'choice'} type="button" onClick={onClick} aria-pressed={active}><span>{active ? <Check size={15} /> : null}</span>{label}</button>;
}
