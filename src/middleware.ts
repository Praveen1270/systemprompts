import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { tools } from '@/data/tools';

const toolIds = new Set(tools.map((t) => t.id));

/**
 * `/tools/{toolId}` (single segment) was never a valid route — only
 * `/tools/{category}/{slug}`. Send those hits to the prompt viewer.
 */
export function middleware(request: NextRequest) {
  const parts = request.nextUrl.pathname.split('/').filter(Boolean);
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
  matcher: ['/tools/:path*'],
};
