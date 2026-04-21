import { NextResponse } from 'next/server';
import { DEFAULT_PSEO_CONFIG } from '@/lib/pseo/types';

const BASE = DEFAULT_PSEO_CONFIG.baseUrl.replace(/\/$/, '');
const ACP_VERSION = '2026-04-08';

/**
 * Agentic Commerce Protocol discovery (RFC-style).
 * @see https://github.com/agentic-commerce-protocol/agentic-commerce-protocol/blob/main/rfcs/rfc.discovery.md
 */
export async function GET() {
  const body = {
    protocol: {
      name: 'acp',
      version: ACP_VERSION,
      supported_versions: [ACP_VERSION],
      documentation_url: 'https://agenticcommerce.dev',
    },
    api_base_url: `${BASE}/api`,
    transports: ['rest'],
    capabilities: {
      services: ['checkout'],
    },
  };

  return new NextResponse(JSON.stringify(body), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
