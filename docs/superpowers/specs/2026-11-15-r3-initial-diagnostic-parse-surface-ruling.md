# AFW — conservar superficie de parseo en diagnóstico

Fecha 2026-11-15 10:31:05 UTC. Precisión de initial-only antes de Source. No ref/run.

El preflight de la propuesta303f7b88/0bc84c43 detectó que se habían quitado las definiciones commonouter del módulo Node R2. Aunque no se invoquen, también son código que Node debía parsear en la ejecución que falló. Suprimirlas podría ocultar una causa de salida temprana. No hay prueba de que contengan un error; precisamente no debe suponerse para el diagnóstico.

Retener el commonouter literal idéntico al R2 dentro del mismo módulo compilado. Suprimir únicamente la invocación terminal runControls y el flow de publicación de controles que el diagnóstico reemplaza. Ninguna función se invoca; imports solo de builtins y definiciones trusted no son ejecución de helpers sustituibles. Mantener stdout del bootstrap suprimido y un único formatter al final. El patch reversible debe abarcar el módulo completo, incluida esa superficie.

Candidata0bc84c43/F7activo5b116322/paquete303f7b88 y commit preparado Rootb0985ba0 son provisionales/supersedidos sin Source ni ejecución. Source continúa dfed0449. Rehacer artefactos/SAMErefs/reporte de manera coherente, preservando el prefijo1717394 íntegro/Core/18/Main.

El límite helper32768 sigue para helpers R2/reutilizables; F7 no es ese tipo de helper (ya medía54419 enR2). Para el programa bootstrap completo se admite representación por piezas Source declaradas de hasta32768, compiladas juntas; alternativamente declarar medida exacta y un límite propio específico máximo65536 para programa/F7 antes de candidata. No recortar definiciones para caber. Raw400500/gzip98304/base64131072/SAME1800000 y wire2048/traza256 no cambian. Proponer cualquier exceso antes de candidata con medición; ninguna ampliación implícita.

Sigue initial-only sin runControls/capturado/CLI/Native. El resultado solo observará bootstrap; no calificará104, I3 ni PC-off. La causa exacta de43697701677 permanece desconocida.
