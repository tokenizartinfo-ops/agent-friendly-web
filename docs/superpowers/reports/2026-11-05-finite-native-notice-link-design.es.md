# Siguiente unidad SOURCE: NoticeLink desde consentimiento nativo

2026-11-05 · **INACTIVE / SOURCE ONLY / SYN / UNMOUNTED**. Scope link-only aprobado por root para diseño. No implementación ni tests. POST sigue bajo implementación/no aceptado: contrato 61b8bb4cecae0a7459ea1ca55a7116a41afb520d. Su aceptación y reconciliación exacta son prerrequisito de ejecución, no razón para seguir WIP.

PROJECT=AFW; REPOSITORY=tokenizartinfo-ops/agent-friendly-web(1347578006 PUBLIC); ENVIRONMENT=GitHub docs; ORIGIN=GitHub connector; RESOURCE_TYPE=docs branch; RESOURCE_ID=docs/finite-native-notice-receiver-design-20261105; ALLOWED_ACTION=añadir sólo informe/spec/plan NoticeLink; rollback CAS de propios commits. BASE docs 61b8bb4cecae0a7459ea1ca55a7116a41afb520d. Inspección producto inmutable 2f96acb45ec5477d559f85070aa438d2e2e00822/treece6242321aa5177f5828ec592a7bb00d6d6cd91a.

## Conclusión y alternativa elegida

NoticeLink YA existe como registro factual append-only; falta un productor nativo que conserve la procedencia del POST y un observer que lo correlacione. Unidad mínima: al final del MISMO POST, después de SQL real resuelto/ACK durable/recheck, putLink→sync→readback→dos snapshots completos dentro de MISMA child original. El link persiste para futura continuidad factual, sin cambiar source read_consent ni abrir un lector público.

Alternativas descartadas:
- Reutilizar recordFinitePreparationNotice con requestId/sequence: exige notice_consent en source antiguo, relee formulario y recibe datos después del ACK; no conserva el resultado SQL que produjo el nuevo POST. Cambiar su phase o pasarle un DTO convertiría esa incompatibilidad en permiso inferido.
- Crear una nueva petición para “reconstruir” link desde journal: perdería la continuación humana/SQL y permitiría backfill desde ACK DATA. El productor de esta unidad sólo funciona mientras el stack real sigue vivo.
- Combinar con segunda publicación notices o tercer CLOSED/finite_prearm: añade approvals/receipts/config/source-stage que el link no acredita. Son dependencias posteriores explícitas.

Faltan POST aceptado, preflight y BASE futuro; avisos, suscripción y entrega siguen pendientes.

## Evidencia exacta del pin

| Fuente | Líneas / significado | Blob |
|---|---|---|
| lib/mcp-qa-finite-preparation-records.mjs | 50–52 fases/publication;68 NoticeLink cinco campos sin purpose/selfhash;110 sequence positivo;129–132 codecs;144–162 eventHash camelCase | e9b66f68b6dbabbfecc46072949a0d5d9f059141 |
| lib/mcp-qa-finite-preparation-store.mjs | 24–48 transaction/append recorded/existing/uncertain;64 readRecord;132 readLink;144–152 putLink sólo pre/GrantLink/times, sin SQL humano/sync | 122bc0e52870c71da7ae98ef73cd7762171d89ca |
| lib/mcp-qa-finite-owner-preparation.mjs | 176–178 durable antiguo;264–272 approved exige phase;347–372 productor/event original;394–412 consumer permisos/stages;417–435 preparación final exige finite_prearm+3 receipts | 01ec291de2631a7cd7e527e2a567f44ac6067522 |
| lib/mcp-qa-finite-owner-stage-facts.mjs | 12–23 stages/predecessors; noticeLink requerido sólo stage finite;24–32 exact upload/activation/receipt/contextHash | c2821f1b5806a1f8cc968425ba748d0e26f18a0b |
| lib/mcp-qa-finite-connection-profile.mjs | 8–35 grammar closed_ui/read_consent/notice_consent; monitoringflag/policy sólo notice_consent; no finite_prearm por etiqueta | 8a06c997494a6a0e5ad9f9892a5bf0b38e74a8e5 |
| lib/mcp-qa-finite-owner-phase-context.mjs | 143–150 inventory/list 17/whitelist;224–270 issuer actual;272–305 notice actual GET;368–375 full snapshot;387–399 público empty;608+ continuación GET modelo | 4fc7a7005330e6fbf76ae7ab0ea4767dcfd2facf |
| lib/mcp-qa-finite-preparation-issuer-journal.mjs | 6–23 captured storage/sync/transaction/holders y retención, bookkeeping no autoridad | 414450aa08f797bed5a41cf5cc697342785ce16b |
| lib/mcp-qa-finite-owner-source.mjs | 3–10 fuente y forwardNotice unavailable, no registro/capacidadcaller | 6bc88c44eae3c0b63db514833c3f0eae43eb1c0e |
| lib/mcp-qa-finite-connection-source.mjs | 1–4 fuente de conexión unavailable | 703bada5189efc962e1f81760ff741de518b77b9 |

La spec previa 2026-11-04-finite-owner-phase-context.md (blob088a9efd6999c2bfb3b156d76b511fcf6ed4aef8,11–13/100–101/139) y su plan (b3d85225dbe93abefba12ed80fc685eedcd8fe87,122–124/139) dejan notices/finite fuera de sus positivos. La dependencia consta en los consumidores citados.

## Record e interfaces

NoticeLink={preconnectionId,grantHash,eventHash,sequence,acceptedAt}.
Key connection-preparation:<id original>:notice; encode/decode/hashFinitePreparationRecord('NoticeLink',...). putLink({kind:'notice',record},lease) devuelve status/recordHash; readLink({kind:'notice',preconnectionId},lease) devuelve status/record. El store valida invariantes de almacenamiento, no actual humano/SQL.

eventHash=hashFiniteOwnerEvidence('event',{grantId,projectId,subject,clientId,resource,revision,action,purpose,requestId,sequence,issuedAt,expiresAt}) mapeado EXACTAMENTE de las 12 columnas del resultado SQL original. No es digest afw.finite-preparation-notice-row.v1: ese rowHash usa nombres SQL y sigue verificándose en ACK. sequence es AUTOINCREMENT real global, no1. grantHash coincide con GrantLink y SHA256(original grant UUID).
acceptedAt es UNA muestra Date.now posterior al ACK/recheck reales, correlacionada con event.issued_at/ACK.observedAt/GrantLink.acceptedAt; no una columna SQL ni tiempo pasado por caller. Debe caber en Send.deadline y techos actuales.

El recorder antiguo conserva sus bytes. No wrapper público, callback aprobador, allowPending, source factory ni export pair.

## Factual y productor privado

Se conservan los checks POST de Access, realm, prepare cookie, aprobación, owner, grant, ConnectionRef, CSRF y observe→consent SEND→INSERT/ACK/rechecks. Añade referencias léxicas separadas linkPromise/linkResult/linkSettled/ownedNoticeLink y ownAck si aún no se retiene. Nunca sobrescribe actualSqlPromise/result/settled.

Después del ACK/recheck y antes de cerrar la MISMA child: construir link de resultado SQL real, exigir store recorded/hash exacto, await storage.sync real capturado y readback byte-exact; actualizar sólo expected.preparation.noticeLink, records.inventory y anchor.inventory; recheck ambos snapshots enteros. existing/uncertain/fallo no sigue ni retorna200. Link puede quedar durable sin respuesta positiva; no retry/compensación/backfill.

Observer: añadir sólo suffix notice a whitelist de inventory original, conservar list 17/size 16 y todos caps/snapshots. readLink REAL por snapshot, incluso ausencia, y equivalencia raw inventory. Añadir preparation.noticeLink privado (null/record). Correlador corre aunque noticePrimary devuelva temprano: link presente requiere schema 7, ticket ACK/fila 14, consent ACK/fila 12, issuer/SDK/current source vigentes y todas relaciones/hash/sequence/times exactas. SourceBase/read_consent y exchanged_at actuales intactos.
Public 3keys/OAuth/GET y baseline POST nuevo cierran ante historia/link propio. Leer un link válido no crea permiso ni recrea el stack productor. Los consentimientos previos sin link permanecen cerrados; no migración silenciosa.

## Dependencias de etapa, sin ampliación

notice_consent en records significa currentPublication.stage='notices'. Profile exige monitoringowner flag/policy con grant/project/client/plazo originales. InstalledStage exige StageApproval/TicketUse y journals upload/activation reales con predecessor connection. Esta segunda publicación no se deduce de Link ni está incluida.

stage finite requiere dos predecessors y NoticeLink en su contextHash. ReadPreparationFacts exige source finite_prearm y tres receipts. Tercer CLOSED/prearm y posterior full setup separado quedan unidades futuras; ninguna enum/flag/perfil se añade aquí. Link-only es un prerrequisito factual utilizable por futuros consumidores, no su admisión.

## Filemap, pruebas, IO y riesgos

Filemap de cuatro archivos: modificar sólo phase-context producto; extender fixture finite-owner-notice-get; crear test native NoticeLink; adaptar positivo de test native Consent futuro. Sin store/journal/records/source/profile/DDL/config/workflow/forward/OAuth/SDK/world edits. APIs concretas y pasos exactos en spec/plan.

RED futuro exige POST 200 y evento/ACK reales antes de comprobar Link ausente. GREEN usa Access/CSRF/JWT firmado, D1/DO y productor reales; nunca prefill positivo. El plan cubre hash compatible, secuencia global, replay, pérdida de ACK/sync/readback, promesas retenidas, plazo original, correlaciones y retirada real. Trace pasivo distingue un fallo del correlador de uno previo del codec.

Costo explícito: +1 DO get por snapshot (+2/par) incluso sin link; sin D1 query/HTTP extra por snapshot, +1 par completo final y transacción/sync/readback productor. Contar sobre POST aceptado real, no cifras WIP/98/112. Mantener fanout 2, C0=I0+900000/C1=C0+180000, parent<=30 s/child<=5 s/techo 3 nov vencido. Si no cabe se reporta; no nueva child/clock ni omitir rechecks. No repetir50 ms/all SDK/build estándar para cifras.

D1+DO+source current no son transacción global: un cambio después del último read puede dejar Link/evento y respuesta denegada; conservarlo. Abort/timeout no es physical drain, stage-work scope es local, el Set journal no mutex. UnknownACK no autoriza recovery desde DATA. CLOSE no revoca grant por sí solo; real revokeGrant hace resolver ordinario rechazar, no enabled:false.

## Entrega y pendientes

Docs: specs/2026-11-05-finite-native-notice-link.md y plans/2026-11-05-finite-native-notice-link.md. Root reconcilia POST aceptado, variables/gates/cuatro paths, costos y futuro BASE antes de activar. SDD futuro writer único+root review; ningún helper/reviewer ni prueba en este bloque. Rollback CAS sólo nuestros commits docs; nunca borrar D1/DO/historia.

operationalReadiness=false; completePackage=false; PCoff=false. La documentación no acredita consentimiento humano real, suscripción, segunda publicación o tercer CLOSED.
