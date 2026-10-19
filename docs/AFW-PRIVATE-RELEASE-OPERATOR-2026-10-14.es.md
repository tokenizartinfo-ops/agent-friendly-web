# Operador privado para preparar el ensayo AFW

## Propósito y alcance

Conecta los diarios existentes a un WorkerEntrypoint real y un binding D1 nativo. No es el copilot ni una guardia cloud. No expone HTTP, MCP, cron o datos del expediente. Su única RPC, `AfwReleaseOperator.run(planHash)`, solo admite el digest del plan/build esperado; no acepta instrucciones ni destinos. Si otro despliegue cambia ese plan antes de invocar, rechaza sin actuar. La identidad del invocador se concede mediante un service binding administrativo a ese entrypoint; no se debe asignar a servicios públicos, al expediente, al copilot ni a otro proyecto.

El destino compilado es únicamente la cuenta AFW y delegated-canary, D1 6a728254-1494-4039-802e-b39288a55fcc y namespace d6fc71552de7494a863aca20365a572d. Un binding no prueba por sí solo el ID de su base: el operador debe comprobar la configuración remota antes de invocar. No usar Operations ni independent-closure-qa como sustitutos.

## Dos operaciones, permisos separados

- `publish`: toma el presupuesto inmutable, hereda de una versión base explícita y crea una versión cerrada con deploy=false. Comprueba sus bytes y conserva el recibo primario. Usa AFW_RELEASE_PUBLISH_TOKEN exclusivamente en el operador; no despliega ni inicia ensayo.
- `confirm`: comprueba que el recibo original corresponde al build compilado, observa con GET la configuración/versión/despliegue aprobados y registra confirmación y aceptación primaria. Usa AFW_RELEASE_READ_TOKEN; nunca publica configuración ni crea un Container.

La configuración se compila antes de invocar, no se recibe desde navegador o RPC. `AFW_RELEASE_OPERATOR_ENABLED` exige el texto true; falta, false o ventana vencida deniegan antes de mutar. Las ventanas no superan diez minutos. La credencial requerida debe estar presente antes de consumir presupuesto; su presencia no acredita permisos efectivos. Respuesta perdida mantiene el intento consumido: reconciliar con lecturas primarias/proveedor, nunca reintentar upload cambiando nombres o claves.

## Construcción y montaje

`node scripts/build-mcp-release-operator.mjs <commit-aceptado> <plan-operador-sin-secretos.json>` construye la fuente propia y la incrusta junto al plan. Verifica entradas Git antes/después. Escribe únicamente output/mcp-release-operator/index.mjs y build.json; no publica ni instala bindings. El plan publish contiene operation/startAt/expiresAt/pins; pins contiene accountId/workerName/baseVersionId/namespaceId/databaseId/kvId. El plan confirm contiene operation/startAt/expiresAt/plan/observation con los contratos de los módulos existentes. No guardar credenciales dentro del JSON ni del artefacto.

Montaje futuro: Worker administrativo privado separado, workers.dev y preview URLs desactivados, sin routes/cron; binding RELEASE_DB a la primaria verificada, solo la credencial de la operación y service binding desde un invocador administrativo acotado. El invocador remoto aún debe prepararse y comprobarse; la fixture local de pruebas no se despliega ni se reutiliza como endpoint. La documentación oficial describe el modelo de [service bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/service-bindings/) y los [modos de bindings de desarrollo](https://developers.cloudflare.com/workers/local-development/bindings-per-env/); su disponibilidad no demuestra autorización ni ejecución en nuestra cuenta.

Preflight: proveedor, identidad/alcance, siete tablas y triggers reales, estado cerrado, base de herencia y recuperación. El operador requiere esta instalación previa y no aplica migraciones. Configuración y publicación del operador se preparan separadamente de la activación del ensayo. La retirada administrativa deshabilita la RPC y retira el binding del invocador; conserva recibos, tablas y el cierre histórico del runtime. No borrar historial ni revocar credenciales compartidas.

## Evidencia y límites

Prueba nativa usa dos Workers operadores, invocador con RPC real y D1 workerd compartida. Verifica publicación única, confirmación única, negativa HTTP, argumento ajeno, flag cerrado, expiración, credencial ausente, build discordante, retirada y ACK de upload perdido sin reenvío. El proveedor y las credenciales son sintéticos. Esto acredita integración local, no publicación remota, permisos reales, suscripción ChatGPT ni PC-off. El ensayo continúa cerrado.


## Preparación de corrección: interruptores de publicación cerrada (19 de octubre)

La revisión previa a otra publicación encontró que el transporte verificaba seis interruptores históricos pero heredaba otros sin exigir su estado cerrado. La versión real inspeccionada el 19 de octubre conserva ocho interruptores false; no se ha detectado activación real. El nuevo host de continuidad añade otro opt-in, ausente en esa versión.

Contrato candidato: todo binding cuyo nombre siga la convención AFW_*_ENABLED debe ser plain_text con la cadena exacta false antes de crear la versión. Se mantienen los seis campos históricos obligatorios; los opcionales ausentes no se inventan, y los opcionales presentes false se heredan de la versión fija. Estado activo, valor no canónico o tipo que no permite leerlo impiden el POST. Las demás variables conservan su contrato; no se convierten todas las variables de AFW en interruptores.

Plan: regresión antes del cambio en el publisher real con proveedor simulado, RED observado en GitHub Actions; guard mínimo, suite completa/lint/build, una revisión de rama e integración exacta. La PR portadora conservará SHAs/resultados. No pruebas de texto ni nuevo subsistema. No se publica el operador o el canary ni se renueva una credencial desde este bloque; el operador desplegado conserva su versión y permanece deshabilitado. La aceptación fuente no demuestra despliegue o PC-off.

El registro operativo único es [issue497](https://github.com/tokenizartinfo-ops/agent-friendly-web/issues/497). La fuente histórica de este documento mantiene su fecha y alcance; este addendum aún es preparación hasta que la PR registre su aceptación.
