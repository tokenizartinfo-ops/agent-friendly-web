# Block 6B - Contact Staging Allowlist v1

**Fecha:** 2026-08-31

**Estado:** canary Sites privado OFF desplegado; frontera Worker 6B.1 verificada localmente; Worker remoto pendiente

## Objetivo

Preparar una prueba privada y reversible del formulario consentido sin modificar la auditoria publica ni capturar datos reales. El codigo debe demostrar que ninguna variable aislada puede abrir la ruta: se necesitan entorno privado, identidad, allowlist, kill switch, rate limiting, Turnstile y D1 staging al mismo tiempo.

## Limite vigente

- produccion publica: `preview_only`;
- staging remoto: proyecto separado, privado y owner-only, con escrituras deshabilitadas;
- D1 remota: aislada, migrada y verificada sin registros de contacto;
- correo: no configurado;
- datos reales: no autorizados;
- pagina y API privadas: desplegadas, no publicas y cerradas por configuracion.

## Evidencia esperada

El cierre del bloque debe incluir pruebas negativas, build, PR y una matriz que distinga codigo preparado de infraestructura realmente desplegada.

## Implementacion local

- `lib/contact-staging-policy.mjs`: modo, hostname, identidad, allowlist y kill switch;
- `lib/bounded-json-body.mjs`: `application/json`, 8 KiB y parseo incremental;
- `lib/contact-staging-handler.mjs`: orden de gates y fail-closed;
- `POST /api/staging/contact-intake`: adaptador de bindings, Turnstile y D1;
- `/contact-staging`: pagina privada candidata, `noindex` y dominio sintetico fijo;
- `ContactIntake`: endpoint inyectable con default publico intacto;
- `robots.txt`: exclusion de pagina y API staging.

## Matriz de estado

| Componente | Codigo | Remoto | Datos reales |
| --- | --- | --- | --- |
| preview publico | verificado | activo sin persistencia | no |
| ruta staging | verificada fail-closed | privada, kill switch cerrado | no |
| D1 staging | adapter preparado | aislada, migrada y vacia | no |
| Turnstile staging | adapter preparado | no provisionado | no |
| rate limiting Sites | binding obligatorio | no disponible en Sites | no |
| frontera Worker | JWT, CORS, limiter y D1 verificados | no desplegada | no |
| allowlist | parser y politica preparados | configurada para un unico actor | no |
| correo | fuera del gate | no configurado | no |

## Runbook remoto

Cada paso requiere autorizacion antes de la mutacion correspondiente:

1. [completado] crear un proyecto Sites privado separado y registrar su hostname exacto;
2. [completado] comprobar que el origen privado cierre el acceso anonimo;
3. [completado] disponer D1 staging aislada y aplicar las migraciones del repositorio;
4. [completado] verificar que `contact_leads` y `consent_receipts` esten vacias;
5. [pendiente] crear Turnstile de prueba limitado al hostname privado;
6. [pendiente] provisionar secret, Site Key y rate limiter sin exponer valores;
7. [completado] configurar una allowlist inicial minima;
8. [completado] desplegar con `CONTACT_STAGING_WRITES_ENABLED=false`;
9. [parcial] ejecutar pruebas negativas de modo, host e identidad; limiter, Turnstile y escritura siguen cerrados;
10. [pendiente] abrir el kill switch para un unico actor y enviar solamente datos sinteticos;
11. [pendiente] comprobar idempotencia, recibos y ausencia de correo;
12. [pendiente] cerrar nuevamente el kill switch y registrar evidencia final.

## Rollback

Cerrar `CONTACT_STAGING_WRITES_ENABLED` detiene nuevas escrituras antes del limiter y del cuerpo. Los registros existentes no se borran durante un incidente. Revocar la identidad o retirar el hostname privado son controles adicionales. Restauracion, supresion o datos reales requieren un runbook y una aprobacion posteriores.

## Canary remoto con escrituras deshabilitadas

El 2026-08-31 se desplego una instancia separada y owner-only en `https://agent-friendly-web-contact-staging.tokenizart.chatgpt.site`. No comparte el proyecto Sites ni la base D1 de `agentfriendlyweb.dev`.

- `CONTACT_STAGING_MODE=staging_allowlist`;
- hostname fijado al origen privado;
- allowlist inicial de un unico actor operativo;
- `CONTACT_STAGING_WRITES_ENABLED=false`;
- sin Site Key ni secret Turnstile;
- sin binding remoto de rate limiting;
- sin correo, contactos reales, pagos ni trafico publico.

La base aislada expone las trece tablas esperadas. `contact_leads` y `consent_receipts` tienen cero filas. Las pruebas remotas observaron `401` sin autenticacion, `404` para `/contact-staging` con el kill switch cerrado, `401 contact_staging_identity_required` para la API usando un bypass sin identidad y `503 contact_capture_disabled` en el endpoint publico.

Este hito prueba aislamiento, migraciones y cierre por defecto. Gate 6B.1 agrego despues una frontera Worker local con rate limiting nativo, verificacion criptografica de Access, CORS exacto y adaptador D1 directo. No autoriza abrir escrituras: Gate 6B.2 debe desplegar esa frontera con el kill switch cerrado y provisionar Turnstile sin exponer secretos.

## Verificacion local

- `npm test`: 357 pruebas aprobadas en Gate 6B.1;
- `npm run lint`: cero errores, una advertencia preexistente sobre la imagen principal;
- `npm run build`: aprobado, incluidas las rutas candidatas;
- smoke sin configuracion: endpoint publico `503`, endpoint staging `404`, pagina staging `404`;
- D1 Sites privada migrada; ningun secreto, contacto o dato real fue agregado;
- Worker 6B.1: `wrangler deploy --dry-run` aprobado con D1 y rate limiter nativo declarados, sin despliegue remoto.
- revision tecnica: `https://github.com/tokenizartinfo-ops/agent-friendly-web/pull/31`.
