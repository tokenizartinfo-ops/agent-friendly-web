# Ensayo de recuperación con transporte vigente

PROJECT AFW; REPOSITORY agent-friendly-web; ENVIRONMENT synthetic canary; ORIGIN delegated-canary.agentfriendlyweb.dev; RESOURCE_TYPE Worker y adaptador QA; RESOURCE_ID agent-friendly-web-delegated-canary; ALLOWED_ACTION ventana de lectura sintética, simular fallo de SELECT del proyecto en tools/call, restaurar lectura y retirar el permiso; ROLLBACK efaf2265-b97f-4b5f-aaf0-52036d4c6217 al100%, preservando D1/KV e historial. El servicio real y sus expedientes quedan fuera del ensayo.

## Preparación

El adaptador `test/fixtures/delegated-recovery-probe.mjs` no está importado por ningún entrypoint productivo. Solo simula un error en SELECT FROM site_projects para read_project_summary del origen canary exacto, cliente sintético exacto, OAuth habilitado y deadline futuro de hasta quince minutos. No altera SQL, tablas, propietarios, permisos, registros de credenciales ni endpoints. Las rutas de consentimiento, token y retirada delegan sin modificar el entorno. El fallo conserva las validaciones OAuth y de grant; no constituye un bypass.

La prueba automática verifica límites de origen, cliente, plazo, herramienta y operación; una compilación Wrangler dry-run del entrypoint QA local pasó con OAuthfalse/refreshfalse, sin subida ni despliegue. Configuración y bundle locales están ignorados en output/. La prueba HTTP del PR209 acredita el resultado de aplicación503 dentro de HTTP200 y retorno200 con el mismo permiso; todavía no acredita la presentación de ChatGPT.

## Secuencia remota acotada

1. Verificar versión cerrada, cero grants activos, cuenta/recurso y sesión Access. Crear deadline nuevo; nunca reutilizar el de un ensayo vencido.
2. Subir candidato normal y candidato con adaptador, idénticos en bindings, cliente, flags y deadline. Activar primero normal. Revisar consentimiento nuevo de resumen únicamente; evidencia opcional desmarcada.
3. Leer resumen200 desde el chat sintético existente. Cambiar al candidato QA sin retirar o acortar el permiso. Una sola lectura debe entregar recovery temporal, conservar pregunta histórica y no reconectar automáticamente.
4. Restaurar candidato normal antes de otra lectura única. Comprobar retorno200 con el mismo permiso; no prolongar su vencimiento.
5. Retirar solo el permiso del nuevo ensayo, restaurar cerrado y comprobar flags, deployment, endpoints404 y cero grants activos. Conservar historial y recibo saneado.

Si falta ingreso o el cliente intercepta la consulta, cerrar antes de pedir intervención; no insistir ni crear conexiones duplicadas. Ningún resultado sintético aumenta por sí mismo un puntaje externo o acredita servicio comercial permanente.
