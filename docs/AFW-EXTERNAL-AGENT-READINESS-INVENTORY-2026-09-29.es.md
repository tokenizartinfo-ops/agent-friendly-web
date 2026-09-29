# Inventario de señales externas de Agent Friendly Web — 2026-09-29

**Proyecto y origen:** AFW, `https://agentfriendlyweb.dev`. **Fuente externa:** herramienta pública `scan_site` del [Agent Readiness Scanner de Cloudflare](https://isitagentready.com/.well-known/mcp.json), invocada el 2026-09-29 entre 20:16 y 20:18 UTC sin credenciales. [Cloudflare documenta el escáner y sus dimensiones](https://blog.cloudflare.com/agent-readiness/); el informe es una fotografía de ese momento, no una certificación ni garantía de visibilidad.

**Observación del owner:** Gabriel ve **73/100** y **Nivel 5 Nativo** en la interfaz de Cloudflare. La API pública consultada aquí devuelve nivel y checks, pero no ese porcentaje; el perfil y la fórmula de la vista del owner no quedaron acreditados por esa API. Por eso 73/100 es una observación comunicada por el owner, no una cifra recalculada ni una medición posterior a los cambios de este documento.

## Resultado observado

| Perfil externo | Resultado | Lectura correcta |
| --- | --- | --- |
| Todos los controles (`all`) | **Level 4/5 — Agent-Integrated** | Incluye controles de autenticación y A2A que AFW todavía no ofrece como capacidad pública. El escáner MCP no devolvió un porcentaje numérico. |
| Sitio de contenidos (`content`) | **Level 5/5 — Agent-Native** | Perfil apropiado para contenido público y descubrimiento; aún falla DNS-AID. Level 5 no equivale a 100 % de señales ni a AF-5 transaccional de nuestro método. |
| API/aplicación (`apiApp`) | Mismos controles de descubrimiento, contenido, bots y API/auth que `all`; comercio excluido | Útil para seguir el catálogo y el MCP público, sin atribuir OAuth delegado a Cloudflare Access por inferencia. |

| Dimensión en `all` | Detectado | Pendiente o no aplicable |
| --- | --- | --- |
| Descubrimiento | `robots.txt`, sitemap y cabeceras `Link` | DNS-AID no detectado: 3/4. |
| Contenido | Negociación `Accept: text/markdown` | 1/1. `llms.txt` y `llms-full.txt` responden 200, pero el escáner no puntúa `llms.txt` por defecto. |
| Control de bots | Reglas explícitas para bots IA y Content Signals | 2/2. Web Bot Auth figura informativo; no se justifica por una tarea de salida inexistente. |
| API, auth, MCP y A2A | API Catalog (6 APIs), MCP Server Card, Agent Skills, WebMCP y ARD (27 recursos) | 5/9. No detecta OAuth/OIDC discovery, OAuth Protected Resource, `auth.md` ni A2A Agent Card. |
| Comercio | Ninguno | 0/0: x402, MPP, UCP, ACP y AP2 no aplican a este sitio hoy y no cuentan en la puntuación. |

Una comprobación HTTP independiente devolvió 200 para `/`, `/robots.txt`, `/sitemap.xml`, `/llms.txt`, `/llms-full.txt`, `/.well-known/api-catalog`, `/.well-known/mcp/server-card.json`, `/.well-known/agent-skills/index.json`, `/.well-known/agent-readiness.json`, `/openapi.json` y `/.well-known/security.txt`. Esta prueba confirma accesibilidad de rutas, no validez semántica; la evaluación externa aporta los controles específicos de su perfil.

## Orden de mejora

1. **Conservar lo que ya pasa:** incluir regresiones periódicas de `robots.txt`, sitemap, Content Signals, Markdown negociado y relaciones `Link` en versiones publicadas. Comparar informe externo con fecha, URL y perfil idénticos; no convertir niveles en porcentajes inventados.
2. **DNS-AID y DNSSEC:** se publicó un SVCB para el MCP real; el auditor ya lo reconoce, pero aún exige validación DNSSEC. Verificar la cadena de confianza cuando Cloudflare Registrar publique el DS y repetir el escaneo con el mismo perfil. [DNS-AID sigue siendo un borrador](https://datatracker.ietf.org/doc/draft-mozleywilliams-dnsop-dnsaid/), no un estándar formal adoptado.
3. **Autenticación con capacidad real:** AFW usa Access para expedientes privados y un MCP público de solo lectura. Publicar metadatos OAuth/OIDC o Protected Resource solo después de definir emisor, scopes, autorización delegada, revocación y pruebas. `auth.md` también requiere un registro real de agentes; una página vacía para el escáner sería engañosa.
4. **A2A solo con runtime real:** no publicar Agent Card hasta existir un endpoint A2A que implemente lo declarado, autenticación y límites de herramientas.
5. **Comercio solo si el negocio lo necesita:** mantener x402/MPP/UCP/ACP/AP2 fuera de alcance hasta diseñar producto, precios, consentimiento, identidad, pagos, recibos y reversión.

La meta es maximizar señales **relevantes, verificables y seguras**. Un 100 % universal basado en protocolos ficticios contradice la ruta proporcional AFW de AF-0 a AF-5. Los resultados externos se mostrarán como evidencia fechada y distinta del puntaje propio de AFW.

## Mejora aplicada y verificación posterior

El 2026-09-29 se verificó `https://mcp.agentfriendlyweb.dev/mcp` mediante `initialize` MCP (HTTP 200, protocolo `2025-06-18`) y se creó el registro DNS-only SVCB `_mcp._agents.agentfriendlyweb.dev` (ID Cloudflare `dd0874c06522c9c362f4295793af712c`, TTL 300, prioridad 1, destino `mcp.agentfriendlyweb.dev.`, `alpn=h2`, puerto 443). La ruta `/mcp` está publicada en la MCP Server Card; SVCB descubre el host, no codifica la ruta HTTP. No se anunció A2A ni autenticación delegada inexistentes.

El escaneo público de `2026-09-29T20:30:58.280Z` cambió DNS-AID de «sin registros» a **un registro válido sin problemas de formato**, pero el check siguió en `fail` porque `dnssecValidated=false`. El resultado global de perfil `all` siguió Level 4/5 y los requisitos para Level 5 siguieron siendo `authMd` y `a2aAgentCard`; no hay evidencia de cambio en el 73/100 mostrado por la interfaz del owner.

El dominio pertenece a Cloudflare Registrar, no tenía DS y la zona AFW tenía DNSSEC deshabilitado. Se activó la firma en la zona `4b1a3fe4b6dcb81e9d6a633174c5939f`; Cloudflare respondió `pending`, algoritmo 13, digest SHA-256 y DS generado. La validación externa del DS aún está pendiente. Tras el cambio, resolución DNS y HTTP del origen y la inicialización MCP siguieron respondiendo. Cloudflare indica que la publicación automática del DS puede tardar uno o dos días: [activación y confirmación](https://developers.cloudflare.com/registrar/get-started/enable-dnssec/), [rollback](https://developers.cloudflare.com/dns/dnssec/). En una reversión, retirar primero el DS y mantener la firma hasta que venza su TTL; no desactivar la firma antes de ello. El SVCB puede revertirse borrando solo el ID anterior.
