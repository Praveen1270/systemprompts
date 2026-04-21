import { NextResponse } from 'next/server';
import { DEFAULT_PSEO_CONFIG } from '@/lib/pseo/types';

const BASE = DEFAULT_PSEO_CONFIG.baseUrl.replace(/\/$/, '');
const UCP_VERSION = '2026-04-08';

/**
 * Universal Commerce Protocol business profile + flat discovery fields for tooling.
 * @see https://ucp.dev/specification/overview/
 */
export async function GET() {
  const ucp = {
    version: UCP_VERSION,
    services: {
      'dev.ucp.shopping': [
        {
          version: UCP_VERSION,
          spec: `https://ucp.dev/${UCP_VERSION}/specification/overview`,
          transport: 'rest',
          endpoint: `${BASE}/api`,
          schema: `https://ucp.dev/${UCP_VERSION}/services/shopping/rest.openapi.json`,
        },
      ],
    },
    capabilities: {
      'dev.ucp.shopping.checkout': [
        {
          version: UCP_VERSION,
          spec: `https://ucp.dev/${UCP_VERSION}/specification/checkout`,
          schema: `https://ucp.dev/${UCP_VERSION}/schemas/shopping/checkout.json`,
        },
      ],
    },
  };

  const body = {
    protocol_version: UCP_VERSION,
    services: ucp.services,
    capabilities: ucp.capabilities,
    endpoints: {
      rest_api: `${BASE}/api`,
      openapi: `${BASE}/openapi.json`,
      mcp_server_card: `${BASE}/.well-known/mcp/server-card.json`,
      x402_premium: `${BASE}/api/x402/premium`,
      ucp_spec: `https://ucp.dev/${UCP_VERSION}/specification/overview`,
    },
    ucp,
  };

  return new NextResponse(JSON.stringify(body), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
