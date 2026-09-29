# AFW: activación reversible del copilot por expediente

**Proyecto/recurso:** Agent Friendly Web, Worker `agent-friendly-web-web-production`, origen `https://agentfriendlyweb.dev`. **Estado verificado (29/09/2026 UTC):** versión `d7502fb4-4e5b-4a60-abcf-fa4766d4b8a8` al 100%, `AFW_COPILOT_ENABLED=false`, `AFW_COPILOT_PROJECT_ID=""`. **Acción de este documento:** especificar un procedimiento; no habilita clientes.

## Condiciones antes de activar

1. Identificar un expediente AFW por ID exacto y propietario verificado en D1 productiva. No usar una URL, email ni nombre como selector de la compuerta. Informar que habilitar el panel **no concede permiso para procesar texto**: el servidor exige un evento durable `grant` vigente para ese expediente y usuario, más la casilla explícita de cada envío. El propietario puede generar un evento `revoke` desde el panel; desde entonces las nuevas consultas se bloquean. No introducir claves ni información privada.
2. Confirmar que la audiencia de Cloudflare Access sigue siendo `afac57a0e7660c20cffe344cd331a2d42a37eb1440d6b20bdbca9d6ad89708ac` y que el Worker conserva el aislamiento por `userId` de D1. No extraer ni registrar JWT, cookies o notas de usuarios. Comprobar la cuota de 5 solicitudes/60 s y el presupuesto de Workers AI.
3. Obtener línea base: deployment activo, bindings, estado de la D1 y smoke público. Congelar el hash de la nueva configuración. Crear una versión con `AFW_COPILOT_ENABLED=true` y `AFW_COPILOT_PROJECT_ID=<ID exacto>` manteniendo código, D1 y audiencia; asociarla primero al 0%, verificar bindings y luego asignar tráfico de forma controlada.
4. En la sesión autorizada del propietario, comprobar: panel visible solo en el expediente permitido; estado inicial sin permiso; `grant` explícito registrado en `copilot_consent_events`; ausencia o 404 para otros expedientes; rechazo de origen indebido, cuerpo excesivo, texto sensible y falta de identidad; sugerencias con citas literales; revisión antes de aplicar; ausencia de guardado automático; 429 de cuota y 503 seguro ante error del modelo. Ejecutar `revoke` y comprobar que bloquea las consultas siguientes. La revocación no deshace una inferencia que ya había comenzado. No usar datos de otro cliente como prueba.
5. Registrar fechas, versión, ID del expediente, evidencia saneada de resultados y responsable del corte. Mantener el monitoreo de errores sin cuerpos de texto ni identificadores de sesión.

## Apagado y rollback

La acción inmediata es publicar una versión con `AFW_COPILOT_ENABLED=false` e ID vacío o volver a `d7502fb4-4e5b-4a60-abcf-fa4766d4b8a8`, que ya tiene esa configuración. Confirmar 100% de tráfico, panel ausente, smoke público y Access intacto. La versión anterior `a4107b0e-7c14-48da-bde5-db2bd63361d6` también está cerrada, pero carece del control durable y **no debe reabrirse para un cliente**. No borrar ni restaurar D1 por un cambio de bandera del copilot. Si el modelo responde sin fundamento, agota cuota o aparecen errores, cerrar la compuerta antes de investigar.

**Límite del producto:** la activación del copilot propone estructura a partir del texto del usuario. No verifica el sitio, no publica documentos ni concede herramientas transaccionales. Las decisiones AF-0 a AF-5 permanecen proporcionales a objetivos y evidencia del expediente.
