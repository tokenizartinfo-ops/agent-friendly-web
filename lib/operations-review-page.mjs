const escape=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const labels={retain_block:'Mantener pendiente',close_obsolete:'Archivar este aviso anterior',close_expired_unconfirmed:'Cerrar intento sin confirmación'};
const history={retain_block:'Pendiente de investigación',close_obsolete:'Aviso anterior archivado',close_expired_unconfirmed:'Intento cerrado sin confirmación'};
const date=value=>new Date(value).toLocaleString('es-AR',{timeZone:'UTC',hour12:false})+' UTC';

export const REVIEW_SCRIPT=`
const target=reviewState.target,buttons=Array.from(document.querySelectorAll('[data-choice]'));
const status=document.getElementById('status'),group=document.getElementById('choices'),receipt=document.getElementById('receipt');
let pending=null,busy=false;
function say(text){status.textContent=text;status.focus();}
for(const button of buttons)button.addEventListener('click',async()=>{
 if(busy||button.disabled)return;
 const choice=target.choices[Number(button.dataset.choice)];if(!choice)return;
 if(pending&&(pending.decision!==choice.decision||pending.reason!==choice.reason))return;
 pending=pending||{runId:target.runId,requestId:crypto.randomUUID(),decision:choice.decision,reason:choice.reason,expectedRevision:target.snapshot.revision,expectedCondition:target.snapshot.condition,expectedSequence:target.snapshot.sequence};
 busy=true;for(const item of buttons)item.disabled=true;say('Estoy guardando tu decisión…');
 const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),10000);
 try{
  const response=await fetch('/notices/review',{method:'POST',credentials:'same-origin',redirect:'error',headers:{'content-type':'application/json'},body:JSON.stringify(pending),signal:controller.signal});
  if(response.status===409){say('El contexto cambió o ya existe otra decisión. Comprobemos el estado antes de seguir.');return;}
  if(response.status===400){say('No pude validar esta decisión. Comprobemos el contexto antes de volver a enviarla.');return;}
  if([401,403,404].includes(response.status)){say('La sesión o la ventana de revisión dejó de estar disponible. Comprobemos el acceso antes de continuar.');return;}
  if(!response.ok)throw Error('Unconfirmed');
  const data=await response.json(),value=data?.review;
  if(!value||Array.isArray(value)||Object.keys(value).length!==4||value.sequence!==pending.expectedSequence+1||value.decision!==pending.decision||value.reason!==pending.reason||!Number.isSafeInteger(value.reviewedAt)||value.reviewedAt<0||!Number.isFinite(new Date(value.reviewedAt).getTime()))throw Error('Unconfirmed');
  group.hidden=true;const previous=document.getElementById('previous');if(previous)previous.hidden=true;
  const meaning={retain_block:'El aviso sigue pendiente.',close_obsolete:'El aviso anterior quedó archivado.',close_expired_unconfirmed:'El intento quedó cerrado sin recibo confirmado.'};
  receipt.textContent='Registrada: '+new Date(value.reviewedAt).toLocaleString();say('La decisión quedó guardada. '+meaning[value.decision]+' Podés comprobar su constancia cuando quieras.');
 }catch{
  say('No pude confirmar el guardado. Puede haberse registrado: comprobá esta decisión o reintentá el mismo guardado.');
  button.disabled=false;button.textContent='Reintentar este guardado';
 }finally{clearTimeout(timer);busy=false;}
});
`;

/** Selectable HTML, one operational decision, no external fonts/assets or credentials. */
export function renderReviewPage(target,nonce){
 if(typeof nonce!=='string'||!/^[a-zA-Z0-9_-]{16,80}$/.test(nonce))throw Error('Invalid page nonce');
 const close=target?.choices.find(x=>x.decision!=='retain_block');
 const explanation=!target?'Esta consulta no ofrece un aviso para decidir. Esto no certifica que todo el sistema esté resuelto.':
  close?.reason==='producer_paused'?'La última observación indica que este servicio estaba pausado. Podemos archivar el aviso anterior y conservar su historia.':
  close?.reason==='obsolete_revision'?'La última observación tiene una versión posterior. Podemos archivar este aviso anterior y conservar su historia.':
  close?.reason==='expired_unconfirmed'?'Terminó la espera sin un recibo confirmado. Cerrar el intento no demuestra que la tarea se haya realizado.':
  target.lastReview&&target.lastReview.decision!=='retain_block'?'Esta decisión ya tiene una constancia guardada. Podemos revisarla sin volver a enviarla.':
  'Todavía no tengo evidencia suficiente para proponer un cierre. Podés mantener el aviso pendiente y comprobar el contexto antes de decidir.';
 const state=JSON.stringify({target}).replace(/</g,'\\u003c');
 const details=target?`<details><summary>Ver la referencia y las fechas</summary><dl><dt>Servicio</dt><dd>${target.resource==='afw_delegated_canary'?'Prueba de AFW':'Piloto de AFW'}</dd><dt>Observación consultada</dt><dd><time datetime="${new Date(target.observedAt).toISOString()}">${escape(date(target.observedAt))}</time></dd><dt>Versión del aviso / observada</dt><dd>${escape(target.originalRevision)} / ${escape(target.snapshot.revision)}</dd></dl></details>`:'';
 const previous=target?.lastReview?`<p id="previous" class="previous">${escape(history[target.lastReview.decision])} · ${escape(date(target.lastReview.reviewedAt))}</p>`:'';
 const heading=!target?'No hay una decisión disponible':target.choices.length?'¿Cómo seguimos con este aviso?':target.lastReview?.decision==='retain_block'?'Este aviso sigue pendiente':'La decisión quedó registrada';
 const buttons=target?.choices.map((choice,index)=>`<button type="button" data-choice="${index}" class="${choice.decision==='retain_block'?'secondary':''}">${escape(labels[choice.decision])}</button>`).join('')??'';
 return `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Revisamos el aviso · AFW</title>
<style nonce="${nonce}">
:root{color-scheme:light;--ink:#25211d;--paper:#fffaf0;--sepia:#f1ddba}*{box-sizing:border-box}body{margin:0;background:var(--paper);color:var(--ink);font-family:"Comic Sans MS","Comic Neue",cursive;font-size:17px;line-height:1.55}main{max-width:720px;margin:0 auto;padding:36px 22px 52px}header{display:flex;align-items:center;gap:16px;margin-bottom:32px;font-weight:bold}header span:last-child{font-size:14px;letter-spacing:.05em}.robot{width:40px;height:34px;border:3px solid var(--ink);border-radius:10px;position:relative;background:var(--sepia);flex:none}.robot:before{content:"";position:absolute;width:4px;height:11px;background:var(--ink);top:-13px;left:15px}.robot:after{content:"● ●";position:absolute;font-size:12px;letter-spacing:4px;left:6px;top:4px}section{border:2px solid var(--ink);border-radius:4px 20px 5px 18px;background:#fffdf8;padding:26px;box-shadow:5px 5px 0 var(--sepia)}.eyebrow{font-size:14px;margin-top:0}h1{font-size:30px;line-height:1.2;margin:12px 0 20px}p{margin:16px 0}.limit,.previous{font-size:14px}.previous{border-left:3px solid var(--sepia);padding-left:12px}#choices{display:grid;gap:12px;margin-top:24px}button{font:inherit;font-weight:bold;border:2px solid var(--ink);border-radius:8px;padding:13px 16px;background:var(--sepia);color:var(--ink);cursor:pointer;width:100%;white-space:normal;overflow-wrap:anywhere}.secondary{background:transparent}button:disabled{opacity:.6;cursor:wait}a{color:inherit;text-underline-offset:4px}a,button,summary{touch-action:manipulation}a:focus-visible,button:focus-visible,summary:focus-visible{outline:3px solid #825217;outline-offset:4px}#status{min-height:1.5em}#status:focus{outline:none}#receipt{font-size:14px}details{margin-top:22px;font-size:14px}summary{cursor:pointer;font-weight:bold}dl{display:grid;gap:6px}dt{font-weight:bold}dd{margin:0 0 10px;overflow-wrap:anywhere}nav{display:flex;flex-wrap:wrap;gap:18px;margin-top:26px;font-size:15px}[hidden]{display:none!important}@media(max-width:440px){main{padding:24px 16px}section{padding:20px}h1{font-size:25px}body{font-size:16px}}@media(prefers-reduced-motion:reduce){*{scroll-behavior:auto}}
</style></head><body><main><header><span class="robot" aria-hidden="true"></span><span>AGENT FRIENDLY WEB<br>Revisión del sistema</span></header><section aria-labelledby="question"><p class="eyebrow">Te acompaño en esta decisión</p><h1 id="question">${escape(heading)}</h1><p>${escape(explanation)}</p>${previous}<div id="choices">${buttons}</div><p id="status" role="status" aria-live="polite" tabindex="-1"></p><p id="receipt"></p><p class="limit">Esta decisión organiza el aviso y conserva su historia; no certifica una reparación ni confirma una entrega.</p>${details}</section><nav aria-label="Comprobación">${target?`<a href="/?run=${escape(target.runId)}">Comprobar esta decisión</a>`:''}<a href="/">Volver a los avisos</a></nav></main><script nonce="${nonce}">const reviewState=${state};${REVIEW_SCRIPT}</script></body></html>`;
}
