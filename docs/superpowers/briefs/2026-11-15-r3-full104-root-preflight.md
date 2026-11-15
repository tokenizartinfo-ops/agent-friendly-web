# AFW R3 full104 round3: Root preflight gate

Fecha UTC: 2026-11-15 13:21:49 UTC.

## Alcance y cierre

Autoriza solo UNA ocurrencia de controles sintéticos en GitHub Actions, sin ejecutar original readonly CLI ni casos Native. No modifica Main, Core, runtime remoto, credenciales, permisos, OAuth o datos de clientes. Resultado requerido: wire real validado por receiver Root + job/step SUCCESS + revisión acotada posterior del mismo reviewer. Un wire por sí solo no cierra I3.

Source cerrado esperado 92cf777de8a109aa42ca73d9b33b27c74226abde; árbol26c89720fcba01416dffa0516bc2867b85b6a0b6. Main0c9c475b3ebaa970fc11d628b40e50a90cceb727. Candidata inactiva1a426cb3a06894425f2bbd9c5140d962c54840f4/treee80f0858e964d21048ee1ec0c27d3cca93ff2406.

Preparado, aún NO movido: commit2e458c71e20928e37b0f98b7d883f62a6134f873, padre único92cf777, treedaf8ab4cb897b9e09b8aed0da18fb1dedcaf6005. Mensaje exacto AFW-R3-DELIVERY-R3-CONTROLS-ONEUSE-20261115. Solo F7 b5b1dab0ccfea262e98c80684cba383d8710d535 y SAME3867825559f45aff9433a3d24e43cc4af6a5cec7. Árbol completo3364/3203hojas/no truncado; Core3201 idéntico, NUL324448/SHAaefb08c118db0e099833b8f1065779949be6bc8c1978eb828c26728ef0840703. Prepared runs0 observado; refrescar Source/Main/cinco estados activos y prepared runs0 inmediatamente antes de CAS.

## Evidencia Root independiente, DATA sin ejecución Source local

Raw79c95223d8876541bebe4418899515114d45be9b/486698B/SHAec65a26338aec4fe85e78e032bc1ec3d33abbf1215ac519dbdd3785a5d1e9311. Mirror263bdebb294711f247fd993569cd0efdb9048b8d/160160B permite reconstruir gzipcc3adb44499becf1ba38b46ad2407a6eb9e843c6/120119B/SHA4c06a8f8164591e43bece1c608cba94c2b0e4da2656187ea7969f0098b43e059. Conector UTF8 no acredita lectura binaria directa. Gunzip derivado reproduce raw exacto.

39 fuentes cotejadas byte/hash/GitSHA/cap con manifest29a1a092b45b31b5ac2fe991b1ac8c25096f7d64; 33helpers con b736a7a6ed13f78366755ad95b29a725c6929e19. Manifests canonicalJSON SIN LF. Production18 b88ebef9a2aa979772d20bfb778cbfe463dc3011/95518B/SHAcfcb0dc7992d27246dc785ef2991104f6715e61c9aa49cfddc0317b219e6ac91 exacto a R2, DATA únicamente. Helperpatch72ee195a17f449a5df5513d529adc07e8db57a27:19 cambios reversibles exactos. Bootstrapdelta76b29f84c8a97f41338e55d0b9a4a9e1ed2ba986:7 cambios reversibles exactos. No Source eval/import/VM/syntax/compile/build/tests en el ordenador.

12 snapshots kernel/module anidados descomprimidos como DATA, todos exactos. F7 literal Python coincide con bootstrap-entry.py y cleanup silencioso coincide con image-cleanup.py. Programa exacto prelude + LF + outer + llamada fija runControls. No FD10/11 ni wires de diagnósticos initial-only. FD9 se cierra antes de execNode; Bash lo conserva solo para cleanup posterior a Node0. Nunca fallback Bash tras posible publicación. Node23/otro/teardown incierto conserva imagen privada hasta fin de VM y falla. Report cleanup solo base de fixtures, no imagen ni drenaje global.

SAME1916660B/SHAf8447e9f81343100df181c6c07145552036ef06c05bd0670655535b3899a5342 preserva prefijo completo bdf60126b38f7b5f62b15b6020d2874807b26887/1748092B/SHA6c499e6e280a82c2726a966f124addf0589f1beb62a186112fa53e0e338f41c6. Append97af49703b64780308178eacae3eb044ef2793aa/168568B exacto, sección única contiene mismo mirror sin alteración.

Matriz predeclarada5b829c768ed3d7af03d5eb3f1870599d39bfd083/SHA0ba8de6a133574e19678004b0f1c7e8c6a4121b3e02086e4f36454a7ed01dd6e:104 controles, cuatro mutantes exactos M_RAW[D02],M_PROVENANCE[P06],M_OUTPUT[B05,U01],M_ASSOC[S01]. Esquema de104 y expectativas intactos. Cuatro ejemplos por receiver Root38749c: ejemplo pasado califica; fallo inesperado/cleanup/budget son aceptados sin calificar. Esto NO es medición Source.

## Límites y defectos cubiertos

Rulings ed0fd9d72fe880322265302195be71b80de7b027, d3dc91222b16ba7c38bb4e50a9a5fce811584708 y3ee4ce3d69168b2900eec047cabb10cf6bfac853 aplicados. Raw524288/gzip131072/base64174764/SAME2000000; helper32768 (máximo31799), bootstrap65536 (39529), workflow73728 (37217), controlesreport24576. Tiempos sin ampliar:90s harness/20s admisión/5s caso/2s cleanup; parent3.5s/100s, outer4s/110s, job7min. Duración agregada desconocida. No recortes, relojes relajados ni reintento de ocurrencias consumidas.

I1: contratos de fallback delivery/controls independientes, U02 rechaza wire de tipo incorrecto. I2: entradas literales con kernel/module verificado y sellado antes de ejecutar, E08-E11; sibling lifetime solo puede denegar coherencia mediante sentinel privado23, jamás ejecutar código desconocido. I3: L05 exige creador terminal, shim aún vivo/durmiendo mientras writer retenido, EOF real y CreatorDead verificables antes de salida. M1: registrar inode propio inmediatamente tras creación, limpiar preparación parcial. M2 warning Actions Node20 queda explícitamente diferido.

## Protocolo de ejecución y restauración

Root congela Source durante la ocurrencia. Esperar run y TODOS los jobs terminales antes de leer logs una vez y restaurar. Rechazar cero/varios/parcial wires; receiver38749c o unavailable91d9339b con contexto real Source/tree/run/attempt1/readonly/Node22.23.4. Gate conjunt oa1c901bda145a0f24d9f25b0772731f1ab43dc86 exige el mismo job y paso Run declared full104 controls only SUCCESS. Su éxito solo habilita revisión, no Native. Conservar mediciones fallidas y unknown con fidelidad. Restaurar F7 originalf7a71f1a0fa4f5ddf069ff411f008a098455e5cc y SAME completo + recibo factual; verificar árbol/Core/Main/F7/SAME/cinco activos0/closed-head runs0. Luego MISMO reviewer r3_delivery_task_review, solo ronda3 acotada. Si falla no repetir ni habilitar Native por inferencia.

Informe append-only5748fe736308971e281906db2176924e0e635f6a/132604B y descriptorcd2c03c50ae9d0ec31f5638fa227be59690a1a4f preservados como archivos reales Rootdocs. Rootdocs07b29f0f ya alcanza propuestaSAME/patches/fuentes exactas; el error de Contents>1MB se concilió con lectura Gitblob entera, sin repetir CAS. No cambios Chavo/otros proyectos.

historicalCauseProven=false; receiptAuthenticated=false; operationalReadiness=false; completePackage=false; PCoff=false; globalNativeDrainVerified=false; sdkNamespaceEmptyVerified=false.
