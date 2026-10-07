'use client';
import {useEffect,useRef,useState} from 'react';
import {createGoalReadConfirmationAttempt,readOwnerGuidanceResponse,readGoalReadConfirmationResponse} from '../../lib/assistance-goal-owner-client.mjs';
type Guidance={proposalId:string;message:{question:string;why:string};preparedAt:number;revision:number;expiresAt:number;expired:boolean;stale:boolean;confirmedAt:number|null};
const copy={
 es:{check:'Consultar orientación',loading:'Consultando…',empty:'Todavía no hay una orientación preparada.',error:'No pude consultar. Podés volver a intentarlo.',previous:'Esta orientación pertenece a una lectura anterior. Revisemos el estado actual antes de decidir.',proposal:'Es una propuesta para revisar; no cambia ni completa tus respuestas.',confirm:'Ya lo leí',confirming:'Guardando tu confirmación…',retry:'Reintentar la misma confirmación',uncertain:'No pude confirmar el guardado. Podés consultar el estado o reintentar la misma confirmación.',saved:'Tu confirmación de lectura quedó guardada. Todavía no aceptaste ni aplicaste cambios.'},
 en:{check:'Check guidance',loading:'Checking…',empty:'No guidance has been prepared yet.',error:'Could not check. You can try again.',previous:'This guidance belongs to an earlier reading. Check the current state before deciding.',proposal:'This is a proposal to review; it does not change or complete your answers.',confirm:'I have read it',confirming:'Saving your confirmation…',retry:'Retry the same confirmation',uncertain:'Could not confirm the save. Check the status or retry the same confirmation.',saved:'Your reading confirmation is saved. You have not accepted or applied changes.'},
 pt:{check:'Consultar orientação',loading:'Consultando…',empty:'Ainda não há uma orientação preparada.',error:'Não pude consultar. Você pode tentar novamente.',previous:'Esta orientação pertence a uma leitura anterior. Verifique o estado atual antes de decidir.',proposal:'É uma proposta para revisar; não altera nem completa suas respostas.',confirm:'Já li',confirming:'Salvando sua confirmação…',retry:'Repetir a mesma confirmação',uncertain:'Não pude confirmar o salvamento. Consulte o estado ou repita a mesma confirmação.',saved:'Sua confirmação de leitura foi salva. Você ainda não aceitou nem aplicou alterações.'}
};
export function AssistanceGoalProposal({projectId,sourceId,locale,request,currentSaved}:{projectId:string;sourceId:string;locale:'es'|'en'|'pt';request:typeof fetch;currentSaved:boolean}){
 const text=copy[locale],lock=useRef(false),active=useRef<AbortController|null>(null),mounted=useRef(true),attempt=useRef<ReturnType<typeof createGoalReadConfirmationAttempt>|null>(null);
 const [state,setState]=useState('idle'),[guidance,setGuidance]=useState<Guidance|null>(null),[clock,setClock]=useState(0),[hasPending,setHasPending]=useState(false);
 useEffect(()=>{mounted.current=true;return()=>{mounted.current=false;active.current?.abort();};},[]);
 useEffect(()=>{if(!guidance)return;const timer=setTimeout(()=>setClock(Date.now()),Math.max(0,Math.min(2147483647,guidance.expiresAt-Date.now()+1)));return()=>clearTimeout(timer);},[guidance]);
 const endpoint=`/api/projects/${encodeURIComponent(projectId)}/assistance-proposal`;
 const previous=Boolean(guidance&&(guidance.stale||guidance.expired||guidance.expiresAt<=clock||!currentSaved));
 async function refresh(){
  if(lock.current)return;lock.current=true;setState('loading');const controller=new AbortController();active.current=controller;const timer=setTimeout(()=>controller.abort(),3000);
  try{
   const response=await request(`${endpoint}?source=${encodeURIComponent(sourceId)}`,{signal:controller.signal,cache:'no-store'});
   const value=await readOwnerGuidanceResponse(response);
   if(!mounted.current||controller.signal.aborted)return;
   if(value.guidance?.confirmedAt!==null||value.guidance?.proposalId!==attempt.current?.body().proposalId){attempt.current=null;setHasPending(false);}
   setGuidance(value.guidance);setClock(Date.now());setState('ready');
  }catch{if(mounted.current)setState('error');}finally{clearTimeout(timer);lock.current=false;}
 }
 async function confirm(){
  if(lock.current||!guidance||guidance.confirmedAt!==null||previous||guidance.expiresAt<=Date.now())return;
  lock.current=true;setState('confirming');attempt.current??=createGoalReadConfirmationAttempt({sourceId,proposalId:guidance.proposalId,revision:guidance.revision});setHasPending(true);
  const controller=new AbortController();active.current=controller;const timer=setTimeout(()=>controller.abort(),3000);
  try{
   const response=await request(endpoint,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(attempt.current.body()),signal:controller.signal,cache:'no-store'});
   const result=await readGoalReadConfirmationResponse(response);
   if(!mounted.current||controller.signal.aborted)return;
   if(result.confirmedAt<guidance.preparedAt)throw Error('unavailable');
   setGuidance({...guidance,confirmedAt:result.confirmedAt});attempt.current=null;setHasPending(false);setState('ready');
  }catch{if(mounted.current)setState('uncertain');}finally{clearTimeout(timer);lock.current=false;}
 }
 const busy=state==='loading'||state==='confirming';
 return <section aria-live="polite">
  <button type="button" disabled={busy} onClick={()=>void refresh()}>{state==='loading'?text.loading:text.check}</button>
  {state==='error'?<p>{text.error}</p>:null}
  {state==='ready'&&!guidance?<p>{text.empty}</p>:null}
  {guidance?<>
   <p>{new Date(guidance.preparedAt).toLocaleString(locale)}</p>
   {previous?<p>{text.previous}</p>:null}
   <p><strong>{guidance.message.question}</strong></p><p>{guidance.message.why}</p><p>{text.proposal}</p>
   {guidance.confirmedAt!==null?<p>{text.saved} <time dateTime={new Date(guidance.confirmedAt).toISOString()}>{new Date(guidance.confirmedAt).toLocaleString(locale)}</time></p>:<button type="button" disabled={busy||previous} onClick={()=>void confirm()}>{state==='confirming'?text.confirming:hasPending?text.retry:text.confirm}</button>}
   {state==='uncertain'?<p>{text.uncertain}</p>:null}
  </>:null}
 </section>;
}
