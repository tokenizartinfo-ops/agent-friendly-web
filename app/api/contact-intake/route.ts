export async function POST() {
  return Response.json(
    { accepted: false, code: 'contact_capture_disabled' },
    { status: 503, headers: { 'cache-control': 'no-store' } },
  );
}
