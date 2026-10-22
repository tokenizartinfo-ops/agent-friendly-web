# Ensayo cloud de confirmación con el Worker histórico completo

22oct2026. ProyectoAFW, repositorio tokenizartinfo-ops/agent-friendly-web. Cualificación exclusiva de código en GitHub/Actions, sin cambios funcionales de producción.

## Problema que cubre

PR568 probó el Workflow administrativo nativo con un artefacto pequeño. PR569 añadió reconstrucción exacta del Worker histórico y pruebas de compilación, plazos e inactividad. Faltaba recorrer la confirmación positiva con ese módulo completo a través del lector, el Workflow y el diario primario nativos de workerd.

El Worker reconstruido fuente3d4e9d5/árboleaf5cfd6 tiene1792585bytes, hash26ec0366… y programaf6f517c3…. Su representación JSON/base64 supera2MiB: un límite accidentalmente reducido puede pasar con los fixtures pequeños y fallar al trasladar el paquete real.

## Plan y cierre

1. Añadir composición CI-only que compile el operador actual con el mismo artefacto histórico verificado por el Workflow existente. Usar Workflow, D1 y resolución de nombres de workerd reales; simular únicamente identidad, proyección de configuración y respuestas del proveedor. No ejecutar el Worker histórico ni un Container.
2. Probar confirmación y aceptación primaria con respuesta de módulo completa; corrupción del último byte sin aceptación; e incidente regional de Workers con Cron resuelto, bloqueado antes de consultas API o admisión del diario.
3. Demostrar sensibilidad con una regresión intencional del límite4MiB a256KiB: el caso positivo debe fallar por esa razón. Restaurar EXACTAMENTE el lector original, exigir GREEN del paquete y CI general, revisión independiente e integración comprobada. La PR portadora/issue497 conservan los recibos efectivos; no anticiparlos aquí.

La fixture vive en test/fixtures/named-confirmation-native-rehearsal.mjs y solo se llama desde test/mcp-named-confirmation-package.native.mjs. Conserva el consumidor real del lector y rechaza HTTP público; el sustituto externo admite únicamente GET a destinos fijos y una credencial ficticia. Las tablas se crean únicamente en D1 efímera del runner. El original de la namespace usa idFromName, sin get ni almacenamiento.

## Límites y continuidad

Una aceptación de este ensayo verifica composición de código y bytes. NO acredita permiso efectivo de los lectores nuevos, Cloudflare remoto, autorización humana, grant real, suscripción, entrega, revisión útil, retirada física, PC-off o Max. La fixture deriva un plan temporal sintético exclusivamente para su runtime efímero; el paquete que el Workflow conserva continúa inerte0/1 y nunca debe invocarse remotamente.

Las lecturas17:19–17:22UTC dejaron operadorbb9a7c0d cerrado/tresflagsfalse, canary1b751b11 cerrado, cron/tails/Containers del operador vacíos y procesos originales0. Source/build/hosting de PR569 están aceptados, con rollbackba403723. La consulta exacta del proveedor17:22:26UTC devolvió unknown/active_related_incident para l0gsc0sccx2v, sin atribución aAFW. Este trabajo NO modifica esos recursos, renueva tokens o abre permisos; monitorPAUSED y operationalReadinessfalse.

La configuración del ejemplo refleja los campos completos admitidos por el observador y la asociación de Container observada en la API22oct; sus valores son sintéticos, no una copia de datos de clientes ni una declaración de permiso. Ningún costo/modelo/pago/servicio nuevo. Todo build y prueba en Actions, sin nuevos archivos, dependencias o procesos persistentes en el ordenador.
