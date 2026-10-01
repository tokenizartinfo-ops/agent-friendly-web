# Correo AFW: comprobación operativa

Evidencia del 2026-10-01, 22:12 UTC. Proyecto AFW; repositorio tokenizartinfo-ops/agent-friendly-web; origen agentfriendlyweb.dev; servicio Cloudflare Email Sending. No se cambió DNS, proveedor ni runtime web.

## Resultado observado

- El dominio ya estaba habilitado desde el 2026-09-02. DNS status `ready`, sin errores: SPF, DKIM y DMARC configurados. La conclusión anterior de que faltaba habilitar envío era incompleta.
- Una prueba desde hello@agentfriendlyweb.dev por la API de Cloudflare llegó a la bandeja de entrada del owner. Gmail verificó SPF, DKIM y DMARC `pass`. Asunto de prueba: `20261001-CF01`.
- Cuota observada: 200 mensajes por día; no equipararla con una tarifa o capacidad contractual general.
- hello, hola y ola tienen reglas activas de reenvío al buzón operativo existente. Son aliases, no buzones independientes. La prueba `20261001-CF02` desde ese mismo Gmail solo mostró SENT y no acreditó recepción. La segunda prueba `20261001-CF03`, enviada por Cloudflare Sending a hello, llegó mediante Email Routing a Gmail con INBOX a las 22:34:05 UTC. Esto acredita el reenvío de hello, sin acreditar entrega desde todos los proveedores externos ni probar separadamente hola/ola.
- Se envió una comunicación de estado al primer piloto desde hello. Cloudflare la aceptó en cola, sin supresión ni rebote permanente en la respuesta inicial; esto no demuestra recepción del cliente. No repetir automáticamente si el resultado es desconocido.

## Límites y siguiente bloque

El canal puede utilizarse para comunicación asistida autorizada; no hay integración automática de notificaciones del expediente ni gerente cloud activo acreditados por esta prueba. La configuración antigua `draft_only` de los contratos de correo sigue describiendo la automatización, no la capacidad real del proveedor. No cambiar ese contrato para anunciar envío autónomo.

El OTP de Access es otro servicio. Soporte respondió el 2026-10-01 a las 22:15:43 UTC: según su revisión, el primer intento ocurrió sin una política coincidente y el posterior reutilizó la sesión OTP activa sin emitir otro correo. Indicó reenviar código o usar ventana privada, solo el código más reciente, y comprobar cuarentena si persiste. Se comunicó al piloto; ingreso real aún no confirmado. Este diagnóstico es una declaración de soporte, no logs inspeccionados por AFW. Configurar correo AFW no resuelve por sí solo Access ni autoriza retirar controles.

El primer piloto debe autenticarse con su identidad real y crear su propio expediente mediante la interfaz. No crear un expediente bajo el owner para luego atribuírselo al cliente. Primero objetivo confirmado, revisión pública fechada, propuesta revisable, decisiones/entrega/comparación persistidas. No completar datos privados por correo ni instalar archivos sin revisión.

El copilot productivo está restringido al proyecto previo. Cuando exista el expediente del cliente, verificar propiedad y habilitar únicamente ese ID mediante el mecanismo acotado existente (lista de hasta diez IDs), conservando el piloto anterior y su rollback. No abrirlo globalmente ni prometer acompañamiento AI antes de esa comprobación.

Verificar recepción real desde un emisor distinto, observar entrega del correo al piloto, resolver Access y comprobar el recorrido autenticado. No se requieren Resend ni nuevas credenciales para el envío manual comprobado.

Rollback: configuración conservada; detener futuros envíos si falla la comprobación. Los mensajes enviados no se pueden retirar.
