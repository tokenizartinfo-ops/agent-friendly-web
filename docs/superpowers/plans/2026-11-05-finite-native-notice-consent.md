# Consentimiento POST — checkpoint de planificación

> **For agentic workers:** Futuro workflow superpowers:subagent-driven-development, writer único y revisión root. **INACTIVE: este checkpoint está incompleto y no autoriza implementación, agente, pruebas ni permisos.**

**Goal:** Pendiente de especificación final: POST humano de consentimiento nativo con correlación factual privada.
**Architecture:** Propuesta de reutilizar piezas GET, verificación humana nueva por POST y mismo store/witness/lease/Common/window.
**Tech Stack:** ESM, Node/Miniflare/workerd/D1/DO existentes, únicamente cloud autorizado cuando root active.
**Spec:** docs/superpowers/specs/2026-11-05-finite-native-notice-consent.md

Guardado por solicitud de Gabriel de apagar y continuar después. No tareas ejecutables a continuación: son pendientes de diseño.

- [ ] Root entrega estado/HEAD aceptado del GET; no seguir rama WIP ni inferir aceptación desde código.
- [ ] Contrastar diferencias reales respecto al pin dc4edafc0b5e4ba440cd32a21dd3dd58024e811a.
- [ ] Cerrar filemap/APIs de transporte POST y refactor privado; no tres copias genéricas ni autoridad por mode/DTO.
- [ ] Cerrar lectura body1024, parser/cookie/Origin, Access actual y vínculo de ticket original.
- [ ] Especificar baseline privado POST y correlaciones de eventos en ambos snapshots; público3keys/OAuth/GET no se relajan.
- [ ] Especificar secuencia observe→SEND→insert→ACK y rechecks con Promise SQL real, failure latch, unknownACK y retención.
- [ ] Determinar campos EventRow/sequence real/expiry original y reducción conservando historia.
- [ ] Fijar RED causal y GREEN mediante GET real previo, JWT SYN firmado/CSRF real/D1DO nativos; ninguna fila positiva prefijada ni verifier/source/snapshot fake.
- [ ] Seleccionar regresiones con nombres literales realmente presentes, verificar no0match y medir nuevas lecturas sin repetir50ms/allSDK/builds sólo para métricas.
- [ ] Completar informe/spec/plan y obtener preflight root con BASE futuro, permiso cloud/qualifier y rollback específicos.
- [ ] Sólo una activación posterior explícita podría iniciar implementación.

No implementar desde este archivo. Estado final del checkpoint: diseño parcial preservado y trabajo detenido. operationalReadiness=false; completePackage=false; PCoff=false.
