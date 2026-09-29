'use client';
import {useEffect,useLayoutEffect,useMemo,useRef,useState} from 'react';
import {MAX_SCOPE_BYTES,previewScanScope} from '../../lib/scan-scope-transfer.mjs';
import './scope-import.css';
import {ScopeMemory} from './scope-memory';
import {takeScopeHandoffResult} from '../../lib/scan-scope-handoff.mjs';

const COPY={
  es:{title:'Traigamos tu alcance',intro:'Si venís del diagnóstico, revisemos aquí las mejoras elegidas. Podés continuar en esta pestaña, abrir el archivo descargado o empezar sin ninguno.',file:'Abrir alcance AFW (.json)',error:'No pude abrir este alcance. Elegí el archivo JSON de traspaso descargado desde el diagnóstico (hasta 16 KiB). Tu expediente sigue igual.',loading:'Estoy leyendo el archivo en esta pestaña…',handoff:'Traje la referencia de esta pestaña. Revisá el sitio y las mejoras antes de guardarla.',expired:'La referencia temporal caducó después de 30 minutos. Si descargaste el alcance, abrilo aquí. Tu expediente sigue igual.',invalid:'No pude recuperar la referencia temporal. Si descargaste el alcance, abrilo aquí. Tu expediente sigue igual.',again:'Volver al diagnóstico',reference:'Referencia importada: hay que confirmar estas señales. Esta referencia no incluye los límites originales del diagnóstico.',mismatch:'Este alcance corresponde a otro sitio o la dirección del expediente no es válida. Revisá la dirección o abrí el expediente correcto antes de continuar.',empty:'Todavía no hay un sitio en el expediente. Podés usar esta dirección como borrador y revisarla antes de guardar.',use:'Usar esta dirección en el borrador',review:'Revisé el sitio y las mejoras que quiero trabajar.',ready:'Listo: tenemos una referencia para completar los datos. No hace falta hacerlo todo ahora.',remove:'Quitar referencia',session:'Traer o revisar una referencia no la guarda. Para conservarla, usá Guardar alcance revisado. Si descargaste el archivo, conserválo también.',assist:'Seguir con ayuda del asistente',observed:'Fecha declarada del diagnóstico'},
  en:{title:'Bring your scope along',intro:'Coming from the scan? Let’s review your selected improvements here. You can continue in this tab, open the downloaded file, or start without either.',file:'Open AFW scope (.json)',error:'I could not open this scope. Choose the JSON transfer file downloaded from the scan (up to 16 KiB). Your dossier is unchanged.',loading:'Reading the file in this tab…',handoff:'I brought the reference from this tab. Review the website and improvements before saving it.',expired:'The temporary reference expired after 30 minutes. If you downloaded the scope, open it here. Your dossier is unchanged.',invalid:'I could not recover the temporary reference. If you downloaded the scope, open it here. Your dossier is unchanged.',again:'Return to the scan',reference:'Imported reference: these signals need confirmation. This reference does not include the original scan limits.',mismatch:'This scope belongs to another website, or the dossier address is invalid. Check the address or open the right dossier before continuing.',empty:'There is no website in the dossier yet. You can use this address in the draft and review it before saving.',use:'Use this address in the draft',review:'I reviewed the website and the improvements I want to work on.',ready:'Ready: we have a reference for completing the details. You do not need to finish everything now.',remove:'Remove reference',session:'Bringing in or reviewing a reference does not save it. To keep it, use Save reviewed scope. If you downloaded the file, keep it too.',assist:'Continue with assistant help',observed:'Declared scan date'},
  pt:{title:'Vamos trazer seu escopo',intro:'Veio do diagnóstico? Vamos revisar aqui as melhorias escolhidas. Você pode continuar nesta aba, abrir o arquivo baixado ou começar sem nenhum dos dois.',file:'Abrir escopo AFW (.json)',error:'Não consegui abrir este escopo. Escolha o arquivo JSON de transferência baixado do diagnóstico (até 16 KiB). Seu dossiê continua igual.',loading:'Lendo o arquivo nesta aba…',handoff:'Trouxe a referência desta aba. Revise o site e as melhorias antes de salvá-la.',expired:'A referência temporária expirou após 30 minutos. Se baixou o escopo, abra-o aqui. Seu dossiê continua igual.',invalid:'Não consegui recuperar a referência temporária. Se baixou o escopo, abra-o aqui. Seu dossiê continua igual.',again:'Voltar ao diagnóstico',reference:'Referência importada: estes sinais precisam de confirmação. Esta referência não inclui os limites originais do diagnóstico.',mismatch:'Este escopo pertence a outro site ou o endereço do dossiê é inválido. Confira o endereço ou abra o dossiê correto antes de continuar.',empty:'Ainda não há um site no dossiê. Você pode usar este endereço no rascunho e revisá-lo antes de salvar.',use:'Usar este endereço no rascunho',review:'Revisei o site e as melhorias que quero trabalhar.',ready:'Pronto: temos uma referência para completar os dados. Não precisa terminar tudo agora.',remove:'Remover referência',session:'Trazer ou revisar uma referência não a salva. Para guardá-la, use Salvar escopo revisado. Se baixou o arquivo, guarde-o também.',assist:'Continuar com ajuda do assistente',observed:'Data declarada do diagnóstico'}
};

export type ReviewedScope={website:string;scopeText:string;reviewed:true}|null;

export function ScopeImport({locale,website,onUseWebsite,projectId,revision,canSave,request,onReviewChange,onPrepareSeparate}:{locale:'es'|'en'|'pt';website:string;onUseWebsite:(website:string)=>void;projectId:string;revision:number;canSave:boolean;request:typeof fetch;onReviewChange?:(scope:ReviewedScope)=>void;onPrepareSeparate?:(scope:{website:string;scopeText:string}|null)=>void}) {
  const copy=COPY[locale];
  const [busy,setBusy]=useState(false);
  const touched=useRef(false);
  const lastProject=useRef(projectId);
  const [previousProject,setPreviousProject]=useState(projectId);
  const [text,setText]=useState('');
  const [status,setStatus]=useState('');
  const [reviewedFor,setReviewedFor]=useState<string|null>(null);
  const sequence=useRef(0);
  useEffect(()=>{
    let cancelled=false;
    Promise.resolve().then(()=>{
      if(cancelled)return;
      try {
        const pending=takeScopeHandoffResult(window.sessionStorage);
        if(pending.status==='ready'){touched.current=true;setText(pending.text);setReviewedFor(null);setStatus(copy.handoff);}
        if(pending.status==='expired'||pending.status==='invalid')setStatus(copy[pending.status]);
      } catch { setStatus(copy.invalid); }
    });
    return()=>{cancelled=true;};
  },[copy]);
  if(previousProject!==projectId){setPreviousProject(projectId);if(previousProject){setText('');setReviewedFor(null);setBusy(false);}}

  useLayoutEffect(()=>{if(lastProject.current && lastProject.current!==projectId){sequence.current++;touched.current=false;}lastProject.current=projectId;},[projectId]);
  const [previousWebsite,setPreviousWebsite]=useState(website);
  if(previousWebsite!==website){setPreviousWebsite(website);setReviewedFor(null);}
  const preview=useMemo(()=>text?previewScanScope(text):null,[text]);
  const matches=useMemo(()=>{try{return text?previewScanScope(text,website).websiteMatches:null;}catch{return false;}},[text,website]);
  const reviewed=reviewedFor===website && matches===true;
  useEffect(()=>{onReviewChange?.(reviewed?{website,scopeText:text,reviewed:true}:null);},[reviewed,website,text,onReviewChange]);
  async function read(file?:File) {
    touched.current=true;
    onPrepareSeparate?.(null);
    const request=++sequence.current;
    setText('');setReviewedFor(null);setStatus('');
    if(!file)return;
    if(file.size>MAX_SCOPE_BYTES){setStatus(copy.error);return;}
    setStatus(copy.loading);
    try {
      const value=await file.text();
      previewScanScope(value);
      if(request!==sequence.current)return;
      setText(value);setStatus('');
    } catch {if(request===sequence.current)setStatus(copy.error);}
  }
  function downloadReference(){
    if(!text||!preview)return;
    const url=URL.createObjectURL(new Blob([text],{type:'application/json'}));
    const link=document.createElement('a');link.href=url;link.download=`afw-scope-${new URL(preview.brief.target).hostname}.json`;
    document.body.appendChild(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
  }
  return <section className="scope-import" aria-labelledby="scope-import-title">
    <h2 id="scope-import-title">{copy.title}</h2><p>{copy.intro}</p>
    <fieldset disabled={busy} className="scope-local"><label>{copy.file}<input type="file" accept=".json,application/json" onChange={event=>{void read(event.target.files?.[0]);event.target.value='';}}/></label>
    <p role="status">{status} {(status===copy.expired||status===copy.invalid)?<a href={`${locale==='es'?'/':`/${locale}`}#auditar`}>{copy.again}</a>:null}</p>
    {preview?<>
      <p className="scope-origin">{preview.brief.observedUrl}</p><p>{copy.observed}: <time dateTime={preview.brief.checkedAt}>{new Date(preview.brief.checkedAt).toLocaleString(locale)}</time></p>
      <p>{copy.reference}</p>
      <ul>{preview.brief.actions.map(action=><li key={action.id}><strong>{action.title}</strong><p>{action.deliverable}</p></li>)}</ul>
      {matches===false?<><p role="alert">{copy.mismatch}</p>{projectId&&onPrepareSeparate?<button type="button" onClick={()=>{onPrepareSeparate({website:preview.brief.target,scopeText:text});document.getElementById('project-create')?.scrollIntoView({behavior:'smooth',block:'center'});}}>{locale==='es'?'Preparar otro expediente para este sitio':locale==='en'?'Prepare another dossier for this website':'Preparar outro dossiê para este site'}</button>:null}</>:matches===null?<><p>{copy.empty}</p><button type="button" onClick={()=>onUseWebsite(preview.brief.target)}>{copy.use}</button></>:null}
      <label className="scope-review"><input type="checkbox" disabled={matches!==true} checked={reviewed} onChange={event=>setReviewedFor(event.target.checked?website:null)}/>{copy.review}</label>
      {reviewed?<p role="status">{copy.ready} <a href="#dossier-assistant" onClick={()=>{const panel=document.getElementById('dossier-assistant');if(panel instanceof HTMLDetailsElement)panel.open=true;}}>{copy.assist}</a></p>:null}
      <button type="button" onClick={downloadReference}>{locale==='es'?'Descargar copia de la referencia (.json)':locale==='en'?'Download a copy of the reference (.json)':'Baixar cópia da referência (.json)'}</button>
      <button type="button" onClick={()=>{touched.current=true;sequence.current++;setText('');setReviewedFor(null);setStatus('');onPrepareSeparate?.(null);}}>{copy.remove}</button>
    </>:null}
    </fieldset>
    <ScopeMemory key={projectId} locale={locale} projectId={projectId} revision={revision} canSave={canSave} text={text} reviewed={reviewed} request={request} onBusy={setBusy} onRestore={(value,onlyIfEmpty)=>{
      if(onlyIfEmpty&&(text||touched.current))return;
      sequence.current++;setText(value);setReviewedFor(null);setStatus('');
    }}/>
    <p>{copy.session}</p>
  </section>;
}
