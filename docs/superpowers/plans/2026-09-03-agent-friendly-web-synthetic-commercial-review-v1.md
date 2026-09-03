# Agent Friendly Web Synthetic Commercial Review v1 Implementation Plan

**Spec:** `docs/superpowers/specs/2026-09-03-agent-friendly-web-synthetic-commercial-review-v1-design.md`

## Tarea 1 - Contrato en rojo

- [x] Crear pruebas del adaptador, API, vista, configuracion y contrato.
- [x] Ejecutar las pruebas y confirmar fallos por artefactos ausentes.

## Tarea 2 - Implementacion minima

- [x] Implementar lectura D1 sintetica con prepared statement.
- [x] Derivar oportunidad y transicion mediante CRM Lite.
- [x] Agregar API y vista privadas sin acciones.
- [x] Agregar kill switch apagado en todos los entornos.

## Tarea 3 - Verificacion local

- [x] Ejecutar pruebas enfocadas en verde.
- [x] Regenerar tipos Cloudflare.
- [x] Ejecutar regresion, lint, build y dry-run.

## Tarea 4 - Canary remoto

- [ ] Declarar frontera remota y rollback.
- [ ] Desplegar con interruptor apagado y probar el rechazo.
- [ ] Registrar conteos D1 antes de la lectura.
- [ ] Habilitar temporalmente solo la vista read-only.
- [ ] Verificar con Access allowlisted.
- [ ] Confirmar conteos D1 sin cambios.
- [ ] Volver a apagar el interruptor y registrar evidencia.
