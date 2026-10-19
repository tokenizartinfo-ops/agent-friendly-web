import {z} from 'zod';
import {readRecord} from './agent-consumption-input.mjs';
import {readAgentCapsulePreparationInput} from './agent-capsule-preparation.mjs';

const contract='agentfriendly.capsule-prepare.v1';
const scope='afw:capsule:prepare'; // Future prerequisite, not OAuth registration.
const names=['prepare_capsule_draft','reconcile_capsule_preparation'];
const errors=['delegated_access_denied','domain_unverified','idempotency_conflict','revision_conflict','preparation_pending',
 'capsule_expired','unavailable','invalid_request','preparation_not_found','deadline_exceeded','unknown_ack',
 'preparation_conflict','invalid_source','insufficient_scope','rate_limited'];
const positive=z.number().int().min(1).max(Number.MAX_SAFE_INTEGER);
const inputSchema=z.object({contract:z.literal(contract),expectedRevision:positive,
 idempotencyKey:z.string().regex(/^[a-zA-Z0-9][a-zA-Z0-9._:-]{7,119}$/)}).strict();
const preparationSchema=z.object({
 capsuleRef:z.string().regex(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/),
 version:positive,manifestSha256:z.string().regex(/^[0-9a-f]{64}$/),sourceRevision:positive,
}).strict();
const recoverySchema=z.object({
 action:z.enum(['review_capsule','review_request','review_permission','review_domain','check_preparation','retry_read']),
 nextTool:z.literal(names[1]).nullable(),reuseOriginalRequest:z.boolean(),automaticRetry:z.literal(false),
 automaticReconnect:z.literal(false),message:z.string().max(500),
}).strict();
const outputSchema=z.object({contract:z.literal(contract),code:z.enum(['prepared',...errors]),
 replayed:z.boolean().nullable(),preparation:preparationSchema.nullable(),executionAllowed:z.literal(false),
 chargeAllowed:z.literal(false),publicationAllowed:z.literal(false),recovery:recoverySchema,
}).strict();

function recovery(code,method){
 let action,message,nextTool=null,reuseOriginalRequest=false;
 if(code==='prepared'){action='review_capsule';message='Preparé un borrador para revisar. Todavía no está aprobado, instalado ni publicado.';}
 else if(['unknown_ack','preparation_pending'].includes(code)||(method==='prepare'&&['unavailable','deadline_exceeded','rate_limited'].includes(code))){
  action='check_preparation';nextTool=names[1];reuseOriginalRequest=true;
  message='No pude confirmar el resultado. Conservemos la misma solicitud y consultemos su estado antes de intentar preparar otra cápsula.';
 }else if(['delegated_access_denied','insufficient_scope'].includes(code)){
  action='review_permission';message='Revisemos el permiso en AFW antes de seguir. Una conexión de lectura no autoriza preparar borradores.';
 }else if(code==='domain_unverified'){
  action='review_domain';message='Primero necesitamos revisar la verificación del dominio en AFW. Te guío con ese paso.';
 }else if(code==='capsule_expired'){
  action='review_capsule';message='Revisemos el borrador y su vigencia antes de continuar. No renové permisos ni publicación.';
 }else if(['unavailable','deadline_exceeded','rate_limited'].includes(code)){
  action='retry_read';nextTool=names[1];reuseOriginalRequest=true;message='No pude consultar el estado ahora. Podemos repetir solo la lectura cuando esté disponible, conservando la misma solicitud.';
 }else{action='review_request';message='La solicitud necesita revisión antes de continuar. Conservemos la clave y revisemos el expediente; no generaré otro intento automáticamente.';}
 return {action,nextTool,reuseOriginalRequest,automaticRetry:false,automaticReconnect:false,message};
}
function response(code,method,details){
 const structuredContent={contract,code,replayed:details?.replayed??null,preparation:details?.preparation??null,
  executionAllowed:false,chargeAllowed:false,publicationAllowed:false,recovery:recovery(code,method)};
 return {...(code==='prepared'?{}:{isError:true}),structuredContent,content:[{type:'text',text:JSON.stringify(structuredContent)}]};
}
function project(value,method,revision){
 const r=readRecord(value,['contract','code','replayed','preparation','executionAllowed','chargeAllowed','publicationAllowed']);
 if(!r||r.contract!==contract||r.executionAllowed!==false||r.chargeAllowed!==false||r.publicationAllowed!==false)return null;
 if(r.code!=='prepared'){
  if(!errors.includes(r.code)||Object.hasOwn(r,'preparation')||Object.hasOwn(r,'replayed')||(method==='reconcile'&&r.code==='unknown_ack'))return null;
  return {code:r.code};
 }
 const p=readRecord(r.preparation,['capsuleRef','version','manifestSha256','sourceRevision']);
 if(!p||typeof r.replayed!=='boolean'||(method==='reconcile'&&r.replayed!==true))return null;
 const parsed=preparationSchema.safeParse(p);
 if(!parsed.success||parsed.data.sourceRevision!==revision)return null;
 return {code:'prepared',replayed:r.replayed,preparation:parsed.data};
}

/** Source-only registrar. The server supplies the immutable, finite,
 * already-authorized request host; annotations and schemas confer no authority.
 * No runtime entrypoint/read server imports this module in this increment.
 */
export function registerDelegatedCapsulePreparation(server,options={}){
 let active=false;const handles=[];
 try{
  if(options?.enabled!==true)return false;
  const host=options.host,methods=readRecord(host,['prepare','reconcile']);
  if(!methods||!Object.isFrozen(host)||typeof methods.prepare!=='function'||typeof methods.reconcile!=='function'
   ||typeof server?.registerTool!=='function')throw Error('unavailable');
  for(const [index,method] of ['prepare','reconcile'].entries()){
   const handle=server.registerTool(names[index],{
    description:method==='prepare'?'Prepara un borrador de cápsula con datos autorizados ya guardados. Requiere permiso específico; no aprueba, instala, publica ni cobra.':'Consulta el resultado de la solicitud original de preparación. No regenera ni renueva permisos.',
    inputSchema,outputSchema,annotations:{readOnlyHint:method==='reconcile',destructiveHint:false,idempotentHint:true,openWorldHint:false},
    _meta:{securitySchemes:[{type:'oauth2',scopes:[scope]}]},
   },async args=>{
    if(!active)return response('unavailable',method);
    const input=readAgentCapsulePreparationInput(args);if(!input)return response('invalid_request',method);
    const revision=input.expectedRevision;
    try{
     const value=await methods[method].call(host,Object.freeze(input));
     const safe=project(value,method,revision);
     if(!safe)return response(method==='prepare'?'unknown_ack':'unavailable',method);
     return response(safe.code,method,safe.code==='prepared'?safe:undefined);
    }catch{return response(method==='prepare'?'unknown_ack':'unavailable',method);}
   });
   if(handle)handles.push(handle);
   if(typeof handle?.remove!=='function')throw Error('unavailable');
  }
  active=true;return true;
 }catch{
  active=false;
  for(const handle of handles.reverse())try{handle.remove();}catch{/* Remains inactive even if unregister fails. */}
  throw Error('Private capsule preparation unavailable');
 }
}
