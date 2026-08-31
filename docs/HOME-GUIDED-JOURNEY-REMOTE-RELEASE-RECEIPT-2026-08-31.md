# Home Guided Journey v1 - Recibo de publicacion remota

**Fecha:** 2026-08-31  
**Origen oficial:** https://agentfriendlyweb.dev  
**PR de integracion:** https://github.com/tokenizartinfo-ops/agent-friendly-web/pull/26  
**Commit funcional publicado:** `5b649718dfcce5f9f86450d0778006b1a3773446`  
**Version funcional Sites:** 30  
**Rollback inmediato:** Sites 29, commit `e7a2059933b8e1e183cd5b8ec978a95bf69c2de1`

## Alcance publicado

- recorrido humano `La llamada -> F0-F5 -> diagnostico -> comparador -> archivo -> siguientes caminos`;
- contraste del hero protegido en escritorio y composicion visual primero en movil;
- copia localizada de portada para espanol, ingles y portugues;
- atributo `lang` derivado de rutas publicas allowlisted;
- compatibilidad `/favicon.ico` mediante redireccion al recurso SVG publicado;
- Block 5D documentado y desacoplado del runtime publico.

## Verificacion previa

- CI de GitHub aprobada antes del merge;
- `npm test`: 266/266 pruebas aprobadas;
- `npm run lint`: aprobado;
- `npm run build`: aprobado;
- commit exacto fusionado y enviado al repositorio fuente de Sites;
- archivo de despliegue generado desde el mismo commit y con migraciones existentes incluidas.

## Pruebas posteriores

- `GET /`, `/en`, `/pt`, `/registry` y `/mcp-readonly`: `200`;
- `GET /robots.txt`, `/sitemap.xml`, `/llms.txt`, `/llms-full.txt` y `/.well-known/agent-readiness.json`: `200` con tipos de contenido esperados;
- `Accept: text/markdown` sobre `/`: `200 text/markdown`;
- `/favicon.ico`: redireccion temporal a `/favicon.svg`;
- auditoria publica propia: `95/100`, con pagos agenticos todavia no detectados;
- MCP remoto `https://mcp.agentfriendlyweb.dev/mcp`: protocolo `2026-07-28`, cuatro tools, cuatro resources y negativos fail-closed;
- Playwright en `1440x900` y `390x844`: sin overflow horizontal ni errores de consola;
- auditoria iniciada desde la interfaz: `95/100`, sin error visible.

## Limites conservados

- no hubo migracion D1 nueva ni mutacion de datos owner;
- no hubo cambios DNS, billing, credenciales, OAuth ni permisos;
- no se habilitaron A2A, pagos, x402 ni escrituras sobre sitios de clientes;
- el PR sintetico `agent-friendly-web-synthetic-origin#1` permanece Draft, abierto y sin merge;
- el puntaje 95/100 pertenece a la metodologia propia y no es una certificacion universal ni garantiza indexacion o recomendacion por terceros.

## Resultado

La Home Guided Journey v1 queda desplegada y verificada. La version Sites 29 permanece como rollback inmediato y la frontera de escritura remota continua cerrada.
