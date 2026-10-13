# Comprobación del proveedor antes de un ensayo de cron propio

El 13 de octubre, la API oficial de estado confirmó el incidente `cbvocc87nsne`: los Cron Triggers recién creados o modificados podían no ejecutarse. Coincide con nuestros ensayos, pero no demuestra por sí solo la causa individual de la ausencia de registros en AFW. La ejecución histórica del 12 de octubre fue anterior y no acredita la versión actual.

Antes de preparar otra programación propia, ejecutar desde este repositorio:

```sh
node scripts/check-own-cron-provider.mjs
```

El comando consulta únicamente la API pública oficial de incidencias, sin autenticación de cuenta ni acceso a Workers, expedientes, callbacks o claves. Limita la lectura y el tiempo de respuesta, rechaza redirecciones y no imprime textos recibidos del proveedor. No instala crons, renueva permisos, inicia procesos ni crea suscripciones.

| Resultado | Código de salida | Decisión operativa |
| --- | --- | --- |
| `blocked` | 2 | El incidente original u otro incidente de Workers Cron sigue activo. No abrir un nuevo ensayo ni permiso para intentarlo. |
| `unknown` | 1 | Respuesta ausente, inválida, no correlacionable, inaccesible o con impacto activo de Workers/Cron ambiguo. No inferir resolución ni un problema de credenciales de AFW. |
| `resolved` | 0 | El incidente original aparece resuelto y no se detecta otro incidente cron activo ni impacto activo ambiguo en la evidencia disponible. Solo permite preparar una verificación cerrada proporcional. |

`operationalReadiness` permanece siempre en `false`: la resolución del proveedor no acredita un cron real de la versión actual, el modo de programación futuro, recepción o respuesta cloud, consentimiento, retirada nativa ni PC-off. La ausencia del incidente en una lista no se interpreta como resolución. Leer un recibo antiguo tampoco sustituye una consulta actual.

El clasificador considera títulos, componentes y componentes afectados de las actualizaciones. No depende solo del nombre de un incidente: un título genérico con componente Workers Cron mantiene el bloqueo; un impacto activo de Workers sin alcance preciso devuelve desconocido.

Este control es una herramienta de operador, no un bloqueo incorporado a la plataforma ni un scheduler cloud. Se ejecuta explícitamente antes de otro ensayo. No se modifica la configuración privada o la aplicación pública para consultar el estado.

Después de la resolución: verificar el modo que realmente se utilizará y el cierre independiente antes de iniciar el permiso original de diez minutos. Mantener los controles de tiempo, consumidor único, callback, evento realmente guardado, entrega única dentro del intervalo de apagado, respuesta útil, retirada nativa y paro físico. No ampliar plazos ni resetear presupuesto para acomodar una demora.

Fuentes: [incidente oficial](https://www.cloudflarestatus.com/incidents/cbvocc87nsne), [API pública de estado](https://www.cloudflarestatus.com/api), [ciclo nativo MCP Events](https://developers.openai.com/plugins/build/mcp-events).
