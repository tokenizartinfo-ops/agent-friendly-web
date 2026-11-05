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
      const ticketInsert=sql.includes('INSERT INTO dossier_monitoring_owner_tickets');
      if(ticketInsert){state.sqlEnteredAt=Date.now();if(this.noticeMode==='queue'||this.noticeMode==='hold-before')await this.noticeGate('before-sql');}
      const actual=Reflect.apply(bound[kind],bound,[]),result=await actual;entry.doneAt=Date.now();
      if(ticketInsert){state.resolution={at:Date.now(),row:result!==null};if(this.noticeMode==='hold-after')await this.noticeGate('after-sql');if(this.noticeMode==='lost-sql')throw Error('SYN NEGATIVE actual SQL committed, result lost');}
      if(kind==='all'&&sql.endsWith('ORDER BY name LIMIT 8')&&this.noticeMode==='failed-schema-metadata')return {...result,success:false};
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
 return "import {sealFinitePreparationNoticeRecord as noticeSeal,encodeFinitePreparationNoticeRecord as noticeEncode} from './lib/mcp-qa-finite-preparation-notice-records.mjs';\n"+entry.replace(' export class Initial extends FiniteClosure{',' export class Initial extends FiniteClosure{'+methods);
}

// Read-only instrumentation of exact lexical source sites. SYN gates never supply authority.
export function instrumentFiniteNoticeGet(source){
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
 return head+body;
}

