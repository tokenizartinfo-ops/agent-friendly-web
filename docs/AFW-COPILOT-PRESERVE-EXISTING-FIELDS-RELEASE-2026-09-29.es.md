# AFW: propuestas del copilot sin reemplazo preseleccionado — 2026-09-29

**Proyecto y recurso:** Agent Friendly Web, `https://agentfriendlyweb.dev`, Worker `agent-friendly-web-web-production`. En el piloto con expediente sintético, el copilot había marcado por defecto una propuesta de organización distinta del nombre que ya constaba en el formulario. La revisión seguía siendo necesaria, pero ese valor aparecía seleccionado sin una decisión específica de reemplazarlo.

PR #92, commit `27e556a724c05ea74525f6229dde76615350a620`, cambia la selección inicial: solo quedan marcadas las propuestas para campos vacíos. Los campos que ya tienen datos permanecen desmarcados y la interfaz explica que la persona debe seleccionarlos y revisar la diferencia si quiere reemplazarlos. Ninguna propuesta se guarda ni publica automáticamente.

Pasaron 544 pruebas, lint sin errores (una advertencia previa sobre `<img>`), build y CI `36636884271`. El artefacto se reconstruyó desde el commit integrado. La configuración productiva piloto, ignorada por Git, mantuvo el mismo SHA-256 `5f2492cf6fe945b2f80a0caf0ced7aa32669ac1d9f67d15fdcb129145193160e`: D1 productiva, Cloudflare Access, Workers AI, cuota 5/60 y compuerta de un solo expediente sintético. No hubo migraciones.

La versión `b45d9bc2-1e30-46ed-92f4-28ae370044ec` se asignó primero al 0 % y luego al 100 %. El smoke anónimo posterior pasó 11/11 rutas (ocho públicas 200, tres privadas 302 bajo Access). **Rollback:** asignar 100 % a `4f5d5895-4514-4f2b-97d2-dac2870c9bfc`; si hay que cerrar por completo el piloto, usar la versión cerrada `377e6c7a-a783-478b-86ef-e7290d15b97e`. No tocar D1.

La verificación visual autenticada de este cambio quedó pendiente porque la pestaña de Chrome dejó de responder al control del navegador. Las pruebas verifican la selección por defecto y el cableado de la interfaz; el smoke anónimo no sustituye la prueba privada. El permiso de procesamiento del expediente sintético permanecía revocado tras la prueba anterior y este despliegue no modifica eventos de consentimiento.
