# Observación nativa del namespace original — 22 de octubre de 2026

**Resultado positivo y cerrado: el contexto original instrumentado presentó Container. No se arrancó ningún proceso. El circuito AFW completo y PC-off siguen pendientes.**

[PR567](https://github.com/tokenizartinfo-ops/agent-friendly-web/pull/567), fuente ejecutada `ada73d6067b214be9f180864ce3c5102d1e639ba`. [Recibo primario](https://github.com/tokenizartinfo-ops/agent-friendly-web/pull/567#issuecomment-6342053970); [detalle estructurado](evidence/afw-original-native-observation-20261022.json). Complementa el [control independiente positivo](AFW-INDEPENDENT-CONTAINER-CONTROL-2026-10-22.es.md), que sí arrancó y retiró su proceso separado.

## Alcance y preservación
Worker original agent-friendly-web-delegated-canary; clase AfwOwnEventNode; namespace d6fc71552de7494a863aca20365a572d; nombre de servidor actual afw-own-event-first-successor-v1. No se usó el nombre histórico de otra condición, otra clase o namespace.

La versión activa previa79593972-3200-464f-aff6-76f5864dd399 se recuperó por la API Workers con include=modules. Su único módulo index.mjs tiene1792585bytes y SHA25626ec0366a57fcc2c6bbc832a85d79b24e23e4a1a55e5ab42ebbd28284ed4d4c2. No presenta import.meta ni imports dinámicos. Se conservó byte por byte como frozen-original.mjs, con wrapper aditivo que hereda la clase original y reexporta default/AfwNodeControl. El etag de plataforma no se confundió con el SHA del módulo.

Los29bindings, secretos por herencia EXPLÍCITA de795, compatibilidad2026-09-07/flags, exports, Container y uso se conservaron: SHA de configuración saneada bf1d2527f6ddc9b4d8f613c1b62b6474f82acb8f0fcefc81d500831e2509aa12. Solo se añadieron cuatro variables diagnósticas temporales; los ocho flags de producto siguieron false. Nunca se heredó latest, modificó migraciones/ciclo de namespace, ni leyó o escribió storage/SQL/custodia/DB/KV original. Creación, fuente, ejecución y evidencia permanecieron en GitHub/Cloudflare, sin nuevos archivos, dependencias o contenedores locales.

## Calificación previa
Helper ausente RED39784175006. Una regresión del plazo reprodujo la espera indebida de diez segundos: RED39784764804; se limitó al tiempo ORIGINAL restante. El fixture nativo falló500 por invocar el LoopbackServiceStub sin Options; el error quedó aislado39785960634 y se corrigió exclusivamente la llamada de ensayo a({}).

La prueba nativa ahora siembra tabla SQL y KV en la clase original y comprueba original→wrapper→original, métodos privados, datos y forwarding default/named. GREEN39786218806. Defensa de timestamp remoto: RED12PASS1FAIL en ese mismo run antes del fix; ada73d6 valida fecha canónica dentro de ventana. Revisión independiente inicial0Critical0Important2Minor; ambos Minor resueltos y delta sin nuevos Critical/Important. Focal39786413019:13pruebas puras+1nativa PASS. CI39786412780:2798PASS/0FAIL/1SKIP previo, lint0errors12warnings y cinco buildsPASS.

Promise.race limita la espera, no cancela un RPC en curso. El servidor vuelve a comprobar ventana/configuración después de observar y el driver descarta respuestas tardías. Las fechas de nodos diferentes no prueban un orden monotónico global.

## Ejecución real
Driver/workflow privados afw-original-native-observe-20261022, sin workers.dev, previews, tails ni cron; binding únicamente al namespace original. El control cerrado afw-20261022-original-closed terminó13:29:31UTC, observation_closed/step_count0.

Candidata original INACTIVA73ade098 comprobó módulo congelado y configuración preservada. Ventana ORIGINAL única13:30:29.605–13:35:29.605UTC, sin renovación. Original instrumentadocb116ff2-d059-4a27-82ff-c31abf64d095/deployment47b88a19 al100%; driver2e74f7e7-4b42-4e9b-a7cc-14b8625d9966/deploymentfd28da11 al100%, código/hash/versiones fijados antes de la única invocación.

Workflow afw-20261022-original-native:13:31:38.847–13:31:39.505UTC, un step, una tentativa, cero retries. Recibo nativo13:31:39.481: **present=true, running=false**, y start/setInactivityTimeout/interceptOutboundHttp/getTcpPort/destroy disponibles como funciones. Ninguna fue llamada; no se obtuvo puerto, ejecutó petición, arrancó ni destruyó un proceso original.

La instancia devolvió versionId de Workflow b979c3e5, distinto de la metadata tras PUT28beda9c y de los IDs Worker. Se registran separados; ninguno se usa como sustituto de la fijación de fuente Worker.

## Retirada comprobada
A13:32:01UTC se restauró EXACTAMENTE79593972@100%/deploymentf8d04767-201a-4144-aa47-292748754fbd y driver cerrado bfe6e074-d1bc-4689-a400-37c42e0d09d9/deployment37e37b0f. Readback13:33: original29bindings/confighash/fuente iguales, ocho flagsfalse, namespace conservado/use_sqlite+use_containerstrue, activeContainers[]. Driverfalse/start0/end1, sin superficies públicas/tails/cron y ambas instancias complete. No se borró historial o namespace. **No reutilizar las instancias ni la ventana consumidas.**

## Qué cambia y qué no
Ya existe evidencia nueva suficiente para preparar el siguiente recorrido propio. Este ensayo requirió nueva publicación e instrumentación: no demuestra que795 sin instrumentación haya recuperado el contexto, ni atribuye causa/reparación definitiva a Cloudflare. Tampoco prueba start original, catálogo, suscripción, evento/aviso firmado, revisión útil desde cloud, retirada nativa o PC-off. operationalReadiness/originalIncidentRepaired/fullAFWCircuitAccepted/pcOffAccepted permanecen false.

Próximo gate: plan propio NUEVO con identidad, propósito, consentimiento, referencias, presupuesto, receptor compatible y ventana vigentes; comprobar disponibilidad del consumidor cloud antes de abrir. Primero alta→entrega→revisión útil→baja con PC encendido; después una ocurrencia correlacionada con un intervalo apagado acordado. No inventar scheduler/guardia, usar permisos históricos, fabricar callback, crear expediente de Max ni enviar la invitación sin preview/aprobación exacta.

## Correo de soporte09:49ART
Mensaje1a163a8d1a29f1b3,22oct12:49:29UTC, casoOTP02389649: soporte atribuye el rechazo previo a propagación entre PUT y solicitud13s después; confirma aplicación/AUD y propone esperar30–60s y usar Policy Tester antes de otro OTP. Esto es diagnóstico comunicado por soporte, no reparación de Container ni despacho/recepción comprobados hoy. La documentación oficial permite [probar reglas e identidad previa](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/policy-management/), incluso antes de desplegar cambios; el Tester por sí solo no demuestra propagación en todos los colos o recepción de correo. [Troubleshooting oficial](https://developers.cloudflare.com/cloudflare-one/troubleshooting/access/) confirma que una denegación puede mostrar “correo enviado” sin envío real. Soporte aclara que Pro del sitio no cambia Zero Trust/Workers. No se pidió otro código ni amplió una regla en este bloque. Sin copia de headers/cuerpos o datos personales. Seguimiento localPAUSED; no guardia automática.

La nueva actualización técnica de Container quedó preparada en la PR. El intento acotado de leer el hilo para conservar su asunto devolvió Gmail403; no se repitió ni se envió otro correo. No implica un fallo de credenciales de Cloudflare y no impide conservar el resultado primario.
