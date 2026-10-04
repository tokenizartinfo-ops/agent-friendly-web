import { OAuthAuthorizationServer, OAuthResourceServer, OAuthError } from '@cloudflare/workers-oauth-provider';
import { createMcpHandler } from 'agents/mcp/server';
import { verifyCloudflareAccessJwt } from './cloudflare-access-identity.mjs';
import { createDelegatedOAuthStore } from './delegated-oauth-store.mjs';
import { createDelegatedProjectRepository } from './delegated-project-repository.mjs';
import { createDelegatedProjectMcpServer } from './delegated-project-mcp.mjs';

const allowedScopes=['afw:project:read','afw:evidence:read'];
const refreshAttempt=Symbol('AFW refresh credential hash');
const escape=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const hash=async value=>Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(value))),x=>x.toString(16).padStart(2,'0')).join('');
const database=env=>env.DB.withSession?env.DB.withSession('first-primary'):env.DB;
function page(body,status=200,headers={},callbackOrigin='') {
  const styleNonce=crypto.randomUUID();
  const h=new Headers(headers);h.set('Content-Type','text/html; charset=utf-8');h.set('Cache-Control','no-store');
  h.set('Content-Security-Policy',`default-src 'none'; style-src 'nonce-${styleNonce}'; form-action 'self'${callbackOrigin?' '+callbackOrigin:''}; frame-ancestors 'none'; base-uri 'none'`);h.set('Referrer-Policy','same-origin');h.set('X-Content-Type-Options','nosniff');
  return new Response(`<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Conexiones AFW</title><style nonce="${styleNonce}">
*{box-sizing:border-box}body{margin:0;background:#f3eadb;color:#181512;font-family:"Comic Sans MS","Comic Neue",cursive;line-height:1.6;font-size:17px}main{width:min(100% - 32px,680px);margin:40px auto;padding:28px;background:#fffaf1;border:2px solid #181512;border-radius:14px;box-shadow:5px 5px 0 #ddc99f;overflow-wrap:anywhere}.brand{font-weight:bold;color:#3c514b;border-bottom:2px solid #ddc99f;padding-bottom:12px}h1{font-size:clamp(1.65rem,5vw,2.2rem);line-height:1.2}h2{font-size:1.25rem;margin-top:28px}p{margin:16px 0}form{margin:20px 0}label{display:block;margin:16px 0}select{display:block;width:100%;max-width:100%;padding:10px}button,select,input{font:inherit}button,a{touch-action:manipulation}button{min-height:48px;padding:10px 18px;margin:8px 8px 0 0;border:2px solid #181512;border-radius:8px;background:#3c514b;color:#fffaf1;cursor:pointer}button[value="deny"]{background:#fffaf1;color:#181512}a{color:#3c514b;text-underline-offset:4px}input[type="checkbox"]{width:20px;height:20px;vertical-align:middle;margin-right:8px}a:focus-visible,button:focus-visible,select:focus-visible,input:focus-visible{outline:3px solid #ad4f35;outline-offset:4px}@media(max-width:480px){main{margin:20px auto;padding:20px;box-shadow:3px 3px 0 #ddc99f}button{width:100%;margin-right:0}}
</style></head><body><main><div class="brand">AFW · Agent Friendly Web</div>${body}</main></body></html>`,{status,headers:h});
}
function failure(status) {return page('<h1>Te acompaño a revisar la conexión</h1><p>No pude completar esta conexión. No puedo confirmar la causa desde esta pantalla.</p><p>Podés volver a tu expediente para revisar el permiso y decidir si querés iniciar una conexión nueva. No voy a volver a conectar al asistente automáticamente.</p><a href="https://agentfriendlyweb.dev/expediente">Volver a mi expediente</a>',status);}
async function form(request) {
  if(!request.headers.get('Content-Type')?.startsWith('application/x-www-form-urlencoded'))throw Error('form');
  const reader=request.body?.getReader();if(!reader)throw Error('form');let length=0;const chunks=[];
  for(;;){const {done,value}=await reader.read();if(done)break;length+=value.length;if(length>16384){void reader.cancel().catch(()=>{});throw Error('form');}chunks.push(value);}
  const bytes=new Uint8Array(length);let offset=0;for(const chunk of chunks){bytes.set(chunk,offset);offset+=chunk.length;}
  return new URLSearchParams(new TextDecoder().decode(bytes));
}
function single(f,key){const values=f.getAll(key);if(values.length!==1||!values[0]||values[0].length>1024)throw Error('form');return values[0];}
function validScopes(scopes){return scopes.includes(allowedScopes[0])&&scopes.length<=2&&new Set(scopes).size===scopes.length&&scopes.every(s=>allowedScopes.includes(s));}
function pilotProjectAllowed(env,projectId){return env.AFW_OAUTH_PILOT_PROJECT_ID===undefined||env.AFW_OAUTH_PILOT_PROJECT_ID===projectId;}
function connectionAllowed(env,grant,subject,resource){return grant?.subject===subject&&grant.clientId===env.AFW_OAUTH_PILOT_CLIENT_ID&&grant.resource===resource&&pilotProjectAllowed(env,grant.projectId);}
function readableTime(value){const date=new Date(value);return Number.isFinite(date.getTime())?`<time datetime="${escape(date.toISOString())}">${escape(new Intl.DateTimeFormat('es',{dateStyle:'medium',timeStyle:'short',timeZone:'UTC'}).format(date))} UTC</time>`:'fecha pendiente';}

/** Isolated OAuth host. Public AFW routes and its anonymous MCP are not modified. */
export function createDelegatedOAuthWorker({issuer,resource,now=()=>new Date().toISOString(),accessVerifier=verifyCloudflareAccessJwt}) {
  if(new URL(issuer).origin!==issuer||resource!==issuer+'/mcp')throw Error('Canonical issuer/resource required');
  const authorizationServer=new OAuthAuthorizationServer({issuer,resources:[resource],scopesSupported:allowedScopes,
    accessTokenTTL:300,clientIdMetadataDocumentEnabled:false,
    async tokenExchangeCallback(options){
      const store=createDelegatedOAuthStore(database(options.env));const grant=await store.getGrant(options.props?.applicationGrantId);
      if(options.env.AFW_OAUTH_REFRESH_ENABLED==='true')await store.refreshSchemaReady();
      const refreshing=options.grantType==='refresh_token'&&options.env.AFW_OAUTH_REFRESH_ENABLED==='true';
      const remaining=Math.floor((Date.parse(grant?.expiresAt)-Date.parse(now()))/1000);
      if((options.grantType!=='authorization_code'&&!refreshing)||!grant||grant.status!=='active'||!Number.isFinite(remaining)||remaining<60||
        grant.subject!==options.userId||grant.clientId!==options.clientId||grant.clientId!==options.env.AFW_OAUTH_PILOT_CLIENT_ID||
        grant.resource!==resource||options.resource!==resource||!pilotProjectAllowed(options.env,grant.projectId)||!validScopes(options.scope)||options.scope.some(s=>!grant.scopes.includes(s))||
        !validScopes(options.requestedScope)||options.requestedScope.some(s=>!grant.scopes.includes(s))||
        !(await createDelegatedProjectRepository({db:database(options.env),grantStore:store}).getOwnedProject(grant.projectId,grant.subject)))
        throw new OAuthError('invalid_grant',{description:'Permission unavailable',statusCode:400});
      if(refreshing){
        const digest=options.env[refreshAttempt];
        if(!digest||!await store.consumeRefresh(digest,grant.grantId,options.userId,options.clientId,resource,now()))
          // Provider invalid_grant revokes its whole family. A retry of a
          // consumed credential must not destroy the successful successor.
          throw new OAuthError('invalid_request',{description:'Renewal already used; reconnect if needed',statusCode:400});
      }else if(!await store.consumeExchange(grant.grantId,options.userId,options.clientId,resource,now()))
        throw new OAuthError('invalid_grant',{description:'Code exchange already consumed',statusCode:400});
      const finalRemaining=Math.floor((Date.parse(grant.expiresAt)-Date.parse(now()))/1000);
      if(finalRemaining<60)throw new OAuthError('invalid_grant',{description:'Permission unavailable',statusCode:400});
      return {accessTokenTTL:Math.min(300,finalRemaining),refreshTokenTTL:options.env.AFW_OAUTH_REFRESH_ENABLED==='true'?finalRemaining:0};
    },
  });
  async function boundedTokenResponse(response,env){
    if(!response.ok)return response;
    const payload=await response.clone().json();
    if(!payload.access_token)return response; // Revocation has no token response.
    const token=await authorizationServer.validateToken(resource,payload.access_token,env);
    const store=createDelegatedOAuthStore(database(env));
    const grant=token?.props?.applicationGrantId?await store.getGrant(token.props.applicationGrantId):null;
    if(!connectionAllowed(env,grant,token?.userId,resource)||grant.status!=='active'||
      !await createDelegatedProjectRepository({db:database(env),grantStore:store}).getOwnedProject(grant.projectId,grant.subject))return failure(400);
    // Provider timestamps its opaque KV token later than the callback. The
    // advertised usable duration and every MCP read use the D1 absolute limit.
    const remaining=Math.floor((Date.parse(grant.expiresAt)-Date.parse(now()))/1000);
    if(!Number.isFinite(remaining)||remaining<1)return failure(400);
    payload.expires_in=Math.min(payload.expires_in,remaining);
    const headers=new Headers(response.headers);headers.delete('Content-Length');headers.set('Cache-Control','no-store');
    return new Response(JSON.stringify(payload),{status:response.status,headers});
  }
  const resourceServer=new OAuthResourceServer({resourceMetadata:{resource,authorization_servers:[issuer]},requiredScopes:[allowedScopes[0]],
    validateToken:env=>(audience,token)=>authorizationServer.validateToken(audience,token,env),
    handler:{async fetch(request,env,ctx){
      if(!ctx.props?.applicationGrantId||ctx.props.userId!==ctx.auth.userId)return failure(401);
      if(!pilotProjectAllowed(env,ctx.props.projectId))return failure(403);
      const db=database(env);const repository=createDelegatedProjectRepository({db,grantStore:createDelegatedOAuthStore(db)});
      const context={grantId:ctx.props.applicationGrantId,subject:ctx.auth.userId,clientId:ctx.auth.clientId,resource:ctx.auth.audience,scopes:ctx.auth.scope};
      return createMcpHandler(()=>createDelegatedProjectMcpServer({repository,resource,now,
        resolveAuthorization:async()=>({context,projectId:ctx.props.projectId})}),
        {route:'/mcp',corsOptions:false,allowedHostnames:[new URL(issuer).hostname],legacy:'stateless',responseMode:'json'})(request,env,ctx);
    }},
  });
  return {authorizationServer,async fetch(request,env,ctx){
    const url=new URL(request.url);
    if(env.AFW_DELEGATED_OAUTH_ENABLED!=='true'||url.origin!==issuer)return failure(404);
    const pilotProject=env.AFW_OAUTH_PILOT_PROJECT_ID;
    if(pilotProject!==undefined&&(typeof pilotProject!=='string'||!pilotProject||pilotProject.length>200||pilotProject.trim()!==pilotProject))return failure(503);
    const serviceMode=env.AFW_OAUTH_SERVICE_MODE??'window';
    const currentTime=Date.parse(now());
    if(!['window','stable'].includes(serviceMode)||!Number.isFinite(currentTime))return failure(503);
    if(serviceMode==='stable'&&env.AFW_OAUTH_PILOT_EXPIRES_AT!==undefined)return failure(503);
    if(serviceMode==='window'){
      const deadline=Date.parse(env.AFW_OAUTH_PILOT_EXPIRES_AT);
      if(!Number.isFinite(deadline))return failure(503);
      if(currentTime>=deadline)return failure(404);
    }
    if(typeof env.DELEGATED_RATE_LIMITER?.limit!=='function')return failure(503);
    try{if((await env.DELEGATED_RATE_LIMITER.limit({key:'delegated:'+ (request.headers.get('CF-Connecting-IP')||'unknown')}))?.success!==true)
      return page('<p>Hicimos varias consultas seguidas. Esperá un minuto y retomamos.</p>',429,{'Retry-After':'60'});
    }catch{return failure(503);}
    if(!env.DB||!env.OAUTH_KV||!env.AFW_OAUTH_PILOT_CLIENT_ID||!env.ACCESS_AUD||!env.ACCESS_TEAM_DOMAIN)return failure(503);
    try {
      if(url.pathname==='/mcp'||url.pathname.startsWith('/.well-known/oauth-protected-resource'))return await resourceServer.fetch(request,env,ctx);
      if(url.pathname==='/.well-known/oauth-authorization-server'){
        const response=await authorizationServer.fetch(request,env,ctx);
        if(!response.ok)return response;
        const metadata=await response.json();
        metadata.grant_types_supported=env.AFW_OAUTH_REFRESH_ENABLED==='true'?['authorization_code','refresh_token']:['authorization_code'];
        metadata.token_endpoint_auth_methods_supported=['none'];
        const headers=new Headers(response.headers);headers.set('Cache-Control','no-store');headers.delete('Content-Length');
        return new Response(JSON.stringify(metadata),{status:response.status,headers});
      }
      if(url.pathname==='/oauth/register')return failure(404);
      if(url.pathname==='/oauth/token'&&request.method==='POST'){
        let body;try{body=await form(request.clone());}catch{return failure(400);}
        if(body.get('grant_type')==='refresh_token'){
          if(env.AFW_OAUTH_REFRESH_ENABLED!=='true')return failure(400);
          let credential;try{credential=single(body,'refresh_token');}catch{return failure(400);}
          // Request-local context only; no credential is passed to D1 or logs.
          return await boundedTokenResponse(await authorizationServer.fetch(request,{...env,[refreshAttempt]:await hash(credential)},ctx),env);
        }
        if(body.has('token')&&!body.has('grant_type')&&body.getAll('client_id').length===1&&body.get('client_id')===env.AFW_OAUTH_PILOT_CLIENT_ID&&!request.headers.has('Authorization')&&!body.has('client_secret')){
          let token;try{token=await authorizationServer.validateToken(resource,single(body,'token'),env);}catch{token=null;}
          if(token?.clientId===env.AFW_OAUTH_PILOT_CLIENT_ID&&token.props?.applicationGrantId)
            await createDelegatedOAuthStore(database(env)).revokeGrant(token.props.applicationGrantId,token.userId,now());
        }
        const response=await authorizationServer.fetch(request,env,ctx);
        return body.has('grant_type')?await boundedTokenResponse(response,env):response;
      }
      if(!['/authorize','/connections','/connections/revoke'].includes(url.pathname))return await authorizationServer.fetch(request,env,ctx);
      if(!['GET','POST'].includes(request.method))return failure(405);
      if(request.method==='POST'&&request.headers.get('Origin')!==issuer)return failure(403);
      const verified=await accessVerifier({token:request.headers.get('Cf-Access-Jwt-Assertion'),teamDomain:env.ACCESS_TEAM_DOMAIN,audience:env.ACCESS_AUD});
      if(!verified.ok)return failure(401);
      const subject=verified.identity.userId,db=database(env),store=createDelegatedOAuthStore(db),api=authorizationServer.getOAuthApi(env);
      const repository=createDelegatedProjectRepository({db,grantStore:store});
      if(url.pathname==='/authorize'&&request.method==='GET'){
        let auth;try{auth=await api.parseAuthRequest(request);}catch{return failure(400);}
        if(auth.clientId!==env.AFW_OAUTH_PILOT_CLIENT_ID||auth.resource!==resource||auth.codeChallengeMethod!=='S256'||!validScopes(auth.scope))return failure(400);
        // Chrome applies form-action to the redirect chain too. Allow only the
        // canonical origin of the provider-validated, pre-registered callback.
        const callback=new URL(auth.redirectUri);
        if(!['http:','https:'].includes(callback.protocol)||/[\s;'"*]/.test(callback.origin))return failure(400);
        const ids=url.searchParams.getAll('project');if(ids.length>1||(ids.length&&(!ids[0]||ids[0].length>200)))return failure(400);
        if(ids.length&&!pilotProjectAllowed(env,ids[0]))return failure(404);
        const selected=pilotProject??ids[0];
        const pinned=selected?await repository.getOwnedProject(selected,subject):null;
        if(selected&&!pinned)return failure(404);
        const projects=pinned?[pinned]:await repository.listConsentProjects(subject);
        if(!projects.length)return page('<h1>Conectar tu asistente</h1><p>Todavía no tenés un expediente para conectar. Podés crearlo en AFW y volver cuando quieras.</p><a href="https://agentfriendlyweb.dev/expediente">Volver a AFW</a>');
        if(projects.length>20)return page('<h1>Elegí el expediente desde AFW</h1><p>Tenés varios expedientes. Abrí el que querés conectar para preparar un permiso específico.</p><a href="https://agentfriendlyweb.dev/expediente">Volver a AFW</a>');
        const selection=pinned||projects.length===1?`<input type="hidden" name="project" value="${escape(projects[0].id)}"><p>Expediente: ${escape(projects[0].organization)}</p>`:`<label>¿Qué expediente querés conectar? <select name="project" required><option value="">Elegí un expediente</option>${projects.map(p=>`<option value="${escape(p.id)}">${escape(p.organization)}</option>`).join('')}</select></label>`;
        const description=await api.describeConsent(auth),transaction=await api.beginConsent(auth);
        await store.createConsent({handleHash:await hash(transaction.handle),subject,kind:'authorize',projectId:pinned?.id??(projects.length===1?projects[0].id:''),clientId:auth.clientId,resource,scopes:auth.scope,expiresAt:new Date(Date.parse(now())+600000).toISOString()});
        const evidenceChoice=auth.scope.includes('afw:evidence:read')?'<label><input type="checkbox" name="scope" value="afw:evidence:read"> También compartir las observaciones guardadas</label><p>Es opcional. Permite leer comprobaciones anteriores y sus fechas; no ejecutar una auditoría nueva.</p>':'';
        return page(`<h1>Conectar tu asistente</h1><p>${escape(description.clientName)} podrá consultar el resumen del expediente que elijas. No podrá cambiar datos ni publicar.</p><p>El permiso dura diez minutos; podés desconectarlo antes desde AFW.${env.AFW_OAUTH_REFRESH_ENABLED==='true'?' Dentro de ese plazo, el asistente puede renovar su conexión sin ampliar el permiso.':''}</p><form method="post" action="/authorize"><input type="hidden" name="handle" value="${escape(transaction.handle)}">${selection}<input type="hidden" name="scope" value="afw:project:read">${evidenceChoice}<button name="decision" value="approve">Permitir lectura</button><button name="decision" value="deny" formnovalidate>Cancelar</button></form>`,200,transaction.headers,callback.origin);
      }
      if(url.pathname==='/authorize'&&request.method==='POST'){
        let f,h,decision;try{f=await form(request);h=single(f,'handle');decision=single(f,'decision');}catch{return failure(400);}
        const digest=await hash(h),consent=await store.getConsent(digest,subject,'authorize',now());if(!consent)return failure(403);
        const scopes=f.getAll('scope');if(!validScopes(scopes)||scopes.some(s=>!consent.scopes.includes(s)))return failure(400);
        if(decision==='deny'){const denied=await api.denyConsent(request,h);await store.consumeConsent(digest,subject,'authorize',now());return new Response(null,{status:302,headers:denied.headers});}
        if(decision!=='approve')return failure(400);
        let projectId;try{projectId=f.has('project')?single(f,'project'):consent.projectId;}catch{return failure(400);}
        if(!projectId||projectId.length>200||(consent.projectId&&projectId!==consent.projectId))return failure(400);
        if(!pilotProjectAllowed(env,projectId))return failure(403);
        if(!await repository.getOwnedProject(projectId,subject))return failure(404);
        let approved;try{approved=await api.approveConsent(request,h,{scope:scopes});}catch{return failure(400);}
        if(!await store.consumeConsent(digest,subject,'authorize',now()))return failure(403);
        if(approved.request.clientId!==consent.clientId||approved.request.resource!==consent.resource||!await repository.getOwnedProject(projectId,subject))return failure(403);
        const grantId=crypto.randomUUID();await store.createGrant({grantId,subject,clientId:consent.clientId,projectId,resource,scopes,createdAt:now(),expiresAt:new Date(Date.parse(now())+600000).toISOString()});
        try{const completed=await api.completeAuthorization({request:approved.request,userId:subject,scope:scopes,metadata:{},props:{applicationGrantId:grantId,userId:subject,projectId},revokeExistingGrants:false});
          const headers=new Headers(approved.headers);headers.set('Location',completed.redirectTo);headers.set('Cache-Control','no-store');return new Response(null,{status:302,headers});
        }catch{await store.revokeGrant(grantId,subject,now());return failure(503);}
      }
      if(url.pathname==='/connections'&&request.method==='GET'){
        const nonce=crypto.randomUUID();await store.createConsent({handleHash:await hash(nonce),subject,kind:'revoke',projectId:'',clientId:'',resource:'',scopes:[],expiresAt:new Date(Date.parse(now())+600000).toISOString()});
        const grants=(await store.listGrants(subject,{clientId:env.AFW_OAUTH_PILOT_CLIENT_ID,resource,projectId:env.AFW_OAUTH_PILOT_PROJECT_ID})).filter(g=>connectionAllowed(env,g,subject,resource));
        const connections=(await Promise.all(grants.map(async g=>{
          const project=await repository.getOwnedProject(g.projectId,subject);
          if(!project)return '';
          const active=g.status==='active'&&!g.revokedAt&&Number.isFinite(Date.parse(g.expiresAt))&&Date.parse(g.expiresAt)>Date.parse(now());
          const state=g.revokedAt?'Desconectada':active?'Conectada':'Permiso vencido';
          const detail=g.revokedAt?'AFW ya retiró este permiso. No necesitás hacer nada más.':active?'Desconectar bloquea la siguiente consulta del asistente.':'Este permiso ya no permite consultar tu expediente. Tu expediente sigue guardado. Para retomarlo, conectá de nuevo tu asistente y revisá qué querés compartir.';
          const scope=g.scopes.includes('afw:evidence:read')?'Resumen y comprobaciones guardadas':'Resumen del expediente';
          const back=`<a href="https://agentfriendlyweb.dev/expediente?project=${encodeURIComponent(g.projectId)}">Volver a tu expediente</a>`;
          const summary=`<h2>Expediente: ${escape(project.organization)}</h2><p>${state}</p><p>${scope}</p><p>${detail}</p>`;
          return active?`<form action="/connections/revoke" method="post"><input type="hidden" name="handle" value="${escape(nonce)}"><input type="hidden" name="grant" value="${escape(g.grantId)}">${summary}<p>El permiso vence ${readableTime(g.expiresAt)}.</p><button>Desconectar</button>${back}</form>`:`<section>${summary}<p>${g.revokedAt?'Desconectaste el permiso':'El permiso venció'} ${readableTime(g.revokedAt||g.expiresAt)}.</p>${back}</section>`;
        }))).join('');
        return page(`<h1>Tus conexiones</h1><p>Acá podés revisar los permisos de lectura de tus asistentes.</p>${connections||'<p>No tenés conexiones para revisar. Tu expediente sigue guardado en AFW.</p>'}`,200,{'Set-Cookie':`__Host-afw-delegated-revoke=${nonce}; Path=/; Secure; HttpOnly; SameSite=Strict; Max-Age=600`});
      }
      if(url.pathname==='/connections/revoke'&&request.method==='POST'){
        let f,h,g;try{f=await form(request);h=single(f,'handle');g=single(f,'grant');}catch{return failure(400);}
        const cookie=(request.headers.get('Cookie')??'').split(';').map(x=>x.trim()).find(x=>x.startsWith('__Host-afw-delegated-revoke='))?.slice('__Host-afw-delegated-revoke='.length);
        if(cookie!==h||!await store.consumeConsent(await hash(h),subject,'revoke',now()))return failure(403);
        if(!connectionAllowed(env,await store.getGrant(g),subject,resource))return failure(403);
        await store.revokeGrant(g,subject,now());return new Response(null,{status:303,headers:{Location:issuer+'/connections','Cache-Control':'no-store'}});
      }
      return failure(405);
    }catch{return failure(503);}
  }};
}
