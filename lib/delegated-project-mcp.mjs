import { McpServer } from '@modelcontextprotocol/server';
import { z } from 'zod';
import { readDelegatedProject } from './delegated-project-read.mjs';

function recoveryFor(code,resource) {
  const temporary=code==='delegated_read_unavailable';
  const optional=code==='insufficient_scope';
  return {
    action:temporary?'retry_read':optional?'review_optional_scope':'review_connection',
    causeConfirmed:optional,
    automaticReconnect:false,
    lastKnownContext:'historical_only',
    connectionsUrl:new URL('/connections',resource).href,
    dossierUrl:'https://agentfriendlyweb.dev/expediente',
    message:optional
      ? 'El alcance presentado no incluye esas observaciones. Podemos intentar consultar el resumen; también requiere un permiso vigente. Compartir evidencia es opcional y requiere tu elección.'
      : temporary
        ? 'No pude consultar el expediente en este momento. Podemos reintentar la lectura, sin ampliar permisos.'
        : 'No pude consultar el expediente con esta conexión. Revisá el permiso en AFW; esta respuesta no confirma si venció o fue retirado.',
    guidance:'Conservá la última pregunta y los datos ya conversados como contexto previo, sin afirmar que siguen actualizados. No inventes campos, confirmes guardados pendientes ni vuelvas a conectar automáticamente. Ofrecé un paso a la vez.',
  };
}

/** Local adapter. No HTTP endpoint is exposed; token validation belongs to its future OAuth host. */
export function createDelegatedProjectMcpServer({ resolveAuthorization, repository, resource, now } = {}) {
  if (typeof resolveAuthorization !== 'function') throw new Error('Trusted authorization resolver required');
  const server = new McpServer({name:'agent-friendly-web-delegated-read',version:'0.1.0'});
  for (const [name,operation,description] of [
    ['read_project_summary','project_summary','Consulta el resumen guardado y una siguiente pregunta del proyecto autorizado.'],
    ['read_saved_evidence','saved_evidence','Consulta observaciones guardadas y fechadas del origen actual. No ejecuta una nueva auditoria.'],
  ]) {
    const scopes=operation==='project_summary'?['afw:project:read']:['afw:project:read','afw:evidence:read'];
    server.registerTool(name, {
      description, inputSchema:z.object({}).strict(),
      annotations:{readOnlyHint:true,destructiveHint:false,idempotentHint:true,openWorldHint:false},
      _meta:{securitySchemes:[{type:'oauth2',scopes}]},
    }, async () => {
      let result;
      try {
        // Resolver is server-owned. Never accept grant/owner/project selection as tool input.
        const authorization = await resolveAuthorization();
        result = await readDelegatedProject({
          context:authorization?.context, projectId:authorization?.projectId,
          operation,repository,resource,now,
        });
      } catch { result = {status:503,code:'delegated_read_unavailable'}; }
      if (result.status !== 200) return {
        isError:true,structuredContent:{...result,recovery:recoveryFor(result.code,resource)},
        // Only missing scope prompts step-up. Revocation remains a denial.
        ...(result.code==='insufficient_scope'?{_meta:{'mcp/www_authenticate':[
          `Bearer resource_metadata="${new URL(`/.well-known/oauth-protected-resource${new URL(resource).pathname}`,resource).href}", error="insufficient_scope", error_description="Evidence read requires additional consent", scope="${scopes.join(' ')}"`,
        ]}}:{}),
        content:[{type:'text',text:`${recoveryFor(result.code,resource).message} Podemos conservar la última pregunta mientras revisamos el siguiente paso. No pude comprobar cambios nuevos.`}],
      };
      return {
        structuredContent:result,
        content:[{type:'text',text:operation==='project_summary'
          ? 'Este es el resumen guardado de tu proyecto. Podemos avanzar con una pregunta a la vez.'
          : 'Estas son las últimas observaciones guardadas. Su fecha importa: no confirman que el sitio siga igual ahora.'}],
      };
    });
  }
  return server;
}
