# Traspaso de alcance a un expediente existente — 2026-09-29

**Proyecto:** AFW. **Repositorio:** `tokenizartinfo-ops/agent-friendly-web`. **Entorno objetivo:** `https://agentfriendlyweb.dev`, Worker `agent-friendly-web-web-production`. **Acción:** continuidad de lectura entre el diagnóstico y otro expediente privado del mismo usuario. **Rollback:** volver a la versión productiva anterior; no modificar D1.

Un alcance importado para otro sitio ya se bloquea en el expediente actual. Si existe otro expediente privado para ese mismo origen, la lista muestra «Abrir con esta referencia». Solo al elegir ese enlace se vuelve a colocar el JSON validado en `sessionStorage` de la misma pestaña. La página de destino lo consume una vez, lo presenta como referencia no verificada y exige una nueva revisión antes de habilitar un guardado explícito. Un expediente de dominio distinto conserva «Abrir» sin trasladar la referencia. Si el navegador no puede conservarla, se permanece en la página y se indica descargar la copia JSON.

El traspaso no crea un proyecto, no guarda el alcance, no concede permisos y no publica documentos. El listado usa el API privado filtrado por el usuario autenticado; la elección de destino sigue siendo humana. El contrato de origen y caducidad del traspaso no cambia.

**Criterio de cierre:** pruebas del comparador de origen y consumo único, suite/lint/build, release con copilot cerrado y sin migraciones, smoke anónimo, recorrido privado con dos expedientes propios y, si la referencia pública permite seleccionar una mejora real, revisión y guardado QA del dominio coincidente.
