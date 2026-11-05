# Preflight de diseño — finite owner I/O fanout

5 de noviembre de 2026. **DESIGN ONLY / INACTIVE.** Autorrevisión documental, sin pruebas, builds, implementación ni segunda revisión independiente. Root eligió preparar la opción conservadora de concurrencia fija; no se declara aprobación final del usuario/root ni se despacha al escritor de producto.

PROJECT=AFW; REPOSITORY=tokenizartinfo-ops/agent-friendly-web (ID1347578006); ENVIRONMENT=GitHub docs; ORIGIN=https://github.com/tokenizartinfo-ops/agent-friendly-web; RESOURCE_TYPE=docs branch; RESOURCE_ID=docs/finite-sdk-io-feasibility-20261105; ALLOWED_ACTION=agregar exclusivamente spec, plan y este informe mediante expected-head CAS desde ce516e327f58b29cd3392a1f4b754382a39e6b90; ROLLBACK=revert documental de este commit, conservando la auditoría anterior. Ninguna rama de producto ni recurso Cloudflare es destino.

## Resultado del preflight

Se preparó una sola unidad de implementación rechazable: **dos credenciales concurrentes verificadas completamente→join→dos ramas QA/M concurrentes→join→validación común**, dentro del mismo primary privado. Plan y spec permanecen inactivos, a decisión root y posible despacho posterior a la aceptación SOURCE de D0.3. No se contactó ni siguió al escritor D0.3.

Fuentes inspeccionadas al pin **d630a99d8bd30bbeaa5606a89dbd33ee58ce8b72**, cuya aceptación D0.2 fue comunicada por root: phase-context, initial-lease, stage-work y fixtures/tests de SDK, phase y request retention necesarios para definir puntos causales. package.json se leyó para verificar comandos Node/lint. No se consultó ni ejecutó AFW/Cloudflare, no se corrieron tests y no hubo clones/instalaciones/procesos locales de producto. Única lectura local: SKILL.md de writing-plans, requerida para el formato del plan; no se modificó el PC.

- [Especificación](../specs/2026-11-05-finite-owner-io-fanout.md).
- [Plan con una tarea y ciclo RED→GREEN→hostiles→regresiones→review/commit](../plans/2026-11-05-finite-owner-io-fanout.md).
- [Auditoría causal previa](2026-11-05-finite-sdk-child-io-feasibility.es.md), sin modificación.

## Rulings de diseño sustentados en fuente

1. **No cambiar lease ni stage-work.** [initial-leaseL12–17](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/d630a99d8bd30bbeaa5606a89dbd33ee58ce8b72/lib/mcp-qa-finite-initial-lease.mjs#L12) crea estado/timer/controller por hijo, sin slot exclusivo. [stage-workL16–23/L78–89](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/d630a99d8bd30bbeaa5606a89dbd33ee58ce8b72/lib/mcp-qa-finite-stage-work.mjs#L16) retiene múltiples promesas en el mismo scope original. Es análisis de código, pendiente de confirmar con native sibling/abort/cancel tests.
2. **Conservar lectura completa y frescura.** QA mantiene pointer→versión; M mantiene pointer→M inicial→ownedProject→M actual. Después de ambos joins se comprueba el clock/holders. Los datos intermedios son privados, no frames suministrables ni autoridad. No cache/módulos reutilizados/D1 agregado.
3. **Separar wrapper de operación real.** Dos branch promises resueltas satisfactoriamente incluyen sus request/finally completos. Un rechazo raced puede preceder a fetch/body/cancel todavía pendientes; retención original continúa. allSettled sólo organiza el join, no acredita drenaje. No siguiente snapshot/efecto con un branch fallido.
4. **Preservar volumen y límites.**112 GET por hijo completo,84 entre fechas SEND/ACK;80 SELECT factuales+16 preflight+2 writes D1 siguen igual. Profundidad provider instalada7→4 por primary y112→64 por hijo. Hijo5s/root30s/source ceiling expirado intactos.
5. **Calibración causal, no benchmark comercial.** Delay50ms sólo después de preparación genuina y GET consentimiento válido, antes del POST; Date de respuesta real tras delay. Serial nominal≥5.6s; fanout3.2s más base/DO/D1/tail, GREEN no asegurado. Si cambia el punto de fallo o no cabe, reportar y devolver decisión a root.
6. **I/O-only distinto del observador SDK.** [instrumentFiniteOwnerQaSdkL100–102](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/d630a99d8bd30bbeaa5606a89dbd33ee58ce8b72/test/fixtures/finite-owner-qa-sdk.mjs#L100) ejecuta probes adicionales strict-reader: usarlo alteraría el multiset112. El modo nuevo no los invoca ni envuelve KV/SDK. Se conserva por separado el positivo SDK sin instrumentación.
7. **Concurrencia2 de lifecycle completo.** Es deliberadamente más estricta que las [seis conexiones esperando headers del proveedor](https://developers.cloudflare.com/workers/platform/limits/#simultaneous-open-connections). No es pool dinámico ni reserva de capacidad. Los bytes/módulos/SQL no se abaratan con el schedule.

## Autorrevisión del plan

| Comprobación | Cobertura y resolución |
| --- | --- |
| Spec: scope/guards/interfaces | Global Constraints y Task1/Step3 enumeran firmas privadas, joins, valores exactos, no cambios de leases/Unit2a y two-snapshot. |
| Compatibilidad de concurrencia | Spec prueba estado child separado y retención Set/ALS; Step5 exige sibling-held, expiry, abort y cancel reales. No adaptación hipotética aprobada. |
| Calibración50ms | Step2 registra control0/RED50 sin producto cambiado; Step4 repite idéntico workload. Si no hay RED/GREEN causal se detiene la cualificación, sin fabricar umbral. |
| Datos/volumen/types | QA/M outputs coinciden con PhysicalObservation existente; tipos de IoEvent son sólo fixture. Ejecución futura debe validar bounds/decoding; no producto consume el trace. |
| Test fixture y modo anterior | Filemap cerrado de un módulo producto+tests/fixtures, defaults conservados; nuevo modo separado, fallo si se combina con observed/restart; exact-match transforms y cleanup. |
| Review Focus | Las cinco clases enumeradas en el plan tienen pruebas conductuales nombradas en Steps2/5/6, incluido SDK positivo separado. |
| Riesgos temporales | ACK timestamp se distingue de append/final recheck; medición por eventos causales completos. Deriva after-join se ubica después del primer primary para exigir que el segundo realmente la lea. No promesa TOCTOU imposible. |
| Proporción y ejecución | Una tarea, un gate de revisión; setup/pruebas/calibración no tareas de producto separadas. Regresión afectada primero y full-node final una vez vía CI autorizado, sin ejecución ahora. |

No se detectó una necesidad fuente de cambiar la frontera pública ni el mecanismo de admission/retention. **Esto es autorrevisión, no aprobación independiente ni prueba de funcionamiento.** Root puede rechazar tanto el schedule como la propuesta de instrumentación.

## Riesgos y bloqueos que quedan

- Que fanout sea válido no garantiza que los3.2s nominales de delay más hash/payload/DO/D1/SDK entren en5s. El beneficio máximo en el modelo homogéneo es1.75× para provider, no para el POST completo.
- Un branch puede seguir haciendo lecturas permitidas mientras el otro ya falló; el join nunca transforma eso en permiso. La retención real y el máximo2 deben probarse hasta cancel-settled, no sólo headers.
- Un cambio de provider después de su última lectura no puede ser detectado retrospectivamente. Se conserva la pareja de snapshots; no se promete atomicidad distribuida.
- La preparación inicial puede consumir otros plazos o fallar por fixture ajeno al hijo. La demora se activa sólo después de prepararla, y el gate distingue ese fallo de inviabilidad del hijo.
- Source instrumentation puede cambiar costo, paths o conteos. Guardar source/head y resultados del modo I/O y del positivo nativo sin wrappers como evidencia separada. Ninguna medición local/SYN acredita live.
- D0.3 puede cambiar fixtures antes del futuro despacho: root fijará BASE y el único writer conciliará el diff; este docs commit no es una rama de producto para merge funcional.
- La medición live posterior debe seguir siendo cerrada/no consumidora y expresamente autorizada; no consumir un grant, SDK attempt, Entry o ventana expirada para medir. Sigue pendiente.

**operationalReadiness=false; completePackage=false; PCoff=false.** No cambio implementado, acceso instalado, permiso ampliado, consulta operativa ni activación de este plan.
