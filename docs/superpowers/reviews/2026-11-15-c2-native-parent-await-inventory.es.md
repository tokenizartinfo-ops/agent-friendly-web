# C2 — inventario previo al parent nativo de cleanup

15nov2026; inspección Source estática de AFW, sin implementación, pruebas ni runtime. Continúa89a0814e9b44fd1cab0c9b48cd9629a675db67cc. Source cerradoe27fb843542eaf8868724b9d2f89c9ed348bb01e conserva Coreaefb08c1; la nueva observación de R3 no autoriza tocarlo.

## Esperas visibles y límites de la evidencia

- worker/mcp-own/index.mjs089e5313,23–29: #finite construye el cierre nativo y devuelve resolveFiniteOwnNativeCleanupHost sin parent. Cada uno de los9 RPC50–58 espera #finite antes de invocar su operación. Native close24–26 espera c.host.close entre assertCurrent.
- CHb77bba63,47–49: una espera visible factory({ctx,env,nativeCleanup}); después comprueba host en WeakMap por ctx/env e identidad de datos. No hay parent anterior en esa firma ni en el registro hosts42. El contenido del factory real todavía es composición pendiente; no inventar su inventario de awaits ni afirmar que ya está instalado.
- CH30 espera la operación y luego current; CH24–27 tiene observe/capture/observe en retiro. CH31 crea RED con now:current.
- RED6ce7798e,21–49: invoke captura entered y monotónico al entrar, después de resolver factory. Cada llamada read hace primero withdraw y luego close (54); no debe reemplazarse un presupuesto global original por dos presupuestos nuevos de30s. La propagación assertParent existe como argumento interno, hoy por defecto vacío21–24; necesita origen real, no callback RPC.

## Reuso de mecanismos: comprobaciones concretas

lib/mcp-qa-finite-initial-lease.mjsa9cc083b,3–21 es un mecanismo interno que recibe deadline/ceiling/holders/fail del código fuente: ya estrecha con mínimo, reloj monotónico y child5s, retiene promesas y aborta en close. Sin embargo su Set pendingWork no se devuelve ni demuestra drenaje global: close aborta la observación y no espera que termine cada efecto emitido. No usar close como evidencia de ausencia física o permiso para repetir un SEND.

lib/mcp-qa-finite-stage-work.mjs068d35c2,6–24 conserva promesas ACTUALES en un scope AsyncLocalStorage y solo retira la exclusión cuando signal está abortada y el conjunto queda vacío. Su cleanup106–113 ya niega outstanding(ctx), pero captura env.RELEASE_DB. La ruta nativa de canary usa env.DB (CH14–17): reutilizar ese scope sin especificar el holder DB real no prueba la identidad requerida. Este punto debe resolverse en el binder privado de C2; no duplicar por comodidad un sistema de leases ni afirmar que el scope owner cubre automáticamente el canary.

Ruling: conservar estos mecanismos como referencia verificable, sin introducir ahora un parent nuevo. El futuro entrypoint debe fijar un único parent original antes de await factory, enlazarlo privadamente a ctx/env/storage/DB/namespace/version/métodos, estrecharlo por C1 sin reiniciarlo, y conservar las promesas reales fuera del race hasta su fin. La autoridad no viaja en JSON, copia de control ni argumento RPC. Debe preservar9 nombres y argumentos, y no devolver una capacidad genérica de clock/path/operación. Costo de asumir reuso incorrecto: holder DB sin comprobar o reentrada antes de un trabajo tardío.

## Controles mínimos para el cambio futuro

1. Factory demorada más allá del límite original: negar sin invocar operación.
2. Read doble: segundo read no repone30s.
3. Cambio ctx/env/DB/storage/método/versión durante cualquier await: negar.
4. Parent copiado, serializado o de otra invocación: negar sin efecto.
5. Respuesta tardía tras abort: no promueve recibo; no libera exclusión mientras haya promesa real pendiente.
6. Efecto ya issued con ACK perdido: conciliar hechos, sin repetir emisión.
7. Setter/callback/clock aportados por RPC: no aceptados.
8. Signal abortado o reloj hacia atrás: negar y conservar estado factual.

Es una lista de obligaciones de spec/TDD pendiente, no controles ejecutados ni suite calificada. Aún faltan el factory acoplado y continuaciones reales de notices/publication/SEND/ACK/receipt; el ensayo completo y PC-off permanecen pendientes. Los7 nonclaims siguen false.
