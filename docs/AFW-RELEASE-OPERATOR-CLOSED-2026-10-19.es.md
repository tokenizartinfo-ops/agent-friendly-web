# Operador AFW publicado cerrado — 19 de octubre de 2026

## Resultado comprobado

Lectura primaria del control plane a las **17:42:11 UTC** (14:42 Argentina). Cuenta AFW `85d0d5dadac3341a564f22ce885e9eec`, Worker `agent-friendly-web-release-operator`.

| Evidencia | Referencia |
| --- | --- |
| Fuente aceptada | PR499, main `15b3aa56c063b3bcefc5f3cbb2d7a24c0f0696ea` |
| Árbol | `05f4abdb007b487daf3249eae169333e4c7cb4ff` |
| Versión cerrada | `bcf9afc4-e243-416d-952d-a77060b9beeb` |
| Deployment al 100 % | `ffa75f4e-fad9-47aa-9de7-e72d57981ceb` |
| Módulo index.mjs | 1906049 bytes; SHA256 `387809c0bd52bfc5d4bde1936778ed6e1999ad8e29419c2f8afb02b422adfa3b` |
| Estado | AFW_RELEASE_OPERATOR_ENABLED=false; cron[], tails[], containers[]; workers.dev y previews desactivados |

Se instaló la fuente que incluye la corrección de interruptores de PR498. **No se invocó la RPC ni se publicó o activó el canary.** El plan compilado publish/start0/expires600000 está históricamente vencido y NUNCA debe invocarse, aunque posteriormente se cambie una variable. No demuestra operación cloud útil, guardia o PC-off.

## Procedencia y validación

PR499 tuvo una revisión independiente de rama: una observación menor sobre dependencias transitivas, corregida y revisada por el mismo revisor; cero pendientes. Main verificó 2126 pruebas correctas, cero fallos, una omitida, lint sin errores con dos advertencias existentes y cinco builds aprobados. Check verify118203494936, run39294531461, SUCCESS17:32:33UTC.

Una única compilación manual inerte del main comprobó entradas no predeterminadas y el intervalo original máximo10min: run39294613916/check compile118203798728, SUCCESS17:30:38UTC. Artefacto12206948173, ZIP360285bytes, SHA256 `c02e0a06cf07c2a8cd0e7975d568606a7e008ee33c742955c6576ac558307010`, vence26oct17:30:33UTC. Contiene solo index.mjs/build.json/policy.json.

El digest del ZIP, entradas, manifiesto, política y hash de bytes del módulo se contrastaron antes de crear la versión; el control plane devolvió el mismo módulo después del staging y de la promoción. planHash `86b8939ffe64988ceda4e7533ab2acf491c30d246e5bfc79be3a2d68ec2f5854`; workerHash incrustado `90f1b43549cfc26472a313e379228232552ee0a8dcffb418fa7364cca5d424bd`. Son hashes distintos con propósitos distintos.

La transferencia directa entre conectores devolvió403. Excepción acotada a la preferencia cloud:360285bytes pasaron por memoria para entregar el artefacto al conector, sin archivo ZIP local, instalación, build, contenedor o proceso persistente. El conector de Cloudflare volvió a verificar y descomprimir los bytes. Capturas pequeñas del ingreso de credencial fueron la otra excepción local, sin secretos visibles. Los enlaces temporales de descarga no se guardaron en Git.

## Custodia y configuración

El owner creó un único publicador temporal limitado al canary y confirmó la entrada privada de AFW_RELEASE_PUBLISH_TOKEN con Guardar versión. Su vencimiento aprobado es20oct02:59UTC (19oct23:59Argentina). No renovarlo automáticamente. No se renovaron lectores ni permisos Container.

La versión administrativa `df18429c-e8b7-4eba-a789-2e0a9eca7c61` recibió el secreto nuevo, conservando código antiguo. Su copia previa fue7fe32df9. **Guardar versión no había promovido esa custodia:** el activo seguía54584cfc con la credencial histórica. La nueva publicación hereda explícitamente los cinco bindings de df18429c, sin extraer valores de secretos. Su presencia y herencia no prueban todavía permiso efectivo o uso exitoso.

Bindings preservados: RELEASE_DB a D1 `6a728254-1494-4039-802e-b39288a55fcc`; AFW_RELEASE_EVENTS_NODE al namespace `d6fc71552de7494a863aca20365a572d`/AfwOwnEventNode del canary; dos secretos y flagfalse. Mismos compat2026-09-07, nodejs_compat/global_fetch_strictly_public y exportAfwReleaseOperator.run.

La API nueva mostraba containers:[AfwOwnEventNode] en la copia de custodia, mientras el activo antiguo no lo declaraba y el operador no exporta esa clase. La copia no se promovió. Para el operador corregido se preservó la configuración efectiva sin Containers propios, comprobada en la nueva versión. Esto no acredita ni diagnostica el Container nativo del otro Worker.

## Recuperación y límites

Material antiguo comprobado recuperable antes de mutar: versión54584cfc-9a81-4bb9-bcab-ff9426d74ab7, index.js1882897bytes/SHA256 `2c5b103dfa332998ad3db65df3b1f4eb631993e9386ddc5aa3455ee5d36235a0`. La configuración cerrada y custodia fija permiten preparar una versión de recuperación con esos bytes y el secreto nuevo, sin asociar Containers. **No se ejecutó una reversión real en este bloque**, ni se autorizaforce, bajar secretos, borrar recursos o retroceder datos.

Canary permanece en f8feb421-4ef7-4051-a508-1ee490737a7d/deployment3e78e8b8-2e4a-4541-a62b-4a353409ffbf100%, ocho interruptoresfalse y cron[]. No se tocó el sitio público, D1/DO, datos de Max, OAuth, suscripciones o correo.

## Continuación

[Issue497](https://github.com/tokenizartinfo-ops/agent-friendly-web/issues/497) conserva el único registro operativo y planes previos a cada mutación.

1. Comprobar una vía administrativa cloud auténtica para scripts/invoke-mcp-release-operator.mjs, con identidad y cuenta autorizadas, sin extraer el secreto del operador o instalar un endpoint HTTP. La función existente usa getPlatformProxy/remoteBindings y gate del proveedor. No sustituirla por independent-closure-qa o una RPC simulada.
2. Solo entonces preparar **otro** paquete publish con ventana nueva original<=10min, versión base explícita, configuración, presupuesto y recuperación comprobados. El paquete actual vencido no se recicla.
3. Publicación cerrada del canary y recibo primario; luego aceptación finita de continuidad con sesión propia. No requiere por sí misma reparar Container, pero tampoco prueba eventos.
4. Para cadena nativa, nueva evidencia del caso02382110, cliente real/callback, entrega, revisión útil terminada y retirada; después ensayo PC-off acordado y por último aprobación exacta del correo/consentimiento del cliente.

operationalReadiness=false. Monitor de soporte PAUSED; no recrear reclamos ni volver a pedir OTP por este recibo.
