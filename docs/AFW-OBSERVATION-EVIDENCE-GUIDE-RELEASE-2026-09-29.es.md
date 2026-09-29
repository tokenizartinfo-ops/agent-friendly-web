# Evidencia y orientación en el expediente — entrega del 2026-09-29

**Proyecto:** AFW. **Repositorio:** `tokenizartinfo-ops/agent-friendly-web`. **Origen y entorno:** producción `https://agentfriendlyweb.dev`. **Recurso:** Worker `agent-friendly-web-web-production`.

El dueño del expediente recupera señales booleanas previamente saneadas junto con su última observación. La interfaz explica qué se detectó y qué fundamento conviene revisar. Una observación antigua sin señales muestra su límite; no se inventa evidencia. La orientación no modifica puntaje, archivos ni permiso de publicación. El recorrido completo y sus siguientes bloques se describen en `docs/AFW-COPILOT-CONTINUOUS-JOURNEY-2026-09-29.es.md`.

**Fuente y controles:** PR #86, commit integrado `1a6e4527d5ef65398200f99b2760f6e5876463f5`. Pasaron 537 pruebas, lint (una advertencia previa sobre `<img>`), TypeScript, build y CI `36623160064`. Artefacto reconstruido desde ese commit. Configuración productiva congelada SHA-256 `0a7b1a9ce4be98ae9ddfd26bce7fc936fe480420c940e6c87b385f450e0e520c`, con D1 productiva, Access, cuota 5/60 y copilot inteligente deshabilitado con ID vacío. Dry-run aprobado, sin migraciones.

**Publicación:** versión `8f36fb83-ebad-4b8a-a144-e13355014fb8`, primero al 0% y después al 100% el 2026-09-29T20:03:27Z. Smoke productivo 11/11: ocho rutas públicas 200 y tres privadas 302 bajo Access anónimo. **Rollback:** asignar 100% a `9e4238f2-3af3-4bc7-a8a1-321b052bc414`; no restaurar ni borrar D1.

**Límite:** el smoke anónimo no verifica el panel privado en una sesión autenticada real; las señales saneadas y el cableado del expediente tienen pruebas locales.
