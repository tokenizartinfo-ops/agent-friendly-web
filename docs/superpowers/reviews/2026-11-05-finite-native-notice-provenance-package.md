# Native notice provenance — full actual BASE review package

PROJECT AFW; repository tokenizartinfo-ops/agent-friendly-web(1347578006 PUBLIC), isolatedsourcebranch. BASE04c49dcc48b37f7fe825daa6c1c0747c5822d74e..finalreportHEAD2969a840860d47997132eb081d1e65376f3953e0/tree d89ca7b6bc056473362159bd51a2cb1f955c8f03. QualifiedHEAD88a67d5dddae7eb7af39d404ff3dadcc4b35e057; qualifierremovedcodeHEAD8609e96b06b16c758a7ed95f66e5d5911dadba66. Root fetched all5complete qualifiedfiles and finalreport, fullAPIcompare/ref; final blobSHAs exactlymatch qualification, no existingfile changed. Six commits/six paths added (5producttest+report),541adds/0deletions. No temporaryqualifier or permanentCI in finaldiff. Below is full recomputed unifieddiff alladdedbytes, not APItruncatedpatch.

## Commits

681750e1bd7e48e431451d482e8df7cf5b2c29ca test: reach native original grant before missing notice journal reservation
d99f16ba5d86ca7f746e69feb4c56b71af3a7870 feat: add unmounted six-record native notice provenance journal and qualification
37f15259abc4625a0fd9e7192e4b3aaba312bf02 test: exercise captured original holders and independent notice ceilings
88a67d5dddae7eb7af39d404ff3dadcc4b35e057 test: qualify valid notice conflicts and remove own fixture lint warning
8609e96b06b16c758a7ed95f66e5d5911dadba66 chore: remove temporary notice provenance cloud qualifier after green
2969a840860d47997132eb081d1e65376f3953e0 docs: record native notice provenance journal causal red and final qualification

## Stat

docs/superpowers/reports/2026-11-05-finite-native-notice-provenance.md | +101 -0 | d69a71c3a76727fe7ec8a3ce70ffad0bd5f79fab
lib/mcp-qa-finite-preparation-notice-journal.mjs | +78 -0 | b9c15aba18e2442a0ed864b8afd5e86313c5e470
lib/mcp-qa-finite-preparation-notice-records.mjs | +44 -0 | 8c9386b27109cd056d3f70d91ab3cb6c6f40b4e9
test/fixtures/finite-preparation-notice-provenance-worker.mjs | +203 -0 | a1824dd8548033d318ec2c80f4a8a97c53265c85
test/mcp-qa-finite-preparation-notice-provenance-native.test.mjs | +62 -0 | 94a6208106212e28139cbdcf3a3c277b97ba124d
test/mcp-qa-finite-preparation-notice-provenance.test.mjs | +53 -0 | ad89f394e4ee467f36efc919c3863bab3166afb0

## Controller receipts/rulings

Root read all4primarylogs. CausalRED42070439181/job127396557477/681750e1:actualnativegrantUUID reached; newjournalonly unavailable scaffold→reservation not recorded,1T0P1F0skip/onefixture149135B, no bundle/DDL failure. FirstGREEN42071432865/job127400096866/d99f16ba:codec27P,native32P4F; four holder tests wrongly recapturedjournal, fixedfixtureonly. SecondGREEN42071734580/job127401186920/37f15259:codec28P,native37P0F, lint0errors1anonymousdefaultexportwarning. FinalGREEN42072169255/job127402724572/88a67d5:28codec+37nativeP0F0cancel0skip/lint0errors0warnings, onefixture213388B/SHA2e2a1e6c15ffc8ebe5607df0cda9b6eeadfe19476fcc2ed381c283f7da860bfd. Fourfixturebuildstotal, no standardbuilds or old147/33issuer/SDK/fanout reruns. Eachfollowup correctedownnewfixture/coverage/warning; reportpreserveshistory/headcounts. No tests rerunbyroot.

Rulings in taskbrief/preflight: capturedissuercontext.wait alreadyretainspromises, no c.retain/pendingmutex. Actualobserverexternalstage-work outstanding.has(ctx) provides SYN exclusion using distinctvalidnonabortedlease in SAMEdeadline, notjournal or crossRPCdrain. Codeccontext-sensitive cases validate injournalwithReservation, notnewoptions. TemporaryTDDscaffold onlynewjournalunavailable, never positivefake/source/SDK/store; replacedfinal. ComponentsDATA/order/durability only; ACKchecksums NOTSQL/human authentication. FuturefixedQAlexical continuation remainsmissing, no sourcefact/permission/phaseprogress bythese6rows. BindingsC0/C1/parent30s/child5s and expiredsourceceiling unchanged. New5filesdon'tenter existingimportgraph; newfixture composes actualacceptedstore. Existingmethods/profile/schema/phase/M/authority untouched.

Review reportclaims independently. Readonlytaskscope; one focusedoutside-diffcheck pernamedrisk if needed, no broadcrawl/local/provider/mutations/subagents or sameheadtest rerun. PriorD03/fanout/toolchainMinors preservedfinalwholebranchtriage. Operationalflags false.

## Full U10 additions

~~~diff
diff --git a/docs/superpowers/reports/2026-11-05-finite-native-notice-provenance.md b/docs/superpowers/reports/2026-11-05-finite-native-notice-provenance.md
--- /dev/null
+++ b/docs/superpowers/reports/2026-11-05-finite-native-notice-provenance.md
@@ -0,0 +1,101 @@
+# Finite native notice provenance journal — SOURCE ONLY / UNMOUNTED
+
+5 noviembre 2026. Estado de la unidad: DONE; pendiente revisión independiente de root. operationalReadiness=false; completePackage=false; PCoff=false.
+
+## Identidad, alcance y procedencia
+
+PROJECT=AFW; REPOSITORY=tokenizartinfo-ops/agent-friendly-web (1347578006, PUBLIC); ENVIRONMENT=GitHub source y Actions SYN; ORIGIN=GitHub App API; RESOURCE_TYPE=rama aislada; RESOURCE_ID=feat/finite-native-cleanup-20261101; ALLOWED_ACTION=cinco archivos nuevos, este informe y qualifier temporal retirado. ROLLBACK=solamente commits propios por expected-head CAS; preservar historia ajena, journals y D1. Todas las mutaciones de ref tuvieron readback exacto; no se usó force ni se sobreescribió un HEAD ajeno.
+
+- BASE: `04c49dcc48b37f7fe825daa6c1c0747c5822d74e`, tree `7b13cf0a4262f7d5d5b8695c3bda3875d63e0bef`.
+- Qualified HEAD final: `88a67d5dddae7eb7af39d404ff3dadcc4b35e057`, tree `ba7b46f21545332955b96f156b0452309d51b5db`.
+- Code HEAD, qualifier ausente: `8609e96b06b16c758a7ed95f66e5d5911dadba66`, tree `2aad63f247211dabff8e5a675851e5ef0de41156`.
+- Report HEAD/tree: los identificadores exactos del commit portador se entregan a root mediante readback Git posterior a escribir este informe; no se inventa un hash autorreferente dentro de sus propios bytes. El handoff final fija esos dos objetos y el BASEdiff final.
+- Brief/preflight/ledger leídos en BASE: `docs/superpowers/briefs/2026-11-05-finite-native-notice-provenance.md`, `reviews/2026-11-05-finite-native-notice-provenance-preflight.es.md` y `progress/2026-11-05-finite-native-notice-provenance.es.md`. Despacho root activó sólo Task1 tras aceptación del storefix1/report4016c13d; encabezados históricos INACTIVE no activan nada adicional.
+- Sin clone, dependencias, build, tests, browser, credenciales ni procesos persistentes locales. Sólo API GitHub y Actions cloud; lectura local inicial de instrucciones, sin escritura de producto local.
+
+## Cambio y contratos
+
+Cinco archivos nuevos, sin import edge desde código existente. El codec usa los validadores issuer y initialOwn/Fields/Canonical/Hash existentes; snapshots detached/deep-frozen, cuatro purposes/domains, exactitud de campos, límite UTF-8 16384 y decode canónico estricto. Errores saneados: `Finite preparation notice unavailable`.
+
+El journal inventaría exhaustivamente seis claves con list limit7, rechaza desconocidas/huérfanas/corruptas y correlaciona identidad, reservation, SEND, ACK, Common, decisionHash y requestHash. Consent SEND requiere ticket ACK applied; no_mutation es terminal. Freeze impide todo SEND/ACK nuevo; replay byte-idéntico devuelve existing aun congelado. Divergencia nunca reemplaza y devuelve uncertain. Lectura histórica no introduce un chequeo de reloj actual de C0: exige lease actual y coherencia de tiempos históricos.
+
+Cada append prepara antes del await; usa la captura issuer existente, transacción DO real, retorno final, storage.sync y get exacto/canonical decode. `captureFinitePreparationIssuerContext.wait` ya conserva cada Promise por retain; no se agregó c.retain, guard global, drain, timers, retries ni recuperación automática. Un fallo posterior a preparación deja uncertain. El journal no transforma incertidumbre en no_mutation ni intenta freeze automático.
+
+### Archivos y blobs cualificados
+
+| Archivo nuevo | Blob |
+| --- | --- |
+| `lib/mcp-qa-finite-preparation-notice-records.mjs` | `8c9386b27109cd056d3f70d91ab3cb6c6f40b4e9` |
+| `lib/mcp-qa-finite-preparation-notice-journal.mjs` | `b9c15aba18e2442a0ed864b8afd5e86313c5e470` |
+| `test/mcp-qa-finite-preparation-notice-provenance.test.mjs` | `ad89f394e4ee467f36efc919c3863bab3166afb0` |
+| `test/mcp-qa-finite-preparation-notice-provenance-native.test.mjs` | `94a6208106212e28139cbdcf3a3c277b97ba124d` |
+| `test/fixtures/finite-preparation-notice-provenance-worker.mjs` | `a1824dd8548033d318ec2c80f4a8a97c53265c85` |
+
+El compare real BASE..codeHEAD devolvió exactamente esos cinco archivos added, 440 líneas agregadas, cero borradas y cero archivos existentes modificados. Este informe es la única sexta adición del checkpoint documental final. El qualifier `.github/workflows/afw-notice-provenance-qualification.yml` fue retirado en codeHEAD. Los cinco blobs son idénticos a los cualificados.
+
+### Grafo y blobs protegidos
+
+| Archivo existente | Blob BASE y codeHEAD idéntico |
+| --- | --- |
+| `lib/mcp-qa-finite-preparation-issuer-store.mjs` | `efc25b2af9c80b8eb27cffe219544e974002293e` |
+| `lib/mcp-qa-finite-owner-phase-context.mjs` | `ebebaa9542c2408c0d505d1e23daa946762c1cab` |
+| `lib/delegated-oauth-worker.mjs` | `d979f395029c9b1e66a99222d06acf99eba4f358` |
+| `lib/mcp-qa-finite-preparation-issuer-records.mjs` | `50f9a013580a46ad1d445a240f47b7b2ce887d49` |
+| `lib/mcp-qa-finite-preparation-issuer-journal.mjs` | `414450aa08f797bed5a41cf5cc697342785ce16b` |
+| `lib/mcp-qa-finite-stage-work.mjs` | `a89baeb2578856dadedf700f9d66e180eb09120e` |
+
+Comparación de árboles completos: ningún blob existente cambió. Incluye store, phase, M, SDK, autoridad, esquema, fixtures/tests previos y CI permanente. `exchanged_at` y ACK histórico permanecen en su fuente original. El diseño previo `docs/superpowers/reports/2026-11-05-finite-native-notice-receiver-design.es.md` (blob fbae5c99c43fc2af3872c6c7f20211cb69524795) no se tocó.
+
+## Evidencia primaria y comandos
+
+Todos los runs attempt1, Ubuntu24.04, Node22.23.4; token de job contents:read/metadata:read, checkout persist-credentials:false; sin secretos de aplicación, servicios nuevos, provider ni deploy. Instalación cloud exacta: `npm ci --ignore-scripts --no-audit --no-fund`.
+
+| Fase | HEAD | Run / job | Resultado |
+| --- | --- | --- | --- |
+| RED causal | `681750e1bd7e48e431451d482e8df7cf5b2c29ca` | [42070439181](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42070439181) / 127396557477 | nativo 0PASS/1FAIL/0SKIP |
+| GREEN intermedio, corrección de fixture necesaria | `d99f16ba5d86ca7f746e69feb4c56b71af3a7870` | [42071432865](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42071432865) / 127400096866 | codec27PASS; nativo32PASS/4FAIL/0SKIP; lint no ejecutado |
+| GREEN previo | `37f15259abc4625a0fd9e7192e4b3aaba312bf02` | [42071734580](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42071734580) / 127401186920 | codec28PASS; nativo37PASS; 0FAIL/0SKIP; lint0errores/1warning propio |
+| GREEN final | `88a67d5dddae7eb7af39d404ff3dadcc4b35e057` | [42072169255](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42072169255) / 127402724572 | codec28PASS; nativo37PASS; 0FAIL/0SKIP; lint0errores/0warnings |
+
+RED primario no fue fallo de import/bundle/DDL/schema/timeout: compiló el fixture, ejecutó openFence/insertAuthorization/consumeAuthorization/insertReadGrant reales y comprobó el UUID original. Log `reachedNativeGrant=true journalError=Finite preparation notice unavailable`. Falló únicamente la expectativa appendReservation.status=recorded frente a undefined. El stub no funcional sólo existió en el journal nuevo y fue sustituido íntegramente; no hubo store, SQL ni source positivos simulados. Root leyó esta primaria antes de GREEN.
+
+Las cuatro negativas intermedias ejercían por error un journal recapturado después de reemplazar holders. Se corrigió sólo el fixture para leer desde el journal originalmente capturado en esas negativas. Los tests entre GET/POST y tras pérdida SQL sí reconstruyen un journal nuevo explícitamente. No se modificó la captura issuer ni se afirmó que un journal recién creado conociera referencias pasadas. El warning propio de export anónimo del fixture fue corregido en la cualificación final; además se verificaron conflictos de SEND individualmente válido y ticket/reservation diferente.
+
+Comandos finales exactos:
+
+```text
+node --test test/mcp-qa-finite-preparation-notice-provenance.test.mjs
+node --test test/mcp-qa-finite-preparation-notice-provenance-native.test.mjs
+./node_modules/.bin/eslint lib/mcp-qa-finite-preparation-notice-records.mjs lib/mcp-qa-finite-preparation-notice-journal.mjs test/mcp-qa-finite-preparation-notice-provenance.test.mjs test/mcp-qa-finite-preparation-notice-provenance-native.test.mjs test/fixtures/finite-preparation-notice-provenance-worker.mjs
+```
+
+No se repitieron 147store/33issuer/SDK/fanout ni compiler/build estándar: cinco adiciones sin shared changes, conforme ruling. Esbuild se usó únicamente para el fixture de Miniflare/workerd de cada nueva suite nativa. Ningún run se repitió para recuperar hashes.
+
+| Run | Compilaciones reales del fixture | Bytes | SHA-256 efectivamente registrado |
+| --- | --- | --- | --- |
+| 42070439181 | 1 | 149135 | no registrado; no reconstruido |
+| 42071432865 | 1 | 212858 | 652b8ff870d6bbfd20a366be3f05c4da0ce942eac97d182a78e729a2735d1423 |
+| 42071734580 | 1 | 213052 | 83d5d1f44ab67591450427a7c7336887e7ae334cabdcf7b5c4f356b5bbc8c968 |
+| 42072169255 | 1 | 213388 | 2e2a1e6c15ffc8ebe5607df0cda9b6eeadfe19476fcc2ed381c283f7da860bfd |
+
+Total observado: cuatro compilaciones, una por run nativo. Warnings de toolchain registrados: punycode DEP0040 en setup/lint; @esbuild-kit/core-utils y esm-loader deprecados; eslint9.39.4 deprecado; checkout@v4/setup-node@v4 declaran Node20 y el runner los fuerza a Node24. Los tests se ejecutaron en Node22; lint final de los cinco archivos no emitió findings. No se actualizó toolchain por arrastre.
+
+## Qué prueba la composición nativa
+
+- Grant UUID original emitido por store aceptado, issuer Reservation/grant SEND/ACK reales en DO; GrantLink y ConnectionRef originales SYN persistidos/recuperados antes de sellar la reserva. Los hashes referencian esas filas originales, no una nueva autoridad. Ninguno acredita humano, source factual o CSRF.
+- Ticket INSERT/observación/Consent INSERT reales con la misma witness/store/lease SYN y Common de POST; ventana hija <=4500ms y deadline del parent SYN original <=30000ms. Journal nuevo entre GET y POST. MAX por grant=0; dieciséis filas ajenas SYN conservadas exactamente y sequence global real=17, con expectedSequence=0. Rowhash de los catorce campos TicketRow y doce ConsentRow coincide con la fila retornada y la consulta primaria; grant original intacto.
+- Dos appendSend iguales concurrentes dan recorded/existing; sólo recorded causa una emisión SQL. Un SEND válido divergente y una reservation/ticket diferente devuelven uncertain sin reemplazo. Existing es historia DATA y nunca permiso para repetir SQL.
+- Freeze antes del ticket, tras ticket SEND, tras ticket ACK, tras consent SEND y con historia completa preserva datos y niega nuevos SEND/ACK; replay exacto existing no agrega SQL.
+- Callback throw aborta la transacción nativa y deja cero filas de notice. Pérdida del retorno final/sync/readback después de commit puede dejar la fila real, con uncertain y cero SQL de monitoring emitido.
+- Pérdida del resultado SQL real después de commit conserva ticket/evento y SEND sin ACK; un journal nuevo conserva el pendiente, niega consent sin ticket ACK y nunca reconstruye ACK leyendo D1. Freeze tampoco fabrica resolución.
+- Promises reales de transaction y SQL retenidas después de alcanzar el gate y abortar la lease original. La segunda lease SYN distinta permanece no abortada/vigente dentro del mismo deadline original. El observer sin efectos rechaza mientras outstanding.has(ctx), y entra después de settle real de todas las Promises originales. La exclusión pertenece al observer de stage-work, NO al Setpending privado de capture.wait, al journal, a métodos entre sí ni a RPCs. No se acreditó drain ni autorización de nuevas leases.
+- Inventario extra/séptima fila/huérfano/no canónico y actor/version/metadata/storage/db cambiados niegan. Access menor que ticket, decisión/request hashes alterados, ventana/techo/timing inconsistente, consent sin ACK y getters contador0 no producen mutaciones. Access de POST puede estrecharse manteniendo cobertura del ticket; Access/preconnection son techos independientes.
+- Codec round-trip de Reservation/SEND/ACK/freeze; sequence17 real frente a expectedSequence0; proto/symbol/accessor/sparse/oversize, C0/C1 incoherentes, ventana5001ms, purpose/checksum falso y null/sequence incorrectos niegan con error genérico.
+
+## Límites y continuación pendiente
+
+El journal valida DATA, enlaces, orden e intención durable; por sí solo no autentica ejecución SQL ni rechaza criptográficamente un ACK inventado por un caller interno con acceso. Rowhash/checksum de decisión no es firma, CSRF, JWT ni identidad humana. La fixture demuestra que su continuación concreta usa el actualPromise resuelto; el futuro handler QA fijo aún ausente deberá conservar esa continuación léxica y negar ACK tras excepción/fin de lease sin recuperación por fila. Otro caller puede fabricar DATA válida sin obtener permisos; ningún producto consume esta API.
+
+Sujetos, leases, gates, versiones, esquema y custodia de la fixture son exclusivamente SYN; D1/workerd/DO, clocks SQL, consultas y filas retornadas son nativos. No es source factual, proveedor, Auth/Access humano, runtime montado, receiver ni entrega operativa.
+
+Fuente3nov2026 02:59Z vencida: sin renovación. C0=I0+900000, C1=C0+180000, padre<=30000/hija<=5000 conservados. Receiver QA fijo, NoticeLink, fase notices, tercer CLOSED, ownSEND, Mforward pre-write, fullsetup/cleanup, guard/ARM/mount, runtime, fuentes reales, DDL remoto, Entry/aliases/OAuth/OTP/tokens/permisos/cron/Containers/Max/main/merge siguen fuera. Sin siguiente unidad ni helpers/reviewer/subagentes. Root genera fullBASEdiff final y revisión independiente. No se reclama activación ni PC-off.

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

diff --git a/test/fixtures/finite-preparation-notice-provenance-worker.mjs b/test/fixtures/finite-preparation-notice-provenance-worker.mjs
--- /dev/null
+++ b/test/fixtures/finite-preparation-notice-provenance-worker.mjs
@@ -0,0 +1,203 @@
+import {createHash} from 'node:crypto';
+import {DurableObject} from 'cloudflare:workers';
+import {initialHash as hash} from '../../lib/mcp-qa-finite-initial-material-records.mjs';
+import {createFinitePreparationIssuerStore,FINITE_PREPARATION_ISSUER_SCHEMA as schema,FINITE_PREPARATION_MONITORING_SCHEMA as monitoringSchema} from '../../lib/mcp-qa-finite-preparation-issuer-store.mjs';
+import {createFinitePreparationIssuerJournal} from '../../lib/mcp-qa-finite-preparation-issuer-journal.mjs';
+import {sealFinitePreparationIssuerRecord as issuer} from '../../lib/mcp-qa-finite-preparation-issuer-records.mjs';
+import {encodeFinitePreparationRecord as prepEncode,decodeFinitePreparationRecord as prepDecode,hashFinitePreparationRecord as prepHash} from '../../lib/mcp-qa-finite-preparation-records.mjs';
+import {createFinitePreparationNoticeJournal as createJournal} from '../../lib/mcp-qa-finite-preparation-notice-journal.mjs';
+import {sealFinitePreparationNoticeRecord as seal,encodeFinitePreparationNoticeRecord as encode,FINITE_PREPARATION_NOTICE_PREFIX as P} from '../../lib/mcp-qa-finite-preparation-notice-records.mjs';
+import {observeFiniteReadOnlyWork} from '../../lib/mcp-qa-finite-stage-work.mjs';
+const H='a'.repeat(64),U='11111111-1111-4111-8111-111111111111',F='22222222-2222-4222-8222-222222222222';
+const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));
+const denied=async fn=>{try{await fn();return false;}catch(e){if(e.message!=='Finite preparation notice unavailable')throw e;return true;}};
+const latch=()=>{let release;const wait=new Promise(resolve=>{release=resolve;});return {wait,release,reached:false};};
+// SYN identities/leases/fault gates. D1 results, SQL clocks and DO transactions are native.
+// No factual source, signed Access, CSRF/human approval or cross-RPC drain is claimed.
+export class FiniteNoticeProvenanceFixture extends DurableObject{
+ async fetch(request){
+  const b=await request.json(),db=this.env.RELEASE_DB,native=this.ctx.storage,events=[],result={};
+  const exec=(sql,...args)=>db.prepare(sql).bind(...args).run();
+  await exec('CREATE TABLE site_projects (id TEXT PRIMARY KEY,user_id TEXT NOT NULL,revision INTEGER NOT NULL)');
+  await exec("CREATE TABLE delegated_consent_sessions (handle_hash TEXT PRIMARY KEY,user_id TEXT,kind TEXT,project_id TEXT,client_id TEXT,resource TEXT,scopes_json TEXT,expires_at TEXT,consumed_at TEXT NOT NULL DEFAULT '')");
+  await exec("CREATE TABLE delegated_access_grants (id TEXT PRIMARY KEY,user_id TEXT,client_id TEXT,project_id TEXT,resource TEXT,scopes_json TEXT,created_at TEXT,expires_at TEXT,revoked_at TEXT NOT NULL DEFAULT '',exchanged_at TEXT NOT NULL DEFAULT '')");
+  for(const sql of [...schema,...monitoringSchema])await exec(sql);
+  const at=(await db.prepare("SELECT CAST(unixepoch('subsec')*1000 AS INTEGER) AS ms").first()).ms,originalDeadline=at+30000;
+  const i=issuer('Identity',{preconnectionId:H,enrollmentHash:H,capsuleHash:H,sourceRevision:'b'.repeat(40),qaVersionId:U,actorId:this.ctx.id.toString(),subject:'SYN-owner',accessRealmHash:H,projectId:'SYN-project',projectRevision:1,clientId:'SYN-client',resource:'https://delegated-canary.agentfriendlyweb.dev/mcp',authorizationHash:'c'.repeat(64),grantId:U,requestedScopes:['afw:project:read','afw:evidence:read'],consentExpiresAt:new Date(at+24000).toISOString(),I0:at-1000,C0:at+899000,C1:at+1079000,reservedAt:at-5});
+  const parent=new AbortController(),lease=Object.freeze({signal:parent.signal,assertCurrent(){if(parent.signal.aborted||Date.now()>=originalDeadline)throw Error('SYN original lease expired');}});
+  let txFault=null,txCommitted=false,txGate=null,sqlGate=null,sqlLoss=null,puts=0;
+  const wrapper={withSession(mode){events.push({mode});const session=db.withSession(mode);return {prepare(sql){events.push({sql});const stmt=session.prepare(sql);return {bind(...args){const bound=stmt.bind(...args);const call=method=>async()=>{
+   const actual=await bound[method]();
+   if(sqlGate&&sql.includes(sqlGate.needle)){const gate=sqlGate;sqlGate=null;gate.reached=true;gate.committed=!!actual;await gate.wait;}
+   if(sqlLoss&&sql.includes(sqlLoss)){sqlLoss=null;throw Error('SYN actual SQL result lost after commit');}
+   return actual;
+  };return {first:call('first'),all:call('all'),run:call('run')};}};}};}};
+  const storage={
+   get:async(...args)=>{const v=await native.get(...args);if(txFault==='readback_loss'&&txCommitted)throw Error('SYN readback lost');return v;},
+   list:(...args)=>native.list(...args),
+   sync:async()=>{await native.sync();if(txFault==='sync_loss')throw Error('SYN sync lost');},
+   transaction:async callback=>{
+    const r=await native.transaction(async tx=>{
+     const proxy={get:(...a)=>tx.get(...a),list:(...a)=>tx.list(...a),put:(...a)=>{puts++;return tx.put(...a);}};
+     const v=await callback(proxy);if(txFault==='callback_throw')throw Error('SYN callback throw');return v;
+    });txCommitted=true;
+    if(txGate){const gate=txGate;txGate=null;gate.reached=true;await gate.wait;}
+    if(txFault==='final_throw')throw Error('SYN final transaction return lost');return r;
+   }
+  };
+  const ctx={storage,id:this.ctx.id},env={RELEASE_DB:wrapper,AFW_QA_VERSION:{id:U},AFW_INDEPENDENT_CLOSURE:this.env.FIXTURE};
+  const store=createFinitePreparationIssuerStore({ctx,env}),window=()=>({startedAt:Date.now(),deadline:Math.min(Date.now()+4500,at+14000)}),opts=()=>({identity:i,window:window()});
+  const grant={scopes:['afw:project:read'],createdAt:new Date(at).toISOString(),expiresAt:new Date(at+22000).toISOString()};
+  const writes=()=>events.filter(e=>e.sql?.includes('INSERT INTO dossier_monitoring_')).length;
+  const make=(kind,v)=>seal(kind,{purpose:'afw.finite-preparation-notice-'+kind.toLowerCase()+'.v1',...v});
+  let r,journal,ticketSend;
+  try{
+   await exec('INSERT INTO site_projects VALUES (?,?,?)',i.projectId,i.subject,1);
+   result.open=await store.openFence(opts(),lease);result.authorization=await store.insertAuthorization(opts(),lease);
+   const consumption=await store.consumeAuthorization({...opts(),consumedAt:new Date(at).toISOString()},lease);result.consumed=!!consumption;
+   const ij=createFinitePreparationIssuerJournal({ctx,env});
+   const ir=issuer('Reservation',{purpose:'afw.finite-preparation-issuer-reservation.v1',identity:i,requestHash:hash('SYN-original-issuer-request',opts()),issuedAt:Date.now(),deadline:Date.now()+4000});
+   result.issuerReservation=await ij.appendReservation(ir,lease);
+   const gs=issuer('Send',{purpose:'afw.finite-preparation-issuer-send.v1',identityHash:i.identityHash,reservationHash:ir.recordHash,operation:'grant',requestId:null,requestHash:hash('SYN-original-grant-request',grant),issuedAt:Date.now(),deadline:Date.now()+4000});
+   await ij.appendSend({preconnectionId:H,record:gs},lease);
+   result.grant=await store.insertReadGrant({...opts(),consumption,grant},lease);
+   if(result.grant.status!=='applied'||result.grant.row.id!==i.grantId)throw Error('SYN native original grant not reached');
+   result.reachedNativeGrant=true;
+   const ga=issuer('Ack',{purpose:'afw.finite-preparation-issuer-ack.v1',sendHash:gs.recordHash,rowHash:hash('afw.finite-preparation-issuer-row.v1',result.grant.row),outcome:'applied',observedAt:Date.now()});
+   result.originalGrantAck=await ij.appendAck({preconnectionId:H,operation:'grant',record:ga},lease);
+   // Persist and read the ORIGINAL SYN reference rows before notice reservation.
+   const link={preconnectionId:H,authorizationHash:i.authorizationHash,grantId:i.grantId,grantHash:createHash('sha256').update(i.grantId).digest('hex'),acceptedAt:Date.now()};
+   const connection={connectionRef:H,subject:i.subject,grantId:i.grantId,clientId:i.clientId,projectId:i.projectId,resource:i.resource,issuedAt:at,expiresAt:at+22000};
+   await native.put('SYN:original:GrantLink',prepEncode('GrantLink',link));await native.put('SYN:original:ConnectionRef',prepEncode('ConnectionRef',connection));
+   const originalLink=prepDecode('GrantLink',await native.get('SYN:original:GrantLink')),originalConnection=prepDecode('ConnectionRef',await native.get('SYN:original:ConnectionRef'));
+   const issued=Date.now(),ticket={handleHash:'d'.repeat(64),requestId:F,expectedSequence:0,issuedAt:issued,expiresAt:at+19000,permissionExpiresAt:at+18000};
+   r=make('Reservation',{identity:i,issuerReservationHash:ir.recordHash,originalGrantAckHash:ga.recordHash,grantLinkHash:prepHash('GrantLink',originalLink),connectionHash:prepHash('ConnectionRef',originalConnection),expectedGrant:grant,consumedAt:consumption.consumed_at,accessExpiresAt:at+21000,preconnectionExpiresAt:at+23000,ticket,issuedAt:Date.now()});
+   result.originalBindings={issuer:ir.recordHash,ack:ga.recordHash,grantLink:prepHash('GrantLink',originalLink),connection:prepHash('ConnectionRef',originalConnection)};
+   journal=createJournal({ctx,env});
+   const data=s=>({identity:i,expectedGrant:grant,consumedAt:r.consumedAt,accessExpiresAt:s.accessExpiresAt,preconnectionExpiresAt:r.preconnectionExpiresAt,window:s.window});
+   const send=(operation='ticket',extra={})=>{
+    const issuedAt=Date.now(),window={startedAt:issuedAt,deadline:Math.min(issuedAt+4500,at+14000)};
+    const base={identityHash:i.identityHash,reservationHash:r.recordHash,operation,accessExpiresAt:r.accessExpiresAt,window,issuedAt,...extra};
+    const decisionHash=operation==='ticket'?null:hash('afw.finite-preparation-notice-decision.v1',{identityHash:i.identityHash,ticketRequestId:ticket.requestId,handleHash:ticket.handleHash,method:'POST',path:'/monitoring/grant',action:'grant',issuedAt:base.issuedAt});
+    return make('Send',{...base,decisionHash,requestHash:hash('afw.finite-preparation-notice-request.v1',{operation,common:data(base),ticket,decisionHash})});
+   };
+   const append=s=>journal.appendSend({preconnectionId:H,record:s},lease);
+   const ack=(s,actual)=>make('Ack',{sendHash:s.recordHash,outcome:actual.status,rowHash:actual.status==='applied'?hash('afw.finite-preparation-notice-row.v1',actual.row):null,sequence:actual.status==='applied'&&s.operation==='consent'?actual.row.sequence:null,observedAt:Date.now()});
+   const appendAck=(s,a)=>journal.appendAck({preconnectionId:H,operation:s.operation,record:a},lease);
+   const freeze=()=>make('Freeze',{identityHash:i.identityHash,reservationHash:r.recordHash,frozenAt:Date.now()});
+   const read=()=>journal.read({preconnectionId:H},lease);
+   const issue=s=>store.insertMonitoringTicket({...data(s),ticket},lease);
+   const retain=async(kind,work)=>{
+    const gate=latch();if(kind==='transaction')txGate=gate;else{gate.needle='INSERT INTO dossier_monitoring_owner_tickets';sqlGate=gate;}
+    let settled=false;
+    const pending=observeFiniteReadOnlyWork({ctx,env,originalLease:lease},work).then(v=>{settled=true;return {value:v};},()=>{settled=true;return {rejected:true};});
+    while(!gate.reached&&!settled)await sleep(1);
+    if(!gate.reached)throw Error('SYN actual retained gate not reached');
+    result.gateReached=true;result.gateCommitted=kind==='transaction'?txCommitted:gate.committed;parent.abort();await sleep(10);result.pendingAfterAbort=!settled;
+    const other=new AbortController(),otherLease=Object.freeze({signal:other.signal,assertCurrent(){if(other.signal.aborted||Date.now()>=originalDeadline)throw Error('SYN same original deadline expired');}});
+    otherLease.assertCurrent();result.otherLeaseDistinct=otherLease!==lease;result.otherLeaseLive=!otherLease.signal.aborted;result.withinOriginalDeadline=Date.now()<originalDeadline;
+    try{await observeFiniteReadOnlyWork({ctx,env,originalLease:otherLease},()=>true);result.observerDenied=false;}catch(e){result.observerDenied=e.message==='Finite stage work remains outstanding';}
+    gate.release();result.pending=await pending;await sleep(0);otherLease.assertCurrent();
+    result.observerAfterSettle=await observeFiniteReadOnlyWork({ctx,env,originalLease:otherLease},()=>true);other.abort();
+   };
+   if(b.case==='retained-transaction'){
+    await retain('transaction',()=>journal.appendReservation(r,lease));result.noticeRows=[...await native.list({prefix:P})];result.writes=writes();
+   }else{
+    txCommitted=false;if(b.case==='transaction-fault')txFault=b.fault;
+    result.reservation=await journal.appendReservation(r,lease);result.txCommitted=txCommitted;
+    if(b.case==='transaction-fault'){
+     result.noticeRows=[...await native.list({prefix:P})];result.writes=writes();
+    }else{
+     result.reservationReplay=await journal.appendReservation(r,lease);
+     result.reservationConflict=await journal.appendReservation(make('Reservation',{...r,connectionHash:'e'.repeat(64)}),lease);
+     result.ticketReservationConflict=await journal.appendReservation(make('Reservation',{...r,ticket:{...ticket,requestId:U}}),lease);
+     if(b.case==='corrupt'){
+      const prefix=P+H+':';
+      if(b.fault==='unknown')await native.put(prefix+'unknown','{}');
+      if(b.fault==='seventh')for(let n=0;n<6;n++)await native.put(prefix+'extra'+n,'{}');
+      if(b.fault==='orphan'){await native.delete(prefix+'reservation');await native.put(prefix+'freeze',encode('Freeze',freeze()));}
+      if(b.fault==='noncanonical')await native.put(prefix+'reservation',' '+encode('Reservation',r));
+      if(b.fault==='actor')ctx.id={toString(){return i.actorId;}};
+      if(b.fault==='version')env.AFW_QA_VERSION.id=F;
+      if(b.fault==='metadata')env.AFW_QA_VERSION={id:U};
+      if(b.fault==='storage')ctx.storage={...storage};
+      if(b.fault==='binding')env.RELEASE_DB={...wrapper};
+      result.denied=await denied(read);result.writes=writes();
+     }else if(b.case==='invalid'){
+      let getters=0;ticketSend=send();
+      if(b.fault==='Access')ticketSend=send('ticket',{accessExpiresAt:r.ticket.expiresAt-1});
+      if(b.fault==='consent-without-ticket-ACK')ticketSend=send('consent');
+      if(b.fault==='request-hash')ticketSend=make('Send',{...ticketSend,requestHash:H});
+      if(b.fault==='decision-hash')ticketSend=make('Send',{...send('consent'),decisionHash:H});
+      if(b.fault==='pre-reservation')ticketSend=send('ticket',{issuedAt:r.issuedAt-1,window:{startedAt:r.issuedAt-1,deadline:r.issuedAt+1000}});
+      if(b.fault==='ceiling')ticketSend=send('ticket',{window:{startedAt:at+17000,deadline:at+19000},issuedAt:at+17000});
+      if(b.fault==='getter'){const v={...ticketSend};Object.defineProperty(v,'issuedAt',{enumerable:true,get(){getters++;return Date.now();}});ticketSend=v;}
+      try{result.invalid=await append(ticketSend);}catch(e){result.errorMessage=e.message;result.invalid={status:'denied'};}
+      result.getters=getters;result.history=await read();result.writes=writes();
+     }else{
+      ticketSend=send();
+      if(b.case==='freeze-empty'){
+       const f=freeze();result.freeze=await journal.freeze({preconnectionId:H,record:f},lease);result.freezeReplay=await journal.freeze({preconnectionId:H,record:f},lease);result.blockedSend=await append(ticketSend);result.history=await read();result.writes=writes();
+      }else{
+       const sends=await Promise.all([append(ticketSend),append(ticketSend)]);result.concurrent=sends;result.sendConflict=await append(send('ticket',{window:ticketSend.window,issuedAt:ticketSend.issuedAt+1}));
+       // Only a newly recorded SEND emits SQL; existing is DATA history, never permission.
+       if(sends.filter(v=>v.status==='recorded').length!==1)throw Error('SYN SEND must have exactly one recorded result');
+       if(b.case==='retained-sql'){
+        await retain('sql',()=>issue(ticketSend));result.history=await createJournal({ctx,env}).read({preconnectionId:H},Object.freeze({signal:new AbortController().signal,assertCurrent(){if(Date.now()>=originalDeadline)throw Error('SYN deadline');}}));result.writes=writes();
+       }else{
+        if(b.case==='sql-loss'&&b.target==='ticket')sqlLoss='INSERT INTO dossier_monitoring_owner_tickets';
+        if(b.case==='no-mutation')await exec('UPDATE site_projects SET revision=2');
+        try{result.ticket=await issue(ticketSend);}catch{result.actualSqlRejected=true;}
+        if(result.ticket?.status==='no_mutation'){
+         const ta=ack(ticketSend,result.ticket);result.ticketAck=await appendAck(ticketSend,ta);result.blockedConsent=await append(send('consent'));
+        }else if(result.ticket){
+         const ta=ack(ticketSend,result.ticket);result.ticketAckData=ta;
+         if(b.case==='invalid-ticket-ack'){
+          const changes={sendHash:H,sequence:17,observedAt:b.fault==='late'?ticketSend.window.deadline:ticketSend.issuedAt-1};
+          const invalid=make('Ack',{...ta,[b.fault==='late'||b.fault==='early'?'observedAt':b.fault]:changes[b.fault==='late'||b.fault==='early'?'observedAt':b.fault]});
+          result.invalidAck=await appendAck(ticketSend,invalid);result.history=await read();result.writes=writes();return Response.json({result,identity:i});
+         }
+         if(b.case==='freeze-ticket-send'){
+          result.freeze=await journal.freeze({preconnectionId:H,record:freeze()},lease);result.blockedAck=await appendAck(ticketSend,ta);
+         }else{
+          result.ticketAck=await appendAck(ticketSend,ta);
+          journal=createJournal({ctx,env});result.betweenGetPost=await read();
+          if(b.case==='freeze-ticket-ack'){
+           result.freeze=await journal.freeze({preconnectionId:H,record:freeze()},lease);result.blockedSend=await append(send('consent'));result.history=await read();result.writes=writes();return Response.json({result,identity:i});
+          }
+          // Foreign native events preserve MAX(current grant)=0 and assign sequence 17 globally.
+          for(let n=0;n<16;n++)await exec("INSERT INTO dossier_monitoring_consent_events(grant_id,project_id,user_id,client_id,resource,revision,action,purpose,request_id,issued_at,expires_at) VALUES (?,?,?,?,?,1,'grant','afw.dossier-monitoring.v1',?,?,?)",'SYN-foreign-'+n,i.projectId,i.subject,i.clientId,i.resource,'33333333-3333-4333-8333-'+String(n).padStart(12,'0'),at,at+19000);
+          result.foreignBefore=(await db.prepare("SELECT * FROM dossier_monitoring_consent_events WHERE grant_id<>? ORDER BY sequence").bind(i.grantId).all()).results;
+          result.priorGrantMax=(await db.prepare('SELECT COALESCE(MAX(sequence),0) AS n FROM dossier_monitoring_consent_events WHERE grant_id=?').bind(i.grantId).first()).n;
+          const cs=send('consent',b.case==='consent-reduced'?{accessExpiresAt:ticket.expiresAt}:{});result.consentSend=await append(cs);
+          if(result.consentSend.status==='recorded'){
+           const common=data(cs),witness=await store.observeMonitoringTicket({...common,ticket},lease);result.observed=!!witness;result.witnessFrozen=Object.isFrozen(witness)&&Object.isFrozen(witness.row);
+           if(b.case==='sql-loss'&&b.target==='consent')sqlLoss='INSERT INTO dossier_monitoring_consent_events';
+           try{result.consent=await store.insertMonitoringConsent({...common,ticketWitness:witness},lease);}catch{result.actualSqlRejected=true;}
+           if(result.consent){const ca=ack(cs,result.consent);result.consentAckData=ca;
+            if(b.case==='freeze-consent-send'){result.freeze=await journal.freeze({preconnectionId:H,record:freeze()},lease);result.blockedAck=await appendAck(cs,ca);}
+            else if(b.case==='invalid-consent-ack')result.invalidAck=await appendAck(cs,make('Ack',{...ca,sequence:null}));
+            else result.consentAck=await appendAck(cs,ca);}
+          }
+          result.foreignAfter=(await db.prepare("SELECT * FROM dossier_monitoring_consent_events WHERE grant_id<>? ORDER BY sequence").bind(i.grantId).all()).results;
+          if(b.case==='freeze-complete'){result.freeze=await journal.freeze({preconnectionId:H,record:freeze()},lease);result.replayAck=await appendAck(ticketSend,ta);result.replaySend=await append(ticketSend);}
+         }
+        }
+        if(b.case==='sql-loss')journal=createJournal({ctx,env});result.history=await read();
+        if(b.case==='sql-loss'&&b.target==='ticket')result.blockedConsent=await append(send('consent'));
+        if(b.case==='sql-loss'){result.freeze=await journal.freeze({preconnectionId:H,record:freeze()},lease);result.afterFreeze=await read();}
+        result.ticketRows=(await db.prepare('SELECT * FROM dossier_monitoring_owner_tickets').all()).results;
+        result.eventRows=(await db.prepare('SELECT * FROM dossier_monitoring_consent_events WHERE grant_id=?').bind(i.grantId).all()).results;
+        result.writes=writes();result.grantUnchanged=JSON.stringify(result.grant.row)===JSON.stringify(await db.prepare('SELECT * FROM delegated_access_grants WHERE id=?').bind(i.grantId).first());
+       }
+      }
+     }
+    }
+   }
+   result.puts=puts;result.reservationData=r;result.sendData=ticketSend;
+  }catch(e){result.error=e.message;}
+  return Response.json({result,identity:i});
+ }
+}
+const handler={fetch(request,env){return env.FIXTURE.get(env.FIXTURE.idFromName('afw-own-successor-closure-v1')).fetch(request);}};
+export default handler;

diff --git a/test/mcp-qa-finite-preparation-notice-provenance-native.test.mjs b/test/mcp-qa-finite-preparation-notice-provenance-native.test.mjs
--- /dev/null
+++ b/test/mcp-qa-finite-preparation-notice-provenance-native.test.mjs
@@ -0,0 +1,62 @@
+import test from 'node:test';
+import assert from 'node:assert/strict';
+import {build} from 'esbuild';
+import {createHash} from 'node:crypto';
+import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
+import {initialHash as hash} from '../lib/mcp-qa-finite-initial-material-records.mjs';
+const built=await build({entryPoints:['test/fixtures/finite-preparation-notice-provenance-worker.mjs'],bundle:true,write:false,format:'esm',platform:'neutral',target:'es2022',external:['node:*','cloudflare:*'],legalComments:'none'});
+console.log('SYN notice provenance fixture compilations=1 bytes='+built.outputFiles[0].contents.length+' sha256='+createHash('sha256').update(built.outputFiles[0].contents).digest('hex'));
+let serial=0;
+async function scenario(t,name='positive',extra={}){
+ const mf=new Miniflare(convertV4MiniflareOptions({modules:true,script:built.outputFiles[0].text,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],d1Databases:{RELEASE_DB:'SYN-provenance-'+(++serial)},durableObjects:{FIXTURE:{className:'FiniteNoticeProvenanceFixture',useSQLite:true,uniqueKey:'SYN-provenance-'+serial}}}));
+ t.after(()=>mf.dispose());const response=await mf.dispatchFetch('https://fixture.invalid',{method:'POST',body:JSON.stringify({case:name,...extra})});
+ assert.equal(response.status,200);const {result:r,identity:i}=await response.json();
+ assert.equal(r.grant?.row.id,i.grantId);assert.equal(r.reachedNativeGrant,true);assert.equal(r.error,undefined,'native grant reached; journal failure: '+r.error);return r;
+}
+function recorded(r){assert.equal(r.reservation.status,'recorded');assert.equal(r.reservationReplay.status,'existing');assert.equal(r.reservationConflict.status,'uncertain');assert.equal(r.ticketReservationConflict.status,'uncertain');}
+test('REAL native original grant precedes durable notice reservation and original provenance bindings',async t=>{
+ const r=await scenario(t);recorded(r);assert.equal(r.issuerReservation.status,'recorded');assert.equal(r.originalGrantAck.status,'recorded');
+ assert.equal(r.reservationData.issuerReservationHash,r.originalBindings.issuer);assert.equal(r.reservationData.originalGrantAckHash,r.originalBindings.ack);assert.equal(r.reservationData.grantLinkHash,r.originalBindings.grantLink);assert.equal(r.reservationData.connectionHash,r.originalBindings.connection);
+ assert.deepEqual(r.concurrent.map(x=>x.status).sort(),['existing','recorded']);assert.equal(r.sendConflict.status,'uncertain');assert.equal(r.ticket.status,'applied');assert.equal(r.ticketAck.status,'recorded');assert.equal(r.betweenGetPost.operations.ticket.ack.recordHash,r.ticketAckData.recordHash);
+ assert.equal(r.observed,true);assert.equal(r.witnessFrozen,true);assert.equal(r.consent.status,'applied');assert.equal(r.consentAck.status,'recorded');assert.equal(r.writes,2);assert.equal(r.grantUnchanged,true);
+ assert.equal(r.priorGrantMax,0);assert.equal(r.reservationData.ticket.expectedSequence,0);assert.equal(r.consent.row.sequence,17);assert.equal(r.consentAckData.sequence,17);assert.deepEqual(r.foreignAfter,r.foreignBefore);assert.equal(r.foreignAfter.length,16);
+ assert.equal(Object.keys(r.ticket.row).length,14);assert.equal(Object.keys(r.consent.row).length,12);
+ assert.deepEqual(r.ticketRows,[r.ticket.row]);assert.deepEqual(r.eventRows,[r.consent.row]);
+ assert.equal(r.ticketAckData.rowHash,hash('afw.finite-preparation-notice-row.v1',r.ticketRows[0]));assert.equal(r.consentAckData.rowHash,hash('afw.finite-preparation-notice-row.v1',r.eventRows[0]));
+ assert.equal(r.history.operations.consent.ack.sequence,17);assert.equal(r.history.freeze,null);
+});
+for(const name of ['freeze-empty','freeze-ticket-send','freeze-ticket-ack','freeze-consent-send','freeze-complete'])test('REAL irreversible '+name+' preserves history and blocks new progress',async t=>{
+ const r=await scenario(t,name);recorded(r);assert.equal(r.freeze.status,'recorded');assert.ok(r.history.freeze);assert.equal((r.blockedSend??r.blockedAck??r.replaySend).status,name==='freeze-complete'?'existing':'uncertain');
+ if(name==='freeze-empty'){assert.equal(r.history.operations.ticket.send,null);assert.equal(r.freezeReplay.status,'existing');assert.equal(r.writes,0);}
+ if(name==='freeze-ticket-send'){assert.ok(r.history.operations.ticket.send);assert.equal(r.history.operations.ticket.ack,null);assert.equal(r.writes,1);}
+ if(name==='freeze-ticket-ack'){assert.ok(r.history.operations.ticket.ack);assert.equal(r.history.operations.consent.send,null);assert.equal(r.writes,1);}
+ if(name==='freeze-consent-send'){assert.ok(r.history.operations.consent.send);assert.equal(r.history.operations.consent.ack,null);assert.equal(r.writes,2);}
+ if(name==='freeze-complete'){assert.equal(r.replayAck.status,'existing');assert.equal(r.replaySend.status,'existing');assert.equal(r.writes,2);assert.ok(r.history.operations.consent.ack);}
+});
+for(const fault of ['callback_throw','final_throw','sync_loss','readback_loss'])test('REAL native transaction durability fault '+fault+' never authorizes SQL',async t=>{
+ const r=await scenario(t,'transaction-fault',{fault});assert.equal(r.reservation.status,'uncertain');assert.equal(r.noticeRows.length,fault==='callback_throw'?0:1);assert.equal(r.writes,0);
+ if(fault!=='callback_throw')assert.equal(r.txCommitted,true);
+});
+for(const target of ['ticket','consent'])test('REAL actual SQL '+target+' ACK loss preserves SEND without reconstructing ACK or replay',async t=>{
+ const r=await scenario(t,'sql-loss',{target});recorded(r);assert.equal(r.actualSqlRejected,true);assert.equal(r.ticketRows.length,1);assert.equal(r.eventRows.length,target==='ticket'?0:1);assert.ok(r.history.operations[target].send);assert.equal(r.history.operations[target].ack,null);assert.equal(r.afterFreeze.operations[target].ack,null);assert.equal(r.afterFreeze.operations[target].send.recordHash,r.history.operations[target].send.recordHash);assert.equal(r.writes,target==='ticket'?1:2);
+ if(target==='ticket'){assert.equal(r.blockedConsent.status,'uncertain');assert.equal(r.history.operations.consent.send,null);}
+});
+for(const kind of ['transaction','sql'])test('REAL '+kind+' Promise retained after abort; SYN observer owns outstanding exclusion within original deadline',async t=>{
+ const r=await scenario(t,'retained-'+kind);assert.equal(r.gateReached,true);assert.equal(r.gateCommitted,true);assert.equal(r.pendingAfterAbort,true);assert.equal(r.otherLeaseDistinct,true);assert.equal(r.otherLeaseLive,true);assert.equal(r.withinOriginalDeadline,true);assert.equal(r.observerDenied,true);assert.equal(r.observerAfterSettle,true);assert.equal(r.writes,kind==='transaction'?0:1);
+ if(kind==='transaction'){assert.equal(r.pending.value.status,'uncertain');assert.equal(r.noticeRows.length,1);}else{assert.equal(r.pending.rejected,true);assert.ok(r.history.operations.ticket.send);assert.equal(r.history.operations.ticket.ack,null);}
+});
+for(const fault of ['unknown','seventh','orphan','noncanonical','actor','version','metadata','storage','binding'])test('REAL exhaustive inventory and captured holder integrity reject '+fault,async t=>{
+ const r=await scenario(t,'corrupt',{fault});recorded(r);assert.equal(r.denied,true);assert.equal(r.writes,0);
+});
+for(const fault of ['Access','consent-without-ticket-ACK','request-hash','decision-hash','pre-reservation','ceiling','getter'])test('REAL contextual SEND validation rejects '+fault+' before mutation',async t=>{
+ const r=await scenario(t,'invalid',{fault});recorded(r);assert.ok(['uncertain','denied'].includes(r.invalid.status));assert.equal(r.getters,0);assert.equal(r.writes,0);assert.equal(r.history.operations.ticket.send,null);assert.equal(r.history.operations.consent.send,null);if(fault==='getter')assert.equal(r.errorMessage,'Finite preparation notice unavailable');
+});
+for(const fault of ['sendHash','sequence','early','late'])test('REAL ticket ACK link/timing/sequence rejects '+fault,async t=>{
+ const r=await scenario(t,'invalid-ticket-ack',{fault});recorded(r);assert.equal(r.invalidAck.status,'uncertain');assert.equal(r.history.operations.ticket.ack,null);assert.equal(r.writes,1);
+});
+test('REAL consent ACK requires actual positive assigned sequence',async t=>{const r=await scenario(t,'invalid-consent-ack');recorded(r);assert.equal(r.consent.row.sequence,17);assert.equal(r.invalidAck.status,'uncertain');assert.equal(r.history.operations.consent.ack,null);assert.equal(r.writes,2);});
+test('REAL no_mutation ACK is terminal and cannot advance consent',async t=>{const r=await scenario(t,'no-mutation');recorded(r);assert.equal(r.ticket.status,'no_mutation');assert.equal(r.ticketAck.status,'recorded');assert.equal(r.history.operations.ticket.ack.rowHash,null);assert.equal(r.history.operations.ticket.ack.sequence,null);assert.equal(r.blockedConsent.status,'uncertain');assert.equal(r.history.operations.consent.send,null);assert.equal(r.ticketRows.length,0);assert.equal(r.writes,1);});
+
+test('REAL POST Access may narrow while covering original ticket without enlarging permission',async t=>{
+ const r=await scenario(t,'consent-reduced');recorded(r);assert.equal(r.consent.status,'applied');assert.equal(r.history.operations.consent.send.accessExpiresAt,r.reservationData.ticket.expiresAt);assert.ok(r.history.operations.consent.send.accessExpiresAt<r.reservationData.accessExpiresAt);assert.equal(r.consent.row.expires_at,r.reservationData.ticket.permissionExpiresAt);
+});

diff --git a/test/mcp-qa-finite-preparation-notice-provenance.test.mjs b/test/mcp-qa-finite-preparation-notice-provenance.test.mjs
--- /dev/null
+++ b/test/mcp-qa-finite-preparation-notice-provenance.test.mjs
@@ -0,0 +1,53 @@
+import test from 'node:test';
+import assert from 'node:assert/strict';
+import {initialHash as hash,initialCanonical as canonical} from '../lib/mcp-qa-finite-initial-material-records.mjs';
+import {sealFinitePreparationIssuerRecord as issuer} from '../lib/mcp-qa-finite-preparation-issuer-records.mjs';
+import {sealFinitePreparationNoticeRecord as seal,encodeFinitePreparationNoticeRecord as encode,decodeFinitePreparationNoticeRecord as decode,FINITE_PREPARATION_NOTICE_PREFIX as P,FINITE_PREPARATION_NOTICE_OPERATIONS as OPS} from '../lib/mcp-qa-finite-preparation-notice-records.mjs';
+const H='a'.repeat(64),U='11111111-1111-4111-8111-111111111111',at=1800000000000;
+const i=issuer('Identity',{preconnectionId:H,enrollmentHash:H,capsuleHash:H,sourceRevision:'b'.repeat(40),qaVersionId:U,actorId:H,subject:'SYN-owner',accessRealmHash:H,projectId:'SYN-project',projectRevision:1,clientId:'SYN-client',resource:'https://delegated-canary.agentfriendlyweb.dev/mcp',authorizationHash:H,grantId:U,requestedScopes:['afw:project:read','afw:evidence:read'],consentExpiresAt:new Date(at+20000).toISOString(),I0:at-1000,C0:at+899000,C1:at+1079000,reservedAt:at-10});
+const body={identity:i,issuerReservationHash:H,originalGrantAckHash:H,grantLinkHash:H,connectionHash:H,expectedGrant:{scopes:['afw:project:read'],createdAt:new Date(at).toISOString(),expiresAt:new Date(at+18000).toISOString()},consumedAt:new Date(at).toISOString(),accessExpiresAt:at+19000,preconnectionExpiresAt:at+20000,ticket:{handleHash:H,requestId:U,expectedSequence:0,issuedAt:at,expiresAt:at+17000,permissionExpiresAt:at+16000},issuedAt:at+1};
+const make=(kind,v)=>seal(kind,{purpose:'afw.finite-preparation-notice-'+kind.toLowerCase()+'.v1',...v});
+const reservation=make('Reservation',body);
+const send=make('Send',{identityHash:i.identityHash,reservationHash:reservation.recordHash,operation:'ticket',requestHash:H,accessExpiresAt:body.accessExpiresAt,window:{startedAt:at+2,deadline:at+4000},issuedAt:at+2,decisionHash:null});
+const consent=make('Send',{...send,operation:'consent',decisionHash:H});
+const records=[['Reservation',reservation],['Send',send],['Send',consent],['Ack',make('Ack',{sendHash:send.recordHash,outcome:'applied',rowHash:H,sequence:null,observedAt:at+3})],['Ack',make('Ack',{sendHash:consent.recordHash,outcome:'applied',rowHash:H,sequence:17,observedAt:at+4})],['Ack',make('Ack',{sendHash:send.recordHash,outcome:'no_mutation',rowHash:null,sequence:null,observedAt:at+3})],['Freeze',make('Freeze',{identityHash:i.identityHash,reservationHash:reservation.recordHash,frozenAt:at+5})]];
+test('DATA exact canonical round trips all kinds and real global sequence 17 independent of expectedSequence zero',()=>{
+ assert.equal(P,'afw.finite-preparation-notice.v1:');assert.deepEqual(OPS,['ticket','consent']);assert.ok(Object.isFrozen(OPS));
+ for(const [kind,r]of records){const raw=encode(kind,r),decoded=decode(kind,raw);assert.equal(raw,canonical(r));assert.deepEqual(decoded,r);assert.notEqual(decoded,r);assert.ok(Object.isFrozen(decoded));assert.throws(()=>decode(kind,' '+raw),/Finite preparation notice unavailable/);}
+ assert.equal(records[4][1].sequence,17);assert.equal(reservation.ticket.expectedSequence,0);
+});
+test('DATA detached deeply frozen snapshots',()=>{const v=structuredClone(body),r=make('Reservation',v);v.ticket.requestId='22222222-2222-4222-8222-222222222222';assert.equal(r.ticket.requestId,U);assert.ok(Object.isFrozen(r.ticket)&&Object.isFrozen(r.identity.requestedScopes));});
+for(const fault of ['extra','symbol','getter','prototype','sparse','oversize','identity-C0','identity-C1','Access','window','time','sequence','grant-order','scopes','ticket-limit','permission','consumed','purpose','hash','null-row','no-mutation-sequence','zero-sequence','fraction-sequence','unknown-kind'])test('DATA rejects '+fault+' generically without evaluating getters',()=>{
+ let calls=0,kind='Reservation',v={purpose:'afw.finite-preparation-notice-reservation.v1',...structuredClone(body)},fn=()=>seal(kind,v);
+ if(fault==='extra')v.approval=true;
+ if(fault==='symbol')v[Symbol('SYN')]=true;
+ if(fault==='getter')Object.defineProperty(v,'issuedAt',{enumerable:true,get(){calls++;return at;}});
+ if(fault==='prototype')Object.setPrototypeOf(v,{});
+ if(fault==='sparse')v.expectedGrant.scopes=new Array(1);
+ if(fault==='oversize')v.identity.subject='x'.repeat(17000);
+ if(fault==='identity-C0')v.identity.C0++;
+ if(fault==='identity-C1')v.identity.C1++;
+ if(fault==='Access')v.accessExpiresAt=v.ticket.expiresAt-1;
+ if(fault==='window'){kind='Send';v={...send,window:{startedAt:at,deadline:at+5001}};}
+ if(fault==='time')v.issuedAt=v.ticket.permissionExpiresAt;
+ if(fault==='sequence')v.ticket.expectedSequence=1;
+ if(fault==='grant-order')v.expectedGrant.expiresAt=v.expectedGrant.createdAt;
+ if(fault==='scopes')v.expectedGrant.scopes=['afw:evidence:read','afw:project:read'];
+ if(fault==='ticket-limit')v.ticket.expiresAt=v.ticket.issuedAt+600001;
+ if(fault==='permission')v.ticket.permissionExpiresAt=v.ticket.issuedAt;
+ if(fault==='consumed')v.consumedAt=new Date(at-20).toISOString();
+ if(fault==='purpose')v.purpose='wrong';
+ if(fault==='hash'){v={...reservation,recordHash:'f'.repeat(64)};fn=()=>encode(kind,v);}
+ if(['null-row','no-mutation-sequence','zero-sequence','fraction-sequence'].includes(fault)){kind='Ack';v={...records[4][1]};if(fault==='null-row')v.rowHash=null;if(fault==='no-mutation-sequence'){v.outcome='no_mutation';v.rowHash=null;}if(fault==='zero-sequence')v.sequence=0;if(fault==='fraction-sequence')v.sequence=1.5;}
+ if(fault==='unknown-kind')kind='Other';
+ assert.throws(fn,e=>e.message==='Finite preparation notice unavailable');assert.equal(calls,0);
+});
+test('DATA decode rejects malformed JSON, unknown fields, noncanonical bytes and wrong checksums',()=>{
+ for(const raw of ['{','{}','x'.repeat(16385),JSON.stringify({...reservation,extra:1}),JSON.stringify(reservation),canonical({...reservation,recordHash:'f'.repeat(64)})])if(raw!==canonical(reservation))assert.throws(()=>decode('Reservation',raw),/Finite preparation notice unavailable/);
+ const wrong=canonical({...reservation,issuerReservationHash:'f'.repeat(64)});assert.throws(()=>decode('Reservation',wrong));
+ assert.equal(reservation.recordHash,hash(reservation.purpose,Object.fromEntries(Object.entries(reservation).filter(([k])=>k!=='recordHash'))));
+});
+
+test('DATA Access and preconnection are independent ceilings, never renewal authority',()=>{
+ const r=make('Reservation',{...body,accessExpiresAt:at+30000});assert.ok(r.accessExpiresAt>r.preconnectionExpiresAt);assert.equal(r.ticket.expiresAt,body.ticket.expiresAt);
+});

~~~
