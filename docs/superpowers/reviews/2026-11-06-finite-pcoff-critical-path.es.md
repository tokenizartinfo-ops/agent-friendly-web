# AFW — recorrido pendiente hasta el ensayo con PC apagada

Fecha de auditoría: 2026-11-06,18:04UTC. Código inspeccionado: Source7aab233741b09f8873bf04831ca2fa9a9c2b1c4d, árbol6eb4241fb4451e7f74ba1b0fd9ad2a02a52cb0f3. Repositorio público tokenizartinfo-ops/agent-friendly-web; rama feat/finite-native-cleanup-20261101. Entorno SOURCE/SYN, origen GitHub connector; alcance de este bloque: lectura y documentación en rama docs/finite-pcoff-continuation-20261103. Sin mutación de runtime, código, permisos o datos.

## Resultado: no estamos esperando solamente un correo

El último defecto Important identificado por la revisión integral quedó corregido y aceptado mediante una única reevaluación: conservación de la cancelación física de cuerpos adquiridos, incluso si la validación rechaza antes de obtener reader o la respuesta llega tarde. Primarias causales RED→GREEN3positivos+6regresiones ylint; referencia reviews/2026-11-06-finite-native-response-body-retention.es.md en Rootdocs72515393bd18591c85bd6d84579e78261eae7de2. No convierte el circuito completo en producto operativo.

Hay trabajo de código y composición de AFW que puede avanzar sin ingreso de Gabriel ni respuesta de soporte. Las interrupciones históricas del proveedor son distintas de estas capacidades todavía ausentes o deliberadamente cerradas. Esta auditoría no consultó salud actual de Cloudflare ni demuestra que continúe alguno de sus incidentes.

## Hechos inspeccionados y consecuencias

| Punto | Evidencia exacta en Source7aab | Qué demuestra y qué falta |
| --- | --- | --- |
| Primera publicación connection | lib/mcp-qa-finite-owner-phase-context.mjs:481 y productor hasta receipt; implementación aceptada de primera conexión | El SOURCE tiene el productor nativo desde POST original. Sus pruebas SYN compusieron OAuth/lectura/GET-POST avisos/NoticeLink. No prueba alojamiento ni efectos reales actuales. |
| Restablecimiento actual | lib/mcp-qa-finite-initial-cleanup.mjs:36–42,49; blob34a93b63607cff1454f914e16062f17aa3c3e0bb | El alarm inicial rechaza obligaciones issuer y usa el lector de recuperación limitado a preparación inicial. Conserva ceiling original y C0/C1. No es restauración completa de la conexión/issuer/avisos ya producidos. |
| Límite de recuperación | lib/mcp-qa-finite-preparation-cleanup.mjs:20,27,30; blobe9999c6ea5d086599844f86120cb0e3449f5d636 | Rechaza head de trial, efectos posteriores, scoped rows extra y sufijos grant/notice/connection/notices:approval/finite:approval. Es cierre deliberado: no borrar esas condiciones para aparentar cobertura. |
| Lector general de fase | lib/mcp-qa-finite-owner-phase-context.mjs:454–475; blobe482ad1617adc001c3a32c94e71eeb41d27f3d1d | qualifySettledOwnerPair exige notice vacío y deriva como máximo read_consent. Los handlers propios ya soportan sus continuaciones lexicales, pero esa capacidad no convierte al lector general en productor de todas las fases posteriores. |
| Fuentes posteriores | lib/mcp-qa-finite-owner-source.mjs; blob6bc88c44eae3c0b63db514833c3f0eae43eb1c0e | Conserva fronteras unavailable para fuente y forwards de la vía general. No invalida el handler especializado aceptado de primera conexión; sí prohíbe usar el nombre de la función como prueba de integración completa. |
| Transporte posterior | lib/mcp-qa-finite-connection-source.mjs; blob703bada5189efc962e1f81760ff741de518b77b9 | readPrivateQaFiniteConnectionSource todavía lanza unavailable. Los seams de metadata/refs no otorgan autoridad por existir. |
| Full setup | lib/mcp-qa-finite-policy-setup-source.mjs:5–11; bloba2fcb074e71ca5f6d983c8cb8e9e7db993ef27fb | readPrivateQaFinitePolicyEntry y readPrivateQaFinitePolicySource aún fallan cerrados. owner-preparation:456–475 los consume. El setup existente no supera estas fuentes por sí solo. |
| Perfil prearm | lib/mcp-qa-finite-prearm-profile.mjs:9; blob504fa988c4e6f5db0e4d21c3da32cb69017bc2e8 | Verifica igualdad DATA de perfiles cerrados; no demuestra procedencia, crea aprobación ni instala policy. |

Los rótulos históricos T3/T5 en comentarios de esas fronteras no son la numeración de la tarea recién terminada. Una tarea aceptada no cierra automáticamente toda función que use el mismo rótulo en comentarios antiguos.

## Orden concreto de los bloques restantes

1. **Viabilidad de la validación y contrato de cierre del ciclo actual.** Mantener la corrección aceptada congelada. Definir el inventario completo de efectos de connection/OAuth/issuer/notice ya implementados, sus estados parciales, quién los puede retirar y qué primaria demuestra el resultado. En paralelo documental, resolver el costo de observación repetida descrito abajo. Cierre del bloque: spec y plan con operaciones existentes/identidades/fallos/rollback exactos, sin callbacks/DTO de autoridad ni prolongación de relojes; cada estado actual tiene una respuesta explícita, no un fallback silencioso al cleanup inicial.
2. **Productores posteriores y restauración correspondiente, SOURCE/SYN.** Implementar por unidad funcional: cadena Notices→tercer CLOSED, prearm y fuentes/ingreso de full setup, con retiro/restauración nativos completos antes de abrir sus respectivos estados reales. Reusar engine/store/journals aceptados; no inventar equivalencias entre clock del ciclo original y otros T0 de planes anteriores. Cierre: el camino nace de efectos propios reales dentro de la fixture, no ACK/receipt sembrado, y demuestra baja/restauración ante los estados soportados, conservación de actividad ajena y tratamiento explícito de efectos desconocidos.
3. **Candidato cloud íntegro y revisión de promoción.** Reconstruir desde revisión nueva los bundles M/QA y sus grafos/hashes, relacionar procedencia/custodia con versiones actuales y material recuperable de rollback, y ejecutar los controles de integración seleccionados por el cambio. Viejos hashes c493/D11 no representan una build posterior al fix. Completar prueba de disponibilidad del ejecutor nativo Codex Cloud, separada de Actions. Cierre: publicación exacta y consumidor realmente utilizables, con restauración autónoma verificable antes de preparar el reloj del ensayo.
4. **Ensayo propio cloud completo, primero con observación disponible.** Permiso nuevo del expediente sintético sólo cuando los prerrequisitos estén listos; verificar suscripción efectiva, aviso recibido, trabajo útil, ACK y retiro nativo, y resultado de restauración. Un botón conectado, catálogo, HTTP200 o aviso enviado aislado no cierran esta unidad. Cierre: toda la cadena documentada con evidencia primaria y cero obligaciones desconocidas que impidan el retiro seguro.
5. **Ensayo con PC apagada y luego Max.** Sólo tras el punto4, programar el ensayo finito que inicia/termina desde la nube sin Chrome, sesión local o confirmaciones de esta app. Verificar resultado y cierre desde evidencia posterior. El piloto Max requiere alcance/consentimiento propio después; ningún dato suyo se usa en los bloques anteriores.

Los bloques1–2 y parte de3 son desarrollo propio que puede avanzar autónomamente. Custodia vencida, login, un permiso delegado nuevo o un cambio de acceso rechazado por la herramienta pueden requerir intervención puntual, preparada justo antes de usarla. No pedir códigos mientras se diseña ni renovar por anticipación. Un fallo de proveedor actual probado puede posponer el ensayo, pero no sustituye estos cierres de AFW.

## Viabilidad: medición existente, no nuevo ensayo

Se inspeccionó el reporte completo docs/superpowers/reports/2026-11-06-finite-native-first-connection-publication-task3.md, blob3f273f15451de3364dc2b36da628802b1c53a7f1, líneas264–340. Las siguientes métricas pertenecen a D11/principal SYN y sus respectivos scopes; no se reejecutó ni se transfieren como medición del HEAD7aab:

- Snapshot antes de una negativa posterior:1754 requests en total=1736Cloudflare+16GitHub+2JWKS. El flujo agrupó requests humanos distintos durante≈67.6s, NO un único Root que haya excedido30s.
- Agregado de respuestas después de esa negativa:1768 observaciones=1750Cloudflare+16GitHub+2JWKS. Incluye14 lecturas adicionales de la negativa; no es el mismo denominador.
- Payload JSON agregado1,877,366,582B. Sólo los dos buckets de versiones/modules M(401respuestas) yQA(258respuestas) suman1,877,117,444B,≈99.987% de ese payload. No incluye headers/compression ni acredita costo facturado, CPU/RAM pico o latencia reales.
- Token verification532respuestas y deployment pointers269+263 son hechos actuales distintos de bytes de una versión. No eliminarlos por llamarlos redundantes.

Documentación primaria consultada6nov:

- [Límites API](https://developers.cloudflare.com/fundamentals/api/reference/limits/): referencia general1200requests/5min para user/accounttoken; el uso del usuario se acumula entre dashboard y credenciales. Ratelimit yRatelimit-Policy permiten observar cuota/restante/ventana. El plan Pro del dominio no constituye evidencia de una ampliación de esta cuota ni de cuota disponible actual.
- [Versions y deployments](https://developers.cloudflare.com/workers/versions-and-deployments/): distingue la versión de código/configuración del deployment que sirve tráfico; los datos de KV/D1/DO asociados no quedan versionados con el código.
- [Inmutabilidad de versiones](https://developers.cloudflare.com/workers/platform/infrastructure-as-code/): el API no actualiza una versión ya creada; una modificación produce otra. Esto no vuelve inmutables el pointer de deployment, permisos, exposición, almacenes, grants ni URLs externas.
- [Get Worker Version](https://developers.cloudflare.com/api/typescript/resources/workers/subresources/beta/subresources/workers/subresources/versions/methods/get/): include=modules es opcional e incorpora código, potencialmente variosMB; sin él no se solicita esa propiedad. Su ausencia no demuestra por sí sola igualdad con bytes previamente calificados.

Inferencia limitada:1736 llamadas podrían exceder una cuota1200 si comparten ese bucket y ventana. No se observó HTTP429, cuota propia, consumo de otros proyectos, headers de la cuenta ni topología de buckets. Dividir claves, esperar/reintentar a ciegas o ampliar relojes no soluciona una garantía de consumo que no se haya medido.

Una línea de diseño a estudiar es separar calificación de bytes inmutables de revalidación fresca de configuración/exposición/identidad/pointers. Es una hipótesis de reducción de payload, NO implementación ni prueba de ahorro de requests: omitir módulos por sí solo mantiene el número de llamadas. Cualquier reutilización tendría que pertenecer al Root original, preservar holders/abort/cancel y validar la misma versión/hash, sin caché pública/TTL/autorización transportable ni reutilización entre usuarios/requests. Tampoco autoriza borrar las pruebas actuales de drift: hay que resolver expresamente qué invariantes siguen requiriendo lectura fresca. No basta citar la inmutabilidad del código para cambiar el contrato de exposición.

Criterio antes de promoción: presupuesto de requests/bytes por operación y ciclo completo incluyendo rollback/retirada, cuota y consumidores compartidos actuales, RTT/colas bajo Root≤30s/child≤5s, denegación de entrada antes de fanout costoso, y manejo de rechazo después de efectos parciales. Se evaluará capacidad adicional sólo ante necesidad concreta, precio/límite y decisión del owner; no contratar ni cambiar plan aquí.

## Decisiones de este bloque

Ruling: priorizar cierre del ciclo actual y viabilidad antes de abrir otro ensayo, en lugar de usar un nuevo login como diagnóstico de capacidades todavía ausentes. Razón: el código demuestra que el cleanup inicial rechaza esos estados y que hay fuentes generales unavailable. Costo si es incorrecto: se retrasa una prueba que tal vez diera información útil; evita conceder permisos que vencerían antes de disponer de una restauración correspondiente.

Ruling: conservar la rama Source exacta7aab y las deudas Minor, sin invocar un merge/fullsuite como trámite del fix focal. Razón: la unidad aprobada era3+6+lint+una reevaluación; integración y nuevo bundle tienen gates propios y siguen pendientes. Costo si es incorrecto: una regresión no cubierta puede aparecer en la futura integración; no se afirma calidad universal ni readiness para compensarlo.

No se promete una fecha de finalización basada en cantidad de archivos, CIverde o respuesta de soporte. Cada bloque termina por su resultado comprobado. Esta lista es una secuencia de trabajo pendiente, no una declaración de que se completó o de que necesita al usuario para continuar.

operationalReadiness=false;completePackage=false;PCoff=false. No nueva ventana viva, permisos, OTP, rotación, despliegue, cron, Container, suscripción, Max ni correo. Sólo documentación cloud; cero dependencias/build/test/temporales locales.
