# AFW: registrador MCP cerrado para preparación y conciliación
19oct2026. Base8990d44125c5a5b3ea1750d92c8629e17d84c9df / PR506 aceptada, CI39330940463.
## Contrato acotado
Un registrador desacoplado registerDelegatedCapsulePreparation(server,{enabled,host}) añade prepare_capsule_draft y reconcile_capsule_preparation solo con enabled===true y host inmutable de servidor proveniente del puenteOAuth de PR506. No se conecta a ningún entrypoint/read-server; no hay opt-in remoto ni scope/consentimiento registrado.
Entrada estricta compartida con servicio: contract agentfriendly.capsule-prepare.v1, expectedRevision>=1 seguro y clave idempotente8..120 caracteres permitidos. Nada de sujeto/proyecto/dominio/archivos/precio/consentimiento. SDK valida antes de callback; callback también usa parser del dominio. Recibe copia inmutable propia.
Metadatos: prepare write/readOnlyfalse, reconcile readOnlytrue, ambas idempotenttrue/destructivefalse/openWorldfalse, _meta.securitySchemes scope futuro afw:capsule:prepare. Son hints, no autoridad. No WWWAuthenticate ni reconexión/step-up automático mientras consentimiento real no esté implementado.
Salida validada explícitamente también para isError (SDK omite su output-schema validation en esos resultados). Solo contrato/código/replayed/preparation con UUID/hash/revisión/version y tres flagsfalse; campos extra, getters, trueflags o revisión discordante se descartan. prepared requiere campos válidos, reconcile requiere replayedtrue; errores no pueden aportar referencias. Wire es objeto estricto con preparation/replayed null en errores y recovery estático, sin texto interno arbitrario o URL/callback inventados.
Tras invocar prepare, excepción o salida inválida =>unknown_ack. Read failure=>unavailable; ningún reintento/autoprepare/clave nueva. UnknownACK/pending/temporales guían a reconcile con misma solicitud. Conflicto=>revisar solicitud; permiso=>revisar consentimiento; dominio=>verificar por flujo humano; preparado=>revisar borrador, nunca aprobado/instalado.
Registro transaccional lógico: callbacks inactivos hasta registrar ambas herramientas; fallo parcial retira solo handles propios, mantiene inactividad aun si cleanup falla, error saneado.
## Ejecución y evidencia
Task1 pendiente: pruebas RED con Client/McpServer/InMemoryTransport reales y puenteOAuth+SQLite reales en Actions; no token validado real, consentimiento o runtime remoto.
Task2 pendiente: módulo/documentación y GREEN npm test / npm run lint / npm run build.
Task3 pendiente: una revisión fresca completa, Important/Critical una pasada RED→GREEN sin re-review, CI exacta/merge y CI main, recibo en PR/issue497.
## Rulings y límites
Ruling: continuación acotada de contratos PR504/505/506 bajo autorización expresa para decidir/encadenar bloques; no nueva aprobación rutinaria. Costo si mal delimitado: revisión de fuente antes de cualquier montaje.
Ruling: GitHub/Actions sustituyen checkout/worktree/build local por preferencia cloud-first; costo es latencia de runner, no recursos pesados locales.
Ruling: JSON text más structuredContent conserva compatibilidad de clientes y contrato programático; costo son bytes duplicados, sin afirmar ahorro de tokens. Texto contiene solo DTO ya saneado.
Ruling: lectura MCP no da preparación; scopes/consentimiento/migración/rollout remotos siguen gates separados. Sin OAuth Worker import, registro público, DDL, flags, custodia/token o dato de cliente nuevo. Revert solo fuente; nunca DROP/reset/historia.
Review focus: salida isError no validada por SDK; prepared revision/ref/hashes/flags; getter/rawerror; excepción/lostACK y falta de reintentos; readOnly reconciliación; registro parcial y scopes metadata no autoridad; ausencia de montaje.
G2 aceptado/cerrado no se repite. G3Container02382110, G4avisos/baja, G5PCoff y G6Max independientes. operationalReadiness=false.

## Ejecución
Task1 complete: REDf6e34f962099e656d0dfdf9025fe484b8eb054f6 / Actions39335241002/job118342972348:2226PASS/14FAIL esperados/1SKIP existente. Sin fallos previos ni errores de import/setup.
Task2 in_progress: registrador desacoplado con schemas Zod4 explícitos, proyección cerrada tanto en éxito como error, recuperación estática y rollback de handles propios. Host finito inmutable existente conserva autorización y su presupuesto; este componente no añade un transporte ni promete cubrir el tiempo anterior al parsing/dispatch. GREEN pendiente.
