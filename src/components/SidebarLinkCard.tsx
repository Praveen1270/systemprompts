'use client';

import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import type { SidebarLinkCardItem } from '@/data/sidebarLinks';

/** Light surface — matches globals.css tokens */
const brandCard =
  'bg-bg-surface border-border-subtle hover:border-accent-primary/35 hover:shadow-sm';

export default function SidebarLinkCard({ item }: { item: SidebarLinkCardItem }) {
  return (
    <Link
      href={item.href}
      target="_blank"
      rel="noreferrer"
      className={[
        'group block rounded-2xl border p-4 sm:p-5 transition-all',
        brandCard,
        'hover:shadow-md',
      ].join(' ')}
      title={item.title}
    >
      <div className="flex items-start gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-text-primary truncate group-hover:text-accent-primary transition-colors">
                  {item.title}
                </h3>
                {item.badge && (
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-accent-primary/10 text-accent-primary border border-accent-primary/20">
                    {item.badge}
                  </span>
                )}
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-text-muted opacity-70 group-hover:opacity-100 group-hover:text-accent-primary transition-all shrink-0" />
          </div>

          <p className="text-xs text-text-muted mt-1 leading-relaxed line-clamp-3">
            {item.description}
          </p>
        </div>
      </div>
    </Link>
  );
}
