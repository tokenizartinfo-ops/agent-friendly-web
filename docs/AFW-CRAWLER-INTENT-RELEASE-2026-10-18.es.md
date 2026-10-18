# Cápsulas: conservar los límites de rastreo declarados

Publicación pública comprobada el18oct2026 a21:27UTC. Corrige la propuesta generada; no configura reglas reales de sitios ni reactiva el piloto cloud.

## Causa y resultado

Los selectores ES/EN/PT ofrecen búsqueda `allow`, `limited` o `deny`, y entrenamiento `allow`, `reserve` o `case_by_case`. El generador trataba toda búsqueda distinta de `deny` como `Allow: /`, incluso `limited` o un campo vacío. También convertía el entrenamiento no autorizado expresamente como `allow` en `Disallow: /`, sin distinguir una reserva de una evaluación por caso o de un dato desconocido.

Ahora solo las decisiones explícitas compatibles generan grupos: búsqueda `allow`/`deny` y entrenamiento `allow`/`reserve`. Las opciones limitadas, por caso, vacías o desconocidas producen comentarios para revisión manual, sin inferir una regla general. La política explícita de un propósito sigue generándose aunque la otra esté pendiente. Si ambas están pendientes, el fragmento solo contiene comentarios.

La operación sigue como `manual_merge`; comparar un archivo ausente o distinto no convierte el plan en ejecución. Las cápsulas almacenadas se presentan sin regenerarlas. Contratos, decisiones, permisos y TTL no cambian. La combinación explícita búsqueda permitida/entrenamiento reservado conserva los bytes del ejemplo anterior: SHA256 `6127d970d80dcc6a6eca9c8e93076eb6270ad3a8943143877b6d0fe67d1b5e52`.

## Verificación y procedencia

| Tramo | Resultado |
| --- | --- |
| Fuente integral |f7d637a0013ea1b40e168c58b76dc4128c00fd09, PR478, merge0dd64cad601ac2629cb5da6eef3c3973acc7fb9d |
| CI integral |39167402053/job117793108243:2021PASS,0FAIL,1SKIP; lint/build aprobados |
| Fuente pública exacta |668e08af98dc5d71fb6a9b5620272e766492ab23, PR479, merge9257ca5bc35b90a615c44144e3b219fb0f5b3658 |
| CI pública |39167486274/job117793365544:1143PASS,0FAIL,0SKIP; lint/build aprobados |
| Local |RED3fallos esperados/10PASS; luego23PASS dirigidos; muestra anterior reproducida y hashes conservados |
| Revisión independiente |0Critical,0Important,0Minor; comprobó enums reales, decisiones independientes, presentación histórica y frontera de planes manuales;13pruebas de builder aprobadas |

El revisor no acreditó el RED histórico, el CI remoto, la publicación o cumplimiento efectivo por rastreadores. El responsable comprobó RED/CI/publicación; el cumplimiento efectivo no se probó. El fragmento no demuestra seguridad de acceso, indexación o mejora de puntaje.

## Publicación y recuperación

PROJECT=AFW; REPOSITORY=tokenizartinfo-ops/agent-friendly-web; ENVIRONMENT=public_web; ORIGIN=https://agentfriendlyweb.dev; RESOURCE_TYPE=Worker; RESOURCE_ID=agent-friendly-web-web-production; ALLOWED_ACTION=publicar únicamente la corrección revisada del generador; ROLLBACK=97fa67af-c446-436e-8ab5-6978217b930d. Cuenta85d0d5dadac3341a564f22ce885e9eec. No se desplegó todo main.

Versión activaeaf0c739-0114-4b18-bb5d-b77dde928e35 al100%, deploymentb1ef0506-7a92-484a-8a10-c5b32ab3ff4a. API21:27:55UTC confirma bindings, runtime y configuración efectiva conservados. D1, pin propio, Access, flags, Registry, claves y eventos privados sin cambios. Ninguna cápsula autenticada creada o modificada por este bloque.

Rollback97fa67af verificado21:25:34UTC:16páginas,3assets exactos y smoke público/Access. La candidata se probó al0% en deploymentc7bd3d74; override21:26:38UTC aprobó16páginas con su entrypoint y3assets. Tras promover21:26:54UTC, la primera lectura normal21:26:57UTC todavía mostró el entrypoint anterior y no pasó: se conservó como `normal-first`, sin darla por aceptada. API21:27:11UTC confirmó el deployment y la segunda lectura21:27:16UTC aprobó16páginas/3assets/Access, dentro del presupuesto de convergencia de30segundos. Los298hashes congelados se comprobaron después. No hizo falta rollback o cambio de configuración.

La build incluye las notas de políticas pendientes. La evidencia pública comprueba integridad y continuidad del despliegue; el comportamiento del generador se valida con fuente revisada y pruebas sintéticas/CI. No equivale a un nuevo recorrido privado ni a una prueba de políticas instaladas en un cliente.

## Acompañamiento y continuidad

La [muestra de entrega](examples/delivery-sample-20261018/README.es.md) conserva el paquete original y agrega un ejemplo independiente de políticas pendientes, identificado como ficticio. Ofrece una explicación breve y una pauta de acompañamiento; no es una conversación del copilot aceptada en producción ni consentimiento de un cliente.

Evidencia ignorada en `output/afw-crawler-intent-*20261018*`; configuración privada fuera de Git. Preservar `error.log` ajeno. No repetir upload, promoción, permisos o QA aceptada para documentar.

Consulta manual única de los dos casos de soporte en esta continuación: mismos cuatro mensajes conocidos, sin respuesta técnica nueva. La automatización permanece PAUSED; no se renovó el seguimiento ni se reabrieron OAuth, tokens o Container. `operationalReadiness=false`: alta, entrega útil, revisión cloud, retirada nativa, PC-off e incorporación de Max siguen en los gates del roadmap.
