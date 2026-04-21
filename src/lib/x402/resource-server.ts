import { HTTPFacilitatorClient, x402ResourceServer } from '@x402/core/server';
import type { Network } from '@x402/core/types';
import { ExactEvmScheme } from '@x402/evm/exact/server';

const DEFAULT_FACILITATOR = 'https://facilitator.x402.org';
const DEFAULT_NETWORK = 'eip155:84532' as Network;

/**
 * When `X402_PAY_TO` is unset, unpaid requests still receive HTTP 402 so agents and scanners detect x402.
 * Set `X402_PAY_TO` to your treasury address for real USDC settlement.
 */
export const X402_DISCOVERY_FALLBACK_PAY_TO =
  '0x000000000000000000000000000000000000dEaD';

let server: x402ResourceServer | undefined;

function getNetwork(): Network {
  const n = process.env.X402_NETWORK?.trim();
  return (n || DEFAULT_NETWORK) as Network;
}

/**
 * Shared x402 resource server (facilitator + exact EVM scheme).
 * Configure `X402_FACILITATOR_URL` (optional) and per-route `payTo` / price.
 */
export function getX402ResourceServer(): x402ResourceServer {
  if (server) return server;
  const url = process.env.X402_FACILITATOR_URL?.trim() || DEFAULT_FACILITATOR;
  const client = new HTTPFacilitatorClient({ url });
  server = new x402ResourceServer(client).register(getNetwork(), new ExactEvmScheme());
  return server;
}

export function getX402PayTo(): string | undefined {
  const v = process.env.X402_PAY_TO?.trim();
  return v || undefined;
}

export function getX402PayToResolved(): string {
  return getX402PayTo() ?? X402_DISCOVERY_FALLBACK_PAY_TO;
}

export function getX402Network(): Network {
  return getNetwork();
}
