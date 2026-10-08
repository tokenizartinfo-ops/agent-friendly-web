# AFW — coordinador persistente de cierre finito

## Alcance
Preparación interna sin rutas, cron, alarmas, credenciales, SQL remoto ni despliegue. Complementa el diseño host-observer-independent-closure; el puente host ya fue aceptado por separado. No acredita cierre administrativo ni PC-off.

El coordinador recibe configuración confiable del servidor: occurrenceId UUID, baselineRef SHA256 y closeAt entero de milisegundos. No recibe cuerpos de consumidor ni URLs. Cada instancia almacena un único plan inmutable. Un adaptador futuro de Durable Objects aportará storage.transaction/get/put y reloj; requiere alarmas reales y capacidades administrativas verificadas antes de activar.

## Protocolo
Tres pasos ordenados: revokePlan, closeLedger, restoreAdministration. Los callbacks son capacidades confiables a construir, no funciones aportadas por usuarios. La constancia válida exacta es respectivamente {verified:true,state:'revoked'}, {verified:true,state:'completed'|'stopped'}, {verified:true,state:'restored'}. completed se conserva; no exige cambiarlo a stopped. restored debe significar readback administrativo efectivo de los recursos propios y baseline preservada, nunca vencimiento SQL.

Antes de cada callback, una transacción persiste estado issued con paso y número de secuencia. Los callbacks se ejecutan FUERA de la transacción para que una repetición de transaction no repita efectos. Una ejecución concurrente o un reinicio con issued pendiente devuelve intervention_required; no vuelve a emitir la acción. Error, respuesta inválida o pérdida de respuesta tampoco repiten escrituras.

Ampliación del bloque de readback: callback opcional confiable readIssuedReceipt({occurrenceId,baselineRef,closeAt,step}) y método reconcile(). Solo consultan resultado de issued existente, fuera de transaction. Misma constancia estricta por paso; desconocido/error/ausencia conserva issued. Una constancia verificada avanza por CAS persistente, sin ejecutar capacidades de escritura; retorna waiting para que tick continúe explícitamente, o complete si ya se verificó restauración. Consultar no crea issued ni marca complete desde la revocación sola. Dos lecturas simultáneas no pueden avanzar dos pasos: el perdedor retorna intervention_required conservador. Los adaptadores reales deben correlacionar recurso/plan/baseline/paso y demostrar resultado; no usar un callback que simplemente invente verified=true.

Solo tick() después de closeAt permite iniciar. Los tres pasos pueden completarse en una invocación; en cada uno el coordinador usa CAS transaccional antes de actuar. No cambia otras instancias. No almacena errores, secretos, dossiers ni respuestas crudas. El resultado público exacto solo incluye state (waiting, complete, intervention_required) y step (uno de los tres o null). complete requiere las tres constancias verificadas, incluida restauración administrativa. La disponibilidad/atomicidad real del storage y capacidad de callbacks no se prueban con mocks.

## Gates remotos
Actor alojado independiente; custodia fuera del runner; permisos reales de proveedor; rollback recuperable; adaptadores que no sobrescriban cambios administrativos legítimos; alarmas con entrega repetida probada; readback de recursos efectivos; prueba propia y finalmente PC-off. La consulta actual de permission_groups respondió 403: no asumir acceso a creación de tokens. Las herramientas MCP documentadas de Agents API no prueban disponibilidad en AFW Operations.

Fuentes: https://developers.cloudflare.com/durable-objects/api/alarms/ y https://developers.openai.com/api/docs/guides/agents-api/tools/mcp .
