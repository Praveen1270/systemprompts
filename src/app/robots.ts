import type { MetadataRoute } from 'next';
import { DEFAULT_PSEO_CONFIG } from '@/lib/pseo/types';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = DEFAULT_PSEO_CONFIG.baseUrl;
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/_next/',
          '/private/',
        ],
      },
      // OpenAI / ChatGPT
      {
        userAgent: 'GPTBot',
        allow: '/',
      },
      {
        userAgent: 'ChatGPT-User',
        allow: '/',
      },
      // Google Gemini & AI Overviews
      {
        userAgent: 'Google-Extended',
        allow: '/',
      },
      // Anthropic / Claude
      {
        userAgent: 'anthropic-ai',
        allow: '/',
      },
      {
        userAgent: 'ClaudeBot',
        allow: '/',
      },
      // Perplexity
      {
        userAgent: 'PerplexityBot',
        allow: '/',
      },
      // Microsoft Copilot (via Bing)
      {
        userAgent: 'Bingbot',
        allow: '/',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
