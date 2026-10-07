# Composición HTTP de orientación, cerrada

Preparación local AFW del 6 de octubre de 2026. No montada en un runtime ni activada remotamente.

`createAssistanceGoalProposalHttp` compone la autoridad exclusiva JWT/HMAC con inscripción propia resuelta por servidor, fuente privada primaria, recibo de lectura consentida, reserva operacional activa y ledger de propuestas. Exige flag de generación aparte, ventana UTC canónica máxima de diez minutos, configuración estable, rate limit, cuerpo exacto512bytes/3segundos y generador/reserva de presupuesto confiables. Falta cualquiera y falla cerrado.

La reserva de presupuesto sucede solo para un claim nuevo, nunca al recuperar una propuesta guardada. Su adaptador debe ser durable, acotado y ligado a la misma intención privada; no aceptar un booleano del cliente como presupuesto. La implementación real de presupuesto y proveedor no se instala aquí. Un presupuesto reservado y luego descartado no se reinicia/refunda silenciosamente: el proveedor podría haber recibido datos o seguir procesando tras un abort.

Se reprodujo un fallo concreto: retirar el consentimiento mientras esperaba la reserva de presupuesto todavía permitía una llamada al generador. Prueba roja1vs0. Corrección: revalidar identidad, recibo primario, consentimiento original, declaraciones y reserva operacional antes y dos veces después de esa espera, además de los controles del coordinador. Retirada, regrant o cambio de dueño durante presupuesto ahora producen cero llamadas y ningún resultado guardado. Estas verificaciones no son una transacción distribuida entre D1 independientes.

El generador recibe solo declaraciones mínimas, estado owner_declared y operationsAuthorized:false. Nunca recibe dueño, claves, narrativa o referencias internas. El servicio conserva una pregunta y motivo acotados; revisión/permiso/cierre durante generación impiden entregarla. Reintentos recuperan el mismo proposalId sin volver a generar o consumir presupuesto. Preparado no acredita lectura, aceptación o cambios.

Evidencia: pruebas inicialmente rojas por adaptador inexistente; luego positivos con JWT/HMAC reales sintéticos, SQLite privado y operacional separado. Casos de presupuesto ausente/denegado, cierre durante rate limit, retirada durante generación, retirada/regrant/dueño durante presupuesto. Suite completa1074 pasó antes de agregar la prueba nativa; verificar resultado/CI exactos.

Workerd con dos D1: autenticación criptográfica real, presupuesto durable sintético de una fila, una generación sintética y un resultado; reintento mismo payload, retiro posterior403 y narrativa conservada. El contador/ruta de stats y tabla fixture_budget son exclusivos del test. No acreditan el presupuesto real, proveedor ni custodia cloud. Compatibility_date local2026-09-07.

CI37559980454 aprobó d11572f anterior, que prepara identidad exclusiva y documenta el ensayo visual. La revisión de este adaptador requiere su propia CI. No se cambió el Worker remoto, binding, dominio, policy, flag, cron ni D1 remota.

Próximo cierre: reservar presupuesto real en una capa propia y elegir/conectar el generador existente con custodia específica, política de datos y límites; después montaje cerrado, prueba propia finita con respaldo/rollback, apertura acotada y retirada comprobada. No invitar clientes ni habilitar guardia permanente desde pruebas sintéticas.
