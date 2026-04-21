import { NextRequest, NextResponse } from 'next/server';
import { directoryResponseHeaders } from 'web-bot-auth';
import { signerFromJWK } from 'web-bot-auth/crypto';
import directoryPublicKeys from '@/data/web-bot-auth-public-keys.json';

export const runtime = 'nodejs';

const MEDIA = 'application/http-message-signatures-directory+json';

/**
 * Web Bot Auth key directory (JWKS). For a signed response (Cloudflare / strict
 * verifiers), set WEB_BOT_AUTH_PRIVATE_JWK to the full Ed25519 JWK including "d"
 * (same "x" as in src/data/web-bot-auth-public-keys.json). Never commit the private key.
 */
export async function GET(request: NextRequest) {
  const host =
    request.headers.get('x-forwarded-host') ??
    request.headers.get('host') ??
    'www.systemprompts.fun';

  const body = JSON.stringify(directoryPublicKeys);
  const privRaw = process.env.WEB_BOT_AUTH_PRIVATE_JWK;

  const baseHeaders: Record<string, string> = {
    'Content-Type': MEDIA,
    'Cache-Control': 'public, max-age=300',
  };

  if (!privRaw) {
    return new NextResponse(body, { status: 200, headers: baseHeaders });
  }

  try {
    const jwk = JSON.parse(privRaw) as JsonWebKey;
    const signer = await signerFromJWK(jwk);

    const requestHeaders = new Headers();
    requestHeaders.set('host', host);
    const accept = request.headers.get('accept');
    if (accept) requestHeaders.set('accept', accept);

    const responseHeaders = new Headers();
    responseHeaders.set('content-type', MEDIA);

    const pair = {
      request: {
        method: 'GET',
        protocol: 'https',
        url: '/.well-known/http-message-signatures-directory',
        headers: requestHeaders,
      },
      response: {
        status: 200,
        headers: responseHeaders,
      },
    };

    const now = new Date();
    const expires = new Date(now.getTime() + 60_000);
    const sig = await directoryResponseHeaders(pair, [signer], {
      created: now,
      expires,
    });

    return new NextResponse(body, {
      status: 200,
      headers: {
        ...baseHeaders,
        Signature: sig.Signature,
        'Signature-Input': sig['Signature-Input'],
      },
    });
  } catch {
    return new NextResponse(body, { status: 200, headers: baseHeaders });
  }
}
