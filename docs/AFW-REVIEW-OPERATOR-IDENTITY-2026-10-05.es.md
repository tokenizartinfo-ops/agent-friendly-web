# AFW: identidad de operador preparada, sin ruta nueva

resolveOperationsReviewOperator en lib/operations-review-operator.mjs es un resolver interno. Configuración y claves son dependencias del servidor, nunca contenido enviado por la persona o el asistente receptor. No crea aplicación Access, política, endpoint, interfaz, sesión ni permiso de escritura.

Requiere enabledtrue explícito, origin HTTPS de un subdominio propio exactamente configurado y sin puerto, subject humano específico y audiencia de revisión distinta de la audiencia receptora. Verifica firmaRS256/issuer mediante el verificador existente; además exige audiencia única, subject sin normalización ambigua y exp entero vigente. No acepta un servicio con sub vacío ni identidad declarada en un encabezado de email. Ante error devuelve únicamente okfalse.

Una identidad verificada produce operatorId opaco mediante SHA256 de contexto propio afw-operations-review-operator-v1/equipo/audiencia/subject. La respuesta no incluye email, subject o token. El identificador separa contextos de política y no representa por sí solo permiso de reparación, envío o acceso a expedientes.

Cinco tests con claves y JWT sintéticos cubren identidad exacta/id estable/separación de audiencia, recepción/servicio/subject incorrecto/audiencias múltiples, firma/issuer/exp inválidos, configuración cerrada sin resolver claves y reloj/origin inválidos. El módulo faltante se observó en RED antes de implementarlo; suite831/831, lint cero errores/dos warnings previos y build completo. No cambios de runtime o custodia remota.

Próximo adaptador deberá usar audiencia/política de operador dedicada y contexto obtenido del servidor, sin reutilizar identidad receptora. La protección CSRF, cuerpos/limites/idempotencia y vínculo al journal requieren pruebas propias: este resolver no sustituye esos controles ni acredita autorización desplegada. Antes de cualquier promoción declarar recurso propio y rollback, comprobar política/identidad con evidencia y conservar el cierre.
