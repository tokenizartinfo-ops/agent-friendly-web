# Release cerrada de renovación — 2026-10-03

Código fuente 8fdd8cf0ecabea0eae01b311f9161c07c3581806, PR195 integrada en a6f0145b1d3937229205351565c94118a7ed860d. CI37155090011: 730/730, cero fallos, lint/build aprobados. Revisión independiente completada; hallazgo de latencia corregido. Diseño, fallos y garantías: AFW-REFRESH-IMPLEMENTATION-2026-10-03.es.md.

## Versiones comprobadas

- Piloto real: agent-friendly-web-delegated-real-pilot, origen https://delegated-pilot.agentfriendlyweb.dev, versión9421a851-926b-4b0e-b47e-091e909e6e1e al100%, deployment2026-10-03T21:29:13.081261Z. D1d26fc9d2-df5a-4957-8e58-cc4c945faad8, KV8dc247fd525e42559faa373576caa8a6 y pin real conservados. Rollback cerrado5d412e32-0f56-4dce-9088-60a941aa7015.
- Canary sintético: agent-friendly-web-delegated-canary, origen https://delegated-canary.agentfriendlyweb.dev, versión7375e5e6-acda-44d4-a53c-55de7b74ffa1 al100%, deployment2026-10-03T21:29:59.795272Z. D1 separado6a728254-1494-4039-802e-b39288a55fcc, KV6b94ff702e504e14a7730cee73a0f6ff. Rollback cerrado4775ff39-b406-4f62-8eaa-d4d336a80446.

API confirmó ambos flags false y bindings esperados. En ambos orígenes MCP, metadata AS y metadata del recurso devolvieron404. Esto acredita publicación cerrada; no conexión activa ni aceptación de refresh en ChatGPT.

## Esquema canary

Se verificó tabla ausente y se aplicó mediante API D1 únicamente el SQL aditivo de0014: delegated_refresh_uses y su índice por expires_at. PRAGMA confirma tres columnas, hash como PK y campos NOT NULL; índice confirmado. Cinco permisos históricos y dos proyectos conservados, cero permisos sin retirar, cero usos de refresh. No se ejecutó el conjunto completo de migraciones de la web contra esta base sintética ni se alteró el journal remoto de Wrangler.

Producción no recibió migración0014. Aplicarla allí requiere un recorrido canary aceptado, preflight y método de migraciones compatible con el historial real. Rollback canary conserva tabla y datos, flagsfalse y Worker cerrado; no DROP remoto.

## Continuidad

Preparar cliente sintético existente con refresh_token y ventana acotada, conservando callback/none/PKCE. Comprobar una lectura tras vencer el primer token y nueva denegación tras retirada. No repetir pruebas humanas anteriores como sustituto de este nuevo ciclo. Si Access pide nuevo OTP, lo ingresa el owner en el navegador; nunca en chat. No anunciar OAuth/refresh en apex ni inferir score externo, duración comercial o gerente permanente.
