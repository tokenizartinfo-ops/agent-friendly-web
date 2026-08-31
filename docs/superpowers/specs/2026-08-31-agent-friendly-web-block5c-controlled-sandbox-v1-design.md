# Agent Friendly Web Block 5C: Controlled Sandbox Connector v1

**Fecha:** 2026-08-31  
**Estado:** arquitectura aprobada para implementacion local

## 1. Objetivo

Probar de punta a punta el contrato de un conector mutante sin escribir en GitHub, CMS, hosting, DNS ni dominios reales. El owner debe poder comprobar visualmente dry-run, canary, verificacion, backup y rollback sobre un filesystem efimero del navegador.

## 2. Decision

Se implementara un **adaptador de memoria efimera** y no un filesystem real ni un proveedor remoto. Esta opcion valida la maquina de estados y la experiencia humana, funciona en ES/EN/PT y no introduce secretos, red, D1 o permisos adicionales.

Alternativas descartadas en este gate:

- GitHub App real: requiere instalacion, Secret Broker y aprobacion remota separada.
- WordPress o CMS real: requiere backup externo verificable, scope de escritura y entorno de prueba del proveedor.
- Worker con token de proveedor: agrega custodia de capacidades antes de validar el flujo humano basico.

## 3. Frontera

El conector acepta solo:

- capsula `agentfriendly.publication-capsule.v1` vigente y `approved_for_manual_handoff`;
- todas las aprobaciones humanas requeridas en estado `approved`;
- comparacion `agentfriendly.origin-comparison.v1` completa y ligada al mismo manifiesto;
- plan `agentfriendly.draft-pr-plan.v1` con `remoteSubmission=false`, `mergeAllowed=false` y `prepared_not_submitted`;
- un unico archivo `create_or_replace` con destino `/llms.txt` o `/llms-full.txt`;
- contenido cuyo SHA-256 coincide con la capsula y no contiene secretos probables.

Rechaza merge manual, JSON-LD embebido, multiples escrituras, rutas no allowlisted, hashes inconsistentes, capsulas vencidas o rechazadas y cualquier proveedor distinto de `ephemeral_memory`.

## 4. Contratos

### Run

`agentfriendly.controlled-connector-run.v1` conserva `runId`, referencias de capsula/comparacion/plan, manifiesto, origen, canary path, hashes, provider, environment, limite de una escritura, rollback obligatorio y `remoteMutation=false`.

### Receipt

`agentfriendly.connector-receipt.v1` registra `dry_run_ready`, `applied_to_ephemeral_sandbox` o `rolled_back`, hashes anterior/propuesto/resultante, fecha, idempotencia, verificacion y ausencia de mutacion remota. Nunca incluye contenido, email, credenciales o backup literal.

## 5. Maquina de estados

1. **Preparar:** valida todas las fronteras y genera un run determinista.
2. **Dry-run:** compara el estado sintetico con el archivo propuesto sin escribir.
3. **Confirmar canary:** requiere una accion humana expresa en la UI.
4. **Aplicar:** guarda backup interno, escribe exactamente un archivo y verifica su hash.
5. **Rollback:** restaura el estado previo o elimina el archivo si antes no existia; verifica el resultado.

Repetir apply o rollback con el mismo `runId` es idempotente mientras el estado no haya sido alterado fuera del conector. Una divergencia falla cerrada.

## 6. Interfaz

La revision privada de la capsula incorpora un panel comic llamado **Laboratorio del conector**. Aparece solo cuando existe un plan y una comparacion completa. Explica que opera sobre una copia efimera, muestra el archivo canary, las aprobaciones y cuatro pasos visuales: validar, dry-run, aplicar y deshacer.

La UI conserva la paleta blanco/negro/sepia, iconos Lucide, botones accesibles y texto normal para hashes. Se localiza integralmente en ES/EN/PT.

## 7. Seguridad

- cero `fetch`, sockets, filesystem, D1, cookies o storage persistente;
- cero entrada de credenciales o aliases de secretos;
- una ruta y una escritura maxima por run;
- confirmaciones separadas para apply y rollback;
- recibos metadata-only;
- `remoteMutation=false` no es configurable por el navegador;
- no convierte el conector en MCP mutante, A2A, CLI mutante ni capacidad F5.

## 8. Pruebas

- RED/GREEN para contrato, aprobaciones, allowlist, hashes y secretos;
- dry-run no mutante;
- canary de una sola ruta;
- apply y rollback verificados e idempotentes;
- fallo ante divergencia;
- UI y copy ES/EN/PT;
- regresion completa, lint, build y QA visual `1440x900`/`390x844`.

## 9. Gate siguiente

El cierre local no autoriza despliegue ni proveedor real. El siguiente gate requiere elegir un entorno de prueba, definir capacidad en Secret Broker, backup externo, rollback probado, observabilidad, aprobacion separada y primera escritura no critica con trafico cero o equivalente.
