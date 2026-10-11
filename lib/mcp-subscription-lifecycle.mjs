import {createHash,createHmac,createCipheriv,createDecipheriv,randomBytes,timingSafeEqual,hkdfSync} from 'node:crypto';
import {parseMcpCallbackUrl} from './mcp-callback-network.mjs';
import {sendSignedMcpCallback} from './mcp-callback-transport.mjs';
import {signMcpVerification,matchesMcpVerificationReply,signDossierMcpEvent} from './mcp-signed-envelope.mjs';
import {buildDossierMcpEvent} from './dossier-mcp-event.mjs';
const PREFIX='afw-mcp-subscription/v1:',SHA=/^[0-9a-f]{64}$/;
const fail=()=>{throw Error('MCP subscription unavailable');};
const digest=value=>createHash('sha256').update(value).digest('hex');
const time=t=>Number.isSafeInteger(t)&&t>=0&&t<=8640000000000000;
function snapshot(value,required,optional=[]){
 if(!value||Object.getPrototypeOf(value)!==Object.prototype)fail();
 const ds=Object.getOwnPropertyDescriptors(value),keys=Reflect.ownKeys(ds);
 if(keys.some(k=>typeof k!=='string'||![...required,...optional].includes(k))||required.some(k=>!Object.hasOwn(ds,k)))fail();
 const out={};for(const k of keys){if(!Object.hasOwn(ds[k],'value')||!ds[k].enumerable)fail();out[k]=ds[k].value;}return out;
}
function requestSnapshot(value,subscribe){
 const p=snapshot(value,['name','arguments','delivery'],subscribe?['ttlMs','cursor']:[]),args=snapshot(p.arguments,['projectRef']);
 const delivery=snapshot(p.delivery,['mode','url',...(subscribe?['secret']:[])]);
 if(p.name!=='afw.dossier.changed'||typeof args.projectRef!=='string'||!SHA.test(args.projectRef)||delivery.mode!=='webhook'||p.cursor!==undefined&&p.cursor!==null)fail();
 const dest=parseMcpCallbackUrl(delivery.url),url='https://'+dest.hostname+dest.path;
 const ttl=p.ttlMs===undefined||p.ttlMs===null?600000:p.ttlMs;
 if(!Number.isSafeInteger(ttl)||ttl<1)fail();
 if(subscribe)signMcpVerification(Buffer.alloc(32).toString('base64url'),'validate','validate',delivery.secret,0);
 return {...args,name:p.name,url,secret:delivery.secret,ttl:Math.min(ttl,600000)};
}
function authorization(value){
 const a=snapshot(value,['principalRef','resourceRef','projectRef','permissionRef','enabled','expiresAt']);
 if(['principalRef','resourceRef','projectRef','permissionRef'].some(k=>typeof a[k]!=='string'||!SHA.test(a[k]))||typeof a.enabled!=='boolean'||!time(a.expiresAt))fail();return a;
}
const pins=['principalRef','resourceRef','projectRef','permissionRef'];
const publicReceipt=r=>Object.freeze({id:r.id,refreshBefore:new Date(r.expiresAt).toISOString(),cursor:null,truncated:false});

/** Private finite own-QA controller. ONE dedicated storage namespace admits
 * one challenge and one delivery globally; never use a shared customer store.
 * Resolver, storage namespace, key and sender
 * are trusted host dependencies, never parameters from an MCP request. No mount
 * or proof of original identity/consent/callback/cloud execution is established. */
export function createMcpSubscriptionController({storage,readAuthorization,custodyKey,send=sendSignedMcpCallback,now=Date.now}={}){
 if(!Buffer.isBuffer(custodyKey)||custodyKey.length!==32||typeof storage?.transaction!=='function'||typeof readAuthorization!=='function'||typeof send!=='function'||typeof now!=='function')fail();
 const master=Buffer.from(custodyKey),key=Buffer.from(hkdfSync('sha256',master,PREFIX,'encryption',32)),macKey=Buffer.from(hkdfSync('sha256',master,PREFIX,'record-authentication',32)),transportKey=Buffer.from(hkdfSync('sha256',master,PREFIX,'transport-encryption',32));master.fill(0);let last=-1;
 const inFlight=new Map();
 const clock=()=>{const t=now();if(!time(t)||t<last)fail();last=t;return t;};
 const mac=(r,purpose='record')=>createHmac('sha256',macKey).update(PREFIX+purpose+':'+JSON.stringify(r)).digest('hex');
 const budgetKey=PREFIX+'own-qa-budget';
 const saveBudget=async(tx,r)=>{const {seal:ignored,...body}=r;void ignored;await tx.put(budgetKey,{...body,seal:mac(body,'qa-budget')});};
 const readBudget=async tx=>{
  const raw=await tx.get(budgetKey);clock();if(raw===undefined)return null;
  const r=snapshot(raw,['version','subscriptionId','generation','createdAt','deadline','deliveryStartedAt','eventId','seal']);
  const {seal,...body}=r;if(typeof seal!=='string'||!SHA.test(seal)||!timingSafeEqual(Buffer.from(seal,'hex'),Buffer.from(mac(body,'qa-budget'),'hex')))fail();
  if(r.version!==1||!/^sub_[0-9a-f]{64}$/.test(r.subscriptionId)||!SHA.test(r.generation)||!time(r.createdAt)||r.createdAt>clock()||!time(r.deadline)||r.deadline<=r.createdAt||r.deadline-r.createdAt>600000||r.deliveryStartedAt===null&&r.eventId!==null||r.deliveryStartedAt!==null&&(!time(r.deliveryStartedAt)||r.deliveryStartedAt<r.createdAt||r.deliveryStartedAt>=r.deadline||r.deliveryStartedAt>clock()||typeof r.eventId!=='string'||!SHA.test(r.eventId)))fail();return body;
 };
 const save=async(tx,r)=>{const {seal:ignored,...body}=r;void ignored;await tx.put(PREFIX+r.id,{...body,seal:mac(body)});};
 const read=async(tx,id)=>{
  const raw=await tx.get(PREFIX+id);clock();if(raw===undefined)return null;
  const r=snapshot(raw,['id','principalRef','resourceRef','projectRef','permissionRef','selectorRef','secretRef','generation','cipher','state','createdAt','expiresAt','deadline','verifiedAt','deliveryStartedAt','eventId','receipt','seal']);
  const {seal,...body}=r;if(typeof seal!=='string'||!SHA.test(seal)||!timingSafeEqual(Buffer.from(seal,'hex'),Buffer.from(mac(body),'hex')))fail();
  if(r.id!==id||!/^sub_[0-9a-f]{64}$/.test(id)||!['pending','active','withdrawn'].includes(r.state)||pins.some(k=>!SHA.test(r[k]))||!SHA.test(r.selectorRef)||!SHA.test(r.secretRef)||!SHA.test(r.generation)||!time(r.createdAt)||!time(r.expiresAt)||!time(r.deadline)||r.createdAt>clock()||r.expiresAt<=r.createdAt||r.expiresAt>r.deadline||r.deadline-r.createdAt>600000||r.verifiedAt!==null&&(!time(r.verifiedAt)||r.verifiedAt<r.createdAt||r.verifiedAt>clock())||r.deliveryStartedAt!==null&&(!time(r.deliveryStartedAt)||r.deliveryStartedAt<r.createdAt||r.deliveryStartedAt>clock()))fail();
  const budget=await readBudget(tx);if(!budget||budget.subscriptionId!==id||['generation','createdAt','deadline','deliveryStartedAt','eventId'].some(k=>budget[k]!==r[k]))fail();return body;
 };
 const encrypt=(id,generation,url,secret)=>{
  const iv=randomBytes(12),cipher=createCipheriv('aes-256-gcm',key,iv);cipher.setAAD(Buffer.from(PREFIX+id+':'+generation));
  const data=Buffer.concat([cipher.update(JSON.stringify({url,secret}),'utf8'),cipher.final()]);return {iv:iv.toString('base64'),tag:cipher.getAuthTag().toString('base64'),data:data.toString('base64')};
 };
 const decrypt=r=>{
  const c=snapshot(r.cipher,['iv','tag','data']);for(const k of ['iv','tag','data'])if(typeof c[k]!=='string'||c[k].length>4096||Buffer.from(c[k],'base64').toString('base64')!==c[k])fail();
  const iv=Buffer.from(c.iv,'base64'),tag=Buffer.from(c.tag,'base64');if(iv.length!==12||tag.length!==16)fail();
  const decipher=createDecipheriv('aes-256-gcm',key,iv);decipher.setAAD(Buffer.from(PREFIX+r.id+':'+r.generation));decipher.setAuthTag(tag);
  const payload=snapshot(JSON.parse(Buffer.concat([decipher.update(Buffer.from(c.data,'base64')),decipher.final()]).toString('utf8')),['url','secret']);
  if(typeof payload.url!=='string'||typeof payload.secret!=='string'||digest(payload.url)!==r.selectorRef||digest(payload.secret)!==r.secretRef)fail();return payload;
 };
 const auth=async()=>{clock();const a=authorization(await readAuthorization());clock();return a;};
 const current=async(a,r)=>{const b=await auth();if(pins.some(k=>b[k]!==a[k]||r&&b[k]!==r[k])||!b.enabled||clock()>=b.expiresAt||r&&(r.state==='withdrawn'||clock()>=r.expiresAt||r.expiresAt>b.expiresAt))fail();return b;};
 const identity=(a,p)=>'sub_'+digest(JSON.stringify({principalRef:a.principalRef,resourceRef:a.resourceRef,projectRef:p.projectRef,name:p.name,url:p.url}));
 const transportSlot=(r,phase)=>PREFIX+'transport:'+r.id+':'+phase;
 const saveTransport=async(tx,r)=>{const {seal:ignored,...body}=r;void ignored;await tx.put(transportSlot(r,r.phase),{...body,seal:mac(body,'transport-record')});};
 const readTransport=async(tx,r,phase)=>{
  const raw=await tx.get(transportSlot(r,phase));if(!raw)fail();
  const t=snapshot(raw,['version','id','generation','phase','eventId','preparedAt','expiresAt','consumedAt','digest','cipher','seal']);const {seal,...body}=t;
  if(typeof seal!=='string'||!SHA.test(seal)||!timingSafeEqual(Buffer.from(seal,'hex'),Buffer.from(mac(body,'transport-record'),'hex'))||t.version!==1||t.id!==r.id||t.generation!==r.generation||t.phase!==phase||t.eventId!==(phase==='verification'?null:r.eventId)||!time(t.preparedAt)||t.preparedAt>clock()||!time(t.expiresAt)||t.expiresAt<=t.preparedAt||t.expiresAt-t.preparedAt>5000||t.expiresAt>r.expiresAt||clock()>=t.expiresAt||typeof t.digest!=='string'||!SHA.test(t.digest)||t.consumedAt!==null&&(!time(t.consumedAt)||t.consumedAt<t.preparedAt||t.consumedAt>=t.expiresAt||t.consumedAt>clock()))fail();return body;
 };
 const decryptTransport=t=>{
  const c=snapshot(t.cipher,['iv','tag','data']);for(const k of ['iv','tag','data'])if(typeof c[k]!=='string'||c[k].length>1000000||Buffer.from(c[k],'base64').toString('base64')!==c[k])fail();
  const iv=Buffer.from(c.iv,'base64'),tag=Buffer.from(c.tag,'base64');if(iv.length!==12||tag.length!==16)fail();
  const decipher=createDecipheriv('aes-256-gcm',transportKey,iv);decipher.setAAD(Buffer.from(PREFIX+'transport:'+t.id+':'+t.generation+':'+t.phase));decipher.setAuthTag(tag);
  const bytes=Buffer.concat([decipher.update(Buffer.from(c.data,'base64')),decipher.final()]).toString('utf8');if(digest(bytes)!==t.digest)fail();
  const p=snapshot(JSON.parse(bytes),['url','envelope']),e=snapshot(p.envelope,['body','headers']);
  if(typeof p.url!=='string'||typeof e.body!=='string'||!e.headers||Object.getPrototypeOf(e.headers)!==Object.prototype)fail();return {url:p.url,envelope:Object.freeze({...e,headers:Object.freeze({...e.headers})})};
 };
 const sendOnce=async(r,payload,envelope)=>{
  const phase=envelope.headers['webhook-id']==='verify_'+r.generation?'verification':'delivery',a=await auth();
  const live=async tx=>{const s=await read(tx,r.id);if(!s||s.generation!==r.generation||s.eventId!==r.eventId||s.deliveryStartedAt!==r.deliveryStartedAt||s.state!==(phase==='verification'?'pending':'active'))fail();await current(a,s);return s;};
  // Persist original signed bytes before a transport invocation. Both durable
  // transactions require their first ACK; an unknown ACK never reconstructs it.
  const prepared=await storage.transaction(async tx=>{
   const s=await live(tx);if(await tx.get(transportSlot(s,phase))!==undefined)fail();
   const preparedAt=clock(),expiresAt=Math.min(preparedAt+5000,s.expiresAt),bytes=JSON.stringify({url:payload.url,envelope});
   const iv=randomBytes(12),cipher=createCipheriv('aes-256-gcm',transportKey,iv);cipher.setAAD(Buffer.from(PREFIX+'transport:'+s.id+':'+s.generation+':'+phase));
   const encrypted=Buffer.concat([cipher.update(bytes,'utf8'),cipher.final()]);
   const t={version:1,id:s.id,generation:s.generation,phase,eventId:phase==='verification'?null:s.eventId,preparedAt,expiresAt,consumedAt:null,digest:digest(bytes),cipher:{iv:iv.toString('base64'),tag:cipher.getAuthTag().toString('base64'),data:encrypted.toString('base64')}};
   await saveTransport(tx,t);await current(a,s);return t;
  });
  await storage.transaction(async tx=>{const s=await live(tx),t=await readTransport(tx,s,phase);if(t.consumedAt!==null||t.digest!==prepared.digest)fail();await saveTransport(tx,{...t,consumedAt:clock()});await current(a,s);});
  const ready=await storage.transaction(async tx=>{const s=await live(tx),t=await readTransport(tx,s,phase);if(t.consumedAt===null||t.digest!==prepared.digest)fail();const p=decryptTransport(t);if(digest(p.url)!==s.selectorRef)fail();await current(a,s);return {payload:p,expiresAt:t.expiresAt};});
  // The read ACK can itself be delayed. Observe terminal state again after it,
  // then re-read the original permission outside the transaction's ACK await.
  const final=await storage.transaction(async tx=>{const s=await live(tx),t=await readTransport(tx,s,phase);if(t.consumedAt===null||t.digest!==prepared.digest)fail();return s;});
  await current(a,final);
  const remaining=ready.expiresAt-clock();if(remaining<=0)fail();
  const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),remaining);inFlight.set(r.id,controller);
  try{return await send(ready.payload.url,ready.payload.envelope,controller.signal);}finally{clearTimeout(timer);if(inFlight.get(r.id)===controller)inFlight.delete(r.id);}
 };
 const liveReceipt=async(a,id,generation)=>storage.transaction(async tx=>{const r=await read(tx,id);if(!r||r.state!=='active'||r.generation!==generation)fail();await current(a,r);return publicReceipt(r);});
 const safe=fn=>async(...args)=>{try{return await fn(...args);}catch{fail();}};
 return Object.freeze({
  subscribe:safe(async value=>{
   const p=requestSnapshot(value,true),a=await auth();if(a.projectRef!==p.projectRef)fail();await current(a);
   const id=identity(a,p),challenge=randomBytes(32).toString('base64url'),generation=randomBytes(32).toString('hex');
   const prepared=await storage.transaction(async tx=>{
    await current(a);const old=await read(tx,id);
    if(old){await current(a,old);if(old.state!=='active'||old.secretRef!==digest(p.secret))fail();decrypt(old);const expiresAt=Math.min(clock()+p.ttl,old.deadline,a.expiresAt);const refreshed={...old,expiresAt};await current(a,refreshed);await save(tx,refreshed);await current(a,refreshed);return {record:refreshed,first:false};}
    // One trusted storage namespace is one own-QA attempt, not a customer pool.
    // The terminal global holder never resets for a new callback or principal.
    if(await readBudget(tx))fail();
    const createdAt=clock(),deadline=Math.min(createdAt+600000,a.expiresAt),expiresAt=Math.min(createdAt+p.ttl,deadline);
    const record={id,...Object.fromEntries(pins.map(k=>[k,a[k]])),selectorRef:digest(p.url),secretRef:digest(p.secret),generation,cipher:encrypt(id,generation,p.url,p.secret),state:'pending',createdAt,expiresAt,deadline,verifiedAt:null,deliveryStartedAt:null,eventId:null,receipt:null};
    await saveBudget(tx,{version:1,subscriptionId:id,generation,createdAt,deadline,deliveryStartedAt:null,eventId:null});await save(tx,record);await current(a,record);return {record,first:true};
   });
   await current(a,prepared.record);
   if(!prepared.first)return liveReceipt(a,id,prepared.record.generation);
   const ready=await storage.transaction(async tx=>{const r=await read(tx,id);if(!r||r.state!=='pending'||r.generation!==generation)fail();await current(a,r);return r;});
   const payload=decrypt(ready),reply=await sendOnce(ready,payload,signMcpVerification(challenge,'verify_'+generation,id,payload.secret,clock()));
   if(!matchesMcpVerificationReply(challenge,reply?.status,reply?.body))fail();
   const active=await storage.transaction(async tx=>{const r=await read(tx,id);if(!r||r.state!=='pending'||r.generation!==generation)fail();await current(a,r);const updated={...r,state:'active',verifiedAt:clock()};await save(tx,updated);await current(a,updated);return updated;});
   await current(a,active);return liveReceipt(a,id,active.generation);
  }),
  unsubscribe:safe(async value=>{
   const p=requestSnapshot(value,false),a=await auth();if(a.projectRef!==p.projectRef)fail();const id=identity(a,p);
   await storage.transaction(async tx=>{const r=await read(tx,id);if(!r)return;const check=async()=>{const b=await auth();if(['principalRef','resourceRef','projectRef'].some(k=>b[k]!==a[k]||r[k]!==a[k]))fail();};await check();if(r.state!=='withdrawn')await save(tx,{...r,state:'withdrawn'});await check();});inFlight.get(id)?.abort();return Object.freeze({});
  }),
  deliver:safe(async(id,signal)=>{
   if(typeof id!=='string'||!/^sub_[0-9a-f]{64}$/.test(id))fail();const source=Object.freeze(snapshot(signal,['version','eventId','projectRef','revision','kind','observedAt']));const a=await auth();
   const event=buildDossierMcpEvent(source,a.projectRef);
   const claimed=await storage.transaction(async tx=>{const r=await read(tx,id);if(!r||r.state!=='active'||r.deliveryStartedAt!==null||Date.parse(event.timestamp)<r.createdAt||Date.parse(event.timestamp)>clock())fail();await current(a,r);const payload=decrypt(r);const updated={...r,eventId:event.eventId,deliveryStartedAt:clock()},budget=await readBudget(tx);if(!budget||budget.deliveryStartedAt!==null)fail();await saveBudget(tx,{...budget,eventId:updated.eventId,deliveryStartedAt:updated.deliveryStartedAt});await save(tx,updated);await current(a,updated);return {r:updated,payload};});
   await current(a,claimed.r);
   const ready=await storage.transaction(async tx=>{const r=await read(tx,id);if(!r||r.state!=='active'||r.generation!==claimed.r.generation||r.eventId!==event.eventId||r.deliveryStartedAt!==claimed.r.deliveryStartedAt)fail();await current(a,r);return {r,payload:decrypt(r)};});
   const reply=await sendOnce(ready.r,ready.payload,signDossierMcpEvent(source,a.projectRef,id,ready.payload.secret,clock()));
   if(!Number.isInteger(reply?.status)||reply.status<200||reply.status>299)fail();
   const receipt=await storage.transaction(async tx=>{const r=await read(tx,id);if(!r||r.state!=='active'||r.generation!==claimed.r.generation||r.eventId!==event.eventId)fail();await current(a,r);const receipt={status:reply.status,httpReceivedAt:clock()};await save(tx,{...r,receipt});await current(a,r);return receipt;});
   return Object.freeze({eventId:event.eventId,...receipt,cloudReviewConfirmed:false});
  }),
 });
}
