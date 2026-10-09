# Actor privado de cierre QA completamente correlacionado

La factory interna `createApprovedQaClosureActor` reúne la aprobación completa
D1, el catálogo QA compartido V2, el lifecycle persistente y el cierre
administrativo. El plan procede del catálogo del servidor, no del navegador.
La factory solicita una sesión D1 `first-primary` cuando el binding la admite.

Cada consulta de autoridad tiene un límite de 1 a 10 segundos, cinco por defecto:
lee QA, valida el digest completo, compara todos los campos de aprobación primaria
D1 y vuelve a leer QA. Conserva el baseline inicial y un reloj monotónico. Cambios
de recurso, fuente, publicación, enrollment o identidad impiden actuar. La
revocación propia de la ocurrencia permite cerrar; retirar la autoridad QA impide
efectos posteriores y requiere intervención, sin reaprobación implícita.

La revocación y el cierre D1 usan las guardas posteriores a consultas de PR344.
Las solicitudes al proveedor vuelven a comprobar la correlación después de leer
las credenciales. Las dos custodias siguen separadas. Recuperación: receipts D1
primarios para los primeros pasos y dos pasadas GET administrativas para el último.
El estado issued persistente evita repetir un PUT de resultado desconocido.

Aceptación local: 24 pruebas seleccionadas, sin fallos. El ensayo nativo usa D1
real local y SQLite Durable Objects separados para catálogo y lifecycle, con
proveedor y constancia de provisioning sintéticos. Observó una revocación, un
journal stopped, una respuesta PUT perdida y reconstrucción de la factory. La
segunda ejecución completó con ocho GET y el contador PUT quedó en uno. La
retirada posterior del catálogo devolvió unavailable. Otros casos conservaron un
journal completed y bloquearon escrituras/envíos durante retirada de permiso.

El ensayo invoca la alarma manualmente con reloj sintético; no demuestra un
disparador espontáneo, despliegue alojado, custodia real ni operación PC-off. La
reconstrucción de la factory utiliza almacenamiento DO persistente; no se afirma
que el ensayo haya expulsado el isolate. La verificación entre catálogo y D1
ocurre antes del despacho, sin promesa de atomicidad distribuida.

La factory sigue sin montar en el Worker público, que conserva unavailable/404.
No hubo SQL, permisos ni cambios de runtime remotos. Siguiente gate: recursos
own-QA alojados, artefacto y baseline recuperables, constancias reales de
provisioning/custodia y destino privado de credenciales; después adopción cloud,
active→disabled propio y ensayo integrado PC-off. Max sigue pendiente de preview,
aprobación editorial, ingreso y consentimiento personales.
