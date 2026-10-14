# Lectura privada de procedencia del despliegue

El lector realiza cuatro GET al API oficial: despliegue activo, versión fijada, aplicación de Containers y nuevamente despliegue activo. Según el contrato OpenAPI de Cloudflare, el primer elemento de deployments es el que sirve tráfico. Se exige una sola versión al 100%, el mismo identificador de despliegue y versión en ambas lecturas, etag esperado, binding `AFW_DOSSIER_EVENTS_NODE` de clase local `AfwOwnEventNode`, namespace previsto y aplicación de la cuenta correcta con scheduling `durable_object`.

Cuenta, Worker, versión, despliegue, etag y demás referencias se fijan en servidor. El etag del Worker **no es** el hash del programa Node. La relación entre versión, programa, revisión y scopeHash debe proceder del recibo de publicación aceptado y custodiado; este lector no fabrica esa prueba. Nunca usar JSON aportado por clientes para construirlo.

Se rechazan redirects, respuestas con caché, cuerpos mayores a 256 KiB, errores de API y cancelación. La operación completa tiene cinco segundos como máximo, sin reintentos. Devuelve únicamente scopeHash, revisión, programa y fecha del inicio de la consulta, para no rejuvenecer la observación al terminar. No devuelve credenciales ni respuestas API.

La observación no es una transacción de Cloudflare: un despliegue podría cambiar posteriormente. La puerta de lanzamiento debe consultar de nuevo y comprobar frescura. El host mantiene permisos actuales y cierre independiente.

## Evidencia y alcance

El 14 de octubre a las 19:43 UTC se consultó el canary real con GET: versión cerrada 3a9d7a81-de23-4e8b-bf9d-843b02e47514 al 100%; aplicación y namespace coincidentes; clase y binding esperados. Solo se inspeccionó la forma de las respuestas necesarias. No se desplegó, renovó OAuth ni inició un proceso.

Las pruebas automatizadas del lector usan HTTP simulado. Falta conectar el recibo de publicación privado y el lector de retiro histórico al montaje servidor, verificar recuperación y completar el ensayo propio antes de PC-off o del piloto de Max.
