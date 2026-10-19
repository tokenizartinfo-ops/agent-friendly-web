Continuación19oct2026: PR495 prepara el montaje de esta herramienta en el host OAuth únicamente con opt-in exacto, ventana/proyecto/cliente de servidor y nueva admisión primaria. Véase [montaje finito](AFW-CONTINUITY-OAUTH-HOST-2026-10-19.es.md). Los párrafos siguientes conservan el alcance original de PR494; el runtime/configuración desplegados no cambian por ninguna de estas PRs y no se presume disponibilidad real.

# AFW: continuidad de lectura delegada — alcance acotado

Estado: candidato interno en PR494. La aceptación exacta de CI/revisión/fusión se conserva en esa PR; no se presume por este documento.
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

## Constancia TDD y ejecución remota

RED observado:222861498cd6f0504c0d11840a180d5576729787 / [Actions39270427987](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/39270427987):2084 pruebas,2066 aprobadas,17 fallos de comportamiento del bloque nuevo y1 omitida; ningún fallo ajeno. El catálogo por defecto conserva dos herramientas incluso antes de implementar. La implementación candidata se incorpora después de ese RED y deberá superar suite completa, lint, build y revisión independiente antes de fusionar. Consultar [PR494](https://github.com/tokenizartinfo-ops/agent-friendly-web/pull/494) para head, resultados y estado final.

El SELECT nativo une permiso/owner/revisión, pero no convierte la lectura en un bloqueo ni en una garantía sobre cambios posteriores. La identidad/token se verifican en el host OAuth por petición; el nuevo método vuelve a comprobar el permiso persistido y estado de proyecto, no firma tokens ni crea consentimiento. Su mapeo produce la misma pregunta guardada, sin modelo, auditoría o cobro. Node22/SQLite/MCP sintéticos no acreditan conexión de ChatGPT real, Worker/Container remoto ni PC-off. Siguiente gate independiente: diseño y aceptación del montaje específico en el host autorizado y prueba del cliente con una ventana propia vigente; no renovar credenciales o abrir el piloto por la fusión.

## Corrección de revisión: admisión primaria nueva

La revisión fresca del head2f52e598a8300797c8f9ca17897e496add66c630 encontró un único P1: reutilizar la sesión D1 inicial podría leer una réplica posterior. [Cloudflare documenta](https://developers.cloudflare.com/d1/best-practices/read-replication/#start-a-session-with-all-latest-data) que first-primary dirige la primera consulta al primario; la consistencia secuencial de las siguientes no garantiza observar una retirada concurrente.

Corrección mínima: createDelegatedProjectRepository admite createPrimarySession, una fábrica confiable obligatoria solo para getProjectReadAdmission. Se invoca de nuevo en cada admisión y no cae al db/sesión inicial si falta, falla o no tiene prepare. El host futuro deberá aportar una fábrica que cree una sesión nueva sobre el MISMO binding primario, por ejemplo ()=>rawDB.withSession('first-primary'), sin reutilizar una sesión ya consumida ni aceptar factory/binding de argumentos del cliente. El Worker actual no la aporta ni activa la herramienta; sus lecturas anteriores no la requieren. La prueba de encaminamiento real sigue siendo un gate del montaje, no algo acreditado por un nombre de función.

GREEN anterior2f52e5 / [CI39271201550](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/39271201550):2083 aprobadas,0 fallos,1 omitida; lint sin errores y build correcto. Ese GREEN no cubría el P1. Regresión específica d8edf15c4e2ac4da0e9d7fd0c4ffef4fa694066d / [CI39271709502](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/39271709502):solo4 fallos nuevos,2083 aprobadas,1 omitida. Tres casos usan dos bases SQLite nativas divergentes: estado inicial viejo frente a primario con retirada, transferencia o nueva revisión. El cuarto exige falla cerrada ante fábrica ausente o fallida. La suite corregida y el head de integración quedarán registrados en PR494; no se declaran aprobados por anticipado.

## Límites de la revisión y decisiones de cierre

- Ruling: autenticación/consentimiento/token vigentes, bindings y encaminamiento D1 real son responsabilidad verificable del futuro host; esta fuente solo usa contexto confiable y comprueba permiso/estado persistido. No promocionar desde tests. Coste si se omitiera ese gate: acceso indebido o lectura vieja.
- Ruling: SQL/cliente MCP nativos sintéticos no acreditan despliegue, migraciones, rollback remoto, propietario/cliente real o UI. No hay cambios de esquema/runtime/UI; la futura aceptación debe comprobarlos cuando corresponda. Coste de confundirlos: anuncio de una integración inexistente.
- Ruling: frescura limitada y rechazo tardío no son cancelación de la consulta, latencia garantizada o serialización de cambios posteriores. La respuesta es una observación fechada de lectura, sin escritura. Coste de una garantía mayor: decisiones basadas en supuesta actualidad que no puede prometerse.
- Ruling: modelos, precios, pagos, instalaciones, eventos, callbacks/ACK, Container, guardia, Max y PC-off no se ejercitan ni se activan por este bloque. Sus gates conservan estado independiente; coste de asumirlos: capacidad/permiso inventados.
- Ruling: el responsable comprueba CI exacta, árbol y fusión en GitHub, fuera de la revisión estática. El P1 se cierra con RED/GREEN y suite completa, sin atribuir una nueva revisión del fix que no se realizó. No se identificaron otros hallazgos de fuente ni menores diferidos en esa revisión.
