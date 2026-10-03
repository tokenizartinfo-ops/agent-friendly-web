# Consentimiento mínimo sin editar enlaces

## Problema y comportamiento

En la aceptación del resumen propio, ChatGPT solicitó ambos scopes publicados al reconectar. El operador tuvo que reducir la URL antes de aprobar. Ese procedimiento no sirve como recorrido normal de clientes.

AFW ofrece ahora el resumen por defecto. Si el cliente solicitó evidencia, la pantalla muestra una casilla desmarcada «También compartir las observaciones guardadas» y explica que permite leer comprobaciones anteriores y sus fechas, sin ejecutar otra auditoría. Si solo solicitó resumen, no aparece esa casilla. Permiso de diez minutos, proyecto, prohibición de cambios/publicación y renovación dentro del plazo permanecen visibles.

El servidor valida el subconjunto elegido contra el consentimiento original. D1 y el token guardan exactamente la elección; el scope solicitado por el cliente no demuestra alcance concedido. Una herramienta de evidencias debe obtener consentimiento adicional cuando falte; nunca inferirlo desde el indicador de cuenta conectada. No cambia duración, política de retirada, PKCE, custodias ni discovery público.

## Validación local

Prueba escrita primero reprodujo que el formulario anterior enviaba evidencia oculta por defecto. Tras la corrección: controles iniciales solo resumen, checkbox sin checked, token y grant summary-only; elección explícita obtiene ambos; solicitud summary-only omite checkbox. Las pruebas existentes verifican denegación de evidencia sin scope, aislamiento, consentimiento ajeno/cancelación, renovación y retirada. 24 pruebas OAuth/proveedor focalizadas y731/731 totales aprobadas. Revisión independiente sin hallazgos significativos, con tres pruebas pertinentes aprobadas.

## Publicación cerrada y pantalla comprobada

PR198 fuente8c34b519a4622d8c32ca7138468bd8fe47e08ef0, mergee826081bc0d910b45e37f30bd0e87c3818f34e20. CI37158247232:731/731, cero fallos, lint sin errores (warning img histórico), build aprobado. Pruebas locales y construcción también aprobadas.

PROJECT AFW; REPOSITORY tokenizartinfo-ops/agent-friendly-web; ENVIRONMENT delegated pilots; RESOURCE_TYPE Workers. Solo estos recursos/orígenes:

- agent-friendly-web-delegated-real-pilot, https://delegated-pilot.agentfriendlyweb.dev: versión8dfb4024-14fa-4d7d-be33-229b16e5c652 al100%22:25:40.599738Z. Rollback9421a851-926b-4b0e-b47e-091e909e6e1e.
- agent-friendly-web-delegated-canary, https://delegated-canary.agentfriendlyweb.dev: versión74b2447c-062e-4060-944b-49106745469c al100%, cierre final22:27:50.373373Z. Rollback7375e5e6-acda-44d4-a53c-55de7b74ffa1.

ALLOWED_ACTION publicación revisada cerrada y observación sintética de consentimiento en ventana limitada. ROLLBACK conservar D1/KV/historia, mantener flagsfalse o restaurar versiones cerradas anteriores. No publicación en web principal, mutación de expedientes ni recursos Tokenizart/Atelier.

Ventana sintética27c88cfb-b0cf-4b93-8047-49ce180e62f1 abierta22:26:52.23886Z con cierre máximo22:36:04Z, cliente/pin sintéticos existentes. Chrome mostró resumen, checkbox de observaciones value0 y explicación opcional, con solicitud original de ambos scopes sin modificar URL. Captura ignorada output/afw-minimum-consent-20261003.png. Se pulsó Cancelar, callback access_denied; ningún permiso nuevo. Restauración cerrada antes del deadline.

API confirmó ambas versiones finales al100%/flagsfalse. Seis endpoints MCP/metadata404. D1real cinco proyectos/dos permisos retirados; canary dos proyectos/seis permisos retirados; cero permisos activos en ambos. No reabrir para repetir la captura ni inferir nuevas auditorías o scores.

Siguiente: [plan de apertura controlada](AFW-DELEGATED-OPENING-PLAN-2026-10-03.es.md), recuperación y primer cliente; no ofrecer todavía una conexión permanente desde el apex.
