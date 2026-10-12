# Puente privado firmado entre la autoridad durable y Node

Fuente interna preparada; no rutas públicas, flags remotos, proceso Container o Events activados. Parte de PR402/main aa4da475. El proceso separado comprobado es una fixture local, no Codex cloud ni un Container de Cloudflare.

## Diseño y alcance
`lib/mcp-node-private-bridge.mjs` compone el sender privado, el handler Node `/dispatch` y el handler Worker `/consume`. Son funciones internas; no se importan en el OAuth Worker ni en un despliegue actual. Ambos handlers fallan cerrados por defecto antes de leer dependencias. El host futuro debe suministrar Fetchers privados fijos, sin seleccionar destino, DO o código desde la petición.

Una capacidad de servicio de 32 bytes pertenece a UNA generación original de proceso y un Container registrado por servidor, con lease máximo de diez minutos. Se copia al crear el puente y se derivan claves separadas para dispatch, consume, handoff y receipt. NO usar la clave de custodia del journal, claves Cloudflare API/D1 o tokens de usuario. La distribución/custodia real de esa capacidad aún debe implementarse y comprobarse antes de montar el host.

Los mensajes HMAC ligan propósito, Container, generación, lease original y referencia exacta de transporte. El sender solo entrega referencia opaca. El consumidor verifica firma y además obtiene el contexto ORIGINAL de plataforma de un lector trusted; no acepta `verified:true`, Container o generación provenientes del body/header. El futuro montaje debe ligar ese contexto a la misma instancia DO, imagen/fuente registrada y proceso actualmente activo, sin reasignación tras reinicio.

Cada petición consume con un controlador nuevo cuya identidad es request-bound e inmutable; mantiene el almacenamiento y resolver primario originales. El factory NO puede crear otra namespace ni autoridad, ni reemplazar el permiso por la firma de servicio. La referencia, el permiso y el consumo first-ACK siguen siendo los de PR402. Retirada/vencimiento/confirmación perdida impiden recuperar bytes.

El handoff lleva firma de propósito separado y se coteja la huella de destino/sobre EXACTOS contra la referencia original; solo después Node invoca `sendSignedMcpCallback`, el transporte HTTPS nativo con DNS público, IP fija y certificado. Recepción también firmada, limitada a 1024 bytes. HTTP200 sin firma no basta; ninguna recepción acredita turno cloud terminado. Lecturas de body tienen límite real de bytes, UTF8 estricto, no redirects/retries y AbortSignal/plazo original. Cancelar durante la lectura de contexto no permite construir el controlador durable.

Una diferencia real de UN milisegundo entre relojes de procesos se reprodujo. Solo la fecha de emisión firmada admite hasta 1000ms hacia el futuro; debe ser anterior al vencimiento original. Vencimiento del transporte/proceso, dispatchExpiresAt y permiso primario permanecen estrictos: no se suma tolerancia ni se renueva presupuesto/lease. Retroceso del reloj local falla cerrado.

## Evidencia y límites
TDD: módulo ausente RED2; leases sin límite y cancelación durante contexto RED2; desfase1ms RED1 determinista tras diagnóstico de fallo intermitente real. Once pruebas enfocadas pasan; cinco repeticiones después de corregir el desfase también. HTTP nativo local + SQLite prueban referencia opaca, ambos consumos/fases originales, rechazo de replay y ACK perdido con cero callback. Dos pruebas ejecutan el handler en un Node hijo real y transfieren boot por IPC, nunca argv/logs.

Identidad de plataforma, dueño/OAuth y receptor son sintéticos en las fixtures. HTTPS público no se envía desde estos tests: se inyecta un receptor de prueba; el sender nativo existente conserva sus pruebas TLS separadas. No confundir sockets/proceso/crypto locales con hosting real, permiso de cuenta, suscripción del plugin o ejecución cloud.

## Próximo montaje
Registrar proceso/image/source/lease/capacidad sin reset, preflight de puerto listo ANTES del desafío global, transporte fijo DO→puerto Node y Node→hostname HTTP virtual→MISMO DO ligado por contexto de plataforma. No interceptar HTTPS del callback. Custodiar historia, arranque unknown-ACK y cierre; baseline/rollback recuperables, montaje propio cerrado. No repetir el spike de viabilidad Container aceptado y eliminado.

Fuentes oficiales revisadas11oct2026: [Workers connections](https://developers.cloudflare.com/containers/configuration/workers-connections/), [Outbound traffic](https://developers.cloudflare.com/containers/configuration/outbound-traffic/), [Durable Object Container API](https://developers.cloudflare.com/containers/api/durable-object-container/). La composición propuesta es una inferencia pendiente de prueba real de plataforma.

Después: consentimiento propio distinto de lectura, callback real y turno cloud terminado con resultado trazable al expediente; una ocurrencia alojada, retirada/cierre independiente y ventana PC-off acordada. Max sigue requiriendo preview/aprobación de mail exacto, identidad y consentimiento propios. No acción ni claves del owner necesarias para este bloque de fuente.

## Revisión y timeout corregidos
La única revisión fresca encontró un P2: abortar señal no terminaba un await colgado. Tres regresiones RED reprodujeron lookup de plataforma sin respuesta, cancelación del caller y transporte fijo que ignora señal. `bounded()` ahora compite contra rechazo por abort/deadline, limpia listeners/timer y observa rechazos tardíos; conserva todos los controles post-await. La consulta tardía no construye autoridad ni devuelve handoff. Catorce tests del módulo y 63 combinados pasan. Se detuvo la suite previa a corrección sin atribuirle aceptación; las comprobaciones finales se repiten sobre la candidata corregida. No se requiere otra revisión.
