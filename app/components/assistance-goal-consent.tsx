'use client';
import {useEffect,useRef,useState} from 'react';
import {createGoalConsentAttempt,readGoalConsentResponse} from '../../lib/assistance-goal-consent-client.mjs';
type State={granted:boolean;issuedAt:number|null;expiresAt:number|null;stateVersion:string};
const copy={
 es:{title:'Orientación con tus objetivos',intro:'Podés permitir que Codex cloud consulte solo el tipo de sitio y los objetivos guardados durante un máximo de diez minutos. Podés retirar el permiso. No permite editar ni publicar.',preview:'Este paso solo registra el permiso; todavía no inicia la consulta.',grant:'Permitir orientación temporal',withdraw:'Retirar permiso',refresh:'Consultar permiso',busy:'Comprobando el permiso…',error:'No pude confirmar el resultado. Tus datos siguen guardados. Consultá el permiso o reintentá la misma acción.',active:'La última consulta confirmó un permiso temporal.',inactive:'La última consulta no encontró un permiso activo.',retry:'Reintentar la misma acción',saved:'Para permitir la orientación, primero confirmemos la versión guardada.'},
 en:{title:'Guidance with your goals',intro:'You can let Codex cloud read only your saved site type and goals for up to ten minutes. You can withdraw permission. This does not allow editing or publishing.',preview:'This step only records permission; it does not start a consultation yet.',grant:'Allow temporary guidance',withdraw:'Withdraw permission',refresh:'Check permission',busy:'Checking permission…',error:'I could not confirm the result. Your data remains saved. Check permission or retry the same action.',active:'The last check confirmed temporary permission.',inactive:'The last check found no active permission.',retry:'Retry the same action',saved:'Before allowing guidance, let us confirm the saved version.'},
 pt:{title:'Orientação com seus objetivos',intro:'Você pode permitir que Codex cloud consulte apenas o tipo de site e os objetivos salvos por até dez minutos. Pode retirar a permissão. Isso não permite editar nem publicar.',preview:'Este passo apenas registra a permissão; ainda não inicia a consulta.',grant:'Permitir orientação temporária',withdraw:'Retirar permissão',refresh:'Consultar permissão',busy:'Conferindo a permissão…',error:'Não pude confirmar o resultado. Seus dados continuam salvos. Consulte a permissão ou repita a mesma ação.',active:'A última consulta confirmou uma permissão temporária.',inactive:'A última consulta não encontrou permissão ativa.',retry:'Repetir a mesma ação',saved:'Antes de permitir a orientação, vamos confirmar a versão salva.'}
};
export function AssistanceGoalConsent({projectId,sourceId,revision,canGrant,locale,request}:{projectId:string;sourceId:string;revision:number;canGrant:boolean;locale:'es'|'en'|'pt';request:typeof fetch}){
 const text=copy[locale],url=`/api/projects/${encodeURIComponent(projectId)}/assistance-consent`;
 const [state,setState]=useState<State|null>(null),[status,setStatus]=useState('loading'),[pending,setPending]=useState<'grant'|'revoke'|null>(null);
 const attempt=useRef(createGoalConsentAttempt()),epoch=useRef(0),lock=useRef(false),controller=useRef<AbortController|null>(null);
 useEffect(()=>{const guard=epoch,activeController=controller,run=++guard.current,abort=new AbortController();controller.current=abort;lock.current=true;
  void request(`${url}?source=${encodeURIComponent(sourceId)}`,{cache:'no-store',signal:abort.signal}).then(readGoalConsentResponse).then(value=>{if(epoch.current===run){setState(value);setStatus('ready');}}).catch(()=>{if(epoch.current===run)setStatus('error');}).finally(()=>{if(epoch.current===run)lock.current=false;});
  return()=>{guard.current++;abort.abort();activeController.current?.abort();};
 },[url,sourceId,request]);
 async function act(action:'grant'|'revoke'|null){
  if(lock.current||action==='grant'&&!canGrant||action&&!state)return;
  const run=++epoch.current,abort=new AbortController();controller.current=abort;lock.current=true;setStatus('loading');
  try{
   // Explicit withdrawal replaces an uncertain grant; the server fences its late arrival.
   if(action==='revoke'&&pending==='grant')attempt.current.confirm();
   const body=action?(pending===action?attempt.current.retry():attempt.current.prepare({action,sourceId,revision,stateVersion:state!.stateVersion})).body:undefined;
   if(action)setPending(action);
   const response=await request(action?url:`${url}?source=${encodeURIComponent(sourceId)}`,{method:action?'POST':'GET',cache:'no-store',signal:abort.signal,...(body?{headers:{'content-type':'application/json'},body}:{})});
   const value=await readGoalConsentResponse(response);
   if(epoch.current!==run)return;
   setState(value);setStatus('ready');if(action){attempt.current.confirm();setPending(null);}
  }catch(error){if(epoch.current===run){if((error as {status?:number}).status===409){attempt.current.confirm();setPending(null);setState(null);}setStatus('error');}}finally{if(epoch.current===run)lock.current=false;}
 }
 return <section aria-label={text.title}><h3>{text.title}</h3><p>{text.intro}</p><p>{text.preview}</p>
  <p role="status" aria-live="polite">{status==='loading'?text.busy:status==='error'?text.error:state?.granted?text.active:text.inactive}</p>
  {state?.granted&&state.expiresAt?<p><time dateTime={new Date(state.expiresAt).toISOString()}>{new Intl.DateTimeFormat(locale,{dateStyle:'medium',timeStyle:'short'}).format(state.expiresAt)}</time></p>:null}
  <button type="button" disabled={status==='loading'} onClick={()=>void act(null)}>{text.refresh}</button>
  {pending?<button type="button" disabled={status==='loading'||pending==='grant'&&!canGrant} onClick={()=>void act(pending)}>{text.retry}</button>:<button type="button" disabled={status==='loading'||!state||!canGrant||state.granted} onClick={()=>void act('grant')}>{text.grant}</button>}
  <button type="button" disabled={status==='loading'||!state} onClick={()=>void act('revoke')}>{text.withdraw}</button>
  {!canGrant?<p>{text.saved}</p>:null}
 </section>;
}
