import { Metadata } from 'next';
import { locales, Locale } from '@/i18n/request';

/**
 * Generate canonical URL for a given locale and path
 */
export function getCanonicalUrl(
  locale: string,
  path: string = ''
): string {
  const baseUrl = 'https://www.combinepdffree.net';
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl}/${locale}${cleanPath}`;
}

/**
 * Generate alternate language URLs for hreflang
 */
export function getAlternateUrls(
  localeList: ReadonlyArray<string> | string[],
  currentLocale: string,
  path: string = ''
): Record<string, string> {
  const alternates: Record<string, string> = {};

  localeList.forEach(locale => {
    alternates[locale] = getCanonicalUrl(locale, path);
  });

  // Add x-default pointing to English
  if (!alternates['x-default']) {
    alternates['x-default'] = getCanonicalUrl('en', path);
  }

  return alternates;
}

/**
 * Generate alternates metadata for a page (canonical + hreflang)
 * Use this in generateMetadata for all tool and content pages
 */
export function getPageAlternates(
  locale: string,
  path: string = ''
): Metadata['alternates'] {
  return {
    canonical: getCanonicalUrl(locale, path),
    languages: getAlternateUrls([...locales], locale, path),
  };
}
