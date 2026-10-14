# Publicación cerrada con herencia de versión fija

`createClosedPublication` compone el diario primario, el transporte JSON real y la lectura de bytes publicados. Es una API interna de operador, todavía sin ruta HTTP, CLI de ejecución ni montaje remoto. Su invocación requiere preparación y autorización de release cerrado; no recibe selectores desde un cliente.

## Recorrido

1. Guarda intento inmutable en primaria y exige su primer ACK.
2. Lee la versión base por UUID en la API nueva de Workers. Comprueba seis flags false, namespace/clase, D1, KV, compatibilidad y export conocido.
3. Rechaza ajustes no soportados antes del POST. No sustituye límites, placement, assets o configuración desconocida por defaults silenciosamente.
4. Crea una versión con POST `/workers/workers/{worker}/versions?deploy=false`. Todos los bindings se heredan desde el UUID explícito de la base, nunca desde latest. No lee ni envía valores de claves; no crea claves ni solicita rotaciones.
5. Rechaza cambios reportados por reconciliación de exports. Consulta la nueva versión y compara configuración/bindings con la base. Una respuesta perdida o un resultado discordante exige conciliación; no se repite el POST.
6. El lector separado recupera el módulo por UUID, compara los bytes con el hash preparado y obtiene el etag. Solo entonces el diario conserva un recibo confirmado, con `mayDeploy:false`.

La publicación dispone de un máximo total de 60 segundos (antes eran 5), con transporte de hasta 45 segundos y lectura de bytes de hasta 5. Esto modifica únicamente el presupuesto técnico del release, no la vigencia del consentimiento ni del ensayo. La cancelación y pérdida de ACK conservan el intento consumido.

## Preservación y límites

`deploy=false` no activa tráfico. Sin embargo, exports puede reconciliar namespaces en la API: antes de utilizar el transporte remotamente hay que comprobar la existencia y estado actual del namespace y la reversión compatible. Comprobar la respuesta después de una reconciliación inesperada no deshace efectos. Este módulo no sustituye ese preflight operativo ni una autorización de recursos.

La base admitida corresponde al runtime actual, fecha 2026-09-07, flags nodejs_compat/global_fetch_strictly_public y export AfwOwnEventNode/sqlite. Las variantes requieren revisión explícita. `env`, cuando la API lo devuelve, debe tener exactamente las claves de bindings y mantenerse igual en el readback. Sus valores se comparan en memoria privada y nunca se devuelven al llamante.

La exclusión durable depende de la primaria del diario. La instancia del transporte añade un cierre de un solo uso, pero no se debe instanciar directamente para eludir un intento previo. Ninguno de estos componentes concede permiso de usuario, arranca Node, programa cron ni prueba PC-off.

## Evidencia

Pruebas dirigidas cubren herencia por UUID, bytes alterados, flags habilitados, recursos ausentes, pérdida de ACK, readback discordante, timeout y ajustes no soportados. La composición se probó con HTTP local real y SQLite: POST y GET atraviesan el servidor local, se inspecciona el cuerpo y solo el recibo verificado se persiste. Cloudflare se consultó únicamente por GET; no se realizó publicación remota.

Siguiente paso: integrar la fuente, definir ubicación y acceso de la primaria del diario, verificar preflight/rollback remoto cerrado, luego publicación y readback reales cuando el gate permita el ensayo. Después siguen montaje, alta/baja nativa, evento útil cloud y cierre independiente antes de acordar PC-off.
