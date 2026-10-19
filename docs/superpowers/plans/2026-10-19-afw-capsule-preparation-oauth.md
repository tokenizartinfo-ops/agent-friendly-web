# AFW: puente del contexto OAuth al host de preparación
19oct2026. Base806a3fd27fb7a81329b2fb6361ae11ff579ce179 / PR505 aceptada, CI39327486396.
## Alcance y diseño acotado
Continuación del contrato ya aprobado de preparación y del siguiente gate documentado en docs/AFW-CAPSULE-PREPARATION-HOST-2026-10-19.es.md. Un módulo desacoplado adapta únicamente {auth,props} obtenido por una función de servidor dentro del handler verificado del proveedor1.2.1. No verifica tokens por sí mismo. Default null antes de tocar contexto/relojes si el flag no es exactamente true; no montaje HTTP/MCP/Worker, scope/consentimiento, DDL/flags/credenciales o datos remotos.
Proyectar subject/client/audience/scope/expiresAt desde auth y grant/user/project desde props; subject igual a props.userId. Leer solo propiedades propias de datos, nunca token; vencimiento entero positivo en segundos Unix debe convertir a milisegundos representables sin redondear al alza. Rechazar ausentes/malformados/expansión de autoridad; el host original conserva comprobaciones de permiso/token/ventana/D1.
Capturar referencias auth/props y proyección inicial, repetir comparación antes/después de cada reloj y del resolver en el host. Mutación/cambio de referencia invalida la instancia por el latch existente. No congelar fuente del proveedor ni esconder cambios tras copiar datos. Preparación incierta conserva unknown_ack; reconcile no escribe.
## Tareas
Task1 pendiente: tests de mapeo/expiración/no lectura de credential y composición real con servicio SQLite; prueba SDK OAuthResourceServer1.2.1 + D1 nativo en Miniflare, con validador explícitamente sintético. Observar RED antes del módulo.
Task2 pendiente: implementar módulo y documentación; GREEN npm test, npm run lint, npm run build en Actions.
Task3 pendiente: una revisión fresca completa; Important/Critical una pasada RED→GREEN, sin bucle de re-review; CI exacta, merge con lease y CI main, recibos PR e issue497.
## Decisiones de alcance
Ruling: continuar esta adaptación acotada bajo autorización expresa del owner para decidir/encadenar bloques; la especificación padre y PR505 fijan contrato y gates. No pedir otra aprobación de implementación rutinaria; permisos de ejecución reales permanecen separados. Costo si mal delimitado: revisar fuente antes del montaje, ninguna activación remota.
Ruling: rama y Actions sustituyen checkout/worktree/build local por preferencia cloud-first. No instalar/descargar/compilar en PC. Costo: latencia del runner.
Ruling: getter de contexto es dependencia confiable del servidor, no de argumento de herramienta. No copiar token ni revalidar por HTTP externo; el SDK conserva validación criptográfica y el dominio comprueba grant actual. Campos token/otros datos ajenos a autoridad se ignoran sin accederlos. Refs auth/props cambiadas incluso con mismos datos cierran el host: privilegia cierre seguro ante deriva; requiere instancia nueva por petición verificada.
## Revisión y evidencia
Review focus: unidades y borde Date; getter/inherited/proxy; contexto reemplazado o mutado a través de awaits/relojes; default-null; token sin lectura; plazos originales/ACK; distinguir validador de test de verificación criptográfica; ausencia de montaje/activación.
Rollback: revertir fuente, nunca borrar historial ni DROP; ningún recurso remoto por revertir.
G2 aceptado/cerrado: no OTP/ensayo repetido. Container02382110/G4avisos/G5PC-off/Max separados. operationalReadiness=false.

## Constancia de ejecución
Task1 complete: RED0eaff54232edbec8839cc2c2d3926445f785976b / Actions39328890270/job118321714228:2209PASS/16FAIL esperados/1SKIP existente. Fallos por módulo/proyección/host faltantes, no por imports o setup; baseline anterior íntegro.
Task2 in_progress: módulo desacoplado en lib/delegated-capsule-preparation-oauth.mjs y documento propio. Puente conserva referencias de autoridad sin leer token; clocks se protegen antes/después y resolver no genera autoridad nueva. GREEN pendiente.

## Revisión completa y corrección única
Revisión fresca /root/review_preparation_oauth sobre1199f210:0Critical/1Important/0Minor. Important aceptada: guard detectado solo al resolver autoridad podía fallar fuera del catch de clock del host y permitir reuso tras restauración. Declined to judge: criptografía de token real, consentimiento humano, despliegue/activación. Ruling: permanecen gates separados expresos, ninguna aceptación implícita; costo si se confunden: abrir acceso sin evidencia, por eso el runtime sigue cerrado.
Candidato1199f210 / CI39329472802/job118323721958:2224PASS/1FAIL/1SKIP. Único fallo de harness: esbuild neutral no busca el main del paquete del proveedor. Se aplica mainFields module/main y condiciones workerd/worker/browser ya presentes en test/dossier-monitoring-oauth-native.test.mjs; ninguna dependencia o validación de producto relajada.
RED de revisión990c2cb5efb38cfe72c014a9d346e5d2d9918e17 / CI39329980178/job118325405675:2225PASS/1FAIL esperado/1SKIP. SDK+D1 nativo PASÓ. El único fallo observado es reactivación de la misma instancia en la frontera del resolver.
Corrección única: latch irreversible propio dentro de guard cubre cada fallo de contexto, incluido resolver y excepciones; host conserva sus guardas y plazos. Prueba cubre scope modificado y excepción, prepare/reconcile posteriores y cero persistencia. Sin segunda revisión. Task2 implementada; Task3 GREEN pendiente.
