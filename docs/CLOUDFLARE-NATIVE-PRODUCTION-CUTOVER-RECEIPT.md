# Agent Friendly Web Cloudflare-native production cutover receipt

**Estado:** corte completado; correcciones de revision desplegadas y verdes
**Fecha:** 2026-09-02
**Proyecto:** `agent-friendly-web`
**Origen canonico:** `https://agentfriendlyweb.dev`

## Recursos activos

| Recurso | Identificador |
| --- | --- |
| Worker | `agent-friendly-web-web-production` |
| Deployment | `6ebb4aeb-e556-4a85-bfbc-2d0725eab614` |
| Version | `dc7531c7-5f1e-4e7c-9774-2a6acf131f44` |
| Version anterior para rollback | `1969053f-ba2e-4cca-bd93-06741fe23f33` |
| D1 | `d26fc9d2-df5a-4957-8e58-cc4c945faad8` |
| Access app | `b7d7d62e-de25-4b4b-ac52-972b104738a1` |
| Release domain | `5a87a3ab6973b11aad5bd2acccf78bdd35e4b189` |
| Apex domain | `57a78f718d4dabc302bbcd2c17dbdc8e8882b8d3` |

El Worker mantiene `workers_dev=false`, `preview_urls=false`, diagnostico canary OFF y mutaciones remotas AFW OFF.

## Base de datos

- seis migraciones aplicadas;
- trece tablas funcionales;
- cero filas funcionales antes y despues del corte;
- cero escrituras durante verificacion;
- `_cf_KV` y `d1_migrations` se identificaron como tablas de infraestructura y se excluyeron del conteo funcional;
- bookmark D1 previo: `00000001-00000012-000050da-6071cbc8434461d6ffd3450a952af2e6`.

## Access

La aplicacion permite unicamente `tokenizart.info@gmail.com` y protege:

- todo `release.agentfriendlyweb.dev`;
- `agentfriendlyweb.dev/expediente*`;
- `agentfriendlyweb.dev/capsula/*`;
- `agentfriendlyweb.dev/api/projects`;
- `agentfriendlyweb.dev/api/projects/*`.

## DNS y rollback

Se retiraron exclusivamente los A apex de Sites:

- `04591fffee45db59433aa4af15c48485` -> `162.159.143.30`;
- `52f25c64e4973872c3191ed6d3958a5e` -> `172.66.3.26`.

Cloudflare creo el registro nativo AAAA `100::`, proxied, ID `6b861effbcadc374a0651168640160d3`. El binding Sites `appgdom_6a8f665d5bc881919ac5fbdd05f69cbd`, el proyecto `appgprj_6a8f19e35d688191a53e93432543e39c` y los TXT de validacion permanecen retenidos.

El rollback ensayado sobre `release` desasocio y reasocio correctamente el mismo dominio. Para rollback apex se elimina el Custom Domain y se recrean los dos A anteriores como DNS-only, TTL automatico.

## Pruebas

- 388 pruebas: OK;
- lint: 0 errores, 1 advertencia conocida de optimizacion de imagen;
- build Vinext: OK;
- dry-run productivo: OK;
- comparacion semantica local Sites/misma compilacion candidata: 0 fallas criticas;
- release remoto: Access anonimo y HTML autenticado verificados por separado;
- Access anonimo en release: 9 de 9 rutas interceptadas;
- HTML autenticado release: OK;
- responsive 1440x900 y 390x844: sin overflow, hero cargado e idiomas visibles;
- smoke publico final: 8 rutas publicas OK y `/expediente`, `/api/projects` y `/api/projects/probe` interceptados por Access;
- D1 posterior: 0 filas y 0 escrituras.

## Auditoria externa posterior

Cloudflare `Is Your Site Agent-Ready?` audito el origen canonico el 2026-09-02T04:20:39.198Z y lo clasifico como **nivel 4, Agent-Integrated**.

Pasaron robots, sitemap, Link headers, negociacion Markdown, reglas de crawlers, Content Signals, API Catalog, MCP Server Card, Agent Skills, WebMCP y ARD. Para nivel 5 la auditoria exige `auth.md` y una A2A Agent Card. Tambien permanecen pendientes DNS-AID, OAuth/OIDC discovery y OAuth Protected Resource Metadata. Los controles x402, MPP, UCP, ACP y AP2 quedaron neutrales porque la superficie no se declara todavia como comercio agentico.

La clasificacion pertenece a la metodologia externa observada en esa fecha; no sustituye el modelo AF-0 a AF-5 propio ni autoriza publicar protocolos sin una implementacion real.

El primer smoke inmediatamente posterior resolvio temporalmente el cache DNS de Sites. Una vez propagada la resolucion Cloudflare, el segundo smoke paso completo. No se ejecuto rollback porque no hubo falla del Worker ni del contrato publico.

## Capacidades no habilitadas

Contacto, email, CRM remoto, pagos, x402, A2A transaccional y toda dependencia runtime de Tokenizart permanecen deshabilitados.
