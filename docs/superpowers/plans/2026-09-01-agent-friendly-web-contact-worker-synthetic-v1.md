# Gate 6B.3 Contact Worker Synthetic Write Plan

> **For Codex:** execute this plan from an isolated worktree and preserve the OFF version as the first rollback control.

**Goal:** Probar una unica captura sintetica e idempotente en la frontera privada de contacto, verificar su evidencia y volver a cerrar toda escritura.

**Architecture:** La interfaz Sites privada produce un token Turnstile de prueba. El Worker separado valida Cloudflare Access, allowlist, rate limiting, cuerpo acotado, contrato, Turnstile y D1 en ese orden. La web publica, correo, CRM, pagos, webhooks y marketing permanecen fuera del gate.

**Correccion de frontera 2026-09-01:** `public_web`, `contact_staging_ui` y `contact_staging_api` son superficies diferentes. La interfaz humana vive exclusivamente en Sites privado. El Worker es API-only y `GET /health` siempre devuelve JSON. `CONTACT_STAGING_UI_ENABLED` controla la visibilidad de Sites sin abrir su ruta de escritura; `CONTACT_STAGING_WRITES_ENABLED` se mantiene cerrado en Sites y solo se abre temporalmente en el Worker.

**Spec:** `docs/superpowers/specs/2026-08-31-agent-friendly-web-contact-worker-frontier-v1-design.md`

## Global Constraints

- Usar exclusivamente datos reservados bajo `example.com`.
- Crear un solo lead remoto; una repeticion, si se ejecuta, conserva la misma clave idempotente y no crea otra fila.
- No documentar email allowlisted, JWT, cookie, audience, Turnstile site key/secret/token ni clave idempotente completa.
- Preparar el rollback antes de abrir el kill switch.
- Usar credenciales Turnstile oficiales de testing solo en la version efimera de staging; nunca en produccion ni en Git.
- Mantener `POST /api/contact-intake` publico cerrado.
- No activar correo, CRM, newsletter, pagos, x402, A2A, webhooks ni datos reales.

## Task 1: Preflight y rollback

- [x] Confirmar la version Worker OFF activa al 100%.
- [x] Confirmar cero filas en `contact_leads` y `consent_receipts`.
- [x] Confirmar que el proyecto Sites privado conserva captura OFF.
- [ ] Confirmar que la version activa y la version temporal enlazan exclusivamente la D1 staging `agent-friendly-web-contact-staging-frontier`.
- [x] Registrar la version OFF exacta como destino de rollback sin exponer bindings sensibles.

## Task 2: Ventana canary temporal

- [ ] Crear una version Worker no productiva con escrituras ON y Turnstile oficial de testing.
- [ ] Inspeccionar la version antes de asignarle trafico.
- [ ] Habilitar temporalmente la pagina Sites owner-only con `CONTACT_STAGING_UI_ENABLED=true` y el Site Key oficial de testing, manteniendo `CONTACT_STAGING_WRITES_ENABLED=false` en Sites.
- [ ] Verificar que Access sigue deny-by-default y que no existe bypass ni service auth.

## Task 3: Caso sintetico

- [ ] Autenticar el unico operador allowlisted mediante Cloudflare Access.
- [ ] Confirmar visualmente que la prueba se ejecuta desde `contact_staging_ui`, no desde la web publica ni desde `/health` del Worker.
- [ ] Enviar un payload acotado con email y dominio `example.com`, consentimiento requerido y consentimientos opcionales en `false`.
- [ ] Verificar respuesta `201`, `emailQueued=false` y recibo metadata-only.
- [ ] Repetir solo si hace falta probar idempotencia remota; debe responder como duplicado y conservar una fila.

## Task 4: Evidencia y cierre

- [ ] Volver a desplegar inmediatamente la version Worker OFF.
- [ ] Volver a fijar la pagina Sites privada en captura OFF y restaurar su Site Key anterior.
- [ ] Verificar el bloqueo posterior y consultar D1 read-only.
- [ ] Verificar nuevamente que `POST /api/contact-intake` publico responde `503 contact_capture_disabled`.
- [ ] Comprobar exactamente un lead sintetico y un recibo `requested_plan`.
- [ ] Comprobar ausencia de cola/envio de correo y de logs con cuerpo o identidad completa.

## Task 5: Integracion

- [ ] Documentar resultados sin secretos ni datos reales.
- [ ] Actualizar roadmap y estado Gate 6B.
- [ ] Ejecutar `npm test`, `npm run lint`, `npm run build` y `npm run contact:deploy:dry-run`.
- [ ] Integrar por PR y conservar el Worker remoto cerrado.

## Rollback de emergencia

1. Desplegar la version OFF previamente registrada al 100%.
2. Fijar `CONTACT_STAGING_WRITES_ENABLED=false` en Sites y desplegar la version privada guardada.
3. Si el bloqueo no se observa, retirar el custom hostname o deshabilitar la aplicacion Access.
4. Conservar D1 para diagnostico; no borrar evidencia durante el incidente.
5. Verificar otra vez el endpoint publico, el candidato privado y los contadores D1.
