'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

interface ToolCTAProps {
  toolPath: string;
  titleKey: string;
  descriptionKey: string;
  locale: string;
  primary?: boolean;
}

/**
 * ToolCTA - 博客文章中的工具行动号召按钮
 *
 * 用于在博客文章中插入指向工具页面的 CTA 按钮
 * 支持主 CTA（大按钮）和次 CTA（中等按钮）两种样式
 */
export default function ToolCTA({
  toolPath,
  titleKey,
  descriptionKey,
  locale,
  primary = true,
}: ToolCTAProps) {
  const t = useTranslations('blog.cta');

  return (
    <Link
      href={`/${locale}${toolPath}`}
      className={`
        block rounded-lg p-6 my-8 transition-all duration-300
        ${primary
          ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl'
          : 'bg-white border-2 border-blue-600 hover:bg-blue-50 shadow-md hover:shadow-lg'
        }
      `}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className={`
            text-xl font-bold mb-2
            ${primary ? 'text-white' : 'text-blue-600'}
          `}>
            {t(titleKey.replace('blog.cta.', ''))}
          </h3>
          <p className={`
            text-sm
            ${primary ? 'text-blue-50' : 'text-gray-600'}
          `}>
            {t(descriptionKey.replace('blog.cta.', ''))}
          </p>
        </div>
        <div className={`
          flex-shrink-0 ml-4
          ${primary ? 'text-white' : 'text-blue-600'}
        `}>
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </div>
      </div>

      {/* 点击提示 */}
      <div className={`
        mt-4 text-xs font-medium flex items-center
        ${primary ? 'text-blue-100' : 'text-blue-600'}
      `}>
        <span>{t('clickToTry')}</span>
        <svg
          className="w-4 h-4 ml-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 7l5 5m0 0l-5 5m5-5H6"
          />
        </svg>
      </div>
    </Link>
  );
}
