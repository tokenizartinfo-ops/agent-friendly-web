'use client';

import {buildScanActionPlan,ACTION_PLAN_COPY} from '../../lib/scan-action-plan.mjs';

type Locale='es'|'en'|'pt';
type Observation={target:string;checkedAt:string;evidence?:Record<string,boolean>};

const guidance={
 es:{title:'Qué vimos y cómo seguir',intro:'Te acompaño a leer esta observación guardada. El puntaje describe señales públicas en esa fecha; no define hasta dónde debe avanzar tu sitio.',next:'Un próximo paso para revisar',self:'Podés empezar por',assisted:'Con acompañamiento',all:'Los fundamentos revisados muestran señales detectadas. Decidamos el próximo objetivo según tu negocio, sin añadir herramientas por obligación.',details:'Ver señales que sustentan esta orientación',limit:'No detectado no prueba que el recurso no exista en otras páginas. Esta orientación no modifica archivos, puntaje ni permisos de publicación.',unknown:'La observación anterior no conserva señales suficientes para explicar el puntaje. Podés auditar y guardar otra lectura si querés actualizar la evidencia.'},
 en:{title:'What we saw and how to continue',intro:'I can help you read this saved observation. The score describes public signals on that date; it does not dictate how far your site must go.',next:'One next step to review',self:'You can start by',assisted:'With guidance',all:'The foundational checks show detected signals. Let us choose the next goal for your business without adding tools by default.',details:'See the signals behind this guidance',limit:'Not detected does not prove the resource is absent elsewhere. This guidance changes no files, score or publication permissions.',unknown:'This older observation lacks enough saved signals to explain the score. You can audit and save a new reading if you want updated evidence.'},
 pt:{title:'O que vimos e como seguir',intro:'Posso ajudar você a ler esta observação salva. A pontuação descreve sinais públicos naquela data; não determina até onde seu site deve avançar.',next:'Um próximo passo para revisar',self:'Você pode começar por',assisted:'Com acompanhamento',all:'As verificações fundamentais mostram sinais detectados. Vamos escolher o próximo objetivo para o seu negócio sem adicionar ferramentas por obrigação.',details:'Ver sinais que fundamentam esta orientação',limit:'Não detectado não prova ausência em outras páginas. Esta orientação não altera arquivos, pontuação ou permissões de publicação.',unknown:'Esta observação antiga não conserva sinais suficientes para explicar a pontuação. Você pode auditar e salvar uma nova leitura se quiser atualizar a evidência.'},
};

export function SavedObservationEvidence({observation,locale}: {observation:Observation;locale:Locale}){
 const copy=guidance[locale];
 if(!observation.evidence||!Object.keys(observation.evidence).length)return <section className="saved-observation-evidence"><h3>{copy.title}</h3><p>{copy.unknown}</p></section>;
 let plan:ReturnType<typeof buildScanActionPlan>;
 try{plan=buildScanActionPlan({target:observation.target,checkedAt:observation.checkedAt,evidence:observation.evidence},locale);}catch{return null;}
 const next=plan.actions.find(action=>action.state!=='detected');
 const labels=ACTION_PLAN_COPY[locale];
 return <section className="saved-observation-evidence" aria-label={copy.title}>
   <h3>{copy.title}</h3><p>{copy.intro}</p>
   {next?<div className="saved-observation-next"><strong>{copy.next}: {next.title}</strong><p>{copy.self}: {next.self}</p><p>{copy.assisted}: {next.assisted}</p></div>:<p>{copy.all}</p>}
   <details><summary>{copy.details}</summary><ul>{plan.actions.flatMap(action=>action.signals).map(signal=><li key={signal.id}><strong>{signal.label}</strong>: {labels.states[signal.state as keyof typeof labels.states]}</li>)}</ul></details>
   <small>{copy.limit}</small>
 </section>;
}
