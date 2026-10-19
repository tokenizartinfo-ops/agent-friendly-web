# AFW: continuidad de lectura delegada — alcance acotado

Fecha:19oct2026. Repositorio:tokenizartinfo-ops/agent-friendly-web. Base:1fa412351e1d15cdfdbda56e3358176a9903294c.
Gabriel pide continuar el siguiente bloque y mantiene autorización para implementar decisiones ordinarias y trabajar por GitHub/cloud. Cambio acotado del flujo existente, ejecutado por el responsable AFW en esta conversación; una revisión independiente al final. No necesita nuevas credenciales o permisos.

## Resultado y criterio de cierre

Reutilizar la lectura delegada y su orientación guardada para entregar el contrato interno de siguiente paso aceptado en PR493. Añadir operación interna project_next_step con afw:project:read, sin leer observaciones/cápsulas ni respuestas completas. Una herramienta MCP read_project_next_step solo se registra con continuityEnabled===true aportado por el host; el Worker OAuth no pasa ese flag. La superficie por defecto conserva sus dos herramientas y no se despliega nada.

La alternativa de registrar inmediatamente otra herramienta en OAuth ampliaría el catálogo real antes de su aceptación por cliente. Una API pública aparte duplicaría identidad y expediente. Se elige reutilizar el mismo servicio/repositorio con opt-in de servidor y aceptación sintética del protocolo, dejando el montaje real como gate independiente.

## Diseño de la lectura

El mismo contexto confiable de OAuth determina grant/subject/client/project/resource; nunca el argumento del agente. expectedRevision opcional debe ser entero seguro positivo, y detecta una vista anterior. Tras la lectura inicial, una consulta SELECT sobre la misma D1 une permiso, propietario actual y revisión en una fila. Comprobar todos sus identificadores, alcance, revocación, vencimiento y revisión antes de proyectar. No cambia la lógica ni la respuesta de las dos lecturas aceptadas.

Presupuesto de frescura fijo5000ms desde el comienzo de esta lectura; rechazar respuesta tardía o reloj retrocedido después del await. No promete cancelación de una consulta D1 en curso ni latencia máxima del transporte. La vigencia devuelta es el mínimo de ese presupuesto y ambos vencimientos observados del permiso original; una extensión concurrente no renueva la lectura iniciada. La consulta de admisión es evidencia de autoridad/revisión al leer esa fila, no una transacción serializable sobre el futuro.

La proyección reutiliza planCopilotNextTurn: ask→provide_information con pregunta conocida; summary→review con textos fijos para revisar objetivo pendiente o alcance proporcional. Estados desconocidos fallan cerrados. Solo proyecto opaco/revisión/fechas/una acción/un dato faltante; evidenceRefs=[] y capsuleRef=null. Principal se representa internamente por hash y no se devuelve. No texto del propietario, narrativa o propuesta sin revisar.

## Archivos y verificación

- lib/delegated-project-repository.mjs: SELECT de admisión parametrizado y método getProjectReadAdmission; incluirlo en preflight LIMIT0; sin tablas nuevas.
- lib/delegated-project-read.mjs: project_next_step, validación de revisión y revalidación final; ramas existentes conservadas.
- lib/delegated-project-continuity.mjs: mapeo de orientación conocida al contrato puro, con flags false.
- lib/delegated-project-mcp.mjs: opt-in exacto y esquema estricto de revisión opcional; recuperación sin reconexión.
- test/delegated-continuity.test.mjs: SQLite real y clientes MCP sintéticos, sin runtime ni propietarios reales.

TDD en GitHub Actions existente: primero comportamiento RED sin producto nuevo; luego implementación mínima y suite completa npm test/lint/build. Casos: éxito privado acotado; aplazamiento/resumen; permisos retirados durante lectura; transferencia de owner; cambio de revisión/client/resource/scope; expiración/extensión; frescura/reloj; errores saneados; SQL injection; superficie por defecto; argumentos de identidad rechazados; recuperación de revisión. Una sola revisión fresca al final; corregir hallazgos sustantivos con RED/GREEN.

## Límites, rollback y continuidad

No OAuth nuevo, endpoints, consentimiento, precios, cargos, instalaciones, eventos, Container, guardia, Max ni PC-off. No cambios al Worker host/configuración/esquemas/runtime. Rollback de fuente por reversión revisada de esta PR; no hay recurso remoto que restaurar. Checkpoint en esta rama/PR y constancia de cierre, evitando archivos/builds/clones locales. Verificar cuenta/proyecto/revisión para cada operación.

Ruling: la autorización continua del owner y la instrucción de avanzar el próximo bloque permiten estas decisiones acotadas; no se interpreta como autorización de un montaje o ensayo real. El ledger local se sustituye por el presente brief, commits y resultados CI remotos para respetar su preferencia de mínimo uso del PC. Si el catálogo no se monta, ningún agente externo obtiene nueva capacidad por fusionar esta fuente.
