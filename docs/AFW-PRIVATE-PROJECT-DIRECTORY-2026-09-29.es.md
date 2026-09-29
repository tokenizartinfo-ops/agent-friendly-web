# Directorio privado de expedientes AFW — 2026-09-29

**Proyecto y repositorio:** Agent Friendly Web, `tokenizartinfo-ops/agent-friendly-web`. **Entorno objetivo:** `https://agentfriendlyweb.dev`, Worker `agent-friendly-web-web-production`. **Acción:** añadir navegación de lectura entre expedientes del mismo usuario autenticado. **Rollback:** volver a la versión productiva anterior; no alterar D1.

Crear un expediente separado para un sitio distinto solo ayuda si luego se puede volver a encontrar. El expediente muestra cuál está abierto y ofrece enlaces a los demás, con paginación de 20. Si la lista falla, el expediente actual permanece disponible y se puede reintentar. La navegación conserva la ruta del idioma y usa el aviso existente ante cambios del formulario sin guardar.

`GET /api/projects?list=1&offset=N` requiere Cloudflare Access, filtra en D1 por el identificador opaco del usuario validado por servidor y devuelve solo ID, nombre, sitio, estado, avance y fecha. No devuelve notas, contactos, verificaciones, conversaciones ni datos de otros propietarios. Rechaza desplazamientos inválidos y la combinación de listado con selección de un expediente. La lectura individual existente y el contrato de creación/guardado no cambian. No hay migración ni mutación automática.

**Criterio de cierre:** pruebas de aislamiento, proyección y paginación; suite completa, lint y build; artefacto productivo con bindings cerrados; smoke público/Access; lectura autenticada de la lista sin alterar expedientes.

## Release verificado

La PR #68 se integró en `main` en `be5ffb12e0049d9ca0ca763906db2c5ba1df4f98`. Pasaron las tres pruebas focalizadas, la suite completa de 521 pruebas, TypeScript, lint y build; el CI de `main` `36601395026` conservó el artefacto exacto. El artefacto incluye los manifiestos de `.well-known`. El dry-run confirmó configuración productiva SHA-256 `0a7b1a9ce4be98ae9ddfd26bce7fc936fe480420c940e6c87b385f450e0e520c`, D1 `d26fc9d2-df5a-4957-8e58-cc4c945faad8`, audiencia Access productiva y copilot cerrado. No hubo migraciones.

La versión `427a6378-a2f2-4ca7-bcec-c49fb9dbb4fe` se cargó al 0% y luego al 100% el 2026-09-29T16:59:26Z. El smoke anónimo pasó 11/11: ocho rutas públicas 200, incluidos readiness e infraestructura, y tres rutas privadas 302 de Access. En la sesión autenticada de Gabriel la lista mostró dos expedientes propios, marcó el abierto, permitió entrar al otro por su ID y volver al original. No se editó ni guardó ninguno. **Rollback:** volver el 100% a `a2bb6eb5-85b0-4f34-91f5-85f48658c9cf`, sin restaurar ni borrar D1.
