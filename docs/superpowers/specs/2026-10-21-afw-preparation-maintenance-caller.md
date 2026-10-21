# AFW — llamador administrativo de mantenimiento privado
21oct2026. Extensión PB6/PB7; PB9 calificó recuperación cerrada. Proyecto AFW exclusivamente.

## Intención y alcance
Gabriel autorizó encadenar bloques AFW cloud, reducir recursos locales y separar leer, preparar, aprobar y publicar. Se necesita invocar la RPC privada register/reconcile desde una autoridad concreta, sin abrir HTTP ni copiar credenciales. Éxito de esta rama: fuente y CI nativa de un Workflow administrativo acotado; hosting, permiso al binding y uso real son aceptación separada.
Alternativas evaluadas: endpoint HTTP de operador exige identidad/CSRF/custodia nuevos; caller temporal de usuario depende del PC; Workflow administrativo usa la autorización ya custodiada de la API Cloudflare y no expone un endpoint. Se elige Workflow separado. Esto NO crea un gerente, suscripción o guardia.

## Contrato
Nuevo Worker fuente worker/preparation-maintenance-caller/index.mjs: fetch siempre404/no-store, exporta solo AfwPreparationClientMaintenanceWorkflow extends WorkflowEntrypoint. No WorkerEntrypoint RPC de operador. run delega en runPreparationMaintenanceCaller(env,event,step) interno.
Target fijo agent-friendly-web-preparation-maintenance; binding PREPARATION_MAINTENANCE. Workflow esperado afw-preparation-client-maintenance. Un binding de la misma cuenta no acredita autorización: antes de alojar/habilitar deberán comprobarse caller, callee, clase, binding, fuente, recurso y alcance concretos por API. No inventario global/exclusividad de todos los administradores.
Flag AFW_PREPARATION_MAINTENANCE_CALLER_ENABLED debe ser literal true. Disabled devuelve blocked sin inspeccionar policy o servicio.
AFW_PREPARATION_MAINTENANCE_CALLER_POLICY: JSON UTF8<=2048 bytes, solo siete claves obligatorias: method(register|reconcile),operationId,issuer,resource,redirectUri,startedAt,expiresAt. Fechas ISOUTC con milisegundos, ventana original<=600000ms, mismo policy original PB6. Issuer HTTPS origin exacto, resource issuer+/mcp, callback exacto chatgpt.com HTTPS sin query/fragment/credenciales/puerto y ruta stable o callback específica permitida por PB6. Sintaxis no prueba propiedad del callback.
operationId regex PB6. Cliente esperado AFW preparation +operationId.
planHash SHA256 JSON([afw.preparation.client-caller.v1,target,method,operationId,issuer,resource,redirectUri,startedAt,expiresAt]).
Solo event.workflowName exacto y event.instanceId afw-prep-+planHash; schedule debe faltar. payload debe ser objeto de datos con únicamente planHash. Ningún método, identidad, callback, fechas o configuración del payload gobierna la operación.

## Ejecución y errores
Una step.do llamada preparation-client-register o preparation-client-reconcile; retries.limit0, delay1000, backoffconstant, timeout hasta5000ms y nunca mayor que ventana restante. Una llamada RPC sin argumentos al método seleccionado en servidor; no fallback, bucle, sleep, cron ni fetch saliente.
Relojes nativos wall y monotonic, sin regresión; límite total original5s y ventana original. Snapshot de flag, policy y binding, más handle de método capturado una sola vez (los handlesRPC nativos son nuevos en cada lectura; descriptores propios JS se comprueban sin ejecutar getters), comprobado antes/después de awaits. Helpers de prueba pueden inyectar relojes solo en módulo interno, nunca desde evento o entrada remota.
PB6 conserva su slot durable y su propio D1clock. UnknownACK o timeout devuelve unconfirmed y no vuelve a register automáticamente. El vencimiento o retorno no cancelan retrospectivamente un write ya enviado. Conciliar el original antes de cualquier siguiente invocación; nunca reiniciar/resetear el slot.
Confirmación solo si respuesta cerrada PB6 tiene campos exactos, contrato afw.preparation.client-maintenance.v1, código preparation_client_observed, opID y manifestHash esperado, callback/resource exactos y observedAt dentro de ventana original. Recalcular manifestHash PB6 desde política aprobada; conservar clientId sintáctico16..128Base64url. Devolver solo recibo saneado cerrado; nada de errores crudos, secretos o datos de expediente. Resultado confirmado es observación de metadatos, NO identidad, consentimiento ni uso real.
Cualquier configuración extra/malformada, contexto incorrecto, drift o respuesta inesperada falla cerrado. HTTP no inspecta cuerpo/secretos/config.

## Pruebas y aceptación
Node tests del módulo interno: disabled sin lecturas, políticas inválidas/extra key con fechas válidas, hash/instance/workflow/payload/schedule incorrectos, register/reconcile, única llamada/ceroargs, opciones retry0, deriva temporal/config/binding y respuesta extra/mismatch, excepciones/timeout saneados.
CI GitHub Miniflare/workerd: Workflow nativo real, service binding a PB7, SDK1.2.1/D1/KV efímeros; create/get/status, cliente único durable, HTTP404. No DB/KV remotos. Build con source/tree verificados antes/después y artefacto explícito buildOnly; no deploy automático ni secretos Actions.
No dependencias nuevas ni build local. Una revisión final fresca de rama según executing-plans; una pasada autor Critical/Important, Minor al ledger. Misma autorización permanente elimina menús rutinarios de aprobación.
Hosting futuro: nuevo Worker caller cerrado con flagfalse, binding solo al target autorizado, no secret/DB/KV/HTTP/domain/cron. Activación finita, clase/APIWorkflow/receipt/retirada requieren recibo propio, no se atribuyen a esta rama.
