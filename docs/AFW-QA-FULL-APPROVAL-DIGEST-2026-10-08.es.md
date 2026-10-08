# Correlación completa de aprobación QA

El contrato explícito `afw-qa-closure-approval/v2` incluye `approvalDigest`,
calculado con la receta `server-v1` de aprobación de ocurrencia. La huella liga
fuente, configuración, publicación, señal exacta, identidad, enrollment,
versión de configuración, revisión y límites temporales. `baselineRef` incluye
también esa huella y el contrato V2.

`validateQaClosureApproval` comprueba el registro V2, los pins de ocurrencia,
deadline y revisión, la huella de aprobación completa y la del baseline. Devuelve
una copia inmutable o rechaza. No consulta autoridad ni acredita propiedad,
consentimiento, custodia o disponibilidad: antes de actuar sigue siendo necesario
leer catálogo QA y aprobación D1 primarios actuales.

V1 conserva su interpretación histórica. Ambas versiones comparten las reservas
de identidad y ocurrencia, para impedir reemplazo, upgrade implícito o reutilización
de un token ya registrado. La constancia de provisioning conserva su contrato V1
y refiere al baseline completo, que ya contiene el contrato y digest nuevos.

La identidad de aprobación `identityRef` y el digest de metadatos del token son
conceptos distintos; no se igualan por inferencia. La prueba cambia por separado
fuente, publicación, configuración, identidad, enrollment, versión, revisión,
request y señal, y verifica rechazo. Catalog/composición: 21 pruebas locales
pasaron, incluida persistencia SQLite DO histórica y recuperación administrativa.

No se monta ni despliega un actor, ni se modifica una aprobación remota. Siguiente
bloque: componer D1 primaria, catálogo compartido y guardas antes de escrituras en
un actor privado, con ensayo nativo de pérdida de respuesta y retirada de autoridad.
La custodia alojada, adopción cloud real, PC apagado y preview de Max siguen aparte.
