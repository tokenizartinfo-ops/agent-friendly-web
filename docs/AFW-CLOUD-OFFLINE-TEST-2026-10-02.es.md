# Prueba cloud sin ordenador: 2 de octubre de 2026

## Objetivo y estado

Prueba solicitada para hoy19:30 America/Argentina/Buenos_Aires, equivalente22:30 UTC. El owner prevé apagar19:15 y regresar mañana. Esa previsión no demuestra que el equipo estuviera apagado: registrar después su confirmación y el intervalo real.

Estado inicial: preparación, **programación todavía no verificada**. La pestaña del seguimiento cloud existente está localizada, pero sus dos intentos de conexión de control agotaron el plazo; se solicitó reconexión. No crear una automatización desktop como sustituto: depende del ordenador y no sirve para esta aceptación. DNSSEC queda expresamente diferido hasta mañana.

## Recorrido de comprobación

## Programación y preflight comprobados — 21:48 UTC

Chrome recuperó el control. Se creó en ChatGPT web una prueba independiente llamada **AFW — prueba cloud sin PC · 19:30**, origen cloud comprobado por la URL de Scheduled. La interfaz confirmó «Próxima ejecución: 2 oct, 7:30 p.m. GMT-3». Repetir tarea está apagado; modelo GPT6.1 Sol y esfuerzo Bajo observados. El seguimiento previo conserva «Hoy7p.m. · Cada hora» sin modificaciones. IDs privados del scheduler/chat y captura se guardan únicamente en output local ignorado.

Preflight manual separado, marcador `AFW-PREFLIGHT-20261002-1930`: inicio21:47:32 UTC, fin21:47:46 UTC. Registro de actividad muestra uso de Gmail y web; resultado confirma cuenta operativa correcta, cuatro resultados, sin páginas adicionales ni errores. Herramientas reportadas: gmail_get_profile, gmail_search_email_ids y reloj time de search_service_web_run. No fue necesario leer mensajes/adjuntos; sin envíos ni cambios. Esta ejecución manual no consume la prueba programada ni demuestra apagado.

Próximo: comprobar mañana el run puntual real de22:30 UTC, sus herramientas y resultado; cotejarlo con el intervalo de apagado confirmado por el owner. Estado actual: **programada y preflight aprobado; ejecución durante apagado pendiente**. DNSSEC sigue diferido. Rollback: pausar únicamente esta prueba puntual desde Scheduled, preservando historial y la tarea horaria.

### Criterios del recorrido

1. Desde la tarea web existente, conservar prompt y horario recurrentes antes de cualquier modificación. Preferir una ejecución puntual de prueba; no reemplazar silenciosamente la guardia horaria ni duplicar efectos.
2. Confirmar fecha, hora, zona, estado activo y próxima ejecución22:30 UTC. Usar GPT6.1 Sol bajo si esa configuración está disponible; registrar el modelo observado, no inferirlo de este documento.
3. Ejecutar manualmente el mismo prompt acotado antes de programar: lectura Gmail del correo AFW autorizado, sin adjuntos/OTP, sin envíos ni mutaciones. Registrar herramienta utilizada y resultado agregado saneado. No trasladar mensajes privados a este repositorio público.
4. La ejecución por horario debe devolver un recibo explícito con marcador `AFW-OFFLINE-20261002-1930`, inicio/fin UTC, herramientas realmente usadas, resultado, limitaciones y procedencia del run. La prueba debe informar incluso si no hay correo nuevo; esta excepción se limita a la aceptación puntual. La guardia habitual permanece silenciosa sin novedades accionables.
5. Mañana verificar el run registrado por Scheduled, su horario de inicio y sus herramientas. Compararlo con el intervalo de apagado confirmado por el owner. No aceptar solo una notificación, el avance del próximo horario ni una salida preparada previamente.
6. Conservar historial y pausar/retirar exclusivamente el disparador puntual una vez completado. Mantener o restaurar la configuración previa del seguimiento.

## Qué acredita

Un run real de lectura cloud durante el intervalo de apagado acredita independencia del PC para ese recorrido y sus conectores. No acredita un deploy, una reparación de código, envío de correo, una guardia permanente ni un webhook arbitrario Cloudflare→Codex. El entorno de código AFW Operations y el consumidor mediado tienen recibos separados.

Si el scheduler o la conexión fallan, dejar fallo explícito y reprogramar con autorización vigente; nunca inventar una ejecución ni sustituir suscripción por API pagada.

Fuente oficial consultada hoy: [tareas programadas](https://learn.chatgpt.com/docs/automations). Las tareas web usan contexto/conexiones accesibles en cloud; las tareas de proyecto locales requieren ordenador y app encendidos.
