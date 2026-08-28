# Gate de release: Bloque 4B.1 guia conversacional publica

**Fecha:** 2026-08-28
**Origen:** `https://agentfriendlyweb.dev`
**Ruta:** `https://agentfriendlyweb.dev/guia`
**Commit funcional:** `beec479`
**PR funcional:** `#13`
**Merge funcional:** `0c537d805a903e4fd9c46794df1b5ca6d861ddbc`
**Commit de promocion:** `7caa982`
**PR de promocion:** `#14`
**SHA desplegado:** `a7ff85a1dbdd74c2e3d8fab566abf6f5c4e441e8`
**Sites candidato:** `19`
**Sites final:** `20`
**Rollback inmediato:** `Sites 19`
**Rollback anterior al bloque:** `Sites 18`
**Estado:** `deployed` y verificado en produccion

## Necesidad

Agent Friendly Web necesitaba una guia para que una persona no tecnica pudiera comprender el producto, elegir un siguiente paso y encontrar evidencia publica sin recorrer por su cuenta todos los documentos y contratos. La guia debia conservar el hilo inmediato y adaptar la profundidad sin inventar capacidades ni convertir una conversacion en una accion.

## Alcance desplegado

- motor determinista con catalogo publico allowlisted;
- respuestas simples, estandar y detalladas;
- continuidad inmediata para confirmaciones como `Si, dale`;
- aclaracion enfocada cuando no existe contexto suficiente;
- opciones clickeables y una sola linea de avance por respuesta;
- enlaces a fuentes publicas versionadas;
- envio con Enter y nueva linea con Shift+Enter;
- estado solo en memoria React, eliminado al recargar;
- contrato `agent-friendly-web.public-guide.v1` en `/.well-known/public-guide-contract.json`.

## Fronteras

La guia no usa un modelo externo, no guarda conversaciones, no consulta expedientes privados, no ejecuta auditorias ni la CLI, no envia correo, no procesa pagos y no modifica sitios. MCP, A2A, WebMCP, x402, voz, memoria consentida y transferencia al expediente mantienen gates separados.

Las preguntas educativas sobre credenciales son permitidas. Un mensaje que contiene un valor probable de API key, bearer token, private key o tarjeta se bloquea, se reemplaza por un aviso saneado y no se refleja en el DOM.

## Revision y pruebas

La revision independiente previa al PR detecto dos problemas P2 y ambos se corrigieron antes del merge:

1. el filtro confundia una mencion de `API key` o `contrasena` con una credencial real;
2. dos envios muy rapidos podian reutilizar identificadores React.

Se agregaron pruebas de regresion para separar preguntas educativas de valores secretos y para exigir un contador estable de mensajes.

- Suite completa: 146 pruebas aprobadas.
- Lint: aprobado.
- Build: aprobado.
- CI de PR #13 y PR #14: aprobado.
- `git diff --check`: aprobado.
- QA local y de produccion: escritorio y movil, sin overflow horizontal ni errores de consola.
- Interaccion verificada: Enter, Shift+Enter, continuidad, simplificacion, profundidad, scroll y bloqueo de secretos.
- Persistencia verificada: `localStorage` y `sessionStorage` vacios.
- Recursos verificados con HTTP 200: contrato, readiness, `llms.txt` y sitemap.

## Publicacion y rollback

Sites 19 publico el candidato con estado `prototype`. Sobre esa version se comprobo la ruta real, continuidad, fuentes, seguridad y ausencia de persistencia. El PR #14 promovio unicamente `public_guide` a `deployed`, mantuvo `intake_assistant` como `prototype` y actualizo el roadmap. Esa fuente exacta se publico como Sites 20.

Si aparece una regresion en conversacion, navegacion o seguridad, el rollback inmediato es Sites 19. Para retirar todo el bloque 4B.1 se conserva Sites 18. No hay migraciones D1, secretos, pagos ni datos persistentes que revertir.

## Siguiente gate

El Bloque 4B.1 queda cerrado. El siguiente bloque recomendado es 4C MCP read-only: primero contrato de tools y resources, threat model, limites de red, observabilidad y pruebas de cliente; despues un endpoint sin datos privados ni mutaciones. A2A, WebMCP, pagos y la capsula de publicacion permanecen fuera de ese gate.
