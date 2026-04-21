import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import {
  getDiscoveryBaseFromRequest,
  getOAuthProtectedResourceMetadata,
} from '@/lib/oauth-discovery';

/**
 * RFC 9728 OAuth Protected Resource Metadata
 */
export async function GET(request: NextRequest) {
  const base = getDiscoveryBaseFromRequest(request);
  const body = getOAuthProtectedResourceMetadata(base);
  return NextResponse.json(body, {
    status: 200,
    headers: {
      'Cache-Control': 'public, max-age=3600',
      'Content-Type': 'application/oauth-protected-resource+json; charset=utf-8',
    },
  });
}
