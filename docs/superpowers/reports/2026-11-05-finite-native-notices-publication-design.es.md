# Segunda publicación notices: puente privado pendiente

2026-11-05 · **INACTIVE / SOURCE ONLY / SYN / UNMOUNTED**. Informe preliminar, no spec/plan ni autorización de implementación. Inspección congelada 953e7af1fc20b59c59d8e4a03dcf398d98165cf5, sin seguir WIP. POST aceptado SOURCE en f62b6c8b; Link sólo tiene contrato/preflight en este pin, no implementación aceptada. Reconciliar Link aceptado antes de diseñar APIs finales.

AFW · tokenizartinfo-ops/agent-friendly-web (1347578006 PUBLIC) · GitHub connector/docs · rama docs/finite-native-notice-receiver-design-20261105, BASE 30981d2a2f15bd49d1d0226358486e2ec0262b07. Alcance: sólo informe, rollback CAS propio; sin tests/provider.

## Resultado

Existen contratos/consumidores; faltan continuidad factual de elección/aprobación y ejecución owner de upload/activation. Sin nuevo stage/journal/permiso.

Examinar **puente GET + POST notices en QA** reutilizando choice/store y observer privado, frente a una unidad mayor aprobación→publicación. GET ya puede derivar notices sin historia notice: no hay que inventarlo otra vez. El gap es compatibilidad con historia válida y continuación POST fija. StageApproval durable no permite publicar en otra petición: transporte debe consumir admisión en el MISMO POST antes de finish. Root elegirá el corte; GET-only queda alternativa, no recomendación decidida. Ningún formulario público incompleto.

Ruling root: notices exige grant/ConnectionRef, predecessor connection y aprobación nueva; NO Link. Correlacionarlo si existe; su ausencia no añade gate. Link es obligatorio para finite. Consentimiento de avisos, aprobación de configuración y efectos provider son permisos diferentes.

## Evidencia focalizada

Contratos protegidos en caché 2f96, sin cambios según root; lecturas nuevas sólo en 953. Evidencia por líneas:

| Archivo | Evidencia | Blob |
| --- | --- | --- |
| lib/mcp-qa-finite-owner-preparation.mjs | 39–45 consume-only admission;128–173 fuente/Access/owner;198–261 choice;264–272 aprobación original;378–412 history/permissions | 01ec291de2631a7cd7e527e2a567f44ac6067522 |
| lib/mcp-qa-finite-owner-stage-facts.mjs | 8–32 contratos instalados, predecessor, decision/CSRF y contextHash | c2821f1b5806a1f8cc968425ba748d0e26f18a0b |
| lib/mcp-qa-finite-preparation-records.mjs | 41–53 source/phase;57 StageApproval;73–75 Send/Ack/Receipt | e9b66f68b6dbabbfecc46072949a0d5d9f059141 |
| lib/mcp-qa-finite-connection-profile.mjs | 8–35 perfiles y policy exactos | 8a06c997494a6a0e5ad9f9892a5bf0b38e74a8e5 |
| lib/mcp-qa-finite-owner-phase-context.mjs | 137–151 backup/inventarios;316–388 qualify/dos snapshots;416–436 lector público cerrado | f8948c0a2cc41a48773406a64fc9c863226f9b2d |
| lib/mcp-qa-finite-owner-preparation-qa.mjs | 1–7 wrapper fijo; usa lector público actual | 67f9da98bf4cc749bfe1c6cb4d5fe8bcbc64a354 |
| lib/mcp-qa-finite-owner-native-receiver.mjs | 4–32 receiver pendiente, holders/boundary/body, sin negocio | c09bd715c0e84dfebde0b27de940886d573ba643 |
| lib/mcp-qa-finite-owner-native-bridge.mjs | 4–42 transporte fijo sin montar, respuesta pending | ccbf1e709a5afb48f80f285b12d7744ddda278ba |
| lib/mcp-qa-finite-policy-transport.mjs | 42–135 owner sólo connection/enrollment;144–177 engine fijo;181–240 setup separado | 2262ae240990a2df6755944aa7958548d8679422 |
| lib/mcp-qa-finite-policy-journal.mjs | 7–47 identidad/estado;55–105 writer-head, issue/ack/finish | 6e3de33d04075740fb57e5f9afcf87dd9f68ee79 |
| lib/mcp-qa-finite-connection-preparation.mjs | 9–16 run, sólo finite selecciona preparación final | f1388c4586f9e2173f793605b11825de909b9caa |

Stubs lib/mcp-qa-finite-owner-source.mjs:3–10 (6bc88c44eae3c0b63db514833c3f0eae43eb1c0e) y connection-source.mjs:1–4 (703bada5189efc962e1f81760ff741de518b77b9), mismo prefijo. owner-http:5–13 retorna 503 (009208bed0742d6f3a29cad1e249ffb11dbb762a); exports no son mount.

Preflight docs/superpowers/reviews/2026-11-05-finite-native-notice-link-preflight.es.md, blob 5cfbf0f7a1bd62437b0891ea3de97de0281bc564: acceptedAt histórico, techos actuales; journal 5 filas/max6 con freeze/cap7, Link separado; helpers SYN fijos sin autoridad/ciclo.

## Lo existente y su límite exacto

choice GET ya deriva notices desde read_consent: Ticket con handle/hash aleatorio, sujeto, source, action, preconnection/projectRef/ConnectionRef originales; expiry limitado y limiter QA actual. No es aprobación.

choice POST verifica Origin, JWT firmado (verifyCloudflareAccessJwtWithExpiry, realm/audience de fuente), owner/revisión first-primary y fuente estable. Form <=1024: handle/projectRef/decision=approve únicos y cookie prepare coincidente. Consume Ticket, verifica TicketUse, guarda ConfigurationApproval (decision/CSRF) y StageApproval. stageContext(notices) exige read_consent, aprobación inicial, autorización original consumida, grant/relación/ConnectionRef vigentes y stageHistory(1); no latest grant.

stageAdmissions nace tras writes/checks bajo lease original; consume comprueba ctx/env/storage/DB/actor/QA/version/stage y elimina la entrada, igual que finish. WeakMap/checksum no acredita humano; importa el flujo verificado. DATA durable no recrea admisión.

Pero continuePrivateQaFiniteOwnerChoice limita método a GET (201–203), y preparePrivateQaFiniteOwnerChoice usa readPrivateQaFiniteOwnerContext, que exige notice inventory vacío. Por tanto reutilizar ese wrapper después de consentimiento/Link falla, y cambiar público a “allow history” sería una ampliación incorrecta.

Observer sólo conoce approval/efectos connection y writer-head; proyecta read_consent con OAuth true sobre baseline CLOSED. notices requiere sus tickets/approvals/efectos/perfil exactos, no una etiqueta ni tolerancia general.

## Puente mínimo a examinar antes de spec

Entrada fija en QA para la acción existente /connections/finite-prepare, con lease original real; ningún endpoint montado ni nuevo hostname. GET/POST actuales se califican contra dos snapshots completos del UUID original. Sin export de pair, constructor DTO, factory de source, allowPending ni callback que apruebe.

Reusar choice. Opción sin ciclo: phase-context ya importa owner-preparation; mantiene la continuación léxica y llama al seam de choice; preparation-qa es wrapper fijo sin proveedor de contexto externo. Extender GET-only a POST exige conservar checks, no sólo retirar guard. Alternativa: composición fija en preparation-qa. Importar phase-context desde owner-preparation crearía ciclo. No duplicar choice ni exportar pair.

Baseline de notices: conexión instalada exacta, SDK/issuer originales asentados sin pendientes, grant/ConnectionRef actuales, inventario notice coherente. Puede ser vacío o contener historia válida; desconocido/incompleto/freeze deniega. Link presente exige fila real/ACK/correlación vigentes; ausente no añade gate. No usar qualifyNoticeConsentBaseline: exige ticket ACK y event0 para otro propósito.

GET añade Ticket; POST TicketUse/ConfigurationApproval/StageApproval. Ambos frames deben incluir ticket actual seleccionado por cookie y el original, con filas vinculadas: snapshot.initialTicketHash solo no basta. expected cambia tras resultado/readback nativo, preservando bytes, exchanged_at, SDK, owner/source; sólo mutación propia léxica tolerada.

StageApproval no cambia phase ni sustituye receipt. Puente con proveedor cerrado sólo acredita decisión/cierre local; si Root requiere publicación, incluir fuente fixed/transporte bajo la misma stack. GET-only es alternativa con menos superficie pero menor resultado útil, no corte elegido.

Filemap preliminar puente: phase-context, owner-preparation, preparation-qa; fixture finite-owner-notice-get y nuevo native test. Receiver/bridge/wire sólo si Root exige M→QA completo. Store/records/journal/profile/stubs provider/world/DDL/flags/routes protegidos; no autorización.

## Qué faltaría para cerrar publicación notices

createFinitePolicyTransport.run consume admisión, pero work exige stage=connection y source.phase=closed_ui; sólo enrollPreparationCleanup y pending. readPrivateQaFiniteConnectionSource sigue unavailable. No basta retirar ese guard. createFinitePolicySetupTransport sí contiene upload/activation fijos, pero consume OTRA admisión de full setup/Selection/Binding, con PolicySend/PolicyReceipt; no puede recibir la lease owner ni usarse como atajo.

Reusar fixedPolicyEngine y Connection journals, sin HTTP genérico. Fuente fixed debe fijar actor/QA/version/sourceRevision/tree, baseline connection version/deployment/module/config, rollback recuperable y bytes/hash/residencia/holders/custodia del candidato notices. assertCurrent interno no es callback caller. Baselines/secrets no nacen de DTO ni primarias antiguas; nada operativo verificado aquí.

Journal: {kind:'connection',preconnectionId,sourceRevision,stage:'notices',effect:'upload'|'activation'}. Send liga contextHash/baseline/requestHash/deadline. contextHash usa preconnection, StageApproval, predecessor y GrantLink; notice=null. Añadir Link cambiaría contrato.

Secuencia futura: aprobación/admisión → source/current/grant/backup → SEND upload antes del POST → resultado/ACK/version real → SEND activation → resultado/ACK/pointer/config real → Receipt → dos snapshots/notice_consent. Unknown/held/late no reintenta. writer-head exige ACK previo y sin failure; no sustituye installed-stage/source.

Profile notice_consent exige OAuth true y monitoring-owner true, con policy exacta grantId/projectId/clientId/startAt/expiresAt <=600000 ms y dentro de OAuth expiry. Es configuración candidata para SOURCE, no permiso para cambiar flags reales. Después requiere reader que acepte exactamente ambos stages y la nueva configuración; no sustituir receipt connection/SDK original por latest.

## Pruebas, costo y decisiones abiertas

RED: grant SDK/conexión factual nativos; GET con historia notice válida deniega por lector vacío, POST del seam deniega 405. Sin historia, conservar GET ya existente. JWT SYN firmado/owner actual y fixture correcto, no import failure. GREEN: ticket/CSRF/StageApproval reales; firma/Origin/duplicados/cookie/body/revocación/drift/unknown/held negativos. Puente sin provider SEND/POST; admisión una vez en misma lease, nunca restart/DTO.

Historia Link después de 5 s es observable si acceptedAt estuvo dentro y techos actuales vigentes. Probar correlador enter+exit, sin backfill; también ausencia legítima. Filas ajenas intactas. Helpers sobre f nativo, sin copiar setup/importar world desde fixture.

Regresiones concretas ya existentes: owner-preparation-native “origin cookie duplicate fields raw IDs and ticket mismatch deny before approval”, “Task3 stage approval is immutable exact lookup over actual original owner decision”, y familia “Task3 source admission consumed once by … original request lease”. policy-transport “actual consumed owner approval without original native cleanup capsule remains pending and has no SEND/POST” y “Task3 preparation grammar preserves Access/limiter and closed business flags in each exact phase”. Blobs 2dc6d61f2ff35ddb4d075b573e492cd8b740d579 y 888fb63af2bf1a2ebacee99ef7813341b22803de. Regresiones phase/GET/POST/Link según diff; verificar nombres/no cero matches. Sin ejecución aquí.

Costo por medir: ticket/approval reads+writes+pares reales; no heredar 98/112 o cifras POST/Link. Conservar fanout/caps, parent<=30 s/child<=5 s, C0=I0+900000/C1=C0+180000; fuente 3 nov 02:59Z vencida. Nueva petición no renueva lineage/Access. Fit provider/readbacks es riesgo no medido; sin omitir snapshots, physical drain ni atomicidad global.

Root decide corte GET+POST cerrado / GET-only / publicación completa; ubicación sin ciclo; ticket consumido sin transporte (sin recovery); paquete SOURCE/baselines/rollback. Luego Link aceptado, spec/preflight/BASE. Este informe no activa nada.

notices no prueba suscripción/entrega/ACK útil/retirada/guard/cleanup/PCoff. Tercer CLOSED/finite_prearm y full setup siguen separados. operationalReadiness=false; completePackage=false; PCoff=false.
