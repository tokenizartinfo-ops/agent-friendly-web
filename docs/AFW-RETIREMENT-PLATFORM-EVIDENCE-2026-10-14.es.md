# Evidencia conjunta de retiro del ensayo propio

Fecha: 2026-10-14. Preparación interna, sin despliegue ni activación.

`lib/mcp-retirement-evidence.mjs` contrasta dos observaciones de la custodia original y dos lecturas de la misma instancia. Exige actor, aplicación, manifiesto, generación e imagen originales; cierre documental estable; instancia detenida con salida cero y fechas compatibles con la ventana original. Rechaza datos desconocidos, cambios entre lecturas, observaciones documentales de más de 30 segundos y consultas que exceden el plazo. El deadline monotónico complementa al temporizador incluso si el event loop retrasa su ejecución.

El resultado es una observación administrativa fechada. `mayStartSuccessor` permanece false: no concede permiso, no crea actores, no reinicia el ensayo y no elimina su historial. `physicalStopVerified` describe la evidencia aceptada en esa consulta, no garantiza el futuro.

## Procedencia pendiente

Los lectores deben ser internos del servidor, fijados a la cuenta, aplicación y actor originales. `readInstance` debe consultar al proveedor sin caché y propagar AbortSignal. Un JSON suministrado por el cliente no demuestra procedencia. `status.updated_at` fecha una transición, no la adquisición de la respuesta: dos copias de una respuesta antigua no acreditan una consulta fresca. El adaptador real y su comprobación siguen pendientes; este módulo no está montado en un endpoint ni acredita un proveedor real.

## Validación local

Cinco pruebas del lector incluyen identidad y estado incorrectos, deriva entre lecturas, caducidad durante la consulta, cancelación y exceso de plazo sin despacho del temporizador. La última se reprodujo fallando antes del arreglo y pasó después.

Dos escenarios con D1 y Durable Objects nativos locales comprueban persistencia del retiro tras reinicio, exigencia de retirada de permisos y rechazo tras pérdida de custodia. No ejecutan una instancia remota de Cloudflare.

Siguiente paso: integrar un adaptador privado con procedencia verificable y control serial de admisión posterior. Mantener el ensayo cerrado hasta completar esos controles y la recepción útil del consumidor cloud. Esto no demuestra PC-off ni habilita el piloto de Max.
