'use client';

import { useTranslations } from 'next-intl';

interface SEOContentSectionProps {
  locale: string;
}

export default function SEOContentSection({ locale }: SEOContentSectionProps) {
  const t = useTranslations('compress.seoContent');

  const contentBlocks = [
    { title: t('block1.title'), content: t('block1.content') },
    { title: t('block2.title'), content: t('block2.content') },
    { title: t('block3.title'), content: t('block3.content') },
    { title: t('block4.title'), content: t('block4.content') },
    { title: t('block5.title'), content: t('block5.content') },
  ];

  return (
    <section className="mt-16">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        {t('title')}
      </h2>

      <div className="space-y-8">
        {contentBlocks.map((block, index) => (
          <article key={index} className="bg-white rounded-lg shadow-md p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              {block.title}
            </h3>
            <div className="text-gray-600 leading-relaxed">
              {block.content}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
