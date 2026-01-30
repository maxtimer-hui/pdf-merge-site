'use client';

import { useTranslations } from 'next-intl';

interface UseCasesSectionProps {
  locale: string;
}

export default function UseCasesSection({ locale }: UseCasesSectionProps) {
  const t = useTranslations('rotate.useCases');

  const useCases = [
    { icon: t('case1.icon'), title: t('case1.title'), description: t('case1.description') },
    { icon: t('case2.icon'), title: t('case2.title'), description: t('case2.description') },
    { icon: t('case3.icon'), title: t('case3.title'), description: t('case3.description') },
    { icon: t('case4.icon'), title: t('case4.title'), description: t('case4.description') },
  ];

  return (
    <section className="mt-16 bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg p-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        {t('title')}
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {useCases.map((useCase, index) => (
          <div key={index} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="text-3xl mb-3">{useCase.icon}</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {useCase.title}
            </h3>
            <p className="text-gray-600 text-sm">
              {useCase.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
