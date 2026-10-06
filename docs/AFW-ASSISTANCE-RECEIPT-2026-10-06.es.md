# AFW: pedido privado de ayuda con recibo

Bloque implementado y verificado localmente; no activación de clientes ni entrega del nuevo evento al supervisor cloud. Continúa AFW-ASSISTANCE-SUPERVISION-NEXT-LAYER-2026-10-06.es.md.

## Recorrido

El acceso «Necesito ayuda» abre un panel breve del expediente permitido. Una selección: orientación, guardado, comparación o entrega. Para enviar, el expediente y el borrador de trabajo deben estar confirmados, sin conflicto, sesión pendiente o guardado en curso. La solicitud no guarda respuestas ni sustituye el autoguardado.

Tras recepción comprobada se muestra «Tu pedido quedó guardado», fecha y advertencia de revisión todavía no confirmada. Al volver a abrir, GET recupera el último recibo del propietario. Si la lectura falla, el panel pide consultar antes de crear otro. Respuesta perdida conserva el mismo requestId; una edición posterior no cambia silenciosamente el intento pendiente. Un conflicto confirmado requiere revisar la versión guardada, no un ciclo de reintentos de la revisión antigua.

## Contrato y custodia

Ruta autenticada `/api/projects/:projectId/assistance`, GET/POST no-store. Feature cerrado si falta `AFW_ASSISTANCE_ENABLED=true` o inscripción válida `AFW_ASSISTANCE_PROJECT_ID`; ambos controles son independientes del copilot y no amplían consentimiento.

POST exacto `afw.assistance-request.v1`: requestId UUID, expectedRevision positiva, topic enumerado. Origen exacto, JSON, 512 bytes/3 segundos, identidad y propietario por servidor, limiter existente con clave separada assistance/owner (5 solicitudes/minuto según binding web). No notas, correo, transcript, claves o dominio en payload.

Una única sentencia SQLite inserta `assistance_requested` en el journal privado `project_events` si propietario y revisión coinciden. ID derivado con propósito/owner/proyecto/requestId; replay verifica el mismo contenido. Ese registro comprometido será la futura fuente outbox, sin llamada remota en el camino de recepción y sin tabla/migración nuevas. No copiar este journal privado al Fix-Center arquitectónico.

El recibo solo contiene id opaco, fecha, revisión, categoría, state received y stale. No `reviewed`, `resolved`, respuesta del gerente o promesa de guardia. El productor operacional de guardados conserva su contrato v1 y no consume `assistance_requested` por inferencia; transporte/ledger/cliente cloud de ayuda necesitan contrato separado y aceptación propia.

## Verificación

- Aislamiento de dos identidades, categorías/shape inválidos, revisión antigua, doble clic, replay tras nueva revisión y respuestas intactas.
- HTTP cerrado, no identidad, propietario ajeno, Origin ausente/ajeno, body excesivo y límite agotado fallan antes de escribir.
- Cliente conserva intento tras pérdida, exige recibo exacto ligado a categoría/revisión y rechaza estados/atributos inventados.
- Workerd/D1 nativos: una recepción cuya respuesta se pierde, replay con un recibo, otra identidad404 y lectura/replay stale tras nueva revisión.
- Suite existente más primeras pruebas:949/949; test nativo adicional pasó (total esperado CI950). Cuatro pruebas del bloque pasan después de cambios finales.
- Lint completo sin errores (dos warnings previos); build final pasó, incluida la ruta nueva. Sin cambio de producción ni activación por estos resultados.
- Chrome local sintético: respuesta perdida→reintento→un recibo; siguiente revisión crea otro solo por acción explícita. 390x844 y1440x900 sin overflow, Tab al botón y Enter confirmados. Fuentes reales AFW, controles44px/foco visible; ninguna animación nueva. Capturas y logs locales en output, sin datos reales.

## Promoción y reversión

No tablas o migraciones remotas. Preparar canary cerrado con provenance y snapshot de versión/bindings antes de abrir un ensayo propio. No producción, nueva identidad, lectura de respuestas ni guardia permanente en este bloque. Volver a flags cerrados y versión anterior preservando journal; los recibos no se borran. La falta de flag cierra tanto UI como API.

Siguiente: transportar señales de ayuda con contrato separado, presupuesto compartido y deduplicación; después recibo de revisión real en app y servicio de contexto privado con consentimiento revocable. Solo entonces se puede presentar acompañamiento cloud del pedido.
