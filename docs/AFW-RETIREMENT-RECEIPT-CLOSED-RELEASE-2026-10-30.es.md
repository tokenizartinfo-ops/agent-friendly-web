# Publicación cerrada del recibo de retirada · 30 de octubre de 2026

La fuente PR650/main `2a4773737764c5038aaa0b3528b43df2a0572441`, árbol `637af253296ac1c771cb73ea353cb960a2e59204`, quedó publicada cerrada. CI41083490853: 3405 PASS, 0 FAIL, 1 skip previo; lint/build PASS. No acredita el ensayo de eventos ni PC-off.

## Procedencia y publicación nativa

Template público: build41083761960, snapshot create-only10eef3fcb153604c6386d917fe0c6079516055f8; template SHA2562352bf84b0a57b42e629fb05e2de6f3d9398735ae172e3be73193be03b927c97. Solo se materializó una política finita de publicación cerrada; no se publicó ni ejecutó el seed0/1.

Instancia administrativa única `afw-release-75aeadd3126da4b98c93b51d34bc4e96f048811075fa87506c581f5e9df7c4cb`, Workflow93ffdb6d-7b78-44ea-875b-17c2ab785a37: un step/un intento, sin retries, 16:03:49–16:03:52 UTC. Resultado confirmed/mayRetryfalse. No volver a ejecutar ese plan.

Journal D1 primario: un intento/un recibo de publicación para `ff3fa4b405b9009466253f2af0c0a6a2a11ac769cc324df1d1a817d575a4a991`; source/tree anteriores, programa `f6f517c3ac135cfa7b9853137e0487f768b8f24a11e24959a337cac4e28d42e6`, Worker `315cc3b310767bafe6c7928822b5acb8ec5ad168e21d94a55e6fea26592e46d3`, versión `2607abae-cec3-4e35-89eb-8b8572262b54`, etag `a37098a6631619e93725132f988d12eec65841d5b6f249155621c396127d792e`. El recibo no concede autorización de despliegue o arranque.

## Lectura independiente y cierre

Módulo index.mjs comprobado desde la API de módulos: 1830202 bytes / SHA256 `315cc3b310767bafe6c7928822b5acb8ec5ad168e21d94a55e6fea26592e46d3`. Los29bindings, exports, Containers, env, compatibilidad y configuración coinciden con el baseline4713257a-f1ec-42b0-8381-c974a55ede39. Canary seleccionado al100%: `2607abae-cec3-4e35-89eb-8b8572262b54`, deployment2d4de18a-3e02-40ab-981e-1a46ceb8fb60, ocho flagsfalse. Baseline4713257a conservado para rollback; sin cambios de esquema, namespace o historial.

QA cerrado78af4f79-4c44-4b6b-9b67-bf50e4613c7f/deployment4b04aa22-74e2-49d4-960a-916fec8f6ea8, build41083490837; index.js462861bytes/SHA256a7d40b811f8817ffeb895f0b95ff7c83f8bea987b17987f8d4640f7b7e5916f7; 20bindings y seis flagsfalse. Bootstrap cerrado43349d87-2202-4c9e-a246-0d985afb90be conserva límites10000steps/retención30d. Rollback97de2c98-58a6-4a0f-940a-9ace2234ad8a disponible.

Operador restaurado EXACTO855dc5c1-e757-49aa-a6f5-cb02f8d03ea4/deployment6d31bf13-e296-42d2-b4f2-03cdbd9a5375; módulo1971922bytes/SHA25631f28ee68c870450c6b814fa3713f02ad7233500552157915a7bd2e928777b51, siete bindings y tres flagsfalse. Definición administrativa cerradaeab24247-069f-4625-98ba-a2016a2be81b conserva1step/concurrencia1/retención3d. Se heredaron secretos por versión explícita, sin leerlos ni rotarlos.

Lectura primaria 2026-10-30T16:04:55Z: cron/tails vacíos en los tres Workers; Container propio sin instancias activas; ningún Workflow no terminal. Evidencia fechada, no garantía futura. El Workflow de publicación terminó; no implica ejecución permanente.

## Continuación y límites

El pin congelado solo avanza después de este recibo y la lectura independiente. El paquete named debe reconstruir esta fuente con su lockfile y verificar bytes/procedencia antes de su uso; el operador del paquete puede tener una revisión posterior y distinta de la del artefacto. Nunca seguir main por conveniencia ni volver a los planes consumidos.

Pendiente: paquete named actualizado, preparación completa del guard y rollback independiente, nueva ventana sintética con consentimiento, confirmación/reserva única, suscripción/entrega/revisión útil, retirada nativa, parada física sucesora y restauración comprobadas. Después corresponde el intervalo acordado con PC apagada; Max requiere su preview/consentimiento propio. No repetir OTP, pegados o rotaciones aceptadas por este documento. `operationalReadiness=false`.

Evidencia canónica: issue497 comentarios6527210028,6527281088 y6527344546.
