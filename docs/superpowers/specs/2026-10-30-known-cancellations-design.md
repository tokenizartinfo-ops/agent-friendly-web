# Conjunto exacto de cancelaciones previas sin admisión

Fecha: 30 octubre 2026. AFW exclusivamente. Estado: diseño de fuente; no elegibilidad runtime.

## Problema y evidencia

Lectura primaria propia 18:40/18:52 UTC: una admisión original, dos cierres (uno sin generación), cero reservas. La cancelación anterior fue escrita tras retirar OAuth y avisos, sin admisión para ese grant. El registro es histórico e inmutable. No demuestra parada física ni ausencia histórica de eventos. El predicado legacy exige un único cierre global y bloquea correctamente ese estado no reconocido.

## Decisión

Añadir únicamente un argumento privado de constructor cancellationHistory a createSuccessorReservation. Ausente conserva exactamente el SQL legacy. Presente requiere authorize interno y un JSON estricto de hasta 16 KiB con propósito afw.successor-known-cancellations.v1, currentGrant y como máximo ocho cancelaciones únicas. No se expone por HTTP, RPC, payload Workflow, MCP o formulario. La integración futura al confirmador QA queda fuera de este incremento.

Cada cancelación fija grant, container, programa, revisión, imagen, fecha de cierre, revocación OAuth y secuencia/revisión/fecha de último revoke de avisos. Ningún grant cancelado puede ser el actual. Fechas de revocación no posteriores al cierre; todos los cierres cancelados anteriores al inicio candidato. El conjunto vacío es válido solo si realmente no hay cancelaciones.

## Invariante atómico

Dentro del mismo INSERT SELECT de reserva, conservar la evidencia física reciente del único predecesor admitido. Exigir una admisión global, un único cierre con generación unido íntegramente a ella y un total de cierres igual a uno más el conjunto aprobado. Cada elemento aprobado debe corresponder exactamente a un cierre con generación NULL, un grant revocado del mismo owner/proyecto/cliente/resource del original, sin admisión, y un último consentimiento revoke exacto de ese alcance, con un grant anterior. Cualquier elemento ausente, extra, cambiado o no clasificado bloquea.

El grant actual debe ser distinto, activo, intercambiado, del alcance original, con único scope afw:project:read, expiry suficiente y último consentimiento grant exactamente fijado; ningún revoke de ese grant es admisible. Las condiciones se evalúan en SQL primario, no por una lectura previa seguida de escritura incondicional.

## Límites preservados

Mismo slot, presupuesto uno, filas y triggers inmutables, reloj SQL/frescura y lease monotónico original de cinco segundos. ACK incierto es terminal y no habilita retry. NULL jamás prueba parada física; no se reutilizan grants cancelados ni se borran historias. El conjunto aprobado clasifica, no oculta ni renumera. No cambia el bundle congelado315cc3b ni la custodia/arranque/despacho; solo la factoría privada de reserva.

## Verificación

D1/workerd sintético: aceptación exacta; legacy todavía deniega dos cierres; rechazo de cancelación desconocida/ausente/drift, scope/consentimiento/revocación, segunda generación, grant actual inválido; fila nueva entre lectura de retiro y INSERT bloquea. Carrera con dos bindings produce una reserva; ACK perdido conserva la reserva sin permiso de retry. Comparar todas las historias antes/después, triggers intactos. Parser rechaza estructuras extra, duplicados, límites y fechas no canónicas. CI completo y revisión independiente antes de integrar. Sin deploy, migración, cambio de datos remotos ni permiso humano nuevo.
