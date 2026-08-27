# Seguridad

## Modelo v1

El auditor realiza consultas GET a recursos publicos. No inicia sesion en el sitio objetivo, no ejecuta JavaScript remoto, no sigue redirecciones y no modifica datos.

Controles implementados:

- solo HTTP/HTTPS;
- sin credenciales en URL;
- sin puertos alternativos;
- rechazo de localhost y rangos privados conocidos;
- verificacion DNS A/AAAA mediante Cloudflare DoH;
- rechazo si alguna respuesta resuelve a una direccion privada;
- timeout por consulta;
- limite de lectura por respuesta;
- redirecciones deshabilitadas;
- validacion por contenido para evitar falsos positivos de paginas 200/404;
- expedientes protegidos mediante Sign in with ChatGPT;
- campos allowlisted y eventos metadata-only.

## Fronteras del Registry y del expediente

- El escaner publico continua siendo read-only y no persiste resultados.
- Guardar una observacion requiere sesion, propiedad del expediente y `confirmSave: true`.
- La observacion persistida conserva URL normalizada, fecha, evidencia booleana, puntuacion y metadata tecnica limitada. Descarta cuerpos, errores crudos, stacks, cookies y cabeceras sensibles.
- La verificacion de dominio prueba control temporal mediante archivo HTTP o TXT DNS. No entrega acceso al hosting, CMS, DNS ni codigo.
- Los challenges vencen, no pueden reutilizarse y fallan cerrados tras diez intentos.
- Publicar exige dominio vigente, coincidencia exacta del hostname, contrato `agentfriendly.owner-attestation.v1` y `confirmPublicProjection: true`.
- El perfil publico se construye desde una proyeccion allowlisted. Emails operativos, notas internas y campos privados no forman parte del contrato publico.
- Cada publicacion crea una version nueva. Las versiones publicadas son inmutables; la version anterior queda superseded pero puede conservarse como evidencia historica.
- Un perfil incorporado como caso curado no puede ser reemplazado por un registro D1 con el mismo slug.

## Evidencia y afirmaciones

El Registry separa tres estados:

- `owner_declared`: afirmado y autorizado por el responsable;
- `observed`: comprobado en una fuente publica fechada;
- `verified`: control del dominio comprobado por un challenge vigente.

Ninguno de estos estados certifica indexacion, recomendacion, posicionamiento, seguridad integral ni adopcion por un proveedor de IA.

## Auditoria y minimizacion

Los eventos privados contienen identificadores, tipo de accion, fecha y campos presentes, no el contenido completo de formularios. No se registran secretos, valores de challenge, respuestas remotas completas ni datos de pago. El Registry publico solo enlaza fuentes que el owner autorizo o que fueron observadas publicamente.

## Riesgos residuales

- La resolucion comprobada por DoH y la resolucion utilizada luego por `fetch` no son una unica operacion atomica. Antes de escalar el servicio deben agregarse controles de red de plataforma, rate limiting y observabilidad anti-SSRF.
- Un sitio puede entregar contenido diferente segun ubicacion, user-agent o momento.
- La auditoria no ejecuta la aplicacion; por lo tanto no acredita herramientas que solo aparecen tras interaccion JavaScript.
- La deteccion semantica es conservadora y puede requerir revision humana.

## Prohibiciones

No ingresar en formularios, issues o expedientes:

- contraseñas;
- cookies de sesion;
- API keys;
- claves privadas;
- secretos de Cloudflare, CMS, hosting o registrador;
- datos personales que no sean necesarios para identificar al responsable del expediente.

## Antes de uso amplio

1. Rate limiting por identidad, IP y dominio.
2. Cola de trabajos y limite de concurrencia por host.
3. Politica de retencion y borrado del expediente.
4. Exportacion y revocacion por el propietario.
5. Monitoreo de abuso, presupuesto y disponibilidad.
6. Revision independiente de SSRF y autorizacion.
7. Revocacion y republicacion con evidencia de version anterior.
8. Monitoreo de challenges, publicaciones y colisiones de dominio.

