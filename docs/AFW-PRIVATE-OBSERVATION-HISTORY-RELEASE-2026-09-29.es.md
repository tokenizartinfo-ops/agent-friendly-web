# Evolución de observaciones privadas — entrega del 2026-09-29

**Proyecto:** AFW. **Repositorio:** `tokenizartinfo-ops/agent-friendly-web`. **Entorno:** `https://agentfriendlyweb.dev`. **Worker:** `agent-friendly-web-web-production`. **Acción:** mostrar historia privada ya guardada, sin iniciar auditorías automáticas.

El expediente presenta hasta cinco observaciones fechadas del origen actual, con nivel y puntaje. Solo calcula la diferencia entre las dos últimas cuando ambas tienen el mismo origen, un puntaje válido y la misma metodología identificada. Si esos requisitos no se cumplen, explica que no hay comparación segura. La lista no entrega cuerpos HTTP, errores crudos, cabeceras ni evidencia detallada. Guardar otra observación sigue requiriendo una acción explícita del dueño; este bloque no ejecutó ninguna auditoría sobre sitios de clientes ni modificó D1.

**Fuente y validación:** PR #74, commit integrado `04b218829829ef85a193ec98cb48b8d24d4cad38`. Pasaron 526 pruebas, lint (una advertencia previa sobre `<img>`), TypeScript, build y CI `36609304396`. La versión se reconstruyó desde ese commit. La configuración productiva congelada SHA-256 `0a7b1a9ce4be98ae9ddfd26bce7fc936fe480420c940e6c87b385f450e0e520c` pasó dry-run con D1 productiva, Access y copilot deshabilitado con ID vacío. No hubo migraciones.

**Producción:** versión `8f6e1e89-0f79-4118-96cd-6fbc5fbf73ea`, primero 0% y luego 100% el 2026-09-29T18:07:20Z. El smoke público aprobó 11/11 rutas: ocho públicas 200 y tres privadas 302 bajo Access anónimo. **Rollback:** devolver el 100% a `2bff843c-ac54-47e0-89d0-7322d57e474e`; no restaurar ni borrar D1.

**Límite de la evidencia:** la pestaña Chrome autenticada no respondió a dos intentos de inspección por CDP. Este corte no confirma visualmente una cuenta privada ni una comparación con dos observaciones reales. Las reglas de aislamiento, reducción y comparabilidad se probaron en la suite; el recorrido privado base había sido verificado en el bloque anterior.
