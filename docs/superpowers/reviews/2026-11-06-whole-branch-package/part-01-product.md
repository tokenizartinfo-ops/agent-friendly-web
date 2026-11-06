# Whole-branch review packet 1/26 — product

PROJECT=AFW; repository=tokenizartinfo-ops/agent-friendly-web; SOURCE head=8b2380c9bcc9c383ec46590df1403eed19fd2659; tree=07079c8cc3670a6a1db51ca1daadbf3172c2d445; mergebase=f4ff51596be918e9d556f6765aeb0441133ff52f. Review index in this directory is authoritative for complete579file/954commit coverage. This packet contains full U10 diffs and exact blob provenance for 45 files; no runtime or merge authorization. Generated in cloud tool memory from pinned GitHub text, no local checkout/build.

## Packet manifest

- lib/delegated-oauth-worker.mjs: f8299df1938bf58ca8f1639085aadd7b6c42ec37 -> d979f395029c9b1e66a99222d06acf99eba4f358; full diff chars=19327
- lib/dossier-event-rpc-authority.mjs: 1e76937b44554d0609bcfa27a8c47749483f1ac0 -> a8239dc554382d4df6b6d3c3cd0a5b345c2a1184; full diff chars=5962
- lib/dossier-monitoring-owner-http.mjs: e46565a64131a841103bf2af969b4d42257c2108 -> 9b3a362c0738f5cefc00f8770bc2c099f76d7eee; full diff chars=8742
- lib/mcp-activation-observer.mjs: c835f8724fc4ab44f25f5179069c8b44096ae48e -> d739010a8eb4339413ab82b6c1893d640858b335; full diff chars=9241
- lib/mcp-canary-restoration-transport.mjs: 7b15a6703fa8e5632efa1f233f329f7dd0fdc597 -> 5233c720f4a49b458c0ff24ed258ece1bef96759; full diff chars=9507
- lib/mcp-fixed-terminal-workflows.mjs: 35c8aac248045f0942e0dd742d8a4fec62c22034 -> 248fba0801852d803b40c3e112c6f51321744525; full diff chars=13460
- lib/mcp-node-process-custody.mjs: 5752efe448688d3bb2f3ae3541b004f0566cd56c -> 046d3cff69c63be9e221b3ff25a58ae40d8fb5bf; full diff chars=23350
- lib/mcp-original-container-runtime.mjs: 8acedd3c6164b1efa1c75785a14accda8dd74401 -> 9497867e4f1325479405ac58c1ab43ecfdb01250; full diff chars=4250
- lib/mcp-own-durable-host.mjs: b22a466eab614109ae621703ce4b77731d9fdce1 -> 01b7b7ba329fd2fb69f9a3404f68861a072a19da; full diff chars=8767
- lib/mcp-own-permission-withdrawal.mjs: a0b023cf0959156cf548aa83aec830349499d452 -> c0e3551c983e42104e6f2706a58fdc27bf746033; full diff chars=3866
- lib/mcp-own-retirement-host.mjs: f657d59ca3c3c290d13e9271ecda10155fa82c9b -> e3b36fbda9a50fedc2e51b6d36137c51a3466c5c; full diff chars=2931
- lib/mcp-qa-cloud-lifecycle-admission.mjs: ffeef9d35118900b0631f18d76b02929558211cd -> dfb2e8ac9fc2162a21e93437ac81a1d4d91d3f30; full diff chars=5470
- lib/mcp-release-operator-policy.mjs: a4d68e1a0724aaae88e19a8346dc26ee5c70b7c1 -> 20518baf5f3ee05942ed56c8d5fab3fbe2f53976; full diff chars=9268
- lib/mcp-release-runtime.mjs: 2420c760af1485e39aa53ff7726b9605161f768c -> 585dcbda7d5403e1ddb37d697457cc0899e0d03b; full diff chars=25142
- lib/mcp-release-successor-reservation.mjs: 73b0b6fbe0cd2176417d760cdde7587e91980581 -> 9b6ea39f3cfe477b6f6cd4bf9f789ec18a5d816e; full diff chars=6239
- lib/mcp-successor-launch-gate.mjs: 621d9eefc79f9dd698797b2912697be1cc59d2e1 -> 11348f49c1e2f26436b8dcbb550dfd2348b61b73; full diff chars=12502
- lib/mcp-successor-reservation.mjs: a31dc55594f6f4c98f22efcf0d86484cacbee620 -> ef2de272942cf3bfc4ef9a9c49981857fcb7bc39; full diff chars=6977
- worker/independent-closure/index.mjs: abf2befc10fcf567bb0b6e3b227353eb3674a9a5 -> 2847bf94f2aeca072f66866ed1bce07e9fcd4613; full diff chars=11097
- worker/mcp-own/index.mjs: 99a25b9b8359550cac283e8d32f6d12303fa829b -> 089e5313eb22d017b8dfe4e6daba73c8c7753cbc; full diff chars=10424
- lib/dossier-event-policy-data.mjs: ABSENT -> b984f9221272ff7554887c59a8ab7561cce28cae; full diff chars=2060
- lib/mcp-finite-child-primary.mjs: ABSENT -> 8b44125a9421fcb538038f923ecdf986033f59ba; full diff chars=3556
- lib/mcp-finite-cleanup-policy.mjs: ABSENT -> 4c9e5a74715becec9d9e471244978f9f0fc88ce3; full diff chars=1996
- lib/mcp-finite-evidence.mjs: ABSENT -> 8e02e3941fc8d34fd6a13fbbd0fa55b638422d82; full diff chars=3332
- lib/mcp-finite-primary-inventory.mjs: ABSENT -> be1348f33750a20d02f008c15e5b3cd975d4a60f; full diff chars=6045
- lib/mcp-own-finite-admission-gate.mjs: ABSENT -> d782a4cbc5b11b3c2009eb318a19e06430b28873; full diff chars=15394
- lib/mcp-own-finite-cleanup-host.mjs: ABSENT -> b77bba634c999e7a8a7d02aae8d81a4627ff5f4b; full diff chars=6389
- lib/mcp-own-finite-cleanup-proof.mjs: ABSENT -> 59f633d8dcdbfe508719a3530ccb52572396e0b3; full diff chars=13945
- lib/mcp-own-finite-primary.mjs: ABSENT -> 7fa32e90ca6d47a75571cd64f8b199be330219df; full diff chars=12806
- lib/mcp-own-finite-reduction.mjs: ABSENT -> 6ce7798ece537f41823c17186336b6f8ac08d90f; full diff chars=6367
- lib/mcp-qa-finite-adoption-source.mjs: ABSENT -> ceda920e47f2709fc3200264322a0ce18c7b1158; full diff chars=618
- lib/mcp-qa-finite-adoption.mjs: ABSENT -> dc3d87446e0d693c24eb1f83e557bcb36ecb7666; full diff chars=5324
- lib/mcp-qa-finite-bootstrap-admission.mjs: ABSENT -> da6397e8cbdfa33a019e0f1e2c0d0f3eeed8aea9; full diff chars=2725
- lib/mcp-qa-finite-bootstrap-issuer.mjs: ABSENT -> 33e952ae0d14290b43b4fce38cb366c0d4645209; full diff chars=6269
- lib/mcp-qa-finite-bootstrap-native.mjs: ABSENT -> ac0d14ebb5a986e2611e9ddbd72592541c9a4c28; full diff chars=8699
- lib/mcp-qa-finite-bootstrap-primary.mjs: ABSENT -> 6dac79ec9539f7195d058580c5d2a7798eed9696; full diff chars=5470
- lib/mcp-qa-finite-bootstrap-publication.mjs: ABSENT -> 0018313f529fa84ffbcc5012a9ddb86373c8f081; full diff chars=3584
- lib/mcp-qa-finite-bootstrap-record.mjs: ABSENT -> 8030ed7c405d4727d84a26ef8bafcb03c1a409d8; full diff chars=4834
- lib/mcp-qa-finite-bootstrap-source.mjs: ABSENT -> 66aef02dab28ff9e94957f04dfe50b407f2a5e0c; full diff chars=1034
- lib/mcp-qa-finite-canary-restorer.mjs: ABSENT -> 9494c4ec398d41c369d426a626e60c617440845f; full diff chars=9905
- lib/mcp-qa-finite-candidate-residency.mjs: ABSENT -> 29373312a0e60ed6ca87ca3952dba751186662a8; full diff chars=3575
- lib/mcp-qa-finite-cleanup-collector.mjs: ABSENT -> 063bd93d4f6c66640999d8741208be53bc4843ab; full diff chars=2472
- lib/mcp-qa-finite-cleanup-store.mjs: ABSENT -> 08b78d61a5024217735eec2af6f162d63c65424c; full diff chars=11496
- lib/mcp-qa-finite-confirmation-source.mjs: ABSENT -> 0957b05ed49b79e6d2ef5c283f23daaedfcf10ea; full diff chars=618
- lib/mcp-qa-finite-confirmation.mjs: ABSENT -> 530cbc2e1051431f07764ae7718c293982a66af2; full diff chars=7604
- lib/mcp-qa-finite-connection-preparation.mjs: ABSENT -> f1388c4586f9e2173f793605b11825de909b9caa; full diff chars=5101

## lib/delegated-oauth-worker.mjs

~~~~~~~~~~diff
diff --git a/lib/delegated-oauth-worker.mjs b/lib/delegated-oauth-worker.mjs
--- a/lib/delegated-oauth-worker.mjs
+++ b/lib/delegated-oauth-worker.mjs
@@ -1,19 +1,23 @@
 import { OAuthAuthorizationServer, OAuthResourceServer, OAuthError } from '@cloudflare/workers-oauth-provider';
 import { createMcpHandler } from 'agents/mcp/server';
 import { verifyCloudflareAccessJwt } from './cloudflare-access-identity.mjs';
 import { createDelegatedOAuthStore } from './delegated-oauth-store.mjs';
 import { createDelegatedProjectRepository } from './delegated-project-repository.mjs';
 import { createDelegatedProjectMcpServer } from './delegated-project-mcp.mjs';
 import { createDelegatedContinuityHost } from './delegated-continuity-host.mjs';
 import { createDossierMonitoringOwnerHandler } from './dossier-monitoring-owner-http.mjs';
 
+import {createFiniteOwnerRequestLease} from './mcp-qa-finite-owner-preparation.mjs';
+import {forwardPrivateQaFiniteOwnerAuthorization,forwardPrivateQaFiniteOwnerGrant} from './mcp-qa-finite-owner-source.mjs';
+const preservedPreparationRequests=new WeakMap();
+const preparationCookie=request=>(request.headers.get('Cookie')??'').split(';').some(x=>x.trim().startsWith('__Host-afw-finite-prepare='));
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
@@ -25,20 +29,21 @@
 function connectionWindowNotice(requestPath,state){
   if(!humanConnectionPaths.has(requestPath))return failure(404);
   const heading={paused:'Esta prueba está en pausa',expired:'Esta ventana de prueba terminó',future:'Esta prueba todavía no empezó'}[state];
   return page(`<h1>${heading}</h1><p>No necesitás repetir códigos ni volver a conectar desde esta pantalla.</p><p>Podés pedir a tu asistente que prepare el siguiente paso y te avise cuando esté listo. El vencimiento no borra el expediente ni renueva permisos automáticamente.</p><a href="https://agentfriendlyweb.dev/expediente">Volver a AFW</a>`,404);
 }
 async function form(request) {
   if(!request.headers.get('Content-Type')?.startsWith('application/x-www-form-urlencoded'))throw Error('form');
   const reader=request.body?.getReader();if(!reader)throw Error('form');let length=0;const chunks=[];
   for(;;){const {done,value}=await reader.read();if(done)break;length+=value.length;if(length>16384){void reader.cancel().catch(()=>{});throw Error('form');}chunks.push(value);}
   const bytes=new Uint8Array(length);let offset=0;for(const chunk of chunks){bytes.set(chunk,offset);offset+=chunk.length;}
+  if(preparationCookie(request))preservedPreparationRequests.set(request,new Request(request.url,{method:request.method,headers:request.headers,body:bytes,signal:request.signal}));
   return new URLSearchParams(new TextDecoder().decode(bytes));
 }
 function single(f,key){const values=f.getAll(key);if(values.length!==1||!values[0]||values[0].length>1024)throw Error('form');return values[0];}
 function validScopes(scopes){return scopes.includes(allowedScopes[0])&&scopes.length<=2&&new Set(scopes).size===scopes.length&&scopes.every(s=>allowedScopes.includes(s));}
 function pilotProjectAllowed(env,projectId){return env.AFW_OAUTH_PILOT_PROJECT_ID===undefined||env.AFW_OAUTH_PILOT_PROJECT_ID===projectId;}
 function connectionAllowed(env,grant,subject,resource){return grant?.subject===subject&&grant.clientId===env.AFW_OAUTH_PILOT_CLIENT_ID&&grant.resource===resource&&pilotProjectAllowed(env,grant.projectId);}
 function readableTime(value){const date=new Date(value);return Number.isFinite(date.getTime())?`<time datetime="${escape(date.toISOString())}">${escape(new Intl.DateTimeFormat('es',{dateStyle:'medium',timeStyle:'short',timeZone:'UTC'}).format(date))} UTC</time>`:'fecha pendiente';}
 
 // Server-only own-QA pins. No selector, Access issuer or resource comes from a
 // browser. Missing dedicated opt-in must not read dependencies or configuration.
@@ -64,21 +69,21 @@
   if(new URL(issuer).origin!==issuer||resource!==issuer+'/mcp')throw Error('Canonical issuer/resource required');
   if(eventsAuthorityFactory!==undefined&&typeof eventsAuthorityFactory!=='function')throw Error('Trusted events authority factory required');
   const authorizationServer=new OAuthAuthorizationServer({issuer,resources:[resource],scopesSupported:allowedScopes,
     accessTokenTTL:300,clientIdMetadataDocumentEnabled:false,
     async tokenExchangeCallback(options){
       const store=createDelegatedOAuthStore(database(options.env));const grant=await store.getGrant(options.props?.applicationGrantId);
       if(options.env.AFW_OAUTH_REFRESH_ENABLED==='true')await store.refreshSchemaReady();
       const refreshing=options.grantType==='refresh_token'&&options.env.AFW_OAUTH_REFRESH_ENABLED==='true';
       const remaining=Math.floor((Date.parse(grant?.expiresAt)-Date.parse(now()))/1000);
       if((options.grantType!=='authorization_code'&&!refreshing)||!grant||grant.status!=='active'||!Number.isFinite(remaining)||remaining<60||
-        grant.subject!==options.userId||grant.clientId!==options.clientId||grant.clientId!==options.env.AFW_OAUTH_PILOT_CLIENT_ID||
+        grant.subject!==options.userId||options.props?.userId!==grant.subject||options.props?.projectId!==grant.projectId||grant.clientId!==options.clientId||grant.clientId!==options.env.AFW_OAUTH_PILOT_CLIENT_ID||
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
@@ -123,20 +128,23 @@
         }catch{return failure(503);}
       }
       if(continuity)continuity.now();
       return createMcpHandler(()=>createDelegatedProjectMcpServer({repository,resource,now:continuity?.now??now,
         continuityEnabled:!!continuity,continuityUntil:continuity?.until,
         resolveAuthorization:async()=>({context,projectId:ctx.props.projectId}),eventsEnabled:!!eventsAuthority,eventsAuthority}),
         {route:'/mcp',corsOptions:false,allowedHostnames:[new URL(issuer).hostname],legacy:'stateless',responseMode:'json'})(request,env,ctx);
     }},
   });
   return {authorizationServer,async fetch(request,env,ctx){
+    // This original parent starts before SDK/auth/DB IO; source hooks cannot renew it.
+    const preparationParent=preparationCookie(request)?createFiniteOwnerRequestLease(request):null;
+    try{
     const url=new URL(request.url);
     if(url.origin!==issuer)return failure(404);
     if(env.AFW_DELEGATED_OAUTH_ENABLED!=='true')return connectionWindowNotice(url.pathname,'paused');
     const monitoring=['/monitoring','/monitoring/grant','/monitoring/revoke'].includes(url.pathname);
     if(monitoring&&env.AFW_DOSSIER_MONITORING_OWNER_ENABLED!=='true')return connectionWindowNotice(url.pathname,'paused');
     let monitor;
     if(monitoring){try{monitor=monitoringHost(env,resource);}catch{return failure(503);}}
     const pilotProject=env.AFW_OAUTH_PILOT_PROJECT_ID;
     if(pilotProject!==undefined&&(typeof pilotProject!=='string'||!pilotProject||pilotProject.length>200||pilotProject.trim()!==pilotProject))return failure(503);
     const serviceMode=env.AFW_OAUTH_SERVICE_MODE??'window';
@@ -177,21 +185,21 @@
       // Bound the native SQL fence too: the host can expire during a D1 write
       // even if our JavaScript clock observation is stale.
       const policy=Object.freeze({...monitor.policy,expiresAt:Math.min(monitor.policy.expiresAt,
         serviceMode==='window'?Date.parse(env.AFW_OAUTH_PILOT_EXPIRES_AT):monitor.policy.expiresAt)});
       if(policy.expiresAt<=policy.startAt)return failure(404);
       const clock=()=>{
         if(!monitor.current())return NaN;
         const time=Date.parse(now());
         return serviceMode==='window'&&time>=Date.parse(env.AFW_OAUTH_PILOT_EXPIRES_AT)?NaN:time;
       };
-      return createDossierMonitoringOwnerHandler({issuer,db:monitor.db,policy,now:clock,
+      return await createDossierMonitoringOwnerHandler({issuer,db:monitor.db,policy,now:clock,ctx,env,finitePreparationLease:preparationParent?.lease,
         accessVerifier:async options=>{
           if(!monitor.current())return {ok:false};
           const result=await accessVerifier(options);
           return monitor.current()?result:{ok:false};
         }})(request);
     }
     if(!env.DB||!env.OAUTH_KV||!env.AFW_OAUTH_PILOT_CLIENT_ID||!env.ACCESS_AUD||!env.ACCESS_TEAM_DOMAIN)return failure(503);
     try {
       if(url.pathname==='/mcp'||url.pathname.startsWith('/.well-known/oauth-protected-resource'))return await resourceServer.fetch(request,env,ctx);
       if(url.pathname==='/.well-known/oauth-authorization-server'){
@@ -239,49 +247,57 @@
         const selected=pilotProject??ids[0];
         const pinned=selected?await repository.getOwnedProject(selected,subject):null;
         if(selected&&!pinned)return failure(404);
         const projects=pinned?[pinned]:await repository.listConsentProjects(subject);
         if(!projects.length)return page('<h1>Conectar tu asistente</h1><p>Todavía no tenés un expediente para conectar. Podés crearlo en AFW y volver cuando quieras.</p><a href="https://agentfriendlyweb.dev/expediente">Volver a AFW</a>');
         if(projects.length>20)return page('<h1>Elegí el expediente desde AFW</h1><p>Tenés varios expedientes. Abrí el que querés conectar para preparar un permiso específico.</p><a href="https://agentfriendlyweb.dev/expediente">Volver a AFW</a>');
         const selection=pinned||projects.length===1?`<input type="hidden" name="project" value="${escape(projects[0].id)}"><p>Expediente: ${escape(projects[0].organization)}</p>`:`<label>¿Qué expediente querés conectar? <select name="project" required><option value="">Elegí un expediente</option>${projects.map(p=>`<option value="${escape(p.id)}">${escape(p.organization)}</option>`).join('')}</select></label>`;
         const description=await api.describeConsent(auth),transaction=await api.beginConsent(auth);
         const consentWindow=permissionWindow();
         await store.createConsent({handleHash:await hash(transaction.handle),subject,kind:'authorize',projectId:pinned?.id??(projects.length===1?projects[0].id:''),clientId:auth.clientId,resource,scopes:auth.scope,expiresAt:consentWindow.expiresAt});
+        if(preparationParent){try{await forwardPrivateQaFiniteOwnerAuthorization({ctx,env,request:request.clone(),authorizationHash:await hash(transaction.handle)},preparationParent.lease);}catch{/* Preparation remains unavailable; ordinary consent is unchanged. */}}
         assertPermissionCurrent(consentWindow);
         const evidenceChoice=auth.scope.includes('afw:evidence:read')?'<label><input type="checkbox" name="scope" value="afw:evidence:read"> También compartir las observaciones guardadas</label><p>Es opcional. Permite leer comprobaciones anteriores y sus fechas; no ejecutar una auditoría nueva.</p>':'';
         return page(`<h1>Conectar tu asistente</h1><p>${escape(description.clientName)} podrá consultar el resumen del expediente que elijas. No podrá cambiar datos ni publicar.</p><p>El permiso dura hasta diez minutos; podés desconectarlo antes desde AFW.${env.AFW_OAUTH_REFRESH_ENABLED==='true'?' Dentro de ese plazo, el asistente puede renovar su conexión sin ampliar el permiso.':''}</p><p>Este formulario vence ${readableTime(consentWindow.expiresAt)}.</p><form method="post" action="/authorize"><input type="hidden" name="handle" value="${escape(transaction.handle)}">${selection}<input type="hidden" name="scope" value="afw:project:read">${evidenceChoice}<button name="decision" value="approve">Permitir lectura</button><button name="decision" value="deny" formnovalidate>Cancelar</button></form>`,200,transaction.headers,callback.origin);
       }
       if(url.pathname==='/authorize'&&request.method==='POST'){
         let f,h,decision;try{f=await form(request);h=single(f,'handle');decision=single(f,'decision');}catch{return failure(400);}
         const digest=await hash(h),consent=await store.getConsent(digest,subject,'authorize',permissionNow());if(!consent)return failure(403);
         const scopes=f.getAll('scope');if(!validScopes(scopes)||scopes.some(s=>!consent.scopes.includes(s)))return failure(400);
         if(decision==='deny'){const denied=await api.denyConsent(request,h);await store.consumeConsent(digest,subject,'authorize',permissionNow());return new Response(null,{status:302,headers:denied.headers});}
         if(decision!=='approve')return failure(400);
         let projectId;try{projectId=f.has('project')?single(f,'project'):consent.projectId;}catch{return failure(400);}
         if(!projectId||projectId.length>200||(consent.projectId&&projectId!==consent.projectId))return failure(400);
         if(!pilotProjectAllowed(env,projectId))return failure(403);
         if(!await repository.getOwnedProject(projectId,subject))return failure(404);
         let approved;try{approved=await api.approveConsent(request,h,{scope:scopes});}catch{return failure(400);}
+        // Strict cookies may be absent on the cross-site GET. This exact SDK-approved
+        // same-origin transaction can be mapped while its original row is unconsumed.
+        if(preparationParent){try{await forwardPrivateQaFiniteOwnerAuthorization({ctx,env,request:preservedPreparationRequests.get(request).clone(),authorizationHash:digest},preparationParent.lease);}catch{/* No fabricated link or ordinary consent change. */}}
         if(!await store.consumeConsent(digest,subject,'authorize',permissionNow()))return failure(403);
         if(approved.request.clientId!==consent.clientId||approved.request.resource!==consent.resource||!await repository.getOwnedProject(projectId,subject))return failure(403);
         // The SDK cannot exchange an original permission with <60s remaining.
         const grantWindow=permissionWindow(60000),grantId=crypto.randomUUID();
         await store.createGrant({grantId,subject,clientId:consent.clientId,projectId,resource,scopes,...grantWindow});
+        let completed;
         try{assertPermissionCurrent(grantWindow);
-          const completed=await api.completeAuthorization({request:approved.request,userId:subject,scope:scopes,metadata:{},props:{applicationGrantId:grantId,userId:subject,projectId},revokeExistingGrants:false});
+          completed=await api.completeAuthorization({request:approved.request,userId:subject,scope:scopes,metadata:{},props:{applicationGrantId:grantId,userId:subject,projectId},revokeExistingGrants:false});
           assertPermissionCurrent(grantWindow);
-          const headers=new Headers(approved.headers);headers.set('Location',completed.redirectTo);headers.set('Cache-Control','no-store');return new Response(null,{status:302,headers});
         }catch{
           // Retire only this known grant even if the current clock has failed.
           // The last validated observation is a marker, not an exact commit time.
           await store.revokeGrant(grantId,subject,new Date(lastPermissionTime).toISOString());return failure(503);
         }
+        // The genuine SDK completion is already successful. Preparation failure
+        // MUST NOT enter the authorization catch, revoke or create another grant.
+        if(preparationParent){try{await forwardPrivateQaFiniteOwnerGrant({ctx,env,request:preservedPreparationRequests.get(request).clone(),grantId},preparationParent.lease);}catch{/* Factual preparation link remains unavailable. */}}
+        const headers=new Headers(approved.headers);headers.set('Location',completed.redirectTo);headers.set('Cache-Control','no-store');return new Response(null,{status:302,headers});
       }
       if(url.pathname==='/connections'&&request.method==='GET'){
         const nonce=crypto.randomUUID(),revokeWindow=permissionWindow();
         await store.createConsent({handleHash:await hash(nonce),subject,kind:'revoke',projectId:'',clientId:'',resource:'',scopes:[],expiresAt:revokeWindow.expiresAt});
         assertPermissionCurrent(revokeWindow);
         const grants=(await store.listGrants(subject,{clientId:env.AFW_OAUTH_PILOT_CLIENT_ID,resource,projectId:env.AFW_OAUTH_PILOT_PROJECT_ID})).filter(g=>connectionAllowed(env,g,subject,resource));
         const connections=(await Promise.all(grants.map(async g=>{
           const project=await repository.getOwnedProject(g.projectId,subject);
           if(!project)return '';
           const active=g.status==='active'&&!g.revokedAt&&Number.isFinite(Date.parse(g.expiresAt))&&Date.parse(g.expiresAt)>Date.parse(now());
@@ -297,12 +313,13 @@
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
+    }finally{preparationParent?.finish();}
   }};
 }

~~~~~~~~~~

## lib/dossier-event-rpc-authority.mjs

~~~~~~~~~~diff
diff --git a/lib/dossier-event-rpc-authority.mjs b/lib/dossier-event-rpc-authority.mjs
--- a/lib/dossier-event-rpc-authority.mjs
+++ b/lib/dossier-event-rpc-authority.mjs
@@ -1,38 +1,39 @@
+import {parseDossierEventPolicyFields,validateDossierEventPolicyData} from './dossier-event-policy-data.mjs';
 import {createDossierMonitoringAuthorization} from './dossier-monitoring-authority.mjs';
 import {snapshotMcpSubscriptionRequest} from './mcp-subscription-lifecycle.mjs';
 import {resolveSuccessorPreparation} from './mcp-successor-manifest.mjs';
 const fail=()=>{throw Error('Dossier event RPC unavailable');};
-const id=x=>typeof x==='string'&&x.length>0&&x.length<=200&&x.trim()===x;
 export const OWN_EVENT_NODE_NAME='afw-own-event-one-occurrence-v1';
 const SUCCESSOR_NODE_NAME='afw-own-event-first-successor-v1';
 const names=['AFW_DOSSIER_EVENTS_ENABLED','AFW_DOSSIER_EVENTS_POLICY','AFW_DOSSIER_EVENTS_NODE_NAME','AFW_OAUTH_ISSUER','AFW_OAUTH_RESOURCE','AFW_OAUTH_PILOT_CLIENT_ID','AFW_OAUTH_PILOT_PROJECT_ID','DB','AFW_DOSSIER_EVENTS_PROJECTION_SECRET','AFW_DOSSIER_EVENTS_NODE'];
 function exact(v,keys){if(!v||Object.getPrototypeOf(v)!==Object.prototype)fail();const ds=Object.getOwnPropertyDescriptors(v),own=Reflect.ownKeys(ds);if(own.length!==keys.length||own.some(k=>typeof k!=='string'||!keys.includes(k)||!Object.hasOwn(ds[k],'value')||!ds[k].enumerable))fail();return Object.fromEntries(keys.map(k=>[k,ds[k].value]));}
 /** INTERNAL shared server policy, not an endpoint or grant initializer. */
 export function readDossierEventHostPolicy({enabled,env,now=Date.now,historical=false}={}){
  if(enabled!==true)fail();if(typeof historical!=='boolean'||typeof now!=='function'||(historical?!['true','false'].includes(env?.AFW_DOSSIER_EVENTS_ENABLED):env?.AFW_DOSSIER_EVENTS_ENABLED!=='true'))fail();
  const watched=historical?names:[...names,'AFW_DOSSIER_SUCCESSOR_ENABLED','AFW_DOSSIER_SUCCESSOR_POLICY'];
  const pins=Object.freeze(Object.fromEntries(watched.map(k=>[k,env[k]]))),raw=pins.AFW_DOSSIER_EVENTS_POLICY;
  const nodeName=pins.AFW_DOSSIER_EVENTS_NODE_NAME,named=nodeName!==undefined;
  if(named&&nodeName!==OWN_EVENT_NODE_NAME&&nodeName!==SUCCESSOR_NODE_NAME)fail();
- if(typeof raw!=='string'||raw.length>4096)fail();const parsed=exact(JSON.parse(raw),['grantId','subject','projectId','clientId','resource',...(!named?['containerId']:[]),'startAt','expiresAt']);
+ const parsed=parseDossierEventPolicyFields(raw,named);
  if(named){const binding=pins.AFW_DOSSIER_EVENTS_NODE;if(typeof binding?.idFromName!=='function')fail();parsed.containerId=binding.idFromName(nodeName).toString();}
  // Historical close resolves the same fixed actor independently of live
  // successor readers. Only the live path requires the matching manifest.
  if(nodeName===SUCCESSOR_NODE_NAME&&!historical){
   if(pins.AFW_DOSSIER_SUCCESSOR_ENABLED!=='true'||typeof pins.AFW_DOSSIER_SUCCESSOR_POLICY!=='string'||pins.AFW_DOSSIER_SUCCESSOR_POLICY.length>8192)fail();
   const manifest=exact(JSON.parse(pins.AFW_DOSSIER_SUCCESSOR_POLICY),['scope','original','candidate','publication']);
   const resolved=resolveSuccessorPreparation({scope:manifest.scope,original:manifest.original,candidate:manifest.candidate,namespace:pins.AFW_DOSSIER_EVENTS_NODE});
   if(resolved.candidate.containerId!==parsed.containerId||resolved.candidate.startAt!==parsed.startAt||resolved.candidate.expiresAt!==parsed.expiresAt||resolved.manifest.scope.resource!==parsed.resource)fail();
  }
  const p=Object.freeze(parsed);
- if(!['grantId','subject','projectId','clientId','resource'].every(k=>id(p[k]))||typeof p.containerId!=='string'||!/^[0-9a-f]{64}$/.test(p.containerId)||!Number.isSafeInteger(p.startAt)||p.startAt<0||!Number.isSafeInteger(p.expiresAt)||p.expiresAt<=p.startAt||p.expiresAt-p.startAt>600000||p.clientId!==pins.AFW_OAUTH_PILOT_CLIENT_ID||p.projectId!==pins.AFW_OAUTH_PILOT_PROJECT_ID||p.resource!==pins.AFW_OAUTH_RESOURCE||p.resource!==pins.AFW_OAUTH_ISSUER+'/mcp'||new URL(pins.AFW_OAUTH_ISSUER).origin!==pins.AFW_OAUTH_ISSUER||typeof pins.DB?.prepare!=='function'||typeof pins.AFW_DOSSIER_EVENTS_NODE?.idFromString!=='function'||typeof pins.AFW_DOSSIER_EVENTS_NODE?.get!=='function')fail();
+ validateDossierEventPolicyData(p,{clientId:pins.AFW_OAUTH_PILOT_CLIENT_ID,projectId:pins.AFW_OAUTH_PILOT_PROJECT_ID,resource:pins.AFW_OAUTH_RESOURCE,issuer:pins.AFW_OAUTH_ISSUER});
+ if(typeof pins.DB?.prepare!=='function'||typeof pins.AFW_DOSSIER_EVENTS_NODE?.idFromString!=='function'||typeof pins.AFW_DOSSIER_EVENTS_NODE?.get!=='function')fail();
  const prepare=pins.DB.prepare,session=pins.DB.withSession,binding=pins.AFW_DOSSIER_EVENTS_NODE,idFromString=binding.idFromString,idFromName=binding.idFromName,get=binding.get;let last=-1;
  const current=()=>{const t=now();if(!Number.isSafeInteger(t)||t<0||t<last||!historical&&(t<p.startAt||t>=p.expiresAt)||!watched.every(k=>env[k]===pins[k])||pins.DB.prepare!==prepare||pins.DB.withSession!==session||binding.idFromString!==idFromString||binding.idFromName!==idFromName||binding.get!==get)fail();last=t;};current();
  return Object.freeze({policy:p,pins,current});
 }
 
 /** INTERNAL OAuth-validated caller only. No project/namespace from MCP args. */
 export function createDossierEventRpcAuthority({enabled,env,context,projectId,resource,now=Date.now,diagnostic}={}){
  if(enabled!==true)fail();const c=exact(context,['grantId','subject','clientId','resource','scopes']);if(!Array.isArray(c.scopes)||c.scopes.some(s=>typeof s!=='string')||!c.scopes.includes('afw:project:read'))fail();c.scopes=Object.freeze([...c.scopes]);Object.freeze(c);
  const {policy:p,pins,current}=readDossierEventHostPolicy({enabled,env,now});if(['grantId','subject','clientId','resource'].some(k=>c[k]!==p[k])||projectId!==p.projectId||resource!==p.resource)fail();
  const readAuthorization=createDossierMonitoringAuthorization({db:pins.DB,context:c,projectId,projectionSecret:pins.AFW_DOSSIER_EVENTS_PROJECTION_SECRET,now});

~~~~~~~~~~

## lib/dossier-monitoring-owner-http.mjs

~~~~~~~~~~diff
diff --git a/lib/dossier-monitoring-owner-http.mjs b/lib/dossier-monitoring-owner-http.mjs
--- a/lib/dossier-monitoring-owner-http.mjs
+++ b/lib/dossier-monitoring-owner-http.mjs
@@ -1,39 +1,42 @@
+import {forwardPrivateQaFiniteOwnerNotice} from './mcp-qa-finite-owner-source.mjs';
 import {createHash,randomBytes,randomUUID} from 'node:crypto';
 import {verifyCloudflareAccessJwt} from './cloudflare-access-identity.mjs';
 import {recordDossierMonitoringConsent} from './dossier-monitoring-authority.mjs';
 import {decodeJwt} from 'jose';
+const preservedPreparationRequests=new WeakMap();
 const cookieName='__Host-afw-monitoring-owner';
 const purpose='afw.dossier-monitoring-owner.v1';
 const hash=x=>createHash('sha256').update(x).digest('hex');
 const id=x=>typeof x==='string'&&x.length>0&&x.length<=200&&x.trim()===x;
 const time=x=>Number.isSafeInteger(x)&&x>=0&&x<=8640000000000000;
 const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const unavailable=status=>new Response('No pude confirmar este permiso. Volvé a tu expediente para revisarlo.',{status,headers:{'Cache-Control':'no-store','Content-Type':'text/plain; charset=utf-8'}});
 function page(content,nonceCookie){
  const nonce=randomUUID(),headers={'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store','Referrer-Policy':'same-origin','X-Content-Type-Options':'nosniff','Content-Security-Policy':`default-src 'none'; style-src 'nonce-${nonce}'; form-action 'self'; frame-ancestors 'none'; base-uri 'none'`};
  if(nonceCookie)headers['Set-Cookie']=nonceCookie;
  return new Response(`<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Avisos de tu expediente · AFW</title><style nonce="${nonce}">*{box-sizing:border-box}body{margin:0;background:#f3eadb;color:#181512;font:17px/1.6 "Comic Sans MS","Comic Neue",cursive}main{max-width:680px;margin:32px auto;padding:24px;background:#fffaf1;border:2px solid;border-radius:14px;box-shadow:5px 5px #ddc99f;overflow-wrap:anywhere}h1{line-height:1.2;font-size:1.8rem}button{font:inherit;min-height:48px;padding:12px;border:2px solid #181512;border-radius:8px;background:#3c514b;color:#fffaf1;cursor:pointer}a{color:#3c514b}a:focus-visible,button:focus-visible{outline:3px solid #ad4f35;outline-offset:4px}@media(max-width:700px){main{margin:20px 16px}button{width:100%}}</style></head><body><main><p>AFW · Te acompaño</p>${content}<p><a href="https://agentfriendlyweb.dev/expediente">Volver a mi expediente</a></p></main></body></html>`,{headers});
 }
 async function handleForm(request){
  if(request.headers.get('Content-Type')!=='application/x-www-form-urlencoded')throw Error('input');
  const reader=request.body?.getReader();if(!reader)throw Error('input');const chunks=[];let size=0;
  for(;;){const {done,value}=await reader.read();if(done)break;size+=value.length;if(size>1024){void reader.cancel().catch(()=>{});throw Error('input');}chunks.push(value);}
  const bytes=new Uint8Array(size);let at=0;for(const c of chunks){bytes.set(c,at);at+=c.length;}
+ if((request.headers.get('Cookie')??'').includes('__Host-afw-finite-prepare='))preservedPreparationRequests.set(request,new Request(request.url,{method:request.method,headers:request.headers,body:bytes,signal:request.signal}));
  const form=new URLSearchParams(new TextDecoder('utf-8',{fatal:true}).decode(bytes));
  if([...form.keys()].length!==1||form.getAll('handle').length!==1||!/^[A-Za-z0-9_-]{43}$/.test(form.get('handle')??''))throw Error('input');return form.get('handle');
 }
 /** Prepared owner HTTP UI, UNMOUNTED. Host supplies fixed own-QA policy and DB,
  * never body-derived pins. It verifies Access independently of OAuth/MCP. No
  * Events flag/route, schema migration, real consent or hosted guard is enabled.
  */
-export function createDossierMonitoringOwnerHandler({issuer,db,policy,accessVerifier=verifyCloudflareAccessJwt,now=Date.now}={}){
+export function createDossierMonitoringOwnerHandler({issuer,db,policy,accessVerifier=verifyCloudflareAccessJwt,now=Date.now,ctx,env,finitePreparationLease}={}){
  let p;try{
   const keys=['enabled','startAt','expiresAt','projectId','grantId','clientId','resource','teamDomain','audience'];
   if(!policy||Object.getPrototypeOf(policy)!==Object.prototype)throw Error('policy');
   const descriptors=Object.getOwnPropertyDescriptors(policy);
   if(Reflect.ownKeys(descriptors).some(k=>typeof k!=='string'||!keys.includes(k)||!Object.hasOwn(descriptors[k],'value')))throw Error('policy');
   p=Object.freeze(Object.fromEntries(Object.entries(descriptors).map(([k,d])=>[k,d.value])));
  }catch{return async()=>unavailable(503);}
  if(p.enabled!==true)return async()=>unavailable(404);
  try{if(new URL(issuer).origin!==issuer||!issuer.startsWith('https://')||p.resource!==issuer+'/mcp'||!['projectId','grantId','clientId','audience'].every(k=>id(p[k]))||typeof p.teamDomain!=='string'||!(/^[a-z0-9-]+\.cloudflareaccess\.com$/).test(p.teamDomain)||!time(p.startAt)||!time(p.expiresAt)||p.expiresAt<=p.startAt||p.expiresAt-p.startAt>600000||!db?.prepare||typeof accessVerifier!=='function'||typeof now!=='function')throw Error('policy');}catch{return async()=>unavailable(503);}
  let last=-1;const clock=()=>{const t=now();if(!time(t)||t<last)throw Error('clock');last=t;return t;};
@@ -60,13 +63,14 @@
    const text=action==='grant'?'<h1>Avisos de tu expediente</h1><p>Puedo avisar a tu asistente cuando cambie este expediente durante un máximo de diez minutos. Los avisos incluyen referencias y fechas; no tus respuestas. El asistente deberá consultar de nuevo lo permitido.</p><p>No cambia datos ni publica. Podés retirar el permiso antes. Un aviso no confirma que el asistente haya terminado su revisión.</p>':'<h1>Revisar tus avisos</h1><p>Podés retirar el seguimiento. Eso bloquea los siguientes avisos; no borra tu expediente ni retira uno ya enviado. El permiso de lectura se controla por separado.</p>';
    return page(`${text}<p>Expediente: ${esc(g.organization)}</p><p>Este formulario vence ${esc(new Date(expiry).toISOString())}.</p><form method="post" action="/monitoring/${action}"><input type="hidden" name="handle" value="${handle}"><button>${action==='grant'?'Permitir avisos temporales':'Retirar avisos'}</button></form>`,`${cookieName}=${handle}; Path=/; Secure; HttpOnly; SameSite=Strict; Max-Age=${Math.max(1,Math.floor((expiry-clock())/1000))}`);
   }
   let handle;try{handle=await handleForm(request);}catch{return unavailable(400);}
   const cookies=(request.headers.get('Cookie')??'').split(';').map(s=>s.trim()).filter(s=>s.startsWith(cookieName+'='));
   if(cookies.length!==1||hash(cookies[0].slice(cookieName.length+1))!==hash(handle))return unavailable(403);
   const ticket=await primary().prepare('SELECT * FROM dossier_monitoring_owner_tickets WHERE handle_hash=? AND user_id=? AND grant_id=? AND project_id=? AND client_id=? AND resource=? AND purpose=?').bind(hash(handle),subject,p.grantId,p.projectId,p.clientId,p.resource,purpose).first();
   const t=clock();if(!ticket||ticket.action!==url.pathname.split('/').at(-1)||!time(ticket.issued_at)||!time(ticket.expires_at)||ticket.issued_at>t||ticket.expires_at<=t||ticket.expires_at>p.expiresAt||ticket.expires_at-ticket.issued_at>600000||(await identity(request))?.subject!==subject||!open())return unavailable(403);
   const result=await recordDossierMonitoringConsent({db,subject,grantId:p.grantId,projectId:p.projectId,expectedRevision:ticket.revision,expectedSequence:ticket.expected_sequence,requestId:ticket.request_id,action:ticket.action,now:clock(),expiresAt:ticket.permission_expires_at,expectedClientId:p.clientId,expectedResource:p.resource,commitWindow:{startAt:p.startAt,expiresAt:Math.min(p.expiresAt,ticket.expires_at,auth.expiresAt)},beforeCommit:async()=> (await identity(request))?.subject===subject&&open()});
   if(result.status!==200)return unavailable(result.status);
+  if(result.action==='grant'&&finitePreparationLease){try{await forwardPrivateQaFiniteOwnerNotice({ctx,env,request:preservedPreparationRequests.get(request).clone(),requestId:ticket.request_id,sequence:result.sequence},finitePreparationLease);}catch{/* Original acknowledged consent survives a missing preparation link. */}}
   return page(ticket.action==='grant'?'<h1>Guardé tu decisión</h1><p>Registré el permiso para avisos temporales. Esto no confirma que exista una suscripción ni que el asistente haya revisado el expediente. Podés consultar y retirarlo abajo.</p><a href="/monitoring">Revisar mis avisos</a>':'<h1>Retiraste los avisos</h1><p>El seguimiento quedó retirado. Tu expediente sigue guardado.</p>');
  }catch{return unavailable(503);}};
 }

~~~~~~~~~~

## lib/mcp-activation-observer.mjs

~~~~~~~~~~diff
diff --git a/lib/mcp-activation-observer.mjs b/lib/mcp-activation-observer.mjs
--- a/lib/mcp-activation-observer.mjs
+++ b/lib/mcp-activation-observer.mjs
@@ -1,53 +1,61 @@
 import {createHash} from 'node:crypto';
 import {snapshotOwnWorkerExecution} from './mcp-own-worker-execution.mjs';
 import {createPublicationArtifactReader} from './mcp-publication-artifact-reader.mjs';
 import {createSuccessorDeploymentReader} from './mcp-successor-deployment-reader.mjs';
 const fail=()=>{throw Error('Activation observation unavailable');};
 const uuid=v=>typeof v==='string'&&/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/.test(v);
 const canonical=v=>JSON.stringify(v,(_,x)=>x&&typeof x==='object'&&!Array.isArray(x)?Object.fromEntries(Object.entries(x).sort(([a],[b])=>a.localeCompare(b))):x);
 const fields=['compatibility_date','compatibility_flags','main_module','exports','bindings','usage_model','containers'];
+const LEGACY_FLAGS=Object.freeze(['nodejs_compat','global_fetch_strictly_public']);
+const FINITE_FLAGS=Object.freeze(['nodejs_compat','global_fetch_strictly_public','enable_request_signal']);
 function plain(value,depth=0){
  if(depth>20)fail();if(value===null||typeof value==='string'||typeof value==='boolean'||typeof value==='number'&&Number.isFinite(value))return value;
  if(!value||typeof value!=='object'||!Array.isArray(value)&&Object.getPrototypeOf(value)!==Object.prototype)fail();
  const out=Array.isArray(value)?[]:{};for(const k of Reflect.ownKeys(value)){if(Array.isArray(value)&&k==='length')continue;const d=Object.getOwnPropertyDescriptor(value,k);if(typeof k!=='string'||!d?.enumerable||!Object.hasOwn(d,'value')||k==='__proto__'||k==='toJSON')fail();out[k]=plain(d.value,depth+1);}return out;
 }
-function snapshot(value){
+function snapshot(value,flags){
  if(!value||Object.getPrototypeOf(value)!==Object.prototype||Object.keys(value).length!==fields.length||fields.some(k=>!Object.hasOwn(value,k)))fail();
- const copy=plain(value);if(canonical(copy).length>262144)fail();if(!Array.isArray(copy.bindings)||copy.bindings.length>100||copy.bindings.length<1||new Set(copy.bindings.map(b=>b?.name)).size!==copy.bindings.length||copy.main_module!=='index.mjs'||copy.compatibility_date!=='2026-09-07'||canonical(copy.compatibility_flags)!==canonical(['nodejs_compat','global_fetch_strictly_public'])||copy.usage_model!=='standard')fail();
+ const copy=plain(value);if(canonical(copy).length>262144)fail();if(!Array.isArray(copy.bindings)||copy.bindings.length>100||copy.bindings.length<1||new Set(copy.bindings.map(b=>b?.name)).size!==copy.bindings.length||copy.main_module!=='index.mjs'||copy.compatibility_date!=='2026-09-07'||canonical(copy.compatibility_flags)!==canonical(flags)||copy.usage_model!=='standard')fail();
  try{Object.assign(copy,snapshotOwnWorkerExecution(copy));}catch{fail();}
- for(const b of copy.bindings){if(typeof b?.name!=='string'||!/^[_A-Za-z][_A-Za-z0-9]{0,127}$/.test(b.name)||!['plain_text','secret_text','d1','kv_namespace','durable_object_namespace','ratelimit'].includes(b.type))fail();if(b.type==='secret_text'&&(Object.keys(b).length!==2||!Object.hasOwn(b,'name')||!Object.hasOwn(b,'type')))fail();}
+ for(const b of copy.bindings){if(typeof b?.name!=='string'||!/^[_A-Za-z][_A-Za-z0-9]{0,127}$/.test(b.name)||!['plain_text','secret_text','d1','kv_namespace','durable_object_namespace','ratelimit','version_metadata'].includes(b.type))fail();if(b.type==='version_metadata'&&(b.name!=='AFW_FINITE_TRIAL_VERSION'||Object.keys(b).length!==2||!Object.hasOwn(b,'name')||!Object.hasOwn(b,'type')))fail();if(b.type==='secret_text'&&(Object.keys(b).length!==2||!Object.hasOwn(b,'name')||!Object.hasOwn(b,'type')))fail();}
  copy.bindings.sort((a,b)=>a.name.localeCompare(b.name));return copy;
 }
-export const activationConfigurationHash=value=>createHash('sha256').update(canonical(snapshot(value))).digest('hex');
+const configurationHash=(value,flags)=>createHash('sha256').update(canonical(snapshot(value,flags))).digest('hex');
+export const activationConfigurationHash=value=>configurationHash(value,LEGACY_FLAGS);
+export const finiteActivationConfigurationHash=value=>configurationHash(value,FINITE_FLAGS);
 /** Operator-only GET observer. Configuration is approved before activation;
  * generated version/deployment IDs are supplied afterwards, never embedded in
  * Worker policy. Secret values are neither required nor returned. */
-export function createActivationObserver({versionId,deploymentId,namespaceId,applicationId,configuration,readCredential,fetchImpl=globalThis.fetch}={}){
+function createObserver({versionId,deploymentId,namespaceId,applicationId,configuration,readCredential,fetchImpl=globalThis.fetch}={},flags){
  if(!uuid(versionId)||!uuid(deploymentId)||typeof readCredential!=='function'||typeof fetchImpl!=='function')fail();
- const approved=snapshot(configuration),configurationHash=activationConfigurationHash(approved);
+ const configurationHashFor=flags===LEGACY_FLAGS?activationConfigurationHash:finiteActivationConfigurationHash;
+ const approved=snapshot(configuration,flags),configurationHash=configurationHashFor(approved);
  return async(input,signal)=>{
   if(!(signal instanceof AbortSignal)||signal.aborted||input.configurationHash!==configurationHash)fail();
   const {accountId,workerName,workerHash,scopeHash,sourceRevision,programHash}=input;
   // Construct validated fixed-target readers before any provider request.
   const bytes=createPublicationArtifactReader({accountId,workerName,moduleName:'index.mjs',workerHash,readCredential,fetchImpl});
   const observed=await bytes({accountId,workerName,versionId},signal);if(signal.aborted)fail();
   const deployment=createSuccessorDeploymentReader({pins:{accountId,workerName,namespaceId,applicationId,deploymentId,versionId,etag:observed.etag,scopeHash,sourceRevision,programHash},readCredential,fetchImpl});
   const controller=new AbortController(),started=performance.now(),end=started+5000;let timer,rejectCancel,stream,lastMono=started;
   if(!Number.isFinite(started))fail();
   const live=()=>{const t=performance.now();if(controller.signal.aborted||signal.aborted||!Number.isFinite(t)||t<lastMono||t>=end)fail();lastMono=t;};
   const cancel=new Promise((_,reject)=>{rejectCancel=reject;}),abort=()=>{controller.abort();rejectCancel(Error('Activation observation unavailable'));};signal.addEventListener('abort',abort,{once:true});
   const deadline=new Promise((_,reject)=>{timer=setTimeout(()=>{controller.abort();reject(Error('Activation observation unavailable'));},5000);});
   const read=async()=>{
    const credential=await readCredential();live();if(typeof credential!=='string'||!/^[-A-Za-z0-9_]{16,4096}$/.test(credential))fail();
    const r=await fetchImpl('https://api.cloudflare.com/client/v4/accounts/'+accountId+'/workers/workers/'+workerName+'/versions/'+versionId,{method:'GET',redirect:'manual',cache:'no-store',signal:controller.signal,headers:{Authorization:'Bearer '+credential,Accept:'application/json','Cache-Control':'no-cache, no-store',Pragma:'no-cache'}});
    live();if(r.status!==200||r.redirected||!r.body||!/^application\/json(?:\s*;|$)/i.test(r.headers.get('Content-Type')??'')||r.headers.has('Age')&&r.headers.get('Age')!=='0'||r.headers.has('CF-Cache-Status')&&!['DYNAMIC','BYPASS','MISS'].includes(r.headers.get('CF-Cache-Status').toUpperCase()))fail();
    stream=r.body.getReader();const chunks=[];let size=0;for(;;){const part=await stream.read();live();if(part.done)break;size+=part.value.length;if(size>262144)fail();chunks.push(part.value);}stream.releaseLock();stream=null;
    const envelope=JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(Buffer.concat(chunks,size))),v=envelope.result;if(envelope.success!==true||!Array.isArray(envelope.errors)||envelope.errors.length||v?.id!==versionId)fail();
    const allowed=['id','number','startup_time_ms',...fields,'annotations','urls','source','created_on','env','author_id','author_email','modules'];if(Object.keys(v).some(k=>!allowed.includes(k)))fail();
    if(v.env!==undefined&&(!v.env||typeof v.env!=='object'||Array.isArray(v.env)||Object.keys(v.env).length!==v.bindings?.length||Object.keys(v.env).some(n=>!v.bindings.some(b=>b.name===n))))fail();
-   const actual=Object.fromEntries(fields.map(k=>[k,v[k]??(k==='containers'?[]:k==='usage_model'?'standard':undefined)]));if(activationConfigurationHash(actual)!==configurationHash)fail();live();
+   const actual=Object.fromEntries(fields.map(k=>[k,v[k]??(k==='containers'?[]:k==='usage_model'?'standard':undefined)]));if(configurationHashFor(actual)!==configurationHash)fail();live();
   };
   try{await Promise.race([read(),deadline,cancel]);live();}catch{fail();}finally{clearTimeout(timer);signal.removeEventListener('abort',abort);controller.abort();if(stream)Promise.resolve(stream.cancel()).catch(()=>{});}
   if(signal.aborted)fail();await deployment({signal});if(signal.aborted)fail();return Object.freeze({versionId,deploymentId,etag:observed.etag,configurationHash});
  };
 }
+
+export function createActivationObserver(options={}){return createObserver(options,LEGACY_FLAGS);}
+export function createFiniteActivationObserver(options={}){return createObserver(options,FINITE_FLAGS);}

~~~~~~~~~~

## lib/mcp-canary-restoration-transport.mjs

~~~~~~~~~~diff
diff --git a/lib/mcp-canary-restoration-transport.mjs b/lib/mcp-canary-restoration-transport.mjs
--- a/lib/mcp-canary-restoration-transport.mjs
+++ b/lib/mcp-canary-restoration-transport.mjs
@@ -1,41 +1,47 @@
+import {finiteControlIdentity} from './mcp-finite-evidence.mjs';
+import {parseFiniteCleanupPolicy} from './mcp-finite-cleanup-policy.mjs';
 import {parsePrivatePreparedDispatchPolicy} from './mcp-private-prepared-dispatch-policy.mjs';
 import {createHash} from 'node:crypto';
 import {RELEASE_TARGET} from './mcp-release-operator-policy.mjs';
 import {parseCanaryRestorationPolicy as policy} from './mcp-canary-restoration-policy.mjs';
 const W=RELEASE_TARGET.workerName,OP='agent-friendly-web-release-operator',ROOT='/accounts/'+RELEASE_TARGET.accountId,BASE='https://api.cloudflare.com/client/v4',F='afw-release-administrative',QF='afw-own-qa-private-confirmation',MAX=4194304;
 const fail=()=>{throw Error('Canary restoration transport unavailable');};
 const time=x=>Number.isSafeInteger(x)&&x>=0&&x<=8640000000000000;
 function fields(v,keys){
  if(!v||Object.getPrototypeOf(v)!==Object.prototype||Reflect.ownKeys(v).length!==keys.length)fail();
  const x={};for(const k of keys){const d=Object.getOwnPropertyDescriptor(v,k);if(!d?.enumerable||!Object.hasOwn(d,'value'))fail();x[k]=d.value;}return Object.freeze(x);
 }
-function routes(p){
+function routes(p,finite){
  const m=new Map();for(const n of[W,OP])for(const part of['deployments','schedules','tails'])m.set(ROOT+'/workers/scripts/'+n+'/'+part,null);
  for(const[n,id]of[[W,p.live.versionId],[W,p.closed.versionId],[OP,p.operator.versionId]])m.set(ROOT+'/workers/workers/'+n+'/versions/'+id,{include:'modules'});
- for(const name of[F,QF]){m.set(ROOT+'/workflows/'+name,null);m.set(ROOT+'/workflows/'+name+'/instances',{per_page:100,direction:'desc'});}
+ for(const name of[ F,QF,...(finite?['afw-own-qa-private-bootstrap']:[]) ]){m.set(ROOT+'/workflows/'+name,null);m.set(ROOT+'/workflows/'+name+'/instances',{per_page:100,direction:'desc'});}
  m.set(ROOT+'/containers/applications/'+RELEASE_TARGET.namespaceId+'/instances-v2',{state:'active',per_page:100});
+ if(finite){m.set(ROOT+'/workflows',{per_page:100,page:1});}
  return m;
 }
 function workflowQuery(value){
  const q=fields(value,['per_page','direction',...Object.hasOwn(value??{},'cursor')?['cursor']:[]]);
  if(q.per_page!==100||q.direction!=='desc')fail();
  if(Object.hasOwn(q,'cursor')&&(typeof q.cursor!=='string'||!q.cursor.length||new TextEncoder().encode(q.cursor).length>1024||[...q.cursor].some(c=>c.charCodeAt(0)<=32||c.charCodeAt(0)===127)))fail();
  return Object.freeze({...q});
 }
-function input(value,p,raw){
+function input(value,p,raw,finite){
  const ds=value&&Object.getOwnPropertyDescriptors(value);
  if(!ds)fail();const keys=['method','path','signal',...Object.hasOwn(ds,'query')?['query']:[],...Object.hasOwn(ds,'body')?['body']:[]],v=fields(value,keys);
  if(typeof v.path!=='string'||!(v.signal instanceof AbortSignal)||v.signal.aborted)fail();
  if(v.method==='GET'){
-  const allowed=routes(p);if(!allowed.has(v.path)||Object.hasOwn(v,'body'))fail();
-  if([F,QF].some(n=>v.path===ROOT+'/workflows/'+n+'/instances'))return{...v,query:workflowQuery(v.query)};
+  const allowed=routes(p,finite);if(!allowed.has(v.path)||Object.hasOwn(v,'body'))fail();
+  if([F,QF,...(finite?['afw-own-qa-private-bootstrap']:[])].some(n=>v.path===ROOT+'/workflows/'+n+'/instances'))return{...v,query:workflowQuery(v.query)};
+  if(finite&&v.path===ROOT+'/containers/applications/'+RELEASE_TARGET.namespaceId+'/instances-v2'){
+   const q=fields(v.query,['per_page',...(Object.hasOwn(v.query??{},'page_token')?['page_token']:[])]);if(q.per_page!==100||q.page_token!==undefined&&(typeof q.page_token!=='string'||q.page_token.length<1||q.page_token.length>1024||[...q.page_token].some(c=>c.charCodeAt(0)<=32||c.charCodeAt(0)===127)))fail();return {...v,query:q};
+  }
   const q=allowed.get(v.path);if(q){const x=fields(v.query,Object.keys(q));if(Object.keys(q).some(k=>x[k]!==q[k]))fail();return{...v,query:q};}
   if(Object.hasOwn(v,'query'))fail();return v;
  }
  if(v.method!=='POST'||v.path!==ROOT+'/workers/scripts/'+W+'/deployments'||Object.hasOwn(v,'query'))fail();
  const b=fields(v.body,['strategy','versions','annotations']);if(b.strategy!=='percentage'||!Array.isArray(b.versions)||b.versions.length!==1||Reflect.ownKeys(b.versions).length!==2)fail();
  const d=Object.getOwnPropertyDescriptor(b.versions,'0');if(!d?.enumerable||!Object.hasOwn(d,'value'))fail();
  const version=fields(d.value,['version_id','percentage']),annotation=fields(b.annotations,['workers/message']),message='AFW closed canary restoration '+createHash('sha256').update(raw).digest('hex');
  if(version.version_id!==p.closed.versionId||version.percentage!==100||annotation['workers/message']!==message)fail();
  return{...v,body:{strategy:'percentage',versions:[{version_id:p.closed.versionId,percentage:100}],annotations:{'workers/message':message}}};
 }
@@ -45,38 +51,40 @@
  const result={...value};
  if(Object.hasOwn(value,'env')){
   const e=value.env;if(!e||Object.getPrototypeOf(e)!==Object.prototype)fail();
   result.env=Object.fromEntries(Object.keys(e).map(k=>[k,null]));
  }
  return result;
 }
 /** Server-only fixed transport, not a public proxy or write authority.
  * The caller must be core629 with its durable issued-before-effect journal.
  * No credentials, host, retries, scheduling or native withdrawal are installed. */
-export function createCanaryRestorationTransport({readControl,readReadCredential,readPublishCredential,fetchImpl=globalThis.fetch,now=Date.now,timeoutMs=5000,preparedDispatch}={}){
+export function createCanaryRestorationTransport({readControl,readReadCredential,readPublishCredential,fetchImpl=globalThis.fetch,now=Date.now,timeoutMs=5000,preparedDispatch,finiteTrial}={}){
  if([readControl,readReadCredential,readPublishCredential,fetchImpl,now].some(x=>typeof x!=='function')||!Number.isSafeInteger(timeoutMs)||timeoutMs<1||timeoutMs>5000)fail();
+ const finite=finiteTrial===undefined?null:finiteControlIdentity(finiteTrial);
+ if(finite&&(preparedDispatch!==undefined||finite.plan.resources.applicationId!==RELEASE_TARGET.namespaceId))fail();
  const preparation=preparedDispatch===undefined?null:fields(preparedDispatch,['policy','policyHash','withdrawalPolicyHash']);
  let originalControl,writeAttempted=false,reads=0;
  async function run(value,assertParent=()=>{}){
   let finished=false,timer,reader,signal,onAbort;const controller=new AbortController();
   try{
    if(typeof assertParent!=='function')fail();assertParent();
    const enteredWall=now(),enteredMono=performance.now(),c=fields(readControl(),['enabled','policy']);if(c.enabled!==true)fail();
-   const raw=c.policy,p=policy(raw),window=preparation?parsePrivatePreparedDispatchPolicy(preparation.policy,{closure:p,closurePolicyHash:createHash('sha256').update(raw).digest('hex'),withdrawalPolicyHash:preparation.withdrawalPolicyHash,dispatchPolicyHash:preparation.policyHash}):p,startAt=preparation?window.dispatchAt:p.startAt;
+   const raw=c.policy,p=finite?(()=>{parseFiniteCleanupPolicy(raw,finite.plan);return {startAt:finite.plan.C0,expiresAt:finite.plan.C1,live:finite.plan.deployments.canaryLive,closed:finite.plan.deployments.canaryClosed,operator:finite.plan.deployments.operatorClosed};})():policy(raw),window=preparation?parsePrivatePreparedDispatchPolicy(preparation.policy,{closure:p,closurePolicyHash:createHash('sha256').update(raw).digest('hex'),withdrawalPolicyHash:preparation.withdrawalPolicyHash,dispatchPolicyHash:preparation.policyHash}):p,startAt=preparation?window.dispatchAt:p.startAt;
    if(originalControl===undefined)originalControl=raw;if(originalControl!==raw||!time(enteredWall)||enteredWall<startAt||enteredWall>=window.expiresAt||!Number.isFinite(enteredMono)||enteredMono<0)fail();
    const endWall=Math.min(window.expiresAt,enteredWall+timeoutMs),endMono=enteredMono+(endWall-enteredWall);let lastWall=enteredWall,lastMono=enteredMono;
    const current=()=>{
     assertParent();const n=now(),m=performance.now(),a=fields(readControl(),['enabled','policy']);
     if(finished||controller.signal.aborted||signal?.aborted||!time(n)||n<lastWall||n<startAt||n>=endWall||!Number.isFinite(m)||m<lastMono||m>=endMono||a.enabled!==true||a.policy!==raw)fail();
     lastWall=n;lastMono=m;
    };
-   current();const v=input(value,p,raw);signal=v.signal;current();
+   current();const v=input(value,p,raw,finite);signal=v.signal;current();
    if(preparation&&(v.method!=='GET'||![
     ROOT+'/workers/scripts/'+W+'/deployments',ROOT+'/workers/scripts/'+OP+'/deployments',
     ROOT+'/workers/workers/'+W+'/versions/'+p.live.versionId,ROOT+'/workers/workers/'+OP+'/versions/'+p.operator.versionId
    ].includes(v.path)))fail();
    if(v.method==='POST'){if(writeAttempted)fail();writeAttempted=true;}else if(++reads>64)fail();
    let rejectCancelled;const cancelled=new Promise((_,reject)=>{rejectCancelled=reject;});
    onAbort=()=>{controller.abort();rejectCancelled(Error('Canary restoration transport unavailable'));};signal.addEventListener('abort',onAbort,{once:true});current();
    const deadline=new Promise((_,reject)=>{timer=setTimeout(()=>{finished=true;controller.abort();reject(Error('Canary restoration transport unavailable'));},Math.max(1,Math.floor(endMono-lastMono)));});
    const work=async()=>{
     const credential=await(v.method==='GET'?readReadCredential():readPublishCredential());current();

~~~~~~~~~~

## lib/mcp-fixed-terminal-workflows.mjs

~~~~~~~~~~diff
diff --git a/lib/mcp-fixed-terminal-workflows.mjs b/lib/mcp-fixed-terminal-workflows.mjs
--- a/lib/mcp-fixed-terminal-workflows.mjs
+++ b/lib/mcp-fixed-terminal-workflows.mjs
@@ -1,10 +1,14 @@
+import {readPrivateFiniteLaunchObservation} from './mcp-qa-finite-launch-inventory.mjs';
+import {finiteLauncherInstanceId,hashFiniteLaunchRecord} from './mcp-qa-finite-launch-records.mjs';
+import {finiteHash} from './mcp-finite-evidence.mjs';
+import {decodeFiniteInitialEntry,encodeFiniteInitialEntry} from './mcp-qa-finite-initial-entry-records.mjs';
 const fail=()=>{throw Error('Fixed AFW workflow inventory unavailable');};
 export const AFW_FIXED_WORKFLOWS=Object.freeze([
  Object.freeze({name:'afw-release-administrative',id:'0ee9231b-8952-46bd-8124-a0c5dbb06dd0',script:'agent-friendly-web-release-operator',className:'AfwReleaseWorkflow'}),
  Object.freeze({name:'afw-own-qa-private-confirmation',id:'707e5440-2af3-4a0c-8fff-d40efc9895c4',script:'agent-friendly-web-independent-closure-qa',className:'PrivateQaNamedConfirmation'}),
  Object.freeze({name:'afw-own-qa-private-bootstrap',id:'06b6c3eb-ce59-4594-8b9e-2636977d56da',script:'agent-friendly-web-independent-closure-qa',className:'PrivateQaBootstrap'})
 ]);
 function fields(v,keys,strict=true){
  if(!v||Object.getPrototypeOf(v)!==Object.prototype||strict&&Reflect.ownKeys(v).length!==keys.length)fail();
  const out={};for(const key of keys){const d=Object.getOwnPropertyDescriptor(v,key);if(!d?.enumerable||!Object.hasOwn(d,'value'))fail();out[key]=d.value;}return out;
 }
@@ -40,11 +44,123 @@
 }
 
 /** Legacy closure/rollback remains strict: no running self exception. */
 export async function readTerminalAfwWorkflows(options){return readFixedWorkflows(options,null);}
 /** Only the native ARM wrapper may nominate its own exact instance. Workflow
  * API version_id is NOT a Worker UUID or execution provenance witness. */
 export async function readArmQuiescentAfwWorkflows(options){
  const keys=['read','assertCurrent','currentBootstrapId'],p=fields(options,keys),{read,assertCurrent,currentBootstrapId}=p;
  const check=()=>{const c=fields(options,keys);if(keys.some(k=>c[k]!==p[k]))fail();assertCurrent();};
  check();return readFixedWorkflows({read,assertCurrent:check,includeBootstrap:true},currentBootstrapId);
+}
+
+/** Finite-only inventory. Every fixed definition AND the account definition list
+ * is enumerated. Exceptions identify an exact instance, never a whole class. */
+/** INTERNAL complete fixed enumeration; no active/absent exception is decided here. */
+export async function readFiniteAfwWorkflowInventory(options){
+ const keys=['read','assertCurrent'],o=fields(options,keys),{read,assertCurrent}=o;
+ if(typeof read!=='function'||typeof assertCurrent!=='function')fail();
+ const check=()=>{if(keys.some(k=>options[k]!==o[k]))fail();assertCurrent();};
+ const get=async(path,query)=>{check();const r=await read(path,query);check();return r;};
+ const definitions=await get('/workflows',{per_page:100,page:1}),info=definitions.info;
+ if(!Array.isArray(definitions.value)||definitions.value.length!==AFW_FIXED_WORKFLOWS.length||!info||info.count!==definitions.value.length||info.total_count!==definitions.value.length||info.per_page!==100||info.page!==undefined&&info.page!==1||info.total_pages!==undefined&&info.total_pages!==1||info.cursor)fail();
+ const names=new Set();for(const row of definitions.value){const spec=AFW_FIXED_WORKFLOWS.find(s=>s.name===row.name);if(!spec||names.has(row.name)||row.id!==spec.id||row.script_name!==spec.script||row.class_name!==spec.className)fail();names.add(row.name);}
+ let totalCount=0;const journal=[];
+ for(const spec of AFW_FIXED_WORKFLOWS){
+  const f=(await get('/workflows/'+spec.name)).value;if(f.id!==spec.id||f.name!==spec.name||f.script_name!==spec.script||f.class_name!==spec.className||f.script_deleted===true||f.schedules!==undefined&&(!Array.isArray(f.schedules)||f.schedules.length))fail();
+  let cursor,total,pages,hasPages;const seen=new Set(),cursors=new Set();
+  for(let page=0;page<4;page++){
+   const {value:rows,info:i}=await get('/workflows/'+spec.name+'/instances',{per_page:100,direction:'desc',...(cursor?{cursor}:{})});
+   if(!Array.isArray(rows)||rows.length>100||!i||i.per_page!==100||i.count!==rows.length||!Number.isSafeInteger(i.total_count)||i.total_count<0||i.total_count>400||i.page!==undefined&&i.page!==page+1||i.total_pages!==undefined&&(!Number.isSafeInteger(i.total_pages)||i.total_pages<page+1||i.total_pages>4))fail();
+   if(total===undefined){total=i.total_count;pages=i.total_pages;hasPages=Object.hasOwn(i,'total_pages');}else if(total!==i.total_count||Object.hasOwn(i,'total_pages')!==hasPages||hasPages&&pages!==i.total_pages)fail();
+   for(const row of rows){
+    const x=fields(row,['id','status','workflow_id'],false);if(x.workflow_id!==spec.id||typeof x.id!=='string'||x.id.length<1||x.id.length>128||seen.has(x.id))fail();seen.add(x.id);
+    journal.push({definition:spec.id,id:x.id,status:x.status});
+   }
+   const next=i.cursor;if(next===undefined||next===''){if(seen.size!==total||i.total_pages!==undefined&&i.total_pages!==page+1)fail();break;}
+   if(page===3||typeof next!=='string'||!next.length||next.length>1024||/[\x00-\x20\x7f]/.test(next)||cursors.has(next))fail();cursors.add(next);cursor=next;
+  }totalCount+=seen.size;
+ }
+
+ check();return Object.freeze({workflowCount:3,instanceCount:totalCount,instances:Object.freeze(journal.map(Object.freeze))});
+}
+/** Factual initial-only inventory. The caller retains and checks the original
+ * entry lease. This observation grants no right to emit an activation. */
+export async function readFiniteInitialAfwWorkflows(options){
+ const keys=['read','assertCurrent','entry'],o=fields(options,keys),{read,assertCurrent,entry}=o;
+ if(typeof read!=='function'||typeof assertCurrent!=='function')fail();
+ const raw=encodeFiniteInitialEntry(entry),initial=decodeFiniteInitialEntry(raw);
+ const check=()=>{
+  const current=fields(options,keys);
+  if(keys.some(k=>current[k]!==o[k])||encodeFiniteInitialEntry(entry)!==raw||Date.now()>=initial.operationDeadline)fail();
+  assertCurrent();
+ };
+ check();
+ const inventory=await readFiniteAfwWorkflowInventory({read,assertCurrent:check});check();
+ let currentInitialObserved=0;
+ for(const row of inventory.instances){
+  const self=row.definition===AFW_FIXED_WORKFLOWS[2].id&&row.id===initial.initialInstanceId;
+  if(self){if(!['running','waiting'].includes(row.status))fail();currentInitialObserved++;}
+  else if(!['complete','errored','terminated'].includes(row.status))fail();
+ }
+ if(currentInitialObserved!==1)fail();
+ check();
+ return Object.freeze({purpose:'afw.finite-initial-workflows.v1',workflowCount:inventory.workflowCount,instanceCount:inventory.instanceCount,currentInitialObserved:true,otherWorkflowsTerminal:true,authorizesEffects:false,operationalReadiness:false});
+}
+function execution(q,confirmationId,observerId,launcherId){
+ fields(q,['intentId','controlHash','sourceRevision','moduleHash','confirmationId','observerId','admissionHash',...(launcherId===undefined?[]:['launcherId'])]);
+ if(typeof q.intentId!=='string'||!q.intentId.length||!(/^[a-f0-9]{64}$/).test(q.controlHash)||!(/^[a-f0-9]{40}$/).test(q.sourceRevision)||!(/^[a-f0-9]{64}$/).test(q.moduleHash)||!(/^[a-f0-9]{64}$/).test(q.admissionHash)||q.confirmationId!==confirmationId||q.observerId!==observerId||launcherId!==undefined&&q.launcherId!==launcherId)fail();
+}
+function phaseInventory({inventory,phase,confirmationId,observerId,qualifiedExecution:q,launcherId,allowMissing=false}){
+ execution(q,confirmationId,observerId,launcherId);
+ let confirmationSeen=0,observerSeen=0,launcherSeen=0;
+ for(const x of inventory.instances){
+  const nominal=x.definition===AFW_FIXED_WORKFLOWS[1].id&&x.id===confirmationId,observer=x.definition===AFW_FIXED_WORKFLOWS[2].id&&x.id===observerId,launcher=launcherId!==undefined&&x.definition===AFW_FIXED_WORKFLOWS[2].id&&x.id===launcherId;
+  if(nominal)confirmationSeen++;if(observer)observerSeen++;if(launcher)launcherSeen++;
+  const active=['running','waiting'].includes(x.status),terminal=['complete','errored','terminated'].includes(x.status);
+  if(nominal&&['arm','nominal'].includes(phase)){if(!active&&!terminal)fail();}
+  else if(launcher&&['arm','prelaunch'].includes(phase)){if(!active)fail();}
+  else if(observer&&phase!=='qa_restore'){if(!active&&x.status!=='complete')fail();}
+  else if(observer){if(x.status!=='complete')fail();}
+  else if(!terminal)fail();
+ }
+ if(confirmationSeen!==(allowMissing?0:1)||observerSeen!==1||launcherSeen>1||launcherId!==undefined&&['prelaunch','nominal','canary_restore','qa_restore'].includes(phase)&&launcherSeen!==1)fail();
+ return Object.freeze({purpose:'afw.finite-phase-workflows.v1',phase,...inventory,confirmationId,observerId,qualifiedExecution:q,authorizesEffects:false,operationalReadiness:false});
+}
+/** Existing public/raw validator remains strict: it cannot accept absence evidence. */
+export async function readFiniteTrialAfwWorkflows(options){
+ const keys=['read','assertCurrent','phase','confirmationId','observerId','qualifiedExecution'],o=fields(options,keys),{read,assertCurrent,phase,confirmationId,observerId,qualifiedExecution}=o;
+ if(typeof read!=='function'||typeof assertCurrent!=='function'||!['arm','nominal','canary_restore','qa_restore'].includes(phase)||!/^afw-release-[a-f0-9]{64}$/.test(confirmationId)||typeof observerId!=='string'||!observerId.length||observerId.length>128||observerId===confirmationId)fail();
+ execution(qualifiedExecution,confirmationId,observerId);
+ const check=()=>{if(keys.some(k=>options[k]!==o[k]))fail();assertCurrent();};
+ const inventory=await readFiniteAfwWorkflowInventory({read,assertCurrent:check});check();
+ return phaseInventory({inventory,phase,confirmationId,observerId,qualifiedExecution});
+}
+/** Finite source phase composition. The ordinary reader above is unchanged;
+ * absence still requires the private coordinator path, never this interface. */
+export async function readFiniteLaunchTrialAfwWorkflows(options){
+ const keys=['read','assertCurrent','phase','confirmationId','observerId','launcherId','qualifiedExecution'],o=fields(options,keys),{read,assertCurrent,phase,confirmationId,observerId,launcherId,qualifiedExecution:q}=o;
+ if(typeof read!=='function'||typeof assertCurrent!=='function'||!['nominal','canary_restore','qa_restore'].includes(phase)||!/^afw-release-[a-f0-9]{64}$/.test(confirmationId)||typeof observerId!=='string'||!observerId.length||observerId.length>128||observerId===confirmationId||launcherId===observerId||launcherId!==finiteLauncherInstanceId({intentId:q.intentId,sourceRevision:q.sourceRevision}))fail();
+ execution(q,confirmationId,observerId,launcherId);
+ const check=()=>{if(keys.some(k=>options[k]!==o[k]))fail();assertCurrent();};
+ const inventory=await readFiniteAfwWorkflowInventory({read,assertCurrent:check});check();
+ return phaseInventory({inventory,phase,confirmationId,observerId,launcherId,qualifiedExecution:q});
+}
+/** INTERNAL synchronous consumption of actual decoded storage plus fixed source
+ * provenance. Only the source inventory calls this under its coordinator; returned
+ * data is never a capability and no public parser accepts it as authority. */
+export function consumePrivateFiniteLaunchInventory(token){
+ const {inventory,snapshot,execution:q,observedAt}=readPrivateFiniteLaunchObservation(token);
+ const {plan:p,planHash,controlHash}=snapshot.control;
+ if(q.intentId!==p.intentId||q.controlHash!==controlHash||q.sourceRevision!==p.source.revision||q.moduleHash!==p.source.moduleHash||q.confirmationId!==p.workflows.confirmation||q.observerId!==p.workflows.bootstrap||q.launcherId!==p.workflows.launcher||snapshot.sealed||snapshot.cleanupStarted||snapshot.state?.withdrawnAt!==undefined&&snapshot.state?.withdrawnAt!==null)fail();
+ const identity={intentId:p.intentId,finitePlanHash:planHash,controlHash,sourceRevision:p.source.revision,qaVersionId:p.deployments.qaLive.versionId,actorId:p.resources.actorId,launcherId:p.workflows.launcher,nominalId:p.workflows.confirmation};
+ if(snapshot.send){
+  execution(q,p.workflows.confirmation,p.workflows.bootstrap,p.workflows.launcher);
+  // SEND with absent provider instance stays unresolved, never never-issued.
+  return Object.freeze({kind:'issued',...identity,sendHash:hashFiniteLaunchRecord(snapshot.send),...(snapshot.ack?{ackHash:hashFiniteLaunchRecord(snapshot.ack)}:{}),provider:inventory.instances.find(x=>x.definition===AFW_FIXED_WORKFLOWS[1].id&&x.id===p.workflows.confirmation)??null,observedAt});
+ }
+ if(snapshot.ack)fail();
+ const phase=snapshot.prepared?'prelaunch':'arm';
+ if(!Number.isSafeInteger(observedAt)||observedAt<p.T0||observedAt>=p.launchPolicy.lastCreateAt||phase==='arm'&&observedAt>p.launchPolicy.armAckBy||phase==='prelaunch'&&(!snapshot.nominalClaim||snapshot.guard?.state!=='armed'||snapshot.guard.deliveries!==0||snapshot.guard.nextAt!==p.C0||snapshot.alarm!==p.C0||snapshot.state?.phase!=='armed'))fail();
+ phaseInventory({inventory,phase,confirmationId:p.workflows.confirmation,observerId:p.workflows.bootstrap,qualifiedExecution:q,launcherId:p.workflows.launcher,allowMissing:true});
+ return Object.freeze({kind:'never_issued',...identity,phase,journalSnapshotHash:snapshot.journalSnapshotHash,controlSnapshotHash:snapshot.controlSnapshotHash,inventoryHash:finiteHash(inventory),observedAt});
 }

~~~~~~~~~~

## lib/mcp-node-process-custody.mjs

~~~~~~~~~~diff
diff --git a/lib/mcp-node-process-custody.mjs b/lib/mcp-node-process-custody.mjs
--- a/lib/mcp-node-process-custody.mjs
+++ b/lib/mcp-node-process-custody.mjs
@@ -1,98 +1,166 @@
+import {AsyncLocalStorage} from 'node:async_hooks';
+import {requireFiniteAdmissionGate,retainFiniteWriterDeadline,requireFiniteAdmissionCustodySource,assertFinitePreparedAdmission,finiteAdmissionInsertConstraint,isFinitePreparedAdmissionDenial} from './mcp-own-finite-admission-gate.mjs';
 import {createHash,createHmac,randomBytes,createCipheriv,createDecipheriv,hkdfSync,timingSafeEqual} from 'node:crypto';
 import {createDossierMonitoringAuthorization} from './dossier-monitoring-authority.mjs';
 import {createPrivateNodeBridge} from './mcp-node-private-bridge.mjs';
 import {createNodeReadiness} from './mcp-node-readiness.mjs';
 const PREFIX='afw.node-process-custody.v1:',SLOT=PREFIX+'original',SHA=/^[0-9a-f]{64}$/;
 const fail=()=>{throw Error('Node process custody unavailable');};
 const time=t=>Number.isSafeInteger(t)&&t>=0&&t<=8640000000000000;
 const authPins=['principalRef','resourceRef','projectRef','permissionRef'];
 const manifestKeys=['containerId','processGeneration','programHash','sourceRevision','image','createdAt','expiresAt'];
 function exact(v,keys){if(!v||Object.getPrototypeOf(v)!==Object.prototype)fail();const d=Object.getOwnPropertyDescriptors(v),own=Reflect.ownKeys(d);if(own.length!==keys.length||own.some(k=>typeof k!=='string'||!keys.includes(k)||!Object.hasOwn(d[k],'value')||!d[k].enumerable))fail();return Object.fromEntries(keys.map(k=>[k,d[k].value]));}
 const manifest=r=>Object.freeze(Object.fromEntries(manifestKeys.map(k=>[k,r[k]])));
 const sqlNow="CAST(strftime('%s','now') AS INTEGER)*1000+CAST(substr(strftime('%f','now'),4,3) AS INTEGER)";
 const sqlGrantExpiry="CAST(strftime('%s',g.expires_at) AS INTEGER)*1000+CAST(substr(g.expires_at,21,3) AS INTEGER)";
 
 /** INTERNAL fixed original grant/DO custody. D1 boot budget never recovers an
  * unknown INSERT ACK into permission. No schema setup, Container implementation
  * or real platform identity is implied; runtime dependencies are host-trusted. */
 export function createNodeProcessCustody(options){
- const o=exact(options,['enabled','db','context','projectId','projectionSecret','storage','custodyKey','containerId','programHash','sourceRevision','image','window','runtime','now']);
+ const o=exact(options,[...(Object.hasOwn(options??{},'finiteGate')?['finiteGate']:[]),'enabled','db','context','projectId','projectionSecret','storage','custodyKey','containerId','programHash','sourceRevision','image','window','runtime','now']);
  if(o.enabled!==true||!o.db?.prepare||typeof o.storage?.transaction!=='function'||!Buffer.isBuffer(o.custodyKey)||o.custodyKey.length!==32||typeof o.now!=='function'||typeof o.containerId!=='string'||!SHA.test(o.containerId)||typeof o.programHash!=='string'||!SHA.test(o.programHash)||typeof o.sourceRevision!=='string'||!(/^[0-9a-f]{40}$/).test(o.sourceRevision)||o.image!=='cloudflare/debian-trixie')fail();
+ const nominalLease=new AsyncLocalStorage();
+ const finiteGate=Object.hasOwn(o,'finiteGate')?requireFiniteAdmissionGate(o.finiteGate):null;
  const w=Object.freeze(exact(o.window,['startAt','expiresAt'])),runtime=Object.freeze(exact(o.runtime,['launch','observe','close']));if(!time(w.startAt)||!time(w.expiresAt)||w.expiresAt<=w.startAt||w.expiresAt-w.startAt>600000||Object.values(runtime).some(v=>typeof v!=='function'))fail();
  const ctx=Object.freeze(exact(o.context,['grantId','subject','clientId','resource','scopes']));
  const readAuthorization=createDossierMonitoringAuthorization({db:o.db,context:ctx,projectId:o.projectId,projectionSecret:o.projectionSecret,now:o.now});
  const db=()=>o.db.withSession?o.db.withSession('first-primary'):o.db;
  const encryption=Buffer.from(hkdfSync('sha256',o.custodyKey,PREFIX,'service-encryption',32)),sealing=Buffer.from(hkdfSync('sha256',o.custodyKey,PREFIX,'record-authentication',32));let last=-1;
- const clock=()=>{const t=o.now();if(!time(t)||t<last)fail();last=t;return t;};
- const current=async original=>{clock();const a=await readAuthorization();const closed=await db().prepare('SELECT grant_id FROM dossier_node_process_closures WHERE grant_id=?').bind(ctx.grantId).first();const t=clock();if(closed)fail();if(!a.enabled||t<w.startAt||t>=w.expiresAt||a.expiresAt<=t||original&&(authPins.some(k=>a[k]!==original[k])||original.expiresAt>a.expiresAt||t>=original.expiresAt))fail();return a;};
+ const clock=()=>{nominalLease.getStore()?.lease?.assertCurrent();const t=o.now();if(!time(t)||t<last)fail();last=t;return t;};
+ const current=async original=>{clock();const a=await readAuthorization();clock();const closed=await db().prepare('SELECT grant_id FROM dossier_node_process_closures WHERE grant_id=?').bind(ctx.grantId).first();const t=clock();if(closed)fail();if(!a.enabled||t<w.startAt||t>=w.expiresAt||a.expiresAt<=t||original&&(authPins.some(k=>a[k]!==original[k])||original.expiresAt>a.expiresAt||t>=original.expiresAt))fail();return a;};
  const seal=r=>createHmac('sha256',sealing).update(PREFIX+JSON.stringify(r)).digest('hex');
- const save=async(tx,r)=>{const {seal:ignored,...body}=r;void ignored;await tx.put(SLOT,{...body,seal:seal(body)});};
+ const save=async(tx,r)=>{clock();const {seal:ignored,...body}=r;void ignored;await tx.put(SLOT,{...body,seal:seal(body)});clock();};
  const read=async tx=>{
   const raw=await tx.get(SLOT);clock();if(raw===undefined)return null;
   const r=exact(raw,['version',...authPins,...manifestKeys,'state','startedAt','readyAt','cipher','seal']),{seal:provided,...body}=r;
   if(typeof provided!=='string'||!SHA.test(provided)||!timingSafeEqual(Buffer.from(provided,'hex'),Buffer.from(seal(body),'hex'))||r.version!==1||authPins.some(k=>typeof r[k]!=='string'||!SHA.test(r[k]))||r.containerId!==o.containerId||r.programHash!==o.programHash||r.sourceRevision!==o.sourceRevision||r.image!==o.image||typeof r.processGeneration!=='string'||!SHA.test(r.processGeneration)||!time(r.createdAt)||r.createdAt>clock()||r.createdAt<w.startAt||!time(r.expiresAt)||r.expiresAt<=r.createdAt||r.expiresAt>w.expiresAt||r.expiresAt-r.createdAt>600000||!['reserved','starting','ready','failed','withdrawn'].includes(r.state)||r.startedAt!==null&&(!time(r.startedAt)||r.startedAt<r.createdAt||r.startedAt>clock())||r.readyAt!==null&&(!time(r.readyAt)||r.startedAt===null||r.readyAt<r.startedAt||r.readyAt>clock())||r.state==='reserved'&&(r.startedAt!==null||r.readyAt!==null)||r.state==='ready'&&(r.startedAt===null||r.readyAt===null))fail();return body;
  };
  const encrypt=(m,key)=>{const iv=randomBytes(12),c=createCipheriv('aes-256-gcm',encryption,iv);c.setAAD(Buffer.from(PREFIX+JSON.stringify(m)));const data=Buffer.concat([c.update(key),c.final()]);return{iv:iv.toString('base64'),tag:c.getAuthTag().toString('base64'),data:data.toString('base64')};};
  const decrypt=r=>{const c=exact(r.cipher,['iv','tag','data']);for(const k of ['iv','tag','data'])if(typeof c[k]!=='string'||Buffer.from(c[k],'base64').toString('base64')!==c[k])fail();const iv=Buffer.from(c.iv,'base64'),tag=Buffer.from(c.tag,'base64'),data=Buffer.from(c.data,'base64');if(iv.length!==12||tag.length!==16||data.length!==32)fail();const d=createDecipheriv('aes-256-gcm',encryption,iv);d.setAAD(Buffer.from(PREFIX+JSON.stringify(manifest(r))));d.setAuthTag(tag);return Buffer.concat([d.update(data),d.final()]);};
  const consent=async a=>{
   const r=await db().prepare('SELECT sequence,issued_at,expires_at FROM dossier_monitoring_consent_events WHERE grant_id=? AND action=? ORDER BY sequence DESC LIMIT 1').bind(ctx.grantId,'grant').first();
   await current(a);if(!r||createHash('sha256').update(JSON.stringify(['afw.dossier-monitoring.v1','permission',ctx.grantId,r.sequence,r.issued_at,r.expires_at])).digest('hex')!==a.permissionRef)fail();return r;
  };
  const claim=async(m,a)=>{
   const c=await consent(a);
+  const constraint=finiteGate?await finiteAdmissionInsertConstraint(finiteGate,m,nominalLease.getStore()?.lease):null;
   const query=`INSERT INTO dossier_node_process_admissions(grant_id,project_id,user_id,client_id,resource,consent_sequence,consent_issued_at,consent_expires_at,container_id,process_generation,program_hash,source_revision,image,created_at,expires_at)
    SELECT g.id,g.project_id,g.user_id,g.client_id,g.resource,c.sequence,c.issued_at,c.expires_at,?,?,?,?,?,?,?
    FROM delegated_access_grants g JOIN site_projects p ON p.id=g.project_id AND p.user_id=g.user_id JOIN dossier_monitoring_consent_events c ON c.grant_id=g.id AND c.project_id=g.project_id AND c.user_id=g.user_id AND c.client_id=g.client_id AND c.resource=g.resource
    WHERE g.id=? AND g.user_id=? AND g.client_id=? AND g.project_id=? AND g.resource=? AND g.revoked_at='' AND c.action='grant' AND c.purpose='afw.dossier-monitoring.v1' AND c.sequence=? AND c.issued_at=? AND c.expires_at=?
    AND NOT EXISTS(SELECT 1 FROM dossier_node_process_closures WHERE grant_id=g.id) AND c.sequence=(SELECT MAX(sequence) FROM dossier_monitoring_consent_events WHERE grant_id=g.id) AND NOT EXISTS(SELECT 1 FROM dossier_monitoring_consent_events WHERE grant_id=g.id AND action='revoke')
    AND json_valid(g.scopes_json) AND json_type(CASE WHEN json_valid(g.scopes_json) THEN g.scopes_json ELSE '[]' END)='array' AND EXISTS(SELECT 1 FROM json_each(CASE WHEN json_valid(g.scopes_json) THEN g.scopes_json ELSE '[]' END) WHERE value='afw:project:read') AND NOT EXISTS(SELECT 1 FROM json_each(CASE WHEN json_valid(g.scopes_json) THEN g.scopes_json ELSE '[]' END) WHERE type<>'text') AND c.issued_at<=${sqlNow}
-   AND ${sqlNow}>=? AND ${sqlNow}<? AND c.expires_at>=? AND ${sqlGrantExpiry}>=?`;
-  const result=await db().prepare(query).bind(...manifestKeys.map(k=>m[k]),ctx.grantId,ctx.subject,ctx.clientId,o.projectId,ctx.resource,c.sequence,c.issued_at,c.expires_at,w.startAt,m.expiresAt,m.expiresAt,m.expiresAt).run();
-  if(result?.meta?.changes!==1)fail();await current({...a,expiresAt:m.expiresAt});
+   AND ${sqlNow}>=? AND ${sqlNow}<? AND c.expires_at>=? AND ${sqlGrantExpiry}>=?${constraint?' AND '+constraint.clause:''}`;
+  const statement=db().prepare(query).bind(...manifestKeys.map(k=>m[k]),ctx.grantId,ctx.subject,ctx.clientId,o.projectId,ctx.resource,c.sequence,c.issued_at,c.expires_at,w.startAt,Math.min(m.expiresAt,nominalLease.getStore()?.lease?.deadline??m.expiresAt),m.expiresAt,m.expiresAt,...(constraint?constraint.params:[]));
+  const evidence=nominalLease.getStore()?.evidence;let result;
+  if(evidence){evidence.executions++;evidence.pending++;}
+  try{result=await statement.run();if(evidence&&!(result?.success===true&&result?.meta?.changes===0))evidence.unsafe=true;}
+  catch(error){if(evidence)evidence.unsafe=true;throw error;}
+  finally{if(evidence)evidence.pending--;}
+  if(finiteGate&&result?.success===true&&result?.meta?.changes===0){const error=Error('Node process custody unavailable');evidence.zeroFailure=error;throw error;}
+  if(result?.meta?.changes!==1||finiteGate&&result?.success!==true)fail();await current({...a,expiresAt:m.expiresAt});
  };
  const originalAdmission=async r=>{
   // One primary snapshot ties the admission to its original consent. Keep the
   // live authorization/closure checks on both sides; never cache permission.
   await current(r);const v=await db().prepare('SELECT a.*,c.sequence AS live_consent_sequence,c.issued_at AS live_consent_issued_at,c.expires_at AS live_consent_expires_at FROM dossier_node_process_admissions a JOIN dossier_monitoring_consent_events c ON c.grant_id=a.grant_id AND c.action=\'grant\' WHERE a.grant_id=? AND '+sqlNow+'<a.expires_at ORDER BY c.sequence DESC LIMIT 1').bind(ctx.grantId).first();await current(r);
   if(!v||v.project_id!==o.projectId||v.user_id!==ctx.subject||v.client_id!==ctx.clientId||v.resource!==ctx.resource||['containerId','processGeneration','programHash','sourceRevision','image','createdAt','expiresAt'].some((k,i)=>v[['container_id','process_generation','program_hash','source_revision','image','created_at','expires_at'][i]]!==r[k]))fail();
   if(createHash('sha256').update(JSON.stringify(['afw.dossier-monitoring.v1','permission',ctx.grantId,v.live_consent_sequence,v.live_consent_issued_at,v.live_consent_expires_at])).digest('hex')!==r.permissionRef||v.consent_sequence!==v.live_consent_sequence||v.consent_issued_at!==v.live_consent_issued_at||v.consent_expires_at!==v.live_consent_expires_at)fail();
  };
-  const invokeRuntime=async(fn,value,deadline)=>{
+  const invokeRuntime=async(fn,value,deadline,assertCurrent)=>{
   const remaining=deadline===null?5000:Math.min(60000,deadline-clock());if(remaining<=0)fail();
   const c=new AbortController();let onAbort;const rejected=new Promise((_,reject)=>{onAbort=()=>reject(Error('Node process custody unavailable'));c.signal.addEventListener('abort',onAbort,{once:true});});
-  const timer=setTimeout(()=>c.abort(),remaining),operation=Promise.resolve().then(()=>{if(c.signal.aborted)fail();return fn(value,c.signal);});
-  try{const result=await Promise.race([operation,rejected]);if(c.signal.aborted||deadline!==null&&clock()>=deadline)fail();return result;}finally{clearTimeout(timer);c.signal.removeEventListener('abort',onAbort);c.abort();}
+  const timer=setTimeout(()=>c.abort(),remaining),operation=Promise.resolve().then(()=>{if(c.signal.aborted)fail();clock();assertCurrent?.();return assertCurrent?fn(value,c.signal,assertCurrent):fn(value,c.signal);});
+  try{const result=await Promise.race([operation,rejected]);assertCurrent?.();if(c.signal.aborted||deadline!==null&&clock()>=deadline)fail();return result;}finally{clearTimeout(timer);c.signal.removeEventListener('abort',onAbort);c.abort();}
  };
  const observe=async r=>{await originalAdmission(r);const p=exact(await invokeRuntime((m,signal)=>runtime.observe(m,signal,async()=>{if(signal.aborted)fail();await originalAdmission(r);const key=decrypt(r);let probe;try{probe=createNodeReadiness({key,manifest:m,now:o.now}).probe();}finally{key.fill(0);}if(signal.aborted)fail();return Object.freeze({request:probe.request,accept(packet){if(signal.aborted)fail();return probe.accept(packet);}});}),manifest(r),r.expiresAt),[...manifestKeys,'running']);await originalAdmission(r);if(p.running!==true||manifestKeys.some(k=>p[k]!==r[k]))fail();};
  const readyState=async()=>{
   const r=await o.storage.transaction(read);if(!r||r.state!=='ready')fail();await observe(r);
   const latest=await o.storage.transaction(read);if(!latest||latest.state!=='ready'||JSON.stringify(latest)!==JSON.stringify(r))fail();await originalAdmission(latest);return latest;
  };
- const safe=fn=>async(...args)=>{try{return await fn(...args);}catch{fail();}};
+ let knownFailure=null;
+ const knownNoAdmission=()=>{knownFailure=Error('Node process custody unavailable');return knownFailure;};
+ const safe=fn=>async(...args)=>{try{return await fn(...args);}catch(error){if(error===knownFailure)throw error;fail();}};
+ const preflightAdmission=async()=>{
+  if(!finiteGate)return;
+  requireFiniteAdmissionGate(finiteGate,{containerId:o.containerId,grantHash:createHash('sha256').update(ctx.grantId).digest('hex')},'admission');
+  requireFiniteAdmissionCustodySource(finiteGate,{db:o.db,programHash:o.programHash,sourceRevision:o.sourceRevision,...w,grantId:ctx.grantId,subject:ctx.subject,clientId:ctx.clientId,resource:ctx.resource,projectId:o.projectId});
+  const prior=await o.storage.transaction(read),before=await finiteGate.read();
+  if(before.status!=='observed')fail();
+  // An already settled ready record only reaches the existing reconcile path;
+  // this exemption never issues another admission or grants another launch.
+  if(prior?.state==='ready'&&before.writers.admission?.settlement)return;
+  const fresh=()=>!prior&&!before.writers.admission&&!before.writers.launch;
+  try{await assertFinitePreparedAdmission(finiteGate);}
+  catch(error){
+   if(fresh()&&isFinitePreparedAdmissionDenial(finiteGate,error)){
+    const after=await finiteGate.read(),latest=await o.storage.transaction(read);
+    if(after.status==='observed'&&!latest&&!after.writers.admission&&!after.writers.launch)throw knownNoAdmission();
+   }
+   throw error;
+  }
+  if(fresh()&&nominalLease.getStore()?.evidence)nominalLease.getStore().evidence.fresh=true;
+ };
  return Object.freeze({
+  preflightAdmission:safe(async()=>{knownFailure=null;return preflightAdmission();}),
+  isKnownNoAdmissionFailure:error=>knownFailure!==null&&error===knownFailure,
   start:safe(async()=>{
+   knownFailure=null;
+   // Retained outside DO.transaction: retries cannot erase an inserted, unknown
+   // or still pending D1 execution from this original start.
+   const evidence={executions:0,pending:0,unsafe:false,possibleLaunch:false,fresh:false,zeroFailure:null};
+   try{return await nominalLease.run({lease:null,evidence},async()=>{
+   await preflightAdmission();
+   // Commit the finite writer marker OUTSIDE custody's async transaction.
+   if(finiteGate){
+    requireFiniteAdmissionGate(finiteGate,{containerId:o.containerId,grantHash:createHash('sha256').update(ctx.grantId).digest('hex')},'admission');
+    const begun=await finiteGate.beginAdmission();
+    if(['issued','reconcile_only'].includes(begun.status))nominalLease.getStore().lease=retainFiniteWriterDeadline(finiteGate,begun.claim,'admission',o.now,w.expiresAt);
+    if(begun.status==='reconcile_only'){
+     const observed=await finiteGate.read();
+     // Reuse only a fully settled existing readiness observation. This branch
+     // never enters admission persistence or runtime.launch, including ACK loss.
+     if(observed.status!=='observed'||observed.sealed||!observed.writers.admission?.settlement)fail();
+     return thisReady();
+    }
+    if(begun.status!=='issued')fail();
+   }
    const a=await current();
    const reserved=await o.storage.transaction(async tx=>{
-    const prior=await read(tx);if(prior){if(prior.state!=='ready')fail();await originalAdmission(prior);return{first:false,r:prior};}
+    try{
+    const prior=await read(tx);if(prior){evidence.unsafe=true;if(prior.state!=='ready')fail();await originalAdmission(prior);return{first:false,r:prior};}
     const createdAt=clock(),expiresAt=Math.min(w.expiresAt,a.expiresAt,createdAt+600000),m={containerId:o.containerId,processGeneration:randomBytes(32).toString('hex'),programHash:o.programHash,sourceRevision:o.sourceRevision,image:o.image,createdAt,expiresAt};
     await claim(m,a);const key=randomBytes(32);let cipher;try{cipher=encrypt(m,key);}finally{key.fill(0);}const r={version:1,...Object.fromEntries(authPins.map(k=>[k,a[k]])),...m,state:'reserved',startedAt:null,readyAt:null,cipher};await save(tx,r);await originalAdmission(r);return{first:true,r};
+    }catch(error){
+     // Only this callback's acknowledged-zero failure is known. Any unreadable
+     // prior custody or other failure is sticky, including after an earlier zero.
+     if(error!==evidence.zeroFailure)evidence.unsafe=true;throw error;
+    }
    });
    if(!reserved.first)return thisReady();
    const r=reserved.r;await originalAdmission(r);
    await o.storage.transaction(async tx=>{const s=await read(tx);if(!s||s.state!=='reserved'||s.processGeneration!==r.processGeneration)fail();await originalAdmission(s);await save(tx,{...s,state:'starting',startedAt:clock()});await originalAdmission(s);});
    await originalAdmission(r);const key=decrypt(r);
    try{
-    await invokeRuntime(runtime.launch,Object.freeze({...manifest(r),key}),r.expiresAt);await observe(r);
+    evidence.possibleLaunch=true;
+    await invokeRuntime(runtime.launch,Object.freeze({...manifest(r),key}),r.expiresAt,nominalLease.getStore()?.lease?.assertCurrent);await observe(r);
     await o.storage.transaction(async tx=>{const s=await read(tx);if(!s||s.state!=='starting'||s.processGeneration!==r.processGeneration)fail();await originalAdmission(s);await save(tx,{...s,state:'ready',readyAt:clock()});await originalAdmission(s);});
-    return await thisReady();
-   }catch{try{await invokeRuntime(runtime.close,undefined,null);}catch{}try{await o.storage.transaction(async tx=>{const s=await read(tx);if(s&&s.processGeneration===r.processGeneration&&s.state!=='withdrawn')await save(tx,{...s,state:'failed'});});}catch{}fail();}finally{key.fill(0);}
+    const ready=await thisReady();
+    if(finiteGate&&!['settled','reconciled'].includes((await finiteGate.settleAdmission()).status))fail();clock();
+    return ready;
+   }catch{await nominalLease.exit(async()=>{try{await invokeRuntime(runtime.close,undefined,null);}catch{}try{await o.storage.transaction(async tx=>{const s=await read(tx);if(s&&s.processGeneration===r.processGeneration&&s.state!=='withdrawn')await save(tx,{...s,state:'failed'});});}catch{}});fail();}finally{key.fill(0);}
+  });}catch(error){
+    if(finiteGate&&error===evidence.zeroFailure&&evidence.fresh&&evidence.executions>0&&evidence.pending===0&&!evidence.unsafe&&!evidence.possibleLaunch)throw knownNoAdmission();
+    throw error;
+   }
   }),
   readReadiness:safe(thisReady),
   createBridge:safe(async()=>{const r=await readyState(),key=decrypt(r);try{await originalAdmission(r);return createPrivateNodeBridge({key,containerId:r.containerId,processGeneration:r.processGeneration,expiresAt:r.expiresAt,now:o.now});}finally{key.fill(0);}}),
   // INTERNAL historical observation, never a start permit or physical-stop proof.
   // It uses the ORIGINAL source/window/key and reads no decrypted capability.
   observeRetired:safe(async()=>invokeRuntime(async()=>{
    const r=await o.storage.transaction(read);if(!r||r.state!=='withdrawn')fail();
    const query=()=>db().prepare("SELECT a.*,c.closed_at,g.revoked_at,(SELECT MAX(e.issued_at) FROM dossier_monitoring_consent_events e WHERE e.grant_id=g.id AND e.project_id=g.project_id AND e.user_id=g.user_id AND e.client_id=g.client_id AND e.resource=g.resource AND e.action='revoke' AND e.purpose='afw.dossier-monitoring.v1') AS monitoring_revoked_at FROM dossier_node_process_admissions a JOIN dossier_node_process_closures c ON c.grant_id=a.grant_id AND c.process_generation=a.process_generation AND c.container_id=a.container_id AND c.program_hash=a.program_hash AND c.source_revision=a.source_revision AND c.image=a.image JOIN delegated_access_grants g ON g.id=a.grant_id AND g.project_id=a.project_id AND g.user_id=a.user_id AND g.client_id=a.client_id AND g.resource=a.resource JOIN site_projects p ON p.id=g.project_id AND p.user_id=g.user_id WHERE g.id=? AND g.project_id=? AND g.user_id=? AND g.client_id=? AND g.resource=?").bind(ctx.grantId,o.projectId,ctx.subject,ctx.clientId,ctx.resource).first();
    const row=await query(),observedAt=clock(),columns=['container_id','process_generation','program_hash','source_revision','image','created_at','expires_at'];
    if(!row||manifestKeys.some((k,n)=>row[columns[n]]!==r[k])||!time(row.closed_at)||row.closed_at<r.createdAt||row.closed_at>observedAt||!time(row.monitoring_revoked_at)||row.monitoring_revoked_at<r.createdAt||row.monitoring_revoked_at>observedAt||typeof row.revoked_at!=='string'||!/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d\.\d{3}Z$/.test(row.revoked_at)||!Number.isSafeInteger(Date.parse(row.revoked_at))||new Date(row.revoked_at).toISOString()!==row.revoked_at||Date.parse(row.revoked_at)<r.createdAt||Date.parse(row.revoked_at)>observedAt)fail();

~~~~~~~~~~

## lib/mcp-original-container-runtime.mjs

~~~~~~~~~~diff
diff --git a/lib/mcp-original-container-runtime.mjs b/lib/mcp-original-container-runtime.mjs
--- a/lib/mcp-original-container-runtime.mjs
+++ b/lib/mcp-original-container-runtime.mjs
@@ -32,25 +32,28 @@
  if(typeof id!=='string'||!sha.test(id))invalid('native_runtime_identity_invalid');
  if(!container)invalid('native_container_absent');
  for(const [key,stage]of [['start','native_container_start_unavailable'],['setInactivityTimeout','native_container_timeout_unavailable'],['interceptOutboundHttp','native_container_intercept_unavailable'],['getTcpPort','native_container_port_unavailable'],['destroy','native_container_destroy_unavailable']]){
   let method;try{method=container[key];}catch{invalid(stage);}if(typeof method!=='function')invalid(stage);
  }
  const hash=createHash('sha256').update(o.program).digest('hex');let last=-1,attempted=false,closed=false;
  const clock=()=>{const t=o.now();if(!time(t)||t<last||t<w.startAt||t>=w.expiresAt||closed)fail();last=t;return t;};
  const check=(value,signal)=>{if(!(signal instanceof AbortSignal)||signal.aborted)fail();const m=Object.freeze(exact(value,fields)),t=clock();if(m.containerId!==id||m.programHash!==hash||m.sourceRevision!==o.sourceRevision||m.image!=='cloudflare/debian-trixie'||typeof m.processGeneration!=='string'||!sha.test(m.processGeneration)||!time(m.createdAt)||m.createdAt<w.startAt||m.createdAt>t||!time(m.expiresAt)||m.expiresAt<=t||m.expiresAt>w.expiresAt||m.expiresAt<=m.createdAt||m.expiresAt-m.createdAt>600000)fail();return m;};
  const keepOriginal=async(m,signal)=>{check(m,signal);if(container.running!==true)fail();await container.setInactivityTimeout(m.expiresAt-clock());check(m,signal);if(container.running!==true)fail();};
  return Object.freeze({
-  async launch(value,signal){
+  async launch(value,signal,assertCurrent){
+   // Internal parent lease can only narrow this original runtime authority.
+   if(assertCurrent!==undefined&&typeof assertCurrent!=='function')fail();assertCurrent?.();
    const data=exact(value,[...fields,'key']),m=check(Object.fromEntries(fields.map(k=>[k,data[k]])),signal);if(attempted||container.running!==false||!Buffer.isBuffer(data.key)||data.key.length!==32)fail();attempted=true;
-   const control=await o.makeControl(Object.freeze({containerId:id,processGeneration:m.processGeneration,expiresAt:m.expiresAt}));check(m,signal);if(!control||typeof control.fetch!=='function'||container.running!==false)fail();
+   const current=()=>{assertCurrent?.();check(m,signal);};
+   const control=await o.makeControl(Object.freeze({containerId:id,processGeneration:m.processGeneration,expiresAt:m.expiresAt}));current();if(!control||typeof control.fetch!=='function'||container.running!==false)fail();
    await container.start({image:m.image,instance:'lite',enableInternet:true,entrypoint:['node','--input-type=module','-e',o.program],env:{AFW_NODE_BOOTSTRAP:JSON.stringify({manifest:m,key:data.key.toString('base64')})}});
-   check(m,signal);if(container.running!==true)fail();await container.interceptOutboundHttp('afw-node-control.internal',control);await keepOriginal(m,signal);
+   current();if(container.running!==true)fail();await container.interceptOutboundHttp('afw-node-control.internal',control);current();await keepOriginal(m,signal);current();
   },
   async observe(value,signal,makeProbe){
    const m=check(value,signal);if(typeof makeProbe!=='function'||container.running!==true)fail();await keepOriginal(m,signal);
    return bounded(Math.min(30000,m.expiresAt-clock()),signal,async active=>{
     for(let attempt=0;attempt<60;attempt++){
      check(m,active);if(container.running!==true)fail();const probe=await makeProbe();check(m,active);if(!probe?.request||typeof probe.accept!=='function')fail();
      let refused=false;
      const result=await bounded(Math.min(5000,m.expiresAt-clock()),active,async current=>{
       let response;try{response=await container.getTcpPort(8080).fetch(new Request('http://afw-node.internal/ready',{method:'POST',headers:{'Content-Type':'application/json','X-AFW-Node-Signature':probe.request.signature},body:probe.request.body,signal:current}));}catch{if(current.aborted)fail();refused=true;return null;}
       return probe.accept(await packet(response,current));

~~~~~~~~~~

## lib/mcp-own-durable-host.mjs

~~~~~~~~~~diff
diff --git a/lib/mcp-own-durable-host.mjs b/lib/mcp-own-durable-host.mjs
--- a/lib/mcp-own-durable-host.mjs
+++ b/lib/mcp-own-durable-host.mjs
@@ -12,70 +12,72 @@
 const fail=()=>{throw Error('Own durable event host unavailable');};
 const closed=async()=>fail();
 const deny=()=>new Response('{"code":"unavailable"}',{status:404,headers:{'Content-Type':'application/json','Cache-Control':'no-store'}});
 function exact(v,keys){if(!v||Object.getPrototypeOf(v)!==Object.prototype)fail();const d=Object.getOwnPropertyDescriptors(v),own=Reflect.ownKeys(d);if(own.length!==keys.length||own.some(k=>typeof k!=='string'||!keys.includes(k)||!Object.hasOwn(d[k],'value')||!d[k].enumerable))fail();return Object.fromEntries(keys.map(k=>[k,d[k].value]));}
 
 /** INTERNAL composition only. Original ctx/D1/OAuth pins/control entrypoint
  * are supplied by the server, never a request. Not a Worker/RPC mount. */
 export function createOwnDurableEventHost(options,observe){
  const trace=stage=>{try{if(typeof observe==='function')observe(stage);}catch{}};
  const fields=['enabled','db','context','projectId','projectionSecret','custodyKey','ctx','program','sourceRevision','window','makeControl','now'];
- const o=exact(options,Object.hasOwn(options??{},'successor')?[...fields,'successor']:fields);if(o.enabled!==true)fail();
+ const o=exact(options,[...fields,...(Object.hasOwn(options??{},'successor')?['successor']:[]),...(Object.hasOwn(options??{},'finiteGate')?['finiteGate']:[])]);if(o.enabled!==true)fail();
  const context=exact(o.context,['grantId','subject','clientId','resource','scopes']);if(!Array.isArray(context.scopes))fail();context.scopes=Object.freeze([...context.scopes]);Object.freeze(context);
  const window=Object.freeze(exact(o.window,['startAt','expiresAt'])),storage=o.ctx?.storage,container=o.ctx?.container,containerId=o.ctx?.id?.toString();
  if(typeof storage?.transaction!=='function'||typeof o.program!=='string'||!Buffer.isBuffer(o.custodyKey)||o.custodyKey.length!==32)fail();
  const custodyKey=Buffer.from(o.custodyKey),programHash=createHash('sha256').update(o.program).digest('hex'),readAuthorization=createDossierMonitoringAuthorization({db:o.db,context,projectId:o.projectId,projectionSecret:o.projectionSecret,now:o.now});
  let successor;
  if(Object.hasOwn(o,'successor')){
   const s=exact(o.successor,['version','plan','readRetirement','readDeployment']);
   if(s.version!=='afw.successor-host.v1'||typeof s.readRetirement!=='function'||typeof s.readDeployment!=='function')fail();
   const resolved=resolveSuccessorPreparation(s.plan),c=resolved.candidate;
   if(c.containerId!==containerId||c.programHash!==programHash||c.sourceRevision!==o.sourceRevision||c.startAt!==window.startAt||c.expiresAt!==window.expiresAt)fail();
   const candidate=Object.freeze(Object.fromEntries(['trialId','programHash','sourceRevision','startAt','expiresAt','budget'].map(k=>[k,c[k]])));
   successor=Object.freeze({...s,plan:Object.freeze({scope:resolved.manifest.scope,original:resolved.original,candidate,namespace:s.plan.namespace})});
  }
+ if(Object.hasOwn(o,'finiteGate')&&!successor)fail();
  // Construction validates the fixed runtime without allocating a process.
  trace('native_runtime_check');
  createOriginalContainerRuntime({...Object.fromEntries(['enabled','ctx','program','sourceRevision','makeControl','now'].map(k=>[k,o[k]])),window},trace);
  trace('native_runtime_ready');
  const db=()=>o.db.withSession?o.db.withSession('first-primary'):o.db;
  const receipts=createOwnSubscriptionReceiptJournal({db:o.db,context,projectId:o.projectId,containerId,programHash,sourceRevision:o.sourceRevision,window,readAuthorization,now:o.now});
  const isClosed=async()=>{trace('native_closure_read');const result=!!await db().prepare('SELECT grant_id FROM dossier_node_process_closures WHERE grant_id=?').bind(context.grantId).first();trace('native_closure_ready');return result;};
  function invocation(){
   const scope=createInvocationStorage(storage),originalRuntime=createOriginalContainerRuntime({...Object.fromEntries(['enabled','ctx','program','sourceRevision','makeControl','now'].map(k=>[k,o[k]])),window});
-  const runtime=successor?Object.freeze({...originalRuntime,launch:(boot,signal)=>createSuccessorLaunchGate({db:o.db,plan:successor.plan,context,projectId:o.projectId,projectionSecret:o.projectionSecret,readRetirement:successor.readRetirement,readDeployment:successor.readDeployment,launch:originalRuntime.launch,now:o.now})(boot,signal)}):originalRuntime;
-  const custody=createNodeProcessCustody({enabled:true,db:o.db,context,projectId:o.projectId,projectionSecret:o.projectionSecret,storage:scope.storage,custodyKey,containerId,programHash,sourceRevision:o.sourceRevision,image:'cloudflare/debian-trixie',window,runtime,now:o.now});
+  const runtime=successor?Object.freeze({...originalRuntime,launch:(boot,signal,assertCurrent)=>createSuccessorLaunchGate({finiteGate:o.finiteGate,db:o.db,plan:successor.plan,context,projectId:o.projectId,projectionSecret:o.projectionSecret,readRetirement:successor.readRetirement,readDeployment:successor.readDeployment,launch:originalRuntime.launch,now:o.now})(boot,signal,assertCurrent)}):originalRuntime;
+  const custody=createNodeProcessCustody({...(Object.hasOwn(o,'finiteGate')?{finiteGate:o.finiteGate}:{}),enabled:true,db:o.db,context,projectId:o.projectId,projectionSecret:o.projectionSecret,storage:scope.storage,custodyKey,containerId,programHash,sourceRevision:o.sourceRevision,image:'cloudflare/debian-trixie',window,runtime,now:o.now});
   const controller=(processGeneration,readIdentity=closed)=>createMcpSubscriptionController({storage:scope.storage,readAuthorization,custodyKey,send:closed,now:o.now,nodeHost:{processGeneration,readIdentity,readReadiness:custody.readReadiness,send:async(ref,signal)=>{
    scope.assertOutside();const bridge=await custody.createBridge();scope.assertOutside();
    return createPrivateNodeSender({bridge,now:o.now,dispatch:request=>{scope.assertOutside();return container.getTcpPort(8080).fetch(request);}})(ref,signal);
   }}});
   return{scope,custody,controller};
  }
  const safe=fn=>async(...args)=>{try{return await fn(...args);}catch{fail();}};
  const host=Object.freeze({
   list:safe(async()=>{const a=await readAuthorization();trace('native_authorization_ready');if(!a.enabled||await isClosed())return null;const b=await readAuthorization();if(!b.enabled||['principalRef','resourceRef','projectRef','permissionRef'].some(k=>a[k]!==b[k])||await isClosed())return null;return b.projectRef;}),
   subscribe:safe(async value=>{
    const p=snapshotMcpSubscriptionRequest(value),a=await readAuthorization();if(!a.enabled||p.arguments.projectRef!==a.projectRef||await isClosed())fail();
    const anchor=await receipts.preflight(),i=invocation();i.scope.assertOutside();
    const started=performance.now(),duration=(end,start)=>Math.min(600000,Math.max(0,Math.floor(end-start)));
    let stage='process_readiness',stageStarted=started;
    try{
+    await i.custody.preflightAdmission();
     const ready=await i.custody.start();stage='callback_verification';stageStarted=performance.now();
     const receipt=await i.controller(ready.processGeneration).subscribe(p);stage='receipt_record';stageStarted=performance.now();
     await receipts.record(receipt,ready,anchor);stage='final_readiness';stageStarted=performance.now();
     // A primary receipt is history, not proof that its original process survived
     // the insertion await. Reprobe the same signed custody before returning.
     const latest=await i.custody.readReadiness();if(latest.processGeneration!==ready.processGeneration||latest.expiresAt!==ready.expiresAt||latest.ready!==true)fail();
     return receipt;
-   }catch{
+   }catch(error){
     const failedAt=performance.now();
-    let closureCompleted=false;try{await i.custody.close();closureCompleted=true;}catch{}
+    let closureCompleted=false;if(!i.custody.isKnownNoAdmissionFailure(error)){try{await i.custody.close();closureCompleted=true;}catch{}}
     // Operator diagnostic only: fixed stages, no exception, identity, callback,
     // request or secret. A closure request does not prove physical termination.
     // Logging must never prevent closure or alter the generic public failure.
     try{console.warn(JSON.stringify({event:'afw.own_subscription_failed',stage,closureCompleted,elapsedMs:duration(failedAt,started),stageElapsedMs:duration(failedAt,stageStarted),closureElapsedMs:duration(performance.now(),failedAt)}));}catch{}
     fail();
    }
   }),
   // INTERNAL saved-event producer only, never registered as an MCP method.
   readReadiness:safe(async()=>invocation().custody.readReadiness()),
   // INTERNAL original receipt observation only. No caller SID, callback,

~~~~~~~~~~

## lib/mcp-own-permission-withdrawal.mjs

~~~~~~~~~~diff
diff --git a/lib/mcp-own-permission-withdrawal.mjs b/lib/mcp-own-permission-withdrawal.mjs
--- a/lib/mcp-own-permission-withdrawal.mjs
+++ b/lib/mcp-own-permission-withdrawal.mjs
@@ -17,21 +17,21 @@
   permissionsWithdrawn: monitoringWithdrawn && readWithdrawn, runtimeStopRequested: requestStop && runtimeStopRequested,
   physicalStopVerified: false, nativeWithdrawalVerified: false, operationalReadiness: false});
 }
 
 /** INTERNAL, unmounted reduction only. The trusted host pins the original owner,
  * consent, primary DB and historical close callback. Native unsubscribe must be
  * attempted separately before revoking read permission. This is also usable for
  * reduction when that unsubscribe is unknown; it never certifies native removal.
  * No public caller may construct these options, choose a target or renew access.
  */
-function createReduction(options, requestStop) {
+function createReduction(options, requestStop, readOnly = false) {
  const o = exact(options, ['enabled', 'db', 'context', 'originalConsent', 'window', 'requestId', ...(requestStop ? ['close'] : []), 'now']);
  const reply = (...values) => receipt(requestStop, ...values);
  const context = exact(o.context, ['grantId', 'subject', 'projectId', 'clientId', 'resource']);
  const consent = exact(o.originalConsent, ['sequence', 'revision', 'issuedAt', 'expiresAt']);
  const window = exact(o.window, ['startAt', 'expiresAt']);
  if (o.enabled !== true || typeof o.db?.prepare !== 'function' || (requestStop && typeof o.close !== 'function') ||
   typeof o.now !== 'function' || !Object.values(context).every(id) ||
   !Number.isSafeInteger(consent.sequence) || consent.sequence < 1 ||
   !Number.isSafeInteger(consent.revision) || consent.revision < 1 ||
   !time(consent.issuedAt) || !time(consent.expiresAt) || consent.expiresAt <= consent.issuedAt ||
@@ -122,20 +122,29 @@
    return await bounded(async current => {
     current();
     const answer = exact(await o.close(controller.signal,current), ['closed', 'runtimeStopRequested']);
     current();
     if (controller.signal.aborted || answer.closed !== true || answer.runtimeStopRequested !== true) unavailable();
     return true;
    });
   } finally { controller.abort(); }
  };
 
+ const observe = async () => {
+  try {
+   const first = await read(), second = await read();
+   const stable = value => {const {database_now,...rest}=value;void database_now;return JSON.stringify(rest);};
+   if(stable(first)!==stable(second))return reply();
+   return reply(second.action==='revoke',second.revoked_at!=='',false);
+  } catch {return reply();}
+ };
+ if(readOnly)return Object.freeze({observe});
  return Object.freeze({async withdraw(...args) {
   if (args.length) return reply();
   let row;
   try { row = await read(); } catch { return reply(); }
   if (row.action !== 'revoke') {
    // The existing writer owns append-only audit/CAS/idempotency. Its status alone
    // is never a receipt here: primary reconciliation handles a lost write ACK.
    try {
     await bounded(async current => recordDossierMonitoringConsent({
      db: scopedDb(current), subject: context.subject, grantId: context.grantId, projectId: context.projectId,
@@ -176,11 +185,16 @@
 
 /** Legacy private reduction: preserve its qualified stop-request behavior. */
 export function createOwnPermissionWithdrawal(options) {
  return createReduction(options, true);
 }
 
 /** Constructor-only permission reduction. No close callback or runtime selector.
  * This receipt cannot establish process absence or authorize restoration. */
 export function createOwnPermissionsOnlyReduction(options) {
  return createReduction(options, false);
+}
+
+/** Fixed primary reconciliation only: no append, UPDATE, close or retry. */
+export function createOwnPermissionsOnlyObservation(options) {
+ return createReduction(options, false, true);
 }

~~~~~~~~~~

## lib/mcp-own-retirement-host.mjs

~~~~~~~~~~diff
diff --git a/lib/mcp-own-retirement-host.mjs b/lib/mcp-own-retirement-host.mjs
--- a/lib/mcp-own-retirement-host.mjs
+++ b/lib/mcp-own-retirement-host.mjs
@@ -1,20 +1,19 @@
+import {parseDossierRetirementFields} from './dossier-event-policy-data.mjs';
 import {readDossierEventHostPolicy} from './dossier-event-rpc-authority.mjs';
 import {createRetiredCustodyReader} from './mcp-retired-custody-reader.mjs';
 const fail=()=>{throw Error('Private retirement unavailable');};
 const names=['AFW_DOSSIER_RETIREMENT_READ_ENABLED','AFW_DOSSIER_RETIREMENT_POLICY','AFW_OAUTH_ISSUER','AFW_OAUTH_RESOURCE','AFW_OAUTH_PILOT_CLIENT_ID','AFW_OAUTH_PILOT_PROJECT_ID','DB','AFW_DOSSIER_EVENTS_PROJECTION_SECRET','AFW_DOSSIER_EVENTS_CUSTODY_KEY','AFW_DOSSIER_EVENTS_NODE'];
 /** Private server-fixed original custody, independent of live Events policy.
  * No Container/runtime capability, HTTP route, selector or permission renewal. */
 export async function observeOwnRetiredCustody({env,ctx,now=Date.now}){
  if(env?.AFW_DOSSIER_RETIREMENT_READ_ENABLED!=='true')fail();
  const pins=Object.freeze(Object.fromEntries(names.map(k=>[k,env[k]]))),raw=pins.AFW_DOSSIER_RETIREMENT_POLICY;
- if(typeof raw!=='string'||raw.length>4096)fail();const parsed=JSON.parse(raw);
- if(!parsed||Object.getPrototypeOf(parsed)!==Object.prototype||typeof parsed.programHash!=='string'||!/^[0-9a-f]{64}$/.test(parsed.programHash)||typeof parsed.sourceRevision!=='string'||!/^[0-9a-f]{40}$/.test(parsed.sourceRevision))fail();
- const {programHash,sourceRevision,...policy}=parsed;
+ const {programHash,sourceRevision,policy}=parseDossierRetirementFields(raw);
  const shadow={...pins,AFW_DOSSIER_EVENTS_ENABLED:'false',AFW_DOSSIER_EVENTS_POLICY:JSON.stringify(policy)};
  const c=readDossierEventHostPolicy({enabled:true,env:shadow,historical:true,now}),p=c.policy;
  const storage=ctx.storage,transaction=storage?.transaction,id=ctx.id;
  const current=()=>{c.current();if(!names.every(k=>env[k]===pins[k])||ctx.storage!==storage||storage.transaction!==transaction||ctx.id!==id||id.toString()!==p.containerId||pins.AFW_DOSSIER_EVENTS_NODE.idFromString(p.containerId).toString()!==p.containerId)fail();};current();
  const secret=pins.AFW_DOSSIER_EVENTS_CUSTODY_KEY;if(typeof secret!=='string'||secret.length!==44)fail();const key=Buffer.from(secret,'base64');if(key.length!==32||key.toString('base64')!==secret){key.fill(0);fail();}
  let reader;try{reader=createRetiredCustodyReader({db:pins.DB,context:{grantId:p.grantId,subject:p.subject,clientId:p.clientId,resource:p.resource,scopes:['afw:project:read']},projectId:p.projectId,projectionSecret:pins.AFW_DOSSIER_EVENTS_PROJECTION_SECRET,storage,custodyKey:key,containerId:p.containerId,programHash,sourceRevision,image:'cloudflare/debian-trixie',window:{startAt:p.startAt,expiresAt:p.expiresAt},now});}finally{key.fill(0);}
  current();const result=await reader.observeRetired();current();return result;
 }

~~~~~~~~~~

## lib/mcp-qa-cloud-lifecycle-admission.mjs

~~~~~~~~~~diff
diff --git a/lib/mcp-qa-cloud-lifecycle-admission.mjs b/lib/mcp-qa-cloud-lifecycle-admission.mjs
--- a/lib/mcp-qa-cloud-lifecycle-admission.mjs
+++ b/lib/mcp-qa-cloud-lifecycle-admission.mjs
@@ -1,32 +1,33 @@
 import {createHash} from 'node:crypto';
 const states=new WeakMap(),denials=new WeakSet();
 const lifecycleKind=Object.freeze({purpose:'afw.qa-closed-lifecycle-command.v1',prefix:'/afw-qa-deploy-observe-restore v1 ',claimPurpose:'afw.qa-closed-lifecycle-claim.v1'});
+const finiteKind=Object.freeze({purpose:'afw.qa-finite-confirmation-command.v1',prefix:'/afw-qa-finite-confirmation v1 ',claimPurpose:'afw.qa-finite-confirmation-claim.v1',maximumAge:480000});
 const nativeKind=Object.freeze({purpose:'afw.qa-native-observation-command.v1',prefix:'/afw-qa-native-observe-restore v1 ',claimPurpose:'afw.qa-native-observation-claim.v1'});
 /** HTTP header safety/budget only. GitHub validates opaque credentials; no token-format identity. */
 export function isQaGithubBearerTransportValue(value){return typeof value==='string'&&value.length>0&&value.length<=8192&&!/[^\x21-\x7e]/.test(value);}
 const fail=()=>{const error=Error('Closed QA lifecycle admission unavailable');denials.add(error);throw error;};
 /** Diagnostic identity only; never reads attacker-controlled exception properties. */
 export function isQaLifecycleAdmissionDenial(error){return denials.has(error);}
 function own(v,k){if(!v||Object.getPrototypeOf(v)!==Object.prototype)fail();const d=Object.getOwnPropertyDescriptor(v,k);if(!d?.enumerable||!Object.hasOwn(d,'value'))fail();return d.value;}
 function exact(v,keys){if(!v||Reflect.ownKeys(v).length!==keys.length)fail();return Object.fromEntries(keys.map(k=>[k,own(v,k)]));}
 const actor=v=>own(v,'id')===290715446&&own(v,'login')==='tokenizartinfo-ops'&&own(v,'type')==='User';
 /** Private fixed-kind parser. No exported caller-selectable prefix or purpose. */
 function parseCommand(options,kind){
  const {event,context,now}=exact(options,['event','context','now']);if(typeof now!=='function')fail();
  const c=exact(context,['repository','repositoryId','ref','eventName','runId','runAttempt','sourceRevision']),at=now();
  if(!Number.isSafeInteger(at)||at<0||c.repository!=='tokenizartinfo-ops/agent-friendly-web'||c.repositoryId!=='1347578006'||c.ref!=='refs/heads/main'||c.eventName!=='issue_comment'||c.runAttempt!=='1'||typeof c.runId!=='string'||!/^[1-9][0-9]{0,19}$/.test(c.runId)||typeof c.sourceRevision!=='string'||!/^[a-f0-9]{40}$/.test(c.sourceRevision))fail();
  if(own(event,'action')!=='created')fail();
  const repo=own(event,'repository'),issue=own(event,'issue'),comment=own(event,'comment'),sender=own(event,'sender');
  if(own(repo,'id')!==1347578006||own(repo,'full_name')!==c.repository||own(issue,'number')!==497||Object.hasOwn(issue,'pull_request')||!actor(own(comment,'user'))||!actor(sender)||own(comment,'author_association')!=='OWNER')fail();
  const id=own(comment,'id'),body=own(comment,'body'),rawDate=own(comment,'created_at'),created=typeof rawDate==='string'?Date.parse(rawDate):NaN;
- if(!Number.isSafeInteger(id)||id<1||body!==kind.prefix+c.sourceRevision||!Number.isSafeInteger(created)||created<0||created>at||at-created>=300000)fail();
+ if(!Number.isSafeInteger(id)||id<1||body!==kind.prefix+c.sourceRevision||!Number.isSafeInteger(created)||created<0||created>at||at-created>=(kind.maximumAge??300000))fail();
  const expiresAt=created+300000,cleanupExpiresAt=expiresAt+180000;
  const intentId=createHash('sha256').update(kind.purpose+'\n1347578006\n'+id+'\n'+c.sourceRevision+'\n'+created).digest('hex');
  return {now,metadata:{purpose:kind.purpose,sourceRevision:c.sourceRevision,commentId:String(id),runId:c.runId,createdAt:created,admittedAt:at,expiresAt,cleanupExpiresAt,intentId,readOnly:false,authorizesEffects:false,operationalReadiness:false,mayRetry:false}};
 }
 function admitCommand(options,kind){
  const mono=performance.now(),{metadata,now}=parseCommand(options,kind);if(!Number.isFinite(mono)||mono<0)fail();
  const admission=Object.freeze(metadata),{admittedAt:at,expiresAt,cleanupExpiresAt}=metadata;
  states.set(admission,{kind,now,wall:at,mono,origin:mono,nominalEnd:mono+(expiresAt-at),cleanupEnd:mono+(cleanupExpiresAt-at),poisoned:false,claimStarted:false,claimAck:false});
  return admission;
 }
@@ -81,10 +82,16 @@
    if(own(v,'ref')!==ref||own(own(v,'object'),'type')!=='commit'||own(own(v,'object'),'sha')!==admission.sourceRevision)fail();
    return true;
   };
   await Promise.race([work(),stopped]);check();s.claimAck=true;
   return Object.freeze({purpose:kind.claimPurpose,intentId:admission.intentId,sourceRevision:admission.sourceRevision,commentId:admission.commentId,claimed:true,authorizesEffects:false,operationalReadiness:false,mayRetry:false});
  }catch{fail();}
  finally{clearTimeout(timer);abort.abort();if(reader)void reader.cancel().catch(()=>{});}
 }
 export function claimQaLifecycleOnce(options){return claimOnce(options,lifecycleKind);}
 export function claimQaNativeObservationOnce(options){return claimOnce(options,nativeKind);}
+
+/** New exact command domain; old closed-only command/claims remain unchanged. */
+export function validateQaFiniteConfirmationCommand(options){return admitCommand(options,finiteKind);}
+export function assertQaFiniteConfirmationAdmission(admission,phase='nominal'){
+ if(states.get(admission)?.kind!==finiteKind)fail();return assertQaLifecycleWindow(admission,phase,phase==='nominal'?180000:0);
+}

~~~~~~~~~~

## lib/mcp-release-operator-policy.mjs

~~~~~~~~~~diff
diff --git a/lib/mcp-release-operator-policy.mjs b/lib/mcp-release-operator-policy.mjs
--- a/lib/mcp-release-operator-policy.mjs
+++ b/lib/mcp-release-operator-policy.mjs
@@ -1,31 +1,31 @@
 import {createHash} from 'node:crypto';
-import {activationConfigurationHash} from './mcp-activation-observer.mjs';
+import {activationConfigurationHash,finiteActivationConfigurationHash} from './mcp-activation-observer.mjs';
 import {resolveSuccessorPreparation} from './mcp-successor-manifest.mjs';
 import {prepareKnownCancellationHistory} from './mcp-successor-cancellation-history.mjs';
 export const RELEASE_TARGET=Object.freeze({accountId:'85d0d5dadac3341a564f22ce885e9eec',workerName:'agent-friendly-web-delegated-canary',namespaceId:'d6fc71552de7494a863aca20365a572d',databaseId:'6a728254-1494-4039-802e-b39288a55fcc',kvId:'6b94ff702e504e14a7730cee73a0f6ff'});
 const fail=()=>{throw Error('Release operator plan unavailable');};
 const exact=(v,keys)=>{if(!v||Object.getPrototypeOf(v)!==Object.prototype||Reflect.ownKeys(v).length!==keys.length||keys.some(k=>{const d=Object.getOwnPropertyDescriptor(v,k);return !d?.enumerable||!Object.hasOwn(d,'value');}))fail();};
 const hex=(v,n)=>typeof v==='string'&&new RegExp('^[a-f0-9]{'+n+'}$').test(v);
 const uuid=v=>typeof v==='string'&&/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/.test(v);
-export function validateReleaseOperatorBundle(bundle){
+function validateBundle(bundle,configurationHashFor,finiteOnly){
  exact(bundle,['artifact','policy']);const a=bundle.artifact,p=bundle.policy;
  exact(a,['script','sourceRevision','sourceTree','programHash','workerHash','sourceCheck']);
  if(typeof a.script!=='string'||!a.script.length||Buffer.byteLength(a.script)>2097152||!hex(a.sourceRevision,40)||!hex(a.sourceTree,40)||!hex(a.programHash,64)||!hex(a.workerHash,64)||a.sourceCheck!=='git-inputs-before-after-v1'||createHash('sha256').update(a.script).digest('hex')!==a.workerHash)fail();
- const operation=p&&Object.getOwnPropertyDescriptor(p,'operation');if(!operation||!Object.hasOwn(operation,'value')||!['publish','confirm','confirm_named'].includes(operation.value))fail();exact(p,operation.value==='publish'?['operation','startAt','expiresAt','pins']:['operation','startAt','expiresAt','plan','observation']);
+ const operation=p&&Object.getOwnPropertyDescriptor(p,'operation');if(!operation||!Object.hasOwn(operation,'value')||!['publish','confirm','confirm_named'].includes(operation.value)||finiteOnly&&operation.value!=='confirm_named')fail();exact(p,operation.value==='publish'?['operation','startAt','expiresAt','pins']:['operation','startAt','expiresAt','plan','observation']);
  if(!Number.isSafeInteger(p.startAt)||p.startAt<0||!Number.isSafeInteger(p.expiresAt)||p.expiresAt<=p.startAt||p.expiresAt-p.startAt>600000)fail();
  if(p.operation==='publish'){
   exact(p.pins,[...Object.keys(RELEASE_TARGET),'baseVersionId']);if(Object.entries(RELEASE_TARGET).some(([k,v])=>p.pins[k]!==v)||!uuid(p.pins.baseVersionId))fail();
  }else{
   const q=p.plan,o=p.observation,hashes=['activationKey','artifactKey','trialId',...(p.operation==='confirm'?['scopeHash']:[]),'configurationHash'];exact(q,[...hashes,'startAt','expiresAt']);
   if(hashes.some(k=>!hex(q[k],64))||q.startAt!==p.startAt||q.expiresAt!==p.expiresAt)fail();
-  exact(o,['versionId','deploymentId','namespaceId','applicationId','configuration']);if(!uuid(o.versionId)||!uuid(o.deploymentId)||o.namespaceId!==RELEASE_TARGET.namespaceId||o.applicationId!==RELEASE_TARGET.namespaceId||activationConfigurationHash(o.configuration)!==q.configurationHash)fail();
+  exact(o,['versionId','deploymentId','namespaceId','applicationId','configuration']);if(!uuid(o.versionId)||!uuid(o.deploymentId)||o.namespaceId!==RELEASE_TARGET.namespaceId||o.applicationId!==RELEASE_TARGET.namespaceId||configurationHashFor(o.configuration)!==q.configurationHash)fail();
   const db=o.configuration.bindings.find(b=>b.name==='DB'),node=o.configuration.bindings.find(b=>b.name==='AFW_DOSSIER_EVENTS_NODE'),kv=o.configuration.bindings.find(b=>b.name==='OAUTH_KV');
   if(db?.type!=='d1'||db.id!==RELEASE_TARGET.databaseId||node?.type!=='durable_object_namespace'||node.namespace_id!==RELEASE_TARGET.namespaceId||kv?.type!=='kv_namespace'||kv.namespace_id!==RELEASE_TARGET.kvId)fail();
   if(q.artifactKey!==createHash('sha256').update(JSON.stringify([RELEASE_TARGET.accountId,RELEASE_TARGET.workerName,a.workerHash])).digest('hex'))fail();
   if(p.operation==='confirm_named')readNamedManifest(bundle);
  }
  return true;
 }
 
 function readNamedManifest({artifact:a,policy:p}){
  const bindings=p.observation.configuration.bindings,text=name=>{const b=bindings.find(b=>b.name===name);if(b?.type!=='plain_text'||typeof b.text!=='string')fail();return b.text;};
@@ -36,28 +36,35 @@
  const eventRaw=text('AFW_DOSSIER_EVENTS_POLICY');if(eventRaw.length>4096)fail();const events=JSON.parse(eventRaw);
  exact(events,['grantId','subject','projectId','clientId','resource','startAt','expiresAt']);
  if(['grantId','subject','projectId','clientId','resource'].some(k=>typeof events[k]!=='string'||!events[k].length||events[k].length>200||events[k].trim()!==events[k])||events.startAt!==q.startAt||events.expiresAt!==q.expiresAt||events.resource!==s.resource||events.resource!==text('AFW_OAUTH_RESOURCE')||events.resource!==text('AFW_OAUTH_ISSUER')+'/mcp'||events.clientId!==text('AFW_OAUTH_PILOT_CLIENT_ID')||events.projectId!==text('AFW_OAUTH_PILOT_PROJECT_ID'))fail();
  exact(s,['accountId','workerName','namespaceId','applicationId','ownerRef','projectRef','resource']);exact(o,['containerId','applicationId','programHash','sourceRevision']);exact(c,['trialId','programHash','sourceRevision','startAt','expiresAt','budget']);exact(r,['artifactKey','workerHash','activationKey']);
  if(s.accountId!==RELEASE_TARGET.accountId||s.workerName!==RELEASE_TARGET.workerName||s.namespaceId!==RELEASE_TARGET.namespaceId||s.applicationId!==RELEASE_TARGET.namespaceId||s.resource!=='https://delegated-canary.agentfriendlyweb.dev/mcp'||!hex(s.ownerRef,64)||!hex(s.projectRef,64)||o.applicationId!==s.applicationId||!hex(o.containerId,64)||!hex(o.programHash,64)||!hex(o.sourceRevision,40)||c.trialId!==q.trialId||c.programHash!==a.programHash||c.sourceRevision!==a.sourceRevision||c.startAt!==q.startAt||c.expiresAt!==q.expiresAt||c.budget!==1||r.artifactKey!==q.artifactKey||r.workerHash!==a.workerHash||r.activationKey!==q.activationKey)fail();
  return m;
 }
 
 /** Private operator only: same remote binding, pure identity resolution.
  * Never calls get, starts an actor or changes the caller's approved bundle. */
-export function resolveNamedActivationPlan(bundle,namespace){
- validateReleaseOperatorBundle(bundle);if(bundle.policy.operation!=='confirm_named')fail();
+function resolvePlan(bundle,namespace,validate){
+ validate(bundle);if(bundle.policy.operation!=='confirm_named')fail();
  const m=readNamedManifest(bundle),idFromName=namespace?.idFromName,idFromString=namespace?.idFromString;
  if(typeof idFromName!=='function'||typeof idFromString!=='function')fail();
  const resolved=resolveSuccessorPreparation({scope:m.scope,original:m.original,candidate:m.candidate,namespace});
  const current=()=>{if(namespace.idFromName!==idFromName||namespace.idFromString!==idFromString||namespace.idFromName('afw-own-event-one-occurrence-v1').toString()!==m.original.containerId||namespace.idFromName('afw-own-event-first-successor-v1').toString()!==resolved.candidate.containerId||namespace.idFromString(resolved.candidate.containerId).toString()!==resolved.candidate.containerId)fail();};current();
  return Object.freeze({plan:Object.freeze({...bundle.policy.plan,scopeHash:resolved.candidate.scopeHash}),current});
 }
 
 /** Private server input only. A same-scope grant is not interchangeable with
  * the exact grant captured by the named bundle. Does not read D1 or authorize. */
-export function validateNamedCancellationHistory(bundle,raw){
- validateReleaseOperatorBundle(bundle);if(bundle.policy.operation!=='confirm_named')fail();
+function validateHistory(bundle,raw,validate){
+ validate(bundle);if(bundle.policy.operation!=='confirm_named')fail();
  prepareKnownCancellationHistory(raw,bundle.policy.plan);
  const binding=bundle.policy.observation.configuration.bindings.find(b=>b.name==='AFW_DOSSIER_EVENTS_POLICY');
  if(JSON.parse(raw).currentGrant.grantId!==JSON.parse(binding.text).grantId)fail();
  return true;
 }
+
+export function validateReleaseOperatorBundle(bundle){return validateBundle(bundle,activationConfigurationHash,false);}
+export function validateFiniteReleaseOperatorBundle(bundle){try{return validateBundle(bundle,finiteActivationConfigurationHash,true);}catch{fail();}}
+export function resolveNamedActivationPlan(bundle,namespace){return resolvePlan(bundle,namespace,validateReleaseOperatorBundle);}
+export function resolveFiniteNamedActivationPlan(bundle,namespace){return resolvePlan(bundle,namespace,validateFiniteReleaseOperatorBundle);}
+export function validateNamedCancellationHistory(bundle,raw){return validateHistory(bundle,raw,validateReleaseOperatorBundle);}
+export function validateFiniteNamedCancellationHistory(bundle,raw){return validateHistory(bundle,raw,validateFiniteReleaseOperatorBundle);}

~~~~~~~~~~

## lib/mcp-release-runtime.mjs

~~~~~~~~~~diff
diff --git a/lib/mcp-release-runtime.mjs b/lib/mcp-release-runtime.mjs
--- a/lib/mcp-release-runtime.mjs
+++ b/lib/mcp-release-runtime.mjs
@@ -1,20 +1,25 @@
 import {createHash} from 'node:crypto';
 import {checkOwnCronProvider} from '../scripts/check-own-cron-provider.mjs';
 import {createClosedPublication} from './mcp-closed-publication.mjs';
 import {createActivationJournal} from './mcp-activation-journal.mjs';
-import {createActivationObserver} from './mcp-activation-observer.mjs';
-import {validateReleaseOperatorBundle,validateNamedCancellationHistory,resolveNamedActivationPlan,RELEASE_TARGET} from './mcp-release-operator-policy.mjs';
-import {reserveReleaseSuccessor} from './mcp-release-successor-reservation.mjs';
+import {createActivationObserver,createFiniteActivationObserver} from './mcp-activation-observer.mjs';
+import {validateReleaseOperatorBundle,validateNamedCancellationHistory,resolveNamedActivationPlan,validateFiniteReleaseOperatorBundle,validateFiniteNamedCancellationHistory,resolveFiniteNamedActivationPlan,RELEASE_TARGET} from './mcp-release-operator-policy.mjs';
+import {reserveReleaseSuccessor,reserveFiniteReleaseSuccessor} from './mcp-release-successor-reservation.mjs';
 import {resolveSuccessorPreparation} from './mcp-successor-manifest.mjs';
 import {createPrivateQaNamedEligibility} from './mcp-qa-named-eligibility.mjs';
 
+// Fixed module-private selections only. Callers cannot supply or discover a
+// strategy, and legacy entrypoints never probe for finite compatibility.
+const LEGACY_RELEASE=Object.freeze({validateBundle:validateReleaseOperatorBundle,validateHistory:validateNamedCancellationHistory,resolvePlan:resolveNamedActivationPlan,createObserver:createActivationObserver,reserve:reserveReleaseSuccessor});
+const FINITE_RELEASE=Object.freeze({validateBundle:validateFiniteReleaseOperatorBundle,validateHistory:validateFiniteNamedCancellationHistory,resolvePlan:resolveFiniteNamedActivationPlan,createObserver:createFiniteActivationObserver,reserve:reserveFiniteReleaseSuccessor});
+
 // Workflow-local last point only: never an authority decision or a cause.
 function namedObservation(policy){
  const stages=['unknown','workflow_admitted','provider_check','operator_admission','named_plan','publication_lookup','activation_journal','activation_observation','artifact_modules','artifact_legacy','activation_metadata','deployment_first','deployment_version','deployment_application','deployment_second','provider_get','activation_observed','journal_complete','successor_retirement','successor_admission','successor_manifest','successor_reader','successor_reservation','successor_custody','successor_custody_returned','successor_custody_value','successor_custody_prototype','successor_custody_keys','successor_custody_fields','successor_custody_future','successor_custody_identity','successor_custody_checked','successor_primary','successor_reserved','workflow_result'];
  const root='https://api.cloudflare.com/client/v4/accounts/'+RELEASE_TARGET.accountId,worker=RELEASE_TARGET.workerName,version=policy.observation.versionId;
  const routes={modules:root+'/workers/workers/'+worker+'/versions/'+version+'?include=modules',legacy:root+'/workers/scripts/'+worker+'/versions/'+version,metadata:root+'/workers/workers/'+worker+'/versions/'+version,deployments:root+'/workers/scripts/'+worker+'/deployments',application:root+'/containers/applications/'+policy.observation.applicationId};
  let value={stage:'workflow_admitted',getIndex:0,httpCode:null,durationMs:null},generation=0,legacy=0,active=0,getCount=0;
  const point=(stage,detail)=>{try{
    generation++;let custodyClock;
    if(stage==='successor_custody_future'){
     const remoteObservedAt=detail?.remoteObservedAt,receivedAt=detail?.receivedAt;
@@ -32,80 +37,84 @@
   after(ticket,response){try{
    if(!ticket||ticket.generation!==generation)return;
    const code=response?.status,elapsed=performance.now()-ticket.started;
    value.httpCode=Number.isSafeInteger(code)&&code>=100&&code<=599?code:null;
    value.durationMs=Number.isFinite(elapsed)&&elapsed>=0&&elapsed<=70000?Math.floor(elapsed):null;
   }catch{/* No response data escapes. */}},
   snapshot(){return {...value};}
  };
 }
 export async function runReleaseOperator(bundle,env,args,lease,observation,authorize,cancellationHistory){
+ return runReleaseOperatorImpl(LEGACY_RELEASE,bundle,env,args,lease,observation,authorize,cancellationHistory);
+}
+async function runReleaseOperatorImpl(profile,bundle,env,args,lease,observation,authorize,cancellationHistory){
   const fail=()=>{throw Error('Release operator unavailable');};
   let timer;
   const controller=new AbortController();
   try{
    observation?.point('operator_admission');
    if(args.length!==1||typeof args[0]!=='string'||env.AFW_RELEASE_OPERATOR_ENABLED!=='true'||![undefined,'false','true'].includes(env.AFW_RELEASE_RESERVATION_WORKFLOW_ENABLED)||env.AFW_RELEASE_RESERVATION_WORKFLOW_ENABLED==='true'&&lease?.reserveSuccessor!==true)fail();
-   validateReleaseOperatorBundle(bundle);
+   profile.validateBundle(bundle);
    if(authorize!==undefined&&(typeof authorize!=='function'||bundle.policy.operation!=='confirm_named'))fail();
-   if(cancellationHistory!==undefined){if(typeof authorize!=='function'||env.AFW_RELEASE_RESERVATION_WORKFLOW_ENABLED!=='true'||lease?.reserveSuccessor!==true)fail();validateNamedCancellationHistory(bundle,cancellationHistory);}
+   if(cancellationHistory!==undefined){if(typeof authorize!=='function'||env.AFW_RELEASE_RESERVATION_WORKFLOW_ENABLED!=='true'||lease?.reserveSuccessor!==true)fail();profile.validateHistory(bundle,cancellationHistory);}
    if(args[0]!==createHash('sha256').update(JSON.stringify(bundle)).digest('hex'))fail();
    const {artifact,policy}=bundle;
    let named;const namespace=env.AFW_RELEASE_EVENTS_NODE;
    const check=()=>{const now=Date.now();if(env.AFW_RELEASE_OPERATOR_ENABLED!=='true'||controller.signal.aborted||now<policy.startAt||now>=policy.expiresAt||lease&&!lease.current())fail();if(named){if(env.AFW_RELEASE_EVENTS_NODE!==namespace)fail();named.current();}return now;};
    const remaining=()=>Math.min(policy.expiresAt-Date.now(),lease?lease.remaining():Infinity);
    check();timer=setTimeout(()=>controller.abort(),remaining());
-   if(policy.operation==='confirm_named'){observation?.point('named_plan');named=resolveNamedActivationPlan(bundle,namespace);}
+   if(policy.operation==='confirm_named'){observation?.point('named_plan');named=profile.resolvePlan(bundle,namespace);}
    const db=env.RELEASE_DB;if(!db?.withSession)fail();
    const readCredential=async()=>{check();if(authorize){if(await authorize('operator_credential',controller.signal)!==true)fail();check();}const value=env[policy.operation==='publish'?'AFW_RELEASE_PUBLISH_TOKEN':'AFW_RELEASE_READ_TOKEN'];if(typeof value!=='string'||!/^[-A-Za-z0-9_]{16,4096}$/.test(value))fail();return value;};
    await readCredential();check();
    // All provider requests remain under the same finite operator window.
    const fetchImpl=async(url,init)=>{check();const ticket=observation?.before(url,init);let result;try{result=await fetch(url,init);}finally{observation?.after(ticket,result);}check();return result;};
    if(policy.operation==='publish'){
     const result=await createClosedPublication({db,artifact,pins:policy.pins,readCredential,fetchImpl,now:lease?check:undefined,timeoutMs:Math.min(60000,remaining())}).publish(controller.signal);
     check();return result;
    }
    // Do not confirm a receipt for a different build or administrative target.
    observation?.point('publication_lookup');
    if(authorize){if(await authorize('operator_primary_read',controller.signal)!==true)fail();check();}
    const row=await db.withSession('first-primary').prepare('SELECT account_id,worker_name,source_revision,source_tree,program_hash,worker_hash FROM dossier_publication_attempts WHERE artifact_key=?').bind(policy.plan.artifactKey).first();check();
    if(authorize){if(await authorize('operator_primary_result',controller.signal)!==true)fail();check();}
    if(!row||row.account_id!==RELEASE_TARGET.accountId||row.worker_name!==RELEASE_TARGET.workerName||row.source_revision!==artifact.sourceRevision||row.source_tree!==artifact.sourceTree||row.program_hash!==artifact.programHash||row.worker_hash!==artifact.workerHash)fail();
    const expectedKey=createHash('sha256').update(JSON.stringify([row.account_id,row.worker_name,row.worker_hash])).digest('hex');if(expectedKey!==policy.plan.artifactKey)fail();
-   const reader=createActivationObserver({...policy.observation,readCredential,fetchImpl});
+   const reader=profile.createObserver({...policy.observation,readCredential,fetchImpl});
    const observe=async(...args)=>{check();observation?.point('activation_observation');const result=await reader(...args);observation?.point('activation_observed');check();return result;};
    observation?.point('activation_journal');
    const result=await createActivationJournal({db,plan:named?.plan??policy.plan,observe,now:lease?check:undefined,timeoutMs:Math.min(20000,remaining()),authorize}).confirm(controller.signal);
    observation?.point('journal_complete');check();
    if(lease?.reserveSuccessor===true){
     observation?.point('successor_retirement');
-    const reservation=await reserveReleaseSuccessor({bundle,env,namespace,readCredential,fetchImpl,now:check,signal:controller.signal,observation,authorize,cancellationHistory});
+    const reservation=await profile.reserve({bundle,env,namespace,readCredential,fetchImpl,now:check,signal:controller.signal,observation,authorize,cancellationHistory});
     observation?.point('successor_reserved');check();return {...result,reservation};
    }
    return result;
   }catch{fail();}finally{clearTimeout(timer);controller.abort();}
 }
-export async function runReleaseWorkflow(options){
+export async function runReleaseWorkflow(options){return runReleaseWorkflowImpl(LEGACY_RELEASE,options);}
+async function runReleaseWorkflowImpl(profile,options){
  const {bundle,env,event,step,authorize,cancellationHistory,requestLease}=options;
  const suppliedLease=Object.hasOwn(options,'requestLease');let leaseCurrent,leaseRemaining;
  let policy,expectedHash,observation,providerCheck,reservationFlag,reserveSuccessor=false;
   const outcome=status=>({status,mayRetry:false,operationalReadiness:false,...(status==='uncertain'&&observation?{observation:observation.snapshot()}:{}),...(status==='blocked'&&providerCheck?{providerCheck}:{})});
   try{
    if(suppliedLease){if(!knownRequestLeases.has(requestLease)||!Object.isFrozen(requestLease))return outcome('blocked');leaseCurrent=requestLease.current;leaseRemaining=requestLease.remaining;if(typeof leaseCurrent!=='function'||typeof leaseRemaining!=='function')return outcome('blocked');}
    if(env.AFW_RELEASE_OPERATOR_ENABLED!=='true'||env.AFW_RELEASE_WORKFLOW_ENABLED!=='true')return outcome('blocked');
-   validateReleaseOperatorBundle(bundle);policy=bundle.policy;
+   profile.validateBundle(bundle);policy=bundle.policy;
    if(authorize!==undefined&&(typeof authorize!=='function'||policy.operation!=='confirm_named'))return outcome('blocked');
    reservationFlag=env.AFW_RELEASE_RESERVATION_WORKFLOW_ENABLED;
    if(![undefined,'false','true'].includes(reservationFlag))return outcome('blocked');
    reserveSuccessor=reservationFlag==='true';
    if(reserveSuccessor&&policy.operation!=='confirm_named')return outcome('blocked');
-   if(cancellationHistory!==undefined){if(!reserveSuccessor||typeof authorize!=='function')return outcome('blocked');validateNamedCancellationHistory(bundle,cancellationHistory);}
+   if(cancellationHistory!==undefined){if(!reserveSuccessor||typeof authorize!=='function')return outcome('blocked');profile.validateHistory(bundle,cancellationHistory);}
    expectedHash=createHash('sha256').update(JSON.stringify(bundle)).digest('hex');
    const rawPayload=event?.payload;
    const payload=typeof rawPayload==='string'&&rawPayload===JSON.stringify({planHash:expectedHash})?{planHash:expectedHash}:rawPayload;
    if(policy.operation!=='publish'&&(policy.operation!=='confirm_named'||env.AFW_RELEASE_CONFIRMATION_WORKFLOW_ENABLED!=='true')||event?.schedule!==undefined||event?.instanceId!=='afw-release-'+expectedHash||!payload||Object.getPrototypeOf(payload)!==Object.prototype||Reflect.ownKeys(payload).length!==1||!Object.hasOwn(payload,'planHash')||payload.planHash!==expectedHash)return outcome('blocked');
   }catch{return outcome('blocked');}
   const admittedAt=Date.now(),admittedMono=performance.now(),monotonicEnd=admittedMono+(policy.expiresAt-admittedAt);
   let lastWall=admittedAt,lastMono=admittedMono;
   const current=()=>{try{const now=Date.now(),mono=performance.now();if(suppliedLease&&(!knownRequestLeases.has(requestLease)||requestLease.current!==leaseCurrent||requestLease.remaining!==leaseRemaining||!leaseCurrent())||env.AFW_RELEASE_RESERVATION_WORKFLOW_ENABLED!==reservationFlag||env.AFW_RELEASE_OPERATOR_ENABLED!=='true'||env.AFW_RELEASE_WORKFLOW_ENABLED!=='true'||policy.operation==='confirm_named'&&env.AFW_RELEASE_CONFIRMATION_WORKFLOW_ENABLED!=='true'||!Number.isSafeInteger(now)||!Number.isFinite(mono)||mono<lastMono||mono>=monotonicEnd||now<lastWall||now<policy.startAt||now>=policy.expiresAt)return false;lastWall=now;lastMono=mono;return true;}catch{return false;}};
   const remaining=()=>Math.max(1,Math.floor(Math.min(policy.expiresAt-Date.now(),monotonicEnd-performance.now(),suppliedLease?leaseRemaining():Infinity)));
   if(!current())return outcome('blocked');
@@ -122,21 +131,21 @@
     if(!current())return outcome('blocked');
     observation?.point('provider_check');
     const gate=await checkOwnCronProvider({fetchImpl:(url,init)=>fetch(url,{...init,redirect:'manual'}),timeoutMs:Math.min(5000,remaining()),dependencyProfile:policy.operation==='publish'?'prebuilt-closed-publication':'all-workers'});
     if(!current())return outcome('blocked');
     if(gate.providerGate!=='resolved'||gate.mayRunClosedVerification!==true){
      const reasons=['invalid_input','invalid_snapshot','active_cron_incident','active_related_incident','request_failed','deadline_exceeded','http_status','unexpected_response_url','unexpected_content_type','body_unavailable','body_read_failed','body_too_large','invalid_utf8','invalid_json'];
      providerCheck={providerGate:['unknown','blocked'].includes(gate.providerGate)?gate.providerGate:'unknown',reason:reasons.includes(gate.reason)?gate.reason:'invalid_snapshot',httpStatus:Number.isSafeInteger(gate.httpStatus)&&gate.httpStatus>=100&&gate.httpStatus<=599?gate.httpStatus:null,receivedBytes:Number.isSafeInteger(gate.receivedBytes)&&gate.receivedBytes>=0&&gate.receivedBytes<=262145?gate.receivedBytes:null};
      return outcome('blocked');
     }
     try{
-     const result=await runReleaseOperator(bundle,env,[expectedHash],{current,remaining,reserveSuccessor},observation,authorize,cancellationHistory);
+     const result=await runReleaseOperatorImpl(profile,bundle,env,[expectedHash],{current,remaining,reserveSuccessor},observation,authorize,cancellationHistory);
      observation?.point('workflow_result');
      if(!current())return outcome('uncertain');
      if(policy.operation==='confirm_named'){
       if(result?.mayLaunch!==false||result.activationKey!==policy.plan.activationKey||result.versionId!==policy.observation.versionId||result.deploymentId!==policy.observation.deploymentId||!Number.isSafeInteger(result.confirmedAt)||result.confirmedAt<policy.startAt||result.confirmedAt>=policy.expiresAt||result.confirmedAt>Date.now())return outcome('uncertain');
       if(reserveSuccessor){const r=result.reservation;if(!r||Object.getPrototypeOf(r)!==Object.prototype||Reflect.ownKeys(r).length!==4||r.purpose!=='afw.successor-reservation.v1'||r.trialId!==policy.plan.trialId||r.state!=='prepared'||r.mayBoot!==false)return outcome('uncertain');}
       return {...outcome('confirmed'),receipt:{activationKey:result.activationKey,versionId:result.versionId,deploymentId:result.deploymentId},...(reserveSuccessor?{reservation:result.reservation}:{})};
      }
      if(result?.mayDeploy!==false||typeof result.artifactKey!=='string'||!/^[a-f0-9]{64}$/.test(result.artifactKey)||typeof result.versionId!=='string'||!/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/.test(result.versionId))return outcome('uncertain');
      return {...outcome('confirmed'),receipt:{artifactKey:result.artifactKey,versionId:result.versionId}};
     }catch{return outcome('uncertain');}
@@ -156,36 +165,38 @@
  const copy={};for(const key of keys){const d=Object.getOwnPropertyDescriptor(value,key);if(!d?.enumerable||!Object.hasOwn(d,'value'))knownFail();copy[key]=d.value;}return copy;
 }
 const knownTime=x=>Number.isSafeInteger(x)&&x>=0&&x<=8640000000000000;
 const originalProjection="SELECT a.grant_id,a.process_generation,z.closed_at,a.user_id,a.project_id,a.client_id,a.resource FROM dossier_node_process_admissions a JOIN dossier_node_process_closures z ON z.grant_id=a.grant_id AND z.container_id=a.container_id AND z.process_generation=a.process_generation AND z.program_hash=a.program_hash AND z.source_revision=a.source_revision AND z.image=a.image WHERE a.container_id=? AND a.program_hash=? AND a.source_revision=? AND a.image=? LIMIT 2";
 const currentProjection="SELECT g.id AS grant_id,g.user_id,g.project_id,g.client_id,g.resource,m.user_id AS monitor_user_id,m.project_id AS monitor_project_id,m.client_id AS monitor_client_id,m.resource AS monitor_resource,m.sequence AS consent_sequence,m.revision AS consent_revision,m.issued_at,m.expires_at FROM delegated_access_grants g LEFT JOIN dossier_monitoring_consent_events m ON m.grant_id=g.id AND m.sequence=(SELECT MAX(sequence) FROM dossier_monitoring_consent_events WHERE grant_id=g.id) WHERE g.id=? LIMIT 2";
 // LEFT JOIN and no identity filter: missing/foreign joins remain visible and deny.
 const cancellationsProjection="SELECT z.grant_id,z.container_id,z.program_hash,z.source_revision,z.image,z.closed_at,g.revoked_at,g.user_id,g.project_id,g.client_id,g.resource,m.user_id AS monitor_user_id,m.project_id AS monitor_project_id,m.client_id AS monitor_client_id,m.resource AS monitor_resource,m.sequence AS monitor_sequence,m.revision AS monitor_revision,m.issued_at AS monitor_revoked_at FROM dossier_node_process_closures z LEFT JOIN delegated_access_grants g ON g.id=z.grant_id LEFT JOIN dossier_monitoring_consent_events m ON m.grant_id=g.id AND m.sequence=(SELECT MAX(sequence) FROM dossier_monitoring_consent_events WHERE grant_id=g.id) WHERE z.process_generation IS NULL ORDER BY z.grant_id,z.container_id,z.closed_at LIMIT 9";
 /** Trusted administrative host only; no HTTP/RPC/OAuth authority is manufactured.
  * Primary data is private. The existing complete reader and atomic INSERT fence
  * remain decisive; late remote work is uncertain, never claimed cancelled. */
-export async function runKnownCancellationReleaseWorkflow(options){
+export async function runKnownCancellationReleaseWorkflow(options){return runKnownCancellationReleaseWorkflowImpl(LEGACY_RELEASE,options);}
+export async function runFiniteKnownCancellationReleaseWorkflow(options){return runKnownCancellationReleaseWorkflowImpl(FINITE_RELEASE,options);}
+async function runKnownCancellationReleaseWorkflowImpl(profile,options){
  const outcome=status=>({status,mayRetry:false,operationalReadiness:false});
  let requestLease,timer,handedOff=false,valid=true;
  const parent=new AbortController();
  const invalidate=()=>{valid=false;parent.abort();};
  try{
   const {bundle:inputBundle,env,event,step}=knownFields(options,['bundle','env','event','step']);
   const entered=Date.now(),mono=performance.now();
-  validateReleaseOperatorBundle(inputBundle);
+  profile.validateBundle(inputBundle);
   const bundle=JSON.parse(JSON.stringify(inputBundle)),policy=bundle.policy;
   if(policy.operation!=='confirm_named')knownFail();
   const flags=['AFW_RELEASE_OPERATOR_ENABLED','AFW_RELEASE_WORKFLOW_ENABLED','AFW_RELEASE_CONFIRMATION_WORKFLOW_ENABLED','AFW_RELEASE_RESERVATION_WORKFLOW_ENABLED'];
   if(flags.some(k=>env[k]!=='true'))knownFail();
   const namespace=env.AFW_RELEASE_EVENTS_NODE,db=env.RELEASE_DB,withSession=db?.withSession,ordinaryPrepare=db?.prepare,get=namespace?.get;
   if(typeof withSession!=='function'||typeof ordinaryPrepare!=='function'||typeof get!=='function')knownFail();
-  const named=resolveNamedActivationPlan(bundle,namespace),stepDo=step?.do;
+  const named=profile.resolvePlan(bundle,namespace),stepDo=step?.do;
   if(typeof stepDo!=='function')knownFail();
   const expectedHash=createHash('sha256').update(JSON.stringify(bundle)).digest('hex');
   const timestamp=event?.timestamp,eventAt=Reflect.apply(nativeDateTime,timestamp,[]),payload=event?.payload,instanceId=event?.instanceId;
   const payloadCurrent=()=>typeof payload==='string'?payload===JSON.stringify({planHash:expectedHash}):knownFields(payload,['planHash']).planHash===expectedHash;
   if(!knownTime(entered)||!Number.isFinite(mono)||mono<0||!knownTime(eventAt)||eventAt>entered||event?.schedule!==undefined||instanceId!=='afw-release-'+expectedHash||!payloadCurrent())knownFail();
   const end=Math.min(policy.expiresAt,eventAt+70000),monoEnd=mono+(end-entered);
   let lastWall=entered,lastMono=mono;
   const current=()=>{
    try{
     const at=Date.now(),m=performance.now();
@@ -233,37 +244,37 @@
    if(!knownTime(original.closed_at)||original.closed_at>=events.startAt||original.closed_at>now()||typeof original.process_generation!=='string'||!/^[a-f0-9]{64}$/.test(original.process_generation))knownFail();
    const grants=await read(currentProjection,[events.grantId],currentKeys,2);
    if(grants.length!==1)knownFail();const grant=grants[0];sameIdentity(grant,true);
    if(grant.grant_id!==events.grantId||grant.grant_id===original.grant_id||!knownTime(grant.issued_at)||grant.issued_at>now())knownFail();
    const rows=await read(cancellationsProjection,[],cancellationKeys,9);if(rows.length>8)knownFail();
    const cancellations=rows.map(row=>{
     sameIdentity(row,true);if(row.grant_id===original.grant_id||!knownTime(row.closed_at)||row.closed_at>now())knownFail();
     return {grantId:row.grant_id,containerId:row.container_id,programHash:row.program_hash,sourceRevision:row.source_revision,image:row.image,closedAt:row.closed_at,revokedAt:row.revoked_at,monitorSequence:row.monitor_sequence,monitorRevision:row.monitor_revision,monitorRevokedAt:row.monitor_revoked_at};
    });
    const raw=JSON.stringify({purpose:'afw.successor-known-cancellations.v1',currentGrant:{grantId:grant.grant_id,consentSequence:grant.consent_sequence,consentRevision:grant.consent_revision,issuedAt:grant.issued_at,expiresAt:grant.expires_at},cancellations});
-   validateNamedCancellationHistory(bundle,raw);
+   profile.validateHistory(bundle,raw);
    return {bytes:JSON.stringify([originals,grants,rows]),raw,original:{...resolved.original,processGeneration:original.process_generation,closedAt:original.closed_at}};
   }
   const failure=new Promise(resolve=>{parent.signal.addEventListener('abort',()=>resolve(outcome(handedOff?'uncertain':'blocked')),{once:true});timer=setTimeout(invalidate,remaining());});
   const work=async()=>{
    const first=await snapshot(),second=await snapshot();now();if(first.bytes!==second.bytes)knownFail();
    let active=false;
    const authorize=async(stage,signal)=>{
     if(!knownStages.has(stage)||active||!(signal instanceof AbortSignal)||signal.aborted||!current()){invalidate();return false;}
     active=true;let onAbort;
     try{
      onAbort=invalidate;signal.addEventListener('abort',onAbort,{once:true});
      const eligibility=createPrivateQaNamedEligibility({db,original:first.original,candidate:resolved.candidate,window:{grantId:events.grantId,startAt:events.startAt,expiresAt:events.expiresAt},cancellationHistory:first.raw,now,timeoutMs:Math.min(5000,remaining())});
      const allowed=await eligibility.check(AbortSignal.any([signal,parent.signal]));
      if(allowed!==true||signal.aborted||!current()){invalidate();return false;}return true;
     }catch{invalidate();return false;}finally{active=false;if(onAbort)signal.removeEventListener('abort',onAbort);}
    };
    if(await authorize('workflow_admission',parent.signal)!==true||!current())return outcome('blocked');
    handedOff=true;
-   const result=await runReleaseWorkflow({bundle,env,event,step:Object.freeze({do:(...args)=>Reflect.apply(stepDo,step,args)}),authorize,cancellationHistory:first.raw,requestLease});
+   const result=await runReleaseWorkflowImpl(profile,{bundle,env,event,step:Object.freeze({do:(...args)=>Reflect.apply(stepDo,step,args)}),authorize,cancellationHistory:first.raw,requestLease});
    if(!current())return outcome('uncertain');return result;
   };
   const result=await Promise.race([work(),failure]);
   if(!current())return outcome(handedOff?'uncertain':'blocked');return result;
  }catch{return outcome(handedOff?'uncertain':'blocked');}
  finally{clearTimeout(timer);invalidate();if(requestLease)knownRequestLeases.delete(requestLease);}
 }

~~~~~~~~~~

## lib/mcp-release-successor-reservation.mjs

~~~~~~~~~~diff
diff --git a/lib/mcp-release-successor-reservation.mjs b/lib/mcp-release-successor-reservation.mjs
--- a/lib/mcp-release-successor-reservation.mjs
+++ b/lib/mcp-release-successor-reservation.mjs
@@ -1,29 +1,34 @@
-import {validateReleaseOperatorBundle,validateNamedCancellationHistory,resolveNamedActivationPlan} from './mcp-release-operator-policy.mjs';
+import {readFiniteReleaseGate} from './mcp-own-finite-admission-gate.mjs';
+import {validateReleaseOperatorBundle,validateNamedCancellationHistory,resolveNamedActivationPlan,validateFiniteReleaseOperatorBundle,validateFiniteNamedCancellationHistory,resolveFiniteNamedActivationPlan} from './mcp-release-operator-policy.mjs';
 import {resolveSuccessorPreparation} from './mcp-successor-manifest.mjs';
 import {createRetirementEvidenceReader} from './mcp-retirement-evidence.mjs';
 import {createRetirementProviderReader} from './mcp-retirement-provider-reader.mjs';
 import {createSuccessorReservation} from './mcp-successor-reservation.mjs';
 import {readRetiredRpcReceipt} from './mcp-retired-rpc-receipt.mjs';
+const LEGACY_RELEASE=Object.freeze({validateBundle:validateReleaseOperatorBundle,validateHistory:validateNamedCancellationHistory,resolvePlan:resolveNamedActivationPlan});
+const FINITE_RELEASE=Object.freeze({validateBundle:validateFiniteReleaseOperatorBundle,validateHistory:validateFiniteNamedCancellationHistory,resolvePlan:resolveFiniteNamedActivationPlan});
 const fail=()=>{throw Error('Private successor reservation unavailable');};
 /** Workflow-private, fixed plan/namespace only. Never launches a process or
  * creates a subscription. An unknown reservation acknowledgement is terminal. */
-export async function reserveReleaseSuccessor({bundle,env,namespace,readCredential,fetchImpl=globalThis.fetch,now=Date.now,signal,observation,authorize,cancellationHistory}={}){
+export async function reserveReleaseSuccessor(options={}){return reserveReleaseSuccessorImpl(LEGACY_RELEASE,options);}
+export async function reserveFiniteReleaseSuccessor(options={}){return reserveReleaseSuccessorImpl(FINITE_RELEASE,options);}
+async function reserveReleaseSuccessorImpl(profile,{bundle,env,namespace,readCredential,fetchImpl=globalThis.fetch,now=Date.now,signal,observation,authorize,cancellationHistory}={}){
  const trace=(stage,detail)=>{try{observation?.point(stage,detail);}catch{/* Observation is not authority. */}};
  trace('successor_admission');
- validateReleaseOperatorBundle(bundle);
+ profile.validateBundle(bundle);
  if(bundle.policy.operation!=='confirm_named'||typeof readCredential!=='function'||typeof now!=='function'||typeof fetchImpl!=='function'||!(signal instanceof AbortSignal)||signal.aborted||authorize!==undefined&&typeof authorize!=='function')fail();
- if(cancellationHistory!==undefined){if(typeof authorize!=='function')fail();validateNamedCancellationHistory(bundle,cancellationHistory);}
+ if(cancellationHistory!==undefined){if(typeof authorize!=='function')fail();profile.validateHistory(bundle,cancellationHistory);}
  const names=['AFW_RELEASE_OPERATOR_ENABLED','AFW_RELEASE_WORKFLOW_ENABLED','AFW_RELEASE_CONFIRMATION_WORKFLOW_ENABLED','AFW_RELEASE_RESERVATION_WORKFLOW_ENABLED','AFW_RELEASE_EVENTS_NODE','RELEASE_DB'];
  const pins=Object.freeze(Object.fromEntries(names.map(k=>[k,env[k]])));
  if(names.slice(0,4).some(k=>pins[k]!=='true')||pins.AFW_RELEASE_EVENTS_NODE!==namespace||!pins.RELEASE_DB?.withSession)fail();
- const named=resolveNamedActivationPlan(bundle,namespace);
+ const named=profile.resolvePlan(bundle,namespace);
  trace('successor_manifest');
  const raw=bundle.policy.observation.configuration.bindings.find(b=>b.name==='AFW_DOSSIER_SUCCESSOR_POLICY').text;
  const manifest=JSON.parse(raw),resolved=resolveSuccessorPreparation({...Object.fromEntries(['scope','original','candidate'].map(k=>[k,manifest[k]])),namespace});
  const db=pins.RELEASE_DB,prepare=db.prepare,session=db.withSession,get=namespace.get;
  if(typeof prepare!=='function'||typeof get!=='function')fail();
  let last=-1;
  const current=()=>{const t=now();if(signal.aborted||!Number.isSafeInteger(t)||t<last||t<bundle.policy.startAt||t>=bundle.policy.expiresAt||!names.every(k=>env[k]===pins[k])||db.prepare!==prepare||db.withSession!==session||namespace.get!==get)fail();named.current();last=t;return t;};
  const timeoutMs=Math.min(5000,bundle.policy.expiresAt-current());
  const readInstance=createRetirementProviderReader({resources:{accountId:manifest.scope.accountId,applicationId:manifest.original.applicationId,containerId:manifest.original.containerId},readCredential:async()=>{current();const value=await readCredential();current();return value;},fetchImpl,timeoutMs});
  trace('successor_reader');
@@ -43,15 +48,15 @@
   if(!result||typeof result!=='object')trace('successor_custody_value');
   else if(Object.getPrototypeOf(result)!==Object.prototype)trace('successor_custody_prototype');
   else if(Reflect.ownKeys(result).length!==fields.length)trace('successor_custody_keys');
   else if(fields.some(k=>!Object.hasOwn(result,k)))trace('successor_custody_fields');
   else if(result.observedAt>receivedAt)trace('successor_custody_future',{remoteObservedAt:result.observedAt,receivedAt});
   else if(['containerId','programHash','sourceRevision'].some(k=>result[k]!==resolved.original[k]))trace('successor_custody_identity');
   else trace('successor_custody_checked');
   return receipt;
  }});
  trace('successor_reservation');
- const result=await createSuccessorReservation({db,original:resolved.original,candidate:resolved.candidate,now:current,timeoutMs,authorize,cancellationHistory,readRetirement:async({signal:inner},assertReservation)=>{
+ const result=await createSuccessorReservation({finiteGate:readFiniteReleaseGate(env),db,original:resolved.original,candidate:resolved.candidate,now:current,timeoutMs,authorize,cancellationHistory,readRetirement:async({signal:inner},assertReservation)=>{
   current();if(inner.aborted)fail();if(typeof assertReservation!=='function')fail();const evidence=await retirement.observe({signal:inner,assertCurrent:()=>{current();assertReservation();}});current();if(inner.aborted)fail();trace('successor_primary');return evidence;
  }}).reserve();
  current();return result;
 }

~~~~~~~~~~

## lib/mcp-successor-launch-gate.mjs

~~~~~~~~~~diff
diff --git a/lib/mcp-successor-launch-gate.mjs b/lib/mcp-successor-launch-gate.mjs
--- a/lib/mcp-successor-launch-gate.mjs
+++ b/lib/mcp-successor-launch-gate.mjs
@@ -1,41 +1,46 @@
+import {createHash} from 'node:crypto';
+import {requireFiniteAdmissionGate,retainFiniteWriterDeadline} from './mcp-own-finite-admission-gate.mjs';
 import {resolveSuccessorPreparation} from './mcp-successor-manifest.mjs';
 import {createDossierMonitoringAuthorization} from './dossier-monitoring-authority.mjs';
 const fail=()=>{throw Error('Successor launch unavailable');};
 const sha=v=>typeof v==='string'&&/^[a-f0-9]{64}$/.test(v);
 const time=v=>Number.isSafeInteger(v)&&v>=0&&v<=8640000000000000;
 const exact=(v,keys)=>{if(!v||Object.getPrototypeOf(v)!==Object.prototype||Reflect.ownKeys(v).length!==keys.length)fail();const out={};for(const k of keys){const d=Object.getOwnPropertyDescriptor(v,k);if(!d?.enumerable||!Object.hasOwn(d,'value'))fail();out[k]=d.value;}return out;};
 const sqlNow="CAST(strftime('%s','now') AS INTEGER)*1000+CAST(substr(strftime('%f','now'),4,3) AS INTEGER)";
 /** Private launcher decorator. Host retains lifecycle deadline, observation and cleanup.
  * Deployment/retirement readers are trusted server adapters, never client evidence. */
-export function createSuccessorLaunchGate({db,plan,context,projectId,projectionSecret,readRetirement,readDeployment,launch,now=Date.now,timeoutMs=5000}={}){
+export function createSuccessorLaunchGate({db,plan,context,projectId,projectionSecret,readRetirement,readDeployment,launch,now=Date.now,timeoutMs=5000,finiteGate}={}){
+ const finite=finiteGate===undefined?null:requireFiniteAdmissionGate(finiteGate,{},'launch');
  const p=resolveSuccessorPreparation(plan),c=p.candidate,o=p.original,scope=p.manifest.scope,namespace=plan.namespace,idFromName=namespace.idFromName,idFromString=namespace.idFromString;
  const ctx=exact(context,['grantId','subject','clientId','resource','scopes']);if(!Array.isArray(ctx.scopes))fail();ctx.scopes=Object.freeze([...ctx.scopes]);Object.freeze(ctx);
  if(ctx.resource!==scope.resource||typeof readRetirement!=='function'||typeof readDeployment!=='function'||typeof launch!=='function'||typeof now!=='function'||!Number.isSafeInteger(timeoutMs)||timeoutMs<1||timeoutMs>5000)fail();
  const authorization=createDossierMonitoringAuthorization({db,context:ctx,projectId,projectionSecret,now});
- return async(boot,signal)=>{
-  let key,timer,rejectCancel;const abort=new AbortController(),end=performance.now()+timeoutMs;let last=-1;
+ return async(boot,signal,assertParentCurrent)=>{
+  let key,timer,rejectCancel;const abort=new AbortController(),end=performance.now()+timeoutMs;let last=-1,finiteLease;
   const cancel=()=>{abort.abort();rejectCancel?.(Error('Successor launch unavailable'));};
   try{
-   if(!(signal instanceof AbortSignal)||signal.aborted)fail();
+   if(!(signal instanceof AbortSignal)||signal.aborted||assertParentCurrent!==undefined&&typeof assertParentCurrent!=='function')fail();
    const m=exact(boot,['containerId','processGeneration','programHash','sourceRevision','image','createdAt','expiresAt','key']);
    if(m.containerId!==c.containerId||m.programHash!==c.programHash||m.sourceRevision!==c.sourceRevision||m.image!=='cloudflare/debian-trixie'||!sha(m.processGeneration)||!time(m.createdAt)||!time(m.expiresAt)||m.createdAt<c.startAt||m.expiresAt>c.expiresAt||m.expiresAt<=m.createdAt||!Buffer.isBuffer(m.key)||m.key.length!==32)fail();key=Buffer.from(m.key);m.key=key;Object.freeze(m);
-   const clock=()=>{const n=now();if(signal.aborted||abort.signal.aborted||performance.now()>=end||!time(n)||n<last||n<m.createdAt||n>=m.expiresAt||namespace.idFromName!==idFromName||namespace.idFromString!==idFromString||idFromName.call(namespace,p.manifest.actorName).toString()!==c.containerId||idFromString.call(namespace,c.containerId).toString()!==c.containerId)fail();last=n;return n;};
+   const clock=()=>{assertParentCurrent?.();finiteLease?.assertCurrent();const n=now();if(signal.aborted||abort.signal.aborted||performance.now()>=end||!time(n)||n<last||n<m.createdAt||n>=m.expiresAt||namespace.idFromName!==idFromName||namespace.idFromString!==idFromString||idFromName.call(namespace,p.manifest.actorName).toString()!==c.containerId||idFromString.call(namespace,c.containerId).toString()!==c.containerId)fail();last=n;return n;};
    const auth=async()=>{clock();const a=await authorization();clock();if(!a.enabled||a.principalRef!==scope.ownerRef||a.projectRef!==scope.projectRef||a.expiresAt<m.expiresAt)fail();return a;};
    const deployed=async()=>{clock();const d=exact(await readDeployment({signal:abort.signal}),['scopeHash','sourceRevision','programHash','observedAt']),n=clock();if(d.scopeHash!==c.scopeHash||d.sourceRevision!==c.sourceRevision||d.programHash!==c.programHash||!time(d.observedAt)||d.observedAt>n||n-d.observedAt>30000)fail();return d;};
    const work=async()=>{
+    if(finite){requireFiniteAdmissionGate(finite,{containerId:c.containerId,trialId:c.trialId,grantHash:createHash('sha256').update(ctx.grantId).digest('hex')},'launch');const begun=await finite.beginLaunch();if(begun.status!=='issued')fail();finiteLease=retainFiniteWriterDeadline(finite,begun.claim,'launch',now,m.expiresAt);}clock();
     const before=await auth();await deployed();
     const e=exact(await readRetirement({signal:abort.signal},clock),['purpose','containerId','applicationId','programHash','sourceRevision','processGeneration','closedAt','stoppedAt','observedAt','physicalStopVerified','mayStartSuccessor']),n=clock();
     if(e.purpose!=='afw.retirement-evidence.v1'||Object.keys(o).some(k=>o[k]!==e[k])||!sha(e.processGeneration)||!['closedAt','stoppedAt','observedAt'].every(k=>time(e[k]))||e.closedAt>e.observedAt||e.stoppedAt>e.observedAt||e.observedAt>n||n-e.observedAt>30000||e.physicalStopVerified!==true||e.mayStartSuccessor!==false)fail();
     const primary=db.withSession?db.withSession('first-primary'):db;
-    const sql=`INSERT INTO dossier_successor_launch_claims(trial_id,scope_hash,container_id,process_generation,grant_id,claimed_at) SELECT r.trial_id,r.scope_hash,a.container_id,a.process_generation,g.id,${sqlNow} FROM dossier_successor_reservations r JOIN dossier_node_process_admissions a ON a.container_id=r.container_id AND a.program_hash=r.program_hash AND a.source_revision=r.source_revision JOIN delegated_access_grants g ON g.id=a.grant_id AND g.user_id=a.user_id AND g.project_id=a.project_id AND g.client_id=a.client_id AND g.resource=a.resource JOIN site_projects p ON p.id=g.project_id AND p.user_id=g.user_id JOIN dossier_monitoring_consent_events q ON q.grant_id=g.id AND q.project_id=g.project_id AND q.user_id=g.user_id AND q.client_id=g.client_id AND q.resource=g.resource AND q.sequence=a.consent_sequence AND q.issued_at=a.consent_issued_at AND q.expires_at=a.consent_expires_at WHERE r.trial_id=? AND r.scope_hash=? AND r.application_id=? AND r.predecessor_container_id=? AND r.predecessor_generation=? AND r.predecessor_program_hash=? AND r.predecessor_source_revision=? AND r.closed_at=? AND r.stopped_at=? AND r.state='prepared' AND r.budget=1 AND r.start_at=? AND r.expires_at=? AND a.container_id=? AND a.process_generation=? AND a.program_hash=? AND a.source_revision=? AND a.image=? AND a.created_at=? AND a.expires_at=? AND g.id=? AND g.user_id=? AND g.project_id=? AND g.client_id=? AND g.resource=? AND g.revoked_at='' AND q.action='grant' AND q.purpose='afw.dossier-monitoring.v1' AND q.sequence=(SELECT MAX(sequence) FROM dossier_monitoring_consent_events WHERE grant_id=g.id) AND NOT EXISTS(SELECT 1 FROM dossier_monitoring_consent_events WHERE grant_id=g.id AND action='revoke') AND NOT EXISTS(SELECT 1 FROM dossier_node_process_closures WHERE grant_id=g.id) AND ${sqlNow}>=r.start_at AND ${sqlNow}<a.expires_at AND q.issued_at<=${sqlNow} AND q.expires_at>=a.expires_at AND CAST(strftime('%s',g.expires_at) AS INTEGER)*1000+CAST(substr(g.expires_at,21,3) AS INTEGER)>=a.expires_at AND ?<=${sqlNow} AND ${sqlNow}-?<=30000`;
-    const result=await primary.prepare(sql).bind(c.trialId,c.scopeHash,o.applicationId,o.containerId,e.processGeneration,o.programHash,o.sourceRevision,e.closedAt,e.stoppedAt,c.startAt,c.expiresAt,m.containerId,m.processGeneration,m.programHash,m.sourceRevision,m.image,m.createdAt,m.expiresAt,ctx.grantId,ctx.subject,projectId,ctx.clientId,ctx.resource,e.observedAt,e.observedAt).run();clock();if(result?.success!==true||result.meta?.changes!==1)fail();
+    const sql=`INSERT INTO dossier_successor_launch_claims(trial_id,scope_hash,container_id,process_generation,grant_id,claimed_at) SELECT r.trial_id,r.scope_hash,a.container_id,a.process_generation,g.id,${sqlNow} FROM dossier_successor_reservations r JOIN dossier_node_process_admissions a ON a.container_id=r.container_id AND a.program_hash=r.program_hash AND a.source_revision=r.source_revision JOIN delegated_access_grants g ON g.id=a.grant_id AND g.user_id=a.user_id AND g.project_id=a.project_id AND g.client_id=a.client_id AND g.resource=a.resource JOIN site_projects p ON p.id=g.project_id AND p.user_id=g.user_id JOIN dossier_monitoring_consent_events q ON q.grant_id=g.id AND q.project_id=g.project_id AND q.user_id=g.user_id AND q.client_id=g.client_id AND q.resource=g.resource AND q.sequence=a.consent_sequence AND q.issued_at=a.consent_issued_at AND q.expires_at=a.consent_expires_at WHERE r.trial_id=? AND r.scope_hash=? AND r.application_id=? AND r.predecessor_container_id=? AND r.predecessor_generation=? AND r.predecessor_program_hash=? AND r.predecessor_source_revision=? AND r.closed_at=? AND r.stopped_at=? AND r.state='prepared' AND r.budget=1 AND r.start_at=? AND r.expires_at=? AND a.container_id=? AND a.process_generation=? AND a.program_hash=? AND a.source_revision=? AND a.image=? AND a.created_at=? AND a.expires_at=? AND g.id=? AND g.user_id=? AND g.project_id=? AND g.client_id=? AND g.resource=? AND g.revoked_at='' AND q.action='grant' AND q.purpose='afw.dossier-monitoring.v1' AND q.sequence=(SELECT MAX(sequence) FROM dossier_monitoring_consent_events WHERE grant_id=g.id) AND NOT EXISTS(SELECT 1 FROM dossier_monitoring_consent_events WHERE grant_id=g.id AND action='revoke') AND NOT EXISTS(SELECT 1 FROM dossier_node_process_closures WHERE grant_id=g.id) AND ${sqlNow}>=r.start_at AND ${sqlNow}<a.expires_at AND ${sqlNow}<? AND q.issued_at<=${sqlNow} AND q.expires_at>=a.expires_at AND CAST(strftime('%s',g.expires_at) AS INTEGER)*1000+CAST(substr(g.expires_at,21,3) AS INTEGER)>=a.expires_at AND ?<=${sqlNow} AND ${sqlNow}-?<=30000`;
+    const result=await primary.prepare(sql).bind(c.trialId,c.scopeHash,o.applicationId,o.containerId,e.processGeneration,o.programHash,o.sourceRevision,e.closedAt,e.stoppedAt,c.startAt,c.expiresAt,m.containerId,m.processGeneration,m.programHash,m.sourceRevision,m.image,m.createdAt,m.expiresAt,ctx.grantId,ctx.subject,projectId,ctx.clientId,ctx.resource,finiteLease?.deadline??m.expiresAt,e.observedAt,e.observedAt).run();clock();if(result?.success!==true||result.meta?.changes!==1)fail();
     const deployment=await deployed();const after=await auth();if(['principalRef','resourceRef','projectRef','permissionRef'].some(k=>before[k]!==after[k]))fail();clock();
     const finalPrimary=db.withSession?db.withSession('first-primary'):db;const closed=await finalPrimary.prepare('SELECT grant_id FROM dossier_node_process_closures WHERE grant_id=?').bind(ctx.grantId).first();const finalNow=clock();if(closed||finalNow-e.observedAt>30000||finalNow-deployment.observedAt>30000)fail();
    };
    const cancelled=new Promise((_,reject)=>{rejectCancel=reject;});signal.addEventListener('abort',cancel,{once:true});
    const deadline=new Promise((_,reject)=>{timer=setTimeout(()=>{abort.abort();reject(Error('Successor launch unavailable'));},timeoutMs);});
    await Promise.race([work(),cancelled,deadline]);clearTimeout(timer);clock();
-   await launch(m,signal);const finished=now();if(signal.aborted||!time(finished)||finished<last||finished>=m.expiresAt)fail();
+   if(finite||assertParentCurrent)await launch(m,signal,clock);else await launch(m,signal);assertParentCurrent?.();finiteLease?.assertCurrent();const finished=now();if(signal.aborted||!time(finished)||finished<last||finished>=m.expiresAt)fail();
+   if(finite&&!['settled','reconciled'].includes((await finite.settleLaunch()).status))fail();clock();
   }catch{fail();}finally{clearTimeout(timer);signal?.removeEventListener?.('abort',cancel);abort.abort();if(key)key.fill(0);}
  };
 }

~~~~~~~~~~

## lib/mcp-successor-reservation.mjs

~~~~~~~~~~diff
diff --git a/lib/mcp-successor-reservation.mjs b/lib/mcp-successor-reservation.mjs
--- a/lib/mcp-successor-reservation.mjs
+++ b/lib/mcp-successor-reservation.mjs
@@ -1,36 +1,40 @@
+import {requireFiniteAdmissionGate,retainFiniteWriterDeadline} from './mcp-own-finite-admission-gate.mjs';
 import {prepareKnownCancellationHistory} from './mcp-successor-cancellation-history.mjs';
 const fail=()=>{throw Error('Successor reservation unavailable');};
 const sha=v=>typeof v==='string'&&/^[a-f0-9]{64}$/.test(v);
 const revision=v=>typeof v==='string'&&/^[a-f0-9]{40}$/.test(v);
 const time=v=>Number.isSafeInteger(v)&&v>=0&&v<=8640000000000000;
 const exact=(v,keys)=>{if(!v||Object.getPrototypeOf(v)!==Object.prototype||Reflect.ownKeys(v).length!==keys.length)fail();const out={};for(const k of keys){const d=Object.getOwnPropertyDescriptor(v,k);if(!d?.enumerable||!Object.hasOwn(d,'value'))fail();out[k]=d.value;}return Object.freeze(out);};
 const sqlNow="CAST(strftime('%s','now') AS INTEGER)*1000+CAST(substr(strftime('%f','now'),4,3) AS INTEGER)";
 /** Private administrative preparation only. Pins/evidence reader are host-owned.
  * One immutable reservation; lost ACK never becomes retry permission or boot. */
-export function createSuccessorReservation({db,original,candidate,readRetirement,now=Date.now,timeoutMs=5000,authorize,cancellationHistory}={}){
+export function createSuccessorReservation({db,original,candidate,readRetirement,now=Date.now,timeoutMs=5000,authorize,cancellationHistory,finiteGate}={}){
+ const finite=finiteGate===undefined?null:requireFiniteAdmissionGate(finiteGate,{},'reservation');
  const o=exact(original,['containerId','applicationId','programHash','sourceRevision']),c=exact(candidate,['trialId','containerId','programHash','sourceRevision','scopeHash','startAt','expiresAt','budget']);
  if(!sha(o.containerId)||!sha(o.programHash)||!revision(o.sourceRevision)||typeof o.applicationId!=='string'||!/^[A-Za-z0-9-]{1,200}$/.test(o.applicationId)||!['trialId','containerId','programHash','scopeHash'].every(k=>sha(c[k]))||!revision(c.sourceRevision)||c.containerId===o.containerId||!time(c.startAt)||!time(c.expiresAt)||c.expiresAt<=c.startAt||c.expiresAt-c.startAt>600000||c.budget!==1||typeof db?.prepare!=='function'||typeof readRetirement!=='function'||typeof now!=='function'||!Number.isSafeInteger(timeoutMs)||timeoutMs<1||timeoutMs>5000||authorize!==undefined&&typeof authorize!=='function')fail();
  if(cancellationHistory!==undefined&&(typeof authorize!=='function'||typeof db.withSession!=='function'))fail();
  const known=cancellationHistory===undefined?null:prepareKnownCancellationHistory(cancellationHistory,c);
  return Object.freeze({async reserve(){
-  const end=performance.now()+timeoutMs,abort=new AbortController();let timer,last=-1;
-  const clock=()=>{const n=now();if(abort.signal.aborted||performance.now()>=end||!time(n)||n<last||n>=c.expiresAt)fail();last=n;return n;};
+  const end=performance.now()+timeoutMs,abort=new AbortController();let timer,last=-1,finiteLease;
+  const clock=()=>{finiteLease?.assertCurrent();const n=now();if(abort.signal.aborted||performance.now()>=end||!time(n)||n<last||n>=c.expiresAt)fail();last=n;return n;};
   const work=async()=>{
    if(authorize){if(await authorize('successor_before_retirement',abort.signal)!==true)fail();clock();}
    clock();const e=exact(await readRetirement({signal:abort.signal},clock),['purpose','containerId','applicationId','programHash','sourceRevision','processGeneration','closedAt','stoppedAt','observedAt','physicalStopVerified','mayStartSuccessor']);
    if(authorize){if(await authorize('successor_after_retirement',abort.signal)!==true)fail();clock();}
    const n=clock();
    if(e.purpose!=='afw.retirement-evidence.v1'||Object.keys(o).some(k=>e[k]!==o[k])||!sha(e.processGeneration)||!['closedAt','stoppedAt','observedAt'].every(k=>time(e[k]))||e.closedAt>e.observedAt||e.stoppedAt>e.observedAt||e.observedAt>n||n-e.observedAt>30000||e.physicalStopVerified!==true||e.mayStartSuccessor!==false)fail();
    const columns=['slot','trial_id','predecessor_container_id','predecessor_generation','predecessor_program_hash','predecessor_source_revision','application_id','container_id','program_hash','source_revision','scope_hash','start_at','expires_at','budget','closed_at','stopped_at','observed_at','state'];
    const values=['afw.own-successor.v1',c.trialId,o.containerId,e.processGeneration,o.programHash,o.sourceRevision,o.applicationId,c.containerId,c.programHash,c.sourceRevision,c.scopeHash,c.startAt,c.expiresAt,c.budget,e.closedAt,e.stoppedAt,e.observedAt,'prepared'];
    const primary=db.withSession?db.withSession('first-primary'):db;
    const sql=`INSERT INTO dossier_successor_reservations (${columns.join(',')},reserved_at) SELECT ${columns.map(()=>'?').join(',')},${sqlNow} FROM dossier_node_process_admissions a JOIN dossier_node_process_closures z ON z.grant_id=a.grant_id AND z.container_id=a.container_id AND z.process_generation=a.process_generation AND z.program_hash=a.program_hash AND z.source_revision=a.source_revision AND z.image=a.image WHERE a.container_id=? AND a.process_generation=? AND a.program_hash=? AND a.source_revision=? AND a.image='cloudflare/debian-trixie' AND z.closed_at=? AND (SELECT COUNT(*) FROM dossier_node_process_admissions)=1 AND ${known?known.clause:'(SELECT COUNT(*) FROM dossier_node_process_closures)=1'} AND ?>${sqlNow} AND ?<=${sqlNow} AND ${sqlNow}-?<=30000`;
    if(authorize){if(await authorize('successor_before_write',abort.signal)!==true)fail();clock();}
-   clock();const result=await primary.prepare(sql).bind(...values,o.containerId,e.processGeneration,o.programHash,o.sourceRevision,e.closedAt,...(known?known.params:[]),c.expiresAt,e.observedAt,e.observedAt).run();clock();
+   if(finite){requireFiniteAdmissionGate(finite,{containerId:c.containerId,trialId:c.trialId,applicationId:o.applicationId},'reservation');const begun=await finite.beginReservation();if(begun.status!=='issued')fail();finiteLease=retainFiniteWriterDeadline(finite,begun.claim,'reservation',now,c.expiresAt);}
+   clock();const result=await primary.prepare(sql).bind(...values,o.containerId,e.processGeneration,o.programHash,o.sourceRevision,e.closedAt,...(known?known.params:[]),finiteLease?.deadline??c.expiresAt,e.observedAt,e.observedAt).run();clock();
    if(authorize){if(await authorize('successor_after_write',abort.signal)!==true)fail();clock();}
    if(result?.success!==true||result.meta?.changes!==1)fail();
+   if(finite&&!['settled','reconciled'].includes((await finite.settleReservation()).status))fail();clock();
    return Object.freeze({purpose:'afw.successor-reservation.v1',trialId:c.trialId,state:'prepared',mayBoot:false});
   };
   try{return await Promise.race([work(),new Promise((_,reject)=>{timer=setTimeout(()=>{abort.abort();reject(Error('Successor reservation unavailable'));},timeoutMs);})]);}catch{fail();}finally{clearTimeout(timer);abort.abort();}
  }});
 }

~~~~~~~~~~

## worker/independent-closure/index.mjs

~~~~~~~~~~diff
diff --git a/worker/independent-closure/index.mjs b/worker/independent-closure/index.mjs
--- a/worker/independent-closure/index.mjs
+++ b/worker/independent-closure/index.mjs
@@ -1,10 +1,17 @@
+import {runPrivateQaFiniteLaunchOperation} from '../../lib/mcp-qa-finite-launch.mjs';
+import {createPrivateQaFiniteLaunchParent} from '../../lib/mcp-qa-finite-launch-inventory.mjs';
+import {runPrivateQaFiniteObserver,FINITE_OBSERVER_OPERATION} from '../../lib/mcp-qa-finite-observer.mjs';
+import {previewPrivateQaFiniteTrialMaterial,claimPrivateQaFiniteTrialRestore,readPrivateQaFiniteFinalPrimary} from '../../lib/mcp-qa-finite-observer-native.mjs';
+import {finiteFields as finiteReadFields} from '../../lib/mcp-finite-evidence.mjs';
+import {readFiniteTrialCleanupProofHead,readRetainedFiniteCleanupProof,readFiniteTrialCleanupCompletion} from '../../lib/mcp-qa-finite-cleanup-store.mjs';
+import {runPrivateQaFiniteTrialAlarm,readPrivateQaFiniteNominalControl} from '../../lib/mcp-qa-finite-trial-guard.mjs';
 import {readPrivateQaGenerationPreparation,runPrivateQaGenerationPreparation} from '../../lib/mcp-qa-generation-preparation.mjs';
 import {readPrivateQaNamedPacket,runPrivateQaNamedPacketObservation} from '../../lib/mcp-qa-named-preflight.mjs';
 import {readPrivateQaCurrentGeneration,readPrivateQaRetainedGeneration} from '../../lib/mcp-qa-generation-resolver.mjs';
 import {observePrivateQaClosedActor,runPrivateQaClosedContext} from '../../lib/mcp-qa-closed-context.mjs';
 import {createPrivateClosureReaderProbe,runPrivateClosureReaderProbeWorkflow,createPrivateClosurePublisherProbe,runPrivateClosurePublisherProbeWorkflow} from '../../lib/mcp-closure-reader-probe.mjs';
 import {createPrivateCanaryRestorationHost,isPrivateCanaryRestorationActor,runPrivateCanaryRestorationWorkflow} from '../../lib/mcp-hosted-canary-restoration.mjs';
 import {computeAdministrativeResultDigest} from '../../lib/assistance-administrative-closure-readback.mjs';
 import {fetchOwnOccurrence} from './occurrence-host.mjs';
 import {createPrimaryQaInstaller} from '../../lib/assistance-private-qa-installer.mjs';
 import {createPrivateInstallationD1} from '../../lib/assistance-private-installation-d1.mjs';
@@ -138,20 +145,21 @@
    return await invoke(method);
   }catch{return method==='install'?{state:installStarted?'pending':'unavailable'}:method==='withdraw'?false:null;}finally{active=false;}
  }
  readChallengeStatus(){return this.challenge.status();}
  // Private rollback preserves history. HTTP exposes only authenticated exchange.
  withdraw(){return this.actor.withdraw();}
  fetch(request){if(this.configuration.AFW_QA_CHALLENGE_ENABLED!=='true'||!challengePath(request))return new Response(null,{status:404});return this.challenge.fetch(request);}
 }
 export class PrivateQaBootstrap extends WorkflowEntrypoint {
  run(event,step){let params=event.payload;try{if(typeof params==='string'&&params.length<=8192){const decoded=JSON.parse(params);if(params.length<=256||decoded?.operation==='originals'||decoded?.operation==='mcp_canary_dispatch_reduce_restore'&&params.length<=512)params=decoded;}}catch{/* Strict handlers reject malformed payloads. */}
+  if(params?.operation===FINITE_OBSERVER_OPERATION)return runPrivateQaFiniteObserver({env:this.env,event,step});
   if(params?.operation==='mcp_closure_publisher_probe')return runPrivateClosurePublisherProbeWorkflow({env:this.env,event,step});
   if(params?.operation==='mcp_closure_reader_probe')return runPrivateClosureReaderProbeWorkflow({env:this.env,event,step});
   if(['mcp_canary_dispatch_reduce_restore','mcp_canary_reduce_restore','mcp_canary_arm_restore','mcp_canary_withdraw_control','mcp_canary_status'].includes(params?.operation))return runPrivateCanaryRestorationWorkflow({env:this.env,event,step});
   if(params?.operation==='observe')return observePrivateQa(this.env,params);
   return createPrivateAdminBootstrap({install:async()=>{const value=await this.env.AFW_QA_PREREGISTRY.get(this.env.AFW_QA_PREREGISTRY.idFromName('own-qa')).installOwn();try{return {state:value?.state};}finally{value?.[Symbol.dispose]?.();}},readControl:()=>control(this.env),readRegistered:async ref=>(await this.env.AFW_QA_PREREGISTRY.get(this.env.AFW_QA_PREREGISTRY.idFromName('own-qa')).read())?.registration?.plan?.baselineRef===ref,register:ref=>this.env.AFW_QA_PREREGISTRY.get(this.env.AFW_QA_PREREGISTRY.idFromName('own-qa')).register(ref),appendOriginals:(ref,sequence,originals)=>this.env.AFW_QA_PREREGISTRY.get(this.env.AFW_QA_PREREGISTRY.idFromName('own-qa')).appendOperatorObservation(ref,sequence,originals),readOriginals:async()=>{const value=await this.env.AFW_QA_PREREGISTRY.get(this.env.AFW_QA_PREREGISTRY.idFromName('own-qa')).readOperatorObservation();try{return structuredClone(value);}finally{value?.[Symbol.dispose]?.();}}}).run(event.payload,step);}
 }
 export class PrivateQaNamedConfirmation extends WorkflowEntrypoint {
  run(event,step){let p=event?.payload;try{if(typeof p==='string'&&p.length<=256)p=JSON.parse(p);}catch{/* Strict handlers remain closed. */}if(p?.operation==='observe_generation_preparation')return runPrivateQaGenerationPreparation({env:this.env,event,step});if(p?.operation==='observe_named_packet')return runPrivateQaNamedPacketObservation({env:this.env,event,step});return runPrivateQaClosedContext({env:this.env,event,step});}
 }
 export function observePrivateQa(env,params){const actor=()=>env.AFW_QA_PREREGISTRY.get(env.AFW_QA_PREREGISTRY.idFromName('own-qa'));
@@ -169,20 +177,37 @@
    readProvisioning:ref=>env.AFW_QA_PROVISIONING.get(env.AFW_QA_PROVISIONING.idFromName('own-qa')).read(ref)});
  }
  read(){return this.reader.read();}
  readOccurrenceApproval(){return this.reader.readOccurrenceApproval();}
  fetch(){return new Response(null,{status:404});}
 }
 
 // Private host only. Missing catalog/custody stays closed. No caller approval,
 // provisioning, registration, HTTP routes or implicit enrollment.
 export class IndependentClosure extends DurableObject {
+ #finiteLaunch(operation,args,keys){
+  const parent=createPrivateQaFiniteLaunchParent({deadline:Date.now()+5000});
+  if(args.length!==1)throw Error('Finite launch unavailable');
+  const refs=finiteReadFields(args[0],keys);
+  return runPrivateQaFiniteLaunchOperation({ctx:this.ctx,env:this.env,operation,refs,parent});
+ }
+ prepareFiniteNominalLaunch(...args){return this.#finiteLaunch('prepare',args,['intentId','sourceRevision']);}
+ createFiniteNominalChild(...args){return this.#finiteLaunch('create',args,['intentId','controlHash']);}
+ readFiniteNominalLaunch(...args){return this.#finiteLaunch('read',args,['intentId','controlHash']);}
+ readFiniteTrialFinalPrimary(...args){if(args.length!==1)throw Error('Finite primary unavailable');return readPrivateQaFiniteFinalPrimary({ctx:this.ctx,env:this.env,refs:args[0]});}
+ previewFiniteTrialMaterial(...args){if(args.length!==1)throw Error('Finite preview unavailable');return previewPrivateQaFiniteTrialMaterial({ctx:this.ctx,env:this.env,refs:args[0]});}
+ claimFiniteTrialQaRestore(...args){if(args.length!==1)throw Error('Finite claim unavailable');return claimPrivateQaFiniteTrialRestore({ctx:this.ctx,env:this.env,refs:args[0]});}
+ async #finiteRead(fn,args,keys){if(args.length!==1||!isPrivateCanaryRestorationActor(this.env,this.ctx))throw Error('Finite read unavailable');const refs=finiteReadFields(args[0],keys);return fn({...refs,storage:this.ctx.storage});}
+ async readFiniteTrialNominalControl(...args){if(args.length!==1||!isPrivateCanaryRestorationActor(this.env,this.ctx))throw Error('Finite nominal control unavailable');return readPrivateQaFiniteNominalControl({ctx:this.ctx,env:this.env,refs:args[0]});}
+ readFiniteTrialCleanupProofHead(...args){return this.#finiteRead(readFiniteTrialCleanupProofHead,args,['intentId','controlHash']);}
+ readRetainedFiniteCleanupProof(...args){return this.#finiteRead(readRetainedFiniteCleanupProof,args,['intentId','proofHash']);}
+ readFiniteTrialCleanupCompletion(...args){return this.#finiteRead(readFiniteTrialCleanupCompletion,args,['intentId','controlHash','proofHash']);}
  readOwnQaGenerationPreparation(...args){return readPrivateQaGenerationPreparation({env:this.env,ctx:this.ctx,args});}
  readOwnQaNamedPacket(...args){return readPrivateQaNamedPacket({env:this.env,ctx:this.ctx,args});}
  readOwnQaGeneration(...args){return readPrivateQaCurrentGeneration({env:this.env,ctx:this.ctx,args});}
  readOwnQaRetainedGeneration(...args){return readPrivateQaRetainedGeneration({env:this.env,ctx:this.ctx,args});}
  observeOwnQaClosedContext(payload){return JSON.stringify(observePrivateQaClosedActor({env:this.env,ctx:this.ctx,payload}));}
  #mcpPublisher;
  #publisher(){return this.#mcpPublisher??=createPrivateClosurePublisherProbe({env:this.env,ctx:this.ctx});}
  async runOwnClosurePublisherProbe(...args){return JSON.stringify(await this.#publisher().run(...args));}
  #mcpReader;
  #reader(){return this.#mcpReader??=createPrivateClosureReaderProbe({env:this.env,ctx:this.ctx});}
@@ -202,15 +227,15 @@
   const legacy=()=>env.AFW_QA_CATALOG.get(env.AFW_QA_CATALOG.idFromName('own-qa'));
   const primaryScope=async()=>{if(env.AFW_QA_PRIMARY_CATALOG_ENABLED!=='true')return null;const value=await env.AFW_QA_PREREGISTRY.get(env.AFW_QA_PREREGISTRY.idFromName('own-qa')).readOwnClosureScope();try{return structuredClone(value);}finally{value?.[Symbol.dispose]?.();}};
   const catalog=()=>env.AFW_QA_PRIMARY_CATALOG_ENABLED==='true'?{read:async()=>(await primaryScope())?.registration??null,readOccurrenceApproval:async()=>(await primaryScope())?.approval??null}:legacy();
   this.actor=createApprovedQaClosureHost({context:ctx,db:env.AFW_QA_DB,
    readApproval:()=>catalog().readOccurrenceApproval(),catalog:{read:()=>catalog().read()},
    readIdentityCredential:async()=>env.AFW_QA_IDENTITY_API_TOKEN,
    readAdministrativeCredential:async()=>env.AFW_QA_ADMIN_READ_API_TOKEN});
  }
  arm(){if(isPrivateCanaryRestorationActor(this.env,this.ctx))return Promise.resolve({state:'unavailable'});return this.actor.arm();}
  status(){if(isPrivateCanaryRestorationActor(this.env,this.ctx))return Promise.resolve({state:'unavailable'});return this.actor.status();}
- alarm(){if(isPrivateCanaryRestorationActor(this.env,this.ctx))return Promise.resolve({state:'unavailable'});return this.actor.alarm();}
+ async alarm(){if(isPrivateCanaryRestorationActor(this.env,this.ctx)){const finite=await runPrivateQaFiniteTrialAlarm({ctx:this.ctx,env:this.env});return finite??{state:'unavailable'};}return this.actor.alarm();}
  fetch(){return new Response(null,{status:404});}
 }
 const worker={async fetch(request,env){if(new URL(request.url).pathname.startsWith('/assistance/occurrences/'))return fetchOwnOccurrence(request,env);if(env?.AFW_QA_CHALLENGE_ENABLED!=='true'||!challengePath(request)||!env.AFW_QA_PREREGISTRY)return new Response(null,{status:404});try{return await env.AFW_QA_PREREGISTRY.get(env.AFW_QA_PREREGISTRY.idFromName('own-qa')).fetch(request);}catch{return Response.json({code:'unavailable'},{status:503,headers:{'Cache-Control':'no-store'}});}}};
 export default worker;

~~~~~~~~~~

## worker/mcp-own/index.mjs

~~~~~~~~~~diff
diff --git a/worker/mcp-own/index.mjs b/worker/mcp-own/index.mjs
--- a/worker/mcp-own/index.mjs
+++ b/worker/mcp-own/index.mjs
@@ -1,47 +1,68 @@
+import {resolveFiniteOwnNativeCleanupHost} from '../../lib/mcp-own-finite-cleanup-host.mjs';
 import {withdrawOwnPermissions} from '../../lib/mcp-own-permission-withdrawal-host.mjs';
 import {DurableObject,WorkerEntrypoint} from 'cloudflare:workers';
 import {readOwnSuccessorHost} from '../../lib/mcp-own-successor-host.mjs';
 import {observeOwnSuccessorRetiredCustody} from '../../lib/mcp-own-successor-retirement-host.mjs';
 import {createRetiredRpcReceipt} from '../../lib/mcp-retired-rpc-receipt.mjs';
 import {observeOwnRetiredCustody} from '../../lib/mcp-own-retirement-host.mjs';
 import {createDelegatedOAuthWorker} from '../../lib/delegated-oauth-worker.mjs';
 import {createOwnDurableEventHost} from '../../lib/mcp-own-durable-host.mjs';
 import {createDossierEventRpcAuthority,readDossierEventHostPolicy} from '../../lib/dossier-event-rpc-authority.mjs';
 import {runOwnEventSchedule,readClosedOwnScheduleWitness} from '../../lib/mcp-own-event-schedule.mjs';
 import {createOwnSyntheticSaveHost} from '../../lib/mcp-own-synthetic-save-host.mjs';
 import {observeMcpDiscoveryRequest,observeMcpEventAuthority,createMcpRpcCatalogDiagnostic} from '../../lib/mcp-discovery-diagnostic.mjs';
 const deny=()=>new Response('{"code":"unavailable"}',{status:404,headers:{'Content-Type':'application/json','Cache-Control':'no-store'}});
 const fail=()=>{throw Error('Private event Node unavailable');};
 // Build replaces these public program/revision literals; no key is embedded.
+// Entrypoint family is fixed in compiled bytes, never read from caller/env.
+// Metadata and source qualification must still prove this profile before ARM.
+const finiteEntrypoint=globalThis.__AFW_FINITE_ENTRYPOINT_PROFILE__==='finite_trial_event';
 const program=globalThis.__AFW_NODE_PROGRAM__??'',sourceRevision=globalThis.__AFW_NODE_SOURCE_REVISION__??'';
 
 export class AfwOwnEventNode extends DurableObject{
+ #finite(){
+  const nativeCleanup=Object.freeze({program,programSourceRevision:sourceRevision,close:async boundary=>{
+   const c=this.#host(true),assertCurrent=()=>{boundary.assertCurrent();c.current();if(boundary.signal.aborted)fail();};
+   assertCurrent();const result=await c.host.close({...boundary,assertCurrent});assertCurrent();return result;
+  }});
+  return resolveFiniteOwnNativeCleanupHost({ctx:this.ctx,env:this.env,nativeCleanup});
+ }
  #host(historical=false,diagnostic){
   const trace=stage=>{try{diagnostic?.record(stage);}catch{}};
   const config=readDossierEventHostPolicy({enabled:historical||this.env.AFW_DOSSIER_EVENTS_ENABLED==='true',env:this.env,historical}),p=config.policy;
   trace('native_policy_ready');
   const successor=historical?null:readOwnSuccessorHost({env:this.env,ctx:this.ctx,program,sourceRevision,window:{startAt:p.startAt,expiresAt:p.expiresAt}});
   trace('native_successor_ready');
   if(this.ctx.id.toString()!==p.containerId)fail();const secret=this.env.AFW_DOSSIER_EVENTS_CUSTODY_KEY;
   if(typeof secret!=='string'||secret.length!==44)fail();const key=Buffer.from(secret,'base64');if(key.length!==32||key.toString('base64')!==secret){key.fill(0);fail();}
   trace('native_custody_ready');
   let host;try{host=createOwnDurableEventHost({...(successor?{successor:successor.successor}:{}),enabled:true,db:config.pins.DB,context:{grantId:p.grantId,subject:p.subject,clientId:p.clientId,resource:p.resource,scopes:['afw:project:read']},projectId:p.projectId,projectionSecret:config.pins.AFW_DOSSIER_EVENTS_PROJECTION_SECRET,custodyKey:key,ctx:this.ctx,program,sourceRevision,window:{startAt:p.startAt,expiresAt:p.expiresAt},makeControl:props=>this.ctx.exports.AfwNodeControl({props}),now:Date.now},trace);}finally{key.fill(0);}
   return{host,current:()=>{config.current();successor?.current();}};
  }
  async #call(method,...args){
   const diagnostic=method==='list'?createMcpRpcCatalogDiagnostic({env:this.env,sourceRevision}):null;
   diagnostic?.record('native_received');
   try{const c=this.#host(false,diagnostic);diagnostic?.record('native_host_ready');c.current();const result=await c.host[method](...args);c.current();diagnostic?.record('native_returned');return result;}
   catch{diagnostic?.record('native_failed');fail();}
  }
  fetch(){return deny();}
+ // Private fixed finite methods; closed profiles have no compiled factory.
+ async withdrawFiniteTrialPermissions(...args){if(args.length!==1)fail();const h=await this.#finite();return h.withdrawFiniteTrialPermissions(args[0]);}
+ async closeFiniteTrial(...args){if(args.length!==1)fail();const h=await this.#finite();return h.closeFiniteTrial(args[0]);}
+ async readFiniteTrialReductionReceipts(...args){if(args.length!==1)fail();const h=await this.#finite();return h.readFiniteTrialReductionReceipts(args[0]);}
+ async readFiniteTrialAdmissionJournal(...args){if(args.length!==1)fail();const h=await this.#finite();return h.readFiniteTrialAdmissionJournal(args[0]);}
+ async beginFiniteTrialReservation(...args){if(args.length!==1)fail();const h=await this.#finite();return h.beginFiniteTrialReservation(args[0]);}
+ async settleFiniteTrialReservation(...args){if(args.length!==1)fail();const h=await this.#finite();return h.settleFiniteTrialReservation(args[0]);}
+ async sealFiniteTrialAdmission(...args){if(args.length!==1)fail();const h=await this.#finite();return h.sealFiniteTrialAdmission(args[0]);}
+ async readFiniteTrialCleanupReadiness(...args){if(args.length!==1)fail();const h=await this.#finite();return h.readFiniteTrialCleanupReadiness(args[0]);}
+ async observeFiniteTrialCleanup(...args){if(args.length!==1)fail();const h=await this.#finite();return h.observeFiniteTrialCleanup(args[0]);}
  // Private original-custody observation; no caller selectors or live runtime.
  async observeRetired(...args){try{if(args.length)fail();return await observeOwnRetiredCustody({env:this.env,ctx:this.ctx});}catch{fail();}}
  // Fixed read-only challenged wrappers. No selectors, fallback or new authority.
  async observeRetiredReceipt(...args){try{if(args.length!==1)fail();return await createRetiredRpcReceipt({challenge:args[0],observe:async()=>({value:await this.observeRetired()})});}catch{fail();}}
  async observeSuccessorRetiredReceipt(...args){try{if(args.length!==1)fail();return await createRetiredRpcReceipt({challenge:args[0],observe:async()=>({value:await this.observeSuccessorRetired()})});}catch{fail();}}
  // Separate successor readback; preserves original observeRetired policy.
  async observeSuccessorRetired(...args){try{if(args.length)fail();return await observeOwnSuccessorRetiredCustody({env:this.env,ctx:this.ctx,program,sourceRevision});}catch{fail();}}
  list(){return this.#call('list');}
  subscribe(value){return this.#call('subscribe',value);}
  unsubscribe(value){return this.#call('unsubscribe',value);}
@@ -53,32 +74,32 @@
  // must not depend on the live monitoring flag or window. Never starts Node.
  async close(){try{const c=this.#host(true);c.current();const result=await c.host.close();c.current();return result;}catch{fail();}}
  // Finite, server-fixed reduction. No RPC arguments or live grant renewal.
  async withdrawPermissionsForPlan(...args){if(args.length!==1||args[0]===undefined)fail();return this.#withdraw(args[0]);}
  async withdrawPermissions(...args){if(args.length)fail();return this.#withdraw();}
  async #withdraw(boundary){try{
   return await withdrawOwnPermissions({env:this.env,ctx:this.ctx,program,sourceRevision,now:Date.now,
    close:async(signal,assertStage,expiresAt)=>{const c=this.#host(true);const assertCurrent=()=>{assertStage();c.current();if(signal.aborted)fail();};assertCurrent();const result=await c.host.close({signal,assertCurrent,expiresAt});assertCurrent();return result;}},boundary);
  }catch{fail();}}
  // Internal producer reference only; never accept a caller-authored signal.
- deliverSaved(subscriptionId,eventId){return this.#call('deliverSaved',subscriptionId,eventId);}
- deliverOwnSaved(eventId){return this.#call('deliverOwnSaved',eventId);}
+ async deliverSaved(subscriptionId,eventId){if(finiteEntrypoint)fail();return this.#call('deliverSaved',subscriptionId,eventId);}
+ async deliverOwnSaved(eventId){if(finiteEntrypoint)fail();return this.#call('deliverOwnSaved',eventId);}
  async consume(request,serverProps){try{return await this.#call('consume',request,serverProps);}catch{return deny();}}
 }
 
 export class AfwNodeControl extends WorkerEntrypoint{
  async fetch(request){try{
   const c=readDossierEventHostPolicy({enabled:this.env.AFW_DOSSIER_EVENTS_ENABLED==='true',env:this.env}),p=this.ctx.props;
   if(!p||Object.getPrototypeOf(p)!==Object.prototype||Object.keys(p).length!==3||p.containerId!==c.policy.containerId||typeof p.processGeneration!=='string'||!/^[0-9a-f]{64}$/.test(p.processGeneration)||!Number.isSafeInteger(p.expiresAt)||p.expiresAt>c.policy.expiresAt||p.expiresAt<=Date.now())fail();
   const id=c.pins.AFW_DOSSIER_EVENTS_NODE.idFromString(c.policy.containerId);if(id.toString()!==c.policy.containerId)fail();c.current();
   const result=await c.pins.AFW_DOSSIER_EVENTS_NODE.get(id).consume(request,{containerId:p.containerId,processGeneration:p.processGeneration,expiresAt:p.expiresAt});c.current();return result;
  }catch{return deny();}}
 }
 
 const worker={fetch(request,env,ctx){
  if(new URL(request.url).pathname==='/qa/expediente')return createOwnSyntheticSaveHost({env,program,sourceRevision})(request);
  return observeMcpDiscoveryRequest({request,env,sourceRevision},diagnostic=>createDelegatedOAuthWorker({
   issuer:env.AFW_OAUTH_ISSUER,resource:env.AFW_OAUTH_RESOURCE,
   eventsAuthorityFactory:options=>observeMcpEventAuthority(diagnostic,()=>createDossierEventRpcAuthority({enabled:true,...options,diagnostic})),
  }).fetch(request,env,ctx));
-},async scheduled(controller,env){const result=await runOwnEventSchedule(controller,env);if(result===null){const witness=readClosedOwnScheduleWitness(controller,env,{sourceRevision});if(witness)console.info(JSON.stringify(witness));}return result;}};
+},async scheduled(controller,env){if(finiteEntrypoint)return null;const result=await runOwnEventSchedule(controller,env);if(result===null){const witness=readClosedOwnScheduleWitness(controller,env,{sourceRevision});if(witness)console.info(JSON.stringify(witness));}return result;}};
 export default worker;

~~~~~~~~~~

## lib/dossier-event-policy-data.mjs

~~~~~~~~~~diff
diff --git a/lib/dossier-event-policy-data.mjs b/lib/dossier-event-policy-data.mjs
--- /dev/null
+++ b/lib/dossier-event-policy-data.mjs
@@ -0,0 +1,19 @@
+// Pure private data grammar shared by live and historical hosts. No authority.
+const fail=()=>{throw Error('Dossier event RPC unavailable');};
+const id=x=>typeof x==='string'&&x.length>0&&x.length<=200&&x.trim()===x;
+export function parseDossierEventPolicyFields(raw,named){
+ if(typeof raw!=='string'||raw.length>4096)fail();const value=JSON.parse(raw),keys=['grantId','subject','projectId','clientId','resource',...(!named?['containerId']:[]),'startAt','expiresAt'];
+ if(!value||Object.getPrototypeOf(value)!==Object.prototype)fail();
+ const ds=Object.getOwnPropertyDescriptors(value),own=Reflect.ownKeys(ds);
+ if(own.length!==keys.length||own.some(k=>typeof k!=='string'||!keys.includes(k)||!Object.hasOwn(ds[k],'value')||!ds[k].enumerable))fail();
+ return Object.fromEntries(keys.map(k=>[k,ds[k].value]));
+}
+export function validateDossierEventPolicyData(p,{clientId,projectId,resource,issuer}){
+ if(!['grantId','subject','projectId','clientId','resource'].every(k=>id(p[k]))||typeof p.containerId!=='string'||!/^[0-9a-f]{64}$/.test(p.containerId)||!Number.isSafeInteger(p.startAt)||p.startAt<0||!Number.isSafeInteger(p.expiresAt)||p.expiresAt<=p.startAt||p.expiresAt-p.startAt>600000||p.clientId!==clientId||p.projectId!==projectId||p.resource!==resource||p.resource!==issuer+'/mcp'||new URL(issuer).origin!==issuer)fail();
+}
+export function parseDossierRetirementFields(raw){
+ const unavailable=()=>{throw Error('Private retirement unavailable');};
+ if(typeof raw!=='string'||raw.length>4096)unavailable();const parsed=JSON.parse(raw);
+ if(!parsed||Object.getPrototypeOf(parsed)!==Object.prototype||typeof parsed.programHash!=='string'||!/^[0-9a-f]{64}$/.test(parsed.programHash)||typeof parsed.sourceRevision!=='string'||!/^[0-9a-f]{40}$/.test(parsed.sourceRevision))unavailable();
+ const {programHash,sourceRevision,...policy}=parsed;return{programHash,sourceRevision,policy};
+}

~~~~~~~~~~

## lib/mcp-finite-child-primary.mjs

~~~~~~~~~~diff
diff --git a/lib/mcp-finite-child-primary.mjs b/lib/mcp-finite-child-primary.mjs
--- /dev/null
+++ b/lib/mcp-finite-child-primary.mjs
@@ -0,0 +1,29 @@
+import {finiteControlIdentity,finiteFields as fields,finiteHash as hash,finiteSame as same,finiteTime as time} from './mcp-finite-evidence.mjs';
+import {finiteAdmissionIdentity} from './mcp-own-finite-cleanup-proof.mjs';
+const fail=()=>{throw Error('Finite child primary unavailable');};
+const KINDS=['reservation','admission','launch'];
+/** Fixed server evidence, never request-supplied exclusions. Each complete
+ * inventory writer must match one exact native journal record, and vice versa.
+ * Global counts remain factual; only the computed OTHER set is empty. */
+export function validateFiniteChildPrimary({control,value,now=Date.now}={}){
+ const c=finiteControlIdentity(control),p=c.plan,x=fields(value,['purpose','primary','nativeJournal','writers']);
+ if(x.purpose!=='afw.qa-finite-child-primary.v1'||!Array.isArray(x.writers)||x.writers.length>3)fail();
+ const g=fields(x.nativeJournal,['status','identity','identityHash','sealed','seal','sealHash','writers','unresolvedWriters','launchNeverIssued','authorizesEffects','operationalReadiness']);
+ const identity=finiteAdmissionIdentity(c),identityHash=hash({purpose:'afw.own-finite-admission.v1',identity});
+ if(g.status!=='observed'||!same(g.identity,identity)||g.identityHash!==identityHash||g.sealed!==false||g.seal!==null||g.sealHash!==null||g.authorizesEffects!==false||g.operationalReadiness!==false)fail();fields(g.writers,KINDS);
+ const owned=[];for(const kind of KINDS){
+  const record=g.writers[kind];if(record===null)continue;fields(record,['claim','settlement']);
+  const q=fields(record.claim,['purpose','identityHash','kind','issuedAt','deadline']);
+  if(q.purpose!=='afw.own-finite-admission.v1:writer'||q.identityHash!==identityHash||q.kind!==kind||!time(q.issuedAt)||q.issuedAt<p.T0||q.issuedAt>=Math.min(p.N1,p.selectors.expiresAt)||q.issuedAt>now()||!time(q.deadline)||q.deadline<=q.issuedAt||q.deadline>Math.min(p.N1,p.selectors.expiresAt))fail();
+  if(record.settlement!==null){const r=fields(record.settlement,['purpose','identityHash','kind','claimHash','primaryRowHash','settledAt']);if(r.purpose!=='afw.own-finite-admission.v1:settled'||r.identityHash!==identityHash||r.kind!==kind||r.claimHash!==hash(q)||!(/^[a-f0-9]{64}$/).test(r.primaryRowHash)||!time(r.settledAt)||r.settledAt<q.issuedAt||r.settledAt>now())fail();}
+  owned.push({intentId:p.intentId,controlHash:c.controlHash,actorId:p.resources.containerId,kind,claimHash:hash(q),phase:record.settlement===null?'issued':'settled'});
+ }
+ const seen=new Set();for(const writer of x.writers){
+  const w=fields(writer,['intentId','controlHash','actorId','kind','claimHash','phase','current','newScope','unresolved']);
+  if(seen.has(w.kind)||['current','newScope','unresolved'].some(k=>typeof w[k]!=='boolean')||!owned.some(o=>Object.keys(o).every(k=>o[k]===w[k])))fail();seen.add(w.kind);
+ }
+ if(seen.size!==owned.length||g.unresolvedWriters!==owned.filter(x=>x.phase==='issued').length||g.launchNeverIssued!==(g.writers.launch===null))fail();
+ const q=x.primary?.quiescence;
+ if(!q||q.completeInventory!==true||q.currentWriters!==x.writers.filter(w=>w.current).length||q.newScopeWriters!==x.writers.filter(w=>w.newScope).length||q.unresolvedWrites!==x.writers.filter(w=>w.unresolved).length||q.inventoryHash!==hash(x.writers)||q.receiptsHash!==hash(g))fail();
+ return Object.freeze({primary:x.primary,ownedWriters:Object.freeze(owned)});
+}

~~~~~~~~~~

## lib/mcp-finite-cleanup-policy.mjs

~~~~~~~~~~diff
diff --git a/lib/mcp-finite-cleanup-policy.mjs b/lib/mcp-finite-cleanup-policy.mjs
--- /dev/null
+++ b/lib/mcp-finite-cleanup-policy.mjs
@@ -0,0 +1,16 @@
+import {createHash} from 'node:crypto';
+import {finiteFields as fields,finiteData as data,finiteHex as hex,finiteTime as time,finiteSame as same} from './mcp-finite-evidence.mjs';
+const fail=()=>{throw Error('Finite cleanup policy unavailable');};
+export function validateFiniteModule(value){
+ const m=fields(value,['name','sha256','bytes']);
+ if(typeof m.name!=='string'||!/^[A-Za-z0-9][A-Za-z0-9._/-]{0,127}$/.test(m.name)||m.name.includes('..')||!hex(m.sha256)||!Number.isSafeInteger(m.bytes)||m.bytes<1||m.bytes>4194304)fail();return m;
+}
+/** Canonical private policy derived from immutable plan fields; no historical
+ * policy reuse, caller-selected operation/path/body, or additional permission. */
+export function finiteCleanupPolicy(plan){
+ const p=plan,s=p.selectors,r=p.resources,target=p.deployments.canaryClosed;
+ const policy=data({purpose:'afw.finite-cleanup-policy.v1',intentId:p.intentId,trialId:p.trialId,grantHash:p.grantHash,containerId:r.containerId,applicationId:r.applicationId,programHash:s.programHash,programSourceRevision:s.sourceRevision,notBefore:p.C0,expiresAt:p.C1,withdrawalPolicyHash:p.withdrawalPolicyHash,canaryClosed:{versionId:target.versionId,configurationHash:target.configurationHash,module:validateFiniteModule(target.module)}});
+ if(!time(policy.notBefore)||!time(policy.expiresAt)||policy.expiresAt-policy.notBefore!==180000)fail();return policy;
+}
+export const finiteCleanupPolicyHash=p=>createHash('sha256').update(JSON.stringify(finiteCleanupPolicy(p))).digest('hex');
+export function parseFiniteCleanupPolicy(raw,plan){if(typeof raw!=='string'||Buffer.byteLength(raw)>4096)fail();const v=data(JSON.parse(raw)),expected=finiteCleanupPolicy(plan);if(JSON.stringify(v)!==raw||!same(v,expected)||createHash('sha256').update(raw).digest('hex')!==plan.closePolicyHash)fail();return v;}

~~~~~~~~~~

## lib/mcp-finite-evidence.mjs

~~~~~~~~~~diff
diff --git a/lib/mcp-finite-evidence.mjs b/lib/mcp-finite-evidence.mjs
--- /dev/null
+++ b/lib/mcp-finite-evidence.mjs
@@ -0,0 +1,28 @@
+import {finiteLauncherInstanceId,validateFiniteLaunchPolicy} from './mcp-qa-finite-launch-records.mjs';
+import {createHash} from 'node:crypto';
+export const finiteHash=value=>createHash('sha256').update(JSON.stringify(value)).digest('hex');
+export const finiteHex=(v,n=64)=>typeof v==='string'&&new RegExp('^[a-f0-9]{'+n+'}$').test(v);
+export const finiteTime=v=>Number.isSafeInteger(v)&&v>=0&&v<=8640000000000000;
+export function finiteFields(v,keys){if(!v||Object.getPrototypeOf(v)!==Object.prototype||Reflect.ownKeys(v).length!==keys.length)throw Error('Finite evidence unavailable');const out={};for(const k of keys){const d=Object.getOwnPropertyDescriptor(v,k);if(!d?.enumerable||!Object.hasOwn(d,'value'))throw Error('Finite evidence unavailable');out[k]=d.value;}return Object.freeze(out);}
+export function finiteData(value,depth=0,budget={n:0}){
+ if(++budget.n>2048||depth>12)throw Error('Finite evidence unavailable');
+ if(value===null||typeof value==='boolean'||typeof value==='number'&&Number.isFinite(value))return value;
+ if(typeof value==='string'){if(Buffer.byteLength(value)>32768)throw Error('Finite evidence unavailable');return value;}
+ if(!value||typeof value!=='object'||Object.getPrototypeOf(value)!==(Array.isArray(value)?Array.prototype:Object.prototype))throw Error('Finite evidence unavailable');
+ const result=Array.isArray(value)?[]:{};
+ for(const k of Reflect.ownKeys(value)){if(Array.isArray(value)&&k==='length')continue;const d=Object.getOwnPropertyDescriptor(value,k);if(typeof k!=='string'||['__proto__','constructor','toJSON'].includes(k)||!d?.enumerable||!Object.hasOwn(d,'value'))throw Error('Finite evidence unavailable');result[k]=finiteData(d.value,depth+1,budget);}
+ if(Array.isArray(value)&&(value.length!==result.length||Object.keys(result).length!==result.length))throw Error('Finite evidence unavailable');
+ if(depth===0&&Buffer.byteLength(JSON.stringify(result))>32768)throw Error('Finite evidence unavailable');return Object.freeze(result);
+}
+export const finiteSame=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
+export function finiteControlIdentity(control){
+ const c=finiteFields(finiteData(control),['plan','planHash','controlHash']);
+ if(!finiteHex(c.planHash)||!finiteHex(c.controlHash)||!c.plan||typeof c.plan!=='object')throw Error('Finite control unavailable');
+ const p=c.plan;
+ if(p.purpose!=='afw.qa-finite-trial-plan.v1'||!finiteTime(p.T0)||p.N1!==p.T0+300000||p.C0!==p.N1-60000||p.C1!==p.N1+120000||p.R1!==p.N1+180000||typeof p.intentId!=='string'||!p.resources||!p.canaryContainment||!p.selectors)throw Error('Finite control unavailable');
+ validateFiniteLaunchPolicy({T0:p.T0,launchPolicy:p.launchPolicy});
+ const workflows=finiteFields(p.workflows,['confirmation','bootstrap','launcher']);
+ if(workflows.confirmation!=='afw-release-'+p.bundleHash||workflows.launcher!==finiteLauncherInstanceId({intentId:p.intentId,sourceRevision:p.source.revision})||workflows.bootstrap===workflows.launcher)throw Error('Finite control unavailable');
+ const actual=createHash('sha256').update(p.purpose+'\n'+JSON.stringify(p)).digest('hex');if(actual!==c.planHash)throw Error('Finite control unavailable');
+ return c;
+}

~~~~~~~~~~

## lib/mcp-finite-primary-inventory.mjs

~~~~~~~~~~diff
diff --git a/lib/mcp-finite-primary-inventory.mjs b/lib/mcp-finite-primary-inventory.mjs
--- /dev/null
+++ b/lib/mcp-finite-primary-inventory.mjs
@@ -0,0 +1,63 @@
+import {snapshotOwnWorkerExecution} from './mcp-own-worker-execution.mjs';
+import {createHash} from 'node:crypto';
+import {RELEASE_TARGET} from './mcp-release-operator-policy.mjs';
+import {restorationConfigurationHash,qaClosedConfigurationHash} from './mcp-restoration-configuration.mjs';
+import {validateFiniteModule} from './mcp-finite-cleanup-policy.mjs';
+import {finiteControlIdentity,finiteFields as fields,finiteHex as hex,finiteHash as hash,finiteTime as time} from './mcp-finite-evidence.mjs';
+const ROOT='/accounts/'+RELEASE_TARGET.accountId;
+const fail=()=>{throw Error('Finite primary inventory unavailable');};
+const digest=v=>createHash('sha256').update(v).digest('hex');
+const date=v=>{if(typeof v!=='string'||!/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d\.\d{3}Z$/.test(v))fail();const n=Date.parse(v);if(!time(n)||new Date(n).toISOString()!==v)fail();return n;};
+/** Exact approved artifact bytes and configuration; not Workflow.versionId.
+ * Static profile compatibility is checked in addition to the pinned digest. */
+export function qualifyFiniteWorkerVersion({metadata:v,pin,role,closed}={}){
+ const m=validateFiniteModule(pin?.module);
+ if(!['qa','canary','operator'].includes(role)||typeof closed!=='boolean'||!v||Object.getPrototypeOf(v)!==Object.prototype||v.id!==pin.versionId||v.main_module!==m.name||!Array.isArray(v.modules)||v.modules.length!==1||v.modules[0].name!==m.name||v.modules[0].content_type!=='application/javascript+module'||typeof v.modules[0].content_base64!=='string'||v.modules[0].content_base64.length>Math.ceil(m.bytes/3)*4||!Array.isArray(v.bindings)||v.bindings.length>100||!Array.isArray(v.urls)||v.urls.length)fail();
+ const bytes=Buffer.from(v.modules[0].content_base64,'base64');if(bytes.toString('base64')!==v.modules[0].content_base64||bytes.length!==m.bytes||digest(bytes)!==m.sha256)fail();
+ const names=new Set();for(const b of v.bindings){
+  if(!b||typeof b.name!=='string'||names.has(b.name)||!/^[_A-Za-z][_A-Za-z0-9]{0,127}$/.test(b.name))fail();names.add(b.name);
+  if(b.type==='secret_text'&&Reflect.ownKeys(b).length!==2)fail();
+  if(closed&&b.name.endsWith('_ENABLED')&&(b.type!=='plain_text'||b.text!=='false'))fail();
+ }
+ if((role==='qa'?qaClosedConfigurationHash(v):restorationConfigurationHash(v))!==pin.configurationHash)fail();
+ if(v.compatibility_date!=='2026-09-07'||!Array.isArray(v.compatibility_flags)||!v.compatibility_flags.includes('nodejs_compat'))fail();
+ const binding=name=>v.bindings.find(x=>x.name===name);
+ if(role==='canary')snapshotOwnWorkerExecution({exports:v.exports,containers:v.containers});
+ if(role==='canary'||role==='operator'){
+  const db=binding(role==='canary'?'DB':'RELEASE_DB'),node=binding(role==='canary'?'AFW_DOSSIER_EVENTS_NODE':'AFW_RELEASE_EVENTS_NODE');
+  if(db?.type!=='d1'||db.id!==RELEASE_TARGET.databaseId||node?.type!=='durable_object_namespace'||node.namespace_id!==RELEASE_TARGET.namespaceId||node.class_name!=='AfwOwnEventNode')fail();
+ }else{
+  const node=binding('AFW_INDEPENDENT_CLOSURE');if(node?.type!=='durable_object_namespace'||node.class_name!=='IndependentClosure')fail();
+ }
+ return Object.freeze({versionId:pin.versionId,moduleHash:m.sha256,moduleBytes:m.bytes,configurationHash:pin.configurationHash,closed});
+}
+/** Complete bounded all-state inventory, not the active count or a 404.
+ * API cursor exhaustion is checked; >64 instances/4pages fails closed. */
+export function createFiniteProviderInventoryReader({control,request,now=Date.now}={}){
+ const c=finiteControlIdentity(control),p=c.plan;
+ if(p.resources.applicationId!==RELEASE_TARGET.namespaceId||typeof request!=='function'||typeof now!=='function')fail();
+ return async({signal,assertCurrent=()=>{}}={})=>{
+  if(!(signal instanceof AbortSignal)||signal.aborted||typeof assertCurrent!=='function')fail();
+  const entered=now(),mono=performance.now();let last=entered;
+  const check=()=>{assertCurrent();const n=now();if(signal.aborted||!time(n)||n<last||n-entered>=5000||performance.now()-mono>=5000)fail();last=n;return n;};
+  const instances=[],seen=new Set(),tokens=new Set();let token;
+  for(let page=0;page<4;page++){
+   check();const response=await request({method:'GET',path:ROOT+'/containers/applications/'+p.resources.applicationId+'/instances-v2',query:{per_page:100,...(token?{page_token:token}:{})},signal},check);check();
+   if(response?.success!==true||response.status!==200||!Array.isArray(response.errors)||response.errors.length||!Array.isArray(response.result)||response.result.length>100)fail();
+   const info=fields(response.result_info,['per_page',...['page_token','next_page_token'].filter(k=>Object.hasOwn(response.result_info??{},k))]);
+   if(info.per_page!==100||(info.page_token??'')!==(token??''))fail();
+   for(const row of response.result){
+    if(!row||!hex(row.id)||seen.has(row.id)||row.application_id!==p.resources.applicationId||row.image!=='cloudflare/debian-trixie'||row.status?.state!=='stopped'||row.status.exit_code!==0)fail();
+    const startedAt=date(row.started_at),stoppedAt=date(row.status.updated_at);if(stoppedAt<startedAt||stoppedAt>check())fail();seen.add(row.id);
+    instances.push({containerId:row.id,applicationId:row.application_id,image:row.image,startedAt,stoppedAt,state:'stopped',exitCode:0});
+   }
+   if(instances.length>64)fail();
+   const next=info.next_page_token;if(next===undefined||next===''){
+    instances.sort((a,b)=>a.containerId.localeCompare(b.containerId));
+    return Object.freeze({purpose:'afw.finite-provider-inventory.v1',applicationId:p.resources.applicationId,observedAt:check(),instances:Object.freeze(instances),totalCount:instances.length});
+   }
+   if(page===3||typeof next!=='string'||next.length<1||next.length>1024||/[\x00-\x20\x7f]/.test(next)||tokens.has(next))fail();tokens.add(next);token=next;
+  }fail();
+ };
+}
+export const finiteInventoryHash=hash;

~~~~~~~~~~

## lib/mcp-own-finite-admission-gate.mjs

~~~~~~~~~~diff
diff --git a/lib/mcp-own-finite-admission-gate.mjs b/lib/mcp-own-finite-admission-gate.mjs
--- /dev/null
+++ b/lib/mcp-own-finite-admission-gate.mjs
@@ -0,0 +1,132 @@
+import {requireFiniteNativeAdmissionSource,assertNativeFinitePrepared,nativeFiniteInsertConstraint,isNativeFinitePreparedDenial} from './mcp-own-finite-primary.mjs';
+import {createHash} from 'node:crypto';
+const ROOT='afw.own-finite-admission.v1',KEY=ROOT+':head',KINDS=['reservation','admission','launch'];
+const gates=new WeakMap(),releaseGates=new WeakMap(),writerLeases=new WeakMap();
+const fail=()=>{throw Error('Finite admission unavailable');};
+const hash=v=>createHash('sha256').update(JSON.stringify(v)).digest('hex');
+const hex=(v,n=64)=>typeof v==='string'&&new RegExp('^[a-f0-9]{'+n+'}$').test(v);
+const time=v=>Number.isSafeInteger(v)&&v>=0&&v<=8640000000000000;
+const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
+function exact(v,keys){if(!v||Object.getPrototypeOf(v)!==Object.prototype||Reflect.ownKeys(v).length!==keys.length)fail();const out={};for(const k of keys){const d=Object.getOwnPropertyDescriptor(v,k);if(!d?.enumerable||!Object.hasOwn(d,'value'))fail();out[k]=d.value;}return Object.freeze(out);}
+const result=(status,extra={})=>Object.freeze({status,...extra,authorizesEffects:false,operationalReadiness:false});
+/** INTERNAL fixed candidate-DO journal. A seal is not remote cancellation.
+ * Any issued writer lacking its exact immutable settlement remains unresolved.
+ * RPC adapters may expose only the fixed no-argument operations selected by the
+ * native intent/control configuration; never accept a writer kind or receipt. */
+export function createFiniteAdmissionGate(options){
+ const keys=[...(Object.hasOwn(options??{},'admissionSource')?['admissionSource']:[]),'storage','identity','readPrimary','readNominalControl','nominalIdentity','now','timeoutMs'],o=exact(options,keys);
+ const {storage,readPrimary,readNominalControl,now,timeoutMs}=o;
+ const nominalIdentity=exact(o.nominalIdentity,['sourceRevision','runtimeVersionId','actorId','monitorHash','consentExpiresAt']);
+ if(typeof readNominalControl!=='function'||!hex(nominalIdentity.sourceRevision,40)||!hex(nominalIdentity.actorId)||!hex(nominalIdentity.monitorHash)||!time(nominalIdentity.consentExpiresAt))fail();
+ const identity=exact(o.identity,['intentId','controlHash','planHash','containerId','applicationId','grantHash','trialId','sourceRevision','runtimeVersionId','T0','N1','C1']);
+ if(!/^[A-Za-z0-9][A-Za-z0-9._:-]{0,127}$/.test(identity.intentId)||['controlHash','planHash','containerId','grantHash','trialId'].some(k=>!hex(identity[k]))||!hex(identity.sourceRevision,40)||!hex(identity.applicationId,32)||!(/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/).test(identity.runtimeVersionId)||!time(identity.T0)||identity.N1!==identity.T0+300000||identity.C1!==identity.N1+120000||typeof storage?.transaction!=='function'||typeof storage?.get!=='function'||typeof now!=='function'||!Number.isSafeInteger(timeoutMs)||timeoutMs<1||timeoutMs>5000)fail();
+ if(o.admissionSource!==undefined)requireFiniteNativeAdmissionSource(o.admissionSource,identity);
+ const readers=exact(readPrimary,KINDS);if(KINDS.some(k=>typeof readers[k]!=='function'))fail();
+ const transaction=storage.transaction,get=storage.get,identityHash=hash({purpose:ROOT,identity});let last=-1,invalid=false;
+ function current(){const n=now();if(invalid||!time(n)||n<identity.T0||n<last||storage.transaction!==transaction||storage.get!==get||!same(exact(o.identity,Object.keys(identity)),identity)||keys.some(k=>options[k]!==o[k])||KINDS.some(k=>readPrimary[k]!==readers[k])){invalid=true;fail();}last=n;return n;}
+ const claim=(kind,deadline)=>Object.freeze({purpose:ROOT+':writer',identityHash,kind,issuedAt:current(),deadline});
+ function state(raw){
+  if(raw===undefined)return null;
+  const s=exact(raw,['purpose','identity','identityHash','seal','writers']);
+  if(s.purpose!==ROOT||!same(s.identity,identity)||s.identityHash!==identityHash)fail();
+  const writers=exact(s.writers,KINDS);
+  if(s.seal!==null){const x=exact(s.seal,['purpose','identityHash','sealedAt']);if(x.purpose!==ROOT+':seal'||x.identityHash!==identityHash||!time(x.sealedAt)||x.sealedAt<identity.T0||x.sealedAt>=identity.C1||x.sealedAt>current())fail();}
+  for(const kind of KINDS){const w=writers[kind];if(w===null)continue;
+   exact(w,['claim','settlement']);const c=exact(w.claim,['purpose','identityHash','kind','issuedAt','deadline']);
+   if(c.purpose!==ROOT+':writer'||c.identityHash!==identityHash||c.kind!==kind||!time(c.issuedAt)||c.issuedAt<identity.T0||c.issuedAt>=identity.N1||c.issuedAt>current()||!time(c.deadline)||c.deadline<=c.issuedAt||c.deadline>identity.N1)fail();
+   if(w.settlement!==null)receipt(w.settlement,kind,c);
+  }return s;
+ }
+ function receipt(value,kind,c){
+  const r=exact(value,['purpose','identityHash','kind','claimHash','primaryRowHash','settledAt']);
+  if(r.purpose!==ROOT+':settled'||r.identityHash!==identityHash||r.kind!==kind||r.claimHash!==hash(c)||!hex(r.primaryRowHash)||!time(r.settledAt)||r.settledAt<c.issuedAt||r.settledAt>current()||r.settledAt>=identity.C1)fail();return r;
+ }
+ function projection(s){return result('observed',{identity,identityHash,sealed:s?.seal!==null&&s!==null,seal:s?.seal??null,sealHash:s?.seal?hash(s.seal):null,writers:s?.writers??Object.fromEntries(KINDS.map(k=>[k,null])),unresolvedWriters:s?KINDS.filter(k=>s.writers[k]&&!s.writers[k].settlement).length:0,launchNeverIssued:!s?.writers.launch});}
+ async function invoke(operation,kind){
+  let issued=false,finished=false,timer,nominalEnd=identity.N1,nominalSnapshotHash;const entered=current(),mono=performance.now();
+  const check=()=>{const n=current();if(finished||n-entered>=timeoutMs||performance.now()-mono>=timeoutMs)fail();if(operation==='begin'&&n>=nominalEnd||['seal','settle'].includes(operation)&&n>=identity.C1)fail();return n;};
+  const nominal=async()=>{
+   check();const v=exact(await readNominalControl(),['purpose','intentId','controlHash','planHash','sourceRevision','runtimeVersionId','actorId','observedAt','phase','withdrawnAt','claim','claimHash','ownedWriters','consent']);check();
+   if(v.purpose!=='afw.qa-finite-nominal-control.v1'||['intentId','controlHash','planHash'].some(k=>v[k]!==identity[k])||['sourceRevision','runtimeVersionId','actorId'].some(k=>v[k]!==nominalIdentity[k])||v.phase!=='armed'||v.withdrawnAt!==null||!time(v.observedAt)||v.observedAt>current()||current()-v.observedAt>5000)fail();
+   const claim=exact(v.claim,['purpose','intentId','controlHash','kind','phase','issuedAt','deadline','proofHash']),consent=exact(v.consent,['grantHash','monitorHash','expiresAt','valid']);
+   if(claim.purpose!=='afw.qa-finite-trial.v1:effect'||claim.intentId!==identity.intentId||claim.controlHash!==identity.controlHash||claim.kind!=='nominal'||claim.phase!=='issued'||claim.proofHash!==null||!time(claim.issuedAt)||claim.issuedAt<identity.T0||claim.issuedAt>current()||!time(claim.deadline)||claim.issuedAt>=claim.deadline||claim.deadline>Math.min(identity.N1,nominalIdentity.consentExpiresAt)||v.claimHash!==createHash('sha256').update('afw.qa-finite-trial.v1:effect\n'+JSON.stringify(claim)).digest('hex')||consent.grantHash!==identity.grantHash||consent.monitorHash!==nominalIdentity.monitorHash||consent.valid!==true||!time(consent.expiresAt)||consent.expiresAt>nominalIdentity.consentExpiresAt)fail();
+   const local=state(await get.call(storage,KEY));check();
+   const own=KINDS.filter(k=>local?.writers[k]).map(kind=>({intentId:identity.intentId,controlHash:identity.controlHash,actorId:identity.containerId,kind,claimHash:hash(local.writers[kind].claim),phase:local.writers[kind].settlement===null?'issued':'settled'}));
+   if(!Array.isArray(v.ownedWriters)||!same(v.ownedWriters,own))fail();nominalSnapshotHash=hash(local?.writers??null);
+   nominalEnd=Math.min(nominalEnd,claim.deadline,consent.expiresAt);check();
+  };
+  const tx=fn=>transaction.call(storage,async t=>{check();const raw=await t.get(KEY);check();const s=state(raw);return fn(t,s);});
+  const work=async()=>{
+   check();if(operation==='read'){const raw=await get.call(storage,KEY);check();return projection(state(raw));}
+   if(operation==='settle'){
+    const raw=await get.call(storage,KEY);check();const before=state(raw),w=before?.writers[kind];if(!w)return result('blocked');
+    if(w.settlement)return result('reconciled',{receipt:w.settlement});
+    // Reader is fixed server code. It must prove the exact issued write's
+    // durable terminal receipt, never infer settlement from row absence.
+    const value=await readers[kind](Object.freeze({identityHash,claimHash:hash(w.claim)}));check();
+    if(value===null)return result('admin_pending');
+    const r=receipt(value,kind,w.claim);
+    await tx(async(t,s)=>{if(!s||!same(s.writers[kind],w))fail();issued=true;await t.put(KEY,{...s,writers:{...s.writers,[kind]:{...w,settlement:r}}});check();});
+    const after=state(await get.call(storage,KEY));check();if(!same(after?.writers[kind]?.settlement,r))fail();return result('settled',{receipt:r});
+   }
+   if(operation==='begin'){const prior=state(await get.call(storage,KEY));check();if(prior?.seal)return prior.writers[kind]?result('reconcile_only',{claim:prior.writers[kind].claim}):result('blocked');await nominal();check();await nominal();check();}
+   const value=await tx(async(t,s)=>{
+    if(operation==='begin'&&hash(s?.writers??null)!==nominalSnapshotHash)fail();
+    const next=s??{purpose:ROOT,identity,identityHash,seal:null,writers:Object.fromEntries(KINDS.map(k=>[k,null]))};
+    if(operation==='seal'){
+     if(next.seal)return result('reconcile_only',{sealHash:hash(next.seal)});
+     const seal={purpose:ROOT+':seal',identityHash,sealedAt:check()};issued=true;await t.put(KEY,{...next,seal});check();return result('sealed',{sealHash:hash(seal)});
+    }
+    if(next.writers[kind])return result('reconcile_only',{claim:next.writers[kind].claim});
+    if(next.seal)fail();
+    const c=claim(kind,nominalEnd);issued=true;await t.put(KEY,{...next,writers:{...next.writers,[kind]:{claim:c,settlement:null}}});check();return result('issued',{claim:c});
+   });check();return value;
+  };
+  try{return await Promise.race([work(),new Promise(resolve=>{timer=setTimeout(()=>{finished=true;resolve(result(issued?'uncertain':'blocked'));},timeoutMs);})]);}catch{return result(issued?'uncertain':'blocked');}finally{finished=true;clearTimeout(timer);}
+ }
+ const token=Object.freeze({
+  beginReservation:()=>invoke('begin','reservation'),settleReservation:()=>invoke('settle','reservation'),
+  beginAdmission:()=>invoke('begin','admission'),settleAdmission:()=>invoke('settle','admission'),
+  beginLaunch:()=>invoke('begin','launch'),settleLaunch:()=>invoke('settle','launch'),
+  seal:()=>invoke('seal'),read:()=>invoke('read')
+ });
+ gates.set(token,{identity,identityHash,admissionSource:o.admissionSource});return token;
+}
+/** Private module hooks; an arbitrary lookalike object is never a gate. */
+export function requireFiniteAdmissionGate(gate,scope={},operation){const record=gates.get(gate);if(!record||record.remote&&operation!=='reservation'||Object.entries(scope).some(([k,v])=>record.identity[k]!==v))fail();return gate;}
+export function registerFiniteReleaseGate(env,gate){requireFiniteAdmissionGate(gate,{},'reservation');if(!env||releaseGates.has(env))fail();releaseGates.set(env,gate);}
+export function readFiniteReleaseGate(env){return releaseGates.get(env);}
+
+/** Private QA-to-candidate reservation adapter. The actual namespace supplies the
+ * two fixed RPCs. It cannot be used as a local admission/launch capability. */
+export function createFiniteReservationGateClient({namespace,identity,now=Date.now}={}){
+ const c=exact(identity,['intentId','controlHash','planHash','containerId','applicationId','grantHash','trialId','sourceRevision','runtimeVersionId','T0','N1','C1']);
+ if(typeof namespace?.idFromName!=='function'||typeof namespace?.get!=='function'||typeof now!=='function')fail();
+ const named=namespace.idFromName,get=namespace.get,id=named.call(namespace,'afw-own-event-first-successor-v1');if(id.toString()!==c.containerId)fail();
+ const call=async(method,until)=>{
+  const entered=now(),mono=performance.now();let ended=false,timer;
+  const check=()=>{const at=now();if(ended||!time(at)||at<entered||at>=until||at-entered>=5000||performance.now()-mono>=5000||namespace.idFromName!==named||namespace.get!==get||named.call(namespace,'afw-own-event-first-successor-v1').toString()!==c.containerId)fail();};
+  const work=async()=>{check();const result=await get.call(namespace,id)[method]({intentId:c.intentId,controlHash:c.controlHash});check();return result;};
+  try{return await Promise.race([work(),new Promise(resolve=>{timer=setTimeout(()=>{ended=true;resolve(result('uncertain'));},5000);})]);}catch{return result('uncertain');}finally{ended=true;clearTimeout(timer);}
+ };
+ const token=Object.freeze({beginReservation:()=>call('beginFiniteTrialReservation',c.N1),settleReservation:()=>call('settleFiniteTrialReservation',c.C1)});
+ gates.set(token,{identity:c,remote:true});return token;
+}
+
+/** Retain the issued writer's original finite lease across every consumer await.
+ * The gate is module-branded; a caller DTO never creates this authority. Cleanup
+ * and immutable settlement use their separate original C1 authority. */
+export function retainFiniteWriterDeadline(gate,value,kind,now,until){
+ requireFiniteAdmissionGate(gate,{},kind);const {identity}=gates.get(gate);
+ const c=exact(value,['purpose','identityHash','kind','issuedAt','deadline']);
+ if(c.purpose!==ROOT+':writer'||c.identityHash!==hash({purpose:ROOT,identity})||c.kind!==kind||!time(c.issuedAt)||c.issuedAt<identity.T0||!time(c.deadline)||c.deadline<=c.issuedAt||c.deadline>identity.N1||typeof now!=='function'||!time(until))fail();
+ const deadline=Math.min(until,c.deadline),entered=now(),mono=performance.now();if(!time(entered)||entered<c.issuedAt||entered>=deadline)fail();let last=entered;
+ const assertCurrent=()=>{const at=now();if(!time(at)||at<c.issuedAt||at<last||at>=deadline||performance.now()-mono>=deadline-entered)fail();last=at;return at;};
+ assertCurrent();const lease=Object.freeze({deadline,assertCurrent});writerLeases.set(lease,{gate,kind});return lease;
+}
+
+function admissionRecord(gate){requireFiniteAdmissionGate(gate,{},'admission');const r=gates.get(gate);requireFiniteNativeAdmissionSource(r.admissionSource,r.identity);return r;}
+export function requireFiniteAdmissionCustodySource(gate,scope){const r=admissionRecord(gate);requireFiniteNativeAdmissionSource(r.admissionSource,r.identity,scope);}
+export function assertFinitePreparedAdmission(gate){const r=admissionRecord(gate);return assertNativeFinitePrepared(r.admissionSource,r.identity);}
+export function finiteAdmissionInsertConstraint(gate,manifest,originalIssuedLease){const r=admissionRecord(gate),issued=writerLeases.get(originalIssuedLease);if(issued?.gate!==gate||issued.kind!=='admission')fail();return nativeFiniteInsertConstraint(r.admissionSource,r.identity,manifest,originalIssuedLease);}
+export function isFinitePreparedAdmissionDenial(gate,error){try{const r=admissionRecord(gate);return isNativeFinitePreparedDenial(r.admissionSource,r.identity,error);}catch{return false;}}

~~~~~~~~~~

## lib/mcp-own-finite-cleanup-host.mjs

~~~~~~~~~~diff
diff --git a/lib/mcp-own-finite-cleanup-host.mjs b/lib/mcp-own-finite-cleanup-host.mjs
--- /dev/null
+++ b/lib/mcp-own-finite-cleanup-host.mjs
@@ -0,0 +1,50 @@
+import {createFiniteOwnReductionActions} from './mcp-own-finite-reduction.mjs';
+import {finiteControlIdentity,finiteFields as fields,finiteSame as same} from './mcp-finite-evidence.mjs';
+import {finiteAdmissionIdentity,createFiniteNativeCleanupProofProducer} from './mcp-own-finite-cleanup-proof.mjs';
+import {createFiniteAdmissionGate} from './mcp-own-finite-admission-gate.mjs';
+import {createFiniteNativePrimaryReader} from './mcp-own-finite-primary.mjs';
+import {createSuccessorRetirementHandoff} from './mcp-successor-retirement-handoff.mjs';
+const fail=()=>{throw Error('Finite native cleanup unavailable');};
+const hosts=new WeakMap();let factory;
+/** Private constructor, called only by Task4's compiled actual-binding resolver.
+ * AFW_FINITE_TRIAL_VERSION is a NEW required version_metadata binding. Its
+ * absence in a closed/legacy profile denies these RPCs; this source adds none.
+ * Provider/custody readers are fixed server adapters, never RPC payloads. */
+export function createFiniteOwnNativeCleanupHost({ctx,env,control,sourceRevision,providerRead,readCustody,readInstance,readNominalControl,nativeCleanup,now=Date.now}={}){
+ const c=finiteControlIdentity(control),p=c.plan,storage=ctx?.storage,id=ctx?.id,db=env?.DB,namespace=env?.AFW_DOSSIER_EVENTS_NODE,version=env?.AFW_FINITE_TRIAL_VERSION;
+ if(typeof storage?.transaction!=='function'||typeof storage?.get!=='function'||typeof db?.withSession!=='function'||typeof namespace?.idFromName!=='function'||sourceRevision!==p.canaryContainment.sourceRevision||version?.id!==p.canaryContainment.runtimeVersionId||[providerRead,readCustody,readInstance,readNominalControl,now].some(x=>typeof x!=='function'))fail();
+ const ns=namespace.idFromName,transaction=storage.transaction,get=storage.get;
+ const current=()=>{if(ctx.storage!==storage||ctx.id!==id||env.DB!==db||env.AFW_DOSSIER_EVENTS_NODE!==namespace||env.AFW_FINITE_TRIAL_VERSION!==version||version.id!==p.canaryContainment.runtimeVersionId||namespace.idFromName!==ns||id.toString()!==p.resources.containerId||ns.call(namespace,'afw-own-event-first-successor-v1').toString()!==p.resources.containerId||storage.transaction!==transaction||storage.get!==get)fail();return now();};current();
+ const nativeAdmission=nativeCleanup===undefined?undefined:{ctx,env,program:fields(nativeCleanup,['program','programSourceRevision','close']).program,programSourceRevision:nativeCleanup.programSourceRevision};
+ const primary=createFiniteNativePrimaryReader({db,control:c,now:current,nativeAdmission}),gate=createFiniteAdmissionGate({...(primary.admissionSource?{admissionSource:primary.admissionSource}:{}),storage,identity:finiteAdmissionIdentity(c),readPrimary:{reservation:primary.reservation,admission:primary.admission,launch:primary.launch},readNominalControl,nominalIdentity:{sourceRevision:p.source.revision,runtimeVersionId:p.deployments.qaLive.versionId,actorId:p.resources.actorId,monitorHash:p.monitorHash,consentExpiresAt:p.selectors.expiresAt},now:current,timeoutMs:5000});
+ // Reuse the existing physical-retirement primitive in a finite-only namespace.
+ // No legacy handoff record is reset or interpreted as this generation.
+ const prefix='afw.own-finite-retirement.v1:'+p.intentId+':';
+ const detached={transaction:fn=>storage.transaction(tx=>fn({get:k=>tx.get(prefix+k),put:(k,v)=>tx.put(prefix+k,v)}))};
+ const producer=createFiniteNativeCleanupProofProducer({storage,gate,control:c,primaryRead:primary.read,providerRead,retirementRead:async({assertCurrent})=>{
+  const lease=()=>{assertCurrent();const at=current();if(at>=p.C1)fail();return at;};lease();
+  const handoff=createSuccessorRetirementHandoff({storage:detached,original:{containerId:p.resources.containerId,applicationId:p.resources.applicationId,programHash:p.selectors.programHash,sourceRevision:p.selectors.sourceRevision},readCustody,readInstance,now:lease,assertCurrent:lease,timeoutMs:5000});
+  let r=await handoff.observe();lease();if(r.status!=='retired_handoff_observed'){await handoff.capture();lease();r=await handoff.observe();lease();}return r;
+ },now:current});
+ const refs=(value,keys)=>{const x=fields(value,keys);current();if(x.intentId!==p.intentId||Object.hasOwn(x,'planHash')&&x.planHash!==c.planHash||Object.hasOwn(x,'controlHash')&&x.controlHash!==c.controlHash)fail();return x;};
+ const invoke=async(value,keys,fn)=>{refs(value,keys);const r=await fn();current();return r;};
+ const reductions=()=>{const n=fields(nativeCleanup,['program','programSourceRevision','close']);return createFiniteOwnReductionActions({ctx,env,control:c,...n,now:current});};
+ const host=Object.freeze({identity:c,gate,
+  withdrawFiniteTrialPermissions:value=>invoke(value,['intentId','controlHash'],()=>reductions().withdraw(value)),
+  closeFiniteTrial:value=>invoke(value,['intentId','controlHash'],()=>reductions().close(value)),
+  readFiniteTrialReductionReceipts:value=>invoke(value,['intentId','controlHash'],()=>reductions().read(value)),
+  readFiniteTrialAdmissionJournal:value=>invoke(value,['intentId','controlHash'],gate.read),
+  beginFiniteTrialReservation:value=>invoke(value,['intentId','controlHash'],gate.beginReservation),
+  settleFiniteTrialReservation:value=>invoke(value,['intentId','controlHash'],gate.settleReservation),
+  sealFiniteTrialAdmission:value=>invoke(value,['intentId','planHash'],gate.seal),
+  readFiniteTrialCleanupReadiness:value=>invoke(value,['intentId','planHash'],producer.ready),
+  observeFiniteTrialCleanup:value=>invoke(value,['intentId','planHash','proofChallenge'],()=>producer.observe(value))
+ });hosts.set(host,{ctx,env});return host;
+}
+/** Build-time internal mount only, no env/RPC function, arbitrary operation name,
+ * payload writer fact, new public authorization option or nominal reset. */
+export function installFiniteOwnNativeCleanupFactory(value){if(factory!==undefined||typeof value!=='function')fail();factory=value;}
+export async function resolveFiniteOwnNativeCleanupHost({ctx,env,nativeCleanup}){
+ if(typeof factory!=='function')fail();const host=await factory({ctx,env,nativeCleanup});
+ if(hosts.get(host)?.ctx!==ctx||hosts.get(host)?.env!==env||!same(host.identity,finiteControlIdentity(host.identity)))fail();return host;
+}

~~~~~~~~~~

## lib/mcp-own-finite-cleanup-proof.mjs

~~~~~~~~~~diff
diff --git a/lib/mcp-own-finite-cleanup-proof.mjs b/lib/mcp-own-finite-cleanup-proof.mjs
--- /dev/null
+++ b/lib/mcp-own-finite-cleanup-proof.mjs
@@ -0,0 +1,104 @@
+import {finiteFields as fields,finiteHash as hash,finiteHex as hex,finiteTime as time,finiteData as data,finiteSame as same,finiteControlIdentity} from './mcp-finite-evidence.mjs';
+const fail=()=>{throw Error('Finite cleanup proof unavailable');};
+const KINDS=['reservation','admission','launch'];
+export function finiteAdmissionIdentity(control){return proofAdmissionIdentity(finiteControlIdentity(control));}
+function proofAdmissionIdentity(c){const p=c.plan;return Object.freeze({intentId:p.intentId,controlHash:c.controlHash,planHash:c.planHash,containerId:p.resources.containerId,applicationId:p.resources.applicationId,grantHash:p.grantHash,trialId:p.trialId,sourceRevision:p.canaryContainment.sourceRevision,runtimeVersionId:p.canaryContainment.runtimeVersionId,T0:p.T0,N1:p.N1,C1:p.C1});}
+function validateGate(value,c,at){
+ const g=fields(value,['status','identity','identityHash','sealed','seal','sealHash','writers','unresolvedWriters','launchNeverIssued','authorizesEffects','operationalReadiness']);
+ const identity=proofAdmissionIdentity(c),identityHash=hash({purpose:'afw.own-finite-admission.v1',identity});
+ if(g.status!=='observed'||!same(g.identity,identity)||g.identityHash!==identityHash||g.sealed!==true||g.authorizesEffects!==false||g.operationalReadiness!==false||g.unresolvedWriters!==0)fail();
+ const seal=fields(g.seal,['purpose','identityHash','sealedAt']);
+ if(seal.purpose!=='afw.own-finite-admission.v1:seal'||seal.identityHash!==identityHash||!time(seal.sealedAt)||seal.sealedAt<c.plan.T0||seal.sealedAt>=c.plan.C1||seal.sealedAt>at||g.sealHash!==hash(seal))fail();
+ fields(g.writers,KINDS);
+ for(const kind of KINDS){const w=g.writers[kind];if(w===null)continue;
+  fields(w,['claim','settlement']);const x=fields(w.claim,['purpose','identityHash','kind','issuedAt','deadline']);
+  if(x.purpose!=='afw.own-finite-admission.v1:writer'||x.identityHash!==identityHash||x.kind!==kind||!time(x.issuedAt)||x.issuedAt<c.plan.T0||x.issuedAt>seal.sealedAt||x.issuedAt>=c.plan.N1||!time(x.deadline)||x.deadline<=x.issuedAt||x.deadline>c.plan.N1)fail();
+  const r=fields(w.settlement,['purpose','identityHash','kind','claimHash','primaryRowHash','settledAt']);
+  if(r.purpose!=='afw.own-finite-admission.v1:settled'||r.identityHash!==identityHash||r.kind!==kind||r.claimHash!==hash(x)||!hex(r.primaryRowHash)||!time(r.settledAt)||r.settledAt<x.issuedAt||r.settledAt>at||r.settledAt>=c.plan.C1)fail();
+ }
+ if(g.launchNeverIssued!==(g.writers.launch===null))fail();return g;
+}
+function primary(value,c,at){
+ const v=fields(value,['purpose','intentId','controlHash','observedAt','reservationHash','admissionHash','launchHash','closureHash','processGeneration']);
+ if(v.purpose!=='afw.finite-primary-snapshot.v1'||v.intentId!==c.plan.intentId||v.controlHash!==c.controlHash||!time(v.observedAt)||v.observedAt<c.plan.T0||v.observedAt>at||['reservationHash','admissionHash','launchHash','closureHash','processGeneration'].some(k=>v[k]!==null&&!hex(v[k])))fail();
+ if((v.admissionHash===null)!==(v.processGeneration===null)||v.launchHash!==null&&v.admissionHash===null)fail();return v;
+}
+function provider(value,c,at){
+ const v=fields(value,['purpose','applicationId','observedAt','instances','totalCount']);
+ if(v.purpose!=='afw.finite-provider-inventory.v1'||v.applicationId!==c.plan.resources.applicationId||!time(v.observedAt)||v.observedAt<c.plan.T0||v.observedAt>at||!Array.isArray(v.instances)||v.instances.length>64||v.totalCount!==v.instances.length)fail();
+ const ids=new Set();for(const item of v.instances){const x=fields(item,['containerId','applicationId','image','startedAt','stoppedAt','state','exitCode']);if(!hex(x.containerId)||ids.has(x.containerId)||x.applicationId!==v.applicationId||x.image!=='cloudflare/debian-trixie'||x.state!=='stopped'||x.exitCode!==0||!time(x.startedAt)||!time(x.stoppedAt)||x.stoppedAt<x.startedAt||x.stoppedAt>v.observedAt)fail();ids.add(x.containerId);}return v;
+}
+function retirement(value,c,at){
+ const h=fields(value,['status','physicalStopVerified','mayStartSuccessor','mayRestoreAdministration','operationalReadiness','containerId','applicationId','programHash','sourceRevision','processGeneration','closedAt','stoppedAt','capturedAt','observedAt']);
+ const p=c.plan;if(h.status!=='retired_handoff_observed'||h.physicalStopVerified!==true||h.mayStartSuccessor!==false||h.mayRestoreAdministration!==false||h.operationalReadiness!==false||h.containerId!==p.resources.containerId||h.applicationId!==p.resources.applicationId||h.programHash!==p.selectors.programHash||h.sourceRevision!==p.selectors.sourceRevision||!hex(h.processGeneration)||['closedAt','stoppedAt','capturedAt','observedAt'].some(k=>!time(h[k]))||h.closedAt<p.T0||h.closedAt>h.capturedAt||h.stoppedAt>h.capturedAt||h.capturedAt>h.observedAt||h.observedAt>at)fail();return h;
+}
+/** Fact validation, never effect authority. Producer live version is retained
+ * provenance; callers restoring QA must separately check the current CLOSED
+ * deployment/provider observations and the qualified retained first-primary\n * sealed-writer chain, without pretending an external fresh D1 query. */
+export function validatePrivateQaFiniteCleanupProof({proof,support,control,expectedChallenge,now=Date.now}={}){
+ return validateProofFacts({proof,support,c:finiteControlIdentity(control),expectedChallenge,now});
+}
+function validateProofFacts({proof,support,c,expectedChallenge,now}){
+ const p=c.plan,v=data(proof),e=data(support),at=now();
+ const common=['purpose','kind','intentId','planHash','controlHash','sourceRevision','runtimeVersionId','containerId','applicationId','grantHash','trialId','sealHash','proofChallenge','observedAt','evidenceHash'];
+ const extra=v.kind==='retired_process'?['retirementHandoff']:v.kind==='sealed_without_admission'?['sealedAt','admissionClosed','launchNeverIssued','primaryWriterSetHash','primaryWriterTerminal','primarySnapshotHash','providerAbsenceHash']:null;if(!extra)fail();fields(v,[...common,...extra]);fields(e,['gate','primary','providerBefore','providerAfter']);
+ if(!time(at)||!time(v.observedAt)||v.observedAt<p.T0||v.observedAt>=p.C1||v.observedAt>at||v.purpose!=='afw.finite-trial-cleanup-proof.v1'||v.intentId!==p.intentId||v.planHash!==c.planHash||v.controlHash!==c.controlHash||v.sourceRevision!==p.canaryContainment.sourceRevision||v.runtimeVersionId!==p.canaryContainment.runtimeVersionId||v.containerId!==p.resources.containerId||v.applicationId!==p.resources.applicationId||v.grantHash!==p.grantHash||v.trialId!==p.trialId||!hex(expectedChallenge)||v.proofChallenge!==expectedChallenge||v.evidenceHash!==hash({proofChallenge:v.proofChallenge,sealHash:v.sealHash,support:e}))fail();
+ const g=validateGate(e.gate,c,v.observedAt),q=primary(e.primary,c,v.observedAt),a=provider(e.providerBefore,c,v.observedAt),b=provider(e.providerAfter,c,v.observedAt);
+ if(v.sealHash!==g.sealHash||a.observedAt>q.observedAt||b.observedAt<q.observedAt||q.observedAt<g.seal.sealedAt||b.observedAt-a.observedAt>5000||v.observedAt-a.observedAt>5000)fail();
+ for(const kind of KINDS){const w=g.writers[kind];if(w&&(q.observedAt<w.settlement.settledAt||q[kind+'Hash']!==w.settlement.primaryRowHash))fail();if(!w&&q[kind+'Hash']!==null)fail();}
+ if(v.kind==='sealed_without_admission'){
+  if(g.writers.admission!==null||g.writers.launch!==null||q.admissionHash!==null||q.launchHash!==null||g.launchNeverIssued!==true||v.sealedAt!==g.seal.sealedAt||v.admissionClosed!==true||v.launchNeverIssued!==true||v.primaryWriterTerminal!==true||v.primaryWriterSetHash!==hash(g.writers)||v.primarySnapshotHash!==hash(q)||v.providerAbsenceHash!==hash([a,b])||[a,b].some(x=>x.instances.some(i=>i.containerId===v.containerId)))fail();
+ }else{
+  const h=retirement(v.retirementHandoff,c,v.observedAt);
+  if(!q.reservationHash||!g.writers.reservation||!q.admissionHash||!q.launchHash||!q.closureHash||q.processGeneration!==h.processGeneration||!g.writers.admission||!g.writers.launch)fail();
+  for(const x of [a,b]){const matches=x.instances.filter(i=>i.containerId===v.containerId);if(matches.length!==1||matches[0].stoppedAt!==h.stoppedAt)fail();}
+ }
+ return Object.freeze(v);
+}
+/** Native producer is PRIVATE. The read-only readiness probe permits bounded
+ * alarm observations while physical stop is still pending. It grants no proof.
+ * The one native challenge is consumed atomically with the completed capture,
+ * after source/primary/provider checks; no failed readiness spends it. */
+export function createFiniteNativeCleanupProofProducer({storage,gate,control,primaryRead,providerRead,retirementRead,now=Date.now}={}){
+ const c=finiteControlIdentity(control),p=c.plan,key='afw.own-finite-proof.v1:'+p.intentId;
+ if(typeof storage?.transaction!=='function'||typeof gate?.read!=='function'||[primaryRead,providerRead,retirementRead,now].some(f=>typeof f!=='function'))fail();
+ async function collect(challenge,current,signal){
+  const before=await providerRead({signal,assertCurrent:current});current();const first=await gate.read();current();const q=await primaryRead();current();const after=await gate.read();current();if(!same(first,after))fail();
+  const last=await providerRead({signal,assertCurrent:current});current();const support=data({gate:after,primary:q,providerBefore:before,providerAfter:last});
+  const common={purpose:'afw.finite-trial-cleanup-proof.v1',kind:q.admissionHash===null?'sealed_without_admission':'retired_process',intentId:p.intentId,planHash:c.planHash,controlHash:c.controlHash,sourceRevision:p.canaryContainment.sourceRevision,runtimeVersionId:p.canaryContainment.runtimeVersionId,containerId:p.resources.containerId,applicationId:p.resources.applicationId,grantHash:p.grantHash,trialId:p.trialId,sealHash:after.sealHash,proofChallenge:challenge};
+  const extra=common.kind==='retired_process'?{retirementHandoff:await retirementRead({assertCurrent:current})}:{sealedAt:after.seal?.sealedAt,admissionClosed:true,launchNeverIssued:after.launchNeverIssued,primaryWriterSetHash:hash(after.writers),primaryWriterTerminal:after.unresolvedWriters===0,primarySnapshotHash:hash(q),providerAbsenceHash:hash([before,last])};current();
+  const proof={...common,observedAt:current(),evidenceHash:hash({proofChallenge:challenge,sealHash:after.sealHash,support}),...extra};
+  validatePrivateQaFiniteCleanupProof({proof,support,control:c,expectedChallenge:challenge,now:current});return Object.freeze({proof:data(proof),support});
+ }
+ async function readiness(current,signal){
+  const before=await providerRead({signal,assertCurrent:current});current();const first=await gate.read();current();const snapshot=await primaryRead();current();const after=await gate.read();current();const last=await providerRead({signal,assertCurrent:current});current();
+  if(!same(first,after))fail();const at=current(),g=validateGate(after,c,at),q=primary(snapshot,c,at),a=provider(before,c,at),b=provider(last,c,at);
+  if(a.observedAt>q.observedAt||b.observedAt<q.observedAt||q.observedAt<g.seal.sealedAt||at-a.observedAt>5000)fail();
+  for(const kind of KINDS){const w=g.writers[kind];if(w&&(q.observedAt<w.settlement.settledAt||q[kind+'Hash']!==w.settlement.primaryRowHash)||!w&&q[kind+'Hash']!==null)fail();}
+  if(q.admissionHash===null){if(g.writers.admission||g.writers.launch||q.launchHash||[a,b].some(x=>x.instances.some(i=>i.containerId===p.resources.containerId)))fail();}
+  else if(!q.launchHash||!q.closureHash||[a,b].some(x=>x.instances.filter(i=>i.containerId===p.resources.containerId).length!==1))fail();
+  return Object.freeze({status:'ready_for_capture',intentId:p.intentId,controlHash:c.controlHash,sourceRevision:p.canaryContainment.sourceRevision,runtimeVersionId:p.canaryContainment.runtimeVersionId,observedAt:current()});
+ }
+ async function invoke(value,probe){
+  const x=probe?null:fields(value,['intentId','planHash','proofChallenge']);
+  if(!probe&&(x.intentId!==p.intentId||x.planHash!==c.planHash||!hex(x.proofChallenge)))fail();
+  const entered=now(),mono=performance.now(),abort=new AbortController();let done=false,timer,last=entered;
+  const current=()=>{const n=now();if(done||!time(n)||n<last||n>=p.C1||n-entered>=5000||performance.now()-mono>=5000)fail();last=n;return n;};
+  const work=async()=>{
+   current();if(probe)return readiness(current,abort.signal);
+   const result=await collect(x.proofChallenge,current,abort.signal);current();
+   await storage.transaction(async tx=>{current();if(await tx.get(key)!==undefined)fail();current();await tx.put(key,{controlHash:c.controlHash,proofChallenge:x.proofChallenge,proofHash:hash(result),capturedAt:current()});current();});current();return result;
+  };
+  try{return await Promise.race([work(),new Promise((_,reject)=>{timer=setTimeout(()=>{done=true;reject(Error('Finite proof unavailable'));},5000);})]);}
+  catch(error){if(probe)return Object.freeze({status:'not_yet_observed'});throw error;}finally{done=true;abort.abort();clearTimeout(timer);}
+ }
+ return Object.freeze({ready:()=>invoke(null,true),observe:value=>invoke(value,false)});
+}
+
+/** Technical facts only. No private selectors, native pin, control constructor,
+ * journal or capability is manufactured by this projection. */
+export function validateProjectedFiniteCleanupProof({proof,support,plan,expectedChallenge,now=Date.now}={}){
+ const v=plan.preview,identity=plan.proofIdentity;
+ const facts={intentId:v.intentId,T0:v.T0,N1:v.N1,C1:v.C1,resources:plan.resources,canaryContainment:plan.canaryContainment,grantHash:identity.grantHash,trialId:identity.trialId,selectors:{programHash:identity.programHash,sourceRevision:identity.programSourceRevision}};
+ return validateProofFacts({proof,support,c:{plan:facts,planHash:v.planHash,controlHash:v.controlHash},expectedChallenge,now});
+}

~~~~~~~~~~

## lib/mcp-own-finite-primary.mjs

~~~~~~~~~~diff
diff --git a/lib/mcp-own-finite-primary.mjs b/lib/mcp-own-finite-primary.mjs
--- /dev/null
+++ b/lib/mcp-own-finite-primary.mjs
@@ -0,0 +1,104 @@
+import {createHash} from 'node:crypto';
+import {readOwnSuccessorHost} from './mcp-own-successor-host.mjs';
+import {resolveSuccessorPreparation} from './mcp-successor-manifest.mjs';
+import {readDossierEventHostPolicy} from './dossier-event-rpc-authority.mjs';
+import {createDossierMonitoringAuthorization} from './dossier-monitoring-authority.mjs';
+import {finiteAdmissionIdentity} from './mcp-own-finite-cleanup-proof.mjs';
+import {finiteFields as fields,finiteHash as hash,finiteTime as time,finiteControlIdentity} from './mcp-finite-evidence.mjs';
+const admissionSources=new WeakMap();
+const sqlNow="CAST(strftime('%s','now') AS INTEGER)*1000+CAST(substr(strftime('%f','now'),4,3) AS INTEGER)";
+const fail=()=>{throw Error('Finite first-primary unavailable');};
+/** Fixed first-primary D1 readback. No SQL/selector/receipt supplied by RPC.
+ * Reservation/admission/launch tables already have immutable unique keys.
+ * Existing closure rows (including NULL generation) are merely hashed history. */
+export function createFiniteNativePrimaryReader({db,control,now=Date.now,nativeAdmission}={}){
+ const c=finiteControlIdentity(control),p=c.plan,s=p.selectors,r=p.resources;
+ if(typeof db?.withSession!=='function'||typeof now!=='function')fail();
+ const session=db.withSession,prepare=db.prepare;let last=-1;
+ const clock=()=>{const n=now();if(!time(n)||n<p.T0||n<last||db.withSession!==session||db.prepare!==prepare)fail();last=n;return n;};
+ async function read(){
+  clock();const d=db.withSession('first-primary');if(typeof d?.prepare!=='function')fail();
+  const rows=async(sql,args)=>{clock();const result=await d.prepare(sql).bind(...args).all();clock();if(result?.success!==true||!Array.isArray(result.results)||result.results.length>1)fail();return result.results[0]??null;};
+  const reservation=await rows('SELECT * FROM dossier_successor_reservations WHERE slot=? LIMIT 2',['afw.own-successor.v1']);
+  const admission=await rows('SELECT * FROM dossier_node_process_admissions WHERE grant_id=? OR container_id=? LIMIT 2',[s.grantId,r.containerId]);
+  const launch=await rows('SELECT * FROM dossier_successor_launch_claims WHERE trial_id=? OR container_id=? LIMIT 2',[p.trialId,r.containerId]);
+  const closure=await rows('SELECT * FROM dossier_node_process_closures WHERE grant_id=? LIMIT 2',[s.grantId]);
+  if(reservation&&(reservation.trial_id!==p.trialId||reservation.container_id!==r.containerId||reservation.program_hash!==s.programHash||reservation.source_revision!==s.sourceRevision||reservation.application_id!==r.applicationId||reservation.budget!==1||reservation.state!=='prepared'||reservation.start_at!==s.startAt||reservation.expires_at>s.expiresAt||reservation.reserved_at<p.T0))fail();
+  if(admission&&(admission.grant_id!==s.grantId||admission.container_id!==r.containerId||admission.project_id!==s.projectId||admission.user_id!==s.subject||admission.client_id!==s.clientId||admission.resource!==s.resource||admission.program_hash!==s.programHash||admission.source_revision!==s.sourceRevision||admission.created_at<p.T0||admission.expires_at>s.expiresAt))fail();
+  if(launch&&(launch.trial_id!==p.trialId||launch.container_id!==r.containerId||launch.grant_id!==s.grantId||!admission||launch.process_generation!==admission.process_generation||launch.claimed_at<p.T0))fail();
+  if(closure&&(closure.grant_id!==s.grantId||closure.container_id!==r.containerId||closure.program_hash!==s.programHash||closure.source_revision!==s.sourceRevision))fail();
+  return Object.freeze({purpose:'afw.finite-primary-snapshot.v1',intentId:p.intentId,controlHash:c.controlHash,observedAt:clock(),reservationHash:reservation?hash(reservation):null,admissionHash:admission?hash(admission):null,launchHash:launch?hash(launch):null,closureHash:closure?hash(closure):null,processGeneration:admission?.process_generation??null});
+ }
+ const settle=kind=>async value=>{
+  const x=fields(value,['identityHash','claimHash']);const snapshot=await read(),row=snapshot[kind+'Hash'];if(!row)return null;
+  return Object.freeze({purpose:'afw.own-finite-admission.v1:settled',identityHash:x.identityHash,kind,claimHash:x.claimHash,primaryRowHash:row,settledAt:clock()});
+ };
+ return Object.freeze({read,reservation:settle('reservation'),admission:settle('admission'),launch:settle('launch'),...(nativeAdmission===undefined?{}:{admissionSource:createAdmissionSource({db,control:c,nativeAdmission,clock})})});
+}
+
+/** Opaque source token; constructors capture provenance only. Live resolution
+ * is deliberately lazy so historical reads, sealing and reductions survive N1. */
+function createAdmissionSource({db,control:c,nativeAdmission,clock}){
+ const n=fields(nativeAdmission,['ctx','env','program','programSourceRevision']),{ctx,env,program,programSourceRevision}=n,p=c.plan,s=p.selectors,r=p.resources;
+ const storage=ctx?.storage,id=ctx?.id,namespace=env?.AFW_DOSSIER_EVENTS_NODE,version=env?.AFW_FINITE_TRIAL_VERSION;
+ if(env?.DB!==db||typeof storage?.get!=='function'||typeof storage?.transaction!=='function'||typeof namespace?.idFromName!=='function'||typeof namespace?.idFromString!=='function'||typeof namespace?.get!=='function'||typeof program!=='string'||createHash('sha256').update(program).digest('hex')!==s.programHash||programSourceRevision!==s.sourceRevision||version?.id!==p.canaryContainment.runtimeVersionId)fail();
+ const get=storage.get,transaction=storage.transaction,named=namespace.idFromName,from=namespace.idFromString,nsGet=namespace.get,prepare=db.prepare,session=db.withSession;
+ const policyNames=['AFW_DOSSIER_SUCCESSOR_POLICY','AFW_DOSSIER_EVENTS_POLICY','AFW_DOSSIER_EVENTS_NODE_NAME','AFW_OAUTH_ISSUER','AFW_OAUTH_RESOURCE','AFW_OAUTH_PILOT_CLIENT_ID','AFW_OAUTH_PILOT_PROJECT_ID','AFW_DOSSIER_EVENTS_PROJECTION_SECRET'];
+ const pins=Object.freeze(Object.fromEntries(policyNames.map(k=>[k,env[k]]))),denials=new WeakSet();
+ const provenance=()=>{
+  if(ctx.storage!==storage||ctx.id!==id||env.DB!==db||env.AFW_DOSSIER_EVENTS_NODE!==namespace||env.AFW_FINITE_TRIAL_VERSION!==version||version.id!==p.canaryContainment.runtimeVersionId||storage.get!==get||storage.transaction!==transaction||namespace.idFromName!==named||namespace.idFromString!==from||namespace.get!==nsGet||db.prepare!==prepare||db.withSession!==session||id.toString()!==r.containerId||named.call(namespace,'afw-own-event-first-successor-v1').toString()!==r.containerId||from.call(namespace,r.containerId).toString()!==r.containerId)fail();
+ };provenance();
+ const live=async()=>{
+  provenance();clock();if(policyNames.some(k=>env[k]!==pins[k]))fail();
+  const native=readDossierEventHostPolicy({enabled:true,env,now:clock}),policy=native.policy;
+  if(native.pins.DB!==db||['grantId','subject','projectId','clientId','resource','startAt','expiresAt'].some(k=>policy[k]!==s[k])||policy.containerId!==r.containerId)fail();
+  const host=readOwnSuccessorHost({env,ctx,program,sourceRevision:programSourceRevision,window:{startAt:s.startAt,expiresAt:s.expiresAt},now:clock});
+  if(!host)fail();const resolved=resolveSuccessorPreparation(host.successor.plan),candidate=resolved.candidate,scope=resolved.manifest.scope;
+  if(candidate.trialId!==p.trialId||candidate.containerId!==r.containerId||candidate.programHash!==s.programHash||candidate.sourceRevision!==s.sourceRevision||candidate.startAt!==s.startAt||candidate.expiresAt!==s.expiresAt||candidate.budget!==1||scope.namespaceId!==r.namespaceId||scope.applicationId!==r.applicationId||scope.resource!==s.resource||resolved.original.applicationId!==r.applicationId)fail();
+  const current=()=>{provenance();native.current();host.current();return clock();};
+  const context={grantId:s.grantId,subject:s.subject,clientId:s.clientId,resource:s.resource,scopes:['afw:project:read']};
+  const auth=await createDossierMonitoringAuthorization({db,context,projectId:s.projectId,projectionSecret:native.pins.AFW_DOSSIER_EVENTS_PROJECTION_SECRET,now:current})();current();
+  if(!auth.enabled||auth.principalRef!==scope.ownerRef||auth.projectRef!==scope.projectRef)fail();
+  return {resolved,current};
+ };
+ const predicate=(resolved,manifest,lease)=>{
+  const o=resolved.original,q=resolved.candidate;
+  // Aliases and parameter order are source-owned; no caller SQL is accepted.
+  const clause=`EXISTS(SELECT 1 FROM dossier_successor_reservations r
+   JOIN dossier_node_process_admissions a ON a.container_id=r.predecessor_container_id AND a.process_generation=r.predecessor_generation AND a.program_hash=r.predecessor_program_hash AND a.source_revision=r.predecessor_source_revision AND a.image='cloudflare/debian-trixie'
+   JOIN dossier_node_process_closures z ON z.grant_id=a.grant_id AND z.container_id=a.container_id AND z.process_generation=a.process_generation AND z.program_hash=a.program_hash AND z.source_revision=a.source_revision AND z.image=a.image
+   WHERE r.slot='afw.own-successor.v1' AND r.trial_id=? AND r.scope_hash=? AND r.application_id=? AND r.predecessor_container_id=? AND r.predecessor_program_hash=? AND r.predecessor_source_revision=? AND r.container_id=? AND r.program_hash=? AND r.source_revision=? AND r.start_at=? AND r.expires_at=? AND r.closed_at=z.closed_at AND r.state='prepared' AND r.budget=1
+   AND r.reserved_at>=? AND r.reserved_at<=${sqlNow} AND r.start_at<=${sqlNow} AND ${sqlNow}<r.expires_at AND ${sqlNow}<?${manifest?' AND ?<=r.expires_at AND '+sqlNow+'<?':''})`;
+  const params=[q.trialId,q.scopeHash,o.applicationId,o.containerId,o.programHash,o.sourceRevision,q.containerId,q.programHash,q.sourceRevision,q.startAt,q.expiresAt,p.T0,Math.min(p.N1,q.expiresAt,s.expiresAt),...(manifest?[manifest.expiresAt,Math.min(manifest.expiresAt,lease.deadline)]:[])];
+  return Object.freeze({clause,params:Object.freeze(params)});
+ };
+ const source=Object.freeze({});
+ admissionSources.set(source,{identity:finiteAdmissionIdentity(c),db,selectors:s,provenance,denials,
+  async assertPrepared(){
+   const {resolved,current}=await live(),q=predicate(resolved);current();
+   const query=`SELECT /* finite-prepared-admission */ CASE WHEN ${q.clause} THEN 1 ELSE 0 END AS prepared,
+    (SELECT COUNT(*) FROM dossier_node_process_admissions WHERE grant_id=? OR container_id=?) AS admissions,
+    (SELECT COUNT(*) FROM dossier_successor_launch_claims WHERE trial_id=? OR container_id=?) AS launches,
+    (SELECT COUNT(*) FROM dossier_node_process_closures WHERE grant_id=? OR container_id=?) AS closures`;
+   const result=await db.withSession('first-primary').prepare(query).bind(...q.params,s.grantId,r.containerId,p.trialId,r.containerId,s.grantId,r.containerId).all();current();
+   if(result?.success!==true||!Array.isArray(result.results)||result.results.length!==1)fail();
+   const row=fields(result.results[0],['prepared','admissions','launches','closures']);
+   if(![0,1].includes(row.prepared)||['admissions','launches','closures'].some(k=>!Number.isSafeInteger(row[k])||row[k]<0))fail();
+   if(row.prepared!==1){const error=Error('Finite first-primary unavailable');if(row.admissions===0&&row.launches===0&&row.closures===0)denials.add(error);throw error;}
+   if(row.admissions!==0||row.launches!==0||row.closures!==0)fail();
+  },
+  async insertConstraint(manifest,lease){
+   if(!manifest||manifest.containerId!==r.containerId||manifest.programHash!==s.programHash||manifest.sourceRevision!==s.sourceRevision||manifest.image!=='cloudflare/debian-trixie'||!time(manifest.createdAt)||!time(manifest.expiresAt)||manifest.createdAt<s.startAt||manifest.expiresAt>s.expiresAt||manifest.expiresAt<=manifest.createdAt||typeof lease?.assertCurrent!=='function'||!time(lease.deadline))fail();
+   lease.assertCurrent();const {resolved,current}=await live();lease.assertCurrent();current();return predicate(resolved,manifest,lease);
+  }
+ });return source;
+}
+function sourceRecord(source,identity){const r=admissionSources.get(source);if(!r||JSON.stringify(r.identity)!==JSON.stringify(identity))fail();r.provenance();return r;}
+// Internal fixed hooks only. There is no token registration or arbitrary callback.
+export function requireFiniteNativeAdmissionSource(source,identity,scope){
+ const r=sourceRecord(source,identity);
+ if(scope&&(scope.db!==r.db||Object.entries(scope).some(([k,v])=>k!=='db'&&r.selectors[k]!==v)))fail();
+}
+export const assertNativeFinitePrepared=(source,identity)=>sourceRecord(source,identity).assertPrepared();
+export const nativeFiniteInsertConstraint=(source,identity,manifest,lease)=>sourceRecord(source,identity).insertConstraint(manifest,lease);
+export function isNativeFinitePreparedDenial(source,identity,error){return sourceRecord(source,identity).denials.has(error);}

~~~~~~~~~~

## lib/mcp-own-finite-reduction.mjs

~~~~~~~~~~diff
diff --git a/lib/mcp-own-finite-reduction.mjs b/lib/mcp-own-finite-reduction.mjs
--- /dev/null
+++ b/lib/mcp-own-finite-reduction.mjs
@@ -0,0 +1,56 @@
+import {createHash} from 'node:crypto';
+import {readDossierEventHostPolicy} from './dossier-event-rpc-authority.mjs';
+import {parseOwnPermissionWithdrawalPolicy} from './mcp-own-permission-withdrawal-policy.mjs';
+import {createOwnPermissionsOnlyReduction,createOwnPermissionsOnlyObservation} from './mcp-own-permission-withdrawal.mjs';
+import {finiteControlIdentity,finiteFields as fields,finiteHash as hash,finiteSame as same,finiteTime as time} from './mcp-finite-evidence.mjs';
+const fail=()=>{throw Error('Finite native reduction unavailable');};
+const sha=s=>createHash('sha256').update(s).digest('hex');
+/** Separate original C1 cleanup authority. Live OAuth/N1 does not authorize or
+ * prevent reduction. Native historical policy is read unchanged; no shadow env.
+ * Every effect has its own candidate issued journal before one business send. */
+export function createFiniteOwnReductionActions({ctx,env,control,program,programSourceRevision,close,now=Date.now}={}){
+ const c=finiteControlIdentity(control),p=c.plan,storage=ctx?.storage,prefix='afw.own-finite-reduction.v1:'+p.intentId+':';
+ if(typeof storage?.transaction!=='function'||typeof storage?.get!=='function'||typeof close!=='function'||typeof program!=='string'||sha(program)!==p.selectors.programHash||programSourceRevision!==p.selectors.sourceRevision||typeof now!=='function'||env?.AFW_DOSSIER_PERMISSION_WITHDRAWAL_ENABLED!=='true')fail();
+ const raw=env.AFW_DOSSIER_PERMISSION_WITHDRAWAL_POLICY,policy=parseOwnPermissionWithdrawalPolicy(raw);
+ if(JSON.stringify(policy)!==raw||sha(raw)!==p.withdrawalPolicyHash||policy.containerId!==p.resources.containerId||policy.programHash!==p.selectors.programHash||policy.sourceRevision!==p.selectors.sourceRevision||policy.startAt!==p.C0||policy.expiresAt!==p.C1||policy.originalConsent.issuedAt<p.selectors.startAt||policy.originalConsent.expiresAt>p.selectors.expiresAt)fail();
+ const native=readDossierEventHostPolicy({enabled:true,env,historical:true,now}),n=native.policy;
+ if(['grantId','subject','projectId','clientId','resource','startAt','expiresAt'].some(k=>n[k]!==p.selectors[k])||n.containerId!==p.resources.containerId||ctx.id.toString()!==p.resources.containerId||native.pins.DB!==env.DB)fail();
+ const current=()=>{native.current();const at=now();if(env.AFW_DOSSIER_PERMISSION_WITHDRAWAL_ENABLED!=='true'||env.AFW_DOSSIER_PERMISSION_WITHDRAWAL_POLICY!==raw||ctx.storage!==storage||ctx.id.toString()!==p.resources.containerId||!time(at)||at<p.C0||at>=p.C1)fail();return at;};
+ const options=clock=>({enabled:true,db:native.pins.DB,context:{grantId:n.grantId,subject:n.subject,projectId:n.projectId,clientId:n.clientId,resource:n.resource},originalConsent:policy.originalConsent,window:{startAt:p.C0,expiresAt:p.C1},requestId:policy.requestId,now:clock});
+ const refs=value=>{const x=fields(value,['intentId','controlHash']);if(x.intentId!==p.intentId||x.controlHash!==c.controlHash)fail();current();};
+ async function invoke(kind,send,value,assertParent=()=>{}){
+  refs(value);if(typeof assertParent!=='function')fail();
+  const entered=current(),mono=performance.now(),abort=new AbortController();let finished=false,timer;
+  const check=()=>{assertParent();const at=current();if(finished||abort.signal.aborted||at<entered||at-entered>=30000||performance.now()-mono>=30000)fail();return at;};
+  const key=prefix+kind;
+  const observed=async()=>{
+   check();const record=await storage.get(key);check();if(record===undefined)return null;
+   fields(record,['purpose','intentId','controlHash','kind','phase','issuedAt','receipt','completedAt']);
+   if(record.purpose!=='afw.own-finite-reduction.v1'||record.intentId!==p.intentId||record.controlHash!==c.controlHash||record.kind!==kind||!['issued','complete'].includes(record.phase)||!time(record.issuedAt)||record.issuedAt<p.C0||record.issuedAt>=p.C1)fail();
+   if(kind==='withdraw'){
+    // Independent primary facts may resolve a lost D1 ACK; never resend.
+    const r=await createOwnPermissionsOnlyObservation(options(check)).observe();check();return r.permissionsWithdrawn===true?r:null;
+   }
+   if(record.phase!=='complete')return null;
+   const r=fields(record.receipt,['closed','runtimeStopRequested']);if(r.closed!==true||r.runtimeStopRequested!==true||!time(record.completedAt)||record.completedAt<record.issuedAt||record.completedAt>=p.C1)fail();return r;
+  };
+  const work=async()=>{
+   check();if(!send)return observed();
+   const issued={purpose:'afw.own-finite-reduction.v1',intentId:p.intentId,controlHash:c.controlHash,kind,phase:'issued',issuedAt:check(),receipt:null,completedAt:null};
+   await storage.transaction(async tx=>{check();if(await tx.get(key)!==undefined)fail();check();await tx.put(key,issued);check();});check();
+   const receipt=kind==='withdraw'?await createOwnPermissionsOnlyReduction(options(check)).withdraw():await close({signal:abort.signal,assertCurrent:check,expiresAt:Math.min(p.C1,check()+5000)});
+   check();if(kind==='withdraw'){if(receipt?.purpose!=='afw.own-permissions-only-reduction.v1'||receipt.permissionsWithdrawn!==true||receipt.runtimeStopRequested!==false)fail();}
+   else {fields(receipt,['closed','runtimeStopRequested']);if(receipt.closed!==true||receipt.runtimeStopRequested!==true)fail();}
+   const complete={...issued,phase:'complete',receipt,completedAt:check()};
+   await storage.transaction(async tx=>{check();if(!same(await tx.get(key),issued))fail();check();await tx.put(key,complete);check();});check();
+   const readback=await storage.get(key);check();if(hash(readback)!==hash(complete))fail();return receipt;
+  };
+  try{return await Promise.race([work(),new Promise((_,reject)=>{timer=setTimeout(()=>{finished=true;abort.abort();reject(Error('Finite reduction unavailable'));},Math.max(1,Math.min(30000,p.C1-entered)));})]);}
+  finally{finished=true;abort.abort();clearTimeout(timer);}
+ }
+ return Object.freeze({
+  withdraw:(value,assertParent)=>invoke('withdraw',true,value,assertParent),
+  close:(value,assertParent)=>invoke('close',true,value,assertParent),
+  read:async(value,assertParent)=>({withdraw:await invoke('withdraw',false,value,assertParent),close:await invoke('close',false,value,assertParent)})
+ });
+}

~~~~~~~~~~

## lib/mcp-qa-finite-adoption-source.mjs

~~~~~~~~~~diff
diff --git a/lib/mcp-qa-finite-adoption-source.mjs b/lib/mcp-qa-finite-adoption-source.mjs
--- /dev/null
+++ b/lib/mcp-qa-finite-adoption-source.mjs
@@ -0,0 +1,7 @@
+/** Fixed SOURCE-ONLY C2 boundary. It must resolve actual immutable setup/output,
+ * terminal provider state, source/binding/pointer and settled writer provenance.
+ * Refs and the original parent are not authority. No runtime registration. */
+export async function readPrivateQaFiniteSetupCompletion({intentId,sourceRevision,parent}){
+ void intentId;void sourceRevision;void parent;
+ throw Error('Finite private setup completion unavailable');
+}

~~~~~~~~~~

## lib/mcp-qa-finite-adoption.mjs

~~~~~~~~~~diff
diff --git a/lib/mcp-qa-finite-adoption.mjs b/lib/mcp-qa-finite-adoption.mjs
--- /dev/null
+++ b/lib/mcp-qa-finite-adoption.mjs
@@ -0,0 +1,49 @@
+import {createHash} from 'node:crypto';
+import {finiteFields as fields,finiteData as data,finiteHex as hex,finiteTime as time} from './mcp-finite-evidence.mjs';
+import {finiteUuid} from './mcp-qa-finite-external-contract.mjs';
+const fail=()=>{throw Error('Finite adoption unavailable');};
+const adoptionParents=new WeakMap();
+const sorted=v=>Array.isArray(v)?v.map(sorted):v&&typeof v==='object'?Object.fromEntries(Object.keys(v).sort().map(k=>[k,sorted(v[k])])):v;
+const canonical=v=>JSON.stringify(sorted(v)),hash=v=>createHash('sha256').update(v).digest('hex');
+/** Read-only grammar for the fixed C2 source result. This validates correlation,
+ * not authority; only the fixed unavailable-by-default producer supplies it. */
+export function validatePrivateQaFiniteSetupCompletion(value,{intentId,sourceRevision,qaVersionId,seedHash,T0,now}){
+ const r=fields(data(value),['receipt','instance','observedAt']),receipt=fields(r.receipt,['purpose','intentId','sourceRevision','setupInstanceId','qaVersionId','seedHash','contextHash','baselineVersionId','baselineDeploymentId','versionId','deploymentId','moduleHash','publicStaticHash','activationHash','restorationHash','bindingsHash','installedAt','receiptHash']);
+ const {receiptHash,...body}=receipt,instanceId='afw-finite-policy-'+hash('afw.finite-private-policy-setup.v1\n'+canonical({intentId,sourceRevision}));
+ if(Buffer.byteLength(JSON.stringify(receipt))>8192||receipt.purpose!=='afw.finite-policy-installed.v1'||receipt.intentId!==intentId||receipt.sourceRevision!==sourceRevision||receipt.qaVersionId!==qaVersionId||receipt.seedHash!==seedHash||receipt.setupInstanceId!==instanceId||['contextHash','seedHash','moduleHash','publicStaticHash','activationHash','restorationHash','bindingsHash','receiptHash'].some(k=>!hex(receipt[k]))||['qaVersionId','baselineVersionId','baselineDeploymentId','versionId','deploymentId'].some(k=>!finiteUuid(receipt[k]))||receiptHash!==hash(receipt.purpose+'\n'+canonical(body)))fail();
+ const i=fields(r.instance,['definitionName','instanceId','status','sourceRevision','qaVersionId','completedAt','outputHash']);
+ if(i.definitionName!=='afw-own-qa-private-bootstrap'||i.instanceId!==instanceId||i.status!=='complete'||i.sourceRevision!==sourceRevision||i.qaVersionId!==qaVersionId||i.outputHash!==hash(canonical({status:'installed',receipt})))fail();
+ if(!time(receipt.installedAt)||receipt.installedAt<T0||receipt.installedAt>T0+50000||!time(i.completedAt)||i.completedAt<receipt.installedAt||!time(r.observedAt)||r.observedAt<i.completedAt||r.observedAt>now||now-r.observedAt>5000||i.completedAt>T0+50000)fail();
+ return r;
+}
+/** One original adoption parent, before ANY remote work. Child slots may narrow
+ * their timer but can never move this deadline or reset its monotonic origin. */
+export function createFiniteAdoptionParent({T0,N1,now=Date.now,signal}){
+ const entered=now(),mono=performance.now(),deadline=Math.min(T0+70000,N1-180000),controller=new AbortController();
+ let last=entered,lastMono=mono,closed=false,timer;
+ const check=()=>{const at=now(),m=performance.now();if(closed||signal.aborted||controller.signal.aborted||!time(at)||at<T0||at<last||at>=deadline||!Number.isFinite(m)||m<lastMono||m-mono>=deadline-entered)fail();last=at;lastMono=m;return at;};
+ const stop=()=>controller.abort();check();signal.addEventListener('abort',stop,{once:true});timer=setTimeout(stop,deadline-entered);
+ const parent=Object.freeze({check,signal:controller.signal,deadline});adoptionParents.set(parent,stop);
+ return Object.freeze({parent,close(){closed=true;adoptionParents.delete(parent);clearTimeout(timer);signal.removeEventListener('abort',stop);controller.abort();}});
+}
+/** Slots are absolute. No catch-up burst and no retry of unqualified failure.
+ * The fixed observer adapter alone classifies exact absence/pending previews. */
+export async function waitForFiniteObserverAdoption({parent,T0,observer,sleep,now=Date.now}){
+ const cancel=adoptionParents.get(parent);if(!cancel)fail();
+ for(let k=0;k<36;k++){
+  const target=T0+2000*k,at=parent.check();
+  if(target<at)continue;
+  if(target>at){await sleep(target-at);parent.check();}
+  const began=parent.check();if(began<target)fail();if(began>=target+2000)continue;
+  const mono=performance.now(),end=Math.min(parent.deadline,began+5000);
+  let timer,active=true;
+  const child=new AbortController(),stop=()=>child.abort();
+  parent.signal.addEventListener('abort',stop,{once:true});
+  const check=()=>{parent.check();if(!active||child.signal.aborted||now()>=end||performance.now()-mono>=end-began)fail();};
+  try{
+   const observed=await Promise.race([(async()=>{check();const value=await observer.adopt(parent,child.signal,check);check();return value;})(),new Promise((_,reject)=>{timer=setTimeout(()=>{active=false;cancel();child.abort();reject(Error('Finite adoption unavailable'));},end-began);})]);
+   check();if(observed.status==='ready')return observed.preview;
+   if(!['not_yet_observed','preview_pending'].includes(observed.status))fail();
+  }finally{active=false;clearTimeout(timer);parent.signal.removeEventListener('abort',stop);child.abort();}
+ }fail();
+}

~~~~~~~~~~

## lib/mcp-qa-finite-bootstrap-admission.mjs

~~~~~~~~~~diff
diff --git a/lib/mcp-qa-finite-bootstrap-admission.mjs b/lib/mcp-qa-finite-bootstrap-admission.mjs
--- /dev/null
+++ b/lib/mcp-qa-finite-bootstrap-admission.mjs
@@ -0,0 +1,20 @@
+import {BOOTSTRAP,bootstrapFields} from './mcp-qa-finite-bootstrap-record.mjs';
+const states=new WeakMap(),fail=()=>{throw Error('Finite QA bootstrap admission unavailable');};
+const own=(v,k)=>{if(!v||Object.getPrototypeOf(v)!==Object.prototype)fail();const d=Object.getOwnPropertyDescriptor(v,k);if(!d?.enumerable||!Object.hasOwn(d,'value'))fail();return d.value;};
+function exact(v,keys){bootstrapFields(v,keys);for(const k of keys)own(v,k);return v;}
+const actor=a=>own(a,'id')===BOOTSTRAP.ownerId&&own(a,'login')==='tokenizartinfo-ops'&&own(a,'type')==='User';
+export function validateQaBootstrapCommand(input){
+ const {event,context:c,now}=exact(input,['event','context','now']);exact(c,['repository','repositoryId','ref','eventName','runId','runAttempt','sourceRevision']);
+ if(typeof now!=='function')fail();const at=now(),mono=performance.now();
+ if(!Number.isSafeInteger(at)||at<0||!Number.isFinite(mono)||c.repository!==BOOTSTRAP.repository||c.repositoryId!==String(BOOTSTRAP.repositoryId)||c.ref!=='refs/heads/main'||c.eventName!=='issue_comment'||c.runAttempt!=='1'||typeof c.runId!=='string'||!/^[1-9][0-9]{0,15}$/.test(c.runId)||typeof c.sourceRevision!=='string'||!/^[a-f0-9]{40}$/.test(c.sourceRevision)||own(event,'action')!=='created')fail();
+ const repo=own(event,'repository'),issue=own(event,'issue'),comment=own(event,'comment');
+ if(own(repo,'id')!==BOOTSTRAP.repositoryId||own(repo,'full_name')!==BOOTSTRAP.repository||own(issue,'number')!==497||Object.hasOwn(issue,'pull_request')||!actor(own(comment,'user'))||!actor(own(event,'sender'))||own(comment,'author_association')!=='OWNER'||own(comment,'body')!=='/afw-qa-finite-bootstrap v1 '+c.sourceRevision)fail();
+ const commandId=own(comment,'id'),raw=own(comment,'created_at'),P0=typeof raw==='string'?Date.parse(raw):NaN,Pend=P0+300000;
+ if(!Number.isSafeInteger(commandId)||commandId<1||!Number.isSafeInteger(P0)||P0<0||P0>at||at>=Pend)fail();
+ const a=Object.freeze({purpose:'afw.finite-qa-bootstrap-command.v1',sourceRevision:c.sourceRevision,commandId,runId:Number(c.runId),P0,Pend,authorizesEffects:false,operationalReadiness:false,mayRetry:false});
+ states.set(a,{now,wall:at,mono,monoEnd:mono+Pend-at,poisoned:false});return a;
+}
+export function assertQaBootstrapAdmission(a){
+ const s=states.get(a);if(!s||s.poisoned)fail();
+ const wall=s.now(),mono=performance.now();if(!Number.isSafeInteger(wall)||wall<s.wall||!Number.isFinite(mono)||mono<s.mono||wall>=a.Pend||mono>=s.monoEnd){s.poisoned=true;fail();}s.wall=wall;s.mono=mono;return a;
+}

~~~~~~~~~~

## lib/mcp-qa-finite-bootstrap-issuer.mjs

~~~~~~~~~~diff
diff --git a/lib/mcp-qa-finite-bootstrap-issuer.mjs b/lib/mcp-qa-finite-bootstrap-issuer.mjs
--- /dev/null
+++ b/lib/mcp-qa-finite-bootstrap-issuer.mjs
@@ -0,0 +1,53 @@
+import process from 'node:process';
+import {fileURLToPath} from 'node:url';
+import {compileFiniteNativeStaging} from '../scripts/build-finite-native-package.mjs';
+import {assertQaBootstrapAdmission} from './mcp-qa-finite-bootstrap-admission.mjs';
+import {finiteGhaCustody,verifyFiniteGhaCustody} from './mcp-qa-finite-custody.mjs';
+import {finiteSeedWire} from './mcp-qa-finite-seed-wire.mjs';
+import {readFiniteQaBootstrapPublication} from './mcp-qa-finite-bootstrap-publication.mjs';
+import {readFiniteQaBootstrapPrimary} from './mcp-qa-finite-bootstrap-primary.mjs';
+import {BOOTSTRAP,bootstrapFields,bootstrapCanonical,bootstrapHex,encodeFiniteQaBootstrap,decodeFiniteQaBootstrap} from './mcp-qa-finite-bootstrap-record.mjs';
+const fail=()=>{throw Error('Finite QA bootstrap issuer unavailable');};
+let attempted=false,spent=false;
+/** Only original dedicated CLI. Process cap is not a durable cross-launch lock.
+ * Unknown ACK/conflict never refunds or resends; no CF mutation capability.
+ * Git ref nonmutation against other repository writers is NOT established. */
+export async function issueFiniteQaBootstrap(options){
+ let gh,cf;
+ try{
+  bootstrapFields(options,['admission','githubToken','credential','signal']);
+  for(const k of Object.keys(options)){const d=Object.getOwnPropertyDescriptor(options,k);if(!d?.enumerable||!Object.hasOwn(d,'value'))fail();}
+  const {admission:a,githubToken,credential,signal}=options;assertQaBootstrapAdmission(a);
+  if(attempted||spent||!(signal instanceof AbortSignal))fail();attempted=true;
+  const pid=process.pid,marker=process.env.AFW_FINITE_BOOTSTRAP_ORIGINAL_PID,fetcher=globalThis.fetch;
+  const expectedEnv={GITHUB_JOB:'publish',GITHUB_ACTION:'finite_bootstrap_once',GITHUB_RUN_ID:String(a.runId),GITHUB_RUN_ATTEMPT:'1',GITHUB_SHA:a.sourceRevision,GITHUB_REPOSITORY:BOOTSTRAP.repository,GITHUB_REPOSITORY_ID:String(BOOTSTRAP.repositoryId),GITHUB_REF:'refs/heads/main',GITHUB_EVENT_NAME:'issue_comment'};
+  const check=()=>{assertQaBootstrapAdmission(a);if(signal.aborted||process.pid!==pid||marker!==String(pid)||process.env.AFW_FINITE_BOOTSTRAP_ORIGINAL_PID!==marker||globalThis.fetch!==fetcher||Object.entries(expectedEnv).some(([k,v])=>process.env[k]!==v))fail();};
+  check();
+  const staging=await compileFiniteNativeStaging({cwd:fileURLToPath(new URL('..',import.meta.url)),sourceRevision:a.sourceRevision});check();
+  const expected=staging.bootstrapSource;
+  if(expected?.sourceRevision!==a.sourceRevision||expected.sourceTree!==staging.sourceTree)fail();
+  gh=finiteSeedWire({fetchImpl:fetcher,now:Date.now,signal,credential:githubToken,origin:'https://api.github.com/repos/'+BOOTSTRAP.repository,check,duration:300000,limit:2097152,requests:32});
+  const get=async p=>{const r=await gh.request(p);check();return r.value;};
+  const base={purpose:'afw.finite-qa-bootstrap.v1',repository:BOOTSTRAP.repository,repositoryId:BOOTSTRAP.repositoryId,sourceRevision:a.sourceRevision,sourceTree:staging.sourceTree,sourceCheck:staging.sourceCheck,workflowHash:expected.workflowHash,cliHash:expected.cliHash,commandId:a.commandId,runId:a.runId,attempt:1,workflowPath:BOOTSTRAP.workflowPath,job:BOOTSTRAP.job,step:BOOTSTRAP.step,P0:a.P0,Pend:a.Pend};
+  const initial=await readFiniteQaBootstrapPrimary({get,record:base,phase:'issuer',now:Date.now,expected});check();
+  cf=finiteSeedWire({fetchImpl:fetcher,now:Date.now,signal,credential,origin:'https://api.cloudflare.com/client/v4',check,duration:300000,limit:8388608,requests:4});
+  await verifyFiniteGhaCustody({custody:finiteGhaCustody(),request:p=>cf.request(p),check,now:Date.now,R1:a.Pend});check();
+  const publication=await readFiniteQaBootstrapPublication({staging,request:p=>cf.request(p),check});check();
+  const record={...base,...initial,...publication};
+  const before=await readFiniteQaBootstrapPrimary({get,record,phase:'issuer',now:Date.now,expected});check();if(bootstrapCanonical(before)!==bootstrapCanonical(initial))fail();
+  const message=encodeFiniteQaBootstrap(record),id=record.qaLive.versionId,ref='refs/tags/afw-finite-bootstrap/'+id,refPath='/git/ref/tags/afw-finite-bootstrap/'+id,tagName='afw-finite-bootstrap-'+id;
+  const absent=await gh.request(refPath,{allow404:true});check();if(absent.status!==404||spent)fail();
+  // Cap spent BEFORE either mutation. Never retry POST after uncertain ACK.
+  spent=true;
+  const tag=await gh.request('/git/tags',{method:'POST',body:{tag:tagName,message,object:a.sourceRevision,type:'commit'}});check();
+  if(tag.status!==201||!bootstrapHex(tag.value.sha,40)||tag.value.tag!==tagName||tag.value.object?.type!=='commit'||tag.value.object.sha!==a.sourceRevision||tag.value.message!==message)fail();
+  const main=await get('/git/ref/heads/main');check();if(main.ref!=='refs/heads/main'||main.object?.type!=='commit'||main.object.sha!==a.sourceRevision)fail();
+  const created=await gh.request('/git/refs',{method:'POST',body:{ref,sha:tag.value.sha}});check();
+  if(created.status!==201||created.value.ref!==ref||created.value.object?.type!=='tag'||created.value.object.sha!==tag.value.sha)fail();
+  const readRef=await get(refPath),readTag=await get('/git/tags/'+tag.value.sha);check();
+  if(readRef.ref!==ref||readRef.object?.type!=='tag'||readRef.object.sha!==tag.value.sha||readTag.sha!==tag.value.sha||readTag.tag!==tagName||readTag.object?.type!=='commit'||readTag.object.sha!==a.sourceRevision||readTag.message!==message)fail();
+  const final=await readFiniteQaBootstrapPrimary({get,record,phase:'issuer',now:Date.now,expected});check();if(bootstrapCanonical(final)!==bootstrapCanonical(initial))fail();
+  const {recordHash}=decodeFiniteQaBootstrap(message);
+  return Object.freeze({status:'qa_bootstrap_created',recordHash,tagSha:tag.value.sha,qaPublicationBridgeVerified:false,qaCodeProvenanceVerified:false,sourceIdentityVerified:false,scopeVerified:false,authorizesEffects:false,operationalReadiness:false,completePackage:false,repositoryWriterTrustAssumed:true,historicalRefNonmutationVerified:false,mayRetry:false});
+ }catch{fail();}finally{gh?.close();cf?.close();}
+}

~~~~~~~~~~

## lib/mcp-qa-finite-bootstrap-native.mjs

~~~~~~~~~~diff
diff --git a/lib/mcp-qa-finite-bootstrap-native.mjs b/lib/mcp-qa-finite-bootstrap-native.mjs
--- /dev/null
+++ b/lib/mcp-qa-finite-bootstrap-native.mjs
@@ -0,0 +1,66 @@
+import {BOOTSTRAP,bootstrapFields,bootstrapHex,bootstrapUuid,bootstrapCanonical,bootstrapFreeze,decodeFiniteQaBootstrap} from './mcp-qa-finite-bootstrap-record.mjs';
+import {readFiniteQaBootstrapSourceExpectations} from './mcp-qa-finite-bootstrap-source.mjs';
+import {readFiniteQaBootstrapPrimary} from './mcp-qa-finite-bootstrap-primary.mjs';
+import {finiteCfEnvelope} from './mcp-qa-finite-custody.mjs';
+import {finiteQaPointer} from './mcp-qa-finite-publication.mjs';
+import {retainFiniteOwnerStagePromise} from './mcp-qa-finite-stage-work.mjs';
+const CF='https://api.cloudflare.com/client/v4/accounts/'+BOOTSTRAP.accountId,GH='https://api.github.com/repos/'+BOOTSTRAP.repository;
+const TOKEN='9aa97ad1fc9afe3021cf69ea497d5190',CEILING=Date.parse('2026-11-03T02:59:00Z'),SLOT='afw-own-successor-closure-v1';
+const fail=()=>{throw Error('Finite QA bootstrap native evidence unavailable');};
+function ownFields(v,keys){bootstrapFields(v,keys);for(const k of keys){const d=Object.getOwnPropertyDescriptor(v,k);if(!d?.enumerable||!Object.hasOwn(d,'value'))fail();}return v;}
+/** UNMOUNTED private factual reader. Local holders/literals are not source
+ * identity authority. Ref governance is explicitly trusted, not proved.
+ * No GHA token, QA version/content GET, private window or capability minted. */
+export async function readPrivateQaFiniteBootstrap(options,originalLease){
+ let controller,timer,stop,parent,finished=false,effectiveExpiry=CEILING;
+ try{
+  if(arguments.length!==2)fail();ownFields(options,['ctx','env']);ownFields(originalLease,['signal','assertCurrent']);
+  const {ctx,env}=options,{signal,assertCurrent}=originalLease,expected=readFiniteQaBootstrapSourceExpectations();
+  if(!(signal instanceof AbortSignal)||typeof assertCurrent!=='function')fail();parent=signal;
+  const actor=ctx?.id,stringify=actor?.toString,storage=ctx?.storage,self=env?.AFW_INDEPENDENT_CLOSURE,idFromName=self?.idFromName,version=env?.AFW_QA_VERSION,id=version?.id,credential=env?.AFW_MCP_CLOSURE_READ_TOKEN,fetcher=globalThis.fetch;
+  if(!storage||typeof stringify!=='function'||typeof idFromName!=='function'||typeof fetcher!=='function'||!bootstrapUuid(id)||typeof credential!=='string'||credential.length<1||credential.length>8192||/[^\x21-\x7e]/.test(credential))fail();
+  const actorId=Reflect.apply(stringify,actor,[]);if(!bootstrapHex(actorId)||Reflect.apply(idFromName,self,[SLOT]).toString()!==actorId)fail();
+  const entered=Date.now(),origin=performance.now();let lastWall=entered,lastMono=origin,cfCount=0,ghCount=0,ghBytes=0,cfBytes=0;
+  controller=new AbortController();stop=()=>controller.abort();signal.addEventListener('abort',stop,{once:true});if(signal.aborted)stop();timer=setTimeout(stop,30000);
+  const check=()=>{
+   assertCurrent();const at=Date.now(),mono=performance.now();
+   if(finished||signal.aborted||controller.signal.aborted||!Number.isSafeInteger(at)||at<lastWall||at-entered>=30000||at>=effectiveExpiry||!Number.isFinite(mono)||mono<lastMono||mono-origin>=30000)fail();lastWall=at;lastMono=mono;
+   if(options.ctx!==ctx||options.env!==env||originalLease.signal!==signal||originalLease.assertCurrent!==assertCurrent||ctx.id!==actor||actor.toString!==stringify||ctx.storage!==storage||Reflect.apply(stringify,actor,[])!==actorId||env.AFW_INDEPENDENT_CLOSURE!==self||self.idFromName!==idFromName||Reflect.apply(idFromName,self,[SLOT]).toString()!==actorId||env.AFW_QA_VERSION!==version||version.id!==id||env.AFW_MCP_CLOSURE_READ_TOKEN!==credential||globalThis.fetch!==fetcher)fail();return at;
+  };
+  const request=async(service,path,cap=262144)=>{
+   check();if(service==='cf'?++cfCount>3:++ghCount>11)fail();
+   const child=new AbortController(),began=Date.now(),mono=performance.now();let active=true,on,t,reader;
+   const current=()=>{check();if(!active||child.signal.aborted||Date.now()-began>=5000||performance.now()-mono>=5000)fail();};
+   const stopped=new Promise((_,reject)=>{on=()=>{active=false;child.abort();reject(Error('Finite QA bootstrap native read stopped'));};controller.signal.addEventListener('abort',on,{once:true});t=setTimeout(on,5000);});
+   const actual=retainFiniteOwnerStagePromise(Promise.resolve().then(async()=>{
+    try{
+     current();const r=await fetcher((service==='cf'?CF:GH)+path,{method:'GET',redirect:'manual',cache:'no-store',credentials:'omit',referrerPolicy:'no-referrer',signal:child.signal,headers:{Accept:'application/json','Cache-Control':'no-cache',...service==='cf'?{Authorization:'Bearer '+credential}:{'X-GitHub-Api-Version':'2022-11-28'}}});current();
+     const date=Date.parse(r?.headers?.get('date')??''),length=r?.headers?.get('content-length');
+     if(!(r instanceof Response)||r.status!==200||!r.body||!Number.isSafeInteger(date)||Math.abs(Date.now()-date)>5000||r.headers.has('age')&&r.headers.get('age')!=='0'||r.headers.has('retry-after')||r.headers.get('x-ratelimit-remaining')==='0'||r.headers.has('link')||['HIT','STALE','REVALIDATED','UPDATING'].includes(r.headers.get('cf-cache-status')?.toUpperCase())||!(r.headers.get('content-type')??'').startsWith('application/json')||length!==null&&(!/^\d+$/.test(length)||Number(length)>cap))fail();
+     reader=r.body.getReader();let size=0;const chunks=[];
+     for(;;){current();const v=await reader.read();current();if(v.done)break;if(!(v.value instanceof Uint8Array)||(size+=v.value.length)>cap)fail();chunks.push(v.value);}
+     if(length!==null&&Number(length)!==size)fail();if(service==='cf'?(cfBytes+=size)>262144:(ghBytes+=size)>2097152)fail();
+     const value=JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(Buffer.concat(chunks,size)));current();return {value,date};
+    }finally{if(reader)retainFiniteOwnerStagePromise(reader.cancel()).catch(()=>{});}
+   }));
+   try{const result=await Promise.race([actual,stopped]);current();return result;}finally{active=false;clearTimeout(t);controller.signal.removeEventListener('abort',on);child.abort();}
+  };
+  check();
+  const token=finiteCfEnvelope((await request('cf','/tokens/verify',8192)).value);check();
+  bootstrapFields(token,['id','status','expires_on',...Object.hasOwn(token,'not_before')?['not_before']:[]]);
+  const expiry=Date.parse(token.expires_on);if(token.id!==TOKEN||token.status!=='active'||!Number.isSafeInteger(expiry)||expiry<=check()||token.not_before!=null&&(!Number.isSafeInteger(Date.parse(token.not_before))||Date.parse(token.not_before)>check()))fail();
+  effectiveExpiry=Math.min(expiry,CEILING);check();
+  const pointerPath='/workers/scripts/'+BOOTSTRAP.workerName+'/deployments?per_page=1',before=finiteQaPointer(await request('cf',pointerPath,65536));check();if(before.versionId!==id)fail();
+  const get=async p=>(await request('gh',p)).value,refPath='/git/ref/tags/afw-finite-bootstrap/'+id,refName='refs/tags/afw-finite-bootstrap/'+id;
+  const ref=await get(refPath);check();if(ref.ref!==refName||ref.object?.type!=='tag'||!bootstrapHex(ref.object.sha,40))fail();
+  const tagSha=ref.object.sha,tag=await get('/git/tags/'+tagSha);check();
+  if(tag.sha!==tagSha||tag.tag!=='afw-finite-bootstrap-'+id||tag.object?.type!=='commit'||tag.object.sha!==expected.sourceRevision)fail();
+  const {record,recordHash}=decodeFiniteQaBootstrap(tag.message);
+  if(record.sourceRevision!==expected.sourceRevision||record.sourceTree!==expected.sourceTree||record.qaLive.versionId!==id||record.qaLive.deploymentId!==before.deploymentId)fail();
+  const primaryEvidence=await readFiniteQaBootstrapPrimary({get,record,phase:'reader',now:Date.now,expected});check();
+  const [main,currentRef]=await Promise.all([get('/git/ref/heads/main'),get(refPath)]);check();
+  if(main.ref!=='refs/heads/main'||main.object?.type!=='commit'||main.object.sha!==expected.sourceRevision||currentRef.ref!==refName||currentRef.object?.type!=='tag'||currentRef.object.sha!==tagSha)fail();
+  const after=finiteQaPointer(await request('cf',pointerPath,65536));check();if(bootstrapCanonical(after)!==bootstrapCanonical(before))fail();
+  return bootstrapFreeze({purpose:'afw.finite-qa-bootstrap-evidence.v1',record,recordHash,tagSha,primaryEvidence,currentPointer:after,observedAt:check(),qaPublicationBridgeVerified:true,qaCodeProvenanceVerified:false,sourceIdentityVerified:false,scopeVerified:false,authorizesEffects:false,operationalReadiness:false,completePackage:false,repositoryWriterTrustAssumed:true,historicalRefNonmutationVerified:false});
+ }catch{fail();}finally{finished=true;clearTimeout(timer);parent?.removeEventListener('abort',stop);controller?.abort();}
+}

~~~~~~~~~~

## lib/mcp-qa-finite-bootstrap-primary.mjs

~~~~~~~~~~diff
diff --git a/lib/mcp-qa-finite-bootstrap-primary.mjs b/lib/mcp-qa-finite-bootstrap-primary.mjs
--- /dev/null
+++ b/lib/mcp-qa-finite-bootstrap-primary.mjs
@@ -0,0 +1,38 @@
+import {createHash} from 'node:crypto';
+import {BOOTSTRAP,bootstrapHash,bootstrapHex,bootstrapFreeze} from './mcp-qa-finite-bootstrap-record.mjs';
+const fail=()=>{throw Error('Finite QA bootstrap primary unavailable');};
+const GH='https://api.github.com/repos/'+BOOTSTRAP.repository;
+const actor=a=>a?.id===BOOTSTRAP.ownerId&&a.login==='tokenizartinfo-ops'&&a.type==='User';
+const repo=r=>r?.id===BOOTSTRAP.repositoryId&&r.full_name===BOOTSTRAP.repository;
+function sourceFile(v,path,expected){
+ if(v?.type!=='file'||v.path!==path||v.encoding!=='base64'||!Number.isSafeInteger(v.size)||v.size<1||v.size>65536||typeof v.content!=='string'||v.content.length>90000)fail();
+ const encoded=v.content.replace(/\n/g,''),bytes=Buffer.from(encoded,'base64');
+ if(bytes.toString('base64')!==encoded||bytes.length!==v.size||createHash('sha1').update('blob '+bytes.length+'\0').update(bytes).digest('hex')!==v.sha||bootstrapHash(bytes)!==expected)fail();
+ new TextDecoder('utf-8',{fatal:true}).decode(bytes);
+}
+/** Fixed source-owned caller supplies independently compiled file expectations.
+ * Issuer observes in-progress only; reader demands actual successful terminals.
+ * Technical correlation under trusted repo writers, not tag nonmutation proof. */
+export async function readFiniteQaBootstrapPrimary({get,record:r,phase,now,expected}){
+ if(!['issuer','reader'].includes(phase)||!bootstrapHex(expected?.workflowHash)||!bootstrapHex(expected?.cliHash)||r.workflowHash!==expected.workflowHash||r.cliHash!==expected.cliHash)fail();
+ const [comment,main,run,commit,workflow,cli]=await Promise.all([
+  get('/issues/comments/'+r.commandId),get('/git/ref/heads/main'),get('/actions/runs/'+r.runId),get('/git/commits/'+r.sourceRevision),
+  get('/contents/'+BOOTSTRAP.workflowPath+'?ref='+r.sourceRevision),get('/contents/'+BOOTSTRAP.cliPath+'?ref='+r.sourceRevision)]);
+ const P0=Date.parse(comment?.created_at),Pend=P0+300000,at=now();
+ if(comment.id!==r.commandId||comment.body!=='/afw-qa-finite-bootstrap v1 '+r.sourceRevision||!actor(comment.user)||comment.author_association!=='OWNER'||comment.issue_url!==GH+'/issues/497'||!Number.isSafeInteger(P0)||P0<0||P0>at||r.P0!==undefined&&r.P0!==P0||r.Pend!==undefined&&r.Pend!==Pend||phase==='issuer'&&at>=Pend||main.ref!=='refs/heads/main'||main.object?.type!=='commit'||main.object.sha!==r.sourceRevision||commit.sha!==r.sourceRevision||commit.tree?.sha!==r.sourceTree)fail();
+ if(run.id!==r.runId||run.run_attempt!==1||run.head_sha!==r.sourceRevision||run.head_branch!=='main'||run.event!=='issue_comment'||run.path!==BOOTSTRAP.workflowPath||!repo(run.repository)||!repo(run.head_repository)||!actor(run.actor)||!actor(run.triggering_actor)||run.display_title!=='AFW finite QA bootstrap comment-'+r.commandId+' source-'+r.sourceRevision||run.status!==(phase==='issuer'?'in_progress':'completed')||(phase==='reader'?run.conclusion!=='success':run.conclusion!==null))fail();
+ sourceFile(workflow,BOOTSTRAP.workflowPath,expected.workflowHash);sourceFile(cli,BOOTSTRAP.cliPath,expected.cliHash);
+ const jobs=await get('/actions/runs/'+r.runId+'/attempts/1/jobs?per_page=100');
+ if(!Array.isArray(jobs.jobs)||jobs.total_count!==jobs.jobs.length||jobs.jobs.length<1||jobs.jobs.length>100||new Set(jobs.jobs.map(j=>j.id)).size!==jobs.jobs.length)fail();
+ const found=jobs.jobs.filter(j=>j.name===BOOTSTRAP.job);if(found.length!==1)fail();const j=found[0];
+ if(!Number.isSafeInteger(j.id)||j.id<1||r.jobId!==undefined&&r.jobId!==j.id||j.run_id!==r.runId||j.head_sha!==r.sourceRevision||!Array.isArray(j.steps)||j.steps.length>100||j.status!==(phase==='issuer'?'in_progress':'completed')||(phase==='reader'?j.conclusion!=='success':j.conclusion!==null))fail();
+ const steps=j.steps.filter(s=>s.name===BOOTSTRAP.step);if(steps.length!==1)fail();const s=steps[0],jobStartedAt=Date.parse(j.started_at),stepStartedAt=Date.parse(s.started_at),stepCompletedAt=Date.parse(s.completed_at),jobCompletedAt=Date.parse(j.completed_at);
+ if(!Number.isSafeInteger(s.number)||s.number<1||!Number.isSafeInteger(jobStartedAt)||!Number.isSafeInteger(stepStartedAt)||jobStartedAt<P0||stepStartedAt<jobStartedAt||stepStartedAt>at||stepStartedAt>=Pend||r.jobStartedAt!==undefined&&r.jobStartedAt!==jobStartedAt||r.stepStartedAt!==undefined&&r.stepStartedAt!==stepStartedAt)fail();
+ if(phase==='issuer'){
+  // Historical original observation retains step/Pend/not-future correlation.
+  // Fresh response Date and per-request5s deadlines belong to the transport;
+  // cumulative reconciliation never rewrites or ages out this publication fact.
+  if(s.status!=='in_progress'||s.conclusion!==null||s.completed_at!=null||j.completed_at!=null||r.observedAt!==undefined&&(!Number.isSafeInteger(r.observedAt)||r.observedAt<stepStartedAt||r.observedAt>=Pend||r.observedAt>at))fail();
+ }else if(s.status!=='completed'||s.conclusion!=='success'||!Number.isSafeInteger(stepCompletedAt)||!Number.isSafeInteger(jobCompletedAt)||stepCompletedAt<stepStartedAt||jobCompletedAt<stepCompletedAt||jobCompletedAt>=Pend||jobCompletedAt>at||!Number.isSafeInteger(r.observedAt)||r.observedAt<stepStartedAt||r.observedAt>stepCompletedAt)fail();
+ return bootstrapFreeze({P0,Pend,jobId:j.id,jobStartedAt,stepStartedAt,...phase==='reader'?{stepCompletedAt,jobCompletedAt}:{}});
+}

~~~~~~~~~~

## lib/mcp-qa-finite-bootstrap-publication.mjs

~~~~~~~~~~diff
diff --git a/lib/mcp-qa-finite-bootstrap-publication.mjs b/lib/mcp-qa-finite-bootstrap-publication.mjs
--- /dev/null
+++ b/lib/mcp-qa-finite-bootstrap-publication.mjs
@@ -0,0 +1,30 @@
+import {finiteCfEnvelope} from './mcp-qa-finite-custody.mjs';
+import {finiteQaPointer} from './mcp-qa-finite-publication.mjs';
+import {projectFinitePublicConfiguration,finitePublicStaticExpectation} from './mcp-qa-finite-profile.mjs';
+import {BOOTSTRAP,bootstrapCanonical,bootstrapHash,bootstrapFields,bootstrapFreeze} from './mcp-qa-finite-bootstrap-record.mjs';
+const fail=()=>{throw Error('Finite QA bootstrap publication unavailable');};
+const ROOT='/accounts/'+BOOTSTRAP.accountId,PATH=ROOT+'/workers/scripts/'+BOOTSTRAP.workerName+'/deployments?per_page=1';
+const CONFIG=['compatibility_date','compatibility_flags','main_module','usage_model','containers','exports','bindings'];
+const READONLY=['id','number','startup_time_ms','annotations','urls','source','created_on','author_id','author_email','modules'];
+/** Narrow QA-role comparison. Only issuer's actual compiler supplies staging.
+ * No full-package qualification is called or bypassed; no authority returned. */
+export async function readFiniteQaBootstrapPublication({staging,request,check}){
+ check();if(staging?.purpose!=='afw.finite-native-compiler-staging.v1'||staging.sourceCheck!==BOOTSTRAP.sourceCheck||staging.completePackage!==false||staging.operationalReadiness!==false)fail();
+ const d=staging.modules?.qaLive,bytes=staging.files?.['qaLive/index.mjs'];
+ if(!(bytes instanceof Uint8Array)||bytes.length!==d?.module?.bytes||bootstrapHash(bytes)!==d.module.sha256||d.provenance?.kind!=='compiled-source.v1'||d.provenance.sourceRevision!==staging.sourceRevision||d.provenance.sourceTree!==staging.sourceTree||bootstrapCanonical(d.publicStatic)!==bootstrapCanonical(finitePublicStaticExpectation('qaLive')))fail();
+ const first=finiteQaPointer(await request(PATH));check();
+ const v=finiteCfEnvelope((await request(ROOT+'/workers/workers/'+BOOTSTRAP.workerName+'/versions/'+first.versionId+'?include=modules')).value);check();
+ if(!v||Object.getPrototypeOf(v)!==Object.prototype||Object.keys(v).some(k=>![...CONFIG,...READONLY].includes(k))||v.id!==first.versionId||!Array.isArray(v.urls)||v.urls.length||!Array.isArray(v.modules)||v.modules.length!==1||!Array.isArray(v.bindings))fail();
+ // Deny returned secret values before projection or ANY configuration hash.
+ for(const b of v.bindings)if(b?.type==='secret_text')bootstrapFields(b,['name','type']);
+ const m=bootstrapFields(v.modules[0],['name','content_type','content_base64']);
+ if(m.name!==d.module.name||m.content_type!=='application/javascript+module'||typeof m.content_base64!=='string'||m.content_base64.length>Math.ceil(d.module.bytes/3)*4)fail();
+ const observed=Buffer.from(m.content_base64,'base64');if(observed.toString('base64')!==m.content_base64||observed.length!==bytes.length||bootstrapHash(observed)!==d.module.sha256||!observed.equals(Buffer.from(bytes)))fail();
+ new TextDecoder('utf-8',{fatal:true}).decode(observed);
+ if(CONFIG.some(k=>!Object.hasOwn(v,k)))fail();
+ const configuration=Object.fromEntries(CONFIG.map(k=>[k,v[k]]));
+ projectFinitePublicConfiguration({role:'qaLive',metadata:configuration});
+ if(bootstrapCanonical(v.exports)!==bootstrapCanonical(d.module.exports))fail();
+ const last=await request(PATH);check();if(bootstrapCanonical(finiteQaPointer(last))!==bootstrapCanonical(first))fail();
+ return bootstrapFreeze({qaLive:{...first,module:d.module,publicStatic:d.publicStatic},observedAt:last.date});
+}

~~~~~~~~~~

## lib/mcp-qa-finite-bootstrap-record.mjs

~~~~~~~~~~diff
diff --git a/lib/mcp-qa-finite-bootstrap-record.mjs b/lib/mcp-qa-finite-bootstrap-record.mjs
--- /dev/null
+++ b/lib/mcp-qa-finite-bootstrap-record.mjs
@@ -0,0 +1,35 @@
+import {createHash} from 'node:crypto';
+import {finitePublicStaticExpectation,finitePublicProfileTemplate} from './mcp-qa-finite-profile.mjs';
+const fail=()=>{throw Error('Finite QA bootstrap unavailable');};
+export const BOOTSTRAP=Object.freeze({repository:'tokenizartinfo-ops/agent-friendly-web',repositoryId:1347578006,ownerId:290715446,workflowPath:'.github/workflows/afw-finite-qa-bootstrap.yml',cliPath:'scripts/run-qa-finite-bootstrap.mjs',job:'publish',step:'qa-bootstrap-provenance',sourceCheck:'git-inputs-and-configuration-before-after-v1',accountId:'85d0d5dadac3341a564f22ce885e9eec',workerName:'agent-friendly-web-independent-closure-qa'});
+export const bootstrapCanonical=x=>Array.isArray(x)?'['+x.map(bootstrapCanonical).join(',')+']':x&&typeof x==='object'?'{'+Object.keys(x).sort().map(k=>JSON.stringify(k)+':'+bootstrapCanonical(x[k])).join(',')+'}':JSON.stringify(x);
+export const bootstrapHash=x=>createHash('sha256').update(x).digest('hex');
+export function bootstrapOwn(input,cap=16384){
+ let nodes=0,bytes=0;const walk=(v,depth=0)=>{
+  if(++nodes>1024||depth>12)fail();
+  if(v===null||typeof v==='boolean'||typeof v==='number'&&Number.isSafeInteger(v))return v;
+  if(typeof v==='string'){bytes+=Buffer.byteLength(v);if(bytes>cap)fail();return v;}
+  const array=Array.isArray(v);if(!v||Object.getPrototypeOf(v)!==(array?Array.prototype:Object.prototype))fail();
+  const keys=Reflect.ownKeys(v),out=array?[]:{};if(array&&(keys.length!==v.length+1||v.length>128))fail();
+  for(const k of keys){if(array&&k==='length')continue;const d=Object.getOwnPropertyDescriptor(v,k);if(typeof k!=='string'||['__proto__','constructor','prototype','toJSON'].includes(k)||!d?.enumerable||!Object.hasOwn(d,'value')||array&&!/^(0|[1-9][0-9]*)$/.test(k))fail();out[k]=walk(d.value,depth+1);}return out;
+ };const out=walk(input);if(Buffer.byteLength(bootstrapCanonical(out))>cap)fail();return out;
+}
+export function bootstrapFields(v,keys){if(!v||Object.getPrototypeOf(v)!==Object.prototype||Reflect.ownKeys(v).length!==keys.length||keys.some(k=>!Object.hasOwn(v,k)))fail();return v;}
+export function bootstrapFreeze(v){if(v&&typeof v==='object'){Object.values(v).forEach(bootstrapFreeze);Object.freeze(v);}return v;}
+export const bootstrapHex=(v,n=64)=>typeof v==='string'&&new RegExp('^[a-f0-9]{'+n+'}$').test(v);
+export const bootstrapUuid=v=>typeof v==='string'&&/^[a-f0-9]{8}(-[a-f0-9]{4}){3}-[a-f0-9]{12}$/.test(v);
+export function validateFiniteQaBootstrap(input){
+ const r=bootstrapOwn(input);bootstrapFields(r,['purpose','repository','repositoryId','sourceRevision','sourceTree','sourceCheck','workflowHash','cliHash','commandId','runId','jobId','attempt','workflowPath','job','step','P0','Pend','jobStartedAt','stepStartedAt','observedAt','qaLive']);
+ if(r.purpose!=='afw.finite-qa-bootstrap.v1'||['repository','repositoryId','sourceCheck','workflowPath','job','step'].some(k=>r[k]!==BOOTSTRAP[k])||!bootstrapHex(r.sourceRevision,40)||!bootstrapHex(r.sourceTree,40)||!bootstrapHex(r.workflowHash)||!bootstrapHex(r.cliHash)||r.attempt!==1||['commandId','runId','jobId'].some(k=>!Number.isSafeInteger(r[k])||r[k]<1)||['P0','Pend','jobStartedAt','stepStartedAt','observedAt'].some(k=>!Number.isSafeInteger(r[k])||r[k]<0)||r.Pend!==r.P0+300000||r.jobStartedAt<r.P0||r.stepStartedAt<r.jobStartedAt||r.observedAt<r.stepStartedAt||r.observedAt>=r.Pend)fail();
+ const q=bootstrapFields(r.qaLive,['versionId','deploymentId','module','publicStatic']),m=bootstrapFields(q.module,['name','sha256','bytes','exports']);
+ if(!bootstrapUuid(q.versionId)||!bootstrapUuid(q.deploymentId)||m.name!=='index.mjs'||!bootstrapHex(m.sha256)||!Number.isSafeInteger(m.bytes)||m.bytes<1||m.bytes>3145728||bootstrapCanonical(m.exports)!==bootstrapCanonical(finitePublicProfileTemplate('qaLive').exports)||bootstrapCanonical(q.publicStatic)!==bootstrapCanonical(finitePublicStaticExpectation('qaLive')))fail();
+ return bootstrapFreeze(r);
+}
+export function encodeFiniteQaBootstrap(input){
+ const record=validateFiniteQaBootstrap(input),recordHash=bootstrapHash('afw.finite-qa-bootstrap.v1\n'+bootstrapCanonical(record)),wire=bootstrapCanonical({record,recordHash});if(Buffer.byteLength(wire)>16384)fail();return wire;
+}
+export function decodeFiniteQaBootstrap(wire){
+ if(typeof wire!=='string'||Buffer.byteLength(wire)>16384)fail();let value;try{value=bootstrapOwn(JSON.parse(wire));}catch{fail();}
+ bootstrapFields(value,['record','recordHash']);const record=validateFiniteQaBootstrap(value.record);
+ if(!bootstrapHex(value.recordHash)||wire!==encodeFiniteQaBootstrap(record))fail();return bootstrapFreeze({record,recordHash:value.recordHash});
+}

~~~~~~~~~~

## lib/mcp-qa-finite-bootstrap-source.mjs

~~~~~~~~~~diff
diff --git a/lib/mcp-qa-finite-bootstrap-source.mjs b/lib/mcp-qa-finite-bootstrap-source.mjs
--- /dev/null
+++ b/lib/mcp-qa-finite-bootstrap-source.mjs
@@ -0,0 +1,10 @@
+// QA-only compiler literals. No caller/env registration or identity authority.
+const compiled=globalThis.__AFW_FINITE_BOOTSTRAP_SOURCE__??null;
+const fail=()=>{throw Error('Finite QA bootstrap source unavailable');};
+function validate(v){
+ if(!v||Object.getPrototypeOf(v)!==Object.prototype||Object.keys(v).sort().join(',')!=='cliHash,sourceRevision,sourceTree,workflowHash'||!['sourceRevision','sourceTree'].every(k=>typeof v[k]==='string'&&/^[a-f0-9]{40}$/.test(v[k]))||!['workflowHash','cliHash'].every(k=>typeof v[k]==='string'&&/^[a-f0-9]{64}$/.test(v[k])))fail();
+ return Object.freeze({...v});
+}
+// Eager validation keeps literal residency in QA without mounting the reader.
+const resident=compiled===null?null:validate(compiled);
+export function readFiniteQaBootstrapSourceExpectations(...args){if(args.length||!resident)fail();return resident;}

~~~~~~~~~~

## lib/mcp-qa-finite-canary-restorer.mjs

~~~~~~~~~~diff
diff --git a/lib/mcp-qa-finite-canary-restorer.mjs b/lib/mcp-qa-finite-canary-restorer.mjs
--- /dev/null
+++ b/lib/mcp-qa-finite-canary-restorer.mjs
@@ -0,0 +1,86 @@
+import {createHash} from 'node:crypto';
+import {RELEASE_TARGET} from './mcp-release-operator-policy.mjs';
+import {finiteCleanupPolicy,parseFiniteCleanupPolicy} from './mcp-finite-cleanup-policy.mjs';
+import {finiteControlIdentity,finiteFields as fields,finiteHash as hash,finiteSame as same,finiteTime as time} from './mcp-finite-evidence.mjs';
+import {validatePrivateQaFiniteCleanupProof} from './mcp-own-finite-cleanup-proof.mjs';
+import {qualifyFiniteWorkerVersion,createFiniteProviderInventoryReader} from './mcp-finite-primary-inventory.mjs';
+import {readFiniteLaunchTrialAfwWorkflows} from './mcp-fixed-terminal-workflows.mjs';
+const ROOT='/accounts/'+RELEASE_TARGET.accountId,W=RELEASE_TARGET.workerName,OP='agent-friendly-web-release-operator';
+const fail=()=>{throw Error('Finite canary restore unavailable');};
+const strip=v=>Object.fromEntries(Object.entries(v).filter(([k])=>k!=='observedAt'));
+/** C2 installation gate: primaryRead must be bound by the fixed native producer
+ * owning actual ctx/env/opaque launch context and original parent. It must retain
+ * the Task1 coordinator and qualify durable SEND/ACK, actual nominal source and
+ * all unsettled native-create work. Terminal inventory alone is insufficient;
+ * ACK or absence never settles a pending writer. No new proof union is minted.
+ * The real C2 producer remains unavailable until that integration is qualified.
+ *
+ * Private one-target adapter using the existing bounded allowlisted transport.
+ * Retired and no-admission remain separate evidence kinds. No fake stop flag,
+ * caller URL/version, legacy journal reuse or nominal OAuth renewal. */
+export function createPrivateQaFiniteCanaryRestorer({storage,control,proofStore,request,primaryRead,qualifiedExecution,now=Date.now}={}){
+ const c=finiteControlIdentity(control),p=c.plan,key='afw.qa-finite-canary.v1:'+p.intentId+':send',raw=JSON.stringify(finiteCleanupPolicy(p));
+ parseFiniteCleanupPolicy(raw,p);if(p.resources.applicationId!==RELEASE_TARGET.namespaceId||typeof storage?.transaction!=='function'||typeof storage?.get!=='function'||typeof proofStore?.read!=='function'||[request,primaryRead,now].some(f=>typeof f!=='function'))fail();
+ const message='AFW closed canary restoration '+createHash('sha256').update(raw).digest('hex');
+ const body=Object.freeze({strategy:'percentage',versions:Object.freeze([Object.freeze({version_id:p.deployments.canaryClosed.versionId,percentage:100})]),annotations:Object.freeze({'workers/message':message})});
+ const provider=createFiniteProviderInventoryReader({control:c,request,now});
+ const identity=fields(qualifiedExecution,['intentId','controlHash','sourceRevision','moduleHash','confirmationId','observerId','admissionHash']);
+ if(identity.intentId!==p.intentId||identity.controlHash!==c.controlHash||identity.sourceRevision!==p.source.revision||identity.moduleHash!==p.source.moduleHash||identity.confirmationId!==p.workflows.confirmation||identity.observerId!==p.workflows.bootstrap)fail();
+ async function run(input,send,assertParent=()=>{}){
+  if(typeof assertParent!=='function')fail();
+  const x=fields(input,['claim','proofHash']),claim=fields(x.claim,['purpose','intentId','controlHash','kind','phase','issuedAt','deadline','proofHash']);
+  const entered=now(),mono=performance.now(),abort=new AbortController();let ended=false,last=entered,timer;
+  const check=()=>{assertParent();const at=now();if(ended||abort.signal.aborted||!time(at)||at<last||at<p.C0||at>=p.C1||at-entered>=30000||performance.now()-mono>=30000)fail();last=at;return at;};
+  const get=async(path,query)=>{check();const r=await request({method:'GET',path:ROOT+path,...(query?{query}:{}),signal:abort.signal},check);check();if(r?.success!==true||r.status!==200||!Array.isArray(r.errors)||r.errors.length)fail();return {value:r.result,info:r.result_info};};
+  const pointer=(v,pin,id)=>{const d=(Array.isArray(v)?v:v?.deployments)?.[0];if(!d||d.strategy!=='percentage'||!Array.isArray(d.versions)||d.versions.length!==1||d.versions[0].version_id!==pin.versionId||d.versions[0].percentage!==100||typeof d.id!=='string'||id!==undefined&&d.id!==id)fail();return d;};
+  async function qualify(mode,retained,expectedDeployment){
+   const [canary,operator,closed,op,live,inventory,instances,primary]=await Promise.all([
+    get('/workers/scripts/'+W+'/deployments'),get('/workers/scripts/'+OP+'/deployments'),
+    get('/workers/workers/'+W+'/versions/'+p.deployments.canaryClosed.versionId,{include:'modules'}),
+    get('/workers/workers/'+OP+'/versions/'+p.deployments.operatorClosed.versionId,{include:'modules'}),
+    mode==='live'?get('/workers/workers/'+W+'/versions/'+p.deployments.canaryLive.versionId,{include:'modules'}):Promise.resolve(null),
+    readFiniteLaunchTrialAfwWorkflows({read:get,assertCurrent:check,phase:'canary_restore',confirmationId:p.workflows.confirmation,observerId:p.workflows.bootstrap,launcherId:p.workflows.launcher,qualifiedExecution:{...identity,launcherId:p.workflows.launcher}}),
+    provider({signal:abort.signal,assertCurrent:check}),primaryRead()
+   ]);check();
+   pointer(operator.value,p.deployments.operatorClosed,p.deployments.operatorClosed.deploymentId);
+   qualifyFiniteWorkerVersion({metadata:closed.value,pin:p.deployments.canaryClosed,role:'canary',closed:true});
+   qualifyFiniteWorkerVersion({metadata:op.value,pin:p.deployments.operatorClosed,role:'operator',closed:true});
+   if(live)qualifyFiniteWorkerVersion({metadata:live.value,pin:p.deployments.canaryLive,role:'canary',closed:false});
+   if(!same(strip(primary),strip(retained.support.primary))||!same(strip(instances),strip(retained.support.providerAfter))||primary.observedAt<retained.capturedAt)fail();
+   const d=pointer(canary.value,mode==='live'?p.deployments.canaryLive:p.deployments.canaryClosed,mode==='live'?p.deployments.canaryLive.deploymentId:expectedDeployment);
+   if(mode==='closed'&&d.annotations?.['workers/message']!==message)fail();
+   for(const name of [W,OP])for(const part of ['schedules','tails']){const v=(await get('/workers/scripts/'+name+'/'+part)).value,a=Array.isArray(v)?v:v?.schedules;if(!Array.isArray(a)||a.length)fail();}
+   return {deployment:d,readbackHash:hash({canary:d,operator:operator.value,inventory,instances,primary,closed:closed.value.id,module:p.deployments.canaryClosed.module})};
+  }
+  const work=async()=>{
+   check();
+   const recorded=await storage.get('afw.qa-finite-trial.v1:'+p.intentId+':effect:canary_restore');check();
+   if(!same(recorded,claim)||claim.purpose!=='afw.qa-finite-trial.v1:effect'||claim.intentId!==p.intentId||claim.controlHash!==c.controlHash||claim.kind!=='canary_restore'||claim.phase!=='issued'||claim.deadline!==p.C1||claim.proofHash!==x.proofHash)fail();
+   const proof=await proofStore.read();check();if(proof.status!=='observed'||proof.record.proofHash!==x.proofHash)fail();const r=proof.record;
+   validatePrivateQaFiniteCleanupProof({proof:r.proof,support:r.support,control:c,expectedChallenge:r.proof.proofChallenge,now:check});
+   // Explicit finite union branch; legacy handoff consumer is never bypassed.
+   if(r.proof.kind==='sealed_without_admission'){if(r.proof.launchNeverIssued!==true)fail();}
+   else if(r.proof.kind==='retired_process'){if(r.proof.retirementHandoff.physicalStopVerified!==true)fail();}else fail();
+   const previous=await storage.get(key);check();let deploymentId;
+   if(send){
+    if(previous!==undefined)fail();await qualify('live',r);check();
+    const retainedAgain=await proofStore.read();check();if(!same(retainedAgain.record,r))fail();
+    const journal={purpose:'afw.finite-canary-send.v1',controlHash:c.controlHash,proofHash:x.proofHash,claimHash:hash(claim),bodyHash:hash(body),issuedAt:check()};
+    await storage.transaction(async tx=>{check();if(await tx.get(key)!==undefined)fail();check();await tx.put(key,journal);check();});check();
+    // One final exact pointer read; no blind override of a foreign deployment.
+    pointer((await get('/workers/scripts/'+W+'/deployments')).value,p.deployments.canaryLive,p.deployments.canaryLive.deploymentId);check();
+    const response=await request({method:'POST',path:ROOT+'/workers/scripts/'+W+'/deployments',body,signal:abort.signal},check);check();
+    if(response?.success!==true||![200,201].includes(response.status)||typeof response.result?.id!=='string')fail();deploymentId=response.result.id;
+   }else{
+    const j=fields(previous,['purpose','controlHash','proofHash','claimHash','bodyHash','issuedAt']);
+    if(j.purpose!=='afw.finite-canary-send.v1'||j.controlHash!==c.controlHash||j.proofHash!==x.proofHash||j.claimHash!==hash(claim)||j.bodyHash!==hash(body)||!time(j.issuedAt)||j.issuedAt<claim.issuedAt||j.issuedAt>=p.C1)fail();
+   }
+   const first=await qualify('closed',r,deploymentId);check();
+   const final=pointer((await get('/workers/scripts/'+W+'/deployments')).value,p.deployments.canaryClosed,first.deployment.id);check();
+   if(final.annotations?.['workers/message']!==message)fail();
+   return Object.freeze({purpose:'afw.finite-canary-restored.v1',intentId:p.intentId,controlHash:c.controlHash,proofHash:x.proofHash,versionId:p.deployments.canaryClosed.versionId,deploymentId:final.id,readbackHash:first.readbackHash,observedAt:check()});
+  };
+  try{return await Promise.race([work(),new Promise((_,reject)=>{timer=setTimeout(()=>{ended=true;abort.abort();reject(Error('Finite restore unavailable'));},Math.max(1,Math.min(30000,p.C1-entered)));})]);}catch{if(!send)return null;fail();}finally{ended=true;clearTimeout(timer);abort.abort();}
+ }
+ return Object.freeze({execute:(input,assertParent)=>run(input,true,assertParent),reconcile:(input,assertParent)=>run(input,false,assertParent)});
+}

~~~~~~~~~~

## lib/mcp-qa-finite-candidate-residency.mjs

~~~~~~~~~~diff
diff --git a/lib/mcp-qa-finite-candidate-residency.mjs b/lib/mcp-qa-finite-candidate-residency.mjs
--- /dev/null
+++ b/lib/mcp-qa-finite-candidate-residency.mjs
@@ -0,0 +1,40 @@
+import {createHash} from 'node:crypto';
+import {gzipSync,gunzipSync} from 'node:zlib';
+// Build literals only. The compiler imports this module in QA, never canary.
+// No HTTP/RPC output, registration, env override, caller bytes or authority.
+const compiled=globalThis.__AFW_FINITE_CANDIDATE_RESIDENCY__??null;
+const revision=globalThis.__AFW_QA_SOURCE_REVISION__??'';
+const tree=globalThis.__AFW_FINITE_SOURCE_TREE__??'';
+const program=globalThis.__AFW_NODE_PROGRAM__??'';
+const LIMIT=2097152,COMPRESSED_LIMIT=LIMIT+1024;
+const fail=()=>{throw Error('Finite candidate residency unavailable');};
+const hash=v=>createHash('sha256').update(v).digest('hex');
+const hex=(v,n)=>typeof v==='string'&&new RegExp('^[a-f0-9]{'+n+'}$').test(v);
+function fields(v,keys){
+ if(!v||Object.getPrototypeOf(v)!==Object.prototype||Reflect.ownKeys(v).length!==keys.length)fail();
+ const out={};for(const key of keys){const d=Object.getOwnPropertyDescriptor(v,key);if(!d?.enumerable||!Object.hasOwn(d,'value'))fail();out[key]=d.value;}return out;
+}
+function decode(value){
+ try{
+  const e=fields(value,['purpose','encoding','sourceRevision','sourceTree','sourceCheck','programHash','module','compressedSha256','compressedBytes','content']);
+  const m=fields(e.module,['name','sha256','bytes']);
+  if(e.purpose!=='afw.finite-candidate-residency.v1'||e.encoding!=='gzip-base64.v1'||e.sourceCheck!=='git-inputs-before-after-v1'||!hex(revision,40)||!hex(tree,40)||e.sourceRevision!==revision||e.sourceTree!==tree||!hex(e.programHash,64)||typeof program!=='string'||!program.length||Buffer.byteLength(program)>LIMIT||hash(program)!==e.programHash||m.name!=='index.mjs'||!hex(m.sha256,64)||!Number.isSafeInteger(m.bytes)||m.bytes<1||m.bytes>LIMIT||!hex(e.compressedSha256,64)||!Number.isSafeInteger(e.compressedBytes)||e.compressedBytes<1||e.compressedBytes>COMPRESSED_LIMIT||typeof e.content!=='string'||e.content.length!==4*Math.ceil(e.compressedBytes/3)||!/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(e.content))fail();
+  const compressed=Buffer.from(e.content,'base64');
+  if(compressed.length!==e.compressedBytes||compressed.toString('base64')!==e.content||hash(compressed)!==e.compressedSha256)fail();
+  const bytes=gunzipSync(compressed,{maxOutputLength:LIMIT});
+  if(bytes.length!==m.bytes||hash(bytes)!==m.sha256||!Buffer.from(new TextDecoder('utf-8',{fatal:true}).decode(bytes)).equals(bytes))fail();
+  // Exact compiler encoding: rejects concatenated members, trailing bytes,
+  // optional gzip metadata and alternate encodings even if decoded bytes match.
+  if(!gzipSync(bytes,{level:9,mtime:0}).equals(compressed))fail();
+  return Object.freeze({module:Object.freeze(m),programHash:e.programHash,sourceRevision:e.sourceRevision,sourceTree:e.sourceTree,sourceCheck:e.sourceCheck,bytes});
+ }catch{fail();}
+}
+// Eager validation keeps the actual QA-only emitted dependency/residency real.
+// An ordinary source import without compiler material remains closed.
+const resident=compiled===null?null:decode(compiled);
+/** Private in-process byte custody only; this does not qualify runtime/source
+ * authority, original Q, current pointers, historical inputs or complete package. */
+export function readPrivateQaFiniteCandidate(...args){
+ if(args.length||!resident)fail();
+ return Object.freeze({...resident,bytes:new Uint8Array(resident.bytes)});
+}

~~~~~~~~~~

## lib/mcp-qa-finite-cleanup-collector.mjs

~~~~~~~~~~diff
diff --git a/lib/mcp-qa-finite-cleanup-collector.mjs b/lib/mcp-qa-finite-cleanup-collector.mjs
--- /dev/null
+++ b/lib/mcp-qa-finite-cleanup-collector.mjs
@@ -0,0 +1,22 @@
+import {finiteFields as fields,finiteSame as same,finiteTime as time,finiteControlIdentity} from './mcp-finite-evidence.mjs';
+import {validatePrivateQaFiniteCleanupProof} from './mcp-own-finite-cleanup-proof.mjs';
+const fail=()=>{throw Error('Finite proof collection unavailable');};
+/** Two fact consumers share one retained proof, never one effect claim.
+ * Fresh independent first-primary/provider reads precede retaining native output. */
+export function createPrivateQaFiniteCleanupProofCollector({control,nativeProof,primaryRead,providerRead,now=Date.now}={}){
+ const c=finiteControlIdentity(control?.identity);
+ if(typeof control?.capture!=='function'||typeof nativeProof?.ready!=='function'||typeof nativeProof?.observe!=='function'||[primaryRead,providerRead,now].some(f=>typeof f!=='function'))fail();
+ return Object.freeze({read:async(assertParent=()=>{})=>{
+  if(typeof assertParent!=='function')fail();const check=()=>{assertParent();if(now()>=c.plan.C1)fail();};check();
+  const retained=await control.read();if(retained.status==='observed')return retained;
+  const r=await nativeProof.ready();check();if(r?.status!=='ready_for_capture')return {status:'not_yet_observed'};
+  fields(r,['status','intentId','controlHash','sourceRevision','runtimeVersionId','observedAt']);
+  if(r.intentId!==c.plan.intentId||r.controlHash!==c.controlHash||r.sourceRevision!==c.plan.canaryContainment.sourceRevision||r.runtimeVersionId!==c.plan.canaryContainment.runtimeVersionId||!time(r.observedAt)||r.observedAt<c.plan.C0||r.observedAt>now()||now()-r.observedAt>5000)fail();
+  return control.capture(async proofChallenge=>{
+  check();const value=fields(await nativeProof.observe({intentId:c.plan.intentId,planHash:c.planHash,proofChallenge}),['proof','support']);
+  check();validatePrivateQaFiniteCleanupProof({...value,control:c,expectedChallenge:proofChallenge,now});
+  const primary=await primaryRead(),provider=await providerRead(),strip=v=>Object.fromEntries(Object.entries(v).filter(([k])=>k!=='observedAt'));
+  if(!same(strip(primary),strip(value.support.primary))||!same(strip(provider),strip(value.support.providerAfter))||primary.observedAt<value.proof.observedAt||provider.observedAt<primary.observedAt||now()>=c.plan.C1)fail();
+  check();return value;
+ },check);}});
+}

~~~~~~~~~~

## lib/mcp-qa-finite-cleanup-store.mjs

~~~~~~~~~~diff
diff --git a/lib/mcp-qa-finite-cleanup-store.mjs b/lib/mcp-qa-finite-cleanup-store.mjs
--- /dev/null
+++ b/lib/mcp-qa-finite-cleanup-store.mjs
@@ -0,0 +1,101 @@
+import {randomBytes,createHash} from 'node:crypto';
+import {finiteFields as fields,finiteHash as hash,finiteHex as hex,finiteTime as time,finiteData as data,finiteSame as same,finiteControlIdentity} from './mcp-finite-evidence.mjs';
+import {validatePrivateQaFiniteCleanupProof} from './mcp-own-finite-cleanup-proof.mjs';
+const ROOT='afw.qa-finite-trial.v1',KEY='afw.qa-finite-cleanup.v1:',GUARD='afw.qa-finite-guard.v1:';
+const fail=()=>{throw Error('Retained finite cleanup unavailable');};
+const digest=(purpose,v)=>createHash('sha256').update(purpose+'\n'+JSON.stringify(v)).digest('hex');
+const out=(status,extra={})=>Object.freeze({status,...extra,authorizesEffects:false,operationalReadiness:false});
+/** Bounded fixed-control read, never latest/global selection or live authority. */
+export async function readFiniteCleanupControl({storage,intentId,controlHash}){
+ if(typeof intentId!=='string'||!/^[A-Za-z0-9][A-Za-z0-9._:-]{0,127}$/.test(intentId)||!hex(controlHash)||typeof storage?.get!=='function')fail();
+ const head=fields(await storage.get(ROOT+':head'),['purpose','intentId','controlHash','planHash']);
+ if(head.purpose!==ROOT+':head'||head.intentId!==intentId||head.controlHash!==controlHash||!hex(head.planHash))fail();
+ const info=fields(await storage.get(ROOT+':'+intentId+':info'),['purpose','intentId','planHash','plan','native']);
+ if(info.purpose!==ROOT+':info'||info.intentId!==intentId||info.planHash!==head.planHash||typeof info.plan!=='string'||Buffer.byteLength(info.plan)>49152||digest(ROOT+':control-hash',info)!==controlHash)fail();
+ const plan=JSON.parse(info.plan);if(JSON.stringify(plan)!==info.plan)fail();
+ const c=finiteControlIdentity({plan,planHash:head.planHash,controlHash}),native=fields(info.native,['actorId','runtimeVersionId','sourceRevision']);
+ if(native.actorId!==plan.resources.actorId||native.runtimeVersionId!==plan.deployments.qaLive.versionId||native.sourceRevision!==plan.source.revision)fail();
+ const state=fields(await storage.get(ROOT+':'+intentId+':control'),['purpose','controlHash','phase','pendingAt','armedAt','withdrawnAt']);
+ if(state.purpose!==ROOT+':control'||state.controlHash!==controlHash||!['pending','armed'].includes(state.phase))fail();
+ const again=await storage.get(ROOT+':head');if(!same(again,head))fail();return c;
+}
+function retained(value,c){
+ const r=fields(data(value),['purpose','intentId','controlHash','planHash','proofHash','capturedAt','proof','support']);
+ if(r.purpose!=='afw.qa-finite-retained-proof.v1'||r.intentId!==c.plan.intentId||r.controlHash!==c.controlHash||r.planHash!==c.planHash||!time(r.capturedAt)||r.capturedAt<r.proof.observedAt||r.capturedAt-r.proof.observedAt>5000||r.capturedAt>=c.plan.C1)fail();
+ const {proofHash:ignored,...body}=r;void ignored;if(r.proofHash!==hash(body))fail();
+ validatePrivateQaFiniteCleanupProof({proof:r.proof,support:r.support,control:c,expectedChallenge:r.proof.proofChallenge,now:()=>r.capturedAt});return r;
+}
+/** Private writer; only its fixed READ methods are RPC mounted. A consumed
+ * capture without retained bytes stays pending forever: no native rechallenge. */
+export function createPrivateQaFiniteCleanupStore({storage,control,now=Date.now}={}){
+ const c=finiteControlIdentity(control),p=c.plan,prefix=KEY+p.intentId+':';
+ if(typeof storage?.transaction!=='function'||typeof storage?.get!=='function'||typeof now!=='function')fail();
+ const checked=()=>readFiniteCleanupControl({storage,intentId:p.intentId,controlHash:c.controlHash});
+ let capturing=false;
+ async function read(){
+  await checked();const value=await storage.get(prefix+'proof');if(value===undefined)return out('not_yet_observed');
+  const r=retained(value,c),capture=fields(await storage.get(prefix+'capture'),['purpose','controlHash','challenge','issuedAt']);
+  if(capture.purpose!==prefix+'capture'||capture.controlHash!==c.controlHash||capture.challenge!==r.proof.proofChallenge||!time(capture.issuedAt)||capture.issuedAt>r.proof.observedAt)fail();
+  return out('observed',{record:r});
+ }
+ async function capture(producer,assertParent=()=>{}){
+  if(capturing||typeof producer!=='function'||typeof assertParent!=='function')return out('admin_pending');capturing=true;
+  let wrote=false,finished=false,timer;const entered=now(),mono=performance.now();
+  const check=()=>{assertParent();const n=now();if(finished||!time(n)||n<entered||n>=p.C1||n-entered>=5000||performance.now()-mono>=5000)fail();return n;};
+  const work=async()=>{
+   await checked();check();const existing=await read();check();if(existing.status==='observed')return existing;
+   const challenge=randomBytes(32).toString('hex');
+   await storage.transaction(async tx=>{check();if(await tx.get(prefix+'capture')!==undefined)fail();check();wrote=true;await tx.put(prefix+'capture',{purpose:prefix+'capture',controlHash:c.controlHash,challenge,issuedAt:check()});check();});check();
+   const value=fields(data(await producer(challenge)),['proof','support']);check();
+   const proof=validatePrivateQaFiniteCleanupProof({...value,control:c,expectedChallenge:challenge,now:check});if(check()-proof.observedAt>5000)fail();
+   const body={purpose:'afw.qa-finite-retained-proof.v1',intentId:p.intentId,controlHash:c.controlHash,planHash:c.planHash,capturedAt:check(),proof,support:value.support},record=data({purpose:body.purpose,intentId:body.intentId,controlHash:body.controlHash,planHash:body.planHash,proofHash:hash(body),capturedAt:body.capturedAt,proof:body.proof,support:body.support});
+   await storage.transaction(async tx=>{check();const claim=await tx.get(prefix+'capture');check();if(claim?.challenge!==challenge||claim.controlHash!==c.controlHash||await tx.get(prefix+'proof')!==undefined)fail();check();await tx.put(prefix+'proof',record);check();});check();
+   // Independent storage readback is mandatory before any restore POST.
+   const seen=await read();check();if(seen.status!=='observed'||!same(seen.record,record))fail();return seen;
+  };
+  try{return await Promise.race([work(),new Promise(resolve=>{timer=setTimeout(()=>{finished=true;resolve(out(wrote?'uncertain':'admin_pending'));},5000);})]);}catch{return out(wrote?'uncertain':'admin_pending');}finally{finished=true;clearTimeout(timer);capturing=false;}
+ }
+ async function completion(){
+  const proof=await read();if(proof.status!=='observed')return out('not_yet_observed');
+  const raw=await storage.get(prefix+'completion');if(raw===undefined)return out('not_yet_observed');
+  const r=fields(data(raw),['purpose','intentId','controlHash','proofHash','completedAt','canaryVersionId','canaryDeploymentId','readbackHash','effectReceipts','receiptHash']);
+  const {receiptHash:ignored,...body}=r;void ignored;
+  if(r.purpose!=='afw.finite-cleanup-completion.v1'||r.intentId!==p.intentId||r.controlHash!==c.controlHash||r.proofHash!==proof.record.proofHash||!time(r.completedAt)||r.completedAt<proof.record.capturedAt||r.completedAt>=p.C1||r.canaryVersionId!==p.deployments.canaryClosed.versionId||!hex(r.readbackHash)||r.receiptHash!==hash(body))fail();
+  fields(r.effectReceipts,['withdraw','close','seal','canary_restore']);if(Object.values(r.effectReceipts).some(v=>!hex(v)))fail();
+  for(const kind of Object.keys(r.effectReceipts)){const journal=await storage.get(GUARD+p.intentId+':effect:'+kind),claim=await storage.get(ROOT+':'+p.intentId+':effect:'+kind);if(journal?.phase!=='complete'||journal.controlHash!==c.controlHash||hash(journal)!==r.effectReceipts[kind]||hash(claim)!==journal.claimHash||claim?.phase!=='issued'||claim.controlHash!==c.controlHash||kind==='canary_restore'&&claim.proofHash!==r.proofHash)fail();}
+  return out('complete',{receipt:r});
+ }
+ async function retainCompletion(assertParent=()=>{}){
+  if(typeof assertParent!=='function')fail();const lease=()=>{assertParent();if(now()>=p.C1)fail();};lease();
+  await checked();lease();const existing=await completion();lease();if(existing.status==='complete')return existing;
+  const proof=await read();if(proof.status!=='observed'||now()>=p.C1)return out('admin_pending');
+  const rows={};
+  for(const kind of ['withdraw','close','seal','canary_restore']){
+   const r=fields(await storage.get(GUARD+p.intentId+':effect:'+kind),['purpose','controlHash','kind','claimHash','phase','receipt','completedAt']);
+   if(r.purpose!=='afw.finite-guard-effect.v1'||r.controlHash!==c.controlHash||r.kind!==kind||r.phase!=='complete'||!hex(r.claimHash)||!time(r.completedAt)||r.completedAt>=p.C1)fail();rows[kind]=r;
+  }
+  const last=fields(rows.canary_restore.receipt,['purpose','intentId','controlHash','proofHash','versionId','deploymentId','readbackHash','observedAt']);
+  if(last.purpose!=='afw.finite-canary-restored.v1'||last.intentId!==p.intentId||last.controlHash!==c.controlHash||last.proofHash!==proof.record.proofHash||last.versionId!==p.deployments.canaryClosed.versionId||!hex(last.readbackHash)||!time(last.observedAt)||last.observedAt<proof.record.capturedAt||last.observedAt>=p.C1)fail();
+  const body={purpose:'afw.finite-cleanup-completion.v1',intentId:p.intentId,controlHash:c.controlHash,proofHash:proof.record.proofHash,completedAt:now(),canaryVersionId:last.versionId,canaryDeploymentId:last.deploymentId,readbackHash:last.readbackHash,effectReceipts:Object.fromEntries(Object.entries(rows).map(([k,v])=>[k,hash(v)]))};
+  if(body.completedAt>=p.C1)fail();
+  const receipt=data({...body,receiptHash:hash(body)});
+  await storage.transaction(async tx=>{lease();if(now()>=p.C1||await tx.get(prefix+'completion')!==undefined)fail();for(const kind of Object.keys(rows))if(!same(await tx.get(GUARD+p.intentId+':effect:'+kind),rows[kind]))fail();if(now()>=p.C1)fail();lease();await tx.put(prefix+'completion',receipt);lease();});
+  lease();if(now()>=p.C1)return out('uncertain');const seen=await completion();lease();if(!same(seen.receipt,receipt))fail();return seen;
+ }
+ return Object.freeze({identity:c,capture,read,completion,retainCompletion});
+}
+export async function readFiniteTrialCleanupProofHead({storage,...refs}){
+ const x=fields(refs,['intentId','controlHash']),c=await readFiniteCleanupControl({storage,...x}),r=await createPrivateQaFiniteCleanupStore({storage,control:c}).read();
+ return r.status==='observed'?out('observed',{intentId:x.intentId,controlHash:x.controlHash,proofHash:r.record.proofHash}):out('not_yet_observed');
+}
+export async function readRetainedFiniteCleanupProof({storage,...refs}){
+ const x=fields(refs,['intentId','proofHash']);if(!hex(x.proofHash))fail();
+ const head=await storage.get(ROOT+':head');if(head?.intentId!==x.intentId)fail();
+ const c=await readFiniteCleanupControl({storage,intentId:x.intentId,controlHash:head.controlHash}),r=await createPrivateQaFiniteCleanupStore({storage,control:c}).read();
+ if(r.status!=='observed')return r;if(r.record.proofHash!==x.proofHash)fail();return r;
+}
+export async function readFiniteTrialCleanupCompletion({storage,...refs}){
+ const x=fields(refs,['intentId','controlHash','proofHash']);if(!hex(x.proofHash))fail();
+ const c=await readFiniteCleanupControl({storage,intentId:x.intentId,controlHash:x.controlHash}),s=createPrivateQaFiniteCleanupStore({storage,control:c}),r=await s.read();
+ if(r.status!=='observed')return out('not_yet_observed');if(r.record.proofHash!==x.proofHash)fail();return s.completion();
+}

~~~~~~~~~~

## lib/mcp-qa-finite-confirmation-source.mjs

~~~~~~~~~~diff
diff --git a/lib/mcp-qa-finite-confirmation-source.mjs b/lib/mcp-qa-finite-confirmation-source.mjs
--- /dev/null
+++ b/lib/mcp-qa-finite-confirmation-source.mjs
@@ -0,0 +1,7 @@
+/** Fixed native-entry C2 boundary; never request input or runtime registration.
+ * C2 owns immutable first HEAD/control/SEND/private bundle transport, current
+ * primary/consent, actual source/binding/provider provenance. Default closed. */
+export async function readPrivateQaFiniteConfirmationMaterial({env,event,step,parent}){
+ void env;void event;void step;void parent;
+ throw Error('Finite confirmation material unavailable');
+}

~~~~~~~~~~

## lib/mcp-qa-finite-confirmation.mjs

~~~~~~~~~~diff
diff --git a/lib/mcp-qa-finite-confirmation.mjs b/lib/mcp-qa-finite-confirmation.mjs
--- /dev/null
+++ b/lib/mcp-qa-finite-confirmation.mjs
@@ -0,0 +1,78 @@
+import {finiteLauncherInstanceId} from './mcp-qa-finite-launch-records.mjs';
+import {createHash} from 'node:crypto';
+import {readPrivateQaFiniteConfirmationMaterial} from './mcp-qa-finite-confirmation-source.mjs';
+import {readPrivateQaFinitePlan} from './mcp-qa-finite-trial-control.mjs';
+import {createPrivateQaFiniteLaunchParent} from './mcp-qa-finite-launch-inventory.mjs';
+import {validateFiniteReleaseOperatorBundle} from './mcp-release-operator-policy.mjs';
+import {runFiniteKnownCancellationReleaseWorkflow} from './mcp-release-runtime.mjs';
+import {finiteFields as fields,finiteHex as hex,finiteTime as time,finiteSame as same} from './mcp-finite-evidence.mjs';
+const fail=()=>{throw Error('Finite confirmation unavailable');};
+const nativeDateTime=Date.prototype.getTime;
+const hash=s=>createHash('sha256').update(s).digest('hex');
+const executionKeys=['intentId','finitePlanHash','controlHash','sourceRevision','qaVersionId','actorId','launcherId','nominalId','bundleHash','preparedHash','sendHash','bindingHash','createdAt'];
+const pending=()=>({status:'blocked',mayRetry:false,operationalReadiness:false});
+/** Facts-only parser. expectedExecution is the SOURCE-INTERNAL correlated
+ * context, never RPC authority. No status here attests terminal/physical stop. */
+export function validatePrivateQaFiniteConfirmationResult(value,expectedExecution){
+ const seen=new Set();let nodes=0;
+ const ownData=v=>{
+  if(++nodes>4096)fail();
+  if(v===null||typeof v==='boolean'||typeof v==='number'&&Number.isFinite(v))return;
+  if(typeof v==='string'){if(Buffer.byteLength(v)>65536)fail();return;}
+  if(!v||typeof v!=='object'||seen.has(v)||seen.size>=16||Object.getPrototypeOf(v)!==(Array.isArray(v)?Array.prototype:Object.prototype))fail();
+  seen.add(v);
+  const keys=Reflect.ownKeys(v);
+  if(Array.isArray(v)&&(keys.length!==v.length+1||!Number.isSafeInteger(v.length)||v.length>4096))fail();
+  for(const k of keys){
+   if(Array.isArray(v)&&k==='length')continue;
+   const d=Object.getOwnPropertyDescriptor(v,k);
+   if(typeof k!=='string'||['__proto__','constructor','toJSON'].includes(k)||!d?.enumerable||!Object.hasOwn(d,'value')||Array.isArray(v)&&(!/^(0|[1-9][0-9]*)$/.test(k)||Number(k)>=v.length))fail();
+   ownData(d.value);
+  }seen.delete(v);
+ };
+ ownData(value);if(Buffer.byteLength(JSON.stringify(value))>65536)fail();
+ const e=fields(expectedExecution,executionKeys),r=fields(value,['purpose','provenance','result']),keys=executionKeys.filter(k=>!['actorId','launcherId'].includes(k)),provenance=fields(r.provenance,keys);
+ if(!hex(e.sourceRevision,40)||!time(e.createdAt)||['finitePlanHash','controlHash','actorId','bundleHash','preparedHash','sendHash','bindingHash'].some(k=>!hex(e[k]))||!(/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/).test(e.qaVersionId)||e.launcherId!==finiteLauncherInstanceId({intentId:e.intentId,sourceRevision:e.sourceRevision})||e.nominalId!=='afw-release-'+e.bundleHash)fail();
+ if(r.purpose!=='afw.finite-confirmation-result.v1'||keys.some(k=>provenance[k]!==e[k])||!r.result||Object.getPrototypeOf(r.result)!==Object.prototype)fail();
+ return value;
+}
+/** Original event enters once; hydration spends its original70s envelope. The
+ * existing Known wrapper owns all eighteen business stages and cancellation. */
+export async function runPrivateQaFiniteConfirmation({env,event,step}){
+ let timer,active=true;
+ try{
+  const entered=Date.now(),timestamp=event.timestamp,createdAt=Reflect.apply(nativeDateTime,timestamp,[]),payload=event.payload,instanceId=event.instanceId,workflowName=event.workflowName;
+  const input=fields(payload,['planHash']),bundleHash=input.planHash,version=env.AFW_QA_VERSION?.id,namespace=env.AFW_INDEPENDENT_CLOSURE,stepDo=step?.do;
+  if(!time(entered)||!time(createdAt)||createdAt>entered||entered>=createdAt+70000||!hex(bundleHash)||instanceId!=='afw-release-'+bundleHash||event.schedule!==undefined||workflowName!==undefined&&workflowName!=='afw-own-qa-private-confirmation'||typeof stepDo!=='function')fail();
+  const parent=createPrivateQaFiniteLaunchParent({deadline:Math.min(entered+5000,createdAt+70000)});
+  const check=()=>{
+   const at=parent.check();
+   if(!active||event.timestamp!==timestamp||Reflect.apply(nativeDateTime,timestamp,[])!==createdAt||event.payload!==payload||fields(payload,['planHash']).planHash!==bundleHash||event.instanceId!==instanceId||event.schedule!==undefined||event.workflowName!==workflowName||env.AFW_QA_VERSION?.id!==version||env.AFW_INDEPENDENT_CLOSURE!==namespace||step.do!==stepDo)fail();
+   return at;
+  };
+  const inspect=value=>{
+   const m=fields(value,['bundle','plan','execution']),{plan:p,planHash}=readPrivateQaFinitePlan(m.plan),e=fields(m.execution,executionKeys);
+   validateFiniteReleaseOperatorBundle(m.bundle);
+   if(m.bundle.policy.operation!=='confirm_named'||hash(JSON.stringify(m.bundle))!==bundleHash||e.bundleHash!==bundleHash||p.bundleHash!==bundleHash||e.nominalId!==instanceId||p.workflows.confirmation!==instanceId||e.createdAt!==createdAt||createdAt<p.launchPolicy.launchAt||createdAt>p.launchPolicy.lastCreateAt)fail();
+   if(e.intentId!==p.intentId||e.finitePlanHash!==planHash||e.sourceRevision!==p.source.revision||e.qaVersionId!==version||p.deployments.qaLive.versionId!==version||e.actorId!==p.resources.actorId||namespace.idFromName('afw-own-successor-closure-v1').toString()!==e.actorId||e.launcherId!==p.workflows.launcher||['controlHash','preparedHash','sendHash','bindingHash'].some(k=>!hex(e[k])))fail();
+   const binding={accountId:'85d0d5dadac3341a564f22ce885e9eec',bindingName:'AFW_QA_NAMED_CONFIRMATION',className:'PrivateQaNamedConfirmation',definitionName:'afw-own-qa-private-confirmation',qaVersionId:version,scriptName:'agent-friendly-web-independent-closure-qa',sourceModuleHash:p.source.moduleHash,sourceProfileHash:p.source.profileHash,sourceRevision:p.source.revision};
+   if(e.bindingHash!==hash('afw.finite-native-child-binding.v1\n'+JSON.stringify(Object.fromEntries(Object.keys(binding).sort().map(k=>[k,binding[k]])))))fail();
+   const at=check();if(at>=Math.min(p.N1,p.selectors.expiresAt,m.bundle.policy.expiresAt)||at<m.bundle.policy.startAt)fail();
+   return {m,p,e};
+  };
+  const material=await Promise.race([(async()=>{
+   check();const first=inspect(await readPrivateQaFiniteConfirmationMaterial({env,event,step,parent}));check();
+   // Re-read fixed current source/owner/consent immediately before handoff.
+   const second=inspect(await readPrivateQaFiniteConfirmationMaterial({env,event,step,parent}));check();
+   if(!same(first.m,second.m))fail();return first;
+  })(),new Promise((_,reject)=>{timer=setTimeout(()=>{active=false;reject(Error('Finite confirmation unavailable'));},parent.deadline-entered);})]);
+  check();clearTimeout(timer);
+  const {m,e}=material,provenance=Object.fromEntries(executionKeys.filter(k=>!['actorId','launcherId'].includes(k)).map(k=>[k,e[k]]));
+  // Do not copy event/env/step, add a fifth argument, reset its timestamp or
+  // introduce a stage into Known. Its end is original event.timestamp+70000.
+  const result=await runFiniteKnownCancellationReleaseWorkflow({bundle:m.bundle,env,event,step});
+  if(result===undefined||result===null)fail();
+  return validatePrivateQaFiniteConfirmationResult({purpose:'afw.finite-confirmation-result.v1',provenance,result},e);
+ }catch{return pending();}
+ finally{active=false;clearTimeout(timer);}
+}

~~~~~~~~~~

## lib/mcp-qa-finite-connection-preparation.mjs

~~~~~~~~~~diff
diff --git a/lib/mcp-qa-finite-connection-preparation.mjs b/lib/mcp-qa-finite-connection-preparation.mjs
--- /dev/null
+++ b/lib/mcp-qa-finite-connection-preparation.mjs
@@ -0,0 +1,48 @@
+import {observeFiniteOwnerStageWork,retainFiniteOwnerStagePromise} from './mcp-qa-finite-stage-work.mjs';
+import {createFinitePolicyTransport} from './mcp-qa-finite-policy-transport.mjs';
+import {readFiniteOwnerPreparationFacts,readFiniteOwnerRequestDeadline} from './mcp-qa-finite-owner-preparation.mjs';
+import {createFiniteOwnerPreparationStore} from './mcp-qa-finite-preparation-store.mjs';
+import {hashFinitePreparationRecord as hash,encodeFinitePreparationRecord as encode} from './mcp-qa-finite-preparation-records.mjs';
+const pending=()=>Object.freeze({status:'admin_pending',mayRetry:false,operationalReadiness:false});
+const fail=()=>{throw Error('Finite connection preparation unavailable');};
+/** Fixed owner-stage coordinator; accepts only refs and the original admitted lease. */
+export function createFiniteConnectionPreparation({ctx,env}){
+ return Object.freeze({async run(refs,originalLease){
+  // Transport consumes admission and denies another outstanding lineage before
+  // source IO. This exact continuation shares its retained native stage scope.
+  const result=await createFinitePolicyTransport({ctx,env}).run(refs,originalLease);
+  if(result.outcome.status!=='installed'||refs.stage!=='finite')return result.outcome;
+  const admission=result.admission;
+  try{return await observeFiniteOwnerStageWork({ctx,env,admission,originalLease},async()=>{
+  const lease=admission.lease,storage=ctx.storage,db=env.RELEASE_DB,end=readFiniteOwnerRequestDeadline(originalLease),track=retainFiniteOwnerStagePromise;
+  let commandBy=end;
+  const guard=()=>{lease.assertCurrent();if(lease.signal.aborted||ctx.storage!==storage||env.RELEASE_DB!==db||Date.now()>=Math.min(end,commandBy))fail();};
+  async function child(fn){
+   guard();const at=Date.now(),mono=performance.now(),deadline=Math.min(end,commandBy,at+5000),controller=new AbortController();let alive=true,timer,last=at;
+   const c=Object.freeze({signal:controller.signal,assertCurrent(){guard();const now=Date.now(),elapsed=performance.now()-mono;if(!alive||now<last||now>=deadline||elapsed<0||elapsed>=deadline-at)fail();last=now;}});
+   const actual=track(Promise.resolve().then(()=>{c.assertCurrent();return fn(c);}));
+   try{const answer=await Promise.race([actual,new Promise((_,reject)=>{timer=setTimeout(()=>{alive=false;controller.abort();reject(Error('Finite preparation child expired'));},Math.max(1,deadline-Date.now()));})]);c.assertCurrent();return answer;}
+   finally{alive=false;controller.abort();clearTimeout(timer);}
+  }
+  const actual=track((async()=>{
+   guard();
+   const facts=await child(l=>readFiniteOwnerPreparationFacts({ctx,env,preconnectionId:refs.preconnectionId},l));guard();commandBy=facts.value.commandBy;guard();
+   const stable=v=>JSON.stringify(Object.fromEntries(Object.entries(v).filter(([k])=>!['phase','currentPublication'].includes(k))));
+   if(facts.stageApprovalHash!==admission.stageApprovalHash||encode('ConnectionReceipt',facts.receipt)!==encode('ConnectionReceipt',result.outcome.receipt)||stable(facts.ownerSource)!==stable(admission.ownerSource))fail();
+   const selectedAt=Date.now(),preparation={...facts.value,selectedAt};preparation.preparationHash=hash('OwnerPreparation',preparation);
+   const store=createFiniteOwnerPreparationStore({storage,now:Date.now}),prior=await child(l=>store.readSelected({sourceRevision:preparation.sourceRevision},l));
+   // A prior factual selection is not admission or an opportunity to overwrite
+   // another live preparation; source qualification owns lineage reconciliation.
+   if(prior)fail();
+   const selection={purpose:'afw.finite-owner-selection.v1',sourceRevision:preparation.sourceRevision,prepId:preparation.prepId,preparationHash:preparation.preparationHash,selectedAt,sequence:1,previousSelectionHash:null};selection.selectionHash=hash('Selection',selection);
+   const saved=await child(l=>store.publishSelection({preparation,selection,expectedHeadHash:null},l));guard();
+   if(saved.status!=='recorded'||saved.recordHash!==selection.selectionHash)fail();
+   const read=await child(l=>store.readSelected({sourceRevision:preparation.sourceRevision},l)),witness=await child(l=>store.readSelectionPublication({sourceRevision:preparation.sourceRevision,selectionHash:selection.selectionHash},l));
+   if(!read||encode('OwnerPreparation',read.preparation)!==encode('OwnerPreparation',preparation)||encode('Selection',read.selection)!==encode('Selection',selection)||!witness||witness.publishedAt<selectedAt||witness.publishedAt>=commandBy)fail();
+   const final=await child(l=>readFiniteOwnerPreparationFacts({ctx,env,preconnectionId:refs.preconnectionId},l));
+   if(final.value.auditHash!==facts.value.auditHash||final.stageApprovalHash!==admission.stageApprovalHash)fail();guard();return result.outcome;
+  })());
+  try{return await actual;}catch{return pending();}
+  });}catch{return pending();}
+ }});
+}

~~~~~~~~~~
