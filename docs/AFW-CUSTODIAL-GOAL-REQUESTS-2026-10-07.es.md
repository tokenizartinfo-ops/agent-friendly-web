# Firma custodial de orientación, 7 octubre 2026

## Resultado y alcance

Codex cloud conserva credenciales de red como placeholders sustituidos por proxy. No se comprobó un handle HMAC opaco para código local. Por ello, la firma se prepara dentro del Worker AFW bajo custodia de servidor, con dos entradas exactas /custodial/context y /custodial/proposal. Las rutas anteriores /context y /proposal conservan sus contratos firmados.

La nueva función createAssistanceGoalCustodialHttp valida origen, ruta, POST sin parámetros, JSON exacto de máximo512bytes, identidad Access criptográfica RS256 con issuer/audiencia/clientId exactos, tipoapp/subvacío, tres pins distintos, tres secretos distintos, ventana canónica máxima10min y limitador. Solo después firma la consulta canónica y llama internamente al receptor original. Nunca devuelve firma, JWT, timestamps, headers de credenciales, redirecciones ni una URL a elección del llamador.

El receptor repite JWT/HMAC y mantiene las comprobaciones primarias de consentimiento, propietario, revisión y lease; la propuesta mantiene el presupuesto durable y su claim idempotente. El permiso del gateway no concede escritura de expediente, publicación o ampliación del modelo. Un JWT válido no acredita revocación viva de Access. Las comprobaciones de flags en memoria tampoco acreditan que otro deployment interrumpa una petición ya ejecutándose; la retirada privada primaria sigue siendo decisiva.

## Cierre y límites

AFW_GOAL_CUSTODIAL_ENABLED es un cuarto flag separado, false en ambos configs. Sin configuración completa no hay firma ni dispatch; leer no activa propuesta/generación. No hay cambio remoto, nuevo dominio, política Access, credencial cloud, esquema o cliente por esta preparación. Las claves permanecen únicamente en secretos Worker; no deben guardarse en Git, logs, chat, correo ni variables cloud crudas. El proceso cloud usa solamente sus dos pares de credenciales de red contra el destino permitido.

## Verificación

Pruebas inicialmente rojas por ausencia de la factory, luego verdes. JWT real sintético/HMAC real: lectura y propuesta separadas, rechazo identidadoperaciones/humana/audienciasmúltiples/JSONextra/origenextranjero; sharedkeys/ventanaexpirada/configcambiada/limitadorausente429/redirect503. Retirada durante limitador o dispatch no entrega contexto. Workerd con dosD1: la primera inferencia simulada entra por custodia, retry directo y custodial recuperan misma propuesta, unareserva/una llamada/unresultado; retirada primaria403 y narrativa intacta. Suite completa1092pass/0fail. Esto no prueba inferencia real del proveedor ni acceso privado remoto.

## Siguiente tramo concreto

Integrar y verificar CI exacta; publicar únicamente QA cerrada conservando versión2398df20 y D1. Provisionar tres secretos HMAC distintos en Worker mediante stdin custodial sin leerlos/archivarlos. Preparar dos apps Access por ruta/purpose y sus identidades diferenciadas; permisos cloud solo al concretar destino y acción. Publicar fuente adoptable/config y verificar tarea ordinaria. Luego sesión propia, expediente creado por el propietario, consentimiento temporal, recibo/lease primarios, una generación real, lectura/confirmación/retirada/cierre. Max y guardia permanente quedan fuera hasta completar ese cierre.

Alternativas descartadas: sustituir HMAC por placeholders no produce firma; exponer clave al proceso/modelo contradice custodia; un endpoint de firma arbitraria produciría un oráculo. Esta composición firma y procesa solo los dos contratos existentes bajo validación repetida.
