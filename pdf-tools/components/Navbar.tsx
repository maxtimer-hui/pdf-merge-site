'use client';

import {useLocale, useTranslations} from 'next-intl';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useState} from 'react';

const locales = [
  {code: 'zh', name: '简体中文'},
  {code: 'zh-tw', name: '繁體中文'},
  {code: 'en', name: 'English'},
  {code: 'es', name: 'Español'},
  {code: 'fr', name: 'Français'},
  {code: 'de', name: 'Deutsch'},
  {code: 'ar', name: 'العربية'},
  {code: 'pt', name: 'Português'},
  {code: 'ja', name: '日本語'},
  {code: 'ko', name: '한국어'},
];

export default function Navbar({currentLocale}: {currentLocale: string}) {
  const t = useTranslations('common');
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const getPathnameWithoutLocale = () => {
    const parts = pathname.split('/');
    parts.shift(); // remove empty first element
    parts.shift(); // remove locale
    return '/' + parts.join('/');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href={`/${currentLocale}`} className="text-2xl font-bold text-blue-600">
            {t('appName')}
          </Link>

          <div className="flex items-center space-x-6">
            <Link href={`/${currentLocale}`} className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              {t('home')}
            </Link>

            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <span>🌐</span>
                <span className="text-sm">{locales.find(l => l.code === currentLocale)?.name || 'Language'}</span>
                <svg className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-50 max-h-96 overflow-y-auto">
                  {locales.map((locale) => (
                    <Link
                      key={locale.code}
                      href={`/${locale.code}${getPathnameWithoutLocale()}`}
                      className="block px-4 py-2 hover:bg-gray-100 transition-colors"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      {locale.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
