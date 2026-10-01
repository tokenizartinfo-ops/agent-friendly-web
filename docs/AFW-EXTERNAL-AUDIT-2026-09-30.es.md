# AFW: comprobacion externa del 30 de septiembre

Proyecto AFW, repositorio `tokenizartinfo-ops/agent-friendly-web`, origen de produccion `https://agentfriendlyweb.dev`. Lecturas publicas, sin datos de clientes ni cambios de DNS en este bloque.

## Evidencia

Proveedor: Cloudflare, https://isitagentready.com/mcp, herramienta `scan_site`. Se consultaron los perfiles `all` y `content`, sin sobrescribir la lista de comprobaciones. Las consultas terminaron el 1 de octubre UTC, todavia 30 de septiembre en Buenos Aires. Fuente desplegada observada: `7c049daa3ff435d6f1d91c6b5a83977cdeefb9b7`, Worker version `c6175cff-42ca-490d-8507-96c5fce23126`.

| Perfil | Resultado | Aprobadas | Pendientes |
| --- | --- | --- | --- |
| Completo | Level 4 Agent-Integrated | 11 | 5 |
| Contenido | Level 5 Agent-Native | 6 | 1 |

La API no devolvio puntaje numerico. No se acredita un aumento sobre el 73/100 declarado anteriormente por el owner, ni 100/100. El perfil de contenido excluye API/autenticacion; su Level 5 no acredita AF-5 transaccional. Los dos perfiles pertenecen al mismo proveedor, no son dos auditores independientes.

Resultados estructurados, fechas y hashes SHA-256 de las respuestas completas: `public/.well-known/external-readiness.json`. Las respuestas completas originales quedan en `output/external-audit-20260930/{all,content}.json`, ignoradas por Git. La pagina humana explica el alcance y conserva el baseline historico.

## Pendientes y orden de trabajo

1. **DNS-AID / DNSSEC**: el SVCB publicado existe, pero la cadena DNSSEC no valida. GET de Cloudflare para zona `4b1a3fe4b6dcb81e9d6a633174c5939f` devuelve `pending`. Google DNS devuelve ausencia autenticada de DS en el padre y AD=false para el SVCB. No confundir AD=true en la respuesta de ausencia de DS con validacion de AFW. Cloudflare Registrar publica DS automaticamente mediante CDS/CDNSKEY; la documentacion indica uno o dos dias. La API Registrar examinada no ofrece escritura de DS. Repetir lectura tras publicacion; si continua pendiente, investigar con Registrar. No alternar DNSSEC ni publicar DS arbitrarios para forzar el puntaje.
2. **OAuth discovery y protected resource**: requieren servidor de autorizacion y recurso protegido reales para clientes agentes. Cloudflare Access humano no prueba delegacion OAuth para agentes. Implementar cuando haya un caso API autorizado; permisos, consentimiento, revocacion y auditoria antes de anunciarlo.
3. **auth.md**: pendiente de ese flujo real de autenticacion/registro. Documentar un mecanismo inexistente no resuelve el requisito.
4. **A2A agent card**: requiere servicio A2A observable. Un copilot web no equivale automaticamente a un servidor A2A. Evaluar interoperabilidad concreta antes del desarrollo.

Los documentos existentes `llms.txt`, `llms-full.txt`, API catalog, MCP server card, skills, ARD y negociacion Markdown ya aportan comprobaciones aprobadas. No hay evidencia de que agregar mas archivos genericos resuelva las cinco pendientes.

## Continuidad

Este bloque corrige evidencia publica desactualizada y el reclamo de alojamiento Sites 27. No cambia el puntaje, la metodologia AF, datos privados, permisos ni el piloto del copilot. Publicacion de esta evidencia requiere conservar la configuracion congelada del Worker de produccion; rollback a `c6175cff-42ca-490d-8507-96c5fce23126`, sin migraciones de D1.

Fuentes: https://developers.cloudflare.com/dns/dnssec/ ; https://developers.cloudflare.com/registrar/get-started/enable-dnssec/ ; https://blog.cloudflare.com/agent-readiness/ .

## Publicacion verificada

PR #137 integrada; fuente de produccion `66fc04c51b95812a7f0b4caf169ffc278d4d3608`. CI de PR y main aprobada, main run `36796256171`, artefacto `afw-build-66fc04c51b95812a7f0b4caf169ffc278d4d3608`. 610 pruebas, lint sin errores (una advertencia existente), tipos y build aprobados.

Worker version `d09bcf52-6fae-4c34-bfec-40b715384205`, deployment `83a8bd57-2af6-4131-a4a7-1bd049cd3123`, 100 %. Configuracion congelada identica a la release anterior; sin migraciones, cambios de Access o ampliacion del piloto. Rollback: version `c6175cff-42ca-490d-8507-96c5fce23126` al 100 %, conservando D1.

Antes de promover se incluyo la candidata al 0 % junto a la anterior al 100 %, deployment `60b163c3-5f63-45e6-a485-400c8fe7446a`. Smoke general de 11 comprobaciones y smoke especifico de perfiles/pagina aprobados con override, y repetidos despues de promover. Reportes privados: `output/external-audit-20260930/{staged,public}-general-smoke.json` y `{staged,public}-evidence-smoke.json`.

**Correccion operativa**: el primer override tras `versions upload` devolvio la version anterior; el smoke especifico lo detecto. Segun Cloudflare, el override solo funciona para versiones incluidas en el despliegue activo. No atribuir una comprobacion previa a la candidata por la sola presencia de ese header. Los recibos anteriores mantienen sus comprobaciones posteriores de produccion; sus smokes previos sin despliegue al 0 % no demuestran la candidata. Fuente: https://developers.cloudflare.com/workers/versions-and-deployments/version-overrides/ . Esta correccion debe aplicarse en las siguientes releases.
