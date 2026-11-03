# Comprobaciones finales del ensayo inicial

Base 1b8e2d07025afb1fe0f8a0a25907684a4427fcf3. Código 0e8af2b51a72bc5e271ca082d506f88e8b5a4c64, rama feat/finite-native-cleanup-20261101. Fuente y pruebas sintéticas, sin efectos sobre recursos remotos.

Tras las comprobaciones primarias, se vuelven a leer el esquema D1, los datos históricos pertinentes y el inventario fijo de Workflows bajo el mismo lease B1/A. El resultado sigue siendo factual. Después se verifican en serie el deployment QA, las dos custodias y el deployment exacto del canary. El último control de almacenamiento exige únicamente plan, state y arm-ack coherentes, alarma y ausencia de HEAD, sin journals adicionales. Un resultado incierto queda en admin_pending con el cierre armado.

La prueba nativa de test/mcp-qa-finite-initial-gates-native.test.mjs cubre una deriva de canary posterior al primer inventario y una lista con journal inesperado en la comprobación final. Las pruebas fueron RED en 6df91e7f623d4dfc5be156042b3f89f38a19a28c, Actions 41652212631: 69 PASS y 2 fallos esperados por material_recorded. La segunda anomalía se simula en la lectura de lista y no afirma una escritura externa real.

Actions 41652797771 sobre 0e8af2b51a72bc5e271ca082d506f88e8b5a4c64 ejecutó `node --test test/mcp-qa-finite-initial-cleanup-native.test.mjs test/mcp-qa-finite-initial-cleanup-records.test.mjs test/mcp-qa-finite-initial-workflows-native.test.mjs test/mcp-qa-finite-initial-history-schema-native.test.mjs test/mcp-qa-finite-initial-old-guard-native.test.mjs test/mcp-qa-finite-initial-gates-native.test.mjs test/mcp-qa-finite-initial-scope.test.mjs`, con 71 PASS, 0 FAIL, 0 SKIP. El grupo de entrada/carga tuvo 83 PASS y el de compilación/residencia 23 PASS. Lint acotado aprobado y cero artefactos.

La segunda lectura histórica y los triggers instalados no prueban la ausencia de todos los escritores ni la inmutabilidad absoluta de la historia. Los controles ocurren secuencialmente y no constituyen un snapshot atómico del proveedor. No se ha comprobado la capacidad del token nativo ni la vigencia de su custodia. El coste y la latencia reales del recorrido dentro de 30 segundos siguen sin medirse.

No se persiste ActivationSend en esta unidad. La alarma interpreta SEND sin Completion como resultado incierto y no puede acreditar que no haya ocurrido una activación. Por ello SEND debe reservarse en la misma continuación que el POST único y su ACK, una vez completados los gates restantes. Esta unidad no inicia el emisor y no acredita ensayo remoto ni PC-off.
