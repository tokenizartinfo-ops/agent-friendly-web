# Plan: retirada exclusiva de permisos

Preparación AFW exclusivamente; GitHub/Actions, sin builds ni dependencias locales.

- [x] Leer helper y consumidores actuales, definir contrato de recibo y límites; revisión de diseño independiente aceptada.
- [ ] Crear rama remota desde main aceptado e incorporar pruebas de constructor/nativo. Observar RED de función faltante y baseline legacy.
- [ ] Extraer núcleo privado con selección interna fija. Conservar semántica legacy y omitir completamente la parada en el wrapper nuevo.
- [ ] Dirigidas nativas + suite + lint/build/paquetes. Revisar evidencia real y límites.
- [ ] Revisión independiente; resolver hallazgos, integrar head exacto y guardar continuidad.

No montarlo en HTTP/RPC ni agregar binding o abrir permisos. La integración QA/generaciones/version metadata/restauración fallback y el nuevo ensayo humano siguen separados.
