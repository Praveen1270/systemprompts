/**
 * RFC 8288 Link header for `/` (homepage agent discovery). Kept in one place for next.config + middleware.
 */
export const HOME_LINK_HEADER =
  '</.well-known/api-catalog>; rel="api-catalog", ' +
  '</openapi.json>; rel="service-desc", ' +
  '</submit>; rel="service-doc", ' +
  '</.well-known/agent-skills/index.json>; rel="describedby"';
