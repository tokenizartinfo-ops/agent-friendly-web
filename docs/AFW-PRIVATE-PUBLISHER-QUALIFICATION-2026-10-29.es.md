# Cualificación privada del publicador — 29 de octubre de 2026

## Evidencia remota conservada
El guardado humano y Done quedaron comprobados; no hacen falta nuevas claves.
PR634, fuente ba8ef497 (árbol7648803), merge bdfba0bf. CI40872367900 y CI40873831092 pasaron; 3205 pruebas, cero fallos, un skip; lint sin errores.
Paquete12895314978/run40872367965: index.js428387 bytes, SHA256 e648328bc26f15dcf16edfa6da3590eee1fe17110f52ea1c2738d88eb15719eb.

La instancia afw-publisher-probe-20261029-aca80d7d ejecutó una vez de12:37:30.726 a12:37:35.790UTC, Workflow5699a1c4-bac9-4a42-aac2-2de4d65d73cc, paso único/retries0. Plan aca80d7dc9e89424e7d66d0aad27167e9fdbac44ed153afb3d3fda61c98009f9, ventana original12:36:17.660–12:46:17.660UTC; consumido, nunca repetir. Salida original uncertain/mayRetryfalse: doce lecturas matched200, POST200/mismatch, sin selectedDeploymentId. Se conserva ese resultado.

La conciliación primaria independiente encontró DEPa15651a3-f7a4-4ce5-996e-bcc4b6db1784, creado12:37:35.181587UTC y anotado con ese hash. Mantiene6a0c97e9-4ab3-4876-9a5e-5fdfa7992377@100%, módulo1fb741e5/configdcedc6ca,29bindings y8flagsfalse. La clave sirvió para esa reselección cerrada; no equivale a un recibo qualified emitido por la sonda.

## Diagnóstico y reparación acotada
La sonda exigía selección y anotación completas dentro del ACK; nuestras respuestas administrativas observadas tampoco expusieron versions. No hace falta asumir una avería del proveedor ni cambiar permisos. El restaurador real ya acepta UUID de ACK y verifica la selección en la lectura primaria posterior.
La reparación conserva UUID nuevo obligatorio, rechaza contradicciones si el ACK expone estrategia/selección/anotación y exige GET posterior con ese UUID, versión100% y anotación exacta; luego versión cerrada y ausencia de Containers activos. Un ACK mínimo nunca es una aceptación operativa.
Prueba RED: fixture de ACK reducido al id, misma selección primaria; agregar negativos de primary readback ausente, UUID/versión/anotación incorrectos y compatibilidad de ACK completo. GREEN: cambio mínimo del validador; presupuesto/diario/cierre/secretos/lector sin cambios. Ejecutar CI remoto, revisión independiente y conservar evidencia en el PR. No repetir el plan consumido para probar el arreglo.

## Cierre y continuidad
QA volvió a e6de8be4-d74f-47a0-be40-5c3505e17979@100%, DEP7aa5344d-03ca-4aa3-b957-be7e7a1881a1. Lectura12:38:52UTC:18bindings/3secretos/5flagsfalse/políticasvacías/sinContainer; configuración2468084bc5c3bc1fd6c0cc0665eb27e93b15e0b0fba14d87bd3770bda4417f2c. Operador855dc5c1/DEP55194430 sin cambios. Cron/tails[] de los tres; cero Containers activos.
Historial/custodia: issue497, comentarios6496071408/6496801013/6496856004 y resultado posterior. El nuevo ID de despliegue canary invalida planes que fijaban DEP0fcdb8a7; no modificarlos retroactivamente.
Quedan separados: restauración desde ventana real, suscripción, entrega útil, revisión cloud, retiro de lectura/avisos, baja nativa/parada y PC-off acordado. operationalReadiness=false. Sin clientes, OTP, nuevas claves ni automatización permanente.
