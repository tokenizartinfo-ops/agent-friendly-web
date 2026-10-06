# Assistance feedback implementation plan

**Goal:** Mostrar una constancia real de revisión en el expediente sin acceso privado para el gerente.
**Architecture:** Canal firmado por service binding, recepción de metadata terminal y constancia privada owner-scoped. Cerrado por defecto y ventana finita.
**Spec:** docs/superpowers/specs/2026-10-06-assistance-feedback-design.md
**Execution:** Implementación secuencial por el agente actual; sin subagentes. Autonomía explícita del usuario prevalece sobre nuevas pausas administrativas.

- [ ] Contrato/firma/ingress y productor de constancias; escribir pruebas fallidas, implementar, comprobar correlación y retirada.
- [ ] Tabla privada additive, API owner-scoped opcional y lector cliente estricto; pruebas de aislamiento, no acceso con flag cerrado y revisión obsoleta.
- [ ] Interfaz sencilla con fecha y siguiente paso enumerado; no resolved/response falsa. Consulta manual.
- [ ] Ensayo native workerd/D1, lint/build/suite, documentación y revisión diff.
- [ ] Integración y despliegue cerrado con rollback verificado; aceptación propia aparte, nunca promoción por inferencia.
