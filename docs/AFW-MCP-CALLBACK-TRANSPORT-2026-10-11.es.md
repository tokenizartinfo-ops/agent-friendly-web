# Transporte privado de callbacks MCP

Preparación de fuente del 11 de octubre de 2026. No está montado ni habilita una suscripción.

`lib/mcp-callback-transport.mjs` envía una sola petición POST con el cuerpo y los cinco encabezados del sobre firmado. Toma una copia de propiedades de datos congeladas antes de esperar por la red; no acepta encabezados adicionales, configuración TLS, proxy o un conector alternativo.

Cada envío resuelve nuevamente A y AAAA. Todas las direcciones deben cumplir la política conservadora de `lib/mcp-callback-network.mjs`: se excluyen rangos especiales IPv4 y se admite únicamente el espacio global IPv6 permitido, con sus exclusiones. La conexión fija una dirección de ese resultado, conserva el hostname original para Host, SNI y validación nativa del certificado, y desactiva selección automática de familias, reutilización, redirecciones y reintentos. Esta política no garantiza que una dirección pública sea un servicio autorizado: esa autorización pertenece al host.

El límite total de cinco segundos incluye DNS, TLS, encabezados y cuerpo completo. El cuerpo de salida admite como máximo 262144 bytes; la respuesta admite 1024 bytes, UTF-8 válido, sin compresión y únicamente estados 2xx. Cancelación, respuesta incompleta, fallo TLS o exceso de límites producen un error estático que no incluye destino, contenido ni credenciales.

## Qué demuestran las pruebas

El ensayo local crea un certificado efímero y usa HTTPS nativo para comprobar bytes, Host, rechazo del hostname incorrecto, cadena no confiable, redirecciones, tamaños y cancelación. Una superposición exclusiva del test inspecciona la dirección fijada y conecta al servidor local con su CA. Por ello este ensayo no acredita una entrega a un callback público real. El ensayo anterior en Cloudflare Containers acredita por separado la viabilidad de TLS nativo con IP fijada, y sus recursos ya fueron eliminados; no debe repetirse para justificar esta fuente.

## Siguiente cierre operativo

Antes de montar el transporte: principal autenticado, proyecto autorizado, suscripción con vigencia máxima de diez minutos para QA, custodia del secreto, desafío de un solo uso, retirada comprobada y presupuesto persistente de entrega. Después: montaje propio cerrado, suscripción real del plugin y correlación con una tarea cloud completada y su publicación/modelo exactos. Solo una ocurrencia alojada comprobada y un ensayo propio con PC encendida permiten preparar el ensayo acordado con PC apagada. No hay guardia permanente ni invitación a Max acreditadas por este módulo.

Diseño y plan: `docs/superpowers/specs/2026-10-11-afw-mcp-callback-transport-design.md` y `docs/superpowers/plans/2026-10-11-afw-mcp-callback-transport-plan.md`. Evidencia local y continuidad en `output/afw-mcp-callback-transport-ledger-20261011.md`.
