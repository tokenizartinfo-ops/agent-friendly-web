# AFW: política aislada de elección para preparación

19oct2026. Fuente interna; sin montaje ni consentimiento real.
Implementa solo Step1 del diseño docs/superpowers/specs/2026-10-19-afw-preparation-consent-mount.md.

## API y procedencia
evaluatePreparationConsentChoice(choice,policy,clock) recibe elección del formulario como dato estricto y política/reloj EXPLÍCITOS aportados por el servidor.
choice: {decision:'read'|'drafts'|'cancel'}.
policy: {enabled:true,requestedScopes,transactionStartedAt,transactionExpiresAt,trialStartedAt,trialExpiresAt}.
clock: {now}. Fechas son enteros epoch-ms0..8640000000000000, NO segundos SDK.

El opt-in y los campos de política no autentican nada. No aceptar estos objetos desde argumentos MCP, JSON/header del usuario o respuesta de un modelo como contexto confiable. El futuro host debe verificar cliente/subject/proyecto/resource/PKCE, transacción original de un uso, elección visible, esquema, dominio/owner y ventanas; esta función no lo hace ni invoca dependencia para hacerlo. Ningún caller de runtime se añade.

## Resultado
Contrato agentfriendly.preparation-consent-policy.v1. choice_valid significa únicamente que la regla pura admite la selección candidata:
- read devuelve solo afw:project:read;
- drafts devuelve read + afw:capsule:prepare solo si ambos estaban solicitados originalmente;
- cancel devuelve cancelled sin scopes/fecha.

Otros conjuntos, duplicados, entradas extra/accesores/listas no densas/excesivas, decisiones desconocidas y clocks inválidos se rechazan sin eco de datos privados. Campos de salida fijos, objeto y lista congelados; no se conservan referencias mutables de entrada.

Ambas ventanas deben ser no vacías,<=10min; el inicio de transacción debe estar dentro del ensayo. now debe estar dentro de AMBAS ventanas, con fin exclusivo. expiresAt=min(fin original transacción,fin original ensayo,now+10min). Una aprobación tardía no concede diez minutos nuevos. Códigos unavailable/expired/invalid_choice/cancelled nunca traen scopes ni expiresAt.

TODAS las salidas conservan refreshAllowed=false, consentRecorded=false, grantIssued=false, executionAllowed=false, chargeAllowed=false y publicationAllowed=false. Una selección válida no es un grant, consentimiento guardado, autorización de publicación/instalación o cobro, ni promesa de disponibilidad.

## Reloj, estado y límites
Función sin IO ni lectura automática de reloj; un argumento now no prueba que el reloj sea correcto. Rechazar tiempo anterior al inicio no detecta todo rollback posible dentro de una ventana. El host conserva su comprobación original pared+monotónico por request y vencimientos absolutos persistidos; performance.now no se compara entre isolates/peticiones. No usar el helper para renovar plazos.

La regla no guarda/concilia grants o estados, registra scopes o clientes, ofrece refresh, verifica tokens, migra D1, renderiza UI ni registra MCP. El perfil existente de lectura no cambia. Sin pruebas de criptografía/PKCE/consentimiento humano/runtime por estos tests puros; PR509 cubre otra composición con autoridad sintética.

## Verificación y continuación
El plan y16tests de comportamiento se publican antes del módulo; se conserva RED de Actions y luego GREEN exacto en PR511/issue497. La revisión fresca y CI de merge cierran aceptación de fuente; recibos llevan SHA/tree/run, no inferir éxito desde este borrador.
Próximo: Step2 store/SDK/auth-code/PKCE y consistencia del consentimiento, luego UI/montaje/esquema/ensayo real por gates separados. No abrir OAuth/OTP/credenciales o grants nuevos para comprobar esta regla.
G2 aceptado/CLOSED. Container02382110, aviso/revisión útil/baja nativa/PC-off/Max pendientes. operationalReadiness=false.
