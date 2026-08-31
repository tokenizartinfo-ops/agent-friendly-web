# Gate 6B Consented Contact Implementation Plan

> Implementar con TDD y mantener la captura remota deshabilitada.

## Tarea 1: contrato y validacion pura

- Crear tests para normalizacion, consentimiento, secretos probables e idempotencia.
- Implementar `lib/contact-intake.mjs`.
- Publicar `/.well-known/contact-intake-contract.json` como contrato descriptivo.

## Tarea 2: persistencia aditiva

- Escribir primero el test de migracion.
- Agregar `contact_leads` y `consent_receipts` al schema Drizzle.
- Generar una migracion aditiva y comprobarla sobre SQLite aislado.
- No aplicar migraciones remotas.

## Tarea 3: Turnstile y endpoint cerrado

- Crear tests con validador y store falsos.
- Implementar validacion server-side con timeout, action, hostname e idempotencia.
- Implementar handler inyectable y ruta API.
- Mantener el endpoint fisicamente cerrado, sin flag de activacion, y no provisionar secretos.

## Tarea 4: experiencia trilingue

- Crear tests de copy y accesibilidad estructural.
- Agregar CTA opcional luego del resultado.
- Implementar formulario ESP/ENG/POR con tres consentimientos separados.
- En preview, preparar solo un resumen local; no llamar al endpoint.
- Agregar estilos responsivos compatibles con la estetica comic existente.

## Tarea 5: documentacion y verificacion

- Documentar operacion, rollback y gate remoto siguiente.
- Ejecutar tests, lint y build.
- Revisar escritorio y movil en navegador.
- Revisar diff y abrir PR.
- Publicar solo con aprobacion aplicable al sitio publico.
