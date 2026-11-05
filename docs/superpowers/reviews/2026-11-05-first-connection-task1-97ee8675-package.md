# Fresh Task 1 review package

PROJECT AFW; repo tokenizartinfo-ops/agent-friendly-web; SOURCE ONLY GitHub/Actions SYN. Read-only review; no runtime, main/merge, credentials or tests. Writer STOPWRITES.

BASE c55d4eda1eeaf80341c8abd6c85b76dc662614f5; FINALHEAD 97ee8675e614032af2f3caa9fe3eaa24d991c7d1; final tree18da25213809aae9324caabeb255d010e855b0d0. Code checkpoint1d5b25544077bfcd88019e6804ab83ed7d3d79c3/tree429ab1c65e6f065f451db3bf9308aa2ace09c4f3, qualifier removed. Final report blob9f71c6acd260a36774fee7b7f05902a3cdc524dd (full content follows), progress blob2e45ca39e0bd8ba0a0d475ea1a9ad01ebcb3f811. Root independently verified final diff9paths (7code/test+report+progress), all28parents linear exact, ref=head and seven final code blobs matching the tested22ce files. All other BASE paths unchanged by final tree compare.

Task1 only: shared fixed provider engine + factual one-shot enrollment helper, existing caller behavior retained. Task2 mounts/Task3 producer are inactive; their absence is intentional. Spec/plan/brief/preflight at c55 remain unchanged. Read plan global constraints and Task1, plus design section6; no need to review prior accepted Link.

Root independently read primary logs: RED2run42129895780/job1276035462324=1baselinePASS3causalFAIL. Finalcontracts42131020681/job12760734651527PASS/0FAIL/0CANCEL/0SKIP,43145.616811ms, lint7exit0. Reused distinct successful graph1 and setup3 from42130466031 (whole run failed contracts18P9F, not called all-green); P1/P2/P3 code blobs unchanged. Root verified final artifact13462972310 digestd9719bec4c21b1e969a5f7f5268746d53a46db5de77b008fe5b7b3ee920a0d21, head22ce, expires12Nov23:40:23UTC. Failed runs and causal diagnoses preserved in full report. Actual graph sizes/hashes not emitted; do not invent them. No additional build or test repetition required for review.

M1 baselineSdkReadCurrent old unknown2failures and M2 toolchain/RPC warnings deferred wholebranch; not repaired here. SQLConsentMinor closed. operationalReadiness=false;completePackage=false;PCoff=false. Source ceiling3Nov expired, unchanged.

## Final diff stat

- docs/superpowers/progress/2026-11-05-finite-native-first-connection-publication.es.md +19 -0 blob2e45ca39e0bd8ba0a0d475ea1a9ad01ebcb3f811
- docs/superpowers/reports/2026-11-05-finite-native-first-connection-publication-task1.md +328 -0 blob9f71c6acd260a36774fee7b7f05902a3cdc524dd
- lib/mcp-qa-finite-fixed-policy-engine.mjs +97 -0 blobe131f5b22f8f0e54fb61e2f2a131c64798b1d4eb
- lib/mcp-qa-finite-policy-transport.mjs +14 -122 blobfa1cb012d65acc0457f7263d01bb5fd88a0cb8a6
- lib/mcp-qa-finite-preparation-enrollment-writer.mjs +102 -0 blob6eb0f08d581faef8ee12ce4f9e0d62cebdfb57f9
- test/fixtures/finite-first-connection-publication.mjs +91 -0 blobb35417d32a8dcadc5df88b45c20a6e47b5c607e3
- test/fixtures/finite-initial-entry-world.mjs +6 -3 blobb0649c34117cafb8603e9b929a40147cd51df0d1
- test/mcp-qa-finite-first-connection-publication.test.mjs +87 -0 blob6e4ff024f1f61e77731fc8c108b7143f0d60577f
- test/mcp-qa-finite-policy-transport.test.mjs +29 -4 blob3ca6cc31ef5e04a0232c447c77986a9e6609bbad

## Full implementation report (verbatim)

# Task1 — helpers fijos y enrollment factual compartidos

Estado: IMPLEMENTED / pendiente de revisión fresca Root. DONE_WITH_CONCERNS por los warnings detallados abajo; no autoaceptación. SOURCE ONLY / SYN / UNMOUNTED. operationalReadiness=false; completePackage=false; PCoff=false.

## Identidad y checkpoint

PROJECT=AFW; REPOSITORY=tokenizartinfo-ops/agent-friendly-web (PUBLIC 1347578006); ENVIRONMENT=GitHub SOURCE/Actions SYN; ORIGIN=GitHub API; RESOURCE_TYPE=branch; RESOURCE_ID=feat/finite-native-cleanup-20261101; ALLOWED_ACTION=Task1, qualifier temporal, informe/ledger. Sin Task2/Task3, main/merge, provider real, Cloudflare, secretos, roles/OAuth operativo ni procesos/dependencias/build/tests locales.

BASE c55d4eda1eeaf80341c8abd6c85b76dc662614f5, tree 9b463ea4b4603be08233a7703af1e09142daced4.
Code checkpoint sin qualifier 1d5b25544077bfcd88019e6804ab83ed7d3d79c3, tree 429ab1c65e6f065f451db3bf9308aa2ace09c4f3. El informe y el ledger son descendientes docs-only; Root verifica su HEAD final aparte para evitar un hash autorreferente.

Brief 57a5a7692b63ddc98560aac62d7b30851f8527bd; diseño 0ac493fbc1f665cf3001e80f226c4c6e76aaf6c1; globals/Task1/interfaces del plan c9262d59f5b533b90a234a0e5e7e470d4f10a2c0; preflight 96bbc3b6358bdd309c0da81c27ea88d1a13fdc27 leídos. El despacho Root activó sólo Task1 y reconcilió Link aceptado dba6cde8/code33d3739; no se rehízo Link.

## Resultado e interfaces

- P1 createFiniteFixedPolicyEngine({ctx,env},guard) devuelve un objeto frozen con exactamente describeUpload/upload/describeActivation/activate/readPointer/readVersion. URL absoluta literal de upload y activation; método/body idénticos a los antiguos ROOT+path; sin http/wire/target/token/ctx/setters exportados. Secret bindings usan inherit con el baselineVersionId inmediato, nunca valores de secretos.
- El engine conserva validadores, límites 4718592, UUID/reconciliation/role/current metadata y referencias capturadas. El cambio intencional es observar un fallo lógico conocido antes de una cancelación retenida: fetch/read/cancel y el trabajo real permanecen retenidos hasta su settlement. El fallo del engine es absorbente.
- P2 prepareFinitePreparationEnrollmentWrite(options,childLease,childDeadline) captura DATA/bytes defensivos/nativos/anchors/ownerRows y devuelve sólo recordEnrollment()/recordAck(). Cada método se consume antes del primer await. No consume admisión, no concede SEND, no devuelve callback/source/ctx y no reanuda después de resultado desconocido.
- El Ack privado se crea después del primer readback/cleanup, antes de retornar recordEnrollment y antes del segundo qualified del caller. P3 conserva su admisión owner única, qualifieds originales, la misma child y el resultado externo admin_pending. Setup mantiene su admisión independiente y PolicySend/Ack/Receipt; requestHash usa request.path absoluto exactamente una vez.
- La extracción no añade dependencias a las 18 rutas de imports existentes combinadas; P1/P2/P3 no importan phase-context/residency/bootstrap QA. El compilador SOURCE existente calificó ambos bundles en el test permitido; no se alteraron compilador/perfiles/wrangler.
- F1/F2 reutilizan initial real del harness en modo first-connection-enrollment-component. Los records de aprobación son DATA SYN explícita para probar un writer factual aislado: no permiso humano ni predecessor positivo T3. Cada escenario compara uploads/activations antes/después (cero POST adicionales del componente) y exige cero Policy effects/ConnectionReceipt.

## Cronología literal preservada

Antes de extraer, el writer antiguo ejecutó en 42129895780 la secuencia nativa siguiente; los records Enrollment/Ack completos están en sus logs SYN. El caller antiguo después de la extracción y el componente normal comparan esta misma secuencia:

```json
["put:enrollment","transaction-settled","sync","get:enrollment","alarm","list:","alarm","get:enrollment","put:ack","transaction-settled","sync","get:ack","alarm","list:","alarm","get:ack","get:enrollment"]
```

Se preservan keys, caps, C0/I0/C1, alarm, hashes enlazados, ownerRows/anchors, exclusiones de otras fases y bytes. C0=I0+900000 y C1=C0+180000. Fuente operativa de 2026-11-03T02:59Z permanece vencida; ningún techo operativo se renueva. Parent original <=30000ms y child <=5000ms siguen en P3, sin editar su implementación. P2 sólo estrecha la child recibida. El componente nuevo no parchea reloj; el test de referencia conserva el harness SYN de tiempo ya existente para reproducir el caller antiguo.

## RED, diagnósticos y GREEN: primarias completas

Todos los runs son push/attempt1, Node22.23.4/npm10.9.9, npm ci --ignore-scripts --no-audit --no-fund, checkout persist-credentials:false, contents:read, sin secretos configurados en workflow, máximo3jobs de15min. No rerun manual, retry, sleeps nuevos, cambios de deadline ni clock patch para ocultar errores.

| Run / HEAD | Job | Resultado observado |
|---|---|---|
|42129592527 / aee616f3629d54d656a255461955a0bba8b8eda2|127602521670|RED 3 tests / 0PASS / 3FAIL / 0SKIP: helpers ausentes y known failure esperando cancel. El primer probe cruzaba request al liberar; se corrigió el probe para mantener su request original antes del RED2.|
|42129895780 / 95cedf06d296a2f502d6223a5f8c376b6f86f91e|127603546232|RED2 4 / 1PASS referencia nativa / 3FAIL causales / 0SKIP. Capturó datos/traza del writer antiguo antes de extracción. Known failure mostró failed:false/settled:false con cancelStarted:true/cancelSettled:false.|
|42130466031 / 7f911e29677d2980e48b392a65999f8e0574b9f3|127605478583|Primer GREEN candidato 27 / 18PASS / 9FAIL / 0SKIP. Ocho fallos Miniflare parseAsyncResponse(typeHeader==='Promise') sin observaciones recuperadas del probe; no probaban si el helper había corrido. Uno en wiredescription: el test cambió fetch y luego usó el engine capturado anterior, por lo que el guard denegó correctamente.|
|42130466031 / mismo HEAD|127605478876|Setup 3PASS / 0FAIL / 0SKIP, 8919.112819ms.|
|42130466031 / mismo HEAD|127605478869|Compiler staging existente 1PASS / 0FAIL / 0SKIP, 510.098052ms; lint7paths exit0/sin diagnósticos.|
|42130778246 / 4efccf03a944284f7a13dbc9bd23b6989782d51b|ninguno|Qualifier inválido:0jobs/0tests. Error del implementer: String.replace interpretó literal $' como sufijo e introdujo una línea YAML inválida. Corregido con callback de replacement que preserva literal; no es fallo de producto.|
|42130861278 / ce61b8173d8e8ce8b4696fdd70a3842e3c26ad58|127606802627|Diagnóstico: dos casos nombrados, normal FAIL y wiredescription PASS; Node contó además un file-wrapper PASS sin matches en T1 (3=2P1F, no se acredita como tercer caso). Outer wrapper factual expuso hashFinitePreparationRecord→shape/fields desde F1 setup.|
|42131020681 / 22ce84052756936d612b046a84b6500f5773937d|127607346515|GREEN final 27PASS / 0FAIL / 0CANCEL / 0SKIP, 43145.616811ms; lint7paths exit0/sin diagnósticos.|

Causa confirmada del setup DATA: faltaban purpose contractuales en ConfigurationApproval y TicketUse antes de llamar P2; se añadieron sólo en F1. El wrapper de diagnóstico conserva el error como DATA, no lo oculta. Las negativas ahora exigen writer-prepared, y unknown exige el append causal correspondiente: un fallo anterior de setup no cuenta como prueba de rechazo. La prueba de wire calcula las descripciones antes de cambiar fetch, y usa un engine nuevo con su captura para ejecutar ambos requests; el test separado de drift sigue exigiendo rechazo absorbente y cero provider efectos.

Comando RED/RED2:
```sh
node --test --test-reporter=spec --test-concurrency=1 --test-name-pattern='^T1 ' test/mcp-qa-finite-policy-transport.test.mjs test/mcp-qa-finite-first-connection-publication.test.mjs
```

Comando GREEN final completo, sin filtros ni archivos vacíos:
```sh
node --test --test-reporter=spec --test-concurrency=1 test/mcp-qa-finite-policy-transport.test.mjs test/mcp-qa-finite-first-connection-publication.test.mjs
```

27 casos reales =14 existentes +13 nuevos. Nuevos: nombres exactos fixed engine exposes only finite operations; enrollment preserves literal chronology and one shot; baseline enrollment chronology remains native and pending; siete expansiones factual enrollment refuses [double-enrollment,ack-first,double-ack,unknown-enrollment,unknown-ack,holder-drift,deadline] without repeated IO; fixed descriptions preserve literal wire and secret baseline inheritance; engine holder drift is absorbing before another provider effect; known failure retains real cancellation. Todos llevan prefijo T1 y PASS en final.

Selección setup exacta (tres nombres coincidentes, cero wrappers/skips):
```sh
node --test --test-reporter=spec --test-concurrency=1 --test-name-pattern='^Task4 (actual native wrapper DO store and two-effect engine installs only actual ACK versions|lost activation ACK cannot produce installed receipt or repeat effects|held nested hydration retains original lineage after response until actual settlement)$' test/mcp-qa-finite-policy-setup-native.test.mjs
```

Única compilación staging permitida:
```sh
node --test --test-reporter=spec --test-concurrency=1 --test-name-pattern='^actual compiler staging hashes final bytes and retains source classes without eligible manifest$' test/build-finite-native-package.test.mjs
```

Lint final:
```sh
npx --no-install eslint lib/mcp-qa-finite-fixed-policy-engine.mjs lib/mcp-qa-finite-preparation-enrollment-writer.mjs lib/mcp-qa-finite-policy-transport.mjs test/mcp-qa-finite-policy-transport.test.mjs test/mcp-qa-finite-first-connection-publication.test.mjs test/fixtures/finite-first-connection-publication.mjs test/fixtures/finite-initial-entry-world.mjs
```

Graph/setup no se repitieron: readback de P1/P2/P3 y los inputs producto/compilador protegidos idéntico; compare 7f911e29→code checkpoint sólo muestra cambios F1/T2 y retirada qualifier. La compilación sigue acreditada EN 7f911e29; no se atribuyen sus bundles/hashes a un commit final posterior, ni a runtime.

## Artefactos y métricas disponibles

Metadata GitHub readback verificada; digest SHA256 del ZIP según job y API de artifacts (sin descargar ZIP local):

|Run|Artifact ID/name|BytesZIP|Digest SHA256|Expira UTC|
|---|---|---:|---|---|
|42131020681|13462972310 task1-contracts|2543|d9719bec4c21b1e969a5f7f5268746d53a46db5de77b008fe5b7b3ee920a0d21|2026-11-12T23:40:23Z|
|42130466031|13463167108 task1-setup|419|b94f51b8a4eef362b7f7d28131d040749cc579fa64c2be2404c82d679e43a317|2026-11-12T23:35:26Z|
|42130466031|13462817842 task1-graph|309|34177dae2a14be67b5fa147b12ed0beb247913fafef6bdade833253b5416f3a5|2026-11-12T23:35:13Z|
|42130466031|13463311361 task1-contracts (18P9F)|3255|f1248978f9cee3dc2d7a5d7df89f107f83260967e52ef2906aaf083c72fa2f5f|2026-11-12T23:36:04Z|

Los logs contienen el trace nativo/records SYN, requests/body/hash equality, actual cancel pendiente→settled y counts reales. El test compiler valida internamente hashes/metafiles; no los emitió ni se capturaron para este informe. No se inventan bytes M/QA/gzip, cantidades SQL/DO/fanout ni elapsed de root/child que el harness no emitió; las duraciones anteriores son del runner node:test. No se heredan 118/98 u otras cifras históricas.

## Blobs finales y protección

Code checkpoint diff BASE→HEAD: exactamente los siete paths autorizados; qualifier ausente (file-CAS delete + readback). Readback del contenido de los siete paths exacto a los enviados:

|Path|Blob|
|---|---|
|lib/mcp-qa-finite-fixed-policy-engine.mjs|e131f5b22f8f0e54fb61e2f2a131c64798b1d4eb|
|lib/mcp-qa-finite-policy-transport.mjs|fa1cb012d65acc0457f7263d01bb5fd88a0cb8a6|
|lib/mcp-qa-finite-preparation-enrollment-writer.mjs|6eb0f08d581faef8ee12ce4f9e0d62cebdfb57f9|
|test/fixtures/finite-first-connection-publication.mjs|b35417d32a8dcadc5df88b45c20a6e47b5c607e3|
|test/fixtures/finite-initial-entry-world.mjs|b0649c34117cafb8603e9b929a40147cd51df0d1|
|test/mcp-qa-finite-first-connection-publication.test.mjs|6e4ff024f1f61e77731fc8c108b7143f0d60577f|
|test/mcp-qa-finite-policy-transport.test.mjs|3ca6cc31ef5e04a0232c447c77986a9e6609bbad|

Readback explícito BASE y code checkpoint, mismo blob en cada uno:

|Path protegido|Blob idéntico|
|---|---|
|lib/mcp-qa-finite-owner-phase-context.mjs|64039ec709053e2e82faf67ed013399244faee05|
|lib/mcp-qa-finite-owner-preparation.mjs|01ec291de2631a7cd7e527e2a567f44ac6067522|
|lib/mcp-qa-finite-policy-setup.mjs|34285e7c8ee3d9838763344edba2dcf6ce33da9b|
|lib/mcp-qa-finite-stage-work.mjs|a89baeb2578856dadedf700f9d66e180eb09120e|
|lib/mcp-qa-finite-policy-journal.mjs|6e3de33d04075740fb57e5f9afcf87dd9f68ee79|
|lib/mcp-qa-finite-preparation-records.mjs|e9b66f68b6dbabbfecc46072949a0d5d9f059141|
|lib/mcp-qa-finite-preparation-cleanup-records.mjs|7ae2b380a7b9c88164e6c7934ec7b6fc1577e49b|
|lib/mcp-qa-finite-connection-source.mjs|703bada5189efc962e1f81760ff741de518b77b9|
|worker/mcp-own/finite.mjs|baa374a2ed41cdb637c23357a3d9d5f3e4ae9d0b|
|worker/independent-closure/finite.mjs|bf32c10f01cd2cc4acda3b9cb4dc81f5eb422149|
|scripts/build-finite-native-package.mjs|e8a73ce9f541993657bf8bf4c9bd8d3b02b8598d|
|test/mcp-qa-finite-policy-setup-native.test.mjs|e9701d02edefb4ead10de2c1b447f062b4cb4bfe|
|test/build-finite-native-package.test.mjs|3b20f8a64ffbb6cfdb033c9c0941e9acd028032e|

El diff completo también excluye todos los demás módulos/DDL/records/store/journals/profiles/source stubs/ordinary handlers; no se cambió admission ni PhaseContext. Tras este informe sólo se añade este reporte y se actualiza el ledger autorizado.

## Mutación REST, parents y rollback SOURCE

create_tree/create_commit crearon el RED no enlazado 63ac62652af1530a1542de646f10ae0d46501499/tree771ab2898ebab814ba181184b2524771178f9b0d. update_ref CAS falló con GQL interno el 2026-11-05T23:24:31Z, referencia A1FE:1838EA:EB73F:18BCC3:6AED102F; readback SOURCE siguió en BASE, sin retry ciego. No se atribuye a permisos.

Ruling Root explícito: fallback REST contents API por archivo con branch explícita, SHA-CAS de blob/ausencia para create, writer exclusivo y readback parent/ref/delta de1path/contenido. No es atomicidad multiarchivo ni branch-CAS. Cada mutation siguiente fue secuencial; antes de lotes se retiró qualifier, y se recreó último. El primer lote REST terminó en tree771ab289 idéntico al RED no enlazado. La comparación estándar diverged usa merge-base; la igualdad de tree es la prueba del mismo contenido.

Cadena exacta hasta el checkpoint (cada parent/head/tree/path/blob verificado por GitHub; null es eliminación de nuestro qualifier):
```json
[
  {
    "parent": "c55d4eda1eeaf80341c8abd6c85b76dc662614f5",
    "head": "1f16b7643e9d942ab89314b7e068b02aee6c8687",
    "tree": "9a4aa7c75c1ba5b680bb7fc4cb201369bfd9eb9f",
    "path": "test/mcp-qa-finite-policy-transport.test.mjs",
    "blob": "02d64c3f846656665e4d3675271bbef3aebcb5f8"
  },
  {
    "parent": "1f16b7643e9d942ab89314b7e068b02aee6c8687",
    "head": "d540cf853d94b059d95df0794fea7dd224f96fc9",
    "tree": "2db32ea015a887515d5f4c9534558f424b782152",
    "path": "test/mcp-qa-finite-first-connection-publication.test.mjs",
    "blob": "7cc3a4ce8e681a7217d66b3b799fed91e933b5e6"
  },
  {
    "parent": "d540cf853d94b059d95df0794fea7dd224f96fc9",
    "head": "aee616f3629d54d656a255461955a0bba8b8eda2",
    "tree": "771ab2898ebab814ba181184b2524771178f9b0d",
    "path": ".github/workflows/afw-first-connection-qualification.yml",
    "blob": "ce67b8435b41d585644f6debfbe7f80e22448068"
  },
  {
    "parent": "aee616f3629d54d656a255461955a0bba8b8eda2",
    "head": "625106a1fed8b0c871730b30ca2b694f7538d9b1",
    "tree": "2db32ea015a887515d5f4c9534558f424b782152",
    "path": ".github/workflows/afw-first-connection-qualification.yml",
    "blob": null
  },
  {
    "parent": "625106a1fed8b0c871730b30ca2b694f7538d9b1",
    "head": "751e14376a6f7a515428230ef1c2dd6d2e510f2d",
    "tree": "f5f9ca84144f43413a4f94048b11a5a828c872b6",
    "path": "test/fixtures/finite-first-connection-publication.mjs",
    "blob": "f7406af281aaafb32f69faa51382e6ab9616992c"
  },
  {
    "parent": "751e14376a6f7a515428230ef1c2dd6d2e510f2d",
    "head": "e6278f53c11ae9caebc06d8ced22d322363e81bf",
    "tree": "773df74582dc083a040bad67053aa1d6263cc659",
    "path": "test/fixtures/finite-initial-entry-world.mjs",
    "blob": "b0649c34117cafb8603e9b929a40147cd51df0d1"
  },
  {
    "parent": "e6278f53c11ae9caebc06d8ced22d322363e81bf",
    "head": "465ab88f5feae0cc7a66dfe3c686676479e6323f",
    "tree": "734bc4724edaf1d78f4bd965138ba1aed8b4b64e",
    "path": "test/mcp-qa-finite-first-connection-publication.test.mjs",
    "blob": "22ac9a7377d0528c78261e88dd86d7641b58bdbb"
  },
  {
    "parent": "465ab88f5feae0cc7a66dfe3c686676479e6323f",
    "head": "3c52c0b0cc496c1e7e697e9f909093a7088801cb",
    "tree": "63e14c98706ac0b090f5ec1008d5047eaaba620f",
    "path": "test/mcp-qa-finite-policy-transport.test.mjs",
    "blob": "02c9e55a01602def03418a070ceea8ab0ed039b3"
  },
  {
    "parent": "3c52c0b0cc496c1e7e697e9f909093a7088801cb",
    "head": "95cedf06d296a2f502d6223a5f8c376b6f86f91e",
    "tree": "4949dd33636e3f796cd69647cea951bcc652b64c",
    "path": ".github/workflows/afw-first-connection-qualification.yml",
    "blob": "ce67b8435b41d585644f6debfbe7f80e22448068"
  },
  {
    "parent": "95cedf06d296a2f502d6223a5f8c376b6f86f91e",
    "head": "874c5c913175a28af125d4134054b36f1d347b58",
    "tree": "63e14c98706ac0b090f5ec1008d5047eaaba620f",
    "path": ".github/workflows/afw-first-connection-qualification.yml",
    "blob": null
  },
  {
    "parent": "874c5c913175a28af125d4134054b36f1d347b58",
    "head": "ee60aa7e5a730dae184b15530f5afb186b36c2a1",
    "tree": "d792a0f91f478a978b12a83f698b87120221c87c",
    "path": "lib/mcp-qa-finite-fixed-policy-engine.mjs",
    "blob": "e131f5b22f8f0e54fb61e2f2a131c64798b1d4eb"
  },
  {
    "parent": "ee60aa7e5a730dae184b15530f5afb186b36c2a1",
    "head": "72ea21061d888b932a7cdd83d85bee42b84c6e73",
    "tree": "394f17b5a1e78f45483b05af2ccb33ba787d1e3d",
    "path": "lib/mcp-qa-finite-preparation-enrollment-writer.mjs",
    "blob": "6eb0f08d581faef8ee12ce4f9e0d62cebdfb57f9"
  },
  {
    "parent": "72ea21061d888b932a7cdd83d85bee42b84c6e73",
    "head": "4b251e49eaa05a018bc7ca0cb282fa401519bd5f",
    "tree": "e1509018b0e5d2b7a3e07ef2004fbb6694b38918",
    "path": "lib/mcp-qa-finite-policy-transport.mjs",
    "blob": "fa1cb012d65acc0457f7263d01bb5fd88a0cb8a6"
  },
  {
    "parent": "4b251e49eaa05a018bc7ca0cb282fa401519bd5f",
    "head": "72f309e8484951a588d9118e981b1dda0acdbb81",
    "tree": "0e383bb7153e669b8f8a1fae5eaaaad980a259c3",
    "path": "test/fixtures/finite-first-connection-publication.mjs",
    "blob": "c35239c8dc6ba02d88352ac6a8960e3e6836175d"
  },
  {
    "parent": "72f309e8484951a588d9118e981b1dda0acdbb81",
    "head": "ef4837f02d8ac1019f0deefeec8fe84afaf36e3b",
    "tree": "9f6b9a94ef80bd67ea18ba54b5b137c4e7dcc944",
    "path": "test/mcp-qa-finite-policy-transport.test.mjs",
    "blob": "3ca6cc31ef5e04a0232c447c77986a9e6609bbad"
  },
  {
    "parent": "ef4837f02d8ac1019f0deefeec8fe84afaf36e3b",
    "head": "2869544d7e3ee5a367678788fd1bdca1aeb9af79",
    "tree": "5486a2339d9bd300df093873a82b42e341d7a2f6",
    "path": "test/mcp-qa-finite-first-connection-publication.test.mjs",
    "blob": "82995e760970708505661aac58e6e1e22bfbdbe4"
  },
  {
    "parent": "2869544d7e3ee5a367678788fd1bdca1aeb9af79",
    "head": "7f911e29677d2980e48b392a65999f8e0574b9f3",
    "tree": "d6bd84e67048e5db4883d2e1d1d0ff4648294503",
    "path": ".github/workflows/afw-first-connection-qualification.yml",
    "blob": "e17412053597569c224fccc9b9351af98aaefc28"
  },
  {
    "parent": "7f911e29677d2980e48b392a65999f8e0574b9f3",
    "head": "5a5a7bf0b4e0c122ae914467e9446d385b11c63a",
    "tree": "5486a2339d9bd300df093873a82b42e341d7a2f6",
    "path": ".github/workflows/afw-first-connection-qualification.yml",
    "blob": null
  },
  {
    "parent": "5a5a7bf0b4e0c122ae914467e9446d385b11c63a",
    "head": "93c30adb1e9fa813e84243e53961b48401a52790",
    "tree": "3a5d5f27bd7c32214389900cc5dbaba667a9591f",
    "path": "test/fixtures/finite-first-connection-publication.mjs",
    "blob": "38f174cb89c6d27aab024372d7453ec717b1fc33"
  },
  {
    "parent": "93c30adb1e9fa813e84243e53961b48401a52790",
    "head": "82b342cb999aaecdcebf7da1e53fa5fd1c56c424",
    "tree": "fa99c2aabc2782a38e8032efec653b133e2eaa8e",
    "path": "test/mcp-qa-finite-first-connection-publication.test.mjs",
    "blob": "6e4ff024f1f61e77731fc8c108b7143f0d60577f"
  },
  {
    "parent": "82b342cb999aaecdcebf7da1e53fa5fd1c56c424",
    "head": "4efccf03a944284f7a13dbc9bd23b6989782d51b",
    "tree": "9a34ddccded5d1c6b1c957c217f9271008ccb5e9",
    "path": ".github/workflows/afw-first-connection-qualification.yml",
    "blob": "fbe77f2fee3c427c4a46a49fc2bf12ab0c2b2664"
  },
  {
    "parent": "4efccf03a944284f7a13dbc9bd23b6989782d51b",
    "head": "ce61b8173d8e8ce8b4696fdd70a3842e3c26ad58",
    "tree": "3c9124338ff2d12c7e309843d3814c4a61d9dc63",
    "path": ".github/workflows/afw-first-connection-qualification.yml",
    "blob": "9f6ccbe9a31ee4554b72b033441602bce37131cf"
  },
  {
    "parent": "ce61b8173d8e8ce8b4696fdd70a3842e3c26ad58",
    "head": "ec575083466ed9880044c6dd7cb7ad3756349389",
    "tree": "fa99c2aabc2782a38e8032efec653b133e2eaa8e",
    "path": ".github/workflows/afw-first-connection-qualification.yml",
    "blob": null
  },
  {
    "parent": "ec575083466ed9880044c6dd7cb7ad3756349389",
    "head": "26f25a2c1e55daf901a87f0e04ab75c56b404e92",
    "tree": "429ab1c65e6f065f451db3bf9308aa2ace09c4f3",
    "path": "test/fixtures/finite-first-connection-publication.mjs",
    "blob": "b35417d32a8dcadc5df88b45c20a6e47b5c607e3"
  },
  {
    "parent": "26f25a2c1e55daf901a87f0e04ab75c56b404e92",
    "head": "22ce84052756936d612b046a84b6500f5773937d",
    "tree": "58f72a752056b388d99e624f62179977be48d1cf",
    "path": ".github/workflows/afw-first-connection-qualification.yml",
    "blob": "a9a7c9779bd83346ffa851ae85048f65e7e36e1f"
  },
  {
    "parent": "22ce84052756936d612b046a84b6500f5773937d",
    "head": "1d5b25544077bfcd88019e6804ab83ed7d3d79c3",
    "tree": "429ab1c65e6f065f451db3bf9308aa2ace09c4f3",
    "path": ".github/workflows/afw-first-connection-qualification.yml",
    "blob": null
  }
]
```

Rollback aplicable: sólo cambios propios, por fileSHA-CAS bajo el ruling o branchCAS cuando funcione, con readback del HEAD actual y preservación de cualquier cambio posterior. Sin force, borrado de historia, journals, tickets, grants, version history ni recursos provider. Ningún rollback operativo está autorizado por este reporte.

## Preocupaciones y cierre para Root

1. Final job emitió 9 warnings “An RPC stub was not disposed properly” y8 líneas de deprecación/toolchain. Se conservan como evidencia; no se afirma salida pristine ni se atribuyen todos a un baseline sin prueba. El warning de RPC también apareció en el writer de referencia previo a extracción; su ownership/limpieza queda para revisión Root/whole-branch. No hubo test failure final ni relajación de assertions por warnings.
2. M1 baseline sdkReadCurrent SYN con2 fallos previos desconocidos/no reproducidos permanece sin resolver por esta tarea; no se ejecutó ni se afirma arreglado. M2 warnings deferred whole-branch y Minor SQL Consent CLOSED permanecen registrados.
3. Task1 no produce first ConnectionReceipt ni acredita POST humano inicial, mounts, sourceCloudProof, compatibilidad de provider/custodia real, permisos, renovación del ceiling, guard activo, suscripción, entrega o PC apagado. Esas obligaciones siguen en Task2/Task3 y gates posteriores.

STOPWRITES después de reporte+ledger y readback final. Root asigna reviewer fresco; no se despacha reviewer ni helper propio, no se empieza Task2.


## Complete seven-path code/test delta BASE to FINALHEAD (U10)

The following full delta is Root-generated from exact fetched UTF8 blobs, not GitHub's potentially truncated patch. New files included in full. Unchanged long context lines are retained.


### lib/mcp-qa-finite-fixed-policy-engine.mjs

```diff
diff --git a/lib/mcp-qa-finite-fixed-policy-engine.mjs b/lib/mcp-qa-finite-fixed-policy-engine.mjs
--- /dev/null
+++ b/lib/mcp-qa-finite-fixed-policy-engine.mjs
@@ -0,0 +1,97 @@
+import {finiteFields as fields,finiteData as data} from './mcp-finite-evidence.mjs';
+import {finiteCfEnvelope} from './mcp-qa-finite-custody.mjs';
+import {qualifyFiniteWorkerVersion} from './mcp-finite-primary-inventory.mjs';
+import {activationConfigurationHash,finiteActivationConfigurationHash} from './mcp-activation-observer.mjs';
+import {restorationConfigurationHash} from './mcp-restoration-configuration.mjs';
+import {retainFiniteOwnerStagePromise as retain} from './mcp-qa-finite-stage-work.mjs';
+const ROOT='https://api.cloudflare.com/client/v4/accounts/85d0d5dadac3341a564f22ce885e9eec/workers/',W='agent-friendly-web-delegated-canary',MAX=4718592;
+const fail=()=>{throw Error('Finite policy transport unavailable');};
+const uuid=x=>typeof x==='string'&&/^[a-f0-9]{8}(-[a-f0-9]{4}){3}-[a-f0-9]{12}$/.test(x);
+const current=lease=>{if(lease.signal.aborted)fail();lease.assertCurrent();};
+function configurationProjection(v){
+ return Object.fromEntries(['compatibility_date','compatibility_flags','main_module','exports','bindings','usage_model','containers'].map(k=>[k,v[k]]));
+}
+function configuration(v){
+ const c=configurationProjection(v);finiteActivationConfigurationHash(c);return data(c);
+}
+function historicalConfiguration(v){
+ const c=configurationProjection(v);activationConfigurationHash(c);return data(c);
+}
+
+/** Internal fixed provider operations. Admission and source remain with callers. */
+export function createFiniteFixedPolicyEngine({ctx,env},guard){
+ const storage=ctx.storage,db=env.RELEASE_DB,fetcher=globalThis.fetch,readToken=env.AFW_MCP_CLOSURE_READ_TOKEN,publishToken=env.AFW_MCP_CLOSURE_PUBLISH_TOKEN;
+ let failed=false;
+ const check=c=>{
+  if(failed)fail();
+  try{
+   guard();if(c)current(c);
+   if(ctx.storage!==storage||env.RELEASE_DB!==db||globalThis.fetch!==fetcher||env.AFW_MCP_CLOSURE_READ_TOKEN!==readToken||env.AFW_MCP_CLOSURE_PUBLISH_TOKEN!==publishToken)fail();
+  }catch(error){failed=true;throw error;}
+ };
+ const invoke=async(c,operation)=>{try{check(c);const value=await operation();check(c);return value;}catch(error){failed=true;throw error;}};
+ async function http(method,path,body,c){
+  check(c);const token=method==='GET'?readToken:publishToken;
+  if(typeof token!=='string'||!/^[-A-Za-z0-9_]{16,4096}$/.test(token)||typeof fetcher!=='function'){failed=true;fail();}
+  let rejectKnown;
+  const knownFailure=new Promise((_,reject)=>{rejectKnown=reject;});
+  // work, fetch, read and cancel are their actual native Promises, retained
+  // separately from the logical first failure. Cancellation is never drain.
+  const work=retain((async()=>{
+   let response,reader;
+   try{
+    response=await retain(fetcher(path,{method,redirect:'manual',cache:'no-store',signal:c.signal,headers:{Authorization:'Bearer '+token,Accept:'application/json','Content-Type':'application/json','Cache-Control':'no-cache, no-store'},...(body?{body:JSON.stringify(body)}:{})}));
+    check(c);
+    if(!(response instanceof Response)||response.redirected||!(method==='GET'?response.status===200:[200,201].includes(response.status))||!response.body||!/^application\/json(?:\s*;|$)/i.test(response.headers.get('Content-Type')??''))fail();
+    const age=response.headers.get('Age'),cache=response.headers.get('CF-Cache-Status'),length=response.headers.get('Content-Length');
+    if(age!==null&&age!=='0'||cache!==null&&!['DYNAMIC','BYPASS','MISS'].includes(cache.toUpperCase())||length!==null&&(!/^\d+$/.test(length)||Number(length)>MAX))fail();
+    reader=response.body.getReader();const chunks=[];let size=0;
+    for(;;){const part=await retain(reader.read());check(c);if(part.done)break;size+=part.value.byteLength;if(size>MAX)fail();chunks.push(part.value);}
+    const raw=Buffer.concat(chunks,size);check(c);
+    return finiteCfEnvelope(JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(raw)));
+   }catch(error){failed=true;rejectKnown(error);throw error;}
+   finally{if(reader)await retain(reader.cancel()).catch(()=>{});else if(response?.body&&!response.body.locked)await retain(response.body.cancel()).catch(()=>{});}
+  })());
+  return Promise.race([work,knownFailure]);
+ }
+ function pointer(value,versionId,deploymentId){
+  const deployment=value?.deployments?.[0];
+  if(!Array.isArray(value?.deployments)||value.deployments.length!==1||deployment?.id!==deploymentId||deployment.strategy!=='percentage'||!Array.isArray(deployment.versions)||deployment.versions.length!==1||deployment.versions[0].version_id!==versionId||deployment.versions[0].percentage!==100)fail();
+ }
+ function wire(config,baselineId,bytes){
+  if(!uuid(baselineId)||!(bytes instanceof Uint8Array)||bytes.byteLength<1||bytes.byteLength>3145728)fail();
+  const value=configuration(config),out={...value,containers:value.containers.map(({class_name})=>({class_name})),bindings:value.bindings.map(b=>b.type==='secret_text'?{name:b.name,type:'inherit',version_id:baselineId}:b),modules:[{name:'index.mjs',content_type:'application/javascript+module',content_base64:Buffer.from(bytes).toString('base64')}]};
+  for(const binding of out.bindings)if(binding.type==='inherit')fields(binding,['name','type','version_id']);
+  return out;
+ }
+ function describeUpload({configuration,baselineVersionId,bytes}){
+  check();
+  try{return Object.freeze({method:'POST',path:ROOT+'workers/'+W+'/versions?deploy=false',body:wire(configuration,baselineVersionId,bytes)});}
+  catch(error){failed=true;throw error;}
+ }
+ function describeActivation({versionId}){
+  check();if(!uuid(versionId)){failed=true;fail();}
+  return Object.freeze({method:'POST',path:ROOT+'scripts/'+W+'/deployments',body:{strategy:'percentage',versions:[{version_id:versionId,percentage:100}]}});
+ }
+ function result(value){
+  if(!uuid(value?.id))fail();
+  const reconciliation=value.exports_reconciliation;
+  if(reconciliation!==undefined&&(!reconciliation||Object.keys(reconciliation).some(k=>!['created','deleted','renamed','transfer_pending','transferred','updated','removable_entries','info','warnings'].includes(k))||Object.entries(reconciliation).some(([key,items])=>!Array.isArray(items)||(key==='updated'?items.some(x=>x!=='AfwOwnEventNode'):items.length>0))))fail();
+  return value;
+ }
+ return Object.freeze({
+  describeUpload,
+  upload(input,c){return invoke(c,async()=>{const request=describeUpload(input);return result(await http(request.method,request.path,request.body,c));});},
+  describeActivation,
+  activate(input,c){return invoke(c,async()=>{const request=describeActivation(input);return result(await http(request.method,request.path,request.body,c));});},
+  readPointer(pin,c){return invoke(c,async()=>{if(!uuid(pin.versionId)||!uuid(pin.deploymentId))fail();pointer(await http('GET',ROOT+'scripts/'+W+'/deployments?per_page=1',null,c),pin.versionId,pin.deploymentId);});},
+  readVersion(pin,c,closed=false){return invoke(c,async()=>{
+   if(!uuid(pin.versionId))fail();
+   const value=await http('GET',ROOT+'workers/'+W+'/versions/'+pin.versionId+'?include=modules',null,c);check(c);
+   qualifyFiniteWorkerVersion({metadata:value,pin:{versionId:pin.versionId,module:pin.module,configurationHash:restorationConfigurationHash(pin.configuration)},role:'canary',closed});
+   if(closed){if(activationConfigurationHash(historicalConfiguration(value))!==activationConfigurationHash(historicalConfiguration(pin.configuration)))fail();}
+   else if(finiteActivationConfigurationHash(configuration(value))!==finiteActivationConfigurationHash(configuration(pin.configuration)))fail();
+   return value;
+  });}
+ });
+}
```

### lib/mcp-qa-finite-preparation-enrollment-writer.mjs

```diff
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
```

### lib/mcp-qa-finite-policy-transport.mjs

```diff
diff --git a/lib/mcp-qa-finite-policy-transport.mjs b/lib/mcp-qa-finite-policy-transport.mjs
--- a/lib/mcp-qa-finite-policy-transport.mjs
+++ b/lib/mcp-qa-finite-policy-transport.mjs
@@ -1,47 +1,29 @@
-import {readPrivateQaFiniteInitialAnchors} from './mcp-qa-finite-initial-anchors.mjs';
-import {readPrivateQaFinitePreparationCleanup} from './mcp-qa-finite-preparation-cleanup.mjs';
-import {FINITE_PREPARATION_CLEANUP_PREFIX as PREPARATION_CLEANUP,sealFinitePreparationCleanupRecord as sealPreparationCleanup,encodeFinitePreparationCleanupRecord as encodePreparationCleanup} from './mcp-qa-finite-preparation-cleanup-records.mjs';
-import {decodeFinitePreparationRecord as decodePreparation,hashFiniteOwnerEvidence as ownerEvidence,hashFiniteOwnerPreparationProject as ownerProjectHash} from './mcp-qa-finite-preparation-records.mjs';
+import {createFiniteFixedPolicyEngine} from './mcp-qa-finite-fixed-policy-engine.mjs';
+import {prepareFinitePreparationEnrollmentWrite} from './mcp-qa-finite-preparation-enrollment-writer.mjs';
 import {consumeFinitePolicySetupAdmission} from './mcp-qa-finite-policy-setup.mjs';
 import {resolveFiniteNamedActivationPlan,validateFiniteNamedCancellationHistory} from './mcp-release-operator-policy.mjs';
 import {adoptFiniteOwnerRequestStageWork,retainFiniteOwnerStagePromise} from './mcp-qa-finite-stage-work.mjs';
 import {createHash} from 'node:crypto';
 import {consumeFiniteOwnerStageAdmission,readFiniteOwnerRequestDeadline} from './mcp-qa-finite-owner-preparation.mjs';
 import {readPrivateQaFiniteConnectionSource} from './mcp-qa-finite-connection-source.mjs';
 import {createFinitePolicyEffectJournal} from './mcp-qa-finite-policy-journal.mjs';
 import {createFiniteOwnerPreparationStore} from './mcp-qa-finite-preparation-store.mjs';
 import {hashFinitePreparationRecord as hash,validateFiniteOwnerSource} from './mcp-qa-finite-preparation-records.mjs';
-import {finiteFields as fields,finiteData as data} from './mcp-finite-evidence.mjs';
-import {finiteCfEnvelope} from './mcp-qa-finite-custody.mjs';
+import {finiteFields as fields} from './mcp-finite-evidence.mjs';
 import {validateFiniteModule} from './mcp-finite-cleanup-policy.mjs';
-import {qualifyFiniteWorkerVersion} from './mcp-finite-primary-inventory.mjs';
-import {activationConfigurationHash,finiteActivationConfigurationHash} from './mcp-activation-observer.mjs';
-import {restorationConfigurationHash} from './mcp-restoration-configuration.mjs';
-import {qualifyFiniteConnectionProfile} from './mcp-qa-finite-connection-profile.mjs';
-const ROOT='https://api.cloudflare.com/client/v4/accounts/85d0d5dadac3341a564f22ce885e9eec/workers/',W='agent-friendly-web-delegated-canary',MAX=4718592;
 const pending=()=>Object.freeze({status:'admin_pending',mayRetry:false,operationalReadiness:false});
 const fail=()=>{throw Error('Finite policy transport unavailable');};
 const canonical=v=>JSON.stringify(v,(_,x)=>x&&typeof x==='object'&&!Array.isArray(x)?Object.fromEntries(Object.entries(x).sort(([a],[b])=>a<b?-1:1)):x);
 const sha=v=>createHash('sha256').update(v).digest('hex'),digest=(d,v)=>sha(d+'\n'+canonical(v));
-const uuid=x=>typeof x==='string'&&/^[a-f0-9]{8}(-[a-f0-9]{4}){3}-[a-f0-9]{12}$/.test(x);
 const current=lease=>{if(lease.signal.aborted)fail();lease.assertCurrent();};
 const observed=v=>{if(v?.status!=='observed'||!v.record)fail();return v.record;};
-function configurationProjection(v){
- return Object.fromEntries(['compatibility_date','compatibility_flags','main_module','exports','bindings','usage_model','containers'].map(k=>[k,v[k]]));
-}
-function configuration(v){
- const c=configurationProjection(v);finiteActivationConfigurationHash(c);return data(c);
-}
-function historicalConfiguration(v){
- const c=configurationProjection(v);activationConfigurationHash(c);return data(c);
-}
 function validateBytes(bytes,descriptor){
  validateFiniteModule(descriptor);if(!(bytes instanceof Uint8Array)||bytes.byteLength>3145728||bytes.byteLength!==descriptor.bytes||sha(bytes)!==descriptor.sha256)fail();
  return Uint8Array.from(bytes);
 }
 /** Only effect entry. No caller transport/credential/body/pins or exported mint. */
 export function createFinitePolicyTransport({ctx,env}){
  return Object.freeze({run(refs,originalLease){
   const admission=consumeFiniteOwnerStageAdmission({ctx,env,preconnectionId:refs?.preconnectionId,stage:refs?.stage},originalLease);
   fields(refs,['preconnectionId','stage']);
   const originalEnd=readFiniteOwnerRequestDeadline(originalLease),lease=admission.lease;
@@ -57,177 +39,87 @@
    const aborted=new Promise((_,reject)=>{rejectAbort=reject;});
    const abort=()=>{stop();rejectAbort(Error('Finite parent expired'));};lease.signal.addEventListener('abort',abort,{once:true});
    const timeout=new Promise((_,reject)=>{timer=setTimeout(()=>{stop();reject(Error('Finite child expired'));},Math.max(1,end-Date.now()));});
    const work=track(Promise.resolve().then(()=>{current(c);return fn(c,end);}));
    try{const value=await Promise.race([work,timeout,aborted]);current(c);return value;}
    finally{stop();clearTimeout(timer);lease.signal.removeEventListener('abort',abort);}
   }
   async function qualified(c){current(c);await source.assertCurrent(c);current(c);}
   async function enrollPreparationCleanup(c,end){
    current(c);await qualified(c);current(c);
-   const get=storage.get,list=storage.list,transaction=storage.transaction,sync=storage.sync,getAlarm=storage.getAlarm;
-   const actor=ctx.id,toString=actor.toString,ns=env.AFW_INDEPENDENT_CLOSURE,idFromName=ns?.idFromName,metadata=env.AFW_QA_VERSION,qa=metadata?.id;
-   if([get,list,transaction,sync,getAlarm,toString,idFromName].some(x=>typeof x!=='function'))fail();
-   const check=()=>{current(c);if(storage.get!==get||storage.list!==list||storage.transaction!==transaction||storage.sync!==sync||storage.getAlarm!==getAlarm||ctx.id!==actor||actor.toString!==toString||env.AFW_INDEPENDENT_CLOSURE!==ns||ns.idFromName!==idFromName||env.AFW_QA_VERSION!==metadata||metadata.id!==qa)fail();};
-   const io=async(method,args)=>{check();const value=await track(Reflect.apply(method,storage,args));check();return value;};
-   const facts=await track(readPrivateQaFiniteInitialAnchors({ctx,env},c));check();
-   const {capsule,plan,records,zero,state,anchors,actorId}=facts,owner=source.ownerSource;
-   if(refs.stage!=='connection'||refs.preconnectionId!==capsule.preconnectionId||facts.alarm!==capsule.C0||canonical(state)!==canonical(zero)||Object.keys(records).length!==6||Date.now()<capsule.I0||Date.now()>=capsule.C0||owner.phase!=='closed_ui'||owner.sourceRevision!==capsule.sourceRevision||owner.qaVersionId!==capsule.qaVersionId||owner.actorId!==actorId||owner.window.startedAt!==capsule.I0||owner.window.expiresAt!==capsule.C0||owner.currentPublication.stage!==null||owner.currentPublication.versionId!==capsule.activatedVersionId||owner.currentPublication.deploymentId!==capsule.activatedDeploymentId||source.baseline.versionId!==capsule.activatedVersionId||source.baseline.deploymentId!==capsule.activatedDeploymentId||source.baseline.module.sha256!==capsule.moduleHash||finiteActivationConfigurationHash(source.baseline.configuration)!==finiteActivationConfigurationHash(plan.configuration))fail();
-   validateBytes(source.bytes.baseline,source.baseline.module);qualifyFiniteConnectionProfile({phase:'closed_ui',metadata:source.baseline.configuration});
-   const prefix='connection-preparation:'+refs.preconnectionId;
-   const names=[[prefix+':record','Preconnection'],[prefix+':source','OwnerSourceSnapshot'],[prefix+':connection:approval','StageApproval']];
-   const ownerRows=[];for(const [key,kind]of names){const raw=await io(get,[key]);ownerRows.push([key,raw]);decodePreparation(kind,raw);}
-   const pre=decodePreparation('Preconnection',ownerRows[0][1]),snapshot=decodePreparation('OwnerSourceSnapshot',ownerRows[1][1]),approval=decodePreparation('StageApproval',ownerRows[2][1]);
-   const decisionKey='connection-approval:'+approval.approvalHash,decisionRaw=await io(get,[decisionKey]),decision=decodePreparation('ConfigurationApproval',decisionRaw);ownerRows.push([decisionKey,decisionRaw]);
-   const ticketKey='owner-ticket:'+snapshot.initialTicketHash,ticketRaw=await io(get,[ticketKey]),ticket=decodePreparation('Ticket',ticketRaw);
-   const useKey=ticketKey+':use',useRaw=await io(get,[useKey]),use=decodePreparation('TicketUse',useRaw),mapKey='owner-project-ref:'+ticket.projectRef,mapRaw=await io(get,[mapKey]),map=decodePreparation('ProjectRef',mapRaw);
-   ownerRows.push([ticketKey,ticketRaw],[useKey,useRaw],[mapKey,mapRaw]);
-   if(hash('StageApproval',approval)!==admission.stageApprovalHash||canonical(snapshot.source)!==canonical(owner)||pre.preconnectionId!==capsule.preconnectionId||pre.sourceRevision!==owner.sourceRevision||pre.actorId!==owner.actorId||pre.approvalHash!==approval.approvalHash||approval.stage!=='connection'||approval.preconnectionId!==capsule.preconnectionId)fail();
-   const childDeadline=Math.min(end,capsule.C0,pre.expiresAt,pre.owner.accessExpiresAt,decision.expiresAt,owner.window.expiresAt);
-   const input={capsuleHash:capsule.capsuleHash,planHash:plan.recordHash,armAckHash:records['arm-ack'].recordHash,activationCompletionHash:records['activation-completion'].recordHash,entryHash:capsule.entryHash,materialHash:capsule.materialHash,actorId,ownerSourceHash:snapshot.sourceHash,preconnectionHash:pre.recordHash,stageApprovalHash:admission.stageApprovalHash,configurationApprovalHash:hash('ConfigurationApproval',decision),issuedAt:Date.now(),deadline:childDeadline};
-   for(const k of ['sourceRevision','sourceTree','qaVersionId','initialInstanceId','preconnectionId','I0','C0','C1'])input[k]=capsule[k];
-   for(const k of ['readerId','publisherId','readerExpiresAt','publisherExpiresAt','manifestHash','baselineVersionId','baselineDeploymentId'])input[k]=plan[k];
-   const enrollment=sealPreparationCleanup('Enrollment',input),enrollmentRaw=encodePreparationCleanup('Enrollment',enrollment);
-   // Immutable exact native transaction, never a resumed writer from old DATA.
-   async function append(key,raw,acknowledging=false){
-    let entered=false;
-    check();const committed=await track(Reflect.apply(transaction,storage,[async tx=>{
-     if(entered)fail();entered=true;
-     const tg=tx.get,tp=tx.put,tl=tx.list;if([tg,tp,tl].some(x=>typeof x!=='function'))fail();
-     const txCheck=()=>{check();if(tx.get!==tg||tx.put!==tp||tx.list!==tl)fail();};
-     const read=async k=>{txCheck();const value=await track(Reflect.apply(tg,tx,[k]));txCheck();return value;};
-     const rows=async prefix=>{txCheck();const value=await track(Reflect.apply(tl,tx,[{prefix,limit:16}]));txCheck();return value;};
-     for(const [k,v]of [...anchors,...ownerRows])if(await read(k)!==v)fail();
-     if((await rows('afw.finite-initial-cleanup.v1:')).size!==6||await read('afw.qa-finite-trial.v1:head')!==undefined||(await rows('afw.finite-policy-effect.v1:')).size)fail();
-     for(const suffix of ['grant','notice','connection','notices:approval','finite:approval'])if(await read(prefix+':'+suffix)!==undefined)fail();
-     const ownerScoped=await rows(prefix+':');
-     if(ownerScoped.size!==3||[...ownerScoped.keys()].some(k=>![prefix+':record',prefix+':source',prefix+':connection:approval'].includes(k)))fail();
-     const old=await rows(PREPARATION_CLEANUP);
-     if(acknowledging?old.size!==1||old.get(PREPARATION_CLEANUP+'enrollment')!==enrollmentRaw:old.size!==0)fail();
-     if(await read(key)!==undefined)fail();
-     txCheck();await track(Reflect.apply(tp,tx,[key,raw]));txCheck();return true;
-    }]));check();if(committed!==true)fail();
-    await io(sync,[]);
-    if(await io(get,[key])!==raw||await io(getAlarm,[])!==capsule.C0)fail();
-   }
-   // Validate real stored owner/project/realm/baseline linkage before the first write.
-   const realm=ownerEvidence('realm',{...owner.access,origin:owner.origin}),subject=ownerEvidence('subject',{accessRealmHash:realm,subject:pre.owner.subject}),selection=facts.material.ownerSelection;
-   if(ticket.preconnectionId!==capsule.preconnectionId||ticket.ticketHash!==snapshot.initialTicketHash||ticket.sourceRevision!==capsule.sourceRevision||ticket.action!=='connection'||ticket.connectionRef!==null||ticket.subjectHash!==subject||map.preconnectionId!==capsule.preconnectionId||map.sourceRevision!==capsule.sourceRevision||map.subjectHash!==subject||map.projectId!==owner.project.projectId||map.revision!==owner.project.revision||ticket.expiresAt>map.expiresAt||decision.expiresAt>ticket.expiresAt||use.ticketHash!==ticket.ticketHash||use.recordHash!==decision.csrfReceiptHash||decision.csrfReceiptHash!==ownerEvidence('decision',{ticket,decision:'approve',projectHash:ownerProjectHash(pre.project),goal:owner.goal,clientId:pre.clientId,approvedAt:decision.approvedAt,expiresAt:decision.expiresAt})||use.consumedAt<decision.approvedAt||enrollment.issuedAt<use.consumedAt||pre.owner.subject!==selection.subject||pre.owner.accessRealmHash!==realm||decision.subjectHash!==subject||pre.clientId!==owner.clientId||decision.clientId!==pre.clientId||owner.clientId!==selection.clientId||pre.resource!==owner.resource||owner.resource!==selection.resource||ownerProjectHash(pre.project)!==ownerProjectHash(owner.project)||ownerProjectHash(owner.project)!==ownerProjectHash(selection.project)||decision.projectHash!==ownerProjectHash(pre.project)||decision.sourceRevision!==owner.sourceRevision||approval.sourceRevision!==owner.sourceRevision||snapshot.preconnectionId!==capsule.preconnectionId||snapshot.initialTicketHash!==approval.ticketHash||canonical(owner.access)!==canonical(selection.access)||owner.goal!==selection.goal||pre.baselineHash!==ownerEvidence('baseline',owner.initialBaseline)||owner.initialBaseline.versionId!==capsule.activatedVersionId||owner.initialBaseline.deploymentId!==capsule.activatedDeploymentId||owner.initialBaseline.moduleHash!==capsule.moduleHash||owner.initialBaseline.bindingsHash!==capsule.bindingsHash||owner.initialBaseline.configurationHash!==finiteActivationConfigurationHash(plan.configuration))fail();
-   await qualified(c);check();await append(PREPARATION_CLEANUP+'enrollment',enrollmentRaw);
-   const verified=await track(readPrivateQaFinitePreparationCleanup({ctx,env},c));check();
-   if(verified?.enrollment.recordHash!==enrollment.recordHash||verified.ack!==null)fail();
-   const ack=sealPreparationCleanup('Ack',{enrollmentHash:enrollment.recordHash,stateHash:zero.recordHash,alarmAt:capsule.C0,acknowledgedAt:Date.now()});
-   if(ack.acknowledgedAt<enrollment.issuedAt||ack.acknowledgedAt>=enrollment.deadline)fail();
-   await qualified(c);check();await append(PREPARATION_CLEANUP+'ack',encodePreparationCleanup('Ack',ack),true);
-   const final=await track(readPrivateQaFinitePreparationCleanup({ctx,env},c));check();
-   if(final?.ack?.recordHash!==ack.recordHash)fail();
+   const writer=await prepareFinitePreparationEnrollmentWrite({ctx,env,preconnectionId:refs.preconnectionId,stageApprovalHash:admission.stageApprovalHash,ownerSource:source.ownerSource,baseline:source.baseline,baselineBytes:source.bytes.baseline},c,end);
+   await qualified(c);current(c);await writer.recordEnrollment();
+   await qualified(c);current(c);await writer.recordAck();
   }
   async function work(){
    guard();if(refs.stage!=='connection')fail();
    source=await child(c=>readPrivateQaFiniteConnectionSource({ctx,env,...refs},c));fields(source,['ownerSource','baseline','rollback','candidate','bytes','assertCurrent']);
    if(typeof source.assertCurrent!=='function'||canonical(validateFiniteOwnerSource(source.ownerSource))!==canonical(admission.ownerSource)||source.ownerSource.phase!=='closed_ui')fail();
    const store=createFiniteOwnerPreparationStore({storage,now:Date.now});
    const pre=observed(await child(c=>store.readPreconnection({preconnectionId:refs.preconnectionId},c))),approval=observed(await child(c=>store.readStageApproval(refs,c)));
    if(hash('StageApproval',approval)!==admission.stageApprovalHash)fail();
    const decision=observed(await child(c=>store.readConfigurationApproval({approvalHash:approval.approvalHash},c)));
    deadline=Math.min(deadline,pre.expiresAt,pre.owner.accessExpiresAt,decision.expiresAt,source.ownerSource.window.expiresAt);guard();
    await child(enrollPreparationCleanup);
    // Enrollment ACK is DATA only. Unit2 must qualify every later owner effect.
    return pending();
   }
   const actual=track(Promise.resolve().then(work));
   return actual.then(outcome=>Object.freeze({outcome,admission}),()=>Object.freeze({outcome:pending(),admission}));
   });}catch{return Promise.resolve(Object.freeze({outcome:pending(),admission}));}
  }});
 }
 
-// Private shared fixed-target engine; never exported or caller-configurable.
-function fixedPolicyEngine({ctx,env},guard){
- void ctx;const fetcher=globalThis.fetch,readToken=env.AFW_MCP_CLOSURE_READ_TOKEN,publishToken=env.AFW_MCP_CLOSURE_PUBLISH_TOKEN;
-  async function http(method,path,body,c){
-   guard();current(c);const token=method==='GET'?readToken:publishToken;
-   if(typeof token!=='string'||!/^[-A-Za-z0-9_]{16,4096}$/.test(token)||typeof fetcher!=='function')fail();
-   const response=await fetcher(ROOT+path,{method,redirect:'manual',cache:'no-store',signal:c.signal,headers:{Authorization:'Bearer '+token,Accept:'application/json','Content-Type':'application/json','Cache-Control':'no-cache, no-store'},...(body?{body:JSON.stringify(body)}:{})});
-   let reader;
-   try{
-    current(c);if(!(response instanceof Response)||response.redirected||!(method==='GET'?response.status===200:[200,201].includes(response.status))||!response.body||!/^application\/json(?:\s*;|$)/i.test(response.headers.get('Content-Type')??''))fail();
-    const age=response.headers.get('Age'),cache=response.headers.get('CF-Cache-Status'),length=response.headers.get('Content-Length');
-    if(age!==null&&age!=='0'||cache!==null&&!['DYNAMIC','BYPASS','MISS'].includes(cache.toUpperCase())||length!==null&&(!/^\d+$/.test(length)||Number(length)>MAX))fail();
-    reader=response.body.getReader();const chunks=[];let size=0;
-    for(;;){const v=await reader.read();current(c);if(v.done)break;size+=v.value.byteLength;if(size>MAX)fail();chunks.push(v.value);}
-    const raw=Buffer.concat(chunks,size);current(c);return finiteCfEnvelope(JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(raw)));
-   }finally{if(reader)await reader.cancel().catch(()=>{});else if(response?.body&&!response.body.locked)await response.body.cancel().catch(()=>{});}
-  }
-  function pointer(value,versionId,deploymentId){
-   const d=value?.deployments?.[0];
-   if(!Array.isArray(value?.deployments)||value.deployments.length!==1||d?.id!==deploymentId||d.strategy!=='percentage'||!Array.isArray(d.versions)||d.versions.length!==1||d.versions[0].version_id!==versionId||d.versions[0].percentage!==100)fail();
-  }
-  const readPointer=(pin,c)=>http('GET','scripts/'+W+'/deployments?per_page=1',null,c).then(v=>{current(c);pointer(v,pin.versionId,pin.deploymentId);});
-  async function readVersion(pin,c,closed=false){
-   const v=await http('GET','workers/'+W+'/versions/'+pin.versionId+'?include=modules',null,c);current(c);
-   qualifyFiniteWorkerVersion({metadata:v,pin:{versionId:pin.versionId,module:pin.module,configurationHash:restorationConfigurationHash(pin.configuration)},role:'canary',closed});
-   if(closed){
-    if(activationConfigurationHash(historicalConfiguration(v))!==activationConfigurationHash(historicalConfiguration(pin.configuration)))fail();
-   }else if(finiteActivationConfigurationHash(configuration(v))!==finiteActivationConfigurationHash(configuration(pin.configuration)))fail();return v;
-  }
-  function wire(config,baselineId,bytes){
-   const value=configuration(config),out={...value,containers:value.containers.map(({class_name})=>({class_name})),bindings:value.bindings.map(b=>b.type==='secret_text'?{name:b.name,type:'inherit',version_id:baselineId}:b),modules:[{name:'index.mjs',content_type:'application/javascript+module',content_base64:Buffer.from(bytes).toString('base64')}]};
-   for(const b of out.bindings)if(b.type==='inherit')fields(b,['name','type','version_id']);
-   return out;
-  }
- return {http,readPointer,readVersion,wire};
-}
-
 /** Separate original native setup admission. Never accepts an owner POST lease. */
 export function createFinitePolicySetupTransport({ctx,env}){
  return Object.freeze({async run(refs,originalLease){
   let a,blockingJournal;
   try{
    a=consumeFinitePolicySetupAdmission({ctx,env,refs},originalLease);
    const {source,context,candidate,material,parent}=a,storage=ctx.storage,db=env.RELEASE_DB,fetcher=globalThis.fetch,reader=env.AFW_MCP_CLOSURE_READ_TOKEN,publisher=env.AFW_MCP_CLOSURE_PUBLISH_TOKEN;
    const guard=()=>{current(originalLease);if(ctx.storage!==storage||env.RELEASE_DB!==db||globalThis.fetch!==fetcher||env.AFW_MCP_CLOSURE_READ_TOKEN!==reader||env.AFW_MCP_CLOSURE_PUBLISH_TOKEN!==publisher||env.AFW_QA_VERSION?.id!==source.native.qaVersionId)fail();return Date.now();};
-   const child=fn=>parent.child(fn),{http,readPointer,readVersion,wire}=fixedPolicyEngine({ctx,env},guard),store=createFiniteOwnerPreparationStore({storage,now:Date.now});
+   const child=fn=>parent.child(fn),engine=createFiniteFixedPolicyEngine({ctx,env},guard),{readPointer,readVersion}=engine,store=createFiniteOwnerPreparationStore({storage,now:Date.now});
    const qualified=async c=>{
     current(c);await source.assertCurrent(c);current(c);
     if(canonical(source.baseline)!==canonical(context.baseline)||canonical(source.rollback)!==canonical(context.rollback))fail();
     const selected=await retainFiniteOwnerStagePromise(store.readSelected({sourceRevision:refs.sourceRevision},c));current(c);
     if(!selected||selected.preparation.preparationHash!==context.preparationHash||selected.selection.selectionHash!==context.selectionHash||!selected.binding||hash('Binding',selected.binding)!==context.bindingHash)fail();
    };
    const identity=effect=>({kind:'policy',...refs,setupInstanceId:a.setupInstanceId,effect}),journal=effect=>createFinitePolicyEffectJournal({storage,identity:identity(effect),now:Date.now}),upload=journal('upload'),activation=journal('activation'),contextHash=hash('SetupContext',context),baseline=context.baseline,rollback=context.rollback;
    const bytes=Object.fromEntries(['baseline','rollback','candidate'].map(k=>[k,validateBytes(source.bytes[k],k==='candidate'?candidate.module:context[k].module)]));
    await child(async c=>{await qualified(c);await readPointer(baseline,c);await readVersion(baseline,c);await readVersion(rollback,c,true);await qualified(c);});
    const first=await child(c=>upload.read(c)),second=await child(c=>activation.read(c));
    if(first.state!=='absent'||second.state!=='absent')fail();
-   async function effect(j,effectName,path,body){
+   async function effect(j,effectName,request,operation){
     if(parent.end()-guard()<(effectName==='upload'?10000:5000))fail();
     return child(async(c,end)=>{
      await qualified(c);await readPointer(baseline,c);current(c);
-     const send={purpose:'afw.finite-policy-send.v1',...refs,setupInstanceId:a.setupInstanceId,contextHash,effect:effectName,requestHash:digest('afw.finite-policy-request.v1',{method:'POST',path:ROOT+path,baselineVersionId:baseline.versionId,baselineDeploymentId:baseline.deploymentId,body}),issuedAt:Date.now(),deadline:end};
+     const send={purpose:'afw.finite-policy-send.v1',...refs,setupInstanceId:a.setupInstanceId,contextHash,effect:effectName,requestHash:digest('afw.finite-policy-request.v1',{method:'POST',path:request.path,baselineVersionId:baseline.versionId,baselineDeploymentId:baseline.deploymentId,body:request.body}),issuedAt:Date.now(),deadline:end};
      const claim=await retainFiniteOwnerStagePromise(j.issue(send,c));current(c);
      if(claim.status!=='recorded'||claim.recordHash!==hash('PolicySend',send))fail();blockingJournal=j;
      const read=await retainFiniteOwnerStagePromise(j.read(c));current(c);if(read.state!=='issued'||canonical(read.send)!==canonical(send)||read.ack!==null)fail();
      await qualified(c);current(c);
-     const result=await http('POST',path,body,c);current(c);if(!uuid(result?.id))fail();
-     const rec=result.exports_reconciliation;
-     if(rec!==undefined&&(!rec||Object.keys(rec).some(k=>!['created','deleted','renamed','transfer_pending','transferred','updated','removable_entries','info','warnings'].includes(k))||Object.entries(rec).some(([k,v])=>!Array.isArray(v)||(k==='updated'?v.some(x=>x!=='AfwOwnEventNode'):v.length>0))))fail();
+     const result=await operation(c);current(c);
      const ack={purpose:'afw.finite-policy-ack.v1',sendHash:claim.recordHash,resourceId:result.id,acknowledgedAt:Date.now()};
      const saved=await retainFiniteOwnerStagePromise(j.acknowledge(ack,c));current(c);
      if(saved.status!=='recorded'||saved.recordHash!==hash('PolicyAck',ack))fail();
      const actual=await retainFiniteOwnerStagePromise(j.read(c));current(c);if(actual.state!=='acknowledged'||canonical(actual.ack)!==canonical(ack))fail();
      return result.id;
     });
    }
-   const versionId=await effect(upload,'upload','workers/'+W+'/versions?deploy=false',wire(candidate.configuration,baseline.versionId,bytes.candidate));
+   const uploadInput={configuration:candidate.configuration,baselineVersionId:baseline.versionId,bytes:bytes.candidate};
+   const versionId=await effect(upload,'upload',engine.describeUpload(uploadInput),c=>engine.upload(uploadInput,c));
    if(versionId===baseline.versionId||versionId===rollback.versionId)fail();
    const pin={versionId,module:candidate.module,configuration:candidate.configuration};
    await child(async c=>{await qualified(c);await readVersion(pin,c);await readPointer(baseline,c);await qualified(c);});
-   const deploymentId=await effect(activation,'activation','scripts/'+W+'/deployments',{strategy:'percentage',versions:[{version_id:versionId,percentage:100}]});
+   const activationInput={versionId};
+   const deploymentId=await effect(activation,'activation',engine.describeActivation(activationInput),c=>engine.activate(activationInput,c));
    if(deploymentId===baseline.deploymentId)fail();
    await child(async c=>{await qualified(c);await readPointer({versionId,deploymentId},c);await readVersion(pin,c);await qualified(c);});
    // Actual observation is now available; never predicted to satisfy Known.
    const publication=a.namedContext.publication,T0=context.T0,N1=T0+300000;
    const bundle={artifact:a.artifact,policy:{operation:'confirm_named',startAt:T0,expiresAt:N1,plan:{activationKey:publication.activationKey,artifactKey:publication.artifactKey,trialId:a.namedContext.trialId,configurationHash:context.expectedFull.activationHash,startAt:T0,expiresAt:N1},observation:{versionId,deploymentId,namespaceId:'d6fc71552de7494a863aca20365a572d',applicationId:'d6fc71552de7494a863aca20365a572d',configuration:candidate.configuration}}};
    const named=resolveFiniteNamedActivationPlan(bundle,env.AFW_RELEASE_EVENTS_NODE);named.current();validateFiniteNamedCancellationHistory(bundle,a.cancellationHistory);
    const raw={purpose:'afw.finite-policy-installed.v1',...refs,setupInstanceId:a.setupInstanceId,qaVersionId:source.native.qaVersionId,seedHash:material.seedHash,contextHash,baselineVersionId:baseline.versionId,baselineDeploymentId:baseline.deploymentId,versionId,deploymentId,moduleHash:candidate.module.sha256,publicStaticHash:candidate.publicStatic.configurationHash,...context.expectedFull,installedAt:Date.now()},receipt={...raw,receiptHash:hash('PolicyReceipt',raw)};
    await child(async c=>{
     await qualified(c);const read=await retainFiniteOwnerStagePromise(store.readContext(refs,c));current(c);if(hash('SetupContext',read)!==contextHash)fail();
     const result=await retainFiniteOwnerStagePromise(activation.finish(receipt,c));current(c);if(result.status!=='recorded')fail();
```

### test/mcp-qa-finite-policy-transport.test.mjs

```diff
diff --git a/test/mcp-qa-finite-policy-transport.test.mjs b/test/mcp-qa-finite-policy-transport.test.mjs
--- a/test/mcp-qa-finite-policy-transport.test.mjs
+++ b/test/mcp-qa-finite-policy-transport.test.mjs
@@ -38,28 +38,28 @@
  assert.deepEqual(await f.json('/fixture/source-hold-state',{}),{used:true,settled:true});
  assert.equal(f.posts(),0);assert.equal((await f.json('/fixture/rows',{})).filter(([k])=>k.endsWith(':send')).length,0);
 });
 
 import {build} from 'esbuild';
 import {readFile} from 'node:fs/promises';
 import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
 import {createHash} from 'node:crypto';
 async function versionRoleHarness(t){
  // Test-only exposure of the private engine; no public role/configuration API.
- const entry=`import {fixedPolicyEngine} from './lib/mcp-qa-finite-policy-transport.mjs';
+ const entry=`import {createFiniteFixedPolicyEngine} from './lib/mcp-qa-finite-fixed-policy-engine.mjs';
  export default {async fetch(request,env){
   const {pin,closed,wire}=await request.json(),lease={signal:new AbortController().signal,assertCurrent(){}};
-  const engine=fixedPolicyEngine({ctx:{},env},()=>{});
-  try{if(wire)engine.wire(pin.configuration,pin.versionId,new Uint8Array([1]));else await engine.readVersion(pin,lease,closed);return Response.json({accepted:true});}
+  const engine=createFiniteFixedPolicyEngine({ctx:{},env},()=>{});
+  try{if(wire)engine.describeUpload({configuration:pin.configuration,baselineVersionId:pin.versionId,bytes:new Uint8Array([1])});else await engine.readVersion(pin,lease,closed);return Response.json({accepted:true});}
   catch{return Response.json({accepted:false});}
  }};`;
- const compiled=await build({stdin:{contents:entry,resolveDir:process.cwd()},bundle:true,write:false,format:'esm',platform:'neutral',mainFields:['module','main'],external:['node:*','cloudflare:*'],plugins:[{name:'private-engine-test-only',setup(b){b.onLoad({filter:/mcp-qa-finite-policy-transport\.mjs$/},async args=>({contents:(await readFile(args.path,'utf8'))+'\nexport {fixedPolicyEngine};',resolveDir:process.cwd()+'/lib',loader:'js'}));}}]});
+ const compiled=await build({stdin:{contents:entry,resolveDir:process.cwd()},bundle:true,write:false,format:'esm',platform:'neutral',mainFields:['module','main'],external:['node:*','cloudflare:*']});
  let metadata,writes=0,gets=0;
  const mf=new Miniflare(convertV4MiniflareOptions({modules:true,script:compiled.outputFiles[0].text,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],bindings:{AFW_MCP_CLOSURE_READ_TOKEN:'SYNTHETIC_READER_00000000000000',AFW_MCP_CLOSURE_PUBLISH_TOKEN:'SYNTHETIC_PUBLISHER_000000000000'},outboundService:request=>{if(request.method!=='GET'){writes++;throw Error('write forbidden');}gets++;return Response.json({success:true,errors:[],messages:[],result:metadata});}}));
  t.after(()=>mf.dispose());
  const script='export default {}',descriptor={name:'index.mjs',sha256:createHash('sha256').update(script).digest('hex'),bytes:Buffer.byteLength(script)},versionId='22222222-2222-4222-8222-222222222222';
  const candidate=syntheticPreparation('closed_ui',{clientId:'SYNTHETIC_CLIENT',project:{projectId:'SYNTHETIC_PROJECT'},access:{audience:'SYNTHETIC_AUD',teamDomain:'synthetic.cloudflareaccess.com'},window:{expiresAt:1000000}});
  const historical=structuredClone(candidate);historical.compatibility_flags=['nodejs_compat','global_fetch_strictly_public'];
  return {candidate,historical,counts:()=>({writes,gets}),async read(actual,expected,closed=false,wire=false){
   metadata={...actual,id:versionId,urls:[],modules:[{name:'index.mjs',content_type:'application/javascript+module',content_base64:Buffer.from(script).toString('base64')}]};
   return (await mf.dispatchFetch('https://fixture.invalid',{method:'POST',body:JSON.stringify({pin:{versionId,module:descriptor,configuration:expected},closed,wire})})).json();
  }};
@@ -71,11 +71,36 @@
  assert.deepEqual(f.counts(),{writes:0,gets:2});
 });
 test('wrong_role_denied_before_mutation',async t=>{
  const f=await versionRoleHarness(t);
  for(const closed of [false,true]){
   const right=closed?f.historical:f.candidate,wrong=closed?f.candidate:f.historical;
   for(const [actual,pin]of [[wrong,right],[right,wrong],[wrong,wrong]])assert.deepEqual(await f.read(actual,pin,closed),{accepted:false});
  }
  assert.deepEqual(await f.read(f.historical,f.historical,false,true),{accepted:false},'wire remains candidate-only');
  assert.deepEqual(f.counts(),{writes:0,gets:6});
+});
+
+test('T1 known failure retains real cancellation',async t=>{
+ const fresh=await readFile('lib/mcp-qa-finite-fixed-policy-engine.mjs','utf8').then(()=>true,()=>false);
+ const entry=`import {${fresh?'createFiniteFixedPolicyEngine':'fixedPolicyEngine'}} from './lib/${fresh?'mcp-qa-finite-fixed-policy-engine':'mcp-qa-finite-policy-transport'}.mjs';
+ export default {async fetch(request,env){
+  let release,started,failed=false,settled=false,cancelStarted=false,cancelSettled=false,posts=0;
+  const cancellationStarted=new Promise(r=>{started=r;});
+  globalThis.fetch=async()=>{posts++;return new Response(new ReadableStream({cancel(){cancelStarted=true;started();return new Promise(r=>{release=()=>{cancelSettled=true;r();};});}}),{status:200,headers:{'Content-Type':'text/plain'}});};
+  const lease={signal:new AbortController().signal,assertCurrent(){}};
+  const engine=${fresh?'createFiniteFixedPolicyEngine':'fixedPolicyEngine'}({ctx:{},env},()=>{});
+  const actual=${fresh?"engine.activate({versionId:'22222222-2222-4222-8222-222222222222'},lease)":"engine.http('POST','scripts/agent-friendly-web-delegated-canary/deployments',{strategy:'percentage',versions:[{version_id:'22222222-2222-4222-8222-222222222222',percentage:100}]},lease)"};
+  const logical=actual.then(()=>{settled=true;},()=>{failed=true;settled=true;});
+  await cancellationStarted;
+  // Drain only already-queued native continuations inside this original request.
+  for(let i=0;i<12;i++)await Promise.resolve();
+  const before={failed,settled,cancelStarted,cancelSettled,posts};
+  release();await logical;for(let i=0;i<4;i++)await Promise.resolve();
+  return Response.json({before,after:{failed,settled,cancelStarted,cancelSettled,posts}});
+ }};`;
+ const compiled=await build({stdin:{contents:entry,resolveDir:process.cwd()},bundle:true,write:false,format:'esm',platform:'neutral',mainFields:['module','main'],external:['node:*','cloudflare:*'],plugins:fresh?[]:[{name:'old-private-contract-only',setup(b){b.onLoad({filter:/mcp-qa-finite-policy-transport\.mjs$/},async args=>({contents:(await readFile(args.path,'utf8'))+'\nexport {fixedPolicyEngine};',resolveDir:process.cwd()+'/lib',loader:'js'}));}}]});
+ const mf=new Miniflare(convertV4MiniflareOptions({modules:true,script:compiled.outputFiles[0].text,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],bindings:{AFW_MCP_CLOSURE_PUBLISH_TOKEN:'SYNTHETIC_PUBLISHER_000000000000'}}));t.after(()=>mf.dispose());
+ const {before,after}=await (await mf.dispatchFetch('https://fixture.invalid')).json();
+ assert.deepEqual(before,{failed:true,settled:true,cancelStarted:true,cancelSettled:false,posts:1},'known failure must reject logically while actual cancellation remains retained');
+ assert.deepEqual(after,{failed:true,settled:true,cancelStarted:true,cancelSettled:true,posts:1});
 });
```

### test/mcp-qa-finite-first-connection-publication.test.mjs

```diff
diff --git a/test/mcp-qa-finite-first-connection-publication.test.mjs b/test/mcp-qa-finite-first-connection-publication.test.mjs
--- /dev/null
+++ b/test/mcp-qa-finite-first-connection-publication.test.mjs
@@ -0,0 +1,87 @@
+import test from 'node:test';
+import assert from 'node:assert/strict';
+import {access} from 'node:fs/promises';
+test('T1 fixed engine exposes only finite operations',async()=>{
+ await assert.doesNotReject(access('lib/mcp-qa-finite-fixed-policy-engine.mjs'),'fixed finite operation contract must exist before publication');
+ const {createFiniteFixedPolicyEngine}=await import('../lib/mcp-qa-finite-fixed-policy-engine.mjs');
+ const engine=createFiniteFixedPolicyEngine({ctx:{},env:{}},()=>{});
+ assert(Object.isFrozen(engine));
+ assert.deepEqual(Object.keys(engine).sort(),['activate','describeActivation','describeUpload','readPointer','readVersion','upload'].sort());
+});
+test('T1 enrollment preserves literal chronology and one shot',async()=>{
+ await assert.doesNotReject(access('lib/mcp-qa-finite-preparation-enrollment-writer.mjs'),'fixed factual enrollment writer contract must exist');
+ await component('normal',async(result,f)=>{
+  assert.equal(result.failure,null,JSON.stringify(result));assert.equal(result.settled,true);
+  assert.deepEqual(result.trace.slice(result.trace.indexOf('put:enrollment')),["put:enrollment","transaction-settled","sync","get:enrollment","alarm","list:","alarm","get:enrollment","put:ack","transaction-settled","sync","get:ack","alarm","list:","alarm","get:ack","get:enrollment"]);
+  assert(result.enrollment);assert(result.ack);assert.equal(result.ack.enrollmentHash,result.enrollment.recordHash);
+  assert(result.ack.acknowledgedAt>=result.enrollment.issuedAt);assert(result.ack.acknowledgedAt<result.enrollment.deadline);
+  assert(result.enrollment.deadline-result.enrollment.issuedAt<=5000);
+  const rows=await plain(f.stub.snapshot()),capsule=JSON.parse(rows.find(([key])=>key.endsWith(':capsule'))[1]),plan=JSON.parse(rows.find(([key])=>key==='afw.finite-initial-cleanup.v1:plan')[1]);
+  for(const key of ['sourceRevision','sourceTree','qaVersionId','initialInstanceId','preconnectionId','I0','C0','C1','capsuleHash','entryHash','materialHash'])assert.equal(result.enrollment[key],capsule[key]);
+  for(const key of ['manifestHash','readerId','publisherId','readerExpiresAt','publisherExpiresAt','baselineVersionId','baselineDeploymentId'])assert.equal(result.enrollment[key],plan[key]);
+  assert.equal(result.ack.alarmAt,capsule.C0);assert.equal(await f.stub.alarmInfo(),capsule.C0);
+  assert.equal(result.enrollment.C0,result.enrollment.I0+900000);assert.equal(result.enrollment.C1,result.enrollment.C0+180000);
+ });
+});
+
+import {initialEntryHarness} from './fixtures/finite-initial-entry-world.mjs';
+import {plain,exerciseEnrollmentWriter} from './fixtures/finite-first-connection-publication.mjs';
+test('T1 baseline enrollment chronology remains native and pending',async()=>{
+ const f=await initialEntryHarness('first-connection-enrollment-component');
+ try{
+  await f.stub.configure('normal');assert.equal((await plain(f.stub.invoke(f.refs))).status,'material_recorded');await f.stub.restoreMethods();
+  const rows=await plain(f.stub.snapshot()),capsule=JSON.parse(rows.find(([k])=>k.endsWith(':capsule'))[1]);
+  const source=(await plain(f.ownerRead())).source,token=await f.enrollmentToken(source);f.nowOffset=capsule.I0+400000-Date.now();
+  const screen=await plain(f.stub.enrollmentScreen(token));assert.equal(screen.fixtureError,undefined,JSON.stringify(screen));
+  const observed=await plain(f.stub.captureLegacyEnrollment(token,screen));
+  assert.equal(observed.result.result.outcome.status,'admin_pending',JSON.stringify(observed));
+  assert.equal(observed.result.prepared.status,202);assert.equal(f.uploads.length,1);assert.equal(f.activations.length,1);
+  assert(observed.trace.includes('put:enrollment'));assert(observed.trace.includes('put:ack'));
+  console.info('T1 legacy enrollment trace',JSON.stringify(observed.trace));
+  const written=(await plain(f.stub.snapshot())).filter(([k])=>k.startsWith('afw.finite-preparation-cleanup.v1:'));
+  console.info('T1 legacy enrollment DATA',JSON.stringify(written.map(([key,raw])=>({key,record:JSON.parse(raw)}))));
+ }finally{await f.stub.restoreMethods();await f.mf.dispose();await f.cleanup();}
+});
+
+async function component(scenario,inspect){
+ const f=await initialEntryHarness('first-connection-enrollment-component');
+ try{
+  await f.stub.configure('normal');assert.equal((await plain(f.stub.invoke(f.refs))).status,'material_recorded');await f.stub.restoreMethods();
+  await inspect(await exerciseEnrollmentWriter(f,scenario),f);
+ }finally{await f.stub.restoreMethods();await f.mf.dispose();await f.cleanup();}
+}
+for(const scenario of ['double-enrollment','ack-first','double-ack','unknown-enrollment','unknown-ack','holder-drift','deadline'])test('T1 factual enrollment refuses '+scenario+' without repeated IO',()=>component(scenario,async result=>{
+ assert.equal(result.settled,true);assert(result.failure,JSON.stringify(result));assert(result.trace.includes('writer-prepared'),JSON.stringify(result));
+ assert(result.trace.filter(value=>value==='put:enrollment').length<=1);
+ assert(result.trace.filter(value=>value==='put:ack').length<=1);
+ if(['ack-first','holder-drift','deadline'].includes(scenario))assert.equal(result.trace.filter(value=>value.startsWith('put:')).length,0);
+ if(scenario==='unknown-enrollment'){assert.equal(result.trace.filter(value=>value==='put:enrollment').length,1);assert.equal(result.trace.filter(value=>value==='put:ack').length,0);}
+ if(scenario==='unknown-ack')assert.equal(result.trace.filter(value=>value==='put:ack').length,1);
+}));
+import {syntheticPreparation} from './fixtures/finite-connection-source.mjs';
+test('T1 fixed descriptions preserve literal wire and secret baseline inheritance',async()=>{
+ const {createFiniteFixedPolicyEngine}=await import('../lib/mcp-qa-finite-fixed-policy-engine.mjs'),engine=createFiniteFixedPolicyEngine({ctx:{},env:{}},()=>{});
+ const configuration=syntheticPreparation('closed_ui',{clientId:'SYNTHETIC_CLIENT',project:{projectId:'SYNTHETIC_PROJECT'},access:{audience:'SYNTHETIC_AUD',teamDomain:'synthetic.cloudflareaccess.com'},window:{expiresAt:1000000}}),baselineVersionId='22222222-2222-4222-8222-222222222222',bytes=new Uint8Array([1,2,3]);
+ const upload=engine.describeUpload({configuration,baselineVersionId,bytes});
+ assert.equal(upload.method,'POST');assert.equal(upload.path,'https://api.cloudflare.com/client/v4/accounts/85d0d5dadac3341a564f22ce885e9eec/workers/workers/agent-friendly-web-delegated-canary/versions?deploy=false');
+ assert.deepEqual(upload.body,{...configuration,containers:configuration.containers.map(({class_name})=>({class_name})),bindings:configuration.bindings.map(value=>value.type==='secret_text'?{name:value.name,type:'inherit',version_id:baselineVersionId}:value),modules:[{name:'index.mjs',content_type:'application/javascript+module',content_base64:'AQID'}]});
+ assert.deepEqual(engine.describeActivation({versionId:baselineVersionId}),{method:'POST',path:'https://api.cloudflare.com/client/v4/accounts/85d0d5dadac3341a564f22ce885e9eec/workers/scripts/agent-friendly-web-delegated-canary/deployments',body:{strategy:'percentage',versions:[{version_id:baselineVersionId,percentage:100}]}});
+ const activation=engine.describeActivation({versionId:baselineVersionId}),original=globalThis.fetch;
+ try{
+  const requests=[];globalThis.fetch=async(path,options)=>{requests.push({method:options.method,path,body:JSON.parse(options.body)});return Response.json({success:true,errors:[],messages:[],result:{id:'33333333-3333-4333-8333-333333333333'}});};
+  const native=createFiniteFixedPolicyEngine({ctx:{},env:{AFW_MCP_CLOSURE_PUBLISH_TOKEN:'SYNTHETIC_PUBLISHER_000000000000'}},()=>{}),lease={signal:new AbortController().signal,assertCurrent(){}};
+  await native.upload({configuration,baselineVersionId,bytes},lease);await native.activate({versionId:baselineVersionId},lease);
+  assert.deepEqual(requests,[upload,activation],'description and effective native request are identical');
+ }finally{globalThis.fetch=original;}
+
+});
+test('T1 engine holder drift is absorbing before another provider effect',async()=>{
+ const {createFiniteFixedPolicyEngine}=await import('../lib/mcp-qa-finite-fixed-policy-engine.mjs'),original=globalThis.fetch;
+ try{
+  let calls=0;globalThis.fetch=async()=>{calls++;return Response.json({success:true,errors:[],messages:[],result:{id:'33333333-3333-4333-8333-333333333333'}});};
+  const env={AFW_MCP_CLOSURE_PUBLISH_TOKEN:'SYNTHETIC_PUBLISHER_000000000000'},engine=createFiniteFixedPolicyEngine({ctx:{},env},()=>{}),lease={signal:new AbortController().signal,assertCurrent(){}};
+  env.AFW_MCP_CLOSURE_PUBLISH_TOKEN='SYNTHETIC_CHANGED_PUBLISHER_00000';await assert.rejects(engine.activate({versionId:'22222222-2222-4222-8222-222222222222'},lease));
+  env.AFW_MCP_CLOSURE_PUBLISH_TOKEN='SYNTHETIC_PUBLISHER_000000000000';await assert.rejects(engine.activate({versionId:'22222222-2222-4222-8222-222222222222'},lease));
+  assert.equal(calls,0);
+ }finally{globalThis.fetch=original;}
+});
```

### test/fixtures/finite-first-connection-publication.mjs

```diff
diff --git a/test/fixtures/finite-first-connection-publication.mjs b/test/fixtures/finite-first-connection-publication.mjs
--- /dev/null
+++ b/test/fixtures/finite-first-connection-publication.mjs
@@ -0,0 +1,91 @@
+// Fixed Node SYN component probes. DATA approvals exercise only the factual writer;
+// they never consume an admission, publish a version, or produce ConnectionReceipt.
+import assert from 'node:assert/strict';
+export async function plain(p){const v=await p;try{return JSON.parse(JSON.stringify(v));}finally{v[Symbol.dispose]?.();}}
+export function extendEnrollmentComponent(entry,writerAvailable){
+ const imports=`import {readPrivateQaFiniteInitialAnchors} from './lib/mcp-qa-finite-initial-anchors.mjs';
+ import {validateFiniteOwnerSource,encodeFinitePreparationRecord as encodePrep,hashFinitePreparationRecord as hashPrep,hashFiniteOwnerEvidence as componentEvidence,hashFiniteOwnerPreparationProject as projectHash} from './lib/mcp-qa-finite-preparation-records.mjs';
+ import {finiteActivationConfigurationHash} from './lib/mcp-activation-observer.mjs';
+ import {finitePublicProfileTemplate} from './lib/mcp-qa-finite-profile.mjs';
+ import {initialHash as initialDigest} from './lib/mcp-qa-finite-initial-material-records.mjs';
+ ${writerAvailable?"import {prepareFinitePreparationEnrollmentWrite} from './lib/mcp-qa-finite-preparation-enrollment-writer.mjs';":''}
+ `;
+ const methods=` async captureLegacyEnrollment(token,screen){
+  const s=this.ctx.storage,native={get:s.get,list:s.list,transaction:s.transaction,sync:s.sync,getAlarm:s.getAlarm},trace=[],P='afw.finite-preparation-cleanup.v1:';
+  const observe=(kind,key)=>{if(key?.startsWith(P))trace.push(kind+':'+key.slice(P.length));};
+  s.get=async(...a)=>{observe('get',a[0]);return Reflect.apply(native.get,s,a);};
+  s.list=async(...a)=>{observe('list',a[0]?.prefix);return Reflect.apply(native.list,s,a);};
+  s.getAlarm=async()=>{trace.push('alarm');return Reflect.apply(native.getAlarm,s,[]);};
+  s.sync=async()=>{trace.push('sync');return Reflect.apply(native.sync,s,[]);};
+  s.transaction=async fn=>{const result=await Reflect.apply(native.transaction,s,[tx=>fn({get:(...a)=>tx.get(...a),list:(...a)=>tx.list(...a),put:(key,value)=>{observe('put',key);return tx.put(key,value);}})]);trace.push('transaction-settled');return result;};
+  try{const result=await this.enrollmentPost(token,screen);return {result,trace:trace.slice(trace.indexOf('put:enrollment'))};}
+  finally{for(const [key,value]of Object.entries(native))s[key]=value;}
+ }
+  async exerciseEnrollmentComponent(scenario='normal'){
+   try{return await this.exerciseEnrollmentComponentBody(scenario);}
+   catch(error){console.info('T1 component setup failure',String(error?.stack??error));return {trace:[],enrollment:null,ack:null,failure:'SYN component setup: '+String(error),settled:true};}
+  }
+  async exerciseEnrollmentComponentBody(scenario='normal'){
+  const allowed=['normal','double-enrollment','ack-first','double-ack','unknown-enrollment','unknown-ack','holder-drift','deadline'];
+  if(!allowed.includes(scenario))throw Error('SYN scenario absent');
+  const ctx=this.ctx,env=this.env,s=ctx.storage,controller=new AbortController(),start=Date.now(),end=start+5000;
+  const lease=Object.freeze({signal:controller.signal,assertCurrent(){if(controller.signal.aborted||Date.now()>=end)throw Error('SYN original child expired');}});
+  const facts=await readPrivateQaFiniteInitialAnchors({ctx,env},lease),{capsule:c,material,actorId,plan}=facts,p=material.ownerSelection;
+  const source=validateFiniteOwnerSource({sourceRevision:c.sourceRevision,actorId,qaNamespaceId:finitePublicProfileTemplate('qaLive').bindings.find(b=>b.name==='AFW_INDEPENDENT_CLOSURE').namespace_id,qaVersionId:c.qaVersionId,origin:'https://delegated-canary.agentfriendlyweb.dev',phase:'closed_ui',access:p.access,clientId:p.clientId,resource:p.resource,project:p.project,goal:p.goal,programContext:{programHash:material.originalContext.original.programHash,sourceRevision:material.originalContext.original.sourceRevision,originalContextHash:initialDigest('afw.finite-original-context.v1',material.originalContext)},initialBaseline:{versionId:c.activatedVersionId,deploymentId:c.activatedDeploymentId,moduleHash:c.moduleHash,configurationHash:finiteActivationConfigurationHash(plan.configuration),bindingsHash:c.bindingsHash},currentPublication:{stage:null,versionId:c.activatedVersionId,deploymentId:c.activatedDeploymentId,receiptHash:null},window:{startedAt:c.I0,expiresAt:c.C0}});
+  const at=Date.now(),preconnectionId=c.preconnectionId,realm=componentEvidence('realm',{...source.access,origin:source.origin}),subjectHash=componentEvidence('subject',{accessRealmHash:realm,subject:p.subject}),ticketHash='8'.repeat(64),projectRef='7'.repeat(64);
+  const ticket={purpose:'afw.finite-owner-ticket.v1',ticketHash,subjectHash,sourceRevision:c.sourceRevision,projectRef,connectionRef:null,preconnectionId,action:'connection',createdAt:at,expiresAt:c.C0};
+  const decision={purpose:'afw.finite-connection-approval.v1',subjectHash,sourceRevision:c.sourceRevision,projectHash:projectHash(p.project),clientId:p.clientId,approvedAt:at,expiresAt:c.C0,csrfReceiptHash:componentEvidence('decision',{ticket,decision:'approve',projectHash:projectHash(p.project),goal:p.goal,clientId:p.clientId,approvedAt:at,expiresAt:c.C0})};
+  const approvalHash=hashPrep('ConfigurationApproval',decision),approval={purpose:'afw.finite-connection-stage-approval.v1',preconnectionId,sourceRevision:c.sourceRevision,stage:'connection',ticketHash,approvalHash};
+  const pre={purpose:'afw.finite-connection-preparation.v1',preconnectionId,sourceRevision:c.sourceRevision,actorId,owner:{subject:p.subject,accessRealmHash:realm,accessVerifiedAt:at,accessExpiresAt:c.C0},project:p.project,clientId:p.clientId,resource:p.resource,startedAt:at,expiresAt:c.C0,approvalHash,baselineHash:componentEvidence('baseline',source.initialBaseline)};pre.recordHash=hashPrep('Preconnection',pre);
+  const snapshot={preconnectionId,initialTicketHash:ticketHash,source};snapshot.sourceHash=hashPrep('OwnerSourceSnapshot',snapshot);
+  const prefix='connection-preparation:'+preconnectionId,rows=[[prefix+':record','Preconnection',pre],[prefix+':source','OwnerSourceSnapshot',snapshot],[prefix+':connection:approval','StageApproval',approval],['connection-approval:'+approvalHash,'ConfigurationApproval',decision],['owner-ticket:'+ticketHash,'Ticket',ticket],['owner-ticket:'+ticketHash+':use','TicketUse',{purpose:'afw.finite-owner-ticket-use.v1',ticketHash,recordHash:decision.csrfReceiptHash,consumedAt:at}],['owner-project-ref:'+projectRef,'ProjectRef',{projectRef,preconnectionId,subjectHash,sourceRevision:c.sourceRevision,projectId:p.project.projectId,revision:p.project.revision,issuedAt:at,expiresAt:c.C0}]];
+  for(const [key,kind,value]of rows)await s.put(key,encodePrep(kind,value));await s.sync();
+  const trace=[],native={get:s.get,list:s.list,transaction:s.transaction,sync:s.sync,getAlarm:s.getAlarm},metadata=env.AFW_QA_VERSION;
+  let committed=null,failure=null,enrollment=null,ack=null,settled=false,writer;
+  const P='afw.finite-preparation-cleanup.v1:';
+  const observe=(kind,key)=>{if(key?.startsWith(P))trace.push(kind+':'+key.slice(P.length));};
+  s.get=async(...args)=>{observe('get',args[0]);return Reflect.apply(native.get,s,args);};
+  s.list=async(...args)=>{observe('list',args[0]?.prefix);return Reflect.apply(native.list,s,args);};
+  s.getAlarm=async()=>{trace.push('alarm');return Reflect.apply(native.getAlarm,s,[]);};
+  s.sync=async()=>{trace.push('sync');return Reflect.apply(native.sync,s,[]);};
+  s.transaction=async fn=>{
+   const result=await Reflect.apply(native.transaction,s,[tx=>fn({get:(...args)=>tx.get(...args),list:(...args)=>tx.list(...args),put:(key,value)=>{observe('put',key);committed=key;return tx.put(key,value);}})]);
+   trace.push('transaction-settled');
+   if(scenario==='unknown-enrollment'&&committed===P+'enrollment'||scenario==='unknown-ack'&&committed===P+'ack')throw Error('SYN native commit return unknown');
+   return result;
+  };
+  try{
+   if(!${writerAvailable})throw Error('fixed factual enrollment writer contract absent');
+   const baseline={versionId:c.activatedVersionId,deploymentId:c.activatedDeploymentId,module:readPrivateQaFiniteCandidate().module,configuration:plan.configuration};
+   writer=await prepareFinitePreparationEnrollmentWrite({ctx,env,preconnectionId,stageApprovalHash:hashPrep('StageApproval',approval),ownerSource:source,baseline,baselineBytes:readPrivateQaFiniteCandidate().bytes},lease,end);
+   if(!Object.isFrozen(writer)||Object.keys(writer).sort().join(',')!=='recordAck,recordEnrollment')throw Error('SYN writer interface mismatch');
+   trace.push('writer-prepared');
+   if(scenario==='holder-drift')env.AFW_QA_VERSION={id:metadata.id};
+   if(scenario==='deadline')controller.abort();
+   if(scenario==='ack-first')await writer.recordAck();
+   else {
+    const first=writer.recordEnrollment();
+    if(scenario==='double-enrollment')await writer.recordEnrollment().then(()=>{throw Error('SYN duplicate accepted');},()=>{trace.push('duplicate-enrollment-denied');});
+    const recorded=await first;enrollment=recorded.enrollment;const enrollmentReturnedAt=Date.now();
+    if(recorded.ack!==null)throw Error('SYN premature ACK');
+    const second=writer.recordAck();
+    if(scenario==='double-ack')await writer.recordAck().then(()=>{throw Error('SYN duplicate accepted');},()=>{trace.push('duplicate-ack-denied');});
+    ack=(await second).ack;if(ack.acknowledgedAt>enrollmentReturnedAt)throw Error('SYN ACK was prepared after enrollment returned');
+   }
+  }catch(error){failure=String(error);}
+  finally{settled=true;for(const [key,value]of Object.entries(native))s[key]=value;env.AFW_QA_VERSION=metadata;controller.abort();}
+  return {trace,enrollment,ack,failure,settled};
+ }
+ `;
+ return imports+entry.replace(' export class Initial extends FiniteClosure{',' export class Initial extends FiniteClosure{'+methods);
+}
+export async function exerciseEnrollmentWriter(f,scenario){
+ assert.equal(f.mode,'first-connection-enrollment-component');
+ const before={uploads:f.uploads.length,activations:f.activations.length};
+ const result=await plain(f.stub.exerciseEnrollmentComponent(scenario));
+ assert.equal(f.uploads.length,before.uploads,'component has zero provider upload');
+ assert.equal(f.activations.length,before.activations,'component has zero provider activation');
+ const rows=await plain(f.stub.snapshot());
+ assert.equal(rows.filter(([key])=>key.startsWith('afw.finite-policy-effect.v1:')).length,0,'no ConnectionReceipt or SEND');
+ return result;
+}
```

### test/fixtures/finite-initial-entry-world.mjs

```diff
diff --git a/test/fixtures/finite-initial-entry-world.mjs b/test/fixtures/finite-initial-entry-world.mjs
--- a/test/fixtures/finite-initial-entry-world.mjs
+++ b/test/fixtures/finite-initial-entry-world.mjs
@@ -1,10 +1,11 @@
+import {extendEnrollmentComponent} from './finite-first-connection-publication.mjs';
 import {extendFiniteOwnerNoticeGet,captureNoticeBundle,instrumentFiniteNoticeGet} from './finite-owner-notice-get.mjs';
 import {FINITE_PREPARATION_MONITORING_SCHEMA} from '../../lib/mcp-qa-finite-preparation-issuer-store.mjs';
 import {instrumentFiniteOwnerIo,extendFiniteOwnerIo,delayFiniteOwnerIo} from './finite-owner-io-fanout.mjs';
 import {extendFiniteOwnerQaSdk,finiteOwnerSdkWorkers,instrumentFiniteOwnerQaSdk,instrumentFiniteOwnerQaSdkLate} from './finite-owner-qa-sdk.mjs';
 import {FINITE_PREPARATION_ISSUER_SCHEMA} from '../../lib/mcp-qa-finite-preparation-issuer-store.mjs';
 import {extendFiniteOwnerPhaseContext,seedFiniteOwnerPhaseHistory} from './finite-owner-phase-context.mjs';
 import {extendPreparationCleanupFixture} from './finite-preparation-cleanup-entry.mjs';
 import assert from 'node:assert/strict';
 import {createHash} from 'node:crypto';
 import {gzipSync} from 'node:zlib';
@@ -17,37 +18,39 @@
 import {initialHistoryFixture,seedInitialHistory} from './finite-initial-history-world.mjs';
 import {QA_CLOUD_CLOSED_PINS as realPins} from '../../lib/mcp-qa-cloud-closed-pins.mjs';
 import {initialHash} from '../../lib/mcp-qa-finite-initial-material-records.mjs';
 import {generateKeyPair,exportJWK,SignJWT} from 'jose';
 import {AFW_FIXED_WORKFLOWS} from '../../lib/mcp-fixed-terminal-workflows.mjs';
 import {restorationConfigurationHash} from '../../lib/mcp-restoration-configuration.mjs';
 import {finitePublicProfileTemplate,finiteWranglerProfileTemplate} from '../../lib/mcp-qa-finite-profile.mjs';
 const sha=x=>createHash('sha256').update(x).digest('hex'),J=JSON.stringify;
 const M='c'.repeat(40),TREE='d'.repeat(40),COMMAND=9001;
 export async function initialEntryHarness(mode='normal'){
- const pair=(mode.startsWith('enrollment')||mode==='private-choice'||mode.startsWith('phase-context-sdk'))?await generateKeyPair('RS256'):null,privateKey=pair?.privateKey,jwk=pair?{...await exportJWK(pair.publicKey),kid:'enrollment-SYN',alg:'RS256'}:null;
+ const enrollmentComponent=mode==='first-connection-enrollment-component';
+ const pair=(enrollmentComponent||mode.startsWith('enrollment')||mode==='private-choice'||mode.startsWith('phase-context-sdk'))?await generateKeyPair('RS256'):null,privateKey=pair?.privateKey,jwk=pair?{...await exportJWK(pair.publicKey),kid:'enrollment-SYN',alg:'RS256'}:null;
  const persist=mode.endsWith('restart')?await mkdtemp(join(tmpdir(),'afw-entry-restart-')):null;
  const sdkProfile=mode.startsWith('phase-context-sdk')?finiteWranglerProfileTemplate('qaLive'):null;
  const base={...(sdkProfile?{name:'qa-sdk'}:{}),...(persist?{resourcePersistencePath:persist}:{}),...(mode.startsWith('phase-context')?{kvNamespaces:{AFW_FINITE_OWNER_OAUTH_KV:'finite-sdk-shared'}}:{}),modules:true,compatibilityDate:sdkProfile?.compatibility_date??'2026-09-07',compatibilityFlags:sdkProfile?.compatibility_flags??['nodejs_compat'],ratelimits:{AFW_QA_OCCURRENCE_RATE_LIMITER:{namespace_id:'99122',simple:{limit:1000,period:60}}},bindings:{AFW_QA_VERSION:{id:UUID},AFW_MCP_CLOSURE_READ_TOKEN:'synthetic-native-reader',AFW_MCP_CLOSURE_PUBLISH_TOKEN:'synthetic-native-publisher'},d1Databases:{RELEASE_DB:'initial-db'},durableObjects:{AFW_INDEPENDENT_CLOSURE:{className:'Initial',useSQLite:true,uniqueKey:'initial-c2a'},AFW_RELEASE_EVENTS_NODE:{className:'Node',useSQLite:true,uniqueKey:'initial-node'}}};
  const mf=new Miniflare(convertV4MiniflareOptions({...base,script:'import{DurableObject}from"cloudflare:workers";export class Initial extends DurableObject{} export class Node extends DurableObject{} export default{fetch(){return new Response(null,{status:404})}};'}));
  let failedInitializationDisposal;
  const disposeFailedInitialization=()=>failedInitializationDisposal??=mf.dispose();
  try{
  const b=await mf.getBindings(),ns=b.AFW_RELEASE_EVENTS_NODE,x=initialHistoryFixture({original:ns.idFromName('afw-own-event-one-occurrence-v1').toString(),candidate:ns.idFromName('afw-own-event-first-successor-v1').toString()},mode);x.ids={original:x.original.containerId,candidate:ns.idFromName('afw-own-event-first-successor-v1').toString()};
  const program='SYNTHETIC actual resident candidate program',script='// SYNTHETIC B1 candidate bytes\nexport default{};',bytes=Buffer.from(script),compressed=gzipSync(bytes,{level:9,mtime:0}),resident={purpose:'afw.finite-candidate-residency.v1',encoding:'gzip-base64.v1',sourceRevision:M,sourceTree:TREE,sourceCheck:'git-inputs-before-after-v1',programHash:sha(program),module:{name:'index.mjs',sha256:sha(bytes),bytes:bytes.length},compressedSha256:sha(compressed),compressedBytes:compressed.length,content:compressed.toString('base64')};
  const w=await bootstrapWorld({sourceRevision:M,sourceTree:TREE,modules:{qaLive:{module:{name:'index.mjs',sha256:sha('export default{};'),bytes:17,exports:[...finitePublicProfileTemplate('qaLive').exports]}}},files:{'qaLive/index.mjs':'export default{};'}});
  const created=new Date(Math.floor((Date.now()-(['partial','upload-partial'].includes(mode)?40000:1000))/1000)*1000).toISOString().replace('.000Z','Z'),command={id:COMMAND,user:{id:290715446,login:'tokenizartinfo-ops',type:'User'},author_association:'OWNER',body:'/afw-qa-finite-prepare v1 '+M+' '+UUID,created_at:created,updated_at:created,issue_url:GH+'/issues/497'};w.map.set('/issues/comments/'+COMMAND,command);
  const approval=Date.now()+86400000;
  const opScript='// SYN operator closed\nexport default{};',opConfig={compatibility_date:'2026-09-07',compatibility_flags:['nodejs_compat'],main_module:'index.mjs',usage_model:'standard',containers:[],exports:{default:{type:'worker'}},bindings:[{name:'RELEASE_DB',type:'d1',id:'6a728254-1494-4039-802e-b39288a55fcc'},{name:'AFW_RELEASE_EVENTS_NODE',type:'durable_object_namespace',namespace_id:'d6fc71552de7494a863aca20365a572d',class_name:'AfwOwnEventNode'},{name:'AFW_RELEASE_OPERATOR_ENABLED',type:'plain_text',text:'false'}]},opPin={...realPins.operator,module:{name:'index.mjs',bytes:Buffer.byteLength(opScript),sha256:sha(opScript)},configurationHash:restorationConfigurationHash(opConfig)},opMetadata={...opConfig,id:opPin.id,urls:[],modules:[{name:'index.mjs',content_type:'application/javascript+module',content_base64:Buffer.from(opScript).toString('base64')}]};
  const f={mf,x,w,command,nowOffset:0,activations:[],restores:[],pointerMode:'baseline',alarmMode:'normal',requests:[],uploads:[],mode,pointerReads:0,tokenReads:0,publisherReads:0,baselineReads:0,held:null,release:null,commandReads:0,approval};
  let entry="\n import{DurableObject}from'cloudflare:workers';\n import*as workflowGate from'./lib/mcp-fixed-terminal-workflows.mjs';\n import*as activationWire from'./lib/mcp-qa-finite-initial-activation-wire.mjs';\n import{readPrivateQaFiniteCandidate}from'./lib/mcp-qa-finite-candidate-residency.mjs';\n import{observeFiniteOwnerRequestWork,observeFiniteOwnerStageWork}from'./lib/mcp-qa-finite-stage-work.mjs';\n import{readPrivateQaFiniteInitialOwnerSource}from'./lib/mcp-qa-finite-initial-owner-source.mjs';\n import{preparePrivateQaFiniteOwnerChoice}from'./lib/mcp-qa-finite-owner-preparation-qa.mjs';\n import{createFiniteOwnerRequestLease}from'./lib/mcp-qa-finite-owner-preparation.mjs';\n import*as historySchema from'./lib/mcp-qa-finite-initial-history-schema.mjs';\n import*as oldGuard from'./lib/mcp-qa-finite-initial-old-guard.mjs';\n import*as custodyProbe from'./lib/mcp-qa-finite-initial-custody-probe.mjs';\n import{IndependentClosure as FiniteClosure,PrivateQaBootstrap}from'./worker/independent-closure/finite.mjs';\n import{sealFiniteInitialCapsule}from'./lib/mcp-qa-finite-initial-capsule-records.mjs';\n import{initialCanonical,hashFiniteInitialMaterialRecord}from'./lib/mcp-qa-finite-initial-material-records.mjs';\n import{initialInstanceId}from'./lib/mcp-qa-finite-initial-material-records.mjs';\n import{sealFiniteInitialCleanupRecord as seal,encodeFiniteInitialCleanupRecord as enc}from'./lib/mcp-qa-finite-initial-cleanup-records.mjs';\n const P='afw.finite-initial-cleanup.v1:';\n const KEY='afw.finite-initial-preparation.v1:entry';\n export class Node extends DurableObject{}\n export class Initial extends FiniteClosure{\n async seed(rows){for(const[k,v]of rows)await this.ctx.storage.put(k,v);await this.ctx.storage.sync();}\n async snapshot(){return[...await this.ctx.storage.list()];}\n async mutateCleanup(key,mode){const k=P+key;if(mode==='delete')await this.ctx.storage.delete(k);else{const kinds={'activation-completion':'ActivationCompletion','restore-ack':'RestoreAck',receipt:'Receipt'},fields={'activation-completion':'ackHash','restore-ack':'sendHash',receipt:'restoreAckHash'},r=JSON.parse(await this.ctx.storage.get(k));delete r.purpose;delete r.recordHash;r[fields[key]]='a'.repeat(64);await this.ctx.storage.put(k,enc(kinds[key],seal(kinds[key],r)));}await this.ctx.storage.sync();}\n async capsuleFacts(){const s=this.ctx.storage,read=async k=>JSON.parse(await s.get(k)),prefix='afw.finite-initial-preparation.v1:',entry=await read(KEY),selector=await read(prefix+'selector');return {entry,claim:await read(prefix+'once'),selector,materialAck:await read(prefix+'ack'),material:await read(prefix+'material:'+selector.materialHash),plan:await read(P+'plan'),state:await read(P+'state'),arm:await read(P+'arm-ack'),send:await read(P+'activation-send'),activationAck:await read(P+'activation-ack'),completion:await read(P+'activation-completion'),recordedAt:Date.now()};}\n async probeCapsuleFacts(input){try{return{ok:true,capsule:sealFiniteInitialCapsule(input)};}catch{return{ok:false};}}\n async seedFutureActivation(kind='complete'){\n  // SYN FUTURE INPUT: production forward activation producer is deliberately ABSENT.\n  const p=JSON.parse(await this.ctx.storage.get(P+'plan')),annotation='afw-finite-initial-activate-'+p.recordHash,body=JSON.stringify({strategy:'percentage',versions:[{version_id:p.candidateVersionId,percentage:100}],annotations:{'workers/message':annotation}});\n  const arm=JSON.parse(await this.ctx.storage.get(P+'arm-ack')),issuedAt=kind==='pre-arm'?arm.acknowledgedAt-1:arm.acknowledgedAt,deadline=Math.min(p.forwardDeadline,issuedAt+5000);if(issuedAt<p.I0||deadline-issuedAt<4)throw Error('SYN forward deadline insufficient');const send=seal('ActivationSend',{planHash:p.recordHash,entryHash:p.entryHash,materialHash:p.materialHash,candidateVersionId:p.candidateVersionId,bodyHash:await crypto.subtle.digest('SHA-256',new TextEncoder().encode(body)).then(b=>[...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('')),annotation,issuedAt,deadline});\n  await this.ctx.storage.put(P+'activation-send',enc('ActivationSend',send));if(kind==='send')return;\n  const ack=seal('ActivationAck',{planHash:p.recordHash,sendHash:send.recordHash,deploymentId:'66666666-6666-4666-8666-666666666666',acknowledgedAt:issuedAt+1});\n  await this.ctx.storage.put(P+'activation-ack',enc('ActivationAck',ack));if(kind==='ack')return;\n  const completion=seal('ActivationCompletion',{planHash:p.recordHash,sendHash:send.recordHash,ackHash:ack.recordHash,candidateVersionId:p.candidateVersionId,deploymentId:ack.deploymentId,settledAt:issuedAt+2,observedAt:issuedAt+3});\n  await this.ctx.storage.put(P+'activation-completion',enc('ActivationCompletion',completion));await this.ctx.storage.sync();\n }\n async probeActivationWire(metadata,mode='normal'){\n  try{\n   const plan=JSON.parse(await this.ctx.storage.get(P+'plan')),arm=JSON.parse(await this.ctx.storage.get(P+'arm-ack')),entry=JSON.parse(await this.ctx.storage.get(KEY));\n   if(mode==='arm')arm.alarmAt++;\n   const issuedAt=arm.acknowledgedAt-(mode==='issued-before-arm'?1:0),deadline=mode==='deadline-too-long'?issuedAt+5001:Math.min(plan.forwardDeadline,issuedAt+5000),wire=activationWire.prepareFiniteInitialActivationWire({plan,arm,entry,issuedAt,deadline});\n   const result={id:'66666666-6666-4666-8666-666666666666',...JSON.parse(wire.body)};\n   if(mode==='wrong-version')result.versions[0].version_id=plan.baselineVersionId;\n   if(mode==='wrong-annotation')result.annotations['workers/message']='SYN invalid';\n   const ack=activationWire.qualifyFiniteInitialActivationAck({plan,send:wire.send,result,acknowledgedAt:mode==='ack-after-deadline'?deadline:issuedAt+1});\n   if(mode==='wrong-deployment')result.id='77777777-7777-4777-8777-777777777777';\n   if(mode==='wrong-module')metadata.modules[0].content_base64='AAAA';\n   let candidateBytes=readPrivateQaFiniteCandidate().bytes;\n   if(mode==='coherent-wrong-module'){candidateBytes=new TextEncoder().encode('SYN coherently altered module');metadata.modules[0].content_base64=Buffer.from(candidateBytes).toString('base64');}\n   if(mode==='same-size-wrong-module'){candidateBytes=candidateBytes.slice();candidateBytes[0]^=1;metadata.modules[0].content_base64=Buffer.from(candidateBytes).toString('base64');}\n   const completion=activationWire.qualifyFiniteInitialActivationCompletion({plan,send:wire.send,ack,pointer:result,metadata,bytes:candidateBytes,settledAt:issuedAt+2,observedAt:mode==='observation-after-deadline'?deadline:issuedAt+3});\n   return{status:'proposal_only',wire,ack,completion};\n  }catch{return{status:'rejected'};}\n }\n\n async ownerSourceRead(delta=400000,mode='normal',preconnectionId=null,token=null){\n  const s=this.ctx.storage,raw=JSON.parse(await s.get('afw.finite-initial-preparation.v1:capsule')),now=Date.now,get=s.get,list=s.list,alarm=s.getAlarm,put=s.put,transaction=s.transaction,sync=s.sync,fetcher=globalThis.fetch,version=this.env.AFW_QA_VERSION,node=this.env.AFW_RELEASE_EVENTS_NODE,db=this.env.RELEASE_DB,withSession=db.withSession;let offset=raw.I0+delta-now(),reads=0,capsuleReads=0;\n  Date.now=()=>now()+offset;\n  const requestAbort=new AbortController(),request=new Request('https://delegated-canary.agentfriendlyweb.dev/connections/finite-prepare',{signal:requestAbort.signal,headers:token?{'Cf-Access-Jwt-Assertion':token}:{}}),entry=createFiniteOwnerRequestLease(request);\n  if(mode==='request-budget')offset+=29900;this.ownerEffects=0;\n  const noWrite=()=>{this.ownerEffects++;throw Error('SYN owner reader attempted a write');};if(mode!=='private-choice'){s.put=noWrite;s.transaction=noWrite;s.sync=noWrite;}\n  if(['held-fetch','held-body','held-cancel'].includes(mode)){const owner=this;globalThis.fetch=(...args)=>Reflect.apply(fetcher,globalThis,args).then(async response=>{\n   if(mode==='held-fetch')return new Promise(resolve=>{owner.releaseHeld=()=>resolve(response);});\n   await response.body.cancel();\n   if(mode==='held-cancel')return new Response(new ReadableStream({cancel(){return new Promise(resolve=>{owner.releaseCancel=resolve;});}}),{status:401,headers:response.headers});\n   let pulled=false;return new Response(new ReadableStream({pull(controller){if(pulled)return;pulled=true;return new Promise(resolve=>{owner.releaseRead=()=>{controller.enqueue(new Uint8Array([123]));resolve();};});},cancel(){return new Promise(resolve=>{owner.releaseCancel=resolve;});}}),{headers:response.headers});\n  });}\n  s.get=async(...a)=>{const v=await Reflect.apply(get,s,a);reads++;if(a[0].endsWith(':capsule'))capsuleReads++;\n   if(['held-read','request-budget','nested-request-held-read'].includes(mode)&&reads===1)return new Promise(resolve=>{this.releaseHeld=()=>resolve(v);});\n   if(mode==='holder-drift'&&reads===1)this.env.AFW_RELEASE_EVENTS_NODE={};\n   if(mode==='backward'&&reads===1)offset-=100;\n   if(mode==='parent-deadline'&&reads===1)offset+=30001;\n   if(mode==='aborted'&&reads===1)entry.finish();if(mode==='request-abort'&&reads===1)requestAbort.abort();\n   if(mode==='missing'&&a[0].endsWith(':capsule'))return undefined;\n   if(mode==='malformed'&&a[0].endsWith(':capsule'))return v+' ';\n   if(mode==='hash'&&a[0].endsWith(':capsule')){const x=JSON.parse(v);x.bindingsHash='f'.repeat(64);return initialCanonical(x);}\n   if(mode==='material'&&a[0].includes(':material:'))return v+' ';\n   if(mode.startsWith('anchor-')&&a[0].endsWith(':'+mode.slice(7)))return v+' ';\n   if(mode==='changed-anchor'&&capsuleReads>1&&a[0].endsWith(':capsule'))return v+' ';\n   return v;\n  };\n  s.getAlarm=(...a)=>mode==='alarm'?Promise.resolve(raw.C0+1):Reflect.apply(alarm,s,a);\n  s.list=(...a)=>Reflect.apply(list,s,a).then(rows=>{if(mode.startsWith('anchor-')&&rows.has(P+mode.slice(7)))rows.set(P+mode.slice(7),rows.get(P+mode.slice(7))+' ');if(mode==='transition'&&a[0]?.prefix===P)rows.set(P+'restore-send','SYN transition');if(mode==='head'&&a[0]?.prefix==='afw.qa-finite-trial.v1:')rows.set('afw.qa-finite-trial.v1:head','SYN head');if(mode==='publication'&&a[0]?.prefix==='afw.finite-policy-effect.v1:')rows.set(a[0].prefix+'writer-head','SYN publication');return rows;});\n  if(mode==='wrong-version')this.env.AFW_QA_VERSION={id:'99999999-9999-4999-8999-999999999999'};\n  const ctx=mode==='wrong-actor'?{storage:s,id:this.env.AFW_INDEPENDENT_CLOSURE.idFromName('SYN-wrong')}:this.ctx;\n  const restore=()=>{Date.now=now;s.get=get;s.list=list;s.getAlarm=alarm;s.put=put;s.transaction=transaction;s.sync=sync;globalThis.fetch=fetcher;this.env.AFW_QA_VERSION=version;this.env.AFW_RELEASE_EVENTS_NODE=node;db.withSession=withSession;};\n  this.ownerRestore=restore;\n  try{if(mode==='private-choice')return await observeFiniteOwnerRequestWork({ctx,env:this.env,originalLease:entry.lease},()=>preparePrivateQaFiniteOwnerChoice({ctx,env:this.env,request},entry.lease));if(mode.startsWith('nested-request'))return await observeFiniteOwnerRequestWork({ctx,env:this.env,originalLease:entry.lease},()=>readPrivateQaFiniteInitialOwnerSource({ctx,env:this.env,parent:entry.lease,preconnectionId}));if(mode==='untrusted-parent')return await readPrivateQaFiniteInitialOwnerSource({ctx,env:this.env,parent:{signal:entry.lease.signal,assertCurrent:()=>{}},preconnectionId});return await readPrivateQaFiniteInitialOwnerSource({ctx,env:this.env,parent:entry.lease,preconnectionId});}\n  catch{return{status:'unavailable'};}finally{entry.finish();restore();}\n }\n\n async ownerEffectCount(){return this.ownerEffects??0;}\n async preEntryCustody(mode='normal'){const ctx=mode==='wrong-actor'?{storage:this.ctx.storage,id:this.env.AFW_INDEPENDENT_CLOSURE.idFromName('wrong-actor')}:this.ctx;return await custodyProbe.readFinitePreEntryCustody({ctx,env:this.env});}\n async probeStageAvailability(){const controller=new AbortController(),lease=Object.freeze({signal:controller.signal,assertCurrent:()=>{}}),admission=Object.freeze({lease});try{await observeFiniteOwnerStageWork({ctx:this.ctx,env:this.env,admission,originalLease:lease},async()=>true);return{available:true};}catch{return{available:false};}finally{controller.abort();}}\n async probeNativeCustody(mode='normal'){const controller=new AbortController(),lease=Object.freeze({signal:controller.signal,assertCurrent:()=>{if(mode==='expired')throw Error('SYN parent expired');}}),admission=Object.freeze({lease});try{if(mode==='aborted')controller.abort();if(mode==='unscoped')return await custodyProbe.readFiniteNativeCustodyProbe({ctx:this.ctx,env:this.env},lease);return await observeFiniteOwnerStageWork({ctx:this.ctx,env:this.env,admission,originalLease:lease},()=>custodyProbe.readFiniteNativeCustodyProbe({ctx:this.ctx,env:this.env},lease));}catch{return{status:'unavailable'};}finally{controller.abort();}}\n async probeOldGuard(mode='normal'){try{const controller=new AbortController();if(mode==='aborted')controller.abort();return await oldGuard.readFiniteInitialOldGuard({env:this.env},{signal:controller.signal,assertCurrent:()=>{if(mode==='expired')throw Error('SYN parent expired');}});}catch{return{status:'unavailable'};}}\n async probeHistorySchema(mode='normal'){try{const controller=new AbortController();if(mode==='aborted')controller.abort();return await historySchema.readFiniteInitialHistorySchema({env:this.env},{signal:controller.signal,assertCurrent:()=>{if(mode==='expired')throw Error('SYN parent expired');}});}catch{return{status:'unavailable'};}}\n async probeInitialInventory(){try{const raw=await this.ctx.storage.get(KEY),entry=JSON.parse(raw),read=async(path,query)=>{const url='https://api.cloudflare.com/client/v4/accounts/85d0d5dadac3341a564f22ce885e9eec'+path+(query?'?'+new URLSearchParams(query):''),r=await fetch(url,{headers:{Authorization:'Bearer '+this.env.AFW_MCP_CLOSURE_READ_TOKEN}}),v=await r.json();return{value:v.result,info:v.result_info};};return await workflowGate.readFiniteInitialAfwWorkflows({read,assertCurrent:()=>{},entry});}catch{return{status:'unavailable'};}}\n async initialAlarmAt(at){const original=Date.now,offset=at-original(),db=this.env.RELEASE_DB,withSession=db.withSession;\n  // SYN time advance: keep native D1 query and data, shift only its SQL clock to match worker clock.\n  db.withSession=(...args)=>{const session=Reflect.apply(withSession,db,args),prepare=session.prepare;session.prepare=sql=>Reflect.apply(prepare,session,[sql.replace(' AS INTEGER) dbNow',' AS INTEGER)+'+offset+' dbNow')]);return session;};\n  Date.now=()=>original()+offset;try{return await this.alarm();}finally{Date.now=original;db.withSession=withSession;}}\n async alarmInfo(){return this.ctx.storage.getAlarm();}\n async initialAlarm(){return this.alarm();}\n async nominalAlarmData(){const r=await this.alarm();return {state:await r?.state};}\n async installAlarm(at){return this.ctx.storage.setAlarm(at);}\n async configure(mode){\n  this.localBodyCancelled=false;const actualFetch=globalThis.fetch;\n  if(mode==='late-body-observe'){const owner=this;globalThis.fetch=(...args)=>Reflect.apply(actualFetch,globalThis,args).then(response=>{if(!String(args[0]).includes('/instances-v2?state=active'))return response;response.body?.cancel().catch(()=>{});return new Response(new ReadableStream({cancel(){owner.localBodyCancelled=true;}}),{headers:response.headers,status:response.status});});}\n  if(mode==='late-activation-cancel'){const owner=this;globalThis.fetch=(...args)=>Reflect.apply(actualFetch,globalThis,args).then(response=>{if(!String(args[0]).endsWith('/workers/scripts/agent-friendly-web-delegated-canary/deployments')||args[1]?.method!=='POST')return response;response.body?.cancel().catch(()=>{});return new Response(new ReadableStream({cancel(){return new Promise(resolve=>{owner.releaseCancel=resolve;});}}),{headers:response.headers,status:response.status});});}\n  if(mode==='late-activation-read'){const owner=this;globalThis.fetch=(...args)=>Reflect.apply(actualFetch,globalThis,args).then(response=>{if(!String(args[0]).endsWith('/workers/scripts/agent-friendly-web-delegated-canary/deployments')||args[1]?.method!=='POST')return response;response.body?.cancel().catch(()=>{});let requested=false;return new Response(new ReadableStream({pull(controller){if(requested)return;requested=true;return new Promise(resolve=>{owner.releaseRead=()=>{controller.enqueue(new Uint8Array([123]));resolve();};});},cancel(){return new Promise(resolve=>{owner.releaseCancel=resolve;});}}),{headers:response.headers,status:response.status});});}\n  this.fault=mode;this.transactions=0;this.syncs=0;this.callbacks=0;this.uploadStage=null;this.uploadTransactions=0;this.cleanupStage=null;this.activationStage=null;this.capsuleStage=false;this.capsuleTransactions=0;\n  const s=this.ctx.storage,nt=s.transaction,ns=s.sync,ng=s.get,db=this.env.RELEASE_DB,node=this.env.AFW_RELEASE_EVENTS_NODE,dbSession=db.withSession,nodeString=node.idFromString,publisher=this.env.AFW_MCP_CLOSURE_PUBLISH_TOKEN,nga=s.getAlarm,nlist=s.list;\n  this.restore=()=>{globalThis.fetch=actualFetch;s.transaction=nt;s.sync=ns;s.get=ng;s.getAlarm=nga;s.list=nlist;this.env.RELEASE_DB=db;this.env.AFW_RELEASE_EVENTS_NODE=node;db.withSession=dbSession;node.idFromString=nodeString;this.env.AFW_MCP_CLOSURE_PUBLISH_TOKEN=publisher;};\n  s.transaction=(fn,...args)=>{\n   const n=++this.transactions;\n   if(n===1&&mode==='changed-db-with-session')db.withSession=(...args)=>Reflect.apply(dbSession,db,args);\n   if(n===1&&mode==='changed-node-id-from-string')node.idFromString=(...args)=>Reflect.apply(nodeString,node,args);\n   if(mode==='never-commit'&&n===1)return Promise.reject(Error('SYN precommit failure'));\n   if(mode==='callback-retry'&&n===1)return(async()=>{\n    let candidate;\n    await Reflect.apply(nt,s,[async tx=>{this.callbacks++;await fn(tx);candidate=await tx.get(KEY);tx.rollback();}]);\n    await s.put(KEY,candidate);await Reflect.apply(ns,s,[]);\n    return Reflect.apply(nt,s,[async tx=>{this.callbacks++;return fn(tx);}]);\n   })();\n   let stage,sendPair,arm=false,armRows=[],activationStage,capsuleWrite=false;\n   const capsuleTx=this.activationStage==='completion';if(capsuleTx)this.capsuleTransactions++;\n   const wrapped=async tx=>{\n    const actual=await fn({get:async(...a)=>{\n     const value=await tx.get(...a);\n     if(capsuleTx){\n      const k=a[0],prefix='afw.finite-initial-preparation.v1:',aliases={entry:KEY,claim:prefix+'once',selector:prefix+'selector',materialAck:prefix+'ack',material:k.startsWith(prefix+'material:')?k:null,plan:P+'plan',state:P+'state',arm:P+'arm-ack',send:P+'activation-send',activationAck:P+'activation-ack',completion:P+'activation-completion',head:'afw.qa-finite-trial.v1:head'};\n      if(mode.startsWith('capsule-missing-')&&k===aliases[mode.slice(16)])return undefined;\n      if(mode.startsWith('capsule-mismatch-')&&k===aliases[mode.slice(17)])return value+' ';\n      if(mode==='capsule-coherent-ack'&&k===prefix+'ack'){const v=JSON.parse(value);v.acknowledgedAt++;return initialCanonical(v);}\n      if(mode==='capsule-coherent-claim'&&k===prefix+'once'){const v=JSON.parse(value);v.deadline--;v.claimHash=hashFiniteInitialMaterialRecord('InitialClaim',v);return initialCanonical(v);}\n      if(mode==='capsule-finite-head'&&k===aliases.head)return {intentId:'SYN conflict'};\n     }\n     return value;\n    },setAlarm:mode==='cleanup-missing-tx-alarm'?undefined:(...a)=>tx.setAlarm(...a),deleteAlarm:(...a)=>tx.deleteAlarm(...a),put:async(k,v)=>{\n     if(k==='afw.finite-initial-preparation.v1:capsule')capsuleWrite=true;\n     if(k===P+'plan'||k===P+'state'){arm=true;armRows.push([k,v]);}\n     if(k.startsWith(P+'activation-'))activationStage=k.slice((P+'activation-').length);\n     if(k.startsWith('afw.finite-initial-upload.v1:')){stage=k.split(':').at(-1);if(stage==='send'){sendPair=[k,v];this.uploadTransactions++;if(mode==='upload-publisher-drift')this.env.AFW_MCP_CLOSURE_PUBLISH_TOKEN='changed-synthetic-publisher';}}\n     return tx.put(k,v);\n    }});\n    if(arm&&mode==='cleanup-callback-retry')tx.rollback();\n    if(arm&&mode==='cleanup-never-commit'){tx.rollback();throw Error('SYN cleanup precommit');}\n    if(stage==='send'&&mode==='upload-callback-retry')tx.rollback();\n    if(stage==='send'&&mode==='upload-never-commit'){tx.rollback();throw Error('SYN upload precommit rejected');}\n    return actual;\n   };\n   const actual=Reflect.apply(nt,s,[mode.startsWith('upload-')||mode.startsWith('cleanup-')||mode.startsWith('activation-storage-')||mode.startsWith('capsule-')?wrapped:fn,...args]).then(v=>{this.uploadStage=stage??this.uploadStage;if(arm)this.cleanupStage='plan';if(activationStage)this.activationStage=activationStage;if(capsuleWrite)this.capsuleStage=true;return v;});\n   if(mode==='capsule-held-transaction')return actual.then(v=>capsuleWrite?new Promise(resolve=>{this.releaseHeld=()=>resolve(v);}):v);\n   if(mode==='capsule-return-lost'||mode==='capsule-completion-return-lost')return actual.then(v=>{if(capsuleWrite||mode==='capsule-completion-return-lost'&&activationStage==='completion')throw Error('SYN journal transaction return lost');return v;});\n   if(mode==='activation-storage-return-lost')return actual.then(v=>{if(activationStage==='send')throw Error('SYN committed SEND return lost');return v;});\n   if(mode.startsWith('cleanup-'))return actual.then(async v=>{\n    if(arm&&mode==='cleanup-callback-retry'){for(const row of armRows)await s.put(...row);const p=JSON.parse(armRows.find(([k])=>k===P+'plan')[1]);await s.setAlarm(p.C0);await Reflect.apply(ns,s,[]);return Reflect.apply(nt,s,[fn]);}\n    if(arm&&mode==='cleanup-final-return-lost'){await Reflect.apply(ns,s,[]);throw Error('SYN final cleanup transaction return lost');}\n    return v;\n   });\n   if(mode.startsWith('upload-'))return actual.then(async v=>{\n    if(stage==='send'&&mode==='upload-callback-retry'){await s.put(...sendPair);await Reflect.apply(ns,s,[]);return Reflect.apply(nt,s,[fn]);}\n    if(stage==='send'&&mode==='upload-lost-send-ack'){await Reflect.apply(ns,s,[]);throw Error('SYN upload committed ACK lost');}\n    if(stage==='send'&&mode==='upload-held-send')return new Promise(resolve=>{this.releaseHeld=()=>resolve(v);});\n    return v;\n   });\n   if(mode==='lost-ack'&&n===1)return actual.then(async()=>{await Reflect.apply(ns,s,[]);throw Error('SYN committed ACK lost');});\n   if(mode==='changed-sync'&&n===1)return actual.then(v=>{s.sync=()=>Promise.resolve();return v;});\n   if(mode==='held-transaction'&&n===1)return actual.then(v=>new Promise(resolve=>{this.releaseHeld=()=>resolve(v);}));\n   return actual;\n  };\n  s.sync=(...args)=>{\n   const n=++this.syncs,actual=Reflect.apply(ns,s,args);\n   if(mode==='capsule-sync-lost'&&this.capsuleStage||mode==='capsule-completion-sync-lost'&&this.activationStage==='completion')return actual.then(()=>{throw Error('SYN capsule sync lost');});\n   if(mode==='capsule-held-sync'&&this.capsuleStage)return actual.then(()=>new Promise(resolve=>{this.releaseHeld=resolve;}));\n   if(mode==='capsule-holder-drift'&&this.capsuleStage)return actual.then(()=>{this.env.AFW_MCP_CLOSURE_PUBLISH_TOKEN='changed-synthetic-publisher';});\n   if(mode==='capsule-expired-completion'&&this.activationStage==='completion')return actual.then(()=>new Promise(resolve=>{this.releaseHeld=resolve;}));\n   if(mode==='activation-storage-sync-lost'&&this.activationStage==='send')return actual.then(()=>{throw Error('SYN SEND sync lost');});\n   if(mode==='cleanup-reject-sync'&&this.cleanupStage==='plan')return actual.then(()=>{throw Error('SYN cleanup sync lost');});\n   if(mode==='cleanup-hold-sync'&&this.cleanupStage==='plan')return actual.then(()=>new Promise(resolve=>{this.releaseHeld=resolve;}));\n   if(mode==='cleanup-nominal-conflict'&&this.uploadStage==='receipt')return actual.then(()=>s.put('afw.qa-finite-trial.v1:head',{intentId:'SYN conflict'}));\n   if(mode==='cleanup-publisher-drift'&&this.cleanupStage==='plan')return actual.then(()=>{this.env.AFW_MCP_CLOSURE_PUBLISH_TOKEN='changed-synthetic-publisher';});\n\n   if(mode==='upload-reject-sync'&&this.uploadStage==='send')return actual.then(()=>{throw Error('SYN upload sync ACK lost');});\n   if(mode==='upload-hold-sync'&&this.uploadStage==='send'||mode==='upload-hold-ack-sync'&&this.uploadStage==='ack')return actual.then(()=>new Promise(resolve=>{this.releaseHeld=resolve;}));\n   if(['upload-chunk-tamper','upload-config-tamper'].includes(mode)&&n===3)return actual.then(async()=>{for(const[k,v]of await s.list()){if(mode==='upload-chunk-tamper'?k.includes(':chunk:'):k.endsWith(':backup')){const x=JSON.parse(v);if(mode==='upload-chunk-tamper')x.content='AAAA';else x.rawConfiguration.usage_model='changed';await s.put(k,JSON.stringify(x));break;}}});\n\n   if(mode==='reject-sync'&&n===1||mode==='post-reject-sync'&&n===2)return actual.then(()=>{throw Error('SYN sync ACK lost');});\n   if(mode==='hold-sync'&&n===1||mode==='post-hold-sync'&&n===2)return actual.then(()=>new Promise(resolve=>{this.releaseHeld=resolve;}));\n   return actual;\n  };\n  if(mode.startsWith('capsule-'))s.get=async(...a)=>{\n   const value=await Reflect.apply(ng,s,a),key=a[0];\n   if(key==='afw.finite-initial-preparation.v1:capsule'&&value!==undefined){\n    if(mode==='capsule-readback-lost')throw Error('SYN capsule readback lost');\n    if(mode==='capsule-held-readback')return new Promise(resolve=>{this.releaseHeld=()=>resolve(value);});\n   }\n   if(mode==='capsule-completion-readback-lost'&&key===P+'activation-completion'&&value!==undefined)throw Error('SYN completion readback lost');\n   return value;\n  };\n  if(mode==='upload-readback-tamper')s.get=async(...a)=>{const value=await Reflect.apply(ng,s,a);return a[0].startsWith('afw.finite-initial-upload.v1:')&&a[0].endsWith(':send')&&value!==undefined?value+' ':value;};\n  if(mode==='gate-retention'){\n   db.withSession=(...args)=>{\n    const session=Reflect.apply(dbSession,db,args),prepare=session.prepare;\n    session.prepare=(sql,...more)=>{\n     const statement=Reflect.apply(prepare,session,[sql,...more]);\n     if(sql.includes('FROM sqlite_schema')){\n      const all=statement.all;\n      statement.all=(...params)=>Reflect.apply(all,statement,params).then(value=>new Promise(resolve=>{this.releaseHeld=()=>resolve(value);}));\n     }\n     return statement;\n    };\n    return session;\n   };\n  }\n  if(mode==='missing-get-alarm')s.getAlarm=undefined;\n  if(mode==='late-initial-journal'||mode==='preexisting-send'){let reads=0;s.list=(...args)=>Reflect.apply(nlist,s,args).then(async rows=>{if(++reads===3){if(mode==='preexisting-send')await s.put(P+'activation-send','SYN conflict');rows.set(P+'activation-send','SYN conflict');}return rows;});}\n  if(mode==='missing-list')s.list=undefined;\n  if(mode==='cleanup-alarm-ack-lost')s.getAlarm=(...a)=>this.cleanupStage==='plan'?Promise.reject(Error('SYN native alarm ACK lost')):Reflect.apply(nga,s,a);\n  if(mode==='missing-publisher')this.env.AFW_MCP_CLOSURE_PUBLISH_TOKEN=undefined;\n  if(mode==='invalid-publisher')this.env.AFW_MCP_CLOSURE_PUBLISH_TOKEN='bad token';\n  if(mode==='missing-sync')s.sync=undefined;\n  if(mode==='missing-db')this.env.RELEASE_DB=undefined;\n  if(mode==='missing-node')this.env.AFW_RELEASE_EVENTS_NODE=undefined;\n  if(mode==='missing-db-with-session')db.withSession=undefined;\n  if(mode==='noncallable-db-with-session')db.withSession=0;\n  if(mode==='missing-node-id-from-string')node.idFromString=undefined;\n  if(mode==='noncallable-node-id-from-string')node.idFromString=0;\n }\n async invoke(refs){return typeof this.prepareFiniteInitialMaterial==='function'?this.prepareFiniteInitialMaterial(refs):{status:'admin_pending',mayRetry:false,operationalReadiness:false};}\n async release(){this.releaseHeld?.();this.releaseHeld=null;}\n async releaseBodyCancel(){this.releaseCancel?.();this.releaseCancel=null;}\n async releaseBodyRead(){this.releaseRead?.();this.releaseRead=null;}\n async stats(){return{transactions:this.transactions,capsuleTransactions:this.capsuleTransactions,capsuleStage:this.capsuleStage,syncs:this.syncs,callbacks:this.callbacks,uploadTransactions:this.uploadTransactions,uploadStage:this.uploadStage,held:typeof this.releaseHeld==='function',bodyCancelled:this.localBodyCancelled===true,cancelHeld:typeof this.releaseCancel==='function',readHeld:typeof this.releaseRead==='function'};}\n async restoreMethods(){this.releaseHeld?.();this.releaseRead?.();this.releaseCancel?.();this.restore?.();}\n\n }export default{async fetch(request,env){const refs=await request.json();\n  const event={payload:{operation:'finite_initial_preparation',commandId:refs.commandId,sourceRevision:refs.sourceRevision,qaVersionId:refs.qaVersionId},timestamp:new Date(refs.createdAt),instanceId:refs.initialInstanceId,workflowName:refs.workflowName};\n  // Explicit SYN event/step delivery; actual production Workflow class/run and DO RPC.\n  let config;const step={do:async(name,options,fn)=>{config={name,options};return fn();}};\n  const result=await PrivateQaBootstrap.prototype.run.call({env:env},event,step);return Response.json({result,config});}};\n";
- if(mode.startsWith('enrollment'))entry=extendPreparationCleanupFixture(entry);
+ if(mode.startsWith('enrollment')||enrollmentComponent)entry=extendPreparationCleanupFixture(entry);
+ if(enrollmentComponent)entry=extendEnrollmentComponent(entry,await readFile('lib/mcp-qa-finite-preparation-enrollment-writer.mjs','utf8').then(()=>true,()=>false));
  if(mode.startsWith('phase-context'))entry=extendFiniteOwnerPhaseContext(entry);
  if(mode.startsWith('phase-context-sdk'))entry=extendFiniteOwnerQaSdk(entry,{observed:mode.startsWith('phase-context-sdk-observed'),noticeGet:mode==='phase-context-sdk-token-notice-get'});
  if(mode==='phase-context-sdk-io'||mode==='phase-context-sdk-token-notice-get')entry=extendFiniteOwnerIo(entry);
  if(mode==='phase-context-sdk-token-notice-get')entry=extendFiniteOwnerNoticeGet(entry);
  let product;try{product=await readFile('lib/mcp-qa-finite-initial-material.mjs','utf8');}catch{product='export function createPrivateQaFiniteInitialMaterial(){return{collect:async()=>({status:"admin_pending"}),assertCurrent(){throw Error("missing original factual producer");}};}';}
  const approvalDecl="CEILING=Date.parse('2026-11-03T02:59:00Z')";
  if(product.includes(approvalDecl)){assert.equal(product.split(approvalDecl).length,2);product=product.replace(approvalDecl,'CEILING='+approval);}
  const sources=new Map();
  for(const p of ['mcp-qa-finite-initial-entry.mjs','mcp-qa-finite-initial-entry-records.mjs','mcp-qa-finite-initial-capsule-records.mjs','mcp-qa-finite-initial-cleanup.mjs']){try{const s=await readFile('lib/'+p,'utf8');sources.set(p,s.replaceAll("Date.parse('2026-11-03T02:59:00Z')",String(approval)));}catch{/* RED: finite class has no entry yet. */}}
  for(const p of ['mcp-qa-finite-historical-source.mjs','mcp-qa-finite-bootstrap-native.mjs']){
@@ -64,21 +67,21 @@
   if(mode==='phase-context-sdk-io')b.onLoad({filter:/mcp-qa-finite-owner-phase-context\.mjs$/},async args=>({contents:instrumentFiniteOwnerIo(await readFile(args.path,'utf8')),loader:'js'}));
   if(mode==='phase-context-sdk-token-late')b.onLoad({filter:/mcp-qa-finite-owner-phase-context\.mjs$/},async args=>({contents:instrumentFiniteOwnerQaSdkLate(await readFile(args.path,'utf8')),loader:'js'}));
   if(mode.startsWith('phase-context-sdk-observed'))b.onLoad({filter:/mcp-qa-finite-owner-phase-context\.mjs$/},async args=>({contents:instrumentFiniteOwnerQaSdk(await readFile(args.path,'utf8')),loader:'js'}));
   if(mode.startsWith('enrollment-pin-'))b.onLoad({filter:/mcp-qa-finite-initial-anchors\.mjs$/},async args=>{
    let contents=await readFile(args.path,'utf8');
    const needle='const compiledResidency=globalThis.__AFW_FINITE_CANDIDATE_RESIDENCY__??null;';
    assert.equal(contents.split(needle).length,2);
    const values={'enrollment-pin-absent':'null','enrollment-pin-foreign':"({...globalThis.__AFW_FINITE_CANDIDATE_RESIDENCY__,sourceRevision:'f'.repeat(40)})",'enrollment-pin-malformed':"({...globalThis.__AFW_FINITE_CANDIDATE_RESIDENCY__,module:{name:'index.mjs',sha256:'f',bytes:1}})",'enrollment-pin-accessor':"Object.defineProperty({...globalThis.__AFW_FINITE_CANDIDATE_RESIDENCY__},'module',{enumerable:true,get(){throw Error('SYN accessor executed');}})"};
    contents=contents.replace(needle,'const compiledResidency='+values[mode]+';');return {contents,loader:'js'};
   });
-  if(mode.startsWith('enrollment'))b.onResolve({filter:/mcp-qa-finite-(owner-source|connection-source)\.mjs$/},()=>({path:process.cwd()+'/test/fixtures/finite-preparation-cleanup-source.mjs'}));
+  if(mode.startsWith('enrollment')||enrollmentComponent)b.onResolve({filter:/mcp-qa-finite-(owner-source|connection-source)\.mjs$/},()=>({path:process.cwd()+'/test/fixtures/finite-preparation-cleanup-source.mjs'}));
   b.onLoad({filter:/mcp-qa-finite-initial-material\.mjs$/},()=>({contents:product,loader:'js'}));
   b.onResolve({filter:/mcp-qa-finite-initial-material\.mjs$/},()=>({path:process.cwd()+'/lib/mcp-qa-finite-initial-material.mjs'}));
   b.onLoad({filter:/mcp-qa-finite-(initial-entry|initial-entry-records|initial-capsule-records|initial-cleanup|historical-source|bootstrap-native)\.mjs$/},args=>({contents:sources.get(args.path.split('/').at(-1)),loader:'js'}));
   b.onLoad({filter:/mcp-confirmation-frozen-artifact\.json$/},()=>({contents:J(x.receipt),loader:'json'}));
   b.onLoad({filter:/mcp-qa-legacy-historical-context\.json$/},()=>({contents:J(x.historical),loader:'json'}));
   b.onLoad({filter:/mcp-qa-cloud-closed-pins\.mjs$/},()=>({contents:'export const QA_CLOUD_CLOSED_PINS='+J({...realPins,canary:x.pin,operator:opPin})+';',loader:'js'}));
  }};
  const built=await build({metafile:true,stdin:{contents:entry,resolveDir:process.cwd()},bundle:true,write:false,platform:'neutral',mainFields:['module','main'],format:'esm',target:'es2022',external:['node:*','cloudflare:*'],plugins:[plugin],define:{'globalThis.__AFW_FINITE_CANDIDATE_RESIDENCY__':J(resident),'globalThis.__AFW_QA_SOURCE_REVISION__':J(M),'globalThis.__AFW_FINITE_SOURCE_TREE__':J(TREE),'globalThis.__AFW_NODE_PROGRAM__':J(program),'globalThis.__AFW_FINITE_BOOTSTRAP_SOURCE__':J(w.expected)}});
  if(mode.startsWith('phase-context-sdk'))console.info('D02 fixture QA compiler',JSON.stringify({bytes:built.outputFiles[0].contents.length,sha256:sha(built.outputFiles[0].contents),inputs:Object.keys(built.metafile.inputs).length}));
  if(mode==='phase-context-sdk-token-notice-get')await captureNoticeBundle(built,'QA',{'<stdin>':entry,'<define:globalThis.__AFW_FINITE_CANDIDATE_RESIDENCY__>':J(resident),'<define:globalThis.__AFW_QA_SOURCE_REVISION__>':J(M),'<define:globalThis.__AFW_FINITE_SOURCE_TREE__>':J(TREE),'<define:globalThis.__AFW_NODE_PROGRAM__>':J(program),'<define:globalThis.__AFW_FINITE_BOOTSTRAP_SOURCE__>':J(w.expected)});
```
