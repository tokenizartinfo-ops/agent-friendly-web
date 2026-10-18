# Continuar el sitio correcto y revisar la base: 18 de octubre de 2026

## Resultado

Se publicaron dos mejoras independientes del incidente de Containers: una continuación segura cuando el dominio ya tiene otro expediente propio y una revisión breve de las respuestas básicas al terminar la guía. Se aceptaron en componentes reales locales y en la sesión propia de producción. No requieren una auditoría nueva para decidir dónde continuar.

La lectura privada de observaciones incorpora una comprobación de asociación, sin escritura. Solo ofrece un enlace si coinciden la cuenta autenticada, el ID del expediente enlazado y su hostname actual. Una asociación de otra cuenta, un registro inconsistente o un expediente que ya cambió de sitio no entrega referencias privadas. El rechazo409 de una auditoría nueva, la propiedad del Registry y la idempotencia permanecen vigentes.

La guía recomienda continuar en el expediente existente, explica que el borrador se conserva y que las respuestas no se trasladan automáticamente. No navega ni fusiona datos por sí sola. Si no hay una referencia propia válida, orienta hacia Tus expedientes y la revisión de la vinculación, sin pedir claves ni ofrecer otra auditoría como solución.

Al terminar las preguntas básicas aparece «Revisar estas respuestas», plegado inicialmente. Muestra únicamente los ocho campos descriptivos que la persona aportó, con nombres legibles para tipo de sitio, objetivos e idiomas. No incorpora notas, contactos, permisos, respuestas pendientes o verificaciones inventadas. El estado de guardado sigue siendo una comprobación separada.

## Fuente y validación

| Referencia | Evidencia |
| --- | --- |
| PR469 | https://github.com/tokenizartinfo-ops/agent-friendly-web/pull/469; fuente88e41a6bf022bdd3dc67863c08dd4c5935ad6ac1; mergeed3084671587e4dcaf55937a5ea8651ffad3fb68 |
| CI integral |39139224588/job117710002436:2011PASS,0FAIL,1SKIP; lint/build aprobados |
| PR470 | https://github.com/tokenizartinfo-ops/agent-friendly-web/pull/470; fuente pública exactaeb224925b52dfbaf8a43acf7d842ff48139c5d34; mergec3356435e4e7786dea17e57651a4e959e19b5d75 |
| CI pública |39139583925/job117711057318:1133PASS,0FAIL,0SKIP; lint/build aprobados |

Los catorce blobs cambiados del backport coinciden con la fuente revisada. El parent público42a4041 corresponde a la entrega anterior; no se desplegó todo main ni sus diferencias de eventos privados.

Los modelos dieron seis fallos RED antes de implementación; la suite dirigida final dio34PASS/0FAIL. Incluye API/Drizzle/D1 nativo con dos identidades sintéticas:401/404, asociación propia, asociación ajena sin referencias, GET y409 sin auditoría ni cambios en observaciones/eventos/revisiones/Registry, y rechazo de una referencia desactualizada. No demuestra autenticación remota de una segunda persona.

Una revisión independiente del conjunto encontró Critical0/Important0/Minor0, declined-to-judge[]. El revisor ejecutó20 pruebas aprobadas e inspeccionó las pruebas nativas; no modificó el checkout. Se comprobaron las prioridades de sesión/conflicto/guardado, el descarte de lecturas abortadas, el contexto proyecto/sitio y el guard de salida del enlace local. No hubo hallazgos diferidos ni una segunda revisión.

## Interfaz y sesión real

El ensayo local usó componentes React y API/D1 reales, con identidades sintéticas y sin destinos de auditoría externos. Confirmó el resumen plegado de ocho campos, ES/EN/PT,390px sin desbordamiento, entrada al original sin transferir respuestas y otra identidad sin enlace ni directorio ajeno. Los contadores antes/después conservaron audits0/events6/revisions6.

En el Chrome habitual, la sesión propia recuperó el borrador con sus ocho respuestas. La comprobación real identificó el otro expediente de esa misma cuenta y ofreció su enlace. Se abrió correctamente y se regresó al borrador, cuyo resumen conservaba los ocho datos. No se pidió OTP, eligió un objetivo en el original, ejecutó otra auditoría, preparó una cápsula o transfirió datos. El original histórico de ensayo todavía tenía su objetivo pendiente: una entrada válida no declara completo su contenido.

Para el caso propio, esto cierra la falta de orientación ante el dominio asociado; no es una reparación de propiedad ni una consolidación de expedientes. Si se desea reutilizar el original histórico, sus datos y objetivo deben revisarse con su contexto. Nunca copiar silenciosamente respuestas o aprobaciones entre expedientes.

## Publicación y recuperación

Destino exclusivo: proyectoAFW, repositorio tokenizartinfo-ops/agent-friendly-web, entorno público de producción, https://agentfriendlyweb.dev, Worker `agent-friendly-web-web-production`. Configuración derivada de la versión efectiva anterior, no del wrangler.jsonc genérico. Artefacto congelado:298 archivos verificados por hash. Sin migraciones, cambios de asociaciones, Access, credenciales o rollout del copilot.

| Etapa | Resultado UTC |
| --- | --- |
| Reversión comprobada15:16:27 | f6ccabdb;16páginas200, asset exacto y smoke público/Access aprobados |
| Subida única |6f160a54-202d-4a3c-a194-28bb025848fe; fuente públicaeb22492 |
| Override15:19:07 | Candidata0% en deployment7df1af36;16páginas200, asset exacto y smoke aprobados |
| Promoción15:19:15 | Deployment2aafaea6-aa98-4235-8fcc-554ba985b98e; candidata100% |
| Normal15:19:19 |16páginas200, asset exacto y smoke aprobados |
| API primaria15:21:26 | Versión100%; bindings efectivos y de versión, runtime, placement, observabilidad, tails y logpush preservados |

Asset `/_next/static/chunks/intake-workspace-C7EQuJyI.js`, SHA256 `2c9acae9c2dc7b98984ae9836e861cab451630e9fb9e373d7c998370c6e335cc`. Rollback inmediato disponible: `f6ccabdb-86a4-429f-ae10-1af6ccb6a33b`, fuentec92e797. No se ejecutó reversión porque la candidata pasó; una reversión futura exige verificar estado y recuperación sin rebobinar actividad legítima.

D1, AI, ASSETS, rate limiter5/60, pin propio, flags y Access se conservaron. No se tocó el canary delegado, operador privado, OAuth, Containers, cron ni consumidores. Esta publicación no acredita puntaje externo nuevo, guardia cloud, suscripción/entrega útil/retirada nativas ni PC-off. Tampoco incorpora o envía correo a Max.

## Continuidad

Evidencia ignorada: `output/afw-domain-continuation-ledger-20261018.md`, `afw-domain-final-review-20261018.md`, `afw-domain-local-review-20261018.png`, `afw-domain-production-green-20261018.jpg`, `afw-domain-web-final-readback-20261018.json`, `afw-domain-web-{rollback,override,normal}-20261018.json` y `afw-domain-web-release-20261018/manifest.json`. Las bases de configuración privadas permanecen fuera de Git.

Los helpers/Chrome headless del ensayo local se cerraron; la pestaña propia de producción quedó disponible, con la revisión breve plegada. Preservar error.log ajeno y las evidencias. No repetir subida, promoción o ensayos aceptados para actualizar documentación. El roadmap del primer cliente conserva sus gates cloud y personales por separado.
