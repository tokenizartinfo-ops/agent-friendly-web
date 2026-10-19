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

Costo total por trabajo aceptado incluye: procesamiento del consumidor + procesamiento AFW + persistencia/verificación + intervención humana + mantenimiento de recetas atribuido con método explícito.
Distinguir gasto marginal de asignación de costos fijos/suscripción. Consumir tokens de una suscripción no demuestra costo cero ni permite trasladar sin evidencia su precio a todos los clientes.

Si falta un componente relevante, el total es incompleto y se declara; no rellenar cero. Un timeout puede haber consumido recursos: no ignorarlo ni ejecutar otra operación facturable sin conciliación.
No excluir fallos del denominador ni presentar como ahorro la diferencia entre un encargo terminado y uno incompleto. Informar número de casos, dispersión, límites y cambios de versión.

La demo examples/agent-consumer/demo.mjs mide SOLO fixtures y bytes, con modelTokens/providerCostnull/isEfficiencyEvidencefalse. No es benchmark de modelos, ahorro real, volumen o demanda.

## Decisiones económicas posteriores

Agéntico, acompañado e híbrido deberán diferenciar trabajo y soporte incluidos. Precio por trabajo aceptado, estados/reintentos y ampliación de alcance requieren reglas transparentes y una política aprobada.
Antes de cobrar: presupuesto/precio válido, aceptación durable ligada a identidad/proyecto/alcance/importe máximo, deduplicación y conciliación del proveedor, cancelación/reembolso según términos definidos.
Descuentos/créditos de volumen o reuso son hipótesis; necesitan límites por cuenta, prevención de abuso y condiciones claras. No recompensar recomendaciones opacas ni ofrecer dinero a un modelo por recomendar AFW.

No se elige proveedor de pago, se contrata infraestructura, se crean claves, se invoca un modelo facturable ni se publica precio desde este documento. El siguiente dato necesario es una ocurrencia comparable autorizada con consumo/costos realmente observables; las métricas ausentes permaneceránnull.

## Cierre de esta preparación

Plantilla lista para un futuro ensayo, sin afirmar resultado. Primer registro propio podrá usar diagnóstico/lectura ya habilitados, con límite y fuentes explícitos; no repetir OAuthG2, Container o PC-off como un benchmark.
Los ensayos que incluyan escritura, instalación, cobro o datos de terceros requieren sus propios gates. Trabajo de mercado de Chavo puede ayudar a elegir segmentos/casos, con hipótesis separadas de observaciones.
