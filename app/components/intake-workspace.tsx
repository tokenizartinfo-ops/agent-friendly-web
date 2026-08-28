'use client';

import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import {
  Bot, Check, CircleHelp, Clipboard, Cloud, FileStack, Globe2, Languages,
  LoaderCircle, Radar, RefreshCw, Save, Settings2, ShieldAlert, Target, UserRound, UsersRound,
} from 'lucide-react';
import { CapsuleReview } from './capsule-review';

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

const goalOptions = [
  ['discovery', 'Aparecer en respuestas y busquedas'], ['content', 'Explicar mejor productos o servicios'],
  ['tools', 'Exponer APIs, MCP o skills'], ['actions', 'Permitir acciones delegadas'],
  ['payments', 'Preparar pagos entre agentes'],
];
const languageOptions = ['Español', 'Ingles', 'Portugues', 'Italiano', 'Frances'];
const contentOptions = [
  ['catalog', 'Catalogo o coleccion'], ['services', 'Servicios'], ['faq', 'Preguntas frecuentes'],
  ['documentation', 'Documentacion'], ['policies', 'Politicas y condiciones'],
  ['tool_docs', 'APIs y herramientas'],
];
const capabilityOptions = [
  ['discovery', 'Descubrimiento'], ['answerability', 'Respuestas precisas'],
  ['structured_data', 'Datos estructurados'], ['public_registry', 'Perfil publico verificable'],
  ['read_only_tools', 'Herramientas de consulta'], ['delegated_actions', 'Acciones delegadas futuras'],
];
const resourceOptions = [
  ['robots', 'robots.txt'], ['sitemap', 'sitemap.xml'], ['llms', 'llms.txt'],
  ['llms_full', 'llms-full.txt'], ['jsonld', 'JSON-LD'], ['openapi', 'OpenAPI'],
  ['mcp', 'MCP'], ['skills', 'Skills'],
];
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

function formatDate(value: string) {
  const date = new Date(value);
  if (!value || Number.isNaN(date.getTime())) return '';
  return new Intl.DateTimeFormat('es-AR', { dateStyle: 'medium', timeStyle: 'short' }).format(date);
}

function normalizedHostname(value: string) {
  if (!value.trim()) return '';
  try { return new URL(/^https?:\/\//i.test(value) ? value : `https://${value}`).hostname; }
  catch { return ''; }
}

function claimStatusLabel(claim: DomainClaim | null) {
  if (!claim) return 'Sin verificar';
  if (claim.status === 'pending') return 'Pendiente';
  if (claim.status === 'verified') return `Verificado hasta ${formatDate(claim.verifiedUntil)}`;
  if (claim.status === 'expired') return 'Vencido';
  if (claim.status === 'failed') return 'No verificado';
  if (claim.status === 'superseded') return 'Reemplazado';
  return 'Sin verificar';
}

function claimFailureMessage(payload: ClaimPayload) {
  if (payload.error) return payload.error;
  if (payload.reason === 'challenge_mismatch') return 'Todavia no encontramos el valor esperado. Revisa la publicacion y volve a comprobar.';
  if (payload.reason === 'claim_expired') return 'El desafio vencio. Crea uno nuevo para continuar.';
  if (payload.reason === 'verification_read_failed') return 'No pudimos consultar el recurso publico. Revisa DNS o el archivo y proba nuevamente.';
  return 'El dominio todavia no pudo verificarse.';
}

export function IntakeWorkspace({ userName, userEmail }: { userName: string; userEmail: string }) {
  const [data, setData] = useState<Intake>(emptyIntake);
  const [projectId, setProjectId] = useState('');
  const [savedWebsite, setSavedWebsite] = useState('');
  const [completion, setCompletion] = useState(0);
  const [nextQuestion, setNextQuestion] = useState('Empecemos por el nombre de la organizacion o proyecto.');
  const [roadmap, setRoadmap] = useState<RoadmapItem[]>([]);
  const [status, setStatus] = useState<'loading' | 'idle' | 'saving' | 'saved' | 'error'>('loading');
  const [message, setMessage] = useState('Buscando un expediente anterior...');
  const [claim, setClaim] = useState<DomainClaim | null>(null);
  const [claimMethod, setClaimMethod] = useState<'dns_txt' | 'http_file'>('dns_txt');
  const [claimBusy, setClaimBusy] = useState(false);
  const [claimMessage, setClaimMessage] = useState('La verificacion se inicia solo cuando vos la solicitas.');
  const [copied, setCopied] = useState(false);
  const [observation, setObservation] = useState<ObservationSummary | null>(null);
  const [observationBusy, setObservationBusy] = useState(false);
  const [observationMessage, setObservationMessage] = useState('La auditoria publica normalmente no guarda resultados.');
  const ready = useRef(false);

  useEffect(() => {
    fetch('/api/projects', { cache: 'no-store' })
      .then(async (response) => {
        const payload = await response.json() as ProjectPayload;
        if (!response.ok) throw new Error(payload.error || 'No se pudo abrir el expediente.');
        if (payload.project) {
          const saved = payload.project;
          setProjectId(saved.id);
          setSavedWebsite(saved.website || '');
          setData(intakeFromProject(saved));
          setCompletion(saved.completion || 0);
          setNextQuestion(saved.nextQuestion || 'Revisemos el proximo dato.');
          setRoadmap(saved.roadmap || []);
          setMessage('Expediente recuperado.');
        } else setMessage('Nuevo expediente. Completa los datos a tu ritmo.');
        setStatus('idle');
        window.setTimeout(() => { ready.current = true; }, 0);
      })
      .catch((error) => {
        setStatus('error');
        setMessage(error instanceof Error ? error.message : 'No se pudo abrir el expediente.');
      });
  }, []);

  useEffect(() => {
    if (!projectId) return;
    const controller = new AbortController();
    fetch(`/api/projects/${projectId}/domain-claims`, { cache: 'no-store', signal: controller.signal })
      .then(async (response) => {
        const payload = await response.json() as ClaimPayload;
        if (!response.ok) throw new Error(payload.error || 'No se pudo consultar la verificacion.');
        setClaim(payload.claim || null);
        if (payload.claim) setClaimMethod(payload.claim.method);
      })
      .catch((error) => {
        if (error instanceof DOMException && error.name === 'AbortError') return;
        setClaimMessage(error instanceof Error ? error.message : 'No se pudo consultar la verificacion.');
      });
    return () => controller.abort();
  }, [projectId]);

  useEffect(() => {
    if (!projectId) return;
    const controller = new AbortController();
    fetch(`/api/projects/${projectId}/observations`, { cache: 'no-store', signal: controller.signal })
      .then(async (response) => {
        const payload = await response.json() as ObservationPayload;
        if (!response.ok) throw new Error(payload.error || 'No se pudo consultar la ultima observacion.');
        setObservation(payload.observation || null);
      })
      .catch((error) => {
        if (error instanceof DOMException && error.name === 'AbortError') return;
        setObservationMessage(error instanceof Error ? error.message : 'No se pudo consultar la ultima observacion.');
      });
    return () => controller.abort();
  }, [projectId]);

  useEffect(() => {
    if (!ready.current || !data.website) return;
    setStatus('saving');
    setMessage('Guardando cambios...');
    const timer = window.setTimeout(async () => {
      try {
        const response = await fetch('/api/projects', {
          method: 'PUT', headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ ...data, id: projectId }),
        });
        const payload = await response.json() as ProjectPayload;
        if (!response.ok || !payload.project) throw new Error(payload.error || 'No se pudo guardar.');
        setCompletion(payload.project.completion);
        setProjectId(payload.project.id);
        setSavedWebsite(payload.project.website || '');
        setNextQuestion(payload.project.nextQuestion || 'El expediente esta listo para revision.');
        setRoadmap(payload.project.roadmap || []);
        setStatus('saved');
        setMessage('Cambios guardados.');
      } catch (error) {
        setStatus('error');
        setMessage(error instanceof Error ? error.message : 'No se pudo guardar.');
      }
    }, 900);
    return () => window.clearTimeout(timer);
  }, [data, projectId]);

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
    ? 'El sitio cambio. Crea instrucciones nuevas para verificar el dominio guardado.'
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
      setClaimMessage('Espera a que el sitio termine de guardarse antes de iniciar la verificacion.');
      return;
    }
    setClaimBusy(true); setCopied(false); setClaimMessage('Preparando instrucciones...');
    try {
      const response = await fetch(`/api/projects/${projectId}/domain-claims`, {
        method: 'POST', headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ method: claimMethod }),
      });
      const payload = await response.json() as ClaimPayload;
      if (!response.ok || !payload.claim) throw new Error(payload.error || 'No se pudo crear la verificacion.');
      setClaim(payload.claim);
      setClaimMessage('Instrucciones listas. Publica el valor y despues usa Comprobar ahora.');
    } catch (error) {
      setClaimMessage(error instanceof Error ? error.message : 'No se pudo crear la verificacion.');
    } finally { setClaimBusy(false); }
  }

  async function verifyClaim() {
    if (!projectId || !activeClaim) return;
    setClaimBusy(true); setClaimMessage('Comprobando el recurso publico...');
    try {
      const response = await fetch(`/api/projects/${projectId}/domain-claims/${activeClaim.id}/verify`, { method: 'POST' });
      const payload = await response.json() as ClaimPayload;
      if (!response.ok || !payload.verified) {
        setClaim((current) => current ? { ...current, status: payload.status || current.status, attemptCount: payload.attemptCount ?? current.attemptCount } : current);
        throw new Error(claimFailureMessage(payload));
      }
      setClaim((current) => current ? {
        ...current, status: 'verified', verifiedAt: payload.verifiedAt || '',
        verifiedUntil: payload.verifiedUntil || '', attemptCount: payload.attemptCount ?? current.attemptCount,
      } : current);
      setClaimMessage('Dominio verificado. La comprobacion no concede escritura ni publica un perfil.');
    } catch (error) {
      setClaimMessage(error instanceof Error ? error.message : 'No se pudo comprobar el dominio.');
    } finally { setClaimBusy(false); }
  }

  async function copyChallenge() {
    if (!challengeCopy) return;
    try {
      await navigator.clipboard.writeText(challengeCopy);
      setCopied(true); setClaimMessage('Instrucciones copiadas.');
    } catch { setClaimMessage('No se pudo copiar automaticamente. Selecciona el texto manualmente.'); }
  }

  async function saveObservation() {
    if (!projectId || !websiteIsSaved) {
      setObservationMessage('Espera a que el sitio termine de guardarse antes de auditarlo.');
      return;
    }
    setObservationBusy(true);
    setObservationMessage('Auditando recursos publicos y preparando una copia saneada...');
    try {
      const response = await fetch(`/api/projects/${projectId}/observations`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ confirmSave: true }),
      });
      const payload = await response.json() as ObservationPayload;
      if (!response.ok || !payload.observation) throw new Error(payload.error || 'No se pudo guardar la observacion.');
      setObservation(payload.observation);
      setObservationMessage('Observacion guardada. El scanner publico sigue sin almacenar auditorias automaticas.');
    } catch (error) {
      setObservationMessage(error instanceof Error ? error.message : 'No se pudo guardar la observacion.');
    } finally {
      setObservationBusy(false);
    }
  }

  return (
    <div className="intake-layout">
      <main className="intake-main">
        <div className="page-title">
          <span>Expediente privado</span>
          <h1>Ordena el sitio, sus contenidos y las decisiones de publicacion.</h1>
          <p>No hace falta conocer terminos tecnicos. El formulario guarda tus avances y separa claramente lo declarado, lo verificado y lo que todavia no se publica.</p>
        </div>

        <FormSection icon={<UserRound size={20} />} title="Identidad y contexto" subtitle="Quien sos y que representa el sitio.">
          <div className="field-grid">
            <label>Organizacion o proyecto<input value={data.organization} onChange={(event) => update('organization', event.target.value)} placeholder="Ej. Museo Top" /></label>
            <label>Sitio web<input value={data.website} onChange={(event) => update('website', event.target.value)} placeholder="ejemplo.org" inputMode="url" /></label>
            <label>Tu funcion<input value={data.role} onChange={(event) => update('role', event.target.value)} placeholder="Propietario, artista, responsable..." /></label>
            <label>Tipo de sitio<select value={data.siteType} onChange={(event) => update('siteType', event.target.value)}><option value="">Elegir</option><option value="artist">Artista</option><option value="gallery">Galeria</option><option value="museum">Museo o archivo</option><option value="institution">Institucion</option><option value="commerce">Comercio o servicio</option><option value="other">Otro</option></select></label>
          </div>
          <label className="wide-field">A quienes queres llegar<textarea value={data.audience} onChange={(event) => update('audience', event.target.value)} placeholder="Personas, organizaciones o agentes que deberian encontrarte y entenderte." /></label>
        </FormSection>

        <FormSection icon={<Target size={20} />} title="Objetivos" subtitle="Podes elegir mas de uno y cambiarlos despues.">
          <ChoiceList options={goalOptions} values={data.goals} onToggle={(value) => toggleList('goals', value)} />
        </FormSection>

        <FormSection icon={<Cloud size={20} />} title="Control tecnico" subtitle="Esto define que mejoras pueden hacerse ahora.">
          <div className="field-grid">
            <label>Que control tenes<select value={data.control} onChange={(event) => update('control', event.target.value)}><option value="unknown">No lo se</option><option value="origin">Acceso al sitio o codigo</option><option value="dns">Acceso al dominio o Cloudflare</option><option value="provider">Dependo de un proveedor</option><option value="none">No tengo acceso</option></select></label>
            <label>Sistema de contenidos<input value={data.cms} onChange={(event) => update('cms', event.target.value)} placeholder="WordPress, Shopify, propio, no lo se..." /></label>
            <label>Alojamiento<input value={data.hosting} onChange={(event) => update('hosting', event.target.value)} placeholder="Cloudflare, Vercel, hosting tradicional..." /></label>
          </div>
          <div className="security-note"><ShieldAlert size={19} /><div><strong>No ingreses contraseñas ni claves.</strong><span>Solo necesitamos saber que acceso existe. Las credenciales se gestionan por un canal separado y seguro.</span></div></div>
        </FormSection>

        <FormSection icon={<Languages size={20} />} title="Idiomas" subtitle="En que idiomas deben comprenderte personas y agentes.">
          <ChoiceList compact options={languageOptions.map((value) => [value, value])} values={data.languages} onToggle={(value) => toggleList('languages', value)} />
        </FormSection>

        <FormSection icon={<FileStack size={20} />} title="Contenido disponible" subtitle="Marca lo que ya existe, aunque este disperso o incompleto.">
          <ChoiceList compact options={contentOptions} values={data.contentSources} onToggle={(value) => toggleList('contentSources', value)} />
          <label className="wide-field">Notas o informacion desordenada<textarea value={data.notes} onChange={(event) => update('notes', event.target.value)} placeholder="Escribi libremente. El sistema ayudara a ordenar esta informacion antes de convertirla en contenido o herramientas." /></label>
        </FormSection>

        <FormSection icon={<Bot size={20} />} title="Capacidades y recursos" subtitle="Define el objetivo y un alcance preliminar, sin habilitar escritura.">
          <span className="field-label">Capacidades deseadas</span>
          <ChoiceList compact options={capabilityOptions} values={data.desiredCapabilities} onToggle={(value) => toggleList('desiredCapabilities', value)} />
          <span className="field-label spaced">Recursos propuestos</span>
          <ChoiceList compact options={resourceOptions} values={data.authorizedResources} onToggle={(value) => toggleList('authorizedResources', value)} />
          <p className="scope-note">Esta seleccion expresa un alcance de trabajo para revision. No entrega permisos, no modifica el sitio y no habilita acciones automaticas.</p>
        </FormSection>

        <FormSection icon={<Globe2 size={20} />} title="Publicacion y crawlers" subtitle="Decide como queres que se descubra y use el contenido publico.">
          <div className="field-grid">
            <label>Primera publicacion<select value={data.publicationPreference} onChange={(event) => update('publicationPreference', event.target.value)}><option value="">Elegir</option><option value="registry_first">Primero en el Registry</option><option value="origin_first">Primero en el sitio original</option><option value="both">En ambos, de forma coordinada</option><option value="review_only">Solo preparar y revisar</option></select></label>
            <label>Politica de busqueda<select value={data.crawlerSearchPolicy} onChange={(event) => update('crawlerSearchPolicy', event.target.value)}><option value="">Elegir</option><option value="allow">Permitir busqueda y asistentes</option><option value="limited">Permitir con limites declarados</option><option value="deny">No permitir por ahora</option></select></label>
            <label>Uso para entrenamiento<select value={data.crawlerTrainingPolicy} onChange={(event) => update('crawlerTrainingPolicy', event.target.value)}><option value="">Elegir</option><option value="reserve">Reservar: no autorizar</option><option value="allow">Autorizar contenido publico</option><option value="case_by_case">Evaluar caso por caso</option></select></label>
            <label>Seguimiento<select value={data.monitoringPreference} onChange={(event) => update('monitoringPreference', event.target.value)}><option value="">Elegir</option><option value="none">Sin seguimiento</option><option value="monthly">Revision mensual</option><option value="quarterly">Revision trimestral</option><option value="incident">Solo ante cambios o incidentes</option></select></label>
          </div>
        </FormSection>

        <FormSection icon={<UsersRound size={20} />} title="Responsables y control" subtitle="Quien mantiene, administra DNS y aprueba cada publicacion.">
          <div className="field-grid">
            <label>Mantenedor actual<input value={data.maintainerName} onChange={(event) => update('maintainerName', event.target.value)} placeholder="Persona o proveedor" /></label>
            <label>Email del mantenedor<input value={data.maintainerEmail} onChange={(event) => update('maintainerEmail', event.target.value)} placeholder="web@ejemplo.org" inputMode="email" /></label>
            <label>Proveedor DNS<input value={data.dnsProvider} onChange={(event) => update('dnsProvider', event.target.value)} placeholder="Cloudflare, GoDaddy, otro..." /></label>
            <label>Responsable de aprobacion<input value={data.approverName} onChange={(event) => update('approverName', event.target.value)} placeholder="Nombre y funcion" /></label>
            <label>Email de aprobacion<input value={data.approverEmail} onChange={(event) => update('approverEmail', event.target.value)} placeholder="owner@ejemplo.org" inputMode="email" /></label>
          </div>
        </FormSection>

        <section className="form-section verification-section">
          <div className="verification-heading">
            <div className="form-section-title"><Settings2 size={20} /><div><strong>Verificar dominio</strong><span>Prueba control temporal mediante DNS o un archivo publico.</span></div></div>
            <span className="verification-status" data-status={activeClaim?.status || 'unverified'}>{claimStatusLabel(activeClaim)}</span>
          </div>
          <div className="domain-summary"><span>Dominio del expediente</span><strong>{hostname || 'Completa un sitio web valido'}</strong></div>
          <div className="verification-controls">
            <div className="method-switch" aria-label="Metodo de verificacion">
              <button type="button" className={claimMethod === 'dns_txt' ? 'active' : ''} onClick={() => setClaimMethod('dns_txt')}>DNS TXT</button>
              <button type="button" className={claimMethod === 'http_file' ? 'active' : ''} onClick={() => setClaimMethod('http_file')}>Archivo HTTP</button>
            </div>
            <button className="primary-action" type="button" onClick={createClaim} disabled={claimBusy || !websiteIsSaved || !hostname}>{claimBusy ? <LoaderCircle className="spin" size={16} /> : <Globe2 size={16} />}Crear instrucciones</button>
          </div>
          {!websiteIsSaved && data.website ? <p className="inline-warning">Espera a que el sitio termine de guardarse para evitar verificar una direccion anterior.</p> : null}
          {activeClaim ? (
            <div className="challenge-instructions">
              <div><span>{activeClaim.method === 'dns_txt' ? 'Registro a publicar' : 'Archivo a publicar'}</span><strong>{activeClaim.method === 'dns_txt' ? 'Agrega un registro TXT en tu proveedor DNS.' : 'Publica este JSON en la URL indicada.'}</strong></div>
              <dl className="challenge-values">
                {activeClaim.method === 'dns_txt' ? <><div><dt>Tipo</dt><dd>TXT</dd></div><div><dt>Nombre</dt><dd>{activeClaim.challengeName}</dd></div><div><dt>Valor</dt><dd>{activeClaim.challengeValue}</dd></div></> : <><div><dt>URL</dt><dd>{activeClaim.challengeUrl}</dd></div><div><dt>Contenido</dt><dd>{activeClaim.challengeValue}</dd></div></>}
              </dl>
              <div className="challenge-actions">
                <button className="secondary-action" type="button" onClick={copyChallenge}><Clipboard size={16} />{copied ? 'Copiado' : 'Copiar instrucciones'}</button>
                <button className="primary-action" type="button" onClick={verifyClaim} disabled={claimBusy || activeClaim.status !== 'pending'}><RefreshCw size={16} />Comprobar ahora</button>
              </div>
              <small>Vence {formatDate(activeClaim.expiresAt)}. Intentos realizados: {activeClaim.attemptCount} de 10.</small>
            </div>
          ) : null}
          <div className="verification-message" aria-live="polite"><CircleHelp size={17} /><span>{visibleClaimMessage}</span></div>
          <p className="scope-note strong-note"><strong>No publica el perfil automaticamente.</strong> Verificar acredita control temporal, pero no concede acceso de escritura ni modifica el dominio.</p>
        </section>

        <section className="form-section observation-section">
          <div className="verification-heading">
            <div className="form-section-title"><Radar size={20} /><div><strong>Observacion fechada</strong><span>Guarda una fotografia tecnica saneada del sitio publico.</span></div></div>
            <span className="verification-status" data-status={observation ? 'verified' : 'unverified'}>
              {observation ? `${observation.readiness.level || 'Auditoria'} · ${observation.readiness.score ?? 0}/100` : 'Sin observacion guardada'}
            </span>
          </div>
          <p className="observation-copy">El scanner publico normalmente no guarda resultados. Esta accion ejecuta la misma lectura publica y conserva en tu expediente solo evidencia, puntaje, rutas y fecha; elimina cuerpos HTTP, errores crudos y cabeceras sensibles.</p>
          {observation ? <div className="last-observation"><span>Ultima observacion</span><strong>{formatDate(observation.checkedAt)}</strong><small>{observation.target}</small></div> : null}
          <button className="primary-action" type="button" onClick={saveObservation} disabled={observationBusy || !websiteIsSaved}>
            {observationBusy ? <LoaderCircle className="spin" size={16} /> : <Radar size={16} />}
            Auditar y guardar observacion
          </button>
          <div className="verification-message" aria-live="polite"><CircleHelp size={17} /><span>{observationMessage}</span></div>
        </section>

        <CapsuleReview projectId={projectId} expectedDomain={hostname} allowBuild />
      </main>

      <aside className="intake-aside">
        <div className="owner-chip"><span>{userName.slice(0, 1).toUpperCase()}</span><div><strong>{userName}</strong><small>{userEmail}</small></div></div>
        <div className="progress-block"><div className="progress-label"><span>Contexto reunido</span><strong>{completion}%</strong></div><div className="progress-track"><span style={{ width: `${completion}%` }} /></div><small>{completedFields} de 12 decisiones</small></div>
        <div className="question-block"><CircleHelp size={20} /><span>Proxima pregunta</span><strong>{nextQuestion}</strong></div>
        <div className="save-status" data-status={status}>{status === 'saving' || status === 'loading' ? <LoaderCircle className="spin" size={17} /> : status === 'saved' ? <Check size={17} /> : <Save size={17} />}<span>{message}</span></div>
        {roadmap.length ? <div className="mini-roadmap"><span>Primer roadmap</span>{roadmap.slice(0, 4).map((item) => <div key={item.id}><small>{item.stage}</small><strong>{item.title}</strong></div>)}</div> : null}
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
