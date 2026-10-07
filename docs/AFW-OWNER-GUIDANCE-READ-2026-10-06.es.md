# Lectura de orientación por el dueño

Preparación local del 6 de octubre de 2026, proyecto AFW, repositorio `agent-friendly-web`, rama `docs/afw-copilot-closed-release-20261006`. No activación remota.

El expediente consulta una propuesta guardada y muestra una pregunta, su motivo y fecha. Solo utiliza la identidad humana verificada por el servidor y el dueño actual del proyecto. No entrega recibos privados, identificadores de ejecución, hashes, objetivos completos ni texto del expediente. El GET no escribe ni acredita lectura, aceptación o resolución.

El permiso del servicio para recibir objetivos y la lectura del dueño de su historial son distintos: retirar ese permiso no borra la propuesta histórica. La pantalla señala vencimiento, revisión anterior y cambios locales sin guardado confirmado. No aplica respuestas ni inicia otra generación.

El adaptador queda cerrado salvo `AFW_ASSISTANCE_GOAL_PROPOSAL_ENABLED=true`, selector de proyecto propio válido y `AFW_ASSISTANCE_GOAL_PROPOSAL_EXPIRES_AT` UTC canónico con ventana restante máxima de diez minutos. Revalida identidad, propietario, resultado y ventana tras las esperas. La respuesta usa `no-store`; errores no exponen contenido. La UI consulta manualmente y limita tamaño y tiempo de respuesta.

Pruebas: propietario versus identidad ajena, conservación histórica tras retirada y vencimiento, revisión distinta, fuente ajena, ausencia de escrituras, gate cerrado sin tocar autenticación ni base, cambio de sesión/propietario/cierre durante espera. Primera prueba roja por ausencia del adaptador; tres pruebas específicas pasan. Suite final: 1061 pruebas, 1061 aprobadas; build completo. Lint completo aprobado, sin errores y con dos advertencias existentes ajenas a este bloque. Evidencia local en output/afw-owner-proposal-tests.log, output/afw-owner-proposal-build.log y output/afw-owner-proposal-lint.log.

Pendientes separados: aceptación visual desktop/mobile, recibo explícito de confirmación de lectura con reintento idempotente, autoridad criptográfica del propósito de generación y custodia privada cloud. No usar la mera consulta como “el usuario lo vio”. No hay generación real, migración remota, cliente externo ni guardia permanente habilitados.

Reversión: retirar código y mantener gates cerrados; este bloque no añade escrituras ni tablas. Preservar los resultados históricos de propuestas. El baseline remoto sigue siendo el del documento `AFW-GOAL-CONTEXT-CLOSED-BASELINE-2026-10-06.es.md`; no se modificó aquí.
