'use client';

import {buildScanActionPlan,ACTION_PLAN_COPY} from '../../lib/scan-action-plan.mjs';
import {observationNextStep} from '../../lib/observation-next-step.mjs';

type Locale='es'|'en'|'pt';
type Observation={target:string;checkedAt:string;evidence?:Record<string,boolean>};

const guidance={
 es:{title:'Qué vimos y cómo seguir',intro:'Te acompaño a leer esta observación guardada. El puntaje describe señales públicas en esa fecha; no define hasta dónde debe avanzar tu sitio.',next:'Un próximo paso para revisar',self:'Podés empezar por',assisted:'Con acompañamiento',all:'Los fundamentos revisados muestran señales detectadas. Decidamos el próximo objetivo según tu negocio, sin añadir herramientas por obligación.',details:'Ver señales que sustentan esta orientación',limit:'No detectado no prueba que el recurso no exista en otras páginas. Esta orientación no modifica archivos, puntaje ni permisos de publicación.',unknown:'La observación anterior no conserva señales suficientes para explicar el puntaje. Podés auditar y guardar otra lectura si querés actualizar la evidencia.'},
 en:{title:'What we saw and how to continue',intro:'I can help you read this saved observation. The score describes public signals on that date; it does not dictate how far your site must go.',next:'One next step to review',self:'You can start by',assisted:'With guidance',all:'The foundational checks show detected signals. Let us choose the next goal for your business without adding tools by default.',details:'See the signals behind this guidance',limit:'Not detected does not prove the resource is absent elsewhere. This guidance changes no files, score or publication permissions.',unknown:'This older observation lacks enough saved signals to explain the score. You can audit and save a new reading if you want updated evidence.'},
 pt:{title:'O que vimos e como seguir',intro:'Posso ajudar você a ler esta observação salva. A pontuação descreve sinais públicos naquela data; não determina até onde seu site deve avançar.',next:'Um próximo passo para revisar',self:'Você pode começar por',assisted:'Com acompanhamento',all:'As verificações fundamentais mostram sinais detectados. Vamos escolher o próximo objetivo para o seu negócio sem adicionar ferramentas por obrigação.',details:'Ver sinais que fundamentam esta orientação',limit:'Não detectado não prova ausência em outras páginas. Esta orientação não altera arquivos, pontuação ou permissões de publicação.',unknown:'Esta observação antiga não conserva sinais suficientes para explicar a pontuação. Você pode auditar e salvar uma nova leitura se quiser atualizar a evidência.'},
};

const contextCopy:Record<Locale,Record<string,[string,string,string]>>={
 es:{save_draft:['Primero guardemos tus cambios.','Así la orientación usa el contexto que revisaste, sin perder datos del borrador.','Ir a guardar'],clarify_control:['Aclaremos quién puede cambiar el sitio.','Si todavía no lo sabés, podés dejarlo pendiente; no prepararemos una entrega como si hubiera acceso.','Revisar control'],coordinate_provider:['Coordinemos con tu proveedor.','La evidencia ayuda a pedir una intervención acotada; todavía no autoriza cambios en el sitio.','Revisar control'],request_access:['Necesitamos definir una vía de implementación.','Podemos ordenar evidencia externa mientras conseguís acceso. Eso no sustituye publicar en tu sitio.','Revisar acceso'],review_action:['Revisemos la propuesta y sus archivos.','La cápsula muestra contenido, destinos y hashes para decisión humana. Prepararla no significa publicar.','Ir a cápsula'],choose_goal:['Elijamos el objetivo que tiene sentido para vos.','Las señales básicas observadas no obligan a sumar MCP, pagos ni otras capacidades avanzadas.','Revisar objetivos']},
 en:{save_draft:['Let us save your changes first.','Then the guidance uses the context you reviewed without losing draft details.','Go to save'],clarify_control:['Let us clarify who can change the site.','You can leave this open if unsure; we will not prepare delivery as if access existed.','Review control'],coordinate_provider:['Let us coordinate with your provider.','The evidence supports a scoped request; it does not authorize changes to the site.','Review control'],request_access:['We need an implementation path.','We can organize external evidence while you obtain access. That does not replace publishing on your site.','Review access'],review_action:['Let us review the proposal and its files.','The capsule shows content, destinations and hashes for human decision. Preparing it does not publish.','Go to capsule'],choose_goal:['Let us choose the goal that fits you.','Observed basics do not require MCP, payments or other advanced capabilities.','Review goals']},
 pt:{save_draft:['Vamos salvar suas alterações primeiro.','Assim a orientação usa o contexto revisado sem perder dados do rascunho.','Ir para salvar'],clarify_control:['Vamos esclarecer quem pode alterar o site.','Se não souber, pode deixar pendente; não prepararemos entrega como se houvesse acesso.','Revisar controle'],coordinate_provider:['Vamos coordenar com seu fornecedor.','A evidência ajuda a pedir uma intervenção delimitada; ainda não autoriza mudanças no site.','Revisar controle'],request_access:['Precisamos definir uma via de implementação.','Podemos organizar evidência externa enquanto você obtém acesso. Isso não substitui publicar no seu site.','Revisar acesso'],review_action:['Vamos revisar a proposta e seus arquivos.','A cápsula mostra conteúdo, destinos e hashes para decisão humana. Prepará-la não significa publicar.','Ir para cápsula'],choose_goal:['Vamos escolher um objetivo adequado.','Os sinais básicos observados não exigem MCP, pagamentos ou outras capacidades avançadas.','Revisar objetivos']},
};

export function SavedObservationEvidence({observation,locale,control,unsaved}: {observation:Observation;locale:Locale;control:string;unsaved:boolean}){
 const copy=guidance[locale];
 if(!observation.evidence||!Object.keys(observation.evidence).length)return <section className="saved-observation-evidence"><h3>{copy.title}</h3><p>{copy.unknown}</p></section>;
 let plan:ReturnType<typeof buildScanActionPlan>;
 try{plan=buildScanActionPlan({target:observation.target,checkedAt:observation.checkedAt,evidence:observation.evidence},locale);}catch{return null;}
 const next=plan.actions.find(action=>action.state!=='detected');
 const step=observationNextStep({actions:plan.actions,control,unsaved});
 const stepCopy=contextCopy[locale][step.kind];
 const labels=ACTION_PLAN_COPY[locale];
 return <section className="saved-observation-evidence" aria-label={copy.title}>
   <h3>{copy.title}</h3><p>{copy.intro}</p>
   <div className="saved-observation-next"><strong>{stepCopy[0]}</strong><p>{stepCopy[1]}</p><a href={`#${step.target}`}>{stepCopy[2]}</a></div>
   {step.kind==='review_action'&&next?<div><strong>{copy.next}: {next.title}</strong><p>{copy.self}: {next.self}</p><p>{copy.assisted}: {next.assisted}</p></div>:step.kind==='choose_goal'?<p>{copy.all}</p>:null}
   <details><summary>{copy.details}</summary><ul>{plan.actions.flatMap(action=>action.signals).map(signal=><li key={signal.id}><strong>{signal.label}</strong>: {labels.states[signal.state as keyof typeof labels.states]}</li>)}</ul></details>
   <small>{copy.limit}</small>
 </section>;
}
