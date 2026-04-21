import { NextResponse } from 'next/server';
import { getOpenIdConfigurationMetadata } from '@/lib/oauth-discovery';

/**
 * OpenID Connect Discovery 1.0 — /.well-known/openid-configuration
 */
export async function GET() {
  const body = getOpenIdConfigurationMetadata();
  return NextResponse.json(body, {
    status: 200,
    headers: {
      'Cache-Control': 'public, max-age=3600',
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
}
