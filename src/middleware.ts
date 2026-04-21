import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { tools } from '@/data/tools';
import { HOMEPAGE_MARKDOWN } from '@/lib/agent/homepage-markdown';
import { HOME_LINK_HEADER } from '@/lib/agent/home-link-header';
import {
  estimateMarkdownTokens,
  prefersMarkdownOverHtml,
} from '@/lib/agent/content-negotiation';

const toolIds = new Set(tools.map((t) => t.id));

/**
 * `/tools/{toolId}` (single segment) was never a valid route — only
 * `/tools/{category}/{slug}`. Send those hits to the prompt viewer.
 *
 * `/` with `Accept: text/markdown` returns Markdown for Agents (HTML remains default).
 */
export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname === '/') {
    const accept = request.headers.get('accept');
    if (prefersMarkdownOverHtml(accept)) {
      return new NextResponse(HOMEPAGE_MARKDOWN, {
        status: 200,
        headers: {
          'Content-Type': 'text/markdown; charset=utf-8',
          'x-markdown-tokens': String(estimateMarkdownTokens(HOMEPAGE_MARKDOWN)),
          Link: HOME_LINK_HEADER,
          'Cache-Control': 'public, max-age=0, must-revalidate',
        },
      });
    }
  }

  const parts = pathname.split('/').filter(Boolean);
  if (
    parts.length === 2 &&
    parts[0] === 'tools' &&
    toolIds.has(parts[1]!)
  ) {
    const dest = new URL(`/tool/${parts[1]}`, request.url);
    dest.search = request.nextUrl.search;
    return NextResponse.redirect(dest);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/tools/:path*'],
};
