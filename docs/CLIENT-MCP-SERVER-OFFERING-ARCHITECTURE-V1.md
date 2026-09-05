# Client MCP Server Offering Architecture v1

**Estado:** arquitectura futura; no desplegada

**Fecha:** 2026-09-03

**Producto:** Agent Friendly Web

## Proposito

Definir como Agent Friendly Web podra relevar, construir, desplegar y mantener servidores MCP para clientes sin confundir esa oferta futura con el MCP publico read-only que AFW ya opera en `https://mcp.agentfriendlyweb.dev/mcp`.

El servicio busca convertir capacidades reales de una organizacion en herramientas comprensibles para agentes. No consiste en envolver toda una API ni en entregar acceso administrativo general. Cada herramienta debe resolver un objetivo concreto, declarar limites, usar el permiso minimo y producir evidencia auditable.

## Tres patrones de entrega

### 1. MCP publico read-only

Para informacion que ya es publica: catalogos, horarios, requisitos, metodologia, inventarios publicos o auditorias acotadas.

- Streamable HTTP sin identidad owner;
- pocas tools orientadas a tareas y resources versionados;
- schemas cerrados, limites de red, tiempo y respuesta;
- rate limiting, saneamiento y pruebas negativas;
- documentacion humana y descubrimiento machine-readable;
- ninguna credencial del cliente ni escritura remota.

El MCP publico de AFW es el caso de referencia de este patron. Su existencia no autoriza a reutilizarlo como runtime multi-tenant ni como servidor privado de un cliente.

### 2. MCP privado con OAuth y scopes

Para datos o acciones que dependen de una cuenta, un rol o una organizacion. La conexion remota debe usar OAuth cuando el cliente y el host lo permitan, con consentimiento y scopes comprensibles.

Flujo minimo:

```text
MCP host -> OAuth -> identidad verificada -> consentimiento -> scope
         -> policy gate -> tool especifica -> adaptador del cliente
         -> resultado saneado -> auditoria -> revocacion/rollback
```

Cada request conserva `identity`, `consent`, `scope`, `audit` y `rollback`. Las escrituras agregan idempotencia, confirmacion humana proporcional al riesgo y una prueba en canary antes de produccion.

### 3. Code Mode para superficies grandes

Code Mode se evaluara solo cuando una API sea tan amplia o cambiante que exponer cada endpoint como tool consuma demasiado contexto. El patron mantiene la especificacion del lado servidor y ofrece un conjunto compacto para buscar documentacion, descubrir operaciones y ejecutar llamadas dentro de un runtime aislado.

No sera la opcion predeterminada. Para un restaurante, museo, profesional o comercio con pocas capacidades, tools explicitas suelen ser mas faciles de entender, probar y auditar. Code Mode requiere aislamiento de ejecucion, allowlists, limites, observabilidad y una politica estricta sobre operaciones mutantes.

El repositorio `https://github.com/jillesme/cloudflare-mcp-code-mode-demo` demuestra el consumo del MCP hospedado por Cloudflare y el ciclo descubrir, desplegar, observar, reparar y verificar. No implementa un servidor MCP ni el runtime de Code Mode; por eso se usa como referencia pedagogica y no como dependencia ni estandar de AFW.

## Arquitectura de referencia

```text
Agente o LLM
    |
    v
Remote MCP ingress (Streamable HTTP)
    |
    +--> publico read-only -----------------------------+
    |                                                   |
    +--> OAuth + tenant + scopes -> Policy Gate --------+--> tools/resources
                                                        |
                                                        v
                                              Client Adapter Layer
                                                        |
                                  +---------------------+--------------------+
                                  |                     |                    |
                              API/CMS               base propia        servicio externo
                                  |                     |                    |
                                  +-----------> recibo saneado <-------------+
                                                        |
                                                        v
                                             auditoria metadata-only
```

El adaptador aisla las particularidades del CMS, API o proveedor. Un cambio de hosting no debe obligar a redisenar el contrato publico de la tool.

## Credenciales y secretos

- no reutilizar credenciales de Cloudflare del cliente;
- no solicitar contrasenas personales para operar el MCP;
- preferir OAuth con scopes o un token de servicio independiente y revocable;
- guardar secretos solo en el gestor aprobado del entorno;
- entregar al modelo capacidades y resultados, nunca valores secretos;
- separar tenants, ambientes, auditoria y limites;
- documentar owner, consumidor, alcance, ubicacion logica, expiracion y rotacion sin copiar el secreto;
- permitir desconexion y exportacion para evitar lock-in.

## Entregables comerciales

1. Relevamiento y PDR de objetivos, usuarios, datos y riesgos.
2. Inventario de tools, resources y prompts realmente justificables.
3. Matriz de identidad, consentimiento, scopes, confirmaciones y operaciones bloqueadas.
4. Contratos JSON Schema, ejemplos, errores estables e idempotencia.
5. Worker canary aislado, observabilidad y rollback comprobado.
6. OAuth o autenticacion de servicio, si corresponde.
7. Evals funcionales, negativas, seguridad, latencia y presupuesto de contexto.
8. Documentacion humana, server card, catalogo y guia de conexion.
9. Handoff de codigo, configuracion y procedimiento de retiro.
10. Monitoreo y mantenimiento opcionales con alcance y costo recurrente explicitos.

## Secuencia de madurez MCP del cliente

| Etapa | Resultado | Gate de salida |
| --- | --- | --- |
| MCP-D0 | PDR y decision de pertinencia | existe una tarea real que MCP mejora |
| MCP-D1 | servidor publico read-only | contratos, limites, evals y canary verdes |
| MCP-D2 | acceso privado con OAuth | identidad, consentimiento, scopes y revocacion verificados |
| MCP-D3 | primera accion mutante acotada | idempotencia, confirmacion, auditoria y rollback probados |
| MCP-D4 | Code Mode opcional | escala de API justifica el runtime y el aislamiento pasa QA |
| MCP-D5 | operacion comercial | soporte, SLO, costos, versionado y retiro documentados |

Estas etapas no sustituyen AF-0 a AF-5. Miden la madurez de una integracion MCP especifica dentro del expediente general de un sitio.

## Modelo de monetizacion

- MCP publico read-only acotado: paquete de alcance fijo cuando las fuentes estan ordenadas;
- MCP privado: PDR, implementacion, OAuth, integracion y QA cotizados por caso;
- primera tool mutante: gate y presupuesto separados por mayor riesgo;
- Code Mode: trabajo enterprise o de API extensa, nunca incluido por defecto;
- mantenimiento: opcional, ligado a monitoreo, cambios de contrato, evals y soporte reales.

El precio debe contemplar tiempo humano, consumo de infraestructura/modelos, complejidad de integracion, riesgo y soporte. No se promete compatibilidad universal con todos los hosts ni una posicion en sus directorios.

## Aplicacion a Agent Friendly Web

El servicio no amplia el MCP publico actual. Antes de vender MCP para clientes, AFW debe:

1. publicar esta arquitectura como propuesta y mantener el estado `no desplegada`;
2. elegir un primer piloto read-only con datos publicos;
3. construir una plantilla reusable con contracts, evals y observabilidad;
4. demostrar conexion desde al menos dos hosts compatibles;
5. medir costo, latencia, errores y carga de soporte;
6. recien despues ofrecer OAuth privado o una accion mutante.

## Fuentes primarias y referencias

- Cloudflare MCP: `https://developers.cloudflare.com/agents/model-context-protocol/`
- Cloudflare MCP server: `https://github.com/cloudflare/mcp`
- Cloudflare Code Mode: `https://developers.cloudflare.com/agents/api-reference/codemode/`
- MCP specification: `https://modelcontextprotocol.io/specification/2026-07-28`
- Demo operacional estudiada: `https://github.com/jillesme/cloudflare-mcp-code-mode-demo`
- Video aportado por Gabriel Mucchiut: `https://youtu.be/eTa8TPxkvMY`
