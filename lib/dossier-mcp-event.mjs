import {validateDossierSignal} from './dossier-supervision.mjs';
const HASH='^[0-9a-f]{64}$';
const signalFields=['version','eventId','projectRef','revision','kind','observedAt'];
const definition={
 name:'afw.dossier.changed',
 description:'Metadata de un cambio de expediente autorizado. No incluye contenido ni concede permiso para leerlo, modificarlo o publicarlo.',
 delivery:['webhook'],
 inputSchema:{type:'object',properties:{projectRef:{type:'string',pattern:HASH}},required:['projectRef'],additionalProperties:false},
 payloadSchema:{type:'object',properties:{projectRef:{type:'string',pattern:HASH},revision:{type:'integer',minimum:1},kind:{type:'string',enum:['project_created','project_updated']}},required:['projectRef','revision','kind'],additionalProperties:false},
};
const denied=()=>{throw Error('Invalid MCP dossier event');};
export function getDossierMcpEventDefinition(){return structuredClone(definition);}
/** Pure contract only. The future authenticated host must resolve authorization,
 * confirm the source event and subscription, and enforce expiry/revocation.
 * No endpoint capability, delivery, receipt or hosted execution is established.
 */
export function buildDossierMcpEvent(signal,authorizedProjectRef){
 if(!signal||typeof signal!=='object'||Array.isArray(signal))denied();
 const prototype=Object.getPrototypeOf(signal);
 if(prototype!==Object.prototype&&prototype!==null)denied();
 const descriptors=Object.getOwnPropertyDescriptors(signal),keys=Reflect.ownKeys(descriptors);
 if(keys.length!==signalFields.length||keys.some(key=>typeof key!=='string'||!signalFields.includes(key)))denied();
 const snapshot={};
 for(const field of signalFields){const d=descriptors[field];if(!d||!Object.hasOwn(d,'value')||!d.enumerable)denied();snapshot[field]=d.value;}
 if(typeof authorizedProjectRef!=='string'||!new RegExp(HASH).test(authorizedProjectRef)||snapshot.projectRef!==authorizedProjectRef)denied();
 if(['version','eventId','projectRef','kind','observedAt'].some(field=>typeof snapshot[field]!=='string'))denied();
 const value=validateDossierSignal(snapshot);
 return {eventId:value.eventId,name:definition.name,timestamp:value.observedAt,data:{projectRef:value.projectRef,revision:value.revision,kind:value.kind},cursor:null};
}
