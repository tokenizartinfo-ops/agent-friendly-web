# Aceptación SOURCE — consentimiento nativo de avisos

5 de noviembre de 2026. PROJECT=AFW; REPOSITORY=tokenizartinfo-ops/agent-friendly-web (público1347578006). Rama fuente feat/finite-native-cleanup-20261101. Revisión de una unidad SOURCE/SYN/UNMOUNTED; no aceptación operativa.

BASE `2f96acb45ec5477d559f85070aa438d2e2e00822` → HEAD `5205d80216d9767c44762df4a181e1015e093a8e`, árbol `23309d147f8818e0232be215f42a77cf7ffe0e6a`. Código calificado `e1537bf403944ae4f79c04818db1932a3189d78c`; qualifier retirado `1199dc920b9d4d280a5d22e4d1bf8cb932db4d35`. Root verificó que los nueve blobs de código/test coinciden con e153 y el único extra final es el informe, blob `91c08e8cfd6f0eb954631c3e75ea4af66e4b33b5`.

Paquete U10 completo `docs/superpowers/reviews/2026-11-05-finite-native-notice-consent-5205d802-package.md`, coordinación@01afa513a97edad287c5eeddb3ea8151a72a9b4c, blob c0797305c95ba869f73b08a10f1c669537a252db, 166531 caracteres. Incluye once commits, stat y diff BASE completo. Root leyó el informe38322chars; revisor fresco review_notice_consent (Astra high/fork none) leyó brief/informe/paquete y comprobó dos contratos protegidos por riesgos nombrados.

## Dictamen independiente

**Spec ✅ — implementación conforme en el delta BASE `2f96acb` → HEAD `5205d80`.**

- `lib/mcp-qa-finite-owner-notice-get-wire.mjs:6`: P3 queda resuelto mediante parser privado compartido: separadores, duplicados, nombres tchar, valores quoted ajenos y límites. Las cookies propias mantienen verificación sin unquote.
- `lib/mcp-qa-finite-owner-phase-context.mjs:780`: identidad firmada, prepare, owner, ConnectionRef y CSRF preceden a SEND; segunda verificación en `:833`. Access menor que el vencimiento original deniega en `:797`.
- `lib/mcp-qa-finite-owner-phase-context.mjs:800`: una instancia store y una child/Common/window conservan witness y referencias SQL separadas; los rechecks comparan ambos snapshots enteros en `:822`.
- `lib/mcp-qa-finite-owner-phase-context.mjs:395`: EventRow completa, secuencia global positiva y tiempos originales; correlación ACK/evento en `:311`, sin convertir ACK DATA en autoridad SQL.
- ⚠️ `docs/superpowers/reports/2026-11-05-finite-native-notice-consent.md:141`: los resultados terminales, costos y matriz GREEN dependen de primarias revisadas por el controller; no los regeneré ni inspeccioné nuevamente. La compatibilidad alegada es coherente con las aristas cambiadas del diff.
- ⚠️ `docs/superpowers/reports/2026-11-05-finite-native-notice-consent.md:5`: runtime, publicación y PCoff no son verificables mediante este diff y están expresamente fuera de esta tarea SOURCE.

**Fortalezas**

- `lib/mcp-qa-finite-owner-notice-consent-body.mjs:10`: retiene read real; señala failure antes de esperar cancel real en `:16`.
- `lib/mcp-qa-finite-owner-phase-context.mjs:805`: impide observar para reconstruir un resultado SQL pendiente; conserva resultado real hasta el último recheck.
- `test/mcp-qa-finite-owner-notice-consent-native.test.mjs:217`: las negativas resealed exigen codec, journal real y entrada/salida del correlador específico, además de ausencia de nuevo INSERT.
- `test/mcp-qa-finite-owner-notice-consent-native.test.mjs:302`: restart comprueba cambio de instancia y conservación durable, no solamente otra invocación.

**Critical:** ninguno.

**Important:** ninguno.

**Minor**

1. `test/mcp-qa-finite-owner-notice-consent-native.test.mjs:244`: el polling puede agotarse sin que `noticeProbe().allowed` sea verdadero y aun así pasar a comprobar ausencia de ACK. Así, esta prueba puede terminar sin demostrar settlement tardío completo. En `:161` también se inspecciona inmediatamente tras liberar SQL. Conviene exigir settlement observado antes de las assertions finales; comprobación focal exclusivamente sobre estos casos. No encontré el correspondiente defecto de producto: el latch y los guards permanecen absorbentes.
2. `docs/superpowers/reports/2026-11-05-finite-native-notice-consent.md:336`: la salida no es pristine: deprecations npm, ESLint unsupported, avisos Node/Actions, CIMD y RPC stub sin dispose. Están declarados correctamente y no invalidan los resultados, pero quedan como deuda de toolchain/harness; no deben describirse como ejecución sin warnings.

**Comprobaciones focales fuera del diff**

- Riesgo de omitir relaciones SEND/Common/ACK: `lib/mcp-qa-finite-preparation-notice-journal.mjs:9` valida hashes, decisiones, ventanas y tiempos ACK.
- Riesgo de incompatibilidad entre ventana y expiry del ticket: `lib/mcp-qa-finite-preparation-issuer-store.mjs:145` exige `permissionExpiresAt <= expiresAt`; el techo utilizado por el handler es suficiente. `:201` exige witness, lease y Common originales.

**Task quality: Approved**, con los dos Minor anteriores. Sin modificaciones, tests ejecutados ni ampliación del alcance.

## Resolución del controller antes de completar

Root leyó la guía cannot-verify y resolvió ambas advertencias:

1. **Primarias/matriz/costos:** Root leyó los logs terminales exactos de los runs del informe, incluidos los fallos e intento inválido de cero jobs. Verificó SHA256 y TAP completo del ZIP FULL2 POST13453165308 y los68 metadatos de compiles; leyó primarias FINAL42109674529/jobs127533595946+127533596479, seis POST y cinco GET PASS y lint10 limpio. La matriz leída y contada contiene exactamente50 POST únicos y37 GET únicos. Son cobertura única agregada con GREEN compatibles y reuso autorizado, **no un run50+37 ni una afirmación de ausencia global de warnings**. Los seis drift GET/dos POST, dos cancelaciones M y restart tienen sus propias primarias recuperadas. El ledger conserva IDs, digests y restricciones de lo que demuestra cada caso. No se repitieron suites ni compiles para esta resolución.
2. **Runtime/publicación/PCoff:** no es un gap de esta unidad; se preservan expresamente como gates posteriores sin acreditar. Última evidencia real de runtime3nov no se actualizó ni se asumió vigente. No permisos, fuentes renovadas, montaje, nueva fase, suscripciones, entrega, retirada pública completa, ARM o ensayo PCoff.

**Ruling Minor1:** diferido, sin fix loop por Minor. Llevar a la siguiente unidad Link, que ya modifica el mismo archivo de prueba, el refuerzo mínimo de settlement observado en los casos de líneas161/244 antes de assertions finales. No atribuir a esos casos una prueba completa de settlement tardío hasta corregirlos. No defecto de producto identificado. Root notificó al diseñador y mantiene registro antes de mount/final whole-branch review.
**Ruling Minor2:** deuda de toolchain/harness vinculada a las advertencias ya registradas; preservar en revisión final, sin upgrades, ampliación de flags o rondas para ocultar salida. Lint10 limpio no implica pipeline sin warnings.

P3 de cookie-list del GET queda **CLOSED en esta unidad**, con Spec✅ y pruebas puras/nativas causales revisadas. Se preserva su historia de deferral. No se transportan las antiguas negativas GET como prueba independiente de correlación: la nueva familia resellada cubre ese requisito.

**Task POST: complete (commits2f96acb..5205d80, Spec✅/Task quality Approved; dos Minor diferidos, cero Critical/Important).** No fix loop. Siguiente unidad Link sigue INACTIVE hasta reconciliación, preflight, BASE y despacho específicos.

operationalReadiness=false; completePackage=false; PCoff=false. C0/C1 y30s/5s originales; techo fuente3nov02:59Z vencido. Ninguna mutación de main, runtime, credenciales, OAuth, Max u otro proyecto.
