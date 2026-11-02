import {createFiniteOwnerRequestLease,prepareFiniteOwnerChoice} from './mcp-qa-finite-owner-preparation.mjs';
const headers={'Cache-Control':'no-store','Content-Type':'text/html; charset=utf-8','Referrer-Policy':'no-referrer','X-Content-Type-Options':'nosniff','Content-Security-Policy':"default-src 'none'; form-action 'self'; frame-ancestors 'none'; base-uri 'none'"};
export function createFiniteOwnerPreparationHost({ctx,env}){
 return Object.freeze({async fetch(request){
  const parent=createFiniteOwnerRequestLease(request);
  try{
   const result=await prepareFiniteOwnerChoice({ctx,env,request},parent.lease);
   if(result.status===202)return new Response('<h1>Guardé tu decisión</h1><p>La preparación está pendiente. Todavía no publiqué la configuración. La lectura y los avisos requieren decisiones separadas.</p>',{status:202,headers});
   const expiry=new Date(result.expiresAt),humanExpiry=new Intl.DateTimeFormat('es-AR',{dateStyle:'medium',timeStyle:'long',timeZone:'UTC'}).format(expiry);
   const body='<h1>Preparar una prueba propia</h1><p>Proyecto sintético propio. Objetivo: '+result.goal+'.</p><p>Esta decisión prepara una configuración temporal para la prueba. La ventana completa dura como máximo quince minutos y no se reinicia. Vence el <time datetime="'+expiry.toISOString()+'">'+humanExpiry+'</time>. No concede lectura ni avisos. Esos permisos se revisan por separado y no se renuevan automáticamente.</p><p>Guardar el único objetivo conocido será una acción distinta en el ensayo autorizado.</p><form method="post" action="/connections/finite-prepare"><input type="hidden" name="handle" value="'+result.handle+'"><input type="hidden" name="projectRef" value="'+result.projectRef+'"><button name="decision" value="approve">Aprobar preparación temporal</button></form>';
   return new Response(body,{headers:{...headers,'Set-Cookie':'__Host-afw-finite-prepare='+result.handle+'; Path=/; Secure; HttpOnly; SameSite=Strict; Max-Age='+Math.max(1,Math.floor((result.expiresAt-Date.now())/1000))}});
  }catch(e){return new Response('<h1>No pude confirmar esta preparación</h1><p>Revisá tu expediente. No renové permisos ni publiqué cambios.</p>',{status:[400,401,403,404,405,429].includes(e.status)?e.status:503,headers});}
  finally{parent.finish();}
 }});
}
