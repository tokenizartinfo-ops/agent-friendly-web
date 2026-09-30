# Entrega de objetivos y continuidad guiada de AFW

## Fuente y verificación

La [PR #118](https://github.com/tokenizartinfo-ops/agent-friendly-web/pull/118) quedó integrada en `6241f5040a0635c660cffd48a469e68f1d0bed96`. La revisión independiente no dejó hallazgos pendientes. Validación local: 594/594 pruebas, TypeScript, build y lint sin errores (una advertencia previa de imagen en portada). CI de la PR y de la revisión integrada aprobó. El artefacto publicado procede del run `36744922223`, `afw-build-6241f5040a0635c660cffd48a469e68f1d0bed96`; no de un árbol de trabajo posterior.

El segmento interpreta objetivos mediante categorías canónicas revisables; no guarda objetivos libres del proveedor. El planificador presenta una intervención principal y permite posponer campos. Relato, decisiones y propuestas se recuperan juntos bajo revisión optimista. Una propuesta aplicada localmente reaparece si el expediente no confirmó su guardado. Recuperar otro relato invalida inferencias y previews anteriores. El contexto del proveedor se limita al expediente propio y no otorga permisos.

La guía breve permite revisar alcance y abrir entrega/observaciones. Las novedades muestran observaciones compatibles y fechadas; no hay scheduler acreditado. Las etapas de entrega y verificación conservan sus controles existentes: no se afirma que todo el recorrido esté representado por una máquina de estados persistida.

## Runtime del segmento inicial

- Proyecto AFW; repositorio `tokenizartinfo-ops/agent-friendly-web`; producción `https://agentfriendlyweb.dev`.
- Worker `agent-friendly-web-web-production`, cuenta administrativa `85d0d5dadac3341a564f22ce885e9eec`.
- Versión `774ea330-73b8-41c1-9090-272226580c3a`, deployment `d876d87a-2ad7-4007-8ad3-759abf0e63c5`, al 100 %, creado `2026-09-30T16:37:17.922511Z`.
- La versión estuvo primero al 0 %. El smoke público pasó con override antes de promoción y volvió a pasar después; verificó las rutas públicas y el desafío Access de las privadas. No demuestra interacción autenticada.
- D1 `d26fc9d2-df5a-4957-8e58-cc4c945faad8`: migración aditiva `0009_volatile_meltdown.sql` aplicada; añade `session_json` con default `{}`. La prueba SQLite local conserva el relato y recupera decisiones desde una copia restaurada. No acredita un restore remoto.
- Bookmark previo a migración: `000000c5-00000000-000050f6-c4198de4f6c8473a19728139d3f68d8b`. Se registra como evidencia; restaurarlo requiere evaluar escrituras posteriores y autorización aplicable.
- Audiencia Access y D1 exactas, rate limit de 5 solicitudes/60 s, copilot activo solo para `6e972c18-cae1-402b-b959-646abd8499d7`; publicación remota desactivada.

Rollback de código: desplegar `8b327ba8-5ef9-424e-a335-464ad50a8c01` al 100 %, conservando columna y datos. No ejecutar `DROP` ni restaurar toda la base automáticamente.

## Corrección posterior vigente

La [PR #119](https://github.com/tokenizartinfo-ops/agent-friendly-web/pull/119) integra el fix de interpretación omitida en `20155942dd01bfc31494ae05eeb0511c78690359`. La propuesta usa una sola frase completa acotada ES/EN/PT de consulta/exposición de API/MCP, con cita exacta; no sustituye evidencia inválida del modelo ni guarda automáticamente objetivos. Las variantes futuras y alternativas reproducidas se rechazan. Revisión independiente cerrada; 598/598 pruebas, TypeScript, lint y build aprobados. CI de PR y main aprobó. Artefacto publicado: run `36748769478`, `afw-build-20155942dd01bfc31494ae05eeb0511c78690359`.

Versión **vigente** del mismo Worker: `8368ba5d-d123-4832-b525-0d253f34dfbf`, deployment `6a2af791-d726-4b6f-8c83-1ed31b9fb935`, al 100 %, creado `2026-09-30T17:09:25.142319Z`. Sin nueva migración ni cambios de piloto/Access/D1/rate limit/publicación. Verificada primero al 0 % con smoke y override; smoke posterior a promoción aprobado. Rollback de esta corrección: `774ea330-73b8-41c1-9090-272226580c3a` al 100 %, conservando datos.

Una consulta CLI posterior de D1 produjo 7403; `wrangler whoami` comprobó cuenta esperada y permisos, y el conector verificó la revisión 13 del expediente sintético con `goals = [content]`, `contentSources = [services]`, `control = none`. El upload/deploy posterior funcionó. No se cambió identidad ni se pidió una credencial nueva.

## Dos identidades de prueba

El owner proporcionó dos identidades propias adicionales. Se creó y verificó una política exclusivamente AFW en Access app `b7d7d62e-de25-4b4b-ac52-972b104738a1`, audiencia `afac57a0e7660c20cffe344cd331a2d42a37eb1440d6b20bdbca9d6ad89708ac`. Sus destinos son rutas/hostnames de `agentfriendlyweb.dev`; no incluyen Tokenizart ni Atelier.

Política `05f77bee-4e40-47d8-b2b3-22d1eb5a1bcf`, nombre `AFW QA identities 2026-09-30`, allow, precedencia 2, exactamente dos emails, sin comodines y sesiones de 1 h. La política anterior del owner se conserva. La duración limita las sesiones; **la política no expira automáticamente**. Retirarla al terminar la prueba; rollback consiste en borrar únicamente esta política. No se enviaron invitaciones externas ni se amplió el piloto del copilot.

## Pendiente de cierre de producto

La conexión de Chrome fue intermitente y el owner la reconectó. Se operó únicamente su pestaña AFW existente, sin abrir otra instancia ni tocar otros proyectos. En el expediente sintético piloto se confirmó manualmente `content`, se pospuso `contentSources`, se esperó confirmación de guardado y se recargó. La guía recuperó la pregunta pendiente y permitió retomarla. Se confirmó `contentSources = services`, `control = none`; la UI mostró el guardado confirmado y una síntesis breve. Desde allí se abrió entrega/verificación sin desplegar el expediente completo. No se concedieron permisos ni se preparó/publicó cápsula.

El envío de un relato ficticio multitema encontró una omisión real: el resultado no interpretó la consulta explícita de un catálogo por API. Se reprodujo localmente y corrigió en la PR #119. La revisión independiente detectó variantes futuras/alternativas en la primera propuesta del fix; se reprodujeron y corrigieron antes de publicarlo.

La extensión de Chrome se desconectó de nuevo al recargar después de la segunda publicación. Se pidió reconexión de la misma pestaña; no se acredita aún repetición privada del caso API ni se pudo guardar una captura final. Estado sintético confirmado en D1: revisión 13, objetivo content, fuente services, control none. Relato de trabajo ficticio pendiente: longitud 182, revisión 15, sin preguntas pospuestas; no incorporado a notas ni objetivos. Repetir el caso API sobre la versión vigente, revisar la cita y la negación de pagos, probar persistencia de propuesta y limpiar el relato de trabajo al cerrar QA. Documentar cualquier cambio final.

Luego, con las dos identidades reales, crear expedientes sintéticos separados, comprobar lectura/listado/escritura cruzada denegados, pausa/retorno y retirada de acceso. Cambiar la sesión requiere una acción concreta del owner; no pedir credenciales en chat.

MA-06 dispone de una prueba vertical **sintética local**, no de una instalación comprobada en un sitio de cliente. MA-07 tiene acceso preparado, no aislamiento remoto acreditado. MA-08 es un feed acotado dentro del expediente, sin bandeja persistida ni tareas periódicas. MA-09/10 continúan como horizontes: no activar ingesta masiva, gastos ni prometer transformación empresarial completada.

La revisión externa de Cloudflare se conserva para el jueves 2026-10-01. El segmento no demuestra una mejora de aquel puntaje.

## Corrección de propuestas consumidas

PR #122 integrada en `ec3824e3cdd36959ea7b8a20a6ea27c112a9a40f`. CI de PR y main aprobada, 599 pruebas, lint sin errores y build aprobado. Artefacto exacto del run `36766767301`: `afw-build-ec3824e3cdd36959ea7b8a20a6ea27c112a9a40f`.

Worker AFW productivo: versión `a80261b2-29ba-4165-af54-3ceb3fe41df5`, deployment `827260f5-a667-4a6b-8db2-ef7f31376e75`. Smoke previo con override y posterior a promoción aprobados. Sin migración ni cambio de permisos, cuota, piloto o publicación remota. Rollback: `8368ba5d-d123-4832-b525-0d253f34dfbf` al 100 %, conservando datos.

La UI autenticada recuperó el piloto y dejó de mostrar falta de comprensión después de consumir la propuesta, manteniendo una pregunta y el estado de recuperación. Captura privada local: `output/afw-consumed-proposal-fixed.png`. El resultado realmente vacío conserva su mensaje; las propuestas siguen recuperables si falla el guardado del expediente. La apertura a clientes sigue regida por `AFW-PRODUCTION-OPENING-2026-09-30.es.md`.

## Avance de entrega remota controlada

Con sesión A se abrió el expediente sintético propio de entrega AFW `project-45195b183f5edf3e21dcf56d05c2eb53e1f7ce48767cadd10bbd5a8869a5548a`, origen declarado `https://agentfriendlyweb.dev/`. La cápsula v1 estaba vencida/rechazada; la UI preparó v2 `d910f286-e77e-47e4-b1aa-7d20904ac606` y confirmó comparación pública del archivo `/llms.txt`, distinta del archivo propuesto, el 2026-09-30. Quedó pendiente de aprobación. No se aprobó ni implementó el archivo sintético en el sitio público.

MA-06 avanza hasta preparación/comparación remota, sin acreditar instalación ni auditoría posterior a un cambio. El contenido propuesto sí es legible al abrir el desplegable del archivo. Se comprobó que contiene datos sintéticos y campos no declarados; no debe reemplazar el llms.txt público existente. Próximo bloque: entrega en un destino controlado con contenido adecuado, preservando el origen público real. Capturas locales privadas: `output/afw-consumed-proposal-fixed.png`, `output/afw-delivery-v2-comparison.png`.


## Guía de archivos observados desplegada

PR #130, fuente 6c822c5, publicada al 100 % con verificaciones previas y posteriores aprobadas. Recibo vigente: [AFW-OBSERVED-GUIDANCE-RELEASE-2026-09-30.es.md](AFW-OBSERVED-GUIDANCE-RELEASE-2026-09-30.es.md). MA-06 y MA-07 tienen evidencia posterior que prevalece sobre los pendientes históricos de este documento. QA retirada; no pedir OTP a esa identidad. La comprobación visual de novedades/guía sigue pendiente.
