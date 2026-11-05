# Preflight de root — finite preparation notice store

2026-11-05 · Componente SOURCE ONLY; preparado para activación después de aceptar D0.4. Este documento solo no despacha implementación.

PROJECT=AFW; REPOSITORY=tokenizartinfo-ops/agent-friendly-web (1347578006, PUBLIC); ENVIRONMENT=GitHub source / Actions SYN; ORIGIN=GitHub API; RESOURCE_TYPE=docs branch; RESOURCE_ID=docs/finite-pcoff-continuation-20261103; ALLOWED_ACTION=dos documentos nuevos, checkpoint y futuras lecturas; ROLLBACK=revertir únicamente este commit documental por expected-head. Ningún runtime o dato de cliente.

Root leyó íntegramente spec/plan/diseño de 44d0490a3c7a33ad483499a70696689597ebf2c6 y el issuer store en BASE D0.4 4d8f6a017e1bd3914c7722a7ae8c23946e31a9aa. El último writer D0.4 sigue siendo único; este preflight no solapa producto. Pin de inspección antiguo51c5 permanece histórico; ejecución usará un HEAD futuro explícito.

| Tareas/interfaces compartidas | Produce/consume | Hallazgo y resolución |
| --- | --- | --- |
| Task1 pasos1–4 consigo misma | grant nativo original → ticket SQL → observación fresh-primary → consentimiento SQL | Contrato consistente; el positivo debe alcanzar métodos ausentes en RED después de crear el grant real. Un error de bundle/DDL/fixture no es RED. |
| Task1 / issuer existente | mismos holders, lease, UUID y métodos anteriores | “Preservar blobs” no puede significar hash invariable del archivo que debe ampliarse. Ruling: preservar bytes de métodos/SQL/schema antiguos y conducta; sólo nuevos helpers/métodos/constante y fixture/tests autorizados. Costo si erróneo: reabrir review por regresión accidental. |
| Task1 / D0.4 | exchanged_at mutable en grant actual | La proyección del ACK pertenece a D0.4 y no se retoca aquí. Ruling: aceptar D0.4 primero, conservar phase/M/SDK blobs; validar exchanged_at actual en SQL de avisos sin usarlo como prueba de token. |
| Task1 / schema ordinario | siete DDL existentes exportados como metadata | No migración ni ejecución DDL de producción. Preflight nuevo separado, tablas de avisos no pasan a ser requisito de métodos originales. Copia de constantes exigida para bundle sin filesystem; test verifica igualdad completa contra db/*.sql. |
| Task1 / tamper de ticket | triggers inmutables → revalidación de fila al INSERT | Ruling: UPDATE normal debe fallar; único caso SYN puede retirar un trigger después del preflight para probar SQL en carrera. No se presenta como operación legítima ni se modifica schema productivo. |
| Task1 / clock y ceilings | permiso absoluto + operación hija≤5000ms | Techos anidados no son ocho pruebas independientes de un predicado. Ruling: registrar mínimo efectivo/empates y gate alcanzado antes de expiry; SQL en cola se libera después del límite real. Ninguna compensación de reloj. |
| Task1 / c.wait y ACK desconocido | Promise nativa retenida → fallo absorbente por instancia | ACK perdido no autoriza lectura para reconstruir éxito ni repetir INSERT. Fila persistida puede quedar histórica; no afirmar cancelación física ni exclusión durable entre stores. |
| Plan header / workflow actual | executing-plans vs SDD vigente | Ruling: usar SDD, un implementer fresco y un reviewer fresco. Root entrega brief completo; no helpers/reviewers del implementer. |
| Task1 / Actions existente | runner autorizado, sin workflow inferido | Ruling: autorizar solamente qualifier temporal acotado a esta rama/tres archivos, contents:read y sin secretos/provider calls; retirarlo del diff final. No ampliar permisos CI. Reutilizar dependencias cloud y contar compilaciones reales. |
| Task1 / compiler estándar | componente todavía unmounted | Ruling: no estándar extra si no cambian imports/mount/dependencias estándar. Si cambia el graph o falla una regresión, registrar y resolver alcance; no declarar aceptación sin evidencia proporcional. |

Cierre de unidad: RED causal primario, GREEN nuevo archivo + regresiones issuer, lint dirigido, diff real BASE..HEAD, informe completo, qualifier retirado y revisión independiente spec+quality. No se agrega journal, receiver, NoticeLink, suscripción, entrega, cleanup completo, mount, ARM ni PC-off. Dos Minor previos siguen en ledger para revisión final; no se corrigen por arrastre.

Todavía operationalReadiness=false, completePackage=false y PCoff=false. El techo fuente2026-11-03T02:59Z está vencido. Sin nuevas credenciales, OTP, alias remoto, DDL, grants reales, cron, Containers, Max, merge ni main.
