# Transporte administrativo acotado

AFW, base500e426ab8d8980e631a56d6c13c15d02971c91c. Adaptador interno; sin credencial real, ruta ni despliegue.

`createAdministrativeGetTransport` recibe referencias de recursos y una función de custodia confiable del servidor. Comparte la construcción de rutas con el readback integrado en PR336. Solo despacha GET exactos al origen fijo api.cloudflare.com; no admite headers, queries, bodies, métodos o URLs del consumidor. Las redirecciones están prohibidas.

El plazo predeterminado de cinco segundos cubre custodia, conexión y body; máximo configurable diez segundos. Una clave que llegue después del plazo no dispara una solicitud tardía. Se aborta la conexión, se cancela el lector y se limita el body a256KiB. Respuestas401/redirect, MIME incorrecto, JSON inválido, errors del proveedor o custodia fallida devuelven únicamente success:false, sin detalles privados. No se reintenta ni se conserva la credencial en receipts/baselines.

Catorce pruebas focales (siete del transporte y siete del readback) pasaron, incluyendo body colgado cancelado, fetch abortado, custodia tardía sin despacho, input modificado, paths fuera de alcance, respuestas sobredimensionadas y claves con saltos de línea. Revisión independiente no encontró P1/P2. Lint focal y CI del commit final son gates de integración. No se afirma disponibilidad real del secreto ni funcionamiento remoto de este transporte.

La lectura primaria de PR336 ya comprobó el manager/token/política existentes, usando el conector de esta conversación. Este nuevo componente prepara otro mecanismo de acceso para un actor alojado; todavía no lo sustituye.

## Próximo resultado operativo

Preparar la composición del actor con un baseline completo (incluido productor y demás recursos afectados), binding D1 aislado y custodia independiente fuera de AFW Operations. Las escrituras administrativas requieren un adaptador específico y no pueden reutilizar este GET. Priorizar recursos QA propios frente a cambios de settings compartidos sin CAS probado. Preparar formulario privado y alcance de credencial antes de pedir una acción del owner; no copiar la clave al chat ni reutilizar CF-Access-Client-Id/Secret como API token administrativo.

Sin nueva publicación/adopción cloud, alarmas remotas, PC-off, guardia permanente o envío a Max por este bloque.
