# Transporte administrativo compatible con Workers

El ensayo privado de custodia encontró una incompatibilidad real antes de recibir respuesta del proveedor. En workerd, `new Request(url,{redirect:'error'})` produce TypeError: únicamente admite `follow` o `manual`. Los tests con fetch simulado no construían un Request nativo y omitían este fallo, ya corregido históricamente en otros transportes de AFW.

Los transportes de identidad de servicio y lectura administrativa usan ahora `manual`. Mantienen origen y rutas fijados por servidor, ventana/autorización, método y cuerpo mínimo, abort y límite de respuesta. Requieren exactamente HTTP 200: cualquier 3xx se rechaza sin seguir Location ni reenviar Authorization.

La nueva regresión construye Request reales en workerd para GET identidad, PUT cierre y GET configuración, con credenciales sintéticas. Antes del cambio, los tres devolvían failure; después funcionan. Los tres rechazan una respuesta 302 hacia otro origen y no llaman al proveedor sintético otra vez. El ensayo no modifica recursos remotos ni acredita cierre alojado.

## Custodia propia comprobada

El owner publicó `AFW_QA_IDENTITY_API_TOKEN` como secret_text en el Worker propio `agent-friendly-web-independent-closure-qa`. La llamada privada RPC del verificador obtuvo authenticated=true, active=true y serviceRead=true, sin sacar el valor de custodia. Expiración declarada por el proveedor: 2026-10-09T02:30:00Z, 8oct 23:30 Buenos Aires. Se leyó únicamente la metadata de la identidad histórica deshabilitada; no se habilitó, renovó ni modificó.

Después se retiró el verificador mediante rollback a la versión cerrada que ya contiene el secreto `f838891f-b261-4f9c-8957-a58813c31186`. Primary readback 2026-10-09T01:39:25Z: 100%, mismo namespace DO, secret_text preservado, workers.dev/previews false y cron vacío. El loader de loopback fue detenido. Evidencia saneada en output/afw-private-custody-verification-20261008.json y output/afw-private-custody-closed-readback-20261008.json.

Esto acredita almacenamiento y lectura autorizada con esa credencial, no permisos efectivos de escritura ni cierre automático. El ordenador permaneció encendido; no hay ocurrencia nueva programada ni autorización asumida de Max.

## Sigue pendiente

Completar la custodia separada de lectura administrativa, el montaje privado de catálogo/actor/D1 y las constancias primarias. Verificar una identidad nueva exclusiva, alarma espontánea, cierre/readback y recuperación antes de programar una única ocurrencia cloud vinculada al chat/config real. Solo después coordinar el intervalo de ordenador apagado. No ampliar la duración de credenciales por inferencia ni sustituir pruebas por flags.
