import { NextResponse } from 'next/server';

/**
 * Authorization endpoint advertised in discovery metadata.
 * Public APIs are unauthenticated; premium routes use x402 — interactive OAuth is not the primary path.
 */
export async function GET() {
  return NextResponse.json(
    {
      error: 'unsupported',
      error_description:
        'Public JSON APIs do not require OAuth. See /openapi.json. Premium access uses x402 at /api/x402/premium when configured.',
    },
    { status: 501 },
  );
}
