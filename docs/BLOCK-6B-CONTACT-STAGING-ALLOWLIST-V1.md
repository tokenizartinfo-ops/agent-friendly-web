# Block 6B - Contact Staging Allowlist v1

**Fecha:** 2026-08-31

**Estado:** implementacion local verificada; remoto deshabilitado

## Objetivo

Preparar una prueba privada y reversible del formulario consentido sin modificar la auditoria publica ni capturar datos reales. El codigo debe demostrar que ninguna variable aislada puede abrir la ruta: se necesitan entorno privado, identidad, allowlist, kill switch, rate limiting, Turnstile y D1 staging al mismo tiempo.

## Limite vigente

- produccion publica: `preview_only`;
- staging remoto: no creado ni activado;
- D1 remota: sin migracion para este gate;
- correo: no configurado;
- datos reales: no autorizados;
- pagina y API privadas: candidatas de codigo hasta una decision remota separada.

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
| ruta staging | verificada fail-closed | no desplegada | no |
| D1 staging | adapter preparado | no creada/aplicada | no |
| Turnstile staging | adapter preparado | no provisionado | no |
| rate limiting | binding obligatorio | no provisionado | no |
| allowlist | parser y politica preparados | no configurada | no |
| correo | fuera del gate | no configurado | no |

## Runbook remoto pendiente

Cada paso requiere autorizacion antes de la mutacion correspondiente:

1. crear un proyecto Sites privado separado y registrar su hostname exacto;
2. comprobar que la capa autenticada inyecte identidad confiable;
3. crear D1 staging, exportar baseline y aplicar migraciones `0004` y `0005`;
4. verificar que `contact_leads` y `consent_receipts` esten vacias;
5. crear Turnstile de prueba limitado al hostname privado;
6. provisionar secret, Site Key y rate limiter sin exponer valores;
7. configurar una allowlist inicial minima;
8. desplegar con `CONTACT_STAGING_WRITES_ENABLED=false`;
9. ejecutar pruebas negativas de modo, host, identidad, limiter, cuerpo, Turnstile y DB;
10. abrir el kill switch para un unico actor y enviar solamente datos sinteticos;
11. comprobar idempotencia, recibos y ausencia de correo;
12. cerrar nuevamente el kill switch y registrar evidencia.

## Rollback

Cerrar `CONTACT_STAGING_WRITES_ENABLED` detiene nuevas escrituras antes del limiter y del cuerpo. Los registros existentes no se borran durante un incidente. Revocar la identidad o retirar el hostname privado son controles adicionales. Restauracion, supresion o datos reales requieren un runbook y una aprobacion posteriores.

## Verificacion local

- `npm test`: 312 pruebas aprobadas;
- `npm run lint`: cero errores, una advertencia preexistente sobre la imagen principal;
- `npm run build`: aprobado, incluidas las rutas candidatas;
- smoke sin configuracion: endpoint publico `503`, endpoint staging `404`, pagina staging `404`;
- ningun secreto, binding remoto, migracion o dato real fue agregado.
