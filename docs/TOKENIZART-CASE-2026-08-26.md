# Caso Tokenizart - baseline publico 2026-08-26

## Objetivo

Usar Tokenizart como primer caso integral para demostrar una evolucion honesta: medir el estado publico, publicar contexto verificable y conectar gradualmente herramientas reales sin declarar capacidades antes de su disponibilidad.

## Observacion reproducible

En `https://tokenizart.com/` se observaron:

- `robots.txt`: disponible;
- `sitemap.xml`: disponible;
- `llms.txt`: no disponible;
- `llms-full.txt`: no disponible;
- `agent-badge.json`: no disponible y no se trata como estandar;
- `/.well-known/mcp.json`: no disponible;
- `/api/openapi.json`: no disponible;
- negociacion `Accept: text/markdown`: el origen continuo entregando HTML.

Atelier expone `robots.txt`, pero no `llms.txt` en el baseline observado.

## Activos existentes separados del sitio publico

El repositorio `tokenizart-agentic` contiene CLI read-only, contratos MCP, skills y exportaciones OKF en estado release candidate. Esos activos no deben puntuarse como endpoints productivos de `tokenizart.com` hasta que tengan publicacion, version y documentacion verificables.

Owner Live read-only pertenece a otra frontera: requiere identidad Atelier, consentimiento, scopes y auditoria. No forma parte del auditor publico ni debe exponerse por este sitio.

## Roadmap

1. Actualizar contenido publico, arquitectura, preguntas frecuentes y datos estructurados.
2. Publicar un `llms.txt` conciso que enlace fuentes vigentes, dejando claro su caracter de propuesta.
3. Publicar documentacion humana y legible por maquinas de las herramientas realmente disponibles.
4. Versionar y distribuir CLI/skills/MCP read-only con contratos y limites.
5. Incorporar acciones owner-scoped solo despues de los gates de identidad, consentimiento y auditoria.
6. Evaluar x402/MPP cuando exista un servicio transaccional definido; no usar pagos como sustituto de autorizacion.

## Filosofia aplicada

Tokenizart combina conocimiento e interoperabilidad abiertos con un nucleo de ejecucion propietario. La capa publica debe facilitar descubrimiento y composabilidad; Mint, Certify, NFC, vouchers, smart wallets y servicios customizados conservan reglas, marca, seguridad y monetizacion propias.

