# Ensayo de entrega con servidor HTTP real

Fecha: 2026-09-30. Proyecto AFW, entorno local. Prueba reproducible: `node --test test/delivery-http-rehearsal.test.mjs`.

La cápsula sintética tiene origen lógico `https://delivery.example`; un adaptador exclusivamente de prueba conecta su única ruta permitida a un servidor HTTP enlazado a `127.0.0.1` con puerto efímero. No modifica los controles SSRF ni el fetcher productivo, no accede a sitios externos y no presenta el origen lógico como un sitio desplegado.

El servidor lee un archivo real desde una carpeta temporal. Se comprueban: recurso ausente antes de instalar, aprobación sintética para entrega manual, creación exclusiva del archivo, lectura HTTP posterior con SHA-256 exacto y manifiesto vinculado a la cápsula, detección de cambio posterior y recuperación de los bytes esperados. El comparador sigue siendo de lectura; la instalación corresponde al ejecutor de prueba. Al terminar se cierra el servidor y se limpia la carpeta creada por la prueba.

Esto fortalece MA-06 más allá de respuestas HTTP simuladas. No demuestra instalación remota, interfaz de cliente ni despliegue externo. Continúa pendiente una entrega remota en un destino autorizado con contenido adecuado. El llms.txt sintético del expediente de entrega no debe reemplazar los documentos públicos de AFW.
