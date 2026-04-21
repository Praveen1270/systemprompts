import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json(
    {
      error: 'unsupported_grant_type',
      error_description:
        'Token issuance is not used for public APIs. Use /api/prompts and /api/prompt without a token; see /openapi.json.',
    },
    { status: 501 },
  );
}
