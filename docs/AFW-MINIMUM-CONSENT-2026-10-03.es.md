# Consentimiento mínimo sin editar enlaces

## Problema y comportamiento

En la aceptación del resumen propio, ChatGPT solicitó ambos scopes publicados al reconectar. El operador tuvo que reducir la URL antes de aprobar. Ese procedimiento no sirve como recorrido normal de clientes.

AFW ofrece ahora el resumen por defecto. Si el cliente solicitó evidencia, la pantalla muestra una casilla desmarcada «También compartir las observaciones guardadas» y explica que permite leer comprobaciones anteriores y sus fechas, sin ejecutar otra auditoría. Si solo solicitó resumen, no aparece esa casilla. Permiso de diez minutos, proyecto, prohibición de cambios/publicación y renovación dentro del plazo permanecen visibles.

El servidor valida el subconjunto elegido contra el consentimiento original. D1 y el token guardan exactamente la elección; el scope solicitado por el cliente no demuestra alcance concedido. Una herramienta de evidencias debe obtener consentimiento adicional cuando falte; nunca inferirlo desde el indicador de cuenta conectada. No cambia duración, política de retirada, PKCE, custodias ni discovery público.

## Validación local

Prueba escrita primero reprodujo que el formulario anterior enviaba evidencia oculta por defecto. Tras la corrección: controles iniciales solo resumen, checkbox sin checked, token y grant summary-only; elección explícita obtiene ambos; solicitud summary-only omite checkbox. Las pruebas existentes verifican denegación de evidencia sin scope, aislamiento, consentimiento ajeno/cancelación, renovación y retirada. 24 pruebas OAuth/proveedor focalizadas y731/731 totales aprobadas. Revisión independiente sin hallazgos significativos, con tres pruebas pertinentes aprobadas.

Publicación y aceptación visual remotas se registrarán tras verificar la versión y la pantalla. Este documento local por sí solo no acredita despliegue ni permisos activos.
