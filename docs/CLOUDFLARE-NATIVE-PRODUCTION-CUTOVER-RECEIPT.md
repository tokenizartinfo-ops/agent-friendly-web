# Agent Friendly Web Cloudflare-native production cutover receipt

**Estado:** corte completado; monitoreo inicial verde
**Fecha:** 2026-09-02
**Proyecto:** `agent-friendly-web`
**Origen canonico:** `https://agentfriendlyweb.dev`

## Recursos activos

| Recurso | Identificador |
| --- | --- |
| Worker | `agent-friendly-web-web-production` |
| Deployment | `ce265b49-9f6c-4c0c-ab74-656ecb93f0ad` |
| Version | `2863d8b4-552b-419f-89bc-4c0f4363ce35` |
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
- bookmark D1 previo: `00000001-00000012-000050da-6071cbc8434461d6ffd3450a952af2e6`.

## Access

La aplicacion permite unicamente `tokenizart.info@gmail.com` y protege:

- todo `release.agentfriendlyweb.dev`;
- `agentfriendlyweb.dev/expediente*`;
- `agentfriendlyweb.dev/capsula/*`;
- `agentfriendlyweb.dev/api/projects/*`.

## DNS y rollback

Se retiraron exclusivamente los A apex de Sites:

- `04591fffee45db59433aa4af15c48485` -> `162.159.143.30`;
- `52f25c64e4973872c3191ed6d3958a5e` -> `172.66.3.26`.

Cloudflare creo el registro nativo AAAA `100::`, proxied, ID `6b861effbcadc374a0651168640160d3`. El binding Sites `appgdom_6a8f665d5bc881919ac5fbdd05f69cbd`, el proyecto `appgprj_6a8f19e35d688191a53e93432543e39c` y los TXT de validacion permanecen retenidos.

El rollback ensayado sobre `release` desasocio y reasocio correctamente el mismo dominio. Para rollback apex se elimina el Custom Domain y se recrean los dos A anteriores como DNS-only, TTL automatico.

## Pruebas

- 382 pruebas: OK;
- lint: 0 errores, 1 advertencia conocida de optimizacion de imagen;
- build Vinext: OK;
- dry-run productivo: OK;
- comparacion Sites/candidato: 0 fallas criticas;
- Access anonimo en release: 9 de 9 rutas interceptadas;
- HTML autenticado release: OK;
- responsive 1440x900 y 390x844: sin overflow, hero cargado e idiomas visibles;
- smoke publico final: 8 rutas publicas OK y `/expediente` interceptado por Access;
- D1 posterior: 0 filas y 0 escrituras.

El primer smoke inmediatamente posterior resolvio temporalmente el cache DNS de Sites. Una vez propagada la resolucion Cloudflare, el segundo smoke paso completo. No se ejecuto rollback porque no hubo falla del Worker ni del contrato publico.

## Capacidades no habilitadas

Contacto, email, CRM remoto, pagos, x402, A2A transaccional y toda dependencia runtime de Tokenizart permanecen deshabilitados.
