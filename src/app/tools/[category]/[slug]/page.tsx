import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ToolLandingTemplate } from '@/templates/ToolLandingTemplate';
import { 
  loadToolPageData, 
  generateToolStaticParams,
  DEFAULT_PSEO_CONFIG 
} from '@/lib/pseo';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo/metadata';
import { tools as toolsData } from '@/data/tools';
import { filePathMap } from '@/data/filePathMap';
import fs from 'fs';
import path from 'path';

interface PageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

// =============================================================================
// Static Generation
// =============================================================================

function toolCategorySlug(category: string): string {
  return category
    .toLowerCase()
    .replace(/[&]/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export async function generateStaticParams() {
  const pseoParams = await generateToolStaticParams();
  const fromTools = toolsData.map((tool) => ({
    category: toolCategorySlug(tool.category),
    slug: tool.id,
  }));

  // Merge PSEO JSON pages with every tool in tools.ts (PSEO alone only listed a subset)
  const key = (p: { category: string; slug: string }) => `${p.category}:${p.slug}`;
  const seen = new Set<string>();
  const merged: Array<{ category: string; slug: string }> = [];
  for (const p of [...pseoParams, ...fromTools]) {
    const k = key(p);
    if (seen.has(k)) continue;
    seen.add(k);
    merged.push(p);
  }
  return merged;
}

// =============================================================================
// Metadata Generation
// =============================================================================

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category, slug } = await params;
  
  // Try to load PSEO page data first
  const pageData = await loadToolPageData(category, slug);
  
  if (pageData) {
    return generateSEOMetadata(pageData);
  }
  
  // Fallback: Generate from tools data
  const tool = toolsData.find((t) => t.id === slug);
  
  if (!tool) {
    return {
      title: 'Tool Not Found | SystemPrompts',
      description: 'The requested tool could not be found.',
    };
  }
  
  const title = `${tool.name} System Prompt | ${tool.category} Prompts`;
  const description = `Explore ${tool.name} system prompts. ${tool.description}`;
  const ogImage = `${DEFAULT_PSEO_CONFIG.baseUrl}${DEFAULT_PSEO_CONFIG.defaultOgImage}`;

  return {
    title,
    description,
    keywords: [tool.name, 'system prompt', tool.category, 'AI prompt'],
    alternates: {
      canonical: `${DEFAULT_PSEO_CONFIG.baseUrl}/tools/${category}/${slug}`,
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: `${DEFAULT_PSEO_CONFIG.baseUrl}/tools/${category}/${slug}`,
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

export default async function ToolPage({ params }: PageProps) {
  const { category, slug } = await params;
  
  // Try to load PSEO page data first
  let pageData = await loadToolPageData(category, slug);
  
  // Fallback: Build page data from existing tools
  if (!pageData) {
    const tool = toolsData.find((t) => t.id === slug);
    
    if (!tool) {
      notFound();
    }
    
    const categorySlug = tool.category
      .toLowerCase()
      .replace(/[&]/g, 'and')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    
    // Build page data from tool
    pageData = {
      slug: tool.id,
      template: 'tool',
      category: categorySlug,
      categoryName: tool.category,
      seo: {
        title: `${tool.name} System Prompt | ${tool.category} Prompts`,
        description: `Explore ${tool.name} system prompts. ${tool.description}`,
        canonical: `${DEFAULT_PSEO_CONFIG.baseUrl}/tools/${categorySlug}/${tool.id}`,
        keywords: [tool.name, 'system prompt', tool.category, 'AI prompt'],
        intent: 'informational',
      },
      openGraph: {
        title: `${tool.name} System Prompt | ${tool.category} Prompts`,
        description: `Explore ${tool.name} system prompts. ${tool.description}`,
        url: `${DEFAULT_PSEO_CONFIG.baseUrl}/tools/${categorySlug}/${tool.id}`,
        siteName: DEFAULT_PSEO_CONFIG.siteName,
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: `${tool.name} System Prompt | ${tool.category} Prompts`,
        description: `Explore ${tool.name} system prompts. ${tool.description}`,
      },
      content: {
        h1: `${tool.name} System Prompts`,
        intro: tool.description,
        sections: [],
        faqs: [
          {
            id: 'what-is',
            question: `What is ${tool.name}?`,
            answer: tool.description,
          },
          {
            id: 'how-to-use',
            question: `How do I use ${tool.name} system prompts?`,
            answer: `You can copy the system prompts from this page and use them in your own applications or to understand how ${tool.name} works internally.`,
          },
          {
            id: 'is-official',
            question: `Are these ${tool.name} prompts official?`,
            answer: `These prompts are collected from public sources and may not represent the current or official prompts used by ${tool.name}. They are provided for educational purposes.`,
          },
        ],
      },
      linking: {
        breadcrumbs: [
          { label: 'Home', href: '/' },
          { label: 'Tools', href: '/tools' },
          { label: tool.category, href: `/${categorySlug}` },
          { label: tool.name, href: `/tools/${categorySlug}/${tool.id}`, current: true },
        ],
        relatedPages: toolsData
          .filter((t) => t.category === tool.category && t.id !== tool.id)
          .slice(0, 4)
          .map((t) => t.id),
        hubLinks: [categorySlug],
      },
      schemaTypes: ['WebPage', 'BreadcrumbList', 'SoftwareApplication', 'FAQPage'],
      toolData: {
        id: tool.id,
        name: tool.name,
        slug: tool.id,
        category: tool.category,
        categorySlug,
        description: tool.description,
        logo: tool.logo,
        files: tool.files.map((f) => ({
          name: f.name,
          type: f.type,
        })),
      },
      meta: {
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        version: 1,
      },
    };
  }
  
  // Try to load prompt content
  let promptContent: string | undefined;
  const tool = toolsData.find((t) => t.id === slug);
  
  if (tool && tool.files.length > 0) {
    const firstPromptFile = tool.files.find((f) => f.type === 'prompt');
    if (firstPromptFile) {
      const filePath = filePathMap[tool.id]?.[firstPromptFile.name];
      if (filePath) {
        try {
          const fullPath = path.join(process.cwd(), 'src', filePath);
          promptContent = fs.readFileSync(fullPath, 'utf-8');
        } catch (e) {
          // File not found, continue without content
        }
      }
    }
  }
  
  return <ToolLandingTemplate pageData={pageData} promptContent={promptContent} />;
}

// Enable ISR
export const revalidate = 86400; // 24 hours
