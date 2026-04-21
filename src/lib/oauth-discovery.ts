import { DEFAULT_PSEO_CONFIG } from '@/lib/pseo/types';

const BASE = DEFAULT_PSEO_CONFIG.baseUrl.replace(/\/$/, '');

/**
 * Shared OAuth 2.0 / OIDC discovery URLs (same origin).
 * Public JSON APIs are open; premium routes may use x402 — metadata documents the issuer for agents.
 */
export function getIssuerMetadataUrls() {
  return {
    issuer: BASE,
    authorization_endpoint: `${BASE}/oauth/authorize`,
    token_endpoint: `${BASE}/oauth/token`,
    jwks_uri: `${BASE}/.well-known/jwks.json`,
  };
}

export function getOAuthAuthorizationServerMetadata() {
  const { issuer, authorization_endpoint, token_endpoint, jwks_uri } = getIssuerMetadataUrls();
  return {
    issuer,
    authorization_endpoint,
    token_endpoint,
    jwks_uri,
    grant_types_supported: [
      'authorization_code',
      'client_credentials',
      'refresh_token',
    ],
    token_endpoint_auth_methods_supported: ['client_secret_post', 'client_secret_basic', 'none'],
    response_types_supported: ['code'],
    scopes_supported: ['openid', 'api'],
    service_documentation: `${BASE}/openapi.json`,
  };
}

export function getOpenIdConfigurationMetadata() {
  const oauth = getOAuthAuthorizationServerMetadata();
  return {
    ...oauth,
    userinfo_endpoint: `${BASE}/oauth/userinfo`,
    subject_types_supported: ['public'],
    id_token_signing_alg_values_supported: ['RS256'],
    claims_supported: ['sub'],
  };
}

export function getOAuthProtectedResourceMetadata() {
  const { issuer } = getIssuerMetadataUrls();
  return {
    resource: `${BASE}/api/x402/premium`,
    authorization_servers: [issuer],
    scopes_supported: ['api', 'payment.x402'],
    bearer_methods_supported: ['header'],
    resource_documentation: `${BASE}/openapi.json`,
  };
}
