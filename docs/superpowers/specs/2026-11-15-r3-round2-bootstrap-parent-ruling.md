# AFW — relación inicial Bash a Node bootstrap, ronda 2

Decisión Root: 2026-11-15 08:40:47 UTC. Amplía la integración DATA de N05 a la relación inicial real; no autoriza una ejecución.

El borrador heredado invoca Node directamente desde Bash en F7. No debe conservar esa excepción mientras el harness utiliza el shim. Se acepta un shim Python Source literal, sin proceso residente adicional, que arme y compruebe la señal de muerte del creador antes de reemplazarse mediante exec por Node.

El único descubrimiento inicial permitido es el ejecutable literal `node` en el PATH producido por el setup-node exitoso de esta ejecución GitHub. Abrir y conservar ese mismo objeto como fd3; verificar tipo, UID, permisos y ausencia de set-id/capabilities antes de exec. No se crea un selector RPC ni se acepta una ruta, PID, módulo o comando del consumidor. fd4 debe representar al Bash creador real y conservar las comprobaciones de relación/identidad previas y posteriores al armado ya definidas.

El proceso Node debe comprobar versión exacta 22.23.4, contexto GitHub y que fd3 corresponde al mismo objeto de /proc/self/exe antes de materializar helpers o admitir autoridades. La selección inicial confiada en setup-node no constituye una prueba criptográfica independiente del binario.

Preferencia mínima: reutilizar las mismas primitivas de `lifetime.py`, con un rol Source fijo para exec de Node y stdin bootstrap. El código incrustado en F7 y el helper deben coincidir exactamente en esas primitivas; evitar una segunda implementación divergente. El harness debe ejercer esa misma entrada de arm/exec, conservando L04 y la matriz de 100 casos. Ningún proceso residente, capacidad genérica de ejecución ni servicio nuevo.

Todos los límites siguen vigentes: raw 400.000; helper 32.768; SAME 1.800.000; gzip 98.304; base64 131.072. Re-medir después de la integración y declarar cualquier exceso antes de candidata. Los relojes y la cobertura no cambian.

Los blobs provisionales raw4163aa4ab0330dbaf3aa3b86057796cfcde75220, gzip355ea9a512963a4478c33177fa5a747026c14093 y manifiestoab651d575dd6b77d1a80f5a23950ec101c8dc03d no son un paquete liberado ni califican Source.

Source permanece cerrado1fe20347, sin CAS pendiente. No hay nueva evidencia de runtime, causa del R3 original, retirada o PC-off.
