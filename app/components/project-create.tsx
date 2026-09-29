'use client';

import { useEffect, useRef, useState } from 'react';
import { FilePlus2, LoaderCircle, ArrowRight, RefreshCw } from 'lucide-react';
import { createProjectRequest } from '../../lib/project-create-client.mjs';
import { saveScopeHandoff } from '../../lib/scan-scope-handoff.mjs';
import { previewScanScope } from '../../lib/scan-scope-transfer.mjs';

const words = {
  es: { title: 'Crear otro expediente', name: 'Nombre del proyecto', site: 'Sitio web', create: 'Crear expediente separado', retry: 'Reintentar la misma solicitud', open: 'Abrir nuevo expediente', notice: 'El expediente actual se conserva. El nuevo comienza como borrador privado, sin verificar ni publicar el sitio.', error: 'No pudimos confirmar la creacion. Reintenta aqui con los mismos datos; no abras otra solicitud.', done: 'Expediente creado. Puedes abrirlo para completar sus datos.' },
  en: { title: 'Create another dossier', name: 'Project name', site: 'Website', create: 'Create separate dossier', retry: 'Retry the same request', open: 'Open new dossier', notice: 'The current dossier is preserved. The new one starts as a private draft, without verifying or publishing the website.', error: 'Creation could not be confirmed. Retry here with the same details; do not start another request.', done: 'Dossier created. Open it to complete its details.' },
  pt: { title: 'Criar outro dossie', name: 'Nome do projeto', site: 'Site', create: 'Criar dossie separado', retry: 'Repetir a mesma solicitacao', open: 'Abrir novo dossie', notice: 'O dossie atual sera preservado. O novo comeca como rascunho privado, sem verificar nem publicar o site.', error: 'Nao foi possivel confirmar a criacao. Tente novamente aqui com os mesmos dados; nao abra outra solicitacao.', done: 'Dossie criado. Abra para completar os dados.' },
};

export function ProjectCreate({ locale, disabled, suggestion }: { locale: 'es' | 'en' | 'pt'; disabled: boolean; suggestion?: {website:string;scopeText:string}|null }) {
  const copy = words[locale];
  const [website, setWebsite] = useState(suggestion?.website || '');
  const [organization, setOrganization] = useState('');
  const [state, setState] = useState<'idle' | 'busy' | 'error' | 'done'>('idle');
  const [href, setHref] = useState('');
  const [validationError, setValidationError] = useState(false);
  const [transferError,setTransferError]=useState(false);
  const submit = useRef<null | (() => Promise<{ id: string }>)>(null);
  let transferMatches=false;
  try{transferMatches=Boolean(suggestion&&previewScanScope(suggestion.scopeText,website).websiteMatches===true);}catch{/* Keep the transfer closed while the address is incomplete. */}
  useEffect(()=>{
    if(!suggestion)return;
    const section=document.getElementById('project-create');
    if(section instanceof HTMLDetailsElement)section.open=true;
  },[suggestion]);
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
  function openCreated(event:React.MouseEvent<HTMLAnchorElement>){
    if(!suggestion||!transferMatches)return;
    try{
      saveScopeHandoff(window.sessionStorage,suggestion.scopeText);
    }catch{
      event.preventDefault();setTransferError(true);
    }
  }
  return <details id="project-create" className="form-section project-create">
    <summary><FilePlus2 size={20} aria-hidden="true" /> {copy.title}</summary>
    <p>{copy.notice}</p>
      {suggestion?<p>{locale==='es'?'Preparé el sitio del diagnóstico. Revisá la dirección antes de crear el expediente; al abrirlo, traeré la referencia para que la confirmes de nuevo.':locale==='en'?'I filled in the scanned website. Review the address before creating the dossier; when you open it, I will bring the reference for a fresh review.':'Preenchi o site do diagnóstico. Revise o endereço antes de criar o dossiê; ao abri-lo, trarei a referência para uma nova revisão.'}</p>:null}
    <form onSubmit={(event) => { event.preventDefault(); void create(); }} aria-busy={state === 'busy'}>
      <fieldset disabled={disabled || state !== 'idle'} className="field-grid">
        <label>{copy.name}<input value={organization} maxLength={200} onChange={(event) => setOrganization(event.target.value)} /></label>
        <label>{copy.site}<input value={website} required type="url" placeholder="https://example.org" onChange={(event) => setWebsite(event.target.value)} /></label>
      </fieldset>
      {suggestion&&!transferMatches?<p role="status">{locale==='es'?'La dirección ya no coincide con el diagnóstico. Podés crear el expediente, pero esta referencia no se trasladará automáticamente. Descargá una copia si querés conservarla.':locale==='en'?'The address no longer matches the scan. You can create the dossier, but this reference will not transfer automatically. Download a copy if you want to keep it.':'O endereço não coincide mais com o diagnóstico. Você pode criar o dossiê, mas esta referência não será transferida automaticamente. Baixe uma cópia se quiser guardá-la.'}</p>:null}
      {state !== 'done' && <button type="submit" className="secondary-action" disabled={disabled || state === 'busy' || !website.trim()}>
        {state === 'busy' ? <LoaderCircle size={18} /> : state === 'error' ? <RefreshCw size={18} /> : <FilePlus2 size={18} />}
        {state === 'error' ? copy.retry : copy.create}
      </button>}
      <p role="status">{validationError ? (locale === 'es' ? 'Revisa el sitio web y corrige los datos antes de volver a crear.' : locale === 'en' ? 'Check the website and correct the details before creating again.' : 'Revise o site e corrija os dados antes de criar novamente.') : state === 'error' ? copy.error : state === 'done' ? copy.done : ''}</p>
      {transferError?<p role="alert">{locale==='es'?'Este navegador no pudo trasladar la referencia. Conservá esta pestaña y abrí el archivo JSON desde el nuevo expediente.':locale==='en'?'This browser could not carry the reference. Keep this tab and open the JSON file in the new dossier.':'Este navegador não conseguiu levar a referência. Mantenha esta aba e abra o arquivo JSON no novo dossiê.'}</p>:null}
      {state === 'done' && (disabled
        ? <span className="secondary-action" aria-disabled="true"><ArrowRight size={18} />{copy.open}</span>
        : <a className="secondary-action" href={href} onClick={openCreated}><ArrowRight size={18} />{copy.open}</a>)}
    </form>
  </details>;
}
