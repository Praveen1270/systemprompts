import { NextRequest, NextResponse } from 'next/server';
import { withX402 } from '@x402/next';
import {
  getX402Network,
  getX402PayToResolved,
  getX402ResourceServer,
} from '@/lib/x402/resource-server';

export const runtime = 'nodejs';

const price = process.env.X402_PRICE?.trim() || '$0.01';

async function premiumHandler(_req: NextRequest) {
  return NextResponse.json({
    ok: true,
    message:
      'Premium x402-gated slice. Use this pattern to charge agents per successful response.',
    free_apis: ['/api/prompts', '/api/prompt', '/api/health'],
  });
}

const payTo = getX402PayToResolved();

export const GET = withX402(
  premiumHandler,
  {
    accepts: {
      scheme: 'exact',
      payTo,
      price,
      network: getX402Network(),
    },
    description:
      'Paid access via x402 (USDC). Unpaid requests receive HTTP 402 with payment requirements. Set X402_PAY_TO for your wallet; until then a discovery placeholder address is used.',
  },
  getX402ResourceServer(),
);
