import {createHash,randomBytes,randomUUID} from 'node:crypto';
import {verifyCloudflareAccessJwt} from './cloudflare-access-identity.mjs';
import {recordDossierMonitoringConsent} from './dossier-monitoring-authority.mjs';
import {decodeJwt} from 'jose';
const cookieName='__Host-afw-monitoring-owner';
const purpose='afw.dossier-monitoring-owner.v1';
const hash=x=>createHash('sha256').update(x).digest('hex');
const id=x=>typeof x==='string'&&x.length>0&&x.length<=200&&x.trim()===x;
const time=x=>Number.isSafeInteger(x)&&x>=0&&x<=8640000000000000;
const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const unavailable=status=>new Response('No pude confirmar este permiso. Volvé a tu expediente para revisarlo.',{status,headers:{'Cache-Control':'no-store','Content-Type':'text/plain; charset=utf-8'}});
function page(content,nonceCookie){
 const nonce=randomUUID(),headers={'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store','Referrer-Policy':'no-referrer','X-Content-Type-Options':'nosniff','Content-Security-Policy':`default-src 'none'; style-src 'nonce-${nonce}'; form-action 'self'; frame-ancestors 'none'; base-uri 'none'`};
 if(nonceCookie)headers['Set-Cookie']=nonceCookie;
 return new Response(`<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Avisos de tu expediente · AFW</title><style nonce="${nonce}">*{box-sizing:border-box}body{margin:0;background:#f3eadb;color:#181512;font:17px/1.6 "Comic Sans MS","Comic Neue",cursive}main{max-width:680px;margin:32px auto;padding:24px;background:#fffaf1;border:2px solid;border-radius:14px;box-shadow:5px 5px #ddc99f;overflow-wrap:anywhere}h1{line-height:1.2;font-size:1.8rem}button{font:inherit;min-height:48px;padding:12px;border:2px solid #181512;border-radius:8px;background:#3c514b;color:#fffaf1;cursor:pointer}a{color:#3c514b}a:focus-visible,button:focus-visible{outline:3px solid #ad4f35;outline-offset:4px}@media(max-width:700px){main{margin:20px 16px}button{width:100%}}</style></head><body><main><p>AFW · Te acompaño</p>${content}<p><a href="https://agentfriendlyweb.dev/expediente">Volver a mi expediente</a></p></main></body></html>`,{headers});
}
async function handleForm(request){
 if(request.headers.get('Content-Type')!=='application/x-www-form-urlencoded')throw Error('input');
 const reader=request.body?.getReader();if(!reader)throw Error('input');const chunks=[];let size=0;
 for(;;){const {done,value}=await reader.read();if(done)break;size+=value.length;if(size>1024){void reader.cancel().catch(()=>{});throw Error('input');}chunks.push(value);}
 const bytes=new Uint8Array(size);let at=0;for(const c of chunks){bytes.set(c,at);at+=c.length;}
 const form=new URLSearchParams(new TextDecoder('utf-8',{fatal:true}).decode(bytes));
 if([...form.keys()].length!==1||form.getAll('handle').length!==1||!/^[A-Za-z0-9_-]{43}$/.test(form.get('handle')??''))throw Error('input');return form.get('handle');
}
/** Prepared owner HTTP UI, UNMOUNTED. Host supplies fixed own-QA policy and DB,
 * never body-derived pins. It verifies Access independently of OAuth/MCP. No
 * Events flag/route, schema migration, real consent or hosted guard is enabled.
 */
export function createDossierMonitoringOwnerHandler({issuer,db,policy,accessVerifier=verifyCloudflareAccessJwt,now=Date.now}={}){
 let p;try{
  const keys=['enabled','startAt','expiresAt','projectId','grantId','clientId','resource','teamDomain','audience'];
  if(!policy||Object.getPrototypeOf(policy)!==Object.prototype)throw Error('policy');
  const descriptors=Object.getOwnPropertyDescriptors(policy);
  if(Reflect.ownKeys(descriptors).some(k=>typeof k!=='string'||!keys.includes(k)||!Object.hasOwn(descriptors[k],'value')))throw Error('policy');
  p=Object.freeze(Object.fromEntries(Object.entries(descriptors).map(([k,d])=>[k,d.value])));
 }catch{return async()=>unavailable(503);}
 if(p.enabled!==true)return async()=>unavailable(404);
 try{if(new URL(issuer).origin!==issuer||!issuer.startsWith('https://')||p.resource!==issuer+'/mcp'||!['projectId','grantId','clientId','audience'].every(k=>id(p[k]))||typeof p.teamDomain!=='string'||!(/^[a-z0-9-]+\.cloudflareaccess\.com$/).test(p.teamDomain)||!time(p.startAt)||!time(p.expiresAt)||p.expiresAt<=p.startAt||p.expiresAt-p.startAt>600000||!db?.prepare||typeof accessVerifier!=='function'||typeof now!=='function')throw Error('policy');}catch{return async()=>unavailable(503);}
 let last=-1;const clock=()=>{const t=now();if(!time(t)||t<last)throw Error('clock');last=t;return t;};
 const open=()=>{const t=clock();return t>=p.startAt&&t<p.expiresAt;};
 const primary=()=>db.withSession?db.withSession('first-primary'):db;
 const owned=subject=>primary().prepare(`SELECT g.*,p.revision,p.organization,COALESCE((SELECT MAX(sequence) FROM dossier_monitoring_consent_events WHERE grant_id=g.id),0) AS sequence,EXISTS(SELECT 1 FROM dossier_monitoring_consent_events WHERE grant_id=g.id AND action='grant') AS granted,EXISTS(SELECT 1 FROM dossier_monitoring_consent_events WHERE grant_id=g.id AND action='revoke') AS withdrawn FROM delegated_access_grants g JOIN site_projects p ON p.id=g.project_id AND p.user_id=g.user_id WHERE g.id=? AND g.user_id=? AND g.project_id=? AND g.client_id=? AND g.resource=?`).bind(p.grantId,subject,p.projectId,p.clientId,p.resource).first();
 const identity=async request=>{const token=request.headers.get('Cf-Access-Jwt-Assertion'),v=await accessVerifier({token,teamDomain:p.teamDomain,audience:p.audience});if(!v.ok||!id(v.identity?.userId))return null;try{const payload=decodeJwt(token),expiry=payload.exp*1000;return Number.isSafeInteger(payload.exp)&&time(expiry)&&expiry>clock()&&payload.sub===v.identity.userId?{subject:v.identity.userId,expiresAt:expiry}:null;}catch{return null;}};
 return async request=>{try{
  if(!open())return unavailable(404);
  const url=new URL(request.url);if(url.origin!==issuer||url.search||!['/monitoring','/monitoring/grant','/monitoring/revoke'].includes(url.pathname))return unavailable(404);
  if(!((request.method==='GET'&&url.pathname==='/monitoring')||(request.method==='POST'&&url.pathname!=='/monitoring')))return unavailable(405);
  if(request.method==='POST'&&request.headers.get('Origin')!==issuer)return unavailable(403);
  const auth=await identity(request),subject=auth?.subject;if(!subject||!open())return unavailable(401);
  const g=await owned(subject);if(!g||!open())return unavailable(403);
  if(request.method==='GET'){
   if(g.withdrawn)return page('<h1>Retiraste los avisos</h1><p>El seguimiento terminó. Tu expediente sigue guardado.</p>');
   const action=g.granted?'revoke':'grant',t=clock(),oauthExpiry=Date.parse(g.expires_at);let scopes;
   try{scopes=JSON.parse(g.scopes_json);}catch{scopes=[];}
   if(action==='grant'&&(g.revoked_at!==''||!time(oauthExpiry)||new Date(oauthExpiry).toISOString()!==g.expires_at||oauthExpiry<=t||!Array.isArray(scopes)||!scopes.every(s=>typeof s==='string')||!scopes.includes('afw:project:read')))return unavailable(403);
   const expiry=Math.min(p.expiresAt,auth.expiresAt,t+600000),permissionExpiry=action==='grant'?Math.min(expiry,oauthExpiry):t,handle=randomBytes(32).toString('base64url');
   if((await identity(request))?.subject!==subject||!open())return unavailable(403);
   await primary().prepare(`INSERT INTO dossier_monitoring_owner_tickets(handle_hash,request_id,user_id,grant_id,project_id,client_id,resource,purpose,action,revision,expected_sequence,issued_at,expires_at,permission_expires_at) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)`).bind(hash(handle),randomUUID(),subject,p.grantId,p.projectId,p.clientId,p.resource,purpose,action,g.revision,g.sequence,t,expiry,permissionExpiry).run();
   if(!open())return unavailable(404);
   const text=action==='grant'?'<h1>Avisos de tu expediente</h1><p>Puedo avisar a tu asistente cuando cambie este expediente durante un máximo de diez minutos. Los avisos incluyen referencias y fechas; no tus respuestas. El asistente deberá consultar de nuevo lo permitido.</p><p>No cambia datos ni publica. Podés retirar el permiso antes. Un aviso no confirma que el asistente haya terminado su revisión.</p>':'<h1>Revisar tus avisos</h1><p>Podés retirar el seguimiento. Eso bloquea los siguientes avisos; no borra tu expediente ni retira uno ya enviado. El permiso de lectura se controla por separado.</p>';
   return page(`${text}<p>Expediente: ${esc(g.organization)}</p><p>Este formulario vence ${esc(new Date(expiry).toISOString())}.</p><form method="post" action="/monitoring/${action}"><input type="hidden" name="handle" value="${handle}"><button>${action==='grant'?'Permitir avisos temporales':'Retirar avisos'}</button></form>`,`${cookieName}=${handle}; Path=/; Secure; HttpOnly; SameSite=Strict; Max-Age=${Math.max(1,Math.floor((expiry-clock())/1000))}`);
  }
  let handle;try{handle=await handleForm(request);}catch{return unavailable(400);}
  const cookies=(request.headers.get('Cookie')??'').split(';').map(s=>s.trim()).filter(s=>s.startsWith(cookieName+'='));
  if(cookies.length!==1||hash(cookies[0].slice(cookieName.length+1))!==hash(handle))return unavailable(403);
  const ticket=await primary().prepare('SELECT * FROM dossier_monitoring_owner_tickets WHERE handle_hash=? AND user_id=? AND grant_id=? AND project_id=? AND client_id=? AND resource=? AND purpose=?').bind(hash(handle),subject,p.grantId,p.projectId,p.clientId,p.resource,purpose).first();
  const t=clock();if(!ticket||ticket.action!==url.pathname.split('/').at(-1)||!time(ticket.issued_at)||!time(ticket.expires_at)||ticket.issued_at>t||ticket.expires_at<=t||ticket.expires_at>p.expiresAt||ticket.expires_at-ticket.issued_at>600000||(await identity(request))?.subject!==subject||!open())return unavailable(403);
  const result=await recordDossierMonitoringConsent({db,subject,grantId:p.grantId,projectId:p.projectId,expectedRevision:ticket.revision,expectedSequence:ticket.expected_sequence,requestId:ticket.request_id,action:ticket.action,now:clock(),expiresAt:ticket.permission_expires_at,expectedClientId:p.clientId,expectedResource:p.resource,commitWindow:{startAt:p.startAt,expiresAt:Math.min(p.expiresAt,ticket.expires_at,auth.expiresAt)},beforeCommit:async()=> (await identity(request))?.subject===subject&&open()});
  if(result.status!==200)return unavailable(result.status);
  return page(ticket.action==='grant'?'<h1>Guardé tu decisión</h1><p>Registré el permiso para avisos temporales. Esto no confirma que exista una suscripción ni que el asistente haya revisado el expediente. Podés consultar y retirarlo abajo.</p><a href="/monitoring">Revisar mis avisos</a>':'<h1>Retiraste los avisos</h1><p>El seguimiento quedó retirado. Tu expediente sigue guardado.</p>');
 }catch{return unavailable(503);}};
}
