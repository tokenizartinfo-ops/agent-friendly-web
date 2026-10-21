# Plan: composición privada cerrada AFW
> Ejecutar inline; revisión final fresca única; cloud-first.
1. RED nativo usando Worker actual con opción sourceAccessVerifier: falta capability intencional antes de bundle/ejecución. No simular éxito de identidad.
2. Worker selecciona source exacto con flag propio; nuevo decoder servidor separado. Host fuente acepta el MISMO originalLease opcional; tests conservan su modo detached propio.
3. Focal actualWorker nativo+todos los tests previos, fullCI/lint/cinco builds/Worker build en GitHub.
4. Un review final de toda rama; Important/Critical una reparación RED→GREEN sin re-review. Merge exacto y main.
5. Solo después preparar publicación cerrada con inventario y rollback; ningún permiso ni ventana activa por fuente.
