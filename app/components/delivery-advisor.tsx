'use client';
import { useEffect, useRef, useState } from 'react';
import { deliveryAdvice, DELIVERY_ADVICE_COPY } from '../../lib/delivery-advisor.mjs';

export type DeliveryScope={projectId:string;capsuleId:string;manifestSha256:string};
export function DeliveryAdvisor({locale,scope}:{locale:'es'|'en'|'pt';scope?:DeliveryScope}) {
  const [capability, setCapability] = useState('');
  const [responsible,setResponsible]=useState('');
  const [revision,setRevision]=useState(0);
  const [phase,setPhase]=useState(scope?'loading':'informational');
  const [reload,setReload]=useState(0);
  const attempt=useRef({signature:'',key:''});
  const url=scope?`/api/projects/${encodeURIComponent(scope.projectId)}/deployment-capsules/${encodeURIComponent(scope.capsuleId)}/delivery-plan`:'';
  const labels={es:{who:'¿Quién realizará la entrega?',owner:'Yo, como responsable del sitio',maintainer:'Quien mantiene mi web',save:'Guardar plan de entrega',saved:'Plan guardado. El acceso sigue pendiente de comprobación; no publicamos archivos.',loading:'Estoy consultando el plan guardado.',failed:'No pude confirmar el guardado. Tu elección sigue aquí; podés reintentar.',unavailable:'No pude consultar el plan. Conservamos tu elección; consultá antes de guardar.',conflict:'Hay otro plan guardado o cambió la cápsula. Conservamos tu elección; cargá el plan vigente antes de continuar.',pending:'Esta elección aún no está guardada.',saving:'Estoy guardando el plan.',refresh:'Cargar plan guardado',boundary:'Guardar conserva el plan para volver después. La capacidad elegida es una declaración; los accesos y permisos aún necesitan comprobarse.'},en:{who:'Who will carry out the delivery?',owner:'Me, as website owner',maintainer:'The website maintainer',save:'Save delivery plan',saved:'Plan saved. Access still needs verification; no files were published.',loading:'I am checking the saved plan.',failed:'I could not confirm the save. Your choice is still here; retry when ready.',unavailable:'I could not retrieve the plan. Your choice is preserved; check before saving.',conflict:'Another plan was saved or the capsule changed. Your choice is preserved; load the current plan before continuing.',pending:'This choice has not been saved yet.',saving:'I am saving the plan.',refresh:'Load saved plan',boundary:'Saving keeps the plan for your return. The selected capability is a declaration; access and permission still need verification.'},pt:{who:'Quem fará a entrega?',owner:'Eu, como responsável pelo site',maintainer:'Quem mantém meu site',save:'Salvar plano de entrega',saved:'Plano salvo. O acesso ainda precisa ser verificado; nenhum arquivo foi publicado.',loading:'Estou consultando o plano salvo.',failed:'Não pude confirmar o salvamento. Sua escolha continua aqui; você pode tentar novamente.',unavailable:'Não pude consultar o plano. Sua escolha foi preservada; consulte antes de salvar.',conflict:'Outro plano foi salvo ou a cápsula mudou. Sua escolha foi preservada; carregue o plano atual antes de continuar.',pending:'Esta escolha ainda não foi salva.',saving:'Estou salvando o plano.',refresh:'Carregar plano salvo',boundary:'Salvar mantém o plano para sua volta. A capacidade escolhida é uma declaração; acesso e permissão ainda precisam ser verificados.'}}[locale];
  useEffect(()=>{
    if(!url)return;
    const controller=new AbortController();

    void fetch(url,{cache:'no-store',signal:controller.signal}).then(async response=>{
      if(!response.ok)throw new Error('unavailable');
      const body=await response.json();
      if(controller.signal.aborted)return;
      if(body.plan && body.plan.manifestSha256!==scope?.manifestSha256)throw new Error('changed');
      setCapability(body.plan?.capability||'');setResponsible(body.plan?.responsible||'');setRevision(body.plan?.revision||0);
      setPhase(body.plan?'saved':'ready');attempt.current={signature:'',key:''};
    }).catch(()=>{if(!controller.signal.aborted)setPhase('unavailable');});
    return ()=>controller.abort();
  },[url,scope?.manifestSha256,reload]);
  async function save() {
    if(!scope || !responsible || !capability)return;
    const signature=JSON.stringify([capability,responsible,revision,scope.manifestSha256]);
    if(attempt.current.signature!==signature)attempt.current={signature,key:crypto.randomUUID()};
    setPhase('saving');
    try {
      const response=await fetch(url,{method:'PUT',headers:{'content-type':'application/json'},body:JSON.stringify({capability,responsible,revision,manifestSha256:scope.manifestSha256,mutationKey:attempt.current.key})});
      if(response.status===409){setPhase('conflict');return;}
      if(!response.ok)throw new Error('save');
      const body=await response.json();setRevision(body.plan.revision);setPhase('saved');attempt.current={signature:'',key:''};
    }catch{setPhase('failed');}
  }
  const copy = DELIVERY_ADVICE_COPY[locale];
  const advice = deliveryAdvice(capability);
  const path = advice.method ? copy.paths[advice.method as keyof typeof copy.paths] : null;
  return <details className="delivery-advisor">
    <summary>{copy.open}</summary>
    {path ? <div aria-live="polite"><strong>{path.title}</strong><p>{path.next}</p><button type="button" className="secondary-action" disabled={phase==='saving'||phase==='loading'} onClick={()=>{setCapability('');setPhase(value=>['unavailable','conflict'].includes(value)?value:'ready');}}>{copy.back}</button>
      {scope?<><label>{labels.who}<select value={responsible} disabled={phase==='saving'||phase==='loading'} onChange={event=>{setResponsible(event.target.value);setPhase(value=>['unavailable','conflict'].includes(value)?value:'ready');}}><option value="">—</option><option value="owner">{labels.owner}</option><option value="maintainer">{labels.maintainer}</option></select></label><button type="button" className="secondary-action" disabled={!responsible||['loading','saving','unavailable','conflict','saved'].includes(phase)} onClick={()=>{void save();}}>{labels.save}</button></>:null}
    </div>
      : <div><p>{copy.reassurance}</p><label>{copy.question}<select value={capability} disabled={phase==='loading'||phase==='saving'} onChange={event=>{setCapability(event.target.value);setPhase(value=>['unavailable','conflict'].includes(value)?value:'ready');}}><option value="">—</option>{Object.entries(copy.options).map(([value,label])=><option key={value} value={value}>{label}</option>)}</select></label></div>}
    {scope?<><p role="status">{phase==='saved'?labels.saved:phase==='loading'?labels.loading:phase==='saving'?labels.saving:phase==='failed'?labels.failed:phase==='unavailable'?labels.unavailable:phase==='conflict'?labels.conflict:capability?labels.pending:''}</p>{['unavailable','conflict'].includes(phase)?<button type="button" className="secondary-action" onClick={()=>{setPhase('loading');setReload(value=>value+1);}}>{labels.refresh}</button>:null}</>:null}
    <p className="capsule-guidance-boundary">{scope?labels.boundary:copy.boundary}</p>
  </details>;
}
