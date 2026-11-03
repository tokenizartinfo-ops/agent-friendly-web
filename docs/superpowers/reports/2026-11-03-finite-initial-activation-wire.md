# Datos de activación inicial, sin montar

Base 6f40c14dfb241d84f3f8565542dd3591f849494d. Código 63e159ed77d8b4eb0e0edae8337f377317c9aa18, pruebas ampliadas e391789783e8c93aab94ff942f95e0a2775d59d7, rama feat/finite-native-cleanup-20261101.

La pieza pura construye el body fijo y SEND propuesto con la versión candidata y la anotación vinculada al plan. Verifica la correlación de entrada, plan, estado inicial y arm-ack mediante los codecs existentes. Las transformaciones posteriores comprueban la forma del resultado de deployment, enlaces y límites temporales de ACK y completion, la publicación observada y los bytes/configuración de la candidata con el calificador existente.

Estas funciones devuelven datos sin efectos ni autoridad. Los tiempos y respuestas son entradas del llamador y no prueban procedencia, custodia, reloj real, persistencia, observación ni permiso. Ninguna ruta, actor o productor de producción las importa. Los timestamps de la prueba son sintéticos derivados del armado del fixture, no resultados de Cloudflare. El módulo no realiza GET, POST ni transacciones.

La prueba test/mcp-qa-finite-initial-activation-wire-native.test.mjs usa un método exclusivo del actor sintético que lee la entrada y armado reales del fixture, genera datos sintéticos de provider y comprueba que no cambian los registros ni las solicitudes. Verifica la ruta, body, vínculos, y rechazos por arm alterado, versión, anotación, deployment o módulo incorrecto, SEND anterior al armado, límite superior a cinco segundos, ACK y observación fuera de plazo.

El primer intento 6592f9753d682f0dd6bd320ca180281a29ea3e1e no incluía el módulo y produjo un fallo de construcción de fixture, no un RED conductual. El stub cerrado 7f2da2658f8ac11bf3a69dcf5f0e293ed3639574 produjo el RED aislado en Actions 41655522106: 76 PASS y 1 FAIL esperado en propuesta ausente. La implementación 63e159ed pasó Actions 41656117780. Las cuatro comprobaciones temporales añadidas en e391789783e8c93aab94ff942f95e0a2775d59d7 pasaron Actions 41656730123.

El comando focal de CI añade `node --test test/mcp-qa-finite-initial-cleanup-native.test.mjs test/mcp-qa-finite-initial-cleanup-records.test.mjs test/mcp-qa-finite-initial-workflows-native.test.mjs test/mcp-qa-finite-initial-history-schema-native.test.mjs test/mcp-qa-finite-initial-old-guard-native.test.mjs test/mcp-qa-finite-initial-gates-native.test.mjs test/mcp-qa-finite-initial-activation-wire-native.test.mjs test/mcp-qa-finite-initial-scope.test.mjs`. Resultado 81 PASS, 0 FAIL, 0 SKIP. Consumidores 83 PASS, compilación/residencia 23 PASS, lint aprobado, cero artefactos.

Pendiente para un emisor real: calificar los escritores relevantes e inmutabilidad histórica de manera suficiente, la capacidad/validez de la credencial nativa y el presupuesto real. Conservar la autoridad del B1/A vivo y los holders. Tras la última comprobación serial, transacción SEND única y sync/readback bajo el hijo original, un solo POST fijo, ACK de respuesta real, lectura primaria de deployment/versión/módulo/configuración y Completion durable. SEND existente o resultado incierto nunca reemite. La cápsula, entrada autenticada, traspaso y ensayo end-to-end siguen pendientes. Esta unidad no prueba PC-off.

## Fix round 1: módulo vinculado al plan

Base de revisión b2f221f415f1b98ee3e3a6157a5ea87daab62678. La revisión detectó que la calificación aceptaba bytes y metadata equivocados pero coherentes entre sí, sin compararlos con el módulo del plan armado.

RED 1431a34b6cda259e7ad17f255f25c9c2ba78ebc9, Actions 41657701660: 81 PASS y 1 FAIL causal en `activation wire rejects coherent-wrong-module`. La fixture sintética sustituyó bytes y metadata de forma coherente, y el código anterior los aceptó. El fix a13ba335d82154fb6b563698e31a90e9d304b228 exige Uint8Array, tamaño y SHA256 iguales a moduleBytes y moduleHash del plan antes de calificar la metadata. La prueba ampliada fbdfd018e6856ccf3076d215bb95c9aeede0440e también modifica un byte conservando el mismo tamaño y actualiza la metadata, para ejercitar el hash por separado.

Actions 41658302489 sobre fbdfd018 ejecutó el comando focal documentado arriba, con 83 PASS, 0 FAIL, 0 SKIP. Grupo de consumidores 83 PASS, compilación/residencia 23 PASS, lint acotado aprobado, cero artefactos. No se agregó red, almacenamiento, emisor o autoridad.
