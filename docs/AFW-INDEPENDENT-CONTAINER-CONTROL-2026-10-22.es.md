# Control independiente de Container AFW — 22oct2026

**Resultado: control técnico positivo y cerrado. El recorrido completo AFW y PC-off siguen pendientes.** Fuente ejecutada f99a4ad0dd626e0c46882aeb2a7282987be8a27f, [PR566](https://github.com/tokenizartinfo-ops/agent-friendly-web/pull/566). [Recibo primario](https://github.com/tokenizartinfo-ops/agent-friendly-web/pull/566#issuecomment-6340943690); detalle estructurado en evidence/afw-independent-container-control-20261022.json.

## Qué se hizo realmente
Creación auténtica con Wrangler4.149.0 de Worker/workflow privados afw-container-control-20261022, clase AfwContainerControl, nueva SQLite namespace y aplicación88bd4bc69e0a4ef5b8ac959f2fb9cef2. Mismo compatibility_date2026-09-07 que la condición histórica, scheduling_policy=durable_object; managed image cloudflare/debian-trixie/lite/enableInternet=false. Ningún Docker/build/instalación/modelo local ni credencial nueva o trasladada. Excepción local: unos12KB de fuente congelada más logs para CLI de carga/asociación; ejecución y evidencia en Cloudflare/GitHub.

Closed baseline0c94d94f-5575-491c-8046-0199235352c4 creado por Wrangler, flagfalse/start0/end1. El Workflow administrativo de comprobación rechazó el estado cerrado antes del DO. Ventana ORIGINAL única12:33:57–12:43:57UTC, sin extensión; activa5ff8ef9f-a68b-451c-8c56-d664636f9013/deploymentbbb7000f-f45f-4a26-8a89-c9b5b361a304 al100%.

## Resultado primario
Workflowafw-20261022-0907,12:34:24–12:34:25UTC, una sola tentativa: ctx.container presente, un start, puerto listo, GET y POST/ACK sintético exactos, destroy reconocido y runningfalse. Resultado fixed_roundtrip_verified. No se ejecutó0929: solo correspondía si0907 registraba ausencia nativa; tampoco se repitió0907.

La API independiente instances-v2 registró la colocación atl08/ENAM: inicio12:34:25.078, parada12:34:25.505, exit_code0; active[] a12:34:50 y12:35:58. El ACK fijo es control de transporte, no firma/credencial/suscripción/revisión de un asistente.

## Retirada y preservación
close-01 terminó12:34:48 con ACK; inspect-01 terminó12:35:02 y confirmó cancelled=true, nativeRunning=false y exactamente un caso0907 consumido. La retirada es una barrera terminal persistida: no permite arranque tardío ni otra condición. La limpieza normal es privada y no renueva la ventana. La segunda condición no se necesita y no puede autorizarse después de retirar el control.

Se restauró EXACTAMENTE closed baseline0c94d94f al100% mediante deployment3b19fa2c-5fbc-4755-bcd3-d8e26e82f3c9 a12:35:29. Readback12:35:58: flagfalse, ventana0/1, workers.dev/previewsfalse, cron[], active[] y namespace conservado. Listado12:37:31: los cuatro Workflow instances complete. Un agregado anterior quedó temporalmente queued1/complete3; el resultado individual y listado posterior son la evidencia, no se volvió a disparar nada.

Original delegated canary verificado antes12:29 y después12:35:58 sin cambios: deployment799ff2e0-3b83-4ba9-ab97-985279fa827c,79593972-3200-464f-aff6-76f5864dd399 al100%, ocho flagsfalse, namespace d6fc71552de7494a863aca20365a572d, mismos exports/container/bindings. No se invocó ese namespace, leyó su custodia, abrió OAuth/OTP/grants, usó Max/Tokenizart, activó cron o guardia. Nuevo control/namespace/history quedan preservados cerrados, sin borrado.

## Fuente y límites comprobados
RED inicial48e26445/run39776162534: helper ausente explícito. Revisión642f detectó retirada sin barrera y headroom reaplicado. Regresiones3b1e5f75/run39777968651:2782PASS/2FAIL/1SKIP, ambas nuevas fallas reproducidas antes de corregir. f99a4ad0: focal39778497184 PASS; wholeCI39778497264/job119823444272 SUCCESS2784PASS/0FAIL/1existingSKIP, lint0errors12warnings, cinco buildsPASS. Revisión exacta0Critical/0Important; Minor diferido: si falla la persistencia de cancelación antes de destroy, no hay recibo exitoso de retirada. Si ocurre, no aceptar cierre sin barrera durable reconocida y active[] independiente; no repetir start.

Un test OAuth concurrente existente falló una vez en642f (0 respuestas200 frente a1 esperada), pasó en el RED3b1e5f75 y en f99a4ad0. Causa no establecida; se conserva como observación intermitente, no como reparación ni prueba del OAuth remoto.

Este control usa Worker/clase/namespace NUEVOS: no reproduce la comparación exacta nueva clase dentro del Worker original sugerida por soporte. No permite distinguir namespace viejo, Worker, camino de publicación o cambio de plataforma. El nuevo contexto funcionó aunque exports.AfwContainerControl no lleva campo container y sí existe containers[class/name]; el original conserva ambos. Diferencia observada, no causa atribuida.

## Seguimiento y próximo recorrido
Actualización técnica enviada una sola vez al hilo del caso02382110, mensaje1a1639eea14d9ed1,22oct2026, con fechas/IDs/resultados/limitaciones; solicitada comparación de las asociaciones y verificación/reparación que preserve identidad/historia originales. No se mezcló con Cron ni OTP ni se creó otro reclamo. MonitorPAUSED; no hay guardia o nuevo seguimiento automático.

La nueva evidencia habilita preparar el siguiente ensayo del runtime original; NO habilita reusar su propósito, consentimiento, OAuth, identidad o presupuesto consumidos. Antes del recorrido completo: comprobar/reparar asociación ORIGINAL mediante diagnóstico acotado que preserve namespace, fijar nueva prueba propia y plazo, verificar elegibilidad y sesión actuales; después consentimiento/lectura/suscripción, evento, recepción, revisión útil cloud, retirada y cierre nativo. PC-off requiere una ocurrencia y resultado dentro de un intervalo de apagado declarado después de comprobar esos gates. No pedir apagar ahora.

operationalReadiness=false; originalIncidentRepaired=false; fullAFWCircuitAccepted=false; pcOffAccepted=false; Max no contactado. La prueba técnica aislada sí quedó completada. La extensión a todo AFW sigue abierta.
