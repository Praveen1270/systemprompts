import type { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, ArrowRight } from 'lucide-react';
import { guideTopics } from '@/data/keyword-matrix';
import { DEFAULT_PSEO_CONFIG } from '@/lib/pseo/types';

const BASE_URL = DEFAULT_PSEO_CONFIG.baseUrl;
const SITE_NAME = DEFAULT_PSEO_CONFIG.siteName;

export const metadata: Metadata = {
  title: 'AI Coding Guides | Best Practices & Tutorials',
  description: `${guideTopics.length}+ in-depth guides on AI coding tools, prompt engineering, and best practices. Learn how to get the most from AI coding assistants like Cursor, Claude Code, and GitHub Copilot.`,
  alternates: { canonical: `${BASE_URL}/guides` },
  openGraph: {
    title: 'AI Coding Guides | Best Practices & Tutorials',
    description: 'In-depth guides on AI coding tools, prompt engineering, and developer best practices.',
    type: 'website',
    url: `${BASE_URL}/guides`,
    siteName: SITE_NAME,
  },
};

function formatTitle(slug: string) {
  return slug.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

function getGuideDescription(slug: string): string {
  const descriptions: Record<string, string> = {
    'best-ai-coding-tools-2026': 'A comprehensive comparison of the best AI coding tools in 2026, including Cursor, Claude Code, GitHub Copilot, and more.',
    'how-to-write-effective-prompts': 'Learn the techniques and patterns used by top AI tools to write system prompts that get consistent, high-quality results.',
    'ai-assisted-code-review': 'How to use AI coding assistants to automate and improve your code review process.',
    'choosing-the-right-ai-tool': 'A decision framework for picking the right AI coding assistant for your specific tech stack and workflow.',
    'ai-coding-best-practices': 'Best practices for integrating AI coding tools into your development workflow without sacrificing code quality.',
    'maximizing-ai-productivity': 'Techniques to get 10x more value from AI coding assistants through effective prompting and workflow design.',
    'ai-tools-for-beginners': 'The best AI coding tools and techniques for developers just getting started with AI-assisted development.',
    'advanced-prompt-engineering': 'Advanced techniques for writing system prompts and user prompts that unlock the full potential of LLMs.',
    'ai-security-considerations': 'Security implications of using AI coding tools, including data privacy, code security, and prompt injection risks.',
    'ai-in-enterprise-development': 'How enterprise teams are adopting AI coding tools, managing access, ensuring compliance, and measuring ROI.',
    'open-source-vs-commercial-ai': 'Comparing open-source AI coding tools (Cline, Bolt) against commercial offerings (Cursor, GitHub Copilot).',
    'ai-code-quality': 'How to maintain code quality when using AI tools, including review processes, testing strategies, and quality gates.',
    'ai-pair-programming': 'How to use AI coding assistants as a true pair programming partner for better code, faster.',
    'future-of-ai-coding': 'Where AI coding is heading: agentic AI, autonomous software engineers, and what developers need to know.',
    'ai-tool-integration-guide': 'A practical guide to integrating AI coding tools with your existing development stack and team workflows.',
  };
  return descriptions[slug] || `A comprehensive guide to ${formatTitle(slug).toLowerCase()}.`;
}

export default function GuidesIndexPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Guides', item: `${BASE_URL}/guides` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="min-h-screen relative overflow-hidden">
        <div className="mesh-bg" />
        <div className="noise-overlay" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 lg:py-20">
          <header className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 glass-panel flex items-center justify-center border-accent-primary/20 bg-accent-primary/5">
                <BookOpen className="w-4 h-4 text-accent-primary" />
              </div>
              <span className="font-technical text-xs tracking-widest text-accent-primary uppercase">Learning Center</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              AI Coding <span className="text-accent-primary">Guides</span>
            </h1>
            <p className="text-xl text-text-secondary max-w-2xl leading-relaxed">
              In-depth guides on AI coding tools, prompt engineering, and developer best practices. Everything you need to master AI-assisted development.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guideTopics.map((topic) => (
              <Link
                key={topic}
                href={`/guides/${topic}`}
                className="glass-panel p-6 hover:border-accent-primary/40 transition-all group flex flex-col"
              >
                <h2 className="text-lg font-bold text-text-primary group-hover:text-accent-primary transition-colors mb-3 leading-snug">
                  {formatTitle(topic)}
                </h2>
                <p className="text-sm text-text-secondary leading-relaxed flex-1 mb-4">
                  {getGuideDescription(topic)}
                </p>
                <span className="flex items-center gap-2 font-technical text-xs text-accent-primary tracking-wider">
                  READ GUIDE <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-20 glass-panel p-10 text-center">
            <p className="font-technical text-xs tracking-widest text-accent-primary mb-3">GO DEEPER</p>
            <h2 className="text-3xl font-bold mb-4">Explore the System Prompts Behind These Tools</h2>
            <p className="text-text-secondary mb-8 max-w-xl mx-auto">
              See the exact system prompts powering Cursor, Claude Code, GitHub Copilot, and 50+ more AI tools.
            </p>
            <Link href="/" className="btn-premium">Browse System Prompts</Link>
          </div>
        </div>
      </div>
    </>
  );
}
