# AFW: coherencia y recorrido público — plan de corrección
> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Corregir los hallazgos aprobados de #639 sin alterar capacidades privadas ni la portada aprobada.
**Architecture:** Reutilizar contratos, copys ES/EN/PT y componentes existentes. Centralizar solo las declaraciones que hoy divergen; separar ejemplo público de evidencia real.
**Tech Stack:** Node 22, React/Vinext, GitHub Actions.
**Spec:** https://github.com/tokenizartinfo-ops/agent-friendly-web/issues/639 — aprobada por Gabriel el29oct2026 en este chat.

## Global Constraints
- PROJECT AFW; REPOSITORY tokenizartinfo-ops/agent-friendly-web; ENVIRONMENT rama aislada fix/public-journey-audit-20261029; ORIGIN GitHub; RESOURCE_TYPE Git tree/commit/PR; ALLOWED_ACTION fuente, pruebas y CI; ROLLBACK revertir commits propios antes de cualquier publicación.
- No modificar imagen, permisos, secretos, datos históricos, scoring ni protocolos privados. No afirmar publicación desde CI.
- GitHub/Actions para ejecución: sin nuevo clone, instalación, servidor o build local.
- Ruling: usar este registro en Git y #639 como ledger, en lugar de scratch local de la skill; la preferencia cloud del owner prevalece.
- Ruling: la auditoría contiene el diseño y sus criterios y el owner aprobó ejecutarlos sin volver a consultar decisiones rutinarias. No repetir aprobación de diseño.
- Los ensayos privados tienen baseline, ventana y cierre separados; esta rama no los habilita.

## Review Focus
Preguntas mezcladas y negación de conocimientos técnicos; secretos junto a intención de inicio; idiomas con tildes/combinantes; diferencias ES/EN/PT; ejemplos que aparentan evidencia.

## Tasks
- [ ] 1. A2/A3: test/public-journey-audit.test.mjs reproduce el ejemplo publicado (es/en/pt + citas), variantes y palabras parciales; pregunta novata de inicio+costo en tres idiomas y guardrails. RED en CI antes de cambiar lib/intake-assistant.mjs/lib/public-guide.mjs. Luego GREEN junto a test/public-guide.test.mjs y test/intake-assistant-contract.test.mjs.
- [ ] 2. A1/A5: conciliar guía/FAQ/método con capacidades públicas fechadas; no elevar puntuación histórica. Etiquetar comparador como ejemplo/cálculo de datos no verificados en las tres traducciones. Probar la distinción A2A diagnóstico público vs delegación privada y conservar límites de pagos/mutaciones.
- [ ] 3. A4/A7: explicar acceso por invitación, ayuda real y límites del prototipo/captura; no activar correo, formularios, cuentas o tarifas. Revisión de enlaces y textos en tres idiomas.
- [ ] 4. A6: simplificar navegación avanzada y mejorar teclado/salto/landmarks preservando portada. Verificación de componentes reales 390/1440, Escape/foco, ES/EN/PT en runner aislado.
- [ ] 5. A8: reducir duplicación tocada y añadir índice breve vigente; preservar historial. Revisión independiente de rama completa, CI npm test/lint/build, preparación de release público separada de aceptación privada.

## Progress
- Base main 0be2c3eb97078f544349e2a6bf6b80b85bffe235 verificada29oct2026.
- Auditoría y aceptación #639; inicio por fallos reproducibles, sin cambiar runtime.

- Task1 RED: CI40924481591/job123626212439 on fd8fa48c reproduced four assertion failures (pt lost, variants, novice routing, action precedence);19 existing tests passed. GREEN verification pending next commit. No production change.
- Ruling: canonicalizing the historical AF-5 wording needs a separate version-aware change; do not silently reinterpret persisted scores while fixing guide routing.

- Task1: candidate cc039 CI40925042060 passed22/23 focused tests; remaining assertion was too narrow for the existing English wording “audit the public domain”. Ruling: accept both equivalent audit phrasings; do not alter product copy to satisfy a literal regex. Browser QA40925042026 passed.
- Task2: shared public capability copy now separates A2A public diagnostics from private monitoring; comparison labels fictional defaults and subsequent user inputs explicitly. Scoring/history remain unchanged.

- Task4 RED: add browser assertions for skip navigation, advanced menu Escape/focus and mobile menu Escape/focus before changing header. Ruling: preserve existing main layout and place the skip target immediately after the header; remove only the nested private main landmark.

- Task4 RED confirmed: compiled-browser run40926283505/job123632543841 failed because skip link count was0. Implemented grouped navigation, Escape/focus restoration, outside-click closure, skip target and nested-main removal. Browser checks now also cover published intake example and comparison input provenance in ES/EN/PT at390/1440.
- Task1 tests: Portuguese audit wording and accented “todavía” were equivalent-copy assertion defects; broadened only those regexes. Topic, safety, cost, evidence and length checks remain mandatory.
- Task3: public entry explains invitation email and hello@ help; standalone preparation now offers an explicit next step; disabled contact capture identifies itself as a preview before collecting anything. No backend flag or auth setting changed.
- Task2 ruling: shared product maturity labels align home and methodology; an explicit version note preserves the auditor v1 historical names and says score does not establish payments/permission. No scoring code or stored data changed.
