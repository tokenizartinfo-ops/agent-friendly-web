'use client';
import {useCallback,useEffect,useLayoutEffect,useRef,useState} from 'react';
import {previewScanScope} from '../../lib/scan-scope-transfer.mjs';
import {SCOPE_MEMORY_COPY} from '../../lib/scope-memory-copy.mjs';

type Reference={id:string;savedAt:string;scopeText:string};
type Props={locale:'es'|'en'|'pt';projectId:string;revision:number;canSave:boolean;text:string;reviewed:boolean;request:typeof fetch;onRestore:(text:string,onlyIfEmpty:boolean)=>void;onBusy:(busy:boolean)=>void};
function parseReference(raw:unknown):Reference|null{
 if(raw===null)return null;
 const r=raw as Reference;
 if(!r||typeof r.id!=='string'||!/^scope-[a-f0-9]{64}$/.test(r.id)||typeof r.savedAt!=='string'||!Number.isFinite(Date.parse(r.savedAt)))throw Error('invalid_reference');
 previewScanScope(r.scopeText);return r;
}
export function ScopeMemory({locale,projectId,revision,canSave,text,reviewed,request,onRestore,onBusy}:Props){
 const copy=SCOPE_MEMORY_COPY[locale];
 const [reference,setReference]=useState<Reference|null>(null);
 const [state,setState]=useState(projectId?'loading':'');
 const [loaded,setLoaded]=useState(false);
 const generation=useRef(0),locked=useRef(false);
 const callbacks=useRef({onRestore,onBusy});
 useLayoutEffect(()=>{callbacks.current={onRestore,onBusy};},[onRestore,onBusy]);
 const attempt=useRef<{fingerprint:string;body:string}|null>(null);
 const path=`/api/projects/${encodeURIComponent(projectId)}/scope-reference`;
 const load=useCallback(async()=>{
  if(locked.current)return;
  const seq=++generation.current;setState('loading');setLoaded(false);
  try{
   const response=await request(path,{cache:'no-store',redirect:'error'});
   if(seq!==generation.current)return;
   if(!response.ok){setState(response.status===401||response.status===403?'session':'loadError');return;}
   const payload=await response.json() as {reference:unknown};const next=parseReference(payload.reference);
   if(seq!==generation.current)return;
   setReference(next);setLoaded(true);setState('');attempt.current=null;
   if(next)callbacks.current.onRestore(next.scopeText,true);
  }catch{if(seq===generation.current)setState('loadError');}
 },[path,request]);
 const invalidate=useCallback(()=>{generation.current++;},[]);
 useEffect(()=>{let cancelled=false;Promise.resolve().then(()=>{if(!cancelled&&projectId)void load();});return()=>{cancelled=true;invalidate();};},[projectId,load,invalidate]);
 const same=reference&&text&&JSON.stringify(JSON.parse(text))===reference.scopeText;
 async function save(){
  if(locked.current||!loaded||!reviewed||!canSave||!text)return;
  locked.current=true;callbacks.current.onBusy(true);setState('saving');const seq=++generation.current;
  const input={contract:'afw.scope-reference.v1',confirmSave:true,expectedProjectRevision:revision,expectedReferenceId:reference?.id??null,scopeText:text};
  const fingerprint=JSON.stringify(input);
  if(attempt.current?.fingerprint!==fingerprint)attempt.current={fingerprint,body:JSON.stringify({...input,idempotencyKey:crypto.randomUUID()})};
  try{
   const response=await request(path,{method:'POST',headers:{'content-type':'application/json'},body:attempt.current.body,redirect:'error'});
   if(seq!==generation.current)return;
   if(!response.ok){setState(response.status===409?'conflict':response.status===401||response.status===403?'session':'error');if(response.status===409)setLoaded(false);return;}
   const next=parseReference((await response.json() as {reference:unknown}).reference);if(!next)throw Error('missing_receipt');
   if(seq!==generation.current)return;
   setReference(next);setState('saved');attempt.current=null;
  }catch{if(seq===generation.current)setState('error');}
  finally{if(seq===generation.current){locked.current=false;callbacks.current.onBusy(false);}}
 }
 return <div className="scope-memory">
  <p>{copy.intro}</p><p>{copy.review}</p>
  {!projectId||!canSave?<p>{copy.needsProject}</p>:null}
  {reference?<p>{copy.date}: <time dateTime={reference.savedAt}>{new Date(reference.savedAt).toLocaleString(locale)}</time></p>:null}
  <p role="status">{state && (state !== 'saved' || same) ? copy[state as keyof typeof copy] : null}</p>
  {projectId?<>
   {text?<button type="button" disabled={!loaded||!reviewed||!canSave||state==='saving'||Boolean(same)} onClick={()=>void save()}>{copy.save}</button>:null}
   {reference&&!same?<button type="button" disabled={state==='saving'} onClick={()=>{callbacks.current.onRestore(reference.scopeText,false);setState('');}}>{copy.load}</button>:null}
   <button type="button" disabled={state==='saving'||state==='loading'} onClick={()=>void load()}>{copy.refresh}</button>
  </>:null}
  <p>{copy.local}</p>
 </div>;
}
