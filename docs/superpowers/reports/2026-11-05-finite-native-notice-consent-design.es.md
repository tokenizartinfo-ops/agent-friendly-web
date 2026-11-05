# Checkpoint parcial: consentimiento nativo POST

5nov2026 · **INACTIVE / DISEÑO INCOMPLETO / NO EJECUTAR**. Guardado por solicitud de Gabriel de apagar y continuar más tarde. No implementación, tests, proveedor, browser, runtime ni cambios de permisos.

PROJECT=AFW; REPOSITORY=tokenizartinfo-ops/agent-friendly-web(1347578006 PUBLIC); ENVIRONMENT=GitHub docs; ORIGIN=GitHub API; RESOURCE_TYPE=docs branch; RESOURCE_ID=docs/finite-native-notice-receiver-design-20261105; ALLOWED_ACTION=checkpoint de tres documentos; ROLLBACK=sólo propio commit mediante expected-head CAS.

Pin leído: dc4edafc0b5e4ba440cd32a21dd3dd58024e811a/tree91d023ce48bb2f5105140c788d3646c64c20bd4e. GET estaba siendo implementado por único writer y NO estaba aceptado al guardar este checkpoint. No se siguió su rama WIP. Antes de retomar, root debe proporcionar su estado/HEAD aceptado; esta nota no acredita finalización.

## Evidencia leída y decisiones provisionales

- Brief GET: docs/superpowers/briefs/2026-11-05-finite-native-notice-next-slice.md, blob754ef33be7d9c0720f958d7937f531b0228e5d85.
- Preflight GET: docs/superpowers/reviews/2026-11-05-finite-native-notice-next-slice-preflight.es.md, blobff4a5396df59e5d368b27e4eebaf9edb3e0bf770.
- Store: lib/mcp-qa-finite-preparation-issuer-store.mjs, blobefc25b2af9c80b8eb27cffe219544e974002293e; líneas185–210: observeMonitoringTicket y insertMonitoringConsent requieren testigo real/misma instancia/lease/Common; líneas125–128 conservan fallo absorbente en monitoringGuard.
- Journal: lib/mcp-qa-finite-preparation-notice-journal.mjs, blobb9c15aba18e2442a0ed864b8afd5e86313c5e470; codec blob8c9386b27109cd056d3f70d91ab3cb6c6f40b4e9. Seis filas, ACK DATA no autentica SQL ni humano.

Unidad propuesta: POST humano /monitoring/grant real + correlación factual privada + dos filas consent SEND/ACK, activando formulario sólo SOURCE. No NoticeLink, phase nueva, third CLOSED o mount.

POST volverá a verificar Access firmado/realm/subject, prepare cookie, approval original/owner/grant/ConnectionRef y ticket original ACK/fila nativa. No reutiliza identidad o stack del GET. Origin exacto, body form<=1024, una clave handle válida sin duplicadas/extras, cookie monitoring única y hash coincidente. Techos=min(original,Access POST actual), negar ticket incompatible sin recortarlo/renovarlo.

Reutilización provisional: ampliar los tres módulos notice-get existentes con exports fijos POST y helpers privados de transporte, evitando un segundo transporte copiado y renombres masivos. Debe fijarse contra GET aceptado; no es filemap autorizado.

Observer privado admitiría evento exacto sólo con consent SEND previo y relaciones completas; SEND sin ACK sería hecho privado. Reader3keys/OAuth/GET siguen negando historia propia. POST baseline usa comprobación privada explícita de ticket ACK completo/eventos0, no qualifySettledOwnerPair público que exige vacío.

## Pendientes loadbearing al retomar

1. Fijar APIs/helpers/filemap contra GET realmente aceptado; resolver bounded reader1024 conservando retención/cancelación sin tocar native-wire protegido.
2. Precisar baseline POST, proyección interna de contexto connection y expected-frame completo sin exportar pair/capacidad ni allowPending.
3. Fijar una child<=5s para observeTicket→recheck→SENDrecorded→recheck→INSERT→ACK/rechecks, con mismo store/witness/lease/Common/window y resultado SQL léxico.
4. Especificar correlación de12 columnas EventRow, sequence real global, no expectedSequence+1, y cierre ante revoke/otro evento.
5. Failure latch/unknownACK/heldPromise/source-current antes de efecto; ningún retry, recuperación de ACK leyendo filas o physical-drain claim.
6. Seleccionar casos RED/GREEN nativos y nombres literales de regresión con conteo no0; medir costo/graph sin repetir50ms/allSDK/build estándar sólo para cifras.
7. Root debe leer spec/plan completos futuros y autorizar activación en BASE nuevo. El plan adjunto hoy es únicamente una lista de pendientes.

C0=I0+900000; C1=C0+180000; padre<=30000ms/hija<=5000ms; source ceiling2026-11-03T02:59Z vencido. Scope por prefijo/UUID original; historia ajena intacta. operationalReadiness=false; completePackage=false; PCoff=false. Trabajo detenido tras este checkpoint.
