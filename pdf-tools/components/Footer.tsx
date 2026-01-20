'use client';

import {useTranslations, useLocale} from 'next-intl';
import Link from 'next/link';

export default function Footer() {
  const t = useTranslations('common');
  const locale = useLocale();

  const toolLinks = [
    {name: t('merge'), href: `/${locale}/merge`},
    {name: t('split'), href: `/${locale}/split`},
    {name: t('extract'), href: `/${locale}/extract`},
    {name: t('compress'), href: `/${locale}/compress`},
    {name: t('rotate'), href: `/${locale}/rotate`},
  ];

  const companyLinks = [
    {name: t('about'), href: `/${locale}/about`},
    {name: t('contact'), href: `/${locale}/contact`},
  ];

  const legalLinks = [
    {name: t('privacy'), href: `/${locale}/privacy`},
    {name: t('terms'), href: `/${locale}/terms`},
    {name: t('cookies'), href: `/${locale}/cookies`},
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div>
            <Link href={`/${locale}`} className="text-2xl font-bold text-white hover:text-blue-400 transition-colors">
              {t('appName')}
            </Link>
            <p className="mt-4 text-sm text-gray-400">
              {t('tagline')}
            </p>
            <p className="mt-2 text-xs text-gray-500">
              {t('footerTagline')}
            </p>
          </div>

          {/* Tools Section */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t('tools')}</h3>
            <ul className="space-y-2 text-sm">
              {toolLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-blue-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href={`/${locale}#all-tools`} className="hover:text-blue-400 transition-colors">
                  {t('moreTools')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Section */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t('company')}</h3>
            <ul className="space-y-2 text-sm">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-blue-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Section */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t('legal')}</h3>
            <ul className="space-y-2 text-sm">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-blue-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} {t('appName')}. {t('footerRights')}</p>
          <p className="mt-2">{t('madeWithLove')}</p>
        </div>
      </div>
    </footer>
  );
}
