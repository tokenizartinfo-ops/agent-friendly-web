# C2 — invocación nativa original y concurrencia: contrato previo

15nov2026. Sólo preflight DATA de Source; ninguna implementación, prueba ni despliegue. Continúa cf77fa6f48b409e7afeb57daff1a2743cf1f0887,89a0814e9b44fd1cab0c9b48cd9629a675db67cc y1825b1693163d432d45ee9b28918d7c7fbd9457d. Core sigue aefb08c1, Source cerradof8d55039. I3/Native/C2 implementación retenidos.

## Interfaz existente que se conserva

worker/mcp-own/index.mjs089e5313:50–58 conserva nueve RPC con exactamente un argumento cada uno: withdrawFiniteTrialPermissions,closeFiniteTrial,readFiniteTrialReductionReceipts,readFiniteTrialAdmissionJournal,beginFiniteTrialReservation,settleFiniteTrialReservation,sealFiniteTrialAdmission,readFiniteTrialCleanupReadiness,observeFiniteTrialCleanup. No agregar parent,clock,callback,selector,versión ni capability al argumento RPC. AfwOwnEventNode.#finite:23–28 hoy resuelve el factory antes de la operación. El cierre nativo:24–26 espera c.host.close con controles antes/después.

## Decisiones concretas para el futuro cambio

1. Capturar una sola invocación original, síncronamente al ingresar a ese recorrido y ANTES de llamar/esperar el factory. El inicio wall+monotónico ya debe estar fijado cuando resolveFiniteOwnNativeCleanupHost ejecuta su await:47–49. Resolver la configuración no puede regalar otro presupuesto. Un setup o una invocación anterior no son su parent.
2. La identidad es de ESTA invocación, no meramente de ctx/env. cleanupHostb77bba63:8,42,47–49 usa hostsWeakMap por host→ctx/env para acreditar origen; esa marca no acredita un parent de llamada ni se reemplaza por un parent mutable compartido en el host. Dos RPC solapadas con el mismoctx/env deben conservar starts/deadlines/exclusiones distintos y no cambiarse la autoridad una a otra. El mecanismo privado exacto se decidirá junto con el factory real, no se inventa aquí un API genérico ni wrapper público.
3. Fijar antes del primer await los holders reales nativos ctx/env/ctx.storage/ctx.id/env.DB, namespace y version_metadata, y los métodos que se usarán. Al resolver factory/control, demostrar la misma cadena y estrechar por C1 y los límites originales existentes; nunca reiniciar30s, extender plazos o completar metadatos desde el caller. cleanupHost:14–17 ya compara titulares/métodos; reutilizar esa identidad y añadir alcance de llamada no reemplazarla con igualdad JSON. Env.RELEASE_DB de un scope de QA no es env.DB del canary.
4. El read doble de reduction6ce7798e:54 hace withdraw/read y close/read secuenciales. Ambos deben consumir el MISMO parent original y su resto; sus límites locales sólo estrechan. No sumar dos ventanas30s ni permitir que el segundo renazca tras resolver factory.
5. Cada promesa real emitida durante factory/operación/close permanece retenida por el alcance de exclusión hasta su término real. Promise.race y finally:48–49 de RED abortan observación, pero no prueban desaparición del trabajo. Una respuesta tardía no produce recibo positivo ni habilita reentrada/reenvío. issued+ACK perdido se concilia con hechos primarios, sin segundoSEND.
6. El factory instalado y sus awaits materiales todavía faltan. No declarar que está cubierto por esta lista ni completar su inventario con callbacks ficticios. El próximo dispatch de implementación debe aportar fuente completa del factory y mapa específico de sus awaits/efectos antes de modificar Core.

## Red/fijo/mutantes exigibles, aún no ejecutados

- Misma invocación: factory consume el presupuesto original y luego niega sin operación; el parentcapturado después del await debe ser detectado por el control.
- Dos reads consumen un resto común; mutación que reinicia30s debe fallar.
- Dos llamadas solapadas mismoctx/env no comparten parent; copiarlo de otra llamada o persistencia no sirve.
- Cambios de ctx/env/storage/id/DB/namespace/versión/método durante CADA await niegan.
- Promesa real continúa pendiente después del timeout: no hay recibo positivo, reentrada ni replay; sólo fin real drena su exclusión.
- ACK perdido después de issued: reconciliación sin emitir de nuevo, incluyendo el camino ya revocado autorizado para cleanup.
- Parent/clock/callback aportados en RPC, reloj hacia atrás o señal abortada: negar sin efecto.

Esto precisa diseño/TDD pendiente. No son controles pasados ni autoridad para cambiar clocks, SQL, políticas, permisos, suscripciones, runtime o datos del owner/Max. Siete nonclaimsfalse; prueba integrada/PCoff siguen pendientes.
