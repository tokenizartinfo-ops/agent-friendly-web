# AFW: nueva custodia y conexión cloud al servicio cerrado

## Alcance autorizado y restauración

PROJECT AFW; REPOSITORY tokenizartinfo-ops/agent-friendly-web; ENVIRONMENT custodia operacional y prueba de conexión cerrada; ORIGIN https://operations-manager.agentfriendlyweb.dev; RESOURCE_TYPE Access service token/policy/Codex Cloud; RESOURCE_ID token nuevo `8ecc45fc-8a8e-4017-bca4-a85c020b9592`, aplicación propia `5b7e6f71-6c9b-4804-ae2f-552bb5565ac0`, política propia `73bf6a0f-25b8-4c9c-805f-67f01788cf11`. ALLOWED_ACTION crear disabled24h, carga privada por owner, publicación de configuración, permiso temporal al token nuevo y GET de conexión al servicio cerrado. ROLLBACK deshabilitar nueva identidad, restaurar política al token anterior vencido, mantener Worker cerrado e historial intacto. No habilitar guardia permanente ni acceso a expedientes.

## Custodia y publicación observadas

Creado `AFW Cloud Operations Custody Pilot 20261005`, disabled, vigencia24h hasta `2026-10-06T20:31:10Z` (6 de octubre,17:31Argentina). La respuesta inicial se saneó sin almacenar el secreto. El owner hizo la rotación: API confirmó versión2, misma expiración y estado disabled. Luego cargó ID y secreto en los campos privados existentes del entorno AFW Operations y guardó/publicó. UI confirmó **Entorno publicado**. Nunca se inspeccionaron ni copiaron valores, clipboard, JWT o cookies.

El panel de configuración confirma repositorio exclusivo `tokenizartinfo-ops/agent-friendly-web`, privacidad Solo yo y ambos network secrets operacionales restringidos a `operations-manager.agentfriendlyweb.dev`. La lista de entornos decía Repositorio desconocido; el panel sí identifica el repositorio correcto. No usar esa etiqueta de lista como diagnóstico de pérdida del repositorio. Los secretos de correo no se editaron.

Chat de edición `01a10dcd-bc67-7641-a280-dab272cd4027`, host durable. Su inspección read-only confirmó Node24.19.0 con `--use-env-proxy`, checkout `/workspace/agent-friendly-web` y HEAD histórico `d405902aa669e263b260b150ff785380ce30c104`. Configuración de origen revisión8, versión `38a3072b-f1e2-410e-9272-3c7e7eb434cb~cecfgver_6ac40d5f413081a3b3ca29b2d7f0e098`. La herramienta informa contexto de esta instancia; no demuestra que una nueva tarea restaure el último código de main. Publicación de custodia y actualización de código son aceptaciones distintas.

## Conexión y retirada comprobadas

Inventario API de las24 aplicaciones, página única/total24, y sus políticas: cero reglas `any_valid_service_token`, cero referencias previas a la identidad nueva y cero lecturas fallidas. Se sustituyó temporalmente el único selector de la política propia por la nueva identidad, sin modificar recursos Tokenizart. Se habilitó la identidad sin ampliar vencimiento y se invalidó el secreto anterior de versión1 (`previous_client_secret_expires_at=2026-10-05T20:00:00Z`). El Worker permaneció cerrado.

Turno cloud `01a10dd9-dff6-7267-b874-44e46487b5a7`: un proceso Node fuera de Git, dos GET sin reintentos ni redirecciones. Headers usados únicamente para el hostname autorizado; ninguna credencial o header registrado. Comando y stdout revisados independientemente mediante read_thread.

| Observación | Resultado |
| --- | --- |
| GET autenticado,20:56:01.588–20:56:02.320UTC | HTTP404, application/json, `code=unavailable`, exit0 |
| GET anónimo al mismo origen | HTTP401, text/html |
| API posterior | Nueva identidad disabled, política original restaurada, vencimiento sin cambios |
| Mismo contexto y campos tras retirada,20:57:31.093–20:57:31.705UTC | HTTP401, text/html, exit0; turno `01a10ddb-5416-7592-ba6a-cef7321a12c6` |

La diferencia404JSON/401 demuestra sustitución efectiva del proxy y llegada autenticada al servicio cerrado, además de denegación después de retirar identidad y selector. No demuestra autorización del cliente dentro de un Worker abierto: su binding de client ID todavía corresponde a la identidad anterior. Tampoco acredita lectura de datos, reserva/ACK, actualización de snapshot de código, disparador nuevo o guardia permanente.

API final confirmó manager `a27a3088-fa6a-454f-9712-64312e518861` al100%, cinco flagsfalse, deadline ausente y binding D1operacional original `603c471d-19bb-4530-9773-c02e18b29840`. No se publicó un Worker ni se ejecutó SQL en este bloque.

## Próximo bloque

Para un ensayo funcional nuevo, congelar fuente actual y revisar snapshot cloud; configurar exclusivamente QA sintética con el client ID nuevo en custodia servidor, audiencia existente y deadline acotado. No instalar o mutar journal operacional por esta prueba. Preservar fences de revisiones terminales y presupuesto. Preparar restauración cerrada y correlación independiente antes de habilitar servicios. La prueba CSRF POST humana remota sigue pendiente bajo un mecanismo de navegador soportado; sus pruebas locales y retiradas aceptadas constan en los recibos de revisión. La credencial24h no representa un ciclo de vida permanente: cerrar antes de vencer y no renovarla automáticamente.
