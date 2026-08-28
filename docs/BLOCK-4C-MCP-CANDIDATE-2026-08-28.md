# Bloque 4C: candidato MCP publico read-only

**Fecha:** 2026-08-28  
**Estado:** candidato local listo para CI; no desplegado ni contabilizado como capacidad productiva  
**Commit fuente revisado:** `c7f143bbec4df6731e746cb5429ec773b3f62846`

## Alcance

El candidato agrega un servidor MCP remoto, stateless y exclusivamente de lectura en `POST /mcp`. Prefiere MCP `2026-07-28` mediante Streamable HTTP y conserva compatibilidad stateless con clientes de la familia 2025.

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

La superficie no requiere autenticacion porque solo entrega datos ya publicos. No consulta expedientes, borradores, owners ni datos de Tokenizart/Atelier.

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

La revision del diff completo detecto cinco riesgos: buffering no acotado, salida de auditoria demasiado amplia, perfil Registry sin reconstruccion estricta, cobertura insuficiente del protocolo moderno y reflexion de identificadores desconocidos. Los cinco quedaron resueltos en `c7f143b` con pruebas de regresion especificas.

## Evidencia local

- `npm test`: `166/166` pruebas aprobadas;
- `npm run lint`: aprobado;
- `npm run build`: aprobado con Vite `8.2.2`;
- `npm audit --omit=dev`: cero vulnerabilidades conocidas;
- cliente HTTP real: MCP `2026-07-28` y compatibilidad stateless 2025 aprobadas;
- cuatro tools listadas, cuatro resources listados, llamada y lectura verificadas;
- pruebas negativas: destino privado, slug/version invalidos, OKF no allowlisted, tool/resource desconocidos, `GET`, media type incorrecto, JSON malformado y cuerpo sobredimensionado;
- revision visual local de `/mcp-readonly`: escritorio `1440px` y movil `390px`, sin overflow ni errores de consola.

El entorno local usa Node `22.17.0`; algunas dependencias de desarrollo de Babel recomiendan `22.18.0` o superior. Las pruebas y el build finalizan correctamente y el arbol productivo no presenta vulnerabilidades conocidas.

## Estado de publicacion

Todavia no existe una version candidata remota asociada a este comprobante y el dominio canonico conserva la version productiva anterior. El siguiente gate es: PR verde, merge, paquete del commit exacto, version Sites sin promocion y repeticion de `npm run smoke:mcp -- <preview>/mcp`.

## Condiciones NO-GO

No se promueve si ocurre cualquiera de estas condiciones:

- CI, build, auditoria productiva o cliente MCP fallan;
- el catalogo difiere de las cuatro tools o cuatro resources aprobados;
- aparece acceso a expedientes, borradores, owner data o credenciales;
- una solicitud puede escribir, publicar, desplegar, cambiar DNS, cobrar o pagar;
- se refleja input sensible en errores;
- la version candidata modifica el trafico del dominio canonico antes de la promocion;
- tarjetas, `llms.txt`, readiness y pagina humana no coinciden en endpoint, estado o limites.

## Fuera de alcance

A2A, WebMCP, plugins/apps, voz, correo, pagos, x402, expedientes privados, escritura remota y Owner Live de Tokenizart/Atelier conservan especificacion, autorizacion y gates separados.
