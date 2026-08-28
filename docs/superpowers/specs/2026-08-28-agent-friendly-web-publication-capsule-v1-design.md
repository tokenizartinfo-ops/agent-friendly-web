# Agent Friendly Web Publication Capsule v1

**Fecha:** 2026-08-28

**Estado:** aprobado para implementacion como Bloque 5A

**Proyecto:** Agent Friendly Web
**Responsable de producto:** Gabriel Mucchiut

## Objetivo

Convertir un expediente privado y un dominio verificado en una entrega tecnica inmutable, descargable y comprensible que el owner y, cuando corresponda, el mantenedor puedan revisar y aprobar sin compartir credenciales ni habilitar escritura remota.

Esta entrega implementa el handoff manual del Bloque 5. No instala plugins, no abre pull requests, no modifica WordPress, no escribe DNS y no cambia ningun sitio.

## Alcance v1

La capsula v1:

- se genera solo para el owner autenticado del expediente;
- exige que el dominio del expediente conserve una verificacion vigente;
- usa exclusivamente la proyeccion publica allowlisted del intake;
- produce un manifiesto, archivos de contenido y `CHECKSUMS.sha256`;
- calcula un hash del manifiesto y una clave de idempotencia;
- expira siete dias despues de su creacion;
- conserva versiones inmutables en D1;
- permite descargar el JSON completo de handoff;
- obtiene aprobacion separada del owner y del mantenedor cuando el expediente declara custodia tecnica externa;
- muestra rutas, operaciones, tamanos y hashes antes de cualquier aprobacion;
- termina en `approved_for_manual_handoff`, nunca en `applying` o `applied`.

## Recursos generables

| Seleccion del expediente | Archivo incluido | Destino propuesto | Operacion v1 |
| --- | --- | --- | --- |
| `llms` | `files/llms.txt` | `/llms.txt` | `create_or_replace` |
| `llms_full` | `files/llms-full.txt` | `/llms-full.txt` | `create_or_replace` |
| `robots` | `proposals/robots.agent-friendly-snippet.txt` | `/robots.txt` | `manual_merge` |
| `sitemap` | `proposals/sitemap.agent-friendly-entries.xml` | `/sitemap.xml` | `manual_merge` |
| `jsonld` | `proposals/organization.jsonld` | `/` | `manual_embed` |

`openapi`, `mcp` y `skills` no se sintetizan a partir de una declaracion. Se registran como recursos no generados que requieren una herramienta real, contrato verificable y un gate independiente.

`robots.txt` y `sitemap.xml` nunca se reemplazan automaticamente en v1. Sin el contenido vigente completo, la unica salida segura es una propuesta de integracion manual.

## Contrato

El contrato canonico es `agentfriendly.publication-capsule.v1` y contiene:

- identidad de capsula, proyecto, sitio, version y expiracion;
- origen canonico y organizacion;
- modo fijo `manual_handoff`;
- inventario de archivos con destino, operacion, media type, bytes y SHA-256;
- archivos UTF-8 incluidos como texto;
- recursos no generados y motivo;
- aprobaciones requeridas y estado;
- pruebas HTTP posteriores propuestas;
- rollback manual por ruta;
- integridad SHA-256 e idempotencia;
- limites que declaran que no existe firma criptografica ni escritura remota.

El checksum acredita integridad de bytes. No acredita autoria juridica, verdad material ni firma criptografica.

## Aprobaciones

El rol se deriva en el servidor:

- `owner`: coincide el `oai-authenticated-user-id` con el expediente;
- `maintainer`: el email autenticado coincide, sin distinguir mayusculas, con `maintainerEmail`.

El owner es siempre obligatorio. El mantenedor tambien es obligatorio cuando existe un email de mantenedor o el control tecnico es `provider`.

Cada decision usa `agentfriendly.capsule-decision.v1`, el hash exacto del manifiesto y una clave de idempotencia. Una decision sobre otro hash se rechaza. Un rechazo cierra esa version; para corregir contenido se genera una nueva capsula.

## Estados v1

- `owner_approval_pending`;
- `maintainer_approval_pending`;
- `approved_for_manual_handoff`;
- `rejected`;
- `expired`;
- `superseded`.

No existen transiciones a estados de aplicacion en esta entrega.

## Persistencia

D1 incorpora:

- `publication_capsules`: una fila por version inmutable, con capsula JSON, hash, expiracion y estado materializado;
- `capsule_approvals`: decisiones idempotentes vinculadas a capsula, rol, actor y hash.

Los eventos operativos se siguen registrando en `project_events` con metadata resumida. No se guardan contrasenas, cookies, tokens, Authorization headers ni secretos de proveedores.

## Experiencia humana

El expediente agrega una seccion "Capsula de implementacion" con:

1. explicacion del alcance;
2. requisitos y recursos seleccionados;
3. boton explicito para preparar una version;
4. inventario de archivos y operaciones;
5. estado de las aprobaciones;
6. descarga JSON;
7. enlace privado de revision para el mantenedor;
8. aprobacion o rechazo con lenguaje no tecnico.

La pagina privada `/capsula/[projectId]` permite al owner y al mantenedor autenticados revisar exactamente la misma version. No expone el resto del expediente al mantenedor.

## Seguridad

La generacion falla cerrada ante:

- identidad ausente o actor no autorizado;
- dominio inexistente, cambiado o con verificacion vencida;
- cero recursos generables;
- ruta fuera de la allowlist;
- contenido mayor a los limites;
- secreto probable en el contenido generado;
- capsula vencida;
- hash de manifiesto distinto;
- rol pedido por el cliente que no coincide con el rol derivado;
- idempotencia reutilizada para otra decision.

Los archivos se generan desde campos publicos saneados. `notes`, emails privados, proveedor, hosting y datos operativos no ingresan en el paquete.

## Pruebas de aceptacion

1. El generador es determinista para los mismos datos, version y fecha.
2. Cada archivo y el manifiesto tienen SHA-256 reproducible.
3. Las rutas generadas pertenecen a una allowlist cerrada.
4. `robots` y `sitemap` se marcan como integracion manual.
5. `openapi`, `mcp` y `skills` se informan como no generados.
6. El owner no puede aprobar un hash diferente.
7. El mantenedor no puede aprobar si su email autenticado no coincide.
8. Una misma clave de idempotencia no crea dos decisiones.
9. Sin todas las aprobaciones exigidas, el estado nunca es `approved_for_manual_handoff`.
10. La UI explica que descargar o aprobar no modifica el sitio.
11. `npm test`, `npm run lint` y `npm run build` terminan correctamente.

## Fuera de alcance

- ZIP criptograficamente firmado;
- firma con clave de servicio;
- contenido anterior completo y diff textual persistido;
- GitHub App o Draft PR real;
- plugin o Ability WordPress;
- filesystem remoto, SFTP, cPanel o Cloudflare Bridge;
- Secret Broker o Credential Injector;
- merge, deploy, DNS, billing o publicacion automatica;
- verificacion HTTP posterior y rollback ejecutado.

## Gate siguiente

Despues de verificar esta entrega con datos sinteticos y uso humano, el siguiente gate sera el adaptador Git en modo local/Draft PR sin merge. Una escritura contra un proveedor o un sitio real exige aprobacion separada.
