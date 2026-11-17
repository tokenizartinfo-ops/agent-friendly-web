# AFW — estado para preparar el ensayo con PC apagada

Comprobación documental: 2026-11-17 17:27:46 UTC. Proyecto AFW, repositorio tokenizartinfo-ops/agent-friendly-web. Evidencia del laboratorio, sin nueva comprobación de salud del proveedor ni del runtime.

## Evidencia y trabajo actual

El último recorrido completo Source5 (run44110921244/job134135963389, evidencia7d8f310d69e718727ce2cb392e565dea90205693, revisióna7b3035185debcc4ba6db18bd21592bf4a84e2e3) conserva catorce casos aprobados y un primer fallo de GET503 en vez de200 en el caso15, antes del POST de DROP. Los casos siguientes no completaron el recorrido; catorce pases no califican el producto. La causa del503 sigue desconocida y no se atribuye a Cloudflare.

Una nueva prueba controlada del GET original preparado sí alcanzó su actor sintético y completó respuesta413, cuerpo esperado y liberación del simulador. Confirmó el RED por marcador diagnóstico ausente, salida41. Run44134958107/1, job134221843459; primaria0919eb82966125450d60922aaa40ff2f23b45133, cierre c572565918eb3428b4b32d09207e19e7de00e86d y revisión independiente aceptada891b47473931274f578b43988c88997407b32343. Cinco comprobaciones de sintaxis y46 controles de captura pasaron. Las315 expectativas de comportamiento siguen selladas, no ejecutadas. Este éxito es del control diagnóstico, no una reparación del503 ni aprobación del recorrido.

Ahora se implementa solo la observación mínima del GET: distinguir vencimiento/abort, respuesta no exitosa del servicio interno y una denegación explícita de validación. No se modifican guardas, tiempos, QA ni la lógica de negocio. El objetivo es elegir la corrección con evidencia. Source5/OWN5 permanecen5/5, sin reinicio.

## Cierres pendientes, en orden

1. Implementar y revisar ese diagnóstico; verificar sus controles nativos reales y el lector independiente; usarlo en un único recorrido completo materialmente cambiado. Aislar el fallo, elegir una corrección fundada y verificar el recorrido de preparación. Ninguna repetición idéntica ni aumento de límites está autorizado por este documento.
2. Calificar Source/Task1 con el protocolo completo congelado (incluidos negativos, mutantes y regresiones), no solo el subconjunto del diagnóstico. El plan condicional a4cebfbb3c91ec706429253c9809a0096774108b sigue retenido hasta evidencia suficiente.
3. Completar material instalado/invocaciones/guardia y la composición de aviso cloud, adopción, trabajo autorizado/ACK, retirada, alarmas y restauración. Plan3434f31d432084d1b6153f85d3b8c64c8e043850; su presencia no significa que haya pasado.
4. Preparar candidata cerrada/build/rollback y revisar el plan completo. Comprobar entonces fuente, bundles, bindings, accesos y vigencias reales; CI y los incidentes históricos no los sustituyen.
5. Coordinar UN ensayo real con PC apagada, arranque atendido y permisos vigentes, ejecución cloud, aviso útil, retirada y cierre verificable. Según3d7dc69c4ccc4ec8c7e3268318a1a10fc79bb238, arranque/apagado/cierre son fases de esa misma ocurrencia; no se consume Entry en un ensayo completo previo con PC encendida. No abrir Entry ni pedir apagar ahora.

No hay una estimación de calendario fiable hasta aislar el fallo actual. El bloque actual no necesita intervención de Gabriel. Se trabaja principalmente en GitHub/Actions con análisis mínimo de datos en memoria local, sin instalar dependencias locales. No se acredita guardia permanente ni operación con la PC apagada.

SourceQualified=false; Task1Pass=false; operationalReadiness=false; completePackage=false; PCoff=false. Todas las otras no afirmaciones permanecen false.
