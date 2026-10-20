import {readRecord,readList,ref,text,clock as isClock} from './agent-consumption-input.mjs';
import {evaluatePreparationConsentChoice} from './delegated-preparation-consent-policy.mjs';

const READ='afw:project:read',DRAFTS='afw:capsule:prepare';
const VIEW_KEYS=['locale','projectName','clientName','siteHost','handle','styleNonce','policy','clock'];
const POLICY_KEYS=['enabled','requestedScopes','transactionStartedAt','transactionExpiresAt','trialStartedAt','trialExpiresAt'];
const SUMMARY_KEYS=['locale','projectName','clientName','scopes','status','expiresAt'];
const BACK='https://agentfriendlyweb.dev/expediente';
const escape=value=>value.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const opaque=(value,max)=>typeof value==='string'&&value.length>=16&&value.length<=max&&!/[^A-Za-z0-9_-]/.test(value);
const localeOf=value=>['es','en','pt'].includes(value)?value:'es';
const COPY={
 es:{
  title:'Conectar tu asistente',guide:'Te guío paso a paso. Vos elegís qué permitir.',
  intro:'podrá leer el resumen de este expediente.',
  drafts:'Si elegís borradores, también podrá preparar y guardar archivos propuestos a partir de los datos que ya guardaste.',
  readBody:'Con solo lectura no podrá preparar ni guardar borradores.',
  limit:'Tu sitio no cambia. Este permiso no permite aprobar, instalar ni publicar archivos, ni realizar cargos.',
  duration:'El permiso termina en la fecha indicada, como máximo en diez minutos. No se renueva automáticamente.',
  withdrawal:'Podés retirarlo antes desde AFW. Desconectar bloquea la próxima operación del asistente; conserva los borradores y su historial.',
  project:'Expediente',client:'Asistente',site:'Sitio',expires:'Termina',choice:'Elegí el permiso',
  read:'Permitir solo lectura',prepare:'Permitir lectura y borradores',cancel:'Cancelar',
  meaning:'Un borrador es una propuesta para revisar. Todavía no está instalada en tu sitio.',
  submit:'Tu decisión se envía cuando elegís una opción.',skip:'Ir al permiso',back:'Volver a mi expediente',
  expired:'Esta ventana terminó',expiredBody:'No necesitás repetir códigos. El expediente sigue guardado; el permiso no se renueva automáticamente.',
  paused:'Esta conexión no está disponible',pausedBody:'Podés volver a tu expediente para revisar el siguiente paso. Esta pantalla no concede ni renueva permisos.',
  summary:'Permiso del asistente',scope:'Alcance',readScope:'Resumen',draftScope:'Resumen y preparación de borradores',state:'Estado',
  statuses:{active:'Activo',revoked:'Retirado',expired:'Vencido'},
 },
 en:{
  title:'Connect your assistant',guide:'I will guide you step by step. You choose what to allow.',
  intro:'will be able to read this dossier summary.',
  drafts:'If you allow drafts, it can also prepare and save proposed files using the information you have already saved.',
  readBody:'Read-only access cannot prepare or save drafts.',
  limit:'Your website stays unchanged. This permission does not allow approving, installing or publishing files, or charging you.',
  duration:'The permission ends at the time shown, within ten minutes at most. It does not renew automatically.',
  withdrawal:'You can withdraw it earlier in AFW. Disconnecting blocks the assistant’s next operation; saved drafts and their history remain.',
  project:'Dossier',client:'Assistant',site:'Website',expires:'Ends',choice:'Choose the permission',
  read:'Allow read-only access',prepare:'Allow reading and drafts',cancel:'Cancel',
  meaning:'A draft is a proposal for you to review. It is not installed on your website yet.',
  submit:'Your decision is sent when you choose an option.',skip:'Skip to permission',back:'Back to my dossier',
  expired:'This window has ended',expiredBody:'You do not need another code. Your dossier is still saved; the permission does not renew automatically.',
  paused:'This connection is unavailable',pausedBody:'You can return to your dossier to review the next step. This page does not grant or renew permission.',
  summary:'Assistant permission',scope:'Scope',readScope:'Summary',draftScope:'Summary and draft preparation',state:'Status',
  statuses:{active:'Active',revoked:'Withdrawn',expired:'Expired'},
 },
 pt:{
  title:'Conectar seu assistente',guide:'Vou orientar você passo a passo. Você escolhe o que permitir.',
  intro:'poderá ler o resumo deste expediente.',
  drafts:'Se permitir rascunhos, ele também poderá preparar e salvar arquivos propostos com os dados que você já salvou.',
  readBody:'O acesso somente de leitura não permite preparar nem salvar rascunhos.',
  limit:'Seu site não muda. Esta permissão não permite aprovar, instalar ou publicar arquivos, nem fazer cobranças.',
  duration:'A permissão termina no horário indicado, em no máximo dez minutos. Ela não se renova automaticamente.',
  withdrawal:'Você pode retirá-la antes no AFW. Desconectar bloqueia a próxima operação do assistente; os rascunhos e seu histórico são preservados.',
  project:'Expediente',client:'Assistente',site:'Site',expires:'Termina',choice:'Escolha a permissão',
  read:'Permitir somente leitura',prepare:'Permitir leitura e rascunhos',cancel:'Cancelar',
  meaning:'Um rascunho é uma proposta para revisar. Ainda não está instalado no seu site.',
  submit:'Sua decisão é enviada quando você escolhe uma opção.',skip:'Ir para a permissão',back:'Voltar ao meu expediente',
  expired:'Esta janela terminou',expiredBody:'Você não precisa de outro código. Seu expediente continua salvo; a permissão não se renova automaticamente.',
  paused:'Esta conexão não está disponível',pausedBody:'Você pode voltar ao expediente para revisar o próximo passo. Esta página não concede nem renova permissões.',
  summary:'Permissão do assistente',scope:'Escopo',readScope:'Resumo',draftScope:'Resumo e preparação de rascunhos',state:'Estado',
  statuses:{active:'Ativa',revoked:'Retirada',expired:'Vencida'},
 },
};

// Existing AFW palette/comic system; no external asset, script or animation.
export const PREPARATION_CONSENT_STYLE=`
*{box-sizing:border-box}body{margin:0;background:#f3eadb;color:#181512;font-family:"Comic Sans MS","Comic Neue",cursive;line-height:1.6;font-size:17px}
main{width:min(100% - 32px,720px);margin:36px auto;padding:28px;background:#fffaf1;border:2px solid #181512;border-radius:14px;box-shadow:5px 5px 0 #ddc99f;overflow-wrap:anywhere}
.brand{font-weight:bold;color:#3c514b;border-bottom:2px solid #ddc99f;padding-bottom:12px}.motif{display:inline-flex;align-items:center;vertical-align:middle;margin-right:10px}
.dot{width:11px;height:14px;border:2px solid #181512;border-radius:3px}.string{width:24px;border-top:2px dotted #3c514b}
h1{font-size:clamp(1.65rem,5vw,2.2rem);line-height:1.2}h2{font-size:1.25rem;margin-top:26px}p{margin:16px 0}
.guide{border-inline-start:4px solid #3c514b;padding:8px 14px;background:#f3eadb}dl{margin:20px 0}dt{font-weight:bold}dd{margin:0 0 12px;overflow-wrap:anywhere}
form{margin:20px 0}.choices{display:grid;gap:12px}button{font:inherit;min-height:48px;width:100%;padding:10px 16px;border:2px solid #181512;border-radius:8px;background:#fffaf1;color:#181512;cursor:pointer;overflow-wrap:anywhere}
button[value="read"]{background:#3c514b;color:#fffaf1}button[value="cancel"]{margin-top:6px;background:#f3eadb}a,button{touch-action:manipulation}
a{color:#3c514b;text-underline-offset:4px}.back,.skip{display:inline-block;min-height:48px;padding:10px 0}
a:focus-visible,button:focus-visible{outline:3px solid #ad4f35;outline-offset:4px}
.skip{position:absolute;top:8px;left:16px;transform:translateY(-200%);background:#fffaf1;padding:10px}.skip:focus{transform:none}
@media(max-width:480px){main{margin:20px auto;padding:20px;box-shadow:3px 3px 0 #ddc99f}}
@media(prefers-reduced-motion:reduce){*,*::before,*::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}}
`;

function time(value,locale){
 if(!isClock(value))return null;
 const date=new Date(value),iso=date.toISOString();
 if(!/^\d{4}-/.test(iso))return null;
 const label=new Intl.DateTimeFormat(locale,{dateStyle:'medium',timeStyle:'short',timeZone:'UTC'}).format(date);
 return '<time datetime="'+iso+'">'+escape(label)+' UTC</time>';
}
function siteHost(value){
 if(!text(value,253)||!/^[a-z0-9.-]+$/.test(value))return false;
 const labels=value.split('.');
 return labels.length>=2&&/[a-z]/.test(labels.at(-1))&&labels.every(label=>/^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/.test(label));
}
function document(locale,code,body,nonce,presentation={}){
 const c=COPY[locale],title=presentation.title??(code==='view_ready'?c.title:code==='expired'?c.expired:c.paused),skip=presentation.skip??c.skip;
 const validNonce=opaque(nonce,128);
 const headers=Object.freeze({
  'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store','Referrer-Policy':'no-referrer','X-Content-Type-Options':'nosniff',
  'Content-Security-Policy':"default-src 'none'; style-src "+(validNonce?"'nonce-"+nonce+"'":"'none'")+"; form-action 'self'; frame-ancestors 'none'; base-uri 'none'",
 });
 const brand='<div class="brand"><span class="motif" aria-hidden="true"><span class="dot"></span><span class="string"></span><span class="dot"></span></span>AFW · Agent Friendly Web</div>';
 const html='<!doctype html><html lang="'+locale+'"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>'+escape(title)+' · AFW</title>'+
  (validNonce?'<style nonce="'+nonce+'">'+PREPARATION_CONSENT_STYLE+'</style>':'')+'</head><body><a class="skip" data-focus="skip" href="#consent-main">'+escape(skip)+'</a>'+
  '<main id="consent-main" tabindex="-1">'+brand+body+'<a class="back" data-focus="back" href="'+BACK+'">'+c.back+'</a></main></body></html>';
 return Object.freeze({contract:'agentfriendly.preparation-consent-view.v1',code,status:code==='view_ready'?200:404,locale,html,headers,consentRecorded:false,grantIssued:false});
}
function closed(locale,code,nonce){
 const c=COPY[locale];
 return document(locale,code,'<h1>'+(code==='expired'?c.expired:c.paused)+'</h1><p>'+(code==='expired'?c.expiredBody:c.pausedBody)+'</p>',nonce);
}

/**
 * Detached presentation ONLY. Future authenticated host supplies bounded labels,
 * original transaction/trial, SDK handle and fresh CSP nonce AFTER primary
 * owner/claim/schema/profile admission, and validates all again on POST.
 * This function verifies none of that provenance and records/issues nothing.
 */
export function renderPreparationConsentView(input){
 const p=readRecord(input,VIEW_KEYS),locale=localeOf(p?.locale);
 if(!p||!text(p.projectName,200)||!text(p.clientName,200)||!siteHost(p.siteHost)||!opaque(p.handle,256)||!opaque(p.styleNonce,128))
  return closed(locale,'unavailable',p?.styleNonce);
 const policy=readRecord(p.policy,POLICY_KEYS),clock=readRecord(p.clock,['now']);
 if(!policy||!clock)return closed(locale,'unavailable',p.styleNonce);
 policy.requestedScopes=readList(policy.requestedScopes,2);
 const selection=evaluatePreparationConsentChoice({decision:'read'},policy,clock);
 if(selection.code!=='choice_valid')return closed(locale,selection.code==='expired'?'expired':'unavailable',p.styleNonce);
 const expiry=time(selection.expiresAt,locale);
 if(!expiry)return closed(locale,'unavailable',p.styleNonce);
 const drafts=evaluatePreparationConsentChoice({decision:'drafts'},policy,clock).code==='choice_valid',c=COPY[locale];
 const body='<h1>'+c.title+'</h1><p class="guide">'+c.guide+'</p><p><strong>'+escape(p.clientName)+'</strong> '+c.intro+'</p>'+
  '<dl><dt>'+c.project+'</dt><dd>'+escape(p.projectName)+'</dd><dt>'+c.client+'</dt><dd>'+escape(p.clientName)+'</dd><dt>'+c.site+'</dt><dd>'+escape(p.siteHost)+'</dd>'+
  '<dt>'+c.expires+'</dt><dd>'+expiry+'</dd></dl><p>'+(drafts?c.drafts:c.readBody)+'</p>'+(drafts?'<p>'+c.meaning+'</p>':'')+
  '<p>'+c.limit+'</p><p>'+c.duration+'</p><p>'+c.withdrawal+'</p><h2 id="permission-choice">'+c.choice+'</h2><p>'+c.submit+'</p>'+
  '<form method="post" action="/authorize" aria-labelledby="permission-choice"><input type="hidden" name="handle" value="'+escape(p.handle)+'"><div class="choices">'+
  '<button type="submit" name="decision" value="read">'+c.read+'</button>'+
  (drafts?'<button type="submit" name="decision" value="drafts">'+c.prepare+'</button>':'')+
  '<button type="submit" name="decision" value="cancel" formnovalidate>'+c.cancel+'</button></div></form>';
 return document(locale,'view_ready',body,p.styleNonce);
}

/** Actual primary grant data must be supplied by the future connections host.
 * No new revoke handle/form or scope inference is created by this component.
 */
export function renderPreparationConnectionSummary(input){
 const p=readRecord(input,SUMMARY_KEYS);
 if(!p||!text(p.projectName,200)||!text(p.clientName,200)||!['active','revoked','expired'].includes(p.status))return null;
 const scopes=readList(p.scopes,2);
 if(!scopes||!scopes.includes(READ)||new Set(scopes).size!==scopes.length||scopes.some(s=>s!==READ&&s!==DRAFTS))return null;
 const locale=localeOf(p.locale),c=COPY[locale],expiry=time(p.expiresAt,locale);
 if(!expiry)return null;
 const scopeLabel=scopes.includes(DRAFTS)?c.draftScope:c.readScope;
 const html='<section><h2>'+c.summary+'</h2><dl><dt>'+c.project+'</dt><dd>'+escape(p.projectName)+'</dd><dt>'+c.client+'</dt><dd>'+escape(p.clientName)+'</dd>'+
  '<dt>'+c.scope+'</dt><dd>'+scopeLabel+'</dd><dt>'+c.state+'</dt><dd>'+c.statuses[p.status]+'</dd><dt>'+c.expires+'</dt><dd>'+expiry+'</dd></dl><p>'+c.withdrawal+'</p></section>';
 return Object.freeze({contract:'agentfriendly.preparation-connection-summary.v1',locale,scopeLabel,html,consentRecorded:false,grantIssued:false});
}

const CONNECTION_COPY={
 es:{title:'Tus conexiones',skip:'Ir a tus conexiones',guide:'Te acompaño a revisar qué permitiste. Podés retirarlo sin borrar los archivos propuestos ni su historial.',
  saved:'Este es el estado del permiso guardado. No confirma que el asistente esté conectado o haya terminado su trabajo; cada operación vuelve a comprobar el contexto.',
  empty:'No hay permisos de este expediente para mostrar.',project:'Expediente de AFW',revoke:'Retirar este permiso',
  until:'Este panel temporal permite revisar y retirar hasta ',limit:'. No amplía ni renueva el permiso del asistente.'},
 en:{title:'Your connections',skip:'Skip to your connections',guide:'I will help you review what you allowed. You can withdraw it without deleting proposed files or their history.',
  saved:'This is the saved permission state. It does not confirm that the assistant is connected or has finished its work; each operation checks the context again.',
  empty:'There are no permissions for this dossier to show.',project:'AFW dossier',revoke:'Withdraw this permission',
  until:'This temporary panel allows review and withdrawal until ',limit:'. It does not extend or renew the assistant permission.'},
 pt:{title:'Suas conexões',skip:'Ir para suas conexões',guide:'Vou ajudar você a revisar o que permitiu. Você pode retirar a permissão sem apagar arquivos propostos ou seu histórico.',
  saved:'Este é o estado da permissão salva. Ele não confirma que o assistente esteja conectado ou tenha terminado; cada operação verifica o contexto novamente.',
  empty:'Não há permissões deste expediente para mostrar.',project:'Expediente AFW',revoke:'Retirar esta permissão',
  until:'Este painel temporário permite revisar e retirar até ',limit:'. Ele não amplia nem renova a permissão do assistente.'},
};
/** Presentation only: the human host supplies verified primary metadata/CSRF.
 * No token, grant creation, renewal, publication or physical cancellation claim. */
export function renderPreparationConnectionsView(input){
 const p=readRecord(input,['code','locale','clientName','entries','handle','styleNonce','managementExpiresAt']),locale=localeOf(p?.locale),c=CONNECTION_COPY[locale];
 const entries=readList(p?.entries,20),until=time(p?.managementExpiresAt,locale);
 if(!p||p.code!=='view_ready'||!text(p.clientName,200)||!entries||!opaque(p.styleNonce,128)||!until)return closed(locale,'unavailable',p?.styleNonce);
 let list='';
 for(const item of entries){
  const row=readRecord(item,['grantId','scopes','status','expiresAt']);
  if(!row||!ref(row.grantId))return closed(locale,'unavailable',p.styleNonce);
  const summary=renderPreparationConnectionSummary({locale,projectName:c.project,clientName:p.clientName,scopes:row.scopes,status:row.status,expiresAt:row.expiresAt});
  if(!summary||(row.status!=='revoked'&&!opaque(p.handle,256)))return closed(locale,'unavailable',p.styleNonce);
  list+=row.status==='revoked'?summary.html:'<form method="post" action="/connections/revoke">'+summary.html+
   '<input type="hidden" name="handle" value="'+escape(p.handle)+'"><input type="hidden" name="grant" value="'+escape(row.grantId)+'">'+
   '<button type="submit">'+c.revoke+'</button></form>';
 }
 const body='<h1>'+c.title+'</h1><p class="guide">'+c.guide+'</p><p>'+c.saved+'</p><p>'+c.until+until+c.limit+'</p>'+(list||'<p>'+c.empty+'</p>');
 const v=document(locale,'view_ready',body,p.styleNonce,{title:c.title,skip:c.skip});
 return Object.freeze({...v,contract:'agentfriendly.preparation-connections-view.v1'});
}
