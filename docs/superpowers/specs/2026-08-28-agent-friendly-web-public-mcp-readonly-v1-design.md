# Agent Friendly Web Public MCP Read-Only v1 Design

**Fecha:** 2026-08-28  
**Bloque:** 4C  
**Estado:** aprobado para implementacion por la continuidad expresa del roadmap  
**Origen canonico previsto:** `https://agentfriendlyweb.dev/mcp`

## Objetivo

Publicar un servidor MCP remoto, stateless y estrictamente read-only que permita a agentes consultar capacidades publicas reales de Agent Friendly Web sin depender del front humano. El servidor debe reutilizar los contratos y controles ya desplegados para auditoria, Registry, metodologia y OKF, sin abrir expedientes privados ni crear una via indirecta de escritura.

## Enfoque elegido

Se implementara MCP `2026-07-28` mediante el SDK TypeScript v2 y `createMcpHandler` de Cloudflare Agents SDK. El transporte sera Streamable HTTP stateless sobre una unica ruta `POST /mcp`.

Este enfoque se elige porque:

- cada solicitud es autocontenida y no necesita sesiones, Durable Objects ni SSE heredado;
- el SDK oficial mantiene el protocolo, validacion de esquemas y compatibilidad con clientes Streamable HTTP anteriores;
- la ruta puede convivir con el Worker Vinext/Sites actual y reutilizar funciones de dominio ya probadas;
- un servidor nuevo no debe construirse sobre `McpAgent`, hoy deprecado para este caso.

Se descartan dos alternativas:

1. **JSON-RPC implementado manualmente.** Reduciria dependencias, pero duplicaria validacion de protocolo, descubrimiento, errores y compatibilidad de clientes.
2. **Worker MCP separado.** Inicialmente se postergo para validar el producto dentro del Site. El candidato remoto demostro que la cuenta propietaria no tiene habilitado Sites MCP; por eso esta alternativa pasa a ser la implementacion aprobada. Se usa `mcp.agentfriendlyweb.dev` para aislar despliegue y rollback sin cambiar el contrato funcional.

## Alcance publico

### Tools

El catalogo se ordena alfabeticamente y expone exactamente cuatro tools:

1. `audit_public_site`
   - Entrada: `url` publica HTTP/HTTPS.
   - Reutiliza `runPublicAudit` y sus controles de DNS, SSRF, timeout, bytes y redirecciones.
   - Devuelve evidencia observada, puntaje AF, probes saneados y limites.
   - No autentica contra el sitio ni persiste la observacion.

2. `get_afw_methodology`
   - Entrada opcional: `section`, allowlisted entre `overview`, `levels`, `categories`, `limits` y `roadmap`.
   - Devuelve metodologia AF-0 a AF-5, estado normativo y limites desde fuentes locales versionadas.
   - No realiza solicitudes de red.

3. `get_public_registry_profile`
   - Entrada: `slug` publico y `version` positiva opcional.
   - Devuelve solo un perfil ya publicado mediante el contrato `agentfriendly.public-profile.v1`.
   - Nunca consulta proyectos, owners, observaciones privadas, borradores o desafios de dominio.

4. `verify_public_okf_release`
   - Entrada opcional: `release`; v1 solo admite `v0.2` del origen canonico Agent Friendly Web.
   - Verifica manifiesto, inventario, tipos de medio y SHA-256 en memoria usando el verificador existente.
   - No admite origen arbitrario, no crea archivos y no certifica la verdad sustantiva del contenido.

Cada tool declara `readOnlyHint: true`, `destructiveHint: false` e `idempotentHint: true`. `audit_public_site` declara `openWorldHint: true`; las otras tools, `false` salvo las lecturas HTTP acotadas del release OKF canonico.

### Resources

El servidor publica recursos estables y sin parametros privados:

- `afw://methodology/v1`
- `afw://capabilities/v1`
- `afw://readiness/v1`
- `afw://okf/v0.2`

Los recursos devuelven contenido JSON o Markdown acotado, ordenado y basado en archivos publicos versionados. No se expondran plantillas que acepten rutas, URLs o identificadores de expedientes.

## Contrato de salida

Las tools devuelven dos representaciones sincronizadas:

- `structuredContent`: objeto JSON estable bajo `agent-friendly-web.mcp-result.v1`;
- `content`: resumen textual breve en espanol con la misma conclusion y limites.

El envelope incluye:

- `contract`, `server_version`, `tool`, `status`, `generated_at`;
- `input` saneado;
- `result` acotado;
- `sources` publicas;
- `limits` y `blocked_actions`.

Errores de uso o integridad se devuelven como resultado MCP con `isError: true`, codigo estable y mensaje saneado. No incluyen stack, cuerpos remotos, credenciales, cookies ni valores de headers sensibles.

## Transporte y compatibilidad

- Ruta canonica: `POST /mcp`.
- Protocolo preferido: `2026-07-28` stateless.
- Compatibilidad: solicitudes Streamable HTTP 2025 aceptadas por el handler oficial cuando el SDK las soporte.
- No se publica `/sse` ni transporte HTTP+SSE heredado.
- `GET /mcp`, `PUT`, `PATCH` y `DELETE` no son interfaces de tool y deben fallar de forma cerrada.
- Cuerpo maximo del request: 32 KiB.
- `Content-Type` requerido: `application/json`.
- El origen esperado se valida en produccion y no se confia en un `Host` arbitrario para construir enlaces canonicos.

## Autenticacion

V1 no requiere OAuth porque solo sirve informacion que ya es publica y no personalizada. Esta decision no se extiende a:

- expedientes;
- perfiles no publicados;
- owner data;
- observaciones guardadas;
- acciones de publicacion;
- herramientas Tokenizart/Atelier Nivel 4;
- facturacion, pagos o administracion.

Cualquier tool futura que lea datos no publicos exigira un servidor o frontera autenticada separada, con identidad, scopes, consentimiento, revocacion y auditoria.

## Threat model

### SSRF y red

- La auditoria conserva resolucion DNS publica previa, rechazo de IP privada/local, redirecciones manuales, timeout y limite de bytes.
- OKF solo verifica el release canonico allowlisted; no acepta hosts ni paths elegidos por el cliente.
- Registry lee el store publico interno y no transforma el slug en una URL remota.

### Abuso de computo

- El body HTTP queda limitado a 32 KiB.
- Los strings y listas tienen limites de longitud e inventario.
- No hay recursion, shell, codigo arbitrario, uploads ni fan-out configurable.
- El catalogo contiene solo cuatro tools.
- La proteccion de volumen en el edge se documenta como gate operativo; no se inventa rate limiting aplicativo sin almacenamiento fiable.

### Fuga entre clientes

- El servidor y transporte se crean por request mediante el handler stateless.
- No se comparte una instancia mutable de server o transport entre clientes.
- No existe memoria de conversacion, session id aplicativo ni cache privada.

### Inyeccion y datos sensibles

- El contenido remoto se trata como evidencia, no como instrucciones.
- Los resultados no reproducen cuerpos completos de paginas.
- Los errores no reflejan userinfo de URLs ni datos probables de credenciales.
- No se registran inputs o resultados en D1 desde MCP v1.

## Descubrimiento

Solo despues de verificar el endpoint con un cliente MCP real se promoveran:

- `/.well-known/mcp/server-card.json`;
- `/.well-known/mcp.json` como alias de descubrimiento del proyecto;
- pagina humana `/mcp-readonly`;
- referencias en `llms.txt`, `llms-full.txt`, AI Catalog, API Catalog, readiness, sitemap y navegacion.

La tarjeta aclara que el endpoint es publico, read-only y sin OAuth, y que las rutas well-known son convenciones de descubrimiento del proyecto cuando no exista una obligacion normativa universal aplicable.

## Observabilidad y privacidad

La aplicacion no persiste logs de tool calls. La verificacion de release registra solo:

- version de Site y commit;
- resultado de `server/discover` o compatibilidad equivalente;
- lista ordenada de tools/resources;
- resultado de una llamada positiva por tool;
- pruebas negativas;
- timestamp y cliente usado.

Los logs operativos administrados por Cloudflare quedan sujetos a la configuracion de plataforma, pero no se amplian ni se convierten en una base de perfiles de usuarios en este bloque.

## Pruebas y gates

1. Unit tests de envelopes, orden, limites y saneamiento.
2. Tests de tool handlers con dependencias inyectadas.
3. Tests negativos para URL privada, slug invalido, version invalida, OKF no allowlisted, tool desconocida, metodos no permitidos y body grande.
4. Test del protocolo con cliente SDK en memoria.
5. Build Vinext/Cloudflare y regresion completa.
6. Cliente MCP real contra preview de Site: descubrimiento, list tools/resources, read resource y una llamada por tool.
7. Auditoria del origen posterior: MCP debe detectarse solo tras promover la tarjeta verificada.
8. Revision independiente de codigo y threat model.

## Fuera de alcance

- OAuth y datos privados;
- expedientes autenticados;
- borradores o paquetes de implementacion;
- publicacion, deploy, DNS, billing o pagos;
- MCP owner de Tokenizart/Atelier;
- A2A, WebMCP, plugins o MCP Apps;
- voz, email, memoria o ejecucion remota;
- certificacion oficial o promesa de indexacion/recomendacion.

## Criterio de cierre

El Bloque 4C se considera desplegado solo cuando la version exacta de produccion:

- responde en `https://mcp.agentfriendlyweb.dev/mcp` con un cliente MCP compatible;
- expone exactamente las cuatro tools y cuatro resources aprobadas;
- pasa llamadas positivas y negativas sin persistencia ni mutaciones;
- publica contrato, tarjeta, pagina humana y readiness coherentes;
- conserva `main` verde y un rollback documentado.
