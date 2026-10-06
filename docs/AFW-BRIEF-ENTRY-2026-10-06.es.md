# Entrada breve del expediente sin ampliar acceso IA

6oct2026. Chrome producción bajo owner mostró muchas secciones fuera del project ID piloto. La guía breve se ofrece por defecto a toda entrada privada cargada; el modo completo permanece accesible, guardado y recuperación se conservan. Guía local abierta cuando no hay piloto, sin prometer texto/audio IA ni activar AI. Help dock apunta al panel disponible. El switch de vista no depende de acceso al modelo.

Regresión RED/GREEN de entrada sin piloto; 925 tests aprobados, lint exit0 (dos warnings), build exit0. No cambios de D1, consentimiento, rollout ni permisos cloud. Despliegue y aceptación visual todavía pendientes; no atribuir este modo local a producción antes de comprobar versión.

Sigue pendiente puente de seguimiento de expedientes al cloud y recepción del cliente real. CTA correo v2 implementado en mismo PR290, sin nuevo correo enviado.

## Aceptación privada en Canary, 6 octubre

Origen `https://canary.agentfriendlyweb.dev`, Worker `agent-friendly-web-web-canary`, fuente `529ab42`, versión `f7526644-6174-472e-8fb4-034c3446e8fb` al 100%. Rollback de código: `e9bf6158-7a77-4771-a256-4844b4826603`, preservando D1 y datos. Piloto IA permanece deshabilitado; no hubo migraciones ni cambios de Access.

Chrome autenticado del owner creó mediante la interfaz un expediente sintético separado, “AFW QA entrada breve 2026-10-06”, con `https://example.net/`. La pantalla cargada mostró la pregunta de audiencia y ocultó el formulario completo. Se revisó una respuesta sintética, se incorporó al borrador y se guardó. Tras recargar, la guía continuó por idiomas y el modo completo mostró exactamente la audiencia guardada. Se volvió a la guía breve. Evidencia visual local ignorada: `output/brief-entry-canary-20261006.png`.

Esta aceptación acredita el recorrido local de una pregunta y su persistencia en Canary. No acredita conversación IA, seguimiento cloud, sesión de Max ni producción. Durante la carga inicial aún aparece brevemente el formulario deshabilitado; queda como mejora de presentación.
