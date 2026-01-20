'use client';

import { use } from 'react';
import {useTranslations} from 'next-intl';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function HomeClient({params}: {params: Promise<{locale: string}>}) {
  const {locale} = use(params);
  const t = useTranslations('common');
  const seo = useTranslations('common.seoContent');

  const tools = [
    {name: t('merge'), href: `/${locale}/merge`, icon: '🔗', color: 'bg-blue-500'},
    {name: t('split'), href: `/${locale}/split`, icon: '✂️', color: 'bg-green-500'},
    {name: t('extract'), href: `/${locale}/extract`, icon: '📄', color: 'bg-purple-500'},
    {name: t('compress'), href: `/${locale}/compress`, icon: '🗜️', color: 'bg-orange-500'},
    {name: t('rotate'), href: `/${locale}/rotate`, icon: '🔄', color: 'bg-indigo-500'},
    {name: t('deletePages'), href: `/${locale}/delete-pages`, icon: '🗑️', color: 'bg-red-500'},
    {name: t('reorder'), href: `/${locale}/reorder`, icon: '🔀', color: 'bg-violet-500'},
    {name: t('batch'), href: `/${locale}/batch`, icon: '📦', color: 'bg-pink-500'},
    {name: t('watermark'), href: `/${locale}/watermark`, icon: '💧', color: 'bg-cyan-500'},
    {name: t('encrypt'), href: `/${locale}/encrypt`, icon: '🔐', color: 'bg-yellow-500'},
    {name: t('decrypt'), href: `/${locale}/decrypt`, icon: '🔓', color: 'bg-teal-500'},
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar currentLocale={locale} />

      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            {t('appName')}
          </h1>
          <p className="text-xl text-gray-600">
            {t('tagline')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {tools.map((tool) => (
            <Link
              key={tool.name}
              href={tool.href}
              className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 p-6 text-center group"
            >
              <div className={`w-16 h-16 ${tool.color} rounded-full flex items-center justify-center mx-auto mb-4 text-3xl group-hover:scale-110 transition-transform`}>
                {tool.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                {tool.name}
              </h3>
            </Link>
          ))}
        </div>

        <div className="mt-16 bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('whyChooseUs')}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-2">🔒</div>
              <h3 className="font-semibold mb-2">{t('security')}</h3>
              <p className="text-gray-600 text-sm">{t('securityDesc')}</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">⚡</div>
              <h3 className="font-semibold mb-2">{t('fast')}</h3>
              <p className="text-gray-600 text-sm">{t('fastDesc')}</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">💰</div>
              <h3 className="font-semibold mb-2">{t('free')}</h3>
              <p className="text-gray-600 text-sm">{t('freeDesc')}</p>
            </div>
          </div>
        </div>

        {/* SEO Content Section */}
        <div className="mt-16 bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">{seo('title')}</h2>
          <p className="text-lg text-blue-600 font-semibold mb-6">{seo('subtitle')}</p>

          <p className="text-gray-700 mb-6 leading-relaxed">{seo('intro')}</p>

          <h3 className="text-xl font-bold text-gray-900 mb-4">{seo('features.title')}</h3>
          <ul className="space-y-3 mb-6">
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">✓</span>
              <span className="text-gray-700">{seo('features.feature1')}</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">✓</span>
              <span className="text-gray-700">{seo('features.feature2')}</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">✓</span>
              <span className="text-gray-700">{seo('features.feature3')}</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">✓</span>
              <span className="text-gray-700">{seo('features.feature4')}</span>
            </li>
          </ul>

          <h3 className="text-xl font-bold text-gray-900 mb-4">{seo('howTo.title')}</h3>
          <ol className="space-y-3 mb-6">
            <li className="flex items-start">
              <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">1</span>
              <span className="text-gray-700">{seo('howTo.step1')}</span>
            </li>
            <li className="flex items-start">
              <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">2</span>
              <span className="text-gray-700">{seo('howTo.step2')}</span>
            </li>
            <li className="flex items-start">
              <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">3</span>
              <span className="text-gray-700">{seo('howTo.step3')}</span>
            </li>
          </ol>

          <h3 className="text-xl font-bold text-gray-900 mb-4">{seo('useCases.title')}</h3>
          <ul className="space-y-3 mb-6">
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span className="text-gray-700">{seo('useCases.case1')}</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span className="text-gray-700">{seo('useCases.case2')}</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span className="text-gray-700">{seo('useCases.case3')}</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span className="text-gray-700">{seo('useCases.case4')}</span>
            </li>
          </ul>

          <p className="text-gray-700 leading-relaxed border-t border-gray-200 pt-6">{seo('conclusion')}</p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
