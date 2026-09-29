# Puntaje desconocido en el historial — entrega del 2026-09-29

**Proyecto:** AFW. **Repositorio:** `tokenizartinfo-ops/agent-friendly-web`. **Origen y entorno:** producción `https://agentfriendlyweb.dev`. **Recurso:** Worker `agent-friendly-web-web-production`.

La evolución de observaciones del expediente usa la misma etiqueta localizada que su tarjeta principal: un puntaje ausente o inválido se muestra como «Sin puntaje» y un cero real como `0/100`. Es una corrección de presentación; no recalcula datos ni escribe D1.

**Fuente y controles:** PR #84, commit integrado `67ce5e0f84f09651f6362a29a1475e566526e819`. Pasaron 535 pruebas, lint (una advertencia previa sobre `<img>`), TypeScript, build y CI `36621095846`. Artefacto reconstruido desde ese commit. Configuración productiva congelada SHA-256 `0a7b1a9ce4be98ae9ddfd26bce7fc936fe480420c940e6c87b385f450e0e520c`, con D1 productiva, Access, cuota 5/60 y copilot deshabilitado con ID vacío. Dry-run aprobado, sin migraciones.

**Publicación:** versión `9e4238f2-3af3-4bc7-a8a1-321b052bc414`, primero al 0% y después al 100% el 2026-09-29T19:45:23Z. Smoke productivo 11/11: ocho rutas públicas 200 y tres privadas 302 bajo Access anónimo. **Rollback:** asignar 100% a `84f9c429-b030-4a0e-a7b4-5a47d21d7fa2`; no restaurar ni borrar D1.

**Límite:** el smoke anónimo no verifica la vista del historial en una sesión privada autenticada. El cero real y el dato ausente o inválido están cubiertos por pruebas locales.
