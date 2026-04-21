import { DEFAULT_PSEO_CONFIG } from '@/lib/pseo/types';

const baseUrl = DEFAULT_PSEO_CONFIG.baseUrl.replace(/\/$/, '');

const CONTENT_SIGNAL_PREAMBLE = `# As a condition of accessing this website, you agree to abide by the following content signals:
# (a) If a content-signal = yes, you may collect content for the corresponding use.
# (b) If a content-signal = no, you may not collect content for the corresponding use.
# (c) If the website operator does not include a content signal for a corresponding use, the website operator neither grants nor restricts permission via content signal with respect to the corresponding use.
# The content signals and their meanings are:
# search: building a search index and providing search results (e.g., returning hyperlinks and short excerpts from your website's contents). Search does not include providing AI-generated search summaries.
# ai-input: inputting content into one or more AI models (e.g., retrieval augmented generation, grounding, or other real-time taking of content for generative AI search answers).
# ai-train: training or fine-tuning AI models.
# ANY RESTRICTIONS EXPRESSED VIA CONTENT SIGNALS ARE EXPRESS RESERVATIONS OF RIGHTS UNDER ARTICLE 4 OF THE EUROPEAN UNION DIRECTIVE 2019/790 ON COPYRIGHT AND RELATED RIGHTS IN THE DIGITAL SINGLE MARKET.
`;

function block(ua: string, extra: string[] = []) {
  return [
    `User-agent: ${ua}`,
    'Content-Signal: ai-train=no, search=yes, ai-input=no',
    ...extra,
    'Allow: /',
    'Disallow: /api/',
    'Disallow: /admin/',
    'Disallow: /_next/',
    'Disallow: /private/',
    '',
  ].join('\n');
}

export function GET() {
  const body = [
    CONTENT_SIGNAL_PREAMBLE.trimEnd(),
    '',
    block('*'),
    block('GPTBot'),
    block('ChatGPT-User'),
    block('Google-Extended'),
    block('anthropic-ai'),
    block('ClaudeBot'),
    block('PerplexityBot'),
    block('Bingbot'),
    `Sitemap: ${baseUrl}/sitemap.xml`,
    `Host: ${baseUrl}`,
    '',
  ].join('\n');

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
