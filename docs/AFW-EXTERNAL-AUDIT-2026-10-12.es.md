# Auditoría externa AFW: 12 de octubre de 2026

La interfaz de [Is Your Site Agent-Ready? de Cloudflare](https://isitagentready.com/agentfriendlyweb.dev) mostró **80/100, nivel 5 Agent-Native**, para `https://agentfriendlyweb.dev`. Fecha visible del análisis: 12/10/2026, 14:56:28, Buenos Aires. Se consultó únicamente el sitio público propio.

| Categoría visible | Resultado |
| --- | --- |
| Descubribilidad | 4/4 |
| Contenido | 1/1 |
| Control de acceso de bots | 2/2 |
| API, autenticación, MCP y skills | 5/8 |
| Comercio | No comprobado; opcional en este análisis |

La interfaz presenta doce comprobaciones aprobadas y tres fallidas en esas categorías. Los fallos son OAuth/OIDC discovery, OAuth Protected Resource y Auth.md agent registration. La comprobación de Web Bot Auth aparece como no aplicable. El resultado acredita este análisis fechado; no certifica el recorrido privado, capacidades transaccionales o disponibilidad continua del copilot.

## DNS-AID y DNSSEC: pendiente anterior resuelto

El auditor aprobó DNS-AID: encontró el registro SVCB `_mcp._agents.agentfriendlyweb.dev`, destino `mcp.agentfriendlyweb.dev`, y respuesta DNS con `AD=true`. La consulta API de la zona propia a las17:57:12UTC devolvió DNSSEC `active`.

Una consulta pública independiente al [resolver DoH de Cloudflare](https://cloudflare-dns.com/dns-query?name=agentfriendlyweb.dev&type=DS), a las18:00:39.854UTC, obtuvo `Status=0`, `AD=true` y DS `2371 13 2 0543cbe0aee4501de43fa06c96606ef05eb6b41b907e02240a9f8b9fd6b12ccb`, coincidente con el informado por la zona. No se reinició DNSSEC ni se modificaron registros. Esta evidencia sustituye el pendiente DNSSEC/DS de la nota del3deoctubre; conserva su historia.

## Límites y siguiente incremento real

El73/100 anterior fue informado por el owner. La nota del3deoctubre usaba respuestas MCP sin puntaje numérico y dieciséis comprobaciones; esta interfaz muestra quince comprobaciones computables. No atribuir una mejora causal exacta de siete puntos ni una comparación de perfiles idénticos sin conocer la versión y ponderación del auditor.

Los tres fallos restantes deben cerrarse con el servicio real: lectura delegada de expedientes, selección y consentimiento propios, interoperabilidad del cliente, revocación y un despliegue aceptado. No publicar descriptores OAuth/Auth.md del apex que apunten a un canary cerrado o anuncien registro de agentes inexistente. El canary de ensayo propio permanece cerrado; el resultado externo no autoriza abrirlo ni acredita una suscripción de avisos, una revisión cloud útil o el ensayo con PC apagado.

La evidencia completa de DOM y la consulta pública DS se conservan en el checkpoint operacional local. Esta actualización documental no despliega código ni modifica permisos.
