# Block 5C: controlled sandbox local gate

**Fecha:** 2026-08-31  
**Estado:** release candidate local; proveedores remotos deshabilitados

## Que se implemento

- contrato `agentfriendly.controlled-connector-run.v1` ligado a capsula, comparacion, plan y manifiesto;
- provider unico `ephemeral_memory` y environment `local_sandbox`;
- seleccion allowlisted de un solo canary: `/llms.txt` o `/llms-full.txt`;
- validacion de aprobaciones, vigencia, hashes, contenido, origen y ausencia de secretos probables;
- dry-run sin escritura;
- apply con confirmacion expresa, backup interno y verificacion SHA-256;
- replay idempotente;
- rollback con confirmacion, restauracion y verificacion;
- rechazo de rollback cuando el canary diverge fuera del conector;
- recibos metadata-only con `remoteMutation=false`;
- laboratorio privado comic en espanol, ingles y portugues.

## Frontera comprobada

El adaptador vive dentro de la memoria del navegador. No usa `fetch`, filesystem, D1, cookies, storage persistente, API de proveedor, credenciales ni Secret Broker. No puede crear PR, hacer merge, entrar en WordPress, publicar archivos, modificar DNS o enviar una tarea A2A.

La revision de capsula muestra el laboratorio solo cuando existe comparacion completa y plan tecnico preparado. El propio contrato vuelve a validar capsula y aprobaciones antes de preparar el run, por lo que la UI no constituye autorizacion.

## Pruebas

- pruebas Block 5C: **8/8 PASS**;
- regresion completa: **255/255 PASS**;
- `npm run lint`: **PASS**;
- `npm run build`: **PASS**;
- QA visual Chromium: `1440x900` y `390x844`;
- QA de flujo: dry-run, apply, replay, rollback y divergencia cubiertos por pruebas ejecutables.

La ruta sintetica usada para la captura local se elimino antes del build final.

## Lo que no se autoriza

- deployment remoto de esta rama;
- tablas o migraciones D1;
- GitHub App, WordPress, CMS, SFTP, cPanel o Cloudflare Bridge;
- provisionamiento o lectura de secretos;
- escritura sobre un dominio real;
- Agent Card A2A, tool MCP mutante, CLI mutante o pagos.

## Siguiente gate

Elegir un solo entorno de prueba no critico y un adaptador real. Antes de escribir requiere capacidad de corta duracion en Secret Broker, scope de una ruta, backup externo verificable, rollback probado, auditoria, observabilidad y aprobacion separada. El candidato recomendado sigue siendo un Draft PR de GitHub sin merge antes de un CMS directo.
