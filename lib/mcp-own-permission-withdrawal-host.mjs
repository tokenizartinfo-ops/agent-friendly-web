import {createHash} from 'node:crypto';
import {readDossierEventHostPolicy} from './dossier-event-rpc-authority.mjs';
import {createOwnPermissionWithdrawal} from './mcp-own-permission-withdrawal.mjs';

const fail = () => { throw Error('Private permission withdrawal unavailable'); };
const hex = (value, size) => typeof value === 'string' && new RegExp('^[0-9a-f]{' + size + '}$').test(value);
const time = value => Number.isSafeInteger(value) && value >= 0 && value <= 8640000000000000;
const fields = (value, keys) => {
 if (!value || Object.getPrototypeOf(value) !== Object.prototype || Reflect.ownKeys(value).length !== keys.length) fail();
 const result = {};
 for (const key of keys) {
  const d = Object.getOwnPropertyDescriptor(value, key);
  if (!d?.enumerable || !Object.hasOwn(d, 'value')) fail();
  result[key] = d.value;
 }
 return Object.freeze(result);
};
const names = ['AFW_DOSSIER_PERMISSION_WITHDRAWAL_ENABLED','AFW_DOSSIER_PERMISSION_WITHDRAWAL_POLICY',
 'AFW_DOSSIER_EVENTS_CUSTODY_KEY','AFW_DOSSIER_EVENTS_PROJECTION_SECRET'];

/** Private original-DO reduction host. No public route, user selectors, native
 * unsubscribe, new consent, runtime launch or physical-stop certification.
 * Worker code supplies only its own historical close callback.
 */
export async function withdrawOwnPermissions(options) {
 let finished = false, timer;
 try {
  const o = fields(options, ['env','ctx','program','sourceRevision','close','now']);
  const {env,ctx,program,sourceRevision,close,now} = o;
  if (!env || env.AFW_DOSSIER_PERMISSION_WITHDRAWAL_ENABLED !== 'true' ||
   typeof now !== 'function' || typeof close !== 'function' || typeof program !== 'string' ||
   !program.length || !hex(sourceRevision,40)) fail();
  const entry = now(), mono = performance.now();
  if (!time(entry) || !Number.isFinite(mono)) fail();
  const pins = Object.freeze(Object.fromEntries(names.map(name => [name,env[name]])));
  const raw = pins.AFW_DOSSIER_PERMISSION_WITHDRAWAL_POLICY;
  if (typeof raw !== 'string' || raw.length > 4096) fail();
  const policy = fields(JSON.parse(raw), ['purpose','requestId','startAt','expiresAt','originalConsent',
   'containerId','programHash','sourceRevision']);
  const consent = fields(policy.originalConsent, ['sequence','revision','issuedAt','expiresAt']);
  if (policy.purpose !== 'afw.private-permission-withdrawal.v1' ||
   !hex(policy.containerId,64) || !hex(policy.programHash,64) ||
   policy.programHash !== createHash('sha256').update(program).digest('hex') || policy.sourceRevision !== sourceRevision ||
   !time(policy.startAt) || !time(policy.expiresAt) || policy.expiresAt <= policy.startAt ||
   policy.expiresAt-policy.startAt > 600000 || entry < policy.startAt || entry >= policy.expiresAt) fail();
  const original = readDossierEventHostPolicy({enabled:true,env,historical:true,now}), p = original.policy;
  const namespace = original.pins.AFW_DOSSIER_EVENTS_NODE, id = ctx?.id, storage = ctx?.storage, transaction = storage?.transaction;
  if (!['afw-own-event-one-occurrence-v1','afw-own-event-first-successor-v1'].includes(env.AFW_DOSSIER_EVENTS_NODE_NAME) ||
   typeof original.pins.DB.withSession !== 'function' || typeof transaction !== 'function' ||
   p.containerId !== policy.containerId || id?.toString() !== p.containerId ||
   namespace.idFromString(p.containerId).toString() !== p.containerId ||
   policy.startAt < p.startAt || policy.expiresAt > p.expiresAt + 600000 ||
   !time(consent.issuedAt) || !time(consent.expiresAt) || consent.issuedAt < p.startAt || consent.expiresAt > p.expiresAt) fail();
  const expiresAt = Math.min(policy.expiresAt,entry+30000), endMono = mono + (expiresAt-entry);
  let last = entry, lastMono = mono;
  const current = () => {
   const at = now(), m = performance.now();
   if (finished || !time(at) || at < last || at >= expiresAt || !Number.isFinite(m) ||
    m < lastMono || m >= endMono || !names.every(name => env[name] === pins[name]) ||
    ctx.id !== id || ctx.storage !== storage || storage.transaction !== transaction ||
    id.toString() !== p.containerId || namespace.idFromString(p.containerId).toString() !== p.containerId) fail();
   original.current();
   last = at; lastMono = m; return at;
  };
  current();
  const reduction = createOwnPermissionWithdrawal({
   enabled:true,db:original.pins.DB,
   context:{grantId:p.grantId,subject:p.subject,projectId:p.projectId,clientId:p.clientId,resource:p.resource},
   originalConsent:consent,window:{startAt:policy.startAt,expiresAt},requestId:policy.requestId,now:current,
   close:async signal => {
    current(); if (signal.aborted) fail();
    const result = await close(signal);
    current(); if (signal.aborted) fail();
    return result;
   }
  });
  const deadline = new Promise((_,reject) => {
   timer = setTimeout(() => { finished = true; reject(Error('Private permission withdrawal unavailable')); }, Math.max(1,endMono-performance.now()));
  });
  const result = await Promise.race([reduction.withdraw(),deadline]);
  current(); return result;
 } catch { fail(); }
 finally { finished = true; clearTimeout(timer); }
}
