# AFW — estado para preparar el ensayo con PC apagada

Comprobación documental: 2026-11-17 15:31:39 UTC. Proyecto AFW, repositorio tokenizartinfo-ops/agent-friendly-web. Este registro separa evidencia del laboratorio, trabajo de fuente pendiente y requisitos de una ejecución real; no acredita disponibilidad actual del proveedor ni runtime.

## Evidencia disponible

El diagnóstico Source5 run44110921244/job134135963389 quedó conservado y cerrado. La revisión independiente a7b3035185debcc4ba6db18bd21592bf4a84e2e3 verificó log, ZIP, recibo, 26 entradas y cierre. Catorce casos pasaron; el primero que falla es el GET del caso15, HTTP503 en vez de200. El caso16 falla en la misma aserción, con código propio no conservado;17 falla en selección;18 quedó abierto al límite de180s;19–20 no se observaron. El POST de DROP no se alcanzó. Tiempo y cantidad de Tickets no identifican la causa.

Los controles de las herramientas de diagnóstico y del lector independiente pasaron en sus ámbitos. Permiten aceptar la captura incompleta; no califican el recorrido de negocio.

## Orden de los siguientes cierres

1. Identificar el ganador del fallo GET con observación mínima e inequívoca, elegir una corrección fundada y verificar el recorrido de preparación. La tarea actual solo diseña el canal diagnóstico; no autoriza otra corrida sin revisión. Los límites Source5/OWN5 no se reinician.
2. Obtener la calificación completa de Source/Task1 bajo el protocolo congelado y sus controles positivos, negativos, mutantes y regresiones. Un diagnóstico de catorce casos no sustituye ese cierre completo. Plan condicional a4cebfbb3c91ec706429253c9809a0096774108b sigue retenido hasta evidencia material; no se despacha por este documento.
3. Completar y revisar las tareas dependientes de material instalado, invocaciones y guardia; después la composición de aviso, adopción, lanzamiento, retirada, alarmas y restauración. El plan3434f31d432084d1b6153f85d3b8c64c8e043850 exige esos cierres antes de promover la candidata. Este documento no declara que sus implementaciones o pruebas hayan pasado.
4. Preparar la candidata cerrada, build y rollback; contrastar fuente, bundles, bindings y vigencias, y revisar el plan completo. Revalidar después los accesos y hechos reales necesarios, sin deducirlos de CI ni de incidentes históricos.
5. Coordinar UN ensayo real preparado para PC apagada, con arranque atendido y permisos vigentes, ejecución cloud, recepción útil/ACK, retirada de permisos y cierre verificable. La regla3d7dc69c4ccc4ec8c7e3268318a1a10fc79bb238 prohíbe consumir Entry en un ensayo completo PC-encendida separado: arranque, apagado y cierre son fases de la misma ocurrencia. No abrir Entry ni pedir apagar ahora.

No hay una estimación de calendario fiable mientras no esté aislado el fallo actual. No se ha hecho en este bloque una nueva lectura de salud del proveedor o del runtime. No corresponde atribuir el503 del laboratorio a Cloudflare sin evidencia. No se necesita intervención del owner para el bloque de diseño actual.

SourceQualified=false; Task1Pass=false; operationalReadiness=false; completePackage=false; PCoff=false. Todas las otras no afirmaciones permanecen false. Este trabajo usa GitHub y lectura mínima local; no instala una guardia permanente ni demuestra trabajo autónomo con el ordenador apagado.
