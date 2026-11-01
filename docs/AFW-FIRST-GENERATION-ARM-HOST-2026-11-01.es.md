# Primer ARM privado — componente de fuente, sin montaje
01 noviembre 2026 UTC. AFW / agent-friendly-web.

lib/mcp-qa-generation-arm.mjs compone la primera generación desde el control legacy real: borrador inmutable por namedBundleHash, material validado, identidad original e histórica primaria, elegibilidad con cero reservas globales, dos observaciones HTTP reales de quiescencia y CAS del ledger. generationPlanHash se calcula aparte; no se acepta como clave de entrada. Relee el control y los cuatro journals literales a ambos lados del CAS, conservando issued/complete e incertidumbre; no reinicia historia ni oculta V2.

El host requiere prepared_idle exacto (cierre/despacho/reducción true; otros11flagsfalse;7políticaslegacyvacías), actor/UUID/fuente/capacidades fijados y presupuesto local del padre sin renovar. Sigue SIN IMPORTAR/MONTAR en producción: no RPC, Workflow dispatch, configuración, dato remoto o permiso por este bloque. La preparación cerrada .prepare() conserva su contrato y no se invoca después de pendingCAS.

nativeInvocation es una declaración confiada al futuro ensamblador, no una atestación de quién llamó. Los inventarios prueban presencia del bootstrap nominado, no procedencia de la invocación. Un resultado metadata armed mantiene TODOS los indicadores de autoridad/liveness/withdrawal/readiness/retry en false. No basta encontrar una fila armed para habilitar nominal.

## Verificación de fuente
RED inicial45fallos API ausente y nativo previo; casoProxy58PASS1FAIL y casos señal/cleanup59PASS4FAIL reproducidos y corregidos. Fuente revisadae55f5a18; GREEN41293605055/job12480975636963host/nativo+169regresiónPASS0FAIL0SKIP, lint0errors0warnings. Revisión independiente de tarea:0P1/P2/P3 pendientes. DO/D1 y SQL son reales en aislamiento de Actions; namespace/identidaddeinvocación/HTTP proveedor son sintéticos. No son una publicación o permiso real.
Plan/spec/ledgers: docs/superpowers/{specs,plans}/2026-11-01-private-generation-arm-host.md. El PR e issue497 registrarán el head/árbol/CI/paquetes/revisión global/merge efectivamente aceptados. Los builds existentes de frozen315 no incluyen este módulo no montado como un nuevo paquete QA certificado.

## Límite nativo todavía pendiente
La ruta read-only existente pasa H/deadline a otro contexto y comprueba su recibo al volver. Eso no prueba que una escritura remota no haya ocurrido después del timeout del padre. Una transacción emitida puede confirmar tarde o quedar sin ACK; el componente conserva uncertain y sus filas, sin borrar ni reintentar. SourceTask2a solo compone la frontera local declarada. La entrada mutante real debe resolver procedencia nativa y handoff/lease antes de montarse.

[RPC y tipos admitidos](https://developers.cloudflare.com/workers/runtime-apis/rpc/#structured-cloneable-types-and-more), [ciclo de vida RPC](https://developers.cloudflare.com/workers/runtime-apis/rpc/lifecycle/) y [transacciones DO](https://developers.cloudflare.com/durable-objects/api/legacy-kv-storage-api/#transaction) no equivalen a una cancelación atómica de commit remoto. Cloudflare documenta [performance.now y Date.now avanzados por I/O](https://developers.cloudflare.com/workers/runtime-apis/web-standards/#performancetimeorigin-and-performancenow); pruebas Node no certifican un reloj hospedado independiente. No activar flags experimentales ni ampliar plazos por inferencia.

## Continuidad independiente
PR706/maina9dbdec0 aceptó selección histórica privada (4906fullPASS/0FAIL/1skip) sin autoridad/montaje; no es prerrequisito del primer ARM. El disparador084703 permanece consumido sinCFwrites. Una sonda separada de sololectura enActions41293158050/job124808422622, fuente087de871 NOmerge, hizo1GET API: runner09:26:42.188–.711UTC yDateAPI09:26:42UTC coincidieron; comentario6555713570 devolvió created_at09:47:49UTC futuro. Origen de esa incoherencia no probado; no compensar relojes/TTL ni repetir el intento. Recibo issue497#6556113909. No confundirlo con Container o fallo de claves.

Consulta manual acotada de correo encontró solo avisos administrativos: Access02389649cerrado(30oct12:50UTC,ref1a18cdc33a89f18a) y encuesta(16:50,ref1a18db80ecc4a302), Cron02375364resolved(29oct02:29,ref1a1857d761819968). No nueva solución técnica Container en esa búsqueda. Ningún envío/reclamo/OTP o monitor nuevo.

Última primaria independiente runtime08:48:36.567UTC25GET: QA c570/DEP59328f0e,canary2607/7b5a,operador855/9790,14/8/3flagsfalse,23WFterminales,Container/cron/tails propiosvacíos, namespaces/exposiciónconservados. Es evidencia fechada, no garantía futura. Custodiaaceptada; no rotación/grant/Max. MonitorlocalPAUSED, owner ausentehasta12:45UTC, operationalReadiness=false/PCoffpendiente.
