# Propuesta de enmienda estructural — continuidad del creador capturado antes de la espera

Estado: enmienda estructural adoptada por Root el 15nov2026. Implementación DATA liberada; ejecución Source requiere un gate independiente. AFW Source-only; no runtime, deployment, permiso, Core/Main o ensayo real. La revisión scoped afec2162c14c35578794da3226ece566cf6b694b aceptó I1 tras 5 RED/11 GREEN reales de funciones puras; tres menores conservadores quedan diferidos. El diagnóstico está cerrado. Esta propuesta no reinicia las cinco rondas del carrier ni declara I3 resuelto.

## Evidencia y defecto del argumento anterior

El código normal lifetime.py8f54bc78 ya captura before=creator() antes del hook pre-arm. Su comprobación posterior intenta primero validar tipo/uid/acceso/forma del descriptor proc del creador y sólo después compara el PID con getppid. La prueba normal L05 exige CreatorDead del shim vinculado después de matar/recolectar al creador y liberar el único escritor del FIFO. El diagnóstico Source88e0249/run43734061933/job132872647899 observó wake yes, dead event no y una nota post-EOF vinculada con fd4_type_owner/check_rejected. El guard COMPUESTO de modo/uid resultó falso antes del chequeo PPID específico. No sabemos cuál operando ni la causa de los fallos anteriores. El receptorRootdc5e9449aceptóelrecibo918bbf91;reviewafec2162 conserva ese alcance; I1 corregido sin repetir L05.

El defecto del plan es hacer depender una respuesta tipada de continuidad del acceso tardío a metadatos volátiles de un creador que la propia prueba ya mató. Un rechazo genérico es fail-closed pero no satisface la evidencia positiva requerida por I3. No sustituiremos esa evidencia por cualquier excepción ni eliminaremos el guard.

## Cambio mínimo propuesto de contrato

Después del hook/espera y ANTES del primer acceso posterior a metadatos proc del padre, comparar getppid nativo actual con el PID ORIGINAL fijado en before. Una diferencia produce el CreatorDead existente. La igualdad NO autoriza ejecutar: sigue inmediatamente la protección PDEATHSIG y la comprobación completa creator()==before que ya existe, incluidos tipo/uid/acceso/link/start y liveness. El parent original se obtuvo validando el descriptor real y el hilo principal antes del hook; no es un PID/callback/clock de caller ni de JSON.

Forma fuente mínima candidata, todavía no implementada:

```python
 # AFW_LIFE_BEFORE_ARM
 if os.getppid()!=before[0]:raise CreatorDead()
 need(libc.prctl(1,signal.SIGKILL,0,0,0)==0 and death_get()==signal.SIGKILL)
 need(creator()==before)
```

Se mantiene toda comprobación existente para el creador que sigue siendo el actual. Una muerte posterior a esta comprobación sigue rechazada por las protecciones existentes; este diseño no promete una clasificación tipada de todas las carreras ni drenaje físico. La L05 controlada mata al creador antes del retorno del hook, que es la ventana de regresión concreta. No se acepta un callback nuevo, excepción pública, selector, rol, ruta, reloj ni tolerancia de identidad. Las políticas/tokens/SQL/recursos runtime no cambian.

## Límite de implementación futuro

Partir del NORMAL R5 snapshotf9c8261c54f761b5c33ddc370dbe7b308648033b y sus33helpers/typed39e2cf2c48. No reutilizar controlador/probe/parent/canales/cursores/notas del diagnóstico L05. El control normal104/4mutantes, proof, schema, matrix, anchors y maxBuffer32768 permanecen exactos. Cambiar sólo el kernel privado de transporte y regenerar las tres entradas compartidas y la copia bootstrap/F7 que deben sellar el mismo kernel; verificar todos los pins y coherencia entre kernel en uso y materializado. No cambiar production18/Core, fuente de negocio, Native ni APIs.

Conservar source originbfa/d17 del snapshot y vincular la nueva derivación al cierre actual comprobado, no reetiquetar el origen. Reutilizar el paquete inmutable mediante un delta nominal pequeño y verificable para que SAME preserve íntegros los2471214B actuales dentro del cap2600000; no duplicar160KB ni subir cap por comodidad. Bootstrap sólo admite ese overlay fijo con hashes; nada de generador/loader/patch caller genérico. Root requiere 2-vías deltas, 33/39pins, todas copias selladas, límites medidos, Core/Main/frozen18, candidato inactivo y rollback recuperable. Solamente F7+SAME en la rama Source; el código vive como artefacto DATA hasta una eventual prueba GitHub.

## Criterio de cierre del cambio futuro

El RED observado es L05failed en SourceR5 y en el diagnóstico acotado; la corrección no cambia el oráculo. Una eventual nueva ocurrencia cambiada deberá ejecutar el recorrido NORMAL de104controles y los cuatro mutantes, con el mismo origen de cada medición y sus resultados reales. Mantener 90000ms total, reserva20000, caso5000, cleanup2000, probe4500/4800 y20ms, padres100000/110000/120000 y entrega3500/4000/5000. No cambiar orden/IDs/killsets, omitir casos, inventar intentos, recalificar unknown, repartir fuera del contrato o ampliar tiempos para obtener verde. Si el presupuesto deja unknown, registrar el hecho y analizarlo sin repetir automáticamente.

Sólo un nuevo Source/código/contexto autorizado por un gateRoot independiente, nunca rerun de255e/92d9/88 ni Source antiguo. RootOwn84 debe aceptar consumidores104; Root387 debe admitir la medición; conjuntaa1c debe acreditar run/job/stepSUCCESS y controles completos; revisión de tarea limpia antes de considerar I3. Source se congela hasta terminal y se restaura con F7original+historia completa+recibo cualquiera sea el resultado. Ni wire verde ni este diseño activan OriginalCLI/Native o C2.

Ruling adoptado: bajo el breaker finalbc9a9940, llevar esta corrección del contrato de parent original a una tarea estructural explícita del plan dependiente. Mantener registro de I3 del ciclo anterior abierto hasta evidencia nueva; no disfrazar otro intento idéntico de sexta ronda. La evidencia actual permite una corrección concreta sin adivinar; si una dependencia nueva rompe el argumento, volver al diagnóstico y no ampliar el alcance por inercia.

## Relación con C2

Es el mismo principio de preservar el origen previo a la espera, pero esta unidad modifica solamente el transporte Source Python. C2runtime nativo sigue separado y pendiente: parent por invocación antes de factoryawait, ctx/env/DB/storage/version/métodos fijos, mismo presupuesto en dos reads, retención de promesas reales y reconciliación de ACK perdido sin SEND repetido. No afirmar que este guard Python implementa C2, notices, publicación, entrega útil, retirada o PCoff. Siete nonclaimsfalse y objetivoAFWpendiente.

## Baseline de la tarea estructural nueva

Source CLOSED74e3300cfbe47ee4986303befb1ee3c3d099fc77/tree2df6eee9e653f81d25fd248441c46fb238279b2d. SAME2fcd79c7d0a2475f176dc03360df5980a58c3120/2471214B/SHA2561ba61ebb62514c1bb2e5b7b6058dd5abad09ddc1d059483987262032e154928a. F7originalf7a71f1a0fa4f5ddf069ff411f008a098455e5cc; Main0c9c475b3ebaa970fc11d628b40e50a90cceb727. La enmienda es un predecesor estructural separado, no reinicia el contador5/5 ni cierra I3 sin la prueba completa. El costo si el argumento falla es otra propuesta aislada/medición negativa conservada; no se amplía tiempo, capacidad o autoridad por ese fallo.
