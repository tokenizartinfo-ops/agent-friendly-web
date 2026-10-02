# Auditoría externa y brechas reales — 2 de octubre de 2026

Estado: auditoría nueva y diagnóstico; producción sin cambios. La prueba del gerente con PC apagada queda pospuesta por el owner mientras trabaja otro chat.

## Evidencia comparable

Proveedor: https://isitagentready.com/mcp, `scan_site`, URL https://agentfriendlyweb.dev, perfiles predeterminados sin `enabledChecks`. HTTP 200 en ambas llamadas.

| Perfil | Nivel del proveedor | PASS | FAIL |
| --- | --- | --- | --- |
| all | 4/5 Agent-Integrated | 11 | 5 |
| content | 5/5 Agent-Native | 6 | 1 |

Los cinco fallos son dnsAid, oauthDiscovery, oauthProtectedResource, authMd y a2aAgentCard. Sin cambio frente al 30 de septiembre. La respuesta no entrega puntuación numérica: 73/100 permanece declaración histórica del owner, no medición nueva. El nivel externo de contenido no prueba capacidad transaccional AF5.

Respuestas completas locales ignoradas: `output/external-audit-20261002/all.txt` y `content.txt`. SHA-256 respectivamente `ccb6ce43dfc5836fd13098f4702323fd8f69152edabffe0fe08f3b90f23f7f40` y `4a5b321f65cedd1e29df5ea231b40b7c36f1630b64f8f20f7d92af59a0c4531d`.

## DNSSEC: causa acotada

Lecturas Cloudflare: zona AFW `4b1a3fe4b6dcb81e9d6a633174c5939f`, DNSSEC `pending`; Registrar confirma `current_registrar: Cloudflare`. Google DNS con `do=1`: DS del apex Status 0 sin Answer, AD true; CDS publicado con firma pero AD false; SVCB `_mcp._agents.agentfriendlyweb.dev` presente, prioridad 1, destino mcp.agentfriendlyweb.dev, alpn=h2, puerto 443, firmado pero AD false.

AD sobre la ausencia del DS autentica la ausencia, no la cadena del dominio. La brecha observada está en la delegación DS; no falta otro archivo web ni otro SVCB. Cloudflare documenta uno o dos días para su publicación automática desde CDS/CDNSKEY; activado desde el 29 de septiembre y aún pendiente, corresponde investigar Registrar o escalar con evidencia, sin reiniciar DNSSEC a ciegas.

Chrome habitual: Registrar > agentfriendlyweb.dev > Configuración muestra «DNSSEC Pendiente» y solo «Desactivar DNSSEC»; no existe acción visible de reintento/publicación DS. No se pulsó desactivar. Siguiente: soporte de Registrar. Cierre: DS presente en padre, respuesta SVCB validada AD true y dnsAid PASS en auditor comparable. No desactivar firma ni modificar DS sin comprobar correspondencia y rollback; nunca eliminar primero la firma si el padre contiene DS.

Borrador de soporte, todavía no enviado: «En agentfriendlyweb.dev, registrado en Cloudflare Registrar, DNSSEC está pendiente desde el 29/09/2026. El 02/10/2026 la zona publica CDS y SVCB firmados, pero la consulta DS del dominio no devuelve Answer; el SVCB no valida AD. La configuración de Registrar confirma DNSSEC Pendiente. ¿Pueden revisar la publicación de DS al registro .dev y confirmar si la operación está retenida o fallida? No hemos desactivado ni reiniciado DNSSEC. Solicitamos restaurar la delegación correcta preservando la firma actual». No incluir secretos, datos de clientes ni registros privados.

## Orden de implementación de las capacidades restantes

1. OAuth útil para ChatGPT: continuar el piloto de lectura de expediente ya diseñado. Registrar cliente/callback exactos, comprobar PKCE/resource, consentimiento sobre proyecto propio y revocación. Véase AFW-REAL-CLIENT-READINESS-2026-10-01.es.md. El canary sintético cerrado no autoriza promoción pública. Publicar issuer y protected-resource únicamente al habilitar un servicio comprobado, con URL del recurso e issuer coherentes; comprobar además descubrimiento desde el apex por el auditor.
2. Auth.md: es registro de usuarios por agentes, no una explicación genérica de login. La especificación WorkOS distingue agent verified y user claimed y emite credenciales OAuth acotadas. Priorizar user claimed con aprobación humana, sin confiar afirmaciones de identidad de otro agente. Requiere contrato de registro/claim, límites contra abuso, revocación y pruebas de aislamiento antes de anunciar endpoints o metadata agent_auth. Mantener separado del consentimiento de cliente MCP existente.
3. A2A: siguiente servicio propuesto, diagnóstico público de capacidad y siguiente paso proporcional. Reutilizar scanner con controles SSRF/tiempos/tamaño existentes; devolver evidencia fechada, alcance y preguntas necesarias. Sin edición de webs, correo, compras ni lectura de expedientes privados. Implementar transporte y errores reales, límites de concurrencia y prueba con cliente independiente antes de publicar Agent Card. Una tarjeta por sí sola no acredita interoperabilidad.

No añadir comercio para elevar puntuación: el auditor lo excluye por no aplicabilidad. No relajar bots, privacidad o Access. llms.txt/llms-full.txt, Markdown, API catalog, MCP card, skills, WebMCP y ARD no son los faltantes actuales.

## Fuentes primarias

- [Cloudflare Registrar DNSSEC](https://developers.cloudflare.com/registrar/get-started/enable-dnssec/).
- [Auditor externo](https://isitagentready.com/).
- [Auth.md](https://workos.com/auth-md).
- [A2A specification](https://a2a-protocol.org/latest/specification/) — consultar versión vigente antes de implementar.

No se modificó runtime, DNS, Access, D1 ni configuración de clientes. Cambios de este bloque: evidencia y orden de cierre verificable.
