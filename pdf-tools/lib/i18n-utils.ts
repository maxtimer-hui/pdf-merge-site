import { Locale } from '@/i18n/request';

/**
 * 从请求中获取 locale
 * 支持从 query 参数、header 或默认值获取
 */
export function getLocaleFromRequest(request: Request): Locale {
  const url = new URL(request.url);
  const localeParam = url.searchParams.get('locale');
  const headerLocale = request.headers.get('accept-language')?.split(',')[0].split('-')[0];

  const locale = (localeParam || headerLocale || 'en') as string;
  const validLocales = ['zh', 'zh-tw', 'en', 'es', 'fr', 'de', 'ar', 'pt', 'ja', 'ko'];

  if (!validLocales.includes(locale)) {
    return 'en';
  }

  return locale as Locale;
}

/**
 * 获取翻译的消息（用于 API 路由）
 */
export async function getLocalizedMessage(locale: Locale, key: string): Promise<string> {
  try {
    const messages = (await import(`@/messages/${locale}.json`)).default;
    const keys = key.split('.');
    let value: any = messages;

    for (const k of keys) {
      value = value?.[k];
    }

    return value || key;
  } catch (error) {
    console.error(`Failed to load translation for locale ${locale}, key ${key}:`, error);
    return key;
  }
}

/**
 * 获取错误消息（用于 API 路由）
 */
export async function getErrorMessage(locale: Locale, errorKey: string): Promise<string> {
  return getLocalizedMessage(locale, `common.errors.${errorKey}`);
}
