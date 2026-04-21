import type { MetadataRoute } from 'next';
import { DEFAULT_PSEO_CONFIG } from '@/lib/pseo/types';
import { tools as toolsData } from '@/data/tools';
import { 
  categories, 
  guideTopics, 
  generateComparisonPairs,
  generateComparisonSlug,
  tools as keywordTools,
  glossaryTerms,
  personas,
  useCases,
} from '@/data/keyword-matrix';

const BASE_URL = DEFAULT_PSEO_CONFIG.baseUrl;

/**
 * Generate main sitemap
 * For large sites (100k+ pages), this should be split into multiple sitemaps
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();
  
  const entries: MetadataRoute.Sitemap = [];
  
  // ==========================================================================
  // Static Pages
  // ==========================================================================
  
  // Homepage
  entries.push({
    url: BASE_URL,
    lastModified: now,
    changeFrequency: 'daily',
    priority: 1.0,
  });

  entries.push({
    url: `${BASE_URL}/resources`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.78,
  });

  entries.push({
    url: `${BASE_URL}/resources/hermes-openclaw-llm-cheat-sheet`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.75,
  });
  
  // ==========================================================================
  // Category Hub Pages
  // ==========================================================================
  
  for (const category of categories) {
    entries.push({
      url: `${BASE_URL}/${category.slug}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    });
  }
  
  // ==========================================================================
  // Tool Pages
  // ==========================================================================
  
  // From keyword matrix tools
  for (const tool of keywordTools) {
    entries.push({
      url: `${BASE_URL}/tools/${tool.categorySlug}/${tool.slug}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    });
  }
  
  // From legacy tools data (if different)
  for (const tool of toolsData) {
    const categorySlug = tool.category
      .toLowerCase()
      .replace(/[&]/g, 'and')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    
    // Check if already added from keyword tools
    const alreadyAdded = keywordTools.some((kt) => kt.id === tool.id);
    if (!alreadyAdded) {
      entries.push({
        url: `${BASE_URL}/tools/${categorySlug}/${tool.id}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    }
  }
  
  // ==========================================================================
  // Comparison Pages
  // ==========================================================================
  
  const comparisonPairs = generateComparisonPairs(keywordTools);
  for (const [tool1, tool2] of comparisonPairs) {
    const slug = generateComparisonSlug(tool1, tool2);
    entries.push({
      url: `${BASE_URL}/compare/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  }
  
  // ==========================================================================
  // Guide Pages
  // ==========================================================================

  entries.push({
    url: `${BASE_URL}/guides`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  });
  
  for (const topic of guideTopics) {
    entries.push({
      url: `${BASE_URL}/guides/${topic}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  }

  // ==========================================================================
  // Comparison Hub
  // ==========================================================================

  entries.push({
    url: `${BASE_URL}/compare`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  });

  // ==========================================================================
  // Glossary Pages
  // ==========================================================================

  entries.push({
    url: `${BASE_URL}/glossary`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  });

  for (const term of glossaryTerms) {
    entries.push({
      url: `${BASE_URL}/glossary/${term.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  }

  // ==========================================================================
  // Persona Pages
  // ==========================================================================

  for (const persona of personas) {
    entries.push({
      url: `${BASE_URL}/for/${persona.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  }

  // ==========================================================================
  // Use Case Pages
  // ==========================================================================

  entries.push({
    url: `${BASE_URL}/use-cases`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  });

  for (const useCase of useCases) {
    entries.push({
      url: `${BASE_URL}/use-cases/${useCase.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  }
  
  return entries;
}

/**
 * For sites with 50k+ URLs, split into multiple sitemaps
 * Use the robots.txt to reference sitemap index
 */
export function generateSitemapIndex(): Array<{ loc: string; lastmod: string }> {
  const now = new Date().toISOString();
  
  return [
    { loc: `${BASE_URL}/sitemap-main.xml`, lastmod: now },
    { loc: `${BASE_URL}/sitemap-tools.xml`, lastmod: now },
    { loc: `${BASE_URL}/sitemap-comparisons.xml`, lastmod: now },
    { loc: `${BASE_URL}/sitemap-guides.xml`, lastmod: now },
  ];
}
