import { NextResponse } from 'next/server';
import { getOAuthAuthorizationServerMetadata } from '@/lib/oauth-discovery';

/**
 * RFC 8414 Authorization Server Metadata — /.well-known/oauth-authorization-server
 */
export async function GET() {
  const body = getOAuthAuthorizationServerMetadata();
  return NextResponse.json(body, {
    status: 200,
    headers: {
      'Cache-Control': 'public, max-age=3600',
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
}
