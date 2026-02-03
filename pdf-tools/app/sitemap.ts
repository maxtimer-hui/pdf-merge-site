import {MetadataRoute} from 'next';
import {locales} from '@/i18n/request';
import {getBlogPosts} from '@/lib/blog-posts';
import {getTutorials} from '@/lib/tutorials';

const tools = ['merge', 'split', 'extract', 'compress', 'rotate', 'delete-pages', 'reorder', 'watermark', 'batch', 'encrypt', 'decrypt'];

const contentPages = ['blog', 'resources', 'tutorials', 'compare'];

const legalPages = ['about', 'contact', 'privacy', 'terms', 'cookies'];

// Content page priorities
const contentPriorities: Record<string, number> = {
  'blog': 0.85,       // High - regularly updated
  'tutorials': 0.80,  // Medium-high - educational content
  'resources': 0.70,  // Medium - external links
  'compare': 0.75,    // Medium - comparison content
};

// Tool priorities based on search volume and importance
const toolPriorities: Record<string, number> = {
  'merge': 0.95,      // Highest - primary tool
  'split': 0.90,      // High
  'compress': 0.90,   // High
  'extract': 0.85,    // Medium-high
  'rotate': 0.80,     // Medium
  'delete-pages': 0.80, // Medium
  'encrypt': 0.75,    // Lower
  'decrypt': 0.75,    // Lower
  'reorder': 0.70,    // Lower
  'watermark': 0.70,  // Lower
  'batch': 0.65,      // Lowest - niche use case
};

// Language priorities based on target markets
const localePriorities: Record<string, number> = {
  'en': 1.0,      // English - primary market
  'zh': 0.9,      // Chinese Simplified - large market
  'zh-tw': 0.8,   // Chinese Traditional
  'es': 0.8,      // Spanish
  'fr': 0.7,      // French
  'de': 0.7,      // German
  'pt': 0.7,      // Portuguese
  'ja': 0.75,     // Japanese
  'ko': 0.7,      // Korean
  'ar': 0.65,     // Arabic
};

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.combinepdffree.net';
  const urls: MetadataRoute.Sitemap = [];

  // Generate homepage and tool pages for each locale
  for (const locale of locales) {
    const localePriority = localePriorities[locale] || 0.7;

    // Homepage
    urls.push({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: localePriority,
    });

    // Tool pages
    for (const tool of tools) {
      const toolPriority = toolPriorities[tool] || 0.7;
      // Combined priority (locale * tool)
      const combinedPriority = Math.min(localePriority * toolPriority, 1);

      urls.push({
        url: `${baseUrl}/${locale}/${tool}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: combinedPriority,
      });
    }
  }

  // Content pages (resources, compare are available for all locales)
  for (const locale of locales) {
    const localePriority = localePriorities[locale] || 0.7;

    // Only add resources and compare for all locales (blog and tutorials are English only initially)
    const universalPages = ['resources', 'compare'];
    for (const page of universalPages) {
      const pagePriority = contentPriorities[page] || 0.7;
      const combinedPriority = Math.min(localePriority * pagePriority, 1);

      urls.push({
        url: `${baseUrl}/${locale}/${page}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: combinedPriority,
      });
    }
  }

  // Blog and tutorials (English only for now)
  const contentLocales = ['en'];
  for (const locale of contentLocales) {
    const localePriority = localePriorities[locale] || 0.7;

    // Blog listing and tutorials
    for (const page of ['blog', 'tutorials']) {
      const pagePriority = contentPriorities[page] || 0.7;
      const combinedPriority = Math.min(localePriority * pagePriority, 1);

      urls.push({
        url: `${baseUrl}/${locale}/${page}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: combinedPriority,
      });
    }
  }

  // Legal and informational pages
  for (const locale of locales) {
    for (const page of legalPages) {
      urls.push({
        url: `${baseUrl}/${locale}/${page}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.3,
      });
    }
  }

  // Blog post pages (English only, dynamically generated)
  const blogPosts = getBlogPosts('en');
  for (const post of blogPosts) {
    urls.push({
      url: `${baseUrl}/en/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  }

  // Tutorial pages (English and Chinese)
  const tutorialLocales = ['en', 'zh'];
  for (const locale of tutorialLocales) {
    const tutorials = getTutorials(locale);
    for (const tutorial of tutorials) {
      urls.push({
        url: `${baseUrl}/${locale}/tutorials/${tutorial.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.75,
      });
    }
  }

  return urls;
}
