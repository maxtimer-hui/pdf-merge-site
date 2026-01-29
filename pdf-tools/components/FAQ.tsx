'use client';

import { useTranslations } from 'next-intl';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  faqs: FAQItem[];
}

export default function FAQ({ faqs }: FAQProps) {
  const t = useTranslations('common.faqSection');

  if (!faqs || faqs.length === 0) {
    return null;
  }

  return (
    <section className="mt-16 bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {t('title')}
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <details
            key={index}
            className="border rounded-lg p-4 group"
          >
            <summary className="font-semibold cursor-pointer list-none flex items-center justify-between">
              {faq.question}
              <span className="transition-transform group-open:rotate-180">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </span>
            </summary>
            <p className="mt-3 text-gray-600 pl-4 border-l-4 border-blue-500">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
