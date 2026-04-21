import { NextResponse } from 'next/server';

/**
 * JWK Set for JWKS URI (discovery). Empty until interactive OAuth signing keys are provisioned.
 */
export async function GET() {
  return NextResponse.json(
    { keys: [] },
    {
      status: 200,
      headers: {
        'Cache-Control': 'public, max-age=3600',
        'Content-Type': 'application/json; charset=utf-8',
      },
    },
  );
}
