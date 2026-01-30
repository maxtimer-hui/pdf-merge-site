'use client';

import { useTranslations } from 'next-intl';

interface HeroSectionProps {
  locale: string;
}

export default function HeroSection({ locale }: HeroSectionProps) {
  const t = useTranslations('extract.hero');

  return (
    <div className="text-center mb-8">
      {/* Large icon */}
      <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl">
        📄
      </div>

      {/* H1 Title - SEO optimized */}
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
        {t('title')}
      </h1>

      {/* Short description */}
      <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
        {t('description')}
      </p>

      {/* Key selling points list */}
      <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-700">
        <div className="flex items-center gap-2">
          <span className="text-blue-500 text-xl">✓</span>
          <span>{t('point1')}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-blue-500 text-xl">✓</span>
          <span>{t('point2')}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-blue-500 text-xl">✓</span>
          <span>{t('point3')}</span>
        </div>
      </div>
    </div>
  );
}
