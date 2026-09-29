# Observaciones ligadas al origen actual — entrega del 2026-09-29

**Proyecto:** AFW. **Repositorio:** `tokenizartinfo-ops/agent-friendly-web`. **Origen y entorno:** producción `https://agentfriendlyweb.dev`. **Recurso:** Worker `agent-friendly-web-web-production`.

Al cambiar el sitio guardado de un expediente, la interfaz vuelve a consultar observaciones. Mientras llega la respuesta, el puntaje y el historial del origen anterior quedan ocultos mediante una comparación local del origen completo, incluido esquema y puerto. La acción de auditar exige que el origen del borrador coincida con el origen guardado; no basta que coincida el hostname. Las observaciones anteriores permanecen privadas y no se borran ni se atribuyen al nuevo sitio.

**Fuente y controles:** PR #78, commit integrado `657b261d88f3456cd5732d353518ec315ea2d37e`. Pasaron 531 pruebas, lint (una advertencia preexistente sobre `<img>`), TypeScript, build y CI `36616870267`. El artefacto se reconstruyó desde el commit integrado. Configuración productiva congelada SHA-256 `0a7b1a9ce4be98ae9ddfd26bce7fc936fe480420c940e6c87b385f450e0e520c`: D1 productiva, Access, cuota 5/60 y copilot deshabilitado con ID vacío. Dry-run aprobado, sin migraciones.

**Publicación:** versión `05f25f0c-6be5-4e07-ac90-b880c7c71689`, primero al 0% y luego al 100% el 2026-09-29T19:10:27Z. Smoke productivo 11/11: ocho rutas públicas 200 y tres privadas 302 bajo Access anónimo. **Rollback:** asignar 100% a `00f7227d-e14e-4430-b6f9-cfa54e74114a`; no restaurar ni borrar D1.

**Límite:** el smoke anónimo no demuestra visualmente un cambio de sitio en una sesión autenticada. La transición de origen y el bloqueo de un borrador no guardado se verificaron con pruebas locales; no se cambió el sitio de ningún expediente real para ensayar el caso.
