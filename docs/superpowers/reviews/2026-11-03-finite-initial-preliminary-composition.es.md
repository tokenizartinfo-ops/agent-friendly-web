# Composición previa a la activación

Aprobada en revisión independiente tras corregir la retención de operaciones concurrentes. CI 41643214018: 57 focalizadas, 83 consumidoras, 23 compilación/residencia y lint. El caso causal retiene D1 tras el fallo de un lector hermano hasta su resolución real. Continúan el mismo contexto, D1, almacenamiento y lease inicial.

Ventana del titular, inventario de Workflows, esquema D1 y lector histórico aprobados por separado. El GET histórico del 3 nov 12:41:55 UTC ratificó complete con salida blocked/uncertain, y el código histórico fijado usa INSERT e INSERT OR IGNORE para admisión/cierre. El esquema actual y ese escritor concreto no acreditan el historial completo. La credencial MCP de esa consulta no acredita la capacidad del lector nativo.

Siguiente tramo: comprobaciones mutables finales del canary y operador, reversión, cron, tails, Container y escritores relevantes, con custodia vigente. Luego integrar SEND único, ACK y comprobación primaria, cápsula y acceso autenticado cerrado. Tras el traspaso de cierre, ensayo sintético remoto y prueba PC-off separada. La composición aprobada no emite activación.
