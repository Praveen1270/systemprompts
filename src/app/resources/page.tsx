import type { Metadata } from 'next';
import Link from 'next/link';
import { DEFAULT_PSEO_CONFIG } from '@/lib/pseo/types';

const PATH = '/resources';

export const metadata: Metadata = {
  title: 'Resources | SystemPrompts',
  description:
    'Guides, references, and tools for people building with LLMs and agent stacks—including the Hermes + OpenClaw model routing cheat sheet.',
  alternates: {
    canonical: `${DEFAULT_PSEO_CONFIG.baseUrl}${PATH}`,
  },
};

const RESOURCES = [
  {
    href: '/resources/hermes-openclaw-llm-cheat-sheet',
    title: 'Hermes + OpenClaw LLM cheat sheet',
    description:
      'Tiered LLM model stack: costs, context, benchmarks, and when to use each model—responsive cards on mobile, full table on larger screens.',
    badge: 'April 2026',
  },
] as const;

export default function ResourcesPage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="mesh-bg" aria-hidden />
      <div className="noise-overlay" aria-hidden />
      <main className="relative z-10 max-w-3xl mx-auto px-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] py-12 sm:py-16 pb-[max(3rem,env(safe-area-inset-bottom))]">
        <Link
          href="/"
          className="text-sm font-technical tracking-wide text-text-muted hover:text-accent-primary transition-colors min-h-[44px] inline-flex items-center"
        >
          ← Back to directory
        </Link>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-text-primary mt-6 mb-3">
          Resources
        </h1>
        <p className="text-text-secondary leading-relaxed mb-10 text-sm sm:text-base">
          Curated references that pair with the system-prompts archive—starting with agent routing
          and model selection.
        </p>

        <ul className="space-y-4">
          {RESOURCES.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="group block rounded-2xl border border-border-subtle glass-panel p-5 sm:p-6 transition-colors hover:border-accent-primary/30 hover:bg-accent-primary/[0.04] min-h-[44px]"
              >
                <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                  <h2 className="text-lg font-semibold text-text-primary group-hover:text-accent-primary transition-colors">
                    {item.title}
                  </h2>
                  {item.badge ? (
                    <span className="text-[0.65rem] font-technical tracking-wider uppercase text-accent-primary/90 border border-accent-primary/25 rounded-full px-2 py-1">
                      {item.badge}
                    </span>
                  ) : null}
                </div>
                <p className="text-sm text-text-secondary leading-relaxed">{item.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
