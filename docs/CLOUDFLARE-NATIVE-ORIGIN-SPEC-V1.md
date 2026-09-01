# Agent Friendly Web Cloudflare-native origin v1

**Estado:** candidato local implementado y verificado; canary remoto y trafico pendientes
**Fecha:** 2026-09-01
**Owner:** Gabriel Mucchiut
**Repositorio:** `tokenizartinfo-ops/agent-friendly-web`

## Decision

Agent Friendly Web deja de usar `*.chatgpt.site` como produccion, staging, preview, autenticacion o rollback. El unico origen publico canonico es `https://agentfriendlyweb.dev`.

La migracion no altera Tokenizart. Tokenizart sigue siendo el primer caso integral documentado, pero sus repositorios, Workers, D1, Access, Companion, Copilot, Atelier, Owner Live y RAG quedan fuera de esta arquitectura.

## Estado de partida

- `agentfriendlyweb.dev` responde publicamente bajo dominio propio, pero el runtime actual todavia es Sites.
- La aplicacion ya usa Next 16, Vinext, Vite y bindings `cloudflare:workers`.
- `npx vinext check` informa 96% de compatibilidad: cero incompatibilidades y una advertencia parcial por `next/font/google`.
- La suite baseline del repositorio pasa antes de la migracion.
- Las rutas privadas del origen legado usan identidad Sites; el candidato ya las reemplaza por Cloudflare Access verificado.
- El Worker de contacto aislado esta deshabilitado y su D1 permanece vacia.

## Arquitectura objetivo

### Origen publico

Un Worker full-stack Vinext sirve HTML, assets, rutas de API y recursos machine-readable desde `agentfriendlyweb.dev`. D1 se vincula por configuracion Wrangler propia del repositorio.

### Identidad privada

Cloudflare Access protege las rutas privadas. La aplicacion valida el JWT de Access y deriva un actor estable de `sub`, `email`, issuer y audience. El cliente no puede declarar su propio actor.

Rutas privadas iniciales:

- `/expediente`;
- `/capsula/*`;
- `/contacto-interno`, cuando exista;
- `/api/projects/*`;
- cualquier futura API mutante o con datos owner.

### Entornos

| Identificador | Host | Uso | Trafico |
| --- | --- | --- | --- |
| `afw_local` | `127.0.0.1` | desarrollo y pruebas | local |
| `afw_ci` | ninguno | build, tests y dry-run | ninguno |
| `afw_canary` | `canary.agentfriendlyweb.dev` | paridad remota excepcional, detras de Access | allowlist |
| `afw_public` | `agentfriendlyweb.dev` | origen canonico | publico |

No existe un entorno llamado solamente `staging`. No se usa ningun hostname `tokenizart.chatgpt.site`.

### Datos

Se crea una D1 propia para canary y otra para produccion. Como no hay usuarios reales en el origen legado, la migracion parte de esquema limpio y conserva solo fixtures y perfiles publicos versionados desde Git. Antes del corte se vuelve a comprobar que no existan datos reales en la D1 legado.

### Contacto

El formulario y su API deben ser same-origin. El Worker de contacto separado permanece OFF durante la migracion y luego se retira o se convierte en service binding interno; no conserva una UI en otro origen.

## Reglas de corte

1. El sitio publico vigente no se modifica durante el desarrollo.
2. La nueva configuracion debe construir y ejecutar localmente sin `@openai/sites-vite-plugin`.
3. La suite completa, lint, build y dry-run Wrangler deben pasar.
4. Las rutas publicas deben mantener contenido, MIME, idiomas, sitemap, `robots.txt`, `llms.txt`, OKF, WebMCP y MCP externo.
5. Las rutas privadas deben fallar cerradas sin Access y aislar datos por actor verificado.
6. Canary requiere hostname propio, Access, D1 aislada y cero trafico publico.
7. El corte de `agentfriendlyweb.dev` exige comparacion automatizada de origen, smoke humano y rollback probado.
8. Solo despues del corte se elimina el binding publico de Sites y se archivan sus proyectos.

## Rollback

Antes del corte se conserva el identificador del binding custom-domain vigente y la configuracion DNS observada. Si falla el Worker nuevo, se restaura temporalmente ese binding sobre `agentfriendlyweb.dev`, sin usar ni publicar un hostname `*.chatgpt.site` y sin revertir migraciones D1 destructivamente. Las correcciones de esquema son forward-only.

## Evidencia historica

Los documentos que mencionan versiones Sites se conservan como recibos inmutables. No autorizan nuevos despliegues ni convierten Sites en un entorno vigente.

## Fuera de alcance v1

- acciones en Tokenizart o Atelier;
- Owner Live;
- pagos x402;
- cambios de scoring AF-0 a AF-5;
- apertura de escrituras de contacto;
- migracion de datos owner no verificados;
- eliminacion inmediata de proyectos remotos antes de verificar el nuevo origen.
