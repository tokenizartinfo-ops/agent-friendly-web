# Observación del proveedor en el host privado

El Durable Object del preregistro puede consultar el proveedor mediante el lector y transporte GET existentes. `readProviderObservation()` no acepta parámetros: usa exclusivamente los recursos del preregistro vigente y la configuración administrativa previa. No añade endpoint HTTP, namespace ni ruta pública.

Los originales cloud y el recibo primario deben estar vigentes antes y después de la lectura externa. Si se retiran durante la consulta, el resultado es nulo. El transporte fija el origen Cloudflare, los recursos, el cuerpo máximo y la cancelación; no permite escrituras ni reintentos de mutación.

El control `AFW_QA_PROVIDER_OBSERVATION_ENABLED` debe ser exactamente true; `AFW_QA_PROVIDER_CONTEXT` fija dominio y audiencia aprobados. La lectura requiere `AFW_QA_ADMIN_READ_API_TOKEN`, separado del token de identidad. Sin configuración o credencial, falla cerrado. La configuración remota actual carece de esa credencial administrativa y permanece cerrada: esta entrega no la crea ni activa nada.

El ensayo nativo usa respuestas de proveedor e identidad expresamente sintéticas, con el transporte de producción y una salida HTTP interceptada por el harness. Comprueba observación válida, cierre por controles ausentes y retirada durante una consulta externa. No acredita custodia administrativa real, instalación ni ejecución cloud.

Quedan conectar en el mismo primario la reserva/instalador/catálogo y el cierre, revisar recuperación y efectuar un montaje cerrado, adoptar la fuente cloud y comprobar una ocurrencia propia antes de acordar PC-off. No se ha enviado correo a Max.
