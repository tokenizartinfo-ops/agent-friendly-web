# Block 4C - Gate del Worker MCP publico en Cloudflare

Fecha: 2026-08-28  
Estado: staging remoto verificado; produccion pendiente de PR y promocion

## Resultado del candidato Sites

El contrato MCP publico read-only paso pruebas unitarias, de protocolo y de cliente real en el runtime local productivo. La version 22 del Site fue revertida porque `/mcp` quedo interceptado por la plataforma. La version 23 agrego la capacidad `mcp` al manifiesto de hosting y se publico de forma candidata, pero el control de plataforma devolvio:

`Sites MCP is not enabled for this Site owner.`

El endpoint remoto continuo respondiendo `404`. La version 23 se rechazo y el sitio se revirtio inmediatamente a la version 20, que es el baseline publico estable.

## Decision tecnica

El servidor se desacopla en un Cloudflare Worker propio. Esta decision elimina la dependencia del feature flag de Sites y conserva el mismo repositorio, contratos, tests y proceso de release.

- Staging: Worker separado en `workers.dev`.
- Produccion candidata: `https://mcp.agentfriendlyweb.dev/mcp`.
- Sitio humano y documentos: `https://agentfriendlyweb.dev/`.
- Contrato: MCP 2026-07-28, con compatibilidad stateless 2025.
- Alcance: cuatro tools y cuatro resources publicos, read-only.
- Persistencia: no usa D1 ni otra base de datos.
- Secretos: no requiere ni almacena secretos.
- Registry: lee perfiles incorporados o el perfil ya publicado por el origen canonico; nunca consulta expedientes privados.

## Gates

1. Pruebas locales del Worker y `wrangler deploy --dry-run`.
2. Despliegue aislado a `workers.dev`.
3. Cliente MCP real: negociacion, listado, cuatro tools, cuatro resources y casos negativos.
4. Revision de logs sin datos sensibles.
5. PR y CI verdes.
6. Despliegue del subdominio como candidato.
7. Repeticion completa del cliente remoto.
8. Solo entonces actualizar tarjetas, catalogos y UI de `release_candidate` a `deployed`.

## Evidencia de staging

- URL: `https://agent-friendly-web-public-mcp-staging.tokenizart-info.workers.dev/mcp`.
- Version de Worker: `a0a5c545-ca20-47ff-ba1b-22112716a140`.
- MCP moderno negociado: `2026-07-28`.
- Compatibilidad stateless 2025: verificada.
- Tools: cuatro de cuatro.
- Resources: cuatro de cuatro.
- Casos positivos: metodologia, Registry Tokenizart, auditoria publica y OKF v0.2.
- Casos negativos: destino privado, slug/version invalidos, release no permitida, tool desconocida, GET, media type, JSON malformado y cuerpo mayor a 32 KiB.
- Logging aplicativo: ninguno.
- Telemetria de proveedor: Cloudflare conserva metadata HTTP y de red conforme a la configuracion de observabilidad; no se agregan cuerpos ni resultados MCP.

## Rollback

El Worker tiene versiones independientes y puede revertirse con Wrangler. El sitio principal permanece en la version 20 hasta que el servidor remoto independiente haya pasado todos los gates. La falla del Worker no debe afectar la home, el Registry, la auditoria web, la CLI ni OKF.
