'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import {relatedTools} from '@/lib/related-tools';

interface RelatedToolsProps {
  currentTool: string;
  locale: string;
}

export default function RelatedTools({currentTool, locale}: RelatedToolsProps) {
  const t = useTranslations('common.relatedTools');
  const tc = useTranslations('common');
  const tools = relatedTools[currentTool];

  if (!tools || tools.length === 0) {
    return null;
  }

  return (
    <section className="mt-16 bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {t('title')}
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <Link
            key={tool.href}
            href={`/${locale}${tool.href}`}
            className="border rounded-lg p-6 hover:border-blue-500 hover:shadow-md transition-all group"
          >
            <div className="text-4xl mb-3">{tool.icon}</div>
            <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600">
              {tc(tool.name)}
            </h3>
            <p className="text-sm text-gray-600">{tool.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
