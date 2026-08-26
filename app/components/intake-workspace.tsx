'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Check, CircleHelp, Cloud, Languages, LoaderCircle, Save, ShieldAlert, Target, UserRound } from 'lucide-react';

type Intake = {
  organization: string;
  website: string;
  role: string;
  siteType: string;
  control: string;
  audience: string;
  goals: string[];
  languages: string[];
  cms: string;
  hosting: string;
  notes: string;
};

type RoadmapItem = { id: string; title: string; reason: string; stage: string };

const emptyIntake: Intake = {
  organization: '',
  website: '',
  role: '',
  siteType: '',
  control: 'unknown',
  audience: '',
  goals: [],
  languages: [],
  cms: '',
  hosting: '',
  notes: '',
};

const goalOptions = [
  ['discovery', 'Aparecer en respuestas y busquedas'],
  ['content', 'Explicar mejor productos o servicios'],
  ['tools', 'Exponer APIs, MCP o skills'],
  ['actions', 'Permitir acciones delegadas'],
  ['payments', 'Preparar pagos entre agentes'],
];

const languageOptions = ['Español', 'Ingles', 'Portugues', 'Italiano', 'Frances'];

export function IntakeWorkspace({ userName, userEmail }: { userName: string; userEmail: string }) {
  const [data, setData] = useState<Intake>(emptyIntake);
  const [projectId, setProjectId] = useState('');
  const [completion, setCompletion] = useState(0);
  const [nextQuestion, setNextQuestion] = useState('Empecemos por el nombre de la organizacion o proyecto.');
  const [roadmap, setRoadmap] = useState<RoadmapItem[]>([]);
  const [status, setStatus] = useState<'loading' | 'idle' | 'saving' | 'saved' | 'error'>('loading');
  const [message, setMessage] = useState('Buscando un expediente anterior...');
  const ready = useRef(false);

  useEffect(() => {
    fetch('/api/projects', { cache: 'no-store' })
      .then(async (response) => {
        const payload = await response.json();
        if (!response.ok) throw new Error(payload.error || 'No se pudo abrir el expediente.');
        if (payload.project) {
          const saved = payload.project;
          setProjectId(saved.id);
          setData({
            organization: saved.organization || '', website: saved.website || '', role: saved.role || '',
            siteType: saved.siteType || '', control: saved.control || 'unknown', audience: saved.audience || '',
            goals: saved.goals || [], languages: saved.languages || [], cms: saved.cms || '',
            hosting: saved.hosting || '', notes: saved.notes || '',
          });
          setCompletion(saved.completion || 0);
          setNextQuestion(saved.nextQuestion || 'Revisemos el proximo dato.');
          setRoadmap(saved.roadmap || []);
          setMessage('Expediente recuperado.');
        } else {
          setMessage('Nuevo expediente. Completa los datos a tu ritmo.');
        }
        setStatus('idle');
        window.setTimeout(() => { ready.current = true; }, 0);
      })
      .catch((error) => {
        setStatus('error');
        setMessage(error instanceof Error ? error.message : 'No se pudo abrir el expediente.');
      });
  }, []);

  useEffect(() => {
    if (!ready.current || !data.website) return;
    setStatus('saving');
    setMessage('Guardando cambios...');
    const timer = window.setTimeout(async () => {
      try {
        const response = await fetch('/api/projects', {
          method: 'PUT',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ ...data, id: projectId }),
        });
        const payload = await response.json();
        if (!response.ok) throw new Error(payload.error || 'No se pudo guardar.');
        setCompletion(payload.project.completion);
        setProjectId(payload.project.id);
        setNextQuestion(payload.project.nextQuestion || 'El contexto basico esta completo.');
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

  const completedFields = useMemo(() => Math.round((completion / 100) * 8), [completion]);

  function update<K extends keyof Intake>(field: K, value: Intake[K]) {
    setData((current) => ({ ...current, [field]: value }));
  }

  function toggleList(field: 'goals' | 'languages', value: string) {
    const current = data[field];
    update(field, current.includes(value) ? current.filter((item) => item !== value) : [...current, value]);
  }

  return (
    <div className="intake-layout">
      <section className="intake-main">
        <div className="page-title">
          <span>Expediente privado</span>
          <h1>Contanos lo que el sitio necesita comunicar y permitir.</h1>
          <p>No hace falta conocer terminos tecnicos. Podes volver, corregir y ampliar datos cuando quieras.</p>
        </div>

        <div className="form-section">
          <div className="form-section-title"><UserRound size={20} /><div><strong>Identidad y contexto</strong><span>Quien sos y que representa el sitio.</span></div></div>
          <div className="field-grid">
            <label>Organizacion o proyecto<input value={data.organization} onChange={(event) => update('organization', event.target.value)} placeholder="Ej. Museo Top" /></label>
            <label>Sitio web<input value={data.website} onChange={(event) => update('website', event.target.value)} placeholder="ejemplo.org" inputMode="url" /></label>
            <label>Tu funcion<input value={data.role} onChange={(event) => update('role', event.target.value)} placeholder="Propietario, artista, responsable..." /></label>
            <label>Tipo de sitio<select value={data.siteType} onChange={(event) => update('siteType', event.target.value)}><option value="">Elegir</option><option value="artist">Artista</option><option value="gallery">Galeria</option><option value="museum">Museo o archivo</option><option value="institution">Institucion</option><option value="commerce">Comercio o servicio</option><option value="other">Otro</option></select></label>
          </div>
          <label className="wide-field">A quienes queres llegar<textarea value={data.audience} onChange={(event) => update('audience', event.target.value)} placeholder="Personas, organizaciones o agentes que deberian encontrarte y entenderte." /></label>
        </div>

        <div className="form-section">
          <div className="form-section-title"><Target size={20} /><div><strong>Objetivos</strong><span>Podes elegir mas de uno y cambiarlo despues.</span></div></div>
          <div className="choice-grid">
            {goalOptions.map(([value, label]) => <button className={data.goals.includes(value) ? 'choice active' : 'choice'} type="button" key={value} onClick={() => toggleList('goals', value)}><span>{data.goals.includes(value) ? <Check size={15} /> : null}</span>{label}</button>)}
          </div>
        </div>

        <div className="form-section">
          <div className="form-section-title"><Cloud size={20} /><div><strong>Control tecnico</strong><span>Esto define que mejoras pueden hacerse ahora.</span></div></div>
          <div className="field-grid">
            <label>Que control tenes<select value={data.control} onChange={(event) => update('control', event.target.value)}><option value="unknown">No lo se</option><option value="origin">Acceso al sitio o codigo</option><option value="dns">Acceso al dominio o Cloudflare</option><option value="provider">Dependo de un proveedor</option><option value="none">No tengo acceso</option></select></label>
            <label>Sistema de contenidos<input value={data.cms} onChange={(event) => update('cms', event.target.value)} placeholder="WordPress, Shopify, propio, no lo se..." /></label>
            <label>Alojamiento<input value={data.hosting} onChange={(event) => update('hosting', event.target.value)} placeholder="Cloudflare, Vercel, hosting tradicional..." /></label>
          </div>
          <div className="security-note"><ShieldAlert size={19} /><div><strong>No ingreses contraseñas ni claves.</strong><span>Solo necesitamos saber que acceso existe. Las credenciales se gestionan por un canal separado y seguro.</span></div></div>
        </div>

        <div className="form-section">
          <div className="form-section-title"><Languages size={20} /><div><strong>Idiomas y material disponible</strong><span>El contenido puede crecer progresivamente.</span></div></div>
          <div className="choice-grid compact">
            {languageOptions.map((language) => <button className={data.languages.includes(language) ? 'choice active' : 'choice'} type="button" key={language} onClick={() => toggleList('languages', language)}><span>{data.languages.includes(language) ? <Check size={15} /> : null}</span>{language}</button>)}
          </div>
          <label className="wide-field">Notas o informacion desordenada<textarea value={data.notes} onChange={(event) => update('notes', event.target.value)} placeholder="Escribi libremente. El sistema ayudara a ordenar esta informacion antes de convertirla en contenidos o herramientas." /></label>
        </div>
      </section>

      <aside className="intake-aside">
        <div className="owner-chip"><span>{userName.slice(0, 1).toUpperCase()}</span><div><strong>{userName}</strong><small>{userEmail}</small></div></div>
        <div className="progress-block">
          <div className="progress-label"><span>Contexto reunido</span><strong>{completion}%</strong></div>
          <div className="progress-track"><span style={{ width: `${completion}%` }} /></div>
          <small>{completedFields} de 8 decisiones basicas</small>
        </div>
        <div className="question-block"><CircleHelp size={20} /><span>Proxima pregunta</span><strong>{nextQuestion}</strong></div>
        <div className="save-status" data-status={status}>
          {status === 'saving' || status === 'loading' ? <LoaderCircle className="spin" size={17} /> : status === 'saved' ? <Check size={17} /> : <Save size={17} />}
          <span>{message}</span>
        </div>
        {roadmap.length ? <div className="mini-roadmap"><span>Primer roadmap</span>{roadmap.slice(0, 4).map((item) => <div key={item.id}><small>{item.stage}</small><strong>{item.title}</strong></div>)}</div> : null}
      </aside>
    </div>
  );
}
