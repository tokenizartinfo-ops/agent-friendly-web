# Plan: plantilla de publicación privada
> REQUIRED SUB-SKILL: superpowers:executing-plans. Root en línea; un revisor final fresco de toda la rama.
**Goal:** Preparar en cloud un publicador sin plan vigente ni archivos privados en Git.
**Architecture:** Adaptador puro específico + builder existente + empaquetado build-only.
**Tech Stack:** JavaScript/esbuild/GitHub Actions, sin dependencias nuevas.
**Spec:** docs/superpowers/specs/2026-10-28-private-publication-template.md

## Restricciones globales
2097152bytes script;65536policy;600000ms máximo; RELEASE_TARGET fijo; builder solo0→1; confirm_named intacto; fuente remota aislada.
## Review focus
- Hash independiente/manifest mutado durante await: capturar antes de hashing.
- Cambio de artifact durante esbuild: snapshot antes del await.
- UTF8 y expansión del literal: límites también del resultado.
- Confundir formatos/policy/capacidad: negar operación/target distintos y nunca declarar autoridad.
- Workflow público: sin policy, index materializado, secrets, deploy o invocación.

## Interfaces y preflight
Task1 produce tests/design; Task2 consume el contrato y exporta buildMcpPrivatePublicationTemplate/materializeMcpPrivatePublication; Task3 consume los exports para empaquetado. Sin conflicto: el workflow solo usa el seed inerte, y no modifica el builder de confirmación.
### Task1 — RED
- [x] Añadir tests de presencia, omisión, materialización, pins, formato, digest, Unicode/bytes, JSON no canónico, secretos/getters, drift y seed vivo.
- [x] Commit y Actions: esperar fallo de export ausente, no error de sintaxis.
### Task2 — implementación
- [ ] lib/mcp-private-publication-template.mjs: ensamblado puro y formato propio.
- [ ] scripts/build-mcp-release-operator.mjs: nuevo builder/export, sin modificar confirmación.
- [ ] Pasar tests y lint/build.
### Task3 — paquete y cierre
- [ ] scripts/build-mcp-private-publication-template.mjs y .github/workflows/afw-publication-template-build.yml: source-before/after, materializer, manifest, hashes, artefacto público.
- [ ] CI/paquete verdes; revisión final única y corrección material RED→GREEN si corresponde.
- [ ] Merge/main CI y checkpoint issue497. Sin mutación runtime ni grant nuevo.
## Ledger
Owner renueva autorización amplia28oct; se conserva la separación entre preparación y ensayo real. Chrome permitió navegar a scheduled manualmente y luego volvió a aceptar clics. Se observó AFW seguimiento horario de correo y dos FCO pausados; no se cambió ninguno. No hay prueba AFW nativa de Stop monitoring ni baja aún. Runtime cerrado60d/operador2033 según lectura primaria10:03UTC; no se asume vigencia para futuras mutaciones.

RED37831093 /CI40682258985/job122795661061: export undefined frente a function; fallo esperado antes de implementación, sin error de sintaxis. El resto de casos nuevos queda omitido hasta que exista el contrato.
