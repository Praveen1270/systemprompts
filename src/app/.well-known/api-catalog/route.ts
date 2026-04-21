import { NextResponse } from 'next/server';
import { DEFAULT_PSEO_CONFIG } from '@/lib/pseo/types';

const PROFILE = 'https://www.rfc-editor.org/info/rfc9727';
const BASE = DEFAULT_PSEO_CONFIG.baseUrl.replace(/\/$/, '');

/**
 * RFC 9727 API catalog (application/linkset+json).
 */
export async function GET() {
  const catalog = {
    linkset: [
      {
        anchor: `${BASE}/.well-known/api-catalog`,
        item: [
          { href: `${BASE}/api/prompts` },
          { href: `${BASE}/api/prompt` },
          { href: `${BASE}/api/x402/premium` },
          { href: `${BASE}/.well-known/ucp` },
          { href: `${BASE}/.well-known/acp.json` },
        ],
      },
      {
        anchor: `${BASE}/api/prompts`,
        'service-desc': [
          {
            href: `${BASE}/openapi.json`,
            type: 'application/openapi+json',
          },
        ],
        'service-doc': [
          {
            href: `${BASE}/submit`,
            type: 'text/html',
          },
        ],
        status: [
          {
            href: `${BASE}/api/health`,
            type: 'application/json',
          },
        ],
      },
      {
        anchor: `${BASE}/api/prompt`,
        'service-desc': [
          {
            href: `${BASE}/openapi.json`,
            type: 'application/openapi+json',
          },
        ],
        'service-doc': [
          {
            href: `${BASE}/submit`,
            type: 'text/html',
          },
        ],
        status: [
          {
            href: `${BASE}/api/health`,
            type: 'application/json',
          },
        ],
      },
      {
        anchor: `${BASE}/api/x402/premium`,
        'service-desc': [
          {
            href: `${BASE}/openapi.json`,
            type: 'application/openapi+json',
          },
        ],
        'service-doc': [
          {
            href: 'https://docs.x402.org',
            type: 'text/html',
          },
        ],
        status: [
          {
            href: `${BASE}/api/health`,
            type: 'application/json',
          },
        ],
      },
    ],
  };

  return new NextResponse(JSON.stringify(catalog), {
    status: 200,
    headers: {
      'Content-Type': `application/linkset+json; profile="${PROFILE}"`,
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
