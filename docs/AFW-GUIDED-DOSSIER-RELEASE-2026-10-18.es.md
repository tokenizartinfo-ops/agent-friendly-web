# Continuidad y primeros resultados del expediente: publicación18oct2026

## Resultado y alcance

Los cinco bloques autorizados se publicaron en https://agentfriendlyweb.dev el18oct2026 a13:41UTC (10:41Argentina). El expediente conserva preguntas pospuestas al guardar y reabrir; ofrece una primera lectura explícita con sitio y objetivo guardados; distingue declaraciones, propuestas IA revisadas y observaciones públicas fechadas; adapta la guía de entrega manual a capacidades y plataforma declaradas; y permite descargar un resumen TXT con referencias y límites.

La guía breve mantiene las opciones narrativas secundarias plegadas. Desconocer CMS o hosting no impide esa primera lectura. Posponer no completa respuestas, no mejora el puntaje y no concede permisos. El copilot inteligente conserva exclusivamente su rollout propio anterior; esta entrega no habilita clientes nuevos ni una guardia cloud.

## Fuente y revisión

| Referencia | Evidencia |
| --- | --- |
| PR463 / main | https://github.com/tokenizartinfo-ops/agent-friendly-web/pull/463; merge0bd0f9d848f2b0bce491d4fcc9c5eb76f0fb434d |
| Candidata integral | ba5e3a60043e4c10e1e0d69faf538743173ed453; CI39132026911/job117688971719:1998PASS,0FAIL,1SKIP; lint/build aprobados |
| PR464 / rama pública | https://github.com/tokenizartinfo-ops/agent-friendly-web/pull/464; merge543d8eb28993d49771613534a836114aaa126a9d |
| Artefacto público exacto | 3700ce97198cfa2254da9ef9f3eb4e5fb042d53f; parent públicoe5a581d con árbol equivalente a fuente desplegadaf28c06d |
| CI del backport | 39132082346/job117689134346:1120PASS,0FAIL,0SKIP; lint/build aprobados |

Los34 archivos cambiados del backport coinciden byte a byte con sus blobs revisados en ba5e3a6. No se incorporaron al runtime público los cambios privados de eventos que separaban main de la fuente pública anterior.

La revisión independiente del conjunto encontró tres problemas importantes: una preferencia pospuesta impedía recuperar un conflicto CAS; el resumen conservaba la hora inicial y rechazaba una comparación posterior; y el primer CTA de guardado no atendía un borrador de trabajo pendiente del copilot. Los tres se reprodujeron y corrigieron. El guardado ahora espera el borrador de trabajo y muestra su recuperación si falla, sin crear revisiones del expediente por ese fallo. La descarga comprueba otra vez la hora actual. No quedaron observaciones menores diferidas de esa revisión.

El primer CI falló por una comprobación estática antigua que exigía contar también las preguntas aplazadas. Se actualizó a la decisión de producto aprobada y se agregó prueba de que los datos continúan desconocidos y las prioridades de guardado/control se conservan. El reportero spec integrado de Node conserva la ejecución de todas las pruebas y deja los fallos resumidos al final del log.

El run general de Windows dio1992PASS,4FAIL,2SKIP: la comprobación estática mencionada y tres escenarios privados nativos anteriores. Los archivos de esos tres escenarios, sin cambios ni límites relajados, dieron5PASS/0FAIL al ejecutarse aislados. Esto no demuestra la causa de su sensibilidad; el CI Linux de la candidata corregida y el backport aprobó. No atribuir estos resultados locales a una reparación del proveedor.

## Comprobación de interfaz

El ensayo de Chrome usó componentes React reales y la API de proyectos con Drizzle y D1 nativo locales. Verificó cinco preguntas aplazadas tras recarga, aislamiento entre dos identidades, una auditoría solo después del clic explícito, referencias fechadas, instrucciones contextualizadas, descarga, ES/EN/PT y ausencia de desbordamiento a390px. Identidad Access, lectura del sitio y cápsula eran fixtures sintéticos. La comprobación adicional reprodujo y corrigió la comparación posterior a abrir la página y la hora vigente al descargar.

Esto acredita interacción local y persistencia local reales con sus límites. En producción se verificaron versión, bytes del asset y fronteras públicas/Access. La pestaña nueva del Chrome habitual llegó al login normal de AFW; no se solicitó OTP ni se completó un nuevo recorrido privado autenticado. Ese clic remoto continúa como aceptación separada.

## Migración y datos

Proyecto AFW; repositorio tokenizartinfo-ops/agent-friendly-web; entorno producción pública; cuenta85d0d5dadac3341a564f22ce885e9eec; Worker agent-friendly-web-web-production; D1d26fc9d2-df5a-4957-8e58-cc4c945faad8. La migración0015_dossier_guide_continuity.sql añade exclusivamente deferred_questions_json TEXT NOT NULL DEFAULT '[]'. Se generó con Drizzle, inspeccionó y probó antes de aplicarse. Wrangler confirmó que era la única pendiente; quedó registrada en d1_migrations.

La lectura primaria de13:38:51UTC confirmó los seis expedientes conservados, suma de revisiones29 y suma de completitud200, iguales al preflight. Los seis recibieron la preferencia vacía. La lectura final13:42:02UTC conservó los mismos agregados. Ningún expediente real se modificó para probar la función. Clientes antiguos omiten el campo y conservan la preferencia; la idempotencia distingue omisión de un vaciado explícito. CAS y rebase incluyen ahora la lista privada.

Existe bookmark previo de Time Travel en la evidencia local. La recuperación prevista es restaurar tráfico a la versión anterior conservando esta columna aditiva: no rebobinar automáticamente datos ni borrar actividad legítima posterior. No se ejecutó una reversión de datos o tráfico porque la candidata superó las comprobaciones.

## Publicación y recuperación

| Etapa | Resultado |
| --- | --- |
| Artefacto congelado | 298 archivos verificados por hash; configuración específica derivada de producción efectiva |
| Preparación | Build público y upload dry-run aprobados; única subida real |
| Candidata | d82fefec-3a6b-4c0f-aedd-b464ec634b78; incluida con0% en deploymentc8ec25ee-58e2-4d67-bc8c-5ced3d0cede6 |
| Override13:40:46UTC |16 páginas HTML200, smoke público/Access aprobado y asset exacto |
| Promoción13:41:08UTC | Deploymenta0923f64-7a72-4e5e-a008-183e4bda6d36; candidata100% |
| Tráfico normal13:41:12UTC |16 páginas HTML200, smoke aprobado y asset exacto |
| API primaria13:42:02UTC | Versión100%, bindings/runtime/observabilidad preservados, agregados D1 conservados |

Asset: /_next/static/chunks/intake-workspace-BlJy2aKo.js; SHA25623cb90bd6f03028b64593ed2b1f0139e307fcee7ef89e5dc73864160130cadcc. Antes de publicar se verificó el asset de la versión anterior con HTTP200 y hash exacto. Rollback disponible:2a577654-6607-4c0f-9d37-3d6762cb59e8, fuentef28c06d. Una reversión futura requiere nueva comprobación de estado y verificación posterior de recuperación.

Se preservaron diez bindings, D1, AI, ASSETS, el rate limiter5/60, Access, los flags y el pin propio del copilot. No se copió ese pin al recibo. Remote deploy y diagnósticos continúan deshabilitados; compatibilidad2026-09-01, flags de runtime, uso standard, placement, observabilidad, tails y logpush sin cambios. No se utilizó el wrangler.jsonc genérico del repositorio para sustituir la configuración efectiva.

## Decisiones de implementación y continuidad

- Preferencia privada en servidor en lugar de almacenamiento del navegador: permite continuidad entre sesiones y propietarios aislados; costo de error, compatibilidad de esquema/API. Migración aditiva y pruebas nativas cubren esa decisión.
- Omitir el campo mantiene el canon anterior de idempotencia y su preferencia; vaciarlo significa retomar. Costo de error, reconciliación de clientes antiguos; probado con la API/D1 real local.
- Reutilizar el asesor de entrega y permisos existentes, sin instalar un plugin: costo, entrega manual todavía necesaria según accesos. Declarar WordPress no prueba escritura en la raíz.
- Mantener reportero spec y actualizar el contrato estático de preguntas aplazadas: costo, formato de logs y riesgo de una aserción desactualizada; sin omitir pruebas ni relajar controles.
- Backport mínimo público: costo, mantener dos referencias de fuente; se contrastaron todos los blobs cambiados y ambos CI. El main integral no se declara desplegado.
- Registro de ejecución en output ignorado y evidencia durable: costo, esos logs no viajan con Git; este recibo conserva los resultados y las decisiones, sin copiar datos privados o credenciales.
- Integración autónoma conforme autorización del owner: no se repitió un menú de aprobación ya resuelto. Sin cambios de alcance, clientes, permisos o infraestructura privada.

Evidencia local: output/afw-guided-continuity-ledger-20261018.md, output/afw-guided-final-review-20261018.md, output/afw-guided-product-compact-20261018.png, output/afw-guided-d1-migration-receipt-20261018.json, output/afw-guided-web-final-readback-20261018.json, output/afw-guided-web-{override,normal,rollback}-20261018.json y output/afw-guided-web-release-20261018/manifest.json. No repetir migración, subida ni promoción aceptadas.

El ensayo PC-off, suscripción nativa, entrega útil cloud y retirada continúan sin acreditar. Esta publicación no toca el canary delegado, operador privado, Containers, OAuth ni casos Cloudflare02375364/02382110. No mejora por sí sola un puntaje externo ni habilita a Max. Ver AFW-FIRST-CLIENT-READINESS-2026-10-05.es.md para los cierres del primer piloto.
