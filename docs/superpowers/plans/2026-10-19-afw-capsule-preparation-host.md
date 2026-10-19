# AFW: host cerrado y preflight de preparación delegada
19 de octubre de 2026. Base:2f3289a88be627d0828848bf22c7b25fe13a00a4 / PR504 aceptada.
Diseño padre:docs/AFW-AGENT-CAPSULE-PREPARATION-DESIGN-2026-10-19.es.md; servicio:docs/AFW-AGENT-CAPSULE-PREPARATION-SERVICE-2026-10-19.es.md.

## Resultado acotado
Construir un host de dominio cerrado y una comprobación de esquema, sin registrador MCP/HTTP ni modificación del OAuth Worker, sus scopes o consentimientos. No cambia flags, schema, tokens ni datos remotos. No acredita servicio, permiso, pricing o PC-off.

Factory createDelegatedCapsulePreparationHost({env,resource,resolveAuthorization,now,monotonic}) devuelve null por defecto. Solo flag AFW_DELEGATED_PREPARATION_ENABLED exactamente 'true', junto al OAuth flag existente, servicio 'window', proyecto/cliente fijos, ventana canónica futura <=10min y bindings necesarios, permite construirlo. Pines originales, funciones de binding, reloj y contexto permanecen comprobados a través de awaits; no se renueva el deadline.
prepare/reconcile solo reciben el contrato estricto ya existente; identidad, cliente, recurso, scopes y tokenExpiresAt numérico proceden del resolver de servidor. El host no inventa un campo del SDK ni verifica bearer: el futuro montaje deberá aportar ese resultado desde validación criptográfica real. Exige afw:capsule:prepare en token además de la verificación del grant en D1 que ya realiza el servicio. El scope NO se registra aquí.
Cada llamada tiene presupuesto original<=5000ms incluido resolver/limiter/preflight/dominio, acotado por ventana y token. El dominio recibe notAfter absoluto confiable, reducido por tiempo monotónico restante; SQL reserva no obtiene cinco segundos nuevos. El cliente no puede aportar notAfter.
Limitador existente con key opaca estable por subject/client/project/resource; éxito debe ser exactamente true. No construir callback, token, secreto ni canal de gasto.
Preflight por llamada: leer SOLO sqlite_master del historial propio y SELECT LIMIT0 de columnas reales. No migrar ni leer respuestas/tickets/filas privadas. Validar tabla/constraints y triggers exactos; trigger ausente/debilitado/extra, tabla/campo faltante o error => no listo. No cache de readiness ni equivalencia entre esquema y autorización.
Canonical source DDL en módulo como strings inmutables; su proyección SQL debe coincidir exactamente con db/agent-capsule-preparations.sql ya aceptado. No cambiar ese esquema. Se tolera solamente normalización documentada/observada de CREATE IF NOT EXISTS y delimitador final, sin borrar cuerpos o comentarios arbitrarios.
## Plan y ledger
Task1 pendiente: compartir fixture existente sin cambiar sus24 casos; añadir19 casos host/esquema/deadline y1 D1 nativo. RED observado en Actions antes de implementar.
Task2 pendiente: módulo schema gate, exports de parser/column preflight y notAfter confiable del dominio; host cerrado, GREEN.
Task3 pendiente: una revisión fresca completa, una ronda de corrección Important/Critical con regresiones; CI exacta y main; recibos PR/issue497.
Pre-flight: el parser se comparte para evitar que host y dominio acepten argumentos diferentes; el DDL sigue fuera de drizzle; el deadline se comparte con notAfter en vez de empezar otro presupuesto tras preflight. No modificar catálogo/OAuth/Worker.
## Rulings
- GitHub/Actions reemplazan checkout/worktree/build local por instrucción expresa cloud-first. Pruebas nativas son en runners, no nube operativa de AFW.
- Validación exacta del historial antes de usarlo, sin escribir DDL: disponibilidad se sacrifica ante drift hasta revisión del esquema.
- Fixture refactor es extracción de test existente; no duplicar ni importar archivos .test que registren dos veces.
- El host exige vencimiento verificado del token explícito y no lo infiere del grant ni de nombres supuestos del SDK.
- Tras invocar prepare, cualquier cierre/timeout/drift incierto devuelve unknown_ack sin referencia; no regenerar. Reconcile no escribe.
- El montaje real conserva gates propios: consentimiento de preparación, registro de scope, API/MCP, tamaño antes de parsing, schema/preflight/migración/rollback, rollout cerrado y aceptación propia.
## Verificación
npm test; npm run lint; npm run build en Actions existente. Ninguna dependencia/workflow o despliegue nuevo. Native Miniflare D1 prueba normalización real, sesiones first-primary, cero cambios por preflight y rechazo de trigger retirado; OAuth/contexto/limiter son sintéticos.
Rollback: revertir fuente, no DROP/reset/borrado de historia. No invocar artefactos de build ni repetir G2/OTP o ensayos Containers.
operationalReadiness=false.

## Constancia RED
ebd1b7ed9ce9de484b310774c38e5064bb8ee06f / Actions39324988225 / job118308360850:2184PASS/20FAIL esperados/1SKIP. Host/schema ausentes y notAfter aún ignorado;24 casos existentes del servicio y el D1 anterior preservados tras extraer fixture. No fallos de import/setup.
Task1 complete. Task2 in_progress: host/schema en fuente, parser compartido y deadline absoluto, pendientes GREEN.
Ruling: inspeccionar solo los tres objetos propios y compilar consultas LIMIT0; no recorrer otras tablas o filas. La validación exacta de esquema es puntual y asume DB confiable, no sustituye la autorización del grant.

## Revisión y reproducción antes de corregir
Revisión fresca única /root/review_preparation_host sobre c0ce8eaa:0Critical/2Important/0Minor. Important1: cierre observado del host podía revertirse restaurando flag/método/reloj; Important2: llamadas separadas podían renovar tiempo efectivo de host/token con pared estancada. No segunda ronda de revisión.
Candidato c0ce8eaa Actions39325747486/job118311011669:2203PASS/1FAIL/1SKIP. El fallo era el reloj de ventana sintético capturado al cargar el módulo de Miniflare; el host real no estaba montado. Fixture anclado al primer request y HTTP verificado antes de JSON, sin relajar el host.
RED de revisión1637957b26aabeb9ee126ad4c793dd85e1ed5049 / Actions39326339207/job118313068285:2204PASS/5FAIL esperados/1SKIP. Pasó el D1 nativo; fallaron exactamente reactivación de instancia, ventana original entre llamadas, token original entre llamadas y los dos límites menores de lease SQL. Sin fallos anteriores.
Una pasada de corrección: invalidación terminal de instancia ante drift/retroceso/vencimiento observado; vida host/token anclada al par de relojes constructor; mínimo restante propagado a SQL sin inventar timestamps futuros. El fallo de un token/limiter no cierra por sí mismo un host válido. Reloj unitario determinista por fixture, con avances explícitos. GREEN pendiente.
Task2 implementada, Task3 en verificación. El montaje futuro debe construirse durante una petición válida, no con tiempo del arranque del módulo. Workers timers avanzan con I/O: no prometer tiempo de CPU/entrega independiente ni cancelación de SQL enviado.
Lectura primaria versionada del proveedor1.2.1: ctx.auth.expiresAt existe opcional en segundos Unix; host exige milisegundos. Se documenta el contrato del siguiente adaptador sin implementarlo ni activar permisos.
