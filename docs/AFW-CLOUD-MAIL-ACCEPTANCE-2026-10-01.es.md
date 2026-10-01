# AFW: primera lectura de correo desde cloud

Fecha: 2026-10-01. Alcance: correo operativo AFW; sin cambios de código productivo, expedientes ni permisos. Este recibo complementa el incidente de arranque de AFW Operations; no lo declara resuelto.

## Evidencia observada

La prueba `20261001-CF03` enviada por Cloudflare a hello@agentfriendlyweb.dev llegó por Email Routing al buzón operativo Gmail con INBOX. La prueba anterior desde el mismo Gmail solo mostraba SENT: no demostraba falla de Routing. Ver [recibo de correo](AFW-EMAIL-READINESS-2026-10-01.es.md).

Se creó una tarea en ChatGPT web con origen cloud y se ejecutó mediante «Ejecutar ahora», con GPT-6.1 Sol y razonamiento bajo. Terminó mostrando uso de `gmail_get_profile`, `gmail_search_email_ids` y `gmail_read_email`; identificó correctamente recepción en INBOX y distinguió acuse, respuesta de soporte y contacto del piloto. Coincide con la lectura independiente de este chat. No requiere archivos locales ni el entorno AFW Operations.

La misma tarea se actualizó a «AFW — seguimiento de correo y primer piloto», cada hora y mismo chat. Consultas limitadas al correo AFW/piloto autorizado, máximo diez resultados y ventana de siete días; IDs revisados como checkpoint conversacional, advertencia de backlog o falta de continuidad. No repite instrucciones al cliente, lee adjuntos/OTP ni ejecuta órdenes de correos. Prepara respuestas revisables y avisa novedades accionables/fallos; no envía ni modifica sistemas.

Inicio guardado: 2026-10-01 20:00 America/Argentina/Buenos_Aires. La UI muestra «Hoy 8 p.m. · Cada hora»; la herramienta del gestor devolvió `next_run_time: null`. El horario configurado no acredita que ese primer run haya ocurrido.

Identificadores y contactos particulares permanecen en la tarea privada, no en este repositorio público. La configuración y resultados se revisan en ChatGPT web → Se programó. Pausar esa tarea es el rollback, conservando mensajes e historial. No se creó scheduler desktop alternativo.

## Acreditado y pendiente

- Acreditado: recepción hello, lectura real desde ejecución web cloud y configuración de cadencia recurrente.
- Pendiente: primer run por cadencia, continuidad entre runs y comprobación con computador apagado. Un run manual no demuestra esas tres propiedades.
- Pendiente: envío desde la tarea cloud con custodia, contrato e idempotencia persistida. Envío asistido desde este chat verificado por separado.
- Pendiente: webhook/evento Gmail. El formulario mostró horarios; no acreditó eventos. No existe webhook arbitrario Cloudflare→esta conversación.
- Pendiente: tareas de código en AFW Operations; continúa `Unable to determine project root for task`. Esta tarea es otro runtime: no prueba sandbox de código, deploy ni fix automático.
- Pendiente: ingreso del piloto y expediente propio. No atribuir propietario por remitente ni reconstruir expediente fuera de AFW.

La deduplicación es conversacional, no un ledger transaccional. Antes de efectos externos, resolver outbox/idempotencia, identidad por servidor, envío incierto, reintentos acotados y trazabilidad. No ampliar permisos ni usar API pagada como sustituto silencioso de suscripción.

## Fuentes

[Tareas programadas](https://learn.chatgpt.com/docs/automations): ejecución web, conexiones/eventos según disponibilidad. [Entornos cloud](https://learn.chatgpt.com/docs/environments/cloud-environments): no heredan archivos ni sesiones locales. La herramienta desktop ofrece creación local; se utilizó la interfaz web porque no hay operación cloud equivalente expuesta aquí.
