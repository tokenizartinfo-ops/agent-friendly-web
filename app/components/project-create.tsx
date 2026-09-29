'use client';

import { useRef, useState } from 'react';
import { FilePlus2, LoaderCircle, ArrowRight, RefreshCw } from 'lucide-react';
import { createProjectRequest } from '../../lib/project-create-client.mjs';

const words = {
  es: { title: 'Crear otro expediente', name: 'Nombre del proyecto', site: 'Sitio web', create: 'Crear expediente separado', retry: 'Reintentar la misma solicitud', open: 'Abrir nuevo expediente', notice: 'El expediente actual se conserva. El nuevo comienza como borrador privado, sin verificar ni publicar el sitio.', error: 'No pudimos confirmar la creacion. Reintenta aqui con los mismos datos; no abras otra solicitud.', done: 'Expediente creado. Puedes abrirlo para completar sus datos.' },
  en: { title: 'Create another dossier', name: 'Project name', site: 'Website', create: 'Create separate dossier', retry: 'Retry the same request', open: 'Open new dossier', notice: 'The current dossier is preserved. The new one starts as a private draft, without verifying or publishing the website.', error: 'Creation could not be confirmed. Retry here with the same details; do not start another request.', done: 'Dossier created. Open it to complete its details.' },
  pt: { title: 'Criar outro dossie', name: 'Nome do projeto', site: 'Site', create: 'Criar dossie separado', retry: 'Repetir a mesma solicitacao', open: 'Abrir novo dossie', notice: 'O dossie atual sera preservado. O novo comeca como rascunho privado, sem verificar nem publicar o site.', error: 'Nao foi possivel confirmar a criacao. Tente novamente aqui com os mesmos dados; nao abra outra solicitacao.', done: 'Dossie criado. Abra para completar os dados.' },
};

export function ProjectCreate({ locale, disabled }: { locale: 'es' | 'en' | 'pt'; disabled: boolean }) {
  const copy = words[locale];
  const [website, setWebsite] = useState('');
  const [organization, setOrganization] = useState('');
  const [state, setState] = useState<'idle' | 'busy' | 'error' | 'done'>('idle');
  const [href, setHref] = useState('');
  const [validationError, setValidationError] = useState(false);
  const submit = useRef<null | (() => Promise<{ id: string }>)>(null);
  async function create() {
    if (disabled || state === 'busy' || state === 'done') return;
    if (!submit.current) submit.current = createProjectRequest({ website, organization }, crypto.randomUUID());
    setState('busy');
    setValidationError(false);
    try {
      const project = await submit.current!();
      const url = new URL(window.location.href);
      url.searchParams.set('project', project.id);
      setHref(`${url.pathname}${url.search}`);
      setState('done');
    } catch (error) {
      if (error && typeof error === 'object' && 'status' in error && error.status === 400) {
        submit.current = null;
        setValidationError(true);
        setState('idle');
      } else setState('error');
    }
  }
  return <details className="form-section project-create">
    <summary><FilePlus2 size={20} aria-hidden="true" /> {copy.title}</summary>
    <p>{copy.notice}</p>
    <form onSubmit={(event) => { event.preventDefault(); void create(); }} aria-busy={state === 'busy'}>
      <fieldset disabled={disabled || state !== 'idle'} className="field-grid">
        <label>{copy.name}<input value={organization} maxLength={200} onChange={(event) => setOrganization(event.target.value)} /></label>
        <label>{copy.site}<input value={website} required type="url" placeholder="https://example.org" onChange={(event) => setWebsite(event.target.value)} /></label>
      </fieldset>
      {state !== 'done' && <button type="submit" className="secondary-action" disabled={disabled || state === 'busy' || !website.trim()}>
        {state === 'busy' ? <LoaderCircle size={18} /> : state === 'error' ? <RefreshCw size={18} /> : <FilePlus2 size={18} />}
        {state === 'error' ? copy.retry : copy.create}
      </button>}
      <p role="status">{validationError ? (locale === 'es' ? 'Revisa el sitio web y corrige los datos antes de volver a crear.' : locale === 'en' ? 'Check the website and correct the details before creating again.' : 'Revise o site e corrija os dados antes de criar novamente.') : state === 'error' ? copy.error : state === 'done' ? copy.done : ''}</p>
      {state === 'done' && (disabled
        ? <span className="secondary-action" aria-disabled="true"><ArrowRight size={18} />{copy.open}</span>
        : <a className="secondary-action" href={href}><ArrowRight size={18} />{copy.open}</a>)}
    </form>
  </details>;
}
