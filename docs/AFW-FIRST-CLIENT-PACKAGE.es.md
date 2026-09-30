# Primer cliente: beta acompañada de AFW

Paquete de preparación, 2026-09-30. No incorpora un cliente ni amplía acceso. Aplicar [operaciones de beta](AFW-BETA-OPERATIONS-2026-09-30.es.md) y el recibo productivo vigente antes de usarlo. La aceptación privada de novedades y del caso API del piloto sigue pendiente.

## Alcance a acordar

Primera pregunta al cliente: «¿Qué te gustaría que una persona o un asistente pudiera encontrar o hacer en tu sitio? Podemos empezar por una sola cosa».

Registrar un objetivo inmediato y un origen web. La respuesta orienta la siguiente pregunta; no presentar todo el expediente ni exigir un nivel AF predeterminado. Si el cliente no conoce un dato, conservarlo como pendiente. AF5, transacciones y MCP no son requisitos. Una web de información puede completar su objetivo con descubrimiento y contenido suficiente.

Antes de usar el copilot, identificar el expediente propio creado por su sesión, acordar el alcance de datos y habilitar ese ID exacto en el piloto autorizado. Una identidad incorporada a Access no habilita inferencias por sí sola. Texto/audio requieren consentimiento; el relato se propone para revisión, no se convierte automáticamente en información publicada.

## Recorrido y evidencia de cierre

| Etapa | Acompañamiento | Evidencia necesaria |
| --- | --- | --- |
| Acceso | «Tu expediente queda ligado a tu cuenta». | Identidad exacta permitida, listado propio y recuperación del expediente. No atribuir propietario por un email escrito. |
| Objetivo | Una pregunta y una propuesta revisable. | Objetivo confirmado, incertidumbres pendientes y datos declarados diferenciados de observaciones. |
| Guardado | Confirmar guardado y permitir pausar. | Revisión persistida; recarga recupera lo confirmado. Una propuesta aún no guardada no acredita persistencia del expediente. |
| Lectura inicial | Explicar qué se comprobará y por qué. | Observación fechada del origen correcto, metodología y límites; conservarla como línea base. |
| Propuesta | «Revisemos juntos lo que dirán los archivos». | Cápsula versionada, archivos legibles, responsables y comparación anterior a decidir. |
| Decisión | Explicar destino y posibilidades de reversión. | Aprobación de la versión exacta y permiso de instalación. Aprobar no publica. |
| Entrega | Acompañamiento manual cuando sea necesario. | Copia anterior, paquete exacto y procedimiento de instalación/reversión acordado con mantenimiento. No usar documentos sintéticos de QA. |
| Comprobación | «Veamos qué cambió realmente». | Nueva comparación compatible con la misma cápsula y observación posterior. Separar coincidencia de texto de igualdad de bytes; solo comparar puntajes de la misma metodología y origen. |
| Continuidad | Un siguiente paso útil, proporcional al objetivo. | Lectura fechada en novedades, limitaciones explícitas y revisión manual acordada. Preferencia mensual no activa una tarea automática. |

## Cuando algo falla

Conservar el borrador. Si falla recuperar observaciones, reintentar la lectura guardada; no auditar otra vez por defecto ni afirmar que se perdieron los datos. Si vence la sesión, volver a autenticar sin cerrar la pestaña con cambios pendientes. Un conflicto requiere revisar diferencias antes de guardar. Si no hay autorización de instalación, conservar la propuesta aprobada para entrega; no afirmar publicación.

El soporte se coordina manualmente durante la beta. No prometer atención continua, SLA, avisos externos automáticos ni presupuesto diario cerrado. El límite actual de 5 consultas por 60 segundos por sujeto controla ráfagas y comparte texto/audio; revisar costo y detener el piloto según las operaciones de beta.

## Apertura y salida

Incorporar primero un caso acotado con owner y responsables identificados. Registrar identidad, ID del proyecto, objetivo, responsable de soporte y procedimiento de retirada en el operativo privado de AFW; no copiar relatos ni datos del cliente al repositorio público. La incorporación concreta requiere identificar al cliente y su alcance, no una autorización genérica inferida.

Al retirar acceso, ajustar solo AFW y verificar el resultado. Con OTP una identidad no permitida no recibe correo aunque la pantalla anuncie envío; no insistir en reintentos. Retirar política no demuestra que un token activo esté revocado: ese control sigue pendiente de aceptación. Conservar expediente y evidencia; no borrar datos como sustituto de revocar acceso.

Los recibos MA-06/07 acreditan pruebas sintéticas y aislamiento específicos. Este paquete no acredita todavía el recorrido de un cliente externo ni disponibilidad general.
