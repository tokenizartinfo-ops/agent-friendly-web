import {createHmac,hkdfSync,randomBytes,timingSafeEqual} from 'node:crypto';

const prefix='afw.node-readiness.v1:',sha=/^[0-9a-f]{64}$/;
const fields=['containerId','processGeneration','programHash','sourceRevision','image','createdAt','expiresAt'];
const fail=()=>{throw Error('Node readiness unavailable');};
const time=t=>Number.isSafeInteger(t)&&t>=0;
function exact(value,names){
 if(!value||Object.getPrototypeOf(value)!==Object.prototype)fail();
 const d=Object.getOwnPropertyDescriptors(value),keys=Reflect.ownKeys(d);
 if(keys.length!==names.length||keys.some(k=>typeof k!=='string'||!names.includes(k)||!Object.hasOwn(d[k],'value')||!d[k].enumerable))fail();
 return Object.fromEntries(names.map(k=>[k,d[k].value]));
}

/** Private service-capability proof. The host still must observe the original
 * platform process and resolve original permission; a signature alone is neither. */
export function createNodeReadiness(options){
 const o=exact(options,['key','manifest','now']),m=Object.freeze(exact(o.manifest,fields));
 if(!Buffer.isBuffer(o.key)||o.key.length!==32||typeof o.now!=='function'||fields.slice(0,3).some(k=>typeof m[k]!=='string'||!sha.test(m[k]))||typeof m.sourceRevision!=='string'||!/^[0-9a-f]{40}$/.test(m.sourceRevision)||m.image!=='cloudflare/debian-trixie'||!time(m.createdAt)||!time(m.expiresAt)||m.expiresAt<=m.createdAt||m.expiresAt-m.createdAt>600000)fail();
 const keys=Object.fromEntries(['request','response'].map(p=>[p,Buffer.from(hkdfSync('sha256',o.key,prefix,p,32))]));let last=-1;
 const clock=()=>{const t=o.now();if(!time(t)||t<last||t<m.createdAt||t>=m.expiresAt)fail();last=t;return t;};clock();
 const mac=(role,body)=>createHmac('sha256',keys[role]).update(prefix+role+':'+body).digest('hex');
 const sign=(role,challenge)=>{const body=JSON.stringify({version:1,purpose:prefix+role,manifest:m,challenge});return Object.freeze({body,signature:mac(role,body)});};
 const verify=(role,packet)=>{
  const t=clock(),p=exact(packet,['body','signature']);
  if(typeof p.body!=='string'||Buffer.byteLength(p.body)>2048||typeof p.signature!=='string'||!sha.test(p.signature)||!timingSafeEqual(Buffer.from(p.signature,'hex'),Buffer.from(mac(role,p.body),'hex')))fail();
  const v=exact(JSON.parse(p.body),['version','purpose','manifest','challenge']),manifest=exact(v.manifest,fields),c=exact(v.challenge,['nonce','issuedAt','expiresAt']);
  if(JSON.stringify(v)!==p.body||v.version!==1||v.purpose!==prefix+role||JSON.stringify(manifest)!==JSON.stringify(m)||typeof c.nonce!=='string'||!sha.test(c.nonce)||!time(c.issuedAt)||!time(c.expiresAt)||c.issuedAt<m.createdAt||c.issuedAt-t>1000||c.expiresAt<=c.issuedAt||c.expiresAt-c.issuedAt>5000||c.expiresAt>m.expiresAt||t>=c.expiresAt)fail();
  return Object.freeze(c);
 };
 return Object.freeze({
  probe(){const t=clock(),c=Object.freeze({nonce:randomBytes(32).toString('hex'),issuedAt:t,expiresAt:Math.min(t+5000,m.expiresAt)});let spent=false;return Object.freeze({request:sign('request',c),accept(packet){if(spent)fail();spent=true;const returned=verify('response',packet);if(JSON.stringify(returned)!==JSON.stringify(c))fail();return Object.freeze({...m,running:true});}});},
  respond(packet){const c=verify('request',packet);return sign('response',c);},
 });
}
