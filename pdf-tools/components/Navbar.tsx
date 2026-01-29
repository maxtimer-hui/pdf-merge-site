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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const getPathnameWithoutLocale = () => {
    const parts = pathname.split('/');
    parts.shift(); // remove empty first element
    parts.shift(); // remove locale
    return '/' + parts.join('/');
  };

  const navLinks = [
    {href: `/${currentLocale}`, label: t('home')},
    {href: `/${currentLocale}/blog`, label: 'Blog'},
    {href: `/${currentLocale}/tutorials`, label: 'Tutorials'},
    {href: `/${currentLocale}/resources`, label: 'Resources'},
    {href: `/${currentLocale}/compare`, label: 'Compare'},
    {href: `/${currentLocale}/about`, label: t('about')},
    {href: `/${currentLocale}/contact`, label: t('contact')},
  ];

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href={`/${currentLocale}`} className="text-2xl font-bold text-blue-600">
            {t('appName')}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href={`/${currentLocale}`} className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              {t('home')}
            </Link>
            <Link href={`/${currentLocale}/blog`} className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Blog
            </Link>
            <Link href={`/${currentLocale}/tutorials`} className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Tutorials
            </Link>
            <Link href={`/${currentLocale}/resources`} className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Resources
            </Link>
            <Link href={`/${currentLocale}/compare`} className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Compare
            </Link>
            <Link href={`/${currentLocale}/about`} className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              {t('about')}
            </Link>
            <Link href={`/${currentLocale}/contact`} className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              {t('contact')}
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

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-700 hover:text-blue-600 transition-colors font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
