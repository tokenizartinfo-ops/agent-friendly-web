# AFW: recuperación conversacional cloud — 3 de octubre de 2026

## Resultado comprobado

Se retomó la sesión cloud existente del resumen propio, sin crear otro chat, reabrir el servicio ni conceder permisos. El último resultado disponible era UNAUTHORIZED/oauth_token_invalid_grant, sin nuevos datos. Se pidió explícitamente no invocar herramientas, no reconectar y conservar una pregunta previa como contexto histórico.

El nuevo turno cloud terminó correctamente el3deoctubre a22:57:38 Argentina (4deoctubre01:57:38UTC), duración7.6s. Respondió que el error requiere reautenticación pero no permite determinar su causa, que no hubo datos nuevos y que se trataba de una comprobación conversacional sin lectura MCP. Recuperó la pregunta real anterior sobre qué deben descubrir o hacer personas/agentes en el sitio. Ofreció responderla en el chat y aclaró que quedaría en la conversación sin guardarse en AFW. No confirmó actualidad del expediente ni nuevos guardados. El recibo privado del chat conserva sus identificadores; no se publica historial privado en Git.

## Alcance de esta aceptación

Acredita recuperación de contexto en una sesión cloud concreta con instrucción explícita y error histórico. No es una nueva llamada MCP ni acredita que ChatGPT consuma el payload recovery de PR204 automáticamente. Tampoco demuestra recuperación espontánea, vínculo guardado en AFW, duración comercial o un gerente permanente. Se conserva la denegación previa y no se reconecta un permiso retirado.

Siguiente aceptación remota específica: en una ventana sintética acotada, comprobar un fallo que alcance al MCP y su guía recovery; si el cliente bloquea antes del MCP, documentar esa frontera en vez de declarar probado el payload. No repetir aislamiento de dos identidades ni cargar datos reales para ese ensayo.

## Continuidad

PR206 integrada en main79ef14e, QA visual/teclado cerrada en preview local. Servicios delegados permanecen cerrados en versiones774c9547 yefaf2265; esta comprobación no modificó Workers, D1, KV, Access, permisos ni archivos del cliente. La siguiente fase de disponibilidad estable requiere resolver el contrato operativo y la recuperación real antes de anunciar discovery o acceso al primer cliente.
