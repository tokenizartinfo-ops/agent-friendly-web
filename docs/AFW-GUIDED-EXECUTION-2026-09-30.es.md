# Ejecución del segmento de acompañamiento AFW

Base: `f14b8b30145f5420d2492955a3e6c87a7ac57619`. Rama: `fix/afw-guided-goals-20260930`. Solo AFW; no recursos de Tokenizart/Atelier. La validación privada y la publicación se registrarán después de comprobarlas.

## Decisiones y desviaciones explícitas

- MA-01: objetivos libres descartados en la extracción; intención citada transformada en una propuesta canónica. Conserva valores históricos y exige revisión vigente. Los tests reprodujeron el fallo antes de corregirlo.
- MA-02: un turno determinista con etapa, razón y revisión base. Objetivo antes de datos secundarios; contradicción explícita precede a otras propuestas. Contenido/servicios no exige CMS o hosting. Nunca afirma que el recorrido terminó por seis campos.
- MA-03, Ruling: ampliar el guardado existente de `copilot_working_drafts` con `session_json`, en vez de crear una segunda tabla/API. Texto y decisiones se escriben atómicamente con la misma revisión e idempotencia. El coste es compartir la unidad de conflicto; una recuperación conserva texto y decisiones juntos.
- MA-03: hasta nueve campos pospuestos y 32 decisiones de campo vinculadas al relato actual, ocho propuestas como máximo, estado de 7000 caracteres y cuerpo HTTP de 28000 bytes. Pendientes se revisan contra citas exactas del texto privado. No se guardan audio, credenciales ni nuevas copias del relato en eventos.
- MA-03, Ruling: el siguiente turno se recalcula desde el estado recuperado y la revisión actual; no persistir una segunda pregunta que pueda quedar obsoleta. `applied_to_draft` no significa guardado confirmado ni observación externa.
- Retención: propuestas y decisiones pertenecen al relato de trabajo actual. Editarlo retira propuestas y decisiones previas; campos pospuestos continúan. Borrar el relato desde el copilot borra también su estado conversacional. No se promete una eliminación temporal programada.
- Migración `0009_volatile_meltdown.sql` aditiva: una columna con valor por defecto. Rollback de código conservando tabla/columna y datos; no `DROP`. Compatibilidad con clientes anteriores: un PUT que omite sesión no la borra.
- MA-04: preguntas manuales y propuestas usan el circuito de revisión/guardado existente. Texto/audio quedan como alternativa desplegable; una propuesta visible por turno. La guía breve se conserva ante conflictos o sesión vencida; controles de recuperación y estado de guardado siguen disponibles.
- MA-05: contexto preparado por servidor, consultado por proyecto y dueño. Solo campos declarativos acotados, categorías conocidas, revisión y metadatos de decisiones. No correo, notas, credenciales ni historial completo. El proveedor no decide permisos. Una descripción genérica no se propone como nombre de empresa.
- MA-06: la guía breve permite abrir entrega/verificación sin mostrar todo el expediente. Prueba vertical sintética une objetivo confirmado, cápsula, aprobación manual y comparación de bytes antes/después. Es simulación local; no demuestra instalación en un sitio de cliente.
- MA-08: novedades dentro del expediente derivadas de observaciones fechadas del mismo origen; no una bandeja de mensajes externos ni scheduler. Solo compara con mismo método y orden temporal válido. Preferencias de seguimiento no se presentan como servicio activo.

## Límites y siguientes dependencias

MA-07 tiene dos identidades dadas por el owner y política AFW acotada preparada. Faltan sesiones reales antes de acreditar aislamiento remoto y retirada. El piloto exacto del copilot permanece cerrado; las pruebas locales de propiedad no equivalen a dos sesiones reales.

MA-09 conserva la dependencia de datos/fuentes y límites de coste. No integrar una ingesta masiva ni activar un proveedor externo por inferencia. MA-10 depende de demostrar utilidad con clientes; el cerebro empresarial y la transformación interna siguen como capas opcionales posteriores.

Cloudflare externo: revisión reservada para el jueves 1 de octubre; no se adelantó un nuevo rastreo para perseguir puntuación.

## Validación

Regresiones red/green verificadas para objetivos, horizonte, turno prematuro, recuperación, estado conversacional, nombre genérico y comparaciones temporales. Resultado final: 594/594 pruebas, TypeScript, lint sin errores, build y CI aprobados; revisión independiente cerrada. Logs en `output/` (ignorados). [Recibo de producción](AFW-GUIDED-RELEASE-2026-09-30.es.md) con prueba privada y pendientes.

Revisión independiente: se reprodujo y corrigió la pérdida de una propuesta aplicada cuyo guardado del expediente había fallado; al recuperar, se compara con el valor real del expediente antes de ocultarla. Se reprodujo y corrigió también la aplicación de una revisión anterior a la recuperación del relato: la aplicación exige época vigente y valores previos coincidentes. Recuperar otra versión invalida inferencias tardías y limpia previews/selecciones.

Ruling operativo: el registro de ejecución permanece en este documento y Git; se usa PowerShell y comandos de prueba directos para este segmento, en lugar del extractor de briefs Bash. Los fallos red/green y los límites de cierre quedan explícitos; no se contabilizan como despliegue.

El owner aportó dos identidades adicionales para MA-07. Sus direcciones no se incorporan a esta documentación pública. Se preparó y verificó la política AFW acotada del recibo, conservando el piloto y la propiedad del servidor; aún no se acreditaron sesiones reales de ambas. Retirar la política al terminar la prueba; la duración de sesión no la hace expirar.
