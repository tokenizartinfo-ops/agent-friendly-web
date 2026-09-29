# Próximo paso proporcional del expediente — entrega del 2026-09-29

**Proyecto:** AFW. **Repositorio:** `tokenizartinfo-ops/agent-friendly-web`. **Origen y entorno:** producción `https://agentfriendlyweb.dev`. **Recurso:** Worker `agent-friendly-web-web-production`.

La orientación de una observación guardada prioriza guardar el borrador y aclarar el control técnico del sitio. Si la persona depende de un proveedor o carece de acceso, propone coordinar o pedir acceso acotado. Con control confirmado, enlaza a la revisión de archivos, destino y hashes de la cápsula; cuando los fundamentos observados están cubiertos, vuelve a los objetivos del negocio sin imponer MCP, pagos ni AF-5.

**Fuente y controles:** PR #88, commit integrado `92bbe626457f4bc494a095539c2526b3b45a06e5`. Pasaron 541 pruebas, lint (una advertencia previa sobre `<img>`), TypeScript, build y CI `36624821263`. Artefacto reconstruido desde ese commit. Configuración productiva congelada SHA-256 `0a7b1a9ce4be98ae9ddfd26bce7fc936fe480420c940e6c87b385f450e0e520c`, con D1 productiva, Access, cuota 5/60 y copilot inteligente deshabilitado con ID vacío. Dry-run aprobado, sin migraciones.

**Publicación:** versión `6cb4714e-c600-4190-81b2-1b78793ff125`, primero al 0% y después al 100% el 2026-09-29T20:21:03Z. Smoke productivo 11/11: ocho rutas públicas 200 y tres privadas 302 bajo Access anónimo. **Rollback:** asignar 100% a `8f36fb83-ebad-4b8a-a144-e13355014fb8`; no restaurar ni borrar D1.

**Límite:** el smoke anónimo no verifica el recorrido privado autenticado. La priorización contextual tiene pruebas locales. La [medición externa separada](AFW-EXTERNAL-AGENT-READINESS-INVENTORY-2026-09-29.es.md) no modifica el puntaje propio de AFW.
