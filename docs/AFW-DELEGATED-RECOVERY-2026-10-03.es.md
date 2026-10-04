# Recuperación del asistente delegado — 3 de octubre de 2026

## Contrato implementado

Las respuestas MCP fallidas incorporan `recovery`, sin datos de proyecto. La falta de alcance confirmado ofrece intentar consultar el resumen comprobando también su permiso y revisar evidencia opcional. Un fallo503 ofrece reintentar únicamente la lectura. Las demás denegaciones remiten a conexiones, sin distinguir por suposición retirada, vencimiento, cambio de propietario o ausencia de autorización.

Toda recuperación señala `automaticReconnect:false` y `lastKnownContext:historical_only`: el cliente conserva la pregunta/contexto que ya tenía, no los reconstruye desde datos denegados, no afirma actualidad ni confirma guardados pendientes. El servidor no tiene acceso al historial del chat y no puede garantizar que un cliente obedezca esta guía. No revivir permisos ni cambiar scopes por inferencia. Solo la respuesta de falta de alcance ofrece el desafío OAuth existente; retirada no lo añade.

Enlaces de recuperación derivados del origen servidor, nunca de un argumento de usuario. No contienen códigos, tokens, subjects, expedientes ni datos de propietarios. No se agregan herramientas ni escrituras. El recorrido de nueva autorización y retirada mantiene las pruebas previas; la respuesta enriquecida se verifica separadamente.

## Cierre requerido

Suite completa, lint/build, revisión independiente, CI y publicación cerrada. Probar luego el texto interpretado por ChatGPT en una ventana acotada real antes de afirmar aceptación conversacional remota. El cliente podría detenerse en su validación OAuth antes de invocar MCP; esta respuesta no cubre esa pantalla externa.

