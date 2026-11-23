# Ensayo de entrega y preparación comercial de AFW

**Objetivo:** comprobar el recorrido de un negocio que hoy se muestra solo en redes y quiere explicar su oferta desde un sitio propio.

**Diseño:** conservar el mismo expediente, objetivo y revisión durante el ensayo. Usar un origen ficticio representado mediante HTTP de loopback en CI. El rol del mantenedor se simula de forma explícita.

**Stack:** Node 22, CI de GitHub, helpers del expediente, cápsula, comparación de origen y cliente MCP en memoria.

- [x] Comprobar orientación, guardado y reapertura del expediente. Revisar la información pública nueva, pedir aprobación del titular y del mantenedor para el mismo manifiesto, publicar en el servidor de prueba y verificar coincidencia y reversión. Distinguir contenido del sitio y metadatos de descubrimiento.
- [x] Comprobar que el consumidor MCP retoma la revisión exacta, recibe lo mismo que el recorrido directo en la siguiente pregunta y pierde el acceso tras retirada. Medir llamadas y bytes de las representaciones controladas. Registrar tokens, costos y latencia del servicio como no medidos.
- [x] Dejar una propuesta para agencias, pymes y personas que hoy dependen de redes, con entregables, límites, criterios de aceptación y variables de costo. Incluir modelo de entrega al titular.
- [x] Mostrar en el expediente una ficha de preparación para AI Index usando las fuentes declaradas y la última observación del origen guardado. Mantener revisión de contenido, decisión de compartir e indexación pendientes cuando no haya evidencia.
- [ ] Verificar en GitHub Actions y dejar el resultado trazable. La validación en CI no abre permisos, no toca producción, no contacta a Max ni activa AI Index.

[Diseño de consumo agéntico](../specs/2026-10-19-afw-agent-consumption-design.md) · [Recorrido del primer cliente](../../AFW-FIRST-CLIENT-PACKAGE.es.md).
