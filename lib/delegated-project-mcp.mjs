import { McpServer } from '@modelcontextprotocol/server';
import { z } from 'zod';
import { readDelegatedProject } from './delegated-project-read.mjs';
import { registerDelegatedDossierEvents } from './delegated-dossier-events.mjs';

function recoveryFor(code,resource) {
  const temporary=['delegated_read_unavailable','revision_conflict'].includes(code);
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

/** Read adapter; authentication and any finite continuity opt-in belong to its OAuth host. */
export function createDelegatedProjectMcpServer({ resolveAuthorization, repository, resource, now, eventsEnabled=false, eventsAuthority, continuityEnabled=false, continuityUntil } = {}) {
  if (typeof resolveAuthorization !== 'function') throw new Error('Trusted authorization resolver required');
  const server = new McpServer({name:'agent-friendly-web-delegated-read',version:'0.1.0'});
  const tools = [
    ['read_project_summary','project_summary','Consulta el resumen guardado y una siguiente pregunta del proyecto autorizado.'],
    ['read_saved_evidence','saved_evidence','Consulta observaciones guardadas y fechadas del origen actual. No ejecuta una nueva auditoria.'],
  ];
  // Exact server opt-in only; no client field can enable this tool.
  if (continuityEnabled === true) tools.push(['read_project_next_step','project_next_step','Consulta un siguiente paso vigente del expediente autorizado. No cambia datos ni ejecuta una auditoría.']);
  for (const [name,operation,description] of tools) {
    const scopes=operation==='saved_evidence'?['afw:project:read','afw:evidence:read']:['afw:project:read'];
    server.registerTool(name, {
      description, inputSchema:operation==='project_next_step'?z.object({expectedRevision:z.number().int().min(1).max(Number.MAX_SAFE_INTEGER).optional()}).strict():z.object({}).strict(),
      annotations:{readOnlyHint:true,destructiveHint:false,idempotentHint:true,openWorldHint:false},
      _meta:{securitySchemes:[{type:'oauth2',scopes}]},
    }, async (args) => {
      let result;
      try {
        // Resolver is server-owned. Never accept grant/owner/project selection as tool input.
        const authorization = await resolveAuthorization();
        result = await readDelegatedProject({
          context:authorization?.context, projectId:authorization?.projectId,
          operation,repository,resource,now,...(operation==='project_next_step'?{expectedRevision:args.expectedRevision,readUntil:continuityUntil}:{}),
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
          : operation==='project_next_step' ? 'Este es un siguiente paso según la lectura vigente. Su fecha y revisión importan; no confirma cambios guardados ni publicados.'
          : 'Estas son las últimas observaciones guardadas. Su fecha importa: no confirman que el sitio siga igual ahora.'}],
      };
    });
  }
  // Exact trusted opt-in only. The OAuth Worker currently supplies neither this
  // flag nor authority, so its read-only runtime and consent remain unchanged.
  if(eventsEnabled===true)registerDelegatedDossierEvents(server,eventsAuthority);
  return server;
}
