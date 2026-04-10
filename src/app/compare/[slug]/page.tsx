import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ComparisonTemplate } from '@/templates/ComparisonTemplate';
import { 
  loadComparisonPageData, 
  generateComparisonStaticParams,
  DEFAULT_PSEO_CONFIG 
} from '@/lib/pseo';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo/metadata';
import { tools as toolsData } from '@/data/tools';
import { generateComparisonPairs, generateComparisonSlug } from '@/data/keyword-matrix';
import { tools as keywordTools } from '@/data/keyword-matrix';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// =============================================================================
// Static Generation
// =============================================================================

export async function generateStaticParams() {
  // Try to load from PSEO data first
  const pseoParams = await generateComparisonStaticParams();
  
  if (pseoParams.length > 0) {
    return pseoParams;
  }
  
  // Fallback: Generate from keyword matrix
  const pairs = generateComparisonPairs(keywordTools);
  return pairs.map(([tool1, tool2]) => ({
    slug: generateComparisonSlug(tool1, tool2),
  }));
}

// =============================================================================
// Metadata Generation
// =============================================================================

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  
  // Try to load PSEO page data first
  const pageData = await loadComparisonPageData(slug);
  
  if (pageData) {
    return generateSEOMetadata(pageData);
  }
  
  // Parse tools from slug
  const [tool1Slug, tool2Slug] = slug.split('-vs-');
  const tool1 = toolsData.find((t) => t.id === tool1Slug);
  const tool2 = toolsData.find((t) => t.id === tool2Slug);
  
  if (!tool1 || !tool2) {
    return {
      title: 'Comparison Not Found | SystemPrompts',
      description: 'The requested comparison could not be found.',
    };
  }
  
  const title = `${tool1.name} vs ${tool2.name}: ${new Date().getFullYear()} Comparison`;
  const description = `Compare ${tool1.name} and ${tool2.name}. Detailed comparison of features, pros, cons, and which AI tool is right for you.`;
  const ogImage = `${DEFAULT_PSEO_CONFIG.baseUrl}${DEFAULT_PSEO_CONFIG.defaultOgImage}`;

  return {
    title,
    description,
    keywords: [tool1.name, tool2.name, 'comparison', 'vs', 'AI tools'],
    alternates: {
      canonical: `${DEFAULT_PSEO_CONFIG.baseUrl}/compare/${slug}`,
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: `${DEFAULT_PSEO_CONFIG.baseUrl}/compare/${slug}`,
      siteName: DEFAULT_PSEO_CONFIG.siteName,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

// =============================================================================
// Page Component
// =============================================================================

export default async function ComparisonPage({ params }: PageProps) {
  const { slug } = await params;
  
  // Try to load PSEO page data first
  let pageData = await loadComparisonPageData(slug);
  
  // Fallback: Build page data from tools
  if (!pageData) {
    const [tool1Slug, tool2Slug] = slug.split('-vs-');
    const tool1 = toolsData.find((t) => t.id === tool1Slug);
    const tool2 = toolsData.find((t) => t.id === tool2Slug);
    
    if (!tool1 || !tool2) {
      notFound();
    }
    
    const title = `${tool1.name} vs ${tool2.name}: ${new Date().getFullYear()} Comparison`;
    const description = `Compare ${tool1.name} and ${tool2.name}. Detailed comparison of features, pros, cons, and which AI tool is right for you.`;
    
    pageData = {
      slug,
      template: 'comparison',
      category: 'comparisons',
      categoryName: 'Comparisons',
      seo: {
        title,
        description,
        canonical: `${DEFAULT_PSEO_CONFIG.baseUrl}/compare/${slug}`,
        keywords: [tool1.name, tool2.name, 'comparison', 'vs', 'AI tools'],
        intent: 'commercial',
      },
      openGraph: {
        title,
        description,
        url: `${DEFAULT_PSEO_CONFIG.baseUrl}/compare/${slug}`,
        siteName: DEFAULT_PSEO_CONFIG.siteName,
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
      },
      content: {
        h1: `${tool1.name} vs ${tool2.name}`,
        intro: `Looking for the best AI tool? Compare ${tool1.name} and ${tool2.name} side by side to find out which one suits your needs better.`,
        sections: [
          {
            id: 'overview',
            heading: 'Overview',
            headingLevel: 2,
            content: `${tool1.name} and ${tool2.name} are both popular choices in the ${tool1.category} space. Each has its own strengths and use cases.`,
          },
        ],
        faqs: [
          {
            id: 'which-better',
            question: `Which is better: ${tool1.name} or ${tool2.name}?`,
            answer: `The best choice depends on your specific needs. ${tool1.name} excels at ${tool1.description.toLowerCase()}, while ${tool2.name} is known for ${tool2.description.toLowerCase()}.`,
          },
          {
            id: 'can-use-both',
            question: `Can I use both ${tool1.name} and ${tool2.name}?`,
            answer: `Yes, many developers use multiple AI tools depending on the task at hand. You can use both tools and choose the one that works best for each specific use case.`,
          },
          {
            id: 'pricing',
            question: `How do ${tool1.name} and ${tool2.name} compare on pricing?`,
            answer: `Both tools offer different pricing tiers. Check their official websites for the most up-to-date pricing information.`,
          },
        ],
      },
      linking: {
        breadcrumbs: [
          { label: 'Home', href: '/' },
          { label: 'Comparisons', href: '/compare' },
          { label: `${tool1.name} vs ${tool2.name}`, href: `/compare/${slug}`, current: true },
        ],
        relatedPages: [],
        hubLinks: ['compare'],
      },
      schemaTypes: ['WebPage', 'BreadcrumbList', 'ItemList', 'FAQPage'],
      comparisonData: {
        tool1: {
          id: tool1.id,
          name: tool1.name,
          slug: tool1.id,
          logo: tool1.logo,
          pros: [
            `Excellent ${tool1.category.toLowerCase()} capabilities`,
            'Active development and updates',
            'Strong community support',
          ],
          cons: [
            'Learning curve for new users',
            'May require subscription',
          ],
          bestFor: tool1.description,
        },
        tool2: {
          id: tool2.id,
          name: tool2.name,
          slug: tool2.id,
          logo: tool2.logo,
          pros: [
            `Strong ${tool2.category.toLowerCase()} features`,
            'Regular improvements',
            'Good documentation',
          ],
          cons: [
            'Some features may be limited',
            'Pricing may vary',
          ],
          bestFor: tool2.description,
        },
        features: [
          {
            name: 'AI Model Quality',
            description: 'Quality of AI-generated code',
            tool1Value: 'Excellent',
            tool2Value: 'Excellent',
            winner: 'tie',
          },
          {
            name: 'Integration',
            description: 'IDE and workflow integration',
            tool1Value: true,
            tool2Value: true,
          },
          {
            name: 'Documentation',
            description: 'Quality of docs and guides',
            tool1Value: 'Good',
            tool2Value: 'Good',
          },
        ],
        verdict: `Both ${tool1.name} and ${tool2.name} are excellent choices for AI-assisted development. Your choice should depend on your specific workflow and preferences.`,
        recommendation: `Try both tools to see which fits better with your development style. Most offer free tiers or trials.`,
      },
      meta: {
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        version: 1,
      },
    };
  }
  
  return <ComparisonTemplate pageData={pageData} />;
}

// Enable ISR
export const revalidate = 86400; // 24 hours
