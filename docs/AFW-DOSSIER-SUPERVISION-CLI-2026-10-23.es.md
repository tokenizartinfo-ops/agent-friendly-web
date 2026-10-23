# CLI de supervisión de expediente — solo fuente

- `node scripts/afw-operations-client.mjs dossier-list`: devuelve `{signals}` con metadata opaca validada.
- `node scripts/afw-operations-client.mjs dossier-claim EVENT_ID REQUEST_ID`: devuelve `{reservation}`. EVENT_ID es el evento, no projectRef; REQUEST_ID debe ser un UUID explícito.
- `node scripts/afw-operations-client.mjs dossier-finish RUN_ID OUTCOME`: devuelve `{outcome}`; admite reviewed/intervention_required y conserva superseded del servidor. Ninguno significa resolved.

Se reutilizan los métodos y el transporte existentes, sin endpoints, IDs generados ni reintentos nuevos. Tras un ACK perdido no se asume aceptación: la recuperación requiere una llamada explícita con el MISMO requestId, bajo autoridad todavía vigente.

Antes de cualquier uso real comprobar identidad/proyecto AFW, fuente aprobada, ventana original vigente y proxy con credenciales custodiadas de alcance exacto. No copiar claves a argumentos, Git, logs o Actions. Las pruebas usan fetchImpl interceptado y valores sintéticos; no acreditan recepción real, revisión útil, consentimiento, retirada nativa ni PC-off. No autorizan casos/clientes/Max, guardia, OAuth, permisos, servidor o despliegue. PR571 permanece DRAFT hasta el primer recorrido durable aceptado. El seguimiento de correo sigue separado.
