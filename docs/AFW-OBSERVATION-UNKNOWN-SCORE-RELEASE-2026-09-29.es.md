# Puntaje desconocido no equivale a cero — entrega del 2026-09-29

**Proyecto:** AFW. **Repositorio:** `tokenizartinfo-ops/agent-friendly-web`. **Origen y entorno:** producción `https://agentfriendlyweb.dev`. **Recurso:** Worker `agent-friendly-web-web-production`.

Si una observación histórica no trae un puntaje entero válido de 0 a 100, el expediente indica «Sin puntaje» (o su traducción). Un cero real permanece `0/100`. El cambio es de presentación: no recalcula puntuaciones, no modifica metodología ni escribe D1.

**Fuente y controles:** PR #80, commit integrado `9d5e100e1b0c86d139b69d099ccbb1b15c27685c`. Pasaron 532 pruebas, lint (una advertencia previa sobre `<img>`), TypeScript, build y CI `36618051793`. Artefacto reconstruido desde ese commit. Configuración productiva congelada SHA-256 `0a7b1a9ce4be98ae9ddfd26bce7fc936fe480420c940e6c87b385f450e0e520c`, con D1 productiva, Access, cuota 5/60 y copilot deshabilitado con ID vacío. Dry-run aprobado, sin migraciones.

**Publicación:** versión `4c6948c1-e26d-4c72-a43c-5a036e9ab68f`, primero al 0% y después al 100% el 2026-09-29T19:20:26Z. Smoke productivo 11/11: ocho rutas públicas 200 y tres privadas 302 bajo Access anónimo. **Rollback:** asignar 100% a `05f25f0c-6be5-4e07-ac90-b880c7c71689`; no restaurar ni borrar D1.

**Límite:** el smoke anónimo no verifica la etiqueta en una sesión privada con una observación antigua incompleta; el caso de cero real, ausencia y valor inválido está cubierto por pruebas locales.
