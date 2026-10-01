# Asesoría de entrega: primer bloque

Implementación fuente del 2026-10-01, basada en [experiencia de entrega](AFW-DELIVERY-EXPERIENCE.es.md). No es un adaptador de hosting ni un permiso para publicar.

Cuando una cápsula está aprobada para entrega manual y su comparación no indica que todos los archivos ya coinciden, la guía ofrece «¿Cómo llevo estos archivos a mi web?». Un desplegable pregunta qué puede hacer hoy la persona: editar páginas, instalar plugins, subir archivos, trabajar con repositorio, recurrir a mantenedor o no estar segura. La elección muestra una sola orientación y permite cambiarla. ES/EN/PT.

`lib/delivery-advisor.mjs` selecciona método solo por capacidad explícitamente elegida, siempre no verificada. Un nombre de proveedor, CMS o rol genérico no selecciona método. `app/components/delivery-advisor.tsx` presenta la ayuda opcional dentro de `capsule-guidance.tsx`; no añade red, escritura, nuevos permisos ni campos de expediente. Las elecciones son transitorias y la interfaz lo explica: el asesor no constituye un registro de acceso ni reemplaza decisiones de la cápsula. El extractor del copilot conserva su contrato de hechos expresados por el usuario.

Editar páginas conduce a coordinar con el mantenedor, porque no demuestra publicación en rutas raíz. Instalar plugins conduce a evaluar un paquete compatible: la cápsula actual no se presenta como ZIP instalable de WordPress. Archivos requieren verificar docroot/dominio; repositorio requiere confirmar fuente y despliegue. Proveedor desconocido conduce a identificar al mantenedor, sin credenciales generales.

Pruebas `test/delivery-advisor.test.mjs`: no inferencia por proveedor, seis capacidades con límites invariantes y explicaciones completas en tres idiomas. Suite de cápsula comprueba estados terminales, comparación y coincidencias. Lint/build/CI y despliegue se registran aparte; este documento no acredita funcionamiento productivo.

## Próximos bloques

1. Probar el recorrido renderizado y desplegar el asesor junto con una revisión AFW comprobada. No pedir otra autenticación hasta que exista una prueba que la necesite.
2. Convertir orientación en plan de entrega persistido, con fuente, capacidades verificadas, responsable y cápsula exacta. Separar elección informativa, comprobación de acceso y autorización. Integrar con los datos guardados sin confundir información de casos anteriores.
3. Primera tarea del gerente desde AFW Operations publicado, seguida de disparador real y aceptación con ordenador apagado. Inbox operacional aún no tiene runtime remoto.
4. Consulta desde ChatGPT: registrar cliente/callback y validar lectura útil de un expediente real antes de promover OAuth productivo. A2A después de ese recorrido.

Cada bloque cierra con resultado observable y recibo; elegir prioridad por necesidad del usuario, no por sumar archivos o elevar AF automáticamente.
