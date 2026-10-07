# Pedido vigente: conciliación del ensayo propio

## Resultado

El pedido nuevo quedó guardado mediante la interfaz real del expediente sintético propio, revisión 10, a las 19:08:12.406Z del 7 de octubre. La pantalla distingue recepción de revisión realizada. No está acreditada su entrega al consumidor cloud ni una devolución sobre esta revisión. La aceptación histórica de revisión 7 permanece válida para aquella versión, sin extenderse al pedido nuevo.

PROJECT AFW; REPOSITORY tokenizartinfo-ops/agent-friendly-web; ENVIRONMENT QA propio; ORIGIN canary.agentfriendlyweb.dev y operations-manager.agentfriendlyweb.dev; RESOURCE_TYPE Workers/Access/D1; ALLOWED_ACTION ensayo temporal de metadatos, consulta cloud y cierre con recuperación. No datos de clientes, nuevos consentimientos contextuales ni envío a Max.

## Evidencia

- Expediente `781f34a9-a829-44c2-9d03-daf8e113eaec`; evento de origen `help-4bd4317981e799469bf940d1fdf7ae98d9711c1cc78fbbc01cc2499a494d94f0`. Lectura primaria confirmó revisión 10 y fecha. Captura local: `output/afw-current-review-request-20261007.png`.
- Tarea cloud `01a1176d-9b3f-7369-82ad-c53d13275039`, fuente adoptada `08f47d9`, red restricted/enforced. El cliente devolvió `Operational request unavailable`. Un GET diagnóstico independiente devolvió HTTP401, JSON y sin redirección; no se obtuvo código reconocido. No demuestra credenciales incorrectas ni identifica la capa que rechazó.
- La consulta primaria de la base operativa todavía devolvió únicamente revisión 7. No se insertaron recibos manualmente para simular entrega.
- El cron fue publicado a las 19:07:13.271026Z. Un tail acotado no observó invocaciones; ausencia de eventos no distingue propagación, ejecución pausada o fallo de transporte. El código del productor puede retornar `paused` sin arrojar error. Necesita evidencia de ejecución y resultado antes de atribuir la causa.
- Consulta de logs Access limitada a aplicación operativa y 19:05–19:18Z: cero registros devueltos. No acredita que la solicitud haya llegado al Worker ni descarta una demora del registro.
- Inspección cloud local: el cliente rechaza cualquier HTTP distinto de 200 antes de leer JSON y colapsa los fallos en un mensaje genérico. Los bindings `ready` no prueban aceptación remota. No se cambiaron claves por inferencia.

## Cierre comprobado

API efectiva verificada a las **19:20:38.674Z**. Productor sin cron; flags de asistencia/feedback del web, receptor y productor false. Gerente con consumidor/asistencia/dossier false y plazo vacío; conserva presupuesto compartido, que por sí solo no abre el servicio. D1 original del gerente `603c471d-19bb-4530-9773-c02e18b29840` comprobada en `id` y `database_id`. Bases QA e historial conservados.

Token temporal deshabilitado, versión secreta 2 intacta; política de servicio restaurada al selector anterior. No rotación ni valores secretos persistidos. Versiones activas 100%: web QA `4c574e42-0ea2-49e7-83b4-92811d75aaa1`; receptor `4a85d8b1-bae7-408e-bda8-8b52bc1fbc84`; productor `1540af42-2410-4bbf-9d1b-55761c5feef8`; gerente `ae7e6cdf-34b7-455e-94d5-792dda7f1c29`. Producción pública no modificada por este ensayo.

## Siguiente bloque y criterio de cierre

1. Diagnóstico saneado que distinga proxy, Access y aplicación; conservar código permitido, fecha y correlación sin cuerpo arbitrario, JWT ni secretos. Consultar metadata de custodia del destino exacto antes de pedir nueva carga privada.
2. Separar propagación del cron de la ventana de acceso. Preparar la programación cerrada antes de un ensayo finito; comprobar invocación real y resultado del productor, enrollment propio y ACK canónico. No inventar una entrega con SQL.
3. Solo tras ambas verificaciones: cloud reserva y cierra la señal vigente; feedback vuelve al expediente y la UI muestra fecha/revisión correctas y siguiente pregunta. Cerrar cron, tokens y flags y verificar recuperación.
4. Después, ensayo integrado con ordenador apagado y evidencia alojada. Aún no está programado ni aceptado este recorrido nuevo. Luego preview editorial del mail al owner antes de invitar a Max por el expediente real.

No es bloqueo que requiera una acción del owner por ahora. Mantener investigación técnica; no repetir OTP, borrar cookies ni solicitar claves sin causa demostrada.
