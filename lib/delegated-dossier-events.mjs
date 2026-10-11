import {z} from 'zod';
import {getDossierMcpEventDefinition} from './dossier-mcp-event.mjs';

const hash=/^[0-9a-f]{64}$/;
const denied=()=>{throw Error('Private MCP events unavailable');};
const argumentsSchema=z.object({projectRef:z.string().regex(hash)}).strict();
const deliverySchema=z.object({mode:z.literal('webhook'),url:z.string().min(1).max(2048)}).strict();
const common={name:z.literal('afw.dossier.changed'),arguments:argumentsSchema};
const receiptSchema=z.object({id:z.string(),refreshBefore:z.string(),cursor:z.null(),truncated:z.boolean()}).strict();
const safe=fn=>async params=>{try{return await fn(params);}catch{denied();}};

/** Source-only private protocol adapter. The host supplies an authority bound to
 * this authenticated OAuth request, separate original monitoring consent and a
 * dedicated durable QA namespace. Its list() returns one live projectRef or null;
 * subscribe/unsubscribe must reauthorize internally, including during awaits.
 * This registrar neither validates bearer tokens nor creates consent, storage,
 * custody or a transport. Never mount on the public MCP or share customer state.
 */
export function registerDelegatedDossierEvents(server,authority) {
 if(!server?.server||!authority||['list','subscribe','unsubscribe'].some(k=>typeof authority[k]!=='function'))denied();
 const selector=async()=>{const value=await authority.list();if(value!==null&&(typeof value!=='string'||!hash.test(value)))denied();return value;};
 server.server.registerCapabilities({events:{}});
 server.server.setRequestHandler('events/list',{
  params:z.object({}).strict(),result:z.object({events:z.array(z.any())}).strict(),
 },safe(async()=>{
  const projectRef=await selector();if(projectRef===null)return {events:[]};
  const definition=getDossierMcpEventDefinition();definition.inputSchema.properties.projectRef.enum=[projectRef];
  return {events:[definition]};
 }));
 server.server.setRequestHandler('events/subscribe',{
  params:z.object({...common,delivery:deliverySchema.extend({secret:z.string().min(1).max(1024)}),ttlMs:z.number().int().positive().nullable().optional(),cursor:z.null().optional()}).strict(),
  result:receiptSchema,
 },safe(async params=>{
  const projectRef=await selector();if(projectRef===null||params.arguments.projectRef!==projectRef)denied();
  return receiptSchema.parse(await authority.subscribe(params));
 }));
 server.server.setRequestHandler('events/unsubscribe',{
  params:z.object({...common,delivery:deliverySchema}).strict(),result:z.object({}).strict(),
 },safe(async params=>{
  // No live monitoring catalog required for withdrawal. Authority still checks
  // the authenticated principal/resource/project; expired OAuth is never valid.
  return z.object({}).strict().parse(await authority.unsubscribe(params));
 }));
}
