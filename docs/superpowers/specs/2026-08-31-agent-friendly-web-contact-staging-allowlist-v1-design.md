# Agent Friendly Web Contact Staging Allowlist v1

**Fecha:** 2026-08-31

**Estado:** aprobado para especificacion, implementacion local y pruebas. Sin activacion remota.

## Decision

Gate 6B incorpora una segunda frontera exclusivamente para un futuro entorno privado de staging. La web publica conserva `POST /api/contact-intake` fisicamente cerrado y no puede activarse mediante una variable. El nuevo flujo vive en una ruta distinta, requiere identidad autenticada y falla cerrado antes de leer el cuerpo cuando falta cualquier control.

Este gate prepara codigo y pruebas. No crea el sitio privado, no aplica migraciones remotas, no provisiona secretos, no habilita trafico, no envia correo y no captura datos reales.

## Fronteras

### Produccion publica

- `POST /api/contact-intake` continua devolviendo `503 contact_capture_disabled`;
- no lee cuerpo, no importa D1, no consulta Turnstile y no posee flag de activacion;
- el formulario publico continua en modo `preview_only`;
- la auditoria publica sigue disponible sin email.

### Staging privado

- ruta candidata: `POST /api/staging/contact-intake`;
- pagina candidata: `/contact-staging`, fuera de navegacion, sitemap, AEO, OKF y catalogos publicos;
- despliegue futuro en un proyecto privado separado;
- D1 de staging aislada de produccion;
- Turnstile asociado solo al hostname de staging;
- identidad aportada por la capa autenticada de Sites, nunca por un campo JSON;
- allowlist exacta de emails en configuracion privada;
- rate limiting obligatorio y fail-closed;
- kill switch independiente para detener escrituras sin borrar evidencia.

## Orden obligatorio de evaluacion

1. Comprobar que el modo sea exactamente `staging_allowlist`.
2. Comprobar que la configuracion minima exista.
3. Comparar el hostname exacto con el hostname privado esperado.
4. Exigir identidad autenticada con `userId` y email.
5. Exigir que el email normalizado pertenezca a la allowlist.
6. Exigir que el kill switch de escrituras este abierto.
7. Consumir un cupo de rate limiting asociado al usuario autenticado.
8. Validar `Content-Type`, tamano acotado y JSON.
9. Validar contrato, consentimiento e idempotencia.
10. Validar Turnstile en servidor, incluida `action=request_plan` y hostname.
11. Persistir en D1 staging mediante la transaccion existente.

Los pasos 1 a 6 ocurren antes de leer el cuerpo. Ninguna respuesta devuelve secretos, tokens, valores de bindings ni datos internos de la allowlist.

## Configuracion candidata

- `CONTACT_STAGING_MODE=staging_allowlist`;
- `CONTACT_STAGING_WRITES_ENABLED=true`;
- `CONTACT_STAGING_EXPECTED_HOST=<hostname privado exacto>`;
- `CONTACT_STAGING_ALLOWED_EMAILS=<lista privada separada por comas>`;
- `CONTACT_STAGING_TURNSTILE_SITE_KEY=<clave publica del widget>`;
- `CONTACT_STAGING_TURNSTILE_SECRET=<secret binding>`;
- `CONTACT_STAGING_RATE_LIMITER=<binding de rate limiting>`;
- `DB=<D1 staging aislada>`.

La ausencia, valor inesperado o binding incorrecto equivale a deshabilitado. La Site Key puede llegar al navegador; el secret nunca.
Los hosts publicos canonicos `agentfriendlyweb.dev` y `www.agentfriendlyweb.dev` estan rechazados expresamente como hostname staging.

## Cuerpo y persistencia

- solo `application/json`;
- maximo 8 KiB, incluso sin `Content-Length`;
- campos allowlisted y acotados por el contrato v1;
- rechazo de patrones probables de credenciales;
- token Turnstile no persistido;
- email operativo no enviado ni encolado;
- idempotencia conserva la respuesta existente para el mismo contenido y rechaza conflictos;
- tablas `contact_leads` y `consent_receipts` solamente en D1 staging durante este gate.

## Respuestas

- `404 contact_staging_unavailable`: modo o hostname incorrectos;
- `503 contact_staging_misconfigured`: binding o configuracion obligatoria ausente;
- `503 contact_staging_kill_switch_closed`: escrituras detenidas;
- `401 contact_staging_identity_required`: identidad ausente;
- `403 contact_staging_actor_not_allowed`: email fuera de allowlist;
- `429 contact_staging_rate_limited`: cupo agotado;
- `415 unsupported_media_type`: formato incorrecto;
- `413 request_body_too_large`: cuerpo superior al limite;
- `400 invalid_json` o errores del contrato/Turnstile;
- `201` para alta y `200` para repeticion idempotente.

Todas las respuestas usan `cache-control: no-store`.

## Pruebas negativas minimas

- produccion publica sigue cerrada aunque existan variables de staging;
- staging sin modo, hostname, identidad, allowlist, kill switch, limiter, Turnstile o DB no escribe;
- identidad no permitida no provoca lectura del cuerpo;
- hostname alternativo, subdominio o puerto inesperado no pasa;
- JSON incorrecto, tipo incorrecto y cuerpo grande se rechazan;
- Turnstile ausente, invalido, reutilizado, con action o hostname incorrectos no persiste;
- clave idempotente con contenido distinto produce conflicto;
- token, secret y lista de emails no aparecen en respuesta ni persistencia.

## Activacion remota futura

Requiere una aprobacion separada para cada mutacion remota: crear proyecto privado, configurar acceso, crear D1, aplicar migraciones, crear Turnstile, provisionar secrets/bindings y abrir el kill switch. Primero se usan identidades y dominios sinteticos. La lectura o captura de datos reales requiere otra decision posterior.

## Rollback

1. cerrar `CONTACT_STAGING_WRITES_ENABLED`;
2. verificar que nuevas solicitudes fallen antes de leer el cuerpo;
3. conservar D1 para evidencia y diagnostico;
4. revocar identidad o retirar el hostname privado si fuera necesario;
5. no borrar tablas ni registros durante el incidente;
6. restaurar o suprimir datos solo mediante runbook y decision humana separada.
