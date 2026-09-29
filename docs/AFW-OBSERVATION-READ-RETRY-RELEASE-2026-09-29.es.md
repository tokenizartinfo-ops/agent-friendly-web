# Reintento de consulta de observaciones guardadas — entrega del 2026-09-29

**Proyecto:** AFW. **Repositorio:** `tokenizartinfo-ops/agent-friendly-web`. **Origen y entorno:** producción `https://agentfriendlyweb.dev`. **Recurso:** Worker `agent-friendly-web-web-production`.

Si falla la lectura privada de observaciones guardadas, el expediente ofrece «Reintentar consulta guardada». Esa acción solo ejecuta un GET; no audita el sitio ni escribe D1. Si el guardado se confirmó pero falló la actualización del historial, el mensaje informa que la observación quedó guardada y que basta con repetir la consulta.

**Fuente y controles:** PR #82, commit integrado `3c3423e72aa99459f492abe6c64e7539a9088f12`. Pasaron 534 pruebas, lint (una advertencia previa sobre `<img>`), TypeScript, build y CI `36619611570`. Artefacto reconstruido desde ese commit. Configuración productiva congelada SHA-256 `0a7b1a9ce4be98ae9ddfd26bce7fc936fe480420c940e6c87b385f450e0e520c`, con D1 productiva, Access, cuota 5/60 y copilot deshabilitado con ID vacío. Dry-run aprobado, sin migraciones.

**Publicación:** versión `84f9c429-b030-4a0e-a7b4-5a47d21d7fa2`, primero al 0% y después al 100% el 2026-09-29T19:32:51Z. Smoke productivo 11/11: ocho rutas públicas 200 y tres privadas 302 bajo Access anónimo. **Rollback:** asignar 100% a `4c6948c1-e26d-4c72-a43c-5a036e9ab68f`; no restaurar ni borrar D1.

**Límite:** el smoke anónimo no verifica la interacción visual con una sesión privada autenticada. La recuperación GET sin auditoría ni escritura está cubierta por prueba funcional local.
