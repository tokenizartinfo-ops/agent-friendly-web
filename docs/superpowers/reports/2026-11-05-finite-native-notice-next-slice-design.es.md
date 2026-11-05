# Siguiente slice nativo: GET de ticket y hechos privados de avisos

2026-11-05 · **INACTIVE / SOURCE ONLY / SYN / UNMOUNTED**. Diseño, sin ejecución de tests ni producto. Requiere preflight de root y BASE futuro explícito.

PROJECT=AFW; REPOSITORY=tokenizartinfo-ops/agent-friendly-web (1347578006 PUBLIC); ENVIRONMENT=GitHub docs; ORIGIN=https://api.github.com; RESOURCE_TYPE=docs branch; RESOURCE_ID=docs/finite-native-notice-receiver-design-20261105; ALLOWED_ACTION=tres documentos nuevos en la rama propia; ROLLBACK=revert exclusivamente commits propios mediante expected-head CAS/readback. Rama documental parte de6d13ace8a9fee901d2e1508d8946193440eb4357, sin copiar producto. Pin04c49dcc48b37f7fe825daa6c1c0747c5822d74e/tree7b13cf0a4262f7d5d5b8695c3bda3875d63e0bef.

## Selección

Un GET real, reenviado por M a QA fijo, verifica persona/tupla original, reserva journal y escribe **un ticket** por el store nativo antes de reconocerlo. Incorpora lectura real del journal/ticket/eventos en ambos snapshots privados. No concede consentimiento. POST /monitoring/grant queda cerrado y exige unidad propia; tampoco hay NoticeLink, source notices, tercer CLOSED o montaje.

Es un bloque coherente porque la persistencia del GET modifica precisamente los hechos que su continuación debe releer. Separar hoy un lector “permisivo” de ese productor dejaría una tolerancia sin dueño. Mantener la continuidad y sus variables en el mismo módulo phase-context permite verificar el resultado nativo sin exportar el par factual o aceptar un frame aportado por caller.

Store aceptado root/04c. Root comunicó aceptación journal2969a840860d47997132eb081d1e65376f3953e0/tree d89ca7b6bc056473362159bd51a2cb1f955c8f03: interfaz6filas intacta. Declaración root; este trabajo no reejecutó sus pruebas.

## Evidencia de la decisión

Todas las líneas se refieren a04c salvo indicación. 

| Fuente | Blob | Hecho |
| --- | --- | --- |
| lib/mcp-qa-finite-owner-phase-context.mjs:108–134 | ebebaa9542c2408c0d505d1e23daa946762c1cab | SELECT fresh-primary, inventarios cerrados; journal notice ausente |
| mismo:194–254,315–348 | mismo | fanout primario fijo; grant actual completo; dos snapshots iguales; salida sólo source/preconnectionId/capsuleHash |
| mismo:375–413,440–471 | mismo | Access/cookie/approved-ticket/owner original y recheckOwned léxico con Promise real |
| lib/mcp-qa-finite-owner-source.mjs:1–10 | 6bc88c44eae3c0b63db514833c3f0eae43eb1c0e | source/notice forward genérico sigue unavailable |
| lib/mcp-qa-finite-preparation-issuer-store.mjs:130–174 | efc25b2af9c80b8eb27cffe219544e974002293e | input/ceilings, siete objetos exactos y preflight nativo independiente |
| lib/mcp-qa-finite-owner-native-wire.mjs:4–12,25–57 | 42aa81f82b60bcc66a140f1358784108696f41e5 | origen/actor fijos, metadata no-authority, request/body retenidos |
| test/mcp-qa-finite-owner-qa-sdk-token-compat-native.test.mjs | 54865b41143b53fadcec189a92fe22de7519b092 | QAcode→Mtoken→MCP→reader D0.4 reales, issuer ACK histórico intacto |
| test/mcp-qa-finite-owner-qa-sdk-native.test.mjs:250–273 | fb645efe76fd007e64aed1c485ac98834ba7b729 | métricas anteriores112GET,80factual+16preflight+2writes; no extrapolarlas |
| test/fixtures/finite-initial-entry-world.mjs:42–62,205–210 | 6947e6f19d0a7d87586dda69866440170ada818c | harness SYN firmado, perfiles reales, integración sólo fixture |
| test/fixtures/finite-owner-io-fanout.mjs:36–50 | 900172e1dd24662c354c0d3d48d4ed28a86c3a52 | instrumentación por markers exactos; nuevo handler requiere evitar ambigüedad |

Journal spec en04c: docs/superpowers/specs/2026-11-05-finite-native-notice-provenance.md, blob35d31271f577c3c85d3499c8ca58783e6bcae259. No basta un ACK DATA: el handler futuro obtendrá el hash únicamente del resultado real conservado en su stack.

## Integración factual exacta

facts añade read del journal a records.notice y anchor.notice. qualify añade noticePrimary privado después de issuerPrimary y correlación SDK. Cada snapshot incluye noticeRows={schema,tickets,events}. Nueva selectAll local ejecuta únicamente SQL fuente fijo, primera sentencia de una nueva first-primary, bajo child/retain/guards originales. No reemplaza select, no expone DB ni par.

Schema se lee por los dos nombres originales, máximo8 objetos SQL; admite ausencia total sólo cuando no hay journal. Siete objetos presentes deben coincidir exactamente con FINITE_PREPARATION_MONITORING_SCHEMA (normalización ya usada por store). Parcial, extra o diferente niega. No PRAGMA/migración nueva en producto: INSERT mantiene el preflight completo del store. Si hay identity original y schema completo, leer tickets por grant UUID original LIMIT2 y eventos por ese UUID LIMIT3. No buscar último grant ni listar otros clientes.

Para este slice, eventos y consent SEND/ACK deben estar vacíos. Una reserva notice requiere original issuer completo/SDK observado/GrantLink/ConnectionRef, hashes/tuplas/techos exactos. Sólo ticket SEND permite existencia de una fila ticket; ACK applied exige el hash exacto de esa fila, no_mutation exige ausencia. SEND sin ACK puede describir cero/una fila únicamente en el par privado; nunca se devuelve como source utilizable.

qualifySettledOwnerPair niega cualquier reservation/freeze/SEND/ACK notice o ticket/evento del prefijo/UUID originales; no historia ajena. Antes del primer GET el lector conserva tres keys y read_consent, aun con tablas completas vacías. Tras GET reconocido el lector público queda cerrado hasta el siguiente productor explícito; no cambiar fase por etiqueta. OAuth original exige notice vacío en sus rechecks; no se le presta la tolerancia GET.

## Continuación del GET

Nueva entrada fixed handlePrivateQaFiniteOwnerNoticeGet({request,ctx,env},originalLease), sin options extra. Receptor QA y forward M nuevos, unmounted, sólo GET original /monitoring. Transporte privado usa POST envolvente y metadata exacta como OAuth, pero el método humano aceptado sigue siendo GET. No cambiar el host monitoring ordinario ni invocar su INSERT VALUES o forward post-ACK.

Baseline=observeOwnerPhasePair privado+qualifySettledOwnerPair; se exige read_consent, schema completo y grant/SDK completados. Source instalado, versión M, actor/QA/bindings originales. Verificar JWT firmado con verifyCloudflareAccessJwtWithExpiry y realm/audience del source; prepare cookie única, qualifyFiniteOwnerApprovedTicket, ownerSelection/identity, GrantLink y ConnectionRef. Nada viene de body, header de resultado, policy.enabled o un aprobador inyectado. Techos=min original/actual; nuevo JWT nunca renueva.

expected es copia privada del snapshot exacto, no argumento. actualPromise/actualResult/settled/position/operation quedan léxicos. Cada append debe retornar recorded genuino; actualizar únicamente su celda esperada y anchor.notice, luego releer ambos snapshots completos. existing/uncertain niega sin SQL o formulario.

Una única child para ticket SEND→recheck→INSERT→recheck→ACK→recheck. Antes del INSERT, SEND propio recién reconocido y fila esperada ausente; después, sólo actualPromise resuelta permite actualizar expected.noticeRows.tickets con RETURNING real. Mientras pending no se relee para fabricar éxito. ACK usa sólo ese resultado aplicado; no_mutation termina503 sin ACK/formulario. Error o respuesta perdida puede dejar ticket/SEND históricos y nunca reintenta.

Cualquier diferencia ajena, freeze, consent, schema, owner, grant, SDK pending, source/pointer/version o lectura tardía niega. Otro GET/reader no tiene acceso al stack y ve el cierre público. No DTO de autorización, allowPending, callback de aprobación, constructor de testigo ni par exportado.

Respuesta200 sólo tras ACK y último recheck: página de preparación que expresa que aún no se concedió permiso. Cookie temporal HttpOnly/Secure/SameSite Strict y handle en formulario **deshabilitado**; no capacidad pública completa ni consentimiento. POST sigue405/404 en los módulos fuente de esta unidad. Publicar este GET aislado queda expresamente fuera del alcance.

## Costo, prueba y límites

Cada snapshot añade un DO journal read y una consulta schema; con schema completo e identity, dos SELECT de filas adicionales. Cada par añade2list DO y2–6D1 además de las originales. El journal valida limit7; schema limit8, tickets limit2 y eventos limit3 niegan overflow. List originales/snapshots completos intactos. No sumar “98D1/112GET” como si fueran totales del GET; contabilizar cada escenario y recheck, sesiones nuevas y compilaciones reales.

El fanout de credenciales/QA/M sigue idéntico, máximo2, sin solapar snapshots ni omitir body/cancel. El nuevo import journal agranda el graph alcanzable de phase-context; compilar QA/M reales y registrar metafile/hash/bytes. Métricas existentes deben reflejar nuevas lecturas, preservando gates causales y5s/30s; si el recorrido no cabe, queda bloqueado, sin ampliar ventanas ni cachear hechos.

RED principal: grant original real obtenido por QA y GET alcanza ruta fija sin ticket/ACK; fallo conductual, no bundle. GREEN: JWT SYN firmado verificado, GET→M→QA→journal→D1 real, tres filas journal/ticket único, cero eventos; rechecks privados admiten exclusivamente el propio resultado. Negativos: reader antiguo vacío válido, unknown/inconsistent inventory niega, SEND ajeno/replay/unknownACK, schema parcial, drift entre snapshots, expiración/cola/CLOSE, retirada real y retención de cuerpo/SQL. Tests no prueban persona Cloudflare real ni source instalada remotamente.

C0=I0+900000, C1=C0+180000; padre<=30000ms/hija<=5000ms; techo2026-11-03T02:59Z vencido. Conservar exchanged_at actual; sólo el hash ACK histórico proyecta ''. CLOSE no retira grant activo; revokeGrant real hace rechazar autoridad genéricamente, preservando evento. No drain físico por journal/abort. POST, permisos de avisos, NoticeLink, tres receipts/Selection, third CLOSED, own-SEND/full setup, cleanup, mount/ARM/guard/hosted/PC-off siguen pendientes. operationalReadiness=false; completePackage=false; PCoff=false.
