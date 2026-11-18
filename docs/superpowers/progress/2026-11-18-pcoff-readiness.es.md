# AFW — requisitos pendientes para el ensayo con PC apagada

Actualizado 2026-11-18 01:03:46 UTC. Proyecto AFW, repositorio tokenizartinfo-ops/agent-friendly-web. Evidencia de laboratorio y requisitos de una ejecución real se mantienen separados.

## Lo comprobado

El ensayo sintético run44208626844/1, job134480971206, quedó conservado y cerrado en 8be5b43f46a6757953a1141eb7fd18fa822ba449. La revisión independiente 7dc02ce610fc0f9158cb911c16b81e996e54dec1 aceptó sus bytes, admisión independiente y cierre. Los primeros14 casos pasaron; el GET del caso15 devolvió503 al cabo de30008ms. Ganó la rama original DEADLINE_OR_ABORT. Esa observación nueva localiza el límite que devuelve el fallo, pero aún no distingue el temporizador de la señal ni qué operación del receptor seguía pendiente. Los casos16/17 fallaron,18 quedó abierto al límite del hijo y19/20 no se observaron. No es un pase20/20.

Los controles del observador GB1 y del lector OWN ya pasaron en sus ámbitos. El lector independiente actual pasó73 paquetes completos y5 cruces de binding. Esa calificación permite interpretar la captura correspondiente; no acredita el recorrido de negocio, permisos reales ni trabajo con el PC apagado.

## Orden de cierre

1. **Diagnóstico actual:** especificar y revisar una observación acotada de la operación pendiente. Reutilizar el control básico M→actor200 que ya pasó. Distinguir un hecho observado después de la respuesta de uno anterior al límite de M. Nada autoriza aumentar los30s, repetir full20 sin cambio material o elegir una reparación por conjetura.
2. **Corrección fundada y preparación completa:** después de aislar la espera, resolverla mediante el procedimiento revisado y obtener la calificación completa Source/Task1 con RED3, GREEN20, MUTANT20, REG11 y los seis lanzamientos del mismo protocolo. Los límites Source5/OWN5/StageB5/5 permanecen; un observador diagnóstico no reinicia rondas de negocio.
3. **Ejecución y cierre integrales:** completar y revisar C2Task2 (material instalado, invocaciones y guardia) y C2Task3 (aviso, adopción, lanzamiento, retirada, alarmas y restauración), según plan3434f31d432084d1b6153f85d3b8c64c8e043850. La presencia de propuestas o interfaces no implica que pasaron esas pruebas.
4. **Candidata cerrada:** build, bundles, bindings, revisión del conjunto, rollback recuperable y comprobación del cierre. Sólo entonces revisar los hechos reales y las vigencias necesarias de proveedor/runtime/accesos. No renovar permisos ahora por anticipación.
5. **Una ocurrencia real coordinada:** arranque atendido y permisos vigentes → READY/ARM observado → apagado → trabajo cloud y recepción útil/ACK → retirada y restauración verificables, todo en el mismo ensayo. Regla3d7dc69c4ccc4ec8c7e3268318a1a10fc79bb238. No consumir Entry en un ensayo completo separado con PC encendida ni pedir apagar antes de ese gate.

No se necesita intervención de Gabriel para el diseño actual. No hay una estimación de calendario fiable antes de aislar el fallo. Este bloque no revalidó salud actual de Cloudflare, estado productivo, vigencias de credenciales ni correo de soporte; el503 sintético no demuestra una incidencia del proveedor. Las ejecuciones finitas en GitHub no establecen una guardia permanente.

SourceQualified=false; Task1Pass=false; operationalReadiness=false; completePackage=false; PCoff=false. Las demás no afirmaciones permanecen false. El caso de Max permanece fuera de alcance hasta el cierre y su autorización específica.
