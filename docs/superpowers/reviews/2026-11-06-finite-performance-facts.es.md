# AFW — hechos para la calificación posterior de rendimiento

6 nov 2026. Investigación documental/Source, sin cambios de código, runtime, permisos o cuotas. Esto conserva el pendiente Task1-RM3 mientras se ejecuta Task2; no modifica su alcance ni autoriza optimizaciones.

## Evidencia del laboratorio

Task1 final probado en f2137bb10c599b12cef2952dd5c8efdaf301e259: principal GET9254ms, POST12026ms, lookup SDK714ms; el child consume+grant3612ms. El agregado final fue854 respuestas de fixtures HTTP y1037304146 bytes. Son cuerpos repetidos de simulación; no demuestran tráfico real, latencia de red, consumo de API ni coste. Fuente: [run42280666925](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42280666925), job128108468790 y reporte Task1 en2c6b5a0.

Otro run excedió un child5s antes deSDKcomplete sin identificar su operación exacta. El diagnóstico posterior de dos negativos sí identificó interferencia del polling pesado, corregida en la fixture; ese resultado no explica retrospectivamente el primer exceso ni califica el proveedor.

## Hechos oficiales consultados

Las versiones de Worker no se modifican en la API después de crearse; los cambios generan otra versión. La documentación distingue también contenido de módulo por hash y el coste de almacenar su base64. Esto identifica un posible objeto inmutable de verificación, sin demostrar que AFW pueda reutilizar su prueba actual. [Cloudflare IaC — immutability](https://developers.cloudflare.com/workers/platform/infrastructure-as-code/#resource-immutability).

Una versión incluye código/configuración/bindings, y un deployment decide qué versiones sirven tráfico. Los cambios de datos en KV, D1, Durable Objects o R2 no forman parte de esa versión. La inmutabilidad del código nunca permite tratar grants, identidad owner, permisos o almacenamiento como inmutables. [Versions and deployments](https://developers.cloudflare.com/workers/versions-and-deployments/).

La tabla actual documenta por defecto10000 subrequests por invocación Paid y seis conexiones simultáneas en espera de headers. Esas cifras no equivalen a la cuota de la API REST de control; los servicios llamados mediante bindings comparten el límite de conexiones superior. También se distingue tiempo CPU del tiempo de pared. Son valores documentales, no lectura del plan/configuración efectivos de estos Workers. [Workers limits](https://developers.cloudflare.com/workers/platform/limits/#subrequests).

El límite de control REST se evalúa separadamente, con su identidad y consumo compartidos. No inferir margen de AFW por una suscripción, otro token o ausencia de429 en una simulación. [Cloudflare API limits](https://developers.cloudflare.com/fundamentals/api/reference/limits/).

## Preguntas medibles para el siguiente bloque

1. Clasificar cada petición por operación/recurso y versión exacta: verificación de credencial, pointer deployment mutable, cuerpo de versión inmutable, GitHub objeto fijado, SQL/DO/KV mutable. Registrar bytes y duración por fase sin headers/secretos, separando respuesta/lectura/validación.
2. Cuantificar cuántas veces se adquieren, decodifican y hashean los M/QA/baselines idénticos dentro de una misma Root. El agregado de bytes por sí solo no identifica endpoint o cuota.
3. Hipótesis a evaluar con diseño/TDD, NO implementada: una prueba privada de bytes de versión adquirida nativamente podría reutilizarse dentro de la MISMA Root y holders/ID/hash exactos, manteniendo comprobaciones frescas del pointer y todos los datos/roles/custodia mutables. Debe impedir transferencia entre ctx/env/Root/revisión y conservar expiración/retención originales. La documentación de inmutabilidad no sustituye esa prueba ni modifica el contrato existente.
4. Medir el checkout final real después de Task2. No trasladar D11 ni cifras de otra revisión, ni ampliar Root30s/child5s/C0/C1 para que entre.
5. Antes de un ensayo real, comprobar cuota/configuración efectivas, latencia, proxy cloud, Source/custodia vigentes y rollback recuperable con el alcance preparado. Un laboratorio nativo correcto sigue sin acreditar ejecución cloud de Codex niPC-off.

No se ha propuesto cambiar planes, caché global, política de red o permisos. Task2 conserva su implementación aislada y su escritor único. operationalReadiness=false;completePackage=false;PCoff=false.
