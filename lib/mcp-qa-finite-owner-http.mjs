import {createFiniteOwnerRequestLease,prepareFiniteOwnerChoice} from './mcp-qa-finite-owner-preparation.mjs';
import {createFiniteConnectionPreparation} from './mcp-qa-finite-connection-preparation.mjs';
const headers={'Cache-Control':'no-store','Content-Type':'text/html; charset=utf-8','Referrer-Policy':'no-referrer','X-Content-Type-Options':'nosniff','Content-Security-Policy':"default-src 'none'; form-action 'self'; frame-ancestors 'none'; base-uri 'none'"};
const goals={content:'explicar mejor productos o servicios',discovery:'facilitar que encuentren y entiendan el sitio'};
const stages={
 connection:{title:'Preparar la conexión de lectura',reason:'Esto habilita la pantalla donde revisarás por separado el permiso de lectura.',next:'Revisá y aceptá el permiso de lectura antes de preparar los avisos.'},
 notices:{title:'Preparar los avisos',reason:'La lectura ya tiene su decisión propia. Este paso habilita la pantalla para decidir los avisos por separado.',next:'Revisá y aceptá los avisos antes de preparar el ensayo.'},
 finite:{title:'Preparar el ensayo temporal',reason:'La lectura y los avisos ya tienen decisiones separadas. Este paso prepara la configuración del ensayo con esos límites.',next:'La preparación quedó registrada. El ensayo y el guardado del objetivo requieren su ejecución autorizada posterior.'}
};
const uncertain='<h1>No pude confirmar esta preparación</h1><p>Puede haber decisiones guardadas o cambios de configuración. Hace falta conciliar el estado antes de continuar. No repitas la preparación ni abras otra conexión para resolverlo.</p>';
export function createFiniteOwnerPreparationHost({ctx,env}){
 return Object.freeze({async fetch(request){
  const parent=createFiniteOwnerRequestLease(request);
  try{
   const result=await prepareFiniteOwnerChoice({ctx,env,request},parent.lease);
   if(result.status===202){
    const outcome=await createFiniteConnectionPreparation({ctx,env}).run({preconnectionId:result.preconnectionId,stage:result.stage},parent.lease);
    return new Response(outcome.status==='installed'?'<h1>Configuración confirmada</h1><p>'+stages[result.stage].next+'</p><p>Los permisos y la ventana original no se renuevan.</p>':uncertain,{status:202,headers});
   }
   const stage=stages[result.stage],goal=goals[result.goal];if(!stage||!goal)throw Error('Unavailable choice');
   const expiry=new Date(result.expiresAt),humanExpiry=new Intl.DateTimeFormat('es-AR',{dateStyle:'medium',timeStyle:'long',timeZone:'UTC'}).format(expiry);
   const body='<h1>'+stage.title+'</h1><p>Proyecto sintético propio. Objetivo: '+goal+'.</p><p>'+stage.reason+'</p><p>Esta decisión prepara una configuración temporal. La ventana completa dura como máximo quince minutos y no se reinicia. Vence el <time datetime="'+expiry.toISOString()+'">'+humanExpiry+'</time>. No concede ni renueva permisos de lectura o avisos.</p><p>Guardar el único objetivo conocido será una acción distinta en el ensayo autorizado.</p><form method="post" action="/connections/finite-prepare"><input type="hidden" name="handle" value="'+result.handle+'"><input type="hidden" name="projectRef" value="'+result.projectRef+'"><button name="decision" value="approve">Aprobar preparación temporal</button></form>';
   return new Response(body,{headers:{...headers,'Set-Cookie':'__Host-afw-finite-prepare='+result.handle+'; Path=/; Secure; HttpOnly; SameSite=Strict; Max-Age='+Math.max(1,Math.floor((result.expiresAt-Date.now())/1000))}});
  }catch(e){return new Response(uncertain,{status:[400,401,403,404,405,429].includes(e.status)?e.status:503,headers});}
  finally{parent.finish();}
 }});
}
