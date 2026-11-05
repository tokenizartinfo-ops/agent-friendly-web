import {createHash} from 'node:crypto';
import {mkdir,writeFile,readFile} from 'node:fs/promises';
import {join} from 'node:path';
// Actual harness compiler evidence, never a separate compiler or source authority.
let bundleIndex=0;
export async function saveNoticeObservation(data){
 if(!process.env.AFW_NOTICE_BUNDLE_CAPTURE)return;
 const directory=join(process.env.RUNNER_TEMP,'afw-notice-get-bundles');await mkdir(directory,{recursive:true});
 await writeFile(join(directory,'principal-io-'+process.pid+'.json'),JSON.stringify(data));
}
export async function captureNoticeBundle(built,role,virtualSources={}){
 if(!process.env.AFW_NOTICE_BUNDLE_CAPTURE)return;
 const bytes=built.outputFiles[0].contents,sha256=createHash('sha256').update(bytes).digest('hex'),metafile=built.metafile;
 const inputs=await Promise.all(Object.entries(metafile.inputs).map(async([path,data])=>({path,bytes:data.bytes,imports:data.imports,virtual:path.startsWith('<'),sha256:path.startsWith('<')?(Object.hasOwn(virtualSources,path)?createHash('sha256').update(virtualSources[path]).digest('hex'):null):createHash('sha256').update(await readFile(path)).digest('hex'),hashKind:path.startsWith('<')?'actual-compile-option-text':'file-bytes'})));
 const data={role,bytes:bytes.length,sha256,inputs,metafile,graphSha256:createHash('sha256').update(JSON.stringify(metafile)).digest('hex')};
 const directory=join(process.env.RUNNER_TEMP,'afw-notice-get-bundles');await mkdir(directory,{recursive:true});
 await writeFile(join(directory,role+'-'+process.pid+'-'+(++bundleIndex)+'.json'),JSON.stringify(data));
 console.info('NOTICE actual compiler graph',JSON.stringify({role,bytes:bytes.length,sha256,inputs:inputs.length,noticeInputs:inputs.filter(x=>x.path.includes('notice-get')||x.path.includes('notice-journal')).map(x=>x.path)}));
}
// SYN negative corruption and factual observation only. No positive SQL producer.
export function extendFiniteOwnerNoticeGet(entry){
 const methods=String.raw`


 async noticeCorrelated(kind){
  // SYN negative DATA reseal only; original issuer/source/SQL facts never change.
  const all=[...await this.ctx.storage.list()],original=all.find(([k])=>k.startsWith('afw.finite-preparation-notice.v1:')&&k.endsWith(':reservation'));
  const key=original[0].slice(0,-'reservation'.length),r=JSON.parse(original[1]);
  if(kind==='event-sequence'){
   const ack=JSON.parse(await this.ctx.storage.get(key+'consent:ack'));await this.ctx.storage.put(key+'consent:ack',noticeEncode('Ack',noticeSeal('Ack',{...ack,sequence:ack.sequence+1})));
  }else{
   if(kind==='source-revision')r.identity=noticeIssuerSeal('Identity',{...r.identity,sourceRevision:r.identity.sourceRevision==='f'.repeat(40)?'e'.repeat(40):'f'.repeat(40)});
   else if(kind==='ticket-request')r.ticket.requestId='eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee';
   else{
    const fields={'issuer-reservation':'issuerReservationHash','original-grant-ack':'originalGrantAckHash','grant-link':'grantLinkHash','connection':'connectionHash'},field=fields[kind];if(!field)throw Error('SYN unknown correlated negative');
    r[field]=r[field]==='f'.repeat(64)?'e'.repeat(64):'f'.repeat(64);
   }
   const reservation=noticeSeal('Reservation',r);await this.ctx.storage.put(key+'reservation',noticeEncode('Reservation',reservation));
   const s=JSON.parse(await this.ctx.storage.get(key+'ticket:send'));
   const common={identity:reservation.identity,expectedGrant:reservation.expectedGrant,consumedAt:reservation.consumedAt,accessExpiresAt:s.accessExpiresAt,preconnectionExpiresAt:reservation.preconnectionExpiresAt,window:s.window};
   const send=noticeSeal('Send',{...s,identityHash:reservation.identity.identityHash,reservationHash:reservation.recordHash,requestHash:noticeHash('afw.finite-preparation-notice-request.v1',{operation:'ticket',common,ticket:reservation.ticket,decisionHash:null})});
   await this.ctx.storage.put(key+'ticket:send',noticeEncode('Send',send));
   const ack=JSON.parse(await this.ctx.storage.get(key+'ticket:ack'));await this.ctx.storage.put(key+'ticket:ack',noticeEncode('Ack',noticeSeal('Ack',{...ack,sendHash:send.recordHash})));
  }
  await this.ctx.storage.sync();
  const rows=[...await this.ctx.storage.list({prefix:key})];
  const codecRoundtrip=rows.every(([k,raw])=>{const name=k.slice(key.length),kind=name==='reservation'?'Reservation':name.endsWith(':send')?'Send':'Ack';return noticeEncode(kind,noticeDecode(kind,raw))===raw;});
  const root=createFiniteOwnerRequestLease(new Request('https://delegated-canary.agentfriendlyweb.dev/fixture/notice-read'));
  let journalValid=false;try{await noticeRealJournal({ctx:this.ctx,env:this.env}).read({preconnectionId:r.identity.preconnectionId},root.lease);journalValid=true;}finally{root.finish();}
  if(this.noticeState)this.noticeState.trace=[];
  return {codecRoundtrip,journalValid};
 }
 async noticeBodyStart(headers){
  this.noticeBodyState={cancelEntered:false,cancelSettled:false,response:null};
  const state=this.noticeBodyState,body=new ReadableStream({start(c){c.enqueue(new Uint8Array(1025));},cancel:()=>{state.cancelEntered=true;return new Promise(resolve=>{this.noticeBodyRelease=()=>{this.noticeBodyRelease=null;state.cancelSettled=true;resolve();};});}});
  const at=Date.now(),h=new Headers(headers);h.set('x-afw-finite-boundary',JSON.stringify({startedAt:at,deadline:at+30000,remainingMs:30000}));h.set('x-afw-finite-original-method','POST');h.set('x-afw-finite-original-url','https://delegated-canary.agentfriendlyweb.dev/monitoring/grant');h.set('x-afw-finite-version','77777777-7777-4777-8777-777777777777');h.set('x-afw-finite-request-id','77777777-7777-4777-8777-777777777777');
  const response=await createPrivateQaFiniteOwnerNoticeConsentReceiver({ctx:this.ctx,env:this.env}).fetch(new Request('https://afw-private.invalid/_finite-owner/monitoring/grant',{method:'POST',headers:h,body}));state.response=response.status;await response.body?.cancel();return {...state};
 }
 async noticeBodyRead(){return {...this.noticeBodyState};}
 async noticeBodyReleaseHeld(){this.noticeBodyRelease?.();}

 async noticeConfigure(mode='normal'){
  this.noticeRestore?.();globalThis.__noticeOwner=this;this.noticeMode=mode;this.noticeHeld=null;this.noticeRelease=null;
  const state=globalThis.__noticeState={trace:[],sql:[],ops:{get:0,list:0,sync:0,transaction:0,txGet:0,txList:0,txPut:0},lists:[],resolution:null};this.noticeState=state;
  const db=this.env.RELEASE_DB,sessionMethod=db.withSession,storage=this.ctx.storage,originals={get:storage.get,list:storage.list,sync:storage.sync,transaction:storage.transaction};
  for(const kind of ['get','list','sync'])storage[kind]=(...args)=>{state.ops[kind]++;if(kind==='list')state.lists.push({prefix:String(args[0]?.prefix??''),limit:args[0]?.limit??null});return Reflect.apply(originals[kind],storage,args);};
  storage.transaction=callback=>{state.ops.transaction++;return Reflect.apply(originals.transaction,storage,[async tx=>{
   const actual={get:tx.get,list:tx.list,put:tx.put};
   const wrapped={};for(const [name,method]of Object.entries(actual))wrapped[name]=(...args)=>{state.ops[{get:'txGet',list:'txList',put:'txPut'}[name]]++;return Reflect.apply(method,tx,args);};
   return callback(wrapped);
  }]);};
  db.withSession=constraint=>{
   const session=Reflect.apply(sessionMethod,db,[constraint]),prepare=session.prepare,record={constraint,queries:[]};state.sql.push(record);
   session.prepare=sql=>{
    const statement=Reflect.apply(prepare,session,[sql]),entry={sql,method:null};record.queries.push(entry);
    return {bind:(...args)=>{
     const bound=statement.bind(...args),run=async kind=>{
      entry.method=kind;entry.at=Date.now();
      const ticketInsert=sql.includes('INSERT INTO dossier_monitoring_owner_tickets')||sql.includes('INSERT INTO dossier_monitoring_consent_events');
      if(ticketInsert){state.sqlEnteredAt=Date.now();if(this.noticeMode==='queue'||this.noticeMode==='hold-before')await this.noticeGate('before-sql');}
      const actual=Reflect.apply(bound[kind],bound,[]),result=await actual;entry.doneAt=Date.now();
      if(ticketInsert){state.resolution={at:Date.now(),row:result!==null};if(this.noticeMode==='hold-after')await this.noticeGate('after-sql');if(this.noticeMode==='lost-sql')throw Error('SYN NEGATIVE actual SQL committed, result lost');}
      if(kind==='all'&&sql.endsWith('ORDER BY name LIMIT 8')&&this.noticeMode==='failed-schema-metadata')return {...result,success:false};
      if(kind==='all'&&sql.endsWith('ORDER BY name LIMIT 8')&&this.noticeMode==='malformed-schema-results')return {...result,results:{}};
      return result;
     };
     return {first:()=>run('first'),all:()=>run('all')};
    }};
   };return session;
  };
  this.noticeRestore=()=>{for(const [k,v]of Object.entries(originals))storage[k]=v;db.withSession=sessionMethod;};
 }
 async noticeGate(name){
  const state=this.noticeState;state.trace.push({gate:name,at:Date.now()});this.noticeHeld=name;
  await new Promise(resolve=>{this.noticeRelease=()=>{this.noticeRelease=null;this.noticeHeld=null;resolve();};});
 }
 async noticeReleaseHeld(){this.noticeRelease?.();}
 async noticeStateRead(){return {held:this.noticeHeld??null,mode:this.noticeMode,state:this.noticeState??null};}
 async noticeProbe(){
  const root=createFiniteOwnerRequestLease(new Request('https://delegated-canary.agentfriendlyweb.dev/fixture/notice-probe'));
  try{return await observeFiniteOwnerRequestWork({ctx:this.ctx,env:this.env,originalLease:root.lease},async()=>({allowed:true}));}catch{return {allowed:false};}finally{root.finish();}
 }
 async noticeFence(){
  const rows=[...await this.ctx.storage.list()],reservation=JSON.parse(rows.find(([k])=>k.startsWith('afw.finite-preparation-issuer.v1:')&&k.endsWith(':reservation'))[1]),parent=createFiniteOwnerRequestLease(new Request('https://delegated-canary.agentfriendlyweb.dev/fixture/notice-close'));
  try{return await phaseIssuerStore({ctx:this.ctx,env:this.env}).closeFence({identity:reservation.identity,window:{startedAt:Date.now(),deadline:Date.now()+4500},fenceRequestId:'22222222-2222-4222-8222-222222222222'},parent.lease);}finally{parent.finish();}
 }
 async noticeInspect(){
  const all=[...await this.ctx.storage.list()],capsule=JSON.parse(all.find(([k])=>k.endsWith(':capsule'))[1]),prefix='afw.finite-preparation-notice.v1:'+capsule.preconnectionId+':';
  const issuer=all.find(([k])=>k.startsWith('afw.finite-preparation-issuer.v1:'+capsule.preconnectionId+':')&&k.endsWith(':reservation')),identity=issuer?JSON.parse(issuer[1]).identity:null;
  const schema=(await this.env.RELEASE_DB.withSession('first-primary').prepare("SELECT type,name,tbl_name,sql FROM sqlite_schema WHERE tbl_name IN ('dossier_monitoring_consent_events','dossier_monitoring_owner_tickets') AND sql IS NOT NULL ORDER BY name LIMIT 8").bind().all()).results;
  const tickets=identity?(await this.env.RELEASE_DB.withSession('first-primary').prepare('SELECT handle_hash,request_id,user_id,grant_id,project_id,client_id,resource,purpose,action,revision,expected_sequence,issued_at,expires_at,permission_expires_at FROM dossier_monitoring_owner_tickets WHERE grant_id=? ORDER BY handle_hash LIMIT 2').bind(identity.grantId).all()).results:[];
  const events=identity?(await this.env.RELEASE_DB.withSession('first-primary').prepare('SELECT sequence,grant_id,project_id,user_id,client_id,resource,revision,action,purpose,request_id,issued_at,expires_at FROM dossier_monitoring_consent_events WHERE grant_id=? ORDER BY sequence LIMIT 3').bind(identity.grantId).all()).results:[];
  return {notice:all.filter(([k])=>k.startsWith(prefix)),schema,tickets,events};
 }
 async noticeCorrupt(kind){
  const all=[...await this.ctx.storage.list()],capsule=JSON.parse(all.find(([k])=>k.endsWith(':capsule'))[1]),prefix='afw.finite-preparation-notice.v1:'+capsule.preconnectionId+':';
  if(kind==='own-unknown')await this.ctx.storage.put(prefix+'unknown','SYN NEGATIVE unknown key');
  else if(kind==='foreign-unknown')await this.ctx.storage.put('afw.finite-preparation-notice.v1:'+'f'.repeat(64)+':unknown','SYN NEGATIVE foreign history');
 
  else if(kind==='overflow')for(let n=0;n<7;n++)await this.ctx.storage.put(prefix+'unknown'+n,'SYN NEGATIVE overflow');
  else if(kind==='ack-without-send')await this.ctx.storage.put(prefix+'ticket:ack','SYN NEGATIVE malformed ACK');
  else if(kind==='foreign-send')await this.ctx.storage.put(prefix+'ticket:send','SYN NEGATIVE malformed foreign SEND');
  else{
   const row=all.find(([k])=>k===prefix+'reservation'),reservation=row?JSON.parse(row[1]):null;
   if(!reservation)throw Error('SYN own reservation required');
   if(kind==='freeze')await this.ctx.storage.put(prefix+'freeze',noticeEncode('Freeze',noticeSeal('Freeze',{purpose:'afw.finite-preparation-notice-freeze.v1',identityHash:reservation.identity.identityHash,reservationHash:reservation.recordHash,frozenAt:Date.now()})));
   else if(kind==='row-hash'){
    const ack=JSON.parse(await this.ctx.storage.get(prefix+'ticket:ack'));delete ack.recordHash;
    await this.ctx.storage.put(prefix+'ticket:ack',noticeEncode('Ack',noticeSeal('Ack',{...ack,rowHash:'f'.repeat(64)})));
   }else if(['identity','grant-link','connection'].includes(kind)){
    delete reservation.recordHash;
    if(kind==='identity')reservation.identity={...reservation.identity,subject:'SYN NEGATIVE wrong subject'};
    if(kind==='grant-link')reservation.grantLinkHash='f'.repeat(64);
    if(kind==='connection')reservation.connectionHash='f'.repeat(64);
    // Identity corruption intentionally fails the accepted codec; never a positive producer.
    if(kind==='identity')await this.ctx.storage.put(prefix+'reservation',JSON.stringify(reservation));
    else await this.ctx.storage.put(prefix+'reservation',noticeEncode('Reservation',noticeSeal('Reservation',reservation)));
   }else throw Error('SYN unknown notice fault');
  }
  await this.ctx.storage.sync();
 }
 `;
 if(entry.split(' export class Initial extends FiniteClosure{').length!==2)throw Error('SYN notice class marker');
 return "import {initialHash as noticeHash} from './lib/mcp-qa-finite-initial-material-records.mjs';\nimport {sealFinitePreparationIssuerRecord as noticeIssuerSeal} from './lib/mcp-qa-finite-preparation-issuer-records.mjs';\nimport {createFinitePreparationNoticeJournal as noticeRealJournal} from './lib/mcp-qa-finite-preparation-notice-journal.mjs';\nimport {sealFinitePreparationNoticeRecord as noticeSeal,encodeFinitePreparationNoticeRecord as noticeEncode,decodeFinitePreparationNoticeRecord as noticeDecode} from './lib/mcp-qa-finite-preparation-notice-records.mjs';\n"+entry.replace(' export class Initial extends FiniteClosure{',' export class Initial extends FiniteClosure{'+methods);
}

// Read-only instrumentation of exact lexical source sites. SYN gates never supply authority.
export function instrumentFiniteNoticeGet(source){
 const postAt=source.indexOf('/** UNMOUNTED fixed human POST.'),post=postAt<0?'':source.slice(postAt);if(postAt>=0)source=source.slice(0,postAt);
 const marker='/** UNMOUNTED fixed GET.',at=source.indexOf(marker);
 if(at<0)throw Error('SYN notice handler marker');
 let head=source.slice(0,at),body=source.slice(at);
 const between="await ioCheckpoint('between');";
 if(head.split(between).length!==2)throw Error('SYN notice second snapshot marker');
 head=head.replace(between,between+"if(globalThis.__noticeOwner?.noticeMode==='drift'&&globalThis.__noticeState?.trace.at(-1)?.position==='ticket-sql-resolved')await globalThis.__noticeOwner.noticeGate('between-own');");

 const replace=(needle,next)=>{if(body.split(needle).length!==2)throw Error('SYN notice marker changed: '+needle);body=body.replace(needle,next);};
 replace("async function recheckNoticeGetOwned(){\n    check();","async function recheckNoticeGetOwned(){\n    globalThis.__noticeState?.trace.push({position,at:Date.now(),stage:'before'});check();");
 replace("if(canonical(pair.first)!==canonical(expected)||canonical(pair.second)!==canonical(expected))fail();","if(canonical(pair.first)!==canonical(expected)||canonical(pair.second)!==canonical(expected))fail();globalThis.__noticeState?.trace.push({position,at:Date.now(),stage:'after'});");
 replace("await recheckNoticeGetOwned();check();\n    position='ticket-sql-pending';","await recheckNoticeGetOwned();check();\n    position='ticket-sql-pending';");
 replace("const baseline=await wait(observeOwnerPhasePair({ctx,env,parent:originalLease})),context=qualifySettledOwnerPair(baseline);","const baseline=await wait(observeOwnerPhasePair({ctx,env,parent:originalLease})),context=qualifySettledOwnerPair(baseline);globalThis.__noticeState?.trace.push({position:'baseline-observed',at:Date.now()});");
 replace("ownedReservation=record;expected.records.notice.reservation=","if(globalThis.__noticeOwner?.noticeMode==='lost-reservation')throw Error('SYN NEGATIVE reservation recorded, return lost');ownedReservation=record;expected.records.notice.reservation=");
 replace("ownedSend=send;operation='ticket';","if(globalThis.__noticeOwner?.noticeMode==='lost-send')throw Error('SYN NEGATIVE SEND recorded, return lost');ownedSend=send;operation='ticket';");
 replace("   check();\n   const maxAge=","   globalThis.__noticeState?.trace.push({position:'complete',at:Date.now()});check();\n   const maxAge=");

 replace("if(!verified.ok)fail();identity=verified.identity;clock.narrow(identity.expiresAt);","if(!verified.ok)fail();identity=verified.identity;if(globalThis.__noticeOwner?.noticeMode==='expire-access')await wait(globalThis.__noticeOwner.noticeGate('access'));clock.narrow(identity.expiresAt);");
 let consent=post;
 const postReplace=(needle,next)=>{if(consent.split(needle).length!==2)throw Error('SYN consent marker changed: '+needle);consent=consent.replace(needle,next);};
 if(consent){
  postReplace("async function recheckConsentOwned(){\n    check();","async function recheckConsentOwned(){\n    globalThis.__noticeState?.trace.push({position,at:Date.now(),stage:'before'});check();");
  postReplace("if(canonical(pair.first)!==canonical(expected)||canonical(pair.second)!==canonical(expected))fail();","if(canonical(pair.first)!==canonical(expected)||canonical(pair.second)!==canonical(expected))fail();globalThis.__noticeState?.trace.push({position,at:Date.now(),stage:'after'});");
  postReplace("context=qualifyNoticeConsentBaseline(baseline);","context=qualifyNoticeConsentBaseline(baseline);globalThis.__noticeState?.trace.push({position:'baseline-observed',at:Date.now()});");
  postReplace("position='ticket-observed';await recheckConsentOwned();","position='ticket-observed';if(globalThis.__noticeOwner?.noticeMode==='before-send')await wait(globalThis.__noticeOwner.noticeGate('before-send'));await recheckConsentOwned();");
  postReplace("ownSend=send;expected.records.notice.operations.consent.send=","if(globalThis.__noticeOwner?.noticeMode==='lost-send')throw Error('SYN NEGATIVE consent SEND recorded, result lost');ownSend=send;expected.records.notice.operations.consent.send=");
  postReplace("expected.records.notice.operations.consent.ack=structuredClone(ack);","if(globalThis.__noticeOwner?.noticeMode==='lost-ack')throw Error('SYN NEGATIVE consent ACK recorded, result lost');expected.records.notice.operations.consent.ack=structuredClone(ack);");
  postReplace("    position='consent-sql-pending';sqlSettled=false;","    if(globalThis.__noticeOwner?.noticeMode==='before-insert')await wait(globalThis.__noticeOwner.noticeGate('before-insert'));check();position='consent-sql-pending';sqlSettled=false;");
  postReplace("   const html=","   globalThis.__noticeState?.trace.push({position:'complete',at:Date.now()});const html=");
 }
 head=head.replace("if(globalThis.__noticeOwner?.noticeMode==='drift'&&globalThis.__noticeState?.trace.at(-1)?.position==='ticket-sql-resolved')await globalThis.__noticeOwner.noticeGate('between-own');","if((globalThis.__noticeOwner?.noticeMode==='drift'&&globalThis.__noticeState?.trace.at(-1)?.position==='ticket-sql-resolved')||(globalThis.__noticeOwner?.noticeMode==='consent-drift'&&globalThis.__noticeState?.trace.at(-1)?.position==='consent-sql-resolved'))await globalThis.__noticeOwner.noticeGate('between-own');");

 const passiveMarker=(needle,entry,exit)=>{
  if(head.split(needle).length!==2)throw Error('SYN passive correlator marker changed: '+entry);
  head=head.replace(needle,"globalThis.__noticeState?.trace.push({correlator:'"+entry+"',phase:'enter'});"+needle+(exit?"globalThis.__noticeState?.trace.push({correlator:'"+entry+"',phase:'exit'});":""));
 };
 passiveMarker("if(canonical(r.identity)!==canonical(i)||r.issuerReservationHash!==f.issuer.reservation.recordHash||r.originalGrantAckHash!==ops.grant.ack.recordHash||r.grantLinkHash!==prepHash('GrantLink',issuerFacts.grantLink)||r.connectionHash!==prepHash('ConnectionRef',issuerFacts.connection)||canonical(r.expectedGrant)!==canonical(expectedGrant)||r.consumedAt!==issuerFacts.consent.consumed_at||r.preconnectionExpiresAt!==data.preconnection.expiresAt||r.accessExpiresAt>Math.min(data.preconnection.owner.accessExpiresAt,i.C0)||r.accessExpiresAt<=r.issuedAt||r.issuedAt>Date.now()||t.expiresAt>ceil||t.permissionExpiresAt>ceil||Date.now()>=t.permissionExpiresAt)fail();",'noticePrimary296',true);
 passiveMarker("if(tickets.some(v=>canonical(v)!==canonical(row)))fail();",'noticePrimary301',true);
 passiveMarker("if(consent.ack?.outcome==='applied'&&(events.length!==1||consent.ack.rowHash!==digest('afw.finite-preparation-notice-row.v1',events[0])||consent.ack.sequence!==events[0].sequence||events[0].issued_at>consent.ack.observedAt))fail();",'noticeConsentEventAck',true);

 return head+body+consent;
}

