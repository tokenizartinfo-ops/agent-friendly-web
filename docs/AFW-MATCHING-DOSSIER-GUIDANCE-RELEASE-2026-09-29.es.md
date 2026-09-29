# Expediente existente primero — entrega del 2026-09-29

**Proyecto:** Agent Friendly Web. **Repositorio:** `tokenizartinfo-ops/agent-friendly-web`. **Origen productivo:** `https://agentfriendlyweb.dev`. **Worker:** `agent-friendly-web-web-production`.

Cuando el alcance de un diagnóstico no corresponde al expediente abierto, la lista privada coloca primero los expedientes visibles del mismo origen y explica que se puede continuar en uno de ellos antes de crear otro. El orden relativo de los demás expedientes se conserva. Solo un clic del usuario traslada la referencia en la misma pestaña; el destino vuelve a exigir revisión antes de guardarla. No se crea un expediente ni se modifica D1 por esta mejora. La coincidencia se calcula con el origen validado del alcance, no con una semejanza textual de dominios. La priorización comprende las páginas ya cargadas del directorio, no afirma que se hayan buscado todos los expedientes posibles.

**Fuente y verificación:** PR #72, `main` `3b4b72756966408121a2702e6122afecafe37f39`; 523 pruebas, lint (una advertencia preexistente sobre `<img>`), build y CI `36605978648` aprobados. El artefacto se reconstruyó desde ese commit; conservó los manifiestos `.well-known`. La configuración congelada SHA-256 `0a7b1a9ce4be98ae9ddfd26bce7fc936fe480420c940e6c87b385f450e0e520c` confirmó D1 productiva, Access, cuota 5/60 y copilot deshabilitado con ID vacío en dry-run. Sin migraciones.

**Publicación:** versión `2bff843c-ac54-47e0-89d0-7322d57e474e` cargada primero al 0% y luego al 100% el 2026-09-29T17:39:46Z. El smoke productivo pasó 11/11: ocho rutas públicas 200 y tres privadas 302 bajo Access anónimo. **Rollback:** asignar 100% a la versión anterior `baa5d209-b575-4295-b9d0-c710bb25fc66`; no restaurar ni borrar D1.

**Pendiente de evidencia:** este corte no repitió el recorrido privado en navegador autenticado; el flujo base de traslado, revisión y guardado se verificó en el bloque anterior con un expediente QA de `example.com`.
