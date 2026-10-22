# Intento PC-off posterior: diseño de una ocurrencia finita

22 de octubre de2026. AFW; repositorio tokenizartinfo-ops/agent-friendly-web.

**Estado: propuesta de arquitectura para revisión, sin implementación ni autorización operativa.** No modifica el ensayo original, el primer sucesor, el esquema, los permisos ni la configuración alojada. No acredita operación con el ordenador apagado.

## Resultado buscado y límites

Gabriel quiere comprobar el recorrido completo desde la nube con su ordenador efectivamente apagado. El ensayo nativo propio actual debe terminar primero: catálogo, suscripción real, aviso firmado, revisión útil en el receptor comprobado, retirada y parada física. Después, el ensayo PC-off necesita una ocurrencia propia; no se obtiene borrando o repitiendo el primer intento.

Se recomienda una única ocurrencia adicional, con linaje cerrado y presupuesto explícito. El alcance sigue siendo el expediente sintético propio. No crea un producto de ejecución recurrente, una guardia permanente, un permiso de Max ni un mecanismo general para clientes.

Esta propuesta prepara una decisión futura. El resultado del primer recorrido puede exigir revisarla; no se implementará por el simple cierre de un incidente del proveedor.

## Base comprobada en fuente

Referencia de lectura: main32e85a164d12a28403cf520e5bdcf4f0875ef91b.

| Pieza actual | Restricción que hay que conservar |
| --- | --- |
| [Manifiesto](../../../lib/mcp-successor-manifest.mjs) | Resuelve únicamente afw-own-event-first-successor-v1 por el binding del servidor; nunca recibe el actor desde un evento |
| [Reserva](../../../lib/mcp-successor-reservation.mjs) y [SQL](../../../db/dossier-successor-reservation.sql) | Slot singleton afw.own-successor.v1 inmutable; exige exactamente una admisión y un cierre originales; preparado no permite boot |
| [Claim de arranque](../../../lib/mcp-successor-launch-gate.mjs) y [SQL](../../../db/dossier-successor-launch.sql) | Consumo único en primaria, nueva autoridad vigente, identidad/despliegue y retiro del predecesor comprobados |
| [Admisiones/cierres](../../../db/dossier-node-process.sql) | Historial inmutable por grant/generación; cerrar no demuestra por sí solo parada física |
| [Recibo de suscripción](../../../db/dossier-subscription-receipt.sql) | Constancia de finalización del productor; explícitamente NO acredita ACK ni revisión del cliente cloud |
| [Evidencia de retiro](../../../lib/mcp-retirement-evidence.mjs) | Dos lecturas estables de custodia y proveedor, actor/programa/fuente exactos, stopped/exit0, frescura máxima30s |

No corresponde cambiar COUNT(*)=1 por >=1, quitar el CHECK del slot, generalizar nombres desde parámetros del cliente ni eliminar triggers. Eso debilitaría el intento actual.

La presencia de una API Container observada en un contexto instrumentado, un 2xx del webhook o un turno de revisión terminado son evidencias diferentes. Ninguna sustituye las demás.

## Alternativas evaluadas

1. Reiniciar el singleton o cambiar su nombre para repetirlo: descartado; pierde la exclusión y reinterpreta un presupuesto consumido.
2. Un gestor de generaciones sin límite: descartado para este piloto; amplía recurrencia, recuperación y autorización antes de demostrar el recorrido básico.
3. **Una segunda ocurrencia declarada por servidor, con linaje y consumo propios:** recomendada. Mantiene el contrato actual intacto y agrega solo el tramo necesario para PC-off.

## Contrato propuesto

Se mantienen tres posiciones explícitas de la cadena propia: original histórico, primer sucesor del recorrido completo actual y una sola ocurrencia posterior PC-off. No hay generación siguiente habilitada por defecto.

El servidor fijaría un plan de ocurrencia adicional con referencia opaca única, propósito PC-off, predecesor exacto y presupuesto1. El plan no lo crea ni lo renueva un evento. Cuenta, Worker, aplicación, namespace, owner/proyecto, programa y revisión se resuelven desde configuración administrativa y evidencia primaria verificadas.

El nombre propuesto para el nuevo actor es afw-own-event-pcoff-successor-v1. Es solo una decisión de diseño; no se ha resuelto su ID ni creado un objeto. El namespace se verifica contra el mismo binding real y los nombres preservados. idFromName/idFromString solo resuelven identidad; get, almacenamiento y métodos Container permanecen fuera de esa preparación.

Cada artefacto y activación nuevos conservan su procedencia propia. Si el montaje futuro cambia el código, necesita nuevos hashes/versión/recibos de publicación y activación. No se le asignan los hashes o recibos del Worker congelado usado por el ensayo actual.

## Requisitos antes de reservar

Todos deben corresponder al mismo predecesor, intento, fuente y receptor:

- Suscripción nativa aceptada, callback aportado por el cliente y challenge verificado.
- Aviso firmado aceptado y correlacionado por eventId/revisión.
- Turno cloud útil observado en el receptor realmente asociado: lectura autorizada y respuesta relacionada con ese aviso.
- Retirada nativa y autoridad anterior retirada o vencida, con cierre histórico.
- Parada física del proceso exacto y ausencia de instancias activas incompatibles; no basta una fila de cierre.
- Artefacto/despliegue y recuperación compatibles verificados para el nuevo plan.
- Plan administrativo finito y disponibilidad pública del proveedor comprobados de nuevo.

**Falta un cierre de evidencia:** el esquema actual de suscripción no persiste una aceptación durable de revisión útil del cliente. Antes de habilitar la segunda ocurrencia se deberá definir y probar un registro administrativo append-only ligado a esos recibos y al turno observado. Una declaración enviada en JSON por el cliente no puede satisfacerlo. Si la plataforma no ofrece prueba criptográfica del turno, el registro será una atestación explícita del operador sobre lectura autenticada, no una supuesta firma de OpenAI.

No se inventan aquí campos o endpoints de ese registro: su interfaz debe cerrarse después de observar el primer recorrido real y antes de implementar el gate adicional. Esa dependencia impide ejecutar este diseño tal como está.

## Persistencia y exclusión

El estado futuro se añade en tablas propias de esta ocurrencia, sin modificar ni migrar registros del singleton actual. Nombres y SQL finales quedan fuera de esta propuesta de alcance.

La reserva y el claim se separan y son inmutables. La primaria impone unicidad de la referencia administrativa, del predecesor/generación consumido, del actor candidato, de la nueva generación y del grant. No se puede derivar otra ocurrencia presentando una clave distinta. Las comprobaciones de linaje y consumo ocurren en la misma sentencia/transacción que toma el presupuesto, con pruebas de concurrencia.

La evidencia externa se revalida antes del claim; su observación no puede ser futura ni exceder30s. El límite de ejecución conserva la ventana original, sus relojes wall/monotónico y el control SQL primario. La lectura tardía no concede un presupuesto nuevo.

Ante ACK perdido, timeout, caída, reinicio o cierre concurrente, el resultado es incierto y no permite reintento, limpieza del presupuesto ni otro actor. Solo cabe reconciliación de lectura primaria y diagnóstico. Un primer recorrido fallido o incierto no autoriza por esta vía la segunda ocurrencia.

Una reserva devuelve mayBoot:false; un recibo de activación mayLaunch:false; ninguno sustituye el consentimiento actual ni los controles de arranque.

## Ventana y prueba PC-off

La ocurrencia adicional mantiene como máximo600000ms desde la autorización original aplicable, limitada además por todos sus permisos; no es un permiso de una noche ni una renovación automática.

Las partes que requieren propagación del proveedor deben prepararse con el servicio cerrado y con su comprobación propia antes de abrir esa ventana. La eventual instalación de cron es una mutación separada: no se realiza durante una pausa del proveedor ni desde esta propuesta. Una agenda declarada no demuestra invocación.

Solo cuando todos los gates anteriores estén aceptados se acuerda con Gabriel un intervalo concreto de ordenador apagado. El resultado debe correlacionar versión/configuración, ocurrencia realmente ejecutada, aviso, turno cloud, retorno y cierre con ese intervalo. El intervalo físico lo declara la persona; un registro del servidor no demuestra el estado de su PC.

Conservar UTC como tiempo canónico y mostrar America/Argentina/Buenos_Aires al coordinar. No pedir apagar mientras falten los gates.

## Presupuesto y cierre

El plan futuro admite un arranque, una suscripción verificada, un aviso y una revisión cloud acotada; ninguna acción de código, correo, publicación o cobro está autorizada por recibir el evento. Se limita a herramientas de lectura ya autorizadas. La evidencia opcional mantiene su consentimiento separado.

No habilitar simultáneamente el predecesor y el candidato. Tras retiro o vencimiento, comprobar terminalización y parada física, cero instancias activas, agenda retirada cuando corresponda y versión cerrada compatible. Revertir código no borra admisiones, reservas, claims, cierres o recibos. Ante un proceso aún activo, preservar la capacidad de cerrarlo y observarlo antes de retirar sus bindings.

Ninguna cuota se recicla por fallo. Un presupuesto monetario no se deduce de budget1: deberá declararse por separado si el ensayo incorpora un servicio de inferencia facturado nuevo; este diseño no lo incorpora.

## Verificación futura exigida

La implementación posterior deberá demostrar, sin abrir primero una sesión humana:

- El singleton y los escenarios del primer sucesor conservan sus resultados, constraints y contadores.
- Solo la combinación completa de evidencias de un predecesor aceptado puede preparar esta única ocurrencia; permiso antiguo, otro cliente/proyecto/receptor, prueba vencida y JSON sin procedencia se rechazan.
- Dos administradores, dos actores o dos claves competidores no producen dos reservas/claims; mismo resultado ante reinicio y ACK desconocido.
- Relojes rebobinados, vencimiento durante awaits y carrera de revocación/cierre impiden arrancar y no devuelven un presupuesto nuevo.
- Un cierre lógico sin parada física o una parada de otro proceso no desbloquean al candidato.
- La nueva fuente, configuración y recuperación preservan exports/namespace, registros y capacidad de cierre; todo empieza deshabilitado.
- La prueba alojada correlaciona callback/entrega/revisión/retirada y el intervalo acordado; fixtures no se presentan como aceptación remota.

Esto es un criterio para un plan de implementación posterior, no tests ya ejecutados ni permiso para aplicar DDL.

## Siguiente decisión

Primero cerrar el recorrido nativo actual. Con sus recibos, completar el contrato de atestación y revisar este diseño; luego redactar el plan de implementación, sus pruebas y recuperación. La promoción alojada, la sesión propia y el intervalo PC-off conservan sus comprobaciones separadas.

No hay nuevo recurso remoto, cliente, permiso, cron, Container o dependencia local creado por este documento. No cambia el roadmap de la invitación a Max ni convierte investigación comercial en capacidad disponible.
