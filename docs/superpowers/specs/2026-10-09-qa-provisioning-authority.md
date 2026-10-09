# AFW: autoridad administrativa del ensayo privado

Estado: diseño previo a implementación; 9 octubre 2026. Contexto y autorización: continuar el ensayo propio hasta PC-off, sin intervención entre bloques rutinarios. No abre clientes, rutas ni permisos. Es una extensión de 2026-10-08-trusted-qa-closure-catalog.md y 2026-10-09-private-qa-installation.md.

## Resultado y límite de evidencia
El productor de readProvisioning debe justificar un registro exclusivo propio con creación en proveedor, custodia utilizada en ejecución cloud e inventario administrativo. No basta con comprobar coherencia de hashes. La exclusividad será del registro y de los recursos propios inventariados, no una afirmación de que nadie pudo copiar jamás una credencial ni una atestación criptográfica de VM.

La instancia cloud01a120f4 adoptó config6abe/publicación6ac8f1959/fuente0c559 y pasó22focales; eso prueba fuente/pruebas, no custodia. readDraft expone name/source/optional/target.environment_variable/target.allowed_domains/has_saved_binding/error_code. Destinos son declarados; has_saved_binding es observación de plataforma. No expone vaultref/keyref/version/fechas/revocación ni recibo de instalación. No construir un emisor que los invente.

## Alternativas y decisión
1. Recibo de custodia emitido por plataforma: preferible si aparece una capacidad oficial, actualmente ausente.
2. Prueba funcional acotada de uso de identidad más correlación administrativa independiente de la ejecución cloud: candidata viable, sin exigir atestación de VM que la plataforma no ofrece. Debe diseñarse y probarse antes de tratarla como fuente de readProvisioning.
3. Declaración de operador basada solo en formulario/status: conservar como declaración; insuficiente por sí sola para instalar.

Se selecciona investigar y preparar2; mantener1 como mejora futura. No convertir la propuesta en garantía operativa. Las dependencias administrativas tienen que leer fuentes reales y ser inaccesibles al consumidor; no aceptar configurationId/publicationId/source/recursos del cuerpo HTTP como autoridad.

## Contrato que debe satisfacer la comprobación funcional
- Operador fija por canal administrativo propio la inscripción completa V2 y aprobación completa; registro inmutable, recurso account/token/app/policy/Worker exacto, presupuesto y ventana finitos, rollback disponible.
- Proveedor confirma creación/versión/vencimiento y selectores efectivos; inventario propio acotado permite detectar identidad reutilizada o otro enrollment. La fecha y procedencia de cada lectura se conservan sin claves.
- Servidor emite un desafío de un solo uso ligado a la inscripción y aprobación completas. El cliente solo puede responder al desafío; no seleccionar recursos, aprobarse, instalar ni ampliar la ventana.
- Servidor verifica identidad de servicio firmada por Cloudflare con origin, issuer, audience y clientId fijados administrativamente. JWT/credenciales no se persisten en recibos ni se imprimen. Reutilizar los controles existentes solo donde sus contratos se apliquen exactamente.
- Operador correlaciona la recepción con la tarea/config/publicación/fuente realmente observadas y la operación cloud efectivamente ejecutada. Una respuesta autenticada aislada acredita posesión, no procedencia cloud; una lectura de status aislada no acredita posesión.
- Incertidumbre sobre ACK, fecha, publicación, retirada o procedencia: estado pendiente/no disponible, sin repetición ciega ni instalación. El desafío nunca abre las seis operaciones del ensayo.
- Confirmación, consumo y retiro requieren transacciones/CAS del registro primario; conservar historia. Revocación administrativa impide nuevas autorizaciones. El registro conserva datos suficientes para cierre/reconciliación incluso tras el vencimiento; no confundir expiración de credencial con borrado de propiedad del recurso.
- readProvisioning devuelve el contrato ya existente solo cuando se verifican conjuntamente las fuentes y la reserva exclusiva del registro. Ningún fixture, hash, booleano de cliente ni callback constante cumple esta condición.

## Pruebas necesarias antes de habilitar
Identidad/audience ajenos; inscripción o publicación diferente; nonce caducado/reutilizado; respuestas perdidas; retiro durante awaits y antes de commit; evidencia cloud sin recepción y recepción sin evidencia cloud; inventario incompleto; recurso compartido; deadline; intento de instalar desde el consumidor. Pruebas nativas SQLite/DO para consumo y retiro atómicos. Prueba real propia separada de las sintéticas.

## Secuencia y criterio de cierre
Primero contrato exacto de desafío y correlación administrativa, después plan y código internos sin montaje. Luego fuentes administrativas reales, nuevas claves finitas solo cuando la ventana sea viable, wiring cerrado recuperable, comprobación funcional propia y catálogo privado. Después cierre espontáneo/readback, HTTP acotado, una ocurrencia programada identificada y finalmente intervalo PC-off acordado. No pedir apagar ahora ni invitar a Max.

No implementación ni nuevos recursos por este documento; ninguna prueba de posesión/custodia fue ejecutada. El próximo bloque debe convertir el contrato en una comprobación mínima; si no se puede obtener correlación administrativa independiente, conservar cerrado y registrar esa limitación.

## Revisión técnica y recuperación administrativa de trazas
La revisión cloud señaló tres riesgos: correlación circular, bootstrap que dependa del catálogo aún no instalado y afirmar exclusividad de custodia desde mera posesión. Se aceptan: pre-registro administrativo separado; desafío no instala; exclusividad limitada a reserva CAS propia.

Comprobación propia de read_thread con includeOutputs=true: el primer turno01a120f4-f428-7420-8859-d2a66f806f51 incluye mcpToolCall exec-0e1b368b-8cd0-4955-a137-6bd0209ff1b6, servercodex_apps, toolcloud_environment.environment_status, arguments{}, statuscompleted. La respuesta recuperada no contiene result/content/structuredContent del MCP. Por ello esa lectura acredita que se llamó a la herramienta, pero no recupera sus valores oficiales. En cambio commandExecution sí expone command/cwd/exitCode/output para las ejecuciones CLI. El chat cloud conserva el resultado original, pero su informe no sustituye una lectura administrativa completa.

Una captura de stdout con configuración/publicación escrita por cliente no suple el resultado MCP ausente. El administrador debe obtener la observación oficial por canal soportado o registrar este punto como no comprobado. La exploración de la interfaz dejó visibles los informes y controles de actividad; no se recuperó por esa vía el resultado oficial íntegro. No repetir navegación sin una capacidad concreta nueva.

Ajuste de secuencia: no implementar todavía un emisor que devuelva stateexclusive apoyado solo en este conjunto. Puede prepararse el desafío y su registro propios como componentes internos separados, pero sus pruebas no cierran custodia ni autorizan instalación. La prueba integrada seguirá bloqueada mientras el vínculo administrativo necesario no pueda comprobarse; ningún nuevo secreto resuelve por sí solo esa ausencia de evidencia.

## Avance local posterior al reinicio, 9oct
Preparado el ciclo interno createPrivateCustodyChallenge: nonce de un uso, digest persistido, contexto administrativo completo e identidad suministrada exclusivamente por el host, retiro permanente y estado transaccional. Plan: ../plans/2026-10-09-private-custody-challenge.md. Pruebas unitarias/nativas y revisión corrigen carreras de ACK y lectura de estado. No se implementó correlación administrativa cloud, autenticación remota ni emisor readProvisioning; los gates de este diseño permanecen pendientes. Evidencia local: output/afw-private-custody-challenge-preparation-20261009.md.

## Alternativa administrativa proporcional, 9oct
Revisión posterior con tarea01a120f4/turn01a1213f-e993-72b7-9ea5-426bab46bc97: el resultado MCP íntegro no es la única fuente aceptable. Puede sustituirse por observación independiente del panel oficial del entorno asociado inequívocamente a la tarea: operador/fecha/thread/entorno/config/publicación/revisiones y vigencia literalmente mostradas. Se correlaciona con metadata administrativa thread/turn/item/comando/cwd/exitCode/fechas, HEAD/origin de ese checkout y journal primario de recepción autenticada del desafío ligado al preregistroV2/fullapproval.
Esto acredita una constatación administrativa de ejecución acotada, no atestación VM, inmutabilidad entre observaciones ni custodia exclusiva global. El output del consumidor solo localiza receiptRef; nunca origina config/publicación ni reemplaza journal. Sin vínculo panel↔tarea realmente observado, conservar el gate pendiente. La exclusividad del futuro contrato sigue limitada a reserva CAS del registro propio inventariado. Aún no hay observación nueva del panel, correlación implementada, emisor ni montaje.

## Observación oficial contextual posterior, 9oct 16:07UTC

Se obtuvo finalmente el resultado original de Environment status desde la actividad oficial de la tarea ordinaria, con callId correlacionado por read_thread. Resultado y procedencia: ../../AFW-CLOUD-CONTEXT-OFFICIAL-OBSERVATION-2026-10-09.es.md. Config6abe/publicación6ac8f1959, entorno propio, revisiones19/19/current, red restricted/enforced. Esta observación posterior cierra únicamente la ausencia de vínculo contextual tarea→entorno→publicación para ese turno. No acredita recepción de desafío, nueva fuente, reserva, identidad Cloudflare vigente ni custodia exclusiva. Los gates de montaje y recepción real permanecen; no repetir navegación del editor o crear claves para resolver este vínculo ya observado.
