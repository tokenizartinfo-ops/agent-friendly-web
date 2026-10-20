# AFW: candidata pública mínima de marca y guía
20 de octubre de 2026. Preparación de fuente; no declara publicación.

## Resultado previsto y alcance
Trasladar solo el texto revisado de PR 523 y PR 525 a la línea pública aceptada. La portada explica que menos clics humanos no vuelven irrelevante una web propia; distingue información declarada, verificable y comprobada, sin prometer elección por una LLM. La guía explica un siguiente paso en palabras sencillas. Se conservan diseño, tipografías, imágenes, rutas, callbacks, estados, permisos, datos y límites del servicio.

Son cuatro archivos públicos, idénticos a los blobs ya revisados en la fuente integral `2f2b4a7267ebdb9f073dfda260fbee128505e660`:
- `lib/home-copy.mjs`: `8c81f66a9362c67a14acec650285c94d98995298`.
- `lib/home-markdown.mjs`: `ea67b0d6055e647a6ad99d721a67d8dc79ac736e`.
- `lib/public-guide.mjs`: `86d4fe62a30623115c44deac3cb14a7764bf82c4`.
- `lib/public-tools-copy.mjs`: `365e5037125331a4616ed5d1519ca5d347b0da5a`.

Antes de copiarlos se comprobó que cada archivo público anterior era idéntico al original previo de su cambio integral: home desde109bc57c; guía desde8da1db99. No se arrastran cambios privados de main.

## Identidad y recuperación
PROJECT AFW; REPOSITORY tokenizartinfo-ops/agent-friendly-web; ENVIRONMENT preparación de candidata pública en GitHub/Actions; ORIGIN https://agentfriendlyweb.dev; RESOURCE_TYPE rama/commit/artefacto; RESOURCE_ID release/web-production-20261017 y rama portadora; ALLOWED_ACTION cambios de fuente, PR, revisión, CI y artefacto. ROLLBACK de fuente `6734f7f844cfc0f3058442b0a8bd42ec81566728` / árbol6575102e. No hay datos o esquema que retroceder.

GET primario de Cloudflare20oct18:42:58UTC comprobó Worker agent-friendly-web-web-production, deployment88e25a5c-6b06-4074-80fd-59355a03de0d y versiónd19c3d49-205b-46d0-ae8c-7c9e6e52bbea al100%. Esta lectura es fechada y no sustituye la comprobación inmediatamente anterior a una publicación. La versión previa y su configuración efectiva requieren preservación y recuperación comprobada antes de cualquier mutación.

## CI y conservación cloud
La CI existente mantiene Ubuntu24.04, Node22, lockfile, npm test/lint/build y permisos contents:read. Se suma exclusivamente el push a la rama pública ya existente, además de main, para ejecutar una comprobación fresca y conservar dist con archivos ocultos y vencimiento de siete días. Se fija un máximo de15min por trabajo. No se añaden secretos, permisos write, pull_request_target, despliegue, modelo, acceso Cloudflare, schema ni operaciones externas.

La PR debe pasar su suite pública completa y una revisión independiente del conjunto. Después del merge público, comprobar árbol/padres y CI de push nueva, artefacto, revisión asociada y vencimiento. Los recibos exactos van en la PR portadora y en [el registro operativo](https://github.com/tokenizartinfo-ops/agent-friendly-web/issues/497), sin modificar recibos históricos ni afirmar resultados antes de observarlos.

## Límites de aceptación
El artefacto y la CI no acreditan la publicación ni la aceptación visual de la candidata. Antes de promover: preservar recursos efectivos y reversión recuperable, comprobar procedencia y hashes de todos los archivos, validar páginas/assets y Access sin login nuevo, revisar la candidata con sus fuentes en ES/EN/PT y luego comprobar tráfico normal. No copiar valores del wrangler genérico sobre la configuración efectiva. No desplegar todo main ni alterar el canary delegado, A2A, operador, credenciales, D1, Access, flags o rollout por esta preparación.

G2 sigue cerrado: no repetir OTP, OAuth o catálogo. Containers02382110, cliente cloud con alta/aviso/revisión útil/baja, PC-off y Max conservan gates independientes. operationalReadiness=false. No se envía correo a Max ni se ejecuta diagnóstico remoto para validar texto. Referencia visual pública anterior: [ocho capturas fechadas](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/2f2b4a7267ebdb9f073dfda260fbee128505e660/docs/AFW-PUBLIC-ENTRY-UX-2026-10-20.es.md); no son capturas de esta candidata.
