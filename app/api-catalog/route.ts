const origin = 'https://agentfriendlyweb.dev';

export async function GET() {
  return Response.json(
    {
      linkset: [
        {
          anchor: origin,
          'service-desc': [
            {
              href: `${origin}/openapi.json`,
              type: 'application/vnd.oai.openapi+json',
              title: 'Agent Friendly Web public audit API',
            },
          ],
          item: [
            {
              href: `${origin}/.well-known/agent-friendly-cli.json`,
              type: 'application/json',
              title: 'Agent Friendly Web CLI read-only manifest',
            },
            {
              href: `${origin}/schemas/cli-response.v1.json`,
              type: 'application/schema+json',
              title: 'Agent Friendly Web CLI response schema',
            },
            {
              href: `${origin}/cli/index.md`,
              type: 'text/markdown',
              title: 'Agent Friendly Web CLI guide',
            },
            {
              href: `${origin}/.well-known/mcp/server-card.json`,
              type: 'application/json',
              title: 'Agent Friendly Web MCP public read-only deployed service',
            },
            {
              href: `${origin}/schemas/mcp-result.v1.json`,
              type: 'application/schema+json',
              title: 'Agent Friendly Web MCP result schema v1',
            },
            {
              href: `${origin}/mcp-readonly`,
              type: 'text/html',
              title: 'Agent Friendly Web MCP deployed human guide',
            },
          ],
        },
      ],
    },
    {
      headers: {
        'cache-control': 'public, max-age=3600',
        'content-type': 'application/linkset+json; charset=utf-8',
      },
    },
  );
}
