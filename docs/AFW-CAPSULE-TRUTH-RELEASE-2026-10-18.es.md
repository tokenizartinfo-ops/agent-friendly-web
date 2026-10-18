# Cápsulas: declaraciones y capacidades sin aprobación implícita

Publicación pública comprobada el18oct2026 a17:38UTC. Corrección independiente del incidente de Containers y de los permisos del piloto cloud.

## Problema y cambio

El generador recibía los datos del expediente, preparaba la cápsula con aprobación pendiente y, aun así, `llms.txt` decía «datos aprobados por el owner». Ahora identifica datos declarados y explica que la revisión y la decisión de publicación se registran por separado para esa versión. `llms-full.txt` aclara lo mismo: una declaración no es una observación verificada ni una aprobación.

La lista de recursos preparados de `llms-full.txt` usaba toda la selección del usuario. Incluía OpenAPI, MCP y skills aunque el generador no los implementaba. Ahora los recursos generados y las herramientas solicitadas sin implementación aparecen separados; la selección no acredita disponibilidad.

No cambian contratos, estados, decisiones, TTL, autorizaciones o archivos almacenados. GET/replay presenta los bytes históricos persistidos, sin regenerarlos. La corrección afecta cápsulas nuevas; revisar una versión previa no altera su manifiesto o aprobación. No se creó ni actualizó una cápsula real para esta publicación.

## Verificación

| Tramo | Evidencia |
| --- | --- |
| Fuente integral |314bb4696a8d91d880c17b2837d970577b511a67; PR475, merge73c331392fb58811d3595612e6cbb11fb15491f9 |
| CI integral |39149717521:2018PASS,0FAIL,1SKIP; lint y build aprobados |
| Fuente pública exacta |644f3df52072544ad06e51f35cfe03333b1795ff; PR476, mergeb9e32bca1b20516d26a49aa76ab9452cd7d4feda |
| CI pública |39149824572:1140PASS,0FAIL,0SKIP; lint y build aprobados |
| Pruebas locales | Dos fallos RED esperados/8PASS; después20PASS dirigidos; generación sintética de5archivos y3recursos no implementados, hashes comprobados |
| Revisión independiente |0Critical,0Important,0Minor; incluyó entradas de POST y conservación de GET/replay históricos |

Las verificaciones generales locales se interrumpieron por lentitud: no se presentan como aprobadas ni como fallo del producto. La aceptación completa procede del CI Linux. El revisor no acreditó CI ni publicación remota; ambas fueron comprobadas por el responsable del bloque.

## Publicación y recuperación

PROJECT=AFW; REPOSITORY=tokenizartinfo-ops/agent-friendly-web; ENVIRONMENT=public_web; ORIGIN=https://agentfriendlyweb.dev; RESOURCE_TYPE=Worker; RESOURCE_ID=agent-friendly-web-web-production; ALLOWED_ACTION=publicar únicamente la corrección revisada del generador; ROLLBACK=5f4bb378-6438-4d04-ac95-28c0f631574c. Cuenta85d0d5dadac3341a564f22ce885e9eec. No se desplegó todo main.

Versión activa97fa67af-c446-436e-8ab5-6978217b930d al100%, deployment429e550a-3179-4bee-b895-94915593df2a. API17:38:14UTC confirma configuración efectiva, bindings y runtime conservados; D1, pin propio y controles de acceso sin cambios. Sin esquema, datos, Registry, rollout de clientes, claves o eventos privados modificados.

Rollback5f4bb378 verificado17:35:15UTC con16páginas,2assets exactos y smoke público/Access. Candidata primero al0% en deployment2031047f; override17:37:19UTC aceptado y tráfico normal17:37:44UTC aceptado:16páginas con el nuevo entrypoint,3assets con hash exacto y smoke público/Access. Los298archivos congelados conservaron sus hashes después de la subida.

El chunk del expediente y el CSS permanecen iguales. El entrypoint de la build pasó a `index-Bup_If7V.js`, comprobado tanto en el HTML como por hash. El paquete congelado contiene el generador corregido. La comprobación pública no equivale a crear una cápsula autenticada; los resultados del generador se comprobaron con datos sintéticos y CI. No se atribuye nueva aceptación al recorrido completo, retirada nativa, puntaje externo, guardia o PC-off.

## Muestra y aprendizaje

La [muestra ficticia de entrega](examples/delivery-sample-20261018/README.es.md) contiene entrada reproducible y paquete local generado con fuente314bb469. Ambos actores siguen pendientes; no hay dominio verificado, instalación, comparación, destinatario ni consentimiento reales. Su propósito es hacer tangible la propuesta comercial y sus responsabilidades, sin crear otra demo remota.

La [ficha manual de aprendizaje](AFW-PILOT-LEARNING-RECORD-2026-10-18.es.md) separa trabajo por rol, espera, retrabajo, alcance y aceptación. No activa tracking o CRM, no registra observaciones de Max, no fija precios y no declara ahorro o demanda.

Evidencia privada/ignorada: `output/afw-capsule-truth-*20261018*`, build congelada, reportes rollback/override/normal y logsCI. Preservar configuración privada y `error.log` ajeno. No repetir upload, promoción ni pruebas aceptadas para actualizar documentación. La espera de soporte y los gates de alta, aviso útil, revisión, retirada, PC-off e invitación de Max siguen separados en el roadmap.
