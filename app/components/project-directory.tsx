'use client';

import {useCallback,useEffect,useRef,useState} from 'react';
import {localizedPath} from '../../lib/site-i18n.mjs';
import {canCarryScopeToProject} from '../../lib/scope-project-navigation.mjs';
import {saveScopeHandoff} from '../../lib/scan-scope-handoff.mjs';

type ProjectSummary={id:string;organization:string;website:string;status:string;completion:number;updatedAt:string};
type Locale='es'|'en'|'pt';
const COPY={
 es:{title:'Tus expedientes',intro:'Cada sitio conserva su propio contexto. Elegí el expediente que querés continuar.',current:'Estás aquí',open:'Abrir',openWithScope:'Abrir con esta referencia',more:'Ver más',refresh:'Actualizar lista',loading:'Buscando tus expedientes…',error:'No pude consultar la lista. Tu expediente actual sigue abierto.',session:'La sesión necesita renovarse antes de consultar la lista.',empty:'Todavía no hay otros expedientes guardados.',transferError:'Este navegador no pudo trasladar la referencia. Descargá su copia JSON antes de cambiar de expediente.'},
 en:{title:'Your dossiers',intro:'Each website keeps its own context. Choose the dossier you want to continue.',current:'You are here',open:'Open',openWithScope:'Open with this reference',more:'Show more',refresh:'Refresh list',loading:'Finding your dossiers…',error:'I could not load the list. Your current dossier remains open.',session:'Your session needs renewal before loading the list.',empty:'There are no other saved dossiers yet.',transferError:'This browser could not carry the reference. Download its JSON copy before changing dossiers.'},
 pt:{title:'Seus dossiês',intro:'Cada site mantém seu próprio contexto. Escolha o dossiê que deseja continuar.',current:'Você está aqui',open:'Abrir',openWithScope:'Abrir com esta referência',more:'Ver mais',refresh:'Atualizar lista',loading:'Buscando seus dossiês…',error:'Não consegui consultar a lista. O dossiê atual continua aberto.',session:'Sua sessão precisa ser renovada antes de consultar a lista.',empty:'Ainda não há outros dossiês salvos.',transferError:'Este navegador não conseguiu levar a referência. Baixe sua cópia JSON antes de trocar de dossiê.'},
};

export function ProjectDirectory({locale,currentProjectId,currentName,currentWebsite,pendingScope,request=fetch}:{locale:Locale;currentProjectId:string;currentName:string;currentWebsite:string;pendingScope?:{website:string;scopeText:string}|null;request?:typeof fetch}){
 const copy=COPY[locale];
 const [projects,setProjects]=useState<ProjectSummary[]>([]);
 const [nextOffset,setNextOffset]=useState<number|null>(null);
 const [state,setState]=useState<'loading'|'idle'|'error'|'session'>('loading');
 const [transferError,setTransferError]=useState(false);
 const generation=useRef(0);
 const load=useCallback(async(offset:number)=>{
  const seq=++generation.current;setState('loading');
  try{
   const response=await request(`/api/projects?list=1&offset=${offset}`,{cache:'no-store',redirect:'error'});
   if(seq!==generation.current)return;
   if(!response.ok){setState(response.status===401||response.status===403?'session':'error');return;}
   const payload=await response.json() as {projects?:ProjectSummary[];nextOffset?:number|null};
   if(!Array.isArray(payload.projects)||!(payload.nextOffset===null||Number.isSafeInteger(payload.nextOffset)))throw Error('invalid_directory');
   const safe=payload.projects.filter(project=>project&&typeof project.id==='string'&&typeof project.website==='string'&&typeof project.organization==='string'&&localizedPath('dossier',locale,{projectId:project.id}));
   if(seq!==generation.current)return;
   setProjects(current=>offset===0?safe:[...current,...safe.filter(project=>!current.some(existing=>existing.id===project.id))]);
   setNextOffset(payload.nextOffset??null);setState('idle');
  }catch{if(seq===generation.current)setState('error');}
 },[locale,request]);
 useEffect(()=>{let active=true;const currentGeneration=generation;Promise.resolve().then(()=>{if(active)void load(0);});return()=>{active=false;currentGeneration.current++;};},[load]);
 const others=projects.filter(project=>project.id!==currentProjectId);
 return <section className="project-directory" aria-labelledby="project-directory-title">
  <h3 id="project-directory-title">{copy.title}</h3><p>{copy.intro}</p>
  <ul><li><strong>{currentName||currentWebsite}</strong><small>{currentWebsite}</small><span aria-current="page">{copy.current}</span></li>{others.map(project=>{
   const href=localizedPath('dossier',locale,{projectId:project.id});
   const carries=Boolean(pendingScope&&canCarryScopeToProject(pendingScope.scopeText,project.website));
   return <li key={project.id}><strong>{project.organization||project.website}</strong><small>{project.website}</small>{href?<a href={href} onClick={event=>{if(!carries||!pendingScope)return;try{saveScopeHandoff(window.sessionStorage,pendingScope.scopeText);}catch{event.preventDefault();setTransferError(true);}}}>{carries?copy.openWithScope:copy.open}</a>:null}</li>;
  })}</ul>
  {others.length===0&&state==='idle'&&nextOffset===null?<p>{copy.empty}</p>:null}
  <p role="status">{state==='loading'?copy.loading:state==='error'?copy.error:state==='session'?copy.session:''}</p>
  {transferError?<p role="alert">{copy.transferError}</p>:null}
  {nextOffset!==null?<button type="button" disabled={state==='loading'} onClick={()=>void load(nextOffset)}>{copy.more}</button>:null}
  <button type="button" disabled={state==='loading'} onClick={()=>void load(0)}>{copy.refresh}</button>
 </section>;
}
