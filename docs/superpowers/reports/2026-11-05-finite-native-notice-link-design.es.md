# Siguiente unidad SOURCE: NoticeLink desde consentimiento nativo

2026-11-05 · **INACTIVE / SOURCE ONLY / SYN / UNMOUNTED**. Scope link-only aprobado por root para diseño. No implementación ni tests. Reconciliado con candidato POST 5205d80216d9767c44762df4a181e1015e093a8e, tree 23309d147f8818e0232be215f42a77cf7ffe0e6a: Root informa revisión POST Spec ✅ / Quality Approved, 0 Critical y 0 Important; aceptación documental en preparación, aún no fijada aquí. INACTIVE hasta registro de aceptación, preflight y futuro BASE. Su aceptación, preflight y BASE futuro siguen siendo obligatorios; no se sigue WIP.

PROJECT=AFW; REPOSITORY=tokenizartinfo-ops/agent-friendly-web(1347578006 PUBLIC); ENVIRONMENT=GitHub docs; ORIGIN=GitHub connector; RESOURCE_TYPE=docs branch; RESOURCE_ID=docs/finite-native-notice-receiver-design-20261105; ALLOWED_ACTION=actualizar sólo estos tres documentos; rollback CAS propio. BASE docs 9c4dfcde605be3e26d623c98dfcb45fb1293afa2. Contratos protegidos inspeccionados en 2f96acb45ec5477d559f85070aa438d2e2e00822; reconciliación focalizada POST en el pin indicado.

## Conclusión y alternativa elegida

NoticeLink YA existe como registro factual append-only; falta un productor nativo que conserve la procedencia del POST y un observer que lo correlacione. Unidad mínima: al final del MISMO POST, después de SQL real resuelto/ACK durable/recheck, putLink→sync→readback→dos snapshots completos dentro de MISMA child original. El link persiste para futura continuidad factual, sin cambiar source read_consent ni abrir un lector público.

El recorder antiguo exige notice_consent y no conserva el resultado SQL originario; no se reutiliza. Reconstruir desde otra petición convertiría ACK DATA en autoridad. Segunda publicación notices y tercer CLOSED/finite_prearm requieren approvals/receipts propios y quedan fuera.

## Evidencia exacta del pin

| Fuente | Líneas / significado | Blob |
|---|---|---|
| lib/mcp-qa-finite-preparation-records.mjs | 50–52 fases/publication;68 NoticeLink cinco campos sin purpose/selfhash;110 sequence positivo;129–132 codecs;144–162 eventHash camelCase | e9b66f68b6dbabbfecc46072949a0d5d9f059141 |
| lib/mcp-qa-finite-preparation-store.mjs | 24–48 transaction/append recorded/existing/uncertain;64 readRecord;132 readLink;144–152 putLink sólo pre/GrantLink/times, sin SQL humano/sync | 122bc0e52870c71da7ae98ef73cd7762171d89ca |
| lib/mcp-qa-finite-owner-preparation.mjs | 176–178 durable antiguo;264–272 approved exige phase;347–372 productor/event original;394–412 consumer permisos/stages;417–435 preparación final exige finite_prearm+3 receipts | 01ec291de2631a7cd7e527e2a567f44ac6067522 |
| lib/mcp-qa-finite-owner-stage-facts.mjs | 12–23 stages/predecessors; noticeLink requerido sólo stage finite;24–32 exact upload/activation/receipt/contextHash | c2821f1b5806a1f8cc968425ba748d0e26f18a0b |
| lib/mcp-qa-finite-connection-profile.mjs | 8–35 grammar closed_ui/read_consent/notice_consent; monitoringflag/policy sólo notice_consent; no finite_prearm por etiqueta | 8a06c997494a6a0e5ad9f9892a5bf0b38e74a8e5 |
| lib/mcp-qa-finite-owner-phase-context.mjs @5205 | 273–315 noticePrimary;376–388 snapshots;395–419 event/baseline/empty;748–855 POST;801–824 estados;826–849 misma child/SQL/ACK | f8948c0a2cc41a48773406a64fc9c863226f9b2d |
| lib/mcp-qa-finite-preparation-issuer-journal.mjs | 6–23 captured storage/sync/transaction/holders y retención, bookkeeping no autoridad | 414450aa08f797bed5a41cf5cc697342785ce16b |
| lib/mcp-qa-finite-owner-source.mjs | 3–10 fuente y forwardNotice unavailable, no registro/capacidadcaller | 6bc88c44eae3c0b63db514833c3f0eae43eb1c0e |
| lib/mcp-qa-finite-connection-source.mjs | 1–4 fuente de conexión unavailable | 703bada5189efc962e1f81760ff741de518b77b9 |

Fixture @5205: test/fixtures/finite-owner-notice-get.mjs, blob f2ede8ac193b24dfc9e548fb4175f6e8eb6947a0, líneas 190–213: postReplace exige marcador único; conserva gates y trazas de correlación. Consent native blob 53b3daec12caf355d5aed4b35ebe8572029ed911. Reporte candidato docs/superpowers/reports/2026-11-05-finite-native-notice-consent.md, blob 91c08e8cfd6f0eb954631c3e75ea4af66e4b33b5: APIs/costo/protecciones, no aceptación.

## Record e interfaces

NoticeLink={preconnectionId,grantHash,eventHash,sequence,acceptedAt}.
Key connection-preparation:<id original>:notice; encode/decode/hashFinitePreparationRecord('NoticeLink',...). putLink({kind:'notice',record},lease) devuelve status/recordHash; readLink({kind:'notice',preconnectionId},lease) devuelve status/record. El store valida invariantes de almacenamiento, no actual humano/SQL.

eventHash=hashFiniteOwnerEvidence('event',{grantId,projectId,subject,clientId,resource,revision,action,purpose,requestId,sequence,issuedAt,expiresAt}) mapeado EXACTAMENTE de las 12 columnas del resultado SQL original. No es digest afw.finite-preparation-notice-row.v1: ese rowHash usa nombres SQL y sigue verificándose en ACK. sequence es AUTOINCREMENT real global, no1. grantHash coincide con GrantLink y SHA256(original grant UUID).
acceptedAt es UNA muestra Date.now posterior al ACK/recheck reales, correlacionada con event.issued_at/ACK.observedAt/GrantLink.acceptedAt; no una columna SQL ni tiempo pasado por caller. Debe caber en Send.deadline y techos actuales.

Recorder antiguo intacto; sin API aprobadora ni export pair.

## Factual y productor privado

Se conservan los checks POST de Access, realm, prepare cookie, aprobación, owner, grant, ConnectionRef, CSRF y observe→consent SEND→INSERT/ACK/rechecks. En 801 están actualSqlPromise, actualSqlResult, sqlSettled y ownSend; aún no ownAck. Añadir ownAck asignado al const ack real tras appendAckResult recorded/hash (846–848), más linkPromise/linkResult/linkSettled/ownedNoticeLink. Nunca sobrescribir las referencias SQL.

Insertar en 849 después de await recheckConsentOwned() y antes de activeChild=null, conservando l/window/common (826–829). Extender el conjunto explícito de estados de recheckConsentOwned: link-recorded debe seguir validando SQL real y ownAck; pending/estado desconocido deniega. Después del ACK/recheck y antes de cerrar la MISMA child: construir link de resultado SQL real, exigir store recorded/hash exacto, await storage.sync real capturado y readback byte-exact; actualizar sólo expected.preparation.noticeLink, records.inventory y anchor.inventory; recheck ambos snapshots enteros. existing/uncertain/fallo no sigue ni retorna200. Link puede quedar durable sin respuesta positiva; no retry/compensación/backfill.

Observer: añadir sólo suffix notice a whitelist de inventory original, conservar list 17/size 16 y todos caps/snapshots. readLink REAL por snapshot, incluso ausencia, y equivalencia raw inventory. Añadir preparation.noticeLink privado (null/record). Correlador corre aunque noticePrimary devuelva temprano: link presente requiere schema 7, ticket ACK/fila 14, consent ACK/fila 12, issuer/SDK/current source vigentes y todas relaciones/hash/sequence/times exactas. SourceBase/read_consent y exchanged_at actuales intactos.
Public 3keys/OAuth/GET y baseline POST nuevo cierran ante historia/link propio. Leer un link válido no crea permiso ni recrea el stack productor. Los consentimientos previos sin link permanecen cerrados; no migración silenciosa.

## Dependencias de etapa, sin ampliación

notice_consent requiere publicación notices, profile y StageApproval/TicketUse/upload/activation reales con predecessor connection. stage finite requiere dos predecessors y NoticeLink; preparación final exige finite_prearm y tres receipts. Ninguno se deduce del Link ni se añade aquí.

## Filemap, pruebas, IO y riesgos

Filemap de cuatro archivos: modificar sólo phase-context producto; extender fixture finite-owner-notice-get; crear test native NoticeLink; adaptar principal Consent y dos assertions de settlement diferidas por root. Sin store/journal/records/source/profile/DDL/config/workflow/forward/OAuth/SDK/world edits. APIs concretas y pasos exactos en spec/plan.

RED exige POST 200/evento/ACK antes de Link ausente; GREEN usa JWT/CSRF/D1/DO reales, sin prefill. Negativos cubren uncertainty/retención/plazos/correlación. Carry root: Consent tests 158–162 y 240–245 deben afirmar settlement observado antes de asserts finales, sin ampliar ventanas; warnings toolchain sin upgrades.

Costo propuesto: +1 DO get por snapshot, +1 par completo final y put/sync/readback; sin D1/HTTP extra por snapshot existente. Reporte candidato: principal 6 pares/12 snapshots, child 775 ms de 4999 y parent 1275 ms; no garantiza margen. Link esperaría 7 pares/14 snapshots, a medir, no GREEN declarado. Cobertura POST50/GET37 escalonada, no full único. Futuro qualifier propuesto: tres jobs sin credenciales ≤15 min (Link full; POST full; GET full+regresiones+lint), sujeto a root preflight. Mantener fanout 2, C0/C1 originales, 30 s/5 s/techo vencido; no recortar checks ni repetir 50 ms/all SDK/build para métricas.

D1+DO+source current no son transacción global: un cambio después del último read puede dejar Link/evento y respuesta denegada; conservarlo. Abort/timeout no es physical drain, stage-work scope es local, el Set journal no mutex. UnknownACK no autoriza recovery desde DATA. CLOSE no revoca grant por sí solo; real revokeGrant hace resolver ordinario rechazar, no enabled:false.

## Entrega y pendientes

Root debe aceptar POST tras revisión, resolver cambios si aparecen, confirmar cuatro paths, estados léxicos, costo y excepción de tres jobs antes de fijar BASE. Formulario GET SOURCE activo y corrección cookie P3 están implementados en el candidato, incluidos en la revisión informada por root; sin mount. SDD futuro writer único+root review; ningún helper/reviewer ni prueba en este bloque. Rollback CAS sólo nuestros commits docs; nunca borrar D1/DO/historia.

operationalReadiness=false; completePackage=false; PCoff=false. La documentación no acredita consentimiento humano real, suscripción, segunda publicación o tercer CLOSED.
