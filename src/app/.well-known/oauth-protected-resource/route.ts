import { NextResponse } from 'next/server';
import { getOAuthProtectedResourceMetadata } from '@/lib/oauth-discovery';

/**
 * RFC 9728 OAuth Protected Resource Metadata
 */
export async function GET() {
  const body = getOAuthProtectedResourceMetadata();
  return NextResponse.json(body, {
    status: 200,
    headers: {
      'Cache-Control': 'public, max-age=3600',
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
}
