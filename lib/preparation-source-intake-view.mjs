import {readRecord,ref,text,clock as validWall} from './agent-consumption-input.mjs';
import {PREPARATION_CONSENT_STYLE} from './delegated-preparation-consent-view.mjs';
const escape=v=>v.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const COPY={
 form_ready:['Revisá estos datos','Te guío paso a paso. Es una propuesta para tu expediente de prueba; podés revisarla antes de guardar.'],
 source_created:['Guardé tu expediente de prueba','Los datos y el recibo de este guardado quedaron registrados.'],
 source_already_recorded:['Estos datos ya estaban guardados','Confirmé el resultado original. No volví a crear el expediente.'],
 source_not_recorded:['Todavía no pude confirmar un guardado','En esta consulta no encontré un recibo completo para esos datos. Esto no demuestra que un intento anterior haya fallado; no repetí el guardado.'],
 source_conflict:['Necesitamos revisar estos datos','El registro guardado ya no coincide con este intento. Conservé los datos y su historial; no los sobrescribí.'],
 unknown_ack:['No pude confirmar el resultado','El guardado pudo haberse completado. Volvé al formulario y consultá el resultado anterior con los mismos datos. No lo repetiré automáticamente.'],
 source_request_invalid:['Revisemos el formulario','Falta un dato válido o la confirmación para guardar. Consultar el resultado anterior no requiere esa confirmación.'],
 source_identity_required:['Necesitamos comprobar tu sesión','Volvé a AFW para revisar el acceso. No ingreses códigos en este mensaje.'],
 source_request_denied:['Volvé a abrir este formulario','Esta solicitud no pudo confirmarse para tu sesión. Reabrí el formulario y revisá los datos; no hace falta repetir códigos automáticamente.'],
 source_not_found:['No encontré este paso','Podés volver a AFW para continuar por el enlace vigente.'],
 source_method_denied:['Este paso no admite esa acción','No guardé datos ni conecté al asistente.'],
 source_paused:['Esta prueba está en pausa','La ventana terminó. No necesitás repetir códigos ni usar enlaces anteriores; no se renueva automáticamente.'],
 source_request_too_large:['El formulario es demasiado largo','Volvé a abrirlo y usá una descripción breve. No guardé estos datos.'],
 source_media_denied:['No pude leer este formato','Usá el formulario de AFW para revisar y enviar los datos.'],
 source_limited:['Hagamos una pausa breve','Se alcanzó el límite de esta prueba. No hace falta volver a ingresar ni pedir códigos.'],
 source_unavailable:['Todavía no pude completar este paso','No puedo confirmar la causa desde esta pantalla. No conecté al asistente ni concedí permisos.'],
};
const STATUS={form_ready:200,source_created:200,source_already_recorded:200,source_not_recorded:200,source_conflict:409,unknown_ack:503,
 source_request_invalid:400,source_identity_required:401,source_request_denied:403,source_not_found:404,source_method_denied:405,source_paused:410,
 source_request_too_large:413,source_media_denied:415,source_limited:429,source_unavailable:503};
/** Presentation only. Invalid submissions/auth material are never reflected in
 * failures; only server-validated data and CSRF enter a successful review form. */
export function renderPreparationSourceIntakeView(input){
 const p=readRecord(input,['status','code','styleNonce','csrfToken','organization','website','expiresAt','projectRef']);
 let code=p?.code,status=p?.status;
 const showForm=status===200&&STATUS[code]===200&&/^[a-f0-9]{64}\.[a-f0-9]{64}$/.test(p?.csrfToken??'')
  &&text(p.organization,200)&&p.website==='https://agentfriendlyweb.dev'&&validWall(p.expiresAt);
 if(!p||!COPY[code]||STATUS[code]!==status||(status===200&&!showForm)||(p.projectRef!==undefined&&p.projectRef!==null&&!ref(p.projectRef))){
  code='source_unavailable';status=503;
 }
 const validNonce=typeof p?.styleNonce==='string'&&/^[a-f0-9]{48}$/.test(p.styleNonce),nonce=validNonce?p.styleNonce:'';
 const [title,body]=COPY[code];
 const project=code==='source_created'||code==='source_already_recorded'?p.projectRef:null;
 const meta=project?' data-project-ref="'+escape(project)+'"':'';
 let form='';
 if(status===200){
  const expiry=new Date(p.expiresAt),time=new Intl.DateTimeFormat('es-AR',{dateStyle:'medium',timeStyle:'short',timeZone:'America/Argentina/Buenos_Aires'}).format(expiry);
  form='<p>Guardar crea únicamente tu expediente de prueba en AFW. Todavía falta comprobar el dominio y revisar por separado el permiso del asistente. Tu sitio no cambia: no publica, instala herramientas ni realiza cargos.</p>'+
   '<form method="post" action="/source/new" aria-labelledby="source-fields"><h2 id="source-fields">Tus datos propuestos</h2>'+
   '<input type="hidden" name="csrf" value="'+p.csrfToken+'">'+
   '<label for="source-site">Sitio de esta prueba</label><input id="source-site" name="website" type="url" value="'+p.website+'" readonly required>'+
   '<label for="source-org">Nombre de la organización</label><input id="source-org" name="organization" maxlength="200" value="'+escape(p.organization)+'" required aria-describedby="source-help">'+
   '<p id="source-help">Podés corregir el nombre antes de guardar. Para consultar un intento anterior, conservá exactamente sus datos.</p>'+
   '<label class="confirm"><input type="checkbox" name="confirmCreate" value="yes"> Revisé los datos y quiero guardar este expediente de prueba.</label>'+
   '<div class="choices"><button type="submit" name="decision" value="save">Guardar mi expediente de prueba</button>'+
   '<button type="submit" name="decision" value="inspect" formnovalidate>Consultar el resultado anterior</button></div></form>'+
   '<p>Consultar el resultado anterior no guarda ni repite el alta. No implica permitir cambios al asistente.</p>'+
   '<p>Esta ventana termina el <time datetime="'+expiry.toISOString()+'">'+escape(time)+' (Argentina)</time>. No se renueva automáticamente.</p>';
 }
 const reopen=status!==200&&code!=='source_paused'?'<a class="back" href="/source/new">Volver al formulario para consultar</a>':'';
 const css=PREPARATION_CONSENT_STYLE+'label{display:block;margin-top:16px}input{font:inherit;max-width:100%;min-height:48px}input:not([type=hidden]):not([type=checkbox]){width:100%;padding:10px;border:2px solid #181512;border-radius:6px;background:#fffaf1;color:#181512}input[type=checkbox]{width:24px;height:24px;min-height:24px;vertical-align:middle;margin-right:8px}input:focus-visible{outline:3px solid #ad4f35;outline-offset:4px}.confirm{padding:12px 0}.choices{margin-top:20px}';
 const html='<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>'+escape(title)+' · AFW</title>'+
  (validNonce?'<style nonce="'+nonce+'">'+css+'</style>':'')+'</head><body><a class="skip" href="#source-intake">Ir al formulario</a>'+
  '<main id="source-intake" tabindex="-1"><div class="brand"><span class="motif" aria-hidden="true"><span class="dot"></span><span class="string"></span><span class="dot"></span></span>AFW · Agent Friendly Web</div>'+
  '<section data-result-code="'+code+'"'+meta+'><h1>'+escape(title)+'</h1><p class="guide">'+escape(body)+'</p></section>'+form+reopen+
  '<a class="back" href="https://agentfriendlyweb.dev/expediente">Volver a mi expediente</a></main></body></html>';
 return Object.freeze({html,headers:Object.freeze({'Content-Type':'text/html; charset=utf-8',
  'Content-Security-Policy':"default-src 'none'; style-src "+(validNonce?"'nonce-"+nonce+"'":"'none'")+"; form-action 'self'; frame-ancestors 'none'; base-uri 'none'"})});
}
