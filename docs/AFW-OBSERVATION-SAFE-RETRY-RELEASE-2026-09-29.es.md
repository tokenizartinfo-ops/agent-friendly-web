# Reintento seguro de observaciones — entrega del 2026-09-29

**Proyecto:** AFW. **Repositorio:** `tokenizartinfo-ops/agent-friendly-web`. **Entorno y origen:** producción `https://agentfriendlyweb.dev`. **Recurso:** Worker `agent-friendly-web-web-production`.

Una auditoría privada que pierde su respuesta conserva la clave del intento en la pestaña. Al reintentar, el servidor confirma identidad y expediente y recupera una observación ya guardada antes de volver a leer el sitio. Los IDs de observación y evento quedan ligados de manera determinista al usuario, expediente y clave; una carrera de reintentos no persiste una segunda observación con esa solicitud. Tras una confirmación, otro clic inicia una auditoría nueva. El mensaje de la interfaz explica la recuperación. No se amplían permisos ni se crea una auditoría automática.

**Fuente y controles:** PR #76, `main` `65dfe1b87b1618a02dbb6180abe76b1ecfaafc55`. Pasaron 529 pruebas, lint (una advertencia preexistente sobre `<img>`), TypeScript, build y CI `36615319122`. El artefacto se reconstruyó desde ese commit y retuvo los manifiestos `.well-known`. La configuración productiva congelada SHA-256 `0a7b1a9ce4be98ae9ddfd26bce7fc936fe480420c940e6c87b385f450e0e520c` pasó dry-run con D1, Access, cuota 5/60 y copilot deshabilitado con ID vacío. No hubo migraciones.

**Publicación:** versión `00f7227d-e14e-4430-b6f9-cfa54e74114a`, cargada al 0% y promovida al 100% el 2026-09-29T18:58:21Z. Smoke productivo 11/11: ocho rutas públicas 200 y tres privadas 302 bajo Access anónimo. **Rollback:** asignar 100% a `8f6e1e89-0f79-4118-96cd-6fbc5fbf73ea`, sin restaurar ni borrar D1.

**Límite:** no se guardó una nueva observación privada en producción para provocar una pérdida de respuesta real. Las pruebas verifican la identidad del intento, su recuperación y el contrato del endpoint; el smoke anónimo no demuestra el recorrido autenticado.
