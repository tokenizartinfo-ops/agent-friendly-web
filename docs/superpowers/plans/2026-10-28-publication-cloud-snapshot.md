# Plan: snapshot público cloud
> REQUIRED SUB-SKILL: superpowers:executing-plans. Root implementa, un revisor final fresco.
**Goal:** Transferir el paquete público de PR623 sin archivo ZIP en el PC.
**Architecture:** Validador/encoder puro + job Git Data main-only create-only.
**Tech Stack:** Node22/GitHub Actions/github-script, sin deps nuevas.
**Spec:** docs/superpowers/specs/2026-10-28-publication-cloud-snapshot.md
## Global constraints
4inputs públicos; source/tree/materializerHash independientes; chunks48KiB; ref fijo derivado; sin policy, updateRef, force, runtime o credenciales nuevas.
## Review Focus
- Archivo privado extra o disguised output: whitelist/format/caps/flags.
- Drift tras await: snapshot de strings antes de hashing.
- Unicode cruza chunk: Buffer UTF8→base64 sin pérdida; SHA1 Git por blob.
- Ref existente/ACK desconocido: reconciliar tree sin sobrescribir o reintentar.
- PR/fork/artefacto ajeno: write job solo dispatchmain y artefacto del mismo run.
## Preflight
Task1 tests→Task2 export createMcpPublicPublicationSnapshot→Task3 workflow consume mismo contrato; no conflicto. El materializador puro no otorga autoridad.
### Task1 RED
- [ ] Tests de export, roundtrip, bytes/chunks, claves/archivos/caps, pins/flags/hashes, drift y getter.
- [ ] Workflow targeted tests antes de compile; observar export ausente.
### Task2 GREEN
- [ ] Helper puro y tests pasan; no escritura local del owner.
### Task3 aceptación
- [ ] Job create-only cloud con verificación de árbol/camino/hash y reconciliación segura.
- [ ] CI/review únicos, merge/mainCI.
- [ ] Dispatch main y comprobar nuevo ref/commit/blob hashes sin descargar paquete al PC.
## Ledger
PR623 fuente aceptada, runtime congelado60d/2033 sigue cerrado según8GET28oct12:03UTC; source623mainCI pendiente al redactar. Trabajo sobre fuente no abre grant, consumidor o reserva. User Chrome ya responde y tarea de correo recibió apéndice de paginación/silencio verificado; no es la suscripción AFW.
