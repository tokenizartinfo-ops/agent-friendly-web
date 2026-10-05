# Watchdog: transiciones durables sin avisos repetidos

Bloque AFW, repositorio agent-friendly-web, preparación local. No runtime, cron, Access, identidad o D1 remoto modificados. La aceptación previa del consumidor por horario se conserva en [su recibo](AFW-SCHEDULED-CYCLE-ACCEPTANCE-2026-10-04.es.md); no repetirla para probar este bloque.

## Comportamiento

`recordWatchdogObservation` consume exclusivamente la salida saneada del watchdog, calculada por servidor con configuración comprobada. Solo admite los dos recursos delegados y las ocho condiciones cerradas del helper; rechaza campos extra, recursos desconocidos, condiciones duplicadas y fechas futuras antes de IO. No es una API pública ni acepta configuración del navegador.

La D1 de operaciones conservará estado actual, fecha del último chequeo, fecha de transición, condición anterior y revisión. Un batch transaccional guarda la transición y su aviso pendiente. Un fallo al crear el aviso revierte también el estado; errores de proveedor se sustituyen por mensaje fijo.

La clave recurso/revisión evita duplicados concurrentes. Repetir salud o fallo actual no produce avisos adicionales; cambiar el conjunto de condiciones produce un aviso nuevo. Las condiciones se ordenan para que el orden del array no cree una transición falsa. Observaciones antiguas o de igual fecha no reemplazan el estado vigente; esto no acredita resolver dos observaciones contradictorias con la misma fecha.

La primera observación saludable es silenciosa. Una transición desde condiciones adversas a salud genera `recovered` como recuperación del **estado observado por el watchdog**, no como certificación de reparación del servicio. La pausa deliberada es silenciosa y una reanudación saludable no certifica recuperación de la observación anterior a la pausa. Al reanudar con problemas se produce una nueva atención.

## Persistencia y límites

Esquema aditivo `worker/operations/watchdog-state.sql`: `operations_watchdog_state` y `operations_watchdog_outbox`. Preparado y ensayado únicamente en SQLite local; aún NO aplicado a D1 remoto. Destino futuro exclusivo D1 operaciones603c471d-19bb-4530-9773-c02e18b29840, nunca expedientes. Rollback: no invocar el módulo/retirar su futuro binding; conservar tablas e historial, nunca DROP.

Outbox significa aviso preparado, **no enviado**. No existen en este bloque consumidor de avisos, identidad, lease/acuse de entrega, canal de notificación o schedule independiente. Se conserva historial, incluso avisos de condiciones ya cambiadas. Antes de entregar, el futuro consumidor deberá comprobar estado/revisión y pausa actuales, descartar efectos obsoletos sin borrar historial y registrar acuse/idempotencia; no enviar indiscriminadamente todas las filas antiguas. Una pausa no equivale a resolver o entregar avisos pendientes. No prometer exactamente una entrega externa a partir de una restricción SQLite.

Las pruebas cubren deduplicación y cambios, pausa/reanudación, orden temporal y duplicados concurrentes, rollback del batch y conservación de un evento histórico, saneamiento previo a IO y orden de condiciones. El helper existente mantiene su aceptación local separada. No se simularon ni declararon avisos reales entregados.

Validación local: suite781/781, lint sin errores (dos warnings previos en img/export), build completo. Las cinco pruebas nuevas fallaron antes de implementar la persistencia y pasaron después; el caso de conservación se amplió con un evento histórico no vacío. CI del PR valida la revisión final.

## Próximo bloque

Conectar lectura y registro en un watchdog separado del productor, con configuración e identidad resueltas por servidor, pausa y ventana temporal. Aceptar remoto con datos sintéticos en almacenamiento operacional aislado, sin alterar checkpoints históricos para obtener resultados verdes. Después probar consumidor/acuse de aviso y supresión de avisos obsoletos, ausencia del productor frente a entrega interrumpida, recuperación y cierre. Solo tras esas pruebas definir identidad vigente y cadencia estable. Los Workers operacionales y token permanecen en el cierre comprobado anterior.
