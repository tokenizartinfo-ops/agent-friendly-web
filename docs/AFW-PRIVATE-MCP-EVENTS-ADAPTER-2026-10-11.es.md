# Eventos en el servidor privado de expedientes — preparación de fuente

Este bloque agrega `events/list`, `events/subscribe` y `events/unsubscribe` al mismo servidor MCP que conserva las dos herramientas de lectura delegada. La activación exige `eventsEnabled === true` y una autoridad privada suministrada por el host. El Worker OAuth actual no entrega ninguna de esas dependencias: su runtime continúa sin eventos. El MCP público no cambia.

## Contrato de autoridad y límites

`eventsAuthority` es una dependencia interna por solicitud autenticada; nunca se deserializa de parámetros MCP. `list()` devuelve un único `projectRef` opaco autorizado y vigente, o `null`. El catálogo sirve ese selector como `enum`, sin contenido del expediente, tokens, callback ni secretos. `subscribe(params)` y `unsubscribe(params)` deben comprobar por sí mismos identidad, recurso, proyecto y autorización original, incluso durante esperas. El filtro del catálogo no sustituye esas comprobaciones.

La autoridad de monitoreo requiere un consentimiento original distinto del permiso OAuth de lectura. El adaptador no crea ese consentimiento, firma, almacenamiento, claves, namespaces ni transporte. Su futuro host debe componer el controlador finito de PR396 con una autoridad durable dedicada: una suscripción/challenge y una entrega globales, sin liberar presupuesto por retiro, vencimiento o reinicio. Nunca compartir el almacenamiento propio de QA entre clientes.

Los parámetros son estrictos: un nombre fijo y selector SHA256, webhook HTTPS validado por el controlador, TTL entero positivo, cursor nulo y ningún dueño, almacenamiento o ambiente elegido por cliente. Un proyecto distinto del catálogo o catálogo retirado impide llamar a suscripción. `unsubscribe` no exige que el permiso de monitoreo continúe vigente; su autoridad sigue exigiendo identidad OAuth válida y pertenencia al recurso/proyecto. Un token OAuth vencido no se rehabilita. Los errores de autoridad y resultados inválidos se reducen a un mensaje estático.

## Verificación y alcance de evidencia

Prueba primero: sin implementación, dos casos fallaron porque no existían los métodos del protocolo. Después, el cliente MCP instalado negocia `2026-07-28` mediante Request/Response nativos y el wrapper `agents/mcp/server`. Verifica activación cerrada, catálogo mínimo, convivencia con herramientas de lectura, rechazo de selectores ajenos, retiro con catálogo vacío y errores saneados.

Una prueba adicional compone el controlador real con SQLite nativo y el mismo cliente: primera suscripción, repetición sin otro challenge, otro callback denegado, retirada y posterior reactivación denegada. Identidad y respuesta del callback son fixtures sintéticos. Esta evidencia no acredita consentimiento OAuth real, entrega pública, binding remoto, turno cloud terminado, programación, guardia ni PC-off.

## Próximo cierre operativo

1. Resolver original de monitoreo vinculado a la identidad OAuth de esta misma solicitud, con propósito/plazo y almacenamiento dedicado verificables.
2. Autoridad DO y transporte Node alojado con presupuesto durable consumido antes del envío; pérdida de ACK o reinicio de cualquiera no permite reconstruir una invocación.
3. Inventario, rollback y montaje propio cerrado; luego cuenta/plugin, callback real y revisión cloud terminada con correlación de fuente/modelo/resultado.
4. Una ocurrencia alojada propia, retirada y cierre independiente antes de acordar la prueba PC-off. Max mantiene gates propios de preview aprobado, ingreso y consentimiento.

No se requiere intervención del owner para continuar la preparación de fuente. No ampliar permisos de lectura ni reutilizar QA o permisos retirados para aparentar supervisión activa.
