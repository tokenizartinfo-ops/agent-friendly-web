# Canal administrativo privado de preregistro

QA propia de AFW, 9 octubre 2026. Fuente y configuración cerrada; los resultados remotos se registran por separado tras desplegar.

PrivateQaBootstrap se invoca mediante una instancia de Workflow creada por la API administrativa de Cloudflare. El evento exacto elige register y el baselineRef esperado, nunca datos de autorización, recursos, identidad o aprobación. PrivateQaPreregistration lee exclusivamente los pins administrativos configurados previamente. No hay ruta HTTP de registro, aprobación o instalación; el Worker continúa respondiendo404. El canal permanece deshabilitado, con pins vacíos, sin cron, nuevas claves o acceso de clientes.

Un paso con cero reintentos y timeout20segundos llama al registro inmutable. Cambios de configuración, ventana vencida y ACKincierto producen unavailable sin compensaciones destructivas. Tras el paso, incluso si su resultado fue cacheado, se exige una lectura activa del preregistro. El resultado registered no es prueba de reserva, custodia o instalación. La retirada conserva el historial e impide reutilización.

Pruebas:6focales/core/native Workflows+SQLite DO;1384pass/0fail/2skip en la suite, lint/build0 y dry-run Wrangler0. El ensayo native se amplió posteriormente para reiniciar realmente un Workflow después de la retirada: completó con unavailable y conservó el historial. Revisión independiente sin P1/P2.

Configuración candidata wrangler.independent-closure-qa.jsonc y rollback wrangler.independent-closure-qa.rollback.jsonc, ambas cerradas y del Worker propio. Como una migración DO puede impedir volver a una versión que no exportaba la nueva clase, el rollback exporta las mismas clases y su Workflow devuelve unavailable incondicionalmente. Preparar/desplegar/verificar ese rollback antes de la candidata; no borrar namespace, journal o D1. La ruta de occurrences, DO de cierre, D1 y secretos previos se preservan.

Siguiente gate: comprobar despliegue cerrado real y una única instancia negativa por API, con ventana/presupuesto definidos y evidencia original. Luego preregistro completo real, intercambio autenticado, correlación cloud/journal, reserva administrativa CAS, cierre independiente y programación propia. No pedir apagar ni invitar a Max desde resultados locales.
