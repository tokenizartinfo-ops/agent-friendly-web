# AFW: ejecutor finito de revisión de metadatos

Preparación local, sin montaje remoto ni activación. El scheduler actual ya produjo un turno alojado; recibo AFW-CURRENT-CLOUD-SCHEDULE-2026-10-08.es.md. Este módulo aborda el control global que faltaba en el cliente, sin convertir el preflight en aceptación integrada.

## Diseño y alcance

`lib/assistance-occurrence.mjs` coordina un solo evento exacto: list→claim→finish. El manifiesto contiene identidad opaca de ocurrencia, requestId fijo, señal/revisión/fecha esperadas, fuente/config/publicación y cuatro límites temporales. Toma una copia antes de esperar callbacks, para impedir que una mutación del objeto amplíe la ventana.

El caller debe proporcionar el cliente canónico, una observación fresca de un preflight confiable y almacenamiento exclusivo con create/CAS. Antes de cada llamada comprueba fuente/config/publicación, origin, observaciones actuales y revisión coincidente, red restricted/enforced y ambos bindings Operations ready. La observación puede tener hasta30s; no acepta fechas futuras. El reloj debe avanzar sin retroceder. El timeout completo10s debe caber antes de todos los vencimientos, incluido el lease después del claim.

Registra attempted y consume presupuesto antes del envío; vuelve a comprobar el plazo tras persistir. Máximo tres intentos. Cada respuesta valida el contrato y la correlación; señal cambiada, respuesta perdida, vencimiento o error detienen sin reenvío. Un inicio concurrente o una nueva entrada con la misma ocurrencia no reanuda actividad. El checkpoint conserva una pérdida ambigua, incluso si no se pudo guardar el resultado final.

Sin contexto privado, finish solo solicita intervention_required; acepta ese resultado o superseded. Nunca genera orientación ni resolved. Completed significa únicamente que el contrato operacional terminó, no que la petición del usuario se resolvió. Las respuestas de error son categorías fijas; no contienen errores capturados, cuerpos, secretos o texto privado.

## Persistencia preparada

`lib/operations-occurrence-checkpoint.mjs` exige una raíz persistente ya existente, crea una carpeta exclusiva por UUID y archivos append-only por secuencia con aperturawx. Sincroniza el directorio padre antes/después de crear la carpeta y el archivo y directorio tras cada escritura. Windows se rechaza antes de mutar, por falta de esta garantía portable. Una carpeta preexistente, incluso incompleta, impide replay; cada avance requiere el recibo anterior y exclusión por el siguiente archivo. No borra un checkpoint para reintentar. Solo admite campos de metadatos definidos y strings explícitos para identificadores, no objetos coercibles, texto ni credenciales.

La raíz debe ser almacenamiento persistente seleccionado por el operador. El adaptador no acredita por sí mismo durabilidad del filesystem entre entornos cloud, replicación, apagado físico o recuperación automática. Los fallos parciales son fail-closed; hace falta inspección separada. Esta preparación no equivale a un Durable Object desplegado ni a una cadencia operativa. El cliente canónico debe conservar su timeout/abort; no sustituirlo por un transporte que haga reintentos internos.

## Verificación y próximos gates

Verificación final Windows:18 pruebas focalizadas,17pass/1skip/0fail; batería completa1116tests,1115pass/1skip/0fail; lint exit0, dos advertencias en archivos fuera del cambio. El skip corresponde a la prueba del adaptador POSIX en disco, que debe ejecutarse en CI Ubuntu; la denegación del adaptador Windows sí pasó. Pruebas de regresión se observaron fallar antes de implementar. Revisión independiente encontró y luego verificó correcciones de preflight obsoleto tras persistir y sincronización de directorios. Cubren tres llamadas/registro previo, concurrencia, reentrada, pérdida de respuesta, preflight alterado o viejo, vencimiento durante persistencia, margen de timeout/lease, evento incorrecto, reserva extra/no correlacionada, reloj hacia atrás, CAS fallido, manifiesto mutable e identificadores coercibles.

Antes de remoto: publicar y comprobar adopción de esta fuente sin fingirla mediante checkout; obtener observación real del entorno y comprobar persistencia del almacenamiento elegido; crear una nueva señal propia desde UI y recepción+ACK reales; preparar ventana/budget/cierre independiente y una única ocurrencia. Luego contrastar el intervalo PC-off declarado por owner con turno, recibos y retorno. No tocar Max ni anunciar guardia por estas pruebas locales.
