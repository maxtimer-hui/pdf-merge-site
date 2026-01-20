import createMiddleware from 'next-intl/middleware';
import {locales} from './i18n/request';

export default createMiddleware({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale: 'en',

  // Always use prefix for locale
  localePrefix: 'always',

  // Automatically detect locale from browser Accept-Language header
  localeDetection: true
});

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
