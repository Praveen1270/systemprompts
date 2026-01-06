'use client';

import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import type { SidebarLinkCardItem, SidebarLinkCardTone } from '@/data/sidebarLinks';

const toneClasses: Record<SidebarLinkCardTone, { bg: string; border: string }> = {
  cyan: { bg: 'bg-[#e8fbff]', border: 'border-[#bfeef8]' },
  lavender: { bg: 'bg-[#efecff]', border: 'border-[#d7d0ff]' },
  blue: { bg: 'bg-[#eaf1ff]', border: 'border-[#cddcff]' },
  purple: { bg: 'bg-[#f1e8ff]', border: 'border-[#dcc7ff]' },
  pink: { bg: 'bg-[#fdeeff]', border: 'border-[#f4c9f8]' },
  yellow: { bg: 'bg-[#fff5da]', border: 'border-[#ffe09a]' },
  slate: { bg: 'bg-[#f1f3f6]', border: 'border-[#d7dde6]' },
  gray: { bg: 'bg-[#f5f5f7]', border: 'border-[#d2d2d7]' },
};

export default function SidebarLinkCard({ item }: { item: SidebarLinkCardItem }) {
  const tone = toneClasses[item.tone] ?? toneClasses.gray;

  return (
    <Link
      href={item.href}
      target="_blank"
      rel="noreferrer"
      className={[
        'group block rounded-2xl border p-5 transition-all',
        tone.bg,
        tone.border,
        'hover:shadow-lg hover:-translate-y-[1px]',
      ].join(' ')}
      title={item.title}
    >
      <div className="flex items-start gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-[#1d1d1f] truncate">
                  {item.title}
                </h3>
                {item.badge && (
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-black/5 text-[#6e6e73] border border-black/5">
                    {item.badge}
                  </span>
                )}
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-[#6e6e73] opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
          </div>

          <p className="text-xs text-[#6e6e73] mt-1 leading-relaxed line-clamp-3">
            {item.description}
          </p>
        </div>
      </div>
    </Link>
  );
}


