# AFW: ensayo comparable de eficiencia y costo

19oct2026. Preparación metodológica del segmento para agentes; no hay medición comercial ni tarifa aprobada.

## Pregunta

¿Reduce AFW el costo total y el esfuerzo de llevar un sitio al mismo resultado comprobable, frente a reconstruir ese recorrido con un asistente generalista?
Medir calidad y alcance primero: una respuesta más corta que omite instalación, verificación o fuentes no es ahorro equivalente.

## Unidad de comparación

Un encargo con objetivo, revisión de expediente, fuentes permitidas, sitio/origen, fecha y resultado de aceptación fijados. Mantener constantes hosting/CMS, acceso efectivo, modelo/versión y nivel de acompañamiento, o declarar la diferencia.
Comparar ruta directa y ruta AFW; registrar fallos, relecturas, instalación, verificación y trabajo humano de ambas. Alternar el orden y conservar varios casos antes de generalizar; no atribuir causalidad a una única prueba propia.

Etapas separadas: diagnóstico público; aclaración de fuentes/objetivo; preparación de archivos; instalación autorizada; comprobación. Hoy pueden medirse aspectos de lectura/demo; el recorrido completo aún tiene gates pendientes. No usar Max como fixture ni ejecutar trabajos en su nombre.

## Registro mínimo por ocurrencia

- trialRef opaco, fechaUTC, variante, operación/contrato, revisión, outcome y criterio de aceptación.
- Modelo/proveedor/versión y herramientas realmente usados; duración del recorrido, no solo tiempo del último request.
- Solicitudes, errores y recuperaciones; bytesUTF8 de transporte y contexto permitido.
- Tokens de entrada/salida/caché SOLO si el proveedor los informa; desconocido=null. No convertir bytes en tokens mediante un divisor fijo.
- Costo variable observado del consumidor y de AFW; recursos exactos por proyecto. No imputar a AFW toda una cuenta Cloudflare/GitHub compartida.
- Tiempo humano observado y costo horario aprobado, si se usa; trabajo de receta/hosting separado. Registrar supuestos/moneda/fecha de cada costo.
- Criterios de calidad: fuentes fieles, desconocidos explícitos, decisiones separadas y resultado verificado. Registrar también casos no completados.
- Sin textos privados, tokens, headers, URLs con credenciales ni capturas de otros clientes. Evidencia restringida permanece en su custodia; el registro utiliza referencias opacas.

## Cálculo e interpretación

Una ocurrencia es un encargo de la comparación con identidad de ensayo estable. Sus reintentos y recuperaciones pertenecen al mismo encargo; un replay idempotente no crea otro encargo ni otro resultado aceptado.

Gasto total atribuido incluye: procesamiento del consumidor + procesamiento AFW + persistencia/verificación + intervención humana + mantenimiento de recetas atribuido con método explícito. Incluye el gasto de TODAS las ocurrencias comparables, también las fallidas, y sus reintentos/recuperaciones.

- Costo por trabajo aceptado = gasto total atribuido / cantidad de encargos únicos aceptados.
- Tasa de aceptación = cantidad de encargos únicos aceptados / cantidad total de encargos intentados.
- Si no hay encargos aceptados, costo por trabajo aceptado=null (no disponible); conservar el gasto total observado, nunca presentarlo como costo cero.

Ejemplo exclusivamente aritmético, sin moneda, tarifa ni resultado observado: cinco encargos intentados, dos aceptados y tres fallidos, con gasto total de50unidades ficticias, dan25unidades por trabajo aceptado y una tasa de aceptación de2/5=40%. Los reintentos ya están incluidos en ese gasto; no aumentan el número de encargos.
Distinguir gasto marginal de asignación de costos fijos/suscripción. Consumir tokens de una suscripción no demuestra costo cero ni permite trasladar sin evidencia su precio a todos los clientes.

Si falta un componente relevante, el total es incompleto y se declara; no rellenar cero. Un timeout puede haber consumido recursos: no ignorarlo ni ejecutar otra operación facturable sin conciliación.
Incluir los costos de los fallos en el numerador del costo por trabajo aceptado; incluir todos los encargos intentados en el denominador de la tasa de aceptación. No presentar como ahorro la diferencia entre un encargo terminado y uno incompleto. Informar número de casos, dispersión, límites y cambios de versión.

La demo examples/agent-consumer/demo.mjs mide SOLO fixtures y bytes, con modelTokens/providerCostnull/isEfficiencyEvidencefalse. No es benchmark de modelos, ahorro real, volumen o demanda.

## Decisiones económicas posteriores

Agéntico, acompañado e híbrido deberán diferenciar trabajo y soporte incluidos. Precio por trabajo aceptado, estados/reintentos y ampliación de alcance requieren reglas transparentes y una política aprobada.
Antes de cobrar: presupuesto/precio válido, aceptación durable ligada a identidad/proyecto/alcance/importe máximo, deduplicación y conciliación del proveedor, cancelación/reembolso según términos definidos.
Descuentos/créditos de volumen o reuso son hipótesis; necesitan límites por cuenta, prevención de abuso y condiciones claras. No recompensar recomendaciones opacas ni ofrecer dinero a un modelo por recomendar AFW.

No se elige proveedor de pago, se contrata infraestructura, se crean claves, se invoca un modelo facturable ni se publica precio desde este documento. El siguiente dato necesario es una ocurrencia comparable autorizada con consumo/costos realmente observables; las métricas ausentes permaneceránnull.

## Cierre de esta preparación

Plantilla lista para un futuro ensayo, sin afirmar resultado. Primer registro propio podrá usar diagnóstico/lectura ya habilitados, con límite y fuentes explícitos; no repetir OAuthG2, Container o PC-off como un benchmark.
Los ensayos que incluyan escritura, instalación, cobro o datos de terceros requieren sus propios gates. Trabajo de mercado de Chavo puede ayudar a elegir segmentos/casos, con hipótesis separadas de observaciones.

## Herramienta de registro20oct2026
`examples/agent-consumer/trial-ledger.mjs` agrega una capa de validación/aritmética al método anterior. No consulta proveedores ni captura consumo automáticamente: modelo/versión, duración del recorrido, tiempo humano, condiciones y originales se conservan en el registro protegido de cada ensayo. El resumen usa referencias opacas a esas condiciones, aceptación y observaciones; no certifica su veracidad.

Contrato de ejemplo de fuente `afw.efficiency-observations.v1`: trialRef, currency (tres letras como sintaxis, sin validar moneda/oferta), mode synthetic/declared_observation, cases<=200 y observations<=1000. No es un nuevo endpoint o esquema de facturación.

Cada case es un encargo realmente iniciado, con caseRef estable, variante direct/afw, conditionsRef, outcome accepted/failed/pending y referencia de aceptación si fue aceptado. No cargar prospectos o planes como intentos. El mismo encargo/reintentos/replay conserva caseRef; una referencia de aceptación no sustituye la revisión humana. Condiciones distintas entre variantes del mismo caso bloquean el resumen, pero referencias iguales no prueban por sí mismas igualdad real de hosting, acceso, modelo u objetivo.

Cada observación tiene ID estable, caso/variante, fechaUTC, categoría, attemptRef cuando existe una petición, costo en microunidades enteras, base y referencia; uso informado y su referencia se separan del costo. Categorías requeridas: consumidor, AFW, persistencia, verificación, intervención humana y mantenimiento de recetas. Falta de una categoría o costo desconocido produce total=null; se conserva subtotal conocido. La no aplicación requiere0 explícito, y no puede mezclarse con otra fila de gasto de esa categoría/caso.

Costo observado o asignación aprobada requieren referencia. Una suscripción incluida no es costo cero: registrar método de asignación o desconocido. No imputar toda la cuenta compartida a AFW. Una unidad de moneda con tres letras no es tarifa aprobada. Valores negativos, fracciones, overflow, IDs contradictorios o campos de cabeceras/textos privados quedan fuera del resumen.

Reentrega de una misma medición idéntica se deduplica por observationRef; el mismo ID cambiado bloquea. Una petición nueva o recuperación con consumo real conserva su propio attemptRef y gasto, aunque la operación idempotente devuelva la misma cápsula. recordedAttempts representa solo los intentos registrados, no una auditoría completa de llamadas del proveedor. Un timeout puede haber consumido recursos.

Uso: inputTokens/outputTokens/cachedInputTokens/requestBytes/responseBytes, números enteros o null. Solo una observación de uso por intento; una asignación de costos no vuelve a sumar esos tokens. cachedInput es subconjunto de input, no se agrega otra vez; los bytes no estiman tokens. Un campo no informado permanece null aun si se conocen otros. El resumen retiene subtotales conocidos y faltantes por campo.

Por variante: casos intentados/aceptados únicos, tasa exacta accepted/attempted, costo total o desconocido y costo por aceptado como fracción exacta numeratorMicros/denominator. Incluye fallos/reintentos en el numerador; sin aceptación o costo completo la fracción es null. No se calcula ahorro ni causalidad. declared_observation sigue como source_observations_unverified; isEfficiencyEvidencefalse incluso si la aritmética es válida.

`node examples/agent-consumer/trial-demo.mjs` muestra cinco encargos ficticios, dos aceptados y gasto total50unidadesTST:25 por aceptado y2/5 de aceptación. Tokens no informados=null. No hay consumo de modelo, cotización o medición real. Ejecutar preferentemente en Actions/entorno cloud autorizado; no requiere nueva dependencia, permiso o servicio.
