# Disponibilidad del servicio y duración del consentimiento

PROJECT AFW; REPOSITORY agent-friendly-web. Preparación de código; no habilita el servicio ni amplía permisos de clientes. Runtime delegado, separado de web pública/A2A/Tokenizart. Los permisos individuales permanecen diez minutos, resumen por defecto y evidencia opcional; refresh, cuando esté habilitado explícitamente, solo dentro del plazo original.

## Política explícita

`AFW_OAUTH_SERVICE_MODE` admite window o stable. Ausencia de modo equivale a window: requiere AFW_OAUTH_PILOT_EXPIRES_AT válido y cierra404 al vencer. Un modo inválido, reloj inválido o ventana sin fecha devuelve503. Stable requiere ausencia completa de la variable de vencimiento de piloto: combinar stable con un deadline devuelve503 para evitar configuraciones ambiguas. Disponible de forma estable significa endpoint operativo; no significa consentimiento indefinido.

Ambos modos requieren DELEGATED_RATE_LIMITER.limit. Binding ausente, inválido o que falla:503 saneado, sin detalles internos. Solo success booleano true permite continuar. Límite alcanzado:429 con Retry-After60 y una indicación breve para esperar un minuto. Las configuraciones actuales conservan30consultas/60segundos. El límite aplica también a metadata, consentimiento y tokens, sin cambiar PKCE, Access, validación de grant, propietario o resource.

AFW_DELEGATED_OAUTH_ENABLEDfalse continúa cerrando404 antes de evaluar la política. Los dos archivos Wrangler siguen cerrados, modo window, deadline histórico, mismos Workers/bindings/pin y refreshfalse. No retirar el pin de proyecto del piloto real por inferencia ni publicar discovery hacia estos servicios cerrados.

## Evidencia y límites

Se reprodujeron dos fallos antes del cambio: metadata200 con disponibilidad incompleta y modo stable200 sin limitador. Pruebas posteriores con proveedor OAuth real/SQLite/cliente MCP verifican503 de configuración,429 y fallo del limitador, metadata200 estable, grant de exactamente600000ms y lectura denegada sin datos al vencer el grant aunque metadata siga200. La fixture local ahora declara stable y limitador exitoso; la prueba de ventana declara window y elimina el binding expresamente.

Esta aceptación local no acredita disponibilidad estable remota ni apertura comercial. Antes de activar: revisar origen, cliente/callback, Access, DB/KV, limitador, modo, pin o selección server-owned y rollback cerrado; actualizar la expectativa del chequeo cloud según la modalidad real; aceptar metadata y lectura/retirada pertinentes. No repetir los recorridos ya aceptados sin un cambio relevante. Periodicidad, responsable de incidente y enlaces de conexión deben corresponder a un servicio realmente activo.

Para una promoción cerrada: versionar y desplegar el código nuevo con OAuthfalse, preservar datos e historial, comprobar flags y seis endpoints404. Rollbacks anteriores de código: canaryefaf2265-b97f-4b5f-aaf0-52036d4c6217 y real774c9547-a205-4f24-b369-1dca58a7de16. No migraciones ni cambios de Access en este bloque.
