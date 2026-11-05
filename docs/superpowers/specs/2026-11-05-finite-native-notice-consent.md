# Consentimiento POST — borrador de checkpoint

5nov2026 · **INACTIVE / INCOMPLETO / NO IMPLEMENTABLE TODAVÍA**.
Se guarda por solicitud de apagar y continuar más tarde. Este archivo no activa una unidad ni sustituye preflight de root.

Referencia: reports/2026-11-05-finite-native-notice-consent-design.es.md. Pin de inspección dc4edafc0b5e4ba440cd32a21dd3dd58024e811a; GET aún no aceptado al guardar. Store/journal aceptados previamente; no rediseñarlos.

## Requisitos ya delimitados

- Entrada humana fija POST /monitoring/grant; origen canary exacto y verificación independiente de Access firmado con source.realm/audience. Subject/prepare cookie/approval/owner/grant/ConnectionRef originales y ticket ACK/fila real deben coincidir.
- Form application/x-www-form-urlencoded de máximo1024bytes; UTF8 válido, una sola clave handle base64url43 sin extras/duplicadas; cookie monitoring única y hash matching; Origin exacto. Método/path constituyen acción grant fija. No opciones grant/action/sequence/expiry del caller.
- Common de POST deriva de reservation original y Access actual mínimo. Si ticket.expiresAt excede techo actual, negar; no cambiar ticket ni renovar permiso.
- observeMonitoringTicket({...Common,ticket},lease) real y después insertMonitoringConsent({...Common,ticketWitness},MISMA lease) de MISMA instancia store; mismos Common/window exactos y witness original no serializado. El testigo no autentica a la persona.
- Consent SEND recorded durable antes de INSERT; actualPromise/result SQL privados hasta ACK y rechecks completos. AppendPromises no sobrescriben SQL. Error/existing/uncertain/no_mutation no éxito ni reintento.
- Evento de12 columnas exactas; issued_at nativo, expires_at absoluto original, sequence real>0 global y rowHash completo. ACK checksum no es prueba humana.
- Observer conserva ambos snapshots completos, source/SDK/owner actuales y grant.exchanged_at real. Se amplía únicamente correlación privada para consent SEND/ACK/evento real. Reader público3keys, OAuth y GET continúan cerrados ante historia propia.
- Prefijo propio y grant UUID original; caps schema8/DO7/ticket2/event3, success===true+resultsArray antes de interpretar0rows; fresh-primary en cada factual SELECT. No lookup global/latestgrant ni afectar historia ajena.
- Form GET activo sólo SOURCE tras aceptación de POST; ningún mount/config/flag/runtime.
- No ordinary writer/post-ACK forward/allowPending/callback aprobador/raw pair/source factory. Sin nueva phase/NoticeLink/third CLOSED/cleanup/hosting.
- SourceC0/C1/30s/5s originales y ceiling3nov vencido. No physical drain por abort/journal.

## Aún sin cerrar

APIs y filemap exactos; refactor privado acotado de transporte/handler sobre GET aceptado; lector body1024 con retención completa; baseline privado POST y máquina de estados/resultados; validación completa EventRow y rechazo de retirada; mecanismo de failure latch; texto HTML final; casos/pruebas y filtros literales de regresión; métricas reales y autorización cloud específica.

El futuro implementer NO puede resolver estos puntos por inferencia ni ejecutar este borrador. Completar diseño y root preflight primero.
