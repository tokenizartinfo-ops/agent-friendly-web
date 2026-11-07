# AFW — observaciones actuales para presupuesto de lecturas

7 de noviembre de 2026, investigación de solo lectura. PROJECT AFW; repository tokenizartinfo-ops/agent-friendly-web. Fuente probada92d0255a2d5c2ac2249941e8348a0d5701742604, final de código idéntico29681cae2bf1094ec5c66d5b2784254f77bec697. El plan de cierre pasó sus dos gates de tarea; la revisión conjunta sigue en curso. Este documento no modifica código, no abre un ensayo y no declara cerrado M1 ni viabilidad productiva.

## Primaria de la misma calificación, sin repetirla

Run42390108314/attempt1, job productor128455701913, marcador R1 sanitized native marker de g0. Root leyó el log ya terminado y parseó su JSON completo. El workerM compilado tiene1,988,061B/hashc49303bee6b3a97fa1e022bfb697bb2e94fd1e37bcdd925ae9d86c774537cc32. QA de ese linaje tiene2,507,783B/hash5e8f21937a14f44b0de711f63eaf2053f06d26f116eee650b485c070e3e948b0. No sustituir esta QA por el tamaño de una revisión anterior.

|Observación SYN|Valor|Alcance|
|---|---:|---|
|http.requests agregado|854|Acumulador de la fixture del productor; no clasifica endpoints/buckets|
|http.bytes agregado|1,056,133,138|Cuerpos contabilizados por ese acumulador; no facturación ni pico de RAM|
|httpSpans conservados|350|Filtro con childStartedAt entero; todos kind=observer|
|Bytes de esos350spans|432,841,450|Subconjunto, distinto denominador que el agregado854|
|GET de autorización observado|7752ms|Un request Root de30s, no el ciclo completo|
|POST de autorización observado|10344ms|Otro request Root de30s|
|Lookup SDK|808ms|Child configurado5s, aborted=false|

El productor registra cuatro Roots GET/POST/GET/POST de30s. Su lista requests contiene los dos requests de autorización anteriores. No dividir el agregado854 por la suma de sus duraciones ni afirmar que cada respuesta fue una llamada real a la API de control. Tampoco interpretar350spans como una pérdida de504respuestas: el código de proyección aplica un filtro explícito y omite campos.

La proyección está en test/fixtures/finite-owner-cleanup.mjs, blob4e88d73a818497a5a64dcc34ee15737e93521d96: state.http se agrega completo en http, mientras httpSpans filtra childStartedAt y conserva sólo kind/bytes/elapsedMs/bodyGuardMs/childStartedAt. No contiene método, endpoint, clase de recurso, cuota ni fase. Root no reconstruye información que no fue conservada.

Job consumidor128459192501, resultado principal g0 de la MISMA ocurrencia: providerRequests168;870observaciones child (máximo104ms/suma2362ms),55SQLcalls/75ms acumulados,1KVlist/1KVdelete. Son contadores de scopes distintos. La suma de children no es duración Root ni pico de concurrencia; providerRequests no equivale a toda la actividad del productor. Faltan desglose de bytes/lecturas/cancelación por fase, RTT y cuota reales. Se mantiene Task2-M1 y Task1-RM3.

Referencia primaria: [run completo](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42390108314), jobs indicados y reporte2d36b667a1065f64630bfd84ecec84c25da0fe80. El resultado global56/56 prueba los escenarios declarados, no este presupuesto.

## Documentación oficial revalidada el7nov

La referencia REST publica1200solicitudes por5min para el límite general por usuario/token de cuenta, con consumo acumulado de dashboard/claves/tokens; determinados servicios tienen límites propios. Ratelimit y Ratelimit-Policy permiten observar remanente y ventana, y429 puede incluir retry-after. Esto no demuestra la cuota efectiva ni el consumo compartido de AFW; tampoco justifica multiplicar tokens para eludir un bucket. [Límites API](https://developers.cloudflare.com/fundamentals/api/reference/limits/).

Las versiones Worker son inmutables en la API; una modificación crea otra versión. La configuración de deployment decide qué versión sirve tráfico, y los almacenes asociados KV/R2/DO/D1 no quedan congelados con la versión. Por ello una eventual prueba de bytes inmutables no sustituye checks frescos de pointer, custodia, identidad, consentimiento o estado operacional. [Inmutabilidad](https://developers.cloudflare.com/workers/platform/infrastructure-as-code/#resource-immutability), [versiones y deployments](https://developers.cloudflare.com/workers/versions-and-deployments/).

El GET de versión ofrece include=modules; pedir módulos puede agregar variosMB a la respuesta. Omitirlos reduce contenido solicitado, pero no demuestra por sí solo igualdad con los bytes calificados ni reduce el número de llamadas. Una versión identificada por latest o prefijo tampoco sustituye el UUID exacto del contrato. [Get Worker Version](https://developers.cloudflare.com/api/typescript/resources/workers/subresources/beta/subresources/workers/subresources/versions/methods/get/).

Workers Paid documenta por defecto10000subrequests por invocación y seis conexiones salientes simultáneas. Ese presupuesto y el límite REST anterior son controles diferentes. La documentación no acredita el plan/configuración/cuota efectivos de los recursos de este ensayo ni RTT dentro de Root30s/child5s. [Límites Workers](https://developers.cloudflare.com/workers/platform/limits/#subrequests).

## Qué puede decidirse y qué sigue abierto

- Hecho: el productor SYN conserva más de1GB de cuerpos agregados. Hecho: el acumulador actual no permite atribuirlo a endpoints/fases ni medir toda la cancelación/concurrencia. No se declara un incidente de Cloudflare, un429 ni un consumo real.
- Inferencia limitada: repetir verificación de módulos idénticos puede ser una oportunidad de ahorro. Antes de cambiarla hay que localizar cada adquisición, distinguir recursos inmutables y mutables y medir por llamada/Root/fase. No convertir esta posibilidad en ahorro demostrado.
- Alternativas a evaluar después del gate conjunto: conservar controles y primero mejorar medición; reutilizar una prueba privada de bytes solamente dentro del MISMO Root, versión/hash/holders/lease exactos con verificación fresca del contexto mutable; o rediseñar la admisión para hacer menos llamadas antes de efectos. Cambiar capacidad comercial no arregla por sí solo un fanout no medido.
- Nada autoriza una caché global o entre usuarios/requests, aceptar DTO de éxito, debilitar identidad/pointer/freshness, prolongar Root/child/C0/C1, reintentar SEND incierto o omitir body/cancel retention.
- Una futura unidad de viabilidad necesita diseño completo, presupuesto por fase incluyendo retirada/rollback y prueba de incumplimiento antes del fanout; Source/SYN primero y lectura operacional acotada sólo cuando corresponda. La selección técnica es de Root bajo la delegación del owner, no una decisión atribuida a Gabriel.
- No se inicia una implementación paralela a la revisión conjunta: sus hallazgos pueden cambiar el siguiente bloque. Gabriel no está disponible antes de19:30UTC/16:30Argentina; no se piden códigos ni permisos mientras se estudia.

Trabajo en herramientas cloud/GitHub, sin clone/build/deps/tests/temporales locales. operationalReadiness=false;completePackage=false;PCoff=false. No Sourcewrite, nueva calificación, runtime, schema, credenciales, OAuth, recursos remotos, main, Max ni correo.
