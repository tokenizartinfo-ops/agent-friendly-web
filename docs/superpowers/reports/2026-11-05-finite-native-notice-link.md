# NoticeLink desde el POST nativo — informe SOURCE

2026-11-05. PROJECT=AFW; REPOSITORY=tokenizartinfo-ops/agent-friendly-web (público1347578006); ENVIRONMENT=GitHub SOURCE/Actions SYN; ORIGIN=GitHub API; RESOURCE_TYPE=rama aislada; RESOURCE_ID=feat/finite-native-cleanup-20261101; ALLOWED_ACTION=única unidad NoticeLink con cuatro paths de código/test, informe/ledger y qualifier temporal. Rollback sólo commits propios por expected-head CAS; sin borrar filas, Links o historia.

BASE953e7af1fc20b59c59d8e4a03dcf398d98165cf5 / treeee77df20d2c22fc48c55663524b9720b95364d2d. Brief61f7a5f4b3c996feeb580c7f37843fd14f0272d7 completo45516chars y preflight5cfbf0f7a1bd62437b0891ea3de97de0281bc564 completo9107chars leídos antes de editar. Despacho Root exacto activa sólo SOURCE sobre POST aceptado f62b6c8b17412b812ae411bbc9cedad43b9ce501, sin repetición de la unidad aceptada.

## Cambio

La misma continuación privada del POST conserva actualSqlPromise, actualSqlResult y sqlSettled originales; ownAck se asigna del ACK real sólo después de appendAck recorded/hash. El productor sigue en la child/window/common/l originales: putLink recorded/hash → storage.sync real capturado con Reflect.apply → readLink observed/bytes/hash → actualización del expected privado y par completo final →200. existing/uncertain/fallo no llega a200 ni a lectura de recuperación. Unknown commit conserva el prefijo durable y jamás concede retry/backfill.

Recheck enumera seis estados admitidos; pendientes y desconocidos deniegan. SQL real se exige en los tres estados resueltos, ownAck en los dos posteriores al ACK; Link-recorded exige los handles y resultados propios de put/sync/readback. El observer añade una lectura readLink real por snapshot y noticeLink null/record privado, verifica inventario raw byteexacto y correlación de identity/grant/sequence/eventHash/ACK/tiempos. eventHash usa evidence('event',proyección camelCase12 original), distinto del rowHash snake_case del ACK. Ningún nuevo export/ruta/fase/capacidad pública.

Se preservó el contrato exacto de enrollment: el campo privado nuevo se añade después de ese contrato de10campos y antes de issuer/notice/correlación. Ambos snapshots siguen enteros; grant.exchanged_at actual no se normaliza, el ACK issuer histórico conserva su comprobación separada. Inventory se inserta con orden factual de storage.list, sin reemplazar otras filas. Journal normal5filas/max6confreeze/cap7; NoticeLink separado bajo connection-preparation:<id>:notice.

El observer comprueba acceptedAt dentro de la ventana histórica consentSend, pero no exige Now<historicaldeadline para leer historia. Now sigue bajo techos actuales de grant/Access/permiso/pre/C0. Test con correlador ENTER+EXIT real después del deadline y replay0nuevoSEND/SQL/Link prueba factualidad, no permiso. Público3keys/OAuth/GET/baselinePOSTnuevo permanecen cerrados frente a la historia propia.

## TDD y cambios propios

| Fase | HEAD | Árbol |
|---|---|---|
| RED |71c1e67ed1c15269f177a6413b2a6c4901cc57f0|4ad8098f29dd4cbc1b60649ca61f4cfe9ed35c6e|
| mínimo inicial (falla compartida) |7b3609bc43ab2f42903ab8d0f6ab6a69b90d48e0|471638640fa1bab45631552d781ad9e0d90f72e7|
| corrección exacta enrollment / focal GREEN |7d3044f9b2127c74083f955905e70ed33d6cf488|0c0361093227b8921a2b9e1d194b0d56a2c1bda0|
| corpus completo |fe18ba913a66f63f23468b455f5ec64bf9de6ec4|06098fadd7dbbc8c23bf5c6409b012dc6a1e1c74|

RED causal válido: POST200, EventRow nativa1 y ACKdurable5filas comprobados antes de exigir Link ausente. QA code→M token→MCP real, JWT RS256/JWKS, Access y CSRF originales, D1/DO/workerd reales en SYN. No prefill positivo, reemplazo de Promise/resultado, verifier/source/frame inyectado ni actualización de stores/journal. El helper fijo de preparación/exchange/ticket/POST vive sólo en el fixture GET existente, opera sobre f nativo y no importa world/SDKfixture (sin ciclo).

La primera falla de producto compartido ocurrió en sdkReadCurrent inicial, antes de OAuth/POST/Link: data.noticeLink incluido demasiado pronto en el spread al contrato exacto de enrollment. Se corrigió únicamente el orden de observación, sin tolerar campos ni editar ese contrato protegido. No atribuir ese run a fallo de SQL/Link/deadline. Carry Minor queuedSQL/abortSQL ahora exige probe vigente permitido tras settlement observado; límites SYN existentes intactos.

## Ruling Root y diagnóstico del harness

Root autorizó continuar la MISMA unidad desde fe18, sin repetir los grupos ya aprobados. El control SYN nuevo queda exclusivamente en default fetch del fixture GET existente, ruta fija /fixture/notice-link-control, acciones read/reset/release de forma y tamaño acotados. No Worker, binding, world mode, stub, storage, RPC ni resultado de producto desde esa ruta. El marcador comprobado entre getWorker('qa-sdk').fetch y actor probó realm compartido real; el ENTER de la TX productora lo corroboró. El control sólo escribe/lee DATA; la espera SYN se resuelve/rechaza desde la continuación original, con el deadline original de la child, no un reloj nuevo.

La espera anterior dentro de la TX, liberada mediante RPC al mismo DO, produjo un reset nativo blockConcurrencyWhile y luego dejó el proceso abierto, aunque TAP había emitido31casos. El qualifier no fue GREEN: timeout15min,31emitidos/28PASS/3FAIL, sin resumen terminal. El nuevo gate rechaza y hace cleanup al deadline original<=5s si falta release; no retiene indefinidamente una TX, ni sustituye Promises nativas de transaction/putLink/sync/readback.

Las dos calibraciones posteriores también se preservan como FAIL. be350 confirmó visibilidad DATA, pero exigió equivocadamente que el probe RPC Node siguiera pendiente al evaluarse un timer25ms. f619 midió que la llamada RPC/proxy consumió4379ms y devolvió allowed=true cuando el control ya había expirado/settled. Eso NO prueba admisión durante la TX. La ausencia del viejo trace transaction-settled sólo observaba fulfillment; no distinguía rechazo de pending. Se añadió observación DATA con ambos handlers then sobre la Promise nativa ORIGINAL; no se reemplazaron resultado, Promise ni throws.

Según ruling Root, el test captura los Fetchers ANTES del hold y usa el ingreso HTTP M→QA existente. No accede al stub RPC Node del actor durante la TX. Retiene POST y HTTP competidor reales; inspecciona txStarted/txSettled/txOutcome del observador nativo y held del gate vía default fetch. En el GREEN focal, HTTP seguía pendiente mientras TX nativa estaba realmente unsettled; tras abort original, release y await de ambos, la TX native cumplió y ambos HTTP terminaron503, sin200 tardío. Es observación SYN de ese camino, no contrato universal de demora25ms, drenaje distribuido ni permiso de operación. Held-commit/sync/readback siguen probando por separado la denegación de stage-work y settlement local.

Otros dos FAIL Link eran errores de prueba/observación. La negativa de correlación comparaba cero INSERT contra un state que conservaba el INSERT nativo original1; ahora exige baseline1 sin INSERT nuevo. Retirada ordinaria503 era causada por el wrapper D1 observacional que sólo exponía first/all; se restauran los métodos nativos capturados ANTES de la retirada real. Se comprueban action=revoke, eventos2 preservando el primero, mismo ticket/journal/grant y autorización ordinaria enabled=false. No resultado ni fila positiva inyectados.

El FAIL del caso cookie en fullPOST ocurrió en sdkReadCurrent inicial del setup, antes de OAuth/monitoring/ejecutar la cookie. Una única ejecución focal posterior pasó. Causa inicial desconocida/no reproducida; no se declara reparación del producto ni defecto de cookies. Se preservan49GREEN compatibles más esa primaria focal, sin repetir50POST ni GET/regresiones81.

be350 lint4 terminó exit0 pero emitió1warning no-unused-expressions; el primer mensaje del writer lo llamó clean incorrectamente. Se corrigió la expresión del test QA a assignments separados; f619/ac401 lint4 no emitieron errores ni warnings. Advertencias de toolchain/harness permanecen.

## Primarias, comandos y matriz escalonada

Todos los runs son push y attempt1, sobre su HEAD exacto. No reruns/cancel manual, cron, workflow_dispatch ni suite estándar para métricas. El qualifier tuvo como máximo3jobs independientes, timeout-minutes15, contents:read, checkout persist-credentials:false, Node22.23.4 y npm ci --ignore-scripts --no-audit --no-fund; artefactos7d. El final agrega contención shell13m sólo al proceso de laboratorio, sin ampliar reloj de producto.

| Fase | HEAD | Run / job | Resultado |
|---|---|---|---|
| RED causal + carry |71c1e67ed1c15269f177a6413b2a6c4901cc57f0|42114322347 /127549785870|Link1=0P/1F, missingLink trasPOST200/evento/ACK; carry2=2P/0F;0skip|
| mínimo inicial |7b3609bc43ab2f42903ab8d0f6ab6a69b90d48e0|42115157508 /127552730650|Link1=0P/1F,carry2=0P/2F; falla setup exacto enrollment antes OAuth/SQL/Link;0skip|
| focal GREEN |7d3044f9b2127c74083f955905e70ed33d6cf488|42115360441 /127553446346|Link1+carry2=3P/0F/0skip|
| full Link parcial |fe18ba913a66f63f23468b455f5ec64bf9de6ec4|42115921441 /127555403391|CANCELLED por límite15min; TAP31emitidos=28P/3F; SIN resumen terminal; no GREEN|
| full POST |fe18ba913a66f63f23468b455f5ec64bf9de6ec4|42115921441 /127555403763|50=49P/1F/0skip; único FAIL setup inicial del caso cookie;680029.50538ms|
| full GET + regresiones |fe18ba913a66f63f23468b455f5ec64bf9de6ec4|42115921441 /127555404157|37+18+16+6+4=81P/0F/0skip; cada count exacto,lint4 sin salida|
| calibración DATA |be3509895da359a6aa8135b7dba6446c4892da4b|42120340776 /127570738707|1=0P/1F/0skip; visibilidad compartida real, mala expectativa probe;3afectadas NO ejecutadas|
| cookie diagnóstico + lint |be3509895da359a6aa8135b7dba6446c4892da4b|42120340776 /127570739345|1P/0F/0skip,no reproducido;lint4 exit0/1warning|
| diagnóstico RPC/TX |f619192eb378c87b6288956509b884d78ba7d0ab|42120773920 /127572226999|1=0P/1F/0skip; retorno RPC tras deadline;lint4 sin salida|
| native HTTP + afectadas |ac401ba936c4ef7c80095473df57a0002daae8ca|42121383907 /127574329989|control1 yprincipal/correlación/withdrawal3=4P/0F/0skip;lint4 sin salida|

Comandos exactos:

```sh
node --test test/mcp-qa-finite-owner-notice-link-native.test.mjs
node --test --test-name-pattern='^native consent (original window fences queued SQL|abort retains SQL and forbids late ACK)$' test/mcp-qa-finite-owner-notice-consent-native.test.mjs
node --test test/mcp-qa-finite-owner-notice-consent-native.test.mjs
node --test test/mcp-qa-finite-owner-notice-get-native.test.mjs
node --test test/mcp-qa-finite-owner-phase-context.test.mjs
node --test --test-name-pattern='^(closed source keeps|settled first connection|unknown issuer SEND|absent original issuer never|failed schema SELECT|fresh current owner|fresh QA pointer|same ambient original request)' test/mcp-qa-finite-owner-phase-context-native.test.mjs
node --test --test-name-pattern='^(uninstrumented actual native|missing actual SDK binding cookie|actual current publication drift|owned begin recheck rejects actual foreign delta owner-revision|fanout causal control delay0)' test/mcp-qa-finite-owner-qa-sdk-native.test.mjs
node --test --test-name-pattern='^D04 actual exchange (retains|then SYN valid native timestamp drift|then SYN immutable original current-(owner|revision))' test/mcp-qa-finite-owner-qa-sdk-token-compat-native.test.mjs
node --test --test-name-pattern='^native notice link held native work and cancellation retain scope link-hold-write$' test/mcp-qa-finite-owner-notice-link-native.test.mjs
node --test --test-name-pattern='^(native notice link follows actual consent ACK in the same POST child|native notice link factual mismatch denies valid codec and journal data|native notice link missing source evidence never becomes authority withdrawal)$' test/mcp-qa-finite-owner-notice-link-native.test.mjs
node --test --test-name-pattern='^native consent malformed unrelated cookie denies before SEND$' test/mcp-qa-finite-owner-notice-consent-native.test.mjs
npx --no-install eslint lib/mcp-qa-finite-owner-phase-context.mjs test/fixtures/finite-owner-notice-get.mjs test/mcp-qa-finite-owner-notice-link-native.test.mjs test/mcp-qa-finite-owner-notice-consent-native.test.mjs
```

Mapa estático heredado verificado contra mismos blobs: POST50, GET37, pure18; phase80con16seleccionados/64no seleccionados; SDK61con6/55; D04token46con4/42. TAP filtrado emite skipped0: eso NO significa ejecutar los no seleccionados. Carry2de50 deja48no seleccionados; cookie1de50 deja49; control1de31 deja30; afectadas3de31 deja28. El único full Link previo no tiene resumen y jamás se suma como GREEN terminal.

Compatibilidad del reuso: phase-context64039ec709053e2e82faf67ed013399244faee05 y Consent8be698074f5838abfec0d4fd6050d9911c14fd73 permanecen idénticos desde sus primarias relevantes. Los cambios posteriores de fixture son sólo control SYN DATA aislado/default fetch, observación de settlement del primer put nativo, cleanup, restauración de wrappers para retirada ordinaria y captura pasiva del Error original en el catch SYN; ningún guard/return/store/SQL/OAuth/SDK/source de producto se reemplaza. El GET normal y los otros tests nunca activan ese control. No afirmar identidad de blobs del fixture entre runs: el delta se explica y se cualifica específicamente. Full Link final es necesario por timeout/fallos y hook nuevo; no se repiten grupos aprobados por estadísticas.
## Cierre de cualificación escalonada y deuda de baseline

| Fase adicional | HEAD | Run / job | Resultado |
|---|---|---|---|
| Link full terminal |bf6867dab636c5435ab20efb5ec45af83ba3b340|42121776005 /127575702935|31=30P/1F/0skip; resumen terminal386019.189563ms; contención13m NO activada; lintLink sin salida|
| focal exacta del FAIL setup |696611d6b99f8731d28aeb220cddce82fd333752|42123491595 /127581599230|1P/0F/0skip;17051.205426ms; lintfixture sin salida; ningún fail original que loguear|
| qualifier eliminado |fb739b07c26487242d72bbc56ba0b115095bb8fa|tree9efd8240dfbacc65ba8d1821a2cba39bf5b577d9|sólo4paths respectoBASE; .github restaurado byteexactamente|

Comando adicional final:
```sh
timeout --signal=TERM 13m node --test test/mcp-qa-finite-owner-notice-link-native.test.mjs
node --test --test-name-pattern='^native notice link existing or conflicting record cannot win link-existing$' test/mcp-qa-finite-owner-notice-link-native.test.mjs
npx --no-install eslint test/mcp-qa-finite-owner-notice-link-native.test.mjs
npx --no-install eslint test/fixtures/finite-owner-notice-get.mjs
```

El FAIL #10 full ocurrió en prepareNoticeIssued/sdkReadCurrent inicial, antes de authorize/POST/ejecutar la negativa existing. Misma familia que el FAIL setup POST, causa aún desconocida. Root verificó seedPhaseFacts('settled',null): offset0 y Date.now real, sin futuro intencional; no se añadió espera, backdate, clockpatch ni retry. La única focal autorizada añadió logging pasivo en el catch SYN existente del Error original,4frames×240chars, stage/Date.now/deadline/signal sin I/O adicional ni DTO; guard/throw/return y contrato3keys intactos. Pasó y no ocurrió fail para capturar. **No reproducido, no reparación demostrada; deuda explícita de baseline SYN.** No se repitieron los30PASS ni otra suite para buscar un verde.

Cobertura GREEN **escalonada**,162casos únicos: Link31=30full+1focal; POST50=49full+1focal; GET37+pure18+phase16+SDK6+D04token4=81full. **El full Link31 fue FAILED y el fullPOST50 también FAILED. No hay claim de full31/full50 pristine ni de whole-branch CI.** La matriz asigna una primaria por caso; rojos y parcial no se suman como aprobaciones. Final lint4 se compone del lint4 ac4010/0 y los dos archivos posteriormente modificados recalificados individualmente0/0.

| # | Caso Link estático único | Primaria GREEN compatible |
|---:|---|---|
| 1 | native notice link follows actual consent ACK in the same POST child | bf6867 /42121776005/127575702935 full30PASS |
| 2 | native notice link retains global event sequence and foreign history | bf6867 /42121776005/127575702935 full30PASS |
| 3 | native notice link never advances source or public readers and remains factual after deadline | bf6867 /42121776005/127575702935 full30PASS |
| 4 | native notice link requires live originating SQL continuation complete | bf6867 /42121776005/127575702935 full30PASS |
| 5 | native notice link requires live originating SQL continuation cut-after-ack | bf6867 /42121776005/127575702935 full30PASS |
| 6 | native notice link unknown or lost actual result remains closed link-lost-transaction | bf6867 /42121776005/127575702935 full30PASS |
| 7 | native notice link unknown or lost actual result remains closed link-lost-sync | bf6867 /42121776005/127575702935 full30PASS |
| 8 | native notice link unknown or lost actual result remains closed link-lost-readback | bf6867 /42121776005/127575702935 full30PASS |
| 9 | native notice link unknown or lost actual result remains closed link-wrong-readback | bf6867 /42121776005/127575702935 full30PASS |
| 10 | native notice link existing or conflicting record cannot win link-existing | 696611 /42123491595/127581599230 focal1PASS |
| 11 | native notice link existing or conflicting record cannot win link-conflict | bf6867 /42121776005/127575702935 full30PASS |
| 12 | native notice link held native work and cancellation retain scope link-hold-write | bf6867 /42121776005/127575702935 full30PASS |
| 13 | native notice link held native work and cancellation retain scope link-hold-commit | bf6867 /42121776005/127575702935 full30PASS |
| 14 | native notice link held native work and cancellation retain scope link-hold-sync | bf6867 /42121776005/127575702935 full30PASS |
| 15 | native notice link held native work and cancellation retain scope link-hold-readback | bf6867 /42121776005/127575702935 full30PASS |
| 16 | native notice link original child expires without renewal link-before | bf6867 /42121776005/127575702935 full30PASS |
| 17 | native notice link original child expires without renewal link-hold-commit | bf6867 /42121776005/127575702935 full30PASS |
| 18 | native notice link current facts drift at final recheck owner | bf6867 /42121776005/127575702935 full30PASS |
| 19 | native notice link current facts drift at final recheck revision | bf6867 /42121776005/127575702935 full30PASS |
| 20 | native notice link current facts drift at final recheck QA | bf6867 /42121776005/127575702935 full30PASS |
| 21 | native notice link current facts drift at final recheck M | bf6867 /42121776005/127575702935 full30PASS |
| 22 | native notice link current facts drift at final recheck holder | bf6867 /42121776005/127575702935 full30PASS |
| 23 | native notice link current facts drift at final recheck exchange | bf6867 /42121776005/127575702935 full30PASS |
| 24 | native notice link factual mismatch denies valid codec and journal data | bf6867 /42121776005/127575702935 full30PASS |
| 25 | native notice link missing source evidence never becomes authority ack | bf6867 /42121776005/127575702935 full30PASS |
| 26 | native notice link missing source evidence never becomes authority unknown-send | bf6867 /42121776005/127575702935 full30PASS |
| 27 | native notice link missing source evidence never becomes authority no-mutation | bf6867 /42121776005/127575702935 full30PASS |
| 28 | native notice link missing source evidence never becomes authority freeze | bf6867 /42121776005/127575702935 full30PASS |
| 29 | native notice link missing source evidence never becomes authority withdrawal | bf6867 /42121776005/127575702935 full30PASS |
| 30 | native notice link real reduction preserves event and link CLOSE | bf6867 /42121776005/127575702935 full30PASS |
| 31 | native notice link real reduction preserves event and link revokeGrant | bf6867 /42121776005/127575702935 full30PASS |

## Compilaciones realmente usadas y grafo

No se hizo build estándar ni compilación adicional para estadísticas. Compiles del harness:
- RED6, mínimo fallido6, focalGREEN6:3QA+3M por run.
- Full fe18: Link31QA+31M capturados; POST47QA+47M capturados; GET33QA+33M capturados, SDK/D04seleccionados10QA+10M observados en logs. Phase16 usa16harness QA por sus casos ejecutados y único build site protegido, sin bytes/hash por build capturados; pure18 no compila.
- be350: control1QA+1M ycookie1QA+1M. f619:1QA+1M. ac401:4QA+4M. bf686:31QA+31M.696611:1QA+1M.
- Total318metafiles QA/M capturados;20SDK/D04compiles adicionales visibles en logs y16QAphase derivados de16harness ejecutados/callsite, sin inventar métricas por build.354invocaciones de compilador del harness contabilizadas con esa distinción; estándar0. No se atribuye tiempo/CPU exclusivo de esbuild desde duración TAP.

Muestras exactas, cada fila corresponde a su propio artefacto/harness:
| Muestra | Bytes | Inputs | SHA256 output real | SHA256 metafile |
|---|---:|---:|---|---|
| QA RED, POST aceptado |1801609|325|8918af360f96fb8bf112a5f198b610cd2505e3038a82caaff09227a453790a62|4d9be238e8da7428599b70a29fc6f84fde780ef156e671268a99097e9a9e9dc7|
| QA principal full bf686 |1818567|325|8bca1fffefb331d295528a513db1a92663a1ad2d3eb7b89376cccd716c6fc609|52488d9c618ac29d97273df08a497cb2c4ba804bd365db261dfb4a303c0233be|
| QA focal final696611 |1818975|325|64f6274838abcec6b156d46f41a7b1e5181c298e8e2e978d22baeb4375e3ebdc|5dd7f8db1ac07dcc3dc760ad8811dd33fae5bb37292197c25ce2bd797be58800|
| M, todas esas muestras |1686818|303|f3e3a5b9104aecce8184a97edc16cf6709e5941c1faad423b06c0663924e9340|0f1e927b66951ce5a82293e717f69f0417e2336932c1653f6d80dacb4cebb551|

QA final+17366bytes vs RED; bytes incluyen instrumentación/fixtures SYN, no tamaño de entrypoint estándar publicado. QAoutputhash cambia entre harness por valores SYN; no se mezclaron artefactos de casos distintos. M es byteexacto.

Se leyeron los ZIP reales en memoria, sin archivos locales: RED6metafiles, parcial62, fullbf68662 y focalfinal2. Diff final RED→696611: QA325inputs,0paths nuevos/retirados; edges1802→1803, único cambio de multiplicidad stdin→lib/mcp-qa-finite-preparation-records.mjs1→2, sin nueva adyacencia única. M303inputs/886edges/bytes/hash/metafile íntegramente idéntico. Sólo cambian dos inputhashQA:
- lib/mcp-qa-finite-owner-phase-context.mjs: e336ab93782508d88146c310d3c9d06d8883f3ffdf5744ec80e1e6d8c7946dd1 →13053a6166fffca66754b17b7097831ce98c3e72b3190fa2238fb0bfb2239fe9; metafilebytes103662→111574.
- stdin virtual: ea1c0749410f515743d800137a5038c0cb815989f22c14a8ac5a64256878935b →43cb5121904a629ff6d83b61c70af1e2d649b2b94c976b0d88d3823014fd427a;78333→85491bytes.

Límite de instrumentación: los SHA input con hashKind=file-bytes son procedencia del archivo original readFile; metafile.bytes refleja el texto transformado onLoad del fixture. No se confunde ese SHA con un hash del texto instrumentado. stdin hashKind=actual-compile-option-text sí corresponde al texto real entregado al compiler. SHA del output y metafile corresponden al build efectivamente utilizado. No reconstrucción para completar un dato no capturado.

## I/O, tiempos y retención

Principal completo bf686, medido ANTES de inspecciones y DESPUÉS de baseline de3eventos/3grants/7DDL:
-7pares completos/14snapshots,6rechecks,2AccessRS256; presencia null/ausente inventario+anchor en primeros12snapshots y Link/raw presente en últimos2, comparados explícitamente.
-118first-primary sessions,136SQL=74first+62all. Contra POST aceptado102sessions/120SQL=64first+56all: delta16sessions/16SQL por el par adicional; ningún SELECT nuevo por snapshot para Link. Sólo se usa la fila SQL original por UUID.
-DOget1067/list126/sync3/transaction31/txGet117/txList2/txPut3; noticeLists14/cap7. puttransaction+sync+readback reales; readLink adicional por cada snapshot, también cuando null.
-HTTP98requests/14snapshots,fanoutpeak2,active0. child1007ms/window4999ms; parent1544ms, dentro de originales5s/30s. No capacidad futura garantizada por ese sobrante.
-Focal ac401 midió1839parent/934child/4999window y mismos conteos físicos. Primer focal7d3041471/901/5000 tenía121sessions/74first65all+DOlist129 porque incluía inspecciones; no se presenta como costo puro de POST.
-Primer fullLink parcial midió920ms parent/118sessions/74first62all/DOlist127: incluía1snapshot de baseline en la captura. La captura final se movió antes de configurar observación y antes de inspecciones: list126.

Retención/fallos: native transaction original tuvo observación fulfillment/rejection separada, sin sustituirla. Unknown commit puede conservar Link, evento y ACKdurables con503; no se lee para convertir uncertain/existing en recorded. El test nativo comprobó que no se sigue a sync/readback en incertidumbre de put. Sync/readback perdido o bytes incorrectos conservan historia y nunca200; replay0nuevoSEND/SQL/Link. La memoria SQL original permanece hasta la última revalidación, separada de cada Promise Link/ACK/sync/read. Failed/firstFailure absorbe abort/expiry; no late200. En held-commit la escritura ya está realmente asentada y se retiene su recepción/continuación, no se etiqueta como escritura físicamente pendiente. Holds de ACK/sync/readback y probe de scope prueban lifecycle local SYN; no drenaje físico distribuido ni atomicidad D1+DO+control plane.

## Árbol y protección

codeHEAD=fb739b07c26487242d72bbc56ba0b115095bb8fa; codeTree=9efd8240dfbacc65ba8d1821a2cba39bf5b577d9. ReportHEAD/reportTree/blob se identifican con API del commit que contiene este informe y readback final, entregados en el handoff Root; no se inventa un hash autorreferente dentro de su propio blob.

| Path código/test | Blob final | + / - |
|---|---|---|
| lib/mcp-qa-finite-owner-phase-context.mjs | 64039ec709053e2e82faf67ed013399244faee05 | 49/10 |
| test/fixtures/finite-owner-notice-get.mjs | 3d279975e67611e72e2d1661970718ad4a3892bf | 166/8 |
| test/mcp-qa-finite-owner-notice-consent-native.test.mjs | 8be698074f5838abfec0d4fd6050d9911c14fd73 | 4/4 |
| test/mcp-qa-finite-owner-notice-link-native.test.mjs | 7a2ce841f86a7fed5b59e268a2d43d5c210826e9 | 168/0 |

Comparación API completa BASE→codeHEAD tiene exactamente esos4paths; el qualifier temporal fue eliminado y .github volvió a su treeBASE. Todos los blobs raíz (package/lock/config/Wrangler incluidos) iguales. Lib495entries:494intactos, sólo phase-context cambió; fixtures96entries:95intactos, sólo finite-owner-notice-get cambió. Ningún rename, dependencia, world mode, Worker, binding, flag o workflow final nuevo. Los dos extras documentales finales son reporte y ledger autorizados por Root; no se copió la rama Rootdocs ni se cambió BASE.

Blobs protegidos BASE=codeHEAD verificados por árboles:
| Path | SHA Git blob |
|---|---|
| lib/cloudflare-access-identity.mjs | 5f1fb5c2eb843252e1d5207f09fbb75467150021 |
| lib/dossier-monitoring-authority.mjs | 703b9d3cbb04bc5effff3f4ef8276cdb4cb95803 |
| lib/mcp-qa-finite-bootstrap-source.mjs | 66aef02dab28ff9e94957f04dfe50b407f2a5e0c |
| lib/mcp-qa-finite-initial-entry.mjs | c5ae0f53bee077c693d7f0a0599bbb6347648fee |
| lib/mcp-qa-finite-owner-native-wire.mjs | 42aa81f82b60bcc66a140f1358784108696f41e5 |
| lib/mcp-qa-finite-owner-oauth-forward.mjs | f7979579fcb6d00b3d5d68c7790089c803f4170f |
| lib/mcp-qa-finite-owner-oauth-qa.mjs | ec5c16161bffc6e6d19de153b4465bf6ae748493 |
| lib/mcp-qa-finite-owner-oauth-wire.mjs | fc113a05e7f6d1ef72cd045a55c5934b357aa724 |
| lib/mcp-qa-finite-owner-preparation.mjs | 01ec291de2631a7cd7e527e2a567f44ac6067522 |
| lib/mcp-qa-finite-preparation-issuer-journal.mjs | 414450aa08f797bed5a41cf5cc697342785ce16b |
| lib/mcp-qa-finite-preparation-issuer-records.mjs | 50f9a013580a46ad1d445a240f47b7b2ce887d49 |
| lib/mcp-qa-finite-preparation-issuer-store.mjs | efc25b2af9c80b8eb27cffe219544e974002293e |
| lib/mcp-qa-finite-preparation-store.mjs | 122bc0e52870c71da7ae98ef73cd7762171d89ca |
| lib/mcp-qa-finite-preparation-records.mjs | e9b66f68b6dbabbfecc46072949a0d5d9f059141 |
| lib/mcp-qa-finite-preparation-enrollment-facts.mjs | b5b6d6a8f55376d61da6f8bc4809a986dfe0aca7 |
| lib/mcp-qa-finite-owner-stage-facts.mjs | c2821f1b5806a1f8cc968425ba748d0e26f18a0b |
| lib/mcp-qa-finite-preparation-notice-journal.mjs | b9c15aba18e2442a0ed864b8afd5e86313c5e470 |
| lib/mcp-qa-finite-preparation-notice-records.mjs | 8c9386b27109cd056d3f70d91ab3cb6c6f40b4e9 |
| lib/mcp-qa-finite-stage-work.mjs | a89baeb2578856dadedf700f9d66e180eb09120e |
| lib/mcp-qa-finite-initial-lease.mjs | a9cc083baae71c89af2f6436c00571dc8e7a20c9 |
| lib/mcp-qa-finite-owner-notice-consent-body.mjs | 2a1e89ffcfe56a607c704129a3af6a83e8bc9b81 |
| lib/mcp-qa-finite-owner-notice-get-wire.mjs | da8c3f8ac66699fd207989058f4a1425b0ee36c0 |
| lib/mcp-qa-finite-owner-notice-get-qa.mjs | f63e820a886af5b73a6a7b8b8ea22bc8d12b0106 |
| lib/mcp-qa-finite-owner-notice-get-forward.mjs | ea910f0fcdeade5a794ddaa60898706924e72f80 |
| test/fixtures/finite-initial-entry-world.mjs | bfb918ebe15edc654de0e57d5aecf83757129b07 |
| test/fixtures/finite-owner-qa-sdk.mjs | 62fde9dcefb78bf57585a184901cb3c4d79c4c4d |
| test/fixtures/finite-owner-phase-context.mjs | f1ddbfff29b1d5e4da4dbf70c649e0df20582b46 |
| test/fixtures/finite-owner-io-fanout.mjs | e181bfd7634b6f71e4129b03fbb529a2f1b04f10 |
| package.json | f4fd38ac380c46a149d8cf0f3bd828a28406f761 |
| package-lock.json | 36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b |

## Artefactos y advertencias

Todos retention7d y SYN, sin credenciales/cuerpos/keys en consola ni nueva custodia. Los ZIP contienen TAP, metadatos/metafiles/inputs/hash e I/O saneado. URLs y digest de API originales:
| Run | Artefacto | ID | SHA256 ZIP | Expires |
|---|---|---:|---|---|
| 42114322347 | afw-notice-link-red | [13453534727](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42114322347/artifacts/13453534727) | caee60fee1e65247de7b8ec90917123f731ae6ea45b5d3c972488eaa9c666988 | 2026-11-12T21:38:40Z |
| 42115157508 | afw-notice-link-principal | [13455388683](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42115157508/artifacts/13455388683) | 73d96cd9a601f4062424da81f0b0bed5276d2be138e42af3f14a3fd888273b71 | 2026-11-12T21:43:40Z |
| 42115360441 | afw-notice-link-principal | [13455861437](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42115360441/artifacts/13455861437) | c128c26dc76867057ba0222979dbbbbd51088c6c24678b0fa8f8f5d886060a5a | 2026-11-12T21:45:46Z |
| 42115921441 | afw-notice-link-get-and-regressions | [13457061618](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42115921441/artifacts/13457061618) | c1bfbdc4c0237017e4de6cf284dc51fc09500a440ae36a1aa5c271c33916a8bb | 2026-11-12T21:55:03Z |
| 42115921441 | afw-notice-link-link-native | [13456723052](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42115921441/artifacts/13456723052) | ef29c5d63f09bc66107e7527531904a8f9f3e0a56c281f1e25fb2c0c3d785c82 | 2026-11-12T22:03:25Z |
| 42115921441 | afw-notice-link-post-native | [13455977825](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42115921441/artifacts/13455977825) | d81f083f6a89cc6a90bcd68a1c7bb7292e78ef6748d3edf9f166a0d129406e16 | 2026-11-12T21:59:59Z |
| 42120340776 | afw-notice-link-control-and-fixes | [13459265073](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42120340776/artifacts/13459265073) | 754da458c17ec5c2eb00a8bc24dd6ebe823ca855d18ebb899db3dc05ca0d97cb | 2026-11-12T22:19:04Z |
| 42120340776 | afw-notice-link-cookie-diagnostic | [13456274999](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42120340776/artifacts/13456274999) | 9f7a60d440f52facaa3e3550dde2afe7c95bbd172ed814a3b403862a8e52ad54 | 2026-11-12T22:19:04Z |
| 42120773920 | afw-notice-link-tx-probe-diagnostic | [13458855571](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42120773920/artifacts/13458855571) | ad5b6df596903c8132a3079cdeb4ed6ee4063bc7a990b02ff27ac070e77f1cb1 | 2026-11-12T22:22:00Z |
| 42121383907 | afw-notice-link-native-control-and-affected | [13460200316](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42121383907/artifacts/13460200316) | 6e1e0938bc29b52e54f4fb6dfa03f2905b30d46f3ec491d2a9a24e4a2b762b1f | 2026-11-12T22:27:22Z |
| 42121776005 | afw-notice-link-final | [13460295064](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42121776005/artifacts/13460295064) | a3255a4d8f78d8afb421674d3ad0ba18af2edbcfdb426dcd9facb708a2af809c | 2026-11-12T22:35:11Z |
| 42123491595 | afw-notice-link-existing-baseline-diagnostic | [13459497584](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42123491595/artifacts/13459497584) | 0ee9b5fff717b0dec419af706e547bc080ccae56e68aa939fb1516d44c4837d2 | 2026-11-12T22:41:21Z |

Warnings conservados: npm esbuild-kit esm-loader/core-utils deprecated; ESLint9.39.4 unsupported; Actions punycodeDEP0040/url.parseDEP0169 y accionesv4 Node20forzadasNode24; SDKCIMD deshabilitado enQA; RPCstub no disposed del harness. be350 agregó1warning ESLint de expresión, corregido y recalificado; no se describe como clean. Warnings del toolchain/harness quedan para review final, sin upgrades. La deuda de baseline sdkReadCurrent inicial intermitente sigue explícita:2FAIL observados en casos distintos, focales no reproducidos, ninguna causa atribuida sin evidencia.

## Auto-revisión y límites

Se revisó íntegramente el diff de4paths y se verificaron árboles/blobs después de las últimas primarias. Los positivos nacen del GET/POST/SQL/ACK nativos, incluido QAcode→Mtoken→MCP real y grant.exchanged_at actual. Se preservan3eventos ajenos,3grants totales(2ajenos+original) y7DDL(4históricos+3aditivos) byteexactamente. Factual mismatch cubre7campos con codec+journal reales válidos, correlador ENTER sin EXIT y baseline INSERT1sin nuevoSQL; no se atribuye aislamiento a las viejas corrupciones que fallan antes del correlador.

No es transacción global entre D1, DO y control plane: drift observado en último par deniega con historia conservada; un cambio después de una lectura no se convierte en permiso permanente. Access externo revocable instantáneo no se acredita sólo por firma/exp; revocación real de grant sí deniega autorización ordinaria conservando historia. CLOSE sólo no revoca grant.

Source task implementada y remitida a fresh review Root; no autorizarse a sí misma ni cerrar Minor por auto-revisión. operationalReadiness=false; completePackage=false; PCoff=false. C0=I0+900000,C1=C0+180000; fuente3nov02:59Z vencida. Sin runtime/provider/custodia/alias/Entry/DDLreal/OAuthreal/OTP/permisos/cron/Containers/Max/main/merge/mount/ARM, segunda publicación ni thirdCLOSED. No siguientes unidades. Los fixtures auténticos operan exclusivamente dentro de SYN hosted y no acreditan persona real, guardia, hosting operativo ni PCoff.

## Diff completo actual BASE→codeHEAD (cuatro paths)

El qualifier no tiene delta final. Los siguientes patches provienen del compare API exacto, sin truncación, para revisión reproducible:

### lib/mcp-qa-finite-owner-phase-context.mjs

```diff
@@ -143,7 +143,7 @@ async function observeOwnerPhasePair(options){
     if(bytes!==backup.moduleBytes||sha(Buffer.concat(chunks,bytes))!==backup.moduleHash)fail();
     const prefix='connection-preparation:'+capsule.preconnectionId+':',inventory=await rows(prefix,17),effects=await rows('afw.finite-policy-effect.v1:',33),enrollment=await rows('afw.finite-preparation-cleanup.v1:',3);
     if(inventory.size>16||effects.size>32||enrollment.size>2)fail();
-    for(const k of inventory.keys())if(!['record','source','connection:approval','grant','connection'].some(s=>k===prefix+s))fail();
+    for(const k of inventory.keys())if(!['record','source','connection:approval','grant','connection','notice'].some(s=>k===prefix+s))fail();
     for(const k of enrollment.keys())if(!['enrollment','ack'].some(s=>k==='afw.finite-preparation-cleanup.v1:'+s))fail();
     const issuer=await child(l=>createFinitePreparationIssuerJournal({ctx,env}).read({preconnectionId:capsule.preconnectionId},l));
     const sdk=await child(l=>sdkJournal({ctx,env}).read({preconnectionId:capsule.preconnectionId},l));
@@ -362,6 +362,8 @@ async function observeOwnerPhasePair(options){
     }
     if(receipt?(actual.pointer.versionId!==receipt.versionId||actual.pointer.deploymentId!==receipt.deploymentId):(actual.pointer.versionId!==capsule.activatedVersionId||actual.pointer.deploymentId!==capsule.activatedDeploymentId))fail();
     if(f.sdk.root){const r=f.sdk.root;if(!receipt||!enrollment||!ack||r.preconnectionId!==id||r.capsuleHash!==capsule.capsuleHash||r.enrollmentHash!==enrollment.recordHash||r.originalConnectionReceiptHash!==receipt.receiptHash||r.sourceRevision!==capsule.sourceRevision||r.actorId!==actorId||r.qaVersionId!==qaVersionId||r.mVersionId!==receipt.versionId||r.I0!==capsule.I0||r.C0!==capsule.C0||r.C1!==capsule.C1||r.createdAt>Date.now())fail();for(const v of Object.values(f.sdk.operations))if(v.observed?.observedAt>Date.now())fail();}
+    data.noticeLink=await getRecord('readLink',{kind:'notice',preconnectionId:id},false);
+    if(data.noticeLink?(f.inventory.get(prefix+'notice')!==prepEncode('NoticeLink',data.noticeLink)):f.inventory.has(prefix+'notice'))fail();
     const issuerFacts=await issuerPrimary(f,data,enrollment,ack,receipt,getRecord);
     if(f.sdk.root){
      const b=f.sdk.operations.sdk_begin,a=f.sdk.operations.sdk_approve,c=f.sdk.operations.sdk_complete,i=f.issuer.reservation?.identity,g=f.sdk.grant;
@@ -371,13 +373,14 @@ async function observeOwnerPhasePair(options){
      if(issuerFacts.grant&&g&&(canonical(JSON.parse(issuerFacts.grant.scopes_json))!==canonical(g.scopes)||issuerFacts.grant.created_at!==g.createdAt||issuerFacts.grant.expires_at!==g.expiresAt))fail();
     }
     const noticeFacts=await noticePrimary(f,data,issuerFacts);
+    qualifyNoticeLink(f,data,issuerFacts,noticeFacts);
     return {receipt,data,enrollment,ack,issuerFacts,noticeFacts};
    };
    const qualified=await qualify(first,observed),again=await primary(),second=await facts(),secondQualified=await qualify(second,again);
    const snapshot=(f,physical,q)=>({
     sourceBase:source,preconnectionId:capsule.preconnectionId,capsuleHash:capsule.capsuleHash,
     anchor:JSON.parse(f.anchor),physical,
-    preparation:Object.fromEntries(['sourceSnapshot','ticket','ticketUse','projectRef','preconnection','stageApproval','approval'].map(k=>[k,q.data[k]??null])),
+    preparation:Object.fromEntries(['sourceSnapshot','ticket','ticketUse','projectRef','preconnection','stageApproval','approval','noticeLink'].map(k=>[k,q.data[k]??null])),
     records:{inventory:[...f.inventory],effects:[...f.effects],enrollment:[...f.enrollment],issuer:f.issuer,sdk:f.sdk.entries,notice:f.notice},
     installed:{receipt:q.receipt,enrollment:q.enrollment,ack:q.ack},
     noticeRows:q.noticeFacts,
@@ -392,6 +395,18 @@ async function observeOwnerPhasePair(options){
 }
 
 
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
 function qualifyNoticeConsentEvent(row,i,t,send){
  fields(row,['sequence','grant_id','project_id','user_id','client_id','resource','revision','action','purpose','request_id','issued_at','expires_at']);
  if(!Number.isSafeInteger(row.sequence)||row.sequence<=0||!Number.isSafeInteger(row.issued_at)||row.issued_at<Math.max(send.window.startedAt,t.issuedAt,send.issuedAt)||row.issued_at>=Math.min(send.window.deadline,t.permissionExpiresAt)||row.issued_at>Date.now())fail();
@@ -401,7 +416,7 @@ function qualifyNoticeConsentEvent(row,i,t,send){
 function qualifyNoticeConsentBaseline(pair){
  for(const s of [pair.first,pair.second]){
   const n=s.records.notice,issuer=s.records.issuer,rows=s.issuerRows;
-  if(!s.installed.receipt||!s.noticeRows.schema||!n.reservation||n.freeze||n.operations.ticket.ack?.outcome!=='applied'||!n.operations.ticket.send||n.operations.consent.send||n.operations.consent.ack||s.noticeRows.tickets.length!==1||s.noticeRows.events.length)fail();
+  if(s.preparation.noticeLink||!s.installed.receipt||!s.noticeRows.schema||!n.reservation||n.freeze||n.operations.ticket.ack?.outcome!=='applied'||!n.operations.ticket.send||n.operations.consent.send||n.operations.consent.ack||s.noticeRows.tickets.length!==1||s.noticeRows.events.length)fail();
   if(!issuer.reservation||issuer.operations.grant.ack?.outcome!=='applied'||!rows.grant||!rows.authorization||!rows.grantLink||!rows.relation||!rows.connection)fail();
   for(const v of Object.values(issuer.operations))if(v.send&&!v.ack||v.ack&&!v.send)fail();
   const names=new Set(s.records.sdk.map(([key])=>key)),prefix='afw.finite-owner-issuer-provenance.v1:'+s.preconnectionId+':';
@@ -415,7 +430,7 @@ function qualifyNoticeConsentBaseline(pair){
 function expectedNoticeTicket(i,t){return {handle_hash:t.handleHash,request_id:t.requestId,user_id:i.subject,grant_id:i.grantId,project_id:i.projectId,client_id:i.clientId,resource:i.resource,purpose:'afw.dossier-monitoring-owner.v1',action:'grant',revision:i.projectRevision,expected_sequence:t.expectedSequence,issued_at:t.issuedAt,expires_at:t.expiresAt,permission_expires_at:t.permissionExpiresAt};}
 function requireEmptyNotice(s){
  const n=s.records.notice;
- if(n.reservation||n.freeze||Object.values(n.operations).some(v=>v.send||v.ack)||s.noticeRows.tickets.length||s.noticeRows.events.length)fail();
+ if(s.preparation.noticeLink||n.reservation||n.freeze||Object.values(n.operations).some(v=>v.send||v.ack)||s.noticeRows.tickets.length||s.noticeRows.events.length)fail();
 }
 function freezeOwnerPhaseData(value){
  if(value&&typeof value==='object'){for(const v of Object.values(value))freezeOwnerPhaseData(v);Object.freeze(value);}return value;
@@ -797,26 +812,33 @@ export async function handlePrivateQaFiniteOwnerNoticeConsent({request,env,ctx},
    if(ticket.expiresAt>accessExpiresAt)fail();
    const permissionCeiling=Math.min(accessExpiresAt,reservation.preconnectionExpiresAt,prep.approval.expiresAt,rows.connection.expiresAt,i.C0,Date.parse(i.consentExpiresAt),Date.parse(rows.grant.expires_at),ticket.permissionExpiresAt);
    clock.narrow(permissionCeiling);
-   const journal=noticeJournal({ctx,env}),store=createFinitePreparationIssuerStore({ctx,env});
-   let position='baseline',witness=null,ownSend=null,actualSqlPromise=null,actualSqlResult=null,sqlSettled=false;
+   const journal=noticeJournal({ctx,env}),store=createFinitePreparationIssuerStore({ctx,env}),preparationStore=createFiniteOwnerPreparationStore({storage:issuerCapture.storage,now:Date.now});
+   let position='baseline',witness=null,ownSend=null,ownAck=null,actualSqlPromise=null,actualSqlResult=null,sqlSettled=false;
+   let ownedNoticeLink=null,linkPromise=null,linkResult=null,linkSyncPromise=null,linkReadPromise=null,linkReadResult=null,linkSynced=false,linkSettled=false;
    const anchor=()=>{expected.anchor.notice=structuredClone(expected.records.notice);};
    async function recheckConsentOwned(){
     check();
-    if(actualSqlPromise&&!sqlSettled)fail();
+    if(!['baseline','ticket-observed','consent-send-recorded','consent-sql-resolved','consent-ack-recorded','notice-link-recorded'].includes(position)||actualSqlPromise&&!sqlSettled)fail();
     for(const v of Object.values(expected.records.issuer.operations))if(v.send&&!v.ack||v.ack&&!v.send)fail();
     const names=new Set(expected.records.sdk.map(([key])=>key));
     for(const [key]of expected.records.sdk)if(key.endsWith(':send')&&!names.has(key.slice(0,-4)+'observed'))fail();
     const n=expected.records.notice;
     if(n.freeze||canonical(n.reservation)!==canonical(reservation)||n.operations.ticket.ack?.outcome!=='applied')fail();
     if(position==='baseline'||position==='ticket-observed'){
-     if(ownSend||actualSqlPromise||n.operations.consent.send||n.operations.consent.ack||expected.noticeRows.events.length)fail();
+     if(ownSend||ownAck||actualSqlPromise||n.operations.consent.send||n.operations.consent.ack||expected.noticeRows.events.length||expected.preparation.noticeLink)fail();
     }else{
      if(!witness||!ownSend||canonical(n.operations.consent.send)!==canonical(ownSend))fail();
      if(position==='consent-send-recorded'&&(actualSqlPromise||expected.noticeRows.events.length||n.operations.consent.ack))fail();
-     if(['consent-sql-resolved','consent-ack-recorded'].includes(position)){
+     if(['consent-sql-resolved','consent-ack-recorded','notice-link-recorded'].includes(position)){
       if(!actualSqlPromise||!sqlSettled||actualSqlResult?.status!=='applied'||canonical(expected.noticeRows.events)!==canonical([actualSqlResult.row]))fail();
       qualifyNoticeConsentEvent(actualSqlResult.row,i,ticket,ownSend);
      }
+     if(['consent-ack-recorded','notice-link-recorded'].includes(position)){
+      if(!ownAck||ownAck.sendHash!==ownSend.recordHash||ownAck.rowHash!==digest('afw.finite-preparation-notice-row.v1',actualSqlResult.row)||ownAck.sequence!==actualSqlResult.row.sequence||canonical(ownAck)!==canonical(n.operations.consent.ack))fail();
+     }else if(ownAck||n.operations.consent.ack)fail();
+     if(position==='notice-link-recorded'){
+      if(!ownedNoticeLink||!linkPromise||linkResult?.status!=='recorded'||linkResult.recordHash!==prepHash('NoticeLink',ownedNoticeLink)||!linkSyncPromise||!linkSynced||!linkReadPromise||linkReadResult?.status!=='observed'||!linkSettled||prepEncode('NoticeLink',linkReadResult.record)!==prepEncode('NoticeLink',ownedNoticeLink)||canonical(expected.preparation.noticeLink)!==canonical(ownedNoticeLink))fail();
+     }else if(expected.preparation.noticeLink||ownedNoticeLink||linkPromise)fail();
     }
     const pair=await wait(observeOwnerPhasePair({ctx,env,parent:originalLease,preconnectionId:id}));
     if(canonical(pair.first)!==canonical(expected)||canonical(pair.second)!==canonical(expected))fail();
@@ -846,7 +868,24 @@ export async function handlePrivateQaFiniteOwnerNoticeConsent({request,env,ctx},
     const ack=noticeSeal('Ack',{purpose:'afw.finite-preparation-notice-ack.v1',sendHash:ownSend.recordHash,outcome:'applied',rowHash:digest('afw.finite-preparation-notice-row.v1',actualSqlResult.row),sequence:actualSqlResult.row.sequence,observedAt:Date.now()});
     const appendAckPromise=retain(journal.appendAck({preconnectionId:id,operation:'consent',record:ack},l)),appendAckResult=await wait(appendAckPromise);
     if(appendAckResult?.status!=='recorded'||appendAckResult.recordHash!==ack.recordHash)fail();
-    expected.records.notice.operations.consent.ack=structuredClone(ack);anchor();position='consent-ack-recorded';await recheckConsentOwned();activeChild=null;
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
    })()));
    check();
    const html='<!doctype html><html lang="es"><meta charset="utf-8"><title>Decisión temporal</title><body><h1>Registré tu decisión temporal.</h1><p>Esto no confirma que exista una suscripción ni que el asistente haya revisado el expediente.</p><p>El permiso vence: '+new Date(ticket.permissionExpiresAt).toISOString()+'</p><a href="https://agentfriendlyweb.dev/expediente">Volver al expediente</a></body></html>';
```

### test/fixtures/finite-owner-notice-get.mjs

```diff
@@ -1,3 +1,5 @@
+import assert from 'node:assert/strict';
+import {Client,StreamableHTTPClientTransport} from '@modelcontextprotocol/client';
 import {createHash} from 'node:crypto';
 import {mkdir,writeFile,readFile} from 'node:fs/promises';
 import {join} from 'node:path';
@@ -22,6 +24,45 @@ export function extendFiniteOwnerNoticeGet(entry){
  const methods=String.raw`
 
 
+ async noticeLinkCorrupt(kind){
+  // SYN negative DATA only, starting from an actual producer Link.
+  const all=[...await this.ctx.storage.list()],entry=all.find(([key])=>key.startsWith('connection-preparation:')&&key.endsWith(':notice'));
+  if(!entry)throw Error('SYN real Link required');
+  const link=noticePrepDecode('NoticeLink',entry[1]),prefix='afw.finite-preparation-notice.v1:'+link.preconnectionId+':';
+  const ack=JSON.parse(await this.ctx.storage.get(prefix+'consent:ack')),send=JSON.parse(await this.ctx.storage.get(prefix+'consent:send'));
+  const changed={...link};
+  if(['eventHash','grantHash','preconnectionId'].includes(kind))changed[kind]=link[kind]==='f'.repeat(64)?'e'.repeat(64):'f'.repeat(64);
+  else if(kind==='sequence')changed.sequence++;
+  else if(kind==='future')changed.acceptedAt=Date.now()+60000;
+  else if(kind==='before-ack')changed.acceptedAt=ack.observedAt-1;
+  else if(kind==='after-deadline')changed.acceptedAt=send.window.deadline;
+  else throw Error('SYN unknown Link corruption');
+  if(kind==='after-deadline')await new Promise(resolve=>setTimeout(resolve,Math.max(0,send.window.deadline-Date.now()+25)));
+  const raw=noticePrepEncode('NoticeLink',changed);await this.ctx.storage.put(entry[0],raw);await this.ctx.storage.sync();
+  const root=createFiniteOwnerRequestLease(new Request('https://delegated-canary.agentfriendlyweb.dev/fixture/notice-link-negative'));
+  let journalValid=false;try{await noticeRealJournal({ctx:this.ctx,env:this.env}).read({preconnectionId:link.preconnectionId},root.lease);journalValid=true;}finally{root.finish();}
+  this.noticeState.trace=[];
+  return {original:entry,codecRoundtrip:noticePrepEncode('NoticeLink',noticePrepDecode('NoticeLink',raw))===raw,journalValid};
+ }
+ async noticeLinkRestore(entry){await this.ctx.storage.put(entry[0],entry[1]);await this.ctx.storage.sync();this.noticeState.trace=[];}
+ async noticeLinkMissing(kind){
+  const all=[...await this.ctx.storage.list()],entry=all.find(([key])=>key.startsWith('connection-preparation:')&&key.endsWith(':notice')),link=noticePrepDecode('NoticeLink',entry[1]),prefix='afw.finite-preparation-notice.v1:'+link.preconnectionId+':';
+  if(kind==='ack')await this.ctx.storage.delete(prefix+'consent:ack');
+  else if(kind==='unknown-send')await this.ctx.storage.put(prefix+'consent:send','SYN NEGATIVE unknown SEND');
+  else if(kind==='no-mutation'){
+   const ack=JSON.parse(await this.ctx.storage.get(prefix+'consent:ack'));
+   await this.ctx.storage.put(prefix+'consent:ack',noticeEncode('Ack',noticeSeal('Ack',{...ack,outcome:'no_mutation',rowHash:null,sequence:null})));
+  }else throw Error('SYN unknown missing source kind');
+  await this.ctx.storage.sync();this.noticeState.trace=[];
+ }
+ async noticeLinkControlRead(){const c=globalThis.__noticeLinkData;return {visible:!!c,marker:c?.marker??null};}
+ async noticeLinkWriteGate(deadline){
+  const c=globalThis.__noticeLinkData;
+  if(!c||!Number.isSafeInteger(deadline)||Date.now()>=deadline||c.held!==null)throw Error('SYN Link DATA control unavailable');
+  c.held='link-write';c.entered++;c.deadline=deadline;
+  try{while(!c.released){if(Date.now()>=deadline){c.expired=true;throw Error('SYN Link original child deadline reached');}await new Promise(resolve=>setTimeout(resolve,Math.min(10,Math.max(1,deadline-Date.now()))));}}
+  finally{c.held=null;c.settled++;}
+ }
  async noticeCorrelated(kind){
   // SYN negative DATA reseal only; original issuer/source/SQL facts never change.
   const all=[...await this.ctx.storage.list()],original=all.find(([k])=>k.startsWith('afw.finite-preparation-notice.v1:')&&k.endsWith(':reservation'));
@@ -68,6 +109,8 @@ export function extendFiniteOwnerNoticeGet(entry){
 
 
  async noticeOrdinaryWithdraw(){
+  // Restore observational wrappers so the ordinary native store retains its run method.
+  this.noticeRestore?.();
   const all=[...await this.ctx.storage.list()],r=JSON.parse(all.find(([k])=>k.startsWith('afw.finite-preparation-notice.v1:')&&k.endsWith(':reservation'))[1]),i=r.identity;
   const event=await this.env.RELEASE_DB.prepare('SELECT sequence FROM dossier_monitoring_consent_events WHERE grant_id=? ORDER BY sequence DESC LIMIT 1').bind(i.grantId).first();
   return noticeOrdinaryRecord({db:this.env.RELEASE_DB,subject:i.subject,grantId:i.grantId,projectId:i.projectId,expectedClientId:i.clientId,expectedResource:i.resource,expectedRevision:i.projectRevision,expectedSequence:event.sequence,action:'revoke',requestId:'22222222-2222-4222-8222-222222222222',now:Date.now()});
@@ -85,12 +128,40 @@ export function extendFiniteOwnerNoticeGet(entry){
   this.noticeRestore?.();globalThis.__noticeOwner=this;this.noticeMode=mode;this.noticeHeld=null;this.noticeRelease=null;
   const state=globalThis.__noticeState={trace:[],sql:[],ops:{get:0,list:0,sync:0,transaction:0,txGet:0,txList:0,txPut:0},lists:[],resolution:null};this.noticeState=state;
   const db=this.env.RELEASE_DB,sessionMethod=db.withSession,storage=this.ctx.storage,originals={get:storage.get,list:storage.list,sync:storage.sync,transaction:storage.transaction};
-  for(const kind of ['get','list','sync'])storage[kind]=(...args)=>{state.ops[kind]++;if(kind==='list')state.lists.push({prefix:String(args[0]?.prefix??''),limit:args[0]?.limit??null});return Reflect.apply(originals[kind],storage,args);};
-  storage.transaction=callback=>{state.ops.transaction++;return Reflect.apply(originals.transaction,storage,[async tx=>{
-   const actual={get:tx.get,list:tx.list,put:tx.put};
-   const wrapped={};for(const [name,method]of Object.entries(actual))wrapped[name]=(...args)=>{state.ops[{get:'txGet',list:'txList',put:'txPut'}[name]]++;return Reflect.apply(method,tx,args);};
-   return callback(wrapped);
-  }]);};
+  this.noticeLinkPhase=null;this.noticeLinkReleased=false;this.noticeLinkTransactionObserved=false;
+  for(const kind of ['get','list','sync'])storage[kind]=async(...args)=>{
+   state.ops[kind]++;if(kind==='list')state.lists.push({prefix:String(args[0]?.prefix??''),limit:args[0]?.limit??null});
+   const stage=this.noticeLinkPhase,actual=Reflect.apply(originals[kind],storage,args),value=await actual;
+   if(stage==='sync'&&kind==='sync'){
+    if(this.noticeMode==='link-hold-sync')await this.noticeLinkGate('link-sync');
+    if(this.noticeMode==='link-lost-sync')throw Error('SYN NEGATIVE actual Link sync result lost');
+   }
+   if(stage==='readback'&&kind==='get'&&String(args[0]).endsWith(':notice')){
+    if(this.noticeMode==='link-hold-readback')await this.noticeLinkGate('link-readback');
+    if(this.noticeMode==='link-lost-readback')throw Error('SYN NEGATIVE actual Link readback result lost');
+    if(this.noticeMode==='link-wrong-readback'){const data=JSON.parse(value);return noticePrepEncode('NoticeLink',{...data,eventHash:data.eventHash==='f'.repeat(64)?'e'.repeat(64):'f'.repeat(64)});}
+   }
+   return value;
+  };
+  storage.transaction=async callback=>{
+   const stage=this.noticeLinkPhase;state.ops.transaction++;
+   const actual=Reflect.apply(originals.transaction,storage,[async tx=>{
+    const methods={get:tx.get,list:tx.list,put:tx.put},wrapped={};
+    for(const [name,method]of Object.entries(methods))wrapped[name]=(...args)=>{state.ops[{get:'txGet',list:'txList',put:'txPut'}[name]]++;return Reflect.apply(method,tx,args);};
+    const result=await callback(wrapped);if(stage==='write'&&this.noticeMode==='link-hold-write')await this.noticeLinkWriteGate(this.noticeLinkDeadline);return result;
+   }]);
+   if(stage==='write'&&!this.noticeLinkTransactionObserved){
+    this.noticeLinkTransactionObserved=true;const data=globalThis.__noticeLinkData;
+    if(data){data.txStarted=true;actual.then(()=>{data.txSettled=true;data.txOutcome='fulfilled';},()=>{data.txSettled=true;data.txOutcome='rejected';});}
+   }
+   const result=await actual;
+   if(stage==='write'){
+    state.trace.push({link:'transaction-settled',at:Date.now()});
+    if(this.noticeMode==='link-hold-commit')await this.noticeLinkGate('link-commit');
+    if(this.noticeMode==='link-lost-transaction')throw Error('SYN NEGATIVE actual Link committed, transaction result lost');
+   }
+   return result;
+  };
   db.withSession=constraint=>{
    const session=Reflect.apply(sessionMethod,db,[constraint]),prepare=session.prepare,record={constraint,queries:[]};state.sql.push(record);
    session.prepare=sql=>{
@@ -116,7 +187,9 @@ export function extendFiniteOwnerNoticeGet(entry){
   const state=this.noticeState;state.trace.push({gate:name,at:Date.now()});this.noticeHeld=name;
   await new Promise(resolve=>{this.noticeRelease=()=>{this.noticeRelease=null;this.noticeHeld=null;resolve();};});
  }
- async noticeReleaseHeld(){this.noticeRelease?.();}
+ async noticeReleaseHeld(){this.noticeLinkReleased=true;this.noticeRelease?.();}
+ async noticeLinkGate(name){this.noticeHeld=name;this.noticeLinkReleased=false;this.noticeState.trace.push({gate:name,at:Date.now()});while(!this.noticeLinkReleased)await new Promise(resolve=>setTimeout(resolve,10));this.noticeHeld=null;}
+
  async noticeStateRead(){return {held:this.noticeHeld??null,mode:this.noticeMode,state:this.noticeState??null};}
  async noticeProbe(){
   const root=createFiniteOwnerRequestLease(new Request('https://delegated-canary.agentfriendlyweb.dev/fixture/notice-probe'));
@@ -162,8 +235,28 @@ export function extendFiniteOwnerNoticeGet(entry){
   await this.ctx.storage.sync();
  }
  `;
+ // Passive diagnostic of the original caught Error: guard, throw and return stay intact.
+ const leaseImport="import{createFiniteOwnerRequestLease}from'./lib/mcp-qa-finite-owner-preparation.mjs';";
+ if(entry.split(leaseImport).length!==2)throw Error('SYN initial diagnostic lease import marker');
+ entry=entry.replace(leaseImport,"import{createFiniteOwnerRequestLease,readFiniteOwnerRequestDeadline as noticeDiagnosticDeadline}from'./lib/mcp-qa-finite-owner-preparation.mjs';");
+ const originalRead="try{return await readPrivateQaFiniteOwnerContext({ctx:this.ctx,env:this.env,parent:parent.lease});}catch{return {status:'unavailable'};}finally{parent.finish();}";
+ if(entry.split(originalRead).length!==2)throw Error('SYN initial diagnostic original catch marker');
+ entry=entry.replace(originalRead,"try{return await readPrivateQaFiniteOwnerContext({ctx:this.ctx,env:this.env,parent:parent.lease});}catch(error){let deadline=null;try{deadline=noticeDiagnosticDeadline(parent.lease);}catch{}console.info('NOTICE SYN original phase failure',JSON.stringify({stage:'sdkReadCurrent-catch',at:Date.now(),deadline,signalAborted:parent.lease.signal.aborted,frames:String(error?.stack??'').split('\\n').slice(1,5).map(line=>line.slice(0,240))}));return {status:'unavailable'};}finally{parent.finish();}");
+ const fetchMarker='export default{async fetch(request,env){const refs=await request.json();';
+ if(entry.split(fetchMarker).length!==2)throw Error('SYN fixed QA DATA fetch marker');
+ entry=entry.replace(fetchMarker,`export default{async fetch(request,env){
+  if(new URL(request.url).pathname==='/fixture/notice-link-control'){
+   if(request.method!=='POST'||new URL(request.url).search)return new Response(null,{status:400});
+   let input;try{const raw=await request.text();if(raw.length>64)throw Error();input=JSON.parse(raw);}catch{return new Response(null,{status:400});}
+   if(!input||Object.getPrototypeOf(input)!==Object.prototype||Object.keys(input).length!==1||!['read','reset','release'].includes(input.action))return new Response(null,{status:400});
+   if(input.action==='reset'){if(globalThis.__noticeLinkData?.held)return new Response(null,{status:409});globalThis.__noticeLinkData={marker:crypto.randomUUID(),held:null,released:false,entered:0,settled:0,expired:false,deadline:null,txStarted:false,txSettled:false,txOutcome:null};}
+   const c=globalThis.__noticeLinkData;
+   if(input.action==='release'&&c)c.released=true;
+   return Response.json({visible:!!c,marker:c?.marker??null,held:c?.held??null,entered:c?.entered??0,settled:c?.settled??0,expired:c?.expired??false,txStarted:c?.txStarted??false,txSettled:c?.txSettled??false,txOutcome:c?.txOutcome??null});
+  }
+  const refs=await request.json();`);
  if(entry.split(' export class Initial extends FiniteClosure{').length!==2)throw Error('SYN notice class marker');
- return "import {recordDossierMonitoringConsent as noticeOrdinaryRecord,createDossierMonitoringAuthorization as noticeOrdinaryAuthorization} from './lib/dossier-monitoring-authority.mjs';\nimport {initialHash as noticeHash} from './lib/mcp-qa-finite-initial-material-records.mjs';\nimport {sealFinitePreparationIssuerRecord as noticeIssuerSeal} from './lib/mcp-qa-finite-preparation-issuer-records.mjs';\nimport {createFinitePreparationNoticeJournal as noticeRealJournal} from './lib/mcp-qa-finite-preparation-notice-journal.mjs';\nimport {sealFinitePreparationNoticeRecord as noticeSeal,encodeFinitePreparationNoticeRecord as noticeEncode,decodeFinitePreparationNoticeRecord as noticeDecode} from './lib/mcp-qa-finite-preparation-notice-records.mjs';\n"+entry.replace(' export class Initial extends FiniteClosure{',' export class Initial extends FiniteClosure{'+methods);
+ return "import {encodeFinitePreparationRecord as noticePrepEncode,decodeFinitePreparationRecord as noticePrepDecode} from './lib/mcp-qa-finite-preparation-records.mjs';\nimport {recordDossierMonitoringConsent as noticeOrdinaryRecord,createDossierMonitoringAuthorization as noticeOrdinaryAuthorization} from './lib/dossier-monitoring-authority.mjs';\nimport {initialHash as noticeHash} from './lib/mcp-qa-finite-initial-material-records.mjs';\nimport {sealFinitePreparationIssuerRecord as noticeIssuerSeal} from './lib/mcp-qa-finite-preparation-issuer-records.mjs';\nimport {createFinitePreparationNoticeJournal as noticeRealJournal} from './lib/mcp-qa-finite-preparation-notice-journal.mjs';\nimport {sealFinitePreparationNoticeRecord as noticeSeal,encodeFinitePreparationNoticeRecord as noticeEncode,decodeFinitePreparationNoticeRecord as noticeDecode} from './lib/mcp-qa-finite-preparation-notice-records.mjs';\n"+entry.replace(' export class Initial extends FiniteClosure{',' export class Initial extends FiniteClosure{'+methods);
 }
 
 // Read-only instrumentation of exact lexical source sites. SYN gates never supply authority.
@@ -199,11 +292,23 @@ export function instrumentFiniteNoticeGet(source){
   postReplace("    position='consent-sql-pending';sqlSettled=false;","    if(globalThis.__noticeOwner?.noticeMode==='before-insert')await wait(globalThis.__noticeOwner.noticeGate('before-insert'));check();position='consent-sql-pending';sqlSettled=false;");
   postReplace("if(!verified.ok)fail();identity=verified.identity;clock.narrow(identity.expiresAt);","if(!verified.ok)fail();identity=verified.identity;globalThis.__noticeState&&(globalThis.__noticeState.accessVerifications=(globalThis.__noticeState.accessVerifications??0)+1);clock.narrow(identity.expiresAt);");
   postReplace("if(!again.ok||again.identity.subject!==identity.subject||again.identity.expiresAt!==identity.expiresAt)fail();","if(!again.ok||again.identity.subject!==identity.subject||again.identity.expiresAt!==identity.expiresAt)fail();globalThis.__noticeState&&(globalThis.__noticeState.accessVerifications=(globalThis.__noticeState.accessVerifications??0)+1);");
+  postReplace("    const acceptedAt=Date.now();","    if(globalThis.__noticeOwner){globalThis.__noticeState?.trace.push({position:'before-link',at:Date.now()});if(['link-before','link-cut-after-ack','link-existing','link-conflict'].includes(globalThis.__noticeOwner.noticeMode))await wait(globalThis.__noticeOwner.noticeLinkGate('before-link'));}check();const acceptedAt=Date.now();");
+  postReplace("    position='notice-link-pending';linkSettled=false;","    if(['link-existing','link-conflict'].includes(globalThis.__noticeOwner?.noticeMode)){const data=globalThis.__noticeOwner.noticeMode==='link-conflict'?{...ownedNoticeLink,eventHash:ownedNoticeLink.eventHash==='f'.repeat(64)?'e'.repeat(64):'f'.repeat(64)}:ownedNoticeLink;await wait(ctx.storage.put('connection-preparation:'+id+':notice',prepEncode('NoticeLink',data)));await wait(ctx.storage.sync());globalThis.__noticeState?.trace.push({link:'negative-race-insert',at:Date.now()});}position='notice-link-pending';linkSettled=false;");
+  postReplace("    linkPromise=retain(preparationStore.putLink","    globalThis.__noticeOwner&&(globalThis.__noticeOwner.noticeLinkDeadline=window.deadline);globalThis.__noticeOwner&&(globalThis.__noticeOwner.noticeLinkPhase='write');globalThis.__noticeState?.trace.push({link:'put-enter',at:Date.now()});linkPromise=retain(preparationStore.putLink");
+  postReplace("    if(linkResult?.status!=='recorded'||linkResult.recordHash!==linkHash)fail();","    globalThis.__noticeState?.trace.push({link:'put-exit',status:linkResult?.status,at:Date.now()});if(linkResult?.status!=='recorded'||linkResult.recordHash!==linkHash)fail();");
+  postReplace("    check();linkSyncPromise=retain","    globalThis.__noticeOwner&&(globalThis.__noticeOwner.noticeLinkPhase='sync');globalThis.__noticeState?.trace.push({link:'sync-enter',at:Date.now()});check();linkSyncPromise=retain");
+  postReplace("linkSynced=true;","linkSynced=true;globalThis.__noticeState?.trace.push({link:'sync-exit',at:Date.now()});");
+  postReplace("    check();linkReadPromise=retain","    globalThis.__noticeOwner&&(globalThis.__noticeOwner.noticeLinkPhase='readback');globalThis.__noticeState?.trace.push({link:'read-enter',at:Date.now()});check();linkReadPromise=retain");
+  postReplace("    check();linkSettled=true;","    globalThis.__noticeState?.trace.push({link:'read-exit',at:Date.now()});globalThis.__noticeOwner&&(globalThis.__noticeOwner.noticeLinkPhase=null);check();linkSettled=true;");
   postReplace("   const html=","   globalThis.__noticeState?.trace.push({position:'complete',at:Date.now()});const html=");
  }
  head=head.replace("if(globalThis.__noticeOwner?.noticeMode==='drift'&&globalThis.__noticeState?.trace.at(-1)?.position==='ticket-sql-resolved')await globalThis.__noticeOwner.noticeGate('between-own');","if((globalThis.__noticeOwner?.noticeMode==='drift'&&globalThis.__noticeState?.trace.at(-1)?.position==='ticket-sql-resolved')||(globalThis.__noticeOwner?.noticeMode==='consent-drift'&&globalThis.__noticeState?.trace.at(-1)?.position==='consent-sql-resolved'))await globalThis.__noticeOwner.noticeGate('between-own');");
 
  head=head.replaceAll("globalThis.__noticeState?.trace.at(-1)?.position","globalThis.__noticeState?.trace.filter(v=>v.position).at(-1)?.position");
+ const betweenLink="await ioCheckpoint('between');";
+ if(head.split(betweenLink).length!==2)throw Error('SYN Link second snapshot marker');
+ head=head.replace(betweenLink,betweenLink+"if(globalThis.__noticeOwner?.noticeMode==='link-drift'&&globalThis.__noticeState?.trace.filter(v=>v.position&&v.stage==='before').at(-1)?.position==='notice-link-recorded')await globalThis.__noticeOwner.noticeLinkGate('link-between');");
+
  const passiveMarker=(needle,entry,exit)=>{
   if(head.split(needle).length!==2)throw Error('SYN passive correlator marker changed: '+entry);
   head=head.replace(needle,"globalThis.__noticeState?.trace.push({correlator:'"+entry+"',phase:'enter'});"+needle+(exit?"globalThis.__noticeState?.trace.push({correlator:'"+entry+"',phase:'exit'});":""));
@@ -212,6 +317,59 @@ export function instrumentFiniteNoticeGet(source){
  passiveMarker("if(tickets.some(v=>canonical(v)!==canonical(row)))fail();",'noticePrimary301',true);
  passiveMarker("if(consent.ack?.outcome==='applied'&&(events.length!==1||consent.ack.rowHash!==digest('afw.finite-preparation-notice-row.v1',events[0])||consent.ack.sequence!==events[0].sequence||events[0].issued_at>consent.ack.observedAt))fail();",'noticeConsentEventAck',true);
 
+ const snapshotMarker="const pair={first:snapshot(first,observed,qualified),second:snapshot(second,again,secondQualified)};";
+ if(head.split(snapshotMarker).length!==2)throw Error('SYN Link full snapshot marker');
+ head=head.replace(snapshotMarker,snapshotMarker+"for(const s of [pair.first,pair.second])globalThis.__noticeState?.trace.push({snapshotNotice:{present:s.preparation.noticeLink!==null,inventory:s.records.inventory.some(([key])=>key==='connection-preparation:'+s.preconnectionId+':notice'),anchor:s.anchor.inventory.some(([key])=>key==='connection-preparation:'+s.preconnectionId+':notice')}});");
+ const linkPredicate="if(link.preconnectionId!==i.preconnectionId";
+ if(head.split(linkPredicate).length!==2)throw Error('SYN Link correlator marker');
+ head=head.replace(linkPredicate,"globalThis.__noticeState?.trace.push({correlator:'noticeLink',phase:'enter',acceptedAt:link.acceptedAt,deadline:send.window.deadline,at:Date.now()});"+linkPredicate);
+ const linkEnd="||Date.now()>=ceiling)fail();";
+ if(head.split(linkEnd).length!==2)throw Error('SYN Link correlator exit marker');
+ head=head.replace(linkEnd,linkEnd+"globalThis.__noticeState?.trace.push({correlator:'noticeLink',phase:'exit',at:Date.now()});");
  return head+body+consent;
 }
 
+
+// Fixed SYN authentic-flow setup, on an existing native harness; no world/SDK fixture import.
+const PREP='__Host-afw-finite-prepare='+'a'.repeat(64);
+export async function noticePlain(p){const r=await p;try{return JSON.parse(JSON.stringify(r));}finally{r?.[Symbol.dispose]?.();}}
+const plain=noticePlain;
+export async function prepareNoticeIssued(f){
+  await f.stub.configure('normal');assert.equal((await plain(f.stub.invoke(f.refs))).status,'material_recorded');await f.stub.restoreMethods();
+  f.phaseCurrent=await plain(f.stub.seedPhaseFacts('settled',null));assert.equal(f.phaseCurrent.fixtureError,undefined,JSON.stringify(f.phaseCurrent));
+  const before=await plain(f.stub.sdkReadCurrent());assert.deepEqual(Object.keys(before).sort(),['capsuleHash','preconnectionId','source']);assert.equal(before.source.phase,'read_consent');
+  f.source=before.source;f.token=await f.enrollmentToken(f.source);f.headers={'Cf-Access-Jwt-Assertion':f.token,Cookie:PREP};
+}
+export async function issueNotice(f){
+  f.verifier='v'.repeat(64);f.challenge=createHash('sha256').update(f.verifier).digest('base64url');
+  const query=new URLSearchParams({client_id:f.source.clientId,redirect_uri:'https://client.example/cb',response_type:'code',resource:f.source.resource,scope:'afw:project:read',state:'SYN-state',code_challenge:f.challenge,code_challenge_method:'S256'});
+  const get=await f.mf.dispatchFetch(f.source.origin+'/authorize?'+query,{redirect:'manual',headers:f.headers});assert.equal(get.status,200);
+  const html=await get.text(),handle=/name="handle" value="([^"]+)"/.exec(html)?.[1];assert(handle);
+  const cookie=get.headers.getSetCookie().map(v=>v.split(';')[0]).join('; ');assert(cookie);
+  const post=await f.mf.dispatchFetch(f.source.origin+'/authorize',{method:'POST',redirect:'manual',headers:{Origin:f.source.origin,'Content-Type':'application/x-www-form-urlencoded',...f.headers,Cookie:PREP+'; '+cookie},body:new URLSearchParams({handle,decision:'approve',scope:'afw:project:read'})});
+  assert.equal(post.status,302);f.code=new URL(post.headers.get('Location')).searchParams.get('code');assert(f.code);await post.body?.cancel();
+  const rows=await plain(f.stub.snapshot()),r=JSON.parse(rows.find(([k])=>k.startsWith('afw.finite-preparation-issuer.v1:')&&k.endsWith(':reservation'))[1]);f.identity=r.identity;
+  f.grant=await plain(f.stub.sdkGrant(f.identity.grantId));assert.equal(f.grant.revoked_at,'');assert.equal(f.grant.exchanged_at,'');
+  assert.equal((await plain(f.stub.sdkReadCurrent())).source.phase,'read_consent');
+}
+export async function actualExchangeMcp(f){
+ const config=await f.mf.dispatchFetch(f.source.origin+'/fixture/token-config',{method:'POST',body:JSON.stringify({clientId:f.source.clientId,projectId:f.source.project.projectId,audience:f.source.access.audience,teamDomain:f.source.access.teamDomain,expiresAt:new Date(f.source.window.expiresAt).toISOString()})});assert.equal(config.status,204);
+ const exchange=await f.mf.dispatchFetch(f.source.origin+'/oauth/token',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({grant_type:'authorization_code',client_id:f.source.clientId,redirect_uri:'https://client.example/cb',resource:f.source.resource,code:f.code,code_verifier:f.verifier})});assert.equal(exchange.status,200);
+ const payload=await exchange.json();assert.equal(typeof payload.access_token,'string');
+ const client=new Client({name:'SYN-notice-native',version:'1.0.0'},{versionNegotiation:{mode:'legacy'}});
+ try{
+  await client.connect(new StreamableHTTPClientTransport(new URL(f.source.resource),{requestInit:{headers:{Authorization:'Bearer '+payload.access_token,Host:new URL(f.source.origin).host}},fetch:(url,options)=>f.mf.dispatchFetch(String(url),options)}));
+  const summary=await client.callTool({name:'read_project_summary',arguments:{}});assert.equal(summary.isError,undefined);assert.equal(summary.structuredContent.data.id,f.identity.projectId);
+ }finally{await client.close();}
+ f.grant=await plain(f.stub.sdkGrant(f.identity.grantId));assert.notEqual(f.grant.exchanged_at,'');
+ const context=await plain(f.stub.sdkReadCurrent());assert.deepEqual(Object.keys(context).sort(),['capsuleHash','preconnectionId','source']);assert.equal(context.source.phase,'read_consent');
+}
+
+export async function ticket(f,extra=''){
+ const response=await f.mf.dispatchFetch(f.source.origin+'/monitoring',{headers:{...f.headers,Cookie:PREP+extra},redirect:'manual'});
+ const html=await response.text();assert.equal(response.status,200);const handle=/name="handle" value="([^"]+)"/.exec(html)?.[1];assert(handle);
+ const cookie=response.headers.getSetCookie().map(v=>v.split(';')[0]).join('; ');assert(cookie);
+ f.notice={handle,headers:{...f.headers,Origin:f.source.origin,'Content-Type':'application/x-www-form-urlencoded',Cookie:PREP+'; '+cookie+extra}};
+ return plain(f.stub.noticeInspect());
+}
+export const consent=(f,options={})=>f.mf.dispatchFetch(f.source.origin+'/monitoring/grant',{method:'POST',redirect:'manual',headers:f.notice.headers,body:new URLSearchParams({handle:f.notice.handle}),...options});
```

### test/mcp-qa-finite-owner-notice-consent-native.test.mjs

```diff
@@ -60,13 +60,13 @@ test('native consent POST records original decision after actual ticket GET',()=
  await saveNoticeObservation({unit:'consent',elapsed,...observation.state,io});
  console.info('CONSENT native principal costs',JSON.stringify({elapsed,pairs:io.snapshots/2,rechecks:observation.state.trace.filter(v=>v.stage==='after').length,accessVerifications:observation.state.accessVerifications??0,sqlSessions:observation.state.sql.length,first:observation.state.sql.flatMap(s=>s.queries).filter(q=>q.method==='first').length,all:observation.state.sql.flatMap(s=>s.queries).filter(q=>q.method==='all').length,ops:observation.state.ops,noticeLists:observation.state.lists.filter(v=>v.prefix.startsWith('afw.finite-preparation-notice')).length,http:{snapshots:io.snapshots,requests:io.rows.length,peak:io.peak,active:io.active}}));
  assert(elapsed<30000);assert.equal(io.peak,2);assert.equal(io.active,0);
- assert.equal(observation.state.trace.filter(v=>v.stage==='after').length,5);assert.equal(observation.state.accessVerifications,2);
+ assert.equal(observation.state.trace.filter(v=>v.stage==='after').length,6);assert.equal(observation.state.accessVerifications,2);
  const rowsAfter=await plain(f.stub.snapshot());for(const row of original)assert.deepEqual(rowsAfter.find(([k])=>k===row[0]),row);
  const historyAfter=(await f.db.prepare('SELECT * FROM dossier_monitoring_consent_events ORDER BY sequence').all()).results;
  for(const row of history)assert.deepEqual(historyAfter.find(v=>v.sequence===row.sequence),row);
 
  assert.equal(response.status,200,'fixed POST reached after native ticket; events='+after.events.length);
- assert.equal(after.events.length,1);assert.equal(after.notice.length,5);assert.match(html,/Registré tu decisión temporal/);
+ assert.equal(after.events.length,1);assert.equal(after.notice.length,5);assert((await plain(f.stub.snapshot())).some(([key])=>key==='connection-preparation:'+f.identity.preconnectionId+':notice'));assert.match(html,/Registré tu decisión temporal/);
  assert.deepEqual(after.tickets,before.tickets);assert.deepEqual(await plain(f.stub.sdkGrant(f.identity.grantId)),f.grant);
  const record=suffix=>JSON.parse(after.notice.find(([k])=>k.endsWith(suffix))[1]),r=record(':reservation'),send=record('consent:send'),ack=record('consent:ack'),row=after.events[0],i=f.identity;
  assert.deepEqual(row,{sequence:row.sequence,grant_id:i.grantId,project_id:i.projectId,user_id:i.subject,client_id:i.clientId,resource:i.resource,revision:i.projectRevision,action:'grant',purpose:'afw.dossier-monitoring.v1',request_id:r.ticket.requestId,issued_at:row.issued_at,expires_at:r.ticket.permissionExpiresAt});
@@ -158,7 +158,7 @@ for(const mode of ['lost-send','lost-ack'])test('native consent journal uncertai
 test('native consent original window fences queued SQL',()=>withIssued(async f=>{
  await ticket(f);await f.stub.noticeConfigure('queue');const pending=consent(f),seen=await gate(f,'before-sql');assert(seen.state.sqlEnteredAt);
  await new Promise(resolve=>setTimeout(resolve,5100));await denied(f,await pending);assert.equal((await plain(f.stub.noticeProbe())).allowed,false,'actual operation remains retained');
- await f.stub.noticeReleaseHeld();const after=await plain(f.stub.noticeInspect());assert.equal(after.events.length,0);assert.equal(after.notice.length,4);
+ await f.stub.noticeReleaseHeld();for(let n=0;n<100;n++){if((await plain(f.stub.noticeProbe())).allowed)break;await new Promise(r=>setTimeout(r,10));}assert.equal((await plain(f.stub.noticeProbe())).allowed,true,'actual queued SQL settlement observed');const after=await plain(f.stub.noticeInspect());assert.equal(after.events.length,0);assert.equal(after.notice.length,4);
 }));
 for(const [mode,drift]of [['before-send','revision'],['before-send','owner'],['before-send','pointer'],['before-insert','revision'],['before-insert','holder']])test('native consent source current drift denies '+mode+' '+drift,()=>withIssued(async f=>{
  await ticket(f);await f.stub.noticeConfigure(mode);const pending=consent(f);await gate(f,mode==='before-send'?'before-send':'before-insert');
@@ -242,7 +242,7 @@ test('native consent abort retains SQL and forbids late ACK',()=>withIssued(asyn
  const abort=await f.mf.dispatchFetch(f.source.origin+'/fixture/consent-abort');assert.equal(abort.status,204);await abort.body?.cancel();
  await denied(f,await pending);assert.equal((await plain(f.stub.noticeProbe())).allowed,false);await f.stub.noticeReleaseHeld();
  for(let n=0;n<100;n++){if((await plain(f.stub.noticeProbe())).allowed)break;await new Promise(r=>setTimeout(r,10));}
- const after=await plain(f.stub.noticeInspect());assert.equal(after.events.length,1);assert.equal(after.notice.length,4);assert(!after.notice.some(([k])=>k.endsWith('consent:ack')));
+ assert.equal((await plain(f.stub.noticeProbe())).allowed,true,'actual aborted SQL settlement observed');const after=await plain(f.stub.noticeInspect());assert.equal(after.events.length,1);assert.equal(after.notice.length,4);assert(!after.notice.some(([k])=>k.endsWith('consent:ack')));
 }));
 test('pure fixed POST metadata and original grammar remain exact',()=>{
  const origin='https://delegated-canary.agentfriendlyweb.dev';
```

### test/mcp-qa-finite-owner-notice-link-native.test.mjs

```diff
@@ -0,0 +1,168 @@
+import {hashFiniteOwnerEvidence,encodeFinitePreparationRecord,decodeFinitePreparationRecord} from '../lib/mcp-qa-finite-preparation-records.mjs';
+import {initialHash} from '../lib/mcp-qa-finite-initial-material-records.mjs';
+import test from 'node:test';
+import assert from 'node:assert/strict';
+import {initialEntryHarness} from './fixtures/finite-initial-entry-world.mjs';
+import {seedFiniteOwnerSdkClient} from './fixtures/finite-owner-qa-sdk.mjs';
+import {prepareNoticeIssued,issueNotice,actualExchangeMcp,ticket,consent,noticePlain as plain,saveNoticeObservation} from './fixtures/finite-owner-notice-get.mjs';
+
+async function withIssued(fn){
+ const f=await initialEntryHarness('phase-context-sdk-token-notice-get');
+ try{await prepareNoticeIssued(f);await seedFiniteOwnerSdkClient(f.mf,f.source);await issueNotice(f);await fn(f);}
+ finally{await f.stub.noticeReleaseHeld().catch(()=>{});await f.stub.ioRelease('all').catch(()=>{});await f.mf.dispose();await f.cleanup();}
+}
+test('native notice link follows actual consent ACK in the same POST child',()=>withIssued(async f=>{
+ await actualExchangeMcp(f);await ticket(f);
+ const original=await plain(f.stub.snapshot()),history=(await f.db.prepare('SELECT * FROM dossier_monitoring_consent_events ORDER BY sequence').all()).results,grants=(await f.db.prepare('SELECT * FROM delegated_access_grants ORDER BY id').all()).results,schema=(await f.db.prepare("SELECT type,name,tbl_name,sql FROM sqlite_schema WHERE tbl_name IN ('dossier_monitoring_consent_events','dossier_monitoring_owner_tickets') AND sql IS NOT NULL ORDER BY name").all()).results;await f.stub.noticeConfigure();await f.stub.ioConfigure();const began=Date.now();const response=await consent(f);await response.body?.cancel();const observation=await plain(f.stub.noticeStateRead()),io=await plain(f.stub.ioObservation()),elapsed=Date.now()-began;const after=await plain(f.stub.noticeInspect());
+ assert.equal(response.status,200);assert.equal(after.fixtureError,undefined);assert.equal(after.events.length,1);
+ assert.equal(after.notice.length,5);assert(after.notice.some(([key])=>key.endsWith('consent:ack')));
+ const all=await plain(f.stub.snapshot()),link=all.find(([key])=>key==='connection-preparation:'+f.identity.preconnectionId+':notice');
+ assert(link,'actual POST 200 and durable SQL/ACK must produce NoticeLink');
+ const record=decodeFinitePreparationRecord('NoticeLink',link[1]),event=after.events[0],ack=JSON.parse(after.notice.find(([key])=>key.endsWith('consent:ack'))[1]),send=JSON.parse(after.notice.find(([key])=>key.endsWith('consent:send'))[1]);
+ assert.deepEqual(Object.keys(record).sort(),['acceptedAt','eventHash','grantHash','preconnectionId','sequence']);assert.equal(encodeFinitePreparationRecord('NoticeLink',record),link[1]);
+ assert.equal(record.eventHash,hashFiniteOwnerEvidence('event',{grantId:event.grant_id,projectId:event.project_id,subject:event.user_id,clientId:event.client_id,resource:event.resource,revision:event.revision,action:event.action,purpose:event.purpose,requestId:event.request_id,sequence:event.sequence,issuedAt:event.issued_at,expiresAt:event.expires_at}));
+ assert.notEqual(record.eventHash,ack.rowHash);assert.equal(ack.rowHash,initialHash('afw.finite-preparation-notice-row.v1',event));assert.equal(record.sequence,event.sequence);assert(record.sequence>1);assert(record.acceptedAt>=ack.observedAt);assert(record.acceptedAt<send.window.deadline);
+ for(const row of original)assert.deepEqual(all.find(([key])=>key===row[0]),row);
+ const historyAfter=(await f.db.prepare('SELECT * FROM dossier_monitoring_consent_events ORDER BY sequence').all()).results;for(const row of history)assert.deepEqual(historyAfter.find(v=>v.sequence===row.sequence),row);
+ assert.equal(grants.length,3);assert.equal(history.length,3);assert.equal(schema.length,7);assert.deepEqual((await f.db.prepare('SELECT * FROM delegated_access_grants ORDER BY id').all()).results,grants);assert.deepEqual((await f.db.prepare("SELECT type,name,tbl_name,sql FROM sqlite_schema WHERE tbl_name IN ('dossier_monitoring_consent_events','dossier_monitoring_owner_tickets') AND sql IS NOT NULL ORDER BY name").all()).results,schema);
+ const trace=observation.state.trace;
+ assert.deepEqual(trace.filter(v=>v.link&&v.link!=='transaction-settled').map(v=>v.link),['put-enter','put-exit','sync-enter','sync-exit','read-enter','read-exit']);
+ const snapshots=trace.filter(v=>v.snapshotNotice).map(v=>v.snapshotNotice);assert.equal(snapshots.length,14);assert.deepEqual(snapshots.slice(0,12),Array.from({length:12},()=>({present:false,inventory:false,anchor:false})));assert.deepEqual(snapshots.slice(12),Array.from({length:2},()=>({present:true,inventory:true,anchor:true})));
+ assert.equal(trace.filter(v=>v.stage==='after').length,6);assert.equal(io.snapshots,14);assert.equal(io.peak,2);assert.equal(io.active,0);
+ const complete=trace.find(v=>v.position==='complete');assert(complete.at<send.window.deadline);assert(elapsed<30000);
+ await saveNoticeObservation({unit:'link',elapsed,...observation.state,io});
+ console.info('LINK native principal costs',JSON.stringify({elapsed,pairs:io.snapshots/2,rechecks:trace.filter(v=>v.stage==='after').length,accessVerifications:observation.state.accessVerifications,sqlSessions:observation.state.sql.length,first:observation.state.sql.flatMap(s=>s.queries).filter(q=>q.method==='first').length,all:observation.state.sql.flatMap(s=>s.queries).filter(q=>q.method==='all').length,ops:observation.state.ops,noticeLists:observation.state.lists.filter(v=>v.prefix.startsWith('afw.finite-preparation-notice')).length,http:{snapshots:io.snapshots,requests:io.rows.length,peak:io.peak,active:io.active},childElapsed:complete.at-send.window.startedAt,windowMs:send.window.deadline-send.window.startedAt}));
+
+}));
+
+async function state(f){return (await plain(f.stub.noticeStateRead())).state;}
+async function gate(f,name){
+ for(let n=0;n<500;n++){const s=await plain(f.stub.noticeStateRead());if(s.held===name)return s;await new Promise(r=>setTimeout(r,10));}
+ assert.fail('SYN actual Link gate not reached: '+name);
+}
+async function settled(f){for(let n=0;n<100;n++){if((await plain(f.stub.noticeProbe())).allowed)return;await new Promise(r=>setTimeout(r,10));}assert.fail('actual originating Link work did not settle');}
+async function denied(response){assert.notEqual(response.status,200);assert.doesNotMatch(await response.text(),/Registré tu decisión|<form/);}
+async function success(f){await ticket(f);await f.stub.noticeConfigure();const response=await consent(f);assert.equal(response.status,200);await response.body?.cancel();return plain(f.stub.noticeInspect());}
+async function linkEntry(f){return (await plain(f.stub.snapshot())).find(([key])=>key==='connection-preparation:'+f.identity.preconnectionId+':notice');}
+function countWrites(s){return s.trace.filter(v=>v.link==='put-enter').length;}
+function consentInserts(s){return s.sql.flatMap(v=>v.queries).filter(v=>v.sql.includes('INSERT INTO dossier_monitoring_consent_events')).length;}
+async function replayClosed(f,before){
+ await f.stub.noticeConfigure();await denied(await consent(f));assert.deepEqual(await plain(f.stub.noticeInspect()),before);const s=await state(f);assert.equal(countWrites(s),0);assert.equal(consentInserts(s),0);
+}
+test('native notice link retains global event sequence and foreign history',()=>withIssued(async f=>{
+ const at=Date.now(),foreign='ffffffff-ffff-4fff-8fff-ffffffffffff';
+ await f.db.prepare('INSERT INTO dossier_monitoring_consent_events (grant_id,project_id,user_id,client_id,resource,revision,action,purpose,request_id,issued_at,expires_at) VALUES (?,?,?,?,?,?,?,?,?,?,?)').bind(foreign,'SYN-other','SYN-other','SYN-other','https://foreign.invalid/mcp',1,'grant','afw.dossier-monitoring.v1',foreign,at,at+60000).run();
+ const original=(await f.db.prepare('SELECT * FROM dossier_monitoring_consent_events ORDER BY sequence').all()).results;
+ const after=await success(f),record=decodeFinitePreparationRecord('NoticeLink',(await linkEntry(f))[1]);assert.equal(record.sequence,after.events[0].sequence);assert(record.sequence>original.at(-1).sequence);
+ const history=(await f.db.prepare('SELECT * FROM dossier_monitoring_consent_events ORDER BY sequence').all()).results;for(const row of original)assert.deepEqual(history.find(v=>v.sequence===row.sequence),row);
+}));
+test('native notice link never advances source or public readers and remains factual after deadline',()=>withIssued(async f=>{
+ const after=await success(f),entry=await linkEntry(f),send=JSON.parse(after.notice.find(([key])=>key.endsWith('consent:send'))[1]);
+ await new Promise(r=>setTimeout(r,Math.max(0,send.window.deadline-Date.now()+25)));assert(Date.now()>send.window.deadline);
+ await f.stub.noticeConfigure();assert.equal((await plain(f.stub.sdkReadCurrent())).status,'unavailable');
+ const trace=(await state(f)).trace;assert(trace.some(v=>v.correlator==='noticeLink'&&v.phase==='enter'&&v.at>send.window.deadline));assert(trace.some(v=>v.correlator==='noticeLink'&&v.phase==='exit'));
+ for(const path of ['/monitoring','/authorize','/monitoring/notice-link']){const response=await f.mf.dispatchFetch(f.source.origin+path,{headers:f.headers});assert.notEqual(response.status,200);await response.body?.cancel();}
+ await replayClosed(f,after);assert.deepEqual(await linkEntry(f),entry);assert.deepEqual(await plain(f.stub.sdkGrant(f.identity.grantId)),f.grant);
+}));
+for(const history of ['complete','cut-after-ack'])test('native notice link requires live originating SQL continuation '+history,()=>withIssued(async f=>{
+ await ticket(f);await f.stub.noticeConfigure(history==='complete'?'normal':'link-cut-after-ack');
+ if(history==='complete'){const response=await consent(f);assert.equal(response.status,200);await response.body?.cancel();}
+ else{const pending=consent(f);await gate(f,'before-link');await (await f.mf.dispatchFetch(f.source.origin+'/fixture/consent-abort')).body?.cancel();await denied(await pending);await f.stub.noticeReleaseHeld();await settled(f);}
+ const after=await plain(f.stub.noticeInspect());assert.equal(after.events.length,1);assert.equal(after.notice.length,5);assert.equal(Boolean(await linkEntry(f)),history==='complete');
+ const originalInstance=await f.stub.noticeInstanceRead();await assert.rejects(async()=>{await f.stub.noticeRestart();});
+ const bindings=await f.mf.getBindings('qa-sdk');f.stub=bindings.AFW_INDEPENDENT_CLOSURE.get(bindings.AFW_INDEPENDENT_CLOSURE.idFromName('afw-own-successor-closure-v1'));
+ assert.notEqual(await f.stub.noticeInstanceRead(),originalInstance);await replayClosed(f,after);assert.equal(Boolean(await linkEntry(f)),history==='complete');
+}));
+for(const mode of ['link-lost-transaction','link-lost-sync','link-lost-readback','link-wrong-readback'])test('native notice link unknown or lost actual result remains closed '+mode,()=>withIssued(async f=>{
+ await ticket(f);await f.stub.noticeConfigure(mode);await denied(await consent(f));
+ const after=await plain(f.stub.noticeInspect()),entry=await linkEntry(f),s=await state(f);assert.equal(after.events.length,1);assert.equal(after.notice.length,5);assert(entry);assert.equal(countWrites(s),1);
+ if(mode==='link-lost-transaction'){assert(s.trace.some(v=>v.link==='put-exit'&&v.status==='uncertain'));assert(!s.trace.some(v=>v.link==='sync-enter'||v.link==='read-enter'));}
+ if(mode==='link-lost-sync')assert(!s.trace.some(v=>v.link==='read-enter'));
+ assert(!s.trace.some(v=>v.position==='complete'));await replayClosed(f,after);assert.deepEqual(await linkEntry(f),entry);
+}));
+for(const mode of ['link-existing','link-conflict'])test('native notice link existing or conflicting record cannot win '+mode,()=>withIssued(async f=>{
+ await ticket(f);await f.stub.noticeConfigure(mode);const pending=consent(f);await gate(f,'before-link');await f.stub.noticeReleaseHeld();await denied(await pending);
+ const after=await plain(f.stub.noticeInspect()),s=await state(f);assert.equal(after.events.length,1);assert.equal(after.notice.length,5);assert(await linkEntry(f));assert.equal(countWrites(s),1);assert(s.trace.some(v=>v.link==='negative-race-insert'));assert(!s.trace.some(v=>v.link==='sync-enter'));await replayClosed(f,after);
+}));
+async function qaControl(f,action){
+ if(!f.qaControlFetch){assert.equal(typeof f.mf.getWorker,'function','actual Miniflare getWorker API is present');const worker=await f.mf.getWorker('qa-sdk');assert.equal(typeof worker.fetch,'function');f.qaControlFetch=worker.fetch.bind(worker);}
+ const response=await f.qaControlFetch('https://qa-fixture.invalid/fixture/notice-link-control',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action})});assert.equal(response.status,200);return response.json();
+}
+async function controlGate(f){
+ for(let n=0;n<500;n++){const data=await qaControl(f,'read');if(data.held==='link-write')return data;await new Promise(r=>setTimeout(r,10));}
+ assert.fail('actual QA fetch did not observe original TX DATA gate within original child');
+}
+for(const [mode,name]of [['link-hold-write','link-write'],['link-hold-commit','link-commit'],['link-hold-sync','link-sync'],['link-hold-readback','link-readback']])test('native notice link held native work and cancellation retain scope '+mode,()=>withIssued(async f=>{
+ const dispatch=f.mf.dispatchFetch.bind(f.mf);let pendingConsent=null,competingHttp=null,httpSettled=false,httpStatus=null,httpError=null,originalAborted=false;
+ if(mode==='link-hold-write'){
+  const data=await qaControl(f,'reset'),actor=await plain(f.stub.noticeLinkControlRead());assert.equal(data.visible,true);assert.equal(actor.visible,true);assert.equal(actor.marker,data.marker);
+ }
+ try{
+  await ticket(f);await f.stub.noticeConfigure(mode);const pending=pendingConsent=consent(f);
+  if(mode==='link-hold-write'){
+   const data=await controlGate(f);assert.equal(data.entered,1);assert.equal(data.txStarted,true);assert.equal(data.txSettled,false);assert.equal(data.expired,false);
+   console.info('LINK native DATA visibility',JSON.stringify({actualQaFetch:true,actorShared:true,originalTxEntered:data.entered,nativeTransactionPending:!data.txSettled}));
+   await (await dispatch(f.source.origin+'/fixture/consent-abort')).body?.cancel();originalAborted=true;
+   competingHttp=dispatch(f.source.origin+'/monitoring',{headers:f.headers,redirect:'manual'}).then(response=>{httpSettled=true;httpStatus=response.status;return response;},error=>{httpSettled=true;httpError=String(error?.message);return null;});
+   await new Promise(r=>setTimeout(r,25));const during=await qaControl(f,'read');
+   assert.equal(during.held,'link-write');assert.equal(during.txStarted,true);assert.equal(during.txSettled,false);assert.equal(during.txOutcome,null);assert.equal(during.expired,false);assert.notEqual(httpStatus,200);
+   console.info('LINK native TX HTTP observation',JSON.stringify({requestSettledDuringHeld:httpSettled,statusDuringHeld:httpStatus,errorDuringHeld:httpError,controlHeld:during.held,nativeTxSettled:during.txSettled,nativeTxOutcome:during.txOutcome,classification:httpSettled?'closed response while native TX pending':'native HTTP pending at bounded observation'}));
+   await qaControl(f,'release');await denied(await pending);const competingResponse=await competingHttp;assert.equal(httpError,null);assert(competingResponse);await denied(competingResponse);
+   const after=await qaControl(f,'read');assert.equal(after.settled,1);assert.equal(after.expired,false);assert.equal(after.txSettled,true);assert(['fulfilled','rejected'].includes(after.txOutcome));
+   console.info('LINK native original transaction settlement',JSON.stringify({settled:after.txSettled,outcome:after.txOutcome,httpStatus,noLateSuccess:true}));
+  }else{
+   await gate(f,name);assert.equal((await plain(f.stub.noticeProbe())).allowed,false,'fresh native request denied while actual work outstanding');
+   await (await dispatch(f.source.origin+'/fixture/consent-abort')).body?.cancel();originalAborted=true;await denied(await pending);
+   assert.equal((await plain(f.stub.noticeProbe())).allowed,false,'aborting original request is not settlement');await f.stub.noticeReleaseHeld();
+  }
+  await settled(f);const after=await plain(f.stub.noticeInspect());assert.equal(after.events.length,1);assert.equal(after.notice.length,5);
+  const s=await state(f);assert.equal(countWrites(s),1);assert(!s.trace.some(v=>v.position==='complete'));await replayClosed(f,after);
+ }finally{
+  if(mode==='link-hold-write'){
+   if(!originalAborted)await (await dispatch(f.source.origin+'/fixture/consent-abort')).body?.cancel();
+   await qaControl(f,'release');
+   for(const actual of [pendingConsent,competingHttp])if(actual){const response=await actual;await response?.body?.cancel().catch(()=>{});}
+  }
+ }
+}));
+for(const [mode,name]of [['link-before','before-link'],['link-hold-commit','link-commit']])test('native notice link original child expires without renewal '+mode,()=>withIssued(async f=>{
+ await ticket(f);await f.stub.noticeConfigure(mode);const pending=consent(f),seen=await gate(f,name);
+ const at=await plain(f.stub.noticeInspect()),send=JSON.parse(at.notice.find(([key])=>key.endsWith('consent:send'))[1]);assert(seen.state.trace.some(v=>v.gate===name&&v.at<send.window.deadline));
+ await new Promise(r=>setTimeout(r,Math.max(0,send.window.deadline-Date.now()+25)));await denied(await pending);assert.equal((await plain(f.stub.noticeProbe())).allowed,false);
+ await f.stub.noticeReleaseHeld();await settled(f);const after=await plain(f.stub.noticeInspect());assert.equal(after.events.length,1);assert.equal(after.notice.length,5);
+ const s=await state(f);assert.equal(countWrites(s),mode==='link-before'?0:1);assert.equal(Boolean(await linkEntry(f)),mode==='link-hold-commit');assert(!s.trace.some(v=>v.position==='complete'));await replayClosed(f,after);
+}));
+for(const drift of ['owner','revision','QA','M','holder','exchange'])test('native notice link current facts drift at final recheck '+drift,()=>withIssued(async f=>{
+ await ticket(f);await f.stub.noticeConfigure('link-drift');const pending=consent(f);await gate(f,'link-between');assert(await linkEntry(f));
+ if(drift==='owner')await f.db.prepare("UPDATE site_projects SET user_id='SYN NEGATIVE owner' WHERE id=?").bind(f.identity.projectId).run();
+ if(drift==='revision')await f.db.prepare('UPDATE site_projects SET revision=revision+1 WHERE id=?').bind(f.identity.projectId).run();
+ if(drift==='M')f.phaseCurrent.receipt.deploymentId='99999999-9999-4999-8999-999999999999';
+ if(drift==='QA'){f.phaseQaObservation=1;f.phaseDrift='qa-pointer';}
+ if(drift==='holder')await f.stub.sdkReplaceHolder();
+ if(drift==='exchange'){const value=new Date(Math.max(Date.parse(f.grant.created_at),Date.now()-1)).toISOString();await f.db.prepare('UPDATE delegated_access_grants SET exchanged_at=? WHERE id=?').bind(value,f.identity.grantId).run();}
+ await f.stub.noticeReleaseHeld();await denied(await pending);const after=await plain(f.stub.noticeInspect());assert.equal(after.events.length,1);assert.equal(after.notice.length,5);assert(await linkEntry(f));assert.equal(countWrites(await state(f)),1);
+}));
+test('native notice link factual mismatch denies valid codec and journal data',()=>withIssued(async f=>{
+ const after=await success(f),event=after.events[0],grant=await plain(f.stub.sdkGrant(f.identity.grantId)),baselineInserts=consentInserts(await state(f));assert.equal(baselineInserts,1);
+ for(const kind of ['eventHash','grantHash','sequence','preconnectionId','future','before-ack','after-deadline']){
+  const proof=await plain(f.stub.noticeLinkCorrupt(kind));assert.equal(proof.codecRoundtrip,true,kind);assert.equal(proof.journalValid,true,kind);
+  assert.equal((await plain(f.stub.sdkReadCurrent())).status,'unavailable',kind);const s=await state(f);assert(s.trace.some(v=>v.correlator==='noticeLink'&&v.phase==='enter'),kind+' reaches actual correlator');assert(!s.trace.some(v=>v.correlator==='noticeLink'&&v.phase==='exit'),kind+' fails actual predicate');assert.equal(countWrites(s),0);assert.equal(consentInserts(s),baselineInserts);
+  assert.deepEqual((await plain(f.stub.noticeInspect())).events,[event]);assert.deepEqual(await plain(f.stub.sdkGrant(f.identity.grantId)),grant);await f.stub.noticeLinkRestore(proof.original);
+ }
+}));
+for(const missing of ['ack','unknown-send','no-mutation','freeze','withdrawal'])test('native notice link missing source evidence never becomes authority '+missing,()=>withIssued(async f=>{
+ await success(f);const entry=await linkEntry(f);
+ if(missing==='freeze')await f.stub.noticeCorrupt('freeze');
+ else if(missing==='withdrawal'){
+  const original=await plain(f.stub.noticeInspect());assert.deepEqual(await plain(f.stub.noticeOrdinaryRead()),{enabled:true});
+  const withdrawn=await plain(f.stub.noticeOrdinaryWithdraw());assert.equal(withdrawn.status,200);assert.equal(withdrawn.action,'revoke');
+  const after=await plain(f.stub.noticeInspect());assert.equal(after.events.length,2);assert.deepEqual(after.events[0],original.events[0]);assert.deepEqual(after.notice,original.notice);assert.deepEqual(after.tickets,original.tickets);assert.deepEqual(await plain(f.stub.noticeOrdinaryRead()),{enabled:false});assert.deepEqual(await plain(f.stub.sdkGrant(f.identity.grantId)),f.grant);
+ }else await f.stub.noticeLinkMissing(missing);
+ const before=await plain(f.stub.noticeInspect());await replayClosed(f,before);assert.deepEqual(await linkEntry(f),entry);assert.equal((await plain(f.stub.sdkReadCurrent())).status,'unavailable');
+}));
+for(const reduction of ['CLOSE','revokeGrant'])test('native notice link real reduction preserves event and link '+reduction,()=>withIssued(async f=>{
+ const before=await success(f),entry=await linkEntry(f);
+ if(reduction==='CLOSE'){assert.equal((await plain(f.stub.noticeFence())).status,'fenced');assert.deepEqual(await plain(f.stub.sdkGrant(f.identity.grantId)),f.grant);}
+ else{assert.equal((await plain(f.stub.sdkReduceOriginal())).reduction,'revoked');assert.notEqual((await plain(f.stub.sdkGrant(f.identity.grantId))).revoked_at,'');assert.deepEqual(await plain(f.stub.noticeOrdinaryRead()),{unavailable:true,message:'Monitoring authorization unavailable'});}
+ await replayClosed(f,before);assert.deepEqual(await linkEntry(f),entry);
+}));
```
