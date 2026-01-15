/**
 * Internal Linking Utilities
 * Hub-and-spoke architecture, breadcrumbs, related pages, and sibling navigation
 */

import type {
  BreadcrumbItem,
  RelatedPage,
  HubLink,
  SiblingPage,
  PageTemplate,
  PSEOConfig,
} from '@/lib/pseo/types';
import { DEFAULT_PSEO_CONFIG } from '@/lib/pseo/types';

const config: PSEOConfig = DEFAULT_PSEO_CONFIG;

// =============================================================================
// Category Definitions
// =============================================================================

export interface CategoryDefinition {
  slug: string;
  name: string;
  description: string;
  parentSlug?: string;
}

export const CATEGORIES: CategoryDefinition[] = [
  {
    slug: 'ai-coding-assistant',
    name: 'AI Coding Assistant',
    description: 'AI-powered coding assistants for software development',
  },
  {
    slug: 'ai-code-editor',
    name: 'AI Code Editor',
    description: 'Code editors with integrated AI capabilities',
  },
  {
    slug: 'ai-chat-assistant',
    name: 'AI Chat & Assistant',
    description: 'Conversational AI assistants and chatbots',
  },
  {
    slug: 'ai-platform',
    name: 'AI Platform',
    description: 'Full-stack AI development platforms',
  },
  {
    slug: 'open-source',
    name: 'Open Source',
    description: 'Open source AI tools and frameworks',
  },
  {
    slug: 'ide-extension',
    name: 'IDE Extension',
    description: 'AI extensions for popular IDEs',
  },
];

/**
 * Convert category name to slug
 */
export function categoryToSlug(categoryName: string): string {
  return categoryName
    .toLowerCase()
    .replace(/[&]/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/**
 * Get category definition by slug
 */
export function getCategoryBySlug(slug: string): CategoryDefinition | undefined {
  return CATEGORIES.find((cat) => cat.slug === slug);
}

/**
 * Get category definition by name
 */
export function getCategoryByName(name: string): CategoryDefinition | undefined {
  const slug = categoryToSlug(name);
  return getCategoryBySlug(slug);
}

// =============================================================================
// Breadcrumb Generation
// =============================================================================

/**
 * Generate breadcrumbs for tool pages
 */
export function getToolBreadcrumbs(
  toolName: string,
  toolSlug: string,
  categoryName: string,
  categorySlug: string
): BreadcrumbItem[] {
  return [
    { label: 'Home', href: '/' },
    { label: 'Tools', href: '/tools' },
    { label: categoryName, href: `/${categorySlug}` },
    { label: toolName, href: `/tools/${categorySlug}/${toolSlug}`, current: true },
  ];
}

/**
 * Generate breadcrumbs for comparison pages
 */
export function getComparisonBreadcrumbs(
  tool1Name: string,
  tool2Name: string,
  comparisonSlug: string
): BreadcrumbItem[] {
  return [
    { label: 'Home', href: '/' },
    { label: 'Comparisons', href: '/compare' },
    { label: `${tool1Name} vs ${tool2Name}`, href: `/compare/${comparisonSlug}`, current: true },
  ];
}

/**
 * Generate breadcrumbs for guide pages
 */
export function getGuideBreadcrumbs(
  guideTitle: string,
  guideSlug: string,
  categoryName?: string,
  categorySlug?: string
): BreadcrumbItem[] {
  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Guides', href: '/guides' },
  ];

  if (categoryName && categorySlug) {
    breadcrumbs.push({ label: categoryName, href: `/guides/${categorySlug}` });
  }

  breadcrumbs.push({ label: guideTitle, href: `/guides/${guideSlug}`, current: true });

  return breadcrumbs;
}

/**
 * Generate breadcrumbs for category hub pages
 */
export function getHubBreadcrumbs(
  categoryName: string,
  categorySlug: string
): BreadcrumbItem[] {
  return [
    { label: 'Home', href: '/' },
    { label: categoryName, href: `/${categorySlug}`, current: true },
  ];
}

/**
 * Generic breadcrumb generator based on template
 */
export function getBreadcrumbs(
  template: PageTemplate,
  params: {
    name: string;
    slug: string;
    categoryName?: string;
    categorySlug?: string;
    tool1Name?: string;
    tool2Name?: string;
  }
): BreadcrumbItem[] {
  switch (template) {
    case 'tool':
      return getToolBreadcrumbs(
        params.name,
        params.slug,
        params.categoryName || '',
        params.categorySlug || ''
      );
    case 'comparison':
      return getComparisonBreadcrumbs(
        params.tool1Name || '',
        params.tool2Name || '',
        params.slug
      );
    case 'guide':
      return getGuideBreadcrumbs(
        params.name,
        params.slug,
        params.categoryName,
        params.categorySlug
      );
    case 'hub':
      return getHubBreadcrumbs(params.name, params.slug);
    default:
      return [{ label: 'Home', href: '/' }];
  }
}

// =============================================================================
// Related Pages (Hub-and-Spoke)
// =============================================================================

interface ToolInfo {
  id: string;
  name: string;
  slug: string;
  category: string;
  categorySlug: string;
  description: string;
}

/**
 * Find related tools in the same category
 */
export function getRelatedToolsInCategory(
  currentSlug: string,
  category: string,
  allTools: ToolInfo[],
  limit = 4
): RelatedPage[] {
  return allTools
    .filter((tool) => tool.categorySlug === category && tool.slug !== currentSlug)
    .slice(0, limit)
    .map((tool) => ({
      slug: tool.slug,
      title: tool.name,
      description: tool.description,
      category: tool.category,
      template: 'tool' as PageTemplate,
    }));
}

/**
 * Find related tools across categories (diverse recommendations)
 */
export function getRelatedToolsCrossCategory(
  currentSlug: string,
  currentCategory: string,
  allTools: ToolInfo[],
  limit = 3
): RelatedPage[] {
  // Get one tool from each different category
  const otherCategories = new Set<string>();
  const relatedTools: RelatedPage[] = [];

  for (const tool of allTools) {
    if (
      tool.slug !== currentSlug &&
      tool.categorySlug !== currentCategory &&
      !otherCategories.has(tool.categorySlug)
    ) {
      otherCategories.add(tool.categorySlug);
      relatedTools.push({
        slug: tool.slug,
        title: tool.name,
        description: tool.description,
        category: tool.category,
        template: 'tool',
      });

      if (relatedTools.length >= limit) break;
    }
  }

  return relatedTools;
}

/**
 * Get comprehensive related pages for a tool
 */
export function getRelatedPagesForTool(
  currentSlug: string,
  categorySlug: string,
  allTools: ToolInfo[],
  comparisons: Array<{ slug: string; tool1: string; tool2: string }> = []
): RelatedPage[] {
  const related: RelatedPage[] = [];

  // Same category tools (2-3)
  related.push(
    ...getRelatedToolsInCategory(currentSlug, categorySlug, allTools, 3)
  );

  // Cross-category tools (1-2)
  related.push(
    ...getRelatedToolsCrossCategory(currentSlug, categorySlug, allTools, 2)
  );

  // Related comparisons (1-2)
  const relatedComparisons = comparisons
    .filter((c) => c.tool1 === currentSlug || c.tool2 === currentSlug)
    .slice(0, 2)
    .map((c) => {
      const otherTool = c.tool1 === currentSlug ? c.tool2 : c.tool1;
      const otherToolInfo = allTools.find((t) => t.slug === otherTool);
      return {
        slug: c.slug,
        title: `${c.tool1} vs ${c.tool2}`,
        description: otherToolInfo 
          ? `Compare with ${otherToolInfo.name}` 
          : 'Detailed comparison',
        category: 'comparison',
        template: 'comparison' as PageTemplate,
      };
    });

  related.push(...relatedComparisons);

  return related.slice(0, 6); // Max 6 related pages
}

/**
 * Get related pages for a comparison
 */
export function getRelatedPagesForComparison(
  tool1Slug: string,
  tool2Slug: string,
  allTools: ToolInfo[],
  allComparisons: Array<{ slug: string; tool1: string; tool2: string }>
): RelatedPage[] {
  const related: RelatedPage[] = [];

  // Individual tool pages
  const tool1 = allTools.find((t) => t.slug === tool1Slug);
  const tool2 = allTools.find((t) => t.slug === tool2Slug);

  if (tool1) {
    related.push({
      slug: tool1.slug,
      title: tool1.name,
      description: tool1.description,
      category: tool1.category,
      template: 'tool',
    });
  }

  if (tool2) {
    related.push({
      slug: tool2.slug,
      title: tool2.name,
      description: tool2.description,
      category: tool2.category,
      template: 'tool',
    });
  }

  // Other comparisons involving these tools
  const relatedComparisons = allComparisons
    .filter((c) => {
      const isCurrentComparison = 
        (c.tool1 === tool1Slug && c.tool2 === tool2Slug) ||
        (c.tool1 === tool2Slug && c.tool2 === tool1Slug);
      const involvesEitherTool = 
        c.tool1 === tool1Slug || c.tool2 === tool1Slug ||
        c.tool1 === tool2Slug || c.tool2 === tool2Slug;
      return !isCurrentComparison && involvesEitherTool;
    })
    .slice(0, 3)
    .map((c) => ({
      slug: c.slug,
      title: `${c.tool1} vs ${c.tool2}`,
      description: 'Related comparison',
      category: 'comparison',
      template: 'comparison' as PageTemplate,
    }));

  related.push(...relatedComparisons);

  return related.slice(0, 6);
}

// =============================================================================
// Hub Links
// =============================================================================

/**
 * Get hub links for a tool page
 */
export function getToolHubLinks(categorySlug: string, categoryName: string): HubLink[] {
  return [
    {
      slug: categorySlug,
      label: `All ${categoryName}`,
      description: `Browse all ${categoryName.toLowerCase()} tools`,
    },
    {
      slug: 'tools',
      label: 'All Tools',
      description: 'Browse all AI tools',
    },
  ];
}

/**
 * Get hub links for a comparison page
 */
export function getComparisonHubLinks(): HubLink[] {
  return [
    {
      slug: 'compare',
      label: 'All Comparisons',
      description: 'Browse all tool comparisons',
    },
    {
      slug: 'tools',
      label: 'All Tools',
      description: 'Browse all AI tools',
    },
  ];
}

/**
 * Get hub links for a guide page
 */
export function getGuideHubLinks(categorySlug?: string, categoryName?: string): HubLink[] {
  const links: HubLink[] = [
    {
      slug: 'guides',
      label: 'All Guides',
      description: 'Browse all guides',
    },
  ];

  if (categorySlug && categoryName) {
    links.unshift({
      slug: `guides/${categorySlug}`,
      label: `${categoryName} Guides`,
      description: `Guides about ${categoryName.toLowerCase()}`,
    });
  }

  return links;
}

/**
 * Generic hub links generator
 */
export function getHubLinks(
  template: PageTemplate,
  categorySlug?: string,
  categoryName?: string
): HubLink[] {
  switch (template) {
    case 'tool':
      return getToolHubLinks(categorySlug || '', categoryName || '');
    case 'comparison':
      return getComparisonHubLinks();
    case 'guide':
      return getGuideHubLinks(categorySlug, categoryName);
    case 'hub':
      return [{ slug: '', label: 'Home', description: 'Back to home' }];
    default:
      return [];
  }
}

// =============================================================================
// Sibling Navigation
// =============================================================================

/**
 * Get previous and next pages for sequential navigation
 */
export function getSiblingPages(
  currentSlug: string,
  allSlugs: Array<{ slug: string; title: string }>,
  sortKey?: (item: { slug: string; title: string }) => string | number
): { previous?: SiblingPage; next?: SiblingPage } {
  const sorted = sortKey 
    ? [...allSlugs].sort((a, b) => {
        const aKey = sortKey(a);
        const bKey = sortKey(b);
        return aKey < bKey ? -1 : aKey > bKey ? 1 : 0;
      })
    : allSlugs;

  const currentIndex = sorted.findIndex((item) => item.slug === currentSlug);

  if (currentIndex === -1) {
    return {};
  }

  return {
    previous: currentIndex > 0 
      ? { 
          slug: sorted[currentIndex - 1].slug, 
          title: sorted[currentIndex - 1].title,
          position: -1,
        } 
      : undefined,
    next: currentIndex < sorted.length - 1 
      ? { 
          slug: sorted[currentIndex + 1].slug, 
          title: sorted[currentIndex + 1].title,
          position: 1,
        } 
      : undefined,
  };
}

// =============================================================================
// URL Builders
// =============================================================================

/**
 * Build tool page URL
 */
export function buildToolUrl(categorySlug: string, toolSlug: string): string {
  return `/tools/${categorySlug}/${toolSlug}`;
}

/**
 * Build comparison page URL
 */
export function buildComparisonUrl(tool1Slug: string, tool2Slug: string): string {
  // Ensure consistent ordering (alphabetical)
  const [first, second] = [tool1Slug, tool2Slug].sort();
  return `/compare/${first}-vs-${second}`;
}

/**
 * Build guide page URL
 */
export function buildGuideUrl(guideSlug: string): string {
  return `/guides/${guideSlug}`;
}

/**
 * Build category hub URL
 */
export function buildHubUrl(categorySlug: string): string {
  return `/${categorySlug}`;
}

/**
 * Build full URL with base
 */
export function buildFullUrl(path: string, baseUrl = config.baseUrl): string {
  return `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`;
}

// =============================================================================
// Link Scoring (for relevance ranking)
// =============================================================================

/**
 * Score relevance of a related page
 * Higher score = more relevant
 */
export function scoreRelatedPage(
  currentPage: { category: string; template: PageTemplate },
  relatedPage: { category: string; template: PageTemplate }
): number {
  let score = 0;

  // Same category is highly relevant
  if (currentPage.category === relatedPage.category) {
    score += 10;
  }

  // Same template type is somewhat relevant
  if (currentPage.template === relatedPage.template) {
    score += 5;
  }

  // Cross-template relevance (tool -> comparison is good)
  if (
    currentPage.template === 'tool' && 
    relatedPage.template === 'comparison'
  ) {
    score += 7;
  }

  // Hub pages are always relevant
  if (relatedPage.template === 'hub') {
    score += 3;
  }

  return score;
}

/**
 * Sort related pages by relevance score
 */
export function sortByRelevance(
  currentPage: { category: string; template: PageTemplate },
  relatedPages: RelatedPage[]
): RelatedPage[] {
  return [...relatedPages].sort((a, b) => {
    const scoreA = scoreRelatedPage(currentPage, a);
    const scoreB = scoreRelatedPage(currentPage, b);
    return scoreB - scoreA; // Higher scores first
  });
}
