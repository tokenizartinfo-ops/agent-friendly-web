# Plan de ejecución: historial conocido de cancelaciones

Base main4a5c38c46bd1439bf7459e9d737dfc5e08f0e883. Rama cloud aislada feat/known-cancellation-reservation-20261030. GitHub Actions; sin dependencias/builds locales.

- [x] Identificar evidencia primaria, invariantes y aprobar diseño técnico bajo delegación vigente del owner; revisión previa del diseño de integración.
- [x] Añadir prueba D1 nativa con esquema real, historia inmutable y matriz de denegación. RED funcional observado 41112733345/job124258984435 (16PASS/4FAIL) y matriz ampliada 41112970030/job124259818279 (26PASS/5FAIL), con baseline legacy positivo. El primer run tenía errores de fixture y no se usa como evidencia funcional.
- [x] Implementar parser de JSON acotado y predicado SQL V2 solo por constructor privado con authorize. Mantener SQL legacy sin cambios cuando falta argumento.
- [ ] Ejecutar nativas dirigidas, suite completa, lint/build y paquetes de Actions. Corregir únicamente hallazgos observados.
- [ ] Revisión independiente de la rama completa, resolver hallazgos, integrar con head exacto y checks verdes.
- [ ] Guardar continuidad y gates del futuro confirmador QA. No desplegar ni reservar remotamente.

## Fuera de alcance

Generaciones del guard, nuevo Workflow QA, nuevo binding D1/version_metadata y prueba de procedencia real, fallback de permisos sin admisión y ensayo humano nuevo se preparan después. No consumir nuevos grants mientras estos gates sigan pendientes. OperationalReadiness=false.
