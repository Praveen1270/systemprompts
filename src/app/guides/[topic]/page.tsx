import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { GuideTemplate } from '@/templates/GuideTemplate';
import { 
  loadGuidePageData, 
  generateGuideStaticParams,
  DEFAULT_PSEO_CONFIG 
} from '@/lib/pseo';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo/metadata';
import { guideTopics } from '@/data/keyword-matrix';

interface PageProps {
  params: Promise<{
    topic: string;
  }>;
}

// =============================================================================
// Static Generation
// =============================================================================

export async function generateStaticParams() {
  // Try to load from PSEO data first
  const pseoParams = await generateGuideStaticParams();
  
  if (pseoParams.length > 0) {
    return pseoParams;
  }
  
  // Fallback: Generate from guide topics
  return guideTopics.map((topic) => ({
    topic,
  }));
}

// =============================================================================
// Metadata Generation
// =============================================================================

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { topic } = await params;
  
  // Try to load PSEO page data first
  const pageData = await loadGuidePageData(topic);
  
  if (pageData) {
    return generateSEOMetadata(pageData);
  }
  
  // Fallback: Generate basic metadata
  const formattedTopic = topic
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  
  const title = `${formattedTopic} | Complete Guide | SystemPrompts`;
  const description = `Learn about ${formattedTopic.toLowerCase()}. Comprehensive guide with best practices, examples, and expert tips.`;
  
  return {
    title,
    description,
    keywords: [formattedTopic, 'guide', 'tutorial', 'AI', 'best practices'],
    alternates: {
      canonical: `${DEFAULT_PSEO_CONFIG.baseUrl}/guides/${topic}`,
    },
    openGraph: {
      title,
      description,
      type: 'article',
      url: `${DEFAULT_PSEO_CONFIG.baseUrl}/guides/${topic}`,
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

export default async function GuidePage({ params }: PageProps) {
  const { topic } = await params;
  
  // Try to load PSEO page data first
  let pageData = await loadGuidePageData(topic);
  
  // Fallback: Build page data
  if (!pageData) {
    // Check if topic is valid
    if (!guideTopics.includes(topic)) {
      notFound();
    }
    
    const formattedTopic = topic
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    const title = `${formattedTopic} | Complete Guide`;
    const description = `Learn about ${formattedTopic.toLowerCase()}. Comprehensive guide with best practices, examples, and expert tips.`;
    
    pageData = {
      slug: topic,
      template: 'guide',
      category: 'guides',
      categoryName: 'Guides',
      seo: {
        title,
        description,
        canonical: `${DEFAULT_PSEO_CONFIG.baseUrl}/guides/${topic}`,
        keywords: [formattedTopic, 'guide', 'tutorial', 'AI', 'best practices'],
        intent: 'informational',
      },
      openGraph: {
        title,
        description,
        url: `${DEFAULT_PSEO_CONFIG.baseUrl}/guides/${topic}`,
        siteName: DEFAULT_PSEO_CONFIG.siteName,
        type: 'article',
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
      },
      content: {
        h1: formattedTopic,
        intro: `This comprehensive guide covers everything you need to know about ${formattedTopic.toLowerCase()}.`,
        sections: [
          {
            id: 'introduction',
            heading: 'Introduction',
            headingLevel: 2,
            content: `${formattedTopic} is an important topic in the world of AI and software development. This guide will walk you through the key concepts, best practices, and practical tips.`,
          },
          {
            id: 'getting-started',
            heading: 'Getting Started',
            headingLevel: 2,
            content: `Before diving deep into ${formattedTopic.toLowerCase()}, let's cover the basics and prerequisites you'll need.`,
          },
          {
            id: 'best-practices',
            heading: 'Best Practices',
            headingLevel: 2,
            content: `Follow these best practices to get the most out of ${formattedTopic.toLowerCase()} in your workflow.`,
            bullets: [
              'Start with clear objectives',
              'Iterate and improve continuously',
              'Document your learnings',
              'Stay updated with latest developments',
            ],
          },
          {
            id: 'conclusion',
            heading: 'Conclusion',
            headingLevel: 2,
            content: `${formattedTopic} is a valuable skill in modern development. By following this guide, you'll be well-equipped to apply these concepts in your work.`,
          },
        ],
        faqs: [
          {
            id: 'what-is',
            question: `What is ${formattedTopic}?`,
            answer: `${formattedTopic} refers to ${formattedTopic.toLowerCase()} concepts and practices in AI-assisted development.`,
          },
          {
            id: 'why-important',
            question: `Why is ${formattedTopic} important?`,
            answer: `Understanding ${formattedTopic.toLowerCase()} helps you work more effectively with AI tools and improve your development workflow.`,
          },
          {
            id: 'how-to-learn',
            question: `How can I learn more about ${formattedTopic}?`,
            answer: `This guide provides a solid foundation. You can also explore related guides and tool documentation for deeper understanding.`,
          },
        ],
      },
      linking: {
        breadcrumbs: [
          { label: 'Home', href: '/' },
          { label: 'Guides', href: '/guides' },
          { label: formattedTopic, href: `/guides/${topic}`, current: true },
        ],
        relatedPages: guideTopics
          .filter((t) => t !== topic)
          .slice(0, 4),
        hubLinks: ['guides'],
        siblings: getSiblingGuides(topic),
      },
      schemaTypes: ['WebPage', 'BreadcrumbList', 'Article', 'FAQPage'],
      guideData: {
        topic: formattedTopic,
        title: formattedTopic,
        publishedAt: new Date().toISOString(),
        readingTime: 8,
        tableOfContents: [
          { id: 'introduction', title: 'Introduction', level: 2 },
          { id: 'getting-started', title: 'Getting Started', level: 2 },
          { id: 'best-practices', title: 'Best Practices', level: 2 },
          { id: 'conclusion', title: 'Conclusion', level: 2 },
        ],
      },
      meta: {
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        version: 1,
      },
    };
  }
  
  return <GuideTemplate pageData={pageData} />;
}

function getSiblingGuides(currentTopic: string): {
  previous?: { slug: string; title: string; position: -1 };
  next?: { slug: string; title: string; position: 1 };
} {
  const currentIndex = guideTopics.indexOf(currentTopic);
  if (currentIndex === -1) return {};
  
  const formatTitle = (slug: string) => 
    slug.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  
  return {
    previous: currentIndex > 0 ? {
      slug: guideTopics[currentIndex - 1],
      title: formatTitle(guideTopics[currentIndex - 1]),
      position: -1,
    } : undefined,
    next: currentIndex < guideTopics.length - 1 ? {
      slug: guideTopics[currentIndex + 1],
      title: formatTitle(guideTopics[currentIndex + 1]),
      position: 1,
    } : undefined,
  };
}

// Enable ISR
export const revalidate = 86400; // 24 hours
