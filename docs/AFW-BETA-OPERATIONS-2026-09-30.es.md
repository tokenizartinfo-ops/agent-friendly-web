# Operación de beta acompañada de AFW

Fecha: 2026-09-30. Responsable de coordinación: owner de AFW. La preparación de este procedimiento no incorpora clientes externos ni amplía Access.

## Incorporar un expediente

1. Acordar objetivo inmediato, datos públicos que se pueden usar, entregable y límites. El objetivo puede terminar en descubrimiento o contenido; AF5/MCP no son requisitos.
2. Incorporar una identidad exacta en la política Access de AFW con alcance y retirada registrados. Crear su expediente desde esa sesión, nunca atribuirlo por un email escrito en el formulario. Comprobar propiedad, recuperación y listado propio.
3. Habilitar explícitamente su proyecto en el rollout del copilot. El cambio preparado conserva `AFW_COPILOT_PROJECT_ID`: acepta el ID único actual o una lista JSON de hasta 10 IDs exactos. Configuraciones inválidas, duplicados, comodines y listas excesivas fallan cerradas. No usar una lista de emails en esa variable. No editar D1 para trasladar propietarios por conveniencia.
4. El cliente conserva consentimiento por expediente y por envío; revocarlo cierra inferencias. Las rutas verifican propiedad además del rollout. Texto y audio comparten el límite actual de 5 consultas/60 s por sujeto, no por expediente. La lista no crea un nuevo presupuesto de llamadas por proyecto.
5. Revisar las propuestas, verificar dominio y responsables, preparar y aprobar la versión exacta, entregar de forma asistida, comparar después y guardar una observación fechada. Guardar relatos no publica archivos. Conservar rollback y distinguir datos declarados de capacidades observadas.

## Soporte y seguimiento

Durante la beta el owner acompaña manualmente al cliente; no prometer un SLA, atención permanente o avisos externos automáticos todavía. Ante un fallo: conservar el borrador, consultar la última versión guardada, identificar expediente/revisión y clasificar sesión, conflicto, permiso o proveedor. Registrar solo referencias y metadatos necesarios en el operativo AFW; no copiar relatos a Tokenizart.

El feed dentro de AFW presenta observaciones fechadas y cambios compatibles. Una preferencia mensual no demuestra una tarea activa. Hasta acreditar scheduler y entrega de avisos, el seguimiento se coordina manualmente y se comunica como tal. El límite de llamadas reduce ráfagas; no es un tope monetario diario. Revisar uso/costo con las herramientas administrativas y detener inferencias con la bandera cuando corresponda.

## Retirada y rollback

Quitar el ID de la lista cierra las rutas del copilot para ese proyecto sin borrar datos ni cambiar propietario. Para retirar acceso privado, ajustar exclusivamente la política de esa identidad y comprobar sesión/renovación denegadas, preservando al owner. No borrar expedientes como sustituto de revocar acceso. Mantener el historial de comparaciones; rollback de código no reconstruye un índice único que ya admite múltiples lecturas.

## Criterio de apertura

Entrega integral con una cápsula acreditada; aislamiento/escritura/retirada comprobados; consentimiento, recuperación y soporte operativos. Configurar una lista por sí sola no satisface estos criterios. Abrir primero una beta acotada y acompañada, sin afirmar disponibilidad general.
