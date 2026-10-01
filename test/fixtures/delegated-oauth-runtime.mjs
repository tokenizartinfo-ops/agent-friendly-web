import { DatabaseSync } from 'node:sqlite';
import { readFileSync,readdirSync } from 'node:fs';
import { generateKeyPair,exportJWK,createLocalJWKSet,SignJWT } from 'jose';
import { verifyCloudflareAccessJwt } from '../../lib/cloudflare-access-identity.mjs';

export async function localOAuthFixture(createWorker) {
  const issuer='https://delegated-local.agentfriendlyweb.dev',resource=issuer+'/mcp';
  const sqlite=new DatabaseSync(':memory:');
  for(const name of readdirSync('drizzle').filter(x=>/^001[12]_.*\.sql$/.test(x)).sort())sqlite.exec(readFileSync('drizzle/'+name,'utf8'));
  sqlite.exec(`CREATE TABLE site_projects (id TEXT,user_id TEXT,organization TEXT,website TEXT,role TEXT,site_type TEXT,control TEXT,audience TEXT,goals_json TEXT,languages_json TEXT,status TEXT,completion INTEGER,revision INTEGER,updated_at TEXT);
    CREATE TABLE scan_observations (id TEXT,project_id TEXT,user_id TEXT,target_origin TEXT,readiness_json TEXT,checked_at TEXT);
    INSERT INTO site_projects VALUES ('p-a','owner-a','A','https://a.example','owner','content','none','users','["content"]','["es"]','draft',30,1,'2026-09-30T18:00:00Z'),('p-b','owner-b','B','https://b.example','owner','content','none','users','["content"]','["es"]','draft',50,1,'2026-09-30T18:00:00Z');`);
  const DB={prepare(sql){const stmt=sqlite.prepare(sql);return {bind(...args){return {first:async()=>stmt.get(...args)??null,all:async()=>({results:stmt.all(...args)}),run:async()=>({meta:{changes:stmt.run(...args).changes}})};}};}};
  const kv=new Map();
  const OAUTH_KV={
    async get(key,type){const row=kv.get(key);if(!row||row.expires<=Date.now())return null;return (type==='json'||type?.type==='json')?JSON.parse(row.value):row.value;},
    async put(key,value,options={}){kv.set(key,{value,expires:options.expiration?options.expiration*1000:options.expirationTtl?Date.now()+options.expirationTtl*1000:Infinity});},
    async delete(key){kv.delete(key);},
    async list({prefix='',limit=1000}={}){return {keys:[...kv.keys()].filter(k=>k.startsWith(prefix)).slice(0,limit).map(name=>({name})),list_complete:true,cursor:''};},
  };
  const env={DB,OAUTH_KV,AFW_DELEGATED_OAUTH_ENABLED:'true',AFW_OAUTH_PILOT_CLIENT_ID:'',ACCESS_TEAM_DOMAIN:'tokenizart.cloudflareaccess.com',ACCESS_AUD:'synthetic-afw-delegated-aud'};
  const {privateKey,publicKey}=await generateKeyPair('RS256');
  const jwk={...await exportJWK(publicKey),kid:'local-afw-test',alg:'RS256'};
  const keySet=createLocalJWKSet({keys:[jwk]});
  let currentTime=new Date().toISOString();
  const worker=createWorker({issuer,resource,now:()=>currentTime,accessVerifier:options=>verifyCloudflareAccessJwt({...options,keySet})});
  const helpers=worker.authorizationServer.getOAuthApi(env);
  const client=await helpers.createClient({clientName:'AFW <script>local</script>',redirectUris:['http://localhost:8950/callback'],grantTypes:['authorization_code'],responseTypes:['code'],tokenEndpointAuthMethod:'none'});
  env.AFW_OAUTH_PILOT_CLIENT_ID=client.clientId;
  const ctx={waitUntil(){},passThroughOnException(){}};
  const actor=async(user='owner-a',aud=env.ACCESS_AUD)=>new SignJWT({email:user+'@example.invalid'}).setProtectedHeader({alg:'RS256',kid:jwk.kid}).setSubject(user).setIssuer('https://'+env.ACCESS_TEAM_DOMAIN).setAudience(aud).setIssuedAt().setExpirationTime('1h').sign(privateKey);
  const request=async(path,options={},identity='owner-a')=>worker.fetch(new Request(issuer+path,{...options,headers:{...(identity?{'Cf-Access-Jwt-Assertion':await actor(identity)}:{}),...options.headers}}),env,ctx);
  return {issuer,resource,sqlite,env,worker,client,ctx,actor,request,setTime:value=>{currentTime=value;},close:()=>sqlite.close()};
}

export function cookies(response){return response.headers.getSetCookie().map(value=>value.split(';')[0]).join('; ');}
export function handle(html){const match=html.match(/name="handle" value="([^"]+)"/);if(!match)throw Error('consent handle not found');return match[1];}
export async function authorize(f,{project='p-a',identity='owner-a',scope='afw:project:read afw:evidence:read',params={}}={}){
  const verifier='a'.repeat(64);
  const challenge=Buffer.from(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(verifier))).toString('base64url');
  const query=new URLSearchParams({response_type:'code',client_id:f.client.clientId,redirect_uri:'http://localhost:8950/callback',resource:f.resource,scope,state:'local-state',code_challenge:challenge,code_challenge_method:'S256',project,...params});
  const response=await f.request('/authorize?'+query,{},identity);
  return {response,html:await response.text(),cookie:cookies(response),verifier,query};
}
export async function approve(f,a,{identity='owner-a',scope=['afw:project:read','afw:evidence:read'],cookie=a.cookie}={}){
  const form=new URLSearchParams({handle:handle(a.html),decision:'approve'});for(const s of scope)form.append('scope',s);
  return f.request('/authorize',{method:'POST',headers:{Origin:f.issuer,Cookie:cookie,'Content-Type':'application/x-www-form-urlencoded'},body:form},identity);
}
export async function exchange(f,redirect,verifier,extra={}){
  const code=new URL(redirect).searchParams.get('code');
  return f.request('/oauth/token',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({grant_type:'authorization_code',code,client_id:f.client.clientId,redirect_uri:'http://localhost:8950/callback',code_verifier:verifier,resource:f.resource,...extra})},null);
}
