# External Agent Readiness Baseline: agentfriendlyweb.dev

**Fecha de observacion:** 2026-08-30  
**Proveedor observado:** Cloudflare `isitagentready.com`  
**Origen:** `https://agentfriendlyweb.dev`  
**Resultado:** 53/100, Level 2 `Bot-Aware`  
**Informe humano:** `https://isitagentready.com/agentfriendlyweb.dev`

**Reauditoria posterior:** 2026-08-30T21:58:56.237Z, Level 4 `Agent-Integrated`  
**Release observado:** Sites 27, commit `6cc980560e5505ede7278ac21018506ba92e9b93`  
**Puntaje posterior:** no informado por el API del proveedor; no se infiere

**Confirmacion adicional:** 2026-08-31T19:18:35.099Z, Level 4 `Agent-Integrated`

**Puntaje de confirmacion:** no informado por el API del proveedor; no se infiere

## Alcance

Este documento conserva una fotografia externa del origen publico. No es una certificacion de seguridad, una garantia de indexacion ni una parte de la escala propia AF-0 a AF-5. La metodologia y el puntaje pertenecen al proveedor y pueden cambiar sin una version de Agent Friendly Web.

La meta comercial es obtener el maximo puntaje **aplicable y verdadero**. Un check no se publica solo para sumar puntos: OAuth, A2A, pagos o autenticacion se anuncian cuando existe el servicio correspondiente y sus limites fueron verificados.

## Evidencia que paso

- `robots.txt`;
- `sitemap.xml`;
- enlaces HTTP de descubrimiento;
- reglas explicitas para bots de IA;
- Content Signals;
- API Catalog con seis APIs observadas;
- MCP Server Card canonica;
- un Agent Skill publico.

## Evidencia que falta o falla

| Check externo | Estado observado | Decision |
| --- | --- | --- |
| DNS-AID | sin SVCB/HTTPS/TXT en `_index._agents`, `_a2a._agents` y `_mcp._agents`; DNSSEC no validado | preparar plan y evidencia; todo cambio DNS requiere aprobacion separada |
| Markdown negotiation | `Accept: text/markdown` devuelve HTML | implementar variante Markdown propia; evaluar conversion nativa Cloudflare solo con costo y aprobacion |
| OAuth discovery | ausente | no publicar hasta que exista un authorization server real |
| OAuth Protected Resource | ausente | no publicar hasta que una API protegida use RFC 9728 realmente |
| `auth.md` | ausente | publicar junto con el modelo real de autenticacion, no como texto decorativo |
| A2A Agent Card | ausente | mantener ausente hasta desplegar un agente A2A observable |
| WebMCP | no registra tools en carga | registrar una tool publica read-only que reutilice la auditoria existente |
| ARD / AI Catalog | JSON presente pero falta `specVersion` | migrar a estructura ARD compatible y conservar compatibilidad de descubrimiento |

Los checks x402, MPP, UCP, ACP y AP2 aparecen informativos y no puntuados porque el origen no presenta actualmente un recurso comercial agentico. Permanecen fuera de la entrega inmediata.

## Resultado posterior a EV-1

La reauditoria confirmo `markdownNegotiation`, `webMcp` y `ard`, junto con los checks ya aprobados de discovery, bots, API Catalog, MCP Server Card y Agent Skills. El nivel externo paso de 2 `Bot-Aware` a 4 `Agent-Integrated`.

Continuaron fallando `dnsAid`, `oauthDiscovery`, `oauthProtectedResource`, `authMd` y `a2aAgentCard`. El API no incluyo un campo de puntaje numerico en esta observacion. Registrar solo el nivel y los checks es mas riguroso que reconstruir una cifra con una formula no publicada en la respuesta.

La observacion del 2026-08-31T19:18:35.099Z confirmo el mismo Level 4 y la misma frontera: pasaron discovery, Markdown, bot policy, catalogs, MCP, skill, WebMCP y ARD; continuaron ausentes DNS-AID, OAuth, `auth.md` y A2A. Comercio x402/MPP/UCP/ACP/AP2 permanecio neutral porque el origen no declaro un recurso comercial agentico. Esta confirmacion tampoco devolvio un puntaje numerico.

## Modelo de madurez

AF-0 a AF-5 sigue describiendo la madurez propia del sitio. No se crea un AF-6 dependiente de un auditor externo. Se agrega una capa ortogonal:

### AF-EV: External Verification Profile

Cada observacion externa debe conservar:

- proveedor y URL del informe;
- fecha y origen exacto;
- puntaje, nivel y checks observados;
- version o fecha de la metodologia cuando sea conocida;
- evidencia que paso, fallo o no resulto aplicable;
- cambios realizados despues de la observacion;
- estado `baseline`, `candidate`, `verified` o `stale`;
- limites y proxima fecha de revision.

Un sitio puede ser AF-5 y tener un AF-EV incompleto si el auditor mide una tecnologia que no aplica. Tambien puede obtener un puntaje externo alto sin cumplir la gobernanza de AF-5. Ambos ejes se muestran por separado.

## Roadmap de remediacion

### Gate EV-1: lectura y catalogacion, sin identidad

**Estado:** desplegado y verificado externamente en Sites 27.

1. Negociacion Markdown real para `/` con `Vary: Accept`.
2. `/.well-known/ai-catalog.json` compatible con el esquema ARD observado.
3. Alias actual `/.well-known/ard.json` y enlace `rel="ard"`, tratado como propuesta en evolucion.
4. WebMCP read-only para auditar un sitio publico desde la pagina.
5. Perfil AF-EV publico con procedencia y fecha.

### Gate EV-2: DNS

1. Resolver el formato DNS-AID vigente con fuentes primarias.
2. Definir records que describan solo servicios existentes.
3. Evaluar DNSSEC, rollback y propagacion.
4. Solicitar aprobacion separada antes de modificar la zona.

### Gate EV-3: identidad y recursos protegidos

1. Elegir el recurso que realmente necesita OAuth.
2. Implementar authorization server o proveedor compatible.
3. Publicar metadata RFC 8414 y RFC 9728 desde el servicio real.
4. Publicar `auth.md` como explicacion complementaria.

### Gate EV-4: coordinacion A2A

1. Desplegar un agente remoto con tareas, estados, cancelacion y auditoria.
2. Publicar su Agent Card.
3. Probar desde un cliente A2A independiente.

### Gate EV-5: comercio agentico

1. Definir un recurso pago concreto, precio y contraprestacion.
2. Mantener identidad, autorizacion y pago como controles diferentes.
3. Elegir x402, MPP u otro protocolo solo despues de pruebas legales, contables y tecnicas.

## Criterio de exito

El objetivo no es declarar `100%`. El objetivo es que una reauditoria independiente observe el maximo puntaje aplicable, que cada check positivo corresponda a una capacidad utilizable y que los checks no aplicables conserven una explicacion verificable. El resultado de cada reauditoria se registra como nueva fotografia; nunca se sobreescribe el historial.

## Fuentes primarias

- Cloudflare Agent Readiness: `https://blog.cloudflare.com/agent-readiness/`
- Cloudflare Markdown for Agents: `https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/`
- ARD draft y schemas: `https://github.com/ards-project/ard-spec`
- WebMCP draft: `https://github.com/webmachinelearning/webmcp`
- Cloudflare WebMCP adapter: `https://github.com/cloudflare/agents/blob/main/experimental/webmcp.md`
