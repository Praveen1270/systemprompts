/**
 * Keyword Matrix for Programmatic SEO
 * Defines all combinations for scalable page generation
 */

import type { KeywordMatrix } from '@/lib/pseo/types';

// =============================================================================
// Category Definitions
// =============================================================================

export interface Category {
  slug: string;
  name: string;
  description: string;
  keywords: string[];
}

export const categories: Category[] = [
  {
    slug: 'ai-coding-assistant',
    name: 'AI Coding Assistant',
    description: 'AI-powered coding assistants for software development',
    keywords: ['ai coding assistant', 'ai code helper', 'coding ai', 'ai programming assistant'],
  },
  {
    slug: 'ai-code-editor',
    name: 'AI Code Editor',
    description: 'Code editors with integrated AI capabilities',
    keywords: ['ai code editor', 'ai ide', 'intelligent code editor', 'ai-powered editor'],
  },
  {
    slug: 'ai-chat-assistant',
    name: 'AI Chat & Assistant',
    description: 'Conversational AI assistants and chatbots',
    keywords: ['ai chat', 'ai assistant', 'chatbot', 'conversational ai'],
  },
  {
    slug: 'ai-platform',
    name: 'AI Platform',
    description: 'Full-stack AI development platforms',
    keywords: ['ai platform', 'ai development platform', 'ai saas', 'ai tool platform'],
  },
  {
    slug: 'open-source',
    name: 'Open Source',
    description: 'Open source AI tools and frameworks',
    keywords: ['open source ai', 'free ai tools', 'open source coding', 'oss ai'],
  },
  {
    slug: 'ide-extension',
    name: 'IDE Extension',
    description: 'AI extensions for popular IDEs',
    keywords: ['ide extension', 'vscode extension', 'ai plugin', 'editor extension'],
  },
];

// =============================================================================
// Tool Definitions (for page generation)
// =============================================================================

export interface ToolDefinition {
  id: string;
  slug: string;
  name: string;
  category: string;
  categorySlug: string;
  description: string;
  keywords: string[];
}

export const tools: ToolDefinition[] = [
  {
    id: 'cursor',
    slug: 'cursor',
    name: 'Cursor',
    category: 'AI Code Editor',
    categorySlug: 'ai-code-editor',
    description: 'AI-first code editor built on VSCode with powerful code generation.',
    keywords: ['cursor ai', 'cursor editor', 'cursor ide', 'cursor system prompt'],
  },
  {
    id: 'claude-code',
    slug: 'claude-code',
    name: 'Claude Code',
    category: 'AI Coding Assistant',
    categorySlug: 'ai-coding-assistant',
    description: "Anthropic's agentic coding tool powered by Claude.",
    keywords: ['claude code', 'anthropic claude', 'claude coding', 'claude prompt'],
  },
  {
    id: 'v0',
    slug: 'v0',
    name: 'v0',
    category: 'AI Platform',
    categorySlug: 'ai-platform',
    description: "Vercel's AI-powered UI generation tool.",
    keywords: ['v0 ai', 'v0 vercel', 'v0 prompt', 'v0 ui generator'],
  },
  {
    id: 'lovable',
    slug: 'lovable',
    name: 'Lovable',
    category: 'AI Platform',
    categorySlug: 'ai-platform',
    description: 'AI editor that creates and modifies web applications.',
    keywords: ['lovable ai', 'lovable dev', 'lovable prompt', 'lovable builder'],
  },
  {
    id: 'windsurf',
    slug: 'windsurf',
    name: 'Windsurf',
    category: 'AI Code Editor',
    categorySlug: 'ai-code-editor',
    description: "Codeium's AI-powered IDE with advanced code understanding.",
    keywords: ['windsurf ai', 'windsurf codeium', 'windsurf ide', 'windsurf prompt'],
  },
  {
    id: 'devin',
    slug: 'devin',
    name: 'Devin AI',
    category: 'AI Coding Assistant',
    categorySlug: 'ai-coding-assistant',
    description: "Cognition's autonomous AI software engineer.",
    keywords: ['devin ai', 'devin cognition', 'devin engineer', 'devin prompt'],
  },
  {
    id: 'replit',
    slug: 'replit',
    name: 'Replit',
    category: 'AI Platform',
    categorySlug: 'ai-platform',
    description: 'Browser-based IDE with AI-powered code completion.',
    keywords: ['replit ai', 'replit agent', 'replit prompt', 'replit ghostwriter'],
  },
  {
    id: 'augment-code',
    slug: 'augment-code',
    name: 'Augment Code',
    category: 'AI Coding Assistant',
    categorySlug: 'ai-coding-assistant',
    description: 'AI coding assistant with Claude and GPT-5 support.',
    keywords: ['augment code', 'augment ai', 'augment prompt', 'augment agent'],
  },
  {
    id: 'github-copilot',
    slug: 'github-copilot',
    name: 'GitHub Copilot',
    category: 'IDE Extension',
    categorySlug: 'ide-extension',
    description: "GitHub Copilot's agent mode with multi-model support.",
    keywords: ['github copilot', 'copilot prompt', 'copilot agent', 'copilot vscode'],
  },
  {
    id: 'manus',
    slug: 'manus',
    name: 'Manus Agent',
    category: 'AI Coding Assistant',
    categorySlug: 'ai-coding-assistant',
    description: 'Modular AI agent with comprehensive tool capabilities.',
    keywords: ['manus ai', 'manus agent', 'manus prompt', 'manus tools'],
  },
  {
    id: 'bolt',
    slug: 'bolt',
    name: 'Bolt',
    category: 'Open Source',
    categorySlug: 'open-source',
    description: "StackBlitz's open-source AI web development tool.",
    keywords: ['bolt new', 'bolt ai', 'bolt stackblitz', 'bolt prompt'],
  },
  {
    id: 'cline',
    slug: 'cline',
    name: 'Cline',
    category: 'Open Source',
    categorySlug: 'open-source',
    description: 'Open-source autonomous coding agent for VS Code.',
    keywords: ['cline ai', 'cline vscode', 'cline prompt', 'cline agent'],
  },
  {
    id: 'amp',
    slug: 'amp',
    name: 'Amp',
    category: 'AI Coding Assistant',
    categorySlug: 'ai-coding-assistant',
    description: "Sourcegraph's AI coding assistant.",
    keywords: ['amp sourcegraph', 'amp ai', 'amp prompt', 'amp coding'],
  },
  {
    id: 'perplexity',
    slug: 'perplexity',
    name: 'Perplexity',
    category: 'AI Chat & Assistant',
    categorySlug: 'ai-chat-assistant',
    description: 'AI-powered search engine with conversational interface.',
    keywords: ['perplexity ai', 'perplexity search', 'perplexity prompt', 'perplexity chat'],
  },
  {
    id: 'google-gemini',
    slug: 'google-gemini',
    name: 'Google Gemini',
    category: 'AI Chat & Assistant',
    categorySlug: 'ai-chat-assistant',
    description: "Google's multimodal AI assistant.",
    keywords: ['gemini ai', 'google gemini', 'gemini prompt', 'gemini chat'],
  },
  {
    id: 'antigravity',
    slug: 'antigravity',
    name: 'Antigravity',
    category: 'AI Coding Assistant',
    categorySlug: 'ai-coding-assistant',
    description: "Google's experimental AI coding tool.",
    keywords: ['antigravity ai', 'google antigravity', 'antigravity prompt', 'antigravity coding'],
  },
  {
    id: 'trae',
    slug: 'trae',
    name: 'Trae',
    category: 'AI Code Editor',
    categorySlug: 'ai-code-editor',
    description: "ByteDance's AI-powered code editor.",
    keywords: ['trae ai', 'trae bytedance', 'trae editor', 'trae prompt'],
  },
  {
    id: 'junie',
    slug: 'junie',
    name: 'Junie',
    category: 'AI Coding Assistant',
    categorySlug: 'ai-coding-assistant',
    description: "JetBrains' AI coding assistant.",
    keywords: ['junie ai', 'junie jetbrains', 'junie prompt', 'junie coding'],
  },
  {
    id: 'kiro',
    slug: 'kiro',
    name: 'Kiro',
    category: 'AI Coding Assistant',
    categorySlug: 'ai-coding-assistant',
    description: "Amazon's spec-driven AI coding assistant.",
    keywords: ['kiro ai', 'kiro amazon', 'kiro prompt', 'kiro coding'],
  },
  {
    id: 'same-dev',
    slug: 'same-dev',
    name: 'Same.dev',
    category: 'AI Platform',
    categorySlug: 'ai-platform',
    description: 'AI tool for cloning web applications.',
    keywords: ['same dev', 'same.dev ai', 'same dev prompt', 'same dev clone'],
  },
];

// =============================================================================
// Use Cases
// =============================================================================

export const useCases: string[] = [
  'code-generation',
  'code-review',
  'debugging',
  'refactoring',
  'documentation',
  'testing',
  'code-completion',
  'code-explanation',
  'migration',
  'optimization',
  'security-audit',
  'api-development',
  'frontend-development',
  'backend-development',
  'full-stack-development',
  'mobile-development',
  'database-design',
  'devops',
  'learning',
  'prototyping',
];

// =============================================================================
// Guide Topics
// =============================================================================

export const guideTopics: string[] = [
  'best-ai-coding-tools-2026',
  'how-to-write-effective-prompts',
  'ai-assisted-code-review',
  'choosing-the-right-ai-tool',
  'ai-coding-best-practices',
  'maximizing-ai-productivity',
  'ai-tools-for-beginners',
  'advanced-prompt-engineering',
  'ai-security-considerations',
  'ai-in-enterprise-development',
  'open-source-vs-commercial-ai',
  'ai-code-quality',
  'ai-pair-programming',
  'future-of-ai-coding',
  'ai-tool-integration-guide',
];

// =============================================================================
// Comparison Generation
// =============================================================================

/**
 * Generate all valid comparison pairs
 */
export function generateComparisonPairs(
  toolList: ToolDefinition[]
): Array<[string, string]> {
  const pairs: Array<[string, string]> = [];
  
  for (let i = 0; i < toolList.length; i++) {
    for (let j = i + 1; j < toolList.length; j++) {
      // Only compare tools in similar categories or both popular
      const tool1 = toolList[i];
      const tool2 = toolList[j];
      
      // Same category comparisons are always valid
      if (tool1.categorySlug === tool2.categorySlug) {
        pairs.push([tool1.slug, tool2.slug]);
        continue;
      }
      
      // Cross-category: only for major tools
      const majorTools = ['cursor', 'claude-code', 'github-copilot', 'v0', 'windsurf', 'replit'];
      if (majorTools.includes(tool1.slug) && majorTools.includes(tool2.slug)) {
        pairs.push([tool1.slug, tool2.slug]);
      }
    }
  }
  
  return pairs.sort((a, b) => a[0].localeCompare(b[0]));
}

/**
 * Generate comparison slug from two tools
 */
export function generateComparisonSlug(tool1: string, tool2: string): string {
  const [first, second] = [tool1, tool2].sort();
  return `${first}-vs-${second}`;
}

// =============================================================================
// Full Keyword Matrix
// =============================================================================

export const keywordMatrix: KeywordMatrix = {
  tools: tools.map((t) => t.slug),
  categories: categories.map((c) => c.slug),
  useCases,
  comparisons: generateComparisonPairs(tools),
  guides: guideTopics,
};

// =============================================================================
// Page Count Estimation
// =============================================================================

export function estimatePageCount(): {
  tools: number;
  comparisons: number;
  guides: number;
  hubs: number;
  total: number;
} {
  const toolPages = tools.length;
  const comparisonPages = keywordMatrix.comparisons.length;
  const guidePages = guideTopics.length;
  const hubPages = categories.length;
  
  return {
    tools: toolPages,
    comparisons: comparisonPages,
    guides: guidePages,
    hubs: hubPages,
    total: toolPages + comparisonPages + guidePages + hubPages,
  };
}

// =============================================================================
// Lookup Helpers
// =============================================================================

export function getToolBySlug(slug: string): ToolDefinition | undefined {
  return tools.find((t) => t.slug === slug);
}

export function getToolsByCategory(categorySlug: string): ToolDefinition[] {
  return tools.filter((t) => t.categorySlug === categorySlug);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getComparisonsForTool(toolSlug: string): Array<[string, string]> {
  return keywordMatrix.comparisons.filter(
    ([a, b]) => a === toolSlug || b === toolSlug
  );
}

// =============================================================================
// Slug Utilities
// =============================================================================

export function categoryNameToSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[&]/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function slugToCategoryName(slug: string): string {
  const category = getCategoryBySlug(slug);
  return category?.name || slug.split('-').map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
}
