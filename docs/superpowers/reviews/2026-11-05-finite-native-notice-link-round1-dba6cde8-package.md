# Scoped re-review — NoticeLink fix round1/5

FixBASE2f530092bdc6f89e856ca3803f04dcc83fb90b1f; HEADdba6cde8a18b7810fb59329c6e429be639e6fdc8; code33d3739e6b585a2efd821c2c1006e4e59fbd7ed4. Read-only. ONLY ImportantI1 and new breakage in this fix; no re-review unchanged Link.

## Finding I1

Extracción incompleta: se duplicó el flujo auténtico preparación/OAuth/MCP/ticket/consent. Los helpers nuevos de fixture337/355/368/375 siguen duplicados en Consent15/33/46/54. Compartir helpers en Consent, mantener seed/lifecycle/cleanup, conservar literalmente assertions y orden; ningún archivo/framework/API producto nuevo.

MinorM1 baseline2fails y M2warnings NO entran loop, quedan en ledgerwholebranch. CarryMinorSQLsettlement ya visible addressed, cierre formal al aceptar tarea. Root leyó primaria42126215195/job127590980113:4PASS/0FAIL/0SKIP/count4/lint0/0,66225ms. LogrequireEmptyNotice es rechazo esperado DESPUÉSdelLink del principal, no baselinefallido ni causaM1. Productophase/fixture/Linkbyteexactos; cambioNodeConsentdelegación. No tests por mera confirmación.

## Commits y stat

- bc4000addba4b67f8a76344e5745e3d0eab6ff07: test: share authentic Consent and Link setup flows (I1 round1)
- 33d3739e6b585a2efd821c2c1006e4e59fbd7ed4: chore: retire scoped I1 round1 qualifier after four-case qualification
- dba6cde8a18b7810fb59329c6e429be639e6fdc8: docs: append I1 round1 extraction proof and four-case qualification
- docs/superpowers/progress/2026-11-05-finite-native-notice-link.es.md: +11/-0; blob27f11abd64c8a59b40b1dfbd2e40f42935b2bb29
- docs/superpowers/reports/2026-11-05-finite-native-notice-link.md: +123/-0; blobad7a0cd39d6788a748d6cd24ed749d937c6e8dbe
- test/mcp-qa-finite-owner-notice-consent-native.test.mjs: +3/-38; blob2169e0877eb72ab1db890f0c4e7b8c5c9075515b

## Fix report — append narrativo completo

Original report119130chars/blobad7a0cd39d6788a748d6cd24ed749d937c6e8dbe @HEAD, prefix105131 byteexacto al reporte revisado. Su append13999chars contiene la narrativa siguiente y patchduplicado; representamos ese patch UNAvez comoU10 debajo. No prosa nueva omitida.



## Fix round 1/5 — Important I1: extracción compartida completa

FixBASE exacto revisado: 2f530092bdc6f89e856ca3803f04dcc83fb90b1f / tree9bef1f1b4abc04060f7e58f08e326e7af5dfca49. Revisión fresca review_notice_link: Spec❌/Needs fixes,0Critical/1Important. Este apéndice conserva el informe/corpus histórico anterior y describe sólo el delta I1; no se autoacepta el fix ni se reabren Minor o unidades posteriores.

Finding I1 correcto: el fixture ya tenía preparación/OAuth/PKCE/MCP/ticket/consent auténticos, pero Consent conservaba copias locales. Consent ahora importa prepareNoticeIssued,issueNotice,actualExchangeMcp,ticket,consent desde el fixture existente; elimina esas copias y los imports locales createHash/Client/Transport que sólo servían a ellas. withIssued(fn) conserva la creación del harness, seedFiniteOwnerSdkClient, llamada fn y todo el finally/lifecycle/cleanup. Orden efectivo:
```js
await prepareNoticeIssued(f);
await seedFiniteOwnerSdkClient(f.mf,f.source);
await issueNotice(f);
await fn(f);
```
El mismo f pasa sin clon ni reconstrucción. No fichero/helperframework/API de producto nuevo, import de world/SDK desde fixture ni import del archivo que registra50tests. Fixture, phase-context y Linktest permanecieron byteexactos. No cambio de guards, parámetros de autoridad, ventanas, flags, SQL, credenciales o modelo; sólo delegación al flujo canónico ya existente.

### Comparación literal de assertions, orden e inputs

Se compararon los cuerpos REALES del fixture contra los bloques del FixBASE, sin reescribir su lógica. Sólo se ignoró whitespace final de delimitación/export al cotejar bloques; ningún token interno, assertion ni input cambió:
| Bloque delegado | Firma / defaults | Caracteres del cuerpo original y compartido | Sitios assert literales |
|---|---|---:|---:|
| prepare | prepareNoticeIssued(f) | 611=611 | 4 |
| issue PKCE/OAuth | issueNotice(f) | 1535=1535 | 8 |
| M token/MCP | actualExchangeMcp(f) | 1737=1737 | 8 |
| ticket GET + consent POST | ticket(f,extra=''); consent(f,options={}) | 806=806 | 3 |

La prueba de expansión textual sustituyó las dos llamadas nuevas por esos cuerpos reales, reincorporó las definiciones importadas reales y sus imports equivalentes, y reprodujo **TODO el Consenttest FixBASE byteexactamente**. Resultado:172sitios assert antes y172en la expansión, mismo orden;23sitios delegados al helper y149permanecen directos. Son conteos estáticos de sitios, no assertions ejecutadas. El sufijo que registra los50tests quedó literalmente idéntico. El statement seedFiniteOwnerSdkClient(f.mf,f.source), firma withIssued(fn), harness mode, try/finally y cleanup también quedaron exactos.

Inputs/bindings contrastados: PREP literal idéntico en ambos módulos; noticePlain/alias plain tiene cuerpo y dispose idénticos al plain local; assert de node:assert/strict, createHash de node:crypto y Client/StreamableHTTPClientTransport del mismo paquete conservan sus imports originales. PKCE, verifier/challenge, cookies/Origin, URLs, scopes, headers/host, cuerpo, redirect, ticket(f,extra='') y consent(f,options={}) con spread final de options son literalmente los mismos. No esperar/reintentar/backdate/clockpatch ni descartar assertions para obtener verde.

### Cualificación proporcional del fix

TestHEAD bc4000addba4b67f8a76344e5745e3d0eab6ff07 / tree0c36b462c2422ee61a7ea3218a9e8c4ccfabe68f. Actions [42126215195](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42126215195), attempt1, job127590980113 consent-shared-flow-round1: **SUCCESS,4PASS/0FAIL/0SKIP**, selected count4exacto, TAP66225.083215ms.46casos no seleccionados de50; no confundir skipped0 con ejecutar los demás.

| Caso exacto ejecutado | Resultado |
|---|---|
| native consent POST records original decision after actual ticket GET |PASS|
| native consent malformed unrelated cookie denies before SEND |PASS|
| native consent original window fences queued SQL |PASS|
| native consent abort retains SQL and forbids late ACK |PASS|

Comandos:
```sh
npm ci --ignore-scripts --no-audit --no-fund
timeout --signal=TERM 13m node --test --test-name-pattern='^native consent (POST records original decision after actual ticket GET|original window fences queued SQL|abort retains SQL and forbids late ACK|malformed unrelated cookie denies before SEND)$' test/mcp-qa-finite-owner-notice-consent-native.test.mjs
npx --no-install eslint test/mcp-qa-finite-owner-notice-consent-native.test.mjs
```

Lint del único archivo amendado: exit0,sin salida,0errors/0warnings. Qualifier específico de un job<=15min, Node22, contents:read, checkout persist-credentials:false, sin secretos/provider/runtime; retirado después del terminal. No Link31, POST50, GET/reg81, store/journal/SDK amplios ni build estándar repetidos. Los4harness necesarios compilaron4QA+4M,8metafiles reales capturados; no compilación adicional por métricas. Fixture y producto iguales, sin nuevo grafo de implementación. No segunda descarga/rebuild para evidencia ya aceptada por Root.

Principal nativo ejerció preparar→OAuth→Mtoken→MCP→ticket→consent compartidos y conservó7pares14snapshots6rechecks/Access2;118sessions74first62all;DOget1067/list126/sync3/transaction31/txGet117/txList2/txPut3;98HTTP/peak2/active0;child956ms/window5000,parent1464ms. Es medición de esta primaria, dentro de los plazos originales, no presupuesto nuevo. Carry queuedSQL/abortSQL conserva y ejercita las assertions de settlement ya existentes sin otro cambio.

El log pasivo sdkReadCurrent-catch/requireEmptyNotice del principal ocurre en la lectura **esperada unavailable después de Link/historia**; los4tests pasaron y los baselines iniciales completaron. No se clasifica ese rechazo esperado como reproducción de M1 ni como reparación de su causa. M1(baseline2FAIL desconocidos/no reproducidos) y M2(toolchain/Actions/CIMD/RPCwarnings) permanecen intactos, fuera de este loop y explícitamente no-pristine. Los antiguos Minor Consent161/244 se cerrarán sólo con aceptación Root de Link.

Artefacto original [13462160172](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42126215195/artifacts/13462160172), 305662bytes, SHA256 aa23e104d147055c357c96f3909c518fa3484430923d6c68018a0ff46fc37eba, expires 2026-11-12T23:02:16Z, retention7d. Contiene TAP/lint/8metafiles/IO del principal saneados, sin custodia nueva.

### Checkpoint, protección y contrato de entrega

Fix codeHEAD 33d3739e6b585a2efd821c2c1006e4e59fbd7ed4 / tree53d7d2591dbc9541a45305dc9da8bbe4de585cd2; qualifier eliminado. Compare exacto FixBASE→fixcodeHEAD: **sólo test/mcp-qa-finite-owner-notice-consent-native.test.mjs,+3/-38**, blob2169e0877eb72ab1db890f0c4e7b8c5c9075515b (antes8be698074f5838abfec0d4fd6050d9911c14fd73). Phase-context64039ec709053e2e82faf67ed013399244faee05, fixture3d279975e67611e72e2d1661970718ad4a3892bf y Link7a2ce841f86a7fed5b59e268a2d43d5c210826e9 permanecen idénticos al FixBASE, igual que el resto de código/config/contratos. Report/ledger son append documentales autorizados. Fix reportHEAD/tree/blob se entregan por el recibo API/readback final, sin hash autorreferente.

**I1 propuesto implementado/calificado; scoped re-review del MISMO reviewer pendiente. STOPWRITES después de este reporte/ledger.** No autoaceptación, reparación de Minor, siguiente unidad, main/merge/mount ni publicación. operationalReadiness=false;completePackage=false;PCoff=false.



## Complete fix code delta U10

```diff
diff --git a/test/mcp-qa-finite-owner-notice-consent-native.test.mjs b/test/mcp-qa-finite-owner-notice-consent-native.test.mjs
--- a/test/mcp-qa-finite-owner-notice-consent-native.test.mjs
+++ b/test/mcp-qa-finite-owner-notice-consent-native.test.mjs
@@ -1,64 +1,29 @@
 import {initialHash} from '../lib/mcp-qa-finite-initial-material-records.mjs';
-import {saveNoticeObservation} from './fixtures/finite-owner-notice-get.mjs';
+import {saveNoticeObservation,prepareNoticeIssued,issueNotice,actualExchangeMcp,ticket,consent} from './fixtures/finite-owner-notice-get.mjs';
 import {qualifyFiniteOwnerNoticeConsentRequest,qualifyFiniteOwnerNoticeGetRequest,finiteOwnerNoticeConsentTarget,readFiniteOwnerNoticeConsentMetadata} from '../lib/mcp-qa-finite-owner-notice-get-wire.mjs';
 import {FINITE_PREPARATION_MONITORING_SCHEMA as SCHEMA} from '../lib/mcp-qa-finite-preparation-issuer-store.mjs';
-import {createHash} from 'node:crypto';
-import {Client,StreamableHTTPClientTransport} from '@modelcontextprotocol/client';
 import test from 'node:test';
 import assert from 'node:assert/strict';
 import {initialEntryHarness} from './fixtures/finite-initial-entry-world.mjs';
 import {seedFiniteOwnerSdkClient} from './fixtures/finite-owner-qa-sdk.mjs';
 const PREP='__Host-afw-finite-prepare='+'a'.repeat(64);
 async function plain(p){const r=await p;try{return JSON.parse(JSON.stringify(r));}finally{r?.[Symbol.dispose]?.();}}
 async function withIssued(fn){
  const f=await initialEntryHarness('phase-context-sdk-token-notice-get');
  try{
-  await f.stub.configure('normal');assert.equal((await plain(f.stub.invoke(f.refs))).status,'material_recorded');await f.stub.restoreMethods();
-  f.phaseCurrent=await plain(f.stub.seedPhaseFacts('settled',null));assert.equal(f.phaseCurrent.fixtureError,undefined,JSON.stringify(f.phaseCurrent));
-  const before=await plain(f.stub.sdkReadCurrent());assert.deepEqual(Object.keys(before).sort(),['capsuleHash','preconnectionId','source']);assert.equal(before.source.phase,'read_consent');
-  f.source=before.source;f.token=await f.enrollmentToken(f.source);f.headers={'Cf-Access-Jwt-Assertion':f.token,Cookie:PREP};
+  await prepareNoticeIssued(f);
   await seedFiniteOwnerSdkClient(f.mf,f.source);
-  f.verifier='v'.repeat(64);f.challenge=createHash('sha256').update(f.verifier).digest('base64url');
-  const query=new URLSearchParams({client_id:f.source.clientId,redirect_uri:'https://client.example/cb',response_type:'code',resource:f.source.resource,scope:'afw:project:read',state:'SYN-state',code_challenge:f.challenge,code_challenge_method:'S256'});
-  const get=await f.mf.dispatchFetch(f.source.origin+'/authorize?'+query,{redirect:'manual',headers:f.headers});assert.equal(get.status,200);
-  const html=await get.text(),handle=/name="handle" value="([^"]+)"/.exec(html)?.[1];assert(handle);
-  const cookie=get.headers.getSetCookie().map(v=>v.split(';')[0]).join('; ');assert(cookie);
-  const post=await f.mf.dispatchFetch(f.source.origin+'/authorize',{method:'POST',redirect:'manual',headers:{Origin:f.source.origin,'Content-Type':'application/x-www-form-urlencoded',...f.headers,Cookie:PREP+'; '+cookie},body:new URLSearchParams({handle,decision:'approve',scope:'afw:project:read'})});
-  assert.equal(post.status,302);f.code=new URL(post.headers.get('Location')).searchParams.get('code');assert(f.code);await post.body?.cancel();
-  const rows=await plain(f.stub.snapshot()),r=JSON.parse(rows.find(([k])=>k.startsWith('afw.finite-preparation-issuer.v1:')&&k.endsWith(':reservation'))[1]);f.identity=r.identity;
-  f.grant=await plain(f.stub.sdkGrant(f.identity.grantId));assert.equal(f.grant.revoked_at,'');assert.equal(f.grant.exchanged_at,'');
-  assert.equal((await plain(f.stub.sdkReadCurrent())).source.phase,'read_consent');
+  await issueNotice(f);
   await fn(f);
  }finally{await f.stub.noticeReleaseHeld().catch(()=>{});await f.stub.ioRelease('all').catch(()=>{});await f.mf.dispose();await f.cleanup();}
 }
-async function actualExchangeMcp(f){
- const config=await f.mf.dispatchFetch(f.source.origin+'/fixture/token-config',{method:'POST',body:JSON.stringify({clientId:f.source.clientId,projectId:f.source.project.projectId,audience:f.source.access.audience,teamDomain:f.source.access.teamDomain,expiresAt:new Date(f.source.window.expiresAt).toISOString()})});assert.equal(config.status,204);
- const exchange=await f.mf.dispatchFetch(f.source.origin+'/oauth/token',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({grant_type:'authorization_code',client_id:f.source.clientId,redirect_uri:'https://client.example/cb',resource:f.source.resource,code:f.code,code_verifier:f.verifier})});assert.equal(exchange.status,200);
- const payload=await exchange.json();assert.equal(typeof payload.access_token,'string');
- const client=new Client({name:'SYN-notice-native',version:'1.0.0'},{versionNegotiation:{mode:'legacy'}});
- try{
-  await client.connect(new StreamableHTTPClientTransport(new URL(f.source.resource),{requestInit:{headers:{Authorization:'Bearer '+payload.access_token,Host:new URL(f.source.origin).host}},fetch:(url,options)=>f.mf.dispatchFetch(String(url),options)}));
-  const summary=await client.callTool({name:'read_project_summary',arguments:{}});assert.equal(summary.isError,undefined);assert.equal(summary.structuredContent.data.id,f.identity.projectId);
- }finally{await client.close();}
- f.grant=await plain(f.stub.sdkGrant(f.identity.grantId));assert.notEqual(f.grant.exchanged_at,'');
- const context=await plain(f.stub.sdkReadCurrent());assert.deepEqual(Object.keys(context).sort(),['capsuleHash','preconnectionId','source']);assert.equal(context.source.phase,'read_consent');
-}
-
-async function ticket(f,extra=''){
- const response=await f.mf.dispatchFetch(f.source.origin+'/monitoring',{headers:{...f.headers,Cookie:PREP+extra},redirect:'manual'});
- const html=await response.text();assert.equal(response.status,200);const handle=/name="handle" value="([^"]+)"/.exec(html)?.[1];assert(handle);
- const cookie=response.headers.getSetCookie().map(v=>v.split(';')[0]).join('; ');assert(cookie);
- f.notice={handle,headers:{...f.headers,Origin:f.source.origin,'Content-Type':'application/x-www-form-urlencoded',Cookie:PREP+'; '+cookie+extra}};
- return plain(f.stub.noticeInspect());
-}
-const consent=(f,options={})=>f.mf.dispatchFetch(f.source.origin+'/monitoring/grant',{method:'POST',redirect:'manual',headers:f.notice.headers,body:new URLSearchParams({handle:f.notice.handle}),...options});
 test('native consent POST records original decision after actual ticket GET',()=>withIssued(async f=>{
  await actualExchangeMcp(f);const before=await ticket(f,'; unrelated="valid=="');assert.equal(before.events.length,0);
  const original=await plain(f.stub.snapshot()),history=(await f.db.prepare('SELECT * FROM dossier_monitoring_consent_events ORDER BY sequence').all()).results;
  await f.stub.ioConfigure();await f.stub.noticeConfigure();const began=Date.now(),response=await consent(f),html=await response.text();
  const observation=await plain(f.stub.noticeStateRead()),io=await plain(f.stub.ioObservation()),elapsed=Date.now()-began,after=await plain(f.stub.noticeInspect());
  await saveNoticeObservation({unit:'consent',elapsed,...observation.state,io});
  console.info('CONSENT native principal costs',JSON.stringify({elapsed,pairs:io.snapshots/2,rechecks:observation.state.trace.filter(v=>v.stage==='after').length,accessVerifications:observation.state.accessVerifications??0,sqlSessions:observation.state.sql.length,first:observation.state.sql.flatMap(s=>s.queries).filter(q=>q.method==='first').length,all:observation.state.sql.flatMap(s=>s.queries).filter(q=>q.method==='all').length,ops:observation.state.ops,noticeLists:observation.state.lists.filter(v=>v.prefix.startsWith('afw.finite-preparation-notice')).length,http:{snapshots:io.snapshots,requests:io.rows.length,peak:io.peak,active:io.active}}));
  assert(elapsed<30000);assert.equal(io.peak,2);assert.equal(io.active,0);
  assert.equal(observation.state.trace.filter(v=>v.stage==='after').length,6);assert.equal(observation.state.accessVerifications,2);
  const rowsAfter=await plain(f.stub.snapshot());for(const row of original)assert.deepEqual(rowsAfter.find(([k])=>k===row[0]),row);

```
