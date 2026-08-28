# Bloque 4C: candidato MCP publico read-only

**Fecha:** 2026-08-28  
**Estado:** candidato aprobado; promovido mediante el recibo `BLOCK-4C-MCP-RELEASE-2026-08-28.md`

**Baseline del Site estable:** version 20, commit `a7ff85a1dbdd74c2e3d8fab566abf6f5c4e441e8`

**Baseline de codigo con MCP:** `60ec5d810e5ebc877b63786582dfbc4e91e09423`

## Alcance

El candidato agrega un servidor MCP remoto, stateless y exclusivamente de lectura en `POST /mcp`. Prefiere MCP `2026-07-28` mediante Streamable HTTP y conserva compatibilidad stateless con clientes de la familia 2025. El runtime remoto validado es un Worker independiente de Cloudflare; el endpoint productivo propuesto es `https://mcp.agentfriendlyweb.dev/mcp`.

Tools exactas:

1. `audit_public_site`;
2. `get_afw_methodology`;
3. `get_public_registry_profile`;
4. `verify_public_okf_release`.

Resources exactos:

1. `afw://capabilities/v1`;
2. `afw://methodology/v1`;
3. `afw://okf/v0.2`;
4. `afw://readiness/v1`.

La superficie no requiere autenticacion porque solo entrega datos ya publicos. No consulta expedientes, borradores, owners ni datos privados de Tokenizart/Atelier. El Worker no tiene bindings D1, KV, R2, AI ni secretos.

## Controles aplicados

- `POST` y `application/json` obligatorios;
- cuerpo maximo de 32 KiB leido por streaming y cancelado al superar el limite;
- host y origin allowlisted para dominio canonico, entorno local y previews controladas;
- auditoria protegida contra SSRF mediante el auditor publico existente;
- salida de auditoria reconstruida por allowlist y sin cuerpos, headers, errores ni debug remoto;
- perfiles Registry reconstruidos por el contrato publico canonico antes de responder;
- release OKF limitada a `v0.2` y verificada en memoria;
- errores saneados, incluidos nombres de tools y URIs desconocidos;
- cero persistencia, credenciales, escritura, despliegue, DNS, billing o pagos.

## Revision independiente

La revision del diff completo detecto cinco riesgos: buffering no acotado, salida de auditoria demasiado amplia, perfil Registry sin reconstruccion estricta, cobertura insuficiente del protocolo moderno y reflexion de identificadores desconocidos. Los cinco quedaron resueltos en `c7f143b` con pruebas de regresion especificas. El PR #16 integro la funcionalidad y el PR #17 corrigio la carga del Registry en runtime productivo.

Las versiones Sites 22 y 23 no superaron el gate remoto: la primera no declaraba la capacidad reservada y la segunda confirmo que la cuenta propietaria no tiene habilitado Sites MCP. Ambas fueron rechazadas y la version 23 se revirtio a la version 20. El PR #18 conserva la declaracion para una futura habilitacion, pero no se usa como evidencia de despliegue.

## Evidencia local

- `npm test`: `168/168` pruebas aprobadas;
- `npm run lint`: aprobado;
- `npm run build`: aprobado con Vite `8.2.2`;
- `npm audit --omit=dev`: cero vulnerabilidades conocidas;
- cliente HTTP real local y en Cloudflare Worker staging: MCP `2026-07-28` y compatibilidad stateless 2025 aprobadas;
- cuatro tools listadas, cuatro resources listados, llamada y lectura verificadas;
- pruebas negativas: destino privado, slug/version invalidos, OKF no allowlisted, tool/resource desconocidos, `GET`, media type incorrecto, JSON malformado y cuerpo sobredimensionado;
- revision visual local de `/mcp-readonly`: escritorio `1440px` y movil `390px`, sin overflow ni errores de consola;
- Worker staging: `https://agent-friendly-web-public-mcp-staging.tokenizart-info.workers.dev/mcp`;
- version Worker staging: `a0a5c545-ca20-47ff-ba1b-22112716a140`;
- health, ruta inexistente y `GET /mcp` verificados con estados `200`, `404` y `405` respectivamente;
- log remoto inspeccionado: sin cuerpos, argumentos, resultados, secretos ni logging aplicativo; conserva metadata de transporte administrada por Cloudflare.

El entorno local usa Node `22.17.0`; algunas dependencias de desarrollo de Babel recomiendan `22.18.0` o superior. Las pruebas y el build finalizan correctamente y el arbol productivo no presenta vulnerabilidades conocidas.

## Estado de publicacion

El candidato supero PR, CI, despliegue productivo aislado y repeticion completa del cliente MCP remoto en el subdominio canonico y el fallback `workers.dev`. La evidencia final, identificadores y rollback quedan en el recibo de release; tarjetas, catalogos y UI se promueven de forma separada para conservar trazabilidad.

## Condiciones NO-GO

No se promueve si ocurre cualquiera de estas condiciones:

- CI, build, auditoria productiva o cliente MCP fallan;
- el catalogo difiere de las cuatro tools o cuatro resources aprobados;
- aparece acceso a expedientes, borradores, owner data o credenciales;
- una solicitud puede escribir, publicar, desplegar, cambiar DNS, cobrar o pagar;
- se refleja input sensible en errores;
- la version candidata modifica el trafico del sitio principal antes de la promocion;
- tarjetas, `llms.txt`, readiness y pagina humana no coinciden en endpoint, estado o limites.

## Fuera de alcance

A2A, WebMCP, plugins/apps, voz, correo, pagos, x402, expedientes privados, escritura remota y Owner Live de Tokenizart/Atelier conservan especificacion, autorizacion y gates separados.
