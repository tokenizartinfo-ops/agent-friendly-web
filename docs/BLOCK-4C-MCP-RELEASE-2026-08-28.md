# Block 4C - Release MCP publico read-only v1

Fecha: 2026-08-28  
Estado: promocion documentada; redespliegue final desde el merge exacto pendiente de registrar

## Capacidad promovida

Agent Friendly Web publica un servidor MCP remoto, stateless y estrictamente read-only en:

`https://mcp.agentfriendlyweb.dev/mcp`

La superficie contiene exactamente cuatro tools y cuatro resources versionados. No usa OAuth porque solo consulta datos publicos. No usa D1, KV, R2, secretos, memoria conversacional ni bindings privados. No puede escribir en Registry, publicar, desplegar, cambiar DNS, cobrar, pagar ni acceder a expedientes u owner data.

## Procedencia

- Commit funcional desplegado y verificado antes de la promocion: `4b28c4d7d3e606b7cd8fe7689aea80f164b64f69`.
- PR funcional del Worker: `https://github.com/tokenizartinfo-ops/agent-friendly-web/pull/19`.
- Version Worker staging: `a0a5c545-ca20-47ff-ba1b-22112716a140`.
- Version Worker productiva candidata verificada: `76de5417-90b5-4a5c-8fa5-87414610afb6`.
- Fallback verificado: `https://agent-friendly-web-public-mcp.tokenizart-info.workers.dev/mcp`.

El commit de promocion, la version final del Worker y la version final del Site se agregan despues de sus respectivos merges y despliegues exactos.

## Pruebas cerradas antes de promocionar

- MCP moderno `2026-07-28` negociado con cliente remoto real.
- Compatibilidad stateless de la familia 2025 verificada.
- Cuatro tools listadas y llamadas con casos positivos.
- Cuatro resources listados y leidos.
- Casos negativos: destino privado, slug y version invalidos, OKF no allowlisted, tool desconocida, `GET`, media type incorrecto, JSON malformado y cuerpo mayor a 32 KiB.
- Health `200`, ruta inexistente `404` y `GET /mcp` `405`.
- Cliente completo aprobado tanto en el dominio canonico como en `workers.dev`.
- `168/168` pruebas, lint, build y dry-run aprobados antes del despliegue candidato.
- `npm audit --omit=dev`: cero vulnerabilidades conocidas en el arbol productivo.

## Separacion de superficies

El servidor MCP vive en un Worker independiente. El Site conserva la documentacion humana, tarjetas de descubrimiento, schema, catalogos y readiness. Esta separacion evita que una falla MCP afecte la home, el auditor, el Registry, la CLI o el bundle OKF.

Las capacidades A2A, WebMCP, plugins, voz, correo, x402, pagos, expedientes privados y escritura remota no forman parte de esta release.

## Rollback

1. Revertir el Worker a la version productiva anterior mediante el historial de versiones de Wrangler.
2. Revertir el Site a la version publica anterior mediante Sites.
3. Restaurar tarjetas y readiness a `release_candidate` si el endpoint deja de cumplir el contrato.
4. Repetir el cliente MCP remoto y conservar el servicio fuera de `deployed` hasta resolver la causa.

El rollback del Worker es independiente del sitio principal y no requiere modificar bases de datos porque esta release no usa D1 ni otra persistencia.
