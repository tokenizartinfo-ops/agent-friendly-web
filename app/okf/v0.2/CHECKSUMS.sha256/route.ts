import { OKF_V02_CHECKSUMS } from './checksums.generated';

export function GET() {
  return new Response(OKF_V02_CHECKSUMS, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=300',
    },
  });
}
