# Whole-branch review packet 3/26 — product

PROJECT=AFW; repository=tokenizartinfo-ops/agent-friendly-web; SOURCE head=8b2380c9bcc9c383ec46590df1403eed19fd2659; tree=07079c8cc3670a6a1db51ca1daadbf3172c2d445; mergebase=f4ff51596be918e9d556f6765aeb0441133ff52f. Review index in this directory is authoritative for complete579file/954commit coverage. This packet contains full U10 diffs and exact blob provenance for 28 files; no runtime or merge authorization. Generated in cloud tool memory from pinned GitHub text, no local checkout/build.

## Packet manifest

- lib/mcp-qa-finite-owner-notice-get-forward.mjs: ABSENT -> ea910f0fcdeade5a794ddaa60898706924e72f80; full diff chars=4983
- lib/mcp-qa-finite-owner-notice-get-qa.mjs: ABSENT -> f63e820a886af5b73a6a7b8b8ea22bc8d12b0106; full diff chars=1580
- lib/mcp-qa-finite-owner-notice-get-wire.mjs: ABSENT -> da8c3f8ac66699fd207989058f4a1425b0ee36c0; full diff chars=3935
- lib/mcp-qa-finite-owner-oauth-forward.mjs: ABSENT -> f7979579fcb6d00b3d5d68c7790089c803f4170f; full diff chars=3408
- lib/mcp-qa-finite-owner-oauth-qa.mjs: ABSENT -> ec5c16161bffc6e6d19de153b4465bf6ae748493; full diff chars=1063
- lib/mcp-qa-finite-owner-oauth-wire.mjs: ABSENT -> fc113a05e7f6d1ef72cd045a55c5934b357aa724; full diff chars=4419
- lib/mcp-qa-finite-owner-phase-context.mjs: ABSENT -> e482ad1617adc001c3a32c94e71eeb41d27f3d1d; full diff chars=126491
- lib/mcp-qa-finite-owner-preparation-qa.mjs: ABSENT -> 67f9da98bf4cc749bfe1c6cb4d5fe8bcbc64a354; full diff chars=780
- lib/mcp-qa-finite-owner-preparation.mjs: ABSENT -> 152e730f83af7ef063b6b1db89f8b0a779c2b60e; full diff chars=45904
- lib/mcp-qa-finite-owner-sdk-binding-facts.mjs: ABSENT -> c535ad8a7ba5d11618bc2b6da3eacc93d7b7447e; full diff chars=3329
- lib/mcp-qa-finite-owner-source.mjs: ABSENT -> 6bc88c44eae3c0b63db514833c3f0eae43eb1c0e; full diff chars=818
- lib/mcp-qa-finite-owner-stage-facts.mjs: ABSENT -> c2821f1b5806a1f8cc968425ba748d0e26f18a0b; full diff chars=6882
- lib/mcp-qa-finite-package.mjs: ABSENT -> fd56ac8ac27ab236a728230086ba2ebd1f1ed4c4; full diff chars=14752
- lib/mcp-qa-finite-policy-configuration.mjs: ABSENT -> 57ce0b4eeffadcf7e34946da3444e88b2bb437ee; full diff chars=3862
- lib/mcp-qa-finite-policy-journal.mjs: ABSENT -> 6e3de33d04075740fb57e5f9afcf87dd9f68ee79; full diff chars=9178
- lib/mcp-qa-finite-policy-setup-source.mjs: ABSENT -> a2fcb074e71ca5f6d983c8cb8e9e7db993ef27fb; full diff chars=926
- lib/mcp-qa-finite-policy-setup.mjs: ABSENT -> 34285e7c8ee3d9838763344edba2dcf6ce33da9b; full diff chars=17710
- lib/mcp-qa-finite-policy-transport.mjs: ABSENT -> fa1cb012d65acc0457f7263d01bb5fd88a0cb8a6; full diff chars=13439
- lib/mcp-qa-finite-prearm-profile.mjs: ABSENT -> 504fa988c4e6f5db0e4d21c3da32cb69017bc2e8; full diff chars=1140
- lib/mcp-qa-finite-preparation-cleanup-records.mjs: ABSENT -> 7ae2b380a7b9c88164e6c7934ec7b6fc1577e49b; full diff chars=3148
- lib/mcp-qa-finite-preparation-cleanup.mjs: ABSENT -> e9999c6ea5d086599844f86120cb0e3449f5d636; full diff chars=4482
- lib/mcp-qa-finite-preparation-enrollment-facts.mjs: ABSENT -> b5b6d6a8f55376d61da6f8bc4809a986dfe0aca7; full diff chars=7946
- lib/mcp-qa-finite-preparation-enrollment-writer.mjs: ABSENT -> 6eb0f08d581faef8ee12ce4f9e0d62cebdfb57f9; full diff chars=13495
- lib/mcp-qa-finite-preparation-issuer-journal.mjs: ABSENT -> 414450aa08f797bed5a41cf5cc697342785ce16b; full diff chars=7282
- lib/mcp-qa-finite-preparation-issuer-records.mjs: ABSENT -> 50f9a013580a46ad1d445a240f47b7b2ce887d49; full diff chars=5165
- lib/mcp-qa-finite-preparation-issuer-store.mjs: ABSENT -> efc25b2af9c80b8eb27cffe219544e974002293e; full diff chars=32088
- lib/mcp-qa-finite-preparation-notice-journal.mjs: ABSENT -> b9c15aba18e2442a0ed864b8afd5e86313c5e470; full diff chars=6765
- lib/mcp-qa-finite-preparation-notice-records.mjs: ABSENT -> 8c9386b27109cd056d3f70d91ab3cb6c6f40b4e9; full diff chars=4800

## lib/mcp-qa-finite-owner-notice-get-forward.mjs

~~~~~~~~~~diff
diff --git a/lib/mcp-qa-finite-owner-notice-get-forward.mjs b/lib/mcp-qa-finite-owner-notice-get-forward.mjs
--- /dev/null
+++ b/lib/mcp-qa-finite-owner-notice-get-forward.mjs
@@ -0,0 +1,40 @@
+import {retainFiniteOwnerStagePromise as retain} from './mcp-qa-finite-stage-work.mjs';
+import {readFiniteOwnerRequestContext,readFiniteOwnerRequestBoundary} from './mcp-qa-finite-owner-preparation.mjs';
+import {observeFiniteOwnerRequestWork} from './mcp-qa-finite-stage-work.mjs';
+import {finiteNativeFailure as fail,finiteNativeUuid} from './mcp-qa-finite-owner-native-wire.mjs';
+import {finiteNativeActor,finiteNativePreservedHeaders,finiteNativeOperation,finiteNativeBytes,finiteNativePending as pending} from './mcp-qa-finite-owner-native-wire.mjs';
+import {readFiniteOwnerNoticeConsentBody} from './mcp-qa-finite-owner-notice-consent-body.mjs';
+import {finiteOwnerNoticeGetTarget,qualifyFiniteOwnerNoticeGetRequest,readFiniteOwnerNoticeGetMetadata,finiteOwnerNoticeConsentTarget,qualifyFiniteOwnerNoticeConsentRequest,readFiniteOwnerNoticeConsentMetadata} from './mcp-qa-finite-owner-notice-get-wire.mjs';
+/** Unmounted forwarding only. Transport metadata never asserts SDK results. */
+export function forwardPrivateFiniteOwnerNoticeGet(input,originalLease){return forward(input,originalLease,false);}
+export function forwardPrivateFiniteOwnerNoticeConsent(input,originalLease){return forward(input,originalLease,true);}
+async function forward({request,env,ctx},originalLease,consent){
+ try{
+  if(readFiniteOwnerRequestContext(originalLease).root!==originalLease)fail();
+  const originalHeaders=request.headers,headerBytes=JSON.stringify([...originalHeaders]),originalSignal=request.signal,originalUrl=request.url,originalMethod=request.method;
+  const namespace=env?.AFW_FINITE_TRIAL_CONTROL,idFromName=namespace?.idFromName,get=namespace?.get,metadata=env?.AFW_FINITE_TRIAL_VERSION,version=metadata?.id;
+  if([idFromName,get].some(v=>typeof v!=='function')||!finiteNativeUuid(version))fail();
+  const id=Reflect.apply(idFromName,namespace,[finiteNativeActor]),actor=id.toString(),stub=Reflect.apply(get,namespace,[id]),fetcher=stub?.fetch;
+  if(!/^[a-f0-9]{64}$/.test(actor)||typeof fetcher!=='function')fail();
+  let failed=false;const check=()=>{if(failed)fail();originalLease.assertCurrent();if(request.headers!==originalHeaders||JSON.stringify([...originalHeaders])!==headerBytes||request.signal!==originalSignal||request.url!==originalUrl||request.method!==originalMethod||env.AFW_FINITE_TRIAL_CONTROL!==namespace||namespace.idFromName!==idFromName||namespace.get!==get||Reflect.apply(idFromName,namespace,[finiteNativeActor]).toString()!==actor||stub.fetch!==fetcher||env.AFW_FINITE_TRIAL_VERSION!==metadata||metadata.id!==version)fail();};
+  check();
+  return await observeFiniteOwnerRequestWork({ctx,env,originalLease},()=>finiteNativeOperation(originalLease,ctx,async signalFailure=>{
+   const first=error=>{failed=true;signalFailure(error);};
+   const bytes=await (consent?readFiniteOwnerNoticeConsentBody:finiteNativeBytes)(request,check,first);check();(consent?qualifyFiniteOwnerNoticeConsentRequest:qualifyFiniteOwnerNoticeGetRequest)(request,bytes);
+   const headers=new Headers();for(const name of finiteNativePreservedHeaders){const value=request.headers.get(name);if(value!==null)headers.set(name,value);}
+   headers.set('x-afw-finite-boundary',JSON.stringify(readFiniteOwnerRequestBoundary(originalLease)));
+   headers.set('x-afw-finite-original-method',request.method);headers.set('x-afw-finite-original-url',request.url);
+   headers.set('x-afw-finite-version',version);headers.set('x-afw-finite-request-id',crypto.randomUUID());
+   (consent?readFiniteOwnerNoticeConsentMetadata:readFiniteOwnerNoticeGetMetadata)(headers);check();
+   let response;try{
+   response=await retain(Reflect.apply(fetcher,stub,[new Request(consent?finiteOwnerNoticeConsentTarget:finiteOwnerNoticeGetTarget,{method:'POST',redirect:'manual',headers,body:bytes.length?bytes:undefined,signal:originalLease.signal})]));check();
+   const body=await finiteNativeBytes(response,check,first,503);check();
+   if(response.status!==200)return pending([400,401,403,404,405,413,429].includes(response.status)?response.status:503);
+   if(!/^text\/html(?:;|$)/i.test(response.headers.get('content-type')??''))fail();
+   const output=new Headers();
+   for(const [key,value]of response.headers){if(key==='x-content-type-options'){if(value!=='nosniff')fail();continue;}if(!['content-type','content-security-policy','referrer-policy','location','set-cookie','cache-control','x-frame-options'].includes(key)||value.length>8192)fail();output.append(key,value);}
+   output.set('Cache-Control','no-store');output.set('X-Content-Type-Options','nosniff');check();return new Response(body,{status:response.status,headers:output});
+   }finally{if(response?.body&&!response.body.locked)await retain(response.body.cancel()).catch(()=>{});}
+  }));
+ }catch{return pending();}
+}

~~~~~~~~~~

## lib/mcp-qa-finite-owner-notice-get-qa.mjs

~~~~~~~~~~diff
diff --git a/lib/mcp-qa-finite-owner-notice-get-qa.mjs b/lib/mcp-qa-finite-owner-notice-get-qa.mjs
--- /dev/null
+++ b/lib/mcp-qa-finite-owner-notice-get-qa.mjs
@@ -0,0 +1,18 @@
+import {finiteNativePending as pending} from './mcp-qa-finite-owner-native-wire.mjs';
+import {createFiniteOwnerForwardedRequestLease} from './mcp-qa-finite-owner-preparation.mjs';
+import {finiteOwnerNoticeGetTarget,readFiniteOwnerNoticeGetMetadata,finiteOwnerNoticeConsentTarget,readFiniteOwnerNoticeConsentMetadata} from './mcp-qa-finite-owner-notice-get-wire.mjs';
+import {handlePrivateQaFiniteOwnerNoticeGet,handlePrivateQaFiniteOwnerNoticeConsent} from './mcp-qa-finite-owner-phase-context.mjs';
+export function createPrivateQaFiniteOwnerNoticeGetReceiver(input){return receiver(input,false);}
+export function createPrivateQaFiniteOwnerNoticeConsentReceiver(input){return receiver(input,true);}
+function receiver({ctx,env},consent){
+ return Object.freeze({async fetch(request){
+  let parent;
+  try{
+   if(!(request instanceof Request)||request.url!==(consent?finiteOwnerNoticeConsentTarget:finiteOwnerNoticeGetTarget))return pending(404);
+   if(request.method!=='POST')return pending(405);
+   const metadata=(consent?readFiniteOwnerNoticeConsentMetadata:readFiniteOwnerNoticeGetMetadata)(request.headers);
+   parent=createFiniteOwnerForwardedRequestLease(request,metadata.boundary);
+   return await (consent?handlePrivateQaFiniteOwnerNoticeConsent:handlePrivateQaFiniteOwnerNoticeGet)({request,env,ctx},parent.lease);
+  }catch{return pending();}finally{parent?.finish();}
+ }});
+}

~~~~~~~~~~

## lib/mcp-qa-finite-owner-notice-get-wire.mjs

~~~~~~~~~~diff
diff --git a/lib/mcp-qa-finite-owner-notice-get-wire.mjs b/lib/mcp-qa-finite-owner-notice-get-wire.mjs
--- /dev/null
+++ b/lib/mcp-qa-finite-owner-notice-get-wire.mjs
@@ -0,0 +1,51 @@
+import {finiteNativeOrigin as origin,finiteNativeHeaders,finiteNativeUuid,finiteNativeFailure as fail} from './mcp-qa-finite-owner-native-wire.mjs';
+export const finiteOwnerNoticeGetTarget='https://afw-private.invalid/_finite-owner/monitoring';
+// Historical get filename; both fixed notice conduits share grammar only.
+export const finiteOwnerNoticeConsentTarget='https://afw-private.invalid/_finite-owner/monitoring/grant';
+const max=16384;
+function cookieList(headers){
+ const raw=headers.get('Cookie'),assertion=headers.get('Cf-Access-Jwt-Assertion')??'';
+ if((raw?.length??0)>8192||assertion.length>8192||/[\r\n]/.test((raw??'')+assertion))fail(400);
+ if(raw===null)return;
+ const cookie=raw.replace(/^[ \t]+|[ \t]+$/g,'');if(!cookie)fail(400);
+ const names=new Set();
+ for(const part of cookie.split('; ')){
+  const at=part.indexOf('='),name=part.slice(0,at),value=part.slice(at+1);
+  if(at<1||!/^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/.test(name)||names.has(name))fail(400);
+  names.add(name);
+  const octets=value.startsWith('"')&&value.endsWith('"')&&value.length>=2?value.slice(1,-1):value;
+  if(!/^[\x21\x23-\x2b\x2d-\x3a\x3c-\x5b\x5d-\x7e]*$/.test(octets))fail(400);
+ }
+}
+function metadata(headers,method,url){
+ const entries=[...headers].filter(([key])=>key.startsWith('x-afw-finite-'));
+ if(entries.length!==finiteNativeHeaders.length||entries.some(([key])=>!finiteNativeHeaders.includes(key))||Buffer.byteLength(JSON.stringify(entries))>max)fail(400);
+ const raw=headers.get('x-afw-finite-boundary');let boundary;try{boundary=JSON.parse(raw);}catch{fail(400);}
+ if(!boundary||!['startedAt','deadline','remainingMs'].every(k=>Number.isSafeInteger(boundary[k]))||JSON.stringify({startedAt:boundary.startedAt,deadline:boundary.deadline,remainingMs:boundary.remainingMs})!==raw)fail(400);
+ const mVersionId=headers.get('x-afw-finite-version'),requestId=headers.get('x-afw-finite-request-id');
+ if(headers.get('x-afw-finite-original-method')!==method||headers.get('x-afw-finite-original-url')!==url||!finiteNativeUuid(mVersionId)||!finiteNativeUuid(requestId))fail(400);
+ return Object.freeze({boundary,method,url,mVersionId,requestId});
+}
+export function qualifyFiniteOwnerNoticeGetRequest(request,bytes){
+ if(!(request instanceof Request)||!(bytes instanceof Uint8Array)||bytes.length||request.url.length>max)fail(400);
+ if(request.url!==origin+'/monitoring')fail(404);
+ if(request.method!=='GET')fail(405);
+ const from=request.headers.get('Origin');if(from!==null&&from!==origin)fail(403);
+ cookieList(request.headers);
+ return Object.freeze({method:'GET',url:request.url});
+}
+export function readFiniteOwnerNoticeGetMetadata(headers){return metadata(headers,'GET',origin+'/monitoring');}
+export function readFiniteOwnerNoticeConsentMetadata(headers){return metadata(headers,'POST',origin+'/monitoring/grant');}
+export function qualifyFiniteOwnerNoticeConsentRequest(request,bytes){
+ if(!(request instanceof Request)||!(bytes instanceof Uint8Array)||!bytes.length||bytes.length>1024||request.url.length>max)fail(400);
+ if(request.url!==origin+'/monitoring/grant')fail(404);
+ if(request.method!=='POST')fail(405);
+ if(request.headers.get('Origin')!==origin)fail(403);
+ if(request.headers.get('Content-Type')!=='application/x-www-form-urlencoded')fail(400);
+ cookieList(request.headers);
+ let text;try{text=new TextDecoder('utf-8',{fatal:true}).decode(bytes);}catch{fail(400);}
+ if(/%(?![a-f0-9]{2})/i.test(text))fail(400);
+ const form=new URLSearchParams(text),entries=[...form];
+ if(entries.length!==1||entries[0][0]!=='handle'||form.getAll('handle').length!==1||!/^[A-Za-z0-9_-]{43}$/.test(entries[0][1]))fail(400);
+ return Object.freeze({method:'POST',url:request.url,handle:entries[0][1]});
+}

~~~~~~~~~~

## lib/mcp-qa-finite-owner-oauth-forward.mjs

~~~~~~~~~~diff
diff --git a/lib/mcp-qa-finite-owner-oauth-forward.mjs b/lib/mcp-qa-finite-owner-oauth-forward.mjs
--- /dev/null
+++ b/lib/mcp-qa-finite-owner-oauth-forward.mjs
@@ -0,0 +1,30 @@
+import {readFiniteOwnerRequestContext,readFiniteOwnerRequestBoundary} from './mcp-qa-finite-owner-preparation.mjs';
+import {observeFiniteOwnerRequestWork} from './mcp-qa-finite-stage-work.mjs';
+import {finiteNativeFailure as fail,finiteNativeUuid} from './mcp-qa-finite-owner-native-wire.mjs';
+import {finiteOwnerOAuthTarget,qualifyFiniteOwnerOAuthRequest,readFiniteOwnerOAuthMetadata,finiteNativeActor,finiteNativePreservedHeaders,finiteNativeOperation,finiteNativeBytes,finiteNativePending as pending} from './mcp-qa-finite-owner-oauth-wire.mjs';
+/** Unmounted forwarding only. Transport metadata never asserts SDK results. */
+export async function forwardPrivateFiniteOwnerOAuth({request,env,ctx},originalLease){
+ try{
+  if(readFiniteOwnerRequestContext(originalLease).root!==originalLease)fail();
+  const namespace=env?.AFW_FINITE_TRIAL_CONTROL,idFromName=namespace?.idFromName,get=namespace?.get,metadata=env?.AFW_FINITE_TRIAL_VERSION,version=metadata?.id;
+  if([idFromName,get].some(v=>typeof v!=='function')||!finiteNativeUuid(version))fail();
+  const id=Reflect.apply(idFromName,namespace,[finiteNativeActor]),actor=id.toString(),stub=Reflect.apply(get,namespace,[id]),fetcher=stub?.fetch;
+  if(!/^[a-f0-9]{64}$/.test(actor)||typeof fetcher!=='function')fail();
+  const check=()=>{originalLease.assertCurrent();if(env.AFW_FINITE_TRIAL_CONTROL!==namespace||namespace.idFromName!==idFromName||namespace.get!==get||Reflect.apply(idFromName,namespace,[finiteNativeActor]).toString()!==actor||stub.fetch!==fetcher||env.AFW_FINITE_TRIAL_VERSION!==metadata||metadata.id!==version)fail();};
+  check();
+  return await observeFiniteOwnerRequestWork({ctx,env,originalLease},()=>finiteNativeOperation(originalLease,ctx,async first=>{
+   const bytes=await finiteNativeBytes(request,check,first);check();qualifyFiniteOwnerOAuthRequest(request,bytes);
+   const headers=new Headers();for(const name of finiteNativePreservedHeaders){const value=request.headers.get(name);if(value!==null)headers.set(name,value);}
+   headers.set('x-afw-finite-boundary',JSON.stringify(readFiniteOwnerRequestBoundary(originalLease)));
+   headers.set('x-afw-finite-original-method',request.method);headers.set('x-afw-finite-original-url',request.url);
+   headers.set('x-afw-finite-version',version);headers.set('x-afw-finite-request-id',crypto.randomUUID());
+   readFiniteOwnerOAuthMetadata(headers);check();
+   const response=await Reflect.apply(fetcher,stub,[new Request(finiteOwnerOAuthTarget,{method:'POST',redirect:'manual',headers,body:bytes.length?bytes:undefined,signal:originalLease.signal})]);check();
+   const body=await finiteNativeBytes(response,check,first,503);check();
+   if(![200,302].includes(response.status))return pending([400,401,403,404,405,413,429].includes(response.status)?response.status:503);
+   const output=new Headers({'Cache-Control':'no-store'});
+   for(const [key,value]of response.headers){if(!['content-type','content-security-policy','referrer-policy','location','set-cookie','cache-control','x-frame-options'].includes(key)||value.length>8192)fail();output.append(key,value);}
+   check();return new Response(body,{status:response.status,headers:output});
+  }));
+ }catch{return pending();}
+}

~~~~~~~~~~

## lib/mcp-qa-finite-owner-oauth-qa.mjs

~~~~~~~~~~diff
diff --git a/lib/mcp-qa-finite-owner-oauth-qa.mjs b/lib/mcp-qa-finite-owner-oauth-qa.mjs
--- /dev/null
+++ b/lib/mcp-qa-finite-owner-oauth-qa.mjs
@@ -0,0 +1,15 @@
+import {createFiniteOwnerForwardedRequestLease} from './mcp-qa-finite-owner-preparation.mjs';
+import {finiteOwnerOAuthTarget,readFiniteOwnerOAuthMetadata,finiteNativePending as pending} from './mcp-qa-finite-owner-oauth-wire.mjs';
+import {handlePrivateQaFiniteOwnerOAuth} from './mcp-qa-finite-owner-phase-context.mjs';
+export function createPrivateQaFiniteOwnerOAuthReceiver({ctx,env}){
+ return Object.freeze({async fetch(request){
+  let parent;
+  try{
+   if(!(request instanceof Request)||request.url!==finiteOwnerOAuthTarget)return pending(404);
+   if(request.method!=='POST')return pending(405);
+   const metadata=readFiniteOwnerOAuthMetadata(request.headers);
+   parent=createFiniteOwnerForwardedRequestLease(request,metadata.boundary);
+   return await handlePrivateQaFiniteOwnerOAuth({request,env,ctx},parent.lease);
+  }catch{return pending();}finally{parent?.finish();}
+ }});
+}

~~~~~~~~~~

## lib/mcp-qa-finite-owner-oauth-wire.mjs

~~~~~~~~~~diff
diff --git a/lib/mcp-qa-finite-owner-oauth-wire.mjs b/lib/mcp-qa-finite-owner-oauth-wire.mjs
--- /dev/null
+++ b/lib/mcp-qa-finite-owner-oauth-wire.mjs
@@ -0,0 +1,42 @@
+import {finiteNativeOrigin as origin,finiteNativeHeaders,finiteNativeUuid,finiteNativeFailure as fail} from './mcp-qa-finite-owner-native-wire.mjs';
+export {finiteNativeOrigin,finiteNativeActor,finiteNativePreservedHeaders,finiteNativeOperation,finiteNativeBytes,finiteNativeCancel,finiteNativePending} from './mcp-qa-finite-owner-native-wire.mjs';
+export const finiteOwnerOAuthTarget='https://afw-private.invalid/_finite-owner/authorize';
+const max=16384;
+function shape(params,keys,multiple=[]){
+ for(const key of params.keys())if(!keys.includes(key))fail(400);
+ for(const key of keys)if(params.getAll(key).length>1&&!multiple.includes(key))fail(400);
+ for(const [key,value]of params)if(!value||value.length>4096||/[\u0000-\u001f\u007f]/.test(key+value))fail(400);
+}
+export function qualifyFiniteOwnerOAuthRequest(request,bytes){
+ if(!(request instanceof Request)||!(bytes instanceof Uint8Array)||bytes.length>max)fail(400);
+ const url=new URL(request.url);
+ if(url.origin!==origin||url.pathname!=='/authorize'||url.hash||url.username||url.password||request.url.length>max)fail(404);
+ if(!['GET','POST'].includes(request.method))fail(405);
+ let form=null;
+ if(request.method==='GET'){
+  if(bytes.length)fail(400);
+  const q=url.searchParams,keys=['client_id','redirect_uri','response_type','resource','scope','state','code_challenge','code_challenge_method'];
+  shape(q,keys);if(keys.some(k=>q.getAll(k).length!==1)||q.get('response_type')!=='code'||q.get('resource')!==origin+'/mcp'||q.get('code_challenge_method')!=='S256'||!/^[-_A-Za-z0-9]{43}$/.test(q.get('code_challenge')))fail(400);
+  const redirect=new URL(q.get('redirect_uri'));if(redirect.protocol!=='https:'||redirect.username||redirect.password||redirect.hash)fail(400);
+ }else{
+  if(url.search||request.headers.get('Origin')!==origin||!/^application\/x-www-form-urlencoded(?:;\s*charset=UTF-8)?$/i.test(request.headers.get('Content-Type')??''))fail(400);
+  let raw;try{raw=new TextDecoder('utf-8',{fatal:true}).decode(bytes);}catch{fail(400);}
+  if(/%(?![a-f0-9]{2})/i.test(raw))fail(400);
+  form=new URLSearchParams(raw);shape(form,['handle','decision','scope','project'],['scope']);
+  if(form.getAll('handle').length!==1||!/^[-_A-Za-z0-9]{43}$/.test(form.get('handle'))||form.getAll('decision').length!==1||form.get('decision')!=='approve'||!form.getAll('scope').length||form.getAll('scope').length>2||new Set(form.getAll('scope')).size!==form.getAll('scope').length||form.getAll('scope')[0]!=='afw:project:read'||form.getAll('scope').some(s=>!['afw:project:read','afw:evidence:read'].includes(s)))fail(400);
+ }
+ const cookie=request.headers.get('Cookie')??'',assertion=request.headers.get('Cf-Access-Jwt-Assertion')??'';
+ if(cookie.length>8192||assertion.length>8192||/[\r\n]/.test(cookie+assertion))fail(400);
+ const names=new Set();for(const part of cookie.split(';').filter(x=>x.trim())){const match=/^\s*([^=\s]+)=([^;\s]*)\s*$/.exec(part);if(!match||names.has(match[1]))fail(400);names.add(match[1]);}
+ return Object.freeze({method:request.method,url:request.url,form});
+}
+export function readFiniteOwnerOAuthMetadata(headers){
+ const entries=[...headers].filter(([key])=>key.startsWith('x-afw-finite-'));
+ if(entries.length!==finiteNativeHeaders.length||entries.some(([key])=>!finiteNativeHeaders.includes(key))||Buffer.byteLength(JSON.stringify(entries))>max)fail(400);
+ const raw=headers.get('x-afw-finite-boundary');let boundary;try{boundary=JSON.parse(raw);}catch{fail(400);}
+ if(!boundary||!['startedAt','deadline','remainingMs'].every(k=>Number.isSafeInteger(boundary[k]))||JSON.stringify({startedAt:boundary.startedAt,deadline:boundary.deadline,remainingMs:boundary.remainingMs})!==raw)fail(400);
+ const method=headers.get('x-afw-finite-original-method'),url=headers.get('x-afw-finite-original-url'),mVersionId=headers.get('x-afw-finite-version'),requestId=headers.get('x-afw-finite-request-id');
+ if(!['GET','POST'].includes(method)||!finiteNativeUuid(mVersionId)||!finiteNativeUuid(requestId))fail(400);
+ const original=new URL(url);if(original.origin!==origin||original.pathname!=='/authorize'||original.hash||method==='POST'&&original.search)fail(400);
+ return Object.freeze({boundary,method,url,mVersionId,requestId});
+}

~~~~~~~~~~

## lib/mcp-qa-finite-owner-phase-context.mjs

~~~~~~~~~~diff
diff --git a/lib/mcp-qa-finite-owner-phase-context.mjs b/lib/mcp-qa-finite-owner-phase-context.mjs
--- /dev/null
+++ b/lib/mcp-qa-finite-owner-phase-context.mjs
@@ -0,0 +1,1084 @@
+import {continuePrivateQaFiniteOwnerChoice,consumeFiniteOwnerStageAdmission} from './mcp-qa-finite-owner-preparation.mjs';
+import {adoptFiniteOwnerRequestStageWork} from './mcp-qa-finite-stage-work.mjs';
+import {createFiniteFixedPolicyEngine} from './mcp-qa-finite-fixed-policy-engine.mjs';
+import {prepareFinitePreparationEnrollmentWrite} from './mcp-qa-finite-preparation-enrollment-writer.mjs';
+import {encodeFinitePreparationCleanupRecord as enrollmentEncode} from './mcp-qa-finite-preparation-cleanup-records.mjs';
+import {finiteNativeMetadata as connectionMetadata,qualifyFiniteOwnerChoiceRequest,finiteNativeOriginalUrl as connectionUrl,finiteNativeBytes as connectionBytes} from './mcp-qa-finite-owner-native-wire.mjs';
+import {readFiniteOwnerNoticeConsentBody} from './mcp-qa-finite-owner-notice-consent-body.mjs';
+import {readFiniteOwnerNoticeGetMetadata,qualifyFiniteOwnerNoticeGetRequest,readFiniteOwnerNoticeConsentMetadata,qualifyFiniteOwnerNoticeConsentRequest} from './mcp-qa-finite-owner-notice-get-wire.mjs';
+import {sealFinitePreparationNoticeRecord as noticeSeal} from './mcp-qa-finite-preparation-notice-records.mjs';
+
+import {createFinitePreparationNoticeJournal as noticeJournal} from './mcp-qa-finite-preparation-notice-journal.mjs';
+import {FINITE_PREPARATION_MONITORING_SCHEMA} from './mcp-qa-finite-preparation-issuer-store.mjs';
+import {randomBytes} from 'node:crypto';
+import {captureFinitePreparationIssuerContext} from './mcp-qa-finite-preparation-issuer-journal.mjs';
+import {createFinitePreparationIssuerStore} from './mcp-qa-finite-preparation-issuer-store.mjs';
+import {sealFinitePreparationIssuerRecord as issuerSeal,issuerScopes} from './mcp-qa-finite-preparation-issuer-records.mjs';
+import {encodeFiniteOwnerIssuerProvenanceRecord as sdkEncode,FINITE_OWNER_SDK_OPERATIONS as sdkOperations} from './mcp-qa-finite-owner-issuer-provenance-records.mjs';
+import {encodeFinitePreparationRecord as prepEncode} from './mcp-qa-finite-preparation-records.mjs';
+import {qualifyFiniteOwnerApprovedTicket,finiteOwnerAuthorizationLink,finiteOwnerGrantLink,finiteOwnerPreconnectionConnection,finiteOwnerConnectionRef,qualifyFiniteOwnerConnectionPair} from './mcp-qa-finite-owner-approved-ticket-facts.mjs';
+import {qualifyFiniteOwnerSdkBindingFacts} from './mcp-qa-finite-owner-sdk-binding-facts.mjs';
+import {createFiniteOwnerIssuerProvenanceJournal as sdkJournal} from './mcp-qa-finite-owner-issuer-provenance-journal.mjs';
+import {sealFiniteOwnerIssuerProvenanceRecord as sdkSeal} from './mcp-qa-finite-owner-issuer-provenance-records.mjs';
+import {OAuthAuthorizationServer} from '@cloudflare/workers-oauth-provider';
+import {observeFiniteOwnerRequestWork} from './mcp-qa-finite-stage-work.mjs';
+import {verifyCloudflareAccessJwtWithExpiry} from './cloudflare-access-identity.mjs';
+import {readFiniteOwnerOAuthMetadata,qualifyFiniteOwnerOAuthRequest,finiteNativeOperation,finiteNativeBytes,finiteNativePending as pending} from './mcp-qa-finite-owner-oauth-wire.mjs';
+import {FINITE_PREPARATION_ISSUER_SCHEMA} from './mcp-qa-finite-preparation-issuer-store.mjs';
+import {readPrivateQaFiniteInitialAnchors} from './mcp-qa-finite-initial-anchors.mjs';
+import {decodeFiniteInitialUploadRecord as uploadRecord} from './mcp-qa-finite-initial-upload-records.mjs';
+import {initialOwn as own} from './mcp-qa-finite-initial-material-records.mjs';
+import {createFiniteOwnerPreparationStore} from './mcp-qa-finite-preparation-store.mjs';
+import {createFinitePolicyEffectJournal} from './mcp-qa-finite-policy-journal.mjs';
+import {createFinitePreparationIssuerJournal} from './mcp-qa-finite-preparation-issuer-journal.mjs';
+import {decodeFinitePreparationCleanupRecord as enrollmentRecord} from './mcp-qa-finite-preparation-cleanup-records.mjs';
+import {hashFinitePreparationRecord as prepHash,hashFinitePolicyEffectIdentity as effectIdentity,hashFiniteOwnerEvidence as evidence,hashFiniteOwnerPreparationProject as projectHash} from './mcp-qa-finite-preparation-records.mjs';
+import {qualifyFiniteOwnerInstalledStage} from './mcp-qa-finite-owner-stage-facts.mjs';
+import {qualifyFinitePreparationEnrollmentFacts} from './mcp-qa-finite-preparation-enrollment-facts.mjs';
+import {qualifyFiniteConnectionProfile} from './mcp-qa-finite-connection-profile.mjs';
+import {createHash} from 'node:crypto';
+import {readFiniteOwnerRequestDeadline,readFiniteOwnerRequestContext} from './mcp-qa-finite-owner-preparation.mjs';
+import {observeFiniteFactualReadWork,retainFiniteOwnerStagePromise as retain} from './mcp-qa-finite-stage-work.mjs';
+import {createFiniteInitialLease} from './mcp-qa-finite-initial-lease.mjs';
+import {finiteInitialCapsuleBindingsHash} from './mcp-qa-finite-initial-capsule-records.mjs';
+import {initialFields as fields,initialCanonical as canonical,initialHash as digest,initialHex as hex} from './mcp-qa-finite-initial-material-records.mjs';
+import {readFiniteQaBootstrapSourceExpectations} from './mcp-qa-finite-bootstrap-source.mjs';
+import {readPrivateQaFiniteCandidate} from './mcp-qa-finite-candidate-residency.mjs';
+import {finitePublicProfileTemplate,projectFinitePublicConfiguration} from './mcp-qa-finite-profile.mjs';
+import {finiteQaPointer} from './mcp-qa-finite-publication.mjs';
+import {finiteCfEnvelope} from './mcp-qa-finite-custody.mjs';
+import {qualifyFiniteInitialUploadedVersion} from './mcp-qa-finite-initial-upload-wire.mjs';
+import {restorationConfigurationHash} from './mcp-restoration-configuration.mjs';
+import {finiteActivationConfigurationHash} from './mcp-activation-observer.mjs';
+import {createDelegatedProjectRepository} from './delegated-project-repository.mjs';
+import {createDelegatedOAuthStore} from './delegated-oauth-store.mjs';
+import {validateFiniteOwnerSource} from './mcp-qa-finite-preparation-records.mjs';
+
+const CF='https://api.cloudflare.com/client/v4/accounts/85d0d5dadac3341a564f22ce885e9eec';
+const SLOT='afw-own-successor-closure-v1',QA='agent-friendly-web-independent-closure-qa',CANARY='agent-friendly-web-delegated-canary';
+const iso=x=>typeof x==='string'&&Number.isSafeInteger(Date.parse(x))&&new Date(Date.parse(x)).toISOString()===x;
+const sha=bytes=>createHash('sha256').update(bytes).digest('hex');
+const fail=()=>{throw Error('Finite owner phase context unavailable');};
+const current=l=>{l.assertCurrent();if(l.signal.aborted)fail();};
+
+/** UNMOUNTED factual entry. A genuine original incoming request lease is
+ * or internally registered descendant is required, never browser data.
+ * Retention confers no owner admission and preserves the original request.
+ */
+async function observeOwnerPhasePair(options){
+ let clock,onAbort,parentSignal;
+ try{
+  if(arguments.length!==1)fail();
+  fields(options,['ctx','env','parent',...Object.hasOwn(options,'preconnectionId')?['preconnectionId']:[]]);
+  const {ctx,env,parent}=options,requested=options.preconnectionId??null;
+  fields(parent,['signal','assertCurrent']);
+  const {root,deadline}=readFiniteOwnerRequestContext(parent);
+  if(requested!==null&&!hex(requested))fail();
+  const signal=parent.signal,assertCurrent=parent.assertCurrent;
+  const storage=ctx?.storage,get=storage?.get,list=storage?.list,getAlarm=storage?.getAlarm,transaction=storage?.transaction,sync=storage?.sync;
+  const actor=ctx?.id,toString=actor?.toString,self=env?.AFW_INDEPENDENT_CLOSURE,idFromName=self?.idFromName,namespaceGet=self?.get;
+  const db=env?.RELEASE_DB,prepare=db?.prepare,withSession=db?.withSession,node=env?.AFW_RELEASE_EVENTS_NODE,nodeName=node?.idFromName,nodeString=node?.idFromString,nodeGet=node?.get;
+  const metadata=env?.AFW_QA_VERSION,qaVersionId=metadata?.id,reader=env?.AFW_MCP_CLOSURE_READ_TOKEN,publisher=env?.AFW_MCP_CLOSURE_PUBLISH_TOKEN,fetcher=globalThis.fetch;
+  if(!(signal instanceof AbortSignal)||[assertCurrent,get,list,getAlarm,transaction,sync,toString,idFromName,namespaceGet,prepare,withSession,nodeName,nodeString,nodeGet,fetcher].some(v=>typeof v!=='function')||db===env.DB||[reader,publisher].some(v=>typeof v!=='string'||!/^[-A-Za-z0-9_]{16,4096}$/.test(v)))fail();
+  const alias=env?.AFW_FINITE_OWNER_OAUTH_KV,aliasGet=alias?.get,aliasPut=alias?.put,aliasDelete=alias?.delete,aliasList=alias?.list;
+  if([aliasGet,aliasPut,aliasDelete,aliasList].some(v=>typeof v!=='function'))fail();
+  const actorId=Reflect.apply(toString,actor,[]),expected=readFiniteQaBootstrapSourceExpectations(),resident=readPrivateQaFiniteCandidate();
+  const qaNamespaceId=finitePublicProfileTemplate('qaLive').bindings.find(b=>b.name==='AFW_INDEPENDENT_CLOSURE').namespace_id;
+  if(!hex(actorId)||Reflect.apply(idFromName,self,[SLOT]).toString()!==actorId||resident.sourceRevision!==expected.sourceRevision||resident.sourceTree!==expected.sourceTree)fail();
+  const holders=()=>{
+   current(parent);
+   if(options.ctx!==ctx||options.env!==env||options.parent!==parent||(options.preconnectionId??null)!==requested||parent.signal!==signal||parent.assertCurrent!==assertCurrent||readFiniteOwnerRequestDeadline(parent)!==deadline||readFiniteOwnerRequestContext(parent).root!==root||
+    ctx.storage!==storage||storage.get!==get||storage.list!==list||storage.getAlarm!==getAlarm||storage.transaction!==transaction||storage.sync!==sync||ctx.id!==actor||actor.toString!==toString||Reflect.apply(toString,actor,[])!==actorId||
+    env.AFW_FINITE_OWNER_OAUTH_KV!==alias||alias.get!==aliasGet||alias.put!==aliasPut||alias.delete!==aliasDelete||alias.list!==aliasList||env.AFW_INDEPENDENT_CLOSURE!==self||self.idFromName!==idFromName||self.get!==namespaceGet||Reflect.apply(idFromName,self,[SLOT]).toString()!==actorId||env.RELEASE_DB!==db||db.prepare!==prepare||db.withSession!==withSession||
+    env.AFW_RELEASE_EVENTS_NODE!==node||node.idFromName!==nodeName||node.idFromString!==nodeString||node.get!==nodeGet||env.AFW_QA_VERSION!==metadata||metadata.id!==qaVersionId||
+    env.AFW_MCP_CLOSURE_READ_TOKEN!==reader||env.AFW_MCP_CLOSURE_PUBLISH_TOKEN!==publisher||globalThis.fetch!==fetcher)fail();
+  };
+  // Narrow the original request deadline; do not reuse B1/A's expired technical
+  // authority or manufacture a new incoming request window from this call.
+  clock=createFiniteInitialLease(deadline,deadline,holders,fail);
+  parentSignal=signal;onAbort=()=>clock.close();signal.addEventListener('abort',onAbort,{once:true});current(clock.lease);
+  const run=()=>observeFiniteFactualReadWork({ctx,env,originalLease:clock.lease,requestLease:parent},async()=>{
+   const child=work=>clock.child(l=>retain(Promise.resolve().then(()=>{current(l);return work(l);})));
+   const read=key=>child(()=>Reflect.apply(get,storage,[key]));
+   const rows=(prefix,limit)=>child(()=>Reflect.apply(list,storage,[{prefix,limit}]));
+   const request=(path,cap=65536,token=reader)=>child(async l=>{
+    let response,stream;
+    try{
+     // Keep the actual fetch and body/cancellation lifecycle retained even if a
+     // timeout wins. An aborted signal is never physical-settlement evidence.
+     response=await retain(fetcher(CF+path,{method:'GET',redirect:'manual',cache:'no-store',credentials:'omit',referrerPolicy:'no-referrer',headers:{Authorization:'Bearer '+token,Accept:'application/json','Cache-Control':'no-cache'}}));current(l);
+     const date=Date.parse(response?.headers?.get('date')??''),length=response?.headers?.get('content-length');
+     if(!(response instanceof Response)||response.status!==200||response.redirected||!response.body||!Number.isSafeInteger(date)||Math.abs(Date.now()-date)>5000||
+      !/^application\/json(?:\s*;|$)/i.test(response.headers.get('content-type')??'')||response.headers.has('age')&&response.headers.get('age')!=='0'||response.headers.has('retry-after')||response.headers.has('link')||
+      ['HIT','STALE','REVALIDATED','UPDATING'].includes(response.headers.get('cf-cache-status')?.toUpperCase())||length!==null&&(!/^\d+$/.test(length)||Number(length)>cap))fail();
+     stream=response.body.getReader();const chunks=[];let size=0;
+     for(;;){const part=await retain(stream.read());current(l);if(part.done)break;if(!(part.value instanceof Uint8Array)||(size+=part.value.length)>cap)fail();chunks.push(part.value);}
+     if(length!==null&&Number(length)!==size)fail();
+     return {value:JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(Buffer.concat(chunks,size))),date};
+    }finally{if(stream)await retain(stream.cancel()).catch(()=>{});else if(response?.body&&!response.body.locked)await retain(response.body.cancel()).catch(()=>{});}
+   });
+   const select=(sql,args=[])=>child(async l=>{
+    const session=Reflect.apply(withSession,db,['first-primary']),method=session?.prepare;
+    if(typeof method!=='function'||!sql.startsWith('SELECT '))fail();
+    const statement=Reflect.apply(method,session,[sql]),bind=statement?.bind;if(typeof bind!=='function')fail();
+    const bound=Reflect.apply(bind,statement,args),first=bound?.first;if(typeof first!=='function')fail();
+    const result=await retain(Reflect.apply(first,bound,[]));current(l);if(session.prepare!==method)fail();return result;
+   });
+   // Each factual ALL is the first statement of its own primary session.
+   const selectAll=(sql,args,cap)=>child(async l=>{
+    const session=Reflect.apply(withSession,db,['first-primary']),method=session?.prepare;
+    if(typeof method!=='function')fail();
+    const statement=Reflect.apply(method,session,[sql]),bind=statement?.bind;if(typeof bind!=='function')fail();
+    const bound=Reflect.apply(bind,statement,args),all=bound?.all;if(typeof all!=='function')fail();
+    const actual=retain(Reflect.apply(all,bound,[])),result=await actual;current(l);
+    if(session.prepare!==method||statement.bind!==bind||bound.all!==all||result?.success!==true||!Array.isArray(result.results)||result.results.length>cap)fail();
+    return result.results.map(row=>own(row));
+   });
+   const facts=async()=>{
+    const a=await child(l=>readPrivateQaFiniteInitialAnchors({ctx,env},l)),{capsule,material,plan}=a;
+    if(capsule.sourceRevision!==expected.sourceRevision||capsule.sourceTree!==expected.sourceTree||capsule.qaVersionId!==qaVersionId||capsule.moduleHash!==resident.module.sha256||requested!==null&&requested!==capsule.preconnectionId)fail();
+    clock.narrow(Math.min(capsule.C0,plan.readerExpiresAt,plan.publisherExpiresAt));
+    if(Date.now()<capsule.I0||Date.now()>=capsule.C0||capsule.recordedAt>Date.now()||a.alarm!==capsule.C0||canonical(a.state)!==canonical(a.zero)||Object.keys(a.records).length!==6)fail();
+    for(const prefix of ['afw.qa-finite-trial.v1:','source-selection:'+capsule.sourceRevision+':'])if((await rows(prefix,1)).size)fail();
+    const backupRaw=[],backupRead=async(key,kind)=>{const raw=await read(key);backupRaw.push([key,raw]);return uploadRecord(kind,raw);};
+    const up='afw.finite-initial-upload.v1:'+plan.entryHash+':',backup=await backupRead(up+'backup','Backup'),receipt=await backupRead(up+'receipt','Receipt');
+    for(const k of ['entryHash','materialHash','sourceRevision','sourceTree','qaVersionId','initialInstanceId','baselineVersionId','baselineDeploymentId'])if(receipt[k]!==plan[k]||backup[k]!==plan[k])fail();
+    if(backup.recordHash!==plan.manifestHash||receipt.manifestHash!==plan.manifestHash||receipt.uploadedVersionId!==capsule.activatedVersionId||receipt.moduleHash!==plan.moduleHash||receipt.configurationHash!==plan.configurationHash||backup.retainedIds.preconnectionId!==capsule.preconnectionId||canonical(backup.retainedIds)!==canonical({preconnectionId:capsule.preconnectionId,trialId:material.originalContext.trialId,activationKey:material.originalContext.publication.activationKey,withdrawalRequestId:material.originalContext.withdrawalRequestId,saveIdempotencyKey:material.originalContext.saveIdempotencyKey})||receipt.recordedAt>capsule.recordedAt)fail();
+    const chunks=[];let bytes=0;
+    for(const c of backup.chunks){const chunk=await backupRead(up+'chunk:'+String(c.index).padStart(3,'0'),'Chunk');if(chunk.manifestHash!==backup.recordHash||chunk.index!==c.index||chunk.bytes!==c.bytes||chunk.sha256!==c.sha256)fail();const part=Buffer.from(chunk.content,'base64');bytes+=part.length;if(bytes>2097152)fail();chunks.push(part);}
+    if(bytes!==backup.moduleBytes||sha(Buffer.concat(chunks,bytes))!==backup.moduleHash)fail();
+    const prefix='connection-preparation:'+capsule.preconnectionId+':',inventory=await rows(prefix,17),effects=await rows('afw.finite-policy-effect.v1:',33),enrollment=await rows('afw.finite-preparation-cleanup.v1:',3);
+    if(inventory.size>16||effects.size>32||enrollment.size>2)fail();
+    for(const k of inventory.keys())if(!['record','source','connection:approval','grant','connection','notice'].some(s=>k===prefix+s))fail();
+    for(const k of enrollment.keys())if(!['enrollment','ack'].some(s=>k==='afw.finite-preparation-cleanup.v1:'+s))fail();
+    const issuer=await child(l=>createFinitePreparationIssuerJournal({ctx,env}).read({preconnectionId:capsule.preconnectionId},l));
+    const sdk=await child(l=>sdkJournal({ctx,env}).read({preconnectionId:capsule.preconnectionId},l));
+    const notice=await child(l=>noticeJournal({ctx,env}).read({preconnectionId:capsule.preconnectionId},l));
+    return {capsule,material,plan,a,inventory,effects,enrollment,issuer,sdk,notice,anchor:canonical({anchors:a,backupRaw,inventory:[...inventory],effects:[...effects],enrollment:[...enrollment],issuer,sdk:sdk.entries,notice})};
+   };
+   const first=await facts(),{capsule,material,plan}=first,p=material.ownerSelection;
+   if(plan.moduleBytes!==resident.bytes.length||sha(resident.bytes)!==capsule.moduleHash||material.originalContext.original.containerId!==Reflect.apply(nodeName,node,['afw-own-event-one-occurrence-v1']).toString())fail();
+   const owned=()=>child(async l=>{
+    const session=Reflect.apply(withSession,db,['first-primary']),sessionPrepare=session?.prepare;
+    if(typeof sessionPrepare!=='function')fail();
+    const value=await retain(createDelegatedProjectRepository({db:session,grantStore:createDelegatedOAuthStore(session)}).getOwnedProject(p.project.projectId,p.subject));current(l);
+    if(session.prepare!==sessionPrepare||!value||value.id!==p.project.projectId||value.userId!==p.subject||value.revision!==p.project.revision)fail();
+    return {projectId:value.id,revision:value.revision,synthetic:true};
+   });
+   const verifyCredential=async(token,id,expiresAt)=>{
+    const v=finiteCfEnvelope((await request('/tokens/verify',8192,token)).value);fields(v,['id','status','expires_on',...Object.hasOwn(v,'not_before')?['not_before']:[]]);
+    if(v.id!==id||v.status!=='active'||Date.parse(v.expires_on)!==expiresAt||Date.parse(v.expires_on)<=Date.now()||v.not_before!=null&&(!Number.isSafeInteger(Date.parse(v.not_before))||Date.parse(v.not_before)>Date.now()))fail();
+   };
+   const credentials=async()=>{
+    const readerWork=retain(Promise.resolve().then(()=>verifyCredential(reader,plan.readerId,plan.readerExpiresAt)));
+    const publisherWork=retain(Promise.resolve().then(()=>verifyCredential(publisher,plan.publisherId,plan.publisherExpiresAt)));
+    const joined=await retain(Promise.allSettled([readerWork,publisherWork]));
+    current(clock.lease);if(joined.some(result=>result.status!=='fulfilled'))fail();
+   };
+   const readQaPrimary=async()=>{
+    const qaPointer=finiteQaPointer(await request('/workers/scripts/'+QA+'/deployments?per_page=1'));
+    if(canonical(qaPointer)!==canonical(material.qaBootstrap.currentPointer))fail();
+    const q=finiteCfEnvelope((await request('/workers/workers/'+QA+'/versions/'+qaVersionId+'?include=modules',4500000)).value);
+    const configKeys=Object.keys(finitePublicProfileTemplate('qaLive')),wrappers=['id','number','startup_time_ms','annotations','urls','source','created_on','author_id','author_email','modules'];
+    fields(q,[...configKeys,...wrappers.filter(k=>Object.hasOwn(q,k))]);
+    if(q.id!==qaVersionId||!Array.isArray(q.urls)||q.urls.length||!Array.isArray(q.modules)||q.modules.length!==1)fail();
+    const qaModule=fields(q.modules[0],['name','content_type','content_base64']),expectedModule=material.qaBootstrap.record.qaLive.module;
+    if(qaModule.name!==expectedModule.name||qaModule.content_type!=='application/javascript+module'||typeof qaModule.content_base64!=='string'||qaModule.content_base64.length>Math.ceil(expectedModule.bytes/3)*4)fail();
+    const bytes=Buffer.from(qaModule.content_base64,'base64');
+    if(bytes.toString('base64')!==qaModule.content_base64||bytes.length!==expectedModule.bytes||sha(bytes)!==expectedModule.sha256)fail();
+    projectFinitePublicConfiguration({role:'qaLive',metadata:Object.fromEntries(configKeys.map(k=>[k,q[k]]))});
+    return {qaMetadata:Object.fromEntries(configKeys.map(k=>[k,q[k]]))};
+   };
+   const readMPrimary=async()=>{
+    const pointer=finiteQaPointer(await request('/workers/scripts/'+CANARY+'/deployments?per_page=1'));
+
+    const metadata=finiteCfEnvelope((await request('/workers/workers/'+CANARY+'/versions/'+capsule.activatedVersionId+'?include=modules',4500000)).value);
+    const configuration=qualifyFiniteInitialUploadedVersion(metadata,capsule.activatedVersionId,plan.configuration,resident.bytes);
+    if(restorationConfigurationHash(configuration)!==capsule.configurationHash||finiteInitialCapsuleBindingsHash(configuration.bindings)!==capsule.bindingsHash)fail();
+    const binding=name=>configuration.bindings.find(b=>b.name===name),text=name=>binding(name)?.text;
+    if(text('AFW_OAUTH_PILOT_CLIENT_ID')!==p.clientId||text('AFW_OAUTH_PILOT_PROJECT_ID')!==p.project.projectId||text('AFW_OAUTH_RESOURCE')!==p.resource||text('ACCESS_TEAM_DOMAIN')!==p.access.teamDomain||text('ACCESS_AUD')!==p.access.audience||text('AFW_OAUTH_PILOT_EXPIRES_AT')!==new Date(capsule.C0).toISOString()||canonical(binding('DELEGATED_RATE_LIMITER'))!==canonical(p.limiter))fail();
+    const project=await owned();
+    let currentConfiguration=configuration;
+    if(pointer.versionId!==capsule.activatedVersionId||pointer.deploymentId!==capsule.activatedDeploymentId){
+     const raw=finiteCfEnvelope((await request('/workers/workers/'+CANARY+'/versions/'+pointer.versionId+'?include=modules',4500000)).value);
+     const configKeys=Object.keys(plan.configuration),wrappers=['id','number','startup_time_ms','annotations','urls','source','created_on','author_id','author_email','modules'];
+     fields(raw,[...configKeys,...wrappers.filter(k=>Object.hasOwn(raw,k)),...Object.hasOwn(raw,'cache_options')?['cache_options']:[]]);
+     if(raw.id!==pointer.versionId||!Array.isArray(raw.urls)||raw.urls.length||!Array.isArray(raw.modules)||raw.modules.length!==1)fail();
+     const cfg=structuredClone(own(Object.fromEntries(configKeys.map(k=>[k,raw[k]]))));
+     fields(cfg.exports,['default','AfwNodeControl','AfwOwnEventNode']);
+     for(const [name,e]of Object.entries(cfg.exports)){const keys=name==='AfwOwnEventNode'?['type','storage','container']:['type'];fields(e,[...keys,...Object.hasOwn(e,'state')?['state']:[],...Object.hasOwn(e,'cache')?['cache']:[]]);if(Object.hasOwn(e,'state')){if(e.state!=='created')fail();delete e.state;}if(Object.hasOwn(e,'cache')){fields(e.cache,['enabled']);if(name==='AfwOwnEventNode'||e.cache.enabled!==false)fail();delete e.cache;}}
+     if(Object.hasOwn(raw,'cache_options')){const keys=['enabled','cross_version_cache'].filter(k=>Object.hasOwn(raw.cache_options??{},k));if(!keys.length)fail();fields(raw.cache_options,keys);if(keys.some(k=>raw.cache_options[k]!==false))fail();}
+     const expected=structuredClone(plan.configuration);expected.bindings.find(b=>b.name==='AFW_DELEGATED_OAUTH_ENABLED').text='true';
+     if(canonical(cfg)!==canonical(expected))fail();qualifyFiniteConnectionProfile({phase:'read_consent',metadata:cfg});
+     const currentModule=fields(raw.modules[0],['name','content_type','content_base64']);if(currentModule.name!=='index.mjs'||currentModule.content_type!=='application/javascript+module'||typeof currentModule.content_base64!=='string'||currentModule.content_base64!==Buffer.from(resident.bytes).toString('base64'))fail();currentConfiguration=cfg;
+    }
+    return {project,pointer,currentConfiguration,configuration,initialBaseline:{versionId:capsule.activatedVersionId,deploymentId:capsule.activatedDeploymentId,moduleHash:sha(resident.bytes),configurationHash:finiteActivationConfigurationHash(plan.configuration),bindingsHash:finiteInitialCapsuleBindingsHash(configuration.bindings)}};
+   };
+   const primary=async()=>{
+    await credentials();
+    const qaWork=retain(Promise.resolve().then(readQaPrimary)),mWork=retain(Promise.resolve().then(readMPrimary));
+    const joined=await retain(Promise.allSettled([qaWork,mWork]));
+    current(clock.lease);if(joined.some(result=>result.status!=='fulfilled'))fail();
+    const {qaMetadata}=joined[0].value,{project,pointer,currentConfiguration,configuration,initialBaseline}=joined[1].value;
+    const qaSdkBindingFacts=qualifyFiniteOwnerSdkBindingFacts({qaMetadata,mMetadata:currentConfiguration});
+    qualifyFiniteOwnerSdkBindingFacts({qaMetadata,mMetadata:configuration});
+    return {project,pointer,currentConfiguration,qaSdkBindingFacts,initialBaseline};
+   };
+   const observed=await primary();
+   const source=validateFiniteOwnerSource({sourceRevision:capsule.sourceRevision,actorId,qaNamespaceId,qaVersionId,origin:'https://delegated-canary.agentfriendlyweb.dev',phase:'closed_ui',access:p.access,clientId:p.clientId,resource:p.resource,project:observed.project,goal:p.goal,
+    programContext:{programHash:material.originalContext.original.programHash,sourceRevision:material.originalContext.original.sourceRevision,originalContextHash:digest('afw.finite-original-context.v1',material.originalContext)},
+    initialBaseline:observed.initialBaseline,currentPublication:{stage:null,versionId:capsule.activatedVersionId,deploymentId:capsule.activatedDeploymentId,receiptHash:null},window:{startedAt:capsule.I0,expiresAt:capsule.C0}});
+   const issuerPrimary=async(f,data,enrollment,ack,receipt,getRecord)=>{
+    const id=capsule.preconnectionId,issuer=f.issuer,i=issuer.reservation?.identity;
+    const schema=await select('SELECT type,name,sql FROM sqlite_schema WHERE name=?',['finite_preparation_issuer_fences']);
+    const grantLink=await getRecord('readLink',{kind:'grant',preconnectionId:id},false),relation=await getRecord('readPreconnectionConnection',{preconnectionId:id},false);
+    if(!schema){if(i||grantLink||relation)fail();return {schema:null};}
+    fields(schema,['type','name','sql']);const normalized=x=>typeof x==='string'?x.replace(/\s+/g,' ').trim().replace(/;$/,''):null;
+    if(schema.type!=='table'||schema.name!=='finite_preparation_issuer_fences'||normalized(schema.sql)!==normalized(FINITE_PREPARATION_ISSUER_SCHEMA[0]))fail();
+    const fence=await select('SELECT preconnection_id,authorization_hash,grant_id,enrollment_hash,identity_hash,reserved_at,forward_until,cleanup_until,fence_request_id,fenced_at FROM finite_preparation_issuer_fences WHERE preconnection_id=?',[id]);
+    if(!i){if(fence||grantLink||relation)fail();return {schema,fence,grantLink,relation};}
+    if(!receipt||!enrollment||!ack||issuer.freeze||i.preconnectionId!==id||i.enrollmentHash!==enrollment.recordHash||i.capsuleHash!==capsule.capsuleHash||i.sourceRevision!==capsule.sourceRevision||i.qaVersionId!==qaVersionId||i.actorId!==actorId||i.subject!==p.subject||i.accessRealmHash!==data.preconnection.owner.accessRealmHash||i.projectId!==p.project.projectId||i.projectRevision!==p.project.revision||i.clientId!==p.clientId||i.resource!==p.resource||i.I0!==capsule.I0||i.C0!==capsule.C0||i.C1!==capsule.C1||i.reservedAt<ack.acknowledgedAt||i.reservedAt>Date.now()||issuer.reservation.issuedAt>Date.now()||Date.parse(i.consentExpiresAt)>data.preconnection.expiresAt)fail();
+    clock.narrow(Date.parse(i.consentExpiresAt));
+    for(const [op,v]of Object.entries(issuer.operations)){
+     if(v.ack&&!v.send||['close_fence','revoke_grant'].includes(op)&&(v.send||v.ack)||v.ack?.observedAt>Date.now())fail();
+    }
+    const ops=issuer.operations,expectedFence={preconnection_id:id,authorization_hash:i.authorizationHash,grant_id:i.grantId,enrollment_hash:i.enrollmentHash,identity_hash:i.identityHash,reserved_at:i.reservedAt,forward_until:i.C0,cleanup_until:i.C1,fence_request_id:null,fenced_at:null};
+    if(fence&&canonical(fence)!==canonical(expectedFence))fail();
+    const consent=await select('SELECT handle_hash,user_id,kind,project_id,client_id,resource,scopes_json,expires_at,consumed_at FROM delegated_consent_sessions WHERE handle_hash=?',[i.authorizationHash]);
+    const grant=await select('SELECT id,user_id,client_id,project_id,resource,scopes_json,created_at,expires_at,revoked_at,exchanged_at FROM delegated_access_grants WHERE id=?',[i.grantId]);
+    const authorization=await getRecord('readAuthorizationLink',{authorizationHash:i.authorizationHash},false);
+    const rowAck=(op,row)=>{const v=ops[op];if(!v.send){if(row)fail();return;}if(!v.ack)return;if(v.ack.outcome==='no_mutation'){if(v.ack.rowHash!==null||row)fail();return;}if(!row||v.ack.rowHash!==digest('afw.finite-preparation-issuer-row.v1',row))fail();};
+    rowAck('open_fence',fence);
+    if(!fence&&(consent||grant||authorization||grantLink||relation||ops.authorization.send||ops.consume.send||ops.grant.send))fail();
+    if(consent){
+     const expected={handle_hash:i.authorizationHash,user_id:i.subject,kind:'authorize',project_id:i.projectId,client_id:i.clientId,resource:i.resource,scopes_json:JSON.stringify(i.requestedScopes),expires_at:i.consentExpiresAt,consumed_at:consent.consumed_at};
+     if(canonical(consent)!==canonical(expected)||consent.consumed_at!==''&&(!iso(consent.consumed_at)||Date.parse(consent.consumed_at)<i.reservedAt||Date.parse(consent.consumed_at)>Date.now()||Date.parse(consent.consumed_at)>=Date.parse(consent.expires_at)))fail();
+    }
+    rowAck('authorization',consent?{...consent,consumed_at:''}:null);
+    rowAck('consume',consent?.consumed_at?consent:null);
+    if(authorization){
+     if(!consent||authorization.preconnectionId!==id||authorization.authorizationHash!==i.authorizationHash||authorization.subjectHash!==data.ticket.subjectHash||authorization.sourceRevision!==source.sourceRevision||authorization.projectRef!==data.ticket.projectRef||authorization.clientId!==i.clientId||authorization.resource!==i.resource||authorization.issuedAt<i.reservedAt||authorization.issuedAt>Date.now()||authorization.expiresAt>Math.min(data.preconnection.expiresAt,Date.parse(consent.expires_at))||Date.now()>=authorization.expiresAt)fail();
+    }
+    if(grant){
+     let scopes;try{scopes=JSON.parse(grant.scopes_json);}catch{fail();}
+     if(!consent?.consumed_at||!authorization||grant.id!==i.grantId||grant.user_id!==i.subject||grant.client_id!==i.clientId||grant.project_id!==i.projectId||grant.resource!==i.resource||!Array.isArray(scopes)||scopes[0]!=='afw:project:read'||new Set(scopes).size!==scopes.length||scopes.some(s=>!i.requestedScopes.includes(s))||JSON.stringify(scopes)!==grant.scopes_json||grant.revoked_at!==''||!iso(grant.created_at)||!iso(grant.expires_at)||grant.exchanged_at!==''&&(!iso(grant.exchanged_at)||Date.parse(grant.exchanged_at)>Date.now()||Date.parse(grant.exchanged_at)<Date.parse(grant.created_at)||Date.parse(grant.exchanged_at)>=Date.parse(grant.expires_at))||Date.parse(grant.created_at)<Date.parse(consent.consumed_at)||Date.parse(grant.created_at)>Date.now()||Date.parse(grant.expires_at)>Math.min(i.C0,Date.parse(consent.expires_at),data.preconnection.expiresAt))fail();
+     clock.narrow(Date.parse(grant.expires_at));
+    }
+    rowAck('grant',grant?{...grant,exchanged_at:''}:grant);
+    if(grantLink){
+     if(!grant||!authorization||grantLink.preconnectionId!==id||grantLink.authorizationHash!==i.authorizationHash||grantLink.grantId!==i.grantId||grantLink.grantHash!==sha(i.grantId)||grantLink.acceptedAt<Date.parse(grant.created_at)||grantLink.acceptedAt>Date.now())fail();
+    }
+    let connection=null;
+    if(relation){
+     if(!grantLink||relation.preconnectionId!==id||relation.grantHash!==grantLink.grantHash||relation.linkedAt<grantLink.acceptedAt||relation.linkedAt>Date.now())fail();
+     connection=await getRecord('readConnectionRef',{connectionRef:relation.connectionRef});
+     if(connection.connectionRef!==relation.connectionRef||connection.subject!==i.subject||connection.grantId!==i.grantId||connection.clientId!==i.clientId||connection.projectId!==i.projectId||connection.resource!==i.resource||connection.issuedAt!==relation.linkedAt||connection.expiresAt>Math.min(data.preconnection.expiresAt,data.preconnection.owner.accessExpiresAt,Date.parse(grant.expires_at))||Date.now()>=connection.expiresAt)fail();
+    }
+    return {schema,fence,consent,grant,authorization,grantLink,relation,connection};
+   };
+   const noticePrimary=async(f,data,issuerFacts)=>{
+    const n=f.notice,r=n.reservation,i=f.issuer.reservation?.identity;
+    if(n.freeze)fail();
+    const objects=await selectAll("SELECT type,name,tbl_name,sql FROM sqlite_schema WHERE tbl_name IN ('dossier_monitoring_consent_events','dossier_monitoring_owner_tickets') AND sql IS NOT NULL ORDER BY name LIMIT 8",[],8);
+    if(objects.length!==0&&objects.length!==7)fail();
+    const empty={schema:null,tickets:[],events:[]};
+    if(!objects.length){if(r)fail();return empty;}
+    const normalize=x=>x.replace(/\s+/g,' ').trim().replace(/;$/,'').replace(/^CREATE (TABLE|INDEX|TRIGGER) IF NOT EXISTS /,'CREATE $1 ');
+    for(const row of objects)fields(row,['type','name','tbl_name','sql']);
+    for(const def of FINITE_PREPARATION_MONITORING_SCHEMA){
+     const [,kind,name]=def.match(/^CREATE (TABLE|INDEX|TRIGGER) IF NOT EXISTS (\w+)/),table=kind==='TABLE'?name:def.match(/(?: ON | ON)(\w+)/)?.[1];
+     if(!objects.some(row=>row.type===kind.toLowerCase()&&row.name===name&&row.tbl_name===table&&typeof row.sql==='string'&&normalize(row.sql)===normalize(def)))fail();
+    }
+    const schema={objects};
+    if(!i){if(r)fail();return {...empty,schema};}
+    const tickets=await selectAll('SELECT handle_hash,request_id,user_id,grant_id,project_id,client_id,resource,purpose,action,revision,expected_sequence,issued_at,expires_at,permission_expires_at FROM dossier_monitoring_owner_tickets WHERE grant_id=? ORDER BY handle_hash LIMIT 2',[i.grantId],2);
+    const events=await selectAll('SELECT sequence,grant_id,project_id,user_id,client_id,resource,revision,action,purpose,request_id,issued_at,expires_at FROM dossier_monitoring_consent_events WHERE grant_id=? ORDER BY sequence LIMIT 3',[i.grantId],3);
+    if(tickets.length>=2||events.length>1)fail();
+    if(!r){if(tickets.length||events.length)fail();return {schema,tickets,events};}
+    const grant=issuerFacts.grant,ops=f.issuer.operations,sdk=f.sdk;
+    if(!grant||!issuerFacts.authorization||!issuerFacts.grantLink||!issuerFacts.relation||!issuerFacts.connection||!data.preconnection||!data.approval||!sdk.root||!sdk.grant||!['sdk_begin','sdk_approve','sdk_complete'].every(op=>sdk.operations[op].send&&sdk.operations[op].observed)||!ops.grant.ack||ops.grant.ack.outcome!=='applied')fail();
+    for(const op of Object.values(ops))if(op.send&&!op.ack||op.ack&&!op.send)fail();
+    const expectedGrant={scopes:JSON.parse(grant.scopes_json),createdAt:grant.created_at,expiresAt:grant.expires_at};
+    const t=r.ticket,ceil=Math.min(r.accessExpiresAt,r.preconnectionExpiresAt,data.approval.expiresAt,issuerFacts.connection.expiresAt,i.C0,Date.parse(i.consentExpiresAt),Date.parse(grant.expires_at));
+    if(canonical(r.identity)!==canonical(i)||r.issuerReservationHash!==f.issuer.reservation.recordHash||r.originalGrantAckHash!==ops.grant.ack.recordHash||r.grantLinkHash!==prepHash('GrantLink',issuerFacts.grantLink)||r.connectionHash!==prepHash('ConnectionRef',issuerFacts.connection)||canonical(r.expectedGrant)!==canonical(expectedGrant)||r.consumedAt!==issuerFacts.consent.consumed_at||r.preconnectionExpiresAt!==data.preconnection.expiresAt||r.accessExpiresAt>Math.min(data.preconnection.owner.accessExpiresAt,i.C0)||r.accessExpiresAt<=r.issuedAt||r.issuedAt>Date.now()||t.expiresAt>ceil||t.permissionExpiresAt>ceil||Date.now()>=t.permissionExpiresAt)fail();
+    clock.narrow(ceil);
+    const {send,ack}=n.operations.ticket;
+    if(send?.issuedAt>Date.now()||ack?.observedAt>Date.now())fail();
+    const row=expectedNoticeTicket(i,t);
+    if(tickets.some(v=>canonical(v)!==canonical(row)))fail();
+    if(!send&&tickets.length)fail();
+    if(ack?.outcome==='applied'&&(tickets.length!==1||ack.sequence!==null||ack.rowHash!==digest('afw.finite-preparation-notice-row.v1',tickets[0])))fail();
+    if(ack?.outcome==='no_mutation'&&(tickets.length||ack.rowHash!==null||ack.sequence!==null))fail();
+    const consent=n.operations.consent;
+    if(!consent.send){if(consent.ack||events.length)fail();}
+    else{
+     if(ack?.outcome!=='applied'||tickets.length!==1||consent.send.issuedAt>Date.now()||consent.ack?.observedAt>Date.now())fail();
+     for(const event of events)qualifyNoticeConsentEvent(event,i,t,consent.send);
+     if(consent.ack?.outcome==='applied'&&(events.length!==1||consent.ack.rowHash!==digest('afw.finite-preparation-notice-row.v1',events[0])||consent.ack.sequence!==events[0].sequence||events[0].issued_at>consent.ack.observedAt))fail();
+     if(consent.ack?.outcome==='no_mutation'&&(events.length||consent.ack.rowHash!==null||consent.ack.sequence!==null))fail();
+    }
+    return {schema,tickets,events};
+   };
+   const qualify=async(f,actual)=>{
+    const store=createFiniteOwnerPreparationStore({storage,now:Date.now}),id=capsule.preconnectionId,prefix='connection-preparation:'+id+':';
+    const getRecord=async(method,arg,required=true)=>{const v=await child(l=>store[method](arg,l));if(v.status==='absent'&&!required)return null;if(v.status!=='observed')fail();return v.record;};
+    const data={};
+    if(f.inventory.size){
+     data.sourceSnapshot=await getRecord('readOwnerSourceSnapshot',{preconnectionId:id});
+     if(data.sourceSnapshot.preconnectionId!==id||canonical(data.sourceSnapshot.source)!==canonical(source))fail();
+     data.ticket=await getRecord('readTicket',{ticketHash:data.sourceSnapshot.initialTicketHash},false);
+     if(!data.ticket){
+      data.ticketUse=await getRecord('readTicketUse',{ticketHash:data.sourceSnapshot.initialTicketHash},false);
+      data.preconnection=await getRecord('readPreconnection',{preconnectionId:id},false);
+      if(data.ticketUse||data.preconnection||f.inventory.size!==1||!f.inventory.has(prefix+'source')||f.enrollment.size||f.effects.size||f.issuer.reservation)fail();
+     }else{
+     data.projectRef=await getRecord('readProjectRef',{projectRef:data.ticket.projectRef});
+     const t=data.ticket,map=data.projectRef,realm=evidence('realm',{...source.access,origin:source.origin}),subject=evidence('subject',{accessRealmHash:realm,subject:p.subject});
+     if(t.ticketHash!==data.sourceSnapshot.initialTicketHash||t.preconnectionId!==id||t.sourceRevision!==source.sourceRevision||t.action!=='connection'||t.connectionRef!==null||t.subjectHash!==subject||map.preconnectionId!==id||map.projectRef!==t.projectRef||map.sourceRevision!==source.sourceRevision||map.projectId!==source.project.projectId||map.revision!==source.project.revision||map.subjectHash!==subject||t.expiresAt>map.expiresAt||t.createdAt<source.window.startedAt||t.createdAt>Date.now()||map.issuedAt<source.window.startedAt||map.issuedAt>t.createdAt||map.expiresAt>capsule.C0||t.expiresAt>capsule.C0||Date.now()>=Math.min(t.expiresAt,map.expiresAt))fail();
+     data.ticketUse=await getRecord('readTicketUse',{ticketHash:t.ticketHash},false);
+     data.preconnection=await getRecord('readPreconnection',{preconnectionId:id},false);
+     if(data.preconnection){
+      data.stageApproval=await getRecord('readStageApproval',{preconnectionId:id,stage:'connection'},false);
+      data.approval=await getRecord('readConfigurationApproval',{approvalHash:data.preconnection.approvalHash});
+      data.ticketUse=await getRecord('readTicketUse',{ticketHash:t.ticketHash});
+      const pre=data.preconnection,sa=data.stageApproval,a=data.approval,use=data.ticketUse;
+      if(!use)fail();
+      const decision=evidence('decision',{ticket:t,decision:'approve',projectHash:a.projectHash,goal:source.goal,clientId:source.clientId,approvedAt:a.approvedAt,expiresAt:a.expiresAt});
+      if(pre.preconnectionId!==id||pre.sourceRevision!==source.sourceRevision||pre.actorId!==actorId||pre.owner.subject!==p.subject||pre.owner.accessRealmHash!==realm||pre.clientId!==source.clientId||pre.resource!==source.resource||canonical(pre.project)!==canonical(source.project)||pre.baselineHash!==evidence('baseline',source.initialBaseline)||pre.startedAt<capsule.I0||pre.expiresAt>capsule.C0||(sa&&(sa.preconnectionId!==id||sa.sourceRevision!==source.sourceRevision||sa.stage!=='connection'||sa.ticketHash!==t.ticketHash||sa.approvalHash!==pre.approvalHash))||pre.approvalHash!==prepHash('ConfigurationApproval',a)||a.subjectHash!==subject||a.sourceRevision!==source.sourceRevision||a.clientId!==source.clientId||a.projectHash!==projectHash(source.project)||a.csrfReceiptHash!==decision||use.ticketHash!==t.ticketHash||use.recordHash!==decision||use.consumedAt<a.approvedAt||use.consumedAt>Date.now()||a.approvedAt<pre.startedAt||a.approvedAt<t.createdAt||a.expiresAt>Math.min(pre.expiresAt,pre.owner.accessExpiresAt,t.expiresAt,capsule.C0))fail();
+      clock.narrow(Math.min(pre.expiresAt,pre.owner.accessExpiresAt,a.expiresAt));
+     }else if(f.inventory.size!==1||!f.inventory.has(prefix+'source')||f.enrollment.size||f.effects.size||f.issuer.reservation)fail();
+     }
+    }else if(f.enrollment.size||f.effects.size||f.issuer.reservation)fail();
+    let enrollment=null,ack=null;
+    if(f.enrollment.size){
+     enrollment=enrollmentRecord('Enrollment',f.enrollment.get('afw.finite-preparation-cleanup.v1:enrollment'));
+     ack=f.enrollment.has('afw.finite-preparation-cleanup.v1:ack')?enrollmentRecord('Ack',f.enrollment.get('afw.finite-preparation-cleanup.v1:ack')):null;
+     qualifyFinitePreparationEnrollmentFacts({anchors:f.a,enrollment,ack,...data});
+    }
+    let receipt=null;
+    if(f.effects.size){
+     if(!enrollment||!ack||!data.preconnection||!data.stageApproval)fail();
+     const identity={kind:'connection',preconnectionId:id,sourceRevision:source.sourceRevision,stage:'connection'},up=effectIdentity({...identity,effect:'upload'}),activationId=effectIdentity({...identity,effect:'activation'});
+     const allowed=['writer-head',...['send','ack'].map(s=>up+':'+s),...['send','ack','receipt'].map(s=>activationId+':'+s)].map(s=>'afw.finite-policy-effect.v1:'+s);
+
+     if([...f.effects.keys()].some(k=>!allowed.includes(k)))fail();
+     const upload=await child(l=>createFinitePolicyEffectJournal({storage,identity:{...identity,effect:'upload'},now:Date.now}).read(l)),activation=await child(l=>createFinitePolicyEffectJournal({storage,identity:{...identity,effect:'activation'},now:Date.now}).read(l));
+     const contextHash=digest('afw.finite-connection-context.v1',{preconnection:data.preconnection,stageApproval:data.stageApproval,predecessors:[],grant:null,notice:null});
+     const historical=(journal,effect)=>{
+      if(!['absent','issued','acknowledged','installed'].includes(journal.state)||journal.receipt&&effect!=='activation')fail();
+      if(!journal.send){if(journal.state!=='absent'||journal.ack||journal.receipt)fail();return;}
+      const s=journal.send,a=journal.ack,pre=data.preconnection,approval=data.approval;
+      if(s.preconnectionId!==id||s.sourceRevision!==source.sourceRevision||s.stage!=='connection'||s.effect!==effect||s.contextHash!==contextHash||s.baselineVersionId!==capsule.activatedVersionId||s.baselineDeploymentId!==capsule.activatedDeploymentId||s.issuedAt<Math.max(ack.acknowledgedAt,approval.approvedAt,data.ticketUse.consumedAt)||s.issuedAt>Date.now()||s.deadline>Math.min(pre.expiresAt,pre.owner.accessExpiresAt,approval.expiresAt,capsule.C0)||s.deadline-s.issuedAt>5000||a&&(a.sendHash!==prepHash('ConnectionSend',s)||a.acknowledgedAt<s.issuedAt||a.acknowledgedAt>=s.deadline||a.acknowledgedAt>Date.now()))fail();
+     };
+     historical(upload,'upload');historical(activation,'activation');
+     if(!upload.send||upload.receipt||activation.send&&(!upload.ack||activation.send.issuedAt<upload.ack.acknowledgedAt)||activation.ack&&!activation.send)fail();
+     const last=activation.send??upload.send,lastId=activation.send?activationId:up,expectedRows=1+(upload.send?1:0)+(upload.ack?1:0)+(activation.send?1:0)+(activation.ack?1:0)+(activation.receipt?1:0);
+     if(f.effects.size!==expectedRows||f.effects.get('afw.finite-policy-effect.v1:writer-head')!==JSON.stringify({identityHash:lastId,sendHash:prepHash('ConnectionSend',last)}))fail();
+     const expected=structuredClone(plan.configuration);expected.bindings.find(b=>b.name==='AFW_DELEGATED_OAUTH_ENABLED').text='true';
+     if(activation.ack){
+      if(upload.ack.resourceId===capsule.activatedVersionId||activation.ack.resourceId===capsule.activatedDeploymentId||actual.pointer.versionId!==upload.ack.resourceId||actual.pointer.deploymentId!==activation.ack.resourceId||canonical(actual.currentConfiguration)!==canonical(expected))fail();
+      qualifyFiniteConnectionProfile({phase:'read_consent',metadata:actual.currentConfiguration});
+     }else if(actual.pointer.versionId!==capsule.activatedVersionId||actual.pointer.deploymentId!==capsule.activatedDeploymentId||canonical(actual.currentConfiguration)!==canonical(plan.configuration))fail();
+     if(activation.receipt){
+      receipt=qualifyFiniteOwnerInstalledStage({source,preconnection:data.preconnection,sourceSnapshot:data.sourceSnapshot,initialTicket:data.ticket,connection:null,stage:'connection',stageApproval:data.stageApproval,approval:data.approval,ticket:data.ticket,ticketUse:data.ticketUse,upload,activation,predecessors:[],grantLink:null,noticeLink:null,observedAt:Date.now()});
+      if(receipt.moduleHash!==capsule.moduleHash||receipt.configurationHash!==finiteActivationConfigurationHash(actual.currentConfiguration))fail();
+     }
+    }else if(actual.pointer.versionId!==capsule.activatedVersionId||actual.pointer.deploymentId!==capsule.activatedDeploymentId||canonical(actual.currentConfiguration)!==canonical(plan.configuration))fail();
+    if(f.sdk.root){const r=f.sdk.root;if(!receipt||!enrollment||!ack||r.preconnectionId!==id||r.capsuleHash!==capsule.capsuleHash||r.enrollmentHash!==enrollment.recordHash||r.originalConnectionReceiptHash!==receipt.receiptHash||r.sourceRevision!==capsule.sourceRevision||r.actorId!==actorId||r.qaVersionId!==qaVersionId||r.mVersionId!==receipt.versionId||r.I0!==capsule.I0||r.C0!==capsule.C0||r.C1!==capsule.C1||r.createdAt>Date.now())fail();for(const v of Object.values(f.sdk.operations))if(v.observed?.observedAt>Date.now())fail();}
+    data.noticeLink=await getRecord('readLink',{kind:'notice',preconnectionId:id},false);
+    if(data.noticeLink?(f.inventory.get(prefix+'notice')!==prepEncode('NoticeLink',data.noticeLink)):f.inventory.has(prefix+'notice'))fail();
+    const issuerFacts=await issuerPrimary(f,data,enrollment,ack,receipt,getRecord);
+    if(f.sdk.root){
+     const b=f.sdk.operations.sdk_begin,a=f.sdk.operations.sdk_approve,c=f.sdk.operations.sdk_complete,i=f.issuer.reservation?.identity,g=f.sdk.grant;
+     if(b.send&&b.send.bindingHash!==b.send.originalRequestHash||a.send&&(!i||a.send.bindingHash!==i.authorizationHash)||c.send&&(!issuerFacts.grant||!issuerFacts.grantLink||!issuerFacts.relation))fail();
+     if(i&&(!b.observed||b.observed.resultHash!==digest('afw.finite-owner-sdk-begin-result.v1',{authorizationHash:i.authorizationHash,requestHash:b.send.originalRequestHash})))fail();
+     if(g&&(!i||g.rootHash!==f.sdk.root.recordHash||g.identityHash!==i.identityHash||g.reservationHash!==f.issuer.reservation.recordHash||g.authorizationHash!==i.authorizationHash||g.grantId!==i.grantId||g.approvedRequestHash!==a.observed?.resultHash||Date.parse(g.createdAt)>Date.now()||Date.now()>=Date.parse(g.expiresAt)||Date.parse(g.expiresAt)>Math.min(i.C0,Date.parse(i.consentExpiresAt),data.preconnection.expiresAt)||g.scopes.some(s=>!i.requestedScopes.includes(s))))fail();
+     if(issuerFacts.grant&&g&&(canonical(JSON.parse(issuerFacts.grant.scopes_json))!==canonical(g.scopes)||issuerFacts.grant.created_at!==g.createdAt||issuerFacts.grant.expires_at!==g.expiresAt))fail();
+    }
+    const noticeFacts=await noticePrimary(f,data,issuerFacts);
+    qualifyNoticeLink(f,data,issuerFacts,noticeFacts);
+    return {receipt,data,enrollment,ack,issuerFacts,noticeFacts};
+   };
+   const qualified=await qualify(first,observed),again=await primary(),second=await facts(),secondQualified=await qualify(second,again);
+   const snapshot=(f,physical,q)=>({
+    sourceBase:source,preconnectionId:capsule.preconnectionId,capsuleHash:capsule.capsuleHash,
+    anchor:JSON.parse(f.anchor),physical,
+    preparation:Object.fromEntries(['sourceSnapshot','ticket','ticketUse','projectRef','preconnection','stageApproval','approval','noticeLink'].map(k=>[k,q.data[k]??null])),
+    records:{inventory:[...f.inventory],effects:[...f.effects],enrollment:[...f.enrollment],issuer:f.issuer,sdk:f.sdk.entries,notice:f.notice},
+    installed:{receipt:q.receipt,enrollment:q.enrollment,ack:q.ack},
+    noticeRows:q.noticeFacts,
+    issuerRows:{schema:null,fence:null,consent:null,grant:null,authorization:null,grantLink:null,relation:null,connection:null,...q.issuerFacts}
+   });
+   const pair={first:snapshot(first,observed,qualified),second:snapshot(second,again,secondQualified)};
+   if(canonical(pair.first)!==canonical(pair.second))fail();
+   current(clock.lease);return freezeOwnerPhaseData(pair);
+  });
+  return await run();
+ }finally{if(parentSignal&&onAbort)parentSignal.removeEventListener('abort',onAbort);clock?.close();}
+}
+
+
+// Existing consumer projection of the ORIGINAL SQL row, never an ACK row hash.
+function noticeEventHash(row){
+ return evidence('event',{grantId:row.grant_id,projectId:row.project_id,subject:row.user_id,clientId:row.client_id,resource:row.resource,revision:row.revision,action:row.action,purpose:row.purpose,requestId:row.request_id,sequence:row.sequence,issuedAt:row.issued_at,expiresAt:row.expires_at});
+}
+function qualifyNoticeLink(f,data,rows,notice){
+ const link=data.noticeLink;if(!link)return;
+ const n=f.notice,r=n.reservation,i=f.issuer.reservation?.identity,send=n.operations.consent.send,ack=n.operations.consent.ack;
+ if(!i||!r||n.freeze||!data.preconnection||!data.approval||!rows.grant||!rows.authorization||!rows.grantLink||!rows.relation||!rows.connection||!f.sdk.root||!f.sdk.grant||!notice.schema||notice.tickets.length!==1||notice.events.length!==1||n.operations.ticket.ack?.outcome!=='applied'||!n.operations.ticket.send||!send||ack?.outcome!=='applied')fail();
+ const row=notice.events[0],ceiling=Math.min(send.accessExpiresAt,r.accessExpiresAt,data.preconnection.owner.accessExpiresAt,data.preconnection.expiresAt,data.approval.expiresAt,rows.connection.expiresAt,Date.parse(i.consentExpiresAt),Date.parse(rows.grant.expires_at),r.ticket.permissionExpiresAt,i.C0);
+ qualifyNoticeConsentEvent(row,i,r.ticket,send);
+ if(link.preconnectionId!==i.preconnectionId||link.grantHash!==rows.grantLink.grantHash||link.grantHash!==sha(i.grantId)||link.sequence!==row.sequence||link.sequence!==ack.sequence||link.eventHash!==noticeEventHash(row)||link.acceptedAt<Math.max(ack.observedAt,row.issued_at,rows.grantLink.acceptedAt)||link.acceptedAt>=send.window.deadline||link.acceptedAt>=Math.min(ceiling,r.ticket.expiresAt)||link.acceptedAt>Date.now()||Date.now()>=ceiling)fail();
+}
+function qualifyNoticeConsentEvent(row,i,t,send){
+ fields(row,['sequence','grant_id','project_id','user_id','client_id','resource','revision','action','purpose','request_id','issued_at','expires_at']);
+ if(!Number.isSafeInteger(row.sequence)||row.sequence<=0||!Number.isSafeInteger(row.issued_at)||row.issued_at<Math.max(send.window.startedAt,t.issuedAt,send.issuedAt)||row.issued_at>=Math.min(send.window.deadline,t.permissionExpiresAt)||row.issued_at>Date.now())fail();
+ const expected={sequence:row.sequence,grant_id:i.grantId,project_id:i.projectId,user_id:i.subject,client_id:i.clientId,resource:i.resource,revision:i.projectRevision,action:'grant',purpose:'afw.dossier-monitoring.v1',request_id:t.requestId,issued_at:row.issued_at,expires_at:t.permissionExpiresAt};
+ if(canonical(row)!==canonical(expected))fail();
+}
+function qualifyNoticeConsentBaseline(pair){
+ for(const s of [pair.first,pair.second]){
+  const n=s.records.notice,issuer=s.records.issuer,rows=s.issuerRows;
+  if(s.preparation.noticeLink||!s.installed.receipt||!s.noticeRows.schema||!n.reservation||n.freeze||n.operations.ticket.ack?.outcome!=='applied'||!n.operations.ticket.send||n.operations.consent.send||n.operations.consent.ack||s.noticeRows.tickets.length!==1||s.noticeRows.events.length)fail();
+  if(!issuer.reservation||issuer.operations.grant.ack?.outcome!=='applied'||!rows.grant||!rows.authorization||!rows.grantLink||!rows.relation||!rows.connection)fail();
+  for(const v of Object.values(issuer.operations))if(v.send&&!v.ack||v.ack&&!v.send)fail();
+  const names=new Set(s.records.sdk.map(([key])=>key)),prefix='afw.finite-owner-issuer-provenance.v1:'+s.preconnectionId+':';
+  if(!['root','grant','sdk_begin:send','sdk_begin:observed','sdk_approve:send','sdk_approve:observed','sdk_complete:send','sdk_complete:observed'].every(key=>names.has(prefix+key)))fail();
+  for(const [key]of s.records.sdk)if(key.endsWith(':send')&&!names.has(key.slice(0,-4)+'observed'))fail();
+ }
+ const {sourceBase,installed,preconnectionId,capsuleHash}=pair.second,r=installed.receipt;
+ const source=validateFiniteOwnerSource({...sourceBase,phase:'read_consent',currentPublication:{stage:'connection',versionId:r.versionId,deploymentId:r.deploymentId,receiptHash:r.receiptHash}});
+ return Object.freeze({source,preconnectionId,capsuleHash});
+}
+function expectedNoticeTicket(i,t){return {handle_hash:t.handleHash,request_id:t.requestId,user_id:i.subject,grant_id:i.grantId,project_id:i.projectId,client_id:i.clientId,resource:i.resource,purpose:'afw.dossier-monitoring-owner.v1',action:'grant',revision:i.projectRevision,expected_sequence:t.expectedSequence,issued_at:t.issuedAt,expires_at:t.expiresAt,permission_expires_at:t.permissionExpiresAt};}
+function requireEmptyNotice(s){
+ const n=s.records.notice;
+ if(s.preparation.noticeLink||n.reservation||n.freeze||Object.values(n.operations).some(v=>v.send||v.ack)||s.noticeRows.tickets.length||s.noticeRows.events.length)fail();
+}
+function freezeOwnerPhaseData(value){
+ if(value&&typeof value==='object'){for(const v of Object.values(value))freezeOwnerPhaseData(v);Object.freeze(value);}return value;
+}
+function qualifySettledOwnerPair(pair){
+ for(const s of [pair.first,pair.second]){
+  if(s.records.effects.length&&!s.installed.receipt||s.preparation.ticketUse&&!s.preparation.stageApproval)fail();
+  requireEmptyNotice(s);
+  for(const v of Object.values(s.records.issuer.operations))if(v.send&&!v.ack||v.ack&&!v.send)fail();
+  const names=new Set(s.records.sdk.map(([key])=>key));
+  for(const [key]of s.records.sdk)if(key.endsWith(':send')&&!names.has(key.slice(0,-4)+'observed'))fail();
+ }
+ const {sourceBase,installed,preconnectionId,capsuleHash}=pair.second,r=installed.receipt;
+ const source=r?validateFiniteOwnerSource({...sourceBase,phase:'read_consent',currentPublication:{stage:'connection',versionId:r.versionId,deploymentId:r.deploymentId,receiptHash:r.receiptHash}}):sourceBase;
+ return Object.freeze({source,preconnectionId,capsuleHash});
+}
+export async function readPrivateQaFiniteOwnerContext(options){
+ if(arguments.length!==1)fail();
+ return qualifySettledOwnerPair(await observeOwnerPhasePair(options));
+}
+
+
+/** Fixed native connection producer. One original human continuation owns every
+ * native result; journal DATA is observed but never resumes this stack. */
+export async function handlePrivateQaFiniteOwnerConnection({request,env,ctx},originalLease){
+ let clock,onAbort,failed=false,position='entry';
+ try{
+  if(readFiniteOwnerRequestContext(originalLease).root!==originalLease)fail();
+  return await observeFiniteOwnerRequestWork({ctx,env,originalLease},()=>finiteNativeOperation(originalLease,ctx,async firstFailure=>{
+   const received=connectionMetadata(request.headers),storage=ctx.storage,db=env.RELEASE_DB,fetcher=globalThis.fetch;
+   const metadata=env.AFW_QA_VERSION,reader=env.AFW_MCP_CLOSURE_READ_TOKEN,publisher=env.AFW_MCP_CLOSURE_PUBLISH_TOKEN;
+   const native={get:storage.get,list:storage.list,transaction:storage.transaction,sync:storage.sync,getAlarm:storage.getAlarm},headers=request.headers,signal=request.signal,url=request.url,headerBytes=canonical([...headers]);
+   // Capture native objects/methods ONCE for the whole original continuation.
+   // New first-primary sessions/statements are still captured per operation.
+   const actor=ctx.id,toString=actor?.toString,self=env.AFW_INDEPENDENT_CLOSURE,node=env.AFW_RELEASE_EVENTS_NODE,alias=env.AFW_FINITE_OWNER_OAUTH_KV,qaVersionId=metadata?.id;
+   const dbMethods={prepare:db?.prepare,withSession:db?.withSession},selfMethods={idFromName:self?.idFromName,get:self?.get},nodeMethods={idFromName:node?.idFromName,idFromString:node?.idFromString,get:node?.get},aliasMethods={get:alias?.get,put:alias?.put,delete:alias?.delete,list:alias?.list};
+   if([toString,...Object.values(native),...Object.values(dbMethods),...Object.values(selfMethods),...Object.values(nodeMethods),...Object.values(aliasMethods)].some(value=>typeof value!=='function'))fail();
+   const actorId=Reflect.apply(toString,actor,[]);if(!hex(actorId))fail();
+   let activeChild=null,admission=null;
+   const holders=()=>{
+    current(originalLease);
+    if(failed||ctx.storage!==storage||ctx.id!==actor||actor.toString!==toString||Reflect.apply(toString,actor,[])!==actorId||env.RELEASE_DB!==db||Object.keys(dbMethods).some(key=>db[key]!==dbMethods[key])||env.AFW_INDEPENDENT_CLOSURE!==self||Object.keys(selfMethods).some(key=>self[key]!==selfMethods[key])||env.AFW_RELEASE_EVENTS_NODE!==node||Object.keys(nodeMethods).some(key=>node[key]!==nodeMethods[key])||env.AFW_FINITE_OWNER_OAUTH_KV!==alias||Object.keys(aliasMethods).some(key=>alias[key]!==aliasMethods[key])||globalThis.fetch!==fetcher||env.AFW_QA_VERSION!==metadata||metadata.id!==qaVersionId||env.AFW_MCP_CLOSURE_READ_TOKEN!==reader||env.AFW_MCP_CLOSURE_PUBLISH_TOKEN!==publisher||Object.keys(native).some(k=>storage[k]!==native[k])||request.headers!==headers||request.signal!==signal||request.url!==url||request.method!=='POST'||canonical([...headers])!==headerBytes)fail();
+    if(admission)current(admission.lease);
+   };
+   clock=createFiniteInitialLease(readFiniteOwnerRequestDeadline(originalLease),readFiniteOwnerRequestDeadline(originalLease),holders,fail);
+   onAbort=()=>{clock.close();};originalLease.signal.addEventListener('abort',onAbort,{once:true});
+   const check=()=>{current(clock.lease);if(activeChild)current(activeChild);};
+   const wait=async work=>{check();const promise=work();const value=await clock.wait(retain(promise),activeChild??clock.lease);check();return value;};
+   const first=error=>{failed=true;firstFailure(error);};
+   const bytes=await wait(()=>received.method==='POST'?readFiniteOwnerNoticeConsentBody(request,check,first):connectionBytes(request,check,first));
+   const original=new Request(connectionUrl,{method:received.method,headers,body:bytes.length?bytes:undefined,signal:originalLease.signal});
+   const grammar=qualifyFiniteOwnerChoiceRequest(original,bytes),initial=await wait(()=>observeOwnerPhasePair({ctx,env,parent:originalLease})),initialState=initial.second;
+   const clean=s=>{
+    requireEmptyNotice(s);
+    if(s.installed.receipt||s.installed.enrollment||s.installed.ack||s.records.effects.length||s.records.sdk.length||s.records.issuer.reservation||s.records.issuer.freeze||Object.values(s.records.issuer.operations).some(v=>v.send||v.ack)||s.preparation.preconnection||s.preparation.stageApproval||s.preparation.ticketUse)fail();
+   };
+   clean(initial.first);clean(initialState);
+   if(headers.get('x-afw-finite-version')!==initialState.sourceBase.initialBaseline.versionId)fail();
+   const id=initialState.preconnectionId;
+   // This lexical reader returns exactly the three factual public keys. During
+   // choice's own sequential writes it describes closed prefixes without granting
+   // publication permission. Admission is minted only by choice's actual finish.
+   const readChoice=async(parent,requested)=>{
+    check();const pair=await wait(()=>observeOwnerPhasePair({ctx,env,parent,...requested?{preconnectionId:requested}:{}}));
+    for(const s of [pair.first,pair.second]){
+     requireEmptyNotice(s);
+     if(s.preconnectionId!==id||s.capsuleHash!==initialState.capsuleHash||canonical(s.sourceBase)!==canonical(initialState.sourceBase)||s.records.effects.length||s.installed.enrollment||s.installed.receipt||s.records.sdk.length||s.records.issuer.reservation)fail();
+    }
+    return Object.freeze({source:pair.second.sourceBase,preconnectionId:id,capsuleHash:pair.second.capsuleHash});
+   };
+   const choice=await wait(()=>continuePrivateQaFiniteOwnerChoice({ctx,env,request:original},originalLease,readChoice));
+   if(grammar.method==='GET'){
+    if(choice.status!==200||choice.stage!=='connection'||!hex(choice.handle)||!hex(choice.projectRef)||choice.goal!==initialState.sourceBase.goal||!Number.isSafeInteger(choice.expiresAt)||choice.expiresAt<=Date.now())fail();
+    const html='<h1>Preparar configuración de lectura</h1><p>La lectura y los avisos requieren decisiones separadas.</p><form method="post" action="/connections/finite-prepare"><input type="hidden" name="handle" value="'+choice.handle+'"><input type="hidden" name="projectRef" value="'+choice.projectRef+'"><button name="decision" value="approve">Preparar lectura</button></form>';
+    check();return new Response(html,{headers:{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store','Set-Cookie':'__Host-afw-finite-prepare='+choice.handle+'; Secure; HttpOnly; SameSite=Strict; Path=/; Max-Age='+Math.max(0,Math.floor((choice.expiresAt-Date.now())/1000))}});
+   }
+   if(choice.status!==202||choice.stage!=='connection'||choice.preconnectionId!==id)fail();
+   admission=consumeFiniteOwnerStageAdmission({ctx,env,preconnectionId:id,stage:'connection'},originalLease);
+   position='approved';
+   return adoptFiniteOwnerRequestStageWork({ctx,env,admission,originalLease},async()=>{
+    const approved=await wait(()=>observeOwnerPhasePair({ctx,env,parent:originalLease,preconnectionId:id})),expected=structuredClone(approved.second),prep=expected.preparation,capsule=expected.anchor.anchors.capsule,plan=expected.anchor.anchors.plan,resident=readPrivateQaFiniteCandidate();
+    if(!prep.preconnection||!prep.stageApproval||!prep.ticketUse||prep.noticeLink||expected.records.effects.length||expected.installed.enrollment||expected.installed.receipt||prep.ticket.ticketHash!==sha(grammar.handle)||prep.ticket.projectRef!==grammar.projectRef||prepHash('StageApproval',prep.stageApproval)!==admission.stageApprovalHash||canonical(admission.ownerSource)!==canonical(expected.sourceBase))fail();
+    clock.narrow(Math.min(capsule.C0,prep.preconnection.expiresAt,prep.preconnection.owner.accessExpiresAt,prep.approval.expiresAt,plan.readerExpiresAt,plan.publisherExpiresAt));
+    const baseline={versionId:capsule.activatedVersionId,deploymentId:capsule.activatedDeploymentId,module:resident.module,configuration:plan.configuration};
+    const configuration=structuredClone(plan.configuration);configuration.bindings.find(b=>b.name==='AFW_DELEGATED_OAUTH_ENABLED').text='true';
+    qualifyFiniteConnectionProfile({phase:'read_consent',metadata:configuration});
+    const candidate={module:resident.module,configuration},candidateBytes=Uint8Array.from(resident.bytes);
+    if(sha(candidateBytes)!==capsule.moduleHash||candidateBytes.length!==plan.moduleBytes||resident.sourceRevision!==capsule.sourceRevision||resident.sourceTree!==capsule.sourceTree)fail();
+    const backupEntry=expected.anchor.backupRaw.find(([key])=>key.endsWith(':backup'));if(!backupEntry)fail();
+    const backup=uploadRecord('Backup',backupEntry[1]),rollbackBytes=Buffer.concat(expected.anchor.backupRaw.filter(([key])=>key.includes(':chunk:')).map(([,raw])=>Buffer.from(uploadRecord('Chunk',raw).content,'base64')));
+    if(rollbackBytes.length!==backup.moduleBytes||sha(rollbackBytes)!==backup.moduleHash||restorationConfigurationHash(backup.rawConfiguration)!==backup.configurationHash)fail();
+    const rollback={versionId:backup.baselineVersionId,module:{name:'index.mjs',bytes:backup.moduleBytes,sha256:backup.moduleHash},configuration:backup.rawConfiguration};
+    let ownEnrollment=null,ownEnrollmentAck=null,writer=null,enrollmentResult=null,enrollmentAckResult=null;
+    let ownUploadSend=null,actualUploadPromise=null,actualUploadResult=null,uploadSettled=false,ownUploadAck=null;
+    let ownActivationSend=null,actualActivationPromise=null,actualActivationResult=null,activationSettled=false,ownActivationAck=null;
+    let ownReceipt=null,receiptWrite=null,receiptReadback=null;
+    const states=['approved','enrollment-recorded','enrollment-ack-recorded','upload-send-recorded','upload-native-pending','upload-ack-recorded','upload-observed','activation-send-recorded','activation-native-pending','activation-ack-recorded','activation-observed','receipt-recorded','complete'];
+    const engine=createFiniteFixedPolicyEngine({ctx,env},check);
+    const identity=effect=>({kind:'connection',preconnectionId:id,sourceRevision:capsule.sourceRevision,stage:'connection',effect});
+    const journal=effect=>createFinitePolicyEffectJournal({storage,identity:identity(effect),now:Date.now}),upload=journal('upload'),activation=journal('activation');
+    const contextHash=digest('afw.finite-connection-context.v1',{preconnection:prep.preconnection,stageApproval:prep.stageApproval,predecessors:[],grant:null,notice:null});
+    const updateAnchor=()=>{expected.anchor.enrollment=structuredClone(expected.records.enrollment);expected.anchor.effects=structuredClone(expected.records.effects);};
+    const ordered=rows=>rows.sort(([a],[b])=>a<b?-1:a>b?1:0);
+    async function recheckOwned(){
+     check();if(!states.includes(position)||['upload-native-pending','activation-native-pending'].includes(position))fail();
+     if(actualUploadPromise&&!uploadSettled||actualActivationPromise&&!activationSettled)fail();
+     if(states.indexOf(position)>=states.indexOf('enrollment-recorded')&&(!writer||!enrollmentResult||enrollmentResult.enrollment!==ownEnrollment))fail();
+     if(states.indexOf(position)>=states.indexOf('enrollment-ack-recorded')&&(!enrollmentAckResult||enrollmentAckResult.ack!==ownEnrollmentAck))fail();
+     if(states.indexOf(position)>=states.indexOf('upload-send-recorded')&&!ownUploadSend)fail();
+     if(states.indexOf(position)>=states.indexOf('upload-ack-recorded')&&(!actualUploadPromise||!uploadSettled||!actualUploadResult||ownUploadAck?.resourceId!==actualUploadResult.id))fail();
+     if(states.indexOf(position)>=states.indexOf('activation-send-recorded')&&!ownActivationSend)fail();
+     if(states.indexOf(position)>=states.indexOf('activation-ack-recorded')&&(!actualActivationPromise||!activationSettled||!actualActivationResult||ownActivationAck?.resourceId!==actualActivationResult.id))fail();
+     if(states.indexOf(position)>=states.indexOf('receipt-recorded')&&(!ownReceipt||!receiptWrite||!receiptReadback))fail();
+     const pair=await wait(()=>observeOwnerPhasePair({ctx,env,parent:originalLease,preconnectionId:id}));
+     if(canonical(pair.first)!==canonical(expected)||canonical(pair.second)!==canonical(expected))fail();check();
+    }
+    const withChild=action=>clock.child(async(l,end)=>{activeChild=l;try{check();return await action(l,end);}finally{activeChild=null;}});
+    const sync=()=>wait(()=>Reflect.apply(native.sync,storage,[]));
+    const setEnrollment=(kind,record)=>{
+     expected.records.enrollment.push(['afw.finite-preparation-cleanup.v1:'+(kind==='Enrollment'?'enrollment':'ack'),enrollmentEncode(kind,record)]);ordered(expected.records.enrollment);
+     expected.installed[kind==='Enrollment'?'enrollment':'ack']=structuredClone(record);updateAnchor();
+    };
+    const setEffect=(kind,record,effect)=>{
+     const prefix='afw.finite-policy-effect.v1:',key=prefix+effectIdentity(identity(effect))+':'+({ConnectionSend:'send',ConnectionAck:'ack',ConnectionReceipt:'receipt'})[kind];
+     if(expected.records.effects.some(([k])=>k===key))fail();
+     expected.records.effects.push([key,prepEncode(kind,record)]);
+     if(kind==='ConnectionSend'){
+      const head=prefix+'writer-head',raw=JSON.stringify({identityHash:effectIdentity(identity(effect)),sendHash:prepHash(kind,record)}),prior=expected.records.effects.find(row=>row[0]===head);
+      if(prior)prior[1]=raw;else expected.records.effects.push([head,raw]);
+     }
+     ordered(expected.records.effects);updateAnchor();
+    };
+    const record=async(j,kind,value,method,l,state)=>{
+     check();const result=await wait(()=>j[method](value,l));if(result.status!=='recorded'||result.recordHash!==prepHash(kind,value))fail();
+     await sync();const read=await wait(()=>j.read(l));if(read.state!==state||prepEncode(kind,read[method==='issue'?'send':method==='acknowledge'?'ack':'receipt'])!==prepEncode(kind,value))fail();
+     return {result,read};
+    };
+    await recheckOwned();
+    await withChild(async l=>{await engine.readPointer(baseline,l);await engine.readVersion(baseline,l);await engine.readVersion(rollback,l,true);await recheckOwned();});
+    await withChild(async(l,end)=>{
+     await recheckOwned();
+     writer=await wait(()=>prepareFinitePreparationEnrollmentWrite({ctx,env,preconnectionId:id,stageApprovalHash:admission.stageApprovalHash,ownerSource:admission.ownerSource,baseline,baselineBytes:Uint8Array.from(resident.bytes)},l,end));
+     await recheckOwned();enrollmentResult=await wait(()=>writer.recordEnrollment());ownEnrollment=enrollmentResult.enrollment;
+     setEnrollment('Enrollment',ownEnrollment);position='enrollment-recorded';await recheckOwned();
+     enrollmentAckResult=await wait(()=>writer.recordAck());ownEnrollmentAck=enrollmentAckResult.ack;
+     setEnrollment('Ack',ownEnrollmentAck);position='enrollment-ack-recorded';await recheckOwned();
+    });
+    const uploadInput={configuration,baselineVersionId:baseline.versionId,bytes:candidateBytes};
+    const sendFor=(effect,description,end)=>({purpose:'afw.finite-connection-send.v1',preconnectionId:id,sourceRevision:capsule.sourceRevision,stage:'connection',effect,contextHash,requestHash:digest('afw.finite-policy-request.v1',{method:description.method,path:description.path,body:description.body,baselineVersionId:baseline.versionId,baselineDeploymentId:baseline.deploymentId}),baselineVersionId:baseline.versionId,baselineDeploymentId:baseline.deploymentId,issuedAt:Date.now(),deadline:end});
+    await withChild(async(l,end)=>{
+     await recheckOwned();await engine.readPointer(baseline,l);
+     ownUploadSend=sendFor('upload',engine.describeUpload(uploadInput),end);
+     await record(upload,'ConnectionSend',ownUploadSend,'issue',l,'issued');setEffect('ConnectionSend',ownUploadSend,'upload');position='upload-send-recorded';await recheckOwned();check();
+     position='upload-native-pending';actualUploadPromise=retain(Promise.resolve().then(()=>{check();return engine.upload(uploadInput,l);}));
+     actualUploadResult=await wait(()=>actualUploadPromise);uploadSettled=true;
+     if(actualUploadResult.id===baseline.versionId||actualUploadResult.id===rollback.versionId||actualUploadResult.id===capsule.qaVersionId)fail();
+     ownUploadAck={purpose:'afw.finite-connection-ack.v1',sendHash:prepHash('ConnectionSend',ownUploadSend),resourceId:actualUploadResult.id,acknowledgedAt:Date.now()};
+     await record(upload,'ConnectionAck',ownUploadAck,'acknowledge',l,'acknowledged');setEffect('ConnectionAck',ownUploadAck,'upload');position='upload-ack-recorded';await recheckOwned();
+     await engine.readVersion({versionId:actualUploadResult.id,...candidate},l);await engine.readPointer(baseline,l);position='upload-observed';await recheckOwned();
+    });
+    await withChild(async(l,end)=>{
+     await recheckOwned();await engine.readPointer(baseline,l);
+     const input={versionId:actualUploadResult.id},description=engine.describeActivation(input);
+     ownActivationSend=sendFor('activation',description,end);
+     await record(activation,'ConnectionSend',ownActivationSend,'issue',l,'issued');setEffect('ConnectionSend',ownActivationSend,'activation');position='activation-send-recorded';await recheckOwned();check();
+     position='activation-native-pending';actualActivationPromise=retain(Promise.resolve().then(()=>{check();return engine.activate(input,l);}));
+     actualActivationResult=await wait(()=>actualActivationPromise);activationSettled=true;
+     if(actualActivationResult.id===baseline.deploymentId||actualActivationResult.strategy!=='percentage'||canonical(actualActivationResult.versions)!==canonical(description.body.versions))fail();
+     ownActivationAck={purpose:'afw.finite-connection-ack.v1',sendHash:prepHash('ConnectionSend',ownActivationSend),resourceId:actualActivationResult.id,acknowledgedAt:Date.now()};
+     await record(activation,'ConnectionAck',ownActivationAck,'acknowledge',l,'acknowledged');setEffect('ConnectionAck',ownActivationAck,'activation');
+     expected.physical.pointer={versionId:actualUploadResult.id,deploymentId:actualActivationResult.id};expected.physical.currentConfiguration=structuredClone(configuration);
+     expected.physical.qaSdkBindingFacts=qualifyFiniteOwnerSdkBindingFacts({qaMetadata:finitePublicProfileTemplate('qaLive'),mMetadata:configuration});
+     position='activation-ack-recorded';await recheckOwned();
+     await engine.readPointer({versionId:actualUploadResult.id,deploymentId:actualActivationResult.id},l);await engine.readVersion({versionId:actualUploadResult.id,...candidate},l);position='activation-observed';await recheckOwned();
+     const raw={purpose:'afw.finite-connection-installed.v1',preconnectionId:id,sourceRevision:capsule.sourceRevision,stage:'connection',baselineVersionId:baseline.versionId,baselineDeploymentId:baseline.deploymentId,versionId:actualUploadResult.id,deploymentId:actualActivationResult.id,moduleHash:candidate.module.sha256,configurationHash:finiteActivationConfigurationHash(configuration),completedAt:Date.now()};
+     ownReceipt={...raw,receiptHash:prepHash('ConnectionReceipt',raw)};
+     receiptWrite=await record(activation,'ConnectionReceipt',ownReceipt,'finish',l,'installed');receiptReadback=receiptWrite.read;
+     setEffect('ConnectionReceipt',ownReceipt,'activation');expected.installed.receipt=structuredClone(ownReceipt);position='receipt-recorded';await recheckOwned();position='complete';await recheckOwned();
+    });
+    check();return new Response('<h1>Configuración de lectura preparada</h1><p>La lectura y los avisos requieren decisiones separadas.</p>',{headers:{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store'}});
+   });
+  }));
+ }catch(error){failed=true;position='failed';return pending([400,401,403,404,405,413,429].includes(error?.status)?error.status:503);}
+ finally{if(onAbort)originalLease.signal.removeEventListener('abort',onAbort);clock?.close();}
+}
+
+/** Fixed unmounted QA implementation. All continuations and witnesses live only
+ * in this invocation's stack; persisted DATA never recreates them. */
+export async function handlePrivateQaFiniteOwnerOAuth({request,env,ctx},originalLease){
+ let clock,onAbort;
+ try{
+  if(readFiniteOwnerRequestContext(originalLease).root!==originalLease)fail();
+  return await observeFiniteOwnerRequestWork({ctx,env,originalLease},()=>finiteNativeOperation(originalLease,ctx,async firstFailure=>{
+   const received=readFiniteOwnerOAuthMetadata(request.headers);
+   const issuerCapture=captureFinitePreparationIssuerContext({ctx,env});
+   const alias=env.AFW_FINITE_OWNER_OAUTH_KV,methods={get:alias?.get,put:alias?.put,delete:alias?.delete,list:alias?.list};
+   const db=env.RELEASE_DB,dbPrepare=db?.prepare,node=env.AFW_RELEASE_EVENTS_NODE,nodeMethods={idFromName:node?.idFromName,idFromString:node?.idFromString,get:node?.get};
+   const self=env.AFW_INDEPENDENT_CLOSURE,selfGet=self?.get,metadata=env.AFW_QA_VERSION,reader=env.AFW_MCP_CLOSURE_READ_TOKEN,publisher=env.AFW_MCP_CLOSURE_PUBLISH_TOKEN,fetcher=globalThis.fetch;
+   const headers=request.headers,signal=request.signal,url=request.url,method=request.method,headerBytes=canonical([...headers]);
+   if([...Object.values(methods),...Object.values(nodeMethods),dbPrepare,selfGet].some(v=>typeof v!=='function'))fail();
+   let identity=null,activeChild=null;
+   const holders=()=>{
+    current(originalLease);issuerCapture.holders();
+    if(env.AFW_FINITE_OWNER_OAUTH_KV!==alias||Object.keys(methods).some(k=>alias[k]!==methods[k])||env.RELEASE_DB!==db||db.prepare!==dbPrepare||env.AFW_RELEASE_EVENTS_NODE!==node||Object.keys(nodeMethods).some(k=>node[k]!==nodeMethods[k])||env.AFW_INDEPENDENT_CLOSURE!==self||self.get!==selfGet||env.AFW_QA_VERSION!==metadata||env.AFW_MCP_CLOSURE_READ_TOKEN!==reader||env.AFW_MCP_CLOSURE_PUBLISH_TOKEN!==publisher||globalThis.fetch!==fetcher||request.headers!==headers||request.signal!==signal||request.url!==url||request.method!==method||canonical([...headers])!==headerBytes)fail();
+    if(identity&&Date.now()>=identity.expiresAt)fail();
+   };
+   clock=createFiniteInitialLease(readFiniteOwnerRequestDeadline(originalLease),readFiniteOwnerRequestDeadline(originalLease),holders,fail);
+   onAbort=()=>clock.close();originalLease.signal.addEventListener('abort',onAbort,{once:true});
+   const check=()=>{current(clock.lease);if(activeChild)current(activeChild);};
+   const wait=async promise=>{check();const result=await clock.wait(retain(promise),activeChild??clock.lease);check();return result;};
+   const bytes=await wait(finiteNativeBytes(request,check,firstFailure));check();
+   const original=new Request(received.url,{method:received.method,headers,body:bytes.length?bytes:undefined,signal:originalLease.signal});
+   const grammar=qualifyFiniteOwnerOAuthRequest(original,bytes);
+   const baseline=await wait(observeOwnerPhasePair({ctx,env,parent:originalLease})),context=qualifySettledOwnerPair(baseline);
+   if(context.source.phase!=='read_consent'||received.mVersionId!==context.source.currentPublication.versionId||!baseline.second.issuerRows.schema)fail();
+   const expected=structuredClone(baseline.second),source=context.source,id=context.preconnectionId;
+   const capsule=expected.anchor.anchors.capsule,prep=expected.preparation;
+   clock.narrow(Math.min(capsule.C0,prep.preconnection.expiresAt,prep.preconnection.owner.accessExpiresAt,prep.approval.expiresAt));
+   const verified=await wait(verifyCloudflareAccessJwtWithExpiry({token:original.headers.get('Cf-Access-Jwt-Assertion'),teamDomain:source.access.teamDomain,audience:source.access.audience}));
+   if(!verified.ok)fail();identity=verified.identity;clock.narrow(identity.expiresAt);
+   const rawCookies=(original.headers.get('Cookie')??'').split(';').map(s=>s.trim()),cookie=rawCookies.filter(s=>s.startsWith('__Host-afw-finite-prepare='));
+   if(cookie.length!==1||!/^__Host-afw-finite-prepare=[a-f0-9]{64}$/.test(cookie[0])||sha(cookie[0].slice('__Host-afw-finite-prepare='.length))!==prep.ticket.ticketHash)fail();
+   const realm=evidence('realm',{...source.access,origin:source.origin}),subjectHash=evidence('subject',{accessRealmHash:realm,subject:identity.subject});
+   qualifyFiniteOwnerApprovedTicket({source,identity,currentTicket:prep.ticket,ticket:prep.ticket,use:prep.ticketUse,pre:prep.preconnection,approval:prep.approval,snapshot:prep.sourceSnapshot,realm,subjectHash,observedAt:Date.now()});
+   if(identity.subject!==expected.anchor.anchors.material.ownerSelection.subject)fail();
+   const sdk=sdkJournal({ctx,env}),issuer=createFinitePreparationIssuerJournal({ctx,env}),store=createFinitePreparationIssuerStore({ctx,env}),preparation=createFiniteOwnerPreparationStore({storage:ctx.storage,now:Date.now});
+   const sdkPrefix='afw.finite-owner-issuer-provenance.v1:'+id+':',inventoryPrefix='connection-preparation:'+id+':';
+   let position='baseline',operation=null,actualPromise=null,actualResult=null,settled=false;
+   // These are lexical objects, never fields in a frame/journal/response.
+   let consumption=null,consumptionChild=null,consumptionStore=null;
+   const readSdk=(suffix)=>{const row=expected.records.sdk.find(([key])=>key===sdkPrefix+suffix);return row?JSON.parse(row[1]):null;};
+   function updateAnchor(){
+    expected.anchor.inventory=structuredClone(expected.records.inventory);
+    expected.anchor.issuer=structuredClone(expected.records.issuer);
+    expected.anchor.sdk=structuredClone(expected.records.sdk);
+   }
+   async function recheckOwned(){
+    check();requireEmptyNotice(expected);
+    if(actualPromise&&!settled)fail();
+    const pendingIssuer=Object.entries(expected.records.issuer.operations).filter(([,v])=>v.send&&!v.ack).map(([k])=>k);
+    const pendingSdk=sdkOperations.filter(op=>readSdk(op+':send')&&!readSdk(op+':observed'));
+    if(pendingIssuer.length+pendingSdk.length>1)fail();
+    if(pendingIssuer.length&&(pendingIssuer[0]!==operation||!['issuer-send','issuer-resolved'].includes(position)))fail();
+    if(pendingSdk.length&&(pendingSdk[0]!==operation||!['sdk-send','sdk-resolved'].includes(position)))fail();
+    if(position.endsWith('-resolved')&&(!actualPromise||!settled||!actualResult))fail();
+    const pair=await wait(observeOwnerPhasePair({ctx,env,parent:originalLease,preconnectionId:id}));
+    if(canonical(pair.first)!==canonical(expected)||canonical(pair.second)!==canonical(expected))fail();
+    check();
+   }
+   const fresh=async(promise,record)=>{const result=await wait(promise);if(result?.status!=='recorded'||result.recordHash!==record.recordHash)fail();return result;};
+   const sdkAppend=async(kind,record,op=null)=>{
+    check();
+    const suffix=kind==='Root'?'root':kind==='ExpectedGrant'?'grant':op+(kind==='SdkSend'?':send':':observed');
+    if(readSdk(suffix))fail();
+    const call=kind==='Root'?sdk.appendRoot(record,clock.lease):kind==='ExpectedGrant'?sdk.appendExpectedGrant({preconnectionId:id,record},clock.lease):kind==='SdkSend'?sdk.appendSend({preconnectionId:id,record},clock.lease):sdk.appendObserved({preconnectionId:id,operation:op,record},clock.lease);
+    await fresh(call,record);expected.records.sdk.push([sdkPrefix+suffix,sdkEncode(kind,record)]);expected.records.sdk.sort(([a],[b])=>a.localeCompare(b));updateAnchor();
+   };
+   const api=new OAuthAuthorizationServer({issuer:source.origin,resources:[source.resource],scopesSupported:['afw:project:read','afw:evidence:read'],accessTokenTTL:300,clientIdMetadataDocumentEnabled:false}).getOAuthApi(Object.freeze({OAUTH_KV:alias}));
+   const authData=value=>{
+    const v=own(value);fields(v,['responseType','clientId','redirectUri','scope','state','codeChallenge','codeChallengeMethod','resource','issuer']);
+    if(v.responseType!=='code'||v.clientId!==source.clientId||v.resource!==source.resource||v.issuer!==source.origin||v.codeChallengeMethod!=='S256'||!/^[-_A-Za-z0-9]{43}$/.test(v.codeChallenge)||!issuerScopes(v.scope)||typeof v.state!=='string'||!v.state||v.state.length>4096||typeof v.redirectUri!=='string'||v.redirectUri.length>4096)fail();
+    const redirect=new URL(v.redirectUri);if(redirect.protocol!=='https:'||redirect.username||redirect.password||redirect.hash)fail();return v;
+   };
+   const authHash=v=>digest('afw.finite-owner-sdk-request.v1',authData(v));
+   async function sdkCall(op,bindingHash,requestHash,call,resultHash){
+    await recheckOwned();if(readSdk(op+':send'))fail();
+    operation=op;actualPromise=null;actualResult=null;settled=false;position='sdk-send';
+    const send=sdkSeal('SdkSend',{purpose:'afw.finite-owner-sdk-send.v1',rootHash:readSdk('root').recordHash,operation:op,originalRequestId:crypto.randomUUID(),originalRequestHash:requestHash,issuedAt:Date.now(),deadline:clock.end(),bindingHash});
+    await sdkAppend('SdkSend',send,op);await recheckOwned();check();
+    actualPromise=retain(Promise.resolve().then(()=>{check();return call();}));position='sdk-pending';
+    actualResult=await wait(actualPromise);settled=true;position='sdk-resolved';await recheckOwned();
+    const observed=sdkSeal('SdkObserved',{purpose:'afw.finite-owner-sdk-observed.v1',sendHash:send.recordHash,resultHash:resultHash(actualResult),observedAt:Date.now(),outcome:'resolved'});
+    await sdkAppend('SdkObserved',observed,op);position='sdk-observed';await recheckOwned();
+    const result=actualResult;actualPromise=null;actualResult=null;settled=false;operation=null;position='settled';return result;
+   }
+   const issuerAppend=async(kind,record,op=null)=>{
+    check();const call=kind==='Reservation'?issuer.appendReservation(record,activeChild):kind==='Send'?issuer.appendSend({preconnectionId:id,record},activeChild):issuer.appendAck({preconnectionId:id,operation:op,record},activeChild);
+    await fresh(call,record);
+    if(kind==='Reservation')expected.records.issuer.reservation=record;
+    else expected.records.issuer.operations[op][kind==='Send'?'send':'ack']=record;
+    updateAnchor();
+   };
+   async function issuerCall(op,window,call){
+    await recheckOwned();operation=op;position='issuer-send';actualPromise=null;actualResult=null;settled=false;
+    const reservation=expected.records.issuer.reservation,i=reservation.identity;
+    if(expected.records.issuer.operations[op].send)fail();
+    const send=issuerSeal('Send',{purpose:'afw.finite-preparation-issuer-send.v1',identityHash:i.identityHash,reservationHash:reservation.recordHash,operation:op,requestId:null,requestHash:digest('afw.finite-owner-issuer-request.v1',{identityHash:i.identityHash,operation:op}),issuedAt:Date.now(),deadline:window.deadline});
+    await issuerAppend('Send',send,op);await recheckOwned();check();
+    actualPromise=retain(Promise.resolve().then(()=>{check();return call();}));position='issuer-pending';
+    actualResult=await wait(actualPromise);settled=true;
+    const row=op==='consume'?actualResult:actualResult?.status==='applied'?actualResult.row:null;
+    if(!row)fail();
+    const rowName=({open_fence:'fence',authorization:'consent',consume:'consent',grant:'grant'})[op];if(!rowName)fail();
+    expected.issuerRows[rowName]=structuredClone(row);position='issuer-resolved';await recheckOwned();
+    const ack=issuerSeal('Ack',{purpose:'afw.finite-preparation-issuer-ack.v1',sendHash:send.recordHash,rowHash:digest('afw.finite-preparation-issuer-row.v1',row),outcome:'applied',observedAt:Date.now()});
+    await issuerAppend('Ack',ack,op);position='issuer-ack';await recheckOwned();
+    const result=op==='consume'?actualResult:row;actualPromise=null;actualResult=null;settled=false;operation=null;position='settled';return result;
+   }
+   async function localPreparation(kind,record,call,readBack,rowName,inventorySuffix=null){
+    await recheckOwned();const result=await wait(call());
+    if(result?.status!=='recorded'||result.recordHash!==prepHash(kind,record))fail();
+    const read=await wait(readBack());if(read?.status!=='observed'||prepEncode(kind,read.record)!==prepEncode(kind,record))fail();
+    expected.issuerRows[rowName]=structuredClone(record);
+    if(inventorySuffix){expected.records.inventory.push([inventoryPrefix+inventorySuffix,prepEncode(kind,record)]);expected.records.inventory.sort(([a],[b])=>a.localeCompare(b));}
+    updateAnchor();await recheckOwned();return result;
+   }
+   const withChild=async action=>clock.child(async(l,until)=>{activeChild=l;try{check();return await action(l,{startedAt:Date.now(),deadline:until});}finally{activeChild=null;}});
+   await recheckOwned();
+   if(grammar.method==='GET'){
+    if(readSdk('root')||expected.records.issuer.reservation)fail();
+    const parsed=authData(await wait(api.parseAuthRequest(original))),description=await wait(api.describeConsent(parsed));
+    await recheckOwned();
+    const root=sdkSeal('Root',{purpose:'afw.finite-owner-issuer-root.v1',preconnectionId:id,capsuleHash:capsule.capsuleHash,enrollmentHash:expected.installed.enrollment.recordHash,sourceRevision:source.sourceRevision,actorId:source.actorId,qaVersionId:source.qaVersionId,mVersionId:received.mVersionId,originalConnectionReceiptHash:expected.installed.receipt.receiptHash,I0:capsule.I0,C0:capsule.C0,C1:capsule.C1,createdAt:Date.now()});
+    await sdkAppend('Root',root);await recheckOwned();
+    const requestHash=authHash(parsed),transaction=await sdkCall('sdk_begin',requestHash,requestHash,()=>api.beginConsent(parsed),result=>{
+     if(typeof result?.handle!=='string'||!/^[-_A-Za-z0-9]{43}$/.test(result.handle)||!(result.headers instanceof Headers))fail();
+     return digest('afw.finite-owner-sdk-begin-result.v1',{authorizationHash:sha(result.handle),requestHash});
+    });
+    const authorizationHash=sha(transaction.handle),at=Date.now();
+    // Consent remains original C0/owner expiry; request lifetime controls mutations,
+    // not a new duration for the user's independently submitted POST.
+    const consentExpiry=new Date(Math.min(capsule.C0,prep.preconnection.expiresAt,identity.expiresAt,prep.preconnection.owner.accessExpiresAt)).toISOString();
+    const i=issuerSeal('Identity',{preconnectionId:id,enrollmentHash:expected.installed.enrollment.recordHash,capsuleHash:capsule.capsuleHash,sourceRevision:source.sourceRevision,qaVersionId:source.qaVersionId,actorId:source.actorId,subject:identity.subject,accessRealmHash:realm,projectId:source.project.projectId,projectRevision:source.project.revision,clientId:source.clientId,resource:source.resource,authorizationHash,grantId:crypto.randomUUID(),requestedScopes:parsed.scope,consentExpiresAt:consentExpiry,I0:capsule.I0,C0:capsule.C0,C1:capsule.C1,reservedAt:at});
+    await withChild(async(_l,w)=>{const r=issuerSeal('Reservation',{purpose:'afw.finite-preparation-issuer-reservation.v1',identity:i,requestHash,issuedAt:Date.now(),deadline:w.deadline});await issuerAppend('Reservation',r);await recheckOwned();});
+    await withChild((l,w)=>issuerCall('open_fence',w,()=>store.openFence({identity:i,window:w},l)));
+    await withChild((l,w)=>issuerCall('authorization',w,()=>store.insertAuthorization({identity:i,window:w},l)));
+    const link=finiteOwnerAuthorizationLink({preconnectionId:id,authorizationHash,subjectHash,sourceRevision:source.sourceRevision,projectRef:prep.ticket.projectRef,clientId:source.clientId,resource:source.resource,issuedAt:Date.now(),expiresAt:Math.min(prep.preconnection.expiresAt,Date.parse(consentExpiry))});
+    await withChild(l=>localPreparation('AuthorizationLink',link,()=>preparation.putAuthorizationLink(link,l),()=>preparation.readAuthorizationLink({authorizationHash},l),'authorization'));
+    await recheckOwned();
+    const escape=x=>String(x).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
+    if(typeof description.clientName!=='string'||description.clientName.length>1024)fail();
+    const html='<h1>Permitir lectura</h1><p>'+escape(description.clientName)+'</p><form method="post" action="/authorize"><input type="hidden" name="handle" value="'+escape(transaction.handle)+'"><input type="hidden" name="project" value="'+escape(source.project.projectId)+'"><input type="hidden" name="scope" value="afw:project:read">'+(parsed.scope.includes('afw:evidence:read')?'<label><input type="checkbox" name="scope" value="afw:evidence:read"> Compartir observaciones</label>':'')+'<button name="decision" value="approve">Permitir lectura</button></form>';
+    const out=new Headers(transaction.headers);out.set('Content-Type','text/html; charset=utf-8');out.set('Cache-Control','no-store');
+    if(Buffer.byteLength(html)>16384||[...out].some(([,v])=>v.length>8192))fail();check();return new Response(html,{headers:out});
+   }
+   const form=grammar.form,i=expected.records.issuer.reservation?.identity,root=readSdk('root');
+   if(!i||!root||!readSdk('sdk_begin:observed')||readSdk('sdk_approve:send')||!expected.issuerRows.authorization||!expected.issuerRows.consent||expected.issuerRows.consent.consumed_at!==''||expected.issuerRows.grant||sha(form.get('handle'))!==i.authorizationHash||form.has('project')&&form.get('project')!==i.projectId||form.getAll('scope').some(s=>!i.requestedScopes.includes(s)))fail();
+   clock.narrow(Date.parse(i.consentExpiresAt));
+   const scopes=form.getAll('scope');
+   const approved=await sdkCall('sdk_approve',i.authorizationHash,digest('afw.finite-owner-approved-form.v1',{authorizationHash:i.authorizationHash,scopes}),()=>api.approveConsent(original,form.get('handle'),{scope:scopes}),result=>{
+    const actual=authData(result.request);
+    if(canonical(actual.scope)!==canonical(scopes)||authHash({...actual,scope:i.requestedScopes})!==readSdk('sdk_begin:send').originalRequestHash||!(result.headers instanceof Headers))fail();
+    return authHash(actual);
+   });
+   const createdAt=new Date().toISOString(),expiresAt=new Date(Math.min(i.C0,Date.parse(i.consentExpiresAt),prep.preconnection.expiresAt,identity.expiresAt)).toISOString();
+   const grant=sdkSeal('ExpectedGrant',{purpose:'afw.finite-owner-expected-grant.v1',rootHash:root.recordHash,identityHash:i.identityHash,reservationHash:expected.records.issuer.reservation.recordHash,authorizationHash:i.authorizationHash,grantId:i.grantId,approvedRequestHash:authHash(approved.request),scopes,createdAt,expiresAt});
+   await sdkAppend('ExpectedGrant',grant);await recheckOwned();
+   await withChild(async(l,w)=>{
+    consumptionChild=l;consumptionStore=store;
+    consumption=await issuerCall('consume',w,()=>store.consumeAuthorization({identity:i,window:w,consumedAt:createdAt},l));
+    if(consumptionChild!==l||consumptionStore!==store||!consumption)fail();
+    await issuerCall('grant',w,()=>store.insertReadGrant({identity:i,window:w,consumption,grant:{scopes,createdAt,expiresAt}},l));
+    consumption=null;consumptionChild=null;consumptionStore=null;
+   });
+   const grantLink=finiteOwnerGrantLink({preconnectionId:id,authorizationHash:i.authorizationHash,grantId:i.grantId,grantHash:sha(i.grantId),acceptedAt:Date.now()});
+   await withChild(async l=>{
+    const linked=await localPreparation('GrantLink',grantLink,()=>preparation.putLink({kind:'grant',record:grantLink},l),()=>preparation.readLink({kind:'grant',preconnectionId:id},l),'grantLink','grant');
+    // Only this stack's genuinely new link ACK permits pair allocation.
+    if(linked.status!=='recorded'||expected.issuerRows.relation)fail();
+    const connectionRef=randomBytes(32).toString('hex'),linkedAt=Date.now();
+    const relation=finiteOwnerPreconnectionConnection({preconnectionId:id,connectionRef,grantHash:grantLink.grantHash,linkedAt});
+    const connection=finiteOwnerConnectionRef({connectionRef,subject:identity.subject,grantId:i.grantId,clientId:source.clientId,projectId:source.project.projectId,resource:source.resource,issuedAt:linkedAt,expiresAt:Math.min(prep.preconnection.expiresAt,prep.preconnection.owner.accessExpiresAt,identity.expiresAt,Date.parse(expiresAt))});
+    await recheckOwned();
+    const paired=await wait(preparation.putPreconnectionConnection({relation,connection},l));
+    if(paired?.status!=='recorded'||paired.recordHash!==prepHash('PreconnectionConnection',relation))fail();
+    const rr=await wait(preparation.readPreconnectionConnection({preconnectionId:id},l)),cr=await wait(preparation.readConnectionRef({connectionRef},l));
+    if(rr.status!=='observed'||cr.status!=='observed'||prepEncode('PreconnectionConnection',rr.record)!==prepEncode('PreconnectionConnection',relation)||prepEncode('ConnectionRef',cr.record)!==prepEncode('ConnectionRef',connection))fail();
+    qualifyFiniteOwnerConnectionPair({source,identity,pre:prep.preconnection,link:grantLink,grant:{grantId:i.grantId,expiresAt},relation:rr.record,connection:cr.record,observedAt:Date.now()});
+    expected.issuerRows.relation=structuredClone(relation);expected.issuerRows.connection=structuredClone(connection);
+    expected.records.inventory.push([inventoryPrefix+'connection',prepEncode('PreconnectionConnection',relation)]);expected.records.inventory.sort(([a],[b])=>a.localeCompare(b));updateAnchor();await recheckOwned();
+   });
+   const completed=await sdkCall('sdk_complete',grant.recordHash,grant.approvedRequestHash,()=>api.completeAuthorization({request:approved.request,userId:i.subject,scope:scopes,metadata:{},props:{applicationGrantId:i.grantId,userId:i.subject,projectId:i.projectId},revokeExistingGrants:false}),result=>{
+    if(typeof result?.redirectTo!=='string'||result.redirectTo.length>8192)fail();
+    const target=new URL(result.redirectTo),registered=new URL(approved.request.redirectUri);
+    if(target.origin!==registered.origin||target.pathname!==registered.pathname||!target.searchParams.get('code'))fail();
+    return digest('afw.finite-owner-sdk-complete-result.v1',{redirectHash:sha(result.redirectTo)});
+   });
+   await recheckOwned();const out=new Headers(approved.headers);out.set('Location',completed.redirectTo);out.set('Cache-Control','no-store');
+   if([...out].some(([,v])=>v.length>8192))fail();check();return new Response(null,{status:302,headers:out});
+  }));
+ }catch{return pending();}finally{if(onAbort)originalLease.signal.removeEventListener('abort',onAbort);clock?.close();}
+}
+
+/** UNMOUNTED fixed GET. Only this invocation can retain its own SQL result. */
+export async function handlePrivateQaFiniteOwnerNoticeGet({request,env,ctx},originalLease){
+ let clock,onAbort;
+ try{
+  if(arguments.length!==2)fail();fields(arguments[0],['request','env','ctx']);if(!(request instanceof Request))fail();
+  if(readFiniteOwnerRequestContext(originalLease).root!==originalLease)fail();
+  return await observeFiniteOwnerRequestWork({ctx,env,originalLease},()=>finiteNativeOperation(originalLease,ctx,async firstFailure=>{
+   const received=readFiniteOwnerNoticeGetMetadata(request.headers);
+   const issuerCapture=captureFinitePreparationIssuerContext({ctx,env});
+   const alias=env.AFW_FINITE_OWNER_OAUTH_KV,methods={get:alias?.get,put:alias?.put,delete:alias?.delete,list:alias?.list};
+   const db=env.RELEASE_DB,dbPrepare=db?.prepare,node=env.AFW_RELEASE_EVENTS_NODE,nodeMethods={idFromName:node?.idFromName,idFromString:node?.idFromString,get:node?.get};
+   const self=env.AFW_INDEPENDENT_CLOSURE,selfGet=self?.get,metadata=env.AFW_QA_VERSION,reader=env.AFW_MCP_CLOSURE_READ_TOKEN,publisher=env.AFW_MCP_CLOSURE_PUBLISH_TOKEN,fetcher=globalThis.fetch;
+   const headers=request.headers,signal=request.signal,url=request.url,method=request.method,headerBytes=canonical([...headers]);
+   if([...Object.values(methods),...Object.values(nodeMethods),dbPrepare,selfGet].some(v=>typeof v!=='function'))fail();
+   let identity=null,activeChild=null;
+   const holders=()=>{
+    current(originalLease);issuerCapture.holders();
+    if(env.AFW_FINITE_OWNER_OAUTH_KV!==alias||Object.keys(methods).some(k=>alias[k]!==methods[k])||env.RELEASE_DB!==db||db.prepare!==dbPrepare||env.AFW_RELEASE_EVENTS_NODE!==node||Object.keys(nodeMethods).some(k=>node[k]!==nodeMethods[k])||env.AFW_INDEPENDENT_CLOSURE!==self||self.get!==selfGet||env.AFW_QA_VERSION!==metadata||env.AFW_MCP_CLOSURE_READ_TOKEN!==reader||env.AFW_MCP_CLOSURE_PUBLISH_TOKEN!==publisher||globalThis.fetch!==fetcher||request.headers!==headers||request.signal!==signal||request.url!==url||request.method!==method||canonical([...headers])!==headerBytes)fail();
+    if(identity&&Date.now()>=identity.expiresAt)fail();
+   };
+   clock=createFiniteInitialLease(readFiniteOwnerRequestDeadline(originalLease),readFiniteOwnerRequestDeadline(originalLease),holders,fail);
+   onAbort=()=>clock.close();originalLease.signal.addEventListener('abort',onAbort,{once:true});
+   const check=()=>{current(clock.lease);if(activeChild)current(activeChild);};
+   const wait=async promise=>{check();const result=await clock.wait(retain(promise),activeChild??clock.lease);check();return result;};
+   const bytes=await wait(finiteNativeBytes(request,check,firstFailure));check();
+   const original=new Request(received.url,{method:received.method,headers,body:bytes.length?bytes:undefined,signal:originalLease.signal});
+   qualifyFiniteOwnerNoticeGetRequest(original,bytes);
+   const baseline=await wait(observeOwnerPhasePair({ctx,env,parent:originalLease})),context=qualifySettledOwnerPair(baseline);
+   if(context.source.phase!=='read_consent'||received.mVersionId!==context.source.currentPublication.versionId||!baseline.second.noticeRows.schema)fail();
+   const expected=structuredClone(baseline.second),source=context.source,id=context.preconnectionId;
+   const capsule=expected.anchor.anchors.capsule,prep=expected.preparation;
+   clock.narrow(Math.min(capsule.C0,prep.preconnection.expiresAt,prep.preconnection.owner.accessExpiresAt,prep.approval.expiresAt));
+   const verified=await wait(verifyCloudflareAccessJwtWithExpiry({token:original.headers.get('Cf-Access-Jwt-Assertion'),teamDomain:source.access.teamDomain,audience:source.access.audience}));
+   if(!verified.ok)fail();identity=verified.identity;clock.narrow(identity.expiresAt);
+   const rawCookies=(original.headers.get('Cookie')??'').split(';').map(s=>s.trim()),cookie=rawCookies.filter(s=>s.startsWith('__Host-afw-finite-prepare='));
+   if(cookie.length!==1||!/^__Host-afw-finite-prepare=[a-f0-9]{64}$/.test(cookie[0])||sha(cookie[0].slice('__Host-afw-finite-prepare='.length))!==prep.ticket.ticketHash)fail();
+   const realm=evidence('realm',{...source.access,origin:source.origin}),subjectHash=evidence('subject',{accessRealmHash:realm,subject:identity.subject});
+   qualifyFiniteOwnerApprovedTicket({source,identity,currentTicket:prep.ticket,ticket:prep.ticket,use:prep.ticketUse,pre:prep.preconnection,approval:prep.approval,snapshot:prep.sourceSnapshot,realm,subjectHash,observedAt:Date.now()});
+   if(identity.subject!==expected.anchor.anchors.material.ownerSelection.subject||identity.subject!==expected.records.issuer.reservation?.identity.subject)fail();
+   const issuer=expected.records.issuer,rows=expected.issuerRows,i=issuer.reservation?.identity;
+   if(!i||!rows.grant||!rows.authorization||!rows.grantLink||!rows.relation||!rows.connection||issuer.operations.grant.ack?.outcome!=='applied')fail();
+   const sdkPrefix='afw.finite-owner-issuer-provenance.v1:'+id+':';
+   const sdkNames=new Set(expected.records.sdk.map(([key])=>key));
+   if(!['root','grant','sdk_begin:observed','sdk_approve:observed','sdk_complete:observed'].every(k=>sdkNames.has(sdkPrefix+k)))fail();
+   if(rawCookies.some(v=>v.startsWith('__Host-afw-monitoring-owner=')))fail();
+   const accessExpiresAt=Math.min(identity.expiresAt,prep.preconnection.owner.accessExpiresAt,i.C0),preconnectionExpiresAt=prep.preconnection.expiresAt;
+   const permissionCeiling=Math.min(accessExpiresAt,preconnectionExpiresAt,prep.approval.expiresAt,rows.connection.expiresAt,i.C0,Date.parse(i.consentExpiresAt),Date.parse(rows.grant.expires_at));
+   clock.narrow(permissionCeiling);
+   const at=Date.now(),handle=randomBytes(32).toString('base64url'),expiresAt=Math.min(at+600000,permissionCeiling);
+   if(expiresAt<=at)fail();
+   const ticket={handleHash:sha(handle),requestId:crypto.randomUUID(),expectedSequence:0,issuedAt:at,expiresAt,permissionExpiresAt:expiresAt};
+   const expectedGrant={scopes:JSON.parse(rows.grant.scopes_json),createdAt:rows.grant.created_at,expiresAt:rows.grant.expires_at},consumedAt=rows.consent.consumed_at;
+   const journal=noticeJournal({ctx,env}),store=createFinitePreparationIssuerStore({ctx,env});
+   let position='baseline',operation=null,actualPromise=null,actualResult=null,settled=false,ownedReservation=null,ownedSend=null;
+   const anchor=()=>{expected.anchor.notice=structuredClone(expected.records.notice);};
+   async function recheckNoticeGetOwned(){
+    check();
+    if(actualPromise&&!settled)fail();
+    for(const v of Object.values(expected.records.issuer.operations))if(v.send&&!v.ack||v.ack&&!v.send)fail();
+    const names=new Set(expected.records.sdk.map(([key])=>key));
+    for(const [key]of expected.records.sdk)if(key.endsWith(':send')&&!names.has(key.slice(0,-4)+'observed'))fail();
+    const n=expected.records.notice;
+    if(n.freeze||n.operations.consent.send||n.operations.consent.ack)fail();
+    if(position==='baseline'){requireEmptyNotice(expected);if(ownedReservation||ownedSend||operation)fail();}
+    else{
+     if(!ownedReservation||canonical(n.reservation)!==canonical(ownedReservation))fail();
+     if(position!=='reservation-recorded'){
+      if(operation!=='ticket'||!ownedSend||canonical(n.operations.ticket.send)!==canonical(ownedSend)||ownedSend.reservationHash!==ownedReservation.recordHash)fail();
+      if(['ticket-sql-resolved','ticket-ack-recorded'].includes(position)&&(!actualPromise||!settled||actualResult?.status!=='applied'||canonical(actualResult.row)!==canonical(expectedNoticeTicket(i,ticket))))fail();
+     }
+    }
+    const pair=await wait(observeOwnerPhasePair({ctx,env,parent:originalLease,preconnectionId:id}));
+    if(canonical(pair.first)!==canonical(expected)||canonical(pair.second)!==canonical(expected))fail();
+    check();
+   }
+   await recheckNoticeGetOwned();
+   await clock.child((l)=>retain((async()=>{
+    activeChild=l;check();
+    const record=noticeSeal('Reservation',{purpose:'afw.finite-preparation-notice-reservation.v1',identity:i,issuerReservationHash:issuer.reservation.recordHash,originalGrantAckHash:issuer.operations.grant.ack.recordHash,grantLinkHash:prepHash('GrantLink',rows.grantLink),connectionHash:prepHash('ConnectionRef',rows.connection),expectedGrant,consumedAt,accessExpiresAt,preconnectionExpiresAt,ticket,issuedAt:Date.now()});
+    const appendPromise=retain(journal.appendReservation(record,l)),appendResult=await wait(appendPromise);
+    if(appendResult?.status!=='recorded'||appendResult.recordHash!==record.recordHash)fail();
+    ownedReservation=record;expected.records.notice.reservation=structuredClone(record);anchor();position='reservation-recorded';
+    await recheckNoticeGetOwned();activeChild=null;
+   })()));
+   await clock.child((l,deadline)=>retain((async()=>{
+    activeChild=l;check();
+    const window={startedAt:Date.now(),deadline:Math.min(deadline,permissionCeiling)};
+    const common={identity:i,expectedGrant,consumedAt,accessExpiresAt,preconnectionExpiresAt,window};
+    const send=noticeSeal('Send',{purpose:'afw.finite-preparation-notice-send.v1',identityHash:i.identityHash,reservationHash:ownedReservation.recordHash,operation:'ticket',requestHash:digest('afw.finite-preparation-notice-request.v1',{operation:'ticket',common,ticket,decisionHash:null}),accessExpiresAt,window,issuedAt:Date.now(),decisionHash:null});
+    const appendSendPromise=retain(journal.appendSend({preconnectionId:id,record:send},l)),appendSendResult=await wait(appendSendPromise);
+    if(appendSendResult?.status!=='recorded'||appendSendResult.recordHash!==send.recordHash)fail();
+    ownedSend=send;operation='ticket';expected.records.notice.operations.ticket.send=structuredClone(send);anchor();position='ticket-send-recorded';await recheckNoticeGetOwned();check();
+    position='ticket-sql-pending';settled=false;
+    actualPromise=retain(store.insertMonitoringTicket({...common,ticket},l));
+    actualResult=await wait(actualPromise);settled=true;
+    if(actualResult?.status!=='applied'||canonical(actualResult.row)!==canonical(expectedNoticeTicket(i,ticket)))fail();
+    expected.noticeRows.tickets=[structuredClone(actualResult.row)];position='ticket-sql-resolved';await recheckNoticeGetOwned();check();
+    const ack=noticeSeal('Ack',{purpose:'afw.finite-preparation-notice-ack.v1',sendHash:ownedSend.recordHash,outcome:'applied',rowHash:digest('afw.finite-preparation-notice-row.v1',actualResult.row),sequence:null,observedAt:Date.now()});
+    const appendAckPromise=retain(journal.appendAck({preconnectionId:id,operation:'ticket',record:ack},l)),appendAckResult=await wait(appendAckPromise);
+    if(appendAckResult?.status!=='recorded'||appendAckResult.recordHash!==ack.recordHash)fail();
+    expected.records.notice.operations.ticket.ack=structuredClone(ack);anchor();position='ticket-ack-recorded';await recheckNoticeGetOwned();activeChild=null;
+   })()));
+   check();
+   const maxAge=Math.floor((ticket.expiresAt-Date.now())/1000);if(maxAge<1)fail();
+   const escaped=handle.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])),nonce=randomBytes(18).toString('base64url');
+   const html='<!doctype html><html lang="es"><meta charset="utf-8"><title>Preparación de avisos</title><body><h1>Preparación de avisos</h1><p>Podés registrar un permiso temporal para avisos sobre este expediente. No cambia datos ni publica. El permiso vence en la fecha indicada. Registrar el permiso no confirma una suscripción, entrega ni revisión del asistente.</p><p>El permiso vence: '+new Date(ticket.permissionExpiresAt).toISOString()+'</p><form method="post" action="/monitoring/grant"><input type="hidden" name="handle" value="'+escaped+'"><button type="submit">Permitir avisos temporales</button></form><a href="https://agentfriendlyweb.dev/expediente">Volver al expediente</a></body></html>';
+   check();return new Response(html,{status:200,headers:{'Content-Type':'text/html; charset=UTF-8','Cache-Control':'no-store','Referrer-Policy':'same-origin','X-Content-Type-Options':'nosniff','Content-Security-Policy':"default-src 'none'; script-src 'nonce-"+nonce+"'; frame-ancestors 'none'; base-uri 'none'; form-action 'self'",'Set-Cookie':'__Host-afw-monitoring-owner='+handle+'; Path=/; Secure; HttpOnly; SameSite=Strict; Max-Age='+maxAge}});
+  }));
+ }catch{return pending();}finally{if(onAbort)originalLease.signal.removeEventListener('abort',onAbort);clock?.close();}
+}
+
+/** UNMOUNTED fixed human POST. Native SQL continuation never leaves this stack. */
+export async function handlePrivateQaFiniteOwnerNoticeConsent({request,env,ctx},originalLease){
+ let clock,onAbort;
+ try{
+  if(arguments.length!==2)fail();fields(arguments[0],['request','env','ctx']);if(!(request instanceof Request))fail();
+  if(readFiniteOwnerRequestContext(originalLease).root!==originalLease)fail();
+  return await observeFiniteOwnerRequestWork({ctx,env,originalLease},()=>finiteNativeOperation(originalLease,ctx,async signalFailure=>{
+   let failed=false;const firstFailure=error=>{failed=true;signalFailure(error);};
+   const received=readFiniteOwnerNoticeConsentMetadata(request.headers);
+   const issuerCapture=captureFinitePreparationIssuerContext({ctx,env});
+   const alias=env.AFW_FINITE_OWNER_OAUTH_KV,methods={get:alias?.get,put:alias?.put,delete:alias?.delete,list:alias?.list};
+   const db=env.RELEASE_DB,dbPrepare=db?.prepare,node=env.AFW_RELEASE_EVENTS_NODE,nodeMethods={idFromName:node?.idFromName,idFromString:node?.idFromString,get:node?.get};
+   const self=env.AFW_INDEPENDENT_CLOSURE,selfGet=self?.get,metadata=env.AFW_QA_VERSION,reader=env.AFW_MCP_CLOSURE_READ_TOKEN,publisher=env.AFW_MCP_CLOSURE_PUBLISH_TOKEN,fetcher=globalThis.fetch;
+   const headers=request.headers,signal=request.signal,url=request.url,method=request.method,headerBytes=canonical([...headers]);
+   if([...Object.values(methods),...Object.values(nodeMethods),dbPrepare,selfGet].some(v=>typeof v!=='function'))fail();
+   let identity=null,activeChild=null;
+   const holders=()=>{
+    current(originalLease);issuerCapture.holders();
+    if(env.AFW_FINITE_OWNER_OAUTH_KV!==alias||Object.keys(methods).some(k=>alias[k]!==methods[k])||env.RELEASE_DB!==db||db.prepare!==dbPrepare||env.AFW_RELEASE_EVENTS_NODE!==node||Object.keys(nodeMethods).some(k=>node[k]!==nodeMethods[k])||env.AFW_INDEPENDENT_CLOSURE!==self||self.get!==selfGet||env.AFW_QA_VERSION!==metadata||env.AFW_MCP_CLOSURE_READ_TOKEN!==reader||env.AFW_MCP_CLOSURE_PUBLISH_TOKEN!==publisher||globalThis.fetch!==fetcher||request.headers!==headers||request.signal!==signal||request.url!==url||request.method!==method||canonical([...headers])!==headerBytes)fail();
+    if(identity&&Date.now()>=identity.expiresAt)fail();
+   };
+   clock=createFiniteInitialLease(readFiniteOwnerRequestDeadline(originalLease),readFiniteOwnerRequestDeadline(originalLease),holders,fail);
+   onAbort=()=>clock.close();originalLease.signal.addEventListener('abort',onAbort,{once:true});
+   const check=()=>{if(failed)fail();try{current(clock.lease);if(activeChild)current(activeChild);}catch(error){failed=true;throw error;}};
+   const wait=async promise=>{try{check();const result=await clock.wait(retain(promise),activeChild??clock.lease);check();return result;}catch(error){failed=true;throw error;}};
+   const bytes=await wait(readFiniteOwnerNoticeConsentBody(request,check,firstFailure));check();
+   const original=new Request(received.url,{method:received.method,headers,body:bytes.length?bytes:undefined,signal:originalLease.signal});
+   const input=qualifyFiniteOwnerNoticeConsentRequest(original,bytes);
+   const baseline=await wait(observeOwnerPhasePair({ctx,env,parent:originalLease})),context=qualifyNoticeConsentBaseline(baseline);
+   if(context.source.phase!=='read_consent'||received.mVersionId!==context.source.currentPublication.versionId||!baseline.second.noticeRows.schema)fail();
+   const expected=structuredClone(baseline.second),source=context.source,id=context.preconnectionId;
+   const capsule=expected.anchor.anchors.capsule,prep=expected.preparation;
+   clock.narrow(Math.min(capsule.C0,prep.preconnection.expiresAt,prep.preconnection.owner.accessExpiresAt,prep.approval.expiresAt));
+   const verified=await wait(verifyCloudflareAccessJwtWithExpiry({token:original.headers.get('Cf-Access-Jwt-Assertion'),teamDomain:source.access.teamDomain,audience:source.access.audience}));
+   if(!verified.ok)fail();identity=verified.identity;clock.narrow(identity.expiresAt);
+   const rawCookies=(original.headers.get('Cookie')??'').split(';').map(s=>s.trim()),cookie=rawCookies.filter(s=>s.startsWith('__Host-afw-finite-prepare='));
+   if(cookie.length!==1||!/^__Host-afw-finite-prepare=[a-f0-9]{64}$/.test(cookie[0])||sha(cookie[0].slice('__Host-afw-finite-prepare='.length))!==prep.ticket.ticketHash)fail();
+   const realm=evidence('realm',{...source.access,origin:source.origin}),subjectHash=evidence('subject',{accessRealmHash:realm,subject:identity.subject});
+   qualifyFiniteOwnerApprovedTicket({source,identity,currentTicket:prep.ticket,ticket:prep.ticket,use:prep.ticketUse,pre:prep.preconnection,approval:prep.approval,snapshot:prep.sourceSnapshot,realm,subjectHash,observedAt:Date.now()});
+   if(identity.subject!==expected.anchor.anchors.material.ownerSelection.subject||identity.subject!==expected.records.issuer.reservation?.identity.subject)fail();
+   const issuer=expected.records.issuer,rows=expected.issuerRows,i=issuer.reservation?.identity;
+   if(!i||!rows.grant||!rows.authorization||!rows.grantLink||!rows.relation||!rows.connection||issuer.operations.grant.ack?.outcome!=='applied')fail();
+   const sdkPrefix='afw.finite-owner-issuer-provenance.v1:'+id+':';
+   const sdkNames=new Set(expected.records.sdk.map(([key])=>key));
+   if(!['root','grant','sdk_begin:observed','sdk_approve:observed','sdk_complete:observed'].every(k=>sdkNames.has(sdkPrefix+k)))fail();
+   if(identity.subject!==rows.connection.subject)fail();
+   const reservation=expected.records.notice.reservation,ticket=reservation.ticket;
+   const monitoring=rawCookies.filter(v=>v.startsWith('__Host-afw-monitoring-owner='));
+   if(monitoring.length!==1||!/^__Host-afw-monitoring-owner=[A-Za-z0-9_-]{43}$/.test(monitoring[0])||sha(monitoring[0].slice('__Host-afw-monitoring-owner='.length))!==ticket.handleHash||sha(input.handle)!==ticket.handleHash)fail();
+   const accessExpiresAt=Math.min(reservation.accessExpiresAt,prep.preconnection.owner.accessExpiresAt,identity.expiresAt,i.C0);
+   if(ticket.expiresAt>accessExpiresAt)fail();
+   const permissionCeiling=Math.min(accessExpiresAt,reservation.preconnectionExpiresAt,prep.approval.expiresAt,rows.connection.expiresAt,i.C0,Date.parse(i.consentExpiresAt),Date.parse(rows.grant.expires_at),ticket.permissionExpiresAt);
+   clock.narrow(permissionCeiling);
+   const journal=noticeJournal({ctx,env}),store=createFinitePreparationIssuerStore({ctx,env}),preparationStore=createFiniteOwnerPreparationStore({storage:issuerCapture.storage,now:Date.now});
+   let position='baseline',witness=null,ownSend=null,ownAck=null,actualSqlPromise=null,actualSqlResult=null,sqlSettled=false;
+   let ownedNoticeLink=null,linkPromise=null,linkResult=null,linkSyncPromise=null,linkReadPromise=null,linkReadResult=null,linkSynced=false,linkSettled=false;
+   const anchor=()=>{expected.anchor.notice=structuredClone(expected.records.notice);};
+   async function recheckConsentOwned(){
+    check();
+    if(!['baseline','ticket-observed','consent-send-recorded','consent-sql-resolved','consent-ack-recorded','notice-link-recorded'].includes(position)||actualSqlPromise&&!sqlSettled)fail();
+    for(const v of Object.values(expected.records.issuer.operations))if(v.send&&!v.ack||v.ack&&!v.send)fail();
+    const names=new Set(expected.records.sdk.map(([key])=>key));
+    for(const [key]of expected.records.sdk)if(key.endsWith(':send')&&!names.has(key.slice(0,-4)+'observed'))fail();
+    const n=expected.records.notice;
+    if(n.freeze||canonical(n.reservation)!==canonical(reservation)||n.operations.ticket.ack?.outcome!=='applied')fail();
+    if(position==='baseline'||position==='ticket-observed'){
+     if(ownSend||ownAck||actualSqlPromise||n.operations.consent.send||n.operations.consent.ack||expected.noticeRows.events.length||expected.preparation.noticeLink)fail();
+    }else{
+     if(!witness||!ownSend||canonical(n.operations.consent.send)!==canonical(ownSend))fail();
+     if(position==='consent-send-recorded'&&(actualSqlPromise||expected.noticeRows.events.length||n.operations.consent.ack))fail();
+     if(['consent-sql-resolved','consent-ack-recorded','notice-link-recorded'].includes(position)){
+      if(!actualSqlPromise||!sqlSettled||actualSqlResult?.status!=='applied'||canonical(expected.noticeRows.events)!==canonical([actualSqlResult.row]))fail();
+      qualifyNoticeConsentEvent(actualSqlResult.row,i,ticket,ownSend);
+     }
+     if(['consent-ack-recorded','notice-link-recorded'].includes(position)){
+      if(!ownAck||ownAck.sendHash!==ownSend.recordHash||ownAck.rowHash!==digest('afw.finite-preparation-notice-row.v1',actualSqlResult.row)||ownAck.sequence!==actualSqlResult.row.sequence||canonical(ownAck)!==canonical(n.operations.consent.ack))fail();
+     }else if(ownAck||n.operations.consent.ack)fail();
+     if(position==='notice-link-recorded'){
+      if(!ownedNoticeLink||!linkPromise||linkResult?.status!=='recorded'||linkResult.recordHash!==prepHash('NoticeLink',ownedNoticeLink)||!linkSyncPromise||!linkSynced||!linkReadPromise||linkReadResult?.status!=='observed'||!linkSettled||prepEncode('NoticeLink',linkReadResult.record)!==prepEncode('NoticeLink',ownedNoticeLink)||canonical(expected.preparation.noticeLink)!==canonical(ownedNoticeLink))fail();
+     }else if(expected.preparation.noticeLink||ownedNoticeLink||linkPromise)fail();
+    }
+    const pair=await wait(observeOwnerPhasePair({ctx,env,parent:originalLease,preconnectionId:id}));
+    if(canonical(pair.first)!==canonical(expected)||canonical(pair.second)!==canonical(expected))fail();
+    check();
+   }
+   await recheckConsentOwned();
+   await clock.child((l,deadline)=>retain((async()=>{
+    activeChild=l;check();
+    const window={startedAt:Date.now(),deadline:Math.min(deadline,permissionCeiling)};
+    const common={identity:reservation.identity,expectedGrant:reservation.expectedGrant,consumedAt:reservation.consumedAt,accessExpiresAt,preconnectionExpiresAt:reservation.preconnectionExpiresAt,window};
+    witness=await wait(store.observeMonitoringTicket({...common,ticket},l));
+    if(witness?.status!=='observed'||canonical(witness.row)!==canonical(expected.noticeRows.tickets[0]))fail();
+    position='ticket-observed';await recheckConsentOwned();check();
+    const again=await wait(verifyCloudflareAccessJwtWithExpiry({token:original.headers.get('Cf-Access-Jwt-Assertion'),teamDomain:source.access.teamDomain,audience:source.access.audience}));
+    if(!again.ok||again.identity.subject!==identity.subject||again.identity.expiresAt!==identity.expiresAt)fail();
+    check();const issuedAt=Date.now(),decisionHash=digest('afw.finite-preparation-notice-decision.v1',{identityHash:i.identityHash,ticketRequestId:ticket.requestId,handleHash:ticket.handleHash,method:'POST',path:'/monitoring/grant',action:'grant',issuedAt});
+    const send=noticeSeal('Send',{purpose:'afw.finite-preparation-notice-send.v1',identityHash:i.identityHash,reservationHash:reservation.recordHash,operation:'consent',requestHash:digest('afw.finite-preparation-notice-request.v1',{operation:'consent',common,ticket,decisionHash}),accessExpiresAt,window,issuedAt,decisionHash});
+    const appendSendPromise=retain(journal.appendSend({preconnectionId:id,record:send},l)),appendSendResult=await wait(appendSendPromise);
+    if(appendSendResult?.status!=='recorded'||appendSendResult.recordHash!==send.recordHash)fail();
+    ownSend=send;expected.records.notice.operations.consent.send=structuredClone(send);anchor();position='consent-send-recorded';
+    await recheckConsentOwned();check();
+    position='consent-sql-pending';sqlSettled=false;
+    actualSqlPromise=retain(store.insertMonitoringConsent({...common,ticketWitness:witness},l));
+    actualSqlResult=await wait(actualSqlPromise);sqlSettled=true;
+    if(actualSqlResult?.status!=='applied')fail();qualifyNoticeConsentEvent(actualSqlResult.row,i,ticket,ownSend);
+    expected.noticeRows.events=[structuredClone(actualSqlResult.row)];position='consent-sql-resolved';await recheckConsentOwned();check();
+    const ack=noticeSeal('Ack',{purpose:'afw.finite-preparation-notice-ack.v1',sendHash:ownSend.recordHash,outcome:'applied',rowHash:digest('afw.finite-preparation-notice-row.v1',actualSqlResult.row),sequence:actualSqlResult.row.sequence,observedAt:Date.now()});
+    const appendAckPromise=retain(journal.appendAck({preconnectionId:id,operation:'consent',record:ack},l)),appendAckResult=await wait(appendAckPromise);
+    if(appendAckResult?.status!=='recorded'||appendAckResult.recordHash!==ack.recordHash)fail();
+    ownAck=ack;expected.records.notice.operations.consent.ack=structuredClone(ack);anchor();position='consent-ack-recorded';await recheckConsentOwned();
+    check();
+    if(!actualSqlPromise||!sqlSettled||actualSqlResult?.status!=='applied'||!ownSend||!ownAck||expected.preparation.noticeLink||expected.records.inventory.some(([key])=>key==='connection-preparation:'+id+':notice'))fail();
+    const acceptedAt=Date.now();
+    if(acceptedAt<Math.max(ownAck.observedAt,actualSqlResult.row.issued_at,rows.grantLink.acceptedAt)||acceptedAt>=Math.min(window.deadline,permissionCeiling,ticket.expiresAt))fail();
+    ownedNoticeLink={preconnectionId:id,grantHash:rows.grantLink.grantHash,eventHash:noticeEventHash(actualSqlResult.row),sequence:actualSqlResult.row.sequence,acceptedAt};
+    const linkRaw=prepEncode('NoticeLink',ownedNoticeLink),linkHash=prepHash('NoticeLink',ownedNoticeLink);
+    position='notice-link-pending';linkSettled=false;
+    linkPromise=retain(preparationStore.putLink({kind:'notice',record:ownedNoticeLink},l));linkResult=await wait(linkPromise);
+    if(linkResult?.status!=='recorded'||linkResult.recordHash!==linkHash)fail();
+    check();linkSyncPromise=retain(Reflect.apply(issuerCapture.sync,issuerCapture.storage,[]));await wait(linkSyncPromise);linkSynced=true;
+    check();linkReadPromise=retain(preparationStore.readLink({kind:'notice',preconnectionId:id},l));linkReadResult=await wait(linkReadPromise);
+    if(linkReadResult?.status!=='observed'||prepEncode('NoticeLink',linkReadResult.record)!==linkRaw||prepHash('NoticeLink',linkReadResult.record)!==linkHash)fail();
+    check();linkSettled=true;
+    expected.preparation.noticeLink=structuredClone(ownedNoticeLink);
+    const key='connection-preparation:'+id+':notice',at=expected.records.inventory.findIndex(([entry])=>entry>key);
+    expected.records.inventory.splice(at<0?expected.records.inventory.length:at,0,[key,linkRaw]);expected.anchor.inventory=structuredClone(expected.records.inventory);
+    position='notice-link-recorded';await recheckConsentOwned();check();activeChild=null;
+   })()));
+   check();
+   const html='<!doctype html><html lang="es"><meta charset="utf-8"><title>Decisión temporal</title><body><h1>Registré tu decisión temporal.</h1><p>Esto no confirma que exista una suscripción ni que el asistente haya revisado el expediente.</p><p>El permiso vence: '+new Date(ticket.permissionExpiresAt).toISOString()+'</p><a href="https://agentfriendlyweb.dev/expediente">Volver al expediente</a></body></html>';
+   check();return new Response(html,{status:200,headers:{'Content-Type':'text/html; charset=UTF-8','Cache-Control':'no-store','Referrer-Policy':'same-origin','X-Content-Type-Options':'nosniff','Content-Security-Policy':"default-src 'none'; frame-ancestors 'none'; base-uri 'none'; form-action 'none'",'Set-Cookie':'__Host-afw-monitoring-owner=; Path=/; Secure; HttpOnly; SameSite=Strict; Max-Age=0'}});
+  }));
+ }catch{return pending();}finally{if(onAbort)originalLease.signal.removeEventListener('abort',onAbort);clock?.close();}
+}

~~~~~~~~~~

## lib/mcp-qa-finite-owner-preparation-qa.mjs

~~~~~~~~~~diff
diff --git a/lib/mcp-qa-finite-owner-preparation-qa.mjs b/lib/mcp-qa-finite-owner-preparation-qa.mjs
--- /dev/null
+++ b/lib/mcp-qa-finite-owner-preparation-qa.mjs
@@ -0,0 +1,7 @@
+import {continuePrivateQaFiniteOwnerChoice} from './mcp-qa-finite-owner-preparation.mjs';
+import {readPrivateQaFiniteOwnerContext} from './mcp-qa-finite-owner-phase-context.mjs';
+/** QA-only lexical factual reader. No factory, caller DTO or serialized callback. */
+export function preparePrivateQaFiniteOwnerChoice({ctx,env,request},originalLease){
+ const readOwnedContext=(parent,preconnectionId)=>readPrivateQaFiniteOwnerContext({ctx,env,parent,...preconnectionId===null?{}:{preconnectionId}});
+ return continuePrivateQaFiniteOwnerChoice({ctx,env,request},originalLease,readOwnedContext);
+}

~~~~~~~~~~

## lib/mcp-qa-finite-owner-preparation.mjs

~~~~~~~~~~diff
diff --git a/lib/mcp-qa-finite-owner-preparation.mjs b/lib/mcp-qa-finite-owner-preparation.mjs
--- /dev/null
+++ b/lib/mcp-qa-finite-owner-preparation.mjs
@@ -0,0 +1,476 @@
+import {qualifyFiniteOwnerApprovedTicket,finiteOwnerAuthorizationLink,finiteOwnerGrantLink,finiteOwnerPreconnectionConnection,finiteOwnerConnectionRef,qualifyFiniteOwnerConnectionPair} from './mcp-qa-finite-owner-approved-ticket-facts.mjs';
+import {qualifyFiniteOwnerInstalledStage} from './mcp-qa-finite-owner-stage-facts.mjs';
+import {readPrivateQaFinitePolicySource} from './mcp-qa-finite-policy-setup-source.mjs';
+import {readFiniteMaterialSeed} from './mcp-qa-finite-seed-http.mjs';
+import {narrowFinitePolicySetupClock} from './mcp-qa-finite-policy-setup.mjs';
+import {finiteFields as setupFields} from './mcp-finite-evidence.mjs';
+import {retainFiniteOwnerStagePromise} from './mcp-qa-finite-stage-work.mjs';
+import {createHash,randomBytes} from 'node:crypto';
+import {verifyCloudflareAccessJwtWithExpiry} from './cloudflare-access-identity.mjs';
+import {createDelegatedOAuthStore} from './delegated-oauth-store.mjs';
+import {createDelegatedProjectRepository} from './delegated-project-repository.mjs';
+import {createFinitePolicyEffectJournal} from './mcp-qa-finite-policy-journal.mjs';
+import {hashFiniteOwnerPreparationAudit as audit} from './mcp-qa-finite-preparation-records.mjs';
+import {createFiniteOwnerPreparationStore} from './mcp-qa-finite-preparation-store.mjs';
+import {validateFiniteOwnerSource,hashFiniteOwnerEvidence as evidence,hashFiniteOwnerPreparationProject as projectHash,hashFinitePreparationRecord as hash,encodeFinitePreparationRecord as encode} from './mcp-qa-finite-preparation-records.mjs';
+import {readPrivateQaFiniteOwnerSource} from './mcp-qa-finite-owner-source.mjs';
+const sha=value=>createHash('sha256').update(value).digest('hex');
+const opaque=()=>randomBytes(32).toString('hex');
+const hex=x=>typeof x==='string'&&/^[a-f0-9]{64}$/.test(x);
+const cookieName='__Host-afw-finite-prepare';
+const canonical=v=>JSON.stringify(v);
+const fail=(status=503)=>{const e=Error('Finite owner preparation unavailable');e.status=status;throw e;};
+const current=lease=>{if(!lease||lease.signal?.aborted||typeof lease.assertCurrent!=='function')fail();lease.assertCurrent();};
+const seals=(kind,v,key)=>({...v,[key]:hash(kind,v)});
+const stageAdmissions=new WeakMap();
+const requestContexts=new WeakMap();
+export function readFiniteOwnerRequestContext(lease){
+ current(lease);const context=requestContexts.get(lease);
+ if(!context||!requestContexts.has(context.root))fail();
+ const deadline=context.deadline();if(!Number.isSafeInteger(deadline)||Date.now()>=deadline)fail();
+ return Object.freeze({root:context.root,deadline});
+}
+export function readFiniteOwnerRequestDeadline(lease){return readFiniteOwnerRequestContext(lease).deadline;}
+function descendant(lease,parent,until,remaining=()=>Infinity){
+ const ancestor=requestContexts.get(parent);if(!ancestor)return; // Trusted Workflow/setup parents remain unbranded.
+ const {root}=readFiniteOwnerRequestContext(parent);
+ requestContexts.set(lease,{root,remaining:()=>Math.min(ancestor.remaining(),remaining()),deadline:()=>Math.min(readFiniteOwnerRequestContext(parent).deadline,until())});
+}
+/** Consume-only native boundary. Durable records can never recreate this entry. */
+export function consumeFiniteOwnerStageAdmission({ctx,env,preconnectionId,stage},originalLease){
+ const admitted=stageAdmissions.get(originalLease);stageAdmissions.delete(originalLease);
+ current(originalLease);
+ if(!admitted||admitted.ctx!==ctx||admitted.env!==env||admitted.preconnectionId!==preconnectionId||admitted.stage!==stage||ctx.storage!==admitted.storage||env.RELEASE_DB!==admitted.db||env.AFW_QA_VERSION?.id!==admitted.source.qaVersionId||ctx.id.toString()!==admitted.source.actorId)fail();
+ current(admitted.proof);
+ return Object.freeze({lease:admitted.proof,ownerSource:admitted.source,stageApprovalHash:admitted.stageApprovalHash});
+}
+function ownData(value,keys){
+ if(!value||Object.getPrototypeOf(value)!==Object.prototype||Reflect.ownKeys(value).length!==keys.length)fail();
+ for(const key of keys){const d=Object.getOwnPropertyDescriptor(value,key);if(!d?.enumerable||!Object.hasOwn(d,'value'))fail();}
+ return value;
+}
+/** DATA only: the registered root supplies the original wall and monotonic clocks. */
+export function readFiniteOwnerRequestBoundary(lease){
+ const {root,deadline}=readFiniteOwnerRequestContext(lease),state=requestContexts.get(root);
+ const remainingMs=Math.floor(Math.min(deadline-Date.now(),requestContexts.get(lease).remaining()));
+ if(!Number.isSafeInteger(remainingMs)||remainingMs<=0||remainingMs>30000)fail();
+ return Object.freeze({startedAt:state.startedAt,deadline,remainingMs});
+}
+function requestLease(request,startedAt,wall,deadline){
+ const mono=performance.now(),budget=deadline-wall,controller=new AbortController();
+ let last=wall,closed=false;
+ const abort=()=>controller.abort();
+ request.signal.addEventListener('abort',abort,{once:true});
+ if(request.signal.aborted)abort();
+ const timer=setTimeout(abort,budget);
+ const remaining=()=>budget-(performance.now()-mono);
+ const lease=Object.freeze({signal:controller.signal,assertCurrent(){
+  const at=Date.now(),elapsed=performance.now()-mono;
+  if(closed||controller.signal.aborted||!Number.isSafeInteger(at)||at<last||at>=deadline||elapsed<0||elapsed>=budget)fail();last=at;
+ }});
+ requestContexts.set(lease,{root:lease,startedAt,remaining,deadline:()=>deadline});
+ return Object.freeze({lease,finish(){requestContexts.delete(lease);stageAdmissions.delete(lease);closed=true;clearTimeout(timer);request.signal.removeEventListener('abort',abort);controller.abort();}});
+}
+/** Starts at the actual request entry, before any source/identity/SDK/storage IO. */
+export function createFiniteOwnerRequestLease(request){
+ const wall=Date.now();return requestLease(request,wall,wall,wall+30000);
+}
+/** A new LOCAL brand clipped to received lifetime DATA. Never an admission. */
+export function createFiniteOwnerForwardedRequestLease(request,boundary){
+ ownData(boundary,['startedAt','deadline','remainingMs']);
+ const {startedAt,deadline,remainingMs}=boundary,wall=Date.now();
+ if(![startedAt,deadline,remainingMs,wall].every(Number.isSafeInteger)||startedAt<0||startedAt>wall||deadline<=wall||deadline<=startedAt||deadline-startedAt>30000||remainingMs<=0||remainingMs>deadline-startedAt)fail();
+ return requestLease(request,startedAt,wall,Math.min(deadline,wall+remainingMs,wall+30000));
+}
+async function child(lease,work){
+ current(lease);
+ const wall=Date.now(),mono=performance.now(),controller=new AbortController();
+ let timer,abort,active=true,last=wall;
+ const end=requestContexts.has(lease)?Math.min(readFiniteOwnerRequestDeadline(lease),wall+5000):wall+5000;
+ // Each operation captures THIS guard. A later child cannot renew a callback
+ // still waiting on storage, and abort never claims a committed write vanished.
+ const invalidate=()=>{active=false;controller.abort();};
+ const childLease=Object.freeze({signal:controller.signal,assertCurrent(){
+  current(lease);const at=Date.now(),elapsed=performance.now()-mono;
+  if(!active||controller.signal.aborted||at<last||at>=end||elapsed<0||elapsed>=end-wall)fail();
+  last=at;
+ }});
+ descendant(childLease,lease,()=>end,()=>end-wall-(performance.now()-mono));
+ const timeout=new Promise((_,reject)=>{
+  timer=setTimeout(()=>{invalidate();try{current(lease);reject(Error('Finite child deadline'));}catch(error){reject(error);}},Math.max(1,end-Date.now()));
+  abort=()=>{invalidate();reject(Error('Finite parent deadline'));};
+  lease.signal.addEventListener('abort',abort,{once:true});
+ });
+ const actual=retainFiniteOwnerStagePromise(Promise.resolve().then(()=>{current(childLease);return work(childLease);}));
+ try{const result=await Promise.race([actual,timeout]);current(childLease);return result;}
+ finally{invalidate();clearTimeout(timer);lease.signal.removeEventListener('abort',abort);}
+}
+async function body(request,lease,max=16384){
+ // One retained actual operation owns read -> failure -> cancellation, including
+ // a cancellation which begins only after a late read physically settles.
+ // Report a known failure immediately; its cancellation remains in that actual
+ // operation so a later timeout cannot replace the first logical cause.
+ let rejectFailure;const firstFailure=new Promise((_,reject)=>{rejectFailure=reject;});
+ const completion=child(lease,async l=>{
+  const reader=request.body?.getReader();if(!reader)fail(400);const chunks=[];let length=0;
+  try{
+   for(;;){const {done,value}=await reader.read();current(l);if(done)break;if(!(value instanceof Uint8Array)||(length+=value.length)>max)fail(400);chunks.push(value);}
+   const bytes=new Uint8Array(length);let at=0;for(const chunk of chunks){bytes.set(chunk,at);at+=chunk.length;}
+   try{return new URLSearchParams(new TextDecoder('utf-8',{fatal:true}).decode(bytes));}catch{fail(400);}
+  }catch(error){rejectFailure(error);try{await reader.cancel();}catch{}throw error;}
+ });
+ return Promise.race([completion,firstFailure]);
+}
+function prepCookie(request){
+ const values=(request.headers.get('Cookie')??'').split(';').map(x=>x.trim()).filter(x=>x.startsWith(cookieName+'='));
+ if(values.length!==1)fail(403);const handle=values[0].slice(cookieName.length+1);if(!hex(handle))fail(403);return handle;
+}
+async function resolve({ctx,env,request,preconnectionId=null},lease,ownedSource=null,ownedContext=null){
+ current(lease);
+ if(!ctx?.storage?.transaction||!ctx?.id||typeof env?.RELEASE_DB?.withSession!=='function'||env.RELEASE_DB===env.DB)fail();
+ const db=env.RELEASE_DB,storage=ctx.storage,version=env.AFW_QA_VERSION?.id;
+ if(ownedSource&&ownedContext)fail();
+ let context=null;
+ const readSource=async(parent=lease)=>{
+  const value=await child(parent,childLease=>ownedContext?ownedContext(childLease,preconnectionId):ownedSource?ownedSource(childLease):readPrivateQaFiniteOwnerSource({ctx,env,parent:childLease,preconnectionId}));
+  if(!ownedContext)return validateFiniteOwnerSource(value);
+  ownData(value,['source','preconnectionId','capsuleHash']);
+  if(!hex(value.preconnectionId)||!hex(value.capsuleHash)||preconnectionId!==null&&preconnectionId!==value.preconnectionId)fail();
+  const source=validateFiniteOwnerSource(value.source),next=Object.freeze({source,preconnectionId:value.preconnectionId,capsuleHash:value.capsuleHash});
+  if(context&&canonical(next)!==canonical(context))fail();context=next;
+  return source;
+ };
+ const source=await readSource();
+ let identity=null;
+ // Narrow the SAME original parent with the SAME verified expiration; no new
+ // request clock, identity refresh or wider lease. Storage receives this guard.
+ const proofLease=Object.freeze({signal:lease.signal,assertCurrent(){
+  current(lease);const at=Date.now();
+  if(identity&&at>=identity.expiresAt)fail(401);
+  if(at<source.window.startedAt||at>=source.window.expiresAt)fail();
+ }});
+ descendant(proofLease,lease,()=>Math.min(identity?.expiresAt??Infinity,source.window.expiresAt));
+ const check=async()=>{
+  current(proofLease);if(env.RELEASE_DB!==db||ctx.storage!==storage||env.AFW_QA_VERSION?.id!==version||source.qaVersionId!==version||ctx.id.toString()!==source.actorId)fail();
+  const at=Date.now();if(at<source.window.startedAt||at>=source.window.expiresAt)fail();
+  if(canonical(await readSource(proofLease))!==canonical(source))fail();current(proofLease);
+ };
+ await check();
+ const step=async fn=>{await check();const value=await child(proofLease,fn);await check();return value;};
+ const primary=()=>{current(proofLease);return db.withSession('first-primary');};
+ if(request){
+  const url=new URL(request.url);if(url.origin!==source.origin||url.hash)fail(404);
+  if(request.method==='POST'&&request.headers.get('Origin')!==source.origin)fail(403);
+  const auth=await step(()=>verifyCloudflareAccessJwtWithExpiry({token:request.headers.get('Cf-Access-Jwt-Assertion'),teamDomain:source.access.teamDomain,audience:source.access.audience}));
+  if(!auth.ok||auth.identity.expiresAt<=Date.now())fail(401);identity=auth.identity;
+ }
+ const store=createFiniteOwnerPreparationStore({storage,now:Date.now});
+ const own=async subject=>{
+  const row=await step(()=>createDelegatedProjectRepository({db:primary(),grantStore:createDelegatedOAuthStore(primary())}).getOwnedProject(source.project.projectId,subject));
+  if(!row||row.userId!==subject||row.id!==source.project.projectId||row.revision!==source.project.revision)fail(403);return row;
+ };
+ if(identity)await own(identity.subject);
+ return {source,identity,store,step,check,primary,own,lease:proofLease,context};
+}
+const observed=result=>{if(result?.status!=='observed'||!result.record)fail();return result.record;};
+async function durable(c,write,read,kind,value){
+ const result=await c.step(write);if(!['recorded','existing'].includes(result?.status)||result.recordHash!==hash(kind,value))fail();
+ const record=observed(await c.step(read));if(encode(kind,record)!==encode(kind,value))fail();return Object.freeze({record,mutation:result});
+}
+async function ticketContext(options,lease,ownedContext=null){
+ const handle=prepCookie(options.request),ticketHash=sha(handle);
+ // Factual private lookup chooses the exact source reference only. No mapped
+ // owner or DTO is trusted; source and current Access are independently verified next.
+ if(!options.ctx?.storage?.transaction)fail();
+ const candidateStore=createFiniteOwnerPreparationStore({storage:options.ctx.storage,now:Date.now});
+ const ticket=observed(await child(lease,childLease=>candidateStore.readTicket({ticketHash},childLease)));
+ const c=await resolve({...options,preconnectionId:ticket.preconnectionId},lease,null,ownedContext);
+ const realm=evidence('realm',{...c.source.access,origin:c.source.origin}),subjectHash=evidence('subject',{accessRealmHash:realm,subject:c.identity.subject});
+ if(ticket.subjectHash!==subjectHash||ticket.sourceRevision!==c.source.sourceRevision||Date.now()<ticket.createdAt||Date.now()>=ticket.expiresAt)fail(403);
+ const map=observed(await c.step(childLease=>c.store.readProjectRef({projectRef:ticket.projectRef},childLease)));
+ const snapshot=observed(await c.step(childLease=>c.store.readOwnerSourceSnapshot({preconnectionId:ticket.preconnectionId},childLease)));
+ if(map.preconnectionId!==ticket.preconnectionId||map.subjectHash!==subjectHash||map.sourceRevision!==ticket.sourceRevision||map.projectId!==c.source.project.projectId||map.revision!==c.source.project.revision||map.expiresAt<ticket.expiresAt||snapshot.preconnectionId!==ticket.preconnectionId)fail(403);
+ const stable=Object.fromEntries(Object.entries(c.source).filter(([k])=>!['phase','currentPublication'].includes(k)));
+ const initialStable=Object.fromEntries(Object.entries(snapshot.source).filter(([k])=>!['phase','currentPublication'].includes(k)));
+ if(canonical(stable)!==canonical(initialStable))fail(403);
+ return {...c,handle,ticket,map,snapshot,realm,subjectHash};
+}
+/** Native owner forms derive the next action from qualified source and stored tickets. */
+export async function prepareFiniteOwnerChoice({ctx,env,request},lease){return choice({ctx,env,request},lease);}
+ // Internal fixed QA callgraph seam, never accepted as HTTP/RPC arguments.
+export async function continuePrivateQaFiniteOwnerChoice({ctx,env,request},lease,readOwnedContext){
+ if(typeof readOwnedContext!=='function'||!['GET','POST'].includes(request.method))fail(405);
+ return choice({ctx,env,request},lease,readOwnedContext);
+}
+async function choice({ctx,env,request},lease,ownedContext=null){
+ const options={ctx,env,request},url=new URL(request.url);
+ if(url.pathname!=='/connections/finite-prepare'||url.search||url.hash)fail(404);
+ if(!['GET','POST'].includes(request.method))fail(405);
+ if(request.method==='GET'){
+  let c,stage='connection',connectionRef=null,preconnectionId,projectRef,snapshot;
+  if((request.headers.get('Cookie')??'').includes(cookieName+'=')){
+   const previous=await ticketContext(options,lease,ownedContext);
+   stage={read_consent:'notices',notice_consent:'finite'}[previous.source.phase];if(!stage)fail();
+   c=await stageContext(options,lease,stage,ownedContext);connectionRef=c.connection.connectionRef;
+   preconnectionId=c.pre.preconnectionId;projectRef=c.ticket.projectRef;
+  }else{
+   c=await resolve(options,lease,null,ownedContext);if(c.source.phase!=='closed_ui')fail();
+   preconnectionId=c.context?.preconnectionId??opaque();projectRef=opaque();
+  }
+  if(typeof env.AFW_QA_OCCURRENCE_RATE_LIMITER?.limit!=='function')fail();
+  const limited=await c.step(()=>env.AFW_QA_OCCURRENCE_RATE_LIMITER.limit({key:'finite-owner:'+sha(c.identity.subject)}));if(limited?.success!==true)fail(limited?.success===false?429:503);
+  const at=Date.now(),expiresAt=Math.min(c.source.window.expiresAt,c.identity.expiresAt,c.pre?.expiresAt??Infinity,c.connection?.expiresAt??Infinity),handle=opaque(),ticketHash=sha(handle);
+  const realm=evidence('realm',{...c.source.access,origin:c.source.origin}),subjectHash=evidence('subject',{accessRealmHash:realm,subject:c.identity.subject});
+  const ticket={purpose:'afw.finite-owner-ticket.v1',ticketHash,subjectHash,sourceRevision:c.source.sourceRevision,projectRef,connectionRef,preconnectionId,action:stage,createdAt:at,expiresAt};
+  if(stage==='connection'){
+   const map={projectRef,preconnectionId,subjectHash,sourceRevision:c.source.sourceRevision,projectId:c.source.project.projectId,revision:c.source.project.revision,issuedAt:at,expiresAt};
+   snapshot=seals('OwnerSourceSnapshot',{preconnectionId,initialTicketHash:ticketHash,source:c.source},'sourceHash');
+   await durable(c,childLease=>c.store.putOwnerSourceSnapshot(snapshot,childLease),childLease=>c.store.readOwnerSourceSnapshot({preconnectionId},childLease),'OwnerSourceSnapshot',snapshot);
+   await durable(c,childLease=>c.store.putProjectRef(map,childLease),childLease=>c.store.readProjectRef({projectRef},childLease),'ProjectRef',map);
+  }
+  await durable(c,childLease=>c.store.putTicket(ticket,childLease),childLease=>c.store.readTicket({ticketHash},childLease),'Ticket',ticket);
+  await c.own(c.identity.subject);await c.check();
+  return {status:200,handle,projectRef,goal:c.source.goal,stage,expiresAt};
+ }
+ if(request.headers.get('Content-Type')!=='application/x-www-form-urlencoded')fail(400);
+ const form=await body(request,lease,1024),keys=[...form.keys()];
+ if(keys.length!==3||!['handle','projectRef','decision'].every(k=>form.getAll(k).length===1)||!hex(form.get('handle'))||!hex(form.get('projectRef'))||form.get('decision')!=='approve')fail(400);
+ if(prepCookie(request)!==form.get('handle'))fail(403);
+ let c=await ticketContext(options,lease,ownedContext);const stage=c.ticket.action;
+ if(c.ticket.projectRef!==form.get('projectRef'))fail(403);
+ if(stage==='connection'){
+  if(c.source.phase!=='closed_ui'||canonical(c.source)!==canonical(c.snapshot.source)||c.snapshot.initialTicketHash!==c.ticket.ticketHash)fail(403);
+ }else c=await stageContext(options,lease,stage,ownedContext);
+ const approvedAt=Date.now(),expiresAt=Math.min(c.ticket.expiresAt,c.identity.expiresAt,c.pre?.expiresAt??Infinity,c.connection?.expiresAt??Infinity);
+ const csrfReceiptHash=evidence('decision',{ticket:c.ticket,decision:'approve',projectHash:projectHash(c.source.project),goal:c.source.goal,clientId:c.source.clientId,approvedAt,expiresAt});
+ const used=await c.step(childLease=>c.store.consumeTicket({ticketHash:c.ticket.ticketHash,recordHash:csrfReceiptHash},childLease));
+ if(used?.status!=='recorded')fail();
+ const use=observed(await c.step(childLease=>c.store.readTicketUse({ticketHash:c.ticket.ticketHash},childLease)));
+ if(use.recordHash!==csrfReceiptHash||used.recordHash!==hash('TicketUse',use))fail();
+ const approval={purpose:'afw.finite-connection-approval.v1',subjectHash:c.subjectHash,sourceRevision:c.source.sourceRevision,projectHash:projectHash(c.source.project),clientId:c.source.clientId,approvedAt,expiresAt,csrfReceiptHash},approvalHash=hash('ConfigurationApproval',approval);
+ await durable(c,childLease=>c.store.putConfigurationApproval(approval,childLease),childLease=>c.store.readConfigurationApproval({approvalHash},childLease),'ConfigurationApproval',approval);
+ let pre=c.pre;
+ if(stage==='connection'){
+  pre=seals('Preconnection',{purpose:'afw.finite-connection-preparation.v1',preconnectionId:c.ticket.preconnectionId,sourceRevision:c.source.sourceRevision,actorId:c.source.actorId,owner:{subject:c.identity.subject,accessRealmHash:c.realm,accessVerifiedAt:approvedAt,accessExpiresAt:c.identity.expiresAt},project:c.source.project,clientId:c.source.clientId,resource:c.source.resource,startedAt:approvedAt,expiresAt,approvalHash,baselineHash:evidence('baseline',c.source.initialBaseline)},'recordHash');
+  await durable(c,childLease=>c.store.putPreconnection(pre,childLease),childLease=>c.store.readPreconnection({preconnectionId:pre.preconnectionId},childLease),'Preconnection',pre);
+ }
+ const stageApproval={purpose:'afw.finite-connection-stage-approval.v1',preconnectionId:pre.preconnectionId,sourceRevision:pre.sourceRevision,stage,ticketHash:c.ticket.ticketHash,approvalHash};
+ await durable(c,childLease=>c.store.putStageApproval(stageApproval,childLease),childLease=>c.store.readStageApproval({preconnectionId:pre.preconnectionId,stage},childLease),'StageApproval',stageApproval);
+ await c.check();current(lease);current(c.lease);
+ stageAdmissions.set(lease,Object.freeze({ctx,env,storage:ctx.storage,db:env.RELEASE_DB,preconnectionId:pre.preconnectionId,stage,source:c.source,proof:c.lease,stageApprovalHash:hash('StageApproval',stageApproval)}));
+ return {status:202,preconnectionId:pre.preconnectionId,stage};
+}
+
+async function approved(options,lease,phase,ownedContext=null){
+ const c=await ticketContext(options,lease,ownedContext);if(c.source.phase!==phase)fail();
+ const id=c.ticket.preconnectionId;
+ const pre=observed(await c.step(childLease=>c.store.readPreconnection({preconnectionId:id},childLease)));
+ const approval=observed(await c.step(childLease=>c.store.readConfigurationApproval({approvalHash:pre.approvalHash},childLease)));
+ const ticket=observed(await c.step(childLease=>c.store.readTicket({ticketHash:c.snapshot.initialTicketHash},childLease)));
+ const use=observed(await c.step(childLease=>c.store.readTicketUse({ticketHash:c.snapshot.initialTicketHash},childLease)));
+ qualifyFiniteOwnerApprovedTicket({source:c.source,identity:c.identity,currentTicket:c.ticket,ticket,use,pre,approval,snapshot:c.snapshot,realm:c.realm,subjectHash:c.subjectHash,observedAt:Date.now()});
+ return {...c,pre,approval};
+}
+function scopes(value){
+ let result;try{result=JSON.parse(value);}catch{fail();}
+ if(!Array.isArray(result)||result.length<1||result.length>2||new Set(result).size!==result.length||!result.includes('afw:project:read')||result.some(x=>!['afw:project:read','afw:evidence:read'].includes(x)))fail();
+ return result;
+}
+const iso=x=>typeof x==='string'&&Number.isSafeInteger(Date.parse(x))&&new Date(Date.parse(x)).toISOString()===x;
+async function consent(c,authorizationHash,consumed){
+ if(!hex(authorizationHash))fail();
+ const row=await c.step(()=>c.primary().prepare('SELECT handle_hash,user_id,kind,project_id,client_id,resource,scopes_json,expires_at,consumed_at FROM delegated_consent_sessions WHERE handle_hash=? AND user_id=? AND kind=?').bind(authorizationHash,c.identity.subject,'authorize').first());
+ if(!row||row.handle_hash!==authorizationHash||row.project_id!==c.source.project.projectId||row.client_id!==c.source.clientId||row.resource!==c.source.resource||!iso(row.expires_at)||Date.parse(row.expires_at)<=Date.now())fail();
+ const requested=scopes(row.scopes_json);
+ if(consumed?(!iso(row.consumed_at)||Date.parse(row.consumed_at)>Date.now()):row.consumed_at!=='')fail();
+ return {handle_hash:row.handle_hash,user_id:row.user_id,kind:row.kind,project_id:row.project_id,client_id:row.client_id,resource:row.resource,scopes:requested,expires_at:row.expires_at,consumed_at:row.consumed_at};
+}
+async function exactGrant(c,grantId,requested){
+ if(typeof grantId!=='string'||!grantId||grantId.length>200)fail();
+ const grant=await c.step(()=>createDelegatedOAuthStore(c.primary()).getGrant(grantId));
+ if(!grant||grant.grantId!==grantId||grant.subject!==c.identity.subject||grant.projectId!==c.source.project.projectId||grant.clientId!==c.source.clientId||grant.resource!==c.source.resource||grant.status!=='active'||grant.revokedAt||!iso(grant.createdAt)||!iso(grant.expiresAt)||Date.parse(grant.createdAt)>Date.now()||Date.parse(grant.expiresAt)<=Date.now()||Date.parse(grant.expiresAt)>c.pre.expiresAt)fail(403);
+ const approvedScopes=scopes(JSON.stringify(grant.scopes));
+ if(requested&&approvedScopes.some(x=>!requested.includes(x)))fail(403);
+ await c.own(c.identity.subject);return grant;
+}
+async function authorization(c,authorizationHash){
+ const link=observed(await c.step(childLease=>c.store.readAuthorizationLink({authorizationHash},childLease)));
+ if(link.preconnectionId!==c.pre.preconnectionId||link.subjectHash!==c.subjectHash||link.sourceRevision!==c.source.sourceRevision||link.projectRef!==c.ticket.projectRef||link.clientId!==c.source.clientId||link.resource!==c.source.resource||Date.now()>=link.expiresAt)fail();
+ return link;
+}
+export async function recordFinitePreparationAuthorization({ctx,env,request,authorizationHash},lease){
+ current(lease);const c=await approved({ctx,env,request},lease,'read_consent');
+ const url=new URL(request.url);if(url.pathname!=='/authorize')fail();
+ if(request.method==='GET'){
+  if(url.searchParams.getAll('client_id').length!==1||url.searchParams.get('client_id')!==c.source.clientId||url.searchParams.getAll('resource').length!==1||url.searchParams.get('resource')!==c.source.resource)fail();
+ }else if(request.method==='POST'){
+  if(url.search||!request.headers.get('Content-Type')?.startsWith('application/x-www-form-urlencoded'))fail();
+  const form=await body(request,lease);if(form.getAll('handle').length!==1||form.getAll('decision').length!==1||form.get('decision')!=='approve'||sha(form.get('handle')??'')!==authorizationHash)fail();
+ }else fail();
+ const row=await consent(c,authorizationHash,false),old=await c.step(childLease=>c.store.readAuthorizationLink({authorizationHash},childLease));
+ const record=finiteOwnerAuthorizationLink({preconnectionId:c.pre.preconnectionId,authorizationHash,subjectHash:c.subjectHash,sourceRevision:c.source.sourceRevision,projectRef:c.ticket.projectRef,clientId:c.source.clientId,resource:c.source.resource,issuedAt:old.record?.issuedAt??Date.now(),expiresAt:Math.min(c.pre.expiresAt,Date.parse(row.expires_at))});
+ await durable(c,childLease=>c.store.putAuthorizationLink(record,childLease),childLease=>c.store.readAuthorizationLink({authorizationHash},childLease),'AuthorizationLink',record);
+ return Object.freeze({status:old.status==='observed'?'existing':'recorded',recordHash:hash('AuthorizationLink',record)});
+}
+export async function recordFinitePreparationGrant({ctx,env,request,grantId},lease){
+ current(lease);const c=await approved({ctx,env,request},lease,'read_consent');
+ if(request.method!=='POST'||new URL(request.url).pathname!=='/authorize'||!request.headers.get('Content-Type')?.startsWith('application/x-www-form-urlencoded'))fail();
+ const form=await body(request,lease);
+ if(form.getAll('handle').length!==1||form.getAll('decision').length!==1||form.get('decision')!=='approve'||!form.get('handle'))fail();
+ const authorizationHash=sha(form.get('handle'));await authorization(c,authorizationHash);
+ const row=await consent(c,authorizationHash,true),grant=await exactGrant(c,grantId,row.scopes),approvedScopes=form.getAll('scope');
+ if(canonical(approvedScopes)!==canonical(grant.scopes)||Date.parse(grant.createdAt)<Date.parse(row.consumed_at)||form.has('project')&&(form.getAll('project').length!==1||form.get('project')!==c.source.project.projectId))fail();
+ const preconnectionId=c.pre.preconnectionId,old=await c.step(childLease=>c.store.readLink({kind:'grant',preconnectionId},childLease));
+ const record=finiteOwnerGrantLink({preconnectionId,authorizationHash,grantId,grantHash:sha(grantId),acceptedAt:old.record?.acceptedAt??Date.now()});
+ const linked=await durable(c,childLease=>c.store.putLink({kind:'grant',record},childLease),childLease=>c.store.readLink({kind:'grant',preconnectionId},childLease),'GrantLink',record);
+ const existing=await c.step(childLease=>c.store.readPreconnectionConnection({preconnectionId},childLease));
+ if(existing.status==='absent'){
+  // An existing link without the pair may represent a lost earlier outcome.
+  // Only this invocation's genuinely new link ACK permits the first allocation.
+  if(linked.mutation.status!=='recorded')return Object.freeze({status:'uncertain',recordHash:hash('GrantLink',record)});
+  const connectionRef=opaque(),linkedAt=Date.now(),relation=finiteOwnerPreconnectionConnection({preconnectionId,connectionRef,grantHash:record.grantHash,linkedAt});
+  const connection=finiteOwnerConnectionRef({connectionRef,subject:c.identity.subject,grantId:grant.grantId,clientId:c.source.clientId,projectId:c.source.project.projectId,resource:c.source.resource,issuedAt:linkedAt,expiresAt:Math.min(c.pre.expiresAt,c.pre.owner.accessExpiresAt,c.identity.expiresAt,Date.parse(grant.expiresAt))});
+  const paired=await c.step(childLease=>c.store.putPreconnectionConnection({relation,connection},childLease));
+  if(!['recorded','existing'].includes(paired?.status)||paired.recordHash!==hash('PreconnectionConnection',relation))return Object.freeze({status:'uncertain',recordHash:hash('GrantLink',record)});
+ }
+ await connectionPair(c,record,grant);
+ return Object.freeze({status:old.status==='observed'?'existing':'recorded',recordHash:hash('GrantLink',record)});
+}
+
+async function connectionPair(c,link,grant){
+ const relation=observed(await c.step(childLease=>c.store.readPreconnectionConnection({preconnectionId:c.pre.preconnectionId},childLease)));
+ const connection=observed(await c.step(childLease=>c.store.readConnectionRef({connectionRef:relation.connectionRef},childLease)));
+ qualifyFiniteOwnerConnectionPair({source:c.source,identity:c.identity,pre:c.pre,link,grant,relation,connection,observedAt:Date.now()});
+ return {relation,connection};
+}
+
+async function eventRow(c,{requestId,sequence,grantId}){
+ const row=await c.step(()=>c.primary().prepare("SELECT c.* FROM dossier_monitoring_consent_events c WHERE c.request_id=? AND c.sequence=? AND c.grant_id=? AND c.user_id=? AND NOT EXISTS(SELECT 1 FROM dossier_monitoring_consent_events r WHERE r.grant_id=c.grant_id AND r.action='revoke')").bind(requestId,sequence,grantId,c.identity.subject).first());
+ if(!row)fail(403);
+ const event={grantId:row.grant_id,projectId:row.project_id,subject:row.user_id,clientId:row.client_id,resource:row.resource,revision:row.revision,action:row.action,purpose:row.purpose,requestId:row.request_id,sequence:row.sequence,issuedAt:row.issued_at,expiresAt:row.expires_at};
+ evidence('event',event);
+ if(event.projectId!==c.source.project.projectId||event.subject!==c.identity.subject||event.clientId!==c.source.clientId||event.resource!==c.source.resource||event.revision!==c.source.project.revision||event.issuedAt>Date.now()||event.expiresAt<=Date.now()||event.expiresAt>c.pre.expiresAt)fail(403);
+ return event;
+}
+export async function recordFinitePreparationNotice({ctx,env,request,requestId,sequence},lease){
+ current(lease);const c=await approved({ctx,env,request},lease,'notice_consent'),url=new URL(request.url);
+ if(request.method!=='POST'||url.pathname!=='/monitoring/grant'||url.search||request.headers.get('Content-Type')!=='application/x-www-form-urlencoded')fail();
+ const form=await body(request,lease,1024),handle=form.get('handle');
+ if([...form.keys()].length!==1||!handle||!/^[A-Za-z0-9_-]{43}$/.test(handle))fail();
+ const cookies=(request.headers.get('Cookie')??'').split(';').map(x=>x.trim()).filter(x=>x.startsWith('__Host-afw-monitoring-owner='));
+ if(cookies.length!==1||cookies[0]!=='__Host-afw-monitoring-owner='+handle)fail(403);
+ const preconnectionId=c.pre.preconnectionId,grantLink=observed(await c.step(childLease=>c.store.readLink({kind:'grant',preconnectionId},childLease)));
+ await authorization(c,grantLink.authorizationHash);const row=await consent(c,grantLink.authorizationHash,true),grant=await exactGrant(c,grantLink.grantId,row.scopes);
+ if(grantLink.grantHash!==sha(grant.grantId))fail();
+ await connectionPair(c,grantLink,grant);
+ const ticket=await c.step(()=>c.primary().prepare('SELECT * FROM dossier_monitoring_owner_tickets WHERE handle_hash=? AND request_id=?').bind(sha(handle),requestId).first());
+ if(!ticket||ticket.user_id!==c.identity.subject||ticket.grant_id!==grant.grantId||ticket.project_id!==c.source.project.projectId||ticket.client_id!==c.source.clientId||ticket.resource!==c.source.resource||ticket.purpose!=='afw.dossier-monitoring-owner.v1'||ticket.action!=='grant'||ticket.revision!==c.source.project.revision||ticket.issued_at>Date.now()||ticket.expires_at<=Date.now())fail(403);
+ const event=await eventRow(c,{requestId,sequence,grantId:grant.grantId});
+ if(ticket.permission_expires_at!==event.expiresAt||ticket.expected_sequence>=event.sequence||event.expiresAt>Date.parse(grant.expiresAt))fail();
+ const old=await c.step(childLease=>c.store.readLink({kind:'notice',preconnectionId},childLease)),record={preconnectionId,grantHash:grantLink.grantHash,eventHash:evidence('event',event),sequence,acceptedAt:old.record?.acceptedAt??Date.now()};
+ await durable(c,childLease=>c.store.putLink({kind:'notice',record},childLease),childLease=>c.store.readLink({kind:'notice',preconnectionId},childLease),'NoticeLink',record);
+ return Object.freeze({status:old.status==='observed'?'existing':'recorded',recordHash:hash('NoticeLink',record)});
+}
+
+
+const preparationStages=['connection','notices','finite'];
+const sorted=v=>JSON.stringify(v,(_,x)=>x&&typeof x==='object'&&!Array.isArray(x)?Object.fromEntries(Object.entries(x).sort(([a],[b])=>a<b?-1:1)):x);
+async function stageHistory(c,count){
+ const approvals={},receipts={},predecessors=[],id=c.pre.preconnectionId;
+ const initialTicket=observed(await c.step(l=>c.store.readTicket({ticketHash:c.snapshot.initialTicketHash},l)));
+ let finalApproval=null,finalStageApproval=null;
+ for(let i=0;i<count;i++){
+  const stage=preparationStages[i],sa=observed(await c.step(l=>c.store.readStageApproval({preconnectionId:id,stage},l)));
+  const a=observed(await c.step(l=>c.store.readConfigurationApproval({approvalHash:sa.approvalHash},l))),ticket=observed(await c.step(l=>c.store.readTicket({ticketHash:sa.ticketHash},l))),use=observed(await c.step(l=>c.store.readTicketUse({ticketHash:sa.ticketHash},l)));
+  const journal=effect=>createFinitePolicyEffectJournal({storage:c.storage,identity:{kind:'connection',preconnectionId:id,sourceRevision:c.source.sourceRevision,stage,effect},now:Date.now});
+  const upload=await c.step(l=>journal('upload').read(l)),activation=await c.step(l=>journal('activation').read(l));
+  const receipt=qualifyFiniteOwnerInstalledStage({source:c.source,preconnection:c.pre,sourceSnapshot:c.snapshot,initialTicket,connection:c.connection??null,stage,stageApproval:sa,approval:a,ticket,ticketUse:use,upload,activation,predecessors,grantLink:c.grantLink??null,noticeLink:c.noticeLink??null,observedAt:Date.now()});
+  approvals[stage]=hash('StageApproval',sa);receipts[stage]=receipt.receiptHash;predecessors.push(receipt);finalApproval=a;finalStageApproval=sa;
+ }
+ const publication=c.source.currentPublication,last=predecessors.at(-1);
+ if(!last||publication.stage!==last.stage||publication.versionId!==last.versionId||publication.deploymentId!==last.deploymentId||publication.receiptHash!==last.receiptHash)fail();
+ return {stageApprovalHashes:approvals,stageReceiptHashes:receipts,finalApproval,finalStageApproval,lastReceipt:last};
+}
+async function permissions(c,withNotice){
+ const id=c.pre.preconnectionId,grantLink=observed(await c.step(l=>c.store.readLink({kind:'grant',preconnectionId:id},l)));
+ await authorization(c,grantLink.authorizationHash);
+ const consentRow=await consent(c,grantLink.authorizationHash,true),grant=await exactGrant(c,grantLink.grantId,consentRow.scopes);
+ if(grantLink.grantHash!==sha(grant.grantId))fail();
+ const {relation,connection}=await connectionPair(c,grantLink,grant);
+ let noticeLink=null,event=null;
+ if(withNotice){
+  noticeLink=observed(await c.step(l=>c.store.readLink({kind:'notice',preconnectionId:id},l)));
+  const row=await c.step(()=>c.primary().prepare('SELECT request_id FROM dossier_monitoring_consent_events WHERE sequence=? AND grant_id=? AND user_id=?').bind(noticeLink.sequence,grant.grantId,c.identity.subject).first());
+  if(!row)fail();event=await eventRow(c,{requestId:row.request_id,sequence:noticeLink.sequence,grantId:grant.grantId});
+  if(noticeLink.grantHash!==grantLink.grantHash||noticeLink.eventHash!==evidence('event',event)||event.expiresAt>Date.parse(grant.expiresAt))fail();
+ }
+ return {...c,grantLink,consentRow,grant,relation,connection,noticeLink,event};
+}
+async function stageContext(options,lease,stage,ownedContext=null){
+ const phase={notices:'read_consent',finite:'notice_consent'}[stage];if(!phase)fail();
+ let c=await approved(options,lease,phase,ownedContext);c.storage=options.ctx.storage;
+ c=await permissions(c,stage==='finite');await stageHistory(c,stage==='notices'?1:2);return c;
+}
+/** Factual candidate data only: fresh fixed source, primary and exact immutable history.
+ * This reader cannot mint native admission or issue a provider/storage mutation. */
+export async function readFiniteOwnerPreparationFacts(options,lease){return readPreparationFacts(options,lease);}
+async function readPreparationFacts({ctx,env,preconnectionId},lease,setup=null){
+ const ownedSource=setup?async l=>{current(l);await setup.source.assertCurrent(l);current(l);return setup.source.ownerSource;}:null;
+ let c=await resolve({ctx,env,preconnectionId},lease,ownedSource);
+ if(c.source.phase!=='finite_prearm')fail();
+ c.pre=observed(await c.step(l=>c.store.readPreconnection({preconnectionId},l)));
+ c.snapshot=observed(await c.step(l=>c.store.readOwnerSourceSnapshot({preconnectionId},l)));
+ const stable=v=>Object.fromEntries(Object.entries(v).filter(([k])=>!['phase','currentPublication'].includes(k)));
+ const pre=c.pre,source=c.source,realm=evidence('realm',{...source.access,origin:source.origin});
+ if(canonical(stable(source))!==canonical(stable(c.snapshot.source))||pre.preconnectionId!==preconnectionId||pre.sourceRevision!==source.sourceRevision||pre.actorId!==source.actorId||pre.owner.accessRealmHash!==realm||pre.clientId!==source.clientId||pre.resource!==source.resource||projectHash(pre.project)!==projectHash(source.project)||pre.baselineHash!==evidence('baseline',c.snapshot.source.initialBaseline)||Date.now()>=Math.min(pre.expiresAt,pre.owner.accessExpiresAt))fail();
+ c.identity={subject:pre.owner.subject,expiresAt:pre.owner.accessExpiresAt};c.subjectHash=evidence('subject',{accessRealmHash:realm,subject:pre.owner.subject});c.storage=ctx.storage;
+ c.ticket=observed(await c.step(l=>c.store.readTicket({ticketHash:c.snapshot.initialTicketHash},l)));
+ const map=observed(await c.step(l=>c.store.readProjectRef({projectRef:c.ticket.projectRef},l)));
+ if(map.preconnectionId!==preconnectionId||map.subjectHash!==c.subjectHash||map.sourceRevision!==source.sourceRevision||map.projectId!==source.project.projectId||map.revision!==source.project.revision||c.ticket.expiresAt>map.expiresAt)fail();
+ await c.own(pre.owner.subject);c=await permissions(c,true);
+ const history=await stageHistory(c,3),approval=history.finalApproval,permissionExpiresAt=Math.min(Date.parse(c.grant.expiresAt),c.event.expiresAt);
+ const commandBy=Math.min(permissionExpiresAt,pre.owner.accessExpiresAt,approval.expiresAt,source.window.expiresAt,pre.expiresAt)-510000;
+ if(setup?setup.T0>=commandBy:Date.now()>=commandBy)fail();
+ const auditHash=audit({preconnectionId,sourceRevision:source.sourceRevision,sourceHash:c.snapshot.sourceHash,preconnectionHash:pre.recordHash,stageApprovalHashes:history.stageApprovalHashes,stageReceiptHashes:history.stageReceiptHashes,grantLinkHash:hash('GrantLink',c.grantLink),noticeLinkHash:hash('NoticeLink',c.noticeLink),connectionRelationHash:hash('PreconnectionConnection',c.relation),connectionRefHash:hash('ConnectionRef',c.connection)});
+ const value={purpose:'afw.finite-owner-preparation.v1',prepId:preconnectionId,sourceRevision:source.sourceRevision,actorId:pre.actorId,expiresAt:pre.expiresAt,commandBy,owner:pre.owner,connection:{connectionRef:c.connection.connectionRef,grantId:c.grant.grantId,clientId:source.clientId,resource:source.resource,grantHash:c.grantLink.grantHash,consentHash:evidence('consent',c.consentRow),noticesHash:c.noticeLink.eventHash,permissionExpiresAt},project:pre.project,goal:source.goal,programContext:source.programContext,approval:{purpose:'afw.own-synthetic-policy-preparation.v1',decision:'approve',sourceRevision:source.sourceRevision,projectHash:projectHash(pre.project),goal:source.goal,approvedAt:approval.approvedAt,expiresAt:approval.expiresAt,csrfReceiptHash:approval.csrfReceiptHash},auditHash};
+ await c.check();current(lease);
+ return Object.freeze({value:Object.freeze(value),stageApprovalHash:hash('StageApproval',history.finalStageApproval),receipt:history.lastReceipt,ownerSource:source,...(setup?{notice:c.event}:{})});
+}
+
+export async function readFiniteOwnerPreparation({ctx,env,sourceRevision,intentId,signal}){
+ if(typeof sourceRevision!=='string'||!/^[a-f0-9]{40}$/.test(sourceRevision)||!(signal instanceof AbortSignal)||!ctx?.storage?.transaction)fail();
+ const parent=createFiniteOwnerRequestLease(new Request('https://delegated-canary.agentfriendlyweb.dev/connections/finite-prepare',{signal})),lease=parent.lease;
+ try{
+  const store=createFiniteOwnerPreparationStore({storage:ctx.storage,now:Date.now}),selected=await child(lease,l=>store.readSelected({sourceRevision},l));if(!selected)fail();
+  const p=selected.preparation,id=p.prepId,facts=await readFiniteOwnerPreparationFacts({ctx,env,preconnectionId:id},lease);
+  if(p.sourceRevision!==sourceRevision||Date.now()>=p.commandBy||p.selectedAt<facts.receipt.completedAt||encode('OwnerPreparation',p)!==encode('OwnerPreparation',{...facts.value,selectedAt:p.selectedAt,preparationHash:p.preparationHash}))fail();
+  if(intentId!==undefined&&(!selected.binding||selected.binding.intentId!==intentId||selected.binding.prepId!==id||selected.binding.preparationHash!==p.preparationHash||selected.binding.selectionHash!==selected.selection.selectionHash))fail();
+  const witness=await child(lease,l=>store.readSelectionPublication({sourceRevision,selectionHash:selected.selection.selectionHash},l));if(!witness||witness.publishedAt<selected.selection.selectedAt||witness.publishedAt>=p.commandBy)fail();
+  const final=await child(lease,l=>store.readSelected({sourceRevision},l));if(canonical(final)!==canonical(selected))fail();return final;
+ }finally{parent.finish();}
+}
+
+/** INTERNAL fixed native facts; no caller seed/T0/flag, no send authority.
+ * The original prearm publication is historical, while fixed source separately
+ * qualifies current provider state and only actual own ACK transitions. */
+export async function readFiniteOwnerSetupFacts({ctx,env,intentId,sourceRevision},originalLease){
+ current(originalLease);
+ const source=await child(originalLease,()=>readPrivateQaFinitePolicySource({ctx,env,intentId,sourceRevision},originalLease));
+ setupFields(source,['native','ownerSource','originalContext','baseline','rollback','bytes','assertCurrent']);
+ if(typeof source.assertCurrent!=='function')fail();
+ narrowFinitePolicySetupClock(originalLease,source.native,{intentId,sourceRevision},env);
+ const material=await child(originalLease,l=>readFiniteMaterialSeed({intentId,sourceRevision,signal:l.signal}));
+ current(originalLease);
+ const T0=material.primaryEvidence.T0,completed=material.primaryEvidence.seedStepCompletedAt;
+ if(source.native.T0!==T0||!Number.isSafeInteger(completed)||completed<T0||source.native.eventTimestamp<completed||source.native.queuedAt<completed||material.seed.sourceRevision!==sourceRevision||material.seed.intentId!==intentId||material.seed.qaPublication.qaLive.versionId!==env.AFW_QA_VERSION?.id)fail();
+ const store=createFiniteOwnerPreparationStore({storage:ctx.storage,now:Date.now}),selected=await child(originalLease,l=>store.readSelected({sourceRevision},l));
+ if(!selected||selected.binding!==null)fail();
+ const p=selected.preparation,witness=await child(originalLease,l=>store.readSelectionPublication({sourceRevision,selectionHash:selected.selection.selectionHash},l));
+ if(!witness||witness.publishedAt<selected.selection.selectedAt||witness.publishedAt>T0||selected.selection.selectedAt>T0||p.selectedAt>T0||T0>=p.commandBy)fail();
+ const facts=await readPreparationFacts({ctx,env,preconnectionId:p.prepId},originalLease,{source,T0});
+ if(p.selectedAt<facts.receipt.completedAt||encode('OwnerPreparation',p)!==encode('OwnerPreparation',{...facts.value,selectedAt:p.selectedAt,preparationHash:p.preparationHash}))fail();
+ const final=await child(originalLease,l=>store.readSelected({sourceRevision},l));
+ if(sorted(final)!==sorted(selected))fail();
+ await child(originalLease,l=>source.assertCurrent(l));current(originalLease);
+ return Object.freeze({value:facts.value,selected,witness,receipt:facts.receipt,ownerSource:facts.ownerSource,source,material,notice:facts.notice});
+}

~~~~~~~~~~

## lib/mcp-qa-finite-owner-sdk-binding-facts.mjs

~~~~~~~~~~diff
diff --git a/lib/mcp-qa-finite-owner-sdk-binding-facts.mjs b/lib/mcp-qa-finite-owner-sdk-binding-facts.mjs
--- /dev/null
+++ b/lib/mcp-qa-finite-owner-sdk-binding-facts.mjs
@@ -0,0 +1,50 @@
+import {createHash} from 'node:crypto';
+import {projectFinitePublicConfiguration} from './mcp-qa-finite-profile.mjs';
+
+const ALIAS='AFW_FINITE_OWNER_OAUTH_KV';
+const NAMESPACE_ID='6b94ff702e504e14a7730cee73a0f6ff';
+const CONFIG=['compatibility_date','compatibility_flags','main_module','usage_model','containers','exports','bindings'];
+const fail=()=>{throw Error('Finite owner SDK binding facts unavailable');};
+const canonical=v=>Array.isArray(v)?'['+v.map(canonical).join(',')+']':v&&typeof v==='object'?'{'+Object.keys(v).sort().map(k=>JSON.stringify(k)+':'+canonical(v[k])).join(',')+'}':JSON.stringify(v);
+
+function own(value){
+ let nodes=0,bytes=0;
+ function copy(v,depth=0){
+  if(++nodes>4096||depth>20)fail();
+  if(v===null||typeof v==='boolean'||typeof v==='number'&&Number.isSafeInteger(v))return v;
+  if(typeof v==='string'){bytes+=Buffer.byteLength(v);if(bytes>262144)fail();return v;}
+  const array=Array.isArray(v);
+  if(!v||typeof v!=='object'||Object.getPrototypeOf(v)!==(array?Array.prototype:Object.prototype))fail();
+  const keys=Reflect.ownKeys(v),out=array?[]:{};
+  if(array&&(v.length>1024||keys.length!==v.length+1))fail();
+  for(const k of keys){
+   if(array&&k==='length')continue;
+   const d=Object.getOwnPropertyDescriptor(v,k);
+   if(typeof k!=='string'||['__proto__','constructor','prototype','toJSON'].includes(k)||!d?.enumerable||!Object.hasOwn(d,'value')||array&&!/^(0|[1-9][0-9]*)$/.test(k))fail();
+   out[k]=copy(d.value,depth+1);
+  }
+  return out;
+ }
+ return copy(value);
+}
+
+/** Exact, bounded source DATA equality. It neither reads provider state nor grants access. */
+export function qualifyFiniteOwnerSdkBindingFacts(input){
+ const args=own(input);
+ if(!args||canonical(Object.keys(args).sort())!=='["mMetadata","qaMetadata"]')fail();
+ const qa=projectFinitePublicConfiguration({role:'qaLive',metadata:args.qaMetadata});
+ const m=args.mMetadata;
+ if(!m||canonical(Object.keys(m).sort())!==canonical([...CONFIG].sort())||!Array.isArray(m.compatibility_flags)||!Array.isArray(m.containers)||!Array.isArray(m.bindings)||!m.bindings.length||typeof m.compatibility_date!=='string'||typeof m.main_module!=='string'||typeof m.usage_model!=='string'||!m.exports||typeof m.exports!=='object')fail();
+ const q=qa.bindings.filter(b=>b.name===ALIAS);
+ if(q.length!==1||q[0].type!=='kv_namespace'||q[0].namespace_id!==NAMESPACE_ID||qa.bindings.filter(b=>b.type==='kv_namespace').length!==1)fail();
+ const names=new Set();let oauth=null;
+ for(const b of m.bindings){
+  if(!b||typeof b.name!=='string'||!b.name||names.has(b.name))fail();
+  names.add(b.name);
+  if(b.name==='OAUTH_KV')oauth=b;
+  else if(b.type==='kv_namespace'||/OAUTH.*KV|KV.*OAUTH/.test(b.name))fail();
+ }
+ if(!oauth||canonical(Object.keys(oauth).sort())!=='["name","namespace_id","type"]'||oauth.type!=='kv_namespace'||oauth.namespace_id!==NAMESPACE_ID||oauth.namespace_id!==q[0].namespace_id)fail();
+ const fact={alias:ALIAS,namespaceId:NAMESPACE_ID};
+ return Object.freeze({...fact,bindingHash:createHash('sha256').update('afw.finite-owner-sdk-binding.v1\n'+canonical(fact)).digest('hex')});
+}

~~~~~~~~~~

## lib/mcp-qa-finite-owner-source.mjs

~~~~~~~~~~diff
diff --git a/lib/mcp-qa-finite-owner-source.mjs b/lib/mcp-qa-finite-owner-source.mjs
--- /dev/null
+++ b/lib/mcp-qa-finite-owner-source.mjs
@@ -0,0 +1,10 @@
+// Fixed source boundary. T3/T5 must qualify actual source, binding holders,
+// current QA version, initial baseline and stage chain. No registration or DTO authority.
+const unavailable=()=>{throw Error('Finite owner source unavailable');};
+export const readPrivateQaFiniteOwnerSource=unavailable;
+
+// T5 must qualify the fixed native sender/QA binding, overwrite transport metadata
+// and propagate the ORIGINAL request deadline/abort. These are not generic RPCs.
+export const forwardPrivateQaFiniteOwnerAuthorization=unavailable;
+export const forwardPrivateQaFiniteOwnerGrant=unavailable;
+export const forwardPrivateQaFiniteOwnerNotice=unavailable;

~~~~~~~~~~

## lib/mcp-qa-finite-owner-stage-facts.mjs

~~~~~~~~~~diff
diff --git a/lib/mcp-qa-finite-owner-stage-facts.mjs b/lib/mcp-qa-finite-owner-stage-facts.mjs
--- /dev/null
+++ b/lib/mcp-qa-finite-owner-stage-facts.mjs
@@ -0,0 +1,34 @@
+import {createHash} from 'node:crypto';
+import {initialOwn as own,initialFields as fields,initialCanonical as canonical,initialHash} from './mcp-qa-finite-initial-material-records.mjs';
+import {validateFiniteOwnerSource,encodeFinitePreparationRecord as encode,decodeFinitePreparationRecord as decode,hashFinitePreparationRecord as hash,hashFiniteOwnerEvidence as evidence,hashFiniteOwnerPreparationProject as projectHash} from './mcp-qa-finite-preparation-records.mjs';
+const fail=()=>{throw Error('Finite installed stage facts unavailable');};
+const record=(kind,v)=>decode(kind,encode(kind,v));
+const stable=s=>Object.fromEntries(Object.entries(s).filter(([k])=>!['phase','currentPublication'].includes(k)));
+/** Pure exact installed-stage DATA. No admission or source qualification. */
+export function qualifyFiniteOwnerInstalledStage(input){
+ if(arguments.length!==1)fail();
+ const v=own(fields(input,['source','preconnection','sourceSnapshot','initialTicket','connection','stage','stageApproval','approval','ticket','ticketUse','upload','activation','predecessors','grantLink','noticeLink','observedAt']));
+ const source=validateFiniteOwnerSource(v.source),pre=record('Preconnection',v.preconnection),snapshot=record('OwnerSourceSnapshot',v.sourceSnapshot),initial=record('Ticket',v.initialTicket),sa=record('StageApproval',v.stageApproval),a=record('ConfigurationApproval',v.approval),ticket=record('Ticket',v.ticket),use=record('TicketUse',v.ticketUse),connection=v.connection===null?null:record('ConnectionRef',v.connection),grant=v.grantLink===null?null:record('GrantLink',v.grantLink),notice=v.noticeLink===null?null:record('NoticeLink',v.noticeLink);
+ const stages=['connection','notices','finite'],i=stages.indexOf(v.stage),at=v.observedAt,id=pre.preconnectionId;
+ if(i<0||!Number.isSafeInteger(at)||at<0||!Array.isArray(v.predecessors)||v.predecessors.length!==i)fail();
+ const predecessors=v.predecessors.map((r,n)=>{r=record('ConnectionReceipt',r);if(r.stage!==stages[n]||r.preconnectionId!==id||r.sourceRevision!==source.sourceRevision||r.completedAt>at)fail();const b=n?v.predecessors[n-1]:snapshot.source.initialBaseline;if(r.baselineVersionId!==b.versionId||r.baselineDeploymentId!==b.deploymentId)fail();return r;});
+ const baseline=predecessors.at(-1)??snapshot.source.initialBaseline;
+ const realm=evidence('realm',{...source.access,origin:source.origin}),subject=evidence('subject',{accessRealmHash:realm,subject:pre.owner.subject});
+ if(canonical(stable(source))!==canonical(stable(snapshot.source))||snapshot.preconnectionId!==id||snapshot.initialTicketHash!==initial.ticketHash||initial.preconnectionId!==id||initial.action!=='connection'||initial.sourceRevision!==source.sourceRevision||initial.subjectHash!==subject||initial.connectionRef!==null||
+ pre.sourceRevision!==source.sourceRevision||pre.actorId!==source.actorId||pre.owner.accessRealmHash!==realm||pre.clientId!==source.clientId||pre.resource!==source.resource||projectHash(pre.project)!==projectHash(source.project)||pre.baselineHash!==evidence('baseline',snapshot.source.initialBaseline)||pre.startedAt<source.window.startedAt||pre.expiresAt>source.window.expiresAt)fail();
+ const decision=evidence('decision',{ticket,decision:'approve',projectHash:projectHash(source.project),goal:source.goal,clientId:source.clientId,approvedAt:a.approvedAt,expiresAt:a.expiresAt});
+ if(sa.preconnectionId!==id||sa.sourceRevision!==source.sourceRevision||sa.stage!==v.stage||ticket.preconnectionId!==id||ticket.sourceRevision!==sa.sourceRevision||ticket.action!==v.stage||ticket.projectRef!==initial.projectRef||ticket.ticketHash!==sa.ticketHash||ticket.subjectHash!==subject||a.subjectHash!==subject||a.sourceRevision!==sa.sourceRevision||a.clientId!==source.clientId||a.projectHash!==projectHash(pre.project)||hash('ConfigurationApproval',a)!==sa.approvalHash||use.ticketHash!==ticket.ticketHash||use.recordHash!==decision||a.csrfReceiptHash!==decision||a.approvedAt<pre.startedAt||a.approvedAt<ticket.createdAt||use.consumedAt<a.approvedAt||use.consumedAt>at||a.expiresAt>Math.min(ticket.expiresAt,pre.expiresAt,pre.owner.accessExpiresAt,source.window.expiresAt)||at>=a.expiresAt)fail();
+ if(i===0){if(sa.approvalHash!==pre.approvalHash||sa.ticketHash!==snapshot.initialTicketHash||ticket.connectionRef!==null)fail();}
+ else if(!connection||ticket.connectionRef!==connection.connectionRef||a.expiresAt>connection.expiresAt||!grant||grant.preconnectionId!==id||grant.grantId!==connection.grantId||grant.grantHash!==createHash('sha256').update(connection.grantId).digest('hex')||connection.subject!==pre.owner.subject||connection.clientId!==source.clientId||connection.projectId!==source.project.projectId||connection.resource!==source.resource)fail();
+ if(i===2&&(!notice||notice.preconnectionId!==id||notice.grantHash!==grant.grantHash))fail();
+ const journal=(value,effect,expectedState)=>{
+  fields(value,['state','send','ack','receipt']);if(value.state!==expectedState)fail();
+  const send=record('ConnectionSend',value.send),ack=record('ConnectionAck',value.ack),receipt=value.receipt===null?null:record('ConnectionReceipt',value.receipt);
+  if(send.effect!==effect||send.stage!==v.stage||send.preconnectionId!==id||send.sourceRevision!==source.sourceRevision||ack.sendHash!==hash('ConnectionSend',send)||ack.acknowledgedAt<send.issuedAt||ack.acknowledgedAt>=send.deadline||ack.acknowledgedAt>at||send.baselineVersionId!==baseline.versionId||send.baselineDeploymentId!==baseline.deploymentId||send.issuedAt<a.approvedAt||send.issuedAt<use.consumedAt||send.deadline>Math.min(a.expiresAt,pre.expiresAt,pre.owner.accessExpiresAt,source.window.expiresAt)||send.deadline-send.issuedAt>5000)fail();
+  return {send,ack,receipt};
+ };
+ const upload=journal(v.upload,'upload','acknowledged'),activation=journal(v.activation,'activation','installed'),receipt=activation.receipt;
+ const contextHash=initialHash('afw.finite-connection-context.v1',{preconnection:pre,stageApproval:sa,predecessors,grant:i?grant:null,notice:i===2?notice:null});
+ if(upload.receipt!==null||!receipt||receipt.preconnectionId!==id||receipt.stage!==v.stage||receipt.sourceRevision!==source.sourceRevision||receipt.versionId!==upload.ack.resourceId||receipt.deploymentId!==activation.ack.resourceId||receipt.baselineVersionId!==baseline.versionId||receipt.baselineDeploymentId!==baseline.deploymentId||receipt.completedAt<activation.ack.acknowledgedAt||receipt.completedAt<upload.ack.acknowledgedAt||receipt.completedAt>at||receipt.completedAt>=activation.send.deadline||activation.send.issuedAt<upload.ack.acknowledgedAt||upload.send.contextHash!==contextHash||activation.send.contextHash!==contextHash)fail();
+ return receipt;
+}

~~~~~~~~~~

## lib/mcp-qa-finite-package.mjs

~~~~~~~~~~diff
diff --git a/lib/mcp-qa-finite-package.mjs b/lib/mcp-qa-finite-package.mjs
--- /dev/null
+++ b/lib/mcp-qa-finite-package.mjs
@@ -0,0 +1,232 @@
+import {QA_CLOUD_CLOSED_PINS} from './mcp-qa-cloud-closed-pins.mjs';
+import {finiteSourceFile} from './mcp-qa-finite-seed-primary.mjs';
+import {createHash} from 'node:crypto';
+import {spawn} from 'node:child_process';
+import {fileURLToPath} from 'node:url';
+import {performance} from 'node:perf_hooks';
+import {parseDocument} from 'yaml';
+import {isQaGithubBearerTransportValue} from './mcp-qa-cloud-lifecycle-admission.mjs';
+import {validateFinitePackageManifest,encodeFinitePackageManifest,hashFinitePackageManifest} from './mcp-qa-finite-seed.mjs';
+
+// GHA-only technical lookup. No artifact code is loaded, no dispatch/fallback,
+// and no metadata returned here establishes authorized profile/runtime semantics.
+const REPOSITORY='tokenizartinfo-ops/agent-friendly-web',REPOSITORY_ID=1347578006;
+const API='https://api.github.com/repos/'+REPOSITORY;
+const WORKFLOW_PATH='.github/workflows/afw-finite-native-package.yml';
+const WORKFLOW_API=API+'/actions/workflows/afw-finite-native-package.yml';
+const ARCHIVE_LIMIT=67108864,JSON_LIMIT=1048576,TOTAL_MS=30000,STEP_MS=5000;
+const ROLES=['qaLive','qaClosed','canaryLive','canaryClosed','operatorClosed'];
+const fail=()=>{throw Error('Finite package unavailable');};
+const positive=v=>Number.isSafeInteger(v)&&v>0;
+const hex=(v,n=40)=>typeof v==='string'&&new RegExp('^[a-f0-9]{'+n+'}$').test(v);
+const sha256=v=>createHash('sha256').update(v).digest('hex');
+const sameRepository=r=>r?.id===REPOSITORY_ID&&r.full_name===REPOSITORY;
+function createBudget(now,parent){
+ const start=now(),nativeStart=performance.now(),controller=new AbortController();
+ if(!Number.isSafeInteger(start)||parent&&!(parent instanceof AbortSignal))fail();
+ let previous=start;
+ const abort=()=>controller.abort();
+ parent?.addEventListener('abort',abort,{once:true});
+ if(parent?.aborted)abort();
+ const timer=setTimeout(abort,TOTAL_MS);
+ function check(){
+  const current=now();
+  if(controller.signal.aborted||!Number.isSafeInteger(current)||current<previous||current-start>=TOTAL_MS||performance.now()-nativeStart>=TOTAL_MS)fail();
+  previous=current;
+  return current;
+ }
+ async function bounded(action){
+  check();
+  const child=new AbortController();
+  let rejectAbort;
+  const rejected=new Promise((_,reject)=>{rejectAbort=reject;});
+  const stop=()=>{child.abort();rejectAbort(Error('Finite package unavailable'));};
+  controller.signal.addEventListener('abort',stop,{once:true});
+  const timer=setTimeout(stop,Math.min(STEP_MS,TOTAL_MS-(performance.now()-nativeStart)));
+  try{
+   const value=await Promise.race([Promise.resolve().then(()=>action(child.signal)),rejected]);
+   check();return value;
+  }finally{
+   clearTimeout(timer);controller.signal.removeEventListener('abort',stop);child.abort();
+  }
+ }
+ return {check,bounded,close(){clearTimeout(timer);parent?.removeEventListener('abort',abort);controller.abort();}};
+}
+async function readBody(response,limit,signal){
+ const length=response.headers.get('content-length');
+ if(length!==null&&(!/^(0|[1-9][0-9]*)$/.test(length)||!Number.isSafeInteger(Number(length))||Number(length)>limit))fail();
+ if(!response.body)fail();
+ const reader=response.body.getReader(),parts=[];let size=0,done=false;
+ const cancel=()=>{reader.cancel().catch(()=>{});};
+ signal.addEventListener('abort',cancel,{once:true});
+ try{
+  while(true){
+   if(signal.aborted)fail();
+   const chunk=await reader.read();
+   if(signal.aborted)fail();
+   if(chunk.done){done=true;break;}
+   if(!(chunk.value instanceof Uint8Array)||(size+=chunk.value.byteLength)>limit)fail();
+   parts.push(chunk.value);
+  }
+  if(length!==null&&size!==Number(length))fail();
+  return Buffer.concat(parts,size);
+ }finally{signal.removeEventListener('abort',cancel);if(!done)cancel();reader.releaseLock();}
+}
+function safeRedirect(location){
+ if(typeof location!=='string'||location.length>8192||/[^\x21-\x7e]/.test(location)||location.includes('\\'))fail();
+ const url=new URL(location),rawPath=location.match(/^https:\/\/[^/?#]+([^?#]*)/)?.[1];
+ if(url.protocol!=='https:'||url.username||url.password||url.port||url.hash||
+  !/^productionresultssa[0-9]+\.blob\.core\.windows\.net$/.test(url.hostname)||
+  !rawPath||!/^\/actions-results\/[A-Za-z0-9_-]+(?:\/[A-Za-z0-9_.-]+)*$/.test(rawPath)||
+  rawPath!==url.pathname||rawPath.split('/').some(s=>s==='.'||s==='..')||!url.searchParams.get('sig'))fail();
+ return url.href;
+}
+function checkPagination(link,page,total,urlFor){
+ const pages=Math.max(1,Math.ceil(total/100));
+ const found=new Map();
+ if(link){
+  if(link.length>8192)fail();
+  for(const part of link.split(',')){
+   const match=part.trim().match(/^<([^>]+)>; rel="(next|prev|first|last)"$/);
+   if(!match||found.has(match[2]))fail();
+   const expectedPage={next:page+1,prev:page-1,first:1,last:pages}[match[2]];
+   if(expectedPage<1||expectedPage>pages||match[1]!==urlFor(expectedPage))fail();
+   if(match[2]==='next'&&page===pages||match[2]==='prev'&&page===1)fail();
+   found.set(match[2],match[1]);
+  }
+ }
+ if((page<pages)!==found.has('next')||pages===1&&found.size)fail();
+}
+function parseWorkflow(file){
+ if(file?.type!=='file'||file.path!==WORKFLOW_PATH||file.encoding!=='base64'||!positive(file.size)||file.size>65536||!hex(file.sha)||typeof file.content!=='string'||file.content.length>90000)fail();
+ const encoded=file.content.replace(/\n/g,'');
+ if(!/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(encoded))fail();
+ const bytes=Buffer.from(encoded,'base64');
+ if(bytes.length!==file.size||bytes.toString('base64')!==encoded||createHash('sha1').update('blob '+bytes.length+'\0').update(bytes).digest('hex')!==file.sha)fail();
+ const source=new TextDecoder('utf-8',{fatal:true}).decode(bytes);
+ const doc=parseDocument(source,{uniqueKeys:true});
+ if(doc.errors.length||doc.warnings.length)fail();
+ const config=doc.toJS({maxAliasCount:0}),push=config?.on?.push;
+ if(!push||!Array.isArray(push.branches)||push.branches.length!==1||push.branches[0]!=='main'||Object.hasOwn(push,'branches-ignore'))fail();
+ // This checks committed source/event binding; the actual 4C builder must
+ // independently qualify exports, configurations, bindings and role authority.
+ return sha256(bytes);
+}
+function inspectArchive(bytes,signal){
+ return new Promise((resolve,reject)=>{
+  const child=spawn('python3',['-I','-B',fileURLToPath(new URL('../scripts/verify-qa-finite-archive.py',import.meta.url))],{stdio:['pipe','pipe','pipe'],windowsHide:true});
+  let size=0,stderrSize=0,failed=false;const parts=[];
+  const stop=()=>{failed=true;child.kill('SIGKILL');};
+  signal.addEventListener('abort',stop,{once:true});if(signal.aborted)stop();
+  child.on('error',()=>{failed=true;reject(Error('Finite package unavailable'));});
+  child.stdout.on('data',chunk=>{size+=chunk.length;if(size>65536)stop();else parts.push(chunk);});
+  child.stderr.on('data',chunk=>{stderrSize+=chunk.length;if(stderrSize>1024)stop();});
+  child.stdin.on('error',stop);
+  child.on('close',code=>{
+   signal.removeEventListener('abort',stop);
+   if(failed||signal.aborted||code!==0||stderrSize||!size){reject(Error('Finite package unavailable'));return;}
+   try{resolve(JSON.parse(Buffer.concat(parts,size).toString('utf8')));}catch{reject(Error('Finite package unavailable'));}
+  });
+  child.stdin.end(bytes);
+ });
+}
+
+/** Resolve one fixed source package from primary GitHub facts, with no authority
+ * to use it live. A missing future workflow/artifact is simply unavailable. */
+export async function resolveFiniteNativePackage(options={}){
+ let budget;
+ try{
+  if(!options||typeof options!=='object'||Object.keys(options).some(k=>!['sourceRevision','githubToken','fetchImpl','now','signal'].includes(k)))fail();
+  const {sourceRevision,githubToken,fetchImpl=fetch,now=Date.now,signal}=options;
+  if(!hex(sourceRevision)||!isQaGithubBearerTransportValue(githubToken)||typeof fetchImpl!=='function'||typeof now!=='function')fail();
+  budget=createBudget(now,signal);
+  async function request(url,{archive=false,redirect=false,anonymous=false}={}){
+   return budget.bounded(async requestSignal=>{
+    const headers={Accept:archive?'application/octet-stream':'application/vnd.github+json'};
+    if(!anonymous){headers.Authorization='Bearer '+githubToken;headers['X-GitHub-Api-Version']='2022-11-28';}
+    const response=await fetchImpl(url,{method:'GET',headers,redirect:'manual',credentials:'omit',referrerPolicy:'no-referrer',signal:requestSignal});
+    if(requestSignal.aborted||response.headers.get('retry-after')!==null||response.headers.get('x-ratelimit-remaining')==='0')fail();
+    if(redirect){
+     if(response.status!==302)fail();
+     const target=safeRedirect(response.headers.get('location'));
+     response.body?.cancel().catch(()=>{});
+     return target;
+    }
+    if(response.status!==200)fail();
+    const content=await readBody(response,archive?ARCHIVE_LIMIT:JSON_LIMIT,requestSignal);
+    if(archive)return content;
+    return {value:JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(content)),link:response.headers.get('link')};
+   });
+  }
+  const json=async url=>(await request(url)).value;
+  const commits=new Map();
+  async function tree(revision){
+   if(!commits.has(revision)){
+    const primary=await json(API+'/git/commits/'+revision);
+    if(primary?.sha!==revision||!hex(primary.tree?.sha))fail();
+    commits.set(revision,primary.tree.sha);
+   }
+   return commits.get(revision);
+  }
+  const sourceTree=await tree(sourceRevision);
+  const workflowHash=parseWorkflow(await json(API+'/contents/'+WORKFLOW_PATH+'?ref='+sourceRevision));
+  const workflow=await json(WORKFLOW_API);
+  if(!positive(workflow?.id)||workflow.path!==WORKFLOW_PATH||workflow.state!=='active')fail();
+  const runURL=page=>WORKFLOW_API+'/runs?head_sha='+sourceRevision+'&branch=main&event=push&status=success&per_page=100&page='+page;
+  let total,all=[];const seen=new Set();
+  for(let page=1;page<=2;page++){
+   const {value,link}=await request(runURL(page));
+   if(!Number.isSafeInteger(value?.total_count)||value.total_count<0||value.total_count>200||!Array.isArray(value.workflow_runs))fail();
+   if(total===undefined)total=value.total_count;
+   if(value.total_count!==total||value.workflow_runs.length!==Math.min(100,total-(page-1)*100))fail();
+   checkPagination(link,page,total,runURL);
+   for(const run of value.workflow_runs){if(!positive(run?.id)||seen.has(run.id))fail();seen.add(run.id);}
+   all=all.concat(value.workflow_runs);
+   if(all.length===total)break;
+  }
+  if(all.length!==total)fail();
+  const eligible=all.filter(r=>r.workflow_id===workflow.id&&r.path===WORKFLOW_PATH&&r.head_sha===sourceRevision&&r.head_branch==='main'&&r.event==='push'&&r.status==='completed'&&r.conclusion==='success'&&r.run_attempt===1&&sameRepository(r.repository)&&sameRepository(r.head_repository));
+  if(eligible.length!==1)fail();
+  const run=eligible[0],artifactName='afw-finite-native-package-'+sourceRevision;
+  const {value:listing,link}=await request(API+'/actions/runs/'+run.id+'/artifacts?per_page=100&page=1');
+  if(link||!Number.isSafeInteger(listing?.total_count)||listing.total_count<0||listing.total_count>100||!Array.isArray(listing.artifacts)||listing.artifacts.length!==listing.total_count)fail();
+  const artifactIDs=new Set();
+  for(const a of listing.artifacts){if(!positive(a?.id)||artifactIDs.has(a.id))fail();artifactIDs.add(a.id);}
+  const matches=listing.artifacts.filter(a=>a.name===artifactName);
+  if(matches.length!==1)fail();
+  const artifact=matches[0],ar=artifact.workflow_run,expiry=Date.parse(artifact.expires_at);
+  if(artifact.expired!==false||!Number.isSafeInteger(expiry)||expiry<=budget.check()||!positive(artifact.size_in_bytes)||artifact.size_in_bytes>ARCHIVE_LIMIT||
+   typeof artifact.digest!=='string'||!/^sha256:[a-f0-9]{64}$/.test(artifact.digest)||
+   ar?.id!==run.id||ar.repository_id!==REPOSITORY_ID||ar.head_repository_id!==REPOSITORY_ID||ar.head_sha!==sourceRevision||ar.head_branch!=='main')fail();
+  const target=await request(API+'/actions/artifacts/'+artifact.id+'/zip',{redirect:true,archive:true});
+  const archive=await request(target,{archive:true,anonymous:true});
+  if(archive.length!==artifact.size_in_bytes||'sha256:'+sha256(archive)!==artifact.digest)fail();
+  const parsed=await budget.bounded(childSignal=>inspectArchive(archive,childSignal));
+  const manifest=validateFinitePackageManifest(parsed.manifest);
+  if(encodeFinitePackageManifest(manifest)!==parsed.manifestText||manifest.sourceRevision!==sourceRevision||manifest.sourceTree!==sourceTree||manifest.buildWorkflowHash!==workflowHash)fail();
+  if(!parsed.files||Object.keys(parsed.files).length!==ROLES.length)fail();
+  const receipts=new Set();
+  for(const role of ROLES){
+   const descriptor=manifest.modules[role],file=parsed.files[role+'/'+descriptor.module.name];
+   const provenance=descriptor.provenance;
+   if(provenance.kind==='compiled-source.v1'){
+    if(provenance.sourceTree!==await tree(provenance.sourceRevision))fail();
+   }else{
+    const approved=QA_CLOUD_CLOSED_PINS[provenance.receiptKey];
+    if(descriptor.module.name!==approved.module.name||descriptor.module.sha256!==approved.module.sha256||descriptor.module.bytes!==approved.module.bytes)fail();
+    if(!receipts.has(provenance.receiptPath)){
+     const receipt=await json(API+'/contents/'+provenance.receiptPath+'?ref='+sourceRevision);
+     finiteSourceFile(receipt,provenance.receiptPath);
+     if(receipt.sha!==provenance.receiptBlobSha)fail();receipts.add(provenance.receiptPath);
+    }
+    if(provenance.kind==='historical-source-pin.v1'){
+     const path='scripts/mcp-confirmation-frozen-artifact.json',receipt=finiteSourceFile(await json(API+'/contents/'+path+'?ref='+sourceRevision),path),frozen=JSON.parse(receipt.text);
+     if(frozen.baseVersionId!==provenance.versionId||frozen.sourceRevision!==provenance.sourceRevision||frozen.sourceTree!==provenance.sourceTree||frozen.workerHash!==descriptor.module.sha256||frozen.workerBytes!==descriptor.module.bytes||provenance.sourceTree!==await tree(provenance.sourceRevision))fail();
+    }
+   }
+   if(file?.sha256!==descriptor.module.sha256||file.bytes!==descriptor.module.bytes)fail();
+  }
+  budget.check();
+  return Object.freeze({build:Object.freeze({workflowPath:WORKFLOW_PATH,runId:run.id,attempt:1,artifactId:artifact.id,artifactName,artifactDigest:artifact.digest,manifestHash:hashFinitePackageManifest(manifest)}),manifest});
+ }catch{fail();}finally{budget?.close();}
+}

~~~~~~~~~~

## lib/mcp-qa-finite-policy-configuration.mjs

~~~~~~~~~~diff
diff --git a/lib/mcp-qa-finite-policy-configuration.mjs b/lib/mcp-qa-finite-policy-configuration.mjs
--- /dev/null
+++ b/lib/mcp-qa-finite-policy-configuration.mjs
@@ -0,0 +1,48 @@
+import {finiteFields as fields,finiteData as data} from './mcp-finite-evidence.mjs';
+import {qualifyFiniteConnectionProfile} from './mcp-qa-finite-connection-profile.mjs';
+import {finitePublicProfileTemplate,projectFinitePublicConfiguration} from './mcp-qa-finite-profile.mjs';
+import {parseDossierEventPolicyFields,parseDossierRetirementFields} from './dossier-event-policy-data.mjs';
+import {parseOwnPermissionWithdrawalPolicy} from './mcp-own-permission-withdrawal-policy.mjs';
+
+const fail=()=>{throw Error('Finite policy configuration unavailable');};
+const canonical=v=>JSON.stringify(v,(_,x)=>x&&typeof x==='object'&&!Array.isArray(x)?Object.fromEntries(Object.entries(x).sort(([a],[b])=>a<b?-1:a>b?1:0)):x);
+const policyNames=['AFW_DOSSIER_EVENTS_POLICY','AFW_DOSSIER_PERMISSION_WITHDRAWAL_POLICY','AFW_DOSSIER_RETIREMENT_POLICY','AFW_DOSSIER_SUCCESSOR_POLICY','AFW_OAUTH_PILOT_CLIENT_ID','AFW_OAUTH_PILOT_PROJECT_ID'];
+const preparationNames=['ACCESS_AUD','ACCESS_TEAM_DOMAIN','AFW_DOSSIER_MONITORING_OWNER_POLICY','AFW_OAUTH_PILOT_EXPIRES_AT','DELEGATED_RATE_LIMITER'];
+
+/** Constructs only a full normalized DATA candidate; no source or grant authority. */
+export function buildFinitePolicySetupConfiguration(input){
+ const {prearmConfiguration,policies}=fields(data(input),['prearmConfiguration','policies']);
+ const raw=fields(policies,policyNames);
+ for(const name of policyNames)if(typeof raw[name]!=='string'||!raw[name])fail();
+ if(Buffer.byteLength(raw.AFW_DOSSIER_RETIREMENT_POLICY)>4096)fail();
+ const prearm=qualifyFiniteConnectionProfile({phase:'closed_ui',metadata:prearmConfiguration});
+ const template=finitePublicProfileTemplate('canaryLive');
+ const originalBinding=name=>prearm.bindings.find(b=>b.name===name);
+ if(raw.AFW_OAUTH_PILOT_CLIENT_ID!==originalBinding('AFW_OAUTH_PILOT_CLIENT_ID').text||
+    raw.AFW_OAUTH_PILOT_PROJECT_ID!==originalBinding('AFW_OAUTH_PILOT_PROJECT_ID').text)fail();
+ parseDossierEventPolicyFields(raw.AFW_DOSSIER_EVENTS_POLICY,true);
+ parseOwnPermissionWithdrawalPolicy(raw.AFW_DOSSIER_PERMISSION_WITHDRAWAL_POLICY);
+ const retired=parseDossierRetirementFields(raw.AFW_DOSSIER_RETIREMENT_POLICY);
+ parseDossierEventPolicyFields(JSON.stringify(retired.policy),false);
+ const successor=fields(data(JSON.parse(raw.AFW_DOSSIER_SUCCESSOR_POLICY)),['scope','original','candidate','publication']);
+ fields(successor.scope,['accountId','workerName','namespaceId','applicationId','ownerRef','projectRef','resource']);
+ fields(successor.original,['containerId','applicationId','programHash','sourceRevision']);
+ fields(successor.candidate,['trialId','programHash','sourceRevision','startAt','expiresAt','budget']);
+ fields(successor.publication,['artifactKey','workerHash','activationKey']);
+ for(const key of Object.keys(template).filter(k=>k!=='bindings'))if(canonical(prearm[key])!==canonical(template[key]))fail();
+ const bindings=template.bindings.map(rule=>{
+  if(rule.privateSlot)return{name:rule.name,type:'plain_text',text:raw[rule.name]};
+  if(rule.type!=='plain_text'){
+   const holder=originalBinding(rule.name);
+   if(canonical(holder)!==canonical(rule))fail();
+   return holder;
+  }
+  return rule;
+ });
+ const before=new Set(prearm.bindings.map(b=>b.name)),after=new Set(bindings.map(b=>b.name));
+ if(canonical([...before].filter(n=>!after.has(n)).sort())!==canonical(preparationNames)||
+    [...after].some(n=>!before.has(n)))fail();
+ const configuration=data({...Object.fromEntries(Object.keys(template).filter(k=>k!=='bindings').map(k=>[k,template[k]])),bindings});
+ projectFinitePublicConfiguration({role:'canaryLive',metadata:configuration});
+ return configuration;
+}

~~~~~~~~~~

## lib/mcp-qa-finite-policy-journal.mjs

~~~~~~~~~~diff
diff --git a/lib/mcp-qa-finite-policy-journal.mjs b/lib/mcp-qa-finite-policy-journal.mjs
--- /dev/null
+++ b/lib/mcp-qa-finite-policy-journal.mjs
@@ -0,0 +1,118 @@
+import {encodeFinitePreparationRecord as encode,decodeFinitePreparationRecord as decode,hashFinitePreparationRecord as hash,validateFinitePolicyEffectIdentity as identityRecord,hashFinitePolicyEffectIdentity as identityHash} from './mcp-qa-finite-preparation-records.mjs';
+class InvalidJournal extends Error{constructor(){super('Finite policy journal unavailable');}}
+const fail=()=>{throw new InvalidJournal();};
+const observation=(status,recordHash)=>Object.freeze({status,recordHash});
+const writerHead='afw.finite-policy-effect.v1:writer-head';
+const hex=v=>typeof v==='string'&&/^[a-f0-9]{64}$/.test(v);
+export function createFinitePolicyEffectJournal({storage,identity,now}){
+ if(!storage||typeof storage.transaction!=='function'||typeof now!=='function')fail();
+ const own=identityRecord(identity),ih=identityHash(own),prefix='afw.finite-policy-effect.v1:'+ih+':';
+ const uploadPrefix='afw.finite-policy-effect.v1:'+identityHash({...own,effect:'upload'})+':';
+ const kind=own.kind==='connection'?'Connection':'Policy';
+ const current=lease=>{
+  if(!lease||Object.getPrototypeOf(lease)!==Object.prototype||Reflect.ownKeys(lease).length!==2||['signal','assertCurrent'].some(k=>{const d=Object.getOwnPropertyDescriptor(lease,k);return !d?.enumerable||!Object.hasOwn(d,'value');})||!(lease.signal instanceof AbortSignal)||lease.signal.aborted||typeof lease.assertCurrent!=='function')fail();
+  try{lease.assertCurrent();}catch{fail();}
+  const at=now();if(!Number.isSafeInteger(at)||at<0||at>8640000000000000)fail();return at;
+ };
+ const checked=(type,v)=>{try{return decode(type,encode(type,v));}catch{fail();}};
+ function matches(send,expected=own){
+  if(send.sourceRevision!==expected.sourceRevision||send.effect!==expected.effect)fail();
+  if(expected.kind==='connection'){if(send.preconnectionId!==expected.preconnectionId||send.stage!==expected.stage)fail();}
+  else if(send.intentId!==expected.intentId||send.setupInstanceId!==expected.setupInstanceId)fail();
+ }
+ async function transact(lease,fn,mutation=true){
+  current(lease);let rh=null;
+  try{
+   const result=await storage.transaction(async tx=>{
+    current(lease);
+    const io={
+     async raw(key){current(lease);const value=await tx.get(key);current(lease);return value;},
+     async head(value){current(lease);await tx.put(writerHead,JSON.stringify(value));current(lease);},
+     async get(key,type){current(lease);const v=await tx.get(key);current(lease);if(v===undefined)return null;try{return decode(type,v);}catch{fail();}},
+     async put(key,type,value){current(lease);await tx.put(key,encode(type,value));current(lease);}
+    };
+    const result=await fn(io,h=>{rh=h;});current(lease);return result;
+   });
+   try{current(lease);}catch(e){if(!mutation)throw e;return observation('uncertain',rh);}
+   return result;
+  }catch(e){if(e instanceof InvalidJournal||!mutation)throw e;return observation('uncertain',rh);}
+ }
+ async function state(io,base=prefix){
+  const send=await io.get(base+'send',kind+'Send'),ack=await io.get(base+'ack',kind+'Ack'),receipt=await io.get(base+'receipt',kind+'Receipt'),failure=await io.get(base+'failure','Failure');
+  const expected=base===prefix?own:{...own,effect:'upload'};
+  if(send)matches(send,expected);
+  if((ack&&!send)||(receipt&&(!send||!ack))||failure&&failure.identityHash!==identityHash(expected))fail();
+  if(ack&&(ack.sendHash!==hash(kind+'Send',send)||ack.acknowledgedAt<send.issuedAt||ack.acknowledgedAt>=send.deadline))fail();
+  if(receipt&&(expected.effect!=='activation'||receipt.deploymentId!==ack.resourceId||receipt.sourceRevision!==expected.sourceRevision))fail();
+  return Object.freeze({state:failure?'admin_pending':receipt?'installed':ack?'acknowledged':send?'issued':'absent',send,ack,receipt});
+ }
+ async function append(io,key,type,value,h){
+  const rh=hash(type,value);h(rh);const old=await io.get(key,type);
+  if(old){if(encode(type,old)!==encode(type,value))fail();return observation('existing',rh);}
+  await io.put(key,type,value);return observation('recorded',rh);
+ }
+
+ async function previousWriter(io){
+  const raw=await io.raw(writerHead);if(raw===undefined)return;
+  let head;try{head=JSON.parse(raw);}catch{fail();}
+  if(!head||Object.getPrototypeOf(head)!==Object.prototype||Object.keys(head).length!==2||!hex(head.identityHash)||!hex(head.sendHash)||JSON.stringify({identityHash:head.identityHash,sendHash:head.sendHash})!==raw)fail();
+  const key='afw.finite-policy-effect.v1:'+head.identityHash+':',sendRaw=await io.raw(key+'send');
+  let parsed;try{parsed=JSON.parse(sendRaw);}catch{fail();}
+  const priorKind=parsed.purpose==='afw.finite-connection-send.v1'?'Connection':parsed.purpose==='afw.finite-policy-send.v1'?'Policy':null;
+  if(!priorKind)fail();
+  const send=decode(priorKind+'Send',sendRaw),identity=priorKind==='Connection'?{kind:'connection',preconnectionId:send.preconnectionId,sourceRevision:send.sourceRevision,stage:send.stage,effect:send.effect}:{kind:'policy',intentId:send.intentId,sourceRevision:send.sourceRevision,setupInstanceId:send.setupInstanceId,effect:send.effect};
+  if(identityHash(identity)!==head.identityHash||hash(priorKind+'Send',send)!==head.sendHash)fail();
+  const ack=await io.get(key+'ack',priorKind+'Ack');
+  if(!ack||ack.sendHash!==head.sendHash||ack.acknowledgedAt<send.issuedAt||ack.acknowledgedAt>=send.deadline||ack.acknowledgedAt>now()||await io.raw(key+'failure')!==undefined)fail();
+ }
+
+ return Object.freeze({
+  async issue(value,lease){
+   const send=checked(kind+'Send',value);matches(send);
+   return transact(lease,async(io,h)=>{
+    const old=await state(io);
+    if(old.send){if(encode(kind+'Send',old.send)!==encode(kind+'Send',send))fail();h(hash(kind+'Send',old.send));return observation('existing',hash(kind+'Send',old.send));}
+    const at=current(lease);if(old.state!=='absent'||send.issuedAt>at||at>=send.deadline)fail();
+    if(own.effect==='activation'){
+     const upload=await state(io,uploadPrefix);
+     if(upload.state!=='acknowledged'||upload.send.contextHash!==send.contextHash||send.issuedAt<upload.ack.acknowledgedAt)fail();
+     if(own.kind==='connection'&&(upload.send.baselineVersionId!==send.baselineVersionId||upload.send.baselineDeploymentId!==send.baselineDeploymentId))fail();
+    }
+    await previousWriter(io);
+    const result=await append(io,prefix+'send',kind+'Send',send,h);
+    if(result.status!=='recorded')fail();
+    await io.head({identityHash:ih,sendHash:hash(kind+'Send',send)});
+    return result;
+   });
+  },
+  async acknowledge(value,lease){
+   const ack=checked(kind+'Ack',value);
+   return transact(lease,async(io,h)=>{
+    const s=await state(io),at=current(lease);
+    if(s.ack){if(encode(kind+'Ack',s.ack)!==encode(kind+'Ack',ack))fail();h(hash(kind+'Ack',s.ack));return observation('existing',hash(kind+'Ack',s.ack));}
+    if(s.state!=='issued'||ack.sendHash!==hash(kind+'Send',s.send)||ack.acknowledgedAt<s.send.issuedAt||ack.acknowledgedAt>at||ack.acknowledgedAt>=s.send.deadline||at>=s.send.deadline)fail();
+    return append(io,prefix+'ack',kind+'Ack',ack,h);
+   });
+  },
+  async finish(value,lease){
+   const r=checked(kind+'Receipt',value);if(own.effect!=='activation')fail();
+   return transact(lease,async(io,h)=>{
+    const s=await state(io),u=await state(io,uploadPrefix),at=current(lease),completed=r.installedAt??r.completedAt;
+    if(s.receipt){if(encode(kind+'Receipt',s.receipt)!==encode(kind+'Receipt',r))fail();h(hash(kind+'Receipt',r));return observation('existing',hash(kind+'Receipt',r));}
+    if(s.state!=='acknowledged'||u.state!=='acknowledged'||r.sourceRevision!==own.sourceRevision||r.versionId!==u.ack.resourceId||r.deploymentId!==s.ack.resourceId||completed<s.ack.acknowledgedAt||completed<u.ack.acknowledgedAt||completed>at||at>=s.send.deadline||u.send.contextHash!==s.send.contextHash)fail();
+    if(own.kind==='connection'){if(r.preconnectionId!==own.preconnectionId||r.stage!==own.stage||r.baselineVersionId!==s.send.baselineVersionId||r.baselineDeploymentId!==s.send.baselineDeploymentId)fail();}
+    else if(r.intentId!==own.intentId||r.setupInstanceId!==own.setupInstanceId||r.contextHash!==s.send.contextHash)fail();
+    return append(io,prefix+'receipt',kind+'Receipt',r,h);
+   });
+  },
+  async markAdminPending(value,lease){
+   if(!value||Object.getPrototypeOf(value)!==Object.prototype||Reflect.ownKeys(value).length!==2||['reasonCode','observedAt'].some(k=>{const d=Object.getOwnPropertyDescriptor(value,k);return !d?.enumerable||!Object.hasOwn(d,'value');}))fail();
+   const record=checked('Failure',{purpose:'afw.finite-policy-failure.v1',identityHash:ih,reasonCode:value.reasonCode,observedAt:value.observedAt});
+   return transact(lease,async(io,h)=>{
+    const s=await state(io);if(record.observedAt>current(lease)||s.state==='installed')fail();
+    return append(io,prefix+'failure','Failure',record,h);
+   });
+  },
+  async read(lease){return transact(lease,io=>state(io),false);}
+ });
+}

~~~~~~~~~~

## lib/mcp-qa-finite-policy-setup-source.mjs

~~~~~~~~~~diff
diff --git a/lib/mcp-qa-finite-policy-setup-source.mjs b/lib/mcp-qa-finite-policy-setup-source.mjs
--- /dev/null
+++ b/lib/mcp-qa-finite-policy-setup-source.mjs
@@ -0,0 +1,12 @@
+/** Fixed source boundaries only. T5 must prove actual original native entry/
+ * forwarding, exact Workflow primary identity, M/QA, original command/seed,
+ * owner/program/history, custody, bytes/exposure and all writers. Matching
+ * metadata/refs never establishes provenance. No registration or caller DTO. */
+export async function readPrivateQaFinitePolicyEntry({env,event,step},originalLease){
+ void env;void event;void step;void originalLease;
+ throw Error('Finite policy native entry unavailable');
+}
+export async function readPrivateQaFinitePolicySource({ctx,env,intentId,sourceRevision},originalLease){
+ void ctx;void env;void intentId;void sourceRevision;void originalLease;
+ throw Error('Finite policy source unavailable');
+}

~~~~~~~~~~

## lib/mcp-qa-finite-policy-setup.mjs

~~~~~~~~~~diff
diff --git a/lib/mcp-qa-finite-policy-setup.mjs b/lib/mcp-qa-finite-policy-setup.mjs
--- /dev/null
+++ b/lib/mcp-qa-finite-policy-setup.mjs
@@ -0,0 +1,148 @@
+import {createHash} from 'node:crypto';
+import {readPrivateQaFinitePolicyEntry} from './mcp-qa-finite-policy-setup-source.mjs';
+import {readFiniteOwnerSetupFacts} from './mcp-qa-finite-owner-preparation.mjs';
+import {createFiniteOwnerPreparationStore} from './mcp-qa-finite-preparation-store.mjs';
+import {createFinitePolicySetupTransport} from './mcp-qa-finite-policy-transport.mjs';
+import {observeFiniteOwnerStageWork,retainFiniteOwnerStagePromise as track} from './mcp-qa-finite-stage-work.mjs';
+import {hashFinitePreparationRecord as hash,encodeFinitePreparationRecord as encode,decodeFinitePreparationRecord as decode} from './mcp-qa-finite-preparation-records.mjs';
+import {finiteFields as fields,finiteData as data,finiteHex as hex,finiteTime as time} from './mcp-finite-evidence.mjs';
+import {validateReleaseOperatorBundle,RELEASE_TARGET} from './mcp-release-operator-policy.mjs';
+import {resolveSuccessorPreparation} from './mcp-successor-manifest.mjs';
+import {prepareKnownCancellationHistory} from './mcp-successor-cancellation-history.mjs';
+import {parseOwnPermissionWithdrawalPolicy} from './mcp-own-permission-withdrawal-policy.mjs';
+import {finiteActivationConfigurationHash} from './mcp-activation-observer.mjs';
+import {restorationConfigurationHash} from './mcp-restoration-configuration.mjs';
+import {projectFinitePublicConfiguration,finitePublicStaticExpectation} from './mcp-qa-finite-profile.mjs';
+const fail=()=>{throw Error('Finite private policy setup unavailable');};
+const pending=()=>Object.freeze({status:'admin_pending',mayRetry:false,operationalReadiness:false});
+const canonical=v=>JSON.stringify(v,(_,x)=>x&&typeof x==='object'&&!Array.isArray(x)?Object.fromEntries(Object.entries(x).sort(([a],[b])=>a<b?-1:a>b?1:0)):x);
+const sha=v=>createHash('sha256').update(v).digest('hex'),digest=(d,v)=>sha(d+'\n'+canonical(v));
+const parents=new WeakMap(),admissions=new WeakMap(),nativeTime=Date.prototype.getTime;
+const nativeKeys=['setupInstanceId','sourceRevision','qaVersionId','eventTimestamp','queuedAt','startedAt','T0'];
+const current=l=>{if(l?.signal?.aborted||typeof l?.assertCurrent!=='function')fail();l.assertCurrent();};
+export const FINITE_POLICY_SETUP_OPERATION='finite_private_policy_setup';
+export function finitePolicySetupInstanceId(refs){const r=fields(refs,['intentId','sourceRevision']);if(!hex(r.intentId)||!hex(r.sourceRevision,40))fail();return 'afw-finite-policy-'+digest('afw.finite-private-policy-setup.v1',r);}
+function clock(initialEnd,check=()=>{}){
+ const entered=Date.now(),mono=performance.now(),controller=new AbortController();let end=Math.min(initialEnd,entered+30000),last=entered,lastMono=mono,closed=false,timer;
+ const stop=()=>controller.abort();
+ const lease=Object.freeze({signal:controller.signal,assertCurrent(){
+  check();const at=Date.now(),m=performance.now();
+  if(closed||controller.signal.aborted||!time(at)||at<last||at>=end||!Number.isFinite(m)||m<lastMono||m-mono>=end-entered)fail();last=at;lastMono=m;
+ }});
+ const narrow=until=>{current(lease);if(!time(until))fail();end=Math.min(end,until);clearTimeout(timer);current(lease);timer=setTimeout(stop,Math.max(1,end-Date.now()));};
+ const child=async fn=>{
+  current(lease);const wall=Date.now(),m0=performance.now(),childEnd=Math.min(end,wall+5000),c=new AbortController();let alive=true,t,abort;
+  const l=Object.freeze({signal:c.signal,assertCurrent(){current(lease);const at=Date.now(),m=performance.now();if(!alive||c.signal.aborted||at<wall||at>=childEnd||m<m0||m-m0>=childEnd-wall)fail();}});
+  const work=track(Promise.resolve().then(()=>{current(l);return fn(l,childEnd);}));
+  try{return await Promise.race([work,new Promise((_,reject)=>{abort=()=>{alive=false;c.abort();reject(Error('Finite setup parent expired'));};lease.signal.addEventListener('abort',abort,{once:true});t=setTimeout(abort,Math.max(1,childEnd-Date.now()));})]).then(v=>{current(l);return v;});}
+  finally{alive=false;c.abort();clearTimeout(t);lease.signal.removeEventListener('abort',abort);}
+ };
+ const parent={lease,child,narrow,end:()=>end,async wait(promise){
+  let abort;try{return await Promise.race([track(promise),new Promise((_,reject)=>{abort=()=>reject(Error('Finite setup parent expired'));lease.signal.addEventListener('abort',abort,{once:true});if(lease.signal.aborted)abort();})]).then(v=>{current(lease);return v;});}
+  finally{lease.signal.removeEventListener('abort',abort);}
+ },finish(){closed=true;clearTimeout(timer);controller.abort();parents.delete(lease);admissions.delete(lease);}};
+ parents.set(lease,parent);narrow(end);return parent;
+}
+/** INTERNAL narrowing only: cannot create a parent/admission or extend a clock. */
+export function narrowFinitePolicySetupClock(originalLease,native,refs,env){
+ current(originalLease);const parent=parents.get(originalLease);if(!parent)fail();
+ const n=fields(native,nativeKeys),at=Date.now();
+ if(n.setupInstanceId!==finitePolicySetupInstanceId(refs)||n.sourceRevision!==refs.sourceRevision||n.qaVersionId!==env.AFW_QA_VERSION?.id||['eventTimestamp','queuedAt','startedAt','T0'].some(k=>!time(n[k]))||n.queuedAt>n.startedAt||n.startedAt>at||n.eventTimestamp>at||n.T0>n.queuedAt||n.T0>n.eventTimestamp)fail();
+ parent.narrow(Math.min(n.eventTimestamp,n.queuedAt)+30000);parent.narrow(n.T0+50000);
+}
+/** Consume-only fixed transport handoff; no setter, lease or capability mint. */
+export function consumeFinitePolicySetupAdmission({ctx,env,refs},originalLease){
+ const a=admissions.get(originalLease);admissions.delete(originalLease);current(originalLease);
+ if(!a||a.ctx!==ctx||a.env!==env||a.storage!==ctx.storage||a.db!==env.RELEASE_DB||canonical(a.refs)!==canonical(fields(refs,['intentId','sourceRevision'])))fail();
+ current(a.lease);return a;
+}
+function derive(facts,refs,binding,env){
+ const {source,material,notice}=facts,p=facts.selected.preparation,T0=material.primaryEvidence.T0,N1=T0+300000,C0=T0+240000,C1=T0+420000;
+ const o=fields(source.originalContext,['artifact','scope','original','publication','cancellations','retirementPolicy','withdrawalRequestId','saveIdempotencyKey','legacy','trialId']);
+ const a=fields(o.artifact,['script','sourceRevision','sourceTree','programHash','workerHash','sourceCheck']),descriptor=material.seed.manifest.modules.canaryLive.module;
+ fields(descriptor,['name','sha256','bytes','exports']);fields(source.bytes,['baseline','rollback','candidate']);
+ const candidateBytes=source.bytes.candidate;
+ if(typeof a.script!=='string'||Buffer.byteLength(a.script)>2097152||!(candidateBytes instanceof Uint8Array)||candidateBytes.byteLength!==descriptor.bytes||descriptor.name!=='index.mjs'||sha(candidateBytes)!==descriptor.sha256||a.workerHash!==descriptor.sha256||sha(a.script)!==a.workerHash||!Buffer.from(a.script).equals(Buffer.from(candidateBytes))||a.sourceRevision!==refs.sourceRevision||a.sourceTree!==material.seed.manifest.sourceTree||a.sourceCheck!=='git-inputs-before-after-v1'||!hex(a.programHash)||!hex(o.trialId))fail();
+ for(const role of ['baseline','rollback']){
+  fields(source[role],['versionId','deploymentId','module','configuration']);
+  const bytes=source.bytes[role],m=fields(source[role].module,['name','sha256','bytes']);
+  if(!(bytes instanceof Uint8Array)||bytes.byteLength>3145728||bytes.byteLength!==m.bytes||sha(bytes)!==m.sha256)fail();
+ }
+ const {script:unused,...artifactIdentity}=a;void unused;
+ const projection=data({...o,artifact:artifactIdentity});
+ if(digest('afw.finite-original-context.v1',projection)!==p.programContext.originalContextHash||o.original.programHash!==p.programContext.programHash||o.original.sourceRevision!==p.programContext.sourceRevision)fail();
+ if(source.baseline.versionId!==facts.receipt.versionId||source.baseline.deploymentId!==facts.receipt.deploymentId||source.baseline.module.sha256!==facts.receipt.moduleHash||finiteActivationConfigurationHash(source.baseline.configuration)!==facts.receipt.configurationHash)fail();
+ validateReleaseOperatorBundle({artifact:a,policy:{operation:'publish',startAt:T0,expiresAt:N1,pins:{...RELEASE_TARGET,baseVersionId:source.baseline.versionId}}});
+ const scope=fields(o.scope,['accountId','workerName','namespaceId','applicationId','ownerRef','projectRef','resource']),original=fields(o.original,['containerId','applicationId','programHash','sourceRevision']),publication=fields(o.publication,['artifactKey','workerHash','activationKey']);
+ if(scope.accountId!==RELEASE_TARGET.accountId||scope.workerName!==RELEASE_TARGET.workerName||scope.namespaceId!==RELEASE_TARGET.namespaceId||scope.applicationId!==RELEASE_TARGET.namespaceId||env.AFW_RELEASE_EVENTS_NODE.idFromName('afw-own-event-one-occurrence-v1').toString()!==original.containerId||scope.resource!==p.connection.resource||publication.workerHash!==a.workerHash||publication.artifactKey!==sha(JSON.stringify([RELEASE_TARGET.accountId,RELEASE_TARGET.workerName,a.workerHash]))||!hex(publication.activationKey))fail();
+ const candidate={trialId:o.trialId,programHash:a.programHash,sourceRevision:a.sourceRevision,startAt:T0,expiresAt:N1,budget:1};
+ const resolved=resolveSuccessorPreparation({scope,original,candidate,namespace:env.AFW_RELEASE_EVENTS_NODE});
+ const history=JSON.stringify({purpose:'afw.successor-known-cancellations.v1',currentGrant:{grantId:p.connection.grantId,consentSequence:notice.sequence,consentRevision:notice.revision,issuedAt:notice.issuedAt,expiresAt:notice.expiresAt},cancellations:o.cancellations});
+ prepareKnownCancellationHistory(history,candidate);
+ const events={grantId:p.connection.grantId,subject:p.owner.subject,projectId:p.project.projectId,clientId:p.connection.clientId,resource:p.connection.resource,startAt:T0,expiresAt:N1};
+ if(['grantId','subject','projectId','clientId','resource'].some(k=>typeof events[k]!=='string'||!events[k].length||events[k].length>200||events[k].trim()!==events[k]))fail();
+ const withdrawal=JSON.stringify({purpose:'afw.private-permission-withdrawal.v1',requestId:o.withdrawalRequestId,startAt:C0,expiresAt:C1,originalConsent:{sequence:notice.sequence,revision:notice.revision,issuedAt:notice.issuedAt,expiresAt:notice.expiresAt},containerId:resolved.candidate.containerId,programHash:a.programHash,sourceRevision:a.sourceRevision});
+ parseOwnPermissionWithdrawalPolicy(withdrawal);
+ if(typeof o.retirementPolicy!=='string'||!o.retirementPolicy||Buffer.byteLength(o.retirementPolicy)>4096)fail();
+ const policies={AFW_DOSSIER_EVENTS_POLICY:JSON.stringify(events),AFW_DOSSIER_PERMISSION_WITHDRAWAL_POLICY:withdrawal,AFW_DOSSIER_RETIREMENT_POLICY:o.retirementPolicy,AFW_DOSSIER_SUCCESSOR_POLICY:JSON.stringify({scope,original,candidate,publication}),AFW_OAUTH_PILOT_CLIENT_ID:p.connection.clientId,AFW_OAUTH_PILOT_PROJECT_ID:p.project.projectId};
+ const configuration=data({...source.baseline.configuration,bindings:source.baseline.configuration.bindings.map(b=>Object.hasOwn(policies,b.name)?{name:b.name,type:'plain_text',text:policies[b.name]}:b)});
+ projectFinitePublicConfiguration({role:'canaryLive',metadata:configuration});
+ const publicStatic=finitePublicStaticExpectation('canaryLive');if(canonical(material.seed.manifest.modules.canaryLive.publicStatic)!==canonical(publicStatic))fail();
+ const expectedFull={activationHash:finiteActivationConfigurationHash(configuration),restorationHash:restorationConfigurationHash(configuration),bindingsHash:sha(canonical([...configuration.bindings].sort((a,b)=>a.name<b.name?-1:a.name>b.name?1:0)))};
+ const raw={purpose:'afw.finite-policy-context.v1',...refs,seedHash:material.seedHash,preparationHash:p.preparationHash,selectionHash:facts.selected.selection.selectionHash,bindingHash:hash('Binding',binding),T0,C0,C1,ownerPreparation:p,baselineProjectRevision:p.project.revision,goal:p.goal,saveIdempotencyKey:o.saveIdempotencyKey,legacy:o.legacy,policies,baseline:source.baseline,rollback:source.rollback,expectedFull};
+ const context=decode('SetupContext',encode('SetupContext',raw));
+ return {context,candidate:{module:{name:descriptor.name,sha256:descriptor.sha256,bytes:descriptor.bytes},configuration,publicStatic},artifact:a,namedContext:data({publication,trialId:o.trialId}),cancellationHistory:history};
+}
+/** The only actual setup producer. Refs are selectors, never native authority. */
+export function createPrivateQaFinitePolicySetup({ctx,env}){
+ return Object.freeze({async run(refs){
+  let parent;
+  try{
+   refs=fields(refs,['intentId','sourceRevision']);const setupInstanceId=finitePolicySetupInstanceId(refs),storage=ctx.storage,db=env.RELEASE_DB,version=env.AFW_QA_VERSION?.id;
+   parent=clock(Date.now()+30000,()=>{if(ctx.storage!==storage||env.RELEASE_DB!==db||env.AFW_QA_VERSION?.id!==version)fail();});
+   // Original invocation lineage only: this denial scope grants no send authority.
+   const invocation=Object.freeze({lease:parent.lease});
+   return await observeFiniteOwnerStageWork({ctx,env,admission:invocation,originalLease:parent.lease},async()=>{
+    const facts=await parent.child(()=>readFiniteOwnerSetupFacts({ctx,env,...refs},parent.lease));current(parent.lease);
+    const p=facts.selected.preparation;parent.narrow(Math.min(p.expiresAt,p.owner.accessExpiresAt,p.connection.permissionExpiresAt,p.approval.expiresAt,facts.ownerSource.window.expiresAt,facts.material.primaryEvidence.R1));
+    const store=createFiniteOwnerPreparationStore({storage,now:Date.now});
+    if(await parent.child(()=>track(storage.get('afw.qa-finite-trial.v1:head')))!==undefined)fail();
+    const binding={purpose:'afw.finite-owner-binding.v1',prepId:p.prepId,preparationHash:p.preparationHash,selectionHash:facts.selected.selection.selectionHash,...refs,T0:facts.material.primaryEvidence.T0,boundAt:Date.now()};
+    const derived=derive(facts,refs,binding,env);
+    const saved=await parent.child(l=>track(store.bindSelection(binding,l)));if(saved.status!=='recorded'||saved.recordHash!==hash('Binding',binding))fail();
+    const selected=await parent.child(l=>track(store.readSelected({sourceRevision:refs.sourceRevision},l)));
+    if(!selected||canonical(selected.binding)!==canonical(binding)||selected.selection.selectionHash!==binding.selectionHash)fail();
+    const c=await parent.child(l=>track(store.putContext(derived.context,l)));if(c.status!=='recorded'||c.recordHash!==hash('SetupContext',derived.context))fail();
+    const actual=await parent.child(l=>track(store.readContext(refs,l)));if(encode('SetupContext',actual)!==encode('SetupContext',derived.context))fail();
+    await parent.child(l=>facts.source.assertCurrent(l));current(parent.lease);
+    const admission=Object.freeze({ctx,env,storage,db,refs,lease:parent.lease,parent,source:facts.source,material:facts.material,setupInstanceId,...derived});
+    admissions.set(parent.lease,admission);
+    return createFinitePolicySetupTransport({ctx,env}).run(refs,parent.lease);
+   });
+  }catch{return pending();}finally{parent?.finish();}
+ }});
+}
+/** Original native Workflow entry: fixed source proves route/provenance. */
+export async function runFinitePrivatePolicySetup({env,event,step}){
+ let parent;
+ try{
+  const timestamp=event.timestamp,eventTimestamp=Reflect.apply(nativeTime,timestamp,[]),payload=event.payload,x=fields(payload,['operation','intentId','sourceRevision']),refs={intentId:x.intentId,sourceRevision:x.sourceRevision},id=finitePolicySetupInstanceId(refs),version=env.AFW_QA_VERSION?.id,ns=env.AFW_INDEPENDENT_CLOSURE,stepDo=step?.do;
+  if(x.operation!==FINITE_POLICY_SETUP_OPERATION||!time(eventTimestamp)||eventTimestamp>Date.now()||event.instanceId!==id||event.schedule!==undefined||event.workflowName!==undefined&&event.workflowName!=='afw-own-qa-private-bootstrap'||typeof stepDo!=='function')fail();
+  const own=()=>{if(event.timestamp!==timestamp||Reflect.apply(nativeTime,timestamp,[])!==eventTimestamp||event.payload!==payload||canonical(fields(payload,['operation','intentId','sourceRevision']))!==canonical(x)||event.instanceId!==id||event.schedule!==undefined||event.workflowName!==undefined&&event.workflowName!=='afw-own-qa-private-bootstrap'||env.AFW_QA_VERSION?.id!==version||env.AFW_INDEPENDENT_CLOSURE!==ns||step.do!==stepDo)fail();};
+  parent=clock(eventTimestamp+30000,own);
+  const native=await parent.child(()=>readPrivateQaFinitePolicyEntry({env,event,step},parent.lease));
+  if(native.eventTimestamp!==eventTimestamp)fail();narrowFinitePolicySetupClock(parent.lease,native,refs,env);
+  const actor=ns.get(ns.idFromName('afw-own-successor-closure-v1')),setup=actor.setupFinitePrivatePolicy;
+  if(typeof setup!=='function')fail();
+  const result=await parent.wait(Reflect.apply(stepDo,step,['finite-private-policy-setup',{retries:{limit:0,delay:'1 second',backoff:'constant'},timeout:'30 seconds'},async()=>{
+   current(parent.lease);
+   const value=await track((async()=>await Reflect.apply(setup,actor,[refs]))());
+   try{current(parent.lease);return structuredClone(value);}finally{value?.[Symbol.dispose]?.();}
+  }]));
+  current(parent.lease);
+  if(result?.status!=='installed')return pending();
+  fields(result,['status','receipt']);const receipt=decode('PolicyReceipt',encode('PolicyReceipt',result.receipt));
+  if(receipt.intentId!==refs.intentId||receipt.sourceRevision!==refs.sourceRevision||receipt.setupInstanceId!==id||receipt.qaVersionId!==version||receipt.installedAt<native.T0||receipt.installedAt>=native.T0+50000||receipt.installedAt>Date.now())fail();
+  return Object.freeze({status:'installed',receipt});
+ }catch{return pending();}finally{parent?.finish();}
+}

~~~~~~~~~~

## lib/mcp-qa-finite-policy-transport.mjs

~~~~~~~~~~diff
diff --git a/lib/mcp-qa-finite-policy-transport.mjs b/lib/mcp-qa-finite-policy-transport.mjs
--- /dev/null
+++ b/lib/mcp-qa-finite-policy-transport.mjs
@@ -0,0 +1,135 @@
+import {createFiniteFixedPolicyEngine} from './mcp-qa-finite-fixed-policy-engine.mjs';
+import {prepareFinitePreparationEnrollmentWrite} from './mcp-qa-finite-preparation-enrollment-writer.mjs';
+import {consumeFinitePolicySetupAdmission} from './mcp-qa-finite-policy-setup.mjs';
+import {resolveFiniteNamedActivationPlan,validateFiniteNamedCancellationHistory} from './mcp-release-operator-policy.mjs';
+import {adoptFiniteOwnerRequestStageWork,retainFiniteOwnerStagePromise} from './mcp-qa-finite-stage-work.mjs';
+import {createHash} from 'node:crypto';
+import {consumeFiniteOwnerStageAdmission,readFiniteOwnerRequestDeadline} from './mcp-qa-finite-owner-preparation.mjs';
+import {readPrivateQaFiniteConnectionSource} from './mcp-qa-finite-connection-source.mjs';
+import {createFinitePolicyEffectJournal} from './mcp-qa-finite-policy-journal.mjs';
+import {createFiniteOwnerPreparationStore} from './mcp-qa-finite-preparation-store.mjs';
+import {hashFinitePreparationRecord as hash,validateFiniteOwnerSource} from './mcp-qa-finite-preparation-records.mjs';
+import {finiteFields as fields} from './mcp-finite-evidence.mjs';
+import {validateFiniteModule} from './mcp-finite-cleanup-policy.mjs';
+const pending=()=>Object.freeze({status:'admin_pending',mayRetry:false,operationalReadiness:false});
+const fail=()=>{throw Error('Finite policy transport unavailable');};
+const canonical=v=>JSON.stringify(v,(_,x)=>x&&typeof x==='object'&&!Array.isArray(x)?Object.fromEntries(Object.entries(x).sort(([a],[b])=>a<b?-1:1)):x);
+const sha=v=>createHash('sha256').update(v).digest('hex'),digest=(d,v)=>sha(d+'\n'+canonical(v));
+const current=lease=>{if(lease.signal.aborted)fail();lease.assertCurrent();};
+const observed=v=>{if(v?.status!=='observed'||!v.record)fail();return v.record;};
+function validateBytes(bytes,descriptor){
+ validateFiniteModule(descriptor);if(!(bytes instanceof Uint8Array)||bytes.byteLength>3145728||bytes.byteLength!==descriptor.bytes||sha(bytes)!==descriptor.sha256)fail();
+ return Uint8Array.from(bytes);
+}
+/** Only effect entry. No caller transport/credential/body/pins or exported mint. */
+export function createFinitePolicyTransport({ctx,env}){
+ return Object.freeze({run(refs,originalLease){
+  const admission=consumeFiniteOwnerStageAdmission({ctx,env,preconnectionId:refs?.preconnectionId,stage:refs?.stage},originalLease);
+  fields(refs,['preconnectionId','stage']);
+  const originalEnd=readFiniteOwnerRequestDeadline(originalLease),lease=admission.lease;
+  try{return adoptFiniteOwnerRequestStageWork({ctx,env,admission,originalLease},()=>{
+  const track=retainFiniteOwnerStagePromise;
+  const storage=ctx.storage,db=env.RELEASE_DB,fetcher=globalThis.fetch,readToken=env.AFW_MCP_CLOSURE_READ_TOKEN,publishToken=env.AFW_MCP_CLOSURE_PUBLISH_TOKEN;
+  let source,deadline=originalEnd,last=Date.now();
+  const guard=()=>{current(lease);const at=Date.now();if(at<last||at>=deadline||ctx.storage!==storage||env.RELEASE_DB!==db||globalThis.fetch!==fetcher||env.AFW_MCP_CLOSURE_READ_TOKEN!==readToken||env.AFW_MCP_CLOSURE_PUBLISH_TOKEN!==publishToken||env.AFW_QA_VERSION?.id!==admission.ownerSource.qaVersionId)fail();last=at;return at;};
+  async function child(fn){
+   guard();const wall=Date.now(),mono=performance.now(),end=Math.min(deadline,wall+5000),controller=new AbortController();let alive=true,timer,rejectAbort;
+   const stop=()=>{alive=false;controller.abort();};
+   const c=Object.freeze({signal:controller.signal,assertCurrent(){guard();const at=Date.now(),elapsed=performance.now()-mono;if(!alive||controller.signal.aborted||at<wall||at>=end||elapsed<0||elapsed>=end-wall)fail();}});
+   const aborted=new Promise((_,reject)=>{rejectAbort=reject;});
+   const abort=()=>{stop();rejectAbort(Error('Finite parent expired'));};lease.signal.addEventListener('abort',abort,{once:true});
+   const timeout=new Promise((_,reject)=>{timer=setTimeout(()=>{stop();reject(Error('Finite child expired'));},Math.max(1,end-Date.now()));});
+   const work=track(Promise.resolve().then(()=>{current(c);return fn(c,end);}));
+   try{const value=await Promise.race([work,timeout,aborted]);current(c);return value;}
+   finally{stop();clearTimeout(timer);lease.signal.removeEventListener('abort',abort);}
+  }
+  async function qualified(c){current(c);await source.assertCurrent(c);current(c);}
+  async function enrollPreparationCleanup(c,end){
+   current(c);await qualified(c);current(c);
+   const writer=await prepareFinitePreparationEnrollmentWrite({ctx,env,preconnectionId:refs.preconnectionId,stageApprovalHash:admission.stageApprovalHash,ownerSource:source.ownerSource,baseline:source.baseline,baselineBytes:source.bytes.baseline},c,end);
+   await qualified(c);current(c);await writer.recordEnrollment();
+   await qualified(c);current(c);await writer.recordAck();
+  }
+  async function work(){
+   guard();if(refs.stage!=='connection')fail();
+   source=await child(c=>readPrivateQaFiniteConnectionSource({ctx,env,...refs},c));fields(source,['ownerSource','baseline','rollback','candidate','bytes','assertCurrent']);
+   if(typeof source.assertCurrent!=='function'||canonical(validateFiniteOwnerSource(source.ownerSource))!==canonical(admission.ownerSource)||source.ownerSource.phase!=='closed_ui')fail();
+   const store=createFiniteOwnerPreparationStore({storage,now:Date.now});
+   const pre=observed(await child(c=>store.readPreconnection({preconnectionId:refs.preconnectionId},c))),approval=observed(await child(c=>store.readStageApproval(refs,c)));
+   if(hash('StageApproval',approval)!==admission.stageApprovalHash)fail();
+   const decision=observed(await child(c=>store.readConfigurationApproval({approvalHash:approval.approvalHash},c)));
+   deadline=Math.min(deadline,pre.expiresAt,pre.owner.accessExpiresAt,decision.expiresAt,source.ownerSource.window.expiresAt);guard();
+   await child(enrollPreparationCleanup);
+   // Enrollment ACK is DATA only. Unit2 must qualify every later owner effect.
+   return pending();
+  }
+  const actual=track(Promise.resolve().then(work));
+  return actual.then(outcome=>Object.freeze({outcome,admission}),()=>Object.freeze({outcome:pending(),admission}));
+  });}catch{return Promise.resolve(Object.freeze({outcome:pending(),admission}));}
+ }});
+}
+
+/** Separate original native setup admission. Never accepts an owner POST lease. */
+export function createFinitePolicySetupTransport({ctx,env}){
+ return Object.freeze({async run(refs,originalLease){
+  let a,blockingJournal;
+  try{
+   a=consumeFinitePolicySetupAdmission({ctx,env,refs},originalLease);
+   const {source,context,candidate,material,parent}=a,storage=ctx.storage,db=env.RELEASE_DB,fetcher=globalThis.fetch,reader=env.AFW_MCP_CLOSURE_READ_TOKEN,publisher=env.AFW_MCP_CLOSURE_PUBLISH_TOKEN;
+   const guard=()=>{current(originalLease);if(ctx.storage!==storage||env.RELEASE_DB!==db||globalThis.fetch!==fetcher||env.AFW_MCP_CLOSURE_READ_TOKEN!==reader||env.AFW_MCP_CLOSURE_PUBLISH_TOKEN!==publisher||env.AFW_QA_VERSION?.id!==source.native.qaVersionId)fail();return Date.now();};
+   const child=fn=>parent.child(fn),engine=createFiniteFixedPolicyEngine({ctx,env},guard),{readPointer,readVersion}=engine,store=createFiniteOwnerPreparationStore({storage,now:Date.now});
+   const qualified=async c=>{
+    current(c);await source.assertCurrent(c);current(c);
+    if(canonical(source.baseline)!==canonical(context.baseline)||canonical(source.rollback)!==canonical(context.rollback))fail();
+    const selected=await retainFiniteOwnerStagePromise(store.readSelected({sourceRevision:refs.sourceRevision},c));current(c);
+    if(!selected||selected.preparation.preparationHash!==context.preparationHash||selected.selection.selectionHash!==context.selectionHash||!selected.binding||hash('Binding',selected.binding)!==context.bindingHash)fail();
+   };
+   const identity=effect=>({kind:'policy',...refs,setupInstanceId:a.setupInstanceId,effect}),journal=effect=>createFinitePolicyEffectJournal({storage,identity:identity(effect),now:Date.now}),upload=journal('upload'),activation=journal('activation'),contextHash=hash('SetupContext',context),baseline=context.baseline,rollback=context.rollback;
+   const bytes=Object.fromEntries(['baseline','rollback','candidate'].map(k=>[k,validateBytes(source.bytes[k],k==='candidate'?candidate.module:context[k].module)]));
+   await child(async c=>{await qualified(c);await readPointer(baseline,c);await readVersion(baseline,c);await readVersion(rollback,c,true);await qualified(c);});
+   const first=await child(c=>upload.read(c)),second=await child(c=>activation.read(c));
+   if(first.state!=='absent'||second.state!=='absent')fail();
+   async function effect(j,effectName,request,operation){
+    if(parent.end()-guard()<(effectName==='upload'?10000:5000))fail();
+    return child(async(c,end)=>{
+     await qualified(c);await readPointer(baseline,c);current(c);
+     const send={purpose:'afw.finite-policy-send.v1',...refs,setupInstanceId:a.setupInstanceId,contextHash,effect:effectName,requestHash:digest('afw.finite-policy-request.v1',{method:'POST',path:request.path,baselineVersionId:baseline.versionId,baselineDeploymentId:baseline.deploymentId,body:request.body}),issuedAt:Date.now(),deadline:end};
+     const claim=await retainFiniteOwnerStagePromise(j.issue(send,c));current(c);
+     if(claim.status!=='recorded'||claim.recordHash!==hash('PolicySend',send))fail();blockingJournal=j;
+     const read=await retainFiniteOwnerStagePromise(j.read(c));current(c);if(read.state!=='issued'||canonical(read.send)!==canonical(send)||read.ack!==null)fail();
+     await qualified(c);current(c);
+     const result=await operation(c);current(c);
+     const ack={purpose:'afw.finite-policy-ack.v1',sendHash:claim.recordHash,resourceId:result.id,acknowledgedAt:Date.now()};
+     const saved=await retainFiniteOwnerStagePromise(j.acknowledge(ack,c));current(c);
+     if(saved.status!=='recorded'||saved.recordHash!==hash('PolicyAck',ack))fail();
+     const actual=await retainFiniteOwnerStagePromise(j.read(c));current(c);if(actual.state!=='acknowledged'||canonical(actual.ack)!==canonical(ack))fail();
+     return result.id;
+    });
+   }
+   const uploadInput={configuration:candidate.configuration,baselineVersionId:baseline.versionId,bytes:bytes.candidate};
+   const versionId=await effect(upload,'upload',engine.describeUpload(uploadInput),c=>engine.upload(uploadInput,c));
+   if(versionId===baseline.versionId||versionId===rollback.versionId)fail();
+   const pin={versionId,module:candidate.module,configuration:candidate.configuration};
+   await child(async c=>{await qualified(c);await readVersion(pin,c);await readPointer(baseline,c);await qualified(c);});
+   const activationInput={versionId};
+   const deploymentId=await effect(activation,'activation',engine.describeActivation(activationInput),c=>engine.activate(activationInput,c));
+   if(deploymentId===baseline.deploymentId)fail();
+   await child(async c=>{await qualified(c);await readPointer({versionId,deploymentId},c);await readVersion(pin,c);await qualified(c);});
+   // Actual observation is now available; never predicted to satisfy Known.
+   const publication=a.namedContext.publication,T0=context.T0,N1=T0+300000;
+   const bundle={artifact:a.artifact,policy:{operation:'confirm_named',startAt:T0,expiresAt:N1,plan:{activationKey:publication.activationKey,artifactKey:publication.artifactKey,trialId:a.namedContext.trialId,configurationHash:context.expectedFull.activationHash,startAt:T0,expiresAt:N1},observation:{versionId,deploymentId,namespaceId:'d6fc71552de7494a863aca20365a572d',applicationId:'d6fc71552de7494a863aca20365a572d',configuration:candidate.configuration}}};
+   const named=resolveFiniteNamedActivationPlan(bundle,env.AFW_RELEASE_EVENTS_NODE);named.current();validateFiniteNamedCancellationHistory(bundle,a.cancellationHistory);
+   const raw={purpose:'afw.finite-policy-installed.v1',...refs,setupInstanceId:a.setupInstanceId,qaVersionId:source.native.qaVersionId,seedHash:material.seedHash,contextHash,baselineVersionId:baseline.versionId,baselineDeploymentId:baseline.deploymentId,versionId,deploymentId,moduleHash:candidate.module.sha256,publicStaticHash:candidate.publicStatic.configurationHash,...context.expectedFull,installedAt:Date.now()},receipt={...raw,receiptHash:hash('PolicyReceipt',raw)};
+   await child(async c=>{
+    await qualified(c);const read=await retainFiniteOwnerStagePromise(store.readContext(refs,c));current(c);if(hash('SetupContext',read)!==contextHash)fail();
+    const result=await retainFiniteOwnerStagePromise(activation.finish(receipt,c));current(c);if(result.status!=='recorded')fail();
+    const actual=await retainFiniteOwnerStagePromise(activation.read(c));current(c);if(actual.state!=='installed'||canonical(actual.receipt)!==canonical(receipt))fail();
+    const final=await retainFiniteOwnerStagePromise(store.readContext(refs,c));current(c);if(hash('SetupContext',final)!==contextHash)fail();await qualified(c);
+   });
+   return Object.freeze({status:'installed',receipt:Object.freeze(receipt)});
+  }catch{
+   if(a&&blockingJournal)try{await a.parent.child(c=>blockingJournal.markAdminPending({reasonCode:'provider_uncertain',observedAt:Date.now()},c));}catch{}
+   return pending();
+  }
+ }});
+}

~~~~~~~~~~

## lib/mcp-qa-finite-prearm-profile.mjs

~~~~~~~~~~diff
diff --git a/lib/mcp-qa-finite-prearm-profile.mjs b/lib/mcp-qa-finite-prearm-profile.mjs
--- /dev/null
+++ b/lib/mcp-qa-finite-prearm-profile.mjs
@@ -0,0 +1,15 @@
+import {finiteFields as fields,finiteData as data} from './mcp-finite-evidence.mjs';
+import {qualifyFiniteConnectionProfile} from './mcp-qa-finite-connection-profile.mjs';
+
+const fail=()=>{throw Error('Finite prearm configuration unavailable');};
+const canonical=v=>JSON.stringify(v,(_,x)=>x&&typeof x==='object'&&!Array.isArray(x)?Object.fromEntries(Object.entries(x).sort(([a],[b])=>a<b?-1:a>b?1:0)):x);
+
+/** Exact detached DATA equality only. The fixed source must independently
+ * anchor originalConfiguration to the original plan and resident evidence. */
+export function qualifyFinitePrearmConfiguration(input){
+ const {metadata,originalConfiguration}=fields(data(input),['metadata','originalConfiguration']);
+ const actual=qualifyFiniteConnectionProfile({phase:'closed_ui',metadata});
+ const original=qualifyFiniteConnectionProfile({phase:'closed_ui',metadata:originalConfiguration});
+ if(canonical(actual)!==canonical(original))fail();
+ return actual;
+}

~~~~~~~~~~

## lib/mcp-qa-finite-preparation-cleanup-records.mjs

~~~~~~~~~~diff
diff --git a/lib/mcp-qa-finite-preparation-cleanup-records.mjs b/lib/mcp-qa-finite-preparation-cleanup-records.mjs
--- /dev/null
+++ b/lib/mcp-qa-finite-preparation-cleanup-records.mjs
@@ -0,0 +1,34 @@
+import {initialOwn as own,initialFields as fields,initialCanonical as canonical,initialHash as hash,initialHex as hex} from './mcp-qa-finite-initial-material-records.mjs';
+import {QA_CLOUD_CLOSED_PINS} from './mcp-qa-cloud-closed-pins.mjs';
+export const FINITE_PREPARATION_CLEANUP_PREFIX='afw.finite-preparation-cleanup.v1:';
+const fail=()=>{throw Error('Finite preparation cleanup record unavailable');};
+const schemas={
+ Enrollment:'capsuleHash planHash armAckHash activationCompletionHash entryHash materialHash sourceRevision sourceTree qaVersionId initialInstanceId actorId preconnectionId I0 C0 C1 readerId publisherId readerExpiresAt publisherExpiresAt manifestHash baselineVersionId baselineDeploymentId ownerSourceHash preconnectionHash stageApprovalHash configurationApprovalHash issuedAt deadline'.split(' '),
+ Ack:['enrollmentHash','stateHash','alarmAt','acknowledgedAt']
+};
+const purpose=k=>'afw.finite-preparation-cleanup-'+k.toLowerCase()+'.v1';
+const time=v=>Number.isSafeInteger(v)&&v>=0&&v<=8640000000000000;
+const uuid=v=>typeof v==='string'&&/^[a-f0-9]{8}(-[a-f0-9]{4}){3}-[a-f0-9]{12}$/.test(v);
+function validate(kind,input){
+ if(typeof kind!=='string'||!Object.hasOwn(schemas,kind))fail();
+ const v=own(fields(input,['purpose',...schemas[kind],'recordHash'])),{recordHash,...body}=v;
+ if(v.purpose!==purpose(kind)||!hex(recordHash)||hash(v.purpose,body)!==recordHash||Buffer.byteLength(canonical(v))>8192)fail();
+ for(const k of schemas[kind]){
+  if(k.endsWith('Hash')&&!hex(v[k]))fail();
+  if(['I0','C0','C1','readerExpiresAt','publisherExpiresAt','issuedAt','deadline','alarmAt','acknowledgedAt'].includes(k)&&!time(v[k]))fail();
+ }
+ if(kind==='Enrollment'){
+  const p=QA_CLOUD_CLOSED_PINS.canary;
+  if(!hex(v.sourceRevision,40)||!hex(v.sourceTree,40)||!hex(v.actorId)||!hex(v.preconnectionId)||!uuid(v.qaVersionId)||typeof v.initialInstanceId!=='string'||!/^afw-finite-initial-[a-f0-9]{64}$/.test(v.initialInstanceId)||v.C0!==v.I0+900000||v.C1!==v.C0+180000||v.readerExpiresAt<v.C1||v.publisherExpiresAt<v.C1||v.readerId!=='9aa97ad1fc9afe3021cf69ea497d5190'||v.publisherId!=='05718105dcdfc92e55cc3624172c2740'||v.baselineVersionId!==p.id||v.baselineDeploymentId!==p.deploymentId||v.issuedAt<v.I0||v.deadline<=v.issuedAt||v.deadline>v.C0||v.deadline-v.issuedAt>5000)fail();
+ }
+ return v;
+}
+export function sealFinitePreparationCleanupRecord(kind,input){
+ if(typeof kind!=='string'||!Object.hasOwn(schemas,kind))fail();
+ const value=own(fields(input,schemas[kind])),body={purpose:purpose(kind),...value};return validate(kind,{...body,recordHash:hash(body.purpose,body)});
+}
+export function encodeFinitePreparationCleanupRecord(kind,input){return canonical(validate(kind,input));}
+export function decodeFinitePreparationCleanupRecord(kind,raw){
+ if(typeof raw!=='string'||Buffer.byteLength(raw)>8192)fail();
+ const v=validate(kind,JSON.parse(raw));if(canonical(v)!==raw)fail();return v;
+}

~~~~~~~~~~

## lib/mcp-qa-finite-preparation-cleanup.mjs

~~~~~~~~~~diff
diff --git a/lib/mcp-qa-finite-preparation-cleanup.mjs b/lib/mcp-qa-finite-preparation-cleanup.mjs
--- /dev/null
+++ b/lib/mcp-qa-finite-preparation-cleanup.mjs
@@ -0,0 +1,33 @@
+import {qualifyFinitePreparationEnrollmentFacts} from './mcp-qa-finite-preparation-enrollment-facts.mjs';
+import {retainFiniteOwnerStagePromise as retain} from './mcp-qa-finite-stage-work.mjs';
+import {readPrivateQaFiniteInitialAnchors} from './mcp-qa-finite-initial-anchors.mjs';
+import {FINITE_PREPARATION_CLEANUP_PREFIX as P,decodeFinitePreparationCleanupRecord as decode} from './mcp-qa-finite-preparation-cleanup-records.mjs';
+import {decodeFinitePreparationRecord as prep} from './mcp-qa-finite-preparation-records.mjs';
+import {initialFields as fields} from './mcp-qa-finite-initial-material-records.mjs';
+const fail=()=>{throw Error('Finite preparation cleanup unavailable');};
+/** Factual recovery DATA only; no admission, enrollment writer or readiness. */
+export async function readPrivateQaFinitePreparationCleanup(options,originalLease){
+ if(arguments.length!==2)fail();const {ctx,env}=fields(options,['ctx','env']);fields(originalLease,['signal','assertCurrent']);const signal=originalLease.signal,assertCurrent=originalLease.assertCurrent;
+ const storage=ctx?.storage,get=storage?.get,list=storage?.list,transaction=storage?.transaction,sync=storage?.sync,getAlarm=storage?.getAlarm,actor=ctx?.id,toString=actor?.toString,metadata=env?.AFW_QA_VERSION,qa=metadata?.id,ns=env?.AFW_INDEPENDENT_CLOSURE,idFromName=ns?.idFromName,db=env?.RELEASE_DB,reader=env?.AFW_MCP_CLOSURE_READ_TOKEN,publisher=env?.AFW_MCP_CLOSURE_PUBLISH_TOKEN,fetcher=globalThis.fetch;
+ const guard=()=>{assertCurrent();if(originalLease.signal!==signal||originalLease.assertCurrent!==assertCurrent||signal.aborted||ctx.storage!==storage||storage.get!==get||storage.list!==list||storage.transaction!==transaction||storage.sync!==sync||storage.getAlarm!==getAlarm||ctx.id!==actor||actor.toString!==toString||env.AFW_INDEPENDENT_CLOSURE!==ns||ns.idFromName!==idFromName||Reflect.apply(toString,actor,[])!==Reflect.apply(idFromName,ns,['afw-own-successor-closure-v1']).toString()||env.AFW_QA_VERSION!==metadata||metadata.id!==qa||env.RELEASE_DB!==db||env.AFW_MCP_CLOSURE_READ_TOKEN!==reader||env.AFW_MCP_CLOSURE_PUBLISH_TOKEN!==publisher||globalThis.fetch!==fetcher)fail();};
+ if([get,list,transaction,sync,getAlarm,toString,idFromName].some(x=>typeof x!=='function'))fail();
+ const io=async(method,args)=>{guard();const value=await retain(Reflect.apply(method,storage,args));guard();return value;};
+ const rows=await io(list,[{prefix:P,limit:3}]);
+ if(rows.size===0)return null;
+ if(rows.size>2||!rows.has(P+'enrollment')||[...rows.keys()].some(k=>![P+'enrollment',P+'ack'].includes(k)))fail();
+ const enrollment=decode('Enrollment',rows.get(P+'enrollment')),ack=rows.has(P+'ack')?decode('Ack',rows.get(P+'ack')):null;
+ const a=await retain(readPrivateQaFiniteInitialAnchors({ctx,env},originalLease));guard();
+ const c=a.capsule;
+ if(await io(get,['afw.qa-finite-trial.v1:head'])!==undefined||(await io(list,[{prefix:'afw.finite-policy-effect.v1:',limit:1}])).size)fail();
+ const prefix='connection-preparation:'+c.preconnectionId;
+ const read=async(k,kind)=>prep(kind,await io(get,[k]));
+ const pre=await read(prefix+':record','Preconnection'),snapshot=await read(prefix+':source','OwnerSourceSnapshot'),stage=await read(prefix+':connection:approval','StageApproval'),approval=await read('connection-approval:'+stage.approvalHash,'ConfigurationApproval');
+ const ticket=await read('owner-ticket:'+snapshot.initialTicketHash,'Ticket'),use=await read('owner-ticket:'+snapshot.initialTicketHash+':use','TicketUse'),map=await read('owner-project-ref:'+ticket.projectRef,'ProjectRef');
+ const scoped=await io(list,[{prefix:prefix+':',limit:16}]);
+ if(scoped.size!==3||[...scoped.keys()].some(k=>![prefix+':record',prefix+':source',prefix+':connection:approval'].includes(k)))fail();
+ qualifyFinitePreparationEnrollmentFacts({anchors:a,enrollment,ack,preconnection:pre,sourceSnapshot:snapshot,stageApproval:stage,approval,ticket,ticketUse:use,projectRef:map});
+ // Any later permission or nominal effect requires Unit2, never this fallback.
+ for(const suffix of ['grant','notice','connection','notices:approval','finite:approval'])if(await io(get,[prefix+':'+suffix])!==undefined)fail();
+ for(const [k,v]of rows)if(await io(get,[k])!==v)fail();
+ guard();return Object.freeze({enrollment,ack});
+}

~~~~~~~~~~

## lib/mcp-qa-finite-preparation-enrollment-facts.mjs

~~~~~~~~~~diff
diff --git a/lib/mcp-qa-finite-preparation-enrollment-facts.mjs b/lib/mcp-qa-finite-preparation-enrollment-facts.mjs
--- /dev/null
+++ b/lib/mcp-qa-finite-preparation-enrollment-facts.mjs
@@ -0,0 +1,38 @@
+import {encodeFiniteInitialCapsule,sealFiniteInitialCapsule} from './mcp-qa-finite-initial-capsule-records.mjs';
+import {encodeFiniteInitialEntry} from './mcp-qa-finite-initial-entry-records.mjs';
+import {encodeFiniteInitialMaterialRecord} from './mcp-qa-finite-initial-material-records.mjs';
+import {FINITE_INITIAL_CLEANUP_KINDS,encodeFiniteInitialCleanupRecord} from './mcp-qa-finite-initial-cleanup-records.mjs';
+import {finitePublicProfileTemplate} from './mcp-qa-finite-profile.mjs';
+import {finiteActivationConfigurationHash} from './mcp-activation-observer.mjs';
+import {encodeFinitePreparationCleanupRecord as encodeEnrollment,decodeFinitePreparationCleanupRecord as decodeEnrollment} from './mcp-qa-finite-preparation-cleanup-records.mjs';
+import {encodeFinitePreparationRecord as encode,decodeFinitePreparationRecord as decode,hashFinitePreparationRecord as hash,hashFiniteOwnerEvidence as evidence,hashFiniteOwnerPreparationProject as projectHash} from './mcp-qa-finite-preparation-records.mjs';
+import {initialOwn as own,initialCanonical as canonical,initialFields as fields} from './mcp-qa-finite-initial-material-records.mjs';
+const fail=()=>{throw Error('Finite preparation enrollment facts unavailable');};
+const record=(kind,v)=>decode(kind,encode(kind,v));
+/** Original enrollment linkage DATA only; no cleanup/phase option or permission. */
+export function qualifyFinitePreparationEnrollmentFacts(input){
+ if(arguments.length!==1)fail();fields(input,['anchors','enrollment','ack','preconnection','sourceSnapshot','stageApproval','approval','ticket','ticketUse','projectRef']);
+ const a=own(input.anchors);fields(a,['capsule','entry','claim','selector','materialAck','material','plan','state','zero','records','actorId','alarm','anchors']);
+ encodeFiniteInitialEntry(a.entry);
+ for(const [name,kind]of [['claim','InitialClaim'],['selector','InitialSelector'],['materialAck','InitialAck'],['material','InitialMaterial']])encodeFiniteInitialMaterialRecord(kind,a[name]);
+ for(const [name,value]of Object.entries(a.records)){if(!Object.hasOwn(FINITE_INITIAL_CLEANUP_KINDS,name))fail();encodeFiniteInitialCleanupRecord(FINITE_INITIAL_CLEANUP_KINDS[name],value);}
+ encodeFiniteInitialCleanupRecord('Plan',a.plan);encodeFiniteInitialCleanupRecord('State',a.state);encodeFiniteInitialCleanupRecord('State',a.zero);
+ if(canonical(a.plan)!==canonical(a.records.plan)||canonical(a.state)!==canonical(a.records.state)||encodeFiniteInitialCapsule(a.capsule)!==encodeFiniteInitialCapsule(sealFiniteInitialCapsule({entry:a.entry,claim:a.claim,selector:a.selector,materialAck:a.materialAck,material:a.material,plan:a.plan,state:a.zero,arm:a.records['arm-ack'],send:a.records['activation-send'],activationAck:a.records['activation-ack'],completion:a.records['activation-completion'],recordedAt:a.capsule.recordedAt})))fail();
+ const enrollment=decodeEnrollment('Enrollment',encodeEnrollment('Enrollment',input.enrollment)),ack=input.ack===null?null:decodeEnrollment('Ack',encodeEnrollment('Ack',input.ack));
+ const pre=record('Preconnection',input.preconnection),snapshot=record('OwnerSourceSnapshot',input.sourceSnapshot),stage=record('StageApproval',input.stageApproval),approval=record('ConfigurationApproval',input.approval),ticket=record('Ticket',input.ticket),use=record('TicketUse',input.ticketUse),map=record('ProjectRef',input.projectRef),source=snapshot.source,selection=a.material.ownerSelection;
+ const {capsule:c,plan:p,zero,records:r}=a;
+ const expected={capsuleHash:c.capsuleHash,planHash:p.recordHash,armAckHash:r['arm-ack'].recordHash,activationCompletionHash:r['activation-completion'].recordHash,entryHash:c.entryHash,materialHash:c.materialHash,actorId:a.actorId};
+ for(const k of ['sourceRevision','sourceTree','qaVersionId','initialInstanceId','preconnectionId','I0','C0','C1'])expected[k]=c[k];
+ for(const k of ['readerId','publisherId','readerExpiresAt','publisherExpiresAt','manifestHash','baselineVersionId','baselineDeploymentId'])expected[k]=p[k];
+ for(const [k,v]of Object.entries(expected))if(enrollment[k]!==v)fail();
+ if(ack&&(ack.enrollmentHash!==enrollment.recordHash||ack.stateHash!==zero.recordHash||ack.alarmAt!==c.C0||ack.acknowledgedAt<enrollment.issuedAt||ack.acknowledgedAt>=enrollment.deadline))fail();
+ const realm=evidence('realm',{...source.access,origin:source.origin}),subject=evidence('subject',{accessRealmHash:realm,subject:pre.owner.subject});
+ if(ticket.preconnectionId!==c.preconnectionId||ticket.action!=='connection'||ticket.connectionRef!==null||ticket.ticketHash!==snapshot.initialTicketHash||ticket.sourceRevision!==c.sourceRevision||map.preconnectionId!==c.preconnectionId||map.sourceRevision!==c.sourceRevision||map.projectId!==source.project.projectId||map.revision!==source.project.revision||map.subjectHash!==subject||ticket.subjectHash!==subject||ticket.expiresAt>map.expiresAt||approval.expiresAt>ticket.expiresAt||use.ticketHash!==ticket.ticketHash||use.recordHash!==approval.csrfReceiptHash||approval.csrfReceiptHash!==evidence('decision',{ticket,decision:'approve',projectHash:projectHash(pre.project),goal:source.goal,clientId:pre.clientId,approvedAt:approval.approvedAt,expiresAt:approval.expiresAt})||use.consumedAt<approval.approvedAt||enrollment.issuedAt<use.consumedAt||
+ enrollment.ownerSourceHash!==snapshot.sourceHash||enrollment.preconnectionHash!==pre.recordHash||enrollment.stageApprovalHash!==hash('StageApproval',stage)||enrollment.configurationApprovalHash!==hash('ConfigurationApproval',approval)||pre.approvalHash!==stage.approvalHash||pre.preconnectionId!==c.preconnectionId||snapshot.preconnectionId!==c.preconnectionId||stage.preconnectionId!==c.preconnectionId||stage.stage!=='connection'||stage.ticketHash!==snapshot.initialTicketHash||
+ source.qaNamespaceId!==finitePublicProfileTemplate('qaLive').bindings.find(b=>b.name==='AFW_INDEPENDENT_CLOSURE').namespace_id||source.phase!=='closed_ui'||source.actorId!==a.actorId||source.sourceRevision!==c.sourceRevision||source.qaVersionId!==c.qaVersionId||source.window.startedAt!==c.I0||source.window.expiresAt!==c.C0||source.currentPublication.stage!==null||source.currentPublication.versionId!==c.activatedVersionId||source.currentPublication.deploymentId!==c.activatedDeploymentId||
+ pre.sourceRevision!==source.sourceRevision||stage.sourceRevision!==source.sourceRevision||approval.sourceRevision!==source.sourceRevision||pre.actorId!==a.actorId||pre.owner.subject!==selection.subject||pre.owner.accessRealmHash!==realm||approval.subjectHash!==subject||projectHash(pre.project)!==projectHash(source.project)||projectHash(source.project)!==projectHash(selection.project)||approval.projectHash!==projectHash(pre.project)||pre.clientId!==source.clientId||approval.clientId!==pre.clientId||source.clientId!==selection.clientId||pre.resource!==source.resource||source.resource!==selection.resource||canonical(source.access)!==canonical(selection.access)||source.goal!==selection.goal||pre.baselineHash!==evidence('baseline',source.initialBaseline)||
+ source.initialBaseline.versionId!==c.activatedVersionId||source.initialBaseline.deploymentId!==c.activatedDeploymentId||source.initialBaseline.moduleHash!==c.moduleHash||source.initialBaseline.bindingsHash!==c.bindingsHash||source.initialBaseline.configurationHash!==finiteActivationConfigurationHash(p.configuration)||enrollment.issuedAt<pre.startedAt||enrollment.deadline>Math.min(pre.expiresAt,pre.owner.accessExpiresAt,approval.expiresAt))fail();
+
+ if(stage.approvalHash!==hash('ConfigurationApproval',approval)||approval.approvedAt<ticket.createdAt||approval.approvedAt<pre.startedAt||pre.startedAt<c.I0||pre.expiresAt>c.C0||use.consumedAt>=approval.expiresAt)fail();
+ return Object.freeze({enrollment,ack});
+}

~~~~~~~~~~

## lib/mcp-qa-finite-preparation-enrollment-writer.mjs

~~~~~~~~~~diff
diff --git a/lib/mcp-qa-finite-preparation-enrollment-writer.mjs b/lib/mcp-qa-finite-preparation-enrollment-writer.mjs
--- /dev/null
+++ b/lib/mcp-qa-finite-preparation-enrollment-writer.mjs
@@ -0,0 +1,102 @@
+import {readPrivateQaFiniteInitialAnchors} from './mcp-qa-finite-initial-anchors.mjs';
+import {readPrivateQaFinitePreparationCleanup} from './mcp-qa-finite-preparation-cleanup.mjs';
+import {FINITE_PREPARATION_CLEANUP_PREFIX as PREPARATION_CLEANUP,sealFinitePreparationCleanupRecord as sealPreparationCleanup,encodeFinitePreparationCleanupRecord as encodePreparationCleanup} from './mcp-qa-finite-preparation-cleanup-records.mjs';
+import {decodeFinitePreparationRecord as decodePreparation,hashFiniteOwnerEvidence as ownerEvidence,hashFiniteOwnerPreparationProject as ownerProjectHash} from './mcp-qa-finite-preparation-records.mjs';
+import {retainFiniteOwnerStagePromise as track} from './mcp-qa-finite-stage-work.mjs';
+import {createHash} from 'node:crypto';
+import {hashFinitePreparationRecord as hash,validateFiniteOwnerSource} from './mcp-qa-finite-preparation-records.mjs';
+import {finiteFields as fields,finiteData as data} from './mcp-finite-evidence.mjs';
+import {validateFiniteModule} from './mcp-finite-cleanup-policy.mjs';
+import {finiteActivationConfigurationHash} from './mcp-activation-observer.mjs';
+import {qualifyFiniteConnectionProfile} from './mcp-qa-finite-connection-profile.mjs';
+const canonical=v=>JSON.stringify(v,(_,x)=>x&&typeof x==='object'&&!Array.isArray(x)?Object.fromEntries(Object.entries(x).sort(([a],[b])=>a<b?-1:1)):x);
+const sha=v=>createHash('sha256').update(v).digest('hex');
+
+/** Factual one-shot writer only; callers retain admission and source checks. */
+export async function prepareFinitePreparationEnrollmentWrite(options,c,originalDeadline){
+ const {ctx,env,preconnectionId,stageApprovalHash}=fields(options,['ctx','env','preconnectionId','stageApprovalHash','ownerSource','baseline','baselineBytes']);
+ const owner=validateFiniteOwnerSource(options.ownerSource),baseline=data(options.baseline);
+ fields(baseline,['versionId','deploymentId','module','configuration']);validateFiniteModule(baseline.module);
+ if(!(options.baselineBytes instanceof Uint8Array))throw Error('Finite policy transport unavailable');
+ const baselineBytes=Uint8Array.from(options.baselineBytes);
+ let failed=false,stateOfWrite='prepared',ack=null,last=Date.now(),deadline=originalDeadline;
+ const fail=()=>{failed=true;throw Error('Finite policy transport unavailable');};
+ const current=lease=>{if(lease.signal.aborted)fail();lease.assertCurrent();};
+ const validateBytes=(bytes,descriptor)=>{if(!(bytes instanceof Uint8Array)||bytes.byteLength>3145728||bytes.byteLength!==descriptor.bytes||sha(bytes)!==descriptor.sha256)fail();};
+ if(!Number.isSafeInteger(originalDeadline)||originalDeadline<=last||originalDeadline-last>5000)fail();
+ const storage=ctx.storage,db=env.RELEASE_DB,fetcher=globalThis.fetch,reader=env.AFW_MCP_CLOSURE_READ_TOKEN,publisher=env.AFW_MCP_CLOSURE_PUBLISH_TOKEN,signal=c.signal,assertCurrent=c.assertCurrent;
+ current(c);
+   const get=storage.get,list=storage.list,transaction=storage.transaction,sync=storage.sync,getAlarm=storage.getAlarm;
+   const actor=ctx.id,toString=actor.toString,ns=env.AFW_INDEPENDENT_CLOSURE,idFromName=ns?.idFromName,metadata=env.AFW_QA_VERSION,qa=metadata?.id;
+   if([get,list,transaction,sync,getAlarm,toString,idFromName].some(x=>typeof x!=='function'))fail();
+   const check=()=>{if(failed)fail();try{current(c);const at=Date.now();if(c.signal!==signal||c.assertCurrent!==assertCurrent||at<last||at>=deadline||ctx.storage!==storage||env.RELEASE_DB!==db||globalThis.fetch!==fetcher||env.AFW_MCP_CLOSURE_READ_TOKEN!==reader||env.AFW_MCP_CLOSURE_PUBLISH_TOKEN!==publisher||storage.get!==get||storage.list!==list||storage.transaction!==transaction||storage.sync!==sync||storage.getAlarm!==getAlarm||ctx.id!==actor||actor.toString!==toString||env.AFW_INDEPENDENT_CLOSURE!==ns||ns.idFromName!==idFromName||env.AFW_QA_VERSION!==metadata||metadata.id!==qa)fail();last=at;}catch(error){failed=true;throw error;}};
+   const io=async(method,args)=>{check();const value=await track(Reflect.apply(method,storage,args));check();return value;};
+   const facts=await track(readPrivateQaFiniteInitialAnchors({ctx,env},c));check();
+   const {capsule,plan,records,zero,state,anchors,actorId}=facts;
+   if(preconnectionId!==capsule.preconnectionId||facts.alarm!==capsule.C0||canonical(state)!==canonical(zero)||Object.keys(records).length!==6||Date.now()<capsule.I0||Date.now()>=capsule.C0||owner.phase!=='closed_ui'||owner.sourceRevision!==capsule.sourceRevision||owner.qaVersionId!==capsule.qaVersionId||owner.actorId!==actorId||owner.window.startedAt!==capsule.I0||owner.window.expiresAt!==capsule.C0||owner.currentPublication.stage!==null||owner.currentPublication.versionId!==capsule.activatedVersionId||owner.currentPublication.deploymentId!==capsule.activatedDeploymentId||baseline.versionId!==capsule.activatedVersionId||baseline.deploymentId!==capsule.activatedDeploymentId||baseline.module.sha256!==capsule.moduleHash||finiteActivationConfigurationHash(baseline.configuration)!==finiteActivationConfigurationHash(plan.configuration))fail();
+   validateBytes(baselineBytes,baseline.module);qualifyFiniteConnectionProfile({phase:'closed_ui',metadata:baseline.configuration});
+   const prefix='connection-preparation:'+preconnectionId;
+   const names=[[prefix+':record','Preconnection'],[prefix+':source','OwnerSourceSnapshot'],[prefix+':connection:approval','StageApproval']];
+   const ownerRows=[];for(const [key,kind]of names){const raw=await io(get,[key]);ownerRows.push([key,raw]);decodePreparation(kind,raw);}
+   const pre=decodePreparation('Preconnection',ownerRows[0][1]),snapshot=decodePreparation('OwnerSourceSnapshot',ownerRows[1][1]),approval=decodePreparation('StageApproval',ownerRows[2][1]);
+   const decisionKey='connection-approval:'+approval.approvalHash,decisionRaw=await io(get,[decisionKey]),decision=decodePreparation('ConfigurationApproval',decisionRaw);ownerRows.push([decisionKey,decisionRaw]);
+   const ticketKey='owner-ticket:'+snapshot.initialTicketHash,ticketRaw=await io(get,[ticketKey]),ticket=decodePreparation('Ticket',ticketRaw);
+   const useKey=ticketKey+':use',useRaw=await io(get,[useKey]),use=decodePreparation('TicketUse',useRaw),mapKey='owner-project-ref:'+ticket.projectRef,mapRaw=await io(get,[mapKey]),map=decodePreparation('ProjectRef',mapRaw);
+   ownerRows.push([ticketKey,ticketRaw],[useKey,useRaw],[mapKey,mapRaw]);
+   if(hash('StageApproval',approval)!==stageApprovalHash||canonical(snapshot.source)!==canonical(owner)||pre.preconnectionId!==capsule.preconnectionId||pre.sourceRevision!==owner.sourceRevision||pre.actorId!==owner.actorId||pre.approvalHash!==approval.approvalHash||approval.stage!=='connection'||approval.preconnectionId!==capsule.preconnectionId)fail();
+   const childDeadline=Math.min(originalDeadline,capsule.C0,pre.expiresAt,pre.owner.accessExpiresAt,decision.expiresAt,owner.window.expiresAt);deadline=childDeadline;check();
+   const input={capsuleHash:capsule.capsuleHash,planHash:plan.recordHash,armAckHash:records['arm-ack'].recordHash,activationCompletionHash:records['activation-completion'].recordHash,entryHash:capsule.entryHash,materialHash:capsule.materialHash,actorId,ownerSourceHash:snapshot.sourceHash,preconnectionHash:pre.recordHash,stageApprovalHash:stageApprovalHash,configurationApprovalHash:hash('ConfigurationApproval',decision),issuedAt:Date.now(),deadline:childDeadline};
+   for(const k of ['sourceRevision','sourceTree','qaVersionId','initialInstanceId','preconnectionId','I0','C0','C1'])input[k]=capsule[k];
+   for(const k of ['readerId','publisherId','readerExpiresAt','publisherExpiresAt','manifestHash','baselineVersionId','baselineDeploymentId'])input[k]=plan[k];
+   const enrollment=sealPreparationCleanup('Enrollment',input),enrollmentRaw=encodePreparationCleanup('Enrollment',enrollment);
+   // Immutable exact native transaction, never a resumed writer from old DATA.
+   async function append(key,raw,acknowledging=false){
+    let entered=false;
+    check();const committed=await track(Reflect.apply(transaction,storage,[async tx=>{
+     if(entered)fail();entered=true;
+     const tg=tx.get,tp=tx.put,tl=tx.list;if([tg,tp,tl].some(x=>typeof x!=='function'))fail();
+     const txCheck=()=>{check();if(tx.get!==tg||tx.put!==tp||tx.list!==tl)fail();};
+     const read=async k=>{txCheck();const value=await track(Reflect.apply(tg,tx,[k]));txCheck();return value;};
+     const rows=async prefix=>{txCheck();const value=await track(Reflect.apply(tl,tx,[{prefix,limit:16}]));txCheck();return value;};
+     for(const [k,v]of [...anchors,...ownerRows])if(await read(k)!==v)fail();
+     if((await rows('afw.finite-initial-cleanup.v1:')).size!==6||await read('afw.qa-finite-trial.v1:head')!==undefined||(await rows('afw.finite-policy-effect.v1:')).size)fail();
+     for(const suffix of ['grant','notice','connection','notices:approval','finite:approval'])if(await read(prefix+':'+suffix)!==undefined)fail();
+     const ownerScoped=await rows(prefix+':');
+     if(ownerScoped.size!==3||[...ownerScoped.keys()].some(k=>![prefix+':record',prefix+':source',prefix+':connection:approval'].includes(k)))fail();
+     const old=await rows(PREPARATION_CLEANUP);
+     if(acknowledging?old.size!==1||old.get(PREPARATION_CLEANUP+'enrollment')!==enrollmentRaw:old.size!==0)fail();
+     if(await read(key)!==undefined)fail();
+     txCheck();await track(Reflect.apply(tp,tx,[key,raw]));txCheck();return true;
+    }]));check();if(committed!==true)fail();
+    await io(sync,[]);
+    if(await io(get,[key])!==raw||await io(getAlarm,[])!==capsule.C0)fail();
+   }
+   // Validate real stored owner/project/realm/baseline linkage before the first write.
+   const realm=ownerEvidence('realm',{...owner.access,origin:owner.origin}),subject=ownerEvidence('subject',{accessRealmHash:realm,subject:pre.owner.subject}),selection=facts.material.ownerSelection;
+   if(ticket.preconnectionId!==capsule.preconnectionId||ticket.ticketHash!==snapshot.initialTicketHash||ticket.sourceRevision!==capsule.sourceRevision||ticket.action!=='connection'||ticket.connectionRef!==null||ticket.subjectHash!==subject||map.preconnectionId!==capsule.preconnectionId||map.sourceRevision!==capsule.sourceRevision||map.subjectHash!==subject||map.projectId!==owner.project.projectId||map.revision!==owner.project.revision||ticket.expiresAt>map.expiresAt||decision.expiresAt>ticket.expiresAt||use.ticketHash!==ticket.ticketHash||use.recordHash!==decision.csrfReceiptHash||decision.csrfReceiptHash!==ownerEvidence('decision',{ticket,decision:'approve',projectHash:ownerProjectHash(pre.project),goal:owner.goal,clientId:pre.clientId,approvedAt:decision.approvedAt,expiresAt:decision.expiresAt})||use.consumedAt<decision.approvedAt||enrollment.issuedAt<use.consumedAt||pre.owner.subject!==selection.subject||pre.owner.accessRealmHash!==realm||decision.subjectHash!==subject||pre.clientId!==owner.clientId||decision.clientId!==pre.clientId||owner.clientId!==selection.clientId||pre.resource!==owner.resource||owner.resource!==selection.resource||ownerProjectHash(pre.project)!==ownerProjectHash(owner.project)||ownerProjectHash(owner.project)!==ownerProjectHash(selection.project)||decision.projectHash!==ownerProjectHash(pre.project)||decision.sourceRevision!==owner.sourceRevision||approval.sourceRevision!==owner.sourceRevision||snapshot.preconnectionId!==capsule.preconnectionId||snapshot.initialTicketHash!==approval.ticketHash||canonical(owner.access)!==canonical(selection.access)||owner.goal!==selection.goal||pre.baselineHash!==ownerEvidence('baseline',owner.initialBaseline)||owner.initialBaseline.versionId!==capsule.activatedVersionId||owner.initialBaseline.deploymentId!==capsule.activatedDeploymentId||owner.initialBaseline.moduleHash!==capsule.moduleHash||owner.initialBaseline.bindingsHash!==capsule.bindingsHash||owner.initialBaseline.configurationHash!==finiteActivationConfigurationHash(plan.configuration))fail();
+
+ return Object.freeze({
+  async recordEnrollment(){
+   if(stateOfWrite!=='prepared')fail();stateOfWrite='enrolling';
+   try{
+    check();await append(PREPARATION_CLEANUP+'enrollment',enrollmentRaw);
+    const verified=await track(readPrivateQaFinitePreparationCleanup({ctx,env},c));check();
+    if(verified?.enrollment.recordHash!==enrollment.recordHash||verified.ack!==null)fail();
+    // Same literal point as the original writer: after first factual readback,
+    // before the caller's second qualified source observation.
+    ack=sealPreparationCleanup('Ack',{enrollmentHash:enrollment.recordHash,stateHash:zero.recordHash,alarmAt:capsule.C0,acknowledgedAt:Date.now()});
+    if(ack.acknowledgedAt<enrollment.issuedAt||ack.acknowledgedAt>=enrollment.deadline)fail();
+    stateOfWrite='enrolled';return Object.freeze({enrollment,ack:null});
+   }catch(error){failed=true;throw error;}
+  },
+  async recordAck(){
+   if(stateOfWrite!=='enrolled')fail();stateOfWrite='acknowledging';
+   try{
+    check();await append(PREPARATION_CLEANUP+'ack',encodePreparationCleanup('Ack',ack),true);
+    const final=await track(readPrivateQaFinitePreparationCleanup({ctx,env},c));check();
+    if(final?.ack?.recordHash!==ack.recordHash)fail();
+    stateOfWrite='complete';return Object.freeze({enrollment,ack});
+   }catch(error){failed=true;throw error;}
+  }
+ });
+}

~~~~~~~~~~

## lib/mcp-qa-finite-preparation-issuer-journal.mjs

~~~~~~~~~~diff
diff --git a/lib/mcp-qa-finite-preparation-issuer-journal.mjs b/lib/mcp-qa-finite-preparation-issuer-journal.mjs
--- /dev/null
+++ b/lib/mcp-qa-finite-preparation-issuer-journal.mjs
@@ -0,0 +1,78 @@
+import {initialOwn as own,initialFields as fields,initialHex as hex} from './mcp-qa-finite-initial-material-records.mjs';
+import {FINITE_PREPARATION_ISSUER_PREFIX as P,FINITE_PREPARATION_ISSUER_OPERATIONS as OPS,encodeFinitePreparationIssuerRecord as encode,decodeFinitePreparationIssuerRecord as decode} from './mcp-qa-finite-preparation-issuer-records.mjs';
+import {retainFiniteOwnerStagePromise as retain} from './mcp-qa-finite-stage-work.mjs';
+const fail=()=>{throw Error('Finite preparation issuer unavailable');};
+// Internal holder/lifetime bookkeeping, not authentication or business authority.
+export function captureFinitePreparationIssuerContext({ctx,env}){
+ const storage=ctx?.storage,actor=ctx?.id,toString=actor?.toString,ns=env?.AFW_INDEPENDENT_CLOSURE,idFromName=ns?.idFromName,metadata=env?.AFW_QA_VERSION,qa=metadata?.id,db=env?.RELEASE_DB,session=db?.withSession;
+ const get=storage?.get,list=storage?.list,transaction=storage?.transaction,sync=storage?.sync;
+ if([get,list,transaction,sync,toString,idFromName,session].some(f=>typeof f!=='function'))fail();
+ const actorId=Reflect.apply(toString,actor,[]),pending=new Set();
+ function holders(){
+  if(ctx.storage!==storage||ctx.id!==actor||actor.toString!==toString||storage.get!==get||storage.list!==list||storage.transaction!==transaction||storage.sync!==sync||env.AFW_INDEPENDENT_CLOSURE!==ns||ns.idFromName!==idFromName||Reflect.apply(idFromName,ns,['afw-own-successor-closure-v1']).toString()!==actorId||env.AFW_QA_VERSION!==metadata||metadata.id!==qa||env.RELEASE_DB!==db||db.withSession!==session)fail();
+ }
+ function leaseGuard(lease){
+  fields(lease,['signal','assertCurrent']);const signal=lease.signal,assertCurrent=lease.assertCurrent;
+  if(!(signal instanceof AbortSignal)||typeof assertCurrent!=='function')fail();
+  return ()=>{holders();if(lease.signal!==signal||lease.assertCurrent!==assertCurrent||signal.aborted)fail();assertCurrent();};
+ }
+ async function wait(p,guard){
+  pending.add(p);const settled=()=>pending.delete(p);p.then(settled,settled);
+  const r=await retain(p);guard();return r;
+ }
+ holders();return Object.freeze({storage,actorId,qa,db,session,get,list,transaction,sync,holders,leaseGuard,wait});
+}
+export function createFinitePreparationIssuerJournal(options){
+ fields(options,['ctx','env']);const c=captureFinitePreparationIssuerContext(options);
+ const prepare=(kind,v)=>decode(kind,encode(kind,v));
+ const key=id=>{if(!hex(id))fail();return P+id+':';};
+ async function readAll(id,g,tx=c.storage){
+  const prefix=key(id),listing=tx.list;if(typeof listing!=='function')fail();
+  g();const rows=await c.wait(Reflect.apply(listing,tx,[{prefix,limit:16}]),g);
+  if(rows.size>14)fail();
+  const out={reservation:null,freeze:null,operations:Object.fromEntries(OPS.map(op=>[op,{send:null,ack:null}]))};
+  for(const [k,raw]of rows){
+   const name=k.slice(prefix.length);let kind,target,field;
+   if(name==='reservation'||name==='freeze'){kind=name==='reservation'?'Reservation':'Freeze';target=out;field=name;}
+   else{const parts=name.split(':');if(parts.length!==2||!OPS.includes(parts[0])||!['send','ack'].includes(parts[1]))fail();kind=parts[1]==='send'?'Send':'Ack';target=out.operations[parts[0]];field=parts[1];}
+   target[field]=decode(kind,raw);
+  }
+  const r=out.reservation;
+  if(!r){if(rows.size)fail();return Object.freeze({...out,operations:Object.freeze(Object.fromEntries(OPS.map(op=>[op,Object.freeze(out.operations[op])])))});}
+  if(r.identity.preconnectionId!==id||r.identity.actorId!==c.actorId||r.identity.qaVersionId!==c.qa)fail();
+  if(out.freeze&&(out.freeze.identityHash!==r.identity.identityHash||out.freeze.reservationHash!==r.recordHash||out.freeze.frozenAt<r.issuedAt||out.freeze.frozenAt>=r.identity.C1))fail();
+  for(const op of OPS){const {send,ack}=out.operations[op];if(send&&(send.operation!==op||send.identityHash!==r.identity.identityHash||send.reservationHash!==r.recordHash||send.issuedAt<r.issuedAt||send.deadline>(['close_fence','revoke_grant'].includes(op)?r.identity.C1:r.identity.C0)))fail();if(ack&&(!send||ack.sendHash!==send.recordHash||ack.observedAt<send.issuedAt||ack.observedAt>=send.deadline))fail();Object.freeze(out.operations[op]);}
+  Object.freeze(out.operations);return Object.freeze(out);
+ }
+ async function append(id,suffix,kind,record,lease){
+  const v=prepare(kind,record),g=c.leaseGuard(lease),prefix=key(id),raw=encode(kind,v);g();
+  let status='uncertain';
+  try{
+   const result=await c.wait(Reflect.apply(c.transaction,c.storage,[async tx=>{
+    const tg=tx.get,tp=tx.put,tl=tx.list;if([tg,tp,tl].some(f=>typeof f!=='function'))fail();
+    const guard=()=>{g();if(tx.get!==tg||tx.put!==tp||tx.list!==tl)fail();};
+    const before=await readAll(id,guard,tx),r=before.reservation;
+    if(kind==='Reservation'){if(v.identity.preconnectionId!==id||v.identity.actorId!==c.actorId||v.identity.qaVersionId!==c.qa)fail();}
+    else{
+     if(!r)fail();
+     if(kind==='Send'&&(v.identityHash!==r.identity.identityHash||v.reservationHash!==r.recordHash||v.operation+':send'!==suffix||before.freeze&&!['close_fence','revoke_grant'].includes(v.operation)||v.issuedAt<r.issuedAt||v.deadline>(['close_fence','revoke_grant'].includes(v.operation)?r.identity.C1:r.identity.C0)))fail();
+     if(kind==='Ack'){const op=suffix.split(':')[0],s=before.operations[op]?.send;if(!s||v.sendHash!==s.recordHash||v.observedAt<s.issuedAt||v.observedAt>=s.deadline)fail();}
+     if(kind==='Freeze'&&(v.identityHash!==r.identity.identityHash||v.reservationHash!==r.recordHash||v.frozenAt<r.issuedAt||v.frozenAt>=r.identity.C1))fail();
+    }
+    guard();const old=await c.wait(Reflect.apply(tg,tx,[prefix+suffix]),guard);
+    if(old!==undefined){if(old!==raw)fail();return 'existing';}
+    guard();await c.wait(Reflect.apply(tp,tx,[prefix+suffix,raw]),guard);guard();return 'recorded';
+   }]),g);
+   g();await c.wait(Reflect.apply(c.sync,c.storage,[]),g);
+   const observed=await c.wait(Reflect.apply(c.get,c.storage,[prefix+suffix]),g);if(observed!==raw)fail();decode(kind,observed);status=result;
+  }catch{status='uncertain';}
+  return Object.freeze({status,recordHash:v.recordHash});
+ }
+ return Object.freeze({
+  appendReservation(record,lease){const v=prepare('Reservation',record);return append(v.identity.preconnectionId,'reservation','Reservation',v,lease);},
+  appendSend(options,lease){const v=own(options);fields(v,['preconnectionId','record']);const r=prepare('Send',v.record);return append(v.preconnectionId,r.operation+':send','Send',r,lease);},
+  appendAck(options,lease){const v=own(options);fields(v,['preconnectionId','operation','record']);if(!OPS.includes(v.operation))fail();return append(v.preconnectionId,v.operation+':ack','Ack',v.record,lease);},
+  read(options,lease){const v=own(options);fields(v,['preconnectionId']);const g=c.leaseGuard(lease);return readAll(v.preconnectionId,g);},
+  freeze(options,lease){const v=own(options);fields(v,['preconnectionId','record']);return append(v.preconnectionId,'freeze','Freeze',v.record,lease);}
+ });
+}

~~~~~~~~~~

## lib/mcp-qa-finite-preparation-issuer-records.mjs

~~~~~~~~~~diff
diff --git a/lib/mcp-qa-finite-preparation-issuer-records.mjs b/lib/mcp-qa-finite-preparation-issuer-records.mjs
--- /dev/null
+++ b/lib/mcp-qa-finite-preparation-issuer-records.mjs
@@ -0,0 +1,43 @@
+import {initialOwn as own,initialFields as fields,initialCanonical as canonical,initialHash as hash,initialHex as hex} from './mcp-qa-finite-initial-material-records.mjs';
+// Strict component DATA. Neither hashes nor these factories authorize business callers.
+export const FINITE_PREPARATION_ISSUER_PREFIX='afw.finite-preparation-issuer.v1:';
+export const FINITE_PREPARATION_ISSUER_OPERATIONS=Object.freeze(['open_fence','authorization','consume','grant','close_fence','revoke_grant']);
+const fail=()=>{throw Error('Finite preparation issuer record unavailable');};
+const check=x=>{if(!x)fail();};
+export const issuerTime=x=>Number.isSafeInteger(x)&&x>=0&&x<=8640000000000000;
+export const issuerUuid=x=>typeof x==='string'&&/^[a-f0-9]{8}(-[a-f0-9]{4}){3}-[a-f0-9]{12}$/.test(x);
+export const issuerIso=x=>typeof x==='string'&&/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d\.\d{3}Z$/.test(x)&&Number.isSafeInteger(Date.parse(x))&&new Date(x).toISOString()===x;
+const id=x=>typeof x==='string'&&x.length>0&&x.length<=200&&!/[\u0000-\u001f\u007f]/.test(x);
+export const issuerScopes=x=>Array.isArray(x)&&x.length>=1&&x.length<=2&&x[0]==='afw:project:read'&&new Set(x).size===x.length&&x.every(s=>['afw:project:read','afw:evidence:read'].includes(s));
+const identityKeys='preconnectionId enrollmentHash capsuleHash sourceRevision qaVersionId actorId subject accessRealmHash projectId projectRevision clientId resource authorizationHash grantId requestedScopes consentExpiresAt I0 C0 C1 reservedAt identityHash'.split(' ');
+function identity(input,hashing=false){
+ const v=own(input);fields(v,identityKeys.filter(k=>!hashing||k!=='identityHash'||Object.hasOwn(v,k)));
+ check(['preconnectionId','enrollmentHash','capsuleHash','actorId','accessRealmHash','authorizationHash'].every(k=>hex(v[k]))&&hex(v.sourceRevision,40)&&issuerUuid(v.qaVersionId)&&issuerUuid(v.grantId));
+ check(['subject','projectId','clientId'].every(k=>id(v[k]))&&Number.isSafeInteger(v.projectRevision)&&v.projectRevision>0&&v.resource==='https://delegated-canary.agentfriendlyweb.dev/mcp'&&issuerScopes(v.requestedScopes));
+ check(['I0','C0','C1','reservedAt'].every(k=>issuerTime(v[k]))&&v.C0===v.I0+900000&&v.C1===v.C0+180000&&v.reservedAt>=v.I0&&v.reservedAt<v.C0&&issuerIso(v.consentExpiresAt)&&Date.parse(v.consentExpiresAt)>v.reservedAt&&Date.parse(v.consentExpiresAt)<=v.C0);
+ if(!hashing)check(v.identityHash===hash('afw.finite-preparation-issuer-identity.v1',Object.fromEntries(Object.entries(v).filter(([k])=>k!=='identityHash'))));
+ return v;
+}
+export function validateFinitePreparationIssuerIdentity(v){return identity(v);}
+const defs={Reservation:['identity','requestHash','issuedAt','deadline'],Send:['identityHash','reservationHash','operation','requestId','requestHash','issuedAt','deadline'],Ack:['sendHash','rowHash','outcome','observedAt'],Freeze:['identityHash','reservationHash','frozenAt']};
+function validate(kind,input,hashing=false){
+ if(kind==='Identity')return identity(input,hashing);
+ check(Object.hasOwn(defs,kind));const v=own(input),purpose='afw.finite-preparation-issuer-'+kind.toLowerCase()+'.v1';
+ fields(v,['purpose',...defs[kind],...(!hashing||Object.hasOwn(v,'recordHash')?['recordHash']:[])]);
+ check(v.purpose===purpose&&Buffer.byteLength(canonical(v))<=16384);
+ for(const [k,x]of Object.entries(v))if(k.endsWith('Hash')&&k!=='rowHash')check(hex(x));
+ if(kind==='Reservation'){identity(v.identity);check(hex(v.requestHash)&&issuerTime(v.issuedAt)&&issuerTime(v.deadline)&&v.issuedAt>=v.identity.reservedAt&&v.deadline<=v.identity.C0);}
+ if(kind==='Send')check(FINITE_PREPARATION_ISSUER_OPERATIONS.includes(v.operation)&&(['close_fence','revoke_grant'].includes(v.operation)?issuerUuid(v.requestId):v.requestId===null)&&issuerTime(v.issuedAt)&&issuerTime(v.deadline));
+ if(kind==='Reservation'||kind==='Send')check(v.issuedAt<v.deadline&&v.deadline-v.issuedAt<=5000);
+ if(kind==='Ack')check(['applied','no_mutation'].includes(v.outcome)&&(v.rowHash===null?v.outcome==='no_mutation':hex(v.rowHash))&&issuerTime(v.observedAt));
+ if(kind==='Freeze')check(issuerTime(v.frozenAt));
+ if(!hashing)check(v.recordHash===hash(purpose,Object.fromEntries(Object.entries(v).filter(([k])=>k!=='recordHash'))));
+ return v;
+}
+export function sealFinitePreparationIssuerRecord(kind,input){
+ const v=validate(kind,input,true),self=kind==='Identity'?'identityHash':'recordHash',domain=kind==='Identity'?'afw.finite-preparation-issuer-identity.v1':v.purpose;
+ const body=Object.fromEntries(Object.entries(v).filter(([k])=>k!==self));
+ return validate(kind,{...body,[self]:hash(domain,body)});
+}
+export function encodeFinitePreparationIssuerRecord(kind,input){const raw=canonical(validate(kind,input));check(Buffer.byteLength(raw)<=16384);return raw;}
+export function decodeFinitePreparationIssuerRecord(kind,raw){check(typeof raw==='string'&&Buffer.byteLength(raw)<=16384);const v=validate(kind,JSON.parse(raw));check(canonical(v)===raw);return v;}

~~~~~~~~~~

## lib/mcp-qa-finite-preparation-issuer-store.mjs

~~~~~~~~~~diff
diff --git a/lib/mcp-qa-finite-preparation-issuer-store.mjs b/lib/mcp-qa-finite-preparation-issuer-store.mjs
--- /dev/null
+++ b/lib/mcp-qa-finite-preparation-issuer-store.mjs
@@ -0,0 +1,271 @@
+import {initialOwn as own,initialFields as fields,initialCanonical as canonical,initialHash as hash} from './mcp-qa-finite-initial-material-records.mjs';
+import {validateFinitePreparationIssuerIdentity as identity,issuerTime,issuerUuid,issuerIso,issuerScopes} from './mcp-qa-finite-preparation-issuer-records.mjs';
+import {captureFinitePreparationIssuerContext} from './mcp-qa-finite-preparation-issuer-journal.mjs';
+// SOURCE ONLY. This exact schema must be installed separately; never installed here.
+export const FINITE_PREPARATION_ISSUER_SCHEMA=Object.freeze([
+ "CREATE TABLE finite_preparation_issuer_fences (\n preconnection_id TEXT PRIMARY KEY NOT NULL CHECK (length(preconnection_id)=64 AND preconnection_id NOT GLOB '*[^a-f0-9]*'),\n authorization_hash TEXT UNIQUE NOT NULL CHECK (length(authorization_hash)=64 AND authorization_hash NOT GLOB '*[^a-f0-9]*'),\n grant_id TEXT UNIQUE NOT NULL CHECK (length(grant_id)=36 AND substr(grant_id,9,1)='-' AND substr(grant_id,14,1)='-' AND substr(grant_id,19,1)='-' AND substr(grant_id,24,1)='-' AND length(replace(grant_id,'-',''))=32 AND replace(grant_id,'-','') NOT GLOB '*[^a-f0-9]*'),\n enrollment_hash TEXT NOT NULL CHECK (length(enrollment_hash)=64 AND enrollment_hash NOT GLOB '*[^a-f0-9]*'),\n identity_hash TEXT NOT NULL CHECK (length(identity_hash)=64 AND identity_hash NOT GLOB '*[^a-f0-9]*'),\n reserved_at INTEGER NOT NULL CHECK (typeof(reserved_at)='integer' AND reserved_at>=0),\n forward_until INTEGER NOT NULL CHECK (typeof(forward_until)='integer'),\n cleanup_until INTEGER NOT NULL CHECK (typeof(cleanup_until)='integer' AND cleanup_until<=8640000000000000),\n fence_request_id TEXT NULL CHECK (fence_request_id IS NULL OR (length(fence_request_id)=36 AND substr(fence_request_id,9,1)='-' AND substr(fence_request_id,14,1)='-' AND substr(fence_request_id,19,1)='-' AND substr(fence_request_id,24,1)='-' AND length(replace(fence_request_id,'-',''))=32 AND replace(fence_request_id,'-','') NOT GLOB '*[^a-f0-9]*')),\n fenced_at INTEGER NULL CHECK (fenced_at IS NULL OR (typeof(fenced_at)='integer' AND reserved_at<=fenced_at AND fenced_at<cleanup_until)),\n CHECK (reserved_at<forward_until AND forward_until<cleanup_until),\n CHECK ((fence_request_id IS NULL)=(fenced_at IS NULL))\n)",
+ "CREATE TRIGGER finite_preparation_issuer_fences_no_delete BEFORE DELETE ON finite_preparation_issuer_fences BEGIN SELECT RAISE(ABORT,'issuer fence retained'); END",
+ "CREATE TRIGGER finite_preparation_issuer_fences_immutable_identity BEFORE UPDATE ON finite_preparation_issuer_fences WHEN NEW.preconnection_id IS NOT OLD.preconnection_id OR NEW.authorization_hash IS NOT OLD.authorization_hash OR NEW.grant_id IS NOT OLD.grant_id OR NEW.enrollment_hash IS NOT OLD.enrollment_hash OR NEW.identity_hash IS NOT OLD.identity_hash OR NEW.reserved_at IS NOT OLD.reserved_at OR NEW.forward_until IS NOT OLD.forward_until OR NEW.cleanup_until IS NOT OLD.cleanup_until BEGIN SELECT RAISE(ABORT,'issuer identity immutable'); END",
+ "CREATE TRIGGER finite_preparation_issuer_fences_terminal_fence BEFORE UPDATE ON finite_preparation_issuer_fences WHEN OLD.fenced_at IS NOT NULL AND (NEW.fenced_at IS NOT OLD.fenced_at OR NEW.fence_request_id IS NOT OLD.fence_request_id) BEGIN SELECT RAISE(ABORT,'issuer fence terminal'); END"
+]);
+
+const T='finite_preparation_issuer_fences',NOW="CAST(unixepoch('subsec')*1000 AS INTEGER)";
+const fail=()=>{throw Error('Finite preparation issuer SQL unavailable');};
+const check=x=>{if(!x)fail();};
+const isoMs=x=>"(CAST(strftime('%s',"+x+") AS INTEGER)*1000+CAST(substr("+x+",21,3) AS INTEGER))";
+const canonicalIso=x=>"typeof("+x+")='text' AND length("+x+")=24 AND strftime('%Y-%m-%dT%H:%M:%fZ',"+x+")="+x;
+const columns=['preconnection_id','authorization_hash','grant_id','enrollment_hash','identity_hash','reserved_at','forward_until','cleanup_until'];
+const match=(a='f',b='q')=>columns.map(k=>a+'.'+k+'='+b+'.'+k).join(' AND ');
+const qcols=[...columns,'subject','project','revision','client','resource','scopes','consent','started','deadline'];
+const cte='WITH q('+qcols.join(',')+') AS (SELECT '+qcols.map(()=>'?').join(',')+'), n(ms) AS (SELECT '+NOW+') ';
+const owner='EXISTS (SELECT 1 FROM site_projects p WHERE p.id=q.project AND p.user_id=q.subject AND p.revision=q.revision)';
+const windowSql='n.ms>=q.started AND n.ms<q.deadline';
+const live=windowSql+' AND n.ms<q.forward_until AND n.ms<'+isoMs('q.consent')+' AND '+canonicalIso('q.consent');
+const fence='EXISTS (SELECT 1 FROM '+T+' f WHERE '+match()+' AND f.fenced_at IS NULL)';
+const consent="c.handle_hash=q.authorization_hash AND c.user_id=q.subject AND c.kind='authorize' AND c.project_id=q.project AND c.client_id=q.client AND c.resource=q.resource AND c.scopes_json=q.scopes AND c.expires_at=q.consent";
+const consentCols='handle_hash,user_id,kind,project_id,client_id,resource,scopes_json,expires_at,consumed_at';
+const grantCols='id,user_id,client_id,project_id,resource,scopes_json,created_at,expires_at,revoked_at,exchanged_at';
+const normalized=x=>x.replace(/\s+/g,' ').trim().replace(/;$/,'');
+
+// Metadata only: ordinary DDL is installed exclusively by the SYN fixture.
+export const FINITE_PREPARATION_MONITORING_SCHEMA=Object.freeze([
+ "CREATE TABLE IF NOT EXISTS dossier_monitoring_consent_events (\n sequence INTEGER PRIMARY KEY AUTOINCREMENT,\n grant_id TEXT NOT NULL,\n project_id TEXT NOT NULL,\n user_id TEXT NOT NULL,\n client_id TEXT NOT NULL,\n resource TEXT NOT NULL,\n revision INTEGER NOT NULL CHECK(revision>0),\n action TEXT NOT NULL CHECK(action IN ('grant','revoke')),\n purpose TEXT NOT NULL CHECK(purpose='afw.dossier-monitoring.v1'),\n request_id TEXT NOT NULL,\n issued_at INTEGER NOT NULL CHECK(issued_at>=0),\n expires_at INTEGER NOT NULL,\n CHECK((action='grant' AND expires_at>issued_at AND expires_at-issued_at<=600000) OR (action='revoke' AND expires_at=issued_at)),\n UNIQUE(grant_id,request_id)\n)",
+ "CREATE INDEX IF NOT EXISTS dossier_monitoring_consent_grant_sequence ON dossier_monitoring_consent_events(grant_id,sequence)",
+ "CREATE TRIGGER IF NOT EXISTS dossier_monitoring_no_update BEFORE UPDATE ON dossier_monitoring_consent_events BEGIN SELECT RAISE(ABORT,'Monitoring history is append only'); END",
+ "CREATE TRIGGER IF NOT EXISTS dossier_monitoring_no_delete BEFORE DELETE ON dossier_monitoring_consent_events BEGIN SELECT RAISE(ABORT,'Monitoring history is append only'); END",
+ "CREATE TABLE IF NOT EXISTS dossier_monitoring_owner_tickets (\n handle_hash TEXT PRIMARY KEY,\n request_id TEXT NOT NULL UNIQUE,\n user_id TEXT NOT NULL,\n grant_id TEXT NOT NULL,\n project_id TEXT NOT NULL,\n client_id TEXT NOT NULL,\n resource TEXT NOT NULL,\n purpose TEXT NOT NULL CHECK(purpose='afw.dossier-monitoring-owner.v1'),\n action TEXT NOT NULL CHECK(action IN ('grant','revoke')),\n revision INTEGER NOT NULL CHECK(revision>0),\n expected_sequence INTEGER NOT NULL CHECK(expected_sequence>=0),\n issued_at INTEGER NOT NULL,\n expires_at INTEGER NOT NULL CHECK(expires_at>issued_at AND expires_at-issued_at<=600000),\n permission_expires_at INTEGER NOT NULL\n)",
+ "CREATE TRIGGER IF NOT EXISTS dossier_monitoring_tickets_no_update BEFORE UPDATE ON dossier_monitoring_owner_tickets BEGIN SELECT RAISE(ABORT,'Monitoring form is immutable'); END",
+ "CREATE TRIGGER IF NOT EXISTS dossier_monitoring_tickets_no_delete BEFORE DELETE ON dossier_monitoring_owner_tickets BEGIN SELECT RAISE(ABORT,'Monitoring form is immutable'); END"
+]);
+const monitoringTables=['dossier_monitoring_consent_events','dossier_monitoring_owner_tickets'];
+const ticketColumns='handle_hash request_id user_id grant_id project_id client_id resource purpose action revision expected_sequence issued_at expires_at permission_expires_at'.split(' ');
+const eventColumns='sequence grant_id project_id user_id client_id resource revision action purpose request_id issued_at expires_at'.split(' ');
+const monitoringNames=['identity','expectedGrant','consumedAt','accessExpiresAt','preconnectionExpiresAt','window'];
+const monitoringQ=[...qcols,'grant_scopes','created','grant_expiry','consumed','access_until','preconnection_until','handle','request','expected_sequence','issued','ticket_expiry','permission'];
+const monitoringCte='WITH q('+monitoringQ.join(',')+') AS (SELECT '+monitoringQ.map(()=>'?').join(',')+'), n(ms) AS (SELECT '+NOW+') ';
+const monitoringNormalize=x=>normalized(x).replace(/^CREATE (TABLE|INDEX|TRIGGER) IF NOT EXISTS /,'CREATE $1 ');
+const monitoringFence='EXISTS (SELECT 1 FROM '+T+' f WHERE '+match()+' AND f.fenced_at IS NULL AND f.fence_request_id IS NULL)';
+const monitoringGrant="g.id=q.grant_id AND g.user_id=q.subject AND g.project_id=q.project AND g.client_id=q.client AND g.resource=q.resource AND g.scopes_json=q.grant_scopes AND g.created_at=q.created AND g.expires_at=q.grant_expiry AND g.revoked_at='' AND "+canonicalIso('g.created_at')+' AND '+canonicalIso('g.expires_at')+' AND '+isoMs('g.created_at')+'>='+isoMs('q.consumed')+' AND '+isoMs('g.created_at')+'<=n.ms AND (g.exchanged_at=\'\' OR ('+canonicalIso('g.exchanged_at')+' AND '+isoMs('g.exchanged_at')+'>='+isoMs('g.created_at')+' AND '+isoMs('g.exchanged_at')+'<=n.ms AND '+isoMs('g.exchanged_at')+'<'+isoMs('g.expires_at')+'))';
+const monitoringLive=owner+' AND '+monitoringFence+' AND '+live+' AND n.ms>=q.issued AND n.ms<'+isoMs('g.expires_at')+' AND n.ms<q.access_until AND n.ms<q.preconnection_until AND n.ms<q.ticket_expiry AND n.ms<q.permission AND '+canonicalIso('q.consumed')+" AND c.consumed_at=q.consumed AND c.consumed_at<>'' AND COALESCE((SELECT MAX(sequence) FROM dossier_monitoring_consent_events WHERE grant_id=q.grant_id),0)=q.expected_sequence AND q.expected_sequence=0 AND NOT EXISTS (SELECT 1 FROM dossier_monitoring_consent_events WHERE grant_id=q.grant_id)";
+const monitoringFrom=' FROM q,n JOIN delegated_consent_sessions c ON '+consent+' JOIN delegated_access_grants g ON '+monitoringGrant;
+const ticketExpressions=["q.handle","q.request","q.subject","q.grant_id","q.project","q.client","q.resource","'afw.dossier-monitoring-owner.v1'","'grant'","q.revision","q.expected_sequence","q.issued","q.ticket_expiry","q.permission"];
+const monitoringTicketMatch=ticketColumns.map((k,j)=>'t.'+k+'='+ticketExpressions[j]).join(' AND ');
+
+export function createFinitePreparationIssuerStore(options){
+ fields(options,['ctx','env']);const c=captureFinitePreparationIssuerContext(options),consumptions=new WeakMap(),barriers=new WeakMap(),observations=new WeakMap(),grantAttempts=new Set(),closeAttempts=new Set();
+ function input(options,names){
+  // Snapshot DATA before the first await; witnesses are kept by identity separately.
+  fields(options,names);const data=own(Object.fromEntries(names.filter(k=>!['consumption','barrier','observation'].includes(k)).map(k=>[k,Object.getOwnPropertyDescriptor(options,k).value])));
+  const i=identity(data.identity),w=data.window;fields(w,['startedAt','deadline']);
+  check(issuerTime(w.startedAt)&&issuerTime(w.deadline)&&w.startedAt<w.deadline&&w.deadline-w.startedAt<=5000&&w.startedAt>=i.reservedAt);
+  check(i.actorId===c.actorId&&i.qaVersionId===c.qa);
+  return {...data,identity:i,window:w};
+ }
+ function values(i,w){return [i.preconnectionId,i.authorizationHash,i.grantId,i.enrollmentHash,i.identityHash,i.reservedAt,i.C0,i.C1,i.subject,i.projectId,i.projectRevision,i.clientId,i.resource,JSON.stringify(i.requestedScopes),i.consentExpiresAt,w.startedAt,w.deadline];}
+ function forward(i,w){check(w.deadline<=Math.min(i.C0,Date.parse(i.consentExpiresAt)));}
+ function cleanup(i,w){check(w.deadline<=i.C1);}
+ function exactFence(row,i,requestId,terminal=true){
+  check(row&&columns.every((k,n)=>row[k]===values(i,{startedAt:0,deadline:1})[n]));
+  if(terminal)check(row.fence_request_id===requestId&&issuerTime(row.fenced_at)&&row.fenced_at>=i.reservedAt&&row.fenced_at<i.C1);
+  return Object.freeze({...row});
+ }
+ async function query(sql,args,g,session=null,mode='first'){
+  g();const s=session??Reflect.apply(c.session,c.db,['first-primary']),prepare=s?.prepare;
+  check(typeof prepare==='function');const stmt=Reflect.apply(prepare,s,[sql]),bind=stmt?.bind;check(typeof bind==='function');
+  const bound=Reflect.apply(bind,stmt,args),method=bound?.[mode];check(typeof method==='function');
+  const r=await c.wait(Reflect.apply(method,bound,[]),g);g();return r;
+ }
+ async function preflight(g){
+  const s=Reflect.apply(c.session,c.db,['first-primary']);
+  const r=await query("SELECT type,name,sql FROM sqlite_schema WHERE tbl_name='"+T+"' AND type IN ('table','trigger') ORDER BY type,name",[],g,s,'all');
+  const rows=r.results??[];check(rows.length===4);
+  for(const def of FINITE_PREPARATION_ISSUER_SCHEMA){const name=def.match(/^CREATE (?:TABLE|TRIGGER) (\w+)/)[1];check(rows.some(x=>x.name===name&&normalized(x.sql)===normalized(def)));}
+  const clock=await query("SELECT "+NOW+" AS ms,typeof("+NOW+") AS kind,"+isoMs("'2026-11-04T12:00:00.123Z'")+" AS iso,strftime('%Y-%m-%dT%H:%M:%fZ','2026-11-04T12:00:00.123Z') AS canonical",[],g,s);
+  check(issuerTime(clock?.ms)&&clock.ms>0&&clock.kind==='integer'&&clock.iso===1793793600123&&clock.canonical==='2026-11-04T12:00:00.123Z');
+  await query('SELECT '+consentCols+' FROM delegated_consent_sessions LIMIT 0',[],g,s,'all');
+  await query('SELECT '+grantCols+' FROM delegated_access_grants LIMIT 0',[],g,s,'all');
+  await query('SELECT id,user_id,revision FROM site_projects LIMIT 0',[],g,s,'all');
+  // The ordinary tables retain their semantics; qualify their actual declared domains.
+  for(const [table,expected]of [
+   ['delegated_consent_sessions',Object.fromEntries(consentCols.split(',').map(k=>[k,'TEXT']))],
+   ['delegated_access_grants',Object.fromEntries(grantCols.split(',').map(k=>[k,'TEXT']))],
+   ['site_projects',{id:'TEXT',user_id:'TEXT',revision:'INTEGER'}]
+  ]){
+   const shape=await query('PRAGMA table_info('+table+')',[],g,s,'all');
+   check(Object.entries(expected).every(([name,type])=>(shape.results??[]).some(col=>col.name===name&&col.type.toUpperCase()===type)));
+  }g();
+ }
+ function grantData(v,i){
+  fields(v,['scopes','createdAt','expiresAt']);check(issuerScopes(v.scopes)&&v.scopes.every(x=>i.requestedScopes.includes(x))&&issuerIso(v.createdAt)&&issuerIso(v.expiresAt)&&Date.parse(v.createdAt)>=i.reservedAt&&Date.parse(v.createdAt)<Date.parse(v.expiresAt)&&Date.parse(v.expiresAt)<=Math.min(Date.parse(i.consentExpiresAt),i.C0));
+  return v;
+ }
+ function consumptionRow(row,i,consumedAt){
+  check(issuerIso(consumedAt)&&Date.parse(consumedAt)>=i.reservedAt&&Date.parse(consumedAt)<Math.min(Date.parse(i.consentExpiresAt),i.C0));
+  check(row&&row.handle_hash===i.authorizationHash&&row.user_id===i.subject&&row.kind==='authorize'&&row.project_id===i.projectId&&row.client_id===i.clientId&&row.resource===i.resource&&row.scopes_json===JSON.stringify(i.requestedScopes)&&row.expires_at===i.consentExpiresAt&&row.consumed_at===consumedAt);
+  return Object.freeze({...row});
+ }
+ function grantRow(row,i,g){
+  check(row&&row.id===i.grantId&&row.user_id===i.subject&&row.client_id===i.clientId&&row.project_id===i.projectId&&row.resource===i.resource&&row.scopes_json===JSON.stringify(g.scopes)&&row.created_at===g.createdAt&&row.expires_at===g.expiresAt&&typeof row.revoked_at==='string'&&(row.revoked_at===''||issuerIso(row.revoked_at))&&typeof row.exchanged_at==='string'&&(row.exchanged_at===''||issuerIso(row.exchanged_at)));
+  return Object.freeze({...row});
+ }
+ function witness(map,v,i,lease){const w=map.get(v);check(w&&w.identityHash===i.identityHash&&w.lease===lease);return w;}
+ async function readBarrier(i,requestId,w,g){
+  // SELECT is deliberately the FIRST statement on a NEW first-primary session.
+  const s=Reflect.apply(c.session,c.db,['first-primary']);
+  const r=await query(cte+'SELECT f.* FROM '+T+' f,q,n WHERE '+match()+' AND f.fence_request_id=? AND f.fenced_at IS NOT NULL AND '+owner+' AND '+windowSql+' AND n.ms<q.cleanup_until', [...values(i,w),requestId],g,s);
+  return exactFence(r,i,requestId);
+ }
+ async function barrierResult(i,requestId,w,g,lease,ack=null){
+  const row=await readBarrier(i,requestId,w,g);if(ack)check(canonical(row)===canonical(ack));
+  const result=Object.freeze({status:'fenced',row,rowHash:hash('afw.finite-preparation-issuer-row.v1',row)});
+  barriers.set(result,{identityHash:i.identityHash,lease,row});return result;
+ }
+
+ // New notice boundary deliberately leaves the original input/preflight untouched.
+ const monitoringWitnesses=new WeakMap(),ticketAttempts=new Set(),noticeAttempts=new Set(),monitoringFailed=new Set();
+ function monitoringGuard(id,lease){
+  const original=c.leaseGuard(lease);
+  return ()=>{check(!monitoringFailed.has(id));original();check(!monitoringFailed.has(id));};
+ }
+ function monitoringInput(options,hasWitness,argc){
+  check(argc===2);const names=[...monitoringNames,hasWitness?'ticketWitness':'ticket'];fields(options,names);
+  const data=own(Object.fromEntries(names.filter(k=>k!=='ticketWitness').map(k=>[k,Object.getOwnPropertyDescriptor(options,k).value])));
+  const i=identity(data.identity),w=data.window;fields(w,['startedAt','deadline']);
+  check(issuerTime(w.startedAt)&&issuerTime(w.deadline)&&w.startedAt<w.deadline&&w.deadline-w.startedAt<=5000&&w.startedAt>=i.reservedAt);
+  check(i.actorId===c.actorId&&i.qaVersionId===c.qa);forward(i,w);grantData(data.expectedGrant,i);
+  check(issuerIso(data.consumedAt)&&Date.parse(data.consumedAt)>=i.reservedAt&&Date.parse(data.expectedGrant.createdAt)>=Date.parse(data.consumedAt));
+  check(issuerTime(data.accessExpiresAt)&&issuerTime(data.preconnectionExpiresAt)&&data.accessExpiresAt<=i.C0&&data.preconnectionExpiresAt<=i.C0);
+  return data;
+ }
+ function monitoringTicket(data,t){
+  const i=data.identity,g=data.expectedGrant;
+  fields(t,['handleHash','requestId','expectedSequence','issuedAt','expiresAt','permissionExpiresAt']);
+  check(typeof t.handleHash==='string'&&/^[a-f0-9]{64}$/.test(t.handleHash)&&issuerUuid(t.requestId)&&t.expectedSequence===0);
+  check(['issuedAt','expiresAt','permissionExpiresAt'].every(k=>issuerTime(t[k]))&&t.issuedAt>=Math.max(i.reservedAt,Date.parse(g.createdAt),Date.parse(data.consumedAt)));
+  check(t.issuedAt<t.permissionExpiresAt&&t.permissionExpiresAt<=t.expiresAt&&t.expiresAt-t.issuedAt<=600000);
+  check(t.expiresAt<=Math.min(i.C0,Date.parse(i.consentExpiresAt),Date.parse(g.expiresAt),data.accessExpiresAt,data.preconnectionExpiresAt));
+  check(Buffer.byteLength(canonical({...data,ticket:t}))<=16384);
+  return t;
+ }
+ const monitoringCommon=data=>Object.freeze(Object.fromEntries(monitoringNames.map(k=>[k,data[k]])));
+ function monitoringValues(d,t){return [...values(d.identity,d.window),JSON.stringify(d.expectedGrant.scopes),d.expectedGrant.createdAt,d.expectedGrant.expiresAt,d.consumedAt,d.accessExpiresAt,d.preconnectionExpiresAt,t.handleHash,t.requestId,t.expectedSequence,t.issuedAt,t.expiresAt,t.permissionExpiresAt];}
+ function expectedTicket(d,t){const i=d.identity;return {handle_hash:t.handleHash,request_id:t.requestId,user_id:i.subject,grant_id:i.grantId,project_id:i.projectId,client_id:i.clientId,resource:i.resource,purpose:'afw.dossier-monitoring-owner.v1',action:'grant',revision:i.projectRevision,expected_sequence:t.expectedSequence,issued_at:t.issuedAt,expires_at:t.expiresAt,permission_expires_at:t.permissionExpiresAt};}
+ function monitoringRow(row,expected,names){
+  const snapshot=own(row);fields(snapshot,names);check(Object.entries(expected).every(([k,v])=>snapshot[k]===v));return snapshot;
+ }
+ async function monitoringPreflight(g){
+  await preflight(g);g();
+  const s=Reflect.apply(c.session,c.db,['first-primary']);
+  const rows=(await query("SELECT type,name,tbl_name,sql FROM sqlite_schema WHERE tbl_name IN ('dossier_monitoring_consent_events','dossier_monitoring_owner_tickets') AND sql IS NOT NULL ORDER BY name",[],g,s,'all')).results??[];
+  check(rows.length===FINITE_PREPARATION_MONITORING_SCHEMA.length);
+  for(const def of FINITE_PREPARATION_MONITORING_SCHEMA){
+   const [,kind,name]=def.match(/^CREATE (TABLE|INDEX|TRIGGER) IF NOT EXISTS (\w+)/);
+   const table=kind==='TABLE'?name:def.match(/(?: ON | ON)(\w+)/)?.[1];
+   // Index syntax has ON table without surrounding spaces; triggers have ON table.
+   check(rows.some(r=>r.type===kind.toLowerCase()&&r.name===name&&r.tbl_name===table&&typeof r.sql==='string'&&monitoringNormalize(r.sql)===monitoringNormalize(def)));
+  }
+  for(const table of monitoringTables){
+   const ticket=table===monitoringTables[1],names=ticket?ticketColumns:eventColumns;
+   const integers=new Set(ticket?['revision','expected_sequence','issued_at','expires_at','permission_expires_at']:['sequence','revision','issued_at','expires_at']);
+   const shape=(await query('PRAGMA table_info('+table+')',[],g,s,'all')).results??[];
+   check(shape.length===names.length&&shape.every((col,j)=>col.cid===j&&col.name===names[j]&&col.type.toUpperCase()===(integers.has(col.name)?'INTEGER':'TEXT')&&col.pk===(j===0?1:0)&&col.notnull===(j===0?0:1)&&col.dflt_value===null));
+  }g();
+ }
+ return Object.freeze({
+  async insertMonitoringTicket(options,lease){
+   let id;
+   try{
+    const d=monitoringInput(options,false,arguments.length),t=monitoringTicket(d,d.ticket);id=d.identity.identityHash;
+    check(!monitoringFailed.has(id)&&!ticketAttempts.has(id)&&!noticeAttempts.has(id));ticketAttempts.add(id);
+    const g=monitoringGuard(id,lease);g();await monitoringPreflight(g);g();
+    const row=await query(monitoringCte+'INSERT INTO dossier_monitoring_owner_tickets ('+ticketColumns.join(',')+') SELECT '+ticketExpressions.join(',')+monitoringFrom+' WHERE '+monitoringLive+' RETURNING '+ticketColumns.join(','),monitoringValues(d,t),g);
+    g();return row?Object.freeze({status:'applied',row:monitoringRow(row,expectedTicket(d,t),ticketColumns)}):Object.freeze({status:'no_mutation'});
+   }catch{if(id)monitoringFailed.add(id);fail();}
+  },
+  async observeMonitoringTicket(options,lease){
+   try{
+    const d=monitoringInput(options,false,arguments.length),t=monitoringTicket(d,d.ticket),id=d.identity.identityHash;
+    check(!monitoringFailed.has(id));const g=monitoringGuard(id,lease);g();await monitoringPreflight(g);g();
+    // This conditional SELECT is the FIRST statement on a NEW first-primary.
+    const s=Reflect.apply(c.session,c.db,['first-primary']);
+    const row=await query(monitoringCte+'SELECT t.*'+monitoringFrom+' JOIN dossier_monitoring_owner_tickets t ON '+monitoringTicketMatch+' WHERE '+monitoringLive,monitoringValues(d,t),g,s);
+    g();if(!row)return null;
+    const detached=monitoringRow(row,expectedTicket(d,t),ticketColumns),out=Object.freeze({status:'observed',row:detached});
+    monitoringWitnesses.set(out,{row:detached,identityHash:id,common:monitoringCommon(d),ticket:t,lease,used:false});return out;
+   }catch{fail();}
+  },
+  async insertMonitoringConsent(options,lease){
+   let id;
+   try{
+    const d=monitoringInput(options,true,arguments.length),fact=monitoringWitnesses.get(Object.getOwnPropertyDescriptor(options,'ticketWitness').value);id=d.identity.identityHash;
+    check(fact&&!fact.used&&fact.identityHash===id&&fact.lease===lease&&canonical(fact.common)===canonical(monitoringCommon(d)));
+    const t=monitoringTicket(d,fact.ticket);
+    check(!monitoringFailed.has(id)&&!noticeAttempts.has(id));fact.used=true;noticeAttempts.add(id);
+    const g=monitoringGuard(id,lease);g();await monitoringPreflight(g);g();
+    const row=await query(monitoringCte+"INSERT INTO dossier_monitoring_consent_events ("+eventColumns.slice(1).join(',')+") SELECT q.grant_id,q.project,q.subject,q.client,q.resource,q.revision,'grant','afw.dossier-monitoring.v1',q.request,n.ms,q.permission"+monitoringFrom+' JOIN dossier_monitoring_owner_tickets t ON '+monitoringTicketMatch+' WHERE '+monitoringLive+' RETURNING '+eventColumns.join(','),monitoringValues(d,t),g);
+    g();if(!row)return Object.freeze({status:'no_mutation'});
+    check(Number.isSafeInteger(row.sequence)&&row.sequence>0&&issuerTime(row.issued_at)&&row.issued_at>=Math.max(d.window.startedAt,t.issuedAt)&&row.issued_at<Math.min(d.window.deadline,t.permissionExpiresAt));
+    const i=d.identity,expected={grant_id:i.grantId,project_id:i.projectId,user_id:i.subject,client_id:i.clientId,resource:i.resource,revision:i.projectRevision,action:'grant',purpose:'afw.dossier-monitoring.v1',request_id:t.requestId,expires_at:t.permissionExpiresAt};
+    return Object.freeze({status:'applied',row:monitoringRow(row,expected,eventColumns)});
+   }catch{if(id)monitoringFailed.add(id);fail();}
+  },
+
+  async openFence(options,lease){
+   const {identity:i,window:w}=input(options,['identity','window']);forward(i,w);const g=c.leaseGuard(lease);await preflight(g);
+   const row=await query(cte+'INSERT INTO '+T+' ('+columns.join(',')+') SELECT '+columns.map(k=>'q.'+k).join(',')+' FROM q,n WHERE '+owner+' AND '+live+' RETURNING *',values(i,w),g);
+   return row?Object.freeze({status:'applied',row:exactFence(row,i,null,false)}):Object.freeze({status:'no_mutation'});
+  },
+  async insertAuthorization(options,lease){
+   const {identity:i,window:w}=input(options,['identity','window']);forward(i,w);const g=c.leaseGuard(lease);await preflight(g);
+   const row=await query(cte+"INSERT INTO delegated_consent_sessions ("+consentCols+") SELECT q.authorization_hash,q.subject,'authorize',q.project,q.client,q.resource,q.scopes,q.consent,'' FROM q,n WHERE "+owner+' AND '+fence+' AND '+live+' RETURNING *',values(i,w),g);
+   return row?Object.freeze({status:'applied',row:Object.freeze({...row})}):Object.freeze({status:'no_mutation'});
+  },
+  async consumeAuthorization(options,lease){
+   const {identity:i,window:w,consumedAt}=input(options,['identity','consumedAt','window']);forward(i,w);check(issuerIso(consumedAt)&&Date.parse(consumedAt)>=i.reservedAt&&Date.parse(consumedAt)<Math.min(Date.parse(i.consentExpiresAt),i.C0));
+   const g=c.leaseGuard(lease);await preflight(g);
+   const row=await query(cte+"UPDATE delegated_consent_sessions AS c SET consumed_at=? FROM q,n WHERE "+consent+" AND c.consumed_at='' AND "+owner+' AND '+fence+' AND '+live+' AND n.ms<'+isoMs('c.expires_at')+' RETURNING '+consentCols,[...values(i,w),consumedAt],g);
+   if(!row)return null;
+   const result=consumptionRow(row,i,consumedAt);consumptions.set(result,{identityHash:i.identityHash,lease,used:false});return result;
+  },
+  async insertReadGrant(options,lease){
+   const {identity:i,window:w,grant}=input(options,['identity','consumption','grant','window']);forward(i,w);grantData(grant,i);
+   const fact=witness(consumptions,options.consumption,i,lease);check(!fact.used&&!grantAttempts.has(i.identityHash));fact.used=true;grantAttempts.add(i.identityHash);
+   const consumed=options.consumption,guard=c.leaseGuard(lease);check(Date.parse(grant.createdAt)>=Date.parse(consumed.consumed_at));guard();await preflight(guard);
+   const row=await query(cte+'INSERT INTO delegated_access_grants (id,user_id,client_id,project_id,resource,scopes_json,created_at,expires_at,revoked_at) SELECT q.grant_id,q.subject,q.client,q.project,q.resource,?,?,?,\'\' FROM q,n JOIN delegated_consent_sessions c ON '+consent+' AND c.consumed_at=? WHERE '+owner+' AND '+fence+' AND '+live+' AND n.ms<'+isoMs('c.expires_at')+' AND n.ms<'+isoMs('?')+' RETURNING '+grantCols,[...values(i,w),JSON.stringify(grant.scopes),grant.createdAt,grant.expiresAt,consumed.consumed_at,grant.expiresAt,grant.expiresAt],guard);
+   return row?Object.freeze({status:'applied',row:grantRow(row,i,grant)}):Object.freeze({status:'no_mutation'});
+  },
+  async closeFence(options,lease){
+   const {identity:i,window:w,fenceRequestId}=input(options,['identity','fenceRequestId','window']);cleanup(i,w);check(issuerUuid(fenceRequestId)&&!closeAttempts.has(i.identityHash));closeAttempts.add(i.identityHash);
+   const g=c.leaseGuard(lease);await preflight(g);
+   const row=await query(cte+'INSERT INTO '+T+' ('+columns.join(',')+',fence_request_id,fenced_at) SELECT '+columns.map(k=>'q.'+k).join(',')+',?,n.ms FROM q,n WHERE '+owner+' AND '+windowSql+' AND n.ms<q.cleanup_until AND n.ms>=q.reserved_at ON CONFLICT(preconnection_id) DO UPDATE SET fence_request_id=excluded.fence_request_id,fenced_at=CASE WHEN '+T+'.fenced_at IS NULL THEN excluded.fenced_at ELSE '+T+'.fenced_at END WHERE '+columns.map(k=>T+'.'+k+'=excluded.'+k).join(' AND ')+' AND ('+T+'.fenced_at IS NULL OR '+T+'.fence_request_id=excluded.fence_request_id) RETURNING *',[...values(i,w),fenceRequestId],g);
+   exactFence(row,i,fenceRequestId);return barrierResult(i,fenceRequestId,w,g,lease,row);
+  },
+  async reconcileFence(options,lease){
+   const {identity:i,window:w,fenceRequestId}=input(options,['identity','fenceRequestId','window']);cleanup(i,w);check(issuerUuid(fenceRequestId));const g=c.leaseGuard(lease);await preflight(g);
+   return barrierResult(i,fenceRequestId,w,g,lease);
+  },
+  async observeGrant(options,lease){
+   const {identity:i,window:w,expectedGrant}=input(options,['identity','barrier','expectedGrant','window']);cleanup(i,w);grantData(expectedGrant,i);const b=witness(barriers,options.barrier,i,lease),g=c.leaseGuard(lease);await preflight(g);
+   // Reconfirm the terminal barrier BEFORE the original-UUID lookup.
+   await readBarrier(i,b.row.fence_request_id,w,g);
+   const result=await query(cte+'SELECT g.* FROM q,n JOIN site_projects p ON p.id=q.project AND p.user_id=q.subject AND p.revision=q.revision LEFT JOIN delegated_access_grants g ON g.id=q.grant_id WHERE '+windowSql+' AND n.ms<q.cleanup_until',values(i,w),g);
+   // LEFT JOIN preserves current-owner proof even when the grant is absent.
+   check(result);let row=null,consumedAt=null;
+   if(result.id!==null){
+    row=grantRow(result,i,expectedGrant);
+    const consumed=await query(cte+'SELECT c.* FROM delegated_consent_sessions c,q,n WHERE '+consent+" AND c.consumed_at<>'' AND "+owner+' AND '+windowSql+' AND n.ms<q.cleanup_until',values(i,w),g);
+    check(consumed&&issuerIso(consumed.consumed_at));consumptionRow(consumed,i,consumed.consumed_at);consumedAt=consumed.consumed_at;
+   }
+   const out=Object.freeze({status:row?'observed':'absent',row});observations.set(out,{identityHash:i.identityHash,lease,row,barrier:options.barrier,expectedGrant,consumedAt});return out;
+  },
+  async revokeGrant(options,lease){
+   const {identity:i,window:w}=input(options,['identity','barrier','observation','window']);cleanup(i,w);
+   const b=witness(barriers,options.barrier,i,lease),o=witness(observations,options.observation,i,lease);check(o.barrier===options.barrier&&o.row);const g=c.leaseGuard(lease);await preflight(g);await readBarrier(i,b.row.fence_request_id,w,g);
+   if(o.row.revoked_at!=='')return Object.freeze({status:'already_revoked',row:o.row});
+   const grant=o.expectedGrant;
+   const row=await query(cte+"UPDATE delegated_access_grants AS g SET revoked_at=strftime('%Y-%m-%dT%H:%M:%fZ','now') FROM q,n WHERE g.id=q.grant_id AND g.user_id=q.subject AND g.client_id=q.client AND g.project_id=q.project AND g.resource=q.resource AND g.scopes_json=? AND g.created_at=? AND g.expires_at=? AND g.revoked_at='' AND "+owner+' AND EXISTS (SELECT 1 FROM '+T+' f WHERE '+match()+' AND f.fence_request_id=? AND f.fenced_at=?) AND EXISTS (SELECT 1 FROM delegated_consent_sessions c WHERE '+consent+" AND c.consumed_at=?) AND "+windowSql+' AND n.ms<q.cleanup_until AND '+canonicalIso('g.expires_at')+' AND '+canonicalIso('q.consent')+' RETURNING '+grantCols,[...values(i,w),JSON.stringify(grant.scopes),grant.createdAt,grant.expiresAt,b.row.fence_request_id,b.row.fenced_at,o.consumedAt],g);
+   // Actual UPDATE result only. A race/unknown never becomes a successful DTO.
+   return row?Object.freeze({status:'revoked',row:grantRow(row,i,grant)}):Object.freeze({status:'no_mutation'});
+  }
+ });
+}

~~~~~~~~~~

## lib/mcp-qa-finite-preparation-notice-journal.mjs

~~~~~~~~~~diff
diff --git a/lib/mcp-qa-finite-preparation-notice-journal.mjs b/lib/mcp-qa-finite-preparation-notice-journal.mjs
--- /dev/null
+++ b/lib/mcp-qa-finite-preparation-notice-journal.mjs
@@ -0,0 +1,78 @@
+import {initialOwn as own,initialFields as fields,initialHex as hex,initialHash as hash} from './mcp-qa-finite-initial-material-records.mjs';
+import {FINITE_PREPARATION_NOTICE_PREFIX as P,FINITE_PREPARATION_NOTICE_OPERATIONS as OPS,encodeFinitePreparationNoticeRecord as encode,decodeFinitePreparationNoticeRecord as decode} from './mcp-qa-finite-preparation-notice-records.mjs';
+import {captureFinitePreparationIssuerContext} from './mcp-qa-finite-preparation-issuer-journal.mjs';
+const fail=()=>{throw Error('Finite preparation notice unavailable');};
+const check=x=>{if(!x)fail();};
+const safe=fn=>{try{return fn();}catch{fail();}};
+const prepare=(kind,v)=>decode(kind,encode(kind,v));
+const key=id=>{check(hex(id));return P+id+':';};
+function validateHistory(out,id,c){
+ const r=out.reservation,{ticket,consent}=out.operations;
+ if(!r){check(!out.freeze&&!ticket.send&&!ticket.ack&&!consent.send&&!consent.ack);return out;}
+ check(r.identity.preconnectionId===id&&r.identity.actorId===c.actorId&&r.identity.qaVersionId===c.qa);
+ if(out.freeze)check(out.freeze.identityHash===r.identity.identityHash&&out.freeze.reservationHash===r.recordHash&&out.freeze.frozenAt>=r.issuedAt&&out.freeze.frozenAt<r.identity.C1);
+ for(const op of OPS){
+  const {send:s,ack:a}=out.operations[op];
+  if(s){
+   check(s.operation===op&&s.identityHash===r.identity.identityHash&&s.reservationHash===r.recordHash&&s.window.startedAt>=r.issuedAt);
+   check(s.accessExpiresAt<=r.accessExpiresAt&&s.accessExpiresAt>=r.ticket.expiresAt&&(op!=='ticket'||s.accessExpiresAt===r.accessExpiresAt));
+   check(s.window.deadline<=Math.min(r.identity.C0,Date.parse(r.identity.consentExpiresAt),Date.parse(r.expectedGrant.expiresAt),s.accessExpiresAt,r.preconnectionExpiresAt,r.ticket.expiresAt,r.ticket.permissionExpiresAt));
+   const decision=op==='ticket'?null:hash('afw.finite-preparation-notice-decision.v1',{identityHash:r.identity.identityHash,ticketRequestId:r.ticket.requestId,handleHash:r.ticket.handleHash,method:'POST',path:'/monitoring/grant',action:'grant',issuedAt:s.issuedAt});
+   check(s.decisionHash===decision);
+   const common={identity:r.identity,expectedGrant:r.expectedGrant,consumedAt:r.consumedAt,accessExpiresAt:s.accessExpiresAt,preconnectionExpiresAt:r.preconnectionExpiresAt,window:s.window};
+   check(s.requestHash===hash('afw.finite-preparation-notice-request.v1',{operation:op,common,ticket:r.ticket,decisionHash:decision}));
+   if(op==='consent')check(ticket.ack?.outcome==='applied'&&s.issuedAt>=ticket.ack.observedAt);
+  }
+  if(a)check(s&&a.sendHash===s.recordHash&&a.observedAt>=s.issuedAt&&a.observedAt<s.window.deadline&&(a.outcome!=='applied'||(op==='ticket'?a.sequence===null:Number.isSafeInteger(a.sequence)&&a.sequence>0)));
+ }
+ return out;
+}
+const frozen=out=>{for(const op of OPS)Object.freeze(out.operations[op]);Object.freeze(out.operations);return Object.freeze(out);};
+// Exhaustive six-row journal. DATA/order/durability only; ACK is not SQL authority.
+export function createFinitePreparationNoticeJournal(options){return safe(()=>{
+ fields(options,['ctx','env']);const c=captureFinitePreparationIssuerContext(options);
+ async function readAll(id,g,tx=c.storage){
+  const prefix=key(id),listing=tx.list;check(typeof listing==='function');g();
+  const rows=await c.wait(Reflect.apply(listing,tx,[{prefix,limit:7}]),g);check(rows instanceof Map&&rows.size<=6);
+  const out={reservation:null,freeze:null,operations:{ticket:{send:null,ack:null},consent:{send:null,ack:null}}};
+  for(const [k,raw]of rows){
+   check(typeof k==='string'&&k.startsWith(prefix));const name=k.slice(prefix.length);
+   if(name==='reservation'||name==='freeze')out[name]=decode(name==='reservation'?'Reservation':'Freeze',raw);
+   else{const parts=name.split(':');check(parts.length===2&&OPS.includes(parts[0])&&['send','ack'].includes(parts[1]));out.operations[parts[0]][parts[1]]=decode(parts[1]==='send'?'Send':'Ack',raw);}
+  }
+  return frozen(validateHistory(out,id,c));
+ }
+ async function append(id,suffix,kind,record,lease){
+  const v=prepare(kind,record),g=safe(()=>c.leaseGuard(lease)),prefix=key(id),raw=encode(kind,v);safe(g);
+  let status='uncertain';
+  try{
+   const result=await c.wait(Reflect.apply(c.transaction,c.storage,[async tx=>{
+    const tg=tx.get,tp=tx.put,tl=tx.list;check([tg,tp,tl].every(f=>typeof f==='function'));
+    const guard=()=>{g();check(tx.get===tg&&tx.put===tp&&tx.list===tl);};
+    const before=await readAll(id,guard,tx);
+    guard();const old=await c.wait(Reflect.apply(tg,tx,[prefix+suffix]),guard);
+    // Exact replay remains observable after freeze; it never authorizes SQL.
+    if(old!==undefined){check(old===raw);return 'existing';}
+    if(kind!=='Reservation')check(before.reservation);
+    if(kind==='Send'||kind==='Ack')check(!before.freeze);
+    const after={...before,operations:Object.fromEntries(OPS.map(op=>[op,{...before.operations[op]}]))};
+    if(kind==='Reservation')after.reservation=v;
+    else if(kind==='Freeze')after.freeze=v;
+    else{const [op,field]=suffix.split(':');after.operations[op][field]=v;}
+    validateHistory(after,id,c);
+    guard();await c.wait(Reflect.apply(tp,tx,[prefix+suffix,raw]),guard);guard();return 'recorded';
+   }]),g);
+   g();await c.wait(Reflect.apply(c.sync,c.storage,[]),g);
+   const observed=await c.wait(Reflect.apply(c.get,c.storage,[prefix+suffix]),g);check(observed===raw);decode(kind,observed);check(['recorded','existing'].includes(result));status=result;
+  }catch{status='uncertain';}
+  return Object.freeze({status,recordHash:v.recordHash});
+ }
+ const input=(v,keys)=>safe(()=>{const d=own(v);fields(d,keys);return d;});
+ return Object.freeze({
+  appendReservation(record,lease){const v=prepare('Reservation',record);return append(v.identity.preconnectionId,'reservation','Reservation',v,lease);},
+  appendSend(options,lease){const v=input(options,['preconnectionId','record']),r=prepare('Send',v.record);return append(v.preconnectionId,r.operation+':send','Send',r,lease);},
+  appendAck(options,lease){const v=input(options,['preconnectionId','operation','record']);safe(()=>check(OPS.includes(v.operation)));return append(v.preconnectionId,v.operation+':ack','Ack',v.record,lease);},
+  freeze(options,lease){const v=input(options,['preconnectionId','record']);return append(v.preconnectionId,'freeze','Freeze',v.record,lease);},
+  async read(options,lease){try{const v=input(options,['preconnectionId']),g=c.leaseGuard(lease);return await readAll(v.preconnectionId,g);}catch{fail();}}
+ });
+});}

~~~~~~~~~~

## lib/mcp-qa-finite-preparation-notice-records.mjs

~~~~~~~~~~diff
diff --git a/lib/mcp-qa-finite-preparation-notice-records.mjs b/lib/mcp-qa-finite-preparation-notice-records.mjs
--- /dev/null
+++ b/lib/mcp-qa-finite-preparation-notice-records.mjs
@@ -0,0 +1,44 @@
+import {initialOwn as own,initialFields as fields,initialCanonical as canonical,initialHash as hash,initialHex as hex} from './mcp-qa-finite-initial-material-records.mjs';
+import {validateFinitePreparationIssuerIdentity as identity,issuerTime as time,issuerUuid as uuid,issuerIso as iso,issuerScopes as scopes} from './mcp-qa-finite-preparation-issuer-records.mjs';
+// DATA checksums only. No caller, SQL, human decision or Access authentication.
+export const FINITE_PREPARATION_NOTICE_PREFIX='afw.finite-preparation-notice.v1:';
+export const FINITE_PREPARATION_NOTICE_OPERATIONS=Object.freeze(['ticket','consent']);
+const fail=()=>{throw Error('Finite preparation notice unavailable');};
+const check=x=>{if(!x)fail();};
+const definitions={Reservation:'identity issuerReservationHash originalGrantAckHash grantLinkHash connectionHash expectedGrant consumedAt accessExpiresAt preconnectionExpiresAt ticket issuedAt',Send:'identityHash reservationHash operation requestHash accessExpiresAt window issuedAt decisionHash',Ack:'sendHash outcome rowHash sequence observedAt',Freeze:'identityHash reservationHash frozenAt'};
+function validate(kind,input,hashing=false){
+ check(typeof kind==='string'&&Object.hasOwn(definitions,kind));const v=own(input),purpose='afw.finite-preparation-notice-'+kind.toLowerCase()+'.v1';
+ fields(v,['purpose',...definitions[kind].split(' '),...(!hashing||Object.hasOwn(v,'recordHash')?['recordHash']:[])]);
+ check(v.purpose===purpose&&Buffer.byteLength(canonical(v))<=16384);
+ if(kind==='Reservation'){
+  const i=identity(v.identity),g=v.expectedGrant,t=v.ticket;
+  check(['issuerReservationHash','originalGrantAckHash','grantLinkHash','connectionHash'].every(k=>hex(v[k])));
+  fields(g,['scopes','createdAt','expiresAt']);check(scopes(g.scopes)&&g.scopes.every((s,k)=>i.requestedScopes[k]===s)&&iso(g.createdAt)&&iso(g.expiresAt)&&iso(v.consumedAt));
+  const created=Date.parse(g.createdAt),expires=Date.parse(g.expiresAt),consumed=Date.parse(v.consumedAt);
+  check(time(v.issuedAt)&&time(v.accessExpiresAt)&&time(v.preconnectionExpiresAt)&&v.accessExpiresAt>v.issuedAt&&v.preconnectionExpiresAt>v.issuedAt);
+  check(consumed>=i.reservedAt&&created>=consumed&&expires>created&&expires<=Math.min(i.C0,Date.parse(i.consentExpiresAt),v.preconnectionExpiresAt));
+  fields(t,['handleHash','requestId','expectedSequence','issuedAt','expiresAt','permissionExpiresAt']);
+  check(hex(t.handleHash)&&uuid(t.requestId)&&t.expectedSequence===0&&['issuedAt','expiresAt','permissionExpiresAt'].every(k=>time(t[k])));
+  check(t.issuedAt>=Math.max(i.reservedAt,created,consumed)&&t.issuedAt<t.permissionExpiresAt&&t.permissionExpiresAt<=t.expiresAt&&t.expiresAt-t.issuedAt<=600000);
+  check(t.expiresAt<=Math.min(i.C0,Date.parse(i.consentExpiresAt),expires,v.accessExpiresAt,v.preconnectionExpiresAt)&&v.issuedAt>=t.issuedAt&&v.issuedAt<t.permissionExpiresAt);
+ }else if(kind==='Send'){
+  check(['identityHash','reservationHash','requestHash'].every(k=>hex(v[k]))&&FINITE_PREPARATION_NOTICE_OPERATIONS.includes(v.operation)&&time(v.accessExpiresAt)&&time(v.issuedAt));
+  fields(v.window,['startedAt','deadline']);const w=v.window;
+  check(time(w.startedAt)&&time(w.deadline)&&w.deadline>w.startedAt&&w.deadline-w.startedAt<=5000&&v.issuedAt>=w.startedAt&&v.issuedAt<w.deadline);
+  check(v.operation==='ticket'?v.decisionHash===null:hex(v.decisionHash));
+ }else if(kind==='Ack'){
+  check(hex(v.sendHash)&&time(v.observedAt)&&['applied','no_mutation'].includes(v.outcome));
+  check(v.outcome==='no_mutation'?v.rowHash===null&&v.sequence===null:hex(v.rowHash)&&(v.sequence===null||Number.isSafeInteger(v.sequence)&&v.sequence>0));
+ }else check(hex(v.identityHash)&&hex(v.reservationHash)&&time(v.frozenAt));
+ if(!hashing)check(v.recordHash===hash(purpose,Object.fromEntries(Object.entries(v).filter(([k])=>k!=='recordHash'))));
+ return v;
+}
+const safe=fn=>{try{return fn();}catch{fail();}};
+export function sealFinitePreparationNoticeRecord(kind,input){return safe(()=>{
+ const v=validate(kind,input,true),body=Object.fromEntries(Object.entries(v).filter(([k])=>k!=='recordHash'));
+ return validate(kind,{...body,recordHash:hash(v.purpose,body)});
+});}
+export function encodeFinitePreparationNoticeRecord(kind,input){return safe(()=>{const raw=canonical(validate(kind,input));check(Buffer.byteLength(raw)<=16384);return raw;});}
+export function decodeFinitePreparationNoticeRecord(kind,raw){return safe(()=>{
+ check(typeof raw==='string'&&Buffer.byteLength(raw)<=16384);const v=validate(kind,JSON.parse(raw));check(raw===canonical(v));return v;
+});}

~~~~~~~~~~
