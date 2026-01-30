'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { blogPosts } from '@/lib/blog-posts';

interface BlogSectionProps {
  locale: string;
}

export default function BlogSection({ locale }: BlogSectionProps) {
  const tCommon = useTranslations('common');

  // Filter posts for current locale
  const localePosts = blogPosts.filter(post => post.locale === locale);

  // Prioritize posts related to reorder (tags containing 'reorder')
  const reorderRelatedPosts = localePosts.filter(post =>
    post.tags.some(tag => tag.toLowerCase() === 'reorder')
  );

  // If not enough reorder-related posts, supplement with other posts
  const otherPosts = localePosts.filter(post =>
    !post.tags.some(tag => tag.toLowerCase() === 'reorder')
  );

  const displayPosts = [...reorderRelatedPosts, ...otherPosts].slice(0, 3);

  // Don't display component if no posts available for current locale
  if (displayPosts.length === 0) {
    return null;
  }

  return (
    <section className="mt-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-900">
          {tCommon('relatedArticles')}
        </h2>
        <Link
          href={`/${locale}/blog`}
          className="text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1"
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
            <div className="h-40 bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center">
              <span className="text-4xl">📄</span>
            </div>

            <div className="p-6">
              {/* Category tag */}
              <div className="inline-block px-3 py-1 text-xs font-semibold text-indigo-600 bg-indigo-50 rounded-full mb-3">
                {post.category}
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors line-clamp-2">
                {post.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {post.description}
              </p>

              {/* Meta info */}
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
