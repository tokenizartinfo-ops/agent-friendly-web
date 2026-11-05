# NoticeLink desde POST nativo — Implementation Plan

> **For agentic workers:** Futuro workflow superpowers:subagent-driven-development, un único writer y revisión root spec/quality. **INACTIVE**: no implementación, tests, agentes ni ejecución por este plan. Root reconcilia POST aceptado y fija preflight/BASE/permiso cloud antes de activar; writer no crea helpers/reviewers.

**Goal:** Persistir y correlacionar el NoticeLink existente desde la continuación privada del POST de consentimiento real, antes de responder200.
**Architecture:** Extensión léxica del handler Consent, misma child/lease/SQL result y ACK originales; preparationStore.putLink→sync→readback→dos snapshots completos. Ninguna nueva phase/API/ruta.
**Tech Stack:** ESM, harness Miniflare/workerd/D1/DO existente, JWT RS256 SYN real; cloud sólo cuando root lo active.
**Spec:** docs/superpowers/specs/2026-11-05-finite-native-notice-link.md
**Pin inspeccionado:**2f96acb45ec5477d559f85070aa438d2e2e00822/treece6242321aa5177f5828ec592a7bb00d6d6cd91a.
**POST dependency:** contrato 61b8bb4cecae0a7459ea1ca55a7116a41afb520d, bajo implementación/no aceptado al diseñar. No seguir WIP.

## Restricciones

- Filemap de cuatro archivos exacto de spec; sólo producto phase-context y tres archivos de pruebas/fixture. Store/records/journal/profile/source stubs/forward/OAuth/SDK/world/DDL/config/workflow protegidos.
- Link DATA cinco campos SIN purpose/selfhash; eventHash=evidence('event',camelCase12) NO rowHash SQL del ACK. No nuevos enums.
- Misma child POST<=5000ms desde observeTicket a Link/recheck; parent original<=30000ms; C0=I0+900000/C1=C0+180000; source ceiling 3 nov02:59Z vencido. Sin nuevo presupuesto/rearm/renew.
- Público3keys/OAuth/GET y baseline POST nuevo cierran ante historia propia; ACK histórico nunca crea continuación; sin backfill/retry/physical drain.
- Segunda publicación notices y tercer CLOSED/finite_prearm posteriores; aquí flags/operationalReadiness/completePackage/PCoff siguenfalse.

## Review focus

1. Confundir snake_case rowHash con eventHash camelCase produciría un Link incompatible con consumidores existentes.
2. putLink transaction ACK sin sync/readback no cumple el boundary propuesto; unknown commit no admite recuperación permisiva.
3. Nueva lectura debe entrar en AMBOS snapshots y anchor.inventory, sin esconder drift de issuer/exchanged_at/current source.
4. Contextos nuevos/actor restart/historia previa no pueden enlazar consentimiento cuyo resultado SQL ya no está vivo.
5. Costo adicional no puede iniciar otra child ni renovar window, aunque el evento/ACK ya sean durables.

Cada punto tiene casos nativos concretos en pasos2–5; no sustituirlos con codec-only.

## Task 1: Link propio durable con continuidad factual privada

**Files:**
- Modify lib/mcp-qa-finite-owner-phase-context.mjs.
- Modify test/fixtures/finite-owner-notice-get.mjs.
- Create test/mcp-qa-finite-owner-notice-link-native.test.mjs.
- Modify test/mcp-qa-finite-owner-notice-consent-native.test.mjs sólo expectativas de finalización propia.
Ningún nuevo archivo por inferencia. Brief/reporte/qualifier root fuera de producto se acuerdan en preflight, no se ejecutan desde diseño.

**Consume:** handler handlePrivateQaFiniteOwnerNoticeConsent({request,env,ctx},originalLease) propuesto; actualSqlPromise/result y ownSend/ACK privados; observeOwnerPhasePair/getRecord/recheckConsentOwned PRIVADOS; createFiniteOwnerPreparationStore({storage,now:Date.now}).putLink/readLink; captured storage.sync; codecs/hash/evidence existentes.
**Produce:** NoticeLink en key connection-preparation:<id>:notice y snapshot.preparation.noticeLink privado; NO exports nuevos. POST 200 sólo después del Link/readback/full recheck; misma respuesta humana sin datos internos.

- [ ] **1. Preflight obligatorio y baseline.** Root entrega POST aceptado code HEAD/tree/blobs y futuro BASE. Verificar APIs/variables reales, seis filas journal y P3 cookies resuelto según POST, shared fixture y todos gates. Reconciliar ubicación exacta después de ACK+recheck antes de cerrar child. Confirmar cuatro paths y permiso cloud. Si POST cierra child antes del punto o no retiene SQL/ACK, refactor léxico mínimo de ese handler con revisión root; no helper público. Preservar evidence actual; no copiar docsbranch sobre fuente ni ejecutar usando2f96 sin POST.

- [ ] **2. Escribir RED causal sobre POST aceptado.** Test 'native notice link follows actual consent ACK in the same POST child': grant por OAuth real, GET monitoring real, POST firmado/CSRF real y D1/DO reales, event native + consent ACK ya éxito. Primero assert POST 200 + real event/ACK y ausencia de fixtureError; después exigir NoticeLink exacto. RED esperado Link ausente en producer POST aceptado, NO endpoint404/importmissing/journal inválido. Principal usa token/MCP real al menos una vez y verifica exchanged_at actual; negativos posteriores usan grant SDK real sin repetir token/MCP innecesariamente.
  Capturar hashes/rows originales y trace de actual SQL resolution→ACK→Link; Link no se prellena. Datos ajenostres eventos/dos grants ycuatro DDL históricos del world aceptado permanecen byte-exact; sequence global puede>1.

- [ ] **3. Implementar mínimo íntegro.** Añadir suffix notice y lectura readLink real por snapshot; comparar inventario raw/decoded. Correlación precisa con EventRow/ticket/issuer/SDK/current fuente. Añadir preparation.noticeLink=null/record, sin salida pública ni source phase nueva. Extender requireEmptyNotice.
  En la MISMA child después de recheck ACK: exigir actualSqlPromise/result reales, ownSend/ownAck recorded, failed false, link ausente; acceptedAt real una vez, eventHash camelCase existente. Retener putLink Promise nueva, recorded+hash exacto, sync real, readLink real byte-exact. Sólo entonces update expected.preparation.noticeLink, records.inventory y anchor.inventory; recheck completo final sin sobrescribir SQL Promise. No reutilizar viejo recorder ni su ramo existing. Conservar failure latch/holders/Access/plazos.
  APIs store/records sin cambios. No journalSEND adicional ni nueva phase. Si un test exige modificar otro archivo producto, parar con diferencia concreta.

- [ ] **4. GREEN principal y contratos nativos.** Casos nuevos:
  - 'native notice link follows actual consent ACK in the same POST child': exact5 fields/codec/canonical bytes, key propia, eventHash diferente del rowHash journal y exactamente evidence('event',mapping12), sequence real, acceptedAt correlacionado; put recorded→sync→readback→snapshotpair antes200; source/SDK/issuer original intactos.
  - 'native notice link retains global event sequence and foreign history': caso en historia ajena existente, no sequence1supuesto ni lookup global.
  - 'native notice link never advances source or public readers': público3keys/OAuth/GET/POST replay niegan history/link; cambios none en profile/flags/policy stage receipts; record no abre NoticeLink endpoint ni old forward.
  - 'native notice link requires live originating SQL continuation': replay después consentimiento completo y restart real no llama putLink; consentimiento previo sinlink (producido por POST base real o corte justo después ACK) tampoco se backfillea. No fabricar actualResult DTO ni exportar pair para simular éxito.
  - 'native notice link event hash uses existing consumer projection': mismo EventRow devuelto por INSERT se proyecta campo por campo; hashFiniteOwnerEvidence valida gramática existente, no custom domain/nuevo schema. Esta comprobación de compatibilidad no declara notices stage activo.

- [ ] **5. GREEN fallos/retención/correlación.** Gates sobre Promises nativas reales, fixture sólo observa/corrompe negativamente:
  - 'native notice link unknown transaction never recovers from readback': putLink realmente commit pero respuesta perdida;503, Link puede existir, event/ACK retenidos, cero retry/link segunda escritura/200. No seguir a sync/readback para convertir uncertain en recorded.
  - 'native notice link lost sync or readback remains closed': put recorded y sync/readback fallo; conserva Link/consent, sin response200; otroPOST no repara. Variante readback bytes incorrectos (DATA shape válida) no se acepta.
  - 'native notice link existing or conflicting record cannot win': entre recheck y put insertar SYNnegative link exacto/diferente usando contrato codec; storeexisting/conflict no200. No meter positivo en baseline.
  - 'native notice link held write and cancellation retain actual work': hold actual transaction/sync/readback; abort original; respuesta denegada no ACK final/HTML; scope real outstanding hasta settle. Otro ingreso del mismo ctx con lease SYN vigente deniega antes de settle; no probar exclusión sólo con lease abortada ni atribuirla al journal pending Set.
  - 'native notice link original child expires without renewal': gate after ACK/before put cruzando deadline 5 s REAL del consentSend; assert gate alcanzado con tiempo, cero nuevo put si expiró antes llamada. Variante commit gana luego expires->Link preservado/503. No otra clock.child ni Date patch. Contabilizar desde observeTicket original.
  - 'native notice link current facts drift at final recheck': owner/revision/QA/Mpublication/holder o exchanged_at válido entre snapshots; denegar y preservar historia. Usar marcador de source current antesput y despuésput, no opción expected.
  - 'native notice link factual mismatch denies ': eventHash, grantHash, sequence, preconnectionId, acceptedAt futuro/antes del ACK/después del deadline. Link shape/codec válidos cuando se prueba correlador; trace prueba que pasa decode y llega al predicado objetivo, no afirmar aislamiento por un rechazo anterior. Columnas SQL/issuer originales intactas; no reseal ni reautorizar SQL. Mutaciones negativas de transacción/current deben identificarse como SYN.
  - 'native notice link missing source evidence never becomes authority': link sin consent ACK, no_mutation, ticket diferente/unknown SEND, freeze o event withdrawal; baselines públicos/POST deniegan antes NUEVOconsent SEND/SQL/putLink. Positivo siempre nace del producer real; negativos sólo después.
  - 'native notice link real reduction preserves event and link': real revokeGrant/CLOSE según APIs existentes del fixture, sin endpoint nuevo. CLOSE no se confunde con revocación; real revokedgrant hace resolver ordinario rechazar generic Monitoring authorization unavailable. Todas filas append-only permanecen, no enabled:falseinventado.
  Preservar también corpus POST P3 cookies/resealed correlaciones al ejecutar su suite; no recrear las mismas familias en Link por rutina.

- [ ] **6. Medición proporcional sin nuevo presupuesto.** Capturar en GREEN real: +2 DO readLink/par, mismo D1 SELECT y HTTPfanout por snapshot, +1 par completo final más puttransaction/sync/readback. Basarse en POST aceptado real, no asumir sus seispares ni98/112. Reportar conteos físicos/first-primary/list caps/bytes/hashmetafiles QA/M, elapsed child total<=5s y parent<=30 s, peak fanout 2 original. Verificar que null y raw inventory aparezcan en ambos snapshots sin omitir otrocampo.
  Si no cabe, registrar fallo causal y durable prefix conservado; no ampliar plazo/clock/ventana, omitir lectura ni declarar fit por CODEC. No repetir50 ms/all SDK/build estándar para obtener cifras.

- [ ] **7. Regresiones escogidas y verificables.**
  1. node --test test/mcp-qa-finite-owner-notice-link-native.test.mjs
  2. node --test test/mcp-qa-finite-owner-notice-consent-native.test.mjs
  3. node --test test/mcp-qa-finite-owner-notice-get-native.test.mjs
  4. node --test test/mcp-qa-finite-owner-phase-context.test.mjs
  5. node --test --test-name-pattern='^(closed source keeps|settled first connection|unknown issuer SEND|absent original issuer never|failed schema SELECT|fresh current owner|fresh QA pointer|same ambient original request)' test/mcp-qa-finite-owner-phase-context-native.test.mjs
  6. node --test --test-name-pattern='^(uninstrumented actual native|missing actual SDK binding cookie|actual current publication drift|owned begin recheck rejects actual foreign delta owner-revision|fanout causal control delay0)' test/mcp-qa-finite-owner-qa-sdk-native.test.mjs
  7. node --test --test-name-pattern='^D04 actual exchange (retains|then SYN valid native timestamp drift|then SYN immutable original current-(owner|revision))' test/mcp-qa-finite-owner-qa-sdk-token-compat-native.test.mjs
  Prefixes existentes ya leídos en cadena: phase16, SDK6, D04cuatro; verificar literal names/conteos/no 0 match contra futuro BASE, no inventar cantidad de casos POST todavía no aceptado. Justificación: observer común añade DO read y field privado en todas fases, snapshot drift/SDKpending/exchanged_at; cuerpos/grammarGET+POST y fixture compartidos. Suites store/journal/records intactas conservan evidencia aceptada; tests Link ejercen put/read reales, sin rerun amplio por reflejo.
  ESLint sólo cuatro archivos cambiados; QA/M compilados por harness y graphdiff vs POST aceptado. Standard build sólo si nuevo alcance llega realmente a entrypoint estándar y root lo exige. Cloudjobs/timeout definidos por root futuro; no dispatch aquí.

- [ ] **8. Guardar y revisión root.** BASE/code HEAD/report HEAD/tree/cuatro paths/blobs, protected blobs, RED/GREEN exact heads/runs/jobs/attempts/counts seleccionados/fail/skip/lint, costos/retención/plazos, native vs SYN y no autoridad. Root lee diff completo y hace spec+qualitySDD; writer no helpers. No siguiente unidad, main/merge/mount ni nueva autorización por pasar checks.

## Rollback y pendientes posteriores

Rollback sólo commits propios CAS contra HEAD esperado; no borrar Link/eventos/tickets/journal/grants para revertir una respuesta incierta. Conservar estado durable parcial y receipt de fallos. No cleanup/freeze automático ni backfill.
Siguiente dependencia real: segunda publicación notices con StageApproval/decision/receipts/profile/current factual y continuación propia; luego tercer CLOSED/finite_prearm y full setup separado. Link DATA no las completa. Todo continúa INACTIVE hasta root preflight/POST reconciliado/BASE futuro.
