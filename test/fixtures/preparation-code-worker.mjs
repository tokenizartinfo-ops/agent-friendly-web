// CI-ONLY protocol composition. Never referenced by a production entrypoint.
// Actor headers, control routes and fault switches are synthetic test adapters,
// not a human consent UI, authentication mechanism, or deployable OAuth profile.
import {OAuthAuthorizationServer,OAuthError} from '@cloudflare/workers-oauth-provider';
import {createDelegatedOAuthStore} from '../../lib/delegated-oauth-store.mjs';
import {evaluatePreparationConsentChoice} from '../../lib/delegated-preparation-consent-policy.mjs';
import {createDelegatedPreparationConsentStore} from '../../lib/delegated-preparation-consent-store.mjs';
import {createCapsulePreparationRequestLease,readCapsulePreparationRequestLease} from '../../lib/capsule-preparation-request-lease.mjs';
import {renderPreparationConsentView,renderPreparationConnectionSummary} from '../../lib/delegated-preparation-consent-view.mjs';
import {McpServer} from '@modelcontextprotocol/server';
import {createDelegatedPreparationMcpMount} from '../../lib/delegated-preparation-mcp-mount.mjs';
import {checkAgentCapsulePreparationSchema} from '../../lib/agent-capsule-preparation-schema.mjs';

const issuer='https://example.invalid',resource=issuer+'/mcp',callback=issuer+'/callback';
const READ='afw:project:read',DRAFTS='afw:capsule:prepare';
const projectId='project-a';
let bootstrap,as,clientId,started,profileDuration=180000;
const hash=async value=>Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(value))),x=>x.toString(16).padStart(2,'0')).join('');
const bad=(status=400)=>Response.json({code:'ci_request_rejected'},{status,headers:{'Cache-Control':'no-store'}});
const session=env=>env.DB.withSession('first-primary');
const store=env=>createDelegatedOAuthStore(session(env));
const one=(form,key)=>{const values=form.getAll(key);if(values.length!==1||typeof values[0]!=='string'||!values[0]||values[0].length>1024)throw Error('field');return values[0];};
const policy=(scopes,start,end)=>({enabled:true,requestedScopes:scopes,transactionStartedAt:start,transactionExpiresAt:end,
 trialStartedAt:started,trialExpiresAt:started+profileDuration});
async function owned(env,subject){
 const row=await session(env).prepare("SELECT p.revision,p.website,s.canonical_origin,s.hostname FROM site_projects p JOIN registry_sites s ON s.project_id=p.id AND s.user_id=p.user_id JOIN domain_claims c ON c.site_id=s.id AND c.project_id=p.id AND c.user_id=p.user_id WHERE p.id=? AND p.user_id=? AND p.role='owner' AND s.verification_status='verified' AND c.status='verified' AND julianday(c.verified_at)<=julianday('now') AND julianday(c.verified_at)+90>julianday('now') ORDER BY c.verified_at DESC,c.id DESC LIMIT 1")
  .bind(projectId,subject).first();
 if(!row||new URL(row.website).origin!==row.canonical_origin||new URL(row.canonical_origin).hostname!==row.hostname)return false;
 return true;
}
async function schema(env){return (await checkAgentCapsulePreparationSchema({createPrimarySession:()=>session(env)})).ready;}
function scopeSet(scopes){
 return Array.isArray(scopes)&&scopes.length>0&&scopes.length<=2&&scopes.includes(READ)
  &&new Set(scopes).size===scopes.length&&scopes.every(x=>x===READ||x===DRAFTS);
}
async function ready(env){
 bootstrap??=(async()=>{
  started=Date.now();
  as=new OAuthAuthorizationServer({issuer,resources:[resource],scopesSupported:[READ,DRAFTS],accessTokenTTL:90,
   clientIdMetadataDocumentEnabled:false,
   async tokenExchangeCallback(options){
    const g=await store(options.env).getGrant(options.props?.applicationGrantId);
    const remaining=Math.floor((Date.parse(g?.expiresAt)-Date.now())/1000);
    if(options.grantType!=='authorization_code'||!g||g.status!=='active'||!Number.isFinite(remaining)||remaining<1
     ||g.subject!==options.userId||g.clientId!==clientId||options.clientId!==clientId||g.resource!==resource||options.resource!==resource
     ||!scopeSet(options.scope)||!scopeSet(options.requestedScope)
     ||options.scope.some(x=>!g.scopes.includes(x))||options.requestedScope.some(x=>!g.scopes.includes(x))
     ||!await owned(options.env,g.subject)||!await schema(options.env))
     throw new OAuthError('invalid_grant',{description:'CI permission unavailable',statusCode:400});
    if(!await store(options.env).consumeExchange(g.grantId,g.subject,g.clientId,resource,new Date().toISOString()))
     throw new OAuthError('invalid_grant',{description:'CI exchange unavailable',statusCode:400});
    const current=await store(options.env).getGrant(g.grantId),left=Math.floor((Date.parse(g.expiresAt)-Date.now())/1000);
    if(!current||current.status!=='active'||!Number.isFinite(left)||left<1||!await owned(options.env,g.subject))
     throw new OAuthError('invalid_grant',{description:'CI permission unavailable',statusCode:400});
    return {accessTokenTTL:Math.min(90,left),refreshTokenTTL:0};
   }});
  const client=await as.getOAuthApi(env).createClient({clientName:'AFW CI protocol client',redirectUris:[callback,'https://client.example.invalid/callback'],
   grantTypes:['authorization_code'],responseTypes:['code'],tokenEndpointAuthMethod:'none'});
  clientId=client.clientId;
 })();
 return bootstrap;
}
const consentProfile=()=>({profileId:'afw.preparation-consent.v1',projectId,clientId,resource,trialStartedAt:started,trialExpiresAt:started+profileDuration});
const originalPacket=auth=>JSON.stringify({responseType:auth.responseType,clientId:auth.clientId,redirectUri:auth.redirectUri,scope:auth.scope,
 state:auth.state,codeChallenge:auth.codeChallenge,codeChallengeMethod:auth.codeChallengeMethod,resource:auth.resource,issuer:auth.issuer});
async function originalRow(env,handleHash,actor){
 return session(env).prepare("SELECT * FROM delegated_preparation_consents WHERE handle_hash=? AND user_id=? AND profile_id='afw.preparation-consent.v1' AND project_id=? AND client_id=? AND resource=? AND trial_started_at=? AND trial_expires_at=?")
  .bind(handleHash,actor,projectId,clientId,resource,started,started+profileDuration).first();
}
function consentStorage(env,requestLease,fault=''){
 let failed=false;
 const createPrimarySession=()=>{
  const db=session(env);
  // A synthetic ACK fault follows the actual D1 statement commit, not a fake result.
  return {prepare(sql){const statement=db.prepare(sql);return {bind(...args){const bound=statement.bind(...args);
   return {first:()=>bound.first(),all:()=>bound.all(),async run(){
    const result=await bound.run();
    if(!failed&&((fault==='reserve'&&sql.includes("SET state='reserved'"))||(fault==='admit'&&sql.includes("SET state='admitted'")))){
     failed=true;throw Error('CI consent acknowledgment lost');
    }return result;
   }};
  }};}};
 };
 return createDelegatedPreparationConsentStore({enabled:true,profile:consentProfile(),createPrimarySession,now:()=>Date.now(),requestLease});
}
async function authorize(request,env){
 const requestLease=createCapsulePreparationRequestLease({signal:request.signal}),control=readCapsulePreparationRequestLease(requestLease);
 const wait=work=>control.wait(work),actor=request.headers.get('x-ci-actor');
 if(actor!=='owner-a')return bad(403);
 const api=as.getOAuthApi(env),persistence=consentStorage(env,requestLease,request.headers.get('x-ci-consent-ack-loss'));
 if(!persistence)return bad(503);
 if(request.method==='GET'){
  const entered=control.check().started,auth=await wait(()=>api.parseAuthRequest(request)),ids=new URL(request.url).searchParams.getAll('project');
  if(auth.clientId!==clientId||auth.resource!==resource||auth.codeChallengeMethod!=='S256'
   ||ids.length!==1||ids[0]!==projectId||!scopeSet(auth.scope))return bad();
  if(!await wait(()=>schema(env)))return bad(503);
  if(!await wait(()=>owned(env,actor)))return bad(403);
  const source=await wait(()=>session(env).prepare("SELECT revision FROM site_projects WHERE id=? AND user_id=? AND role='owner'").bind(projectId,actor).first());
  if(!source)return bad(403);
  const originalEnd=Math.min(entered+600000,started+profileDuration);
  const candidate=evaluatePreparationConsentChoice({decision:'read'},policy(auth.scope,entered,originalEnd),{now:Date.now()});
  if(candidate.code!=='choice_valid')return bad(403);
  const transaction=await wait(()=>api.beginConsent(auth));
  const saved=await persistence.begin({handleHash:await wait(()=>hash(transaction.handle)),requestHash:await wait(()=>hash(originalPacket(auth))),
   subject:actor,requestedScopes:auth.scope,transactionStartedAt:entered,transactionExpiresAt:originalEnd,expectedRevision:source.revision});
  if(saved.code!=='consent_pending')return bad(saved.code==='delegated_access_denied'||saved.code==='context_changed'?403:503);
  if(request.headers.get('Accept')?.includes('text/html')){
   const view=renderPreparationConsentView({locale:'es',projectName:'AFW CI dossier',clientName:'AFW CI protocol client',siteHost:'example.org',
    handle:transaction.handle,styleNonce:crypto.randomUUID().replaceAll('-',''),policy:saved.transaction,clock:{now:Date.now()}});
   const headers=new Headers(transaction.headers);for(const [key,value]of Object.entries(view.headers))headers.set(key,value);
   return new Response(view.html,{status:view.status,headers});
  }
  return Response.json({handle:transaction.handle,trialStartedAt:started,trialExpiresAt:started+profileDuration},{headers:transaction.headers});
 }
 if(request.method!=='POST'||request.headers.get('Origin')!==issuer
  ||request.headers.get('Content-Type')!=='application/x-www-form-urlencoded')return bad(403);
 const f=await wait(()=>request.formData());
 if([...f.keys()].some(key=>!['handle','decision'].includes(key)))return bad();
 const handle=one(f,'handle'),decision=one(f,'decision'),digest=await wait(()=>hash(handle)),row=await wait(()=>originalRow(env,digest,actor));
 if(!row)return bad(403);
 const reference={handleHash:digest,requestHash:row.request_hash,subject:actor};
 if(decision==='cancel'){
  const denied=await wait(()=>api.denyConsent(request,handle));
  if(await wait(()=>hash(originalPacket(denied.request)))!==row.request_hash)return bad(403);
  const cancelled=await persistence.decide({...reference,decision});
  return cancelled.code==='cancelled'?new Response(null,{status:302,headers:denied.headers}):bad(503);
 }
 const prior=await persistence.inspect(reference);
 if(prior.code!=='consent_pending')return bad(prior.code==='unavailable'?503:403);
 const candidate=evaluatePreparationConsentChoice({decision},prior.transaction,{now:Date.now()});
 if(candidate.code!=='choice_valid')return bad();
 if(!await wait(()=>schema(env)))return bad(503);
 if(!await wait(()=>owned(env,actor)))return bad(403);
 // No SDK scope override: compare the original cookie-bound request before application admission.
 const approved=await wait(()=>api.approveConsent(request,handle));
 if(await wait(()=>hash(originalPacket(approved.request)))!==row.request_hash)return bad(403);
 const grantId=row.grant_id;
 const admitted=await persistence.decide({...reference,decision});
 // An uncertain/losing writer must never revoke a different fresh winner's grant.
 // No SDK code is requested here; unknown store commits remain unexchanged and finite.
 if(admitted.code!=='decision_saved'||admitted.freshDecision!==true||admitted.applicationGrantStored!==true
  ||admitted.grantRef!==grantId||JSON.stringify(admitted.scopes)!==JSON.stringify(candidate.scopes))
  return bad(admitted.code==='unknown_ack'||admitted.code==='unavailable'?503:403);
 try{
  // Existing test fault follows the actual admitted grant and before SDK completion.
  if(request.headers.get('x-ci-grant-ack-loss')==='true')throw Error('CI grant acknowledgment lost');
  if(!await wait(()=>owned(env,actor))||!await wait(()=>schema(env))||Date.now()>=admitted.expiresAt)
   throw Error('CI completion context changed');
  const current=await wait(()=>store(env).getGrant(grantId));
  if(!current||current.status!=='active'||current.subject!==actor||current.clientId!==clientId||current.projectId!==projectId
   ||current.resource!==resource||Date.parse(current.expiresAt)!==admitted.expiresAt||JSON.stringify(current.scopes)!==JSON.stringify(admitted.scopes))
   throw Error('CI grant unavailable');
  const completed=await wait(()=>api.completeAuthorization({request:approved.request,userId:actor,scope:admitted.scopes,metadata:{},
   props:{applicationGrantId:grantId,userId:actor,projectId},revokeExistingGrants:false}));
  if(request.headers.get('x-ci-code-ack-loss')==='true')throw Error('CI completion acknowledgment lost');
  control.check();
  const headers=new Headers(approved.headers);headers.set('Location',completed.redirectTo);headers.set('Cache-Control','no-store');
  return new Response(null,{status:302,headers});
 }catch{
  // Privilege-reducing cleanup uses the original private scoped row, never a read-recovery completion.
  await store(env).revokeGrant(grantId,actor,new Date().toISOString());
  return bad(503);
 }
}
async function connection(request,env){
 if(request.method!=='GET'||request.headers.get('x-ci-actor')!=='owner-a')return bad(403);
 const handle=new URL(request.url).searchParams.get('handle');if(typeof handle!=='string'||handle.length>256)return bad();
 const row=await originalRow(env,await hash(handle),'owner-a');
 const grant=row?await store(env).getGrant(row.grant_id):null;if(!grant)return bad(404);
 const summary=renderPreparationConnectionSummary({locale:'es',projectName:'AFW CI dossier',clientName:'AFW CI protocol client',scopes:grant.scopes,
  status:grant.status==='active'?'active':grant.status==='revoked'?'revoked':'expired',expiresAt:Date.parse(grant.expiresAt)});
 return summary?new Response(summary.html,{headers:{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store'}}):bad(404);
}
async function token(request,env,ctx){
 const f=await request.clone().formData();
 if(f.has('token')&&!f.has('grant_type')){
  const t=await as.validateToken(resource,f.get('token'),env);
  if(t?.props?.applicationGrantId&&t.userId==='owner-a'&&t.clientId===clientId)
   await store(env).revokeGrant(t.props.applicationGrantId,t.userId,new Date().toISOString());
 }
 const response=await as.fetch(request,env,ctx);
 if(!response.ok||f.get('grant_type')!=='authorization_code')return response;
 const payload=await response.json();
 if(typeof payload.access_token!=='string')return bad(503);
 const verified=await as.validateToken(resource,payload.access_token,env);
 const grant=verified?.props?.applicationGrantId?await store(env).getGrant(verified.props.applicationGrantId):null;
 const remaining=Math.floor((Date.parse(grant?.expiresAt)-Date.now())/1000);
 if(!grant||grant.status!=='active'||remaining<1)return bad(503);
 payload.expires_in=Math.min(payload.expires_in,remaining);
 const headers=new Headers(response.headers);headers.delete('Content-Length');headers.set('Cache-Control','no-store');
 return Response.json(payload,{status:response.status,headers});
}
// CI-only lifecycle probes forward actual SDK methods. No production knobs.
const observedServers=new Set(),serverFault=new WeakMap(),background=new Set();
const holds={auth:new Set(),connect:new Set()};
const metrics={authStarted:0,authCompleted:0,connectStarted:0,connectCompleted:0,closed:0};
let currentServerFault='';
const realRegister=McpServer.prototype.registerTool,realConnect=McpServer.prototype.connect,realClose=McpServer.prototype.close;
McpServer.prototype.registerTool=function(...args){
 if(!observedServers.has(this)){observedServers.add(this);serverFault.set(this,currentServerFault);}
 return realRegister.apply(this,args);
};
const held=kind=>new Promise(resolve=>holds[kind].add(resolve));
McpServer.prototype.connect=async function(...args){
 metrics.connectStarted++;
 if(serverFault.get(this)==='held-connect')await held('connect');
 const value=await realConnect.apply(this,args);metrics.connectCompleted++;return value;
};
McpServer.prototype.close=async function(...args){
 const value=await realClose.apply(this,args);metrics.closed++;return value;
};
const stats=()=>({...metrics,created:observedServers.size,connected:[...observedServers].filter(s=>typeof s.isConnected==='function'&&s.isConnected()).length,
 unknownState:[...observedServers].filter(s=>typeof s.isConnected!=='function').length});
async function lifecycleProbe(request){
 const path=new URL(request.url).pathname;
 if(path==='/__ci/mount-disabled'){
  let touched=0;const options={enabled:false};Object.defineProperty(options,'env',{get(){touched++;throw Error('must not run');},enumerable:true});
  return Response.json({closed:createDelegatedPreparationMcpMount()===null&&createDelegatedPreparationMcpMount(options)===null,touched});
 }
 if(path==='/__ci/release-mcp-hold'&&request.method==='POST'){
  for(const set of Object.values(holds)){for(const resolve of set)resolve();set.clear();}
  await Promise.allSettled([...background]);return Response.json(stats());
 }
 if(path==='/__ci/mcp-stats'){
  if(!holds.auth.size&&!holds.connect.size)await Promise.allSettled([...background]);
  return Response.json(stats());
 }
 return bad(404);
}
async function mcp(request,env,ctx){
 const fault=request.headers.get('x-ci-mcp-fault')??'';
 const pins={...env,AFW_DELEGATED_OAUTH_ENABLED:'true',AFW_DELEGATED_PREPARATION_ENABLED:'true',AFW_OAUTH_SERVICE_MODE:'window',
  AFW_OAUTH_PILOT_EXPIRES_AT:new Date(started+profileDuration).toISOString(),AFW_OAUTH_PILOT_PROJECT_ID:projectId,AFW_OAUTH_PILOT_CLIENT_ID:clientId,
  ACCESS_TEAM_DOMAIN:'synthetic.cloudflareaccess.com',ACCESS_AUD:'ci-only-aud',DELEGATED_RATE_LIMITER:{async limit(){return {success:true};}}};
 const options={enabled:true,issuer,env:pins,validateAccessToken:environment=>async(audience,token)=>{
  metrics.authStarted++;
  if(fault==='held-auth')await held('auth');
  const result=await as.validateToken(audience,token,environment);metrics.authCompleted++;
  currentServerFault=fault;
  if(fault==='config-changed')options.enabled=false;
  return result;
 }};
 const mount=createDelegatedPreparationMcpMount(options);
 const context={waitUntil(work){
  const observed=Promise.resolve(work);background.add(observed);observed.then(()=>background.delete(observed),()=>background.delete(observed));
  ctx.waitUntil(observed);
 }};
 return mount?mount(request,context):bad(503);
}
export default{async fetch(request,env,ctx){
 // Miniflare's proxy Host is normalized ONLY in the fixture.
 const headers=new Headers(request.headers);headers.set('host',new URL(request.url).host);request=new Request(request,{headers});
 if(new URL(request.url).origin!==issuer)return bad(404);
 try{
  await ready(env);const path=new URL(request.url).pathname;
  if(path==='/__ci/bootstrap'&&request.method==='POST')return Response.json({clientId,trialStartedAt:started,trialExpiresAt:started+profileDuration});
  if(path==='/authorize')return await authorize(request,env);
  if(path==='/__ci/connection')return await connection(request,env);
  if(path==='/oauth/token'&&request.method==='POST')return await token(request,env,ctx);
  if(path==='/mcp')return await mcp(request,env,ctx);
  if(['/__ci/mount-disabled','/__ci/release-mcp-hold','/__ci/mcp-stats'].includes(path))return await lifecycleProbe(request);
  if(path==='/.well-known/oauth-authorization-server'){
   const response=await as.fetch(request,env,ctx),metadata=await response.json();
   metadata.grant_types_supported=['authorization_code'];return Response.json(metadata);
  }
  return bad(404);
 }catch{return bad();}
}};

// CI-ONLY context for an isolated signed-Access consent adapter test.
export async function preparationCodeCiContext(env){await ready(env);return {authorizationServer:as,profile:consentProfile()};}
