import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CategoryHubTemplate } from '@/templates/CategoryHubTemplate';
import { 
  loadHubPageData, 
  generateHubStaticParams,
  DEFAULT_PSEO_CONFIG 
} from '@/lib/pseo';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo/metadata';
import { categories, tools as keywordTools, generateComparisonPairs, generateComparisonSlug } from '@/data/keyword-matrix';
import { tools as toolsData, categories as toolCategories } from '@/data/tools';

interface PageProps {
  params: Promise<{
    category: string;
  }>;
}

// =============================================================================
// Static Generation
// =============================================================================

export async function generateStaticParams() {
  // Try to load from PSEO data first
  const pseoParams = await generateHubStaticParams();
  
  if (pseoParams.length > 0) {
    return pseoParams;
  }
  
  // Fallback: Generate from categories
  return categories.map((cat) => ({
    category: cat.slug,
  }));
}

// =============================================================================
// Metadata Generation
// =============================================================================

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  
  // Try to load PSEO page data first
  const pageData = await loadHubPageData(category);
  
  if (pageData) {
    return generateSEOMetadata(pageData);
  }
  
  // Find category
  const categoryInfo = categories.find((c) => c.slug === category);
  
  if (!categoryInfo) {
    return {
      title: 'Category Not Found | SystemPrompts',
      description: 'The requested category could not be found.',
    };
  }
  
  const toolCount = keywordTools.filter((t) => t.categorySlug === category).length;
  
  const title = `${categoryInfo.name} | AI Tools & System Prompts`;
  const description = `Browse ${toolCount}+ ${categoryInfo.name.toLowerCase()} with verified system prompts. ${categoryInfo.description}`;
  
  return {
    title,
    description,
    keywords: [categoryInfo.name, 'AI tools', 'system prompts', ...categoryInfo.keywords],
    alternates: {
      canonical: `${DEFAULT_PSEO_CONFIG.baseUrl}/${category}`,
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: `${DEFAULT_PSEO_CONFIG.baseUrl}/${category}`,
      siteName: DEFAULT_PSEO_CONFIG.siteName,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

// =============================================================================
// Page Component
// =============================================================================

export default async function CategoryHubPage({ params }: PageProps) {
  const { category } = await params;
  
  // Try to load PSEO page data first
  let pageData = await loadHubPageData(category);
  
  // Find category info
  const categoryInfo = categories.find((c) => c.slug === category);
  
  if (!categoryInfo) {
    notFound();
  }
  
  // Get tools in this category
  const categoryTools = keywordTools.filter((t) => t.categorySlug === category);
  const legacyTools = toolsData.filter((t) => {
    const toolCategorySlug = t.category
      .toLowerCase()
      .replace(/[&]/g, 'and')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    return toolCategorySlug === category;
  });
  
  // Build tools list
  const tools = categoryTools.length > 0 
    ? categoryTools.map((t) => ({
        id: t.id,
        slug: t.slug,
        name: t.name,
        description: t.description,
        logo: `https://${t.slug}.com/favicon.ico`, // Placeholder
        fileCount: 2,
      }))
    : legacyTools.map((t) => ({
        id: t.id,
        slug: t.id,
        name: t.name,
        description: t.description,
        logo: t.logo,
        fileCount: t.files.length,
      }));
  
  // Get comparisons for this category
  const allPairs = generateComparisonPairs(keywordTools);
  const categoryComparisons = allPairs
    .filter(([a, b]) => {
      const tool1 = keywordTools.find((t) => t.slug === a);
      const tool2 = keywordTools.find((t) => t.slug === b);
      return tool1?.categorySlug === category || tool2?.categorySlug === category;
    })
    .slice(0, 6)
    .map(([a, b]) => {
      const tool1 = keywordTools.find((t) => t.slug === a);
      const tool2 = keywordTools.find((t) => t.slug === b);
      return {
        slug: generateComparisonSlug(a, b),
        title: `${tool1?.name || a} vs ${tool2?.name || b}`,
        description: `Compare ${tool1?.name || a} and ${tool2?.name || b}`,
      };
    });
  
  // Fallback: Build page data
  if (!pageData) {
    const title = `${categoryInfo.name} | AI Tools & System Prompts`;
    const description = `Browse ${tools.length}+ ${categoryInfo.name.toLowerCase()} with verified system prompts. ${categoryInfo.description}`;
    
    pageData = {
      slug: category,
      template: 'hub',
      category,
      categoryName: categoryInfo.name,
      seo: {
        title,
        description,
        canonical: `${DEFAULT_PSEO_CONFIG.baseUrl}/${category}`,
        keywords: [categoryInfo.name, 'AI tools', 'system prompts', ...categoryInfo.keywords],
        intent: 'navigational',
      },
      openGraph: {
        title,
        description,
        url: `${DEFAULT_PSEO_CONFIG.baseUrl}/${category}`,
        siteName: DEFAULT_PSEO_CONFIG.siteName,
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
      },
      content: {
        h1: `${categoryInfo.name} System Prompts`,
        intro: categoryInfo.description,
        sections: [
          {
            id: 'about',
            heading: `About ${categoryInfo.name}`,
            headingLevel: 2,
            content: `${categoryInfo.name} are tools that help developers write better code with AI assistance. Browse our collection of verified system prompts from the most popular tools in this category.`,
          },
        ],
        faqs: [
          {
            id: 'what-are',
            question: `What are ${categoryInfo.name}?`,
            answer: categoryInfo.description,
          },
          {
            id: 'which-best',
            question: `Which ${categoryInfo.name.toLowerCase()} is best?`,
            answer: `The best tool depends on your specific needs and workflow. Browse our comparisons to find the right fit for you.`,
          },
          {
            id: 'how-to-choose',
            question: `How do I choose between different ${categoryInfo.name.toLowerCase()}?`,
            answer: `Consider factors like integration with your IDE, AI model quality, pricing, and specific features. Our comparison pages can help you decide.`,
          },
        ],
      },
      linking: {
        breadcrumbs: [
          { label: 'Home', href: '/' },
          { label: categoryInfo.name, href: `/${category}`, current: true },
        ],
        relatedPages: categories
          .filter((c) => c.slug !== category)
          .slice(0, 4)
          .map((c) => c.slug),
        hubLinks: [],
      },
      schemaTypes: ['WebPage', 'BreadcrumbList', 'ItemList', 'FAQPage'],
      categoryData: {
        slug: category,
        name: categoryInfo.name,
        description: categoryInfo.description,
        toolCount: tools.length,
        featuredTools: tools.slice(0, 3).map((t) => t.slug),
        featuredComparisons: categoryComparisons.slice(0, 3).map((c) => c.slug),
        featuredGuides: [],
      },
      meta: {
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        version: 1,
      },
    };
  }
  
  return (
    <CategoryHubTemplate 
      pageData={pageData} 
      tools={tools}
      comparisons={categoryComparisons}
      guides={[]}
    />
  );
}

// Enable ISR
export const revalidate = 86400; // 24 hours
