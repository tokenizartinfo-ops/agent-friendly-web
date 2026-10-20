# Consentimiento autenticado de preparación: adaptador HTTP de fuente
20oct2026. Candidato; resultados finales en PR518 e issue497. Sin montaje ni operación remota.

La fábrica createDelegatedPreparationConsentHttpHost reúne GET/POST /authorize con el verificador Cloudflare Access existente, transacción SDK original, política/almacenamiento explícitos y pantalla accesible. Está desactivada por defecto y ningún entrypoint productivo la importa.
No añade alcances al cliente de lectura. No implementa endpoints de token, refresh, registro o conexiones: el Worker y sus pantallas actuales permanecen intactos. Una futura integración de esos componentes requiere su calificación propia.

## Recorrido comprobable en fuente
La configuración de servidor fija cliente, recurso, expediente y fechas originales. La solicitud tiene un único plazo de hasta cinco segundos, incluyendo cuerpo, identidad, SDK, base primaria y respuesta. El tiempo no se renueva al terminar cada paso.
La identidad se verifica desde la assertion Access; encabezados auxiliares y campos del formulario no la reemplazan. El formulario admite solo una decisión visible y un handle ligado al cookie del SDK. El registro conserva el hash de la solicitud original; el SDK no recibe una selección ampliada para reconstruirla.
Elegir lectura emite solo lectura; elegir borradores admite guardar propuestas, sin aprobar, instalar, publicar o cobrar. La pantalla reutiliza la tipografía y estilo existentes. Su política form-action permite únicamente el origen de callback registrado y validado por el SDK.
Solo un guardado nuevo y confirmado puede completar el código. Una confirmación desconocida conserva su estado y no dispara otro intento, código ni retirada del posible ganador. Si se confirmó la creación propia y falla completar el código, se intenta una sola retirada de esa concesión con limpieza acotada a dos segundos. No se declara éxito de esa limpieza ni recepción del navegador. El servidor no conoce un ACK de red perdido después de entregar la respuesta.
La retirada y el historial de cápsulas son operaciones distintas. El adaptador no borra datos ni deshace un trabajo confirmado.

## Evidencia y límites
Actions usará Access JWT RS256 firmados con claves efímeras propias y el verificador real con la clave pública local; SDK/code/PKCE/token/KV/MCP/D1/workerd reales. Se instrumentan fallos después de commits reales, sin respuestas de éxito simuladas. Este ensayo no prueba la emisión, JWKS, OTP o identidad humana de Cloudflare.
Se verifican permisos, bytes, identidad/propiedad, formulario/cookie, esquema, demora, errores de confirmación y recuperación. La prueba de timeout reutiliza la misma instancia del adaptador para una solicitud posterior; la deriva observada de configuración debe mantenerla cerrada.
El RED inicial es una aserción explícita por fábrica aún ausente; no es un fallo de bundler ni demuestra por sí mismo cada control posterior. La matriz nativa debe ejecutarse completa antes de aceptar el bloque.
G2 sigue cerrado y no se repite. DDL remoto, host OAuth productivo completo, consentimiento nuevo, Container, avisos/turno útil/baja nativa, PC-off y Max mantienen gates separados. operationalReadiness=false.
