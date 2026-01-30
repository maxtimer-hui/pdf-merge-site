'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { blogPosts } from '@/lib/blog-posts';

interface BlogSectionProps {
  locale: string;
}

export default function BlogSection({ locale }: BlogSectionProps) {
  const tCommon = useTranslations('common');

  // Filter posts for current language
  const localePosts = blogPosts.filter(post => post.locale === locale);

  // Prioritize posts related to decrypt (tags contain 'decrypt')
  const decryptRelatedPosts = localePosts.filter(post =>
    post.tags.some(tag => tag.toLowerCase() === 'decrypt')
  );

  // If not enough decrypt-related posts, supplement with other posts
  const otherPosts = localePosts.filter(post =>
    !post.tags.some(tag => tag.toLowerCase() === 'decrypt')
  );

  const displayPosts = [...decryptRelatedPosts, ...otherPosts].slice(0, 3);

  // If no posts in current language, don't show this component
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
          className="text-amber-600 hover:text-amber-800 font-semibold flex items-center gap-1"
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
            {/* Article Image Placeholder */}
            <div className="h-40 bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center">
              <span className="text-4xl">📄</span>
            </div>

            <div className="p-6">
              {/* Category Tag */}
              <div className="inline-block px-3 py-1 text-xs font-semibold text-amber-600 bg-amber-50 rounded-full mb-3">
                {post.category}
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors line-clamp-2">
                {post.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {post.description}
              </p>

              {/* Meta Info */}
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
