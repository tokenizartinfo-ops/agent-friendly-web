# AFW: disparo cloud actual aceptado y retirado

Evidencia del 8oct2026. PROJECT AFW; REPOSITORY tokenizartinfo-ops/agent-friendly-web; ENVIRONMENT AFW Operations/QA propia; ORIGIN chatgpt.com; RESOURCE_TYPE automation; RESOURCE_ID6ac77c146ca88191b63503ae05249149. ALLOWED_ACTION una ocurrencia de preflight sin HTTP ni datos de clientes. ROLLBACK deshabilitar la propia programación y comprobar nextnull. Recursos Workers/Access/D1 no se modificaron.

## Programación y hora

La automation quedó vinculada al chat actual01a118b0-ff72-70d4-937f-b87bc251c03b/hostdurable. No se reutilizó la histórica dirigida a otro chat.

El update11:30UTC con sufijoZ fue normalizado sinZ; la UI mostró11:30GMT-3. Esa prueba se pausó antes de ejecutarse. Corrección mediante UI: 8oct08:45GMT-3, repeticiónfalse. Backend confirmó DTSTART con TZID America/Buenos_Aires y target exacto. Antes de dispararse, enabledtrue con next_run_time y last_run_time nulos. Por ello nextnull no permite diagnosticar por sí solo ausencia del scheduler; la ejecución debe observarse.

## Ejecución independiente

No se envió una orden manual entre11:31 y el disparo. El turno01a11b55-8f3f-72ef-b15f-49620e96f59d recibió el prompt programado, inició11:45:54UTC y completó11:46:17UTC. El last_run del servicio quedó2026-10-08T11:45:55.035402Z, aproximadamente55s después de la hora fijada; no se promete precisión instantánea.

read_thread comprobó una consulta environment_status y exactamente tres órdenes Git, todas exit0:

- HEAD4d424cf2c1b117bf42069532f9ce19747e649078.
- Origin https://github.com/tokenizartinfo-ops/agent-friendly-web.git.
- git status --porcelain vacío.

Estado del entorno reportado: configcecfg_6abe6b6814a481a3aa2299efe46e2fe6/publicacióncecfgver_6ac6d4019d8c81a3a2bc32cf5d3b1343 coinciden; running/connected, observaciones55/55/currenttrue, restricted/enforced,10/10 custodiasready, incluidos ambos bindings Operations. No lectura de valores ni HTTP al manager. El turno no acredita metadata de modelo, orientación personalizada, ensayo integrado ni PC-off: ordenador encendido.

## Retirada y continuación

Turno de cierre01a11b57-a9d2-775d-a0c3-53ce0b84dadc confirmó por peek ID/target exactos, enabledfalse, nextnull y el last_run anterior. La ficha UI mostró Completado. Sin otra programación ni guardia permanente. Continuidad cloud en /workspace/work/continuidad-afw.md; evidencia visual local de hora corregida en output/afw-scheduler-local-time-20261008.jpg.

Próximo gate: ejecutor de una ocurrencia con checkpoints exclusivos, límite de tres solicitudes y plazo comprobado antes de cada envío; después nueva publicación/adopción y ensayo propio integrado con cierre independiente. La revisión10 aceptada no se repite. Max sigue pendiente de preview aprobado, ingreso y consentimiento propios.
