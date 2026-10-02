# Diagnóstico cloud y comprobación externa

Estado 2 de octubre: diagnóstico de AFW Operations ejecutado desde su setup existente, GPT-6.1 Sol Bajo observado en UI. Repositorio exclusivo AFW; no cambios a producción, correo o expedientes. El seguimiento web de correo y este setup son runtimes diferentes.

## Evidencia del entorno

La configuración declara repositorio github-1347578006, ref main y mount_path vacío. Git real está en `/workspace/agent-friendly-web`; `/workspace` no es una raíz Git válida. Install script y start skill usan el subdirectorio. El checkout observado, limpio, era rama work y HEAD `7f1b2b5575e19e653c7ee52150c0e5309bba90d5`; instrucciones históricas describían otra revisión y detached HEAD. Es una inconsistencia, no prueba concluyente de la causa del error del resolver.

Corrección parcial comprobada: start_skill actualizado para verificar origin y HEAD actuales, sin fijar rama, revisión o número histórico de tests. Setup 649 pruebas, lint sin errores con una advertencia, build y smoke 11/11 pasaron **en ese checkout antiguo**, no en main actual. Install script, red, repositorios y ausencia de secretos conservados. No se publicó esta corrección. Informe y rollback quedaron en el entorno, fuera de Git público.

La herramienta exige un SHA al guardar repositories y no conservó ref main en su propuesta. El cambio mount_path no se aplicó por la restricción acotada del primer pedido. Siguiente acción preparada: montar agent-friendly-web y usar `fd3219b3dd49a60c6ee161e1693a8158501b9d41`, verificado con git ls-remote como HEAD de main. Guardar rollback, refrescar mediante mecanismo admitido sin reset destructivo, verificar source_revision y controles del candidato antes de publicar y crear una tarea nueva.

La conexión Chrome falló al intentar transmitir esa ampliación. Lectura del setup todavía mostró solo la corrección parcial finalizada; no confirma recepción del nuevo pedido. Se solicitó reconectar la pestaña existente, sin nueva cuenta o login. No repetir a ciegas una operación ni declarar mount_path corregido.

El panel del entorno ofrece secretos de red y variables; esto no acredita custodia activa ni conector del consumidor. No crear claves hasta comprobar sustitución mediada, destino autorizado y runtime nuevo funcionando. La tarea de código, disparador, envío cloud y prueba con PC apagada siguen pendientes.

## Auditor externo

Cloudflare isitagentready.com, MCP scan_site, perfil all sin enabledChecks override, sobre https://agentfriendlyweb.dev: Level 4/5 Agent-Integrated, 11 PASS y 5 FAIL. Persisten dnsAid/DNSSEC, oauthDiscovery, oauthProtectedResource, authMd y a2aAgentCard. No puntaje numérico recibido; no afirmar avance del 73/100 declarado por el owner. La API de zona AFW sigue dnssec pending. No se cambió DNS ni se añadieron servicios ficticios para elevar puntuación.

Respuesta íntegra local ignorada: `work/external-audit-20261002-all.json`; SHA256 `cf86b2aa5d5c5c737659eb6df86fc03cf0a3cec53f1c921301c051995f3cb901`. El catálogo del auditor ofrece 22 checks, pero este resultado evaluó 16; no equiparar catálogo y resultado. El baseline público anterior se conserva con su fecha y procedencia.

Fuente oficial consultada: [entornos cloud](https://learn.chatgpt.com/docs/environments/cloud-environments). Publicar captura configuración preparada para tareas nuevas; editar un borrador y ejecutar setup no prueba que una tarea nueva funcione.
