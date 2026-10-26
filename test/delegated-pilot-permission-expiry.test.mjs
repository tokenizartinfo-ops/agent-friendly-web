import assert from 'node:assert/strict';
import test from 'node:test';
import { registerHooks } from 'node:module';
import { localOAuthFixture,authorize,approve,exchange } from './fixtures/delegated-oauth-runtime.mjs';

// Same SDK/crypto/SQLite fixture as the existing OAuth flow suite. The import
// shim is not native workerd or proof of a deployed human consent.
const hook=registerHooks({resolve(s,c,next){return s==='cloudflare:workers'?{url:'data:text/javascript,export class WorkerEntrypoint {}',shortCircuit:true}:next(s,c);}});
const {createDelegatedOAuthWorker}=await import('../lib/delegated-oauth-worker.mjs');
hook.deregister();

async function fixture(){
  const f=await localOAuthFixture(createDelegatedOAuthWorker),start=Date.now();
  f.start=start;f.deadline=new Date(start+300000).toISOString();
  f.env.AFW_OAUTH_SERVICE_MODE='window';
  f.env.AFW_OAUTH_PILOT_EXPIRES_AT=f.deadline;
  f.setTime(new Date(start).toISOString());
  return f;
}
function afterOwnedRead(f,act){
  const original=f.env.DB.prepare;let reads=0;
  f.env.DB.prepare=sql=>{
    const statement=original(sql);
    if(!/FROM site_projects/i.test(sql))return statement;
    return {bind(...args){const bound=statement.bind(...args);return {...bound,first:async()=>{
      const row=await bound.first();if(++reads===2)act();return row;
    }};}};
  };
  return {reads:()=>reads,restore:()=>{f.env.DB.prepare=original;}};
}

test('window consent and owner management handles show and store the original host deadline',async()=>{
  const f=await fixture();try{
    const a=await authorize(f,{scope:'afw:project:read'});
    assert.equal(a.response.status,200);
    assert.equal(f.sqlite.prepare('SELECT expires_at FROM delegated_consent_sessions WHERE kind=?').get('authorize').expires_at,f.deadline);
    assert.match(a.html,/hasta diez minutos/);
    assert.ok(a.html.includes('datetime="'+f.deadline+'"'));
    const screen=await f.request('/connections');assert.equal(screen.status,200);
    assert.equal(f.sqlite.prepare('SELECT expires_at FROM delegated_consent_sessions WHERE kind=?').get('revoke').expires_at,f.deadline);
  }finally{f.close();}
});

test('late approval and actual token exchange never extend the original host window',async()=>{
  const f=await fixture();try{
    const a=await authorize(f,{scope:'afw:project:read'});
    f.setTime(new Date(f.start+120000).toISOString());
    const approved=await approve(f,a,{scope:['afw:project:read']});assert.equal(approved.status,302);
    const grant=f.sqlite.prepare('SELECT created_at,expires_at,scopes_json FROM delegated_access_grants').get();
    assert.equal(grant.created_at,new Date(f.start+120000).toISOString());
    assert.equal(grant.expires_at,f.deadline);
    assert.deepEqual(JSON.parse(grant.scopes_json),['afw:project:read']);
    const exchanged=await exchange(f,approved.headers.get('Location'),a.verifier);assert.equal(exchanged.status,200);
    const token=await exchanged.json();assert.ok(token.expires_in>0&&token.expires_in<=180);
    assert.equal(token.refresh_token,undefined);
  }finally{f.close();}
});

test('stable mode still grants ten minutes from approval without inventing a host deadline',async()=>{
  const f=await fixture();try{
    f.env.AFW_OAUTH_SERVICE_MODE='stable';delete f.env.AFW_OAUTH_PILOT_EXPIRES_AT;
    const a=await authorize(f,{scope:'afw:project:read'});
    f.setTime(new Date(f.start+120000).toISOString());
    const approved=await approve(f,a,{scope:['afw:project:read']});assert.equal(approved.status,302);
    const grant=f.sqlite.prepare('SELECT created_at,expires_at FROM delegated_access_grants').get();
    assert.equal(Date.parse(grant.expires_at)-Date.parse(grant.created_at),600000);
    assert.equal(Date.parse(grant.expires_at),f.start+720000);
  }finally{f.close();}
});

test('expiry after the final asynchronous owner lookup cannot persist a fresh grant',async()=>{
  const f=await fixture();let patch;try{
    const a=await authorize(f,{scope:'afw:project:read'});
    patch=afterOwnedRead(f,()=>f.setTime(f.deadline));
    const approved=await approve(f,a,{scope:['afw:project:read']});
    assert.equal(patch.reads(),2);
    assert.notEqual(approved.status,302);
    assert.equal(f.sqlite.prepare('SELECT count(*) n FROM delegated_access_grants').get().n,0);
  }finally{patch?.restore();f.close();}
});

test('a changed env deadline during approval cannot extend the captured window',async()=>{
  const f=await fixture();let patch;try{
    const a=await authorize(f,{scope:'afw:project:read'});
    patch=afterOwnedRead(f,()=>{f.env.AFW_OAUTH_PILOT_EXPIRES_AT=new Date(f.start+3600000).toISOString();});
    const approved=await approve(f,a,{scope:['afw:project:read']});
    assert.equal(patch.reads(),2);assert.equal(approved.status,302);
    assert.equal(f.sqlite.prepare('SELECT expires_at FROM delegated_access_grants').get().expires_at,f.deadline);
  }finally{patch?.restore();f.close();}
});

test('invalid or backward time after asynchronous ownership checks fails before grant persistence',async()=>{
  for(const time of ['not-a-date','backward']){
    const f=await fixture();let patch;try{
      const a=await authorize(f,{scope:'afw:project:read'});
      patch=afterOwnedRead(f,()=>f.setTime(time==='backward'?new Date(f.start-1).toISOString():time));
      const approved=await approve(f,a,{scope:['afw:project:read']});
      assert.equal(patch.reads(),2);assert.notEqual(approved.status,302);
      assert.equal(f.sqlite.prepare('SELECT count(*) n FROM delegated_access_grants').get().n,0);
    }finally{patch?.restore();f.close();}
  }
});

test('a remaining window below the SDK sixty-second minimum cannot create a new grant',async()=>{
  const f=await fixture();try{
    const a=await authorize(f,{scope:'afw:project:read'});
    f.setTime(new Date(Date.parse(f.deadline)-59999).toISOString());
    assert.notEqual((await approve(f,a,{scope:['afw:project:read']})).status,302);
    assert.equal(f.sqlite.prepare('SELECT count(*) n FROM delegated_access_grants').get().n,0);
  }finally{f.close();}
});

test('expiry during grant persistence returns no code and retires only the new own grant',async()=>{
  const f=await fixture();const original=f.env.DB.prepare;try{
    const a=await authorize(f,{scope:'afw:project:read'});
    // An unrelated historical row must remain byte-for-byte unchanged.
    f.sqlite.prepare("INSERT INTO delegated_access_grants(id,user_id,client_id,project_id,resource,scopes_json,created_at,expires_at,revoked_at) VALUES(?,?,?,?,?,?,?,?,?)")
      .run('untouched','owner-b','foreign','p-b','https://foreign.invalid/mcp','[]',new Date(f.start).toISOString(),f.deadline,'');
    const before=f.sqlite.prepare("SELECT * FROM delegated_access_grants WHERE id='untouched'").get();
    f.env.DB.prepare=sql=>{
      const stmt=original(sql);if(!/INSERT INTO delegated_access_grants/i.test(sql))return stmt;
      return {bind(...args){const bound=stmt.bind(...args);return {...bound,run:async()=>{
        const result=await bound.run();f.setTime(f.deadline);return result;
      }};}};
    };
    const approved=await approve(f,a,{scope:['afw:project:read']});
    assert.notEqual(approved.status,302);
    assert.equal(approved.headers.get('Location'),null);
    const own=f.sqlite.prepare("SELECT expires_at,revoked_at FROM delegated_access_grants WHERE id<>'untouched'").get();
    assert.equal(own.expires_at,f.deadline);assert.ok(own.revoked_at);
    assert.deepEqual(f.sqlite.prepare("SELECT * FROM delegated_access_grants WHERE id='untouched'").get(),before);
  }finally{f.env.DB.prepare=original;f.close();}
});
