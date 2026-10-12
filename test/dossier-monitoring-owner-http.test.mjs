import test from 'node:test';
import assert from 'node:assert/strict';
import {DatabaseSync} from 'node:sqlite';
import {readFileSync} from 'node:fs';
const api=await import('../lib/dossier-monitoring-owner-http.mjs').catch(()=>({}));
const origin='https://private.example.invalid',epoch=Date.now();
function fixture(accessTTL=700000){
 const sql=new DatabaseSync(':memory:');sql.exec('CREATE TABLE site_projects(id TEXT PRIMARY KEY,user_id TEXT,revision INTEGER,organization TEXT);CREATE TABLE delegated_access_grants(id TEXT PRIMARY KEY,user_id TEXT,client_id TEXT,project_id TEXT,resource TEXT,scopes_json TEXT,expires_at TEXT,revoked_at TEXT);');
 sql.exec(readFileSync('db/dossier-monitoring-consent.sql','utf8'));
 sql.exec(readFileSync('db/dossier-monitoring-owner-tickets.sql','utf8'));
 sql.prepare('INSERT INTO site_projects VALUES(?,?,?,?)').run('p','owner',3,'Mi empresa');
 sql.prepare('INSERT INTO delegated_access_grants VALUES(?,?,?,?,?,?,?,?)').run('g','owner','client','p',origin+'/mcp','["afw:project:read"]',new Date(epoch+600000).toISOString(),'');
 const db={prepare(text){return {bind(...values){return{first:async()=>sql.prepare(text).get(...values)??null,run:async()=>({meta:{changes:sql.prepare(text).run(...values).changes}})};}};}};
 let clock=epoch,subject='owner',valid=true;const policy={enabled:true,startAt:epoch-100,expiresAt:epoch+599900,projectId:'p',grantId:'g',clientId:'client',resource:origin+'/mcp',teamDomain:'own.cloudflareaccess.com',audience:'own'};
 const handler=api.createDossierMonitoringOwnerHandler({issuer:origin,db,policy,now:()=>clock,accessVerifier:async()=>valid?{ok:true,identity:{userId:subject}}:{ok:false}});
 const assertion=()=>'e30.'+Buffer.from(JSON.stringify({sub:subject,exp:Math.floor((epoch+accessTTL)/1000)})).toString('base64url')+'.synthetic';
 const get=()=>handler(new Request(origin+'/monitoring',{headers:{'Cf-Access-Jwt-Assertion':assertion()}}));
 const post=(handle,cookie,path='/monitoring/grant',extra='')=>handler(new Request(origin+path,{method:'POST',headers:{Origin:origin,'Content-Type':'application/x-www-form-urlencoded',Cookie:cookie,'Cf-Access-Jwt-Assertion':assertion()},body:'handle='+handle+extra}));
 const page=async()=>{const r=await get();assert.equal(r.status,200);const html=await r.text(),handle=html.match(/name="handle" value="([^"]+)"/)?.[1];return{html,handle,cookie:r.headers.get('Set-Cookie')?.split(';')[0]};};
 return{sql,db,policy,get,post,page,handler,setClock:v=>clock=v,setSubject:v=>subject=v,setValid:v=>valid=v};
}
test('disabled owner monitoring performs no verification or storage reads',async()=>{
 assert.equal(typeof api.createDossierMonitoringOwnerHandler,'function');
 const handler=api.createDossierMonitoringOwnerHandler({issuer:origin,policy:{enabled:false},db:{prepare(){throw Error('read');}},accessVerifier(){throw Error('verify');}});
 assert.equal((await handler(new Request(origin+'/monitoring'))).status,404);
});

test('native consent forms preserve same-origin POST identity without sending cross-origin referrers',async()=>{
 const f=fixture();try{
  const response=await f.get();assert.equal(response.status,200);
  // no-referrer gives native navigate-mode form POSTs an opaque Origin,
  // which the required exact-origin CSRF guard must continue to reject.
  assert.equal(response.headers.get('Referrer-Policy'),'same-origin');
  assert.match(response.headers.get('Content-Security-Policy'),/form-action 'self'/);
  assert.match(await response.text(),/<form method="post" action="\/monitoring\/grant">/);
  const p=await f.page();
  for(const suppliedOrigin of [undefined,'null','https://foreign.invalid']){
   const headers={'Content-Type':'application/x-www-form-urlencoded',Cookie:p.cookie};
   if(suppliedOrigin!==undefined)headers.Origin=suppliedOrigin;
   assert.equal((await f.handler(new Request(origin+'/monitoring/grant',{method:'POST',headers,body:'handle='+p.handle}))).status,403);
  }
  assert.equal(f.sql.prepare('SELECT count(*) n FROM dossier_monitoring_consent_events').get().n,0);
  assert.equal((await f.post(p.handle,p.cookie)).status,200);
 }finally{f.sql.close();}
});
test('GET explains distinct metadata consent without granting; POST is idempotent and cannot renew',async()=>{
 assert.equal(typeof api.createDossierMonitoringOwnerHandler,'function');const f=fixture();try{
 const p=await f.page();assert.match(p.html,/Permitir avisos temporales/);assert.match(p.html,/No cambia datos ni publica/);assert.match(p.html,/Comic/);
 assert.equal(f.sql.prepare('SELECT count(*) n FROM dossier_monitoring_consent_events').get().n,0);
 assert.equal((await f.post(p.handle,p.cookie)).status,200);f.setClock(epoch+5000);assert.equal((await f.post(p.handle,p.cookie)).status,200);
 const rows=f.sql.prepare('SELECT * FROM dossier_monitoring_consent_events').all();assert.equal(rows.length,1);assert.equal(rows[0].expires_at,epoch+599900);
 }finally{f.sql.close();}
});
test('native commit clock closes the window even if the JavaScript observation is stale',async()=>{
 assert.equal(typeof api.createDossierMonitoringOwnerHandler,'function');const f=fixture();try{const p=await f.page();f.sql.function('unixepoch',mode=>{void mode;return (epoch+700000)/1000;});assert.equal((await f.post(p.handle,p.cookie)).status,409);assert.equal(f.sql.prepare('SELECT count(*) n FROM dossier_monitoring_consent_events').get().n,0);}finally{f.sql.close();}
});
test('missing/wrong/duplicate CSRF cookie and extra form fields cannot grant',async()=>{
 assert.equal(typeof api.createDossierMonitoringOwnerHandler,'function');const f=fixture();try{const p=await f.page();for(const c of ['',p.cookie+'x',p.cookie+'; '+p.cookie])assert.equal((await f.post(p.handle,c)).status,403);assert.equal((await f.post(p.handle,p.cookie,'/monitoring/grant','&subject=owner')).status,400);assert.equal(f.sql.prepare('SELECT count(*) n FROM dossier_monitoring_consent_events').get().n,0);}finally{f.sql.close();}
});
test('handle is bound to action, current owner, original revision and finite window',async()=>{
 assert.equal(typeof api.createDossierMonitoringOwnerHandler,'function');const f=fixture();try{const p=await f.page();assert.equal((await f.post(p.handle,p.cookie,'/monitoring/revoke')).status,403);f.setSubject('other');assert.equal((await f.post(p.handle,p.cookie)).status,403);f.setSubject('owner');f.sql.prepare('UPDATE site_projects SET revision=4').run();assert.equal((await f.post(p.handle,p.cookie)).status,409);f.setClock(epoch+600000);assert.equal((await f.post(p.handle,p.cookie)).status,404);assert.equal(f.sql.prepare('SELECT count(*) n FROM dossier_monitoring_consent_events').get().n,0);}finally{f.sql.close();}
});
test('withdrawal is a separate owner action and survives original OAuth expiry within QA window',async()=>{
 assert.equal(typeof api.createDossierMonitoringOwnerHandler,'function');const f=fixture();try{
 f.sql.prepare('UPDATE delegated_access_grants SET expires_at=?').run(new Date(epoch+100000).toISOString());const p=await f.page();await f.post(p.handle,p.cookie);f.setClock(epoch+100001);
 const withdraw=await f.page();assert.match(withdraw.html,/Retirar avisos/);assert.equal((await f.post(withdraw.handle,withdraw.cookie,'/monitoring/revoke')).status,200);assert.equal(f.sql.prepare("SELECT count(*) n FROM dossier_monitoring_consent_events WHERE action='revoke'").get().n,1);
 assert.doesNotMatch((await f.page()).html,/name="handle"/);
 }finally{f.sql.close();}
});
test('revoked/malformed grant, foreign owner and invalid Access assertion never grant',async()=>{
 for(const mode of ['revoked','scopes','owner','identity']){const f=fixture();try{const p=await f.page();if(mode==='revoked')f.sql.prepare("UPDATE delegated_access_grants SET revoked_at='withdrawn'").run();if(mode==='scopes')f.sql.prepare('UPDATE delegated_access_grants SET scopes_json=?').run('["afw:project:read",null]');if(mode==='owner')f.sql.prepare("UPDATE site_projects SET user_id='other'").run();if(mode==='identity')f.setValid(false);assert.notEqual((await f.post(p.handle,p.cookie)).status,200);assert.equal(f.sql.prepare('SELECT count(*) n FROM dossier_monitoring_consent_events').get().n,0);}finally{f.sql.close();}}
});
test('concurrent distinct original forms produce only one consent and never grant from GET',async()=>{
 const f=fixture();try{const a=await f.page(),b=await f.page();const outcomes=await Promise.all([f.post(a.handle,a.cookie),f.post(b.handle,b.cookie)]);assert.deepEqual(outcomes.map(r=>r.status).sort(),[200,409]);assert.equal(f.sql.prepare('SELECT count(*) n FROM dossier_monitoring_consent_events').get().n,1);}finally{f.sql.close();}
});
test('wrong Origin and oversize/duplicate form inputs fail before decision',async()=>{
 const f=fixture();try{const p=await f.page();const foreign=await f.handler(new Request(origin+'/monitoring/grant',{method:'POST',headers:{Origin:'https://foreign.invalid','Content-Type':'application/x-www-form-urlencoded',Cookie:p.cookie},body:'handle='+p.handle}));assert.equal(foreign.status,403);assert.equal((await f.post(p.handle,p.cookie,'/monitoring/grant','&handle='+p.handle)).status,400);assert.equal((await f.post(p.handle,p.cookie,'/monitoring/grant','&x='+ 'a'.repeat(1024))).status,400);assert.equal(f.sql.prepare('SELECT count(*) n FROM dossier_monitoring_consent_events').get().n,0);}finally{f.sql.close();}
});
test('client/resource changes at the SQL commit cannot redirect original owner consent',async()=>{
 const f=fixture();try{const p=await f.page(),prepare=f.db.prepare;f.db.prepare=text=>{const statement=prepare(text);return{bind(...args){const bound=statement.bind(...args);return{...bound,async run(){if(text.startsWith('INSERT INTO dossier_monitoring_consent_events'))f.sql.prepare("UPDATE delegated_access_grants SET client_id='other-client'").run();return bound.run();}};}};};assert.equal((await f.post(p.handle,p.cookie)).status,409);assert.equal(f.sql.prepare('SELECT count(*) n FROM dossier_monitoring_consent_events').get().n,0);}finally{f.sql.close();}
});
test('Access withdrawal during writer recovery prevents the original consent insertion',async()=>{
 const f=fixture();try{const p=await f.page(),prepare=f.db.prepare;f.db.prepare=text=>{const statement=prepare(text);return{bind(...args){const bound=statement.bind(...args);return{...bound,async first(){if(text.startsWith('SELECT c.*'))f.setValid(false);return bound.first();}};}};};assert.equal((await f.post(p.handle,p.cookie)).status,403);assert.equal(f.sql.prepare('SELECT count(*) n FROM dossier_monitoring_consent_events').get().n,0);}finally{f.sql.close();}
});
test('original signed Access deadline bounds the form and permission without renewal',async()=>{
 const f=fixture(100000);try{const p=await f.page(),ticket=f.sql.prepare('SELECT * FROM dossier_monitoring_owner_tickets').get();assert.equal(ticket.expires_at,Math.floor((epoch+100000)/1000)*1000);assert.equal((await f.post(p.handle,p.cookie)).status,200);assert.equal(f.sql.prepare('SELECT expires_at FROM dossier_monitoring_consent_events').get().expires_at,ticket.expires_at);}finally{f.sql.close();}
});
