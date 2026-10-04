# AFW Operations: inventario de capacidades — 2026-10-04

Inventario acotado solicitado por el owner. Una herramienta expuesta no acredita permiso, funcionamiento, guardia continua, vínculo del scheduler ni aceptación con PC apagado. Sin ampliación de permisos, requests AFW, lectura de valores secretos, tests repetidos, cambios productivos, PR o deploy.

## Verificación actual

Skill cloud-environment-runtime leída. Observaciones actuales del runtime:

```json
{
  "environment_id": "ccarenv_b64_Y2NhcmVudl9lMDBhZjkyZDEwZDA4MTkxYjkyOTMxZTg1MjM1MDFhMg",
  "source_config_id": "38a3072b-f1e2-410e-9272-3c7e7eb434cb~cecfg_6abe6b6814a481a3aa2299efe46e2fe6",
  "source_config_version_id": "38a3072b-f1e2-410e-9272-3c7e7eb434cb~cecfgver_6ac2c8a0b3bc81a3a46a96f7bf01b914",
  "spec_revision": "5",
  "observed_spec_revision": "5",
  "observations_current": true,
  "provider": "cloud",
  "desired_phase": "running",
  "observed_phase": "running",
  "failure": null,
  "connectivity": "connected",
  "network_policy": {
    "mode": "restricted",
    "state": "enforced",
    "allowed_hosts": [
      "github.com",
      "mail-consumer-canary.agentfriendlyweb.dev",
      "operations-manager.agentfriendlyweb.dev",
      "registry.npmjs.org"
    ],
    "presets": []
  },
  "capabilities": []
}
```

Solo metadata de custodia; no contiene valores de credenciales. Ready acredita preparación observada, no autorización ni funcionamiento de una API. El nombre AFW Operations está documentado en el recibo del repositorio; environment_status no expone una etiqueta de nombre.

Stdout saneado de versiones, origin, HEAD y presencia:

```text
v24.19.0
11.9.0
git version 2.52.0
gh version 2.46.0 (2025-01-13 Debian 2.46.0-3)
https://github.com/cli/cli/releases/tag/v2.46.0
https://github.com/tokenizartinfo-ops/agent-friendly-web.git
d405902aa669e263b260b150ff785380ce30c104
PRESENT AGENTS.md
PRESENT docs/AFW-CLOUD-PUBLICATION-RECONCILIATION-2026-10-04.es.md
```

git status --porcelain=v1 --untracked-files=all no produjo líneas: árbol limpio. No se hizo fetch ni switch en este inventario.

## Grupos expuestos y alcance probado

| Grupo | Expuesto | Probado en este chat | No probado / ausente |
| --- | --- | --- | --- |
| Filesystem / Git / exec | exec_command, write_stdin, apply_patch, download_file, view_image; Git y gh mediante shell | Lecturas locales, versiones, origin/HEAD/limpieza; fetch canónico y switch detach en el bloque anterior; escritura del presente informe fuera del repo | gh autenticado no probado; write_stdin/download_file/view_image no probados. No se presupone persistencia entre snapshots |
| Entorno / lifecycle | mcp__codex_apps__cloud_environment_environment_status, wait_for_environment | Status y espera de arranque completados | No hay herramienta expuesta específica de publicación, restart, selección o reconfiguración cloud |
| Programación | mcp__codex_apps__automations_create, automations_update, automations_peek, automations_list, automations_run_now | create devolvió success; run_now devolvió 404 antes de invocación | list/peek/update no probados; ningún parámetro environment_id/thread_id en create ni selector de entorno. No ejecución acreditada |
| GitHub | 89 herramientas mcp__codex_apps__github_*; lecturas de repositorio/archivos/commits/PR/CI y mutaciones | Transporte git fetch de origin en bloque anterior | Conector GitHub y permisos efectivos no probados en este inventario; mutaciones no autorizadas por exposición |
| Browser | Ninguna herramienta de browser expuesta | Ninguno | Browser/Chrome/Playwright no acreditados. open_in_codex expuesto es apertura de panel, no control de browser; capture_screen_context restringido a voz, no usado |
| Secretos / custodia | Metadata de bindings y readiness mediante environment_status | Cuatro bindings ready; sin valores leídos | No herramienta específica de custodia/rotación AFW expuesta; configuración y secretos no modificados. Herramientas de claves/Sites de otras superficies excluidas |
| Memoria / continuidad | Archivo local; skills__read/list; codex_app__read_thread, wait_threads, list_threads, list_archived_threads, list_artifacts | Skill, instrucciones y recibo leídos; informe guardado | Herramientas de chats/artefactos no probadas; no herramienta dedicada de memoria expuesta ni garantía de persistencia de este archivo |
| Delegación / coordinación | collaboration.spawn_agent, followup_task, send_message, interrupt_agent, list_agents, wait_agent para subagentes; codex_app__read_thread/wait_threads para seguimiento | Ningún subagente creado ni mensaje enviado | No send_message_to_thread, create_thread, fork_thread o handoff_thread expuestos. collaboration.send_message requiere agente del árbol y no permite direccionar por ID de chat local |

Las herramientas de automations requieren title/prompt para create; schedule VEVENT o dtstart_offset_json para el momento, y admiten default_timezone/timing_mode. update/run_now requieren jawbone_id. Las herramientas de Pages/Sites programan sus propias superficies, no acreditan vínculo con este entorno y no se llamaron.

## Problemas y evidencia pendiente

- Snapshot anterior restaurado: antecedente informado/documentado. La referencia publicada por sí sola no actualizó el checkout; el cierre anterior requirió fetch/switch no destructivos. Hoy el checkout sigue en la revisión mostrada por Git. No se deduce persistencia futura.
- Preflight único existente: 6ac2d48cd44c81919c0717f12a720ff9, título «AFW — preflight de entorno cloud», correlación afw-hosted-preflight-20261004-01.
- create devolvió thread_id 01a1090b-8557-7242-9bc9-8277bb300018, conversation_id null, next_run_time null, is_enabled true; sin environment_id.
- VEVENT único DTSTART:20261004T224952Z, equivalente a 19:49:52 GMT-3, zona America/Buenos_Aires, sin RRULE.
- run_now: HTTP error prior to action invocation, HTTPException 404: Action not found; error_code NOT_FOUND. Sin run_id, chat destino de ejecución ni stdout del preflight.
- UI «Ejecutar ahora» aún sin ejecución acreditada, según contexto recibido; no se inspeccionó browser.
- El preflight sigue pendiente de evidencia en este informe; no se consultó su estado ni se duplicó/reintentó. No se afirma que la hora futura implique ejecución efectiva.
- 776 tests/CI recientes informados por el owner; no se repitió suite ni se verificó CI por red en este bloque.

## Próximos cierres propuestos

1. Recoger el resultado del único preflight existente y cotejar environment_id, origin, HEAD, presencia y correlación; aceptar BINDING_UNAVAILABLE como falta de vínculo, sin scratch ni sustitutos.
2. Si falta resultado, registrar la limitación del scheduler con la evidencia existente; no crear otra programación ni repetir run_now automáticamente.
3. Mantener coordinación mediante este informe y respuesta al chat local 01a0c10a-1966-7fc0-bece-3a2b432e33f7. No hay herramienta de enviar mensaje a ese chat/root expuesta aquí.
4. Solo tras una ejecución hosted con vínculo comprobado plantear otra aceptación explícita. No reabrir credenciales, repetir transporte/vencimiento aceptados ni acreditar gerente/PC-off.
