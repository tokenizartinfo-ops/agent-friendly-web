# Elección visible entre versiones del relato

## Publicación aceptada: 18 de octubre en Argentina

La API primaria confirmó el `2026-10-19T01:45:17.950Z` la versión `d19c3d49-205b-46d0-ae8c-7c9e6e52bbea` al 100% en `agent-friendly-web-web-production`, deployment `88e25a5c-6b06-4074-80fd-59355a03de0d`. La fuente pública exacta es `823dea573c9fd07bf427ab999584eedebea43170`; no todo main.

| Evidencia | Resultado |
| --- | --- |
| Integral revisada | `3c57a678c623b6299f37af1e7f416bc6c41f6cd9`, [PR490](https://github.com/tokenizartinfo-ops/agent-friendly-web/pull/490), merge `451f3a26b387c4d14bd1419f7ef70bb7810d943d` |
| CI integral | 39178469126/job117825979006: 2.037 PASS, cero fallos, una omitida; lint/build PASS |
| Backport mínimo | [PR491](https://github.com/tokenizartinfo-ops/agent-friendly-web/pull/491), merge `6734f7f844cfc0f3058442b0a8bd42ec81566728`; dos blobs cambiados iguales a la fuente revisada |
| CI público | 39178489365/job117826035137: 1.158 PASS, cero fallos y cero omitidas; lint/build PASS |
| Revisión independiente | Acepta la fuente sin hallazgos; no atribuye aceptación autenticada o cloud |
| Rollback previo comprobado | `d8982d37-8966-4c6a-86fa-d265455d4df9`: 16 páginas, tres assets exactos y Access smoke PASS, `2026-10-19T01:40:42.317Z` |
| Candidata a 0% | Deployment `83f76328-0ec9-4a9d-b2ce-09e4592750a4`; override16/16 páginas,3/3 assets y Access smoke PASS, `2026-10-19T01:43:52.874Z` |
| Tráfico normal | 16 páginas, tres assets y Access smoke PASS, `2026-10-19T01:44:45.581Z` |

Los 298 hashes del artefacto congelado se comprobaron antes del upload y de promover. Configuración efectiva, D1, AI, ASSETS, Access, rate5/60, observabilidad, flags y pin propio del copilot permanecieron iguales antes, candidata y final; no se copian sus valores privados al recibo. El asset publicado es `/_next/static/chunks/intake-workspace-BW78P9EP.js`, SHA256 `55159fce44f0990aa1296a383e0b122906a4bd36bbd3dccb80eef6a64c3159db`.

No hubo rollback, migración, nueva escritura autenticada, modelo, micrófono, activación privada o incorporación de Max. Los árboles de ambos merges coinciden con sus fuentes verificadas. La aceptación de interfaz es local con transporte sintético; las comprobaciones públicas acreditan la entrega de la versión, no un nuevo ingreso privado.

## Hallazgo y alcance

Tras comprobar un guardado incierto, el copilot puede encontrar diferencias entre lo escrito en esta pestaña y la versión guardada. El aviso era visible, pero «Recuperar lo guardado» y «Conservar lo que escribí aquí» quedaban dentro del panel de texto/audio plegado. La persona no tenía a la vista el siguiente paso que pedía el aviso.

La corrección mueve esas dos acciones junto al aviso, fuera del panel plegado. No abre automáticamente toda la interfaz ni elige una versión por la persona. Conserva los callbacks, la revisión CAS, el texto, las decisiones, la revisión de propuestas y los consentimientos anteriores. No cambia API, esquema, fuente del modelo, micrófono, pin propio, permisos, avisos cloud o publicación de contenido.

Al recuperar la versión guardada no se genera otra escritura. Al conservar la edición local se retoma el guardado con la revisión conocida y el control de concurrencia existente. Una respuesta 409 no acredita un cambio nuevo guardado; el recibo aceptado de la escritura posterior sigue siendo independiente. El borrado voluntario mantiene la protección de [continuidad del relato](AFW-COPILOT-WORKING-RECOVERY-2026-10-18.es.md).

## Verificación local

El navegador con el componente React real y transporte sintético reprodujo en RED las acciones ocultas. Después de moverlas aprobó cuatro recorridos: ES escritorio conservando la edición, ES móvil recuperando la versión guardada, EN móvil recuperando y PT móvil conservando. Las acciones se alcanzaron también con teclado en ES, permanecieron fuera del panel cerrado y no hubo desborde en 1440×900/390×844 con movimiento reducido. Capturas inspeccionadas.

La recuperación no añadió PUT; conservar emitió una sola escritura posterior al 409 y avanzó una revisión. Ningún caso llamó al modelo o escribió otros campos. Las 26 pruebas dirigidas previas y ESLint dirigido aprobaron. No se añadieron pruebas que solo reproduzcan la posición del JSX; la regresión de interfaz se comprobó en el navegador.

Estas son pruebas locales de cliente. No acreditan una nueva sesión remota, audio real, suscripción nativa, entrega/revisión cloud, retirada, PC-off ni incorporación de Max. La fuente, CI y comprobaciones primarias fechadas de la publicación se registran al principio de este recibo.

## Reversión

No hay migraciones ni datos que retroceder. La versión previa d8982d37 y su configuración efectiva quedaron preservadas y comprobadas antes de cambiar tráfico. Una reversión futura requiere comprobar nuevamente versión y recuperación, sin deshacer ediciones legítimas posteriores ni repetir escrituras del usuario para documentar un resultado.
