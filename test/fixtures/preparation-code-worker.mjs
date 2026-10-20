// CI-ONLY protocol composition. Never referenced by a production entrypoint.
// Actor headers, control routes and fault switches are synthetic test adapters,
// not a human consent UI, authentication mechanism, or deployable OAuth profile.
import {OAuthAuthorizationServer,OAuthResourceServer,OAuthError} from '@cloudflare/workers-oauth-provider';
import {isLegacyRequest,WebStandardStreamableHTTPServerTransport} from '@modelcontextprotocol/server';
import {createMcpHandler} from 'agents/mcp/server';
import {createDelegatedOAuthStore} from '../../lib/delegated-oauth-store.mjs';
import {createDelegatedProjectRepository} from '../../lib/delegated-project-repository.mjs';
import {createDelegatedProjectMcpServer} from '../../lib/delegated-project-mcp.mjs';
import {evaluatePreparationConsentChoice} from '../../lib/delegated-preparation-consent-policy.mjs';
import {checkAgentCapsulePreparationSchema} from '../../lib/agent-capsule-preparation-schema.mjs';
import {createCapsulePreparationHttpBoundary} from '../../lib/delegated-capsule-preparation-http.mjs';
import {createDelegatedCapsulePreparationOAuthHost} from '../../lib/delegated-capsule-preparation-oauth.mjs';
import {registerDelegatedCapsulePreparation} from '../../lib/delegated-capsule-preparation-mcp.mjs';

const issuer='https://example.invalid',resource=issuer+'/mcp',callback=issuer+'/callback';
const READ='afw:project:read',DRAFTS='afw:capsule:prepare',kind='ci-preparation-protocol-v1';
const projectId='project-a';
let bootstrap,as,clientId,started;
const hash=async value=>Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(value))),x=>x.toString(16).padStart(2,'0')).join('');
const bad=(status=400)=>Response.json({code:'ci_request_rejected'},{status,headers:{'Cache-Control':'no-store'}});
const session=env=>env.DB.withSession('first-primary');
const store=env=>createDelegatedOAuthStore(session(env));
const one=(form,key)=>{const values=form.getAll(key);if(values.length!==1||typeof values[0]!=='string'||!values[0]||values[0].length>1024)throw Error('field');return values[0];};
const policy=(scopes,start,end)=>({enabled:true,requestedScopes:scopes,transactionStartedAt:start,transactionExpiresAt:end,
 trialStartedAt:started,trialExpiresAt:started+180000});
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
  const client=await as.getOAuthApi(env).createClient({clientName:'AFW CI protocol client',redirectUris:[callback],
   grantTypes:['authorization_code'],responseTypes:['code'],tokenEndpointAuthMethod:'none'});
  clientId=client.clientId;
 })();
 return bootstrap;
}
async function authorize(request,env){
 const actor=request.headers.get('x-ci-actor');
 if(actor!=='owner-a')return bad(403);
 const api=as.getOAuthApi(env);
 if(request.method==='GET'){
  const entered=Date.now(),auth=await api.parseAuthRequest(request),ids=new URL(request.url).searchParams.getAll('project');
  if(auth.clientId!==clientId||auth.resource!==resource||auth.codeChallengeMethod!=='S256'
   ||ids.length!==1||ids[0]!==projectId||!scopeSet(auth.scope))return bad();
  if(!await schema(env))return bad(503);
  if(!await owned(env,actor))return bad(403);
  const candidate=evaluatePreparationConsentChoice({decision:'read'},policy(auth.scope,entered,entered+600000),{now:Date.now()});
  if(candidate.code!=='choice_valid')return bad(403);
  const transaction=await api.beginConsent(auth);
  // This CI-only record format defines startedAt as expiresAt-600000.
  // It is not a production schema/profile persistence decision.
  await store(env).createConsent({handleHash:await hash(transaction.handle),subject:actor,kind,projectId,clientId,resource,
   scopes:auth.scope,expiresAt:new Date(entered+600000).toISOString()});
  return Response.json({handle:transaction.handle,trialExpiresAt:started+180000},{headers:transaction.headers});
 }
 if(request.method!=='POST'||request.headers.get('Origin')!==issuer
  ||request.headers.get('Content-Type')!=='application/x-www-form-urlencoded')return bad(403);
 const f=await request.formData();
 if([...f.keys()].some(key=>!['handle','decision'].includes(key)))return bad();
 const handle=one(f,'handle'),decision=one(f,'decision'),digest=await hash(handle);
 const consent=await store(env).getConsent(digest,actor,kind,new Date().toISOString());
 if(!consent||consent.projectId!==projectId||consent.clientId!==clientId||consent.resource!==resource)return bad(403);
 const end=Date.parse(consent.expiresAt);
 const candidate=evaluatePreparationConsentChoice({decision},policy(consent.scopes,end-600000,end),{now:Date.now()});
 if(candidate.code==='cancelled'){
  const denied=await api.denyConsent(request,handle);
  await store(env).consumeConsent(digest,actor,kind,new Date().toISOString());
  return new Response(null,{status:302,headers:denied.headers});
 }
 if(candidate.code!=='choice_valid')return bad();
 if(!await schema(env))return bad(503);
 if(!await owned(env,actor))return bad(403);
 const approved=await api.approveConsent(request,handle,{scope:candidate.scopes});
 if(!await store(env).consumeConsent(digest,actor,kind,new Date().toISOString()))return bad(403);
 if(approved.request.clientId!==clientId||approved.request.resource!==resource||!await owned(env,actor))return bad(403);
 const grantId='ci-prep-'+digest;
 try{
  await store(env).createGrant({grantId,subject:actor,projectId,clientId,resource,scopes:candidate.scopes,
   createdAt:new Date().toISOString(),expiresAt:new Date(candidate.expiresAt).toISOString()});
  // Fault occurs AFTER the real D1 insert, before any code is requested.
  if(request.headers.get('x-ci-grant-ack-loss')==='true')throw Error('CI grant acknowledgment lost');
  const completed=await api.completeAuthorization({request:approved.request,userId:actor,scope:candidate.scopes,metadata:{},
   props:{applicationGrantId:grantId,userId:actor,projectId},revokeExistingGrants:false});
  const headers=new Headers(approved.headers);headers.set('Location',completed.redirectTo);headers.set('Cache-Control','no-store');
  return new Response(null,{status:302,headers});
 }catch{
  await store(env).revokeGrant(grantId,actor,new Date().toISOString());
  return bad(503);
 }
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
async function mcp(request,env,ctx){
 const cleanup=[];
 const pins={...env,AFW_DELEGATED_OAUTH_ENABLED:'true',AFW_DELEGATED_PREPARATION_ENABLED:'true',AFW_OAUTH_SERVICE_MODE:'window',
  AFW_OAUTH_PILOT_EXPIRES_AT:new Date(started+180000).toISOString(),AFW_OAUTH_PILOT_PROJECT_ID:projectId,AFW_OAUTH_PILOT_CLIENT_ID:clientId,
  ACCESS_TEAM_DOMAIN:'synthetic.cloudflareaccess.com',ACCESS_AUD:'ci-only-aud',DELEGATED_RATE_LIMITER:{async limit(){return {success:true};}}};
 const boundary=createCapsulePreparationHttpBoundary({enabled:true,issuer,handle:(bounded,_env,_ctx,requestLease)=>{
  const rs=new OAuthResourceServer({resourceMetadata:{resource,authorization_servers:[issuer]},requiredScopes:[READ],
   validateToken:env=>(audience,token)=>as.validateToken(audience,token,env),
   handler:{async fetch(authorized,environment,authCtx){
    const context={grantId:authCtx.props.applicationGrantId,subject:authCtx.auth.userId,clientId:authCtx.auth.clientId,
     resource:authCtx.auth.audience,scopes:authCtx.auth.scope};
    const repository=createDelegatedProjectRepository({db:session(environment),grantStore:store(environment),
     createPrimarySession:()=>session(environment)});
    const host=createDelegatedCapsulePreparationOAuthHost({env:environment,resource,requestLease,
     getVerifiedContext:()=>({auth:authCtx.auth,props:authCtx.props})});
    const factory=()=>{
     const server=createDelegatedProjectMcpServer({repository,resource,resolveAuthorization:async()=>({context,projectId})});
     registerDelegatedCapsulePreparation(server,{enabled:context.scopes.includes(DRAFTS),host});return server;
    };
    if(await isLegacyRequest(authorized,undefined,{maxRequestBodySize:4096})){
     const server=factory(),transport=new WebStandardStreamableHTTPServerTransport({sessionIdGenerator:undefined,enableJsonResponse:true});
     cleanup.push(()=>server.close());await server.connect(transport);return transport.handleRequest(authorized);
    }
    return createMcpHandler(factory,{route:'/mcp',corsOptions:false,allowedHostnames:['example.invalid'],legacy:'reject',responseMode:'json'})(authorized,environment,authCtx);
   }}});
  return rs.fetch(bounded,pins,ctx);
 }});
 const response=await boundary(request,pins,ctx);
 ctx.waitUntil(Promise.allSettled(cleanup.map(close=>Promise.resolve().then(close))));
 return response;
}
export default{async fetch(request,env,ctx){
 // Miniflare's proxy Host is normalized ONLY in the fixture.
 const headers=new Headers(request.headers);headers.set('host',new URL(request.url).host);request=new Request(request,{headers});
 if(new URL(request.url).origin!==issuer)return bad(404);
 try{
  await ready(env);const path=new URL(request.url).pathname;
  if(path==='/__ci/bootstrap'&&request.method==='POST')return Response.json({clientId,trialExpiresAt:started+180000});
  if(path==='/authorize')return await authorize(request,env);
  if(path==='/oauth/token'&&request.method==='POST')return await token(request,env,ctx);
  if(path==='/mcp')return await mcp(request,env,ctx);
  if(path==='/.well-known/oauth-authorization-server'){
   const response=await as.fetch(request,env,ctx),metadata=await response.json();
   metadata.grant_types_supported=['authorization_code'];return Response.json(metadata);
  }
  return bad(404);
 }catch{return bad();}
}};
