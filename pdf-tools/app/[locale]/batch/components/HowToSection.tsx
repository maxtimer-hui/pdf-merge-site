'use client';

import { useTranslations } from 'next-intl';

interface HowToSectionProps {
  locale: string;
}

export default function HowToSection({ locale }: HowToSectionProps) {
  const t = useTranslations('batch.howTo');

  const steps = [
    { title: t('step1.title'), description: t('step1.description') },
    { title: t('step2.title'), description: t('step2.description') },
    { title: t('step3.title'), description: t('step3.description') },
  ];

  return (
    <section className="mt-16 bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        {t('title')}
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <div key={index} className="text-center">
            <div className="w-16 h-16 bg-violet-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-white">
              {index + 1}
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {step.title}
            </h3>
            <p className="text-gray-600">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
