# SDD ledger — plan: docs/superpowers/plans/2026-10-25-private-confirmation-template.md

Base ca59a68fdb7e40a714c38500c98ea8dd0a914036; rama aislada GitHub. Ningún checkout local nuevo.
Pre-flight: Task2 consume buildMcpPrivateConfirmationTemplate/materializeMcpPrivateConfirmation de Task1; firmas fijadas en spec. Task3 consume evidencias de ambas.
Rulings: ver decisiones del plan. Feature aún NO implementada; RED/GREEN pendientes. Servicios privados siguen cerrados, lectores vencen26oct02:59UTC.

Task1: RED contract written before implementation; new exports absent in existing builder. No production code written yet.
Ruling: require independent expectedTemplateHash from qualified CI receipt; a self-consistent untrusted manifest cannot authenticate itself. Risk if omitted: substituted code/data destination could be accepted.
