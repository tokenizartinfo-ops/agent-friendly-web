# AFW — preparación del ensayo con PC apagada
Actualizado: 2026-11-18 12:54:59 UTC. Proyecto AFW; repositorio tokenizartinfo-ops/agent-friendly-web. Estado documental con evidencia fechada, sin lectura actual del runtime ni del proveedor.

## Qué está probado
El diagnóstico real de fuente run44208626844/job134480971206 quedó conservado y cerrado; revisión7dc02ce610fc0f9158cb911c16b81e996e54dec1. Los primeros14 casos pasaron. El GET del caso15 devolvió503 en vez de200 tras30008ms; la captura identifica el ganador como DEADLINE_OR_ABORT y confirma el count posterior. Aún no distingue temporizador/señal ni el punto de espera en QA. Los casos16 y17 fallaron;18 quedó abierto al límite del hijo;19–20 no fueron observados. Esto no califica Task1 completo ni demuestra un fallo de Cloudflare.

El diseño del diagnóstico acotado y sus134 casos independientes quedaron aprobados (diseño4bc09a1df89e4fe5eef57d95e238a2718d01e62e; datos41376717eae5ec5d9d2850bb323f23c4cd43bd40). En GitHub, run44304106803/job134801079258 verificó el RED mínimo: el observador original conserva503/g1 y carece del campo nuevo, con la aserción esperada. Custodia/cierre del proceso modelado y de la rama pasaron; revisióne1d37b68e3524607b200913f5514b252fe5118ca. Fue un modelo aislado, sin actores, operaciones de consentimiento ni llamadas productivas.

## Bloque actual y criterio de cierre
B1 prepara el núcleo privado de observación y códecs, junto con30 pruebas M,35 QA,57 de admisión y12 de filas. Su cierre requiere propuesta completa, revisión independiente y una ejecución cloud nueva de esos134 modelos con resultado correcto y cierre verificado. El código y las pruebas de B1 aún no están calificados. No hace falta intervención manual para esta preparación.

B2 conectará el núcleo ya validado al fixture original y al hook posterior al count, manteniendo D07, recorder, formatos públicos y relojes. Requiere sus propios controles nativos y de cierre antes de una observación del caso afectado. El modelo RED no acredita esa conexión. Source5/OWN5/StageB permanecen5/5: estas tareas diagnósticas no reinician sus contadores ni liberan un sexto arreglo de negocio.

## Cierres restantes, en orden
1. Validar B1, integrar y validar B2; obtener una observación que localice el bloqueo. Elegir y revisar una corrección fundada, sin ampliar relojes.
2. Calificar Source/Task1 completo con controles positivos, negativos, mutantes y regresiones del protocolo congelado (plana4cebfbb3c91ec706429253c9809a0096774108b, todavía retenido).
3. Completar las tareas dependientes de material instalado/invocaciones/guardia y la composición aviso → adopción → trabajo/ACK → retirada/alarmas/restauración (plan3434f31d432084d1b6153f85d3b8c64c8e043850). Los lectores o catálogos aislados no sustituyen esos cierres.
4. Preparar candidata cerrada y rollback recuperable; revisar fuente, bundles, bindings, permisos/vencimientos y el plan completo. Verificar proveedor y runtime con evidencia nueva cuando corresponda; no inferir vigencia desde resultados históricos.
5. Coordinar una única ocurrencia real: arranque atendido/READY/ARM → PC apagada → ejecución cloud y recepción útil/ACK → retirada/restauración verificadas. Regla3d7dc69c4ccc4ec8c7e3268318a1a10fc79bb238: no consumir Entry en un ensayo completo PC-encendida aparte.
6. Preparar el caso de Max solo después de ese cierre, con su alcance y consentimiento propios.

El bloqueo actual es un comportamiento aún no localizado del laboratorio de fuente; no estamos únicamente esperando un correo para poder desarrollar. No hay una fecha fiable para el ensayo final antes de aislarlo y validar la corrección. Las pruebas finitas en GitHub no acreditan guardia permanente ni autonomía integral con el PC apagado.
SourceQualified=false; Task1Pass=false; operationalReadiness=false; completePackage=false; PCoff=false.
