# Confirmador nominal privado en QA y generaciones de cierre

AFW exclusivamente. Diseño de preparación30oct2026, no runtime operativo. Base82f854c (PR656), con PR653/654/655/656 aceptadas. Código compartido explícito, fences asíncronos, conjunto exacto de cancelaciones y retirada exclusiva de permisos ya cualificados en fuente; todavía sin integrar aquí.

## Problema que debe resolver

La confirmación nominal en el operador necesita código/env de ejecución, mientras el guard exige que ese mismo operador permanezca exactamente cerrado. Restaurar855 antes de ejecutar impide el paso nominal. La prueba nativa A/B mostró códigoB ejecutándose pese a conservarse un Workflow.versionId anterior; ese identificador no acredita módulo ni bindings. No modificar855 ni añadir una credencial editora del operador para resolverlo.

## Topología elegida

Añadir PrivateQaNamedConfirmation como Workflow del host privado agent-friendly-web-independent-closure-qa. Reutilizar runReleaseWorkflow con bundle explícito y operación exclusivamente confirm_named. El receptor HTTP de QA sigue cerrado y los exports/recursos heredados se conservan. No introducir un Worker o un segundo monitor permanente.

El entorno mínimo interno del confirmador solo incluye los flags necesarios, el namespace propio existente, un binding nuevo y explícito al D1 propio del canary y el lector privado ya custodiado. Nunca se transmite el publicador al runtime nominal. El binding D1 es una capacidad real, requiere alcance/identidad/pin/autorización aplicable y rollback comprobados antes de desplegar; no describirlo como un alias inocuo. El publicador de canary que ya posee el guard permanece limitado a restauración bajo su política.

La cápsula servidor de QA contiene el bundle nominal, su hash, el conjunto de cancelaciones esperado y la política de generación. El payload named conserva únicamente {planHash}; el UUID esperado se obtiene del control primario. Solo armGeneration y el probe cerrado reciben expectedRuntimeVersionId como restricción adicional. Ningún payload contiene callbacks, claves, owner elegido, SQL, destinos o configuración arbitrarios. La reserva V2 se activa solo mediante constructor/entorno privado fijado por esa cápsula y authorize obligatorio. La ruta legacy conserva sus controles.

## Identidad de código y entorno

Añadir binding version_metadata AFW_QA_VERSION. Usar su id como UUID efectivo del Worker en ambos contextos, Workflow y DO. No usar Workflow.versionId, última configuración del editor ni una etiqueta como sustituto de procedencia.

La versión se asigna tras upload: root compara módulo/hash/configuración/bindings contra el artefacto cualificado ANTES de armar. armGeneration recibe expectedRuntimeVersionId solo como restricción adicional y lo compara con el binding nativo y la cápsula/política compilada. INFO guarda esa correlación; no confianza en el primer UUID observado ni un hash autorreferente compilado. Named y guard comprueban su propia versión y la fila primaria en cada admisión pertinente.

Una verificación cerrada debe probar realmente el binding en Workflow y DO con el mismo módulo seleccionado y un marcador de fuente; incluir un UUID ajeno que bloquee. Miniflare/metadata del API por sí solos no acreditan esta propiedad remota. Bootstrap Workflow+DO prueban esos recorridos, no el recorrido PrivateQaNamedConfirmation. Su self-pin bloquea antes de efectos; cualquier afirmación de prueba de esa clase exige su propio camino cerrado explícito. Esa verificación tiene su propio plan finito y presupuesto de instancias; nunca reutilizar los IDs ni el presupuesto del A/B anterior.

## Autoridad asíncrona del confirmador

El authorize ya instalado en el runtime compartido consulta control primario exacto y devuelve true literal solo para la generación/cápsula/versión/ventana vigente. Lectura acotada por min(5000ms, lease restante original), señal abort y reloj monótono original; revalidación después de cada await y justo antes de efectos propios. No proxies D1/RPC asíncronos genéricos. Conservar los fences dentro de journal, reserva y lector metadata.

RPC nativo: el resultado prestado se encapsula cuando cruza una función async, se convierte inmediatamente en datos planos con descriptores estrictos y se libera con su disposer. No devolver un objeto RPC crudo por una Promise auxiliar. Campos y tamaños de recibo son acotados; nunca incluir secretos o callbacks.

Una consulta DO y una escritura D1 no forman una transacción distribuida. Un efecto admitido puede completar tras cancelarse su espera; conservar ACK incierto y presupuesto consumido. La escritura de reserva mantiene su clasificación completa dentro del INSERT SELECT primario.

## Generaciones aditivas del guard

Mantener el mismo actor fijo afw-own-successor-closure-v1 y su almacenamiento. La KEY legacy, controles y journals históricos quedan intactos. Nueva HEAD V2, INFO inmutable por plan y controles por plan con propósito V2. INFO incluye secuencia, hash del predecesor, política/cápsula nominal, UUID de ejecución correlacionado y ventana original.

Transición explícita por CAS del HEAD observado. Primera transición exige el control legacy exacto retirado y su plazo vencido; las siguientes, generación previa retirada/vencida. Grants/eventos/trial distintos y reserva global todavía cero. El conjunto histórico de cancelaciones NULL se conserva y se clasifica exactamente; nunca usar IS NULL como exclusión genérica ni borrar filas. Condiciones D1 se observan antes/después del CAS y se revalidan en el efecto SQL final: el CAS solo es atómico para el HEAD, no entre almacenes.

Un HEAD/INFO/control ausente, desconocido o contradictorio bloquea; no fallback implícito a legacy. Tras HEAD V2, la API legacy puede leer historia saneada pero no admitir escrituras/ejecuciones antiguas. Controladores y estado de retirada se indexan por plan, de modo que una retirada tardía no aborte otra generación. Cada journal nuevo usa un espacio explícito por plan y una allowlist de claves; no prefijar retrospectivamente los registros anteriores.

La elegibilidad para ARM exige reserva cero. Después del INSERT propio, la misma generación puede continuar y cerrar con SU reserva exacta; no exigir cero entonces ni permitir otra reserva. Una nueva generación no reinicia el slot/budget ya consumido. Dispatch previo con ACK incierto se conserva incierto: una lectura actual de eventos cero no acredita ausencia histórica. Vencimiento y revocación antigua, fuente/custodia cualificadas y admisiones inmutables forman parte de la reconciliación.

## Restauración y fases

El operador855 y su deployment exacto permanecen seleccionados durante toda la ventana nominal. Extender inventario fijo del restorer para el nuevo Workflow de QA: script, clase, nombre y todas las páginas. El confirmador debe estar terminal antes de la restauración; no exigir que el Workflow guard que ejecuta esa restauración ya esté terminal.

No cambiar QA mientras cualquiera de sus Workflows esté activo. Preparar rollback cerrado COMPATIBLE con los nuevos exports/definiciones antes de cambiar la selección: la versión78af histórica no contiene la clase nueva y no debe prometerse como rollback suficiente. Medir el paquete QA combinado; si requiere límite nuevo, aislarlo explícitamente (máximo propuesto3MiB), sin ampliar los límites2MiB de artefactos/transportes existentes.

Usar createOwnPermissionsOnlyReduction para quitar OAuth/monitor sin cierre sintético. Esto también es seguro con admisión y no acredita parada. El fallback SIN admisión solo se permite tras reconciliación primaria estable de permisos retirados, ausencia de admisión para el grant candidato, único original histórico, actor/Container activos vacíos, confirmador terminal y punteros/módulos/config exactos. La fuente congelada315 conserva la inserción de admisión ANTES de Container.start; una admisión, aunque el API liste vacío o el ACK sea desconocido, prohíbe ese fallback y exige el handoff físico normal. Reserva prepared sin admisión se conserva; nunca se borra para rearmar.

Cleanup tiene autoridad y fases distintas de la lectura nominal: retirar OAuth intencionalmente no bloquea el cierre autorizado. Ni permissionsWithdrawn ni runtimeStopRequested equivalen a physicalStopVerified o nativeWithdrawalVerified. Si hay admisión, el guard debe ejecutar el cierre histórico fijo (o withdraw+close idempotente existente) antes del handoff físico, también si unsubscribe nativo falla o queda incierto y después de retirar OAuth. permissions-only no sella custody ni solicita parada y no sustituye esa rama. Probar explícitamente native-unsubscribe unknown + admisión presente; no depender del cliente para que el guard consiga cerrar. La retirada nativa del cliente, el ACK HTTP, la revisión útil, la parada física y la restauración son recibos independientes.

Matriz de fases: ARM requiere HEAD previo retirado/vencido y reserva0; named previo exige control actual/UUID y grant vigente, reserva0; named posterior permite solo su reserva1 y mantiene grant vigente; reducción permite grant ya retirado, reserva0 o propia1; cierre admitido requiere operación histórica fija y prueba física; fallback sin admisión exige ausencia primaria de admisión y jamás usa Container methods. No reutilizar predicados de admisión para impedir cleanup.

## Receptor, reloj y reserva única

Receptor existente 6acce402 (Work cloud), no guardia permanente. Su inspección19:41UTC confirmó fuente AFW y evento afw.dossier.changed con params.projectRef estricto; no selector de cuenta en metadata. La UI muestra una cuenta sin apodo pero las declaraciones de tools aún dos enlaces. Conservar esa contradicción hasta reconciliarla; no eliminar la única cuenta visible ni inventar link_id en params.

El catálogo autorizado no arranca motor ni reserva; se puede verificar en la ventana autorizada antes de consumir el slot. subscribe sí intenta custody.start y su fallo puede pedir close: NO usarlo como sonda inocua previa. El preflight debe fijar cuenta/fuente/catálogo mediante evidencia admisible y conservar como gate la ruta nativa real. Solo el cliente genera callback y secreto del protocolo. Falta cualificar también la caducidad/limpieza independiente del task nativo cuando ningún evento llega: prompt de autoapagado y TTL servidor no prueban que la plataforma haya deshabilitado el task. Una capacidad nativa de vencimiento o una limpieza cloud finita separada debe verificarse con su propio presupuesto; no inventar scheduler.

Terminar grafo, source, control, artefactos, rollback y comandos/recibos cerrados ANTES de abrir el reloj humano. Dentro de la ventana solo materialización acotada de pins actuales y operaciones ya cualificadas. Ningún build/instalación pendiente ni solicitud tardía de permisos. Si faltan al menos180s de margen después de los gates, cerrar sin consumir el siguiente efecto. dispatchAt, cutoff de readiness/owner y expiración permanecen absolutos; esperar PC-off no permite posponerlos, renovar margen o reutilizar la autorización. Si no se llega al cutoff, cierre sin dispatch aunque el slot ya esté consumido.180s es requisito de admisión, no garantía de revisión/retirada completas.

El slot del primer sucesor es único. No prometer dos reservas para probar primero con PC encendida y repetir después apagada. El tramo PC-off se prepara dentro del ensayo de una ocurrencia: solo proponer apagar cuando exista guard vigente, suscripción/callback nativos comprobados, admisión esperada y margen; mantener el único evento pendiente hasta el tramo acordado. Un cierre/interrupción posterior conserva el consumo y su resultado; no reset/rename/retry de mutation desconocida. Si falla, evaluar de forma explícita el siguiente presupuesto legítimo.

## Cierre requerido

TDD y revisión de cada componente; regresión legacy y nativas de relojes, fuente ajena, cambio de HEAD/versión, CAS concurrente, abandono, ACK incierto, historia preservada y ambas ramas de restauración. La verificación remota cerrada solo acredita las propiedades observadas. Ensayo real posterior con permiso nuevo; jamás revivir7305/19fc/75ae ni ventanas anteriores. operationalReadiness y PC-off siguen false hasta sus recibos propios; Max no contactado.

Referencias: docs/AFW-WORKFLOW-EXECUTION-IDENTITY-2026-10-30.es.md; PR655/656 y issue497. Fuentes primarias de protocolo: https://developers.cloudflare.com/workers/runtime-apis/bindings/version-metadata/ y https://developers.openai.com/plugins/build/mcp-events . La disponibilidad documentada de eventos no demuestra selección de cuenta o suscripción efectiva en este workspace.
