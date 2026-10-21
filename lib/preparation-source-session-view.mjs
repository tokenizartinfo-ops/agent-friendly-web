import {readRecord,clock as validWall} from './agent-consumption-input.mjs';
import {PREPARATION_CONSENT_STYLE} from './delegated-preparation-consent-view.mjs';
const escape=value=>value.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const opaque=v=>typeof v==='string'&&/^[a-f0-9]{48}$/.test(v);
const COPY={
 400:['No pude leer esta solicitud','Podés volver a AFW para revisar el siguiente paso. Esta pantalla no cambia datos.'],
 401:['Necesitamos comprobar tu sesión','Volvé a la entrada de AFW para revisar el acceso. No ingreses códigos en este mensaje.'],
 403:['Este paso no está disponible para tu sesión','No cambié el expediente ni conecté al asistente. Podés volver a AFW.'],
 404:['No encontré este paso','Volvé a AFW para continuar por el enlace vigente.'],
 405:['Este paso es solo de consulta','Abrir esta página no crea un expediente ni conecta a tu asistente.'],
 410:['Esta prueba está en pausa','No necesitás repetir códigos ni usar enlaces anteriores. La ventana no se renueva automáticamente; tu expediente no se borra.'],
 429:['Hagamos una pausa breve','Se alcanzó el límite de consultas de esta prueba. No hace falta volver a ingresar ni repetir códigos.'],
 503:['Todavía no pude comprobar este paso','No puedo confirmar la causa desde esta pantalla. No repetí la solicitud ni concedí permisos.'],
};
/** Presentation only; host supplies verified expiration. No assertions, source
 * facts, subject, email, permission handles, scripts, forms or remote assets. */
export function renderPreparationSourceSessionView(input){
 const p=readRecord(input,['status','expiresAt','serverSubjectPinned','styleNonce']);
 const success=p?.status===200&&validWall(p.expiresAt)&&typeof p.serverSubjectPinned==='boolean';
 const status=success?200:(COPY[p?.status]?p.status:503);
 const [title,body]=COPY[status]??['Tu sesión está comprobada','Te guío paso a paso. Abrir esta página no crea un expediente ni conecta a tu asistente.'];
 const validNonce=opaque(p?.styleNonce),nonce=validNonce?p.styleNonce:'';
 let guidance='';
 if(success){
  const iso=new Date(p.expiresAt).toISOString();
  const time=new Intl.DateTimeFormat('es-AR',{dateStyle:'medium',timeStyle:'short',timeZone:'America/Argentina/Buenos_Aires'}).format(new Date(p.expiresAt));
  guidance='<ol><li><strong>Comprobar tu sesión.</strong> Listo para esta consulta.</li>'+
   '<li><strong>Preparar tu expediente de prueba.</strong> '+(p.serverSubjectPinned?'La identidad de esta ventana ya está fijada.':'Primero fijaremos tu identidad para la ventana de preparación.')+
   ' Después podrás revisar los datos antes de guardarlos.</li>'+
   '<li><strong>Comprobar el dominio y conectar al asistente.</strong> Cada paso se revisa por separado. Todavía no hay un permiso nuevo.</li></ol>'+
   '<p>Esta consulta no comprueba la propiedad del sitio ni publica archivos, realiza cargos o instala herramientas.</p>'+
   '<p>Esta ventana termina el <time datetime="'+escape(iso)+'">'+escape(time)+' (Argentina)</time>. No se renueva automáticamente.</p>';
 }
 const html='<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">'+
  '<title>'+escape(title)+' · AFW</title>'+(validNonce?'<style nonce="'+nonce+'">'+PREPARATION_CONSENT_STYLE+'li{margin:12px 0}'+ '</style>':'')+
  '</head><body><a class="skip" href="#source-main">Ir al siguiente paso</a><main id="source-main" tabindex="-1">'+
  '<div class="brand"><span class="motif" aria-hidden="true"><span class="dot"></span><span class="string"></span><span class="dot"></span></span>AFW · Agent Friendly Web</div>'+
  '<h1>'+escape(title)+'</h1><p class="guide">'+escape(body)+'</p>'+guidance+
  '<a class="back" href="https://agentfriendlyweb.dev/expediente">Volver a mi expediente</a></main></body></html>';
 return Object.freeze({html,headers:Object.freeze({'Content-Type':'text/html; charset=utf-8',
  'Content-Security-Policy':"default-src 'none'; style-src "+(validNonce?"'nonce-"+nonce+"'":"'none'")+"; form-action 'none'; frame-ancestors 'none'; base-uri 'none'"})});
}
