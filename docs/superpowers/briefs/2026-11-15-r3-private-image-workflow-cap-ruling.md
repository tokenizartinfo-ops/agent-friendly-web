# AFW R3 — límite tipado del workflow con imagen privada

Fecha: 2026-11-15. Complementa el ruling f00883930262e0fb98f8fe965024711255d3c3f7. Solo preparación DATA; Source continúa cerrado e8304fcee5af3481f3ec49c705f4c3a85de8fd98.

El implementador midió el texto completo del arreglo causal: F7 activo 72.208 B e inactivo 71.951 B, por encima de 65.536 B en 6.672/6.415 B. La expansión corresponde al productor de copia finita, custodia de FD9, vocabulario cerrado y cleanup anterior a la publicación. No se omitió código, historia o superficie de parseo para ajustarlo. Shim 15.152 B, formatter 5.151 B, módulo Node 39.903 B (14.108 + LF + common literal 25.794).

Root autoriza únicamente ampliar el tipo **workflow** de 65.536 a **73.728 B (72 KiB)**, margen actual 1.520/1.777 B. Es menor que los 81.920 B propuestos por el implementador y suficiente para los textos completos medidos. No es una ampliación del programa bootstrap ni de los helpers: bootstrap_program sigue 65.536 B; helper/piezas 32.768; raw 400.500; gzip 98.304; base64 131.072; SAME 1.800.000; wire 2.048 y traza 256. Binario de copia 256 MiB/chunk 1 MiB/deadline cooperativo 15 s, límites Native/casos/harness y job 7 min, intactos.

Regenerar coherentemente sourceCaps tipado y metadatos/pins afectados, sin cambios de comportamiento adicionales. Se puede completar ahora candidata DATA hija e830, exactamente F7+SAME, informe append-only y readbacks. Este ruling NO activa Source ni permite ejecutar pruebas, full104, Native, runtime o permisos. Root cotejará los artefactos y gateará por separado una única ocurrencia initial-only, con cierre completo. Si el texto final excede 73.728 B, detener y comunicar la nueva medida: no cap implícito ni recorte ilegible.

La copia final ejecutada conserva todas las guardas estrictas; no tocar toolcache original. Los siete no-acreditados siguen false. operationalReadiness y PCoff no se acreditan.
