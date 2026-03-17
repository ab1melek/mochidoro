/**
 * GET /api/v1
 * Health check
 */

export async function GET(request) {
  return Response.json({ message: '✅ API v1 working' });
}
