import { HTTPFacilitatorClient, x402ResourceServer } from '@x402/core/server';
import type { Network } from '@x402/core/types';
import { ExactEvmScheme } from '@x402/evm/exact/server';

const DEFAULT_FACILITATOR = 'https://facilitator.x402.org';
const DEFAULT_NETWORK = 'eip155:84532' as Network;

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

export function getX402Network(): Network {
  return getNetwork();
}
