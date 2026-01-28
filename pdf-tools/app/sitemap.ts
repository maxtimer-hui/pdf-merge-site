import {MetadataRoute} from 'next';
import {locales} from '@/i18n/request';

const tools = ['merge', 'split', 'extract', 'compress', 'rotate', 'delete-pages', 'reorder', 'watermark', 'batch', 'encrypt', 'decrypt'];

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
  const baseUrl = 'https://combinepdffree.net';
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

  // Add legal pages (lower priority)
  const legalPages = ['privacy', 'terms', 'cookies'];
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

  return urls;
}
