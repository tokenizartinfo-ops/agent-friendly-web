# Dependencias del publicador cerrado precompilado ·26oct2026

## Hallazgo y fuentes
La consulta real15:49UTC devolvió unknown por incidente dv2vbq9kbgxn/WorkersBuilds. No hay respuesta técnica nueva en correo a15:53UTC. Nuestro publicador recibe bytes compilados enGitHub y usa únicamente GET/POST de WorkerVersions más D1/Workflows; lib/mcp-closed-version-upload.mjs no invoca Builds API ni integraciónGit.
Cloudflare distingue [Builds](https://developers.cloudflare.com/workers/ci-cd/builds/), [CIexterno](https://developers.cloudflare.com/workers/ci-cd/external-cicd/github-actions/) y [versiones/despliegues](https://developers.cloudflare.com/workers/versions-and-deployments/deployment-management/). Status identifica WorkersBuilds como componente vcpsk0w6g86k, distinto del runtimeWorkers57srcl8zcn7c. Inferencia arquitectónica: este paso no solicita una compilación al proveedor. NO demuestra salud deAPI ni la causa del ensayo anterior.

## Decisión acotada
Perfil por defecto all-workers conserva conducta conservadora. Perfil NUEVO prebuilt-closed-publication únicamente para policy.operation publish, elegido por bundle fijo validado en el Workflow, nunca por payload/cliente. Solo clasifica no bloqueante un incidente activo con título corto inequívoco de Builds y componente/actualizaciones EXCLUSIVAMENTE WorkersBuilds, con ID y nombres oficiales concordantes. Metadata ausente, mezcla, contradicción, otroID/nombre, fecha/status inválido o título ambiguo mantienen bloqueo/unknown. No ignorar texto solo por contenerbuilds. Ningún incidenteWorkersgenérico/runtime/API/Cron/D1/DO/Containers/Workflows queda excluido.
El estado resolved con este perfil significa únicamente que no se observó un impedimento aplicable al paso precompilado; operationalReadiness siguefalse. Recibo declara perfil y referencias no bloqueantes saneadas. No cambia1GET/5s/262144bytes/cero redirects/retries ni reloj/ventana/hash/journal/basecerrada/permisos.
La consulta manualmain usará explícitamente el perfilprecompilado y declarará su alcance; confirmaciónnombrada, CLIpor defecto y otros consumidores conservan all-workers.

## Implementación y cierre
1. RED enGitHub: Builds exclusivo permite solo perfilprecompilado; ambigüedades/dependencias siguen cerradas; mismoGET sin credenciales; nativepublish genera una versión INACTIVA y un recibo únicamente bajo permiso/ventana propios.
2. Cambio mínimo; GREEN completo+paquete22checks/build; una revisión independiente, resolver Important sin segunda revisión.
3. Integrar y verificarmain; consulta pública única. Eso no activa recursos. Solo luego una NUEVA ventana depublicación, jamás reusar a5ea consumido, conRollback2033/Workflow8acb y canary002aa960.
Sin tokens nuevos, OAuth, clientes, suscripción, cron o Max. No afirmarPCoff ni guardia. Rollbackfuente: revertirPR;runtime siguecerrado hasta admisión independiente.
