import {previewScanScope} from './scan-scope-transfer.mjs';
import {QUESTION_FIELDS} from './intake-question-coach.mjs';

const priorities={crawl:['cms','hosting'],answers:['audience','languages'],documents:['audience','languages','cms'],trust:['organization']};
export const SCOPE_QUESTION_COPY={
 es:{title:'Sigamos las mejoras que revisaste',intro:'Ordeno las preguntas según este alcance. Podés dejar datos pendientes; si cambiás de prioridad, conservaré lo que estabas escribiendo en esta pestaña.',limit:'El alcance orienta la conversación: sus señales siguen pendientes de confirmar y no autoriza publicaciones.',actions:{crawl:'Rastreo y navegación',answers:'Respuestas claras',documents:'Documentos para agentes',trust:'Identidad y fuentes'},reasons:{
  crawl:{cms:'Elegiste trabajar el rastreo. Conocer el editor ayuda a preparar instrucciones para revisar la navegación sin pedirte accesos.',hosting:'Para revisar el rastreo, saber quién aloja el sitio ayuda a identificar a quién consultar sobre los archivos públicos. El nombre del proveedor alcanza.'},
  answers:{audience:'Elegiste mejorar las respuestas del sitio. Saber quién lo visita ayuda a identificar qué preguntas conviene responder primero.',languages:'Para ofrecer respuestas útiles, empecemos por los idiomas que realmente podés mantener actualizados.'},
  documents:{audience:'Elegiste preparar documentos para agentes. Saber a quién ayuda tu sitio permite explicar mejor qué ofrece y para quién.',languages:'Los documentos necesitan información mantenible. Elegí los idiomas que podés revisar; podemos dejar los demás para después.',cms:'Para entregar los documentos, conocer el editor ayuda a proponer instrucciones adecuadas. Todavía no estamos publicando nada.'},
  trust:{organization:'Elegiste aclarar identidad y fuentes. El nombre identifica a quién describe el sitio; escribirlo no verifica su identidad ni su titularidad.'}
 }},
 en:{title:'Let’s follow the improvements you reviewed',intro:'I’ll order the questions around this scope. You can leave details for later; if priorities change, I’ll keep what you were typing in this tab.',limit:'The scope guides this conversation: its signals still need confirmation, and it authorizes no publication.',actions:{crawl:'Crawling and navigation',answers:'Clear answers',documents:'Documents for agents',trust:'Identity and sources'},reasons:{
  crawl:{cms:'You chose to work on crawling. Knowing the editor helps prepare instructions for reviewing navigation without asking for access.',hosting:'For crawling work, knowing who hosts the site helps identify whom to ask about public files. The provider name is enough.'},
  answers:{audience:'You chose to improve the website’s answers. Knowing who visits helps identify which questions to address first.',languages:'For useful answers, let’s start with the languages you can actually keep up to date.'},
  documents:{audience:'You chose to prepare documents for agents. Knowing whom the website helps makes it easier to describe what it offers and for whom.',languages:'Documents need maintainable information. Choose the languages you can review; we can leave others for later.',cms:'Knowing the editor helps suggest suitable instructions for delivering documents. We are not publishing anything yet.'},
  trust:{organization:'You chose to clarify identity and sources. The name identifies whom the site describes; entering it does not verify identity or ownership.'}
 }},
 pt:{title:'Vamos seguir as melhorias que você revisou',intro:'Vou ordenar as perguntas conforme este escopo. Você pode deixar dados pendentes; se mudar de prioridade, preservarei o que estava escrevendo nesta aba.',limit:'O escopo orienta a conversa: os sinais ainda precisam de confirmação e não autoriza publicações.',actions:{crawl:'Rastreamento e navegação',answers:'Respostas claras',documents:'Documentos para agentes',trust:'Identidade e fontes'},reasons:{
  crawl:{cms:'Você escolheu trabalhar o rastreamento. Conhecer o editor ajuda a preparar instruções para revisar a navegação sem pedir acessos.',hosting:'Para revisar o rastreamento, saber quem hospeda o site ajuda a identificar quem consultar sobre os arquivos públicos. O nome do provedor basta.'},
  answers:{audience:'Você escolheu melhorar as respostas do site. Saber quem o visita ajuda a identificar quais perguntas responder primeiro.',languages:'Para oferecer respostas úteis, vamos começar pelos idiomas que você consegue manter atualizados.'},
  documents:{audience:'Você escolheu preparar documentos para agentes. Saber a quem o site ajuda permite explicar melhor o que oferece e para quem.',languages:'Os documentos precisam de informação que possa ser mantida. Escolha os idiomas que consegue revisar; podemos deixar os demais para depois.',cms:'Conhecer o editor ajuda a propor instruções adequadas para entregar os documentos. Ainda não estamos publicando nada.'},
  trust:{organization:'Você escolheu esclarecer identidade e fontes. O nome identifica quem o site descreve; preenchê-lo não verifica identidade nem titularidade.'}
 }}
};

/** Read-only guidance from a fresh UI review; never infer facts or permission. */
export function scopeQuestionGuide(draft,context,locale='es'){
 if(!context||context.reviewed!==true||!draft.website||context.website!==draft.website)return null;
 try{
  const preview=previewScanScope(context.scopeText,draft.website);
  if(preview.websiteMatches!==true)return null;
  const copy=SCOPE_QUESTION_COPY[locale]||SCOPE_QUESTION_COPY.es;
  const ids=preview.brief.actions.map(action=>action.id);
  const order=[...new Set(['organization','website',...ids.flatMap(id=>priorities[id]),...QUESTION_FIELDS])];
  /** @type {Record<string,string>} */
  const reasons={};
  for(const id of ids)for(const [field,reason] of Object.entries(copy.reasons[id]))if(!reasons[field])reasons[field]=reason;
  return {order,reasons,actions:ids.map(id=>copy.actions[id]),publicationAuthorized:false};
 }catch{return null;}
}
