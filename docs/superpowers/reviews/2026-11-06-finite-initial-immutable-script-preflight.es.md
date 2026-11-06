# Preflight Root — integridad de script inmutable en Task2

SOURCE ONLY / SYN; operacionalmente readiness=false, completePackage=false, PCoff=false. Este ruling amplía Task2 de11 a13code/testpaths; no otra unidad, permisos o runtime.

## Primaria y causa concreta

Run42135912817/job127623868291/HEADc94a015d,1FAIL0PASS0CANCEL0SKIP8492.11293ms. Root leyó la primaria. La child de lectura baseline rechazó con alive=true, aborted=false, began1793924363155, until1793924368155, wall/monotonic1793924368159:5004ms para límite5000, sin rechazo de holders o parentclock. BaselineSYN2445218bytes,599reader.read,readMs80,postReadGuardMs4714. Custody y pointer pertenecían a esa misma child. Material entry/once/material/selector/ack se habían escrito (7transactions/2sync), sin uploadSEND/POST ni capsule. No es autenticación/M1/Cloudflare real. Guardstate capturó condición ya fallida, sin alterar guard/status/plazos.

M1952190B/hash7c4e8cae6b2ccd95279962bd9e81af114e866bbf0d3d77149914f313e50776f8; QA instrumentada1959383B/hash323416d8... según writer; Root no usa prefijo como hash completo. Los módulos se fijaron antesupstream. Artifact13466340898 SHA256feef939238bec8be9b8bf7fc59d9c08382724fa89fdf7a94e5ce96ebeff8fd2b expira13Nov00:19:28UTC. Métricas describen esteSYN, no runtime/garantía general.

## Scope adicional autorizado

- lib/mcp-qa-finite-initial-material.mjs BASEblobf2d3749bec147ce45e0bf623710df0900e691071.
- test/mcp-qa-finite-initial-material-native.test.mjs BASEblob9b91c7c64cef5cd3677adef03e666815a351dc7f.

initial-entry.mjs c5ae0f53bee077c693d7f0a0599bbb6347648fee y initial-lease.mjs a9cc083baae71c89af2f6436c00571dc8e7a20c9 siguen PROTEGIDOS. No adaptar límites, cuerpos/tamaños/chunking/artefactos, fuente ni inicialización para ocultar coste.

## Invariante y cambio permitido

Root leyó initial-material completo. collect decodifica script local de bytes, valida sha(bytes),sha(script),length contra candidate.module y construye result/originalContext/artifact con Object.freeze. results WeakMap privado acredita objeto original y originalLease. El texto script es un primitivo inmutable ya verificado; no necesita recalcular suSHA en cada reader.read.

Permitir SOLO capturar en ese WeakMap referencias exactas originalContext y artifact recién construidos, más script LOCAL previamente validado; assertCurrent compara referencias y valor con esas capturas privadas en vez de rehashear ese script. No seleccionar cache de un DTO ajeno, no memoizar DATA mutable ni crear aprobación. Persisten todos los demás checks: r.check, holders, lease original, materialHash+recordHash, candidateBytes Uint8Array/type/length/SHA en cada llamada; todos los rechecks y retención de trabajo real. El hash de la copia privada de bytes en initial-entry NO se cambia. Sin export/API/callback/reloj nuevo.

## Cierre exigido

Cobertura pertinente existente+nueva de ownership/forgery y modificación real de candidateBytes en el testmaterialnative, sin fixture duplicado ni tests espejo de número deSHA. Reproducir upstream real con MISMO módulo/respuesta fragmentada599reads y límites30s/5s, hasta material_recorded; después demostrar RED native causal de dispatch antes de modificar mountsP4–P8. Si no alcanza, conservar primaria y devolver causa a Root antesotro cambio/run.

Writer implement_first_connection_mount confirmó scope13 y comenzó prerequisite únicamente sobre material; reportó WeakMap con script LOCAL y guard mutable conservado en65e27397/c0ee5315, prerequisite HEAD6c304fcf con2jobs material5seleccionados/native1. Estado y resultado todavía no verificadosRoot aquí. Root no escribeSOURCE durante writer.

La ampliación y rulingSIZE413 de4assertions se documentan en reporte/ledger Task2; Root reconciliará plan/brief al cierre. Revisión fresca Task2 debe cubrir13paths e invariantes. No aceptación de Task2, SourceCloudProof oPCoff por esta nota.
