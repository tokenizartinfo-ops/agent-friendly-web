'use client';
import {useEffect,useState} from 'react';
import {dossierTrustSummary} from '../../lib/dossier-trust-summary.mjs';
import {dossierFieldLabels} from '../../lib/dossier-field-labels.mjs';
type Locale='es'|'en'|'pt';
type Props={projectId:string;revision:number;draft:Record<string,string|string[]>;saved:Record<string,string|string[]>;locale:Locale;observation:{target:string;checkedAt:string}|null;request:typeof fetch};
const copy={
 es:{title:'De dónde sale esta información',intro:'Tus respuestas son declaraciones del expediente. Una propuesta revisada con IA tampoco verifica por sí sola el dato en la web.',owner_declared:'Declarado en el expediente',copilot_reviewed:'Propuesta de IA revisada al guardar',draft:'Borrador: cambio todavía sin guardar',loading:'Estoy consultando las referencias de guardado.',failed:'No pude consultar esas referencias. Tus datos siguen aquí; no puedo confirmar su historial ahora.',retry:'Reintentar referencias',observed:'Observación pública guardada',none:'Todavía no hay una observación fechada del sitio actual disponible aquí.',limit:'La lectura pública describe señales y archivos en esa fecha; no comprueba todas las declaraciones ni confirma que el sitio siga igual.'},
 en:{title:'Where this information comes from',intro:'Your answers are dossier declarations. An AI suggestion reviewed before saving does not independently verify the detail on the website.',owner_declared:'Declared in the dossier',copilot_reviewed:'AI suggestion reviewed when saved',draft:'Draft: change not saved yet',loading:'I am checking the save references.',failed:'I could not retrieve those references. Your details remain here; their history cannot be confirmed now.',retry:'Retry references',observed:'Saved public observation',none:'No dated observation of the current website is available here yet.',limit:'The public reading describes signals and files on that date; it does not verify every declaration or confirm the website remains unchanged.'},
 pt:{title:'De onde vem esta informação',intro:'Suas respostas são declarações do dossiê. Uma proposta de IA revisada antes de salvar não verifica o dado no site por si só.',owner_declared:'Declarado no dossiê',copilot_reviewed:'Proposta de IA revisada ao salvar',draft:'Rascunho: alteração ainda não salva',loading:'Estou consultando as referências de salvamento.',failed:'Não consegui consultar as referências. Seus dados continuam aqui; não posso confirmar o histórico agora.',retry:'Consultar referências',observed:'Observação pública salva',none:'Ainda não há uma observação datada do site atual disponível aqui.',limit:'A leitura pública descreve sinais e arquivos naquela data; não verifica todas as declarações nem confirma que o site continua igual.'}
};
export function DossierTrustSummary(props:Props){
 const [open,setOpen]=useState(false),[attempt,setAttempt]=useState(0);
 const [record,setRecord]=useState<{key:string;fields:Record<string,unknown>}|null>(null);
 const [failure,setFailure]=useState('');
 const key=`${props.projectId}:${props.revision}`,labels=copy[props.locale],names:Record<string,string>=dossierFieldLabels(props.locale);
 useEffect(()=>{
  if(!open||!props.projectId)return;
  const controller=new AbortController();
  void props.request(`/api/projects/${encodeURIComponent(props.projectId)}/field-history`,{cache:'no-store',signal:controller.signal}).then(async response=>{
   if(!response.ok)throw Error('unavailable');
   const body=await response.json();
   if(!body.fields||typeof body.fields!=='object'||Array.isArray(body.fields))throw Error('unavailable');
   if(!controller.signal.aborted){setRecord({key,fields:body.fields});setFailure('');}
  }).catch(()=>{if(!controller.signal.aborted)setFailure(key);});
  return ()=>controller.abort();
 },[open,props.projectId,props.revision,props.request,key,attempt]);
 const ready=record?.key===key;
 const model=dossierTrustSummary({...props,fields:ready?record.fields:{}});
 const date=(value:string)=>new Date(value).toLocaleString(props.locale==='en'?'en-US':props.locale==='pt'?'pt-BR':'es-AR');
 return <details className="form-section dossier-trust-summary" onToggle={event=>setOpen(event.currentTarget.open)}><summary>{labels.title}</summary><p>{labels.intro}</p>
  {failure===key?<p role="status">{labels.failed} <button type="button" onClick={()=>{setFailure('');setRecord(null);setAttempt(value=>value+1);}}>{labels.retry}</button></p>:!ready&&open?<p role="status">{labels.loading}</p>:null}
  <ul>{model.items.map(item=><li key={item.field}><strong>{names[item.field]||item.field}</strong>: {labels[item.kind as 'draft'|'copilot_reviewed'|'owner_declared']}{item.savedAt?<> · <time dateTime={item.savedAt}>{date(item.savedAt)}</time></>:null}</li>)}</ul>
  {model.observation?<p><strong>{labels.observed}</strong> · <time dateTime={model.observation.checkedAt}>{date(model.observation.checkedAt)}</time><br/>{model.observation.target}</p>:<p>{labels.none}</p>}<small>{labels.limit}</small>
 </details>;
}
