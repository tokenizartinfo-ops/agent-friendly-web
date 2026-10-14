# Reserva de primer sucesor del ensayo propio

2026-10-14. Preparación local, sin migración remota ni activación.

`createSuccessorReservation` registra una sola reserva administrativa en la misma D1 del intento original. El candidato y el lector de retiro los fija el servidor; el método reserve no recibe identidad, destino o presupuesto del cliente. La evidencia debe corresponder al actor, aplicación, programa y fuente originales, con parada física observada, cierre y frescura de hasta30 segundos.

El INSERT SELECT comprueba en primaria que existe exactamente una admisión y un cierre original coincidentes. La misma sentencia comprueba su reloj: evidencia no futura ni caducada y candidato aún vigente, excluyendo el instante exacto de vencimiento. No actualiza tablas originales.

La tabla `dossier_successor_reservations` es singleton e inmutable: dos candidatos competidores solo pueden dejar una fila; update/delete se rechazan. Si se pierde el ACK o vence el plazo después de guardar, no se retorna éxito ni se reconstruye permiso desde la fila. Un segundo intento no recicla la reserva. Ese resultado requiere diagnóstico posterior, no borrar o renombrar recursos.

La salida conserva `state:prepared` y `mayBoot:false`. No constituye admisión ejecutable, consentimiento OAuth, comprobación de versión desplegada ni permiso de Node. `scopeHash` es un compromiso opaco del alcance fijado por el futuro montaje; este módulo no resuelve ni verifica por sí solo cuenta, Worker, namespace o propietario. La evidencia del proveedor refleja su último estado conocido y no garantiza el futuro.

## Validación

Siete pruebas SQLite cubren historial, concurrencia, inmutabilidad, evidencia incorrecta, ACK perdido, deadline y discrepancia entre reloj local/primario. La expiración exacta falló antes del arreglo y pasó después. Una prueba nativa D1 con dos bindings de la misma base demuestra exclusión y conservación del original. No implica que el esquema exista remotamente.

Siguiente integración: autoridad privada con manifiesto original de procedencia comprobada, resolución del actor sucesor por binding, autorización actual nueva y consumo de presupuesto de ejecución enlazado a esta reserva. Solo entonces podrá prepararse una nueva ventana de alta/entrega/baja real; PC-off y piloto Max siguen pendientes.
