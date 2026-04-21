import type { Metadata } from 'next';
import Link from 'next/link';
import { DEFAULT_PSEO_CONFIG } from '@/lib/pseo/types';
import GkisokayModelStack from './GkisokayModelStack';

const PATH = '/resources/hermes-openclaw-llm-cheat-sheet';
const IMAGE_PATH = '/hermes-openclaw-llm-cheat-sheet.png';

export const metadata: Metadata = {
  title: 'LLM cheat sheet for Hermes + OpenClaw agents (Apr 12, 2026) | SystemPrompts',
  description:
    'Live tiered LLM reference for agents: frontier, execution, balanced, and local models—costs, context, benchmarks, and routing notes for Hermes + OpenClaw.',
  keywords: [
    'Hermes',
    'OpenClaw',
    'LLM routing',
    'agent models',
    'Claude Opus',
    'GPT-5',
    'model comparison',
  ],
  alternates: {
    canonical: `${DEFAULT_PSEO_CONFIG.baseUrl}${PATH}`,
  },
  openGraph: {
    title: 'LLM cheat sheet for Hermes + OpenClaw agents',
    description:
      'Multimodal routing guide: tiered model stack with costs, context windows, and benchmark bars.',
    url: `${DEFAULT_PSEO_CONFIG.baseUrl}${PATH}`,
    siteName: DEFAULT_PSEO_CONFIG.siteName,
    images: [
      {
        url: `${DEFAULT_PSEO_CONFIG.baseUrl}${IMAGE_PATH}`,
        width: 641,
        height: 1024,
        alt: 'Tiered LLM model stack for Hermes and OpenClaw agents',
      },
    ],
    type: 'article',
    publishedTime: '2026-04-12',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LLM cheat sheet for Hermes + OpenClaw agents',
    description:
      'Tiered model stack for agent builders—costs, context, and when to use each model.',
    images: [`${DEFAULT_PSEO_CONFIG.baseUrl}${IMAGE_PATH}`],
  },
};

export default function HermesOpenClawLlmCheatSheetPage() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-bg-base">
      <div className="mesh-bg" aria-hidden />
      <div className="noise-overlay" aria-hidden />
      <div
        className="relative z-10 max-w-[1400px] mx-auto py-8 sm:py-12 md:py-14 px-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] pb-[max(2rem,env(safe-area-inset-bottom))]"
      >
        <nav className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <Link
            href="/"
            className="text-sm font-technical tracking-wide text-text-muted hover:text-accent-primary transition-colors min-h-[44px] inline-flex items-center"
          >
            ← Back to directory
          </Link>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-technical tracking-wide text-text-muted">
            <Link href="/resources" className="hover:text-accent-primary transition-colors py-2">
              Resources
            </Link>
            <span className="text-border-bright select-none" aria-hidden>
              /
            </span>
            <span className="text-text-secondary">Hermes + OpenClaw LLM sheet</span>
          </div>
        </nav>

        <p className="font-technical text-xs tracking-widest text-accent-primary uppercase mt-8 mb-2">
          Resource · April 2026
        </p>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-text-primary mb-3 max-w-4xl leading-tight">
          LLM cheat sheet for Hermes + OpenClaw agents
        </h1>
        <p className="text-text-secondary leading-relaxed mb-8 max-w-3xl text-sm sm:text-base">
          April 2026 reference—tier colors, benchmark bars, and full copy. On phones you get
          stacked cards; from tablet up, the full table with horizontal scroll when needed.
        </p>

        <GkisokayModelStack />

        <p className="mt-6 text-xs text-text-muted max-w-3xl leading-relaxed">
          Pricing and model IDs are illustrative; verify with providers before production routing.
        </p>
      </div>
    </div>
  );
}
