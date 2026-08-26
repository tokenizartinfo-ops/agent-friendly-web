const origin = 'https://agent-friendly-web.tokenizart.chatgpt.site';

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

