# Historia privada de referencias de evidencia

Preparación local interna, 9 octubre 2026. Continúa el expediente append-only de Task1 en `superpowers/plans/2026-10-09-private-provisioning-producer.md`; no completa el productor ni sus fuentes reales.

El journal conserva referencias opacas de fuente, digest del contenido, clase y fecha observada. Cada entrada añade fecha de registro, secuencia, enlace a la anterior y referencia de integridad. Las correcciones identifican una entrada anterior de la misma clase: el original permanece. Solo se admiten creación, inventario, contexto cloud, ejecución cloud y recepción de desafío; no cuerpo libre, texto de documentos, nonce, JWT o credenciales.

La inscripción/aprobación completas V2 fijan baselineRef y el expediente custodyRef previo al nonce. El journal comprueba que la fuente administrativa no cambie durante el registro. Un solo CAS por secuencia evita escribir dos entradas con el mismo número; una respuesta perdida se reconcilia leyendo historia, sin repetir ciegamente el append. Presupuesto máximo32 entradas por expediente. Retirar es terminal y conserva todas las entradas, incluso vencida o retirada la fuente de configuración.

El contrato `afw-private-evidence-journal/v1` y estado `recorded` acreditan únicamente el registro interno. Una fuenteRef y un hash no acreditan origen, veracidad, custodia ni ejecución: deberán resolverse y contrastarse con el proveedor real, original oficial y diario primario antes de autorizar provisioning o instalación. No contiene rutas, bindings, permisos o publicación remota.

Se permite registrar referencias históricas después de vencer la ventana original mientras la fuente administrativa íntegra siga disponible. Esto conserva observaciones posteriores sin renovar permisos ni certificar vigencia. El productor futuro debe comprobar por separado su ventana y autoridad actuales. El retiro del journal sí impide cualquier nuevo registro. Los hashes verifican coherencia del registro; no sustituyen la procedencia autenticada ni protegen contra quien pueda reescribir todo el almacenamiento.

Pruebas unitarias y SQLite Durable Object nativo: concurrencia CAS, pérdida de primeras respuestas, corrección sin sobrescritura, reinicio, retiro, recuperación con fuente vacía, rechazo de campos sensibles y fechas incompatibles. Se conserva el límite explícito: datos sintéticos y referencias coherentes nunca se presentan como evidencia operativa real.
