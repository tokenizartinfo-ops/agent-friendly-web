# Directorio privado de expedientes AFW — 2026-09-29

**Proyecto y repositorio:** Agent Friendly Web, `tokenizartinfo-ops/agent-friendly-web`. **Entorno objetivo:** `https://agentfriendlyweb.dev`, Worker `agent-friendly-web-web-production`. **Acción:** añadir navegación de lectura entre expedientes del mismo usuario autenticado. **Rollback:** volver a la versión productiva anterior; no alterar D1.

Crear un expediente separado para un sitio distinto solo ayuda si luego se puede volver a encontrar. El expediente muestra cuál está abierto y ofrece enlaces a los demás, con paginación de 20. Si la lista falla, el expediente actual permanece disponible y se puede reintentar. La navegación conserva la ruta del idioma y usa el aviso existente ante cambios del formulario sin guardar.

`GET /api/projects?list=1&offset=N` requiere Cloudflare Access, filtra en D1 por el identificador opaco del usuario validado por servidor y devuelve solo ID, nombre, sitio, estado, avance y fecha. No devuelve notas, contactos, verificaciones, conversaciones ni datos de otros propietarios. Rechaza desplazamientos inválidos y la combinación de listado con selección de un expediente. La lectura individual existente y el contrato de creación/guardado no cambian. No hay migración ni mutación automática.

**Criterio de cierre:** pruebas de aislamiento, proyección y paginación; suite completa, lint y build; artefacto productivo con bindings cerrados; smoke público/Access; lectura autenticada de la lista sin alterar expedientes.
