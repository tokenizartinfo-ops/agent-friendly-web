# Transferencia cloud de la plantilla pública de publicación
Proyecto AFW; basefcab0c57. Owner autoriza continuar en cloud y delega decisiones de implementación.
## Resultado
Evitar que el paquete de PR623 vuelva a necesitar un ZIP en el PC. Preservar SOLO los cuatro outputs públicos verificados como Git blobs en una rama artefacto inmutable del MISMO repositorio público.
## Elección
Root elige Git Data desde un job main confiable, siguiendo la preservación pública ya aceptada del templatee8af. Una descarga al ordenador contradice la preferencia cloud; exportar el plan privado al repo es inadmisible. No se crean destinos, credenciales persistentes o servicios nuevos.
## Contrato
createMcpPublicPublicationSnapshot({files,expectedSourceRevision,expectedSourceTree,expectedMaterializerHash}) toma exactamente template.mjs,materializer.mjs,template.json,build.json como strings. Captura por valor antes del await; rechaza otros archivos, keys, tamaños o procedencia. Compara el código materializador con su hash independiente de la fuente aceptada. Reutiliza materializeMcpPrivatePublication solo con policy0→1 ficticia para validar el slot y las cercas; no ejecuta el resultado.
Verifica campos y hashes del manifest/receipt, todos los flags de no-autoridad false, revisión/árbol contra Git metadata independiente, caps ya aceptados (template2097152bytes,manifest/build16KiB,materializer65536bytes). No se preservan policy.json, index materializado, artefactos privados o valores de secretos.
Produce chunks template48KiB raw en base64, materializer.b64,template.json,build.json,README.md,preservation.json; cada entrada fija mode100644/typeblob y SHA1 Git calculado. La rama fija es artifacts/afw-publication-template-SOURCE40HEX; snapshot orphan, sin copiar historia ni tocar main.
## Workflow
El build sigue contentsread. Un job separado contentswrite/actionsread se habilita SOLO workflow_dispatchmain del repoAFW después del compile, descarga el artefacto de ESE run con nombre de la revisión exacta y checkout acceptedmain sin persist-credentials. No usa ni ejecuta código del artefacto. Source tree procede de Git API; materializer hash procede del checkout.
Crea árbol, verifica SHA1/paths, comprueba si el ref existe: si existe y su commit tiene el árbol exacto, registra reconciliado; si difiere, falla sin overwrite. Si no existe, crea commit orphan y ref una vez. Sin updateRef/force/delete, reintentos automáticos o runtimeAPI.
## Cierre y límites
RED→GREEN en Actions, CI/lint/build, revisión final única, mainCI y un dispatch concreto para aceptar el snapshot real. Preservar fuente pública NO despliega AFW ni acredita nuevo grant/subscription/retirada/PCoff. Artefactos ya privados nunca entran en este canal. Reversión de source por PR; snapshot inmutable sin borrar historia.
