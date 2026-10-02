import { runPublicAudit } from './public-audit.mjs';
import { normalizePublicUrl } from './methodology.mjs';
import { isPrivateIp } from './scanner.mjs';
import { buildScanActionPlan } from './scan-action-plan.mjs';

// Internal preparation only: no route or Agent Card is published by this module.
// A2A 1.0 JSON-RPC, synchronous Message response; no task store or private data.
export const DIAGNOSTIC_A2A_VERSION = '1.0';
const object = value => value !== null && typeof value === 'object' && !Array.isArray(value);
const keys = (value, allowed) => Object.keys(value).every(key => allowed.includes(key));
const error = (id, code, message) => ({ jsonrpc:'2.0', id, error:{code,message} });

export function createDiagnosticAgent({audit=runPublicAudit,id=()=>crypto.randomUUID(),maxConcurrent=2,timeoutMs=12000}={}) {
 if (!Number.isInteger(maxConcurrent) || maxConcurrent<1 || maxConcurrent>4) throw new Error('Invalid concurrency limit');
 if (!Number.isInteger(timeoutMs) || timeoutMs<1 || timeoutMs>15000) throw new Error('Invalid diagnostic timeout');
 let active=0;
 return {async handle(request,version=DIAGNOSTIC_A2A_VERSION) {
  const requestId=object(request) && (typeof request.id==='string' || (typeof request.id==='number' && Number.isFinite(request.id))) ? request.id : null;
  if (!object(request) || request.jsonrpc!=='2.0' || requestId===null) return error(null,-32600,'Invalid request');
  if (version!==DIAGNOSTIC_A2A_VERSION) return error(requestId,-32009,'Version not supported');
  if (request.method!=='SendMessage') return error(requestId,-32601,'Method not found');
  const params=request.params, message=params?.message;
  if (!object(params) || !keys(params,['message']) || !object(message) || !keys(message,['messageId','role','parts']) ||
      typeof message.messageId!=='string' || !message.messageId.length || message.messageId.length>128 || message.role!=='ROLE_USER' ||
      !Array.isArray(message.parts) || message.parts.length!==1) return error(requestId,-32602,'Expected a new public diagnostic message');
  const part=message.parts[0];
  if (!object(part) || !keys(part,['data','mediaType']) || (part.mediaType && part.mediaType!=='application/json') ||
      !object(part.data) || !keys(part.data,['url','locale']) || typeof part.data.url!=='string' || part.data.url.length>2000 ||
      (part.data.locale!==undefined && !['es','en','pt'].includes(part.data.locale))) return error(requestId,-32602,'Expected structured public URL and optional locale');
  let target;
  try {target=normalizePublicUrl(part.data.url);if (isPrivateIp(new URL(target).hostname)) throw new Error('Private target');}
  catch {return error(requestId,-32602,'Expected a public website without credentials');}
  if (active>=maxConcurrent) return error(requestId,-32000,'Diagnostic capacity reached');
  active++;
  const controller=new AbortController();
  const timer=setTimeout(()=>controller.abort(),timeoutMs);
  try {
   // The existing audit retains DNS, redirect, timeout and response-size protections.
   const auditResult=await audit(target,{signal:controller.signal});
   controller.signal.throwIfAborted();
   const plan=buildScanActionPlan(auditResult,part.data.locale||'es');
   return {jsonrpc:'2.0',id:requestId,result:{message:{messageId:id(),contextId:id(),role:'ROLE_AGENT',parts:[{data:{
    audit:auditResult,plan,publicationAuthorized:false,
   },mediaType:'application/json'}]}}};
  } catch {return error(requestId,-32603,'Diagnostic unavailable');}
  finally {clearTimeout(timer);active--;}
 }};
}
