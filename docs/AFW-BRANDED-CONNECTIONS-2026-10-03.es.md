# AFW: identidad visual y recuperación de conexiones — 3 de octubre de 2026

Cambio acotado del HTML humano delegado: tipografía cómic en todo el cuerpo conforme a la preferencia del owner, papel cálido, tinta oscura, verde AFW, panel único, viewport y controles de 48px. Sin imágenes ni fuentes externas. Cada respuesta admite exclusivamente su estilo mediante un nonce fresco; se conservan default-src none, form-action restringido, frame-ancestors none, no-store y las reglas de identidad/consentimiento.

El error genérico ofrece volver al expediente y declara que no puede confirmar la causa. No reconecta automáticamente ni afirma que una sesión o permiso estén vigentes. Las pantallas de conexiones siguen distinguiendo retirada y vencimiento, y enlazan al expediente propio.

Prueba nueva de nonce fresco/CSP y recuperación pasó; suite completa 732/732. Vista sintética local con formularios deshabilitados: Chrome mostró la tipografía esperada y ausencia de desbordamiento en un viewport efectivo de 487px. La solicitud de 390px no se aplicó con exactitud y la primera captura falló; no se acredita todavía QA exacta390/1440 ni navegación de teclado completa. Captura posterior a tamaño habitual guardada en output ignorado. Pendiente finalizar lint/build, revisión visual exacta y promoción cerrada. No hay despliegue remoto de este cambio ni apertura comercial.

La PR201 de aislamiento está integrada en main b3e902f; el error local de checkout durante gh merge fue por otro worktree que utiliza main, no un rechazo remoto.

## Publicación cerrada verificada — 3 de octubre, 22:32 Argentina

PR202 integrada en main0256af3, CI37168147743 aprobada, 732 pruebas y lint/build local completos. Revisión independiente sin hallazgos materiales. Worker real `0f13d991-ffa7-4136-b78a-e3c3a536214d` y canary `a2ed1787-36bc-4520-a851-1400d221a545` al100%, flags OAuth/refreshfalse comprobados por API. MCP y dos metadatos devolvieron404 en ambos hosts. Rollbacks cerrados8dfb4024 y74b2447c respectivamente; sin migraciones ni cambios a datos/Access. PROJECT AFW, REPOSITORY agent-friendly-web, ENVIRONMENT real-pilot/canary cerrado, ORIGIN delegated-pilot/delegated-canary.agentfriendlyweb.dev, RESOURCE_TYPE Worker, ALLOWED_ACTION publicación cerrada y verificación; no apertura comercial. Evidencia visual sintética guardada, servidor local detenido tras revisión. La publicación no demuestra el recorrido remoto nuevo mientras el servicio permanece cerrado. Pendiente QA exacta móvil/teclado y recuperación conversacional completa antes de abrir comercialmente.
