'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { blogPosts } from '@/lib/blog-posts';

interface BlogSectionProps {
  locale: string;
}

export default function BlogSection({ locale }: BlogSectionProps) {
  const t = useTranslations('rotate');
  const tCommon = useTranslations('common');

  // Filter articles for current language
  const localePosts = blogPosts.filter(post => post.locale === locale);

  // If no articles in current language, use English articles as fallback
  const fallbackPosts = localePosts.length === 0 ? blogPosts.filter(post => post.locale === 'en') : [];
  const postsSource = localePosts.length > 0 ? localePosts : fallbackPosts;
  const isFallback = localePosts.length === 0;

  // Prioritize articles related to rotate (tags contain 'rotate')
  const rotateRelatedPosts = postsSource.filter(post =>
    post.tags.some(tag => tag.toLowerCase() === 'rotate')
  );

  // Supplement with other articles if less than 3 rotate-related articles
  const otherPosts = postsSource.filter(post =>
    !post.tags.some(tag => tag.toLowerCase() === 'rotate')
  );

  const displayPosts = [...rotateRelatedPosts, ...otherPosts].slice(0, 3);

  return (
    <section className="mt-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-900">
          {tCommon('relatedArticles')}
        </h2>
        <Link
          href={`/${locale}/blog`}
          className="text-orange-600 hover:text-orange-800 font-semibold flex items-center gap-1"
        >
          {tCommon('viewAll')}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {displayPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/${locale}/blog/${post.slug}`}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden group"
          >
            {/* Article image placeholder */}
            <div className="h-40 bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center">
              <span className="text-4xl">📄</span>
            </div>

            <div className="p-6">
              {/* Category tag */}
              <div className="inline-block px-3 py-1 text-xs font-semibold text-orange-600 bg-orange-50 rounded-full mb-3">
                {post.category}
              </div>
              {isFallback && (
                <span className="ml-2 inline-block px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full">
                  English
                </span>
              )}

              {/* Title */}
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors line-clamp-2">
                {post.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {post.description}
              </p>

              {/* Meta information */}
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{post.date}</span>
                <span>{post.readTime}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
