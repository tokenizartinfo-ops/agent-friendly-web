# Publicación cerrada del vencimiento operativo

PROJECT AFW; REPOSITORY tokenizartinfo-ops/agent-friendly-web; ENVIRONMENT isolated operations; ORIGIN operations.agentfriendlyweb.dev / operations-manager.agentfriendlyweb.dev; RESOURCE_TYPE Workers / operations D1; RESOURCE_ID agent-friendly-web-operations, agent-friendly-web-operations-manager, D1 603c471d-19bb-4530-9773-c02e18b29840. ALLOWED_ACTION publicación cerrada y ensayo de reloj sin credenciales ni entrada habilitada. ROLLBACK receptor861bc360-edd6-40da-a0a4-7109bd36d918 / manager31ff4c39-1949-4e6d-b2d2-25cb12e9a9ee exclusivamente cerrados, conservar datos.

Fuente e6391b9b94e88f3cd0e89383ef10289cdb07c7e8, PR229, CI37235710217 aprobado;776 pruebas/lint/build y ambos dry-run aprobados. Wrangler autenticado en cuenta85d0d5dadac3341a564f22ce885e9eec; cf sin sesión, API conector usado para lecturas acotadas. versions upload --keep-vars, candidatos comparados con bindings activos: igualdad exacta antes de promoción, identidad/audiencia/limitador/D1 conservados. Sin leer o imprimir credenciales.

Publicados al100%: receptor779a5ffd-f85f-4d3b-a52e-01bdeab32c96; manager021d14bb-e786-4d76-a3cc-84b33681532a. Flagsfalse, cero secretos Worker, token dedicado deshabilitado; ninguna fecha de apertura configurada al cierre. No migraciones, cron ni recursos Tokenizart modificados.

Ensayo remoto de reloj solo en receptor: se añadió temporalmente vencimiento2026-10-04T21:26:33.495Z manteniendo flagfalse y cero secretos. GET/signals vacío a21:26:13.403UTC devolvió405; mismo GET a21:26:57.149UTC devolvió503. Prueba el bloqueo de admisión por reloj remoto sin habilitar escritura ni autenticación. No acredita manager autenticado después del vencimiento, transacciones en vuelo canceladas, retirada de tokens ni PC apagado.

Después se restauró la versión cerrada779a5ffd, deployment7e22ba81-0d5d-416c-8872-c10bf7f55bdd; lectura API final confirmó ambos100%/flagsfalse/cero secretos/sin deadline. D1 independiente12eventos/2incidencias/1investigación, cero filas escritas en la comprobación. Manager deploymentf4a19a15-07e4-4fac-bfcc-55ce84461eda.

Siguiente: vínculo de una tarea operativa publicada AFW con el scheduler hosted y aceptación de consumidor autenticado con fecha compartida. No repetir OTP/consentimientos anteriores ni pedir apagar el equipo antes de tener disparador y cierre remotos comprobados. La discrepancia UI «Repositorio desconocido» no demuestra repo ausente: configuración/checkout consultados contienen AFW; causa de resolución de etiqueta pendiente.
