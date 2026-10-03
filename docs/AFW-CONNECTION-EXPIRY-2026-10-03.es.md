# Conexiones: vencimiento, recuperación y aislamiento

## Cambio acotado

Después de la aceptación real, se conserva el piloto de diez minutos y tokens de cinco, sin refresh. No ampliar duración ni permisos en nombre de acompañamiento continuo. La renovación actual es una nueva conexión con consentimiento; un permiso retirado nunca vuelve a estar activo por renovar otro.

Se corrigieron dos contratos: metadata del authorization server anuncia únicamente authorization_code y autenticación none, coherentes con el cliente público y el callback que rechaza otros grants; conexiones consulta solo subject verificado, cliente actual, resource y pin del servicio antes de aplicar el límite de veinte filas. La retirada rechaza grants de otro servicio, aunque pertenezcan a la misma identidad. Esta defensa evita que una aplicación con D1 compartida presente o retire permisos ajenos a su ámbito.

La pantalla presenta nombre del expediente saneado, alcance comprensible, estado Conectada/Permiso vencido/Desconectada y fechas legibles con UTC explícito. Ofrece volver al expediente guardado. Un permiso vencido no muestra otro botón de desconexión; explica que puede conectarse de nuevo y revisar qué comparte. El enlace no inicia OAuth, no transmite tokens ni amplía permisos. No automatiza la carga de datos desconocidos ni promete conexión comercial persistente.

## Evidencia local y límites

Pruebas previas a implementación fallaron por metadata refresh anunciada y nombre/aislamiento ausentes. Una prueba adicional con veintiún grants de otro servicio reprodujo que ocultaban la conexión válida; filtro SQL anterior al límite corrigió el caso. Suite completa 722/722 aprobada, lint cero errores/advertencia histórica de imagen, build aprobado. Prueba adicional del recorrido de renovación aprobada: token aún válido + permiso de aplicación expirado rechaza; nuevo consentimiento emite permiso nuevo y recupera lectura; el permiso anterior sigue retirado. No hubo nueva autorización humana ni lectura productiva para estas pruebas.

La renovación automática con refresh es otro bloque: exige política de duración visible, rotación, replay/concurrencia, retiro de familia, comprobación owner/proyecto/resource en cada renovación y UX de permiso retirado distinta de vencimiento. Preparar primero contrato y pruebas locales, mantener cerrada cualquier configuración remota; aceptar con ChatGPT antes de publicar discovery. Esta nota no acredita esa capacidad ni decide duración comercial.

No cambió esquema, web principal, A2A ni expediente real. Despliegue de esta mejora debe permanecer cerrado, con receipt de versión/bindings y rollback al cerrado 4db09f45-c082-44b1-ab6f-d019467c9178. La aceptación real anterior no se repite solo por cambiar etiquetas o fechas; nueva aceptación sí será necesaria si cambia el ciclo de credenciales.

## Publicación cerrada verificada

Fuente 01303902e56291c19602afa4fc766dc62c35e855, PR #193 integrada en b33ff71e2130f3a8b3c88c7abb4ee7a50dbc57ba. CI 37151552693: 723 pruebas aprobadas, cero fallos; lint y build aprobados.

El 3 de octubre de 2026 a las 20:29:08 UTC se verificó por API la versión 5d412e32-0f56-4dce-9088-60a941aa7015 al 100% en agent-friendly-web-delegated-real-pilot, origen https://delegated-pilot.agentfriendlyweb.dev. OAuth deshabilitado, plazo vencido, pin del expediente conservado. D1 d26fc9d2-df5a-4957-8e58-cc4c945faad8 y KV 8dc247fd525e42559faa373576caa8a6 conservados. MCP y ambos metadatos devolvieron 404 en el origen. Reversión: versión cerrada anterior 4db09f45-c082-44b1-ab6f-d019467c9178; preservar datos. No modifica la web principal ni acredita un servicio comercial abierto.
