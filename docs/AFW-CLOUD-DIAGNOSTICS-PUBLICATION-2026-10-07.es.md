# AFW: publicación del diagnóstico cloud, PR322

## Alcance y autorización

7oct2026, 23:18–23:24Z. Proyecto AFW, repositorio `tokenizartinfo-ops/agent-friendly-web`, entorno AFW Operations. El owner autorizó crear el nuevo borrador tras el rechazo `draft_not_editable` del editor anterior y continuar la actualización. No habilita clientes, lectura privada, guardia ni publicación de cambios en sus sitios.

## Preparación y publicación

Desde Chrome habitual, Configuración → Codex Cloud → AFW Operations → Editar. Nuevo editor `01a118a9-2388-725c-bcab-a80004a7e017`, hostdurable; draft `cecfgdraft_99c887e4c73881a397997407ba845746`, revisión1→2.

Cambio único: `repositories[0].ref`, de `08f47d9ab18a5054fffea6b404062a7445e8230c` a `4d424cf2c1b117bf42069532f9ce19747e649078`, mergePR322. Preparación real con origin verificado, árbol limpio y recuperación `afw-source-recovery-08f47d9a`. Cinco pruebas de diagnóstico aprobadas; primera ejecución en sandbox falló y repetición con permiso de ejecución pasó. No se presenta preparación como adopción ordinaria.

Comparación del borrador antes/después: conservación de todos los campos nofuente true, incluidos diez requisitos de custodia, destinos, red, scripts y permisos. UI confirmó el mismo repositorio; Guardar borrador y Publicar. UI terminó en «Entorno publicado» / «Publicado».

Relectura soportada: configuración `cecfg_6abe6b6814a481a3aa2299efe46e2fe6`, nueva versión vinculada `cecfgver_6ac6d4019d8c81a3a2bc32cf5d3b1343`, revisión declarada/observada8/8 y observaciones actuales. Ref del draft4d424cf y conservación nofuente true. El estado del entorno era starting. La API no expone el ref de la versión publicada y el draft conserva su base anterior; el recibo debe conservar esos límites.

Rollback: publicación previa `cecfgver_6ac675187ee881a3b1845c7ad289e4b7` y fuente08f47d9 conservadas. No rotación ni nuevas claves, cambios de red, HTTP privado o datos de clientes.

## Adopción pendiente

La tarea ordinaria `01a1176d-9b3f-7369-82ad-c53d13275039` sigue en HEAD08f47d9, origin correcto y árbol limpio. Su consulta procesada no aportó publicación/ref actuales. No acredita adopción de4d424cf; tampoco demuestra por sí sola que sea necesaria otra tarea. No se hizo checkout para simularla.

Relectura posterior mediante `structuredContent` confirmó en la tarea ordinaria publicación previa6ac67518, red enforced y diez refs ready. Su catálogo ofrece solo `environment_status` de lectura, sin mecanismo de adopción anunciado. El editor nuevo está running/conectado,9/9 actuales y HEAD4d424cf limpio/detached, pero red y diez referencias tienen estado literalunknown. Se comprobó tanto structuredContent como la representación JSON del contenido: no fue una sustitución de campos ausentes. No se ejecutó HTTP desde ese editor.

Se inició por el compositor Codex/Nube una verificación propia de la publicación nueva, AFW Operations y GPT6.1SolBajo visibles. Alcance: procedencia/estado fresco y cinco pruebas de diagnóstico; sin HTTP privado ni cambios remotos. No confundir inicio del chat con ejecución completada.

Tarea `01a118b0-ff72-70d4-937f-b87bc251c03b`, hostdurable: adopción real confirmada, publicación6ac6d401/config6abe6b68 y HEAD4d424cf exactos, raíz `/workspace/agent-friendly-web`, origin esperado y árbol limpio antes/después, sin fetch/checkout. Cinco pruebas pass,0fail,0skip,exit0 usando modalidad por orden documentada `with_additional_permissions.network.enabled=true`. La ejecución predeterminada falló y diagnóstico directo dio4/5 con stderr vacío del subproceso CLI; no se atribuye causa interna ni se alteraron asserts. Proxy/CA/TLS y políticas conservados.

Estado final reportado2/2, observaciones actuales y running; red restringida/stateunknown y10/10custodiasunknown. Se acredita adopción y pruebas sintéticas, no red enforced, custodia ready ni autenticación. Se mantiene cerrado el baselineHTTP hasta resolver/readiness observada. No pedir nuevas claves a partir deunknown.

## Estado fresco y contraste de modalidad

Consulta posterior en la tarea nueva:4/4, observaciones actuales, running/running, connected, failure null; red enforced y diez estadosready presentes. El unknown inicial queda superado por esta lectura fechada, sin causa atribuida al cambio2→4 ni a claves. No existen campos setup/executor o reason/code que expliquen el tránsito. `wait_for_environment` aplica a starting y no fue necesario.

Baseline propio separado con aplicación cerrada, token existentev2 renovado10min y selector exclusivo:

- 23:30:18Z, ordenCLI integrada con `use_default`: exit1, diagnóstico `stage=transport`, sin status/format. No acredita401 ni llegada a Access. Cierre23:31:00.044Z, tokenoff y política restaurada.
- Presencia local de proxy y CA verificada solo como booleans, sin valores. La modalidad era distinta de las cinco pruebas que pasaron con permiso por orden. Esto justificó un contraste explícito, sin retry automático ni cambio de allowlist.
- 23:31:58Z, misma orden y fuente con `with_additional_permissions.network.enabled=true`: exit1, `stage=response/status401/formatjson`. El contraste llegó a recibir headers, pero no resolvió autenticación. No se leyeron cuerpos de error ni se mostraron valores de headers, secretos o excepciones arbitrarias. No demuestra una clave incorrecta.

Cierre final por API a las23:32:31.309Z: token disabled/versión2, política original restaurada, managerconsumer/assistance/dossierfalse/plazo vacío, D1original603c471d verificada enid/database_id, cronproductor vacío. No se modificaron Workers, gates, D1, datos privados o claves durante estos baselines.

Adopción y cliente diagnóstico quedan comprobados; autenticación remota sigue pendiente. Próximo ensayo remoto debe usar la modalidad soportada por orden con sidecar restringido y lectura fresca, sin convertir ese permiso de ejecución en ampliación de destinos o acceso a clientes. No repetir baselines idénticos ni pedir claves por inferencia; la próxima comprobación necesita una hipótesis discriminante sobre suministro/Access. Revisión10 y prueba integradaPC-off todavía no aceptadas.

El contrato de `worker/operations-manager/index.mjs` devuelve404/unavailable antes de la validación de identidad cuando la ventana/consumidor están cerrados. El baseline no depende de filas del expediente ni del clientId secreto del Worker. Una respuesta401 no acredita haber atravesado ese cierre; no abrir gates para intentar resolver autenticación.

Productor QA revalidado por API a las23:22:43.120Z: flags de supervisión y feedback false, cron vacío, D1 propia f100f2fd en ambos campos y versión1540af42 al100%. Sin mutación del productor. Publicación cloud no abre el circuito privado ni resuelve401.

Siguiente criterio: instancia publicada running, red enforced y custodia observada; después diagnóstico finito de acceso con servicio cerrado. Exigir autenticación comprobada, entrega de revisión10, retorno vigente y cierre antes del ensayo integrado con PC apagada y la invitación de Max.
