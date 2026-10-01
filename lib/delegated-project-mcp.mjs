import { McpServer } from '@modelcontextprotocol/server';
import { z } from 'zod';
import { readDelegatedProject } from './delegated-project-read.mjs';

/** Local adapter. No HTTP endpoint is exposed; token validation belongs to its future OAuth host. */
export function createDelegatedProjectMcpServer({ resolveAuthorization, repository, resource, now } = {}) {
  if (typeof resolveAuthorization !== 'function') throw new Error('Trusted authorization resolver required');
  const server = new McpServer({name:'agent-friendly-web-delegated-read',version:'0.1.0'});
  for (const [name,operation,description] of [
    ['read_project_summary','project_summary','Consulta el resumen guardado y una siguiente pregunta del proyecto autorizado.'],
    ['read_saved_evidence','saved_evidence','Consulta observaciones guardadas y fechadas del origen actual. No ejecuta una nueva auditoria.'],
  ]) {
    server.registerTool(name, {
      description, inputSchema:z.object({}).strict(),
      annotations:{readOnlyHint:true,destructiveHint:false,idempotentHint:true,openWorldHint:false},
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
        isError:true,structuredContent:result,
        content:[{type:'text',text:'No pude consultar ese proyecto con el permiso actual. Podés revisar la conexión en AFW.'}],
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
