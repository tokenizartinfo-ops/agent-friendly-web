'use client';
import {useEffect,useLayoutEffect,useMemo,useRef,useState} from 'react';
import {MAX_SCOPE_BYTES,previewScanScope} from '../../lib/scan-scope-transfer.mjs';
import './scope-import.css';
import {ScopeMemory} from './scope-memory';

const COPY={
  es:{title:'Traigamos tu alcance',intro:'Si ya elegiste mejoras en el diagnóstico, abrí el archivo de traspaso para revisarlas juntos. También podés empezar sin archivo.',file:'Abrir alcance AFW (.json)',error:'No pude abrir este alcance. Elegí el archivo JSON de traspaso descargado desde el diagnóstico (hasta 16 KiB). Tu expediente sigue igual.',loading:'Estoy leyendo el archivo en esta pestaña…',reference:'Referencia importada: hay que confirmar estas señales. El archivo no incluye los límites originales del diagnóstico.',mismatch:'Este alcance corresponde a otro sitio o la dirección del expediente no es válida. Revisá la dirección o abrí el expediente correcto antes de continuar.',empty:'Todavía no hay un sitio en el expediente. Podés usar esta dirección como borrador y revisarla antes de guardar.',use:'Usar esta dirección en el borrador',review:'Revisé el sitio y las mejoras que quiero trabajar.',ready:'Listo: tenemos una referencia para completar los datos. No hace falta hacerlo todo ahora.',remove:'Quitar referencia',session:'Abrir o revisar el archivo no lo guarda. Para conservarlo, usá Guardar alcance revisado. Conservá también tu archivo.',assist:'Seguir con ayuda del asistente',observed:'Fecha declarada del diagnóstico'},
  en:{title:'Bring your scope along',intro:'If you chose improvements in the scan, open the transfer file so we can review them together. You can also start without a file.',file:'Open AFW scope (.json)',error:'I could not open this scope. Choose the JSON transfer file downloaded from the scan (up to 16 KiB). Your dossier is unchanged.',loading:'Reading the file in this tab…',reference:'Imported reference: these signals need confirmation. The file does not include the original scan limits.',mismatch:'This scope belongs to another website, or the dossier address is invalid. Check the address or open the right dossier before continuing.',empty:'There is no website in the dossier yet. You can use this address in the draft and review it before saving.',use:'Use this address in the draft',review:'I reviewed the website and the improvements I want to work on.',ready:'Ready: we have a reference for completing the details. You do not need to finish everything now.',remove:'Remove reference',session:'Opening or reviewing the file does not save it. To keep it, use Save reviewed scope. Keep your file too.',assist:'Continue with assistant help',observed:'Declared scan date'},
  pt:{title:'Vamos trazer seu escopo',intro:'Se você escolheu melhorias no diagnóstico, abra o arquivo de transferência para revisarmos juntos. Também pode começar sem arquivo.',file:'Abrir escopo AFW (.json)',error:'Não consegui abrir este escopo. Escolha o arquivo JSON de transferência baixado do diagnóstico (até 16 KiB). Seu dossiê continua igual.',loading:'Lendo o arquivo nesta aba…',reference:'Referência importada: estes sinais precisam de confirmação. O arquivo não inclui os limites originais do diagnóstico.',mismatch:'Este escopo pertence a outro site ou o endereço do dossiê é inválido. Confira o endereço ou abra o dossiê correto antes de continuar.',empty:'Ainda não há um site no dossiê. Você pode usar este endereço no rascunho e revisá-lo antes de salvar.',use:'Usar este endereço no rascunho',review:'Revisei o site e as melhorias que quero trabalhar.',ready:'Pronto: temos uma referência para completar os dados. Não precisa terminar tudo agora.',remove:'Remover referência',session:'Abrir ou revisar o arquivo não o salva. Para guardar, use Salvar escopo revisado. Guarde também seu arquivo.',assist:'Continuar com ajuda do assistente',observed:'Data declarada do diagnóstico'}
};

export type ReviewedScope={website:string;scopeText:string;reviewed:true}|null;

export function ScopeImport({locale,website,onUseWebsite,projectId,revision,canSave,request,onReviewChange}:{locale:'es'|'en'|'pt';website:string;onUseWebsite:(website:string)=>void;projectId:string;revision:number;canSave:boolean;request:typeof fetch;onReviewChange?:(scope:ReviewedScope)=>void}) {
  const copy=COPY[locale];
  const [busy,setBusy]=useState(false);
  const touched=useRef(false);
  const lastProject=useRef(projectId);
  const [previousProject,setPreviousProject]=useState(projectId);
  const [text,setText]=useState('');
  const [status,setStatus]=useState('');
  const [reviewedFor,setReviewedFor]=useState<string|null>(null);
  const sequence=useRef(0);
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
  return <section className="scope-import" aria-labelledby="scope-import-title">
    <h2 id="scope-import-title">{copy.title}</h2><p>{copy.intro}</p>
    <fieldset disabled={busy} className="scope-local"><label>{copy.file}<input type="file" accept=".json,application/json" onChange={event=>{void read(event.target.files?.[0]);event.target.value='';}}/></label>
    <p role="status">{status}</p>
    {preview?<>
      <p className="scope-origin">{preview.brief.observedUrl}</p><p>{copy.observed}: <time dateTime={preview.brief.checkedAt}>{new Date(preview.brief.checkedAt).toLocaleString(locale)}</time></p>
      <p>{copy.reference}</p>
      <ul>{preview.brief.actions.map(action=><li key={action.id}><strong>{action.title}</strong><p>{action.deliverable}</p></li>)}</ul>
      {matches===false?<p role="alert">{copy.mismatch}</p>:matches===null?<><p>{copy.empty}</p><button type="button" onClick={()=>onUseWebsite(preview.brief.target)}>{copy.use}</button></>:null}
      <label className="scope-review"><input type="checkbox" disabled={matches!==true} checked={reviewed} onChange={event=>setReviewedFor(event.target.checked?website:null)}/>{copy.review}</label>
      {reviewed?<p role="status">{copy.ready} <a href="#dossier-assistant" onClick={()=>{const panel=document.getElementById('dossier-assistant');if(panel instanceof HTMLDetailsElement)panel.open=true;}}>{copy.assist}</a></p>:null}
      <button type="button" onClick={()=>{touched.current=true;sequence.current++;setText('');setReviewedFor(null);setStatus('');}}>{copy.remove}</button>
    </>:null}
    </fieldset>
    <ScopeMemory key={projectId} locale={locale} projectId={projectId} revision={revision} canSave={canSave} text={text} reviewed={reviewed} request={request} onBusy={setBusy} onRestore={(value,onlyIfEmpty)=>{
      if(onlyIfEmpty&&(text||touched.current))return;
      sequence.current++;setText(value);setReviewedFor(null);setStatus('');
    }}/>
    <p>{copy.session}</p>
  </section>;
}
