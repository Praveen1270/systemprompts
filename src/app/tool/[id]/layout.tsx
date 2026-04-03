import type { Metadata } from 'next';
import { getToolById } from '@/data/tools';

const SITE_URL = 'https://systemprompts.io';
const SITE_NAME = 'SystemPrompts';

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const tool = getToolById(id);

  if (!tool) {
    return {
      title: `Tool Not Found | ${SITE_NAME}`,
      description: 'The requested AI tool could not be found in the archive.',
    };
  }

  const title = `${tool.name} System Prompt – Verified & Reverse-Engineered`;
  const description = `The verified system prompt for ${tool.name}. ${tool.description} Copy and explore the exact instructions used internally.`;
  const url = `${SITE_URL}/tool/${tool.id}`;

  return {
    title,
    description,
    keywords: [
      tool.name,
      `${tool.name} system prompt`,
      `${tool.name} prompt`,
      tool.category,
      'system prompt',
      'LLM prompt',
      'AI prompt',
      'verified prompt',
    ],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      type: 'article',
      url,
      siteName: SITE_NAME,
      images: [
        {
          url: `${SITE_URL}/og-default.png`,
          width: 1200,
          height: 630,
          alt: `${tool.name} system prompt – ${SITE_NAME}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@Praveenthotakur',
      creator: '@Praveenthotakur',
      title,
      description,
      images: [`${SITE_URL}/og-default.png`],
    },
  };
}

export default async function ToolLayout({ children, params }: LayoutProps) {
  const { id } = await params;
  const tool = getToolById(id);

  const faqSchema = tool
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: `What is the ${tool.name} system prompt?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `The ${tool.name} system prompt is the internal instruction set that defines how ${tool.name} behaves. ${tool.description}`,
            },
          },
          {
            '@type': 'Question',
            name: `How do I use the ${tool.name} system prompt?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `Copy the system prompt from this page and use it in your own applications, or study it to understand how ${tool.name} is configured internally.`,
            },
          },
          {
            '@type': 'Question',
            name: `Is the ${tool.name} system prompt official?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `This prompt is collected from public sources and reverse-engineered for educational purposes. It may not represent the current or official prompt used by ${tool.name}.`,
            },
          },
        ],
      }
    : null;

  const softwareSchema = tool
    ? {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: tool.name,
        applicationCategory: 'DeveloperApplication',
        description: tool.description,
        operatingSystem: 'Web',
        url: `${SITE_URL}/tool/${tool.id}`,
      }
    : null;

  return (
    <>
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      {softwareSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
        />
      )}
      {children}
    </>
  );
}
