# Bloque 1: evidencia de release

**Proyecto:** Agent Friendly Web

**Dominio canonico:** `https://agentfriendlyweb.dev`

**Alcance:** Registry declarativo, expediente ampliado, verificacion de dominio, observaciones privadas y caso Tokenizart.

## Gate local

| Control | Estado | Evidencia |
| --- | --- | --- |
| Tests unitarios y de contrato | aprobado: 75/75 | `npm test` el 2026-08-27 |
| ESLint | aprobado | `npm run lint` el 2026-08-27 |
| Build de produccion | aprobado | `npm run build` el 2026-08-27 |
| Migracion D1 aditiva | aprobada; el generador no creo una segunda migracion | `drizzle/0001_registry_block1.sql` |
| QA escritorio 1440x900 | aprobado | Registry y perfil Tokenizart sin superposiciones |
| QA movil 390x844 | aprobado | sin overflow horizontal |
| Lighthouse movil | aprobado | 100 accesibilidad, buenas practicas, SEO y agentic browsing; 48 checks aprobados, 0 fallos |
| JSON/Markdown | aprobado localmente | HTTP 200 y content types correctos |

## Gates de seguridad

- [x] Rutas privadas rechazan usuario no autenticado.
- [x] Otro usuario no puede inferir ni abrir el expediente.
- [x] Destinos privados, puertos alternativos y redirecciones fallan cerrados.
- [x] Challenge vencido, repetido, no coincidente o agotado no verifica.
- [x] Publicacion sin dominio vigente devuelve conflicto.
- [x] Publicacion sin confirmacion expresa se rechaza.
- [x] Eventos, observaciones, JSON y Markdown no contienen secretos ni campos privados.

Evidencia: pruebas unitarias y de contrato `block1-security-gates`, `domain-verification`, `domain-claim-routes`, `public-network`, `public-audit`, `schema` y `public-profile`. La comprobacion humana remota de aislamiento entre dos identidades queda dentro del smoke posterior al despliegue.

## Release remoto

Estos campos se completan solo despues de aplicar la migracion y desplegar la misma fuente validada.

| Dato | Valor |
| --- | --- |
| Commit validado | `1a57087a251ac89bc6b0a6990fe725c60e9a99bd` |
| Migracion incluida | `drizzle/0001_registry_block1.sql` |
| Version Sites anterior | 10 |
| Version Sites desplegada | 11 |
| Deployment ID | `appgdep_6a90520e42ac8191b5eaa84e46f7f603` |
| URL de produccion | `https://agentfriendlyweb.dev` |
| Fecha y hora del smoke | `2026-08-27T12:08:05-03:00` |
| Resultado | release publico aprobado; QA owner autenticado pendiente |

## Smoke post despliegue

- [x] `/`, `robots.txt`, `llms.txt`, `llms-full.txt`, `sitemap.xml` y `openapi.json` responden 200.
- [x] `/registry` y `/registry/tokenizart` responden 200.
- [x] `profile.json` usa `application/json` y `profile.md` usa `text/markdown`.
- [x] Los activos publicos usan `agentfriendlyweb.dev` como origen canonico.
- [x] `/expediente` devuelve 307 hacia `/signin-with-chatgpt` sin exponer contenido.

La comprobacion del expediente con un owner real no se marco como aprobada: el navegador aislado llego correctamente a `auth.openai.com`, pero no se introdujeron credenciales ni se automatizo el login. Debe completarse en una sesion humana antes de declarar cerrado todo el gate privado.

## Rollback

El rollback de aplicacion consiste en volver a desplegar la version Sites anterior. La migracion D1 no se revierte de forma destructiva: cualquier correccion de esquema se realiza mediante una migracion forward-only. Los perfiles publicados conservan historial y no deben eliminarse para simular una reversión.

## Limite de autorizacion

Completar este bloque no autoriza conectores mutantes, escritura en sitios de clientes, MCP transaccional, A2A operativo, pagos, CLI con escritura ni acciones Tokenizart/Atelier.
