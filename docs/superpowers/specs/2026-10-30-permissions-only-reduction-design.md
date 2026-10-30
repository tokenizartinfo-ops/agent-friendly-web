# Retirada exclusiva de permisos, sin petición de parada

AFW. 30oct2026. Fuente privada, sin integración ni despliegue.

## Motivo

El helper legacy createOwnPermissionWithdrawal retira avisos/OAuth e intenta closeOriginal incluso si no hubo admisión. La custodia puede entonces conservar una cancelación NULL. No se borran registros previos. Para el cierre futuro sin admisión se necesita una operación explícita de permisos sin acceso a close/start/destroy.

## Diseño decidido

Dos constructores estrictos que usan un núcleo privado común: el legacy conserva exactamente su interfaz y comportamiento; createOwnPermissionsOnlyReduction acepta las mismas opciones excepto close. No admite close, mode, requestStop u otro selector por datos. El wrapper fija internamente la omisión del paso de parada.

El recibo nuevo tiene propósito afw.own-permissions-only-reduction.v1. runtimeStopRequested, physicalStopVerified, nativeWithdrawalVerified y operationalReadiness son siempre false. permissionsWithdrawn solo se confirma por dos reconciliaciones primarias estables de OAuth y monitor. No implica ausencia de proceso ni permiso de restauración.

El núcleo conserva los SQL, CAS, idempotencia, ventanas y leases originales de cinco segundos. Revocar permisos no requiere admisión cero; cuando exista un proceso tampoco se solicita parada desde este helper. El futuro fallback sí exigirá su propia prueba primaria de admisión cero, inventario nativo vacío, named Workflow terminal y versiones/punteros exactos.

No callback ficticio, recibo de parada inventado, excepción usada para simular omisión, payload/RPC nuevo, schema ni flags nuevos. El bundle congelado315 no cambia; el consumidor futuro será un wrapper privado de QA con binding/alcance verificados por separado.

## Verificación

TDD cloud: RED de export inexistente con baseline legacy válido; nativo D1 sin admisión retira ambos permisos sin crear cierre; con admisión conserva admisión y cierre y jamás pide parada; replay conserva fecha OAuth y un único revoke. Rechazo de selector/callback extra, permiso/consentimiento ajeno, vencimiento, ACK perdido y una reducción parcial. Suite legacy completa conserva la petición de cierre. Revisión independiente y CI antes de integrar; sin runtime acceptance.
